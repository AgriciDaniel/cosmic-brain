---
title: MessageBar
route: /MessageBar
icon: WindowHeaderHorizontal
---

# MessageBar

Communicates important information about the state of the entire application or surface.
For example, the status of a page, panel, dialog or card.
The information shouldn't require someone to take immediate action, but should persist until
the user performs one of the required actions.

## Appearance

**FluentMessageBar** components come built-in with preset intents that determine the design and aria live announcement.

{{ MessageBarAppearance }}

You can also use the `Shape` parameter to change the shape of the corners of the message bar: square or rounded.

## Actions

The **FluentMessageBar** can have links and different actions.

Add your buttons actions using the `ActionsTemplate` parameter.
To keep a coherent design, use the `FluentButton` component with the `Size` parameter set to `ButtonSize.Small`.

{{ MessageBarActions }}

## Layout

The `Layout` parameter allows you to choose the position of the actions:
  - **SingleLine**: Next to the message content, allowing for a compact layout.
  - **MultiLine**: On a new line, allowing for more space for the message content.
  - **Notification**: The title, message, and actions are displayed on separate lines, providing a clear and structured layout.

When no action is defined, you can set the `TimeStamp` parameter to display the time when the message was created.
This parameter is ignored if at least one action is defined.
If you want to display an Action and a TimeStamp, you can use the `ActionsTemplate` parameter and customize the content.

{{ MessageBarLayouts }}

## Message Service

TODO in the next PR.

> [!WARNING] `FluentMessageBars` are rendered by the `<FluentProviders />`.  
> This component needs to be added to the layout of your application.
> See the [Installation page](/installation) for more information.

## API FluentMessageBar

{{ API Type=FluentMessageBar }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentMessageBar }}
