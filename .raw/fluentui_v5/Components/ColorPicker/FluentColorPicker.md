---
title: ColorPicker
route: /ColorPicker
icon: TooltipQuote
---

# ColorPicker

The `FluentColorPicker` component lets users pick a color from a predefined palette or
an interactive color surface. It supports three different views, exposed through the
`ColorPickerView` enumeration:

- **SwatchPalette** – a grid of predefined color swatches.
- **ColorWheel** – a hexagonal color wheel showing a curated set of colors.
- **HsvSquare** – an HSV square that allows picking any color by hue, saturation and value.

The `FluentColorPickerInput` component combines a text input with a popover
`FluentColorPicker`, providing a compact, form-friendly color selector that
fits naturally next to other input controls.

Both components are unstyled wrappers around the same picking logic, so the selected
color is always returned as a hex string (for example `#FF0000`) that you can bind to
your own model with `@bind-Value` or `@bind-SelectedColor`.

## FluentColorPickerInput

`FluentColorPickerInput` exposes a labeled text field with a color swatch button that
opens a popover containing the picker. You can choose which `View` is displayed in the
popover and optionally hide the text input with `HideTextInput` to keep only the swatch
button. The example below lets you switch between the available views at runtime and
toggle the visibility of the text input.

{{ FluentColorPickerInputDefault }}

## FluentColorPicker

`FluentColorPicker` renders the picker surface directly, without any input field or
popover. This is useful when you need to embed the color selection UI inside a custom
layout, such as a settings panel or a toolbar. The example below displays the three
available views side-by-side and binds them to a shared `SelectedColor` value so that
selecting a color in any picker updates the others.

{{ FluentColorPickerDefault }}

## API FluentColorPickerInput

{{ API Type=FluentColorPickerInput }}

## API FluentColorPicker

{{ API Type=FluentColorPicker }}

