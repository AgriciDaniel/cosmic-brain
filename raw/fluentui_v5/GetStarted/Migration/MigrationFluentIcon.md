---
title: Migration FluentIcon
route: /Migration/Icon
hidden: true
---

- ### Default color changed 💥

  The default icon color has changed from `Color.Accent` to `currentColor` (inherits from the parent element's CSS color).
  If you relied on the accent color being applied automatically, you now need to set it explicitly.

  ```xml
  <!-- V4: Accent color applied by default -->
  <FluentIcon Value="@(new Icons.Regular.Size20.Home())" />

  <!-- V5: Inherits parent color. To get accent behavior: -->
  <FluentIcon Value="@(new Icons.Regular.Size20.Home())" Color="Color.Primary" />
  ```

- ### New properties

  - `Tooltip` (`string?`) — adds a tooltip to the icon.


