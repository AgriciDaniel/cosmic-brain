# ActualLab.Fusion vs SignalR

SignalR is Microsoft's library for adding real-time web functionality to applications. Both Fusion and SignalR enable real-time updates, but they solve the problem at fundamentally different levels.

## The Core Difference

**SignalR** is a transport layer — it gives you the pipes to send messages between server and clients. You decide what to send, when to send it, and how clients should handle it.

**Fusion** is a caching and synchronization layer — it automatically tracks what data each client is using and sends updates when that data changes. You write normal methods; Fusion handles the real-time part.

## SignalR Approach

```csharp
// Hub
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        // You manually broadcast to clients
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}

// Client
connection.On<string, string>("ReceiveMessage", (user, message) => {
    // You manually handle the message
    messages.Add(new Message(user, message));
    StateHasChanged();
});
```

## Fusion Approach

```csharp
// Service
public class ChatService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<Message[]> GetMessages(string room, CancellationToken ct)
    {
        return await db.Messages.Where(m => m.Room == room).ToArrayAsync(ct);
    }
}

// Component - automatically updates when data changes
@inherits ComputedStateComponent<Message[]>
@code {
    protected override Task<Message[]> ComputeState(CancellationToken ct)
        => ChatService.GetMessages(Room, ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic real-time updates without manual wiring
- Built-in caching with intelligent invalidation
- Guaranteed consistency across all clients
- Automatic reconnection with state recovery (no manual resync)
- Request batching (multiple calls coalesced into fewer frames)
- Eliminating subscription management boilerplate

### SignalR is better at

- Fine-grained control over exactly what gets sent and when
- Simple broadcast scenarios (chat rooms, notifications)
- Working with any client technology (JavaScript, mobile)
- Quick integration into existing applications
- Simple pub/sub mental model

## When to Use Each

### Choose SignalR when:
- You need simple broadcast/pub-sub (chat, notifications)
- Clients are not .NET (JavaScript, mobile apps without .NET)
- You want explicit control over every message
- You're adding real-time to an existing app incrementally

### Choose Fusion when:
- You want real-time data synchronization without manual wiring
- Your UI shows computed/derived data that should stay fresh
- You're building a Blazor application
- You want automatic caching with cache invalidation
- Consistency across clients is critical

### Use Both Together

Fusion uses its own RPC layer (ActualLab.Rpc), but you can use SignalR alongside Fusion for specific scenarios:

- **Fusion** for data synchronization (user profiles, lists, aggregates)
- **SignalR** for ephemeral events (typing indicators, cursor positions)

## Performance

ActualLab.Rpc (Fusion's RPC layer) outperforms SignalR in benchmarks:

| Benchmark | ActualLab.Rpc | SignalR | Speedup |
|-----------|---------------|---------|---------|
| RPC calls (GetUser) | 9.03M calls/s | 4.43M calls/s | ~2.0x |
| RPC calls (SayHello) | 6.16M calls/s | 2.24M calls/s | ~2.7x |
| Streaming (1-byte items) | 96.96M items/s | 18.30M items/s | ~5.3x |
| Streaming (100-byte items) | 43.01M items/s | 14.25M items/s | ~3.0x |
| Streaming (10KB items) | 820.08K items/s | 414.72K items/s | ~2.0x |

See [Performance Benchmarks](/Performance) for full details and test environment.

## Migration Path

If you're using SignalR today and want Fusion's benefits:

1. Keep SignalR for truly ephemeral events
2. Move data-fetching to Fusion compute services
3. Replace manual `SendAsync` calls with compute method invalidation
4. UI components automatically update without explicit handlers

The result: less code, automatic consistency, and real-time updates that "just work."
