# Transiency Resolvers

`Transiency` classifies exceptions as transient (retryable) or terminal (non-retryable),
enabling intelligent retry policies throughout Fusion.

## Key Types

| Type | Description | Source |
|------|-------------|--------|
| `Transiency` | Exception classification result | [Transiency.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/Transiency.cs) |
| `TransiencyResolver` | Delegate that classifies an exception | [TransiencyResolver.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/TransiencyResolver.cs) |
| `TransiencyResolvers` | Built-in resolver implementations | [TransiencyResolvers.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/TransiencyResolvers.cs) |
| `RetryPolicy` | Configurable retry with backoff | [RetryPolicy.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/RetryPolicy.cs) |


## Why Transiency?

Not all errors should trigger retries:

| Error Type | Should Retry? | Example |
|------------|---------------|---------|
| Network timeout | Yes | `TimeoutException` |
| Connection reset | Yes | `SocketException` |
| Server overloaded | Yes | HTTP 503 |
| Invalid argument | No | `ArgumentException` |
| Not found | No | HTTP 404 |
| Authentication failed | No | HTTP 401 |

`TransiencyResolver` makes this classification automatic and consistent.


## Transiency Enum

```cs
public enum Transiency
{
    Unknown = 0,     // Treated as NonTransient
    Transient,       // Safe to retry
    SuperTransient,  // Transient error requiring infinite retries
    NonTransient,    // Permanent error — don't retry
    Terminal,        // Fatal error — stop the whole retry chain
}
```

| Value | Meaning | Typical Action |
|-------|---------|----------------|
| `Unknown` | Classification failed | Treated as `NonTransient` |
| `Transient` | Temporary error | Retry with backoff |
| `SuperTransient` | Very temporary | Retry indefinitely |
| `NonTransient` | Permanent error | Don't retry, report error |
| `Terminal` | Fatal error | Don't retry; also stop the enclosing retry chain |


## TransiencyResolver

`TransiencyResolver` is a delegate:

```cs
public delegate Transiency TransiencyResolver(Exception error);
```

### Basic Usage

```cs
TransiencyResolver resolver = TransiencyResolvers.PreferTransient;

try {
    await DoOperation();
}
catch (Exception ex) {
    var transiency = resolver.Invoke(ex);

    if (transiency.IsAnyTransient()) {
        // Retry the operation
        await Task.Delay(backoff);
        await DoOperation();
    }
    else {
        // Report permanent failure
        throw;
    }
}
```

### Built-in Resolvers

The built-in resolvers handle common transient exceptions:

```cs
// Built-in transient exceptions (recognized by all resolvers via CoreOnly):
// - ITerminalException → Terminal
// - ISuperTransientException → SuperTransient
// - ITransientException → Transient
// - TimeoutException → Transient
// - RetryPolicyTimeoutException → NonTransient

TransiencyResolver resolver = TransiencyResolvers.PreferTransient;
```

### Custom Resolver

```cs
// Add custom logic by assigning a lambda
TransiencyResolver customResolver = ex => ex switch {
    MyCustomException e => e.IsRetryable
        ? Transiency.Transient
        : Transiency.Terminal,
    _ => Transiency.Unknown  // Let the fallback decide
};
```

### Chaining Resolvers

Resolvers can be chained using the `.Or` extension — first non-`Unknown` result wins:

```cs
TransiencyResolver resolver = e =>
    (e is MyException me ? me.Transiency : Transiency.Unknown)
    .Or(e, TransiencyResolvers.PreferTransient);
```


## Built-in Resolvers

### TransiencyResolvers.PreferTransient

Assumes unknown exceptions are transient. Used by Fusion's `IComputed` by default:

```cs
var resolver = TransiencyResolvers.PreferTransient;
// Unknown → Transient
```

### TransiencyResolvers.PreferNonTransient

Assumes unknown exceptions are non-transient. Used by `OperationReprocessor` by default:

```cs
var resolver = TransiencyResolvers.PreferNonTransient;
// Unknown → NonTransient
```

### TransiencyResolvers.CoreOnly

Classifies only the core well-known exception types; returns `Unknown` for everything else:

```cs
var resolver = TransiencyResolvers.CoreOnly;
// Unknown → Unknown (caller decides the fallback)
```


## RetryPolicy

`RetryPolicy` is a record that combines `TransiencyResolver` with retry logic:

```cs
var policy = new RetryPolicy(
    TryCount: 5,
    Delays: RetryDelaySeq.Exp(1, 60)  // 1s → 60s exponential
) {
    TransiencyResolver = TransiencyResolvers.PreferTransient,
    RetryOn = ExceptionFilters.AnyNonTerminal,
};

// Execute with retry
await policy.Apply(async ct => {
    await DoOperationAsync(ct);
}, cancellationToken: cancellationToken);
```

### Retry Delay Sequences

```cs
// Exponential backoff: 1s, 2s, 4s, 8s, ... up to 60s
var exp = RetryDelaySeq.Exp(
    TimeSpan.FromSeconds(1),
    TimeSpan.FromSeconds(60)
);

// Fixed delay: always 5s
var fixed = RetryDelaySeq.Fixed(TimeSpan.FromSeconds(5));
```


## Usage in Fusion

### Operations Framework Reprocessing

The Operations Framework uses transiency to determine if failed operations should be reprocessed:

```cs
// In operation reprocessing
catch (Exception ex) {
    var transiency = transiencyResolver.Invoke(ex);
    if (transiency.IsAnyTransient()) {
        // Mark for reprocessing
        await ScheduleReprocess(operation);
    }
    else {
        // Log permanent failure
        Log.Error(ex, "Operation failed permanently");
    }
}
```

See [Operations Framework Reprocessing](./PartO-RP.md) for details.

### RPC Connection Handling

RPC uses transiency for reconnection decisions:

```cs
// Connection error handling
catch (Exception ex) {
    var transiency = transiencyResolver.Invoke(ex);
    if (transiency.IsAnyTransient()) {
        // Attempt reconnection with backoff
        await ReconnectWithBackoff();
    }
    else {
        // Connection permanently failed
        await NotifyConnectionLost();
    }
}
```

### DbEntityResolver

`DbEntityResolver` uses a `RetryPolicy` internally for query retry on transient database errors.


## Common Patterns

### Service Method with Retry

```cs
public async Task<Data> FetchDataAsync(CancellationToken ct)
{
    var policy = new RetryPolicy(3, RetryDelaySeq.Exp(0.5, 10)) {
        TransiencyResolver = _transiencyResolver,
    };

    return await policy.Apply(async innerCt => {
        return await _httpClient.GetFromJsonAsync<Data>(url, innerCt);
    }, cancellationToken: ct);
}
```

### Custom Exception Classification

```cs
// Mark your exceptions as transient/terminal
public class RateLimitedException : Exception
{
    public TimeSpan RetryAfter { get; }
}

// Register resolver
services.AddSingleton<TransiencyResolver>(sp => {
    TransiencyResolver custom = ex => ex switch {
        RateLimitedException => Transiency.Transient,
        AuthenticationException => Transiency.Terminal,
        _ => Transiency.Unknown
    };
    return e => custom.Invoke(e).Or(e, TransiencyResolvers.PreferTransient);
});
```

### Logging Transient vs Terminal Errors

```cs
catch (Exception ex) {
    var transiency = _transiencyResolver.Invoke(ex);

    if (transiency.IsAnyTransient()) {
        _log.LogWarning(ex, "Transient error, will retry");
    }
    else {
        _log.LogError(ex, "Permanent error");
        throw;
    }
}
```


## Best Practices

### Default to NonTransient for Unknown

```cs
// Good: Safer default — unknown errors won't trigger unwanted retries
var resolver = TransiencyResolvers.PreferNonTransient;

// Risky: May retry non-retryable operations
var resolver = TransiencyResolvers.PreferTransient;
```

### Classify Your Exceptions

```cs
// Good: Explicit classification
public class MyServiceException : Exception
{
    public bool IsTransient { get; init; }
}

// Create a resolver as a lambda
TransiencyResolver myResolver = ex =>
    ex is MyServiceException mse
        ? mse.IsTransient ? Transiency.Transient : Transiency.Terminal
        : Transiency.Unknown;
```

### Use Appropriate Backoff

```cs
// Good: Exponential backoff with reasonable bounds
RetryDelaySeq.Exp(
    TimeSpan.FromMilliseconds(100),  // Start small
    TimeSpan.FromSeconds(30)          // Don't wait too long
)

// Bad: Immediate retry (may overwhelm failing service)
RetryDelaySeq.Fixed(TimeSpan.Zero)
```
