---
address: c-000107
status: developing
title: "FluentUI Blazor Checkbox"
tags:
  - fluentui-blazor
  - components
  - checkbox
  - input
---

# FluentUI Blazor Checkbox

The `FluentCheckbox` component enables a user to select or deselect an option. It captures a boolean value and supports two-state, three-state, and indeterminate modes.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Basic Usage

Bind to a `bool` value with `@bind-Value`. Use the `Label` parameter for the checkbox label and `Disabled` to prevent interaction.

```razor
<FluentStack Orientation="Orientation.Vertical">
    <FluentCheckbox @bind-Value="@apples" Label="Apples" />
    <FluentCheckbox @bind-Value="@bananas" Disabled="true" Label="Bananas (disabled)" />
    <FluentCheckbox @bind-Value="@oranges" Label="Oranges" />
</FluentStack>

@code {
    bool apples = true;
    bool bananas = true;
    bool oranges;
}
```

---

## Shape

Checkboxes can be square (default) or circular.

```razor
<FluentCheckbox Shape="@CheckboxShape.Square" Label="Square checked" Checked="true" />
<FluentCheckbox Shape="@CheckboxShape.Circular" Label="Circular checked" Checked="true" />
```

---

## Size

Two sizes are available: `Medium` (default) and `Large`.

```razor
<FluentCheckbox Label="Apples" Size="@CheckboxSize.Medium" />
<FluentCheckbox Label="Bananas" Size="@CheckboxSize.Large" />
```

---

## Indeterminate State

Use the `CheckState` bindable property (`bool?`) for three possible states: `null` (indeterminate), `true` (checked), `false` (unchecked). The `Value` property (`bool`) only supports checked/unchecked.

Set `ShowIndeterminate="false"` to prevent the user from setting the indeterminate state manually (useful for initial display only).

```razor
<FluentCheckbox @bind-Value="@value"
                @bind-CheckState="checkState"
                ShowIndeterminate="false"
                Label="Indeterminate with label" />

@code {
    private bool value;
    private bool? checkState;
}
```

---

## Three-State Mode

Enable three-state cycling with `ThreeState="true"`. Control the cycle order with `ThreeStateOrderUncheckToIntermediate`:

- **`false`** (default): Unchecked -> Checked -> Intermediate -> Unchecked
- **`true`**: Unchecked -> Intermediate -> Checked -> Unchecked

```razor
<FluentCheckbox @bind-CheckState="state"
                @bind-Value="value"
                ThreeState="true"
                Label="Three state = true" />

@code {
    bool value;
    bool? state;
}
```

---

## API Reference

- **`API Type=FluentCheckbox`**

Key parameters: `Value` (`bool`), `CheckState` (`bool?`), `ThreeState` (`bool`), `ThreeStateOrderUncheckToIntermediate` (`bool`), `ShowIndeterminate` (`bool`), `Shape` (`CheckboxShape`), `Size` (`CheckboxSize`), `Label` (`string`), `Disabled` (`bool`).

> Recommended spacing: 24px between checkboxes and other components.
