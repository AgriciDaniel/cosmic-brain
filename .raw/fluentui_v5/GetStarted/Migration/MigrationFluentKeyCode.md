---
title: Migration FluentKeyCode
route: /Migration/KeyCode
hidden: true
---

- ### Component still present

  `FluentKeyCode` and `FluentKeyCodeProvider` are still available in V5.
  No changes are required in your usage of `FluentKeyCode`.

- ### FluentKeyCode — PreventMultipleKeyDown

  The only user-facing change: `PreventMultipleKeyDown` was a **static field** in V4.
  It is now an **instance parameter** in V5.

  ```csharp
  // V4: Static field — set once globally
  FluentKeyCode.PreventMultipleKeyDown = true;

  // V5: Instance parameter — set per component
  <FluentKeyCode PreventMultipleKeyDown="true"
                 Anchor="myInput"
                 OnKeyDown="@HandleKeyDown" />
  ```

- ### FluentKeyCodeProvider changes

  If you implemented `IKeyCodeListener`, the handler methods are now async:

  | V4 | V5 |
  |----|----|
  | `OnKeyDownAsync(args)` called synchronously | `await OnKeyDownAsync(args)` called asynchronously |
  | `OnKeyUpAsync(args)` called synchronously | `await OnKeyUpAsync(args)` called asynchronously |
