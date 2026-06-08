---
title: "DxListBox<TData, TValue> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxListBox-2"
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

## DxListBox<TData, TValue> Class

In This Article

A component that can connect to a data source and display a list of selectable items.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxListBox<TData, TValue> :
    DxListEditorBase<TData, TValue>,
    IListBoxComponent<TData, TValue>,
    IListBox<TData, TValue>,
    IListEditorBase<TData, TValue>,
    IEditorBase,
    IListBoxAccessor<TData>,
    IListEditorAccessorBase<TData>,
    IDropTargetComponent,
    IListBoxEditorItemDragDropOwner
```

## Type Parameters

| Name | Description |
| --- | --- |
| TData | The data item type. |
| TValue | The value type. |

## Remarks

The DevExpress List Box for Blazor (`<DxListBox>`) allows you to display a list of selectable items from a data source.

![List Box](https://docs.devexpress.com/Blazor/images/blazor-list-box.png)

[Run Demo: List Box - Overview](https://demos.devexpress.com/blazor/ListBox)

### Add a List Box to a Project

Follow the steps below to add a List Box component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxListBox/ >` markup to a `.razor` file.
3. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxListEditorBase-2.Data) property to [bind the List Box to data](https://docs.devexpress.com/Blazor/405395/components/data-editors/listbox/data-binding).
4. Configure the component: handle an item selection, customize item appearance, and so on (see ).

### API Reference

Refer to the following list for the component API reference: [DxListBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxListBox-2._members).

### Static Render Mode Specifics

Blazor List Box supports static render mode to display items. To use other features, [enable interactivity](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode) on a Razor page.

### Features and Capabilities

For in-depth information about DevExpress List Box for Blazor, review the following articles:

- [Bind to Data](https://docs.devexpress.com/Blazor/405395/components/data-editors/listbox/data-binding)
- [Data Shaping](https://docs.devexpress.com/Blazor/405397/components/data-editors/listbox/data-shaping)
	- [Search and Filter Data](https://docs.devexpress.com/Blazor/405397/components/data-editors/listbox/data-shaping#search-and-filter-data)
		- [Disabled Items](https://docs.devexpress.com/Blazor/405397/components/data-editors/listbox/data-shaping#disabled-items)
		- [Group Data](https://docs.devexpress.com/Blazor/405397/components/data-editors/listbox/data-shaping#group-data)
- [Item Selection](https://docs.devexpress.com/Blazor/405403/components/data-editors/listbox/item-selection)
- [Multiple Columns](https://docs.devexpress.com/Blazor/405396/components/data-editors/listbox/multiple-columns)
- [Templates](https://docs.devexpress.com/Blazor/405402/components/data-editors/listbox/templates)
- [Keyboard Support](https://docs.devexpress.com/Blazor/405398/components/data-editors/listbox/keyboard-support)
- [Virtual Scrolling](https://docs.devexpress.com/Blazor/405395/components/data-editors/listbox/data-binding#virtual-scrolling)
- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [Input Validation](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input)
- [HTML Attributes](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes)