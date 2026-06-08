---
title: Migration FluentDataGrid
route: /Migration/DataGrid
hidden: true
---

### Renamed parameters
- `ColumnOptionsLabels` has been renamed to `ColumnOptionsUISettings`
- `ColumnResizeLabels` has been renamed to `ColumnResizeUISettings`
- `ColumnSortLabels` has been renamed to `ColumnSortUISettings`

These `...UISettings` parameters are now only used to set a custom icon and icon position. All labels that could be set in earlier versions
have now been replaced with our standard Localization capabilities. You can use a custom localizer to set custom labels for these UI settings.
An example of this can be found in the `Server` project of the demo application, where a custom localizer is registered in the `Program.cs` file.

### Removed properties 💥
- `NoTabbing` (`bool`) — removed.

### Type changes
- `GenerateHeader`: `GenerateHeaderOption?` → `DataGridGeneratedHeaderType?`
- `ErrorContent`: `RenderFragment<Exception>?` → `RenderFragment<Exception?>?`

### Enum changes
- `Align` has been renamed to `DataGridCellAlignment`
- `GenerateHeaderOption` has been renamed to `DataGridGeneratedHeaderType`
- `SortDirection` has been renamed to `DataGridSortDirection`

### New properties
- `OnExpandAll` (`EventCallback`)
- `OnCollapseAll` (`EventCallback`)
