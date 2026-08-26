---
title: FluentUI Blazor Link
address: c-000126
status: developing
---

# FluentUI Blazor Link

> Part of the **[[FluentUI Blazor]]** component library. A hyperlink component for navigation.

## Overview

`FluentLink` renders an interactive text element for navigation. It should be used exclusively for navigation, not for triggering actions. For secondary actions with low visual emphasis, use a transparent or subtle `FluentButton` instead.

## Basic link

```razor
<FluentLink Href="https://example.com">
    Visit Example
</FluentLink>
```

## Inline links

By default, links show an underline on hover, focus, and press. The `Inline` parameter adds underline in the rest and visited states, which is useful when the link appears alongside body text.

Inline links are also automatically applied when `FluentLink` is inside `h1`-`h6`, `p`, or `FluentText` tags.

```razor
<FluentText As="@TextTag.Paragraph">
    This is an
    <FluentLink Href="link#inline" Inline>inline link</FluentLink>
    used alongside text within the
    <code>FluentText</code>
    component.
</FluentText>
```

## Wrapping

Links are inline elements and wrap correctly across lines:

```razor
<p>
    This paragraph contains a link which is very long.
    <FluentLink Href="link#wrapping">
        Fluent links wrap correctly between lines when they are very long.
    </FluentLink>
    This is because they are inline elements.
</p>
```

## Links with icons

Icons can be placed at the start or end of a link using `IconStart` and `IconEnd`. Icons support color customization.

```razor
<FluentLink OnClick="@(() => Console.WriteLine("Clicked"))"
            IconStart="@(new Icons.Regular.Size16.Link())">
    Link with icon at start
</FluentLink>

<FluentLink OnClick="@(() => Console.WriteLine("Clicked"))"
            IconEnd="@(new Icons.Regular.Size16.Bookmark().WithColor(Color.Success))">
    Link with icon at end
</FluentLink>
```

## OnClick handler

Links support both `Href` (for navigation) and `OnClick` (for programmatic handling):

```razor
<FluentLink OnClick="@(() => Console.WriteLine("Link clicked"))">
    Clickable link
</FluentLink>
```

## API

| Component | API Type |
|-----------|----------|
| `FluentLink` | `FluentLink` |

## Related

- [[FluentUI Blazor Nav]]
- [[FluentUI Blazor Menu]]
