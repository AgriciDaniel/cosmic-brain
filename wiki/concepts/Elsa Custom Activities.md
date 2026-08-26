---
type: concept
title: Elsa Custom Activities
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - extensibility
  - custom-activities
  - activity-providers
status: developing
address: c-000065
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Blocking Activities and Triggers]]"
  - "[[Elsa Workflows]]"
---

# Elsa Custom Activities

Custom activities are the primary extensibility point in [[Elsa Workflows]]. They encapsulate domain-specific business logic, integrate with external systems, and create reusable workflow building blocks.

## Activity Base Classes

Elsa provides four base classes for different use cases:

| Base Class | Auto-Completes | Use Case |
|-----------|---------------|----------|
| `Activity` | No | Full control, blocking activities, composite activities |
| `CodeActivity` | Yes | Simple operations that complete synchronously |
| `Trigger` | No | Activities that start and/or resume workflows |
| `Activity<T>` | No | Generic activities with typed configuration |

## Input and Output

### Input Properties

Use `Input<T>` to support dynamic expressions:

```csharp
public class PrintMessage : CodeActivity
{
    public Input<string> Message { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var message = Message.Get(context);
        Console.WriteLine(message);
    }
}
```

### Output Properties

Use `Output<T>` to expose results:

```csharp
public class GenerateRandomNumber : CodeActivity
{
    public Output<int> Result { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var randomNumber = Random.Shared.Next(1, 100);
        Result.Set(context, randomNumber);
    }
}
```

### Multiple Outputs

```csharp
[Activity("MyCompany", "Math", "Divide two numbers")]
public class Divide : CodeActivity
{
    [Input(Description = "The dividend")]
    public Input<decimal> Dividend { get; set; } = default!;

    [Input(Description = "The divisor")]
    public Input<decimal> Divisor { get; set; } = default!;

    [Output(Description = "The quotient")]
    public Output<decimal> Quotient { get; set; } = default!;

    [Output(Description = "The remainder")]
    public Output<decimal> Remainder { get; set; } = default!;

    [Output(Description = "Whether the division was successful")]
    public Output<bool> Success { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var dividend = Dividend.Get(context);
        var divisor = Divisor.Get(context);

        if (divisor == 0)
        {
            Success.Set(context, false);
            return;
        }

        Quotient.Set(context, dividend / divisor);
        Remainder.Set(context, dividend % divisor);
        Success.Set(context, true);
    }
}
```

## UI Hints

UI hints control how input properties are displayed in Elsa Studio:

```csharp
[Input(
    Description = "Enable debug mode",
    UIHint = InputUIHints.Checkbox
)]
public Input<bool> DebugMode { get; set; } = default!;

[Input(
    Description = "Select environment",
    Options = new[] { "Development", "Staging", "Production" },
    DefaultValue = "Development",
    UIHint = InputUIHints.DropDown
)]
public Input<string> Environment { get; set; } = default!;
```

### Available UI Hints

| UI Hint | Control Type |
|---------|-------------|
| `SingleLine` | Single-line text input |
| `MultiLine` | Multi-line text area |
| `Checkbox` | Boolean checkbox |
| `CheckList` | Multiple selection checklist |
| `RadioList` | Single selection radio buttons |
| `DropDown` | Dropdown select list |
| `CodeEditor` | Code editor with syntax highlighting |
| `JsonEditor` | JSON editor with validation |
| `DateTimePicker` | Date and time picker |
| `VariablePicker` | Select from workflow variables |
| `OutputPicker` | Select from activity outputs |
| `OutcomePicker` | Select from activity outcomes |
| `TypePicker` | Select a .NET type |
| `WorkflowDefinitionPicker` | Select a workflow definition |

## Custom Outcomes

Declare multiple execution paths using `[FlowNode]`:

```csharp
[FlowNode("Pass", "Fail")]
public class PerformTask : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        await context.CompleteActivityWithOutcomesAsync("Pass");
    }
}
```

## Dependency Injection

Activities access DI services through the context rather than constructor injection:

