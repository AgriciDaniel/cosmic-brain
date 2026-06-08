---
description: >-
  Learn how to extend Elsa Workflows v3 with custom modules and plugins. Covers module registration, contributing activities, services, and API endpoints with practical examples.
---

# Modules and Plugins

Elsa Workflows v3 is built on a powerful **module and plugin architecture** that makes it easy to extend the framework with custom functionality. This guide explains what modules are, how they work, and how to create your own modules that contribute activities, services, and even API endpoints.

## What is a Module?

In Elsa v3, a **module** is a logical unit that groups related functionality together. Think of a module as a plugin that can be "installed" into your Elsa application to add new capabilities.

### Key Characteristics of Modules

- **Self-contained**: Each module encapsulates related features
- **Composable**: Modules can be mixed and matched
- **Configurable**: Modules expose configuration options via fluent API
- **Discoverable**: Modules follow a consistent naming and registration pattern

### Module vs Feature

Elsa's architecture uses two related concepts:

| Concept | Purpose | Example |
|---------|---------|---------|
| **Module** | Container for features, exposed via `IModule` | The Elsa configuration object |
| **Feature** | Self-contained unit of functionality inheriting from `FeatureBase` | `HttpFeature`, `EmailFeature` |

In practice, you'll typically create **features** and register them with the Elsa **module** using extension methods.

## How Modules are Registered

Modules are registered during application startup using the `AddElsa()` method:

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa => elsa
    .UseWorkflowRuntime()      // Adds workflow runtime feature
    .UseHttp()                 // Adds HTTP activities and triggers
    .UseEmail()                // Adds email activities
    .UseJavaScript()           // Adds JavaScript expression support
    .UseMyCustomModule()       // Your custom module
);
```

Each `UseXyz()` method is an extension method that:
1. Creates or retrieves a feature instance
2. Configures the feature (optional)
3. Registers services and activities
4. Returns the module for method chaining

## Module Contributions

Modules can contribute three main types of functionality to Elsa:

### 1. Activities
Custom activities that workflow designers can use in their workflows.

### 2. Services
Services registered with dependency injection that activities and other components can consume.

### 3. API Endpoints
REST API endpoints that extend Elsa Server's capabilities.

Let's explore each of these with practical examples.

## Creating a Custom Module

We'll create a complete example module called `MyReportingModule` that demonstrates all three contribution types.

### Step 1: Create the Feature Class

A feature inherits from `FeatureBase` and defines what gets registered:

```csharp
using Elsa.Features.Abstractions;
using Elsa.Features.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MyCompany.Elsa.Reporting.Features;

/// <summary>
/// Provides reporting capabilities for workflows.
/// </summary>
public class ReportingFeature : FeatureBase
{
    public ReportingFeature(IModule module) : base(module)
    {
    }

    /// <summary>
    /// Configure services, activities, and options.
    /// </summary>
    public override void Configure()
    {
        // Register all activities from this assembly
        Module.AddActivitiesFrom<ReportingFeature>();
        
        // Register custom services
        Services.AddSingleton<IReportGenerator, ReportGenerator>();
        Services.AddScoped<IReportRepository, ReportRepository>();
        
        // Configure workflow options
        Module.ConfigureWorkflowOptions(options =>
        {
            // Add any workflow-level configuration here
        });
    }

    /// <summary>
    /// Post-configuration logic (optional).
    /// Called after all features have been configured.
    /// </summary>
    public override void Apply()
    {
        // Optional: Perform actions that depend on other features
        // being fully configured
    }
}
```

### Step 2: Create a Custom Activity

Create an activity that uses the registered service:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

namespace MyCompany.Elsa.Reporting.Activities;

/// <summary>
/// Generates a report based on workflow data.
/// </summary>
[Activity(
    Namespace = "MyCompany.Reporting",
    Category = "Reporting",
    Description = "Generates a report and stores it")]
public class GenerateReport : CodeActivity<string>
{
    private readonly IReportGenerator _reportGenerator;

    public GenerateReport(IReportGenerator reportGenerator)
    {
        _reportGenerator = reportGenerator;
    }

    /// <summary>
    /// The report name.
    /// </summary>
    [Input(
        Description = "The name of the report to generate",
        UIHint = "single-line")]
    public Input<string> ReportName { get; set; } = default!;

    /// <summary>
    /// The report data as JSON.
    /// </summary>
    [Input(
        Description = "Data to include in the report as JSON",
        UIHint = "multi-line")]
    public Input<string?> Data { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var reportName = context.Get(ReportName);
        var data = context.Get(Data) ?? "{}";
        
        // Generate the report using our service
        var reportId = await _reportGenerator.GenerateAsync(reportName, data);
        
        // Output the report ID
        context.Set(Result, reportId);
        
        // Log to journal for debugging
        context.JournalData.Add("ReportId", reportId);
        context.JournalData.Add("ReportName", reportName);
    }
}
```

