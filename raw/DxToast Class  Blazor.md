---
title: "DxToast Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast"
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

## DxToast Class

In This Article

A pop-up notification message.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxToast :
    DxComponentBase,
    IDisposable
```

## Remarks

The DevExpress Toast component for Blazor (`<DxToast>`) allows you to notify your users about processes and events. You can place the component in markup and show it on demand, or use the notification service ([IToastNotificationService](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IToastNotificationService)) to create toasts at runtime.

![Toasts with different messages](https://docs.devexpress.com/Blazor/images/toast/blazor-toast-oveview.png)

[Run Demo: Overview](https://demos.devexpress.com/blazor/Toast)

### Add a Toast Notification to a Project Declaratively

Follow the steps below to add the `DxToast` component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the [DxToastProvider](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider) component to a `.razor` file. This component serves as a toast container and should be declared where toasts will be displayed.
	> [!tip] Tip
	> You can also add the provider to the *MainLayout.razor* file to make a single container available across all pages.
3. *Optional*. Use the provider properties to define common toast settings.
4. Add the `<DxToast>` … `</DxToast>` markup to a `.razor` file.
5. Define.
6. *Optional*. Configure other toast options (see the sections below).
7. Call the [Show()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.Show) method to display the toast.

```
<DxToastProvider VerticalAlignment="VerticalEdge.Top" RenderStyle="ToastRenderStyle.Success" />
<DxToast @ref=toast Title="Notification" Text="The process is completed." />

@code {
    DxToast toast;
    //...
    toast.Show();
}
```

### Add a Toast Notification to a Project at Runtime

Use the [IToastNotificationService](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IToastNotificationService) interface to create, show, and close toast notifications in code. Follow the steps below to add a toast to an application at runtime:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the [DxToastProvider](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider) component to a `.razor` file. This component serves as a toast container and should be declared where toasts will be displayed.
3. *Optional*. Use the provider properties to define common toast settings.
4. Inject the notification service with the [\[Inject\] attribute](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.injectattribute)
5. Call a [ShowToast](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IToastNotificationService.ShowToast.overloads) method overload to create and show a toast notification. Overloads accept a [ToastOptions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ToastOptions) object as a parameter. Use this object to set up toast settings.

```
<DxToastProvider VerticalAlignment="VerticalEdge.Top" RenderStyle="ToastRenderStyle.Success" />

@code {
    [Inject] IToastNotificationService ToastService { get; set; }
    //...
    ToastService.ShowToast(new ToastOptions {
        Title = "Notification",
        Text = "The process is completed.",
    });

}
```

### API Reference

Refer to the following list for the component API reference: [DxToast Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast._members).

### Static Render Mode Specifics

Blazor Toast Notification does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Toast Content

A toast notification can include a title, text, icon and template. Use [Title](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.Title) and [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.Text) properties to specify a toast’s title and text.

```
<DxToast @ref=toast
         Title="Notification"
         Text="The process is completed." />
```

![Toasts with title and text](https://docs.devexpress.com/Blazor/images/toast/blazor-toast-text-and-title.png)

#### Toast Icon

A toast notification displays a predefined icon. Use the [IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.IconCssClass) property to customize icon settings. Set the [ShowIcon](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.ShowIcon) property to `false` to hide the icon.

```
<DxToastProvider ThemeMode="ToastThemeMode.Pastel" />

<DxToast Id="Toast1" Text="Predefined icon." />
<DxToast Id="Toast2" Text="Custom icon." IconCssClass="oi oi-task" />
<DxToast Id="Toast3" Text="No icon." ShowIcon="false" />

@code {
    [Inject] IToastNotificationService ToastService { get; set; }

    private void ShowToasts() {
        ToastService.ShowToast("Toast1");
        ToastService.ShowToast("Toast2");
        ToastService.ShowToast("Toast3");
    }
}
```

![Toasts with default and custom icons](https://docs.devexpress.com/Blazor/images/toast/blazor-toast-icons.png)

#### Toast Template

Use the [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.Template) property to add custom content to the toast notification. The specified render fragment is displayed under toast title and text content.

Alternatively, you can specify a template as the component’s child content (see the Approach 2 tab).

- [Approach 1](#tabpanel_4qY7QHjomd_tabid-1)
- [Approach 2](#tabpanel_4qY7QHjomd_tabid-2)

```
<DxToast @ref=toastButtons Title="Toast with buttons">
    <Template>
        <DxButton CssClass="mx-2">button 1</DxButton>
        <DxButton RenderStyleMode="ButtonRenderStyleMode.Outline">button 2</DxButton>
    </Template>
</DxToast>
```

![Templated toast notification](https://docs.devexpress.com/Blazor/images/toast/blazor-toast-template.png)

### Toast Size

A toast height is determined automatically based on toast content. You can use the [MaxHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.MaxHeight) property to limit the maximum toast height. The [DxToastProvider.Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider.Width) property determines the toast width that is the same for every toast in a provider.

```
<DxToastProvider Width="400px" />
<DxToast @ref=toast 
         MaxHeight="150px"
         Text="The process is completed." />
```

### Toast Appearance

To configure toast appearance, specify the [RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.RenderStyle) and [ThemeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.ThemeMode) properties.

```
<DxToast @ref=toast
          Text="The process is completed."
          RenderStyle="ToastRenderStyle.Info"
          ThemeMode="ToastThemeMode.Saturated" />
```

![Toast render mode and styles](https://docs.devexpress.com/Blazor/images/toast/blazor-toast-styles.png)

Assign a CSS class name to the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.CssClass) property to customize the appearance of the toast notification.

### Toast Display Time and Freezing

A toast notification automatically disappears after the period specified by [DisplayTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.DisplayTime). If the property is not specified, the display time is determined by the [DxToastProvider.DisplayTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider.DisplayTime) property (5 seconds by default). Set the [DisplayTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.DisplayTime) property to `0` (zero) to leave the message visible until it is forced closed.

Enable the [FreezeOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast.FreezeOnClick) option to allow users to freeze a toast notification (prevent it from disappearing) with a click.

```
<DxToast @ref=toast 
         Text="The process is completed." 
         DisplayTime="@TimeSpan.FromSeconds(10)" 
         FreezeOnClick="true" />
```

### Toast Position

Toast position on the page is determined by toast provider settings. Use [HorizontalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider.HorizontalAlignment) and [VerticalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToastProvider.VerticalAlignment) properties to position toast notifications on the page.

[Run Demo: Toast Positioning](https://demos.devexpress.com/blazor/Toast#Positioning)

```
<DxToastProvider HorizontalAlignment="HorizontalAlignment.Left" VerticalAlignment="VerticalEdge.Top"/>
```

## Inheritance

See Also

[DxToast Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToast._members)