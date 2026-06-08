# Blazor Services

This document covers the core services that power Fusion's Blazor integration: `CircuitHub`, `JSRuntimeInfo`, `RenderModeHelper`, and `RenderModeDef`.

> **See also**: [UICommander and UIActionTracker](PartB-UICommander.md) &ndash; command execution and responsive UI updates. Both are optional and can be replaced with custom abstractions.

## CircuitHub

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Services/CircuitHub.cs)

`CircuitHub` is a scoped service that acts as the central hub for accessing Fusion and Blazor services within a circuit. It caches frequently used services and provides information about the current render mode.

### Purpose

- Caches commonly used services for efficient access
- Provides render mode information (prerendering vs interactive)
- Exposes the Blazor Dispatcher for thread-safe UI updates
- Serves as the primary access point for Fusion services in Blazor components

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `long` | Unique identifier for this circuit hub instance |
| `Services` | `IServiceProvider` | The service provider |
| `StateFactory` | `StateFactory` | Factory for creating states |
| `UICommander` | `UICommander` | Commander for executing UI commands |
| `Commander` | `ICommander` | The underlying commander |
| `Session` | `Session` | Current user session (lazy-resolved) |
| `SessionResolver` | `ISessionResolver` | Session resolver service |
| `Nav` | `NavigationManager` | Blazor's navigation manager |
| `JS` | `IJSRuntime` | JavaScript runtime instance |
| `JSRuntimeInfo` | `JSRuntimeInfo` | Information about the JS runtime |
| `IsPrerendering` | `bool` | True if currently prerendering |
| `IsInteractive` | `bool` | True if circuit is interactive |
| `Dispatcher` | `Dispatcher` | Blazor dispatcher for UI thread |
| `RenderMode` | `RenderModeDef` | Current render mode definition |
| `WhenInitialized` | `Task` | Completes when CircuitHub is initialized |

### Disposal Lifecycle

`CircuitHub` is a **scoped** service tied to a single Blazor circuit. It is disposed automatically when the circuit ends — on server disconnect, page close, or navigation away from an interactive page. Any resource registered with or owned by `CircuitHub` should implement `IDisposable` or `IAsyncDisposable` so it is cleaned up correctly when the circuit terminates.

### Initialization

CircuitHub must be initialized with a dispatcher and render mode. This typically happens automatically in `CircuitHubComponentBase`:

```csharp
CircuitHub.Initialize(this.GetDispatcher(), renderMode);
```

### Usage in Components

Components that inherit from `CircuitHubComponentBase` get direct access to CircuitHub:

```razor
@inherits CircuitHubComponentBase

@code {
    protected override void OnInitialized()
    {
        // Access services through CircuitHub
        var session = CircuitHub.Session;
        var commander = CircuitHub.Commander;

        // Check render mode
        if (CircuitHub.IsPrerendering) {
            // Skip expensive operations during prerender
        }
    }
}
```


## JSRuntimeInfo

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Services/JSRuntimeInfo.cs)

`JSRuntimeInfo` provides information about the JavaScript runtime and the current execution context. It helps detect whether the app is in prerendering mode or interactive mode.

### Purpose

- Detects if running in server-side prerendering or interactive mode
- Identifies the type of JS runtime (Remote, WASM, etc.)
- Useful for conditional logic based on execution context

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Runtime` | `IJSRuntime?` | The underlying JavaScript runtime (null if unavailable) |
| `IsRemote` | `bool` | True if using RemoteJSRuntime (server-side) |
| `ClientProxy` | `object?` | The SignalR client proxy (server-side only) |
| `IsPrerendering` | `bool` | True if in server-side prerendering (IsRemote && ClientProxy is null) |
| `IsInteractive` | `bool` | True if runtime is available and not prerendering |

### How It Works

JSRuntimeInfo uses reflection to inspect the runtime type and detect the execution context:

- **Prerendering**: `IsRemote` is true but `ClientProxy` is null (no client connection yet)
- **Interactive Server**: `IsRemote` is true and `ClientProxy` is not null
- **WebAssembly**: Runtime is the WASM JS runtime (`IsRemote` is false)

### Usage Example

```csharp
var jsInfo = services.GetRequiredService<JSRuntimeInfo>();

if (jsInfo.IsPrerendering) {
    // Return placeholder data during prerender
    return DefaultData;
}

