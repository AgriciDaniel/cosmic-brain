---
title: "DxSplitButton Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton"
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

## DxSplitButton Class

In This Article

A composite control that consists of a primary button and a toggleable secondary button that reveals a drop-down element.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxSplitButton :
    DxDropDownButtonBase
```

## Remarks

The DevExpress Split Button component for Blazor (`<DxSplitButton>`) allows users to execute a default action (primary button click) and display a drop-down (secondary button click). The drop-down displays either a command list or custom content. You can apply a predefined style to the component and customize its layout and appearance.

![DxSplitButton - Overview](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-general.png)

[Run Demo: Split Button](https://demos.devexpress.com/blazor/SplitButton)

### Add a Split Button to a Project

Follow the steps below to add a Split Button component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxSplitButton>` … `</DxSplitButton>`.
3. Specify the drop-down window’s content. You can populate the window with a or display.
4. Customize.
5. *Optional.* Specify the primary button [text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Text) or change the secondary button [position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.DropDownTogglePosition).

### API Reference

Refer to the following list for the component API reference: [DxSplitButton Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton._members).

### Static Render Mode Specifics

Blazor Split Button does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Drop-Down List

The `<DxSplitButton>` component supports unbound mode only. Add [DxDropDownButtonItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem) objects to the component markup and use the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.Items) property to specify a collection of root items. Each item can contain child items.

When a user clicks a [drop-down list item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem), the drop-down menu closes. To change this behavior, set the [CloseDropDownOnItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.CloseDropDownOnItemClick) property to `false`.

[Run Demo: Split Button](https://demos.devexpress.com/blazor/SplitButton#Items)

#### Item Groups

You can display horizontal lines within the menu to separate items into groups. To start a new group, set the item’s [BeginGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.BeginGroup) property to `true`.

![DxSplitButton -Item Separator](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-item-separator.png)

```
<DxSplitButton RenderStyle="ButtonRenderStyle.Secondary"
               Text="Clipboard"
               IconCssClass="tb-icon tb-icon-paste"
               CssClass="me-1">
    <Items>
        <DxDropDownButtonItem Text="Cut" IconCssClass="menu-icon-cut menu-icon" />
        <DxDropDownButtonItem Text="Copy" IconCssClass="menu-icon-copy menu-icon" />
        <DxDropDownButtonItem Text="Paste" IconCssClass="tb-icon tb-icon-paste" />
        <DxDropDownButtonItem Text="Paste Special" BeginGroup="true">
            <Items>
                <DxDropDownButtonItem Text="Paste Text Only" />
                <DxDropDownButtonItem Text="Paste Picture" Enabled="false" />
                <DxDropDownButtonItem Text="Paste as Hyperlink" />
            </Items>
        </DxDropDownButtonItem>
    </Items>
</DxSplitButton>
```

#### Items with Hyperlinks

Use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.NavigateUrl) property to specify a URL where the web browser navigates when the drop-down list item is clicked. To specify where the browser should open the URL (for example, the current window or a new tab), use the [Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.Target) property.

The following code snippet opens the **Documentation** item’s `NavigateUrl` link in the same tab and the **Demos** item’s link in a new tab:

![DxSplitButton - Item Navigation Location](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-item-navigation-location.png)

```
<DxSplitButton Text="Blazor Components"
               RenderStyleMode="ButtonRenderStyleMode.Outline" >
    <Items>
        <DxDropDownButtonItem Text="Documentation"
                              NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components" />
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/"
                              Target="_blanc" />
    </Items>
</DxSplitButton>
```

#### Items with Custom Drop-Down Content

Use the item’s [DropDownContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownContentTemplate) property to display custom content within the item’s drop-down window.

![DxSplitButton - Custom Item DropDown Content](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-custom-item-ddcontent.png)

```
<DxSplitButton Text="Blazor Components"
               RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxDropDownButtonItem Text="Documentation" />
        <DxDropDownButtonItem Text="Demos" />
        <DxDropDownButtonItem Text="Click to search">
            <DropDownContentTemplate>
                <div class="d-flex flex-row align-items-center h-100">
                    <DxSearchBox CssClass="search py-0" aria-label="Search" />
                </div>
            </DropDownContentTemplate>
        </DxDropDownButtonItem>
    </Items>
</DxSplitButton>
```

#### Click Events

