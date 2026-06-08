# ActualLab.Core

`ActualLab.Core` is the foundational library providing essential primitives used throughout Fusion and ActualLab.Rpc.
It includes time abstractions, collections, async utilities, serialization infrastructure, and more.

## Required Package

| Package | Purpose |
|---------|---------|
| [ActualLab.Core](https://www.nuget.org/packages/ActualLab.Core/) | Core infrastructure library |


## Namespace Overview

### ActualLab (Root)

Core types used throughout the library. See [Result and Option](./PartCore-Result.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `Result<T>` | Success/error result type | [Result.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Result.cs) |
| `Option<T>` | Optional value type | [Option.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Option.cs) |
| `Requirement<T>` | Validation constraint that throws on failure | [Requirement.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Requirement.cs) |
| `HostId` | Unique identifier for a host/process instance | [HostId.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/HostId.cs) |

### ActualLab.Time

Unix-style time primitives. See [Time documentation](./PartCore-Time.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `Moment` | Unix-epoch timestamp (ticks since 1970-01-01 UTC) | [Moment.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Time/Moment.cs) |
| `CpuTimestamp` | High-resolution elapsed time measurement | [CpuTimestamp.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Time/CpuTimestamp.cs) |
| `MomentClock` | Abstract time source | [MomentClock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Time/MomentClock.cs) |
| `MomentClockSet` | DI-friendly clock container | [MomentClockSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Time/MomentClockSet.cs) |
| `RetryDelaySeq` | Delay sequence generator for retries | [RetryDelaySeq.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Time/RetryDelaySeq.cs) |

### ActualLab.Async

Async/await utilities and patterns.

| Type | Description | Source |
|------|-------------|--------|
| `AsyncLock` | Async-compatible mutual exclusion lock | [AsyncLock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLock.cs) |
| `AsyncLockSet<TKey>` | Keyed async locks (lock per entity) | [AsyncLockSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLockSet.cs) |
| `AsyncState<T>` | Thread-safe mutable state with change notifications | [AsyncState.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/AsyncState.cs) |
| `BatchProcessor<TIn, TOut>` | Batches concurrent requests for efficient processing | [BatchProcessor.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/BatchProcessor.cs) |
| `AsyncChain` | Composable async operation chains | [AsyncChain.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/AsyncChain.cs) |
| `WorkerBase` | Background worker with lifecycle management | [WorkerBase.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/WorkerBase.cs) |
| `TaskExt` | Extension methods for `Task` (suppress, collect, etc.) | [TaskExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/TaskExt.cs) |

See also:
- [AsyncLock documentation](./PartCore-AsyncLock.md)
- [AsyncChain documentation](./PartCore-AsyncChain.md)
- [WorkerBase documentation](./PartCore-Worker.md)

### ActualLab.Collections

Specialized collections and data structures. See [PropertyBag documentation](./PartCore-PropertyBag.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `PropertyBag` | Immutable key-value store with type-decorated serialization | [PropertyBag.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/PropertyBag.cs) |
| `MutablePropertyBag` | Mutable variant of `PropertyBag` | [MutablePropertyBag.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/MutablePropertyBag.cs) |
| `MemoryBuffer<T>` | Pooled, resizable buffer (like `ArrayPool`-backed list) | [MemoryBuffer.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/MemoryBuffer.cs) |
| `RingBuffer<T>` | Fixed-size circular buffer | [RingBuffer.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/RingBuffer.cs) |
| `ImmutableBimap<K, V>` | Bidirectional immutable dictionary | [ImmutableBimap.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/ImmutableBimap.cs) |
| `BinaryHeap<T>` | Priority queue implementation | [BinaryHeap.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/BinaryHeap.cs) |
| `RadixHeapSet<T>` | Fast priority queue for scheduling | [RadixHeapSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/RadixHeapSet.cs) |

### ActualLab.Serialization

Unified serialization infrastructure. See [Unified Serialization](./PartS.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `IByteSerializer` | Binary serialization abstraction | [IByteSerializer.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/IByteSerializer.cs) |
| `ITextSerializer` | Text/JSON serialization abstraction | [ITextSerializer.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/ITextSerializer.cs) |
| `ByteSerialized<T>` | Lazy byte serialization wrapper | [ByteSerialized.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/ByteSerialized.cs) |
| `TextSerialized<T>` | Lazy text serialization wrapper | [TextSerialized.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/TextSerialized.cs) |
| `UniSerialized<T>` | Multi-format serialization wrapper | [UniSerialized.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/UniSerialized.cs) |
| `TypeDecoratingTextSerializer` | Preserves type info for polymorphism | [TypeDecoratingTextSerializer.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Serialization/TypeDecoratingTextSerializer.cs) |

### ActualLab.Locking

Synchronization primitives. See [AsyncLock documentation](./PartCore-AsyncLock.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `AsyncLock` | Async-compatible lock with `using` pattern | [AsyncLock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLock.cs) |
| `AsyncLockSet<TKey>` | Keyed async locks (lock per entity) | [AsyncLockSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLockSet.cs) |
| `FileLock` | Cross-process file-based lock | [FileLock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/FileLock.cs) |

### ActualLab.Resilience

Fault tolerance and retry logic. See [Transiency documentation](./PartCore-Transiency.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `RetryPolicy` | Configurable retry with backoff | [RetryPolicy.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/RetryPolicy.cs) |
| `Transiency` | Classifies exceptions as transient/terminal | [Transiency.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/Transiency.cs) |
| `TransiencyResolver` | Determines if an exception is transient | [TransiencyResolver.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/TransiencyResolver.cs) |
| `ChaosMaker` | Injects random failures for testing | [ChaosMaker.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Resilience/ChaosMaker.cs) |

### ActualLab.Caching

Caching infrastructure.

| Type | Description | Source |
|------|-------------|--------|
| `FileSystemCache` | Simple file-based cache | [FileSystemCache.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Caching/FileSystemCache.cs) |
| `MemoizingCache<TKey, TValue>` | In-memory memoization cache | [MemoizingCache.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Caching/MemoizingCache.cs) |

### ActualLab.Versioning

Version tracking for optimistic concurrency.

| Type | Description | Source |
|------|-------------|--------|
| `VersionGenerator<T>` | Generates monotonic version numbers | [VersionGenerator.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Versioning/VersionGenerator.cs) |
| `VersionSet<T>` | Tracks multiple version ranges (used in RPC for API versioning) | [VersionSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/VersionSet.cs) |

### ActualLab.Text

String and text utilities. See [Symbol documentation](./PartCore-Symbol.md) for details.

| Type | Description | Source |
|------|-------------|--------|
| `Symbol` | Interned string for fast equality checks | [Symbol.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Text/Symbol.cs) |
| `ListFormat` | Parses/formats delimited lists | [ListFormat.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Text/ListFormat.cs) |


## Extension Methods

ActualLab.Core provides numerous extension methods:

| Class | Purpose | Source |
|-------|---------|--------|
| `TaskExt` | Task manipulation (suppress exceptions, collect results) | [TaskExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/TaskExt.cs) |
| `CancellationTokenExt` | Cancellation token utilities | [CancellationTokenExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Async/CancellationTokenExt.cs) |
| `ExceptionExt` | Exception handling helpers | [ExceptionExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/ExceptionExt.cs) |
| `EnumerableExt` | LINQ extensions | [EnumerableExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/EnumerableExt.cs) |
| `SpanExt` | Span/Memory utilities | [SpanExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/SpanExt.cs) |
| `StringExt` | String manipulation | [StringExt.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/StringExt.cs) |


## DI Integration

Register core services:

```cs
services.AddSingleton(MomentClockSet.Default);

// Access via extension
var clocks = services.Clocks();
var commander = services.Commander();
```
