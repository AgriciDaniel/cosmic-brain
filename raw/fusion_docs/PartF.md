# Compute Services, Computed\<T>, and States

Fusion is a library that brings real-time capabilities to your .NET applications with minimal effort. This guide will introduce you to the core concepts and show you how to get started.

Fusion is built around three key abstractions:

1. **Computed Values**, or `Computed<T>` instances, are immutable results of computations that signal when they become outdated (invalidated). Once a `Computed<T>` gets invalidated, you can get its newest version (another instance) by calling its `Update` method.
2. **Compute Services** are services exposing **Computed Methods**. Such methods look very similar to regular methods but produce computed values behind the scenes. You may think of them as "parameterized recipes" for computed values. When you call such a method, it either produces a new `Computed<T>` bound to this specific call (i.e. to the `(service, method, arguments)` triplet) behind the scenes, or pulls the matching one from cache. If the cached value is still consistent (not invalidated yet), the call is resolved without actual computation.
3. Finally, **Computed States** are objects encapsulating a computed value and its auto-update loop. Any computed value knows how to produce the most up-to-date version, but doesn't do this automatically, and that's intentional. For example, if such a value is used in the UI, in some cases you may want to update it instantly (e.g. if we know the user just performed an action, so we want to show its result immediately), but in many other cases it makes sense to throttle down the update rate. Computed states solve exactly this problem: they combine a computed value and its update policy (`IUpdateDelayer`).

## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.Fusion](https://www.nuget.org/packages/ActualLab.Fusion/) | Core Fusion: `Computed<T>`, compute services, states, invalidation |

::: tip
This is the only package you need for basic Fusion functionality. For server-side hosting, Blazor integration, or distributed scenarios, see the respective parts of the documentation.
:::

## 1. Compute Services and Compute Methods

Here's a simple counter service that demonstrates Fusion's basic capabilities:

<!-- snippet: PartF_Declare_Service -->
```cs
public class CounterService : IComputeService // This is a tagging interface any compute service must "implement"
{
    private readonly ConcurrentDictionary<string, int> _counters = new();

    [ComputeMethod] // Indicates this is a compute method
    public virtual async Task<int> Get(string key) // Must be virtual & async
    {
        var value = _counters.GetValueOrDefault(key, 0);
        WriteLine($"Get({key}) = {value}");
        return value;
    }

    [ComputeMethod] // Indicates this is a compute method
    public virtual async Task<int> Sum(string key1, string key2) // Must be virtual & async
    {
        var value1 = await Get(key1);
        var value2 = await Get(key2);
        var sum = value1 + value2;
        WriteLine($"Sum({key1}, {key2}) = {sum}");
        return sum;
    }

    // This is a regular method, so there are no special requirements
    public void Increment(string key)
    {
        WriteLine($"Increment({key})");
        _counters.AddOrUpdate(key, k => 1, (k, v) => v + 1);
        using (Invalidation.Begin())  {
            // Any call to a compute method inside this block means "invalidate the value for that call"
            _ = Get(key); // So here we invalidate the value of this.Get(...) call with the `key` argument
        }
    }
}
```
<!-- endSnippet -->

To use this service, first register it with dependency injection:

<!-- snippet: PartF_Register_Services -->
```cs
var services = new ServiceCollection();
var fusion = services.AddFusion(); // You can also use services.AddFusion(fusion => ...) pattern
fusion.AddComputeService<CounterService>();
var sp = services.BuildServiceProvider();

// And that's how we get our first compute service:
var counters = sp.GetRequiredService<CounterService>();
```
<!-- endSnippet -->

Let's see how the behavior of compute methods in `CounterService` differs from the expected one:

### Automatic Caching

<!-- snippet: PartF_Automatic_Caching -->
```cs
await counters.Get("a"); // Prints: Get(a) = 0
await counters.Get("a"); // Prints nothing -- it's a cache hit; the result is 0
```
<!-- endSnippet -->

Moreover, it works even when compute methods call each other.
Notice that the `Sum("a", "b")` call here calls `Get("a")`, which gets resolved without an actual computation.
On the other hand, `Get("b")` gets computed. But once we call it again, it also gets resolved from the cache.

