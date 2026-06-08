---
title: "DxFormLayout Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout"
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

## DxFormLayout Class

In This Article

A control container that allows you to create responsive data edit forms.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxFormLayout :
    DxComponentBase,
    IFormLayout,
    IFormLayoutLevel
```

## Remarks

The DevExpress Form Layout for Blazor (`<DxFormLayout>`) consists of data editors and allows you to create responsive edit forms that are automatically arranged.

![Blazor Form Layout](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-responsivity.gif)

[Run Demo](https://demos.devexpress.com/blazor/FormLayout)

### Add a Form Layout to a Project

Follow the steps below to add the Form Layout component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxFormLayout>` … `</DxFormLayout>` markup to a `.razor` file.
3. Add to the component’s markup.
4. the Form Layout component to data.

### API Reference

Refer to the following list for the component API reference: [DxFormLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout._members).

### Static Render Mode Specifics

In static render mode, groups cannot be expanded or collapsed. Tabbed groups are not supported. If you need interactivity, enable interactive render mode. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Layout Structure

The Form Layout component can contain only,, and. Place all custom content between the `<DxFormLayoutItem>...</DxFormLayoutItem>` tags.

> [!note] Note
> Form Layout items should not contain layout hierarchy objects (groups, tabs, and other items).

The component uses a responsive grid system based on the [CSS flexible box layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout) to render items. Each layout item can occupy 1-12 columns. The following properties specify the item width for six different viewport sizes:

| Viewport Size | Extra Small | Small | Medium | Large | Extra Large | Extra Extra Large |
| --- | --- | --- | --- | --- | --- | --- |
| Width in Pixels | Any | ≥576 | ≥768 | ≥992 | ≥1200 | ≥1400 |
| Property | [ColSpanXs](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanXs) | [ColSpanSm](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanSm) | [ColSpanMd](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanMd) | [ColSpanLg](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanLg) | [ColSpanXl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanXl) | [ColSpanXxl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ColSpanXxl) |

```
<DxFormLayout>
    @* If the viewport width is less then 768px (medium), the item occupies 12 columns *@
    @* If the viewport width is from 768px (medium) to 1200px (extra large), the item occupies 6 columns *@
    @* If the viewport width exceeds 1200px (extra large), the item occupies 4 columns *@
    <DxFormLayoutItem Caption="Name" ColSpanXl="4" ColSpanMd="6">
        <DxTextBox />
    </DxFormLayoutItem>
</DxFormLayout>
```

An element moves to the next row if the current row does not have enough space to render it. Enable an element’s [BeginRow](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.BeginRow) property to always place the element in a new row.

```
<DxFormLayout>
    @* ... *@
    <DxFormLayoutItem Caption="Postal/ZIP Code" BeginRow="true" />
</DxFormLayout>
```

