# Dispatch Workflow Activity

The **Dispatch Workflow** activity can start a new workflow from the current workflow.

It allows you to specify what workflow to run and provide any input required by the workflow.

Let's try it out.

## Using Code

The following code listings show two workflows:

1. The parent workflow
2. The child workflow to dispatch

{% code title="ParentWorkflow.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Runtime.Activities;

public class ParentWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var childOutput = builder.WithVariable<IDictionary<string, object>>();

        builder.Root = new Sequence
        {
            Activities =
            {
                new DispatchWorkflow
                {
                    WorkflowDefinitionId = new(nameof(ChildWorkflow)),
                    Input = new(new Dictionary<string, object>
                    {
                        ["ParentMessage"] = "Hello from parent!"
                    }),
                    WaitForCompletion = new(true),
                    Result = new(childOutput)
                },
                new WriteLine(context => $"Child finished executing and said: {childOutput.Get(context)!["ChildMessage"]}")
            }
        };
    }
}
```
{% endcode %}

{% code title="ChildWorkflow.cs" %}
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Management.Activities.SetOutput;

namespace Elsa.Samples.AspNet.ChildWorkflows.Workflows;

public class ChildWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine(context => $"Input from parent: \"{context.GetInput<string>("ParentMessage")}\"."),
                new SetOutput
                {
                    OutputName = new("ChildMessage"),
                    OutputValue = new("Hello from child!")
                }
            }
        };
    }
}
```
{% endcode %}

## Using Elsa Studio

The following recorded guides demonstrate how to create a child workflow and a parent workflow that then dispatches the child workflow for execution.

{% embed url="https://dubble.so/guides/dispatch-workflow-activity-xxljimpuovpqqlmuyrg6" %}
