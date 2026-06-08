---
title: FluentUI Blazor Toast
address: c-000150
status: developing
---

# FluentUI Blazor Toast

> Part of the [[FluentUI Blazor]] component library. The `FluentToast` component displays temporary notifications about action status or system events using the `ToastService`.

## Overview

Toasts communicate the status of an action the user is taking or something that happened elsewhere in the app. They are **temporary surfaces** for useful and relevant information that is not critical.

## Architecture

Displaying a toast requires three parts:

1. **`FluentToastProvider`** -- placed in the app layout to render toasts
2. **`IToastService`** -- injected service to show/dismiss toasts
3. **`ToastOptions`** -- configures toast content and behavior

## Toast Types

### Confirmation Toast

Shown as a direct result of a user action. States: success, error, warning, informational, or progress.

### Progress Toast

Informs about the status of an operation the user initiated. Supports determinate and indeterminate progress.

### Communication Toast

Informs about system messages or another person's actions. Can include calls to action and may be temporary or persistent.

## Basic Usage

```razor
@inject IToastService ToastService

<FluentButton OnClick="@OpenToastAsync">Make toast</FluentButton>

@code {
    private async Task OpenToastAsync()
    {
        var result = await ToastService.ShowToastAsync(options =>
        {
            options.Title = "Toast title";
            options.Body = "Brief message to the user.";
            options.Subtitle = "subtitle";
            options.QuickAction1 = "Action";
            options.QuickAction1Callback = () =>
            {
                Console.WriteLine("Action executed.");
                return Task.CompletedTask;
            };
            options.IsDismissable = true;
            options.OnStatusChange = (e) =>
            {
                Console.WriteLine($"Status changed: {e.Id} - {e.Status}");
            };
        });
    }
}
```

## Intents

Use `ToastIntent` to set the semantic style:

| Intent | Icon | Aria-live |
|---|---|---|
| `Info` | Info icon | `polite` |
| `Success` | Checkmark | `assertive` |
| `Warning` | Warning | `assertive` |
| `Error` | Error | `assertive` |

All feedback states except `Info` use `assertive` aria-live, which interrupts other announcements.

## Dismissal Strategies

### Timed Dismissal

Default timeout is 7 seconds. Users can pause by hovering (mouse) but toasts without actions don't receive keyboard focus.

### Conditional Dismissal

For progress toasts that persist until a condition is met (e.g., task completion).

### Express Dismissal

Include a Close button when users can find the information again elsewhere:

```razor
options.IsDismissable = true;
```

### Custom Dismissal

Replace the close button with a custom action:

```razor
options.DismissAction = "Undo";
options.DismissActionCallback = () =>
{
    Console.WriteLine("Undo executed.");
    return Task.CompletedTask;
};
```

## Progress Toasts

### Indeterminate Progress

```razor
options.Timeout = 0;
options.Type = ToastType.IndeterminateProgress;
options.Intent = ToastIntent.Success;
options.Title = "Processing...";
```

### Determinate Progress

```razor
// Show toast instance
var instance = await ToastService.ShowToastInstanceAsync(options =>
{
    options.Type = ToastType.DeterminateProgress;
    options.Title = "Downloading file";
    options.BodyContent = BuildProgressContent(0);
});

// Update progress later
await instance.UpdateAsync(opts =>
{
    opts.BodyContent = BuildProgressContent(50);
});
```

## Inverted Toast

```razor
options.Inverted = true;
options.IsDismissable = true;
options.DismissAction = "Close";  // Required when Inverted+IsDismissable
```

> When `Inverted` and `IsDismissable` are both set, you must provide a `DismissAction` because `FluentButton` does not support inverted styling directly.

## ToastOptions Parameters

| Parameter | Type | Description |
|---|---|---|
| `Title` | `string?` | Toast title |
| `Body` | `string?` | Toast body text |
| `BodyContent` | `RenderFragment?` | Custom body content |
| `Subtitle` | `string?` | Optional subtitle |
| `Intent` | `ToastIntent` | Semantic intent (`Info`, `Success`, `Warning`, `Error`) |
| `Type` | `ToastType` | `Standard`, `DeterminateProgress`, `IndeterminateProgress` |
| `Timeout` | `int` | Auto-dismiss timeout in ms (0 = never) |
| `IsDismissable` | `bool` | Show close button |
| `DismissAction` | `string?` | Custom dismiss action text |
| `DismissActionCallback` | `Func<Task>?` | Callback for custom dismiss |
| `QuickAction1` / `QuickAction2` | `string?` | Action link text |
| `QuickAction1Callback` / `QuickAction2Callback` | `Func<Task>?` | Action callbacks |
| `Icon` | `Icon?` | Custom icon |
| `Inverted` | `bool` | Inverted color scheme |
| `OnStatusChange` | `Action<ToastStatusChange>?` | Status change handler |
| `Id` | `string?` | Toast ID (for targeted updates/dismissals) |
