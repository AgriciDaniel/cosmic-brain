# States: Tracking Computed Values Over Time

This document covers `StateFactory`, `IState<T>`, `MutableState<T>`, and `ComputedState<T>` — the types that help you track and react to changes in computed values.

## Overview

While `Computed<T>` instances are immutable snapshots of a computation result, **states** track the *latest* version of a computed value and provide:

- Automatic tracking of the most recent `Computed<T>`
- Events for invalidation, updating, and updated
- Access to both current and last non-error values
- For `ComputedState<T>`: an auto-update loop with configurable delays

## StateFactory

`StateFactory` is the factory for creating states. You can obtain it in several ways:

### From IServiceProvider (Recommended)

```csharp
// Extension method (preferred)
var stateFactory = services.StateFactory();

// Or explicitly
var stateFactory = services.GetRequiredService<StateFactory>();
```

### StateFactory.Default

For tests or simple scenarios without DI, use `StateFactory.Default`:

```csharp
var stateFactory = StateFactory.Default;
var state = stateFactory.NewMutable(42);
```

`StateFactory.Default` lazily creates a minimal `IServiceProvider` with Fusion services. You can also assign your own:

```csharp
StateFactory.Default = myServiceProvider.StateFactory();
```

### Scoped vs Non-Scoped

`StateFactory` has an `IsScoped` property indicating whether it was resolved from a scoped service provider. This is mainly relevant in Blazor scenarios where scoped services are per-circuit.

The registration uses `AddScopedOrSingleton`, which registers a `StateFactory` that resolves as singleton at the root scope and as scoped within a scope (via `AddScopedOrSingleton`):

```csharp
services.AddScopedOrSingleton((c, isScoped) => new StateFactory(c, isScoped));
```

How it works:
- A singleton wrapper captures the root `IServiceProvider`
- A scoped wrapper captures each scope's `IServiceProvider`
- The transient factory compares the resolving `IServiceProvider` with the singleton's one
- If they match, you get the singleton instance (`IsScoped = false`)
- If they differ, you're in a scope, so you get the scoped instance (`IsScoped = true`)

## IState&lt;T&gt; Interface

All states implement `IState<T>`, which provides:

```csharp
public interface IState<T> : IState, IResult<T>
{
    Computed<T> Computed { get; }        // Current computed value
    T Value { get; }                      // Shortcut for Computed.Value
    T LastNonErrorValue { get; }          // Last successful value (useful during errors)

    // Events
    event Action<State, StateEventKind>? Invalidated;
    event Action<State, StateEventKind>? Updating;
    event Action<State, StateEventKind>? Updated;
}
```

### Snapshot Property

The `Snapshot` property returns an immutable `StateSnapshot<T>` for consistent reads:

```csharp
var snapshot = state.Snapshot;
// snapshot.Computed, snapshot.LastNonErrorComputed, snapshot.IsInitial
// are all consistent with each other
```

## MutableState&lt;T&gt;

A mutable value wrapped in a `Computed<T>` envelope. Think of it as a reactive variable.

### Creating MutableState

```csharp
var stateFactory = services.StateFactory();

// Simple creation with initial value
var counter = stateFactory.NewMutable(0);
var name = stateFactory.NewMutable("Alice");

// With options
var state = stateFactory.NewMutable(new MutableState<int>.Options {
    InitialValue = 42,
    Category = "MyCounter",  // For logging/debugging
    EventConfigurator = s => {
        s.Updated += (state, _) => Console.WriteLine($"Updated: {state.Value}");
    },
});
```

### Using MutableState

```csharp
// Read
int value = counter.Value;

// Write (triggers invalidation + immediate recomputation)
counter.Value = 10;

// Or use Set methods
counter.Set(20);
counter.Set(result => result.Value + 1);  // Atomic update

// Set an error
counter.SetError(new InvalidOperationException("Something went wrong"));

// Access last valid value even during error state
int lastGood = counter.LastNonErrorValue;
```

### Using in Compute Methods

MutableState can be a dependency in compute methods:

```csharp
public class GreetingService : IComputeService
{
    private readonly MutableState<string> _name;

    public GreetingService(StateFactory stateFactory)
    {
        _name = stateFactory.NewMutable("World");
    }

    [ComputeMethod]
    public virtual async Task<string> GetGreeting()
    {
        // Use() registers the state as a dependency
        var name = await _name.Use();
        return $"Hello, {name}!";
    }

    public void SetName(string name) => _name.Value = name;
}
```

### MutableState Options

```csharp
public record Options : StateOptions<T>
{
    // Inherited from StateOptions<T>:
    public T InitialValue { get; init; }
    public Result<T> InitialOutput { get; init; }  // For initial error state
    public ComputedOptions ComputedOptions { get; init; }
    public Action<State>? EventConfigurator { get; init; }
    public string? Category { get; init; }
}
```

