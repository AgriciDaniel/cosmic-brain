# Using a Trigger

Another way to run a workflow is through a trigger.

A trigger is represented by an activity, which provides trigger details to services external to the workflow that are ultimately responsible for triggering the workflow.

Elsa ships with various triggers out of the box, such as:

* HTTP Endpoint: triggers the workflow when a given HTTP request is sent to the workflow server.
* Timer: triggers the workflow each given interval based on a TimeSpan expression.
* Cron: triggers the workflow each given interval based on a CRON expression.
* Event: triggers when a given event is received by the workflow server.

We will use the HTTP Endpoint trigger as an example.

## Using Code

The following code listing demonstrates a simple workflow using an HTTP Endpoint as its trigger.

{% code title="HelloWorldHttpWorkflow.cs" %}
```csharp
using System.Net;
using Elsa.Http;
using Elsa.Workflows;
using Elsa.Workflows.Activities;

namespace Elsa.Samples.AspNet.HelloWorld;

public class HelloWorldHttpWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new HttpEndpoint
                {
                    Path = new("/hello-world"),
                    SupportedMethods = new([HttpMethods.Get]),
                    CanStartWorkflow = true
                },
                new WriteHttpResponse
                {
                    StatusCode = new(HttpStatusCode.OK),
                    Content = new("Hello world!")
                }
            }
        };
    }
}
```
{% endcode %}

## Using Elsa Studio

Follow this guide to see step-by-step how to create a simple HTTP workflow using the HTTP Endpoint trigger.

{% embed url="https://dubble.so/guides/http-trigger-zuc6xtxdvoo49omo5oly" %}

