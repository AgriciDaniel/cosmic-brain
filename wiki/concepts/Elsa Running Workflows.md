---
type: concept
title: "Elsa Running Workflows"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-execution
  - guides
status: developing
address: c-000086
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Workflow Patterns]]"
---

# Elsa Running Workflows

[[entities/Elsa Workflows]] supports multiple ways to run workflows, from the visual designer to programmatic APIs. This page covers every execution method.

---

## Ways to Run a Workflow

### 1. Using Elsa Studio

The simplest way: open the workflow in [[Elsa Studio Guide|Elsa Studio]] and click the green **Run** arrow in the designer. This executes the workflow immediately with no input and no trigger requirement.

### 2. Using a Trigger

Triggers are activities that automatically start a new workflow instance when a specific event occurs. Built-in triggers:

| Trigger | Mechanism |
|---------|-----------|
| **HTTP Endpoint** | Starts when a matching HTTP request arrives at the server |
| **Timer** | Fires at a fixed `TimeSpan` interval |
| **Cron** | Fires on a CRON expression schedule |
| **Event** | Fires when a named custom application event is received |

Example: an `HttpEndpoint` activity at path `/hello-world` with `CanStartWorkflow = true` starts the workflow whenever a GET request hits that URL.

### 3. Using the Dispatch Workflow Activity

A running workflow can start another workflow using the **Dispatch Workflow** activity. This supports:

- **Waiting mode**: Set `WaitForCompletion = true` to pause the parent until the child finishes
- **Fire-and-forget**: Dispatch without waiting
- **Input passing**: Pass a dictionary of inputs to the child workflow
- **Result capture**: Collect output from the child into a parent variable

```csharp
new DispatchWorkflow
{
    WorkflowDefinitionId = new(nameof(ChildWorkflow)),
    Input = new(new Dictionary<string, object>
    {
        ["ParentMessage"] = "Hello from parent!"
    }),
    WaitForCompletion = new(true),
    Result = new(childOutput)
}
```

### 4. Using the REST API

The Elsa Server exposes two key endpoints for programmatic execution.

#### Synchronous Execution (`/execute`)

```
POST /elsa/api/workflow-definitions/{definitionId}/execute
```

The HTTP request blocks until the workflow completes or suspends. Use for workflows that return results synchronously.

```bash
curl -X POST 'https://localhost:5001/elsa/api/workflow-definitions/my-workflow/execute' \
  --header 'Authorization: ApiKey YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{"input": {"message": "Hello World!"}}'
```

**Request body parameters:**
- `input` (optional) — dictionary of input values
- `correlationId` (optional) — correlation ID for the instance
- `name` (optional) — custom instance name
- `triggerActivityId` (optional) — start from a specific trigger
- `versionOptions` (optional) — version selection

#### Asynchronous Execution (`/dispatch`)

```
POST /elsa/api/workflow-definitions/{definitionId}/dispatch
```

Returns immediately after queuing. Use for long-running or fire-and-forget workflows.

```bash
curl -X POST 'https://localhost:5001/elsa/api/workflow-definitions/my-workflow/dispatch' \
  --header 'Authorization: ApiKey YOUR_API_KEY' \
  --data-raw '{"input": {"orderId": "12345"}}'
```

#### Authentication

The REST API supports:
- **API Key**: `Authorization: ApiKey YOUR_API_KEY`
- **Bearer Token (JWT)**: `Authorization: Bearer YOUR_JWT_TOKEN`
- **Basic Auth**: `Authorization: Basic BASE64_ENCODED_CREDENTIALS`

### 5. Using the Elsa Library (Programmatic)

#### IWorkflowRunner (Simple, In-Process)

Use `IWorkflowRunner` for unit tests, short-lived workflows, or synchronous in-process execution. No persistence, no suspension support.

```csharp
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();
var result = await workflowRunner.RunAsync(workflow);
Console.WriteLine($"Workflow status: {result.WorkflowState.Status}");
```

#### IWorkflowRuntime (Client API, Recommended for Apps)

Use `IWorkflowRuntime` for most production scenarios. Supports persistence, bookmarks, and resumption.

```csharp
var workflowRuntime = serviceProvider.GetRequiredService<IWorkflowRuntime>();
var client = await workflowRuntime.CreateClientAsync();
var result = await client.CreateAndRunInstanceAsync(new CreateAndRunWorkflowInstanceRequest
{
    WorkflowDefinitionHandle = WorkflowDefinitionHandle.ByDefinitionId("my-workflow"),
    Input = new Dictionary<string, object> { ["message"] = "Hello!" },
    CorrelationId = "optional-correlation-id",
    IncludeWorkflowOutput = true
});
```

#### IWorkflowDispatcher (Queue-Based, Distributed)

Use `IWorkflowDispatcher` for queue-based dispatching in distributed systems. Provides fine-grained control over execution strategy.

> [!info] Service Comparison
> | Service | Execution | Persistence | Resumption | Distribution |
> |---------|-----------|-------------|------------|--------------|
> | `IWorkflowRunner` | Sync, in-process | No | No | No |
> | `IWorkflowRuntime` | Async, persisted | Yes | Yes | Limited |
> | `IWorkflowDispatcher` | Queue-based | Yes | Yes | Yes |

---

## Troubleshooting REST API Execution

Common issues when running workflows via the API:

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| API returns immediately, response activity not reached | Using `/dispatch` instead of `/execute` | Use `/execute` for synchronous workflows |
| Workflow faults before reaching response | Exception in earlier activity | Check execution logs and incidents |
| HTTP timeout | Long-running workflow | Use `/dispatch` with polling/callback |
| "Workflow not found" | Definition not published | Publish the workflow in Studio or via API |
| No trigger activity matched | Missing `UseHttp()` config | Ensure `app.UseWorkflows()` is registered |

### Debugging Steps

1. Check execution status: `GET /elsa/api/workflow-instances/{instanceId}`
2. Review the execution log for faulted activities
3. Enable debug logging for `Elsa` and `Elsa.Http` namespaces
4. Test with a minimal workflow (HTTP Endpoint -> HTTP Response) to isolate issues
