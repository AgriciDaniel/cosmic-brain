using System.Diagnostics;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartF;

#region PartF_Declare_Service
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
#endregion

// Helper class to hold snippet that shows invalidation semantics
public static class InvalidationSemanticsDemo
{
    public static void Example()
    {
        #region PartF_Invalidation_Semantics
        using (Invalidation.Begin())  {
            // Any call to a compute method here:
            // - Won't execute the body of the compute method
            // - Will complete synchronously by returning a completed (Value)Task<T> with Result = default(T)
            // - Will invalidate the cached Computed<T> instance (if it exists) corresponding to the call
        }
        #endregion
    }
}

// ============================================================================
// PartF-CO.md snippets: ComputedOptions configuration examples
// ============================================================================

// Dummy types for snippet compilation
public record UserProfile;
public record User;
public record Data;
public record Stats;
public record Price;
public record Summary;
public record Product;

public interface IPartFCO_BasicAttribute : IComputeService
{
    #region PartFCO_BasicAttribute
    [ComputeMethod(MinCacheDuration = 10, AutoInvalidationDelay = 60)]
    Task<UserProfile> GetProfile(string userId);
    #endregion
}

public interface IPartFCO_DefaultAndInfinite : IComputeService
{
    #region PartFCO_DefaultAndInfinite
    // These are equivalent:
    [ComputeMethod(MinCacheDuration = double.NaN)]
    Task<Data> GetData1();
    [ComputeMethod] // MinCacheDuration not specified = use default
    Task<Data> GetData2();

    // Explicitly disable auto-invalidation:
    [ComputeMethod(AutoInvalidationDelay = double.PositiveInfinity)]
    Task<Data> GetData3();
    #endregion
}

public interface IPartFCO_MinCacheDuration : IComputeService
{
    #region PartFCO_MinCacheDuration
    [ComputeMethod(MinCacheDuration = 60)] // Keep in memory for at least 60 seconds
    Task<User> Get(string id);
    #endregion
}

public interface IPartFCO_TransientErrorDelay : IComputeService
{
    #region PartFCO_TransientErrorDelay
    [ComputeMethod(TransientErrorInvalidationDelay = 5)] // Retry after 5 seconds
    Task<Data> FetchFromExternalApi();
    #endregion
}

public interface IPartFCO_AutoInvalidationDelay : IComputeService
{
    #region PartFCO_AutoInvalidationDelay
    [ComputeMethod(AutoInvalidationDelay = 30)] // Auto-refresh every 30 seconds
    Task<DateTime> GetServerTime();
    #endregion
}

public interface IPartFCO_InvalidationDelay : IComputeService
{
    #region PartFCO_InvalidationDelay
    [ComputeMethod(InvalidationDelay = 0.5)] // Debounce invalidations by 500ms
    Task<Summary> GetSummary();
    #endregion
}

public interface IPartFCO_ConsolidationDelay : IComputeService
{
    #region PartFCO_ConsolidationDelay
    [ComputeMethod(ConsolidationDelay = 0)] // Invalidate only when value changes
    Task<int> GetUnreadCount(string placeId);

    [ComputeMethod(ConsolidationDelay = 0.5)] // Wait 500ms before checking for value changes
    Task<Summary> GetSummary();
    #endregion
}

public interface IPartFCO_CombiningOptions : IComputeService
{
    #region PartFCO_CombiningOptions
    // Long-lived cache with automatic refresh
    [ComputeMethod(
        MinCacheDuration = 300,        // Keep in memory 5 minutes
        AutoInvalidationDelay = 60)]   // But refresh every minute
    Task<Stats> GetDashboardStats();

    // Resilient external call with debouncing
    [ComputeMethod(
        TransientErrorInvalidationDelay = 10,  // Retry errors after 10s
        InvalidationDelay = 1)]                 // Debounce updates by 1s
    Task<Price> GetExternalPrice(string symbol);

    // Aggregation that should only invalidate when value changes
    [ComputeMethod(
        MinCacheDuration = 60,
        ConsolidationDelay = 0)]      // Invalidate only on actual value change
    Task<int> GetTotalUnreadCount();
    #endregion
}

public static class PartFCO_ChangingDefaultsDemo
{
    public static void Example()
    {
        #region PartFCO_ChangingDefaults
        ComputedOptions.Default = ComputedOptions.Default with {
            MinCacheDuration = TimeSpan.FromSeconds(30),
        };
        #endregion
    }
}

public interface IPartFCO_RemoteComputeMethod : IComputeService
{
    #region PartFCO_RemoteComputeMethod
    [RemoteComputeMethod(CacheMode = RemoteComputedCacheMode.Cache)]
    Task<Product> Get(string id);
    #endregion
}

// ============================================================================
// PartF-CS.md snippets: Cheat Sheet examples
// ============================================================================

// Dummy types for cheat sheet snippets
public record Order;

