---
title: Light-Dark
order: 0005.04
category: 20|General
route: /Theme/LightDark
---

# Light/Dark Themes

Fluent UI provides a **dark theme** that can be applied to your application.
This theme is designed to provide a visually appealing and comfortable user experience in low-light environments.

You can easily switch between light and dark themes using the provided functions in the `ThemeService`:
`SetThemeAsync(ThemeMode mode)`.

> [!TIP] See to the section **Code snippets** at the bottom of this page for ready-to-use code examples.

## Example

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

## body data-theme

The `<body data-theme>` attribute is used to specify the current theme of the application.  
When the dark theme is applied, this attribute will be set to `data-theme="dark"`.  
When the light theme is applied, this attribute will be missing.  

For example, open the browser DevTools and switch between light and dark themes using the top-right button.
You will see the `data-theme` attribute change accordingly.

**Force a theme**

The theme is automatically managed by Fluent UI Blazor when the application is first loaded (Startup).  
You can force a specific theme by directly adding the attribute `data-theme="dark"` or `data-theme="light"`
in the `<body>` tag of your `index.html` or `_Host.cshtml` file.

**Style**

This attribute lets you easily apply specific CSS styles based on the current theme.

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

## Flash effect (optional)

When using the dark theme, you may notice a brief white "flash" before the page fully renders.
This occurs because the browser's default background color is white, and the FluentUI styles may not load instantly—especially on slower network connections.

To prevent this flash, add the following CSS to your `index.html`, `App.razor`, or `_layout.cshtml` file (in the `<head>...</head>` HTML section).
This sets a dark background color immediately, before the FluentUI styles are applied.

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

**Notes:** In Razor/CSHTML files, escape the `@` symbol by doubling it: use `@@media` instead of `@media`.

## themeChanged event

A JavaScript `themeChanged` event is triggered each time the `data-theme` attribute changes.

```html
<script>
    document.body.addEventListener('themeChanged', function (e) {
        console.log('Theme changed: isDark=', e.detail.isDark);
    });
</script>
```

The theme automatically updates by default when the user changes the system or browser theme but it is not saved across sessions.

## Code snippets

In this example, two buttons are created that allows users to switch between light and dark themes.

1. The first/left example uses two icons:
    - A **dark icon** (a sun) that is only visible when the light theme is active.
      The internal CSS class `hidden-if-light` is used to hide the icon when the light theme is active.
    - A **light icon** (a moon) that is only visible when the dark theme is active.
      The internal CSS class `hidden-if-dark` is used to hide the icon when the dark theme is active.

2. The second/right example uses the same **DarkTheme icon** but changes its appearance based on the current theme: `Style="transform: rotate(180deg);"`

In these two examples, when the button is **hovered**, the icon color changes to indicate interactivity, using the class `fluent-header-hover`.

When the user clicks the button, the `OnClick` event handler calls the `ThemeService.SwitchThemeAsync` method to toggle between light and dark themes.
The `body data-theme` attribute is automatically updated, and the `themeChanged` event is triggered.

{{ ThemeSnippet }}
