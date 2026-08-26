---
type: concept
title: Elsa Diagnostics
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - diagnostics
  - logging
status: developing
address: c-000068
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa Diagnostics

Elsa Workflows provides a diagnostics category of activities for observability, debugging, and monitoring of workflow execution. The primary diagnostic activity is **Log**, which emits structured log entries from within a workflow.

## Log Activity

The `Log` activity emits structured log entries to configurable log targets called **sinks**. It uses .NET's structured logging infrastructure with message templates.

### Properties

| Property | Description |
|----------|-------------|
| **Message** | The log message template. Supports placeholders like `Hello {Name}` using .NET message template syntax |
| **Level** | Log level: Trace, Debug, Information, Warning, Error, Critical |
| **Category** | Log category (defaults to "Process") |
| **Arguments** | Values for named or indexed placeholders in the message template |
| **Attributes** | Additional key/value pairs to include as structured log attributes |
| **SinkNames** | Target sinks to write to (appears as a checklist of available sinks in the designer) |

### Basic Usage

```csharp
new Log("Workflow started", LogLevel.Information)
```

### Structured Logging

```csharp
new Log
{
    Message = new("Order received: {OrderId}"),
    Arguments = new(new { OrderId = orderId }),
    SinkNames = new(new[] { "FileJson" })
}
```

This produces a structured log entry with the `OrderId` field extracted as a structured property.

### Log Levels

The activity supports all standard .NET log levels:
- **Trace**: Most detailed, for diagnostic purposes
- **Debug**: Debugging information
- **Information**: General operational messages
- **Warning**: Issues that don't prevent operation but deserve attention
- **Error**: Failed operations and exceptions
- **Critical**: Severe failures requiring immediate attention

## Custom Log Sinks

The logging framework is extensible through custom log sink implementations. Sinks determine where log entries are written -- files, databases, external monitoring systems, etc. Configure sinks at the application level and they appear in the Log activity's sink picker.

## Adding Execution Log Entries Programmatically

Custom activities can add execution log entries directly using the `ActivityExecutionContext`:

```csharp
context.AddExecutionLogEntry(
    "Info",
    $"Waiting for approval. Message: '{message}'");
```

These entries are persisted with the workflow instance and are visible in execution logging views.

## Use Cases

- **Audit trails**: Record workflow progression through critical steps
- **Debugging**: Insert detailed logging during workflow development
- **Monitoring**: Track business metrics through structured log attributes
- **Error tracking**: Log error details with contextual information for troubleshooting
