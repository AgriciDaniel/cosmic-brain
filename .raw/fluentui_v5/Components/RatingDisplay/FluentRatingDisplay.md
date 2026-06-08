---
title: RatingDisplay
route: /rating-display
icon: Star
---

# Rating display

**RatingDisplay** is used to communicate user sentiment.
By default, it shows rating as filled stars out of 5, as well as a text displaying the average value and the aggregate number of ratings.

{{ DisplayRatingDefault }}

## Best practices

**Do**
- Always display the value of the `FluentRatingDisplay`.
- Display the total number of ratings if known.
- Use the `FluentRatingDisplay` to represent only one thing.

**Don't**
- Display an empty `FluentRatingDisplay`.
- Display a `FluentRatingDisplay` with no value.

## Value

The `Value` controls the number of filled stars, and is written out next to the `FluentRatingDisplay`.

The number of filled stars is rounded to the nearest half-star.

{{ DisplayRatingValue }}

## Count

The component can display the total number of ratings being displayed with the `Count`.

> The number will be formatted with a thousands separator according to the user's locale.

{{ DisplayRatingCount }}

## Compact

You can enable a compact view of the `FluentRatingDisplay` using the `Compact` parameter.

{{ DisplayRatingCompact }}

## Max

You can specify the maximum number of elements in the `FluentRatingDisplay` with the `Max` parameter.

{{ DisplayRatingMax }}

## Shape

You can provide a custom icon to the `FluentRatingDisplay` component using the `Shape` parameter.

{{ DisplayRatingShape }}

## Appearances

You can customize the appearance of the `FluentRatingDisplay` using the `Color` and `Size` parameters.

{{ DisplayRatingAppearance }}

## API FluentRatingDisplay

{{ API Type=FluentRatingDisplay}}
