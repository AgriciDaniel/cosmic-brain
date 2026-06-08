# ActualLab.Fusion vs Akka.NET

Akka.NET is a port of the Akka actor framework to .NET, providing tools for building concurrent and distributed systems. Both Akka.NET and Fusion enable scalable applications, but they represent fundamentally different paradigms.

## The Core Difference

**Akka.NET** is an actor-based toolkit. You build systems from actors that communicate via message passing. State is encapsulated within actors; concurrency is handled by processing one message at a time. It's a general-purpose framework for distributed, event-driven systems.

**Fusion** is a compute-based caching layer. You define methods that return values; Fusion caches results and tracks dependencies. When data changes, dependent computations invalidate automatically. It's purpose-built for reactive, cache-aware applications.

## Akka.NET Approach

```csharp
// Actor definition
public class UserActor : ReceiveActor
{
    private User _state;

    public UserActor(string userId)
    {
        ReceiveAsync<GetUser>(async msg =>
        {
            _state ??= await _db.Users.FindAsync(userId);
            Sender.Tell(_state);
        });

        ReceiveAsync<UpdateUser>(async msg =>
        {
            _state.Name = msg.Name;
            await _db.Users.UpdateAsync(_state);
            Sender.Tell(Done.Instance);

            // Notify interested parties via pub/sub or direct messages
            Context.System.EventStream.Publish(new UserUpdated(userId));
        });
    }
}

// Client usage
var userActor = system.ActorOf(Props.Create(() => new UserActor(userId)));
var user = await userActor.Ask<User>(new GetUser());

// For updates, subscribe to event stream
system.EventStream.Subscribe<UserUpdated>(Self);
```

## Fusion Approach

```csharp
// Compute service — standard .NET service with caching
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);

    [ComputeMethod]
    public virtual async Task<UserDashboard> GetDashboard(string userId, CancellationToken ct)
    {
        var user = await GetUser(userId, ct);           // Dependency tracked
        var stats = await GetUserStats(userId, ct);     // Dependency tracked
        return new UserDashboard(user, stats);
    }

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // Dashboard auto-invalidates
    }
}

// Client — automatic real-time updates
var computed = await Computed.Capture(() => userService.GetUser(userId));
await foreach (var c in computed.Changes(ct))
    UpdateUI(c.Value);  // No manual subscription wiring
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic dependency tracking between computations
- Real-time client synchronization without message wiring
- Simpler programming model (methods, not actors and messages)
- UI-focused applications (Blazor, MAUI)
- Cache-aware applications with invalidation
- Standard ASP.NET Core integration (DI, middleware)

### Akka.NET is better at

- Complex distributed systems with supervision hierarchies
- Event-driven architectures with sophisticated message routing
- Systems requiring location transparency across clusters
- Long-running stateful workflows
- Backpressure-aware stream processing (Akka Streams)
- Teams experienced with actor model patterns

## Programming Model Comparison

| Aspect | Akka.NET | Fusion |
|--------|----------|--------|
| Core abstraction | Actor (message processor) | Compute method (cached function) |
| Communication | Message passing | Method calls |
| State isolation | Per-actor | Shared cache with dependencies |
| Concurrency model | Actor mailbox (sequential) | Thread-safe caching |
| Error handling | Supervision strategies | Standard try/catch + `Result<T>` |
| Distribution | Akka.Remote / Akka.Cluster | Operations Framework |
| Learning curve | Steep (actor thinking) | Gentle (familiar .NET patterns) |

## When to Use Each

### Choose Akka.NET when:
- Building complex distributed systems with supervision trees
- You need sophisticated message routing (routers, dispatchers)
- Event-driven architecture with backpressure (Akka Streams)
- Team is experienced with actor model
- Long-running processes with complex state machines
- Location-transparent clustering is required

### Choose Fusion when:
- Building data-driven applications with cached queries
- UI clients need real-time synchronization
- You want standard .NET development experience
- Automatic cache invalidation is valuable
- Blazor or MAUI frontend applications
- Team prefers methods over message passing

## The Complexity Trade-off

Akka.NET provides powerful primitives but requires learning actor thinking:

```csharp
// Akka.NET: Supervision, message routing, lifecycle management
public class UserSupervisor : ReceiveActor
{
    public UserSupervisor()
    {
        var strategy = new OneForOneStrategy(
            maxNrOfRetries: 3,
            withinTimeRange: TimeSpan.FromMinutes(1),
            localOnlyDecider: ex => ex switch
            {
                DbException => Directive.Restart,
                _ => Directive.Escalate
            });

        Receive<GetUserRequest>(msg =>
        {
            var child = Context.Child(msg.UserId)
                ?? Context.ActorOf(Props.Create(() => new UserActor(msg.UserId)), msg.UserId);
            child.Forward(msg);
        });
    }
}
```

Fusion uses familiar .NET patterns:

```csharp
// Fusion: Standard services with attributes
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);
    // Caching, invalidation, real-time — all automatic
}
```

## Dependency Tracking

Akka.NET actors are isolated — you must explicitly wire up notifications:

```csharp
// Akka.NET: Manual event propagation
public class DashboardActor : ReceiveActor
{
    public DashboardActor(string userId)
    {
        // Subscribe to user changes
        Context.System.EventStream.Subscribe<UserUpdated>(Self);

        Receive<UserUpdated>(msg =>
        {
            if (msg.UserId == _userId)
                RefreshDashboard();  // Manual refresh logic
        });
    }
}
```

Fusion tracks dependencies automatically:

```csharp
// Fusion: Automatic dependency graph
[ComputeMethod]
public virtual async Task<Dashboard> GetDashboard(string userId, CancellationToken ct)
{
    var user = await GetUser(userId, ct);      // Dependency A
    var orders = await GetOrders(userId, ct);  // Dependency B
    return new Dashboard(user, orders);
    // Invalidating A or B automatically invalidates this dashboard
}
```

## Stream Processing

**Akka Streams** excels at backpressure-aware stream processing:

```csharp
// Akka Streams: Complex stream transformations
var source = Source.From(Enumerable.Range(1, 1000));
var flow = Flow.Create<int>()
    .Select(x => x * 2)
    .Buffer(100, OverflowStrategy.Backpressure)
    .Throttle(10, TimeSpan.FromSeconds(1), 1, ThrottleMode.Shaping);
