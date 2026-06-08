---
title: "DxRadioGroup<TData, TValue> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2"
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

## DxRadioGroup<TData, TValue> Class

In This Article

A component that generates a radio button group based on a bound collection.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxRadioGroup<TData, TValue> :
    DxDataEditor<TValue>
```

## Type Parameters

| Name | Description |
| --- | --- |
| TData | The data item type. |
| TValue | The value type. |

## Remarks

The DevExpress Radio Group for Blazor (`<DxRadioGroup>`) allows you to create a group of radio buttons. A user can select only one button in the group at a time.

![RadioGroup - Overview](https://docs.devexpress.com/Blazor/images/editors/radio/radio-overview.png)

[Run Demo: RadioGroup - Overview](https://demos.devexpress.com/blazor/RadioGroup)

> [!note] Note
> As an alternative, you can use the DevExpress [Radio Button](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadio-1) component (`<DxRadio>`). The Radio Button component allows you to create and customize radio buttons individually, while the Radio Group component allows you to generate a set of radio buttons based on a collection.

### Add a Radio Group to a Project

Follow the steps below to add the Radio Group component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxRadioRadio>` … `</DxRadioGroup>` markup to a `.razor` file.
3. Configure the component: bind it to a data collection and customize layout and appearance options as described below.

### API Reference

Refer to the following list for the component API reference: [DxRadioGroup Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2._members).

### Static Render Mode Specifics

Blazor Radio Group does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Bind to Data

The Radio Group component generates and arranges radio items based on a collection (the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.Items) property).

```
<DxRadioGroup Items="@Languages"
              @bind-Value="@PreferredLanguage"/>
<p>Preferred language:
    <strong>@PreferredLanguage</strong>
</p>

@code {
    string PreferredLanguage { get; set; } = "English";
    IEnumerable<string> Languages = new[] { "English", "简体中文", "Español", "Français", "Deutsch" };
}
```

[Run Demo: RadioGroup - Overview](https://demos.devexpress.com/blazor/RadioGroup) [View Example: Change visibility of the DxFormLayout's items and groups conditionally](https://github.com/DevExpress-Examples/blazor-formlayout-change-items-and-groups-visibility)

### Layout

Use the [Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.Layout) property to specify whether the Radio Group component arranges items vertically or horizontally.

```
<DxRadioGroup Items="@Languages"
              @bind-Value="@PreferredLanguage"
              Layout="@RadioGroupLayout.Horizontal">
</DxRadioGroup>

@code {
    string PreferredLanguage { get; set; } = "English";
    IEnumerable<string> Languages = new[] { "English", "简体中文", "Español", "Français", "Deutsch" };
}
```

![RadioGroup - Layout](https://docs.devexpress.com/Blazor/images/editors/radio/radio-horizontal-layout.png)

[Run Demo: RadioGroup - Layout](https://demos.devexpress.com/blazor/RadioGroup#Layout)

### Content Position

Use the following properties to change content position:

- [ItemAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.ItemAlignment) - Specifies the position of item labels relative to the container boundaries.
- [ItemLabelPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.ItemLabelPosition) - Specifies the position of item labels relative to clickable circles.

- [Razor](#tabpanel_pLRNKh0Wsj_tabid-razor)
- [CSS](#tabpanel_pLRNKh0Wsj_tabid-product)

```
<div class="w-400">
    <DxRadioGroup Items="@Languages"
                  @bind-Value="@PreferredLanguage"
                  ItemLabelPosition="LabelPosition.Left"
                  ItemAlignment="CheckBoxContentAlignment.Right">
    </DxRadioGroup>
</div>

@code {
    string PreferredLanguage { get; set; } = "English";
    IEnumerable<string> Languages = new[] { "English", "简体中文", "Español", "Français", "Deutsch" };
}
```

![RadioGroup - Content Position](https://docs.devexpress.com/Blazor/images/editors/radio/radio-alignment.png)

### Item Template

The Radio Group component contains the [ItemTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.ItemTemplate) property that allows you to customize item labels.

- [Product.cs](#tabpanel_pzq9K24Z9I_tabid-product)
- [Razor](#tabpanel_pzq9K24Z9I_tabid-razor)

```
<label id="group-label">Select your drink:</label>
<DxRadioGroup Items="@Drinks"
              @bind-Value="@SelectedDrinkId"
              ValueFieldName="@nameof(Product.ProductId)"
              EnabledFieldName="@nameof(Product.InStock)"
              aria-labelledby="group-label">
    <ItemTemplate>@context.ProductName @GetDrinkState(context)</ItemTemplate>
</DxRadioGroup>
<p>
    You have selected:
    <strong>@GetDrinkName()</strong>
</p>

@code {
    int SelectedDrinkId { get; set; } = 2;
    IEnumerable<Product> Products { get; set; }
    IEnumerable<Product> drinks;

    IEnumerable<Product> Drinks {
        get => drinks;
        set {
            drinks = value;
            InvokeAsync(StateHasChanged);
        }
    }

    protected override async Task OnInitializedAsync() {
        Products = await NwindDataService.GetProductsAsync();
        Drinks = Products.Where(p => p.CategoryId == 1).Take(5).AsEnumerable();
    }

    string GetDrinkState(Product product) => product.InStock ? $"({product.UnitsInStock} units left)" : "(out of stock)";

    string GetDrinkName() => Drinks.First(p => p.ProductId == SelectedDrinkId).ProductName;
}
```

![RadioGroup - Item Template](https://docs.devexpress.com/Blazor/images/editors/radio/radio-item-template.png)

[Run Demo: RadioGroup - Item Template](https://demos.devexpress.com/blazor/RadioGroup#ItemTemplate)

### Disable Radio Buttons

The Radio Group component supports disabled mode. The [EnabledFieldName](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxRadioGroup-2.EnabledFieldName) property specifies the data source field that contains an enabled flag for component items. A user cannot focus or select disabled items.

### Input Validation

You can add a standalone Radio Group component or [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Starship.cs](#tabpanel_Ki-Doxx1ra_tabid-model1)
- [Engine.cs](#tabpanel_Ki-Doxx1ra_tabid-engine)
- [Razor](#tabpanel_Ki-Doxx1ra_tabid-razor1)

```
<EditForm Model="@starship"
          OnValidSubmit="@HandleValidSubmit"
          OnInvalidSubmit="@HandleInvalidSubmit">
    <DataAnnotationsValidator /> 
    <label id="group-label">Engine Type:</label>
    <DxRadioGroup @bind-Value="@starship.Engine"
                  Items="@(Enum.GetValues(typeof(Engine)).Cast<Engine>())"
                  Layout="@RadioGroupLayout.Horizontal"
                  aria-labelledby="group-label"/>
    <ValidationMessage For="@(() => starship.Engine)" />
</EditForm>

@code {
    // ...
    Starship starship = new() {
        ProductionDate = DateTime.Now + TimeSpan.FromDays(1),
        Description = "Default description"
    };
}
```

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

[Run Demo: Form Validation - Custom Form](https://demos.devexpress.com/blazor/FormValidation#CustomForm)

See Also