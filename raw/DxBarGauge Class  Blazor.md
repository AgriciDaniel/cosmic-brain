---
title: "DxBarGauge Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge"
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

## DxBarGauge Class

In This Article

A component that visualizes data as circular bars where each bar indicates a single value.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxBarGauge :
    GaugeBase,
    IModelProvider<BarGaugeLegendSettingsModel>,
    IModelProvider<BarGaugeLabelSettingsModel>
```

## Remarks

The DevExpress Bar Gauge for Blazor (`<DxBarGauge>`) displays data as circular bars where each bar indicates a single value. The Bar Gauge allows you to configure its geometry and layout settings, customize visual elements, and apply a custom color scheme. The component also supports export and printing functionality, and real-time data updates.

![Bar Gauge](https://docs.devexpress.com/Blazor/images/gauge/bar-gauge.png)

[Run Demo: Bar Gauge](https://demos.devexpress.com/blazor/BarGaugeGeometry) [Run Demo: Bar Gauge - Real Time Data](https://demos.devexpress.com/blazor/BarGaugeRealTimeData)

### Add a Bar Gauge to a Project

Follow the steps below to add a Bar Gauge component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxBarGauge>` … `</DxBarGauge>`.
3. Specify the [Values](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.Values) property to bind the component to data.
4. Configure the component’s visual elements (see sections below).

- `DxBarGauge`
	- [DxGaugeAnimationSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGaugeAnimationSettings)
		- [DxGaugeGeometrySettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGaugeGeometrySettings)
		- [DxBarGaugeLabelSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings)
		- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
		- [DxBarGaugeLegendSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLegendSettings)
		- [DxLegendTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLegendTitleSettings)
			- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
						- [DxMarginSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMarginSettings)
						- [DxLegendSubtitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLegendSubtitleSettings)
				- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxBorderSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBorderSettings)
				- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxMarginSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMarginSettings)
				- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
		- [DxTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTitleSettings)
		- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxMarginSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMarginSettings)
				- [DxSubtitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSubtitleSettings)
			- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
		- [DxTooltipSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings)
		- [DxBorderSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBorderSettings)
				- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxShadowSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxShadowSettings)
				- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
		- [DxMarginSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMarginSettings)

### API Reference

Refer to the following list for the component API reference: [DxBarGauge Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge._members).

### Static Render Mode Specifics

Blazor Bar Gauge support static render mode to display data as static images. To use other features, [enable interactivity](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode) on a Razor page, and allow chart components to execute scripts and display data.

### Bars

The `<DxBarGauge>` component displays data as circular bars. Each bar consists of a colored part that indicates a value and the background track that indicates the value range. To display data, assign an array of values to the [Values](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.Values) property.

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="-5"
            EndValue="5"
            Values="@Values">
    @* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { -2.13, 1.48, -3.09, 4.52, 4.9, 3.9 };
    // ...
}
```

#### Scale Range

`<DxBarGauge>` renders bars from the beginning of the gauge’s scale. To define the scale range, use [StartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.StartValue) and [EndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.EndValue) properties. You can also specify the [BaseValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.BaseValue) property to shift the bar origin.

The following code snippet changes the bar gauge’s scale range and sets the base value:

![Bar Gauge - Base Value](https://docs.devexpress.com/Blazor/images/gauge/bar-gauge-base-value.png)

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="-5"
            EndValue="5"
            BaseValue="0"
            Values="@Values">
    @* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { -2.13, 1.48, -3.09, 4.52, 4.9, 3.9 };
    // ...
}
```

#### Arrangement and Geometry

`<DxBarGauge>` allows you to customize bar arrangement. You can use the following properties:

[BarSpacing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.BarSpacing)

Specifies the distance between bars.

[InnerRadius](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.InnerRadius)

Specifies the relative radius of the innermost circular bar.

Additionally, you can add a [DxGaugeGeometrySettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGaugeGeometrySettings) object to bar gauge markup to customize the gauge arc’s shape. [DxGaugeGeometrySettings.StartAngle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGaugeGeometrySettings.StartAngle) and [DxGaugeGeometrySettings.EndAngle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGaugeGeometrySettings.EndAngle) properties are available.

The following code snippet changes the shape of the `DxBarGauge` ‘s arc to a circle:

