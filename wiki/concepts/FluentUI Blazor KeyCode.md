---
title: FluentUI Blazor KeyCode
address: c-000124
status: developing
---

# FluentUI Blazor KeyCode

> Part of the [[FluentUI Blazor]] component library. `FluentKeyCode` captures keyboard events with richer data than Blazor's built-in `OnKeyDown`, similar to the JavaScript KeyCode library.

## Overview

In some circumstances, Blazor does not retrieve all keydown information from JavaScript. `FluentKeyCode` fills this gap by extending `OnKeyDown` with a `FluentKeyCodeEventArgs` parameter containing detailed key information.

## Basic Usage

```razor
<FluentKeyCode OnKeyDown="@KeyDownHandler"
               PreventDefault="true"
               StopPropagation="true"
               tabindex="0">
    Click here and press <code>Ctrl</code> + <code>G</code>
</FluentKeyCode>
<div>@(shortcutPressed ? "Shortcut pressed!" : "")</div>

@code {
    bool shortcutPressed = false;

    void KeyDownHandler(FluentKeyCodeEventArgs e)
    {
        if (e.Key == KeyCode.KeyG && e.CtrlKey)
        {
            shortcutPressed = true;
        }
        else
        {
            shortcutPressed = false;
        }
    }
}
```

## Key Event Data

`FluentKeyCodeEventArgs` provides:

| Property | Type | Description |
|---|---|---|
| `Key` | `KeyCode` | The key identifier enum |
| `Value` | `string?` | String representation of the key |
| `KeyCode` | `int` | Numeric key code |
| `CtrlKey` | `bool` | Ctrl modifier pressed |
| `ShiftKey` | `bool` | Shift modifier pressed |
| `AltKey` | `bool` | Alt modifier pressed |
| `MetaKey` | `bool` | Meta/Windows/Command modifier pressed |
| `Location` | `KeyLocation` | Key location (standard, left, right, numpad) |
| `Repeat` | `bool` | Key is being held down (repeat) |
| `TargetId` | `string?` | ID of the element that received the event |
| `Name` | `string` | Event name ("keydown" / "keyup") |

## Global Key Capture

For page-level keyboard handling, use `IKeyCodeService` and `FluentKeyCodeProvider`.

### Add Provider in Layout

```xml
<FluentKeyCodeProvider />
```

### Register via Service

```csharp
@inject IKeyCodeService KeyCodeService
@implements IAsyncDisposable

protected override void OnInitialized()
{
    KeyCodeService.RegisterListener(OnKeyDownAsync);
}

private Task OnKeyDownAsync(FluentKeyCodeEventArgs args)
{
    // Handle key
    return Task.CompletedTask;
}

public ValueTask DisposeAsync()
{
    KeyCodeService.UnregisterListener(OnKeyDownAsync);
    return ValueTask.CompletedTask;
}
```

### Register via Interface

```csharp
public partial MyPage : IKeyCodeListener, IAsyncDisposable
{
    [Inject]
    private IKeyCodeService KeyCodeService { get; set; }

    protected override void OnInitialized()
    {
        KeyCodeService.RegisterListener(this);
    }

    public async Task OnKeyDownAsync(FluentKeyCodeEventArgs args) { }
    public async Task OnKeyUpAsync(FluentKeyCodeEventArgs args) { }

    public ValueTask DisposeAsync()
    {
        KeyCodeService.UnregisterListener(this);
        return ValueTask.CompletedTask;
    }
}
```

### Prevent Default Browser Behavior

```xml
<FluentKeyCodeProvider PreventDefault="true" />
```

## API Components

| Component | Purpose |
|---|---|
| `FluentKeyCode` | Wraps content to capture key events locally |
| `FluentKeyCodeProvider` | Enables global key capture (place in layout) |
| `IKeyCodeService` | Service for registering global key listeners |

## Migration Notes

No changes in v5.
