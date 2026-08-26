---
type: concept
title: "Elsa Workflow Patterns"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-patterns
  - guides
status: developing
address: c-000099
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Running Workflows]]"
  - "[[Elsa Troubleshooting]]"
---

# Elsa Workflow Patterns

Common workflow patterns in [[entities/Elsa Workflows]] v3, with code snippets, pitfalls, and references.

---

## Human-in-the-Loop Approval

**When to use:** Expense approvals, document reviews, manual quality gates, escalation decisions.

**Approach:** [[Elsa Workflow Concepts#Bookmark|Blocking activities]] create bookmarks that suspend the workflow. An external system resumes it with the decision.

```csharp
// Create a bookmark and suspend
var bookmarkArgs = new CreateBookmarkArgs
{
    BookmarkName = "WaitForApproval",
    Payload = new { ApprovalId = context.Get(ApprovalId) },
    Callback = OnApprovalReceivedAsync,
    AutoBurn = true  // Consume after one use
};
var bookmark = context.CreateBookmark(bookmarkArgs);
// Generate resume URL
var resumeUrl = context.GenerateBookmarkTriggerUrl(bookmark.Id);
```

**Pitfalls:**
- Resume URLs require authentication — use tokenized short-expiry URLs
- `AutoBurn = true` prevents multiple responses from racing
- Hash mismatches cause "Bookmark not found" errors

---

## Event-Driven Correlation

**When to use:** Workflow reacts to events keyed by `OrderId`, `CustomerId`, multi-step external callbacks.

**Approach:** Elsa uses **stimulus hashing** — when a bookmark is created with a payload, a deterministic hash is computed. Resuming requires the identical payload structure.

```csharp
// Creating a correlated bookmark
var bookmarkArgs = new CreateBookmarkArgs
{
    BookmarkName = "OrderEvent",
    Payload = new OrderEventPayload { OrderId = orderId, EventType = "PaymentReceived" },
    Callback = OnOrderEventAsync
};
context.CreateBookmark(bookmarkArgs);
```

```csharp
// Resuming by stimulus
var stimulus = new BookmarkStimulus
{
    BookmarkName = "OrderEvent",
    Payload = new OrderEventPayload { OrderId = orderId, EventType = "PaymentReceived" }
};
var results = await _workflowResumer.ResumeAsync(stimulus, input);
```

**Best practices:**
- Use stable business identifiers (`OrderId`, not random GUIDs)
- Keep payload cardinality low — avoid timestamps in hash payloads
- Use a shared payload class for both create and resume

---

## Fan-Out / Fan-In

**When to use:** Processing items in parallel, multi-channel notifications, waiting for multiple approvers.

**Fan-out options:** `Parallel` activity, `ForEach` (parallel mode), Flowchart with multiple outgoing connections.

**Fan-in options:** `Fork/Join` (`WaitAll` or `WaitAny`), trigger-based with aggregation key, counter-based with workflow variables.

### Fan-Out Flowchart (JSON)

```
Start → [Branch 1 Activity] → Join (WaitAll) → Continue
Start → [Branch 2 Activity] → Join (WaitAll) → Continue
```

### Fan-In with Trigger (SignalFanInTrigger)

For signals arriving asynchronously from external sources, use a trigger with an **aggregation key**:

```csharp
// Payload shape
public record SignalPayload
{
    public string SignalName { get; init; }
    public string AggregationKey { get; init; }  // e.g., "Order-12345"
}
```

Alternative: use Elsa's built-in `Signal` activity in a Fork/Join pattern with `WaitAll` mode.

**Pitfalls:**
- Fan-in never completes → add timeout branch (see [[#Timeout / Escalation]])
- Duplicate signals processed → track received signals by source
- Aggregation key collision → include workflow instance ID or correlation ID

---

## Timeout / Escalation

**When to use:** Approval deadlines, SLA enforcement, escalation to supervisors, retry with backoff.

**Approach:** Combine a blocking activity with a timer using `Fork/Join` in `WaitAny` mode. The first to complete wins.

```json
{
  "type": "Elsa.Fork",
  "branches": [
    {
      "id": "approval-branch",
      "activities": [{ "type": "Custom.WaitForApproval" }]
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

**Timer options:** `Delay` (fixed duration), `Timer` (specific time), `Cron` (recurring).

**Clustered deployments:** Use Quartz clustering to prevent duplicate timeout execution.

**Pitfalls:**
- Timeout fires multiple times → enable Quartz clustering, set `AutoBurn = true`
- Race between approval and timeout → design outcome handling to be idempotent
- Timezone issues → store all times in UTC

---

## Compensation / Saga-Lite

**When to use:** Undo previous steps when a long-running workflow fails after partial completion (e.g., cancel hotel if flight fails).

**Approach:** Elsa has no built-in saga transactions, but compensations can be modeled with:
1. **Inline compensation branches** — `Try/Catch` semantics in workflow structure
2. **Compensation workflows** — dispatch a separate workflow to undo steps
3. **State storage** — store compensation data in workflow variables

**Resilience:** Configure retry policies on activities using `SetResilienceStrategy()`.

**Incident model:** When an activity faults, an incident is recorded and the workflow enters a faulted state. Configure incident strategies (Fault, ContinueWithIncident, etc.).

**Pitfalls:**
- Design compensations to be idempotent
- Store compensation data in workflow variables or external storage before each step
- Track which compensations have already executed

---

## Idempotent External Calls

**When to use:** Network failures may cause retries, workflows may resume multiple times, distributed systems may deliver duplicate messages.

**Approach:** Elsa's `WorkflowResumer` uses distributed locking to prevent concurrent resume. Additionally, activity logic should be idempotent:

```csharp
// Check if already processed before executing
var receipt = context.GetVariable<PaymentReceipt>("PaymentReceipt");
if (receipt != null)
{
    context.Set(Result, receipt);
    await context.CompleteActivityAsync();
    return;
}
// Process with idempotency key
var result = await _paymentService.ProcessAsync(new PaymentRequest
{
    IdempotencyKey = $"{context.WorkflowExecutionContext.Id}:{context.Id}"
});
context.SetVariable("PaymentReceipt", result);
```

**Strategies:** Check-before-execute, store receipts in variables, pass idempotency keys to external APIs.

---

## Long-Running Workflows

**When to use:** Multi-stage approvals, order fulfillment, subscription lifecycle, customer onboarding — workflows spanning hours, days, or weeks.

**Approach:** Relies on bookmarks, persistence, correlation, and retention:

1. **Persist state immediately** — Elsa persists after bookmark creation
2. **Use correlation IDs** — set `CorrelationId` for easy instance lookup
3. **Design for resumption** — activities should not assume in-memory state survives

**Cancellation:**
```csharp
var workflowInstanceManager = serviceProvider.GetRequiredService<IWorkflowInstanceManager>();
await workflowInstanceManager.CancelAsync(workflowInstanceId);
```

**Retention:**
```csharp
management.UseWorkflowInstanceRetention(retention =>
{
    retention.RetentionPeriod = TimeSpan.FromDays(30);
    retention.SweepInterval = TimeSpan.FromHours(1);
});
```

---

## Best Practices Summary

- **Correlation keys** — use stable business identifiers with low cardinality
- **Idempotency** — the `WorkflowResumer` acquires distributed locks; still guard activities with check-before-execute
- **Clustering** — use Quartz clustering or leader-election for scheduled tasks
- **Security** — tokenize resume URLs, set short expiration, validate permissions in handlers
- **Observability** — use `Elsa.OpenTelemetry` for tracing; implement custom metrics for monitoring

> [!info] Troubleshooting Patterns
> See [[Elsa Troubleshooting]] for pattern-specific issue resolution.
