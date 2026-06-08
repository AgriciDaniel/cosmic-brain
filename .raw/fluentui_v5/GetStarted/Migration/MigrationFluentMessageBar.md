---
title: Migration FluentMessageBar
route: /Migration/MessageBar
hidden: true
---

### Renamed properties 🔃
  The `FadeIn` property has been renamed to `Animation`.

### Removed properties💥
  The `IconColor` property has been removed. Use `Icon.WithColor()` method instead.

  The `Intent.Custom` property has been removed. Don't use the `Intent` property and set `Icon` and `ChildContent` instead to customize the message bar.

  The `Type` property has been removed. Use the `Layout` property instead to choose the position of the actions and to display the `TimeStamp`.

### Changed properties ⚠️

  The `Title` property is a string and cannot contain markup anymore. Use the `ChildContent` property to customize the title content.
  Example: `<ChildContent><span class="title">Customized <b>title</b></span></ChildContent>`  

### New properties
- `Layout` (`MessageBarLayout?`) — controls the layout/position of actions.
- `Shape` (`MessageBarShape?`) — visual shape of the message bar.
- `AriaLive` (`AriaLive?`) — controls the ARIA live region behavior.
- `ActionsTemplate` (`RenderFragment?`) — template for action buttons.
