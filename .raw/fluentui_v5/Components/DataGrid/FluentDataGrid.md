---
title: DataGrid
route: /DataGrid/[Default]
icon: Table
---

# DataGrid

The DataGrid is actually comprised of several components and used to display tabular data. The `<FluentDataGrid>` component is the most important
component and is the one normally put onto a page. Internally it uses the`<FluentDataGridRow>` and `<FluentDataGridCell>` components to build up
the grid. It is possible (technically speaking) to use these components manually, but that is **not** the recommended way of working with the DataGrid.

## Rendering

The DataGrid uses standard HTML table elements for rendering the grid. It supports 2 different display modes through the `DisplayMode`
parameter: `DataGridDisplayMode.Grid` (default) and `DataGridDisplayMode.Table`.

- With the `Grid` mode, the `GridTableColumns` parameter can be
used to specify column widths in fractions. It basically provides an HTML table element with a `display: grid;` style.
- With the `Table` mode, it uses standard HTML table elements and rendering. Column widths are best specified through the `Width` parameter on the columns.

> [!NOTE] Specifically when using `Virtualize`, it is **highly recommended** to use the `Table` display mode as the `Grid` mode can exhibit odd scrolling behavior.

## Accessibility

You can use the <kbd>Arrow</kbd> keys to navigate through a DataGrid. When a header cell is focused and the column is sortable, you can use the
<kbd>Tab</kbd> key to select the sort button. Pressing the <kbd>Enter</kbd> key will toggle the sorting direction. Pressing <kbd>Shift</kbd> + <kbd>s</kbd>
removes the column sorting and restores the default/start situation with regards to sorting. *You cannot remove the default grid sorting with
this key combination*.

When a header cell is focused and the column allows setting options, you can use the <kbd>Tab</kbd> key to select the options button. Pressing
the <kbd>Enter</kbd> key then will toggle the options popover. Pressing <kbd>Esc</kbd> closes the popover .

When a grid allows resizing of the columns, you can use the <kbd>+</kbd> and <kbd>-</kbd> keys to resize the column the focused header belongs
to. Incrementing/decrementing width is done in steps of 10 pixels at a time. You can reset to the original initial column widths by pressing
<kbd>Shift</kbd> + <kbd>r</kbd>.

When a row cell is focused, the grid contains a `SelectColumn` (with `SelectFromEntireRow` parameter set to `true` (default)), you can use the <kbd>Enter</kbd> key to select or unselect the current
row.

## Sorting

The DataGrid supports sorting by clicking on the column headers (when the `HeaderCellAsButtonWithMenu` parameter is `false` (default)). The default sort direction is ascending. Clicking on the same column header
again will toggle the sort direction. When `HeaderCellAsButtonWithMenu` is true, a menu will be used to get trigger the sorting action.

A sort can be removed by right clicking (or by pressing <kbd>Shift</kbd> + <kbd>r</kbd>) on the header column (with exception of
the default sort).

*The minimal width for a sortable column is 75 pixels.*

## Row size

The DataGrid offers a `RowSize` parameter which allows you to use different preset row heights. The value uses the `DataGridRowSize`
enumeration for its type. When using `Virtualize`, the `ItemSize` value **must** still be used to indicate the row height.

## Localization

The DataGrid includes several UI strings that can be customized using the built-in [localization](/localization) functionality. A complete list of available translation key/value pairs can be found [here](/localization?search=DataGrid#default-translations).

## Using the DataGrid component with EF Core

If you want to use the `FluentDataGrid` with data provided through EF Core, you need to install an additional package so the grid knows how to resolve queries asynchronously for efficiency.

### Installation

Install the package by running the command:

```cshtml
dotnet add package Microsoft.FluentUI.AspNetCore.Components.DataGrid.EntityFrameworkAdapter
```

### Usage

In your `Program.cs` file you need to add the following after the `builder.Services.AddFluentUIComponents();` line:

```csharp
builder.Services.AddDataGridEntityFrameworkAdapter();
```

## Using the DataGrid component with OData

If you want to use the `FluentDataGrid` with data provided through OData, you need to install an additional package so the grid knows how to resolve queries asynchronously for efficiency.

### Installation

Install the package by running the command:

```cshtml
dotnet add package Microsoft.FluentUI.AspNetCore.Components.DataGrid.ODataAdapter
```

### Usage

In your `Program.cs` file you need to add the following after the `builder.Services.AddFluentUIComponents();` line:

```csharp
builder.Services.AddDataGridODataAdapter();
```

## Examples

The following examples show how to use the DataGrid component in different scenarios:

### Basics

- [Getting started](/DataGrid/GettingStarted)
- [Typical grid usage](/DataGrid/Typical)

### Layout

- [Pinned columns](/DataGrid/PinnedColumns)
- [Loading and empty content](/DataGrid/LoadingAndEmptyContent)
- [Auto fit columns](/DataGrid/AutoFit)
- [Auto items per page](/DataGrid/AutoItemsPerPage)
- [Custom paging](/DataGrid/CustomPaging)
- [Multi line text in cells](/DataGrid/MultiLineText)
- [Table with scrollbars](/DataGrid/TableScrollbars)

### Sorting

- [Custom comparer for sorting](/DataGrid/CustomComparerSort)
- [Custom sorting](/DataGrid/CustomSort)

### Columns

- [Single/Multi select](/DataGrid/MultiSelect)
- [Dynamic columns](/DataGrid/DynamicColumns)
- [Column headers](/DataGrid/HeaderGeneration)
- [Template columns](/DataGrid/TemplateColumns)
- [Template columns 2](/DataGrid/TemplateColumns2)

### Advanced

- [Custom comparer](/DataGrid/CustomComparerSort)
- [Virtualized grid](/DataGrid/Virtualize)
- [Remote data](/DataGrid/RemoteData)
- [Hierarchical grid](/DataGrid/HierarchicalDataGrid)
- [Manual grid](/DataGrid/ManualDataGrid)

## API FluentDataGrid

{{ API Type=FluentDataGrid<string> }}

## API FluentDataGridRow

{{ API Type=FluentDataGridRow<string> }}

## API FluentDataGridCell

{{ API Type=FluentDataGridCell<string> }}

## API PropertyColumn

{{ API Type=PropertyColumn<string,string> }}

## API TemplateColumn

{{ API Type=TemplateColumn<string> }}

## API SelectColumn

{{ API Type=SelectColumn<string> }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentDataGrid }}
