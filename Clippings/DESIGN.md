---
version: alpha
name: DevExpress Design System
description: A token-driven visual language for the DevExpress Blazor suite,
  built on a strict base-token / semantic-token split. Every domain — color,
  typography, spacing, border, opacity, shadow — exposes raw scales as base
  tokens and intent-based, theme-and-mode-aware roles as semantic tokens.
  Applications are meant to consume the semantic layer only; the base layer
  never appears in application code. All values ship as CSS custom
  properties under a single `--dxds-` prefix.
colors:
  surface-neutral: "var(--dxds-color-surface-neutral-default-rest)"
  surface-primary: "var(--dxds-color-surface-primary-default-rest)"
  surface-backdrop: "var(--dxds-color-surface-backdrop-default-rest)"
  content-neutral: "var(--dxds-color-content-neutral-default-rest)"
  content-primary: "var(--dxds-color-content-primary-default-rest)"
  content-highlight: "var(--dxds-color-content-highlight-rest)"
  border-neutral: "var(--dxds-color-border-neutral-default-rest)"
  border-focus: "var(--dxds-color-border-focus-default)"
typography:
  caption-sm:
    fontFamily: "var(--dxds-font-family-caption)"
    fontSize: "var(--dxds-font-size-caption-sm)"
    fontWeight: "var(--dxds-font-weight-caption-sm)"
    lineHeight: "var(--dxds-line-height-caption-sm)"
    letterSpacing: "var(--dxds-letter-spacing-caption-sm)"
  body-md:
    fontFamily: "var(--dxds-font-family-body)"
    fontSize: "var(--dxds-font-size-body-md)"
    fontWeight: "var(--dxds-font-weight-body-md)"
    lineHeight: "var(--dxds-line-height-body-md)"
    letterSpacing: "var(--dxds-letter-spacing-body-md)"
rounded:
  none: "var(--dxds-border-radius-0)"
  sm: "var(--dxds-border-radius-40)"
  md: "var(--dxds-border-radius-80)"
  lg: "var(--dxds-border-radius-160)"
  full: "var(--dxds-border-radius-full)"
spacing:
  xs: "var(--dxds-spacing-100)"
  sm: "var(--dxds-spacing-200)"
  md: "var(--dxds-spacing-400)"
  base: "var(--dxds-spacing-600)"
  lg: "var(--dxds-spacing-800)"
  section: "var(--dxds-spacing-1600)"
  pull-in-sm: "var(--dxds-spacing-minus-200)"
components:
  button-primary:
    backgroundColor: "{colors.surface-primary}"
    textColor: "var(--dxds-color-content-static-light-rest)"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    borderWidth: "var(--dxds-border-width-0)"
    padding: "{spacing.sm} {spacing.md}"
  card:
    backgroundColor: "{colors.surface-neutral}"
    textColor: "{colors.content-neutral}"
    rounded: "{rounded.lg}"
    borderWidth: "var(--dxds-border-width-10)"
    borderColor: "{colors.border-neutral}"
    padding: "{spacing.base}"
    shadow: "var(--dxds-shadow-sm)"
---

## Overview

DevExpress Design System (DXDS) reads like an engineering spec more than a
mood board. It has no single hero color, no signature shape language — its
identity is the discipline of the token model itself. Every visual decision
routes through two tiers: **base tokens** (raw scales — palette steps,
radii, opacity stops — invariant across theme and mode) and **semantic
tokens** (intent-based roles that resolve differently per theme and per
light/dark mode, while the CSS variable name itself never changes). The
system explicitly forbids consuming the base tier from application code:
"Do not use raw color values (base CSS variables) in your application. Use
semantic variables only." That single rule is the whole philosophy in one
sentence — meaning lives in the semantic layer, and the base layer is
implementation detail.

DXDS is scoped narrowly on purpose: applicable to the DevExpress Blazor
suite only. It is not a general web design system and is unrelated to
Microsoft's Fluent 2 — a different vendor's token model that happens to
share the same base/semantic vocabulary by convention, not by lineage.

**Key Characteristics:**
- Two-tier token model on every domain, not just color — border, opacity,
  and spacing stay base-only (no theme variance); color and shadow are
  semantic (theme- and mode-aware values, stable variable names).
