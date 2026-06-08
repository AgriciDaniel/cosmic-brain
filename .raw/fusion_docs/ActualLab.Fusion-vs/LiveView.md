# ActualLab.Fusion vs LiveView / Phoenix

Phoenix LiveView is Elixir's framework for building real-time web applications with server-rendered HTML. Both LiveView and Fusion enable real-time UIs without writing JavaScript, but with different architectures.

## The Core Difference

**LiveView** renders HTML on the server and pushes DOM diffs to the client over WebSocket. State lives on the server; the client is a thin shell that applies patches. It's server-rendered real-time UI.

**Fusion** synchronizes data to smart clients that render locally. State is cached on both server and client; clients receive data updates and render independently. It's data synchronization with client-side rendering.

## LiveView Approach (Elixir)

```elixir
# Server renders HTML, pushes diffs to client
defmodule MyAppWeb.CounterLive do
  use MyAppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("increment", _, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + 1)}
  end

  def render(assigns) do
    ~H"""
    <div>
      <p>Count: <%= @count %></p>
      <button phx-click="increment">+1</button>
    </div>
    """
  end
end
```

## Fusion Approach (Blazor)

```csharp
// Server computes data
public class CounterService : IComputeService
{
    [ComputeMethod]
    public virtual Task<int> GetCount(CancellationToken ct)
        => Task.FromResult(_count);

    [CommandHandler]
    public Task Increment(IncrementCommand cmd, CancellationToken ct)
    {
        _count++;
        if (Invalidation.IsActive)
            _ = GetCount(default);
        return Task.CompletedTask;
    }
}

// Client renders locally with synced data
@inherits ComputedStateComponent<int>

<div>
    <p>Count: @State.Value</p>
    <button @onclick="() => Commander.Run(new IncrementCommand())">+1</button>
</div>

@code {
    protected override Task<int> ComputeState(CancellationToken ct)
        => CounterService.GetCount(ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Rich client-side interactivity (full Blazor)
- Offline-capable applications (cached data)
- Selective data synchronization (not whole pages)
- .NET ecosystem and tooling
- Complex client-side logic

### LiveView is better at

- Zero JavaScript for interactive UIs
- Server-authoritative rendering (SEO-friendly)
- Elixir/Phoenix ecosystem
- Lightweight clients (just applies DOM patches)
- Existing Elixir teams and infrastructure

## Architecture Comparison

| Aspect | LiveView | Fusion + Blazor |
|--------|----------|-----------------|
| Rendering | Server-side HTML | Client-side (Blazor) |
| State location | Server only | Server + client cache |
| Network payload | DOM diffs | Data updates |
| Client complexity | Minimal (JS shell) | Full Blazor runtime |
| Offline support | Limited | Client cache |
| SEO | Server-rendered | Requires prerendering |

## When to Use Each

### Choose LiveView when:
- You're in the Elixir/Phoenix ecosystem
- Server-rendered HTML is preferred
- Clients should be as thin as possible
- You want minimal JavaScript
- Real-time forms and CRUD interfaces

### Choose Fusion when:
- You're in the .NET ecosystem
- Rich client-side interactivity is needed
- Offline or partial connectivity matters
- Complex client-side logic (charts, editors)
- Data synchronization across multiple views

## The Rendering Model

**LiveView: Server renders, client patches**
```
Server                          Client
┌─────────────┐                ┌─────────────┐
│ LiveView    │  HTML diff     │ Thin JS     │
│ Process     │───────────────▶│ (patches)   │
│ (renders)   │                │             │
└─────────────┘                └─────────────┘
State + Rendering on server    Just applies patches
```

**Fusion: Server computes, client renders**
```
Server                          Client
┌─────────────┐                ┌─────────────┐
│ Compute     │  Data updates  │ Blazor      │
│ Service     │───────────────▶│ (renders)   │
│ (data)      │                │             │
└─────────────┘                └─────────────┘
Data + caching on server       Full rendering on client
```

## Real-Time Patterns

**LiveView** — everything is handled through the LiveView process:

```elixir
def handle_info({:order_created, order}, socket) do
  {:noreply, update(socket, :orders, fn orders -> [order | orders] end)}
end
```

**Fusion** — computed values automatically propagate:

```csharp
[ComputeMethod]
public virtual async Task<Order[]> GetOrders(CancellationToken ct)
    => await _db.Orders.ToArrayAsync(ct);

// Any component observing GetOrders updates automatically
```

## Scalability Considerations

**LiveView**: Each user has a server process holding their state. Memory scales with connected users × state size.

**Fusion**: Computed values are shared across users. Multiple users observing the same data share the cached result. Memory scales with unique computations.

## Language/Ecosystem

This comparison often comes down to ecosystem choice:

- **LiveView**: Elixir, functional programming, OTP, Phoenix
- **Fusion**: C#, .NET, Blazor, familiar to enterprise .NET developers

Both are excellent frameworks in their respective ecosystems.

## The Key Insight

LiveView and Fusion represent two philosophies for real-time web apps:

**LiveView**: "The server renders everything; send minimal patches to a thin client."

**Fusion**: "The server computes data; sync it to a smart client that renders locally."

LiveView minimizes client complexity at the cost of server resources per connection. Fusion maximizes client capability while efficiently sharing server-side computations.

If you're in the Elixir world and want minimal client-side code, LiveView is fantastic. If you're in the .NET world and want rich Blazor clients with real-time data, Fusion delivers that experience.
