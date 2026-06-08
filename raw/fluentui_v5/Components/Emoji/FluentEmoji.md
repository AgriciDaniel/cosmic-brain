---
title: Emoji
route: /Emoji
icon: EmojiSmileSlight
---

# Emoji

## Overview

The [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) are a (still growing) collection of familiar,
friendly, and modern emoji from Microsoft. At the moment there are over 1500 distinct emoji
available in color, flat and high contrast styles and 6 different skintones (where applicable)
divided in 9 groups. In total the
collections consists of well over 13k emoji in SVG format.

This [FluentUI Emoji NuGet package](https://www.nuget.org/packages/Microsoft.FluentUI.AspNetCore.Components.Emoji)
contains all these emoji, which you can access directly in your projects.
To use them, simply reference this package in your project.

During the **DotNet Publication process**, the unused emojis are automatically removed from the final library.
You can configure this behavior by setting the `PublishTrimmed` property in your project file.

More details on [this page](https://learn.microsoft.com/aspnet/core/blazor/host-and-deploy/configure-trimmer).

> [!WARNING] We recommend always using the `Value` property to specify the emoji to be rendered (and not the `Emoji` property).
> This ensures that the emoji is referenced by your project and will not deleted from the final library.
> 
> `<FluentEmoji Value="@(new Emojis.PeopleBody.Color.Default.Artist())" />`

To simplify your code, in your `_Imports.razor` file, include this line. 

```razor
@using Emojis = Microsoft.FluentUI.AspNetCore.Components.Emojis
```

## FluentEmoji

You can use any of these emojis by levaraging the `<FluentEmoji` component. See below for the parameters and examples. 

There is also a search capability available on this page wich allows you to browse to all the different emojis.

{{ EmojiDefault }}

## Explore Emojis

Use the **Emoji Explorer** below to search any emoji by name.

Click on an emoji card to copy a ready-to-paste `<FluentEmoji>` component declaration to the clipboard.
**Right-click** the card to open a menu with more copy options.

{{ EmojiExplorer SourceCode=false }}

## API FluentEmoji

<!-- The DocViewer tag cannot be used because FluentEmoji requires an Emoji object, which is not supported by DocViewer -->

Main `FluentEmoji` parameters:

- `AdditionalAttributes`: Captures any additional HTML attributes that are not matched by a defined parameter and forwards them to the underlying element.
- `Class`: Gets or sets the additional CSS class(es) applied to the component.
- `Data`: Gets or sets an arbitrary data object associated with the component.
- `Id`: Gets or sets the unique identifier (HTML `id` attribute) of the component.
- `Margin`: Gets or sets the margin spacing applied to the component (using the Fluent spacing tokens).
- `OnClick`: Event callback raised when the emoji is clicked. Provides a `MouseEventArgs`.
- `Padding`: Gets or sets the padding spacing applied to the component (using the Fluent spacing tokens).
- `Slot`: Gets or sets the slot where the emoji is displayed in (for example `FluentSlot.Start` or `FluentSlot.End` inside a `FluentButton`).
- `Style`: Gets or sets the additional inline CSS style applied to the component.
- `Title`: Gets or sets the title (HTML `title` attribute) for the emoji.
- `Value`: Gets or sets the `Emoji` object to render. This is the recommended way to specify the emoji.
- `Width`: Gets or sets the emoji width. If not set, the emoji's default size is used.


