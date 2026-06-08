---
description: >-
  Comprehensive architecture guide covering Elsa's components, execution model,
  data flow, and deployment patterns for architects and integrators.
---

# Architecture Overview

This guide provides a comprehensive overview of Elsa Workflows' architecture, covering the major components, execution model, data flow, scalability considerations, and deployment topologies.

## High-Level Architecture

Elsa Workflows is built on a modular, extensible architecture designed for flexibility and scalability. The system consists of several key layers that work together to enable workflow definition, execution, and management.

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │  Elsa Studio   │  │  REST APIs     │  │  SignalR Hub  │ │
│  │  (Blazor WASM) │  │                │  │               │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Workflow        │  │  Activity    │  │  Trigger     │  │
│  │  Management      │  │  Registry    │  │  System      │  │
│  └──────────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Workflow Runtime Layer                    │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Workflow        │  │  Bookmark    │  │  Workflow    │  │
│  │  Execution       │  │  Manager     │  │  Dispatcher  │  │
│  │  Engine          │  │              │  │              │  │
│  └──────────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Persistence Layer                       │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Workflow        │  │  Activity    │  │  Execution   │  │
│  │  Definitions     │  │  Execution   │  │  Logs        │  │
│  │  & Instances     │  │  Records     │  │              │  │
│  └──────────────────┘  └──────────────┘  └──────────────┘  │
│                    (EF Core / MongoDB)                       │
└─────────────────────────────────────────────────────────────┘
```

## Major Components

### 1. Elsa Server

The **Elsa Server** is an ASP.NET Core application that hosts the workflow execution engine and exposes REST APIs for workflow management and execution.

**Key Responsibilities:**
- **Workflow Execution**: Runs workflow instances using the workflow runtime
- **API Endpoints**: Exposes REST APIs for managing workflows, activities, and workflow instances
- **Trigger Processing**: Listens for and processes workflow triggers (HTTP, Timer, Events, etc.)
- **Background Services**: Manages scheduled tasks, long-running workflows, and delayed activities
- **Authentication & Authorization**: Controls access to workflow management and execution

**Key Packages:**
- `Elsa.Workflows.Core` - Core workflow engine
- `Elsa.Workflows.Runtime` - Workflow runtime and execution services
- `Elsa.Workflows.Management` - Workflow definition and instance management
- `Elsa.Workflows.Api` - REST API endpoints

**Configuration Example:**
```csharp
builder.Services.AddElsa(elsa =>
{
    // Configure workflow management
    elsa.UseWorkflowManagement(management => 
        management.UseEntityFrameworkCore());
    
    // Configure workflow runtime
    elsa.UseWorkflowRuntime(runtime => 
        runtime.UseEntityFrameworkCore());
    
    // Enable API endpoints
    elsa.UseWorkflowsApi();
    
    // Enable real-time updates
    elsa.UseRealTimeWorkflows();
});
```

### 2. Elsa Studio

**Elsa Studio** is a Blazor application built as a Razor Class Library (RCL) that provides a visual designer for creating and managing workflows through a browser-based interface. It can be hosted using any Blazor hosting model, including Blazor WebAssembly, Blazor Server, or embedded in other Blazor applications.

**Key Features:**
- **Visual Workflow Designer**: Drag-and-drop interface for building workflows
- **Activity Configuration**: Rich UI for configuring activity properties and expressions
- **Workflow Execution Monitoring**: Real-time view of running workflows
- **Instance Management**: Browse and manage workflow instances
- **Execution History**: View detailed execution logs and activity traces

**Architecture:**
- Blazor WebAssembly SPA hosted separately from the server
- Communicates with Elsa Server via REST APIs
- Receives real-time updates via SignalR connections
- Modular plugin architecture for extensibility

**Key Packages:**
- `Elsa.Studio` - Core studio infrastructure
- `Elsa.Studio.Core.BlazorWasm` - Blazor WASM hosting
- `Elsa.Studio.Workflows` - Workflow design module
- `Elsa.Api.Client` - API client for server communication

### 3. Activities

**Activities** are the building blocks of workflows, representing discrete units of work that can be composed together to create complex processes.

**Activity Types:**
1. **Control Flow Activities**: Sequence, Flowchart, If, Switch, For, While, Fork
2. **Data Activities**: SetVariable, WriteLine, ReadLine
3. **HTTP Activities**: HttpEndpoint, WriteHttpResponse, SendHttpRequest
4. **Blocking Activities**: Event, Delay, Timer (create bookmarks)
5. **Trigger Activities**: HttpEndpoint, Timer, Cron (can start workflows)
6. **Custom Activities**: User-defined activities extending base classes

**Activity Lifecycle:**
```
┌──────────────┐
│  Scheduled   │ ← Activity added to scheduler
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Executing   │ ← Activity.ExecuteAsync() called
└──────┬───────┘
       │
       ▼
