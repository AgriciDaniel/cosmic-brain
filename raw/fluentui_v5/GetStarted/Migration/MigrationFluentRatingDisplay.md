---
title: Migration FluentRatingDisplay
route: /Migration/RatingDisplay
hidden: true
---

- ### New component in V5 ✨

  `FluentRatingDisplay` is a new **read-only** rating display component.
  It replaces V4's `FluentRating` (which was interactive).

- ### V4 FluentRating → V5 FluentRatingDisplay

  | V4 `FluentRating` | V5 `FluentRatingDisplay` | Change |
  |-------------------|--------------------------|--------|
  | `MaxValue` (`int`, default `5`) | `Max` (`double`, default `5`) | Renamed, supports fractional values |
  | `Value` / `ValueChanged` (`int`) | `Value` (`double`) | Now read-only — no `ValueChanged` |
  | `ReadOnly` | — | **Removed** — always read-only |
  | `AllowReset` | — | **Removed** |
  | `ChildContent` | — | **Removed** |
  | `IconFilled` / `IconOutline` | `Icon` / `IconOutline` | Renamed |

- ### Migration example

  ```xml
  <!-- V4: Interactive rating -->
  <FluentRating @bind-Value="userRating" MaxValue="5" />

  <!-- V5: Read-only display -->
  <FluentRatingDisplay Value="4.3" Max="5" Count="128" />
  ```

  > ⚠️ V5's `FluentRatingDisplay` is **read-only**. There is no interactive rating component in V5.
  > For interactive ratings, build a custom component using `FluentButton` with star icons.
