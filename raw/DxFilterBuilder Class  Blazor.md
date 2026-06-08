---
title: "DxFilterBuilder Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder"
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

## DxFilterBuilder Class

In This Article

A UI component that allows users to build complex filter criteria with various filter conditions combined by logical operators.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxFilterBuilder :
    DxComponentBase,
    IFilterBuilderFieldsOwner,
    INestedSettingsOwner,
    IDisposable
```

## Remarks

The DevExpress Blazor Filter Builder (`<DxFilterBuilder>`) allows users to create complex filter criteria. The component builds filter expressions using our DevExpress [Criteria Operator](https://docs.devexpress.com/CoreLibraries/4928/devexpress-data-library/criteria-language-syntax) language. You can use `DxFilterBuilder` as a standalone component or connect it to any data-aware DevExpress Blazor control.

![Filter Builder - Overview](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-overview.png)

[Run Demo: Filter Builder](https://demos.devexpress.com/blazor/FilterBuilder)

### Add a Filter Builder to a Project

Follow the steps below to add a Filter Builder component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxFilterBuilder>` … `</DxFilterBuilder>`.
3. Populate the component with fields using [DxFilterBuilderField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField) objects.

### API Reference

Refer to the following list for the component API reference: [DxFilterBuilder Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder._members).

### Static Render Mode Specifics

Blazor Filter Builder does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Fields

Use the [DxFilterBuilder.Fields](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder.Fields) property to specify a collection of root fields. A [DxFilterBuilderField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField) object implements an individual field.

Use [DxFilterBuilderField.FieldName](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.FieldName) and [DxFilterBuilderField.Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.Type) properties to supply fields with data and generate relevant editors based on data field types.

You can declare fields one by one in Razor markup:

```
<DxFilterBuilder>
    <Fields>
        <DxFilterBuilderField FieldName="Name" Caption="Subject" Type="typeof(string)" />
        <DxFilterBuilderField FieldName="OwnerID" Caption="Assignee" Type="typeof(int)" />
        <DxFilterBuilderField FieldName="CreatedDate" Caption="Created" Type="typeof(DateTime)" />
        <DxFilterBuilderField FieldName="FixedDate" Caption="Fixed" Type="typeof(DateTime)" />
    </Fields>
</DxFilterBuilder>
```

or iterate through model class properties and define fields in a loop:

```
<DxFilterBuilder>
    <Fields>
        @foreach(var field in typeof(Invoice).GetProperties()){
            <DxFilterBuilderField FieldName="@field.Name" Type="@field.PropertyType" />
        }
    </Fields>
</DxFilterBuilder>
```

If you do not declare fields in markup, the Filter Builder displays empty field captions and an empty tree.

![Filter Builder - Empty Tree Field](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-empty-tree.png)

#### Hierarchical Fields

For complex data models, you can organize fields into a tree-like structure. Use [DxFilterBuilderField.Fields](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.Fields) properties to manage nested field collections.

```
<DxFilterBuilder>
    <Fields>
        @* ... *@
        <DxFilterBuilderField FieldName="SupplierId"
                              Caption="Supplier"
                              Type="@typeof(int)">
            <Fields>
                <DxFilterBuilderField FieldName="Supplier.CompanyName"
                                      Caption="Company Name"
                                      Type="@typeof(string)" />
                <DxFilterBuilderField FieldName="Supplier.ContactName"
                                      Caption="Contact Name"
                                      Type="@typeof(string)" />
            </Fields>
        </DxFilterBuilderField>
    </Fields>
</DxFilterBuilder>
```

![Filter Builder - Nested Fields](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-nested-fields.png)

#### Field Captions

The Filter Builder component allows you to customize field captions to be displayed in the tree ([DxFilterBuilderField.Caption](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.Caption)) and in the resulting filter criteria ([DxFilterBuilderField.CaptionFullPath](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.CaptionFullPath)):

