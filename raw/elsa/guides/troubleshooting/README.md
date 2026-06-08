---
description: >-
  Comprehensive troubleshooting guide for diagnosing and resolving common Elsa Workflows issues in development and production environments.
---

# Troubleshooting Guide

This guide helps operators and developers diagnose and resolve common Elsa Workflows issues. Each section is organized by symptom and provides step-by-step checks, root causes, and fixes grounded in Elsa's runtime behavior.

## Quick Start Checklist

Before diving into specific symptoms, verify these foundational items:

| Component | Check | Command/Location |
|-----------|-------|------------------|
| **Environment** | .NET runtime version compatible | `dotnet --info` |
| **Database** | Connection string valid and accessible | Test with `dotnet ef database update` or connection test |
| **Distributed Locks** | Lock provider configured (Redis/PostgreSQL/SQL Server) | Check `UseDistributedRuntime()` in Program.cs |
| **Scheduler** | Quartz configured and clustering enabled (if multi-node) | Check `UseQuartzScheduler()` and clustering settings |
| **Endpoints** | Elsa API accessible | `curl http://localhost:5000/elsa/api/workflow-definitions` |
| **Health Checks** | Application healthy | `curl http://localhost:5000/health/ready` |

---

## Symptom Playbooks

### Workflows Don't Start

**Symptoms:**
- Creating a workflow instance via API returns success, but no execution occurs
- Workflow appears in "Pending" or never changes to "Running"
- No logs indicating workflow execution

**Step-by-Step Diagnosis:**

1. **Check workflow definition is published:**
   ```bash
   curl http://localhost:5000/elsa/api/workflow-definitions/<definition-id>
   ```
   Verify `isPublished: true` in the response.

2. **Check for trigger conditions:**
   - If the workflow uses a trigger (HTTP, Timer, etc.), ensure the trigger is configured correctly
   - For HTTP triggers, verify the endpoint is listening: check logs for `Mapped endpoint` messages

3. **Verify workflow runtime is started:**
   Look for startup logs:
   ```
   [INF] Elsa workflow runtime started
   ```

4. **Check for exceptions in logs:**
   Increase log level to Debug for Elsa namespaces (see [Logging Configuration](examples/logging-config.md))

5. **Verify database connectivity:**
   ```sql
   -- Check if workflow instance was persisted
   SELECT * FROM elsa.workflow_instances ORDER BY created_at DESC LIMIT 5;
   ```

**Common Fixes:**

- **Unpublished definition:** Publish the workflow via Elsa Studio or API
- **Missing trigger registration:** Ensure `UseHttp()`, `UseScheduling()`, or other trigger modules are configured in Program.cs
- **Startup order issues:** Verify Elsa services are registered before `app.Run()`

**Code Reference:**
- `src/modules/Elsa.Workflows.Core/Middleware/Activities/DefaultActivityInvokerMiddleware.cs` - Entry point for activity execution. This middleware orchestrates the execution of activities and is where the workflow execution pipeline begins.

---

### Workflows Don't Resume (Bookmark Issues)

**Symptoms:**
- Workflow is suspended at a blocking activity but never resumes
- External events (HTTP callbacks, signals) don't wake the workflow
- Logs show "Bookmark not found" errors

**Step-by-Step Diagnosis:**

1. **Verify the bookmark exists:**
   ```sql
   SELECT * FROM elsa.bookmarks 
   WHERE workflow_instance_id = '<instance-id>';
   ```

2. **Check bookmark hash matches stimulus:**
   Bookmarks are matched using a deterministic hash based on activity type and stimulus data. Mismatched stimulus (e.g., different payload, correlation ID) won't find the bookmark.

3. **Verify distributed lock provider is configured:**
   The `WorkflowResumer` acquires a distributed lock before resuming. Without a proper lock provider in multi-node setups, resume operations may fail silently.

