---
type: concept
title: Elsa Plugins and Modules
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa-workflows
  - plugins
  - modules
  - extensibility
  - features
status: developing
address: c-000084
related:
  - "[[Elsa Workflows]]"
  - "[[Elsa Persistence]]"
  - "[[Elsa API Client]]"
  - "[[Elsa HTTP Workflows]]"
---

# Elsa Plugins and Modules

Elsa Workflows provides a powerful and flexible extensibility system built around three core concepts: **modules**, **features**, and **activities**. This architecture enables creating domain-specific extensions, packaging them as NuGet packages, and maintaining clean separation of concerns.

---

## Architecture Overview

| Concept | Purpose | Example |
|---------|---------|---------|
| **Module** | Container for features, exposed via `IModule` | The Elsa configuration object |
| **Feature** | Self-contained unit of functionality inheriting from `FeatureBase` | `HttpFeature`, `EmailFeature` |
| **Activity** | Building block of workflows that encapsulates specific actions | `HttpEndpoint`, `SendEmail` |

### Module vs Feature

In practice, you create **features** and register them with the Elsa **module** using extension methods. A module groups related features; a feature registers the actual services, activities, and components.

---

## Feature Lifecycle

`FeatureBase` follows a two-phase initialization:

1. **`Configure()`** — Called during application startup. Use this to:
   - Register activities using `Module.AddActivitiesFrom<T>()`
   - Register workflows using `Module.AddWorkflowsFrom<T>()`
   - Add custom services to the DI container
   - Configure workflow options

2. **`Apply()`** — Called after all features have been configured. Use this for:
   - Post-configuration tasks that depend on other features
   - Final validation or complex initialization logic

---

## Creating a Custom Feature

### Step 1: Define the Feature Class

```csharp
using Elsa.Features.Abstractions;
using Elsa.Features.Services;

namespace MyWorkflows.Features;

public class MyFeature : FeatureBase
{
    public MyFeature(IModule module) : base(module) { }

    public override void Configure()
    {
        // Register activities from this assembly
        Module.AddActivitiesFrom<MyFeature>();

        // Register custom services
        Services.AddSingleton<IMyCustomService, MyCustomService>();
        Services.AddScoped<IMyRepository, MyRepository>();
    }

    public override void Apply()
    {
        // Optional post-configuration
    }
}
```

### Step 2: Create Extension Methods

Follow the `UseXyz()` convention for a fluent, discoverable API:

```csharp
using Elsa.Features.Services;
using MyWorkflows.Features;

namespace MyWorkflows.Extensions;

public static class ModuleExtensions
{
    public static IModule UseMyFeature(
        this IModule module,
        Action<MyFeature>? configure = null)
    {
        module.Use(configure);
        return module;
    }
}
```

### Step 3: Register the Feature

```csharp
builder.Services.AddElsa(elsa => elsa
    .UseMyFeature()
    .UseMyFeature(options =>
    {
        options.SomeSetting = "value";
    })
);
```

---

## Creating Custom Activities

### Basic Structure

Activities inherit from `CodeActivity` (no return value) or `CodeActivity<T>` (with typed output):

```csharp
[Activity("MyWorkflows", "Sample", "Description of what this activity does")]
public class SampleActivity : CodeActivity<string>
{
    [Input(Description = "The message to process")]
    public Input<string> Message { get; set; } = default!;

    [Input(Description = "An optional prefix", DefaultValue = "INFO")]
    public Input<string?> Prefix { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var message = context.Get(Message);
        var prefix = context.Get(Prefix);

        var result = string.IsNullOrEmpty(prefix)
            ? message
            : $"{prefix}: {message}";

        context.Set(Result, result);
        context.JournalData.Add("ProcessedMessage", result);
        await context.CompleteActivityAsync();
    }
}
```

### Activity Attributes

| Attribute Parameter | Purpose |
|--------------------|---------|
| `Namespace` | Logical grouping (e.g., "MyCompany.Integration") |
| `Category` | Organizes activities in the designer toolbox |
| `Description` | Help text shown in tooltips |
| `DisplayName` | Overrides the class name in the designer |

### Base Classes

- **`CodeActivity`** — For activities without a return value
- **`CodeActivity<T>`** — For activities that produce a single output of type `T`
- **`Activity`** — For more complex activities with custom behavior

---

## Activity Registration Methods

| Method | Description |
|--------|-------------|
| `Module.AddActivitiesFrom<T>()` | Scans assembly containing `T` for `[Activity]` classes and registers them |
| `Module.AddWorkflowsFrom<T>()` | Scans assembly containing `T` for workflow definitions |
| `Services.AddActivityProvider<T>()` | Manual registration for fine-grained control |

