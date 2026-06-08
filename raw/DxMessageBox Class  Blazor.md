---
title: "DxMessageBox Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox"
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

## DxMessageBox Class

In This Article

A message box intended for use as an alert or confirmation dialog.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxMessageBox :
    DxComponentBase
```

## Remarks

The DevExpress Message Box component for Blazor (`<DxMessageBox>`) allows you to show an alert or confirmation dialog. You can place the component in markup and show it on demand, or use the dialog service ([IDialogService](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IDialogService)) to create message boxes at runtime.

![Message Box](https://docs.devexpress.com/Blazor/images/message-box/blazor-message-box-overview.png)

[Run Demo: Overview](https://demos.devexpress.com/blazor/MessageBox)

### Add a Message Box to a Project Declaratively

Follow the steps below to add the `DxMessageBox` component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxMessageBox>...</DxMessageBox>`.
3. Define the message box’s and.
4. Write code that manages the component’s.
5. Configure other options (see the sections below).

```
<DxMessageBox @bind-Visible="MessageBoxVisible"
              Type="MessageBoxType.Confirmation"
              Title="Cannot open file"
              Text="The file may have been moved, renamed, or deleted."
              OkButtonText="Show details..."
              CancelButtonText="OK"
              RenderStyle="MessageBoxRenderStyle.Warning">
</DxMessageBox>

<DxButton Text="Show Message Box" Click="@(() => MessageBoxVisible = true)" />

@code {
    bool MessageBoxVisible { get; set; } = false;
}
```

### Add a Message Box to a Project at Runtime

Use the [IDialogService](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IDialogService) interface to create and show message boxes in code. Follow the steps below to add a message box to an application at runtime:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Declare a [DxDialogProvider](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDialogProvider) object on the page where message boxes will be displayed.
	> [!tip] Tip
	> You can also add the provider to the *MainLayout.razor* file to make a single container available across all pages.
3. *Optional*. Use provider properties to define common settings for message boxes.
4. Inject the dialog service with the [\[Inject\] attribute](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.injectattribute).
5. Call the [AlertAsync(MessageBoxOptions)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IDialogService.AlertAsync\(DevExpress.Blazor.MessageBoxOptions\)) or [ConfirmAsync(MessageBoxOptions)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IDialogService.ConfirmAsync\(DevExpress.Blazor.MessageBoxOptions\)) method to create and show an alert or confirmation dialog. These methods accept a [MessageBoxOptions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.MessageBoxOptions) object as a parameter. Use this object to set up message box settings.

```
<DxDialogProvider RenderStyle="MessageBoxRenderStyle.Danger" />

<DxButton Text="Show a message box window"
          Click="@OpenConfirmDialogAsync" />

@code {
    [Inject] IDialogService DialogService { get; set; }

    private async Task OpenConfirmDialogAsync() {
        await DialogService.ConfirmAsync(new MessageBoxOptions() {
            Title = "Cannot open file",
            Text = "The file may have been moved, renamed, or deleted.",
            OkButtonText="Show details...",
            CancelButtonText="OK",
            RenderStyle=MessageBoxRenderStyle.Warning
        });
    }
}
```

