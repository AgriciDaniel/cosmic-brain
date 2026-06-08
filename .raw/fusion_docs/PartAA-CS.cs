using System.Security;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.Authentication;
using ActualLab.Fusion.Authentication.Services;
using ActualLab.Fusion.Blazor;
using ActualLab.Fusion.Blazor.Authentication;
using ActualLab.Fusion.Server;
using ActualLab.Fusion.Server.Middlewares;
using ActualLab.Rpc;
using ActualLab.Rpc.Server;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAACS;

// ============================================================================
// PartAA-CS.md snippets: Authentication Cheat Sheet
// ============================================================================

public static class ServerSetupExamples
{
    public static void ServerSetup(IServiceCollection services)
    {
        #region PartAACS_ServerSetup
        var fusion = services.AddFusion();
        var fusionServer = fusion.AddWebServer();

        // Database auth service (production)
        fusion.AddDbAuthService<AppDbContext, long>();

        // In-memory auth service (development/testing)
        // fusion.AddInMemoryAuthService();

        // Configure endpoints
        fusionServer.ConfigureAuthEndpoint(_ => new() {
            DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme,
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
        #endregion
    }

    public static void ClientSetup(IServiceCollection services)
    {
        #region PartAACS_ClientSetup
        var fusion = services.AddFusion();
        fusion.AddAuthClient();
        fusion.AddBlazor()
            .AddAuthentication()
            .AddPresenceReporter();
        #endregion
    }

    public static void AppConfig(IApplicationBuilder app)
    {
        #region PartAACS_AppConfig
        app.UseWebSockets();
        app.UseFusionSession();      // Session handling
        app.UseRouting();
        app.UseAuthentication();     // ASP.NET Core auth
        app.UseAuthorization();

        app.UseEndpoints(endpoints => {
            endpoints.MapRpcWebSocketServer();
            endpoints.MapFusionAuthEndpoints();
        });
        #endregion
    }
}

public interface IMyService : IComputeService
{
    Task<MyData> GetData(Session session, CancellationToken ct = default);
}

public record MyData;

public class GetUserExamples(IAuth auth) : IMyService
{
    private readonly IAuth _auth = auth;

    #region PartAACS_GetUserInService
    [ComputeMethod]
    public virtual async Task<MyData> GetData(Session session, CancellationToken ct)
    {
        // Returns null if not authenticated
        var user = await _auth.GetUser(session, ct);
        if (user == null)
            throw new SecurityException("Not authenticated");

        return await LoadData(user.Id, ct);
    }
    #endregion

    private Task<MyData> LoadData(string userId, CancellationToken ct) => Task.FromResult(new MyData());
}

public class RequireExtensionExamples(IAuth auth)
{
    private readonly IAuth _auth = auth;

    #region PartAACS_RequireExtension
    public async Task RequireExamples(Session session, CancellationToken ct)
    {
        // Throws if user is null
        var user1 = await _auth.GetUser(session, ct).Require();

        // Throws if user is null or not authenticated
        var user2 = await _auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
    }
    #endregion
}

public class SignInOutCommandExamples(ICommander commander)
{
    private readonly ICommander _commander = commander;

    #region PartAACS_SignInOutCommands
    public async Task SignInOutExamples(Session session, CancellationToken ct)
    {
        // Sign in
        var user = new User("user-123", "John Doe")
            .WithClaim(ClaimTypes.Email, "john@example.com")
            .WithIdentity(new UserIdentity("Google", "google-id-123"));
        var identity = user.Identities.Single().Key;
        await _commander.Call(new AuthBackend_SignIn(session, user, identity), ct);

        // Sign out
        await _commander.Call(new Auth_SignOut(session), ct);

        // Force sign out (invalidates session)
        await _commander.Call(new Auth_SignOut(session, force: true), ct);

        // Sign out specific session
        var targetSessionHash = "abc123";
        await _commander.Call(new Auth_SignOut(session, targetSessionHash, force: true), ct);

        // Sign out all user sessions
        await _commander.Call(new Auth_SignOut(session) { KickAllUserSessions = true, Force = true }, ct);
    }
    #endregion
}

public class SessionInfoExamples(IAuth auth)
{
    private readonly IAuth _auth = auth;

    #region PartAACS_SessionInfo
    public async Task GetSessionInfoExample(Session session, CancellationToken ct)
    {
        // Full session info
        var sessionInfo = await _auth.GetSessionInfo(session, ct);
        Console.WriteLine($"Created: {sessionInfo?.CreatedAt}");
        Console.WriteLine($"Last seen: {sessionInfo?.LastSeenAt}");
        Console.WriteLine($"IP: {sessionInfo?.IPAddress}");

        // Just auth info
        var authInfo = await _auth.GetAuthInfo(session, ct);
        Console.WriteLine($"User ID: {authInfo?.UserId}");
        Console.WriteLine($"Is authenticated: {authInfo?.IsAuthenticated()}");

        // Check forced sign-out
        var isForced = await _auth.IsSignOutForced(session, ct);
    }
    #endregion

    #region PartAACS_UserSessions
    public async Task GetUserSessionsExample(Session session, CancellationToken ct)
    {
        var sessions = await _auth.GetUserSessions(session, ct);
        foreach (var s in sessions) {
            Console.WriteLine($"Session: {s.SessionHash}");
            Console.WriteLine($"  Device: {s.UserAgent}");
            Console.WriteLine($"  IP: {s.IPAddress}");
            Console.WriteLine($"  Last seen: {s.LastSeenAt}");
        }
    }
    #endregion
}

public class SessionTagExamples
{
    #region PartAACS_SessionTags
    public void SessionTagsExample()
    {
        // Add tag to session
        var session1 = Session.New().WithTag("tenant", "acme");

        // Get tag
        var tenant = session1.GetTag("tenant");  // "acme"

        // Multiple tags
        var session2 = Session.New()
            .WithTag("tenant", "acme")
            .WithTag("device", "mobile");
    }
    #endregion
}

public class UserOperationExamples(IAuth auth)
{
    private readonly IAuth _auth = auth;

    #region PartAACS_CheckAuthentication
    public async Task CheckAuthenticationExample(Session session, CancellationToken ct)
    {
        var user = await _auth.GetUser(session, ct);

        // Check if authenticated
        if (user?.IsAuthenticated() == true) { /* ... */ }

        // Check if guest
        if (user?.IsGuest() == true) { /* ... */ }

        // Check role
        if (user?.IsInRole("Admin") == true) { /* ... */ }
    }
    #endregion

    #region PartAACS_UserProperties
    public async Task UserPropertiesExample(Session session, CancellationToken ct)
    {
        var user = await _auth.GetUser(session, ct);
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
    }
    #endregion
}

public record Order;
public record AdminData;
public record PremiumContent;

public class AuthorizationPatternExamples(IAuth auth, AppDbContext db)
{
    private readonly IAuth _auth = auth;
    private readonly AppDbContext _db = db;

    #region PartAACS_RequireAuthentication
    [ComputeMethod]
    public virtual async Task<List<Order>> GetMyOrders(Session session, CancellationToken ct)
    {
        var user = await _auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
        // Query using user.Id for authorization
        _ = _db.Orders.Where(o => o.UserId == user.Id);
        return new List<Order>();
    }
    #endregion

    #region PartAACS_RoleBasedAuth
    [ComputeMethod]
    public virtual async Task<AdminData> GetAdminData(Session session, CancellationToken ct)
    {
        var user = await _auth.GetUser(session, ct).Require();
        if (!user.IsInRole("Admin"))
            throw new SecurityException("Admin access required");

        return await LoadAdminData(ct);
    }
    #endregion

    #region PartAACS_ClaimBasedAuth
    [ComputeMethod]
    public virtual async Task<PremiumContent> GetPremiumContent(Session session, CancellationToken ct)
    {
        var user = await _auth.GetUser(session, ct).Require();
        if (!user.Claims.ContainsKey("subscription:premium"))
            throw new SecurityException("Premium subscription required");

        return await LoadPremiumContent(ct);
    }
    #endregion

    private Task<AdminData> LoadAdminData(CancellationToken ct) => Task.FromResult(new AdminData());
    private Task<PremiumContent> LoadPremiumContent(CancellationToken ct) => Task.FromResult(new PremiumContent());
}

public static class SessionTrimmerConfigExample
{
    public static void Configure(FusionBuilder fusion)
    {
        #region PartAACS_SessionTrimmerConfig
        fusion.AddDbAuthService<AppDbContext, long>(db => {
            db.ConfigureSessionInfoTrimmer(_ => new() {
                MaxSessionAge = TimeSpan.FromDays(90),
                CheckPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
                BatchSize = 1000,
            });
        });
        #endregion
    }
}

#region PartAACS_ServicePattern
// Frontend (exposed via RPC)
public interface IOrderService : IComputeService
{
    [ComputeMethod]
    Task<List<Order>> GetMyOrders(Session session, CancellationToken ct = default);

    [CommandHandler]
    Task CreateOrder(CreateOrderCommand command, CancellationToken ct = default);
}

public record CreateOrderCommand(Session Session, OrderData Data) : ISessionCommand<Order>;
#endregion

public record OrderData;

#region PartAACS_BackendServicePattern
// Backend (server-only)
public interface IOrderBackend : IComputeService, IBackendService
{
    [ComputeMethod]
    Task<List<Order>> GetAllOrders(CancellationToken ct = default);

    [ComputeMethod]
    Task<List<Order>> GetOrdersByUser(string userId, CancellationToken ct = default);
}
#endregion

// DbContext for examples
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options) { }
    public DbSet<DbUser<long>> Users { get; protected set; } = null!;
    public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
    public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;
    public DbSet<DbOrder> Orders => Set<DbOrder>();
}

public class DbOrder
{
    public long Id { get; set; }
    public string UserId { get; set; } = "";
}
