# Authentication in Fusion

Fusion provides a comprehensive authentication system that integrates with ASP.NET Core and provides real-time authentication state updates across all connected clients.

::: warning A Starting Point, Not a Final Solution
The authentication APIs in Fusion exist primarily to close a common gap — almost every application
needs some form of authentication. The OAuth implementation was added mostly to **demonstrate**
how authentication can work with Fusion's real-time model.

However, the underlying code is fairly complicated, especially for production use. It relies heavily
on generics and abstractions to cover many general cases, which adds significant complexity that
you may not need.

**Our recommendation**: Start with Fusion's authentication to get your app working quickly. As your
app matures, consider **[switching to standalone authentication](PartAA-X.md)** directly into your
project and simplifying it to match your specific needs. The
[Standalone Authentication PR](https://github.com/ActualLab/Fusion/pull/61)
demonstrates exactly this approach using the TodoApp sample — it removes all Fusion auth package
dependencies and replaces them with local, simplified types. This is exactly what we do in
[Voxt](https://voxt.ai) — the result is clearer code with far fewer abstractions.

You can use AI tools like Claude to help with this migration: point it at the
[Standalone Authentication PR](https://github.com/ActualLab/Fusion/pull/61) and your own codebase, and ask it to adapt the extracted types to
your app's needs.
:::

## Key Features

- **Real-time auth state**: Authentication changes instantly propagate to all connected clients
- **Session management**: Cookie-based sessions with optional tags and metadata
- **Multi-provider support**: Works with any ASP.NET Core authentication provider
- **Database or in-memory storage**: Production-ready persistence or quick prototyping
- **Multi-session support**: Users can manage sessions across devices
- **Presence tracking**: Know which users are currently active


## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.Fusion.Ext.Contracts](https://www.nuget.org/packages/ActualLab.Fusion.Ext.Contracts/) | Client-side: `IAuth`, `User`, `Session`, `SessionInfo` |
| [ActualLab.Fusion.Ext.Services](https://www.nuget.org/packages/ActualLab.Fusion.Ext.Services/) | Server-side: `InMemoryAuthService`, `DbAuthService`, `IAuthBackend` |
| [ActualLab.Fusion.Server](https://www.nuget.org/packages/ActualLab.Fusion.Server/) | Server-side: `SessionMiddleware`, `ServerAuthHelper`, auth endpoints |
| [ActualLab.Fusion.Blazor.Authentication](https://www.nuget.org/packages/ActualLab.Fusion.Blazor.Authentication/) | Blazor: `AuthStateProvider`, `ClientAuthHelper`, `CascadingAuthState` |
| [ActualLab.Fusion.EntityFramework](https://www.nuget.org/packages/ActualLab.Fusion.EntityFramework/) | Required for `DbAuthService` (database storage) |

::: tip
`ActualLab.Fusion.Server` automatically references `ActualLab.Fusion.Ext.Services` and `ActualLab.Fusion.Ext.Contracts`.
For Blazor apps, add `ActualLab.Fusion.Blazor.Authentication` which references `ActualLab.Fusion.Ext.Contracts`.
:::


## Documentation Structure

| Document | Description |
|----------|-------------|
| [Interfaces & Commands](PartAA-Interfaces.md) | Core APIs: `IAuth`, `IAuthBackend`, `User`, `Session`, commands |
| [Database Services](PartAA-DB.md) | `DbAuthService`, entity types, session trimmer |
| [Server Components](PartAA-Server.md) | `SessionMiddleware`, `ServerAuthHelper`, ASP.NET Core integration |
| [Standalone Authentication](PartAA-X.md) | Extracting auth into your own project for full control |
| [Diagrams](PartAA-D.md) | Architecture and flow diagrams |
| [Cheat Sheet](PartAA-CS.md) | Quick reference with code snippets |


## Quick Start

### 1. Register Authentication Services

```csharp
var fusion = services.AddFusion();
var fusionServer = fusion.AddWebServer();

// For production: database storage
fusion.AddDbAuthService<AppDbContext, long>();

// For development: in-memory storage
// fusion.AddInMemoryAuthService();
```

### 2. Configure ASP.NET Core Authentication

```csharp
services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddCookie(options => {
    options.LoginPath = "/signIn";
    options.LogoutPath = "/signOut";
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
}).AddGoogle(options => {
    options.ClientId = "...";
    options.ClientSecret = "...";
});
```

### 3. Configure App Pipeline

```csharp
app.UseFusionSession();
app.UseRouting();
app.UseAuthentication();

app.MapRpcWebSocketServer();
app.MapFusionAuthEndpoints();
```

### 4. Use in Components

```razor
@inherits ComputedStateComponent<User?>
@inject IAuth Auth
@inject Session Session

@if (State.Value?.IsAuthenticated() == true) {
    <p>Welcome, @State.Value.Name!</p>
}

@code {
    protected override Task<User?> ComputeState(CancellationToken ct)
        => Auth.GetUser(Session, ct);
}
```


## Core Concepts

### Session

A `Session` identifies a user's connection, stored in an HTTP-only cookie:

```csharp
public class Session : IHasId<string>
{
    public static Session Default { get; } = new("~");  // For WASM clients
    public string Id { get; }                            // Unique identifier
    public string Hash { get; }                          // Short hash for display
}
```

### IAuth vs IAuthBackend

| Interface | Purpose | Requires Session | RPC Exposed |
|-----------|---------|------------------|-------------|
| `IAuth` | Client-facing queries and commands | Yes | Yes |
| `IAuthBackend` | Server-side modifications | No | No |

### Authentication Flow

1. User clicks "Sign In" -> Redirects to OAuth provider
2. Provider authenticates -> Redirects back with tokens
3. `ServerAuthHelper.UpdateAuthState()` syncs ASP.NET Core auth to Fusion
4. `IAuth.GetUser()` returns the authenticated user
5. All components depending on auth state automatically update


## Fusion Session

One of the important elements in this authentication system is Fusion's own session. A session is essentially a string value, that is stored in HTTP only cookie. If the client sends this cookie with a request then we use the session specified there; if not, `SessionMiddleware` creates it.

To enable Fusion session we need to call `UseFusionSession` inside the `Configure` method of the `Startup` class.
This adds `SessionMiddleware` to the request pipeline. The actual class contains a bit more logic, but the important parts for now are the following:

```cs
public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
{
    if (Settings.RequestFilter.Invoke(httpContext))
        SessionResolver.Session = await GetOrCreateSession(httpContext).ConfigureAwait(false);
    await next(httpContext).ConfigureAwait(false);
}

public virtual Session? GetSession(HttpContext httpContext)
{
    var cookies = httpContext.Request.Cookies;
    var cookieName = Settings.Cookie.Name ?? "";
    cookies.TryGetValue(cookieName, out var sessionId);
    return sessionId.IsNullOrEmpty() ? null : new Session(sessionId);
}

public virtual async Task<Session> GetOrCreateSession(HttpContext httpContext)
{
    var cancellationToken = httpContext.RequestAborted;
    var originalSession = GetSession(httpContext);
    var session = originalSession;
    if (session is not null && Auth is not null) {
        try {
            var isSignOutForced = await Auth.IsSignOutForced(session, cancellationToken).ConfigureAwait(false);
            if (isSignOutForced) {
                await Settings.ForcedSignOutHandler(this, httpContext).ConfigureAwait(false);
                session = null;
            }
        }
        catch (Exception e) when (!e.IsCancellationOf(cancellationToken)) {
            Log.LogError(e, "Session is unavailable: {Session}", session);
            session = null;
        }
    }
    session ??= Session.New();
    session = Settings.TagProvider?.Invoke(session, httpContext) ?? session;
    if (Settings.AlwaysUpdateCookie || session != originalSession) {
        var cookieName = Settings.Cookie.Name ?? "";
        var responseCookies = httpContext.Response.Cookies;
        responseCookies.Append(cookieName, session.Id, Settings.Cookie.Build(httpContext));
    }
    return session;
}
```

See [SessionMiddleware.cs:54](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Middlewares/SessionMiddleware.cs#L54) for the actual source.

The `Session` class in itself is very simple, it stores a single `string Id` value. Besides that, `Session` overrides equality &ndash; they're compared by `Id`.

```cs
public sealed class Session : IHasId<string>, IEquatable<Session>,
    IConvertibleTo<string>
{
    public static Session Null { get; } = null!; // To gracefully bypass some nullability checks
    public static Session Default { get; } = new("~"); // We'll cover this later

    [DataMember(Order = 0)]
    public string Id { get; }
    ...
}
```

When you call `services.AddFusion()`, core session services are registered in your dependency injection container:

```cs
services.AddScoped<ISessionResolver>(c => new SessionResolver(c));
services.AddScoped(c => c.GetRequiredService<ISessionResolver>().Session);
```

Here is what you need to know about these services:

- `ISessionResolver` keeps track of the current session and allows to get/set it
- `Session` is registered as a scoped service &ndash; it's mapped to the session resolved by `ISessionResolver`: `c => c.GetRequiredService<ISessionResolver>().Session`.

We'll cover how they're used in Blazor apps later, for now let's just remember they exist.

# Authentication services in the backend application

`Session`'s role is quite similar to ASP.NET sessions &ndash; it allows to identify everything related to the current user. Technically it's up to you what to associate with it, but Fusion's built-in services address a single kind of this information: authentication info.

If the session is authenticated, it allows you to get the user information, claims associated with this user, etc.
On the server side the following Fusion services interact with authentication data.

- `InMemoryAuthService`
- `DbAuthService<...>`

They implement the same interfaces, so they can be used interchangeably &ndash; the only difference between them is where they store the data: in memory on in the database. `InMemoryAuthService` is there primarily for debugging or quick prototyping &ndash; you don't want to use it in the real app.

Speaking of interfaces, these services implement two of them:
[`IAuth`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/IAuth.cs) and [`IAuthBackend`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/IAuthBackend.cs). The first one is intended to be used on the client; the second one must be used on the server side.

The key difference is:

- `IAuth` allows to just read the data associated with the current session
- `IAuthBackend` allows to modify it and read the information about any user.

This, btw, is a recommended way for designing Fusion services:

- `IXxx` is your front-end, it gets `Session` as the very first parameter and provides only the data current user is allowed to access
- `IXxxBackend` doesn't require `Session` and allows to access everything.

When you add authentication, `InMemoryAuthService` is registered as `IAuth` and `IAuthBackend` implementation by default. In order to register the `DbAuthService` in the DI container, we need to call the `AddAuthentication` method in a similar way
to the following code snippet.

The Operations Framework is also needed for any of these services &ndash;
hopefully you read [Part 5](./PartO.md), which covers it.

<!-- snippet: PartO_AddDbContextServices -->
```cs
public static void ConfigureServices(IServiceCollection services, IHostEnvironment Env)
{
    services.AddDbContextServices<AppDbContext>(db => {
        // Uncomment if you'll be using AddRedisOperationLogWatcher
        // db.AddRedisDb("localhost", "FusionDocumentation.PartO");

        db.AddOperations(operations => {
            // This call enabled Operations Framework (OF) for AppDbContext.
            operations.ConfigureOperationLogReader(_ => new() {
                // We use AddFileSystemOperationLogWatcher, so unconditional wake up period
                // can be arbitrary long – all depends on the reliability of Notifier-Monitor chain.
                // See what .ToRandom does – most of timeouts in Fusion settings are RandomTimeSpan-s,
                // but you can provide a normal one too – there is an implicit conversion from it.
                CheckPeriod = TimeSpan.FromSeconds(Env.IsDevelopment() ? 60 : 5).ToRandom(0.05),
            });
            // Optionally enable file-based operation log watcher
            operations.AddFileSystemOperationLogWatcher();

            // Or, if you use PostgreSQL, use this instead of above line
            // operations.AddNpgsqlOperationLogWatcher();

            // Or, if you use Redis, use this instead of above line
            // operations.AddRedisOperationLogWatcher();
        });
    });
}
```
<!-- endSnippet -->

Our `DbContext` needs to contain `DbSet`-s for the classes provided here as type parameters.
The `DbSessionInfo` and `DbUser` classes are very simple entities provided by Fusion for storing authentication data.

<!-- snippet: PartAA_AppDbContext -->
```cs
public DbSet<DbUser<long>> Users { get; protected set; } = null!;
public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;
```
<!-- endSnippet -->

These entity types are defined in:
- [`DbSessionInfo`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbSessionInfo.cs) &ndash; stores sessions, which (if authenticated) can be associated with a `DbUser`
- [`DbUser`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbUser.cs) &ndash; stores user information
- [`DbUserIdentity`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbUserIdentity.cs) &ndash; stores user identities (e.g., OAuth providers)

## Using session in Compute Services for authorization

Our Compute Services can receive a `Session` object that we can use to decide if we are authenticated or not and who the signed in user is:

<!-- snippet: PartAA_GetMyOrders -->
```cs
[ComputeMethod]
public virtual async Task<List<OrderHeaderDto>> GetMyOrders(Session session, CancellationToken cancellationToken = default)
{
    // We assume that _auth is of IAuth type here.
    var user = await _auth.GetUser(session, cancellationToken).Require();
    if (await CanReadOrders(user, cancellationToken)) {
        // Read orders
    }
    return new List<OrderHeaderDto>();
}
```
<!-- endSnippet -->

`.Require()` here throws an error if the user is `null`.

`GetUser` and all other `IAuth` and `IAuthBackend` methods are compute methods, which means that the result of `GetMyOrders` call will invalidate once you sign-in into the provided `session` or sign out &ndash; generally, whenever a change that impacts on their result happens.

## Synchronizing Fusion and ASP.NET Core authentication states

If you look at `IAuth` and `IAuthBackend` APIs, it's easy to conclude there is no authentication per se:

- `IAuth` allows to retrieve the authentication state &ndash; i.e. get `SessionInfo`, `User` and session options (key-value pairs represented as `ImmutableOptionSet`) associated with a `Session`
- `IAuthBackend`, on contrary, allows to set them.

So in fact, these APIs just maintain the authentication state. It's assumed that you authenticate users using something else, and use these services in "Fusion world" to access the authentication info. Since these are compute services, they'll ensure that compute services calling them will invalidate their results once authentication info changes.

The proposed way to sync the authentication state between ASP.NET Core and Fusion is to embed this logic into `_HostPage.razor`, which serves as the root component for your Blazor app. The authentication state is synced from ASP.NET Core to Fusion right when the page loads. When user signs in or signs out, `_HostPage.razor` gets loaded by the end of any of these flows, so it's the best place to sync.

The synchronization is done by the `ServerAuthHelper.UpdateAuthState` method. [`ServerAuthHelper`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Authentication/ServerAuthHelper.cs) is a built-in Fusion helper doing exactly what's described above. It compares the authentication state exposed by `IAuth` for the current `Session` vs the state exposed in `HttpContext` and calls `IAuthBackend.SignIn()` / `IAuthBackend.SignOut` to sync it.

The following code snippet shows how you embed it into `_HostPage.razor`:

```xml
@using ActualLab.Fusion.Blazor
@using ActualLab.Fusion.Server.Authentication
@using ActualLab.Fusion.Server.Endpoints

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Fusion App</title>
    <base href="/" />
    <script src="_content/ActualLab.Fusion.Blazor.Authentication/scripts/fusionAuth.js"></script>
    <script>
        window.FusionAuth.schemas = "@_authSchemas";
    </script>
    <HeadOutlet @rendermode="@(_renderMode?.Mode)" />
</head>
<body>
    <App @rendermode="@(_renderMode?.Mode)" SessionId="@_sessionId" RenderModeKey="@(_renderMode?.Key)"/>
    <script src="_framework/blazor.web.js"></script>
</body>
</html>

@code {
    private bool _isInitialized;
    private RenderModeDef? _renderMode;
    private string _authSchemas = "";
    private string _sessionId = "";

    [Inject] private ServerAuthHelper ServerAuthHelper { get; init; } = null!;
    [CascadingParameter] private HttpContext HttpContext { get; set; } = null!;

    public override async Task SetParametersAsync(ParameterView parameters)
    {
        if (!_isInitialized) {
            _isInitialized = true;
            parameters.SetParameterProperties(this);
            if (HttpContext.AcceptsInteractiveRouting())
                _renderMode = RenderModeEndpoint.GetRenderMode(HttpContext);
            await ServerAuthHelper.UpdateAuthState(HttpContext);
            _authSchemas = await ServerAuthHelper.GetSchemas(HttpContext);
            _sessionId = ServerAuthHelper.Session.Id;
        }
        await base.SetParametersAsync(parameters);
    }
}
```

Notice that it assumes there is [`fusionAuth.js`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/wwwroot/scripts/fusionAuth.js) &ndash; a small script embedded into `ActualLab.Fusion.Blazor.Authentication` assembly, which is responsible for opening authentication window or performing a redirect.

Besides that, you need to add a couple extras to your ASP.NET Core app service container configuration:

<!-- snippet: PartAA_ServiceConfiguration -->
```cs
public void ConfigureServices(IServiceCollection services, IHostEnvironment Env)
{
    var fusion = services.AddFusion();
    var fusionServer = fusion.AddWebServer();
    fusionServer.AddAuthEndpoints();
    fusion.AddDbAuthService<AppDbContext, string>();
    fusionServer.ConfigureAuthEndpoint(_ => new() {
        // Set to the desired one
        DefaultSignInScheme = MicrosoftAccountDefaults.AuthenticationScheme,
        SignInPropertiesBuilder = (_, properties) => {
            properties.IsPersistent = true;
        }
    });
    fusionServer.ConfigureServerAuthHelper(_ => new() {
        // These are the claims mapped to User.Name once a new
        // User is created on sign-in; if they absent or this list
        // is empty, ClaimsPrincipal.Identity.Name is used.
        NameClaimKeys = [],
    });

    // Configure ASP.NET Core authentication providers:
    services.AddAuthentication(options => {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    }).AddCookie(options => {
        // You can use whatever you prefer to store the authentication info
        // in ASP.NET Core, this specific example uses a cookie.
        options.LoginPath = "/signIn"; // Mapped to
        options.LogoutPath = "/signOut";
        if (Env.IsDevelopment())
            options.Cookie.SecurePolicy = CookieSecurePolicy.None;
        // This controls the expiration time stored in the cookie itself
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
        options.SlidingExpiration = true;
        // And this controls when the browser forgets the cookie
        options.Events.OnSigningIn = ctx => {
            ctx.CookieOptions.Expires = DateTimeOffset.UtcNow.AddDays(28);
            return Task.CompletedTask;
        };
    }).AddGitHub(options => {
        // Again, this is just an example of using GitHub account
        // OAuth provider to authenticate. There is nothing specific
        // to Fusion in the code below.
        options.ClientId = "...";
        options.ClientSecret = "...";
        options.Scope.Add("read:user");
        options.Scope.Add("user:email");
        options.CorrelationCookie.SameSite = SameSiteMode.Lax;
    });
}
```
<!-- endSnippet -->

Notice that we use `/signIn` and `/signOut` paths above &ndash; they're mapped to the Fusion's [`AuthController`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Controllers/AuthController.cs).

If you want to use some other logic for these actions, you can map them to similar actions in another controller & update the paths (+ set `window.FusionAuth.signInPath` and `window.FusionAuth.signInPath` in JS as well), or replace this controller. There is a handy helper for this: `services.AddFusion().AddServer().AddControllerFilter(...)`.

And finally, you need a bit of extras in app configuration:

<!-- snippet: PartAA_AppConfiguration -->
```cs
public void ConfigureApp(WebApplication app)
{
    app.UseWebSockets(new WebSocketOptions() {
        KeepAliveInterval = TimeSpan.FromSeconds(30),
    });
    app.UseFusionSession();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAntiforgery();

    // Razor components
    app.MapStaticAssets();
    app.MapRazorComponents<_HostPage>()
        .AddInteractiveServerRenderMode()
        .AddInteractiveWebAssemblyRenderMode()
        .AddAdditionalAssemblies(typeof(App).Assembly);

    // Fusion endpoints
    app.MapRpcWebSocketServer();
    app.MapFusionAuthEndpoints();
    app.MapFusionRenderModeEndpoints();
}
```
<!-- endSnippet -->

## Using Fusion authentication in a Blazor WASM components

As you know, client-side Compute Service Clients have the same interface as their server-side Compute Service counterparts, so the client needs to pass the `Session` as an argument for methods that require it. However the `Session` is stored in a http-only cookie, so the client can't read its value directly. This is intentional &ndash; since `Session` allows anyone to impersonate as a user associated with it, ideally we don't want it to be available on the client side.

Fusion uses so-called "default session" to make it work. Let's quote the beginning of `Session` class code again:

```cs
public sealed class Session : IHasId<Symbol>, IEquatable<Session>,
    IConvertibleTo<string>, IConvertibleTo<Symbol>
{
    public static Session Null { get; } = null!; // To gracefully bypass some nullability checks
    public static Session Default { get; } = new("~"); // Default session

    // ...
}
```

Default session is a specially named `Session` which is automatically substituted by [`RpcDefaultSessionReplacer`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Rpc/RpcDefaultSessionReplacer.cs) middleware to the one provided by `ISessionResolver`. In other words, if you pass `Session.Default` as an argument to some Compute Service client, it will get its true value on the server side.

All of this means your Blazor WASM client doesn't need to know the actual `Session` value to work &ndash; all you need is to configure `ISessionResolver` there to return `Session.Default` as the current session.

And you want your Blazor components to work on Blazor Server, you need to use the right `Session`, which is available there.

Now, if you still remember the beginning of this document, there is a number of services managing `Session` in Fusion:

```cs
services.AddScoped<ISessionResolver>(c => new SessionResolver(c));
services.AddScoped(c => c.GetRequiredService<ISessionResolver>().Session);
```

So all we need is to make `ISessionResolver` to resolve `Session.Default` on the Blazor WASM client. The modern way to do this is to inherit your `App.razor` from `CircuitHubComponentBase`:

```xml
@using ActualLab.OS
@inherits CircuitHubComponentBase

<CascadingAuthState UsePresenceReporter="true">
    <Router AppAssembly="@typeof(Program).Assembly">
        <Found Context="routeData">
            <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)"/>
        </Found>
        <NotFound>
            <LayoutView Layout="@typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>
            </LayoutView>
        </NotFound>
    </Router>
</CascadingAuthState>

@code {
    private ISessionResolver SessionResolver => CircuitHub.SessionResolver;

    [Parameter] public string SessionId { get; set; } = "";
    [Parameter] public string RenderModeKey { get; set; } = "";

    protected override void OnInitialized()
    {
        if (OSInfo.IsWebAssembly) {
            // RPC auto-substitutes Session.Default to the cookie-based one on the server side
            SessionResolver.Session = Session.Default;
            // That's how WASM app starts hosted services
            var rootServices = Services.Commander().Services;
            _ = rootServices.HostedServices().Start();
        }
        else {
            SessionResolver.Session = new Session(SessionId);
        }
        if (CircuitHub.IsInteractive)
            CircuitHub.Initialize(this.GetDispatcher(), RenderModeDef.GetOrDefault(RenderModeKey));
    }
}
```

You can see that when this component is initialized, it sets `SessionResolver.Session` to the value it gets as a parameter &ndash; unless we're running Blazor WASM. In this case it sets it to `Session.Default`. Any attempt to resolve `Session` (either via `ISessionResolver`, or via service provider) will return this value.

The `CircuitHubComponentBase` base class provides access to `CircuitHub`, which manages Blazor circuit lifecycle and session resolution.

You may notice that `App.razor` wraps its content into [`CascadingAuthState`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/CascadingAuthState.razor), which makes Blazor authentication to work as expected as well by embedding its `ChildContent` into Blazor's `<CascadingAuthenticationState>`.

As shown in the `_HostPage.razor` example above, the `SessionId` and `RenderModeKey` parameters are passed directly to the `App` component:

```xml
<App @rendermode="@(_renderMode?.Mode)" SessionId="@_sessionId" RenderModeKey="@(_renderMode?.Key)"/>
```

This passes the session ID from the server-side authentication state to the `App.razor` component, which then uses it to initialize `SessionResolver.Session`.

Ok, now all preps are done, and we're ready to write our first Blazor component relying on `IAuth`:

```xml
@page "/myOrders"
@inherits ComputedStateComponent<List<OrderHeaderDto>>
@inject IOrderService OrderService
@inject IAuth Auth
@inject Session Session // We resolve the Session via DI container
@{
    var orders = State.Value;
}

// Rendering orders

@code {
    protected override async Task<List<OrderHeader>> ComputeState(CancellationToken cancellationToken)
    {
        var user = await Auth.GetUser(Session, cancellationToken).Require();

        if (!user.Claims.ContainsKey("required-claim"))
            return new List<OrderHeader>();

        return await OrderService.GetMyOrders(Session, cancellationToken);
    }
}
```

## Signing out

Fusion's authentication state is synced once `_HostPage.razor` is loaded. Since this happens on almost any request, typical sign-out flow implies:

- First, you run a regular sign-out by e.g. redirecting a browser to `~/signOut` page
- Second, you redirect the browser to some regular page, which loads `_HostPage.razor`.

Since Fusion auth state change instantly hits all the clients, you can do all of this in e.g. a separate window &ndash; this is enough to make sure every browser window that shares the same session gets signed out.

[`ClientAuthHelper`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/ClientAuthHelper.cs) is a helper embedded into `ActualLab.Fusion.Blazor` that helps to run these flows by triggering corresponding methods on `window.fusionAuth`.

This is how `Authentication.razor` page in `TodoApp` template uses it:

```xml
<Button Color="Color.Warning"
        @onclick="_ => ClientAuthHelper.SignOut()">Sign out</Button>
<Button Color="Color.Danger"
        @onclick="_ => ClientAuthHelper.SignOutEverywhere()">Sign out everywhere</Button>
```

And if you are curious, `SignOutEverywhere()` signs out _every_ session of the current user. This is possible, since `IAuthBackend` actually has a method allowing to enumerate these sessions. Because... Why not?


## What's Next

- [Interfaces & Commands](PartAA-Interfaces.md) - Deep dive into `IAuth`, `IAuthBackend`, `User`, `Session`, and commands
- [Database Services](PartAA-DB.md) - Configure `DbAuthService`, customize entities, and manage sessions
- [Server Components](PartAA-Server.md) - Understand `SessionMiddleware`, `ServerAuthHelper`, and ASP.NET Core integration
- [Standalone Authentication](PartAA-X.md) - Extract auth into your own project for full control
- [Diagrams](PartAA-D.md) - Visual architecture and flow diagrams
- [Cheat Sheet](PartAA-CS.md) - Quick reference with common patterns