Activities become available in the workflow designer, programmatic workflow definitions, and the execution engine immediately after registration.

---

## Module Contributions

Modules can contribute three main types of functionality:

### 1. Activities

Custom activities that workflow designers can use in their workflows. Marked with `[Activity]` and auto-discovered via `AddActivitiesFrom<T>()`.

### 2. Services

Services registered with dependency injection that activities and other components consume. Register in the feature's `Configure()` method.

### 3. API Endpoints

REST API endpoints that extend Elsa Server's capabilities. Use ASP.NET Core Minimal API patterns:

```csharp
public static IEndpointRouteBuilder MapReportingEndpoints(
    this IEndpointRouteBuilder endpoints)
{
    var group = endpoints.MapGroup("/reporting");

    group.MapGet("/reports/{id}", async (string id, IReportRepository repository) =>
    {
        var report = await repository.GetByIdAsync(id);
        return report != null ? Results.Ok(report) : Results.NotFound();
    });

    return endpoints;
}
```

---

## Configuration with Options

For more complex modules, provide strongly-typed options:

```csharp
public class ReportingOptions
{
    public string StoragePath { get; set; } = "./reports";
    public int MaxReportSizeMb { get; set; } = 50;
}

public class ReportingFeature : FeatureBase
{
    public ReportingOptions Options { get; set; } = new();

    public override void Configure()
    {
        Module.AddActivitiesFrom<ReportingFeature>();
        Services.AddSingleton(Options);
        Services.AddSingleton<IReportGenerator, ReportGenerator>();
    }
}

public static IModule UseReporting(
    this IModule module,
    Action<ReportingOptions>? configure = null)
{
    return module.Use<ReportingFeature>(feature =>
    {
        configure?.Invoke(feature.Options);
    });
}
```

---

## Packaging as NuGet

### Recommended Project Structure

```
MyWorkflows.Extensions/
├── Activities/
│   ├── SampleActivity.cs
│   └── AnotherActivity.cs
├── Features/
│   └── MyFeature.cs
├── Extensions/
│   └── ModuleExtensions.cs
├── Services/
│   ├── Interfaces/
│   └── Implementations/
├── Models/
└── MyWorkflows.Extensions.csproj
```

### .csproj Configuration

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>MyCompany.MyWorkflows.Extensions</PackageId>
    <Version>1.0.0</Version>
    <PackageTags>elsa;workflows;extensions</PackageTags>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Elsa" Version="3.0.*" />
    <PackageReference Include="Elsa.Workflows.Core" Version="3.0.*" />
  </ItemGroup>
</Project>
```

### Build and Publish

```bash
dotnet pack -c Release
dotnet nuget push bin/Release/MyCompany.MyWorkflows.Extensions.1.0.0.nupkg \
  --api-key YOUR_API_KEY \
  --source https://api.nuget.org/v3/index.json
```

---

## Advanced Topics

### Custom UI Hint Handlers

Control how activity properties are edited in the workflow designer:

```csharp
Module.ConfigureWorkflowOptions(options =>
{
    options.RegisterUIHintHandler<MyCustomUIHintHandler>("MyCustomHint");
});
```

### Custom Serializers

For complex data types:

```csharp
Services.AddSingleton<ISerializer, MyTypeSerializer>();
```

### Activity Execution Context

The `ActivityExecutionContext` provides access to workflow variables, DI services, journal logging, and cancellation tokens:

```csharp
// Access workflow variables
var myVar = context.GetWorkflowVariable<string>("MyVar");

// Access services
var myService = context.GetRequiredService<IMyService>();

// Log to journal
context.JournalData.Add("CustomKey", "CustomValue");

// Check cancellation
if (context.CancellationToken.IsCancellationRequested) return;
```

---

## Best Practices

1. **Follow naming conventions** — Use `UseXyz()` for extension methods, `XyzFeature` for feature classes, `XyzOptions` for configuration
2. **Provide good metadata** — Use descriptive `[Activity]` attributes and meaningful input/output descriptions
3. **Handle errors gracefully** — Validate inputs in activities, provide helpful error messages, consider retry logic
4. **Test thoroughly** — Unit test activities independently, integration test features, test with the workflow designer
5. **Minimal dependencies** — Only reference necessary Elsa packages, keep third-party dependencies minimal
6. **Configuration over convention** — Provide sensible defaults, allow configuration via options, document all properties

---

## Related Documentation

- [[Elsa Workflows]] — Overview of the Elsa Workflows ecosystem
- [[Elsa Persistence]] — Persistence providers and configuration
- [[Elsa API Client]] — Programmatic API interaction
- [[Elsa HTTP Workflows]] — Building HTTP endpoint workflows
