using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

// NOTE: Adjust namespace to match your project
namespace CustomActivities;

/// <summary>
/// A blocking activity that waits for an approval decision from an external system.
/// This demonstrates the core pattern for creating custom blocking activities in Elsa v3.
/// 
/// Key Concepts:
/// - Creates a bookmark using ActivityExecutionContext.CreateBookmark(CreateBookmarkArgs)
/// - Generates a tokenized resume URL using GenerateBookmarkTriggerUrl (requires Elsa.Http)
/// - Pauses workflow execution until external code resumes the bookmark
/// - Supports multiple outcomes (Approved, Rejected) based on resume input
/// 
/// Usage in a workflow:
/// var waitForApproval = new WaitForApprovalActivity
/// {
///     ApprovalMessage = new("Please review and approve the expense report")
/// };
/// 
/// External resume (via controller):
/// await workflowResumer.ResumeAsync(bookmarkId, new { Decision = "Approved" });
/// </summary>
[Activity("Custom", "Blocking", "Waits for an approval decision")]
public class WaitForApprovalActivity : Activity
{
    /// <summary>
    /// Input: The approval request message or context.
    /// This will be shown to the approver and included in the bookmark payload.
    /// </summary>
    public Input<string> ApprovalMessage { get; set; } = default!;

    /// <summary>
    /// Output: The URL that can be used to resume this workflow with an approval decision.
    /// This URL contains an encrypted token and can be sent to approvers via email, SMS, etc.
    /// Requires Elsa.Http module to be installed and configured.
    /// </summary>
    public Output<string?> ResumeUrl { get; set; } = default!;

    /// <summary>
    /// Output: The bookmark ID that can be used to resume this workflow.
    /// Store this if you need to resume via IWorkflowResumer.ResumeAsync(bookmarkId, input).
    /// </summary>
    public Output<string?> BookmarkId { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Get the approval message from input
        var message = context.Get(ApprovalMessage);

        // Create bookmark arguments with a unique payload for correlation.
        // The payload is used to calculate the bookmark hash, which is used to match
        // external events to the correct workflow instance.
        var bookmarkArgs = new CreateBookmarkArgs
        {
            // BookmarkName: A logical identifier for this type of bookmark.
            // Used for grouping and querying bookmarks.
            BookmarkName = "WaitForApproval",
            
            // Payload: Data used to calculate the bookmark hash for correlation.
            // Include any data needed to uniquely identify this specific approval request.
            // When resuming via stimulus, this payload must match exactly.
            Payload = new Dictionary<string, object>
            {
                ["ApprovalMessage"] = message ?? string.Empty,
                ["ActivityInstanceId"] = context.ActivityExecutionContext.Id,
                ["WorkflowInstanceId"] = context.WorkflowExecutionContext.Id
            },
            
            // Callback: Method invoked when the bookmark is resumed.
            // This is where you process the resume input and complete the activity.
            Callback = OnResumeAsync,
            
            // AutoBurn: If true (default), the bookmark is automatically consumed after one use.
            // Set to false if the bookmark should be reusable.
            AutoBurn = true
        };

        // Create the bookmark using ActivityExecutionContext.CreateBookmark.
        // This method is part of the core Elsa.Workflows API.
        // The bookmark is persisted to the database and the workflow enters a suspended state.
        var bookmark = context.CreateBookmark(bookmarkArgs);

        // Set the bookmark ID as output so it can be stored or passed to other activities
        context.Set(BookmarkId, bookmark.Id);

        // Try to generate a resume URL using the HTTP module's helper.
        // GenerateBookmarkTriggerUrl is an extension method from Elsa.Http.Extensions
        // (namespace: Elsa.Http, assembly: Elsa.Http)
        // It creates a tokenized URL that can be used to resume this bookmark via HTTP POST.
        string? resumeUrl = null;
        try
        {
            // GenerateBookmarkTriggerUrl creates a URL like:
            // POST https://your-server.com/workflows/resume/{encrypted-token}
            // The token contains the bookmark ID and is automatically validated by Elsa.
            resumeUrl = context.GenerateBookmarkTriggerUrl(bookmark.Id);
        }
        catch (Exception ex)
        {
            // If HTTP module is not available or not configured, this will fail.
            // In production, you might:
            // 1. Use a custom URL generation strategy
            // 2. Store the bookmark ID and construct URLs manually
            // 3. Use a different notification mechanism (e.g., push notifications)
            context.AddExecutionLogEntry(
                "Warning", 
                $"Could not generate resume URL: {ex.Message}. " +
                "HTTP module may not be configured. Use bookmark ID for manual resume.");
        }

        // Set the resume URL as output so it can be used by subsequent activities
        // (e.g., SendEmail activity to notify approvers)
        context.Set(ResumeUrl, resumeUrl);
        
        // Also set as a workflow variable so it can be accessed via getVariable() in expressions
        context.SetVariable("ResumeUrl", resumeUrl);

        // Add execution log for debugging and auditing
        context.AddExecutionLogEntry(
            "Info",
            $"Waiting for approval. Message: '{message}'. " +
            $"Bookmark ID: {bookmark.Id}. " +
            $"Resume URL: {resumeUrl ?? "N/A"}");

        // NOTE: We don't call CompleteActivityAsync here!
        // The workflow remains in a suspended state until the bookmark is resumed.
        // The activity will be completed in the OnResumeAsync callback.
    }

