---
title: "DxRangeSelector Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector#bind-to-data"
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

## DxRangeSelector Class

In This Article

An interactive component that visualizes data on a linear scale and allows users to select a value range.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxRangeSelector :
    ClientComponentJSInterop,
    IModelProvider<RangeSelectorChartModel>,
    IModelProvider<TitleSettingsModel>,
    IModelProvider<RangeSelectorBackgroundModel>,
    IModelProvider<RangeSelectorIndentModel>,
    IModelProvider<RangeSelectorShutterModel>,
    IModelProvider<RangeSelectorScaleModel>,
    IModelProvider<RangeSelectorSliderHandleModel>,
    IModelProvider<RangeSelectorSliderMarkerModel>
```

## Remarks

The DevExpress Range Selector for Blazor (`<DxRangeSelector>`) visualizes data on a linear scale. Users can change selection by dragging sliders or moving the entire selected range.

![Range Selector - Overview](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-overview.png)

[Run Demo: Overview](https://demos.devexpress.com/blazor/RangeSelectorOverview) [Run Demo: Filtering](https://demos.devexpress.com/blazor/RangeSelectorFiltering) [Run Demo: Discrete Scale](https://demos.devexpress.com/blazor/RangeSelectorDiscreteScale)

- `DxRangeSelector`
	- [DxTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTitleSettings)
		- [DxRangeSelectorScale](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale)
		- [DxChartScaleBreak](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartScaleBreak)
				- [DxRangeSelectorScaleTick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleTick)
				- [DxRangeSelectorScaleMinorTick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMinorTick)
				- [DxRangeSelectorScaleLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleLabel)
			- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
						- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
				- [DxRangeSelectorScaleMarker](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarker)
			- [DxRangeSelectorScaleMarkerLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarkerLabel)
				- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
		- [DxRangeSelectorChart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart)
		- [DxRangeSelectorChartValueAxis](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis)
				- [Individual Series](https://docs.devexpress.com/Blazor/405041/components/charts/series-types)
			- [DxChartSeriesPoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesPoint)
				- [DxChartSeriesPointImage](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesPointImage)
						- [DxChartSeriesLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabel)
				- [DxChartSeriesLabelConnector](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabelConnector)
								- [DxChartFont](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont)
								- [DxChartSeriesLabelBorder](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabelBorder)
						- [DxChartSeriesValueErrorBar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesValueErrorBar)
						- [DxChartAggregationSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAggregationSettings)
						- [DxChartSeriesLegendItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLegendItem)
				- [DxChartSeriesLegendItem.TextTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLegendItem.TextTemplate)
						- [DxChartFinancialReduction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFinancialReduction) (for [financial series](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFinancialSeriesBase-3))
		- [DxRangeSelectorSliderHandle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderHandle)
		- [DxRangeSelectorSliderMarker](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker)
		- [DxFontSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFontSettings)
				- [DxTextFormatSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextFormatSettings)
		- [DxRangeSelectorBackground](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground)
		- [DxRangeSelectorShutter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorShutter)
		- [DxRangeSelectorIndent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorIndent)

### Add a Range Selector to a Project

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. on a Razor page.
3. Add the following markup to a `.razor` file: `<DxRangeSelector>` … `</DxRangeSelector>`.
4. the component to data.
5. Select if the component displays data as a or.
6. Configure options.
7. *Optional*. Customize the component and its visual elements (see sections below).

### API Reference

Refer to the following list for the component API reference: [DxRangeSelector Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector._members).

### Static Render Mode Specifics

Blazor Range Selector supports static render mode to display static data in a single page. For other features, you need to [enable interactivity](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode) on a Razor page and allow the component to execute scripts and display data.

### Bind to Data

Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Data) property to bind the `Range Selector` to data. Follow the steps below to display data within the component:

1. Bind the `Data` parameter to a C# field or property.
2. Populate this field or property with data in the [OnInitialized](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle#component-initialization-oninitializedasync) lifecycle method.

![Range Selector - Display a Chart](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-chart.png)

- [DataSource](#tabpanel_kjsqOxI3C7_tabid-csharp1)
- [Razor](#tabpanel_kjsqOxI3C7_tabid-razor1)

```
<DxRangeSelector Data="@Data">
    <DxTitleSettings Text="Population by Country, 2023" />
    <DxRangeSelectorChart>
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
</DxRangeSelector>

