# ActualLab.Fusion vs Fluxor / Blazor-State

Fluxor and Blazor-State are Redux-inspired state management libraries for Blazor. Both Fusion and these libraries help manage application state, but with fundamentally different approaches.

## The Core Difference

**Fluxor/Blazor-State** implement the Flux/Redux pattern: actions trigger reducers that produce new state. State is local to the client. Server communication requires separate "effects" that fetch data and dispatch actions — you build this plumbing yourself.

**Fusion** provides transparent client-server state synchronization. State originates from compute methods and automatically propagates to clients. Shared C# interfaces serve as the API contract — no separate API layer, no manual fetching, no actions/reducers boilerplate.

## Fluxor Approach

```csharp
// State
public record CounterState(int Count);

// Actions
public record IncrementAction(int Amount);

// Reducer
public static class CounterReducer
{
    [ReducerMethod]
    public static CounterState Reduce(CounterState state, IncrementAction action)
        => state with { Count = state.Count + action.Amount };
}

// Effect (for server calls) - YOU build this plumbing
public class CounterEffects
{
    [EffectMethod]
    public async Task Handle(IncrementAction action, IDispatcher dispatcher)
    {
        await _api.IncrementAsync(action.Amount);
        // Manually dispatch success/failure actions
    }
}

// Component
@inherits FluxorComponent
@inject IState<CounterState> State

<p>Count: @State.Value.Count</p>
<button @onclick="() => Dispatcher.Dispatch(new IncrementAction(1))">+1</button>
```

## Fusion Approach

```csharp
// Shared interface - works on both client and server
public interface ICounterService : IComputeService
{
    [ComputeMethod]
    Task<int> GetCount(CancellationToken ct);

    [CommandHandler]
    Task Increment(IncrementCommand cmd, CancellationToken ct);
}

// Server implementation
public class CounterService : ICounterService
{
    [ComputeMethod]
    public virtual async Task<int> GetCount(CancellationToken ct)
        => await _db.Counters.SumAsync(c => c.Value, ct);

    [CommandHandler]
    public async Task Increment(IncrementCommand cmd, CancellationToken ct)
    {
        await _db.ExecuteAsync(...);
        if (Invalidation.IsActive)
            _ = GetCount(default);
    }
}

// Component - state automatically synced from server
@inherits ComputedStateComponent<int>
@code {
    protected override Task<int> ComputeState(CancellationToken ct)
        => CounterService.GetCount(ct);
}

<p>Count: @State.Value</p>
<button @onclick="() => Commander.Run(new IncrementCommand(1))">+1</button>
```

## Where Each Excels

### ActualLab.Fusion is better at

- **Automatic state propagation** — no effects, no API calls, no action dispatching
- **Shared interfaces** between client and server (like Protobuf, but just C#)
- Eliminating actions/reducers/effects boilerplate
- Real-time updates across all clients automatically
- Built-in caching with dependency-based invalidation
- Works as client-only state management too (compute methods work locally)

### Fluxor / Blazor-State are better at

- Familiar Redux pattern for teams with React/Redux experience
- Time-travel debugging and state inspection with DevTools
- Predictable, explicit state changes via actions
- Purely local state that never touches a server
- Working with any backend technology (REST, GraphQL, etc.)

## State Flow Comparison

| Aspect | Fluxor/Blazor-State | Fusion |
|--------|---------------------|--------|
| State origin | Client-side | Server or client |
| Server sync | Manual (effects + API) | Automatic |
| Update trigger | Dispatch action | Invalidation |
| Multi-client sync | Not built-in | Automatic |
| Boilerplate | Actions, reducers, effects | Interfaces only |
| API layer | You build it | Shared interfaces |

## When to Use Each

### Choose Fluxor/Blazor-State when:
- You want Redux-style predictable state management
- Time-travel debugging is important
- The team knows Redux patterns well
- You already have a REST/GraphQL API to consume
- State is purely local and never synced

### Choose Fusion when:
- You want automatic client-server synchronization
- Multiple users should see the same data in real-time
- Reducing boilerplate matters (no actions/reducers/effects)
- You prefer shared C# interfaces over building API layers
- You need both client-only and server-synced state

## The Plumbing Problem

With Fluxor, you must build the connection between client state and server:

```csharp
// 1. Define action
public record LoadUserAction(string UserId);

// 2. Define effect to call server
[EffectMethod]
public async Task Handle(LoadUserAction action, IDispatcher dispatcher)
{
    var user = await _httpClient.GetFromJsonAsync<User>($"/api/users/{action.UserId}");
    dispatcher.Dispatch(new UserLoadedAction(user));
}

// 3. Define success action
public record UserLoadedAction(User User);

// 4. Define reducer
[ReducerMethod]
public static UserState Reduce(UserState state, UserLoadedAction action)
    => state with { User = action.User };
```

With Fusion, the interface IS the API:

```csharp
// Interface shared between client and server
public interface IUserService : IComputeService
{
    [ComputeMethod]
    Task<User> GetUser(string userId, CancellationToken ct);
}

// That's it. Client calls GetUser, gets cached data, receives updates automatically.
```

## Combining Both

You can use Fluxor for purely local UI state while using Fusion for server-synchronized data:

```csharp
// Local UI state with Fluxor
public record UIState(bool IsModalOpen);

// Server data with Fusion
@inherits ComputedStateComponent<UserProfile>
@inject IState<UIState> UIState

@if (UIState.Value.IsModalOpen)
{
    <Modal>
        <UserProfileEditor Profile="@State.Value" />
    </Modal>
}
```

## The Key Insight

Fluxor/Blazor-State are excellent for **predictable client-side state** with Redux patterns.

Fusion excels at **eliminating the API layer entirely** — shared C# interfaces mean the same code defines both the client's view of the API and the server's implementation. State automatically propagates from server to clients without actions, reducers, effects, or manual API calls.

If your Blazor app is mostly about displaying and editing server data, Fusion removes the need for Redux-style patterns — the server state *is* your client state, automatically kept in sync.
