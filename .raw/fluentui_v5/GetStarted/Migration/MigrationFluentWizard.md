---
title: Migration FluentWizard
route: /Migration/Wizard
hidden: true
---

- ### Component re-introduced

  `FluentWizard` and `FluentWizardStep` have been **re-introduced** in V5.
  The component preserves the same API and functionality from V4 with the following changes.

- ### Breaking changes 💥

  | V4 | V5 |
  |----|-----|
  | `Appearance.Neutral` (in ButtonTemplate) | `ButtonAppearance.Default` |
  | `Appearance.Accent` (in ButtonTemplate) | `ButtonAppearance.Primary` |
  | `FluentLabel Typo="Typography.Body"` | `FluentLabel` (no `Typo` parameter; use `Size` / `Weight`) |
  | `FluentLabel Typo="Typography.Header"` | `FluentLabel Weight="LabelWeight.Bold"` |
  | `Icons.*.Size24.*` (icon defaults) | `CoreIcons.*.Size20.*` |
  | `FluentTextField` | `FluentTextInput` |
  | `FluentEditForm` | `EditForm` (standard Blazor) |

- ### Icon defaults changed

  The default icons for wizard steps now use **Size20** instead of Size24:
  - `IconPrevious` = `CoreIcons.Filled.Size20.CheckmarkCircle()`
  - `IconCurrent` = `CoreIcons.Filled.Size20.Circle()`
  - `IconNext` = `CoreIcons.Regular.Size20.Circle()`

- ### Re-introduced enums
  - `WizardBorder`
  - `WizardStepSequence`
  - `WizardStepStatus`
  - `StepperPosition`
