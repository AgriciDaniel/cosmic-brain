# ActualLab.Fusion vs Server-Sent Events (SSE)

Server-Sent Events provide a simple way for servers to push updates to browsers. Both SSE and Fusion enable real-time updates, but at very different abstraction levels.

## The Core Difference

**SSE** is a one-way communication channel from server to client over HTTP. You manually send events; clients receive them via `EventSource`.

**Fusion** provides bidirectional synchronization with caching. Updates flow automatically when data changes, and clients can also call server methods.

## SSE Approach

```csharp
// Server
app.MapGet("/events", async (HttpContext ctx) => {
    ctx.Response.ContentType = "text/event-stream";

    while (!ctx.RequestAborted.IsCancellationRequested)
    {
        var data = await GetLatestData();
        await ctx.Response.WriteAsync($"data: {JsonSerializer.Serialize(data)}\n\n");
        await ctx.Response.Body.FlushAsync();
        await Task.Delay(1000);
    }
});

// Client (JavaScript)
const events = new EventSource('/events');
events.onmessage = (e) => {
    const data = JSON.parse(e.data);
    updateUI(data);
};
```

## Fusion Approach

```csharp
// Server
public class DataService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<MyData> GetData(CancellationToken ct)
        => await _repository.GetLatestData(ct);
}

// Client (Blazor) - bidirectional, with caching
@inherits ComputedStateComponent<MyData>
@code {
    protected override Task<MyData> ComputeState(CancellationToken ct)
        => DataService.GetData(ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Bidirectional communication (clients call server too)
- Automatic caching with dependency-based invalidation
- State preserved and restored on reconnection
- Efficient binary serialization with batching
- Data-rich applications where caching reduces bandwidth

### Server-Sent Events are better at

- Native browser support without any libraries
- Simple server-to-client push (logs, notifications)
- Working through restrictive proxies and firewalls
- Easy debugging with curl or browser dev tools
- Minimal implementation for basic push scenarios

## Feature Comparison

| Feature | SSE | Fusion |
|---------|-----|--------|
| Direction | Server → Client | Bidirectional |
| Protocol | HTTP/1.1 (long-lived) | WebSocket |
| Caching | None | Automatic |
| Reconnection | Auto-reconnect, no state | Auto-reconnect with state |
| Browser support | Native | Requires JS interop or Blazor |
| Binary data | No (text only) | Yes |
| Multiple streams | Multiple connections | Single connection, multiplexed |

## When to Use Each

### Choose SSE when:
- Simple server-to-client push (notifications, logs)
- Need native browser support without JavaScript libraries
- Updates are independent (no caching needed)
- Working with non-.NET clients

### Choose Fusion when:
- Building .NET applications
- Data has relationships and dependencies
- Caching and cache invalidation matter
- Clients need to call server methods too
- State should survive reconnection

## Common SSE Patterns vs Fusion

### Live Feed

**SSE:**
```csharp
// Manually push every update
await response.WriteAsync($"data: {newItem}\n\n");
```

**Fusion:**
```csharp
// Invalidation triggers automatic update
[CommandHandler]
public async Task AddItem(AddItemCommand cmd, CancellationToken ct)
{
    await _db.Items.AddAsync(cmd.Item, ct);
    if (Invalidation.IsActive)
        _ = GetItems(ct); // Observers automatically notified
}
```

### Notifications

SSE is often sufficient for simple notifications. But if your notifications reference data that clients cache (e.g., "User X commented on Post Y"), Fusion ensures clients have consistent views of that data too.

## Migration Path

If you're using SSE and want Fusion's benefits:

1. Keep SSE for truly simple, unrelated events
2. Move data-dependent features to Fusion compute services
3. Clients get automatic caching and consistency
