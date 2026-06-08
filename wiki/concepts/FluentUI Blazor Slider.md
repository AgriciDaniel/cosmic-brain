---
address: c-000141
status: developing
title: "FluentUI Blazor Slider"
tags:
  - fluentui-blazor
  - components
  - slider
  - range
  - input
---

# FluentUI Blazor Slider

The `FluentSlider` component allows users to select a value from within a given range by moving a thumb along a track. Supports all numeric types: `byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `decimal`.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Best Practices

- Don't use a slider for binary settings (use Switch instead).
- Don't use a continuous slider if the range of values is large.
- Don't use for a range with fewer than three values.
- Use step points if you don't want arbitrary values between min and max.

---

## Default

Default settings: `Min="0"`, `Max="100"`, `Step="1"`. The `Label` parameter displays text next to the slider.

```razor
<FluentSlider @bind-Value="@value" Label="@($"Value: {value}")" />

@code {
    int value = 50;
}
```

---

## Min, Max, and Step

Configure the range and precision with `Min`, `Max`, and `Step`.

```razor
<FluentSlider Min="10"
              Max="40"
              @bind-Value="@Celsius"
              Step="2.5"
              Style="width: 300px"
              Label="@($"C°: {Celsius:0.0} - F°: {Fahrenheit:0.0}")" />

@code {
    double Celsius = 20;
    double Fahrenheit = 68;

    void ValueChangedHandler() => Fahrenheit = Celsius * 9 / 5 + 32;
}
```

---

## Orientation

Sliders can be horizontal (default) or vertical. Minimum height for vertical is `120px`.

```razor
<FluentSlider Orientation="Orientation.Vertical"
              Style="height: 150px;"
              @bind-Value="value" />
@code {
    int value = 25;
}
```

---

## Size

Two sizes: `Small` and `Medium` (default).

```razor
<FluentSlider Value="10" Size="SliderSize.Small" Label="Small size" />
<FluentSlider Value="10" Size="SliderSize.Medium" Label="Medium size (default)" />
```

---

## ReadOnly and Disabled

> [!NOTE] `FluentSlider` does **not** support `ReadOnly` (per the HTML spec, only text inputs can be read-only). Use `Disabled` instead.

```razor
<FluentSlider Value="10" Disabled="true" Label="Disabled slider" />
```

---

## Custom Thumb

Replace the default thumb with any HTML element (e.g., an icon) using `Slot="@FluentSlot.Thumb"`.

```razor
<FluentSlider Value="10">
    <FluentIcon Slot="@FluentSlot.Thumb"
                Value="@(new Icons.Filled.Size20.TriangleDown())"
                Color="Color.Success" />
</FluentSlider>
```

---

## API Reference

- **`API Type=FluentSlider<int>`**

Key parameters: `Min` (`TValue`), `Max` (`TValue`), `Step` (`TValue`), `Orientation` (`Orientation`), `Size` (`SliderSize`), `Disabled` (`bool`), `Label` (`string`), generic `TValue` (all numeric types).
