---
title: Migration Color
route: /Migration/Color
hidden: true
---

- ### Renamed values 🔃
  `Default` is equivalent of previous `Neutral` and `Primary` is equivalent of previous `Accent` values.

  The icon default color was changed from `Color.Accent` to [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword), 
  which means that the icon will inherit the color from its parent element.
  You can set the icon color to `Color.Primary` to get the previous behavior.

- ### Removed values💥
  `Neutral`, `Accent`, `Fill`, `FillInverse` values have been flagged as `Obsolete` and will be removed in the next version.

  |v3 & v4|v5|
  |---|---|
  |`Color.Neutral`      (--neutral-foreground-rest)     | `Color.Default`       (--colorNeutralForeground1)        |
  |`Color.Accent`       (--accent-fill-rest)            | `Color.Primary`       (--colorBrandForeground1)          |
  |`Color.Fill`         (--neutral-fill-rest)           | `Color.Default`       (--colorNeutralForeground1)        |
  |`Color.FillInverse`  (--neutral-fill-inverse-rest)   | `Color.Lightweight`   (--colorNeutralForegroundInverted) |
