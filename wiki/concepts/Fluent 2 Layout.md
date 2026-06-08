---
type: concept
title: "Fluent 2 Layout"
address: c-000015
source_url: "https://fluent2.microsoft.design/layout"
raw_file: ".raw/articles/layout-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - layout
  - spacing
  - grid
  - responsive
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Principles]]"
---

# Fluent 2 Layout

"Working on the grid ensures a standard direction for creative decision-making across products."

## Spacing & Proximity

Elements close together are perceived as related. Empty space creates implicit grouping — **no dividers required**.

### Global Spacing Ramp (4 px base)

`sizeNone (0)`, `size20 (2)`, `size40 (4)`, `size60 (6)`, `size80 (8)`, `size100 (10)`, `size120 (12)`, `size160 (16)`, `size200 (20)`, `size240 (24)`, `size280 (28)`, `size320 (32)`, `size360 (36)`, `size400 (40)`, `size480 (48)`, `size520 (52)`, `size560 (56)`.

Includes off-ramp icon-padding values 2, 6, 10. Units: iOS=pt, Android=dp, Web=px.

### Application

- **Component spacing**: small spacers, strong implied grouping
- **Pattern spacing**: consistency creates familiar rhythm
- **Layout spacing**: directs attention to high-importance regions
- **Touch targets**: iOS/Web 44×44, Android 48×48 — **never below**

## Grid

### Anatomy

- **Columns** — building blocks. 12-col is the default (divides into 2/3/4/6).
- **Gutters** — negative space between columns; multiples of base unit; adapt at breakpoints.
- **Margins** — outside columns/rows; fixed or %, adaptable.
- **Regions** — groupings forming composition units; biggest = most important.

### Grid Types

- **Baseline** — vertical rhythm for text
- **Column** — most common for web; 12 cols
- **Manuscript** — single column with margins; optimizes prose
- **Modular** — columns × rows = cell matrix

## Alignment

Vertical (top/center/bottom), horizontal (left/center/right). For mixed media: **objects centered, text left**. Use central alignment **sparingly** to concentrate focus.

## Responsive Design

### Breakpoints

| Class | Range (px) |
|-------|-----------|
| small | 320–479 |
| medium | 480–639 |
| large | 640–1023 |
| x-large | 1024–1365 |
| xx-large | 1366–1919 |
| xxx-large | 1920+ |

### Responsive vs Adaptive

- **Responsive**: one layout, fluid via media queries. "Build a feature one time and expect it to work across all screen sizes."
- **Adaptive**: multiple fixed layouts, progressive enhancement triggered by available space.

### Five Techniques

| Technique | Description |
|-----------|-------------|
| **Reposition** | Move vertically stacked → horizontal for natural reading order |
| **Resize** | Adjust sizes/margins for breathing room |
| **Reflow** | Single → multi-column to put more above the fold |
| **Show/hide** | Density appropriate to context |
| **Re-architect** | Fork/collapse with progressive disclosure |

## Source

Fetched from https://fluent2.microsoft.design/layout on 2026-05-24.
