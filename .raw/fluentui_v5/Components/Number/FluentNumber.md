---
title: Number
route: /Number
icon: NumberSymbol
---

# Number

The **FluentNumberInput** component enables a user to enter and edit numeric values.
It supports both integer and decimal numbers, with configurable `Min`, `Max`, and `Step` constraints.

**Value** can be one of the following **Numeric Types**:
`byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `decimal` (including nullable versions).

Use the `StepButtons` parameter to control the visibility of the up/down step buttons.
It accepts a `NumberInputStepVisibility` value:
- **Visible**: The step buttons are always visible.
- **Hidden**: The step buttons are always hidden.
- **Auto** *(default)*: The step buttons are shown only when the user hovers over the input or when it has focus.

## Numeric Types

The `TValue` generic parameter defines the type of the value. You must specify it explicitly.
For **integer** types (`int`, `long`, ...), the step defaults to whole numbers.
For **decimal** types (`float`, `double`, `decimal`), set the `Step` parameter to control precision.

> **Note**: When using `float`, suffix literal values with `f` (e.g. `Step="0.1f"`).
> When using `decimal`, suffix with `m` (e.g. `Step="0.001m"`).

{{ NumberTypes }}

## Culture and Decimal Separator

Use the `Culture` parameter to control how numbers are formatted and parsed, including the decimal separator, group separator, and number of decimal digits. By default, the component uses the `FluentNumberCultureInfo` class (dot `.` as decimal separator). You can pass any `CultureInfo` instance (e.g. `fr`, `de`, `ja`) to match the user's locale.

The `FluentNumberInput` component always uses the **invariant culture** (dot `.` as decimal separator)
for internal value. This matches the HTML standard: `<input type="number">`

This means:
- French users see `1,5` in the browser but the component correctly reads `1.5`
- No configuration is needed — it works across all cultures automatically

{{ NumberCulture }}

**[!NOTE]** Unlike the native `<input type="number">`, which always submits values using the invariant culture (dot `.` as decimal separator) 
inside a `<form>`, the `FluentNumberInput` component submits the value **formatted according to the specified `Culture`**. 
For example, with a French culture (`fr`), a form submission will send `1,5` instead of `1.5`.
Keep this in mind when processing form data on the server side.

## Min, Max, and Step

Use `Min`, `Max`, and `Step` to constrain the allowed values and increment step.

{{ NumberMinMaxStep }}

## Prefix and Suffix

Use the `StartTemplate` and `EndTemplate` parameters to add a prefix or suffix to the number input,
such as a currency symbol or unit.

{{ NumberInputPrefixSuffix }}

## Immediate Mode

Set `Immediate="true"` to update the value associated with each keystroke, rather than when focus is lost.
Use `ImmediateDelay` to debounce rapid input.

This parameter only applies when the user types digits directly.
When using the up/down buttons or arrow keys, the value is always updated immediately regardless of this setting.

{{ NumberInputImmediate }}

## API FluentNumberInput

{{ API Type=FluentNumberInput<int> }}