┌──────────────┐   Creates    ┌──────────────┐
│  Suspending  │──Bookmark──→ │  Suspended   │
└──────┬───────┘              └──────────────┘
       │                              │
       │                              │ Resume with stimulus
       │                              ▼
       │                       ┌──────────────┐
       │                       │  Resuming    │
       │                       └──────┬───────┘
       │                              │
       ▼                              ▼
┌──────────────┐              ┌──────────────┐
│  Completed   │◄─────────────│  Completing  │
└──────────────┘              └──────────────┘
```

**Activity Properties:**
- **Inputs**: Configurable properties that accept values or expressions
- **Outputs**: Data produced by the activity for downstream consumption
- **Outcomes**: Named execution paths (e.g., "Done", "True", "False")
- **Metadata**: Descriptive information (display name, description, category, icon)

### 4. Workflows

Workflows in Elsa exist as both **definitions** (blueprints) and **instances** (executions).

#### Workflow Definitions
A **Workflow Definition** is a blueprint that describes:
- The activities and their configuration
- Connections between activities (execution flow)
- Variables and their types
- Input and output definitions
- Trigger configurations

**Storage:**
- Stored as JSON in the database
- Can be versioned (multiple versions of the same workflow)
- Support for draft and published states

#### Workflow Instances
A **Workflow Instance** represents an execution of a workflow definition:
- Contains the current execution state
- Stores variable values and execution history
- Maintains bookmarks for suspended execution
- Tracks correlation IDs for external system integration

**Instance States:**
- `Running` - Currently executing
- `Suspended` - Paused, waiting for external event or condition
- `Finished` - Completed successfully
- `Faulted` - Terminated due to an error
- `Canceled` - Manually or programmatically canceled

### 5. Persistence Layer

The **Persistence Layer** provides abstractions and implementations for storing workflow data.

**Storage Providers:**
- **Entity Framework Core**: SQL Server, PostgreSQL, SQLite, MySQL
- **MongoDB**: Document-based storage
- **Memory**: In-memory storage for testing

**Persisted Data:**

| Store Type | Data Stored | Purpose |
|-----------|-------------|---------|
| Workflow Definition Store | Workflow blueprints, versions, metadata | Define workflow templates |
| Workflow Instance Store | Running/completed instances, state, variables | Track execution state |
| Trigger Store | Trigger definitions, bookmarks | Enable workflow activation |
| Activity Execution Store | Activity execution records | Audit and debugging |
| Execution Log Store | Detailed execution logs | Troubleshooting and monitoring |

**Configuration Example:**
```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef => 
        ef.UsePostgreSql(connectionString));
});

elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseEntityFrameworkCore(ef => 
        ef.UsePostgreSql(connectionString));
});
```

## Execution Model

Understanding Elsa's execution model is critical for architects and integrators.

### Workflow Execution Flow

```
┌─────────────────┐
│  Trigger Event  │ (HTTP request, timer, external event)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Trigger Matcher │ ← Finds workflows with matching triggers
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Instance │ ← New WorkflowInstance created
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Schedule Root   │ ← Root activity added to scheduler
│    Activity     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Execute Burst   │ ← Continuous execution until blocking
└────────┬────────┘
         │
         ├─────────────┐
         │             │
         ▼             ▼
