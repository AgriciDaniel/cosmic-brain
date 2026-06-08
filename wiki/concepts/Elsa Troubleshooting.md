---
type: concept
title: "Elsa Troubleshooting"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - troubleshooting
  - debugging
  - testing
status: developing
address: c-000091
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Workflow Patterns]]"
  - "[[Elsa Architecture]]"
---

# Elsa Troubleshooting

Diagnosis and resolution of common [[entities/Elsa Workflows]] issues in development and production.

---

## Quick Start Checklist

| Component | Check |
|-----------|-------|
| **Environment** | .NET runtime version compatible (`dotnet --info`) |
| **Database** | Connection string valid and accessible |
| **Distributed Locks** | Lock provider configured (Redis/PostgreSQL/SQL Server) |
| **Scheduler** | Quartz configured and clustering enabled (if multi-node) |
| **Endpoints** | Elsa API accessible (`curl http://localhost:5000/elsa/api/workflow-definitions`) |
| **Health Checks** | Application healthy (`curl http://localhost:5000/health/ready`) |

---

## Symptom Playbooks

### Workflows Don't Start

**Checks:**
- [ ] Workflow definition is published (`isPublished: true`)
- [ ] Trigger module configured (`UseHttp()`, `UseScheduling()`, etc.)
- [ ] Elsa services registered before `app.Run()`
- [ ] Database connection is valid
- [ ] No exceptions in startup logs

**Fixes:**
- Publish the workflow via Studio or API
- Ensure trigger modules are configured in `Program.cs`
- Look for `[INF] Elsa workflow runtime started` in logs

### Workflows Don't Resume (Bookmark Issues)

**Checks:**
- [ ] Bookmark exists in database: `SELECT * FROM elsa.bookmarks WHERE workflow_instance_id = '<id>'`
- [ ] Resume payload matches bookmark stimulus exactly (hash must match)
- [ ] Distributed lock provider configured (`UseDistributedRuntime()`)
- [ ] Lock provider accessible (Redis/PostgreSQL)

**Fixes:**
- Configure distributed lock provider (Redis or database-backed)
- Match stimulus payload exactly — use shared payload classes
- Increase lock acquisition timeout for high-latency environments

### Duplicate Resumes (Concurrency)

**Checks:**
- [ ] `UseDistributedRuntime()` is enabled
- [ ] Lock provider accessible from all nodes
- [ ] All nodes connect to the same lock provider
- [ ] Quartz clustering enabled (if using scheduled tasks)
- [ ] Activities designed to be idempotent

**Fixes:**
- Enable distributed locking
- Use `AutoBurn = true` on bookmarks to prevent re-use
- Design activities to safely replay (check before insert, use idempotency keys)

### Timers Fire Multiple Times or Not at All

**Multiple fires:**
- Enable Quartz clustering with shared database
- Verify only one scheduler node or proper clustering

**No fires:**
- Check if Quartz scheduler is running
- Verify scheduled bookmark exists in `qrtz_triggers`
- Synchronize system clocks (NTP) across nodes
- Set consistent time zone (`TZ=UTC` recommended)

### Stuck/Running Workflows

**Diagnosis:**
```sql
-- Find stuck workflows
SELECT id, status, updated_at FROM elsa.workflow_instances
WHERE status = 'Running' AND updated_at < NOW() - INTERVAL '1 hour';

-- Check incidents
SELECT * FROM elsa.workflow_incidents WHERE workflow_instance_id = '<id>';
```

**Fixes:**
- Cancel stuck instances: `POST /elsa/api/workflow-instances/<id>/cancel`
- Retry or skip faulted activities from Elsa Studio
- Configure incident strategies: `RetryIncidentStrategy`, `ContinueWithDefaultIncidentStrategy`

### High Database Load

- Increase connection pool size (50-200 for production)
- Add indexes: `bookmarks(hash)`, `workflow_instances(status)`
- Configure workflow instance retention (auto-cleanup after 30 days)
- Use read replicas for query-heavy workloads

---

## Logging & Diagnostics

### Log Level Configuration

**Debug logging (troubleshooting):**
```json
{
  "Logging": {
    "LogLevel": {
      "Elsa": "Debug",
      "Elsa.Workflows.Runtime": "Debug",
      "Elsa.Scheduling": "Debug"
    }
  }
}
```

### Key Log Patterns to Watch

| Scenario | Log Message | Level |
|----------|-------------|-------|
| Workflow started | `Starting workflow instance {Id}` | Info |
| Bookmark created | `Created bookmark {Hash} for activity {ActivityId}` | Debug |
| Lock acquired | `Acquired distributed lock for workflow {Id}` | Debug |
| Activity faulted | `Activity {Type} faulted: {Exception}` | Error |
| Bookmark burned | `Burned bookmark {Hash}` | Debug |

### Log Categories

| Category | When to Enable |
|----------|----------------|
| `Elsa` | General troubleshooting |
| `Elsa.Workflows.Runtime` | Resume/bookmark issues |
| `Elsa.Scheduling` | Timer problems |
| `Elsa.Http` | HTTP workflow issues |
| `Quartz` | Scheduled task problems |

---

## OpenTelemetry Tracing

Enable distributed tracing for production observability:

```csharp
builder.Services.AddElsa(elsa => { elsa.UseOpenTelemetry(); });
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing.AddElsaSource();
        tracing.AddOtlpExporter();
    });
```

Traces workflow execution, activity execution, HTTP triggers, and background jobs.

---

## Testing Workflows

[[entities/Elsa Workflows]] provides testing infrastructure via the `Elsa.Testing.Shared` package.

### Unit Testing with ActivityTestFixture
```csharp
var fixture = new ActivityTestFixture(myActivity);
var context = await fixture.ExecuteAsync();
Assert.Equal(ActivityStatus.Completed, context.Status);
```

### Integration Testing with WorkflowTestFixture
```csharp
var fixture = new WorkflowTestFixture(testOutputHelper);
var result = await fixture.RunWorkflowAsync(workflow);
Assert.Equal(WorkflowStatus.Finished, result.WorkflowState.Status);
```

### Async Workflow Testing
```csharp
var runner = sp.GetRequiredService<AsyncWorkflowRunner>();
var result = await runner.RunAndAwaitWorkflowCompletionAsync(
    WorkflowDefinitionHandle.ByDefinitionId(workflowId, VersionOptions.Published));
```

### Debugging Techniques
- **Execution journal** — inspect `result.WorkflowState.ExecutionLog` for activity-level traces
- **WriteLine activities** — insert debug messages to trace flow
- **Custom Breakpoint activity** — pauses execution and dumps variable state
- **Inspect state** — use `IWorkflowStateStore` to load and examine instance state

### Production Checklist

- [ ] Database connection pooling configured (50-200 connections)
- [ ] Redis/lock provider accessible from all nodes
- [ ] `UseDistributedRuntime()` enabled
- [ ] Distributed lock provider configured
- [ ] Quartz clustering enabled (if multi-node)
- [ ] Workflow instance retention configured
- [ ] Health checks exposed
- [ ] Structured logging enabled (JSON format)
- [ ] Alerts configured for error rates, long-running workflows, lock failures

> [!tip] Escalation
> Before reporting a bug, gather: Elsa version (`dotnet list package | grep Elsa`), .NET version, database type, Debug-level logs, and a minimal reproduction workflow.
