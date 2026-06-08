---
type: concept
title: "Elsa Studio Localization"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - studio
  - localization
  - i18n
  - blazor
status: developing
address: c-000090
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Studio Design]]"
---

# Elsa Studio Localization

[[entities/Elsa Workflows]] Studio supports localization to display its UI in different languages. The system is built around the `ILocalizationProvider` interface and is available for both Blazor Server and Blazor WebAssembly hosts.

---

## Architecture

Implement the `ILocalizationProvider` interface to supply localized strings:

```csharp
builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();
```

Localization data can come from `.resx` files, a database, JSON files, or any custom source.

---

## Blazor Server Setup

1. Add the `Elsa.Studio.Localization.BlazorServer` package
2. Configure localization in `Program.cs`:

```csharp
var localizationConfig = new LocalizationConfig
{
    ConfigureLocalizationOptions = options =>
    {
        configuration.GetSection(LocalizationOptions.LocalizationSection).Bind(options);
        options.SupportedCultures = new[] { options?.DefaultCulture ?? new LocalizationOptions().DefaultCulture }
            .Concat(options?.SupportedCultures.Where(c => c != options?.DefaultCulture) ?? [])
            .ToArray();
    }
};

builder.Services.AddLocalizationModule(localizationConfig);
builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();

app.UseElsaLocalization();
app.MapControllers();
```

3. Configure `appsettings.json`:

```json
{
  "Localization": {
    "DefaultCulture": "en-US",
    "SupportedCultures": ["en-GB", "nl-NL"]
  }
}
```

---

## Blazor WebAssembly Setup

1. Add the `Elsa.Studio.Localization.BlazorWasm` package
2. Similar configuration pattern (no middleware required, module handles it):

```csharp
var localizationConfig = new LocalizationConfig { /* ... */ };
builder.Services.AddLocalizationModule(localizationConfig);
builder.Services.AddSingleton<ILocalizationProvider, MyLocalizationProvider>();
await app.UseElsaLocalization();
```

3. Same `appsettings.json` configuration as Blazor Server.

---

## Related

- [[Elsa Studio Design]] — the Studio's workflow editor, activity pickers, UI hints, and visualiser system
