---
title: "DxPopup Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup"
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

## DxPopup Class

In This Article

A modal popup window with custom content that overlays the current view.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxPopup :
    DxPopupBase
```

## Remarks

The DevExpress Popup for Blazor allows you to show a modal pop-up window. The window traps focus and users cannot access HTML elements located outside the window until it is closed.

![Blazor Popup](https://docs.devexpress.com/Blazor/images/blazor-popup.png)

[Run Demo: Popup - Overview](https://demos.devexpress.com/blazor/Popup)

### Add a Popup to a Project

Follow the steps below to add the Popup component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxPopup></DxPopup>` markup to a `.razor` file.
3. Write code that manages the Popup’s.
4. Define the Popup’s.
5. Configure other options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxPopup Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup._members).

### Popup Render

The Popup component renders in a root pop-up container that is placed directly in the document body. See the example of the HTML markup below. You do not need to copy this sample, as the Popup generates this markup automatically.

```html
<body>
    <!-- ... -->
    <dxbl-popup-root>
        <!-- ... -->
        <dxbl-modal>
            <!-- Popup render -->
        </dxbl-modal>
        <!-- ... -->
    </dxbl-popup-root>
</body>
```

This behavior allows the Popup to be displayed correctly and prevents parent elements and CSS rules from clipping or affecting content.

### Static Render Mode Specifics

Blazor Popup does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Show and Close a Popup

Implement [two-way binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding) for the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Visible) property to show the Popup in code and update the property value when a user closes the Popup.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible">
</DxPopup>

