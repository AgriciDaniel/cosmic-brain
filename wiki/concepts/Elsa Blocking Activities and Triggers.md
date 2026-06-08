---
type: concept
title: Elsa Blocking Activities and Triggers
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - blocking
  - triggers
  - bookmarks
  - patterns
status: developing
address: c-000061
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Custom Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa Blocking Activities and Triggers

Elsa Workflows supports two primary patterns for coordinating with external systems: **blocking activities** (which pause workflow execution using bookmarks) and **trigger activities** (which start or resume workflows in response to external events). Both use the bookmark system under the hood.

## Overview

- **Blocking Activities** are placed inline in a workflow. They pause execution at a specific point and create a bookmark that external code can later resume.
- **Triggers** are typically placed at the start of a workflow. They respond to external events to either start a new workflow instance or resume a suspended one.

## Bookmarks

A **bookmark** is Elsa's mechanism for pausing a workflow and persisting its state until an external event occurs. When a workflow creates a bookmark:

1. The workflow execution pauses at the current activity
2. A bookmark record is persisted to the database
3. The workflow instance enters a suspended state
4. External code can resume the workflow by providing matching bookmark information

### Bookmark Lifecycle

```
Activity Executes -> CreateBookmark (unique hash) -> Workflow Suspended
    -> External event triggers resume -> Bookmark matched and consumed
    -> Workflow Continues from bookmark
```

### Bookmark Correlation

Bookmarks use a hash-based correlation mechanism. When creating a bookmark, you provide:
- **Bookmark Name**: A logical identifier (e.g., "WaitForApproval")
- **Payload**: Data used to calculate the bookmark hash
- **Correlation ID**: Optional workflow-level correlation for multi-instance scenarios

## Creating a Blocking Activity

Blocking activities inherit from `Activity` and create bookmarks in their `ExecuteAsync` method rather than completing:

```csharp
[Activity("Custom", "Blocking", "Waits for an approval decision")]
public class WaitForApprovalActivity : Activity
{
    public Input<string> ApprovalMessage { get; set; } = default!;
    public Output<string?> ResumeUrl { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var message = context.Get(ApprovalMessage);

        var bookmarkArgs = new CreateBookmarkArgs
        {
            BookmarkName = "WaitForApproval",
            Payload = new Dictionary<string, object>
            {
                ["ApprovalMessage"] = message ?? string.Empty,
                ["ActivityInstanceId"] = context.ActivityExecutionContext.Id
            },
            Callback = OnResumeAsync,
            AutoBurn = true
        };

        var bookmark = context.CreateBookmark(bookmarkArgs);

        // Generate tokenized HTTP resume URL (requires Elsa.Http)
        var resumeUrl = context.GenerateBookmarkTriggerUrl(bookmark.Id);
        context.Set(ResumeUrl, resumeUrl);

        // NOTE: Do NOT call CompleteActivityAsync here.
        // The activity completes in the OnResumeAsync callback.
    }

    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        var input = context.WorkflowInput;
        var decision = input.TryGetValue("Decision", out var decisionValue)
            ? decisionValue?.ToString() : null;

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

## Resuming Workflows

There are three patterns for resuming workflows from external code:

### Pattern 1: Resume by Bookmark Stimulus

Uses a `BookmarkStimulus` containing the bookmark name and payload. Elsa finds all matching bookmarks by hash comparison:

```csharp
var stimulus = new BookmarkStimulus
{
    BookmarkName = "WaitForApproval",
    Payload = new Dictionary<string, object>
    {
        ["ApprovalMessage"] = request.Message,
        ["ActivityInstanceId"] = request.ActivityInstanceId
    }
};