┌─────────────┐  ┌──────────────┐
│  Complete   │  │  Suspended   │ ← Bookmark created
└─────────────┘  └──────┬───────┘
                        │
                        │ External stimulus
                        ▼
                 ┌──────────────┐
                 │ Resume Burst │
                 └──────┬───────┘
                        │
                        ▼
                 (Continue execution)
```

### Execute vs Dispatch

Elsa provides two primary mechanisms for starting workflows:

#### Execute
**Synchronous, inline execution** within the current context.

**Characteristics:**
- Runs in the caller's context (same thread, transaction)
- Blocks until completion or first suspension point
- Returns workflow state immediately
- Useful for short-lived workflows
- Better for unit testing

**Use Cases:**
- Workflows that complete in a single burst
- Synchronous business logic
- Testing scenarios

**Code Example:**
```csharp
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();
var result = await workflowRunner.RunAsync(workflow);
```

#### Dispatch
**Asynchronous, background execution** via the workflow runtime.

**Characteristics:**
- Queues workflow for background execution
- Returns immediately without waiting for completion
- Executes via mediator/message queue
- Supports distributed processing
- Better for long-running workflows

**Use Cases:**
- Long-running workflows with delays or external events
- High-throughput scenarios
- Distributed systems
- Fire-and-forget execution

**Code Example:**
```csharp
var workflowDispatcher = serviceProvider.GetRequiredService<IWorkflowDispatcher>();
await workflowDispatcher.DispatchAsync(new DispatchWorkflowDefinitionRequest
{
    DefinitionId = "my-workflow"
});
```

**Comparison Table:**

| Aspect | Execute | Dispatch |
|--------|---------|----------|
| **Execution Mode** | Synchronous | Asynchronous |
| **Context** | Caller's thread | Background worker |
| **Response** | Waits for completion | Immediate return |
| **Distribution** | Single process | Can be distributed |
| **Performance** | Lower overhead | Higher throughput |
| **Use Case** | Short workflows | Long-running workflows |

### Bookmarks, Triggers, and Stimuli

These three concepts work together to enable event-driven, long-running workflows.

#### Bookmarks
**Suspension points** that allow workflows to pause and resume later.

**How They Work:**
1. A blocking activity creates a bookmark with a unique payload
2. The workflow instance is suspended and persisted
3. Execution stops at that point
4. Later, an external event provides a matching stimulus
5. The bookmark is matched, and execution resumes

**Example:**
```csharp
public class WaitForApprovalActivity : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Create a bookmark with a payload
        context.CreateBookmark(
            new Bookmark("approval-required", 
                         payload: new { ApprovalId = "12345" }));
        await Task.CompletedTask;
    }
}
```

#### Triggers
**Entry points** that can automatically start new workflow instances.

**Characteristics:**
- Activities marked with `ActivityKind.Trigger`
- Indexed when workflow definitions are published
- Matched against incoming events/stimuli
- Can start multiple instances (one per event)

**Common Triggers:**
- `HttpEndpoint` - HTTP requests at specific paths
- `Timer` - Time-based schedules
- `Cron` - Cron expressions
- `Event` - Custom application events

**How Triggers Work:**
```
1. Workflow published with HttpEndpoint trigger
2. Runtime indexes trigger: POST /api/orders
3. HTTP request arrives: POST /api/orders
4. Runtime matches trigger to workflow definition
5. New workflow instance created and started
6. Request data passed as workflow input
```

#### Stimuli
**External events** that either start workflows (via triggers) or resume them (via bookmarks).

**Types:**
- **Workflow Stimuli**: Start new instances (matched to triggers)
- **Bookmark Stimuli**: Resume suspended instances (matched to bookmarks)

**Flow:**
```
External Event → Stimulus → Trigger Matcher → Start Workflow
                         ↘ Bookmark Matcher → Resume Workflow
```

**Example - Resume via Stimulus (New Client API):**
```csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;

var workflowRuntime = serviceProvider.GetRequiredService<IWorkflowRuntime>();

// Create a workflow client for the specific suspended instance
var client = await workflowRuntime.CreateClientAsync(workflowInstanceId);

