---
title: Dialog
route: /Dialog
icon: AppGeneric
---

# Dialog

A **Dialog** is a supplemental surface that can provide helpful interactions or require someone to take an
action before they can continue their task, like confirming a deletion.

**Dialogs** are often interruptions, so use them for important actions.
If you need to give someone an update on an action they just took but that they don't need to act on, try a toast.

## Best practices

### Do
 - Dialog boxes consist of a header (`TitleTemplate`), content (`ChildContent`), and footer (`ActionTemplate`),
   which should all be included inside a body (`FluentDialogBody`).
 - Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
 - Modal dialogs should be used very sparingly—only when it's critical that people make a choice or provide information before they can proceed.
   Thee dialogs are generally used for irreversible or potentially destructive tasks. They're typically paired with an backdrop without a light dismiss.

### Don't
 - Don't use more than three buttons between Dialog'`ActionTemplate`.
 - Don't open a `FluentDialog` from a `FluentDialog`.
 - Don't use a `FluentDialog` with no focusable elements

## Usage

The simplest way to display a dialog box is to use the **DialogService**.
By injecting this service, you have `ShowDialogAsync` methods at your disposal.
You can pass the **type of Dialog** to be displayed and the **options** to be passed to that window.

Once the user closes the dialog window, the `ShowDialogAsync` method returns a `DialogResult` object containing the return data.

Any Blazor component can be used as a dialog type.

```csharp
@inject IDialogService DialogService

var result = await DialogService.ShowDialogAsync<SimpleDialog>(options =>
{
    // Options
});

if (result.Cancelled == false)
{
    ...
}
```

The **SimpleDialog** window can inherit from the `FluentDialogInstance` class to have access to the `DialogInstance` property, which contains
all parameters defined when calling `ShowDialogAsync`, as well as the `CloseAsync` and `CancelAsync` methods.
Using `CloseAsync` you can pass a return object to the parent component.
It is then retrieved in the `DialogResult` like in the example below.

```razor
@inherits FluentDialogInstance

<FluentDialogBody>
    Content dialog
</FluentDialogBody>

@code
{
    protected override Task OnActionClickedAsync(bool primary)
    {
        return primary
        ? DialogInstance.CloseAsync()
        : DialogInstance.CancelAsync();
    }
}
```

> [!NOTE] The `FluentDialogBody` component is required to display the dialog window correctly.
>
> ⚠️ If you override the `OnInitializedAsync` method, **you must call** the `base.OnInitializedAsync()` method,
> in addition to your personalized code.
> because it configures the Header, Footer and all Action buttons.
> E.g.: `protected override async Task OnInitializedAsync() { await base.OnInitializedAsync(); // And your code }`

By default, the `FluentDialogInstance` class will offer two buttons, one to validate and one to cancel (**OK** and **Cancel**).
You can override the actions of these buttons by overriding the `OnActionClickedAsync` method.
By default the shortcut key **Enter** is associated with the **OK** button and the shortcut key **Escape** is associated with the **Cancel** button.
But your can update these shortcuts by overriding the `ShortCut` property.

{{ DialogServiceDefault Files=Code:DialogServiceDefault.razor;SimpleDialog:SimpleDialog.razor;PersonDetails:PersonDetails.cs }}

## Modal Dialog

Modal dialog boxes provide contextual information about the application.
They block interaction with the application until they are explicitly removed.
They often require action on the part of the user.

When a dialog is displayed modally, no input (keyboard or mouse click) can occur except to objects on the modal dialog.
The program must hide or close a modal dialog (usually in response to some user action) before input to another dialog can occur.

By default, the dialog is displayed modally (Modal = true).

```csharp
var result = await DialogService.ShowDialogAsync<SimpleDialog>(options =>
{
    options.Modal = true;
});
```

## Actions in the header

You can display action buttons (such as **Close** and **Info**) in the header of the dialog box.
By default, these actions are **not displayed**. To enable them, set the `Visible` property to `true`
on the corresponding action via `options.Header.CloseAction` or `options.Header.InfoAction`.

```csharp
options.Header.CloseAction.Visible = true;
options.Header.InfoAction.Visible = true;
```

When the user clicks the **Close** button, the `FluentDialogInstance.OnActionClickedAsync(false)` method
is called by default (which cancels the dialog). If you need a different behavior, you can override
`OnActionClickedAsync` in your dialog component, or assign a custom handler directly to the action using
the `OnClickAsync` property:

```csharp
options.Header.CloseAction.OnClickAsync = async (e) => { /* custom close logic */ };
options.Header.InfoAction.OnClickAsync = async (e) => { /* custom info logic */ };
```

{{ DialogServiceHeaderAction }}

By default, the title and actions are aligned to the top of the header. When the title fits on a single line, 
this can leave a small visible gap between the two. To vertically center the title and the actions 
within the header, apply the following global style:

```css
fluent-dialog-body::part(title) {
  align-items: center;
}
```

In addition to the built-in **Close** and **Info** actions, you can add your own extra action buttons
to the header by calling `options.Header.AddAction(...)`. Each call registers a new
`DialogOptionsHeaderAction` which is rendered before the **Info** and **Close** buttons.

```csharp
options.Header.AddAction(action =>
{
    action.Icon = new Icons.Regular.Size20.Settings();
    action.Tooltip = "Settings";
    action.OnClickAsync = async (dialog) => { /* custom logic */ };
});
```

> **Note:** Unlike `CloseAction` and `InfoAction`, extra actions have no default icon, so you must
> assign an `Icon` (or a `Label`) for them to be displayed.

## Customized

The previous `FluentDialogInstance` object is optional. You can create your own custom dialog box in two different ways.

🔹Using the `ShowDialogAsync` method options to pass parameters to your dialog box.
   Several **options** can be used to customize the dialog box, such as styles, title, button text, etc.

