---
title: Checkbox
route: /Checkbox
icon: CheckboxChecked
---

# Checkbox

A **FluentCheckbox** component enables a user to select or deselect an option.
It's typically used to capture a boolean value.

{{ CheckboxDefault }}

## Appearance

The apparent style of a checkbox can be changed by setting the `Shape` property, but also by setting the `Size` property (see below).

You can also add a label to the checkbox by setting the `Label` property.
The label will be automatically positioned next to the checkbox.

We recommend using a spacing of 24px between checkboxes and other components.

{{ CheckboxAppearances }}

## Size
Checkboxes can be shown either in `Medium` or `Large` size

{{ CheckboxSizeExample }}


## Indeterminate

To define the indeterminate state, you need to use the CheckState bindable property,
which has three possible values: null, true and false.

For the majority of uses, a checkbox with two values (checked/unchecked) is probably sufficient.
In this case, the value bindable property is used.
Value has only two possible values: true and false.

A ShowIndeterminate=‘true’ attribute allows you to indicate that the user cannot display this "Indeterminate"
state himself. This allows you to place the box in the indeterminate state when the page is first displayed, but
without being able to return to it afterwards (except by code).

{{ CheckboxIndeterminate }}

## Three-State Checkbox

The `FluentCheckbox` component supports a three-state mode, which allows the checkbox to have an additional indeterminate state. This can be useful for scenarios where a checkbox represents a mixed or partial selection.

To enable the three-state mode, set the `ThreeState` property to `true`. You can also control the order of the states using the `ThreeStateOrderUncheckToIntermediate` property.

- `ThreeState`: Enables the three-state mode.
- `ThreeStateOrderUncheckToIntermediate`: Controls the order of the states. If set to `true`, the order will be Unchecked -> Intermediate -> Checked. If set to `false` (default), the order will be Unchecked -> Checked -> Intermediate.

{{ CheckboxThreeStates }}

## API FluentCheckbox

{{ API Type=FluentCheckbox }}
