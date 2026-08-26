---
title: FluentUI Blazor Combobox
address: c-000109
status: developing
---

# FluentUI Blazor Combobox

> Part of the **[[FluentUI Blazor]]** component library. A dropdown with an editable input field that supports both selection from a list and free-form text entry.

## Overview

`FluentCombobox` lets users choose one or more options from a list or type text in a connected input. Typing filters the available options. If no option matches, users can submit a free-form value.

Comboboxes are best when the option list is long and you want to accept free-form answers. When the list is short or free-form input is not desired, use `FluentSelect` instead.

> [!NOTE] The `Width` parameter is not yet implemented for this component.

### Basic usage with multi-select

```razor
<FluentCombobox Label="Countries"
                Placeholder="Select your countries"
                Multiple="true"
                OptionText="@(i => i?.Name)"
                OptionValue="@(i => i?.Code)"
                Items="@Countries"
                @bind-SelectedItems="@SelectedCountries">
    <FreeOption>
        Search for '<FreeOptionOutput />'
    </FreeOption>
</FluentCombobox>

<div>
    Selected: @string.Join(',', SelectedCountries.Select(i => i.Code))
</div>

@code {
    IEnumerable<SampleData.Olympics2024.Country> Countries = SampleData.Olympics2024.Countries;
    IEnumerable<SampleData.Olympics2024.Country> SelectedCountries = [];
}
```

## FreeOption

The `FreeOption` render fragment displays a message when the typed text does not match any option. Use `FreeOptionOutput` to show the user's typed text.

```xml
<FreeOption>
    Search for '<FreeOptionOutput />'
</FreeOption>
```

This enables free-form submission: users can type values not in the predefined list.

## Customizing options

Like `FluentSelect`, the combobox supports lambda expressions for customization:

- `OptionText` -- function to extract display text.
- `OptionValue` -- function to extract the value.
- `OptionValueToString` -- function to format the HTML value attribute.
- `OptionDisabled` -- function to define disabled options.

## Appearance

The appearance can be changed using the `Appearance` parameter, referencing the `ListAppearance` enum. See the [[FluentUI Blazor List and Select]] page for similar examples.

## Multi-select behavior

When `Multiple="true"`, each list item shows a checkbox. The dropdown remains open until dismissed (clicking outside or pressing Escape). Selected items do **not** replace the placeholder text by default.

> [!NOTE] Showing selected items as tags inside the input is planned but not yet implemented.

## API types

| Component | API Type |
|-----------|----------|
| `FluentCombobox` | `FluentCombobox<string,string>` |
| `FluentOption` | `FluentOption<string>` |

## Related

- [[FluentUI Blazor List and Select]]
- [[FluentUI Blazor Autocomplete]]