### Step 3: Create the Service Implementation

Implement the service that the activity depends on:

```csharp
namespace MyCompany.Elsa.Reporting.Services;

public interface IReportGenerator
{
    Task<string> GenerateAsync(string reportName, string data);
}

public class ReportGenerator : IReportGenerator
{
    private readonly IReportRepository _repository;
    private readonly ILogger<ReportGenerator> _logger;

    public ReportGenerator(
        IReportRepository repository,
        ILogger<ReportGenerator> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<string> GenerateAsync(string reportName, string data)
    {
        _logger.LogInformation("Generating report: {ReportName}", reportName);
        
        // Generate report ID
        var reportId = Guid.NewGuid().ToString();
        
        // Create report content (simplified example)
        var report = new Report
        {
            Id = reportId,
            Name = reportName,
            Data = data,
            GeneratedAt = DateTime.UtcNow
        };
        
        // Store the report
        await _repository.SaveAsync(report);
        
        _logger.LogInformation("Report generated: {ReportId}", reportId);
        
        return reportId;
    }
}

public interface IReportRepository
{
    Task SaveAsync(Report report);
    Task<Report?> GetByIdAsync(string id);
}

public class ReportRepository : IReportRepository
{
    // Simplified in-memory repository
    private readonly Dictionary<string, Report> _reports = new();

    public Task SaveAsync(Report report)
    {
        _reports[report.Id] = report;
        return Task.CompletedTask;
    }

    public Task<Report?> GetByIdAsync(string id)
    {
        _reports.TryGetValue(id, out var report);
        return Task.FromResult(report);
    }
}

public class Report
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Data { get; set; } = default!;
    public DateTime GeneratedAt { get; set; }
}
```

### Step 4: Add API Endpoints (Optional)

Expose an API endpoint for accessing generated reports:

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace MyCompany.Elsa.Reporting.Endpoints;

/// <summary>
/// Provides API endpoints for the reporting module.
/// </summary>
public static class ReportingEndpoints
{
    public static IEndpointRouteBuilder MapReportingEndpoints(
        this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/reporting");
        
        // Health check endpoint for the reporting module
        group.MapGet("/health", () => Results.Ok(new 
        { 
            module = "reporting",
            status = "healthy",
            timestamp = DateTime.UtcNow
        }))
        .WithName("ReportingHealth")
        .WithTags("Reporting");
        
        // Get report by ID
        group.MapGet("/reports/{id}", async (
            string id,
            IReportRepository repository) =>
        {
            var report = await repository.GetByIdAsync(id);
            return report != null 
                ? Results.Ok(report) 
                : Results.NotFound();
        })
        .WithName("GetReport")
        .WithTags("Reporting");
        
        return endpoints;
    }
}
```

To register these endpoints, update your feature:

```csharp
public override void Apply()
{
    // Register endpoint configuration
    Services.Configure<WebApplicationOptions>(options =>
    {
        // Note: Actual endpoint mapping happens in Program.cs
        // This is just for documentation purposes
    });
}
```

Then in your `Program.cs`, after building the app:

```csharp
var app = builder.Build();

// Map Elsa API endpoints
app.UseWorkflowsApi();

// Map custom reporting endpoints
app.MapReportingEndpoints();

app.Run();
```

### Step 5: Create Extension Methods

Create a fluent extension method following Elsa conventions:

```csharp
using Elsa.Features.Services;
using MyCompany.Elsa.Reporting.Features;

namespace MyCompany.Elsa.Reporting.Extensions;

public static class ReportingModuleExtensions
{
    /// <summary>
    /// Adds reporting capabilities to Elsa.
    /// </summary>
    public static IModule UseReporting(
        this IModule module,
        Action<ReportingFeature>? configure = null)
    {
        module.Use(configure);
        return module;
    }
}
```

### Step 6: Use Your Module

Now you can use your custom module in any Elsa application:

```csharp
// Program.cs
using MyCompany.Elsa.Reporting.Extensions;
using MyCompany.Elsa.Reporting.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa => elsa
    .UseWorkflowRuntime()
    .UseReporting()  // Your custom module!
);

var app = builder.Build();

app.UseWorkflowsApi();
app.MapReportingEndpoints();

app.Run();
```

The `GenerateReport` activity is now available in Elsa Studio and can be used in workflows.

## Module Configuration Options

For more complex modules, provide configuration options:

```csharp
public class ReportingOptions
{
    public string StoragePath { get; set; } = "./reports";
    public int MaxReportSizeMb { get; set; } = 50;
    public bool EnableCompression { get; set; } = true;
}

public class ReportingFeature : FeatureBase
{
    public ReportingOptions Options { get; set; } = new();

    public ReportingFeature(IModule module) : base(module)
    {
    }

    public override void Configure()
    {
        Module.AddActivitiesFrom<ReportingFeature>();
        
        // Register services with options
        Services.AddSingleton(Options);
        Services.AddSingleton<IReportGenerator, ReportGenerator>();
    }
}

