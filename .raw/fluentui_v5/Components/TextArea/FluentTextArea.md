---
title: TextArea
route: /TextArea
icon: TextboxMore
---

# TextArea

A **FluentTextArea** component enables a user to enter multiple lines of text.
The component is a wrapper for the <fluentui-textarea /> web component.

## Appearance

The apparent style of a textarea can be changed by setting the `Appearance` and `Size` properties.

You can also add a label to the text input by setting the `Label` property and a placeholder by setting the `Placeholder` property.
The label will be automatically positioned above the text input, and the placeholder will be displayed inside the text input.

We recommend to use a spacing of 24px between text fields and other components.

{{ TextAreaAppearances }}

## Size
A textarea supports `Small`, `Medium` (default) and `Large` size.  
You can set the `Width` and `Height` properties to control the size of the textarea.

{{ TextAreaSizeExample }}

## Resize

The `Resize` property allows you to specify how the textarea can be resized by the user.

{{ TextAreaResizes }}

## Binding with ImmediateDelay

In some cases, you may want to bind the value of the text input to a property of a model
and update the model immediately after the user types a character. But you may also want to delay the update.

This can be achieved by setting the `Immediate` and the (optional) `ImmediateDelay` properties.

{{ TextAreaImmediate }}

## ChangeAfterKeyPress

In the example of a command area or search text area, you can use the `ChangeAfterKeyPress` parameter to trigger the `OnChange` event
after a specific key or keys are pressed. E.g. `Enter`, `Escape`, `Tab`, `Ctrl+Enter`, etc.
You can capture the content of the text area from the `Value` parameter.

An `OnChangeAfterKeyPress` event is also triggered when the user presses these key combinations.
This also gives you the key used to trigger the event (this can be useful when you allow multiple key combinations).

```razor
<FluentTextArea ChangeAfterKeyPress="@([KeyPress.For(KeyCode.Enter).AndCtrlKey(), KeyPress.For(KeyCode.Enter)])"
                OnChangeAfterKeyPress="@(e => ...)" />
```

{{ TextAreaChangeAfterKeyPress }}

## States

A text input can be in different states, such as `Disabled`, `ReadOnly`, and `Required`.

{{ TextAreaState }}

## API FluentTextArea

{{ API Type=FluentTextArea }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentTextArea }}
