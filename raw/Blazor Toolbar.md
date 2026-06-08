---
title: "Blazor: Toolbar"
source: "https://demos.devexpress.com/blazor/SpinEdit#Overview"
author:
published:
created: 2026-05-25
description: "A toolbar control that implements an adaptive command interface. The component supports various types of buttons: drop-down, checked, and radio."
tags:
  - "clippings"
---
## Overview

Value: **15**

The [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) allows you to display and edit numeric values. Users can press the spin buttons to change the editor's value, use the ARROW UP and ARROW DOWN keys, or type a new value in the edit box.

Spin Edit works with built-in.NET data types, including [System.Decimal](https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1). The editor processes values directly on the server side, without converting them to or from JavaScript number types. This ensures that values users enter never lose precision because of type conversions.

The Spin Edit component supports different size modes. To specify the component's size in code, use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property. To apply different size modes, use the drop-down list in the demo card's header.

## Bind Value On Input Change

The entered value is: **2026**

You can [bind](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) the editor's [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.Value) property to a field. If a user changes the input value, the editor updates its `Value` property. Use the [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.BindValueMode) property to specify when the update should happen. The following modes are available:

- `OnLostFocus` (default) — The editor value is updated after the editor loses focus.
- `OnInput` — The editor value is updated whenever a user types.
- `OnDelayedInput` — The editor value is updated with a [delay](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.InputDelay) after a user makes changes.

## Custom Increment

Use the [Increment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.Increment) property to specify the step by which the editor's value changes when a user clicks the spin buttons. The [MinValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.MinValue) and [MaxValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.MaxValue) properties allow you to limit the editor's minimum and maximum values.

## Nullable Value and Placeholder

Do any of the following to clear the [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) (set its value to null):

- Delete the value in the editor.
- Click the **Clear** button. This button is displayed when you set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to **Auto**.

Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to display placeholder text in the Spin Edit when its value is null.

## Display Format

Use the  [DisplayFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.DisplayFormat)  property to format the [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) 's display value when the editor is not focused.

Spin Edit supports standard formats. See the [Standard Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) and [Custom Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings) help topics for more information.

## Mask

Price: **0**

Our [Spin Edit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) component supports masked input. If you specify a mask, the input box only accepts values in a specific numeric format.

To enable this functionality, assign the pattern to the component's [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.Mask) property. The [DxNumericMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxNumericMaskProperties) component specifies additional mask settings (such as culture). For more information about Numeric masks, refer to the following help topic: [Numeric Masks](https://docs.devexpress.com/Blazor/402514/data-editors/masks/numeric-masks).

Try the **Mask** and **Culture** settings to explore the different date-time mask modes.