    /// <summary>
    /// Callback invoked when the bookmark is resumed by external code.
    /// This method is called by Elsa when:
    /// 1. IWorkflowResumer.ResumeAsync(stimulus, input) matches this bookmark's payload
    /// 2. IWorkflowResumer.ResumeAsync(bookmarkId, input) targets this bookmark directly
    /// 3. HTTP POST to the generated resume URL
    /// 
    /// The context.WorkflowInput contains the input data passed during resume.
    /// </summary>
    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        // Get the input provided when resuming.
        // This is passed as the second parameter to IWorkflowResumer.ResumeAsync.
        var input = context.WorkflowInput;
        
        // Extract the decision from input.
        // The shape of this input is defined by the external code that resumes the workflow.
        var decision = input.TryGetValue("Decision", out var decisionValue) 
            ? decisionValue?.ToString() 
            : null;

        // Extract additional metadata if provided
        var approvedBy = input.TryGetValue("ApprovedBy", out var approverValue)
            ? approverValue?.ToString()
            : "Unknown";

        var approvedAt = input.TryGetValue("ApprovedAt", out var timestampValue)
            ? timestampValue
            : DateTime.UtcNow;

        // Log the resume event
        context.AddExecutionLogEntry(
            "Info",
            $"Approval decision received: {decision ?? "None"}. " +
            $"Approved by: {approvedBy}. " +
            $"At: {approvedAt}");

        // Determine the outcome based on the decision.
        // Outcomes define which outbound connections are followed in the workflow.
        // These must match the outcome names configured in the workflow designer or builder.
        var outcome = decision?.ToLowerInvariant() switch
        {
            "approved" => "Approved",
            "rejected" => "Rejected",
            _ => "Done" // Default outcome if decision is not recognized
        };

        // Complete the activity with the determined outcome.
        // CompleteActivityWithOutcomesAsync marks this activity as complete and
        // triggers execution of any activities connected to this outcome.
        await context.CompleteActivityWithOutcomesAsync(outcome);
    }
}

/*
 * REGISTRATION
 * ============
 * 
 * In your Program.cs or Startup.cs:
 * 
 * builder.Services.AddElsa(elsa =>
 * {
 *     // Register the custom activity
 *     elsa.AddActivity<WaitForApprovalActivity>();
 *     
 *     // If using HTTP resume URLs, configure the HTTP module
 *     elsa.UseHttp(http =>
 *     {
 *         http.ConfigureHttpOptions(options =>
 *         {
 *             options.BaseUrl = new Uri("https://your-server.com");
 *         });
 *     });
 * });
 * 
 * 
 * USAGE IN WORKFLOW
 * =================
 * 
 * Programmatic:
 * 
 * public class ApprovalWorkflow : WorkflowBase
 * {
 *     protected override void Build(IWorkflowBuilder builder)
 *     {
 *         var waitForApproval = new WaitForApprovalActivity
 *         {
 *             ApprovalMessage = new("Please approve this request")
 *         };
 *         
 *         var approved = new WriteLine("Approved!");
 *         var rejected = new WriteLine("Rejected!");
 *         
 *         builder.Root = new Sequence
 *         {
 *             Activities =
 *             {
 *                 waitForApproval,
 *                 new If
 *                 {
 *                     Condition = new(context => 
 *                         context.GetLastResult() == "Approved"),
 *                     Then = approved,
 *                     Else = rejected
 *                 }
 *             }
 *         };
 *     }
 * }
 * 
 * 
 * RESUMING THE WORKFLOW
 * =====================
 * 
 * See ApprovalController.cs for complete examples of resuming workflows.
 * 
 * Quick example:
 * 
 * public class ApprovalService
 * {
 *     private readonly IWorkflowResumer _workflowResumer;
 *     
 *     public async Task ApproveAsync(string bookmarkId)
 *     {
 *         var input = new Dictionary<string, object>
 *         {
 *             ["Decision"] = "Approved",
 *             ["ApprovedBy"] = "john.doe@example.com",
 *             ["ApprovedAt"] = DateTime.UtcNow
 *         };
 *         
 *         await _workflowResumer.ResumeAsync(bookmarkId, input);
 *     }
 * }
 * 
 * 
 * API REFERENCE
 * =============
 * 
 * Core APIs used (from elsa-core repository):
 * 
 * - ActivityExecutionContext.CreateBookmark(CreateBookmarkArgs)
 *   Namespace: Elsa.Workflows
 *   Creates a bookmark and suspends the workflow.
 * 
 * - CreateBookmarkArgs
 *   Namespace: Elsa.Workflows.Models
 *   Configuration for bookmark creation.
 *   
 * - ActivityExecutionContext.GenerateBookmarkTriggerUrl(string bookmarkId)
 *   Namespace: Elsa.Http (extension method)
 *   Assembly: Elsa.Http
 *   Generates a tokenized HTTP URL for resuming the bookmark.
 *   
 * - IWorkflowResumer.ResumeAsync(string bookmarkId, IDictionary<string, object> input)
 *   Namespace: Elsa.Workflows.Runtime
 *   Assembly: Elsa.Workflows.Runtime
 *   Resumes a workflow by bookmark ID.
 *   
 * - IWorkflowResumer.ResumeAsync(object stimulus, IDictionary<string, object> input)
 *   Namespace: Elsa.Workflows.Runtime
 *   Resumes workflows matching the stimulus (bookmark name + payload).
 *   
 * - ActivityExecutionContext.CompleteActivityWithOutcomesAsync(params string[] outcomes)
 *   Namespace: Elsa.Workflows
 *   Completes the activity with specific outcomes.
 */
