---
type: concept
title: "FluentUI Blazor Grid"
address: c-000119
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - grid
  - layout
  - responsive
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Layout and Stack]]"
---

# FluentUI Blazor Grid

`FluentGrid` is a CSS grid-based layout system built on a **12-point grid** with 5 responsive breakpoints. It helps maintain consistent layout across various screen resolutions and sizes.

## Breakpoints

Breakpoints control layout based on window size:

| Device | Code | Type | Range |
|--------|------|------|-------|
| Extra Small | `xs` | Small to large phone | < 600px |
| Small | `sm` | Small to medium tablet | < 960px |
| Medium | `md` | Large tablet to laptop | < 1280px |
| Large | `lg` | Desktop | < 1920px |
| Extra Large | `xl` | HD and 4k | < 2560px |
| Extra Extra Large | `xxl` | 4k+ and ultra-wide | >= 2560px |

## Basic Usage

Grid items use breakpoint properties to specify column spans at different screen sizes.

```razor
<FluentGrid Spacing="2" Justify="JustifyContent.FlexStart">
    <FluentGridItem Xs="12">
        <div>Xs="12"</div>
    </FluentGridItem>
    <FluentGridItem Xs="12" Sm="6">
        <div>Xs="12" Sm="6"</div>
    </FluentGridItem>
    <FluentGridItem Xs="6" Sm="3">
        <div>Xs="6" Sm="3"</div>
    </FluentGridItem>
    <FluentGridItem Xs="6" Sm="3">
        <div>Xs="6" Sm="3"</div>
    </FluentGridItem>
</FluentGrid>
```

## No Breakpoints Mode

If no breakpoint properties are set (or `Xs="0"`), the item applies `flex: 1; max-width: fit-content;` for auto-sizing behavior.

```razor
<FluentGrid Justify="JustifyContent.FlexEnd" Style="overflow: hidden; resize: horizontal;">
    <FluentGridItem Style="min-width: 200px;">
        Views must be setup in the Admin Portal...
    </FluentGridItem>
    <FluentGridItem Justify="JustifyContent.FlexEnd" Gap="10px">
        <FluentButton>Setup</FluentButton>
        <FluentButton>Documentation</FluentButton>
    </FluentGridItem>
</FluentGrid>
```

## Hiding Elements

Use the `HiddenWhen` attribute to show or hide elements at specific breakpoints. Supports combination via the `|` operator (flags enum).

```razor
<FluentGridItem Xs="12" Sm="6" HiddenWhen="GridItemHidden.SmAndDown">
    Hidden on small devices and below
</FluentGridItem>
```

> [!TIP] You can also use the HTML attribute `hidden-when` on **any element**: `<div hidden-when="sm md">...</div>` hides the element on small and medium devices.

## AdaptiveRendering

Controls whether hidden items are still rendered in the DOM.

- `AdaptiveRendering="false"` (default): Hidden items use CSS `display: none`
- `AdaptiveRendering="true"`: Hidden items are not rendered by Blazor at all

Use `AdaptiveRendering="true"` when rendering the grid item is expensive or transfers large data.

## Breakpoint Events

The `OnBreakpointEnter` event fires when the grid crosses a breakpoint boundary.

```razor
<FluentGrid OnBreakpointEnter="@OnBreakpointEnterHandler">
    ...
</FluentGrid>

@code {
    void OnBreakpointEnterHandler(GridItemSize size)
    {
        Console.WriteLine($"Page Size: {size}");
    }
}
```

The `<body data-media>` attribute is automatically updated on resize. A JavaScript `mediaChanged` event is also triggered client-side.

## Key Parameters

### FluentGrid

| Parameter | Type | Description |
|-----------|------|-------------|
| `Spacing` | `int?` | Gap between grid items |
| `Justify` | `JustifyContent?` | Horizontal alignment of items |
| `AdaptiveRendering` | `bool` | Whether to remove hidden items from DOM |
| `OnBreakpointEnter` | `EventCallback<GridItemSize>` | Breakpoint change event |

### FluentGridItem

| Parameter | Type | Description |
|-----------|------|-------------|
| `Xs, Sm, Md, Lg, Xl, Xxl` | `int?` | Column span at each breakpoint (1-12) |
| `HiddenWhen` | `GridItemHidden?` | Visibility control per breakpoint |
| `Justify` | `JustifyContent?` | Item-level horizontal alignment |
| `Gap` | `string?` | Item-level gap |

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Grid component documentation.
