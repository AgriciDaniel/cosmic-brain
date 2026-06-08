---
title: FluentUI Blazor AppBar
address: c-000101
status: developing
---

# FluentUI Blazor AppBar

> Part of the **[[FluentUI Blazor]]** component library. An application bar component inspired by the Teams app bar pattern.

## Overview

`FluentAppBar` provides a vertical or horizontal bar containing app navigation items. It supports overflow into a popover for additional items, search, and click handling.

### Components

- **`FluentAppBar`** -- The container. Configurable orientation, popover behavior, and item source.
- **`FluentAppBarItem`** -- A single app bar entry with icon, text, badge count, and click/navigation behavior.

## Orientation

The app bar can be displayed vertically or horizontally:

```razor
<FluentAppBar Orientation="@Orientation.Vertical">
    <FluentAppBarItem IconRest="ResourcesIcon()" Text="Resources" />
    <FluentAppBarItem IconRest="ConsoleLogsIcon()" Text="Logs" Count="2" />
</FluentAppBar>
```

## Basic usage with navigation

```razor
<FluentAppBar Orientation="@Orientation.Vertical">
    <FluentAppBarItem Href="/home"
                      Match="NavLinkMatch.All"
                      IconRest="HomeIcon()"
                      IconActive="HomeIcon(active: true)"
                      Text="Home" />
    <FluentAppBarItem Href="/logs"
                      IconRest="LogsIcon()"
                      IconActive="LogsIcon(active: true)"
                      Text="Logs"
                      Count="4"
                      Tooltip="Structured Logs" />
</FluentAppBar>

@code {
    private static Icon HomeIcon(bool active = false) =>
        active ? new Icons.Filled.Size24.Home()
               : new Icons.Regular.Size24.Home();

    private static Icon LogsIcon(bool active = false) =>
        active ? new Icons.Filled.Size24.SlideText()
               : new Icons.Regular.Size24.SlideText();
}
```

## Click handling

Each `FluentAppBarItem` can have an `OnClick` handler that receives the clicked `IAppBarItem`:

```razor
<FluentAppBarItem IconRest="WhatsNewIcon()"
                  Text="What's New"
                  OnClick="ShowSuccessAsync" />

@code {
    private async Task ShowSuccessAsync(IAppBarItem item)
    {
        var dialog = await DialogService.ShowSuccessAsync($"You clicked {item.Text}");
    }

    private void HandleOnClick(IAppBarItem item)
    {
        Console.WriteLine($"Clicked {item.Text}!");
    }
}
```

## App bar from a list of items

Items can be provided programmatically via the `Items` parameter. Each item must implement `IAppBarItem`.

```razor
<FluentAppBar Items="@_apps.OrderBy(a => a.Order)">
</FluentAppBar>

@code {
    private class FluentCustomAppBarItem : IAppBarItem
    {
        public int Order { get; set; }
        public string? Id { get; set; }
        public string? Href { get; set; }
        public NavLinkMatch Match { get; set; }
        public Icon IconRest { get; set; } = new Icons.Regular.Size24.AppFolder();
        public Icon? IconActive { get; set; }
        public string Text { get; set; } = string.Empty;
        public string? Tooltip { get; set; }
        public int? Count { get; set; }
        public bool? Overflow { get; set; }
        public EventCallback<IAppBarItem> OnClick { get; set; }
    }

    private List<FluentCustomAppBarItem> _apps = new();
}
```

## Overflow and popover

When items exceed the available space, they move into a popover overflow. The popover behavior can be customized:

- `PopoverShowSearch` -- enables search inside the popover overflow menu.
- `PopoverVisibilityChanged` -- callback when the popover opens or closes.

## Small icons variant

Customize the app bar item size with CSS variables:

```css
.fluent-appbar.smallicons {
    --appbar-item-size: 58px;
}
```

Then apply the class to `FluentAppBar`:

```razor
<FluentAppBar Class="smallicons">
    <!-- items with Size16 icons -->
</FluentAppBar>
```

## Localization

The overflow popup button text can be localized. The default string key is:

- `AppBar_MoreItems` (default: "View more apps")

## API types

| Component | API Type |
|-----------|----------|
| `FluentAppBar` | `FluentAppBar` |
| `FluentAppBarItem` | `FluentAppBarItem` |

## Related

- [[FluentUI Blazor Nav]]
- [[FluentUI Blazor Menu]]