if (jsInfo.IsInteractive) {
    // Safe to make JS interop calls
    await JS.InvokeVoidAsync("someFunction");
}
```


## RenderModeDef

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/RenderModeDef.cs)

`RenderModeDef` defines a rendering mode configuration. It supports both pre-.NET 8 and .NET 8+ render mode definitions.

### Purpose

- Encapsulates render mode configuration
- Provides a unified API across different .NET versions
- Enables runtime render mode switching

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Key` | `string` | Short identifier ("a", "s", "w") |
| `Title` | `string` | Human-readable name |
| `Mode` | `IComponentRenderMode` | (.NET 8+) The Blazor render mode |
| `IsWebAssembly` | `bool` | (Pre-.NET 8) Whether this is WASM mode |
| `Prerender` | `bool` | (Pre-.NET 8) Whether prerendering is enabled |

### Built-in Modes

| Key | Title | Mode |
|-----|-------|------|
| `"a"` | Auto | `InteractiveAutoRenderMode(prerender: true)` |
| `"s"` | Server | `InteractiveServerRenderMode(prerender: true)` |
| `"w"` | WASM | `InteractiveWebAssemblyRenderMode(prerender: true)` |

### Static Members

```csharp
// All available render modes (can be customized)
RenderModeDef[] All { get; set; }

// Dictionary lookup by key
IReadOnlyDictionary<string, RenderModeDef> ByKey { get; }

// Default render mode (first in All array)
RenderModeDef Default { get; }

// Get mode by key, or default if not found
RenderModeDef GetOrDefault(string? key)
```

### Usage in Host Page

```razor
@* _HostPage.razor *@
@{
    var renderMode = RenderModeDef.GetOrDefault(RenderModeKey);
}

<App @rendermode="renderMode.Mode" />
```


## RenderModeHelper

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Services/RenderModeHelper.cs)

`RenderModeHelper` provides utilities for managing and switching between different render modes at runtime.

### Purpose

- Displays the current render mode
- Enables switching between Server and WebAssembly modes
- Constructs mode-switch URLs

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `CurrentMode` | `RenderModeDef?` | Current render mode (null if not initialized) |
| `GetCurrentModeTitle()` | `string` | Human-readable title for current mode |
| `ChangeMode(RenderModeDef)` | `void` | Initiates a render mode change |
| `GetModeChangeUrl(...)` | `string` | Constructs the URL for switching modes |

### Render Mode Switch URL Format

```
/fusion/renderMode/{key}?redirectTo={url}
```

For example: `/fusion/renderMode/w?redirectTo=/dashboard`

### Usage Example

```razor
@inject RenderModeHelper RenderModeHelper

<div class="render-mode-selector">
    <span>Current: @RenderModeHelper.GetCurrentModeTitle()</span>

    @foreach (var mode in RenderModeDef.All) {
        <button @onclick="() => RenderModeHelper.ChangeMode(mode)">
            @mode.Title
        </button>
    }
</div>
```

### Server Configuration

To enable render mode switching, map the endpoint in your server:

```csharp
app.MapFusionRenderModeEndpoints(); // Maps /fusion/renderMode/{key}
```


## IHasCircuitHub Interface

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Services/IHasCircuitHub.cs)

A marker interface for types that have access to a `CircuitHub` instance.

```csharp
public interface IHasCircuitHub : IHasServices
{
    CircuitHub CircuitHub { get; }
}
```

This interface is implemented by `CircuitHubComponentBase` and all components deriving from it. It enables service resolution patterns and dependency injection scenarios.


## DI Registration

All services are registered when you call `AddBlazor()`:

```csharp
services.AddFusion().AddBlazor();
```

This registers:

| Service | Lifetime | Description |
|---------|----------|-------------|
| `CircuitHub` | Scoped | Central service hub |
| `JSRuntimeInfo` | Scoped/Singleton | JS runtime information |
| `RenderModeHelper` | Scoped | Render mode utilities |
| `UICommander` | Scoped | Command execution for UI (see [UICommander](PartB-UICommander.md)) |
| `UIActionTracker` | Scoped | Tracks UI actions (see [UICommander](PartB-UICommander.md)) |
| `UIActionFailureTracker` | Scoped | Tracks failed UI actions |