```csharp
var result = await DialogService.ShowDialogAsync<CustomizedDialog>(options =>
{
    options.Header.Title = "Dialog Title";
    options.Alignment = DialogAlignment.Default;
    options.Style = "max-height: 400px;";
    options.Parameters.Add("Name", "John");  // Simple data will send to the dialog "Name" property.
});
```

🔹Using the `FluentDialogBody` component to create a custom dialog box.
   This component allows you to create a dialog box with:
    - `TitleTemplate`: Title of the dialog box.
    - `TitleActionTemplate`: (optional) Action to be performed on the title dismiss icon.
    - `ChildContent`: Content of the dialog box.
    - `ActionsTemplate`: Footer of the dialog box, containing close and cancel buttons.

   To have a reference to the `DialogInstance` object, you must use the `CascadingParameter` attribute.
   This object allows you to retrieve the dialog options and to close the dialog box and pass a return object to the parent component.

```xml
<FluentDialogBody>

    <TitleTemplate>
        @Dialog?.Options.Header.Title
    </TitleTemplate>

    <ChildContent>
        Content dialog
    </ChildContent>

    <ActionTemplate>
        <FluentButton OnClick="@(e => Dialog.CancelAsync())">Cancel</FluentButton>
        <FluentButton OnClick="@(e => Dialog.CloseAsync())" Appearance="ButtonAppearance.Primary">OK</FluentButton>
    </ActionTemplate>

</FluentDialogBody>

@code
{
    [CascadingParameter]
    public required IDialogInstance Dialog { get; set; }
}
```

> **Notes**: Adding your custom buttons to the dialog box, the default shortcuts **Enter** and **Escape** will no longer work.

{{ DialogServiceCustomized Files=Code:DialogServiceCustomized.razor;CustomizedDialog:CustomizedDialog.razor;PersonDetails:PersonDetails.cs }}

## Fixed Header and Footer

By default, a `FluentDialogBody` (and its drawer variant) scrolls as a single block when its content
overflows. This means the **title** and the **action buttons** (OK / Cancel) scroll away together with
the content, which is usually not what you want for long forms, long lists, or large drawers.

Setting `<FluentDialogBody FixedHeaderFooter="true">` changes the layout so that:

 - The **header** and the **footer** (`ActionTemplate`) stay pinned at the top/bottom.
 - Only the **content** (`ChildContent`) scrolls when it overflows.

**When to use it**

 - The dialog/drawer content may exceed the available height (long forms, lists, logs, terms of service, etc.).
 - The primary actions must remain visible and reachable at all times, without forcing the user to scroll to the bottom.
 - You want the title to stay visible as context while the user browses the content.

{{ DialogFixedHeaderFooterDefault Files=Code:DialogFixedHeaderFooterDefault.razor;Dialog:FixedHeaderFooterDialog.razor }}

## Data exchange between components

🔹You can easily send data from your main component to the dialog box
by using the `options.Parameters.Add()` method in the `ShowDialogAsync` method options.

`Parameters` is a dictionary that allows you to send any type of data to the dialog box.
the **key is the name of the property** in the dialog box, and the **value** is the data to be sent.

**Main component**
```csharp
PersonDetails John = new() { Age = "20" };

var result = await DialogService.ShowDialogAsync<CustomizedDialog>(options =>
{
    options.Parameters.Add(nameof(SimpleDialog.Name), "John");  // Simple type
    options.Parameters.Add(nameof(SimpleDialog.Person), John);  // Updatable object
});
```

> **Note:** The `nameof` operator is used to avoid typing errors when passing parameters.
> The key must match the name of the property in the dialog box.
> If the key does not match, an exception will be thrown.

**SimpleDialog**
```csharp
<FluentDialogBody>
    ...
</FluentDialogBody>

@code {
    // A simple type is not updatable
    [Parameter]
    public string? Name { get; set; }

    // A class is updatable
    [Parameter]
    public PersonDetails Person { get; set; } = new();
}
```

In .NET, simple types are passed by value, while objects are passed by reference.
So if you modify an object in the dialog box, the changes will also be visible in the main component.
This is not the case for simple types.

🔹You can also send data from the dialog box to the main component by using the `CloseAsync` method.
This method allows you to pass a return object to the parent component.

**Dialog box**
```csharp
protected override async Task OnActionClickedAsync(bool primary)
{
    if (primary)
    {
        await DialogInstance.CloseAsync("You clicked on the OK button");
    }
    else
    {
        await DialogInstance.CancelAsync();
    }
}
```

In the main component, you can retrieve the return object from the `DialogResult` object.
And you can check if the dialog box was closed by clicking on the **OK** or **Cancel** button, using the `Cancelled` property.

> **Note:** The `CancelAsync` method can not pass a return object to the parent component.
> But the `CloseAsync` method can pass a"Canceled" result object to the parent component.
> `await DialogInstance.CloseAsync(DialogResult.Cancel("You clicked on the Cancel button"));`

## Without the DialogService

You can also use the `FluentDialogBody` component directly in your component, without using the `DialogService` and the `FluentDialog` component.

{{ DialogBodyDefault }}

## API DialogService

{{ API Type=DialogService }}

## API FluentDialogBody

{{ API Type=FluentDialogBody }}

## API FluentDialog

{{ API Type=FluentDialog }}

## Options

### DialogOptions

{{ API Type=DialogOptions Properties=All }}

### DialogOptionsHeader

{{ API Type=DialogOptionsHeader Properties=All }}

### DialogOptionsFooter

{{ API Type=DialogOptionsFooter Properties=All }}

### DialogOptionsFooterAction

{{ API Type=DialogOptionsFooterAction Properties=All }}
