# Authentication Interfaces and Commands

This document covers Fusion's core authentication interfaces (`IAuth`, `IAuthBackend`), the `User` class, session-related types, and authentication commands.


## Overview

Fusion's authentication system is built around two complementary interfaces:

- **`IAuth`** - Client-facing API for reading authentication state
- **`IAuthBackend`** - Server-side API for modifying authentication state

Both interfaces are compute services, meaning their query results automatically invalidate when authentication state changes.


## IAuth Interface

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/IAuth.cs)

The `IAuth` interface provides client-safe authentication operations. It requires a `Session` parameter and only exposes data the current user is allowed to access.

### Commands

| Command | Description |
|---------|-------------|
| `SignOut(Auth_SignOut)` | Signs out the current session |
| `EditUser(Auth_EditUser)` | Edits the current user's profile |
| `UpdatePresence(Session)` | Updates the session's last-seen timestamp |

### Queries (Compute Methods)

| Method | Return Type | Description |
|--------|-------------|-------------|
| `IsSignOutForced(Session)` | `Task<bool>` | Checks if a forced sign-out was triggered |
| `GetAuthInfo(Session)` | `Task<SessionAuthInfo?>` | Gets authentication info for the session |
| `GetSessionInfo(Session)` | `Task<SessionInfo?>` | Gets full session information |
| `GetUser(Session)` | `Task<User?>` | Gets the authenticated user |
| `GetUserSessions(Session)` | `Task<ImmutableArray<SessionInfo>>` | Gets all sessions for the current user |

### Usage Example

```csharp
public class OrderService : IOrderService
{
    private readonly IAuth _auth;

    [ComputeMethod]
    public virtual async Task<List<Order>> GetMyOrders(
        Session session,
        CancellationToken ct = default)
    {
        // This creates a dependency on auth state
        var user = await _auth.GetUser(session, ct).Require();

        // If user signs out, this computed value invalidates automatically
        return await GetOrdersForUser(user.Id, ct);
    }
}
```


## IAuthBackend Interface

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/IAuthBackend.cs)

The `IAuthBackend` interface provides server-side authentication operations. It does not require a `Session` for queries and allows modification of any user's data.

> **Security Note**: `IAuthBackend` is marked with `IBackendService`, which means it's never exposed over RPC. It should only be used on the server.

### Commands

| Command | Description |
|---------|-------------|
| `SignIn(AuthBackend_SignIn)` | Authenticates a session with a user |
| `SetupSession(AuthBackend_SetupSession)` | Creates or updates session metadata |
| `SetOptions(AuthBackend_SetSessionOptions)` | Sets session options |

### Queries

| Method | Return Type | Description |
|--------|-------------|-------------|
| `GetUser(shard, userId)` | `Task<User?>` | Gets any user by ID (no session required) |


## Authentication Commands

### Auth_SignOut

Signs out a session, optionally forcing sign-out or kicking other sessions.

```csharp
[DataContract]
public partial record Auth_SignOut : ISessionCommand<Unit>
{
    public Session Session { get; init; }
    public string? KickUserSessionHash { get; init; }  // Kick specific session
    public bool KickAllUserSessions { get; init; }     // Kick all user's sessions
    public bool Force { get; init; }                   // Force sign-out (requires new session)
}
```

**Usage:**

```csharp
// Simple sign-out
await Commander.Call(new Auth_SignOut(session));

// Forced sign-out (invalidates session permanently)
await Commander.Call(new Auth_SignOut(session, force: true));

// Kick a specific session
await Commander.Call(new Auth_SignOut(session, kickSessionHash, force: true));

// Kick all sessions ("Sign out everywhere")
await Commander.Call(new Auth_SignOut(session) { KickAllUserSessions = true, Force = true });
```

### Auth_EditUser

Edits the current user's profile.

```csharp
[DataContract]
public partial record Auth_EditUser(
    Session Session,
    string? Name
) : ISessionCommand<Unit>;
```

**Usage:**

