---
type: concept
title: "FluentUI Blazor Styles"
address: c-000008
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - blazor
  - fluent-ui
  - css
  - design-tokens
  - design-system
related:
  - "[[FluentUI Blazor]]"
  - "[[fluent-ui-blazor-styles]]"
---

# FluentUI Blazor Styles

FluentUI Blazor ships its visual system in **two opt-in CSS layers** plus a **design-token vocabulary** exposed as CSS variables on the root element. Together they let consumers either accept the Fluent baseline wholesale, layer Bootstrap-style element resets on top, or opt out entirely and roll their own styling.

## The Two Stylesheet Layers

| Layer | File | Default | Source pattern | Purpose |
|-------|------|---------|----------------|---------|
| Default | `default-fuib.css` | **Auto-applied** | Inspired by [Normalize.css](https://necolas.github.io/normalize.css/) | Cross-browser tag normalization + component-baseline integration |
| Reboot | `reboot.css` | Opt-in | Inspired by Bootstrap Reboot (which is itself Normalize-based) | Opinionated element resets: `box-sizing`, `margin`, `font` inheritance |

Both ship inside the `Microsoft.FluentUI.AspNetCore.Components` NuGet package.

### Opting in / out

```html
<!-- Skip default normalizations entirely. Components may render incorrectly. -->
<body no-fuib-style>

<!-- Add Bootstrap-style resets on top of defaults. Either approach works: -->
<body use-reboot>

<link href="_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css"
      rel="stylesheet" />
```

The official Templates package pre-wires Reboot, so projects scaffolded from the template inherit it for free.

## Reboot's Opinions

Reboot encodes four explicit conventions:

1. **`rem` over `em`** for spacing — scalable, predictable.
2. **No `margin-top`** — single-direction margins avoid collapse surprises.
3. **`rem`-based block margins** — easier device-scaling.
4. **Inherit `font-*`** wherever possible — keep declarations minimal.

Plus two concrete page-level resets:

```css
* { box-sizing: border-box; }

body {
  margin: 0; padding: 0;
  height: 100dvh; overflow: hidden;
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  line-height: var(--lineHeightBase300);
  font-weight: var(--fontWeightRegular);
  color: var(--colorNeutralForeground1);
  background-color: var(--colorNeutralBackground1);
  scrollbar-color: var(--colorNeutralForeground4) var(--colorNeutralBackground2);
}
```

And one accessibility hardening:

```css
[hidden] { display: none !important; }
```

This (borrowed from PureCSS) prevents `display:` overrides from accidentally exposing content marked `hidden`. Important for SPA frameworks where component templates may set `display` aggressively.

## Design Tokens (CSS Variables)

FluentUI Blazor injects its full token system as CSS custom properties on `<html>`. The catalog mirrors the broader Fluent Design System and falls into seven families.

### Scale tokens

| Family | Variable shape | Range |
|--------|----------------|-------|
| Border radius | `--borderRadius{None,Small,Medium,Large,XLarge,Circular}` | 0px → 10000px |
| Font size — base | `--fontSizeBase{100..600}` | 10px → 24px |
| Font size — hero | `--fontSizeHero{700..1000}` | 28px → 68px |
| Line height — base | `--lineHeightBase{100..600}` | 14px → 32px |
| Line height — hero | `--lineHeightHero{700..1000}` | 36px → 92px |
| Stroke width | `--strokeWidth{Thin,Thick,Thicker,Thickest}` | 1px → 4px |
| Spacing | `--spacing{Horizontal,Vertical}{None,XS,S,M,L,XL,XXL,XXXL,XXXXL}` | 0 → 32px |

### Motion tokens

- **Duration**: `--duration{UltraFast,Faster,Fast,Normal,Gentle,Slow,Slower,UltraSlow}` (50ms → 500ms).
- **Curve**: `--curve{Accelerate,Decelerate,EasyEase}{Max,Mid,Min}` plus `--curveLinear`. Each is a `cubic-bezier(...)`.

### Typography tokens

- `--fontFamilyBase` → Segoe UI stack.
- `--fontFamilyMonospace` → Consolas stack.
- `--fontFamilyNumeric` → Bahnschrift / Segoe UI.
- `--fontWeight{Regular,Medium,Semibold,Bold}` → 400, 500, 600, 700.

### Color tokens

The color system is the largest family. Each color comes in a base value plus state variants (`Hover`, `Pressed`, `Selected`, sometimes `Disabled`, `Static`, `Inverted`, `Alpha`).

| Sub-family | Examples |
|------------|----------|
| Neutral foreground | `--colorNeutralForeground{1..4}`, `Disabled`, `Inverted`, `OnBrand` |
| Neutral background | `--colorNeutralBackground{1..6}`, `Alpha`, `Inverted`, `Static`, `Disabled` |
| Neutral stroke / stencil | `--colorNeutralStroke{1..3}`, `Accessible`, `Alpha`, `Stencil{1,2}` |
| Brand foreground / background / stroke | `--colorBrand*` + `--colorCompoundBrand*` |
| Status | `--colorStatus{Success,Warning,Danger}{Background,Foreground,Border}{1..3}` |
| Palette | 34 named palettes (see source page table) |
| Subtle / transparent | `--colorSubtleBackground*`, `--colorTransparent*` |
| Shadow color | `--colorNeutralShadow{Ambient,Key}{,Lighter,Darker}`, `--colorBrandShadow*` |

### Shadow tokens

Six neutral shadows plus six brand-tinted variants:
```
--shadow{2,4,8,16,28,64}        # neutral
--shadow{2,4,8,16,28,64}Brand   # brand-tinted
```

## When to Override vs. Use

- **Consume tokens** when you need to extend Fluent visually (custom components, layouts). Reach for `--spacingHorizontalM` instead of `12px`.
- **Override tokens** for theming. Re-declare `--colorBrandBackground` etc. on a scoped selector.
- **Opt out of `default-fuib.css`** only when building a fully custom design system on top of FluentUI. Microsoft explicitly does not guarantee component rendering without it.

## Source

[[fluent-ui-blazor-styles]] (FluentUI Blazor v5.0.0-RC.3)
