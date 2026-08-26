# Server-Side Authentication

This document covers server-side authentication components: `SessionMiddleware`, `ServerAuthHelper`, and ASP.NET Core integration.


## Overview

Fusion's server-side authentication bridges ASP.NET Core's authentication with Fusion's auth services:

| Component | Purpose |
|-----------|---------|
| `SessionMiddleware` | Manages session cookies |
| `ServerAuthHelper` | Syncs ASP.NET Core auth state with Fusion |
| `AuthController` | Handles sign-in/sign-out HTTP endpoints |
| `RpcDefaultSessionReplacer` | Replaces `Session.Default` with real sessions in RPC calls |


## SessionMiddleware

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Middlewares/SessionMiddleware.cs)

Manages session cookies and resolves the current session for each request.

### How It Works

1. Reads the session ID from the cookie
2. Validates the session (checks for forced sign-out)
3. Creates a new session if needed
4. Sets the session on `ISessionResolver`
5. Updates the cookie

### Configuration

```csharp
// In Program.cs
var fusion = services.AddFusion();
var fusionServer = fusion.AddWebServer();

fusionServer.ConfigureSessionMiddleware(_ => new SessionMiddleware.Options() {
    Cookie = new CookieBuilder() {
        Name = "FusionAuth.SessionId",
        IsEssential = true,
        HttpOnly = true,
        SameSite = SameSiteMode.Lax,
        Expiration = TimeSpan.FromDays(28),
    },
    AlwaysUpdateCookie = true,  // Refresh cookie expiration on each request
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `Cookie` | `CookieBuilder` | See below | Cookie configuration |
| `AlwaysUpdateCookie` | `bool` | `true` | Refresh cookie on every request |
| `RequestFilter` | `Func<HttpContext, bool>` | `_ => true` | Filter which requests get sessions |
| `ForcedSignOutHandler` | `Func<...>` | Redirect + reload | Handle forced sign-out |
| `TagProvider` | `Func<Session, HttpContext, Session>?` | `null` | Add tags to sessions |

### Default Cookie Settings

```csharp
Cookie = new CookieBuilder() {
    Name = "FusionAuth.SessionId",
    IsEssential = true,
    HttpOnly = true,
    SameSite = SameSiteMode.Lax,
    Expiration = TimeSpan.FromDays(28),
}
```

### App Configuration

```csharp
// In Program.cs / Configure
app.UseFusionSession();  // Must be before UseRouting
app.UseRouting();
app.UseAuthentication();
// ...
```

### Custom Forced Sign-Out Handler

```csharp
fusionServer.ConfigureSessionMiddleware(_ => new SessionMiddleware.Options() {
    ForcedSignOutHandler = async (middleware, httpContext) => {
        await httpContext.SignOutAsync();
        httpContext.Response.Redirect("/logged-out");
        return true;  // true = stop processing, false = continue to next middleware
    },
});
```

### Session Tags

Add metadata to sessions based on the request:

```csharp
fusionServer.ConfigureSessionMiddleware(_ => new SessionMiddleware.Options() {
    TagProvider = (session, httpContext) => {
        var tenant = httpContext.Request.Headers["X-Tenant"].FirstOrDefault();
        return tenant != null ? session.WithTag("tenant", tenant) : session;
    },
});
```


## ServerAuthHelper

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Authentication/ServerAuthHelper.cs)

Synchronizes ASP.NET Core authentication state with Fusion's auth services.

### How It Works

1. Compares `HttpContext.User` (ASP.NET Core) with `IAuth.GetUser()` (Fusion)
2. If different, calls `IAuthBackend.SignIn()` or `Auth_SignOut` to sync
3. Updates presence information

### Configuration

```csharp
fusionServer.ConfigureServerAuthHelper(_ => new ServerAuthHelper.Options() {
    IdClaimKeys = [ClaimTypes.NameIdentifier],
    NameClaimKeys = [ClaimTypes.Name, "preferred_username"],
    CloseWindowRequestPath = "/fusion/close",
    SessionInfoUpdatePeriod = TimeSpan.FromSeconds(30),
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `IdClaimKeys` | `string[]` | `[NameIdentifier]` | Claims to use for user ID |
| `NameClaimKeys` | `string[]` | `[Name]` | Claims to use for display name |
| `CloseWindowRequestPath` | `string` | `"/fusion/close"` | Path for close-window flow |
| `SessionInfoUpdatePeriod` | `TimeSpan` | `30s` | Min time between session updates |
| `AllowSignIn` | `Func<...>` | `AllowAnywhere` | When to allow sign-in |
| `AllowChange` | `Func<...>` | `AllowOnCloseWindowRequest` | When to allow user change |
| `AllowSignOut` | `Func<...>` | `AllowOnCloseWindowRequest` | When to allow sign-out |

### Usage in _HostPage.razor

```razor
@code {
    [Inject] private ServerAuthHelper ServerAuthHelper { get; init; } = null!;
    [CascadingParameter] private HttpContext HttpContext { get; set; } = null!;

    public override async Task SetParametersAsync(ParameterView parameters)
    {
        if (!_isInitialized) {
            _isInitialized = true;
            parameters.SetParameterProperties(this);

            // Sync ASP.NET Core auth with Fusion
            await ServerAuthHelper.UpdateAuthState(HttpContext);

            // Get available auth schemas for sign-in UI
            _authSchemas = await ServerAuthHelper.GetSchemas(HttpContext);

            // Get session ID for passing to App component
            _sessionId = ServerAuthHelper.Session.Id;
        }
        await base.SetParametersAsync(parameters);
    }
}
```

### Key Methods

| Method | Description |
|--------|-------------|
| `UpdateAuthState(HttpContext)` | Syncs auth state from ASP.NET Core to Fusion |
| `GetSchemas(HttpContext)` | Gets available authentication schemas |
| `IsCloseWindowRequest(HttpContext)` | Checks if request is the close-window callback |

### Sign-In/Sign-Out Flow Control

By default, sign-in is allowed anywhere, but sign-out and user switching only happen on the "close window" request path:

```csharp
// Custom flow control
fusionServer.ConfigureServerAuthHelper(_ => new ServerAuthHelper.Options() {
    // Always allow sign-in (when HttpContext.User is authenticated)
    AllowSignIn = (helper, ctx) => true,

    // Only allow sign-out on specific path
    AllowSignOut = (helper, ctx) =>
        ctx.Request.Path.StartsWithSegments("/auth"),

    // Only allow user change (switch accounts) on specific path
    AllowChange = (helper, ctx) =>
        ctx.Request.Path.StartsWithSegments("/auth"),
});
```


## AuthController

Fusion provides a built-in controller for authentication endpoints.

### Default Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signIn` | GET | Redirects to OAuth provider |
| `/signIn/{schema}` | GET | Sign in with specific provider |
| `/signOut` | GET | Signs out and redirects |

### Configuration

```csharp
fusionServer.ConfigureAuthEndpoint(_ => new AuthEndpoint.Options() {
    DefaultSignInScheme = MicrosoftAccountDefaults.AuthenticationScheme,
    SignInPropertiesBuilder = (_, properties) => {
        properties.IsPersistent = true;
        properties.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(28);
    },
    DefaultSignOutPath = "/",
});
```

### App Configuration

```csharp
app.MapFusionAuthEndpoints();  // Maps /signIn, /signOut, etc.
```

### Custom Controller

```csharp
[Route("auth")]
public class CustomAuthController : Controller
{
    [HttpGet("login/{schema?}")]
    public async Task<IActionResult> SignIn(string? schema = null)
    {
        schema ??= "Google";
        var properties = new AuthenticationProperties {
            RedirectUri = "/",
            IsPersistent = true,
        };
        return Challenge(properties, schema);
    }

    [HttpGet("logout")]
    public async Task<IActionResult> SignOut()
    {
        await HttpContext.SignOutAsync();
        return Redirect("/");
    }
}

// Disable built-in controller
fusionServer.AddControllerFilter(t => t != typeof(AuthController));
```


## RpcDefaultSessionReplacer

Automatically replaces `Session.Default` with the real session in RPC calls.

### How It Works

1. Client sends `Session.Default` (`"~"`) in RPC call parameters
2. Server middleware intercepts the call
3. Looks up real session from `ISessionResolver`
4. Replaces `Session.Default` with real session
5. Processes the call

### Registration

Automatically registered when you call `fusion.AddWebServer()`.


## Complete Server Setup

### Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add Fusion
var fusion = services.AddFusion(RpcServiceMode.Server, true);
var fusionServer = fusion.AddWebServer();

// Add database auth service
fusion.AddDbAuthService<AppDbContext, long>();

// Configure auth endpoints
fusionServer.ConfigureAuthEndpoint(_ => new AuthEndpoint.Options() {
    DefaultSignInScheme = GoogleDefaults.AuthenticationScheme,
});

// Configure session middleware
fusionServer.ConfigureSessionMiddleware(_ => new SessionMiddleware.Options() {
    Cookie = new CookieBuilder() {
        Name = "MyApp.Session",
        HttpOnly = true,
        SameSite = SameSiteMode.Lax,
        Expiration = TimeSpan.FromDays(30),
    },
});

// Configure server auth helper
fusionServer.ConfigureServerAuthHelper(_ => new ServerAuthHelper.Options() {
    NameClaimKeys = [ClaimTypes.Name, "name", "preferred_username"],
});

// Add ASP.NET Core authentication
services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie(options => {
    options.LoginPath = "/signIn";
    options.LogoutPath = "/signOut";
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
    options.SlidingExpiration = true;
})
.AddGoogle(options => {
    options.ClientId = "your-client-id";
    options.ClientSecret = "your-client-secret";
});

// Blazor and other services...

var app = builder.Build();

// Middleware order matters!
app.UseWebSockets();
app.UseFusionSession();     // Session handling
app.UseRouting();
app.UseAuthentication();    // ASP.NET Core auth
app.UseAuthorization();
app.UseAntiforgery();

// Static files and Blazor
app.MapStaticAssets();
app.MapRazorComponents<_HostPage>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode();

// Fusion endpoints
app.MapRpcWebSocketServer();
app.MapFusionAuthEndpoints();
app.MapFusionRenderModeEndpoints();

app.Run();
```

### _HostPage.razor

```razor
@using ActualLab.Fusion.Blazor
@using ActualLab.Fusion.Server.Authentication
@using ActualLab.Fusion.Server.Endpoints

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <base href="/" />
    <script src="_content/ActualLab.Fusion.Blazor.Authentication/scripts/fusionAuth.js">
    </script>
    <script>
        window.FusionAuth.schemas = "@_authSchemas";
    </script>
    <HeadOutlet @rendermode="@(_renderMode?.Mode)" />
</head>
<body>
    <App @rendermode="@(_renderMode?.Mode)"
         SessionId="@_sessionId"
         RenderModeKey="@(_renderMode?.Key)"/>
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


## JavaScript Integration

### fusionAuth.js

The `fusionAuth.js` script (included in `ActualLab.Fusion.Blazor.Authentication`) provides client-side auth functions:

```javascript
window.FusionAuth = {
    schemas: "",  // Set from server
    signInPath: "/signIn",
    signOutPath: "/signOut",

    signIn: function(schema) {
        var url = this.signInPath;
        if (schema)
            url += "/" + schema;
        window.location.href = url;
    },

    signOut: function() {
        window.location.href = this.signOutPath;
    },

    getSchemas: function() {
        // Returns array of {name, displayName}
        return this.parseSchemas(this.schemas);
    }
};
```

### Custom JavaScript

```html
<script>
    window.FusionAuth.signInPath = "/auth/login";
    window.FusionAuth.signOutPath = "/auth/logout";

    // Override sign-in to use popup
    window.FusionAuth.signIn = function(schema) {
        var url = this.signInPath + "/" + schema;
        var popup = window.open(url, "auth", "width=500,height=600");
        // Handle popup close...
    };
</script>
```


## Security Considerations

### Session ID Security

- Session IDs are stored in HTTP-only cookies (not accessible via JavaScript)
- Clients use `Session.Default` which is replaced server-side
- The real session ID never leaves the server

### Forced Sign-Out

When security requires immediate session invalidation:

```csharp
// Force sign-out creates a permanent invalid session state
var command = new Auth_SignOut(session, force: true);
await Commander.Call(command);

// The session is marked as "force signed out"
// Any request with this session will:
// 1. Trigger SessionMiddleware.ForcedSignOutHandler
// 2. Sign out of ASP.NET Core
// 3. Create a new session
// 4. Redirect
```

### CORS and Cookies

For cross-origin scenarios:

```csharp
services.AddCors(options => {
    options.AddPolicy("AllowApp", policy => {
        policy.WithOrigins("https://app.example.com")
              .AllowCredentials()  // Required for cookies
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

fusionServer.ConfigureSessionMiddleware(_ => new SessionMiddleware.Options() {
    Cookie = new CookieBuilder() {
        SameSite = SameSiteMode.None,  // Required for cross-origin
        SecurePolicy = CookieSecurePolicy.Always,  // Required with SameSite=None
    },
});
```
