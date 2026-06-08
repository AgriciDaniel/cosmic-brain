---
title: Icon
route: /Icon
icon: Icons
---

# Icon

The [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) are a (still growing) collection of familiar,
friendly and modern icons from Microsoft. At the moment there are more than 2200 distinct icons available in both filled
and outlined versions and in various sizes. In total the collections consists of well over 11k icons in SVG format.

This [FluentUI Icons NuGet package](https://www.nuget.org/packages/Microsoft.FluentUI.AspNetCore.Components.Icons) contains all these icons,
which you can access directly in your projects. To use them, simply reference this package in your project.

During the **DotNet Publication process**, the unused icons are automatically removed from the final library.
You can configure this behavior by setting the `PublishTrimmed` property in your project file.

More details on [this page](https://learn.microsoft.com/aspnet/core/blazor/host-and-deploy/configure-trimmer).

> [!WARNING] We recommend always using the `Value` property to specify the icon to be rendered (and not the `Icon` property).
> This ensures that the icon is referenced by your project and will not deleted from the final library.
>
> `<FluentIcon Value="@(new Icons.Regular.Size24.Bookmark())" />`

## FluentIcon

You can use any of these icons by using the `<FluentIcon>` component. See below for the parameters and examples.

There is also a search capability available on this page wich allows you to browse to all the different icons. At the moment the icons
displayed in this explorer below are always using the default blue accent color. When using the icons in your application, they will render
in the color set with the `Color` parameter.

## Explore Icons

Use the **Icon Explorer** below to search any icon by name. Type a keyword in the search box to filter the list,
then adjust the variant (Filled/Regular), size and color to find the exact icon you need.

Click on an icon card to copy a ready-to-paste `<FluentIcon>` component declaration to the clipboard.
**Right-click** the card to open a menu with more copy options.

{{ IconExplorer SourceCode=false }}

## Overview

A lot of the web components have named **slots** that declare locations in which content can be rendered.
`FluentIcon` leverages this capability through its `Slot` parameter. With this you can for
example render the icon **in front** (`Slot="@FluentSlot.Start"`) or **after** (`Slot="@FluentSlot.End"`) a label in a `FluentButton` component.

{{ IconDefault }}

## Color options

Icons can be drawn and filled with a color through the `Color` parameter which takes a `Color` enumeration value.

```xml
<FluentIcon Value="@(new Icons.Filled.Size48.Alert())" Color="<···>" />
<FluentIcon Value="@(new Icons.Filled.Size48.Alert().WithColor(<···>)" />
```

With the code above you can use the following options at the `<···>`:

{{ IconColorTable SourceCode=false }}

With `Color.Custom`, supply your own color value through the `CustomColor` parameter. <br/>
Needs to be formatted as an HTML hex color string (`#rrggbb` or `#rgb`) or a CSS variable (`var(--...)`).

> The default color is [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword),
> which means that the icon will inherit the color from its parent element.

## Customization

You can create your own icons by adding a class like this one:

```csharp
public static class MyIcons
{
    public class SettingsEmail : Icon { public SettingsEmail() : base("SettingsEmail", IconVariant.Regular, IconSize.Size20, "<svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.6251 2.5H4.37508L4.2214 2.50428C2.79712 2.58396 1.66675 3.76414 1.66675 5.20833V13.125L1.67103 13.2787C1.75071 14.7029 2.93089 15.8333 4.37508 15.8333H9.76425C9.91725 15.4818 10.1354 15.1606 10.4087 14.8873L10.7126 14.5833H4.37508L4.25547 14.5785C3.50601 14.5177 2.91675 13.8902 2.91675 13.125V6.97833L9.709 10.5531L9.78908 10.5883C9.95267 10.647 10.135 10.6353 10.2912 10.5531L17.0834 6.9775V9.17258C17.5072 9.14483 17.9362 9.21517 18.3334 9.38358V5.20833L18.3292 5.05465C18.2494 3.63038 17.0693 2.5 15.6251 2.5ZM4.37508 3.75H15.6251L15.7447 3.75483C16.4942 3.81568 17.0834 4.44319 17.0834 5.20833V5.565L10.0001 9.29375L2.91675 5.56583V5.20833L2.92158 5.08873C2.98242 4.33926 3.60994 3.75 4.37508 3.75ZM15.9167 10.5579L10.9979 15.4766C10.7112 15.7633 10.5077 16.1227 10.4093 16.5162L10.0279 18.0418C9.86208 18.7052 10.4631 19.3062 11.1265 19.1403L12.6521 18.7588C13.0455 18.6605 13.4048 18.4571 13.6917 18.1703L18.6103 13.2516C19.3542 12.5078 19.3542 11.3018 18.6103 10.5579C17.8665 9.814 16.6605 9.814 15.9167 10.5579Z\" fill=\"#212121\" /></svg>") { } }
}
```

If the size of your customized icon (Viewbox) is not one of the standard IconSize sizes, you can use a `IconSize.Custom` size.

Setting `Width=""` (an empty string) makes the icon 100% width of the enclosing container and stylable from CSS.
By omitting this attribute or assigning to `null`, for example via `Width="@null"`, the default icon size will be used.

```csharp
public class MyCircle : Microsoft.FluentUI.AspNetCore.Components.Icon
{
    private const string SVG_CONTENT = "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'><circle cx='160' cy='160' r='140'/></svg>";

    public MyCircle() : base("MyCircle", IconVariant.Regular, IconSize.Custom, SVG_CONTENT)
    {
        // Default Color (`fill` style)
        WithColor("#F97316");
    }
}
```

> Using the `IconSize.Custom` size, certain restrictions will apply: `FluentButton.Loading` or `Icon.ToMarkup` could be affected.

## Migrating to v5

{{ INCLUDE File=MigrationColor }}

## API FluentIcon

<!-- The DocViewer tag cannot be used because FluentIcon requires an Icon object, which is not supported by DocViewer -->

Main `FluentIcon` parameters:

- `AdditionalAttributes`: Captures any additional HTML attributes that are not matched by a defined parameter and forwards them to the underlying element.
- `Class`: Gets or sets the additional CSS class(es) applied to the component.
- `Color`: Gets or sets the icon drawing and fill color. Value comes from the `Color` enumeration. Defaults to `Accent`.
- `CustomColor`: Gets or sets the icon drawing and fill color to a custom value (HTML hex color `#RRGGBB` / `#RGB` or CSS variable). Only available when `Color` is set to `Color.Custom`.
- `Data`: Gets or sets an arbitrary data object associated with the component.
- `Element`: Gets or sets the `ElementReference` of the rendered element.
- `Focusable`: Gets or sets whether the icon is focusable (adds `tabindex="0"` and `role="button"`), allowing the icon to be focused sequentially with the Tab key. Defaults to `false`.
- `Id`: Gets or sets the unique identifier (HTML `id` attribute) of the component.
- `Margin`: Gets or sets the margin spacing applied to the component (using the Fluent spacing tokens).
- `OnClick`: Event callback raised when the icon is clicked. Provides a `MouseEventArgs`.
- `OnClickStopPropagation`: Gets or sets whether the click event should stop propagation.
- `OnClickPreventDefault`: Gets or sets whether the click event should prevent the default action.
- `Padding`: Gets or sets the padding spacing applied to the component (using the Fluent spacing tokens).
- `Slot`: Gets or sets the slot where the icon is displayed in (for example `FluentSlot.Start` or `FluentSlot.End` inside a `FluentButton`).
- `Style`: Gets or sets the additional inline CSS style applied to the component.
- `Title`: Gets or sets the title (HTML `title` attribute) for the icon.
- `Tooltip`: Gets or sets the tooltip text displayed when hovering the icon.
- `Value`: Gets or sets the `Icon` object to render. This is the recommended way to specify the icon.
- `Width`: Gets or sets the icon width. If not set, the icon's default size is used. Set to an empty string to use 100% width of the enclosing container.
