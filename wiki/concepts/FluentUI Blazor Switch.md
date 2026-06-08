---
address: c-000144
status: developing
title: "FluentUI Blazor Switch"
tags:
  - fluentui-blazor
  - components
  - switch
  - toggle
  - input
---

# FluentUI Blazor Switch

The `FluentSwitch` component represents a physical switch that allows someone to choose between two mutually exclusive options (e.g., On/Off, Show/Hide). Choosing an option should produce an immediate result -- use a checkbox instead if extra steps are needed for changes to take effect.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Basic Usage

Bind to a `bool` value with `@bind-Value`. Use the `Label` parameter for the switch label.

```razor
<FluentSwitch @bind-Value="@value" Label="This is a switch" />
<div>Switch value: @value</div>

@code {
    bool value = false;
}
```

---

## Label Position

Control where the label appears relative to the switch using `LabelPosition`.

```razor
<FluentStack Orientation="Orientation.Vertical">
    <FluentSwitch Label="Label position Above" LabelPosition="LabelPosition.Above" />
    <FluentSwitch Label="Label position After" LabelPosition="LabelPosition.After" />
    <FluentSwitch Label="Label position Before" LabelPosition="LabelPosition.Before" />
</FluentStack>
```

---

## ReadOnly and Disabled

A switch can be set to read-only (visible but not interactive) or disabled (grayed out).

```razor
<FluentStack HorizontalGap="12px">
    <FluentSwitch Label="Checked and readonly" ReadOnly="true" Value="true" />
    <FluentSwitch Label="Unchecked and readonly" ReadOnly="true" Value="false" />
</FluentStack>

<FluentStack HorizontalGap="12px">
    <FluentSwitch Label="Checked and disabled" Disabled="true" Value="true" />
    <FluentSwitch Label="Unchecked and disabled" Disabled="true" Value="false" />
</FluentStack>
```

---

## CheckedMessage / UncheckedMessage (Deprecated)

These properties from v4 are deprecated and will be removed in a future release. Use the `Label` attribute instead.

```razor
@{
#pragma warning disable CS0618
}
<FluentSwitch CheckedMessage="Checked" UncheckedMessage="Unchecked" />
```

---

## API Reference

- **`API Type=FluentSwitch`**

Key parameters: `Value` (`bool`), `Label` (`string`), `LabelPosition` (`LabelPosition`), `ReadOnly` (`bool`), `Disabled` (`bool`), `Tooltip` (`string?`).

---

## Migration Notes (v4 to v5)

- `CheckedMessage` / `UncheckedMessage` removed (were deprecated).
- New: `Tooltip` (`string?`).
