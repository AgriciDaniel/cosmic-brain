using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using ActualLab.Fusion.Authentication;
using ActualLab.Fusion.Authentication.Services;
using ActualLab.Fusion.Server;
using ActualLab.Fusion.Server.Middlewares;
using ActualLab.Rpc.Server;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// Note: ActualLab.Fusion.Blazor.Authentication types (ClientAuthHelper, CascadingAuthState)
// are in a separate assembly and verified below by name only.

// ReSharper disable once CheckNamespace
namespace Docs.PartAA;

// Fake types for snippet compilation
// ReSharper disable once InconsistentNaming
public class _HostPage : ComponentBase { }
public class App : ComponentBase { }
public static class MicrosoftAccountDefaults
{
    public const string AuthenticationScheme = "Microsoft";
}

// Fake extension method for GitHub auth (actual one requires AspNet.Security.OAuth.GitHub package)
public static class GitHubAuthExtensions
{
    public static AuthenticationBuilder AddGitHub(this AuthenticationBuilder builder, Action<OAuthOptions> configureOptions)
    {
        // Fake implementation for snippet compilation
        return builder;
    }
}

// Fake extension methods for Blazor render modes (actual ones require Microsoft.AspNetCore.Components.WebAssembly.Server)
public static class BlazorRenderModeExtensions
{
    public static RazorComponentsEndpointConventionBuilder AddInteractiveWebAssemblyRenderMode(
        this RazorComponentsEndpointConventionBuilder builder)
        => builder;
}

public class AppDbContext : DbContext
{
    // Authentication-related tables
    #region PartAA_AppDbContext
    public DbSet<DbUser<long>> Users { get; protected set; } = null!;
    public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
    public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;
    #endregion

    public AppDbContext(DbContextOptions options) : base(options) { }
}

// Sample DTOs for GetMyOrders example
public record OrderHeaderDto(long Id, string Description);

// Sample service interface
public interface IOrderService : IComputeService
{
    Task<List<OrderHeaderDto>> GetMyOrders(Session session, CancellationToken cancellationToken = default);
}

// Sample service demonstrating session usage
public class OrderService(IAuth auth) : IOrderService
{
    private readonly IAuth _auth = auth;

    #region PartAA_GetMyOrders
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
    #endregion

    private Task<bool> CanReadOrders(User user, CancellationToken ct) => Task.FromResult(true);
}

