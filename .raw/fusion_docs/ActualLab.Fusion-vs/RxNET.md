# ActualLab.Fusion vs Rx.NET (Reactive Extensions)

Rx.NET is a powerful library for composing asynchronous and event-based programs using observable sequences. Both Fusion and Rx.NET deal with reactive programming, but they solve fundamentally different problems.

## The Core Difference

**Rx.NET** is a general-purpose reactive programming library — think of it as a **query language for event streams**. You compose observable streams with operators like `Select`, `Where`, `Merge`, `Throttle`, `Buffer`. It's about transforming and combining streams of events over time. It has nothing to do with caching.

**Fusion** is a caching and synchronization framework. It's specifically designed for **computed values that depend on other values** and need to stay fresh across client-server boundaries. Caching and automatic invalidation are the core features.

## Rx.NET Approach

```csharp
// Rx.NET: Compose and transform event streams
var priceUpdates = Observable.Interval(TimeSpan.FromSeconds(1))
    .SelectMany(_ => FetchPrice("AAPL"))
    .DistinctUntilChanged()
    .Throttle(TimeSpan.FromMilliseconds(500))
    .Buffer(TimeSpan.FromSeconds(5))
    .Select(prices => prices.Average());

// Subscribe and handle updates
priceUpdates.Subscribe(avgPrice => Console.WriteLine($"5s avg: {avgPrice}"));

// Manual cleanup required
subscription.Dispose();
```

## Fusion Approach

```csharp
// Fusion: Cached computed values with automatic invalidation
public class StockService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<decimal> GetPrice(string symbol, CancellationToken ct)
        => await _priceProvider.GetPrice(symbol, ct);

    [ComputeMethod]
    public virtual async Task<decimal> GetAveragePrice(string symbol, CancellationToken ct)
    {
        var price = await GetPrice(symbol, ct);  // Dependency tracked
        // This is cached; recomputes only when GetPrice is invalidated
        return price;
    }
}

// Automatic updates when invalidated - no manual subscription management
var computed = await Computed.Capture(() => stockService.GetPrice("AAPL"));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"Price: {c.Value}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- **Caching with automatic invalidation** — Rx.NET doesn't cache anything
- Automatic client-server synchronization
- Simpler mental model for computed data
- Dependency tracking between values
- Real-time UI updates without subscription management

### Rx.NET is better at

- **Stream composition** — rich operators for transforming event streams
- Complex timing operations (throttle, debounce, buffer, window)
- Processing infinite event streams (clicks, sensor data, messages)
- Combining multiple asynchronous sources
- Fine-grained backpressure handling

## Different Problems, Different Solutions

**Rx.NET** answers: "How do I transform and combine streams of events over time?"

**Fusion** answers: "How do I keep computed values fresh and synchronized?"

### Event Processing (Rx.NET strength)

```csharp
// Rx.NET excels at event stream processing
var mouseMoves = Observable.FromEventPattern<MouseEventArgs>(form, "MouseMove");
var throttled = mouseMoves
    .Throttle(TimeSpan.FromMilliseconds(100))
    .Select(e => new Point(e.EventArgs.X, e.EventArgs.Y))
    .DistinctUntilChanged()
    .Buffer(10)
    .Where(points => points.Count >= 10);
```

### Data Synchronization (Fusion strength)

```csharp
// Fusion excels at keeping computed data current and cached
[ComputeMethod]
public virtual async Task<Dashboard> GetDashboard(CancellationToken ct)
{
    var orders = await GetRecentOrders(ct);      // Cached, dependency tracked
    var revenue = await GetRevenue(ct);          // Cached, dependency tracked
    var users = await GetActiveUsers(ct);        // Cached, dependency tracked
    return new Dashboard(orders, revenue, users); // Invalidates when any dependency changes
}
```

## Conceptual Comparison

| Concept | Rx.NET | Fusion |
|---------|--------|--------|
| Core abstraction | `IObservable<T>` (stream) | `Computed<T>` (cached value) |
| Primary purpose | Transform event streams | Cache computed values |
| Caching | None | Built-in |
| Composition | Operators (Select, Where, Merge) | Method calls (automatic dependency) |
| Lifecycle | Explicit subscription/disposal | Automatic with GC |
| Network sync | Not a feature | Core feature |

## When to Use Each

### Choose Rx.NET when:
- Processing streams of events (clicks, sensor data, messages)
- You need complex timing operators (throttle, debounce, buffer)
- Combining multiple event sources
- Building event-driven architectures
- Working with infinite streams

### Choose Fusion when:
- Computing derived values from data
- State should sync between client and server
- You need caching with automatic invalidation
- Building real-time UIs showing current data
- Dependency tracking matters

## Using Both Together

Fusion and Rx.NET can complement each other:

```csharp
// Use Fusion for cached, synchronized data
[ComputeMethod]
public virtual async Task<StockQuote> GetQuote(string symbol, CancellationToken ct)
    => await _stockApi.GetQuote(symbol, ct);

// Use Rx.NET for event processing on top of Fusion data
var computed = await Computed.Capture(() => stockService.GetQuote("AAPL"));

// Convert Fusion changes to Rx observable for advanced stream processing
var priceStream = computed.Changes()
    .ToObservable()
    .Select(c => c.Value.Price)
    .Buffer(TimeSpan.FromSeconds(5))
    .Select(prices => prices.Average());
```

## Architectural Comparison

```
Rx.NET (stream processing):
Events ──▶ Observable ──▶ Operators ──▶ Subscribe ──▶ Action
   │                          │
   │    Compose & Transform   │        (no caching)
   └──────────────────────────┘

Fusion (cached computed values):
Compute Method ──▶ Computed<T> ──▶ Cache ──▶ Client
       │                             │
       │    Automatic Dependency     │
       │       Tracking + Cache      │
       └──▶ Invalidation ────────────┘
```

## The Key Insight

Rx.NET is a **query language for event streams** — incredibly powerful for composing and transforming streams of data over time. It doesn't cache anything; each subscriber processes the stream independently.

Fusion is a **caching and synchronization framework** — purpose-built for computed values that depend on data sources, with automatic caching and client-server sync.

If you're building a .NET application where the main challenge is keeping UI in sync with server data, Fusion provides that capability out of the box. If you need sophisticated event stream processing with timing operators and backpressure, Rx.NET is the right tool. They solve different problems and work well together.
