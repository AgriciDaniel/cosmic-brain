---
title: Auto fit columns
route: /DataGrid/AutoFit
---

# Auto fit columns
The example and code below show what you need to add to one of your Blazor page components to implement auto-fit.
        
        
The `AutoFit` parameter is used to automatically adjust the column widths to fit the content. It only runs on
the first render and does not update when the content changes.
        
        
The column widths are calculated with the process below:

- Loop through the columns and find the biggest width of each cell of the column
- Build the `GridTemplateColumns` string using the `fr` unit
        
        
This does not work when `Virtualization` is turned on. The `GridTemplateColumns` parameter is ignored when `AutoFit` is set to `true`.

This is untested in MAUI.
        

{{ DataGridAutoFit }}
