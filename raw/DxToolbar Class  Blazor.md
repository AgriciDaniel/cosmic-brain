---
title: "DxToolbar Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar"
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

## DxToolbar Class

In This Article

A toolbar control that implements an adaptive button-based interface.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxToolbar :
    DxControlComponent<ToolbarJSInteropProxy>,
    IToolbarJSInteropProxyServer,
    IJSCallback,
    IModelWrapper<IToolbarModel>
```

## Remarks

The DevExpress Toolbar component for Blazor (`<DxToolbar>`) implements adaptive button-based interfaces in your application. The component allows users to access frequently used actions.

![Toolbar Overview](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-overview.png)

[Run Demo: Toolbar](https://demos.devexpress.com/blazor/Toolbar)

### Add a Toolbar to a Project

Follow the steps below to add the Toolbar component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxToolbar>` … `</DxToolbar>` markup to a `.razor` file.
3. Configure the component: add items, specify a toolbar title, handle item clicks, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxToolbar Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar._members).

### Static Render Mode Specifics

Blazor Toolbar does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Items

You can specify toolbar items between the `<DxToolbar>` and `</DxToolbar>` tags or add them to the [DxToolbarBase.Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.Items) collection. Use the [ChildContent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem.ChildContent) property to add custom content to items. Each item is a [DxToolbarItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem) class instance that can have a collection of child items (the [DxToolbarItem.Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem.Items) property).

The Toolbar component can contain [drop-down buttons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem#drop-down-items), [checked items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem#checked-items-and-groups), and [link buttons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem#items-with-links). You can customize item appearance and [group](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.BeginGroup) items, and use templates to specify an item’s layout and appearance. Refer to the [DxToolbarItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem) class description for additional information.

```
<div class="card p-2">
    <DxToolbar>
        <Items>
            <DxToolbarItem GroupName="align" IconCssClass="oi oi-align-left" />
            <DxToolbarItem GroupName="align" IconCssClass="oi oi-align-center" />
            <DxToolbarItem GroupName="align" IconCssClass="oi oi-align-right" />
            <DxToolbarItem Text="Font Style" BeginGroup="true">
                <Items>
                    <DxToolbarItem IconCssClass="oi oi-bold" 
                                   Text="Bold" 
                                   GroupName="bold" />
                    <DxToolbarItem IconCssClass="oi oi-italic"  
                                   Text="Italic" 
                                   GroupName="italic" />
                    <DxToolbarItem IconCssClass="oi oi-underline" 
                                   Text="Underline" 
                                   GroupName="underline" />
                </Items>
            </DxToolbarItem>
        </Items>    
    </DxToolbar>
</div>
```

![Toolbar Checked Items](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-checked-items.png)

#### Custom Content

If you specify custom content markup, you can still use toolbar item API to access related data. For example, the **Blog** item in the following code snippet contains a badge and a `<span>` tag that obtain text content from the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.Text) property.

```
<div class="card p-2">
    <DxToolbar>
        <Items>
            <DxToolbarItem Text="Products" />
            <DxToolbarItem Text="Support" />
            <DxToolbarItem Text="Documentation" />
            <DxToolbarItem Text="Blog">
                @context.Text<span class="badge rounded-pill bg-primary ms-1">3</span>
            </DxToolbarItem>
         </Items>
    </DxToolbar>
</div>
```

![Toolbar Item: ChildContent Usage](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbaritem-custom-content.png)

### Data Binding

You can populate the Toolbar component with items from a data source.

Follow the steps below to bind Toolbar to data:

1. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.Data) property to specify a data source. You can use different collection types:
	- Flat data (a collection of items organized as a single-level structure)
		- Hierarchical data (a collection of nested items)
2. Add the [DataMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.DataMappings) tag to the component’s markup.
3. Create the [DxToolbarDataMapping](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarDataMapping) instance and map [item properties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarDataMapping._members) ([BeginGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarDataMappingBase.BeginGroup), [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarDataMappingBase.NavigateUrl), and so on) to data source fields. Mappings are used to assign data from the source collection to the component’s data model.
	- For flat data collections, use the [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key) and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties to create a hierarchy of items. If the Toolbar’s structure is linear, you can omit these properties.
		- For hierarchical data collections, the [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children) property is required to build the data model.
	You can create multiple `DxToolbarDataMapping` instances to specify different mappings for different nesting levels. Use the [Level](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Level) property to specify the item level for which data mappings are applied.

#### Flat Data