4. **Check for lock acquisition failures:**
   Enable Debug logging for `Elsa.Workflows.Runtime`:
   ```
   [DBG] Attempting to acquire lock for workflow instance <id>
   [INF] Lock acquisition failed; resume already in progress
   ```

5. **Verify stimulus hashing:**
   The bookmark filter uses a hash of (activity type + stimulus payload). If your resume payload doesn't exactly match what was stored when the bookmark was created, the bookmark won't be found.

**Common Fixes:**

- **Configure distributed lock provider:**
  ```csharp
  elsa.UseWorkflowRuntime(runtime =>
  {
      runtime.UseDistributedRuntime();
      runtime.DistributedLockProvider = sp => 
          new RedisDistributedSynchronizationProvider(/*...*/);
  });
  ```

- **Match stimulus exactly:** Ensure the resume payload matches the bookmark's expected stimulus data

- **Check lock timeouts:** Increase lock acquisition timeout for high-latency environments

**Code References:**
- `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs` - Uses `IDistributedLockProvider` to serialize resume operations. The `ResumeWorkflowAsync` method acquires a lock on the workflow instance before loading and resuming, preventing concurrent modifications.
- `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs` - Contains `CreateBookmark()` which generates bookmarks with deterministic hashes. Bookmarks auto-suspend the workflow when created.

---

### Duplicate Resumes (Concurrency Issues)

**Symptoms:**
- Same workflow step executes multiple times
- Duplicate side effects (emails sent twice, records created twice)
- Logs show multiple nodes processing the same resume request

**Step-by-Step Diagnosis:**

1. **Verify distributed locking is enabled:**
   Check for `UseDistributedRuntime()` in configuration:
   ```csharp
   elsa.UseWorkflowRuntime(runtime => runtime.UseDistributedRuntime());
   ```

2. **Check lock provider connectivity:**
   ```bash
   # For Redis
   redis-cli -h redis-host PING
   
   # For PostgreSQL
   psql -h postgres-host -U user -c "SELECT 1"
   ```

3. **Review logs for concurrent lock acquisitions:**
   In a correctly configured cluster, only one node should successfully acquire the lock:
   ```
   [INF] Acquired distributed lock for workflow <id>
   [INF] Lock acquisition failed for workflow <id> - already in progress
   ```

4. **Verify Quartz clustering (for scheduled tasks):**
   Check that all nodes share the same Quartz database and clustering is enabled:
   ```
   quartz.jobStore.clustered = true
   ```

**Common Fixes:**

- **Single scheduler pattern:** In multi-node deployments, either:
  - Use Quartz clustering with a shared database
  - Designate a single scheduler node

- **Configure distributed locking:**
  ```csharp
  runtime.DistributedLockProvider = sp =>
      new PostgresDistributedSynchronizationProvider(connectionString);
  ```

- **Ensure idempotent activities:** Design activities to be safe for replay (check before insert, use idempotency keys)

**Code References:**
- `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs` - Implements distributed locking pattern using `IDistributedLockProvider` from Medallion.Threading library.
- `src/modules/Elsa.Workflows.Core/Middleware/Activities/DefaultActivityInvokerMiddleware.cs` - Handles "bookmark burning" via the `AutoBurn` option. When a bookmark is consumed successfully, it's deleted to prevent re-use.

---

### Timers Fire Multiple Times or Not at All

**Symptoms:**
- Scheduled workflows run multiple times per trigger
- Timers never fire despite being scheduled
- Cron schedules execute at wrong times or skip executions

**Step-by-Step Diagnosis:**

1. **Check Quartz clustering configuration:**
   ```sql
   -- Verify Quartz sees all nodes
   SELECT * FROM qrtz_scheduler_state;
   ```
   All nodes should appear with recent `last_checkin_time`.

2. **Verify scheduled bookmarks exist:**
   ```sql
   -- Check for scheduled triggers
   SELECT * FROM qrtz_triggers 
   WHERE trigger_group = 'Elsa.Scheduling'
   ORDER BY next_fire_time;
   ```

