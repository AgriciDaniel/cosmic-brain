---
type: concept
title: "Elsa Workflow Dispatcher"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-engine
  - architecture
  - dotnet
status: developing
address: c-000097
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Clustering]]"
  - "[[Elsa Onboarding]]"
---

# Elsa Workflow Dispatcher

The dispatcher layer in [[entities/Elsa Workflows]] provides queue-based, asynchronous workflow execution. It decouples the caller from the actual execution, enabling reliable, scalable, and distributed workflow processing.

---

## Execution Models

Elsa provides three execution models with increasing levels of abstraction:

| Model | Interface | Execution | Persistence | Use Case |
|-------|-----------|-----------|-------------|----------|
| Direct Runner | `IWorkflowRunner` | Synchronous, in-process | None | Tests, simple short-lived workflows |
| Dispatcher | `IWorkflowDispatcher` | Asynchronous, queue-based | Automatic | Production, distributed systems |
| Runtime | `IWorkflowRuntime` | Dispatched with lifecycle | Automatic + management | Full-featured production apps |

### IWorkflowRunner

The `IWorkflowRunner` executes workflows synchronously within the current process. It is the foundational execution interface but has significant limitations:

- Workflow state is held in memory only
- Blocking activities (bookmarks) cannot persist between bursts
- No built-in retry or error recovery
- Suitable only for tests or trivial workflows

```csharp
var runner = sp.GetRequiredService<IWorkflowRunner>();
var result = await runner.RunAsync(new MyWorkflow());
```

### IWorkflowDispatcher

The `IWorkflowDispatcher` enqueues a "dispatch request" for later processing. The caller receives a `DispatchWorkflowResponse` containing a `WorkflowInstanceId` but does not wait for completion. Processing happens asynchronously, typically via a background queue.

```csharp
var dispatcher = sp.GetRequiredService<IWorkflowDispatcher>();
var response = await dispatcher.DispatchAsync(
    new DispatchWorkflowDefinitionRequest("my-workflow")
);
// response.WorkflowInstanceId is available immediately
```

### IWorkflowRuntime

The `IWorkflowRuntime` sits above the dispatcher and adds workflow lifetime management: starting, stopping, and managing instances. It handles triggers and stimuli for long-running workflows and is the recommended entry point for production applications.

> [!info] Layered Architecture
> `IWorkflowRuntime` internally delegates to `IWorkflowDispatcher`, which in turn delegates to `IWorkflowRunner` for the actual execution. Each layer builds on the one below.

---

## Dispatch Request Types

The dispatcher handles four distinct request types, each serving a different execution scenario:

### 1. DispatchWorkflowDefinitionRequest

Starts a **new** workflow instance from a workflow definition (the blueprint).

```csharp
await dispatcher.DispatchAsync(
    new DispatchWorkflowDefinitionRequest(
        "workflow-definition-id",  // or use workflow-definition-version-id
        correlationId: "order-123",
        input: new Dictionary<string, object> { ["Amount"] = 99.95m }
    )
);
```

**Properties:** `DefinitionId` (or `DefinitionVersionId`), optional `CorrelationId`, optional `Input`.

### 2. DispatchWorkflowInstanceRequest

Dispatches an **existing** workflow instance for continued execution. Used when resuming a workflow from an external stimulus or after manual creation.

```csharp
await dispatcher.DispatchAsync(
    new DispatchWorkflowInstanceRequest("instance-id")
);
```

**Properties:** `InstanceId` of the workflow to execute.

### 3. DispatchTriggerWorkflowsRequest

Finds and starts **all** workflow definitions that have a trigger matching the given stimulus. The trigger system scans every registered workflow, checks each trigger against the stimulus, and dispatches matches.

```csharp
await dispatcher.DispatchAsync(
    new DispatchTriggerWorkflowsRequest(new HttpTriggerStimulus("GET", "/webhook"))
);
```

**Properties:** `Stimulus` (the event object to match against triggers).

### 4. DispatchResumeWorkflowsRequest

Finds and resumes all workflow instances with a **bookmark** that matches the given stimulus. This is the primary mechanism for resuming long-running workflows.

```csharp
await dispatcher.DispatchAsync(
    new DispatchResumeWorkflowsRequest(new ApprovalStimulus("approved", "order-456"))
);
```

**Properties:** `Stimulus` (the event object to match against bookmarks), optional `CorrelationId` filter.

> [!tip] Stimulus Matching
> A stimulus is matched against triggers and bookmarks using a registration-based system. Each trigger or bookmark has a `Stimulus` associated with it. The dispatcher finds all registered handlers whose stimulus matches the incoming stimulus, then dispatches the corresponding workflows.

---

## Event Flow

When a dispatch request is processed, the following steps occur:

```
1. Dispatcher receives request (e.g., DispatchWorkflowDefinitionRequest)
2. Dispatcher resolves the workflow definition (from store/cache)
3. Dispatcher serializes the request into a queue message
4. Background worker picks up the message
5. Worker deserializes and dispatches to IWorkflowRunner
6. Runner executes the workflow synchronously in the background
7. If blocking: bookmarks are persisted, instance state saved
8. If completing: final state persisted
```

**Transport layer considerations:**
- Default implementation uses `System.Threading.Channels` (in-process, no persistence)
- For production, replace with MassTransit, Azure Service Bus, RabbitMQ, or similar
- Message durability ensures workflows survive process restarts

---

## Custom Dispatcher Implementation

Replace the default dispatcher for custom queuing, routing, or throttling:

```csharp
public class CustomWorkflowDispatcher : IWorkflowDispatcher
{
    private readonly ILogger _logger;
    private readonly IQueueService _queue;

    public async Task<DispatchWorkflowResponse> DispatchAsync(
        DispatchWorkflowDefinitionRequest request,
        CancellationToken cancellationToken = default)
    {
        var instanceId = Guid.NewGuid().ToString();
        
        _logger.LogInformation(
            "Dispatching workflow {DefinitionId} as instance {InstanceId}",
            request.DefinitionId, instanceId);
        
        await _queue.EnqueueAsync(new DispatchMessage
        {
            RequestType = nameof(DispatchWorkflowDefinitionRequest),
            RequestPayload = JsonSerializer.Serialize(request),
            WorkflowInstanceId = instanceId
        });
        
        return new DispatchWorkflowResponse(instanceId);
    }
    // ... other dispatch methods
}
```

Register the custom dispatcher:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime();  // enables dispatcher
});
builder.Services.Replace(
    ServiceDescriptor.Scoped<IWorkflowDispatcher, CustomWorkflowDispatcher>()
);
```

---

## Distributed Considerations

When running multiple Elsa nodes:

- **Queue persistence**: Use a durable transport (RabbitMQ, Azure Service Bus, AWS SQS) so messages survive node failures
- **Idempotency**: Dispatchers should handle duplicate messages gracefully
- **Work balancing**: Each node consumes from the same queue, naturally balancing load
- **Correlation**: Use `CorrelationId` to route related messages to the same tracking context
- **Monitoring**: Track queue depth, processing latency, and failure rates per node

> [!warning] Default Dispatcher is In-Memory
> The default `IWorkflowDispatcher` uses `System.Threading.Channels`, which is **not durable**. If the process restarts, all pending dispatch messages are lost. For production, always replace with a persistent message transport.

---

## Related

- [[Elsa Workflow Concepts]] -- Core workflow building blocks
- [[Elsa Clustering]] -- Distributed runtime considerations
- [[Elsa Onboarding]] -- Adding dispatcher to an existing application
- [[entities/Elsa Workflows]] -- Platform overview
