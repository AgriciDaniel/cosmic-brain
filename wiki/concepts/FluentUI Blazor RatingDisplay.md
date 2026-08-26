---
title: FluentUI Blazor RatingDisplay
address: c-000140
status: developing
---

# FluentUI Blazor Rating Display

> Part of the [[FluentUI Blazor]] component library. `FluentRatingDisplay` communicates user sentiment through a star rating visualization.

## Overview

`FluentRatingDisplay` shows rating as filled stars (out of 5 by default), with a text display of the average value and aggregate number of ratings.

## Basic Usage

```razor
<FluentRatingDisplay Value="3.5" />
```

## Value

The `Value` controls the number of filled stars and is displayed as text next to the component. Values are rounded to the nearest half-star:

```razor
<FluentRatingDisplay Value="1" />
<FluentRatingDisplay Value="3.7" />   {{!-- Rounds to 3.5 --}}
<FluentRatingDisplay Value="3.9" />   {{!-- Rounds to 4 --}}
<FluentRatingDisplay Value="5" />
```

## Count

Display the total number of ratings. Numbers are formatted with the user's locale thousands separator:

```razor
<FluentRatingDisplay Value="3.5" Count="125644" />
```

## Compact Mode

Renders a more compact version without the textual value and count:

```razor
<FluentRatingDisplay Value="3.5" Compact="true" />
```

## Maximum Stars

Change the number of elements displayed:

```razor
<FluentRatingDisplay Value="3.5" Max="10" />
```

## Custom Shape

Replace the star icon with any custom icon:

```razor
<FluentRatingDisplay Value="3.5" Shape="@(new Icons.Filled.Size16.Circle())" />
```

## Appearance Customization

Control size and color:

```razor
<FluentRatingDisplay Size="@size" Color="@color" Value="3.7" />
```

| Parameter | Values |
|---|---|
| `Size` | `Small`, `Medium` (default), `Large`, `ExtraLarge` |
| `Color` | `Neutral` (default), `Brand`, `Marigold` |

## Best Practices

- Always display the value of the rating
- Display the total number of ratings if known
- Use the component to represent only one thing
- Do **not** display an empty rating display
- Do **not** display a rating display with no value

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Value` | `double?` | Rating value (rounded to nearest 0.5) |
| `Count` | `int?` | Total number of ratings |
| `Compact` | `bool` | Enable compact display |
| `Max` | `int` | Maximum number of stars (default 5) |
| `Shape` | `Icon?` | Custom icon replacing the default star |
| `Size` | `RatingSize?` | Size preset |
| `Color` | `RatingDisplayColor?` | Color preset |
