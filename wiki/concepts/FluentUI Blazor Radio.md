---
address: c-000139
status: developing
title: "FluentUI Blazor Radio"
tags:
  - fluentui-blazor
  - components
  - radio
  - input
---

# FluentUI Blazor Radio

`FluentRadioGroup` and `FluentRadio` let people select a single option from two or more items. Best for 2-5 options where all choices should be visible. For more than 5 options, consider `FluentSelect` (dropdown).

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Best Practices

**Do:**
- Include a "None" option if no answer is required.
- Choose the safest / most private option as default.
- Keep labels short and action-oriented (phrase, not sentence).
- Use sentence case.
- Place most likely choices first.

**Don't:**
- Exceed 5 options (use Dropdown instead).
- Rely on alphabetical ordering (breaks with localization).

---

## Basic Usage

Wrap `FluentRadio` items inside `FluentRadioGroup`. Bind to the group's `Value` to get the selected item. The `Label` on each radio becomes its value by default, or use the `Value` parameter explicitly.

```razor
<FluentRadioGroup @bind-Value="@Fruit" Label="Favorite fruit" Wrap="true">
    <FluentRadio Label="Apple" />
    <FluentRadio Label="Banana" />
    <FluentRadio Label="Orange" Disabled="true" />
    <FluentRadio Label="Kiwi" />
</FluentRadioGroup>

<FluentLabel>Selected radio: @Fruit</FluentLabel>

@code {
    string Fruit = "Banana";
}
```

> [!NOTE] Use `Value` to provide a specific option value: `<FluentRadio Value="@("AppleCategory")" Label="Apple" />`. By default `Value` == `Label`.

---

## Label Template

Use `LabelTemplate` for rich HTML labels instead of plain text `Label`.

```razor
<FluentRadioGroup Label="Numbers" @bind-Value="@NumberValue">
    <FluentRadio Value="@((int?)1)">
        <LabelTemplate>
            <strong>One</strong>
        </LabelTemplate>
    </FluentRadio>
    <FluentRadio Value="@((int?)2)">
        <LabelTemplate>
            <em>Two</em>
        </LabelTemplate>
    </FluentRadio>
</FluentRadioGroup>
```

> [!NOTE] Radio items support **strongly typed values**. Use explicit casting for nullable types: `Value="@((int?)1)"` or set `TValue="int?"`.

---

## Layout

Orientation can be `Horizontal` (default, wraps) or `Vertical` (stacked).

```razor
<FluentRadioGroup @bind-Value="@Fruit" Orientation="Orientation.Vertical">
    <FluentRadio Value="Apple" Label="Apple" />
    <FluentRadio Value="Banana" Label="Banana" />
    <FluentRadio Value="Orange" Label="Orange" />
    <FluentRadio Value="Grape" Label="Grape" />
    <FluentRadio Value="Kiwi" Label="Kiwi" />
</FluentRadioGroup>
```

Set `Wrap="true"` on the group to allow items to wrap to the next line in horizontal mode.

---

## Items Binding

Use the `Items` parameter to generate radio items from a collection. Specify mapping functions for `RadioLabel`, `RadioValue`, and `RadioDisabled`.

```razor
<FluentRadioGroup Label="The winner is"
                  Orientation="Orientation.Vertical"
                  Items="@Employees"
                  @bind-Value="@SelectedPerson"
                  RadioLabel="@(i => $"{i?.FirstName} [{(i?.Male == true ? "M" : "F")}]")"
                  RadioDisabled="@(i => i?.Male == true)"
                  RadioValue="@(i => i?.Id)" />
```

---

## Required Validation

Set `Required="true"` to show a validation error if no item is selected. Wrap in a `<form>` with a submit button.

```razor
<form>
    <FluentRadioGroup Name="options"
                      Items="@Fruits"
                      Label="Choose a fruit"
                      Required="true"
                      @bind-Value="@Value"
                      Message="Please select a fruit." />
    <FluentButton Type="ButtonType.Submit" Appearance="ButtonAppearance.Primary">Submit</FluentButton>
</form>
```

---

## API Reference

| Component | API Type |
|-----------|----------|
| `FluentRadioGroup` | `API Type=FluentRadioGroup` |
| `FluentRadio` | `API Type=FluentRadio` |

---

## Migration Notes (v4 to v5)

- `ChildContent` for radio labels is removed -- use `Label` or `LabelTemplate`.
- `ReadOnly` removed -- use `Disabled`.
- `AriaLabel`, `Name`, `Required`, `Checked` removed from `FluentRadio`.
- New on `FluentRadio`: `LabelWidth` (`string?`) for controlling label area width.
- New on `FluentRadioGroup`: `Wrap` (`bool`), `Items` (`IEnumerable<TValue?>`).
- `Disabled` changed from `bool` to `bool?`.
