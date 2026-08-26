---
description: >-
  High-level overview of Elsa Workflows v3 architecture, covering workflow
  execution flow, core concepts like bookmarks and triggers, workflow runtimes,
  and multitenancy.
---

# Architecture

This guide provides a high-level understanding of Elsa's architecture and what happens when a workflow executes. Whether you're extending Elsa, troubleshooting issues, or simply curious about how everything fits together, this overview will help you understand the system's core concepts and structure.

## What Happens When a Workflow Executes?

At a high level, when a workflow executes in Elsa:

1. **Execute or Dispatch**: A workflow is executed via `IWorkflowRunner` or dispatched for execution via `IWorkflowDispatcher`, which enqueues the request.
2. **Load**: The workflow definition is loaded from storage (or cache)
3. **Instantiate**: A workflow instance is created or resumed (if continuing from a bookmark)
4. **Execute**: Activities run sequentially or in parallel based on the workflow structure
5. **Bookmark (Optional)**: If an activity creates a bookmark, and no more activities remain on the internal queue, execution pauses and state is persisted
6. **Complete or Suspend**: The workflow either completes or suspends, waiting for external stimuli to resume

This lifecycle repeats as workflows are triggered, execute activities, wait for events, and continue execution.

## Core Concepts

### Execute vs Dispatch

Understanding the difference between **executing** and **dispatching** workflows is fundamental:

#### Execute (IWorkflowRunner)

* **Direct, synchronous execution** of a workflow in the current process
* No queuing or background processing
* Useful for testing, simple workflows, or when immediate results are needed
* Does not involve `IWorkflowDispatcher`

```csharp
// Direct execution
var result = await workflowRunner.RunAsync(
    new RunWorkflowRequest 
    { 
        DefinitionId = workflowId 
    });
```

#### Dispatch (IWorkflowDispatcher)

* **Asynchronous, queue-based** workflow execution
* Requests are enqueued and processed by background workers
* Supports distributed execution across multiple nodes
* Default approach for production workflows

```csharp
// Dispatching for background execution
await workflowDispatcher.DispatchAsync(
    new DispatchWorkflowDefinitionRequest 
    { 
        DefinitionId = workflowId 
    });
```

For a deep dive into dispatching, see the [Workflow Dispatcher Architecture](workflow-dispatcher.md) guide.

#### IWorkflowRuntime

* **High-level abstraction** that combines runtime management with persistence
* Provides client API for workflow operations (start, resume, cancel, etc.)
* Used by most applications for workflow lifecycle management

### Bookmarks, Triggers, and Stimuli

These three concepts work together to enable event-driven, long-running workflows:

#### Bookmarks

A **bookmark** is a "pause point" in a workflow. When an activity creates a bookmark:

* The workflow's current state is persisted
* Execution suspends at that activity
* The bookmark waits for a matching stimulus to resume execution

Think of bookmarks as save points in a video game - the workflow can be resumed from exactly where it left off.

**Common activities that create bookmarks:**

* `Event` - Waits for a named event
* `Delay` - Waits for a timer
* `HTTP Endpoint` - Waits for an HTTP request
* `Send HTTP Request` (when configured to wait for response)

#### Triggers

A **trigger** is a special type of activity that starts a workflow automatically when certain conditions are met. Triggers:

* Create bookmarks when the workflow is published
* Listen for external events (HTTP requests, timers, messages, etc.)
* Automatically start new workflow instances when triggered
* Are typically the first activity in a workflow

**Example triggers:**

* `HTTP Endpoint` - Starts workflow when an HTTP request arrives
* `Timer` - Starts workflow on a schedule (cron, interval, etc.)
* `Message Received` - Starts workflow when a message arrives

#### Stimuli

A **stimulus** is an external event that resumes a suspended workflow. Stimuli:

* Are dispatched into the system via `IWorkflowDispatcher`
* Match against existing bookmarks
* Resume workflows from their bookmarked position

The relationship:

1. Activity creates a **bookmark** (workflow pauses)
2. External event occurs and generates a **stimulus**
3. Stimulus matches bookmark and resumes execution

