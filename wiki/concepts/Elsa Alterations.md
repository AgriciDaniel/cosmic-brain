---
type: concept
title: "Elsa Alterations"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - alterations
  - workflow-instance
  - runtime
  - extensibility
status: developing
address: c-000055
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Instance Variables]]"
  - "[[Elsa Architecture]]"
---

# Elsa Alterations

An **alteration** represents a change applied to a workflow instance at runtime. Alterations modify workflow instance state, schedule activities, or migrate instances without requiring workflow restarts.

---

## Built-in Alteration Types

| Type | Description |
|------|-------------|
| **ModifyVariable** | Changes the value of a workflow variable |
| **Migrate** | Migrates a workflow instance to a new workflow definition version |
| **ScheduleActivity** | Schedules an activity for execution on the workflow instance |
| **CancelActivity** | Cancels a running activity (Delay, Event, MessageReceived, etc.) |

---

## Alteration Plans

An **alteration plan** collects multiple alterations targeted at one or more workflow instances.

### Creating a Plan

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

### Submitting a Plan (Async)

Use `IAlterationPlanScheduler` to submit for background execution:

```csharp
var scheduler = serviceProvider.GetRequiredService<IAlterationPlanScheduler>();
var planId = await scheduler.SubmitAsync(plan, cancellationToken);
```

When submitted, an **alteration job** is created for each target workflow instance. Monitor execution via `IAlterationPlanStore` and `IAlterationJobStore`:

```csharp
var store = serviceProvider.GetRequiredService<IAlterationPlanStore>();
var plan = await store.FindAsync(new AlterationPlanFilter { Id = planId }, cancellationToken);

var jobStore = serviceProvider.GetRequiredService<IAlterationJobStore>();
var jobs = (await jobStore.FindManyAsync(
    new AlterationJobFilter { PlanId = planId }, cancellationToken)).ToList();
```

### REST API for Plans

Submit a plan:

```http
POST /alterations/submit HTTP/1.1
Content-Type: application/json

{
  "alterations": [
    { "type": "ModifyVariable", "variableId": "...", "value": "Hello world!" },
    { "type": "Migrate", "targetVersion": 9 },
    { "type": "ScheduleActivity", "activityId": "..." }
  ],
  "workflowInstanceIds": ["88ce68d00e824c78a53af04f16d276ea"]
}
```

Response: `{ "planId": "6cdc459867a94027a6f237417acf398f" }`

Query plan status:

```http
GET /elsa/api/alterations/{planId}
```

---

## Immediate Alterations

Apply alterations synchronously without creating a plan:

```csharp
var alterations = new List<IAlteration>
{
    new ModifyVariable("MyVariable", "MyValue")
};

var runner = serviceProvider.GetRequiredService<IAlterationRunner>();
var results = await runner.RunAsync(plan, cancellationToken);

// Dispatch altered instances to resume execution
var dispatcher = serviceProvider.GetRequiredService<IAlteredWorkflowDispatcher>();
await dispatcher.DispatchAsync(results, cancellationToken);
```

### REST API for Immediate Execution

```http
POST /alterations/run HTTP/1.1
Content-Type: application/json

{
  "alterations": [
    { "type": "ModifyVariable", "variableId": "...", "value": "Hello world!" }
  ],
  "workflowInstanceIds": ["88ce68d00e824c78a53af04f16d276ea"]
}
```

Response includes per-instance execution logs and success status.

---

## Extensibility

Create custom alteration types by implementing `IAlteration` and `IAlterationHandler`:

```csharp
public class MyAlteration : IAlteration
{
    public string Message { get; set; }
}

public class MyAlterationHandler : AlterationHandlerBase<MyAlteration>
{
    public override async ValueTask HandleAsync(
        AlterationHandlerContext<MyAlteration> context,
        CancellationToken cancellationToken = default)
    {
        context.WorkflowExecutionContext.Output.Add("Message", context.Alteration.Message);
    }
}
```

Register with the service collection:

```csharp
services.AddElsa(elsa =>
{
    elsa.UseAlterations(alterations =>
    {
        alterations.AddAlteration<MyAlteration, MyAlterationHandler>();
    });
});
```

---

## Use Cases

- **Correcting data**: Fix a variable value in a running order-processing workflow
- **Version migration**: Move a long-running instance to use a newer workflow definition
- **Manual intervention**: Schedule or cancel activities in stuck workflows
- **Bulk operations**: Apply the same change across hundreds of workflow instances

See also [[Elsa Workflow Instance Variables]] for programmatic variable manipulation without alterations.
