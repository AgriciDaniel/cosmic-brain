---
title: "DxDateEdit<T> Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1"
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

## DxDateEdit<T> Class

In This Article

A date editor with a drop-down calendar.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDateEdit<T> :
    DxMaskedInputBase<T>,
    IDropDownOwner,
    IFocusableEditor
```

## Type Parameters

| Name | Description |
| --- | --- |
| T | The data type. Supported types: [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime), [DateTimeOffset](https://learn.microsoft.com/dotnet/api/system.datetimeoffset), [DateOnly](https://learn.microsoft.com/dotnet/api/system.dateonly), and their [nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types) instances. |

## Remarks

The DevExpress Date Edit for Blazor (`<DxDateEdit>`) displays a drop-down calendar that allows users to select a date.

![DateEdit Overview](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor_dateedit_overview.png)

You can also add a time section to the component. This option allows users to select date-time values or enter them in the edit box.

![Date Edit - Time Section](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-time-section.png)

[Run Demo](https://demos.devexpress.com/blazor/DateEdit)

### Add a Date Edit to a Project

Follow the steps below to add the Date Edit component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxDateEdit>` … `</DxDateEdit>` markup to a `.razor` file.
3. Configure the component: specify a selected date, apply a mask, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxDateEdit Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1._members).

### Static Render Mode Specifics

Blazor Date Edit does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Edit Value

