---
description: >-
  Complete guide to extending Elsa Workflows with custom modules, features, and activities. Learn how to create reusable plugins and distribute them as NuGet packages.
---

# Plugins & Modules Guide

Elsa Workflows provides a powerful and flexible extensibility system that allows you to create custom modules, features, and activities tailored to your specific needs. This guide will teach you how to extend Elsa with your own functionality and package it for reuse across projects.

## Overview

The Elsa extensibility model is built around three core concepts:

- **Modules**: Containers that group related features and provide a unified configuration interface
- **Features**: Self-contained units of functionality that register services, activities, and other components
- **Activities**: The building blocks of workflows that encapsulate specific actions or operations

This architecture enables you to:
- Create domain-specific activities that encapsulate business logic
- Package and distribute reusable extensions as NuGet packages
- Maintain clean separation of concerns in large applications
- Configure complex functionality through simple, fluent APIs

## Table of Contents

- [Key Concepts](#key-concepts)
  - [Modules & Features](#modules--features)
  - [Activity Discovery & Registration](#activity-discovery--registration)
- [Creating a Custom Feature](#creating-a-custom-feature)
  - [Step 1: Define Your Feature Class](#step-1-define-your-feature-class)
  - [Step 2: Configure Services](#step-2-configure-services)
  - [Step 3: Create Extension Methods](#step-3-create-extension-methods)
  - [Step 4: Register Your Feature](#step-4-register-your-feature)
- [Creating Custom Activities](#creating-custom-activities)
  - [Basic Activity Structure](#basic-activity-structure)
  - [Defining Inputs and Outputs](#defining-inputs-and-outputs)
  - [Activity Attributes](#activity-attributes)
  - [Registering Activities](#registering-activities)
- [Packaging & Distribution](#packaging--distribution)
- [Advanced Topics](#advanced-topics)
- [Complete Examples](#complete-examples)

## Key Concepts

### Modules & Features

Elsa uses a hierarchical configuration system where **modules** contain **features**, and features register the actual services and components.

#### IModule Interface

The `IModule` interface represents a container for features. The Elsa configuration system provides a default module implementation that you'll typically work with through extension methods.

#### FeatureBase Class

`FeatureBase` is the base class for all features in Elsa. A feature:
- Encapsulates related functionality
- Registers services with dependency injection
- Can configure workflow options
- Follows a two-phase initialization: `Configure()` and `Apply()`

**Lifecycle Methods:**

1. **Configure()**: Called during application startup to register services and configure options. This is where you:
   - Register activities using `AddActivitiesFrom<T>()`
   - Register workflows using `AddWorkflowsFrom<T>()`
   - Add custom services to the DI container
   - Configure workflow options

2. **Apply()**: Called after all features have been configured. Use this for:
   - Post-configuration tasks that depend on other features
   - Final validation
   - Complex initialization logic

#### UseXyz() Pattern

Elsa follows a convention where features are enabled using `UseXyz()` extension methods. This pattern:
- Provides a fluent, discoverable API
- Allows optional configuration via lambda expressions
- Returns `IModule` for method chaining

Example:
```csharp
builder.Services.AddElsa(elsa => elsa
    .UseMyFeature()
    .UseAnotherFeature(feature =>
    {
        // Configure the feature
    })
);
```

### Activity Discovery & Registration

Elsa provides several methods for registering activities and workflows:

#### AddActivitiesFrom<T>()

Scans the assembly containing type `T` and registers all classes marked with the `[Activity]` attribute:

```csharp
Module.AddActivitiesFrom<MyFeature>();
```

This method:
- Discovers all activity classes in the assembly
- Registers them with the activity registry
- Makes them available in the workflow designer

#### AddWorkflowsFrom<T>()

Similar to `AddActivitiesFrom<T>()`, but registers workflow definitions:

```csharp
Module.AddWorkflowsFrom<MyFeature>();
```

## Creating a Custom Feature

Let's walk through creating a custom feature step by step.

### Step 1: Define Your Feature Class

Create a class that inherits from `FeatureBase`:

```csharp
using Elsa.Features.Abstractions;
using Elsa.Features.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MyWorkflows.Features;

public class MyFeature : FeatureBase
{
    public MyFeature(IModule module) : base(module)
    {
    }

    public override void Configure()
    {
        // Configuration goes here
    }

    public override void Apply()
    {
        // Post-configuration goes here (optional)
    }
}
```

**Key Points:**
- The constructor must accept `IModule` and pass it to the base class
- Override `Configure()` to register services and components
- Override `Apply()` only if you need post-configuration logic

### Step 2: Configure Services

Inside the `Configure()` method, register your activities and services:

```csharp
public override void Configure()
{
    // Register activities from this assembly
    Module.AddActivitiesFrom<MyFeature>();
    
    // Register custom services
    Services.AddSingleton<IMyCustomService, MyCustomService>();
    Services.AddScoped<IMyRepository, MyRepository>();
    
    // Configure workflow options
    Module.ConfigureWorkflowOptions(options =>
    {
        // Register UI hint handlers
        options.RegisterUIHintHandler<MyCustomUIHintHandler>("MyCustomHint");
    });
}
```

**Available Registration Methods:**

- `Module.AddActivitiesFrom<T>()`: Register all activities in the assembly
- `Module.AddWorkflowsFrom<T>()`: Register all workflow definitions in the assembly
- `Services.Add...()`: Access the service collection directly for custom registrations
- `Module.ConfigureWorkflowOptions()`: Configure workflow-specific settings

### Step 3: Create Extension Methods

Create a static extension class with `UseXyz()` methods following the Elsa convention:

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

**Pattern with Options:**

For more complex configuration, use an options class:

```csharp
public static class ModuleExtensions
{
    public static IModule UseMyFeature(
        this IModule module, 
        Action<MyFeatureOptions>? configure = null)
    {
        return module.Use<MyFeature>(feature =>
        {
            if (configure != null)
            {
                var options = new MyFeatureOptions();
                configure(options);
                
                // Apply options to feature properties or services
                if (options.EnableAdvancedFeatures)
                {
                    feature.Services.AddSingleton<IAdvancedService, AdvancedService>();
                }
            }
        });
    }
}

public class MyFeatureOptions
{
    public bool EnableAdvancedFeatures { get; set; } = false;
    public string? ApiKey { get; set; }
    public TimeSpan Timeout { get; set; } = TimeSpan.FromSeconds(30);
}
```

### Step 4: Register Your Feature

In your application's `Program.cs` or `Startup.cs`, use your extension method:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa => elsa
    .UseMyFeature()
    // Or with configuration:
    .UseMyFeature(options =>
    {
        options.EnableAdvancedFeatures = true;
        options.ApiKey = builder.Configuration["MyFeature:ApiKey"];
    })
);
```

## Creating Custom Activities

Custom activities are the primary way to extend workflow functionality. See [examples/SampleActivity.cs](examples/SampleActivity.cs) for a complete example.

### Basic Activity Structure

Activities inherit from `CodeActivity` or `CodeActivity<T>` (for activities with outputs):

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;

[Activity("MyWorkflows", "Sample", "Description of what this activity does")]
public class SampleActivity : CodeActivity<string>
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Activity logic here
        
        // Set output if using CodeActivity<T>
        context.Set(Result, "output value");
        
        // Complete the activity
        await context.CompleteActivityAsync();
    }
}
```

**Base Classes:**

- `CodeActivity`: For activities without a return value
- `CodeActivity<T>`: For activities that produce a single output of type `T`
- `Activity`: For more complex activities with custom behavior

### Defining Inputs and Outputs

Use the `[Input]` and `[Output]` attributes to define activity ports:

```csharp
[Activity("MyWorkflows", "Data", "Processes a message with optional prefix")]
public class ProcessMessage : CodeActivity<string>
{
    [Input(Description = "The message to process")]
    public Input<string> Message { get; set; } = default!;

    [Input(
        Description = "Optional prefix to prepend", 
        DefaultValue = "INFO")]
    public Input<string?> Prefix { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var message = context.Get(Message);
        var prefix = context.Get(Prefix);
        
        var result = $"{prefix}: {message}";
        
        context.Set(Result, result);
        await context.CompleteActivityAsync();
    }
}
```

**Input/Output Features:**

- `Description`: Shown in the workflow designer
- `DefaultValue`: Default value if not specified
- `UIHint`: Custom UI control for the property editor
- `Category`: Groups related properties in the designer

### Activity Attributes

The `[Activity]` attribute configures how the activity appears in the designer:

```csharp
[Activity(
    Namespace = "MyCompany.MyProduct",    // Logical grouping
    Category = "Integration",              // Designer category
    Description = "Detailed description", // Shown in tooltips
    DisplayName = "My Activity"           // Display name (optional)
)]
public class MyActivity : CodeActivity
{
    // ...
}
```

**Attribute Parameters:**

- **Namespace**: Groups activities logically (e.g., "MyCompany.Integration")
- **Category**: Organizes activities in the designer toolbox
- **Description**: Provides help text for workflow designers
- **DisplayName**: Overrides the class name in the designer

### Registering Activities

Activities are registered via features:

```csharp
public override void Configure()
{
    // Registers all activities in the assembly containing MyFeature
    Module.AddActivitiesFrom<MyFeature>();
}
```

This scans for all types marked with `[Activity]` and registers them with the activity registry. They become immediately available in:
- The workflow designer
- Programmatic workflow definitions
- The workflow execution engine

## Packaging & Distribution

To share your custom modules, package them as NuGet packages:

### 1. Create a Class Library Project

```bash
dotnet new classlib -n MyWorkflows.Extensions
cd MyWorkflows.Extensions
dotnet add package Elsa
dotnet add package Elsa.Workflows.Core
```

### 2. Organize Your Code

```
MyWorkflows.Extensions/
├── Activities/
│   ├── SampleActivity.cs
│   └── AnotherActivity.cs
├── Features/
│   └── MyFeature.cs
├── Extensions/
│   └── ModuleExtensions.cs
└── MyWorkflows.Extensions.csproj
```

### 3. Configure the .csproj File

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PackageId>MyCompany.MyWorkflows.Extensions</PackageId>
    <Version>1.0.0</Version>
    <Authors>Your Name</Authors>
    <Description>Custom Elsa Workflows extensions</Description>
    <PackageTags>elsa;workflows;extensions</PackageTags>
    <RepositoryUrl>https://github.com/yourorg/yourrepo</RepositoryUrl>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Elsa" Version="3.0.*" />
    <PackageReference Include="Elsa.Workflows.Core" Version="3.0.*" />
  </ItemGroup>
</Project>
```

### 4. Build and Publish

```bash
dotnet pack -c Release
dotnet nuget push bin/Release/MyCompany.MyWorkflows.Extensions.1.0.0.nupkg \
  --api-key YOUR_API_KEY \
  --source https://api.nuget.org/v3/index.json
```

### 5. Consume the Package

Users can then install and use your package:

```bash
dotnet add package MyCompany.MyWorkflows.Extensions
```

```csharp
builder.Services.AddElsa(elsa => elsa
    .UseMyFeature()
);
```

## Advanced Topics

### Custom UI Hint Handlers

UI hint handlers control how activity properties are edited in the workflow designer:

```csharp
public class MyCustomUIHintHandler : IUIHintHandler
{
    public string UIHint => "MyCustomHint";

    public object GetDefaultValue()
    {
        return new MyCustomData();
    }
}
```

Register in your feature:

```csharp
Module.ConfigureWorkflowOptions(options =>
{
    options.RegisterUIHintHandler<MyCustomUIHintHandler>("MyCustomHint");
});
```

### Custom Serializers

For complex data types, implement custom serializers:

```csharp
public class MyTypeSerializer : ISerializer
{
    public object Deserialize(string data)
    {
        // Deserialization logic
    }

    public string Serialize(object obj)
    {
        // Serialization logic
    }
}
```

Register in your feature:

```csharp
Services.AddSingleton<ISerializer, MyTypeSerializer>();
```

### Activity Execution Context

The `ActivityExecutionContext` provides access to:

- **Workflow Instance**: Current workflow state and variables
- **Input/Output**: Get and set activity inputs and outputs
- **Journal**: Log custom data for debugging
- **Cancellation**: Handle workflow cancellation
- **Services**: Access dependency injection container

```csharp
protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
{
    // Access workflow variables
    var workflowVar = context.GetWorkflowVariable<string>("MyVar");
    
    // Access services
    var myService = context.GetRequiredService<IMyService>();
    
    // Log to journal
    context.JournalData.Add("CustomKey", "CustomValue");
    
    // Check cancellation
    if (context.CancellationToken.IsCancellationRequested)
        return;
    
    // ... activity logic
}
```

## Complete Examples

For complete, working examples, see:

- [SampleActivity.cs](examples/SampleActivity.cs) - A full custom activity with inputs and outputs
- [MyFeature.cs](examples/MyFeature.cs) - A complete feature implementation
- [ModuleExtensions.cs](examples/ModuleExtensions.cs) - Extension methods following Elsa conventions

## Best Practices

1. **Follow Naming Conventions**
   - Use `UseXyz()` for feature extension methods
   - Name features as `XyzFeature`
   - Use clear, descriptive activity names

2. **Provide Good Metadata**
   - Use descriptive `[Activity]` attributes
   - Add meaningful descriptions to inputs/outputs
   - Include usage examples in XML comments

3. **Handle Errors Gracefully**
   - Validate inputs in activities
   - Provide helpful error messages
   - Consider retry logic for transient failures

4. **Test Thoroughly**
   - Unit test activities independently
   - Integration test features
   - Test with the workflow designer

5. **Document Your Extensions**
   - Include XML documentation comments
   - Provide usage examples
   - Document configuration options

## Further Reading

- [Custom Activities Guide](../../extensibility/custom-activities.md) - Detailed activity creation guide
- [Elsa Core Repository](https://github.com/elsa-workflows/elsa-core) - Official source code and examples
- [Feature Documentation](../../features/README.md) - Built-in features reference

## Support

For questions and support:
- [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
- [GitHub Issues](https://github.com/elsa-workflows/elsa-core/issues)
- [Official Documentation](https://elsa-workflows.github.io/elsa-core/)