```
<DxFilterBuilder>
    <Fields>
        @* ... *@
        <DxFilterBuilderField FieldName="SupplierId" Caption="Supplier" Type="@typeof(int)">
            <Fields>
                <DxFilterBuilderField FieldName="Supplier.CompanyName"
                                      Caption="Company Name"
                                      CaptionFullPath="Supplier.Company Name"
                                      Type="@typeof(string)" />
                <DxFilterBuilderField FieldName="Supplier.ContactName"
                                      Caption="Contact Name"
                                      CaptionFullPath="Supplier.Contact Name"
                                      Type="@typeof(string)" />
            </Fields>
        </DxFilterBuilderField>
    </Fields>
</DxFilterBuilder>
```

![Filter Builder - Caption Customization](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-customize-captions.png)

#### Collection Fields

Enable the [IsCollection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.IsCollection) property to define a collection field. Such field stores an object collection and supports aggregate operators (functions). Aggregate functions calculate collection summaries and allow users to create filter conditions based on aggregated results. For example, users can filter out invoices containing fewer than 5 items in the **Products** field.

The following aggregate functions are available:

- Exists
- Count
- Avg
- Sum
- Min
- Max

For additional information about available operators in Blazor Filter Builder, refer to the following article: [Filter Operators in Blazor Filter Builder](https://docs.devexpress.com/Blazor/405616/components/filter-builder/operators).

The following code snippet defines an **Orders** collection field:

![Filter Builder - Collection Fields](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-collection-fields.png)

```
<DxFilterBuilder @bind-FilterCriteria="FilterCriteria">
    <Fields>
        <DxFilterBuilderField FieldName="ProductName" Caption="Product" Type="@typeof(string)" />
        <DxFilterBuilderField FieldName="UnitPrice" Caption="Unit Price" Type="@typeof(decimal)" />
        <DxFilterBuilderField FieldName="UnitsInStock" Caption="Units In Stock" Type="@typeof(int)" />
        <DxFilterBuilderField FieldName="Orders" Caption="Orders" IsCollection="true">
            <Fields>
                <DxFilterBuilderField FieldName="OrderDate" Caption="Order Date" Type="@typeof(DateTime?)" />
                <DxFilterBuilderField FieldName="CustomerName" Caption="Customer" Type="@typeof(string)" />
                <DxFilterBuilderField FieldName="Quantity" Caption="Quantity" Type="@typeof(int)" />
            </Fields>
        </DxFilterBuilderField>
    </Fields>
</DxFilterBuilder>
```

### Customize Value Editors

Blazor Filter Builder generates and configures value editors for individual fields based on associated data types. You can declare an object that contains editor settings in the [DxFilterBuilderField.EditSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.EditSettings) property to customize the default editor or replace it with another editor. If the editor does not support the associated data type, the Filter Builder replaces it with a read-only text box.

The following code snippet applies a mask to the **Total** currency field and configures a ComboBox for the **Status** enum field:

![Filter Builder - Value Editor Customization](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-editor-customization.png)

```
<DxFilterBuilder>
    <Fields>
        <DxFilterBuilderField FieldName="Total" Type="typeof(decimal)">
            <EditSettings>
                <DxSpinEditSettings Mask="c0" DisplayFormat="c0" />
            </EditSettings>
        </DxFilterBuilderField>
        <DxFilterBuilderField FieldName="Status" Type="typeof(string)">
            <EditSettings>
                <DxComboBoxSettings Data="StatusList" />
            </EditSettings>
        </DxFilterBuilderField>
    </Fields>
</DxFilterBuilder>

@code {
    IEnumerable<string> StatusList = new List<string>() {
        "New",
        "Postponed",
        "Fixed",
        "Rejected"
    };
}
```

If your customization tasks go beyond what’s possible with built-in API, use the [ValueEditTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.ValueEditTemplate) property. This property accepts a [FilterBuilderValueEditTemplateContext](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FilterBuilderValueEditTemplateContext) object as the `context` parameter. You can use the parameter’s [DisplayText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FilterBuilderValueEditTemplateContext.DisplayText) and [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FilterBuilderValueEditTemplateContext.Value) properties to obtain the field value and its display text.

You can also use the [ValueDisplayTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.ValueDisplayTemplate) property to specify custom content and change the appearance of value captions.

#### Configure a Lookup Editor for a Foreign Key

For foreign key fields, you can display user-friendly text instead of ID values. To display user-friendly text, place a [DxComboBoxSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxSettings) object in a field’s [EditSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilderField.EditSettings) tag and specify the editor [data source](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxSettings.Data), [value field name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxSettings.ValueFieldName), and [text field name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxSettings.TextFieldName).

The following code snippet uses [DxComboBoxSettings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxSettings) to customize display values for the **Supplier** field:

- [Supplier.cs](#tabpanel_b47v8TRKe2_tabid-supplier1)
- [Razor](#tabpanel_b47v8TRKe2_tabid-razor11)

```
<DxFilterBuilder>
    <Fields>
        <DxFilterBuilderField FieldName="SupplierId"
                              Caption="Supplier"
                              Type="@typeof(int)">
            <EditSettings>
                <DxComboBoxSettings Data="Suppliers"
                                    ValueFieldName="SupplierId"
                                    TextFieldName="CompanyName">
                </DxComboBoxSettings>
            </EditSettings>
            <Fields>
                <DxFilterBuilderField FieldName="Supplier.CompanyName"
                                      Caption="Company Name"
                                      CaptionFullPath="Supplier.Company Name"
                                      Type="@typeof(string)" />
                <DxFilterBuilderField FieldName="Supplier.ContactName"
                                      Caption="Contact Name"
                                      CaptionFullPath="Supplier.Contact Name"
                                      Type="@typeof(string)" />
            </Fields>
        </DxFilterBuilderField>
    </Fields>
</DxFilterBuilder>
```

![Filter Builder - Foreign Key Editing](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-foreign-key-editing.png)

### Customize Operators

When a user creates or changes a filter condition, the Filter Builder populates the criteria operator list with corresponding items. Handle the [CustomizeOperators](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder.CustomizeOperators) event to customize the list.

Refer to the following article for additional information and examples: [Filter Operators in Blazor Filter Builder](https://docs.devexpress.com/Blazor/405616/components/filter-builder/operators).

### Connect The Filter Builder to a Data-Aware Component

You can connect the Blazor Filter Builder to data-aware DevExpress Blazor UI components that support [CriteriaOperator](https://docs.devexpress.com/CoreLibraries/4928/devexpress-data-library/criteria-language-syntax) syntax:

[DxGrid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid)

A component that displays data in a tabular format and allows users to edit, sort, group, filter, and otherwise shape data.

[DxTreeList](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList)

A component that displays hierarchical data in a tabular format and allows users to edit, sort, filter, and otherwise shape data.

[DxPivotTable](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PivotTable.DxPivotTable)

A Pivot Table component for multi-dimensional data analysis and cross-tab reporting.

[DxListBox<TData, TValue>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxListBox-2)

A component that can connect to a data source and display a list of selectable items.

For two-way filter synchronization, use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute for the [DxFilterBuilder.FilterCriteria](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder.FilterCriteria) property:

![Filter Builder - Connect the Component to Grid](https://docs.devexpress.com/Blazor/images/filter-builder/blazor-filter-builder-connect-to-grid.png)

- [Product.cs](#tabpanel_oqndXcZDgs_tabid-product)
- [Supplier.cs](#tabpanel_oqndXcZDgs_tabid-supplier)
- [Category.cs](#tabpanel_oqndXcZDgs_tabid-category)
- [Razor](#tabpanel_oqndXcZDgs_tabid-razor)

```
<DxFilterBuilder @bind-FilterCriteria="FilterCriteria">
    <Fields>
        <DxFilterBuilderField FieldName="ProductName" Caption="Product Name" Type="@typeof(string)" />
        <DxFilterBuilderField FieldName="CategoryId" Caption="Category" Type="@typeof(int)">
            <EditSettings>
                <DxComboBoxSettings Data="Categories" ValueFieldName="CategoryId" TextFieldName="CategoryName" />
            </EditSettings>
        </DxFilterBuilderField>
        <DxFilterBuilderField FieldName="SupplierId" Caption="Supplier" Type="@typeof(int)">
            <EditSettings>
                <DxComboBoxSettings Data="Suppliers" ValueFieldName="SupplierId" TextFieldName="CompanyName">
                    <ItemDisplayTemplate>
                        @{
                            var item = (Supplier)context.DataItem;
                        }
                        @item.CompanyName (@item.ContactName)
                    </ItemDisplayTemplate>
                </DxComboBoxSettings>
            </EditSettings>
            <Fields>
                <DxFilterBuilderField FieldName="Supplier.CompanyName" Caption="Company Name" CaptionFullPath="Supplier.Company Name" Type="@typeof(string)" />
                <DxFilterBuilderField FieldName="Supplier.ContactName" Caption="Contact Name" CaptionFullPath="Supplier.Contact Name" Type="@typeof(string)" />
            </Fields>
        </DxFilterBuilderField>
        <DxFilterBuilderField FieldName="UnitPrice" Caption="Unit Price" Type="@typeof(int)" />
        <DxFilterBuilderField FieldName="UnitsInStock" Caption="Units in Stock" Type="@typeof(int)" />
        <DxFilterBuilderField FieldName="QuantityPerUnit" Caption="Quantity per Unit" Type="@typeof(int)" />
        <DxFilterBuilderField FieldName="Discontinued" Type="@typeof(bool)" />
    </Fields>
</DxFilterBuilder>

<div>
    <DxButton Text="Clear" Click="ClearFilterCriteria" RenderStyle="ButtonRenderStyle.Secondary"/>
    <DxButton Text="Apply" Click="ApplyFilterCriteria" />
</div>

<DxGrid @ref="Grid" Data="Data"
        PageSize="15"
        ColumnResizeMode="GridColumnResizeMode.NextColumn"
        TextWrapEnabled="false" VirtualScrollingEnabled="true"
        FilterCriteriaChanged="GridFilterCriteriaChanged"
        FilterMenuButtonDisplayMode="GridFilterMenuButtonDisplayMode.Always">
    <Columns>
        <DxGridDataColumn FieldName="ProductName" MinWidth="100" />
        <DxGridDataColumn FieldName="Category.CategoryName" Caption="Category" MinWidth="100" />
        <DxGridDataColumn FieldName="Supplier.CompanyName" Caption="Company Name" MinWidth="100" />
        <DxGridDataColumn FieldName="Supplier.ContactName" Caption="Contact Name" MinWidth="100" />
        <DxGridDataColumn FieldName="UnitPrice" DisplayFormat="c" Width="10%" />
        <DxGridDataColumn FieldName="UnitsInStock" Caption="Units in Stock" Width="10%" />
        <DxGridDataColumn FieldName="QuantityPerUnit" Caption="Quantity per Unit" Width="15%" MinWidth="80" />
        <DxGridDataColumn FieldName="Discontinued" Width="10%" MinWidth="90" />
    </Columns>
</DxGrid>

@code {
    IGrid Grid { get; set; }
    object Data { get; set; }
    CriteriaOperator FilterCriteria { get; set; } = CriteriaOperator.Parse("StartsWith([ProductName], 'C') And ([UnitPrice] < 50 Or [Discontinued] = true)");
    IEnumerable<Product> Products { get; set; }
    IEnumerable<Category> Categories { get; set; }
    IEnumerable<Supplier> Suppliers { get; set; }
    List<Category> SelectedCategories { get; set; } = [];
    protected override async Task OnInitializedAsync() {
        Suppliers = await NwindDataService.GetSuppliersAsync();
        Categories = await NwindDataService.GetCategoriesAsync();
        Products = await NwindDataService.GetProductsAsync();
        // ...
    }
    protected override void OnAfterRender(bool firstRender) {
        base.OnAfterRender(false);
        if (firstRender && Grid != null)
            ApplyFilterCriteria();
    }
    void ApplyFilterCriteria() {
        Grid.SetFilterCriteria(FilterCriteria);
    }
    void ClearFilterCriteria() {
        FilterCriteria = null;
        Grid.ClearFilter();
    }
    void GridFilterCriteriaChanged(GridFilterCriteriaChangedEventArgs args) {
        FilterCriteria = args.FilterCriteria;
    }
}
```