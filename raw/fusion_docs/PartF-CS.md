# Compute Services: Cheat Sheet

Quick reference for Fusion core concepts.


## Configuration

Register Fusion and compute services:

<!-- snippet: PartFCS_RegisterServices -->
```cs
var fusion = services.AddFusion();
fusion.AddService<ICartService, CartService>();
// or: fusion.AddComputeService<CartService>();
```
<!-- endSnippet -->

Change global computed options defaults:

<!-- snippet: PartFCS_ChangeDefaults -->
```cs
ComputedOptions.Default = ComputedOptions.Default with {
    MinCacheDuration = TimeSpan.FromSeconds(30),
};
```
<!-- endSnippet -->

Configure invalidation source tracking (for debugging):

<!-- snippet: PartFCS_ConfigureTracking -->
```cs
Invalidation.TrackingMode = InvalidationTrackingMode.WholeChain;
```
<!-- endSnippet -->


## Compute Service Interface

<!-- snippet: PartFCS_Interface -->
```cs
public interface ICartService : IComputeService
{
    [ComputeMethod]
    Task<List<Order>> GetOrders(long cartId, CancellationToken cancellationToken = default);
}
```
<!-- endSnippet -->


## Compute Service Implementation

<!-- snippet: PartFCS_Implementation -->
```cs
public class CartService : ICartService
{
    // Must be virtual + return Task<T>
    [ComputeMethod]
    public virtual async Task<List<Order>> GetOrders(long cartId, CancellationToken cancellationToken)
    {
        // Implementation
        return new List<Order>();
    }
}
```
<!-- endSnippet -->


## ComputeMethod Attribute Options

<!-- snippet: PartFCS_AllOptions -->
```cs
[ComputeMethod(
    MinCacheDuration = 60,              // Keep in memory for 60 seconds
    AutoInvalidationDelay = 300,        // Auto-refresh every 5 minutes
    TransientErrorInvalidationDelay = 5, // Retry errors after 5 seconds
    InvalidationDelay = 0.5,            // Debounce invalidations by 500ms
    ConsolidationDelay = 0)]            // Invalidate only when value changes
public virtual async Task<Data> GetData() { return default!; }
```
<!-- endSnippet -->


## Invalidation

Invalidate from a regular method:

<!-- snippet: PartFCS_InvalidationBlock -->
```cs
using (Invalidation.Begin()) {
    _ = service.GetOrders(cartId, default);
}
```
<!-- endSnippet -->

Invalidate a `Computed<T>` directly:

<!-- snippet: PartFCS_InvalidateComputed -->
```cs
computed.Invalidate();
computed.Invalidate(TimeSpan.FromSeconds(30));  // Delayed
computed.Invalidate(new InvalidationSource("reason"));  // With source
```
<!-- endSnippet -->


## Working with Computed&lt;T&gt;

Capture:

<!-- snippet: PartFCS_Capture -->
```cs
var computed1 = await Computed.Capture(() => service.GetData(id, cancellationToken));
var computed2 = await Computed.TryCapture(() => service.GetData(id, default));  // Returns null on failure
```
<!-- endSnippet -->

Get existing (without triggering computation):

<!-- snippet: PartFCS_GetExisting -->
```cs
var existing = Computed.GetExisting(() => service.GetData(id, default));
```
<!-- endSnippet -->

Get current computed inside a compute method:

<!-- snippet: PartFCS_GetCurrent -->
```cs
var computed = Computed.GetCurrent();
var computedTyped = Computed.GetCurrent<Data>();  // Typed, throws if null
```
<!-- endSnippet -->

Check consistency:

<!-- snippet: PartFCS_CheckConsistency -->
```cs
if (computed.IsConsistent()) { /* ... */ }
if (computed.IsInvalidated()) { /* ... */ }
```
<!-- endSnippet -->

Update (recompute):

<!-- snippet: PartFCS_Update -->
```cs
var newComputed = await computed.Update(cancellationToken);
```
<!-- endSnippet -->

