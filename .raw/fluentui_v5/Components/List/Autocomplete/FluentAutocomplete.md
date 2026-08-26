---
title: Autocomplete
route: /Lists/Autocomplete
---

# Autocomplete

An **Autocomplete** component is a text input that provides real-time suggestions as the user types.
It combines a free-text input with a filtered list of options, allowing users to either select from the suggestions or type their own value.

This is particularly useful when the list of options is large, as the user can narrow down the list op options without needing to scroll through all available items.

By default, the `FluentAutocomplete` component compares search results by instance with its internal selected items.
You can control this behavior by providing the `OptionSelectedComparer` parameter.

> **Note:** Accessibility requirements are not yet implemented for this component.

> **Note:** For more information about placeholders and autofill, see this <a href="/TextInput#placeholders-and-autofill">important information</a>

## Keyboard interaction

| Key | Behavior |
|---|---|
| **Type text** | Filters the list of options and triggers the `OnSearchAsync` method to fetch matching results. |
| **Arrow Down / Arrow Up** | Opens the suggestion list and navigates through the items in the suggestion list. |
| **Enter** | Selects the currently highlighted item. |
| **Backspace** | Deletes the most recently selected item (in multi-select mode). |
| **Escape** | Closes the suggestion list without selecting an item. |

<br /><br />

## Default

A basic autocomplete that filters a list of countries as the user types.
Multiple items can be selected, and one option is disabled (`OptionDisabled`).

{{ AutocompleteDefault }}

## Single item (Multiple=false)

Set the `Multiple` parameter to `false` to restrict the selection to a single item.
In this mode, the selected value replaces the input text and no tags are displayed.

{{ AutocompleteMultipleFalse }}

**Note**: The `Value` property is updated when a user selects an option from the list, but not through code.
To update the `Value` property from code, you must modify the `SelectedItems` or `SelectedItem` parameters.
 
## Customized options

Demonstrates advanced features: a custom `OptionTemplate` to render each option with a flag, a progress indicator during async search, 
a configurable max dropdown height, and a max width for selected items.

{{ AutocompleteCustomized }}

## Different object instances from search result

When the `OnOptionsSearch` method returns **new object instances** on each call (e.g. from an API or database query),
the component cannot match them to already-selected items by **reference**.

Use the `OptionSelectedComparer` parameter to provide a custom `IEqualityComparer<TOption>` that compares items by a unique key (such as an ID)
instead of by reference. Without this, previously selected items may not appear as checked in the refreshed list.

If your object implements `IEqualityComparer<T>`, you can omit the `OptionSelectedComparer` parameter, as the component will automatically use the object's built-in equality logic to match selected items.

{{ AutocompleteComparer }}

## API FluentAutocomplete

{{ API Type=FluentAutocomplete<string,string> }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentAutocomplete }}
