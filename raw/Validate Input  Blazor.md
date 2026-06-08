---
title: "Validate Input | Blazor"
source: "https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input"
author:
published: 2001-01-22
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Validate Input

In This Article

Use standard Blazor [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation) to validate data input. Inside the form, you can display a [DevExpress Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component or any [DevExpress standalone data editor](https://docs.devexpress.com/Blazor/401156/components/data-editors). The EditForm reads [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and [indicates any errors](https://docs.devexpress.com/Blazor/404263/security-considerations/validate-user-input).

![Form Layout Validation](https://docs.devexpress.com/Blazor/images/editors/blazor-editors-validation-overview.png)

The following table lists data editors and their properties you can validate in the `EditForm`:

| Data Editor | Property |
| --- | --- |
| [DxCalendar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCalendar-1) | [SelectedDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCalendar-1.SelectedDate), [SelectedDates](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCalendar-1.SelectedDates) |
| [DxCheckBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1) | [Checked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.Checked) |
| [DxComboBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2) | [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2.Text), [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2.Value) |
| [DxDateEdit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1) | [Date](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Date) |
| [DxDropDownBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox) | [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.Value) |
| [DxListBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxListBox-2) | [Values](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxListBox-2.Values) |
| [DxMaskedInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1) | [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1.Value) |
| [DxMemo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo) | [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.Text) |
| [DxRadio](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadio-1) | [GroupValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadio-1.GroupValue) |
| [DxRadioGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2) | [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.Value) |
| [DxSpinEdit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) | [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.Value) |
| [DxTagBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTagBox-2) | [Tags](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTagBox-2.Tags), [Values](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTagBox-2.Values) |
| [DxTextBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox) | [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox.Text) |

[View Example: DevExpress Blazor Data Editors – Using Google reCAPTCHA](https://github.com/DevExpress-Examples/blazor-data-editors-add-recaptcha)

> [!important] Important
> You should not rely on form validation alone to secure your Blazor-powered app. Form validation is designed to improve usability. A threat actor can bypass validation and send malicious data to the server. To minimize security related threats/risks, you must validate user input using multiple strategies. Refer to the following topic for additional information: [Validate User Input](https://docs.devexpress.com/Blazor/404263/security-considerations/validate-user-input).

## Standard Validation Mechanism

If users submit an `EditForm`, they initiate input validation based on the edit context. DevExpress Blazor Editors support this standard data validation technique. For additional information on how validation works in Blazor, refer to Microsoft documentation: [Forms and validation](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms-validation).

The sections below describe how to set up validation for DevExpress Blazor Editors.

### Set Up a Validation Model

Create a model and apply [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) to model fields.

- [C#](#tabpanel_688nLWvF+Z_tabid-cs)

```csharp
using System.ComponentModel.DataAnnotations;

public class MyModel {
    [Required]
    [StringLength(10, ErrorMessage = "Name is too long.")]
    public string Name { get; set; }
    // ...
}
```

Declare [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation) markup and assign a model object to the EditForm’s [Model](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.model) property. The [edit context](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.editcontext) is constructed based on this model. To supply the edit context explicitly, assign it to the [EditContext](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.editcontext) property and do not specify the `Model` property.

- [Razor](#tabpanel_688nLWvF+Z-1_tabid-razor)

```
<EditForm Model="@model">
</EditForm>

@code {
    private MyModel model = new MyModel();
    // ...
}
```

Add a [DataAnnotationsValidator](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.dataannotationsvalidator) component to enable validation based on annotation attributes.

- [Razor](#tabpanel_688nLWvF+Z-2_tabid-razor)

```
<EditForm Model="@model">
    <DataAnnotationsValidator />
</EditForm>
```

### Set Up Components for Validation

Add standalone data editors or a Form Layout with data editors to the `EditForm`. Use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to implement [two-way binding](https://docs.devexpress.com/Blazor/403285/troubleshooting/editor-related-issues/system-argument-null-exception-requires-a-value-for-the-expression-property) between editor properties and model fields with data annotations. New input triggers [edit context](https://docs.devexpress.com/Blazor/403276/troubleshooting/common-component-issues/the-child-content-element-uses-the-same-parameter-name) updates.

- [Razor](#tabpanel_688nLWvF+Z-3_tabid-razor)

```
<EditForm Model="@model" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout Context="FormLayoutContext">
        <DxFormLayoutItem Caption="Name:" ColSpanMd="6" >
            <DxTextBox @bind-Text="@model.Name" />
        </DxFormLayoutItem >
    </DxFormLayout>
    @*...*@
</EditForm>
```

### Display Validation Results

Editors can notify users about validation results in a number of ways: icons, colored outlines, and validation messages.

#### Validation Icons and Colored Outlines

Blazor data editors can display validation icons and colored outlines based on validation results. Editors with default settings display red outlines and error icons when validation fails, but do not indicate the success status for valid inputs.

You can use the following properties to change how editors display their validation status:

ShowValidationIcon

Use [ShowValidationIcon](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Configuration.GlobalOptions.ShowValidationIcon) global option or an editor’s `ShowValidationIcon` property to specify whether an editor shows a validation icon: or. The following code disables validation icons in the Text Box:

- [Razor](#tabpanel_688nLWvF+Z-4_tabid-razor)

```
<DxTextBox @bind-Text="@model.Name"
        ShowValidationIcon="false" />
```

ShowValidationSuccessState

Use The [ShowValidationSuccessState](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Configuration.GlobalOptions.ShowValidationSuccessState) global option or an editor’s `ShowValidationSuccessState` property to specify whether an editor indicates successful validation. It displays a green outline and can show a success icon (if the `ShowValidationIcon` is set to `true`). The following code enables a green outline for valid input in the Text Box.

- [Razor](#tabpanel_688nLWvF+Z-5_tabid-razor)

```
<DxTextBox @bind-Text="@model.Name"
        ShowValidationSuccessState="true" />
```

Note that when `ShowValidationSuccessState` is `true`, and `ShowValidationIcon` is `false`, only green outlines indicate the success status.

The following table demonstrates different configurations:

|  | Valid Value | Invalid Value |
| --- | --- | --- |
| Default configuration   `ShowValidationIcon = "true"`   `ShowValidationSuccessState = "false"` | ![Valid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-valid-1.png) | ![Invalid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-invalid-1.png) |
| `ShowValidationIcon = "false"`   `ShowValidationSuccessState = "false"` | ![Valid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-valid-1.png) | ![Invalid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-invalid-2.png) |
| `ShowValidationIcon = "true"`   `ShowValidationSuccessState = "true"` | ![Valid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-valid-2.png) | ![Invalid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-invalid-1.png) |
| `ShowValidationIcon = "false"`   `ShowValidationSuccessState = "true"` | ![Valid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-valid-3.png) | ![Invalid Input](https://docs.devexpress.com/Blazor/images/editors/blazor-validate-input-invalid-2.png) |

[Run Demo: Form Validation - Form Layout](https://demos.devexpress.com/blazor/FormValidation#FormLayout)

#### Validation Messages

Use the [ValidationMessage](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationmessage-1) component to display messages for individual data editors or the [ValidationSummary](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationsummary) component to summarize validation messages.

- [Razor](#tabpanel_688nLWvF+Z-6_tabid-razor)

```
<DxFormLayout Context="FormLayoutContext">
    @*...*@
    <DxFormLayoutItem ColSpanMd="12">
        <ValidationSummary />
    </DxFormLayoutItem>
</DxFormLayout>
```

[Run Demo: Form Validation - Form Layout](https://demos.devexpress.com/blazor/FormValidation#FormLayout)

You can also use the [InvalidInputNotificationText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxMaskPropertiesBase.InvalidInputNotificationText) property to specify a validation message for masked data editors. Refer to the following topic for additional information: [Masked Editor Validation](https://docs.devexpress.com/Blazor/402513/components/data-editors/masks#masked-editor-validation).

### Submit a Form

Add a [DxButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.SubmitFormOnClick) or [DxToolbarItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.SubmitFormOnClick) object to the markup and set the object’s `SubmitFormOnClick` property to `true`. The form is submitted when a user clicks this button or item.

- [Razor](#tabpanel_688nLWvF+Z-7_tabid-razor)

```
<DxFormLayout Context="FormLayoutContext">
    @*...*@
    <DxFormLayoutItem>
        <DxButton SubmitFormOnClick="true" Text="Submit" RenderStyle="@ButtonRenderStyle.Secondary" />
    </DxFormLayoutItem>
</DxFormLayout>
```

If you want to respond to form submission, specify the `EditForm` ‘s [OnValidSubmit](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.onvalidsubmit) and [OnInvalidSubmit](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.oninvalidsubmit) callbacks. They are triggered when the form passed and failed validation, respectively. For instance, you can post valid values to an underlying data source. Alternatively, you can specify the [OnSubmit](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform.onsubmit) callback to check field values and trigger validation manually.

- [Razor](#tabpanel_688nLWvF+Z-8_tabid-razor)

```
<EditForm Model="@model" 
          Context="EditFormContext"
          OnValidSubmit="@HandleValidSubmit" 
          OnInvalidSubmit="@HandleInvalidSubmit">
    @*...*@
</EditForm>
```

## Custom Validation

You can implement custom validation logic if the standard validation methods do not meet your requirements.

### Validation Attribute

Follow the steps below to create a custom validation attribute:

1. Create a [ValidationAttribute](https://learn.microsoft.com/dotnet/api/system.componentmodel.dataannotations.validationattribute) class descendant.
2. Override the [IsValid](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute.isvalid) method to implement custom validation logic. This method has two overloads: one overload accepts only the object that should be validated; the other also accepts a [ValidationContext](https://learn.microsoft.com/dotnet/api/system.componentmodel.dataannotations.validationcontext) object that stores additional information about the validation operation.
3. Apply the [AttributeUsageAttribute](https://learn.microsoft.com/dotnet/api/system.attributeusageattribute) to the class. Specify where and how your new custom attribute can be used.
4. Apply the custom attribute to a model field.

- [Starship](#tabpanel_688nLWvF+Z-9_tabid-Starship)

```csharp
using System.ComponentModel.DataAnnotations;

public class Starship {
    // ...

    [DateInPastAttribute(ErrorMessage = "The Production Date value cannot be later than today.")]
    public DateTime ProductionDate { get; set; }
}

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, 
                AllowMultiple = false)]
public class DateInPastAttribute: ValidationAttribute {
    public override bool IsValid(object value) {
        return (DateTime)value <= DateTime.Today;
    }
}
```

For additional information, refer to Microsoft documentation: [Custom attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation#custom-attributes).

### Validator Component

Follow the steps below to create a custom validation component:

1. Create a [ComponentBase](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.componentbase) descendant (`CustomValidation` in the example below).
2. Implement a property that reflects the Edit Form’s `EditContext`. Decorate it with the [CascadingParameter](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/cascading-values-and-parameters) attribute.
3. In the `OnInitialized` method, create a [ValidationMessageStore](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationmessagestore) instance that stores a list of form errors.
4. Implement the `DisplayErrors` method to receive validation errors and save them to a dictionary.
5. Implement the `ClearErrors` method to clear the list of error messages.
6. Place the `CustomValidation` component to the Edit Form.

- [CustomValidation.cs](#tabpanel_688nLWvF+Z-10_tabid-validationcomponent)
- [Razor](#tabpanel_688nLWvF+Z-10_tabid-customRazor)

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;

namespace DxBlazorApplication1.Data {
    public class CustomValidation : ComponentBase {
        [CascadingParameter]
        private EditContext? CurrentEditContext { get; set; }
        private ValidationMessageStore? messageStore;
        protected override void OnInitialized() {
            messageStore = new(CurrentEditContext);
            CurrentEditContext.OnValidationRequested += (s, e) => messageStore?.Clear();
            CurrentEditContext.OnFieldChanged += (s, e) => messageStore?.Clear(e.FieldIdentifier);
        }
        public void DisplayErrors(Dictionary<string, List<string>> errors) {
            if (CurrentEditContext is not null) {
                foreach (var err in errors) {
                    messageStore?.Add(CurrentEditContext.Field(err.Key), err.Value);
                }
                CurrentEditContext.NotifyValidationStateChanged();
            }
        }
        public void ClearErrors() {
            messageStore?.Clear();
            CurrentEditContext?.NotifyValidationStateChanged();
        }
    }
}
```

For additional information, refer to Microsoft documentation: [Validator components](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation#validator-components).

## Disable Validation

Set an editor’s `ValidationEnabled` to `false` to disable validation.

The following code disables input validation in the List Box component:

```
<EditForm Model="@model">
    <DataAnnotationsValidator />
    @*...*@
    <DxListBox Data="@model.Names" 
               @bind-Values="@Values" 
               ValidationEnabled="false"/>
    @*...*@
</EditForm>
```

You can also disable validation for editors placed in the [Grid](https://docs.devexpress.com/Blazor/404443/components/grid/editing-and-validation/validation#disable-validation) or [TreeList](https://docs.devexpress.com/Blazor/405175/components/treelist/editing-and-validation/validation#disable-validation) component. These components have their own `ValidationEnabled` properties.

## Examples

See sections below for different editor validation examples.

### Standalone Data Editors

The following example validates user input in a standalone [Text Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox), [Combo Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2), [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1), and [Date Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1). The [ValidationMessage](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationmessage-1) component displays error messages for each editor.

![Validate Input in Data Editors](https://docs.devexpress.com/Blazor/images/blazor-validate-input-data-editors.png)

- [Starship](#tabpanel_688nLWvF+Z-11_tabid-model2)
- [Classification](#tabpanel_688nLWvF+Z-11_tabid-3)
- [Razor](#tabpanel_688nLWvF+Z-11_tabid-razor2)
- [CSS](#tabpanel_688nLWvF+Z-11_tabid-4)

```
<EditForm Model="@starship" OnValidSubmit="@HandleValidSubmit" OnInvalidSubmit="@HandleInvalidSubmit">
    <DataAnnotationsValidator />
    <div class="row">
        <div class="col-md-6" class="my-padding">
            <label for="identifier">Identifier: </label>
            <DxTextBox Id="identifier" @bind-Text="@starship.Identifier" />
            <ValidationMessage For="@(() => starship.Identifier)" />
        </div>
        <div class="col-md-6" class="my-padding">
            <label for="classification">Primary Classification: </label>
            <DxComboBox Id="classification" NullText="Select classification ..."
                        ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
                        Data="@(new List<Classification>() { new Classification(1, "Defense"),
                                                             new Classification(2, "Exploration"),
                                                             new Classification(3, "Diplomacy") })"
                        TextFieldName="Value"
                        ValueFieldName="Id"
                        @bind-Value="@starship.Classification" />
            <ValidationMessage For="@(() => starship.Classification)" />
        </div>
        <div class="col-md-6" class="my-padding">
            <label for="accommodation">Maximum Accommodation: </label>
            <DxSpinEdit Id="accommodation" @bind-Value="@starship.MaximumAccommodation" />
            <ValidationMessage For="@(() => starship.MaximumAccommodation)" />
        </div>
        <div class="col-md-6" class="my-padding">
            <label for="productionDate">Production Date: </label>
            <DxDateEdit @bind-Date="@starship.ProductionDate" />
            <ValidationMessage For="@(() => starship.ProductionDate)" />
        </div>
        <div class="col-md-12">
            <DxButton SubmitFormOnClick="true" Text="Submit" RenderStyle="@ButtonRenderStyle.Secondary" />
        </div>
    </div>
</EditForm>

@code {
    private Starship starship = new Starship();

    private void HandleValidSubmit() {
        Console.WriteLine("OnValidSubmit");
    }
    private void HandleInvalidSubmit() {
        Console.WriteLine("OnInvalidSubmit");
    }
}
```

[Run Demo: Form Validation - Custom Form](https://demos.devexpress.com/blazor/FormValidation#CustomForm)

### Form Layout

The following example validates user input in the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component with four [layout items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem). These items contain the following data editors: [Text Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox), [Combo Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2), [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1), and [Date Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1).

One layout item contains the [ValidationSummary](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationsummary) component that displays all the error messages. The last layout item contains the [Button](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton) that submits the form.

![Validate Input in Form Layout](https://docs.devexpress.com/Blazor/images/blazor-validate-input-show-validation-icon.png)

- [Razor](#tabpanel_688nLWvF+Z-12_tabid-razor1)

```
@using System.ComponentModel.DataAnnotations
<div class="cw-880">
    <EditForm Model="@starship"
              OnValidSubmit="@HandleValidSubmit"
              OnInvalidSubmit="@HandleInvalidSubmit"
              Context="EditFormContext">
        <DataAnnotationsValidator/>
        <DxFormLayout>
            <DxFormLayoutItem Caption="Identifier:" ColSpanMd="6">
                <DxTextBox @bind-Text="@starship.Identifier" ShowValidationIcon="true"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Primary Classification:" ColSpanMd="6">
                <DxComboBox NullText="Select classification ..."
                            ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
                            Data="classifications"
                            @bind-Value="@starship.Classification"
                            ShowValidationIcon="true"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Maximum Accommodation:"
                              ColSpanMd="6">
                <DxSpinEdit Id="accommodation" ShowValidationIcon="true"
                            @bind-Value="@starship.MaximumAccommodation"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Production Date:"
                              ColSpanMd="6">
                <DxDateEdit @bind-Date="@starship.ProductionDate" ShowValidationIcon="true"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Description:"
                              ColSpanMd="12">
                <DxMemo @bind-Text="@starship.Description" ShowValidationIcon="true"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem ColSpanMd="12">
                <DxButton SubmitFormOnClick="true"
                          Text="Submit"
                          RenderStyle="ButtonRenderStyle.Secondary"/>
            </DxFormLayoutItem>
            <DxFormLayoutItem ColSpanMd="12">
                <ValidationSummary/>
            </DxFormLayoutItem>
        </DxFormLayout>
        <div class="row w-100 mx-0">
            <p class="demo-text col-12 mt-2">
                Form Validation State: <b>@FormValidationState</b>
            </p>
        </div>
    </EditForm>
</div>

@code {
    string FormValidationState = @"Press the ""Submit"" button to validate the form.";
    Starship starship = new Starship() { ProductionDate = DateTime.Now + TimeSpan.FromDays(1) };
    List<string> classifications = new List<string>() { "Defense", "Exploration", "Diplomacy" };
    void HandleValidSubmit() {
        FormValidationState = @"Form data is valid";
    }
    void HandleInvalidSubmit() {
        FormValidationState = @"Form data is invalid";
    }
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class DateInPastAttribute : ValidationAttribute {
        public override bool IsValid(object value) {
            return (DateTime)value <= DateTime.Today;
        }
    }
    public class Starship {
        [Required(ErrorMessage = "The Identifier value should be specified.")]
        [StringLength(16, ErrorMessage = "The Identifier exceeds 16 characters.")]
        public string Identifier { get; set; }
        [Required(ErrorMessage = "The Primary Classification value should be specified.")]
        public string Classification { get; set; }
        [Range(1, 100000, ErrorMessage = "The Maximum Accommodation value should be a number between 1 and 100,000.")]
        public int MaximumAccommodation { get; set; }
        [Required]
        [DateInPastAttribute(ErrorMessage = "The Production Date value cannot be later than today.")]
        public DateTime ProductionDate { get; set; }
        [Required(ErrorMessage = "The Description should be specified.")]
        public string Description { get; set; }
    }
}
```

[Run Demo: Form Validation - Form Layout](https://demos.devexpress.com/blazor/FormValidation#FormLayout)

### Data Editors Inside Another Component

To validate user input in a data editor that is placed in another Blazor component, follow the steps below:

1. Create a [custom Blazor component](https://docs.devexpress.com/Blazor/401753/common-concepts/customize-and-reuse-components) and add a data editor. Define parameters that are passed to the editor’s `<PropertyName>` and `<PropertyName>Expression` properties and handle the `<PropertyName>Changed` event as shown below. The following code snippet creates `MyComponent` with a [Text Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox):
	- [MyComponent.razor](#tabpanel_688nLWvF+Z-13_tabid-mycomponent)
	```
	<DxTextBox Text="Value" TextChanged="OnTextChanged" TextExpression="@ValueExpression" InputId=@InputId />
	@code {
	    [EditorRequired][Parameter]
	    public string InputId { get; set; } = "";
	    [Parameter]
	    public string? Value { get; set; }
	    [Parameter]
	    public EventCallback<string?> ValueChanged { get; set; }
	    [Parameter]
	    public Expression<Func<string?>>? ValueExpression { get; set; }
	    private async Task OnTextChanged(string? newValue) => await ValueChanged.InvokeAsync(newValue);
	}
	```
2. Register the [System.Linq.Expressions](https://learn.microsoft.com/dotnet/api/system.linq.expressions) namespace in the `_Imports.razor` file to use the [Expression](https://learn.microsoft.com/dotnet/api/system.linq.expressions.expression) class.
	- [\_Imports.razor](#tabpanel_688nLWvF+Z-14_tabid-imports)
	```
	@using System.Linq.Expressions
	```
3. Apply [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) to model fields. Add `MyComponent` to [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation).
	- [Customer](#tabpanel_688nLWvF+Z-15_tabid-customer)
	- [Razor](#tabpanel_688nLWvF+Z-15_tabid-razor-index)
	```
	<EditForm Model="@customer" OnValidSubmit="@HandleValidSubmit" OnInvalidSubmit="@HandleInvalidSubmit" 
	        Context="EditFormContext">
	    <DataAnnotationsValidator />
	    <div class="container">
	        <div class="col">
	            <div class="row"><h5>@nameof(customer.FirstName)</h5></div>
	            <div class="row">
	                <div class="form-group">
	                    <MyComponent @bind-MyValue="@customer.FirstName" />
	                    <ValidationMessage For="@(() => customer.FirstName)" />
	                </div>
	            </div>
	        </div>
	        <div class="col">
	            <div class="row"><h5>@nameof(customer.LastName)</h5></div>
	            <div class="row">
	                <div class="form-group">
	                    <MyComponent @bind-MyValue="@customer.LastName" />
	                    <ValidationMessage For="@(() => customer.LastName)" />
	                </div>
	            </div>
	        </div>
	        <div class="row">
	            <div class="col">
	                <div class="form-group ">
	                    <DxButton SubmitFormOnClick="true" Text="Submit" 
	                              RenderStyle="@ButtonRenderStyle.Primary" />
	                </div>
	            </div>
	        </div>
	    </div>
	</EditForm>
	```

![Validate Editors in Another Component](https://docs.devexpress.com/Blazor/images/blazor-validate-editors-in-another-components.png)

See Also