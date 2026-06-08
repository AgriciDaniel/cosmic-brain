---
title: Migration FluentSplitter
route: /Migration/Splitter
hidden: true
---

- ### FluentSplitter removed 💥

  The `FluentSplitter` component has been **removed** in V5. Only `FluentMultiSplitter` remains.
  Migrate from `FluentSplitter` to `FluentMultiSplitter` with two `FluentMultiSplitterPane` children.

  ```xml
  <!-- V4 -->
  <FluentSplitter Orientation="Orientation.Horizontal"
                  Panel1Size="200px" Panel2Size="1fr"
                  Panel1MinSize="100px" BarSize="8" BarHandle="true"
                  OnResized="@HandleResize">
      <Panel1>Left panel</Panel1>
      <Panel2>Right panel</Panel2>
  </FluentSplitter>

  <!-- V5 -->
  <FluentMultiSplitter Orientation="Orientation.Horizontal"
                       BarSize="8px"
                       OnResize="@HandleResize">
      <FluentMultiSplitterPane Size="200px" Min="100px">
          Left panel
      </FluentMultiSplitterPane>
      <FluentMultiSplitterPane>
          Right panel
      </FluentMultiSplitterPane>
  </FluentMultiSplitter>
  ```

- ### FluentMultiSplitter changes

  #### Changed methods
  - `Refresh()` → `RefreshAsync()` (now returns `Task`).
  - `AddPane` / `RemovePane` — changed from `public` to `internal`.

- ### Removed concepts

  - `Collapsed` / `OnCollapsed` / `OnExpanded` — these properties from `FluentSplitter` have no direct equivalent.
    Use `FluentMultiSplitterPane.Collapsible` and `FluentMultiSplitter.OnCollapse` / `OnExpand` instead.
