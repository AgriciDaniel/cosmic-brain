---
title: Migration FluentPullToRefresh
route: /Migration/PullToRefresh
hidden: true
---

- ### Minimal changes

  The `FluentPullToRefresh` component is mostly unchanged in V5.

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `TipHeight` (`int`, default `32`) | `TipHeight` (`string`, default `"32px"`) | Changed from int to string — now accepts CSS values |

  ```xml
  <!-- V4 -->
  <FluentPullToRefresh TipHeight="40" />

  <!-- V5 -->
  <FluentPullToRefresh TipHeight="40px" />
  ```