@code {
    List<PopulationPoint> Data;
    protected override void OnInitialized() {
        Data = GetData();
    }
}
```

You can handle the [Rendered](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Rendered) event to run custom code when component rendering is finished and the Range Selector is loaded.

### Range Selection

The Range Selector displays two sliders that determine the selected range. Sliders consist of [handles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderHandle) and [markers](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker) that display selected values.

![Range Selector - Sliders](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-sliders.png)

Users can change selected range in the following manner:

- Drag slider handles.
- Click outside the current range to shift selection ([MoveSelectedRangeByClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.MoveSelectedRangeByClick)).
- Use the mouse to select a new range ([AllowMouseSelection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.AllowMouseSelection)).

You can also use the following options to configure the component’s behavior on range selection:

[AllowSliderSwap](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.AllowSliderSwap)

Specifies whether users can swap [sliders](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker).

[SnapSliderToTicks](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SnapSliderToTicks)

Specifies whether to dock the dropped slider to the nearest tick.

#### Select a Range in Code

The Range Selector allows you to select a range in code. To set a range, use one of the following options:

- Specify both [SelectedRangeStartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeStartValue) and [SelectedRangeEndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeEndValue) properties.
- Specify [SelectedRangeLength](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeLength) and [SelectedRangeStartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeStartValue) / [SelectedRangeEndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeEndValue) properties.
- Specify the [SelectedRangeLength](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeLength) property only. When you leave [SelectedRangeStartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeStartValue) and [SelectedRangeEndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeEndValue) properties unspecified, the Range Selector component uses the [last scale value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.EndValue) as the range’s end value.

When you leave the range unset, it matches the entire scale at the first component render.

The following code snippets specify a predefined range on the first render. Switch code tabs to see possible options.

![Range Selector - Set Selected Range](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-selected-range.png)

- [Values](#tabpanel_jwBi-83RKn_tabid-values)
- [Length](#tabpanel_jwBi-83RKn_tabid-length)

```
<DxRangeSelector Width="1100px"
                 Height="200px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          TickInterval="ChartAxisInterval.Week"
                          MinorTickInterval="ChartAxisInterval.Day"
                          MinRange="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleMarker>
            <DxRangeSelectorScaleMarkerLabel>
                <DxTextFormatSettings Type="TextFormat.MonthAndYear" />
            </DxRangeSelectorScaleMarkerLabel>
        </DxRangeSelectorScaleMarker>
    </DxRangeSelectorScale>
    <DxRangeSelectorSliderMarker>
        <DxTextFormatSettings Type="TextFormat.MonthAndDay" />
    </DxRangeSelectorSliderMarker>
</DxRangeSelector>
```

#### Limit the Range Length

Use [DxRangeSelectorScale.MinRange](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MinRange) and [DxRangeSelectorScale.MaxRange](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MaxRange) properties to specify the minimum and maximum range that users can select on the scale. When a user tries to select an invalid range, the component behaves as follows:

- Changes the slider marker color (the [DxRangeSelectorSliderMarker.InvalidRangeColor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker.InvalidRangeColor) property).
- Docks the dropped slider to the nearest valid value (tick) within the specified range length.

Note that [MinRange](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MinRange) and [MaxRange](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MaxRange) properties do not apply to [discrete](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.Type) scales. The component also ignores these properties on the first render if you.

The following code snippet sets the minimum range to a week and the maximum range to a month:

```
<DxRangeSelector Width="1100px"
                 Height="200px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          TickInterval="ChartAxisInterval.Week"
                          MinorTickInterval="ChartAxisInterval.Day"
                          MinRange="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleMarker>
            <DxRangeSelectorScaleMarkerLabel>
                <DxTextFormatSettings Type="TextFormat.MonthAndYear" />
            </DxRangeSelectorScaleMarkerLabel>
        </DxRangeSelectorScaleMarker>
    </DxRangeSelectorScale>
    <DxRangeSelectorSliderMarker>
        <DxTextFormatSettings Type="TextFormat.MonthAndDay" />
    </DxRangeSelectorSliderMarker>
