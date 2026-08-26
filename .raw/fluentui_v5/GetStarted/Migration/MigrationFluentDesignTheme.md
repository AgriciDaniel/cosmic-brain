---
title: Migration FluentDesignTheme and FluentDesignSystemProvider
route: /Migration/DesignTheme
hidden: true
---

- ### Components removed 💥

  Both `FluentDesignSystemProvider` and `FluentDesignTheme` have been **removed** in V5.
  Theming is now CSS-variable-based rather than component-based.

- ### V4 approach

  V4 used Blazor components for theming:

  ```xml
  <!-- V4 -->
  <FluentDesignTheme Mode="DesignThemeModes.Dark"
                     CustomColor="#0078d4"
                     OfficeColor="OfficeColor.Teams"
                     StorageName="theme" />

  <FluentDesignSystemProvider AccentBaseColor="#0078d4"
                              NeutralBaseColor="#808080"
                              BaseLayerLuminance="0.15" />
  ```

- ### V5 approach — CSS Variables

  V5 uses CSS custom properties (variables) managed through static C# classes
  such as `StylesVariables`, `CommonStyles`, `SystemColors`, `Margin`/`Padding`.

- ### V4 → V5 mapping

  | V4 | V5 Replacement |
  |----|----|
  | `FluentDesignTheme Mode="Dark"` | Set CSS variable `color-scheme: dark` on root element |
  | `FluentDesignTheme CustomColor` | Override `--colorBrandBackground*` CSS variables |
  | `FluentDesignSystemProvider AccentBaseColor` | Override `--colorBrand*` CSS variables |
  | `FluentDesignSystemProvider NeutralBaseColor` | Override `--colorNeutral*` CSS variables |
  | `FluentDesignSystemProvider ControlCornerRadius` | Use `StylesVariables.Borders.Radius.*` |
  | `FluentDesignSystemProvider BaseLayerLuminance` | Set theme via CSS (dark/light) |
  | `DesignThemeModes` enum | — *(removed)* |
  | `OfficeColor` enum | — *(removed)* |
  | `StandardLuminance` enum | — *(removed)* |

- ### Migration example

  ```css
  /* V5: Apply dark theme via CSS */
  :root {
      color-scheme: dark;
      --colorBrandBackground: #0078d4;
      --colorNeutralBackground1: #1a1a1a;
  }
  ```

  ```csharp
  // V5: Use design token constants in C#
  var style = $"border-radius: {StylesVariables.Borders.Radius.Medium}; " +
              $"box-shadow: {StylesVariables.Shadows.Shadow4}; " +
              $"padding: {Padding.All4};";
  ```
