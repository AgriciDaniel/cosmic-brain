# ActualLab.Fusion vs CQRS + Event Sourcing

CQRS (Command Query Responsibility Segregation) with Event Sourcing is an architectural pattern for building scalable systems. Fusion's CommandR implements CQRS principles while adding real-time synchronization capabilities.

## The Core Difference

**CQRS + Event Sourcing** separates reads from writes and stores state as a sequence of events. You build read models by projecting events. Real-time updates require additional infrastructure (event handlers, projections, SignalR).

**Fusion** separates reads (compute methods) from writes (commands) but uses invalidation instead of events. When commands execute, affected computed values are invalidated and observers automatically receive updates.

## Traditional CQRS + Event Sourcing

```csharp
// Command
public record CreateOrderCommand(string UserId, List<OrderItem> Items);

// Event
public record OrderCreatedEvent(Guid OrderId, string UserId, List<OrderItem> Items, DateTime Created);

// Command Handler
public class CreateOrderHandler : ICommandHandler<CreateOrderCommand>
{
    public async Task Handle(CreateOrderCommand cmd)
    {
        var evt = new OrderCreatedEvent(Guid.NewGuid(), cmd.UserId, cmd.Items, DateTime.UtcNow);
        await _eventStore.Append(evt);
        // Read model updated asynchronously by projection
    }
}

// Projection (runs asynchronously)
public class OrderProjection : IEventHandler<OrderCreatedEvent>
{
    public async Task Handle(OrderCreatedEvent evt)
    {
        await _readDb.Orders.InsertAsync(new OrderReadModel { ... });
        // How do clients know to refresh? Separate notification needed.
    }
}

// Query
public async Task<Order[]> GetUserOrders(string userId)
    => await _readDb.Orders.Where(o => o.UserId == userId).ToArrayAsync();
```

## Fusion Approach

```csharp
// Command
public record CreateOrderCommand(string UserId, List<OrderItem> Items) : ICommand<Order>;

// Command Handler with integrated invalidation
public class OrderService : IComputeService
{
    [CommandHandler]
    public async Task<Order> CreateOrder(CreateOrderCommand cmd, CancellationToken ct)
    {
        if (Invalidation.IsActive)
        {
            _ = GetUserOrders(cmd.UserId, default);
            return default!;
        }

        var order = new Order { Id = Guid.NewGuid(), UserId = cmd.UserId, Items = cmd.Items };
        await _db.Orders.AddAsync(order, ct);
        await _db.SaveChangesAsync(ct);
        return order;
    }

    [ComputeMethod]
    public virtual async Task<Order[]> GetUserOrders(string userId, CancellationToken ct)
        => await _db.Orders.Where(o => o.UserId == userId).ToArrayAsync(ct);
}

// Clients observing GetUserOrders automatically see the new order
```

## Where Each Excels

### ActualLab.Fusion is better at

- Real-time client updates without additional infrastructure
- Simpler architecture (no event store, projections, handlers)
- Immediate consistency (no projection lag)
- Automatic cache invalidation
- Lower operational complexity

### CQRS + Event Sourcing is better at

- Complete audit trail (events are immutable history)
- Temporal queries ("what was the state on date X?")
- Rebuilding read models from scratch
- Multiple independent read models from same events
- Regulatory compliance requiring full history

## Architectural Comparison

| Aspect | CQRS + Event Sourcing | Fusion |
|--------|----------------------|--------|
| State storage | Event stream | Current state in DB |
| Read model updates | Async projections | Invalidation + recompute |
| History | Complete (events) | Current only (unless you add logging) |
| Real-time | Requires SignalR/WebSockets | Built-in |
| Consistency | Eventually consistent | Immediate |
| Complexity | High (many moving parts) | Lower |

## When to Use Each

### Choose CQRS + Event Sourcing when:
- Audit trail is a legal/compliance requirement
- You need temporal queries (state at point in time)
- Multiple teams consume the same events differently
- Event replay for debugging or model rebuilding is valuable
- You're building a distributed system with eventual consistency

### Choose Fusion when:
- You want CQRS benefits without event sourcing complexity
- Real-time updates are a primary requirement
- Immediate consistency is preferred over eventual
- Simpler operational model is important
- Building a .NET application (especially Blazor)

## Fusion as "CQRS Lite"

Fusion's CommandR provides CQRS benefits without full event sourcing:

```csharp
// Commands for writes
public record UpdateUserCommand(string UserId, string Name) : ICommand<Unit>;

// Compute methods for reads (with caching)
[ComputeMethod]
public virtual async Task<User> GetUser(string userId, CancellationToken ct) { ... }

// Command handlers with invalidation
[CommandHandler]
public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
{
    // Write
    await _db.Users.UpdateAsync(cmd.UserId, cmd.Name, ct);

    // Invalidate affected reads
    if (Invalidation.IsActive)
        _ = GetUser(cmd.UserId, default);
}
```

You get:
- Read/write separation ✓
- Caching on reads ✓
- Real-time updates ✓

Without:
- Event store infrastructure
- Projection handlers
- Eventual consistency delays
- Complex debugging of projection failures

## Adding Event Sourcing to Fusion

If you need event sourcing for audit/compliance, you can add it alongside Fusion:

```csharp
[CommandHandler]
public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
{
    if (Invalidation.IsActive)
    {
        _ = GetUser(cmd.UserId, default);
        return;
    }

    // Store event for audit trail
    await _eventStore.Append(new UserUpdatedEvent(cmd.UserId, cmd.Name, DateTime.UtcNow));

    // Update current state
    await _db.Users.UpdateAsync(cmd.UserId, cmd.Name, ct);
}
```

## The Key Insight

CQRS + Event Sourcing is powerful but complex — it requires event stores, projections, and additional real-time infrastructure.

Fusion provides the CQRS pattern (separate reads and writes) with built-in real-time updates, but uses invalidation instead of events. This dramatically simplifies the architecture while still delivering reactive, cache-aware applications.

If you don't need full event sourcing (audit trails, temporal queries), Fusion gives you CQRS benefits with far less infrastructure.
