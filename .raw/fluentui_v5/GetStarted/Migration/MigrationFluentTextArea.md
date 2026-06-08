---
title: Migration FluentTextArea
route: /Migration/TextArea
hidden: true
---

### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Appearance` (`FluentInputAppearance`) | `Appearance` (`TextAreaAppearance?`) | Enum renamed |

### Removed properties💥

- `Cols` — use `Width` instead.
- `Rows` — use `Height` instead.
- `Form` (`string?`)
- `DataList` (`string?`)

### New properties
- `Placeholder` (`string?`)
- `AutoComplete` (`string?`)
- `AutoResize` (`bool?`) — automatically adjusts height to content.
- `Size` (`TextAreaSize?`)
- `Width` (`string?`)
- `Height` (`string?`)
- `Tooltip` (`string?`)
- `ChangeAfterKeyPress` (`KeyPress[]?`) — triggers value change after specific key presses.
- `OnChangeAfterKeyPress` (`EventCallback<FluentKeyPressEventArgs>`)
