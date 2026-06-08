# AsyncChain

`AsyncChain` provides composable async operation pipelines with built-in retry, logging, and error handling.

## Key Types

| Type | Description | Source |
|------|-------------|--------|
| `AsyncChain` | Composable async operation chain | [AsyncChain.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/AsyncChain.cs) |
| `AsyncChainExt` | Extension methods for building chains | [AsyncChainExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/AsyncChainExt.cs) |


## Overview

AsyncChain lets you build resilient async workflows:

```cs
var chain = new AsyncChain("ProcessData", async ct => {
    await FetchData(ct);
    await ProcessData(ct);
    await SaveResults(ct);
})
.RetryForever(RetryDelaySeq.Exp(1, 60))
.Log(LogLevel.Information, log);

await chain.Run(cancellationToken);
```

**Key features:**
- **Composable**: Chain operations together
- **Retry policies**: Built-in exponential backoff
- **Logging**: Automatic start/complete/error logging
- **Cancellation**: Proper cancellation token support
- **Naming**: Chains have names for debugging


## Creating Chains

### From Delegate

```cs
// Simple chain
var chain = new AsyncChain("MyOperation", async ct => {
    await DoSomethingAsync(ct);
});

// With name only (for composition)
var named = new AsyncChain("Parent");
```

### From Existing Chain

```cs
// Wrap another chain with new name
var wrapped = new AsyncChain("Wrapped", existingChain);
```


## Running Chains

### Basic Run

```cs
var chain = new AsyncChain("Work", DoWorkAsync);

// Run to completion
await chain.Run(cancellationToken);
```

### Run with Return Value

Chains don't return values directly, but you can capture results:

```cs
Data? result = null;
var chain = new AsyncChain("FetchData", async ct => {
    result = await FetchDataAsync(ct);
});

await chain.Run(cancellationToken);
// result is now populated
```


## Retry Policies

### Retry Forever

```cs
var chain = new AsyncChain("Resilient", DoWorkAsync)
    .RetryForever(RetryDelaySeq.Exp(
        TimeSpan.FromSeconds(1),   // Initial delay
        TimeSpan.FromSeconds(60)   // Max delay
    ));
```

### Retry with Limit

```cs
var chain = new AsyncChain("Limited", DoWorkAsync)
    .Retry(
        maxRetryCount: 5,
        RetryDelaySeq.Exp(1, 30)
    );
```

### Custom Retry Logic

```cs
var chain = new AsyncChain("Custom", DoWorkAsync)
    .Retry(
        retryDelays: RetryDelaySeq.Exp(1, 60),
        shouldRetry: (exception, attempt) => {
            // Only retry transient errors
            return exception is HttpRequestException && attempt < 10;
        }
    );
```


## Logging

### Basic Logging

```cs
var chain = new AsyncChain("MyTask", DoWorkAsync)
    .Log(LogLevel.Information, logger);

// Logs:
// [Information] MyTask: started
// [Information] MyTask: completed (took 1.234s)
// Or on error:
// [Error] MyTask: failed (took 0.567s) - Exception details...
```

### Custom Log Levels

```cs
var chain = new AsyncChain("Background", DoWorkAsync)
    .Log(
        runningLogLevel: LogLevel.Debug,      // "started" message
        completedLogLevel: LogLevel.Debug,    // "completed" message
        errorLogLevel: LogLevel.Warning,      // "failed" message
        logger
    );
```


## Composition

### Sequential Chains

```cs
var step1 = new AsyncChain("Step1", FetchAsync);
var step2 = new AsyncChain("Step2", ProcessAsync);
var step3 = new AsyncChain("Step3", SaveAsync);

var pipeline = step1
    .Append(step2)
    .Append(step3);

await pipeline.Run(ct);
```

### Wrapping with Behavior

```cs
var core = new AsyncChain("CoreLogic", DoWorkAsync);

var resilient = new AsyncChain("ResilientCore", core)
    .RetryForever(RetryDelaySeq.Exp(1, 60))
    .Log(LogLevel.Information, logger);
```


## Common Patterns

### Background Worker

```cs
public class DataSyncWorker : IHostedService
{
    private readonly AsyncChain _syncChain;
    private Task? _runTask;
    private CancellationTokenSource? _cts;

    public DataSyncWorker(ILogger<DataSyncWorker> logger)
    {
        _syncChain = new AsyncChain("DataSync", SyncDataAsync)
            .RetryForever(RetryDelaySeq.Exp(5, 300))
            .Log(LogLevel.Information, logger);
    }

    public Task StartAsync(CancellationToken ct)
    {
        _cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        _runTask = _syncChain.Run(_cts.Token);
        return Task.CompletedTask;
    }

    public async Task StopAsync(CancellationToken ct)
    {
        _cts?.Cancel();
        if (_runTask != null)
            await _runTask.SuppressCancellation();
    }

    private async Task SyncDataAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested) {
            await FetchAndSyncData(ct);
            await Task.Delay(TimeSpan.FromMinutes(1), ct);
        }
    }
}
```

### Resilient HTTP Client

```cs
public async Task<Response> FetchWithRetry(string url, CancellationToken ct)
{
    Response? response = null;

    var chain = new AsyncChain($"Fetch({url})", async innerCt => {
        response = await _httpClient.GetAsync(url, innerCt);
    })
    .Retry(3, RetryDelaySeq.Exp(0.5, 10))
    .Log(LogLevel.Debug, _logger);

    await chain.Run(ct);
    return response!;
}
```

### Multi-Step Pipeline

```cs
var pipeline = new AsyncChain("ImportPipeline")
    .Append(new AsyncChain("Download", DownloadFileAsync)
        .Retry(3, RetryDelaySeq.Exp(1, 30)))
    .Append(new AsyncChain("Validate", ValidateFileAsync))
    .Append(new AsyncChain("Import", ImportDataAsync)
        .Retry(2, RetryDelaySeq.Exp(5, 60)))
    .Append(new AsyncChain("Cleanup", CleanupAsync))
    .Log(LogLevel.Information, _logger);

await pipeline.Run(ct);
```


## Integration with Fusion

AsyncChain is used internally by Fusion for:

- **RPC connection management**: Reconnection with exponential backoff
- **Background workers**: Log watchers, operation processors
- **Heartbeat loops**: Connection keep-alive

Example from RPC:

```cs
var connectChain = new AsyncChain($"Connect({peer})", ConnectAsync)
    .RetryForever(RetryDelaySeq.Exp(0.5, 30))
    .Log(LogLevel.Debug, Log);
```


## Best Practices

### Name Your Chains

```cs
// Good: Descriptive name for logs
var chain = new AsyncChain("SyncUserData", SyncAsync);

// Bad: Generic name
var chain = new AsyncChain("Work", SyncAsync);
```

### Use Appropriate Retry Delays

```cs
// Good: Start small, grow to reasonable max
.RetryForever(RetryDelaySeq.Exp(
    TimeSpan.FromSeconds(1),   // Start with 1s
    TimeSpan.FromMinutes(5)    // Cap at 5 min
))

// Bad: Too aggressive
.RetryForever(RetryDelaySeq.Exp(0.1, 0.5))  // Hammers failing service
```

### Handle Cancellation Gracefully

```cs
var chain = new AsyncChain("Graceful", async ct => {
    while (!ct.IsCancellationRequested) {
        await ProcessBatch(ct);
        await Task.Delay(interval, ct);
    }
});
```
