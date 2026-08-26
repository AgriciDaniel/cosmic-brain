---
title: TreeView
route: /TreeView
icon: TextBulletListTree
---

# TreeView

A hierarchical list structure component for displaying data in a collapsible and expandable way.

Use this component when you need to present your users with a clear visual structure of content or data,
allowing them to efficiently interact and navigate through the information.
If the information is less hierarchical or node-based, consider using a list or table instead.

When using this component, it is possible not to select an item.
However, once an item has been selected, it is mandatory to keep an item selected.
If you no longer want to select anything, you must do so by code: `SelectedId = null`.

It is not possible to select multiple items at once. However, a custom development (see below) can be implemented to allow the selection of multiple items.

You can create a Tree manually by nesting `FluentTreeItem` components or by using the `Items` property of `FluentTreeView` to dynamically generate a tree from a list of objects.
If you use the `Items` property, you can also set the `ItemTemplate` property to specify how each item should be displayed.
With these two ways of creating a tree, using the `Text` parameter will display the text of the element, adding an ellipsis `...` if the text is too long.
Each element also has the properties `IconStart`, `IconEnd`, and `IconAside` to display an icon to the left, right, or at the end of the text.

> [!NOTE] When a user clicks on an item, it is selected and expanded/collapsed if children are present.
> It is not possible to open an item without selecting it (except by using the keyboard, pressing the `Enter` or `Space` key)
> or using the `Mutiple` selection feature (see below).

## Manual TreeView

In this example, we create a tree manually by nesting `FluentTreeItem` components.

Using `SelectedId` parameter, we can select an item by passing its `Id` to the `FluentTreeView` component.
When this parameter is bound to a variable, the selected item will be highlighted for other usages.

Using `CurrentSelected` parameter, we can select an item by passing its `FluentTreeItem` to the `FluentTreeView` component.
When this parameter is bound to a variable, the selected item will be highlighted for other usages.

The event `OnExpandedChanged` is triggered when the user expands or collapses an item.

{{ TreeViewDefault }}

## Items parameter

In this example, we create a tree dynamically by using the `Items` property of `FluentTreeView`.
The `Items` parameter is a list of [**TreeViewItem**](/TreeView#class-treeviewitem) that represent the items in the tree.

When a user selects an item, the `SelectedItem` parameter is updated with the `ITreeViewItem` of the selected item.

{{ TreeViewItems }}

## ItemTemplate

Using an ItemTemplate, we can specify how each item should be displayed.
`context` is the current item `ITreeViewItem` in the loop, and we can use its properties to display the item.

```razor
<ItemTemplate>
    <FluentBadge Color="BadgeColor.Informative" Content="@context.Id" Style="pointer-events: none;" />
    @context.Text
</ItemTemplate>
```

{{ TreeViewItemTemplate }}

**Note**:
In some situation, the tree item elements may not catch the click event to select the item.
To avoid this, you can use the `Style="pointer-events: none;"` property to disable the pointer events on the element
and let the click event pass through to the parent element.

## Unlimited Items

If you have a very large number of items, you can use the `LazyLoadItems` parameter.
This parameter tells the component to load items only when the node is expanded.
Once the node is closed, the items are removed from the DOM and are not displayed.

{{ TreeViewWithUnlimitedItems }}

## Mutliple Selection

The `FluentTreeView` component supports the multiple selection of items using the `SelectionMode` parameter.
When this parameter is set to `TreeSelectionMode.Multiple`, a checkbox is displayed next to each item.

Each time the user clicks on an item, the checkbox is checked or unchecked, and the parameter `SelectedItems`
is updated with the list of selected items.

We recommand to set the `HideSelection` parameter to `true` to hide the default selection of the item when the `MultiSelect`
parameter is set. This is more user-friendly and allows the user to see the selected items more clearly.

> [!NOTE] This **Multiple Selection** feature is only available when the `Items` parameter is used to generate the tree.

{{ TreeViewMultiSelect }}


## Mutliple Selection with customized checkbox visibility

You can customize the visibility of the checkbox using the `MultipleSelectionVisibility` parameter.
This function allows you to show, hide (keeping the space) or hide and remove the checkbox, based on each `ITreeViewItem` objects.

In this example, we use the `GetTreeSelectionVisibility` function to determine the visibility of the checkbox based
on the first letter of the `Id` of the item. The result is a TreeView with a checkbox only for the `Employee` items (level 3).

```csharp
TreeSelectionVisibility GetTreeSelectionVisibility(ITreeViewItem item)
{
    return item.Id.First() switch
    {
        // Company or Department => collapsed checkbox
        'C' => TreeSelectionVisibility.Collapse,
        'D' => TreeSelectionVisibility.Hidden,

        // Employee or others => visible checkbox
        'E' => TreeSelectionVisibility.Visible,
        _ => TreeSelectionVisibility.Visible
    };
}
```

{{ TreeViewMultipleSelectionVisibility }}

We don't have a possibility to customize the type of checkbox used in the `FluentTreeView` component.
For example, if you want to use a mixed checkbox, you can use the `ItemTemplate` part to create your own checkbox logic.

## API FluentTreeView

{{ API Type=FluentTreeView }}

## API FluentTreeItem

{{ API Type=FluentTreeItem }}

## Class TreeViewItem

{{ API Type=TreeViewItem Properties=All }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentTreeView }}
