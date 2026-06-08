---
description: >-
  Deep dive into IWorkflowDispatcher: the core dispatching abstraction for queuing and executing workflows, covering request types, event ordering, and custom dispatcher implementations.
---

# Workflow Dispatcher Architecture

{% hint style="info" %}
**Note**: This guide provides a deep dive into workflow dispatching. For a broader understanding of Elsa's architecture and how dispatching fits into the overall system, see the [Architecture Overview](README.md).
{% endhint %}

## Overview

The `IWorkflowDispatcher` is Elsa's core abstraction for **enqueuing and dispatching** workflows for execution. It provides a flexible mechanism to start, resume, and trigger workflows, with support for both in-process and distributed execution scenarios.

Understanding the dispatcher is crucial for:
- **Custom execution strategies**: Implementing background processing, queueing, or distributed workflows
- **Event-driven architectures**: Understanding how triggers and bookmarks flow through the system
- **Multi-process deployments**: Coordinating workflow execution across multiple nodes
- **Debugging and troubleshooting**: Knowing the sequence of events during workflow execution

## IWorkflowDispatcher vs IWorkflowRunner vs IWorkflowRuntime

Before diving into the dispatcher, it's important to understand how it relates to other workflow execution services:

| Service | Purpose | Execution Model | Use Case |
|---------|---------|-----------------|----------|
| **IWorkflowRunner** | Direct, in-process execution | Synchronous, immediate | Testing, simple workflows, in-process scenarios |
| **IWorkflowRuntime** | Runtime abstraction with persistence | Async, with persistence and client API | Most application scenarios, managed execution |
| **IWorkflowDispatcher** | Dispatching and queuing abstraction | Async, queue-based | Background processing, distributed systems, custom execution strategies |

### When to Use Each

- **IWorkflowRunner**: Use when you need immediate, synchronous execution in the same process. Ideal for unit tests or simple, non-persistent workflows.
  
- **IWorkflowRuntime**: Use for most application scenarios where you need workflow persistence, state management, and the ability to resume workflows. Provides a high-level client API for workflow operations.

- **IWorkflowDispatcher**: Use when you need custom control over how workflows are queued and executed, or when building distributed/multi-process architectures. Also used internally by triggers and the runtime.

## IWorkflowDispatcher Interface

The `IWorkflowDispatcher` defines four primary dispatch methods, each handling a different workflow execution scenario:

````csharp
public interface IWorkflowDispatcher
{
    Task<DispatchWorkflowDefinitionResponse> DispatchAsync(
        DispatchWorkflowDefinitionRequest request, 
        CancellationToken cancellationToken = default);
    
    Task<DispatchWorkflowInstanceResponse> DispatchAsync(
        DispatchWorkflowInstanceRequest request, 
        CancellationToken cancellationToken = default);
    
    Task<DispatchTriggerWorkflowsResponse> DispatchAsync(
        DispatchTriggerWorkflowsRequest request, 
        CancellationToken cancellationToken = default);
    
    Task<DispatchResumeWorkflowsResponse> DispatchAsync(
        DispatchResumeWorkflowsRequest request, 
        CancellationToken cancellationToken = default);
}
````

## Dispatch Request Types

### 1. DispatchWorkflowDefinitionRequest

**Purpose**: Start a new workflow instance from a workflow definition.

**Use Cases**:
- Starting a workflow via REST API
- Programmatically creating and starting workflows
- Batch processing where each item starts a new workflow instance

**Request Properties**:
- `DefinitionId`: The workflow definition ID
- `VersionOptions`: Options for selecting the workflow version (latest, specific version, etc.)
- `CorrelationId`: Optional correlation ID for tracking related workflows
- `Input`: Dictionary of input parameters
- `InstanceId`: Optional predefined instance ID
- `TriggerActivityId`: Optional ID of a specific trigger activity to start from
- `Properties`: Additional metadata for the workflow instance

**Event Flow**:

```
1. Client calls DispatchAsync(DispatchWorkflowDefinitionRequest)
   ↓
2. Dispatcher validates the definition exists and is published
   ↓
3. Dispatcher creates a new workflow instance with the provided inputs
   ↓
4. Dispatcher enqueues the workflow for execution
   ↓
5. Background worker/executor picks up the request
   ↓
6. Workflow execution begins
   ↓
7. Activities execute in sequence/parallel based on workflow definition
   ↓
8. Workflow state is persisted (if persistence is enabled)
   ↓
9. Workflow completes, suspends (on bookmark), or faults
   ↓
10. Response returned with workflow state
```

