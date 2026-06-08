---
title: "Migrating to v5 - FluentUI Blazor Components"
source: "https://fluentui-blazor-v5.azurewebsites.net/MigrationV5"
author:
published:
created: 2026-05-25
description:
tags:
  - "clippings"
---
## Changes introduced in this version

The following changes have been included in version 5. The categories these changes fall in are:

- Coding changes
- Component changes (marked with 🔃)
- Breaking Changes (marked with 💥)

## General

- ### FluentComponentBase changes 💥
	All components inherit from `FluentComponentBase`, which has significant changes in V5:
	| Aspect | V4 | V5 |
	| --- | --- | --- |
	| Constructor | Parameterless | Requires `LibraryConfiguration` parameter |
	| `Element` parameter | On base class (public get / protected set) | Removed from base — components that need it implement `IFluentComponentElementBase` |
	| `ParentReference` | `[Parameter] DesignTokens.Reference?` | **Removed** |
	> ⚠️ If you have custom components inheriting from `FluentComponentBase`, you must update them to pass `LibraryConfiguration` to the base constructor.
- ### FluentProviders
	V5 introduces a `FluentProviders` component that should be placed at the root of your application. It provides cascading values (like `LibraryConfiguration`) needed by all Fluent UI components.
```xml
<!-- In App.razor or MainLayout.razor -->
<FluentProviders>
    @Body
</FluentProviders>
```
- ### FluentField — New input wrapping pattern
	V5 introduces `FluentField` as the standard way to wrap input components with a label, validation message, and hint text. V4's `FluentValidationMessage<T>` component is **removed** — use `FluentField` 's `Message`, `MessageCondition`, and `MessageState` instead.
	All V5 input components implement the `IFluentField` interface, providing: `Label`, `LabelTemplate`, `LabelPosition`, `LabelWidth`, `Required`, `Message`, `MessageIcon`, `MessageTemplate`, `MessageCondition`, `MessageState`.
```xml
<!-- V4 -->
<FluentTextField @bind-Value="name" Label="Name" />
<FluentValidationMessage For="@(() => name)" />

<!-- V5 -->
<FluentTextInput @bind-Value="name" Label="Name"
                 MessageCondition="@(f => !string.IsNullOrEmpty(f.Message))"
                 MessageState="MessageState.Error" />
```
- ### Scoped Css Bundling
	The csproj contains `<DisableScopedCssBundling>true</DisableScopedCssBundling>` and `<ScopedCssEnabled>false</ScopedCssEnabled>` to prevent the bundling of scoped css files.
	Components won't contain the scoped css identifier, so if you used `::deep` in your CSS to target Fluent UI components, it is now useless and can be removed.

## Color Enumeration

- ### Renamed values 🔃
	`Default` is equivalent of previous `Neutral` and `Primary` is equivalent of previous `Accent` values.
	The icon default color was changed from `Color.Accent` to [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword), which means that the icon will inherit the color from its parent element. You can set the icon color to `Color.Primary` to get the previous behavior.
- ### Removed values💥
	`Neutral`, `Accent`, `Fill`, `FillInverse` values have been flagged as `Obsolete` and will be removed in the next version.
	|v3 & v4|v5| || | `Color.Neutral` (--neutral-foreground-rest) | `Color.Default` (--colorNeutralForeground1) | | `Color.Accent` (--accent-fill-rest) | `Color.Primary` (--colorBrandForeground1) | | `Color.Fill` (--neutral-fill-rest) | `Color.Default` (--colorNeutralForeground1) | | `Color.FillInverse` (--neutral-fill-inverse-rest) | `Color.Lightweight` (--colorNeutralForegroundInverted) |

## FluentAccordion

### FluentAccordionItem - Renamed parameters 💥

- `Heading` → `Header`
- `HeadingTemplate` → `HeaderTemplate`
- `HeadingTooltip` → `HeaderTooltip`

### FluentAccordionItem - Type-changed parameters 💥