```
Workflow -> [Activity] -> Bookmark Created -> Persisted
                                    ↓
External Event -> Stimulus Dispatched -> Bookmark Matched -> Workflow Resumes
```

### Workflow Runtimes

The **workflow runtime** is the execution environment that manages workflow lifecycle and state. Key responsibilities:

#### State Management

* Tracks workflow instances and their current state
* Persists bookmarks and activity data
* Manages workflow variables and outputs

#### Execution Coordination

* Schedules activities for execution
* Handles activity outcomes and connections
* Manages parallel execution paths

#### Event Processing

* Receives and routes stimuli to bookmarks
* Handles workflow triggers
* Coordinates distributed execution

#### Integration Points

The runtime integrates with several subsystems:

* **Persistence**: Storage for workflow definitions and instances
* **Dispatcher**: Queuing and background execution
* **Activity Registry**: Discovery of available activities
* **Expression Evaluators**: Dynamic value resolution

### Multitenancy (Conceptual Overview)

Elsa supports **multitenancy** - running multiple isolated tenants in a single deployment:

#### Tenant Isolation

* Each tenant has isolated workflow definitions, instances, and data
* Tenants cannot access each other's workflows or data
* Tenant context is established early in the request pipeline

#### Tenant Resolution

* Tenants are identified via tenant ID (from headers, routes, claims, etc.)
* Tenant resolver strategies can be customized
* Default tenant is available for single-tenant scenarios

#### Use Cases

* **SaaS Applications**: Each customer is a tenant with isolated workflows
* **Multi-Organization**: Departments or divisions with separate workflows
* **Development/Staging/Production**: Logical separation within a deployment

For detailed multitenancy setup, see the [Multitenancy Introduction](../../multitenancy/introduction.md) guide.

## System Architecture (Mindmap)

Here's a textual representation of Elsa's core functionality and surrounding modules:

```
Elsa Workflows v3
│
├── Core Engine
│   ├── IWorkflowRunner (Direct execution)
│   ├── IWorkflowRuntime (Runtime management + persistence)
│   ├── IWorkflowDispatcher (Queue-based execution)
│   ├── Activity Registry (Available activities)
│   ├── Workflow Definition Store (Workflow definitions)
│   └── Workflow Instance Store (Running/suspended workflows)
│
├── Execution Model
│   ├── Bookmarks (Pause points)
│   ├── Triggers (Auto-start workflows)
│   ├── Stimuli (Resume signals)
│   └── Activity Execution Context
│
├── Extensibility
│   ├── Modules & Features (Plugin architecture)
│   ├── Custom Activities (Domain-specific operations)
│   ├── Expression Evaluators (C#, JavaScript, Liquid, Python)
│   └── Middleware Pipeline (Request/response interception)
│
├── Persistence Layer
│   ├── Entity Framework Core (SQL Server, PostgreSQL, SQLite, MySQL)
│   ├── MongoDB (Document store)
│   ├── Dapper (Lightweight SQL)
│   └── In-Memory (Testing/development)
│
├── Integration Packages
│   ├── HTTP (REST APIs, webhooks)
│   ├── Email (SMTP, SendGrid, etc.)
│   ├── MassTransit (Message bus integration)
│   ├── Timers (Scheduled execution)
│   └── JavaScript/C# (Scripting)
│
├── Elsa Server (Backend API)
│   ├── REST API (Workflow management, execution control)
│   ├── WebSocket (Real-time updates)
│   ├── Authentication & Authorization
│   └── Multitenancy Support
│
├── Elsa Studio (Frontend UI)
│   ├── Workflow Designer (Visual editor)
│   ├── Activity Property Editors
│   ├── Instance Monitoring
│   └── Configuration UI
│
└── Deployment & Scaling
    ├── Distributed Hosting (Multiple nodes)
    ├── Clustering (Shared state)
    ├── Background Workers (Queue processing)
    └── Load Balancing (Request distribution)
```

## Key Packages and Their Roles