@code {
    bool PopupVisible { get; set; } = false;
}
```

Call the [ShowAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.ShowAsync\(System.Threading.CancellationToken\)) and [CloseAsync](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.CloseAsync\(System.Threading.CancellationToken\)) methods to show and close the Popup asynchronously. Make sure the component has been initialized before you call the `ShowAsync` method. Use the [IsInitialized](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.IsInitialized) property to check the initialization state.

#### User Capabilities

Users can close the Popup in the following ways:

- Click the Close button in the header.
- Click outside the Popup’s boundaries.
- Press Escape.

Set the [ShowCloseButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.ShowCloseButton), [CloseOnOutsideClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.CloseOnOutsideClick), and [CloseOnEscape](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.CloseOnEscape) properties to `false` to disable these user capabilities.

### Drag a Popup

Set the `AllowDrag` property to `true` to allow users to drag the Popup by its header to a new position. You can disable the [AllowDragByHeaderOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.AllowDragByHeaderOnly) option to allow dragging by every window element – header, body, or footer.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
                   nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
                   imperdiet mauris. Fusce id purus magna."
         AllowDrag="true">
</DxPopup>

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Drag the modal component](https://docs.devexpress.com/Blazor/images/blazor-dxpopup-allowdrag.gif)

You can handle the following events to process drag actions:

[DragStarted](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.DragStarted)

Fires when a user drags the Popup or resizes it by edges.

[DragCompleted](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.DragCompleted)

Fires when a user drops the Popup.

[Run Demo: Dragging](https://demos.devexpress.com/blazor/Popup#Dragging)

### Content and Appearance

The Popup consists of body and header with the **Close** button. Disable the [ShowHeader](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.ShowHeader) option to hide the header. You can also enable the [ShowFooter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.ShowFooter) option to display the Popup footer.

#### Display Text

Use the [HeaderText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.HeaderText), [BodyText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.BodyText), and [FooterText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.FooterText) properties to specify text displayed in Popup elements. All predefined appearance settings apply to these elements.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna." />

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Blazor Popup](https://docs.devexpress.com/Blazor/images/blazor-popup.png)

To customize the appearance of Popup elements, assign CSS classes to [HeaderCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.HeaderCssClass), [BodyCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.BodyCssClass), and [FooterCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.FooterCssClass) properties.

[Run Demo: Popup - Overview](https://demos.devexpress.com/blazor/Popup)

#### Display Custom Content

Use [HeaderContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.HeaderContentTemplate), [BodyContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.BodyContentTemplate), and [FooterContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.FooterContentTemplate) properties to display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) in Popup elements. A render fragment can include formatted text, images, or another component. These templates affect content area only.

This template replaces default content but keeps the predefined space between the content area and border. The header’s content area does not include the Close button. The following image highlights the content area in red:

![Blazor Popup Content Area](https://docs.devexpress.com/Blazor/images/blazor-popup-content-area.png)

These templates take priority over the `*Text` and `*CssClass` properties described above.

Each template accepts an [IPopupElementInfo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo) object as the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement the Close button.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         ShowFooter="true">
    <BodyContentTemplate>
        <i>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
            nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
            imperdiet mauris. Fusce id purus magna.
        </i>
    </BodyContentTemplate>
    <FooterContentTemplate>
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK"
                  Click="@context.CloseCallback" />
    </FooterContentTemplate>
</DxPopup>

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Blazor Popup Content Templates](https://docs.devexpress.com/Blazor/images/blazor-popup-content-templates.png)

[Run Demo: Popup - Customization](https://demos.devexpress.com/blazor/Popup#Customization)

[View Example: Blazor Popup - Add Content Dynamically](https://github.com/DevExpress-Examples/blazor-create-popup-dynamically)

#### Customize Entire Elements

Specify [HeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.HeaderTemplate), [BodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.BodyTemplate), and [FooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.FooterTemplate) properties to define Popup element content and appearance. Predefined appearance settings do not apply. You can display any UI [render fragment](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) (for instance, formatted text, images, or another component).

These templates substitute the entire render fragments of corresponding elements. Predefined appearance settings, content alignment and paddings, and the corresponding `Text`, `CssClass`, and `ContentTemplate` properties have no effect.

Each template accepts an [IPopupElementInfo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo) object as the `context` parameter. You can use the parameter’s [CloseCallback](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IPopupElementInfo.CloseCallback) property to implement the Close button.

- [Razor](#tabpanel_n1ow6X4jDb_tabid-razor)
- [CSS](#tabpanel_n1ow6X4jDb_tabid-css)

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Edit Contact"
         ShowFooter="true">
    <BodyTemplate Context="PopupContext">
        <div class="form-container">
            <DxFormLayout>
                <DxFormLayoutItem Caption="Contact Name:" ColSpanMd="12">
                    <Template>
                        <DxTextBox Text="Nancy Davolio" />
                    </Template>
                </DxFormLayoutItem>
                <DxFormLayoutItem Caption="Birth Date:" ColSpanMd="12">
                    <Template>
                        <DxDateEdit Date="DateTime.Now.AddYears(-30)" />
                    </Template>
                </DxFormLayoutItem>
                <DxFormLayoutItem Caption="Years Worked:" ColSpanMd="12">
                    <Template>
                        <DxSpinEdit Value="3" />
                    </Template>
                </DxFormLayoutItem>
                <DxFormLayoutItem Caption="Email:" ColSpanMd="12">
                    <Template>
                        <DxTextBox Text="NancyDavolio@sample.com" />
                    </Template>
                </DxFormLayoutItem>
            </DxFormLayout>
        </div>
    </BodyTemplate>
    <FooterContentTemplate>
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK"
                  Click="@context.CloseCallback" />
    </FooterContentTemplate>
</DxPopup>

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Blazor Popup Templates](https://docs.devexpress.com/Blazor/images/blazor-popup-templates.png)

[Run Demo: Popup - Customization](https://demos.devexpress.com/blazor/Popup#Customization)

### Alignment

The Popup is centered both horizontally and vertically on the screen. Use the [HorizontalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.HorizontalAlignment) and [VerticalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.VerticalAlignment) properties to change the Popup position.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna."
         HorizontalAlignment="HorizontalAlignment.Right"
         VerticalAlignment="VerticalAlignment.Bottom" />

@code {
    bool PopupVisible { get; set; } = false;
}
```

