# ActualLab.Fusion vs Message Brokers

Message brokers (RabbitMQ, Kafka, Azure Service Bus, etc.) enable asynchronous communication between services. Both Fusion and message brokers deal with distributing information, but at different levels.

## The Core Difference

**Message Brokers** are infrastructure for asynchronous, decoupled communication between services. You publish messages; subscribers process them independently. They're about service-to-service communication.

**Fusion** is about client-server synchronization. Clients observe computed values that automatically stay current. It's about keeping UIs in sync with server state.

## Message Broker Approach

```csharp
// Publisher (Order Service)
public async Task CreateOrder(Order order)
{
    await _db.Orders.AddAsync(order);
    await _messageBus.Publish(new OrderCreatedEvent(order.Id, order.UserId));
}

// Subscriber (Notification Service)
public class OrderCreatedHandler : IMessageHandler<OrderCreatedEvent>
{
    public async Task Handle(OrderCreatedEvent evt)
    {
        await _notificationService.SendEmail(evt.UserId, "Order created!");
    }
}

// Another Subscriber (Analytics Service)
public class OrderAnalyticsHandler : IMessageHandler<OrderCreatedEvent>
{
    public async Task Handle(OrderCreatedEvent evt)
    {
        await _analytics.TrackOrderCreated(evt.OrderId);
    }
}
```

## Fusion Approach

```csharp
// Service with automatic client notifications
public class OrderService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<Order[]> GetUserOrders(string userId, CancellationToken ct)
        => await _db.Orders.Where(o => o.UserId == userId).ToArrayAsync(ct);

    [CommandHandler]
    public async Task<Order> CreateOrder(CreateOrderCommand cmd, CancellationToken ct)
    {
        if (Invalidation.IsActive)
        {
            _ = GetUserOrders(cmd.UserId, default);  // UI clients automatically notified
            return default!;
        }
        var order = new Order { ... };
        await _db.Orders.AddAsync(order, ct);
        return order;
    }
}

// Blazor client — automatically sees new orders
@inherits ComputedStateComponent<Order[]>
```

## Where Each Excels

### ActualLab.Fusion is better at

- Real-time client-server synchronization
- Keeping UIs automatically updated
- Caching with dependency-based invalidation
- Reducing polling and manual refresh logic
- Single-codebase applications (not microservices)

### Message Brokers are better at

- Decoupled service-to-service communication
- Reliable delivery with persistence and retries
- Scaling consumers independently
- Event-driven architectures across microservices
- Processing events asynchronously (background jobs)

## Scope Comparison

| Aspect | Message Brokers | Fusion |
|--------|-----------------|--------|
| Primary use | Service-to-service | Client-server |
| Communication | Async, fire-and-forget | Request-response + push |
| Consumers | Backend services | UI clients |
| Delivery | At-least-once, durable | Real-time, ephemeral |
| Caching | Not applicable | Built-in |
| Scaling | Horizontal (partitions) | Vertical + Operations Framework |

## When to Use Each

### Choose Message Brokers when:
- Building microservices that communicate asynchronously
- Decoupling services for independent deployment
- Reliable message delivery is required (retries, dead-letter)
- Processing events in background workers
- Event-driven architecture across team boundaries

### Choose Fusion when:
- Building a client-facing application with real-time UI
- Keeping browser/mobile clients synchronized with server
- Single backend serving a reactive frontend
- Caching and automatic invalidation are priorities
- Reducing complexity of real-time infrastructure

## Using Both Together

Message brokers and Fusion serve different purposes and work well together:

```csharp
// Fusion service for client-facing real-time
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

        var order = new Order { ... };
        await _db.Orders.AddAsync(order, ct);

        // Publish to message broker for other services
        await _messageBus.Publish(new OrderCreatedEvent(order.Id));

        return order;
    }
}

// Other microservices subscribe via message broker
// UI clients subscribe via Fusion
```

## The Right Tool for the Job

```
┌──────────────────────────────────────────────────────────────┐
│                        Your Application                       │
├─────────────────────────┬────────────────────────────────────┤
│   Client-Server Sync    │    Service-to-Service Async        │
│        (Fusion)         │      (Message Broker)              │
│                         │                                    │
│  ┌─────────┐            │            ┌─────────────┐         │
│  │ Blazor  │◀──realtime─┤            │ Notification│         │
│  │ Client  │            │    ┌──────▶│  Service    │         │
│  └─────────┘            │    │       └─────────────┘         │
│        │                │    │                               │
│        ▼                │    │       ┌─────────────┐         │
│  ┌─────────┐            │  message   │  Analytics  │         │
│  │ Fusion  │────────────┼───broker──▶│  Service    │         │
│  │ Server  │            │    │       └─────────────┘         │
│  └─────────┘            │    │                               │
│                         │    │       ┌─────────────┐         │
│                         │    └──────▶│  Inventory  │         │
│                         │            │  Service    │         │
│                         │            └─────────────┘         │
└─────────────────────────┴────────────────────────────────────┘
```

## The Key Insight

Message brokers solve **backend-to-backend asynchronous communication** — decoupling services, reliable delivery, event-driven processing.

Fusion solves **frontend-to-backend synchronization** — keeping clients automatically updated, caching, real-time UIs.

They're different tools for different problems. Use message brokers when you need services to communicate asynchronously with guaranteed delivery. Use Fusion when you need clients to see fresh data automatically. Many applications benefit from both.
