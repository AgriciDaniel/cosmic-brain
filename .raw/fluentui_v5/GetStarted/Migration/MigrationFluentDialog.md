---
title: Migration FluentDialog
route: /Migration/Dialog
hidden: true
---

- ### Major rearchitecture 💥

  The dialog system has been completely redesigned in V5. This is one of the most impactful migration changes.

- ### DialogParameters → DialogOptions 💥

  V4's `DialogParameters` class is replaced by V5's `DialogOptions` with a restructured API:

  | V4 (`DialogParameters`) | V5 (`DialogOptions`) | Notes |
  |------------------------|---------------------|-------|
  | `Title` | `Header.Title` | Moved to nested `DialogOptionsHeader` |
  | `TitleTypo` | — | **Removed** |
  | `Modal` | `Modal` | Same |
  | `PreventDismissOnOverlayClick` | — | **Removed** |
  | `PreventScroll` | — | **Removed** |
  | `TrapFocus` | — | **Removed** |
  | `ShowTitle` | `Header.Title` (presence-based) | Implicit |
  | `ShowDismiss` | Via `Header` config | Restructured |
  | `PrimaryAction` / `SecondaryAction` | `Footer.PrimaryAction` / `Footer.SecondaryAction` | Now `DialogOptionsFooterAction` objects |
  | `PrimaryActionEnabled` / `SecondaryActionEnabled` | `Footer.PrimaryAction.Disabled` / `Footer.SecondaryAction.Disabled` | Restructured |
  | `Width` / `Height` | `Width` / `Height` | Same |
  | `DialogBodyStyle` | — | **Removed** |
  | `AriaLabelledby` / `AriaDescribedby` / `AriaLabel` | — | **Removed** |
  | `DialogType` | `Alignment` | `Start`/`End` = drawer, `Default` = dialog |
  | `OnDialogResult` | `OnStateChange` | Replaced |
  | `OnDialogClosing` / `OnDialogOpened` | `OnStateChange` (with `DialogState`) | Replaced |
  | `ValidateDialogAsync` | — | **Removed** |
  | — | `Size` (`DialogSize?`) | **New** |
  | — | `Margin` / `Padding` | **New** |

- ### Dialog component changes

  #### Removed properties 💥
  - `Hidden` / `HiddenChanged` — use `ShowAsync()` / `HideAsync()` methods instead.
  - `TrapFocus`
  - `PreventScroll`
  - `AriaDescribedby` / `AriaLabelledby` / `AriaLabel` — now in `DialogOptions`.
  - `OnDialogResult` — use `OnStateChange` with `DialogEventArgs`.

  #### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Modal` (`bool?`) | `Modal` (`bool`, default `true`) | No longer nullable |
  | `Instance` (`DialogInstance`) | `Instance` (`IDialogInstance?`) | Type changed to interface |

- ### FluentDialogHeader and FluentDialogFooter removed 💥

  V4's `FluentDialogHeader` and `FluentDialogFooter` components are **removed**.
  Header and footer are now configured through `DialogOptions`:

  ```csharp
  // V4
  var parameters = new DialogParameters
  {
      Title = "My Dialog",
      PrimaryAction = "Save",
      SecondaryAction = "Cancel"
  };

  // V5
  var options = new DialogOptions
  {
      Header = new DialogOptionsHeader { Title = "My Dialog" },
      Footer = new DialogOptionsFooter
      {
          PrimaryAction = new DialogOptionsFooterAction { Label = "Save" },
          SecondaryAction = new DialogOptionsFooterAction { Label = "Cancel" }
      }
  };
  ```

- ### Dialog vs Drawer 💥

  V4 used `DialogType` to distinguish dialogs from panels/drawers.
  V5 uses the `Alignment` property:

  | V4 | V5 | Result |
  |----|----|--------|
  | `DialogType.Dialog` | `DialogAlignment.Default` | Centered dialog |
  | `DialogType.Panel` (from left) | `DialogAlignment.Start` | Drawer from the start side |
  | `DialogType.Panel` (from right) | `DialogAlignment.End` | Drawer from the end side |

  The rendered HTML element changes: `<fluent-dialog>` for dialogs, `<fluent-drawer>` for drawers.

- ### Dialog Service changes

  V4's separate interfaces (`IDialogService-Dialog`, `IDialogService-MessageBox`, `IDialogService-SplashScreen`)
  are unified into a single `IDialogService` interface.

  V4's `IDialogContentComponent<T>` is replaced by V5's `FluentDialogInstance` abstract base class.

- ### Lifecycle model 💥

  | V4 | V5 |
  |----|----|
  | `Show()` / `Hide()` | `ShowAsync()` / `HideAsync()` |
  | `CancelAsync()` / `CloseAsync()` | Via `HideAsync()` |
  | `OnDialogResult` callback | `OnStateChange` with `DialogState` enum (Opening, Open, Closing, Closed) |
