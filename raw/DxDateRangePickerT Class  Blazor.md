---
title: "DxDateRangePicker<T> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1"
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

## DxDateRangePicker<T> Class

In This Article

A component that allows you to select date ranges.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDateRangePicker<T> :
    DxMaskedInputBase<T>,
    IDropDownOwner,
    IFocusableEditor
```

## Type Parameters

| Name | Description |
| --- | --- |
| T | The data type. Supported types: [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime), [DateOnly](https://learn.microsoft.com/dotnet/api/system.dateonly), and their [nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types) instances. |

## Remarks

The DevExpress Date Range Picker (`<DxDateRangePicker>`) for Blazor allows you to select a range of dates in a drop-down calendar.

![Date Range Picker - Overview](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/DateRangePicker)

### Add a Date Range Picker to a Project

Follow the steps below to add the Date Range Picker component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxDateRangePicker>` … `</DxDateRangePicker>`.
3. Configure the component: specify start and end dates, set the range of available dates, specify the display format, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxDateRangePicker Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1._members).

### Static Render Mode Specifics

Blazor Date Range Picker does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Set Start and End Dates

Use [StartDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.StartDate) and [EndDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.EndDate) properties to specify the date range selected in the component. You can also use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind these properties to data fields. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)">
</DxDateRangePicker>

@* --or-- *@

<DxDateRangePicker @bind-StartDate="@DateTimeStart"
                   @bind-EndDate="@DateTimeEnd">
</DxDateRangePicker>

@code {
    DateTime? DateTimeStart { get; set; } = DateTime.Today;
    DateTime? DateTimeEnd { get; set; } = DateTime.Today.AddDays(7);
}
```

![Date Range Picker - Overview](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/DateRangePicker)

If you do not use two-way data binding, handle the [StartDateChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.StartDateChanged) and [EndDateChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.EndDateChanged) events to respond to date changes.

```
<DxDateRangePicker StartDate="@modelStartDate" 
                   EndDate="@modelEndDate"
                   StartDateChanged="@((DateTime newStartDate) => OnStartDateChanged(newStartDate))"
                   EndDateChanged="@((DateTime newEndDate)=> OnEndDateChanged(newEndDate))" />
<p></p>
@Alert_StartDate
<p></p>
@Alert_EndDate

@code {
    DateTime modelStartDate=DateTime.Today;
    DateTime modelEndDate = DateTime.Today.AddDays(7);
    string Alert_StartDate { get; set; }
    string Alert_EndDate { get; set; }

    void OnStartDateChanged(DateTime newStartDate) {
        modelStartDate = newStartDate;
        Alert_StartDate = "The start date changed:" + newStartDate;
    }

    void OnEndDateChanged(DateTime newEndDate) {
        modelEndDate = newEndDate;
        Alert_EndDate = "The end date changed:" + newEndDate;
    }
}
```

### Set Range of Available Dates

You can use the [MinDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.MinDate) and [MaxDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.MaxDate) properties to limit the available date range.

```
<DxDateRangePicker @bind-StartDate="@DateTimeStart"
                   @bind-EndDate="@DateTimeEnd"
                   MinDate="@MinDate"
                   MaxDate="@MaxDate"/>

@code {
    DateTime DateTimeStart { get; set; } = DateTime.Today;
    DateTime DateTimeEnd { get; set; } = DateTime.Today.AddDays(7);
    DateTime MinDate { get; set; }
    DateTime MaxDate { get; set; }
    protected override void OnInitialized() {
        MinDate = DateTimeStart.AddDays(-7);
        int days = DateTime.DaysInMonth(DateTimeStart.Year, DateTimeStart.Month);
        MaxDate = new DateTime(DateTimeStart.Year, DateTimeStart.Month, days).AddDays(14);
    }
}
```

[Run Demo: Range of Available Dates](https://demos.devexpress.com/blazor/DateRangePicker#MinMaxDate)

### Nullable Date and Placeholder

If the Date Range Picker component is bound to a [nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types) object, users can delete the editor’s value (set it to `null`).

You can also set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to show the **Clear** button when the editor has a non-null value. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to specify the prompt text (placeholder) when the editor’s value is `null`.

```
<DxDateRangePicker @bind-StartDate="@DateTimeStart"
                   @bind-EndDate="@DateTimeEnd"
                   NullText="Select a date range..."
                   ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto">
</DxDateRangePicker>

