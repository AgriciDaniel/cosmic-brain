---
title: Migration FluentList (Combobox, Listbox, Select)
route: /Migration/List
hidden: true
---

- ### Two type parameters required 💥

  All list components now require two type parameters: `TOption` and `TValue`.
  See the [FluentSelect migration page](/Migration/Select) for full details on the base class change
  (`ListComponentBase<TOption>` → `FluentListBase<TOption, TValue>`).

- ### FluentCombobox changes

  `FluentCombobox` now inherits from `FluentSelect` instead of `ListComponentBase` directly.

  #### Removed properties 💥
  - `Autocomplete` (`ComboboxAutocomplete?`)
  - `Open` (`bool?`)
  - `EnableClickToClose` (`bool?`)
  - `Position` (`SelectPosition?`)

  #### Changed properties
  - `Appearance` — moved to base class, type changed from `Appearance?` to `ListAppearance?`.

- ### FluentListbox changes

  #### Removed properties 💥
  - `Size` (`int`) — the integer size parameter is removed.

  #### Renamed properties
  - `SelectedOptionsChanged` → inherited as `SelectedItemsChanged`.

- ### FluentOption changes

  The type parameter meaning changed: V4 `FluentOption<TOption>` → V5 `FluentOption<TValue>`.

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Value` (`string?`) | `Value` (`TValue?`) | Now generic |
  | `SelectedChanged` (`EventCallback<bool>`) | — | **Removed** |
  | `OnSelect` (`EventCallback<string>`) | — | **Removed** |
  | `Title` (`string?`) | — | **Removed** |
