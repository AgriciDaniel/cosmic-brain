---
title: Migration FluentAutocomplete
route: /Migration/Autocomplete
hidden: true
---

### Type parameter change 💥

The component now requires **two** type parameters: `TOption` and `TValue`.

```csharp
// v4
<FluentAutocomplete TOption="Country" ... />

// v5
<FluentAutocomplete TOption="Country" TValue="string" ... />
```

### Renamed parameters 💥

- `@bind-SelectedOptions` → `@bind-SelectedItems`
- `@bind-SelectedOption` → Use `Multiple="false"` with `@bind-SelectedItems`
- `Appearance` (`FluentInputAppearance`) → `InputAppearance` (`TextInputAppearance`)
- `OptionComparer` → `OptionSelectedComparer`
- `ValueText` / `ValueTextChangedAsync` → `@bind-Value`

### Removed parameters 💥

- `AutoComplete` — browser autocomplete attribute, no longer exposed.
- `Position` (`SelectPosition?`) — popup positioning is now handled internally.
- `OptionStyle` / `OptionClass` — use `OptionTemplate` to customize option rendering.
- `TitleScrollToPrevious` / `TitleScrollToNext` — horizontal scroll navigation has been removed.
- `ShowOverlayOnEmptyResults` — overlay behavior has been removed.
- `Virtualize` / `ItemSize` — virtualization support has not yet implemented.
- `SelectValueOnTab` — tab key behavior has been removed.
- `KeepOpen` — dropdown close behavior is now managed internally.

### New parameters

- `TValue` — second type parameter for the value type.
- `MaxSelectedWidth` (`string?`) — maximum width of each selected item badge.
- `ShowDismiss` (`bool`) — controls whether the Search/Clear icon button is displayed. Default is `true`.
- `OptionValue` (`Func<TOption, TValue>?`) — function to extract the value from an option.
- `OptionValueToString` (`Func<TValue, string>?`) — function to convert a value to string.
- Various inherited input parameters: `Message`, `MessageTemplate`, `MessageState`, `MessageIcon`, `LabelPosition`, `LabelWidth`, `Margin`, `Padding`, `Tooltip`.

### HeaderContent / FooterContent context type change 💥

The context type for `HeaderContent` and `FooterContent` has been renamed
from `HeaderFooterContent<TOption>` to `AutocompleteHeaderFooterContent<TOption>`.
The properties remain the same (`Items` and `InProgress`).

### Single selection mode 💥

In v4, single selection used a separate `@bind-SelectedOption` binding.
In v5, use `Multiple="false"` with `@bind-SelectedItems`.

```csharp
// v4
<FluentAutocomplete TOption="Country"
                    @bind-SelectedOption="@SelectedCountry"
                    ... />

// v5
<FluentAutocomplete TOption="Country"
                    TValue="string"
                    Multiple="false"
                    @bind-SelectedItems="@SelectedCountries"
                    ... />

@code
{
    Country? SelectedCountry
    {
        get => SelectedCountries.FirstOrDefault() ?? default;
        set => SelectedCountries = value is not null ? [value] : [];
    }
}
```

### Automatic height growth

In v4, the component used horizontal scroll navigation (`FluentFlipper`) when selected items exceeded the available width.
In v5, this horizontal navigation has been removed, and the component **grows vertically** to display all selected items:
set the `MaxAutoHeight` parameter to `unset` or a specific value. 
You can also use `MaxSelectedWidth` to truncate long selected item labels, reducing the horizontal space each badge occupies.
This may break existing layouts if you relied on the fixed-height behavior.

### Migrating to v5

| v4 | v5 |
|---|---|
| `TOption` only | `TOption` + `TValue` |
| `@bind-SelectedOptions` | `@bind-SelectedItems` |
| `@bind-SelectedOption` | `Multiple="false"` + `@bind-SelectedItems` |
| `Appearance="FluentInputAppearance.Outline"` | `InputAppearance="TextInputAppearance.Outline"` |
| `OptionComparer` | `OptionSelectedComparer` |
| `ValueText` / `ValueTextChangedAsync` | `@bind-Value` |
| `HeaderFooterContent<T>` | `AutocompleteHeaderFooterContent<T>` |
| `SelectValueOnTab="true"` | _(removed)_ |
| `KeepOpen="true"` | _(removed)_ |

