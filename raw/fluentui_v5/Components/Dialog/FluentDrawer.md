---
title: Drawer (Panel)
route: /Drawer
icon: PanelRight
---

# Drawer (Panel)

A **Drawer** (or a Panel) is a secondary content surface that slides in from one edge of a layout.
Use drawers for supplemental info and simple actions related to the main content.

For short information that's related to a specific part of the main layout, a drawer may be overwhelming.
Try a tooltip or a popover instead. If you need people to confirm an action they're trying to take,
use a dialog.

## Usage

A drawer is part of the dialog box category and is used in the same way.
The simplest way is to use the **DialogService** to display a drawer.
By injecting this service, you have `ShowDrawerAsync` methods at your disposal.
You can pass the **type of Dialog** to be displayed and the **options** to be passed to that window.

Once the user closes the dialog window, the `ShowDrawerAsync` method returns a `DialogResult` object containing the return data.

👉 See the [Dialog](/Dialog) documentation for more information.

> [!NOTE] The `ShowDrawerAsync` method is identical to the `ShowDialogAsync` method.
> With the exception of the **default value** of the `options.Alignment` property, which is `DialogAlignment.End`.
> And the resulting HTML code is slightly different, using a `fluent-drawer` instead of a `fluent-dialog`.
> The visual rendering and animation of opening and closing is also different.

## Alignment

The drawer can be aligned to the left (start) or right (end) of the screen.

By default, the drawer is open at the **right (end)** of the screen.
But you can customize this position using the `options.Alignment` property.

```csharp
var result = await DialogService.ShowDrawerAsync<Dialog.SimpleDialog>(options =>
{
    options.Alignment = DialogAlignment.Start;
});
```

{{ DialogServiceDrawer Files=Code:DialogServiceDrawer.razor;SimpleDialog:SimpleDialog.razor;PersonDetails:PersonDetails.cs }}

## Modal Drawer

Unlike the [dialog box](/Dialog), the drawer does not block interaction with the application.

- When a drawer is defined as **modal**, the user can close the drawer by clicking outside it (`Cancel`).
- When a drawer is defined as **non-modal**, the user can continue to interact with the application, without closing the drawer.
  To close it, the user must click on one of the drawer actions (OK / Cancel).

By default, the Drawer is displayed modally (Modal = true).

```csharp
var result = await DialogService.ShowDrawerAsync<SimpleDialog>(options =>
{
    options.Modal = true;
});
```` 

