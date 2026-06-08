---
title: "DxDropDownButton Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton"
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

## DxDropDownButton Class

In This Article

A toggleable button that reveals a drop-down element with a list of commands or custom content.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDropDownButton :
    DxDropDownButtonBase
```

## Remarks

The DevExpress Drop-Down Button component for Blazor (`<DxDropDownButton>`) combines the functionality of a button and a drop-down. Once a user clicks the main button, the drop-down window displays either a command list or custom content. You can apply a predefined style to the main button and customize the component’s layout and appearance.

![DxDropDownButtton - Overview](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-general.png)

[Run Demo: Drop-Down Button](https://demos.devexpress.com/blazor/DropDownButton)

### Add a Drop-Down Button to a Project

Follow the steps below to add a Drop-Down Button component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxDropDownButton>` … `</DxDropDownButton>`.
3. Specify the drop-down window’s content. You can populate the window with a or display.
4. Customize.
5. *Optional*. Specify the button [text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Text).

### API Reference

Refer to the following list for the component API reference: [DxDropDownButton Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton._members).

### Static Render Mode Specifics

Blazor Drop-Down Button does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Drop-Down List

The `<DxDropDownButton>` component supports unbound mode only. Add [DxDropDownButtonItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem) objects to the component markup and use the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.Items) property to specify a collection of root items. Each item can contain child items.

When a user clicks a [drop-down list item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem), the drop-down menu closes. To change this behavior, set the [CloseDropDownOnItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.CloseDropDownOnItemClick) property to `false`.

[Run Demo: Drop-Down Button](https://demos.devexpress.com/blazor/DropDownButton#Items)

#### Item Groups

You can display horizontal lines within the menu to separate items into groups. To start a new group, set the item’s [BeginGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.BeginGroup) property to `true`.

![DxDropDownButton - Item Separator](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-dropdown-button-item-separator.png)

```
<DxDropDownButton RenderStyle="ButtonRenderStyle.Secondary"
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
</DxDropDownButton>
```

#### Items with Hyperlinks

Use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.NavigateUrl) property to specify a URL where the web browser navigates when the drop-down list item is clicked. To specify where the browser should open the URL (for example, the current window or a new tab), use the [Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonItem.Target) property.

The following code snippet opens the **Documentation** item’s `NavigateUrl` link in the same tab and the **Demos** item’s link in a new tab:

![DxDropDownButton - Navigation Location](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-dropdown-button-navigation-location.png)

```
<DxDropDownButton Text="Blazor Components"
                  RenderStyleMode="ButtonRenderStyleMode.Outline" >
    <Items>
        <DxDropDownButtonItem Text="Documentation"
                              NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components" />
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/"
                              Target="_blank" />
    </Items>
</DxDropDownButton>
```

#### Items with Custom Drop-Down Content

Use the item’s [DropDownContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownContentTemplate) property to display custom content within the item’s drop-down window.

![DxDropDownButtonItem - Custom DropDown Content](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-custom-item-ddcontent.png)

```
<DxDropDownButton Text="Blazor Components"
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
</DxDropDownButton>
```

#### Click Events

