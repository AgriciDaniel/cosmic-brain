---
type: concept
title: "FluentUI Blazor Badge"
address: c-000005
created: 2026-05-23
updated: 2026-05-23
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - ui
  - accessibility
related:
  - "[[FluentUI Blazor]]"
  - "[[fluent-ui-blazor-badge-components]]"
---

# FluentUI Blazor Badge

Badge components in FluentUI Blazor are visual indicators that communicate status or descriptions for an associated component. They use short text, color, and icons for quick recognition and are positioned near relevant content.

## Component Types

| Component | Use case | Content type |
|-----------|----------|--------------|
| `FluentBadge` | General labeling | Text and/or icon |
| `FluentCounterBadge` | Unread counts, quantities | Numerical values |
| `FluentPresenceBadge` | User presence status | Status indicator |

## Positioning

Badges "wrap" a parent component (e.g., `FluentButton`) and can attach at **9 possible positions** around the target.

```xml
<FluentBadge Content="New">
    <AnchorContent>
        <FluentButton>Inbox</FluentButton>
    </AnchorContent>
</FluentBadge>
```

## Accessibility

> [!key-insight] Badges are not focusable
> Badges do not receive keyboard focus. They are not directly accessible to screen readers as standalone elements. Screen readers treat badge content as inline text of the parent control.

### Rules

1. **Icon badges** must have `aria-label` unless the icon is purely decorative:
   ```xml
   <FluentBadge IconLabel="paste" />
   ```

2. **Ambiguous badge text** requires an explicit label on the parent:
   ```xml
   <FluentBadge Content="6">
       <AnchorContent>
           <FluentButton aria-label="Inbox, 6 new messages">Inbox</FluentButton>
       </AnchorContent>
   </FluentBadge>
   ```

3. **Color alone** must not convey meaning. Always pair color with text or a parent label.

## Best Practices

- Keep badge text short: a number, a word, a status abbreviation.
- Long text is not supported and should not be used.
- Badge information should be surfaced in the associated control's label or a tooltip for screen reader users.

## Source

[[fluent-ui-blazor-badge-components]] (FluentUI Blazor v5.0.0-RC.3)
