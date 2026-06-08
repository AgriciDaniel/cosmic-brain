---
description: >-
  Practical examples for tuning Elsa Workflows throughput, including commit strategies, clustering optimizations, and resource management.
---

# Throughput Tuning Examples

This document provides practical examples for optimizing Elsa Workflows throughput in high-volume scenarios.

## Commit Strategy Configuration

### High-Throughput Configuration

For maximum throughput with short-lived workflows, minimize commits:

```csharp
using Elsa.Extensions;
using Elsa.Workflows.CommitStates;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        // Configure commit strategies for high throughput
        workflows.UseCommitStrategies(strategies =>
        {
            // Only commit when workflow completes - minimal I/O
            strategies.UseWorkflowExecutedStrategy();
        });
    });
    
    // Additional performance settings
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();  // Enable for clustering
    });
});

var app = builder.Build();
app.Run();
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/WorkflowExecutedWorkflowStrategy.cs`

### Long-Running Workflow Configuration

For long-running workflows, use periodic commits to balance durability and performance:

```csharp
using Elsa.Extensions;
using Elsa.Workflows.CommitStates;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        workflows.UseCommitStrategies(strategies =>
        {
            // Commit every 30 seconds during execution
            strategies.UsePeriodicStrategy(TimeSpan.FromSeconds(30));
            
            // Also commit when workflow suspends (for bookmarks)
            strategies.UseWorkflowExecutedStrategy();
        });
    });
});

var app = builder.Build();
app.Run();
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/PeriodicWorkflowStrategy.cs`

### Per-Workflow Strategy Selection

Different workflows can use different commit strategies based on their requirements:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Models;

// High-throughput workflow - commit only on completion
public class BatchProcessingWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.WorkflowOptions.CommitStrategyName = "WorkflowExecuted";
        
        builder.Root = new Sequence
        {
            Activities =
            {
                new ForEach<string>
                {
                    // TODO: Implement GetBatchItems() to return your batch data
                    Items = new(context => GetBatchItems()),
                    Body = new ProcessItem() // Custom activity placeholder
                }
            }
        };
    }
}

// Critical workflow - commit after each activity
public class PaymentWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.WorkflowOptions.CommitStrategyName = "ActivityExecuted";
        
        builder.Root = new Sequence
        {
            Activities =
            {
                // The following are placeholder custom activities. Implement these in your project.
                new ValidatePayment(),
                new ChargeCard(),
                new SendReceipt()
            }
        };
    }
}
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs`

## Clustering and Scheduler Tuning

### Quartz Scheduler Configuration for High Volume

When running in a cluster with high scheduling load:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
    });
    
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
    
    elsa.UseQuartz(quartz =>
    {
        quartz.UsePostgreSql(
            builder.Configuration.GetConnectionString("PostgreSql")!);
    });
});

// Configure Quartz with high-throughput settings
builder.Services.Configure<QuartzOptions>(options =>
{
    options["quartz.threadPool.threadCount"] = "20";  // Increase thread pool
    options["quartz.jobStore.misfireThreshold"] = "60000";  // 1 minute misfire threshold
    options["quartz.jobStore.clustered"] = "true";
    options["quartz.jobStore.clusterCheckinInterval"] = "15000";  // 15 second check-in
});

var app = builder.Build();
app.Run();
```

### Distributed Lock Optimization

Reduce lock contention in clustered environments:

```csharp
using Elsa.Extensions;
using Medallion.Threading.Redis;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        
        // Configure Redis-based distributed locking
        runtime.DistributedLockProvider = sp =>
        {
            var redis = sp.GetRequiredService<IConnectionMultiplexer>();
            var options = new RedisDistributedSynchronizationProviderOptions
            {
                Expiry = TimeSpan.FromSeconds(15),
                MinimumDatabaseExpiry = TimeSpan.FromSeconds(5)
            };
            return new RedisDistributedSynchronizationProvider(
                redis.GetDatabase(),
                options);
        };
    });
});

// Configure Redis connection with optimizations
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var options = ConfigurationOptions.Parse(
        builder.Configuration.GetConnectionString("Redis")!);
    options.AbortOnConnectFail = false;
    options.ConnectRetry = 3;
    options.SyncTimeout = 5000;  // 5 second sync timeout
    return ConnectionMultiplexer.Connect(options);
});

var app = builder.Build();
app.Run();
```

### Lock Contention Monitoring

Monitor lock acquisition to identify bottlenecks:

