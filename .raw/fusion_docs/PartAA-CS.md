# Authentication: Cheat Sheet

Quick reference for Fusion authentication patterns and common operations.


## Service Registration

### Server Setup

```csharp
var fusion = services.AddFusion();
var fusionServer = fusion.AddWebServer();

// Database auth service (production)
fusion.AddDbAuthService<AppDbContext, long>();

// In-memory auth service (development/testing)
// fusion.AddInMemoryAuthService();

// Configure endpoints
fusionServer.ConfigureAuthEndpoint(_ => new() {
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
    NameClaimKeys = [ClaimTypes.Name, "preferred_username"],
});
```

### Client Setup (Blazor WASM)

```csharp
var fusion = services.AddFusion();
fusion.AddAuthClient();
fusion.AddBlazor()
    .AddAuthentication()
    .AddPresenceReporter();
```


## App Configuration

```csharp
app.UseWebSockets();
app.UseFusionSession();      // Session handling
app.UseRouting();
app.UseAuthentication();     // ASP.NET Core auth
app.UseAuthorization();

app.MapRpcWebSocketServer();
app.MapFusionAuthEndpoints();
```


## Get Current User

### In Compute Service

```csharp
public class MyService : IMyService
{
    private readonly IAuth _auth;

    [ComputeMethod]
    public virtual async Task<MyData> GetData(Session session, CancellationToken ct)
    {
        // Returns null if not authenticated
        var user = await _auth.GetUser(session, ct);
        if (user == null)
            throw new SecurityException("Not authenticated");

        return await LoadData(user.Id, ct);
    }
}
```

### With Require Extension

```csharp
// Throws if user is null
var user = await _auth.GetUser(session, ct).Require();

// Throws if user is null or not authenticated
var user = await _auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
```

### In Blazor Component

```razor
@inherits ComputedStateComponent<User?>
@inject IAuth Auth
@inject Session Session

@if (State.Value?.IsAuthenticated() == true) {
    <p>Welcome, @State.Value.Name!</p>
} else {
    <p>Please sign in.</p>
}

@code {
    protected override Task<User?> ComputeState(CancellationToken ct)
        => Auth.GetUser(Session, ct);
}
```


## Sign In / Sign Out

### Using ClientAuthHelper (Blazor)

```razor
@inject ClientAuthHelper ClientAuthHelper

<!-- Sign in with default schema -->
<button @onclick="() => ClientAuthHelper.SignIn()">Sign In</button>

<!-- Sign in with specific schema -->
<button @onclick="() => ClientAuthHelper.SignIn(\"Google\")">Sign In with Google</button>

<!-- Sign out current session -->
<button @onclick="() => ClientAuthHelper.SignOut()">Sign Out</button>

<!-- Sign out all sessions -->
<button @onclick="() => ClientAuthHelper.SignOutEverywhere()">Sign Out Everywhere</button>
```

### Using Commands (Server-Side)

```csharp
// Sign in
var user = new User("user-123", "John Doe")
    .WithClaim(ClaimTypes.Email, "john@example.com")
    .WithIdentity(new UserIdentity("Google", "google-id-123"));
var identity = user.Identities.Single().Key;
await Commander.Call(new AuthBackend_SignIn(session, user, identity), ct);

// Sign out
await Commander.Call(new Auth_SignOut(session), ct);

// Force sign out (invalidates session)
await Commander.Call(new Auth_SignOut(session, force: true), ct);

// Sign out specific session
await Commander.Call(new Auth_SignOut(session, targetSessionHash, force: true), ct);

// Sign out all user sessions
await Commander.Call(new Auth_SignOut(session) { KickAllUserSessions = true, Force = true }, ct);
```


## Session Management

### Get Session Info

```csharp
// Full session info
var sessionInfo = await Auth.GetSessionInfo(session, ct);
Console.WriteLine($"Created: {sessionInfo?.CreatedAt}");
Console.WriteLine($"Last seen: {sessionInfo?.LastSeenAt}");
Console.WriteLine($"IP: {sessionInfo?.IPAddress}");

// Just auth info
var authInfo = await Auth.GetAuthInfo(session, ct);
Console.WriteLine($"User ID: {authInfo?.UserId}");
Console.WriteLine($"Is authenticated: {authInfo?.IsAuthenticated()}");

// Check forced sign-out
var isForced = await Auth.IsSignOutForced(session, ct);
```

### Get All User Sessions

```csharp
var sessions = await Auth.GetUserSessions(session, ct);
foreach (var s in sessions) {
    Console.WriteLine($"Session: {s.SessionHash}");
    Console.WriteLine($"  Device: {s.UserAgent}");
    Console.WriteLine($"  IP: {s.IPAddress}");
    Console.WriteLine($"  Last seen: {s.LastSeenAt}");
}
```

### Session Tags

```csharp
// Add tag to session
var session = Session.New().WithTag("tenant", "acme");

// Get tag
var tenant = session.GetTag("tenant");  // "acme"

// Multiple tags
var session = Session.New()
    .WithTag("tenant", "acme")
    .WithTag("device", "mobile");
```


## User Operations

### Check Authentication

```csharp
var user = await Auth.GetUser(session, ct);

// Check if authenticated
if (user?.IsAuthenticated() == true) { /* ... */ }

// Check if guest
if (user?.IsGuest() == true) { /* ... */ }

// Check role
if (user?.IsInRole("Admin") == true) { /* ... */ }
```

### User Properties