// Resume the workflow by running the instance with input that matches the bookmark
await client.RunInstanceAsync(new RunWorkflowInstanceRequest
{
    Input = new Dictionary<string, object>
    {
        ["Approved"] = true
    }
});
```

### Workflow Execution Internals

#### Activity Execution Pipeline
Activities execute through a configurable middleware pipeline:

```
Request → [Middleware 1] → [Middleware 2] → [Activity] → Response
            ↓                  ↓               ↓
         Logging           Validation      Execution
```

**Built-in Middleware:**
- Exception handling
- Logging
- Activity execution tracking
- State persistence
- Fault tolerance

#### Workflow Scheduler
The scheduler manages activity execution order:

**Scheduling Strategies:**
- **Sequential**: Activities execute one at a time
- **Parallel**: Multiple activities execute concurrently (Fork activity)

**Scheduler Operations:**
1. Add activities to the work queue
2. Dequeue next activity
3. Execute via activity pipeline
4. Handle outcomes (schedule next activities)
5. Repeat until queue is empty or suspended

#### State Management
Workflow state is managed through:

**Workflow Execution Context:**
- Contains current execution state
- Manages variables and their values
- Tracks activity execution history
- Maintains scheduler state

**Persistence Strategy:**
- State captured after each burst of execution
- Serialized to JSON
- Stored in database
- Restored on resume

## Data Flow

Understanding how data flows through the system is essential for integration.

### Request Flow (HTTP Trigger Example)

```
1. HTTP Request
   ↓
2. ASP.NET Core Middleware (app.UseWorkflows())
   ↓
3. Trigger Matcher → Finds workflows with matching HttpEndpoint
   ↓
4. Workflow Dispatcher → Queues workflow execution
   ↓
5. Workflow Runtime → Picks up message
   ↓
6. Workflow Execution Engine
   ↓
7. Activity Execution (HttpEndpoint)
   │  - Captures request data
   │  - Sets workflow variables
   ↓
8. Subsequent Activities
   │  - Access request data via variables
   │  - Process business logic
   ↓
9. WriteHttpResponse Activity
   │  - Generates HTTP response
   ↓
10. HTTP Response sent to client
```

### Variable and Output Flow

```
┌──────────────┐
│  Activity A  │ Produces output → Stored in execution context
└──────┬───────┘
       │
       ▼ Output bound to variable
┌──────────────┐
│  Variable    │ Available to downstream activities
└──────┬───────┘
       │
       ▼ Variable accessed
┌──────────────┐
│  Activity B  │ Consumes variable as input
└──────────────┘
```

**Example:**
```csharp
var queryStringsVar = builder.WithVariable<IDictionary<string, object>>();
var messageVar = builder.WithVariable<string>();

builder.Root = new Sequence
{
    Activities =
    {
        // Activity A: Capture HTTP query strings
        new HttpEndpoint
        {
            Path = new("/hello"),
            QueryStringData = new(queryStringsVar)
        },
        // Transform data
        new SetVariable
        {
            Variable = messageVar,
            Value = new(context => 
                queryStringsVar.Get(context)!["message"].ToString())
        },
        // Activity B: Use the variable
        new WriteHttpResponse
        {
            Content = new(messageVar)
        }
    }
};
```

## Scalability and Performance

Elsa is designed for high performance and horizontal scalability.

### Performance Characteristics

**Execution Speed:**
- In-memory activities: ~1-5ms per activity
- Persistence overhead: ~10-50ms per burst
- HTTP activities: Depends on external service latency

**Throughput:**
- Single instance: 100-1000+ workflows/second (depends on workflow complexity)
- Clustered: Linear scaling with additional nodes

**Memory:**
- Base process: ~100-200MB
- Per active workflow: ~1-5KB (suspended workflows minimal overhead)
- Workflow definitions cached in memory

### Horizontal Scaling

Elsa supports running multiple server instances for high availability and scalability.

**Required Configuration for Clustering:**

1. **Distributed Runtime**
```csharp
elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseDistributedRuntime();
});
```

2. **Distributed Locking**
```csharp
runtime.DistributedLockProvider = sp => 
    new PostgresDistributedSynchronizationProvider(connectionString);
