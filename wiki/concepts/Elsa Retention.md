---
type: concept
title: "Elsa Retention"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - retention
  - cleanup
  - optimization
  - database
status: developing
address: c-000085
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Persistence]]"
  - "[[Elsa Log Persistence]]"
  - "[[Elsa Workers]]"
---

# Elsa Retention

The Retention feature automatically removes completed workflow instances from the database, preventing unbounded data growth. It supports configurable sweep intervals, flexible delete policies, and extensibility for custom cleanup strategies.

---

## Configuration

Enable the retention module and define policies:

```csharp
elsa.UseRetention(r =>
{
    r.SweepInterval = TimeSpan.FromMinutes(30);
    r.AddDeletePolicy("Delete all finished workflows", _ =>
        new RetentionWorkflowInstanceFilter()
        {
            WorkflowStatus = WorkflowStatus.Finished
        });
});
```

- **SweepInterval**: How often the retention engine checks for workflows matching any configured policy.
- **AddDeletePolicy**: Defines a named policy with a filter function. The function is called each sweep interval, allowing dynamic thresholds.

### Example: Delete Workflows Finished Over an Hour Ago

```csharp
elsa.UseRetention(r =>
{
    r.SweepInterval = TimeSpan.FromSeconds(30);
    r.AddDeletePolicy("Delete old finished workflows", sp =>
    {
        ISystemClock clock = sp.GetRequiredService<ISystemClock>();
        DateTimeOffset threshold = clock.UtcNow.Subtract(TimeSpan.FromHours(1));

        return new RetentionWorkflowInstanceFilter()
        {
            TimestampFilters =
            [
                new TimestampFilter()
                {
                    Column = nameof(WorkflowInstance.FinishedAt),
                    Operator = TimestampFilterOperator.LessThanOrEqual,
                    Timestamp = threshold
                }
            ],
            WorkflowStatus = WorkflowStatus.Finished
        };
    });
});
```

---

## Extensibility

### Adding Related Entities

If custom entities (e.g., `WorkflowInstanceData`) are created alongside workflow instances, implement `IRelatedEntityCollector<TEntity>` to collect them and `IDeletionCleanupStrategy<TEntity>` to delete them:

```csharp
public class WorkflowInstanceDataRecordCollector(WorkflowInstanceDataDbContext store)
    : IRelatedEntityCollector<WorkflowInstanceData>
{
    public async IAsyncEnumerable<ICollection<WorkflowInstanceData>> GetRelatedEntities(
        ICollection<WorkflowInstance> workflowInstances)
    {
        // Collect related entities
    }
}

public class DeleteWorkflowInstanceDataRecordStrategy(
    WorkflowInstanceDataDbContext store, ILogger<...> logger)
    : IDeletionCleanupStrategy<WorkflowInstanceData>
{
    public async Task Cleanup(ICollection<WorkflowInstanceData> collection)
    {
        // Delete related entities
    }
}
```

Register with DI:

```csharp
Services.AddScoped<IDeletionCleanupStrategy<WorkflowInstanceData>, DeleteWorkflowInstanceDataRecordStrategy>();
Services.AddScoped<IRelatedEntityCollector<WorkflowInstanceData>, WorkflowInstanceDataRecordCollector>();
```

### Custom Cleanup Strategies (e.g., Archiving)

Define a marker interface and policy for archiving instead of deleting:

```csharp
public interface IArchivingStrategy<TEntity> : ICleanupStrategy<TEntity> { }

public class ArchivingRetentionPolicy : IRetentionPolicy
{
    public string Name { get; }
    public Func<IServiceProvider, RetentionWorkflowInstanceFilter> FilterFactory { get; }
    public Type CleanupStrategy => typeof(IArchivingStrategy<>);
}
```

When implementing a custom cleanup strategy, provide `ICleanupStrategy<TEntity>` for:
- `ActivityExecutionRecord`
- `StoredBookmark`
- `WorkflowExecutionLogRecord`
- `WorkflowInstance`

---

## Related

- [[Elsa Log Persistence]] — control what activity data gets persisted before retention runs
- [[Elsa Workers]] — configure worker counts that affect how quickly retention sweeps execute