```csharp
var user = await Auth.GetUser(session, ct);
if (user != null) {
    var id = user.Id;
    var name = user.Name;
    var version = user.Version;
    var claims = user.Claims;
    var identities = user.Identities;

    // Get specific claim
    var email = claims.GetValueOrDefault(ClaimTypes.Email);

    // Convert to ClaimsPrincipal
    var principal = user.ToClaimsPrincipal();
}
```

### Edit User

```csharp
await Commander.Call(new Auth_EditUser(session, "New Name"), ct);
```


## Authorization Patterns

### Require Authentication

```csharp
[ComputeMethod]
public virtual async Task<List<Order>> GetMyOrders(Session session, CancellationToken ct)
{
    var user = await _auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
    return await _db.Orders.Where(o => o.UserId == user.Id).ToListAsync(ct);
}
```

### Role-Based Authorization

```csharp
[ComputeMethod]
public virtual async Task<AdminData> GetAdminData(Session session, CancellationToken ct)
{
    var user = await _auth.GetUser(session, ct).Require();
    if (!user.IsInRole("Admin"))
        throw new SecurityException("Admin access required");

    return await LoadAdminData(ct);
}
```

### Claim-Based Authorization

```csharp
[ComputeMethod]
public virtual async Task<PremiumContent> GetPremiumContent(Session session, CancellationToken ct)
{
    var user = await _auth.GetUser(session, ct).Require();
    if (!user.Claims.ContainsKey("subscription:premium"))
        throw new SecurityException("Premium subscription required");

    return await LoadPremiumContent(ct);
}
```


## Blazor Authentication UI

### CascadingAuthState Setup

```razor
<!-- App.razor -->
@inherits CircuitHubComponentBase

<CascadingAuthState UsePresenceReporter="true">
    <Router AppAssembly="typeof(Program).Assembly">
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

### AuthorizeView

```razor
<AuthorizeView>
    <Authorized>
        <p>Welcome, @context.User.Identity?.Name!</p>
    </Authorized>
    <NotAuthorized>
        <p>Please sign in.</p>
    </NotAuthorized>
</AuthorizeView>
```

### Using CascadingParameter

```razor
@code {
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
}
```


## Database Configuration

### Custom DbContext

```csharp
public class AppDbContext : DbContext
{
    public DbSet<DbUser<long>> Users { get; protected set; } = null!;
    public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
    public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;
}
```

### Session Trimmer Configuration

```csharp
fusion.AddDbAuthService<AppDbContext, long>(db => {
    db.ConfigureSessionInfoTrimmer(_ => new() {
        MaxSessionAge = TimeSpan.FromDays(90),
        CheckPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
        BatchSize = 1000,
    });
});
```


## Presence Tracking

### Enable Presence Reporter

```razor
<CascadingAuthState UsePresenceReporter="true">
    @* App content *@
</CascadingAuthState>
```

### Check User Online Status

```csharp
[ComputeMethod]
public virtual async Task<bool> IsUserOnline(string userId, CancellationToken ct)
{
    var sessionInfo = await _auth.GetSessionInfo(userId, ct);
    if (sessionInfo == null)
        return false;

    // Consider online if seen in last 5 minutes
    return sessionInfo.LastSeenAt > MomentClock.Now - TimeSpan.FromMinutes(5);
}
```


## Common Patterns

### Service with Session Parameter

```csharp
public interface IOrderService : IComputeService
{
    [ComputeMethod]
    Task<List<Order>> GetMyOrders(Session session, CancellationToken ct = default);

    [CommandHandler]
    Task CreateOrder(CreateOrderCommand command, CancellationToken ct = default);
}

public record CreateOrderCommand(Session Session, OrderData Data) : ISessionCommand<Order>;
```

### Combining with Other Compute Methods

```csharp
[ComputeMethod]
public virtual async Task<DashboardData> GetDashboard(Session session, CancellationToken ct)
{
    // Auth state becomes a dependency
    var user = await _auth.GetUser(session, ct).Require();

    // These will also invalidate if their data changes
    var orders = await GetMyOrders(session, ct);
    var notifications = await GetNotifications(user.Id, ct);

    return new DashboardData(user, orders, notifications);
}
```

### Backend Service Pattern

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

    [ComputeMethod]
    Task<List<Order>> GetOrdersByUser(string userId, CancellationToken ct = default);
}
```


## JavaScript Integration

### Access Auth Schemas

```javascript
// Get available schemas
var schemas = window.FusionAuth.getSchemas();
// [{ name: "Google", displayName: "Google" }, ...]

// Sign in with specific schema
window.FusionAuth.signIn("Google");

// Sign out
window.FusionAuth.signOut();
```

### Custom Sign-In Path

```html
<script>
    window.FusionAuth.signInPath = "/auth/login";
    window.FusionAuth.signOutPath = "/auth/logout";
</script>
```


## Source Links

| Class/Interface | Source |
|-----------------|--------|
| `IAuth` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/IAuth.cs) |
| `IAuthBackend` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/IAuthBackend.cs) |
| `User` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/User.cs) |
| `Session` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Session/Session.cs) |
| `SessionInfo` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/SessionInfo.cs) |
| `UserIdentity` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/UserIdentity.cs) |
| `DbAuthService` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbAuthService.cs) |
| `ServerAuthHelper` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Authentication/ServerAuthHelper.cs) |
| `SessionMiddleware` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Server/Middlewares/SessionMiddleware.cs) |
| `ClientAuthHelper` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/ClientAuthHelper.cs) |
| `AuthStateProvider` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor.Authentication/AuthStateProvider.cs) |
| `PresenceReporter` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Contracts/Authentication/PresenceReporter.cs) |
