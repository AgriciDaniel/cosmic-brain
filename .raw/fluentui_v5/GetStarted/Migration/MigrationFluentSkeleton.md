---
title: Migration FluentSkeleton
route: /Migration/Skeleton
hidden: true
---

- ### No longer a web component 💥

  V4 rendered `<fluent-skeleton>`. V5 renders a plain `<div>` with CSS classes.

- ### New properties

  - `Circular` (`bool`) — renders a circular skeleton shape. Replaces the `Shape` enum.

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Shimmer` (`bool?`) | `Shimmer` (`bool`, default `true`) | No longer nullable, default `true` |
  | `Pattern` (`string?`) | `Pattern` (`SkeletonPattern?`) | Changed to typed enum: `Icon`, `IconTitle`, `IconTitleContent` |
  | `ChildContent` (`RenderFragment?`) | `ChildContent` (`RenderFragment<FluentSkeleton>?`) | Now receives self as context |
  | `Width` (`string`, default `"50px"`) | `Width` (`string?`, default `"100%"`) | Default changed |
  | `Height` (`string`, default `"50px"`) | `Height` (`string?`, default `"48px"`) | Default changed |

- ### Removed properties 💥

  - `Fill` (`string?`) — no longer supported.
  - `Shape` (`SkeletonShape?`) — use `Circular="true"` for circle shapes, default is rectangle.

- ### Migration example

  ```xml
  <!-- V4 -->
  <FluentSkeleton Shape="SkeletonShape.Circle" Width="40px" Height="40px" Shimmer="true" />
  <FluentSkeleton Shape="SkeletonShape.Rect" Width="200px" Height="20px" />

  <!-- V5 -->
  <FluentSkeleton Circular="true" Width="40px" Height="40px" />
  <FluentSkeleton Width="200px" Height="20px" />
  ```
