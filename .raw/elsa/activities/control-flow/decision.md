# Decision

The **Decision** activity models a decision that yields a `true` or a `false` outcome, and is analogous to C#'s `if` statement.

## Inputs

| Name        | Type          | Description                                     |
| ----------- | ------------- | ----------------------------------------------- |
| `Condition` | `Input<bool>` | An expression that evaluates to a boolean value |

## Outcomes

| Name  | Description                                       |
| ----- | ------------------------------------------------- |
| True  | Triggered when the condition evaluates to `true`  |
| False | Triggered when the condition evaluates to `false` |

## Usage

The following workflow shows an example of how the `Decision` activity can be used inside a `Flowchart` activity.

{% code fullWidth="false" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Activities.Flowchart.Activities;
using Elsa.Workflows.Contracts;
using Endpoint = Elsa.Workflows.Activities.Flowchart.Models.Endpoint;

namespace ElsaServer.Workflows;

public class FlowDecisionWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Name = "Flow Decision Workflow";

        var age = builder.WithVariable<int>();
        var promptWriteLine = new WriteLine("What is your age?");
        var readLine = new ReadLine(age);
        var isAdult = new FlowDecision(context => age.Get(context) >= 18);
        var adult = new WriteLine("You are an adult.");
        var minor = new WriteLine("You are a minor.");
        var finish = new Finish();

        builder.Root = new Flowchart
        {
            Activities =
            {
                promptWriteLine,
                readLine,
                isAdult,
                adult,
                minor,
                finish
            },
            Connections =
            {
                new(promptWriteLine, readLine),
                new(readLine, isAdult),
                new(new Endpoint(isAdult, "True"), new Endpoint(adult)),
                new(new Endpoint(isAdult, "False"), new Endpoint(minor)),
                new(new Endpoint(adult), new Endpoint(finish)),
                new(new Endpoint(minor), new Endpoint(finish))
            }
        };
    }
}
```
{% endcode %}

