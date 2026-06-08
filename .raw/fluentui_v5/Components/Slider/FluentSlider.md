---
title: Slider
route: /Slider
icon: Options
---

# Slider

The **FluentSlider** component is an input where the user selects a value from within a given range. Sliders typically have a slider thumb that can be moved along a bar, rail, or track to change the value of the slider.

**Default** settings are `Min="0"`, `Max="100"` and `Step="1"`.

**Value** can be one of the following **Numeric Type**:
`byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `decimal`.

## Best practices

### Layout

- Don't use a slider for binary settings.
- Don't use a continuous slider if the range of values is large.
- Don't use for a range with fewer than three values.

### Content

- Use step points if you don't want the slider to allow arbitrary values between minimum and maximum.

View the [Usage Guidance](https://fluent2.microsoft.design/components/web/react/slider/usage).

## Default

By default, the slider is a horizontal slider with a range of `0` to `100` and a step of `1`.

{{ SliderDefault }}

## Min, Max and Step

You can define the `Step` value of a slider so that the value will always be a mutiple of that step.

{{ SliderMinMaxStep }}

## ReadOnly and Disabled

The slider can be set to `ReadOnly` or `Disabled` mode.

{{ SliderReadOnlyDisabled }}

> The **FluentSlider** component does not support the `ReadOnly` attribute.
> This is in line with the HTML standard that prescribes only inputs that accept
> text entry may be read-only. See the [HTML spec](https://html.spec.whatwg.org/multipage/input.html#the-readonly-attribute)
> and the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) for more information.
>
> The `Disabled` attribute is used to prevent user interaction with the slider.

## Orientation

The minimum height of the slider is `120px` (defined by the web underlying component).

{{ SliderOrientation }}

## Size

A slider comes in both medium and small size. Medium is the default.

{{ SliderSizes }}

## Thumbs

The slider's thumb can be customized with any HTML element (e.g. an icon).
Simply add your element as a child of the **FluentSlider** component with the
`Slot="@FluentSlot.Thumb"` attribute.

If you add content that is **not part** of `Slot="@FluentSlot.Thumb"`, it will be ignored.

{{ SliderThumbs }}

## Know restrictions

The `FluentSliderLabel` component (used to display the value of the slider steps)
from version 4 is no longer supported.

> These features are under investigation.

##  API FluentSlider

{{ API Type=FluentSlider<int> }}
