---
title: "Blazor Grid | Blazor"
source: "https://docs.devexpress.com/Blazor/403143/components/grid"
author:
published: 2001-05-15
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Blazor Grid

In This Article

The DevExpress Grid for Blazor ([DxGrid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid)) allows you to display, manage, and shape tabular data.

![Grid Overview](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview.png)

[Read Tutorial: Get Started](https://docs.devexpress.com/Blazor/403625/components/grid/get-started-with-grid) [Run Demo: Overview](https://demos.devexpress.com/blazor/Grid) [Watch Video: Get Started](https://www.youtube.com/watch?v=RVRJRUoCtyg)

## API Reference

Refer to the following list for the component API reference: [DxGrid Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid._members).

## Data Binding

The DevExpress Blazor Grid supports various data binding scenarios:

- [Synchronous Data Binding](https://docs.devexpress.com/Blazor/403737/components/grid/bind-to-data#synchronous-data-binding)
- [Asynchronous Data Binding](https://docs.devexpress.com/Blazor/403737/components/grid/bind-to-data#asynchronous-data-binding)
- [Observable Data Collections](https://docs.devexpress.com/Blazor/403737/components/grid/bind-to-data#observable-data-collections)
- [Large Data (Server Mode Sources)](https://docs.devexpress.com/Blazor/403737/components/grid/bind-to-data#large-data-server-mode-sources)
- [Large Data (Queryable Collections)](https://docs.devexpress.com/Blazor/403737/components/grid/bind-to-data#large-data-queryable-collections)

[Run Demo: Data Binding](https://demos.devexpress.com/blazor/Grid/DataBinding/Data)

## Sort Data

Users can sort data by an unlimited number of columns. The sort glyph indicates the current sort order (ascending or descending). You can also sort data in code.

![Blazor Grid Sort Data](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-sort-data.png)

[Read Tutorial: Sort Data](https://docs.devexpress.com/Blazor/404460/components/grid/data-shaping/sort-data) [Run Demo: Sort Data](https://demos.devexpress.com/blazor/Grid/Sorting) [Watch Video: Sort Data](https://www.youtube.com/watch?v=fQ7m0_cTlcI)

## Group Data

The Grid supports grouping by value and display text, interval grouping, and custom grouping algorithms. Users can drag and drop column headers onto the group panel to group Grid data. You can also group data by any number of columns in code.

![Blazor Grid Group Data](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-group-data.png)

[Read Tutorial: Group Data](https://docs.devexpress.com/Blazor/404433/components/grid/data-shaping/group-data) [Run Demo: Group Data](https://demos.devexpress.com/blazor/Grid/Grouping/GroupData) [Watch Video: Group Data](https://www.youtube.com/watch?v=9YzoEH_LUIQ)

## Edit Data

DevExpress Blazor Grid supports multiple data edit modes:

[Inline Edit Form](https://docs.devexpress.com/Blazor/404757/components/grid/editing-and-validation/edit-modes/edit-forms)

The Grid displays the edit form instead of the edited data row.

[Pop-Up Edit Form](https://docs.devexpress.com/Blazor/404757/components/grid/editing-and-validation/edit-modes/edit-forms)

The Grid displays the edit form in a pop-up window.

[Inline Edit Row](https://docs.devexpress.com/Blazor/404758/components/grid/editing-and-validation/edit-modes/edit-row)

The Grid displays inline editors instead of the edited row.

[Cell Editing](https://docs.devexpress.com/Blazor/404756/components/grid/editing-and-validation/edit-modes/edit-cell)

The Grid displays an in-place editor instead of focused cell content. Unlike other modes, the Grid in `EditCell` mode allows users to click a data cell to edit it. The Grid validates and saves all cell values simultaneously when focus leaves the edited row.

[Batch Editing](https://github.com/DevExpress-Examples/blazor-grid-batch-editing)

You can implement batch data editing based on the `EditCell` mode. Batch data editing allows users to accumulate changes in memory and post them to the database when desired.

![Blazor Grid Edit Data](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-editing-inline-edit-row.png)

[Read Tutorial: Edit Data](https://docs.devexpress.com/Blazor/403454/components/grid/editing-and-validation) [Run Demo: Edit Data](https://demos.devexpress.com/blazor/Grid/EditData/EditForms) [Watch Video: Edit Data](https://www.youtube.com/watch?v=fg-2fJ9ApEw)

### Validate User Input

In every edit mode, you can enable the standard Blazor validation mechanism (based on [DataAnnotationsValidator](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation#data-annotations-validator-component-and-custom-validation)) or create custom [validator components](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation#validator-components).

![Blazor Grid Validation in Cell Editors](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-validation-in-cell-editors.png)

[Read Tutorial: Validate User Input](https://docs.devexpress.com/Blazor/404443/components/grid/editing-and-validation/validation) [Run Demo: Input Validation](https://demos.devexpress.com/blazor/Grid/EditData/InputValidation)

## Filter Data

The DevExpress Blazor Grid ships with the following UI elements that allow users to filter data:

[Column Filter Menu](https://docs.devexpress.com/Blazor/404417/components/grid/data-shaping/filter-data/filter-menu)

The Excel-inspired filter menu displays unique column values as a checklist with a Select All option. An integrated search box is also available. You can modify the value list or use a template to customize the menu.

[Filter Row](https://docs.devexpress.com/Blazor/404325/components/grid/data-shaping/filter-data/filter-row)

The filter row displays in-place editors where users can type filter values. The grid can filter data by value or display text.

[Filter Panel and Filter Builder](https://docs.devexpress.com/Blazor/405604/components/grid/data-shaping/filter-data/filter-panel)

The filter panel displays the current filter condition and allows users to deactivate/clear it. Users can click this filter condition to open the filter builder dialog. In the dialog, they can edit and combine filter criteria applied to Grid columns.

[Search Box](https://docs.devexpress.com/Blazor/404142/components/grid/data-shaping/filter-data/search-box)

Users can type text in the search box to filter and highlight data.

[Semantic Search](https://demos.devexpress.com/blazor/AI/SemanticSearch)

DevExpress data-aware components (including Grid) support semantic search integration. You can modify the [demo source code](https://demos.devexpress.com/blazor/AI/SemanticSearch) as needed.

![Blazor Grid Filter Options](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-filter-data.png)

You can also filter Grid data in code using [criteria operator syntax](https://docs.devexpress.com/CoreLibraries/4928/devexpress-data-library/criteria-language-syntax).

[Read Tutorial: Filter API](https://docs.devexpress.com/Blazor/404327/components/grid/data-shaping/filter-data/filter-api) [Run Demo: Filter API](https://demos.devexpress.com/blazor/Grid/Filtering/FilterAPI)

## Summary

You can compute summaries across all Grid records ([total summaries](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.TotalSummary)) or for individual groups ([group summaries](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.GroupSummary)).

The Grid includes predefined aggregate functions: Sum, Min, Max, Avg, and Count. In addition to these functions, you can implement [custom summary algorithms](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridSummaryItem#add-a-custom-summary-item).

![Blazor Grid Summary](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-summary.png)

[Read Tutorial: Summary](https://docs.devexpress.com/Blazor/404471/components/grid/data-shaping/summary) [Run Demo: Total Summary](https://demos.devexpress.com/blazor/Grid/Summary/Total)

## Selection

The DevExpress Blazor Grid supports single and multiple row selection. Users can click rows or use a specially-designed column to select/deselect records. You can also manage selection in code.

![Blazor Grid Selection](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-selection.png)

[Read Tutorial: Selection and Focus](https://docs.devexpress.com/Blazor/404461/components/grid/selection-and-focus) [Run Demo: Selection Column](https://demos.devexpress.com/blazor/Grid/Selection/SelectionColumn)

## Focus

The DevExpress Blazor Grid supports a [focused row](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.FocusedRowEnabled) that highlights a row when a user clicks it.

![Blazor Grid Focused Row](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-focus.png)

[Read Tutorial: Selection and Focus](https://docs.devexpress.com/Blazor/404461/components/grid/selection-and-focus) [Run Demo: Focused Row](https://demos.devexpress.com/blazor/Grid/Selection/FocusedRow) [View Example: How to display the Chart based on the Grid focus](https://github.com/DevExpress-Examples/blazor-charts-update-chart-data-based-on-grid-focus)

## Master-Detail Views

### Row Preview

The grid can display preview sections under each data row across all columns. These sections can display any content, including tables, values from data source fields, custom text, etc.

![Blazor Grid Preview Row](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-row-preview.png)

[Read Tutorial: Row Preview](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.DetailRowTemplate) [Run Demo: Row Preview](https://demos.devexpress.com/blazor/Grid/MasterDetail/RowPreview)

### Nested Grid

The DevExpress Blazor Grid allows you to build hierarchical layouts of any complexity and depth.

![Blazor Grid Master Detail View](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-master-detail.png)

[Read Tutorial: Nested Grid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.DetailRowTemplate#master-detail-grid) [Run Demo: Nested Grid](https://demos.devexpress.com/blazor/Grid/MasterDetail/NestedGrid)  
[View Example: How to add a nested Grid to create a master-detail layout](https://github.com/DevExpress-Examples/blazor-grid-master-detail-grid) [View Example: Master-Detail with partial loading](https://github.com/DevExpress-Examples/blazor-grid-master-detail-partial-loading)

## Templates

The Grid implements a number of template properties that allow you to customize content and appearance of different Grid elements.

[Read Tutorial: Templates](https://docs.devexpress.com/Blazor/404473/components/grid/appearance-customization/templates) [Run Demo: Column Templates](https://demos.devexpress.com/blazor/Grid/Templates/Column) [Run Demo: Group Row Templates](https://demos.devexpress.com/blazor/Grid/Templates/GroupRow)

## Columns

The DevExpress Blazor Grid includes different column types:

[Data column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridDataColumn)

You can supply values from the bound data source or implement a custom value calculation logic.

[Command column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridCommandColumn)

Displays CRUD-related buttons (**New**, **Edit**, and **Delete**) and the **Clear** button that resets values in the [filter row](https://docs.devexpress.com/Blazor/404325/components/grid/data-shaping/filter-data/filter-row).

[Selection column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridSelectionColumn)

Allows users to select and deselect rows. Displays checkboxes in multiple selection mode and radio buttons in single selection mode.

[Band Column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridBandColumn)

You can combine columns into logical groups called bands. Each group has its own header.

All column types support various customization options. Refer to the following section for additional information: [Column Settings](https://docs.devexpress.com/Blazor/404479/components/grid/columns/columns#column-settings).

[Read Tutorial: Columns](https://docs.devexpress.com/Blazor/404479/components/grid/columns/columns) [Watch Video: Columns](https://www.youtube.com/watch?v=6PS4KRwRLKI)

## Toolbar

You can add a [toolbar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.ToolbarTemplate) at the top edge of a Grid component and implement data shaping operations to perform in the UI.

![Blazor Grid with Toolbar](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-toolbartemplate.png)

[Run Demo: Toolbar](https://demos.devexpress.com/blazor/Grid/ToolbarTemplate) [View Example: Implement CRUD-Related Buttons in Toolbar](https://github.com/DevExpress-Examples/blazor-grid-and-toolbar)

## Context Menu

The DevExpress Blazor Grid allows you to display [context menus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.ContextMenus) with predefined and custom commands.

![DevExpress Blazor Grid - Context Menus](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-built-in-context-menu.png)

[Read Tutorial: Blazor Grid - Built-In Context Menus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.ContextMenus) [Run Demo: Context Menu](https://demos.devexpress.com/blazor/Grid/ContextMenuIntegration)

## Save and Restore Layout

You can save and restore the Grid layout [automatically](https://docs.devexpress.com/Blazor/DevExpress.Blazor.GridPersistentLayout#keep-the-layout-persistence) or [on demand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.GridPersistentLayout#save-and-restore-the-layout-on-demand). Layout information includes the current page, column sort order and direction, column position, filter values, and grouped columns.

[Read Tutorial: Blazor Grid - Save and Restore Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.GridPersistentLayout) [Run Demo: Save and Restore the Layout](https://demos.devexpress.com/blazor/Grid/Layout) [View Example: Save and load layout information](https://github.com/DevExpress-Examples/blazor-grid-save-restore-layout)

## Export Data

The Grid allows you to export data to XLS, XLSX, CSV, and PDF. The output file reflects the current filter, sort order, and group settings.

[Read Tutorial: Export Data](https://docs.devexpress.com/Blazor/404338/components/grid/export) [Run Demo: Export Data](https://demos.devexpress.com/blazor/Grid/Export/DataAwareExport)

## Appearance

Specify the [size mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.SizeMode) to display Grid elements (for instance, text size and row height) and built-in components (for instance, pager and buttons) in small, medium, or large predefined sizes.

You can [customize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.CustomizeElement) the appearance of [most Grid UI elements](https://docs.devexpress.com/Blazor/DevExpress.Blazor.GridCustomizeElementEventArgs.ElementType) based on custom conditions.

![Blazor Grid Appearance Customization](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-appearance-customization.png)

[Run Demo: Conditional Formatting](https://demos.devexpress.com/blazor/Grid/Customization/ConditionalFormatting) [Run Demo: Alternating Row Style](https://demos.devexpress.com/blazor/Grid/Customization/AltRowStyle) [View Example: Customize cell appearance based on custom conditions](https://github.com/DevExpress-Examples/blazor-grid-conditional-formatting)

## Paging

The DevExpress Blazor Grid splits data rows across multiple pages and displays a pager to enable data navigation. The pager can include a page size selector that allows users to change the page size at runtime.

![Blazor Grid Paging](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-overview-paging.png)

[Read Tutorial: Paging](https://docs.devexpress.com/Blazor/404474/components/grid/paging-and-scrolling/paging) [Run Demo: Paging](https://demos.devexpress.com/blazor/Grid/PagingAndScrolling/Paging)

## Scrolling

The DevExpress Blazor Grid component supports regular and virtual scrolling modes. You can specify these modes separately for rows or columns. You can also combine scrolling with [paging](https://docs.devexpress.com/Blazor/404474/components/grid/paging-and-scrolling/paging). For instance, you can use regular horizontal scrolling with virtual vertical scrolling, or combine [paging](https://docs.devexpress.com/Blazor/404474/components/grid/paging-and-scrolling/paging) with column virtualization.

[Read Tutorial: Scrolling](https://docs.devexpress.com/Blazor/404753/components/grid/paging-and-scrolling/scrolling) [Run Demo: Virtual Scrolling](https://demos.devexpress.com/blazor/Grid/PagingAndScrolling/VirtualScrolling)

## Keyboard Support

Users can access every UI element in the Grid with a keyboard. Keyboard navigation is implemented on the client and works seamlessly even in Blazor Server apps with a slow connection.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

[Read Tutorial: Keyboard Support](https://docs.devexpress.com/Blazor/404652/components/grid/keyboard-support)

## Responsive Layout

The DevExpress [Layout Breakpoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint) component allows you to adapt page layouts to different screen sizes. You can modify the grid layout (for instance, add and hide columns) when a screen size breakpoint is activated.

![Responsive Grid Layout](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-responsive-layout.png)

[Run Demo: Responsive Grid](https://demos.devexpress.com/blazor/LayoutBreakpoint#ResponsiveLayout)

## Drag and Drop Rows

The DevExpress Blazor Grid supports drag-and-drop operations. You can reorder rows and move them between components.

[Read Tutorial: Row Drag and Drop](https://docs.devexpress.com/Blazor/405231/components/grid/drag-and-drop-rows)

[Run Demo: Reorder](https://demos.devexpress.com/blazor/Grid/DragDropRows/Reordering) [Run Demo: Between Components](https://demos.devexpress.com/blazor/Grid/DragDropRows/Between)

[View Example: Implement Row Drag and Drop Functionality](https://github.com/DevExpress-Examples/blazor-grid-drag-and-drop)

## Loading Animation

Blazor Grid automatically displays a loading panel when you open a [filter menu](https://docs.devexpress.com/Blazor/404417/components/grid/data-shaping/filter-data/filter-menu) with many unique items or execute a time-consuming export operation.

In other cases, you can use our DevExpress [Loading Panel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel) component to display a loading indicator; for example, when Grid fetches data from server.

![Loading Panel](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-loading-panel.png)

[Run Demo: Loading Panel](https://demos.devexpress.com/blazor/LoadingPanel#Overview)

## Localization

The Grid component’s UI elements such as labels, context menus, and error messages are displayed in English. [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization) automatically adapts the component to the user’s preferred language.

DevExpress components include predefined satellite resource assemblies for German, Spanish, and Japanese. Use the [DevExpress Localization Service](https://localization.devexpress.com/) to create and download a custom set of satellite assemblies, and modify resources.