```csharp
await Commander.Call(new Auth_EditUser(session, "New Name"));
```

### AuthBackend_SignIn

Authenticates a session with a user (server-side only).

```csharp
[DataContract]
public partial record AuthBackend_SignIn(
    Session Session,
    User User,
    UserIdentity AuthenticatedIdentity
) : ISessionCommand<Unit>, IBackendCommand;
```

**Usage:**

```csharp
var user = new User("user-123", "John Doe") {
    Claims = claims,
    Identities = new ApiMap<UserIdentity, string>() {
        { new UserIdentity("Google", "google-id-123"), "" }
    }
};
var identity = user.Identities.Single().Key;
await Commander.Call(new AuthBackend_SignIn(session, user, identity));
```

### AuthBackend_SetupSession

Creates or updates session metadata (IP address, user agent, options).

```csharp
[DataContract]
public partial record AuthBackend_SetupSession(
    Session Session,
    string IPAddress,
    string UserAgent,
    ImmutableOptionSet Options
) : ISessionCommand<SessionInfo>, IBackendCommand, INotLogged;
```

### AuthBackend_SetSessionOptions

Sets custom options on a session.

```csharp
[DataContract]
public partial record AuthBackend_SetSessionOptions(
    Session Session,
    ImmutableOptionSet Options,
    long? ExpectedVersion = null
) : ISessionCommand<Unit>;
```


## User Class

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/User.cs)

The `User` class represents an authenticated user.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | Unique user identifier |
| `Name` | `string` | Display name |
| `Version` | `long` | Optimistic concurrency version |
| `Claims` | `ApiMap<string, string>` | User claims (key-value pairs) |
| `Identities` | `ApiMap<UserIdentity, string>` | Authentication identities |

### Key Methods

| Method | Description |
|--------|-------------|
| `IsAuthenticated()` | Returns `true` if `Id` is not empty |
| `IsGuest()` | Returns `true` if `Id` is empty |
| `IsInRole(role)` | Checks if user has the specified role claim |
| `ToClaimsPrincipal()` | Converts to `ClaimsPrincipal` for ASP.NET Core integration |
| `ToClientSideUser()` | Creates a copy with masked identity secrets |
| `WithClaim(name, value)` | Creates a copy with an added claim |
| `WithIdentity(identity)` | Creates a copy with an added identity |

### Static Requirements

```csharp
// Throws if user is null
var user = await Auth.GetUser(session, ct).Require();

// Throws if user is null or not authenticated
var user = await Auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
```

### Creating Users

```csharp
// Guest user (not authenticated)
var guest = User.NewGuest("Anonymous");

// Authenticated user
var user = new User("user-123", "John Doe")
    .WithClaim(ClaimTypes.Email, "john@example.com")
    .WithIdentity(new UserIdentity("Google", "google-id-123"));
```


## UserIdentity

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/UserIdentity.cs)

`UserIdentity` represents an authentication identity (e.g., Google, GitHub, local account).

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | Full identity ID (schema/id format) |
| `Schema` | `string` | Authentication schema (e.g., "Google", "GitHub") |
| `SchemaBoundId` | `string` | ID within the schema |
| `IsValid` | `bool` | Returns `true` if `Id` is not empty |

### Creating Identities

```csharp
// From schema and ID
var identity = new UserIdentity("Google", "google-user-id");

// Using tuple syntax
UserIdentity identity = ("GitHub", "github-user-id");

// From serialized string
var identity = new UserIdentity("Google/google-user-id");
```

### Default Schema

```csharp
// Set the default schema (used when parsing IDs without explicit schema)
UserIdentity.DefaultSchema = "Local";

// This identity uses the default schema
var identity = new UserIdentity("user-123");
// identity.Schema == "Local"
// identity.SchemaBoundId == "user-123"
```


## Session Class

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Session/Session.cs)

The `Session` class represents a user session, typically stored in an HTTP-only cookie.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | Unique session identifier (min 8 chars) |
| `Hash` | `string` | Short hash for session identification |

