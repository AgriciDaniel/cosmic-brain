---
title: Migration FluentSlider
route: /Migration/Slider
hidden: true
---

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Orientation` (`Orientation?`) | `Orientation` (`Orientation`, default `Horizontal`) | No longer nullable |

- ### Removed properties 💥

  - `Mode` (`SliderMode?`) — the slider mode enum is no longer supported.
  - `FluentSliderLabel<TValue>` — the companion label component has been removed.
    Use standard HTML labels or `FluentField` instead.

- ### Type constraint change

  V4: `FluentSlider<TValue>` where `TValue : INumber<TValue>`.
  V5: `FluentSlider<TValue>` where `TValue : struct, IComparable<TValue>`.

- ### New properties

  - `Size` (`SliderSize?`) — controls the slider size.
  - `Tooltip` (`string?`)
  - `ImmediateDelay` (`ushort`) — delay in milliseconds before the value is updated during drag.
