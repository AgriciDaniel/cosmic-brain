---
type: synthesis
title: "Research: DevExpress Design System Foundation"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-system
  - research
related:
  - "[[DevExpress Design System]]"
  - "[[DevExpress Design System Tokens]]"
  - "[[DevExpress Design System Colors]]"
  - "[[DevExpress Design System Typography]]"
  - "[[DevExpress Design System Spacing]]"
  - "[[DevExpress Design System Border, Opacity & Shadows]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# Research: DevExpress Design System Foundation

## Overview

DevExpress Design System (DXDS) is DevExpress's own token-based visual language for the DevExpress Blazor suite, exposed entirely as `--dxds-` prefixed CSS variables. It follows a two-tier base/semantic token model across every domain: color, typography, spacing, border, opacity, shadow. Base tokens are raw, theme-invariant scales; semantic tokens are intent-based, theme- and mode-aware, and are the layer DevExpress components and applications are meant to consume directly. (Source: [[DevExpress Design System Documentation]])

## Key Findings

- DXDS scope is explicitly limited: "Applicable to DevExpress Blazor suite only" — stated on every doc page fetched. Distinct from Microsoft's Fluent 2 / FluentUI Blazor, already covered elsewhere in this vault — no overlap, do not conflate.
- Base vs semantic split is the organizing principle for the entire system, not just color. Border, opacity, and spacing are base-only (no theme overrides); shadow and color are semantic (values shift by theme + light/dark mode, variable names stay stable).
- Official guidance: "Do not use raw color values (base CSS variables) in your application. Use semantic variables only."
- Color semantic role schema is 4-layer (High-Level Role → Semantic Role → Intensity → State) but the real CSS variable naming has more irregularity than that summary suggests: an `active` state exists throughout, mode modifiers (`inverted`/`static-light`/`static-dark`/`on-surface`) insert between intensity and state rather than being states themselves, and roles like Utility/Transparent/Highlight/Backdrop/Focus each truncate the pattern differently. 316 unique semantic color CSS variables total across Surface/Content/Border.
- Shadows use a two-layer model (key shadow + ambient shadow), 7 levels (none/xs/sm/md/lg/xl/2xl); dark mode roughly doubles the alpha of light-mode rgba values at each level.
- DXDS ties into Figma via a "Foundation Tokens" community file and theme token collections that build the "Blazor UI Kit Fluent Theme" Figma file — confirmed to exist, not fetched (non-doc asset, out of scope).

## Key Entities

- [[DevExpress Design System]] — the system itself

## Key Concepts

- [[DevExpress Design System Tokens]] — base vs semantic model, `--dxds-` convention
- [[DevExpress Design System Colors]] — palettes + 4-layer semantic color role schema, naming pattern, 316-variable inventory
- [[DevExpress Design System Typography]] — 7 style groups × base/semantic tiers
- [[DevExpress Design System Spacing]] — rem scale incl. negative pull-in values
- [[DevExpress Design System Border, Opacity & Shadows]] — combined page for three thinner domains

## Open Questions

- Exact font-family/weight/letter-spacing/line-height/text-case/text-decoration variable tables (Typography) and exact spacing step-to-rem mapping were not retained verbatim from Round 1 fetches — flagged as `> [!gap]` on their respective pages. Re-fetch https://docs.devexpress.com/DesignSystem/405635/typography and https://docs.devexpress.com/DesignSystem/405633/spacing if exact values are needed.
- Literal hex/rgba value tables for all 316 semantic color variables (Light + Dark, Fluent Blue theme) exist in the source but were not transcribed into the wiki — theme-specific and likely to drift; only the naming schema and valid combinations were captured.
- Figma "Foundation Tokens" / "Blazor UI Kit Fluent Theme" files not fetched — pointer only.

## Sources

- [[DevExpress Design System Documentation]] — sole source, confidence: high (official first-party docs). `WebFetch` to docs.devexpress.com blocked in this environment; all content retrieved via `mcp__dxdocs` MCP server instead (transport limitation, not a documentation gap).