- `HeadingLevel`: Changed from `string?` to `int?`.

### FluentAccordion - Type-changed parameters 💥

- `OnAccordionItemChange`: Changed from `EventCallback<FluentAccordionItem>` to `EventCallback<AccordionItemEventArgs>`. The affected item can be found in the event arguments via the `Item` property.
```xml
<!-- V4 -->
<FluentAccordion OnAccordionItemChange="@OnChange">...</FluentAccordion>
@code {
    void OnChange(FluentAccordionItem item) { }
}

<!-- V5 -->
<FluentAccordion OnAccordionItemChange="@OnChange">...</FluentAccordion>
@code {
    void OnChange(AccordionItemEventArgs args) { var item = args.Item; }
}
```

### New parameters

**FluentAccordion:**

- `ExpandModeChanged` (`EventCallback<AccordionExpandMode?>`) — two-way binding support for `ExpandMode`.
- `HeadingLevel` (`int?`) — sets the heading level for all accordion items.
- `Size` (`AccordionItemSize?`) — sets the size for all accordion items.
- `MarkerPosition` (`AccordionItemMarkerPosition?`) — controls the expand/collapse marker position.
- `Block` (`bool?`) — when true, the accordion takes up the full width of its container.

**FluentAccordionItem:**

- `Disabled` (`bool`) — disables the accordion item.
- `Size` (`AccordionItemSize?`) — overrides the size set on the parent accordion.
- `MarkerPosition` (`AccordionItemMarkerPosition?`) — overrides the marker position set on the parent.
- `Block` (`bool?`) — overrides the block setting on the parent.

## FluentButton

### Renamed parameters 💥

- `Autofocus` → `AutoFocus` (also changed from `bool?` to `bool`)
- `Action` → `FormAction`
- `Enctype` → `FormEncType`
- `Method` → `FormMethod`
- `NoValidate` → `FormNoValidate`
- `Target` → `FormTarget`

### Appearance 💥

The `Appearance` parameter has been updated to use the `ButtonAppearance` enum instead of the `Appearance` enum.

`ButtonAppearance` enum has the following values:

- `Default`
- `Outline`
- `Primary`
- `Subtle`
- `Transparent`

### New parameters

- `Shape` (`ButtonShape?`) — controls the button shape (rounded, circular, square).
- `Size` (`ButtonSize?`) — controls the button size.
- `DisabledFocusable` (`bool`) — disables the button but keeps it focusable for accessibility.
- `IconOnly` (`bool`) — renders the button in icon-only mode.
- `Label` (`string?`) — accessible label for the button.
- `Tooltip` (`string?`) — tooltip text shown on hover.

### Migrating to v5

You can use the `ToButtonAppearance()` method to convert the `Appearance` parameter to the `ButtonAppearance` enum.

```csharp
@using Microsoft.FluentUI.AspNetCore.Components.Migration

<FluentButton Appearance="Appearance.Accent.ToButtonAppearance()">Click</FluentButton>
//                                          ^^^^^^^^^^^^^^^^^^^^
```

| v3 & v4 | v5 | || | `Appearance.Neutral` | `ButtonAppearance.Default` | | `Appearance.Accent` | `ButtonAppearance.Primary` | | `Appearance.Lightweight` | `ButtonAppearance.Transparent` | | `Appearance.Outline` | `ButtonAppearance.Outline` | | `Appearance.Stealth` | `ButtonAppearance.Subtle` | | `Appearance.Hypertext` | `ButtonAppearance.Default` | | `Appearance.Filled` | `ButtonAppearance.Default` |

## FluentGridItem

- ### Renamed properties 🔃
	These properties have been renamed to comply with the Blazor naming convention (Pascal case):
	- `xs`, `sm`, `md`, `lg`, `xl`, `xxl` properties have been renamed to
		- `Xs`, `Sm`, `Md`, `Lg`, `Xl`, `Xxl`.
	If you don't rename them correctly, you'll probably get a compilation error like this one:
```
InvalidOperationException: Unable to set property 'sm' on object of type 'Microsoft.FluentUI.AspNetCore.Components.FluentGridItem'.
The error was: Unable to cast object of type 'System.String' to type 'System.Nullable\`1[System.Int32]'.
```

## FluentLabel

### Changed properties 🔃

- `Weight`, now used to determine if the label text is shown regular or semibold

### Removed properties💥

- `Alignment`
- `Color`
- `CustomColor`
- `MarginBlock`
- `Typo`

### New properties

- `Required` (`bool`) — displays a required indicator.
- `Size` (`LabelSize?`) — controls the label size.
- `Tooltip` (`string?`)

### Migrating from v4 to v5

Label is now exclusively being used for labeling input fields. If you want to use a more v4 compatible component to show text using Fluent's opinions on typography, you can use the new `Text` component instead.

## FluentSwitch

### Removed values💥

The `CheckedMessage` and `UncheckedMessage` properties have been removed.

### New properties

- `Tooltip` (`string?`)

## FluentTextArea

### Changed properties

| V4 Property | V5 Property | Change |
| --- | --- | --- |
| `Appearance` (`FluentInputAppearance`) | `Appearance` (`TextAreaAppearance?`) | Enum renamed |

### Removed properties💥

- `Cols` — use `Width` instead.
- `Rows` — use `Height` instead.
- `Form` (`string?`)
- `DataList` (`string?`)

### New properties

- `Placeholder` (`string?`)
- `AutoComplete` (`string?`)
- `AutoResize` (`bool?`) — automatically adjusts height to content.
- `Size` (`TextAreaSize?`)
- `Width` (`string?`)
- `Height` (`string?`)
- `Tooltip` (`string?`)
- `ChangeAfterKeyPress` (`KeyPress[]?`) — triggers value change after specific key presses.
- `OnChangeAfterKeyPress` (`EventCallback<FluentKeyPressEventArgs>`)

## FluentLayout and FluentMainLayout

- ### New components
	The `FluentLayout` component has been introduced to replace the `FluentLayout` and `FluentMainLayout` components. This new component is based on the CSS `grid` element to simplify the usage and customization of the layout (including on mobile device).
```xml
<FluentLayout>
   <FluentLayoutItem Area="LayoutArea.Header">Header</FluentLayoutItem>
   <FluentLayoutItem Area="LayoutArea.Navigation">Navigation</FluentLayoutItem>
   <FluentLayoutItem Area="LayoutArea.Content">Content</FluentLayoutItem>
   <FluentLayoutItem Area="LayoutArea.Aside">Aside</FluentLayoutItem>
   <FluentLayoutItem Area="LayoutArea.Footer">Footer</FluentLayoutItem>
</FluentLayout>
```
- ### Removed components💥
	The `FluentHeader`, `FluentBodyContent`, `FluentFooter`, `FluentMainLayout` components have been removed.
	Use the `FluentLayoutItem Area="..."` component instead.

## FluentSpacer

### General

The main difference is that the component allows more flexible properties. You can let the spacer grow horizontally and vertically, including fixed width and heights.

### Changed properties

- `Width` is now a string and can accept any value, including `px`, `%`, `em`, etc. If no width is set, the spacer behaviour will default to `flex-grow: 1`.

### Keep old behavior

If trying to keep old behavior, simply add the `px` suffix to the previous integer value and change it to a string.

### New properties

- `Height` (`string?`) — fixed height for vertical spacing.
- `Orientation` (`Orientation`) — controls whether the spacer grows horizontally or vertically.

## FluentDataGrid

### Renamed parameters

- `ColumnOptionsLabels` has been renamed to `ColumnOptionsUISettings`
- `ColumnResizeLabels` has been renamed to `ColumnResizeUISettings`
- `ColumnSortLabels` has been renamed to `ColumnSortUISettings`