</DxRangeSelector>
```

#### React to Selection Changes

The [ValueChangeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.ValueChangeMode) property switches between live or delayed range updates:

- `OnHandleMove`: selection changes while a user moves a handle.
- `OnHandleRelease`: selection changes when a user releases a handle.

To respond to value changes, handle the [ValueChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.ValueChanged) event.

You can also use the [SelectedRangeUpdateMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeUpdateMode) property to specify how the selected range should behave if new values are added to the data source.

The following code snippet sets the value change mode to `OnHandleMove`, obtains values of the current range in a [ValueChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.ValueChanged) event handler, and displays the number of selected days:

```
<span><b>@DaysCount days are selected</b></span>
<DxRangeSelector Width="1100px"
                 Height="200px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))"
                 ValueChanged="@OnValueChanged"
                 ValueChangeMode="RangeSelectorValueChangeMode.OnHandleMove">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          TickInterval="ChartAxisInterval.Week"
                          MinorTickInterval="ChartAxisInterval.Day"
                          MinRange="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleMarker>
            <DxRangeSelectorScaleMarkerLabel>
                <DxTextFormatSettings Type="TextFormat.MonthAndYear" />
            </DxRangeSelectorScaleMarkerLabel>
        </DxRangeSelectorScaleMarker>
    </DxRangeSelectorScale>
    <DxRangeSelectorSliderMarker>
        <DxTextFormatSettings Type="TextFormat.MonthAndDay" />
    </DxRangeSelectorSliderMarker>
</DxRangeSelector>

@code {
    double DaysCount { get; set; } = 14;
    void OnValueChanged(RangeSelectorValueChangedEventArgs args) {
        var startDate = args.CurrentRange.FirstOrDefault() as DateTime?;
        var endDate = args.CurrentRange.LastOrDefault() as DateTime?;
        if (startDate != null && endDate != null)
            DaysCount = (endDate - startDate).Value.TotalDays;
    }
}
```

### Scale

The Range Selector displays values on a linear scale. To manage the scale, add a [DxRangeSelectorScale](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale) object to the component markup. You can specify [DxRangeSelectorScale](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale) class properties or add nested objects to customize the scale’s visual elements.

The image below demonstrates visual elements related to the scale:

![Range Selector - Scale Elements](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-scale-elements.png)

#### Scale Range

The Range Selector creates a scale based on the bound data source (the [DxRangeSelector.Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Data) property). Use [StartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.StartValue) and [EndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.EndValue) properties to limit the scale’s visual range.

```
<DxRangeSelector Width="1100px"
                 Height="200px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          MinorTickInterval="ChartAxisInterval.Day"
                          TickInterval="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          MinRange="ChartAxisInterval.Week"
                          ValueType="ChartAxisDataType.DateTime">
        @* ... *@
    </DxRangeSelectorScale>
    @* ... *@
</DxRangeSelector>
```

#### Tick Intervals

The Range Selector calculates major and minor tick intervals automatically based on data source values. You can use the following properties to change intervals:

[TickInterval](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.TickInterval) | [MinorTickInterval](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MinorTickInterval)

Set custom intervals for major and minor ticks.

[MinorTickCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.MinorTickCount)

Specifies the number of minor ticks between two neighboring major ticks.

The following code snippet sets the major tick interval to a week and the minor tick interval to a day:

```
<DxRangeSelector Width="1100px"
                 Height="200px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          MinorTickInterval="ChartAxisInterval.Day"
                          TickInterval="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          MinRange="ChartAxisInterval.Week"
                          ValueType="ChartAxisDataType.DateTime">
        @* ... *@
    </DxRangeSelectorScale>
    @* ... *@
