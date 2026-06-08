---
title: Multi select
route: /DataGrid/MultiSelect
---

# Multi select


## Multi select

The same example, adding a `SelectColumn`, to allow multi-select rows.

To utilize the **SelectColumn** feature in the Fluent DataGrid, there are two approaches available:

**Automatic Management via `SelectedItems`**
- Provide a list of data via the `Items` property.
- Let the grid handle selected rows entirely through the `SelectedItems` property.

**Manual Management via `Property` and `OnSelect`:**
- Control how selected lines are saved manually.
- Utilize the `Property`, `OnSelect`, and `SelectAll` attributes.

This method offers more flexibility but requires additional configuration, making it particularly useful when using `Virtualize` or directly managing a custom `IsSelected` property.

> By default the Fluent Design System recommends to only use the checkbox to indicate selected rows.
> It is possible to change this behavior by using a CSS style like this to set a background on selected rows:
> 
> ```css
> .fluent-data-grid-row:has([row-selected]) > td {
> background-color: var(--neutral-fill-stealth-hover)
> }
> ```

{{ DataGridMultiSelect } }}



Using this `SelectColumn`, you can customize the checkboxes by using `ChildContent` to define the contents of the selection for each row of the grid;
or `SelectAllTemplate` to customize the header of this column.
If you don't want the user to be able to interact (click and change) on the SelectAll header, you can set the `SelectAllDisabled="true"` attribute.


Example:
```razor
<SelectAllTemplate>
    @(context.AllSelected == true ? "✅" : context.AllSelected == null ? "➖" : "⬜")
</SelectAllTemplate>
<ChildContent>
    @(SelectedItems.Contains(context) ? "✅" : " ") @@* Using SelectedItems         *@@
    @(context.Selected ? "✅" : " ")                @@* Using Property and OnSelect *@@
</ChildContent>
```
