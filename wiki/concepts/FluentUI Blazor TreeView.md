---
title: FluentUI Blazor TreeView
address: c-000152
status: developing
---

# FluentUI Blazor TreeView

> Part of the **[[FluentUI Blazor]]** component library. A hierarchical list structure for displaying data in a collapsible and expandable way.

## Overview

`FluentTreeView` presents data in a tree structure with expand/collapse nodes. It supports single selection (always has a selected item once one is chosen) and multi-selection via checkboxes.

Trees can be built manually (nesting `FluentTreeItem` components) or dynamically (using the `Items` property with `TreeViewItem` objects).

> [!NOTE] Once an item has been selected, it stays selected. To clear selection, set `SelectedId = null` programmatically.

## Manual tree with FluentTreeItem

```razor
<FluentTreeView @bind-SelectedId="@SelectedId"
                @bind-CurrentSelected="SelectedItem"
                OnExpandedChanged="@(item => ExpandedItem = item)">
    <FluentTreeItem Id="Item1" Text="Root item 1">
        <FluentTreeItem Id="Item11" Text="Flowers"
                        IconStart="@(new Icons.Regular.Size16.LeafOne())">
            <FluentTreeItem Id="Item111" Text="Daisy" />
            <FluentTreeItem Id="Item112" Text="Sunflower" />
            <FluentTreeItem Id="Item113" Text="Rose" />
        </FluentTreeItem>
        <FluentTreeItem Id="Item12" Text="Nested item 2" />
    </FluentTreeItem>
</FluentTreeView>

@code {
    string? SelectedId;
    FluentTreeItem? SelectedItem;
    FluentTreeItem? ExpandedItem;
}
```

## Dynamic tree with Items parameter

```razor
<FluentTreeView Items="@Items"
                @bind-SelectedItem="@SelectedItem" />

@code {
    private ITreeViewItem? SelectedItem;
    private IEnumerable<ITreeViewItem>? Items = new List<ITreeViewItem>();

    protected override void OnInitialized()
    {
        Items = GetCompanyOrganization();
        SelectedItem = Items?.ElementAt(3);
    }

    private TreeViewItem[] GetCompanyOrganization()
    {
        return SampleData.People
                         .GetOrganization(companyCount: 5, departmentCount: 4, employeeCount: 10)
                         .ToTreeViewItems()
                         .ToArray();
    }
}
```

## ItemTemplate

Customize the rendering of each item using `ItemTemplate`. Context is the `ITreeViewItem`.

```razor
<FluentTreeView Items="@Items" @bind-SelectedItem="@SelectedItem">
    <ItemTemplate>
        <FluentBadge Color="BadgeColor.Informative"
                     Content="@context.Id"
                     Style="pointer-events: none;" />
        @context.Text
    </ItemTemplate>
</FluentTreeView>
```

> [!NOTE] When using custom templates inside tree items, add `Style="pointer-events: none;"` to elements that should not interfere with click-to-select.

## Lazy loading (unlimited items)

For large datasets, use `LazyLoadItems="true"` to load children only when a node is expanded. Children are removed from the DOM when the node collapses.

```razor
<FluentTreeView Items="@Items"
                LazyLoadItems="true"
                @bind-SelectedItem="@SelectedItem" />

@code {
    protected override async Task OnInitializedAsync()
    {
        Items = await GetItemsAsync();
    }

    private async Task<IEnumerable<ITreeViewItem>> GetItemsAsync()
    {
        await Task.Delay(300);
        var nbItems = Random.Shared.Next(3, 9);
        return Enumerable.Range(1, nbItems).Select(i => new TreeViewItem()
        {
            Text = $"Item {Random.Shared.Next(1, 9999)}",
            OnExpandedAsync = OnExpandedAsync,
            Items = TreeViewItem.LoadingTreeViewItems("Loading..."),
        }).ToArray();
    }

    private async Task OnExpandedAsync(TreeViewItemExpandedEventArgs e)
    {
        if (e.Expanded)
        {
            e.CurrentItem.Items = await GetItemsAsync();
        }
        else
        {
            e.CurrentItem.Items = TreeViewItem.LoadingTreeViewItems("Loading...");
        }
    }
}
```

## Multi-select

Set `SelectionMode="TreeSelectionMode.Multiple"` to enable checkboxes. Bind to `SelectedItems`.

```razor
<FluentTreeView Items="@Items"
                HideSelection="true"
                SelectionMode="TreeSelectionMode.Multiple"
                @bind-SelectedItems="@SelectedItems">
</FluentTreeView>
```

> [!NOTE] Multi-select is only available when using the `Items` parameter (dynamic mode), not with manual `FluentTreeItem` nesting.

### Custom checkbox visibility

Control checkbox visibility per-item using `MultipleSelectionVisibility`:

```razor
<FluentTreeView Items="@Items"
                SelectionMode="TreeSelectionMode.Multiple"
                MultipleSelectionVisibility="@GetTreeSelectionVisibility"
                @bind-SelectedItems="@SelectedItems">
</FluentTreeView>

@code {
    private TreeSelectionVisibility GetTreeSelectionVisibility(ITreeViewItem item)
    {
        return item.Id.First() switch
        {
            'C' => TreeSelectionVisibility.Collapse,
            'D' => TreeSelectionVisibility.Hidden,
            'E' => TreeSelectionVisibility.Visible,
            _ => TreeSelectionVisibility.Visible
        };
    }
}
```

## TreeViewItem class

When using the dynamic `Items` approach, each node is a `TreeViewItem` (implements `ITreeViewItem`) with properties for `Text`, `Id`, `Items`, `IconStart`, `IconEnd`, `IconAside`, `OnExpandedAsync`, and more.

## Key migration notes (v4 to v5)

- `RenderCollapsedNodes` removed -- use `LazyLoadItems` instead.
- `InitiallyExpanded` removed -- use two-way bound `Expanded` instead.
- `InitiallySelected` removed -- use `SelectedId` / `SelectedItem`.
- `Disabled` on `FluentTreeItem` removed (not supported by the underlying web component).
- New v5 parameters: `Size`, `Appearance`, `HideSelection`, `SelectionMode`, `SelectedItems`, `OnExpandedChanged`, `IconStart`, `IconEnd`, `IconAside`.

## API types

| Component | API Type |
|-----------|----------|
| `FluentTreeView` | `FluentTreeView` |
| `FluentTreeItem` | `FluentTreeItem` |
| `TreeViewItem` | `TreeViewItem` (class) |

## Related

- [[FluentUI Blazor Nav]]
- [[FluentUI Blazor Menu]]
