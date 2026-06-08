# Real-time UI in Blazor Apps

This part covers how to build real-time Blazor applications with Fusion. Fusion provides a comprehensive set of component base classes, services, and utilities that make it easy to create UIs that automatically update when underlying data changes.

**Related Documentation:**
- [Services](PartB-Services.md) &ndash; CircuitHub, JSRuntimeInfo, RenderModeHelper
- [UICommander](PartB-UICommander.md) &ndash; UICommander, UIActionTracker, UpdateDelayer
- [Authentication](PartB-Auth.md) &ndash; AuthState, AuthStateProvider, PresenceReporter
- [Parameter Comparison](PartB-Parameters.md) &ndash; Optimized parameter handling
- [Diagrams](PartB-D.md) &ndash; Visual diagrams of component architecture
- [Cheat Sheet](PartB-CS.md) &ndash; Quick reference

## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.Fusion.Blazor](https://www.nuget.org/packages/ActualLab.Fusion.Blazor/) | Component base classes: `ComputedStateComponent<T>`, `MixedStateComponent<T, TM>`, etc. |
| [ActualLab.Fusion](https://www.nuget.org/packages/ActualLab.Fusion/) | Core Fusion (automatically referenced by Blazor package) |

::: tip
For authentication features (`AuthStateProvider`, `ClientAuthHelper`, `CascadingAuthState`), also add [ActualLab.Fusion.Blazor.Authentication](https://www.nuget.org/packages/ActualLab.Fusion.Blazor.Authentication/). See [Authentication](PartB-Auth.md) for details.
:::

## Key Concepts

You already know about `IState<T>` &ndash; it was described in [Part 1](./PartF.md).
It's an abstraction that "tracks" the most current version of some `Computed<T>`.
There are a few "flavors" of the `IState` &ndash; the most important ones are:

- `IMutableState<T>` &ndash; in fact, a variable exposed as `IState<T>`
- `IComputedState<T>` &ndash; a state that auto-updates once it becomes inconsistent,
  and the update delay is controlled by `UpdateDelayer` provided to it.

You can use these abstractions directly in your Blazor components, but
usually it's more convenient to use the component base classes from `ActualLab.Fusion.Blazor` NuGet package.

## Component Hierarchy Overview

Fusion provides a hierarchy of Blazor component base classes, each building upon the previous one:

| Class | Purpose |
|-------|---------|
| `FusionComponentBase` | Base class with optimized parameter handling and event processing |
| `CircuitHubComponentBase` | Adds `CircuitHub` and convenient service shortcuts |
| `StatefulComponentBase<T>` | Adds `State` management with automatic UI updates |
| `ComputedStateComponent<T>` | Auto-computed state with dependency tracking |
| `ComputedRenderStateComponent<T>` | Optimized rendering that skips unchanged states |
| `MixedStateComponent<T, TMutableState>` | Combines computed state with local mutable state |


## FusionComponentBase

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/FusionComponentBase.cs)

The foundation class for all Fusion Blazor components. It extends Blazor's `ComponentBase` and implements `IHandleEvent`.

### Purpose

Provides optimized parameter comparison and event handling for Blazor components. Unlike standard `ComponentBase`, it can skip `SetParametersAsync` calls when parameters haven't meaningfully changed.

### How It Works

- Overrides `SetParametersAsync` to check if parameters have actually changed before processing
- Implements custom event handling that optionally suppresses `StateHasChanged` calls after events
- Uses `ComponentInfo` for efficient parameter comparison based on configurable comparison modes

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `DefaultParameterComparisonMode` | `ParameterComparisonMode` (static) | Controls how parameters are compared across all components |
| `MustRenderAfterEvent` | `bool` | When `true`, calls `StateHasChanged` after event handlers complete |
| `ComponentInfo` | `ComponentInfo` | Cached metadata about the component type for parameter comparison |
| `ParameterSetIndex` | `int` | Tracks how many times parameters have been set (0 = not initialized) |


## CircuitHubComponentBase

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/CircuitHubComponentBase.cs)

Extends `FusionComponentBase` to provide access to `CircuitHub` and commonly used services.

### Purpose

Acts as a convenience layer that injects `CircuitHub` and exposes shortcuts to frequently needed services like `StateFactory`, `UICommander`, and `Session`.

> **See also**: [Blazor Services](PartB-Services.md) for detailed documentation of `CircuitHub`, `JSRuntimeInfo`, `RenderModeHelper`, and `RenderModeDef`.

### How It Works

