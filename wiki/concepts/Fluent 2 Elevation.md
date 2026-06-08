---
type: concept
title: "Fluent 2 Elevation"
address: c-000013
source_url: "https://fluent2.microsoft.design/elevation"
raw_file: "raw/articles/elevation-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - elevation
  - shadow
related:
  - "[[Fluent 2 Design System]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Elevation

Elevation = perceived z-distance between an object and its background, expressed through shadows and light. Establishes hierarchy and focal points.

## Shadow Composition

- **Key shadows** — sharp, directional, define edges
- **Ambient shadows** — soft, diffused, imply distance
- **Platform note**: Windows uses **strokes** instead of key shadows for outlines

Sharp shadows = close. Soft + large = far. A single consistent light source across the UI.

## Shadow Ramp

| Ramp | Tokens | Typical use |
|------|--------|-------------|
| Low | `shadow2`, `shadow4`, `shadow8`, `shadow16` | Cards, FABs, app bars, command bars, dropdowns, tooltips, callouts, hover cards |
| High | `shadow28`, `shadow64` | Bottom sheets, side nav, tab bars, panels, pop-up dialogs |

Opacity differs by theme — light theme 14% (low) / 24%+20% (high); dark theme 28% + 14% (low) / 28%+20% (high).

## Shadows on Colored Surfaces

Brand-colored surfaces need luminosity-adjusted shadows to preserve perceived elevation:

```
luminosity = 0.2126·R + 0.7152·G + 0.0722·B
shadow1Opacity = Round(42 − 0.116·luminosity)
shadow2Opacity = Round(34 − 0.09·luminosity)
```

Use the **brand shadow tokens** (`shadow*Brand`) rather than the standard ramp on colored surfaces. See [[FluentUI Blazor Styles]] for how this surfaces in the Blazor implementation (`--shadow{2,4,8,16,28,64}` and `--shadow*Brand` variants).

## Source

Fetched from https://fluent2.microsoft.design/elevation on 2026-05-24.