[Run Demo: Form Layout - Item Wrapping](https://demos.devexpress.com/blazor/FormLayout#Wrapping)

The common settings for all layout elements are listed below:

[BeginRow](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.BeginRow)

Specifies whether a Form Layout [group](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutGroup), [tab pages](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage) container, or [item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem) starts a new row.

[Caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Caption)

Specifies a Form Layout [group](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutGroup), [tab](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage), or [item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem) caption.

[CaptionPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.CaptionPosition)

Specifies an item’s [Caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Caption) position.

[Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Visible)

Specifies whether a Form Layout [item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem), [group](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutGroup), [tab pages](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages) container, or [tab](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage) is visible.

[CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent.CssClass)

Assigns a CSS class to the component.

[ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.ReadOnly)

Specifies whether the Form Layout element ([item](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem), [group](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutGroup), [tab pages](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages) container, or [tab](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage)) activates read-only mode for nested auto-generated editors.

[Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Enabled)

Specifies whether the auto-generated editors in the Form Layout are enabled.

[View Example: How to change DxFormLayout's item and group visibility](https://github.com/DevExpress-Examples/blazor-formlayout-change-items-and-groups-visibility)

#### Items

A layout item ([DxFormLayoutItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem)) is a container that arranges nested Blazor components. An item can include a [Caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Caption) displayed next to the corresponding component.

![FormLayout Layout Items](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-layout-items.png)

```
<DxFormLayout>
    <DxFormLayoutItem Caption="Contact Name:">
        <DxTextBox @bind-Text="@Name" />
    </DxFormLayoutItem>
    <DxFormLayoutItem Caption="Birth Date:">
        <DxDateEdit @bind-Date="@BirthDate" />
    </DxFormLayoutItem>
    <DxFormLayoutItem Caption="E-mail:">
        <DxTextBox @bind-Text=@Email />
    </DxFormLayoutItem>
</DxFormLayout>

@code {
    string Name { get; set; } = "Nancy Davolio";
    DateTime BirthDate { get; set; } = DateTime.Now.AddYears(-20);
    string Email { get; set; } = "NancyDavolio@sample.com";
}
```

The item-related settings are listed below:

[DxFormLayoutItem.Field](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem.Field)

Specifies a data source field assigned to the current layout item.

[DxFormLayout.ItemCaptionAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout.ItemCaptionAlignment)

Specifies how caption paddings are calculated in the Form Layout component.

[DxFormLayoutItem.CaptionCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem.CaptionCssClass)

Assigns a CSS class to the layout item’s [caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.FormLayoutItemBase.Caption).

#### Groups

A layout group ([DxFormLayoutGroup](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutGroup)) is a built-in container that allows you to combine layout,, and other layout groups into panels.

![FormLayout Groups](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-groups.png)

```
<DxFormLayout>
    <DxFormLayoutGroup Caption="Personal Information" ColSpanMd="6">
        <DxFormLayoutItem Caption="First Name:" ColSpanMd="12">
            <DxTextBox @bind-Text="@FirstName" />
        </DxFormLayoutItem>
        <DxFormLayoutItem Caption="Last Name:" ColSpanMd="12">
            <DxTextBox @bind-Text="@LastName" />
        </DxFormLayoutItem>
        <DxFormLayoutItem Caption="Birth Date:" ColSpanMd="12">
            <DxDateEdit @bind-Date="@BirthDate" />
        </DxFormLayoutItem>
    </DxFormLayoutGroup>
    @* ... *@
</DxFormLayout>
```

[Run Demo: Form Layout - Groups](https://demos.devexpress.com/blazor/FormLayout#Groups) [View Example: Collapsible groups](https://github.com/DevExpress-Examples/blazor-formlayout-collapsible-groups)

#### Tabs

All tabs of the Form Layout are stored in the [DxFormLayoutTabPages](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages) component. The [DxFormLayoutTabPage](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage) component implements a single layout tab that serves as a container for layout and. You can customize individual tabs. Refer to the following class description for additional information: [DxFormLayoutTabPage](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPage).

![FormLayout Tabs](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-tabs.png)

To specify the active tab, use the [ActiveTabIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages.ActiveTabIndex) property:

```
<DxFormLayout>
    <DxFormLayoutTabPages @bind-ActiveTabIndex="@Index">
        @* ... *@
        <DxFormLayoutTabPage Caption="Work Information">
            <DxFormLayoutItem Caption="Position:">
                <DxTextBox @bind-Text="@Position" />
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Hire Date:">
                <DxDateEdit @bind-Date="@HireDate" />
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Notes:">
                <DxTextBox @bind-Text="@Notes" />
            </DxFormLayoutItem>
        </DxFormLayoutTabPage>
    </DxFormLayoutTabPages>
</DxFormLayout>

@code {
    int Index { get; set; } = 1;
}
```

##### Render Mode

Use the [RenderMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages.RenderMode) property to specify how the [DxFormLayoutTabPages](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages) component loads tab content. The following options are available:

[Default](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TabsRenderMode)

The component initially loads only content of an active tab. When a user selects another tab, its content replaces the content of the previously active tab in the DOM. Note the component does not keep the tab’s state.

[AllTabs](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TabsRenderMode)

The component renders the content of all tabs in the DOM and maintains the tab’s state. This mode speeds up navigation between tabs, but can increase memory consumption.

[OnDemand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TabsRenderMode)

The component initially loads content of an active tab, then loads the content of other tabs when a user selects them. In this case, the component maintains the tab’s state. Use this mode to improve performance of your application.

The following code snippet demonstrates the `OnDemand` mode implementation:

```
<DxFormLayout CssClass="w-100">
    <DxFormLayoutTabPages @bind-ActiveTabIndex="@ActiveTabIndex"
                          RenderMode="TabsRenderMode.OnDemand">
        <DxFormLayoutTabPage Caption="Personal Information">
            <DxFormLayoutItem Caption="First Name:">
                <DxTextBox @bind-Text="@FirstName" />
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Last Name:">
                <DxTextBox @bind-Text="@LastName" />
            </DxFormLayoutItem>
        </DxFormLayoutTabPage>
         <DxFormLayoutTabPage Caption="Work Information">
            <DxFormLayoutItem Caption="Position:">
                <DxTextBox @bind-Text="@Position" />
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Hire Date:">
                <DxDateEdit @bind-Date="@HireDate" />
            </DxFormLayoutItem>
        </DxFormLayoutTabPage>
        <DxFormLayoutTabPage Caption="Additional information">
            <DxFormLayoutItem Caption="Birth Date:">
                <DxDateEdit @bind-Date="@BirthDate" />
            </DxFormLayoutItem>
            <DxFormLayoutItem Caption="Notes:">
                <DxTextBox @bind-Text="@Notes" />
            </DxFormLayoutItem>
        </DxFormLayoutTabPage>
    </DxFormLayoutTabPages>
</DxFormLayout>

@code {
    int ActiveTabIndex { get; set; } = 1;
    string FirstName { get; set; } = "Nancy";
    string LastName { get; set; } = "Davolio";
    DateTime BirthDate { get; set; } = DateTime.Now.AddYears(-20);
    string Position { get; set; } = "Sales Representative";
    DateTime HireDate { get; set; } = DateTime.Now.AddYears(-20);
    string Notes { get; set; } = "Education includes a BA in psychology.";
}
```

##### Scroll Mode

Specify the [ScrollMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutTabPages.ScrollMode) property to define how users navigate between tabs when they do not fit into the container by width.

The following code snippet switches tabs to `Swipe` navigation mode:

```
<DxFormLayout CssClass="w-100">
    <DxFormLayoutTabPages ScrollMode="TabsScrollMode.Swipe">
        <DxFormLayoutTabPage Caption="Personal Information">
            <DxFormLayoutItem Caption="Contact Name:">
                <DxTextBox Text="Name" />
            </DxFormLayoutItem>
            @* ... *@
        </DxFormLayoutTabPage>
        @* ... *@
    </DxFormLayoutTabPages>
</DxFormLayout>
```

[Run Demo: Form Layout - Tabbed Groups](https://demos.devexpress.com/blazor/FormLayout#TabbedGroups)

### Bind to Data

`<DxFormLayout>` allows you to display and edit data from data source fields. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout.Data) property to bind the control to a data source and specify target fields. To map a data source field to a layout item, use the item’s [Field](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayoutItem.Field) property.

Once a layout item is bound to a data source field, `<DxFormLayout>` tries to determine the corresponding data field type. If the component can determine the type, the corresponding editor appears in the layout item.

| Field Data Type | Editor |
| --- | --- |
| Boolean | [CheckBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCheckBox-1) |
| Date | [Date Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1) |
| Numeric | [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) |
| String | [Text Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox) |
| Other | [Text Box](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox) |

When a user changes a layout item value, handle the [ItemUpdating](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout.ItemUpdating) event to post all changes to the data source. When you use a custom editor in the Form Layout item, the component is not notified when a user changes data within an item’s custom editor. To inform the Form Layout about the change, call the [OnChanged(Object)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ValueEditContext.OnChanged\(System.Object\)) method when an editor value changes. To access a new editor value, use the [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.ValueEditContext.Value) property.

> [!note] Note
> When controls inside a `DxFormLayoutItem` use `@bind-*` syntax (`@bind-Value`, `@bind-Text`, and similar), Blazor assigns `ValueChanged` / `TextChanged` event handlers automatically. Because these handlers are already assigned, `DxFormLayout` does not attach its own `OnChanged` handler, so the [ItemUpdating](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout.ItemUpdating) event is not raised.
> 
> To handle this scenario, process the control change event manually. Read the following help topic for details: [DxFormLayout.ItemUpdating](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout.ItemUpdating#bind-to-data).

- [Data Source](#tabpanel_4ouf7IZr6A_tabid-2)
- [Razor](#tabpanel_4ouf7IZr6A_tabid-1)

```
<DxFormLayout Data="@editFormData"
@* ... *@
              ItemUpdating="@((pair) => OnItemUpdating(pair.Key, pair.Value))"
              CssClass="w-100 demo-form-layout">
    <DxFormLayoutItem Field="@nameof(FormDataItem.Name)"
                      Caption="Contact Name:" />
    <DxFormLayoutItem Field="@nameof(FormDataItem.BirthDate)"
                      Caption="Birth Date:" />
    <DxFormLayoutItem Field="@nameof(FormDataItem.YearsWorked)"
                      Caption="Years Worked:" />
    <DxFormLayoutItem Field="@nameof(FormDataItem.Position)"
                      Caption="Position:">
        <DxComboBox Data="@(new List<string>() {
                                    "Sales Representative",
                                    "Designer" })"
                    Value="@(((string)((ValueEditContext)context).Value))"
                    ValueChanged="@((string value) =>
                            ((ValueEditContext)context).OnChanged(value))" />
    </DxFormLayoutItem>
    <DxFormLayoutItem Field="@nameof(FormDataItem.OnVacation)"
                      Caption="On Vacation:" />
</DxFormLayout>
```

[Run Demo: Form Layout - Bind to Data](https://demos.devexpress.com/blazor/FormLayout#DataBinding)

### Input Validation

You can add the Form Layout component to Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

![FormLayout Validation](https://docs.devexpress.com/Blazor/images/formlayout/blazor-formlayout-validation.png)

- [Starship](#tabpanel_4ouf7IZr6A-1_tabid-model1)
- [Razor](#tabpanel_4ouf7IZr6A-1_tabid-razor1)

```
<EditForm Model="@starship" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout>
        <DxFormLayoutItem Caption="Identifier:" >
            <DxTextBox @bind-Text="@starship.Identifier" />
        </DxFormLayoutItem >
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Starship starship=new Starship();
}
```

[Run Demo: Form Validation - Form Layout](https://demos.devexpress.com/blazor/FormValidation#FormLayout)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

DxFormLayout

See Also

[DxFormLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout._members)