```csharp
protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    var logger = context.GetRequiredService<ILogger<ProcessOrder>>();
    var orderService = context.GetRequiredService<IOrderService>();
    // ...
}
```

Use `GetRequiredService<T>()` for mandatory services, `GetService<T>()` for optional ones.

## Activity Registration

### Individual Registration

```csharp
elsa.AddActivity<PrintMessage>();
elsa.AddActivity<GenerateRandomNumber>();
```

### Assembly Scanning

```csharp
// Register all IActivity implementations from an assembly
elsa.AddActivitiesFrom<Program>();
```

### Verify Registration

```csharp
[HttpGet("activities")]
public async Task<IActionResult> GetActivities()
{
    var descriptors = await activityRegistry.ListAsync();
    return Ok(descriptors.Select(d => new { d.TypeName, d.Name, d.DisplayName }));
}
```

## Activity Providers

Activity providers enable **dynamic, runtime-generated activities** -- activities that aren't defined as .NET types but are generated from external sources like APIs, databases, or configuration.

### Creating a Provider

Implement `IActivityProvider` and return `ActivityDescriptor` objects:

```csharp
public class ProductActivityProvider : IActivityProvider
{
    public async ValueTask<IEnumerable<ActivityDescriptor>> GetDescriptorsAsync(...)
    {
        return new[]
        {
            new ActivityDescriptor
            {
                TypeName = "MyCompany.OrderLaptop",
                Name = "OrderLaptop",
                DisplayName = "Order Laptop",
                Category = "Orders/Electronics",
                Constructor = context =>
                {
                    var activity = _activityFactory.Create<PrintMessage>(context);
                    activity.Message = new("Ordering Laptop...");
                    activity.Type = "MyCompany.OrderLaptop";
                    return activity;
                }
            }
        };
    }
}
```

### Use Cases

- **API Integration**: Generate activities from OpenAPI/Swagger specs
- **Database-Driven**: Load activity definitions from a database
- **Plugin Systems**: Load activities from external assemblies dynamically
- **Multi-Tenancy**: Provide different activities for different tenants

### Registration

```csharp
elsa.AddActivityProvider<ProductActivityProvider>();
```

### Limitations

Dynamically provided activities are currently **not supported in programmatic C# workflows** -- they only work in Elsa Studio or JSON workflow definitions. See [GitHub issue #5162](https://github.com/elsa-workflows/elsa-core/issues/5162).

## Reusable Triggers (v3.5 Preview)

Elsa 3.5 introduces base classes for common trigger patterns:

### `EventBase<T>`

For event-driven activities:

```csharp
public class CustomEvent : EventBase<object>
{
    protected override string GetEventName(ExpressionExecutionContext context)
        => "MyEvent";

    protected override void OnEventReceived(ActivityExecutionContext context, object? eventData)
        => Console.WriteLine("Event received: " + eventData);
}
```

### `TimerBase`

For interval-based triggers:

```csharp
public class CustomTimer : TimerBase
{
    protected override TimeSpan GetInterval(ExpressionExecutionContext context)
        => TimeSpan.FromSeconds(5);

    protected override void OnTimerElapsed(ActivityExecutionContext context)
        => Console.WriteLine("Timer elapsed");
}
```

### `HttpEndpointBase`

For HTTP-triggered activities:

```csharp
public class CustomHttpEndpoint : HttpEndpointBase
{
    protected override HttpEndpointOptions GetOptions()
        => new() { Path = "my-path", Methods = [HttpMethods.Get] };

    protected override async ValueTask OnHttpRequestReceivedAsync(
        ActivityExecutionContext context, HttpContext httpContext)
    {
        httpContext.Response.StatusCode = 200;
        await httpContext.Response.WriteAsync("Hello World");
    }
}
```

### `DelayFor`

Schedule delayed execution from any activity:

```csharp
protected override ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    context.DelayFor(TimeSpan.FromSeconds(5), OnDelayElapsedAsync);
    return default;
}
```

These abstractions eliminate boilerplate for scheduling, event subscription, and HTTP routing.
