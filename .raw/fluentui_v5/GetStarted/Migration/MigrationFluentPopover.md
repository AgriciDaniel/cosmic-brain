---
title: Migration FluentPopover
route: /Migration/Popover
hidden: true
---

- ### Complete rewrite 💥

  The popover has been completely rewritten. V4 used a composition of `FluentAnchoredRegion` + `FluentOverlay` + `FluentKeyCode`.
  V5 uses a native `<fluent-popover-b>` web component.

- ### Renamed properties

  | V4 Property | V5 Property |
  |-------------|-------------|
  | `Open` | `Opened` |
  | `OpenChanged` | `OpenedChanged` |

  ```xml
  <!-- V4 -->
  <FluentPopover @bind-Open="isOpen" AnchorId="myButton">

  <!-- V5 -->
  <FluentPopover @bind-Opened="isOpen" AnchorId="myButton">
  ```

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `AnchorId` (`string`, default `""`) | `AnchorId` (`required string`) | Now **required** |

- ### Removed properties 💥

  All custom positioning and focus management has been removed — now handled by the web component:

  - `HorizontalPosition` (`HorizontalPosition?`)
  - `HorizontalInset` (`bool`)
  - `VerticalPosition` (`VerticalPosition?`)
  - `VerticalThreshold` (`int`)
  - `HorizontalThreshold` (`int`)
  - `FixedPlacement` (`bool?`)
  - `AutoFocus` (`bool`)
  - `CloseKeys` (`KeyCode[]?`)

- ### Content structure changed 💥

  V4 had separate `Header`, `Body`, and `Footer` render fragments.
  V5 uses a single `ChildContent` render fragment.

  ```xml
  <!-- V4 -->
  <FluentPopover AnchorId="btn" @bind-Open="open">
      <Header>Title</Header>
      <Body>Content here</Body>
      <Footer>Actions</Footer>
  </FluentPopover>

  <!-- V5 -->
  <FluentPopover AnchorId="btn" @bind-Opened="open">
      <h3>Title</h3>
      <p>Content here</p>
      <div>Actions</div>
  </FluentPopover>
  ```
