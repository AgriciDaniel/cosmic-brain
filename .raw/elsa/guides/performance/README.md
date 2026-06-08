---
description: >-
  Comprehensive guide to optimizing Elsa Workflows for high-throughput scenarios, covering commit strategies, state persistence tuning, observability, and performance best practices.
---

# Performance & Scaling Guide

## Executive Summary

This guide covers performance optimization techniques for Elsa Workflows 3.x, focusing on workflow state persistence, commit strategies, observability, and tuning for high-throughput scenarios. These optimizations are essential for production deployments handling large volumes of workflow executions.

### Key Performance Considerations

1. **State Persistence**: Control when and how workflow state is persisted to the database
2. **Commit Strategies**: Choose optimal commit points to balance durability and throughput
3. **Observability**: Monitor performance with built-in tracing and custom metrics
4. **Resource Management**: Tune database connections, locks, and scheduling

## Workflow Commit Strategies

Elsa Workflows provides a flexible commit strategy system that controls when workflow state is persisted during execution. This is critical for balancing durability against performance.

### Understanding Commit Strategies

A **commit strategy** determines when the workflow engine persists workflow instance state to the database. More frequent commits increase durability (less work lost on failure) but decrease throughput (more database writes). Less frequent commits improve throughput but may lose more work on failure.

**Code References:**
- `src/modules/Elsa.Workflows.Core/CommitStates/Extensions/ModuleExtensions.cs` - Registration extensions
- `src/modules/Elsa.Workflows.Core/CommitStates/CommitStrategiesFeature.cs` - Feature configuration
- `src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs` - WorkflowsFeature integration

### Registering Commit Strategies

Use the `UseCommitStrategies` extension method on `WorkflowsFeature` to configure commit strategies:

```csharp
using Elsa.Extensions;
using Elsa.Workflows.CommitStates;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        // Register commit strategies
        workflows.UseCommitStrategies(strategies =>
        {
            // Register built-in workflow-level strategies
            strategies.UseWorkflowExecutingStrategy();   // Commit when workflow starts executing
            strategies.UseWorkflowExecutedStrategy();    // Commit when workflow finishes executing
            
            // Register built-in activity-level strategies
            strategies.UseActivityExecutingStrategy();   // Commit before each activity executes
            strategies.UseActivityExecutedStrategy();    // Commit after each activity executes
            
            // Register time-based periodic strategy
            strategies.UsePeriodicStrategy(TimeSpan.FromSeconds(30)); // Commit every 30 seconds
        });
    });
});

var app = builder.Build();
app.Run();
```

### Built-in Commit Strategies

Elsa provides the following built-in commit strategies in `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/`:

| Strategy | Description | Use Case |
|----------|-------------|----------|
| `WorkflowExecutingWorkflowStrategy` | Commits when workflow starts | Capture initial state before execution |
| `WorkflowExecutedWorkflowStrategy` | Commits when workflow completes | Minimal commits, highest throughput |
| `ActivityExecutingWorkflowStrategy` | Commits before each activity | Maximum durability, lower throughput |
| `ActivityExecutedWorkflowStrategy` | Commits after each activity | Balance of durability and visibility |
| `PeriodicWorkflowStrategy` | Commits at regular time intervals | Predictable commit timing |

**Code Reference:** `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/PeriodicWorkflowStrategy.cs`

### Selecting a Strategy Per Workflow

You can configure a specific commit strategy for individual workflows using `WorkflowOptions.CommitStrategyName`:

**Programmatic (Core):**
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Models;

public class HighThroughputWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        // Use workflow-executed strategy for minimal commits
        builder.WorkflowOptions.CommitStrategyName = "WorkflowExecuted";
        
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine("Step 1"),
                new WriteLine("Step 2"),
                new WriteLine("Step 3")
            }
        };
    }
}
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs`

**Via API Client:**
```csharp
using Elsa.Api.Client.Resources.WorkflowDefinitions.Models;

var workflowOptions = new WorkflowOptions
{
    CommitStrategyName = "ActivityExecuted"
};
```

**Code Reference:** `src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/WorkflowOptions.cs`

**Via Elsa Studio:**

In Elsa Studio, you can set the commit strategy in the workflow definition settings under the "Advanced" or "Options" tab.

### Custom Commit Strategy: Commit Every N Activities

Elsa does not include a built-in "commit every N activities" strategy, but you can implement a custom `IWorkflowCommitStrategy`. Here's a minimal outline:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.CommitStates;

/// <summary>
/// Custom commit strategy that commits every N activities.
/// Uses WorkflowExecutionContext.TransientProperties to track activity count.
/// </summary>
public class CommitEveryNActivitiesStrategy : IWorkflowCommitStrategy
{
    private const string ActivityCountKey = "CommitEveryN:ActivityCount";
    private readonly int _n;

    public CommitEveryNActivitiesStrategy(int n)
    {
        _n = n;
    }

    public string Name => $"CommitEvery{_n}Activities";

    public ValueTask<bool> ShouldCommitAsync(WorkflowCommitStateContext context)
    {
        var executionContext = context.WorkflowExecutionContext;
        
        // Get current count from transient properties
        var count = executionContext.TransientProperties
            .GetValueOrDefault(ActivityCountKey, 0);
        
        // Increment on ActivityExecuted events
        if (context.CommitEvent == WorkflowCommitEvent.ActivityExecuted)
        {
            count++;
            executionContext.TransientProperties[ActivityCountKey] = count;
            
            // Commit every N activities
            if (count >= _n)
            {
                executionContext.TransientProperties[ActivityCountKey] = 0;
                return new ValueTask<bool>(true);
            }
        }
        
        return new ValueTask<bool>(false);
    }
}
```

