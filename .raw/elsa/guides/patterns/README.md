---
description: >-
  A practical, pattern-based guide to designing and implementing common workflow
  patterns with Elsa Workflows v3. Each pattern provides grounded guidance, code
  snippets, pitfalls, and references to elsa
---

# Workflow Patterns

## Overview

This guide covers common workflow patterns you'll encounter when building workflow-driven applications with Elsa v3. Each pattern includes:

* **When to use it**: Scenarios and use cases
* **Elsa-centric approach**: How Elsa supports the pattern
* **Minimal snippets**: Code and JSON examples
* **Pitfalls**: Common mistakes and how to avoid them
* **References**: Links to elsa-core/elsa-extensions source files

For deeper topics, refer to:

* [Blocking Activities & Triggers](../../activities/blocking-and-triggers/) (DOC-013) for bookmark and trigger fundamentals
* [Clustering Guide](../clustering/) (DOC-015) for distributed deployments
* [Testing & Debugging](../testing-debugging.md) (DOC-017) for troubleshooting workflows

## Table of Contents

* [Human-in-the-Loop Approval](./#human-in-the-loop-approval)
* [Event-Driven Correlation](./#event-driven-correlation)
* [Fan-Out / Fan-In](./#fan-out--fan-in)
* [Timeout / Escalation](./#timeout--escalation)
* [Compensation / Saga-Lite](./#compensation--saga-lite)
* [Idempotent External Calls](./#idempotent-external-calls)
* [Long-Running Workflows](./#long-running-workflows)
* [Best Practices](./#best-practices)
* [Troubleshooting](./#troubleshooting)

***

## Human-in-the-Loop Approval

### When to Use

Use this pattern when a workflow needs to pause and wait for a human decision before continuing, such as:

* Expense approvals
* Document reviews
* Manual quality gates
* Escalation decisions

### Elsa-Centric Approach

Elsa implements human approvals using **blocking activities** that create **bookmarks**. When the activity executes, it creates a bookmark and suspends the workflow. An external system (e.g., an approval UI or email link) resumes the workflow by providing the decision.

**Key APIs from elsa-core:**

| API                                             | File Reference                                                           | Purpose                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| `CreateBookmark(CreateBookmarkArgs)`            | `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs`   | Creates a bookmark with payload, callback, and options |
| `GenerateBookmarkTriggerUrl(bookmarkId)`        | `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs` | Generates a tokenized HTTP URL for resuming            |
| `IWorkflowResumer.ResumeAsync(stimulus, input)` | `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`         | Resumes workflows matching a stimulus                  |

### Minimal Snippet

```csharp
protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    // Create bookmark arguments
    var bookmarkArgs = new CreateBookmarkArgs
    {
        BookmarkName = "WaitForApproval",
        Payload = new { ApprovalId = context.Get(ApprovalId) },
        Callback = OnApprovalReceivedAsync,
        AutoBurn = true  // Consume after one use
    };

    // Create the bookmark and suspend
    var bookmark = context.CreateBookmark(bookmarkArgs);

    // Generate resume URL (requires Elsa.Http)
    var resumeUrl = context.GenerateBookmarkTriggerUrl(bookmark.Id);
    context.Set(ResumeUrl, resumeUrl);
}

private async ValueTask OnApprovalReceivedAsync(ActivityExecutionContext context)
{
    var decision = context.WorkflowInput.GetValueOrDefault("Decision")?.ToString();
    var outcome = decision == "Approved" ? "Approved" : "Rejected";
    await context.CompleteActivityWithOutcomesAsync(outcome);
}
```

See the complete `WaitForApprovalActivity` example in [Blocking Activities & Triggers](../../activities/blocking-and-triggers/).

### Pitfalls

| Pitfall                                   | Solution                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| Resume URL exposed without authentication | Use tokenized URLs with short expiration; validate user permissions in resume handler |
| Bookmark not found on resume              | Ensure payload hash matches exactly; verify `AutoBurn` setting                        |
| Multiple approvers racing to respond      | Set `AutoBurn = true` so only the first response is processed                         |

### Troubleshooting

* **Symptom**: Resume returns "Bookmark not found"
  * Check that the payload structure matches what was used during `CreateBookmark`
  * Verify the workflow instance still exists (not deleted by retention policies)
  * See [Troubleshooting](../testing-debugging.md) for diagnostic queries

***

## Event-Driven Correlation

### When to Use

Use this pattern when workflows must react to events identified by a correlation key, such as:

* Order events keyed by `OrderId`
* Customer events keyed by `CustomerId`
* Multi-step processes with external callbacks

### Elsa-Centric Approach

Elsa uses **stimulus hashing** to match incoming events to waiting bookmarks. When you create a bookmark with a payload, Elsa computes a deterministic hash. When resuming, the same payload structure must be provided so the hash matches.

**BookmarkFilter** allows you to query bookmarks by:

* `BookmarkName`: Logical grouping
* `ActivityTypeName`: The activity type that created it
* `CorrelationId`: Workflow-level correlation
* `Hash`: Computed from payload

### Minimal Snippet

```csharp
// Creating a bookmark with correlation data
var bookmarkArgs = new CreateBookmarkArgs
{
    BookmarkName = "OrderEvent",
    Payload = new OrderEventPayload
    {
        OrderId = orderId,
        EventType = "PaymentReceived"
    },
    Callback = OnOrderEventAsync
};
context.CreateBookmark(bookmarkArgs);
```

```csharp
// Resuming by stimulus
public async Task HandleOrderEvent(string orderId, string eventType, object eventData)
{
    var stimulus = new BookmarkStimulus
    {
        BookmarkName = "OrderEvent",
        Payload = new OrderEventPayload
        {
            OrderId = orderId,
            EventType = eventType
        }
    };

    var input = new Dictionary<string, object>
    {
        ["EventData"] = eventData,
        ["ReceivedAt"] = DateTime.UtcNow
    };

    var results = await _workflowResumer.ResumeAsync(stimulus, input);
}
```

### Correlation ID Best Practices

1. **Use stable identifiers**: `OrderId`, `CustomerId`, `TransactionId` - not random GUIDs
2. **Keep low cardinality**: Avoid including timestamps or request-specific data in payloads used for hashing
3. **Document the payload structure**: Both the activity creating the bookmark and the code resuming it must agree on the payload shape
4. **Consider case sensitivity**: Elsa's default hash is case-sensitive; normalize inputs

### Pitfalls

| Pitfall                                                     | Solution                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| Hash mismatch due to payload structure differences          | Use a shared payload class/record for both create and resume |
| Stale correlations accumulating                             | Configure retention policies; use bookmark expiration        |
| Correlation collision (same ID used for different purposes) | Include discriminator fields (e.g., `EventType`) in payload  |

***

## Fan-Out / Fan-In

### When to Use

Use **fan-out** to execute multiple branches or tasks in parallel, and **fan-in** to wait for all (or some) branches to complete before continuing.

Examples:

* Processing multiple order items in parallel
* Sending notifications to multiple channels
* Waiting for approvals from multiple approvers

### Elsa-Centric Approach

#### Fan-Out Options

1. **Parallel Activity**: Execute multiple branches simultaneously
2. **ForEach Activity**: Iterate over a collection, optionally in parallel
3. **Flowchart with Multiple Outgoing Connections**: Visual branching

#### Fan-In Options

1. **Fork/Join**: Wait for all branches to complete (`WaitAll`) or any branch (`WaitAny`)
2. **Trigger-Based Fan-In**: Use a shared aggregation key to collect signals from multiple sources
3. **Counter-Based**: Track completion count in workflow variables

### Fan-Out Example (Flowchart JSON)

See [examples/fanout-flowchart.json](examples/fanout-flowchart.json) for a minimal Flowchart with two parallel branches.

```json
{
  "definitionId": "fanout-demo",
  "root": {
    "type": "Elsa.Flowchart",
    "activities": [
      { "id": "start", "type": "Elsa.Start" },
      { "id": "branch1", "type": "Elsa.WriteLine", "text": "Branch 1" },
      { "id": "branch2", "type": "Elsa.WriteLine", "text": "Branch 2" },
      { "id": "join", "type": "Elsa.Join", "mode": "WaitAll" },
      { "id": "end", "type": "Elsa.WriteLine", "text": "All branches complete" }
    ],
    "connections": [
      { "source": "start", "target": "branch1" },
      { "source": "start", "target": "branch2" },
      { "source": "branch1", "target": "join" },
      { "source": "branch2", "target": "join" },
      { "source": "join", "target": "end" }
    ]
  }
}
```

### Fan-In with Trigger (SignalFanInTrigger)

For scenarios where signals arrive asynchronously from external sources, use a trigger with an aggregation key. See [examples/fanin-trigger.cs](examples/fanin-trigger.cs).

**Payload Shape:**

```csharp
public record SignalPayload
{
    public string SignalName { get; init; } = string.Empty;
    public string AggregationKey { get; init; } = string.Empty;
}
```

**Resume via IWorkflowResumer:**

```csharp
var stimulus = new BookmarkStimulus
{
    BookmarkName = "SignalFanIn",
    Payload = new SignalPayload
    {
        SignalName = "TaskCompleted",
        AggregationKey = correlationId
    }
};

var input = new Dictionary<string, object>
{
    ["SignalData"] = new SignalData
    {
        SignalName = "TaskCompleted",
        Source = "Worker-1",
        ReceivedAt = DateTime.UtcNow,
        Data = taskResult
    }
};

await _workflowResumer.ResumeAsync(stimulus, input);
```

See the full `SignalFanInTrigger` implementation in [Blocking Activities & Triggers - SignalFanInTrigger.cs](../../activities/blocking-and-triggers/SignalFanInTrigger.cs).

### Pitfalls

| Pitfall                     | Solution                                                      |
| --------------------------- | ------------------------------------------------------------- |
| Fan-in never completes      | Ensure all branches signal completion; add timeout pattern    |
| Duplicate signals processed | Track received signals by source; use idempotency keys        |
| Aggregation key collision   | Use workflow instance ID or correlation ID as part of the key |

***

## Timeout / Escalation

### When to Use

Use this pattern to handle time-sensitive operations:

* Approval deadlines
* SLA enforcement
* Escalation to supervisors
* Retry with backoff

### Elsa-Centric Approach

Combine a blocking activity with a timer using a Fork/Join pattern. The first to complete wins.

**Timer Options:**

| Activity | Use Case                   |
| -------- | -------------------------- |
| `Delay`  | Wait for a fixed duration  |
| `Timer`  | Wait until a specific time |
| `Cron`   | Recurring schedules        |

**Scheduling Infrastructure:**

* **DefaultBookmarkScheduler** (`src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs`): Enqueues bookmark resume tasks
* **ResumeWorkflowTask** (`src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs`): Quartz job that resumes workflows at scheduled time

### Minimal Snippet (JSON)

See [examples/timeout-approval.json](examples/timeout-approval.json) for a complete example.

```json
{
  "type": "Elsa.Fork",
  "branches": [
    {
      "id": "approval-branch",
      "activities": [
        { "type": "Custom.WaitForApproval", "message": "Please approve" }
      ]
    },
    {
      "id": "timeout-branch",
      "activities": [
        { "type": "Elsa.Delay", "duration": "7.00:00:00" },
        { "type": "Elsa.SetVariable", "name": "TimedOut", "value": true }
      ]
    }
  ],
  "joinMode": "WaitAny"
}
```

### Clustered Deployments

In clustered environments, ensure scheduled bookmarks execute exactly once:

**Option 1: Quartz Clustering (Recommended)**

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseScheduling(scheduling => scheduling.UseQuartzScheduler());
    elsa.UseQuartz(quartz => quartz.UsePostgreSql(connectionString));
});
```

Quartz uses database locks to ensure only one node executes a scheduled task.

**Option 2: Single Scheduler Node**

Designate one node as the scheduler; other nodes handle HTTP requests only.

See [Clustering Guide](../clustering/) for detailed configuration.

### Pitfalls

| Pitfall                           | Solution                                                  |
| --------------------------------- | --------------------------------------------------------- |
| Timeout fires multiple times      | Use Quartz clustering; configure `AutoBurn = true`        |
| Race between approval and timeout | Design outcome handling to be idempotent                  |
| Timezone issues                   | Store all times in UTC; convert to local only for display |

***

## Compensation / Saga-Lite

### When to Use

Use compensation when a long-running workflow fails after partial completion and you need to undo or mitigate previous steps:

* Cancel hotel booking if flight booking fails
* Refund payment if order fulfillment fails
* Notify stakeholders of rollback

### Elsa-Centric Approach

Elsa doesn't have built-in saga transactions, but you can model compensations using:

1. **Compensation Branches**: Add compensation activities that execute on failure
2. **Follow-Up Workflows**: Trigger a separate compensation workflow
3. **State Storage**: Store compensation data in workflow variables or external storage

### Modeling Compensation

**Option 1: Inline Compensation Branch**

```
[Book Flight] → [Book Hotel] → [Book Car] → [Complete]
      ↓              ↓              ↓
 [Cancel Flight] ← [Cancel Hotel] ← [Cancel Car]
      ↓
   [Fault]
```

Use `Try/Catch` semantics in your activity design or workflow structure.

**Option 2: Compensation Workflow**

Store compensation data as the workflow progresses:

```csharp
// After booking flight
context.SetVariable("FlightBookingId", flightResult.BookingId);
context.SetVariable("CompensationSteps", new List<string> { "CancelFlight" });
```

On failure, either:

* Execute compensation in the same workflow's catch branch
* Dispatch a compensation workflow with the stored state

### Resilience Strategy (elsa-api-client)

For activities that call external services, configure retry policies:

**Reference:** `elsa-api-client` - `ActivityExtensions.SetResilienceStrategy` / `GetResilienceStrategy`

```csharp
// Configure resilience in activity settings
var activitySettings = new Dictionary<string, object>
{
    ["resilienceStrategy"] = new
    {
        retryCount = 3,
        retryInterval = "00:00:30",
        useExponentialBackoff = true
    }
};
```

### Incident Model

Elsa tracks failures via the **Incident** model. When an activity faults:

1. An incident is recorded with the exception details
2. The workflow enters a faulted state
3. You can configure incident strategies (Fault, ContinueWithIncident, etc.)

See [Incidents](../../operate/incidents/) for configuration options.

### Pitfalls

| Pitfall                  | Solution                                                        |
| ------------------------ | --------------------------------------------------------------- |
| Compensation fails       | Design compensations to be idempotent and resilient             |
| State lost between steps | Store compensation data in workflow variables or external store |
| Partial compensation     | Track which compensations have executed                         |

***

## Idempotent External Calls

### When to Use

Ensure external calls are idempotent when:

* Network failures may cause retries
* Workflows may be resumed multiple times
* Distributed systems may deliver duplicate messages

### Elsa-Centric Approach

The `WorkflowResumer` uses distributed locking to prevent concurrent resume attempts, but your activity logic should still be idempotent.

**Code Reference:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`

The resumer acquires a lock before resuming:

```csharp
var lockKey = $"workflow:{workflowInstanceId}:bookmark:{bookmarkId}";
await using var lockHandle = await _distributedLockProvider.AcquireLockAsync(lockKey, ...);
```

### Strategies for Idempotency

1. **Check Before Execute**: Query external system state before making changes
2. **Store Receipts**: Save external call results in workflow variables
3. **Idempotency Keys**: Pass a unique key to external APIs

### Example: Idempotent Payment

```csharp
protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    var paymentId = context.Get(PaymentId);
    
    // Check if already processed
    var receipt = context.GetVariable<PaymentReceipt>("PaymentReceipt");
    if (receipt != null)
    {
        // Already processed - skip
        context.Set(Result, receipt);
        await context.CompleteActivityAsync();
        return;
    }
    
    // Process payment with idempotency key
    var result = await _paymentService.ProcessAsync(new PaymentRequest
    {
        PaymentId = paymentId,
        IdempotencyKey = $"{context.WorkflowExecutionContext.Id}:{context.Id}"
    });
    
    // Store receipt for future resumes
    context.SetVariable("PaymentReceipt", result);
    context.Set(Result, result);
    await context.CompleteActivityAsync();
}
```

### Pitfalls

| Pitfall                                  | Solution                                          |
| ---------------------------------------- | ------------------------------------------------- |
| Resume handler not idempotent            | Store and check completion state before executing |
| External API doesn't support idempotency | Implement check-then-act pattern                  |
| Stale state on retry                     | Always reload current state before decisions      |

***

## Long-Running Workflows

### When to Use

For workflows that span hours, days, or weeks:

* Multi-stage approval processes
* Order fulfillment tracking
* Subscription lifecycle management
* Customer onboarding journeys

### Elsa-Centric Approach

Long-running workflows rely on:

1. **Bookmarks**: Pause execution while waiting for events
2. **Persistence**: Workflow state saved to database
3. **Correlation**: Match incoming events to the correct instance
4. **Retention**: Manage completed workflow cleanup

### Bookmark + Persistence Guidance

* **Persist State Immediately**: Elsa persists after bookmark creation
* **Use Correlation IDs**: Set `CorrelationId` on the workflow instance for easy lookup
* **Design for Resumption**: Activities should not assume in-memory state survives

### Safe Cancellation

To cancel a long-running workflow safely:

```csharp
var workflowInstanceManager = serviceProvider.GetRequiredService<IWorkflowInstanceManager>();

// Cancel the workflow
await workflowInstanceManager.CancelAsync(workflowInstanceId);
```

This:

1. Marks the instance as cancelled
2. Removes associated bookmarks
3. Fires workflow cancelled events

### Retention Configuration

Configure cleanup for completed workflows:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseWorkflowInstanceRetention(retention =>
        {
            retention.RetentionPeriod = TimeSpan.FromDays(30);
            retention.SweepInterval = TimeSpan.FromHours(1);
        });
    });
});
```

See [Retention](../../optimize/retention.md) for detailed configuration.

### Pitfalls

| Pitfall            | Solution                                                    |
| ------------------ | ----------------------------------------------------------- |
| Orphaned bookmarks | Configure retention; validate workflow exists before resume |
| Database bloat     | Set appropriate retention policies                          |
| Version drift      | Plan for workflow definition versioning                     |

***

## Best Practices

### Correlation Keys

* **Stable**: Use business identifiers that don't change (`OrderId`, not timestamps)
* **Low Cardinality**: Avoid overly specific keys that create too many unique values
* **Documented**: Clearly specify the correlation contract between systems

### Idempotency & Distributed Locking

* **WorkflowResumer Locking**: Elsa's resumer acquires distributed locks automatically
* **Activity-Level Idempotency**: Store receipts/state to guard against duplicates
* **External Call Guards**: Use idempotency keys when calling external services

**Reference:** `WorkflowResumer.cs` - uses `IDistributedLockProvider` for lock acquisition

### Scheduling in Clusters

* **Single Scheduler**: Use leader-election pattern OR
* **Quartz Clustering**: All nodes participate with database coordination

**References:**

* `DefaultBookmarkScheduler.cs`: Enqueues scheduled bookmark resume tasks
* `ResumeWorkflowTask.cs`: Quartz job that triggers workflow resume

See [Clustering Guide](../clustering/) for configuration.

### Security for Human Approvals

1. **Tokenized URLs**: Use `GenerateBookmarkTriggerUrl` for opaque, unguessable tokens
2. **Token Expiration**: Configure bookmark expiration
3. **HTTPS Only**: Never send tokens over unencrypted connections
4. **Authorization**: Validate user permissions in resume handlers

**Reference:** `BookmarkExecutionContextExtensions.cs` - `GenerateBookmarkTriggerUrl`

### Observability

#### Tracing with OpenTelemetry

Elsa provides OpenTelemetry integration via `Elsa.OpenTelemetry`:

* **ActivitySource**: Traces workflow and activity execution
* **Middleware**: Adds tracing to HTTP endpoints

**Reference:** `elsa-extensions` - `Elsa.OpenTelemetry` ActivitySource and tracing middleware

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseOpenTelemetry(otel =>
    {
        otel.ConfigureTracing(tracing =>
        {
            tracing.AddSource("Elsa");
        });
    });
});
```

#### Metrics

Elsa does not emit built-in metrics; you must implement custom metrics based on your needs:

* Count workflow completions by definition
* Track average execution time
* Monitor bookmark creation/consumption rates

Example with custom metrics:

```csharp
// In your custom activity or middleware
var counter = myMeter.CreateCounter<long>("elsa.workflows.completed");
counter.Add(1, new KeyValuePair<string, object?>("definition_id", workflowDefinitionId));
```

See your observability platform's documentation for metric collection setup.

***

## Troubleshooting

### Pattern-Specific Issues

| Pattern           | Common Issue           | Quick Fix                                           |
| ----------------- | ---------------------- | --------------------------------------------------- |
| Human Approval    | Resume URL not working | Verify Elsa.Http is configured with correct BaseUrl |
| Event Correlation | Events not matching    | Log both create and resume payloads; check hash     |
| Fan-In            | Never completes        | Add timeout branch; verify all sources signal       |
| Timeout           | Fires multiple times   | Enable Quartz clustering; check AutoBurn            |
| Compensation      | State lost             | Store compensation data before each step            |
| Idempotency       | Duplicate processing   | Check state before executing; use idempotency keys  |
| Long-Running      | Database bloat         | Configure retention policies                        |

### General Debugging Steps

1. **Check Execution Logs**: Review workflow execution journal
2. **Verify Bookmarks**: Query bookmarks table for expected entries
3. **Inspect Incidents**: Check for faulted activities with exception details
4. **Enable Debug Logging**: Set log level for `Elsa.*` namespaces to Debug
5. **Test Isolation**: Use unit tests to verify activity behavior

See [Testing & Debugging](../testing-debugging.md) for comprehensive debugging guidance.

***

## References

* [Blocking Activities & Triggers](../../activities/blocking-and-triggers/) - Bookmark fundamentals and examples
* [Clustering Guide](../clustering/) - Distributed deployment configuration
* [Testing & Debugging](../testing-debugging.md) - Troubleshooting and testing strategies
* [README-REFERENCES.md](README-REFERENCES.md) - Complete list of elsa-core/elsa-extensions file references

## Example Files

* [fanout-flowchart.json](examples/fanout-flowchart.json) - Minimal fan-out JSON example
* [fanin-trigger.cs](examples/fanin-trigger.cs) - Fan-in trigger with aggregation
* [timeout-approval.json](examples/timeout-approval.json) - Timeout pattern with approval

***

**Last Updated:** 2024-11-25
