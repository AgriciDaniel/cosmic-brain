---
description: >-
  This page explains how to create custom trigger-based activities by reusing
  built-in base classes like `EventBase`, `TimerBase`, and `HttpEndpointBase`.
  It provides examples and guidance.
---

# Reusable Triggers (3.5-preview)

Elsa Workflows provides a streamlined way to create custom activities that leverage existing trigger infrastructure. This enables developers to build their own trigger-based activities—such as timers, delays, events, and HTTP endpoints—without dealing with low-level scheduling, event wiring, or infrastructure concerns.

### Overview

New base classes introduced in Elsa make it easier to implement common types of trigger-based behavior in a clean and maintainable way. These base classes encapsulate common logic, allowing your custom activities to focus on their specific behavior:

* `EventBase<T>` – for custom event-driven activities.
* `TimerBase` – for interval-based triggers.
* `HttpEndpointBase` – for HTTP-triggered activities.
* `Activity.DelayFor(...)` – schedules delayed execution from within any custom activity.

These abstractions are ideal for implementing activities similar to `Delay`, `Timer`, `Event`, or `HttpEndpoint`, but tailored to specific domain or workflow requirements.

***

### Base Classes for Reusable Triggers

#### `EventBase<T>`

Used to implement activities that respond to named events. The base class manages event subscription and resumption automatically.

**Example**

```csharp
public class CustomEvent : EventBase<object>
{
    protected override string GetEventName(ExpressionExecutionContext context)
    {
        return "MyEvent"; // Name of the event this activity listens to.
    }
    
    protected override void OnEventReceived(ActivityExecutionContext context, object? eventData)
    {
        Console.WriteLine("Event received with data: " + eventData);
    }
}
```

Use this pattern to handle domain-specific or external system events in a workflow.

***

#### `TimerBase`

Provides a simple way to define recurring activities based on a time interval.

**Example**

```csharp
public class CustomTimer : TimerBase
{
    protected override TimeSpan GetInterval(ExpressionExecutionContext context)
    {
        return TimeSpan.FromSeconds(5); // Runs every 5 seconds.
    }

    protected override void OnTimerElapsed(ActivityExecutionContext context)
    {
        Console.WriteLine("Timer elapsed");
    }
}
```

Useful for heartbeat-style logic or periodic polling scenarios.

***

#### `HttpEndpointBase`

Allows you to define HTTP endpoints that act as workflow triggers without manual routing or middleware setup.

**Example**

```csharp
public class CustomHttpEndpoint : HttpEndpointBase
{
    protected override HttpEndpointOptions GetOptions()
    {
        return new()
        {
            Path = "my-path",
            Methods = [HttpMethods.Get]
        };
    }

    protected override async ValueTask OnHttpRequestReceivedAsync(ActivityExecutionContext context, HttpContext httpContext)
    {
        httpContext.Response.StatusCode = 200;
        await httpContext.Response.WriteAsync("Hello World", context.CancellationToken);
    }
}
```

Ideal for building custom webhook or API-triggered workflows.

***

### Scheduling Delayed Execution with `DelayFor`

Any custom activity can now schedule delayed continuation using `context.DelayFor(...)`. This avoids the need for manually creating timer logic or separate trigger activities.

**Example**

```csharp
public class CustomDelay : Activity
{
    protected override ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        context.DelayFor(TimeSpan.FromSeconds(5), OnDelayElapsedAsync);
        return default;
    }

    private async ValueTask OnDelayElapsedAsync(ActivityExecutionContext context)
    {
        Console.WriteLine("Delay elapsed");
        await context.CompleteActivityAsync();
    }
}
```

This approach is useful when delay logic is part of a larger activity's behavior.

***

### Summary

These reusable base classes and helper methods provide a consistent, composable way to implement trigger-based activities in Elsa:

* **Reusability**: Leverage prebuilt infrastructure.
* **Simplicity**: Avoid boilerplate code for scheduling and triggering.
* **Consistency**: Aligns with Elsa's activity and workflow execution model.

Use these tools to build rich, event-driven workflows with minimal overhead, while keeping full control over the activity logic.