These `...UISettings` parameters are now only used to set a custom icon and icon position. All labels that could be set in earlier versions have now been replaced with our standard Localization capabilities. You can use a custom localizer to set custom labels for these UI settings. An example of this can be found in the `Server` project of the demo application, where a custom localizer is registered in the `Program.cs` file.

### Removed properties 💥

- `NoTabbing` (`bool`) — removed.

### Type changes

- `GenerateHeader`: `GenerateHeaderOption?` → `DataGridGeneratedHeaderType?`
- `ErrorContent`: `RenderFragment<Exception>?` → `RenderFragment<Exception?>?`

### Enum changes

- `Align` has been renamed to `DataGridCellAlignment`
- `GenerateHeaderOption` has been renamed to `DataGridGeneratedHeaderType`
- `SortDirection` has been renamed to `DataGridSortDirection`

### New properties

- `OnExpandAll` (`EventCallback`)
- `OnCollapseAll` (`EventCallback`)

## FluentSelect

- ### Base class change 💥
	The base class for all list components has changed:
	- V4: `ListComponentBase<TOption>` inheriting from `FluentInputBase<string?>`
		- V5: `FluentListBase<TOption, TValue>` inheriting from `FluentInputBase<TValue>`
	All list components (`FluentSelect`, `FluentCombobox`, `FluentListbox`) now require **two** type parameters: `TOption` (the option type) and `TValue` (the value type).
```xml
<!-- V4 -->
<FluentSelect TOption="Country" Items="@countries"
              OptionValue="@(c => c.Code)" OptionText="@(c => c.Name)"
              @bind-SelectedOption="selectedCountry" />

<!-- V5 -->
<FluentSelect TOption="Country" TValue="string" Items="@countries"
              OptionValue="@(c => c.Code)" OptionText="@(c => c.Name)"
              @bind-Value="selectedCountryCode" />
```
- ### Appearance 💥
	The `Appearance` property has been updated to use the `ListAppearance` enum instead of `Appearance` enum.
	`ListAppearance` enum has the following values:
	- `FilledLighter`
	- `FilledDarker`
	- `Outline`
	- `Transparent`
- ### Changed properties 💥
	| V4 Property | V5 Property | Change |
	| --- | --- | --- |
	| `Value` (`string?`) | `Value` (`TValue?`) | Now generic |
	| `ValueExpression` (`Expression<Func<string>>?`) | `ValueExpression` (`Expression<Func<TValue>>?`) | Now generic |
	| `Disabled` (`bool`) | `Disabled` (`bool?`) | Now nullable — use `Disabled="true"` instead of just `Disabled` |
	| `OptionText` (`Func<TOption, string?>`) | `OptionText` (`Func<TOption?, string>?`) | Nullable TOption, non-nullable return |
	| `OptionValue` (`Func<TOption, string?>?`) | `OptionValue` (`Func<TOption?, TValue?>?`) | Returns `TValue?` instead of `string?` |
	| `OptionDisabled` (`Func<TOption, bool>?`) | `OptionDisabled` (`Func<TOption?, bool>?`) | Nullable TOption |
	| `SelectedOptions` (`IEnumerable<TOption>?`) | `SelectedItems` (`IEnumerable<TOption>`) | **Renamed**, now non-nullable (defaults to `[]`) |
	| `SelectedOptionsChanged` | `SelectedItemsChanged` | **Renamed** |
- ### Removed properties 💥
	- `ChangeOnEnterOnly`
	- `Embedded`
	- `Field`
	- `Immediate`
	- `ImmediateDelay`
	- `Open`
	- `OptionComparer` — use `OptionSelectedComparer` instead.
	- `OptionSelected` — use `OptionSelectedComparer` instead.
	- `OptionTitle`
	- `Position`
	- `SelectedOption` — use `Value` instead.
	- `SelectedOptionExpression`
	- `SelectedOptions` — use `SelectedItems` instead.
	- `SelectedOptionsExpression`
	- `Title`
	- `SelectedOptionChanged` — use `ValueChanged` instead.
	- `SelectedOptionsChanged` — use `SelectedItemsChanged` instead.