<!-- snippet: PartF_Automatic_Dependency_Tracking -->
```cs
await counters.Sum("a", "b"); // Prints: Get(b) = 0, Sum(a, b) = 0 -- Get(b) was called from Sum(a, b)
await counters.Sum("a", "b"); // Prints nothing -- it's a cache hit; the result is 0
await counters.Get("b");      // Prints nothing -- it's a cache hit; the result is 0
```
<!-- endSnippet -->

### Invalidation

Invalidation means marking a certain computed value as "outdated".
If you have a `Computed<T>` instance, you can do this directly.
But if it's about invalidating a value that corresponds to a certain compute method call,
you can also do this by making this call inside `using (Invalidation.Begin()) { ... }` block:

<!-- snippet: PartF_Invalidation_Semantics -->
```cs
using (Invalidation.Begin())  {
    // Any call to a compute method here:
    // - Won't execute the body of the compute method
    // - Will complete synchronously by returning a completed (Value)Task<T> with Result = default(T)
    // - Will invalidate the cached Computed<T> instance (if it exists) corresponding to the call
}
```
<!-- endSnippet -->

And if you look at the code of the `CounterService.Increment` method, that's exactly what happens
there to invalidate the `Get(key)` call on every increment.

<!-- snippet: PartF_Invalidation -->
```cs
counters.Increment("a"); // Prints: Increment(a) + invalidates Get(a) call result
await counters.Get("a"); // Prints: Get(a) = 1
await counters.Get("b"); // Prints nothing -- Get(b) call wasn't invalidated, so it's a cache hit
```
<!-- endSnippet -->

### Automatic Dependency Tracking and Cascading Invalidation

We know that when a compute method gets called, it builds or uses an existing `Computed<T>` instance,
which stores the cached call result and tracks its invalidation. But there is one other thing `Computed<T>` does: it tracks dependencies of a computation that produced this computed value.

Each `Computed<T>` instance knows all other `Computed<T>` instances that were "used" to produce it,
and vice versa &ndash; each computed value can enumerate every other computed value that depends on it, directly or indirectly.

Mathematically speaking, computed values form a Directed Acyclic Graph (DAG) of dependencies between each other. And this graph evolves at runtime:

- When a compute method gets called, it produces a new node (`Computed<T>` instance) in this graph. The edges of this node point to every other node it "uses"; they're added when the compute method runs &ndash; specifically, when it calls other compute methods.
- When `Computed<T>` gets invalidated, all of its dependencies (i.e. nodes that use it directly or indirectly) get invalidated as well. Any invalidated node is implicitly removed from the graph, because there can be no edges pointing to it.

Let's see all of this in action:

<!-- snippet: PartF_Cascading_Invalidation -->
```cs
counters.Increment("a"); // Prints: Increment(a)

// Increment(a) invalidated Get(a), but since invalidations are cascading,
// and Sum(a, b) depends on Get(a), it's also invalidated.
// That's why Sum(a, b) is going to be recomputed on the next call, as well as Get(a),
// which is called by Sum(a, b).
await counters.Sum("a", "b"); // Prints: Get(a) = 2, Sum(a, b) = 2
await counters.Sum("a", "b"); // Prints nothing, it's a cache hit; the result is 2

// Even though we expect Sum(a, b) == Sum(b, a), Fusion doesn't know that.
// Remember, "cache key" for any compute method call is (service, method, args...),
// and arguments are different in this case: (a, b) != (b, a).
// So Fusion will have to compute Sum(b, a) from scratch.
// But note that Get(a) and Get(b) calls it makes are still resolved from cache.
await counters.Sum("b", "a"); // Prints: Sum(b, a) = 2 -- Get(b) and Get(a) results are already cached
```
<!-- endSnippet -->

## 2. Computed Values

You already know that compute methods produce computed values (`Computed<T>` instances)
behind the scenes.

Computed values follow a simple lifecycle:

- They start as mutable objects in the `Computing` state while being computed; you can observe a `Computed<T>` in this state by calling `Computed.GetCurrent()` inside a compute method
- Once the computation ends, they become `Consistent` and immutable
- Finally, they may eventually turn `Inconsistent`.

At any given time, there can be only one `Consistent` version of a computed value that corresponds to a certain computation, even though older `Inconsistent` versions may still reside in memory.