</DxRangeSelector>
```

### Chart

The DevExpress Blazor Range Selector component allows you to visualize data as a chart. Follow the steps below to display a chart:

1. Use the [DxRangeSelector.Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Data) property to bind the component to a data source.
2. Declare a [DxRangeSelectorChart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart) object.
3. Add an appropriate series object to the chart markup and populate the chart with arguments and values.

![Range Selector - Display a Chart](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-chart.png)

[Run Demo: Overview](https://demos.devexpress.com/blazor/RangeSelectorOverview) [Run Demo: Discrete Scale](https://demos.devexpress.com/blazor/RangeSelectorDiscreteScale)

#### Series

The `DxRangeSelectorChart` component supports the same series types as the Blazor [DxChart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1) component. To create a series, choose a series type and specify its `ArgumentField` and `ValueField` properties.

The following code snippet creates a chart with bars where each bar corresponds to a country’s population (see the image above):

- [DataSource](#tabpanel_lx+Tm4ZuPx_tabid-csharp1)
- [Razor](#tabpanel_lx+Tm4ZuPx_tabid-razor1)

```
<DxRangeSelector Width="700px"
                 Height="300px"
                 Data="@Data">
    <DxTitleSettings Text="Population by Country, 2023" />
    <DxRangeSelectorChart>
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
</DxRangeSelector>

@code {
    List<PopulationPoint> Data;
    protected override void OnInitialized() {
        Data = GetData();
    }
}
```

Refer to the following article for additional information about available series types: [Series Types in Blazor Charts](https://docs.devexpress.com/Blazor/405041/components/charts/series-types).

[DxRangeSelectorChart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart) class APIs include the following series-specific options:

- [BarGroupPadding](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.BarGroupPadding) | [BarGroupWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.BarGroupWidth)
- [MinBubbleSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.MinBubbleSize) | [MaxBubbleSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.MaxBubbleSize)
- [NegativesAsZeroes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.NegativesAsZeroes)

You can also use [TopIndent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.TopIndent) and [BottomIndent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.BottomIndent) properties to position a series on a chart pane.

#### Axes

[DxRangeSelectorScale](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale) and [DxRangeSelectorChartValueAxis](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis) objects define axes in the Range Selector’s chart. Add these objects to the component markup to manage axes.

![Range Selector - Chart Axes](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-chart-axes.png)

The value axis does not support any visual elements while the scale displays [labels](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleLabel) and [markers](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarker) (see the section).

##### Axis Types

The Range Selector component supports the following axis types:

Continious

Displays numeric and [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) arguments/values.

Discrete

Displays string arguments/values (categories).

Logarithmic

Displays numeric arguments/values that grow exponentially. Each axis tick value is a specified [logarithm base](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisBase-1.LogarithmBase) raised to a power (10⁻², 10⁻¹, 10⁰, 10¹, 10², and so on).

Range Selector determines axis types based on the data type of the first series in the chart markup. You can use [DxRangeSelectorScale.Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.Type) and [DxRangeSelectorChartValueAxis.Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis) properties to change axis types.

You may need to cast values specified in the data source. For example, you must do it if data source stores dates or numbers as strings. Use [DxRangeSelectorScale.ValueType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.ValueType) and [DxRangeSelectorChartValueAxis.ValueType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis.ValueType) properties to specify axis value types.

- [DataSource](#tabpanel_RZFDrApSs9_tabid-csharp1)
- [Razor](#tabpanel_RZFDrApSs9_tabid-razor1)

```
<DxRangeSelector Width="1200px"
                 Height="300px"
                 Data="@Data">
    <DxTitleSettings Text="Population by Country, 2023" />
    <DxRangeSelectorChart>
        <DxRangeSelectorChartValueAxis ValueType="ChartAxisDataType.Numeric" />
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
</DxRangeSelector>