[Run Demo: Popup - Alignment and Size](https://demos.devexpress.com/blazor/Popup#Alignment)

You can specify [PositionX](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.PositionX) and [PositionY](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.PositionY) properties to display the component at the specific coordinates. These properties have priority over [HorizontalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.HorizontalAlignment) and [VerticalAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.VerticalAlignment).

### Size

Popup width is equal to 500px on desktops. On phones and tablets, the width adapts to the viewport width. Popup height changes to fit content.

Use the [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Width) and [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Height) properties to specify the Popup size in [CSS units](https://www.w3schools.com/cssref/css_units.php):

- Specify the absolute width/height (for instance, `Width="300px"`).
- Specify the relative width/height (for instance, `Width="50%"`).
- Make the width/height fit the content (`Width="auto"`).

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
             nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
             imperdiet mauris. Fusce id purus magna."
         Width="400px"
         Height="200px" />

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Blazor Popup Custom Size](https://docs.devexpress.com/Blazor/images/blazor-popup-custom-size.png)

[MinWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.MinWidth), [MaxWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.MaxWidth), [MinHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.MinHeight), and [MaxHeight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.MaxHeight) properties allow you to define size constraints when the Popup automatically adapts to its content.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="@DynamicText"
         Width="auto"
         MinWidth="300px"
         MaxWidth="600px" />

@code {
    bool PopupVisible { get; set; } = false;
    string DynamicText { get; set; } // Get text from an external source.
}
```

When Popup content does not fit the window’s size, this content is displayed over the window’s boundaries. Set the [Scrollable](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Scrollable) property to `true` to show scrollbars and display all content inside the window’s boundaries.

[Run Demo: Popup - Alignment and Size](https://demos.devexpress.com/blazor/Popup#Alignment)

Set the [AllowResize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup.AllowResize) property to `true` to allow users to change the component size at runtime.

```
<div @onclick="@(() => PopupVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@PopupVisible"
         HeaderText="Header"
         BodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus vel
                   nisi blandit tincidunt vel efficitur purus. Nunc nec turpis tempus, accumsan orci auctor,
                   imperdiet mauris. Fusce id purus magna."
         AllowResize="true"
         ApplyBackgroundShading="false">
</DxPopup>

@code {
    bool PopupVisible { get; set; } = false;
}
```

![Resize the component](https://docs.devexpress.com/Blazor/images/blazor-dxpopup-allowresize.gif)

[Run Demo: Resizing](https://demos.devexpress.com/blazor/Popup#Resizing)

### Respond to Show and Close Actions

Handle the following events to process show and close actions:

- [Showing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Showing) - Fires before the Popup is displayed and allows you to cancel this action.
- [Shown](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Shown) - Fires after the Popup is displayed.
- [Closing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Closing) - Fires before the Popup is closed and allows you to cancel this action.
- [Closed](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Closed) - Fires after the Popup is closed.

In the following example, neither the Close button in the header nor the custom OK button closes the Popup until a user enables the checkbox in the footer.

- [Razor](#tabpanel_V1yeTCZhyc_tabid-razor)
- [CSS](#tabpanel_V1yeTCZhyc_tabid-css)

```
<div @onclick="@(() => EulaVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@EulaVisible"
         ShowFooter="true"
         HeaderText="DevExpress EULA"
         Closing="EulaPopupClosing"
         Closed="EulaPopupClosed">
    <BodyContentTemplate>
        <p>
            The terms of our license are fully outlined/described in the Developer Express Inc End User
            License Agreement (EULA) included with our product installations. Before you can install and use
            a Developer Express Inc product, you must read, understand and accept the terms/conditions of
            our EULAs. <a target="" _blank"" rel="" noopener noreferrer"" href=""
                          https: //www.devexpress.com/support/eulas/"">More info...</a>
        </p>
    </BodyContentTemplate>
    <FooterContentTemplate Context="Context">
        <DxCheckBox class="my-margin" @bind-Checked="@EulaAccepted">
            I accept the terms of the EULA
        </DxCheckBox>
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK" Click="Context.CloseCallback" />
    </FooterContentTemplate>
</DxPopup>
@code {
    bool EulaAccepted { get; set; }
    bool EulaVisible { get; set; }

    void EulaPopupClosed(PopupClosedEventArgs args) {
        EulaAccepted = false;
    }
    void EulaPopupClosing(PopupClosingEventArgs args) {
        args.Cancel = !EulaAccepted;
    }
}
```

[Run Demo: Popup - Response to Show and Close Actions](https://demos.devexpress.com/blazor/Popup#Events)

### Multiple Popups

You can show multiple Popups simultaneously. Their Z-indices are calculated based on the display order. To change a Popup’s z-index, specify the [ZIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.ZIndex) property.

The following example creates a Popup that users can close only after they enable the checkbox. Another Popup appears if users do not enable the checkbox.

- [Razor](#tabpanel_n1ow6X4jDb-1_tabid-razor)
- [CSS](#tabpanel_n1ow6X4jDb-1_tabid-css)

```
<div @onclick="@(() => EulaVisible = true)">
    <p>CLICK TO SHOW A POP-UP WINDOW</p>
</div>

<DxPopup @bind-Visible="@EulaVisible"
         ShowFooter="true"
         HeaderText="DevExpress EULA"
         Closing="EulaPopupClosing"
         Closed="EulaPopupClosed">
    <BodyContentTemplate>
        <p>
            The terms of our license are fully outlined/described in the Developer Express Inc End User
            License Agreement (EULA) included with our product installations. Before you can install and use
            a Developer Express Inc product, you must read, understand and accept the terms/conditions of
            our EULAs. <a target="" _blank"" rel="" noopener noreferrer"" href=""
                          https: //www.devexpress.com/support/eulas/"">More info...</a>
        </p>
    </BodyContentTemplate>
    <FooterContentTemplate Context="Context">
        <DxCheckBox class="m-checkbox" @bind-Checked="@EulaAccepted">
            I accept the terms of the EULA
        </DxCheckBox>
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK" Click="Context.CloseCallback" />
    </FooterContentTemplate>
</DxPopup>
<DxPopup @bind-Visible="@MessageBoxVisible"
         ShowFooter="true"
         HeaderText="DevExpress EULA"
         BodyText="You must read and accept the terms of the EULA to continue.">
    <FooterContentTemplate Context="Context">
        <DxButton RenderStyle="ButtonRenderStyle.Primary" Text="OK" Click="Context.CloseCallback" />
    </FooterContentTemplate>
</DxPopup>
@code {
    bool EulaAccepted { get; set; }
    bool EulaVisible { get; set; }
    bool MessageBoxVisible { get; set; }

    void EulaPopupClosed() {
        EulaAccepted = false;
    }
    void EulaPopupClosing(PopupClosingEventArgs args) {
        if (!EulaAccepted) {
            args.Cancel = true;
            MessageBoxVisible = true;
        }
    }
}
```

[Run Demo: Popup - Response to Show and Close Actions](https://demos.devexpress.com/blazor/Popup#Events)

### Keyboard Navigation

When a Popup opens, it automatically receives focus. On mobile and tablet devices, focus moves to the Popup window. On desktop devices, focus moves to the first interactive element in the window or to the **Close** button.

Users can navigate through the component’s controls with keyboard shortcuts. The component supports keyboard navigation on the client and server.

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus forward through interactive Popup elements. After the last element, moves focus to the first interactive Popup element. |
| Shift + Tab | Moves focus backward through interactive Popup elements. After the first element, moves focus to the last interactive Popup element. |
| Esc | If [CloseOnEscape](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.CloseOnEscape) is enabled, closes the Popup. |

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

### Accessibility Information

The Popup component is always assigned the [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) and [aria-modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal) attribute. This informs assistive technologies that the component is separated from the rest of the page and the content outside the pop-up window is inactive while it is open.

> [!note] Note
> The Popup’s `role` and `aria-modal` attributes cannot be changed.

The pop-up window’s accessible name is taken from its header element through the [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) attribute. However, if you customize the header’s content area with the [HeaderContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.HeaderContentTemplate) property, you must manually label the component. Pass the following [ARIA attributes](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility#wai-aria-attributes) to the Popup’s [Attributes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopupBase.Attributes) property:

- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) – References the ID of another element (usually the visible popup title) that defines the accessible name. This is the preferred method.
- [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) – Specify a string value that is used as the accessible name. Use this when a header element has no visible text, or when its text does not properly describe the popup’s purpose.

```
<DxPopup @bind-Visible="PopupVisible"
         aria-labelledby="my-custom-popup-header">
    <HeaderContentTemplate>
        <h2 id="my-custom-popup-header">Accessible Popup</h2>
    </HeaderContentTemplate>
    <BodyContentTemplate>
        @* ... *@
    </BodyContentTemplate>
</DxPopup>
```

### Examples

Our knowledge base contains a wide array of sample projects that demonstrate the most popular usage scenarios, such as:

- [How to implement a confirmation dialog](https://github.com/DevExpress-Examples/blazor-popup-confirmation-dialog)
- [Add Content Dynamically](https://github.com/DevExpress-Examples/blazor-create-popup-dynamically)

You can find more task-based examples in the following topic: [Blazor Popup - Examples](https://docs.devexpress.com/Blazor/404359/examples).

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxPopup Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPopup._members)