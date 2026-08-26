---
type: concept
title: "FluentUI Blazor Localization"
address: c-000128
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - localization
  - globalization
  - i18n
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Installation]]"
---

# FluentUI Blazor Localization

FluentUI Blazor provides a localization system that allows component text to be translated into different languages. The library ships with English strings by default, and developers can register custom localizers to provide translations.

## How it Works

FluentUI Blazor ships with English language strings for built-in component text (e.g., dialog buttons, validation messages). To customize translations, you register a custom `IFluentLocalizer` implementation as a service.

## Creating a Custom Localizer

### Step 1: Implement IFluentLocalizer

```csharp
using Microsoft.FluentUI.AspNetCore.Components;

public class CustomFluentLocalizer : IFluentLocalizer
{
    public string this[string key, params object[] arguments]
    {
        get
        {
            // Provide custom translations based on the key
            return key switch
            {
                "SomeKey" => "Your Custom Translation",
                "AnotherKey" => String.Format("Another Custom Translation {0}"),

                // Fallback to the Default/English if no translation is found
                _ => IFluentLocalizer.GetDefault(key, arguments),
            };
        }
    }
}
```

> [!NOTE] The list of translatable keys can be found in the `Core\Microsoft.FluentUI.AspNetCore.Components\Localization\LanguageResource.resx` file, or by using constants from the `Microsoft.FluentUI.AspNetCore.Components.Localization.LanguageResource` class. Example: `Localization.LanguageResource.MessageBox_ButtonOk`.

### Step 2: Register the Custom Localizer

In your `Program.cs`, register the custom localizer during service registration:

```csharp
builder.Services.AddFluentUIComponents(config => config.Localizer = new CustomFluentLocalizer());
```

## Using Embedded Resources (.resx Files)

For a more structured approach, use `.resx` files for translations.

### Step 1: Create Resource Files

Create a `Resources/FluentLocalizer.resx` file with your default translations. Set the file's Build Action to `Embedded Resource` and Custom Tool to `ResXFileCodeGenerator` (or `PublicResXFileCodeGenerator`).

### Step 2: Add Language Variants

Add additional languages by creating resource files with the language code appended. For example:
- `FluentLocalizer.fr.resx` -- French
- `FluentLocalizer.nl.resx` -- Dutch
- `FluentLocalizer.es-CR.resx` -- Spanish (Costa Rica)

### Step 3: Implement the Resource-Based Localizer

```csharp
public class EmbeddedCodeGeneratedLocalizer : IFluentLocalizer
{
    /// <summary>
    /// Gets the string resource with the given key, depending on the current UI culture.
    /// </summary>
    public string this[string key, params object[] arguments]
    {
        get
        {
            // Requirements:
            //  - builder.Services.AddLocalization();
            //  - app.UseRequestLocalization(new RequestLocalizationOptions()
            //       .AddSupportedUICultures(["en", "fr", "nl"]));

            // Gets the localized version of the string
            var localizedString = Resources.FluentLocalizer.ResourceManager
                .GetString(key, CultureInfo.CurrentCulture);

            // Fallback to the Default/English if no translation is found
            return localizedString == null
                ? IFluentLocalizer.GetDefault(key, arguments)
                : string.Format(CultureInfo.CurrentCulture, localizedString, arguments);
        }
    }
}
```

## ASP.NET Core Globalization Setup

For Blazor localization guidance that adds to or supersedes the above, see [ASP.NET Core Blazor globalization and localization](https://learn.microsoft.com/aspnet/core/blazor/globalization-localization).

### Step 1: Add Localization Services

In `Program.cs`:

```csharp
builder.Services.AddLocalization();
```

### Step 2: Configure Request Localization Middleware

Dynamically set the culture from the `Accept-Language` header:

```csharp
app.UseRequestLocalization(new RequestLocalizationOptions()
    .AddSupportedCultures(new[] { "en-US", "es-CR", "fr", "nl" })
    .AddSupportedUICultures(new[] { "en-US", "es-CR", "fr", "nl" }));
```

## Complete Setup Summary

To fully localize FluentUI Blazor components:

1. **Add localization services** -- `builder.Services.AddLocalization()`
2. **Configure supported cultures** -- `app.UseRequestLocalization(...)` with your desired cultures
3. **Create a custom localizer** -- Implement `IFluentLocalizer` using `.resx` files or inline switch statements
4. **Register the localizer** -- Pass it via `builder.Services.AddFluentUIComponents(config => config.Localizer = ...)`

## Source

[[FluentUI Blazor]] v5 documentation -- Localization section
