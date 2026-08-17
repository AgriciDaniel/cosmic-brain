---
type: concept
title: "DevExpress Design System Border, Opacity & Shadows"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-tokens
  - border
  - opacity
  - shadow
  - css-variables
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Tokens]]"
  - "[[DevExpress Design System Colors]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System Border, Opacity & Shadows

Three smaller [[DevExpress Design System]] (DXDS) token domains, combined here since each is individually thin. All are "Applicable to DevExpress Blazor suite only." (Source: [[DevExpress Design System Documentation]])

## Border

Border radius and border width are fixed base CSS variable scales, shared by all DevExpress themes with **no theme-level overrides**. (Source: [[DevExpress Design System Documentation]])

**Border Radius**

| CSS Variable | Value |
| --- | --- |
| `--dxds-border-radius-0` | 0rem |
| `--dxds-border-radius-10` | 0.0625rem |
| `--dxds-border-radius-20` | 0.125rem |
| `--dxds-border-radius-30` | 0.1875rem |
| `--dxds-border-radius-40` | 0.25rem |
| `--dxds-border-radius-50` | 0.3125rem |
| `--dxds-border-radius-60` | 0.375rem |
| `--dxds-border-radius-80` | 0.5rem |
| `--dxds-border-radius-100` | 0.625rem |
| `--dxds-border-radius-120` | 0.75rem |
| `--dxds-border-radius-160` | 1rem |
| `--dxds-border-radius-full` | 62rem |

**Border Width**

| CSS Variable | Value |
| --- | --- |
| `--dxds-border-width-0` | 0rem |
| `--dxds-border-width-10` | 0.0625rem |
| `--dxds-border-width-20` | 0.125rem |
| `--dxds-border-width-30` | 0.1875rem |
| `--dxds-border-width-40` | 0.25rem |

**Border color** is not part of this scale — it's defined by the semantic color role variables covered in [[DevExpress Design System Colors]]. (Source: [[DevExpress Design System Documentation]])

## Opacity

A standardized transparency scale in 5% increments from 0 (fully transparent) to 100 (fully opaque). Base CSS variables, no theme-level overrides. (Source: [[DevExpress Design System Documentation]])

`--dxds-opacity-0` (0) through `--dxds-opacity-100` (1), stepping by 5: `--dxds-opacity-5` (0.05), `--dxds-opacity-10` (0.1), `--dxds-opacity-15` (0.15) … `--dxds-opacity-95` (0.95), `--dxds-opacity-100` (1). 21 steps total.

Used to layer surfaces with predictable visual hierarchy, apply interactive states, blend foreground/background colors, and support adaptive theming.

## Shadows

Shadow styles create depth, hierarchy, and visual emphasis. Each shadow level layers two components: a **key shadow** (pronounced layer, main light direction) and an **ambient shadow** (diffused, soft layer). Each layer specifies horizontal offset, vertical offset, blur radius, spread, and color. (Source: [[DevExpress Design System Documentation]])

Unlike border and opacity, shadow variables are **semantic** — theme-level, and their literal values change between Light and Dark color mode while the variable name stays constant.

**Shadow Levels**

| Level | Use Case |
| --- | --- |
| `none` | No shadow (flat surfaces) |
| `xs` | Extra-small shadow, subtle elevation |
| `sm` | Small shadow, compact surfaces |
| `md` | Medium shadow — cards, small surfaces, flyouts |
| `lg` | Large shadow — dropdowns, callouts, popovers |
| `xl` | Extra-large shadow, high elevation surfaces |
| `2xl` | Maximum elevation — overlays, layered components |

**Fluent theme values** (`--dxds-box-shadow-<level>`):

| Level | Light Mode | Dark Mode |
| --- | --- | --- |
| none | `0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)` | same |
| xs | `0 1px 2px 0 rgba(0,0,0,0.14), 0 0 2px 0 rgba(0,0,0,0.12)` | `0 1px 2px 0 rgba(0,0,0,0.28), 0 0 2px 0 rgba(0,0,0,0.24)` |
| sm | `0 2px 4px 0 rgba(0,0,0,0.14), 0 0 2px 0 rgba(0,0,0,0.12)` | `0 2px 4px 0 rgba(0,0,0,0.28), 0 0 2px 0 rgba(0,0,0,0.24)` |
| md | `0 4px 8px 0 rgba(0,0,0,0.14), 0 0 2px 0 rgba(0,0,0,0.12)` | `0 4px 8px 0 rgba(0,0,0,0.28), 0 0 2px 0 rgba(0,0,0,0.24)` |
| lg | `0 8px 16px 0 rgba(0,0,0,0.14), 0 0 2px 0 rgba(0,0,0,0.12)` | `0 8px 16px 0 rgba(0,0,0,0.28), 0 0 2px 0 rgba(0,0,0,0.24)` |
| xl | `0 14px 28px 0 rgba(0,0,0,0.24), 0 0 8px 0 rgba(0,0,0,0.2)` | `0 14px 28px 0 rgba(0,0,0,0.48), 0 0 8px 0 rgba(0,0,0,0.4)` |
| 2xl | `0 32px 64px 0 rgba(0,0,0,0.24), 0 0 8px 0 rgba(0,0,0,0.2)` | `0 32px 64px 0 rgba(0,0,0,0.48), 0 0 8px 0 rgba(0,0,0,0.4)` |

Higher shadow levels use larger blur values and greater vertical offset. Dark mode roughly doubles the alpha (opacity component) of both light-mode rgba values at each level.
