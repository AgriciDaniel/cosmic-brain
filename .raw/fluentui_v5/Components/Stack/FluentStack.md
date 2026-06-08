---
title: Stack
route: /Stack
icon: Stack
---

# Stack

A `FluentStack` is a container-type component that can be used to arrange its
child components in a **horizontal** or **vertical** stack.

## Characteristics

The following three parameters define the overall layout of this component and the child components it encloses:

1. **Orientation**: Refers to whether the stacking of child components
   is **horizontal** (default) or **vertical**.

2. **Alignment**: Refers to how the child components are aligned inside
   the container. This is controlled via the **HorizontalAlignment** and
   **VerticalAlignment** parameters.

3. **Spacing**: Refers to the space that exists between child components
   inside the Stack. This is controlled via the **HorizontalGap**
   and **VerticalGap** parameters.

## Wrapping

Aside from the previously mentioned parameters, there is another parameter
called `Wrap` that determines if items overflow the `FluentStack` container
or wrap around it. The wrap property only works in the direction
of the `FluentStack`, which means that the children components
can still overflow in the perpendicular direction
(i.e. in a **vertical** FluentStack, items might overflow horizontally
and vice versa).

## Nesting

Stacks can be nested inside one another in order to be able to configure the layout of the application as desired.

## Examples

This `FluentStack` is using all the default settings for its parameters.
To make it clear what the default size is, it is rendered with a border here.

{{ StackDefault }}

## Using the FluentStack component

This example shows two `FluentStack`.
- The first `FluentStack` has its `Orientation` parameter set
  to `Orientation.Vertical`. Its height has been set to `200 pixels`
  and the `VerticalGap` has been set to `20 pixels`.
- The second, nested, `FluentStack` has its `Orientation` parameter
  set to `Orientation.Horizontal`. The `HorizontalGap` has been set
  to `4 pixels`. Its first element contains a forced break.
  No height has been set, so the container height adjusts to the height
  of the highest element.

The alignment of the contents of both `FluentStack` can be changed
by selecting one the different options from each of the lists
(which themselves are placed and positioned using a FluentStack as well).

{{ StackCustomized }}

## API FluentStack

{{ API Type=FluentStack }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentStack }}
