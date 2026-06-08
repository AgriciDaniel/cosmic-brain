---
title: Listbox
route: /Lists/Listbox
---

# Listbox

The **FluentListbox** component allows one option to be selected from a list of options.

## Default

Find here an example of the default usage of the **FluentListbox** component.
If an item is selected, the user cannot deselect it. If you want to allow the user to deselect the item,
you can add an empty item.

{{ ListboxDefault }}

## Appearance

You can change the appearance of the **FluentListbox** component by using the **appearance** parameter.

{{ ListboxAppearance }}

## Multiple

Use the **Multiple** parameter to enable multiple selections. Selected items are bound to the
**SelectedItems** parameter.

{{ ListboxMultiple }}

## Disabled and ReadOnly

You can disable the **FluentListbox** component by using the **Disabled** parameter.
You can make the **FluentListbox** component read-only by using the **ReadOnly** parameter.

{{ ListboxDisabledReadOnly }}

## Many items

You can use this component with a large number of items. But all items are rendered in the HTML code
and loaded at once. If you have a very large number of items, you should use the
**FluentAutocomplete** component.

{{ ListboxManyItems }}
