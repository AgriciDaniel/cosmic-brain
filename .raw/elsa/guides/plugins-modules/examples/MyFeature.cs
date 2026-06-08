using Elsa.Features.Abstractions;
using Elsa.Features.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MyWorkflows.Features;

/// <summary>
/// A feature that encapsulates configuration for custom activities and services.
/// Features are the building blocks of modules in Elsa.
/// </summary>
public class MyFeature : FeatureBase
{
    /// <summary>
    /// Constructor that accepts the feature module for chaining.
    /// </summary>
    public MyFeature(IModule module) : base(module)
    {
    }

    /// <summary>
    /// Configure services required by this feature.
    /// This method is called during application startup.
    /// </summary>
    public override void Configure()
    {
        // Register custom activities from the assembly containing SampleActivity
        Module.AddActivitiesFrom<MyFeature>();
        
        // Optionally register custom services
        // Services.AddSingleton<IMyCustomService, MyCustomService>();
        
        // Optionally register UI hint handlers for custom activity properties
        // Module.ConfigureWorkflowOptions(options =>
        // {
        //     options.RegisterUIHintHandler<MyCustomUIHintHandler>("MyCustomHint");
        // });
    }

    /// <summary>
    /// Apply any additional configuration after all features are configured.
    /// This is called after Configure() on all features.
    /// </summary>
    public override void Apply()
    {
        // Optional: Perform any post-configuration tasks
        // This runs after all features have been configured
    }
}
