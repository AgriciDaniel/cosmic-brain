---
type: concept
title: "Elsa Logging Framework"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - logging
  - framework
  - sinks
  - extensibility
status: developing
address: c-000077
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Log Persistence]]"
  - "[[Elsa Architecture]]"
---

# Elsa Logging Framework

The **Elsa.Logging** module provides a flexible system for capturing, structuring, and routing log entries from workflow execution to various destinations (sinks). It supports programmatic and configuration-based setup, message templates, per-sink filtering, and custom sink factories.

---

## Programmatic Configuration

Configure logging sinks directly in code:

```csharp
// Console sink via built-in .NET provider
var consoleLogger = LoggerFactory.Create(lb =>
{
    lb.ClearProviders();
    lb.AddConsole();
    lb.AddFilter("Demo", LogLevel.Debug);
    lb.SetMinimumLevel(LogLevel.Information);
});

// Pretty-print file sink via Serilog
var filePrettyFactory = LoggerFactory.Create(lb =>
{
    var serilogConfig = new LoggerConfiguration()
        .MinimumLevel.Information()
        .WriteTo.File("App_Data/logs/activity-pretty-.log",
            rollingInterval: RollingInterval.Day,
            outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
        .CreateLogger();
    lb.AddSerilog(serilogConfig, dispose: true);
});

// JSON file sink via Serilog compact formatter
var fileJsonFactory = LoggerFactory.Create(lb =>
{
    var serilogJson = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.File(new CompactJsonFormatter(), "App_Data/logs/activity-json-.log",
            rollingInterval: RollingInterval.Day)
        .CreateLogger();
    lb.AddSerilog(serilogJson, dispose: true);
});

elsa.UseLoggingFramework(logging =>
{
    logging.AddLogSink(new LoggerSink("Console (via code)", consoleLogger));
    logging.AddLogSink(new LoggerSink("File (pretty)", filePrettyFactory));
    logging.AddLogSink(new LoggerSink("File (JSON)", fileJsonFactory));

    // Or use built-in sink factories
    logging.UseConsole();
    logging.UseSerilog();

    // Bind default sinks from configuration
    logging.ConfigureDefaults(options =>
        configuration.GetSection("LoggingFramework").Bind(options));
});
```

---

## Configuration via appsettings.json

Sinks can be declared entirely in configuration:

```json
{
  "LoggingFramework": {
    "Defaults": ["Console", "FilePretty", "FileJson"],
    "Sinks": [
      {
        "Type": "Console",
        "Name": "Console",
        "Options": {
          "MinLevel": "Information",
          "CategoryFilters": {
            "Process": "Information",
            "Process.Nested": "Debug"
          },
          "Formatter": "Default",
          "TimestampFormat": "HH:mm:ss ",
          "DisableColors": true
        }
      },
      {
        "Type": "Serilog",
        "Name": "FilePretty",
        "Options": {
          "Path": "App_Data/logs/activity-pretty-.log",
          "RollingInterval": "Day",
          "Template": "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}",
          "MinLevel": "Information"
        }
      },
      {
        "Type": "Serilog",
        "Name": "FileJson",
        "Options": {
          "Path": "App_Data/logs/activity-json-.log",
          "RollingInterval": "Day",
          "Formatter": "CompactJson",
          "MinLevel": "Debug"
        }
      }
    ]
  }
}
```

---

## Log Activity

Workflow designers use the **Log** activity to emit structured log entries from within a workflow.

| Property | Description |
|----------|-------------|
| **Message** | Log message template with `{Placeholder}` support |
| **Level** | Trace, Debug, Information, Warning, Error, Critical |
| **Category** | Log category (defaults to `"Process"`) |
| **Arguments** | Values for placeholders in the message template |
| **Attributes** | Additional key/value pairs |
| **SinkNames** | Target sinks (checklist picker of available sinks) |

Example in a workflow:

```csharp
new Log("Order received: {OrderId}", LogLevel.Information)
{
    Arguments = new(new { OrderId = orderId }),
    SinkNames = new(new[] { "FileJson" })
}
```

### Log Levels and Category Filtering

Each sink supports category-specific log level overrides. The `Category` input on the Log activity is used to evaluate these filters:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

---

## Extending with Custom Sinks

Implement `ILogSinkFactory<TOptions>` for complete control:

```csharp
public class MyCustomLogSinkFactory : ILogSinkFactory<MyCustomOptions>
{
    public string Type => "MyCustom";
    public ILogSink Create(string name, MyCustomOptions options)
    {
        // Create and return custom sink
    }
}

services.AddScoped<ILogSinkFactory, MyCustomLogSinkFactory>();
```

Registered factories can be used from both code and configuration.

---

## Related

- [[Elsa Log Persistence]] — controls which activity inputs/outputs are persisted to execution records (different from runtime logging)
- [[Elsa Architecture]] — monitoring and structured logging in the broader architecture
