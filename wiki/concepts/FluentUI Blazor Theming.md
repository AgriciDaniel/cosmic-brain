---
type: concept
title: "FluentUI Blazor Theming"
address: c-000149
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - theming
  - dark-mode
  - design-tokens
  - theme-designer
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Styles and Spacing]]"
  - "[[FluentUI Blazor Installation]]"
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Tokens]]"
---

# FluentUI Blazor Theming

FluentUI Blazor provides a comprehensive theming system built on the [[Fluent 2 Design System]]. It supports light and dark themes, custom brand colors, CSS design tokens, a theme designer tool, and C# constants for colors and styles.

## Light/Dark Themes

Fluent UI provides a **dark theme** that can be applied to your application, designed for a visually appealing and comfortable user experience in low-light environments.

### ThemeService

You can switch between light and dark themes using `ThemeService`:

```csharp
[Inject]
public required ThemeService ThemeService { get; set; }

private bool DarkTheme { get; set; };

public async Task SwitchThemeAsync()
{
    DarkTheme = !DarkTheme;
    await ThemeService.SetThemeAsync(DarkTheme ? ThemeMode.Dark : ThemeMode.Light);

    // Or simply toggle the theme
    // await ThemeService.SwitchThemeAsync();
}
```

### body data-theme Attribute

The `<body data-theme>` attribute specifies the current theme:
- Dark theme applied: `data-theme="dark"`
- Light theme applied: attribute is absent

**Force a theme** by directly adding the attribute in your HTML:

```html
<body data-theme="dark"> ... </body>
<body data-theme="light"> ... </body>
```

**CSS styling based on theme:**

```css
body {
  background-color: #ffffff;
  color: #000000;
}

body[data-theme="dark"] {
  background-color: #121212;
  color: #ffffff;
}
```

### Preventing White Flash

When using the dark theme, a brief white "flash" may occur before the page fully renders. To prevent this, add CSS to your `<head>` section:

```html
<style>
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #292929;
      color: #ffffff;
    }
  }
</style>
```

> [!NOTE] In Razor/CSHTML files, escape the `@` symbol by doubling it: use `@@media` instead of `@media`.

### themeChanged Event

A JavaScript `themeChanged` event is triggered each time the `data-theme` attribute changes:

```html
<script>
    document.body.addEventListener('themeChanged', function (e) {
        console.log('Theme changed: isDark=', e.detail.isDark);
    });
</script>
```

The theme automatically updates when the user changes their system or browser theme, but is not saved across sessions by default.

### Theme Switching UI Example

```razor
@inject IThemeService ThemeService

<FluentStack Style="background-color: var(--colorBrandBackgroundHover);"
             HorizontalGap="24px"
             HorizontalAlignment="HorizontalAlignment.Right">

    @* Option 1: Sun/Moon icons *@
    <FluentButton Appearance="ButtonAppearance.Transparent"
                  IconOnly="true"
                  Class="fluent-header-hover"
                  Title="Switch to Light/Dark theme"
                  OnClick="@(async e => await ThemeService.SwitchThemeAsync())">
        @* Dark icon (sun - visible in light mode) *@
        <FluentIcon Class="hidden-if-light"
                    Value="@(new Icons.Filled.Size20.WeatherSunny().WithColor(SystemColors.Neutral.ForegroundOnBrand))" />
        @* Light icon (moon - visible in dark mode) *@
        <FluentIcon Class="hidden-if-dark"
                    Value="@(new Icons.Filled.Size20.WeatherMoon().WithColor(SystemColors.Neutral.ForegroundOnBrand))" />
    </FluentButton>

    @* Option 2: Dark theme icon with rotation *@
    <FluentButton Appearance="ButtonAppearance.Transparent"
                  IconOnly="true"
                  Class="fluent-header-hover"
                  Title="Switch to Light/Dark theme"
                  OnClick="@(async e => await ThemeService.SwitchThemeAsync())">
        <FluentIcon Class="hidden-if-light"
                    Value="@(new Icons.Filled.Size20.DarkTheme().WithColor(SystemColors.Neutral.ForegroundOnBrand))" />
        <FluentIcon Class="hidden-if-dark"
                    Style="transform: rotate(180deg);"
                    Value="@(new Icons.Filled.Size20.DarkTheme().WithColor(SystemColors.Neutral.ForegroundOnBrand))" />
    </FluentButton>
</FluentStack>
```

## System Colors

FluentUI Blazor includes a wide range of C# constants for Fluent UI **CSS variables** and **colors**.

### How it works

All CSS variables defined in the Fluent UI Web Components script are available as equivalent .NET constants:

1. **StylesVariables** namespace contains classes for design token constants. E.g., `StylesVariables.Fonts.Family.Monospace = "var(--fontFamilyMonospace)"`.

2. **SystemColors** namespace contains constants for CSS color variables. E.g., `SystemColors.Brand.Background = "var(--colorBrandBackground)"`.

```razor
<div style="background: @(SystemColors.Brand.Background); color: @(SystemColors.Neutral.ForegroundOnBrand);">
    <div style="font-family: @(StylesVariables.Fonts.Family.Monospace);">
        Hello World
    </div>
</div>
```

Color values automatically respond to the current theme mode (light/dark).

## Common Styles Constants

The library includes C# constants for common Fluent UI CSS styles:

```razor
<FluentStack Orientation="Orientation.Vertical" VerticalGap="12px"
             Padding="@Padding.All4"
             Style="@($"background: {SystemColors.Neutral.Background2};")">
    <div style="@CommonStyles.NeutralBorder1" class="@Padding.All2">
        This is a div with a neutral border.
    </div>

    <div style="@CommonStyles.BrandBackground" class="@Padding.All2">
        This is branded div.
    </div>

    <div style="@CommonStyles.NeutralBackground" class="@Padding.All2">
        This is neutral div.
    </div>

    <div style="@CommonStyles.NeutralBorderShadow4" class="@Padding.All2">
        This is a card with a shadow border.
    </div>
</FluentStack>
```

Available `CommonStyles` constants include border styles, background styles, and shadow border styles -- all mapped to the underlying CSS design tokens.

## Theme Designer

FluentUI Blazor includes an interactive **Theme Designer** for experimenting with brand colors and generating custom color ramps.

### How it works

- Change **hue**, **vibrancy** (range: -50 to 50, divided by 100 internally), and **theme mode** to create a custom theme
- Color ramp updates automatically and applies to components in the preview area
- **Apply** button persists settings to local storage as the default theme
- **Reset** button clears customizations and restores defaults

### Programmatic Theme Customization

You can create a `Theme` object directly in your code and modify its properties:

```csharp
// Create and alter a Theme object programmatically
// Controls border radius, color, font family, line height, etc.
```

This gives full control over all aspects of the theme, including colors, typography, spacing, and more -- without needing to manipulate CSS variables directly.

## Source

[[FluentUI Blazor]] v5 documentation -- Theming section
