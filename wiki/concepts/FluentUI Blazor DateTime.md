---
title: FluentUI Blazor DateTime Components
status: developing
address: c-000112
---

# FluentUI Blazor DateTime Components

The [[FluentUI Blazor]] library provides a suite of date and time selection components: `FluentCalendar`, `FluentDatePicker`, `FluentTimePicker`, and the `ToTimeAgo` extension method. These are generic components supporting `DateTime`, `DateTime?`, `DateOnly`, `DateOnly?`, `TimeOnly`, and `TimeOnly?` value types.

> [!Note] FluentCalendar and FluentDatePicker are not yet fully compatible with EditForm/FluentEditForm. Error messages, required messages, and validation messages may be missing.

## FluentCalendar

A month calendar display leveraging the Fluent UI design system. Supports selecting single dates, date ranges, and multiple dates. The calendar has three views: days, months, and years -- users switch views by clicking the title (month name or year number).

### Selection Modes

Set `SelectMode` to `CalendarSelectMode.Single` (default), `CalendarSelectMode.Range`, or `CalendarSelectMode.Multiple`.

```razor
<FluentCalendar DisabledDateFunc="@DisabledDay"
                @bind-Value="@SelectedDay"
                @bind-PickerMonth="@PickerDay"
                Style="height: 250px; align-content: start;" />

<FluentCalendar View="CalendarViews.Months"
                @bind-Value="@SelectedMonth"
                @bind-PickerMonth="@PickerMonth" />

<FluentCalendar View="CalendarViews.Years"
                @bind-Value="@SelectedYear"
                @bind-PickerMonth="@PickerYear" />
```

### Range and Multiple Selection

```razor
<FluentCalendar SelectMode="CalendarSelectMode.Range"
                @bind-SelectedDates="@SelectedRange" />

<FluentCalendar SelectMode="CalendarSelectMode.Multiple"
                @bind-SelectedDates="@SelectedDays"
                MessageCondition="@(i => i.When(() => SelectedDays.Count() > 4)
                    .Display("You can select a maximum of 4 days.", MessageState.Error).Build())" />
```

Use `SelectDatesHover` to customize what gets selected on hover (e.g., always select a full week).

### Custom Day Templates

```razor
<FluentCalendar DisabledDateFunc="@DisabledDate" @bind-Value="@SelectedValue">
    <DaysTemplate>
        @if (!context.IsInactive && (context.Date.Day == 5 || context.Date.Day == 15))
        {
            <div style="color: red; font-weight: bold;">@context.DayNumber</div>
        }
        else { @context.DayNumber }
    </DaysTemplate>
</FluentCalendar>
```

### Culture, Min/Max Dates

Use `Culture` parameter for localization. Use `MinDate` and `MaxDate` to restrict the selectable range.

```razor
<FluentCalendar Culture="@(new CultureInfo("fr"))" @bind-Value="@SelectedValue" />
<FluentCalendar MinDate="@minDate" MaxDate="@maxDate" DisabledSelectable="false" />
```

## FluentDatePicker

An input field that shows a calendar dropdown to select a date. Supports the same views (days, months, years) and value types as the Calendar.

```razor
<FluentDatePicker Label="Days view" @bind-Value="@SelectedValue" />
<FluentDatePicker Label="Months view" @bind-Value="@SelectedValue" Width="150px" View="CalendarViews.Months" />
<FluentDatePicker Label="Years view" @bind-Value="@SelectedValue" Width="100px" View="CalendarViews.Years" />
```

### DoubleClickToDate

Allows double-clicking the input to set a predefined date:

```razor
<FluentDatePicker @bind-Value="@SelectedValue" DoubleClickToDate="@DateTime.Today" />
```

### RenderStyle

- `DatePickerRenderStyle.FluentUI` (default): Full Fluent UI styling and features
- `DatePickerRenderStyle.Native`: Uses the browser's native date picker, ideal for mobile devices (Android/iOS). Limited features: `Culture`, `DisabledDateFunc`, `DaysTemplate` etc. are ignored.