#region PartFCS_Interface
public interface ICartService : IComputeService
{
    [ComputeMethod]
    Task<List<Order>> GetOrders(long cartId, CancellationToken cancellationToken = default);
}
#endregion

#region PartFCS_Implementation
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
#endregion

// Extended service interface with all methods needed by snippets
public interface ICheatSheetService : IComputeService
{
    [ComputeMethod] Task<Data> GetData(long id, CancellationToken cancellationToken = default);
    [ComputeMethod] Task<Data> GetData(CancellationToken cancellationToken = default);
    [ComputeMethod] Task<string> GetValue(long id, CancellationToken cancellationToken = default);
    [ComputeMethod] Task<int> GetCount(long id, CancellationToken cancellationToken = default);
}

public class AllOptionsExample : IComputeService
{
    #region PartFCS_AllOptions
    [ComputeMethod(
        MinCacheDuration = 60,              // Keep in memory for 60 seconds
        AutoInvalidationDelay = 300,        // Auto-refresh every 5 minutes
        TransientErrorInvalidationDelay = 5, // Retry errors after 5 seconds
        InvalidationDelay = 0.5,            // Debounce invalidations by 500ms
        ConsolidationDelay = 0)]            // Invalidate only when value changes
    public virtual async Task<Data> GetData() { return default!; }
    #endregion
}

public static class PartFCS_Snippets
{
    public static void ConfigurationSnippets(IServiceCollection services)
    {
        #region PartFCS_RegisterServices
        var fusion = services.AddFusion();
        fusion.AddService<ICartService, CartService>();
        // or: fusion.AddComputeService<CartService>();
        #endregion
    }

    public static void ChangeDefaults()
    {
        #region PartFCS_ChangeDefaults
        ComputedOptions.Default = ComputedOptions.Default with {
            MinCacheDuration = TimeSpan.FromSeconds(30),
        };
        #endregion
    }

    public static void ConfigureTracking()
    {
        #region PartFCS_ConfigureTracking
        Invalidation.TrackingMode = InvalidationTrackingMode.WholeChain;
        #endregion
    }

    public static void InvalidationSnippets(ICartService service, long cartId)
    {
        #region PartFCS_InvalidationBlock
        using (Invalidation.Begin()) {
            _ = service.GetOrders(cartId, default);
        }
        #endregion
    }

    public static void InvalidateComputed(Computed<Data> computed)
    {
        #region PartFCS_InvalidateComputed
        computed.Invalidate();
        computed.Invalidate(TimeSpan.FromSeconds(30));  // Delayed
        computed.Invalidate(new InvalidationSource("reason"));  // With source
        #endregion
    }

    public static async Task CaptureSnippets(ICheatSheetService service, long id, CancellationToken cancellationToken)
    {
        #region PartFCS_Capture
        var computed1 = await Computed.Capture(() => service.GetData(id, cancellationToken));
        var computed2 = await Computed.TryCapture(() => service.GetData(id, default));  // Returns null on failure
        #endregion
    }

    public static void GetExistingSnippet(ICheatSheetService service, long id)
    {
        #region PartFCS_GetExisting
        var existing = Computed.GetExisting(() => service.GetData(id, default));
        #endregion
    }

    public static void GetCurrentSnippet()
    {
        #region PartFCS_GetCurrent
        var computed = Computed.GetCurrent();
        var computedTyped = Computed.GetCurrent<Data>();  // Typed, throws if null
        #endregion
    }

    public static void CheckConsistency(Computed<Data> computed)
    {
        #region PartFCS_CheckConsistency
        if (computed.IsConsistent()) { /* ... */ }
        if (computed.IsInvalidated()) { /* ... */ }
        #endregion
    }

    public static async Task UpdateSnippet(Computed<Data> computed, CancellationToken cancellationToken)
    {
        #region PartFCS_Update
        var newComputed = await computed.Update(cancellationToken);
        #endregion
    }

    public static async Task UseSnippet(Computed<Data> computed, CancellationToken cancellationToken)
    {
        #region PartFCS_Use
        Data value1 = await computed.Use(cancellationToken);
        Data value2 = await computed.Use(allowInconsistent: true, cancellationToken);  // Allow stale
        #endregion
    }

    public static async Task WhenInvalidatedSnippet(Computed<Data> computed, CancellationToken cancellationToken)
    {
        #region PartFCS_WhenInvalidated
        await computed.WhenInvalidated(cancellationToken);
        computed.Invalidated += c => Console.WriteLine("Invalidated!");
        #endregion
    }

    public static async Task WhenSnippet(ICheatSheetService service, long id, CancellationToken cancellationToken)
    {
        #region PartFCS_When
        var computed = await Computed.Capture(() => service.GetCount(id, cancellationToken));
        computed = await computed.When(count => count >= 10, cancellationToken);
        #endregion
    }

    public static async Task ChangesSnippet(ICheatSheetService service, long id, CancellationToken cancellationToken)
    {
        #region PartFCS_Changes
        var computed = await Computed.Capture(() => service.GetValue(id, cancellationToken));
        await foreach (var c in computed.Changes(cancellationToken)) {
            Console.WriteLine($"New value: {c.Value}");
        }
        #endregion
    }