@code {
    DateTime? DateTimeStart { get; set; } = DateTime.Today;
    DateTime? DateTimeEnd { get; set; } = DateTime.Today.AddDays(7);
}
```

![Date Range Picker - Clear Button](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-clearbutton.png)

[Run Demo: Null Date Values and Placeholder](https://demos.devexpress.com/blazor/DateRangePicker#NullableDate)

You can also specify a custom null value for the Date Range Picker component. This value can be used with nullable and regular [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) types. For additional information, refer to [NullValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.NullValue).

### Display Format

The DevExpress Blazor Date Range Picker supports standard date formats:

- [Standard Date and Time Format Strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings)
- [Custom Date and Time Format Strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

You can use the [DisplayFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.DisplayFormat) property to format the editor’s display values.

```
<DxDateRangePicker @bind-StartDate="@DateTimeStart"
                   @bind-EndDate="@DateTimeEnd"
                   DisplayFormat="From: {0:M}; To: {1:M}"/>

@code {
    DateTime DateTimeStart { get; set; } = DateTime.Today;
    DateTime DateTimeEnd { get; set; } = DateTime.Today.AddDays(7);
}
```

[Run Demo: Display Format](https://demos.devexpress.com/blazor/DateRangePicker#DisplayFormat)

### Set the First Day of the Week

The first day of a week in the Date Range Picker’s calendar depends on the current culture settings. Use the [FirstDayOfWeek](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.FirstDayOfWeek) property to specify a different day.

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)"
                   FirstDayOfWeek="DayOfWeek.Monday">
</DxDateRangePicker>
```

![DateEdit FirstDayOfWeek](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-firstdayofweek.png)

To specify a rule that determines the first week of the year, use the [WeekNumberRule](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.WeekNumberRule) property.

### Highlight Special Dates

You can use the [DayCellTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.DayCellTemplate) property to highlight individual dates in the Date Range Picker’s calendar. The template’s `context` parameter allows you to access the current date-time object and its settings.

The following code applies different styles to different dates:

- [CalendarData.cs](#tabpanel_si3nS+a++x_tabid-2)
- [Razor](#tabpanel_si3nS+a++x_tabid-1)
- [CSS](#tabpanel_si3nS+a++x_tabid-3)

```
<DxDateRangePicker @bind-StartDate="@DateTimeStart"
                   @bind-EndDate="@DateTimeEnd"
                   SizeMode="Params.SizeMode"
                   CssClass="cw-320"
                   InputId="deHighlightDates">
    <DayCellTemplate>
        <a class="@GetCssClassNames(context)">@context.Day.ToString()</a>
    </DayCellTemplate>
</DxDateRangePicker>
@* ... *@

@code {
    DateTime DateTimeStart { get; set; } = DateTime.Today;
    DateTime DateTimeEnd { get; set; } = DateTime.Today.AddDays(7);
    CalendarData Data { get; set; } = new CalendarData();

    string GetCssClassNames(DateTime date) {
        if(Data.PersonalDays.Exists(d => DaysEqual(d, date)))
            return "fw-bold text-success";
        if(Data.Holidays.Exists(d => DaysEqual(d, date)))
            return "text-danger";
        if(Data.BirthDates.Exists(d => DaysEqual(d, date)))
            return "fw-bold text-info";

        return null;
    }

    bool DaysEqual(DateTime date1, DateTime date2) {
        return (date1.Year == date2.Year && date1.DayOfYear == date2.DayOfYear);
    }

}
```

![Highlight Special Dates](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-highlight-dates.png)

[Run Demo: Highlight Special Dates](https://demos.devexpress.com/blazor/DateRangePicker#HighlightSpecialDates)

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify Date Range Picker size. The following code applies different size modes to Date Range Picker components:

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)" 
                   SizeMode="SizeMode.Small"></DxDateRangePicker>

<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)" 
                   SizeMode="SizeMode.Medium"></DxDateRangePicker>

<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)" 
                   SizeMode="SizeMode.Large"></DxDateRangePicker>
```

![Size modes](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-sizemodes.png)

To customize Date Range Picker input, use the [InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.InputCssClass) property. The following code snippet applies the custom style to the text within the input:

- [Razor](#tabpanel_WHXpxXm9sz_tabid-razor1)
- [CSS](#tabpanel_WHXpxXm9sz_tabid-css1)

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)" 
                   InputCssClass="my-style"/>
```

![Custom Input font weight](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-inputcssclass.png)

For additional information, refer to the following help topics:

- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes)

### Hide Built-In Drop-Down Button