Let's pull a `Computed<T>` instance that is associated with a given call and play with it:

<!-- snippet: PartF_Accessing_Computed_Values -->
```cs
var computedForGetA = await Computed.Capture(() => counters.Get("a"));
WriteLine(computedForGetA.IsConsistent()); // True
WriteLine(computedForGetA.Value);          // 2

var computedForSumAB = await Computed.Capture(() => counters.Sum("a", "b"));
WriteLine(computedForSumAB.IsConsistent()); // True
WriteLine(computedForSumAB.Value);          // 2

// Adding invalidation handler; you can also use WhenInvalidated
computedForSumAB.Invalidated += _ => WriteLine("Sum(a, b) is invalidated");

// Manually invalidate computedForGetA, i.e. the result of counters.Get("a") call
computedForGetA.Invalidate(); // Prints: Sum(a, b) is invalidated
WriteLine(computedForGetA.IsConsistent());  // False
WriteLine(computedForSumAB.IsConsistent()); // False, invalidation is always cascading

// Manually update computedForSumAB
var newComputedForSumAB = await computedForSumAB.Update();
// Prints:
// Get(a) = 2 – we invalidated it, so it had to be recomputed by Sum(a, b)
// Sum(a, b) = 2 – the .Update() call above triggered this recomputation

WriteLine(newComputedForSumAB.IsConsistent()); // True
WriteLine(newComputedForSumAB.Value); // 2

// .Update() returns the current consistent computed for this call:
// a NEW instance if the original was invalidated (as on the line below),
// or the SAME instance if the original is already consistent.
WriteLine(computedForSumAB == newComputedForSumAB); // False
WriteLine(newComputedForSumAB == await computedForSumAB.Update()); // True

// Since `Computed<T>` are almost immutable,
// the outdated computed instance is still usable:
WriteLine(computedForSumAB.IsConsistent()); // False
WriteLine(computedForSumAB.Value); // 2
```
<!-- endSnippet -->

### Reactive Updates on Invalidation

Now we are ready to write a basic reactive update loop:

<!-- snippet: PartF_Reactive_Updates -->
```cs
_ = Task.Run(async () => {
    // This is going to be our update loop
    for (var i = 0; i <= 3; i++) {
        await Task.Delay(1000);
        counters.Increment("a");
    }
});

var clock = Stopwatch.StartNew();
var computed = await Computed.Capture(() => counters.Sum("a", "b"));
WriteLine($"{clock.Elapsed:g}s: {computed}, Value = {computed.Value}");
for (var i = 0; i <= 3; i++) {
    await computed.WhenInvalidated();
    computed = await computed.Update();
    WriteLine($"{clock.Elapsed:g}s: {computed}, Value = {computed.Value}");
}
```
<!-- endSnippet -->

### Computed.When() and Changes() Methods

You already saw `WhenInvalidated()` method in action. Let's look at two more useful methods:

- `When()` method allows you to await for a computed value to satisfy certain predicate.
  It returns a `Task<Computed<T>>`.
- `Changes()` method allows you to observe changes in a computed value over time.
  It returns an `IAsyncEnumerable<Computed<T>>`, which yields the current value first,
  and new computed values as they become available.
  The async enumerable it builds is going to yield the items until the moment it gets canceled.

And finally, the example below shows that you can deconstruct a `Computed<T>` instance to get
its `ValueOrDefault` and `Error` properties. Since `Value` property is not accessed during
the deconstruction, it doesn't throw an exception if the computed value has an `Error`.

<!-- snippet: PartF_When_And_Changes_Methods -->
```cs
_ = Task.Run(async () => {
    // This is going to be our update loop
    for (var i = 0; i <= 5; i++) {
        await Task.Delay(333);
        counters.Increment("a");
    }
});

var clock = Stopwatch.StartNew();
var computed = await Computed.Capture(() => counters.Sum("a", "b"));

// Computed<T>.When(..) example:
computed = await computed.When(x => x >= 10); // ~= .Changes().When(predicate).First()

// Computed<T>.Changes() example:
IAsyncEnumerable<Computed<int>> changes = computed.Changes();

_ = Task.Run(async () => {
    await foreach (var (value, error) in changes) // Computed<T> deconstruction example
        WriteLine($"{clock.Elapsed:g}s: Value = {value}, Error = {error}");
});
await Task.Delay(5000); // Wait for the changes to be processed
```
<!-- endSnippet -->

