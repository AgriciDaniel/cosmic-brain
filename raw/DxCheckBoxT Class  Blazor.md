---
title: "DxCheckBox<T> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1"
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

## DxCheckBox<T> Class

In This Article

A check box control that allows users to toggle between two or three states.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxCheckBox<T> :
    DxDataEditor<T>,
    IFocusableEditor,
    ICheckBoxInternalOwner,
    IRequireSelfCascading
```

## Type Parameters

| Name | Description |
| --- | --- |
| T | The data type. |

## Remarks

DevExpress CheckBox for Blazor (`DxCheckBox`) supports the checked, unchecked, and indeterminate (optional) states.

To switch the state, users can click the checkbox or press Space when the checkbox is focused.

![CheckBox Overview](https://docs.devexpress.com/Blazor/images/editors/checkbox/blazor-checkbox-overview.png)

[Run Demo: CheckBox - Overview](https://demos.devexpress.com/blazor/CheckBox)

### Add a CheckBox to a Project

Follow the steps below to add the CheckBox component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxCheckBox>` … `</DxCheckBox>` markup to a `.razor` file.
3. Configure the component: specify the checkbox’s state, handle state changes, customize appearance, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxCheckBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1._members).

### Static Render Mode Specifics

Blazor CheckBox does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Checkbox States

The [Checked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.Checked) property specifies a checkbox’s state. The `Checked` property’s type defines whether the checkbox supports the indeterminate state.

<table><tbody><tr><th><p>Data Type</p></th><th><p>Checked State</p></th><th><p>Unchecked State</p></th><th><p>Indeterminate State</p></th></tr><tr><td><p><a href="https://learn.microsoft.com/dotnet/api/system.boolean">Boolean</a></p></td><td><p><code>true</code></p></td><td><p><code>false</code></p></td><td><p>(not supported)</p></td></tr><tr><td><p><a href="https://learn.microsoft.com/dotnet/api/system.nullable">Nullable Boolean</a></p></td><td><p><code>true</code></p></td><td><p><code>false</code></p></td><td><p><code>null</code></p></td></tr><tr><td><p><a href="https://learn.microsoft.com/dotnet/api/system.string">String</a></p></td><td><p><strong>“true”</strong></p></td><td><p><strong>“false”</strong></p></td><td><p><code>null</code> or any other value</p></td></tr><tr><td><p><a href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types">Unsigned Integer Numeric Types</a></p></td><td><p><code>1</code></p></td><td><p><code>0</code></p></td><td><p><code>2</code> or any other value</p></td></tr><tr><td><p><a href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types">Signed Integer Numeric Types</a></p></td><td><p><code>1</code></p></td><td><p><code>0</code></p></td><td><p><code>-1</code> or any other value</p></td></tr><tr><td><p><a href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types">Floating-Point Numeric Types</a></p></td><td><p><code>1</code></p></td><td><p><code>0</code></p></td><td><p><code>-1</code> or any other value</p></td></tr><tr><td><p>Other Data Types</p></td><td colspan="3"><p>See for additional information.</p></td></tr></tbody></table>