3. **Check clock synchronization:**
   All nodes must use synchronized time (NTP). Clock drift causes misfires or duplicates.
   ```bash
   timedatectl status  # Check if NTP is active
   ```

4. **Review DefaultBookmarkScheduler behavior:**
   This service categorizes bookmarks by type (Timer, Delay, Cron) and schedules them via Quartz:
   - **Timer/Delay:** One-time execution at specific time
   - **Cron:** Recurring based on cron expression

5. **Check for misfires:**
   ```sql
   SELECT * FROM qrtz_triggers WHERE misfire_instr != 0;
   ```

**Common Fixes:**

- **Enable Quartz clustering:**
  ```csharp
  elsa.UseQuartz(quartz =>
  {
      quartz.UsePostgreSql(connectionString);
      // Clustering is enabled automatically
  });
  ```

- **Adjust misfire thresholds:**
  ```properties
  quartz.jobStore.misfireThreshold = 60000
  ```

- **Use consistent time zones:**
  ```yaml
  env:
    - name: TZ
      value: "UTC"
  ```

**Code References:**
- `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs` - Categorizes and schedules Timer/Delay/Cron bookmarks. Uses Quartz to schedule `ResumeWorkflowTask` jobs for future execution.
- `src/modules/Elsa.Workflows.Runtime/Middleware/Activities/BackgroundActivityInvokerMiddleware.cs` - Handles background/job execution for long-running activities. Activities marked for background execution are dispatched to a job queue.

---

### Stuck/Running Workflows and Incident Handling

**Symptoms:**
- Workflows stay in "Running" state indefinitely
- Workflow appears stuck at a specific activity
- Incidents are created but not handled

**Step-by-Step Diagnosis:**

1. **Identify stuck workflows:**
   ```sql
   SELECT id, definition_id, status, sub_status, created_at, updated_at
   FROM elsa.workflow_instances
   WHERE status = 'Running'
   AND updated_at < NOW() - INTERVAL '1 hour';
   ```

2. **Check for incidents:**
   ```sql
   SELECT * FROM elsa.workflow_incidents
   WHERE workflow_instance_id = '<instance-id>';
   ```

3. **Review activity execution context:**
   Look for exceptions in logs around the time the workflow became stuck.

4. **Check for orphaned locks:**
   If a node crashes while holding a lock, the workflow may appear stuck:
   ```bash
   # Redis: Check for workflow locks
   redis-cli --scan --pattern "workflow:*"
   
   # These should auto-expire based on TTL
   ```

5. **Verify background jobs are processing:**
   For activities executed in background, check the job queue:
   ```sql
   SELECT * FROM elsa.workflow_execution_log
   WHERE workflow_instance_id = '<instance-id>'
   ORDER BY timestamp DESC;
   ```

**Common Fixes:**

- **Cancel stuck workflows:**
  ```bash
  curl -X POST http://localhost:5000/elsa/api/workflow-instances/<id>/cancel
  ```

- **Retry faulted activities:**
  Use Elsa Studio's incident handling UI to retry or skip faulted activities

- **Configure incident strategies:**
  ```csharp
  elsa.UseIncidentStrategies(strategies =>
  {
      strategies.Add<RetryIncidentStrategy>();
      strategies.Add<ContinueWithDefaultIncidentStrategy>();
  });
  ```

- **Implement graceful shutdown:**
  Ensure pods wait for in-progress workflows before terminating

**Code Reference:**
- `src/modules/Elsa.Workflows.Core/Middleware/Activities/DefaultActivityInvokerMiddleware.cs` - Manages activity lifecycle including fault handling. Exceptions during activity execution are caught and can trigger incident creation.

---

### High Database Load / Slow Persistence

**Symptoms:**
- Slow workflow execution times
- Database CPU/IO consistently high
- Timeout errors during workflow operations

**Step-by-Step Diagnosis:**

