---
type: concept
title: "DevExpress Blazor DxFilterBuilder"
created: 2026-05-25
updated: 2026-05-25
address: c-000044
status: developing
tags:
  - blazor
  - devexpress
  - filter
  - criteria
  - ui-component
source_url: https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFilterBuilder
source_file: .raw/DxFilterBuilder Class  Blazor.md
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxGrid]]"
  - "[[DevExpress Blazor DxTreeList]]"
---

# DevExpress Blazor DxFilterBuilder

The DevExpress Blazor Filter Builder (`DxFilterBuilder`) allows users to create complex filter criteria with various conditions combined by logical operators. Builds expressions using DevExpress Criteria Operator language. Can be used standalone or connected to data-aware components.

Assembly: `DevExpress.Blazor.v25.2.dll`
NuGet: `DevExpress.Blazor`

Declaration:
```csharp
public class DxFilterBuilder :
    DxComponentBase,
    IFilterBuilderFieldsOwner,
    INestedSettingsOwner,
    IDisposable
```

Requires interactive render mode (no static SSR support).

## Fields

### Flat Fields
Declare individually or iterate via reflection:

```razor
<DxFilterBuilder>
    <Fields>
        <DxFilterBuilderField FieldName="Name" Type="typeof(string)" />
        <DxFilterBuilderField FieldName="CreatedDate" Type="typeof(DateTime)" />
    </Fields>
</DxFilterBuilder>
```

### Hierarchical Fields
Nest fields for complex object graphs:

```razor
<DxFilterBuilderField FieldName="SupplierId" Type="@typeof(int)">
    <Fields>
        <DxFilterBuilderField FieldName="Supplier.CompanyName" Type="@typeof(string)" />
    </Fields>
</DxFilterBuilderField>
```

### Collection Fields
Enable `IsCollection` for aggregate operators on collection fields: Exists, Count, Avg, Sum, Min, Max.

### Field Properties
| Property | Description |
|---|---|
| `FieldName` | Bound data field |
| `Type` | Data type for editor generation |
| `Caption` | Display name in field tree |
| `CaptionFullPath` | Display name in filter criteria |
| `IsCollection` | Enable collection aggregate operators |
| `EditSettings` | Customize/replace value editor |
| `ValueEditTemplate` | Full custom editor template |
| `ValueDisplayTemplate` | Custom value display appearance |

## Customizable Value Editors

Per-field editor configuration via `EditSettings`:
- `DxSpinEditSettings` — numeric with mask
- `DxComboBoxSettings` — dropdown with Data/ValueFieldName/TextFieldName (ideal for foreign keys)
- Any DevExpress editor settings type

Full control via `ValueEditTemplate` with `FilterBuilderValueEditTemplateContext` (Value, DisplayText).

## Operator Customization

Handle `CustomizeOperators` event to control which operators appear per field. Reference: [Filter Operators](https://docs.devexpress.com/Blazor/405616/components/filter-builder/operators).

## Component Connectivity

Two-way bind `FilterCriteria` to data-aware components via `CriteriaOperator`:

| Connectable Component | Binding |
|---|---|
| `DxGrid` | `@bind-FilterCriteria` + `SetFilterCriteria()` / `ClearFilter()` |
| `DxTreeList` | `@bind-FilterCriteria` |
| `DxPivotTable` | `@bind-FilterCriteria` |
| `DxListBox<T>` | `@bind-FilterCriteria` |

```razor
<DxFilterBuilder @bind-FilterCriteria="FilterCriteria">
    <!-- fields -->
</DxFilterBuilder>
<DxButton Text="Apply" Click="ApplyFilterCriteria" />

<DxGrid @ref="Grid" Data="Data" FilterCriteriaChanged="GridFilterCriteriaChanged">
    <!-- columns -->
</DxGrid>

@code {
    void ApplyFilterCriteria() => Grid.SetFilterCriteria(FilterCriteria);
    void ClearFilterCriteria() { FilterCriteria = null; Grid.ClearFilter(); }
}
```
