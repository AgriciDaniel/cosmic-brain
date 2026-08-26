---
source_url: https://fluent2.microsoft.design/elevation
fetched: 2026-05-24
---
# Elevation - Fluent 2 Design System

## Overview

Elevation represents the perceived distance between an object and its background surface through shadows and light. This design principle creates visual cues, improves scannability, and communicates information hierarchy.

## Depth, Shadow, and Light

Fluent interfaces simulate three-dimensional space by positioning components at varying z-axis elevations to emphasize certain UI elements. The system employs "shadow and light to imply the distance between two surfaces." Sharp, crisp shadows suggest closeness; larger, softer shadows indicate greater distance.

## Shadow System

- **Key shadows**: Sharp, directional shadows defining element edges
- **Ambient shadows**: Soft, diffused shadows implying distance
- **Platform distinction**: Windows uses strokes instead of key shadows for object outlines.

## Low Elevation Ramp (Light Theme)

| Shadow | Blur | X | Y | Opacity | Use Cases |
|--------|------|---|---|---------|-----------|
| Shadow 2 | 1×n | 0 | 0.5×n | 14% | Cards, floating action buttons pressed |
| Shadow 4 | 1×n | 0 | 0.5×n | 14% | Cards without edge |
| Shadow 8 | 1×n | 0 | 0.5×n | 14% | FABs, raised cards, app bars |
| Shadow 16 | 1×n | 0 | 0.5×n | 14% | Cards, FABs pressed |

## Low Elevation Ramp (Dark Theme)

| Shadow | Shadow 1 Opacity | Shadow 2 Opacity | Use Cases |
|--------|------------------|------------------|-----------|
| Shadow 2 | 28% | 14% | Ribbon, icons, hero buttons |
| Shadow 4 | 28% | 14% | Cards, grid items, list items |
| Shadow 8 | 28% | 14% | Command bars, dropdowns, tooltips |
| Shadow 16 | 28% | 14% | Callouts, hover cards |

## High Elevation Ramp (Light)

| Shadow | Sh1 Blur | Sh2 Blur | Opacity | Use Cases |
|--------|----------|----------|---------|-----------|
| Shadow 28 | 1×n | 8 | 24% / 20% | Bottom sheets, side nav, tab bars |
| Shadow 64 | 1×n | 8 | 24% / 20% | Pop-up dialogs |

## High Elevation Ramp (Dark)

| Shadow | Sh1 Blur | Sh2 Blur | Opacity | Use Cases |
|--------|----------|----------|---------|-----------|
| Shadow 28 | 1×n | 2 | 28% / 20% | Bottom sheets, side nav, tab bars |
| Shadow 64 | 1×n | 2 | 28% / 20% | Panels, pop-up dialogs |

## Shadows on Color Surfaces

When applying shadows to brand colors, luminosity adjustment maintains perceived elevation:

- Luminosity = 0.2126 × R + 0.7152 × G + 0.0722 × B
- Shadow 1 opacity = Round(42 − 0.116 × luminosity)
- Shadow 2 opacity = Round(34 − 0.09 × luminosity)

Use brand shadow tokens for colored surfaces.
