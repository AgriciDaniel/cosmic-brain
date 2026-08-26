---
type: concept
title: "Fluent 2 Design Tokens"
address: c-000022
source_url: "https://fluent2.microsoft.design/design-tokens"
raw_file: ".raw/articles/design-tokens-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - design-tokens
  - theming
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Color System]]"
  - "[[Fluent 2 Color Tokens]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Design Tokens

"Design tokens are stored values used to assign Fluent styles like color, typography, spacing, or elevation, without hardcoding pixels and hex codes."

## Two-Layer Architecture

| Layer | What it stores | Examples |
|-------|----------------|----------|
| **Global tokens** | Context-independent raw values | Hex codes, type sizes, border radii, stroke widths, animation properties |
| **Alias tokens** | Semantic mappings to globals | `colorBrandBackground`, `colorNeutralForeground1`, `shadow8`, etc. |

Aliases consolidate multi-value styles (shadows, typography) into single accessible references and **name the intent** — designers and developers don't need to remember hex codes.

## Theming

The architecture natively supports:

- **Light mode**
- **Dark mode**
- **High-contrast mode**
- **Branded variations**

Adequate contrast preserved across all themes.

## Concrete Implementations

[[FluentUI Blazor Styles]] surfaces the alias tokens on `<html>` as CSS variables. [[Fluent 2 Color Tokens]] documents the full alias color catalog (neutrals, brand, status, generic palette).

## Source

Fetched from https://fluent2.microsoft.design/design-tokens on 2026-05-24.