**Example**:

````csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;
using Elsa.Workflows.Models;
using Microsoft.Extensions.DependencyInjection;

var dispatcher = serviceProvider.GetRequiredService<IWorkflowDispatcher>();

var request = new DispatchWorkflowDefinitionRequest
{
    DefinitionId = "order-processing-workflow",
    VersionOptions = VersionOptions.Latest,
    CorrelationId = $"order-{orderId}",
    Input = new Dictionary<string, object>
    {
        ["OrderId"] = orderId,
        ["CustomerId"] = customerId,
        ["Amount"] = orderAmount
    }
};

var response = await dispatcher.DispatchAsync(request);
Console.WriteLine($"Workflow instance created: {response.WorkflowInstanceId}");
````

### 2. DispatchWorkflowInstanceRequest

**Purpose**: Resume or continue execution of an existing workflow instance.

**Use Cases**:
- Resuming a suspended workflow that was persisted
- Re-executing a workflow that faulted
- Dispatching a loaded workflow instance for execution

**Request Properties**:
- `InstanceId`: The ID of the workflow instance to dispatch
- `Input`: Optional input to provide to the workflow on resume
- `BookmarkId`: Optional bookmark ID if resuming from a specific bookmark
- `ActivityId`: Optional activity ID to resume from
- `ActivityNodeId`: Optional activity node ID in the workflow graph

**Event Flow**:

```
1. Client calls DispatchAsync(DispatchWorkflowInstanceRequest)
   ↓
2. Dispatcher loads the workflow instance from persistence
   ↓
3. Dispatcher validates the instance exists and is in a resumable state
   ↓
4. Dispatcher enqueues the instance for execution/resumption
   ↓
5. Background worker picks up the request
   ↓
6. Workflow execution resumes from the point of suspension or specified activity
   ↓
7. Activities execute, state is persisted
   ↓
8. Workflow completes, suspends, or faults
   ↓
9. Response returned with updated workflow state
```

**Example**:

````csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;

var dispatcher = serviceProvider.GetRequiredService<IWorkflowDispatcher>();

var request = new DispatchWorkflowInstanceRequest
{
    InstanceId = workflowInstanceId,
    Input = new Dictionary<string, object>
    {
        ["ApprovalDecision"] = "Approved",
        ["ApprovedBy"] = userId
    }
};

var response = await dispatcher.DispatchAsync(request);
Console.WriteLine($"Workflow resumed: {response.WorkflowInstanceId}");
````

### 3. DispatchTriggerWorkflowsRequest

**Purpose**: Trigger workflows based on an external stimulus (event, HTTP request, message, etc.).

**Use Cases**:
- HTTP endpoints triggering workflows
- Message broker events (RabbitMQ, Azure Service Bus)
- Timer/scheduled triggers
- Custom event sources

**Request Properties**:
- `ActivityTypeName`: The type of trigger activity
- `BookmarkPayload`: Payload data for bookmark matching
- `CorrelationId`: Optional correlation ID
- `WorkflowInstanceId`: Optional specific instance to trigger
- `Input`: Input data for triggered workflows

**Event Flow**:

```
1. External event occurs (HTTP request, message, timer fires)
   ↓
2. Trigger handler calls DispatchAsync(DispatchTriggerWorkflowsRequest)
   ↓
3. Dispatcher queries for workflow definitions with matching triggers
   ↓
4. Dispatcher filters by trigger type and payload hash
   ↓
5. For each matching workflow definition:
   a. Create new workflow instance
   b. Enqueue for execution
   ↓
6. Background workers pick up instances
   ↓
7. Workflows execute from the trigger activity
   ↓
8. State persisted
   ↓
9. Response includes list of triggered workflow instances
```

**Example**:

````csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;

var dispatcher = serviceProvider.GetRequiredService<IWorkflowDispatcher>();

// Example: Triggering workflows with HTTP endpoint trigger
var request = new DispatchTriggerWorkflowsRequest
{
    ActivityTypeName = "Elsa.HttpEndpoint",
    BookmarkPayload = new
    {
        Path = "/api/webhooks/order-created",
        Method = "POST"
    },
    Input = new Dictionary<string, object>
    {
        ["RequestBody"] = requestBody,
        ["Headers"] = headers
    }
};