Use the component’s [ItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.ItemClick) event to specify a common click handler for all drop-down list items. To react to an individual item click, handle the item’s [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event.

```
@inject IJSRuntime JSRuntime

<p>The clicked item is @ClickedItem</p>

<DxDropDownButton RenderStyle="ButtonRenderStyle.Secondary"
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
</DxDropDownButton>

@code {
    public string ClickedItem { get; set; } = "";

    void OnCutItemClick(MouseEventArgs args) {
        ClickedItem = "Cut";
    }
    void OnCopyItemClick(MouseEventArgs args) {
        ClickedItem = "Copy";
    }

    async Task OnItemCommonClick(DropDownButtonItemClickEventArgs args) {
        await JSRuntime.InvokeVoidAsync("alert", $"The drop-down button item has been clicked.");
    }
}
```

### Custom Drop-Down Window Content

The `<DxDropDownButton>` component can display a drop-down window with custom content. Specify the component’s [DropDownContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownContentTemplate) property to customize the drop-down window’s layout and appearance.

![DxDropDownButton - Drop-Down Window Content Customization](https://docs.devexpress.com/Blazor/images/buttons/drop-down-blazor-ddbutton-custom-dd-content.png)

```
@inject NwindDataService NwindDataService

<DxDropDownButton RenderStyle="ButtonRenderStyle.Secondary"
                  Text="Select Employee"
                  CssClass="me-1"
                  IconCssClass="menu-icon-user-profile menu-icon"
                  DropDownVisible="DropDownVisible">
    <DropDownContentTemplate>
        <DxListBox Data="@Data"
                   @bind-Value="@Value"
                   CssClass="cw-640 ch-360">
            <ItemDisplayTemplate>
                <div class="listbox-item-template">
                    <img src="@StaticAssetUtils.GetImagePath(GetImageFileName(context.DataItem))"
                         alt="@context.DataItem.FullName"/>
                    <span class="listbox-item-template-name">@context.DataItem.FullName</span>
                </div>
            </ItemDisplayTemplate>
        </DxListBox>
    </DropDownContentTemplate>
</DxDropDownButton>
<p class="demo-text cw-400 mt-2">
    Selected item: <b>@Value?.Text</b>
</p>

@code {
    IEnumerable<Employee> Data { get; set; }
    bool DropDownVisible { get; set; }
    Employee Value { get; set; }
    protected override async Task OnInitializedAsync() {
        Data = await NwindDataService.GetEmployeesAsync();
        Value = Data.FirstOrDefault();
        DropDownVisible = false;
    }
    string GetImageFileName(Employee employee) {
        return $"employees/item-template{employee.EmployeeId}.jpg";
    }
}
```

[Run Demo: Drop-Down Button](https://demos.devexpress.com/blazor/DropDownButton#CustomContent)

### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.SizeMode) property to specify `<DxDropDownButton>` component size in code. The following code snippet applies different size modes to Drop-Down Button components:

![DxDropDownButton - Size Modes](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-size-modes.png)

```
<DxDropDownButton Text="Small" SizeMode="SizeMode.Small">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxDropDownButton>
<DxDropDownButton Text="Medium" SizeMode="SizeMode.Medium">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxDropDownButton>
<DxDropDownButton Text="Large" SizeMode="SizeMode.Large">
    <Items>
        <DxDropDownButtonItem Text="Favorites" />
        <DxDropDownButtonItem Text="Recently Added" />
        <DxDropDownButtonItem Text="Show All" />
    </Items>
</DxDropDownButton>
```

### Customization

This section describes how you can customize the `<DxDropDownButton>` component and its elements.

#### Predefined Styles

The `<DxDropDownButton>` component allows you to stylize the main button with predefined styles. You can use the following properties:

[RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.RenderStyle)

Specifies the drop-down button’s predefined style.

[RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.RenderStyleMode)

Specifies the drop-down button’s color filling type.

![DxDropDownButton - Predefined Styles](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-predefined-styles.png)

```
<DxDropDownButton RenderStyle="ButtonRenderStyle.Primary"
                  RenderStyleMode="ButtonRenderStyleMode.Contained"
                  Text="Primary (Contained)">
    @* ... *@
</DxDropDownButton>
<DxDropDownButton RenderStyle="ButtonRenderStyle.Danger"
                  RenderStyleMode="ButtonRenderStyleMode.Outline"
                  Text="Danger (Outline)">
    @* ... *@
</DxDropDownButton>
<DxDropDownButton RenderStyle="ButtonRenderStyle.Link"
                  RenderStyleMode="ButtonRenderStyleMode.Contained"
                  Text="Link">
    @* ... *@
</DxDropDownButton>
```

#### Icons

The `<DxDropDownButton>` component allows you to add icons to the main button and its nested items. The following properties are available:

[IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconCssClass)

Specifies the icon’s CSS class.

[IconPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconPosition)

Specifies the icon’s position.

![DxDropDownButton - Item Appearance Customization](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-item-appearance.png)

- [Razor](#tabpanel_e4+dvHQMPF_tabid-razor)
- [CSS](#tabpanel_e4+dvHQMPF_tabid-css)

```
<DxDropDownButton RenderStyle="ButtonRenderStyle.Secondary"
                  Text="Clipboard"
                  IconCssClass="tb-icon tb-icon-paste"
                  CssClass="me-1">
    <Items>
        <DxDropDownButtonItem Text="Cut" IconCssClass="menu-icon-cut menu-icon" />
        <DxDropDownButtonItem Text="Copy" IconCssClass="menu-icon-copy menu-icon" />
        <DxDropDownButtonItem Text="Paste" IconCssClass="tb-icon tb-icon-paste" />
    </Items>
</DxDropDownButton>
```

#### Drop-Down Elements

The `<DxDropDownButton>` component displays the drop-down toggle icon if a command reveals the drop-down element. You can use the [DropDownToggleCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownToggleCssClass) property to customize toggle appearance. To hide the toggle icon, set the [DropDownToggleVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownToggleVisible) property to `false`.

You can also configure settings of drop-down elements. The following properties are available:

[DropDownCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownCssClass)

Assigns a CSS class to the drop-down element

[DropDownPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.DropDownPosition)

Specifies the drop-down element’s position relative to the target element.

[DropDownDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.DropDownDisplayMode)

Specifies how the Drop-Down Button component displays its drop-down elements.

[OpenDropDownOnItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.OpenDropDownOnItemClick)

Specifies whether to open a drop-down element on item click in `DropDown` [display mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButton.DropDownDisplayMode) on desktop devices.

The following code snippet changes the position of the main drop-down element in the `DxDropDownButton` component and customizes the drop-down toggle icon:

![DxDropDownButton - Change Drop-Down Position](https://docs.devexpress.com/Blazor/images/buttons/drop-down/blazor-ddbutton-dropdown-position.png)

- [Razor](#tabpanel_ywLSvMqyZL_tabid-razor)
- [CSS](#tabpanel_ywLSvMqyZL_tabid-css)

```
<DxDropDownButton Text="Blazor Components"
                  RenderStyleMode="ButtonRenderStyleMode.Outline"
                  DropDownToggleCssClass="toggle-icon"
                  DropDownPosition="DropDownPosition.Right">
    <Items>
        <DxDropDownButtonItem Text="Documentation"
                              NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components" />
        <DxDropDownButtonItem Text="Demos"
                              NavigateUrl="https://demos.devexpress.com/blazor/" />
    </Items>
</DxDropDownButton>
```

#### Tooltips

Use the [Tooltip](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownButtonBase.Tooltip) property to specify tooltip text for the main button or a drop-down list item.

```
<DxDropDownButton Text="Blazor Components"
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
</DxDropDownButton>
```

### Keyboard Navigation

The DevExpress Blazor Drop-Down Button component supports keyboard shortcuts that allow users to access a drop-down element and navigate through drop-down list items.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab, Shift + Tab | When the Drop-Down Button is focused, moves focus to the next/previous focusable element on a page. |
| Enter, Space   Alt + Down Arrow | Opens a drop-down window and moves focus to its first item. |
| Right Arrow | **For drop-down list items**: Opens a drop-down window and moves focus to its first item. |
| Alt + Up Arrow | Closes all drop-down windows and moves focus to the main button. |
| Esc | Closes the current drop-down window and moves focus to the corresponding root item (or main button). |
| Left Arrow | **For drop-down list items**: Closes the current drop-down window and moves focus to the corresponding root item. |
| Down Arrow | Moves focus to the next drop-down list item. |
| Up Arrow | Moves focus to the previous drop-down list item. |