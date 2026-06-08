---
title: Migration FluentAppBar
route: /Migration/AppBar
hidden: true
---

- ### Minor changes

  The `FluentAppBar` component has minor changes in V5. Most parameters remain unchanged.

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Count` (`int?`, default `0`) | `Count` (`int?`, default `null`) | Default value changed from `0` to `null` |
  | `AppsOverflow` (public) | `AppsOverflow` (internal) | Visibility reduced to internal — if you referenced this property directly, it is no longer accessible |
