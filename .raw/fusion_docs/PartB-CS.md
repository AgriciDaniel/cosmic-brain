# Blazor: Cheat Sheet

Quick reference for Fusion + Blazor.


## Configuration

Server-side Blazor:

```cs
services.AddFusion()
    .AddService<MyService>()
    .AddBlazor();

services.AddScoped<IUpdateDelayer>(_ => FixedDelayer.MinDelay);
```

Hybrid (Server + WASM) with auth:

```cs
services.AddFusion(RpcServiceMode.Server, true)
    .AddServer<IMyService, MyService>()
    .AddBlazor()
    .AddAuthentication()
    .AddPresenceReporter();
```

WebAssembly client:

```cs
services.AddFusion()
    .AddClient<IMyService>()
    .AddBlazor()
    .AddAuthentication()
    .AddPresenceReporter();
fusion.Rpc.AddWebSocketClient(baseAddress);

// Responsive update delayer
services.AddScoped<IUpdateDelayer>(c => new UpdateDelayer(c.UIActionTracker(), 0.25));
```

ASP.NET Core app configuration:

```cs
app.UseWebSockets();
app.UseFusionSession();
app.MapRpcWebSocketServer();
app.MapFusionRenderModeEndpoints();  // For render mode switching
```

Component default options:

```cs
ComputedStateComponent.DefaultOptions =
    ComputedStateComponentOptions.RecomputeStateOnParameterChange |
    ComputedStateComponentOptions.UseAllRenderPoints;

FusionComponentBase.DefaultParameterComparisonMode = ParameterComparisonMode.Custom;
```


## ComputedStateComponent&lt;T&gt;

Basic usage:

```razor
@inherits ComputedStateComponent<MyData>
@inject IMyService MyService

@if (State.HasValue) {
    <div>@State.Value.Name</div>
}

@code {
    [Parameter] public long Id { get; set; }

    protected override Task<MyData> ComputeState(CancellationToken cancellationToken)
        => MyService.Get(Id, cancellationToken);
}
```

Configure update delay:

```razor
@code {
    protected override ComputedState<MyData>.Options GetStateOptions()
        => new() {
            UpdateDelayer = FixedDelayer.Get(0.5), // 0.5 second delay
        };
}
```

Force immediate update:

```razor
@code {
    private async Task OnButtonClick() {
        await SomeAction();
        _ = State.Recompute(); // Trigger immediate recomputation
    }
}
```


## Handling Loading and Errors

```razor
@inherits ComputedStateComponent<MyData>

@if (!State.HasValue) {
    <Loading />
} else if (State.Error != null) {
    <Error Message="@State.Error.Message" />
} else {
    <Content Data="@State.Value" />
}
```


## Using LastNonErrorValue

Keep showing last valid data while error occurs:

```razor
@if (State.LastNonErrorValue is { } data) {
    <Content Data="@data" />
}
@if (State.Error != null) {
    <ErrorBanner Message="@State.Error.Message" />
}
```


## Multiple States (Tuple)

```razor
@inherits ComputedStateComponent<(User User, List<Order> Orders)>

@code {
    [Parameter] public long UserId { get; set; }

    protected override async Task<(User, List<Order>)> ComputeState(CancellationToken ct)
    {
        var user = await UserService.Get(UserId, ct);
        var orders = await OrderService.GetByUser(UserId, ct);
        return (user, orders);
    }
}
```


## MixedStateComponent (Forms)

```razor
@inherits MixedStateComponent<SearchResults, SearchForm>
@inject ISearchService SearchService

<input @bind="MutableState.Value.Query" @bind:event="oninput" />

@if (State.HasValue) {
    @foreach (var item in State.Value.Items) {
        <div>@item.Name</div>
    }
}

@code {
    protected override async Task<SearchResults> ComputeState(CancellationToken ct)
    {
        var form = MutableState.Value;
        return await SearchService.Search(form.Query, ct);
    }
}
```


## CircuitHub Access

```razor
@inherits CircuitHubComponentBase

@code {
    protected override void OnInitialized()
    {
        var session = Session;          // CircuitHub.Session
        var commander = UICommander;    // CircuitHub.UICommander
        var nav = Nav;                  // CircuitHub.Nav
        var js = JS;                    // CircuitHub.JS

        if (CircuitHub.IsPrerendering) {
            // Skip expensive operations
        }
    }
}
```


## UICommander

```razor
@code {
    // Execute command and get result
    var result = await UICommander.Call(new MyCommand(data));

    // Execute command with full metadata
    var actionResult = await UICommander.Run(new MyCommand(data));

    // Fire-and-forget (still tracks for instant updates)
    _ = UICommander.Run(new MyCommand(data));

    // Start without waiting
    var action = UICommander.Start(new MyCommand(data));
}
```


## IComputedState&lt;T&gt; vs ComputedState&lt;T&gt;

- **`IComputedState<T>`** — the interface; use it in method signatures, DI registrations, and unit tests to avoid coupling to a concrete type.
- **`ComputedState<T>`** — the abstract base class that implements the interface; extend it when you need a fully custom implementation.
- **`StateFactory.NewComputed<T>(options, compute)`** — the normal way to obtain a concrete, delegate-backed `ComputedState<T>` without subclassing.

## Authentication

```razor
<CascadingAuthState UsePresenceReporter="true">
    <Router AppAssembly="typeof(App).Assembly">
        <!-- ... -->
    </Router>
</CascadingAuthState>
```

Access auth state in components:

```razor
@code {
    [CascadingParameter]
    private Task<AuthState>? AuthStateTask { get; set; }

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthStateTask!;
        var user = authState.User; // Fusion User or null
    }
}
```


## Sign In/Out

```razor
@inject ClientAuthHelper AuthHelper

<button @onclick="() => AuthHelper.SignIn()">Sign In</button>
<button @onclick="() => AuthHelper.SignOut()">Sign Out</button>
```


## Render Mode Switching

```razor
@inject RenderModeHelper RenderModeHelper

<span>Mode: @RenderModeHelper.GetCurrentModeTitle()</span>

@foreach (var mode in RenderModeDef.All) {
    <button @onclick="() => RenderModeHelper.ChangeMode(mode)">
        @mode.Title
    </button>
}
```


## Parameter Comparison

```cs
// Per-component attribute
[FusionComponent(ParameterComparisonMode.Custom)]
public class MyComponent : ComputedStateComponent<MyData> { }

// Per-parameter comparer
[Parameter]
[ParameterComparer(typeof(ByValueParameterComparer))]
public MyStruct Value { get; set; }
```
