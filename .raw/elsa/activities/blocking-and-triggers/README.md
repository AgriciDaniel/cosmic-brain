# Blocking Activities & Triggers

This guide explains how to implement custom blocking activities and triggers in Elsa Workflows v3. Blocking activities use **bookmarks** to pause workflow execution and wait for external events, while triggers start or resume workflows in response to external stimuli.

## Table of Contents

- [Overview](#overview)
- [Bookmarks and Resume Flows](#bookmarks-and-resume-flows)
- [When to Use Blocking Activities](#when-to-use-blocking-activities)
- [Creating a Blocking Activity](#creating-a-blocking-activity)
- [Resuming Workflows](#resuming-workflows)
- [Creating Trigger Activities](#creating-trigger-activities)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Elsa Workflows supports two primary patterns for coordinating with external systems:

1. **Blocking Activities (Bookmarks)**: Activities that pause workflow execution and create a bookmark that can be resumed later by an external event
2. **Trigger Activities**: Activities that start or resume workflows when specific events occur

Both patterns use Elsa's bookmark system under the hood. The key difference is in their usage:
- **Blocking activities** are placed inline in a workflow and pause execution at that point
- **Triggers** are typically placed at the start of a workflow and wait for specific events to start or resume execution

## Bookmarks and Resume Flows

### What is a Bookmark?

A **bookmark** is Elsa's mechanism for pausing a workflow and storing its state until an external event occurs. When a workflow creates a bookmark:

1. The workflow execution pauses at the current activity
2. A bookmark record is persisted to the database
3. The workflow instance enters a suspended state
4. External code can resume the workflow by providing the bookmark information

### Bookmark Lifecycle

```
┌─────────────────┐
│  Activity       │
│  Executes       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CreateBookmark  │  ← Bookmark created with unique hash
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Workflow       │
│  Suspended      │  ← Workflow state persisted
└────────┬────────┘
         │
         │  External event triggers resume
         ▼
┌─────────────────┐
│ ResumeAsync     │  ← Bookmark matched and consumed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Workflow       │
│  Continues      │  ← Execution resumes from bookmark
└─────────────────┘
```

### Bookmark Correlation

Bookmarks use a **hash-based correlation mechanism** to match external events to the correct workflow instance. When creating a bookmark, you provide:

- **Bookmark Name**: A logical identifier (e.g., "WaitForApproval")
- **Payload**: Optional data used to calculate the bookmark hash
- **Correlation ID**: Optional workflow-level correlation for multi-instance scenarios

The bookmark hash is calculated from these values and is used to locate the correct bookmark when resuming.

## When to Use Blocking Activities

Use blocking activities when your workflow needs to:

- **Wait for human interaction**: Approvals, form submissions, manual reviews
- **Coordinate with external systems**: Wait for callbacks, webhooks, or async operations
- **Implement timeouts**: Combine with timers to handle time-sensitive operations
- **Handle long-running operations**: Operations that may take hours, days, or weeks

### Common Use Cases

| Use Case | Example | Pattern |
|----------|---------|---------|
| Human approvals | Expense approval, document review | WaitForApproval activity |
| External callbacks | Payment gateway, third-party API | Webhook receiver |
| Scheduled operations | Wait until specific date/time | Timer + bookmark |
| Fan-in scenarios | Wait for multiple signals | Trigger with aggregation |

## Creating a Blocking Activity

Let's create a complete example of a blocking activity that waits for an approval decision.

### Step 1: Define the Activity

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

namespace CustomActivities;

/// <summary>
/// A blocking activity that waits for an approval decision from an external system.
/// Creates a bookmark and provides a resume URL that can be used to approve or reject.
/// </summary>
[Activity("Custom", "Blocking", "Waits for an approval decision")]
public class WaitForApprovalActivity : Activity
{
    /// <summary>
    /// Input: The approval request message or context
    /// </summary>
    public Input<string> ApprovalMessage { get; set; } = default!;

    /// <summary>
    /// Output: The URL that can be used to resume this workflow with an approval decision
    /// </summary>
    public Output<string?> ResumeUrl { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Get the approval message
        var message = context.Get(ApprovalMessage);

        // Create bookmark arguments with a unique payload
        var bookmarkArgs = new CreateBookmarkArgs
        {
            // Bookmark name - used for logical grouping
            BookmarkName = "WaitForApproval",
            
            // Payload - used to calculate the bookmark hash for correlation
            // Include any data needed to uniquely identify this specific approval
            Payload = new Dictionary<string, object>
            {
                ["ApprovalMessage"] = message ?? string.Empty,
                ["ActivityInstanceId"] = context.ActivityExecutionContext.Id
            },
            
            // Callback invoked when the bookmark is resumed
            Callback = OnResumeAsync,
            
            // Auto-burn: bookmark is consumed after one use (true by default)
            AutoBurn = true
        };

        // Create the bookmark
        var bookmark = context.CreateBookmark(bookmarkArgs);

        // Try to generate a resume URL using the HTTP module's helper
        // This requires Elsa.Http to be installed and configured
        string? resumeUrl = null;
        try
        {
            // GenerateBookmarkTriggerUrl is an extension method from Elsa.Http
            // It creates a tokenized URL that can be used to resume this bookmark
            resumeUrl = context.GenerateBookmarkTriggerUrl(bookmark.Id);
        }
        catch (Exception ex)
        {
            // If HTTP module is not available, log a warning
            // In production, you might use a custom URL generation strategy
            context.AddExecutionLogEntry(
                "Warning", 
                $"Could not generate resume URL: {ex.Message}. HTTP module may not be configured.");
        }

        // Set the resume URL as output so it can be used by subsequent activities
        context.Set(ResumeUrl, resumeUrl);

        // Add execution log for debugging
        context.AddExecutionLogEntry(
            "Info",
            $"Waiting for approval. Message: {message}. Resume URL: {resumeUrl ?? "N/A"}");
    }

    /// <summary>
    /// Callback invoked when the bookmark is resumed
    /// </summary>
    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        // Get the input provided when resuming
        var input = context.WorkflowInput;
        
        // Extract the decision from input
        var decision = input.TryGetValue("Decision", out var decisionValue) 
            ? decisionValue?.ToString() 
            : null;

        // Complete the activity with an outcome based on the decision
        var outcome = decision?.ToLowerInvariant() switch
        {
            "approved" => "Approved",
            "rejected" => "Rejected",
            _ => "Done"
        };

        await context.CompleteActivityWithOutcomesAsync(outcome);
    }
}
```

See the complete implementation in [WaitForApprovalActivity.cs](WaitForApprovalActivity.cs).

### Step 2: Register the Activity

In your `Program.cs` or startup configuration:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Elsa services
builder.Services.AddElsa(elsa =>
{
    // Register your custom activity
    elsa.AddActivity<WaitForApprovalActivity>();
    
    // Other configuration...
});
```

### Key Concepts

#### CreateBookmark vs CreateBookmarkArgs

Elsa provides multiple ways to create bookmarks:

```csharp
// Method 1: Using CreateBookmarkArgs (recommended for complex scenarios)
var bookmark = context.CreateBookmark(new CreateBookmarkArgs
{
    BookmarkName = "MyBookmark",
    Payload = new { Key = "Value" },
    Callback = OnResumeAsync,
    AutoBurn = true
});

// Method 2: Simple bookmark (for basic scenarios)
var bookmark = context.CreateBookmark("MyBookmark", OnResumeAsync);
```

#### ActivityExecutionContext APIs

The `ActivityExecutionContext` provides several key methods:

- **`CreateBookmark(CreateBookmarkArgs)`**: Creates a bookmark with detailed configuration
- **`CreateBookmark(string, Func<ActivityExecutionContext, ValueTask>)`**: Creates a simple bookmark
- **`GenerateBookmarkTriggerUrl(string bookmarkId)`**: Generates a tokenized HTTP URL for resuming (requires Elsa.Http)
- **`CompleteActivityWithOutcomesAsync(params string[])`**: Completes the activity with specific outcomes
- **`Set<T>(Output<T>, T)`**: Sets an output value
- **`Get<T>(Input<T>)`**: Gets an input value

## Resuming Workflows

There are multiple patterns for resuming workflows from external code.

### Pattern 1: Resume by Bookmark Stimulus

This pattern uses a "stimulus" - a payload containing the bookmark name and correlation data. Elsa will find all matching bookmarks and resume them.

```csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Stimuli;

public class ApprovalController : ControllerBase
{
    private readonly IWorkflowResumer _workflowResumer;

    public ApprovalController(IWorkflowResumer workflowResumer)
    {
        _workflowResumer = workflowResumer;
    }

    [HttpPost("approve")]
    public async Task<IActionResult> Approve([FromBody] ApprovalRequest request)
    {
        // Create a stimulus with the bookmark name and payload
        var stimulus = new BookmarkStimulus
        {
            BookmarkName = "WaitForApproval",
            Payload = new Dictionary<string, object>
            {
                ["ApprovalMessage"] = request.Message,
                ["ActivityInstanceId"] = request.ActivityInstanceId
            }
        };

        // Input to pass to the resumed workflow
        var input = new Dictionary<string, object>
        {
            ["Decision"] = "Approved",
            ["ApprovedBy"] = User.Identity?.Name ?? "System",
            ["ApprovedAt"] = DateTime.UtcNow
        };

        // Resume all workflows matching this stimulus
        var results = await _workflowResumer.ResumeAsync(stimulus, input);

        if (results.Count == 0)
        {
            return NotFound(new { Message = "No matching workflow found" });
        }

        return Ok(new { ResumedWorkflows = results.Count });
    }
}
```

### Pattern 2: Resume by Bookmark ID

This pattern directly targets a specific bookmark using its ID. This is more precise but requires storing the bookmark ID.

```csharp
[HttpPost("resume/{bookmarkId}")]
public async Task<IActionResult> ResumeByBookmarkId(
    string bookmarkId,
    [FromBody] Dictionary<string, object> input)
{
    // Resume a specific bookmark by its ID
    var result = await _workflowResumer.ResumeAsync(bookmarkId, input);

    if (result == null)
    {
        return NotFound(new { Message = "Bookmark not found or already consumed" });
    }

    return Ok(new { WorkflowInstanceId = result.WorkflowInstanceId });
}
```

### Pattern 3: Resume via HTTP Trigger URL

When using `GenerateBookmarkTriggerUrl`, Elsa automatically creates an HTTP endpoint that can resume the workflow:

```http
POST /workflows/resume/{token}
Content-Type: application/json

{
  "Decision": "Approved",
  "ApprovedBy": "john.doe@example.com"
}
```

The token contains encrypted bookmark information, so you don't need to manually specify the bookmark ID or stimulus.

See complete controller examples in [ApprovalController.cs](ApprovalController.cs).

## Creating Trigger Activities

Triggers are special activities that can start or resume workflows based on external events. They inherit from the `Trigger` base class and implement payload generation.

### Example: SignalFanIn Trigger

This example shows a trigger that waits for multiple signals before continuing:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

namespace CustomActivities;

/// <summary>
/// A trigger that waits for multiple signals with the same aggregation key.
/// Useful for fan-in scenarios where multiple parallel operations must complete.
/// </summary>
[Activity("Custom", "Triggers", "Waits for multiple signals to arrive")]
public class SignalFanInTrigger : Trigger
{
    /// <summary>
    /// The name of the signal to wait for
    /// </summary>
    public Input<string> SignalName { get; set; } = default!;

    /// <summary>
    /// The aggregation key used to group signals together
    /// </summary>
    public Input<string> AggregationKey { get; set; } = default!;

    /// <summary>
    /// The number of signals required before continuing
    /// </summary>
    public Input<int> RequiredCount { get; set; } = new(2);

    /// <summary>
    /// GetTriggerPayloads is called by Elsa to index this trigger.
    /// Return all possible payload combinations that should activate this trigger.
    /// </summary>
    protected override IEnumerable<object> GetTriggerPayloads(TriggerIndexingContext context)
    {
        // Get the configured values
        var signalName = context.Get(SignalName);
        var aggregationKey = context.Get(AggregationKey);

        // Return a payload that will be used to match incoming signals
        yield return new SignalPayload
        {
            SignalName = signalName ?? string.Empty,
            AggregationKey = aggregationKey ?? string.Empty
        };
    }

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // When the trigger executes, create a bookmark to wait for signals
        var signalName = context.Get(SignalName);
        var aggregationKey = context.Get(AggregationKey);
        var requiredCount = context.Get(RequiredCount);

        // Store received signals in workflow state
        var receivedSignals = context.GetVariable<List<SignalData>>("ReceivedSignals") 
            ?? new List<SignalData>();

        // Check if we've received enough signals
        if (receivedSignals.Count >= requiredCount)
        {
            // All signals received, complete the activity
            await context.CompleteActivityAsync();
        }
        else
        {
            // Create a bookmark to wait for more signals
            var bookmark = context.CreateBookmark(new CreateBookmarkArgs
            {
                BookmarkName = "SignalFanIn",
                Payload = new SignalPayload
                {
                    SignalName = signalName ?? string.Empty,
                    AggregationKey = aggregationKey ?? string.Empty
                },
                Callback = OnSignalReceivedAsync
            });

            context.AddExecutionLogEntry(
                "Info",
                $"Waiting for signals. Received: {receivedSignals.Count}/{requiredCount}");
        }
    }

    private async ValueTask OnSignalReceivedAsync(ActivityExecutionContext context)
    {
        // Get the signal data from input
        var signalData = context.WorkflowInput.TryGetValue("SignalData", out var data)
            ? data as SignalData
            : null;

        if (signalData != null)
        {
            // Add to received signals
            var receivedSignals = context.GetVariable<List<SignalData>>("ReceivedSignals")
                ?? new List<SignalData>();
            receivedSignals.Add(signalData);
            context.SetVariable("ReceivedSignals", receivedSignals);

            // Check if we have enough signals now
            var requiredCount = context.Get(RequiredCount);
            if (receivedSignals.Count >= requiredCount)
            {
                await context.CompleteActivityAsync();
            }
            else
            {
                // Re-create the bookmark for the next signal
                await ExecuteAsync(context);
            }
        }
    }
}

/// <summary>
/// Payload structure for signal triggers
/// </summary>
public record SignalPayload
{
    public string SignalName { get; init; } = string.Empty;
    public string AggregationKey { get; init; } = string.Empty;
}

/// <summary>
/// Data structure for received signals
/// </summary>
public record SignalData
{
    public string SignalName { get; init; } = string.Empty;
    public string Source { get; init; } = string.Empty;
    public DateTime ReceivedAt { get; init; } = DateTime.UtcNow;
    public Dictionary<string, object> Data { get; init; } = new();
}
```

See the complete implementation in [SignalFanInTrigger.cs](SignalFanInTrigger.cs).

### Trigger Indexing

Elsa uses **trigger indexing** to efficiently match incoming events to workflows. When a trigger activity is registered:

1. `GetTriggerPayloads` is called during indexing
2. The returned payloads are hashed and stored in the trigger index
3. When an event occurs, Elsa computes a hash and looks up matching workflows
4. Matching workflows are started or resumed

This allows Elsa to quickly find relevant workflows without scanning all workflow definitions.

## Best Practices

### 1. Correlation and Idempotency

Always design your bookmarks and triggers with correlation in mind:

```csharp
// ✅ GOOD: Include unique correlation data
var payload = new Dictionary<string, object>
{
    ["OrderId"] = orderId,
    ["CustomerId"] = customerId,
    ["RequestTimestamp"] = DateTime.UtcNow.Ticks
};

// ❌ BAD: Generic bookmarks without correlation
var payload = new Dictionary<string, object>
{
    ["Type"] = "Approval"
};
```

**Idempotency**: Ensure that resuming the same bookmark multiple times with the same input doesn't cause issues. Use the `AutoBurn = true` setting to consume bookmarks after one use.

### 2. Timeouts and Fallback Paths

Always provide timeout handling for blocking activities:

```csharp
// In your workflow:
var waitForApproval = new WaitForApprovalActivity { ApprovalMessage = new("Please approve") };
var timer = new Delay { Duration = TimeSpan.FromDays(7) };

// Race between approval and timeout
var fork = new Fork { JoinMode = ForkJoinMode.WaitAny };
fork.Branches = new[] { waitForApproval, timer };
```

### 3. Distributed Locking

Elsa's `WorkflowResumer` automatically handles distributed locking when resuming workflows. This ensures that:

- Multiple resume requests for the same bookmark don't cause race conditions
- Workflows execute safely in clustered/multi-instance deployments
- Bookmark consumption is atomic

You don't need to implement your own locking logic - Elsa handles this internally using `IDistributedLockProvider`.

### 4. Scheduled Bookmarks and Timers

For time-based operations, use Elsa's built-in timer activities or scheduled bookmarks:

```csharp
// Schedule a bookmark to execute at a specific time
var scheduledBookmark = context.CreateBookmark(new CreateBookmarkArgs
{
    BookmarkName = "ScheduledTask",
    Callback = OnScheduledTimeAsync,
    ScheduledAt = DateTime.UtcNow.AddHours(24)
});
```

The `DefaultBookmarkScheduler` handles scheduled bookmarks using background jobs.

**Timezone Considerations**:
- Store times in UTC to avoid timezone issues
- Use `DateTime.UtcNow` instead of `DateTime.Now`
- When displaying times to users, convert to their local timezone

**Single-Instance vs Clustered**:
- In single-instance deployments, the scheduler runs in the same process
- In clustered deployments, use a distributed scheduler (e.g., Quartz.NET with shared storage)
- Ensure only one instance processes each scheduled bookmark

### 5. Bookmark Retention and Cleanup

Configure bookmark retention policies to prevent database growth:

```csharp
// In Program.cs
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.SetRetentionPolicy(policy =>
        {
            policy.RetainCompletedWorkflows(TimeSpan.FromDays(30));
            policy.RetainFailedWorkflows(TimeSpan.FromDays(90));
            // Bookmarks are cleaned up with their workflows
        });
    });
});
```

### 6. Error Handling and Fault Tolerance

Handle failures gracefully in your resume callbacks:

```csharp
private async ValueTask OnResumeAsync(ActivityExecutionContext context)
{
    try
    {
        // Process resume logic
        var input = context.WorkflowInput;
        // ... validation and processing ...
        
        await context.CompleteActivityAsync();
    }
    catch (Exception ex)
    {
        // Log the error
        context.AddExecutionLogEntry("Error", $"Resume failed: {ex.Message}");
        
        // Optionally fault the workflow or retry
        await context.ScheduleFaultActivityAsync(ex);
    }
}
```

### 7. Testing Blocking Activities

Test your blocking activities thoroughly:

```csharp
// Example test structure (requires Elsa.Testing)
public class WaitForApprovalTests
{
    [Fact]
    public async Task WaitForApproval_ShouldCreateBookmark()
    {
        // Arrange
        var workflow = new WorkflowBuilder()
            .WithActivity<WaitForApprovalActivity>()
            .Build();

        // Act
        var result = await RunWorkflowAsync(workflow);

        // Assert
        Assert.Equal(WorkflowStatus.Suspended, result.Status);
        Assert.Single(result.Bookmarks);
    }

