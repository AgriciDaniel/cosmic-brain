---
title: "DxTagBox<TData, TValue> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTagBox-2"
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

## DxTagBox<TData, TValue> Class

In This Article

An editor that allows users to select multiple items (tags) from a drop-down list.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxTagBox<TData, TValue> :
    DxDropDownListEditorBase<TData, TValue>,
    ITagBoxComponent<TData, TValue>,
    ITagBox<TData, TValue>,
    IDropDownListEditorBase<TData, TValue>,
    IListEditorBase<TData, TValue>,
    IEditorBase,
    IDropDownOwner,
    IFocusableEditor,
    ITagBoxAccessor<TData>,
    IDropDownListEditorAccessor<TData>,
    IListEditorAccessorBase<TData>,
    ITagBoxSelectionProviderOwner<TData, TValue>,
    IDropDownListEditorSelectionProviderOwner<TData, TValue>,
    IListEditorSelectionProviderOwner<TData, TValue>
```

## Type Parameters

| Name | Description |
| --- | --- |
| TData | The data item type. |
| TValue | The value type. |

## Remarks

The DevExpress TagBox for Blazor (`<DxTagBox>`) component displays a drop-down window with a list of strings. Users can select multiple items from a list and type text in the editor to filter list items that contain the search string. Users can also use [keyboard](https://docs.devexpress.com/Blazor/405478/components/data-editors/tagbox/keyboard-support) to navigate to the editor’s items and select them.

![TagBox Overview](https://docs.devexpress.com/Blazor/images/editors/tagbox/blazor_tagbox_overview.png)

[Run Demo: TagBox - Overview](https://demos.devexpress.com/blazor/TagBox)

### Add a TagBox to a Project

Follow the steps below to add the TagBox component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxTagBox>` … `</DxTagBox>` markup to a `.razor` file.
3. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxListEditorBase-2.Data) property to \[bind the TagBox to data)(xref:405476).
4. Configure the component: customize the layout and appearance of items and tags, add a clear button and placeholder, and so on (see ).

### API Reference

Refer to the following list for the component API reference: [DxTagBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTagBox-2._members).

### Static Render Mode Specifics

Blazor TagBox does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Features and Capabilities

For in-depth information about DevExpress Blazor TagBox, review the following articles:

- [Data Binding](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding)
	- [Strongly Typed Collection](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding#strongly-typed-collection)
		- [Custom Object Collection](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding#custom-object-collection)
		- [Load Custom Data](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding#load-custom-data)
		- [Allow Custom Tags](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding#allow-custom-tags)
- [Data Shaping](https://docs.devexpress.com/Blazor/405477/components/data-editors/tagbox/data-shaping)
	- [Group Data](https://docs.devexpress.com/Blazor/405477/components/data-editors/tagbox/data-shaping#group-data)
		- [Search and Filter Data](https://docs.devexpress.com/Blazor/405477/components/data-editors/tagbox/data-shaping#search-and-filter-data)
		- [Disabled Items](https://docs.devexpress.com/Blazor/405477/components/data-editors/tagbox/data-shaping#disabled-items)
- [Multiple Columns](https://docs.devexpress.com/Blazor/405481/components/data-editors/tagbox/multiple-columns)
- [Appearance Customization](https://docs.devexpress.com/Blazor/405480/components/data-editors/tagbox/appearance-customization)
	- [Size Modes](https://docs.devexpress.com/Blazor/405480/components/data-editors/tagbox/appearance-customization#size-modes)
		- [Drop-Down List Width](https://docs.devexpress.com/Blazor/405480/components/data-editors/tagbox/appearance-customization#drop-down-list-width)
		- [Drop-Down Window Direction](https://docs.devexpress.com/Blazor/405480/components/data-editors/tagbox/appearance-customization#drop-down-window-direction)
		- [Clear Button and Placeholder](https://docs.devexpress.com/Blazor/405480/components/data-editors/tagbox/appearance-customization#clear-button-and-placeholder)
		- [Templates](https://docs.devexpress.com/Blazor/405479/components/data-editors/tagbox/templates)
- [Virtual Scrolling](https://docs.devexpress.com/Blazor/405476/components/data-editors/tagbox/data-binding#virtual-scrolling)
- [Keyboard Support](https://docs.devexpress.com/Blazor/405478/components/data-editors/tagbox/keyboard-support)
- [Input Validation](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input)
- [HTML Attributes](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes)
- [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization)