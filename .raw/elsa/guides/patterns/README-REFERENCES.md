# Workflow Patterns Guide - Source References

This document lists the exact elsa-core and elsa-extensions file paths referenced in the Workflow Patterns Guide, with one-line descriptions.

## elsa-core References

### Workflow Runtime

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs` | Resumes workflows with distributed locking; core resume logic with lock acquisition via `IDistributedLockProvider` |

### Workflows Core

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs` | Provides `CreateBookmark(CreateBookmarkArgs)` for creating bookmarks with payloads, callbacks, and auto-burn settings |

### HTTP Module

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs` | Provides `GenerateBookmarkTriggerUrl(bookmarkId)` for creating tokenized HTTP resume URLs |

### Scheduling Module

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs` | Enqueues bookmark resume tasks for scheduled execution (timers, delays, cron) |
| `src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs` | Quartz job that triggers workflow resume at scheduled time |

### Management Module

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Workflows.Management/Services/WorkflowInstanceManager.cs` | Manages workflow instance lifecycle including cancellation |

### Incidents

| File Path | Description |
|-----------|-------------|
| `src/modules/Elsa.Workflows.Core/Models/Incident.cs` | Incident model for tracking activity faults and exceptions |

## elsa-extensions References

### OpenTelemetry

| File Path | Description |
|-----------|-------------|
| `src/Elsa.OpenTelemetry/ActivitySource.cs` | Defines the `Elsa` ActivitySource for workflow execution tracing |
| `src/Elsa.OpenTelemetry/Middleware/TracingMiddleware.cs` | HTTP middleware that adds tracing spans for workflow API calls |
| `src/Elsa.OpenTelemetry/Extensions/ServiceCollectionExtensions.cs` | Provides `UseOpenTelemetry()` extension for configuration |

## elsa-api-client References

### Resilience Configuration

| File Path | Description |
|-----------|-------------|
| `src/Elsa.Api.Client/Extensions/ActivityExtensions.cs` | Provides `SetResilienceStrategy()` and `GetResilienceStrategy()` for configuring retry policies on activities |

## Key Interfaces

| Interface | Location | Purpose |
|-----------|----------|---------|
| `IWorkflowResumer` | `Elsa.Workflows.Runtime.Contracts` | Resumes workflows by bookmark or stimulus |
| `IDistributedLockProvider` | `Medallion.Threading` (external) | Acquires distributed locks for concurrent access control |
| `IBookmarkScheduler` | `Elsa.Scheduling.Contracts` | Schedules bookmarks for future execution |

## Bookmark-Related Types

| Type | Location | Purpose |
|------|----------|---------|
| `CreateBookmarkArgs` | `Elsa.Workflows.Core/Models` | Arguments for bookmark creation (name, payload, callback, auto-burn) |
| `BookmarkStimulus` | `Elsa.Workflows.Runtime/Stimuli` | Stimulus used to match and resume bookmarks |
| `BookmarkFilter` | `Elsa.Workflows.Runtime/Filters` | Filter criteria for querying bookmarks |

## Related Documentation Files

| This Repository Path | Description |
|---------------------|-------------|
| `activities/blocking-and-triggers/README.md` | DOC-013: Blocking Activities & Triggers fundamentals |
| `activities/blocking-and-triggers/WaitForApprovalActivity.cs` | Example blocking activity with CreateBookmark |
| `activities/blocking-and-triggers/SignalFanInTrigger.cs` | Example trigger with fan-in aggregation |
| `activities/blocking-and-triggers/ApprovalController.cs` | Example controller with resume patterns |
| `guides/clustering/README.md` | DOC-015: Clustering configuration and distributed runtime |
| `guides/testing-debugging.md` | DOC-017: Testing and troubleshooting guide |
| `operate/incidents/README.md` | Incident handling and strategies |
| `optimize/retention.md` | Workflow retention configuration |

## External Dependencies

| Package | Purpose |
|---------|---------|
| `Medallion.Threading` | Distributed locking abstraction (Redis, PostgreSQL, SQL Server) |
| `Quartz.NET` | Job scheduling for timers and cron expressions |
| `MassTransit` | Message bus for distributed cache invalidation |
| `OpenTelemetry` | Observability and tracing framework |

---

**Note:** File paths are relative to the repository root. For elsa-core, this is `https://github.com/elsa-workflows/elsa-core`. For elsa-extensions, paths may vary based on the extension package structure.
