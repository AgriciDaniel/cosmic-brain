---
title: FluentUI Blazor Badges
address: c-000104
status: developing
---

# FluentUI Blazor Badges

> Part of the [[FluentUI Blazor]] component library. Badges are visual indicators that communicate status or descriptions of associated components using short text, color, and icons.

## Overview

The FluentUI Blazor library provides three badge components:

| Component | Purpose |
|---|---|
| `FluentBadge` | Displays text and/or an icon |
| `FluentCounterBadge` | Displays numerical counts |
| `FluentPresenceBadge` | Displays user presence status |

Badges typically wrap a component (e.g., a `FluentButton`) to indicate status. They support **9 position** modes relative to the wrapped content.

## FluentBadge

### Appearance

Four appearance modes are available via `BadgeAppearance`:

```razor
<FluentBadge Appearance="BadgeAppearance.Filled" Content="filled" />
<FluentBadge Appearance="BadgeAppearance.Outline" Content="outline" />
<FluentBadge Appearance="BadgeAppearance.Ghost" Content="ghost" />
<FluentBadge Appearance="BadgeAppearance.Tint" Content="tint" />
```

### Colors

Use the `BadgeColor` enumeration:

```razor
<FluentBadge Color="BadgeColor.Brand" Content="brand" />
<FluentBadge Color="BadgeColor.Danger" Content="danger" />
<FluentBadge Color="BadgeColor.Important" Content="important" />
<FluentBadge Color="BadgeColor.Informative" Content="informative" />
<FluentBadge Color="BadgeColor.Success" Content="success" />
<FluentBadge Color="BadgeColor.Warning" Content="warning" />
<FluentBadge Color="BadgeColor.Severe" Content="severe" />
<FluentBadge Color="BadgeColor.Subtle" Content="subtle" />
```

Custom background color:

```razor
<FluentBadge Color="null" BackgroundColor="mediumpurple" Content="background" />
```

### Shape and Size

```razor
{{!-- Shape --}}
<FluentBadge Shape="BadgeShape.Circular" />
<FluentBadge Shape="BadgeShape.Rounded" />
<FluentBadge Shape="BadgeShape.Square" />

{{!-- Size --}}
<FluentBadge Size="BadgeSize.Tiny" />
<FluentBadge Size="BadgeSize.ExtraSmall" />
<FluentBadge Size="BadgeSize.Small" />
<FluentBadge Size="BadgeSize.Medium" />
<FluentBadge Size="BadgeSize.Large" />
<FluentBadge Size="BadgeSize.ExtraLarge" />
```

### Icons inside Badges

```razor
<FluentBadge IconStart="@(new Icons.Regular.Size16.Globe())" Content="Badge" />
<FluentBadge Color="BadgeColor.Informative" 
             IconEnd="@(new Icons.Regular.Size16.Globe())" 
             IconLabel="A globe" Content="Badge" />
```

### CSS Class Usage

Use the `.fluent-badge` CSS class on any HTML element for quick badge styling:

```html
<div class="fluent-badge" color="danger">danger</div>
<div class="fluent-badge" appearance="outline">outline</div>
<div class="fluent-badge" shape="rounded">rounded</div>
```

> Note: The CSS class is for standalone elements only. For attached badges, use the `FluentBadge` component with the `Positioning` parameter.

## FluentCounterBadge

### Default and Overflow

```razor
<FluentCounterBadge Count="8" />
<FluentCounterBadge Count="100" /> {{!-- Shows 99+ --}}
```

The `OverflowCount` (default 99) controls the max numeric display -- values above it show `{OverflowCount}+`.

### Visibility Control

| Parameter | Behavior |
|---|---|
| `ShowEmpty` | Shows badge even when `Count` is null |
| `ShowZero` | Shows badge when `Count` is 0 |
| `ShowWhen` | Lambda expression, e.g., `c => c > 4` |
| `Dot` | Shows as a dot instead of number; overrides `ShowEmpty="false"` |

```razor
<FluentCounterBadge ShowEmpty="false" />
<FluentCounterBadge Count="0" ShowZero="true" />
<FluentCounterBadge Count="5" ShowWhen="@(c => c > 4)" />
<FluentCounterBadge Dot="true" />
```

### Appearance Limitations

- CounterBadge does **not** support `Ghost` or `Tint` appearances
- CounterBadge does **not** support `Square` shape

### Colors and Sizes

Same `BadgeColor`, `BadgeAppearance` (subset), `BadgeSize`, and `BadgeShape` (subset) as `FluentBadge`.

## FluentPresenceBadge

### Status Values

The `PresenceStatus` enumeration provides these states:

| Status | Visual |
|---|---|
| `Available` | Green checkmark |
| `Away` | Yellow clock |
| `Busy` | Red circle (filled) |
| `DoNotDisturb` | Red dash in circle |
| `Offline` | Gray circle (outline) |
| `OutOfOffice` | Clock variant |
| `Blocked` | Red X/circle |
| `Unknown` | Gray question mark |

```razor
<FluentPresenceBadge Status="PresenceStatus.Available" />
<FluentPresenceBadge Status="PresenceStatus.DoNotDisturb" />
```

### Out Of Office

The `OutOfOffice` parameter changes the visual to indicate OOO status:

```razor
<FluentPresenceBadge Status="PresenceStatus.Available" OutOfOffice="true" />
```

### Sizes

Supports all `BadgeSize` values. Default is `Medium`.

```razor
<FluentPresenceBadge Status="PresenceStatus.Available" Size="BadgeSize.Small" />
```

### Integration with Avatar

Use the `slot="@FluentSlot.Badge"` approach to place a presence badge on an avatar:

```razor
<FluentAvatar Color="AvatarColor.Colorful" Name="Denis Voituron">
    <FluentPresenceBadge Status="PresenceStatus.Available" slot="@FluentSlot.Badge" />
</FluentAvatar>
```

### Unsupported Parameters

PresenceBadge does **not** support: `Appearance`, `BackgroundColor`, `Color`, `Content`, `IconEnd`, `IconLabel`, `IconStart`, `Shape`.

## Best Practices

- Badges should not receive focus; information must be surfaced on the parent control
- Badge content is exposed as text for screen readers -- provide `aria-label` for custom icons
- Do not rely only on color information; include meaningful descriptions
- Keep badge text short -- long text is not supported
- CounterBadges should use `OverflowCount` for large numbers (e.g., "99+")

## Positions

Nine attachment positions are available via the `Positioning` parameter (e.g., `AboveEnd`, `BelowStart`). Fine-tune with `OffsetX` and `OffsetY`.

## Localization (PresenceBadge)

Status strings can be customized via the built-in localization system:

| Key | Default |
|---|---|
| `PresenceStatus_Available` | "available" |
| `PresenceStatus_Away` | "away" |
| `PresenceStatus_OutOfOffice` | "out of office" |
| `PresenceStatus_Blocked` | "blocked" |
| `PresenceStatus_Busy` | "busy" |
| `PresenceStatus_DoNotDisturb` | "do not disturb" |
| `PresenceStatus_Offline` | "offline" |
| `PresenceStatus_Unknown` | "unknown" |
