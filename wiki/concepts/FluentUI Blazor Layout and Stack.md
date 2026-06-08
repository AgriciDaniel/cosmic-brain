---
type: concept
title: "FluentUI Blazor Layout and Stack"
address: c-000125
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - layout
  - stack
  - spacer
  - flexbox
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Grid]]"
---

# FluentUI Blazor Layout and Stack

Three layout components work together in FluentUI Blazor: `FluentLayout` (page-level grid), `FluentStack` (flexbox container), and `FluentSpacer` (flex grow filler).

---

## FluentLayout

`FluentLayout` defines a page layout using a CSS grid composed of five areas: **Header**, **Navigation**, **Content**, **Aside**, and **Footer**.

```
+----------------------------------------+
|               Header                    |
+--------+-------------------+-----------+
| Nav    |     Content       |  Aside    |
+--------+-------------------+-----------+
|               Footer                    |
+----------------------------------------+
```

On mobile (< 768px), the layout collapses to a single column: Header, Content, Footer.

### Hamburger Navigation

On mobile, Navigation collapses into a hamburger panel. Add `FluentLayoutHamburger` to the Header.

```razor
<FluentLayout GlobalScrollbar="true" Height="400px">
    <FluentLayoutItem Area="@LayoutArea.Header" Sticky="true">
        <FluentStack VerticalAlignment="VerticalAlignment.Center">
            <FluentLayoutHamburger />
            <FluentText Weight="TextWeight.Bold" Size="TextSize.Size400">
                My Application
            </FluentText>
        </FluentStack>
    </FluentLayoutItem>

    <FluentLayoutItem Area="@LayoutArea.Navigation" Width="250px">
        <FluentNav Padding="@Padding.All2" Style="height: 100%;">
            <FluentNavItem Href="/" IconRest="@(new Icons.Regular.Size20.Home())">Home</FluentNavItem>
        </FluentNav>
    </FluentLayoutItem>

    <FluentLayoutItem Area="@LayoutArea.Content" Padding="@Padding.All3">
        @Body
    </FluentLayoutItem>

    <FluentLayoutItem Area="@LayoutArea.Footer">
        Powered by Fluent UI Blazor
    </FluentLayoutItem>
</FluentLayout>
```

### Key Layout Parameters

| Parameter | Description |
|-----------|-------------|
| `GlobalScrollbar` | When true, scrollbar applies to the entire page |
| `MobileBreakdownWidth` | Mobile breakpoint (default 768px) |
| `Height` | Container height |
| `Sticky` (on `FluentLayoutItem`) | Fixes panel in place during scroll |

### CSS Variables

```css
--layout-height: 100dvh;
--layout-header-height: 44px;
--layout-footer-height: 36px;
--layout-body-height: calc(...);
```

---

## FluentStack

`FluentStack` is a flexbox-based container for arranging child components horizontally or vertically.

### Characteristics

Three parameters define layout:

1. **Orientation**: `Orientation.Horizontal` (default) or `Orientation.Vertical`
2. **Alignment**: `HorizontalAlignment` and `VerticalAlignment`
3. **Spacing**: `HorizontalGap` and `VerticalGap` (accepts CSS units like `"10px"`, `"1rem"`)

```razor
<FluentStack Orientation="Orientation.Vertical"
             HorizontalAlignment="@Horizontal"
             VerticalAlignment="@Vertical"
             VerticalGap="20"
             Reversed="@Reversed"
             Style="height: 200px">
    <div class="box">Vertical item 1</div>
    <div class="box">Vertical item 2</div>
</FluentStack>
```

### Wrapping

The `Wrap` parameter controls whether items overflow or wrap. Wrapping only applies in the stack's primary orientation direction.

### Nesting

Stacks can be nested for complex layouts.

```razor
<FluentStack Orientation="Orientation.Vertical" VerticalGap="20">
    <div>Outer item</div>
    <FluentStack Orientation="Orientation.Horizontal" HorizontalGap="4">
        <div>Nested item 1</div>
        <div>Nested item 2</div>
    </FluentStack>
</FluentStack>
```

### Migration from v4

In v4, a default 10px gap was applied to both axes. In v5, gaps default to 0. Restore the old behavior:

```csharp
builder.Services.AddFluentUIComponents(config =>
{
    config.DefaultValues.For<FluentStack>().Set(p => p.HorizontalGap, "10px");
    config.DefaultValues.For<FluentStack>().Set(p => p.VerticalGap, "10px");
});
```

---

## FluentSpacer

`FluentSpacer` generates space between components in a flex container. By default, it applies `flex-grow: 1` to fill available space.

```razor
<FluentStack Width="100%">
    <FluentIcon Value="@(new Icons.Filled.Size48.Alert())" Color="@Color.Default" />
    <FluentSpacer />
    <FluentIcon Value="@(new Icons.Filled.Size48.Alert())" Color="@Color.Primary" />
</FluentStack>
```

### Fixed Spacing

You can set a fixed width or height:

```razor
<!-- Horizontal fixed spacer -->
<FluentSpacer Width="50px" />

<!-- Vertical fixed spacer -->
<FluentSpacer Orientation="Orientation.Vertical" Height="50px" />
```

### Key Spacer Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Width` | `string?` | Fixed width (default: `flex-grow: 1`) |
| `Height` | `string?` | Fixed height for vertical orientation |
| `Orientation` | `Orientation` | Controls grow direction |

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Layout, Stack, and Spacer component documentation.
