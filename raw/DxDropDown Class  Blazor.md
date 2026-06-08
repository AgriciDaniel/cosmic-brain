---
title: "DxDropDown Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown"
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

## DxDropDown Class

In This Article

A control that displays a drop-down window with custom content.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDropDown :
    DxComponentBase,
    IPopupEventInfo,
    IDropDownSettings,
    IParentPopupBranchInfo,
    IPopupLayer,
    IAsyncDisposable
```

## Remarks

The DevExpress DropDown for Blazor (`<DxDropDown>`) allows you to create a drop-down window in your application.

![Blazor DropDown Overview](https://docs.devexpress.com/Blazor/images/blazor-dropdown-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/DropDown)

### Add a DropDown to a Project

Follow the steps below to add the DropDown component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxDropDown></DxDropDown>` markup to a `.razor` file.
3. Write code that manages the DropDown’s.
4. Define the DropDown’s.
5. Configure other options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxDropDown Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown._members).

### Static Render Mode Specifics

Blazor DropDown does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Show and Close a DropDown

Implement [two-way binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding) for the [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.IsOpen) property to show the DropDown in code.

```
<DxButton Id="showDDbutton" aria-describedby="dropDown" Click="() => IsOpen = true">Show DropDown</DxButton>
<DxDropDown Id="dropDown"
            @bind-IsOpen="@IsOpen"
            Width="400"
            BodyText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
              Maecenas porttitor congue massa.">
</DxDropDown>
@code {
    bool IsOpen { get; set; } = false;
}
```

You can call the [ShowAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.ShowAsync\(System.Threading.CancellationToken\)) and [CloseAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.CloseAsync\(System.Threading.CancellationToken\)) methods to show and close a drop-down window asynchronously.

```
<DxButton Text="Show" Click="ShowDropDown" />
<DxButton Text="Close" Click="CloseDropDown" />
<DxDropDown @ref="dropDown"
            Width="400"
            BodyText="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
              Maecenas porttitor congue massa.">
</DxDropDown>
@code {
    DxDropDown dropDown { get; set; }
    async Task ShowDropDown(MouseEventArgs args) {
        await dropDown.ShowAsync();
    }
    async Task CloseDropDown(MouseEventArgs args) {
        await dropDown.CloseAsync();
    }
}
```

#### User Capabilities

Users can close the DropDown in the following ways:

- Press Escape.
- Click outside the DropDown’s boundaries. Set the [CloseOnOutsideClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.CloseOnOutsideClick) property to `false` to disable this option.

#### Respond to Show and Close Actions

Handle the following events to process show and close actions:

[Showing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Showing)

Fires before the drop-down window is displayed.

[Shown](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Shown)

Fires after the drop-down window is displayed.

[Closing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Closing)

Fires before the drop-down window is closed.

[Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Closed)

Fires after the drop-down window is closed.

### Content and Appearance

The drop-down window consists of header, body, and footer. The header and footer are initially hidden. Set [HeaderVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderVisible) and [FooterVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FooterVisible) properties to `true` to display these elements.

Each element can display, a, or a.

#### Display Text

Use the following properties to specify text displayed in the DropDown elements: [HeaderText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderText), [BodyText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.BodyText), and [FooterText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FooterText).

```
<DxButton Id="showDDbutton" Click="() => IsOpen = true">Show DropDown</DxButton>
<DxDropDown @bind-IsOpen="@IsOpen"
            Width="400"
            HeaderVisible="true"
            FooterVisible="true"
            HeaderText="Header"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna."
            FooterText="Footer">
</DxDropDown>
@code {
    bool IsOpen { get; set; } = false;

}
```

![Blazor DropDown Text Properties](https://docs.devexpress.com/Blazor/images/blazor-dropdown-text.png)

To customize the appearance of DropDown elements, assign CSS classes to [HeaderCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderCssClass), [BodyCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.BodyCssClass), and [FooterCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FooterCssClass) properties.

#### Display Custom Content

Use the following properties to display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) in DropDown elements: [HeaderContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderContentTemplate), [BodyContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.BodyContentTemplate), and [FooterContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FooterContentTemplate). A render fragment can include formatted text, images, another component, etc. These templates affect the content area only.

These templates take priority over the `Text` and `CssClass` properties described above.

Each template has the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement a custom close button.

