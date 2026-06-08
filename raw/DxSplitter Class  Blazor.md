---
title: "DxSplitter Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitter"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxSplitter Class

In This Article

A component that displays multiple resizable and collapsible panes.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxSplitter :
    ParameterTrackerComponent,
    INestedSettingsOwner,
    IDisposable
```

## Remarks

The DevExpress Splitter for Blazor (`<DxSplitter>`) divides web page content into multiple resizable and collapsible panes. The component can nest other splitter components to create complex layouts.

![Blazor Splitter Overview](https://docs.devexpress.com/Blazor/images/splitter/blazor-splitter-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/Splitter)

### Add a Splitter to a Project

Follow the steps below to add a Splitter component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file:
	```
	<DxSplitter>
	    <Panes>
	        @* ... *@
	    </Panes>
	</DxSplitter>
	```
3. Populate the [Panes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitter.Panes) collection with panes ([DxSplitterPane](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane) objects).
4. Configure other options (see sections below).

## API Reference

Refer to the following list for the component API reference: [DxSplitter Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitter._members).

### Static Render Mode Specifics

You can use the `DxSplitter` component in static render mode except for pane expand and collapse functionalities.

### Orientation and Hierarchical Pane Structure

The Splitter component displays a single-level stack of panels. Use the [Orientation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitter.Orientation) property to specify pane stack direction. To create multilevel panes, insert another Splitter component within pane content.

```
<DxSplitter CssClass="border" Height="200px" Width="950px">
    <Panes>
        <DxSplitterPane>Pane 1</DxSplitterPane>
        <DxSplitterPane>
            <DxSplitter Orientation="Orientation.Vertical">
                <Panes>
                    <DxSplitterPane>Pane 2-1</DxSplitterPane>
                    <DxSplitterPane>Pane 2-2</DxSplitterPane>
                </Panes>
            </DxSplitter>
        </DxSplitterPane>
        <DxSplitterPane>Pane 3</DxSplitterPane>
    </Panes>
</DxSplitter>
```

![Horizontal and vertical splitters](https://docs.devexpress.com/Blazor/images/splitter/blazor-splitter-orientation.png)

### Pane Size

Use the [Size](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.Size) property to specify the width of vertical panes and the height of horizontal panes.

When the [AllowResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.AllowResize) property is set to `true`, users can resize the pane. Use [MinSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.MinSize) and [MaxSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.MaxSize) properties to restrict pane size changes.

```
<DxSplitter CssClass="border"  Width="100%" Height="600px">
    <Panes>
        <DxSplitterPane Size="30%" MinSize="100px">@PaneContent1</DxSplitterPane>
        <DxSplitterPane Size="50%" MaxSize="70%">@PaneContent2</DxSplitterPane>
        <DxSplitterPane>@PaneContent3</DxSplitterPane>
    </Panes>
</DxSplitter>
```

Handle the [SizeChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.SizeChanged) event to react to pane size changes. This event does not fire for the last [pane](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane), which serves as the flexible remainder. The pane’s size is automatically calculated from the splitter’s total size and its [Size](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.Size) property always remains `null`.

### Expand and Collapse Panes

Set a pane’s [AllowCollapse](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.AllowCollapse) property to `true` to allow users to collapse the pane.

Use the [Collapsed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.Collapsed) property to determine the pane collapse state. When the state changes, the Splitter raises the [CollapsedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitterPane.CollapsedChanged) event.

### Keyboard Navigation

The DevExpress Blazor Splitter component supports keyboard shortcuts that allow users to access and move splitter separators, expand and collapse panes.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab,   Shift + Tab | Moves focus to the next or previous splitter separator or a focusable element inside a pane. |
| Right Arrow | Moves a vertical separator to the right. |
| Left Arrow | Moves a vertical separator to the left. |
| Down Arrow | Moves a horizontal separator down. |
| Up Arrow | Moves a horizontal separator up. |
| Enter | Expands or collapses a pane. If a separator can be collapsed in both directions, collapses to the nearest edge. |