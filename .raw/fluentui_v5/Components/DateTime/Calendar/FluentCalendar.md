---
title: Calendar
order: 0001
route: /DateTime/Calendar
---

# Calendar

The calendar control lets people select and view a single date or a range of dates in their calendar.
It's made up of 3 separate views: the "day" view, "month" view, and "year" view.

## Views

The calendar can be displayed in different views: day, month, and year.  
The user can switch between these views using the title item: the month name or the year number.

{{ CalendarDefault }}

## Selections

You can activate the selection mode by setting the `SelectMode` parameter
to `CalendarSelectMode.Single`, `CalendarSelectMode.Range` or `CalendarSelectMode.Multiple`.

In these example, the `DisplayToday` parameter is set to `false` to hide the "Today" button.
This simplifies the example by focusing on the selection functionality.

When the `SelectMode` is set to `Range`, the user can select a range of dates by clicking on the start and end dates.
In this mode, you can also set the `SelectDatesHover` parameter to a method that will be called when the user hovers over a date in the calendar.
For example, you can use this method to highlight and select the dates of an entire week with a single click.

{{ CalendarSelection }}

## Customization

You can customize the calendar by providing a custom template for the day cells.
In this example, we use a custom template to display the days 5 and 15 in a different color.  
And we also add a `DisabledDate` function to disable the 3th, 10th and 20th of the month.

{{ CalendarDayCustomized }}

## Culture

You can set the culture of the calendar to display the month and day names in different languages.
Use the `Culture` parameter to set the culture.

Example: `Culture="@(new CultureInfo("fr"))"` will display the calendar in French.

{{ CalendarCulture }}

## Min and Max

You can set a minimum and maximum date for the calendar using the `MinDate` and `MaxDate` parameters.

{{ CalendarMinMax }}

## Value type

The **FluentCalendar** and **FluentDatePicker** components are a generic components, so you can use it with date types such as `DateTime?`, `DateTime`, `DateOnly?` or `DateOnly`.  
Blazor will automatically infer the type based on the value you provide to the `Value` or `SelectedDates` parameters.  
You can also explicitly set the type using the generic type parameter: `TValue` (i.e. `TValue="DateOnly?"`).

{{ CalendarTypes }}

## API FluentCalendar

{{ API Type=FluentCalendar<DateTime> }}
