---
title: FluentUI Blazor Emoji
address: c-000116
status: developing
---

# FluentUI Blazor Emoji

> Part of the [[FluentUI Blazor]] component library. The `FluentEmoji` component renders emoji from the [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) collection -- over 1500 distinct emoji in color, flat, and high contrast styles with 6 skin tones, totaling 13k+ SVG assets across 9 groups.

## Overview

The `Microsoft.FluentUI.AspNetCore.Components.Emoji` NuGet package contains all emoji. During .NET publication, unused emoji are automatically trimmed. Configure this via `PublishTrimmed`.

> [!WARNING] Always use the `Value` property to specify the emoji (not the `Emoji` property) to prevent trimming:
> `<FluentEmoji Value="@(new Emojis.PeopleBody.Color.Default.Artist())" />`

### Namespace Import

For brevity, add this to your `_Imports.razor`:

```razor
@using Emojis = Microsoft.FluentUI.AspNetCore.Components.Emojis
```

## Basic Usage

```razor
<FluentStack Wrap="true">
    <FluentEmoji Value="@(new Emojis.PeopleBody.Color.Default.Artist())" />
    <FluentEmoji Value="@(new Emojis.SmileysEmotion.Color.Default.RollingOnTheFloorLaughing())" Width="50px" />
</FluentStack>
```

### Inline Markup

```razor
@(new Emojis.Objects.Color.Default.Accordion().ToMarkup("80px"))
@(new Emojis.TravelPlaces.Color.Default.Ambulance().ToMarkup())
```

## Emoji Groups

The emoji are organized into 9 groups:

| Group | Example Path |
|---|---|
| PeopleBody | `Emojis.PeopleBody.Color.Default.Artist()` |
| SmileysEmotion | `Emojis.SmileysEmotion.Color.Default.RollingOnTheFloorLaughing()` |
| Objects | `Emojis.Objects.Color.Default.Accordion()` |
| TravelPlaces | `Emojis.TravelPlaces.Color.Default.Ambulance()` |
| FoodDrink | (Food and drink emoji) |
| Activities | (Activity emoji) |
| AnimalsNature | (Animals and nature emoji) |
| Symbols | (Symbol emoji) |
| Flags | (Flag emoji) |

Each emoji follows the path structure: `{Group}.{Style}.{SkinTone}.{EmojiName}()`.

## Styles and Skin Tones

Three visual styles are available for each emoji:

- **Color** -- full color (default)
- **Flat** -- flat, monochromatic style
- **HighContrast** -- high contrast for accessibility

Where applicable, 6 skin tones are available: `Default`, `Light`, `MediumLight`, `Medium`, `MediumDark`, `Dark`.

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Value` | `Emoji` | The emoji object to render (recommended) |
| `Width` | `string?` | Emoji width; default size if not set |
| `Title` | `string?` | HTML title attribute |
| `Slot` | `string?` | Slot placement in parent components |
| `OnClick` | `EventCallback<MouseEventArgs>` | Click handler |
| `Margin` | `string?` | Margin using Fluent spacing tokens |
| `Padding` | `string?` | Padding using Fluent spacing tokens |
| `Style` | `string?` | Additional inline CSS |
| `Class` | `string?` | Additional CSS classes |
| `Id` | `string?` | HTML id attribute |
| `Data` | `object?` | Arbitrary data object |
