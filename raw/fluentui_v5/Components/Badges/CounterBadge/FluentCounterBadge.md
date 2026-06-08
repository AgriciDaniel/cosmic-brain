---
title: CounterBadge
route: /Badges/CounterBadge
---

# CounterBadge
A counter badge is a badge that displays a numerical count.

## Best practices
The principles mentioned on the [overview](/Badges) page apply to a `CounterBadge` as well.

### Numbers on Badge
CounterBadges are intended to have short, small numerical values or status information.
An `OverflowCount` can be set as the maximum number that is shown in the CounterBadge.
It will add a `+` sign to the end of the number to indicate that the number is larger than the `OverflowCount`.

### Content
The CounterBadge can only show a count (through the `Count` parameter). If you need to add textual content, you can use the `Badge` component.

## Default
- First example shows an empty counter badge. 
- Second example shows a counter badge with a count.
- Third example shows an overflow (`Count` is higher than the `OverflowCount` (default is 99))

{{ CounterBadgeDefault }}

## Attached to content
A counter badge can be attached to any content. The default position is above-end. The position can be changed using the `Positioning` parameter.
The `OffestX` and `OffsetY` allow for tuning the positioning further.

{{ CounterBadgeAttached SourceCode=false}}

## ShowEmpty
A counter badge will by default be shown as an empty badge if the count value is 0 or not set (null) or when `ShowWhen` evaluates to `true`. This behavior can be changed by setting the `ShowEmpty` parameter to `false`.

- First example `ShowEmpty="true"`. 
- Second example `ShowEmpty="false"` (see code tab).

{{ CounterBadgeShowEmpty }}

_When `ShowEmpty` is set to `false` and the `Count` is greater than 0 or `ShowWhen` evaluates to true, the `CounterBadge` will be shown as normal_

## ShowZero
A counter badge can be shown even if the count is zero.

- First example `ShowZero="true"`. 
- Second example `ShowZero="false"`.

{{ CounterBadgeShowZero }}

_Because of the default behavior, an empty badge is shown for the second example._

## ShowWhen
A counter badge can be shown when a specific condition (lambda expression) is met.
For instance, `ShowWhen=@(c => c > 4)` will show the badge only when the count is greater than 4.

- First example `Count="5"`. With rule set like above it will show a count in the badge.
- Second example `Count="3"`. With rule set like above it will not show a count in the badge.

{{ CounterBadgeShowWhen }}

_Because of the default behavior, an empty badge is shown for the first example._

## Dot
A counter badge can be shown as a dot. This can be used, for example, to indicate there are new items but the actual number is not really important.
Setting this parameter to `true` will overrule `ShowEmpty="false"`

{{ CounterBadgeDot }}

## Colors

The counter badge colors be set to a value from the `BadgeColor` enumeration. The last badge shows how a custom background color can be used.

{{ CounterBadgeColors }}

## Icons
An `Icon` can be shown in the start or end slot (or both). The color of the icon is coupled to the color of the text in the badge.

{{ CounterBadgeIcons }}

## Appearance
The counter badge appearance can be set to a value from the `BadgeAppearance` enumeration.
**CounterBadge does not support Ghost and Tint appearances**.

{{ CounterBadgeAppearances }}

## Shape
The counter shape can be set to a value from the `BadgeShape` enumeration.
**CounterBadge does not support the Square shape**.

{{ CounterBadgeShapes }}

## Size
The counter badge size be set to a value from  the `BadgeSize` enumeration.

{{ CounterBadgeSizes }}

## API FluentCounterBadge

{{ API Type=FluentCounterBadge }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentCounterBadge }}
