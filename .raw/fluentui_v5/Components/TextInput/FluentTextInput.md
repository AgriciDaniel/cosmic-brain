---
title: TextInput
route: /TextInput
icon: Textbox
---

# TextInput

A **FluentTextInput** component enables a user to enter text into an app.
It's typically used to capture a single line of text.
The text displays on the screen in a simple, uniform format.

## Appearance

The apparent style of a text input can be changed by setting the `Appearance` property, but also by setting the `Size` property.

You can also add a label to the text input by setting the `Label` property and a placeholder by setting the `Placeholder` property.
The label will be automatically positioned above the text input, and the placeholder will be displayed inside the text input.

We recommand to use a spacing of 24px between text fields and other components.

{{ TextInputAppearances }}

Although not recommended by FluentUI, an input can be rendered inline with text using a style attribute.

```
<div>
    Name:
    <FluentTextInput Style="display: inline-block;" />
</div>
```

## Binding with ImmediateDelay

In some cases, you may want to bind the value of the text input to a property of a model
and update the model immediately after the user types a character. But you may also want to delay the update.
This can be achieved by setting the `Immediate` and the optional `ImmediateDelay` properties.

{{ TextInputImmediate }}

## Search Text Input

In the example of a search text area, you can use the `ChangeAfterKeyPress` parameter to trigger the `OnChange` event
after a specific key or keys are pressed. E.g. `Enter`, `Tab`, `Ctrl+Enter`, etc.
You can capture the content of the text area from the `Value` parameter.

An `OnChangeAfterKeyPress` event is also triggered when the user presses these key combinations.
This also gives you the key used to trigger the event (this can be useful when you allow multiple key combinations).

```razor
<FluentTextInput ChangeAfterKeyPress="@([KeyPress.For(KeyCode.Enter)])"
                 OnChangeAfterKeyPress="@(e => ...)" />
```

{{ TextInputChangeAfterKeyPress }}

## States

A text input can be in different states, such as `Disabled`, `ReadOnly`, and `Required`.

{{ TextInputState }}

## Prefix and Suffix

You can use the `StartTemplate` and `EndTemplate` properties to add a prefix or a suffix to the text input
as `https://` and `.com` or an icon.

These templates are automatically positioned with a small margin between the text entered and the prefix/suffix.
You cannot therefore fill the entire background of these templates, with a colour for example.

{{ TextInputPrefixSuffix }}

## Masked Input

You can use the `MaskPattern` property to define a mask for the text input.
The `Value` property will contain the masked value, including fixed characters from the mask.

Use **MaskPattern** when:

- mask is complex or contains nested masks
- mask is fixed in size (optional symbols can provide some flexibility)
- placeholder is needed
- more reliability or flexibility on processing input is needed

`MaskPattern` is just a string. E.g. `{#}000[aaa]/NIC-[**]`

The `MaskPattern` definitions are:
- `0` - any digit
- `a` - any letter
- `*` - any char

Other chars which is not in custom definitions supposed to be fixed
- `[]` - make input optional
- `{}` - include fixed part in unmasked value

If definition character should be treated as fixed it should be escaped by `\\` (E.g. `\\0`).

{{ TextInputMasked }}

> [!NOTE] The mask is only a visual aid to the user. The binded value will always be a string
> containing the characters typed by the user, along with any fixed characters from the mask.
> The mask does not enforce any validation on the input. You should still validate the input value.
> If you set a value that does not conform to the mask, it will be displayed as-is.

You can also use these extra parameters to customize the masking behavior:

- `MaskLazy` - when set to true, the placeholder characters are shown only when the user types in that position.
- `MaskPlaceholder` - defines the character used as a placeholder in the mask. Default is underscore `_`.

{{ TextInputMaskedAdvanced }}

All these parameters must be defined when the component is first rendered.
You cannot modify them dynamically.

> [!NOTE] We use the [IMask.js](https://imask.js.org/) library for this feature.
> By default, we automatically load this library when necessary. You can control the loading of this file 
> (version, choice of CDN or local), by preloading this JavaScript script via a code such as this one, 
> to be placed at the beginning of the HTML file (in your App.razor, index.html or your main HTML file).  
> `<script src="https://unpkg.com/imask@7.6.1/dist/imask.min.js"></script>`

## TextInput types

You can set the `TextInputType` property to define the type of the text input. This relies on browser supplied support for the different types and can therefore vary between browsers.

{{ TextInputTypes }}

## Placeholders and autofill

The `Placeholder` parameter is used to set the placeholder text for the input field. This is a short hint that describes the expected value of the input field.
It is displayed when the input field is empty and not focused. 

The placeholder value affects the autofill suggestion feature in Microsoft Edge and Google Chrome.
Even if you set the `AutoComplete` parameter to `off`, the browser may still display autofill suggestions based on the placeholder value.

There are certain placeholder values which you should avoid to prevent the browser from showing autofill suggestions.

| Value (Placeholder/Name) | Description                          |
|--------------------------|--------------------------------------|
| `name`, `full name`, `first name`, `last name`| Personal name fields |
| `email`, `e-mail`, `mail`| Email address fields |
| `address`, `street`, `city`, `zip`, `postal`| Address and postal code fields |
| `phone`, `tel`| Phone number fields |
| `username`, `user`, `login`| Username or login fields |
| `password`, `pwd`| Password fields |
| `dob`, `birthdate`, `date of birth`| Date of birth fields |
| `cc`, `card number`, `credit card`| Credit card fields |

If you still want to use these placeholder values, then you need to disable autofill in your browser settings completely.

## API FluentTextInput

{{ API Type=FluentTextInput }}