var response = await dispatcher.DispatchAsync(request);
Console.WriteLine($"Triggered {response.WorkflowInstanceIds.Count} workflow(s)");
````

### 4. DispatchResumeWorkflowsRequest

**Purpose**: Resume workflows that are suspended at a bookmark (waiting for an event).

**Use Cases**:
- Resuming workflows waiting for user approval
- Continuing workflows after receiving a callback
- Processing events for suspended workflows
- Timer-based resumption of delayed workflows

**Request Properties**:
- `ActivityTypeName`: Type of activity that created the bookmark
- `BookmarkPayload`: Payload for matching the bookmark
- `CorrelationId`: Optional correlation ID
- `WorkflowInstanceId`: Optional specific instance to resume
- `Input`: Input data to provide on resume

**Event Flow**:

```
1. External event occurs (approval received, callback, timer)
   ↓
2. Event handler calls DispatchAsync(DispatchResumeWorkflowsRequest)
   ↓
3. Dispatcher queries for bookmarks matching:
   - Activity type
   - Payload hash
   - Optional correlation ID or instance ID
   ↓
4. For each matching bookmark:
   a. Load the suspended workflow instance
   b. Validate instance is suspended and bookmark exists
   c. Enqueue for resumption
   ↓
5. Background workers pick up instances
   ↓
6. Workflows resume from the bookmarked activity
   ↓
7. Bookmark is "burned" (deleted) if AutoBurn is true
   ↓
8. Workflow continues execution, state persisted
   ↓
9. Response includes list of resumed workflow instances
```

**Example**:

````csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;

var dispatcher = serviceProvider.GetRequiredService<IWorkflowDispatcher>();

// Example: Resuming workflows waiting for approval
var request = new DispatchResumeWorkflowsRequest
{
    ActivityTypeName = "MyApp.WaitForApproval",
    BookmarkPayload = new
    {
        ApprovalId = approvalId
    },
    Input = new Dictionary<string, object>
    {
        ["Decision"] = "Approved",
        ["ApprovedBy"] = userId,
        ["ApprovedAt"] = DateTime.UtcNow
    }
};

var response = await dispatcher.DispatchAsync(request);
Console.WriteLine($"Resumed {response.WorkflowInstanceIds.Count} workflow(s)");
````

## Event Ordering and Execution Flow

Understanding the order of events during workflow dispatch is crucial for debugging and implementing custom dispatchers.

### Starting a New Workflow (DispatchWorkflowDefinitionRequest)

**Detailed Sequence**:

1. **Validate Definition**: Check that the workflow definition exists and is published
2. **Create Instance**: Instantiate a new `WorkflowInstance` with unique ID
3. **Set Input**: Apply input parameters to the workflow execution context
4. **Set Correlation**: Apply correlation ID if provided
5. **Enqueue**: Add the dispatch request to the execution queue
6. **Dequeue** (by worker): Background worker picks up the request
7. **Load Workflow**: Materialize the workflow definition into an executable graph
8. **Initialize Context**: Create workflow execution context with variables and state
9. **Execute**: Begin execution from the root activity or specified trigger
10. **Persist State**: Save workflow state after each activity or at suspension points
11. **Complete/Suspend/Fault**: Workflow reaches a terminal state
12. **Return Response**: Response includes instance ID and final/current state

### Resuming an Existing Workflow (DispatchWorkflowInstanceRequest)

**Detailed Sequence**:

1. **Validate Instance**: Check that the instance exists and is resumable
2. **Load State**: Retrieve persisted workflow state from storage
3. **Apply Input**: Merge any new input with existing workflow state
4. **Enqueue**: Add the resume request to the execution queue
5. **Dequeue** (by worker): Background worker picks up the request
6. **Reconstruct Context**: Rebuild the workflow execution context from persisted state
7. **Resume Execution**: Continue from the point of suspension or specified activity
8. **Persist State**: Save updated state after each activity
9. **Complete/Suspend/Fault**: Workflow reaches next state transition
10. **Return Response**: Response includes updated workflow state

### Triggering Workflows (DispatchTriggerWorkflowsRequest)

**Detailed Sequence**:

