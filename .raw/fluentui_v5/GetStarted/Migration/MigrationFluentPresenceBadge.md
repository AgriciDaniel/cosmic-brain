---
title: Migration FluentPresenceBadge
route: /Migration/PresenceBadge
hidden: true
---

- ### Component redesigned — breaking changes ⚠️

  `FluentPresenceBadge` still exists in V5 but has been significantly reworked.
  It moved from `Components/PresenceBadge/` to `Components/Badge/`.

- ### V4 → V5 parameter mapping

  | V4 Parameter | V5 Parameter | Change |
  |-------------|-------------|--------|
  | `Title` (`string?`) | — | **Removed** |
  | `StatusTitle` (`string?`) | — | **Removed** — localized aria-label is auto-generated |
  | `Size` (`PresenceBadgeSize`, default `Small`) | `Size` (`BadgeSize?`, default `null`) | Enum changed: `PresenceBadgeSize` → `BadgeSize?` |
  | `Status` (`PresenceStatus?`) | `Status` (`PresenceStatus?`) | Same — but V5 adds `Blocked` value |
  | `OutOfOffice` (`bool`) | `OutOfOffice` (`bool`) | Same |
  | `ChildContent` (`RenderFragment?`) | `ChildContent` (`RenderFragment?`) | Same |

- ### Size enum mapping

  | V4 `PresenceBadgeSize` | V5 `BadgeSize` |
  |------------------------|----------------|
  | `PresenceBadgeSize.Tiny` | `BadgeSize.Tiny` |
  | `PresenceBadgeSize.ExtraSmall` | `BadgeSize.ExtraSmall` |
  | `PresenceBadgeSize.Small` | `BadgeSize.Small` |
  | `PresenceBadgeSize.Medium` | `BadgeSize.Medium` |
  | `PresenceBadgeSize.Large` | `BadgeSize.Large` |
  | `PresenceBadgeSize.ExtraLarge` | `BadgeSize.ExtraLarge` |

- ### Migration example

  ```xml
  <!-- V4 -->
  <FluentPresenceBadge Status="PresenceStatus.Available"
                       Size="PresenceBadgeSize.Small"
                       Title="Available"
                       StatusTitle="User is available">
      <FluentPersona Name="Jane" />
  </FluentPresenceBadge>

  <!-- V5 -->
  <FluentAvatar Name="Jane">
      <FluentPresenceBadge Status="PresenceStatus.Available" Siwe="BadgeSize.Small" slot="FluentSlot.Badge" />
  </FluentAvatar>
  ```

- ### New properties

  - `Icon` (`Icon?`) — custom icon override.
  - `Positioning` (`Positioning?`) — controls badge positioning relative to child content.
