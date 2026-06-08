---
title: Migration FluentGrid
route: /Migration/Grid
hidden: true
---

- ### FluentGrid changes

  #### Default spacing changed 💥

  The `Spacing` parameter default has changed from `3` to `0`.
  If you relied on the default spacing, you must now set it explicitly.

  ```xml
  <!-- V4: Default Spacing was 3 -->
  <FluentGrid>...</FluentGrid>

  <!-- V5: Set Spacing explicitly to get the same result -->
  <FluentGrid Spacing="3">...</FluentGrid>
  ```

- ### FluentGridItem changes (reminder) 💥

  Properties have been renamed to PascalCase:

  | V4 | V5 |
  |----|----|
  | `xs` | `Xs` |
  | `sm` | `Sm` |
  | `md` | `Md` |
  | `lg` | `Lg` |
  | `xl` | `Xl` |
  | `xxl` | `Xxl` |