```

3. **Distributed Caching**
```csharp
elsa.UseDistributedCache(cache =>
{
    cache.UseMassTransit();
});

elsa.UseMassTransit(mt =>
{
    mt.UseRabbitMq(rabbitMqConnectionString);
});
```

4. **Quartz.NET Clustering** (if using Quartz scheduler)
```csharp
elsa.UseQuartz(quartz =>
{
    quartz.UsePostgreSql(connectionString);
});
```

**Scaling Strategies:**

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Vertical Scaling** | Increase CPU/memory, worker count | Initial scaling, cost-effective |
| **Horizontal Scaling** | Add more server instances | High throughput, high availability |
| **Read Replicas** | Separate read/write databases | Read-heavy workloads |
| **Partitioning** | Route workflows to specific nodes | Tenant isolation, resource management |

### Optimization Tips

1. **Reduce Persistence Overhead**
   - Disable logging for high-frequency activities
   - Use in-memory storage for transient workflows
   - Batch database operations

2. **Optimize Activity Design**
   - Keep activities lightweight
   - Avoid blocking I/O in synchronous activities
   - Use async patterns for I/O operations

3. **Worker Configuration**
```csharp
builder.Services.Configure<MediatorOptions>(opt =>
{
    opt.CommandWorkerCount = 16;
    opt.JobWorkerCount = 16;
    opt.NotificationWorkerCount = 16;
});
```

4. **Database Optimization**
   - Add appropriate indexes
   - Regular maintenance (vacuum, statistics)
   - Connection pooling

5. **Cache Workflow Definitions**
   - Enabled by default
   - Reduces database queries
   - Invalidated on changes via distributed cache

## Extensibility Points

Elsa provides numerous extension points for customization.

### 1. Custom Activities

Create domain-specific activities by implementing `IActivity` or inheriting from base classes:

```csharp
[Activity("MyCategory", "My Activity", "Does something custom")]
public class MyCustomActivity : CodeActivity
{
    [Input(Description = "The input value")]
    public Input<string> InputValue { get; set; } = default!;

    [Output(Description = "The output value")]
    public Output<string> OutputValue { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(
        ActivityExecutionContext context)
    {
        var input = context.Get(InputValue);
        var result = await Task.FromResult(input.ToUpper());
        context.Set(OutputValue, result);
    }
}
```

### 2. Custom Triggers

Implement custom trigger activities for event-driven workflows:

```csharp
[Activity("MyCategory", "My Trigger", Kind = ActivityKind.Trigger)]
public class MyTriggerActivity : Activity<object>
{
    protected override async ValueTask ExecuteAsync(
        ActivityExecutionContext context)
    {
        if (!context.IsTriggerOfWorkflow())
        {
            // Create bookmark for existing instances
            context.CreateBookmark();
            return;
        }
        
        // Trigger mode: complete immediately
        await context.CompleteActivityAsync();
    }

    protected override object GetTriggerPayload(
        TriggerIndexingContext context)
    {
        return new { EventType = "MyEvent" };
    }
}
```

### 3. Custom Middleware

Add custom behavior to workflow or activity execution:

```csharp
public class MyActivityMiddleware : IActivityExecutionMiddleware
{
    public async ValueTask ExecuteAsync(
        ActivityExecutionContext context, 
        ActivityExecutionDelegate next)
    {
        // Before execution
        Console.WriteLine($"Executing {context.Activity.Type}");
        
        await next(context);
        
        // After execution
        Console.WriteLine($"Completed {context.Activity.Type}");
    }
}

// Register middleware
elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseDefaultActivityExecutionPipeline(pipeline =>
    {
        pipeline.UseMiddleware<MyActivityMiddleware>();
    });
});
```

### 4. Custom Persistence Providers

Implement custom storage backends:

```csharp
public class MyWorkflowInstanceStore : IWorkflowInstanceStore
{
    public Task SaveAsync(WorkflowInstance instance, 
        CancellationToken cancellationToken) { ... }
    
