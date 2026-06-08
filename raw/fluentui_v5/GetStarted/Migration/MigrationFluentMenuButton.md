---
title: Migration FluentMenuButton
route: /Migration/MenuButton
hidden: true
---

- ### Component redesigned — breaking changes ⚠️

  `FluentMenuButton` still exists in V5 but has been **completely redesigned**.
  It now extends `FluentButton` instead of `FluentComponentBase` and is used inside a `FluentMenu` context.

- ### V4 → V5 parameter mapping

  | V4 Parameter | V5 | Change |
  |-------------|-----|--------|
  | `Button` (`FluentButton?`) | — | **Removed** — `FluentMenuButton` *is* a `FluentButton` now |
  | `ButtonAppearance` (`Appearance`) | `Appearance` (inherited from `FluentButton`) | Renamed, inherited |
  | `ButtonContent` (`RenderFragment?`) | `ChildContent` (inherited from `FluentButton`) | Use `FluentButton`'s `ChildContent` |
  | `Menu` (`FluentMenu?`) | `Menu` (`[CascadingParameter] FluentMenu?`) | Now a cascading parameter — set automatically |
  | `UseMenuService` (`bool`, default `true`) | — | **Removed** |
  | `Text` (`string?`) | `Label` (inherited from `FluentButton`) | Renamed |
  | `IconStart` (`Icon?`) | `IconStart` (inherited from `FluentButton`) | Same, inherited |
  | `ButtonStyle` (`string?`) | `Style` (inherited from `FluentComponentBase`) | Use base `Style` |
  | `MenuStyle` (`string?`) | — | **Removed** — style the `FluentMenu` separately |
  | `Items` (`Dictionary<string, string>`) | — | **Removed** — use `FluentMenuItem` children |
  | `ChildContent` (`RenderFragment?`) | — | **Removed** — the button itself is the child of `FluentMenu` |
  | `OnMenuChanged` (`EventCallback<MenuChangeEventArgs>`) | — | **Removed** — use `FluentMenuItem.OnClick` per item |

- ### Architecture change

  V4: `FluentMenuButton` was a self-contained component that managed both the button and menu internally.

  V5: `FluentMenuButton` is just a button variant (extends `FluentButton`) that receives a
  cascading `FluentMenu` reference. You compose the button inside a `FluentMenu`.

- ### Migration example

  ```xml
  <!-- V4: Self-contained -->
  <FluentMenuButton Text="Options"
                    ButtonAppearance="Appearance.Accent"
                    IconStart="@(new Icons.Regular.Size16.ChevronDown())"
                    OnMenuChanged="@HandleMenuChange">
      <FluentMenuItem>Action 1</FluentMenuItem>
      <FluentMenuItem>Action 2</FluentMenuItem>
  </FluentMenuButton>

  <!-- V5: Composed with FluentMenu -->
  <FluentMenu>
      <FluentMenuButton Appearance="ButtonAppearance.Primary"
                        IconStart="@(new Icons.Regular.Size16.ChevronDown())"
                        Label="Options" />
      <FluentMenuItem OnClick="@Action1">Action 1</FluentMenuItem>
      <FluentMenuItem OnClick="@Action2">Action 2</FluentMenuItem>
  </FluentMenu>
  ```
