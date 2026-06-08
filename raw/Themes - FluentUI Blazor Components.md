---
title: "Themes - FluentUI Blazor Components"
source: "https://fluentui-blazor-v5.azurewebsites.net/Theme"
author:
published:
created: 2026-05-23
description:
tags:
  - "clippings"
---
## Theme

## Default Theme and Brand color

A Fluent UI Theme is represented by a set of tokens. Each token resolves to a single value which can be assigned to a CSS property.

The Fluent UI Design System comes with a default theme which provides a modern and cohesive look and feel across all components. It includes a set of predefined colors, typography, and spacing that can be easily customized to fit your brand. In this section, the focus is on the color(s). Besides the default theme, dark and light versions of the Teams theme are also included. This is especially useful if you use the Fluent UI Blazor library for building Teams add-ins or applications

In the Fluent Design System, there is one primary color defined which is named the **Brand** color. The brand color is used to represent the identity of a product or organization and is used in various UI elements such as buttons, links, and highlights to create a consistent visual identity.

The brand color is used to generate a 16-color ramp that passes contrast checks for accessibility. This 16-color ramp includes a range of shades and tints of the brand color, allowing for flexibility in design while maintaining a cohesive look. The components in the library use this generated ramp of colors in their presentation.

When nothing is configured, the library will use a default brand color, which is a shade of blue (#0F6CBD). This default color is chosen to provide a visually appealing and accessible experience for users.

## Customizing the Brand color

The Fluent Design system allows for customizing the brand color to align with your brand identity. By providing a custom brand color, you can create a unique and personalized experience for your users while still adhering to the principles of the Fluent Design System.

The Fluent UI Blazor library includes built-in support for customizing the brand color and generating a corresponding color ramp. This uses the *exact same algorithms* as the [Fluent Theme Designer](https://storybooks.fluentui.dev/react/?path=/docs/theme-theme-designer--docs), a tool provided by the Fluent UI React team at Microsoft to help designers and developers create custom themes based on the Fluent Design System. By using these same algorithms, we ensure the colors generated in your Blazor application will match exactly what you see in the Theme Designer.

You can choose any valid hex color code as your brand color, and the library will automatically generate and apply the appropriate shades and tints to ensure accessibility and visual consistency.

### Using an exact color in the ramp

We've added functionality which allows you to specify that the generated ramp should include the exact specified color as one of the colors in the ramp. This gives you more control over the generated colors and ensures that the key color is included in the ramp. This can be particularly useful if you want to ensure that the exact brand color is used in certain UI elements while still benefiting from the generated shades and tints for other elements.

> Warning When using the exact mode, there is no guarantee ***all*** colors in the generated ramp will pass contrast checks for accessibility.

The choice of using a dark or a light theme mode determines which color(s) in the ramp will use the exact specified color. Technically, choosing to use an exact color will determine what values are assigned to the `--colorBrandBackground` and `--colorCompoundBrandBackground` CSS variables.

We offer two ways to set a custom brand color in your Blazor application:

### Set the Brand color declaratively

You can add a `data-theme` attribute to the `<body>` tag in your HTML and set its value to 'light', 'dark', or 'system' to specify the theme mode. This allows you to configure the theme mode.

You can add a `data-theme-color` attribute to the `<body>` tag in your HTML and set its value to a valid hex color code (e.g., #FF0000). The library will automatically detect this attribute, generate a color ramp based on the provided color, and apply it to the application.

The declarative `data-theme-*` attributes are treated as developer-provided overrides and are ***not*** persisted to `localStorage`.

To have acces to all variables that are available to customize a theme, you can use the methods described below.

### Set the Brand color with code

A full API is available for configuring the theme programmatically in your Blazor application. This allows you to dynamically change the theme based on user interactions or other conditions in your application.

The following methods are available for setting the brand color programmatically:

Default implementation of `IThemeService`.

### ⚒️ Methods

| Name | Description |
| --- | --- |
| `Task ClearStoredThemeSettingsAsync()` | Removes the stored theme settings from localStorage. |
| `Task<Theme> CreateCustomThemeAsync(ThemeSettings settings)` | Creates a custom theme based on the specified settings.The returned `Theme` can be modified by the caller before it is applied. |
| `Task<string> GetBrandColorAsync()` | Returns the current brand color (default if no custom brand color is set). |
| `Task<IReadOnlyDictionary<string, string>> GetColorRampAsync()` | Returns the current, cached, custom brand ramp, or null if no custom ramp has been generated yet. |
| `Task<IReadOnlyDictionary<string, string>> GetColorRampFromSettingsAsync(ThemeSettings settings)` | Returns a custom brand ramp based on the specified settings, or null if invalid settings provided. |
| `Task<bool> IsDarkModeAsync()` | Returns true if the current Fluent UI theme is dark mode. |
| `Task<bool> IsSystemDarkAsync()` | Returns true if the browser prefers dark mode. |
| `Task SetThemeAsync(Theme theme)` | Sets a theme.`Theme` should be initially created with the method, can then be modified before applying it here. |
| `Task SetThemeAsync(ThemeColorVariant type)` | Sets a theme by type using the current effective mode. |
| `Task SetThemeAsync(ThemeColorVariant type, ThemeMode mode)` | Sets a theme by type and mode. |
| `Task SetThemeAsync(string color, bool isExact)` | Sets a custom theme based on the specified brand color using the current effective mode. |
| `Task SetThemeAsync(ThemeMode mode)` | Sets a theme by mode using the current effective theme type. |
| `Task SetThemeAsync(ThemeSettings settings)` | Sets a custom theme based on the specified settings. |
| `Task SetThemeToElementAsync(ElementReference element, ThemeSettings settings)` | Sets a custom theme on a specific element based on the specified `ThemeSettings`.This does not affect the global theme. |
| `Task SetThemeToElementAsync(ElementReference element, Theme theme)` | Sets a custom theme on a specific element based on the specified `Theme`.This does not affect the global theme. |
| `Task SwitchDirectionAsync()` | Switches the document direction between left-to-right and right-to-left. |
| `Task<bool> SwitchThemeAsync()` | Toggles between light and dark mode. |

The SetThemeAsync result is cached in `localStorage` so that the theme configuration can be persisted across sessions and restored on subsequent visits to the application. The only exception to this is when using the `SetThemeAsync(Theme theme)` overload, which applies a fully custom theme without caching it.

## On this page

- [Default Theme and Brand color](https://fluentui-blazor-v5.azurewebsites.net/Theme#default-theme-and-brand-color)
- [Customizing the Brand color](https://fluentui-blazor-v5.azurewebsites.net/Theme#customizing-the-brand-color)

Version: 5.0.0-RC.3+e2a4ea4a

[Powered by.NET 10.0.7](https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet-core)