---
address: c-000133
status: developing
title: "FluentUI Blazor Number"
tags:
  - fluentui-blazor
  - components
  - number-input
  - numeric
  - input
---

# FluentUI Blazor Number

The `FluentNumberInput` component enables users to enter and edit numeric values. Supports both integer and decimal types with configurable `Min`, `Max`, and `Step` constraints.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Numeric Types

The `TValue` generic parameter defines the value type. Supported types: `byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `decimal` (including nullable versions).

```razor
<FluentNumberInput Label="int" @bind-Value="@ValueInt" />
<FluentNumberInput Label="float" Step="0.1f" @bind-Value="@ValueFloat" />
<FluentNumberInput Label="double" Step="0.01d" @bind-Value="@ValueDouble" />
<FluentNumberInput Label="decimal" Step="0.01m" @bind-Value="@ValueDecimal" />

@code {
    int ValueInt = 42;
    float? ValueFloat = 3.14f;
    double ValueDouble = 2.71;
    decimal ValueDecimal = 9.999m;
}
```

> When using `float`, suffix literal values with `f`. When using `decimal`, suffix with `m`.

---

## Step Buttons

Control visibility of up/down step buttons via `StepButtons` parameter (`NumberInputStepVisibility`):

- **`Visible`** — always visible
- **`Hidden`** — always hidden
- **`Auto`** (default) — shown on hover/focus

---

## Min, Max, and Step

Constrain the allowed range and increment step.

```razor
<FluentNumberInput Label="int"
              Min="0"
              Max="100"
              Step="5"
              Placeholder="Number [0 and 100]"
              @bind-Value="@Value" />

@code {
    int? Value;
}
```

---

## Culture and Decimal Separator

Use the `Culture` parameter to control number formatting. By default, uses `FluentNumberCultureInfo` (dot `.` as decimal separator). The component always uses invariant culture internally per the HTML standard, so French users see `1,5` but the component reads `1.5`.

> [!NOTE] Unlike native `<input type="number">`, `FluentNumberInput` submits values formatted according to the specified `Culture` (e.g., French culture sends `1,5` instead of `1.5`). Keep this in mind when processing form data server-side.

```razor
@using System.Globalization

<FluentNumberInput TValue="double"
              Culture="@SelectedCulture"
              Label="Decimal"
              Step="0.1"
              @bind-Value="@Value" />
```

---

## Prefix and Suffix

Use `StartTemplate` and `EndTemplate` to add prefix/suffix elements (currency symbols, units, etc.).

```razor
<FluentNumberInput TValue="double" Label="@($"Price = €{Price}")"
              Step="0.01" Min="0" @bind-Value="@Price">
    <StartTemplate>
        <FluentText>€</FluentText>
    </StartTemplate>
</FluentNumberInput>

<FluentNumberInput TValue="double" Label="@($"Weight = {Weight} kg")"
              Step="0.1" Min="0" @bind-Value="@Weight">
    <EndTemplate>
        <FluentText>kg</FluentText>
    </EndTemplate>
</FluentNumberInput>
```

---

## Immediate Mode

Set `Immediate="true"` to update the value on each keystroke rather than on blur. Use `ImmediateDelay` (milliseconds) to debounce rapid input.

```razor
<FluentNumberInput Label="@($"Value = {Value}")"
              Immediate="true"
              ImmediateDelay="400"
              @bind-Value="@Value" />

@code {
    int Value = 42;
}
```

> Immediate mode only applies to typed input. Up/down buttons and arrow keys always update immediately regardless of this setting.

---

## API Reference

- **`API Type=FluentNumberInput<int>`**

Key parameters: `Min` (`TValue`), `Max` (`TValue`), `Step` (`TValue`), `StepButtons` (`NumberInputStepVisibility`), `Culture` (`CultureInfo`), `Immediate` (`bool`), `ImmediateDelay` (`int`), `StartTemplate` / `EndTemplate` (`RenderFragment`), `Placeholder` (`string`), `Label` (`string`).