The following code snippet binds the Toolbar to the flat collection of data items and specifies mappings for the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text), [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key), and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties.

- [FormatItem.cs](#tabpanel_Q6Qjp13qGZ_tabid-2)
- [Razor](#tabpanel_Q6Qjp13qGZ_tabid-1)

```
<div class="card p-2">
    <DxToolbar Data=@FormatItem.ToolbarItems>
        <DataMappings>
            <DxToolbarDataMapping Text="ValueName" Key="Id" ParentKey="ParentId" />
        </DataMappings>
    </DxToolbar>
</div>
```

![Bound to Flat Data Toolbar](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-flat-data.png)

#### Hierarchical Data

The following code snippet binds the Toolbar to the collection of `FormatItem` objects. Each object can have child objects. The code specifies the [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children), [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text), and [Checked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarDataMappingBase.Checked) mappings to adjust the Toolbar’s data model to the specified data source.

- [FormatItem.cs](#tabpanel_cefUzvJ9fP_tabid-2)
- [Razor](#tabpanel_cefUzvJ9fP_tabid-1)

```
<div class="card p-2">
    <DxToolbar Data=@FormatItem.ToolbarItems ItemClick=@OnItemClicked>
        <DataMappings>
            <DxToolbarDataMapping Name="ValueName" Text="ValueName" Children="Values" Checked="IsChecked" />
            <DxToolbarDataMapping Text="Value" Level="1" />
        </DataMappings>
    </DxToolbar>
</div>

@code {
    void OnItemClicked(ToolbarItemClickEventArgs args) {
        if (args.ItemName == "Align") {
            ((FormatItem)args.Info.Data).ChangeChecked();
        }
    }
}
```

![Bound to Hierarchical Data Toolbar](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-hierarchical-data.png)

[Run Demo: Toolbar - Data Binding](https://demos.devexpress.com/blazor/Toolbar#DataBinding)

### Toolbar Title

Use the [Title](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.Title) property to specify a toolbar title. The title is displayed on the left of the toolbar items.

```
<div class="card p-2">
    <DxToolbar Title="DevExpress">
        <Items>
            <DxToolbarItem Text="Products" />
            <DxToolbarItem Text="Support" />
            <DxToolbarItem Text="Documentation" />
        </Items>
    </DxToolbar>
</div>
```

![Toolbar Title](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-title.png)

You can also use the [TitleTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.TitleTemplate) property to specify the template for the toolbar title.

```
<div class="card p-2">
    <DxToolbar Title="DevExpress Logo">
        <TitleTemplate>
            <img width="120" src="images/Logo-Monochrome.svg" alt="@context" />
        </TitleTemplate>
        <Items>
            <DxToolbarItem Text="Products" />
            <DxToolbarItem Text="Support" />
            <DxToolbarItem Text="Documentation" />
         </Items>
    </DxToolbar>
</div>
```

![Title Template](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-title-template.png)

[Run Demo: Toolbar - Templates](https://demos.devexpress.com/blazor/Toolbar#ItemTemplates)

### Customize Appearance

The table below lists API members that allow you to customize the appearance of root items.

| Member | Description |
| --- | --- |
| [DxToolbar.ItemRenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.ItemRenderStyleMode) | Specifies the color fill mode for all toolbar items. |
| [DxToolbar.SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.SizeMode) | Specifies the toolbar item’s size. |
| [DxToolbarItem.RenderStyle](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem.RenderStyle) | Specifies the item’s predefined style. |
| [DxToolbarItem.RenderStyleMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem.RenderStyleMode) | Specifies the item’s color fill mode. |

[Run Demo: Toolbar - Render Style](https://demos.devexpress.com/blazor/Toolbar#RenderStyle)

#### Item Templates

The Toolbar component allows you to use templates to customize the layout and appearance of toolbar items. Use the [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbarItem.Template) property to define a template for a specific toolbar item.

The following code snippet adds the [DxSearchBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox) component to the `Toolbar` component.

- [Razor](#tabpanel_d-2wtuPh1T_tabid-razor)

```
<DxToolbar ItemRenderStyleMode="ToolbarRenderStyleMode.Plain"
           Title="DevExpress">
    <TitleTemplate>
        <div class="icon-logo" role="img" aria-label="@context"></div>
    </TitleTemplate>
    <Items>
        <DxToolbarItem BeginGroup="true"
                       Alignment="ToolbarItemAlignment.Right">
            <Template>
                <div class="d-flex flex-row align-items-center h-100">
                    <DxSearchBox CssClass="search py-0" aria-label="Search" />
                </div>
            </Template>
        </DxToolbarItem>
        <DxToolbarItem IconCssClass="tb-icon tb-icon-refresh"
                       Tooltip="Refresh"
                       Alignment="ToolbarItemAlignment.Right"
                       BeginGroup="true" />
        <DxToolbarItem IconCssClass="tb-icon tb-icon-settings"
                       Tooltip="Settings" />
    </Items>
</DxToolbar>
```

![Toolbar Item Template](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-item-template.png)

[Run Demo: Toolbar - Templates](https://demos.devexpress.com/blazor/Toolbar#ItemTemplates)

### Handle Item Clicks

Use the following events to handle toolbar item clicks:

| Event | Description |
| --- | --- |
| [DxToolbarBase.ItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.ItemClick) | Fires when users activate any item in the toolbar. |
| [DxToolbarItemBase.Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.Click) | Fires when users activate a toolbar item. |

The following code snippet handles the `DxToolbarBase.ItemClick` event.

```
<div class="card p-2">
    <DxToolbar Title="Operations:" ItemClick="OnItemClick">
        <DxToolbarItem Text="Insert" Name="Insert"></DxToolbarItem>
        <DxToolbarItem Text="Edit" Name="Edit"></DxToolbarItem>
        <DxToolbarItem Text="Delete" Name="Delete"></DxToolbarItem>
    </DxToolbar>
</div>

@ClickedItem

@code  {
    public string ClickedItem { get; set; } = "";

    void OnItemClick(ToolbarItemClickEventArgs e) {
        ClickedItem = $"The '{e.ItemName}' toolbar button has been clicked";
    }
}
```

![Toolbar Item Click](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-item-common-click.png)

#### Submit Form on Item Click

You can submit a form on a toolbar button click. This behavior is equivalent to the [type=”submit”](https://www.w3schools.com/tags/att_button_type.asp) HTML button behavior.

To create such a toolbar item, use the [SubmitFormOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.SubmitFormOnClick) property.

```
@using System.ComponentModel.DataAnnotations

<div class="cw-880">
    <EditForm Model="@starship"
              OnValidSubmit="@HandleValidSubmit"
              OnInvalidSubmit="@HandleInvalidSubmit"
              Context="EditFormContext">
        <DataAnnotationsValidator />
        <DxFormLayout>
            <DxFormLayoutItem Caption="Identifier:" ColSpanMd="6">
                <DxTextBox @bind-Text="@starship.Identifier" />
            </DxFormLayoutItem>
            @* ... *@
        </DxFormLayout>
        <DxToolbar>
            <DxToolbarItem SubmitFormOnClick="true" Alignment="ToolbarItemAlignment.Right">Submit form</DxToolbarItem>
        </DxToolbar>
        <div class="row w-100 mx-0">
            <p class="demo-text col-12 mt-2">
                Form Validation State: <b>@FormValidationState</b>
            </p>
        </div>
    </EditForm>
</div>

@code {
    string FormValidationState = @"Press the ""Submit form"" button to validate the form.";
    Starship starship = new Starship() { ProductionDate = DateTime.Now + TimeSpan.FromDays(1) };
    List<string> classifications = new List<string>() { "Defense", "Exploration", "Diplomacy" };
    void HandleValidSubmit() {
        FormValidationState = @"Form data is valid";
    }
    void HandleInvalidSubmit() {
        FormValidationState = @"Form data is invalid";
    }
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class DateInPastAttribute : ValidationAttribute {
        public override bool IsValid(object value) {
            return (DateTime)value <= DateTime.Today;
        }
    }
    public class Starship {
        [Required(ErrorMessage = "The Identifier value should be specified.")]
        [StringLength(16,
        ErrorMessage = "The Identifier exceeds 16 characters.")]
        public string Identifier { get; set; }
        public DateTime ProductionDate { get; set; }
        // ...
    }
}
```

![Toolbar Item - Submit Form on Click](https://docs.devexpress.com/Blazor/images/toolbar/blazor-toolbar-item-submit-form-on-click.png)

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

### Adaptivity

The following properties specify how the `Toolbar` component behaves when the container’s width changes:

[AdaptivityAutoCollapseItemsToIcons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.AdaptivityAutoCollapseItemsToIcons)

Specifies whether to hide captions in all items that contain icons.

[AdaptivityAutoHideRootItems](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.AdaptivityAutoHideRootItems)

Specifies whether the toolbar moves root items one by one to the root submenu until the root level reaches the minimum number of root items ([AdaptivityMinRootItemCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar.AdaptivityMinRootItemCount)). You can also use [AdaptivePriority](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.AdaptivePriority) and [AdaptiveText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxToolbarItemBase.AdaptiveText) properties to specify the order in which the component hides its items and alternative item text for adaptive mode.

The following code snippet moves the **align** item group to the submenu first and then hides text strings of the last group:

```
<div class="card">
    <DxToolbar Title="New Article" 
               ItemRenderStyleMode="ToolbarRenderStyleMode.Plain"
               AdaptivityMinRootItemCount="2" 
               AdaptivityAutoHideRootItems="true" 
               AdaptivityAutoCollapseItemsToIcons="true">
        <Items>
            <DxToolbarItem Name="FontFamily" Text="@currentFont.Name" BeginGroup="true" AdaptiveText="Font Family"
                        Tooltip="Font Family">
                <Items>
                    @foreach(var font in FontInfo.DefaultFonts) {
                        <DxToolbarItem Text="@font.Name"
                                       Click="(x) => { currentFont = font; }"
                                       Checked="currentFont == font"
                                       Style="@font.GetCssString()" />
                    }
                </Items>
            </DxToolbarItem>
            <DxToolbarItem AdaptivePriority="1" BeginGroup="true"
                           IconCssClass="tb-icon tb-icon-bold" AdaptiveText="Bold" />
            <DxToolbarItem AdaptivePriority="1" GroupName="font-italic"
                           IconCssClass="tb-icon tb-icon-italic" AdaptiveText="Italic" />
            <DxToolbarItem AdaptivePriority="1" GroupName="font-underline" 
                           IconCssClass="tb-icon tb-icon-underline" AdaptiveText="Underline" />
            <DxToolbarItem AdaptivePriority="2" BeginGroup="true" GroupName="align"
                           IconCssClass="tb-icon tb-icon-align-left" AdaptiveText="Left" />
            <DxToolbarItem AdaptivePriority="2" GroupName="align" AdaptiveText="Center"
                           IconCssClass="tb-icon tb-icon-align-center" />
            <DxToolbarItem AdaptivePriority="2" GroupName="align" AdaptiveText="Right"
                           IconCssClass="tb-icon tb-icon-align-right"/>
            <DxToolbarItem BeginGroup="true" Text="Undo" 
                           AdaptiveText="Undo" IconCssClass="tb-icon tb-icon-undo" />
            <DxToolbarItem Text="Redo" AdaptiveText="Redo"
                           IconCssClass="tb-icon tb-icon-redo" />
        </Items>
    </DxToolbar>
</div>
```

[Run Demo: Toolbar - Adaptivity](https://demos.devexpress.com/blazor/Toolbar#Adaptivity)

### Keyboard Navigation

The DevExpress Blazor Toolbar component supports keyboard shortcuts that allow users to access every UI element and navigate through toolbar items and drop-down menus. Keyboard navigation is implemented both on the client and server.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab, Shift + Tab | Focuses the toolbar or moves focus to the next or previous focusable page element.   **For modal drop-down windows:** Moves focus to a window’s header or body and backwards. |
| Right Arrow | Moves focus to the next toolbar item and separately to every button within a split button.   **For drop-down menu items with child items:** Opens a submenu and moves focus to its first item. |
| Left Arrow | Moves focus to the previous toolbar item and separately to every button within a split button. |
| Up Arrow, Down Arrow | **For drop-down menu and submenu items:** Moves focus to the next or previous menu item. |
| Enter, Space | Invokes a click event handler for the focused toolbar item.   **For an ellipsis button or dropdown toolbar item:** Opens a drop-down menu and moves focus to its first item. |
| Enter | **For templated items:** Moves focus to the first focusable element within the template. |
| Down Arrow + Alt | Opens a drop-down menu. |
| End | Moves focus to the last toolbar or menu/submenu item. |
| Home | Moves focus to the first toolbar or menu/submenu item. |
| Esc | **For drop-down menu items:** Closes the menu and moves focus to the corresponding toolbar item/button. |
| Esc, Tab | **For templates within toolbar items:** Moves focus to the corresponding toolbar item. |
| Up Arrow + Alt | **For drop-down menu and submenu items:** Closes the drop-down menu and moves focus to the corresponding toolbar item. |
| Left Arrow, Esc | **For drop-down submenu items:** Closes the submenu and moves focus to the corresponding parent item. |