    [Fact]
    public async Task WaitForApproval_ShouldResumeWithApproval()
    {
        // Arrange
        var workflow = new WorkflowBuilder()
            .WithActivity<WaitForApprovalActivity>()
            .Build();
        
        var runResult = await RunWorkflowAsync(workflow);
        var bookmarkId = runResult.Bookmarks.First().Id;

        // Act
        var resumeResult = await ResumeWorkflowAsync(
            bookmarkId,
            new { Decision = "Approved" });

        // Assert
        Assert.Equal(WorkflowStatus.Completed, resumeResult.Status);
    }
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Bookmark Not Found When Resuming

**Symptom**: `ResumeAsync` returns no results or null.

**Possible Causes**:
- Bookmark payload hash doesn't match
- Bookmark already consumed (AutoBurn = true)
- Workflow instance deleted or expired

**Solutions**:
- Verify the payload data matches exactly what was used during bookmark creation
- Check the `AutoBurn` setting - set to `false` if the bookmark should be reusable
- Ensure the workflow instance still exists in the database
- Use bookmark ID-based resume for exact matching

#### 2. GenerateBookmarkTriggerUrl Throws Exception

**Symptom**: Exception when calling `GenerateBookmarkTriggerUrl`.

**Possible Causes**:
- Elsa.Http module not installed or configured
- Base URL not configured

**Solutions**:
```csharp
// Install Elsa.Http package
// In Program.cs:
builder.Services.AddElsa(elsa =>
{
    elsa.UseHttp(http =>
    {
        http.ConfigureHttpOptions(options =>
        {
            options.BaseUrl = new Uri("https://your-server.com");
        });
    });
});

// Or handle the exception gracefully:
try
{
    var url = context.GenerateBookmarkTriggerUrl(bookmark.Id);
}
catch (Exception)
{
    // Fallback: use custom URL generation or store bookmark ID
}
```

#### 3. Workflow Not Resuming in Clustered Deployment

**Symptom**: Workflows don't resume in multi-instance deployments.

**Possible Causes**:
- Distributed locking not configured
- Database not shared between instances
- Trigger indexing not synchronized

**Solutions**:
```csharp
// Configure distributed locking
builder.Services.AddElsa(elsa =>
{
    elsa.UseDistributedLocking(locking =>
    {
        // Use Redis or other distributed lock provider
        locking.UseRedis("your-redis-connection-string");
    });
});

// Ensure all instances use the same database
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer("shared-connection-string");
        });
    });
});
```

#### 4. Trigger Not Starting Workflow

**Symptom**: Trigger activity registered but workflow doesn't start.

**Possible Causes**:
- Trigger not properly indexed
- Payload hash mismatch
- Workflow not published

**Solutions**:
- Ensure `GetTriggerPayloads` returns consistent payload structures
- Verify the workflow is published (not just saved as draft)
- Check trigger indexing logs for errors
- Rebuild the trigger index if necessary

#### 5. Memory Leaks with Long-Running Workflows

**Symptom**: Memory usage grows over time with many suspended workflows.

**Solutions**:
- Configure retention policies to clean up old workflows
- Use external storage for large workflow data
- Implement bookmark expiration logic:

```csharp
var bookmark = context.CreateBookmark(new CreateBookmarkArgs
{
    BookmarkName = "MyBookmark",
    Callback = OnResumeAsync,
    // Bookmark expires after 7 days
    ScheduledAt = DateTime.UtcNow.AddDays(7),
    AutoBurn = true
});
```

### Debugging Checklist

When troubleshooting blocking activities and triggers:

- [ ] Verify bookmark is created successfully (check database)
- [ ] Confirm bookmark payload matches resume stimulus
- [ ] Check workflow instance status (Running, Suspended, Completed)
- [ ] Review execution logs for errors or warnings
- [ ] Verify IWorkflowResumer is properly injected
- [ ] Test resume logic in isolation (unit tests)
- [ ] Check distributed locking configuration (clustered deployments)
- [ ] Verify HTTP module configuration (for trigger URLs)
- [ ] Review trigger indexing (check trigger index table)
- [ ] Confirm workflow is published and active

### Diagnostic Queries

Useful SQL queries for troubleshooting (adjust table names for your database):

```sql
-- Find all bookmarks for a workflow instance
SELECT * FROM Bookmarks 
WHERE WorkflowInstanceId = 'your-instance-id';

-- Find suspended workflows
SELECT * FROM WorkflowInstances 
WHERE Status = 'Suspended';

-- Find triggers for a workflow definition
SELECT * FROM Triggers 
WHERE WorkflowDefinitionId = 'your-definition-id';

-- Find bookmarks by name
SELECT * FROM Bookmarks 
WHERE Name = 'WaitForApproval';
```

## Additional Resources

- [Custom Activities Guide](../../extensibility/custom-activities.md)
- [Reusable Triggers](../../extensibility/reusable-triggers-3.5-preview.md)
- [Workflow Activation Strategies](../../operate/workflow-activation-strategies.md)
- [Distributed Hosting](../../hosting/distributed-hosting.md)

## Example Files

- [WaitForApprovalActivity.cs](WaitForApprovalActivity.cs) - Complete blocking activity implementation
- [ApprovalController.cs](ApprovalController.cs) - Controller showing resume patterns
- [SignalFanInTrigger.cs](SignalFanInTrigger.cs) - Trigger example with fan-in pattern
- [workflow-wait-for-approval.json](workflow-wait-for-approval.json) - Sample workflow JSON

---

This guide covers the core concepts and patterns for implementing blocking activities and triggers in Elsa v3. For more advanced scenarios, consult the Elsa source code at [github.com/elsa-workflows/elsa-core](https://github.com/elsa-workflows/elsa-core).
