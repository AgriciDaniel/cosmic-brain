# ActualLab.Fusion vs IDistributedCache

`IDistributedCache` is .NET's standard abstraction for distributed caching. Both Fusion and `IDistributedCache` provide caching, but they work at very different abstraction levels.

## The Core Difference

**IDistributedCache** is a low-level key-value store interface. You serialize data, store it with a key, and retrieve it later. Invalidation is manual — you delete keys when data changes.

**Fusion** is a high-level caching framework with automatic dependency tracking. You define compute methods; Fusion handles caching, serialization, and invalidation automatically.

## IDistributedCache Approach

```csharp
public class UserService
{
    private readonly IDistributedCache _cache;

    public async Task<User> GetUser(string id)
    {
        var cacheKey = $"user:{id}";
        var cached = await _cache.GetStringAsync(cacheKey);
        if (cached != null)
            return JsonSerializer.Deserialize<User>(cached);

        var user = await _db.Users.FindAsync(id);
        await _cache.SetStringAsync(cacheKey,
            JsonSerializer.Serialize(user),
            new DistributedCacheEntryOptions {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });
        return user;
    }

    public async Task UpdateUser(string id, UpdateRequest request)
    {
        await _db.Users.UpdateAsync(id, request);
        await _cache.RemoveAsync($"user:{id}");
        // What else depends on this user? You must track manually.
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
    public virtual async Task<UserSummary> GetUserSummary(string id, CancellationToken ct)
    {
        var user = await GetUser(id, ct);  // Dependency automatically tracked
        return new UserSummary(user);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // UserSummary auto-invalidates
    }
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic dependency tracking between cached values
- No manual cache key management
- Invalidation-based freshness (not just TTL)
- Real-time updates pushed to clients
- Preventing stale data from complex cache relationships

### IDistributedCache is better at

- Standard .NET interface with multiple providers
- Simple key-value caching with TTL
- Sharing cache across multiple servers
- Drop-in caching for existing code
- Minimal overhead for simple scenarios

## Feature Comparison

| Feature | IDistributedCache | Fusion |
|---------|-------------------|--------|
| Cache key | Manual string | Auto-generated from method + args |
| Serialization | Manual | Automatic |
| Invalidation | Manual `Remove()` | Automatic via dependencies |
| Expiration | TTL only | Invalidation + optional TTL |
| Dependencies | Not tracked | Automatic tracking |
| Real-time updates | Not supported | Built-in |
| Distributed | Yes (interface design) | Optional (Operations Framework) |

## When to Use Each

### Choose IDistributedCache when:
- Simple key-value caching with TTL
- Sharing cache across multiple servers (basic scenarios)
- You need a standard, widely-supported interface
- Caching doesn't have complex dependencies
- Drop-in caching for existing code

### Choose Fusion when:
- Computed values depend on other values
- Automatic invalidation is important
- You want real-time client updates
- Preventing stale data is critical
- Building new .NET applications

## The Dependency Problem

Consider a dashboard that shows user statistics:

**IDistributedCache:**
```csharp
public async Task<DashboardData> GetDashboard(string userId)
{
    var cacheKey = $"dashboard:{userId}";
    var cached = await _cache.GetStringAsync(cacheKey);
    if (cached != null)
        return JsonSerializer.Deserialize<DashboardData>(cached);

    var data = new DashboardData {
        User = await GetUser(userId),
        Orders = await GetUserOrders(userId),
        Stats = await CalculateStats(userId)
    };

    await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(data),
        new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5) });
    return data;
}

// When an order is added, you must remember to invalidate:
public async Task AddOrder(Order order)
{
    await _db.Orders.AddAsync(order);
    await _cache.RemoveAsync($"dashboard:{order.UserId}");
    await _cache.RemoveAsync($"orders:{order.UserId}");
    await _cache.RemoveAsync($"stats:{order.UserId}");
    // Did you get all the keys? Are there others?
}
```

**Fusion:**
```csharp
[ComputeMethod]
public virtual async Task<DashboardData> GetDashboard(string userId, CancellationToken ct)
{
    return new DashboardData {
        User = await GetUser(userId, ct),      // Dependency
        Orders = await GetUserOrders(userId, ct),  // Dependency
        Stats = await CalculateStats(userId, ct)   // Dependency
    };
}

[CommandHandler]
public async Task AddOrder(AddOrderCommand cmd, CancellationToken ct)
{
    await _db.Orders.AddAsync(cmd.Order, ct);
    if (Invalidation.IsActive)
        _ = GetUserOrders(cmd.Order.UserId, default);
    // Dashboard auto-invalidates because it depends on GetUserOrders
}
```

## Migration Path

You can gradually migrate from `IDistributedCache` to Fusion:

```csharp
// Phase 1: Wrap existing cache access in compute methods
[ComputeMethod]
public virtual async Task<User> GetUser(string id, CancellationToken ct)
{
    // Still using IDistributedCache internally
    var cacheKey = $"user:{id}";
    var cached = await _cache.GetStringAsync(cacheKey, ct);
    if (cached != null)
        return JsonSerializer.Deserialize<User>(cached);

    var user = await _db.Users.FindAsync(id, ct);
    await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(user));
    return user;
}

// Phase 2: Let Fusion handle caching, remove IDistributedCache
[ComputeMethod]
public virtual async Task<User> GetUser(string id, CancellationToken ct)
    => await _db.Users.FindAsync(id, ct);  // Fusion caches this
```

## Combining Both

For distributed scenarios, you might use both:

- **IDistributedCache** for simple, shared data (session tokens, rate limits)
- **Fusion** for computed values with dependencies

```csharp
public class HybridService : IComputeService
{
    private readonly IDistributedCache _cache;

    // Simple shared data — IDistributedCache is fine
    public async Task<string> GetSessionToken(string sessionId)
        => await _cache.GetStringAsync($"session:{sessionId}");

    // Computed value with dependencies — use Fusion
    [ComputeMethod]
    public virtual async Task<UserDashboard> GetDashboard(string userId, CancellationToken ct)
    {
        var user = await GetUser(userId, ct);
        var orders = await GetOrders(userId, ct);
        return new UserDashboard(user, orders);
    }
}
```

## The Key Insight

`IDistributedCache` is a **storage abstraction** — it stores and retrieves bytes by key.

Fusion is a **computational caching framework** — it caches the results of method calls and tracks dependencies between them.

If your challenge is "I need to cache some values across servers," `IDistributedCache` works fine. If your challenge is "I have computed values that depend on each other and manual invalidation is error-prone," Fusion solves that higher-level problem.