[Run Demo: Message Box - Dialog Service](https://demos.devexpress.com/blazor/MessageBox#DialogService)

### API Reference

Refer to the following list for the component API reference: [DxMessageBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox._members).

### Static Render Mode Specifics

Blazor Message Box does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Alert and Confirmation Dialog Types

Use the [Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Type) property to specify the message box type:

- `Alert` – the message box intended for use as an alert dialog that displays the **OK** button.
- `Confirmation` – the message box intended for use as a confirmation dialog that displays **OK** and **Cancel** buttons.

```
<DxMessageBox @bind-Visible="MessageBox1Visible" 
              Title="This is an Alert dialog" />

<DxMessageBox @bind-Visible="MessageBox2Visible" 
              Title="This is a Confirmation dialog" 
              Type="MessageBoxType.Confirmation" />
```

![Alert and Confirmation dialogs](https://docs.devexpress.com/Blazor/images/message-box/blazor-message-box-type.png)

### Message Box Content

A message box can display the following elements:

Title

Use the [Title](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Title) property to specify the message box title.

Icon

A message box displays a predefined icon. Icon appearance depends on [RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.RenderStyle). Set the [ShowIcon](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.ShowIcon) property to `false` to hide the icon.

Text

Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Text) property to specify the message box text.

Close button

The close button allows users to close the message box. Set the [ShowCloseButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.ShowCloseButton) property to `false` to hide the button.

Ok and Cancel buttons

A message box always displays the **OK** button. The **Cancel** button is visible when the [Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Type) property is set to `Confirmation`. Button appearance depends on [RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.RenderStyle). Use the [OkButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.OkButtonText) and [CancelButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CancelButtonText) properties to specify custom text for buttons. Handle the [Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Closed) event to process button clicks.

![Message Box Elements](https://docs.devexpress.com/Blazor/images/message-box/blazor-message-box-elements.png)

```
<DxMessageBox @bind-Visible="MessageBoxVisible"
              Title="Cannot open file"
              Text="The file may have been moved, renamed, or deleted."
              OkButtonText="Show details..."
              CancelButtonText="OK"
              RenderStyle="@MessageBoxRenderStyle.Warning"
              Type="@MessageBoxType.Confirmation" />
```

### Show and Close a Message Box

Implement [two-way binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding) for the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Visible) property to show or hide the message box in code. The component updates the property value when a user closes the message box.

```
<DxButton Text="Show Alert" Click="@(() => MessageBoxVisible = true)" />

<DxMessageBox @bind-Visible="MessageBoxVisible" Text="Unable to process the request." />

@code {
    bool MessageBoxVisible { get; set; } = false;
}
```

#### Respond to Show and Close Actions

Handle the following events to process show and close actions:

[Shown](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Shown)

Fires after the message box is displayed.

[Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Closed)

Fires after the message box is closed.

#### User Capabilities

Users can close a message box in the following ways:

- Click **OK** or **Cancel** button.
- Click the **Close** button in the header. You can set the [ShowCloseButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.ShowCloseButton) property to `false` to hide the button.
- Press Escape. You can set the [CloseOnEscape](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CloseOnEscape) property to `false` to disable this capability.
- Click outside the message box’s boundaries. Set the [CloseOnOutsideClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CloseOnOutsideClick) property to `true` to enable this capability.

[Run Demo: Message Box - Close Options](https://demos.devexpress.com/blazor/MessageBox#Options)

### Process Ok and Cancel Button Clicks

When a user clicks the **OK** or **Cancel** button, the message box closes and the [Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Closed) event fires. Use the event parameter to determine the pressed button.

- If the parameter returns `true` – a user clicked the **OK** button.
- If the parameter returns `false` – a user clicked the **Cancel** button or **Close** button, pressed Escape, or clicked outside the box boundaries.

```
<DxButton Text="Show Alert" Click="@(() => MessageBoxVisible = true)" />
<DxMessageBox @bind-Visible="MessageBoxVisible" Type="MessageBoxType.Confirmation" Closed="@Closed" ... />

@code {
    bool MessageBoxVisible { get; set; } = false;

    void Closed(bool Confirmed) {
        if (Confirmed) {
           // your code
        }
    }
}
```

### Message Box Size

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.SizeMode) property to apply different [size modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes) to the `DxMessageBox` component.

```
<DxMessageBox @bind-Visible="MessageBoxVisible"
              SizeMode="SizeMode.Small"
              Title="Error"
              Text="Unable to process the request. Please try again later or contact support." />
```

The [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.Width) properties allows you to specify the exact size of the message box.

```
<DxMessageBox @bind-Visible="MessageBoxVisible"
              Width="600px" 
              Height="200px"
              Title="Error"
              Text="Unable to process the request. Please try again later or contact support." />
```

### Message Box Appearance

The `DxMessageBox` component implements a variety of predefined looks. Use the [ThemeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.ThemeMode) property to choose from `Light` or `Dark` theme, and the [RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.RenderStyle) property to specify a render style.

![Message Box render modes and styles](https://docs.devexpress.com/Blazor/images/message-box/blazor-messagebox-styles.png)

You can use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CssClass) property to customize the component’s appearance in more detail.

[Run Demo: Message Box - Customize Appearance](https://demos.devexpress.com/blazor/MessageBox#Customization)

### Keyboard Navigation

When a Message Box opens, it automatically receives focus:

- On mobile and tablet devices, focus moves to the Message Box.
- On desktop devices, focus moves to the first button in the Message Box. If [OkButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.OkButtonText) and [CancelButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CancelButtonText) are not specified, focus moves to the **Close** button in the Message Box header.

Users can navigate through the component’s controls with keyboard shortcuts. The component supports keyboard navigation on the client and server.

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus forward through Message Box buttons. After the last button, moves focus to the first Message Box button. |
| Shift + Tab | Moves focus backward through Message Box buttons. After the first button, moves focus to the last Message Box button. |
| Esc | If [CloseOnEscape](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMessageBox.CloseOnEscape) is enabled, closes the Message Box. |

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.