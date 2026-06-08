---
title: "DxAccordion Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion"
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

## DxAccordion Class

In This Article

A side navigation control that can organize items into collapsible groups.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxAccordion :
    DxComponent,
    IRequireSelfCascading
```

## Remarks

The DevExpress Accordion component for Blazor (`<DxAccordion>`) displays hierarchical data structures within collapsible groups. Use this control to add layout management or navigation capabilities to your application.

![Blazor Navigation Landing Accordion](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-overview.png)

[Run Demo: Accordion](https://demos.devexpress.com/blazor/Accordion)

### Add an Accordion to a Project

Follow the steps below to add the Accordion component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxAccordion>` … `</DxAccordion>` markup to a `.razor` file.
3. Configure the component: add items or bind the Accordion to data, handle expand/collapse events, customize items, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxAccordion Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion._members).

### Unbound Mode (Items)

The `<DxAccordion>` component supports bound and unbound modes. In unbound mode, the developer should write markup that adds individual elements to the Accordion’s [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.Items) collection. Each item can have its own collection of child items ([Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Items)).

A [DxAccordionItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem) class instance defines an item in code, and the [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Name) property specifies its unique name. Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Text) property to specify the item’s text, the [IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.IconCssClass) property to specify a CSS class for the item’s icon, and the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) property to specify the URL to navigate to when a user clicks an item.

```
<DxAccordion>
    @* Root items *@
    <Items>
        <DxAccordionItem Text="Shapes" Expanded="true">
            @* Nested items *@
            <Items>
                <DxAccordionItem Text="Circle" />
                <DxAccordionItem Text="Triangle" />
                <DxAccordionItem Text="Square" />
            </Items>
        </DxAccordionItem>
        <DxAccordionItem Text="Templates" />
    </Items>
</DxAccordion>
```

![Accordion items](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-item.png)

### Data Binding

You can populate the Accordion component with items from a data source.

Follow the steps below to bind Accordion to data:

1. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.Data) property to specify a data source. You can use different collection types:
	- Flat data (a collection of items organized as a single-level structure)
		- Hierarchical data (a collection of nested items)
2. Add the [DataMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.DataMappings) tag to the component’s markup.
3. Create the [DxAccordionDataMapping](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionDataMapping) instance and map [item properties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionDataMapping._members) ([HasChildren](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxAccordionDataMappingBase.HasChildren), [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxAccordionDataMappingBase.NavigateUrl), and so on) to data source fields. Mappings are used to assign data from the source collection to the component’s data model.
	- For flat data collections, use the [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key) and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties to create a hierarchy of items. If the Accordion’s structure is linear, you can omit these properties.
		- For hierarchical data collections, the [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children) property is required to build the data model.
	You can create multiple `DxAccordionDataMapping` instances to specify different mappings for different nesting levels. Use the [Level](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Level) property to specify the item level for which data mappings are applied.

#### Flat Data

The following code snippet binds the Accordion to a flat collection of data items. This code specifies mappings for the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text), [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key), and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties.

