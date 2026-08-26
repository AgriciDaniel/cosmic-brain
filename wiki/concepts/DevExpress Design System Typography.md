---
type: concept
title: "DevExpress Design System Typography"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-tokens
  - typography
  - css-variables
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Tokens]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System Typography

[[DevExpress Design System]] (DXDS) typography is organized into 7 style groups, each with Base (raw scale) and Semantic (theme-aware) CSS variable tiers. (Source: [[DevExpress Design System Documentation]])

## Style Groups

1. Font family
2. Font size
3. Font weight
4. Letter spacing
5. Line height
6. Text case
7. Text decoration

Each group follows the same [[DevExpress Design System Tokens|base vs semantic token]] split used across DXDS: base variables hold the raw scale, semantic variables map a named role (e.g. "caption", "body", "heading") to a base value and can shift with the active theme.

Example semantic variable pattern: `--dxds-font-size-caption-sm` — a size-tier variable scoped to a named text role (caption) and size modifier (sm).

> [!gap] The full font-family/weight/letter-spacing/line-height/text-case/text-decoration variable tables were captured in Round 1 of this research but the raw fetch text was not retained verbatim past that round. This page reflects the confirmed structural model (7 groups × base/semantic tiers) rather than a full variable-by-variable listing. Re-fetch https://docs.devexpress.com/DesignSystem/405635/typography for the complete variable tables if exact names/values are needed.

## Related

- [[DevExpress Design System Tokens]] — base vs semantic model this page instantiates
- [[DevExpress Design System Colors]] — sibling token domain
