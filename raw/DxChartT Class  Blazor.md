---
title: "DxChart<T> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1"
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

## DxChart<T> Class

In This Article

A control that visualizes bound data as graphs: bar, area, line, and others.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxChart<T> :
    DxChart,
    IModelProvider<ChartArgumentAxisModel>,
    IModelProvider<ChartValueAxisModel>,
    IModelProvider<ChartZoomAndPanSettingsModel>,
    IModelProvider<ChartScrollBarSettingsModel>,
    IModelProvider<ChartPaneModel>,
    IModelProvider<ChartCommonSeriesBaseModel>,
    IModelProvider<CrosshairModel>,
    IModelProvider<ChartAnnotationModel>,
    IComponentContainer<IXYChartSeriesModel>
```

## Type Parameters

| Name | Description |
| --- | --- |
| T | The data item type. |

## Remarks

The DevExpress Chart component (`<DxChart>`) allows you to create Line, Area, Bar, Bubble, and other chart types for Blazor applications.

![Blazor Charts](https://docs.devexpress.com/Blazor/images/charts/blazor-charts.png)

[Run Demo: Charts - Overview](https://demos.devexpress.com/blazor/Charts) [View Example: Create and Configure a Line Chart](https://github.com/DevExpress-Examples/blazor-chart-create-and-configure-line-chart)

### Add a Chart to a Project

Follow the steps below to add the Chart component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxChart>` … `</DxChart>` markup to a `.razor` file.
3. the component to data.
4. Configure the component: add series and axes, specify a legend, titles, tooltips, and so on (see the sections below).

