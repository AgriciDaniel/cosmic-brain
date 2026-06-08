---
title: TimePicker
order: 0003
route: /DateTime/TimePicker
---

# TimePicker

**FluentTimePicker** offers a control that's optimized for selecting a time from a
drop-down list or using free-form input to select a predefined time.
If the user inputs an invalid time, the field's content will be deleted when it losses focus.

You can use the `Culture` parameter to display the time in different format patterns;
and to set the time format displayed in the input field.

**Important**

By default, **FluentTimePicker** displays a list of **predefined** times, ranging from `StartHour` 8:00 a.m. to `EndHour` 6:00 p.m. in 15-minute `Increment`.
You can customize these parameters to fit your requirements.  
If you want the user to be able **to enter any time** (any hour or any minute), you must enable the mode `RenderStyle="Native"`.

## Default

The TimePicker allows users to select a time value: `<FluentTimePicker @bind-Value="@SelectedValue" />`

{{ TimePickerDefault }}

When you bind a DateTime value to the TimePicker, the date part is ignored in the input field.
But the date part is preserved in the bound value.
For nullable DateTime (`DateTime?`), the value will be deleted when the user clears the input field
by using `Delete` key.

## Culture

You can set the culture of the TimePicker to display the hours and minutes in different
formats. Use the `Culture` parameter to set the desired time format.
We are using the `Culture.DateTimeFormat.ShortTimePattern` property to display the time with the correct pattern (e.g. `HH:mm`).

Example: `Culture="@(new CultureInfo("fr"))"` will display the time in French (`HH:mm`).

{{ TimePickerCulture }}

## RenderStyle

The TimePicker can be rendered in different modes: `FluentUI`, `Native`.

The `FluentUI` rendering style uses the Fluent UI styles and components.
This mode provides a consistent look and feel with other Fluent UI components.
This mode provides all the features of the component.

The `Native` rendering style uses the default browser styles.
This mode is useful when you want to use a very simple TimePicker with a **mobile device**.
In this case, the mobile picker will be used. This could be useful to use the native Android or iOS date picker.

> [!WARNING] This mode is very limited in features and does not support the UI customization.
> The following parameters are ignored: `Culture`, `StartHour`, `EndHour`, `Increment`,`DisabledTimeFunc`.

{{ TimePickerRendering }}

[!NOTE] Active HTML form controls like `<input type="time">` have limited styling capabilities.
The **clock icon** is part of the browser's internal implementation and is generally not affected by CSS styling, including **dark mode** styles.

## Value type

The **FluentTimePicker** component is a generic component, so you can use it with date types such as `DateTime?`, `DateTime`, `TimeOnly?` or `TimeOnly`.
Blazor will automatically infer the type based on the value you provide to the `Value` parameters.
You can also explicitly set the type using the generic type parameter: `TValue` (i.e. `TValue="TimeOnly?"`).

{{ TimePickerTypes }}

## API FluentTimePicker

{{ API Type=FluentTimePicker<DateTime> }}

> [!NOTE] The `Width` parameter is not yet developed.
