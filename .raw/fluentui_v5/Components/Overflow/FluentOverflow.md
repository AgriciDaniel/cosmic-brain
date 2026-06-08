---
title: Overflow
route: /Overflow
icon: StackAdd
---

# Overflow

The `FluentOverflow` component is used to manage and display a collection of items that may exceed the available space. It automatically handles the overflow by providing a way to access hidden items.

## Simple Usage

{{ OverflowDefault }}

## Overflow with ellipsis
In the following example, the first element will always be displayed (fixed), but an ellipse (...)
will be added when the container size is too small.

> [!Note] the element must be able to display this ellipse, which is the case for text (like below) but not for the FluentBadge.

{{ OverflowEllipsis }}

## Overflow not visible on load
With below example the `VisibleOnLoad` parameter is set to false.Make sure the screen dimension is small enough to show an overflow badge with count.
Then refresh the page to see the difference between this example and the one above

{{ OverflowVisibleOnLoad }}

## Horizontal Overflow example

{{ OverflowHorizontalExample }}

## API FluentOverflow   

{{ API Type=FluentOverflow }}

{{ API Type=FluentOverflowItem }}

