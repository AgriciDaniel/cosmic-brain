# ActualLab.Fusion vs Microsoft Orleans

Orleans is Microsoft's virtual actor framework for building distributed systems. Both Orleans and Fusion enable scalable .NET applications, but they represent fundamentally different programming models.

## The Core Difference

**Orleans** is an actor-based runtime. State is partitioned into "grains" (virtual actors) with identity. Each grain is single-threaded and location-transparent. You think in terms of entities with isolated state and message passing.

**Fusion** is a compute-based caching layer. State is derived from compute methods with automatic dependency tracking. You think in terms of functions that produce cached results and invalidate when inputs change.

## Orleans Approach

```csharp
// Grain interface
public interface IUserGrain : IGrainWithStringKey
{
    Task<User> GetUser();
    Task UpdateUser(UpdateRequest request);
}

// Grain implementation — single-threaded, isolated state
public class UserGrain : Grain, IUserGrain
{
    private User _state;

    public override async Task OnActivateAsync(CancellationToken ct)
    {
        _state = await _db.Users.FindAsync(this.GetPrimaryKeyString(), ct);
    }

    public Task<User> GetUser() => Task.FromResult(_state);

    public async Task UpdateUser(UpdateRequest request)
    {
        _state.Name = request.Name;
        await _db.Users.UpdateAsync(_state);
        // How do other parts of the system know this changed?
        // You must publish events or use Orleans Streams
    }
}

// Client usage
var userGrain = client.GetGrain<IUserGrain>(userId);
var user = await userGrain.GetUser();

// To get updates, you need Orleans Streams or observers
await userGrain.SubscribeToUpdates(myObserver);
```

## Fusion Approach

```csharp
// Compute service — no actor identity, just methods
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);

    [ComputeMethod]
    public virtual async Task<UserWithOrders> GetUserWithOrders(string userId, CancellationToken ct)
    {
        var user = await GetUser(userId, ct);           // Dependency tracked
        var orders = await GetUserOrders(userId, ct);   // Dependency tracked
        return new UserWithOrders(user, orders);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // All dependents notified automatically
    }
}

// Client — automatic updates, no subscription setup
var computed = await Computed.Capture(() => userService.GetUser(userId));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"User updated: {c.Value.Name}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic dependency tracking across computations
- Real-time client synchronization without manual streams
- Simpler mental model (functions, not actors)
- Computed values that span multiple data sources
- UI-focused applications (especially Blazor)
- No cluster membership or placement complexity

### Orleans is better at

- Partitioned state with clear ownership boundaries
- Long-running stateful workflows (grains stay active)
- Distributed systems with strong isolation requirements
- Event sourcing via grain persistence providers
- Geo-distributed deployments with Orleans clusters

## Conceptual Comparison

| Concept | Orleans | Fusion |
|---------|---------|--------|
| Core abstraction | Grain (virtual actor) | `Computed<T>` (cached value) |
| State model | Per-grain isolated state | Dependency graph of computed values |
| Identity | Grain ID (entity-centric) | Method + arguments (query-centric) |
| Concurrency | Single-threaded per grain | Concurrent (thread-safe caching) |
| Distribution | Cluster with grain placement | Single server (+ Operations Framework) |
| Client updates | Orleans Streams / Observers | Automatic via invalidation |
| Scaling unit | Grain activation | Computed value cache |

## When to Use Each

### Choose Orleans when:
- Building entity-centric distributed systems (IoT, gaming, trading)
- State naturally partitions by entity ID
- You need millions of independent stateful actors
- Long-running workflows with durable state
- Geo-distributed deployment is required
- Team is comfortable with actor model concepts

### Choose Fusion when:
- Building data-driven applications with complex queries
- UI must stay synchronized with server state
- Computed values depend on multiple data sources
- You want automatic cache invalidation
- Simpler deployment (no cluster management)
- Blazor or MAUI client applications

## The Mental Model Difference

**Orleans thinks in entities:**
```
User:123 ←── grain holds state for this specific user
User:456 ←── different grain, different state, different server maybe
```

**Fusion thinks in computations:**
```
GetUser("123")     ←── cached result
GetUser("456")     ←── cached result
GetDashboard("123") ←── depends on GetUser("123"), auto-invalidates
```

## Dependency Tracking

Orleans grains are isolated — a grain doesn't automatically know when another grain's state changes:

```csharp
// Orleans: Manual notification required
public class DashboardGrain : Grain, IDashboardGrain
{
    public async Task<Dashboard> GetDashboard()
    {
        var userGrain = GrainFactory.GetGrain<IUserGrain>(_userId);
        var user = await userGrain.GetUser();
        // If user changes, dashboard doesn't know unless you wire up streams
        return new Dashboard(user);
    }
}
```

Fusion tracks dependencies automatically:

```csharp
// Fusion: Automatic dependency tracking
[ComputeMethod]
public virtual async Task<Dashboard> GetDashboard(string userId, CancellationToken ct)
{
    var user = await GetUser(userId, ct);  // Dependency registered
    return new Dashboard(user);
    // When GetUser invalidates, GetDashboard invalidates too
}
```

## Scaling Characteristics

**Orleans:**
- Horizontal scaling via grain distribution across silos
- Each grain activation consumes memory on one server
- Millions of grains spread across cluster
- Cluster membership protocol for coordination

**Fusion:**
- Vertical scaling with efficient caching
- Computed values shared across all requests
- Operations Framework for multi-server invalidation propagation
- No cluster membership needed for basic scenarios

## Using Both Together

Orleans and Fusion can complement each other:

```csharp
// Orleans grain for stateful entity logic
public class OrderGrain : Grain, IOrderGrain
{
    public async Task<Order> PlaceOrder(OrderRequest request)
    {
        // Orleans handles the stateful workflow
        var order = await ProcessOrder(request);

        // Notify Fusion to invalidate cached views
        await _fusionInvalidator.InvalidateUserOrders(request.UserId);
        return order;
    }
}

// Fusion for cached views and real-time UI
public class OrderViewService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<OrderSummary[]> GetUserOrders(string userId, CancellationToken ct)
    {
        // Read from database, cached by Fusion
        // UI clients automatically updated when invalidated
        return await _db.Orders.Where(o => o.UserId == userId).ToArrayAsync(ct);
    }
}
```

## The Key Insight

Orleans is an **actor runtime** — excellent for systems where state naturally partitions by entity identity and you need millions of independent, isolated stateful objects distributed across a cluster.

Fusion is a **caching and synchronization layer** — excellent for applications where you need computed values to stay fresh, dependencies to cascade automatically, and clients to see updates in real-time.

If your problem is "I have millions of IoT devices and each needs isolated state," Orleans is the right tool. If your problem is "I have a dashboard that shows aggregated data and it needs to update when any underlying data changes," Fusion solves that elegantly.

Many large systems use both: Orleans for entity-level stateful logic, Fusion for cached views and real-time UI synchronization.