1. **Query Triggers**: Find all workflow definitions with matching trigger activities
2. **Filter by Type**: Match activity type (e.g., HttpEndpoint, TimerTrigger)
3. **Filter by Payload**: Match bookmark payload hash
4. **Create Instances**: For each matching definition, create a new instance
5. **Set Correlation**: Apply correlation ID from the trigger
6. **Batch Enqueue**: Add all triggered instances to the execution queue
7. **Dequeue** (by workers): Workers pick up and execute each instance
8. **Execute from Trigger**: Each workflow starts from the trigger activity
9. **Persist State**: State saved for each instance
10. **Return Response**: Response includes all triggered instance IDs

### Resuming on Bookmark (DispatchResumeWorkflowsRequest)

**Detailed Sequence**:

1. **Query Bookmarks**: Find all bookmarks matching the criteria:
   - Activity type name
   - Payload hash
   - Optional correlation ID or instance ID
2. **Acquire Locks**: For each bookmark, acquire distributed lock on the instance
3. **Validate State**: Ensure instance is still suspended and bookmark hasn't been burned
4. **Load Instances**: Load persisted state for each matching instance
5. **Batch Enqueue**: Add all resume requests to the execution queue
6. **Dequeue** (by workers): Workers pick up each resume request
7. **Resume from Bookmark**: Execution continues from the bookmarked activity
8. **Burn Bookmark**: Delete the bookmark if AutoBurn is enabled
9. **Execute Activities**: Continue through the workflow
10. **Persist State**: Save updated state
11. **Return Response**: Response includes all resumed instance IDs

## Custom Dispatcher Implementations

### Why Implement a Custom Dispatcher?

The default dispatcher (`DefaultWorkflowDispatcher`) executes workflows immediately in the same process. Custom dispatchers enable:

- **Background Processing**: Queue workflows to a message broker (RabbitMQ, Azure Service Bus, Kafka)
- **Distributed Execution**: Send workflows to specific worker nodes based on criteria (load balancing, affinity)
- **Priority Queuing**: Execute high-priority workflows first
- **Rate Limiting**: Throttle workflow execution to prevent overload
- **Custom Routing**: Route workflows to specialized workers (e.g., CPU-intensive vs I/O-bound)

### Implementing a Custom Dispatcher

````csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;
using System.Text.Json;

// NOTE: This example uses placeholder types (IMessageQueue and WorkflowDispatchMessage)
// for demonstration purposes. Replace these with your actual message queue infrastructure:
// - For RabbitMQ: Use MassTransit.IBus or RabbitMQ.Client
// - For Azure Service Bus: Use Azure.Messaging.ServiceBus.ServiceBusClient
// - For AWS SQS: Use Amazon.SQS.IAmazonSQS
// - For Kafka: Use Confluent.Kafka.IProducer
public class QueueBasedWorkflowDispatcher : IWorkflowDispatcher
{
    private readonly IMessageQueue _messageQueue;
    private readonly ILogger<QueueBasedWorkflowDispatcher> _logger;

    public QueueBasedWorkflowDispatcher(
        IMessageQueue messageQueue,
        ILogger<QueueBasedWorkflowDispatcher> logger)
    {
        _messageQueue = messageQueue;
        _logger = logger;
    }

    public async Task<DispatchWorkflowDefinitionResponse> DispatchAsync(
        DispatchWorkflowDefinitionRequest request,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation(
            "Queuing workflow definition {DefinitionId} for execution",
            request.DefinitionId);

        // Generate instance ID
        var instanceId = Guid.NewGuid().ToString();

        // Serialize the request and enqueue
        var message = new WorkflowDispatchMessage
        {
            InstanceId = instanceId,
            RequestType = "StartDefinition",
            Payload = JsonSerializer.Serialize(request)
        };

        await _messageQueue.EnqueueAsync("workflow-execution-queue", message, cancellationToken);

        return new DispatchWorkflowDefinitionResponse
        {
            WorkflowInstanceId = instanceId,
            Status = WorkflowStatus.Pending
        };
    }

    public async Task<DispatchWorkflowInstanceResponse> DispatchAsync(
        DispatchWorkflowInstanceRequest request,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation(
            "Queuing workflow instance {InstanceId} for resumption",
            request.InstanceId);

        var message = new WorkflowDispatchMessage
        {
            InstanceId = request.InstanceId,
            RequestType = "ResumeInstance",
            Payload = JsonSerializer.Serialize(request)
        };

        await _messageQueue.EnqueueAsync("workflow-execution-queue", message, cancellationToken);

        return new DispatchWorkflowInstanceResponse
        {
            WorkflowInstanceId = request.InstanceId
        };
    }