    public Task<WorkflowInstance?> FindAsync(
        WorkflowInstanceFilter filter, 
        CancellationToken cancellationToken) { ... }
    
    // ... other interface methods
}
```

### 5. Custom Expression Evaluators

Add support for custom expression languages:

```csharp
public class MyExpressionHandler : IExpressionHandler
{
    public string Language => "mylang";

    public Task<object?> EvaluateAsync(
        Expression expression,
        Type returnType,
        ExpressionExecutionContext context,
        CancellationToken cancellationToken) { ... }
}
```

### 6. Studio Extensibility

**Custom UI Hints:**
Define how activity properties appear in the designer:

```csharp
[Input(UIHint = InputUIHints.Dropdown)]
public Input<string> Status { get; set; } = default!;
```

**Custom Activity Providers:**
Dynamically generate activities from external sources:

```csharp
public class ApiActivityProvider : IActivityProvider
{
    public async ValueTask<IEnumerable<ActivityDescriptor>> 
        GetDescriptorsAsync(CancellationToken cancellationToken)
    {
        // Fetch activity definitions from API
        var activities = await _apiClient.GetActivitiesAsync();
        
        // Convert to ActivityDescriptor
        return activities.Select(a => new ActivityDescriptor
        {
            TypeName = a.Type,
            DisplayName = a.Name,
            // ... other properties
        });
    }
}
```

## Deployment Topologies

Elsa supports various deployment configurations to meet different requirements.

### 1. All-in-One (Development)

Single server hosting both Elsa Server and Studio.

```
┌─────────────────────────┐
│   Single Server         │
│  ┌──────────────────┐   │
│  │  Elsa Server     │   │
│  │  + Studio WASM   │   │
│  └──────────────────┘   │
│  ┌──────────────────┐   │
│  │  Database        │   │
│  └──────────────────┘   │
└─────────────────────────┘
```

**Pros:** Simple setup, minimal infrastructure
**Cons:** Not scalable, single point of failure
**Use Case:** Development, POC, small deployments

### 2. Separate Server and Studio (Recommended)

Elsa Server and Studio deployed as separate applications.

```
┌─────────────────┐       ┌─────────────────┐
│  Elsa Studio    │──────▶│  Elsa Server    │
│  (Blazor WASM)  │  API  │  (ASP.NET Core) │
└─────────────────┘       └────────┬────────┘
                                   │
                          ┌────────▼────────┐
                          │    Database     │
                          └─────────────────┘
```

**Pros:** Independent scaling, separate concerns
**Cons:** More complex deployment
**Use Case:** Production deployments

### 3. Multi-Instance Cluster (High Availability)

Multiple Elsa Server instances behind a load balancer.

```
┌─────────────────┐       ┌─────────────────┐
│  Elsa Studio    │       │  Load Balancer  │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │        ┌────────────────┼────────────────┐
         │        │                │                │
         │   ┌────▼─────┐    ┌────▼─────┐    ┌────▼─────┐
         └──▶│ Server 1 │    │ Server 2 │    │ Server N │
             └────┬─────┘    └────┬─────┘    └────┬─────┘
                  │               │               │
                  └───────┬───────┴───────┬───────┘
                          │               │
                   ┌──────▼──────┐ ┌─────▼──────┐
                   │  Database   │ │ Redis/     │
                   │  (Primary)  │ │ RabbitMQ   │
                   └─────────────┘ └────────────┘
