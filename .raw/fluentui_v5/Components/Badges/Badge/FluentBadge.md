---
title: Badge
route: /Badges/Badge
---

# Badge
A badge displays a short text label.

## Best practices
The principles mentioned on the [overview](/Badges) page apply to a `Badge` as well.

## Default
First example shows an empty badge. Second example shows a badge with content.

{{ BadgeDefault }}

## Attached to content
A badge can be attached to any content. The default position is above-end. The position can be changed using the `Positioning` parameter.

The `OffsetX` and `OffsetY` allow for tuning the positioning further.

{{ BadgeAttached SourceCode=false }}

## Colors
The badge colors be set to a value from the `BadgeColor` enumeration. The last badge shows how a custom background color can be used.

{{ BadgeColors }}

## Icons
An `Icon` can be shown in the start or end slot (or both). The color of the icon is coupled to the color of the text in the badge.

{{ BadgeIcons }}

## Appearance
The badge appearance can be set to a value from the `BadgeAppearance` enumeration.

{{ BadgeAppearances }}

## Shape
The badge badge shape can be set to a value from the `BadgeShape` enumeration.

{{ BadgeShapes }}

## Size
The badge size be set to a value from  the `BadgeSize` enumeration.

{{ BadgeSizes }}

## CSS Classes

Use the `.fluent-badge` CSS class on any HTML `div` or `span` element to quickly represent a badge with the default badge styles, without using the `FluentBadge` component.

> **Note:** The `.fluent-badge` CSS class is intended for standalone elements only. It cannot be used to wrap other components or elements to produce an *attached badge* effect — use the `FluentBadge` component with the `Positioning` parameter for that purpose.

{{ BadgeCss }}

## API FluentBadge

{{ API Type=FluentBadge }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentBadge }}
