---
title: FluentUI Blazor Icon
address: c-000120
status: developing
---

# FluentUI Blazor Icon

> Part of the [[FluentUI Blazor]] component library. The `FluentIcon` component renders icons from the [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) collection -- over 2200 distinct icons in filled and outlined variants across multiple sizes (11k+ total SVG icons).

## Overview

The `Microsoft.FluentUI.AspNetCore.Components.Icons` NuGet package contains all icons. During .NET publication, unused icons are automatically trimmed from the final assembly. Configure this via `PublishTrimmed`.

> [!WARNING] Always use the `Value` property (not the `Icon` property) to specify icons, ensuring the icon is referenced by your project and not trimmed:
> `<FluentIcon Value="@(new Icons.Regular.Size24.Bookmark())" />`

## Basic Usage

```razor
<FluentIcon Value="@(new Icons.Regular.Size24.Save())" Title="Save" />
<FluentIcon Value="@(new Icons.Regular.Size24.Open())" Title="Open" Color="Color.Error" />
```

### Slot Placement

Icons can be placed in named slots of other components, such as `FluentSlot.Start` or `FluentSlot.End`:

```razor
<FluentButton IconStart="@(new Icons.Regular.Size24.ArrowCircleLeft())">
    Back
</FluentButton>

<FluentButton IconEnd="@(new Icons.Regular.Size24.ArrowCircleRight().WithColor(Color.Success))">
    Next
</FluentButton>
```

### Inline Markup

Icons can also be rendered directly as markup:

```razor
@(new Icons.Regular.Size20.Add().ToMarkup())
@(new Icons.Regular.Size20.Airplane().ToMarkup("16px", "blue"))
```

External images can be used as icons:

```razor
<FluentIcon Value="@(Icon.FromImageUrl("https://example.com/icon.png"))" Width="24px" />
```

## Color Options

```razor
<FluentIcon Value="@(new Icons.Filled.Size48.Alert())" Color="Color.Primary" />
<FluentIcon Value="@(new Icons.Filled.Size48.Alert().WithColor(Color.Success))" />
```

| Color | Description |
|---|---|
| `Color.Default` | Inherits from parent (`currentColor`) -- default |
| `Color.Primary` | Brand/accent color |
| `Color.Error` | Error/danger color |
| `Color.Success` | Success color |
| `Color.Warning` | Warning color |
| `Color.Info` | Information color |
| `Color.Lightweight` | Lightweight/inverted |
| `Color.Custom` | Use `CustomColor` for arbitrary hex or CSS variable |

```razor
<FluentIcon Value="@(new Icons.Filled.Size48.Alert())" 
            Color="Color.Custom" 
            CustomColor="#FF6600" />
```

The default color is `currentColor`, inheriting from the parent element.

## Custom Icons

Create custom icons by extending the `Icon` base class:

```csharp
public static class MyIcons
{
    public class SettingsEmail : Icon 
    { 
        public SettingsEmail() : base(
            "SettingsEmail", 
            IconVariant.Regular, 
            IconSize.Size20, 
            "<svg>...</svg>"
        ) { } 
    }
}
```

For non-standard viewbox sizes, use `IconSize.Custom`:

```csharp
public class MyCircle : Icon
{
    public MyCircle() : base("MyCircle", IconVariant.Regular, IconSize.Custom, "<svg ...>")
    {
        WithColor("#F97316");
    }
}
```

Setting `Width=""` (empty string) makes the icon 100% width of its container. Omit or set `Width="@null"` to use the default size.

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Value` | `Icon` | The icon object to render (recommended) |
| `Color` | `Color?` | Drawing and fill color |
| `CustomColor` | `string?` | Custom hex color (requires `Color.Custom`) |
| `Width` | `string?` | Icon width; empty string = 100% container |
| `Title` | `string?` | HTML title attribute |
| `Slot` | `string?` | Slot placement (e.g., `FluentSlot.Start`) |
| `Focusable` | `bool` | Adds `tabindex="0"` and `role="button"` |
| `OnClick` | `EventCallback<MouseEventArgs>` | Click handler |
| `Margin` | `string?` | Margin using Fluent spacing tokens |
| `Padding` | `string?` | Padding using Fluent spacing tokens |
| `Tooltip` | `string?` | Tooltip text on hover |

## Migration Notes (v4 to v5)

- `Color.Default` replaces the old `Color.Neutral` and `Color.Fill`
- `Color.Primary` replaces the old `Color.Accent`
- `Color.Lightweight` replaces `Color.FillInverse`
- Default icon color changed from `Color.Accent` to `currentColor`