Note: `MutableState` uses `ComputedOptions.MutableStateDefault` by default, which has `TransientErrorInvalidationDelay = TimeSpan.MaxValue` (errors don't auto-clear).

## ComputedState&lt;T&gt;

A state that automatically recomputes when invalidated, with configurable update delays.

### Creating ComputedState

```csharp
var stateFactory = services.StateFactory();

// Simple: compute function only
using var state = stateFactory.NewComputed(
    async ct => await someService.GetData(ct));

// With initial value
using var state = stateFactory.NewComputed(
    initialValue: "Loading...",
    async ct => await someService.GetData(ct));

// With update delayer
using var state = stateFactory.NewComputed(
    FixedDelayer.Get(1),  // 1 second delay between updates
    async ct => await someService.GetData(ct));

// With access to state itself
using var state = stateFactory.NewComputed(
    async (state, ct) => {
        var previous = state.ValueOrDefault;
        return await someService.GetData(ct);
    });

// Full options
using var state = stateFactory.NewComputed(
    new ComputedState<string>.Options {
        InitialValue = "Loading...",
        UpdateDelayer = FixedDelayer.Get(2),
        Category = "MyState",
        EventConfigurator = s => {
            s.Invalidated += (_, _) => Console.WriteLine("Invalidated!");
            s.Updated += (_, _) => Console.WriteLine("Updated!");
        },
    },
    async ct => await someService.GetData(ct));
```

### ComputedState Lifecycle

1. **Created** → initial value is set, update cycle starts
2. **Invalidated** → underlying `Computed<T>` becomes inconsistent
3. **UpdateDelayer.Delay()** → waits before recomputing (can be interrupted by UI actions)
4. **Updating** → recomputation begins
5. **Updated** → new value is available
6. Repeat from step 2

### Disposing ComputedState

**Important:** `ComputedState<T>` must be disposed to stop its update cycle:

```csharp
// In a component or service
public class MyComponent : IDisposable
{
    private readonly ComputedState<Data> _state;

    public MyComponent(StateFactory stateFactory)
    {
        _state = stateFactory.NewComputed(...);
    }

    public void Dispose() => _state.Dispose();
}
```

### ComputedState Options

```csharp
public record Options : StateOptions<T>, IComputedStateOptions
{
    // Inherited from StateOptions<T>:
    public T InitialValue { get; init; }
    public Result<T> InitialOutput { get; init; }
    public ComputedOptions ComputedOptions { get; init; }
    public Action<State>? EventConfigurator { get; init; }
    public string? Category { get; init; }

    // ComputedState-specific:
    public IUpdateDelayer? UpdateDelayer { get; init; }  // Default: from DI
    public bool TryComputeSynchronously { get; init; }   // Default: true
    public bool FlowExecutionContext { get; init; }      // Default: false
    public TimeSpan GracefulDisposeDelay { get; init; }  // Default: 10 seconds
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `UpdateDelayer` | From DI | Controls delay between invalidation and recomputation |
| `TryComputeSynchronously` | `true` | Try to compute first value synchronously on creation |
| `FlowExecutionContext` | `false` | Whether to flow `ExecutionContext` to update cycle |
| `GracefulDisposeDelay` | 10 seconds | Extra time for pending operations after `Dispose()` |

## Update Delayers

Update delayers control when `ComputedState` recomputes after invalidation.

### FixedDelayer

Fixed delay between updates:

```csharp
// Get a delayer with specific delay (cached)
var delayer = FixedDelayer.Get(1);      // 1 second
var delayer = FixedDelayer.Get(0.5);    // 500ms

// Special delayers
FixedDelayer.NoneUnsafe   // No delay (dangerous - can cause 100% CPU)
FixedDelayer.YieldUnsafe  // Just yields (Task.Yield)
FixedDelayer.NextTick     // Next timer tick (~16ms on Windows)
FixedDelayer.MinDelay     // Minimum safe delay (default: 32ms)
```

### UpdateDelayer

UI-aware delayer that can skip delays when user actions occur:

```csharp
var delayer = new UpdateDelayer(uiActionTracker, TimeSpan.FromSeconds(1));
```

When a user action is detected via `UIActionTracker`, the delay is shortened to `MinDelay`, providing instant feedback.

### Defaults

```csharp
// Change global defaults
FixedDelayer.Defaults.MinDelay = TimeSpan.FromMilliseconds(50);
FixedDelayer.Defaults.RetryDelays = new RetryDelaySeq(
    TimeSpan.FromSeconds(1),
    TimeSpan.FromMinutes(1));

UpdateDelayer.Defaults.UpdateDelay = TimeSpan.FromSeconds(2);
```

## Events

All states fire three events:

```csharp
state.Invalidated += (s, kind) => {
    // Fired when the underlying Computed<T> is invalidated
    // State will recompute soon (for ComputedState)
};

state.Updating += (s, kind) => {
    // Fired just before recomputation starts
};

state.Updated += (s, kind) => {
    // Fired after new value is available
    Console.WriteLine($"New value: {s.Value}");
};
```

You can also use `EventConfigurator` in options to set up handlers before the state starts computing:

```csharp
var state = stateFactory.NewComputed(
    new ComputedState<int>.Options {
        EventConfigurator = s => s.AddEventHandler(
            StateEventKind.All,
            (state, kind) => Console.WriteLine($"{kind}: {state.Value}")),
    },
    async ct => await GetValue(ct));
```

## Comparison

| Feature | MutableState&lt;T&gt; | ComputedState&lt;T&gt; |
|---------|------------------|-------------------|
| Value source | Set externally | Computed from function |
| Auto-updates | No (instant on Set) | Yes (with delay) |
| Must dispose | No | Yes |
| Use case | Input/local state | Derived/reactive state |
| Updates synchronously | Yes | No (async loop) |

## Tips

1. **Prefer MutableState for inputs** — user selections, form values, local UI state
2. **Prefer ComputedState for derived data** — anything computed from other sources
3. **Always dispose ComputedState** — otherwise the update loop runs forever
4. **Use UpdateDelayer for UI** — it integrates with `UIActionTracker` for responsive UIs
5. **Check IsInitial for loading states** — `state.Snapshot.IsInitial` tells you if still computing first value
6. **Use LastNonErrorValue** — keeps showing previous data while handling errors
