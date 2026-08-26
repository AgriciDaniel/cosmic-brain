---
type: concept
title: "Elsa Incidents"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - incidents
  - error-handling
  - fault-tolerance
  - operate
status: developing
address: c-000074
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Workflow Activation Strategies]]"
---

# Elsa Incidents

An **incident** is an error event that occurs during workflow execution. When an activity throws an unhandled exception, the workflow runtime catches it and creates an incident record stored in the `Incidents` collection of `WorkflowExecutionContext`, which is persisted as part of the `WorkflowInstance`.

---

## Incident Strategies

Strategies determine how the workflow engine responds to incidents. The `IIncidentStrategy` interface defines a single method:

```csharp
public interface IIncidentStrategy
{
    void HandleIncident(ActivityExecutionContext context);
}
```

### Built-in Strategies

| Strategy | Behavior |
|----------|----------|
| `FaultStrategy` | Stops the workflow and marks it as **Faulted**. This is the default. |
| `ContinueWithIncidentsStrategy` | The workflow continues executing. An incident record is created for each error, but execution is not interrupted. |

---

## Configuration

### Global Default

Set the default strategy applied to all workflows without an explicit strategy:

```csharp
services.Configure<IncidentOptions>(options =>
{
    options.DefaultIncidentStrategy = typeof(ContinueWithIncidentsStrategy);
});
```

### Per-Workflow

Set the strategy on a specific workflow definition:

```csharp
public class MyWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.WorkflowOptions.IncidentStrategyType = typeof(ContinueWithIncidentsStrategy);
    }
}
```

In [[Elsa Studio Design]], the incident strategy can be configured via the workflow definition settings panel.

---

## Use Cases

- **FaultStrategy**: Production workflows where errors must be immediately visible and workflows should not proceed with corrupted state.
- **ContinueWithIncidentsStrategy**: Monitoring or data-collection workflows where partial failures are acceptable, or when you want to collect all errors before manual intervention.

> [!info]
> Incident strategies are evaluated per activity execution. A workflow with `ContinueWithIncidentsStrategy` will faithfully execute all activities, recording errors for each faulted activity without stopping the overall execution.