### Static Members

| Member | Description |
|--------|-------------|
| `Default` | Special session (`"~"`) for client-side use |
| `Factory` | Creates new sessions (default: generates GUIDs) |
| `Validator` | Validates session IDs |

### Session Tags

Sessions can include tags for metadata:

```csharp
// Create session with tags
var session = Session.New().WithTag("tenant", "acme");

// Get tag value
var tenant = session.GetTag("tenant"); // "acme"

// Get all tags
var tags = session.GetTags(); // "tenant=acme"
```

### Default Session

The `Session.Default` (ID = `"~"`) is special:

- Used by Blazor WebAssembly clients that can't access the real session ID
- Automatically replaced with the real session by `RpcDefaultSessionReplacer` on the server

```csharp
// On Blazor WASM client
SessionResolver.Session = Session.Default;

// When calling server methods, Session.Default is auto-replaced
var user = await Auth.GetUser(Session.Default, ct);
// Server sees the real session from the cookie
```


## SessionInfo

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/SessionInfo.cs)

`SessionInfo` contains full session metadata.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `SessionHash` | `string` | Short hash identifying the session |
| `Version` | `long` | Optimistic concurrency version |
| `CreatedAt` | `Moment` | When the session was created |
| `LastSeenAt` | `Moment` | Last activity timestamp |
| `IPAddress` | `string` | Client IP address |
| `UserAgent` | `string` | Client user agent string |
| `Options` | `ImmutableOptionSet` | Custom session options |
| `AuthenticatedIdentity` | `UserIdentity` | The identity used to authenticate |
| `UserId` | `string` | Associated user ID |
| `IsSignOutForced` | `bool` | Whether forced sign-out was triggered |


## SessionAuthInfo

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/SessionAuthInfo.cs)

`SessionAuthInfo` is a lightweight subset of `SessionInfo` containing only authentication-related data.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `SessionHash` | `string` | Short hash identifying the session |
| `AuthenticatedIdentity` | `UserIdentity` | The identity used to authenticate |
| `UserId` | `string` | Associated user ID |
| `IsSignOutForced` | `bool` | Whether forced sign-out was triggered |

### Methods

| Method | Description |
|--------|-------------|
| `IsAuthenticated()` | Returns `true` if `UserId` is not empty and not force-signed-out |


## ISessionResolver

Resolves the current session for the scope.

```csharp
public interface ISessionResolver
{
    Session Session { get; set; }
}
```

### Registration

```csharp
// Automatically registered by AddFusion()
services.AddScoped<ISessionResolver>(c => new SessionResolver(c));
services.AddScoped(c => c.GetRequiredService<ISessionResolver>().Session);
```

### Usage

```csharp
public class MyService : IMyService
{
    private readonly ISessionResolver _sessionResolver;

    [ComputeMethod]
    public virtual async Task<Data> GetData(CancellationToken ct)
    {
        var session = _sessionResolver.Session;
        // Use session...
    }
}

// Or inject Session directly
public class MyComponent : ComponentBase
{
    [Inject] public Session Session { get; set; }
}
```


## Service Design Pattern

Fusion recommends splitting services into frontend (`IXxx`) and backend (`IXxxBackend`) interfaces:

| Interface | Purpose | Session | RPC Exposure |
|-----------|---------|---------|--------------|
| `IXxx` | Client-facing API | Required (first parameter) | Exposed |
| `IXxxBackend` | Server-side API | Not required | Never exposed |

### Example

```csharp
// Frontend (exposed via RPC)
public interface IOrderService : IComputeService
{
    [ComputeMethod]
    Task<List<Order>> GetMyOrders(Session session, CancellationToken ct = default);
}

// Backend (server-only)
public interface IOrderBackend : IComputeService, IBackendService
{
    [ComputeMethod]
    Task<List<Order>> GetAllOrders(CancellationToken ct = default);

    [CommandHandler]
    Task CreateOrder(CreateOrderCommand command, CancellationToken ct = default);
}
```
