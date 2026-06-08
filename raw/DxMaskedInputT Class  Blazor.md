---
title: "DxMaskedInput<T> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1"
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

## DxMaskedInput<T> Class

In This Article

A text editor supports text, numeric, date-time, and regular expression masks.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxMaskedInput<T> :
    DxMaskedInputBase<T>,
    IFocusableEditor
```

## Type Parameters

| Name | Description |
| --- | --- |
| T | The value type. |

## Remarks

The DevExpress Masked Input for Blazor (`<DxMaskedInput>`) is a text editor that supports masks.

![Masked Input Overview](https://docs.devexpress.com/Blazor/images/blazor-masked-iput-overview.png)

Most data editors work only with specific data types ([DateTime](https://learn.microsoft.com/dotnet/api/system.datetime), numeric objects, and so on). Date Time, Spin Edit, and Time Edit do not work when the data source stores dates or numbers as strings. Masked Input supports string values. The component converts strings from the data source to the corresponding type (`DateTime`, `int`, and so on) and then treats the value as a date or number. This allows you to use the full feature set of the selected mask type (Date-Time or Numeric) with string values.

[Run Demo: Masked Input](https://demos.devexpress.com/blazor/MaskedInput)

### Add a Masked Input to a Project

Follow the steps below to add the Masked Input component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxMaskedInput>` … `</DxMaskedInput>` markup to a `.razor` file.
3. Configure the component: apply a mask, specify the editor’s value, handle value changes, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxMaskedInput Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1._members).

### Static Render Mode Specifics

Blazor Masked Input does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Apply a Mask

The Masked Input component supports the following mask types.

#### Date-Time

