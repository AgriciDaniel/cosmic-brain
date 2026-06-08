---
source_url: https://fluent2.microsoft.design/color-tokens
fetched: 2026-05-24
---
# Web Alias Color Tokens - Fluent 2 Design System

## Overview

Color tokens form the foundational palette. Four categories: **neutrals** (surfaces/text), **brand** (identity), **status** (success/error), **generic** (broader contexts).

## Token Categories

### Neutral Background

- **colorNeutralBackground1**–**6**: base surface; Rest/Hover/Pressed/Selected states. Light: white→grey[90]. Dark: grey[24]→black.
- **colorNeutralBackgroundInverted**: inverts light/dark
- **colorNeutralBackgroundStatic**: theme-stable (grey[20] light, grey[24] dark)
- **colorNeutralBackgroundAlpha**, **Alpha2**: semi-transparent
- **colorSubtleBackground**: transparent → colored on interaction
- **colorSubtleBackgroundLightAlpha**, **Inverted**
- **colorTransparentBackground**
- **colorNeutralCardBackground**: card-specific

### Neutral Foreground

- **colorNeutralForeground1**: primary text (grey[14] light, white dark)
- **colorNeutralForeground2**, **3**: secondary hierarchy; with brand-influenced hover (**Foreground2Brand**, **3Brand**)
- **colorNeutralForeground4**: tertiary
- **colorNeutralForegroundInverted**
- **colorNeutralForeground2Link**, **InvertedLink**
- Static: **Foreground1Static**, **StaticInverted**
- **colorNeutralForegroundOnBrand**: readable on brand bg
- **colorNeutralStencil1**, **2** + alpha

### Neutral Stroke

- **colorNeutralStrokeAccessible**: meets contrast (grey[38] light, grey[68] dark)
- **colorNeutralStroke1**, **2**, **3** with hover/pressed/selected
- **colorNeutralStrokeSubtle**
- **colorNeutralStrokeOnBrand**, **OnBrand2**
- **colorNeutralStrokeAlpha**, **Alpha2**
- **colorTransparentStroke**, **Interactive**

### Neutral Shadow

- **colorNeutralShadowAmbient** / **Key** (standard)
- **AmbientLighter** / **KeyLighter** (subtle)
- **AmbientDarker** / **KeyDarker** (prominent)

### Brand Background

- **colorBrandBackground**: primary; Rest (brand[80] light, brand[70] dark) + states
- **Static**: brand[80] locked
- **Background2**: secondary
- **Background3Static**, **4Static**: fixed alternatives
- **BackgroundInverted**

### Brand Foreground

- **colorBrandForegroundLink** + states
- **Foreground1**, **2**: primary/secondary brand text
- **ForegroundInverted**
- **ForegroundOnLight**

### Brand Stroke

- **colorBrandStroke1**
- **Stroke2**, **Stroke2Contrast**

### Brand Shadow

Two types matching neutral patterns, fixed rgba.

### Status Background / Foreground / Stroke

`{Success,Warning,Danger}{Background,Foreground,Border}{1,2,3}` plus inverted/active variants. Palettes: Danger=cranberry, Success=green, Warning=orange.

### Generic Palette Tokens

Background1–3 + Background2-only for: Red, Green, DarkOrange, Yellow, Berry, LightGreen, Marigold (primary); DarkRed, Cranberry, Pumpkin, Peach, Gold, Brass, Brown, Forest, Seafoam, DarkGreen, LightTeal, Teal, Steel, Blue, RoyalBlue, Cornflower, Navy, Lavender, Purple, Grape, Lilac, Pink, Magenta, Plum, Beige, Mink, Platinum, Anchor (secondary). Foreground1–3 + inverted. BorderActive/Border1/Border2.
