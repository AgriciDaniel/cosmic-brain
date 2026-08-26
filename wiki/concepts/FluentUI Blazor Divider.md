---
type: concept
title: "FluentUI Blazor Divider"
address: c-000114
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - divider
  - separator
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Layout and Stack]]"
---

# FluentUI Blazor Divider

`FluentDivider` is a wrapper for the `<fluentui-divider/>` web component. It separates content within a container, either horizontally or vertically, with optional label text.

## Basic Usage

By default, the divider is horizontal with centered label content.

```razor
<FluentDivider>Horizontal</FluentDivider>

<FluentDivider Vertical="true">Vertical</FluentDivider>
```

## Appearance

Four appearance variants control the divider's visual weight:

| Appearance | Description |
|-----------|-------------|
| `Default` | Standard divider line |
| `Strong` | Thicker, more prominent line |
| `Brand` | Uses brand color for emphasis |
| `Subtle` | Light, minimal visual presence |

```razor
<FluentDivider>Default</FluentDivider>
<FluentDivider Appearance="DividerAppearance.Strong">Strong</FluentDivider>
<FluentDivider Appearance="DividerAppearance.Brand">Brand</FluentDivider>
<FluentDivider Appearance="DividerAppearance.Subtle">Subtle</FluentDivider>
```

## Alignment

Control where the label text appears on the divider line:

```razor
<FluentDivider AlignContent="DividerAlignContent.Start">Start</FluentDivider>
<FluentDivider AlignContent="DividerAlignContent.Center">Center</FluentDivider>
<FluentDivider AlignContent="DividerAlignContent.End">End</FluentDivider>
```

### Inset Dividers

The `Inset` parameter adds horizontal padding to the divider, indenting it from both edges:

```razor
<!-- Horizontal inset variants -->
<FluentDivider AlignContent="DividerAlignContent.Start" Inset="true">
    Start (with inset)
</FluentDivider>
<FluentDivider AlignContent="DividerAlignContent.Center" Inset="true">
    Center (with inset)
</FluentDivider>
<FluentDivider AlignContent="DividerAlignContent.End" Inset="true">
    End (with inset)
</FluentDivider>
```

## Key Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Vertical` | `bool` | Whether the divider is vertical |
| `Appearance` | `DividerAppearance?` | Visual style (Default, Strong, Brand, Subtle) |
| `AlignContent` | `DividerAlignContent?` | Label position (Start, Center, End) |
| `Inset` | `bool` | Adds horizontal padding to indent the divider |

## Usage Guidelines

- Use dividers to separate distinct sections of related content
- Horizontal dividers work well between sections in a vertical layout
- Vertical dividers separate items in a horizontal layout (toolbar items, navigation elements)
- The `Inset` parameter is useful for dividers within cards or padded containers
- Label text is optional; an empty divider still provides visual separation

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Divider component documentation.