[Run Demo: DropDown - Customization](https://demos.devexpress.com/blazor/DropDown#Customization)

- [Razor](#tabpanel_2PDnm+18mj_tabid-razor)
- [CSS](#tabpanel_2PDnm+18mj_tabid-css)

```
<DxButton Id="showDDbutton" Click="() => IsOpen = true">Show DropDown</DxButton>
<DxDropDown @bind-IsOpen="@IsOpen"
            HeaderVisible="true"
            FooterVisible="true"
            Width="400"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus.">
    <HeaderContentTemplate>
        <div class="my-header">
            Information
        </div>
    </HeaderContentTemplate>
    <FooterContentTemplate>
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK" Click="@context.CloseCallback" />
    </FooterContentTemplate>
</DxDropDown>

@code {
    bool IsOpen { get; set; } = false;
}
```

![Blazor DropDown Header and Footer Templates](https://docs.devexpress.com/Blazor/images/blazor-dropdown-header-text-template.png)

#### Customize Entire Elements (Template)

Specify [HeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderTemplate), [BodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.BodyTemplate), and [FooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FooterTemplate) properties to define the content and appearance of DropDown elements. You can display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) (for instance, formatted text, images, or another component).

These templates substitute entire render fragments of the corresponding elements. Predefined appearance settings, content alignment and paddings, and `Text`, `CssClass`, and `ContentTemplate` properties have no effect.

Each template has the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement a custom close button.

```
<DxButton Id="showDDbtton" Click="() => IsOpenWindow = true">Show DropDown</DxButton>
<DxDropDown Width="400"
            @bind-IsOpen="@IsOpenWindow"
            PositionTarget="#showDDbtton"
            PositionMode="DropDownPositionMode.Bottom">
    <BodyTemplate>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris sit amet metus velnisi blandit tincidunt vel efficitur purus.
        Nunc nec turpis tempus, accumsan orci auctor,
        imperdiet mauris. Fusce id purus magna.
    </BodyTemplate>
</DxDropDown>

@code {
    bool IsOpenWindow { get; set; } = false;
}
```

![Blazor DropDown Body Template](https://docs.devexpress.com/Blazor/images/blazor-dropdown-body-template.png)

### DropDown Size

Use the [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Width) and [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Height) properties to specify the drop-down window’s size.

[Run Demo: DropDown - Resizing](https://demos.devexpress.com/blazor/DropDown#Resizing)

```
<DxButton Id="showDDbutton" Click="() => IsOpen = true">Show DropDown</DxButton>
<DxDropDown @bind-IsOpen="@IsOpen"
            Width="max(25vw, 300px)"
            Height="250"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna.">
</DxDropDown>
@code {
    bool IsOpen { get; set; } = false;
}
```

Set the [AllowResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.AllowResize) property to `true` to allow users to resize the DropDown. Use the following properties to restrict changes to the component size: [MinWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.MinWidth), [MaxWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.MaxWidth), [MinHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.MinHeight), [MaxHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.MaxHeight).

```
<DxButton Id="showDDbutton" Click="() => IsOpen = true">Show DropDown</DxButton>
<DxDropDown @bind-IsOpen="@IsOpen"
            AllowResize="true"
            MinWidth="200"
            MaxWidth="400"
            MinHeight="200"
            MaxHeight="400"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna.">
</DxDropDown>
@code {
    bool IsOpen { get; set; } = false;
}
```

The DropDown’s height changes to fit its content. When the height is restricted and the content exceeds the window’s boundaries, the control displays a vertical scrollbar. You can set the [Scrollable](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Scrollable) property to `false` to disable the vertical scrollbar.

### DropDown Position

Use the [PositionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.PositionMode) property to specify the DropDown position relative to a target element ([PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.PositionTarget)) or to a [Rectangle](https://learn.microsoft.com/dotnet/api/system.drawing.rectangle) object ([PositionRectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.PositionRectangle)). The [HorizontalOffset](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HorizontalOffset) and [VerticalOffset](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.VerticalOffset) properties set the component offset from the specified position.

[Run Demo: DropDown - Position](https://demos.devexpress.com/blazor/DropDown#Position)

```
<DxButton Id="showDDbtton" Click="() => IsOpen = true">Show a drop-down window</DxButton>
<DxDropDown PositionTarget="#showDDbtton"
            PositionMode="DropDownPositionMode.Bottom"
            HorizontalOffset="120"
            VerticalOffset="70"
            Width="210px"
            BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            @bind-IsOpen="@IsOpen">
</DxDropDown>

@code {
    bool IsOpen { get; set; } = false;
}
```

![Blazor DropDown Offsets](https://docs.devexpress.com/Blazor/images/blazor-dropdown-window-offset.png)

The DropDown recalculates its position when certain page elements are changed (for instance, when the page is scrolled or resized). You can call the [RepositionAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.RepositionAsync\(System.Threading.CancellationToken\)) method to force the DropDown to recalculate its position.

### Position Restrictions

Use the [RestrictionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.RestrictionMode) property to specify an element that restricts the DropDown position. The available options are as follows:

[Viewport](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DropDownRestrictionMode)

The drop-down window position is restricted by the viewport.

[Page](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DropDownRestrictionMode)

The drop-down window position is restricted by the page.

[Rectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DropDownRestrictionMode)

The drop-down window position is restricted by a rectangle’s boundaries ([RestrictionRectangle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.RestrictionRectangle)).

[TargetElement](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DropDownRestrictionMode)

The drop-down window position is restricted by a target element’s boundaries ([RestrictionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.RestrictionTarget)).

The [PositionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.PositionMode) and [FitToRestriction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FitToRestriction) properties determine how the DropDown behaves to fit the specified boundaries. When the component does not fit the restrictions, it can be hidden or closed, based on the [CloseMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.CloseMode) property value.

[Run Demo: DropDown - Automatic Position Adjustment](https://demos.devexpress.com/blazor/DropDown#Flipping)

```
<OptionsContent>
    <OptionComboBox Label="Close mode:" CssClass="ow-100" Data="@CloseModeSource" @bind-Value="@CloseMode"/>
    <OptionCheckBox Label="Fit to container" @bind-Checked="FitToRestriction"/>
</OptionsContent>
<ChildContentWithParameters Context="Params">
    <div class="@(IsMobile ? "" : "card") flipping-overflow-container">
        <dxbl-demo-scrollable center-horizontally center-vertically id="flipping-target-container" class="flipping-overflow-content">
            <DxButton
                CssClass="flipping-button" Click="() => IsOpen = !IsOpen"
                RenderStyle="@ButtonRenderStyle.Secondary"
                aria-describedby="dropDown-flipping">SHOW A DROPDOWN</DxButton>
        </dxbl-demo-scrollable>
        <DxDropDown
            @bind-IsOpen="@IsOpen"
            Id="dropDown-flipping"
            CloseOnOutsideClick="false"
            PositionMode="DropDownPositionMode.Bottom"
            PositionTarget=".flipping-button"
            RestrictionTarget=".flipping-overflow-container"
            RestrictionMode="DropDownRestrictionMode.TargetElement"
            PreventCloseOnPositionTargetClick="true"
            CloseMode="@CloseMode"
            FitToRestriction="@FitToRestriction"
            FooterVisible="true"
            SizeMode="Params.SizeMode"
            Width="240">
            <BodyContentTemplate>
                <span class="fs-75">@Constants.ContentShort</span>
            </BodyContentTemplate>
            <FooterContentTemplate>
                <DxButton CssClass="popup-button my-1 ms-2" RenderStyle="ButtonRenderStyle.Primary" Text="OK" Click="@context.CloseCallback" />
                @* ... *@
</ChildContentWithParameters>

@code {

    [Inject]
    @* ... *@
            await EnvironmentInfo.InitializeRuntime();
```

### Keyboard Navigation

When [FocusOnOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.FocusOnOpen) is `true`, the drop-down window receives focus when it opens. On mobile and tablet devices, focus moves to the drop-down window. On desktop devices, focus moves to the first interactive element in the drop-down window.

Users can navigate through the component’s controls with keyboard shortcuts when the DropDown has focus. The component supports keyboard navigation on the client and server.

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus forward through interactive DropDown elements. After the last element, moves focus to the first interactive DropDown element. |
| Shift + Tab | Moves focus backward through interactive DropDown elements. After the first element, moves focus to the last interactive DropDown element. |
| Esc | Closes the DropDown. |

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

### Accessibility Information

The DropDown component is always assigned the [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role). This informs assistive technologies that the component is separated from the rest of the page.

> [!note] Note
> The DropDown’s `role` attribute cannot be changed.

The drop-down window’s accessible name is taken from its header element through the [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) attribute. If you customize the header’s content area with the [HeaderContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.HeaderContentTemplate) property, you must label the component. Pass the following [ARIA attributes](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility#wai-aria-attributes) to the DropDown’s [Attributes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown.Attributes) property:

- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) – References the ID of another element (usually the visible drop-down window title) that defines the accessible name. This is the preferred method.
- [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) – Specify a string value that is used as the accessible name. Use this when a drop-down window header element has no visible text, or when its text does not properly describe the drop-down window’s purpose.

```
<DxDropDown @bind-IsOpen="IsOpen"
            HeaderVisible="true"
            aria-labelledby="my-custom-dropdown-header">
    <HeaderContentTemplate>
        <h2 id="my-custom-dropdown-header">Accessible Dropdown</h2>
    </HeaderContentTemplate>
    <BodyContentTemplate>
        @* ... *@
    </BodyContentTemplate>
</DxDropDown>
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

DxDropDown

See Also

[DxDropDown Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDown._members)