---
title: FluentUI Blazor Avatar
address: c-000103
status: developing
---

# FluentUI Blazor Avatar

> Part of the [[FluentUI Blazor]] component library. The `FluentAvatar` component represents a user or entity, displaying an image, initials, or an icon.

## Overview

`FluentAvatar` is a wrapper for the `<fluentui-avatar/>` web component. It supports multiple visual modes: image, initials, icon, or a combination with fallback behavior.

## Appearance

Avatars can be displayed in predefined sizes from **16px to 128px**. They can be **circular** or **square** and filled with a color chosen by the component (`Colorful`) or explicitly selected from 32 theme-aware colors.

```razor
<FluentAvatar Color="AvatarColor.Neutral"
              Shape="AvatarShape.Circle"
              Size="AvatarSize.Size32" />
```

### Colorful Mode

Setting `Color="AvatarColor.Colorful"` picks a color from a predefined set based on a hash of the `Name` property:

```razor
<FluentAvatar Color="AvatarColor.Colorful" Name="Katri Athokas" />
<FluentAvatar Color="AvatarColor.Colorful" Name="Elvia Atkins" />
```

### Activity State

The `Active` property indicates whether the avatar represents an active user. Use `ActiveAppearance` to choose the visual treatment:

| ActiveAppearance | Effect |
|---|---|
| `Ring` (default) | Adds a ring around the avatar |
| `Shadow` | Adds a shadow |
| Both | Ring + Shadow combined |

Setting `Active="false"` renders the avatar smaller and partially transparent.

```razor
<FluentAvatar Active="@active"
              ActiveAppearance="AvatarActiveAppearance.Ring" />
```

## Content Priority

The avatar displays content based on the following priority order:

1. **Image** -- URL via the `Image` parameter
2. **Initials** -- auto-generated from `Name`, or overridden via `Initials`
3. **Name** -- displayed as text fallback
4. **Icon** -- default or custom icon

```razor
{{!-- Image --}}
<FluentAvatar Image="https://example.com/avatar.jpg" Name="User Name" />

{{!-- Name and initials --}}
<FluentAvatar Name="John Doe" />
<FluentAvatar Name="John Doe" Initials="JD" />

{{!-- Custom icon --}}
<FluentAvatar Icon="@(new Icons.Regular.Size32.Guest())" />
```

> Best practice: when providing an `Image`, also provide `Initials` to display as fallback while the image loads or if it fails.

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `Color` | `AvatarColor?` | Color preset or `Colorful` for hash-based color |
| `Shape` | `AvatarShape?` | `Circle` (default) or `Square` |
| `Size` | `AvatarSize?` | Size from 16px to 128px |
| `Active` | `bool?` | Activity state indicator |
| `ActiveAppearance` | `AvatarActiveAppearance?` | `Ring`, `Shadow`, or both |
| `Name` | `string?` | User name, used for initials generation |
| `Initials` | `string?` | Override auto-generated initials |
| `Image` | `string?` | Image URL |
| `Icon` | `Icon?` | Custom icon replacing the default |