1. **Identify slow queries:**
   ```sql
   -- PostgreSQL: Enable query logging temporarily
   SET log_min_duration_statement = 100;  -- Log queries > 100ms
   ```

2. **Check table sizes:**
   ```sql
   SELECT relname, n_live_tup, n_dead_tup
   FROM pg_stat_user_tables
   WHERE schemaname = 'elsa'
   ORDER BY n_live_tup DESC;
   ```

3. **Check for missing indexes:**
   Common queries that need indexes:
   - `workflow_instances` by `status`, `definition_id`, `correlation_id`
   - `bookmarks` by `workflow_instance_id`, `hash`

4. **Review connection pool utilization:**
   ```sql
   SELECT count(*) FROM pg_stat_activity 
   WHERE datname = 'elsa';
   ```

5. **Check for long-running transactions:**
   ```sql
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query
   FROM pg_stat_activity
   WHERE (now() - pg_stat_activity.query_start) > INTERVAL '5 minutes';
   ```

**Common Fixes:**

- **Increase connection pool size:**
  ```
  Server=host;Database=elsa;MaxPoolSize=200
  ```

- **Add indexes for common queries:**
  ```sql
  CREATE INDEX idx_bookmarks_hash ON elsa.bookmarks(hash);
  CREATE INDEX idx_instances_status ON elsa.workflow_instances(status);
  ```

- **Implement data retention (see below)**

- **Use read replicas for queries:**
  Configure Elsa to use read replicas for workflow history queries

---

## Logging & Diagnostics

### Increasing Log Level

For troubleshooting, increase Elsa log verbosity. See [Logging Configuration Examples](examples/logging-config.md) for complete snippets.

**Quick Configuration (appsettings.json):**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Elsa": "Debug",
      "Elsa.Workflows.Runtime": "Debug",
      "Elsa.Scheduling": "Debug"
    }
  }
}
```

### Key Log Messages to Look For

| Scenario | Log Pattern | Level |
|----------|-------------|-------|
| Workflow started | `Starting workflow instance {Id}` | Information |
| Bookmark created | `Created bookmark {Hash} for activity {ActivityId}` | Debug |
| Lock acquired | `Acquired distributed lock for workflow {Id}` | Debug |
| Lock failed | `Lock acquisition failed; resume already in progress` | Information |
| Timer scheduled | `Scheduled timer for bookmark {Id} at {Time}` | Debug |
| Activity faulted | `Activity {ActivityType} faulted: {Exception}` | Error |
| Bookmark burned | `Burned bookmark {Hash}` | Debug |

### Including Correlation/Workflow IDs in Logs

Enable structured logging with workflow context:
```csharp
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", "ElsaServer")
    .WriteTo.Console(new CompactJsonFormatter())
    .CreateLogger();
```

In workflows, the workflow instance ID and correlation ID are automatically added to the log scope when using Elsa's logging infrastructure.

---

## Tracing with Elsa.OpenTelemetry

For production observability, Elsa provides OpenTelemetry integration through the `Elsa.OpenTelemetry` package in the [elsa-extensions](https://github.com/elsa-workflows/elsa-extensions) repository.

**Quick Setup:**
```csharp
using Elsa.OpenTelemetry.Extensions;

builder.Services.AddElsa(elsa =>
{
    elsa.UseOpenTelemetry();  // Adds tracing middleware
});

// Configure OpenTelemetry exporter
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing.AddElsaSource();  // Add Elsa's ActivitySource
        tracing.AddOtlpExporter();
    });
