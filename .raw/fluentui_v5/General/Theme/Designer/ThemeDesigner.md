---
title: Theme Designer
order: 0005.02
category: 20|General
route: /Theme/Designer
---

# Theme Designer

Use the designer below to experiment with different brand colors and see how they affect the generated color ramp. You can adjust the hue, vibrancy,
and theme mode to create a custom theme that fits your brand identity. Hue Torsion and Vibrancy are defined here to be between -50 and 50, but the underlying
implementation uses a range of -0.5 to 0.5, so the values you input will be divided by 100 before being applied to the color generation algorithm.

## How it works

Changing any of the values in the 'parameters' block below will automatically update the generated color ramp and apply the new theme to the components in
this part of the page only. This allows you to see the immediate impact of your changes and fine-tune your theme to achieve the desired look and feel.

- By clicking the 'Apply' button, you can apply the currently configured theme to the whole site. The settings will be persisted to local storage and will be
used as the default theme when you return to the site in the future.

- By clicking the 'Reset' button, you can reset the theme to the default settings. This will clear any customizations you have made, restore the original theme
and clear the local storage.

{{ ThemeDesigner SourceCode=false }}

## Create and alter a Theme

In addition to setting the brand color and generating a theme from it, you can also create a `Theme` object directly in your code and modify its properties
before applying it. This gives you full control over all aspects of the theme, including colors, typography, spacing, and more.

Clicking the button below applies an altered theme that changes the border radius, color, font family, and line height to the components in this part of the page only.

{{ CreateAndAlterTheme Files=Razor:CreateAndAlterTheme.razor;Code:CreateAndAlterTheme.razor.cs }}
