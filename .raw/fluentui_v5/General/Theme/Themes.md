---
title: Themes
order: 0005.01
category: 20|General
route: /Theme/[Default]
icon: PaintBrushSparkle
---

# Theme

## Default Theme and Brand color

A Fluent UI Theme is represented by a set of tokens. Each token resolves to a single value which can be assigned to a CSS property.

The Fluent UI Design System comes with a default theme which provides a modern and cohesive look and feel across all components. It includes a set of
predefined colors, typography, and spacing that can be easily customized to fit your brand. In this section, the focus is on the
color(s).
Besides the default theme, dark and light versions of the Teams theme are also included. This is especially useful if you use the Fluent UI
Blazor library for building Teams add-ins or applications

In the Fluent Design System, there is one primary color defined which is named the **Brand** color. The brand color is used to represent the identity of
a product or organization and is used in various UI elements such as buttons, links, and highlights to create a consistent visual identity.

The brand color is used to generate a 16-color ramp that passes contrast checks for accessibility. This 16-color ramp includes a range of shades
and tints of the brand color, allowing for flexibility in design while maintaining a cohesive look. The components in the library use this generated ramp
of colors in their presentation.

When nothing is configured, the library will use a default brand color, which is a shade of blue (#0F6CBD). This default color is chosen to provide a
visually appealing and accessible experience for users.

## Customizing the Brand color

The Fluent Design system allows for customizing the brand color to align with your brand identity. By providing a custom brand color, you can create a unique
and personalized experience for your users while still adhering to the principles of the Fluent Design System.

The Fluent UI Blazor library includes built-in support for customizing the brand color and generating a corresponding color ramp. This uses the _exact same
algorithms_ as the [Fluent Theme Designer](https://storybooks.fluentui.dev/react/?path=/docs/theme-theme-designer--docs), a tool provided by the Fluent UI
React team at Microsoft to help designers and developers create custom themes based on the Fluent Design System. By using these same algorithms, we ensure
the colors generated in your Blazor application will match exactly what you see in the Theme Designer.

You can choose any valid hex color code as your brand color, and the library will automatically generate and apply the appropriate shades and tints to ensure
accessibility and visual consistency.

### Using an exact color in the ramp

We've added functionality which allows you to specify that the generated ramp should include the exact specified color as one of the colors in the ramp. This
gives you more control over the generated colors and ensures that the key color is included in the ramp. This can be particularly useful if you want to ensure
that the exact brand color is used in certain UI elements while still benefiting from the generated shades and tints for other elements.

>[!WARNING] When using the exact mode, there is no guarantee **_all_** colors in the generated ramp will pass contrast checks for accessibility.

The choice of using a dark or a light theme mode determines which color(s) in the ramp will use the exact specified color. Technically, choosing to use an
exact color will determine what values are assigned to the `--colorBrandBackground` and `--colorCompoundBrandBackground` CSS variables.

We offer two ways to set a custom brand color in your Blazor application:

### Set the Brand color declaratively

You can add a `data-theme` attribute to the `<body>` tag in your HTML and set its value to 'light', 'dark', or 'system' to specify the theme mode. This allows
you to configure the theme mode.

You can add a `data-theme-color` attribute to the `<body>` tag in your HTML and set its value to a valid hex color code (e.g., #FF0000). The library will
automatically detect this attribute, generate a color ramp based on the provided color, and apply it to the application.

The declarative `data-theme-*` attributes are treated as developer-provided overrides and are **_not_** persisted to `localStorage`.

To have acces to all variables that are available to customize a theme, you can use the methods described below.

### Set the Brand color with code

A full API is available for configuring the theme programmatically in your Blazor application. This allows you to dynamically change the theme based on user
interactions or other conditions in your application.

The following methods are available for setting the brand color programmatically:

{{ API Type=ThemeService }}

The SetThemeAsync result is cached in `localStorage` so that the theme configuration can be persisted across sessions and restored on subsequent visits
to the application. The only exception to this is when using the `SetThemeAsync(Theme theme)` overload, which applies a
fully custom theme without caching it.
