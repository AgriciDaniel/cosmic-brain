---
type: concept
title: "DevExpress Design System Spacing"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-tokens
  - spacing
  - css-variables
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Tokens]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System Spacing

[[DevExpress Design System]] (DXDS) spacing is a single rem-based scale, `--dxds-spacing-0` through `--dxds-spacing-1600`. (Source: [[DevExpress Design System Documentation]])

## Scale Characteristics

- Base CSS variables only — no theme-level overrides (consistent with [[DevExpress Design System Border, Opacity & Shadows|border and opacity]] scales)
- Includes negative values, `--dxds-spacing-minus-*`, used for overlaps and pull-ins (e.g. negative margins to intentionally overlap adjacent elements)

> [!gap] The full numeric step table (which named steps map to which rem values) was captured in Round 1 but the raw fetch text was not retained verbatim past that round. Re-fetch https://docs.devexpress.com/DesignSystem/405633/spacing for exact step-to-rem mappings if needed.

## Related

- [[DevExpress Design System Tokens]] — base vs semantic model (spacing is base-tier only)
- [[DevExpress Design System Border, Opacity & Shadows]] — sibling base-only token domains