    public async Task<DispatchTriggerWorkflowsResponse> DispatchAsync(
        DispatchTriggerWorkflowsRequest request,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation(
            "Queuing trigger request for activity type {ActivityType}",
            request.ActivityTypeName);

        // Query for matching workflow definitions (implementation depends on your store)
        var matchingDefinitions = await FindMatchingTriggersAsync(request, cancellationToken);

        var instanceIds = new List<string>();

        foreach (var definition in matchingDefinitions)
        {
            var instanceId = Guid.NewGuid().ToString();
            instanceIds.Add(instanceId);

            var message = new WorkflowDispatchMessage
            {
                InstanceId = instanceId,
                RequestType = "Trigger",
                Payload = JsonSerializer.Serialize(new
                {
                    DefinitionId = definition.DefinitionId,
                    TriggerRequest = request
                })
            };

            await _messageQueue.EnqueueAsync("workflow-execution-queue", message, cancellationToken);
        }

        return new DispatchTriggerWorkflowsResponse
        {
            WorkflowInstanceIds = instanceIds
        };
    }

    public async Task<DispatchResumeWorkflowsResponse> DispatchAsync(
        DispatchResumeWorkflowsRequest request,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation(
            "Queuing resume request for activity type {ActivityType}",
            request.ActivityTypeName);

        // Query for matching bookmarks (implementation depends on your store)
        var matchingBookmarks = await FindMatchingBookmarksAsync(request, cancellationToken);

        var instanceIds = new List<string>();

        foreach (var bookmark in matchingBookmarks)
        {
            instanceIds.Add(bookmark.WorkflowInstanceId);

            var message = new WorkflowDispatchMessage
            {
                InstanceId = bookmark.WorkflowInstanceId,
                RequestType = "Resume",
                Payload = JsonSerializer.Serialize(new
                {
                    BookmarkId = bookmark.Id,
                    ResumeRequest = request
                })
            };

            await _messageQueue.EnqueueAsync("workflow-execution-queue", message, cancellationToken);
        }

        return new DispatchResumeWorkflowsResponse
        {
            WorkflowInstanceIds = instanceIds
        };
    }

    // NOTE: The following methods are intentionally incomplete example code.
    // They demonstrate the pattern for querying workflow definitions and bookmarks
    // but should be implemented based on your specific storage configuration.
    
    private async Task<List<WorkflowDefinition>> FindMatchingTriggersAsync(
        DispatchTriggerWorkflowsRequest request,
        CancellationToken cancellationToken)
    {
        // Query your workflow definition store for definitions with triggers matching the request.
        // Recommended implementation using Elsa's built-in services:
        // 
        // 1. Inject IWorkflowDefinitionStore from Elsa.Workflows.Management namespace
        // 2. Use FindManyAsync with a filter:
        //    - IsPublished = true
        //    - Filter by definitions containing trigger activities matching request.ActivityTypeName
        // 3. For each definition, check if trigger payload hash matches request.BookmarkPayload
        // 4. Return list of matching WorkflowDefinition objects
        //
        // Example:
        // var filter = new WorkflowDefinitionFilter { IsPublished = true };
        // var definitions = await _workflowDefinitionStore.FindManyAsync(filter, cancellationToken);
        // return definitions.Where(def => HasMatchingTrigger(def, request)).ToList();
        
        throw new NotImplementedException("Implement using IWorkflowDefinitionStore from Elsa.Workflows.Management");
    }

    private async Task<List<Bookmark>> FindMatchingBookmarksAsync(
        DispatchResumeWorkflowsRequest request,
        CancellationToken cancellationToken)
    {
        // Query your bookmark store for bookmarks matching the request.
        // Recommended implementation using Elsa's built-in services:
        //
        // 1. Inject IBookmarkStore from Elsa.Workflows.Runtime namespace
        // 2. Use FindManyAsync with a BookmarkFilter:
        //    - ActivityTypeName = request.ActivityTypeName
        //    - Hash = compute hash from request.BookmarkPayload
        //    - Optionally: CorrelationId, WorkflowInstanceId
        // 3. Return list of matching Bookmark objects
        //
        // Example:
        // var filter = new BookmarkFilter
        // {
        //     ActivityTypeName = request.ActivityTypeName,
        //     Hash = _hasher.Hash(request.BookmarkPayload),
        //     CorrelationId = request.CorrelationId,
        //     WorkflowInstanceId = request.WorkflowInstanceId
        // };
        // return await _bookmarkStore.FindManyAsync(filter, cancellationToken);
        
        throw new NotImplementedException("Implement using IBookmarkStore from Elsa.Workflows.Runtime");
    }
}
````

