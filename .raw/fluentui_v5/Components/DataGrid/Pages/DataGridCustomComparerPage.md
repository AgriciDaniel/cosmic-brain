---
title: Custom comparer for sorting
route: /DataGrid/CustomComparerSort
---

# Custom comparer for sorting

Here a custom comparer is being used to sort counties by the length of their name. The code has examples for both
`PropertyColumn` and `TemplateColumn` implementations (see the Razor tab).

For this example the code for the comparer is placed in the `DataGridCustomComparer.razor.cs` file but it
could of course be placed in its own file.

For the paginator, this example also shows how to use the `SummaryTemplate` and `PaginationTextTemplate` parameters.

This example also shows using an `OnRowFocus` event callback to detect which row the cursor is over. By setting `ShowHover`
to true, the current row will be highlighted. By default the system will use the designated hover color for this but you can specify an alternative
color by setting the `--datagrid-hover-color` CSS variable. See the Razor tab for how this is done in this example.

To show how the resize handle can be altered, when choosing to use the alternate hover color, the handle color is set to a different value.

>[!Note] Once a value has been selected for the Resize type, it cannot be set to null again. You need to refresh the page to start with a
null value again.

The resize options UI is using a customized string for the label ('Width (+/- 10px)' instead of the normal 'Column width').
This is done through the custom localizer which is registered in the Server project's Program.cs file.

{{ DataGridCustomComparer Files=Code:DataGridCustomComparer.razor;CSS:DataGridCustomComparer.razor.css }}