Use the component’s [ItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.ItemClick) event to specify a common click handler for all drop-down list items. To react to an individual item click, handle the item’s [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event.

```
@inject IJSRuntime JSRuntime

<p>The clicked item is @ClickedItem</p>

<DxSplitButton RenderStyle="ButtonRenderStyle.Secondary"
               Text="Clipboard"
               IconCssClass="tb-icon tb-icon-paste"
               CssClass="me-1"
               ItemClick="@OnItemCommonClick">
    <Items>
        <DxDropDownButtonItem Text="Cut"
                              IconCssClass="menu-icon-cut menu-icon"
                              Click="@OnCutItemClick" />
        <DxDropDownButtonItem Text="Copy"
                              IconCssClass="menu-icon-copy menu-icon"
                              Click="@OnCopyItemClick" />
        <DxDropDownButtonItem Text="Paste"
                              IconCssClass="tb-icon tb-icon-paste" />
    </Items>
</DxSplitButton>

@code {
    public string ClickedItem { get; set; } = "";

    void OnCutItemClick(MouseEventArgs args) {
        ClickedItem = "Cut";
    }
    void OnCopyItemClick(MouseEventArgs args) {
        ClickedItem = "Copy";
    }

    async Task OnItemCommonClick(DropDownButtonItemClickEventArgs args) {
        await JSRuntime.InvokeVoidAsync("alert", $"The drop-down list item has been clicked.");
    }
}
```

### Custom Drop-Down Window Content

The `<DxSplitButton>` component can display a drop-down window with custom content. Specify the component’s [DropDownContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownContentTemplate) property to customize the drop-down window’s layout and appearance.

![blazor-splitbutton-custom-content](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-custom-content.png)

```
@inject NwindDataService NwindDataService
<DxSplitButton RenderStyle="ButtonRenderStyle.Secondary"
               Text="Select Employee"
               CssClass="me-1"
               IconCssClass="sb-icon sb-icon-user-profile"
               DropDownVisible="DropDownVisible">
    <ChildContent>
        <div class="item-template">
            <img src="@StaticAssetUtils.GetImagePath(GetImageFileName(Value))" alt="@Value.FullName"/>
            <span class="item-template-name">@Value.FullName</span>
        </div>
    </ChildContent>
    <DropDownContentTemplate>
        <DxListBox Data="@Data"
                   @bind-Value="@Value"
                   CssClass="cw-640 ch-360">
            <ItemDisplayTemplate>
                <div class="item-template">
                    <img src="@StaticAssetUtils.GetImagePath(GetImageFileName(context.DataItem))"
                         alt="@context.DataItem.FullName"/>
                    <span class="item-template-name">@context.DataItem.FullName</span>
                </div>
            </ItemDisplayTemplate>
        </DxListBox>
    </DropDownContentTemplate>
</DxSplitButton>

@code {
    IEnumerable<Employee> Data { get; set; }
    bool DropDownVisible { get; set; }
    Employee Value { get; set; }
    protected override async Task OnInitializedAsync() {
        Data = await NwindDataService.GetEmployeesAsync();
        Value = Data.FirstOrDefault();
        DropDownVisible = false;
        await base.OnInitializedAsync();
    }
    string GetImageFileName(Employee employee) {
        return $"employees/item-template{employee.EmployeeId}.jpg";
    }
}
```

[Run Demo: Split Button](https://demos.devexpress.com/blazor/SplitButton#CustomContent)

### Primary Button Clicks

Use the `<DxSplitButton>` component’s [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event to specify a click handler for the primary button. If you use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.NavigateUrl) property with the [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event’s handler, the browser handles the event first and then navigates to the specified URL.

```
<p>@Message</p>
<DxSplitButton Text="Blazor Components"
               RenderStyleMode="ButtonRenderStyleMode.Outline"
               NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components"
               Target="_blanc"
               Click="OnPrimaryButtonClick">
    <Items>
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/" />
    </Items>
</DxSplitButton>

@code {
    public string Message { get; set; }
    void OnPrimaryButtonClick(MouseEventArgs args) {
        Message = "The primary button is clicked.";
    }
}
```

You can also use the primary button to submit a form. To enable form submit, set the [SubmitFormOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.SubmitFormOnClick) property to `true`.

### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.SizeMode) property to specify `<DxSplitButton>` component size. The following code snippet applies different size modes to Split Button components:

![DxSplitButton - Size Modes](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-size-modes.png)

```
<DxSplitButton Text="Small" SizeMode="SizeMode.Small">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxSplitButton>
<DxSplitButton Text="Medium" SizeMode="SizeMode.Medium">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxSplitButton>
<DxSplitButton Text="Large" SizeMode="SizeMode.Large">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxSplitButton>
```

### Customization

This section describes how you can customize the `<DxSplitButton>` component and its elements.

#### Predefined Styles

The `<DxSplitButton>` component allows you to apply a predefined style to the main button. You can use the following properties:

[RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.RenderStyle)

Specifies the split button’s predefined style.

[RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.RenderStyleMode)

Specifies the split button’s color filling type.

![DxSplitButton - Predefined Styles](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-predefined-styles.png)

```
<DxSplitButton RenderStyle="ButtonRenderStyle.Secondary"
               RenderStyleMode="ButtonRenderStyleMode.Contained"
               Text="Primary (Contained)">
    @* ... *@
</DxSplitButton>
<DxSplitButton RenderStyle="ButtonRenderStyle.Danger"
               RenderStyleMode="ButtonRenderStyleMode.Outline"
               Text="Danger (Outline)">
    @* ... *@
</DxSplitButton>
<DxSplitButton RenderStyle="ButtonRenderStyle.Link"
               RenderStyleMode="ButtonRenderStyleMode.Text"
               Text="Link (Text)">
    @* ... *@
</DxSplitButton>
```

#### Icons

The `<DxSplitButton>` component allows you to add icons to the primary button and drop-down list items. The following properties are available:

[IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconCssClass)

Specifies the icon’s CSS class.

[IconPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconPosition)

Specifies the icon’s position.

![DxSplitButton - ItemAppearance Customization](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-item-appearance.png)

- [Razor](#tabpanel_jHnzSFLf6n_tabid-razor)
- [CSS](#tabpanel_jHnzSFLf6n_tabid-css)

```
<DxSplitButton RenderStyle="ButtonRenderStyle.Secondary"
               Text="Clipboard"
               IconCssClass="tb-icon tb-icon-paste"
                  CssClass="me-1">
    <Items>
        <DxDropDownButtonItem Text="Cut" IconCssClass="menu-icon-cut menu-icon" />
        <DxDropDownButtonItem Text="Copy" IconCssClass="menu-icon-copy menu-icon" />
        <DxDropDownButtonItem Text="Paste" IconCssClass="tb-icon tb-icon-paste" />
    </Items>
</DxSplitButton>
```

#### Drop-Down Elements

The `<DxSplitButton>` component displays the drop-down toggle icon if a command reveals the drop-down element. You can use the [DropDownToggleCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownToggleCssClass) property to customize toggle appearance. To hide the toggle icon, set the [DropDownToggleVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownToggleVisible) property to `false`.

You can also configure settings of drop-down elements. The following properties are available:

[DropDownCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownCssClass)

Assigns a CSS class to the drop-down element

[DropDownPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownPosition)

Specifies the drop-down element’s position relative to the target element.

[DropDownDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.DropDownDisplayMode)

Specifies how the Split Button component displays its drop-down elements.

[OpenDropDownOnItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSplitButton.OpenDropDownOnItemClick)

Specifies whether to open a drop-down element on item click in `DropDown` [display mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.DropDownDisplayMode) on desktop devices.

The following code snippet changes the position of the main drop-down element in the `<DxSplitButton>` component and customizes the drop-down toggle icon:

![DxSplitButton - Drop-Down Customization](https://docs.devexpress.com/Blazor/images/buttons/split/blazor-splitbutton-dropdown-customization.png)

- [Razor](#tabpanel_jHnzSFLf6n-1_tabid-razor)
- [CSS](#tabpanel_jHnzSFLf6n-1_tabid-css)

```
<DxSplitButton Text="Blazor Components"
               RenderStyleMode="ButtonRenderStyleMode.Outline"
               DropDownToggleCssClass="toggle-icon"
               DropDownPosition="DropDownPosition.Right">
    <Items>
        <DxDropDownButtonItem Text="Documentation"
                              NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components" />
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/" />
    </Items>
</DxSplitButton>
```

#### Tooltips

Use the [Tooltip](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.Tooltip) property to specify tooltip text for the split button or a drop-down list item.

```
<DxSplitButton Text="Blazor Components"
               RenderStyleMode="ButtonRenderStyleMode.Outline"
               Tooltip="Click to see possible options">
    <Items>
        <DxDropDownButtonItem Text="Documentation"
                              NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components"
                              Tooltip="This item contains a link" />
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/"
                              Tooltip="This item contains a link" />
    </Items>
</DxSplitButton>
```

### Keyboard Navigation

The DevExpress Blazor Split Button component supports keyboard shortcuts that allow users to access a drop-down element and navigate through drop-down list items.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab | When the primary button is focused, moves focus to the secondary button. From the secondary button, moves focus to the next page element. |
| Shift + Tab | When the secondary button is focused, moves focus to the primary button. From the primary button, moves focus to the previous page element. |
| Enter   Space   Alt + Down Arrow | Opens a drop-down window and moves focus to its first item. |
| Esc | Closes the current drop-down window and moves focus to the corresponding root item (or main button). |
| Alt + Up Arrow | Closes all drop-down windows and moves focus to the main button. |
| Down Arrow | **In drop-down list**: Cycles focus forward through the items. |
| Up Arrow | **In drop-down list**: Cycles focus backward through the items. |
| Right Arrow | **For multi-level list items**: Opens a nested drop-down window and moves focus to its first item. |
| Left Arrow | **For multi-level list items**: Closes the nested drop-down window and moves focus to the corresponding root item. |