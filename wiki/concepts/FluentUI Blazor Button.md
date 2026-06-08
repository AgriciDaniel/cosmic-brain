---
address: c-000105
status: developing
title: "FluentUI Blazor Button"
tags:
  - fluentui-blazor
  - components
  - buttons
  - input
---

# FluentUI Blazor Button

The FluentUI Blazor library provides six button variants, each designed for specific interaction patterns. All buttons share common styling properties (appearance, shape, size, icons, disabled state) while adding unique behaviors.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Button Types Overview

| Component | Purpose |
|-----------|---------|
| `FluentButton` | Standard action trigger (commit, submit, navigation) |
| `FluentAnchorButton` | Renders as an `<a>` tag with button styling |
| `FluentCompoundButton` | Dual-line button with label + description |
| `FluentMenuButton` | Button that opens a `FluentMenu` dropdown |
| `FluentSplitButton` | Primary action button with attached menu |
| `FluentToggleButton` | On/off toggle state button |

---

## Common Properties

### Appearance (`ButtonAppearance`)

All button types support the same five appearances via the `ButtonAppearance` enum:

- **Default** — neutral background (formerly `Neutral`)
- **Primary** — accent color for the most important action
- **Outline** — border-only, for secondary actions
- **Subtle** — minimal visual weight (formerly `Stealth`)
- **Transparent** — no background or border

> Only one **Primary** button per layout. For equal-priority actions, use neutral appearances.

```razor
<FluentButton OnClick="@HandleClick">Default</FluentButton>
<FluentButton Appearance="ButtonAppearance.Primary">Primary</FluentButton>
<FluentButton Appearance="ButtonAppearance.Outline">Outline</FluentButton>
<FluentButton Appearance="ButtonAppearance.Subtle">Subtle</FluentButton>
<FluentButton Appearance="ButtonAppearance.Transparent">Transparent</FluentButton>
```

### Shape (`ButtonShape`)

```razor
<FluentButton Shape="ButtonShape.Rounded">Rounded</FluentButton>
<FluentButton Shape="ButtonShape.Circular">Circular</FluentButton>
<FluentButton Shape="ButtonShape.Square">Square</FluentButton>
```

### Size (`ButtonSize`)

Three sizes: `Small`, `Medium` (default), `Large`. Icon sizes should match: `Size16` for small, `Size20` for medium, `Size24` for large.

```razor
<FluentButton Size="ButtonSize.Small">Small</FluentButton>
<FluentButton Size="ButtonSize.Medium">Medium</FluentButton>
<FluentButton Size="ButtonSize.Large">Large</FluentButton>
```

### Icons

Use `IconStart` or `IconEnd` to place icons. When no text content is provided, the button shrinks to icon-only size. Alternatively, set `IconOnly="true"` for explicit icon-only mode.

```razor
<FluentButton IconStart="@(new Icons.Regular.Size20.Globe())">Button</FluentButton>
<FluentButton IconEnd="@(new Icons.Regular.Size20.Globe())">Button</FluentButton>
<FluentButton IconStart="@(new Icons.Regular.Size20.Globe())" />
<FluentButton IconOnly="true">
    <FluentIcon Value="@(new Icons.Regular.Size20.Globe())" Color="Color.Error" Slot="@FluentSlot.Start" />
</FluentButton>
```

### Disabled

All buttons support `Disabled` (not interactive, no focus) and `DisabledFocusable` (not interactive but reachable via keyboard for accessibility).

```razor
<FluentButton Disabled="true">Disabled</FluentButton>
<FluentButton DisabledFocusable="true">Disabled focusable</FluentButton>
```

### Long Text

Long text wraps at the component's max width. Set a `max-width` style to control wrapping.

```razor
<FluentButton Style="max-width: 280px;">
    Long text wraps after it hits the max width of the component
</FluentButton>
```

### Loading State (`FluentButton` only)

A loading button is disabled and shows a spinner. The `Loading` parameter is bound to a `bool`.

