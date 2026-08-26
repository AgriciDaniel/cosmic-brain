# Logging Framework

The **Elsa.Logging** module provides a flexible and extensible way to capture, structure, and route log entries to various sinks. You can configure logging programmatically or via configuration files, and extend the framework with custom sinks for complete control.

## Programmatic Configuration

You can configure logging sinks directly in your application code. For example, in your `Program.cs`:

```csharp
// Example 1: Console target via built-in provider.
var consoleLogger = LoggerFactory.Create(lb =>
{
    lb.ClearProviders();
    lb.AddConsole();
    lb.AddFilter("Demo", LogLevel.Debug);
    lb.SetMinimumLevel(LogLevel.Information);
});

// Example 2: Pretty File target via Serilog (text template).
var filePrettyFactory = LoggerFactory.Create(lb =>
{
    var serilogConfig = new LoggerConfiguration()
        .MinimumLevel.Information()
        .WriteTo.File("App_Data/logs/activity-pretty-.log",
            rollingInterval: RollingInterval.Day,
            outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
        .CreateLogger();

    lb.ClearProviders();
    lb.AddFilter("Demo", LogLevel.Debug);
    lb.AddSerilog(serilogConfig, dispose: true);
});

// Example 3. JSON File target via Serilog (compact JSON).
var fileJsonFactory = LoggerFactory.Create(lb =>
{
    var serilogJson = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.File(new CompactJsonFormatter(), "App_Data/logs/activity-json-.log",
            rollingInterval: RollingInterval.Day)
        .CreateLogger();

    lb.ClearProviders();
    lb.AddSerilog(serilogJson, dispose: true);
});

// Enable the Logging Framework.
elsa.UseLoggingFramework(logging =>
{
    // Add sinks manually using factories defined in the 3 examples above.
    logging.AddLogSink(new LoggerSink("Console (via code)", consoleLogger));
    logging.AddLogSink(new LoggerSink("File (pretty)", filePrettyFactory));
    logging.AddLogSink(new LoggerSink("File (JSON)", fileJsonFactory));
    
    // Alternative to defining sinks hardcoded as done above, we can get sinks from configuration.
    logging.UseConsole(); // Installs the Console Log Sink Factory.
    logging.UseSerilog(); // Installs the Serilog Log Sink Factory.
    
    // Bind the "LoggingFramework:Defaults" section. Default sinks are used when the Log activity doesn't specify what sinks to write to.
    logging.ConfigureDefaults(options => configuration.GetSection("LoggingFramework").Bind(options));
});
```

This example demonstrates how to create custom sinks, register built-in sink factories, bind configuration from `appsettings.json`, and manually add sinks.

## Configuration via appsettings.json

You can also configure logging sinks declaratively in your `appsettings.json` file:

```json
{
  "LoggingFramework": {
    "Defaults": [
      "Console",
      "FilePretty",
      "FileJson"
    ],
    "Sinks": [
      {
        "Type": "Console",
        "Name": "Console",
        "Options": {
          "MinLevel": "Information",
          "CategoryFilters": {
            "Process": "Information",
            "Process.Nested": "Debug",
            "Process.Nested.Inner": "Information"
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

Each sink specifies the factory type, name, and options.

## Log Levels and Categories

Log sinks follow the same filtering semantics as the built-in ASP.NET Core logging system. Each sink defines a minimum log level and may specify category-specific overrides. When a Log activity emits a log entry, the value provided to the **Category** input is used to evaluate these filters.

For example, the following .NET loggng configuration allows `Warning` and higher by default, but only `Information` and higher for `Microsoft.Hosting.Lifetime`:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

You can achieve the same behavior with the `LoggingFramework` section when configuring sinks. A sink with the configuration shown earlier emits entries only if the log level for the specified category is enabled. This means that choosing `Category = "Process.Nested"` on the `Log` activity will use the `Debug` level override from the example configuration, while `Category = "Process.Nested.Inner"` will drop entries below `Information`.

## Log Activity

Workflow designers can drop a **Log** activity onto the canvas to emit structured log entries from a workflow.\
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

## Extending with Custom Sinks

For complete control over logging, implement your own `ILogSinkFactory`. A factory can construct sinks in code and from configuration (for example via `appsettings.json`), enabling reusable and configurable logging targets. Elsa provides examples such as `ConsoleLogSinkFactory` and `SerilogLogSinkFactory` that you can use as references.

To implement a custom sink:

1. Create a class that implements `ILogSinkFactory<TOptions>`.
2. Register your factory in the DI container.
3. Reference your sink type in configuration or code.

Example:

```csharp
public class MyCustomLogSinkFactory : ILogSinkFactory<MyCustomOptions>
{
    public string Type => "MyCustom";
    public ILogSink Create(string name, MyCustomOptions options)
    {
        // Create and return your custom sink.
    }
}

// Register in DI:
services.AddScoped<ILogSinkFactory, MyCustomLogSinkFactory>();
```

Once registered, the factory can be used from configuration:

```csharp
{
  "LoggingFramework": {
    "Sinks": [
      {
        "Type": "MyCustom",
        "Name": "MySink",
        "Options": {
          // Custom option values
        }
      }
    ]
  }
}
```

## References

* See `ConsoleLogSinkFactory` and `SerilogLogSinkFactory` for implementation examples.
* Configure sinks in code or via configuration for maximum flexibility.
* Use the `Log` activity in workflows to emit structured log entries.
