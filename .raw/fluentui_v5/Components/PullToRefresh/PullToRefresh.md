---
title: PullToRefresh
route: /PullToRefresh
icon: ArrowSync
---

# PullToRefresh

The Pull-to-refresh is a touchscreen gesture. It involves touching the screen of a computing device with a finger or pressing a button on a pointing device, dragging the screen (downward or upward, depending on the parameters), and then releasing it. This action signals the application to refresh the contents of the component. Its purpose is to make refreshing immediately accessible and to save valuable screen space that would otherwise be occupied by a refresh button.

These features are mainly used on mobile devices. To maintain compatibility with the majority of desktop browsers, an emulator script is included and loaded automatically by the component.

## Default

{{ PullToRefreshDefault }}

## Pull down

With the default settings, the component uses icons for starting and update 'tips'. These can be replaced by using the <code>...Template</code> parameters.
In this example we are using plain text templates. Also the inital tip template is hidden until a pull to refresh action is actually started and hidden once an update is finshed.
The timeout of the update message can be changed.

{{ PullToRefreshDown }}

## Pull up

This demo has a height set for the 'pull up tip'. Also, the distance the tip has to be pulled has been increased.

Instead of using a progress ring, this one shows a progress bar. The maximum number of
items that can be shown is set to 100, so the number of 'pull up's' is limited to 4.

{{ PullToRefreshUp }}

## API

{{ API Type=FluentPullToRefresh }}

