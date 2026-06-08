---
title: "DxDropDownBox Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox"
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

## DxDropDownBox Class

In This Article

An editor with a drop-down window.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDropDownBox :
    DxEditorBase,
    IDropDownBox,
    IEditorBase,
    IDropDownOwner
```

## Remarks

The DevExpress Drop-Down Box for Blazor (< `DxDropDownBox` >) displays a drop-down window that can contain any UI element: a list, tree view, data grid, or combination of controls. The editor’s input element is read-only for users. Depending on user interaction with window content, you can assign an editor value programmatically.

![Drop-Down Box Containing a Grid](https://docs.devexpress.com/Blazor/images/blazor-dropdownbox-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/DropDownBox)

### Add a Drop-Down Box to a Project

Follow the steps below to add a Drop-Down Box component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxDropDownBox>` … `</DxDropDownBox>` markup to a `.razor` file.
3. Add drop-down window content in the [DropDownBodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownBodyTemplate) markup.
4. *Optional.* Define the windows’s [DropDownHeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownHeaderTemplate) and [DropDownFooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownFooterTemplate).
5. Write code that manages the.
6. Use [QueryDisplayText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.QueryDisplayText) or [EditBoxDisplayTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.EditBoxDisplayTemplate) property to specify how the editor value is displayed in the input element.
7. *Optional.* Configure other options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxDropDownBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox._members).

### Static Render Mode Specifics

Blazor Drop-Down Box does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Drop-Down Window Content

The drop-down window can include a header, body, and footer. Use the following properties to populate these window regions with content:

- [DropDownHeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownHeaderTemplate)
- [DropDownBodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownBodyTemplate)
- [DropDownFooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownFooterTemplate)

```
<DxDropDownBox @bind-Value="Value" QueryDisplayText="QueryText">
    <DropDownHeaderTemplate>
        <span class="oi oi-person" />
        Select Employees:
    </DropDownHeaderTemplate>
    <DropDownBodyTemplate>
        <DxListBox Data="@ListBoxData" ... />
    </DropDownBodyTemplate>
    <DropDownFooterTemplate>
        <DxButton Text="OK" ... />
        <DxButton Text="Cancel" ... />
    </DropDownFooterTemplate>
</DxDropDownBox>
```

![Templated Drop-Down Window](https://docs.devexpress.com/Blazor/images/blazor-dropdownbox-templates.png)

### Edit Value and Display Text

The editor’s input element is read-only for users. Use the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.Value) property to assign an editor value programmatically. To respond to value changes, handle the [ValueChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.ValueChanged) event.

You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Value` property to a data field. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

Implement the [QueryDisplayText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.QueryDisplayText) function or populate the [EditBoxDisplayTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.EditBoxDisplayTemplate) property to define how the editor value is displayed in the input element.

[Run Demo: DropDown Box - Multiple Selection ListBox](https://demos.devexpress.com/blazor/DropDownBox#MultipleSelectionListBox)

```
<DxDropDownBox @bind-Value="Value" QueryDisplayText="QueryText" >
    <DropDownBodyTemplate>
        <DxListBox Values="@(GetListBoxValues(context.DropDownBox))"
                   ValuesChanged="@(values => ListBoxValuesChanged(values, context.DropDownBox))" ... />
    </DropDownBodyTemplate>
</DxDropDownBox>

@code {
    object Value { get; set; }

    IEnumerable<Employee> GetListBoxValues(IDropDownBox dropDownBox) {
        return dropDownBox.Value as IEnumerable<Employee>;
    }

    string QueryText(DropDownBoxQueryDisplayTextContext arg) {
        var names = (arg.Value as IEnumerable<Employee>)?.Select(x => x.LastName);
        return names != null ? string.Join(",", names) : string.Empty;
    }

    void ListBoxValuesChanged(IEnumerable<Employee> values, IDropDownBox dropDownBox) {
        dropDownBox.BeginUpdate();
        dropDownBox.Value = values;
        dropDownBox.EndUpdate();
    }

    //...
}
```

![ListBox in DropDown Box](https://docs.devexpress.com/Blazor/images/blazor-dropdownbox-with-listbox.png)

### Command Buttons

The `DxDropDownBox` component displays a built-in button that invokes a drop-down window. Set the [ShowDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.ShowDropDownButton) property to `false` to hide this button.

You can use the [Buttons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.Buttons) property to add custom [command buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) to the editor.

```
<label for="ddbMultipleSelectionListBox" class="cw-480 mb-1">Employees</label>
<DxDropDownBox @bind-Value="Value"
                QueryDisplayText="QueryText"
                InputId="ddbMultipleSelectionListBox"
                CssClass="cw-480"
                ShowDropDownButton="false"
                ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto">
    <Buttons>
        <DxDropDownBoxDropDownButton Position="EditorButtonPosition.Left" />
        <DxEditorButton Text="Default" Click="SetDefaultValue" />
    </Buttons>
    <DropDownBodyTemplate>
        <DxListBox ... />
    </DropDownBodyTemplate>
