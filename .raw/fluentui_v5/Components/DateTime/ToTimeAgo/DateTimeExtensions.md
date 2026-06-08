---
title: Extensions
order: 0004
route: /DateTime/Extensions
---

# DateTime Extensions

## ToTimeAgo()

An extension method `ToTimeAgo(TimeSpan delay)` returns a string with one of these samples, depending of the delay.

 - Just now
 - 25 seconds ago
 - 14 minutes ago
 - 9 hours ago
 - 1 day ago
 - 5 days ago
 - 6 months ago
 - 2 years ago

Example

```csharp
var delay = TimeSpan.FromMinutes(5);

// 5 minutes ago
var message = delay.ToTimeAgo();
```

> [!NOTE] You can localize these strings using an optional `localizer` argument.
> By default, English is used.
> See the [Localization](/localization) page to create your custom localizer.
> **TimeAgo** resource constants are prefixed with `TimeAgo_` and are provided for both singular and plural phrases.
> Example: `Localization.LanguageResource.TimeAgo_YearAgo` and `Localization.LanguageResource.TimeAgo_YearsAgo`.

## DateOnly, TimeOnly bindings

In some situations, you may want to use a `DatePicker.Value` parameter of type `DateTime?`,
but you only have data of type `DateOnly` or `TimeOnly`.
In this case, you can use the `ToDateTime`, `ToDateTimeNullable`, `ToDateOnly`, `ToDateOnlyNullable`,
`ToTimeOnly` or `ToTimeOnlyNullable` extension methods.

Example

{{ TimePickerToDateOnly }}