Use as dependency:

<!-- snippet: PartFCS_Use -->
```cs
Data value1 = await computed.Use(cancellationToken);
Data value2 = await computed.Use(allowInconsistent: true, cancellationToken);  // Allow stale
```
<!-- endSnippet -->

Await invalidation:

<!-- snippet: PartFCS_WhenInvalidated -->
```cs
await computed.WhenInvalidated(cancellationToken);
computed.Invalidated += c => Console.WriteLine("Invalidated!");
```
<!-- endSnippet -->

Await until condition is met:

<!-- snippet: PartFCS_When -->
```cs
var computed = await Computed.Capture(() => service.GetCount(id, cancellationToken));
computed = await computed.When(count => count >= 10, cancellationToken);
```
<!-- endSnippet -->

Observe changes:

<!-- snippet: PartFCS_Changes -->
```cs
var computed = await Computed.Capture(() => service.GetValue(id, cancellationToken));
await foreach (var c in computed.Changes(cancellationToken)) {
    Console.WriteLine($"New value: {c.Value}");
}
```
<!-- endSnippet -->

Deconstruct for pattern matching:

<!-- snippet: PartFCS_Deconstruct -->
```cs
var (value, error) = computed;
```
<!-- endSnippet -->

Isolate from dependency tracking:

<!-- snippet: PartFCS_Isolation -->
```cs
using (Computed.BeginIsolation()) {
    // Calls here won't register as dependencies
}
```
<!-- endSnippet -->


## ComputedRegistry

<!-- snippet: PartFCS_Registry -->
```cs
ComputedRegistry.InvalidateEverything();  // Useful for tests
await ComputedRegistry.Prune();           // Force prune dead entries
```
<!-- endSnippet -->


## States

Get StateFactory:

<!-- snippet: PartFCS_StateFactory -->
```cs
var stateFactory = services.StateFactory();
// or: StateFactory.Default (for tests)
```
<!-- endSnippet -->

Create mutable state:

<!-- snippet: PartFCS_MutableState -->
```cs
var state = stateFactory.NewMutable<int>(initialValue: 0);

state.Set(42);           // Set value
state.Value = 42;        // Same as above
var value1 = state.Value; // Read value
var value2 = await state.Use(cancellationToken); // Use in compute methods
```
<!-- endSnippet -->

Create computed state:

<!-- snippet: PartFCS_ComputedState -->
```cs
using var computedState = stateFactory.NewComputed(
    new ComputedState<string>.Options() {
        InitialValue = "",
        UpdateDelayer = FixedDelayer.Get(1), // 1 second delay
        EventConfigurator = state => {
            state.Updated += (s, _) => Console.WriteLine($"Updated: {s.Value}");
        },
    },
    async (state, cancellationToken) => {
        var data = await service.GetData(cancellationToken);
        return data.ToString()!;
    });

await computedState.Update(); // Wait for first computation
var value = computedState.Value;
```
<!-- endSnippet -->

State properties:

<!-- snippet: PartFCS_StateProperties -->
```cs
var computed = state.Computed;           // Current Computed<T>
var snapshot = state.Snapshot;           // Immutable snapshot
var lastGood = state.LastNonErrorValue;  // Last value before error
```
<!-- endSnippet -->


## Update Delayers

<!-- snippet: PartFCS_Delayers -->
```cs
var d1 = FixedDelayer.Get(1);    // 1 second delay
var d2 = FixedDelayer.Get(0.5);  // 500ms delay
var d3 = FixedDelayer.NextTick;  // ~16ms delay
var d4 = FixedDelayer.MinDelay;  // Minimum safe delay (32ms)
```
<!-- endSnippet -->


## State Events

<!-- snippet: PartFCS_StateEvents -->
```cs
state.Invalidated += (s, kind) => { /* ... */ };
state.Updating += (s, kind) => { /* ... */ };
state.Updated += (s, kind) => { /* ... */ };
```
<!-- endSnippet -->
