# ActualLab.Fusion vs React + TanStack Query

TanStack Query (formerly React Query) is a powerful data-fetching library for React. Both TanStack Query and Fusion solve data fetching and caching, but in different ecosystems with different approaches.

## The Core Difference

**TanStack Query** is a client-side library for React that manages server state: fetching, caching, synchronizing, and updating. It doesn't know when server data changes — you configure refetch intervals or manually invalidate.

**Fusion** is a full-stack framework where the server pushes invalidations to clients. Clients don't poll or guess when to refetch — they're notified when data actually changes.

## TanStack Query Approach

```tsx
// Client-side fetching and caching
function UserProfile({ userId }: { userId: string }) {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
        staleTime: 5 * 60 * 1000,  // Consider fresh for 5 minutes
        refetchInterval: 30000,     // Poll every 30 seconds
    });

    if (isLoading) return <Spinner />;
    return <div>{user.name}</div>;
}

// Mutations with manual invalidation
const mutation = useMutation({
    mutationFn: (data) => fetch('/api/users', { method: 'PUT', body: data }),
    onSuccess: () => {
        // You must know what to invalidate
        queryClient.invalidateQueries({ queryKey: ['user'] });
    }
});
```

## Fusion Approach

```csharp
// Server — defines what's cacheable and when it changes
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.UserId, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.UserId, default);  // Server pushes invalidation
    }
}

// Client (Blazor) — automatically updated when server invalidates
@inherits ComputedStateComponent<User>
@code {
    [Parameter] public string UserId { get; set; }
    protected override Task<User> ComputeState(CancellationToken ct)
        => UserService.GetUser(UserId, ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- Server-authoritative invalidation (no polling)
- Dependency tracking between queries
- No manual cache key management
- Guaranteed freshness (server decides when data is stale)
- Client-side persistent cache for offline support
- .NET full-stack applications (Blazor)

### TanStack Query is better at

- React ecosystem (huge community, great DevTools)
- Works with any REST/GraphQL backend
- Optimistic updates with rollback
- Infinite scroll and pagination patterns
- Teams already using React

## Caching Model Comparison

| Aspect | TanStack Query | Fusion |
|--------|----------------|--------|
| Cache location | Client-side | Server + client |
| Invalidation trigger | Time-based or manual | Server push |
| Dependency tracking | Manual (queryKey arrays) | Automatic |
| Stale detection | Configured intervals | Server knows |
| Background refetch | Polling | On invalidation |
| Optimistic updates | Built-in | Via UIActionTracker |

## When to Use Each

### Choose TanStack Query when:
- Building a React application
- Backend is REST/GraphQL without Fusion
- You need fine-grained control over fetch timing
- Optimistic UI patterns are important
- Team is experienced with React ecosystem

### Choose Fusion when:
- Building a .NET application (Blazor)
- You control both client and server
- Server-authoritative cache invalidation is preferred
- Dependencies between data are complex
- No-polling real-time updates matter

## The Polling Problem

**TanStack Query** must guess when data might have changed:

```tsx
// Poll every 30 seconds — might be stale, might be unnecessary
useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchInterval: 30000
});

// Or refetch on window focus — but data might have changed while away
useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchOnWindowFocus: true
});
```

**Fusion** knows when data changed:

```csharp
// Server invalidates when data actually changes
[CommandHandler]
public async Task CreateOrder(CreateOrderCommand cmd, CancellationToken ct)
{
    await _db.Orders.AddAsync(cmd.Order, ct);
    if (Invalidation.IsActive)
        _ = GetOrders(default);  // Clients notified immediately
}

// Client receives update — no polling, no guessing
```

## Dependency Tracking

**TanStack Query** — you manually manage query key dependencies:

```tsx
// You must remember to invalidate all related queries
onSuccess: () => {
    queryClient.invalidateQueries(['user', userId]);
    queryClient.invalidateQueries(['userOrders', userId]);
    queryClient.invalidateQueries(['userStats', userId]);
    queryClient.invalidateQueries(['dashboard']);  // Does this depend on user? You must know.
}
```

**Fusion** — dependencies are automatic:

```csharp
[ComputeMethod]
public virtual async Task<Dashboard> GetDashboard(string userId, CancellationToken ct)
{
    var user = await GetUser(userId, ct);           // Dependency tracked
    var orders = await GetUserOrders(userId, ct);   // Dependency tracked
    return new Dashboard(user, orders);
}

// Invalidating GetUser automatically invalidates GetDashboard
```

## Migration Consideration

If you're a React shop considering .NET, TanStack Query is excellent for client-side state management with any backend.

If you're a .NET shop building full-stack applications, Fusion provides a more integrated solution where the server controls cache validity.

## The Key Insight

TanStack Query is a **client-side caching layer** — sophisticated, powerful, but fundamentally the client must decide when to refetch.

Fusion is a **server-client synchronization framework** — the server knows when data changes and tells clients, eliminating guesswork.

Both solve data fetching and caching. The difference is who decides when cached data is stale: with TanStack Query, you configure heuristics (stale time, refetch intervals). With Fusion, the server knows and notifies clients.
