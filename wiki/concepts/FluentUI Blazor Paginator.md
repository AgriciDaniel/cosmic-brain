---
title: FluentUI Blazor Paginator
status: developing
address: c-000135
---

# FluentUI Blazor Paginator

The `FluentPaginator` component displays a set of pages for navigating through a collection of items. It is most commonly used in combination with the [[FluentUI Blazor]] `FluentDataGrid`.

## Usage

The Paginator binds to a `PaginationState` object which tracks the current page and items per page. Multiple paginators can share the same `PaginationState` to stay synchronized (e.g., one at the top and one at the bottom of a grid).

```razor
<FluentPaginator State="@pagination" SummaryTemplate="@template" />

<FluentDataGrid Items="@people" Pagination="@pagination">
    <PropertyColumn Property="@(p => p.PersonId)" Sortable="true" />
    <PropertyColumn Property="@(p => p.Name)" Sortable="true" />
</FluentDataGrid>

<FluentPaginator State="@pagination" />

@code {
    PaginationState pagination = new PaginationState() { ItemsPerPage = 10 };
    IQueryable<Person> people = new[] { ... }.AsQueryable();
    private RenderFragment template = @<span />;
}
```

## Custom Templates

Customize the paginator appearance with `SummaryTemplate` and `PaginationTextTemplate` parameters. The `SummaryTemplate` replaces the default item count text. The `PaginationTextTemplate` customizes the page status text (e.g., "Page {0} of {1}").

## Auto Items Per Page

When used with `FluentDataGrid`, set `AutoItemsPerPage="true"` on the grid and the paginator will adapt the page size based on available vertical space. The grid's container must have styling that adapts to available height.

## Localization

The Paginator has several localizable strings:

| Key | Default |
|-----|---------|
| `Paginator_GoFirstPage` | Go to first page |
| `Paginator_GoLastPage` | Go to last page |
| `Paginator_GoNextPage` | Go to next page |
| `Paginator_GoPreviousPage` | Go to previous page |
| `Paginator_Status` | Page {0} of {1} |
| `Paginator_SummaryItem` | {0} item |
| `Paginator_SummaryItems` | {0} items |
| `Paginator_SummaryNoItems` | No items |

These can be overridden using the built-in localization functionality.

## API Reference

| Component | API Type |
|-----------|----------|
| FluentPaginator | `FluentPaginator` |