[Date-time masks](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#date-time-masks) allow users to enter only date and/or time values. Users can navigate between mask sections (such as months, days, and hours) and increase/decrease section values with the Up and Down arrow keys and mouse wheel.

![Date-Time Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-date-time-masks.png)

[Run Demo: Date-Time Mask](https://demos.devexpress.com/blazor/MaskedInput#DateTimeMasks)

Follow the steps below to apply a date-time mask:

1. Make sure that the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property is set to a [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) object or a compatible [String](https://learn.microsoft.com/dotnet/api/system.string) (for instance, “11/09/2022”). In the latter case, set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property to `DateTime`.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxDateTimeMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateTimeMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a date-time mask:

```
<DxMaskedInput @bind-Value="@Value"
            Mask="@DateTimeMask.ShortDate">
    <DxDateTimeMaskProperties CaretMode="@MaskCaretMode.Advancing" />
</DxMaskedInput>

@code {
    DateTime Value = DateTime.Now;
}
```

#### Date-Time Offset

[Date-time offset masks](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#date-time-offset-masks) allow users to enter only date and/or time values, including the time’s offset from Coordinated Universal Time (UTC). Users can navigate between mask sections (such as months, days, and hours) and increase/decrease section values with the Up and Down arrow keys and mouse wheel.

![Date-Time Offset Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-date-time-offset-masks.png)

[Run Demo: Date-Time Offset Mask](https://demos.devexpress.com/blazor/MaskedInput#DateTimeOffsetMasks)

Follow the steps below to apply a date-time offset mask:

1. Make sure that the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property is set to a [DateTimeOffset](https://learn.microsoft.com/dotnet/api/system.datetimeoffset) object or a compatible [String](https://learn.microsoft.com/dotnet/api/system.string) (for instance, “11/09/2022”). In the latter case, set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property to `DateTimeOffset`.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxDateTimeOffsetMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateTimeOffsetMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a date-time offset mask:

```
<DxMaskedInput @bind-Value="@Value"
            Mask="@DateTimeMask.ShortDate">
    <DxDateTimeOffsetMaskProperties CaretMode="@MaskCaretMode.Advancing" />
</DxMaskedInput>

@code {
    DateTimeOffset Value = DateTimeOffset.Now;
}
```

#### Time Span

[Time span masks](https://docs.devexpress.com/Blazor/404167/components/data-editors/masks/time-span-masks) allow users to enter only time intervals. Users can navigate between mask sections (such as days, hours, and minutes) and increase/decrease section values with the Up and Down arrow keys and mouse wheel.

![Time Span Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-time-span-masks.png)

[Run Demo: Time Span Masks](https://demos.devexpress.com/blazor/MaskedInput#TimeSpanMasks)

Follow the steps below to apply a time span mask:

1. Make sure that the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property is set to a [TimeSpan](https://learn.microsoft.com/dotnet/api/system.timespan) object or a compatible [String](https://learn.microsoft.com/dotnet/api/system.string) (for instance, “5:16:30:15”). In the latter case, set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property to `TimeSpan`.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/404167/components/data-editors/masks/time-span-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/404167/components/data-editors/masks/time-span-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxTimeSpanMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTimeSpanMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a time span mask:

```
<DxMaskedInput @bind-Value="@Value"
            Mask="@TimeSpanMask.GeneralShortFormat">
    <DxTimeSpanMaskProperties CaretMode="@MaskCaretMode.Advancing" />
</DxMaskedInput>

@code {
    TimeSpan Value = new TimeSpan(6, 25, 30);
}
```

#### Numeric

[Numeric masks](https://docs.devexpress.com/Blazor/402514/components/data-editors/masks/numeric-masks) allow users to enter only numeric values. Users can navigate between digits and increase/decrease digit values with the Up and Down arrow keys and mouse wheel.

![Numeric Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-numeric-masks.png)

[Run Demo: Numeric Mask](https://demos.devexpress.com/blazor/MaskedInput#NumericMasks)

Follow the steps below to apply a numeric mask:

1. Make sure that the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property is set to a numeric object or a compatible [String](https://learn.microsoft.com/dotnet/api/system.string) (for instance, “1234567”). In the latter case, set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property to `Numeric`.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/402514/components/data-editors/masks/numeric-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/402514/components/data-editors/masks/numeric-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxNumericMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxNumericMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a numeric mask:

```
<DxMaskedInput @bind-Value="@Value"
            Mask="@NumericMask.RealNumber">
    <DxNumericMaskProperties Culture="Culture" />
</DxMaskedInput>

@"fr-FR"
```

#### Text

[Text masks](https://docs.devexpress.com/Blazor/402516/components/data-editors/masks/text-masks) allow users to enter only strings of limited length, such as phone numbers, zip codes, and social security numbers.

![Text Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-text-masks.png)

[Run Demo: Text Mask](https://demos.devexpress.com/blazor/MaskedInput#TextMasks)

Follow the steps below to apply a text mask:

1. Make sure that the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property is set to a [String](https://learn.microsoft.com/dotnet/api/system.string) object or the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property is set to `Text`.
2. Combine [metacharacters](https://docs.devexpress.com/Blazor/402516/components/data-editors/masks/text-masks#metacharacters), [special characters](https://docs.devexpress.com/Blazor/402516/components/data-editors/masks/text-masks#special-characters), and [literal characters](https://docs.devexpress.com/Blazor/402516/components/data-editors/masks/text-masks#literal-characters) to create a mask pattern and assign it to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxTextMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a text mask:

```
<DxMaskedInput @bind-Value="Value"
               Mask="(000) 000-0000" >
    <DxTextMaskProperties Placeholder="Placeholder" />
</DxMaskedInput>

@code{
    String Value;
    char Placeholder = '#';
}
```

#### Regular Expression

If the mask types listed above do not meet your requirements, you can use [regular expression masks](https://docs.devexpress.com/Blazor/402517/components/data-editors/masks/regular-expression-masks). This mask type allows you to create advanced masks of variable lengths with multiple acceptable patterns and a limited range of character input.

![Regular Expression Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-regular-expression-masks.png)

[Run Demo: Regular Expression Mask](https://demos.devexpress.com/blazor/MaskedInput#RegExMasks)

Follow the steps below to apply a regular expression mask:

1. Set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) property to `RegEx`.
2. Combine [metacharacters](https://docs.devexpress.com/Blazor/402517/components/data-editors/masks/regular-expression-masks#metacharacters), [quantifiers](https://docs.devexpress.com/Blazor/402517/components/data-editors/masks/regular-expression-masks#quantifiers), and [literal characters](https://docs.devexpress.com/Blazor/402517/components/data-editors/masks/regular-expression-masks#literal-characters) to create a mask pattern and assign it to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property.
3. *Optional.* Add the [DxRegExMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRegExMaskProperties) component to the Masked Input markup to customize mask settings.

The following code snippet applies a regular expression mask:

```
<DxMaskedInput @bind-Value="Value"
               Mask="\d{3,10}" 
               MaskMode="@MaskMode.RegEx">
    <DxRegExMaskProperties Placeholder="Placeholder" />
</DxMaskedInput>

@code {
    String Value;
    char Placeholder = '#';
}
```

### Edit Value

Use the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) property to specify an editor value or to bind the displayed text to a data source object. You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Value` property to a data field. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

Also, the specified value should fit the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) pattern. Otherwise, the value cannot be displayed.

```
<DxMaskedInput @bind-Value="Value" Mask="[A-Z]*" MaskMode="MaskMode.RegEx"/>

@code {
    string Value { get; set; } = "TEXT";
}
```

The `Value` property updates its value when the editor loses focus ([OnLostFocus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) mode). You can set the [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.BindValueMode) property to [OnInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) or [OnDelayedInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) to update the `Value` property when a user changes the input value.

### Handle a Value Change

If you do not use two-way data binding, handle the [ValueChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.ValueChanged) event to respond to changes made in the editor. The following code snippet enables the **Update Text** button once a user types in the Masked Input editor.

```
<DxMaskedInput Value="Value"
               ValueChanged="@((int newValue) => OnValueChanged(newValue))"
               Mask="@NumericMask.Currency">
</DxMaskedInput>
<DxButton Enabled="@IsEnabled">Update Value</DxButton>

@code {
    int Value = 0;
    bool IsEnabled = false;

    void OnValueChanged(int newValue)
    {
        Value = newValue;
        if (newValue != 0)
            IsEnabled = true;
        else IsEnabled = false;
    }
}
```

### Disabled and ReadOnly Modes

Use the [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.Enabled) and [ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.ReadOnly) properties to disable and mark the Masked Input component as read-only.

```
<DxMaskedInput @bind-Value="@Value"
               Mask="@NumericMask.Currency"
               ReadOnly="true">
</DxMaskedInput>

<DxMaskedInput @bind-Value="@Value"
               Mask="@NumericMask.Currency"
               Enabled="false">
</DxMaskedInput>

@code {
    double Value { get; set; } = 123.45;
}
```

![Masked Input Disabled ReadOnly](https://docs.devexpress.com/Blazor/images/blazor-dxmaskedinput-disabled-readonly.png)

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify a Masked Input size. The following code snippet applies different size modes to Masked Input components.

```
<DxMaskedInput SizeMode="SizeMode.Small" @bind-Value="@Value" Mask="(000) 000-0000" />

<DxMaskedInput SizeMode="SizeMode.Medium" @bind-Text="@Value" Mask="(000) 000-0000" />

<DxMaskedInput SizeMode="SizeMode.Large" @bind-Text="@Value" Mask="(000) 000-0000" />

@code {
    string Value { get; set; }
}
```

![Masked Input - Size Modes](https://docs.devexpress.com/Blazor/images/blazor-masked-input-size-modes.png)

To apply custom CSS rules to Masked Input, use the [InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.InputCssClass) property. The following code snippet changes the component font:

- [Razor](#tabpanel_oqbT0qOnI8_tabid-razor1)
- [CSS](#tabpanel_oqbT0qOnI8_tabid-css1)

```
<DxMaskedInput @bind-Value="@Value" 
                InputCssClass="my-style"
                Mask="(999) 000-00-00">
</DxMaskedInput>

@code {
    string Value { get; set; }
}
```

![Masked Input - InputCssClass](https://docs.devexpress.com/Blazor/images/blazor-masked-input-css-property.png)

For additional information, refer to the following help topics:

- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes)

### Clear Button and Placeholder

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to display the **Clear** button in the Masked Input editor when it is not empty. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to display the prompt text (placeholder) in the editor when its value is `null`.

![Masked Input Clear Button](https://docs.devexpress.com/Blazor/images/blazor-masked-input-clear-button.png)

```
<DxMaskedInput @bind-Value="@Value"
               ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
               NullText="Specify a phone..."
               Mask="(000) 000-00-00">
</DxMaskedInput>

@code {
    string Value { get; set; }
}
```

[Run Demo: Masked Input - Clear Button and Placeholder](https://demos.devexpress.com/blazor/MaskedInput#ClearButton)

### Add Command Buttons

You can add command buttons to the Masked Input. Refer to [Command Buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) for additional information.

The following code snippet adds the **Send E-mail** button to the Masked Input component.

- [Razor](#tabpanel_CVcRgsOXzz_tabid-razor1)
- [CSS](#tabpanel_CVcRgsOXzz_tabid-css1)

```
<DxMaskedInput Value="@Email"
               ValueChanged="@((string value) => OnEmailChanged(value))"
               Mask="@EmailMask"
               MaskMode="MaskMode.RegEx">
    <Buttons>
        <DxEditorButton IconCssClass="editor-icon editor-icon-mail"
                        Tooltip="Send Email"
                        NavigateUrl="@EmailLink"
                        CssClass="dx-demo-editor-width" />
    </Buttons>
</DxMaskedInput>

@code{
    string Email { get; set; } = "test@example.com";
    string EmailMask { get; set; } = @"(\w|[.-])+@(\w|-)+\.(\w|-){2,4}";
    string EmailLink { get; set; } = "mailto:test@example.com";
    void OnEmailChanged(string email) {
        Email = email;
        EmailLink = $"mailto:{email}";
    }
}
```

![Masked Input - Command Button](https://docs.devexpress.com/Blazor/images/editors/maskedinput-add-command-button.png)

[Run Demo: Editors - Command Buttons](https://demos.devexpress.com/blazor/CommandButtons)

### Input Validation

Refer to the following topics for base information about input validation:

- [Data Editors - Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input)
- [Masks - Masked Editor Validation](https://docs.devexpress.com/Blazor/402513/components/data-editors/masks#masked-editor-validation)

[Run Demo: Form Validation](https://demos.devexpress.com/blazor/FormValidation)

You can add a standalone Masked Input or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to the Blazor standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Starship](#tabpanel_tvuAfuVB+G_tabid-model1)
- [Razor](#tabpanel_tvuAfuVB+G_tabid-razor11)

```
<EditForm Model="@starship" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout >
        <DxFormLayoutItem Caption="Identifier:" ColSpanMd="6" >
            <Template >
                <DxMaskedInput @bind-Value="@starship.Identifier" Mask=".{,16}" MaskMode="@MaskMode.RegEx" />
            </Template >
        </DxFormLayoutItem >
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Starship starship = new Starship();
}
```

Note that if the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property contains strongly required values, the input value is validated even if the corresponding model field does not have the `Required` data validation attribute. The following code specifies a mask for the *EmployeePhone* string field:

```
<EditForm Model="@Model" Context="EditFormContext">
    <DxFormLayout>
        <DxFormLayoutItem Caption="Employee Phone:" ColSpanMd="6">
            <Template>
                <DxMaskedInput @bind-Value="@EmployeePhone" 
                               Mask="(999) 000-0000" />
            </Template>
        </DxFormLayoutItem>
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    public string EmployeePhone { get; set; }
}
```

![Masked Input - Validation](https://docs.devexpress.com/Blazor/images/editors/maskedinput/blazor-maskedinput-validation.png)

To disable input validation, set the [MaskMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.MaskMode) to `RegEx` and set the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Mask) property to a [regular expression](https://docs.devexpress.com/Blazor/402517/components/data-editors/masks/regular-expression-masks) that accepts an empty string.

```
<EditForm Model="@Model" Context="EditFormContext">
    <DxFormLayout>
        <DxFormLayoutItem Caption="Employee Phone:" ColSpanMd="6">
            <Template>
                <DxMaskedInput @bind-Value="@EmployeePhone" 
                               Mask="@(@"(\(\d{0,3}\)\d{3}\-\d{4})?")" 
                               MaskMode="@MaskMode.RegEx" />
            </Template>
        </DxFormLayoutItem>
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    public string EmployeePhone { get; set; }
}
```

An alternative solution is to use the optional digit metacharacter for all digits: `Mask="(999) 999-9999"`.

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Masked Input.

```
<DxMaskedInput @bind-Value="@Value"
               Mask="(000) 000-0000"
               @onfocusout="MyFunction" />

@AlertText

@code {
    string Value { get; set; }

    void MyFunction()
    {
        AlertText = $"The Masked Input is out of focus!";
    }
}
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

#### Full-Width Numerals (IME)

The Masked Input mask does not support full-width numerals produced by Input Method Editors (IMEs). The editor accepts only standard ASCII digits.

As a workaround, you can implement a JavaScript function that handles the component input element’s `beforeinput` and `paste` events to convert input data to a standard string.