**Registration:**
```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        workflows.UseCommitStrategies(strategies =>
        {
            // Register custom strategy using the AddStrategy extension method
            // The factory pattern allows for dependency injection
            strategies.AddStrategy<CommitEveryNActivitiesStrategy>(
                sp => new CommitEveryNActivitiesStrategy(10)); // Commit every 10 activities
        });
    });
});
```

> **Note:** This is a simplified outline. The `AddStrategy<T>` method registers a custom `IWorkflowCommitStrategy` with the DI container. A production implementation should handle edge cases like workflow completion, suspension, and error states.

## Observability and Monitoring

### Built-in Tracing with Elsa.OpenTelemetry

Elsa provides built-in OpenTelemetry integration through the `Elsa.OpenTelemetry` module, which automatically instruments workflow execution with traces and spans.

**Configuration:**
```csharp
using Elsa.Extensions;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Configure OpenTelemetry tracing
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddSource("Elsa.Workflows")  // Add Elsa's activity source
            .AddOtlpExporter();  // Export to OTLP-compatible backend
    });

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflows(workflows =>
    {
        // Enable OpenTelemetry middleware
        workflows.UseWorkflowExecutionPipeline(pipeline =>
        {
            pipeline.UseDefaultPipeline();
        });
    });
});

var app = builder.Build();
app.Run();
```

**What's Traced:**
- Workflow execution spans (start, complete, fault)
- Activity execution spans (per activity)
- Bookmark creation and resumption
- HTTP workflow triggers

### User-Defined Metrics

For custom performance metrics beyond built-in tracing, you can implement your own metrics collection:

```csharp
using System.Diagnostics;
using System.Diagnostics.Metrics;
using Elsa.Workflows.Pipelines.ActivityExecution;

public class MetricsMiddleware : IActivityExecutionMiddleware
{
    private static readonly Meter Meter = new("Elsa.CustomMetrics", "1.0.0");
    private static readonly Counter<long> ActivitiesExecuted = 
        Meter.CreateCounter<long>("elsa.activities.executed", "count");
    private static readonly Histogram<double> ActivityDuration = 
        Meter.CreateHistogram<double>("elsa.activity.duration", "ms");

    private readonly ActivityMiddlewareDelegate _next;

    public MetricsMiddleware(ActivityMiddlewareDelegate next)
    {
        _next = next;
    }

    public async ValueTask InvokeAsync(ActivityExecutionContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            await _next(context);
        }
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

> **Important Distinction:** 
> - **Built-in tracing** (Elsa.OpenTelemetry) provides distributed tracing for debugging and understanding execution flow
> - **User-defined metrics** are for custom performance monitoring, alerting, and capacity planning

## Performance Tuning Best Practices

### 1. Choose the Right Commit Strategy

| Scenario | Recommended Strategy |
|----------|---------------------|
| High throughput, short-lived workflows | `WorkflowExecutedWorkflowStrategy` |
| Long-running workflows with many activities | `PeriodicWorkflowStrategy` (e.g., every 30s) |
| Critical workflows requiring durability | `ActivityExecutedWorkflowStrategy` |
| Development/debugging | `ActivityExecutingWorkflowStrategy` |

### 2. Database Optimization

- **Connection Pooling:** Ensure adequate connection pool size for concurrent workflows
- **Indexes:** Verify indexes on workflow instance and bookmark tables
- **Batching:** Consider batch operations for bulk workflow management

```csharp
// Example: Configure EF Core with optimized settings
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer(connectionString, options =>
            {
                options.CommandTimeout(60);  // Increase for large workflows
                options.EnableRetryOnFailure(3);
            });
        });
    });
});
```

### 3. Reduce Lock Contention

For clustered deployments, minimize lock contention:

- Use workflow correlation IDs effectively to distribute load
- Consider workflow partitioning strategies
- Monitor lock acquisition times

See [Clustering Guide](../clustering/README.md) for detailed distributed locking configuration.

### 4. Scheduler Optimization

For workflows with timers and delays:

- Configure appropriate Quartz thread pool sizes
- Use database-backed job store for clustering
- Monitor scheduler queue depth

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
    
    elsa.UseQuartz(quartz =>
    {
        quartz.UsePostgreSql(connectionString);
    });
});
```

See `examples/throughput-tuning.md` for detailed tuning examples.

## Key Configuration Reference

**Code Reference:** `src/modules/Elsa/Features/ElsaFeature.cs`

| Configuration | Purpose | Default |
|--------------|---------|---------|
| `UseCommitStrategies()` | Register commit strategies | None (must be configured) |
| `WorkflowOptions.CommitStrategyName` | Select strategy per workflow | Inherits from default |
| `UseDistributedRuntime()` | Enable distributed execution | Disabled |
| `UseQuartzScheduler()` | Use Quartz for scheduling | Default scheduler |

## Related Documentation

- [Throughput Tuning Examples](examples/throughput-tuning.md) - Practical tuning scenarios
- [Source File References](README-REFERENCES.md) - elsa-core file paths
- [Clustering Guide](../clustering/README.md) - Distributed deployment
- [Log Persistence](../../optimize/log-persistence.md) - Activity log optimization
- [Retention](../../optimize/retention.md) - Data retention policies

---

**Last Updated:** 2025-11-28
