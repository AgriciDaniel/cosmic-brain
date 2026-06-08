# ActualLab.Fusion vs REST APIs

REST is the dominant architectural style for web APIs. Both Fusion and REST enable client-server communication, but they represent fundamentally different approaches to data synchronization.

## The Core Difference

**REST** is a request-response pattern. Clients explicitly fetch data when they need it. The server has no knowledge of what data clients are displaying or when they need updates.

**Fusion** is a synchronization pattern. Clients observe computed values that automatically stay current. The server tracks dependencies and notifies clients when their data changes.

## REST Approach

```csharp
// Server - standard Web API
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<User> GetUser(string id)
        => await _db.Users.FindAsync(id);

    [HttpPut("{id}")]
    public async Task UpdateUser(string id, UpdateUserRequest request)
    {
        await _db.Users.UpdateAsync(id, request);
        // How do other clients know the user changed? They don't.
    }
}

// Client - manual fetching
var user = await httpClient.GetFromJsonAsync<User>($"/api/users/{id}");

// To get updates, you must poll or use a separate real-time system
while (true)
{
    await Task.Delay(5000);
    user = await httpClient.GetFromJsonAsync<User>($"/api/users/{id}");
}
```

## Fusion Approach

```csharp
// Server - compute service
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string id, CancellationToken ct)
        => await _db.Users.FindAsync(id, ct);

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.Id, default);  // Observers automatically notified
    }
}

// Client - automatic updates
var computed = await Computed.Capture(() => userService.GetUser(id));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"User updated: {c.Value.Name}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- Automatic real-time updates without polling
- Built-in caching with dependency-based invalidation
- Single round trip with automatic batching
- Client-side persistent cache for offline resilience
- Type-safe C# interfaces with compile-time checking
- Eliminating manual refresh and synchronization logic
- Can also expose services via REST or GraphQL (mix and match)

### REST APIs are better at

- Universal compatibility (any language/platform)
- Simple, well-understood mental model
- Stateless, cacheable HTTP semantics
- Excellent tooling (Postman, Swagger, OpenAPI)
- Public APIs for external consumers

## Request Patterns Compared

| Scenario | REST | Fusion |
|----------|------|--------|
| Initial fetch | GET request | Method call (cached) |
| Data changes | No notification | Automatic invalidation |
| Polling | Client responsibility | Not needed |
| Batch requests | Multiple HTTP calls or custom endpoints | Automatic batching |
| Cache invalidation | Manual (ETags, Cache-Control) | Automatic |

## When to Use Each

### Choose REST when:
- Building a public API for external consumers
- Clients are diverse (mobile, web, third-party)
- Simplicity and universality matter most
- Real-time isn't a requirement
- Team prefers industry-standard patterns

### Choose Fusion when:
- Building a .NET application (especially Blazor)
- Real-time synchronization is needed
- You control both client and server
- Caching with automatic invalidation matters
- Reducing polling and manual refresh logic is valuable

## The Real-Time Gap

The fundamental limitation of REST is that it's **pull-only**. When data changes on the server:

**REST clients must:**
1. Poll periodically (wasteful, laggy)
2. Use a separate WebSocket/SSE connection (complexity)
3. Implement push notifications (mobile)
4. Accept stale data

**Fusion clients:**
1. Do nothing — updates arrive automatically

## Caching Comparison

**REST HTTP Caching:**
```
GET /api/users/123
Cache-Control: max-age=60

# After 60 seconds, cache is stale
# Client doesn't know if data actually changed
# Must make conditional request (If-None-Match)
```

**Fusion Caching:**
```csharp
// Client caches computed value
// When server invalidates, client is notified
// New value fetched only when actually changed
// No polling, no conditional requests
```

## Building REST + Real-Time

To add real-time to REST, you typically need:

```csharp
// REST API
[HttpPut("{id}")]
public async Task UpdateUser(string id, UpdateUserRequest request)
{
    await _db.Users.UpdateAsync(id, request);

    // Manually notify via SignalR
    await _hubContext.Clients.Group($"user-{id}")
        .SendAsync("UserUpdated", id);
}

// Client must subscribe
connection.On<string>("UserUpdated", async (id) => {
    // Manually refetch
    var user = await httpClient.GetFromJsonAsync<User>($"/api/users/{id}");
    UpdateUI(user);
});
```

With Fusion, this is automatic:

```csharp
// Server
[CommandHandler]
public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
{
    await _db.Users.UpdateAsync(cmd.Id, cmd.Data, ct);
    if (Invalidation.IsActive)
        _ = GetUser(cmd.Id, default);  // That's it
}

// Client - already subscribed via computed.Changes()
```

## Migration Path

If you have a REST API and want Fusion's benefits:

1. **Keep REST** for external/public consumers
2. **Add Fusion** for internal .NET clients
3. Fusion services can wrap your existing data access layer
4. Gradual migration: start with high-value real-time features

```csharp
// Fusion service wrapping existing repository
public class UserService : IComputeService
{
    private readonly IUserRepository _repo; // Your existing data access

    [ComputeMethod]
    public virtual async Task<User> GetUser(string id, CancellationToken ct)
        => await _repo.GetByIdAsync(id, ct);
}
```

## The Key Insight

REST is excellent for **stateless, universal APIs** where clients explicitly request data when they need it.

Fusion is excellent for **stateful, synchronized applications** where clients should always see the current server state without manual polling.

The question isn't which is "better" — it's what problem you're solving. If you need real-time synchronization in a .NET application, Fusion provides that without the complexity of layering real-time infrastructure on top of REST.
