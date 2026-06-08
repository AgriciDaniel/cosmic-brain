# ActualLab.Fusion vs EF Core Change Tracking

Entity Framework Core includes change tracking for managing entity state within a DbContext. Both EF Core's change tracking and Fusion track changes, but at very different levels.

## The Core Difference

**EF Core Change Tracking** tracks changes to entities within a single DbContext instance. When you call `SaveChanges()`, it knows what to insert, update, or delete. It's about persisting changes to a database.

**Fusion** tracks dependencies between computed values across your entire application. When data changes, it knows which cached computations need to be invalidated. It's about keeping distributed state synchronized.

## EF Core Change Tracking

```csharp
await using var db = new AppDbContext();

// EF tracks this entity
var user = await db.Users.FindAsync(userId);

// EF detects this change
user.Name = "New Name";

// EF generates UPDATE statement
await db.SaveChangesAsync();

// But other parts of your app don't know the user changed
// Other DbContext instances don't see the update until they query again
```

## Fusion Approach

```csharp
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
    {
        await using var db = DbHub.CreateDbContext();
        return await db.Users.FindAsync(userId, ct);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        if (Invalidation.IsActive)
        {
            _ = GetUser(cmd.UserId, default);  // All observers notified
            return;
        }

        await using var db = DbHub.CreateDbContext();
        var user = await db.Users.FindAsync(cmd.UserId, ct);
        user.Name = cmd.Name;
        await db.SaveChangesAsync(ct);
    }
}

// Any client observing GetUser sees the update automatically
```

## Where Each Excels

### ActualLab.Fusion is better at

- Notifying observers across the application
- Caching query results with automatic invalidation
- Real-time updates to UI clients
- Tracking dependencies between queries
- Reducing database load through caching

### EF Core Change Tracking is better at

- Tracking entity state within a unit of work
- Generating efficient SQL (only changed columns)
- Optimistic concurrency with row versions
- Navigation property change detection
- Disconnected entity scenarios

## Scope Comparison

| Aspect | EF Core Change Tracking | Fusion |
|--------|------------------------|--------|
| Scope | Single DbContext | Entire application |
| Tracks | Entity property changes | Computed value dependencies |
| Purpose | Generate SQL statements | Invalidate cached results |
| Lifetime | DbContext lifetime | Application lifetime |
| Cross-process | No | Yes (with Operations Framework) |
| Client notification | No | Yes |

## When to Use Each

### Rely on EF Core Change Tracking when:
- Persisting entity changes to database
- You need optimistic concurrency
- Working within a single unit of work
- Tracking which properties changed for auditing
- Using disconnected entities (attach/detach)

### Add Fusion when:
- Multiple parts of your app need to know about changes
- UI clients should see updates in real-time
- You want to cache query results
- Different queries depend on the same underlying data
- Reducing database queries matters

## They Solve Different Problems

```csharp
// Scenario: User updates their profile

// EF Core handles: persisting to database
await using var db = new AppDbContext();
var user = await db.Users.FindAsync(userId);
user.Bio = newBio;
await db.SaveChangesAsync();  // EF generates: UPDATE Users SET Bio = @p0 WHERE Id = @p1

// Fusion handles: notifying everyone who cares
if (Invalidation.IsActive)
{
    _ = GetUser(userId, default);        // Profile page refreshes
    _ = GetUserSummary(userId, default); // Sidebar refreshes
    _ = GetTeamMembers(teamId, default); // Team list refreshes
}
```

## Fusion + EF Core Together

Fusion and EF Core are complementary:

```csharp
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
    {
        // EF Core loads the data
        await using var db = DbHub.CreateDbContext();
        return await db.Users
            .AsNoTracking()  // No change tracking needed for reads
            .FirstOrDefaultAsync(u => u.Id == userId, ct);
        // Fusion caches the result and tracks who's observing
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        if (Invalidation.IsActive)
        {
            _ = GetUser(cmd.UserId, default);
            return;
        }

        await using var db = DbHub.CreateDbContext();
        var user = await db.Users.FindAsync(cmd.UserId, ct);
        user.Name = cmd.Name;
        // EF Core tracks the change and generates SQL
        await db.SaveChangesAsync(ct);
        // Fusion invalidates cached GetUser result
    }
}
```

## ActualLab.Fusion.EntityFramework

Fusion provides EF Core integration that simplifies this pattern:

```csharp
public class UserService : DbServiceBase<AppDbContext>, IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
    {
        await using var db = await DbHub.CreateDbContext(ct);
        return await db.Users.FindAsync(userId, ct);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        if (Invalidation.IsActive)
        {
            _ = GetUser(cmd.UserId, default);
            return;
        }

        await using var db = await DbHub.CreateDbContext(ct);
        // ... update and save
    }
}
```

See [Entity Framework Extensions](/PartEF) for details.

## The Key Insight

EF Core Change Tracking answers: "What SQL do I need to persist these entity changes?"

Fusion answers: "Who in my application needs to know that this data changed?"

They work at different levels:
- **EF Core**: Object ↔ Database synchronization
- **Fusion**: Application ↔ Client synchronization

Use EF Core to persist changes. Use Fusion to propagate awareness of those changes throughout your application and to connected clients.
