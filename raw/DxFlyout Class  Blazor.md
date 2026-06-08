---
title: "DxFlyout Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout"
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

## DxFlyout Class

In This Article

A contextual popup UI element that allows you to display hints, warnings, and other messages.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxFlyout :
    DxComponentBase,
    IPopupEventInfo,
    IParentPopupBranchInfo,
    IPopupLayer,
    IAsyncDisposable
```

## Remarks

The DevExpress Flyout for Blazor (`<DxFlyout>`) allows you to create a flyout window in your application.

![Blazor Flyout Overview](https://docs.devexpress.com/Blazor/images/blazor-flyout-position.png)

[Run Demo](https://demos.devexpress.com/blazor/Flyout)

### Add a Flyout to a Project

Follow the steps below to add the Flyout component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxFlyout></DxFlyout>` markup to a `.razor` file.
3. Write code that manages the Flyout’s.
4. Define the Flyout’s.
5. Configure other options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxFlyout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout._members).

### Static Render Mode Specifics

Blazor Flyout does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Show and Close a Flyout

Implement [two-way binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding) for the [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.IsOpen) property to show the Flyout in code.

```
<DxButton Id="targetButton" aria-describedby="flyout" Click="() => IsOpen = !IsOpen">
    Show/Hide a flyout window
</DxButton>

<DxFlyout Id="flyout"
          @bind-IsOpen=IsOpen 
          PositionTarget="#targetButton" 
          Width=400
          BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
</DxFlyout>

@code {
    bool IsOpen { get; set; } = false;
}
```

You can call the [ShowAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.ShowAsync\(System.Threading.CancellationToken\)) and [CloseAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.CloseAsync\(System.Threading.CancellationToken\)) methods to show and close a flyout window asynchronously.

```
<DxButton Text="Show" Click="ShowWindow" aria-describedby="flyout" />
<DxButton Text="Hide" Click="HideWindow" />

<DxFlyout Id="flyout" @ref="flyoutWindow" Width="400" CloseOnOutsideClick="false"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />

@code {
    DxFlyout flyoutWindow { get; set; }

    async Task ShowWindow(MouseEventArgs args) {
        if (!flyoutWindow.IsInitialized)
            await flyoutWindow.InitializedTask;
            await flyoutWindow.ShowAsync();
    }
    async Task HideWindow(MouseEventArgs args) {
        await flyoutWindow.CloseAsync();
    }
}
```

#### User Capabilities

Users can close the Flyout in the following ways:

- Press Escape.
- Click outside the Flyout’s boundaries. Set the [CloseOnOutsideClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.CloseOnOutsideClick) property to `false` to disable this option.

#### Respond to Show and Close Actions

Handle the following events to process show and close actions:

[Showing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Showing)

Fires before the flyout window is displayed.

[Shown](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Shown)

Fires after the flyout window is displayed.

[Closing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Closing)

Fires before the flyout window is closed.

[Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Closed)

Fires after the flyout window is closed.

### Content and Appearance

The flyout window consists of header, body, and footer. The header and footer are initially hidden. Set [HeaderVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.HeaderVisible) and [FooterVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FooterVisible) properties to `true` to display these elements.

Each element can display, a, or a.

#### Display Text

Use the following properties to specify text displayed in the Flyout elements: [HeaderText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.HeaderText), [BodyText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.BodyText), and [FooterText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FooterText).

