---
title: Tabs
route: /Tabs
icon: TabDesktop
---

# Tabs

A **FluentTabs** allows people to switch between categories of related information without going to different pages.
They’re are ideal for dividing content-heavy pages into distinct but related categories that are easier to process
and require less scrolling.
**FluentTabs** can also be used for navigation between a small set of closely related, frequently accessed pages.

For navigation beyond closely related categories, use a [FluentLink](/link) instead.
To initiate an action, use a [FluentButton](/button) instead.

> [!NOTE] For the moment, there are no 'scrolling' functions when the number of tabs is too large
> in relation to the size of the container or screen.

## Default

To know which tab is selected, you can bind the `ActiveTabId` or `ActiveTab` parameter to a variable.
Setting the `ActiveTabId` parameter to an initial value will set the selected tab when the component is first rendered.

A tab can be disabled by setting the `Disabled` parameter to `true`.

{{ TabsDefault }}

## Appearance

Multiple parameters are available to customize the appearance of the tabs.

{{ TabsVisual }}

## Customized

The header of each tab can be customized using the `HeaderTemplate` parameter.

{{ TabsCustomized }}

## Deferred

In some situations, loading and rendering the content of a tab may take a lot of time.
In these cases, you can use the `Deferred` parameter to load the content after a tab has been selected.
This can improve performance and reduce the initial load time of your application.

By default, a progress indicator is shown while the content is being loaded.
You can customize the progress indicator by using the `LoadingTemplate` parameter.

In the following example, the `Deferred` parameter is set to `true` for Tab two.
This tab will be loaded after 2 seconds of processing (to simulate a long running process).

{{ TabsDeferred }}

## Dynamic

You can add or remove tabs dynamically by using a list of tabs.
This allows for greater flexibility in managing the tab content and user interactions.

{{ TabsDynamic }}

## API FluentTabs

{{ API Type=FluentTabs }}

## API FluentTab

{{ API Type=FluentTab }}

## Migrating to v5

TODO
