# Database Authentication Services

This document covers Fusion's database-backed authentication services, entity types, repositories, and the session trimmer.


## Overview

Fusion provides two authentication service implementations:

| Service | Storage | Use Case |
|---------|---------|----------|
| `InMemoryAuthService` | Memory | Development, testing |
| `DbAuthService<...>` | Database via EF Core | Production |

Both implement `IAuth` and `IAuthBackend`, so they can be used interchangeably.


## Registration

### In-Memory Auth Service

```csharp
var fusion = services.AddFusion();
fusion.AddInMemoryAuthService();
```

> **Note**: In-memory storage is lost on restart. Use only for development or testing.

### Database Auth Service

```csharp
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
```


## Database Entities

### DbContext Setup

Your `DbContext` must include these `DbSet` properties:

```csharp
public class AppDbContext : DbContext
{
    public DbSet<DbUser<long>> Users { get; protected set; } = null!;
    public DbSet<DbUserIdentity<long>> UserIdentities { get; protected set; } = null!;
    public DbSet<DbSessionInfo<long>> Sessions { get; protected set; } = null!;

    // Your other entities...
}
```


### DbSessionInfo&lt;TDbUserId&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbSessionInfo.cs)

Stores session information in the database.

**Table**: `_Sessions`

| Column | Type | Description |
|--------|------|-------------|
| `Id` | `string(256)` | Primary key (session ID) |
| `Version` | `long` | Concurrency token |
| `CreatedAt` | `DateTime` | Creation timestamp |
| `LastSeenAt` | `DateTime` | Last activity timestamp |
| `IPAddress` | `string` | Client IP address |
| `UserAgent` | `string` | Client user agent |
| `AuthenticatedIdentity` | `string` | Serialized `UserIdentity` |
| `UserId` | `TDbUserId?` | Foreign key to `Users` |
| `IsSignOutForced` | `bool` | Force sign-out flag |
| `OptionsJson` | `string` | Serialized `ImmutableOptionSet` |

**Indexes**:
- `(CreatedAt, IsSignOutForced)`
- `(LastSeenAt, IsSignOutForced)`
- `(UserId, IsSignOutForced)`
- `(IPAddress, IsSignOutForced)`

### DbUser&lt;TDbUserId&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbUser.cs)

Stores user information in the database.

**Table**: `Users`

| Column | Type | Description |
|--------|------|-------------|
| `Id` | `TDbUserId` | Primary key |
| `Version` | `long` | Concurrency token |
| `Name` | `string(min 3)` | Display name |
| `ClaimsJson` | `string` | Serialized claims dictionary |

**Indexes**:
- `(Name)`

**Navigation Properties**:
- `Identities` - Collection of `DbUserIdentity<TDbUserId>`

### DbUserIdentity&lt;TDbUserId&gt;

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbUserIdentity.cs)

Stores user authentication identities (OAuth providers, local accounts, etc.).

**Table**: `UserIdentities`

| Column | Type | Description |
|--------|------|-------------|
| `Id` | `string` | Primary key (schema/id format) |
| `DbUserId` | `TDbUserId` | Foreign key to `Users` |
| `Secret` | `string` | Optional secret (e.g., password hash) |


## DbAuthService Configuration

### Options

```csharp
public record Options
{
    // Minimum time between presence updates (default: 2.75 minutes)
    // Should be less than PresenceReporter's update period (3 minutes)
    public TimeSpan MinUpdatePresencePeriod { get; init; } = TimeSpan.FromMinutes(2.75);
}
```

### Usage

```csharp
fusion.AddDbAuthService<AppDbContext, long>(db => {
    db.ConfigureAuthService(_ => new DbAuthService<AppDbContext>.Options() {
        MinUpdatePresencePeriod = TimeSpan.FromMinutes(2),
    });
});
```


## DbSessionInfoTrimmer

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Ext.Services/Authentication/Services/DbSessionInfoTrimmer.cs)

A background service that periodically removes old sessions from the database.

### Options

```csharp
public record Options
{
    // Maximum session age before deletion (default: 60 days)
    public TimeSpan MaxSessionAge { get; init; } = TimeSpan.FromDays(60);

    // How often to check for expired sessions (default: 15 min ± 25%)
    public RandomTimeSpan CheckPeriod { get; init; } = TimeSpan.FromMinutes(15).ToRandom(0.25);

    // Retry delays on failure (default: 15s, then up to 10min)
    public RetryDelaySeq RetryDelays { get; init; } = RetryDelaySeq.Exp(
        TimeSpan.FromSeconds(15),
        TimeSpan.FromMinutes(10));

    // Batch size for deletion (default: 4096 on .NET 7+, 1024 on older)
    public int BatchSize { get; init; } = 4096;

    // Log level for trim operations
    public LogLevel LogLevel { get; init; } = LogLevel.Information;

    // Enable OpenTelemetry tracing
    public bool IsTracingEnabled { get; init; }
}
```

### Configuration

```csharp
fusion.AddDbAuthService<AppDbContext, long>(db => {
    db.ConfigureSessionInfoTrimmer(_ => new DbSessionInfoTrimmer<AppDbContext>.Options() {
        MaxSessionAge = TimeSpan.FromDays(90),
        CheckPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
        BatchSize = 1000,
    });
});
```

### How It Works

