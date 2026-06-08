# Alteration Plans

An alteration plan represents a collection of alterations that can be applied to a workflow instance or a set of workflow instances.

### Creating Alteration Plans <a href="#creating-alteration-plans" id="creating-alteration-plans"></a>

To create an alteration plan, create a new instance of the `NewAlterationPlan` class. For example:

```csharp
var plan = new NewAlterationPlan
{
    Alterations = new List<IAlteration>
    {
        new ModifyVariable("MyVariable", "MyValue")
    },
    WorkflowInstanceIds = new[] { "26cf02e60d4a4be7b99a8588b7ac3bb9" } 
};
```

### Submitting Alteration Plans <a href="#submitting-alteration-plans" id="submitting-alteration-plans"></a>

To submit an alteration plan, use the `IAlterationPlanScheduler` service. For example:

```csharp
var scheduler = serviceProvider.GetRequiredService<IAlterationPlanScheduler>();
var planId = await scheduler.SubmitAsync(plan, cancellationToken);
```

When a plan is submitted, an **alteration job** is created for each workflow instance, to which each alteration will be applied.

Alteration plans are executed asynchronously in the background. To monitor the execution of an alteration plan, use the `IAlterationPlanStore` service. For example:

```csharp
var store = serviceProvider.GetRequiredService<IAlterationPlanStore>();
var plan = await _alterationPlanStore.FindAsync(new AlterationPlanFilter { Id = planId }, cancellationToken);
```

To get the alteration jobs that were created as part of the plan, use the `IAlterationJobStore` service. For example:

```csharp
var store = serviceProvider.GetRequiredService<IAlterationJobStore>();
var jobs = (await _alterationJobStore.FindManyAsync(new AlterationJobFilter { PlanId = planId }, cancellationToken)).ToList();
```
