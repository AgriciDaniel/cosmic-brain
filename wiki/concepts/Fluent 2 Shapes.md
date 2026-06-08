---
type: concept
title: "Fluent 2 Shapes"
address: c-000018
source_url: "https://fluent2.microsoft.design/shapes"
raw_file: ".raw/articles/shapes-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - shapes
  - corner-radius
  - stroke
related:
  - "[[Fluent 2 Design System]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Shapes

Three orthogonal properties define every shape: **form, corner radius, stroke.**

## Forms

| Form | Use |
|------|-----|
| **Rectangle** | Most common — buttons, textareas, menus, cards, images |
| **Circle** | Avatars and people-related components |
| **Pill** | Slider tracks, toggle channels, tags, chips |
| **Beak** | Reference point for floating surfaces (callouts, popovers) |

- **Fill** defines and emphasizes shapes
- **Border** identifies bounding containers on unfilled shapes (cards)

## Corner Radius

Default for rectangles is **4 px**. Below 32 px → **2 px**. Larger components → **8 px** or **12 px**.

| Token | Value | Usage |
|-------|-------|-------|
| None | 0 | Navigation bars, tab bars |
| Small | 2 | Small badges |
| Medium | 4 | Buttons, dropdowns (default) |
| Large | 8 | Large buttons |
| X-Large | 12 | Bottom sheets, popovers |
| Circle | 50% | Personas |

> [!key-insight] Skip rounding at adjacency
> Don't round corners **between adjacent UI elements inside a container** or **at screen edges** — produces awkward spacing.

## Stroke

### Thickness

| Token | Web | Mobile |
|-------|-----|--------|
| Thin | 1 | 1 |
| Thick | 2 | 2 |
| Thicker | 3 | 4 |
| Thickest | 4 | 6 |

Scale weight proportionally to element size.

### Caps

**Rounded caps** for consistency. Avoid square endpoints.

## Source

Fetched from https://fluent2.microsoft.design/shapes on 2026-05-24.