Set the [ShowDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.ShowDropDownButton) to `false` to hide the built-in button that invokes a drop-down calendar. If you need a custom drop-down button, you can add a new.

### Add Command Buttons

You can add custom command buttons to the Date Range Picker component. Refer to [Command Buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) for additional information.

The following code hides the built-in drop-down button, adds a new drop-down button, and specifies its position:

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)"
                   ShowDropDownButton=false>
    <Buttons>
        <DxDateEditDropDownButton Position="EditorButtonPosition.Left"/>
    </Buttons>
</DxDateRangePicker>
```

![Date Range Picker - Command Button Position](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-addbutton.png)

### Read-Only State

The Blazor Date Range Picker supports a read-only state. Set the [ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.ReadOnly) property to `true` to activate this option.

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)"
                   ReadOnly="true"/>
```

### Drop-Down Window Direction

Use the [DropDownDirection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.DropDownDirection) property to specify the direction in which the drop-down calendar is displayed relative to the input element. The default value is `Down`. The following code changes the direction to `Up`:

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)"
                   DropDownDirection="DropDownDirection.Up" />
```

![DropDownDirection](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-dropdown-direction.png)

> [!note] Note
> If the editor is close to a browser window’s edge and there is not enough space to display the drop-down window in the specified direction, the drop-down window is displayed in the opposite direction.

### Keyboard Navigation

The DevExpress Blazor Date Range Picker supports keyboard navigation. Users can navigate to the editor’s input element and within the drop-down calendar.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

[Run Demo: Date Range Picker](https://demos.devexpress.com/blazor/DateRangePicker)

#### Shortcut Keys for Input Element

The following shortcut keys are available when the editor’s input element is focused:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus to the next focusable element on a page. Note that the drop-down button, custom buttons, and the Clear button are excluded from the page tab sequence. |
| Shift + Tab | Moves focus to the previous focusable element on a page. |
| Alt + Down Arrow | Opens the drop-down calendar. |

#### Shortcut Keys for Drop-Down Calendar

The following shortcut keys are available when the drop-down calendar is open:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus between. |
| Shift + Tab | Moves focus backwards between. |
| Left Arrow | Moves focus to the previous cell. |
| Right Arrow | Moves focus to the next cell. |
| Up Arrow | Moves focus one cell up. |
| Down Arrow | Moves focus one cell down. |
| Ctrl + Up Arrow | Navigates to a view with a wider date range: from month view to year view, from year view to decade view, and so on. |
| Ctrl + Down Arrow | Navigates to a more detailed view: from decade view to year view, from year view to month view, and so on. |
| Page Up | Navigates from the current month/year/decade/century to the previous month/year/decade/century. |
| Page Down | Navigates from the current month/year/decade/century to the next month/year/decade/century. |
| Home | Moves focus to the first day of the current week. |
| End | Moves focus to the last day of the current week. |
| Enter or Space | Allows you to select a date range.   Focus the start date and press Enter or Space to select it. Then use Arrows, Home, End, Page Up, or Page Down to navigate to the end date and press Enter or Space to select it. After that, the component closes the drop-down calendar, updates [StartDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.StartDate) and [EndDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.EndDate) parameter values, and focuses the input element. |
| Shift | Allows you to select a date range.   Focus the first date, press Shift and navigate to the end date (use Arrows, Home, End, Page Up, or Page Down ). When the Shift key is released, the component closes the drop-down calendar, updates [StartDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.StartDate) and [EndDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateRangePicker-1.EndDate) parameter values, and focuses the input element. |
| Esc or Alt + Up Arrow | Closes the drop-down calendar and moves focus to the input element. |

#### Root Element Navigation

![Root Element Navigation](https://docs.devexpress.com/Blazor/images/editors/daterangepicker/blazor-daterangepicker-root-element-navigation.png)

### Input Validation

You can add a standalone Date Range Picker or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Date Range Picker.

```
<DxDateRangePicker StartDate="DateTime.Today"
                   EndDate="DateTime.Today.AddDays(7)"
                   id="daterangepicker"
                   name="daterangeppicker"
                   autocomplete="on"
                   @oninput="MyFunction">
</DxDateRangePicker>

@code {
    void MyFunction(){
        //...
    }
}
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

#### Full-Width Numerals (IME)

The Date Range Picker mask does not support full-width numerals produced by Input Method Editors (IMEs). The editor accepts only standard ASCII digits.

As a workaround, you can implement a JavaScript function that handles the component input element’s `beforeinput` and `paste` events to convert input data to a standard string.