```

**What's Traced:**
- Workflow execution spans
- Activity execution spans (with inputs/outputs)
- HTTP trigger processing
- Background job execution

For full setup including metrics export to Prometheus, Grafana dashboards, and distributed tracing with Jaeger, see **DOC-016: Monitoring Guide**.

**Code Reference:**
- `src/modules/diagnostics/Elsa.OpenTelemetry/*` (in elsa-extensions) - Contains tracing middleware and `ActivitySource` definitions for OpenTelemetry integration.

---

## Data Retention & Cleanup

### Workflow Instance Retention

Old workflow instances consume database space and slow queries. Configure automatic cleanup:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseWorkflowInstanceRetention(retention =>
    {
        retention.RetentionPeriod = TimeSpan.FromDays(30);
        retention.SweepInterval = TimeSpan.FromHours(1);
    });
});
```

### Manual Cleanup Queries

```sql
-- Delete completed workflows older than 30 days
DELETE FROM elsa.workflow_instances
WHERE status = 'Completed'
  AND finished_at < NOW() - INTERVAL '30 days';

-- Delete orphaned bookmarks
DELETE FROM elsa.bookmarks
WHERE workflow_instance_id NOT IN (
    SELECT id FROM elsa.workflow_instances
);

-- Clean execution logs (if using execution logging)
DELETE FROM elsa.workflow_execution_log
WHERE timestamp < NOW() - INTERVAL '7 days';
```

### Quartz Cleanup

Quartz manages its own cleanup, but old triggers can accumulate:
```sql
-- Remove old fired triggers
DELETE FROM qrtz_fired_triggers
WHERE fired_time < EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days') * 1000;
```

---

## Production Checklist

Before going to production, verify:

### Infrastructure
- [ ] Database connection pooling configured (50-200 connections)
- [ ] Database backups scheduled and tested
- [ ] Redis/lock provider accessible from all nodes
- [ ] Message broker (RabbitMQ/Azure Service Bus) configured for cache invalidation

### Elsa Configuration
- [ ] `UseDistributedRuntime()` enabled
- [ ] Distributed lock provider configured
- [ ] Quartz clustering enabled (if multi-node)
- [ ] Workflow instance retention configured
- [ ] Health checks exposed (`/health/ready`, `/health/live`)

### Observability
- [ ] Structured logging enabled (JSON format recommended)
- [ ] Log aggregation configured (ELK, Loki, CloudWatch)
- [ ] OpenTelemetry tracing enabled (optional but recommended)
- [ ] Alerts configured for:
  - High error rates
  - Long-running workflows
  - Lock acquisition failures
  - Database connection issues

### Security
- [ ] API authentication configured
- [ ] HTTPS enforced for resume URLs
- [ ] Database credentials in secrets (not config files)
- [ ] Network policies restricting access to Elsa services

---

## Escalation Tips

When troubleshooting doesn't resolve the issue:

1. **Gather Information:**
   - Elsa version (`dotnet list package | grep Elsa`)
   - .NET version (`dotnet --version`)
   - Database type and version
   - Logs from the time of the issue (with Debug level enabled)
   - Workflow definition JSON (if applicable)

2. **Reproduce in Isolation:**
   - Create a minimal workflow that demonstrates the issue
   - Test on a single node to rule out clustering issues

3. **Search Existing Issues:**
   - [Elsa GitHub Issues](https://github.com/elsa-workflows/elsa-core/issues)
   - [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)

4. **Create a Bug Report:**
   Include:
   - Steps to reproduce
   - Expected vs actual behavior
   - Relevant logs
   - Minimal reproduction project (if possible)

5. **Community Resources:**
   - Discord community
   - Stack Overflow (tag: `elsa-workflows`)

---

## Related Documentation

- [Clustering Guide](../clustering/README.md) - Multi-node deployment configuration
- [Distributed Hosting](../../hosting/distributed-hosting.md) - Core distributed concepts
- [Incidents Configuration](../../operate/incidents/configuration.md) - Incident handling setup
- [Retention](../../optimize/retention.md) - Data retention policies
- [Logging Framework](../../features/logging-framework.md) - Activity logging

## Supplementary Files

- [Logging Configuration Examples](examples/logging-config.md)
- [Troubleshooting Checklist](examples/checklist.md)
- [Source File References](README-REFERENCES.md)

---

**Last Updated:** 2025-11-25
