---
title: Header generation
route: /DataGrid/HeaderGeneration
---


# Header generation

## Use a DisplayAttribute
The DataGrid can generate column headers by using the `System.ComponentModel.DataAnnotations.DisplayAttribute` on properties
shown in the grid.
        
See the 'Razor' tab on how these attributes have been applied to the class properties.

{{ DataGridColumnHeaderGeneration}}

The DataGrid can display custom column header titles by setting the `HeaderCellTitleTemplate` property on columns
shown in the grid.

## Custom headers
{{ DataGridCustomHeader} }

See the 'Razor' tab on how these properties have been applied to the columns.

{{ DataGridCustomHeader  }}
