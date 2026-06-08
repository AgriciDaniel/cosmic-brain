---
title: Reorderable columns
route: /DataGrid/ReorderableColumns
---

# Reorderable columns

The columns in the DataGrid can reordered by setting the `ReorderableColumns` parameter to true.
This will allow the user to use either drag and drop or a popup on the header of a column to change the column order. Obviously,
the reorder functionality is only available for columns that are not [pinned](/DataGrid/PinnedColumns).

## Accessibility

When using the popup to reorder columns, the user can use the following shortcuts to move the column:

- `Alt + F` to move the column to the first available position at the start of the grid
- `Alt + L` to move the column to the first available position at the end of the grid
- `Alt + P` to move the column one position towards the start of the grid
- `Alt + N` to move the column one position towards the end of the grid

*In a LTR layout, the start of the grid is the left side and the end of the grid is the right side. In a RTL layout, the start of the grid is the right side and the end of the grid is the left side.*

## Example

{{ DataGridReorderableColumns }}
