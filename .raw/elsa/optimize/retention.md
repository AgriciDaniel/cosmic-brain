---
description: >-
  This section explains the Retention feature and how it can be used to remove
  completed workflow instances automatically.
---

# Retention

## Configuration <a href="#configuration" id="configuration"></a>

To get started with the retention module, you must enable the retention feature.

```csharp
elsa.UseRetention(r =>
{
    r.SweepInterval = TimeSpan.FromMinutes(30);
    r.AddDeletePolicy("Delete all finished workflows", _ => new RetentionWorkflowInstanceFilter()
    {
        WorkflowStatus = WorkflowStatus.Finished
    });
});
```

The `SweepInterval` determines how often the retention feature will check for workflows that match any of the configured policies. By default, the retention module provides an `AddDeletePolicy` method, which deletes workflow instances that match the given `RetentionWorkflowInstanceFilter`.&#x20;

Note that the policy takes a function that returns a `RetentionWorkflowInstanceFilter`.&#x20;

This function is called during every `SweepInterval`.

## Example <a href="#example" id="example"></a>

Delete a workflow if it has been `Finished` for over an hour:

```csharp
elsa.UseRetention(r =>
{
    r.SweepInterval = TimeSpan.FromSeconds(30);
    r.AddDeletePolicy("Delete all finished workflows", sp =>
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

In this example, we use Elsa's provided `ISystemClock` to access the current time and filter workflow instances that finished more than an hour ago. Since the filter is re-created during each `SweepInterval`, we can use `clock.UtcNow` to calculate the threshold dynamically.

## Extending <a href="#extending" id="extending"></a>

The retention module allows for easy extension to add new types of policies or to include additional entities in the existing policies.

### Extra Entities <a href="#extra-entities" id="extra-entities"></a>

Let's say you have custom `WorkflowInstanceData` created with every workflow instance that also needs to be removed.

#### **Entity Collector**

First, define an `IRelatedEntityCollector<TEntity>` that, given a set of workflow instances, returns the related `WorkflowInstanceData` records.

```csharp
public class WorkflowInstanceDataRecordCollector(WorkflowInstanceDataDbContext store) : IRelatedEntityCollector<WorkflowInstanceData>
{
    public async IAsyncEnumerable<ICollection<WorkflowInstanceData>> GetRelatedEntities(ICollection<WorkflowInstance> workflowInstances)
    {
        // TODO: Get WorkflowInstanceData for the given workflowInstances
    }
}
```

#### **Cleanup Strategy**

Next, define a cleanup strategy for each policy you wish to support. In this example, we’ll implement a strategy to delete `WorkflowInstanceData` records.

```csharp
public class DeleteWorkflowInstanceDataRecordStrategy(WorkflowInstanceDataDbContext store, ILogger<DeleteWorkflowInstanceDataRecordStrategy> logger) : IDeletionCleanupStrategy<WorkflowInstanceData>
{
    public async Task Cleanup(ICollection<WorkflowInstanceData> collection)
    {
        // TODO: Delete WorkflowInstanceData
    }
}
```

#### **Register Dependencies**

Finally, register the `DeleteWorkflowInstanceDataRecordStrategy` and `WorkflowInstanceDataRecordCollector` in the dependency container:

```csharp
Services.AddScoped<IDeletionCleanupStrategy<WorkflowInstanceData>, DeleteWorkflowInstanceDataRecordStrategy>();
Services.AddScoped<IRelatedEntityCollector<WorkflowInstanceData>, WorkflowInstanceDataRecordCollector>();
```

### Different Cleanup Strategies <a href="#different-cleanup-strategies" id="different-cleanup-strategies"></a>

Another way to extend the retention feature is by using different cleanup strategies. For example, you could archive workflow instances to a different storage provider.

#### **Defining a Marker Interface**

First, create a marker interface for the archiving cleanup strategy:

```csharp
public interface IArchivingStrategy<TEntity> : ICleanupStrategy<TEntity>
{
}
```

#### **Defining the Policy**

Next, define a policy

```csharp
/// <summary>
/// A policy that archives the workflow instance and its related entities.
/// </summary>
public class ArchivingRetentionPolicy(string name, Func<IServiceProvider, RetentionWorkflowInstanceFilter> filter) : IRetentionPolicy
{
    public string Name { get; } = name;
    public Func<IServiceProvider, RetentionWorkflowInstanceFilter> FilterFactory { get; } = filter;

    public Type CleanupStrategy => typeof(IArchivingStrategy<>);
}
```

**Note:** In the `CleanupStrategy` property, we specify our marker interface (`IArchivingStrategy`). This allows the retention module to scan for all implementations of `IArchivingStrategy` when executing the `ArchivingRetentionPolicy`.

#### **Implementing the Strategy**

Next, implement the `IArchivingStrategy` for each entity that needs to be archived. The implementation is similar to the `CleanupStrategy` in the extra entities example, but instead of deleting the entities, you can move them to a different storage provider.

When implementing a new policy, ensure that you provide an `ICleanupStrategy<TEntity>` for the following entities:

* `ActivityExecutionRecord`
* `StoredBookmark`
* `WorkflowExecutionLogRecord`
* `WorkflowInstance`
