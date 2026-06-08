# REST API

The Alterations module exposes a REST API for managing alteration plans. For example, to submit a plan that modifies a variable, migrates the workflow instance to a new version and to schedule an activity, use the following request:

```http
POST /alterations/submit HTTP/1.1
Host: localhost:5001

{
    "alterations": [
        {
            "type": "ModifyVariable",
            "variableId": "83fde420b5794bc39a0a7db725405511",
            "value": "Hello world!"
        },
        {
            "type": "Migrate",
            "targetVersion": 9
        },
        {
            "type": "ScheduleActivity",
            "activityId": "mY1rb4GRjkW3urm8dcNSog"
        }
    ],
    "workflowInstanceIds": [
        "88ce68d00e824c78a53af04f16d276ea"
    ]
}
```

The response wil include the Plan ID:

```json
{
  "planId": "6cdc459867a94027a6f237417acf398f"
}
```

You can use the Plan ID to query the status of the plan:

```bash
GET /elsa/api/alterations/6cdc459867a94027a6f237417acf398f HTTP/1.1
Host: localhost:5001
```

The response will include the plan's status:

```json
{
  "plan": {
    "alterations": [
      {
        "type": "ModifyVariable",
        "variableId": "9b4cecbe82204102813ee968d517bc8a",
        "value": "Hello world!"
      },
      {
        "type": "ScheduleActivity",
        "activityId": "BK2-RkUrgkmMj3RIkKfh9g"
      }
    ],
    "workflowInstanceIds": [
      "5d87afa152e54f88ac22e5d69ead6b69"
    ],
    "status": 2,
    "createdAt": "2023-10-04T22:34:31.28188+00:00",
    "completedAt": "2023-10-04T22:34:31.44371+00:00",
    "id": "6cdc459867a94027a6f237417acf398f"
  },
  "jobs": [
    {
      "planId": "6cdc459867a94027a6f237417acf398f",
      "workflowInstanceId": "5d87afa152e54f88ac22e5d69ead6b69",
      "status": 2,
      "log": [
        {
          "message": "ModifyVariable succeeded",
          "logLevel": 2,
          "timestamp": "2023-10-04T22:34:31.407518+00:00"
        },
        {
          "message": "ScheduleActivity succeeded",
          "logLevel": 2,
          "timestamp": "2023-10-04T22:34:31.415783+00:00"
        }
      ],
      "createdAt": "2023-10-04T22:34:31.28188+00:00",
      "completedAt": "2023-10-04T22:34:31.426614+00:00",
      "id": "92062c77cbcd419a87ac621886e5f60a"
    }
  ]
}
```

## Immediate Alterations <a href="#immediate-alterations" id="immediate-alterations"></a>

Instead of submitting alteration plans for asynchronous execution, you can apply alterations immediately using the `IAlterationRunner` service. For example:

```csharp
var alterations = new List<IAlteration>
{
    new ModifyVariable("MyVariable", "MyValue")
},

var workflowInstanceIds = new[] { "26cf02e60d4a4be7b99a8588b7ac3bb9" };
var runner = serviceProvider.GetRequiredService<IAlterationRunner>();
var results = await runner.RunAsync(plan, cancellationToken);
```

When an alteration plan is executed immediately, the alterations are applied synchronously and the results are returned. You will have to manually schedule affected workflow instances to resume execution. Use the `IAlteredWorkflowDispatcher`:

```
var dispatcher = serviceProvider.GetRequiredService<IAlteredWorkflowDispatcher>();
await dispatcher.DispatchAsync(results, cancellationToken);
```

This will tell the workflow engine to pickup the altered workflow instances and execute them.

## Extensibility <a href="#extensibility" id="extensibility"></a>

Elsa Workflows supports custom alteration types, allowing developers to define their own types and utilise them as alterations.

To define a custom alteration type, implement the `IAlteration` interface.

```csharp
public interface IAlteration
{
}
```

Next, implement an **alteration handler** that handles the alteration type.

```csharp
public interface IAlterationHandler where T : IAlteration
{
    bool CanHandle(IAlteration alteration);
    ValueTask HandleAsync(AlterationHandlerContext context);
}
```

Or, derive from the `AlterationHandlerBase<T>` base class to simplify the implementation.

Finally, register the alteration handler with the service collection.

```csharp
services.AddElsa(elsa => 
{
    elsa.UseAlterations(alterations => 
    {
        alterations.AddAlteration<MyAlteration, MyAlterationHandler>();
    })
});
```

### Example <a href="#example" id="example"></a>

The following example demonstrates how to define a custom alteration type and handler.

```csharp
public class MyAlteration : IAlteration
{
    public string Message { get; set; }
}

public class MyAlterationHandler : AlterationHandlerBase<MyAlteration>
{
    public override async ValueTask HandleAsync(AlterationHandlerContext<MyAlteration> context, CancellationToken cancellationToken = default)
    {
        context.WorkflowExecutionContext.Output.Add("Message", context.Alteration.Message);
    }
}
```
