---
type: concept
title: "Fusion Authentication"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - auth
  - security
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Blazor Integration]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Authentication

Fusion provides a comprehensive authentication system integrated with ASP.NET Core. It syncs auth state in real-time across all connected clients.

> [!warning] Starting point, not final solution
> The auth APIs exist to close a common gap. The OAuth implementation is complex due to heavy generics/abstractions. For production, consider **extracting standalone authentication** into your project. This is what [Voxt.ai](https://voxt.ai) does — clearer code with fewer abstractions.

## Key Features

- **Real-time auth state**: changes instantly propagate to all clients
- **Session management**: cookie-based with optional tags and metadata
- **Multi-provider**: works with any ASP.NET Core auth provider
- **Database or in-memory storage**
- **Multi-session support**: manage sessions across devices
- **Presence tracking**: know which users are active

## Required Packages

| Package | Purpose |
|---------|---------|
| `ActualLab.Fusion.Ext.Contracts` | Client: `IAuth`, `User`, `Session`, `SessionInfo` |
| `ActualLab.Fusion.Ext.Services` | Server: `InMemoryAuthService`, `DbAuthService`, `IAuthBackend` |
| `ActualLab.Fusion.Server` | Server: `SessionMiddleware`, `ServerAuthHelper` |
| `ActualLab.Fusion.Blazor.Authentication` | Blazor: `AuthStateProvider`, `ClientAuthHelper` |

## Quick Start

```csharp
// 1. Register
var fusion = services.AddFusion();
fusion.AddDbAuthService<AppDbContext, long>(); // production
// fusion.AddInMemoryAuthService();           // development

// 2. Configure ASP.NET Core auth
services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddCookie(options => {
    options.LoginPath = "/signIn";
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
}).AddGoogle(options => { ... });

// 3. Configure pipeline
app.UseFusionSession();
app.UseAuthentication();
app.MapRpcWebSocketServer();
app.MapFusionAuthEndpoints();
```

## Core Concepts

### Session

Identifies a user's connection, stored in an HTTP-only cookie:

```csharp
public class Session : IHasId<string>
{
    public static Session Default { get; } = new("~"); // For WASM clients
    public string Id { get; }                           // Unique ID
}
```

`SessionMiddleware` creates or resolves the session per request. `Session.Default` (the string `"~"`) is a sentinel — on WASM clients it gets substituted by the server-side session via `RpcDefaultSessionReplacer`.

### IAuth vs IAuthBackend

| Interface | Purpose | Requires Session | RPC Exposed |
|-----------|---------|------------------|-------------|
| `IAuth` | Client-facing queries and commands | Yes | Yes |
| `IAuthBackend` | Server-side modifications | No | No |

This is the recommended pattern for all Fusion services: `IXxx` is the client-facing API taking `Session` as the first parameter, `IXxxBackend` is the server-side API without session restrictions.

### Auth Flow

1. User clicks "Sign In" → redirects to OAuth provider
2. Provider authenticates → redirects back
3. `ServerAuthHelper.UpdateAuthState()` syncs ASP.NET Core auth → Fusion
4. `IAuth.GetUser()` returns the authenticated user
5. All components depending on auth state auto-update

### Using in Compute Services

```csharp
[ComputeMethod]
public virtual async Task<List<OrderHeaderDto>> GetMyOrders(
    Session session, CancellationToken ct = default)
{
    var user = await _auth.GetUser(session, ct).Require(); // throws if null
    // user is now available; compute method re-invalidates on sign in/out
    return await ReadOrders(user, ct);
}
```

## Blazor WASM: Default Session

WASM clients can't read the HTTP-only session cookie. Instead, use `Session.Default`:

```xml
@inherits CircuitHubComponentBase

@code {
    protected override void OnInitialized()
    {
        if (OSInfo.IsWebAssembly) {
            SessionResolver.Session = Session.Default;
            // RPC auto-substitutes Default -> cookie-based session on server
        } else {
            SessionResolver.Session = new Session(SessionId);
        }
    }
}
```

## Database Auth

For production, use `DbAuthService<TDbContext, TDbUserId>` with these entity types:
- `DbSessionInfo<TDbUserId>` — sessions, optionally linked to a user
- `DbUser<TDbUserId>` — user information
- `DbUserIdentity<TDbUserId>` — OAuth provider identities

Requires the [[Fusion Operations Framework]] (Operation Framework for multi-host scenarios).

## Sign Out

```csharp
// Single session
ClientAuthHelper.SignOut();

// All sessions for current user
ClientAuthHelper.SignOutEverywhere();
```

Fusion auth state changes instantly hit all clients — signing out in one window signs out all windows sharing the same session.
