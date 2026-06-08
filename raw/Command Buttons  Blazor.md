---
title: "Command Buttons | Blazor"
source: "https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons"
author:
published: 2001-01-08
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Command Buttons

In This Article

DevExpress Blazor editors display built-in command buttons that allow users to open a drop-down, increase/decrease the value, or clear the edit box content.

![Built-in Buttons](https://docs.devexpress.com/Blazor/images/editors/built-in-command-buttons.png)

You can use `Show***Button` properties to.

You can also customize default command button or add custom buttons to editors. Follow the steps below.

1. Add the `<Buttons></Buttons>` tag to the editor’s markup to define the `Buttons` collection.
2. Fill the `Buttons` collection. This collection renders specified buttons in the order they appear in the markup.
	The following buttons are available:
	- [DxComboBoxDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBoxDropDownButton) - A button that invokes a drop-down menu (can be added to the [DxComboBox<TData, TValue>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2) only).
		- [DxDateEditDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEditDropDownButton) - A button that invokes a drop-down calendar (can be added to the [DxDateEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1) only).
		- [DxDropDownBoxDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBoxDropDownButton) - A button that invokes the drop-down window in the [DxDropDownBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox) component.
		- [DxSpinButtons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinButtons) - Spin buttons that allow you to increase and decrease a value (can be added to the [DxSpinEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1) only).
		- [DxTimeEditDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTimeEditDropDownButton) - A button that invokes a drop-down time picker (can be added to the [DxTimeEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTimeEdit-1) only).
	The following button is available for the [DxComboBox<TData, TValue>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxComboBox-2), [DxDateEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1), [DxDateRangePicker<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1), [DxDropDownBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDropDownBox), [DxMaskedInput<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMaskedInput-1), [DxSpinEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1), [DxTextBox](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTextBox), and [DxTimeEdit<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTimeEdit-1) components:
	- [DxEditorButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxEditorButton) - A custom button displayed in an editor.
3. Set up button properties to customize the buttons:
	- `CssClass`
		- `Position`
		- and so on

Buttons are displayed in an editor in the following order:

- The “Clear” button
- Custom buttons and customized default buttons (in the same order as they appear in markup)
- Built-in buttons

[Run Demo: Editors - Command Buttons](https://demos.devexpress.com/blazor/CommandButtons)

## Examples

### Hide Built-in Button

The following code snippet hides the built-in spin buttons in the Spin editor.

```
<DxSpinEdit Value="15" ShowSpinButtons="false"></DxSpinEdit>
```

![SpinEdit HideSpinButtons](https://docs.devexpress.com/Blazor/images/blazor-spinedit-hidespinbuttons.png)

### Customize Default Button

The following code snippet hides the built-in spin buttons, adds new spin buttons, and specifies their position.

```
<DxSpinEdit Value="15" ShowSpinButtons="false">
        <Buttons>
            <DxSpinButtons Position="EditorButtonPosition.Left"/>
        </Buttons>
</DxSpinEdit>
```

![Spin Edit - Command Button Position](https://docs.devexpress.com/Blazor/images/editors/spinedit/spinedit-command-button-position.png)

### Add Custom Button

The following code snippet adds a custom currency button to the right of the default spin buttons:

- [Razor](#tabpanel_V8WIDbb1Ak_tabid-razor)
- [CSS](#tabpanel_V8WIDbb1Ak_tabid-css)

```
@using System.Globalization

<DxSpinEdit @bind-Value="@Price"
            Mask="@NumericMask.Currency"
            ShowSpinButtons="false">
        <Buttons>
            <DxSpinButtons />
            <DxEditorButton IconCssClass="@($"editor-icon {CurrencyButtonIconClass}")"
                            Tooltip="Change currency"
                            Click="@OnChangeCultureInfoButtonClick"
                            CssClass="dx-demo-editor-width" />
        </Buttons>
        <ChildContent>
            <DxNumericMaskProperties Culture="MaskCultureInfo" />
        </ChildContent>
</DxSpinEdit>

@code{
    double Price { get; set; }
    string CurrencyButtonIconClass { get; set; } = "editor-icon-euro";
    CultureInfo MaskCultureInfo { get; set; } = CultureInfoItems[0];
    static CultureInfo[] CultureInfoItems { get; set; } = {
            CultureInfo.GetCultureInfo("en-US"),
            CultureInfo.GetCultureInfo("de-DE")
    };
    void OnChangeCultureInfoButtonClick() {
        var isCurrentCultureUs = MaskCultureInfo.Equals(CultureInfoItems[0]);
        MaskCultureInfo = isCurrentCultureUs ? CultureInfoItems[1] : CultureInfoItems[0];
        CurrencyButtonIconClass = isCurrentCultureUs ? "editor-icon-dollar" : "editor-icon-euro";
    }
}
```

![SpinEdit - Add Command Button](https://docs.devexpress.com/Blazor/images/editors/spinedit/spinedit-add-command-button.png)