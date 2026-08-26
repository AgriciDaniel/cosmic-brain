# Operations Framework: Configuration Options

This document provides a complete reference for all Operations Framework configuration options.

## Setup Overview

Operations Framework is configured through `AddDbContextServices` and `AddOperations`:

```cs
services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        // Configuration goes here
        operations.ConfigureOperationLogReader(_ => new() { /* ... */ });
        operations.ConfigureOperationLogTrimmer(_ => new() { /* ... */ });
        operations.ConfigureOperationScope(_ => new() { /* ... */ });
        operations.ConfigureEventLogReader(_ => new() { /* ... */ });
        operations.ConfigureEventLogTrimmer(_ => new() { /* ... */ });

        // Add a log watcher
        operations.AddFileSystemOperationLogWatcher();
        // Or: operations.AddNpgsqlOperationLogWatcher();
        // Or: operations.AddRedisOperationLogWatcher();
    });
});

// Operation reprocessing (separate from DbContext)
var fusion = services.AddFusion();
fusion.AddOperationReprocessor(_ => new() { /* ... */ });
```

## DbOperationLogReader Options

Controls how the operation log is read and processed.

```cs
operations.ConfigureOperationLogReader(_ => new() {
    StartOffset = TimeSpan.FromSeconds(3),
    CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
    BatchSize = 64,
    ConcurrencyLevel = Environment.ProcessorCount * 4,
    ReprocessDelay = TimeSpan.FromSeconds(0.1).ToRandom(0.1),
    RetryDelays = RetryDelaySeq.Exp(0.25, 5),
    LogLevel = LogLevel.Information,
    IsTracingEnabled = false,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `StartOffset` | `TimeSpan` | 3 seconds | On startup, process operations logged within this time window |
| `CheckPeriod` | `RandomTimeSpan` | 5s ± 0.5s | How often to check for new operations (unconditional wake-up) |
| `BatchSize` | `int` | 64 | Maximum operations processed per batch |
| `ConcurrencyLevel` | `int` | 4 × CPU count | Number of concurrent operation processors |
| `ReprocessDelay` | `RandomTimeSpan` | 100ms ± 100ms | Delay before reprocessing a failed item |
| `ReprocessPolicy` | `IRetryPolicy` | 5 retries, 30s timeout | Policy for reprocessing failed operations |
| `RetryDelays` | `RetryDelaySeq` | Exp(0.25s, 5×) | Delays between read retries on error |
| `LogLevel` | `LogLevel` | Information | Logging verbosity |
| `IsTracingEnabled` | `bool` | false | Enable Activity tracing |

### StartOffset Explained

On service startup, `StartOffset` determines how far back to look for unprocessed operations:

<img src="/img/diagrams/PartO-CO-1.svg" alt="StartOffset Explained" style="width: 100%; max-width: 800px;" />

Operations older than `StartOffset` from startup time are ignored. This prevents
processing very old operations on service restart while ensuring recent ones aren't missed.

### CheckPeriod and Watchers

`CheckPeriod` is the **unconditional** wake-up interval. When using a log watcher,
the reader wakes up immediately on notifications, so you can set a longer `CheckPeriod`:

```cs
// With file system watcher: notifications are reliable
operations.ConfigureOperationLogReader(_ => new() {
    CheckPeriod = TimeSpan.FromSeconds(60).ToRandom(0.05),
});

