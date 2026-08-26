---
title: FluentUI Blazor MessageBar
address: c-000131
status: developing
---

# FluentUI Blazor MessageBar

> Part of the [[FluentUI Blazor]] component library. `FluentMessageBar` communicates important state information about the entire application or surface without requiring immediate user action.

## Overview

MessageBars communicate persistent information about the state of a page, panel, dialog, or card. Unlike toasts, MessageBars persist until dismissed by the user.

## Intents (Appearance)

Five preset intents determine the design and aria-live behavior:

```razor
<FluentMessageBar Intent="MessageBarIntent.Info" Title="Info">
    Informational message.
</FluentMessageBar>
<FluentMessageBar Intent="MessageBarIntent.Warning" Title="Warning">
    Warning message.
</FluentMessageBar>
<FluentMessageBar Intent="MessageBarIntent.Success" Title="Success">
    Success message.
</FluentMessageBar>
<FluentMessageBar Intent="MessageBarIntent.Error" Title="Error">
    Error message.
</FluentMessageBar>

{{!-- Custom icon --}}
<FluentMessageBar Icon="@(new Icons.Regular.Size20.LeafTwo().WithColor("currentColor"))" Title="Custom">
    Custom message.
</FluentMessageBar>
```

### Shape

```razor
<FluentMessageBar Shape="MessageBarShape.Rounded" Intent="MessageBarIntent.Info" Title="Rounded" />
<FluentMessageBar Shape="MessageBarShape.Square" Intent="MessageBarIntent.Info" Title="Square" />
```

## Actions

Add action buttons using the `ActionsTemplate` parameter:

```razor
<FluentMessageBar Animation="MessageBarAnimation.FadeIn">
    <ChildContent>
        Message with actionable insights.
        <FluentLink Href="https://blazor.net" Target="LinkTarget.Blank">Learn more</FluentLink>
    </ChildContent>
    <ActionsTemplate>
        <FluentButton Size="ButtonSize.Small">Action 1</FluentButton>
        <FluentButton Size="ButtonSize.Small">Action 2</FluentButton>
    </ActionsTemplate>
</FluentMessageBar>
```

## Layout

The `Layout` parameter controls action placement:

| Layout | Behavior |
|---|---|
| `SingleLine` | Actions inline with message (compact) |
| `MultiLine` | Actions on a new line |
| `Notification` | Title, message, and actions on separate lines |

When no actions are defined, use `TimeStamp` to show when the message was created:

```razor
<FluentMessageBar Layout="MessageBarLayout.SingleLine"
                  Intent="MessageBarIntent.Success"
                  Title="Delete operation"
                  TimeStamp="@(DateTime.Now.AddHours(-1))">
    Successfully deleted file.
</FluentMessageBar>
```

## Animation

```razor
<FluentMessageBar Animation="MessageBarAnimation.FadeIn">
```

Available animations: `None`, `FadeIn`.

## Rendering

MessageBars are rendered by `<FluentProviders />` which must be added to the application layout.

See the [[FluentUI Blazor]] installation guidance for setup details.

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Intent` | `MessageBarIntent?` | Semantic intent (`Info`, `Warning`, `Success`, `Error`) |
| `Title` | `string?` | Message bar title (plain text only) |
| `Icon` | `Icon?` | Custom icon override |
| `Layout` | `MessageBarLayout?` | Action position layout |
| `Shape` | `MessageBarShape?` | Corner shape (`Rounded`, `Square`) |
| `Animation` | `MessageBarAnimation?` | Entrance animation |
| `TimeStamp` | `DateTime?` | Timestamp shown when no actions present |
| `ActionsTemplate` | `RenderFragment?` | Template for action buttons |
| `AriaLive` | `AriaLive?` | ARIA live region behavior |

## Migration Notes (v4 to v5)

- `FadeIn` renamed to `Animation`
- `Type` removed; use `Layout` instead
- `Intent.Custom` removed; omit `Intent` and set `Icon` + `ChildContent` for custom styling
- `Title` is now plain text only -- use `ChildContent` for rich content
- `IconColor` removed; use `Icon.WithColor()` instead