- Color roles are layered four deep — High-Level Role → Semantic Role →
  Intensity → State — producing 316 unique semantic color CSS variables
  across Surface, Content, and Border alone.
- State coverage is exhaustive by default: rest/hovered/active/selected/
  selected-hovered/disabled, plus mode modifiers (inverted, static-light,
  static-dark, on-surface) that each carry their own state suffixes.
- `--dxds-` is the only namespace. No component ships a variable outside it.

## Colors

### Surface (backgrounds)
- **Neutral** (`{colors.surface-neutral}`): default page/panel floor.
  Richest branching of any role — default, subdued, deep, compound, alpha,
  each crossed with the mode modifiers.
- **Primary** (`{colors.surface-primary}`): the single accent surface —
  primary buttons, active/selected emphasis. Rest/hovered/active/selected/
  disabled, plus deep and compound intensities for pressed and layered
  states.
- **Backdrop** (`{colors.surface-backdrop}`): the scrim behind modal/overlay
  content. Surface- and Content-only — Border has no backdrop role.
- **Utility**: 11 named color families (blue/cyan/teal/green/yellow/orange/
  red/pink/purple/indigo/gray) at `default`/`subdued` intensity, `rest`
  state only — utility surfaces don't carry interaction states.
- **Transparent / Highlight**: collapse straight to `-rest`, no intensity
  step. Used for zero-emphasis containers and text-selection highlight.

### Content (text & graphics)
- **Neutral** (`{colors.content-neutral}`): default text/icon color.
  Carries an `on-surface` modifier variant for text sitting on colored
  surfaces rather than the page floor.
- **Primary** (`{colors.content-primary}`): brand-accent text and icons —
  links, active nav items. Stops at rest/hovered/active, no selected/
  disabled — a lighter state set than Surface Primary.
- **Highlight** (`{colors.content-highlight}`): text pulled out for
  emphasis inside otherwise-neutral content, `-rest` only.

### Border
- **Neutral** (`{colors.border-neutral}`): default hairline/divider color.
  Carries an `accessible` intensity absent everywhere else in the system —
  a higher-contrast variant reserved for accessibility-critical dividers.
- **Focus** (`{colors.border-focus}`): the keyboard-focus ring color.
  Uniquely skips both intensity and interaction state — only a mode suffix
  (`default`/`inverted`/`static-light`/`static-dark`). Replaces Highlight
  and Backdrop, which don't exist under Border.

### Semantic
Every high-level role repeats the same six status semantics — Info,
Success, Warning, Danger, plus Primary/Secondary for brand emphasis —
so status color always resolves through the identical layered pattern
(`--dxds-color-<role>-<status>-<intensity>-<state>`) rather than a
special-cased alert palette.

## Typography

Font family: system/theme-supplied (DXDS does not bundle a typeface; it
tokenizes whichever font a theme declares). Seven style groups exist —
display, headline, title, body, label, caption, and button/action text —
each with its own base tier (raw size/weight scale) and semantic tier
(role-bound, e.g. `{typography.caption-sm}`, `{typography.body-md}`).

### Principles
Sizing and weight are named by role, not by HTML element — a `caption-sm`
label is deployed the same whether it sits inside a grid cell, a form
hint, or a chip, because the token carries the intent, not the tag. Each
style bundles font-family, size, weight, line-height, letter-spacing,
text-case, and text-decoration as one atomic reference — swapping
`{typography.body-md}` for `{typography.caption-sm}` changes every one of
those properties together, never just size in isolation.

### Note on exact values
> [!gap] The precise base-tier size/weight/line-height/letter-spacing
> numbers per style group were not retained verbatim from source research
> and are intentionally omitted here rather than fabricated. Re-derive from
> https://docs.devexpress.com/DesignSystem/405635/typography before relying
> on literal figures.

## Layout

Spacing is a single rem-based linear scale, `--dxds-spacing-0` through
`--dxds-spacing-1600`, plus a mirrored negative branch
(`--dxds-spacing-minus-*`) for pull-in/overlap layouts — most systems only
ever go positive; DXDS treats negative spacing as a first-class token
rather than an inline calc(). `{spacing.section}` marks the largest step,
reserved for page-section rhythm; `{spacing.xs}`/`{spacing.sm}` handle
control-internal padding.