var sink = Sink.ForEach<int>(Console.WriteLine);

await source.Via(flow).RunWith(sink, materializer);
```

**Fusion** is not designed for stream processing — it's for cached computed values:

```csharp
// Fusion: Computed values, not streams
[ComputeMethod]
public virtual async Task<Stats> GetRealtimeStats(CancellationToken ct)
{
    // Cached, auto-invalidated when data changes
    return await ComputeStats();
}
```

For stream processing needs alongside Fusion, consider Rx.NET or System.Threading.Channels.

## Integration with ASP.NET Core

**Akka.NET** requires explicit hosting setup:

```csharp
// Akka.NET hosting
services.AddSingleton(sp =>
{
    var config = ConfigurationFactory.ParseString("...");
    return ActorSystem.Create("MySystem", config);
});
```

**Fusion** integrates naturally with ASP.NET Core:

```csharp
// Fusion hosting
services.AddFusion()
    .AddService<IUserService, UserService>()
    .AddServer();
```

## The Key Insight

Akka.NET is an **actor toolkit** — powerful for building complex distributed systems with supervision, message routing, and stream processing. It requires learning to think in actors and messages.

Fusion is a **caching and synchronization layer** — purpose-built for applications where computed values need to stay fresh, dependencies cascade automatically, and clients see updates in real-time. It uses familiar .NET patterns.

If your problem is "I need sophisticated distributed computing with supervision trees, message routing, and backpressure-aware streams," Akka.NET provides those primitives. If your problem is "I have a web application where data should stay fresh and clients should see updates automatically," Fusion solves that with less conceptual overhead.

Choose based on your problem domain: Akka.NET for actor-model distributed systems, Fusion for reactive cached applications.
