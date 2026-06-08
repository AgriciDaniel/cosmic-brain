---
type: concept
title: "Elsa Architecture"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-engine
  - dotnet
  - architecture
status: developing
address: c-000058
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Application Types]]"
  - "[[Elsa Database Configuration]]"
---

# Elsa Architecture

High-level architecture of [[entities/Elsa Workflows]] — a modular, extensible .NET workflow engine designed for flexibility and horizontal scalability.

---

## Layered Architecture

```
Presentation   →  Elsa Studio (Blazor WASM), REST APIs, SignalR Hub
Application    →  Workflow Management, Activity Registry, Trigger System
Runtime        →  Workflow Execution Engine, Bookmark Manager, Dispatcher
Persistence    →  EF Core (SQL Server / PostgreSQL / SQLite / MySQL) or MongoDB
```

### 1. Presentation Layer
- **Elsa Studio** — Blazor WebAssembly SPA providing a visual drag-and-drop workflow designer
- **REST APIs** — exposed by Elsa Server for workflow management and execution
- **SignalR Hub** — real-time updates from server to Studio

### 2. Application Layer
- **Workflow Management** — CRUD for workflow definitions and instance management
- **Activity Registry** — catalog of available activities with metadata
- **Trigger System** — indexes trigger activities and matches incoming stimuli

### 3. Runtime Layer
- **Workflow Execution Engine** — executes activities through a configurable middleware pipeline
- **Bookmark Manager** — manages suspension and resumption points
- **Workflow Dispatcher** — queues and distributes workflow execution (supports background/dispatch mode)

### 4. Persistence Layer
- Stores workflow definitions, instances, execution records, triggers, and logs
- Supports EF Core providers (SQL Server, PostgreSQL, SQLite, MySQL) and MongoDB
- Configurable per management (definitions) and runtime (executions) — can use separate databases

---

## Execution Model

### Workflow Execution Flow
```
Trigger Event → Trigger Matcher → Create Instance → Schedule Root Activity
→ Execute Burst → (Complete or Suspended with Bookmark)
→ External Stimulus → Resume Burst → Continue until complete
```

### Execute vs Dispatch

| Aspect | Execute | Dispatch |
|--------|---------|----------|
| Mode | Synchronous, inline | Asynchronous, via message queue |
| Returns | After completion or first suspension | Immediately |
| Distribution | Single process | Can be distributed |
| Use Case | Short workflows, unit tests | Long-running, high-throughput |

### Bookmarks, Triggers, Stimuli

- **Bookmarks** — suspension points created by blocking activities. The workflow pauses, persists state, and waits for a matching stimulus.
- **Triggers** — activities (kind = Trigger) that can start new workflow instances when matched to incoming events.
- **Stimuli** — external events that either start workflows (trigger matching) or resume them (bookmark matching).

### Activity Execution Pipeline
Activities execute through a configurable middleware pipeline:
```
Request → [Exception Handling] → [Logging] → [Validation] → [Activity] → Response
```

Built-in middleware covers exception handling, logging, execution tracking, state persistence, and fault tolerance.

### State Management
Workflow state is captured after each burst of execution, serialized to JSON, and persisted to the database. On resume, state is restored from the database.

---

## Scalability

### Horizontal Scaling Requirements
1. **Distributed Runtime** — enable multi-node execution coordination
2. **Distributed Locking** — PostgreSQL or Redis-backed to prevent race conditions
3. **Distributed Caching** — via MassTransit + RabbitMQ or Azure Service Bus
4. **Quartz.NET Clustering** — for scheduled timer/cron activities

### Performance Characteristics
- In-memory activities: ~1-5ms per activity
- Persistence overhead: ~10-50ms per burst
- Single instance: 100-1000+ workflows/second
- Clustered: linear scaling with additional nodes

---

## Extensibility Points

| Extension Point | Description |
|----------------|-------------|
| **Custom Activities** | Implement `IActivity` or extend `CodeActivity` |
| **Custom Triggers** | Activity with `Kind = ActivityKind.Trigger` |
| **Custom Middleware** | Add behavior to activity execution pipeline |
| **Custom Persistence** | Implement `IWorkflowInstanceStore` etc. |
| **Custom Expression Evaluators** | Add expression language support |
| **Studio Extensibility** | Custom UI hints, activity providers, modules |

---

## Deployment Topologies

1. **All-in-One (Dev)** — single server hosting both Elsa Server and Studio. Simple but not scalable.
2. **Separate Server + Studio (Recommended)** — Elsa Server and Studio as separate applications. Independent scaling.
3. **Multi-Instance Cluster (HA)** — multiple Elsa Server instances behind a load balancer with shared database, distributed caching, and distributed locking.
4. **Kubernetes** — containerized orchestration with HPA, health checks, ConfigMaps/Secrets.
5. **Microservices** — separate workflow services per domain, communicating via message bus.

---

## Multi-Tenancy

Elsa supports three tenant isolation strategies:
1. **Shared Database, Shared Schema** — Tenant ID column, row-level filtering
2. **Shared Database, Separate Schemas** — each tenant gets their own schema
3. **Separate Databases** — complete isolation, highest overhead

Tenant resolution via HTTP headers, subdomain, URL path, or JWT claims.

---

## Security

- **Authentication** — API Key, JWT bearer, OIDC (Azure AD, Auth0, IdentityServer)
- **Authorization** — policy-based HTTP endpoint authorization
- **Input Validation** — typed variables, sanitized external inputs

## Monitoring

- **Health Checks** — `/health` and `/health/ready` endpoints with DB and message-bus checks
- **Structured Logging** — via `ILogger` with configurable persistence modes
- **Execution Logs** — activity execution stored in database for auditing
- **Metrics** — Application Insights, Prometheus, OpenTelemetry integration
