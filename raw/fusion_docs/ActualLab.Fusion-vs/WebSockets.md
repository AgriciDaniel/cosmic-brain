# ActualLab.Fusion vs WebSockets

WebSockets provide raw bidirectional communication between client and server. Fusion uses WebSockets under the hood but adds a complete caching and synchronization layer on top.

## The Core Difference

**WebSockets** give you a persistent connection and let you send bytes back and forth. Everything else — message framing, serialization, routing, state management — is your responsibility.

**Fusion** handles all of that automatically. You write compute methods that return data; Fusion ensures every client sees the current value and gets notified when it changes.

## Raw WebSocket Approach

```csharp
// Server
app.UseWebSockets();
app.Use(async (context, next) => {
    if (context.WebSockets.IsWebSocketRequest) {
        var ws = await context.WebSockets.AcceptWebSocketAsync();
        // You implement: message parsing, routing, state tracking, error handling
        await HandleConnection(ws);
    }
});

// Client
var ws = new ClientWebSocket();
await ws.ConnectAsync(uri, ct);
// You implement: reconnection, message parsing, state synchronization
```

## Fusion Approach

```csharp
// Server - just a compute service
public class StockService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<decimal> GetPrice(string symbol, CancellationToken ct)
        => await _priceProvider.GetPrice(symbol, ct);
}

// Client - automatic real-time updates
var computed = await Computed.Capture(() => stockService.GetPrice("AAPL"));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"New price: {c.Value}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- Caching, synchronization, and real-time out of the box
- Automatic reconnection with state recovery
- Dependency tracking that prevents stale data
- Type-safe RPC with automatic batching
- Production-ready real-time features ([Voxt](https://voxt.ai))

### Raw WebSockets are better at

- Maximum control and flexibility over the protocol
- Minimal overhead for custom binary protocols
- Working with any language or platform
- Building infrastructure (proxies, gateways)
- Scenarios requiring no framework dependencies

## What Fusion Adds on Top of WebSockets

| Feature | Raw WebSockets | Fusion |
|---------|----------------|--------|
| Connection management | Manual | Automatic |
| Reconnection | Manual | Automatic with state recovery |
| Message serialization | Manual | Built-in (MemoryPack, MessagePack) |
| Request batching | Manual | Automatic |
| Caching | None | Intelligent cache with invalidation |
| Type safety | None | Full compile-time checking |
| Error handling | Manual | Built-in retry and recovery |

## When to Use Each

### Choose Raw WebSockets when:
- You need a custom binary protocol
- Interoperability with non-.NET systems is critical
- You're building infrastructure (proxies, gateways)
- Minimal dependencies are required

### Choose Fusion when:
- You want real-time data synchronization
- Building a .NET application (especially Blazor)
- You need caching with automatic invalidation
- Developer productivity matters more than protocol control

## The Hidden Complexity of WebSockets

Building production-ready WebSocket infrastructure requires solving:

1. **Reconnection** — What happens when the connection drops?
2. **State synchronization** — How do you catch up after reconnect?
3. **Message ordering** — How do you handle out-of-order messages?
4. **Backpressure** — What if the client can't keep up?
5. **Authentication** — How do you handle token refresh?
6. **Load balancing** — How do you route to the right server?

Fusion solves all of these. You focus on your business logic.

## Performance

Fusion's WebSocket layer (ActualLab.Rpc) is highly optimized:

- **Batching**: Multiple calls in the same frame are batched automatically
- **Binary serialization**: MemoryPack for minimal overhead
- **Connection pooling**: Efficient resource usage
- **Compression**: Optional message compression

For most applications, Fusion's overhead is negligible compared to the development time saved.