var results = await workflowResumer.ResumeAsync(stimulus, input);
```

### Pattern 2: Resume by Bookmark ID

Directly targets a specific bookmark using its ID:

```csharp
var result = await workflowResumer.ResumeAsync(bookmarkId, input);
```

### Pattern 3: Resume via HTTP Trigger URL

When using `GenerateBookmarkTriggerUrl`, Elsa creates a tokenized HTTP endpoint:

```
POST /workflows/resume/{token}
{
  "Decision": "Approved",
  "ApprovedBy": "john.doe@example.com"
}
```

## Trigger Activities

Triggers inherit from the `Trigger` base class. They can both **start** new workflows and **resume** suspended ones. Key differences from blocking activities:

- Implement `GetTriggerPayloads()` for trigger indexing
- Check `context.IsTriggerOfWorkflow()` to handle workflow-start mode
- Set `CanStartWorkflow = true` to enable workflow starting

### SignalFanIn Trigger Example

A trigger that waits for multiple signals before continuing (fan-in pattern):

```csharp
[Activity("Custom", "Triggers", "Waits for multiple signals to arrive")]
public class SignalFanInTrigger : Trigger
{
    public Input<string> SignalName { get; set; } = default!;
    public Input<string> AggregationKey { get; set; } = default!;
    public Input<int> RequiredCount { get; set; } = new(2);

    protected override IEnumerable<object> GetTriggerPayloads(TriggerIndexingContext context)
    {
        var signalName = context.Get(SignalName);
        var aggregationKey = context.Get(AggregationKey);
        yield return new SignalPayload
        {
            SignalName = signalName ?? string.Empty,
            AggregationKey = aggregationKey ?? string.Empty
        };
    }

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        if (context.IsTriggerOfWorkflow())
        {
            // Workflow was started by a matching signal -- complete immediately
            await context.CompleteActivityAsync();
            return;
        }

        // Mid-workflow: create bookmark and wait for more signals
        var receivedSignals = context.GetVariable<List<SignalData>>("ReceivedSignals")
            ?? new List<SignalData>();
        var requiredCount = context.Get(RequiredCount);

        if (receivedSignals.Count >= requiredCount)
        {
            await context.CompleteActivityAsync();
        }
        else
        {
            context.CreateBookmark(new CreateBookmarkArgs
            {
                BookmarkName = "SignalFanIn",
                Payload = new SignalPayload { ... },
                Callback = OnSignalReceivedAsync
            });
        }
    }
}
```

### Trigger Indexing

Elsa uses trigger indexing to efficiently match incoming events to workflows. `GetTriggerPayloads` is called during workflow publishing, the returned payloads are hashed and stored, and when an event occurs the hash is used for fast lookup.

## Best Practices

- **Correlation**: Include unique data (order IDs, timestamps) in bookmark payloads for precise matching
- **Idempotency**: Design resume handlers to handle duplicate calls. Use `AutoBurn = true` to consume bookmarks after one use.
- **Timeouts**: Combine blocking activities with timer activities using Fork/WaitAny for timeout handling
- **Distributed Locking**: Elsa's `IWorkflowResumer` handles distributed locking automatically via `IDistributedLockProvider`
- **Error Handling**: Wrap resume callback logic in try-catch blocks
- **Retention Policies**: Configure bookmark cleanup to prevent database growth:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.SetRetentionPolicy(policy =>
    {
        policy.RetainCompletedWorkflows(TimeSpan.FromDays(30));
        policy.RetainFailedWorkflows(TimeSpan.FromDays(90));
    });
});
```

## Approval Workflow Example

A complete approval workflow pattern using Flowchart with a `WaitForApprovalActivity`, `Fork` with `WaitAny` for timeout handling, and a `Switch` for routing:

```json
{
  "root": {
    "type": "Elsa.Flowchart",
    "activities": [
      { "id": "wait-approval", "type": "Custom.WaitForApprovalActivity,..." },
      { "id": "timeout-delay", "type": "Elsa.Delay", "duration": "7.00:00:00" }
    ],
    "connections": [
      { "source": "wait-approval", "target": "decision" },
      { "source": "decision", "port": "Approved", "target": "approved-action" }
    ]
  }
}
```

## Troubleshooting

Common issues include: bookmark not found (payload hash mismatch), `GenerateBookmarkTriggerUrl` throwing (HTTP module not configured), and triggers not starting workflows (workflow not published or trigger indexing failure).