1. Runs as a hosted service (`IHostedService`)
2. Waits for `CheckPeriod` (randomized to spread load)
3. Deletes sessions where `LastSeenAt < (Now - MaxSessionAge)` in batches
4. Uses `ExecuteDeleteAsync` on .NET 7+ for efficient bulk deletion
5. Retries with exponential backoff on failure


## Custom Entity Types

You can extend the default entity types:

### Custom DbUser

```csharp
[Table("Users")]
public class AppUser : DbUser<long>
{
    public string Email { get; set; } = "";
    public string AvatarUrl { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}
```

### Custom DbSessionInfo

```csharp
[Table("_Sessions")]
public class AppSession : DbSessionInfo<long>
{
    public string DeviceId { get; set; } = "";
    public string Country { get; set; } = "";
}
```

### Registration with Custom Types

```csharp
fusion.AddDbAuthService<AppDbContext, AppSession, AppUser, long>();
```


## Entity Converters

Fusion automatically registers converters between database entities and Fusion types:

| Database Entity | Fusion Type |
|-----------------|-------------|
| `DbUser<TDbUserId>` | `User` |
| `DbSessionInfo<TDbUserId>` | `SessionInfo` |

### Custom Converters

```csharp
public class CustomUserConverter : DbUserConverter<AppDbContext, AppUser, long>
{
    public override User ToModel(AppUser dbEntity)
    {
        var user = base.ToModel(dbEntity);
        // Add custom claims from your entity
        return user.WithClaim("email", dbEntity.Email);
    }

    public override AppUser UpdateEntity(User source, AppUser target)
    {
        target = base.UpdateEntity(source, target);
        // Extract claims to entity properties
        target.Email = source.Claims.GetValueOrDefault("email") ?? "";
        return target;
    }
}

// Register custom converter
services.AddSingleton<
    IDbEntityConverter<AppDbContext, AppUser, User>,
    CustomUserConverter>();
```


## Entity Resolvers

Entity resolvers handle loading entities from the database with caching:

```csharp
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
```


## Repositories

Fusion registers these repository interfaces automatically:

| Interface | Description |
|-----------|-------------|
| `IDbUserRepo<TDbContext, TDbUser, TDbUserId>` | User CRUD operations |
| `IDbSessionInfoRepo<TDbContext, TDbSessionInfo, TDbUserId>` | Session CRUD operations |

### Custom Repository Implementation

```csharp
public class CustomUserRepo : DbUserRepo<AppDbContext, AppUser, long>
{
    public CustomUserRepo(IServiceProvider services) : base(services) { }

    public override async Task<AppUser?> Get(long userId, CancellationToken ct)
    {
        // Custom loading logic
        var user = await base.Get(userId, ct);
        // Additional processing...
        return user;
    }
}

// Register
services.AddSingleton<
    IDbUserRepo<AppDbContext, AppUser, long>,
    CustomUserRepo>();
```


## User ID Handlers

The `IDbUserIdHandler<TDbUserId>` interface handles user ID generation and parsing:

```csharp
public interface IDbUserIdHandler<TDbUserId>
{
    string Format(TDbUserId userId);
    TDbUserId Parse(string userIdString);
    TDbUserId New();
}
```

### Built-in Handlers

| Type | Generation Strategy |
|------|---------------------|
| `long` | Incremental |
| `string` | GUID-based |
| `Guid` | `Guid.NewGuid()` |

### Custom Handler

```csharp
public class MyUserIdHandler : IDbUserIdHandler<long>
{
    private long _nextId = 1000;

    public string Format(long userId) => userId.ToString();
    public long Parse(string s) => long.Parse(s);
    public long New() => Interlocked.Increment(ref _nextId);
}

services.AddSingleton<IDbUserIdHandler<long>, MyUserIdHandler>();
```


## Operations Framework Integration

`DbAuthService` requires the Operations Framework for command handling:

```csharp
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
```

See [Part 5: Operations Framework](PartO.md) for details.


## Migrations

When using EF Core migrations, ensure your migration includes the auth tables:

```csharp
public partial class AddAuthTables : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<long>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Version = table.Column<long>(nullable: false),
                Name = table.Column<string>(maxLength: 256, nullable: false),
                ClaimsJson = table.Column<string>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Users", x => x.Id));

        migrationBuilder.CreateTable(
            name: "UserIdentities",
            columns: table => new
            {
                Id = table.Column<string>(maxLength: 256, nullable: false),
                DbUserId = table.Column<long>(nullable: false),
                Secret = table.Column<string>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserIdentities", x => x.Id);
                table.ForeignKey(
                    name: "FK_UserIdentities_Users_DbUserId",
                    column: x => x.DbUserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "_Sessions",
            columns: table => new
            {
                Id = table.Column<string>(maxLength: 256, nullable: false),
                Version = table.Column<long>(nullable: false),
                CreatedAt = table.Column<DateTime>(nullable: false),
                LastSeenAt = table.Column<DateTime>(nullable: false),
                IPAddress = table.Column<string>(nullable: false),
                UserAgent = table.Column<string>(nullable: false),
                AuthenticatedIdentity = table.Column<string>(nullable: false),
                UserId = table.Column<long>(nullable: true),
                IsSignOutForced = table.Column<bool>(nullable: false),
                OptionsJson = table.Column<string>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK__Sessions", x => x.Id));

        // Create indexes...
    }
}
```
