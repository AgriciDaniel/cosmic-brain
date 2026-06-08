---
title: Table scrollbars
route: /DataGrid/TableScrollbars
---

# Table scrollbars

Example of using an outside `div` and the `Style` parameter to achieve a table like DataGrid with infinite horizontal scrollbars to display all content on all devices.

If you use this in combination with a sticky header, the style of the header will be lost for the columns that are rendered out of the view initially.
You can fix this by adding the following `Style` to your data grid: `Style="min-width: max-content;"`

{{ DataGridTableScrollbars }}
