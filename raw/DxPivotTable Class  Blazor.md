---
title: "DxPivotTable Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.PivotTable.DxPivotTable"
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

## DxPivotTable Class

In This Article

A Pivot Table component for multi-dimensional data analysis and cross-tab reporting.

**Assembly**: DevExpress.Blazor.PivotTable.v25.2.dll

**NuGet Package**: [DevExpress.Blazor.PivotTable](https://nuget.devexpress.com/packages/DevExpress.Blazor.PivotTable/25.2.7)

## Declaration

```csharp
public class DxPivotTable :
    ParameterTrackerComponent,
    IAsyncDisposable,
    IVirtualScrollProviderHost,
    INestedSettingsOwner,
    IPivotTableDataParamsAccessor,
    IPivotTable
```

## Remarks

The `Pivot Table` component allows you to display and analyze multi-dimensional data from an underlying data source.

![Pivot Table - Overview](https://docs.devexpress.com/Blazor/images/pivottable/blazor-pivottable-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/PivotTable)

### Get Started

Use the following guide to create your first project:

[Read Tutorial: Get Started with Pivot Table](https://docs.devexpress.com/Blazor/405246/components/pivottable/get-started-with-pivottable)

### API Reference

Refer to the following list for the component API reference: [DxPivotTable Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PivotTable.DxPivotTable._members).

### Static Render Mode Specifics

Blazor Pivot Table supports static render mode that can display static data on a single page. To use other features, enable interactivity on a Razor page and allow the Pivot Table component to execute scripts and display data. Refer to the following topic for additional information: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

```
@rendermode InteractiveServer
```

## Features and Capabilities

For in-depth information about DevExpress Pivot Table for Blazor, review the following topics:

- [Bind to Data](https://docs.devexpress.com/Blazor/405475/components/pivottable/bind-to-data)
- [Data Presentation Basics](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics)
	- [Areas](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics#areas)
		- [Fields](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics#fields)
		- [Data Cells, Summaries](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics#data-cells-summaries)
		- [Totals, Grand Totals](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics#totals-grand-totals)
		- [Cell Widths](https://docs.devexpress.com/Blazor/405459/components/pivottable/pivot-table-basics#cell-widths)
- [Data Shaping](https://docs.devexpress.com/Blazor/405367/components/pivottable/data-shaping)
- [Templates](https://docs.devexpress.com/Blazor/405474/components/pivottable/templates)
- [Save and Restore Layout](https://docs.devexpress.com/Blazor/405458/components/pivottable/save-and-restore-layout)
- [Scrolling](https://docs.devexpress.com/Blazor/405626/components/pivottable/scrolling)
	- [Virtual Scrolling](https://docs.devexpress.com/Blazor/405626/components/pivottable/scrolling#virtual-scrolling)
- [Keyboard Support](https://docs.devexpress.com/Blazor/405698/components/pivottable/keyboard-support)
- [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization)

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase) DevExpress.Blazor.Internal.ParameterTrackerComponent

DxPivotTable

See Also

[DxPivotTable Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PivotTable.DxPivotTable._members)