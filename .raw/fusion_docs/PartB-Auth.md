# Blazor Authentication

This document covers Fusion's Blazor authentication integration: `AuthState`, `AuthStateProvider`, `ClientAuthHelper`, `CascadingAuthState`, and `PresenceReporter`.

> **Note**: For the core authentication system (`IAuth`, `User`, `Session`), see [Authentication in Fusion](PartAA.md).


## Overview

Fusion's Blazor authentication integration provides:

- **Real-time authentication state** that updates automatically when auth changes
- **Seamless integration** with Blazor's `AuthenticationStateProvider`
- **Client-side auth helpers** for sign-in/sign-out flows
- **Presence tracking** to keep the server informed of active users


## AuthState

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/AuthState.cs)

`AuthState` extends Blazor's `AuthenticationState` with Fusion-specific information.

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `User` | `User?` | The authenticated Fusion user (or null) |
| `IsSignOutForced` | `bool` | True if a forced sign-out was triggered |

### Usage

```csharp
// In a component with cascading auth state
[CascadingParameter]
private Task<AuthState>? AuthStateTask { get; set; }

protected override async Task OnInitializedAsync()
{
    if (AuthStateTask != null) {
        var authState = await AuthStateTask;
        var user = authState.User;
        var isForced = authState.IsSignOutForced;
    }
}
```


## AuthStateProvider

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/AuthStateProvider.cs)

`AuthStateProvider` is Fusion's implementation of Blazor's `AuthenticationStateProvider`. It provides **real-time authentication state** that automatically updates when the user's authentication status changes.

### How It Works

1. Creates a `ComputedState<AuthState>` that tracks authentication
2. The state calls `IAuth.GetUser()` and `IAuth.IsSignOutForced()` as dependencies
3. When authentication changes on the server, these methods are invalidated
4. The state recomputes and notifies Blazor via `NotifyAuthenticationStateChanged`
5. Components using `AuthorizeView` or `[CascadingParameter]` auth state automatically update

### Configuration Options

```csharp
public record Options
{
    // Controls how quickly auth state updates after changes
    public IUpdateDelayer UpdateDelayer { get; init; }
        = new UpdateDelayer(NextTickState.NextTick, Delayer.Get(10));
}
```

### Key Properties and Methods

| Member | Type | Description |
|--------|------|-------------|
| `ComputedState` | `ComputedState<AuthState>` | The computed authentication state |
| `GetAuthenticationStateAsync()` | `Task<AuthenticationState>` | Standard Blazor method |

### Culture Preservation

Fusion's `AuthStateProvider` sets `FlowExecutionContext = true` on the internal `ComputedState<AuthState>`. This preserves the ambient `CultureInfo` (and `ExecutionContext` in general) across `await` points — important for apps that use per-user or per-request culture settings, so that the culture configured before an async call remains active when the continuation runs.

### Forced Sign-Out Handling

When `IsSignOutForced` becomes true, the `CascadingAuthState` component detects this and reloads the page. This ensures users are properly signed out even in WebAssembly mode.


## ClientAuthHelper

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/ClientAuthHelper.cs)

`ClientAuthHelper` provides client-side authentication operations, bridging Blazor components with Fusion auth services and JavaScript interop.

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Auth` | `IAuth` | Fusion authentication service |
| `Session` | `Session` | Current session |
| `Commander` | `ICommander` | For executing auth commands |
| `CachedSchemas` | `(string, string)[]?` | Cached authentication schemas |

### Key Methods

| Method | Description |
|--------|-------------|
| `GetSchemas()` | Gets available auth schemas from JavaScript |
| `SignIn(schema?)` | Initiates sign-in via JavaScript |
| `SignOut()` | Client-side sign-out via JavaScript |
| `SignOut(session, force)` | Server-side sign-out command |
| `SignOutEverywhere(force)` | Signs out all sessions for current user |
| `Kick(session, otherSessionHash, force)` | Kicks out a specific session |

### JavaScript Requirements

`ClientAuthHelper` expects these JavaScript functions to be defined:

```javascript
window.FusionAuth = {
    schemas: [
        { name: "Google", displayName: "Google" },
        { name: "Microsoft", displayName: "Microsoft" }
    ],
    signIn: function(schema) {
        // Redirect to auth provider
        window.location.href = `/signIn/${schema}`;
    },
    signOut: function() {
        // Redirect to sign-out endpoint
        window.location.href = '/signOut';
    }
};
```

### Usage Example

```razor
@inject ClientAuthHelper AuthHelper

<div class="auth-buttons">
    @if (User == null) {
        @foreach (var (name, displayName) in await AuthHelper.GetSchemas()) {
            <button @onclick="() => AuthHelper.SignIn(name)">
                Sign in with @displayName
            </button>
        }
    } else {
        <span>Welcome, @User.Name</span>
        <button @onclick="() => AuthHelper.SignOut()">Sign Out</button>
    }
</div>
```


## CascadingAuthState

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/CascadingAuthState.razor)

`CascadingAuthState` is a Blazor component that provides cascading authentication state to child components. It integrates with `AuthStateProvider` and optionally starts the `PresenceReporter`.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ChildContent` | `RenderFragment` | Required | Child content to render |
| `UsePresenceReporter` | `bool` | `false` | Start presence reporting when initialized |

