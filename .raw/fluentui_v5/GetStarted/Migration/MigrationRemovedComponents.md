---
title: Migration — Removed Components (Minor)
route: /Migration/RemovedComponents
hidden: true
---

- ### Overview

  The following V4 components have been **removed** in V5 with no direct replacement.
  This page covers the smaller components that don't warrant their own migration page.

---

- ### FluentFlipper — Removed

  `FluentFlipper` (left/right navigation arrows) has been removed.

  | V4 Parameter | Type |
  |-------------|------|
  | `Direction` | `FlipperDirection?` |
  | `Disabled` | `bool?` |
  | `HiddenScroll` | `bool` |

  **Migration**: Use `FluentButton` with arrow icons:

  ```xml
  <FluentButton OnClick="@Previous" Appearance="ButtonAppearance.Subtle">
      <FluentIcon Value="@(new Icons.Regular.Size20.ChevronLeft())" />
  </FluentButton>
  ```

---

- ### FluentHorizontalScroll — Removed

  `FluentHorizontalScroll` (horizontal scrolling container) has been removed.

  | V4 Parameter | Type | Default |
  |-------------|------|---------|
  | `Speed` | `int` | `600` |
  | `Duration` | `string?` | — |
  | `Easing` | `ScrollEasing?` | — |
  | `FlippersHiddenScroll` | `bool` | — |
  | `View` | `HorizontalScrollView?` | — |

  **Migration**: Use CSS `overflow-x: auto` on a container `<div>`.

---

- ### FluentCollapsibleRegion — Removed

  `FluentCollapsibleRegion` has been removed.

  | V4 Parameter | Type | Default |
  |-------------|------|---------|
  | `Expanded` / `ExpandedChanged` | `bool` | `false` |
  | `MaxHeight` | `string?` | — |

  **Migration**: Use Blazor's conditional rendering:

  ```xml
  @if (expanded)
  {
      <div style="max-height: 300px; overflow: auto;">
          @ChildContent
      </div>
  }
  ```

---

- ### FluentAccessibility — Removed

  `FluentAccessibility` (keyboard shortcut registration with notifications) has been removed.

  **Migration**: Use standard Blazor `@onkeydown` events or JavaScript interop.

---

- ### FluentEditForm — Removed

  `FluentEditForm` (wrapper around Blazor's `EditForm`) has been removed.
  V5 extends standard Blazor `EditForm` directly with Fluent styling.

  **Migration**: Use Blazor's `EditForm` directly. V5's `FluentField` components provide
  validation display.

---

- ### FluentProfileMenu — Removed

  `FluentProfileMenu` (user profile dropdown with avatar) has been removed.

  | V4 Parameter | Type |
  |-------------|------|
  | `Image` | `string?` |
  | `Initials` | `string?` |
  | `FullName` | `string?` |
  | `EMail` | `string?` |
  | `Status` | `PresenceStatus?` |
  | *(and more)* | |

  **Migration**: Build a custom profile menu using `FluentPopover`, `FluentAvatar`, and `FluentButton`.

  > **Note**: `FluentMenuButton` and `FluentPresenceBadge` were initially listed here but are
  > still present in V5 with significant changes. See their dedicated migration pages:
  > [FluentMenuButton](/Migration/MenuButton) and [FluentPresenceBadge](/Migration/PresenceBadge).
