---
title: KeyCode
route: /KeyCode
icon: Keyboard
---

# KeyCode

In some circumstances, Blazor does not retrieve all the **KeyDown** information received from JavaScript.
`FluentKeyCode` retrieves this data, in a similar way to the [JavaScript KeyCode library](https://www.npmjs.com/package/keycode)
and to [this demo sample](https://www.toptal.com/developers/keycode).

The `FluentKeyCode` component extends the functionality of **OnKeyDown** by adding the **KeyCode** parameter when the **OnKeyDown** event is raised.

## Example

{{ KeyCodeDefault }}

## Section

This example shows how to use the **FluentKeyCode** component to display all key details when a key is pressed.

{{ KeyCodeExample }}

## Global

You can also capture keystrokes **globally** on the current page.
To do this, we provide you with a **IKeyCodeService** injected by the **AddFluentUIComponents** method.  
Add the following component at the end of your `MainLayout.razor` file.

```xml
<FluentKeyCodeProvider />
```

Once the provider and service have been injected, you can...

**Either**, retrieving the service and registering the method that will capture the keys:

```csharp
[Inject]
private IKeyCodeService KeyCodeService { get; set; }

protected override void OnInitialized()
{
    KeyCodeService.RegisterListener(OnKeyDownAsync);
}

public async Task OnKeyDownAsync(FluentKeyCodeEventArgs args) => { // ... }

public ValueTask DisposeAsync()
{
    KeyCodeService.UnregisterListener(OnKeyDownAsync);
    return ValueTask.CompletedTask;
}
```

**Either**, implementing the interface **IKeyCodeListener**, retrieving the service and registering the method that will capture the keys:

```csharp
public partial MyPage : IKeyCodeListener, IAsyncDisposable
{
    [Inject]
    private IKeyCodeService KeyCodeService { get; set; }

    protected override void OnInitialized()
    {
        KeyCodeService.RegisterListener(this);
    }

    public async Task OnKeyDownAsync(FluentKeyCodeEventArgs args) => { // ... }

    public async Task OnKeyUpAsync(FluentKeyCodeEventArgs args) => { // ... }

    public ValueTask DisposeAsync()
    {
        KeyCodeService.UnregisterListener(this);
        return ValueTask.CompletedTask;
    }
}
```

> Some keystrokes are used by the browser (e.g. `Ctrl + A`).
> You can disable this function using the **PreventDefault** attribute with the **FluentKeyCodeProvider** component.
> `<FluentKeyCodeProvider PreventDefault="true" />`

{{ KeyCodeGlobalExample }}


## API FluentKeyCode

{{ API Type=FluentKeyCode }}

## API FluentKeyCodeEventArgs

{{ API Type=FluentKeyCodeEventArgs }}

## API FluentKeyCodeProvider

{{ API Type=FluentKeyCodeProvider }}

## Migrating to v5

No changes.
