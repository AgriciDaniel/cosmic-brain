---
type: concept
title: "FluentUI Blazor Splitter"
address: c-000142
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - splitter
  - layout
  - panels
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Layout and Stack]]"
---

# FluentUI Blazor Splitter

`FluentMultiSplitter` splits the page into multiple resizable panels and allows the user to control page layout. It supports nesting splitters in different orientations for complex layouts.

## Basic Usage

Include any number of `FluentMultiSplitterPane` components. Panes are resizable by default. Set `Size` in percent or pixels, with `Min` and `Max` constraints.

```razor
<FluentMultiSplitter OnResize="@OnResizeHandler" Height="150px"
                     Style="border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);">

    <FluentMultiSplitterPane Size="20%" Min="50px" Max="70%">
        Left Menu
    </FluentMultiSplitterPane>

    <FluentMultiSplitterPane Size="50%">
        <FluentMultiSplitter OnResize="@OnResizeHandler"
                             Orientation="Orientation.Vertical">
            <FluentMultiSplitterPane Collapsible="true">
                Main Content
            </FluentMultiSplitterPane>
            <FluentMultiSplitterPane Collapsible="true">
                Console log
            </FluentMultiSplitterPane>
        </FluentMultiSplitter>
    </FluentMultiSplitterPane>

    <FluentMultiSplitterPane Size="30%">
        Properties
    </FluentMultiSplitterPane>

</FluentMultiSplitter>
```

## Events

| Event | Description |
|-------|-------------|
| `OnResize` | Fires when a pane is resized, returns new size as percentage |
| `OnExpand` | Fires when a collapsed pane is expanded |
| `OnCollapse` | Fires when an expandable pane is collapsed |

```razor
@code {
    void OnResizeHandler(FluentMultiSplitterResizeEventArgs e)
    {
        Console.WriteLine($"Pane {e.PaneIndex} Resize (New size {e.NewSize:0}%)");
    }

    void OnCollapseExpand(FluentMultiSplitterEventArgs e)
    {
        bool willCollapse = !e.Pane.Collapsed;
        Console.WriteLine($"Pane {e.PaneIndex} {(willCollapse ? "collapsed" : "expanded")}");
    }
}
```

## Key Pane Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Size` | `string?` | Initial size (percent or pixels) |
| `Min` | `string?` | Minimum size constraint |
| `Max` | `string?` | Maximum size constraint |
| `Resizable` | `bool` | Whether pane can be resized (default: true) |
| `Collapsible` | `bool` | Whether pane can be fully collapsed |
| `Collapsed` | `bool` | Two-way bindable collapsed state |

## Restrictions

> [!warning] Interactive Mode Required
> The `FluentMultiSplitter` requires **Interactive** rendering mode (Interactive Server, Interactive WebAssembly, or Auto). It does not function in static rendering mode because it needs DOM-to-.NET communication for resize operations.

## Styling

Override these CSS variables to customize splitter appearance:

```css
.fluent-multi-splitter {
  --fluent-multi-splitter-background-color: var(--colorNeutralStroke2);
  --fluent-multi-splitter-background-color-active: var(--colorNeutralStroke1Selected);
  --fluent-multi-splitter-hover-opacity: 0.8;
  --fluent-multi-splitter-color: var(--colorNeutralStrokeAccessible);
  --fluent-multi-splitter-color-active: var(--colorNeutralStrokeAccessiblePressed);
  --fluent-multi-splitter-bar-size: var(--spacingVerticalS);
}
```

## Accessibility

> [!key-insight] Not Yet Accessible
> The splitter component is not yet accessible. This is a known limitation.

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — MultiSplitter component documentation.
