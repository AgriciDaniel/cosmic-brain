# Activity Pickers (3.7-preview)

## Overview

This section explains how to change the activity picker used in the workflow editor. Currently, two activity picker types are supported: Accordion (default) and Treeview.

## Accordion

To use the Accordion activity picker, use the following line.

```csharp
builder.Services.AddScoped<IActivityPickerComponentProvider, AccordionActivityPickerComponentProvider>();
```

<figure><img src="../../.gitbook/assets/Screenshot 2025-07-06 170218.png" alt="" width="141"><figcaption><p>Accordion Example</p></figcaption></figure>

When using [nested activity categories](../../extensibility/custom-activities.md#activity-metadata), the accordion picker defaults to returning the first category within the string. You are able to change this behaviour by specifying your own `CategoryDisplayResolver`.

```csharp
builder.Services.AddScoped<IActivityPickerComponentProvider>(sp => new AccordionActivityPickerComponentProvider
{
    // Example - Replace the default category resolver with a custom one.
    CategoryDisplayResolver = category => category.Split('/').Last().Trim()
});
```

## Treeview

To use the TreeView activity picker, add the following line.

```csharp

builder.Services.AddScoped<IActivityPickerComponentProvider, TreeviewActivityPickerComponentProvider>();
```

<figure><img src="../../.gitbook/assets/Screenshot 2025-07-06 165657.png" alt="" width="142"><figcaption><p>Treeview Example</p></figcaption></figure>
