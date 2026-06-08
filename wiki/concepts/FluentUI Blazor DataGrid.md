---
title: FluentUI Blazor DataGrid
status: developing
address: c-000111
---

# FluentUI Blazor DataGrid

The `FluentDataGrid` is the primary tabular data component in the [[FluentUI Blazor]] library. Internally it uses `FluentDataGridRow` and `FluentDataGridCell` to build the grid. It supports two display modes: `DataGridDisplayMode.Grid` (default, with CSS Grid styling) and `DataGridDisplayMode.Table` (standard HTML table rendering, recommended when using Virtualize).

## Getting Started

A minimal grid with sortable columns and pagination:

```razor
<FluentPaginator State="@pagination" />
<FluentDataGrid Items="@people" Pagination="@pagination">
    <PropertyColumn Property="@(p => p.PersonId)" Sortable="true" />
    <PropertyColumn Property="@(p => p.Name)" Sortable="true" />
    <PropertyColumn Property="@(p => p.BirthDate)" Format="yyyy-MM-dd" Sortable="true" />
</FluentDataGrid>
<FluentPaginator State="@pagination" />

@code {
    PaginationState pagination = new PaginationState() { ItemsPerPage = 2 };
    record Person(int PersonId, string Name, DateOnly BirthDate);
    IQueryable<Person> people = new[] { ... }.AsQueryable();
}
```

## Column Types

### PropertyColumn
Binds directly to a model property. Supports `Sortable`, `Format`, `Tooltip`, `Width`, `Style`, and `Align` parameters.

```razor
<PropertyColumn Property="@(p => p.Name)" Sortable="true" Width="200px" />
```

### TemplateColumn
Uses arbitrary Razor fragments for cells. Requires explicit `SortBy` for sorting and `TooltipText` for tooltips.

```razor
<TemplateColumn Title="Person" SortBy="@sortByName">
    <strong>@context.LastName</strong>, @context.FirstName
</TemplateColumn>
```

### SelectColumn
Adds checkboxes for row selection. Two approaches: automatic via `SelectedItems` (grid manages state), or manual via `Property`/`OnSelect` (for Virtualize or custom `IsSelected`). Supports `SelectAllTemplate`, `ChildContent`, and `SelectAllDisabled`.

```razor
<SelectColumn />
```

The `SelectFromEntireRow` parameter (default true) lets users toggle selection by pressing Enter on a focused row cell.

## Sorting

Click column headers to toggle sort direction (ascending first). Can be customized with:

- **GridSort**: `GridSort<Person>.ByAscending(p => p.LastName).ThenAscending(p => p.FirstName)`
- **ColumnKeyGridSort**: For columns without a direct property: `SortBy="@(new ColumnKeyGridSort<FoodRecall>("termination_date"))"`
- **Custom comparer**: Implement `IComparer<T>` and pass via `SortBy` parameter
- **ThenAlwaysAscending**: Keeps a secondary sort always ascending regardless of the primary direction

Right-click or press Shift+S to remove column sorting (cannot remove default grid sort).

## Pinned Columns

Columns can be frozen to start or end edges using `Pin="DataGridColumnPin.Start"` or `Pin="DataGridColumnPin.End"`. Start-pinned columns must be contiguous at the start; end-pinned at the end. Every pinned column requires an explicit `Width`.

```razor
<div style="overflow-x: auto;">
    <FluentDataGrid Items="@employees" Style="min-width: max-content;">
        <PropertyColumn Title="ID" Property="@(e => e.Id)" Width="60px" Pin="DataGridColumnPin.Start" />
        <PropertyColumn Title="Name" Property="@(e => e.Name)" Width="160px" Pin="DataGridColumnPin.Start" />
        ...
        <TemplateColumn Title="Actions" Width="120px" Pin="DataGridColumnPin.End">...</TemplateColumn>
    </FluentDataGrid>
</div>
```

Customize pinned background: `--fluent-data-grid-pinned-background` CSS variable.

## Reorderable Columns

