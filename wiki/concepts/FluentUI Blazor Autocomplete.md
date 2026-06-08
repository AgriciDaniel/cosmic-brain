---
title: FluentUI Blazor Autocomplete
address: c-000102
status: developing
---

# FluentUI Blazor Autocomplete

> Part of the **[[FluentUI Blazor]]** component library. A text input that provides real-time suggestions as the user types.

## Overview

`FluentAutocomplete` combines a free-text input with a filtered list of options. Users can either select from suggestions or type their own value. It is ideal when the list of options is large, as the user narrows results by typing rather than scrolling.

The component requires **two** type parameters: `TOption` and `TValue`.

> [!WARNING] Accessibility requirements are not yet fully implemented for this component.

## Keyboard interaction

| Key | Behavior |
|-----|----------|
| Type text | Filters options and triggers `OnSearchAsync` |
| Arrow Down / Up | Opens suggestion list and navigates items |
| Enter | Selects the highlighted item |
| Backspace | Deletes the most recently selected item (multi-select mode) |
| Escape | Closes the suggestion list without selecting |

## Basic multi-select

```razor
<FluentAutocomplete TOption="Country"
                    TValue="string"
                    Width="100%"
                    Label="Select countries"
                    Placeholder="Type to search..."
                    OnOptionsSearch="@OnSearchAsync"
                    OptionText="@(item => item.Name)"
                    OptionDisabled="@(e => e.Code == "au")"
                    @bind-SelectedItems="@SelectedCountries" />

@code {
    IEnumerable<Country> SelectedCountries { get; set; } = [];

    Task OnSearchAsync(OptionsSearchEventArgs<Country> e)
    {
        e.Items = Countries.Where(i => i.Name.StartsWith(e.Text, StringComparison.OrdinalIgnoreCase))
                           .OrderBy(i => i.Name);
        return Task.CompletedTask;
    }
}
```

## Single-item mode

Set `Multiple="false"` to restrict selection to a single item. In single mode, no tags are displayed and the selected value replaces the input text.

```razor
<FluentAutocomplete TOption="Country"
                    TValue="string"
                    Label="Select a country"
                    Multiple="false"
                    Placeholder="Type to search..."
                    OnOptionsSearch="@OnSearchAsync"
                    OptionText="@(item => item?.Name)"
                    @bind-SelectedItem="@SelectedCountry" />
```

> [!NOTE] The `Value` property updates when a user selects from the list, but not via programmatic changes. To update `Value` from code, modify `SelectedItems` or `SelectedItem` instead.

## Customized options and templates

The component exposes several render fragments for rich customization:

- `OptionTemplate` -- custom rendering for each suggestion item.
- `HeaderContent` -- content at the top of the popup, receives `AutocompleteHeaderFooterContent<TOption>` context with `Items` and `InProgress`.
- `FooterContent` -- content at the bottom of the popup (same context type).
- `MaximumSelectedOptionsMessage` -- message shown when the max selection count is reached.

```razor
<FluentAutocomplete TOption="Country" TValue="string" Width="100%"
                    Label="Select countries"
                    OnOptionsSearch="@OnSearchAsync"
                    OptionText="@(item => item.Name)"
                    MaximumSelectedOptions="4"
                    @bind-SelectedItems="@SelectedCountries">

    <OptionTemplate>
        <FluentStack Style="pointer-events: none;" VerticalAlignment="VerticalAlignment.Center">
            <FluentAvatar Image="@context.Flag()" Name="@context.Name" Size="AvatarSize.Size20" />
            <FluentText Margin="@Margin.Left4">@context.Name</FluentText>
        </FluentStack>
    </OptionTemplate>

    <HeaderContent>
        <FluentText Size="TextSize.Size200" Color="Color.Primary" Align="TextAlign.Center">
            Suggested contacts
        </FluentText>
        <FluentProgressBar Visible="@context.InProgress" />
    </HeaderContent>

    <FooterContent>
        @if (!context.InProgress && !context.Items.Any())
        {
            <FluentText Size="TextSize.Size200" Color="Color.Error" Align="TextAlign.Center">
                No results found
            </FluentText>
        }
    </FooterContent>
</FluentAutocomplete>
```

## Handling different object instances (OptionSelectedComparer)

When `OnOptionsSearch` returns new object instances each call (e.g., from an API), the component cannot match them to already-selected items by reference. Provide a custom `IEqualityComparer<TOption>` via `OptionSelectedComparer`.

```razor
<FluentAutocomplete TOption="MyUser" TValue="int" Width="100%"
                    OptionText="(o) => o.Name"
                    OptionValue="(o) => o.UserId"
                    OptionSelectedComparer="MyComparer.Instance"
                    OnOptionsSearch="@OnSearchAsync"
                    @bind-SelectedItems="@Selected" />

@code {
    record MyUser(int UserId, string Name);

    class MyComparer : IEqualityComparer<MyUser>
    {
        public static readonly MyComparer Instance = new();
        public bool Equals(MyUser? x, MyUser? y) => x?.UserId == y?.UserId;
        public int GetHashCode(MyUser obj) => obj.UserId.GetHashCode();
    }
}
```

If the option type implements `IEqualityComparer<T>`, the comparer parameter can be omitted.

## Additional parameters

- `ShowProgressIndicator` -- displays a progress spinner during async search.
- `MaxAutoHeight` -- set to `"unset"` to allow the component to grow vertically with selected items.
- `MaxSelectedWidth` -- truncates long selected item labels (e.g., `"40px"`).
- `ShowDismiss` -- controls visibility of the search/clear icon button (default `true`).

## Key migration notes (v4 to v5)

- `@bind-SelectedOptions` renamed to `@bind-SelectedItems`.
- Single selection now uses `Multiple="false"` + `@bind-SelectedItems` instead of a separate `@bind-SelectedOption`.
- `Appearance` → `InputAppearance` (using `TextInputAppearance` now).
- `OptionComparer` → `OptionSelectedComparer`.
- `HeaderFooterContent<T>` → `AutocompleteHeaderFooterContent<T>`.
- Virtualization support is not yet implemented in v5.

## Related

- [[FluentUI Blazor List and Select]]
- [[FluentUI Blazor Combobox]]
