---
address: c-000108
status: developing
title: "FluentUI Blazor ColorPicker"
tags:
  - fluentui-blazor
  - components
  - color-picker
  - input
---

# FluentUI Blazor ColorPicker

The FluentUI Blazor library provides two color selection components: `FluentColorPicker` (standalone picker surface) and `FluentColorPickerInput` (text input with popover picker). Both return colors as hex strings (e.g., `#FF0000`) via `@bind-Value` or `@bind-SelectedColor`.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Color Picker Views

Three views are available via the `ColorPickerView` enumeration:

| View | Description |
|------|-------------|
| `SwatchPalette` | Grid of predefined color swatches |
| `ColorWheel` | Hexagonal color wheel with curated colors |
| `HsvSquare` | HSV square for picking any color by hue, saturation, and value |

---

## FluentColorPickerInput

Combines a labeled text field with a color swatch button that opens a popover containing the picker. Supports `HideTextInput` to show only the swatch button.

```razor
<FluentSelect Label="View"
              Items="@(Enum.GetValues<ColorPickerView>())"
              @bind-Value="SelectedView" />

<FluentSwitch Label="Hide Text Input"
              LabelPosition="@LabelPosition.Above"
              @bind-Value="HideTextInput" />

<FluentColorPickerInput @bind-Value="SelectedColor"
                        Label="Color"
                        Placeholder="#000000"
                        View="@SelectedView"
                        HideTextInput="@HideTextInput" />

<div>Selected Color: @SelectedColor</div>

@code {
    string? SelectedColor = "#FF0000";
    ColorPickerView SelectedView = ColorPickerView.SwatchPalette;
    bool HideTextInput = false;
}
```

---

## FluentColorPicker (Standalone)

Renders the picker surface directly without input field or popover. Useful for embedding in custom layouts like settings panels or toolbars.

```razor
<FluentStack Orientation="Orientation.Vertical" VerticalGap="12px">
    <h3>SwatchPalette</h3>
    <FluentColorPicker Orientation="Orientation.Horizontal"
                       View="ColorPickerView.SwatchPalette"
                       @bind-SelectedColor="SelectedColor" />

    <h3>ColorWheel</h3>
    <FluentColorPicker View="ColorPickerView.ColorWheel"
                       @bind-SelectedColor="SelectedColor" />

    <h3>HsvSquare</h3>
    <FluentColorPicker View="ColorPickerView.HsvSquare"
                       @bind-SelectedColor="SelectedColor" />
</FluentStack>

@code {
    string SelectedColor = "#FF0000";
}
```

All three picker views can be bound to a shared value -- selecting a color in any picker updates the others.

---

## API Reference

| Component | API Type |
|-----------|----------|
| `FluentColorPickerInput` | `API Type=FluentColorPickerInput` |
| `FluentColorPicker` | `API Type=FluentColorPicker` |

Key parameters: `SelectedColor` / `Value` (`string`), `View` (`ColorPickerView`), `HideTextInput` (`bool`), `Orientation` (`Orientation`), `Label` (`string`), `Placeholder` (`string`).
