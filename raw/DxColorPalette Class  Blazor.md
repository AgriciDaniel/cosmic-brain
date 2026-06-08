---
title: "DxColorPalette Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxColorPalette Class

In This Article

A Color Palette component that allows users to select colors.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxColorPalette :
    DxEditorBase,
    IColorPaletteAccessor,
    IParameterTrackerSettingsOwner,
    INestedSettingsOwner
```

## Remarks

DevExpress Color Palette for Blazor (`<DxColorPalette>`) allows users to select colors. The palette can show multiple of colors ( or ).

The default Color Palette configuration includes three color groups: **Universal**, **Universal Gradient**, and **Standard**.

![Color Palette Overview](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette.png)

[Run Demo: Color Palette - Overview](https://demos.devexpress.com/blazor/ColorPalette)

### Add a Color Palette to a Project

Follow the steps below to add a Color Palette component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Enable interactive render mode. Refer to `Static Render Mode Specifics`.
3. Add the `<DxColorPalette>` … `</DxColorPalette>` markup to a `.razor` file.
4. Configure the component (see sections below).

### API Reference

Refer to the following list for the component API reference: [DxColorPalette Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette._members).

### Static Render Mode Specifics

Blazor ColorPalette does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Selected Color

Use the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.Value) property to specify a selected color. To respond color changes, handle the [ValueChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.ValueChanged) event. You can also use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute for the `Value` property to implement [two-way data binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxColorPalette @bind-Value="@Value"></DxColorPalette>

<p><b>Selected value:</b> @Value</p>

@code {
    string Value { get; set; } = "#5BCA35";
}
```

### Color Groups

Follow the steps below to add multiple groups of colors to the palette:

1. Add `<Groups>...</Groups>` to the component markup to define the [Groups](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.Groups) collection.
2. Add [DxColorPaletteGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPaletteGroup) objects to the collection. Use the [Colors](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPaletteGroup.Colors) property to specify a or add to the palette.

### Palette Presets

The Color Palette component allows you to use predefined sets of colors (*presets*). The following presets are available:

Universal

![Universal Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-universal.png)

Universal Gradient

![Universal Gradient Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-universal-gradient.png)

Fluent Theme

![Fluent Theme Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-fluent.png)

Fluent Theme Gradient

![Fluent Theme Gradient Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-fluent-gradient.png)

Pastel

![Pastel Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-pastel.png)

Pastel Gradient

![Pastel Gradient Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-pastel-gradient.png)

Warm

![Warm Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-warm.png)

Warm Gradient

![Warm Gradient Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-warm-gradient.png)

Cold

![Cold Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-cold.png)

Cold Gradient

![Cold Gradient Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-cold-gradient.png)

Standard

![Standard Preset](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-preset-standard.png)

