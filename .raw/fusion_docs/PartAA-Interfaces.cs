using System.Runtime.Serialization;
using System.Security.Claims;
using ActualLab.Api;
using ActualLab.Fusion.Authentication;
using ActualLab.Rpc;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAAInterfaces;

// ============================================================================
// PartAA-Interfaces.md snippets: Authentication Interfaces
// ============================================================================

public record Order
{
    public long Id { get; init; }
    public string UserId { get; init; } = "";
}

#region PartAAI_AuthUsageExample
public class OrderService : IOrderService
{
    private readonly IAuth _auth;

    public OrderService(IAuth auth) => _auth = auth;

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

    private Task<List<Order>> GetOrdersForUser(string userId, CancellationToken ct)
        => Task.FromResult(new List<Order>());
}
#endregion

public interface IOrderService : IComputeService
{
    Task<List<Order>> GetMyOrders(Session session, CancellationToken ct = default);
}

#region PartAAI_AuthSignOut
// The real Auth_SignOut record (in ActualLab.Fusion.Authentication) has this shape:
[DataContract]
public partial record Auth_SignOutExample : ISessionCommand<Unit>
{
    public Session Session { get; init; } = null!;
    public string? KickUserSessionHash { get; init; }  // Kick specific session
    public bool KickAllUserSessions { get; init; }     // Kick all user's sessions
    public bool Force { get; init; }                   // Force sign-out (requires new session)
}
#endregion

public class AuthSignOutUsageExamples(ICommander commander)
{
    private readonly ICommander _commander = commander;

    #region PartAAI_AuthSignOutUsage
    public async Task SignOutExamples(Session session, CancellationToken ct)
    {
        // Simple sign-out
        await _commander.Call(new Auth_SignOut(session), ct);

        // Forced sign-out (invalidates session permanently)
        await _commander.Call(new Auth_SignOut(session, force: true), ct);

        // Kick a specific session
        var kickSessionHash = "abc123";
        await _commander.Call(new Auth_SignOut(session, kickSessionHash, force: true), ct);

        // Kick all sessions ("Sign out everywhere")
        await _commander.Call(new Auth_SignOut(session) { KickAllUserSessions = true, Force = true }, ct);
    }
    #endregion
}

public class AuthEditUserExample(ICommander commander)
{
    private readonly ICommander _commander = commander;

    #region PartAAI_AuthEditUser
    public async Task EditUserExample(Session session, CancellationToken ct)
    {
        await _commander.Call(new Auth_EditUser(session, "New Name"), ct);
    }
    #endregion
}

public class AuthBackendSignInExample(ICommander commander)
{
    private readonly ICommander _commander = commander;

    #region PartAAI_AuthBackendSignIn
    public async Task SignInExample(Session session, CancellationToken ct)
    {
        var user = new User("user-123", "John Doe") {
            Claims = new ApiMap<string, string> {
                { ClaimTypes.Email, "john@example.com" }
            },
            Identities = new ApiMap<UserIdentity, string>() {
                { new UserIdentity("Google", "google-id-123"), "" }
            }
        };
        var identity = user.Identities.Single().Key;
        await _commander.Call(new AuthBackend_SignIn(session, user, identity), ct);
    }
    #endregion
}

public class UserRequireExamples(IAuth auth)
{
    private readonly IAuth _auth = auth;

    #region PartAAI_UserRequire
    public async Task RequireExamples(Session session, CancellationToken ct)
    {
        // Throws if user is null
        var user1 = await _auth.GetUser(session, ct).Require();

        // Throws if user is null or not authenticated
        var user2 = await _auth.GetUser(session, ct).Require(User.MustBeAuthenticated);
    }
    #endregion
}

public class UserCreationExamples
{
    #region PartAAI_UserCreation
    public void CreateUserExamples()
    {
        // Guest user (not authenticated)
        var guest = User.NewGuest("Anonymous");

        // Authenticated user
        var user = new User("user-123", "John Doe")
            .WithClaim(ClaimTypes.Email, "john@example.com")
            .WithIdentity(new UserIdentity("Google", "google-id-123"));
    }
    #endregion
}

public class UserIdentityExamples
{
    #region PartAAI_UserIdentityCreation
    public void CreateIdentityExamples()
    {
        // From schema and ID
        var identity1 = new UserIdentity("Google", "google-user-id");

        // Using tuple syntax
        UserIdentity identity2 = ("GitHub", "github-user-id");

        // From serialized string
        var identity3 = new UserIdentity("Google/google-user-id");
    }
    #endregion

    #region PartAAI_DefaultSchema
    public void DefaultSchemaExample()
    {
        // Set the default schema (used when parsing IDs without explicit schema)
        UserIdentity.DefaultSchema = "Local";

        // This identity uses the default schema
        var identity = new UserIdentity("user-123");
        // identity.Schema == "Local"
        // identity.SchemaBoundId == "user-123"
    }
    #endregion
}

public class SessionExamples
{
    #region PartAAI_SessionTags
    public void SessionTagsExample()
    {
        // Create session with tags
        var session = Session.New().WithTag("tenant", "acme");

        // Get tag value
        var tenant = session.GetTag("tenant"); // "acme"

        // Get all tags
        var tags = session.GetTags(); // "tenant=acme"
    }
    #endregion

    #region PartAAI_DefaultSession
    public static async Task DefaultSessionExample(ISessionResolver sessionResolver, IAuth auth, CancellationToken ct)
    {
        // On Blazor WASM client
        sessionResolver.Session = Session.Default;

        // When calling server methods, Session.Default is auto-replaced
        var user = await auth.GetUser(Session.Default, ct);
        // Server sees the real session from the cookie
        _ = user;
    }
    #endregion
}

public static class SessionResolverExample
{
    #region PartAAI_SessionResolver
    // The ISessionResolver interface (simplified):
    //
    //   public interface ISessionResolver
    //   {
    //       Session Session { get; set; }
    //   }
    //
    // Automatically registered by AddFusion():
    public static void RegisterSessionResolver(IServiceCollection services)
    {
        services.AddScoped<ISessionResolver>(c => new SessionResolver(c));
        services.AddScoped(c => c.GetRequiredService<ISessionResolver>().Session);
    }
    #endregion
}

public interface IMyService : IComputeService
{
    Task<string> GetData(CancellationToken ct = default);
}

public class SessionResolverUsageExample(ISessionResolver sessionResolver) : IMyService
{
    private readonly ISessionResolver _sessionResolver = sessionResolver;

    #region PartAAI_SessionResolverUsage
    [ComputeMethod]
    public virtual async Task<string> GetData(CancellationToken ct)
    {
        var session = _sessionResolver.Session;
        // Use session...
        return "";
    }
    #endregion
}

#region PartAAI_ServiceDesignPattern
// Frontend (exposed via RPC)
public interface IOrderServiceFrontend : IComputeService
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
#endregion

public record CreateOrderCommand(Session Session, string Data) : ISessionCommand<Order>;
