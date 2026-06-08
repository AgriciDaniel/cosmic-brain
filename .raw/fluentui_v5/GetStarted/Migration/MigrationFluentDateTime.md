---
title: Migration FluentDatePicker and FluentTimePicker
route: /Migration/DateTime
hidden: true
---

- ### Generic type parameter 💥

  Both `FluentDatePicker` and `FluentTimePicker` are now generic components.

  - `FluentDatePicker<TValue>` — supports `DateTime`, `DateTime?`, `DateOnly`, `DateOnly?`
  - `FluentTimePicker<TValue>` — supports `DateTime`, `DateTime?`, `TimeOnly`, `TimeOnly?`

  ```xml
  <!-- V4 -->
  <FluentDatePicker @bind-Value="selectedDate" />

  <!-- V5 -->
  <FluentDatePicker TValue="DateTime?" @bind-Value="selectedDate" />
  <FluentDatePicker TValue="DateOnly?" @bind-Value="selectedDateOnly" />
  ```

- ### FluentDatePicker changes

  #### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Appearance` (`FluentInputAppearance`) | `Appearance` (`TextInputAppearance`) | Enum type renamed |
  | `DaysTemplate` (`RenderFragment<FluentCalendarDay>?`) | `DaysTemplate` (`RenderFragment<FluentCalendarDay<TValue>>?`) | Now generic |
  | `PickerMonthChanged` (`EventCallback<DateTime>`) | `PickerMonthChanged` (`EventCallback<TValue>`) | Now generic |
  | `DoubleClickToDate` (`DateTime?`) | `DoubleClickToDate` (`TValue?`) | Now generic |
  | `DayFormat` (`DayFormat?` enum) | `DayFormat` (`CalendarDayFormat?` enum) | Enum renamed |

  #### Removed properties 💥
  - `PopupHorizontalPosition` — the popover now uses `FluentPopover` for positioning.
  - `ParsingErrorMessage` — handled by the localization system.

- ### FluentTimePicker changes

  #### Completely new UX 💥

  The time picker has been fully redesigned. V4 used a native HTML `<input type="time">`.
  V5 uses a `FluentCombobox` with a dropdown list of time slots.

  #### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Appearance` (`FluentInputAppearance`) | `Appearance` (`ListAppearance`) | Enum type changed |

  #### Removed properties 💥
  - `TimeDisplay` (`TimeDisplay` enum) — no longer applicable with the new combobox UX.

  #### Migration example

  ```xml
  <!-- V4 -->
  <FluentTimePicker @bind-Value="selectedTime" TimeDisplay="TimeDisplay.HourMinute" />

  <!-- V5 -->
  <FluentTimePicker TValue="DateTime?" @bind-Value="selectedTime"
                    StartHour="8" EndHour="18" Increment="15" />
  ```