- [Razor](#tabpanel_pM0OPeCe3n_tabid-razor1)
- [CSS](#tabpanel_pM0OPeCe3n_tabid-css1)

```
<DxButton Id="targetButton" Click="() => IsOpen = !IsOpen">Show a flyout window</DxButton>
<DxFlyout @bind-IsOpen=IsOpen PositionTarget="#targetButton" Width=400
    BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    HeaderVisible="true" HeaderText="Header" HeaderCssClass="header-footer-style"
    FooterVisible="true" FooterText="Footer" FooterCssClass="header-footer-style">
</DxFlyout>

@code {
    bool IsOpen { get; set; } = false;
}
```

To customize the appearance of Flyout elements, assign CSS classes to [HeaderCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.HeaderCssClass), [BodyCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.BodyCssClass), and [FooterCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FooterCssClass) properties.

#### Display Custom Content

Use the following properties to display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) in the Flyout elements: [HeaderContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.HeaderContentTemplate), [BodyContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.BodyContentTemplate), and [FooterContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FooterContentTemplate). A render fragment can include formatted text, images, another component, etc. These templates affect the content area only.

These templates take priority over the `Text` and `CssClass` properties described above.

Each template has the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement a custom close button.

[Run Demo: Flyout - Customization](https://demos.devexpress.com/blazor/Flyout#Customization)

```
<DxButton Id="showFlyout" aria-describedby="flyout" Click="() => IsOpenFlyout = true">
    Show a flyout window
</DxButton>

<DxFlyout Id="flyout" 
          @bind-IsOpen="@IsOpenFlyout"
          PositionTarget="#showFlyout"
          Position="FlyoutPosition.Bottom"
          CloseOnOutsideClick="false"
          BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          Width="400"
          FooterVisible="true">
    <FooterContentTemplate>
        <DxButton Text="OK" Click="@context.CloseCallback" />
    </FooterContentTemplate>
</DxFlyout>

@code {
    bool IsOpenFlyout { get; set; } = false;
}
```

![Flyout - Footer Templates](https://docs.devexpress.com/Blazor/images/blazor-flyout-footer-content-template.png)

#### Customize Entire Elements (Template)

Specify [HeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.HeaderTemplate), [BodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.BodyTemplate), and [FooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FooterTemplate) properties to define the content and appearance of Flyout elements. You can display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) (for instance, formatted text, images, or another component).

These templates substitute entire render fragments of the corresponding elements. Predefined appearance settings, content alignment and paddings, and the corresponding `Text`, `CssClass`, and `ContentTemplate` properties have no effect.

Each template has the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement a custom close button.

### Flyout Size

Flyout calculates its sizes based on the content. Use the following properties to restrict the component size: [MinWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.MinWidth), [MinHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.MinHeight), [MaxWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.MaxWidth), and [MaxHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.MaxHeight).

```
<DxButton Id="button" aria-describedby="flyout" Click="() => IsOpen = !IsOpen">
    Show a flyout window
</DxButton>
<DxFlyout Id="flyout"
          @bind-IsOpen=IsOpen
          PositionTarget="#button"
          BodyText="@Constants.Content"
          MinWidth="200" MaxWidth="400"
          MinHeight="200" MaxHeight="400" />

@code {
    bool IsOpen { get; set; } = false;
}
```

The [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Width) properties allow you to specify the exact size of the flyout component. Set the [Scrollable](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Scrollable) property to `true` to display a vertical scrollbar when the height is restricted and the content exceeds the window’s boundaries.

```
<DxButton Id="showFlyout" aria-describedby="flyout" Click="() => IsOpen = !IsOpen">
    Show a flyout window
</DxButton>

<DxFlyout PositionTarget="#showFlyout" 
          Id="flyout"
          @bind-IsOpen="@IsOpen"
          Height="150"
          Width="300"
          Scrollable=true
          BodyText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue 
          massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet 
          commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. 
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
          Proin pharetra nonummy pede." />

@code {
    bool IsOpen { get; set; } = false;
}
```

![Flyout with scrollbar](https://docs.devexpress.com/Blazor/images/blazor-flyout-scrolling.png)

### Flyout Position

Use the [Position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Position) property to specify the Flyout position relative to a target element ([PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.PositionTarget)) or to a [Rectangle](https://learn.microsoft.com/dotnet/api/system.drawing.rectangle) object ([PositionRectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.PositionRectangle)).

The [Offset](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Offset) and [Distance](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Distance) properties set the component offset from the specified position.

[Run Demo: Flyout - Position](https://demos.devexpress.com/blazor/Flyout#Placement)

```
<DxButton Id="show-flyout" aria-describedby="flyout" Click="() => IsOpen = !IsOpen">
    Show a flyout window

</DxButton>
<DxFlyout Id="flyout"
          @bind-IsOpen="@IsOpen" Width="210"
          BodyText="Lorem ipsum dolor sit amet"
          PositionTarget="#show-flyout"
          Position="FlyoutPosition.BottomStart" />

@code {
    bool IsOpen { get; set; } = false;
}
```

![Blazor Flyout Offsets](https://docs.devexpress.com/Blazor/images/blazor-flyout-position.png)

The Flyout recalculates its position when certain page elements are changed (for instance, when the page is scrolled or resized). You can call the [RepositionAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.RepositionAsync\(System.Threading.CancellationToken\)) method to force the Flyout to recalculate its position.

### Position Restrictions

Use the [RestrictionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.RestrictionMode) property to specify an element that restricts the Flyout position. The available options are as follows:

[Viewport](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FlyoutRestrictionMode)

The Flyout position is restricted by the viewport.

[Page](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FlyoutRestrictionMode)

The Flyout position is restricted by the page.

[Rectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FlyoutRestrictionMode)

The Flyout position is restricted by a rectangle’s boundaries ([RestrictionRectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.RestrictionRectangle)).

[TargetElement](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FlyoutRestrictionMode)

The Flyout position is restricted by a target element’s boundaries ([RestrictionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.RestrictionTarget)).

The [Position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.Position) and [FitToRestriction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.FitToRestriction) properties determine how the Flyout behaves to fit the specified boundaries. When the component does not fit the restrictions, it can be hidden or closed, based on the [CloseMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFlyout.CloseMode) property value.

[Run Demo: Flyout - Automatic Position Adjustment](https://demos.devexpress.com/blazor/Flyout#Flipping)

```
<OptionsContent>
    <OptionComboBox Label="Close mode:" CssClass="ow-100" Data="@CloseModes" @bind-Value="@CloseMode"/>
    <OptionCheckBox Label="Fit to container" @bind-Checked="FitToRestriction"/>
</OptionsContent>
<ChildContentWithParameters Context="Params">
    <div class="@(IsMobile ? "" : "card") flipping-overflow-container">
        <dxbl-demo-scrollable center-horizontally center-vertically id="flipping-target-container" class="flipping-overflow-content">
            <DxButton
                CssClass="flipping-button"
                RenderStyle="@ButtonRenderStyle.Secondary"
                Click="() => IsOpen = !IsOpen"
                aria-describedby="flyout-flipping">SHOW A FLYOUT</DxButton>
        </dxbl-demo-scrollable>
        <DxFlyout
            @bind-IsOpen=IsOpen
            Id="flyout-flipping"
            PositionTarget=".flipping-button"
            RestrictionTarget=".flipping-overflow-container"
            RestrictionMode="FlyoutRestrictionMode.TargetElement"
            CloseOnOutsideClick="false"
            PreventCloseOnPositionTargetClick="true"
            CloseMode="@CloseMode"
            FitToRestriction="@FitToRestriction"
            SizeMode="Params.SizeMode"
            Width="240">
            <span class="fs-75">@Constants.ContentShort</span>
        </DxFlyout>
    </div>
</ChildContentWithParameters>

@code {
@* ... *@
bool IsOpen { get; set; } = false;
bool IsMobile { get; set; }
bool FitToRestriction { get; set; }
FlyoutCloseMode[] CloseModes { get; } = Enum.GetValues<FlyoutCloseMode>();
FlyoutCloseMode CloseMode { get; set; } = FlyoutCloseMode.Hide;
@* ... *@
}
```

### Keyboard Navigation

When a Flyout opens, it automatically receives focus. On mobile and tablet devices, focus moves to the Flyout box. On desktop devices, focus moves to the first interactive element in the Flyout.

Users can navigate through the component’s controls with keyboard shortcuts. The component supports keyboard navigation on the client and server.

| Shortcut Keys | Description |
| --- | --- |
| Tab   Shift + Tab | Move focus to the next/previous focusable element inside a Flyout. Focus exits to surrounding page content when you move past the last/first element. |
| Esc | Closes the Flyout. |

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.