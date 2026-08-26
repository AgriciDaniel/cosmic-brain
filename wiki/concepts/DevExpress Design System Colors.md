---
type: concept
title: "DevExpress Design System Colors"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-tokens
  - color
  - css-variables
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Tokens]]"
  - "[[DevExpress Design System Border, Opacity & Shadows]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System Colors

[[DevExpress Design System]] (DXDS) color system has two layers: base palettes and semantic color role variables. (Source: [[DevExpress Design System Documentation]])

## Palettes (Base Tokens)

**Theme Palettes** — Primary, Secondary, Info, Success, Warning, Danger use 17-step scale (`--dxds-primary-10` … `--dxds-primary-170`); Neutral uses 25-step scale (`--dxds-neutral-10` … `--dxds-neutral-250`).

**Utility Palettes** — 11 color families (Gray, Blue, Cyan, Teal, Green, Yellow, Orange, Red, Pink, Purple, Indigo), each 12-step scale: `--dxds-utility-<color>-10` … `-120`.

**Icon Colors** — base-only, mode-dependent (different hex per Light/Dark mode, but not per theme): `--dxds-icon-color-black`, `-white`, `-red`, `-yellow`, `-green`, `-blue`, `-purple`.

> [!important] Guidance
> "Do not use raw color values (base CSS variables) in your application. Use semantic variables only." (Source: [[DevExpress Design System Documentation]], stated on Utility Palettes page)

## Semantic Color Roles (Color Roles page)

Layered schema: **High-Level Role** → **Semantic Role** → **Intensity** → **State**.

- High-Level Role: `Surface` (background), `Content` (text/graphics), `Border`
- Semantic Role: `Neutral`, `Primary`, `Secondary`, `Info`, `Success`, `Warning`, `Danger`, `Utility`, `Transparent`, plus role-specific extras (`Highlight`/`Backdrop` under Surface and Content, `Focus` under Border only)
- Intensity: `Default`, `Subdued`, `Deep`, `Compound`, `Alpha`, `Accessible` (accessible appears only under Border/Neutral)
- State: `Rest`, `Hovered`, `Active`, `Selected`, `Selected-Hovered`, `Disabled`, plus mode modifiers `Inverted`, `Static-Light`, `Static-Dark`, `On-Surface` that themselves take their own rest/hovered/active/selected/disabled suffixes

## CSS Variable Naming Pattern

```
--dxds-color-<high-level-role>-<semantic-role>-<intensity>[-<modifier>]-<state>
```

Confirmed from the Semantic CSS Variables reference page (316 unique variable names across Surface/Content/Border). Real irregularities, not a strict fixed-arity pattern:

- `active` is a real state value used throughout — not documented as part of the original 4-layer schema summary but present in nearly every role/intensity combination.
- Modifier tokens (`inverted`, `static-light`, `static-dark`, `on-surface`) sit *between* intensity and the terminal state, not as states themselves: e.g. `--dxds-color-surface-neutral-default-inverted-hovered`, `--dxds-color-content-neutral-deep-on-surface-rest`.
- `Utility` role substitutes a literal color name (blue/cyan/gray/green/indigo/orange/pink/purple/red/teal/yellow) in place of intensity, then `default` or `subdued`, then (usually) `rest` only — no hovered/active/disabled states for Utility surfaces/borders. Utility Content's subdued variant is always `-subdued-on-surface-rest`, never plain `-subdued-rest`.
- `Transparent` and `Highlight` collapse straight to `-rest` (no intensity token): `--dxds-color-surface-transparent-rest`, `--dxds-color-content-highlight-rest`.
- `Backdrop` (Surface/Content only, not Border) keeps `default`: `--dxds-color-surface-backdrop-default-rest`.
- `Focus` (Border only, replaces Highlight/Backdrop) skips intensity **and** interaction-state entirely — only a mode suffix: `--dxds-color-border-focus-default`, `-inverted`, `-static-light`, `-static-dark`.

### Sample variables (verbatim)

```
--dxds-color-surface-neutral-default-rest
--dxds-color-surface-neutral-default-inverted-active
--dxds-color-surface-primary-compound-active
--dxds-color-surface-primary-deep-static-light-selected
--dxds-color-surface-utility-teal-subdued-rest
--dxds-color-surface-backdrop-default-rest
--dxds-color-content-neutral-deep-on-surface-rest
--dxds-color-content-utility-indigo-subdued-on-surface-rest
--dxds-color-border-neutral-accessible-hovered
--dxds-color-border-focus-static-dark
```

## Per-Role Coverage (Fluent Blue theme)

| High-Level Role | Semantic roles present | Notes |
| --- | --- | --- |
| Surface | Neutral, Primary, Secondary, Info, Success, Warning, Danger, Utility, Transparent, Highlight, Backdrop (11) | Neutral has richest branching (47 vars: default/subdued/deep/compound/alpha × modifiers). Secondary is default-only, no subdued/deep/compound/alpha. |
| Content | Neutral, Primary, Secondary, Info, Success, Warning, Danger, Utility, Transparent, Highlight (10) | No Backdrop role in Content. Primary/Success/Danger stop at rest/hovered/active (no selected/disabled). |
| Border | Neutral, Primary, Secondary, Info, Success, Warning, Danger, Utility, Transparent, Focus (10) | Focus replaces Highlight/Backdrop, unique to Border. Utility has no subdued variant here (unlike Surface/Content). |

Values are theme-specific — this page documents the DevExpress **Fluent Blue** theme; other themes resolve the same semantic variable names to different hex values. Literal hex/rgba tables exist in the source doc (~30 light/dark table pairs) but are not reproduced here since they are theme-specific and likely to drift; the durable knowledge is the naming schema and valid role/intensity/state combinations above.

## Related

- [[DevExpress Design System Tokens]] — base vs semantic split this page instantiates for color
- [[DevExpress Design System Border, Opacity & Shadows]] — border color scale is separate (radius/width only); actual border *color* comes from this page's semantic variables
