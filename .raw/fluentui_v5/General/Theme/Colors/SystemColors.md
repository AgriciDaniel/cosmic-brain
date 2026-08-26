---
title: System colors
order: 0005.06
category: 20|General
route: /Theme/Colors
---

# System colors

We include a wide range of constants for Fluent UI **CSS variables** and **colors** to use
in your application.

## How it works

All CSS variable defined in the Fluent UI Web Components script are available for use in your
Blazor application using equivalent .NET constants.

1. **StylesVariables** namespace contains a list of all classes which
   are used to define the constants.  
   E.g. `StylesVariables.Fonts.Family.Monospace = "var(--fontFamilyMonospace)"`.

1. **SystemColors** namespace contains a list of all constants
   which are used to define the CSS **Color** variables.  
   E.g. `SystemColors.Brand.Background = "var(--colorBrandBackground)"`.

```razor
<div style="background: @(SystemColors.Brand.Background); color: @(SystemColors.Neutral.ForegroundOnBrand);">
    <div style="font-family: @(StylesVariables.Fonts.Family.Monospace);">
        Hello World
    </div>
</div>
```

{{ ColorsDefault SourceCode=false }}

<br /><br /><br />

## SystemColors Constants

All colors below are rendered with the value corresponding to the current theme mode (light/dark). You can switch between the modes using the button in the top-right corner of the page.

{{ SystemColorsTable SourceCode=false }}
