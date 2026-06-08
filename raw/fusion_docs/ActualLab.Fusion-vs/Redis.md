# ActualLab.Fusion vs Redis

Redis is a high-performance in-memory data store often used for caching. Both Fusion and Redis provide caching capabilities, but they serve different purposes and operate at different levels.

## The Core Difference

**Redis** is a general-purpose data store. You explicitly store and retrieve values by key. Cache invalidation is your responsibility — you must know what to invalidate when data changes.

**Fusion** is a computational caching layer with automatic dependency tracking. You define compute methods; Fusion caches results and automatically invalidates dependent values when source data changes.

## Redis Approach

```csharp
// Manual caching with Redis
public async Task<User> GetUser(string id)
{
    var cacheKey = $"user:{id}";
    var cached = await _redis.GetAsync<User>(cacheKey);
    if (cached != null)
        return cached;

    var user = await _db.Users.FindAsync(id);
    await _redis.SetAsync(cacheKey, user, TimeSpan.FromMinutes(5));
    return user;
}

// You must manually invalidate
public async Task UpdateUser(string id, UpdateRequest request)
{
    await _db.Users.UpdateAsync(id, request);

    // What keys need invalidation? You must track this yourself.
    await _redis.DeleteAsync($"user:{id}");
    await _redis.DeleteAsync($"user-profile:{id}");
    await _redis.DeleteAsync($"user-permissions:{id}");
    // Did you forget any? Hope not.
}
```

## Fusion Approach

```csharp
// Automatic caching with dependency tracking
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string id, CancellationToken ct)
        => await _db.Users.FindAsync(id, ct);

    [ComputeMethod]
    public virtual async Task<UserProfile> GetUserProfile(string id, CancellationToken ct)
    {
        var user = await GetUser(id, ct);  // Dependency tracked
        return new UserProfile(user);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // GetUserProfile auto-invalidates too
    }
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic dependency tracking between cached values
- No manual invalidation logic (dependencies handle it)
- Computed values that automatically stay fresh
- Real-time updates pushed to clients
- Preventing stale data bugs that plague manual caching
- **39x faster** for remote access, **1,141x faster** for local (see [Performance](#performance))

### Redis is better at

- Distributed caching across multiple servers
- Language-agnostic (works with any stack)
- Rich data structures (lists, sets, sorted sets, hashes)
- Pub/sub and streaming capabilities
- Session storage, rate limiting, and general-purpose caching

## Caching Model Comparison

| Aspect | Redis | Fusion |
|--------|-------|--------|
| Cache location | External server | In-process + optional remote |
| Key management | Manual strings | Automatic (method + args) |
| Invalidation | Manual `DEL` commands | Automatic via dependencies |
| Expiration | TTL-based | Invalidation-based (+ optional TTL) |
| Distributed | Yes (built-in) | Single-server (or explicit sharing) |
| Dependencies | Not tracked | Automatic tracking |

## Performance

Fusion dramatically outperforms Redis — both for remote and local cache access.

### Remote Access

| Benchmark | ActualLab.Rpc | Redis | Speedup |
|-----------|---------------|-------|---------|
| GetUser / GET | 9.03M calls/s | 229K req/s | **~39x** |

Redis benchmark: `redis-benchmark` with optimal client count (12), best of 5 runs.
See [Performance Benchmarks](/Performance) for details.

### Local Access

| Benchmark | Fusion | Redis | Speedup |
|-----------|--------|-------|---------|
| Cached lookup | 261.32M calls/s | 229K req/s | **~1,141x** |

Fusion's in-process cache eliminates network round-trips entirely. Even comparing Fusion's remote RPC access against Redis's local access, Fusion wins by 39x.

### Why is Fusion faster?

- **In-process caching**: Cached values stay in memory — no network hop
- **Binary serialization**: MemoryPack is faster than Redis protocol
- **Connection multiplexing**: Efficient batching over fewer connections
- **No deserialization overhead**: Cached objects are already deserialized

## When to Use Each

### Choose Redis when:
- You need distributed caching across multiple servers
- Caching simple key-value data with TTL
- Using non-.NET systems
- You need Redis-specific features (sorted sets, pub/sub, streams)
- Session storage or rate limiting

### Choose Fusion when:
- Building a .NET application
- Computed values depend on other computed values
- Automatic invalidation is more valuable than TTL
- You want real-time client updates
- Dependency tracking prevents stale data bugs

## The Invalidation Problem

The hardest part of caching is knowing **what to invalidate when**.

**Redis** puts this burden on you:

```csharp
public async Task UpdateProduct(string id, ProductUpdate update)
{
    await _db.Products.UpdateAsync(id, update);

    // Manual invalidation — error-prone
    await _redis.DeleteAsync($"product:{id}");
    await _redis.DeleteAsync($"product-details:{id}");
    await _redis.DeleteAsync($"category:{update.CategoryId}:products");
    await _redis.DeleteAsync("featured-products");
    await _redis.DeleteAsync($"search:*"); // Can't easily invalidate patterns

    // If product price changed, what about:
    // - Cart totals?
    // - Order previews?
    // - Recommendation scores?
}
```

**Fusion** tracks dependencies automatically:

```csharp
[ComputeMethod]
public virtual async Task<decimal> GetCartTotal(string cartId, CancellationToken ct)
{
    var items = await GetCartItems(cartId, ct);
    var total = 0m;
    foreach (var item in items)
    {
        var product = await GetProduct(item.ProductId, ct);  // Dependency!
        total += product.Price * item.Quantity;
    }
    return total;
}

