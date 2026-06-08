# Source File References (DOC-017)

This file lists the exact source file paths referenced in the Troubleshooting Guide for maintainers to verify grounding. All paths are relative to the respective repository roots.

---

## elsa-core Repository

| File Path | Purpose | Referenced In |
|-----------|---------|---------------|
| `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs` | Implements distributed locking for workflow resume operations. Uses `IDistributedLockProvider` to serialize resume requests and prevent concurrent modifications to the same workflow instance. | Workflows Don't Resume, Duplicate Resumes |
| `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs` | Categorizes bookmarks by type (Timer, Delay, Cron) and schedules them via Quartz. Creates `ResumeWorkflowTask` jobs for future execution. | Timers Fire Multiple Times |
| `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs` | Contains `CreateBookmark()` method which generates bookmarks with deterministic hashes. Bookmarks auto-suspend the workflow when created. | Workflows Don't Resume |
| `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs` | Provides `GenerateBookmarkTriggerUrl()` for creating tokenized resume URLs (e.g., `/bookmarks/resume?t=...`). Used for HTTP callback patterns. | HTTP Resume Tokens |
| `src/modules/Elsa.Workflows.Core/Middleware/Activities/DefaultActivityInvokerMiddleware.cs` | Entry point for activity execution pipeline. Orchestrates activity lifecycle including fault handling and bookmark burning (`AutoBurn` behavior). | Workflows Don't Start, Duplicate Resumes, Stuck Workflows |
| `src/modules/Elsa.Workflows.Runtime/Middleware/Activities/BackgroundActivityInvokerMiddleware.cs` | Handles background/job execution for long-running activities. Activities marked for background execution are dispatched to a job queue rather than executed inline. | Timers Fire Multiple Times, Background Jobs |

---

## elsa-extensions Repository

| File Path | Purpose | Referenced In |
|-----------|---------|---------------|
| `src/modules/diagnostics/Elsa.OpenTelemetry/*` | OpenTelemetry integration package. Contains tracing middleware and `ActivitySource` definitions for distributed tracing. Adds spans for workflow and activity execution. | Tracing with Elsa.OpenTelemetry |

---

## Key Implementation Details

### WorkflowResumer Locking Pattern

The `WorkflowResumer` service (in `Elsa.Workflows.Runtime`) acquires a distributed lock before resuming a workflow:

```csharp
// Conceptual flow (simplified)
var lockKey = $"workflow:{workflowInstanceId}";
await using var lockHandle = await _distributedLockProvider.AcquireLockAsync(lockKey, timeout);

if (lockHandle == null)
{
    // Another node is already processing this resume
    return ResumeWorkflowResult.AlreadyInProgress();
}

// Safe to resume - we hold the lock
```

This ensures only one node can modify a workflow instance at a time, preventing state corruption.

### Bookmark Hashing

The `CreateBookmark()` method in `ActivityExecutionContext` generates a deterministic hash based on:
- Activity type
- Stimulus data (payload)
- Correlation ID (if specified)

This hash is used to match incoming resume requests to stored bookmarks. The hash must match exactly for a resume to succeed.

### DefaultBookmarkScheduler Flow

1. When a Timer/Delay/Cron activity creates a bookmark, `DefaultBookmarkScheduler` is notified
2. The scheduler categorizes the bookmark by type
3. A Quartz job (`ResumeWorkflowTask`) is created with the appropriate trigger time
4. At trigger time, Quartz fires the job on one cluster node
5. `ResumeWorkflowTask` calls `IWorkflowRuntime` to resume the workflow

### AutoBurn Behavior

The `DefaultActivityInvokerMiddleware` implements "bookmark burning":
- When a bookmark is consumed successfully, it's deleted from the store
- This prevents the same bookmark from being used twice
- Controlled by the `AutoBurn` property on bookmark options

---

## Repository Links

- **elsa-core**: https://github.com/elsa-workflows/elsa-core
- **elsa-extensions**: https://github.com/elsa-workflows/elsa-extensions

---

## Maintenance Notes

When updating the Troubleshooting Guide, verify:

1. File paths are still accurate after elsa-core refactoring
2. Method names and behaviors match current implementation
3. New relevant source files are added to this reference list
4. Deprecated files are removed or marked as such

---

**Last Updated:** 2025-11-25
