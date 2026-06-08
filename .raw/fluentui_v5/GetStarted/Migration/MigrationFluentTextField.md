---
title: Migration FluentTextField, FluentNumberField, FluentSearch
route: /Migration/TextField
hidden: true
---

- ### Three components merged into one 💥

  `FluentTextField`, `FluentNumberField`, and `FluentSearch` have been **removed** in V5.
  They are all replaced by `FluentTextInput`.

- ### Component mapping

  | V4 Component | V5 Replacement |
  |-------------|----------------|
  | `FluentTextField` | `FluentTextInput` |
  | `FluentNumberField` | `FluentTextInput` with `TextInputType="TextInputType.Number"` |
  | `FluentSearch` | `FluentTextInput` with a search icon in `StartTemplate` |

- ### FluentTextField → FluentTextInput

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `TextFieldType` (`TextFieldType?`) | `TextInputType` (`TextInputType?`) | Enum renamed |
  | `Appearance` (`FluentInputAppearance`) | `Appearance` (`TextInputAppearance`) | Enum renamed |
  | `Size` (`int?`) | `Size` (`TextInputSize?`) | Changed from pixel count to enum |
  | `InputMode` (`InputMode?`) | `InputMode` (`TextInputMode?`) | Enum renamed |
  | `ChildContent` | — | **Removed** — use `StartTemplate`/`EndTemplate` |
  | `Maxlength` | `MaxLength` | Casing changed |
  | `Minlength` | `MinLength` | Casing changed |
  | `DataList` | `DataList` | Same |

- ### FluentNumberField migration

  ```xml
  <!-- V4 -->
  <FluentNumberField TValue="int" @bind-Value="quantity"
                     Min="0" Max="100" Step="1"
                     Appearance="FluentInputAppearance.Outline" />

  <!-- V5: Use FluentTextInput with type="number" or FluentSlider -->
  <FluentTextInput @bind-Value="quantityStr"
                   TextInputType="TextInputType.Number"
                   Appearance="TextInputAppearance.Outline" />
  ```

  > ⚠️ `FluentNumberField` had built-in numeric parsing with `Min`/`Max`/`Step`/`HideStep` properties.
  > `FluentTextInput` is string-based. For numeric input with validation,
  > consider using `FluentSlider` or adding custom validation logic.

- ### FluentSearch migration

  ```xml
  <!-- V4 -->
  <FluentSearch @bind-Value="searchText"
                Appearance="FluentInputAppearance.Outline" />

  <!-- V5 -->
  <FluentTextInput @bind-Value="searchText"
                   Appearance="TextInputAppearance.Outline"
                   Placeholder="Search...">
      <StartTemplate>
          <FluentIcon Value="@(new Icons.Regular.Size16.Search())" />
      </StartTemplate>
  </FluentTextInput>
  ```

- ### Appearance mapping

  | V4 `FluentInputAppearance` | V5 `TextInputAppearance` |
  |---------------------------|-------------------------|
  | `FluentInputAppearance.Outline` | `TextInputAppearance.Outline` |
  | `FluentInputAppearance.Filled` | `TextInputAppearance.FilledDarker` |

  Migration helper available: `FluentInputAppearance.Filled.ToTextInputAppearance()`
