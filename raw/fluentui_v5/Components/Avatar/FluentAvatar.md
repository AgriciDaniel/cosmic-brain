---
title: Avatar
route: /Avatar
icon: Person
---

# Avatar

The `Avatar` component is used to represent a user or entity. It can display an image, initials, or an icon.

The component is a wrapper for the <fluentui-avatar/> web component.

View the [Usage Guidance](https://fluent2.microsoft.design/components/web/react/avatar/usage).

## Appearance

The Avatar component can be displayed in various predefined sizes (from 16px to 128px). It can be circular or square and filled with a color chosen by the component (`colorful`) or by the developer from a list of 32 colors adapted to the theme of the application.

> If you want to specify your own colors (this is not recommended), you can use the CSS styles: `color: white; background-color: red;`.

{{ FluentAvatarExample }}

### Activity state

By default, without any value of the `Active` property, the `FluentAvatar` component is displayed normally.

You can set the `Active` property to `true`, the avatar will be decorated according to `ActiveAppearance` property.
The `ActiveAppearance` property allows you to choose how to render this state: `Ring` (default), `Shadow` or both.

The value can be set to `false`, the `FluentAvatar` will be displayed as inactive. The component will be reduced in size and partially transparent

{{ FluentAvatarActive }}

### Colorful

You can set the value `AvatarColor.Colorful` to the parameter `Color` to display a colorful background for the `Avatar` .
It picks a color from a set of pre-defined colors, based on a hash of the `Name`.

{{ FluentAvatarColorful }}

## Contents

By default, the `Avatar` component will display an icon.

{{ FluentAvatarDefault }}

### Name and initials

You can provide a `Name` parameter to display initials. The `Name` parameter will be used to generate the initials displayed in the `FluentAvatar`.

You can override the initials calculated by providing an `Initials` property.

{{ FluentAvatarName }}

### Image

You can provide an `image` URL in the `Image` attribute, to display an image in the `FluentAvatar`.

Optional: you can set the `Name` property to alternative text for the image.

{{ FluentAvatarImage }}

### Content overriding

The displayed content is following a priority order: `Image`, `Initials`, `Name`, `Icon`.

> Best practice: when you provide an `Image` prop, you should also provide an `Initials` parameter to display the initials in case the image is not available or is loading.

### Default icon

You can provide an `Icon` to replace the default icon in the `FluentAvatar` when the `Initials`, `Image` or `Name` is not provided.

{{ FluentAvatarIcon }}

## API FluentAvatar

{{ API Type=FluentAvatar }}
