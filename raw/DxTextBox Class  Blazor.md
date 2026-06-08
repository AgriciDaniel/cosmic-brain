---
title: "DxTextBox Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxTextBox Class

In This Article

A single-line text editor.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxTextBox :
    DxInputDataEditorBase<string>,
    IFocusableEditor
```

## Remarks

The DevExpress Text Box for Blazor (`<DxTextBox>`) allows you to enter and edit a single line of text.

![TextBox Overview](https://docs.devexpress.com/Blazor/images/blazor-textbox-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/TextBox)

### Add a Text Box to a Project

Follow the steps below to add the Text Box component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxTextBox>` … `</DxTextBox>` markup to a `.razor` file.
3. Configure the component: specify the editor’s value, handle value changes, apply a mask, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxTextBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox._members).

### Static Render Mode Specifics

Blazor Text Box does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Edit Value

Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox.Text) property to specify an editor value or to bind the displayed text to a data source object. You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Text` property to a data field. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxTextBox Text="Some text"></DxTextBox>

<DxTextBox @bind-Text="@TextValue"></DxTextBox>

@code {
    string TextValue { get; set; } = "Some text";
}
```

The `Text` property value is updated when the editor loses focus ([OnLostFocus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) mode). You can set the [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox.BindValueMode) property to [OnInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) or [OnDelayedInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) to update the `Text` property when a user changes the input value.

### Handle a Text Change

If you do not use two-way data binding, handle the [TextChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox.TextChanged) event to respond to changes made in the editor. The following code snippet enables the **Update Text** button once a user types in the Text Box editor.

```
<DxTextBox Text="Some text" TextChanged="@((newValue) => OnTextChanged(newValue))"></DxTextBox>
<DxButton Enabled="@IsEnabled">Update Text</DxButton>

@code {
    bool IsEnabled = true;

    void OnTextChanged(string newValue) {
        if (!string.IsNullOrEmpty(newValue)) {
            IsEnabled = false;
        } else IsEnabled = true;
    }
}
```

### Password

Set the [Password](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox.Password) property to `true` to treat user input as a password and mask all characters. Users cannot copy or cut text from the editor in this mode.

![TextBox Password](https://docs.devexpress.com/Blazor/images/blazor-textbox-password.png)

```
<DxTextBox Password="true"> </DxTextBox>
```

[Run Demo: Text Box - Password](https://demos.devexpress.com/blazor/TextBox#Password)

### Mask

Use the [Masked Input](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1) component to apply a mask to a text editor.

```
<DxMaskedInput @bind-Value="Value"
               Mask="(000)000-00-00" >
</DxMaskedInput>

@code{
    String Value { get; set; }
}
```

[Run Demo: Masked Input](https://demos.devexpress.com/blazor/MaskedInput)

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify a Text Box size. The following code snippet applies different size modes to Text Box components.

```
<DxTextBox @bind-Text="@TextValue" SizeMode="SizeMode.Small"></DxTextBox>

<DxTextBox @bind-Text="@TextValue" SizeMode="SizeMode.Medium"></DxTextBox>

<DxTextBox @bind-Text="@TextValue" SizeMode="SizeMode.Large"></DxTextBox>

@code {
    string TextValue { get; set; } = "Some text";
}
```

![Text Box - Size Mode](https://docs.devexpress.com/Blazor/images/blazor-textbox-size-modes.png)

To customize styles for the Text Box container, use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.CssClass) property. The following code snippet applies a custom style to container borders:

- [Razor](#tabpanel_sQlJsMGpNL_tabid-textbox-cssclass-razor)
- [CSS](#tabpanel_sQlJsMGpNL_tabid-textbox-cssclass-css)

```
<DxTextBox Text="Some text" CssClass="my-style"></DxTextBox>
```

![Custom Input Border](https://docs.devexpress.com/Blazor/images/blazor-textbox-css-property.png)

You can also use the [InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.InputCssClass) property to customize the editor’s input area.

For additional information, refer to the following help topics:

- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes)

### Clear Button and Placeholder

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to display the **Clear** button in the Text Box editor when it is not empty. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to display the prompt text (placeholder) in the editor when its value is `null`.

![TextBox Clear Button](https://docs.devexpress.com/Blazor/images/blazor-textbox-clear-button.png)

```
<DxTextBox @bind-Text="@TextValue" 
           ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
           NullText="Type text..."></DxTextBox>

@code {
    string TextValue { get; set; } = "Some text";
}
```

[Run Demo: Text Box - Clear Button and Placeholder](https://demos.devexpress.com/blazor/TextBox#ClearButton)

### Add Command Buttons

You can add custom command buttons to the Text Box. Refer to [Command Buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) for additional information.

The following code snippet adds the **Send E-mail** button to the Text Box.

```
<DxTextBox Text="@Email"
           TextChanged="@((string value) => OnEmailChanged(value))"
           CssClass="dx-demo-editor-width">
    <Buttons>
        <DxEditorButton IconCssClass="editor-icon editor-icon-mail"
                        Tooltip="Send Email"
                        NavigateUrl="@EmailLink" />
    </Buttons>
</DxTextBox>

@code{
    string Email { get; set; } = "test@example.com";
    string EmailLink { get; set; } = "mailto:test@example.com";
    void OnEmailChanged(string email) {
        Email = email;
        EmailLink = $"mailto:{email}";
    }
}
```

![TextBox - Command Button](https://docs.devexpress.com/Blazor/images/editors/maskedinput-add-command-button.png)

### Input Validation

You can add a standalone Text Box or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to the Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Starship](#tabpanel_sQlJsMGpNL-1_tabid-model1)
- [Razor](#tabpanel_sQlJsMGpNL-1_tabid-razor1)

```
<EditForm Model="@starship" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout >
        <DxFormLayoutItem Caption="Identifier:" ColSpanMd="6" >
            <Template >
                <DxTextBox @bind-Text="@starship.Identifier" />
            </Template >
        </DxFormLayoutItem >
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Starship starship=new Starship();
}
```

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

[Run Demo: Form Validation](https://demos.devexpress.com/blazor/FormValidation)

### Read-Only State

`<DxTextBox>` supports a read-only state. Set the [ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.ReadOnly) property to `true` to activate this option.

```
<DxTextBox ReadOnly="true"> </DxTextBox>
```

[Run Demo: Text Box - Read-Only and Disabled Modes](https://demos.devexpress.com/blazor/DisabledAndReadOnlyModes)

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Text Box.

```
<DxTextBox Text="Some text"
           id="text"
           name="text"
           autocomplete="on"
           maxlength="10"
           @onselect="MyFunction">
</DxTextBox>

@code {
    void MyFunction(){
        //...
    }
}
```

### Accessibility Information

Create a separate label to add accessible information to your editors.

```
<label for="label1">Text</label>
<DxTextBox InputId="label1"/>
```

You can create a hidden label that is not visible on the page, but is read by screen reader tools.

```
<label for="label1" style="display: none">Text</label>  
<DxTextBox InputId="label1"/>
```

This approach is demonstrated in the following demo: [Blazor Data Editors - Overview](https://demos.devexpress.com/blazor/Editors).

If you use the [DxFormLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to arrange editors, the component renders the [Caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Caption) property value as the `<label>` element with the specified `for` attribute.

```
<DxFormLayout>
    <DxFormLayoutItem Caption="Name:" ... >
        <DxTextBox InputId="label1" ... />
    </DxFormLayoutItem>
    ...
```

The rendered code:

```html
<label for="label1" ... >
    Name:
</label>
...
<input id="label1" type="text" ... >
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxTextBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox._members)