```razor
<FluentDatePicker Label="Native picker" RenderStyle="DatePickerRenderStyle.Native"
                  DoubleClickToDate="@DateTime.Today" @bind-Value="@SelectedValue" />
```

### Value Types

```razor
<FluentDatePicker Label="DateTime?" @bind-Value="@NullableDateTime" Width="140px" />
<FluentDatePicker Label="DateTime" @bind-Value="@DateTime" Width="140px" />
<FluentDatePicker Label="DateOnly?" @bind-Value="@NullableDateOnly" Width="140px" />
<FluentDatePicker Label="DateOnly" @bind-Value="@DateOnly" Width="140px" />
```

## FluentTimePicker

A time selection control with a drop-down list of predefined times. Also supports free-form text input.

### Default Behavior

Default range is 8:00 AM to 6:00 PM in 15-minute increments. Customize via `StartHour`, `EndHour`, and `Increment` parameters.

```razor
<FluentTimePicker Label="Meeting time"
                  DisabledTimeFunc="@(date => date?.Hour == 12)"
                  @bind-Value="@SelectedValue" />
```

### RenderStyle

- `FluentUI` (default): Styled dropdown with predefined times, supports `StartHour`, `EndHour`, `Increment`, `DisabledTimeFunc`
- `Native`: Uses `<input type="time">`, ideal for mobile. Ignores `Culture`, `StartHour`, `EndHour`, `Increment`, `DisabledTimeFunc`

> [!NOTE] The clock icon in native mode is part of the browser's internal implementation and is generally not affected by CSS styling, including dark mode.

### Value Types

```razor
<FluentTimePicker Label="DateTime?" @bind-Value="@NullableDateTime" />
<FluentTimePicker Label="DateTime" @bind-Value="@DateTime" />
<FluentTimePicker Label="TimeOnly?" @bind-Value="@NullableTimeOnly" />
<FluentTimePicker Label="TimeOnly" @bind-Value="@TimeOnly" />
```

## ToTimeAgo Extension

The `ToTimeAgo(TimeSpan delay)` extension method returns a human-readable relative time string:

- "Just now"
- "25 seconds ago"
- "14 minutes ago"
- "9 hours ago"
- "1 day ago"
- "5 days ago"
- "6 months ago"
- "2 years ago"

```csharp
var delay = TimeSpan.FromMinutes(5);
var message = delay.ToTimeAgo(); // "5 minutes ago"
```

Localization supported via optional `localizer` argument. TimeAgo resource constants are prefixed with `TimeAgo_` (e.g., `TimeAgo_YearAgo`, `TimeAgo_YearsAgo`).

## DateOnly/TimeOnly Conversion Extensions

The `Microsoft.FluentUI.AspNetCore.Components.Extensions` namespace provides helper methods for converting between `DateTime?`, `DateOnly`, and `TimeOnly`:

```razor
@using Microsoft.FluentUI.AspNetCore.Components.Extensions

<FluentDatePicker TValue="DateTime?"
                  Value="@MyDate2.ToDateTimeNullable()"
                  ValueChanged="@(e => MyDate2 = e.ToDateOnlyNullable())" />
<FluentTimePicker TValue="DateTime?"
                  Value="@MyTime2.ToDateTimeNullable()"
                  ValueChanged="@(e => MyTime2 = e.ToTimeOnlyNullable())" />
```

Available extension methods: `ToDateTime`, `ToDateTimeNullable`, `ToDateOnly`, `ToDateOnlyNullable`, `ToTimeOnly`, `ToTimeOnlyNullable`.

## Min/Max Date Bounds

The minimum selectable date is February 1, 0001. The maximum selectable date is December 31, 9999.

## API Reference

| Component | API Type |
|-----------|----------|
| FluentCalendar | `FluentCalendar<TValue>` |
| FluentDatePicker | `FluentDatePicker<TValue>` |
| FluentTimePicker | `FluentTimePicker<TValue>` |