</DxDropDownBox>

@code {
    object Value { get; set; }

    // ...
    void SetDefaultValue(MouseEventArgs args) {
        // Value = ...
    }
}
```

![DropDown Box with Custom Buttons](https://docs.devexpress.com/Blazor/images/blazor-dropdownbox-buttons.png)

### Input Validation

You can add a standalone `DxDropDownBox` or corresponding [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to the Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

> [!note] Note
> If you add a `DxDropDownBox` to an [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation) component and use one-way binding for the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.Value) property, you need to specify the [ValueExpression](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.ValueExpression) property.

- [Model](#tabpanel_eohWCd1t2L_tabid-model1)
- [Razor](#tabpanel_eohWCd1t2L_tabid-razor)

```
<EditForm Model="@model" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout>
        <DxFormLayoutItem Caption="Customer:" ColSpanMd="12">
            <DxDropDownBox @bind-Value="model.Value"
                            QueryDisplayText="QueryText"
                            ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
                            NullText="Select a customer..."
                            ShowValidationIcon="true">
                <DropDownBodyTemplate Context="ddbBodyContext">
                    <Editors_DropDownBox_SearchLookup_Grid DropDownBox="@ddbBodyContext.DropDownBox" />
                </DropDownBodyTemplate>
            </DxDropDownBox>
        </DxFormLayoutItem>
    </DxFormLayout>
</EditForm>

@code {
    object Value { get; set; }
    private MyModel model = new MyModel();

    string QueryText(DropDownBoxQueryDisplayTextContext arg) {
        if(arg.Value is Customer value)
            return value.ContactName;
        return string.Empty;
    }
}
```

![Validated DropDownBox](https://docs.devexpress.com/Blazor/images/blazor-dropdowmbox-validation.png)

### Clear Button and Placeholder

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.ClearButtonDisplayMode) property to `Auto` to display the **Clear** button in the `DxDropDownBox` editor when it is not empty. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.NullText) property to display the prompt text (placeholder) in the editor when its value is null.

[Run Demo: DropDown Box - Search Lookup](https://demos.devexpress.com/blazor/DropDownBox#SearchLookup)

```
<DxDropDownBox @bind-Value="Value" 
               QueryDisplayText="QueryText" 
               NullText="Select a value" 
               ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto">
    <DropDownBodyTemplate>
        <DxListBox ... />
    </DropDownBodyTemplate>
</DxDropDownBox>
```

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxEditorBase.SizeMode) property to specify the size of `DxDropDownBox` and its inner components. For additional information, refer to the following topic: [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes).

```
<DxDropDownBox @bind-Value="Value" SizeMode="SizeMode.Small" .../>
<DxDropDownBox @bind-Value="Value" SizeMode="SizeMode.Medium" .../>
<DxDropDownBox @bind-Value="Value" SizeMode="SizeMode.Large" .../>
```

![DropDownBox in different size modes](https://docs.devexpress.com/Blazor/images/blazor-dropdownbox-sizemodes.png)

The `DxDropDownBox` component allows you to customize its appearance with the following properties:

[CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxEditorBase.CssClass)

Assigns a CSS class to the component.

[InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.InputCssClass)

Assigns a CSS class to the editor’s input.

[DropDownCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownCssClass)

Assigns a CSS class to the editor’s drop-down window.

[DropDownBodyCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownBodyCssClass)

Assigns a CSS class to the drop-down body in `DxDropDownBox`.

[DropDownWidthMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownWidthMode)

Specifies the width of the drop-down window.

[ShowDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.ShowDropDownButton)

Specifies whether the editor displays the built-in button that invokes a drop-down window.

[DropDownDirection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox.DropDownDirection)

Specifies the direction in which the drop-down window is displayed relative to the editor’s input element.