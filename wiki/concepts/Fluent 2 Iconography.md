---
type: concept
title: "Fluent 2 Iconography"
address: c-000014
source_url: "https://fluent2.microsoft.design/iconography"
raw_file: ".raw/articles/iconography-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - iconography
  - icons
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Principles]]"
---

# Fluent 2 Iconography

"Familiar, friendly, and modern" — icons as semantic carriers, not decoration.

## Three Collections

| Collection | Purpose | Notes |
|------------|---------|-------|
| **System icons** | UI affordances (commands, nav, status) | Open source, MIT license |
| **Product launch icons** | Microsoft app identity | Cannot replace the MS logo |
| **File type icons** | File/format indicators | 16, 48, 96 px optimal; SVG + WebP |

## System Icon Themes

- **Regular** — wayfinding (downloads, purchases, launches)
- **Filled** — selected states or moments needing visual weight

## Sizing

- **12 px** conveys info but is too small for interaction
- Match icon size to interaction context
- **Larger icons on smaller screens** to accommodate touch targets

## Product Launch Scaling

- Below 48 px: simplified versions (detail removed for readability)
- Above 48 px: full-fidelity, scale by **factors of four** (48, 64, 96, …)

## Naming Convention

> [!key-insight] Name the shape, not the function
> "Fluent system icons are literal metaphors and are named for the shape or object they represent, not the functionality they provide." Use **Shield**, not **Security**. This stops icon names from drifting as product semantics shift.

## Modifiers

- Always **filled theme** for contrast
- Position at **bottom right**
- Don't over-modify

## Color

- Solid colors only on system icons
- One color per icon
- Adequate contrast
- **Never modify product launch icon colors**

## Localization

Validate cultural meaning. Most icons don't need localization, but verify within the target context.

## Source

Fetched from https://fluent2.microsoft.design/iconography on 2026-05-24.