Use the [Date](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Date) property to specify the date that is selected in `<DxDateEdit>`. The date range is limited by the [MinValue](https://learn.microsoft.com/dotnet/api/system.datetime.minvalue#system-datetime-minvalue) and [MaxValue](https://learn.microsoft.com/dotnet/api/system.datetime.maxvalue#system-datetime-maxvalue) properties. Refer to the following section for details:.

You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Date` property to a data field. Refer to the following topic for details:[Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxDateEdit Date="DateTime.Today"></DxDateEdit>

<DxDateEdit @bind-Date="@DateTimeValue"></DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Today;
}
```

If you do not use two-way data binding, handle the [DateChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DateChanged) event to respond to the editor’s date change. The following code snippet enables the **Update Date** button once the Date Edit component’s value is changed.

```
<DxDateEdit Date="@Date" DateChanged="@((DateTime newValue) => OnDateChanged(newValue))"></DxDateEdit>
<button type="button" class="btn btn-primary" disabled="@IsDisabled">Update Date</button>

@code {
    DateTime Date = DateTime.Today;
    bool IsDisabled = true;

    void OnDateChanged(DateTime newValue) {
        Date = newValue;
        if (newValue != DateTime.Today)
            IsDisabled = false;
        else IsDisabled = true;
    }
}
```

You can use the [CalendarViewMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.CalendarViewMode) property to hide certain calendar views and implement the following scenarios:

- Disable day selection. Users can only select the year and month.
- Disable day and month selection. Users can only select the year.

[View Example: Grid for Blazor - Implement a date range filter](https://github.com/DevExpress-Examples/blazor-grid-date-range-filter)

### Apply a Mask

The Date Edit component supports and masks.

#### Date-Time

[Date-time masks](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#date-time-masks) allow users to enter only date and/or time values. Users can navigate between mask sections (such as months, days, and hours) and increase/decrease section values with the Up and Down arrow keys and mouse wheel.

![Date-Time Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-date-time-masks.png)

[Run Demo](https://demos.devexpress.com/blazor/DateEdit#DateTimeMasks)

Follow the steps below to apply a date-time mask:

1. Make sure that the [Date](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Date) property is set to a [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) object.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Mask) property.
3. *Optional.* Add the [DxDateTimeMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateTimeMaskProperties) component to the Date Edit’s markup to customize [mask settings](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#mask-settings). If the markup contains any child element, such as the [DayCellTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DayCellTemplate), place the `DxDateTimeMaskProperties` component in the [MaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.MaskProperties) template.

The following code snippet applies a date-time mask:

```
<DxDateEdit @bind-Date="@Date"
            Mask="@DateTimeMask.ShortDate">
    <DxDateTimeMaskProperties CaretMode="@MaskCaretMode.Advancing" />
</DxDateEdit>

@code {
    DateTime Date { get; set; } = DateTime.Now;
}
```

#### Date-Time Offset

[Date-time offset masks](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#date-time-offset-masks) allow users to enter only date and/or time values, including the time’s offset from Coordinated Universal Time (UTC). Users can navigate between mask sections (such as months, days, and hours), and increase/decrease section values with the Up and Down arrow keys and mouse wheel.

![Date-Time Offset Masks](https://docs.devexpress.com/Blazor/images/blazor-data-editors-date-time-offset-masks.png)

[Run Demo](https://demos.devexpress.com/blazor/DateEdit#DateTimeOffsetMasks)

Follow the steps below to apply a date-time offset mask:

1. Make sure that the [Date](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Date) property is set to a [DateTimeOffset](https://learn.microsoft.com/dotnet/api/system.datetimeoffset) object.
2. Assign a [predefined](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#predefined-masks) or [custom](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#custom-masks) pattern to the [Mask](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Mask) property.
3. *Optional.* Add the [DxDateTimeOffsetMaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateTimeOffsetMaskProperties) component to the Date Edit’s markup to customize [mask settings](https://docs.devexpress.com/Blazor/402515/components/data-editors/masks/date-time-masks#mask-settings). If the markup contains any child element, such as the [DayCellTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DayCellTemplate), place the `DxDateTimeOffsetMaskProperties` component in the [MaskProperties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.MaskProperties) template.

The following code snippet applies a date-time offset mask:

```
<DxDateEdit @bind-Date="@Date"
            Mask="@DateTimeMask.ShortDate">
    <DxDateTimeOffsetMaskProperties CaretMode="@MaskCaretMode.Advancing" />
</DxDateEdit>

@code {
    DateTimeOffset Date { get; set; } = DateTimeOffset.Now;
}
```

### Nullable Date and Placeholder

If the Date Edit component is bound to a [nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types) object, users can press Alt + Del to clear the editor value (set it to `null`).

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to show the **Clear** button when the editor has a non-null value. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to specify the prompt text (placeholder) when the editor value is `null`.

```
<DxDateEdit @bind-Date="@DateTimeValue"
            ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
            NullText="Select a date..."></DxDateEdit>

@code {
    DateTime? DateTimeValue { get; set; } = new DateTime(2020, 01, 01);
}
```

![DateEdit ClearButton](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-clearbutton.png)

[Run Demo: Date Edit - Null Date Values and Placeholder](https://demos.devexpress.com/blazor/DateEdit#NullableDate)

You can also specify a custom null value for the Date Edit component. This value can be used with nullable and regular [DateTime](https://learn.microsoft.com/dotnet/api/system.datetime) types. For additional information, refer to [NullValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.NullValue).

### Date Format

Use the [Format](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Format)  property to format the Date Edit’s value in edit mode when the editor is focused, and use the [DisplayFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DisplayFormat) property to format the editor’s display value when the editor is not focused. If you do not set the `DisplayFormat`  property, the `Format` is applied in display and edit modes.

The following example applies the [long date format](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings#the-long-date-d-format-specifier) in display mode and the [short date format](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings#the-short-date-d-format-specifier) in edit mode:

```
<DxDateEdit @bind-Date="@DateTimeValue" DisplayFormat="D" Format="d"></DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Now;
}
```

[Run Demo: Date Edit - Display Format](https://demos.devexpress.com/blazor/DateEdit#DisplayFormat)

Refer to the following Microsoft help topics for additional information about supported formats: [Standard Date and Time Format Strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) and [Custom Date and Time Format Strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings).

### Min/Max Dates

Use the [MinDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.MinDate) and [MaxDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.MaxDate) properties to specify a range of available dates. The Date Edit’s calendar disables dates that are out of the range and hides navigation arrows for them.

The default minimum and maximum values are [System.DateTime.MinValue](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.minvalue) and [System.DateTime.MaxValue](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.maxvalue).

> [!note] Note
> - The maximum date should be greater than the minimum date. Otherwise, an exception occurs.
> - If a user types a date that is out of the range, the Date Edit keeps the previously selected date.
> - You can set the `Date` property to a date outside the date range. In this case, the Date Edit displays the date as is, and the editor’s calendar displays the closest available date.

```
<DxDateEdit Date="DateTime.Today"
            MinDate="@(new DateTime(2020, 06, 11))" 
            MaxDate="@(new DateTime(2020, 06, 25))" />
```

![The maximum date](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-maximum-date.png)

[Run Demo: Date Edit — Date Range](https://demos.devexpress.com/blazor/DateEdit#MinMaxDate)

### Time Section

Date Edit can display a time section that contains a scroll picker. Users can edit time values in the picker or enter values in the edit box.

Set the [TimeSectionVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionVisible) property to `true` to display the time section in the component. The [TimeSectionScrollPickerFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionScrollPickerFormat) property allows you to specify the format of the time value in the picker. If the [TimeSectionScrollPickerFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionScrollPickerFormat) property is not specified, section appearance depends on current culture.

```
<DxDateEdit @bind-Date="@DateTimeValue" 
            TimeSectionVisible="true"
            TimeSectionScrollPickerFormat="tt h m">
</DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Now;
}
```

![Date Edit - Time Section](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-timesection-format.png)

In many scenarios, users can benefit from a limited range of values. For instance, since meetings typically start on the hour or at 30-minute intervals, there is no need to show all 60 minute options. You can simplify the time picker by removing unnecessary values and specifying the time intervals using the following properties:

- [TimeSectionHourIncrement](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionHourIncrement)
- [TimeSectionMinuteIncrement](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionMinuteIncrement)
- [TimeSectionSecondIncrement](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.TimeSectionSecondIncrement)

[Run Demo: Date Edit - Time Section](https://demos.devexpress.com/blazor/DateEdit#TimeSection)

### Disable Dates

Handle the [CustomDisabledDate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.CustomDisabledDate) event to disable individual dates. This event is raised each time a day cell is rendered.

```
<DxDateEdit @bind-Date="@DateTimeValue" CustomDisabledDate="@OnCustomDisabledDate"></DxDateEdit>

@code {
    DateTime dateTimeValue = DateTime.Now;
    DateTime DateTimeValue { get => dateTimeValue; set { dateTimeValue = value; InvokeAsync(StateHasChanged); } }

    void OnCustomDisabledDate(CalendarCustomDisabledDateEventArgs args) {
        args.IsDisabled = args.Date < DateTime.Today.AddDays(-20) || GetDisabledDates().Exists(d => DaysEqual(d, args.Date));
    }
    bool DaysEqual(DateTime date1, DateTime date2) {
        return (date1.Year == date2.Year && date1.DayOfYear == date2.DayOfYear);
    }
    List<DateTime> GetDisabledDates() {
        DateTime baseDate = DateTime.Today;
        return new List<DateTime>() { baseDate.AddDays(-9), baseDate.AddDays(-4), baseDate.AddDays(-3), baseDate.AddDays(3), baseDate.AddDays(5), baseDate.AddDays(6), baseDate.AddDays(15) };
    }
}
```

![Date Edit Disabled Dates](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor_dateedit_disabled_dates.png)

[Run Demo: Date Edit - Disabled Dates](https://demos.devexpress.com/blazor/DateEdit#DisabledDates)

### Highlight Special Dates

You can use the [DayCellTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DayCellTemplate) property to highlight individual dates in the Date Edit’s calendar. The template’s `context` parameter allows you to access the current date-time object and its settings.

The following code snippet applies different styles to different dates.

- [CalendarData.cs](#tabpanel_mFGXHxZne8_tabid-2)
- [Razor](#tabpanel_mFGXHxZne8_tabid-1)
- [CSS](#tabpanel_mFGXHxZne8_tabid-3)

```
<DxDateEdit @bind-Date="@DateTimeValue"
                SizeMode="Params.SizeMode"
                CssClass="cw-320"
                InputId="deHighlightDates">
        <DayCellTemplate>
            <a class="@GetCssClassNames(context)">@context.Day.ToString()</a>
        </DayCellTemplate>
    </DxDateEdit>
    @* ... *@
@code {
    DateTime DateTimeValue { get; set; } = DateTime.Today;
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

![DateEdit - Highlight Special Dates](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-highlight-special-dates.png)

[Run Demo: Date Edit - Highlight Special Dates](https://demos.devexpress.com/blazor/DateEdit#HighlightSpecialDates)

### Set the First Day of the Week

The first day of a week in the Date Edit’s drop-down calendar depends on current culture settings. Use the [FirstDayOfWeek](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.FirstDayOfWeek) property to specify a different day.

```
<DxDateEdit Date="DateTime.Today" FirstDayOfWeek="DayOfWeek.Monday"></DxDateEdit>
```

![DateEdit FirstDayOfWeek](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor_dateedit_firstdayofweek.png)

To specify a rule that determines the first week of the year, use the [WeekNumberRule](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.WeekNumberRule) property.

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify the size of a Date Edit. The following code snippet applies different size modes to Date Edit components.

```
<DxDateEdit @bind-Date="@DateTimeValue" SizeMode="SizeMode.Small"></DxDateEdit>

<DxDateEdit @bind-Date="@DateTimeValue" SizeMode="SizeMode.Medium"></DxDateEdit>

<DxDateEdit @bind-Date="@DateTimeValue" SizeMode="SizeMode.Large"></DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Now;
}
```

![Size modes](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-size-modes.png)

To customize Date Edit input, use the [InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.InputCssClass) property. The following code snippet applies the custom style to the text within the input:

- [Razor](#tabpanel_+I728zrBDD_tabid-razor1)
- [CSS](#tabpanel_+I728zrBDD_tabid-css)

```
<DxDateEdit @bind-Date="@DateTimeValue" InputCssClass="my-style"></DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Now;
}
```

![Custom Input font weight](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-input-css.png)

For additional information, refer to the following help topics:

- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes)

### Datepicker Modes

`<DxDateEdit>` adapts a datepicker to the device type.

- Mobile and tablet devices display a datepicker as a scroll picker.
	> [!note] Note
	> Mobile devices show a datepicker in a modal window.
	![DateEdit ScrollPicker](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-scrollpicker.png)
- Other device types display a datepicker as a calendar.
	![DateEdit Overview](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor_dateedit_overview.png)

Set the [PickerDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.PickerDisplayMode) property to `Calendar` or `ScrollPicker` to show the same datepicker type on all devices. For the scroll picker, you can also use the [ScrollPickerFormat](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.ScrollPickerFormat) property to define the date format for each part (day, month, and year).

```
<DxDateEdit @bind-Date="@DateTimeValue" PickerDisplayMode="DatePickerDisplayMode.ScrollPicker" 
            ScrollPickerFormat="dddd MMMM yyyy"></DxDateEdit>

@code {
    DateTime DateTimeValue { get; set; } = DateTime.Now;
}
```

[Run Demo: Date Edit - Adaptive Datepicker](https://demos.devexpress.com/blazor/DateEdit#AdaptiveScrollPicker)

You can also place custom content and define CSS styles in the calendar type datepicker. Use the [DayCellTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DayCellTemplate) property to access the current date-time object and its settings.

- [Razor](#tabpanel_QQGDhCzzT3_tabid-razor1)
- [CSS](#tabpanel_QQGDhCzzT3_tabid-css)

```
<DxDateEdit @bind-Date="@DateTimeValue">
    <DayCellTemplate>
        <span class="text-info">@context.Day.ToString()</span>
    </DayCellTemplate>
</DxDateEdit>

@code{
    DateTime DateTimeValue { get; set; } = DateTime.Today;
}
```

![Custom CssClass is Applied to the Date Edit Cell](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dx-dateedit-daycelltemplate.png)

### Hide Built-In Drop-Down Button

Set the [ShowDropDownButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.ShowDropDownButton) to `false` to hide the built-in button that invokes a drop-down calendar. If you need a custom drop-down button, you can add a new.

### Add Command Buttons

You can add custom command buttons to the Date Edit component. Refer to [Command Buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) for additional information.

The following code adds date increment/decrement buttons to the Date Edit.

```
<DxDateEdit @bind-Date="@DateTimeValue">
    <Buttons>
        <DxEditorButton IconCssClass="editor-icon editor-icon-chevron-left-small"
                        Tooltip="Previous day"
                        Position="@EditorButtonPosition.Left"
                        Click="@(_ => OnChangeDayButtonClick(false))" />
        <DxEditorButton IconCssClass="editor-icon editor-icon-chevron-right-small"
                        Tooltip="Next day"
                        Position="@EditorButtonPosition.Right"
                        Click="@(_ => OnChangeDayButtonClick(true))" />
    </Buttons>
</DxDateEdit>

@code{
    DateTime DateTimeValue { get; set; } = DateTime.Today;

    void OnChangeDayButtonClick(bool isAdd) {
        DateTimeValue = DateTimeValue.AddDays(isAdd ? 1 : -1);
    }
}
```

![Date Edit - Add Command Button](https://docs.devexpress.com/Blazor/images/editors/dateedit/dateedit-two-command-buttons.png)

[Run Demo: Editors - Command Buttons](https://demos.devexpress.com/blazor/CommandButtons)

### Input Validation

You can add a standalone Date Edit or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Starship](#tabpanel_+I728zrBDD-1_tabid-model1)
- [Razor](#tabpanel_+I728zrBDD-1_tabid-razor11)

```
<EditForm Model="@starship" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout >
        <DxFormLayoutItem Caption="Production Date:" ColSpanMd="6" >
            <Template >
                <DxDateEdit @bind-Date="@starship.ProductionDate" />
            </Template>
        </DxFormLayoutItem>
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Starship starship=new Starship();
}
```

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

[Run Demo: Form Validation](https://demos.devexpress.com/blazor/FormValidation)

### Read-Only State

`<DxDateEdit>` supports a read-only state. Set the [ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.ReadOnly) property to `true` to activate this option.

```
<DxDateEdit ReadOnly="true"> </DxDateEdit>
```

[Run Demo: Date Edit - Read-Only and Disabled Modes](https://demos.devexpress.com/blazor/DisabledAndReadOnlyModes)

### Drop-Down Window Direction

Use the [DropDownDirection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.DropDownDirection) property to specify the direction in which the drop-down calendar is displayed relative to the input element. The default value is `Down`. The following code sample changes the direction to `Up`:

```
<DxDateEdit Date="DateTime.Today" DropDownDirection="DropDownDirection.Up" />
```

![DateEdit - Dropdown Direction](https://docs.devexpress.com/Blazor/images/editors/dateedit/blazor-dateedit-dropdown-direction.png)

> [!note] Note
> If the editor is close to a browser window’s edge and there is not enough space to display the drop-down window in the specified direction, the drop-down window is displayed in the opposite direction.

### Keyboard Navigation

The DevExpress Blazor Date Edit supports keyboard navigation. Users can navigate to the editor’s input element and within the drop-down calendar (Date and Time sections).

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

[Run Demo: Date Edit](https://demos.devexpress.com/blazor/DateEdit)

#### Shortcut Keys for Input Element

The following shortcut keys are available when the editor’s input element is focused:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus to the next focusable element on a page. Note that the drop-down button, custom buttons, and the Clear button are excluded from the page tab sequence. |
| Shift + Tab | Moves focus to the previous focusable element on a page. |
| Alt + Del | Clears the editor value (sets it to `null`). |
| Alt + Down Arrow | Opens the drop-down calendar. |

#### Shortcut Keys for Drop-Down Calendar

The following shortcut keys are available when the drop-down calendar is open:

| Shortcut Keys | Description |
| --- | --- |
| Refer to [Calendar shortcuts](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCalendar-1#keyboard-navigation). | All calendar shortcut keys are available. |
| Right Arrow, Left Arrow | Switches between Date and Time sections. |
| Space, Enter | Selects the date, updates the [Date](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDateEdit-1.Date) parameter value, closes the drop-down calendar, and moves focus to the input element. If the Date section is active and the editor has the, this shortcut key moves focus to the first carousel in the Time section. |
| Esc, Alt + Up Arrow | Closes the drop-down calendar and moves focus to the input element. |

#### Tab Sequence in Drop-Down Calendar

![Date Edit - Tab Sequence in Drop-Down Calendar](https://docs.devexpress.com/Blazor/images/editors/dateedit/dateedit-tab-sequence-date-section.png)

#### Tab Sequence in Drop-Down Calendar (with Time Section)

![Date Edit - Tab Sequence in Calendar with Time Section](https://docs.devexpress.com/Blazor/images/editors/dateedit/dateedit-tab-sequence-time-section.png)

[Run Demo: Date Edit - Time Section](https://demos.devexpress.com/blazor/DateEdit#TimeSection)

#### Tab Sequence in Adaptive Datepicker

![Date Edit - Tab Sequence in Adaptive Datepicker](https://docs.devexpress.com/Blazor/images/editors/dateedit/dateedit-tab-sequence-adaptive-datepicker.png)

[Run Demo: Date Edit - Adaptive Datepicker](https://demos.devexpress.com/blazor/DateEdit#AdaptiveScrollPicker)

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Date Edit.

```
<DxDateEdit Date="DateTime.Today"
            id="date"
            name="date"
            autocomplete="on"
            @oninput="MyFunction">
</DxDateEdit>

@code {
    void MyFunction(){
        //...
    }
}
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

#### Full-Width Numerals (IME)

The Date Edit mask does not support full-width numerals produced by Input Method Editors (IMEs). The editor accepts only standard ASCII digits.

As a workaround, you can implement a JavaScript function that handles the component input element’s `beforeinput` and `paste` events to convert input data to a standard string.