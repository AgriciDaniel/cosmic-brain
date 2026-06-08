using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.Authentication;
using ActualLab.Fusion.Authentication.Services;
using ActualLab.Fusion.EntityFramework;

// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAADB;

// ============================================================================
// PartAA-DB.md snippets: Database Authentication Services
// ============================================================================

public static class AuthServiceRegistration
{
    public static void InMemoryAuth(IServiceCollection services)
    {
        #region PartAADB_InMemoryAuth
        var fusion = services.AddFusion();
        fusion.AddInMemoryAuthService();
        #endregion
    }

    public static void DbAuthService(IServiceCollection services)
    {
        #region PartAADB_DbAuthService
        var fusion = services.AddFusion();

        // Simple registration (uses default entity types)
        fusion.AddDbAuthService<AppDbContext, string>();  // string user ID
        fusion.AddDbAuthService<AppDbContext, long>();    // long user ID

        // Custom entity types
        fusion.AddDbAuthService<AppDbContext, MyDbSessionInfo, MyDbUser, Guid>(db => {
            db.ConfigureAuthService(_ => new DbAuthService<AppDbContext>.Options() {
                MinUpdatePresencePeriod = TimeSpan.FromMinutes(3),
            });

            db.ConfigureSessionInfoTrimmer(_ => new DbSessionInfoTrimmer<AppDbContext>.Options() {
                MaxSessionAge = TimeSpan.FromDays(90),
                CheckPeriod = TimeSpan.FromMinutes(30).ToRandom(0.25),
            });
        });
        #endregion
    }
}

#region PartAADB_DbContextSetup
public class AppDbContext : DbContext
{
    public DbSet<DbUser<long>> Users { get; protected set; } = null!;
    public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
    public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;

    public AppDbContext(DbContextOptions options) : base(options) { }

    // Your other entities...
}
#endregion

// Custom types used by DbAuthService snippet above
public class MyDbSessionInfo : DbSessionInfo<Guid>;
public class MyDbUser : DbUser<Guid>;

public static class DbAuthServiceConfigExample
{
    public static void ConfigureOptions(FusionBuilder fusion)
    {
        #region PartAADB_AuthServiceOptions
        fusion.AddDbAuthService<AppDbContext, long>(db => {
            db.ConfigureAuthService(_ => new DbAuthService<AppDbContext>.Options() {
                MinUpdatePresencePeriod = TimeSpan.FromMinutes(2),
            });
        });
        #endregion
    }
}

public static class SessionTrimmerConfigExample
{
    public static void ConfigureTrimmer(FusionBuilder fusion)
    {
        #region PartAADB_SessionTrimmerConfig
        fusion.AddDbAuthService<AppDbContext, long>(db => {
            db.ConfigureSessionInfoTrimmer(_ => new DbSessionInfoTrimmer<AppDbContext>.Options() {
                MaxSessionAge = TimeSpan.FromDays(90),
                CheckPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
                BatchSize = 1000,
            });
        });
        #endregion
    }
}

#region PartAADB_CustomDbUser
[Table("Users")]
public class AppUser : DbUser<long>
{
    public string Email { get; set; } = "";
    public string AvatarUrl { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}
#endregion

#region PartAADB_CustomDbSessionInfo
[Table("_Sessions")]
public class AppSession : DbSessionInfo<long>
{
    public string DeviceId { get; set; } = "";
    public string Country { get; set; } = "";
}
#endregion

public static class CustomRegistrationExample
{
    public static void Register(FusionBuilder fusion)
    {
        #region PartAADB_CustomTypeRegistration
        fusion.AddDbAuthService<AppDbContext, AppSession, AppUser, long>();
        #endregion
    }
}

#region PartAADB_CustomConverter
public class CustomUserConverter(IServiceProvider services)
    : DbUserConverter<AppDbContext, AppUser, long>(services)
{
    public override User? ToModel(AppUser? dbEntity)
    {
        var user = base.ToModel(dbEntity);
        // Add custom claims from your entity
        return user?.WithClaim("email", dbEntity!.Email);
    }

    public override void UpdateEntity(User source, AppUser target)
    {
        base.UpdateEntity(source, target);
        // Extract claims to entity properties
        target.Email = source.Claims.GetValueOrDefault("email") ?? "";
    }
}

// Register custom converter:
// services.AddSingleton<IDbUserConverter<AppDbContext, AppUser, long>, CustomUserConverter>();
#endregion

public static class EntityResolverConfigExample
{
    public static void Configure(FusionBuilder fusion)
    {
        #region PartAADB_EntityResolverConfig
        fusion.AddDbAuthService<AppDbContext, long>(db => {
            // Configure user entity resolver
            db.ConfigureUserEntityResolver(_ =>
                new DbEntityResolver<AppDbContext, long, DbUser<long>>.Options() {
                    QueryTransformer = q => q
                        .Include(u => u.Identities)
                        .AsNoTracking(),
                });

            // Configure session info entity resolver
            db.ConfigureSessionInfoEntityResolver(_ =>
                new DbEntityResolver<AppDbContext, string, DbSessionInfo<long>>.Options() {
                    QueryTransformer = q => q.AsNoTracking(),
                });
        });
        #endregion
    }
}

#region PartAADB_CustomRepo
public class CustomUserRepo(DbAuthService<AppDbContext>.Options settings, IServiceProvider services)
    : DbUserRepo<AppDbContext, AppUser, long>(settings, services)
{
    public override async Task<AppUser?> Get(
        AppDbContext dbContext, long userId, bool forUpdate, CancellationToken ct)
    {
        // Custom loading logic
        var user = await base.Get(dbContext, userId, forUpdate, ct);
        // Additional processing...
        return user;
    }
}

// Register:
// services.AddSingleton<IDbUserRepo<AppDbContext, AppUser, long>, CustomUserRepo>();
#endregion

#region PartAADB_DbUserIdHandler
public interface IDbUserIdHandler<TDbUserId>
{
    string Format(TDbUserId userId);
    TDbUserId Parse(string userIdString);
    TDbUserId New();
}
#endregion

#region PartAADB_CustomUserIdHandler
public class MyUserIdHandler : IDbUserIdHandler<long>
{
    private long _nextId = 1000;

    public string Format(long userId) => userId.ToString();
    public long Parse(string s) => long.Parse(s);
    public long New() => Interlocked.Increment(ref _nextId);
}

// services.AddSingleton<IDbUserIdHandler<long>, MyUserIdHandler>();
#endregion

public static class OperationsFrameworkIntegration
{
    public static void Setup(IServiceCollection services)
    {
        #region PartAADB_OperationsFramework
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                operations.ConfigureOperationLogReader(_ => new() {
                    CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.05),
                });

                // Choose one notification mechanism:
                operations.AddFileSystemOperationLogWatcher();    // File-based
                // operations.AddNpgsqlOperationLogWatcher();     // PostgreSQL
                // operations.AddRedisOperationLogWatcher();      // Redis
            });
        });
        #endregion
    }
}
