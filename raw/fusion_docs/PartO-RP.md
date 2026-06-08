# Operations Framework: Reprocessing

**Operation Reprocessing** automatically retries commands that fail with transient errors.
This is essential for handling temporary failures like:
- Database connection issues
- Deadlocks
- Network timeouts
- Concurrent modification conflicts


## Enabling Reprocessing

<!-- snippet: PartORP_EnableReprocessor -->
```cs
var fusion = services.AddFusion();
fusion.AddOperationReprocessor();  // Enable operation reprocessing
```
<!-- endSnippet -->


## How It Works

1. Command execution starts
2. If a transient error occurs, `OperationReprocessor` catches it
3. Checks if retry is allowed (filter, retry count, error type)
4. If allowed, waits for delay and retries the command
5. Repeats until success or max retries exceeded

<img src="/img/diagrams/PartO-RP-1.svg" alt="How It Works" style="width: 100%; max-width: 800px;" />


## Configuration Options

<!-- snippet: PartORP_Configuration -->
```cs
fusion.AddOperationReprocessor(_ => new() {
    MaxRetryCount = 3,  // Default: 3
    RetryDelays = RetryDelaySeq.Exp(0.50, 3, 0.33),  // Exponential backoff
    Filter = (command, context) => true,  // custom filter
});
```
<!-- endSnippet -->

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MaxRetryCount` | `int` | 3 | Maximum retry attempts |
| `RetryDelays` | `RetryDelaySeq` | Exp(0.50, 3, 0.33) | Delay sequence between retries |
| `DelayClock` | `MomentClock?` | `null` | Custom clock for delays |
| `Filter` | `Func<ICommand, CommandContext, bool>` | `DefaultFilter` | Custom retry filter |


## Retry Delays

The default retry delays use exponential backoff:

<!-- snippet: PartORP_RetryDelays -->
```cs
// RetryDelaySeq.Exp(0.50, 3, 0.33)
// Base: 0.5 seconds
// Max multiplier: 3x
// Jitter: ±33%
//
// Produces delays approximately:
// Retry 1: ~0.5s (0.33s - 0.67s)
// Retry 2: ~1.65s (1.1s - 2.2s)
// Retry 3: ~5.45s (3.6s - 7.3s)
var delays = RetryDelaySeq.Exp(0.50, 3, 0.33);
_ = delays;
```
<!-- endSnippet -->


## Default Filter

The default filter determines which commands can be retried:

<!-- snippet: PartORP_DefaultFilter -->
```cs
public static bool DefaultFilter(ICommand command, CommandContext context)
{
    // Only on server
    if (!RuntimeInfo.IsServer)
        return false;

    // Skip delegating commands (proxies)
    if (command is IDelegatingCommand)
        return false;

    // Skip scoped Commander commands (UI commands)
    if (context.Commander.Services.IsScoped())
        return false;

    // Only root-level commands
    return true;
}
```
<!-- endSnippet -->


## Filtering Conditions

A command is eligible for reprocessing when **all** of these are true.

**Pipeline preconditions** (checked by `OperationReprocessor.OnCommand` before the filter runs):

1. It is the outermost command (`context.IsOutermost`) — nested commands are not retried
2. It is not an `ISystemCommand`
3. No `Operation` has started yet (`context.TryGetOperation() is null`)
4. No `Invalidation` is active
5. The error is classified as transient and the retry count hasn't exceeded `MaxRetryCount`

**Default filter conditions** (`OperationReprocessor.Options.DefaultFilter`):

6. Running on the server (`RuntimeInfo.IsServer`)
7. Not an `IDelegatingCommand` (proxy/delegating commands are skipped)
8. Not running from a scoped `Commander` instance (i.e., not a UI command)


## Transient Error Detection

The reprocessor uses `TransiencyResolver<IOperationReprocessor>` to classify errors.
See [Transiency documentation](./PartCore-Transiency.md) for details on how exception classification works.

| Error Type | Transiency |
|------------|------------|
| `ITransientException` | Transient |
| `DbUpdateConcurrencyException` | Transient |
| `SocketException` | Transient |
| `TimeoutException` | Transient |
| Other exceptions | Non-transient (no retry) |


## Super-Transient Errors

Some errors are classified as **super-transient**, meaning they can retry indefinitely
(ignoring `MaxRetryCount`):

<!-- snippet: PartORP_SuperTransient -->
```cs
// Super-transient errors retry without limit
if (transiency == Transiency.SuperTransient)
    return true;  // Always retry
```
<!-- endSnippet -->

This is useful for errors like:
- Connection pool exhausted (will resolve when connections free up)
- Service temporarily unavailable


## Custom Transiency Detection

Register custom error classifiers:

<!-- snippet: PartORP_CustomTransiencyResolver -->
```cs
// Register: services.AddSingleton<TransiencyResolver<IOperationReprocessor>>(
//     _ => MyTransiencyResolver.Resolve);
public static class MyTransiencyResolver
{
    public static Transiency Resolve(Exception error)
    {
        if (error is MyCustomRetryableException)
            return Transiency.Transient;

        if (error is MyRateLimitException)
            return Transiency.SuperTransient;  // Retry indefinitely

        return Transiency.Unknown;  // Fall through to other resolvers
    }
}
```
<!-- endSnippet -->


## Context Reset on Retry

When a command is retried, the execution context is reset:

- New `CommandContext` created
- Previous `Operation` discarded
- `Items` collections cleared
- New execution ID assigned

This ensures each retry attempt starts fresh.


## Logging

Reprocessing logs warnings for retries:

```
[WRN] OperationReprocessor: Reprocessing MyCommand after 500ms delay (attempt 1/3)
```


## Best Practices

1. **Keep commands idempotent** &ndash; Retries may execute the same logic multiple times
2. **Use appropriate retry counts** &ndash; Too many retries delay failure reporting
3. **Consider error types** &ndash; Not all errors should be retried
4. **Log retry context** &ndash; Include relevant information for debugging
5. **Set reasonable delays** &ndash; Give systems time to recover


## Example: Custom Retry Policy

<!-- snippet: PartORP_CustomRetryPolicy -->
```cs
fusion.AddOperationReprocessor(_ => new() {
    MaxRetryCount = 5,
    RetryDelays = RetryDelaySeq.Exp(
        TimeSpan.FromSeconds(1),     // Base delay
        TimeSpan.FromSeconds(30)),   // Max delay
    Filter = (command, context) => {
        // Don't retry admin commands
        if (command is IAdminCommand)
            return false;

        // Don't retry commands from specific users
        if (command is IUserCommand userCmd && userCmd.UserId == SpecialUsers.SpecialUserId)
            return false;

        return OperationReprocessor.Options.DefaultFilter(command, context);
    },
});
```
<!-- endSnippet -->
