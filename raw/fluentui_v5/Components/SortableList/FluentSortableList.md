---
title: SortableList
route: /SortableList
icon: ArrowSort
---

# SortableList

## Introduction
A [SortableJS](https://sortablejs.github.io/Sortable/) library adaptation for the Fluent UI Blazor library. Allows for reordering elements within a list or between lists using drag and drop or keyboard.

_Inspired by and based on [Burke Holland's article and code](https://devblogs.microsoft.com/dotnet/introducing-blazor-sortable/). Re-used with permission._

>[!Note] The SortableJS script is included in our library script. You do not need to include the SortableJS script manually!

The SortableList is a generic component that takes a list of items and an `ItemTemplate` that defines how to render each item in the sortable list.
Sorting/moving items within the list or between lists is handled by the component itself and does not require any code (_this is different from how
it worked with the v4 component_). Event callbacks are available to respond on these operations but they are optional. See the [API](#api-fluentsortablelist) section for more details.

>[!Note] Although the SortableList is a list component, it does not share _any_ code with the other list components in our library ([Select](/Lists/Select), [ComboBox](/Lists/ComboBox), [Listbox](/Lists/Listbox)). 

## Accessibility support
Although SortableJS does not come with any a11y support, the `FluentSortableList` component fully supports keyboard accessibility. The following operations can be used:

- <kbd>space</kbd> or <kbd>enter</kbd>: grabbing/releasing an item
- <kbd>arrow up</kbd> or <kbd>arrow down</kbd>: move a grabbed item in its own list, move focus between items (when no item is grabbed)
- <kbd>arrow left</kbd> or <kbd>arrow right</kbd>: move a grabbed item to a different list, move focus between lists (when no item is grabbed)

When an item is grabbed and moved with the keyboard, it will remain in the grabbed state until the user releases it by pressing <kbd>space</kbd> or <kbd>enter</kbd> again.
This allows users to move items across lists without having to keep the key pressed. If however, the item is cloned, it will be released immediately after moving.

The component also provides appropriate ARIA attributes to enhance screen reader support.

## Styling

The code below shows the CSS variables that have been predefined and what their default values are. These can be overwritten (by using the `Style` parameter or in your own CSS file or block).
See the examples below on how to apply these variables.

```css
.fluent-sortable-list {
  /* List styles */
  --fluent-sortable-list-border-width: var(--strokeWidthThin);
  --fluent-sortable-list-border-color: var(--colorNeutralStroke1Pressed);
  --fluent-sortable-list-padding: 4px;
  /* Item styles */
  --fluent-sortable-list-item-height: 32px;
  --fluent-sortable-list-item-padding: 0 var(--spacingHorizontalS);
  --fluent-sortable-list-item-spacing: var(--spacingVerticalXS);
  --fluent-sortable-list-item-border-width: var(--strokeWidthThin);
  --fluent-sortable-list-item-border-color: var(--colorNeutralStroke1);
  --fluent-sortable-list-item-drop-border-color: var(--accent-fill-rest);
  --fluent-sortable-list-item-drop-color: var(--neutral-layer-1);
  --fluent-sortable-list-item-background-color: var(--colorNeutralBackground4);
  --fluent-sortable-list-item-focused-background-color: var(--colorBrandBackground2);
  --fluent-sortable-list-item-focused-border-color: var(--colorBrandBackground2Hover);
  --fluent-sortable-list-item-grabbed-background-color: var(--colorBrandBackground2Hover);
  --fluent-sortable-list-item-grabbed-border-color: var(--colorBrandBackground2Pressed);
  --fluent-sortable-list-item-filtered-background-color: var(--warning);
  --fluent-sortable-list-item-filtered-color: var(--colorNeutralForegroundInverted);
}
```

## Examples

### Simple sortable list
This example shows a simple sortable list with the default styles. It shows the generic capabilities of the component by using a `Person` record for the list items.

You can drag and drop items to reorder them. You can also use the keyboard to reorder items (see [a11y](#accessibility-support)).

{{ SortableListDefault }}

### Move items between lists

Shared lists are lists where items can be dragged from one list to the other and vice-versa (depending on the lists `Drop` parameter).
Providing the same `Group` name (string) for lists is what links them together.

>[!Note] When an item is dragged into a different list, it assumes the visual style of that list. This is because Blazor controls the rendering of the list items.
    
{{ SortableListMoveBetweenLists Files=Code:SortableListMoveBetweenLists.razor;CSS:SortableListMoveBetweenLists.razor.css  }}

This is not limited to just two lists. You can have multiple lists sharing the same group name and items can be dragged between any of those lists (depending on the lists `Drop` parameter).

{{ SortableListMultipleLists Files=Code:SortableListMultipleLists.razor;CSS:SortableListMultipleLists.razor.css }}

### Clone items

Cloning is enabled by setting the `Clone` parameter to `true` (on the list you want to clone from). The item you drag or move by keyboard (see [a11y](#accessibility-support)) will be cloned and the clone will stay in the original list.

When cloning an item by keyboard, the item will be released immediately after moving to the new list.

{{ SortableListCloneBetweenLists }}
    
### Disabling sorting

You can disable sorting with the `Sort` parameter set to `false`. You can also disable dropping items on a shared list by setting the `Drop` parameter to `false`.

In the example below, you can drag or move items from list 1 to list 2, but **not** from list 2 to list 1. You can sort list 2, but **not** list 1.
    
{{ SortableListDisabledSorting }}

### Drag Handles

When setting the `Handle` parameter to true, the items can only be sorted using the drag handle itself (or using the keyboard). The following CSS classes can be used to split the drag functionality from the content:

- sortable-grab: the grabbable part of the draggable item
- sortable-item-content: the content part of the draggable item

{{ SortableListDragHandles }}

### Filtering
    
In the lists below, you cannot drag the items in the accented color. This is because these items are filtered out with an `ItemFilter` parameter (of type `Func<TItem, bool>`).
The `ItemFilter` parameter is a function that takes an item and returns a boolean value. If the function returns true, the item is excluded from dragging in the list. If the function returns false, the item can be dragged.

In the left list below, the `ItemFilter` parameter is set to filter out (at most) 4 random items from the list. In the right list, the `ItemFilter` parameter is set to filter out items with an Id larger than 6.
See the Razor tab for how the different functions are being specified.

>[!Note] The lists in this example are not part of the same group (`Group` parameter is not set). So dragging between the lists or moving focus between lists by keyboard is not possible. Only sorting items within each individual list is implemented.
    
{{ SortableListFiltering  Files=Code:SortableListFiltering.razor;CSS:SortableListFiltering.razor.css  }}

### Sortable list using fallback behavior

By setting Fallback parameter to true, the list will not use native HTML5 drag and drop behavior.
    
{{ SortableListFallback }}

##  API FluentSortableList

{{ API Type=FluentSortableList<int> }}

## API FluentSortableListEventArgs

{{ API Type=FluentSortableListEventArgs P }}

## Migrating from v4

{{ INCLUDE File=MigrationFluentSortableList }}