- [FlatDataItem.cs](#tabpanel_j0lFdc1+hi_tabid-ds)
- [Razor](#tabpanel_j0lFdc1+hi_tabid-razor)

```
<DxAccordion Data="Data">
    <DataMappings>
        <DxAccordionDataMapping Text="Name"
                                Key="Id"
                                ParentKey="CategoryId" />
    </DataMappings>
</DxAccordion>

@code {
    List<FlatDataItem> Data { get; set; }

    protected override void OnInitialized() {
        IEnumerable<ProductFlat> products = ProductData.Products;
        IEnumerable<ProductCategory> productSubcategories = ProductData.Categories;

        Data = new List<FlatDataItem>(Enum.GetValues<ProductCategoryMain>().Select(i => new FlatDataItem() { Name = i.ToString(), Id = i }));
        Data.AddRange(products.Select(i => new FlatDataItem() { Name = i.ProductName, Id = i.Id, CategoryId = i.ProductCategoryId }));
        Data.AddRange(productSubcategories.Select(i => new FlatDataItem() { Name = i.Subcategory, Id = i.SubcategoryID, CategoryId = i.Category }));
    }
}
```

![Bound to Flat Data Accordion](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-data-binding.png)

#### Hierarchical Data

The following code snippet binds the Accordion to the collection of `ChemicalElementGroup` objects. Each object can have child objects. This code specifies [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children) and [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text) mappings used to adjust the Accordion’s data model to the specified data source.

- [ChemicalElements.cs](#tabpanel_j0lFdc1+hi-1_tabid-data)
- [Razor](#tabpanel_j0lFdc1+hi-1_tabid-markup)

```
<DxAccordion Data="@ChemicalElements.Groups">
    <DataMappings>
        <DxAccordionDataMapping Children="Groups"
                                Text="Name"/>
    </DataMappings>
</DxAccordion>
```

![Bound to Hierarchical Data Accordion](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-hierarchical-data.png)

[Run Demo: Accordion - Data Binding](https://demos.devexpress.com/blazor/Accordion#DataBinding)

### Static Render Mode Specifics

In static render mode, groups cannot be expanded or collapsed. Use a single-level accordion or set a group’s [Expanded](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Expanded) property to `true` to display initially expanded items.

```
<DxAccordion>
    <Items>
        <DxAccordionItem Text="Home" NavigateUrl="/" />
        <DxAccordionItem Text="New" NavigateUrl="/new" />
        <DxAccordionItem Text="Products" Expanded="true">
            <Items>
                ...
            </Items>
        </DxAccordionItem>
        <DxAccordionItem Text="Support" Expanded="true">
            <Items>
                ...
            </Items>
        </DxAccordionItem>
    </Items>
</DxAccordion>
```

If you need interactivity, enable interactive render mode. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Expand and Collapse Items

Users can click the Accordion item’s header or expand/collapse button to change the expanded state. Use the [ExpandCollapseAction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ExpandCollapseAction) property to choose the action that expands or collapses the item.

The table below lists related API members.

| Member | Description |
| --- | --- |
| [ExpandCollapseAction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ExpandCollapseAction) | Specifies the user action that expands or collapses the item. |
| [ExpandMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ExpandMode) | Specifies how many items can be expanded at a time. |
| [Expanded](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Expanded) | Specifies whether the item is expanded. |
| [RootItemExpandButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.RootItemExpandButtonIconCssClass) | Specifies the CSS class name for a root item’s **Expand** button icon. |
| [RootItemCollapseButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.RootItemCollapseButtonIconCssClass) | Specifies the CSS class name for a root item’s **Collapse** button icon. |
| [RootItemExpandButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.RootItemExpandButtonDisplayMode) | Specifies where the Accordion component displays its expand button for root items. |
| [SubItemCollapseButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SubItemCollapseButtonIconCssClass) | Specifies the CSS class name for a subitem’s **Collapse** button icon. |
| [SubItemExpandButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SubItemExpandButtonIconCssClass) | Specifies the CSS class name for a subitem’s **Expand** button icon. |
| [SubItemExpandButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SubItemExpandButtonDisplayMode) | Specifies where the Accordion component displays expand and collapse buttons for nested items. |
| [CollapseAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.CollapseAll) | Collapses all items. |
| [ExpandAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ExpandAll) | Expands all items. |
| [ExpandToItem(Func<IAccordionItemInfo, Boolean>)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ExpandToItem\(System.Func-DevExpress.Blazor.IAccordionItemInfo-System.Boolean-\)) | Expands items down to the specified item. |
| [GetItemExpanded(Func<IAccordionItemInfo, Boolean>)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.GetItemExpanded\(System.Func-DevExpress.Blazor.IAccordionItemInfo-System.Boolean-\)) | Returns whether the specified item is expanded. |
| [SetItemExpanded(Func<IAccordionItemInfo, Boolean>, Boolean)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SetItemExpanded\(System.Func-DevExpress.Blazor.IAccordionItemInfo-System.Boolean--System.Boolean\)) | Expands or collapses the specified node. |

The following events fire when an item’s state changes:

[AfterCollapse](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.AfterCollapse)

Fires after an item was collapsed.

[AfterExpand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.AfterExpand)

Fires after an item was expanded.

[BeforeCollapse](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.BeforeCollapse)

Fires when an item is about to be collapsed and allows you to cancel the action.

[BeforeExpand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.BeforeExpand)

Fires when an item is about to be expanded and allows you to cancel the action.

[ExpandedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.ExpandedChanged)

Fires when an Accordion’s item expands or collapses.

### Filter Items

Enable the `ShowFilterPanel` option to activate the filter panel. If a user types in a search string, the component displays matching items and their parent and child items. Note that if you activate the filter option with the enabled [LoadChildItemsOnDemand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.LoadChildItemsOnDemand) option, the component loads all its items into memory.

```
<DxAccordion ShowFilterPanel="true">
    @* ... *@
</DxAccordion>
```

![Allow users to filter](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-filter-enable.png)

You can also use the [FilterString](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.FilterString) property to specify the filter criteria in code.

In addition to default filter logic, you can specify the [CustomFilter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.CustomFilter) property to enable heuristic algorithms.

[Run Demo: Accordion - Data Binding](https://demos.devexpress.com/blazor/Accordion#DataBinding)

### Load Child Items On Demand

If you set the `LoadChildItemsOnDemand` property to `true`, the Accordion loads an item’s children when the item is expanded for the first time. This mode improves the Accordion’s performance if the bound data structure contains a large number of items.

You can load child items on demand in either bound or unbound mode. Note that bound mode works with hierarchical structures only and requires the [HasChildren](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxAccordionDataMappingBase.HasChildren) property. The component uses this property to determine how to render items before they are expanded for the first time (for example, whether expand buttons should appear).

- [Razor](#tabpanel_c5swlhusd7_tabid-1)

```
<DxAccordion Data="@Data" LoadChildItemsOnDemand="true">
    <DataMappings>
        <DxAccordionDataMapping Text="Name"
                                Key="Id"
                                ParentKey="CategoryId"/>
    </DataMappings>
</DxAccordion>
```

### Templates

Use the following templates to specify appearance of all items:

[ItemContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ItemContentTemplate)

Specifies a content template for all Accordion items.

[ItemHeaderTextTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ItemHeaderTextTemplate)

Specifies a header text template for all Accordion items.

[ItemTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ItemTemplate)

Specifies the template used to display Accordion items.

In unbound mode, you can create templates for individual items. These templates have priority over common templates. Use the following `<DxAccordionItem>` properties:

[ContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.ContentTemplate)

Specifies a template for the Accordion item’s content.

[HeaderTextTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.HeaderTextTemplate)

Specifies a template for the Accordion item’s header text.

[Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Template)

Specifies the template used to display the Accordion item.

The following example applies the **ItemTemplate**:

- [Employee.cs](#tabpanel_lZhG76+KjO_tabid-class)
- [Razor](#tabpanel_lZhG76+KjO_tabid-index)
- [CSS](#tabpanel_lZhG76+KjO_tabid-index-css)
- [EmployeeCard.razor](#tabpanel_lZhG76+KjO_tabid-card)

```
<div class="cw-480">
    <DxAccordion Data=@DataSource>
        <DataMappings>
            <DxAccordionDataMapping Key="LastName" 
                                    Text="LastName" />
        </DataMappings>
        <ItemTemplate>
            @{
                var dataItem = (Employee)context.DataItem;
            }
            <div class="my-class">
                <EmployeeCard EmployeeInfo=dataItem />
            </div>
        </ItemTemplate>
    </DxAccordion>
</div>
```

![Template for all items](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-itemtemplate.png)

### Select Items

Set the [SelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SelectionMode) property value to `Single` to allow item selection. Accordion items can be selected in the following ways:

- Users can click item headers to select them.
- You can call the [SelectItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SelectItem\(System.Func-DevExpress.Blazor.IAccordionItemInfo-System.Boolean-\)) method to select an item from code.
- The component can automatically select an item based on the item’s [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) and the current browser URL. Use the [UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.UrlMatchMode) property to enable this functionality.

```
<DxAccordion SelectionMode="NavigationSelectionMode.Single">
    <Items>
        <DxAccordionItem Text="Shapes">
            <Items>
                <DxAccordionItem Text="Circle" />
                <DxAccordionItem Text="Square" />
            </Items>
        </DxAccordionItem>
        <DxAccordionItem Text="Templates" />
    </Items>
</DxAccordion>
```

To react to selection changes, handle the [SelectionChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SelectionChanged) event. Call the [ClearSelection()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ClearSelection) method to clear the collection of selected items.

[Run Demo: Accordion - Select Items](https://demos.devexpress.com/blazor/Accordion#ItemSelection)

### Navigate URL for an Item

Use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) property to specify a URL where the client web browser navigates in response to an item click. To specify the URL display target (that is, the current window, new tab, and so on), use the [Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Target) property:

In the following code snippet, the **Grid** item’s **NavigateUrl** is opened in a new tab:

```
<DxAccordion>
    <Items>
        <DxAccordionItem Text="Grid" NavigateUrl="https://demos.devexpress.com/blazor/Grid"
                         Target="_blank" />
        <DxAccordionItem Text="Navigation and Layout" />
        <DxAccordionItem Text="Data Editors" />
        <DxAccordionItem Text="Scheduler" />
    </Items>
</DxAccordion>
```

The component can automatically select and expand to an item based on the item’s [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) property value and the current browser URL. Use the [UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.UrlMatchMode) property and set the [SelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SelectionMode) property value to `Single` to enable this functionality.

In the following example, the Accordion selects an item if the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) property value matches the current page’s address:

```
<div class="p-2">
    <DxAccordion UrlMatchMode="NavigationUrlMatchMode.Exact" 
                 SelectionMode="NavigationSelectionMode.Single">
        <Items>
            <DxAccordionItem Text="Shapes" NavigateUrl="shapes">
                <Items>
                    <DxAccordionItem Text="Circle" />
                    <DxAccordionItem Text="Square" />
                </Items>
            </DxAccordionItem>
            <DxAccordionItem Text="Templates" />
        </Items>
    </DxAccordion>
</div>
```

![Url Match Mode Result](https://docs.devexpress.com/Blazor/images/blazor-dxaccordion-matchmode.png)

You can also use the [DxAccordionItem.UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.UrlMatchMode) property to specify this option for individual items.

[View Example: Use the Accordion to organize navigation in the application](https://github.com/DevExpress-Examples/blazor-accordion-navigation-with-selection)

### Keyboard Navigation

The DevExpress Blazor Accordion component supports keyboard shortcuts that allow users to access UI elements, navigate through groups and items, and select elements. Keyboard navigation is implemented both on the client and server.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab,   Shift + Tab | Focuses the Accordion or moves focus to the next or previous focusable page element.   **Within a template:** Moves focus between nested focusable elements. After the first/last element, exits nested object navigation. |
| Right Arrow | **For a group header:** Expands the group.   **For a collapsed item:** Expands the item. |
| Left Arrow | **For a group header:** Collapses the group.   **For an expanded item:** Collapses the item. |
| Down Arrow | **At the group level:** Moves focus to the next visible group header or group body.   **At the item level:** Moves focus to the next visible item. After the last item, moves focus to the first item. |
| Up Arrow | **At the group level:** Moves focus to the previous visible group header or group body.   **At the item level:** Moves focus to the previous visible item. After the first item, moves focus to the last item. |
| Enter | Raises [ItemClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ItemClick) and [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.Click) events.   **If selection is enabled:** Selects the focused group or item.   **If selection is disabled:** Toggles the focused group’s or item’s expanded state.   **For a group body:** Moves focus to the first item in the group.   **For a templated item:** Moves focus to the first focusable element within a template.   **For the filter panel:** Enters edit mode. |
| Esc | **For a group body:** Exits item navigation.   **For a templated item:** Exits nested object navigation.   **For the filter panel:** Exits edit mode. |