public class PartAA : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // === Reference verification section ===
        // This section references all identifiers from Part11.md to verify they exist

        // 1. Session class
        _ = typeof(Session); // "Session" from docs
        _ = Session.Default; // "Session.Default" from docs - default session for WASM clients

        // 2. SessionMiddleware - creates sessions from cookies
        _ = typeof(SessionMiddleware); // "SessionMiddleware" from docs

        // 3. ISessionResolver - gets current session
        // Note: ISessionProvider was replaced by ISessionResolver in newer versions
        _ = typeof(ISessionResolver); // "ISessionResolver" from docs (was "ISessionProvider")

        // 4. Authentication services
        _ = typeof(InMemoryAuthService); // "InMemoryAuthService" from docs
        _ = typeof(DbAuthService<,,,>); // "DbAuthService" from docs

        // 5. Auth interfaces
        _ = typeof(IAuth); // "IAuth" from docs - frontend auth interface
        _ = typeof(IAuthBackend); // "IAuthBackend" from docs - backend auth interface

        // 6. Database entity types
        _ = typeof(DbUser<>); // "DbUser" from docs
        _ = typeof(DbUserIdentity<>); // "DbUserIdentity" from docs
        _ = typeof(DbSessionInfo<>); // "DbSessionInfo" from docs

        // 7. Server-side helpers
        _ = typeof(ServerAuthHelper); // "ServerAuthHelper" from docs

        // 8. Client-side helpers (in ActualLab.Fusion.Blazor.Authentication assembly)
        // _ = typeof(ClientAuthHelper); // "ClientAuthHelper" - requires Blazor.Authentication reference
        WriteLine("   - ClientAuthHelper exists in ActualLab.Fusion.Blazor.Authentication");

        // 9. Blazor components (in ActualLab.Fusion.Blazor.Authentication assembly)
        // Note: BlazorCircuitContext is now accessed via CircuitHub in CircuitHubComponentBase
        // _ = typeof(CascadingAuthState); // "CascadingAuthState" - requires Blazor.Authentication reference
        WriteLine("   - CascadingAuthState exists in ActualLab.Fusion.Blazor.Authentication");

        // 10. User class (result of auth)
        _ = typeof(User); // "User" from docs - represents authenticated user

        // 11. UserIdentity - represents external identity
        _ = typeof(UserIdentity); // "UserIdentity" from docs

        // 12. SessionInfo - session information
        _ = typeof(SessionInfo); // "SessionInfo" from docs

        WriteLine("All identifier references verified successfully!");
        WriteLine();

        StartSnippetOutput("Name/Pattern Changes Summary");

        WriteLine("1. Session Management:");
        WriteLine("   - ISessionProvider -> ISessionResolver (interface renamed)");
        WriteLine("   - SessionProvider.Session -> SessionResolver.Session");
        WriteLine();

        WriteLine("2. Blazor Patterns:");
        WriteLine("   - _Host.cshtml -> _HostPage.razor (modern .NET 8 pattern)");
        WriteLine("   - BlazorCircuitContext -> CircuitHub (access via CircuitHubComponentBase)");
        WriteLine("   - App.razor now inherits CircuitHubComponentBase");
        WriteLine();

        WriteLine("3. Auth Setup:");
        WriteLine("   - fusion.AddAuthentication() -> split into multiple calls:");
        WriteLine("     * fusion.AddAuthClient() - for client side");
        WriteLine("     * fusion.AddBlazor().AddAuthentication() - for Blazor integration");
        WriteLine("     * fusion.AddDbAuthService<TDbContext, TUserId>() - for DB auth");
        WriteLine();

        WriteLine("4. Controller Pattern (LEGACY):");
        WriteLine("   - OrderController pattern is obsolete");
        WriteLine("   - Services are now exposed via RPC, no controllers needed");
        WriteLine("   - Use fusion.AddServer<IService, Service>() instead");
        WriteLine();

        WriteLine("5. References to update:");
        WriteLine("   - Discord channel -> Voiced Fusion community");
        WriteLine("   - fusionAuth.js path unchanged");
        WriteLine();

        await Task.CompletedTask;
    }

    // Example: Service configuration with authentication
    #region PartAA_ServiceConfiguration
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
    #endregion

    // Example: App configuration
    #region PartAA_AppConfiguration
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
    #endregion
}

// === Identifier verification - fake uses ===
// These are static references to verify identifiers exist at compile time

internal static class IdentifierVerification
{
    // Verify Session class members
    static void VerifySession()
    {
        _ = Session.Default; // Default session for client-side
        _ = new Session("test-session-id");
    }

    // Verify auth service interfaces
    static void VerifyAuthInterfaces()
    {
        // These are the main auth interfaces
        IAuth? auth = null;
        IAuthBackend? authBackend = null;

        // Just reference them to verify they exist
        _ = auth;
        _ = authBackend;
    }

    // Verify entity types have expected properties
    static void VerifyDbEntities()
    {
        // DbUser<TDbUserId> - user entity
        DbUser<long>? user = null;
        _ = user?.Id;
        _ = user?.Name;
        _ = user?.ClaimsJson;
        _ = user?.Identities;

        // DbSessionInfo<TDbUserId> - session entity
        DbSessionInfo<long>? session = null;
        _ = session?.Id;
        _ = session?.UserId;
        _ = session?.CreatedAt;
        _ = session?.LastSeenAt;
        _ = session?.IPAddress;
        _ = session?.UserAgent;
        _ = session?.IsSignOutForced;

        // DbUserIdentity<TDbUserId> - identity entity
        DbUserIdentity<long>? identity = null;
        _ = identity?.Id;
        _ = identity?.DbUserId; // Note: Property is DbUserId, not UserId
    }

    // Verify User/SessionInfo/UserIdentity result types
    static void VerifyResultTypes()
    {
        // User - authenticated user info
        User? user = null;
        _ = user?.Id;
        _ = user?.Name;
        _ = user?.Claims;
        _ = user?.Identities;

        // SessionInfo - session metadata
        SessionInfo? sessionInfo = null;
        _ = sessionInfo?.SessionHash; // Note: No Id property, uses SessionHash
        _ = sessionInfo?.IsAuthenticated(); // Note: It's a method, not a property
        _ = sessionInfo?.UserId;

        // UserIdentity - external identity
        UserIdentity? identity = null;
        _ = identity?.Id;
    }
}