```csharp
using System.Diagnostics;
using System.Diagnostics.Metrics;

public class LockMetrics
{
    private static readonly Meter Meter = new("Elsa.Locking", "1.0.0");
    private static readonly Histogram<double> LockAcquisitionTime = 
        Meter.CreateHistogram<double>("elsa.lock.acquisition.time", "ms");
    private static readonly Counter<long> LockTimeouts = 
        Meter.CreateCounter<long>("elsa.lock.timeouts", "count");

    public void RecordLockAcquisition(double milliseconds, string lockType)
    {
        LockAcquisitionTime.Record(milliseconds,
            new KeyValuePair<string, object?>("lock.type", lockType));
    }

    public void RecordLockTimeout(string lockType)
    {
        LockTimeouts.Add(1,
            new KeyValuePair<string, object?>("lock.type", lockType));
    }
}
```

## Database Tuning

### Connection Pool Configuration

Optimize database connection pooling for high concurrency:

```csharp
using Npgsql;
// PostgreSQL connection string with optimized pool settings
var connectionString = new NpgsqlConnectionStringBuilder
{
    Host = "postgres-host",
    Database = "elsa",
    Username = "elsa",
    Password = "your-password",
    MaxPoolSize = 100,           // Increase for high concurrency
    MinPoolSize = 10,            // Keep minimum connections warm
    ConnectionIdleLifetime = 300, // 5 minutes idle lifetime
    CommandTimeout = 60          // 1 minute command timeout
}.ToString();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(connectionString);
        });
    });
});
```

### Batch Operations

For bulk workflow operations, use batch APIs:

```csharp
using Elsa.Workflows.Management;
using Elsa.Workflows.Management.Filters;

// Example: Bulk delete completed workflows
public class WorkflowCleanupJob
{
    private readonly IWorkflowInstanceStore _store;
    
    public WorkflowCleanupJob(IWorkflowInstanceStore store)
    {
        _store = store;
    }
    
    public async Task CleanupCompletedWorkflowsAsync(CancellationToken cancellationToken)
    {
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
        
        // Delete in batches to avoid long-running transactions
        var batchSize = 1000;
        long deletedCount;
        
        do
        {
            deletedCount = await _store.DeleteAsync(filter, batchSize, cancellationToken);
        } while (deletedCount == batchSize);
    }
}
```

## Observability Setup

### Comprehensive Monitoring Configuration

Set up end-to-end observability for performance monitoring:

```csharp
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddNpgsqlInstrumentation()        // Database tracing
            .AddRedisInstrumentation()         // Redis tracing
            .AddSource("Elsa.Workflows")       // Elsa workflow tracing
            .AddOtlpExporter();
    })
    .WithMetrics(metrics =>
    {
        metrics
            .AddAspNetCoreInstrumentation()
            .AddRuntimeInstrumentation()
            .AddMeter("Elsa.CustomMetrics")    // Custom Elsa metrics
            .AddMeter("Elsa.Locking")          // Lock metrics
            .AddOtlpExporter();
    });

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        workflows.UseCommitStrategies(strategies =>
        {
            strategies.UsePeriodicStrategy(TimeSpan.FromSeconds(30));
            strategies.UseWorkflowExecutedStrategy();
        });
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
    });
});

var app = builder.Build();
app.Run();
```

### Key Metrics to Monitor

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `elsa.activities.executed` | Activities executed per second | N/A (baseline) |
| `elsa.activity.duration` | Activity execution duration | P95 > 5000ms |
| `elsa.lock.acquisition.time` | Lock acquisition latency | P95 > 500ms |
| `elsa.lock.timeouts` | Lock acquisition failures | > 10/minute |
| `db.connection.pool.active` | Active DB connections | > 80% of max pool |

## Performance Checklist

Before deploying to production, verify:

- [ ] **Commit Strategy Selected**: Choose appropriate strategy for each workflow type
- [ ] **Clustering Configured**: `UseDistributedRuntime()` enabled for multi-node deployments
- [ ] **Distributed Locks**: Redis or database-backed locks configured
- [ ] **Quartz Clustering**: Enabled for scheduled workflows
- [ ] **Connection Pools**: Sized appropriately for expected concurrency
- [ ] **Monitoring**: OpenTelemetry tracing and metrics configured
- [ ] **Retention**: Workflow instance cleanup policies in place

## Related Documentation

- [Performance Guide](README.md) - Main performance documentation
- [Source File References](README-REFERENCES.md) - elsa-core file paths
- [Clustering Guide](../clustering/README.md) - Distributed deployment patterns
- [Quartz Cluster Configuration](../clustering/examples/quartz-cluster-config.md) - Detailed Quartz setup

---

**Last Updated:** 2025-11-28
