---
title: FluentUI Blazor Tooltip
address: c-000151
status: developing
---

# FluentUI Blazor Tooltip

> Part of the [[FluentUI Blazor]] component library. `FluentTooltip` displays additional information near a target component when hovered or focused.

## Overview

A `FluentTooltip` shows contextual information positioned relative to an anchor element. It supports positioning, delay, custom templates, and a service provider for global management.

> Tooltip is not intended for interactive content -- use a popover component if interaction is needed.

## Basic Usage

The tooltip is linked to a target element via the `Anchor` parameter, using the target's HTML `Id`:

```razor
<FluentButton Id="MyButton" IconStart="@(new Icons.Regular.Size20.Globe())">
    Hover me
</FluentButton>

<FluentTooltip Anchor="MyButton">
    This is the description of the button
</FluentTooltip>
```

## Simplified Tooltip Parameter

Many components support a `Tooltip` parameter directly:

```razor
<FluentButton Tooltip="This is the description of the <b>button</b>" Label="Hover me" />
<FluentTextInput Tooltip="This is the description of the <b>text input</b>" Placeholder="Hover me" />
<FluentIcon Value="@(new Icons.Regular.Size20.CursorHover())" Tooltip="This is the description of the <b>cursor</b>" />
```

## Customized Tooltip

```razor
<FluentTooltip Anchor="MyCustomizedButton"
               OnToggle="@OnToggleAsync"
               OnDismissed="@OnDismissAsync"
               Delay="700"
               Positioning="@Positioning.BelowStart"
               MaxWidth="300px"
               SpacingHorizontal="20px"
               SpacingVertical="10px"
               Style="background-color: var(--colorBrandBackground); color: var(--colorNeutralForegroundInverted)">
    <FluentStack>
        <FluentIcon Value="@(new Icons.Regular.Size20.Info().WithColor(Color.Lightweight))"
                    Width="32px" />
        <div>
            Really long <b>tooltip</b> content goes here.
        </div>
    </FluentStack>
</FluentTooltip>
```

## Positioning

The `Positioning` enum provides 13 values:

| Positioning | Placement |
|---|---|
| `Above` | Centered above |
| `AboveStart` | Above, left-aligned |
| `AboveEnd` | Above, right-aligned |
| `Below` | Centered below |
| `BelowStart` | Below, left-aligned |
| `BelowEnd` | Below, right-aligned |
| `Before` | Left of anchor |
| `BeforeTop` | Left of anchor, top-aligned |
| `BeforeBottom` | Left of anchor, bottom-aligned |
| `After` | Right of anchor |
| `AfterTop` | Right of anchor, top-aligned |
| `AfterBottom` | Right of anchor, bottom-aligned |
| `CenterCenter` | Centered on anchor |

## Tooltip Service Provider

For better z-index management, use the tooltip service with the `FluentTooltipProvider`.

### Register in Program.cs

```csharp
builder.Services.AddScoped<ITooltipService, TooltipService>();
```

Using `AddFluentUIComponents()` registers this automatically.

### Add Provider in Layout

```xml
<FluentTooltipProvider />
```

The provider requires interactivity -- add a `@rendermode` if using per-page interactivity modes.

### Disabling the Provider

For cases where the provider is not wanted (e.g., dynamic child content):

```razor
<FluentTooltip UseTooltipService="false" ... />
```

Or globally in Program.cs:

```csharp
builder.Services.AddFluentUIComponents(options =>
{
    options.Tooltip.UseServiceProvider = false;
});
```

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Anchor` | `string?` | ID of the target element |
| `Positioning` | `Positioning?` | Tooltip position relative to anchor |
| `Delay` | `int` | Show/hide delay in ms (default varies) |
| `MaxWidth` | `string?` | Maximum width |
| `SpacingHorizontal` | `string?` | Horizontal gap between tooltip and anchor |
| `SpacingVertical` | `string?` | Vertical gap between tooltip and anchor |
| `OnToggle` | `EventCallback<TooltipEventArgs>` | Fired on show/hide |
| `OnDismissed` | `EventCallback<EventArgs>` | Fired on dismiss |
| `UseTooltipService` | `bool` | Use the global tooltip service provider |

## Migration Notes (v4 to v5)

- `TooltipPosition` enum replaced by `Positioning` enum
- `Position` renamed to `Positioning`
- `Visible` property removed -- tooltip visibility is now controlled by hover/focus
- `TooltipGlobalOptions` class removed
- Use `ToPositioning()` extension method for migration:
  ```csharp
  <FluentTooltip Positioning="TooltipPosition.Top.ToPositioning()">content</FluentTooltip>
  ```
