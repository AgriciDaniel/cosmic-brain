# Logging Configuration Examples

This file provides minimal, copy-pasteable configuration snippets for enabling detailed logging in Elsa Workflows applications.

## appsettings.json Configuration

### Standard Logging (Console)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Elsa": "Information"
    },
    "Console": {
      "FormatterName": "simple",
      "FormatterOptions": {
        "TimestampFormat": "[HH:mm:ss] ",
        "IncludeScopes": true
      }
    }
  }
}
```

### Debug Logging (Troubleshooting)

Use this configuration when diagnosing issues:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Elsa": "Debug",
      "Elsa.Workflows.Runtime": "Debug",
      "Elsa.Workflows.Runtime.Services.WorkflowResumer": "Debug",
      "Elsa.Scheduling": "Debug",
      "Quartz": "Information"
    },
    "Console": {
      "FormatterName": "simple",
      "FormatterOptions": {
        "TimestampFormat": "[HH:mm:ss] ",
        "IncludeScopes": true
      }
    }
  }
}
```

### JSON Structured Logging (Production)

For log aggregation systems (ELK, Loki, CloudWatch):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Elsa": "Information"
    },
    "Console": {
      "FormatterName": "json",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "yyyy-MM-ddTHH:mm:ss.fffZ"
      }
    }
  }
}
```

---

## Program.cs Configuration

### Basic Console Logging

```csharp
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging from appsettings.json
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));

builder.Services.AddElsa(elsa =>
{
    // ... Elsa configuration
});

var app = builder.Build();
app.Run();
```

### Serilog with JSON Output

```csharp
using Serilog;
using Serilog.Formatting.Compact;

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", "ElsaServer")
    .Enrich.WithProperty("Environment", builder.Environment.EnvironmentName)
    .WriteTo.Console(new CompactJsonFormatter())
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

builder.Services.AddElsa(elsa =>
{
    // ... Elsa configuration
});

var app = builder.Build();
app.Run();
```

### Serilog with Workflow Context Enrichment

To include workflow instance IDs and correlation IDs in all log entries:

```csharp
using Serilog;
using Serilog.Formatting.Compact;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("Elsa", Serilog.Events.LogEventLevel.Debug)
    .Enrich.FromLogContext()  // Captures scope properties including WorkflowInstanceId
    .Enrich.WithMachineName()
    .Enrich.WithEnvironmentName()
    .WriteTo.Console(new CompactJsonFormatter())
    .WriteTo.File(
        new CompactJsonFormatter(),
        "logs/elsa-.json",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 14)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

builder.Services.AddElsa(elsa =>
{
    // ... Elsa configuration
});

var app = builder.Build();

// Add request logging middleware
app.UseSerilogRequestLogging();

app.Run();
```

---

## Environment Variable Overrides

Override log levels without changing configuration files:

```bash
# Set overall Elsa log level
export Logging__LogLevel__Elsa=Debug

# Set specific component log level
export Logging__LogLevel__Elsa.Workflows.Runtime=Debug
export Logging__LogLevel__Elsa.Scheduling=Debug

# Enable Quartz logging
export Logging__LogLevel__Quartz=Information
```

In Docker Compose:
```yaml
environment:
  - Logging__LogLevel__Elsa=Debug
  - Logging__LogLevel__Elsa.Workflows.Runtime=Debug
```

In Kubernetes:
```yaml
env:
  - name: Logging__LogLevel__Elsa
    value: "Debug"
  - name: Logging__LogLevel__Elsa.Workflows.Runtime
    value: "Debug"
```

---

## Log Categories Reference

| Category | Purpose | When to Enable |
|----------|---------|----------------|
| `Elsa` | All Elsa logs | General troubleshooting |
| `Elsa.Workflows.Runtime` | Workflow execution, resumption | Resume/bookmark issues |
| `Elsa.Workflows.Runtime.Services.WorkflowResumer` | Distributed locking, resume logic | Lock acquisition issues |
| `Elsa.Scheduling` | Timer/scheduler operations | Timer problems |
| `Elsa.Http` | HTTP triggers and callbacks | HTTP workflow issues |
| `Quartz` | Quartz scheduler internals | Scheduled task problems |

---

## Sample JSON Log Output

When using JSON formatting, logs will appear like:

```json
{
  "@t": "2025-11-25T10:30:45.123Z",
  "@mt": "Starting workflow instance {WorkflowInstanceId}",
  "@l": "Information",
  "WorkflowInstanceId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "WorkflowDefinitionId": "MyWorkflow",
  "CorrelationId": "order-12345",
  "Application": "ElsaServer",
  "MachineName": "elsa-server-pod-abc123"
}
```

This structure is ideal for querying in log aggregation systems:
- Filter by `WorkflowInstanceId` to trace a specific execution
- Filter by `CorrelationId` to follow a business transaction
- Filter by `@l` (level) to find errors and warnings

---

## Related Documentation

- [Logging Framework](../../features/logging-framework.md) - Elsa's activity logging
- [Troubleshooting Guide](README.md) - Main troubleshooting reference