// Without watcher: rely on polling only
operations.ConfigureOperationLogReader(_ => new() {
    CheckPeriod = TimeSpan.FromMilliseconds(250).ToRandom(0.1),
});
```

## DbOperationLogTrimmer Options

Controls cleanup of old operations from the log.

```cs
operations.ConfigureOperationLogTrimmer(_ => new() {
    MaxEntryAge = TimeSpan.FromMinutes(30),
    BatchSize = 4096,  // .NET 7+: 4096, .NET 6: 1024
    CheckPeriod = TimeSpan.FromMinutes(15).ToRandom(0.25),
    RetryDelays = RetryDelaySeq.Exp(
        TimeSpan.FromSeconds(15),
        TimeSpan.FromMinutes(10)),
    StatisticsPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
    LogLevel = LogLevel.Information,
    IsTracingEnabled = false,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MaxEntryAge` | `TimeSpan` | **30 minutes** | Operations older than this are trimmed |
| `BatchSize` | `int` | 4096 (.NET 7+) | Operations deleted per batch |
| `CheckPeriod` | `RandomTimeSpan` | 15min ± 3.75min | How often to run trimming |
| `RetryDelays` | `RetryDelaySeq` | 15s to 10min exp | Delays on trim failures |
| `StatisticsPeriod` | `RandomTimeSpan` | 1hr ± 6min | How often to log statistics |
| `LogLevel` | `LogLevel` | Information | Logging verbosity |
| `IsTracingEnabled` | `bool` | false | Enable Activity tracing |

### Trimming Condition

Operations are trimmed when:
```sql
LoggedAt < (NOW - MaxEntryAge)
```

**Note**: `MaxEntryAge` should be longer than:
- Maximum expected operation processing time
- Maximum clock skew between servers
- Time needed for all hosts to read the operation

## DbOperationScope Options

Controls the database transaction behavior for operations.

```cs
operations.ConfigureOperationScope(_ => new() {
    IsolationLevel = IsolationLevel.ReadCommitted,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `IsolationLevel` | `IsolationLevel` | Unspecified | Transaction isolation level |

### Isolation Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `Unspecified` | Database default | Most applications |
| `ReadCommitted` | Prevents dirty reads | General use |
| `RepeatableRead` | Prevents non-repeatable reads | When re-reading data |
| `Serializable` | Strictest isolation | Financial transactions |
| `Snapshot` | Point-in-time consistency | Long-running reads (SQL Server) |

### Global Default

You can set a global default isolation level:

```cs
DbOperationScope<TDbContext>.Options.DefaultIsolationLevel = IsolationLevel.ReadCommitted;
```

## DbEventLogReader Options

Controls how the event log is read and processed.

```cs
operations.ConfigureEventLogReader(_ => new() {
    CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
    BatchSize = 64,
    ConcurrencyLevel = Environment.ProcessorCount * 4,
    ReprocessDelay = TimeSpan.FromSeconds(0.1).ToRandom(0.1),
    RetryDelays = RetryDelaySeq.Exp(0.25, 5),
    LogLevel = LogLevel.Information,
    IsTracingEnabled = false,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CheckPeriod` | `RandomTimeSpan` | 5s ± 0.5s | How often to check for new events |
| `BatchSize` | `int` | 64 | Maximum events processed per batch |
| `ConcurrencyLevel` | `int` | 4 × CPU count | Number of concurrent event processors |
| `ReprocessDelay` | `RandomTimeSpan` | 100ms ± 100ms | Delay before reprocessing a failed event |
| `ReprocessPolicy` | `IRetryPolicy` | 5 retries, **5min** timeout | Policy for reprocessing failed events |
| `RetryDelays` | `RetryDelaySeq` | Exp(0.25s, 5×) | Delays between read retries on error |
| `LogLevel` | `LogLevel` | Information | Logging verbosity |
| `IsTracingEnabled` | `bool` | false | Enable Activity tracing |

### Key Difference from Operations

Events have a longer reprocess timeout (5 minutes vs 30 seconds) because event
processing may involve external services that take longer to respond.

## DbEventLogTrimmer Options

Controls cleanup of old events from the log.

```cs
operations.ConfigureEventLogTrimmer(_ => new() {
    MaxEntryAge = TimeSpan.FromHours(1),
    BatchSize = 4096,
    CheckPeriod = TimeSpan.FromMinutes(15).ToRandom(0.25),
    RetryDelays = RetryDelaySeq.Exp(
        TimeSpan.FromSeconds(15),
        TimeSpan.FromMinutes(10)),
    StatisticsPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
    LogLevel = LogLevel.Information,
    IsTracingEnabled = false,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MaxEntryAge` | `TimeSpan` | **1 hour** | Events older than this are trimmed |
| `BatchSize` | `int` | 4096 (.NET 7+) | Events deleted per batch |
| `CheckPeriod` | `RandomTimeSpan` | 15min ± 3.75min | How often to run trimming |
| `RetryDelays` | `RetryDelaySeq` | 15s to 10min exp | Delays on trim failures |
| `StatisticsPeriod` | `RandomTimeSpan` | 1hr ± 6min | How often to log statistics |
| `LogLevel` | `LogLevel` | Information | Logging verbosity |
| `IsTracingEnabled` | `bool` | false | Enable Activity tracing |

### Trimming Condition

Events are trimmed when:
```sql
DelayUntil <= (NOW - MaxEntryAge) AND State != 'New'
```

This ensures:
- Events that haven't been processed yet are never trimmed
- Delayed events remain until processed
- Processed/discarded events are eventually cleaned up

## OperationReprocessor Options

Controls command retry behavior for transient errors.

```cs
var fusion = services.AddFusion();
fusion.AddOperationReprocessor(_ => new() {
    MaxRetryCount = 3,
    RetryDelays = RetryDelaySeq.Exp(0.50, 3, 0.33),
    Filter = OperationReprocessor.DefaultFilter,
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MaxRetryCount` | `int` | 3 | Maximum retry attempts |
| `RetryDelays` | `RetryDelaySeq` | Exp(0.5s, 3×, 33% jitter) | Delay sequence between retries |
| `DelayClock` | `MomentClock?` | null | Custom clock for testing |
| `Filter` | `Func<ICommand, CommandContext, bool>` | `DefaultFilter` | Determines which commands can be retried |

### RetryDelaySeq Examples

```cs
// Exponential backoff: 0.5s → 1.5s → 4.5s (max 3x, no jitter)
RetryDelaySeq.Exp(0.50, 3)

// Exponential with jitter: 0.5s ± 33%
RetryDelaySeq.Exp(0.50, 3, 0.33)

// Custom range: 1s to 30s exponential
RetryDelaySeq.Exp(
    TimeSpan.FromSeconds(1),
    TimeSpan.FromSeconds(30))

// Fixed delays
RetryDelaySeq.Fixed(TimeSpan.FromSeconds(1))
```

## OperationCompletionNotifier Options

Controls duplicate detection for operation completion.

```cs
// Typically configured via FusionBuilder internals
public record Options
{
    public int MaxKnownOperationCount { get; init; } = 16384;
    public TimeSpan MaxKnownOperationAge { get; init; } = TimeSpan.FromMinutes(15);
    public MomentClock? Clock { get; init; }
}
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MaxKnownOperationCount` | `int` | 16384 | Cache size for recently seen operations |
| `MaxKnownOperationAge` | `TimeSpan` | 15 minutes | How long to remember operations |
| `Clock` | `MomentClock?` | null | Custom clock for testing |

These settings ensure duplicate notifications (from multiple sources) are properly
deduplicated.

## RandomTimeSpan

Many options use `RandomTimeSpan` to add jitter and prevent thundering herd:

```cs
// Fixed interval (no jitter)
TimeSpan.FromSeconds(5)

// With jitter: 5s ± 10% (4.5s to 5.5s)
TimeSpan.FromSeconds(5).ToRandom(0.1)

// With larger jitter: 5s ± 50% (2.5s to 7.5s)
TimeSpan.FromSeconds(5).ToRandom(0.5)
```

## Complete Configuration Example

```cs
services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        // Operation log reading
        operations.ConfigureOperationLogReader(_ => new() {
            StartOffset = TimeSpan.FromSeconds(5),
            CheckPeriod = TimeSpan.FromSeconds(60).ToRandom(0.1),  // Long poll with watcher
            BatchSize = 128,
            ConcurrencyLevel = 16,
        });

        // Operation log cleanup
        operations.ConfigureOperationLogTrimmer(_ => new() {
            MaxEntryAge = TimeSpan.FromHours(1),
            CheckPeriod = TimeSpan.FromMinutes(30).ToRandom(0.25),
        });

        // Transaction isolation
        operations.ConfigureOperationScope(_ => new() {
            IsolationLevel = IsolationLevel.ReadCommitted,
        });

        // Event log reading
        operations.ConfigureEventLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromSeconds(10).ToRandom(0.1),
            BatchSize = 256,
        });

        // Event log cleanup
        operations.ConfigureEventLogTrimmer(_ => new() {
            MaxEntryAge = TimeSpan.FromHours(24),  // Keep events longer
        });

        // Use PostgreSQL notifications
        operations.AddNpgsqlOperationLogWatcher();
    });
});

// Command retry
var fusion = services.AddFusion();
fusion.AddOperationReprocessor(_ => new() {
    MaxRetryCount = 5,
    RetryDelays = RetryDelaySeq.Exp(1, 10, 0.25),
});
```

## Environment-Specific Configuration

```cs
services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        if (env.IsDevelopment()) {
            // Faster feedback in development
            operations.ConfigureOperationLogReader(_ => new() {
                CheckPeriod = TimeSpan.FromSeconds(1),
            });
            operations.ConfigureOperationLogTrimmer(_ => new() {
                MaxEntryAge = TimeSpan.FromMinutes(5),  // Clean up faster
                CheckPeriod = TimeSpan.FromMinutes(1),
            });
        }
        else {
            // Production: rely on watchers, longer retention
            operations.ConfigureOperationLogReader(_ => new() {
                CheckPeriod = TimeSpan.FromMinutes(5).ToRandom(0.1),
            });
            operations.ConfigureOperationLogTrimmer(_ => new() {
                MaxEntryAge = TimeSpan.FromHours(4),
            });
        }

        // Choose watcher based on infrastructure
        if (useRedis)
            operations.AddRedisOperationLogWatcher();
        else if (usePostgres)
            operations.AddNpgsqlOperationLogWatcher();
        else
            operations.AddFileSystemOperationLogWatcher();
    });
});
```
