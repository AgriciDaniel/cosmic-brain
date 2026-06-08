---
title: Migration FluentStack
route: /Migration/Stack
hidden: true
---

### Updated properties
  `HorizontalGap` and `VerticalGap` has been update to a `string?` type.
  In v4, the type was `int?` (in pixels).
  This allows the use of other units proposed by the CSS standard.
  If this value is an integer, the unit `px` is automatically added.

  This should not lead to any breaking changes.

### Changed default values
  In v4, a default gap of `10px` was always applied to both `HorizontalGap` and `VerticalGap`.
  This is no longer the case in v5. You can restore this behavior by explicitly setting these properties to `10px`, or by setting them via the new defaults mechanism.

  ```cs
  builder.Services.AddFluentUIComponents(config =>
  {
      config.DefaultValues.For<FluentStack>().Set(p => p.HorizontalGap, "10px");
      config.DefaultValues.For<FluentStack>().Set(p => p.VerticalGap, "10px");
  });
  ```

### New properties
- `Height` (`string?`) — fixed height for the stack container.