Set `ReorderableColumns="true"` to let users reorder columns via drag-and-drop or a header popup menu. Not available for pinned columns. Keyboard shortcuts: Alt+F (first), Alt+L (last), Alt+P (previous), Alt+N (next).

## Dynamic Columns

Use standard Razor logic (`@if`) to conditionally include columns:

```razor
<FluentDataGrid Items="@Persons.Take(10).AsQueryable()">
    <PropertyColumn Title="ID" Property="@(c => c.Id)" Sortable="true" />
    @if (showName) { <TemplateColumn Title="Name">...</TemplateColumn> }
    @if (showBirthDate) { <PropertyColumn ... /> }
</FluentDataGrid>
```

## Column Header Generation

Headers can auto-generate from `[Display(Name=...)]` attributes on model properties, or be customized with `HeaderCellTitleTemplate`:

```razor
<PropertyColumn Property="@(p => p.PersonId)" Sortable="true">
    <HeaderCellTitleTemplate>
        <FluentStack Orientation="Orientation.Horizontal"
                     VerticalAlignment="VerticalAlignment.Center">
            <FluentIcon Icon="Icons.Regular.Size20.Person" />
            @context.Title
        </FluentStack>
    </HeaderCellTitleTemplate>
</PropertyColumn>
```

## Remote Data

Use `ItemsProvider` for server-side data fetching (Blazor WebAssembly or Server against external APIs). The callback receives `GridItemsProviderRequest<TGridItem>` with start index, count, and sort info. Must return `GridItemsProviderResult` with `items` and `totalItemCount`.

```razor
<FluentDataGrid ItemsProvider="foodRecallProvider" Virtualize="true"
                DisplayMode="DataGridDisplayMode.Table" TGridItem="FoodRecall">
```

Alternatively, use `Items` + `RefreshItems` for scenarios where the external endpoint handles filtering, paging, and sorting:

```razor
<FluentDataGrid @ref="dataGrid" Items="foodRecallItems"
                RefreshItems="RefreshItemsAsync" Pagination="pagination"
                Loading="loading" TGridItem="FoodRecall">
```

Call `dataGrid.RefreshDataAsync(true)` to force refresh.

## Custom Paging

The `FluentPaginator` works with `PaginationState`. Customize its appearance with `SummaryTemplate` and `PaginationTextTemplate`.

## Virtualization

Pass `Virtualize="true"` for efficient rendering of large datasets. Uses Blazor's built-in Virtualize component. Requires `ItemSize` for row height and `DisplayMode="DataGridDisplayMode.Table"` (Grid mode exhibits odd scrolling with Virtualize).

```razor
<div style="height: 400px; overflow-y: scroll;">
    <FluentDataGrid Items="@items" Virtualize="true"
                    DisplayMode="DataGridDisplayMode.Table"
                    ItemSize="54" GenerateHeader="DataGridGeneratedHeaderType.Sticky">
        <PropertyColumn Width="25%" Property="@(c => c.Item1)" Sortable="true" />
    </FluentDataGrid>
</div>
```

Supports `LoadingContent` and `EmptyContent` templates. Use `SetLoadingState(true/false)` on the grid ref.

## Hierarchical Data

Use `HierarchicalGridItem` as the grid item type to define parent-child relationships. Set `HierarchicalToggle="true"` on a column for expand/collapse buttons. Supports single-level and multi-level hierarchies. Programmatic expand/collapse via `IsCollapsed` property.

### HierarchicalSelectColumn
Combines `SelectColumn` and `TemplateColumn` with sensible defaults for hierarchical grids. Must be the first column. Only supports multiple selection mode. Selection cascades through parent-child relationships:
- If any child selected but not all, parent is indeterminate
- If all children selected, parent is selected
- Selecting/deselecting parent cascades to all children

## Multi-select

Two approaches:
1. **Automatic**: Provide `Items` and let the grid manage `SelectedItems`
2. **Manual**: Use `Property`, `OnSelect`, and `SelectAll` for custom control

Default Fluent Design recommends using only the checkbox for indicating selected rows. Override with CSS:

```css
.fluent-data-grid-row:has([row-selected]) > td {
    background-color: var(--neutral-fill-stealth-hover)
}
```