[Run Demo: CheckBox - Overview](https://demos.devexpress.com/blazor/CheckBox#Overview) [Run Demo: CheckBox - Customize Layout](https://demos.devexpress.com/blazor/CheckBox#CustomizeLayout)

#### Checked/Unchecked States

The following sample creates a checkbox with the checked and unchecked states. The `Checked` property is bound to a [Boolean](https://learn.microsoft.com/dotnet/api/system.boolean) object. The default checkbox state is unchecked.

```
<DxCheckBox @bind-Checked="@Value">@GetText()</DxCheckBox>

@code{
    bool Value { get; set; }

    string GetText() {
        if (Value) return "Checked";
        else return "Unchecked";
    }
}
```

#### Indeterminate State

The following sample creates a checkbox with the indeterminate state. The `Checked` property is bound to a [Nullable Boolean](https://learn.microsoft.com/dotnet/api/system.nullable) object.

Set the [AllowIndeterminateStateByClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.AllowIndeterminateStateByClick) property to `true` to allow users to set the indeterminate state.

```
<DxCheckBox @bind-Checked="@Value" AllowIndeterminateStateByClick="true">@GetText()</DxCheckBox>

@code{
    bool? Value { get; set; }

    string GetText() {
        if (Value == true) return "Checked";
        if (Value == false) return "Unchecked";
        return "Indeterminate";
    }
}
```

The default checkbox state is indeterminate. Users can change the state in the following order: Indeterminate → Checked → Unchecked → Indeterminate, and so on.

If the **AllowIndeterminateStateByClick** is set to `false`, users can switch states in the following order: Indeterminate (default) → Checked → Unchecked → Checked → Unchecked, and so on.

### Respond to State Changes

The [CheckedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.CheckedChanged) event occurs each time the [Checked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.Checked) property value changes. The following example handles this event and use the current checkbox state to enable/disable other checkboxes (change the [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.Enabled) property value):

```
<DxCheckBox Checked="@Checked" CheckedChanged="@((bool value) => OnCheckedChanged(value))">Silent Mode</DxCheckBox>
<DxCheckBox @bind-Checked="@SubChecked1" Enabled="@Enabled">Enable sound</DxCheckBox>
<DxCheckBox @bind-Checked="@SubChecked2" Enabled="@Enabled">Enable vibration</DxCheckBox>

@code{
    bool Enabled { get; set; } = false;

    bool Checked { get; set; } = true;
    bool SubChecked1 { get; set; } = true;
    bool SubChecked2 { get; set; } = false;

    void OnCheckedChanged(bool value) {
        Checked = value;
        Enabled = !value;
    }
}
```

### Bind to Custom Data Types

You can also bind `<DxCheckBox>` ‘s state to a custom data type ([Enum](https://learn.microsoft.com/dotnet/api/system.enum), [Object](https://learn.microsoft.com/dotnet/api/system.object), etc.) Use the following properties to explicitly specify how to consider type values:

- [ValueChecked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.ValueChecked) - Specifies a value that corresponds to the checked state.
- [ValueUnchecked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.ValueUnchecked) - Specifies a value that corresponds to the unchecked state.
- [ValueIndeterminate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.ValueIndeterminate) - Specifies a value that corresponds to the indeterminate state.

If a value is not equal to the specified properties, it is considered as indeterminate.

The following example binds the `<DxCheckBox>` to an Enum object:

```
<DxCheckBox Checked="Opinion.Yes" Enabled="false" ValueChecked="@Opinion.Yes" 
            ValueUnchecked="@Opinion.No" ValueIndeterminate="@Opinion.Abstain">Disabled Checked</DxCheckBox>
<DxCheckBox Checked="Opinion.No" Enabled="false" ValueChecked="@Opinion.Yes" 
            ValueUnchecked="@Opinion.No" ValueIndeterminate="@Opinion.Abstain">Disabled Unchecked</DxCheckBox>
<DxCheckBox Checked="Opinion.Abstain" Enabled="false" ValueChecked="@Opinion.Yes" 
            ValueUnchecked="@Opinion.No" ValueIndeterminate="@Opinion.Abstain">Disabled Indeterminate</DxCheckBox>

@code{
    enum Opinion { Yes, No, Abstain }
}
```

![CheckBox Enabled](https://docs.devexpress.com/Blazor/images/editors/checkbox/blazor-checkbox-enabled.png)

[Run Demo: CheckBox - Bind to Custom Data Types](https://demos.devexpress.com/blazor/CheckBox#BindToEnum)

### Switch Mode

Set the [CheckType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.CheckType) property to `Switch` to display the `<DxCheckBox>` as a toggle switch.

```
<DxCheckBox CheckType="CheckType.Switch" Checked="@Checked" 
            CheckedChanged="@((bool value) => CheckedChanged(value))">Silent Mode</DxCheckBox>
<DxCheckBox CheckType="CheckType.Switch" @bind-Checked="@SubChecked1" Enabled="@Enabled">Enable sound</DxCheckBox>
<DxCheckBox CheckType="CheckType.Switch" @bind-Checked="@SubChecked2" Enabled="@Enabled">Enable vibration</DxCheckBox>

@code{
    bool Enabled { get; set; } = false;

    bool Checked { get; set; } = true;
    bool SubChecked1 { get; set; } = true;
    bool SubChecked2 { get; set; } = false;

    void CheckedChanged(bool value) {
        Checked = value;
        Enabled = !value;
    }
}
```

![CheckBox CheckType Switch With Enabled](https://docs.devexpress.com/Blazor/images/editors/checkbox/blazor-checkbox-checktype-switch-with-enabled.png)

Users can choose between the checked and unchecked states. The indeterminate state is not supported in this mode and is considered as unchecked.

[Run Demo: CheckBox - Switch Mode](https://demos.devexpress.com/blazor/CheckBox#Switch)

### Content Position

Use the [Alignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.Alignment) and [LabelPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.LabelPosition) properties to align the checkbox’s child content (text label) and check mark relative to each other.

```
<div>
    <div>
        <DxCheckBox Checked="true" 
                    LabelPosition="LabelPosition.Left" 
                    Alignment="CheckBoxContentAlignment.Center">Multimedia</DxCheckBox>
    </div>   
    <div>
        <DxCheckBox Checked="false" 
                    LabelPosition="LabelPosition.Left" 
                    Alignment="CheckBoxContentAlignment.Center">Air Conditioning</DxCheckBox> 
    </div>
    @* ... *@
</div>
```

![Checkbox Alignment Demo](https://docs.devexpress.com/Blazor/images/editors/checkbox/blazor-checkbox-alignment-demo.png)

If the label is too long to fit the parent component’s width, you can use the [LabelWrapMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.LabelWrapMode) property to specify how to treat the remaining part of the label.

- [Razor](#tabpanel_iKb+j8PlMe_tabid-razor1)
- [CSS](#tabpanel_iKb+j8PlMe_tabid-model1)

```
<div class="my-container">
    <DxCheckBox @bind-Checked="@Value" LabelWrapMode="LabelWrapMode.NoWrap">Parking camera</DxCheckBox>
    <DxCheckBox @bind-Checked="@Value" LabelWrapMode="LabelWrapMode.WordWrap">Heated seats</DxCheckBox>
    <DxCheckBox @bind-Checked="@Value" LabelWrapMode="LabelWrapMode.Ellipsis">Air conditioning</DxCheckBox>
</div>

@code {
    bool Value { get; set; }
}
```

![Wrapping modes](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-wrapping-modes-comparison.png)

[Run Demo: CheckBox - Alignment](https://demos.devexpress.com/blazor/CheckBox#Alignment)

### Custom Appearance

You can customize the appearance of the checkbox (or toggle switch). To do this, define the appearance between the `<DxCheckBox>` and `</DxCheckBox>` tags and set the [DisableDefaultRender](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1.DisableDefaultRender) property to `true` to hide the check mark (toggle switch).

```
<DxCheckBox @bind-Checked="@Value" DisableDefaultRender="true">
   // Add child content here...         
</DxCheckBox>

@code{
    bool? Value { get; set; } = true;
    // ...
}
```

![CheckBox Custom Content](https://docs.devexpress.com/Blazor/images/editors/checkbox/blazor-checkbox-custom-content.png)

[Run Demo: CheckBox - Custom Appearance](https://demos.devexpress.com/blazor/CheckBox#CustomizeLayout)

### Input Validation

You can add a standalone checkbox or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Model](#tabpanel_iKb+j8PlMe-1_tabid-model1)
- [Razor](#tabpanel_iKb+j8PlMe-1_tabid-razor1)

```
<EditForm Model="@model" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout >
        <DxFormLayoutItem Caption="Checked:" ColSpanMd="6" >
            <Template >
                <DxCheckBox @bind-Checked="@model.Checked" />
            </Template>
        </DxFormLayoutItem>
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Model model = new Model();
}
```

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

[Run Demo: Form Validation](https://demos.devexpress.com/blazor/FormValidation)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxDataEditor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1) <T>

DxCheckBox<T>

See Also