// Extension method with configuration
public static IModule UseReporting(
    this IModule module,
    Action<ReportingOptions>? configure = null)
{
    return module.Use<ReportingFeature>(feature =>
    {
        if (configure != null)
        {
            configure(feature.Options);
        }
    });
}

// Usage with configuration
builder.Services.AddElsa(elsa => elsa
    .UseReporting(options =>
    {
        options.StoragePath = "/data/reports";
        options.MaxReportSizeMb = 100;
        options.EnableCompression = false;
    })
);
```

## Module Discovery Pattern

Modules in Elsa follow a consistent pattern that makes them easy to discover and use:

1. **Naming Convention**: 
   - Feature: `XyzFeature`
   - Extension method: `UseXyz()`
   - Options: `XyzOptions`

2. **Registration Flow**:
   ```
   UseXyz() -> Creates/Configures Feature -> Feature.Configure() 
   -> Registers Services/Activities -> Feature.Apply()
   ```

3. **Method Chaining**:
   ```csharp
   .UseWorkflowRuntime()
   .UseHttp()
   .UseEmail()
   .UseReporting()  // All return IModule
   ```

## Complete Module Structure

Here's the recommended structure for a module project:

```
MyCompany.Elsa.Reporting/
├── Activities/
│   ├── GenerateReport.cs
│   └── ExportReport.cs
├── Features/
│   ├── ReportingFeature.cs
│   └── ReportingOptions.cs
├── Services/
│   ├── IReportGenerator.cs
│   ├── ReportGenerator.cs
│   ├── IReportRepository.cs
│   └── ReportRepository.cs
├── Endpoints/
│   └── ReportingEndpoints.cs
├── Extensions/
│   └── ReportingModuleExtensions.cs
└── Models/
    └── Report.cs
```

## Best Practices

### 1. Follow Naming Conventions
- Use `XyzFeature` for feature classes
- Use `UseXyz()` for extension methods
- Use `XyzOptions` for configuration classes

### 2. Minimal Dependencies
- Only reference necessary Elsa packages
- Keep third-party dependencies minimal
- Use interfaces for external dependencies

### 3. Configuration Over Convention
- Provide sensible defaults
- Allow configuration via options
- Document all configuration properties

### 4. Documentation
- Add XML documentation to all public APIs
- Include examples in feature descriptions
- Document activity inputs and outputs

### 5. Testing
- Unit test activities independently
- Integration test features
- Test with different configurations

## Packaging as NuGet

To share your module as a NuGet package:

```xml
<!-- MyCompany.Elsa.Reporting.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>MyCompany.Elsa.Reporting</PackageId>
    <Version>1.0.0</Version>
    <Authors>Your Name</Authors>
    <Description>Reporting module for Elsa Workflows</Description>
    <PackageTags>elsa;workflows;reporting</PackageTags>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Elsa" Version="3.0.*" />
    <PackageReference Include="Elsa.Workflows.Core" Version="3.0.*" />
    <PackageReference Include="Elsa.Workflows.Runtime" Version="3.0.*" />
  </ItemGroup>
</Project>
```

Build and publish:

```bash
dotnet pack -c Release
dotnet nuget push bin/Release/MyCompany.Elsa.Reporting.1.0.0.nupkg
```

## Real-World Examples

Elsa's built-in features serve as excellent examples:

### HTTP Feature
```csharp
builder.Services.AddElsa(elsa => elsa
    .UseHttp(http => 
    {
        http.ConfigureHttpOptions(options =>
        {
            options.BaseUrl = new Uri("https://api.example.com");
        });
    })
);
```

### Email Feature
```csharp
builder.Services.AddElsa(elsa => elsa
    .UseEmail(email =>
    {
        email.ConfigureOptions(options =>
        {
            options.SmtpHost = "smtp.example.com";
            options.SmtpPort = 587;
        });
    })
);
```

### MassTransit Feature
```csharp
builder.Services.AddElsa(elsa => elsa
    .UseMassTransit(mt =>
    {
        mt.UseRabbitMq("amqp://localhost");
    })
);
```

## Further Reading

- **[Custom Activities](../../extensibility/custom-activities.md)** - Detailed guide on creating activities
- **[Plugins & Modules](../plugins-modules/README.md)** - Extended guide with more examples
- **[Architecture Overview](../architecture/README.md)** - Understanding Elsa's architecture
- **[HTTP Workflows](../http-workflows/README.md)** - Example of the HTTP module in action

## Summary

Creating custom modules in Elsa v3:
1. **Create a Feature** - Inherit from `FeatureBase`
2. **Register Components** - Add activities, services, and configuration
3. **Create Extension Method** - Follow the `UseXyz()` pattern
4. **Package & Share** - Distribute as NuGet for reuse

With this module architecture, you can extend Elsa to fit any domain or integration scenario while maintaining consistency with the rest of the Elsa ecosystem.
