---
title: Migration FluentSpacer
route: /Migration/Spacer
hidden: true
---

### General
The main difference is that the component allows more flexible properties. You can let the spacer grow horizontally and vertically,
including fixed width and heights.

### Changed properties
- `Width` is now a string and can accept any value, including `px`, `%`, `em`, etc. If no width is set, the spacer behaviour will default to `flex-grow: 1`.


### Keep old behavior
If trying to keep old behavior, simply add the `px` suffix to the previous integer value and change it to a string.

### New properties
- `Height` (`string?`) — fixed height for vertical spacing.
- `Orientation` (`Orientation`) — controls whether the spacer grows horizontally or vertically.
