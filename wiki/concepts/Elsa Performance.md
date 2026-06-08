---
type: concept
title: "Elsa Performance"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - performance
  - scaling
  - optimization
status: developing
address: c-000082
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Troubleshooting]]"
---

# Elsa Performance

Performance optimization and scaling techniques for [[entities/Elsa Workflows]] 3.x in production deployments.

---

## Commit Strategies

A **commit strategy** controls when the workflow engine persists workflow instance state to the database. More frequent commits = more durability but lower throughput.

### Built-in Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| `WorkflowExecuting` | Commit when workflow starts | Capture initial state |
| `WorkflowExecuted` | Commit only when workflow finishes | **Maximum throughput** |
| `ActivityExecuting` | Commit before each activity | Maximum durability |
| `ActivityExecuted` | Commit after each activity | Balance of durability and visibility |
| `Periodic` | Commit at regular intervals (e.g., every 30s) | Predictable timing for long-running workflows |

### Configuration

**Global registration:**
```csharp
elsa.UseWorkflows(workflows =>
{
    workflows.UseCommitStrategies(strategies =>
    {
        strategies.UseWorkflowExecutedStrategy();  // Minimal commits, highest throughput
        strategies.UsePeriodicStrategy(TimeSpan.FromSeconds(30));
    });
});
```

**Per-workflow selection:**
```csharp
public class HighThroughputWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.WorkflowOptions.CommitStrategyName = "WorkflowExecuted";
        // ...
    }
}
```

### Scenario Recommendations

| Scenario | Strategy |
|----------|----------|
| High throughput, short-lived | `WorkflowExecuted` |
| Long-running, many activities | `Periodic` (every 30s) |
| Critical, must-not-lose-state | `ActivityExecuted` |
| Development/debugging | `ActivityExecuting` |

### Custom Strategy: Commit Every N Activities

Implement `IWorkflowCommitStrategy` for custom behavior:
```csharp
public class CommitEveryNActivitiesStrategy : IWorkflowCommitStrategy
{
    public string Name => "CommitEvery10Activities";

    public ValueTask<bool> ShouldCommitAsync(WorkflowCommitStateContext context)
    {
        // Track count in TransientProperties, commit when threshold reached
    }
}
```

> [!warning] Invalid Properties
> `workflows.CommitStateInterval` and `workflows.CommitStateActivityCount` do NOT exist. Use `WorkflowsFeature.UseCommitStrategies()` for all configuration.

---

## Database Optimization

### Connection Pooling

```csharp
var connectionString = new NpgsqlConnectionStringBuilder
{
    Host = "postgres-host",
    MaxPoolSize = 100,     // Increase for high concurrency
    MinPoolSize = 10,      // Keep warm connections
    ConnectionIdleLifetime = 300,
    CommandTimeout = 60
}.ToString();
```

### Indexes

Ensure indexes on frequently queried columns:
```sql
CREATE INDEX idx_bookmarks_hash ON elsa.bookmarks(hash);
CREATE INDEX idx_instances_status ON elsa.workflow_instances(status);
CREATE INDEX idx_instances_correlation ON elsa.workflow_instances(correlation_id);
```

### Bulk Operations

```csharp
// Batch delete completed workflows
var filter = new WorkflowInstanceFilter
{
    WorkflowStatus = WorkflowStatus.Finished,
    TimestampFilters = new[]
    {
        new TimestampFilter
        {
            Column = "FinishedAt",
            Operator = TimestampFilterOperator.LessThan,
            Timestamp = DateTimeOffset.UtcNow.AddDays(-30)
        }
    }
};
var deletedCount = await _store.DeleteAsync(filter, batchSize: 1000, cancellationToken);
```

---

## Clustering and Scheduler Tuning

### Quartz Scheduler for High Volume

```csharp
elsa.UseScheduling(scheduling => scheduling.UseQuartzScheduler());
elsa.UseQuartz(quartz => quartz.UsePostgreSql(connectionString));

// High-throughput settings
builder.Services.Configure<QuartzOptions>(options =>
{
    options["quartz.threadPool.threadCount"] = "20";
    options["quartz.jobStore.misfireThreshold"] = "60000";
    options["quartz.jobStore.clustered"] = "true";
    options["quartz.jobStore.clusterCheckinInterval"] = "15000";
});
```

### Distributed Lock Optimization

```csharp
runtime.DistributedLockProvider = sp =>
{
    var redis = sp.GetRequiredService<IConnectionMultiplexer>();
    return new RedisDistributedSynchronizationProvider(
        redis.GetDatabase(),
        new RedisDistributedSynchronizationProviderOptions
        {
            Expiry = TimeSpan.FromSeconds(15),
            MinimumDatabaseExpiry = TimeSpan.FromSeconds(5)
        });
};
```

### Lock Contention Monitoring

```csharp
public class LockMetrics
{
    private static readonly Histogram<double> LockAcquisitionTime = 
        Meter.CreateHistogram<double>("elsa.lock.acquisition.time", "ms");
    private static readonly Counter<long> LockTimeouts = 
        Meter.CreateCounter<long>("elsa.lock.timeouts", "count");
    // Record metrics in middleware or after lock attempts
}
```

---

## Observability and Monitoring

### OpenTelemetry Tracing

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddNpgsqlInstrumentation()
            .AddRedisInstrumentation()
            .AddSource("Elsa.Workflows")
            .AddOtlpExporter();
    });
```

Traced operations include: workflow execution, activity execution, bookmark creation/resumption, and HTTP triggers.

### Custom Metrics Middleware

```csharp
public class MetricsMiddleware : IActivityExecutionMiddleware
{
    public async ValueTask InvokeAsync(ActivityExecutionContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        try { await _next(context); }
        finally
        {
            stopwatch.Stop();
            ActivitiesExecuted.Add(1, 
                new KeyValuePair<string, object?>("activity.type", context.Activity.Type));
            ActivityDuration.Record(stopwatch.Elapsed.TotalMilliseconds,
                new KeyValuePair<string, object?>("activity.type", context.Activity.Type));
        }
    }
}
```

### Key Metrics to Monitor

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `elsa.activities.executed` | Rate of execution | N/A (baseline) |
| `elsa.activity.duration` | Execution duration per activity | P95 > 5000ms |
| `elsa.lock.acquisition.time` | Lock latency | P95 > 500ms |
| `elsa.lock.timeouts` | Lock failures | > 10/minute |

---

## Performance Checklist

Before deploying to production:

- [ ] **Commit strategy selected** for each workflow type
- [ ] **Clustering configured**: `UseDistributedRuntime()` enabled for multi-node
- [ ] **Distributed locks**: Redis or database-backed
- [ ] **Quartz clustering**: enabled for scheduled workflows
- [ ] **Connection pools**: sized for expected concurrency (50-200)
- [ ] **Monitoring**: OpenTelemetry tracing and metrics configured
- [ ] **Retention**: workflow instance cleanup policies in place
- [ ] **Indexes**: on frequently queried columns
