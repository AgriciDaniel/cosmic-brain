---
title: Styles
order: 0003
category: 20|General
route: /Styles
icon: StyleGuide
---

# Styles

## Default Styles

The **FluentUI Blazor** library comes with a set of default styles that are applied to all components.
These styles are based on the **Fluent Design System** and are designed to make your site look good out of the box.
Component styles are integrated into these components and are based on CSS variables (see below).

In addition to the styles built into components, common HTML tags are also styled using
the <a href="_content/Microsoft.FluentUI.AspNetCore.Components/css/default-fuib.css" target="_blank">default-fuib.css</a> file
file, which is included in the package and **automatically applied to your site**.

These styles are inspired by the **[Normalize.css](https://necolas.github.io/normalize.css/)** library.
This lib makes browsers render all elements more consistently and in line with modern standards.
It precisely targets only the styles that need normalizing.

## Deactivating default sytles

In some cases, you may not want to use the default styles included in `default-fuib.css`.
You can deactivate them by setting the `no-fuib-style` attribute on the `body` tag.

```html
<body no-fuib-style> ... </body>
```

> ⚠️ If you deactivate the default styles, you will need to style your site yourself.
> **And we don't guarantee that components will be correctly represented without the default styles**.

## Reboot CSS

**Reboot** is a collection of element-specific CSS changes in a single file to help kickstart building
a site with the **FluentUI Blazor library**. It provides an elegant, consistent, and simple baseline
to build upon (inspired by Bootstrap's Reboot which again is based on Normalize.css)

If you want to use **Reboot** you have two options:

1. You need to include it in your `App.razor` or `index.html` file like this:
   ```html
   <link href="_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css" rel="stylesheet" />
   ```
2. You can add the attribute `use-reboot` to your `body` tag like this:
   ```html
   <body use-reboot> ... </body>
   ```

If you are creating a site by using our [Templates package](https://www.fluentui-blazor.net/Templates),
this is already set up for you.
You can <a href="/_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css" target="_blank">download the file</a> to see what's inside.

> [!NOTE] It is entirely possible to build a site **without using Reboot** but you will have to do more styling yourself.

## Approach

Reboot builds upon Bootstrap's Reboot which itself builds upon Normalize, providing many HTML elements
with somewhat opinionated styles using only element selectors.

Here are our guidelines and reasons for choosing what to override in Reboot:

- Update some browser default values to use `rems` instead of `ems` for scalable component spacing.
- Avoid `margin-top`. Vertical margins can collapse, yielding unexpected results.
  More importantly though, a single direction of `margin` is a simpler mental model.
- For easier scaling across device sizes, block elements should use rems for `margins`.
- Keep declarations of `font-`related properties to a minimum, using `inherit` whenever possible.

## Page defaults

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100dvh;
  overflow: hidden;
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  line-height: var(--lineHeightBase300);
  font-weight: var(--fontWeightRegular);
  color: var(--colorNeutralForeground1);
  background-color: var(--colorNeutralBackground1);
  scrollbar-color: var(--colorNeutralForeground4) var(--colorNeutralBackground2);
}
```

## HTML5 [hidden] attribute

HTML5 adds a new global attribute named `[hidden]`, which is styled as `display: none` by default.
Borrowing an idea from [PureCSS](https://purecss.io), we improve upon this default by making
`[hidden] { display: none !important; }` to help prevent its display from getting accidentally overridden.

```html
<input type="text" hidden>
```

## Examples

Here are some examples of the default styles applied to HTML elements:

{{ DefaultStylesSample }}

## CSS Variables

These variables are built by the **FluentUI** library directly behind the page's `html` tag.
You can display them using your browser's inspector.

Here are a few of them:

<pre style="max-height: 200px; overflow-y: scroll;"><code class="language-css hljs">--borderRadiusNone: 0;
--borderRadiusSmall: 2px;
--borderRadiusMedium: 4px;
--borderRadiusLarge: 6px;
--borderRadiusXLarge: 8px;
--borderRadiusCircular: 10000px;
--fontSizeBase100: 10px;
--fontSizeBase200: 12px;
--fontSizeBase300: 14px;
--fontSizeBase400: 16px;
--fontSizeBase500: 20px;
--fontSizeBase600: 24px;
--fontSizeHero700: 28px;
--fontSizeHero800: 32px;
--fontSizeHero900: 40px;
--fontSizeHero1000: 68px;
--lineHeightBase100: 14px;
--lineHeightBase200: 16px;
--lineHeightBase300: 20px;
--lineHeightBase400: 22px;
--lineHeightBase500: 28px;
--lineHeightBase600: 32px;
--lineHeightHero700: 36px;
--lineHeightHero800: 40px;
--lineHeightHero900: 52px;
--lineHeightHero1000: 92px;
--fontFamilyBase: 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
--fontFamilyMonospace: Consolas, 'Courier New', Courier, monospace;
--fontFamilyNumeric: Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
--fontWeightRegular: 400;
--fontWeightMedium: 500;
--fontWeightSemibold: 600;
--fontWeightBold: 700;
--strokeWidthThin: 1px;
--strokeWidthThick: 2px;
--strokeWidthThicker: 3px;
--strokeWidthThickest: 4px;
--spacingHorizontalNone: 0;
--spacingHorizontalXS: 4px;
--spacingHorizontalS: 8px;
--spacingHorizontalM: 12px;
--spacingHorizontalL: 16px;
--spacingHorizontalXL: 20px;
--spacingHorizontalXXL: 24px;
--spacingHorizontalXXXL: 28px;
--spacingHorizontalXXXXL: 32px;
--spacingVerticalNone: 0;
--spacingVerticalXS: 4px;
--spacingVerticalS: 8px;
--spacingVerticalM: 12px;
--spacingVerticalL: 16px;
--spacingVerticalXL: 20px;
--spacingVerticalXXL: 24px;
--spacingVerticalXXXL: 28px;
--spacingVerticalXXXXL: 32px;
--durationUltraFast: 50ms;
--durationFaster: 100ms;
--durationFast: 150ms;
--durationNormal: 200ms;
--durationGentle: 250ms;
--durationSlow: 300ms;
--durationSlower: 400ms;
--durationUltraSlow: 500ms;
--curveAccelerateMax: cubic-bezier(0.9,0.1,1,0.2);
--curveAccelerateMid: cubic-bezier(1,0,1,1);
--curveAccelerateMin: cubic-bezier(0.8,0,0.78,1);
--curveDecelerateMax: cubic-bezier(0.1,0.9,0.2,1);
--curveDecelerateMid: cubic-bezier(0,0,0,1);
--curveDecelerateMin: cubic-bezier(0.33,0,0.1,1);
--curveEasyEaseMax: cubic-bezier(0.8,0,0.2,1);
--curveEasyEase: cubic-bezier(0.33,0,0.67,1);
--curveLinear: cubic-bezier(0,0,1,1);
--colorNeutralForeground1: #242424;
--colorNeutralForeground1Hover: #242424;
--colorNeutralForeground1Pressed: #242424;
--colorNeutralForeground1Selected: #242424;
--colorNeutralForeground2: #424242;
--colorNeutralForeground2Hover: #242424;
--colorNeutralForeground2Pressed: #242424;
--colorNeutralForeground2Selected: #242424;
--colorNeutralForeground2BrandHover: #0f6cbd;
--colorNeutralForeground2BrandPressed: #115ea3;
--colorNeutralForeground2BrandSelected: #0f6cbd;
--colorNeutralForeground3: #616161;
--colorNeutralForeground3Hover: #424242;
--colorNeutralForeground3Pressed: #424242;
--colorNeutralForeground3Selected: #424242;
--colorNeutralForeground3BrandHover: #0f6cbd;
--colorNeutralForeground3BrandPressed: #115ea3;
--colorNeutralForeground3BrandSelected: #0f6cbd;
--colorNeutralForeground4: #707070;
--colorNeutralForegroundDisabled: #bdbdbd;
--colorNeutralForegroundInvertedDisabled: rgba(255, 255, 255, 0.4);
--colorBrandForegroundLink: #115ea3;
--colorBrandForegroundLinkHover: #0f548c;
--colorBrandForegroundLinkPressed: #0c3b5e;
--colorBrandForegroundLinkSelected: #115ea3;
--colorNeutralForeground2Link: #424242;
--colorNeutralForeground2LinkHover: #242424;
--colorNeutralForeground2LinkPressed: #242424;
--colorNeutralForeground2LinkSelected: #242424;
--colorCompoundBrandForeground1: #0f6cbd;
--colorCompoundBrandForeground1Hover: #115ea3;
--colorCompoundBrandForeground1Pressed: #0f548c;
--colorBrandForeground1: #0f6cbd;
--colorBrandForeground2: #115ea3;
--colorBrandForeground2Hover: #0f548c;
--colorBrandForeground2Pressed: #0a2e4a;
--colorNeutralForeground1Static: #242424;
--colorNeutralForegroundStaticInverted: #ffffff;
--colorNeutralForegroundInverted: #ffffff;
--colorNeutralForegroundInvertedHover: #ffffff;
--colorNeutralForegroundInvertedPressed: #ffffff;
--colorNeutralForegroundInvertedSelected: #ffffff;
--colorNeutralForegroundInverted2: #ffffff;
--colorNeutralForegroundOnBrand: #ffffff;
--colorNeutralForegroundInvertedLink: #ffffff;
--colorNeutralForegroundInvertedLinkHover: #ffffff;
--colorNeutralForegroundInvertedLinkPressed: #ffffff;
--colorNeutralForegroundInvertedLinkSelected: #ffffff;
--colorBrandForegroundInverted: #479ef5;
--colorBrandForegroundInvertedHover: #62abf5;
--colorBrandForegroundInvertedPressed: #479ef5;
--colorBrandForegroundOnLight: #0f6cbd;
--colorBrandForegroundOnLightHover: #115ea3;
--colorBrandForegroundOnLightPressed: #0e4775;
--colorBrandForegroundOnLightSelected: #0f548c;
--colorNeutralBackground1: #ffffff;
--colorNeutralBackground1Hover: #f5f5f5;
--colorNeutralBackground1Pressed: #e0e0e0;
--colorNeutralBackground1Selected: #ebebeb;
--colorNeutralBackground2: #fafafa;
--colorNeutralBackground2Hover: #f0f0f0;
--colorNeutralBackground2Pressed: #dbdbdb;
--colorNeutralBackground2Selected: #e6e6e6;
--colorNeutralBackground3: #f5f5f5;
--colorNeutralBackground3Hover: #ebebeb;
--colorNeutralBackground3Pressed: #d6d6d6;
--colorNeutralBackground3Selected: #e0e0e0;
--colorNeutralBackground4: #f0f0f0;
--colorNeutralBackground4Hover: #fafafa;
--colorNeutralBackground4Pressed: #f5f5f5;
--colorNeutralBackground4Selected: #ffffff;
--colorNeutralBackground5: #ebebeb;
--colorNeutralBackground5Hover: #f5f5f5;
--colorNeutralBackground5Pressed: #f0f0f0;
--colorNeutralBackground5Selected: #fafafa;
--colorNeutralBackground6: #e6e6e6;
--colorNeutralBackgroundInverted: #292929;
--colorNeutralBackgroundStatic: #333333;
--colorNeutralBackgroundAlpha: rgba(255, 255, 255, 0.5);
--colorNeutralBackgroundAlpha2: rgba(255, 255, 255, 0.8);
--colorSubtleBackground: transparent;
--colorSubtleBackgroundHover: #f5f5f5;
--colorSubtleBackgroundPressed: #e0e0e0;
--colorSubtleBackgroundSelected: #ebebeb;
--colorSubtleBackgroundLightAlphaHover: rgba(255, 255, 255, 0.7);
--colorSubtleBackgroundLightAlphaPressed: rgba(255, 255, 255, 0.5);
--colorSubtleBackgroundLightAlphaSelected: transparent;
--colorSubtleBackgroundInverted: transparent;
--colorSubtleBackgroundInvertedHover: rgba(0, 0, 0, 0.1);
--colorSubtleBackgroundInvertedPressed: rgba(0, 0, 0, 0.3);
--colorSubtleBackgroundInvertedSelected: rgba(0, 0, 0, 0.2);
--colorTransparentBackground: transparent;
--colorTransparentBackgroundHover: transparent;
--colorTransparentBackgroundPressed: transparent;
--colorTransparentBackgroundSelected: transparent;
--colorNeutralBackgroundDisabled: #f0f0f0;
--colorNeutralBackgroundInvertedDisabled: rgba(255, 255, 255, 0.1);
--colorNeutralStencil1: #e6e6e6;
--colorNeutralStencil2: #fafafa;
--colorNeutralStencil1Alpha: rgba(0, 0, 0, 0.1);
--colorNeutralStencil2Alpha: rgba(0, 0, 0, 0.05);
--colorBackgroundOverlay: rgba(0, 0, 0, 0.4);
--colorScrollbarOverlay: rgba(0, 0, 0, 0.5);
--colorBrandBackground: #0f6cbd;
--colorBrandBackgroundHover: #115ea3;
--colorBrandBackgroundPressed: #0c3b5e;
--colorBrandBackgroundSelected: #0f548c;
--colorCompoundBrandBackground: #0f6cbd;
--colorCompoundBrandBackgroundHover: #115ea3;
--colorCompoundBrandBackgroundPressed: #0f548c;
--colorBrandBackgroundStatic: #0f6cbd;
--colorBrandBackground2: #ebf3fc;
--colorBrandBackground2Hover: #cfe4fa;
--colorBrandBackground2Pressed: #96c6fa;
--colorBrandBackground3Static: #0f548c;
--colorBrandBackground4Static: #0c3b5e;
--colorBrandBackgroundInverted: #ffffff;
--colorBrandBackgroundInvertedHover: #ebf3fc;
--colorBrandBackgroundInvertedPressed: #b4d6fa;
--colorBrandBackgroundInvertedSelected: #cfe4fa;
--colorNeutralCardBackground: #fafafa;
--colorNeutralCardBackgroundHover: #ffffff;
--colorNeutralCardBackgroundPressed: #f5f5f5;
--colorNeutralCardBackgroundSelected: #ebebeb;
--colorNeutralCardBackgroundDisabled: #f0f0f0;
--colorNeutralStrokeAccessible: #616161;
--colorNeutralStrokeAccessibleHover: #575757;
--colorNeutralStrokeAccessiblePressed: #4d4d4d;
--colorNeutralStrokeAccessibleSelected: #0f6cbd;
--colorNeutralStroke1: #d1d1d1;
--colorNeutralStroke1Hover: #c7c7c7;
--colorNeutralStroke1Pressed: #b3b3b3;
--colorNeutralStroke1Selected: #bdbdbd;
--colorNeutralStroke2: #e0e0e0;
--colorNeutralStroke3: #f0f0f0;
--colorNeutralStrokeSubtle: #e0e0e0;
--colorNeutralStrokeOnBrand: #ffffff;
--colorNeutralStrokeOnBrand2: #ffffff;
--colorNeutralStrokeOnBrand2Hover: #ffffff;
--colorNeutralStrokeOnBrand2Pressed: #ffffff;
--colorNeutralStrokeOnBrand2Selected: #ffffff;
--colorBrandStroke1: #0f6cbd;
--colorBrandStroke2: #b4d6fa;
--colorBrandStroke2Hover: #77b7f7;
--colorBrandStroke2Pressed: #0f6cbd;
--colorBrandStroke2Contrast: #b4d6fa;
--colorCompoundBrandStroke: #0f6cbd;
--colorCompoundBrandStrokeHover: #115ea3;
--colorCompoundBrandStrokePressed: #0f548c;
--colorNeutralStrokeDisabled: #e0e0e0;
--colorNeutralStrokeInvertedDisabled: rgba(255, 255, 255, 0.4);
--colorTransparentStroke: transparent;
--colorTransparentStrokeInteractive: transparent;
--colorTransparentStrokeDisabled: transparent;
--colorNeutralStrokeAlpha: rgba(0, 0, 0, 0.05);
--colorNeutralStrokeAlpha2: rgba(255, 255, 255, 0.2);
--colorStrokeFocus1: #ffffff;
--colorStrokeFocus2: #000000;
--colorNeutralShadowAmbient: rgba(0, 0, 0, 0.12);
--colorNeutralShadowKey: rgba(0, 0, 0, 0.14);
--colorNeutralShadowAmbientLighter: rgba(0, 0, 0, 0.06);
--colorNeutralShadowKeyLighter: rgba(0, 0, 0, 0.07);
--colorNeutralShadowAmbientDarker: rgba(0, 0, 0, 0.20);
--colorNeutralShadowKeyDarker: rgba(0, 0, 0, 0.24);
--colorBrandShadowAmbient: rgba(0, 0, 0, 0.30);
--colorBrandShadowKey: rgba(0, 0, 0, 0.25);
--colorPaletteRedBackground1: #fdf6f6;
--colorPaletteRedBackground2: #f1bbbc;
--colorPaletteRedBackground3: #d13438;
--colorPaletteRedForeground1: #bc2f32;
--colorPaletteRedForeground2: #751d1f;
--colorPaletteRedForeground3: #d13438;
--colorPaletteRedBorderActive: #d13438;
--colorPaletteRedBorder1: #f1bbbc;
--colorPaletteRedBorder2: #d13438;
--colorPaletteGreenBackground1: #f1faf1;
--colorPaletteGreenBackground2: #9fd89f;
--colorPaletteGreenBackground3: #107c10;
--colorPaletteGreenForeground1: #0e700e;
--colorPaletteGreenForeground2: #094509;
--colorPaletteGreenForeground3: #107c10;
--colorPaletteGreenBorderActive: #107c10;
--colorPaletteGreenBorder1: #9fd89f;
--colorPaletteGreenBorder2: #107c10;
--colorPaletteDarkOrangeBackground1: #fdf6f3;
--colorPaletteDarkOrangeBackground2: #f4bfab;
--colorPaletteDarkOrangeBackground3: #da3b01;
--colorPaletteDarkOrangeForeground1: #c43501;
--colorPaletteDarkOrangeForeground2: #7a2101;
--colorPaletteDarkOrangeForeground3: #da3b01;
--colorPaletteDarkOrangeBorderActive: #da3b01;
--colorPaletteDarkOrangeBorder1: #f4bfab;
--colorPaletteDarkOrangeBorder2: #da3b01;
--colorPaletteYellowBackground1: #fffef5;
--colorPaletteYellowBackground2: #fef7b2;
--colorPaletteYellowBackground3: #fde300;
--colorPaletteYellowForeground1: #817400;
--colorPaletteYellowForeground2: #817400;
--colorPaletteYellowForeground3: #fde300;
--colorPaletteYellowBorderActive: #fde300;
--colorPaletteYellowBorder1: #fef7b2;
--colorPaletteYellowBorder2: #fde300;
--colorPaletteBerryBackground1: #fdf5fc;
--colorPaletteBerryBackground2: #edbbe7;
--colorPaletteBerryBackground3: #c239b3;
--colorPaletteBerryForeground1: #af33a1;
--colorPaletteBerryForeground2: #6d2064;
--colorPaletteBerryForeground3: #c239b3;
--colorPaletteBerryBorderActive: #c239b3;
--colorPaletteBerryBorder1: #edbbe7;
--colorPaletteBerryBorder2: #c239b3;
--colorPaletteLightGreenBackground1: #f2fbf2;
--colorPaletteLightGreenBackground2: #a7e3a5;
--colorPaletteLightGreenBackground3: #13a10e;
--colorPaletteLightGreenForeground1: #11910d;
--colorPaletteLightGreenForeground2: #0b5a08;
--colorPaletteLightGreenForeground3: #13a10e;
--colorPaletteLightGreenBorderActive: #13a10e;
--colorPaletteLightGreenBorder1: #a7e3a5;
--colorPaletteLightGreenBorder2: #13a10e;
--colorPaletteMarigoldBackground1: #fefbf4;
--colorPaletteMarigoldBackground2: #f9e2ae;
--colorPaletteMarigoldBackground3: #eaa300;
--colorPaletteMarigoldForeground1: #d39300;
--colorPaletteMarigoldForeground2: #835b00;
--colorPaletteMarigoldForeground3: #eaa300;
--colorPaletteMarigoldBorderActive: #eaa300;
--colorPaletteMarigoldBorder1: #f9e2ae;
--colorPaletteMarigoldBorder2: #eaa300;
--colorPaletteRedForegroundInverted: #dc5e62;
--colorPaletteGreenForegroundInverted: #359b35;
--colorPaletteYellowForegroundInverted: #fef7b2;
--colorPaletteDarkRedBackground2: #d69ca5;
--colorPaletteDarkRedForeground2: #420610;
--colorPaletteDarkRedBorderActive: #750b1c;
--colorPaletteCranberryBackground2: #eeacb2;
--colorPaletteCranberryForeground2: #6e0811;
--colorPaletteCranberryBorderActive: #c50f1f;
--colorPalettePumpkinBackground2: #efc4ad;
--colorPalettePumpkinForeground2: #712d09;
--colorPalettePumpkinBorderActive: #ca5010;
--colorPalettePeachBackground2: #ffddb3;
--colorPalettePeachForeground2: #8f4e00;
--colorPalettePeachBorderActive: #ff8c00;
--colorPaletteGoldBackground2: #ecdfa5;
--colorPaletteGoldForeground2: #6c5700;
--colorPaletteGoldBorderActive: #c19c00;
--colorPaletteBrassBackground2: #e0cea2;
--colorPaletteBrassForeground2: #553e06;
--colorPaletteBrassBorderActive: #986f0b;
--colorPaletteBrownBackground2: #ddc3b0;
--colorPaletteBrownForeground2: #50301a;
--colorPaletteBrownBorderActive: #8e562e;
--colorPaletteForestBackground2: #bdd99b;
--colorPaletteForestForeground2: #294903;
--colorPaletteForestBorderActive: #498205;
--colorPaletteSeafoamBackground2: #a8f0cd;
--colorPaletteSeafoamForeground2: #00723b;
--colorPaletteSeafoamBorderActive: #00cc6a;
--colorPaletteDarkGreenBackground2: #9ad29a;
--colorPaletteDarkGreenForeground2: #063b06;
--colorPaletteDarkGreenBorderActive: #0b6a0b;
--colorPaletteLightTealBackground2: #a6e9ed;
--colorPaletteLightTealForeground2: #00666d;
--colorPaletteLightTealBorderActive: #00b7c3;
--colorPaletteTealBackground2: #9bd9db;
--colorPaletteTealForeground2: #02494c;
--colorPaletteTealBorderActive: #038387;
--colorPaletteSteelBackground2: #94c8d4;
--colorPaletteSteelForeground2: #00333f;
--colorPaletteSteelBorderActive: #005b70;
--colorPaletteBlueBackground2: #a9d3f2;
--colorPaletteBlueForeground2: #004377;
--colorPaletteBlueBorderActive: #0078d4;
--colorPaletteRoyalBlueBackground2: #9abfdc;
--colorPaletteRoyalBlueForeground2: #002c4e;
--colorPaletteRoyalBlueBorderActive: #004e8c;
--colorPaletteCornflowerBackground2: #c8d1fa;
--colorPaletteCornflowerForeground2: #2c3c85;
--colorPaletteCornflowerBorderActive: #4f6bed;
--colorPaletteNavyBackground2: #a3b2e8;
--colorPaletteNavyForeground2: #001665;
--colorPaletteNavyBorderActive: #0027b4;
--colorPaletteLavenderBackground2: #d2ccf8;
--colorPaletteLavenderForeground2: #3f3682;
--colorPaletteLavenderBorderActive: #7160e8;
--colorPalettePurpleBackground2: #c6b1de;
--colorPalettePurpleForeground2: #341a51;
--colorPalettePurpleBorderActive: #5c2e91;
--colorPaletteGrapeBackground2: #d9a7e0;
--colorPaletteGrapeForeground2: #4c0d55;
--colorPaletteGrapeBorderActive: #881798;
--colorPaletteLilacBackground2: #e6bfed;
--colorPaletteLilacForeground2: #63276d;
--colorPaletteLilacBorderActive: #b146c2;
--colorPalettePinkBackground2: #f7c0e3;
--colorPalettePinkForeground2: #80215d;
--colorPalettePinkBorderActive: #e43ba6;
--colorPaletteMagentaBackground2: #eca5d1;
--colorPaletteMagentaForeground2: #6b0043;
--colorPaletteMagentaBorderActive: #bf0077;
--colorPalettePlumBackground2: #d696c0;
--colorPalettePlumForeground2: #43002b;
--colorPalettePlumBorderActive: #77004d;
--colorPaletteBeigeBackground2: #d7d4d4;
--colorPaletteBeigeForeground2: #444241;
--colorPaletteBeigeBorderActive: #7a7574;
--colorPaletteMinkBackground2: #cecccb;
--colorPaletteMinkForeground2: #343231;
--colorPaletteMinkBorderActive: #5d5a58;
--colorPalettePlatinumBackground2: #cdd6d8;
--colorPalettePlatinumForeground2: #3b4447;
--colorPalettePlatinumBorderActive: #69797e;
--colorPaletteAnchorBackground2: #bcc3c7;
--colorPaletteAnchorForeground2: #202427;
--colorPaletteAnchorBorderActive: #394146;
--colorStatusSuccessBackground1: #f1faf1;
--colorStatusSuccessBackground2: #9fd89f;
--colorStatusSuccessBackground3: #107c10;
--colorStatusSuccessForeground1: #0e700e;
--colorStatusSuccessForeground2: #094509;
--colorStatusSuccessForeground3: #107c10;
--colorStatusSuccessForegroundInverted: #54b054;
--colorStatusSuccessBorderActive: #107c10;
--colorStatusSuccessBorder1: #9fd89f;
--colorStatusSuccessBorder2: #107c10;
--colorStatusWarningBackground1: #fff9f5;
--colorStatusWarningBackground2: #fdcfb4;
--colorStatusWarningBackground3: #f7630c;
--colorStatusWarningForeground1: #bc4b09;
--colorStatusWarningForeground2: #8a3707;
--colorStatusWarningForeground3: #bc4b09;
--colorStatusWarningForegroundInverted: #faa06b;
--colorStatusWarningBorderActive: #f7630c;
--colorStatusWarningBorder1: #fdcfb4;
--colorStatusWarningBorder2: #bc4b09;
--colorStatusDangerBackground1: #fdf3f4;
--colorStatusDangerBackground2: #eeacb2;
--colorStatusDangerBackground3: #c50f1f;
--colorStatusDangerForeground1: #b10e1c;
--colorStatusDangerForeground2: #6e0811;
--colorStatusDangerForeground3: #c50f1f;
--colorStatusDangerForegroundInverted: #dc626d;
--colorStatusDangerBorderActive: #c50f1f;
--colorStatusDangerBorder1: #eeacb2;
--colorStatusDangerBorder2: #c50f1f;
--colorStatusDangerBackground3Hover: #b10e1c;
--colorStatusDangerBackground3Pressed: #960b18;
--shadow2: 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14);
--shadow4: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
--shadow8: 0 0 2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14);
--shadow16: 0 0 2px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.14);
--shadow28: 0 0 8px rgba(0, 0, 0, 0.12), 0 14px 28px rgba(0, 0, 0, 0.14);
--shadow64: 0 0 8px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14);
--shadow2Brand: 0 0 2px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.25);
--shadow4Brand: 0 0 2px rgba(0, 0, 0, 0.30), 0 2px 4px rgba(0, 0, 0, 0.25);
--shadow8Brand: 0 0 2px rgba(0, 0, 0, 0.30), 0 4px 8px rgba(0, 0, 0, 0.25);
--shadow16Brand: 0 0 2px rgba(0, 0, 0, 0.30), 0 8px 16px rgba(0, 0, 0, 0.25);
--shadow28Brand: 0 0 8px rgba(0, 0, 0, 0.30), 0 14px 28px rgba(0, 0, 0, 0.25);
--shadow64Brand: 0 0 8px rgba(0, 0, 0, 0.30), 0 32px 64px rgba(0, 0, 0, 0.25);
</code></pre>

## About Reboot CSS

Reboot is a collection of element-specific CSS changes in a single file to help kickstart building a site
with the **FluentUI Blazor library**. It provides an elegant, consistent, and simple baseline to build upon
(inspired by [Bootstrap's Reboot](https://getbootstrap.com/docs/5.0/content/reboot/) which again is based
on [Normalize.css](https://necolas.github.io/normalize.css))

If you want to use **Reboot**, like this demo site, you'll need to include it in your `App.razor`
or `index.html` file like this:

```html
<link href="_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css" rel="stylesheet" />
```

If you are creating a site by using our [Templates package](https://www.fluentui-blazor.net/Templates),
this is already set up for you. You can [download the file](https://www.fluentui-blazor.net/_content/Microsoft.FluentUI.AspNetCore.Components/css/reboot.css)
to see what's inside.

PS: It is entirely possible to build a site **without using Reboot** but you will have to do more styling yourself.