- Injects `CircuitHub` via dependency injection
- Exposes commonly used services as protected properties for easy access in derived components

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `CircuitHub` | `CircuitHub` | The injected circuit hub containing all Fusion-related services |
| `Services` | `IServiceProvider` | Shortcut to `CircuitHub.Services` |
| `Session` | `Session` | Current user session |
| `StateFactory` | `StateFactory` | Factory for creating states |
| `UICommander` | `UICommander` | Commander for executing UI commands |
| `Nav` | `NavigationManager` | Blazor's navigation manager |
| `JS` | `IJSRuntime` | JavaScript interop runtime |


## StatefulComponentBase and StatefulComponentBase&lt;T&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/StatefulComponent.cs)

Extends `CircuitHubComponentBase` to manage a `State` that automatically triggers UI updates.

### Purpose

Provides the foundation for components that need to react to state changes. When the state updates, the component automatically re-renders.

### How It Works

- Maintains a `State` property that can be any `IState<T>` implementation
- Attaches a `StateChanged` handler that calls `NotifyStateHasChanged()` when the state updates
- Sets `MustRenderAfterEvent = false` by default, since these components typically render only after state changes
- Disposes the state when the component is disposed

### Creating the State

Override `CreateState()` to provide your own state, or call `SetState()` from `OnInitialized` or `SetParametersAsync`. The component ensures the state is created after the sync part of initialization completes.

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `State` | `IState<T>` | The state being tracked (typed version) |
| `UntypedState` | `State` | Access to the untyped base state |
| `StateChanged` | `Action<State, StateEventKind>` | Handler invoked when state events occur |
| `CreateState()` | Method | Override to create custom state; called if state isn't set by initialization |
| `SetState(state, ...)` | Method | Explicitly sets the state and attaches event handlers |
| `DisposeAsync()` | Method | Disposes the state when component is disposed |


## ComputedStateComponent and ComputedStateComponent&lt;T&gt;

[View Source (base)](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/ComputedStateComponent.cs) | [View Source (typed)](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/ComputedStateComponent.Typed.cs)

Extends `StatefulComponentBase<T>` to provide an auto-computed state with full Fusion dependency tracking.

### Purpose

The primary component base class for building real-time UI. You override `ComputeState` to define what data your component displays, and Fusion automatically re-renders the component whenever that data changes.

### How It Works

1. Creates a `ComputedState<T>` that uses your `ComputeState` method as its computation
2. The `ComputeState` method runs inside Fusion's dependency tracking context
3. When any dependency (e.g., a Compute Service method result) is invalidated, the state recomputes
4. After recomputation, the component automatically re-renders

The component also optimizes the Blazor lifecycle:
- By default, triggers recomputation when parameters change (`RecomputeStateOnParameterChange`)
- Skips rendering when state is inconsistent (unless `RenderInconsistentState` is set)
- Controls which lifecycle render points trigger actual renders

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `Options` | `ComputedStateComponentOptions` | Flags controlling component behavior |
| `State` | `ComputedState<T>` | The auto-updating computed state |
| `ComputeState(CancellationToken)` | Abstract method | Override to define how state is computed |
| `GetStateOptions()` | Virtual method | Override to customize state options (initial value, category, etc.) |

### SynchronizationContext Differences

The flag `ComputeStateOnThreadPool` is relevant only on Blazor Server. Here's how `SynchronizationContext` behaves across hosting models:

- **Blazor Server**: Has a per-circuit `SynchronizationContext`; UI updates are automatically marshalled to the circuit dispatcher, so `StateHasChanged()` is safe to call from any thread.
- **Blazor WASM**: Single-threaded; no synchronization context is needed. All code already runs on the UI thread.
- **Auto/Hybrid**: Follows the active circuit type — Server behaviour when running as Server, WASM behaviour when running as WebAssembly.

By default, `ComputeState` runs on the Blazor dispatcher. Set `ComputeStateOnThreadPool` in `Options` to move the computation to the thread pool, which avoids blocking the dispatcher during long-running computations.

### ComputedStateComponentOptions Flags

| Flag | Description |
|------|-------------|
| `RecomputeStateOnParameterChange` | Triggers `State.Recompute()` when parameters change |
| `RenderInconsistentState` | Allows rendering even when state is invalidated |
| `UseParametersSetRenderPoint` | Render after `OnParametersSet` |
| `UseInitializedAsyncRenderPoint` | Render after `OnInitializedAsync` |
| `UseParametersSetAsyncRenderPoint` | Render after `OnParametersSetAsync` |
| `UseAllRenderPoints` | Combination of all render point flags |
| `ComputeStateOnThreadPool` | Run `ComputeState` on thread pool instead of Blazor's sync context |

### Default Options

`ComputedStateComponent.DefaultOptions` is set to `RecomputeStateOnParameterChange | UseAllRenderPoints`.


## ComputedRenderStateComponent&lt;T&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/ComputedRenderStateComponent.cs)

