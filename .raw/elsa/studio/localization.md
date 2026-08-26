# Localization

## Elsa Studio Localization

Elsa Studio Localization allows localizing the Studio UI to different languages.

`ILocalizationProvider` is the interface that needs to be implemented to provide the localized strings for the Studio UI.

Create your own localization file (Using the resource file or any alternative method' and implement the `ILocalizationProvider` interface.

Afterwards, register your implementation in the DI container.

```csharp
builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();
```

## Steps to Enable Localization

### For Blazor Server

1. Add Reference to `Elsa.Studio.Localization.BlazorServer` package.
2.  Add the following to your `Program.cs`

    ```csharp
    // Define the Localization Configuration
    var localizationConfig = new LocalizationConfig
    {
        ConfigureLocalizationOptions = options =>
        {
            configuration.GetSection(LocalizationOptions.LocalizationSection).Bind(options);
            options.SupportedCultures = new[] { options?.DefaultCulture ?? new LocalizationOptions().DefaultCulture }
                .Concat(options?.SupportedCultures.Where(culture => culture != options?.DefaultCulture) ?? []) .ToArray();
        }
    };

    // Register the Localization Module
    builder.Services.AddLocalizationModule(localizationConfig);

    // If using your own, register your locallization provider
    builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();

    // Add The localization Middleware. Making Sure that Controllers are also mapped.
    app.UseElsaLocalization();
    app.MapControllers();
    ```
3.  Add below configuration in the `appsettings.json` file, specifying the supported cultures.

    ```json
    "Localization": {
      "DefaultCulture": "en-US",
      "SupportedCultures": [
        "en-GB",
        "nl-NL"
      ]
    }
    ```

### For Blazor WebAssembly

1. Add Reference to `Elsa.Studio.Localization.BlazorWasm` package.
2.  Define the Localization Configuration

    ```csharp
    // Define the Localization Configuration
    var localizationConfig = new LocalizationConfig
    {
        ConfigureLocalizationOptions = options =>
        {
            configuration.GetSection(LocalizationOptions.LocalizationSection).Bind(options);
            options.SupportedCultures = new[] { options?.DefaultCulture ?? new LocalizationOptions().DefaultCulture }
                .Concat(options?.SupportedCultures.Where(culture => culture != options?.DefaultCulture) ?? []) .ToArray();
        }
    };

    // Register the Localization Module
    builder.Services.AddLocalizationModule(localizationConfig);

    // If using your own, register your locallization provider
    builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();

    // Use the localization Middleware
    await app.UseElsaLocalization();
    ```
3.  Add below configuration in the `appsettings.json` file, specifying the supported cultures.

    ```json
    "Localization": {
      "DefaultCulture": "en-US",
      "SupportedCultures": [
        "en-GB",
        "nl-NL"
      ]
    }
    ```
