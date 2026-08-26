---
title: Menu
route: /Menu
icon: LineHorizontal1Dot
---

# Menu

A menu displays a list of actions and can be attached to a button or any other element. The element the menu is attached to must have an `id` attribute
set. This `id` needs to be passed to the `FluentMenu` component in the `Trigger` parameter. The menu is then displayed when the element is clicked.

In total the menu consists of three components:
- `FluentMenu`: This is the base component which encapsulates all menu functionality.
As described above, you use the `Trigger` parameter to connect the menu to an element that
triggers showing or hiding the menu.
- `FluentMenuList`: This component contains the list of menu items that needs to be shown.
- `FluentMenuItem`: This component represents a single menu item. You can add any content to the menu
item by using either the `ChildContent` parameter or the `Label` parameter. (If you use both, both
will be displayed to the end user). You can create submenus by using the `MenuItem` parameter and adding new `FluentMenuItems` in there. 

See the API documentation below for a complete overview of the parameters and event handlers.

## Best Practices

### Don't
- Don't render focusable or clickable items inside menu items.
- Don't use more than 2 levels of nested menus.
- Don't use verbose secondary content for menuitems.

## Default Menu

In the example below, a menu is attached to the button. When a menu item is clicked, a message will be shown in the console.

Another menu is attached to the icon. There is no code attached to the menu items, so nothing will happen when they are clicked.

{{ MenuDefault }}

## Different menu interactions
The examples below show different ways to interact with the menu.
- On the left side, the menu is opened.
- In the middle, the menu is shown when a context action (usually right click) is performed on the button,
- On the right side, the menu opens normally when the button is clicked but it remains active even after a menu item is clicked.
<!-- Add explainer on CloseOnScroll when that is fixed and works -->
{{ MenuOpenInteractions }}


## Menu with max height
You can set a maximum height for the menu. If the menu items exceed this height, a scrollbar will be shown.
{{ MenuMaxHeight }}

## Menu item roles
A menu item can have any of the 3 available roles: `MenuItem` (default), `Checkbox` or `Radio`. The role can
be set using the `Role` parameter. The example below shows a menu with items using all these roles. The items
can be (sort of) grouped by using `FluentDivider` components. The example also show how to do "checked" and "clicked"
event handling and how to disable a menu item.
{{ MenuItemRoles }}

## Open/close menu programmatically
A menu can be opened and closed programmatically by using the `OpenMenuAsync` and `CloseMenuAsync` methods.

{{ MenuProgrammatic }}

The `OpenMenuAsync` method accepts an optional `targetId` parameter. When supplied, the menu is positioned relative to
the element with that `id` instead of the original `Trigger` element. The menu is anchored to the **bottom-left** corner
of the target.

You can fine-tune the position by passing the `targetOffsetLeft` and `targetOffsetTop` parameters (in pixels). These
offsets are added to the computed position, so positive values shift the menu to the right and down, while negative
values shift it to the left and up.

```csharp
// Open the menu anchored to the element with id "Target1"
await Menu.OpenMenuAsync("Target1");

// Open anchored to "Target2" and shift it 10px right and 5px down
await Menu.OpenMenuAsync("Target2", targetOffsetLeft: 10, targetOffsetTop: 5);
```

{{ MenuProgrammaticMultipleTargets }}

## Menu item slots
A menu item can has slots that can be used for specific content. The slots are `indicator`, `start`, `end` and `submenu-glyph`. In the `FluentMenuItem`
component, we have made parameters use icons for the content of these. The available parameters are `IconIndicator`, `IconStart`, `IconEnd` and `IconSubmenu`.
We believe this covers the vast majority of use cases.

If more customization is needed, it is possible to use the slots directly. The example below shows how to do that.

{{ MenuItemSlots }}

Although not advised, It is possible to use a `FluentMenuList` standalone (so not inside a `FluentMenu`).

## API FluentMenu

{{ API Type=FluentMenu }}

## API FluentMenuList
{{ API Type=FluentMenuList }}

## API FluentMenuItem

{{ API Type=FluentMenuItem }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentMenu }}
