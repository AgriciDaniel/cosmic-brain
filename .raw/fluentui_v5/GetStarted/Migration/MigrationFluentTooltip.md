---
title: Migration FluentTooltip
route: /Migration/Tooltip
hidden: true
---

### Removed properties💥
  The `Visible` property has been removed. The tooltip is now visible when the user hovers over the target element.
  The `OnToggle` event is triggered when the tooltip is shown or hidden.

### Position 💥
  The `Position` property has been updated to use the `Positioning` property name and the `Positioning` enum
  instead of `TooltipPosition` enum.

    `Positioning` enum has the following values:
    - `AboveEnd`
    - `AboveStart`
    - `Above`
    - `BelowStart`
    - `Below`
    - `BelowEnd`
    - `BeforeTop`
    - `Before`
    - `BeforeBottom`
    - `AfterTop`
    - `After`
    - `AfterBottom`
    - `CenterCenter`

### TooltipGlobalOptions

The `TooltipGlobalOptions` class has been removed. The `Tooltip` component now uses the default options.

### Migrating to v5

You can use the `ToPositioning()` method to convert the `Position` property to the `Positioning` enum.
```csharp	
@using Microsoft.FluentUI.AspNetCore.Components.Migration

<FluentTooltip Positioning="TooltipPosition.Top.ToPositioning()">My content</FluentTooltip>
//                                              ^^^^^^^^^^^^^^^^
```


|v3 & v4|v5|
|-----|-----|
|`TooltipPosition.Top`    |`Positioning.Above`|
|`TooltipPosition.Bottom` |`Positioning.Below`|
|`TooltipPosition.Left`   |`Positioning.Before`|
|`TooltipPosition.Right`  |`Positioning.After`|
|`TooltipPosition.Start`  |`Positioning.AboveStart`|
|`TooltipPosition.End`    |`Positioning.AboveEnd`|

### New properties
- `SpacingHorizontal` (`string?`) — horizontal spacing between the tooltip and the anchor.
- `SpacingVertical` (`string?`) — vertical spacing between the tooltip and the anchor.

