---
title: Migration FluentOverlay
route: /Migration/Overlay
hidden: true
---

- ### Web component migration 💥

  `FluentOverlay` has been rewritten to use the `<fluent-overlay>` web component
  instead of a plain `<div>`. This is a major change.

- ### New properties

  - `CloseMode` (`OverlayCloseMode`, default `All`) — controls how the overlay can be closed.
    Replaces the removed `Dismissable` property.

- ### New methods

  - `ShowAsync()` — programmatically show the overlay.
  - `CloseAsync()` — programmatically close the overlay.

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Opacity` (`double?`) | `Opacity` (`int`, default `40`) | Type changed: double → int (percentage) |
  | `BackgroundColor` (`string?`) | `BackgroundColor` (`string`, default `"var(--colorBackgroundOverlay)"`) | Now non-nullable with default using CSS variable |

- ### Removed properties 💥

  - `OnClose` (`EventCallback<MouseEventArgs>`) — use `VisibleChanged` callback instead.
  - `Transparent` (`bool`) — configure `Opacity = 0` instead.
  - `Alignment` (`Align`) — no longer configurable.
  - `Justification` (`JustifyContent`) — no longer configurable.
  - `InteractiveExceptId` (`string?`) — no longer supported.
  - `Dismissable` (`bool`) — use `CloseMode` instead.
  - `PreventScroll` (`bool`) — no longer configurable.

- ### Migration example

  ```xml
  <!-- V4 -->
  <FluentOverlay @bind-Visible="showOverlay"
                 Dismissable="true"
                 Transparent="false"
                 Opacity="0.4"
                 PreventScroll="true" />

  <!-- V5 -->
  <FluentOverlay @bind-Visible="showOverlay"
                 CloseMode="OverlayCloseMode.All"
                 Opacity="40" />
  ```