    public static void DeconstructSnippet(Computed<Data> computed)
    {
        #region PartFCS_Deconstruct
        var (value, error) = computed;
        #endregion
    }

    public static void IsolationSnippet()
    {
        #region PartFCS_Isolation
        using (Computed.BeginIsolation()) {
            // Calls here won't register as dependencies
        }
        #endregion
    }

    public static async Task RegistrySnippets()
    {
        #region PartFCS_Registry
        ComputedRegistry.InvalidateEverything();  // Useful for tests
        await ComputedRegistry.Prune();           // Force prune dead entries
        #endregion
    }

    public static void StateFactorySnippet(IServiceProvider services)
    {
        #region PartFCS_StateFactory
        var stateFactory = services.StateFactory();
        // or: StateFactory.Default (for tests)
        #endregion
    }

    public static async Task MutableStateSnippet(StateFactory stateFactory, CancellationToken cancellationToken)
    {
        #region PartFCS_MutableState
        var state = stateFactory.NewMutable<int>(initialValue: 0);

        state.Set(42);           // Set value
        state.Value = 42;        // Same as above
        var value1 = state.Value; // Read value
        var value2 = await state.Use(cancellationToken); // Use in compute methods
        #endregion
    }

    public static async Task ComputedStateSnippet(StateFactory stateFactory, ICheatSheetService service)
    {
        #region PartFCS_ComputedState
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
        #endregion
    }

    public static void StatePropertiesSnippet(MutableState<Data> state)
    {
        #region PartFCS_StateProperties
        var computed = state.Computed;           // Current Computed<T>
        var snapshot = state.Snapshot;           // Immutable snapshot
        var lastGood = state.LastNonErrorValue;  // Last value before error
        #endregion
    }

    public static void DelayersSnippet()
    {
        #region PartFCS_Delayers
        var d1 = FixedDelayer.Get(1);    // 1 second delay
        var d2 = FixedDelayer.Get(0.5);  // 500ms delay
        var d3 = FixedDelayer.NextTick;  // ~16ms delay
        var d4 = FixedDelayer.MinDelay;  // Minimum safe delay (32ms)
        #endregion
    }

    public static void StateEventsSnippet(MutableState<Data> state)
    {
        #region PartFCS_StateEvents
        state.Invalidated += (s, kind) => { /* ... */ };
        state.Updating += (s, kind) => { /* ... */ };
        state.Updated += (s, kind) => { /* ... */ };
        #endregion
    }
}

public class PartF : DocPart
{
    public override async Task Run()
    {
        #region PartF_Register_Services
        var services = new ServiceCollection();
        var fusion = services.AddFusion(); // You can also use services.AddFusion(fusion => ...) pattern
        fusion.AddComputeService<CounterService>();
        var sp = services.BuildServiceProvider();

        // And that's how we get our first compute service:
        var counters = sp.GetRequiredService<CounterService>();
        #endregion

        {
            StartSnippetOutput("Automatic Caching");
            #region PartF_Automatic_Caching
            await counters.Get("a"); // Prints: Get(a) = 0
            await counters.Get("a"); // Prints nothing -- it's a cache hit; the result is 0
            #endregion
        }

        {
            StartSnippetOutput("Automatic Dependency Tracking");
            #region PartF_Automatic_Dependency_Tracking
            await counters.Sum("a", "b"); // Prints: Get(b) = 0, Sum(a, b) = 0 -- Get(b) was called from Sum(a, b)
            await counters.Sum("a", "b"); // Prints nothing -- it's a cache hit; the result is 0
            await counters.Get("b");      // Prints nothing -- it's a cache hit; the result is 0
            #endregion
        }

        {
            StartSnippetOutput("Invalidation");
            #region PartF_Invalidation
            counters.Increment("a"); // Prints: Increment(a) + invalidates Get(a) call result
            await counters.Get("a"); // Prints: Get(a) = 1
            await counters.Get("b"); // Prints nothing -- Get(b) call wasn't invalidated, so it's a cache hit
            #endregion
        }

        {
            StartSnippetOutput("Cascading Invalidation");
            #region PartF_Cascading_Invalidation
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
            #endregion

            StartSnippetOutput("Accessing Computed Values");
            #region PartF_Accessing_Computed_Values
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
            #endregion
        }

        {
            StartSnippetOutput("Reactive updates");
            #region PartF_Reactive_Updates
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
            #endregion
        }

        {
            StartSnippetOutput("Computed<T>.When() and .Changes() methods");
            #region PartF_When_And_Changes_Methods
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
            #endregion
        }

        {
            StartSnippetOutput("MutableState");
            #region PartF_MutableState
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
            #endregion
        }

        {
            StartSnippetOutput("ComputedState");
            #region PartF_ComputedState
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

            #endregion
        }
    }
}
