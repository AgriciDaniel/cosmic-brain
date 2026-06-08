---
type: concept
title: "Fusion States & Reactivity"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - state
  - reactivity
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion Blazor Integration]]"
source: "[[fusion-docs-overview]]"
---

# Fusion States & Reactivity

While `Computed<T>` instances are immutable snapshots, **states** track the *latest* version of a computed value over time. They are the equivalent of Knockout.js computed observables or MobX observables in Fusion.

## IState\<T\>

All states implement `IState<T>`, which provides:

```csharp
public interface IState<T> : IState, IResult<T>
{
    Computed<T> Computed { get; }     // Current computed value
    T Value { get; }                   // Shortcut for Computed.Value
    T LastNonErrorValue { get; }       // Last successful value (survives errors)

    event Action<State, StateEventKind>? Invalidated;
    event Action<State, StateEventKind>? Updating;
    event Action<State, StateEventKind>? Updated;
}
```

### Snapshot

`state.Snapshot` returns an immutable `StateSnapshot<T>` for atomic, consistent reads. Use it when you need a coherent view of `Computed`, `Value`, and `IsInitial`:

```csharp
var snapshot = state.Snapshot;
if (snapshot.IsInitial)
    return "Loading...";
return snapshot.Value;
```

## MutableState\<T\>

A mutable value wrapped in a `Computed<T>` envelope — essentially a reactive variable. Ideal for input state (user selections, form values, search queries).

```csharp
var stateFactory = services.StateFactory();
var counter = stateFactory.NewMutable(0);

// Read
int value = counter.Value;

// Write (triggers invalidation)
counter.Value = 10;
counter.Set(20);
counter.Set(result => result.Value + 1); // Atomic update

// Set error
counter.SetError(new InvalidOperationException("..."));

// Access last valid value even during error
int lastGood = counter.LastNonErrorValue;
```

### Using in Compute Methods

```csharp
public class GreetingService : IComputeService
{
    private readonly MutableState<string> _name;

    public GreetingService(StateFactory stateFactory)
        => _name = stateFactory.NewMutable("World");

    [ComputeMethod]
    public virtual async Task<string> GetGreeting()
    {
        var name = await _name.Use(); // Registers as dependency
        return $"Hello, {name}!";
    }

    public void SetName(string name) => _name.Value = name;
}
```

## ComputedState\<T\>

A state that **automatically recomputes** when invalidated, with configurable update delays. Think of it as a compute method with a built-in update loop. Powers the UI via `ComputedStateComponent<T>` in Blazor.

**Must be disposed** — otherwise the update loop runs forever.

```csharp
using var state = stateFactory.NewComputed(
    new ComputedState<string>.Options {
        InitialValue = "Loading...",
        UpdateDelayer = FixedDelayer.Get(1), // 1 second delay
        EventConfigurator = s => {
            s.Invalidated += (_, _) => Console.WriteLine("Invalidated!");
            s.Updated += (_, _) => Console.WriteLine("Updated!");
        },
    },
    async (state, cancellationToken) => {
        var counter = await counters.Get("a");
        return $"Counter: {counter}";
    });
```

### Lifecycle

1. **Created** → initial value set, update cycle starts
2. **Invalidated** → underlying `Computed<T>` becomes inconsistent
3. **UpdateDelayer.Delay()** → waits (can be interrupted by UI actions)
4. **Updating** → recomputation begins
5. **Updated** → new value available; repeat from step 2

## MutableState vs ComputedState

| Feature | MutableState\<T\> | ComputedState\<T\> |
|---------|------------------|---------------------|
| Value source | Set externally | Computed from function |
| Auto-updates | No (instant on Set) | Yes (with delay) |
| Must dispose | No | **Yes** |
| Typical use | Input/local state | Derived/reactive state |
| Has UpdateDelayer | No | Yes |

**Rule of thumb:** Prefer `MutableState` for inputs (search box, form fields). Prefer `ComputedState` for derived data (anything computed from other sources).

## Update Delayers

Control the timing between invalidation and recomputation:

```csharp
FixedDelayer.Get(1);        // 1 second
FixedDelayer.Get(0.5);      // 500ms
FixedDelayer.NextTick;      // ~16ms (next timer tick)
FixedDelayer.MinDelay;      // 32ms (minimum safe)

// UI-aware: shortens delay when user actions are detected
var delayer = new UpdateDelayer(uiActionTracker, TimeSpan.FromSeconds(1));
```

## StateFactory

Obtained from DI. Also has `StateFactory.Default` for tests.

```csharp
// From DI (recommended)
var stateFactory = services.StateFactory();

// For tests
var stateFactory = StateFactory.Default;
```

The factory's `IsScoped` property indicates whether it's from a scoped provider — relevant in Blazor where scoped services are per-circuit.
