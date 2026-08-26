---
title: Migration FluentAnchor
route: /Migration/Anchor
hidden: true
---

- ### Component removed 💥

  `FluentAnchor` has been **removed** in V5.
  Use `FluentLink` as the replacement for hyperlinks,
  or `FluentAnchorButton` for button-styled anchors.

- ### V4 FluentAnchor parameters

  | V4 Parameter | V5 Replacement (`FluentLink`) |
  |-------------|-------------------------------|
  | `Href` | `Href` |
  | `Hreflang` | `HrefLang` |
  | `Referrerpolicy` | `ReferrerPolicy` (`LinkReferrerPolicy` enum) |
  | `Rel` | `Rel` (`LinkRel` enum) |
  | `Target` | `Target` (`LinkTarget` enum) |
  | `Type` | `LinkType` |
  | `Appearance` (`Appearance?`) | `Appearance` (`LinkAppearance`) |
  | `IconStart` | `IconStart` |
  | `IconEnd` | `IconEnd` |
  | `OnClick` | `OnClick` |
  | `ChildContent` | `ChildContent` |
  | `Download` | — *(removed)* |
  | `Ping` | — *(removed)* |

- ### Appearance mapping

  | V4 `Appearance` | V5 `LinkAppearance` |
  |-----------------|---------------------|
  | `Appearance.Neutral` | `LinkAppearance.Default` |
  | `Appearance.Accent` | `LinkAppearance.Default` |
  | `Appearance.Hypertext` | `LinkAppearance.Default` |
  | `Appearance.Lightweight` | `LinkAppearance.Subtle` |

- ### Migration example

  ```xml
  <!-- V4 -->
  <FluentAnchor Href="https://example.com" Appearance="Appearance.Hypertext"
                Target="_blank" IconStart="@(new Icons.Regular.Size16.Open())">
      Visit site
  </FluentAnchor>

  <!-- V5 -->
  <FluentLink Href="https://example.com" Appearance="LinkAppearance.Default"
              Target="LinkTarget.Blank" IconStart="@(new Icons.Regular.Size16.Open())">
      Visit site
  </FluentLink>
  ```

- ### FluentAnchorButton — button-styled anchor (new in V5)

  If you used `FluentAnchor` with `Appearance.Accent` or `Appearance.Neutral` to create
  button-styled links, use `FluentAnchorButton` instead of `FluentLink`:

  ```xml
  <!-- V4: Button-styled anchor -->
  <FluentAnchor Href="/dashboard" Appearance="Appearance.Accent">
      Go to Dashboard
  </FluentAnchor>

  <!-- V5: FluentAnchorButton -->
  <FluentAnchorButton Href="/dashboard" Appearance="ButtonAppearance.Primary">
      Go to Dashboard
  </FluentAnchorButton>
  ```

  `FluentAnchorButton` supports: `Href`, `Target` (`LinkTarget`), `Shape` (`ButtonShape`),
  `Size` (`ButtonSize`), `Appearance` (`ButtonAppearance`), `IconStart`, `IconEnd`,
  `BackgroundColor`, `Color`, `Label`, `Tooltip`.

- ### FluentLink new properties

  - `Inline` (`bool`) — renders the link as inline element.
  - `Tooltip` (`string?`)
