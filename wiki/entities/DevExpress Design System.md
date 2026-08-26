---
type: entity
title: "DevExpress Design System"
created: 2026-07-31
updated: 2026-07-31
status: developing
tags:
  - devexpress
  - design-system
  - design-tokens
  - blazor
  - ui-components
entity_type: design-system
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Design System Tokens]]"
  - "[[DevExpress Design System Colors]]"
  - "[[DevExpress Design System Typography]]"
  - "[[DevExpress Design System Spacing]]"
  - "[[DevExpress Design System Border, Opacity & Shadows]]"
sources:
  - "[[DevExpress Design System Documentation]]"
---

# DevExpress Design System

DevExpress Design System (DXDS) is DevExpress's own unified visual language for UI components, distinct from Microsoft's [[Fluent 2 Design System]]. It defines design tokens (base + semantic), color roles, typography, spacing, border, opacity, and shadow scales, exposed as public CSS variables prefixed `--dxds-`. (Source: [[DevExpress Design System Documentation]])

> [!important] Scope
> Every DXDS documentation page carries the same scope note: "Applicable to DevExpress Blazor suite only." Current version of the design system applies only to [[DevExpress Blazor]], not the wider DevExpress product line (WinForms, WPF, ASP.NET, etc.). (Source: [[DevExpress Design System Documentation]])

## Purpose

DXDS exists to give DevExpress Blazor components a consistent, theme-aware visual language that:
- Adapts to different themes (e.g. Fluent Blue) and color modes (Light/Dark) without per-component hardcoded values
- Gives designers and developers a shared vocabulary — Figma tokens map 1:1 to runtime CSS variables
- Supports customization at the token layer instead of overriding individual component styles

## Structure

DXDS is organized into token domains, each documented separately:
- [[DevExpress Design System Tokens]] — the base vs semantic token model and `--dxds-` naming convention
- [[DevExpress Design System Colors]] — palettes (Theme/Utility/Icon) and the 4-layer semantic color role schema
- [[DevExpress Design System Typography]] — font family, size, weight, letter spacing, line height, text case, text decoration
- [[DevExpress Design System Spacing]] — rem-based spacing scale including negative pull-in values
- [[DevExpress Design System Border, Opacity & Shadows]] — corner radius, border width, opacity, and shadow-level scales

## Figma Integration

DXDS tokens are available as a shared "Foundation Tokens" Figma community file and theme token collections. These build the "Blazor UI Kit Fluent Theme" Figma file, whose components match the runtime DevExpress Blazor controls. (Source: [[DevExpress Design System Documentation]])

> [!gap] Figma file URLs were not fetched (out of scope for this research pass — non-documentation asset). Only the existence and purpose of the Figma integration is confirmed here.

## Related

- [[DevExpress Blazor]] — the product suite DXDS currently scopes to
- [[Fluent 2 Design System]] / [[FluentUI Blazor]] — a separate, unrelated Microsoft design system also referenced in this vault; do not conflate with DXDS
