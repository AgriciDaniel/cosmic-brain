using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Stimuli;
using Microsoft.AspNetCore.Mvc;

// NOTE: Adjust namespace to match your project
namespace CustomActivities.Controllers;

/// <summary>
/// Example ASP.NET Core controller demonstrating two patterns for resuming workflows
/// that are waiting on a WaitForApprovalActivity bookmark.
/// 
/// Pattern 1: Resume by Stimulus (BookmarkStimulus)
///   - Uses bookmark name and payload to find matching bookmarks
///   - Can resume multiple workflows if they match the stimulus
///   - More flexible but requires exact payload matching
/// 
/// Pattern 2: Resume by Bookmark ID
///   - Directly targets a specific bookmark using its ID
///   - More precise, guaranteed to resume only one workflow
///   - Requires storing the bookmark ID
/// 
/// This controller uses the IWorkflowResumer service from Elsa.Workflows.Runtime.
/// The service handles distributed locking automatically, ensuring safe resume
/// operations in clustered deployments.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ApprovalController : ControllerBase
{
    private readonly IWorkflowResumer _workflowResumer;
    private readonly ILogger<ApprovalController> _logger;

    /// <summary>
    /// Constructor with dependency injection.
    /// IWorkflowResumer is registered by Elsa and provides workflow resume capabilities.
    /// </summary>
    public ApprovalController(
        IWorkflowResumer workflowResumer,
        ILogger<ApprovalController> logger)
    {
        _workflowResumer = workflowResumer;
        _logger = logger;
    }

    /// <summary>
    /// Pattern 1: Resume by Stimulus
    /// 
    /// This endpoint uses BookmarkStimulus to find and resume workflows.
    /// The stimulus contains the bookmark name and payload, and Elsa will find
    /// all bookmarks that match by computing the hash of the payload.
    /// 
    /// Usage:
    /// POST /api/approval/approve-by-stimulus
    /// {
    ///   "approvalMessage": "Please approve the expense report",
    ///   "activityInstanceId": "abc123...",
    ///   "workflowInstanceId": "def456...",
    ///   "approvedBy": "john.doe@example.com"
    /// }
    /// </summary>
    [HttpPost("approve-by-stimulus")]
    public async Task<IActionResult> ApproveByStimulus([FromBody] ApprovalByStimulusRequest request)
    {
        try
        {
            // Create a stimulus that matches the bookmark payload.
            // The payload must match EXACTLY what was used when creating the bookmark
            // in WaitForApprovalActivity.ExecuteAsync.
            var stimulus = new BookmarkStimulus
            {
                // BookmarkName must match the name used when creating the bookmark
                BookmarkName = "WaitForApproval",
                
                // Payload must match the structure and values used during bookmark creation.
                // Elsa computes a hash of this payload and uses it to find matching bookmarks.
                Payload = new Dictionary<string, object>
                {
                    ["ApprovalMessage"] = request.ApprovalMessage ?? string.Empty,
                    ["ActivityInstanceId"] = request.ActivityInstanceId ?? string.Empty,
                    ["WorkflowInstanceId"] = request.WorkflowInstanceId ?? string.Empty
                }
            };

            // Input to pass to the resumed workflow.
            // This input is available in the bookmark's resume callback as context.WorkflowInput.
            var input = new Dictionary<string, object>
            {
                ["Decision"] = "Approved",
                ["ApprovedBy"] = request.ApprovedBy ?? "System",
                ["ApprovedAt"] = DateTime.UtcNow
            };

            // Resume all workflows matching this stimulus.
            // IWorkflowResumer.ResumeAsync(object stimulus, IDictionary<string, object> input)
            // Returns a list of ResumeWorkflowResult containing the resumed workflow instances.
            var results = await _workflowResumer.ResumeAsync(stimulus, input);

            if (results.Count == 0)
            {
                _logger.LogWarning(
                    "No matching workflow found for stimulus. " +
                    "BookmarkName: {BookmarkName}, Message: {Message}",
                    stimulus.BookmarkName,
                    request.ApprovalMessage);

                return NotFound(new
                {
                    Message = "No matching workflow found. The bookmark may have already been consumed or expired.",
                    BookmarkName = stimulus.BookmarkName
                });
            }

            _logger.LogInformation(
                "Successfully resumed {Count} workflow(s) via stimulus. " +
                "BookmarkName: {BookmarkName}",
                results.Count,
                stimulus.BookmarkName);

            return Ok(new
            {
                Message = $"Successfully resumed {results.Count} workflow(s)",
                ResumedWorkflows = results.Select(r => new
                {
                    WorkflowInstanceId = r.WorkflowInstanceId,
                    Status = r.Status.ToString()
                })
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resuming workflow by stimulus");
            return StatusCode(500, new { Message = "An error occurred while resuming the workflow", Error = ex.Message });
        }
    }

    /// <summary>
    /// Pattern 2: Resume by Bookmark ID
    /// 
    /// This endpoint directly targets a specific bookmark using its ID.
    /// This is more precise than using a stimulus and is guaranteed to resume
    /// only one workflow (or none if the bookmark doesn't exist).
    /// 
    /// The bookmark ID is returned by the WaitForApprovalActivity as an output
    /// and should be stored (e.g., in your database) when the workflow is suspended.
    /// 
    /// Usage:
    /// POST /api/approval/approve/{bookmarkId}
    /// {
    ///   "decision": "Approved",
    ///   "approvedBy": "john.doe@example.com",
    ///   "comments": "Looks good!"
    /// }
    /// </summary>
    [HttpPost("approve/{bookmarkId}")]
    public async Task<IActionResult> ApproveByBookmarkId(
        string bookmarkId,
        [FromBody] ApprovalByIdRequest request)
    {
        try
        {
            // Validate the decision
            if (string.IsNullOrWhiteSpace(request.Decision))
            {
                return BadRequest(new { Message = "Decision is required" });
            }

            // Input to pass to the resumed workflow
            var input = new Dictionary<string, object>
            {
                ["Decision"] = request.Decision,
                ["ApprovedBy"] = request.ApprovedBy ?? "System",
                ["ApprovedAt"] = DateTime.UtcNow,
                ["Comments"] = request.Comments ?? string.Empty
            };

            // Resume a specific bookmark by its ID.
            // IWorkflowResumer.ResumeAsync(string bookmarkId, IDictionary<string, object> input)
            // Returns a ResumeWorkflowResult or null if the bookmark doesn't exist.
            var result = await _workflowResumer.ResumeAsync(bookmarkId, input);

            if (result == null)
            {
                _logger.LogWarning(
                    "Bookmark not found or already consumed. BookmarkId: {BookmarkId}",
                    bookmarkId);

                return NotFound(new
                {
                    Message = "Bookmark not found or already consumed",
                    BookmarkId = bookmarkId
                });
            }

            _logger.LogInformation(
                "Successfully resumed workflow via bookmark ID. " +
                "BookmarkId: {BookmarkId}, WorkflowInstanceId: {WorkflowInstanceId}",
                bookmarkId,
                result.WorkflowInstanceId);

            return Ok(new
            {
                Message = "Workflow resumed successfully",
                WorkflowInstanceId = result.WorkflowInstanceId,
                Status = result.Status.ToString()
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resuming workflow by bookmark ID. BookmarkId: {BookmarkId}", bookmarkId);
            return StatusCode(500, new { Message = "An error occurred while resuming the workflow", Error = ex.Message });
        }
    }

    /// <summary>
    /// Reject endpoint using bookmark ID.
    /// Demonstrates how to use different outcomes based on the decision.
    /// 
    /// Usage:
    /// POST /api/approval/reject/{bookmarkId}
    /// {
    ///   "rejectedBy": "jane.smith@example.com",
    ///   "reason": "Insufficient documentation"
    /// }
    /// </summary>
    [HttpPost("reject/{bookmarkId}")]
    public async Task<IActionResult> RejectByBookmarkId(
        string bookmarkId,
        [FromBody] RejectionRequest request)
    {
        try
        {
            // Input for rejection
            var input = new Dictionary<string, object>
            {
                ["Decision"] = "Rejected",
                ["ApprovedBy"] = request.RejectedBy ?? "System",
                ["ApprovedAt"] = DateTime.UtcNow,
                ["Comments"] = request.Reason ?? "No reason provided"
            };

            var result = await _workflowResumer.ResumeAsync(bookmarkId, input);

            if (result == null)
            {
                return NotFound(new
                {
                    Message = "Bookmark not found or already consumed",
                    BookmarkId = bookmarkId
                });
            }

            _logger.LogInformation(
                "Workflow rejected via bookmark ID. " +
                "BookmarkId: {BookmarkId}, WorkflowInstanceId: {WorkflowInstanceId}",
                bookmarkId,
                result.WorkflowInstanceId);

            return Ok(new
            {
                Message = "Workflow rejected successfully",
                WorkflowInstanceId = result.WorkflowInstanceId,
                Status = result.Status.ToString()
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error rejecting workflow. BookmarkId: {BookmarkId}", bookmarkId);
            return StatusCode(500, new { Message = "An error occurred while rejecting the workflow", Error = ex.Message });
        }
    }
}

/// <summary>
/// Request model for approval by stimulus
/// </summary>
public class ApprovalByStimulusRequest
{
    /// <summary>
    /// The approval message (must match the value used when creating the bookmark)
    /// </summary>
    public string? ApprovalMessage { get; set; }

    /// <summary>
    /// The activity instance ID (must match the value used when creating the bookmark)
    /// </summary>
    public string? ActivityInstanceId { get; set; }

    /// <summary>
    /// The workflow instance ID (must match the value used when creating the bookmark)
    /// </summary>
    public string? WorkflowInstanceId { get; set; }

    /// <summary>
    /// The user or system approving the request
    /// </summary>
    public string? ApprovedBy { get; set; }
}

/// <summary>
/// Request model for approval by bookmark ID
/// </summary>
public class ApprovalByIdRequest
{
    /// <summary>
    /// The decision (e.g., "Approved", "Rejected")
    /// </summary>
    public string Decision { get; set; } = string.Empty;

    /// <summary>
    /// The user or system making the decision
    /// </summary>
    public string? ApprovedBy { get; set; }

    /// <summary>
    /// Optional comments about the decision
    /// </summary>
    public string? Comments { get; set; }
}

/// <summary>
/// Request model for rejection
/// </summary>
public class RejectionRequest
{
    /// <summary>
    /// The user or system rejecting the request
    /// </summary>
    public string? RejectedBy { get; set; }

    /// <summary>
    /// The reason for rejection
    /// </summary>
    public string? Reason { get; set; }
}

/*
 * REGISTRATION
 * ============
 * 
 * This controller will be automatically discovered by ASP.NET Core if:
 * 1. The assembly is added to the application services
 * 2. Controller services are registered (builder.Services.AddControllers())
 * 
 * In your Program.cs:
 * 
 * var builder = WebApplication.CreateBuilder(args);
 * 
 * // Add controllers
 * builder.Services.AddControllers();
 * 
 * // Add Elsa services (includes IWorkflowResumer)
 * builder.Services.AddElsa(elsa =>
 * {
 *     // ... elsa configuration
 * });
 * 
 * var app = builder.Build();
 * 
 * // Map controllers
 * app.MapControllers();
 * 
 * app.Run();
 * 
 * 
 * TESTING WITH CURL
 * =================
 * 
 * Test the resume-by-stimulus endpoint:
 * 
 * curl -X POST https://localhost:5001/api/approval/approve-by-stimulus \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "approvalMessage": "Please approve the expense report",
 *     "activityInstanceId": "abc123",
 *     "workflowInstanceId": "def456",
 *     "approvedBy": "john.doe@example.com"
 *   }'
 * 
 * Test the resume-by-bookmark-id endpoint:
 * 
 * curl -X POST https://localhost:5001/api/approval/approve/your-bookmark-id \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "decision": "Approved",
 *     "approvedBy": "john.doe@example.com",
 *     "comments": "Looks good!"
 *   }'
 * 
 * Test the rejection endpoint:
 * 
 * curl -X POST https://localhost:5001/api/approval/reject/your-bookmark-id \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "rejectedBy": "jane.smith@example.com",
 *     "reason": "Insufficient documentation"
 *   }'
 * 
 * 
 * API REFERENCE
 * =============
 * 
 * Core APIs used (from elsa-core repository):
 * 
 * - IWorkflowResumer
 *   Namespace: Elsa.Workflows.Runtime
 *   Assembly: Elsa.Workflows.Runtime
 *   Service for resuming suspended workflows.
 * 
 * - IWorkflowResumer.ResumeAsync(object stimulus, IDictionary<string, object> input)
 *   Resumes all workflows matching the stimulus.
 *   Returns: IReadOnlyList<ResumeWorkflowResult>
 * 
 * - IWorkflowResumer.ResumeAsync(string bookmarkId, IDictionary<string, object> input)
 *   Resumes a specific bookmark by ID.
 *   Returns: ResumeWorkflowResult (or null if not found)
 * 
 * - BookmarkStimulus
 *   Namespace: Elsa.Workflows.Runtime.Stimuli
 *   Contains bookmark name and payload for matching bookmarks.
 * 
 * - ResumeWorkflowResult
 *   Contains information about the resumed workflow (WorkflowInstanceId, Status, etc.)
 * 
 * 
 * DISTRIBUTED LOCKING
 * ===================
 * 
 * IWorkflowResumer automatically handles distributed locking using IDistributedLockProvider.
 * This ensures that:
 * - Multiple resume requests for the same bookmark don't cause race conditions
 * - Workflows execute safely in clustered/multi-instance deployments
 * - Bookmark consumption is atomic
 * 
 * You don't need to implement your own locking logic - Elsa handles this internally.
 * 
 * For clustered deployments, configure a distributed lock provider in your Program.cs:
 * 
 * builder.Services.AddElsa(elsa =>
 * {
 *     elsa.UseDistributedLocking(locking =>
 *     {
 *         // Use Redis, Azure Blob Storage, or other distributed lock provider
 *         locking.UseRedis("your-redis-connection-string");
 *     });
 * });
 */