Extends `ComputedStateComponent<T>` with optimized rendering that tracks the last rendered state.

### Purpose

Prevents unnecessary re-renders by tracking which state snapshot was last rendered. If `ShouldRender` is called but the state hasn't changed since the last render, it returns `false`.

### How It Works

- Maintains a `RenderState` property that stores the last rendered `StateSnapshot`
- In `ShouldRender()`, compares the current state snapshot with `RenderState`
- Only returns `true` if the state has actually changed

This is useful for components that may receive multiple render requests but should only actually render when their data has changed.

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `RenderState` | `StateSnapshot` | The last rendered state snapshot |
| `IsRenderStateChanged()` | Method | Returns `true` if state has changed since last render |

### Default Options

`ComputedRenderStateComponent.DefaultOptions` is set to `RecomputeStateOnParameterChange` only (no extra render points needed).


## MixedStateComponent&lt;T, TMutableState&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/Components/MixedStateComponent.cs)

Extends `ComputedStateComponent<T>` to add a local `MutableState<TMutableState>` that the computed state depends on.

### Purpose

Handles the common pattern where a component has local UI state (like form inputs) that affects what data it displays. Changes to the mutable state automatically trigger recomputation of the computed state.

### How It Works

- Creates a `MutableState<TMutableState>` alongside the computed state
- Subscribes to the mutable state's `Updated` event
- When mutable state changes, calls `State.Recompute()` to immediately refresh the computed state (no update delay)

This means you don't need to manually call `MutableState.Use()` inside `ComputeState` &ndash; the dependency is automatically established.

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `MutableState` | `MutableState<TMutableState>` | Local mutable state for UI inputs |
| `CreateMutableState()` | Virtual method | Override to customize mutable state creation |
| `GetMutableStateOptions()` | Virtual method | Override to customize mutable state options |
| `SetMutableState(state)` | Method | Explicitly sets the mutable state |


## Using These Components

To have a component that automatically updates once the output of some Compute Service changes:

1. Inherit from `ComputedStateComponent<T>` (or `MixedStateComponent` if you need local state)
2. Override the `ComputeState` method to call your Compute Services
3. Optionally override `GetStateOptions` to configure initial value, update delayer, etc.