![Bar Gauge - Geometry Customization](https://docs.devexpress.com/Blazor/images/gauge/geometry-customization.png)

```
<DxBarGauge Width="100%"
            Height="300px"
            StartValue="0"
            EndValue="100"
            Values="@Values">
    <DxGaugeGeometrySettings StartAngle="-90"
                             EndAngle="270"/>
    @* ...*@
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
}
```

[Run Demo: Bar Gauge - Geometry](https://demos.devexpress.com/blazor/BarGaugeGeometry)

### Labels

Add a [DxBarGaugeLabelSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings) object to bar gauge markup to configure bar labels. You can specify object root-level properties (for example, [ConnectorColor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings.ConnectorColor) or [Indent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings.Indent) ) or add and configure the following nested objects:

[DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)

Contains the element’s font settings.

[DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)

Contains the element’s format settings.

Additionally, you can use the [DxBarGauge.LabelOverlap](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.LabelOverlap) property to specify how the Bar Gauge resolves label overlap.

To hide bar labels, set the [DxBarGaugeLabelSettings.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings.Visible) property to `false`.

The following code snippet configures `DxBarGauge` labels:

![Bar Gauge - Label Customization](https://docs.devexpress.com/Blazor/images/gauge/label-customization.png)

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="0"
            EndValue="100"
            Values="@Values">
    <DxBarGaugeLabelSettings Indent="30"
                             ConnectorColor="purple"
                             ConnectorWidth="4">
        <DxFontSettings Weight="600" />
        <DxTextFormatSettings LdmlString="@LabelFormat" />
    </DxBarGaugeLabelSettings>
    @* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    string LabelFormat = "##.#'%' ";
    // ...
}
```

Refer to the [DxBarGaugeLabelSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLabelSettings) class description for additional information.

### Legend

The bar gauge legend helps a user identify bars. The legend displays items (one per a bar) that consist of a marker and caption. Follow the steps below to create and display a legend:

1. Add a [DxBarGaugeLegendSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLegendSettings) object to bar gauge markup.
2. Enable the [DxBarGaugeLegendSettings.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.LegendBaseSettings-2.Visible) property.
3. *Optional*. Configure legend settings. You can specify root-level properties (for example, [Orientation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.LegendBaseSettings-2.Orientation) or [ItemCaptions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLegendSettings.ItemCaptions) ) or add and configure the legend’s [nested objects](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLegendSettings#nested-objects).

The following code snippet adds a legend to the `DxBarGauge` component and configures legend settings:

![Bar Gauge - Legend Customization](https://docs.devexpress.com/Blazor/images/gauge/customize-legend.png)

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="0"
            EndValue="100"
            Values="@Values">
    <DxBarGaugeLegendSettings Visible="true"
                              ItemCaptions="@LegendItemCaptions"
                              VerticalAlignment="VerticalEdge.Bottom"
                              HorizontalAlignment="HorizontalAlignment.Center">
        <DxLegendTitleSettings Text="Series">
            <DxFontSettings Color="purple" Weight="700" />
        </DxLegendTitleSettings>
        <DxBorderSettings Visible="true" Color="purple" />
        <DxFontSettings Weight="300" />
        <DxMarginSettings Top="30" />
    </DxBarGaugeLegendSettings>
    @* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    string[] LegendItemCaptions = new string[] { "Metacritic", "Ratingraph.com", "Rotten Tomatoes", "IMDb", "TV.com" };
}
```

Refer to the [DxBarGaugeLegendSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGaugeLegendSettings) class description for additional information.

### Titles and Subtitles

The `<DxBarGauge>` component can display titles and subtitles for the bar gauge area and legend. Add the following objects to component markup to configure title and subtitle settings:

[DxTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTitleSettings)

Contains title settings.

[DxSubtitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSubtitleSettings)

Contains subtitle settings.

[DxLegendTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLegendTitleSettings)

Contains settings for the legend title.

[DxLegendSubtitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLegendSubtitleSettings)

Contains settings for the legend subtitle.

The following code snippet customizes the `Bar Gauge` ‘s title and subtitle:

![Bar Gauge - Title and Subtitle Customization](https://docs.devexpress.com/Blazor/images/gauge/customize-title-subtitle.png)

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="0"
            EndValue="100"
            Values="@Values">
    <DxTitleSettings Text="Custom Title"
                     VerticalAlignment="VerticalEdge.Bottom">
        <DxFontSettings Size="28" Weight="600" />
        <DxSubtitleSettings Text="Custom Subtitle">
            <DxFontSettings Opacity="0.5" Weight="500" />
        </DxSubtitleSettings>
    </DxTitleSettings>
    @* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    // ...
}
```

### Tooltips

The `DxBarGuage` component displays tooltips when a user hovers a mouse pointer over bars. To create tooltips, follow the steps below:

1. Add a [DxTooltipSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings) object to bar gauge markup.
2. Set the [DxTooltipSettings.Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings.Enabled) property to `true`.
3. *Optional*. Configure tooltip settings. You can specify root-level properties (for example, [Color](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings.Color) or [CornerRadius](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings.CornerRadius) ) or add and configure [nested objects](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings#nested-objects).

The following code snippet configures tooltips in the `DxBarGauge` component:

![Bar Gauge - Tooltip Settings](https://docs.devexpress.com/Blazor/images/gauge/bar-gauge-tooltip-settings.png)

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="0"
            EndValue="100"
            Values="@Values">
    @* ... *@
    <DxTooltipSettings Enabled="true" Color="lightyellow" >
        <DxFontSettings Size="16" Weight="600" />
        <DxTextFormatSettings LdmlString="@LabelFormat" />
        <DxShadowSettings Blur="8" Color="purple" />
        <DxBorderSettings LineStyle="LineStyle.DashDotDot" Width="2" Color="purple" />
    </DxTooltipSettings>
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    string LabelFormat = "##.# '%' ";
}
```

Refer to the [DxTooltipSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTooltipSettings) class description for additional information.

### Customization

This section describes settings that allow you to customize the appearance of the bar gauge component and its container.

#### Palette

`<DxBarGauge>` allows you to create a custom palette for bars. To apply a palette, assign it to the [Palette](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.Palette) property.

When the number of bars exceeds the number of palette colors, you can use the [PaletteExtensionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.PaletteExtensionMode) property to specify how to extend the palette.

The following example uses drop-down menus to change the color palette and its extension mode in `DxBarGauge`:

```
<DxBarGauge Width="100%"
            Height="500px"
            StartValue="-5"
            EndValue="5"
            BaseValue="0"
            PaletteExtensionMode="@CurrentPaletteMode"
            Palette="@Colors[CurrentPalette]"
            Values="@Values">
    @* ... *@
</DxBarGauge>

@code {
    public enum Palettes {
        Material,
        Bootstrap,
        Tailwind
    }
    Dictionary<Palettes, string[]> Colors = new Dictionary<Palettes, string[]>() {
        { Palettes.Material, new string[] { "#1db2f5", "#f5564a", "#97c95c" } },
        { Palettes.Bootstrap, new string[] { "#0d6efd", "#6c757d", "#28a745" } },
        { Palettes.Tailwind, new string[] { "#ef4444", "#eab308", "#22c55e" } }
    };
    Palettes CurrentPalette = Palettes.Material;
    PaletteExtensionMode CurrentPaletteMode = PaletteExtensionMode.Alternate;
    double[] Values = new double[] { -2.13, 1.48, -3.09, 4.52, 4.9, 3.9 };
    // ...
}
```

[Run Demo: Bar Gauge - Palette](https://demos.devexpress.com/blazor/BarGaugePalette)

Additionally, you can specify the [BackgroundColor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxBarGauge.BackgroundColor) property to customize the bar background color.

#### Size

Use [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.Width) properties to specify the size of the component container. When the container size changes at runtime, the component is redrawn. To disable this behavior, set the [RedrawOnResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.RedrawOnResize) property to `false`.

You can also use a [DxMarginSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMarginSettings) object to add margins between the widget and container borders.

The following code snippet sets the bar gauge size and configures margin settings:

![Bar Gauge - Size and Margins](https://docs.devexpress.com/Blazor/images/gauge/bar-gauge-add-margins.png)

- [Razor](#tabpanel_HLdwfO5mRt_tabid-razor1)
- [CSS](#tabpanel_HLdwfO5mRt_tabid-css1)

```
<DxBarGauge Width="600px"
            Height="300px"
            StartValue="0"
            EndValue="100"
            CssClass="myCssClass"
            Values="@Values">
    <@* ... *@
    <DxMarginSettings Top="20" Right="30" Bottom="20" Left="30"/>
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    // ...
}
```

#### CSS Customization

Use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.CssClass) property to customize the appearance of the component’s container. The following code snippet adds borders to the bar gauge container and sets its background color:

![Bar Gauge - CSS Class](https://docs.devexpress.com/Blazor/images/gauge/bar-gauge-css-class.png)

- [Razor](#tabpanel_HLdwfO5mRt-1_tabid-razor1)
- [CSS](#tabpanel_HLdwfO5mRt-1_tabid-css1)

```
<DxBarGauge Width="600px"
            Height="300px"
            StartValue="0"
            EndValue="100"
            CssClass="myCssClass"
            Values="@Values">
    <@* ... *@
</DxBarGauge>

@code {
    double[] Values = new double[] { 47.27, 65.32, 84.59, 81.86, 99 };
    // ...
}
```

### Export and Printing

`<DxBarGauge>` allows you to export and print its data. Call the [PrintAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.PrintAsync) method to invoke the browser’s **Print** dialog.

To export bar gauge data, call the [ExportToAsync(String, DataExportFormat)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.ExportToAsync\(System.String-DevExpress.Blazor.DataExportFormat\)) method. After the file is exported, the component raises the [Exported](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.Exported) event.

`<DxBarGauge>` also allows you to get its SVG markup with a [GetSvgMarkupAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.GetSvgMarkupAsync) method call.

The following code snippet displays a custom **Export to PDF** button that exports component data to a PDF file. The [Exported](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.GaugeBase.Exported) event is handled to show information about the exported file:

```
@inject IJSRuntime JSRuntime

<DxBarGauge Width="100%"
            Height="500px"
            @ref="@BarGauge"
            Exported="@OnExported"
            StartValue="-5"
            EndValue="5"
            BaseValue="0"
            Values="@Values">
    @* ...*@
</DxBarGauge>

<DxButton Text="Export to PDF" Click="@ExportToPdf" />

@code {
    DxBarGauge BarGauge;
    string fileName = "Custom PDF";

    async Task ExportToPdf() {
        await BarGauge.ExportToAsync(fileName, DataExportFormat.Pdf);
    }
    async Task OnExported() {
        await JSRuntime.InvokeVoidAsync("alert", $"The Bar Gauge is exported to the {fileName} file.");
    }

    double[] Values = new double[] { -2.13, 1.48, -3.09, 4.52, 4.9, 3.9 };
    // ...
}
```