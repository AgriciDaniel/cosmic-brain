---
type: concept
title: "Fluent 2 Accessibility"
address: c-000020
source_url: "https://fluent2.microsoft.design/accessibility"
raw_file: "raw/articles/accessibility-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - accessibility
  - wcag
  - inclusive-design
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Principles]]"
  - "[[Fluent 2 Color System]]"
  - "[[Fluent 2 Motion]]"
  - "[[Fluent 2 Typography]]"
---

# Fluent 2 Accessibility

Operationalizes the "One for All, All for One" principle ([[Fluent 2 Design Principles]]). "Solving for one and extending to many." Components target **WCAG 2.1 AA** or above.

## Structure & Hierarchy

- Use type ramp + formatting + color + dividers + spacing to express groupings
- Headings in **logical, sequential** order (no skipping levels for visual styling)

## Keyboard & Assistive Tech

- Manage focus visibility
- Focus follows a **"z" pattern** (left → right, top → bottom)
- Focus must remain visible after temporary UI (dialogs) closes

## Color Contrast (WCAG AA)

| Element | Minimum |
|---------|---------|
| Standard text | **4.5:1** |
| Large text (18.5 px bold or 24 px regular) | **3:1** |
| Interactive + non-textual (icons) | **3:1** against adjacent |

## Responsive Layouts

- Support **400% zoom** without horizontal scrolling (320 px breakpoint minimum)
- Support **200% text zoom** without clipping

## Rich Media

- Descriptive **alt text** for visual media
- Captions **customizable** for contrast (or sufficient contrast baked in)

## Meaningful Text

Plain, concise, consistent, descriptive. Supports skimming and non-native English speakers.

## Code

Semantic structure following web standards. Reference **WAI-ARIA authoring practices** for detailed patterns.

## Specs as Documentation

Document focus order, screen-reader annotations, semantic structure, cross-device interactions **alongside** padding/color. Tooling: A11y - Focus Order Figma plugin, Accessible Design Toolkit.

## Source

Fetched from https://fluent2.microsoft.design/accessibility on 2026-05-24.
