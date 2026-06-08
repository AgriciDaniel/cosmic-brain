---
type: concept
title: "DevExpress Blazor DxToolbar"
created: 2026-05-25
updated: 2026-05-25
address: c-000031
status: developing
tags:
  - blazor
  - devexpress
  - toolbar
  - ui-component
  - navigation
  - api-reference
related:
  - "[[DevExpress Blazor]]"
  - "[[FluentUI Blazor]]"
  - "[[devexpress-blazor-dxtoolbar]]"
---

# DevExpress Blazor DxToolbar

The `DxToolbar` component provides a horizontal command bar with buttons, dropdowns, and groups. It supports both declarative and data-bound modes, responsive adaptivity, and rich customization.

Namespace: `DevExpress.Blazor`
Assembly: `DevExpress.Blazor.v24.2.dll`
Base class: `DxToolbarItemBase` (namespace `DevExpress.Blazor.Base`)

## Architecture

Two operating modes:
- **Unbound**: declare `<DxToolbarItem>` children directly inside `<DxToolbar>`
- **Bound**: pass a data source via `Data` + `<DataMappings>` with `<DxToolbarDataMapping>`

## Component Properties

### Adaptivity (Responsive)

| Property | Description |
|---|---|
| `AdaptivityAutoCollapseItemsToIcons` | Hide text labels on resize, keep icons visible |
| `AdaptivityAutoHideRootItems` | Move root items into an overflow submenu on resize |
| `AdaptivityMinRootItemCount` | Minimum number of root items kept visible during adaptivity |

Per-item: `AdaptivePriority` (int, lower values hide first).

### Display & Style

| Property | Description |
|---|---|
| `DropDownDisplayMode` | Sub-menu, modal dialog, or modal bottom sheet |
| `ItemRenderStyleMode` | `Plain` or `Contained` style for all items |
| `SizeMode` | Controls size of toolbar and inner components (replaces obsolete `ItemSizeMode`) |
| `CssClass` | CSS class on root element |

### Content

| Property | Description |
|---|---|
| `Title` | Toolbar title string |
| `TitleTemplate` | Custom Razor template for title area |
| `Items` | Declarative child items |

### Data Binding

| Property | Description |
|---|---|
| `Data` | `IEnumerable` data source for bound mode |

## Component Events

| Event | Description |
|---|---|
| `ItemClick` | Fires when any item is clicked. `ToolbarItemClickEventArgs.ItemName` identifies the item. |

## DxToolbarItem

Each toolbar item is a `DxToolbarItem` component.

### Core Properties

| Property | Description |
|---|---|
| `Name` | Unique identifier (surfaced in `ItemClick` args) |
| `Text` | Display text |
| `IconCssClass` | CSS class for icon (e.g., `"oi oi-plus"`) |
| `IconUrl` | Icon image URL |
| `BeginGroup` | Start a new visual group with separator |
| `Alignment` | `Start` or `End` |
| `Enabled` | Interactive state |
| `Visible` | Visibility |
| `Tooltip` | Tooltip text |
| `CssClass` | Custom CSS class |
| `Attributes` | Additional HTML attributes dictionary |

### Navigation

| Property | Description |
|---|---|
| `NavigateUrl` | URL for hyperlink rendering |
| `Target` | Link target (e.g., `_blank`) |

### Checked / Radio Groups

| Property | Description |
|---|---|
| `Checked` | Toggle/radio checked state |
| `GroupName` | Radio group name; items sharing a GroupName are mutually exclusive |

### Dropdown & Split Button

| Property | Description |
|---|---|
| `Items` | Child `DxToolbarItem` collection (creates sub-menu) |
| `DropDownDisplayMode` | Per-item dropdown display mode override |
| `SplitDropDownButton` | Split the dropdown toggle from the primary click area |
| `CloseMenuOnClick` | Auto-close sub-menu on click |

### Render Style

| Property | Description |
|---|---|
| `RenderStyle` | Predefined appearance |
| `RenderStyleMode` | How style is applied |
| `SubmitFormOnClick` | Whether item can submit a form |

### Templates

| Property | Description |
|---|---|
| `ChildContent` | Child content |
| `Template` | Full custom Razor template |

### Item Events

| Event | Description |
|---|---|
| `Click` | Fires on item click |
| `CheckedChanged` | Fires when `Checked` state changes |

## Data Binding Details

### Flat Data

Requires `<DxToolbarDataMapping>` with `Key` and `ParentKey`:

```razor
<DxToolbar Data="@items" ItemClick="@OnItemClicked">
    <DataMappings>
        <DxToolbarDataMapping Text="ValueName" Key="Id" ParentKey="ParentId" />
    </DataMappings>
</DxToolbar>
```

### Hierarchical Data

Requires `Children` mapping:

```razor
<DxToolbarDataMapping Text="Label" Key="Id" Children="SubItems" />
```

## Rendering & Styling

- **`ToolbarRenderStyleMode.Plain`**: unpainted items, minimal visual weight
- **`ToolbarRenderStyleMode.Contained`**: filled backgrounds, heavier visual weight
- Individual items can override via `RenderStyle` and `RenderStyleMode`

## Adaptivity Behavior

When the browser width shrinks:

1. Items with lower `AdaptivePriority` collapse first
2. `AdaptivityAutoCollapseItemsToIcons`: text hidden, icons remain
3. `AdaptivityAutoHideRootItems`: root items move into overflow submenu
4. `AdaptivityMinRootItemCount` guarantees at least N root items stay visible

## Code Patterns

### ItemClick Central Handler

```razor
<DxToolbar ItemClick="@HandleClick">
    <DxToolbarItem Name="new" Text="New" />
    <DxToolbarItem Name="save" Text="Save" />
    <DxToolbarItem Name="delete" Text="Delete" />
</DxToolbar>

@code {
    void HandleClick(ToolbarItemClickEventArgs args) {
        switch (args.ItemName) {
            case "new": /* ... */ break;
            case "save": /* ... */ break;
            case "delete": /* ... */ break;
        }
    }
}
```

### Radio Group Items

```razor
<DxToolbarItem Text="Left" GroupName="align"
    Checked="@left" CheckedChanged="@(v => left = v)" />
<DxToolbarItem Text="Center" GroupName="align"
    Checked="@center" CheckedChanged="@(v => center = v)" />
```

### Split Dropdown Button

```razor
<DxToolbarItem Text="Export" SplitDropDownButton="true">
    <Items>
        <DxToolbarItem Text="PDF" Click="@ExportPdf" />
        <DxToolbarItem Text="Excel" Click="@ExportExcel" />
    </Items>
</DxToolbarItem>
```

## Localization

Built-in satellite assemblies: German, Spanish, Japanese. Custom via DevExpress Localization Service.

## Comparison with FluentUI Blazor

| Aspect | DxToolbar (DevExpress) | FluentUI Blazor |
|---|---|---|
| Adaptivity | Built-in (auto-collapse, auto-hide) | Manual via responsive CSS |
| Data binding | Native flat + hierarchical | Standard Blazor binding |
| Radio groups | `GroupName` property | No direct equivalent in toolbar |
| Split buttons | `SplitDropDownButton` | Not in FluentToolbar |
| Render styles | Plain + Contained modes | Fluent 2 design tokens |
| Dropdown modes | Sub-menu, modal, bottom sheet | Standard flyout |
| Licensing | Commercial | Open source (MIT) |
