---
type: concept
title: Elsa Activities
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - activities
  - concepts
status: developing
address: c-000054
related:
  - "[[Elsa Blocking Activities and Triggers]]"
  - "[[Elsa Control Flow]]"
  - "[[Elsa Custom Activities]]"
  - "[[Elsa Workflow as Activity]]"
  - "[[Elsa Diagnostics]]"
  - "[[Elsa MassTransit Integration]]"
  - "[[Elsa Workflows]]"
---

# Elsa Activities

Activities are the fundamental building blocks of workflows in [[Elsa Workflows]]. Each activity represents a single executable unit of work -- anything from logging a message to sending an HTTP request to waiting for a human approval. Activities are connected together to form a workflow graph that defines business process logic.

## Common Properties

All activities in Elsa share a set of common properties that control naming, display, persistence behavior, and storage:

- **Name**: A unique identifier for the activity. Must be a valid JavaScript symbol (no spaces, dots, or hyphens) so it can be referenced by expressions in subsequent activities.
- **Display Name**: A human-readable label shown on the designer canvas. Useful for clarifying the purpose of a specific activity instance.
- **Description**: Custom description displayed in the body area of an activity on the designer. Overrides the default activity description.
- **Load Workflow Context**: Controls whether the workflow context is loaded from the provider before this activity executes. Rarely needed -- the runtime loads context automatically.
- **Save Workflow Context**: Controls whether the workflow context is persisted back to storage after this activity executes.
- **Save Workflow Instance**: Controls whether the workflow instance is persisted after this activity completes, useful for critical areas where you want to ensure persistence mid-burst.
- **Storage**: Controls where activity input and output values are persisted. Options include inline (default, stored within the workflow instance), transient (discarded after the execution burst), and blob storage. Useful when an activity handles large payloads like file downloads.

## Activity Base Classes

Elsa provides several base classes for activities:

### `Activity`

The full-featured base class. Requires calling `CompleteActivityAsync()` or `CompleteActivityWithOutcomesAsync()` explicitly:

```csharp
public class PrintMessage : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello world!");
        await context.CompleteActivityAsync();
    }
}
```

### `CodeActivity`

A simplified base class for activities that complete immediately after execution. The activity is automatically marked as complete -- no need to call `CompleteActivityAsync()`:

```csharp
public class PrintMessage : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello world!");
    }
}
```

### `Trigger`

Base class for trigger activities that can both start new workflow instances and resume suspended workflows. See [[Elsa Blocking Activities and Triggers]].

## Inputs and Outputs

Activities accept inputs and produce outputs, analogous to method parameters and return values in C#.

### Input Properties

Define input using `Input<T>` to support dynamic expressions or literal values:

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

The `InputAttribute` provides metadata for the designer:

```csharp
[Input(
    DisplayName = "Message",
    Description = "The message to print.",
    Category = "Settings"
)]
public Input<string> Message { get; set; } = default!;
```

### Output Properties

Define output using `Output<T>`:

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

Output values can be consumed in two ways:
1. **Capture via variable**: Bind the output to a workflow variable
2. **Direct access**: Access via `context.GetOutput("ActivityName", "Result")`

Activity output is **transient** -- it exists only for the current execution burst. For persistent access, capture outputs in workflow variables.

## Outcomes

Activities declare outcomes that determine which outbound connections are followed after completion. Use the `[FlowNode]` attribute to declare custom outcomes:

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

Common built-in outcomes include `Done` (single default outcome), `True`/`False` (for decision activities), and custom domain-specific outcomes like `Approved`/`Rejected`.

## Activity Lifecycle

An activity progresses through these stages during execution:

1. **Scheduled**: The activity is queued for execution by a parent activity or the workflow runtime
2. **Executing**: `ExecuteAsync` is called with the `ActivityExecutionContext`
3. **Completed**: The activity calls `CompleteActivityAsync()` or `CompleteActivityWithOutcomesAsync()`
4. **Bookmarked (optional)**: Blocking activities create bookmarks and enter a suspended state instead of completing. See [[Elsa Blocking Activities and Triggers]].
5. **Resumed (for bookmarked activities)**: External code triggers resume via `IWorkflowResumer`

## Metadata

The `ActivityAttribute` provides display information for the designer:

```csharp
[Activity("MyCompany", "MyPlatform/MyFunctions", "Print a message to the console")]
public class PrintMessage : CodeActivity { }
```

The first parameter is the namespace, the second is the category (supports nested categories with `/`), and the third is the description.

## Registration

Activities must be registered before they can be used in workflows:

```csharp
builder.Services.AddElsa(elsa =>
{
    // Register individual activities
    elsa.AddActivity<PrintMessage>();

    // Or scan an entire assembly
    elsa.AddActivitiesFrom<Program>();
});
```

## Dependency Injection

Activities access services through the `ActivityExecutionContext` rather than constructor injection, which simplifies activity instantiation:

```csharp
protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    var weatherApi = context.GetRequiredService<IWeatherApi>();
    var forecast = await weatherApi.GetWeatherAsync(city);
    Forecast.Set(context, forecast);
}
```

Use `GetService<T>()` for optional services (returns null if not registered) and `GetRequiredService<T>()` for required services.

## Composite Activities

Composite activities compose other activities into a single unit. The built-in `If` activity demonstrates this pattern:

```csharp
public class If : Activity
{
    public Input<bool> Condition { get; set; } = default!;
    public IActivity? Then { get; set; }
    public IActivity? Else { get; set; }

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var result = context.Get(Condition);
        var nextActivity = result ? Then : Else;
        await context.ScheduleActivityAsync(nextActivity, OnChildCompleted);
    }

    private async ValueTask OnChildCompleted(ActivityCompletedContext context)
    {
        await context.CompleteActivityAsync();
    }
}
```

## Activity Categories

Built-in activities are organized into categories:
- **Control Flow**: Sequence, Flowchart, If, Switch, Fork, Join, ForEach, While
- **Data**: SetVariable, ReadLine, WriteLine
- **HTTP**: SendHttpRequest, HttpEndpoint
- **Diagnostics**: Log
- **Timers**: Delay, Timer
- **Workflows**: Usable as activity (composed workflows)
- **Messaging**: MassTransit publish/receive activities
