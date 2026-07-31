---
type: concept
title: "Fusion Performance & Benchmarks"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - performance
  - benchmarks
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Performance & Benchmarks

Fusion delivers dramatic performance improvements over traditional approaches by eliminating redundant computation through automatic caching and dependency tracking.

## Compute Services: Cache-Resolving Calls

Benchmark: AMD Ryzen 9 9950X3D.

| Scenario | Without Fusion | With Fusion | Speedup |
|----------|----------------|-------------|---------|
| Local service, minimal writes | 38.6K calls/s | **313.8M calls/s** | **8,127x** |
| Local service, continuous writes | 118.2K calls/s | **261.3M calls/s** | **2,212x** |
| Remote service, continuous writes | 80.4K calls/s (REST) | **215.5M calls/s** | **2,679x** |

Even under continuous writes, a cached Fusion service resolves ~261 million calls per second per core. The remote scenario achieves ~215M calls/s — because client-side caching eliminates most network round-trips.

## ActualLab.Rpc vs Alternatives

| Framework | RPC Calls/sec | Streaming Items/sec |
|-----------|---------------|---------------------|
| **ActualLab.Rpc** | **10.16M** | **96.96M** |
| SignalR | 5.31M | 18.30M |
| gRPC | 1.29M | 43.78M |

- **7.9x faster** than gRPC for RPC calls
- **5.3x faster** than SignalR for streaming
- **1.9x faster** than SignalR for RPC calls

## Why Fusion Is So Fast

### Cache Resolution vs Computation

When a compute method is called with arguments that have been computed before (and the value hasn't been invalidated), Fusion returns the cached result directly — no method body executes. At ~20M cache-resolving calls/s, this is nearly free.

### Client-Side Caching

Compute Service Clients cache `Computed<T>` replicas. Most calls resolve from the local cache. Only the first call after invalidation hits the network.

### Automatic Batching

ActualLab.Rpc batches concurrent calls into minimal network frames. 50 simultaneous calls become 1-2 transmissions.

### No Lock Contention

`ComputedRegistry` uses a concurrent structure. Reads don't block writes. Millions of concurrent cache lookups are possible without contention.

## Memory Management

Fusion uses weak references (`GCHandleType.Weak`) for dependency tracking. When no code references a `Computed<T>`, it can be GC'd. Use `MinCacheDuration` to hold strong references for frequently accessed values:

```csharp
[ComputeMethod(MinCacheDuration = 60)] // Hold 60s strong reference
Task<ExpensiveData> GetExpensive();
```

### Invalidation and GC

When a computed value is invalidated, it's removed from `ComputedRegistry` and eventually garbage collected. This keeps memory bounded — old invalidated values don't accumulate.

### Production Numbers ([[Voxt.ai]])

| Metric | Value |
|--------|-------|
| Computed instances per client | 5–10K |
| Remote dependencies per client | 1–2K |
| Time to first contact list render | 0.5s |
| Memory per computed instance | ~200-500 bytes |

## Performance Tips

1. **Design for cache hits** — stable arguments, fine-grained methods (see [[Fusion Cache-Aware API Design]])
2. **Use `MinCacheDuration`** for expensive, frequently accessed values
3. **Use `ConsolidationDelay`** for counters to avoid unnecessary recomputation
4. **Don't hold old computed values** — they prevent GC of the dependency graph
5. **Enable client-side caching** for remote services
