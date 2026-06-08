---
type: source
title: "Styles - FluentUI Blazor Components"
address: c-000007
source_url: "https://fluentui-blazor-v5.azurewebsites.net/Styles"
raw_file: "raw/Styles - FluentUI Blazor Components.md"
created: 2026-05-23
ingested: 2026-05-24
status: ingested
tags:
  - source
  - blazor
  - fluent-ui
  - css
  - design-tokens
related:
  - "[[FluentUI Blazor Styles]]"
  - "[[FluentUI Blazor]]"
---

# Source: Styles - FluentUI Blazor Components

**URL**: https://fluentui-blazor-v5.azurewebsites.net/Styles
**Version**: FluentUI Blazor v5.0.0-RC.3
**Ingested**: 2026-05-24

## Summary

Official styling reference for FluentUI Blazor v5. Documents the two opt-in stylesheet layers (`default-fuib.css` and `reboot.css`), how to opt out, and the full CSS-variable design-token system that all components draw from.

## Key Points

- **Two layers**, both included in the NuGet package:
  - `default-fuib.css` — applied automatically; normalizes HTML tags (Normalize.css-inspired). Opt out with `<body no-fuib-style>`.
  - `reboot.css` — opt-in element resets (Bootstrap Reboot-inspired). Enable with `<link>` in `App.razor`/`index.html` or `<body use-reboot>`.
- **Templates package** pre-wires Reboot for you.
- **Page defaults** applied by Reboot: `box-sizing: border-box` globally; `body` gets `margin/padding:0`, `height:100dvh`, `overflow:hidden`, and pulls font/color from design tokens (`--fontFamilyBase`, `--fontSizeBase300`, `--colorNeutralForeground1`, etc.).
- **`[hidden]` hardening**: Reboot forces `[hidden] { display: none !important }` so accidental overrides don't expose hidden content (PureCSS pattern).
- **Margin convention**: avoid `margin-top`; prefer single-direction margins in `rem` for predictable vertical rhythm and easier scaling.
- **Design tokens** live on `<html>` as CSS variables (inspectable in browser devtools). They form a parallel system to the Fluent Design System tokens.

## Design Token Categories

| Category | Examples |
|----------|----------|
| Border radius | `--borderRadius{None,Small,Medium,Large,XLarge,Circular}` |
| Font size | `--fontSizeBase{100..600}`, `--fontSizeHero{700..1000}` |
| Line height | `--lineHeightBase{100..600}`, `--lineHeightHero{700..1000}` |
| Font family | `--fontFamilyBase`, `--fontFamilyMonospace`, `--fontFamilyNumeric` |
| Font weight | `--fontWeight{Regular,Medium,Semibold,Bold}` |
| Stroke width | `--strokeWidth{Thin,Thick,Thicker,Thickest}` |
| Spacing | `--spacing{Horizontal,Vertical}{None,XS,S,M,L,XL,XXL,XXXL,XXXXL}` |
| Duration | `--duration{UltraFast..UltraSlow}` (50ms–500ms) |
| Curve | `--curve{Accelerate,Decelerate,EasyEase}{Max,Mid,Min}`, `--curveLinear` |
| Color — neutral | `--colorNeutral{Foreground,Background,Stroke,Stencil,Shadow}*` with state suffixes |
| Color — brand | `--colorBrand{Foreground,Background,Stroke,Shadow}*`, `--colorCompoundBrand*` |
| Color — palette | 20+ named palettes: `Red`, `Green`, `DarkOrange`, `Yellow`, `Berry`, `LightGreen`, `Marigold`, `Cranberry`, `Pumpkin`, `Peach`, `Gold`, `Brass`, `Brown`, `Forest`, `Seafoam`, `DarkGreen`, `LightTeal`, `Teal`, `Steel`, `Blue`, `RoyalBlue`, `Cornflower`, `Navy`, `Lavender`, `Purple`, `Grape`, `Lilac`, `Pink`, `Magenta`, `Plum`, `Beige`, `Mink`, `Platinum`, `Anchor` |
| Color — status | `--colorStatus{Success,Warning,Danger}{Background,Foreground,Border}*` |
| Shadow | `--shadow{2,4,8,16,28,64}` plus `Brand` variants |

State suffixes used across color tokens: `Hover`, `Pressed`, `Selected`, `Disabled`, `Static`, `Inverted`, `Alpha`.

## Opt-out / Opt-in Cheatsheet

| You want… | Do this |
|-----------|---------|
| Default styling (most users) | Nothing — `default-fuib.css` is automatic. |
| No defaults, style everything yourself | `<body no-fuib-style>` |
| Reboot via link tag | `<link href="_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css" rel="stylesheet" />` |
| Reboot via attribute | `<body use-reboot>` |
| Built-in via Templates package | Already wired. |

## Accessibility / Compatibility Notes

> [!key-insight] Default styles are not guaranteed to be optional
> Microsoft explicitly states: deactivating `default-fuib.css` means components may not render correctly. The defaults are not purely cosmetic — some components depend on the normalized baseline.

## Pages Created from This Source

- [[FluentUI Blazor Styles]] — concept page covering the layered stylesheet model and design tokens

## Pages Updated from This Source

- [[FluentUI Blazor]] — entity page, added Styles area
