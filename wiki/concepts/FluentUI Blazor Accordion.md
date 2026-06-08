---
type: concept
title: "FluentUI Blazor Accordion"
address: c-000100
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - accordion
  - expand-collapse
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Layout and Stack]]"
---

# FluentUI Blazor Accordion

The `FluentAccordion` is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

## Multi Expanded Mode (Default)

In multi mode, multiple accordion items can be expanded simultaneously. This is the default behavior. A tooltip can be provided for each item header via the `HeaderTooltip` parameter.

```razor
<FluentAccordion @bind-ActiveId="@activeId" OnAccordionItemChange="HandleOnAccordionItemChange">
    <FluentAccordionItem Id="item1" Header="Panel one">
        Panel one content
    </FluentAccordionItem>
    <FluentAccordionItem Id="item2" Header="Panel two" HeaderTooltip="This header has a tooltip">
        Panel two content
    </FluentAccordionItem>
    <FluentAccordionItem Id="item3" Expanded="true" Header="Panel three" Disabled="true">
        Panel three content
    </FluentAccordionItem>
    <FluentAccordionItem Id="item4" Expanded="true">
        <HeaderTemplate>
            Panel <span style="color:red">Four</span>
        </HeaderTemplate>
        <ChildContent>
            Panel four content
        </ChildContent>
    </FluentAccordionItem>
</FluentAccordion>
```

## Single Expanded Mode

In single mode, only one accordion item can be expanded at a time. When a new item is expanded, the previously expanded item collapses automatically.

```razor
<FluentAccordion ExpandMode="AccordionExpandMode.Single">
    <FluentAccordionItem Header="Accordion Header 1">
        Accordion Panel 1
    </FluentAccordionItem>
    <FluentAccordionItem Header="Accordion Header 2">
        Accordion Panel 2
    </FluentAccordionItem>
    <FluentAccordionItem Header="Accordion Header 3">
        Accordion Panel 3
    </FluentAccordionItem>
</FluentAccordion>
```

## Marker and Block

Accordion items can display a marker icon indicating expanded/collapsed state. The marker can be placed at the **start** or **end** of the header. The `Block` parameter makes the header take the full width of the container.

```razor
<FluentAccordion ExpandMode="AccordionExpandMode.Single"
                 MarkerPosition="@markerPosition"
                 Block="@block">
    <FluentAccordionItem Header="Accordion Header 1">
        Accordion Panel 1
    </FluentAccordionItem>
    ...
</FluentAccordion>

@code {
    bool markerAtEnd;
    bool block;
    AccordionItemMarkerPosition markerPosition =>
        markerAtEnd ? AccordionItemMarkerPosition.End : AccordionItemMarkerPosition.Start;
}
```

## Programmatic Expand/Collapse

Accordion items can be expanded or collapsed programmatically via `ExpandItemAsync` and `CollapseItemAsync` methods on the `FluentAccordion` reference. Items must have unique `Id` values.

```razor
<FluentAccordion @ref="accordion">
    <FluentAccordionItem Id="item1" Header="Panel one">...</FluentAccordionItem>
    <FluentAccordionItem Id="item2" Header="Panel two">...</FluentAccordionItem>
</FluentAccordion>

@code {
    FluentAccordion? accordion;

    private async Task ExpandItem2Async()
    {
        if (accordion is not null)
            await accordion.ExpandItemAsync("item2");
    }

    private async Task CollapseItem4Async()
    {
        if (accordion is not null)
            await accordion.CollapseItemAsync("item4");
    }
}
```

## Event Handling

The `OnAccordionItemChange` event provides `AccordionItemEventArgs` with the changed item (`args.Item`) and header text (`args.HeaderText`).

## Key Parameters

### FluentAccordion

| Parameter | Type | Description |
|-----------|------|-------------|
| `ExpandMode` | `AccordionExpandMode?` | Single or multi expand mode |
| `ActiveId` | `string?` | Two-way bindable active item ID |
| `MarkerPosition` | `AccordionItemMarkerPosition?` | Marker at start or end |
| `Block` | `bool?` | Full-width header |
| `Size` | `AccordionItemSize?` | Size for all items |
| `HeadingLevel` | `int?` | Heading level (e.g., 2 for `<h2>`) |

### FluentAccordionItem

| Parameter | Type | Description |
|-----------|------|-------------|
| `Header` | `string?` | Header text (alternative to `HeaderTemplate`) |
| `HeaderTemplate` | `RenderFragment?` | Custom header content |
| `Expanded` | `bool` | Two-way bindable expanded state |
| `Disabled` | `bool` | Disables interaction |
| `Id` | `string?` | Unique identifier |

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Accordion component documentation.
