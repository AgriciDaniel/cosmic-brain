using Elsa.Features.Services;
using MyWorkflows.Features;

namespace MyWorkflows.Extensions;

/// <summary>
/// Extension methods for registering custom features with Elsa modules.
/// This provides the UseXyz() pattern commonly used in Elsa configuration.
/// </summary>
public static class ModuleExtensions
{
    /// <summary>
    /// Adds the MyFeature to the Elsa module configuration.
    /// </summary>
    /// <param name="module">The Elsa module being configured.</param>
    /// <param name="configure">Optional action to configure the feature.</param>
    /// <returns>The module for method chaining.</returns>
    public static IModule UseMyFeature(this IModule module, Action<MyFeature>? configure = null)
    {
        // Register the feature with the module
        module.Use(configure);
        return module;
    }

    /// <summary>
    /// Alternative pattern with options configuration.
    /// Example showing how to accept a configuration options object.
    /// </summary>
    /// <param name="module">The Elsa module being configured.</param>
    /// <param name="configure">Optional action to configure feature options.</param>
    /// <returns>The module for method chaining.</returns>
    public static IModule UseMyFeatureWithOptions(this IModule module, Action<MyFeatureOptions>? configure = null)
    {
        return module.Use<MyFeature>(feature =>
        {
            if (configure != null)
            {
                var options = new MyFeatureOptions();
                configure(options);
                
                // Apply options to the feature
                // feature.SomeProperty = options.SomeValue;
            }
        });
    }
}

/// <summary>
/// Options class for configuring MyFeature.
/// This pattern allows for strongly-typed configuration.
/// </summary>
public class MyFeatureOptions
{
    /// <summary>
    /// Example configuration property.
    /// </summary>
    public bool EnableAdvancedFeatures { get; set; } = false;

    /// <summary>
    /// Example configuration property.
    /// </summary>
    public string? CustomSetting { get; set; }
}
