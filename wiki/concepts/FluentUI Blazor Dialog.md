---
type: concept
title: "FluentUI Blazor Dialog"
address: c-000113
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - dialog
  - drawer
  - messagebox
  - overlay
  - modal
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Popover]]"
---

# FluentUI Blazor Dialog

A suite of overlay components for displaying modal and non-modal surfaces: `FluentDialog`, `FluentDrawer`, `FluentMessageBox`, and `FluentOverlay`. All are driven by the `IDialogService`.

---

## Dialog

A **Dialog** is a modal surface that requires user action before they can continue. It consists of a header (`TitleTemplate`), content (`ChildContent`), and footer (`ActionTemplate`).

### Using DialogService

The simplest way to show a dialog is via `IDialogService.ShowDialogAsync<T>()`.

```csharp
@inject IDialogService DialogService

var result = await DialogService.ShowDialogAsync<SimpleDialog>(options =>
{
    options.Modal = true;
    options.Alignment = DialogAlignment.End;
    options.Header.CloseAction.Visible = true;
    options.Header.InfoAction.Visible = true;
    options.Parameters.Add(nameof(SimpleDialog.Name), "John");
});
```

### Dialog Component

```razor
@inherits FluentDialogInstance

<FluentDialogBody>
    <ChildContent>
        Content of the dialog
    </ChildContent>
    <ActionTemplate>
        <FluentButton OnClick="@(e => DialogInstance.CloseAsync())"
                      Appearance="ButtonAppearance.Primary">OK</FluentButton>
        <FluentButton OnClick="@(e => DialogInstance.CancelAsync())">Cancel</FluentButton>
    </ActionTemplate>
</FluentDialogBody>

@code {
    protected override Task OnActionClickedAsync(bool primary)
    {
        return primary
            ? DialogInstance.CloseAsync()
            : DialogInstance.CancelAsync();
    }
}
```

### Fixed Header and Footer

Set `<FluentDialogBody FixedHeaderFooter="true">` to pin header and action buttons while only the content scrolls. Useful for long forms and large drawers.

### Custom Header Actions

In addition to built-in Close and Info actions, add custom header action buttons:

```csharp
options.Header.AddAction(action =>
{
    action.Icon = new Icons.Regular.Size20.Settings();
    action.Tooltip = "Settings";
    action.OnClickAsync = async (dialog) => { /* custom logic */ };
});
```

### Data Exchange

Pass data to a dialog via `options.Parameters.Add("PropertyName", value)`. Simple types are passed by value; objects by reference. Return data via `DialogInstance.CloseAsync(data)`.

---

## Drawer (Panel)

A **Drawer** is a secondary content surface that slides in from one edge. It is part of the dialog category and uses the same `IDialogService`.

```csharp
var result = await DialogService.ShowDrawerAsync<SimpleDialog>(options =>
{
    options.Alignment = DialogAlignment.Start; // Left side
});
```

Differences from Dialog:
- Uses `<fluent-drawer>` HTML element
- Default alignment is `DialogAlignment.End` (right side)
- Non-modal drawers allow continued interaction with the app
- Modal drawers close when clicking outside

---

## MessageBox

**MessageBox** is a convenience layer over `DialogService` for standard notification patterns.

```csharp
// Success
await DialogService.ShowSuccessAsync("The action was a success");

// Confirmation (returns DialogResult where Cancelled = false for Yes)
var result = await DialogService.ShowConfirmationAsync(
    "Are you sure you want to delete this item?");

// Custom message box
var result = await DialogService.ShowMessageBoxAsync(new MessageBoxOptions()
{
    Title = "My title",
    Message = "My <strong>customized</strong> message",
    Icon = new Icons.Regular.Size24.Games(),
    PrimaryButton = "Yes",
    SecondaryButton = "No",
});
```

### Available Methods

| Method | Icon Color | Buttons |
|--------|-----------|---------|
| `ShowSuccessAsync` | Green | OK |
| `ShowWarningAsync` | Orange | OK |
| `ShowInfoAsync` | Gray | OK |
| `ShowErrorAsync` | Red | OK |
| `ShowConfirmationAsync` | Confirmation | Yes/No |
| `ShowMessageBoxAsync` | Custom | Custom |

### Keyboard Shortcuts

| Dialog Type | Primary | Secondary |
|-------------|---------|-----------|
| OK dialogs | Enter or Escape | -- |
| Confirmation | Enter, Y | Escape, N |

---

## Overlay

**Overlay** temporarily covers screen content to focus attention on a dialog, progress indicator, or other interaction.

### Component Usage

```razor
<FluentOverlay FullScreen="true" @bind-Visible="@IsVisible">
    <FluentSpinner />
</FluentOverlay>

@code {
    bool IsVisible;
}
```

### Service Usage

Display a global overlay from anywhere in the application:

```csharp
await DialogService.ShowOverlayAsync(options =>
{
    options.Text = "Processing...";
    options.CardAppearance = CardAppearance.Filled;
    options.SpinnerSize = SpinnerSize.Large;
});

try { await Task.Delay(5000); }
finally { await DialogService.HideOverlayAsync(); }
```

Disable the global overlay at registration:

```csharp
Services.AddFluentUIComponents(options => options.UseGlobalOverlay = false);
```

### Overlay Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `FullScreen` | `bool` | Cover entire screen vs parent container |
| `Interactive` | `bool` | Allow interaction with overlay content |
| `CloseMode` | `OverlayCloseMode` | How the overlay can be closed |
| `Opacity` | `int?` | Background opacity percentage |

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Dialog, Drawer, MessageBox, and Overlay component documentation.