### Behavior

1. Wraps children in `CascadingAuthenticationState`
2. Subscribes to `AuthStateProvider.AuthenticationStateChanged`
3. On auth state change:
   - If `IsSignOutForced`: Reloads the page
   - Otherwise: Updates the cascading value
4. Optionally starts `PresenceReporter`

### Usage

Typically placed in your `App.razor` or `Routes.razor`:

```razor
<CascadingAuthState UsePresenceReporter="true">
    <Router AppAssembly="typeof(App).Assembly">
        <Found Context="routeData">
            <AuthorizeRouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)">
                <NotAuthorized>
                    <RedirectToLogin />
                </NotAuthorized>
            </AuthorizeRouteView>
        </Found>
    </Router>
</CascadingAuthState>
```


## PresenceReporter

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/PresenceReporter.cs)

`PresenceReporter` is a background worker that periodically updates the user's presence on the server. This allows the server to know which users are actively using the application.

### Purpose

- **Active user tracking**: Server knows who's currently online
- **Session management**: Enables "kick inactive sessions" features
- **Real-time presence**: Powers "users online" indicators

### Configuration Options

```csharp
public record Options
{
    // How often to update presence (default: 3 minutes with 5% variance)
    public RandomTimeSpan UpdatePeriod { get; init; }
        = TimeSpan.FromMinutes(3).ToRandom(0.05);

    // Retry delays on failure (default: 10s, then 30s)
    public RetryDelaySeq RetryDelays { get; init; }
        = RetryDelaySeq.Exp(10, 30);

    // Clock provider
    public MomentClockSet? Clocks { get; init; }
}
```

### How It Works

1. Starts in background when `.Start()` is called
2. Gets the current session
3. Waits for `UpdatePeriod` (randomized to spread server load)
4. Calls `IAuth.UpdatePresence(session)` on the server
5. On success: Resets retry counter, waits for next period
6. On failure: Uses exponential backoff from `RetryDelays`
7. Continues until cancelled

### DI Registration

```csharp
services.AddFusion()
    .AddBlazor()
    .AddAuthentication()
    .AddPresenceReporter();  // Register PresenceReporter
```

### Starting the Reporter

**Option 1: Via CascadingAuthState** (Recommended)

```razor
<CascadingAuthState UsePresenceReporter="true">
    @* Your app content *@
</CascadingAuthState>
```

**Option 2: Manual Start**

```csharp
@inject PresenceReporter PresenceReporter

protected override void OnInitialized()
{
    PresenceReporter.Start();
}
```

### Server-Side Usage

On the server, you can query presence information:

```csharp
public class UserService : IComputeService
{
    private readonly IAuth _auth;

    [ComputeMethod]
    public virtual async Task<bool> IsUserOnline(string userId, CancellationToken ct = default)
    {
        // IAuth tracks presence via UpdatePresence calls
        var sessionInfo = await _auth.GetSessionInfo(userId, ct);
        return sessionInfo?.LastSeenAt > DateTime.UtcNow.AddMinutes(-5);
    }
}
```


## Complete Setup Example

### Server Configuration

```csharp
// Program.cs
var fusion = services.AddFusion(RpcServiceMode.Server, true);
var fusionServer = fusion.AddWebServer();

// Add your services
fusion.AddServer<IUserService, UserService>();

// Blazor + Authentication
services.AddServerSideBlazor();
services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

fusion.AddBlazor()
    .AddAuthentication()    // AuthStateProvider, ClientAuthHelper
    .AddPresenceReporter(); // PresenceReporter
```

### Client Configuration (WebAssembly)

```csharp
// Program.cs
var fusion = services.AddFusion();
fusion.AddAuthClient();
fusion.AddBlazor()
    .AddAuthentication()
    .AddPresenceReporter();

// RPC client
fusion.AddClient<IUserService>();
fusion.Rpc.AddWebSocketClient(builder.HostEnvironment.BaseAddress);
```

### App.razor

```razor
<CascadingAuthState UsePresenceReporter="true">
    <Router AppAssembly="typeof(App).Assembly">
        <Found Context="routeData">
            <AuthorizeRouteView RouteData="routeData"
                                DefaultLayout="typeof(MainLayout)">
                <NotAuthorized>
                    <p>You are not authorized.</p>
                </NotAuthorized>
            </AuthorizeRouteView>
        </Found>
        <NotFound>
            <p>Page not found.</p>
        </NotFound>
    </Router>
</CascadingAuthState>
```

### Using Auth State in Components

```razor
@inherits ComputedStateComponent<UserData>
@inject IUserService UserService

<AuthorizeView>
    <Authorized>
        @if (State.HasValue) {
            <p>Welcome, @State.Value.Name!</p>
            <p>You have @State.Value.UnreadMessages unread messages.</p>
        }
    </Authorized>
    <NotAuthorized>
        <p>Please sign in to continue.</p>
    </NotAuthorized>
</AuthorizeView>

@code {
    [CascadingParameter]
    private Task<AuthState>? AuthStateTask { get; set; }

    protected override async Task<UserData> ComputeState(CancellationToken ct)
    {
        var authState = await AuthStateTask!;
        if (authState.User == null)
            return UserData.Empty;

        return await UserService.GetUserData(authState.User.Id, ct);
    }
}
```
