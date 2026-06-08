---
title: "DxButtonGroup Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup"
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

## DxButtonGroup Class

In This Article

A component that displays a set of buttons.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxButtonGroup :
    DxComponentBase,
    INestedSettingsOwner,
    IDisposable
```

## Remarks

The DevExpress Button Group component for Blazor (`<DxButtonGroup>`) can display a set of buttons. You can arrange buttons vertically or horizontally, enable selection, and apply predefined styles.

![DxButtonGroup - Overview](https://docs.devexpress.com/Blazor/images/buttons/button-group/blazor-button-group-overview.png)

[Run Demo: Button Group](https://demos.devexpress.com/blazor/ButtonGroup)

### Add a Button Group to a Project

Follow the steps below to add a Button Group component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxButtonGroup>` … `</DxButtonGroup>`.
3. Populate the component with.
4. Configure the component’s and choose an appropriate.
5. Customize button appearance at the component level or apply individual.

### API Reference

Refer to the following list for the component API reference: [DxButtonGroup Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup._members).

### Static Render Mode Specifics

Blazor Button Group does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Item Collection

Use the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.Items) property to specify a collection of button group items. The [DxButtonGroupItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem) object implements a button group item.

![DxButtonGroup - Items](https://docs.devexpress.com/Blazor/images/buttons/button-group/blazor-button-group-items.png)

```
<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Add Task" />
        <DxButtonGroupItem Text="Edit Task" />
        <DxButtonGroupItem Text="Assign Task" />
        <DxButtonGroupItem Text="Complete Task" />
        <DxButtonGroupItem Text="Archive Task" />
    </Items>
</DxButtonGroup>
```

You can set an item’s [DxButtonGroupItem.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Visible) or [DxButtonGroupItem.Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Enabled) property to `false` to hide or disable a specific item. To hide or disable all items in the component, use the [DxButtonGroup.Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.Visible) or [DxButtonGroup.Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.Enabled) property.

### Items with Hyperlinks

Use the [DxButtonGroupItem.NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.NavigateUrl) property to specify a URL to which the web browser navigates when the button group item is clicked. To specify where the browser should open the URL (same tab or new tab), use the [DxButtonGroupItem.Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.Target) property.

The following code snippet opens the **Blazor Documentation** item’s [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.NavigateUrl) link in the same tab and the **Blazor Demos** item’s link in a new tab:

```
<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Blazor Documentation"
                           NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components"
                           Target="_blank"/>
        <DxButtonGroupItem Text="Blazor Demos"
                           NavigateUrl="https://demos.devexpress.com/blazor/"
                           Target="_blank" />
    </Items>
</DxButtonGroup>
```

### Item Arrangement

The `<DxButtonGroup>` component arranges its items in a row (the orientation mode is `Horizontal`). Use the [DxButtonGroup.Orientation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.Orientation) property to change the mode to `Vertical`.

![DxButtonGroup - Change Orientation](https://docs.devexpress.com/Blazor/images/buttons/button-group/blazor-button-group-orientation.png)

- [Razor](#tabpanel_2kWXuVa83-_tabid-razor)
- [CSS](#tabpanel_2kWXuVa83-_tabid-css)

```
<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary"
               Orientation="Orientation.Vertical">
    <Items>
        <DxButtonGroupItem Text="Add Task"
                           CssClass="justify-content-start"
                           IconCssClass="icon icon-plus" />
        <DxButtonGroupItem Text="Edit Task"
                           CssClass="justify-content-start"
                           IconCssClass="icon icon-edit" />
        <DxButtonGroupItem Text="Assign Task"
                           CssClass="justify-content-start"
                           IconCssClass="icon icon-user-profile" />
        <DxButtonGroupItem Text="Complete Task"
                           CssClass="justify-content-start"
                           IconCssClass="icon icon-check" />
        <DxButtonGroupItem Text="Archive Task"
                           CssClass="justify-content-start"
                           IconCssClass="icon icon-delete" />
    </Items>
</DxButtonGroup>
```

### Item Selection

The `<DxButtonGroup>` component supports item selection. Use the [DxButtonGroup.SelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.SelectionMode) property to specify the selection mode. The default mode is `None` – users cannot select button group items.

Set the [DxButtonGroup.SelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.SelectionMode) property to `Single` or `Multiple` to enable single or multiple item selection. To select specific items in code, set their [DxButtonGroupItem.Selected](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.Selected) properties to `true`. To respond to property changes, handle corresponding [DxButtonGroupItem.SelectedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.SelectedChanged) events.

The following code snippet sets the component’s selection mode to `Single` and displays the current selection state of the **Admin** button group item:

```
<p>Is item selected - @IsItemSelected</p>

<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary"
               RenderStyleMode="ButtonRenderStyleMode.Outline"
               SelectionMode="ButtonGroupSelectionMode.Single">
    <Items>
        <DxButtonGroupItem Text="Admin"
                           Selected="@IsItemSelected"
                           SelectedChanged="@OnSelectedChanged"/>
        <DxButtonGroupItem Text="Editor" />
        <DxButtonGroupItem Text="Guest" />
    </Items>
</DxButtonGroup>

@code {
    bool IsItemSelected = false;

    void OnSelectedChanged(bool isSelected) {
        IsItemSelected = isSelected;
    }
}
```

### Handle Item Clicks

Use the [DxButtonGroup.ItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.ItemClick) event to specify a common click handler for all button group items. To react to an individual item click, handle the item’s [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.Click) event.

- [Razor](#tabpanel_mlwNaaP6rR_tabid-razor)
- [CSS](#tabpanel_mlwNaaP6rR_tabid-css)

```
<p>The clicked item is @ClickedItem</p>

<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary"
               ItemClick="@OnItemClick" >
    <Items>
        <DxButtonGroupItem Text="Add Task"
                           IconCssClass="icon icon-plus"
                           Click="@OnAddItemClick" />
        <DxButtonGroupItem Text="Edit Task"
                           IconCssClass="icon icon-edit"
                           Click="@OnEditItemClick" />
        <DxButtonGroupItem Text="Assign Task"
                           IconCssClass="icon icon-user-profile" />
        <DxButtonGroupItem Text="Complete Task"
                           IconCssClass="icon icon-check" />
        <DxButtonGroupItem Text="Archive Task"
                           IconCssClass="icon icon-delete" />
    </Items>
</DxButtonGroup>

@code{
    public string ClickedItem { get; set; } = "";

    void OnAddItemClick(MouseEventArgs args) {
        ClickedItem = "Add Task";
    }
    void OnEditItemClick(MouseEventArgs args) {
        ClickedItem = "Edit Task";
    }

    async Task OnItemClick(ButtonGroupItemClickEventArgs args) {
        await JSRuntime.InvokeVoidAsync("alert", $"The button group item has been clicked.");
    }
}
```

You can also use a button group item to submit a form. To enable form submit, set the [DxButtonGroupItem.SubmotFormOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.SubmitFormOnClick) property to `true`.

### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.SizeMode) property to specify `<DxButtonGroup>` component size in code. The following code snippet applies different size modes to Button Group components:

![DxButtonGroup - Size Modes](https://docs.devexpress.com/Blazor/images/button/button-group/blazor-button-group-size-modes.png)

```
<DxButtonGroup SizeMode="SizeMode.Small"
               RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Admin" />
        <DxButtonGroupItem Text="Editor" />
        <DxButtonGroupItem Text="Guest" />
    </Items>
</DxButtonGroup>
<DxButtonGroup SizeMode="SizeMode.Medium"
               RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Admin" />
        <DxButtonGroupItem Text="Editor" />
        <DxButtonGroupItem Text="Guest" />
    </Items>
</DxButtonGroup>
<DxButtonGroup SizeMode="SizeMode.Large"
               RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Admin" />
        <DxButtonGroupItem Text="Editor" />
        <DxButtonGroupItem Text="Guest" />
    </Items>
</DxButtonGroup>
```

### Customization

This section describes how you can customize the `<DxButtonGroup>` component and its items.

#### Predefined Styles

The `<DxButtonGroup>` component allows you to apply predefined styles to all button group items or to an individual item. You can use the following properties:

[DxButtonGroup.RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.RenderStyle) | [DxButtonGroupItem.RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.RenderStyle)

Specify a button’s predefined style.

[DxButtonGroup.RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroup.RenderStyleMode) | [DxButtonGroupItem.RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.RenderStyleMode)

Specify a button’s color filling type.

> [!note] Note
> Individual item settings have priority over component settings.

![DxButtonGroup - Apply Predefined Styles](https://docs.devexpress.com/Blazor/images/buttons/button-group/blazor-button-group-predefined-styles.png)

```
<DxButtonGroup RenderStyleMode="ButtonRenderStyleMode.Outline" SizeMode="SizeMode.Large">
    <Items>
        <DxButtonGroupItem Text="Primary" />
        <DxButtonGroupItem Text="Secondary" RenderStyle="ButtonRenderStyle.Secondary" />
        <DxButtonGroupItem Text="Info" RenderStyle="ButtonRenderStyle.Info" />
        <DxButtonGroupItem Text="Link" RenderStyle="ButtonRenderStyle.Link" />
        <DxButtonGroupItem Text="Success" RenderStyle="ButtonRenderStyle.Success" />
        <DxButtonGroupItem Text="Warning" RenderStyle="ButtonRenderStyle.Warning" />
        <DxButtonGroupItem Text="Danger" RenderStyle="ButtonRenderStyle.Danger" />
    </Items>
</DxButtonGroup>
```

#### Icons

You can add icons to [button group items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem). Use the [DxButtonGroupItem.IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconCssClass) property to specify the icon’s CSS class and the [DxButtonGroupItem.IconPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonBase.IconPosition) property to position the icon.

![DxButtonGroup - Item Collection](https://docs.devexpress.com/Blazor/images/buttons/button-group/blazor-button-group-item-collection.png)

- [Razor](#tabpanel_sZq0C0iGZH_tabid-razor)
- [CSS](#tabpanel_sZq0C0iGZH_tabid-css)

```
<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Add Task"
                           IconCssClass="icon icon-plus" />
        <DxButtonGroupItem Text="Edit Task"
                           IconCssClass="icon icon-edit" />
        <DxButtonGroupItem Text="Assign Task"
                           IconCssClass="icon icon-user-profile" />
        <DxButtonGroupItem Text="Complete Task"
                           IconCssClass="icon icon-check" />
        <DxButtonGroupItem Text="Archive Task"
                           IconCssClass="icon icon-delete" />
    </Items>
</DxButtonGroup>
```

#### Tooltips

Use an item’s [DxButtonGroupItem.Tooltip](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxButtonGroupItem.Tooltip) property to specify tooltip text.

```
<DxButtonGroup RenderStyle="ButtonRenderStyle.Secondary">
    <Items>
        <DxButtonGroupItem Text="Blazor Documentation"
                           NavigateUrl="https://docs.devexpress.com/Blazor/400725/blazor-components"
                           Tooltip="This item contains a link" />
        <DxButtonGroupItem Text="Blazor Demos"
                           NavigateUrl="https://demos.devexpress.com/blazor/"
                           Target="_blank"
                           Tooltip="This item contains a link" />
    </Items>
</DxButtonGroup>
```

### Keyboard Navigation

The DevExpress Blazor Button Group component supports keyboard shortcuts that allow users to navigate through button group items, select items, and invoke their click event handlers.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus to the next button in the group. From the last button, moves focus to the next page element. |
| Shift + Tab | Moves focus to the previous button in the group. From the first button, moves focus to the previous page element. |
| End | Moves focus to the last visible item. |
| Home | Moves focus to the first visible item. |
| Enter, Space | Invokes a click event handler for the focused item.   **For `Single` and `Multiple` selection modes**: selects the focused item. |