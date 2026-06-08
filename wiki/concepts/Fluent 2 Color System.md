---
type: concept
title: "Fluent 2 Color System"
address: c-000012
source_url: "https://fluent2.microsoft.design/color"
raw_file: "raw/articles/color-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - color
  - design-tokens
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Color Tokens]]"
  - "[[Fluent 2 Design Principles]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Color System

"Color is a tool used to express style, evoke emotion, and communicate meaning." Fluent 2 uses standardized palettes and intentional application to maintain consistency across surfaces.

## Three Palettes

| Palette | Role | Use sparingly? |
|---------|------|----------------|
| **Neutral** | Foundation: surfaces, text, layout, state cues. Lighter neutrals emphasize primary focus. | No — workhorse |
| **Shared** | Aligned across M365; high-value reusable components (avatars, calendars, badges). Mental-recognition across products. | **Yes** — accents only |
| **Brand** | Per-product identity (Teams, Word, Excel, PowerPoint, Outlook…). Anchors users within a product. | **Yes** — avoid large surfaces; dilutes hierarchy |

In dark mode, shared colors shift in saturation and brightness for eye strain and accessibility.

## Semantic Colors

Subset of the shared palette communicates feedback/status/urgency on real-world associations: red=danger, yellow=caution, green=positive. Rules:

- Use for important messages, not decoration
- Pair with other indicators (text, icons) to reinforce context

## Interaction States

Components **darken** across stages: rest → hover → selected (darkest). Focus uses thicker container strokes rather than color changes — distinguishes keyboard from mouse interaction.

> [!key-insight] Windows is inverse
> On Windows, controls become **lighter** on interaction. Cross-platform implementations must respect platform conventions, not impose one model.

## Accessibility

1. Perceivable contrast for low-vision and color-blind users
2. Personalized color schemes where possible
3. Pair color with text/graphics/indicators — color is never the sole carrier

See [[Fluent 2 Accessibility]] for WCAG ratios.

## Token System

Palette values stored as **context-agnostic globals**. **Alias tokens** add contextual guidance, simplifying selection without hex lookups and improving design-to-dev workflow. See [[Fluent 2 Color Tokens]] for the alias catalog and [[Fluent 2 Design Tokens]] for the broader token architecture.

## Source

Fetched from https://fluent2.microsoft.design/color on 2026-05-24.
