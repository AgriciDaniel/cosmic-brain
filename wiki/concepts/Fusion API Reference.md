---
type: concept
title: "Fusion API Reference"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - api
  - reference
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Core Foundation]]"
source: "[[fusion-docs-overview]]"
---

# Fusion API Reference

Complete type reference for all Fusion namespaces. Covers the public API surface of ActualLab.Fusion and its supporting libraries.

> [!note] Source
> Derived from `api-index.md` and `api-index-full.md` in the Fusion docs. For the most up-to-date API, see the [Fusion GitHub repo](https://github.com/ActualLab/Fusion).

## Namespace Hierarchy

| Namespace | Package | Purpose |
|-----------|---------|---------|
| `ActualLab` | Core | `Result<T>`, `Option<T>`, `HostId` |
| `ActualLab.Time` | Core | `Moment`, clocks, retry delays |
| `ActualLab.Async` | Core | `AsyncLock`, `WorkerBase`, `BatchProcessor` |
| `ActualLab.Collections` | Core | `PropertyBag`, `MemoryBuffer<T>`, `RingBuffer<T>` |
| `ActualLab.Serialization` | Core | `IByteSerializer`, `ITextSerializer` |
| `ActualLab.Resilience` | Core | `RetryPolicy`, `Transiency`, `ChaosMaker` |
| `ActualLab.Text` | Core | `Symbol`, `ListFormat` |
| `ActualLab.Versioning` | Core | `VersionGenerator<T>` |
| `ActualLab.Interception` | Interception | `Interceptor`, `IProxy`, `Invocation` |
| `ActualLab.Rpc` | RPC | `RpcHub`, `RpcPeer`, `RpcStream<T>` |
| `ActualLab.CommandR` | CommandR | `ICommander`, `ICommand<T>`, `CommandContext` |
| `ActualLab.Fusion` | Fusion | `Computed<T>`, `IState<T>`, `StateFactory` |
| `ActualLab.Fusion.Blazor` | Blazor | `ComputedStateComponent<T>` |
| `ActualLab.Fusion.EntityFramework` | EF | `DbHub<TDbContext>`, `DbShard` |
| `ActualLab.Fusion.Authentication` | Auth | `IAuth`, `Session`, `ServerAuthHelper` |
| `ActualLab.Fusion.Operations` | Operations | `DbOperationScope`, `IOperation` |

## Key Interfaces

### Fusion Core

```csharp
IComputeService              // Tagging interface for compute services
IComputed                     // Base for all computed values
IComputed<T>                  // Typed computed value
IComputed<T> : IComputed      // (conceptual — access via Computed<T>)
IState<T>                     // Tracks latest Computed<T>
IMutableState<T> : IState<T>  // Mutable state variable
IComputedState<T> : IState<T> // Auto-updating state
```

### RPC

```csharp
IRpcHub                      // RPC hub managing peers
IRpcPeer                     // Remote peer connection
IRpcCallRouter               // Routes calls to specific peers
```

### CommandR

```csharp
ICommander                   // Command dispatcher
ICommand<TResult>            // Command marker interface
ICommandHandler<T>           // Command handler (interface-based)
CommandContext               // Per-command execution context
```

### Auth

```csharp
IAuth                        // Client-facing auth queries
IAuthBackend                 // Server-side auth modifications
Session                      // User session identifier
ISessionResolver             // Resolves current session
```

### EF

```csharp
DbHub<TDbContext>            // Central database hub
IDbShardResolver             // Resolves shard for entity
IDbShardRegistry             // All available shards
```

## Key Classes

```csharp
Computed<T>                  // Immutable computation result
ComputedState<T>             // Auto-updating state
MutableState<T>              // Mutable state variable
StateFactory                 // Creates states
ComputedRegistry             // Global cache of Computed<T>
ComputedOptions              // Fine-tune compute method behavior
FixedDelayer                 // Fixed-delay update delayer
UpdateDelayer                // UI-aware update delayer
RpcHub                       // RPC hub implementation
RpcStream<T>                 // Full-duplex typed stream
Interceptor                  // Base for method interceptors
Invocation                   // Intercepted call context
```

## Extension Methods

| Class | Purpose |
|-------|---------|
| `TaskExt` | Task manipulation (suppress, collect) |
| `CancellationTokenExt` | Cancellation token utilities |
| `ExceptionExt` | Exception handling helpers |
| `EnumerableExt` | LINQ extensions |
| `SpanExt` | Span/Memory utilities |
| `StringExt` | String manipulation |
| `ServiceProviderExt` | DI convenience accessors |