```

**Requirements:**
- Shared database
- Distributed locking (PostgreSQL, Redis)
- Distributed caching (MassTransit + RabbitMQ/Azure Service Bus)
- Quartz.NET clustering (if using Quartz)

**Pros:** High availability, horizontal scaling
**Cons:** Complex configuration, infrastructure overhead
**Use Case:** Production, high-traffic environments

### 4. Kubernetes Deployment

Containerized deployment with orchestration.

```
┌────────────────────────────────────────────────────┐
│                  Kubernetes Cluster                │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │              Ingress Controller              │ │
│  └────────┬─────────────────────┬────────────────┘ │
│           │                     │                  │
│  ┌────────▼────────┐   ┌───────▼──────────┐      │
│  │  Studio Pod(s)  │   │  Server Pod(s)   │      │
│  │  (Deployment)   │   │  (Deployment)    │      │
│  └─────────────────┘   └───────┬──────────┘      │
│                                 │                  │
│  ┌──────────────────────────────▼────────────┐   │
│  │         External Services               │   │
│  │  - PostgreSQL (StatefulSet/External)    │   │
│  │  - RabbitMQ (StatefulSet/External)      │   │
│  │  - Redis (StatefulSet/External)         │   │
│  └─────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

**Key Considerations:**
- Use persistent volumes for workflow state
- Configure health checks and readiness probes
- Set up horizontal pod autoscaling
- Use ConfigMaps and Secrets for configuration
- Enable distributed runtime features

**Example Deployment YAML:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: elsa-server
  template:
    metadata:
      labels:
        app: elsa-server
    spec:
      containers:
      - name: elsa-server
        image: myregistry/elsa-server:latest
        ports:
        - containerPort: 80
        env:
        - name: ConnectionStrings__Default
          valueFrom:
            secretKeyRef:
              name: elsa-secrets
              key: database-connection
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
```

### 5. Microservices Architecture

Separate workflow domain into multiple services.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Order      │    │  Inventory  │    │  Shipping   │
│  Workflows  │    │  Workflows  │    │  Workflows  │
│  Service    │    │  Service    │    │  Service    │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       └──────────┬───────┴───────┬──────────┘
                  │               │
          ┌───────▼──────┐ ┌─────▼──────┐
          │  Message Bus │ │  Database  │
          │  (RabbitMQ)  │ │  (Per Svc) │
          └──────────────┘ └────────────┘
```

**Use Case:** Domain-driven design, team autonomy
**Pros:** Independent deployment, domain isolation
**Cons:** Complexity, distributed transactions

## Multi-Tenancy Architecture

Elsa supports multi-tenancy for SaaS applications.

### Tenant Isolation Strategies

**1. Shared Database, Shared Schema**
- All tenants share the same database and tables
- Tenant ID column on all tables
- Row-level security via application logic

**2. Shared Database, Separate Schemas**
- Each tenant gets their own schema
- Better isolation than shared schema
- More complex migration management

**3. Separate Databases**
- Complete database isolation per tenant
- Best security and isolation
- Higher resource overhead

### Multi-Tenant Configuration

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseMultitenancy(multitenancy =>
    {
        multitenancy.UseEntityFrameworkCoreStore();
    });
    
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UseMultitenancy();
        });
    });
});
```

### Tenant Resolution

Tenants are resolved via:
- HTTP headers
- Subdomain
- URL path
- Claims in JWT token
- Custom resolution strategy

```csharp
public class CustomTenantResolver : ITenantResolver
{
    public Task<TenantResolverResult> ResolveAsync(
        TenantResolverContext context)
    {
        var httpContext = context.HttpContext;
        var tenantId = httpContext.Request.Headers["X-Tenant-Id"];
        
        return Task.FromResult(new TenantResolverResult
        {
            TenantId = tenantId
        });
    }
}
```

## Security Considerations

### Authentication & Authorization

**Server Authentication:**
- API Key authentication for machine-to-machine
- JWT bearer tokens for user authentication
- OIDC integration (Azure AD, Auth0, IdentityServer)

**Studio Authentication:**
- Login module with username/password
- OIDC integration
- Custom authentication providers

**Configuration:**
```csharp
elsa.UseIdentity(identity =>
{
    identity.TokenOptions = options => 
        options.SigningKey = builder.Configuration["Jwt:SigningKey"]; // Use secure key storage in production
    identity.UseAdminUserProvider();
});

elsa.UseDefaultAuthentication(auth => 
    auth.UseAdminApiKey());
