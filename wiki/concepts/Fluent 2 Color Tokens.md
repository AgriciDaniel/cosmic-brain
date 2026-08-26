---
type: concept
title: "Fluent 2 Color Tokens"
address: c-000023
source_url: "https://fluent2.microsoft.design/color-tokens"
raw_file: ".raw/articles/color-tokens-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - color-tokens
  - design-tokens
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Tokens]]"
  - "[[Fluent 2 Color System]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Color Tokens

Web alias color tokens — the named surface of the Fluent 2 color palette. Four buckets: **neutrals**, **brand**, **status**, **generic palette**.

## Neutral Background

`colorNeutralBackground{1..6}` (Rest/Hover/Pressed/Selected). Light: white → grey[90]. Dark: grey[24] → black.

Plus: `…Inverted`, `…Static` (theme-stable grey[20]/grey[24]), `…Alpha{,2}`, `colorSubtleBackground{,LightAlpha,Inverted}`, `colorTransparentBackground`, `colorNeutralCardBackground`.

## Neutral Foreground

`colorNeutralForeground{1..4}` (1 = primary text; 2/3 = hierarchy; 4 = tertiary).

State hovers: `…2Brand`, `…3Brand` (brand-influenced hover).

Plus: `…Inverted`, `…2Link`, `…InvertedLink`, `…1Static`, `…StaticInverted`, `colorNeutralForegroundOnBrand`, `colorNeutralStencil{1,2}` (+ alpha).

## Neutral Stroke

- `colorNeutralStrokeAccessible` — meets contrast requirements (grey[38] / grey[68])
- `colorNeutralStroke{1,2,3}` + states
- `…Subtle`, `…OnBrand`, `…OnBrand2`
- `…Alpha{,2}`, `colorTransparentStroke{,Interactive}`

## Neutral Shadow

Six tokens, three intensities × Ambient/Key:

`colorNeutralShadow{Ambient,Key}` · `…{Ambient,Key}Lighter` · `…{Ambient,Key}Darker`

## Brand

| Family | Tokens |
|--------|--------|
| Background | `colorBrandBackground{,Static,2,3Static,4Static,Inverted}` + states |
| Foreground | `colorBrandForeground{Link,1,2,Inverted,OnLight}` + states |
| Stroke | `colorBrandStroke{1,2,2Contrast}` |
| Shadow | Two brand shadow tokens matching neutral pattern |

`colorBrandBackground` is brand[80] light / brand[70] dark; `…Static` locks brand[80] across themes.

## Status (Success / Warning / Danger)

`colorStatus{Success,Warning,Danger}{Background,Foreground,Border}{1,2,3}` + inverted/active variants.

Palettes: **Danger** = cranberry, **Success** = green, **Warning** = orange.

## Generic Palette

Per-palette `Background{1,2,3}`, `Foreground{1,2,3}`, `Border{Active,1,2}` (+ inverted) for the 30+ named palettes from the [[Fluent 2 Color System]]:

> Red, Green, DarkOrange, Yellow, Berry, LightGreen, Marigold (primary tier); DarkRed, Cranberry, Pumpkin, Peach, Gold, Brass, Brown, Forest, Seafoam, DarkGreen, LightTeal, Teal, Steel, Blue, RoyalBlue, Cornflower, Navy, Lavender, Purple, Grape, Lilac, Pink, Magenta, Plum, Beige, Mink, Platinum, Anchor (secondary tier).

## Mapping to FluentUI Blazor

These same alias names appear on `<html>` as CSS variables in [[FluentUI Blazor Styles]] — e.g., `--colorNeutralForeground1`, `--colorBrandBackground`, `--colorPaletteRedBorderActive`. The Blazor library is a thin restating of this token catalog.

## Source

Fetched from https://fluent2.microsoft.design/color-tokens on 2026-05-24.
