---
type: concept
title: "Fusion Core Foundation"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - core
  - foundation
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Serialization]]"
source: "[[fusion-docs-overview]]"
---

# ActualLab.Core Foundation

`ActualLab.Core` is the foundational library for Fusion and ActualLab.Rpc. It provides time abstractions, async utilities, collections, serialization infrastructure, and more.

## Required Package

| Package | Purpose |
|---------|---------|
| `ActualLab.Core` | Core infrastructure used by all Fusion packages |

## Namespace Overview

### ActualLab (Root)

| Type | Description |
|------|-------------|
| `Result<T>` | Success/error result type with deconstruction |
| `Option<T>` | Optional value that may or may not exist |
| `Requirement<T>` | Validation constraint, throws on failure |
| `HostId` | Unique host/process identifier |

### ActualLab.Time

Unix-style time primitives:

| Type | Description |
|------|-------------|
| `Moment` | Unix-epoch timestamp (ticks since 1970-01-01 UTC) |
| `CpuTimestamp` | High-res elapsed time measurement |
| `MomentClock` | Abstract time source (system, test, etc.) |
| `MomentClockSet` | DI-friendly clock container |
| `RetryDelaySeq` | Delay sequence generator for retries |

### ActualLab.Async

| Type | Description |
|------|-------------|
| `AsyncLock` | Async-compatible mutual exclusion (`using` pattern) |
| `AsyncLockSet<TKey>` | Keyed async locks (lock per entity) |
| `AsyncState<T>` | Thread-safe mutable state with change notifications |
| `BatchProcessor<TIn, TOut>` | Batches concurrent requests |
| `AsyncChain` | Composable async operation chains |
| `WorkerBase` | Background worker with lifecycle management |

### ActualLab.Collections

| Type | Description |
|------|-------------|
| `PropertyBag` | Immutable key-value store with type-decorated serialization |
| `MemoryBuffer<T>` | Pooled, resizable buffer (ArrayPool-backed) |
| `RingBuffer<T>` | Fixed-size circular buffer |
| `ImmutableBimap<K, V>` | Bidirectional immutable dictionary |
| `BinaryHeap<T>` | Priority queue |
| `RadixHeapSet<T>` | Fast priority queue for scheduling |

### ActualLab.Resilience

| Type | Description |
|------|-------------|
| `RetryPolicy` | Configurable retry with backoff |
| `Transiency` | Classifies exceptions as transient/terminal |
| `TransiencyResolver` | Determines if exception is transient |
| `ChaosMaker` | Injects random failures for testing |

### ActualLab.Text

| Type | Description |
|------|-------------|
| `Symbol` | Interned string for fast equality (used everywhere in Fusion) |
| `ListFormat` | Parses/formats delimited lists |

### ActualLab.Versioning

`VersionGenerator<T>` generates monotonic version numbers for optimistic concurrency.

## DI Integration

```csharp
// Core registration is automatic via AddFusion()
services.AddFusion();

// Access common services via extension methods
var clocks = services.Clocks();
var commander = services.Commander();
var stateFactory = services.StateFactory();
```

## Extension Methods

Key utility classes: `TaskExt` (suppress, collect tasks), `CancellationTokenExt`, `ExceptionExt`, `EnumerableExt`, `SpanExt`, `StringExt`, `ServiceProviderExt` (convenient DI accessors).