```

### Workflow Security

**HTTP Endpoint Authorization:**
```csharp
new HttpEndpoint
{
    Path = new("/secure-endpoint"),
    AuthorizeWithPolicy = new("AdminOnly"),
    CanStartWorkflow = true
}
```

**Variable and Input Validation:**
- Validate all external inputs
- Sanitize data before persistence
- Use typed variables to prevent injection

## Monitoring and Observability

### Health Checks

```csharp
builder.Services.AddHealthChecks()
    .AddDbContextCheck<WorkflowDbContext>()
    .AddRabbitMQ(rabbitMqConnectionString);

app.MapHealthChecks("/health");
```

### Logging

Elsa uses structured logging via `ILogger`:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.LogPersistenceMode = LogPersistenceMode.Inherit;
    });
});
```

**Log Levels:**
- Activity execution logs
- Workflow lifecycle events
- Exception details
- Performance metrics

### Execution Logs

Activity execution is logged to the database for auditing:

```csharp
var executionLogs = await workflowExecutionLogStore.FindAsync(
    new WorkflowExecutionLogRecordFilter
    {
        WorkflowInstanceId = instanceId
    });
```

### Metrics and Telemetry

**Key Metrics:**
- Workflows started/completed per second
- Average workflow execution time
- Active workflow instances
- Suspended workflow count
- Activity failure rate

**Integration:**
- Application Insights
- Prometheus
- OpenTelemetry

## Best Practices

### Design Patterns

1. **Idempotency**: Design workflows to handle duplicate executions
2. **Compensation**: Implement compensating actions for rollback scenarios
3. **Saga Pattern**: Use for distributed transactions across services
4. **State Machine**: Use StateMachine activities for complex state transitions

### Performance

1. **Minimize Persistence**: Disable logging for high-frequency activities
2. **Batch Operations**: Group related activities to reduce overhead
3. **Async Activities**: Use async patterns for I/O operations
4. **Connection Pooling**: Configure database connection pools appropriately

### Reliability

1. **Error Handling**: Use Fault activity and exception handling
2. **Retry Logic**: Implement retry policies for transient failures
3. **Timeouts**: Set appropriate timeouts for external calls
4. **Health Checks**: Monitor system health continuously

### Maintenance

1. **Versioning**: Version workflow definitions for safe updates
2. **Migration**: Plan for workflow instance migration when updating definitions
3. **Archival**: Archive completed workflows periodically
4. **Monitoring**: Set up alerts for failures and performance degradation

## Reference Sources

This architecture guide is based on the following official Elsa sources:

**Elsa Core Repository:**
- [https://github.com/elsa-workflows/elsa-core](https://github.com/elsa-workflows/elsa-core)
- Core workflow engine implementation
- Activity library and runtime services
- Persistence layer abstractions

**Elsa Studio Repository:**
- [https://github.com/elsa-workflows/elsa-studio](https://github.com/elsa-workflows/elsa-studio)
- Blazor WebAssembly designer application
- Studio modules and extensibility

**Official Documentation:**
- [Getting Started Guides](../getting-started/)
- [Application Types](../application-types/)
- [Distributed Hosting](../hosting/distributed-hosting.md)
- [Custom Activities](../extensibility/custom-activities.md)

## Next Steps

- **For Architects**: Review [Distributed Hosting](../hosting/distributed-hosting.md) for production deployment
- **For Backend Integrators**: Learn to create [Custom Activities](../extensibility/custom-activities.md)
- **For Platform/DevOps**: Explore [Container Deployment](containers/) options
- **For Workflow Designers**: Start with [Hello World](hello-world.md) tutorial

## Summary

Elsa Workflows provides a flexible, scalable architecture for building workflow-driven applications. Key takeaways:

- **Modular Design**: Separate concerns across layers (presentation, application, runtime, persistence)
- **Extensible**: Custom activities, triggers, middleware, and persistence providers
- **Scalable**: Horizontal scaling with distributed runtime and locking
- **Event-Driven**: Triggers, bookmarks, and stimuli enable long-running workflows
- **Flexible Deployment**: From single-server to Kubernetes clusters
- **Production-Ready**: Multi-tenancy, security, monitoring, and high availability

By understanding these architectural principles, you can design and deploy robust workflow solutions with Elsa.