[Run Demo: Color Palette - Palette Presets](https://demos.devexpress.com/blazor/ColorPalette#PalettePresets)

The following code snippet adds two `color groups` that use **Warm** and **Cold** presets:

```
<DxColorPalette @bind-Value="@Value">
    <Groups>
        <DxColorPaletteGroup Header="Warm"
                             Colors="@DxColorPalettePresets.GetPalette(ColorPalettePresetType.Warm)" />
        <DxColorPaletteGroup Header="Cold"
                             Colors="@DxColorPalettePresets.GetPalette(ColorPalettePresetType.Cold)" />
    </Groups>
</DxColorPalette>

@code {
    string Value { get; set; }
}
```

![Palette Presets](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-groups.png)

### Custom Colors

You can add a group of custom colors to the Color Palette. Declare a `DxColorPaletteGroup` object and use its [Colors](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPaletteGroup.Colors) property to specify a collection of colors.

The `Colors` property accepts the following formats:

- Longhand and shorthand hexadecimal color values: `#ffff00`, `#ff0`.
- RGB and RGBA color codes: `rgb(255, 0, 0)`, `rgba(0, 230, 0, 0.3)`.
- HTML color name (case-insensitive): `red`, `DarkGreen`.

```
<DxColorPalette @bind-Value="@Value">
    <Groups>
        <DxColorPaletteGroup Header="Custom Colors" Colors="@Colors.ToList()" />
    </Groups>
</DxColorPalette>

<p><b>Selected value:</b> @Value</p>

@code {
    public List<string> Colors = new List<string> {
        "#ffffff", "#000000", "#E6E6E6", "#475467", "#4371C4", "#ED7E31", "#A5A4A5", "#FEC005", "#5A9BD5", "#72AE48",
        "#F2F2F3", "#7F7F7F", "#D0CECE", "#D4DDE3", "#DAE1F4", "#FCE5D4", "#DEECED", "#FFF2CC", "#DEEAF6", "#E1EFD9",
        "#D7D8D8", "#585959", "#AFABAB", "#ACBAC9", "#B4C5E7", "#F6CAAC", "#DBDBDB", "#FFE498", "#BCD6EE", "#C5E0B2"
    };

    string Value { get; set; }
}
```

![Palette - Custom Colors](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-custom-colors.png)

[Run Demo: Color Palette - Custom Colors](https://demos.devexpress.com/blazor/ColorPalette#CustomPalette)

### Columns

Use the [ColumnCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.ColumnCount) property to change the column count in the palette.

```
<DxColorPalette @bind-Value="@Value"
                ColumnCount="5">
    <Groups>
        <DxColorPaletteGroup Header="Warm"
                             Colors="@DxColorPalettePresets.GetPalette(ColorPalettePresetType.Warm)" />
        <DxColorPaletteGroup Header="Cold"
                             Colors="@DxColorPalettePresets.GetPalette(ColorPalettePresetType.Cold)" />
    </Groups>
</DxColorPalette>

@code {
    string Value { get; set; }
}
```

![Palette Column Count](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-column-count.png)

[Run Demo: Color Palette - Columns](https://demos.devexpress.com/blazor/ColorPalette#ColumnCount)

### Reset Color

Users can click the **No Color** tile to reset the selected color.

![Palette - No Color Tile](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-nocolortile.png)

You can set the [ShowNoColorTile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.ShowNoColorTile) property to `false` to hide the **No Color** tile.

```
<DxColorPalette @bind-Value="@Value"
                ShowNoColorTile="false"/>

@code {
    string Value { get; set; } = "#5BCA35";
}
```

[Run Demo: Color Palette - Reset Color](https://demos.devexpress.com/blazor/ColorPalette#NoColorTile)

### Tile Customization

Use the [TileCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxColorPalette.TileCssClass) property to customize tile appearance.

- [Razor](#tabpanel_Go6QY4TLqk_tabid-razor1)
- [CSS](#tabpanel_Go6QY4TLqk_tabid-css1)

```
<DxColorPalette @bind-Value="@Value" 
                TileCssClass="custom-tile-class" />

@code {
    string Value { get; set; } = "#5BCA35";
}
```

![Palette - Tile Customization](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-tile-customization.png)

[Run Demo: Color Palette - Tile Customization](https://demos.devexpress.com/blazor/ColorPalette#ColorTileCustomization)

### Add Color Palette to Other Components

You can embed a Color Palette component into other UI controls, such as or.

#### DropDownBox Integration

The following code adds the Color Palette component to the [DropDownBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox) component:

- [Razor](#tabpanel_XnH7soCopd_tabid-1)
- [CSS](#tabpanel_XnH7soCopd_tabid-2)

```
<DxDropDownBox @bind-Value="@Value"
               QueryDisplayText="@QueryText"
               NullText="Select color..."
               CssClass="cw-240">
    <DropDownBodyTemplate>
        <DxColorPalette Value="@GetColorDropDownValue(context.DropDownBox)"
                        ValueChanged="@(value => ColorDropDownValueChanged(value, context.DropDownBox))"
                        CssClass="dropdown-template-color-palette" />
    </DropDownBodyTemplate>
    <EditBoxDisplayTemplate>
        <div class="template-container">
            <span class="dxbl-image dropdown-icon-color dropdown-icon-color-background"></span>
            <DxInputBox />
        </div>
    </EditBoxDisplayTemplate>
</DxDropDownBox>

@code {
    object Value { get; set; } = "#66CDFF";
    RenderFragment GetSelectedValueDescription() {
        if (Value != null)
            return @<text>Value: @Value</text>;
        else
            return @<text>No selected color</text>;
    }
    string GetColorDropDownValue(IDropDownBox dropDownBox) {
        return dropDownBox.Value as string;
    }
    void ColorDropDownValueChanged(string value, IDropDownBox dropDownBox) {
        dropDownBox.BeginUpdate();
        dropDownBox.Value = value;
        dropDownBox.DropDownVisible = false;
        dropDownBox.EndUpdate();
    }
    string QueryText(DropDownBoxQueryDisplayTextContext arg) {
        return arg.Value as string;
    }
}
```

![Add Color Palette to DropDownBox](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-dropdownbox.png)

[Run Demo: Add Color Palette to DropDownBox](https://demos.devexpress.com/blazor/ColorPalette#DropDownBoxColorPalette)

#### Split Button Integration

The following code adds the Color Palette component to the [Split Button](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton) component.

- [Razor](#tabpanel_XnH7soCopd-1_tabid-1)
- [CSS](#tabpanel_XnH7soCopd-1_tabid-2)

```
<DxSplitButton @bind-DropDownVisible="@SplitButtonDropDownVisible"
               RenderStyle="ButtonRenderStyle.Secondary"
               IconCssClass="splitbutton-icon-color splitbutton-icon-color-background">
    <DropDownContentTemplate>
        <DxColorPalette Value="@GetColorSplitButtonValue()"
                        ValueChanged="@ColorSplitButtonValueChanged"
                        CssClass="splitbutton-template-color-palette" />
    </DropDownContentTemplate>
</DxSplitButton>

@code {
    string Value { get; set; } = "#66CDFF";
    bool SplitButtonDropDownVisible { get; set; }
    RenderFragment GetSelectedValueDescription() {
        if(Value != null)
            return @<text>Value: @Value</text>;
        else
            return @<text>No selected color</text>;
    }
    string GetColorSplitButtonValue() {
        return Value as string;
    }
    void ColorSplitButtonValueChanged(string value) {
        Value = value;
        SplitButtonDropDownVisible = false;
    }
}
```

![Add Color Palette to Split Button](https://docs.devexpress.com/Blazor/images/editors/colorpalette/blazor-color-palette-splitbutton.png)

[Run Demo: Add Color Palette to Split Button](https://demos.devexpress.com/blazor/ColorPalette#SplitButtonColorPalette)

### Keyboard Navigation

The DevExpress Blazor Color Palette supports keyboard navigation. The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab, Shift + Tab | Moves focus between color groups and the **No Color** tile. If a group has a selected color or if a user selected a color in this group before, moves focus to the corresponding tile. Otherwise, moves focus to the first tile. |
| Right Arrow | Moves focus to the next tile in the current row. When focus reaches the right edge, it moves to the next row. |
| Left Arrow | Moves focus to the previous tile in the current row. When focus reaches the left edge, it moves to the previous row. |
| Up Arrow | Moves focus to the previous row of tiles. |
| Down Arrow | Moves focus to the next row of tiles. |
| Home | Moves focus to the first tile in the current row. |
| End | Moves focus to the last tile in the current row. |

[Run Demo: Color Palette - Overview](https://demos.devexpress.com/blazor/ColorPalette)

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.