---
type: concept
title: "Fluent 2 Material"
address: c-000016
source_url: "https://fluent2.microsoft.design/material"
raw_file: ".raw/articles/material-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - material
  - acrylic
  - mica
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Elevation]]"
---

# Fluent 2 Material

The texture of a surface. Four materials, each with distinct semantic and modal behavior.

| Material | Type | Mode-aware? | Use |
|----------|------|-------------|-----|
| **Solid** | Opaque | Yes | Most common; uses color + elevation to highlight regions |
| **Acrylic** | Semi-transparent (frosted glass) | Yes | Transient, light-dismiss surfaces (popovers, menus) |
| **Mica** | Opaque, desktop-tinted | Yes | Windows base layers; tinted by user's desktop on **active** window, neutral when **inactive** — built-in focus indicator |
| **Smoke** | Translucent black | **No** — always black | Dims interface beneath; signals **blocking** interactions (dialogs) |

## Categories

- **Occluding** (Acrylic, Mica): widely used as base layers on Windows beneath interactive UI
- **Transparent** (Smoke): rarer, used to highlight immersive surfaces or block interaction beneath modals
- **Solid**: the default

## When to Pick Which

- Build the base of a Windows app surface → **Mica** (free focus indication)
- Show a popover/menu that should feel temporary → **Acrylic**
- Open a modal dialog → **Smoke** behind it
- Anything else → **Solid**

## Source

Fetched from https://fluent2.microsoft.design/material on 2026-05-24.