| Package                         | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| **Elsa.Workflows.Core**         | Core workflow engine, activities, and abstractions          |
| **Elsa.Workflows.Runtime**      | Runtime services for execution, persistence, and management |
| **Elsa**                        | Meta-package that includes commonly needed packages         |
| **Elsa.Persistence.EFCore**     | EF Core persistence providers                               |
| **Elsa.Http**                   | HTTP activities and triggers                                |
| **Elsa.MassTransit**            | Message bus integration                                     |
| **Elsa.Expressions.JavaScript** | JavaScript expression evaluator                             |
| **Elsa.Expressions.CSharp**     | C# expression evaluator                                     |
| **Elsa.Expressions.Liquid**     | Liquid template expression evaluator                        |
| **Elsa.Alterations**            | Workflow alteration and migration support                   |

## Typical Workflow Execution Flow

Here's a detailed look at what happens during a typical workflow execution:

### 1. Trigger Event

```
HTTP Request -> Elsa Server -> Trigger Matched -> Dispatch Workflow
```

### 2. Workflow Dispatch

```
IWorkflowDispatcher.DispatchAsync()
    ↓
Enqueue Request -> Background Worker Picks Up
    ↓
Load Workflow Definition -> Create/Resume Instance
```

### 3. Activity Execution

```
For each activity in sequence:
    ↓
Load Activity Definition
    ↓
Evaluate Input Expressions (variables, outputs, etc.)
    ↓
Execute Activity Logic
    ↓
Process Outcomes (determine next activities)
    ↓
[If bookmark created] -> Persist State & Suspend
[Otherwise] -> Continue to next activity
```

### 4. Completion or Suspension

```
[All activities complete]
    ↓
Workflow Status = Completed
    ↓
Persist Final State -> Trigger Completion Events

[Bookmark created]
    ↓
Workflow Status = Suspended
    ↓
Persist Bookmark & State -> Wait for Stimulus
```

### 5. Resume from Bookmark (if suspended)

```
External Event -> Stimulus Dispatched
    ↓
Match Bookmark -> Load Workflow Instance
    ↓
Resume from Bookmarked Activity
    ↓
Continue Execution (goto step 3)
```

## Understanding the Module System

Elsa's architecture is built around a **module and feature system** that enables clean extensibility:

### Modules

A **module** is a container for related features. The `IModule` interface represents a configuration point where features can be registered and configured.

### Features

A **feature** is a self-contained unit of functionality that:

* Registers services with dependency injection
* Adds activities to the activity registry
* Configures workflow options
* Can depend on other features

### Registration Pattern

Features are registered using a fluent API:

```csharp
builder.Services.AddElsa(elsa => elsa
    .UseWorkflowRuntime()
    .UseHttp()
    .UseEmail()
    .UseJavaScript()
);
```

Each `UseXyz()` method adds a feature to the module, which then configures the necessary services.

For detailed information on creating custom modules and plugins, see the [Modules and Plugins](../extensibility/modules-and-plugins.md) guide.

## Further Reading

To dive deeper into specific aspects of Elsa's architecture:

* [**Workflow Dispatcher Architecture**](workflow-dispatcher.md) - Deep dive into `IWorkflowDispatcher` and dispatching patterns
* [**Modules and Plugins**](../extensibility/modules-and-plugins.md) - Learn how to extend Elsa with custom modules and activities
* [**Custom Activities**](../../extensibility/custom-activities.md) - Create domain-specific activities
* [**Multitenancy Setup**](../../multitenancy/setup.md) - Configure multitenancy in your application
* [**Clustering**](../clustering/) - Scale Elsa across multiple nodes
* [**Persistence Strategies**](../persistence/) - Choose and configure a persistence provider

## Summary

Elsa's architecture is designed for flexibility and scalability:

* **Multiple execution models** (direct, runtime, dispatched) for different scenarios
* **Event-driven patterns** (bookmarks, triggers, stimuli) for long-running workflows
* **Modular design** enabling clean extensibility
* **Multi-persistence support** for different storage needs
* **Multitenancy** for SaaS and multi-organization deployments

Understanding these core concepts will help you effectively build, extend, and troubleshoot Elsa-based workflow solutions.