### Registering a Custom Dispatcher

````csharp
using Microsoft.Extensions.DependencyInjection;

builder.Services.AddElsa(elsa =>
{
    // Replace the default dispatcher with your custom implementation
    elsa.Services.AddSingleton<IWorkflowDispatcher, QueueBasedWorkflowDispatcher>();
});
````

## Multi-Process and Multi-Node Considerations

When running Elsa in a distributed environment (multiple nodes/processes), understanding dispatcher behavior is critical:

### Distributed Locking

- The dispatcher itself doesn't implement locking
- Locking happens at the **execution** level via `IDistributedLockProvider`
- When resuming workflows, ensure distributed locks prevent concurrent execution of the same instance

### Bookmark Resolution

- Bookmarks are stored in a shared database
- Multiple nodes can query bookmarks simultaneously
- The first node to acquire the lock on an instance wins
- Bookmark hashing must be deterministic across all nodes

### Queue-Based Dispatch

For true distributed execution:
1. Dispatcher enqueues to a message broker
2. Worker nodes consume from the queue
3. Workers execute workflows using `IWorkflowRunner`
4. State is persisted to shared storage
5. Workers release locks after execution

### Singleton Scheduler

For timer/scheduled workflows in clusters:
- Use Quartz clustering to ensure only one node schedules timers
- Or designate a single "scheduler" node
- See [Clustering Guide](../clustering/README.md) for configuration

## Troubleshooting Dispatcher Issues

### Workflows Not Starting

**Symptoms**: Dispatch calls succeed but workflows don't execute

**Checks**:
1. Verify the dispatcher is properly registered
2. Check for background worker or queue consumer running
3. Verify workflow definition is published
4. Check logs for exceptions during dispatch or execution

### Duplicate Executions

**Symptoms**: Same workflow executes multiple times from a single trigger

**Causes**:
- Multiple nodes dispatching the same trigger without coordination
- Missing distributed locks during resume
- Bookmark not burned after first use

**Solutions**:
- Implement distributed locking
- Set `AutoBurn = true` on bookmarks
- Use idempotent activities

### Bookmarks Not Matching

**Symptoms**: Resume requests don't find bookmarks

**Causes**:
- Payload structure mismatch between create and resume
- Hash computed differently on different nodes
- Case sensitivity in payload properties

**Solutions**:
- Use shared payload classes/records
- Ensure consistent serialization settings
- Log and compare payload hashes

## Related Documentation

- [Running Workflows](../running-workflows/README.md) - High-level guide to workflow execution
- [Clustering Guide](../clustering/README.md) - Multi-node deployment
- [Distributed Hosting](../../hosting/distributed-hosting.md) - Distributed architecture patterns
- [Blocking Activities & Triggers](../../activities/blocking-and-triggers/README.md) - Bookmark fundamentals
- [Troubleshooting Guide](../troubleshooting/README.md) - Debugging workflows

## Summary

The `IWorkflowDispatcher` is the core dispatching abstraction in Elsa Workflows:

- **Four dispatch types**: Start definition, resume instance, trigger workflows, resume bookmarks
- **Event-driven**: Enables decoupled, asynchronous workflow execution
- **Customizable**: Implement custom dispatchers for background processing, queuing, and distributed scenarios
- **Orchestrates execution**: Manages the flow from dispatch to enqueue to execution
- **Foundation for triggers**: All triggers use the dispatcher to start/resume workflows

Understanding the dispatcher's role and event ordering helps you:
- Design robust distributed workflow systems
- Troubleshoot execution issues
- Implement custom execution strategies
- Optimize workflow performance

For most applications, the default dispatcher works well. Consider custom implementations when you need:
- Background/queued processing
- Distributed execution across nodes
- Custom routing or load balancing
- Integration with existing message brokers
