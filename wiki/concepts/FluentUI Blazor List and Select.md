---
title: FluentUI Blazor List and Select
address: c-000127
status: developing
---

# FluentUI Blazor List and Select

> Part of the **[[FluentUI Blazor]]** component library. Components for displaying and selecting items from collections.

## Overview

The FluentUI Blazor library provides several list-based components for different selection scenarios:

- **FluentSelect** -- A dropdown list that allows users to select one or more options from a predefined list. No free-text entry.
- **FluentListbox** -- A static list of options displayed inline (not a dropdown). Supports single and multi-select.
- **FluentCombobox** -- A dropdown with an editable input field and filtering. See [[FluentUI Blazor Combobox]].
- **FluentAutocomplete** -- A text input with real-time suggestions from async search. See [[FluentUI Blazor Autocomplete]].

## FluentSelect

`FluentSelect` renders a native-like dropdown picker. It requires two type parameters: `TOption` and `TValue`.

### Basic usage

```razor
<FluentSelect Label="Color"
              Placeholder="Select a color"
              Items="@Colors"
              @bind-Value="@Value" />

@code {
    static string[] Colors = ["Red", "Green", "Blue"];
    string? Value;
}
```

### Appearance and size

The `Appearance` parameter accepts `ListAppearance` enum values: `Outline`, `FilledLighter`, `FilledDarker`, `Transparent`.

The `Size` parameter accepts `ListSize` values: `Small`, `Medium` (default), `Large`.

```razor
<FluentSelect Label="Outline"
              Appearance="@ListAppearance.Outline"
              Items="@Colors"
              @bind-Value="@Value" />

<FluentSelect Label="Small"
              Size="@ListSize.Small"
              Items="@Colors"
              @bind-Value="@Value" />
```

### Customizing options with lambdas

- `OptionText` -- function to extract display text from an option.
- `OptionValue` -- function to extract the value from an option.
- `OptionValueToString` -- function to format the HTML value attribute.
- `OptionDisabled` -- function to determine if an option is disabled.

```razor
<FluentSelect Label="Coworker"
              Items="@Coworkers"
              @bind-Value="@Value"
              OptionText="@(item => item?.FirstName)"
              OptionValueToString="@(item => item?.Id)"
              OptionDisabled="@(item => item == Coworkers.ElementAt(3))" />
```

### OptionTemplate

Use `OptionTemplate` for custom rendering of each option. Set `pointer-events: none` on interactive child elements to avoid click interference.

```razor
<FluentSelect Label="Colors"
              Items="@GetEnumValues()"
              @bind-Value="@Value">
    <OptionTemplate>
        <FluentStack Style="pointer-events: none;">
            <div class="color-block" style="--item-color: @context.ToAttributeValue()"></div>
            <span>@context</span>
        </FluentStack>
    </OptionTemplate>
</FluentSelect>
```

### Multi-select

Set `Multiple="true"` and bind to `@bind-SelectedItems` instead of `@bind-Value`.

```razor
<FluentSelect Label="Color"
              Items="@Colors"
              TOption="string"
              TValue="string"
              @bind-SelectedItems="@SelectedItems"
              Multiple="true" />

@code {
    IEnumerable<string> SelectedItems = new[] { Colors[0] };
}
```

### Manual FluentOption children

Options can also be supplied manually as `FluentOption` children. Use `<FluentOptionString>` as shorthand for `FluentOption<string>`.

```razor
<FluentSelect TOption="string" TValue="string"
              Label="RGB Color"
              @bind-Value="@Value">
    <FluentOptionString Value="ff0000">Red</FluentOptionString>
    <FluentOptionString Value="00ff00">Green</FluentOptionString>
    <FluentOptionString Value="0000ff">Blue</FluentOptionString>
</FluentSelect>
```

> [!NOTE] When programmatically changing the value of a manually-constructed list, add `@key="@SelectedId"` to force Blazor to redraw correctly.

### Large item sets

All items render in HTML at once. For very large collections, use `FluentAutocomplete` instead.

## FluentListbox

`FluentListbox` displays a list of options inline (not as a dropdown). Once an item is selected, it cannot be deselected unless an empty item is provided.

### Single select

```razor
<FluentListbox Label="Color"
               Items="@Colors"
               @bind-Value="@Value" />
```

### Multi-select

```razor
<FluentListbox Label="Color"
               Items="@Colors"
               TOption="string"
               TValue="string"
               @bind-SelectedItems="@SelectedItems"
               Multiple="true" />
```

### Disabled and ReadOnly

```razor
<FluentListbox Label="Disabled"
               Disabled="true"
               Items="@Colors"
               @bind-Value="@Value" />

<FluentListbox Label="ReadOnly"
               ReadOnly="true"
               Items="@Colors"
               @bind-Value="@Value" />
```

## Key migration notes (v4 to v5)

- All list components now require **two** type parameters: `TOption` and `TValue`.
- `SelectedOptions` renamed to `SelectedItems`.
- `Appearance` enum replaced with `ListAppearance` enum.
- `OptionComparer` renamed to `OptionSelectedComparer`.
- `SelectedOption` removed -- use `Value` instead.

## API types

| Component | API Type |
|-----------|----------|
| `FluentSelect` | `FluentSelect<string,string>` |
| `FluentListbox` | `FluentListbox<string,string>` |
| `FluentOption` | `FluentOption<string>` |

## Related

- [[FluentUI Blazor Combobox]]
- [[FluentUI Blazor Autocomplete]]
