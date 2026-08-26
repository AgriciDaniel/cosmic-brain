---
type: concept
title: "Fusion Compute Services & Computed<T>"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - caching
  - computed
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Overview]]"
  - "[[Fusion States]]"
  - "[[Fusion Core Foundation]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Compute Services & Computed\<T\>

Compute services and `Computed<T>` are the heart of Fusion. Together they provide automatic caching, dependency tracking, and cascading invalidation.

## Compute Services

A compute service is a class that "implements" `IComputeService` (a tagging interface) and exposes methods marked with `[ComputeMethod]`.

```csharp
public class CounterService : IComputeService
{
    private readonly ConcurrentDictionary<string, int> _counters = new();

    [ComputeMethod]
    public virtual async Task<int> Get(string key) // Must be virtual & async
    {
        var value = _counters.GetValueOrDefault(key, 0);
        return value;
    }

    [ComputeMethod]
    public virtual async Task<int> Sum(string key1, string key2)
    {
        var value1 = await Get(key1);
        var value2 = await Get(key2);
        return value1 + value2;
    }

    public void Increment(string key)
    {
        _counters.AddOrUpdate(key, k => 1, (k, v) => v + 1);
        using (Invalidation.Begin()) {
            _ = Get(key); // Invalidate Get(key) — completes synchronously, returns default
        }
    }
}
```

Register with DI:

```csharp
var services = new ServiceCollection();
var fusion = services.AddFusion();
fusion.AddComputeService<CounterService>();
```

### Key Rules

- Must be **virtual** and **async** (return `Task<T>`)
- Must "implement" `IComputeService` (tagging interface)
- Each unique `(service, method, arguments)` tuple is a separate cache key
- Inside `Invalidation.Begin() { ... }`, calls to compute methods **don't execute** — they complete synchronously and invalidate the cached value for that call

### Automatic Behaviors

**Caching:** Same call → same result, no recomputation.
**Dependency tracking:** When `Sum("a", "b")` calls `Get("a")` and `Get("b")`, Fusion records these as dependencies.
**Cascading invalidation:** Invalidating `Get("a")` automatically invalidates `Sum("a", "b")` and everything that depends on it.

## Computed\<T\>

`Computed<T>` is the immutable object behind every compute method call. It stores the result (value or error), tracks its consistency state, knows its dependencies and dependants, and can produce an updated version of itself.

### Lifecycle

| State | Description |
|-------|-------------|
| `Computing` | Currently being computed (mutable during this phase) |
| `Consistent` | Computation complete, value is current |
| `Invalidated` | Marked as outdated, needs recomputation |

### Accessing Computed Values

```csharp
// Capture the computed for a call
var computed = await Computed.Capture(() => counters.Get("a"));
computed.IsConsistent(); // true
computed.Value;          // the cached value

// Get existing without triggering computation
var existing = Computed.GetExisting(() => counters.Get("a")); // null if not cached

// Get current computed from within a compute method
var current = Computed.GetCurrent<Data>();

// Manually invalidate
computed.Invalidate();

// Get latest version (recomputes if invalidated)
var updated = await computed.Update();

// Use as dependency in another computation
var value = await computed.Use(cancellationToken);
```

### Waiting for Changes

```csharp
// Wait until invalidated
await computed.WhenInvalidated(ct);

// Wait until value satisfies predicate
var updated = await computed.When(x => x > 100, ct);

// Stream of values as they change
await foreach (var c in computed.Changes(ct)) {
    Console.WriteLine($"New value: {c.Value}");
}
```

### Context Scopes

```csharp
// Suppress dependency capture (logging, metrics)
using (Computed.BeginIsolation()) {
    var data = await service.GetData(); // Not tracked as dependency
}

// Explicit capture mode
using var scope = Computed.BeginCapture();
await service.GetData();
var captured = scope.Context.GetCaptured<Data>();
```

## ComputedOptions

Fine-tune behavior per compute method via the `[ComputeMethod]` attribute:

| Option | Default | Purpose |
|--------|---------|---------|
| `MinCacheDuration` | 0 | Min seconds to hold strong reference (memory vs CPU) |
| `TransientErrorInvalidationDelay` | 1s | Auto-retry delay for transient errors |
| `AutoInvalidationDelay` | ∞ (none) | Auto-invalidate after N seconds (e.g., server time) |
| `InvalidationDelay` | 0 | Debounce window for coalescing invalidations |
| `ConsolidationDelay` | -1 (off) | Only invalidate when value actually changes |

All values are in seconds. `double.NaN` = use default. `double.PositiveInfinity` = disabled.

```csharp
[ComputeMethod(
    MinCacheDuration = 60,
    AutoInvalidationDelay = 30,
    TransientErrorInvalidationDelay = 5)]
Task<User> Get(string id);
```

### ConsolidationDelay

Critical for counters and aggregations. Without it, any invalidation upstream triggers recomputation even if the result is identical. With `ConsolidationDelay = 0`, Fusion recomputes internally and only invalidates the public value if it actually changed.

```csharp
[ComputeMethod(ConsolidationDelay = 0)] // Only invalidate on actual value change
Task<int> GetUnreadCount(string placeId);
```

## ComputedRegistry

The global cache of all `Computed<T>` instances, accessible as a singleton:

```csharp
ComputedRegistry.Settings.InitialCapacity = 10000;
ComputedRegistry.Settings.ConcurrencyLevel = 64;

// Events for monitoring
ComputedRegistry.OnRegister += computed => { ... };
ComputedRegistry.OnAccess += (computed, isNew) => { ... };

// Invalidate everything (tests)
ComputedRegistry.InvalidateEverything();
```

## Invalidation Source Tracking

Fusion can track *why* a computed was invalidated:

```csharp
Invalidation.TrackingMode = InvalidationTrackingMode.WholeChain;

var source = computed.InvalidationSource;
var origin = source.Origin; // Root cause
computed.ToString(InvalidationSourceFormat.WholeChain);
// "GetUser(123) <- GetUserList() <- UserService.cs:42"
```

## Tips

- **Computed values are immutable** after `Consistent` — get a new version via `Update()`
- **Use `Capture` for debugging** — easiest way to inspect the graph
- **Don't hold old computed values** — they prevent GC of the dependency graph
- **Prefer `WhenInvalidated` over polling** — more efficient and immediate
- **Use `Changes()` for reactive UIs** — handles update delays and retries automatically
