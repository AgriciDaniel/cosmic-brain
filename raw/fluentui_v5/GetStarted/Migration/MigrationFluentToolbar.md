---
title: Migration FluentToolbar
route: /Migration/Toolbar
hidden: true
---

- ### Component removed 💥

  `FluentToolbar` has been **removed** in V5.

- ### V4 FluentToolbar parameters (removed)

  | Parameter | Type | Default |
  |-----------|------|---------|
  | `Orientation` | `Orientation?` | `Horizontal` |
  | `ChildContent` | `RenderFragment?` | — |
  | `EnableArrowKeyTextNavigation` | `bool?` | `false` |

- ### Migration strategy

  Use `FluentStack` with horizontal orientation and manual button/icon arrangement:

  ```xml
  <!-- V4 -->
  <FluentToolbar Orientation="Orientation.Horizontal">
      <FluentButton>Save</FluentButton>
      <FluentButton>Copy</FluentButton>
      <FluentDivider Role="DividerRole.Presentation" Orientation="Orientation.Vertical" />
      <FluentButton>Delete</FluentButton>
  </FluentToolbar>

  <!-- V5 -->
  <FluentStack Orientation="Orientation.Horizontal" HorizontalGap="4px">
      <FluentButton>Save</FluentButton>
      <FluentButton>Copy</FluentButton>
      <FluentDivider Vertical="true" />
      <FluentButton>Delete</FluentButton>
  </FluentStack>
  ```

  > ⚠️ The `EnableArrowKeyTextNavigation` feature has no direct V5 replacement.
  > Implement custom keyboard navigation with `@onkeydown` if needed.