## 3. `State<T>` and Its Variants

State is the last missing piece of a puzzle.
If you are familiar with [Knockout.js](https://knockoutjs.com/)
or [MobX](https://mobx.js.org/), state would correspond
to their versions of "computed observables".

Every state tracks the most recent version of some `Computed<T>`.
That's why states are so useful for reactive updates.

Any `State<T>`:

- Has a `Computed` property, which points to the most recent version of `Computed<T>` it tracks.
- Has a `Snapshot` property of `StateSnapshot<T>` type.
  This property is updated atomically and returns an immutable object describing the current "state" of the `State<T>`. If you
  ever need a "consistent" view of the state, `Snapshot` is
  the way to get it. A good example of where you'd need it is
  this one:
  - You read `state.HasValue` first, it returns `true`
  - But a subsequent attempt to read `state.Value` fails because
    the state was updated right between these two reads.
- Both `State<T>` and `StateSnapshot<T>` expose
  `LastNonErrorValue` and `LastNonErrorComputed` properties &ndash; these
  allow access to the last valid `Value` and its `Computed<T>`
  exposed by the state. In other words, when a state exposes
  an `Error`, `LastNonErrorValue` still exposes the previous `Value`.
  This feature is quite handy when you need to access both
  the last "correct" value (to e.g. bind it to the UI)
  and the newly observed `Error` (to display it separately).
- Similar to `Computed<T>`, any state implements `IResult<T>`
  by forwarding all calls to its `Computed` property.
- Similar to `IEnumerable<T>` / `IEnumerable`, there are typed
  and untyped versions of any `IState` interface.

There are two implementations of `State<T>`:

1. `MutableState<T>` is a mutable value (variable) wrapped in a `Computed<T>` envelope.
   Its `Computed` property returns an always-consistent computed, which gets
   replaced once the `MutableState.Value` (or `Error`, etc.) is set;
   the old computed gets invalidated.
   You can use mutable states in compute methods or computed states &ndash;
   since any state tracks some `Computed<T>`, it can be a dependency
   of another computed value.
   Typically, such states are used to describe the client-side state
   of certain UI elements (e.g., a value entered into a search box).
2. `ComputedState<T>` is, in fact, a compute method and an update loop that
   triggers the recomputation after a certain delay following invalidation.
   The delay is just a `Task` provided by `IUpdateDelayer` bound to this state,
   so it can vary from state to state, from time to time, or even end instantly
   when, for example, a user action occurs &ndash; to make every state instantly reflect the change.

`ComputedState<T>` powers the UI updates in Fusion+Blazor apps. It is used by `ComputedStateComponent<T>`, a Blazor component that automatically re-renders when changes occur in its computed state.

Here is a brief description of key differences between these two states:

| Property | `MutableState<T>` | `ComputedState<T>` |
|----------|-------------------|---------------------|
| Is mutable? (has `state.Value` / `Error` setters) | Yes | No |
| Is `state.Computed` always consistent? | Yes | No |
| Has `UpdateDelayer`? | No | Yes |

### Constructing States

States are constructed using `StateFactory` &ndash; one of the singletons that
`.AddFusion()` injects into `IServiceProvider`.

There is also `StateFactory.Default`, which is intended to be used
mainly in tests. Unless you assign a specific state factory to it,
it will use its own "minimal" service provider.

### Mutable State

Let's play with `MutableState<int>`:

<!-- snippet: PartF_MutableState -->
```cs
var stateFactory = sp.StateFactory(); // Same as sp.GetRequiredService<StateFactory>()
var state = stateFactory.NewMutable(1);
var oldComputed = state.Computed;

WriteLine($"Value: {state.Value}, Computed: {state.Computed}");
// Value: 1, Computed: StateBoundComputed<Int32>(MutableState<Int32>-Hash=39252654 v.d2, State: Consistent)

state.Set(2);
WriteLine($"Value: {state.Value}, Computed: {state.Computed}");
// Value: 2, Computed: StateBoundComputed<Int32>(MutableState<Int32>-Hash=39252654 v.h2, State: Consistent)

WriteLine($"Old computed: {oldComputed}"); // Should be invalidated
// Old computed: StateBoundComputed<Int32>(MutableState<Int32>-Hash=39252654 v.d2, State: Invalidated)

var result = Result.NewError<int>(new ApplicationException("Just a test"));
state.Set(1);
try {
    WriteLine($"Value: {state.Value}, Computed: {state.Computed}");
    // The State was set to an error below, so .Value throws
    // the stored exception (ApplicationException).
}
catch (ApplicationException) {
    WriteLine($"Error: {state.Error?.GetType()}, Computed: {state.Computed}");
}
WriteLine($"LastNonErrorValue: {state.LastNonErrorValue}");
// LastNonErrorValue: 2
WriteLine($"Snapshot.LastNonErrorComputed: {state.Snapshot.LastNonErrorComputed}");
// Snapshot.LastNonErrorComputed: StateBoundComputed<Int32>(MutableState<Int32>-Hash=39252654 v.h2, State: Invalidated)
```
<!-- endSnippet -->

## Computed State

Here is an example showing what `ComputedState<T>` and `MutableState<T>` can do together:

<!-- snippet: PartF_ComputedState -->
```cs
var stateFactory = sp.StateFactory();
var clock = Stopwatch.StartNew();

// We'll use this state as a dependency for the computed state
var mutableState = stateFactory.NewMutable("x");

// ComputedState<T> instances must be disposed, otherwise they'll never stop recomputing!
using var computedState = stateFactory.NewComputed(
    new ComputedState<string>.Options() {
        InitialValue = "<initial>",
        UpdateDelayer = FixedDelayer.Get(1), // 1 second update delay
        // You can attach event handlers later as well. EventConfigurator allows setting them up
        // right on construction, i.e., before any of these events can occur.
        EventConfigurator = state => {
            // A shortcut to attach 3 event handlers: Invalidated, Updating, Updated
            state.AddEventHandler(
                StateEventKind.All,
                (s, e) => WriteLine($"{clock.Elapsed:g}s: {e}, Value: {s.Value}, Computed: {s.Computed}"));
        },
    },
    // This lambda describes how the computed state is computed –
    // essentially, it's a compute method written as a lambda.
    async (state, cancellationToken) => {
        // We intentionally delay the computation here to show how the initial value works
        await Task.Delay(100, cancellationToken);
        var counter = await counters.Get("a");
        // state.Use() is required to track the state usage inside a compute method
        var mutableValue = await mutableState.Use(cancellationToken);
        return $"({counter}, {mutableValue})";
    });

WriteLine($"{clock.Elapsed:g}s: CREATED, Value: {computedState.Value}, Computed: {computedState.Computed}");
await computedState.Update(); // This ensures the very first value is computed
WriteLine($"{clock.Elapsed:g}s: UPDATED, Value: {computedState.Value}, Computed: {computedState.Computed}");

counters.Increment("a");
await Task.Delay(2000);
mutableState.Set("y");
await Task.Delay(2000);

/* The output – pay attention to timestamps:
0:00:00.0080204s: Invalidated, Value: <initial>, Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.st, State: Invalidated)
0:00:00.0126295s: Updating, Value: <initial>, Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.st, State: Invalidated)
0:00:00.0161148s: CREATED, Value: <initial>, Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.st, State: Invalidated)
0:00:00.1297889s: Updated, Value: (6, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.10t, State: Consistent)
0:00:00.1305231s: UPDATED, Value: (6, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.10t, State: Consistent)
Increment(a)
0:00:00.1308741s: Invalidated, Value: (6, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.10t, State: Invalidated)
0:00:01.1392269s: Updating, Value: (6, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.10t, State: Invalidated)
Get(a) = 7
0:00:01.2481635s: Updated, Value: (7, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.14t, State: Consistent)
0:00:02.1347489s: Invalidated, Value: (7, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.14t, State: Invalidated)
0:00:03.1433923s: Updating, Value: (7, x), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.14t, State: Invalidated)
0:00:03.2524918s: Updated, Value: (7, y), Computed: StateBoundComputed<String>(FuncComputedStateEx<String>-Hash=27401660 v.gq, State: Consistent)
*/
```
<!-- endSnippet -->

