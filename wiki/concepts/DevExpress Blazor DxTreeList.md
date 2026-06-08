---
type: concept
title: "DevExpress Blazor DxTreeList"
created: 2026-05-25
updated: 2026-05-25
address: c-000043
status: developing
tags:
  - blazor
  - devexpress
  - treelist
  - hierarchical-data
  - ui-component
source_url: https://docs.devexpress.com/Blazor/404942/components/treelist
source_file: raw/Blazor TreeList  Blazor.md
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxGrid]]"
  - "[[DevExpress Blazor DxFilterBuilder]]"
---

# DevExpress Blazor DxTreeList

The DevExpress TreeList for Blazor (`DxTreeList`) combines a traditional Grid with a TreeView in a single component for displaying, managing, and shaping hierarchical data. Assembly `DevExpress.Blazor.v25.2.dll`.

## Data Binding

| Mode | Description |
|---|---|
| Flat Data | Self-referencing via Key/ParentKey |
| Hierarchical Data | Nested object collections |
| Observable | Real-time updates via `INotifyCollectionChanged` |
| Server-Side | Server-mode data sources |
| Load on Demand | Child nodes fetched when expanded |

## Data Shaping

### Sort
Unlimited multi-column sort. API: `AllowSort`, `SortBy()`.

### Filter (4 UI modes)
| Mode | Description |
|---|---|
| Filter Menu | Excel-style dropdown with checklist + search |
| Filter Row | In-place editors below headers |
| Filter Panel + Builder | Current filter display, click to edit |
| Search Box | Full-text search with highlighting |

Also supports programmatic filtering via Criteria Operator syntax.

## Editing (5 modes)

Same 5 modes as DxGrid: Inline Edit Form, Pop-Up Edit Form, Inline Edit Row, EditCell, Batch Editing. Validation via `DataAnnotationsValidator` or custom validators.

## Additional Features

| Feature | Description |
|---|---|
| **Summaries** | Total summaries only (Sum, Min, Max, Avg, Count + custom) |
| **Selection** | Single/multi row; click or selection column |
| **Focus** | Focused row via `FocusedRowEnabled` |
| **Templates** | Customizable with `context` parameter exposing element data + TreeList API |
| **Columns** | Data, Command (CRUD), Selection, Band |
| **Toolbar** | Custom toolbar, auto-syncs layout with TreeList |
| **Context Menus** | Predefined + custom commands |
| **Layout Persistence** | Auto or on-demand save/restore |
| **Export** | XLS, XLSX, CSV, PDF |
| **Paging** | With configurable page size selector |
| **Scrolling** | Regular + virtual (row and/or column) |
| **Keyboard Nav** | Full keyboard access, client-side |
| **Drag & Drop** | Reorder, between components, hierarchy changes |
| **Appearance** | Size modes, conditional formatting, alternating rows |
| **Localization** | German, Spanish, Japanese + custom |

## Key Differences from DxGrid

| Aspect | DxGrid | DxTreeList |
|---|---|---|
| Data shape | Flat/tabular | Hierarchical (tree + table) |
| Binding | Sync, async, server, queryable | Flat, hierarchical, server, on-demand |
| Grouping | Built-in group panel | Not applicable (data is hierarchical) |
| Summaries | Total + Group | Total only |
| Drag & Drop | Reorder, between components | Reorder, between, hierarchy change |
