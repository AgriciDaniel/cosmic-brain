# Observing Changes

This document covers patterns for observing and reacting to computed value changes, including
accessing the current computed value, watching for changes over time, and waiting for conditions.

## Computed.GetCurrent()

Inside a compute method, you can access the `Computed<T>` being created using `Computed.GetCurrent()`.
This is useful for:

- Scheduling automatic invalidation
- Attaching invalidation callbacks
- Accessing computed metadata

### Scheduled Invalidation

<!-- snippet: PartFPatterns_ScheduledInvalidation -->
```cs
[ComputeMethod]
public virtual async Task<DateTime> GetServerTime(CancellationToken ct = default)
{
    // Invalidate this computed after 1 second
    Computed.GetCurrent().Invalidate(TimeSpan.FromSeconds(1));
    return DateTime.UtcNow;
}
```
<!-- endSnippet -->

### Invalidation Callbacks

<!-- snippet: PartFPatterns_InvalidationCallbacks -->
```cs
[ComputeMethod]
public virtual async Task<Resource> GetResource(string key, CancellationToken ct = default)
{
    var computed = Computed.GetCurrent();

    // Register cleanup when this computed is invalidated
    computed.Invalidated += c => {
        Log.LogDebug("Resource {Key} computed was invalidated", key);
        // Release resources, cancel subscriptions, etc.
    };

    return await LoadResource(key, ct);
}
```
<!-- endSnippet -->

### Conditional Invalidation Delay

<!-- snippet: PartFPatterns_ConditionalInvalidationDelay -->
```cs
[ComputeMethod]
public virtual async Task<PeerState> GetPeerState(RpcPeerStub peer, CancellationToken ct = default)
{
    var computed = Computed.GetCurrent();
    var state = await peer.GetState(ct);

    // Different invalidation delays based on state
    var delay = state.IsConnected
        ? TimeSpan.FromSeconds(10)   // Poll less frequently when connected
        : TimeSpan.FromSeconds(1);   // Poll more frequently when disconnected

    computed.Invalidate(delay);
    return state;
}
```
<!-- endSnippet -->


## Computed.Changes()

The `Changes()` extension method creates an `IAsyncEnumerable<Computed<T>>` that yields:
1. The current computed value (immediately)
2. Each new computed value as changes occur

### Basic Usage

<!-- snippet: PartFPatterns_ChangesBasic -->
```cs
var computed = await Computed.Capture(() => example.GetData());

await foreach (var c in computed.Changes(cancellationToken)) {
    Console.WriteLine($"Value: {c.Value}");
}
```
<!-- endSnippet -->

### With Update Delayer

Control how quickly updates are processed:

<!-- snippet: PartFPatterns_ChangesWithDelayer -->
```cs
// Wait 1 second between updates
await foreach (var c in computed.Changes(FixedDelayer.Get(1), ct)) {
    ProcessValue(c.Value);
}
```
<!-- endSnippet -->

### Deconstruction Pattern

`Computed<T>` supports deconstruction to access `ValueOrDefault` and `Error` without throwing:

<!-- snippet: PartFPatterns_ChangesDeconstruction -->
```cs
await foreach (var (value, error) in computed.Changes(ct)) {
    if (error != null)
        HandleError(error);
    else
        DisplayValue(value);
}
```
<!-- endSnippet -->

### Creating RpcStream from Changes

Use `Changes()` to create real-time streams:

<!-- snippet: PartFPatterns_ChangesToRpcStream -->
```cs
public async Task<RpcStream<StockPrice>> WatchPrice(string symbol, CancellationToken ct = default)
{
    var computed = await Computed.Capture(() => GetPrice(symbol));

    var stream = computed.Changes(FixedDelayer.Get(0.5), ct)
        .Select(c => c.Value);

    return RpcStream.New(stream);
}
```
<!-- endSnippet -->

### Error Handling

<!-- snippet: PartFPatterns_ChangesErrorHandling -->
```cs
static async Task MonitorService(IServiceWithStatus service, ILogger _logger, CancellationToken ct)
{
    var computed = await Computed.Capture(() => service.GetStatus());

    await foreach (var c in computed.Changes(FixedDelayer.Get(5), ct)) {
        var (status, error) = c;

        if (error != null) {
            _logger.LogError(error, "Status check failed");
            // Continue watching - transient errors will retry automatically
            continue;
        }

        if (status.HasAlert)
            await NotifyOperators(status);
    }
}

static Task NotifyOperators(ServiceStatus status) => Task.CompletedTask;
```
<!-- endSnippet -->


## Computed.When()

Wait for a computed value to satisfy a condition:

<!-- snippet: PartFPatterns_WhenBasic -->
```cs
var computed = await Computed.Capture(() => counter.Get("a"));

// Wait until value reaches 10
computed = await computed.When(x => x >= 10, cancellationToken);
Console.WriteLine($"Reached: {computed.Value}");
```
<!-- endSnippet -->

With update delayer:

<!-- snippet: PartFPatterns_WhenWithDelayer -->
```cs
// Check every second
computed = await computed.When(
    x => x.Status == "Complete",
    FixedDelayer.Get(1),
    cancellationToken);
```
<!-- endSnippet -->


## Best Practices

1. **Dispose Changes() properly**: Use `CancellationToken` to stop the async enumerable
2. **Avoid long-running callbacks**: Invalidation callbacks should be fast; defer heavy work
3. **Consider update delayers**: Don't overwhelm consumers with too-frequent updates
