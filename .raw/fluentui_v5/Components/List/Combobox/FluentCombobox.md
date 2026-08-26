---
title: Combobox
route: /Lists/Combobox
---

# Combobox

A **FluentCombobox** lets people choose one or more options from a list or enter text in a connected input.
Entering text will filter options or allow someone to submit a free form answer.

Comboboxes work well in situations where the list of options is very long.
If the list is not very long or you can't accept free form answers, try a **FluentSelect**.

> **Note:** For more information about placeholders and autofill, see this <a href="/TextInput#placeholders-and-autofill">important information</a>

## Default

When no item is selected, a **Placeholder** can be used to describe what should be done.

For multi-select interactions, each list item is accompanied by a checkbox.
The list of options won’t close until it is dismissed it, either by clicking off the list or by pressing Esc.
Set the `Multiple="true"` parameter to enable multiple selections.

Because combobox inputs always allow people to enter information, the selections will not replace
the placeholder text by default. For best usability, build in other ways to show people the selections they’ve made
without opening the menu, like showing their choices as tags in the input (NOT YET IMPLEMENTED).

{{ ComboboxDefault }}

## FreeOption

Comboboxes allow people to filter the list of options as they type.
If the someone types a string that doesn’t match any option in the list,
you can allow submission of their free form entry by using the `FreeOption` section and the `FreeOptionOutput` element
to display the user text.

```xml
<FreeOption>
    Search for '<FreeOptionOutput />'
</FreeOption>
```

## Appearance

You can change the appearance of the **FluentSelect** component by using the **appearance** or **Size** parameters.

See a similar example on the [FluentSelect](/List/Select#appearance) page.

## Customize the items

You can customize the items in the **FluentSelect** component by using Lambda expressions.
The following example shows how to customize the items:
- `OptionText`: This function is used to customize the text of the option. <br />
- `OptionValue`: This function is used to customize the value of the option. <br />
- `OptionValueToString`: This function is used to customize the HTML value of the option. <br />
- `OptionDisabled`: This function is used to define the disabled options. <br />

See a similar example on the [FluentSelect](/List/Select#customize-the-items) page.

## API FluentCombobox

{{ API Type=FluentCombobox<string,string> }}

> [!NOTE] The `Width` parameter is not yet implemented.

## API FluentOption

{{ API Type=FluentOption<string> }}

## Migrating to v5

TODO
