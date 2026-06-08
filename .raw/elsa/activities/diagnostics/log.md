---
description: Emits log entries to a configurable set of log targets called sinks
---

# Log

Workflow designers can drop a **Log** activity onto the canvas to emit structured log entries from a workflow.

\
The `Message` input supports [message templates](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging#log-message-template), allowing placeholders such as `Hello {Name}` to be replaced with runtime values provided through the **Arguments** input.

The activity exposes the following properties:

* **Message**: The log message template to emit.
* **Level**: The log level (Trace, Debug, Information, Warning, Error, Critical).
* **Category**: The log category (defaults to "Process").
* **Arguments**: Values for named or indexed placeholders in the message template.
* **Attributes**: Additional key/value pairs to include as attributes.
* **SinkNames**: Target sinks to write to (appears as a check list of available sinks).

When the application exposes multiple sinks, they appear in the **Sinks** picker so the workflow author can choose one or more destinations for the log entry.

Example usage in a workflow:

```csharp
new Log("Workflow started", LogLevel.Information)
```

You can also specify sinks and attributes:

```csharp
new Log
{
    Message = new("Order received: {OrderId}"),
    Arguments = new(new { OrderId = orderId }),
    SinkNames = new(new[] { "FileJson" })
}
```

## Custom Log Sinks

The Logging Framework is designed to be extended with custom Log Sink configurations and implementations. To learn more, see [Logging Framework](../../features/logging-framework.md).
