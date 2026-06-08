---
title: Badge components
route: /Badges/[Default]
icon: Tag
---

# Badge components
A badge component is a visual indicator that communicates a status or description of an associated component.
It uses short text, color, and icons for quick recognition and is placed near the relevant content.

Different badges can display different content.

- `Badge` displays text and/or an icon
- `CounterBadge` displays numerical values
- `PresenceBadge` displays status 

Typically a badge 'wraps' a component, such as a `FluentButton`, to indicate a status.

There are 9 possible positions for a badge to attach to the content it wraps:

{{ BadgePositions SourceCode=false }}

## Best practices

### Badges should not receive focus
- Badge information should be surfaced as part of the control that it is associated with, because, badges themselves do not receive focus meaning they are not directly accessible by screen readers. If the combination of icon and badge communicates some meaningful information, that information should be surfaced in another way through screenreader or tooltip on the component the badge is associated with.

### Screen Readers
Badge content is exposed as text, and is treated by screen readers as if it were inline content of the control it is associated with.
This should provide a reasonable default for most badges that contain plain text, such as the `CounterBadge`.

There are two actions authors should consider taking when using Badge to improve this experience:

1. If the badge contains a custom icon, that icon must be given alternative text with aria-label, unless it is purely presentational:
   ```xml
   <FluentBadge IconLabel="paste" />
   ```

2.  If the text of the badge itself is not sufficient to convey its meaning, the parent element should be given an explicit label:
   ```xml
   <FluentBadge Content="New">
       <AnchorContent>
           <FluentButton aria-label="Inbox, 6 new messages">
               Inbox
           </FluentButton>
       </AnchorContent>
   </FluentBadge>
   ```

### Badges shouldn't rely only on color information
Include meaningful descriptions when using color to represent meaning in a badge. If relying on color only, ensure that non-visual information is included in the parent's label or description.

### Text on Badge
Badges are intended to have short text, small numerical values or status information. Long text is not supported and should not be used within a badge.

See the following pages for more information on the different badge components:
- [Badge](/Badges/Badge)
- [CounterBadge](/Badges/CounterBadge)
- [PresenceBadge](/Badges/PresenceBadge)