@code {
    List<PopulationPoint> Data;
    protected override void OnInitialized() {
        Data = GetData();
    }
}
```

##### Axis Ranges

The `<DxRangeSelector>` component allows you to define start/min and end/max axis values. Use the following properties:

- [StartValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.StartValue) and [EndValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScale.EndValue) properties for the scale.
- [MinValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis.MinValue) and [MaxValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChartValueAxis.MaxValue) for the value axis.

![Range Selector - Limit Axes](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-chart-limit-axes.png)

- [DataSource](#tabpanel_RZFDrApSs9-1_tabid-csharp)
- [Razor](#tabpanel_RZFDrApSs9-1_tabid-razor)

```csharp
public List<RangePoint> GenerateData() {
    return new List<RangePoint>() {
        new RangePoint { Arg = 10, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 20, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 40, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 50, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 60, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 75, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 80, Y1 = 30, Y2 = 50, Y3 = 13 },
        new RangePoint { Arg = 90, Y1 = 40, Y2 = 50, Y3 = 14 },
        new RangePoint { Arg = 100, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 105, Y1 = 40, Y2 = 175, Y3 = 120 },
        new RangePoint { Arg = 110, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 120, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 130, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 140, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 150, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 160, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 170, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 180, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 185, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 190, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 200, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 210, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 220, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 230, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 240, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 255, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 270, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 280, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 290, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 295, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 300, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 310, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 320, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 330, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 340, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 350, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 360, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 367, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 370, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 380, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 390, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 400, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 410, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 420, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 430, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 440, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 450, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 460, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 470, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 480, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 490, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 500, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 510, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 520, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 530, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 540, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 550, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 555, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 560, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 570, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 580, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 590, Y1 = 40, Y2 = 95, Y3 = 12 },
        new RangePoint { Arg = 600, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 610, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 620, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 630, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 640, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 650, Y1 = -20, Y2 = 20, Y3 = 30 }
    };
}
public class RangePoint {
    public int Arg { get; set; }
    public int Y1 { get; set; }
    public int Y2 { get; set; }
    public int Y3 { get; set; }
}
```

### Title and Subtitle

The `<DxRange Selector>` component can display a title and subtitle. Add [DxTitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTitleSettings) and [DxSubtitleSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSubtitleSettings) objects to the component markup to configure title and subtitle settings.

The following code snippet displays and customizes the Range Selector’s title:

![Range Selector - Title Customization](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-title.png)

```
<DxRangeSelector Width="700px"
                 Height="300px"
                 Data="@Data">
    <DxTitleSettings Text="Population by Country, 2023" VerticalAlignment="VerticalEdge.Bottom">
        <DxFontSettings Weight="700" Opacity="0.6" />
    </DxTitleSettings>
    <DxRangeSelectorChart>
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
</DxRangeSelector>

@code {
    List<PopulationPoint> Data;
    protected override void OnInitialized() {
        Data = GetData();
    }
}
```

### Export and Printing

The `<DxRangeSelector>` component allows you to export and print its data. Call the [PrintAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.PrintAsync) method to invoke the browser’s **Print** dialog.

To export component data, call the [ExportToAsync(String, DataExportFormat)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.ExportToAsync\(System.String-DevExpress.Blazor.DataExportFormat\)) method. After the file is exported, the component raises the [Exported](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Exported) event.

Call the [GetSvgMarkupAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.GetSvgMarkupAsync) method to obtain the Range Selector’s SVG markup.

The following code snippet displays a custom **Export to PDF** button that exports component data to a PDF file. The `Exported` event handler displays information about the exported file:

- [PopulationData](#tabpanel_RZFDrApSs9-2_tabid-csharp2)
- [Razor](#tabpanel_RZFDrApSs9-2_tabid-razor2)

```
@rendermode InteractiveServer

<DxRangeSelector Width="1000px"
                 Height="400px"
                 @ref="RangeSelector"
                 Data="@Data"
                 Exported="@OnExported"
                 ValueChangeMode="RangeSelectorValueChangeMode.OnHandleMove">
    <DxTitleSettings Text="Population by Country, 2023" />
    <DxRangeSelectorChart>
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
</DxRangeSelector>

<DxButton Text="Export to PDF" Click="@ExportToPdf" />

@code {
    DxRangeSelector RangeSelector;
    string fileName = "RangeSelector.pdf";

    async Task ExportToPdf() {
        await RangeSelector.ExportToAsync("Range Selector", DataExportFormat.Pdf);
    }

    async Task OnExported() {
        await JSRuntime.InvokeVoidAsync("alert", $"The Range Selector is exported to the {fileName} file.");
    }

    List<PopulationPoint> Data;
    protected override void OnInitialized() {
        Data = GetData();
    }
}
```

### Size

Use [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.Width) properties to specify the size of the `<DxRangeSelector>` component.

```
<DxRangeSelector Width="800px"
                 Height="400px"
                 Data="@Data">
    @* ... *@
