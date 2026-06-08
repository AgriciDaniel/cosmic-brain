---
title: Select
route: /Lists/Select
---

# Select

The **FluentSelect** component allows one option to be selected from a list of options.

View the [Usage Guidance](https://fluent2.microsoft.design/components/web/react/select/usage).

## Default

A **Placeholder** can be used to give the user a hint of what can be selected.
If an item is selected, the user cannot deselect it.
If you want to allow the user to deselect the item, you can add an empty item
as shown in the Customized example below.

{{ SelectDefault }}

## Appearance

You can change the appearance of the **FluentSelect** component by using the **appearance** and/or **Size** parameters.

{{ SelectAppearance }}

## Customize the items

You can customize the items in the **FluentSelect** component by using Lambda expressions.
The following example shows how to customize the items:
- `OptionText`: This function is used to customize the text of the option.  
   In the following example, the **FirstName** is used.
- `OptionValue`: This function is used to customize the value of the option.  
   In the following example, the **Id** is returned.
- `OptionValueToString`: This function is used to customize the HTML value of the option.
- `OptionDisabled`: This function is used to define the disabled options.  
   In the following example, the third element is disabled.

In the following example, the preselected item is defined by the **Value** parameter,
(third item in this example).

{{ SelectCustomized }}

## OptionTemplate and Enum values

You can use an **Enum** to create a list of options.
In this example, we are using an **OptionTemplate** to display a colored block
in front of each item. Due to the **OptionTemplate**, the user must click
on the checkbox to select an item.

{{ SelectEnum }}

> [!NOTE] In some situation, the option elements may not catch the click event to select the item.
> To avoid this, you can use the `Style="pointer-events: none;"` to disable the pointer events
> on the element and let the click event pass through to the parent element.

## Multiple

Use the **Multiple** parameter to enable multiple selections.
Selected items are bound to the **SelectedItems** property.

{{ SelectMultiple }}

## Disabled and ReadOnly

{{ SelectDisabledReadOnly }}

> The **FluentSelect** component does not support the `ReadOnly` attribute.
> The `Disabled` attribute is used to prevent user interaction with the list.

## Manually supply options

The `Items` you supply to the `Select` ultimately are rendered as `FluentOption` components.
It is possible to manually supply options in the `Select`'s `ChildContent`.

When using this, you can display content at the start like an Icon or an Avatar. This is done by placing the content
in the `FluentOption` child content and assigning it to the `start` slot.

An option can also use the `Description` parameter to display additional information about the option.

{{ OptionStartContent }}

An example of using the `FluentOption` components directly in the `Select` is shown below.

**Notes:**
1. The two parameters `TOption="string"` and `TValue="string"` are required to indicate the type of options.
1. To simplify writing a `<FluentOption TValue="string">` we introduced a `<FluentOptionString>`.
   This component simply and directly inherits from `FluentOption<string>`.

{{ SelectManual }}

Demonstrates two-way data binding with `FluentSelect` using `@bind-Value` to bind an integer value from a collection of a complex object.

{{ SelectLanguage }}

**Note:** If you programmatically change the value of a manually constructed list (using `FluentOption`),
you will likely need to add an attribute `@key=“@SelectedId”` to force Blazor to redraw the component correctly.
This is the case in the above example: `@key="@(SelectedId2 ?? 0)"`.

## Many items

You can use this component with a large number of items.
But all items are rendered in the HTML code and loaded at once.
If you have a very large number of items, you should use the **FluentAutocomplete** component.

{{ SelectManyItems }}

## API FluentSelect

{{ API Type=FluentSelect<string,string> }}

## API FluentOption

{{ API Type=FluentOption<string> }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentSelect }}
