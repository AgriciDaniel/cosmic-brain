---
type: concept
title: "Fluent 2 Typography"
address: c-000019
source_url: "https://fluent2.microsoft.design/typography"
raw_file: "raw/articles/typography-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - typography
  - type-ramp
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Principles]]"
  - "[[Fluent 2 Accessibility]]"
---

# Fluent 2 Typography

Clear hierarchy organizes and structures content for scannability.

## Font Stacks

- **Segoe** — Microsoft signature; Windows OS, native apps, web ("Unmistakably Microsoft")
- **Native fallbacks** — system fonts per platform (Web, macOS, iOS, Android) for familiarity and accessibility

## Web Type Ramp (Segoe UI)

Sizes / line-heights (px):

- **Captions**: Caption 2 R/SB 10/14 · Caption 1 R/SB/B 12/16
- **Body**: Body 1 R/SB/B 14/20
- **Subtitles**: Subtitle 2 SB/B 16/22 · Subtitle 1 SB 20/26
- **Titles**: Title 3 SB 24/32 · Title 2 SB 28/36 · Title 1 SB 32/40
- **Large**: Large Title SB 40/52 · Display SB 68/92

## Windows (Segoe UI Variable)

Caption R 12/16 · Body R/SB 14/20 · Body large R 18/24 · Subtitle SB 20/28 · Title SB 28/36 · Large Title SB 40/52 · Display SB 68/92

## macOS / iOS (San Francisco Pro) / Android (Roboto)

Same name structure (Caption/Body/Title/Large Title/Display) with platform-specific sizing in pt or sp. See `raw/articles/typography-2026-05-24.md` for full per-platform tables.

## Styling Rules

- **Casing**: sentence case. Avoid all-caps ("difficult to read").
- **Vertical alignment**: baseline for rhythm
- **Horizontal alignment**: left for LTR; right for RTL; center sparingly for emphasis
- **Color contrast** (mandatory):
  - Standard text ≥ **4.5:1**
  - Large text (>18.5 px bold or 24 px regular) ≥ **3:1**

The Body 1 token (14/20) is the workhorse — it matches the `--fontSizeBase300` / `--lineHeightBase300` baseline used by [[FluentUI Blazor Styles]].

## Source

Fetched from https://fluent2.microsoft.design/typography on 2026-05-24.
