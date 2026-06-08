---
title: "Blazor TreeList | Blazor"
source: "https://docs.devexpress.com/Blazor/404942/components/treelist"
author:
published: 2001-03-05
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Blazor TreeList

In This Article

The DevExpress TreeList for Blazor ([DxTreeList](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList)) combines the power of a traditional Grid with a TreeView in a single UI component. Use our TreeList component to display, manage, and shape hierarchical data.

![TreeList Overview](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview.png)

[Read Tutorial: Getting Started](https://docs.devexpress.com/Blazor/405000/components/treelist/get-started-with-treelist) [Run Demo: Overview](https://demos.devexpress.com/blazor/TreeList) [View Example: Getting Started](https://github.com/DevExpress-Examples/blazor-treelist-get-started)

## API Reference

Refer to the following list for the component API reference: [DxTreeList Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList._members).

## Data Binding

The DevExpress Blazor TreeList supports various data binding scenarios:

- [Flat Data](https://docs.devexpress.com/Blazor/404976/components/treelist/bind-to-data#flat-data)
- [Hierarchical Data](https://docs.devexpress.com/Blazor/404976/components/treelist/bind-to-data#hierarchical-data)
- [Observable Data Collections](https://docs.devexpress.com/Blazor/404976/components/treelist/bind-to-data#observable-data-collections)
- [Server-Side Data](https://docs.devexpress.com/Blazor/404976/components/treelist/bind-to-data#server-side-data)
- [Load Data on Demand](https://docs.devexpress.com/Blazor/404976/components/treelist/bind-to-data#load-data-on-demand)

[Run Demo: Data Binding](https://demos.devexpress.com/blazor/TreeList/DataBinding/FlatData)

## Sort Data

Users can [sort data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.AllowSort) by an unlimited number of columns. The sort glyph indicates the current sort order (ascending or descending). You can also [sort data in code](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.SortBy.overloads).

![Blazor TreeList Sort Data](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-sort-data.png)

[Read Tutorial: Sort Data](https://docs.devexpress.com/Blazor/405036/components/treelist/data-shaping/sort-data) [Run Demo: Sort Data](https://demos.devexpress.com/blazor/TreeList/Sorting)

## Edit Data

DevExpress Blazor TreeList supports multiple data edit modes:

[Inline Edit Form](https://docs.devexpress.com/Blazor/405167/components/treelist/editing-and-validation/edit-modes/edit-forms)

The TreeList displays the edit form instead of the edited data row.

[Pop-Up Edit Form](https://docs.devexpress.com/Blazor/405167/components/treelist/editing-and-validation/edit-modes/edit-forms)

The TreeList displays the edit form in a pop-up window.

[Inline Edit Row](https://docs.devexpress.com/Blazor/405168/components/treelist/editing-and-validation/edit-modes/edit-row)

The TreeList displays inline editors instead of the edited row.

[Cell Editing](https://docs.devexpress.com/Blazor/405166/components/treelist/editing-and-validation/edit-modes/edit-cell)

The TreeList displays an in-place editor instead of focused cell content. Unlike other modes, the TreeList in `EditCell` mode allows users to click a data cell to edit it. The TreeList validates and saves all cell values simultaneously when focus leaves the edited row.

[Batch Editing](https://github.com/DevExpress-Examples/blazor-treelist-batch-editing)

You can implement batch data editing based on the `EditCell` mode. Batch data editing allows users to accumulate changes in memory and post them to the database when desired.

![Blazor TreeList Inline Edit Row](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-editing-inline-edit-row.png)

[Read Tutorial: Edit Data](https://docs.devexpress.com/Blazor/403454/components/grid/editing-and-validation) [Run Demo: Edit Data](https://demos.devexpress.com/blazor/TreeList/EditData/EditForms)

### Validate User Input

In every edit mode, you can enable the standard Blazor validation mechanism (based on [DataAnnotationsValidator](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation#data-annotations-validator-component-and-custom-validation)) or create custom [validator components](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation#validator-components).

![Blazor TreeList Validation in Cell Editors](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-validation-in-cell-editors.png)

[Read Tutorial: Validate User Input](https://docs.devexpress.com/Blazor/405175/components/treelist/editing-and-validation/validation) [Run Demo: Input Validation](https://demos.devexpress.com/blazor/TreeList/EditData/InputValidation)

## Filter Data

The DevExpress Blazor Grid ships with the following UI elements that allow users to filter data:

[Column Filter Menu](https://docs.devexpress.com/Blazor/405186/components/treelist/data-shaping/filter-data/filter-menu)

The Excel-inspired filter menu displays unique column values as a checklist with a Select All option. An integrated search box is also available. You can modify the value list or use a template to customize the menu.

[Filter Row](https://docs.devexpress.com/Blazor/405033/components/treelist/data-shaping/filter-data/filter-row)

The filter row displays in-place editors where users can type filter values. The grid can filter data by value or display text.

[Filter Panel and Filter Builder](https://docs.devexpress.com/Blazor/405694/components/treelist/data-shaping/filter-data/filter-panel)

The filter panel displays the current filter condition and allows users to deactivate/clear it. Users can click this filter condition to open the filter builder dialog. In the dialog, they can edit and combine filter criteria applied to Grid columns.

[Search Box](https://docs.devexpress.com/Blazor/405470/components/treelist/data-shaping/filter-data/search-box)

Users can type text in the search box to filter and highlight data.

![Blazor TreeList Filter Row](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-filter-data.png)

You can also filter Grid data in code using [criteria operator syntax](https://docs.devexpress.com/CoreLibraries/4928/devexpress-data-library/criteria-language-syntax).

[Read Tutorial: Filter API](https://docs.devexpress.com/Blazor/405034/components/treelist/data-shaping/filter-data/filter-api) [Run Demo: Filter API](https://demos.devexpress.com/blazor/TreeList/Filtering/FilterAPI)

## Summary

You can compute [total summaries](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.TotalSummary) across all TreeList records. The TreeList includes predefined aggregate functions: `Sum`, `Min`, `Max`, `Avg`, and `Count`. In addition to these functions, you can implement custom summary algorithms.

![Blazor TreeList Summary](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-summary.png)

[Read Tutorial: Summary](https://docs.devexpress.com/Blazor/405038/components/treelist/data-shaping/summary) [Run Demo: Total Summary](https://demos.devexpress.com/blazor/TreeList/Summary/TotalSummary) [Run Demo: Custom Summary](https://demos.devexpress.com/blazor/TreeList/Summary/CustomSummary)

## Selection

The DevExpress Blazor TreeList supports single and multiple row selection. Users can [click rows](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.AllowSelectRowByClick) or use a [specially designed column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeListSelectionColumn) to select/deselect records. You can also manage selection in code.

![Blazor TreeList Selection](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-selection.png)

[Read Tutorial: Selection and Focus](https://docs.devexpress.com/Blazor/405082/components/treelist/selection) [Run Demo: Multiple Row Selection](https://demos.devexpress.com/blazor/TreeList/Selection/MultipleRowSelection)

## Focus

The DevExpress Blazor Grid supports a [focused row](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.FocusedRowEnabled) that hightlights a row when a user clicks it.

![Blazor TreeList Focused Row](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-focus.png)

[Read Tutorial: Selection and Focus](https://docs.devexpress.com/Blazor/405082/components/treelist/selection) [Run Demo: Focused Row](https://demos.devexpress.com/blazor/TreeList/Selection/FocusedRow)

## Templates

The TreeList implements a number of template properties that allow you to customize content and appearance of different TreeList elements. Templates implement a *context* parameter that contains element-related data and a reference to the TreeList component, so you can access its API.

[Read Tutorial: Templates](https://docs.devexpress.com/Blazor/405044/components/treelist/appearance-customization/templates)

## Columns

The DevExpress Blazor TreeList includes different column types:

[Data column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeListDataColumn)

Obtains values from the bound data source.

[Command column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeListCommandColumn)

Displays CRUD-related buttons (**New**, **Edit**, and **Delete**) and the **Clear** button that resets values in the [filter row](https://docs.devexpress.com/Blazor/405033/components/treelist/data-shaping/filter-data/filter-row).

[Selection column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeListSelectionColumn)

Allows users to select and deselect rows. This column displays checkboxes in multiple selection mode and radio buttons in single selection mode.

[Band Column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeListBandColumn)

Allows you to combine columns into logical groups called bands. Each group has its own header.

All column types support various customization options. Refer to the following section for additional information: [Column Settings](https://docs.devexpress.com/Blazor/405029/components/treelist/columns/columns#column-settings).

[Read Tutorial: Columns](https://docs.devexpress.com/Blazor/405029/components/treelist/columns/columns)

## Toolbar

You can add a [toolbar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.ToolbarTemplate) at the top edge of a Grid component and implement data shaping operations to perform in the UI. Implement required commands and thus make them immediately available to users. The embedded toolbar automatically synchronizes its layout and styles with the TreeList component.

![Blazor TreeList with Toolbar](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-toolbartemplate.png)

[Run Demo](https://demos.devexpress.com/blazor/TreeList/Columns/ColumnChooser)

## Context Menu

The DevExpress Blazor TreeList allows you to display [context menus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.ContextMenus) with predefined and [custom commands](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.CustomizeContextMenu).

![DevExpress Blazor TreeList - Context Menus](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-built-in-context-menu.png)

[Run Demo: Context Menu](https://demos.devexpress.com/blazor/TreeList/ContextMenuIntegration)

## Save and Restore Layout

You can save and restore the Grid layout [automatically](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TreeListPersistentLayout#keep-the-layout-persistence) or [on demand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TreeListPersistentLayout#save-and-restore-the-layout-on-demand). Layout information includes the current page, column sort order and direction, column position, filter values, and grouped columns.

[Run Demo: Save and Restore the Layout](https://demos.devexpress.com/blazor/TreeList/Layout)

## Export Data

The TreeList allows you to export data to XLS, XLSX, CSV, and PDF. The output file reflects the current filter settings and sort order.

[Read Tutorial: Export Data](https://docs.devexpress.com/Blazor/405163/components/treelist/export) [Run Demo: Export Data](https://demos.devexpress.com/blazor/TreeList/Export)

## Appearance

Specify the [size mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.SizeMode) to display Grid elements (for instance, text size and row height) and built-in components (for instance, pager and buttons) in small, medium, or large predefined sizes.

You can [customize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList.CustomizeElement) the appearance of [most TreeList UI elements](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TreeListCustomizeElementEventArgs.ElementType) based on custom conditions.

![Blazor TreeList Appearance Customization](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-appearance-customization.png)

[Read Tutorial: Appearance Customization](https://docs.devexpress.com/Blazor/405088/components/treelist/appearance-customization/appearance-customization) [Run Demo: Conditional Formatting](https://demos.devexpress.com/blazor/TreeList/Customization/ConditionalFormatting) [Run Demo: Alternating Row Style](https://demos.devexpress.com/blazor/TreeList/Customization/AltRowStyle)

## Paging

The DevExpress Blazor TreeList splits data rows across multiple pages and displays a pager to enable data navigation. The pager can contain the page size selector, which allows users to change page size at runtime.

![Blazor TreeList Paging](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-overview-paging.png)

[Read Tutorial: Paging](https://docs.devexpress.com/Blazor/405040/components/treelist/paging-and-scrolling/paging) [Run Demo: Paging](https://demos.devexpress.com/blazor/TreeList/PagingAndScrolling/Paging)

## Scrolling

The DevExpress Blazor TreeList component supports regular and virtual scrolling modes. You can specify these modes separately for rows or columns. You can also combine scrolling with [paging](https://docs.devexpress.com/Blazor/405040/components/treelist/paging-and-scrolling/paging). For instance, you can use regular horizontal scrolling with virtual vertical scrolling, or combine [paging](https://docs.devexpress.com/Blazor/405040/components/treelist/paging-and-scrolling/paging) with column virtualization.

![Horizontal and Vertical Virtual Scrolling](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-virtual-scrolling-enabled.gif)

[Read Tutorial: Scrolling](https://docs.devexpress.com/Blazor/405042/components/treelist/paging-and-scrolling/scrolling) [Run Demo: Virtual Scrolling](https://demos.devexpress.com/blazor/TreeList/PagingAndScrolling/VirtualScrolling)

## Keyboard Support

Users can access every UI element in the TreeList with a keyboard. Keyboard navigation is implemented on the client and works seamlessly in Blazor Server apps with a slow connection.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

[Read Tutorial: Keyboard Support](https://docs.devexpress.com/Blazor/405207/components/treelist/keyboard-support)

## Drag and Drop Rows

The DevExpress Blazor TreeList supports drag-and-drop operations. You can reorder rows, move them between components, and change the component hierarchy.

![Blazor TreeList - Drag and Drop Overview](https://docs.devexpress.com/Blazor/images/treelist/blazor-treelist-dnd-overview.gif)

[Read Tutorial: Row Drag and Drop](https://docs.devexpress.com/Blazor/405244/components/treelist/drag-and-drop-rows)

[Run Demo: Reorder Rows](https://demos.devexpress.com/blazor/TreeList/DragDropRows/Reordering) [Run Demo: Between Components](https://demos.devexpress.com/blazor/TreeList/DragDropRows/Between)

## Localization

The TreeList component’s UI elements such as labels, context menus, and error messages are displayed in English. [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization) automatically adapts the component to the user’s preferred language.

DevExpress components include predefined satellite resource assemblies for German, Spanish, and Japanese. Use the [DevExpress Localization Service](https://localization.devexpress.com/) to create and download a custom set of satellite assemblies, and modify resources.