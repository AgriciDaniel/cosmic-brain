---
title: Hierarchical data
route: /DataGrid/Hierarchical
---

# Hierarchical data

## Single-level hierarchy

The `FluentDataGrid` supports displaying hierarchical data.

By using the `HierarchicalGridItem` class (or a class derived from it) as the grid item type, 
you can define parent-child relationships between items.

Set the `HierarchicalToggle` parameter to `true` on one of the columns to display the expand/collapse button.

{{ DataGridHierarchical Files=Razor:DataGridHierarchical.razor;Code:DataGridHierarchical.razor.cs;CSS:DataGridHierarchical.razor.css}}

## Multi-level hierarchy

The hierarchical data grid can display multiple levels of nesting. In this example, we show an organization chart with three levels: CEO, Directors, and Employees.

This example also shows how to programmatically expand and collapse rows by manually setting the `IsCollapsed` property on a `HierarchicalGridItem` instance. 

{{ DataGridHierarchicalOrgChart Files=Razor:DataGridHierarchicalOrgChart.razor;Code:DataGridHierarchicalOrgChart.razor.cs }}

## Hierarchical and selectable

A hierarchical grid can have selectable rows by using the `HierarchicalSelectColumn`. Basically this is a combination of a `SelectColumn`, a `TemplateColumn` and 
parameters related to the `HierarchicalGridItem` already set to sensible defaults. A HierarchicalSelectColumn **must**  be the first column in the grid.

With regards to the select capabilities, this column type **only supports multiple selection** (i.e. `DataGridSelectMode.Multiple` is set and cannot be changed).
The selected state of an item is tied to the parent-child relationships between items:
- If any child is selected or 1 child is not selected, parent state is indeterminate
- If all children are selected, parent state is selected
- If a parent state is set to selected, all children will be selected
- If a parent state is set to unselected, all children will be unselected


{{ DataGridHierarchicalSelectableOrgChart Files=Razor:DataGridHierarchicalSelectableOrgChart.razor;Code:DataGridHierarchicalSelectableOrgChart.razor.cs }}
