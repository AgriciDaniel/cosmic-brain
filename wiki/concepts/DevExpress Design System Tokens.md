---
type: concept
title: "DevExpress Design System Tokens"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-tokens
  - css-variables
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Colors]]"
  - "[[DevExpress Design System Typography]]"
  - "[[DevExpress Design System Spacing]]"
  - "[[DevExpress Design System Border, Opacity & Shadows]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System Tokens

[[DevExpress Design System]] (DXDS) uses a two-level design token model: Base Tokens and Semantic Tokens. Every token domain (color, typography, spacing, border, opacity, shadow) follows this same split. (Source: [[DevExpress Design System Documentation]])

## Base Tokens

Raw, context-free scales:
- Color palettes (theme palette shades, utility palette shades, icon colors)
- Font sizes, line heights
- Spacing steps
- Border radius / border width steps
- Opacity levels (5% increments, `--dxds-opacity-0` … `--dxds-opacity-100`)

Base tokens are shared across all DevExpress themes with **no theme-level overrides** — this is stated explicitly on the Border, Opacity, and Spacing doc pages. (Source: [[DevExpress Design System Documentation]])

## Semantic Tokens

Intent-based tokens that reference base tokens indirectly and adapt to:
- The active theme (e.g. Fluent Blue vs other theme palettes)
- The active color mode (Light / Dark)

Examples: color role variables (`--dxds-color-surface-primary-default-rest`), shadow level variables (`--dxds-box-shadow-md`, whose literal rgba values differ between light and dark mode while the variable name stays constant).

> [!important] Guidance
> DXDS documentation explicitly instructs: "Do not use raw color values (base CSS variables) in your application. Use semantic variables only." (Source: [[DevExpress Design System Documentation]]) This rule is stated on the Utility Palettes page but applies to the token system generally — base tokens are building blocks, semantic tokens are the public API.

## CSS Variable Convention

All DXDS tokens are exposed as public CSS variables with a `--dxds-` prefix. Naming generally follows `--dxds-<domain>-<...>`:

| Domain | Example base variable | Example semantic variable |
| --- | --- | --- |
| Color (theme palette) | `--dxds-primary-10` … `--dxds-primary-170` | `--dxds-color-surface-utility-blue-default-rest` |
| Color (icon) | `--dxds-icon-color-black` | — (icon colors are base-only, mode-dependent) |
| Spacing | `--dxds-spacing-160` | — (spacing is base-only, no theme overrides) |
| Typography | font-size/line-height base scale | `--dxds-font-size-caption-sm` (semantic tier) |
| Border | `--dxds-border-radius-80`, `--dxds-border-width-20` | — (base-only, no theme overrides) |
| Opacity | `--dxds-opacity-50` | — (base-only, no theme overrides) |
| Shadow | — | `--dxds-box-shadow-md` (semantic, mode-dependent value) |

Full detail per domain: [[DevExpress Design System Colors]], [[DevExpress Design System Typography]], [[DevExpress Design System Spacing]], [[DevExpress Design System Border, Opacity & Shadows]].
