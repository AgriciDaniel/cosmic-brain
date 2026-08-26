---
title: Migration FluentButton
route: /Migration/Button
hidden: true
---

### Renamed parameters 💥

- `Autofocus` → `AutoFocus` (also changed from `bool?` to `bool`)
- `Action` → `FormAction`
- `Enctype` → `FormEncType`
- `Method` → `FormMethod`
- `NoValidate` → `FormNoValidate`
- `Target` → `FormTarget`

### Appearance 💥

The `Appearance` parameter has been updated to use the `ButtonAppearance` enum
instead of the `Appearance` enum.

`ButtonAppearance` enum has the following values:
- `Default`
- `Outline`
- `Primary`
- `Subtle`
- `Transparent`

### New parameters

- `Shape` (`ButtonShape?`) — controls the button shape (rounded, circular, square).
- `Size` (`ButtonSize?`) — controls the button size.
- `DisabledFocusable` (`bool`) — disables the button but keeps it focusable for accessibility.
- `IconOnly` (`bool`) — renders the button in icon-only mode.
- `Label` (`string?`) — accessible label for the button.
- `Tooltip` (`string?`) — tooltip text shown on hover.

### Migrating to v5

You can use the `ToButtonAppearance()` method to convert the `Appearance` parameter to the `ButtonAppearance` enum.
```csharp
@using Microsoft.FluentUI.AspNetCore.Components.Migration

<FluentButton Appearance="Appearance.Accent.ToButtonAppearance()">Click</FluentButton>
//                                          ^^^^^^^^^^^^^^^^^^^^
```

| v3 & v4 | v5 |
|---|---|
| `Appearance.Neutral` | `ButtonAppearance.Default` |
| `Appearance.Accent` | `ButtonAppearance.Primary` |
| `Appearance.Lightweight` | `ButtonAppearance.Transparent` |
| `Appearance.Outline` | `ButtonAppearance.Outline` |
| `Appearance.Stealth` | `ButtonAppearance.Subtle` |
| `Appearance.Hypertext` | `ButtonAppearance.Default` |
| `Appearance.Filled` | `ButtonAppearance.Default` |
