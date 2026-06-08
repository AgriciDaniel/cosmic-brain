---
title: Migration FluentBadge
route: /Migration/Badge
hidden: true
---

### General

The text displayed in a badge is now set using the `Content` parameter. The `ChildContent`
parameter is now used to specify the element the badge 'wraps' (i.e. the anchor element for positioning).

### Removed parameters 💥

- `Fill`
- `Circular`; use `Shape` instead.
- `Width`, `Height`; use `Size` instead.
- `OnClick`; a `Badge` should not be used as a button.
- `DismissIcon`, `DismissTitle` and `OnDismissClick`; there may be a more general dismissable component in the future.

### Appearance 💥

The `Appearance` parameter has been updated to use the `BadgeAppearance` enum
instead of the `Appearance` enum.

`BadgeAppearance` enum has the following values:
- `Filled`
- `Ghost`
- `Outline`
- `Tint`

### Color 💥

The `Color` parameter has been updated to use the `BadgeColor` enum
instead of being of type `string?`.

`BadgeColor` enum has the following values:
- `Brand`
- `Danger`
- `Important`
- `Informative`
- `Severe`
- `Subtle`
- `Success`
- `Warning`

### New parameters

- `Content` (`string?`) — the text displayed inside the badge.
- `Shape` (`BadgeShape?`) — controls the badge shape (replaces `Circular`).
- `Size` (`BadgeSize?`) — controls the badge size (replaces `Width`/`Height`).
- `IconStart` (`Icon?`) — icon displayed before the content.
- `IconLabel` (`string?`) — accessible label for the icon.
- `IconEnd` (`Icon?`) — icon displayed after the content.
- `Positioning` (`Positioning?`) — controls how the badge is positioned relative to the wrapped element.
- `OffsetX` (`sbyte?`) — horizontal offset for badge positioning.
- `OffsetY` (`sbyte?`) — vertical offset for badge positioning.

### Migrating to v5

You can use the `ToBadgeAppearance()` method to convert the `Appearance` parameter to the `BadgeAppearance` enum.
```csharp
@using Microsoft.FluentUI.AspNetCore.Components.Migration

<FluentBadge Appearance="Appearance.Accent.ToBadgeAppearance()">Click</FluentBadge>
//                                        ^^^^^^^^^^^^^^^^^^^^
```

| v3 & v4 | v5 |
|---|---|
| `Appearance.Neutral` | `BadgeAppearance.Filled` |
| `Appearance.Accent` | `BadgeAppearance.Filled` |
| `Appearance.Lightweight` | `BadgeAppearance.Ghost` |

The other values of the `Appearance` enum were not supported in earlier versions
and will be converted to `BadgeAppearance.Filled`.