[Read Tutorial: Get Started with Charts](https://docs.devexpress.com/Blazor/401769/components/charts/get-started-with-charts)

### API Reference

Refer to the following list for the component API reference: [DxChart Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1._members).

### Static Render Mode Specifics

Blazor Charts support static render mode to display data as static images. To use other features, [enable interactivity](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode) on a Razor page, and allow chart components to execute scripts and display data.

### Bind to Data

Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.Data) property to specify an [IEnumerable<T>](https://learn.microsoft.com/dotnet/api/system.collections.generic.ienumerable-1) data source and series [ArgumentField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartXYSeries-4.ArgumentField) and [ValueField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartXYSeries-4.ValueField) properties to specify data source fields that contain arguments and values for chart points. For a sample data source, refer to our [GitHub](https://github.com/DevExpress/Blazor/blob/HEAD/demo/BlazorDemo.ServerSide/BlazorDemo.ServerSide/DataProviders/SalesInfoDataProvider.cs) repository.

> [!note] Note
> The Chart supports bound mode only.

![DxChart - Line Series](https://docs.devexpress.com/Blazor/images/charts/series/blazor-chart-series-line.png)

```
@inject ISalesInfoDataProvider Sales

<DxChart Data="chartsData">
    <DxChartLineSeries Name="North America"
                       ArgumentField="si => new DateTime(si.Date.Year, si.Date.Month, 1)"
                       ValueField="si => si.Amount"
                       Filter='si => si.Region == "North America" ' />
    <DxChartLineSeries Name="Europe"
                       ArgumentField="si => new DateTime(si.Date.Year, si.Date.Month, 1)"
                       ValueField="si => si.Amount"
                       Filter='si => si.Region == "Europe"' />
    @* ... *@
</DxChart>

@code {
    IEnumerable<SaleInfo> chartsData;
    protected override async Task OnInitializedAsync() {
        chartsData = await Sales.GetSalesAsync();
    }
}
```

The chart may update itself automatically or on-demand, as listed below. Regardless of update cause, you can handle the [Rendered](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.Rendered) event to track the moment when the chart rendering is finished and the component is completely loaded.

- **Data-related updates**: If the data source collection implements the [INotifyCollectionChanged](https://learn.microsoft.com/dotnet/api/system.collections.specialized.inotifycollectionchanged) interface, the Chart is updated automatically each time the collection changes. Call the [RefreshData](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.RefreshData) method to reload data and redraw the component on-demand.
- **Layout-related updates**: The Chart redraws itself when a user resizes the component’s root container. Set the [RedrawOnResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.RedrawOnResize) property to `false` to disable this behavior. To re-render the Chart area on-demand, call the [RedrawAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.RedrawAsync) method.

For additional information, refer to the following article: [Bind Blazor Charts to Data](https://docs.devexpress.com/Blazor/405357/components/charts/bind-to-data).

> [!note] Note
> When you bind a chart to [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) values and set the [Kind](https://learn.microsoft.com/dotnet/api/system.datetime.kind#system-datetime-kind) property to `Utc`, the component converts dates (for example, when it displays axis labels). This occurs because `DxChart` is rendered on the client. To avoid such conversion, make sure your [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) objects have their [Kind](https://learn.microsoft.com/dotnet/api/system.datetime.kind#system-datetime-kind) properties set to `Local` or `Unspecified`.
> 
> You can also adjust the time difference to display dates correctly. The following code snippet demonstrates a possible solution:
> 
> C#
> 
> ```csharp
> public WeatherForecast[] GetForecast() {
>     var localZone = TimeZoneInfo.Local;
>     var localOffset = localZone.GetUtcOffset(DateTime.UtcNow);
>     var cur = DateTime.UtcNow.Add(localOffset);
> 
>     var utcDates = new List<DateTime> { cur };
>     var dates = new List<DateTime>();
>     foreach (var utcDate in utcDates)
>         dates.Add(new DateTime(utcDate.Ticks));
>     // ...
> }
> ```

### Series

A chart series is a collection of related data points. You can specify common settings for all chart series, or add series to the component’s markup and configure series-specific settings individually. Refer to the following topic for additional information about available series types: [Series Types in Blazor Charts](https://docs.devexpress.com/Blazor/405041/components/charts/series-types).

If you have several series, place them at the same chart hierarchy level. Note that `DxChart` renders series based on their order in the chart’s markup. If you need to change the rendering order, place the series in the corresponding positions in the markup.

#### Common Settings

Use the [DxChartCommonSeries](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4) object to specify common settings for all chart series.

Use the [SeriesType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SeriesType) property to create a common [XY series](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartXYSeries-4) (for example, [line](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLineSeries-3), [bar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBarSeries-3), or [area](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAreaSeries-3)). To generate series that require specific settings in addition to [ArgumentField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.ArgumentField) and [ValueField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.ValueField) (for example, [bubble](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBubbleSeries-4) or [stock](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartStockSeries-3) series), use the [SeriesTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SeriesTemplate) property.

The following code snippet uses a drop-down menu to change the series type dynamically:

![Chart - Dynamic Series Creation](https://docs.devexpress.com/Blazor/images/charts/series-types/blazor-charts-dynamic-series-creation.gif)

```
<label><b>Series Type:</b></label>
<DxComboBox Data="Enum.GetValues<ChartSeriesType>()"
            @bind-Value="@CurrentSeriesType" />

<DxChart Data="@SalesData">
    <DxChartTitle Text="Sales amount, $" />
    <DxChartCommonSeries SummaryMethod="Enumerable.Sum"
                         NameField="@((SaleInfo s) => s.Date.Year)"
                         ArgumentField="@((SaleInfo s) => s.City)"
                         ValueField="@((SaleInfo s) => s.Amount)"
                         SeriesType="@CurrentSeriesType">
    </DxChartCommonSeries>
    @* ... *@
</DxChart>

@code {
    ChartSeriesType CurrentSeriesType = ChartSeriesType.Line;

    IEnumerable<SaleInfo> SalesData;
    protected override async Task OnInitializedAsync() {
        SalesData = await Sales.GetSalesAsync();
    }
}
```

The table below lists common settings for chart series:

| Property Name | Description |
| --- | --- |
| [ArgumentField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.ArgumentField)   [ValueField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.ValueField) | Specify data source fields that store arguments and values for series points. |
| [NameField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.NameField) | Specifies a data source field used to group data by series. |
| [PaneField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.PaneField) | Specifies which data source field contains pane names for chart series. |
| [Filter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.Filter) | Specifies a filter that is applied to data source objects. |
| [SeriesType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SeriesType) | Specifies the series type for XY series. |
| [SeriesTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SeriesTemplate) | Specifies a series template. |
| [SummaryMethod](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SummaryMethod) | Specifies the method that calculates summaries for points with the same argument value. |

`DxChart<T>` can contain only one `DxChartCommonSeries` object. To visualize data with multiple series types, use the [DxChartCommonSeries.SeriesTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SeriesTemplate) property or add [individual series](https://docs.devexpress.com/Blazor/405041/components/charts/series-types) to the chart markup.

> [!note] Note
> Individual series settings have priority over common series settings.

#### Type-Specific Settings

Type-specific series have their own settings. For example, [bubble series](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBubbleSeries-4) display chart data as points with different sizes called “bubbles”. To specify a data source field that defines bubble sizes, use the [DxChartBubbleSeries.SizeField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBubbleSeries-4.SizeField) property. You can also use [MinBubbleSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.MinBubbleSize) and [MaxBubbleSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.MaxBubbleSize) properties to specify diameters of the biggest and smallest “bubbles” in the series.

![DxChart - Bubble Series](https://docs.devexpress.com/Blazor/images/charts/series/blazor-chart-series-bubble.png)

```
@using System.Text.RegularExpressions
@using System.Drawing;
@* ... *@
@inject IPopulationCorrelationDataProvider PopulationCorrelation
<DxChart @ref="@chart"
         Data="@chartsData"
         Width="100%"
         Height="500px">
    <DxChartTitle Text="Correlation between Total Population and Population with Age over 60" />

    <DxChartBubbleSeries Name="Europe"
                         T="PopulationCorrelationDataPoint"
                         TArgument="double"
                         TValue="double"
                         TSize="double"
                         ArgumentField="pc => pc.TotalPopulation"
                         ValueField="pc => pc.Older60Population"
                         SizeField="pc => pc.Older60Population / pc.TotalPopulation"
                         Filter='pc => pc.Region == "Europe"' />
    <DxChartBubbleSeries Name="Africa"
                         T="PopulationCorrelationDataPoint"
                         TArgument="double"
                         TValue="double"
                         TSize="double"
                         ArgumentField="pc => pc.TotalPopulation"
                         ValueField="pc => pc.Older60Population"
                         SizeField="pc => pc.Older60Population / pc.TotalPopulation"
                         Filter='pc => pc.Region == "Africa"' />
    <DxChartBubbleSeries Name="Asia"
                         T="PopulationCorrelationDataPoint"
                         TArgument="double"
                         TValue="double"
                         TSize="double"
                         ArgumentField="pc => pc.TotalPopulation"
                         ValueField="pc => pc.Older60Population"
                         SizeField="pc => pc.Older60Population / pc.TotalPopulation"
                         Filter='pc => pc.Region == "Asia"' />
    <DxChartBubbleSeries Name="North America"
                         T="PopulationCorrelationDataPoint"
                         TArgument="double"
                         TValue="double"
                         TSize="double"
                         ArgumentField="pc => pc.TotalPopulation"
                         ValueField="pc => pc.Older60Population"
                         SizeField="pc => pc.Older60Population / pc.TotalPopulation"
                         Filter='pc => pc.Region == "North America"' />

    <DxChartLegend Position="RelativePosition.Outside"
                   VerticalAlignment="VerticalEdge.Bottom"
                   HorizontalAlignment="HorizontalAlignment.Center"
                   Orientation="Orientation.Horizontal" />

    <DxChartArgumentAxis>
        <DxChartAxisTitle Text="Total population" />
        <DxChartAxisLabel Format='ChartElementFormat.FromLdmlString("#0M")' />
    </DxChartArgumentAxis>

    <DxChartValueAxis EndOnTick="false" SideMarginsEnabled="false">
        <DxChartAxisTitle Text="Population with Age over 60" />
        <DxChartAxisLabel Format='ChartElementFormat.FromLdmlString("#0M")' />
        <DxChartAxisRange StartValue = "-3" EndValue = "50"/>
    </DxChartValueAxis>
@* ... *@
</DxChart>
@* ... *@
@code {
    IEnumerable<PopulationCorrelationDataPoint> chartsData;
    DxChartBase chart;

    async void ExportChart(ChartExportFormat format) {
        await chart?.ExportAsync("BubbleChart", format);
    }
    protected override async Task OnInitializedAsync() {
        chartsData = await PopulationCorrelation.GetData();
    }
}
```

[Run Demo: DxChart - Bubble Series](https://demos.devexpress.com/blazor/ChartBubbleSeries)

For [line series](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLineSeries-3), you can use the [DxChartSeriesPoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesPoint) component to customize the point’s color, size, symbol, and visibility. These settings apply to all points in a series. To override individual point settings, handle the chart’s [CustomizeSeriesPoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.CustomizeSeriesPoint) event.

- [WeatherForecast](#tabpanel_wlY7Jl6o4n_tabid-2)
- [WeatherForecastService](#tabpanel_wlY7Jl6o4n_tabid-3)
- [Program.cs](#tabpanel_wlY7Jl6o4n_tabid-program-cs)
- [Razor](#tabpanel_wlY7Jl6o4n_tabid-1)

```
@inject WeatherForecastService ForecastService

<DxChart Data="@ChartData" CustomizeSeriesPoint="@PreparePointColor">
    <DxChartLineSeries SummaryMethod="@(i => (int)i.Average())"
                       Color="@System.Drawing.Color.Gray"
                       ValueField="@((WeatherForecast i) => i.TemperatureF)"
                       ArgumentField="@(i => i.Date.Date)"
                       Name="Temperature, F">
        <DxChartSeriesPoint Symbol="ChartPointSymbol.Polygon" Color="@System.Drawing.Color.Gray" Size="25" />
    </DxChartLineSeries>
</DxChart>

@code {
    WeatherForecast[] ChartData;

    protected override async Task OnInitializedAsync() {
        ChartData = await ForecastService.GetForecastAsync();
    }

    protected void PreparePointColor(ChartSeriesPointCustomizationSettings pointSettings) {
        double value = (double)pointSettings.Point.Value;
        if (value > 75)
            pointSettings.PointAppearance.Color = System.Drawing.Color.Red;
        else if (value < 25)
            pointSettings.PointAppearance.Color = System.Drawing.Color.Blue;
    }
}
```

![Charts - Series point](https://docs.devexpress.com/Blazor/images/charts/points/blazor-chart-series-point-customization.png)

For the line series and [constant line](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartConstantLine) you can specify the [dash style](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ChartDashStyle). For example, make the line dashed, dotted, or apply one of the predefined patterns.

The following example defines a dashed line series:

```
<DxChart Data="@SalesData">
    <DxChartLineSeries Name="Total Sales"
                       ArgumentField="@((SaleInfo s) => s.City)"
                       ValueField="@((SaleInfo s) => s.Amount)"
                       SummaryMethod="Enumerable.Sum"
                       DashStyle="ChartDashStyle.Dash">
    </DxChartLineSeries>
</DxChart>
```

![Line Series Dash Style](https://docs.devexpress.com/Blazor/images/dxchart-line-series-dash-style.png)

[Run Demo: Charts - Series Point Customization](https://demos.devexpress.com/blazor/ChartSeriesCustomization#SeriesPoint)

#### Series Labels

Add a [DxChartSeriesLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabel) object to series markup to configure labels for series data points. To display series labels, set the [DxChartSeriesLabel.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabel.Visible) property to `true`:

```
<DxChart Data="forecasts">
    <DxChartLineSeries ArgumentField="@((WeatherForecast v) => v.Date)"
                       ValueField="@((WeatherForecast v) => v.TemperatureC)">
        <DxChartSeriesLabel Visible="true" />
    </DxChartLineSeries>
    <DxChartLegend Visible="false"></DxChartLegend>
</DxChart>
```

![Show Series Labels](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-series-label-visible.png)

[Run Demo: Charts - Series Label Customization](https://demos.devexpress.com/blazor/ChartSeriesCustomization#SeriesLabel)

All settings apply to all labels in the series. To override individual label settings, handle the chart’s [CustomizeSeriesPoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.CustomizeSeriesPoint) event and use the event argument’s [PointLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ChartSeriesPointCustomizationSettings.PointLabel) property.

For additional information on how to configure series labels, refer to the following topic: [Labels in Blazor Charts](https://docs.devexpress.com/Blazor/405083/components/charts/labels).

#### Error Bars

Error bars indicate measurement precision or uncertainty. They display a possible value range next to a series point. Error bars can display fixed values or percentages, statistical function values, or error values obtained from data source fields.

![Charts - Error bars](https://docs.devexpress.com/Blazor/images/charts/error-bars/error-bars-general.png)

[Run Demo: Charts - Error Bars](https://demos.devexpress.com/blazor/ChartErrorBars)

Refer to the [DxChartSeriesValueErrorBar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesValueErrorBar) class description for additional information and an example.

### Axes

Primary X and Y axes are automatically created based on the data type of the first series. The [DxChartArgumentAxis](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartArgumentAxis) class defines the X-axis, and the [DxChartValueAxis](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartValueAxis) class defines the Y-axis. The [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisBase-1.Visible) property specifies an axis visibility. The [DxChartAxisTitle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisTitle) object specifies the axis title.

Axis labels are displayed on the chart’s X-axis. The `<DxChart>` uses smart label management to ensure that labels do not overlap. The [Format](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabelBase-1.Format) property specifies the axis label’s format.

If the data range or format is series-specific, each series can use its own Y-axis. The number of Y-axes in a chart is not limited.

```
<DxChart Data="@SalesData">
    <DxChartTitle Text="Sales amount" />
    <DxChartLegend Position="RelativePosition.Outside" />
    <DxChartValueAxis>
        <DxChartAxisLabel Format="ChartElementFormat.Percent()"></DxChartAxisLabel>
        <DxChartAxisTitle Text="Amount"></DxChartAxisTitle>
    </DxChartValueAxis>
    <DxChartValueAxis Name="TotalAxis" Alignment="ChartAxisAlignment.Far">
        <DxChartAxisTitle Text="Total Amount"></DxChartAxisTitle>
    </DxChartValueAxis>
    <DxChartArgumentAxis>
        <DxChartAxisTitle Text="Cities"></DxChartAxisTitle>
    </DxChartArgumentAxis>
    @* ... *@
</DxChart>
```

![Charts Two Value Axes](https://docs.devexpress.com/Blazor/images/charts/axis/blazor-charts-two-value-axes.png)

Refer to the following topic for additional information about axes and their visual elements: [Axes in Blazor Charts](https://docs.devexpress.com/Blazor/405070/components/charts/axes).

#### Axis Labels

Use the [DxChartAxisLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel) component to show and configure labels for axis ticks. To specify axis label visibility, use the [DxChartAxisLabel.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabelBase-1.Visible) property.

`DxChart` allows you to specify how to arrange axis labels. When they overlap, use the [Overlap](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel.Overlap) property to rearrange such labels. Based on the [Overlap](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel.Overlap) property value, specify the [RotationAngle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel.RotationAngle) or [StaggeringSpacing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel.StaggeringSpacing) property.

The following example uses the drop-down menu to rearrange overlapping axis labels.

```
<DxChart Data="@GetData()" Width="100%">
    <DxChartTitle Text="Population by Country 2023" CssClass="mb-1"/>
    <DxChartLegend Visible="false"/>
    <DxChartLineSeries ArgumentField="@((DataPoint s) => s.Country)"
                       ValueField="@((DataPoint s) => s.Value)"/>
    @* ... *@
    <DxChartArgumentAxis>
        <DxChartAxisLabel Overlap="@CurrentOverlapMode"
                          WordWrap="ChartWordWrap.None"/>
    </DxChartArgumentAxis>
</DxChart>

@code {
    ChartAxisLabelOverlap CurrentOverlapMode = ChartAxisLabelOverlap.Stagger;
    List<DataPoint> GetData() {
        var result = new List<DataPoint>(14);
        // ...
        return result;
    }
    public class DataPoint {
        public string Country { get; set; }
        public int Value { get; set; }
        public DataPoint(string country, int value) {
            Country = country;
            Value = value;
        }
    }
}
```

[Run Demo: Chart - Label Overlap](https://demos.devexpress.com/blazor/ChartAxesLabels#LabelOverlap)

For additional information about axis labels, refer to the following section: [Labels - Axis Labels](https://docs.devexpress.com/Blazor/405083/components/charts/labels#axis-labels).

### Legend

A chart’s legend lists all chart series. The [DxChartLegend](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLegend) component implements the chart legend. Use the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLegend.Visible) property to specify the legend’s visibility and the [Position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLegend.Position) property to specify the legend’s position. The chart obtains a legend item’s text from a series [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeries.Name) property.

Enable the [AllowToggleSeries](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLegend.AllowToggleSeries) property to display checkboxes that toggle the visibility of individual series.

```
<DxChart Data="@SalesData">
    <DxChartLegend AllowToggleSeries="true" 
                   Orientation="Orientation.Vertical" 
                   HorizontalAlignment="HorizontalAlignment.Right">
        <DxChartTitle Text="Years">
            <DxChartSubTitle Text="(2017-2019)"></DxChartSubTitle>
        </DxChartTitle>
    </DxChartLegend>
    <DxChartBarSeries Name="2017" ... />
    <DxChartBarSeries Name="2018" ... />
    <DxChartLineSeries Name="2019" ... />
        <DxChartSeriesLegendItem IconCssClass="oi oi-flag">
            <TextTemplate>Last year</TextTemplate>
        </DxChartSeriesLegendItem>
    </DxChartLineSeries>
</DxChart>
```

![Chart Legend](https://docs.devexpress.com/Blazor/images/charts/legend/blazor-chart-legend.png)

Refer to the following section for additional information about legend: [Descriptive Elements - Legend](https://docs.devexpress.com/Blazor/405093/components/charts/descriptive-elements/descriptive-elements#legend).

[Run Demo: Charts - Legend Customization](https://demos.devexpress.com/blazor/ChartCustomizationInnerComponents#Legend)

### Titles and Subtitles

The `<DxChart>` component can display titles ([DxChartTitle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartTitle)) and subtitles ([DxChartSubTitle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSubTitle)) for the chart component and legend.

```
<DxChart Data="@SalesData">
   <DxChartTitle Text="Sales amount">
       <DxChartSubTitle Text="by cities"></DxChartSubTitle>
   </DxChartTitle>
    <DxChartLegend AllowToggleSeries="true" 
                   Orientation="Orientation.Vertical" 
                   HorizontalAlignment="HorizontalAlignment.Right">
        <DxChartTitle Text="Years">
            <DxChartSubTitle Text="(2017-2019)"></DxChartSubTitle>
        </DxChartTitle>
    </DxChartLegend>
</DxChart>
```

![Chart Titles and Subtitles](https://docs.devexpress.com/Blazor/images/charts/titles/blazor-chart-titles-and-subtitles.png)

Refer to the following section for additional information about titles: [Descriptive Elements - Titles and Subtitles](https://docs.devexpress.com/Blazor/405093/components/charts/descriptive-elements/descriptive-elements#titles-and-subtitles).

[Run Demo: Charts - Legend Customization](https://demos.devexpress.com/blazor/ChartCustomizationInnerComponents#Legend)

### Annotations

Annotations are comments that contain information about chart content. The `DxChart<T>` component supports text and image annotations. You can anchor annotations to chart elements (series points or axes) or position annotations based on pixel coordinates.

![Chart - Annotations](https://docs.devexpress.com/Blazor/images/charts/annotations/blazor-chart-annotation.png)

Refer to the following section for additional information about annotations: [Annotations in Blazor Charts](https://docs.devexpress.com/Blazor/405150/components/charts/descriptive-elements/annotations).

### Tooltips

The Chart can display tooltips when the mouse pointer is above a chart series. Use the [DxChartTooltip](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartTooltip) element to specify tooltip templates.

The Tooltip class contains the following properties:

- [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartTooltip.Enabled) - Specifies whether tooltips are enabled. Set this property to `true` to display tooltips.
- [Position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartTooltip.Position) - Specifies the tooltip position.

```
<DxChart Data="@SalesData"
         CssClass="mw-1100">
    <DxChartTitle Text="Sales amount" />

    <DxChartTooltip Enabled="true" Position="RelativePosition.Outside">
        <div class="m-3">
            <div class="font-weight-bold">@context.Point.SeriesName</div>
            <div>City: @context.Point.Argument</div>
            <div>Amount: @context.Point.Value</div>
        </div>
    </DxChartTooltip>

    <DxChartBarSeries Name="2017" 
                      Filter="@((SaleInfo s) => s.Date.Year == 2017)" 
                      SummaryMethod="Enumerable.Sum" 
                      ArgumentField="@(s => s.City)"
                      ValueField="@(s => s.Amount)" />
    <DxChartBarSeries Name="2018" 
                      Filter="@((SaleInfo s) => s.Date.Year == 2018)" 
                      SummaryMethod="Enumerable.Sum" 
                      ArgumentField="@(s => s.City)"
                      ValueField="@(s => s.Amount)" />
    <DxChartLineSeries Name="2019" 
                       Filter="@((SaleInfo s) => s.Date.Year == 2019)" 
                       SummaryMethod="Enumerable.Sum" 
                       ArgumentField="@(s => s.City)"
                       ValueField="@(s => s.Amount)" />
</DxChart>
```

![Chart Tooltip Properties](https://docs.devexpress.com/Blazor/images/charts/tooltips/blazor-chart-tooltip-position-outside.png)

Refer to the following section for additional information about titles: [Descriptive Elements - Tooltips](https://docs.devexpress.com/Blazor/405093/components/charts/descriptive-elements/descriptive-elements#tooltips).

[Run Demo: Charts - Tooltip Customization](https://demos.devexpress.com/blazor/ChartCustomizationInnerComponents#Tooltip)

### Zoom and Pan

Users can zoom and pan the chart with the mouse wheel or touch gestures. To enable zoom/pan, add a `DxChartZoomAndPanSettings` object and specify its [ArgumentAxisZoomAndPanMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartZoomAndPanSettings.ArgumentAxisZoomAndPanMode) and [ValueAxisZoomAndPanMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartZoomAndPanSettings.ValueAxisZoomAndPanMode) properties.

You can also add a scrollbar that allows users to pan the chart along the argument axis. To do this, add a [DxChartScrollBarSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartScrollBarSettings) object and set its [ArgumentAxisScrollBarVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartScrollBarSettings.ArgumentAxisScrollBarVisible) property to `true`. Use the [ArgumentAxisScrollBarPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartScrollBarSettings.ArgumentAxisScrollBarPosition) property to specify the scrollbar’s position.

- [SaleInfo](#tabpanel_PFzKzXuxZl_tabid-SaleInfo)
- [Sales](#tabpanel_PFzKzXuxZl_tabid-Sales)
- [Razor](#tabpanel_PFzKzXuxZl_tabid-markup)

```
@using Chart.Data

<DxChart Data="@SalesData">
    <DxChartLineSeries Name="2017"
                       Filter="@((SaleInfo s) => s.Date.Year == 2017)"
                       ArgumentField="@(s => s.Date)"
                       ValueField="@(s => s.Amount)">
        <DxChartAggregationSettings Enabled="true" Method="ChartAggregationMethod.Sum" />
    </DxChartLineSeries>
    <DxChartZoomAndPanSettings ArgumentAxisZoomAndPanMode="ChartAxisZoomAndPanMode.Both"
                               ValueAxisZoomAndPanMode="ChartAxisZoomAndPanMode.Pan" />
    <DxChartScrollBarSettings ArgumentAxisScrollBarVisible="true"
                              ArgumentAxisScrollBarPosition="ChartScrollBarPosition.Top" />
</DxChart>

@code {
    IEnumerable<SaleInfo> SalesData;

    protected override async Task OnInitializedAsync() {
        SalesData = await Sales.GetSalesAsync();
    }
}
```

![Zoom and Pan](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-zoom-and-pan.gif)

[Run Demo: Charts - Zoom and Pan](https://demos.devexpress.com/blazor/ChartZoomAndPan)

Refer to the following topic for additional information about zoom and examples: [Zoom in Blazor Chart](https://docs.devexpress.com/Blazor/405057/components/charts/chart/zoom).

### Data Aggregation

The `<DxChart>` component can use [aggregate methods](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ChartAggregationMethod) to group data and decrease the number of visible points. This feature allows you to optimize chart performance.

Data aggregation is available for the X-axis. The chart splits the X-axis into intervals, aggregates data for each interval and shows the result values as series points. When users `zoom` the chart, it re-aggregates data.

![Data Aggregation](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-data-aggregation.png)

To enable aggregation, add a [DxChartAggregationSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAggregationSettings) object to the markup and set its [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAggregationSettings.Enabled) property to `true`. To specify an aggregation method, use the [Method](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAggregationSettings.Method) property (the default method is `Auto`).

- [BagrainDataPoint.cs](#tabpanel_qJVv3w2KZy_tabid-bargain)
- [Index.razor](#tabpanel_qJVv3w2KZy_tabid-index)

```
<DxChart T="BargainDataPoint"
            Data="@UsdJpyData"
            @key="@Params.ThemeName"
            CssClass="w-100">
    <DxChartLegend Position="RelativePosition.Inside"
                    VerticalAlignment="VerticalEdge.Top"
                    HorizontalAlignment="HorizontalAlignment.Right" />
    <DxChartLineSeries T="BargainDataPoint"
                        TArgument="DateTime"
                        TValue="double"
                        ArgumentField="i => i.DateTimeStamp"
                        ValueField="i => i.Price"
                        Name="USDJPY">
        <DxChartSeriesPoint Visible="false" />
        <DxChartAggregationSettings Enabled="true" 
                                    Method="ChartAggregationMethod.Average" />
    </DxChartLineSeries>
    <DxChartArgumentAxis>
        <DxChartAxisRange StartValue="new DateTime(2020, 01, 01)"
                            EndValue="new DateTime(2021, 01, 29)" />
    </DxChartArgumentAxis>
    <DxChartZoomAndPanSettings ArgumentAxisZoomAndPanMode="ChartAxisZoomAndPanMode.Both" />
    <DxChartScrollBarSettings ArgumentAxisScrollBarVisible="true" 
                                ArgumentAxisScrollBarPosition="ChartScrollBarPosition.Bottom" />
    <DxChartTooltip Enabled="true" Position="RelativePosition.Outside">
        <div class="m-3">
            <div class="font-weight-bold">@(((DateTime)context.Point.Argument).ToString("d"))</div>
            <div>1$ = @(context.Point.Value)¥</div>
        </div>
    </DxChartTooltip>
</DxChart>

@code {
    IEnumerable<BargainDataPoint> UsdJpyData;
    @inject ICurrencyExchangeDataProvider UsdJpyDataProvider

    protected override async Task OnInitializedAsync() {
        UsdJpyData = await UsdJpyDataProvider.GetDataAsync();
    }
}
```

[Run Demo: Charts - Zoom and Pan](https://demos.devexpress.com/blazor/ChartZoomAndPan)

> [!note] Note
> You can also use `summary methods` to optimize chart performance.

### Data Summaries

The Chart component can use a summary method to group data. This method calculates summaries for points with the same argument value, and the chart shows the resulting values as series points. This feature allows you to decrease the number of visible points and to optimize chart performance.

Note that the chart calculates summaries when it loads data and does not re-calculate them when users zoom the chart.

![Data Summaries](https://docs.devexpress.com/Blazor/images/charts/series/blazor-chart-max-summary-method.png)

You can specify a common summary method for all chart series ([DxChartCommonSeries.SummaryMethod](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartCommonSeries-4.SummaryMethod)) or an individual method for each series ([DxChartSeries.SummaryMethod](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartXYSeries-4.SummaryMethod)).

- [SaleInfo](#tabpanel_wlY7Jl6o4n-1_tabid-SaleInfo)
- [Sales](#tabpanel_wlY7Jl6o4n-1_tabid-Sales)
- [Razor](#tabpanel_wlY7Jl6o4n-1_tabid-markup)

```
@using Chart.Data

<DxChart Data="@SalesData">
    <DxChartAreaSeries Name="2017_Max"
                        Filter="@((SaleInfo s) => s.Date.Year == 2017)"
                        ArgumentField="@(s => s.City)"
                        ValueField="@(s => s.Amount)"
                        SummaryMethod="Enumerable.Max" />
    <DxChartLineSeries Name="2017_Sum"
                        Filter="@((SaleInfo s) => s.Date.Year == 2017)"
                        ArgumentField="@(s => s.City)"
                        ValueField="@(s => s.Amount)"
                        SummaryMethod="Enumerable.Sum" />
    <DxChartLegend Position="RelativePosition.Outside" HorizontalAlignment="HorizontalAlignment.Right" />
</DxChart>

@code {
    IEnumerable<SaleInfo> SalesData;

    protected override async Task OnInitializedAsync() {
        SalesData = await Sales.GetSalesAsync();
    }
}
```

![Summary Methods](https://docs.devexpress.com/Blazor/images/charts/series/blazor-chart-different-summary-methods.png)

> [!note] Note
> You can also use `aggregation methods` to optimize chart performance.

### Multiple Panes

The `<DxChart>` component allows you to create charts with multiple panes under each other. A pane ([DxChartPane](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartPane)) can display one or more series and can share its argument axis with other panes. To specify the pane where a series is displayed, use the series [Pane](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeries.Pane) property. You can also use the [DefaultPane](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.DefaultPane) property to specify the pane that displays all axes and series with unspecified `Pane` property.

You can specify the pane [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartPane.Height) in pixels or percentages.

```
<DxChart Data="@SalesData" Height="500px">
    <DxChartTitle Text="Sales amount" />
    <DxChartLegend Position="RelativePosition.Outside" VerticalAlignment="VerticalEdge.Bottom" />
    <DxChartPane Name="Pane1" Height="60%" />
    <DxChartPane Name="Pane2" />
    <DxChartBarSeries Name="2018"
                      Filter="@((SaleInfo s) => s.Date.Year == 2018)"
                      SummaryMethod="Enumerable.Sum"
                      Pane="Pane1"
                      ArgumentField="@(s => s.City)"
                      ValueField="@(s => s.Amount)" />
    <DxChartBarSeries Name="2019"
                      Filter="@((SaleInfo s) => s.Date.Year == 2019)"
                      SummaryMethod="Enumerable.Sum"
                      Pane="Pane2"
                      ArgumentField="@(s => s.City)"
                      ValueField="@(s => s.Amount)" />
</DxChart>
```

![Chart Pane](https://docs.devexpress.com/Blazor/images/blazor-dxchartpane-height.png)

[Run Demo: Charts - Multiple Panes Customization](https://demos.devexpress.com/blazor/ChartMultiplePanes)

### Selection and Hover

The `<DxChart>` component allows you to select series and points. To enable series and point selection at the chart level, specify the chart’s [SeriesSelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.SeriesSelectionMode) and [PointSelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1.PointSelectionMode) properties. You can choose between the following modes: `None`, `Single`, and `Multiple`.

Charts highlight entire pie and line- and area-based series when a user hovers over them. Use the series `HoverMode` property to specify highlighted series elements.

Use the `HoverMode` property to specify series points to highlight on hover. This property exists on the [point level](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesPoint) for line- and area-based series, and on the series level for other series types. Refer to the following enumeration description for additional information about available options: [ChartSeriesPointHoverMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ChartSeriesPointHoverMode). Point behavior is the same as the [series-level setting](https://docs.devexpress.com/Blazor/405316/components/charts/user-interaction-options#series-hover) if `HoverMode` is `None`.

For additional information on selection and hover in `<DxChart>` refer to the following topic: [User Interaction Options in Blazor Charts](https://docs.devexpress.com/Blazor/405316/components/charts/user-interaction-options).

### Size

Use the chart’s [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.Width) and [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.Height) properties to change the component’s size. You can also use the [RedrawOnResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.RedrawOnResize) property to specify whether to redraw the chart when its container size changes.

```
<DxChart Data="@forecasts"
         Width="800px"
         Height="400px">
    <DxChartBarSeries ArgumentField="@((WeatherForecast i) => i.Date)"
                      ValueField="@((WeatherForecast i) => i.Precipitation)"
                      Name="Precipitation">
    </DxChartBarSeries>
    <DxChartBarSeries ArgumentField="@((WeatherForecast i) => i.Date)"
                      ValueField="@((WeatherForecast i) => i.TemperatureC)"
                      Name="Temperature">
    </DxChartBarSeries>
</DxChart>
```

![Chart size modification](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-size.png)

### Appearance Customization

Use the chart’s [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent.CssClass) property to customize the chart’s appearance. The following snippet changes the chart’s background color and font size:

- [Razor](#tabpanel_wlY7Jl6o4n-2_chart-cssclass-razor)
- [CSS](#tabpanel_wlY7Jl6o4n-2_chart-cssclass-css)

```
<DxChart Data="@SalesData" CssClass="my-style">
    <DxChartCommonSeries NameField="@((SaleInfo s) => s.Date.Year)"
                         ArgumentField="@(s => s.City)"
                         ValueField="@(s => s.Amount)"
                         SummaryMethod="Enumerable.Sum"
                         SeriesType="BarSeriesType.Value">
    </DxChartCommonSeries>
    <DxChartLegend Position="RelativePosition.Outside" HorizontalAlignment="HorizontalAlignment.Right" />
</DxChart>
```

![Chart CSS Class](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-css-class.png)

You can also apply CSS styles to chart elements:

- [DxChartLegend.CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartLegend.CssClass)
- [DxChartTitle.CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartTitle.CssClass)
- [DxChartSubTitle.CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSubTitle.CssClass)

For additional information, refer to the following help topic: [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes).

### Font Customization

Use the `DxChartFont` object to customize fonts for [DxChartAxisTitle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisTitle), [DxChartAxisLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartAxisLabel), [DxChartSeriesLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartSeriesLabel), or [DxChartConstantLineLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartConstantLineLabel).

The following properties are available:

- [DxChartFont.Color](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont.Color)
- [DxChartFont.Family](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont.Family)
- [DxChartFont.Opacity](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont.Opacity)
- [DxChartFont.Size](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont.Size)
- [DxChartFont.Weight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartFont.Weight)

The following code snippet customizes font settings of a series label:

```
<DxChart Data="@WeatherForecasts"
         CustomizeSeriesPoint="@PreparePointLabel"
         Width="100%">
    <DxChartTitle Text="Annual Weather in New York" />
    <DxChartLineSeries SummaryMethod="@(i => i.Average())"
                       ValueField="@((DetailedWeatherSummary i) => i.AverageTemperatureF)"
                       ArgumentField="@(i => new DateTime1
)"
                       Name="Temperature, F"
                       Filter="@((DetailedWeatherSummary  i) => i.City == "NEW YORK")">
        <DxChartSeriesLabel Position="RelativePosition.Outside"
                            FormatPattern="{argument:MMMM}: {value:#.##} °F">
            <DxChartSeriesLabelConnector Visible="true"
                                         Width="3" />
            <DxChartFont Size="14" Weight="600" />
        </DxChartSeriesLabel>
    </DxChartLineSeries>
    <DxChartLegend Visible="false" />
    <DxChartValueAxis>
        <DxChartAxisTitle Text="Temperature, °F" />
    </DxChartValueAxis>
    <DxChartArgumentAxis>
        <DxChartAxisLabel Format="ChartElementFormat.Month" />
    </DxChartArgumentAxis>
</DxChart>

@code {
    IEnumerable<DetailedWeatherSummary> WeatherForecasts;

    protected override async Task OnInitializedAsync() {
        WeatherForecasts = await WeatherSummaryDataProvider.GetDataAsync();
    }

    protected void PreparePointLabel(ChartSeriesPointCustomizationSettings pointSettings) {
        double value = (double)pointSettings.Point.Value;
        if (value > 50 && value < 70)
            pointSettings.PointLabel.Visible = true;
    }
}
```

![DxChartFont - Series Label Customization](https://docs.devexpress.com/Blazor/images/charts/font-customization.png)

[Run Demo: Series Lable Customization](https://demos.devexpress.com/blazor/ChartSeriesCustomization)

### Export

Call [ExportAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase.ExportAsync.overloads) method overloads to export chart data. The following code snippet uses a drop-down menu to export chart data to a file in the specified format:

![DxChart - Export](https://docs.devexpress.com/Blazor/images/charts/blazor-chart-export.png)

- [DataSource](#tabpanel_wlY7Jl6o4n-3_tabid-cs)
- [Razor](#tabpanel_wlY7Jl6o4n-3_tabid-razor2)

```
@using System.Drawing
<DxMenu ItemClick="Export">
    <Items>
        <DxMenuItem Text="Export To:">
            <Items>
                <DxMenuItem Text="PNG" />
                <DxMenuItem Text="JPEG" />
                <DxMenuItem Text="PDF" />
                <DxMenuItem Text="GIF" />
            </Items>
        </DxMenuItem>
    </Items>
</DxMenu>
<DxChart @ref="chart"
         Data="@dataPoints"
         LabelOverlap="ChartLabelOverlap.Hide"
         Width=700 Height=400>
    <DxChartBarSeries ArgumentField="@((DataPoint i) => i.Arg)"
                      ValueField="@((DataPoint i) => i.Value1)"
                      Name="Series 1" />
    <DxChartBarSeries ArgumentField="@((DataPoint i) => i.Arg)"
                      ValueField="@((DataPoint i) => i.Value2)"
                      Name="Series 2" />
    <DxChartBarSeries ArgumentField="@((DataPoint i) => i.Arg)"
                      ValueField="@((DataPoint i) => i.Value3)"
                      Name="Series 3" />
    <DxChartLegend Orientation="Orientation.Horizontal"
                   HorizontalAlignment="HorizontalAlignment.Right"
                   Position="RelativePosition.Outside" />
</DxChart>

@code {
    DxChartBase chart;
    private DataPoint[] dataPoints;
    protected override void OnInitialized() {
        dataPoints = GetDataPoints();
    }
    void Export(MenuItemClickEventArgs args) {
        ChartExportFormat format = ChartExportFormat.Png;
        Color backgroundColor = Color.White;
        int margin = 4;
        if(Enum.TryParse<ChartExportFormat>(args.ItemInfo.Text, true, out format))
            chart?.ExportAsync("Exported_Chart", format, margin, backgroundColor);
    }
}
```

### Visualize Pivot Grid Data

You can link `<DxChart>` to the [DxPivotGrid<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPivotGrid-1) component as follows:

1. Create a method that asynchronously loads data from an [IEnumerable<T>](https://learn.microsoft.com/dotnet/api/system.collections.generic.ienumerable-1) data source (*Sales.Load()* in this example).
2. Create a [DxPivotGridDataProvider<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPivotGridDataProvider-1) object based on the created method.
3. Bind the Chart to the provider object. Use the [ChartDataSource](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPivotGridDataProvider-1.ChartDataSource) property.
4. Bind the Pivot Grid to the provider object. Use the [PivotGridDataSource](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPivotGridDataProvider-1.PivotGridDataSource) property.

```
<DxChart Data="@(PivotGridDataProvider.ChartDataSource)">
    <DxChartCommonSeries NameField="@((IChartDataItem s) => s.SeriesName)"
                         ArgumentField="@(s => s.Argument)"
                         ValueField="@(s => s.Value)"
                         SeriesType="ChartSeriesType.Bar" />
</DxChart>

<DxPivotGrid Data="@(PivotGridDataProvider.PivotGridDataSource)">
    <DxPivotGridField Field="@nameof(SaleInfo.Region)" SortOrder="PivotGridSortOrder.Ascending" 
        Area="PivotGridFieldArea.Row"></DxPivotGridField>
    <DxPivotGridField Field="@nameof(SaleInfo.Country)" Area="PivotGridFieldArea.Row"></DxPivotGridField>
    <DxPivotGridField Field="@nameof(SaleInfo.City)" Area="PivotGridFieldArea.Row"></DxPivotGridField>
    <DxPivotGridField Field="@nameof(SaleInfo.Date)" GroupInterval="PivotGridGroupInterval.Year" 
        Area="PivotGridFieldArea.Column" Caption="Year"> </DxPivotGridField>
    <DxPivotGridField Field="@nameof(SaleInfo.OrderId)" Caption="Count" Area="PivotGridFieldArea.Data" 
        SummaryType="PivotGridSummaryType.Count"> </DxPivotGridField>
</DxPivotGrid>

@code {
    DxPivotGridDataProvider<SaleInfo> PivotGridDataProvider = DxPivotGridDataProvider<SaleInfo>.Create(Sales.Load());
}
```

The Chart shows data from the Pivot Grid’s lowest expanded level. The Chart is updated when a user expands or collapses rows/columns in the Pivot Grid.

![Linked PivotGrid And Chart](https://docs.devexpress.com/Blazor/images/pivot/blazor-pivot-linked-grid-and-chart.png)

[Run Demo: Pivot Grid - Chart Integration](https://demos.devexpress.com/blazor/PivotGridChartIntegration)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxChartBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChartBase) DevExpress.Blazor.DxChart

DxChart<T>

See Also