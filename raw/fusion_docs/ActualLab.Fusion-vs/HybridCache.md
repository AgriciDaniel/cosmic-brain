# ActualLab.Fusion vs HybridCache

HybridCache is Microsoft's new caching abstraction in .NET 9 that combines in-memory (L1) and distributed (L2) caching. Both HybridCache and Fusion provide multi-tier caching, but they operate at different abstraction levels.

## The Core Difference

**HybridCache** is a caching primitive — it stores and retrieves values by key with automatic L1/L2 tiering. You still manage cache keys manually and decide when to invalidate. It's `IDistributedCache` with a smarter API and local cache.

**Fusion** is a computational caching framework with automatic dependency tracking. You define compute methods; Fusion handles caching, invalidation cascades, and real-time client synchronization.

## HybridCache Approach

```csharp
public class UserService
{
    private readonly HybridCache _cache;

    public async Task<User> GetUser(string id, CancellationToken ct)
    {
        return await _cache.GetOrCreateAsync(
            $"user:{id}",  // Manual key management
            async token => await _db.Users.FindAsync(id, token),
            new HybridCacheEntryOptions {
                Expiration = TimeSpan.FromMinutes(5),
                LocalCacheExpiration = TimeSpan.FromMinutes(1)
            },
            cancellationToken: ct);
    }

    public async Task<UserProfile> GetUserProfile(string id, CancellationToken ct)
    {
        return await _cache.GetOrCreateAsync(
            $"user-profile:{id}",
            async token => {
                var user = await GetUser(id, token);  // No dependency tracking
                return new UserProfile(user);
            },
            cancellationToken: ct);
    }

    public async Task UpdateUser(string id, UpdateRequest request, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(id, request, ct);

        // Manual invalidation — you must track all dependent keys
        await _cache.RemoveAsync($"user:{id}", ct);
        await _cache.RemoveAsync($"user-profile:{id}", ct);
        // Did you remember all the keys? What about dashboard, team lists, etc.?
    }
}
```

## Fusion Approach

```csharp
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string id, CancellationToken ct)
        => await _db.Users.FindAsync(id, ct);

    [ComputeMethod]
    public virtual async Task<UserProfile> GetUserProfile(string id, CancellationToken ct)
    {
        var user = await GetUser(id, ct);  // Dependency automatically tracked
        return new UserProfile(user);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // GetUserProfile auto-invalidates
    }
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic dependency tracking between cached values
- Cascading invalidation (invalidate one, dependents follow)
- No manual cache key management
- Real-time updates pushed to clients
- Computed values that stay fresh without TTL guessing
- Preventing stale data bugs from forgotten invalidations

### HybridCache is better at

- Drop-in upgrade from IDistributedCache
- Simple key-value caching with TTL
- Works with any backend (Redis, SQL Server, etc.)
- Minimal learning curve for teams
- Stampede protection (single-flight pattern)
- Microsoft-supported, ships with .NET 9

## Feature Comparison

| Feature | HybridCache | Fusion |
|---------|-------------|--------|
| L1 + L2 tiering | Yes (built-in) | Yes (in-process + optional remote) |
| Cache key | Manual strings | Auto-generated from method + args |
| Invalidation | Manual `RemoveAsync` | Automatic via dependencies |
| Dependency tracking | None | Automatic |
| Stampede protection | Yes | Yes |
| Real-time client updates | No | Yes |
| Serialization | Configurable | MemoryPack (optimized) |
| TTL-based expiration | Yes | Optional (invalidation-based preferred) |

## When to Use Each

### Choose HybridCache when:
- Upgrading from IDistributedCache/IMemoryCache
- Simple key-value caching with TTL
- No complex dependencies between cached values
- Team prefers Microsoft-supported primitives
- Caching doesn't need real-time propagation

### Choose Fusion when:
- Computed values depend on other computed values
- Automatic invalidation is more valuable than TTL
- Real-time client updates are needed
- You want to eliminate cache key management
- Dependency tracking prevents stale data bugs

## The Dependency Problem

Consider a dashboard that aggregates multiple data sources:

**HybridCache:**
```csharp
public async Task<Dashboard> GetDashboard(string userId, CancellationToken ct)
{
    return await _cache.GetOrCreateAsync($"dashboard:{userId}", async token =>
    {
        var user = await GetUser(userId, token);
        var orders = await GetUserOrders(userId, token);
        var stats = await GetUserStats(userId, token);
        return new Dashboard(user, orders, stats);
    }, cancellationToken: ct);
}

// When ANY underlying data changes, you must invalidate:
public async Task AddOrder(Order order, CancellationToken ct)
{
    await _db.Orders.AddAsync(order, ct);
    await _cache.RemoveAsync($"orders:{order.UserId}", ct);
    await _cache.RemoveAsync($"user-stats:{order.UserId}", ct);
    await _cache.RemoveAsync($"dashboard:{order.UserId}", ct);
    // What else depends on orders? Revenue reports? Team dashboards?
}
```

**Fusion:**
```csharp
[ComputeMethod]
public virtual async Task<Dashboard> GetDashboard(string userId, CancellationToken ct)
{
    var user = await GetUser(userId, ct);          // Dependency
    var orders = await GetUserOrders(userId, ct);  // Dependency
    var stats = await GetUserStats(userId, ct);    // Dependency
    return new Dashboard(user, orders, stats);
}

[CommandHandler]
public async Task AddOrder(AddOrderCommand cmd, CancellationToken ct)
{
    await _db.Orders.AddAsync(cmd.Order, ct);
    if (Invalidation.IsActive)
        _ = GetUserOrders(cmd.Order.UserId, default);
    // Dashboard, stats, and anything else that depends on orders
    // automatically invalidates through the dependency graph
}
```

## Stampede Protection

Both handle cache stampedes (thundering herd), but differently:

**HybridCache**: Uses single-flight pattern — concurrent requests for the same key coalesce into one fetch.

**Fusion**: Compute methods are inherently single-flighted. Additionally, the dependency graph means related invalidations batch naturally.

## Migration Path

If you're using HybridCache and want Fusion's benefits:

```csharp
// Phase 1: Wrap HybridCache calls in compute methods
[ComputeMethod]
public virtual async Task<User> GetUser(string id, CancellationToken ct)
{
    // Still using HybridCache internally for distributed L2
    return await _cache.GetOrCreateAsync($"user:{id}",
        async token => await _db.Users.FindAsync(id, token),
        cancellationToken: ct);
}

// Phase 2: Let Fusion handle caching entirely
[ComputeMethod]
public virtual async Task<User> GetUser(string id, CancellationToken ct)
    => await _db.Users.FindAsync(id, ct);  // Fusion caches this
```

## The Key Insight

HybridCache is an **improved caching primitive** — excellent for simple key-value caching with L1/L2 tiering and stampede protection. It's a better `IDistributedCache`.

Fusion is a **computational caching framework** — it understands relationships between cached values and automatically manages invalidation cascades.

If your caching needs are simple (store value, retrieve value, expire after TTL), HybridCache is a clean, Microsoft-supported solution. If your challenge is "I have computed values that depend on each other and I keep forgetting to invalidate things," Fusion solves that structural problem.