## FluentDragContainer and FluentDropZone

### General changes 💥

All events associated with this component have been updated to use `EventCallback<FluentDragEventArgs<TItem>>` instead of `Action<FluentDragEventArgs<TItem>>`. This change allows developers to use different method signatures and properly await tasks.

```cs
private void OnDropEnd(FluentDragEventArgs<string> e) { } // Possible in v4 & v5

private Task OnDropEnd(FluentDragEventArgs<string> e) { } // Possible in v5

private async Task OnRowDropEnd(FluentDragEventArgs<string> e) { } // Possible in v5
```

This change introduces minor breaking changes if these properties are assigned in C# code.

```cs
// v4
component.OnDragEnter = (e) => { };

// v5
component.OnDragEnter = EventCallback.Factory.Create<FluentDragEventArgs<FormRow>>(this, (e) => { });
```

You also need to update your code if you are checking these properties for null.

```cs
// v4
if (component.OnDragEnter != null) { }

// v5
if (component.OnDragEnter.HasDelegate) { }
```

#### Changed properties

| V4 Property | V5 Property | Change |
| --- | --- | --- |
| `OnDragStart` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragStart` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnter` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnter` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragOver` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragOver` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragLeave` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragLeave` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDropEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDropEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |

### FluentDropZone changes

#### Changed properties

| V4 Property | V5 Property | Change |
| --- | --- | --- |
| `OnDragStart` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragStart` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnter` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnter` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragOver` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragOver` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragLeave` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragLeave` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDropEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDropEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |

## On this page

- [General](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#general)
	- [FluentComponentBase changes 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentcomponentbase-changes)
		- [FluentProviders](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentproviders)
		- [FluentField — New input wrapping pattern](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentfield-new-input-wrapping-pattern)
		- [Scoped Css Bundling](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#scoped-css-bundling)
- [Color Enumeration](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#color-enumeration)
	- [Renamed values 🔃](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#renamed-values)
		- [Removed values💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#removed-values)
- [FluentAccordion](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentaccordion)
	- [FluentAccordionItem - Renamed parameters 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentaccordionitem-renamed-parameters)
		- [FluentAccordionItem - Type-changed parameters 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentaccordionitem-type-changed-parameters)
		- [FluentAccordion - Type-changed parameters 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentaccordion-type-changed-parameters)
		- [New parameters](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-parameters)
- [FluentButton](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentbutton)
	- [Renamed parameters 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#renamed-parameters)
		- [Appearance 💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#appearance)
		- [New parameters](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-parameters-1)
		- [Migrating to v5](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#migrating-to-v5)
- [FluentGridItem](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentgriditem)
	- [Renamed properties 🔃](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#renamed-properties)
- [FluentLabel](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentlabel)
	- [Changed properties 🔃](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#changed-properties)
		- [Removed properties💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#removed-properties)
		- [New properties](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-properties)
		- [Migrating from v4 to v5](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#migrating-from-v4-to-v5)
- [FluentSwitch](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentswitch)
	- [Removed values💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#removed-values-1)
		- [New properties](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-properties-1)
- [FluentTextArea](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluenttextarea)
	- [Changed properties](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#changed-properties-1)
		- [Removed properties💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#removed-properties-1)
		- [New properties](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-properties-2)
- [FluentLayout and FluentMainLayout](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentlayout-and-fluentmainlayout)
	- [New components](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#new-components)
		- [Removed components💥](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#removed-components)
- [FluentSpacer](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentspacer)
- [FluentDataGrid](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentdatagrid)
- [FluentSelect](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentselect)
- [FluentDragContainer and FluentDropZone](https://fluentui-blazor-v5.azurewebsites.net/MigrationV5#fluentdragcontainer-and-fluentdropzone)

Version: 5.0.0-RC.3+e2a4ea4a

[Powered by.NET 10.0.7](https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet-core)