</DxRangeSelector>
```

When the container size changes at runtime, the component is redrawn. To disable this behavior, set the [RedrawOnResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.RedrawOnResize) property to `false`.

You can also configure indents between the Range Selector’s container edges and the scale. Add a [DxRangeSelectorIndent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorIndent) object to the component markup and specify [Left](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorIndent.Left) and [Right](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorIndent.Right) properties.

![Range Selector - Container Indents](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-container-indents.png)

```
<DxRangeSelector Width="1000px"
                 Height="100px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          MinorTickInterval="ChartAxisInterval.Day"
                          TickInterval="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          MinRange="ChartAxisInterval.Week"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleMarker Visible="false" />
    </DxRangeSelectorScale>
    <DxRangeSelectorIndent Left="35" Right="35" />
</DxRangeSelector>
```

### Customization

This section describes settings that allow you to customize the appearance of the Range Selector component and its elements.

#### Individual Elements

The Range Selector supports customization options for individual visual elements. The table below lists such elements, their markup objects/customization properties, and corresponding visibility settings (if any).

| Elements | Markup object/Property | Visibility Option |
| --- | --- | --- |
| Selected range | [DxRangeSelector.SelectedRangeColor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelector.SelectedRangeColor) | Always visible |
| Slider markers | [DxRangeSelectorSliderMarker](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker) | [DxRangeSelectorSliderMarker.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderMarker.Visible) |
| Slider handles | [DxRangeSelectorSliderHandle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorSliderHandle) | Always visible |
| Scale major ticks | [DxRangeSelectorScaleTick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleTick) | Always visible |
| Scale minor ticks | [DxRangeSelectorScaleMinorTick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMinorTick) | [DxRangeSelectorScaleMinorTick.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMinorTick.Visible) |
| Scale label | [DxRangeSelectorScaleLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleLabel) | [DxRangeSelectorScaleLabel.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleLabel.Visible) |
| Scale marker | [DxRangeSelectorScaleMarker](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarker) | [DxRangeSelectorScaleMarker.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarker.Visible) |
| Scale marker label | [DxRangeSelectorScaleMarkerLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarkerLabel) | Depends on the [DxRangeSelectorScaleMarker.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorScaleMarker.Visible) setting |

The following code snippet sets up a `DateTime` scale, customizes slider markers, and hides scale markers:

![Range Selector - Slider Marker Customization](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-slider-marker-customization.png)

```
<DxRangeSelector Width="1000px"
                 Height="400px"
                 SelectedRangeStartValue="@(new DateTime(2024, 2, 1))"
                 SelectedRangeEndValue="@(new DateTime(2024, 2, 14))">
    <DxRangeSelectorSliderMarker PaddingLeftRight="5"
                                 PaddingTopBottom="10"
                                 Color="#28a745">
        <DxFontSettings Weight="600" />
        <DxTextFormatSettings Type="TextFormat.ShortDate" />
    </DxRangeSelectorSliderMarker>
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 1, 1))"
                          EndValue="@(new DateTime(2024, 6, 1))"
                          MinorTickInterval="ChartAxisInterval.Day"
                          TickInterval="ChartAxisInterval.Week"
                          MaxRange="ChartAxisInterval.Month"
                          MinRange="ChartAxisInterval.Week"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleMarker Visible="false" />
    </DxRangeSelectorScale>
</DxRangeSelector>
```

#### Background and Shutters

Add a [DxRangeSelectorBackground](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground) object to the `DxRangeSelector` component markup to customize the component’s background area. You can apply the following customizations:

- Display an image ([ImageUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground.ImageUrl) and [ImagePosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground.ImagePosition))
- Set the [background color](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground.Color)

To disable background customizations, set the [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorBackground.Enabled) property to `false`.

![Range Selector - Background Customization](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-background-customization.png)

```
<DxRangeSelector Width="800px"
                 Height="200px">
    <DxRangeSelectorScale StartValue="@(new DateTime(2024, 8, 29, 0, 0, 0))"
                          EndValue="@(new DateTime(2024, 8, 29, 23, 59, 59))"
                          MinorTickInterval="ChartAxisInterval.Hour"
                          TickInterval="ChartAxisInterval.Hours(2)"
                          PlaceholderHeight="20"
                          ValueType="ChartAxisDataType.DateTime">
        <DxRangeSelectorScaleLabel Visible="true">
            <DxTextFormatSettings Type="TextFormat.ShortTime" />
        </DxRangeSelectorScaleLabel>
    </DxRangeSelectorScale>
    <DxTitleSettings Text="Select a Time Period" />
    <DxRangeSelectorBackground ImageUrl="images/background.png"
                               ImagePosition="RangeSelectorBackgroundImagePosition.Center"
                               Color="#d7c2ed" />
