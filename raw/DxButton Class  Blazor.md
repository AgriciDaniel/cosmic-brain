---
title: "DxButton Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton#button-content-and-appearance"
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

## DxButton Class

In This Article

A button control that supports advanced style and content customization options.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxButton :
    DxButtonBase
```

## Remarks

The DevExpress Button for Blazor (`<DxButton>`) allows you to add a stylized button to your project and handle its click.

![Button](https://docs.devexpress.com/Blazor/images/blazor-button-overview.png)

[Run Demo: Button](https://demos.devexpress.com/blazor/Button)

### Add a Button to a Project

Follow the steps below to add the Button component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxButton/>` markup to a `.razor` file.
3. Configure the component: specify the button’s content and appearance, handle button clicks, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxButton Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton._members).

### Static Render Mode Specifics

Blazor Button does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Button Content and Appearance

Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Text) property to specify the button’s text.

To configure button appearance, specify the [RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.RenderStyle) and [RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.RenderStyleMode) properties.

```
<DxButton RenderStyle="ButtonRenderStyle.Primary" RenderStyleMode="ButtonRenderStyleMode.Contained" 
    Text="Primary (Contained)" />
<DxButton RenderStyle="ButtonRenderStyle.Danger" RenderStyleMode="ButtonRenderStyleMode.Outline" 
    Text="Danger (Outline)" />
<DxButton RenderStyle="ButtonRenderStyle.Link" RenderStyleMode="ButtonRenderStyleMode.Contained" 
    Text="Link" />
```

![Button Styles](https://docs.devexpress.com/Blazor/images/blazor-button-styles.png)

Assign the icon’s CSS class to the [IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconCssClass) property to add an icon to your button. The [IconPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconPosition) property specifies the icon position.

- [Razor](#tabpanel_bySHcE-3ot_tabid-razor)
- [CSS](#tabpanel_bySHcE-3ot_tabid-1)

```
<DxButton RenderStyle="ButtonRenderStyle.Dark" 
          Text="Undo" Title="Undo the last action." 
          IconCssClass="undo" />
<DxButton RenderStyle="ButtonRenderStyle.Dark" 
          Text="Redo" 
          Title="Restore the previously undone action." 
          IconCssClass="redo" 
          IconPosition="ButtonIconPosition.AfterText" />
```

![Button Icons](https://docs.devexpress.com/Blazor/images/blazor-button-icons.png)

To hide the button, set the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Visible) property to `false`.

[Run Demo: Button — Icons](https://demos.devexpress.com/blazor/Button#Picture)

### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.SizeMode) property to specify a button size. The following code snippet applies different size modes to Button components.

```
<DxButton Text="Small" SizeMode="SizeMode.Small" />

<DxButton Text="Medium" SizeMode="SizeMode.Medium" />

<DxButton Text="Large" SizeMode="SizeMode.Large" />
```

![Button - Size mode](https://docs.devexpress.com/Blazor/images/blazor-button-size-modes.png)

For additional information, refer to [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes).

### Handle the Click Event

Handle the [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event to respond to the button’s click.

```
<DxButton ...
    Click="@Handler">

@code {
    // ...
    void Handler(MouseEventArgs args) {
        Console.WriteLine("I am clicked!");
    }
}
```

If you use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.NavigateUrl) property together with the [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event’s handler, the browser handles the event first and then navigates to the specified URL.

To submit a form with a button click, set the [SubmitFormOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton.SubmitFormOnClick) option to `true`.

Set the [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Enabled) property to `false` to disable the button.

```
<DxButton RenderStyle="ButtonRenderStyle.Primary" Text="Disabled button" Enabled="false" />
```

### Custom Content

You can use the [ChildContent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.ChildContent) property to add custom content to your button and customize its appearance and behavior:

![Button Custom Content](https://docs.devexpress.com/Blazor/images/blazor-button-customized.png)

- [Razor](#tabpanel_OfO1QWBMJ4_tabid-razor)
- [CSS](#tabpanel_OfO1QWBMJ4_tabid-1)

```
<DxButton RenderStyle="ButtonRenderStyle.Info"
              Click="@Like"
              IconCssClass="btn-icon btn-icon-like"
              SizeMode="Params.SizeMode"
              Text="Like">
        @context
        <span class="ms-1">@likes</span>
    </DxButton>
    @* ... *@
@code {
    int likes;

    void Like(MouseEventArgs args) {
        likes++;
    }
    protected override void OnInitialized() {
        likes = 1;
    }
}
```

[Run Demo: Button — Custom Content](https://demos.devexpress.com/blazor/Button#Template)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxButton Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButton._members)