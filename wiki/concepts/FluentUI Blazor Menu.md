---
title: FluentUI Blazor Menu
address: c-000130
status: developing
---

# FluentUI Blazor Menu

> Part of the **[[FluentUI Blazor]]** component library. A menu system for displaying actions attached to trigger elements.

## Overview

The menu system consists of three components:

- **`FluentMenu`** -- The base container. Attached to a trigger element via the `Trigger` parameter (the element's `id`).
- **`FluentMenuList`** -- Wraps the list of menu items.
- **`FluentMenuItem`** -- A single menu item. Supports text, icons, submenus, and interactive roles (checkbox, radio).

## Best practices

- Do not render focusable or clickable items inside menu items.
- Do not use more than 2 levels of nested menus.
- Do not use verbose secondary content for menu items.

## Default menu

```razor
<FluentButton Appearance="ButtonAppearance.Primary" Id="myButton">Toggle Menu</FluentButton>
<FluentMenu Trigger="myButton" OnClick="@OnMenuClick">
    <FluentMenuList>
        <FluentMenuItem>Menu item 1</FluentMenuItem>
        <FluentMenuItem>Menu item 2</FluentMenuItem>
        <FluentMenuItem>Menu item 3</FluentMenuItem>
    </FluentMenuList>
</FluentMenu>

@code {
    private void OnMenuClick(MenuItemEventArgs args)
    {
        Console.WriteLine($"Menu item clicked: {args.Text}");
    }
}
```

## Menu interactions

The menu supports several interaction modes:

- `OpenOnHover="true"` -- opens when hovering over the trigger.
- `OpenOnContext="true"` -- opens on right-click (context menu).
- `PersistOnItemClick="true"` -- stays open after a menu item is clicked.

```razor
<FluentButton Id="hover">Hover me</FluentButton>
<FluentMenu Trigger="hover" OpenOnHover="true">
    @RenderMenuItems()
</FluentMenu>

<FluentButton Id="rightclick">Context click</FluentButton>
<FluentMenu Trigger="rightclick" OpenOnContext="true">
    @RenderMenuItems()
</FluentMenu>

<FluentButton Id="persist">Menu won't close</FluentButton>
<FluentMenu Trigger="persist" PersistOnItemClick="true">
    @RenderMenuItems()
</FluentMenu>
```

## Menu item roles

`FluentMenuItem` supports three roles via the `Role` parameter:

- `MenuItemRole.MenuItem` -- default click action.
- `MenuItemRole.Checkbox` -- toggles checked/unchecked state.
- `MenuItemRole.Radio` -- radio-button behavior within a group.

```razor
<FluentMenu Trigger="interactive" OnCheckedChanged="HandleMenuItems" OnClick="HandleMenuItems">
    <FluentMenuList>
        <FluentMenuItem Role="MenuItemRole.Checkbox">Item 2</FluentMenuItem>
        <FluentMenuItem Role="MenuItemRole.Checkbox">Item 3</FluentMenuItem>

        <FluentDivider />

        <FluentMenuItem Role="MenuItemRole.Radio">Item 4</FluentMenuItem>
        <FluentMenuItem Role="MenuItemRole.Radio">Item 5</FluentMenuItem>

        <FluentMenuItem Disabled="true">Disabled Item</FluentMenuItem>
    </FluentMenuList>
</FluentMenu>
```

## Submenus

Nested menus are created by placing `FluentMenuItem` components inside a parent item's `MenuItems` slot.

```razor
<FluentMenuItem Label="Item 1">
    <MenuItems>
        <FluentMenuItem>Subitem 1</FluentMenuItem>
        <FluentMenuItem>Subitem 2</FluentMenuItem>
    </MenuItems>
</FluentMenuItem>
```

## Programmatic open/close

```razor
<FluentMenu @ref=@Menu>
    <FluentButton slot="@FluentSlot.Trigger">Menu shows here</FluentButton>
    <FluentMenuList>
        <FluentMenuItem>Menu item 1</FluentMenuItem>
    </FluentMenuList>
</FluentMenu>

<FluentButton OnClick="OpenMenuAsync">Open menu</FluentButton>
<FluentButton OnClick="CloseMenuAsync">Close menu</FluentButton>

@code {
    private FluentMenu? Menu { get; set; }

    private async Task OpenMenuAsync()
    {
        if (Menu != null) await Menu.OpenMenuAsync();
    }

    private async Task CloseMenuAsync()
    {
        if (Menu != null) await Menu.CloseMenuAsync();
    }
}
```

`OpenMenuAsync` accepts optional `targetId`, `targetOffsetLeft`, and `targetOffsetTop` parameters to position the menu relative to a different element.

## Menu item slots and icons

`FluentMenuItem` has parameters for icon slots: `IconIndicator`, `IconStart`, `IconEnd`, `IconSubmenu`. For advanced customization, use slots directly.

```razor
<FluentMenuItem Role="MenuItemRole.Checkbox">
    <ChildContent>
        Item 1
        <span slot="@FluentSlot.Start">Icon</span>
        <span slot="@FluentSlot.End">Ctrl+S</span>
    </ChildContent>
</FluentMenuItem>
```

## Max height

```razor
<FluentMenu Trigger="trigger3" Height="200px">
    <FluentMenuList>
        <FluentMenuItem>Menu item 1</FluentMenuItem>
        <!-- more items -->
    </FluentMenuList>
</FluentMenu>
```

## Key migration notes (v4 to v5)

- `Trigger` changed from `MouseButton` to `string` (element `id`).
- `OnCheckedChanged` event args changed from `FluentMenuItem` to `MenuItemEventArgs`.
- `MenuItemRole.MenuItemCheckbox` renamed to `MenuItemRole.Checkbox`.
- `MenuItemRole.MenuItemRadio` renamed to `MenuItemRole.Radio`.
- Removed: `UseMenuService`, `Anchor`, `Open`, `Expanded`, `KeepOpen`.
- New properties: `OpenOnHover`, `OpenOnContext`, `PersistOnItemClick`, `Height`.

## API types

| Component | API Type |
|-----------|----------|
| `FluentMenu` | `FluentMenu` |
| `FluentMenuList` | `FluentMenuList` |
| `FluentMenuItem` | `FluentMenuItem` |

## Related

- [[FluentUI Blazor Nav]]
- [[FluentUI Blazor AppBar]]