Border radius and border width are base-only siblings of the spacing
scale — `--dxds-border-radius-0` through `-160`, plus a `-full` step fixed
at `62rem` for pill/avatar shapes; `--dxds-border-width-0` through `-40`
for hairline-to-emphasis stroke weight. Both stay constant across theme
and mode, unlike color.

## Elevation

Shadows are semantic (theme- and mode-aware, unlike border/opacity/
spacing) and modeled as **two layers per level** — a tight key shadow plus
a softer ambient shadow, composited together rather than stacked as
separate CSS declarations. Seven levels: `none`, `xs`, `sm`, `md`, `lg`,
`xl`, `2xl`. Dark mode does not just recolor the shadow — it roughly
doubles the alpha channel at every level relative to the light-mode
value, since a shadow that reads at 8% opacity on a white surface needs
real weight to register on a near-black one.

Opacity itself is a separate, thinner base-only scale — 21 steps in 5%
increments, `--dxds-opacity-0` through `--dxds-opacity-100` — used for
disabled-state treatments and overlay scrims independent of the shadow
system.

## Components

**`button-primary`** — The signature call-to-action. Background
`{colors.surface-primary}`, text set to the static-light content token
(fixed light text regardless of mode, since Primary surface stays a
solid brand fill in both themes), type `{typography.body-md}`, rounded
`{rounded.md}`, no border (`--dxds-border-width-0`). Hover/active/selected/
disabled states resolve automatically through the Surface Primary state
chain — no separate token set for pressed vs. rest.

**`card`** — The default content container. Background
`{colors.surface-neutral}`, text `{colors.content-neutral}`, rounded
`{rounded.lg}`, a single hairline border (`--dxds-border-width-10`) in
`{colors.border-neutral}`, padding `{spacing.base}`, shadow at the `sm`
elevation level. Depth comes from the hairline + shadow combination, not
either alone — consistent with DXDS's low-shadow, border-first surface
language inherited from its Fluent-family theming.

> [!gap] Only two representative components are modeled here (button,
> card). The full DXDS component surface spans the entire DevExpress
> Blazor catalog (grids, editors, navigation, overlays) — each resolves
> through the same token chain but is not individually enumerated in this
> file.

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Compact | < 768px | Single-column layout; toolbars collapse to overflow menus. |
| Standard | 768–1200px | Default multi-pane layout; grids show core columns. |
| Wide | > 1200px | Full column set; side panels stay persistently docked. |

### Touch Targets
- Interactive controls target ≥ 44 × 44px on touch-capable surfaces.
- Border and focus-ring tokens (`{colors.border-focus}`) scale up on touch
  to keep focus indication visible without a pointer.

### Collapsing Strategy
- Density is itself tokenized (Blazor components expose Compact/Normal/
  Comfortable density modes) rather than purely breakpoint-driven —
  responsive behavior and density behavior share the same spacing tokens.

## Known Gaps

- Exact hex/rgba values for the 316 semantic color variables (per theme,
  per light/dark mode) are not reproduced here — theme-specific and prone
  to drift across DevExpress releases; only the naming schema and role
  structure are captured as durable knowledge.
- Exact typography base-scale numbers (font-size/weight/line-height/
  letter-spacing per style group) were not retained verbatim from source
  research — flagged inline rather than fabricated.
- Motion/animation tokens are not covered — DXDS documentation for this
  research pass did not include a motion domain.
- Only DevExpress's own **Fluent Blue** theme is referenced for example
  values; DXDS ships multiple themes that resolve the same semantic
  variable names to different literal values.
- This file was authored from documentation research (DXDS official docs
  via `docs.devexpress.com/DesignSystem/`), not from a live rendered
  surface — component-level visual audit was not performed.

---

## Disclaimer

This file documents DevExpress's own published Design System (DXDS)
token model as described in DevExpress's official documentation. It is
not an official DevExpress deliverable — it is a DESIGN.md-format
transcription for use as AI-agent design context, built following the
`getdesign.md` / Google Stitch alpha spec structure. Trademarks and
product names belong to DevExpress Corp.
