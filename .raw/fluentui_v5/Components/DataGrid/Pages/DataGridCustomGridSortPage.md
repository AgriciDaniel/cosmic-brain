---
title: Custom sort
route: /DataGrid/CustomSort
---

# Custom sort

## Sort by Rank
Here is an example that demonstrates some of the sort order specification that are available in the <code>GridSort</code> class.

{{ DataGridCustomGridSort }}

## Column Key Sort
In some instances, your dataset may not have a property on the class that can be used for sorting.
In this instance, you can supply a <code>ColumnKeyGridSort</code> that allows you to specify the name of your column and supply the logic for sorting.

{{ DataGridColumnKeyGridSort } }}

## Documentation
`GridSort<TGridItem>` Class methods

{{ API Type=GridSort }}

