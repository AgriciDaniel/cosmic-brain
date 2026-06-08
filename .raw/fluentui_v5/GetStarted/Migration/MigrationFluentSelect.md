---
title: Migration FluentSelect
route: /Migration/Select
hidden: true
---

- ### Base class change 💥

  The base class for all list components has changed:
  - V4: `ListComponentBase<TOption>` inheriting from `FluentInputBase<string?>`
  - V5: `FluentListBase<TOption, TValue>` inheriting from `FluentInputBase<TValue>`

  All list components (`FluentSelect`, `FluentCombobox`, `FluentListbox`) now require **two** type parameters:
  `TOption` (the option type) and `TValue` (the value type).

  ```xml
  <!-- V4 -->
  <FluentSelect TOption="Country" Items="@countries"
                OptionValue="@(c => c.Code)" OptionText="@(c => c.Name)"
                @bind-SelectedOption="selectedCountry" />

  <!-- V5 -->
  <FluentSelect TOption="Country" TValue="string" Items="@countries"
                OptionValue="@(c => c.Code)" OptionText="@(c => c.Name)"
                @bind-Value="selectedCountryCode" />
  ```

- ### Appearance 💥

  The `Appearance` property has been updated to use the `ListAppearance` enum
  instead of `Appearance` enum.

  `ListAppearance` enum has the following values:
  - `FilledLighter`
  - `FilledDarker`
  - `Outline`
  - `Transparent`

- ### Changed properties 💥

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `Value` (`string?`) | `Value` (`TValue?`) | Now generic |
  | `ValueExpression` (`Expression<Func<string>>?`) | `ValueExpression` (`Expression<Func<TValue>>?`) | Now generic |
  | `Disabled` (`bool`) | `Disabled` (`bool?`) | Now nullable — use `Disabled="true"` instead of just `Disabled` |
  | `OptionText` (`Func<TOption, string?>`) | `OptionText` (`Func<TOption?, string>?`) | Nullable TOption, non-nullable return |
  | `OptionValue` (`Func<TOption, string?>?`) | `OptionValue` (`Func<TOption?, TValue?>?`) | Returns `TValue?` instead of `string?` |
  | `OptionDisabled` (`Func<TOption, bool>?`) | `OptionDisabled` (`Func<TOption?, bool>?`) | Nullable TOption |
  | `SelectedOptions` (`IEnumerable<TOption>?`) | `SelectedItems` (`IEnumerable<TOption>`) | **Renamed**, now non-nullable (defaults to `[]`) |
  | `SelectedOptionsChanged` | `SelectedItemsChanged` | **Renamed** |

- ### Removed properties 💥

  - `ChangeOnEnterOnly`
  - `Embedded`
  - `Field`
  - `Immediate`
  - `ImmediateDelay`
  - `Open`
  - `OptionComparer` — use `OptionSelectedComparer` instead.
  - `OptionSelected` — use `OptionSelectedComparer` instead.
  - `OptionTitle`
  - `Position`
  - `SelectedOption` — use `Value` instead.
  - `SelectedOptionExpression`
  - `SelectedOptions` — use `SelectedItems` instead.
  - `SelectedOptionsExpression`
  - `Title`
  - `SelectedOptionChanged` — use `ValueChanged` instead.
  - `SelectedOptionsChanged` — use `SelectedItemsChanged` instead.