</DxRangeSelector>
```

Background color settings also apply to the Range Selector’s shutters that cover unselected ranges on the scale. To apply specific color settings to shutters, add a [DxRangeSelectorShutter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorShutter) object to the component markup and specify [Color](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorShutter.Color) and [Opacity](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorShutter.Opacity) properties.

![Range Selector - Shutter Color](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-shutter-color.png)

```
<DxRangeSelector Width="1200px"
                 Height="300px"
                 Data="@Data">
    <DxTitleSettings Text="Population by Country, 2023" />
    <DxRangeSelectorChart>
        <DxChartBarSeries ArgumentField="@((PopulationPoint s) => s.Country)"
                          ValueField="@((PopulationPoint s) => s.Value)" />
    </DxRangeSelectorChart>
    <DxRangeSelectorShutter Color="powderblue"
                            Opacity="0.6" />
</DxRangeSelector>
```

#### Palette

The `<DxRangeSelector>` component allows you to create a custom palette for chart series. To apply a palette, assign it to the [Palette](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.Palette) property.

When the number of series exceeds the number of palette colors, you can specify a [PaletteExtensionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart.PaletteExtensionMode).

The following code snippet applies a custom palette to [DxRangeSelectorChart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRangeSelectorChart) series and changes the palette’s extension mode:

![Range Selector - Chart Palette](https://docs.devexpress.com/Blazor/images/range-selector/blazor-range-selector-chart-palette.png)

- [DataSource](#tabpanel_-WdXxr7gRN_tabid-csharp)
- [Razor](#tabpanel_-WdXxr7gRN_tabid-razor)

```csharp
public List<RangePoint> GenerateData() {
    return new List<RangePoint>() {
        new RangePoint { Arg = 10, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 20, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 40, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 50, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 60, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 75, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 80, Y1 = 30, Y2 = 50, Y3 = 13 },
        new RangePoint { Arg = 90, Y1 = 40, Y2 = 50, Y3 = 14 },
        new RangePoint { Arg = 100, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 105, Y1 = 40, Y2 = 175, Y3 = 120 },
        new RangePoint { Arg = 110, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 120, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 130, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 140, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 150, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 160, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 170, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 180, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 185, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 190, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 200, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 210, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 220, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 230, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 240, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 255, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 270, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 280, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 290, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 295, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 300, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 310, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 320, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 330, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 340, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 350, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 360, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 367, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 370, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 380, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 390, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 400, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 410, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 420, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 430, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 440, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 450, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 460, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 470, Y1 = 40, Y2 = 95, Y3 = 120 },
        new RangePoint { Arg = 480, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 490, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 500, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 510, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 520, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 530, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 540, Y1 = -39, Y2 = 50, Y3 = 19 },
        new RangePoint { Arg = 550, Y1 = -10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 555, Y1 = 10, Y2 = 10, Y3 = 15 },
        new RangePoint { Arg = 560, Y1 = 30, Y2 = 100, Y3 = 13 },
        new RangePoint { Arg = 570, Y1 = 40, Y2 = 110, Y3 = 14 },
        new RangePoint { Arg = 580, Y1 = 50, Y2 = 90, Y3 = 90 },
        new RangePoint { Arg = 590, Y1 = 40, Y2 = 95, Y3 = 12 },
        new RangePoint { Arg = 600, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 610, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 620, Y1 = -20, Y2 = 20, Y3 = 30 },
        new RangePoint { Arg = 630, Y1 = -12, Y2 = 10, Y3 = 32 },
        new RangePoint { Arg = 640, Y1 = -32, Y2 = 30, Y3 = 12 },
        new RangePoint { Arg = 650, Y1 = -20, Y2 = 20, Y3 = 30 }
    };
}
public class RangePoint {
    public int Arg { get; set; }
    public int Y1 { get; set; }
    public int Y2 { get; set; }
    public int Y3 { get; set; }
}
```