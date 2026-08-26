---
type: concept
title: "DevExpress Blazor DxGrid"
created: 2026-05-25
updated: 2026-05-25
address: c-000042
status: developing
tags:
  - blazor
  - devexpress
  - grid
  - data
  - ui-component
source_url: https://docs.devexpress.com/Blazor/403143/components/grid
source_file: .raw/Blazor Grid  Blazor.md
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxToolbar]]"
  - "[[DevExpress Blazor DxFilterBuilder]]"
  - "[[DevExpress Blazor DxTreeList]]"
---

# DevExpress Blazor DxGrid

The DevExpress Grid for Blazor (`DxGrid`) displays, manages, and shapes tabular data. Assembly `DevExpress.Blazor.v25.2.dll`.

## Data Binding

| Mode | Description |
|---|---|
| Synchronous | Standard in-memory collections |
| Asynchronous | Async data loading |
| Observable | Real-time updates via `INotifyCollectionChanged` |
| Server Mode | Large datasets, server-side processing |
| Queryable | LINQ-based large data with deferred execution |

## Data Shaping

### Sort
Unlimited multi-column sort with glyph indicators. API: `SortBy()` overloads.

### Group
Drag column headers to group panel. Supports value/display-text grouping, interval grouping, custom algorithms.

### Filter (5 UI modes)
| Mode | Description |
|---|---|
| Filter Menu | Excel-style dropdown with checklist + search |
| Filter Row | In-place editors below headers |
| Filter Panel + Builder | Current filter display, click to edit in Filter Builder |
| Search Box | Full-text search with highlighting |
| Semantic Search | AI-powered semantic filtering (demo available) |

Also supports programmatic filtering via [Criteria Operator syntax](https://docs.devexpress.com/CoreLibraries/4928/devexpress-data-library/criteria-language-syntax).

## Editing (5 modes)

| Mode | Description |
|---|---|
| Inline Edit Form | Form replaces the edited row |
| Pop-Up Edit Form | Form in modal popup |
| Inline Edit Row | Editors replace the edited row |
| EditCell | Click cell to edit; all cells saved when focus leaves row |
| Batch Editing | Accumulate changes in memory, post to DB on demand (based on EditCell) |

Validation: standard Blazor `DataAnnotationsValidator` or custom validator components.

## Additional Features

| Feature | Description |
|---|---|
| **Summaries** | Total + Group summaries; Sum, Min, Max, Avg, Count + custom algorithms |
| **Selection** | Single/multi row selection; click or selection column (checkboxes/radio) |
| **Focus** | Focused row highlighting via `FocusedRowEnabled` |
| **Master-Detail** | Row preview (content under each row) + nested grids of any depth |
| **Templates** | Column, group row, detail row, toolbar, and more |
| **Columns** | Data, Command (CRUD buttons), Selection, Band (grouped headers) |
| **Toolbar** | Custom toolbar via `ToolbarTemplate` |
| **Context Menus** | Predefined + custom commands |
| **Layout Persistence** | Auto or on-demand save/restore (sort, columns, filter, page) |
| **Export** | XLS, XLSX, CSV, PDF (reflects current filter/sort/group) |
| **Paging** | Page navigation with configurable page size selector |
| **Scrolling** | Regular + virtual (row and/or column, combinable with paging) |
| **Keyboard Nav** | Full keyboard access, client-side implementation |
| **Drag & Drop** | Row reorder + between-component moves |
| **Responsive** | Adapt layout via `DxLayoutBreakpoint` |
| **Appearance** | Size modes (S/M/L), conditional formatting, alternating row styles |
| **Localization** | Satellite assemblies: German, Spanish, Japanese + custom |
