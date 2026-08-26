---
type: concept
title: "FluentUI Blazor Popover"
address: c-000136
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - popover
  - overlay
  - tooltip
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Dialog]]"
---

# FluentUI Blazor Popover

`FluentPopover` displays content on top of other content, anchored to a target element. It is displayed below the target by default, with automatic repositioning when space is limited.

## Basic Usage

The popover is anchored to an element via `AnchorId`. Control visibility with the two-way bindable `Opened` parameter.

```razor
<FluentButton Id="MyButton" OnClick="@(e => IsOpened = !IsOpened)">
    Click
</FluentButton>

<FluentPopover AnchorId="MyButton" @bind-Opened="@IsOpened">
    Content of the Popover
</FluentPopover>

@code {
    bool IsOpened = false;
}
```

## Auto-Positioning

The popover automatically adjusts its position based on available viewport space:

- Default: below and right-aligned to the anchor
- If insufficient space below: displays above the anchor
- If insufficient space on the right: displays to the left

Use `OffsetVertical` and `OffsetHorizontal` parameters to add extra spacing between the popover and anchor.

> [!key-insight] Escape key
> Pressing the `Escape` key closes an open popover.

## Nested Popovers

Popovers can be nested inside each other. Set `Nested="true"` on the parent popover.

```razor
<FluentButton Id="Nested1" OnClick="@(e => Opened1 = !Opened1)">
    Open Popover
</FluentButton>

<FluentPopover Nested="true" AnchorId="Nested1" @bind-Opened="@Opened1">
    <p>Popover Level 1 content</p>

    <FluentButton Id="Nested2" OnClick="@(e => Opened2 = !Opened2)">
        Open Level 2
    </FluentButton>

    <FluentPopover AnchorId="Nested2" @bind-Opened="@Opened2">
        <p>Popover Level 2 content</p>
    </FluentPopover>
</FluentPopover>

@code {
    bool Opened1 = false;
    bool Opened2 = false;
}
```

Rules for nesting:
- Do not use more than 2 levels of nested popovers
- Do not use popovers to display large amounts of content

## Limitations

> [!warning] RTL Not Supported
> The `FluentPopover` component does not yet support Right-To-Left (RTL) layouts.

## When to Use

| Component | Use Case |
|-----------|----------|
| **Popover** | Supplemental content related to a specific element |
| **Dialog** | User must confirm or provide information before proceeding |
| **Tooltip** | Short, non-interactive descriptive text |
| **Drawer** | Secondary content surface with more room |

## Key Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `AnchorId` | `string?` | ID of the element to anchor to |
| `Opened` | `bool` | Two-way bindable visibility |
| `Nested` | `bool` | Whether this popover is nested inside another |
| `OffsetVertical` | `int?` | Vertical offset from anchor |
| `OffsetHorizontal` | `int?` | Horizontal offset from anchor |

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Popover component documentation.