```razor
<FluentButton Loading="@loading" OnClick="@StartLoadingAsync">Refresh</FluentButton>

@code {
    bool loading = false;
    async Task StartLoadingAsync()
    {
        loading = true;
        await Task.Delay(2000);
        loading = false;
    }
}
```

---

## FluentButton

Standard button for committing a change or triggering an action. Has the most features: loading state, all shapes, all sizes, icons.

**Key parameters:**
- `Type` (`ButtonType`) — `Button`, `Submit`, `Reset`
- `Loading` (`bool`) — shows spinner and disables
- `BackgroundColor` / `Color` — custom CSS colors

---

## FluentAnchorButton

Renders as a hyperlink (`<a>` tag) styled as a button. Supports `Href`, `Target`, `Download`.

```razor
<FluentAnchorButton Href="/page" Appearance="ButtonAppearance.Primary">Link</FluentAnchorButton>
```

---

## FluentCompoundButton

Dual-line button with a main `Label` and a `<Description>` slot for secondary text.

```razor
<FluentCompoundButton Label="Primary" Appearance="ButtonAppearance.Primary">
    <Description>Description content</Description>
</FluentCompoundButton>
```

---

## FluentMenuButton

A button that triggers a `FluentMenu` dropdown. Must be wrapped in a `FluentMenu` component containing `FluentMenuList` with `FluentMenuItem` children.

```razor
<FluentMenu>
    <FluentMenuButton OnClick="@HandleClick">Default</FluentMenuButton>
    @RenderMenuItems()
</FluentMenu>

@code {
    RenderFragment RenderMenuItems() => @<FluentMenuList>
        <FluentMenuItem>Menu item 1</FluentMenuItem>
        <FluentMenuItem>Menu item 2</FluentMenuItem>
    </FluentMenuList>;
}
```

---

## FluentSplitButton

Combines a primary action button with a chevron that opens a menu. Requires a `FluentMenuList` in `ChildContent`. Uses `OnClick` for the primary action and `OnMenuClick` for menu item selection.

```razor
<FluentSplitButton OnClick="@PrimaryAction"
                   OnMenuClick="@MenuClick"
                   Appearance="ButtonAppearance.Primary"
                   Label="Primary">
    <FluentMenuList>
        <FluentMenuItem>Item 1</FluentMenuItem>
        <FluentMenuItem>Item 2</FluentMenuItem>
    </FluentMenuList>
</FluentSplitButton>
```

---

## FluentToggleButton

Inherits from `FluentButton` but does **not** support loading state. Manages a `Pressed` boolean state for on/off toggling.

```razor
<FluentToggleButton Pressed="true" OnClick="@ToggleClick">Default pressed</FluentToggleButton>
```

---

## API Reference

| Component | API Type |
|-----------|----------|
| `FluentButton` | `API Type=FluentButton` |
| `FluentAnchorButton` | `API Type=FluentAnchorButton` |
| `FluentCompoundButton` | `API Type=FluentCompoundButton` |
| `FluentMenuButton` | `API Type=FluentMenuButton` |
| `FluentSplitButton` | `API Type=FluentSplitButton` |
| `FluentToggleButton` | `API Type=FluentToggleButton` |

---

## Migration Notes (v4 to v5)

- `Appearance` enum renamed to `ButtonAppearance`: `Neutral` → `Default`, `Accent` → `Primary`, `Stealth` → `Subtle`, `Lightweight` → `Transparent`, `Hypertext`/`Filled` → `Default`.
- Use `ToButtonAppearance()` extension method for migration: `Appearance.Accent.ToButtonAppearance()`.
- New in v5: `Shape`, `Size`, `DisabledFocusable`, `IconOnly`, `Label`, `Tooltip`.
- Renamed: `Autofocus` → `AutoFocus`, `Action` → `FormAction`, `Enctype` → `FormEncType`, `Method` → `FormMethod`, `NoValidate` → `FormNoValidate`, `Target` → `FormTarget`.
