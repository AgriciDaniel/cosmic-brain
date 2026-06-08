---
title: MenuButton
route: /Buttons/MenuButton
---

# MenuButton

A menu button is a button with a chevron icon after the text typically used to trigger a menu.

All practices for the `FluentButton` apply to the `FluentMenuButton` as well.


## Appearance

When a MenuButton is placed inside a `FluentMenu` component, it will automatically be used as the
trigger to open/close the menu. See the code tab below.


{{ MenuButtonDefault }}


## Icons

You can add icons to a button to help identify the action it triggers.  To do this, you can use an
`IconStart` or `IconEnd` property to add an icon to the beginning or end of the button text.

<!--For a MenuButton, the `IconEnd` by default uses a chevron down icon. By supplying your own value, this can be overruled.-->

When using `IconStart` <!--or `IconEnd` -->without supplying any content, the button will be displayed in a smaller form.
By setting the `IconOnly` parameter to true, you can use an icon as the button's content but still have it display in an even smaller form. 

By putting an icon in the content, it is possible to specify a `Color` for the icon.

{{ MenuButtonIcon }}

## Shape

Menu buttons can be square, rounded, or circular.

{{ MenuButtonShapes }}

## Size
As can be seen below, using just an icon without any text does not render correctly. This should get fixed in a future release of the web components.

{{ MenuButtonSizes }}

## Disabled
{{ MenuButtonDisabled }}

## With long text
{{ MenuButtonLongText }}

## API FluentButton

{{ API Type=FluentMenuButton }}

