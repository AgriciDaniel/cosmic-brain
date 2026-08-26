---
title: Auto items per page
route: /DataGrid/AutoItemsPerPage
---

# Auto items per page

The example and code below show what you need to get auto items per page functionality for the pagination of a datagrid.

Resize the page vertically to see the number of rows being displayed per page adapt to the available height.

The `AutoItemsPerPage` parameter must be set to true and obviously `Pagination` must be used as well for this to work.

Also, the DataGrid **container** must have styling that makes it automatically adapt to the available height.

An example of how that can be done for this demo site layout is shown in the CSS-tab in the example below.

{{ DataGridAutoItemsPerPage Files=Code:DataGridAutoItemsPerPage.razor;CSS:DataGridAutoItemsPerPage.razor.css}}