// When a product price changes, GetCartTotal auto-invalidates
// for any cart containing that product
```

## Using Both Together

Fusion and Redis serve different purposes and work well together:

```csharp
// Use Fusion for computed values with dependencies
public class ProductService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<ProductDetails> GetProductDetails(string id, CancellationToken ct)
    {
        var product = await GetProduct(id, ct);
        var reviews = await GetReviews(id, ct);
        var inventory = await GetInventory(id, ct);
        return new ProductDetails(product, reviews, inventory);
    }
}

// Use Redis for simple caching, sessions, rate limiting
public class RateLimiter
{
    public async Task<bool> IsAllowed(string userId)
    {
        var key = $"rate:{userId}:{DateTime.UtcNow:yyyyMMddHHmm}";
        var count = await _redis.IncrementAsync(key);
        if (count == 1)
            await _redis.ExpireAsync(key, TimeSpan.FromMinutes(1));
        return count <= 100;
    }
}
```

## Distributed Scenarios

For distributed caching with Fusion:

1. **Single-server**: Fusion's in-process cache is sufficient
2. **Multi-server**: Use Operations Framework to propagate invalidations
3. **Hybrid**: Use Redis for shared state, Fusion for computed values

```csharp
// Operations Framework propagates invalidations across servers
[CommandHandler]
public async Task UpdateProduct(UpdateProductCommand cmd, CancellationToken ct)
{
    if (Invalidation.IsActive)
    {
        _ = GetProduct(cmd.Id, default);
        return;
    }

    await using var operation = await Commander.Start(cmd, ct);
    await _db.Products.UpdateAsync(cmd.Id, cmd.Data, ct);
    await operation.Commit(ct);
    // Invalidation replayed on all servers via Operations Framework
}
```

## The Key Insight

Redis is a **distributed data store** — excellent for sharing simple cached values across servers with TTL-based expiration.

Fusion is a **computational caching layer** — excellent for caching computed values with automatic dependency-based invalidation.

The question isn't Redis *or* Fusion — it's understanding that they solve different problems. If your challenge is "I have computed values that depend on each other and I'm struggling with cache invalidation," Fusion solves that problem that Redis doesn't address.