Check out the [Counter.razor example](https://github.com/ActualLab/Fusion.Samples/blob/master/src/HelloBlazorServer/Components/Pages/Counter.razor) from HelloBlazorServer sample to see this in action.


## Real-time UI in Server-Side Blazor Apps

For Server-Side Blazor, you need to:

- Add your Compute Services to the `IServiceProvider` used by ASP.NET Core
- Inherit your components from `ComputedStateComponent<T>` or `MixedStateComponent<T, TMutableState>`

See [HelloBlazorServer/Program.cs](https://github.com/ActualLab/Fusion.Samples/blob/master/src/HelloBlazorServer/Program.cs) for a complete example. The key parts are:

<!-- snippet: PartB_ServerSideBlazor_Services -->
```cs
public void ConfigureServerSideBlazorServices(IServiceCollection services)
{
    // Configure services
    var fusion = services.AddFusion();

    // Add your Fusion compute services
    fusion.AddFusionTime(); // Built-in time service
    fusion.AddService<CounterService>();
    fusion.AddService<WeatherForecastService>();

    // ASP.NET Core / Blazor services
    services.AddServerSideBlazor(o => o.DetailedErrors = true);
    services.AddRazorComponents().AddInteractiveServerComponents();
    fusion.AddBlazor();

    // Default update delay for ComputedStateComponents
    services.AddScoped<IUpdateDelayer>(_ => FixedDelayer.MinDelay);
}
```
<!-- endSnippet -->

And for the app configuration:

<!-- snippet: PartB_ServerSideBlazor_App -->
```cs
public void ConfigureServerSideBlazorApp(WebApplication app)
{
    app.UseFusionSession();
    app.UseRouting();
    app.UseAntiforgery();

    app.MapStaticAssets();
    app.MapRazorComponents<_HostPage>()
        .AddInteractiveServerRenderMode();
}
```
<!-- endSnippet -->

## Real-time UI in Blazor WebAssembly / Hybrid Apps

Modern Fusion apps use a hybrid approach where the same UI components can run in both Server-Side Blazor and WebAssembly modes. The server hosts the Compute Services and exposes them via RPC, while the client can consume them either directly (SSB) or via RPC clients (WASM).

See [TodoApp](https://github.com/ActualLab/Fusion.Samples/tree/master/src/TodoApp) or [Blazor Sample](https://github.com/ActualLab/Fusion.Samples/tree/master/src/Blazor) for complete examples.

### Server-side configuration

See [TodoApp/Host/Program.cs](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/Host/Program.cs) for a complete example. The key parts are:

<!-- snippet: PartB_Hybrid_ServerServices -->
```cs
public void ConfigureHybridServerServices(IServiceCollection services)
{
    // Fusion services with RPC server mode
    var fusion = services.AddFusion(RpcServiceMode.Server, true);
    var fusionServer = fusion.AddWebServer();

    // Add your Fusion compute services as servers
    fusion.AddServer<ITodoApi, TodoApi>();

    // ASP.NET Core / Blazor services
    services.AddServerSideBlazor(o => o.DetailedErrors = true);
    services.AddRazorComponents()
        .AddInteractiveServerComponents()
        .AddInteractiveWebAssemblyComponents();
    fusion.AddBlazor().AddAuthentication().AddPresenceReporter();
}
```
<!-- endSnippet -->

And for the app configuration:

<!-- snippet: PartB_Hybrid_ServerApp -->
```cs
public void ConfigureHybridServerApp(WebApplication app)
{
    app.UseWebSockets(new WebSocketOptions() {
        KeepAliveInterval = TimeSpan.FromSeconds(30),
    });
    app.UseFusionSession();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAntiforgery();

    // Razor components with both Server and WebAssembly render modes
    app.MapStaticAssets();
    app.MapRazorComponents<_HostPage>()
        .AddInteractiveServerRenderMode()
        .AddInteractiveWebAssemblyRenderMode()
        .AddAdditionalAssemblies(typeof(App).Assembly);

    // Fusion RPC endpoints
    app.MapRpcWebSocketServer();
}
```
<!-- endSnippet -->

### Client-side configuration (WebAssembly)

See [TodoApp/UI/Program.cs](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/Program.cs) and [ClientStartup.cs](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/ClientStartup.cs) for a complete example. The key parts are:

<!-- snippet: PartB_Wasm_Main -->
```cs
public async Task WasmMain(string[] args)
{
    var builder = WebAssemblyHostBuilder.CreateDefault(args);
    ConfigureWasmServices(builder.Services, builder);
    var host = builder.Build();
    await host.RunAsync();
}
```
<!-- endSnippet -->

<!-- snippet: PartB_Wasm_Services -->
```cs
public void ConfigureWasmServices(IServiceCollection services, WebAssemblyHostBuilder builder)
{
    // Fusion services
    var fusion = services.AddFusion();
    fusion.AddAuthClient();
    fusion.AddBlazor().AddAuthentication().AddPresenceReporter();

    // RPC clients for your services
    fusion.AddClient<ITodoApi>();

    // Configure WebSocket client to connect to the server
    fusion.Rpc.AddWebSocketClient(builder.HostEnvironment.BaseAddress);

    // Default update delay
    services.AddScoped<IUpdateDelayer>(c => new UpdateDelayer(c.UIActionTracker(), 0.25));
}
```
<!-- endSnippet -->

### _HostPage.razor

The host page is a Razor component that bootstraps the Blazor app. See [TodoApp/Host/Components/Pages/_HostPage.razor](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/Host/Components/Pages/_HostPage.razor) for an example. It handles:

- Determining the render mode (Static, Server, or WebAssembly)
- Setting up authentication state
- Passing the session ID to the app

### Switching Between Render Modes

Fusion provides `MapFusionRenderModeEndpoints()` to handle render mode switching. Users can switch between Server-Side Blazor and WebAssembly modes at runtime, and Fusion handles the session and authentication state transfer seamlessly.

Check out the [TodoApp Sample](https://github.com/ActualLab/Fusion.Samples/tree/master/src/TodoApp) or [Blazor Sample](https://github.com/ActualLab/Fusion.Samples/tree/master/src/Blazor) to see how all of this works together.


## What's Next

This document covered the core component base classes. For more advanced topics, see:

- **[Blazor Services](PartB-Services.md)**: Deep dive into `CircuitHub`, `JSRuntimeInfo`, `RenderModeHelper`, and `RenderModeDef`. Learn how to detect prerendering, manage render modes, and access services efficiently.

- **[Blazor Authentication](PartB-Auth.md)**: Complete guide to authentication in Blazor apps, including `AuthStateProvider`, `ClientAuthHelper`, `CascadingAuthState`, and the `PresenceReporter` for tracking active users.

- **[Parameter Comparison](PartB-Parameters.md)**: How Fusion optimizes Blazor component updates through custom parameter comparison. Covers `ParameterComparisonMode`, `ParameterComparer`, and customization options.

- **[Diagrams](PartB-D.md)**: Visual diagrams of component hierarchy, lifecycle, and data flow.

- **[Cheat Sheet](PartB-CS.md)**: Quick reference for common patterns.
