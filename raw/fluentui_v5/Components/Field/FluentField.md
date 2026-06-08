---
title: Field
route: /Field
icon: TextField
---

# Field

Field adds a label, validation message, and hint text to a control.

{{ FieldDefault }}

## Best practices

**Do**

- Use Field to add a label and validation message to form controls.
- Use Field to label other unlabeled controls like ProgressBar.

**Don't**

- Avoid including both a validationMessage and hint text.
- Don't add multiple controls as a child of a single Field. The label is only associated with one control.
- Don't use the Field's label with Checkbox. Use the Checkbox's label instead (the Field can still be used to add a validationMessage or hint).

## Label

The `Label` associated with the field.
This text is usually displayed above the component to describe it to the user.
You can position it on the left or right using `LabelPosition`.
In this case, the attribute `LabelWidth` can be used to set an identical label width
to multiple `FluentField`.

This label can be fully customized (bold, italic, icons, ...) using `LabelTemplate`.

{{ FieldLabelExample }}

> By default, the `my-3-o`, an overridable "my-3" class, is added to all `FluentField`
> that contain at least one `Label` or `Message`,
> to add `12px` before (top) and after (bottom) the field.
> This will automatically make all your form fields **24px** apart,
> as recommended by the FluentUI designers.
>
> This default value can be modified or removed globally via the startup options:
> `builder.Services.AddFluentUIComponents(options => options.DefaultStyles.FluentFieldClass = "my-class" );`

## Validation Message

The `Message` is used to give the user feedback about the value entered.
The field can validate itself using the rules defined in `MessageCondition`.
It can be used to signal the result of form validation.

This message can be fully customized (bold, italic, icons, ...) using `MessageTemplate`.

The `MessageState` affects the behavior and appearance of the message:
- `Error` - The validation message has the red text `An error occured` with a red error icon.
- `Success` - The validation message has gray text `Valid data` with a green checkmark icon.
- `Warning` - The validation message has gray text `Please, check this value` with a yellow exclamation icon.
- `<null>` - The validation message must be defined using `Message` or `MessageTemplate`.

These default messages can be located using the [localization](/localization) service.

Optionally, `Message` and `MessageIcon` attributes can be used to override
the default text and icon (or add an icon in the case of `MessageState = null`).

{{ FieldStatesExample }}

[!NOTE] that the `MessageCondition` attribute must be set to
`(i) => true` or identical to `FluentFieldCondition.Always`.
This enables the message to be displayed, which is not the case by default.

## Input components

All **FluentUI Blazor** input components contains the same `FluentField` attributes:
like `Label`, `Message`, `MessageCondition`, `MessageState` and others.

You can use them directly from the Input component to influence the included `FLuentField`

## Message Conditions

The `MessageCondition` attribute specifies when to display the message
at the bottom of the `FluentField`.
This condition is a lambda expression (or method) whose input parameter
is the current `IFluentField` and output is `true` to display the message
or `false` to hide the message.

Examples: `@(field => field.FocusLost == true)` will display the message
when the user will leave the component.

To help you implement these rules, you can use the `IFluentField.Where`
method associated with the `Display` method. You must finalize the rule
definition using the method `Build()` (to start the validation of the rules).

Rules are evaluated in order of creation: the first rule checked applies
the associated `Display` action

```csharp
field => field.When(() => MyValue.Length <= 1)
                   .Display("Less than 1", MessageState.Success)
              .When(() => MyValue.Length <= 3)
                   .Display("Less than 3", MessageState.Error)
              .When(() => MyValue.Length <= 5)
                   .Display("Less than 5", new Icons.Regular.Size16.Image())
              .When(() => true)
                   .Display(MessageState.Warning)
              .Build())
```

{{ FieldMessageCondition }}

You can combine the conditions to display several messages simultaneously,
using an option in the `Build` method: `.Build(options => options.BreakOnFirst = false)`.

{{ FieldMessageMultipleConditions }}

## API FluentField

{{ API Type=FluentField }}
