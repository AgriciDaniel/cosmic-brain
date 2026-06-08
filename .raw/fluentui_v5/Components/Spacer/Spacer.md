---
title: Spacer
route: /Spacer
icon: Spacebar
---

# Spacer
The purpose of this component is to generate space between other components. You can either create
a space with a set width or height or create a space with a flexible width or height. This component works with flex containers.

## Default
By default, the spacer will set a flex growth of '1' to fill any space, horizontally or vertically, depending on the container flex direction.
{{ SpacerDefault }}

## Vertical
{{ SpacerVertical }}

## Horizontal with width parameter
In order for the width parameter to work, the orientation needs to be set to `Orientation.Horizontal`, which is the default, otherwise the width will be ignored.
{{ SpacerHorizontalPixels }}

## Vertical with height parameter
If setting the height parameter, keep in mind that you need to set the `Orientation` parameter to `Orientation.Vertical`, because the component needs to know which dimension to set.
{{ SpacerVerticalPixels }}

## Migrating to v5
{{ INCLUDE File=MigrationFluentSpacer }}

##  API FluentSpacer

{{ API Type=FluentSpacer }}
