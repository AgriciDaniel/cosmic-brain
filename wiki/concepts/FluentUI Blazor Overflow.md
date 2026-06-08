---
title: FluentUI Blazor Overflow
address: c-000134
status: developing
---

# FluentUI Blazor Overflow

> Part of the **[[FluentUI Blazor]]** component library. A responsive container that manages items exceeding available space.

## Overview

`FluentOverflow` automatically handles items that exceed the container's available space. Items that do not fit are moved into an overflow area, which can be accessed via a "more" button or custom template.

### Components

- **`FluentOverflow`** -- The container that manages overflow detection and layout.
- **`FluentOverflowItem`** -- A single item inside the overflow container. Supports `Fixed` mode for items that should always remain visible.

## Basic usage

```razor
<div style="overflow: auto; resize: horizontal; padding: 10px; min-width: 55px;">
    <FluentOverflow>
        <FluentOverflowItem><FluentBadge Content="Blazor"></FluentBadge></FluentOverflowItem>
        <FluentOverflowItem><FluentBadge Content="Microsoft"></FluentBadge></FluentOverflowItem>
        <FluentOverflowItem><FluentBadge Content="Azure"></FluentBadge></FluentOverflowItem>
        <FluentOverflowItem><FluentBadge Content="DevOps"></FluentBadge></FluentOverflowItem>
        <FluentOverflowItem><FluentBadge Content="Framework"></FluentBadge></FluentOverflowItem>
    </FluentOverflow>
</div>
```

Resize the container horizontally to see items move in and out of the overflow area.

## Fixed items and ellipsis

The `Fixed` parameter on `FluentOverflowItem` controls how items behave when space is limited:

- `OverflowItemFixed.Ellipsis` -- the item always displays, but shows an ellipsis when truncated.

```razor
<FluentOverflow>
    <FluentOverflowItem Fixed="OverflowItemFixed.Ellipsis">Aspire;</FluentOverflowItem>
    <FluentOverflowItem>Blazor;</FluentOverflowItem>
    <FluentOverflowItem>Microsoft;</FluentOverflowItem>
    <FluentOverflowItem>Azure;</FluentOverflowItem>
    <FluentOverflowItem>DevOps</FluentOverflowItem>
</FluentOverflow>
```

> [!NOTE] Ellipsis works with text elements but not with components like `FluentBadge` that cannot display text truncation.

## Custom overflow templates

`FluentOverflow` provides render fragments for customizing the overflow experience:

- `MoreButtonTemplate` -- custom rendering for the "more items" indicator (receives items count).
- `OverflowTemplate` -- custom rendering for the overflow popup/content (receives the overflow items list).

```razor
<FluentOverflow OnOverflowRaised="OverflowHandler" Style="width: 100%;">
    <ChildContent>
        @foreach (var item in Items)
        {
            <FluentOverflowItem><FluentBadge Content="@item"></FluentBadge></FluentOverflowItem>
        }
    </ChildContent>
    <MoreButtonTemplate>
        <FluentBadge Style="min-width: 32px; max-width:32px;"
                     Content="@($"+{context.ItemsOverflow.Count()}")" />
    </MoreButtonTemplate>
    <OverflowTemplate>
        <FluentTooltip Anchor="@context.IdMoreButton" UseTooltipService="false">
            @foreach (var item in context.ItemsOverflow)
            {
                <div style="margin: 5px;">@item.Text</div>
            }
        </FluentTooltip>
    </OverflowTemplate>
</FluentOverflow>
```

## VisibleOnLoad

When `VisibleOnLoad="false"`, overflow items are not shown until the layout is fully calculated. This prevents a flash of visible items before the overflow logic runs.

```razor
<FluentOverflow VisibleOnLoad="false">
    <FluentOverflowItem>Item 1</FluentOverflowItem>
    <FluentOverflowItem>Item 2</FluentOverflowItem>
</FluentOverflow>
```

## Dynamic item changes

Items can be added or removed dynamically. The overflow recalculates automatically:

```razor
<FluentButton OnClick="@AddNewItemClick">Add</FluentButton>
<FluentButton OnClick="@RemoveLastItemClick">Remove</FluentButton>

@code {
    List<string> Items = new List<string> { "Blazor", "WPF" };

    void AddNewItemClick()
    {
        Items.Add("Azure");
    }

    void RemoveLastItemClick()
    {
        Items.RemoveAt(Items.Count - 1);
    }
}
```

## Overflow events

The `OnOverflowRaised` event fires when the set of overflowed items changes, providing the current overflow items:

```razor
<FluentOverflow OnOverflowRaised="OverflowHandler">
    <!-- items -->
</FluentOverflow>

@code {
    void OverflowHandler(IEnumerable<FluentOverflowItem> items)
    {
        var text = string.Join("; ", items.Select(i => i.Text));
        Console.WriteLine($"Overflow items: {text}");
    }
}
```

## API types

| Component | API Type |
|-----------|----------|
| `FluentOverflow` | `FluentOverflow` |
| `FluentOverflowItem` | `FluentOverflowItem` |

## Related

- [[FluentUI Blazor AppBar]] (uses overflow for app bar items)
