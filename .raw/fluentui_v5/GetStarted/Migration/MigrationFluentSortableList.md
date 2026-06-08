---
title: Migration FluentSortableList
route: /Migration/SortableList
hidden: true
---

### Removed parameters
The following parameters have been removed from `FluentSortableList`:

- ListItemFilteredColor 
- ListBorderWidth 
- ListBorderColor 
- ListPadding 
- ListItemBackgroundColor 
- ListItemHeight 
- ListItemBorderWidth 
- ListItemBorderColor 
- ListItemDropBorderColor 
- ListItemDropColor 
- ListItemPadding 
- ListItemSpacing 

Changing the styling of the list and list items is now done through CSS variables. See below for the list of CSS variables that have
been added and renamed. See the examples on how to apply these variables.

### Styling
The following CSS variables have changed:

`--fluent-sortable-list-background-color` has been renamed to `--fluent-sortable-list-item-background-color`.
`--fluent-sortable-list-filtered` has been renamed to `--fluent-sortable-list-item-filtered-background-color`.

### New properties
- `AriaLabel` (`string?`) — accessible label for the list.
- `OnAdd` (`EventCallback<FluentSortableListEventArgs>`) — event fired when an item is added.
- `ItemsChanged` (`EventCallback<IEnumerable<TItem>?>`) — two-way binding support for the items collection.
