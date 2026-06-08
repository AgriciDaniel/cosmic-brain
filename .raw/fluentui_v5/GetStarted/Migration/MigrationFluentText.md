---
title: Migration FluentText
route: /Migration/Text
hidden: true
---

- ### New component in V5 ✨

  `FluentText` is a new typography component in V5, replacing V4's `FluentLabel`
  for text rendering with Fluent design tokens.

- ### V4 FluentLabel → V5 FluentText

  | V4 `FluentLabel` | V5 `FluentText` | Change |
  |-------------------|------------------|--------|
  | `Typo` (`Typography`) | `As` (`TextTag?`) | Renamed — semantic HTML tag: `H1`–`H6`, `P`, `Span`, etc. |
  | `Weight` (`FontWeight`) | `Weight` (`TextWeight?`) | Enum renamed: `Regular`, `Semibold`, `Bold`, `Medium` |
  | `Alignment` | `Align` (`TextAlign?`) | Renamed: `Start`, `Center`, `End`, `Justify` |
  | `Color` | `Color` (`Color?`) | Same concept, V5 enum |
  | `MarginBlock` | — | **Removed** — use `Margin` CSS utility |
  | `DefaultAppearance` | — | **Removed** |
  | `Disabled` | — | **Removed** |

- ### Typography mapping

  | V4 `Typography` | V5 `TextTag` |
  |-----------------|-------------|
  | `Typography.H1` | `TextTag.H1` |
  | `Typography.H2` | `TextTag.H2` |
  | `Typography.H3` | `TextTag.H3` |
  | `Typography.H4` | `TextTag.H4` |
  | `Typography.H5` | `TextTag.H5` |
  | `Typography.H6` | `TextTag.H6` |
  | `Typography.Body` | `TextTag.P` |
  | `Typography.Subject` | `TextTag.P` with `Size="TextSize.400"` and `Weight="TextWeight.Semibold"` |
  | `Typography.Header` | `TextTag.H4` with `Size="TextSize.500"` |
  | `Typography.PageTitle` | `TextTag.H1` with `Size="TextSize.800"` |
  | `Typography.HeroTitle` | `TextTag.H1` with `Size="TextSize.1000"` |

- ### Migration examples

  ```xml
  <!-- V4 -->
  <FluentLabel Typo="Typography.H1">Title</FluentLabel>
  <FluentLabel Typo="Typography.Body" Weight="FontWeight.Bold">Bold text</FluentLabel>

  <!-- V5 -->
  <FluentText As="TextTag.H1">Title</FluentText>
  <FluentText As="TextTag.P" Weight="TextWeight.Bold">Bold text</FluentText>
  ```
