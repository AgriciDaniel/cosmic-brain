# Standalone Authentication

Fusion's built-in authentication works well for getting started, but its generics-heavy design
adds complexity that many apps don't need. **Standalone authentication** is an approach where you
extract the authentication logic from Fusion packages into your own project, giving you full
control and the ability to simplify it for your specific needs.

The [Standalone Authentication PR](https://github.com/ActualLab/Fusion/pull/61)
demonstrates this approach using the TodoApp sample. It removes all dependencies on
`ActualLab.Fusion.Ext.Contracts`, `ActualLab.Fusion.Ext.Services`, and
`ActualLab.Fusion.Blazor.Authentication`, replacing them with local types that are simpler and
tailored to the app.

::: tip When to Use This Approach
- Your app has matured past the prototype stage and you want to simplify auth
- You need custom fields on `User` or `SessionInfo` (e.g., tenant ID, roles, avatar URL)
- You want to eliminate generic type parameters like `DbUser<TDbUserId>`
- You want to understand exactly what the auth system does &mdash; no black boxes
:::

::: warning
This approach means you take ownership of the auth code. You won't get automatic updates
from Fusion NuGet packages for these components. That said, the auth code rarely changes,
and owning it gives you the freedom to evolve it with your app.
:::


## What Changes

| Before (Fusion packages) | After (embedded) |
|---|---|
| `IAuth`, `IAuthBackend` from `Ext.Contracts` / `Ext.Services` | `IUserApi`, `ISessionBackend`, `IUserBackend` &mdash; local interfaces |
| `DbUser<TDbUserId>`, `DbSessionInfo<TDbUserId>` | Concrete `DbUser`, `DbSessionInfo` &mdash; no generics |
| `User` from `Ext.Contracts` (shared across all Fusion apps) | Local `User` record tailored to your app |
| `AuthStateProvider` from `Blazor.Authentication` | Local `AuthStateProvider` you can customize |
| `ServerAuthHelper` from `Fusion.Server` | Local `ServerAuthHelper` with only the logic you need |
| `AuthController` from `Fusion.Server` | Local `AuthEndpoints` using minimal APIs |
| `fusionAuth.js` from `Blazor.Authentication` | Local copy in `wwwroot/js/` |

The key insight: instead of one monolithic `IAuth` / `IAuthBackend` pair doing everything,
the standalone approach splits responsibilities into focused services:

- **`IUserApi`** &mdash; client-facing queries (replaces `IAuth`)
- **`ISessionBackend`** &mdash; session lifecycle management (replaces part of `IAuthBackend`)
- **`IUserBackend`** &mdash; user CRUD (replaces part of `IAuthBackend`)


## Extracted Components

The standalone auth system is organized into four layers.

### Abstractions (shared between client and server)

These types live in your shared/contracts project and define the domain model:

| File | Purpose |
|---|---|
| [`User.cs`][user] | Authenticated or guest user with claims and identities. Simplified from Fusion's generic `User` |
| [`UserId.cs`][userid] | Value type for user IDs with embedded shard prefix (e.g., `"0:abc123"`) |
| [`UserIdentity.cs`][useridentity] | Authentication provider identity (e.g., `"GitHub/12345"`) |
| [`SessionInfo.cs`][sessioninfo] | Session state: timestamps, IP, user agent, auth identity, forced sign-out flag |
| [`IUserApi.cs`][iuserapi] | Client-facing compute service: `GetOwn()`, `ListOwnSessions()`, `UpdatePresence()`, `OnSignOut()` |

[user]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Abstractions/Auth/User.cs
[userid]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Abstractions/Auth/UserId.cs
[useridentity]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Abstractions/Auth/UserIdentity.cs
[sessioninfo]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Abstractions/Auth/SessionInfo.cs
[iuserapi]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Abstractions/Auth/IUserApi.cs

**`IUserApi`** is the only auth service exposed via RPC to the client:

```csharp
public interface IUserApi : IComputeService
{
    [ComputeMethod(MinCacheDuration = 10)]
    Task<User?> GetOwn(Session session, CancellationToken cancellationToken = default);

    [ComputeMethod]
    Task<ImmutableArray<SessionInfo>> ListOwnSessions(
        Session session, CancellationToken cancellationToken = default);

    Task UpdatePresence(Session session, CancellationToken cancellationToken = default);

    [CommandHandler]
    Task OnSignOut(User_SignOut command, CancellationToken cancellationToken = default);
}
```

### Backend Services (server-side only)

| File | Purpose |
|---|---|
| [`ISessionBackend.cs`][isessionbackend] | Backend interface for session lifecycle: setup, sign-in, sign-out, presence |
| [`IUserBackend.cs`][iuserbackend] | Backend interface for user CRUD |
| [`SessionBackend.cs`][sessionbackend] | EF Core implementation of `ISessionBackend` with compute method caching |
| [`UserBackend.cs`][userbackend] | EF Core implementation of `IUserBackend` |
| [`UserApi.cs`][userapi] | Implementation of `IUserApi` &mdash; bridges client calls to backend services |
| [`ServerAuthHelper.cs`][serverauthhelper] | Syncs ASP.NET Core auth state to Fusion on each page load |
| [`AuthEndpoints.cs`][authendpoints] | Minimal API endpoints for `/signIn` and `/signOut` (replaces `AuthController`) |
| [`HttpContextExt.cs`][httpcontextext] | Helpers for reading auth schemas and remote IP from `HttpContext` |

[isessionbackend]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/ISessionBackend.cs
[iuserbackend]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/IUserBackend.cs
[sessionbackend]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/SessionBackend.cs
[userbackend]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/UserBackend.cs
[userapi]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/UserApi.cs
[serverauthhelper]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/ServerAuthHelper.cs
[authendpoints]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/AuthEndpoints.cs
[httpcontextext]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Auth/HttpContextExt.cs

The backend splits `IAuthBackend` into two focused interfaces:

```csharp
// Session lifecycle
public interface ISessionBackend : IComputeService, IBackendService
{
    [ComputeMethod(MinCacheDuration = 10)]
    Task<SessionInfo?> GetSessionInfo(Session session, CancellationToken cancellationToken = default);

    [ComputeMethod]
    Task<ImmutableArray<SessionInfo>> GetUserSessions(
        UserId userId, CancellationToken cancellationToken = default);

    [CommandHandler]
    Task<SessionInfo> OnSetupSession(SessionBackend_SetupSession command, ...);

    [CommandHandler]
    Task OnSignIn(SessionBackend_SignIn command, ...);

    [CommandHandler]
    Task OnSignOut(SessionBackend_SignOut command, ...);

    Task UpdatePresence(Session session, CancellationToken cancellationToken = default);
}

// User CRUD
public interface IUserBackend : IComputeService, IBackendService
{
    [ComputeMethod(MinCacheDuration = 10)]
    Task<User?> Get(UserId userId, CancellationToken cancellationToken = default);

    [CommandHandler]
    Task<User> OnUpsert(UserBackend_Upsert command, ...);
}
```

### Database Entities (server-side only)

| File | Purpose |
|---|---|
| [`DbSessionInfo.cs`][dbsessioninfo] | EF Core entity for sessions &mdash; concrete type, no generics |
| [`DbUser.cs`][dbuser] | EF Core entity for users with JSON-serialized claims |
| [`DbUserIdentity.cs`][dbuseridentity] | EF Core entity for user-identity associations |

[dbsessioninfo]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Db/DbSessionInfo.cs
[dbuser]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Db/DbUser.cs
[dbuseridentity]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Services/Db/DbUserIdentity.cs

These replace Fusion's generic `DbUser<TDbUserId>`, `DbSessionInfo<TDbUserId>`, and
`DbUserIdentity<TDbUserId>`. Without generics, the code is straightforward:

```csharp
[Table("Users")]
[Index(nameof(Name))]
public class DbUser : IHasId<string>, IHasVersion<long>
{
    [Key] public string Id { get; set; } = "";
    [ConcurrencyCheck] public long Version { get; set; }
    public string Name { get; set; } = "";
    public string ClaimsJson { get; set; } = "{}";
    public List<DbUserIdentity> Identities { get; set; } = new();

    // ToModel() / UpdateFrom() for domain model conversion
}
```

### UI Components (Blazor client)

| File | Purpose |
|---|---|
| [`AuthStateProvider.cs`][authstateprovider] | Blazor `AuthenticationStateProvider` backed by `IUserApi` with reactive updates |
| [`AuthState.cs`][authstate] | Auth state model with local `User` and forced sign-out flag |
| [`CascadingAuthState.razor`][cascadingauthstate] | Cascades auth state to child components; handles forced sign-out |
| [`ClientAuthHelper.cs`][clientauthhelper] | Client-side helper for sign-in/sign-out via JS interop |
| [`PresenceReporter.cs`][presencereporter] | Background worker reporting user presence every 3 minutes |
| [`fusionAuth.js`][fusionauthjs] | JavaScript module for popup-based auth flows |

[authstateprovider]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/Services/AuthStateProvider.cs
[authstate]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/Services/AuthState.cs
[cascadingauthstate]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/Services/CascadingAuthState.razor
[clientauthhelper]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/Services/ClientAuthHelper.cs
[presencereporter]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/Services/PresenceReporter.cs
[fusionauthjs]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/UI/wwwroot/js/fusionAuth.js


## Service Registration

Here's how the embedded auth services are registered in [`Program.cs`][programcs]:

[programcs]: https://github.com/ActualLab/Fusion/blob/feat/embedded-auth/samples/TodoApp/Host/Program.cs

```csharp
var fusion = services.AddFusion();

// Backend services (server-side)
fusion.AddServer<ISessionBackend, SessionBackend>();
fusion.AddServer<IUserBackend, UserBackend>();

// Client-facing API (exposed via RPC)
fusion.AddServer<IUserApi, UserApi>();

// ServerAuthHelper for syncing ASP.NET Core auth to Fusion
services.AddSingleton(new ServerAuthHelper.Options { /* ... */ });
services.AddScoped<ServerAuthHelper>();

// Auth endpoints (replaces AuthController)
services.AddSingleton(new AuthEndpoints.Options { /* ... */ });
services.AddSingleton<AuthEndpoints>();

// Blazor auth integration
services.AddScoped<AuthStateProvider>();
services.AddScoped<AuthenticationStateProvider>(c => c.GetRequiredService<AuthStateProvider>());
services.AddScoped<ClientAuthHelper>();
services.AddScoped<PresenceReporter>();
```

Compare this to the Fusion-package approach:
```csharp
// Before: Fusion packages handle everything
fusion.AddDbAuthService<AppDbContext, string>();
fusionServer.AddAuthEndpoints();
```

The standalone version is more verbose, but every service is yours to inspect, modify, and debug.


## Migration Steps

To set up standalone authentication in your own app:

1. **Copy the contract types** (`User`, `UserId`, `UserIdentity`, `SessionInfo`, `IUserApi`)
   into your shared/abstractions project. Adjust namespaces to match your app.

2. **Copy the backend services** (`ISessionBackend`, `IUserBackend`, `SessionBackend`,
   `UserBackend`, `UserApi`, `ServerAuthHelper`, `AuthEndpoints`, `HttpContextExt`)
   into your server project.

3. **Copy the DB entities** (`DbUser`, `DbSessionInfo`, `DbUserIdentity`) and update your
   `DbContext` to use them instead of Fusion's generic versions.

4. **Copy the UI components** (`AuthStateProvider`, `AuthState`, `CascadingAuthState`,
   `ClientAuthHelper`, `PresenceReporter`, `fusionAuth.js`) into your Blazor project.

5. **Remove NuGet references** to `ActualLab.Fusion.Ext.Contracts`,
   `ActualLab.Fusion.Ext.Services`, and `ActualLab.Fusion.Blazor.Authentication`.

6. **Update service registration** in `Program.cs` as shown above.

7. **Update `_HostPage.razor`** to use the local `ServerAuthHelper` instead of the
   one from `ActualLab.Fusion.Server`.

8. **Update imports** in `_Imports.razor` and other files to reference your local namespaces
   instead of `ActualLab.Fusion.Authentication`.

::: tip Use AI to Help
You can use AI tools like Claude to accelerate this migration. Point it at the
[Standalone Authentication PR](https://github.com/ActualLab/Fusion/pull/61)
and your own codebase, and ask it to adapt the extracted types to your app's needs.
:::


## Simplification Opportunities

Once the code is in your project, you can simplify it further:

- **Remove unused features**: If you don't need multi-session management or presence tracking,
  delete `ListOwnSessions`, `UpdatePresence`, and `PresenceReporter`
- **Flatten the model**: Merge `SessionInfo` fields directly into your session entity
  if you don't need the domain/entity separation
- **Simplify user IDs**: If you don't need sharding, replace `UserId` with a plain `string`
- **Add custom fields**: Add `TenantId`, `AvatarUrl`, `Roles`, or any other fields directly
  to `User` and `DbUser`
- **Change auth flow**: Replace popup-based auth with redirect-based, or add custom
  flows like magic links or API keys
- **Simplify serialization**: Remove `MessagePack` or `MemoryPack` attributes if you only
  use one serialization format
