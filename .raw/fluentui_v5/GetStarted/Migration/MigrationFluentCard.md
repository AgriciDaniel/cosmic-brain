---
title: Migration FluentCard
route: /Migration/Card
hidden: true
---

### Removed parameters 💥

- `AreaRestricted` — no longer applicable since the web component has been removed.
- `MinimalStyle` — use the `Appearance` parameter instead to control the visual style.

### New parameters

- `Appearance` (`CardAppearance?`) — controls the visual style of the card (replaces `MinimalStyle`).
- `Shadow` (`CardShadow?`) — controls the shadow effect on the card.
- `OnClick` (`EventCallback<MouseEventArgs>`) — click event handler for the card.
- `Role` (`string`) — ARIA role attribute for the card element.

### Migration example

```xml
<!-- V4 -->
<FluentCard AreaRestricted="false" MinimalStyle="true">
    Card content
</FluentCard>

<!-- V5 -->
<FluentCard Appearance="CardAppearance.Subtle">
    Card content
</FluentCard>
```
