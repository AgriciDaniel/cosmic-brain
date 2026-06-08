# Configuration

We can configure what the workflow engine should do in case of an incident through Incident Strategies.

## Global <a href="#global" id="global"></a>

The default strategy is `FaultStrategy`, but we can change it by setting the `IncidentStrategy` property of the `WorkflowOptions` class:

```csharp
services.Configure<IncidentOptions>(options =>
{
    options.DefaultIncidentStrategy = typeof(ContinueWithIncidentsStrategy);
});
```

The default strategy will be used for all workflows that do not have a strategy configured explicitly.

## Workflow Specific <a href="#workflow-specific" id="workflow-specific"></a>

We can configure the incident strategy for a workflow by setting the `WorkflowOptions` property of the `Workflow` class:

```csharp
public class MyWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.WorkflowOptions.IncidentStrategyType = typeof(ContinueWithIncidentsStrategy);
    }
}
```

We can also configure the incident strategy for a workflow via Elsa Studio:

<figure><img src="../../.gitbook/assets/workflow-definition-incident-settings.png" alt=""><figcaption></figcaption></figure>