## Auto Fit Columns

Set `AutoFit="true"` to automatically adjust column widths to content on first render. Does not work with Virtualize. The `GridTemplateColumns` parameter is ignored when AutoFit is true.

## Auto Items Per Page

Set `AutoItemsPerPage="true"` (requires `Pagination` parameter). The grid adapts rows per page to available height when the container is resized vertically.

## Loading and Empty Content

Customize loading and empty states:

```razor
<EmptyContent>
    <FluentIcon Value="@(new Icons.Filled.Size24.Crown())" Color="@Color.Primary" />
    Nothing to see here.
</EmptyContent>
<LoadingContent>
    <FluentStack Orientation="Orientation.Vertical" HorizontalAlignment="HorizontalAlignment.Center">
        Loading...<br />
        <FluentProgressBar Width="240px" />
    </FluentStack>
</LoadingContent>
```

## Multi-line Text

Set `MultiLine="true"` when cells contain text that wraps to multiple lines.

## Table Scrollbars

Wrap the grid in a `div` with `overflow-x: auto` and set `Style="min-width: max-content;"` for horizontal scrolling. Combine with `display: table; table-layout: fixed; width: 100%;` on the outer container.

## Manual Grid

Directly use `FluentDataGridRow` and `FluentDataGridCell` (not recommended -- harder to sort, header management is complex). Use `DisplayMode="DataGridDisplayMode.Table"` for best results.

## Display Modes

- **Grid** (default): Uses `display: grid` styling. Column widths via `GridTableColumns` parameter (fractions like `"1fr 1fr"`).
- **Table**: Standard HTML table. Column widths via `Width` parameter. Recommended for Virtualize.

## Row Size

Use `RowSize` with `DataGridRowSize` enum values (e.g., `DataGridRowSize.Medium`). When using Virtualize, `ItemSize` must still be set separately.

## Accessibility

- Arrow keys navigate cells
- Tab to sort button in header (when column is sortable), Enter to toggle sort direction
- Shift+S to remove column sorting
- + and - keys resize focused column (10px steps)
- Shift+R resets column widths to initial values
- Enter toggles row selection when SelectColumn is present

## Column Resizing

Set `ResizableColumns="true"`. Two resize types: continuous and discrete (set via `ResizeType`). Customize UI labels through localization.

## Localization

Grid UI strings can be customized through built-in localization. Translation keys are prefixed with grid-related identifiers. Custom localizer example available in the demo Server project.

## EF Core Integration

```cshtml
dotnet add package Microsoft.FluentUI.AspNetCore.Components.DataGrid.EntityFrameworkAdapter
```

In Program.cs: `builder.Services.AddDataGridEntityFrameworkAdapter();`

## OData Integration

```cshtml
dotnet add package Microsoft.FluentUI.AspNetCore.Components.DataGrid.ODataAdapter
```

In Program.cs: `builder.Services.AddDataGridODataAdapter();`

## API Reference

| Component | Type |
|-----------|------|
| FluentDataGrid | `FluentDataGrid<TGridItem>` |
| FluentDataGridRow | `FluentDataGridRow<TGridItem>` |
| FluentDataGridCell | `FluentDataGridCell<TGridItem>` |
| PropertyColumn | `PropertyColumn<TGridItem, TProp>` |
| TemplateColumn | `TemplateColumn<TGridItem>` |
| SelectColumn | `SelectColumn<TGridItem>` |

## v5 Migration Notes

- `ColumnOptionsLabels` renamed to `ColumnOptionsUISettings`
- `ColumnResizeLabels` renamed to `ColumnResizeUISettings`
- `ColumnSortLabels` renamed to `ColumnSortUISettings`
- `NoTabbing` (bool) removed
- `GenerateHeader` type: `GenerateHeaderOption?` to `DataGridGeneratedHeaderType?`
- `Align` renamed to `DataGridCellAlignment`
- `GenerateHeaderOption` renamed to `DataGridGeneratedHeaderType`
- `SortDirection` renamed to `DataGridSortDirection`
