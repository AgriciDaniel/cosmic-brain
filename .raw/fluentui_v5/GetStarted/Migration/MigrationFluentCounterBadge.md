---
title: Migration FluentCounterBadge
route: /Migration/CounterBadge
hidden: true
---

### General

The `FluentCounterBadge` component has been significantly simplified in V5. It no longer
accepts `ChildContent`, `BadgeContent` or `BadgeTemplate` render fragments. Positioning
parameters have been removed — use `FluentBadge` with `Positioning` if you need to anchor
a counter to an element.

### Removed parameters 💥

- `ChildContent` and `BadgeContent` — the component no longer wraps other content.
- `BadgeTemplate` (`RenderFragment<int?>`) — custom badge rendering template removed.
- `Max`; use `OverflowCount` instead.
- `HorizontalPosition`, `BottomPosition` and `VerticalPosition` — positioning is no longer configurable on this component.
- `Appearance` — no longer supported on `FluentCounterBadge`.
- `BackgroundColor` and `Color` — no longer supported on `FluentCounterBadge`.
- `ShowOverflow` — overflow display is now controlled by `OverflowCount`.

### Renamed parameters 💥

- `Max` → `OverflowCount` — the maximum count value before showing overflow (e.g. "99+").

### Type-changed parameters 💥

- `ShowZero`: Changed from `bool` to `bool?`.

### New parameters

- `ShowEmpty` (`bool`) — when true, shows the badge even when `Count` is null.
