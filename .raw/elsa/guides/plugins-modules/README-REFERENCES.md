# References & Additional Resources

This document provides additional references and resources for working with Elsa Workflows modules, features, and custom activities.

## Official Documentation

- **Elsa Core Repository**: [https://github.com/elsa-workflows/elsa-core](https://github.com/elsa-workflows/elsa-core)
  - Main source code repository with examples and reference implementations

- **Custom Activities Guide**: [../../extensibility/custom-activities.md](../../extensibility/custom-activities.md)
  - Comprehensive guide to creating custom activities

- **Elsa GitBook**: [https://elsa-workflows.github.io/elsa-core/](https://elsa-workflows.github.io/elsa-core/)
  - Official documentation portal

## Key Namespaces & Types

### Core Feature System

- **Elsa.Features.Abstractions**
  - `IModule` - Module interface for feature containers
  - `IFeature` - Base feature interface
  
- **Elsa.Features.Services**
  - `FeatureBase` - Base class for all features
  - `Module` - Default module implementation

### Activity System

- **Elsa.Workflows**
  - `Activity` - Base activity class
  - `CodeActivity` - Simplified activity base without return value
  - `CodeActivity<T>` - Simplified activity base with typed return value
  - `ActivityExecutionContext` - Context for activity execution

- **Elsa.Workflows.Attributes**
  - `[Activity]` - Marks a class as an activity and provides metadata
  - `[Input]` - Marks a property as an activity input
  - `[Output]` - Marks a property as an activity output

- **Elsa.Workflows.Models**
  - `Input<T>` - Wrapper for activity input properties
  - `Output<T>` - Wrapper for activity output properties

## Built-in Feature Examples

Study these built-in features from elsa-core for reference:

### Simple Features

1. **WorkflowsFeature** (`Elsa.Workflows.Core`)
   - Basic feature that registers core workflow services
   - Located in: `src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs`

2. **HttpFeature** (`Elsa.Http`)
   - Demonstrates HTTP-related activity registration
   - Located in: `src/modules/Elsa.Http/Features/HttpFeature.cs`

### Complex Features

1. **WorkflowManagementFeature** (`Elsa.WorkflowManagement`)
   - Shows complex service registration and options configuration
   - Located in: `src/modules/Elsa.WorkflowManagement/Features/WorkflowManagementFeature.cs`

2. **EntityFrameworkFeature** (`Elsa.Persistence.EFCore`)
   - Demonstrates database provider configuration
   - Located in: `src/persistence/Elsa.Persistence.EFCore/Features/EntityFrameworkFeature.cs`

## Extension Method Patterns

### Basic Pattern

```csharp
public static IModule UseMyFeature(this IModule module)
{
    module.Use<MyFeature>();
    return module;
}
```

### With Configuration Action

```csharp
public static IModule UseMyFeature(
    this IModule module, 
    Action<MyFeature>? configure = null)
{
    module.Use(configure);
    return module;
}
```

### With Options Object

```csharp
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
            // Apply options to feature
        }
    });
}
```

## Activity Registration Methods

### AddActivitiesFrom<T>()

Scans assembly containing `T` for `[Activity]` classes:

```csharp
Module.AddActivitiesFrom<MyFeature>();
```

**Location in Source**: `Elsa.Workflows.Core/Extensions/ModuleExtensions.cs`

### AddWorkflowsFrom<T>()

Scans assembly containing `T` for workflow definitions:

```csharp
Module.AddWorkflowsFrom<MyFeature>();
```

**Location in Source**: `Elsa.Workflows.Core/Extensions/ModuleExtensions.cs`

### Manual Activity Registration

For fine-grained control:

```csharp
Services.AddActivityProvider<MyActivityProvider>();
```

## Common Service Registrations

### Activity-Related Services

```csharp
// Activity registry for custom activity management
Services.AddSingleton<IActivityRegistry, MyActivityRegistry>();

// Activity descriptor provider
Services.AddSingleton<IActivityDescriptorProvider, MyActivityDescriptorProvider>();

// Activity executor
Services.AddSingleton<IActivityExecutor, MyActivityExecutor>();
```

### UI Hint Handlers

```csharp
Module.ConfigureWorkflowOptions(options =>
{
    options.RegisterUIHintHandler<MyUIHintHandler>("MyHint");
});
```

### Type Serializers

```csharp
// For custom data type serialization
Services.AddSingleton<ISerializer, MyTypeSerializer>();
Services.AddSingleton<IPayloadSerializer, MyPayloadSerializer>();
```

## NuGet Package Structure

### Recommended Project Structure

```
MyWorkflows.Extensions/
├── Activities/
│   ├── Category1/
│   │   └── Activity1.cs
│   └── Category2/
│       └── Activity2.cs
├── Features/
│   └── MyExtensionsFeature.cs
├── Extensions/
│   └── ModuleExtensions.cs
├── Services/
│   ├── Interfaces/
│   │   └── IMyService.cs
│   └── Implementations/
│       └── MyService.cs
├── Models/
│   └── MyDataModel.cs
└── MyWorkflows.Extensions.csproj
```

### Essential Package Dependencies

```xml
<ItemGroup>
  <!-- Core Elsa packages -->
  <PackageReference Include="Elsa" Version="3.0.*" />
  <PackageReference Include="Elsa.Workflows.Core" Version="3.0.*" />
  
  <!-- Optional: For HTTP activities -->
  <PackageReference Include="Elsa.Http" Version="3.0.*" />
  
  <!-- Optional: For entity framework -->
  <PackageReference Include="Elsa.Persistence.EFCore" Version="3.0.*" />
</ItemGroup>
```

## Testing Your Extensions

### Unit Testing Activities

```csharp
[Fact]
public async Task SampleActivity_ExecutesCorrectly()
{
    // Arrange
    var activity = new SampleActivity
    {
        Message = new Input<string>("Test message"),
        Prefix = new Input<string>("INFO")
    };
    
    var context = new ActivityExecutionContext(/* ... */);
    
    // Act
    await activity.ExecuteAsync(context);
    
    // Assert
    var result = context.Get(activity.Result);
    Assert.Equal("INFO: Test message", result);
}
```

### Integration Testing Features

```csharp
[Fact]
public void MyFeature_RegistersActivities()
{
    // Arrange
    var services = new ServiceCollection();
    services.AddElsa(elsa => elsa.UseMyFeature());
    
    // Act
    var serviceProvider = services.BuildServiceProvider();
    var registry = serviceProvider.GetRequiredService<IActivityRegistry>();
    
    // Assert
    var descriptor = registry.Find("SampleActivity");
    Assert.NotNull(descriptor);
}
```

## Version Compatibility

### Elsa 3.x

The patterns described in this guide are compatible with Elsa Workflows version 3.0 and later.

**Key Version Notes:**
- Elsa 3.0+: Modern feature and module system
- Breaking changes from 2.x: See [V2 to V3 Migration Guide](../migration-v2-to-v3.md)

### Recommended Versioning Strategy

```xml
<!-- Use version ranges for forward compatibility -->
<PackageReference Include="Elsa" Version="3.0.*" />
<PackageReference Include="Elsa.Workflows.Core" Version="3.0.*" />
```

## Community Extensions

### Popular Community Packages

Check NuGet.org for community-contributed extensions:

- Search for packages tagged with `elsa-workflows`
- Browse packages with `Elsa.Extensions.*` naming pattern

### Contributing Back

Consider contributing your extensions:

1. Open source your package on GitHub
2. Publish to NuGet.org
3. Share in [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
4. Submit to the [Elsa Extensions catalog](https://github.com/elsa-workflows/elsa-extensions)

## Troubleshooting

### Common Issues

**Activities Not Appearing in Designer**
- Ensure `[Activity]` attribute is present
- Verify `AddActivitiesFrom<T>()` is called in feature
- Check that feature is registered with `UseMyFeature()`

**Service Resolution Failures**
- Verify services are registered in `Configure()`
- Check service lifetime (Singleton, Scoped, Transient)
- Ensure feature is applied before services are needed

**Configuration Not Applied**
- Check that `Apply()` is called after `Configure()`
- Verify options are properly passed to feature
- Debug registration order of features

### Debugging Tips

1. **Enable Detailed Logging**
   ```csharp
   builder.Services.AddLogging(logging =>
   {
       logging.SetMinimumLevel(LogLevel.Debug);
   });
   ```

2. **Inspect Registered Services**
   ```csharp
   var services = serviceProvider.GetServices<IActivityProvider>();
   foreach (var provider in services)
   {
       Console.WriteLine(provider.GetType().Name);
   }
   ```

3. **Validate Activity Descriptors**
   ```csharp
   var registry = serviceProvider.GetRequiredService<IActivityRegistry>();
   var descriptors = registry.ListAll();
   ```

## Additional Resources

### Learning Resources

- [Elsa Studio Tour](../../studio/studio-tour-troubleshooting.md)
- [HTTP Workflows Tutorial](../http-workflows/tutorial.md)
- [Testing & Debugging Workflows](../testing-debugging.md)

### API References

- [Activity API Documentation](../../activities/common-properties.md)
- [Expression System](../../expressions/c.md)
- [Workflow Patterns](../patterns/README.md)

### Community

- **GitHub Discussions**: Ask questions and share experiences
- **GitHub Issues**: Report bugs and request features
- **Stack Overflow**: Tag questions with `elsa-workflows`

## Related Documentation

- [Main Guide](README.md) - Complete plugins & modules guide
- [Custom Activities](../../extensibility/custom-activities.md) - Detailed activity creation
- [V2 to V3 Migration](../migration-v2-to-v3.md) - Upgrade guide

---

**Document ID**: DOC-019  
**Last Updated**: 2025-11-25  
**Elsa Version**: 3.0+
