# TypeScript Port

The primary goal of the TypeScript port is to enable **TypeScript/JavaScript-based UI**
to consume Fusion Compute Services and ActualLab.Rpc services running on a .NET server.
It gives you real-time, invalidation-driven UI updates in React (or any other JS framework) &mdash;
the same way Fusion + Blazor works on .NET.

The port is intentionally **more lightweight** than the full .NET version.
Server-side-only features like [CommandR](./PartC.md), [Operations Framework](./PartO.md),
[Entity Framework extensions](./PartEF.md), and [Authentication](./PartAA.md) are not included &mdash;
these remain on the .NET server where they belong.

What the TypeScript port **does** provide:

- **Remote Compute Service Clients** &mdash; typed proxies that call .NET Compute Services over RPC,
  cache results locally, and automatically invalidate when the server signals changes
- **Client-side Compute Services** &mdash; `@computeMethod` and `Computed<T>` work locally in the browser,
  so you can compose server API calls into higher-level computed values with dependency tracking
- **Reactive states** &mdash; `ComputedState<T>` and `MutableState<T>` for auto-updating UI
- **RPC infrastructure** &mdash; WebSocket transport, streaming (`RpcStream<T>`),
  fire-and-forget (`RpcNoWait`), automatic reconnection
- **React integration** &mdash; `useComputedState` hook for real-time rendering

In short, it is exactly what you need to use Fusion services from a JavaScript/TypeScript client.

::: tip
This section assumes you are familiar with Fusion's core concepts
([Compute Services](./PartF.md), [Computed\<T\>](./PartF-C.md), [States](./PartF-ST.md),
[ActualLab.Rpc](./PartR.md)).
It focuses on the TypeScript API surface and key differences from the .NET version.
:::


## npm Packages

| Package | Description | .NET Counterpart |
|---------|-------------|------------------|
| `@actuallab/core` | Core primitives: `Result`, `AsyncContext`, `AsyncLock`, `PromiseSource`, events | `ActualLab.Core` |
| `@actuallab/fusion` | `Computed<T>`, `@computeMethod`, `ComputedState`, `MutableState`, `UIActionTracker` | `ActualLab.Fusion` |
| `@actuallab/rpc` | `RpcHub`, `RpcClientPeer`, `RpcStream`, decorators, WebSocket transport | `ActualLab.Rpc` |
| `@actuallab/fusion-rpc` | `FusionHub` &mdash; compute-aware RPC with automatic invalidation propagation | `ActualLab.Fusion` (client part) |
| `@actuallab/fusion-react` | React hooks: `useComputedState`, `useMutableState` | `ActualLab.Fusion.Blazor` |

All packages are **ESM-first** (with CJS fallback), MIT-licensed, built with `tsup`, and tested with `vitest`.


## Architecture Overview

The typical setup mirrors Fusion + Blazor, but with React on the client:

```
┌─────────────────────────────┐     WebSocket      ┌────────────────────────────┐
│  TypeScript Client (React)  │ <=================> │  .NET Server (Fusion)      │
│                             │   ActualLab.Rpc     │                            │
│  FusionHub + RpcClientPeer  │                     │  Compute Services          │
│  Compute Service Clients    │  ← invalidation ──  │  Computed<T> cache         │
│  @computeMethod local cache │                     │  ActualLab.Rpc server      │
│  useComputedState (React)   │                     │                            │
└─────────────────────────────┘                     └────────────────────────────┘
```

1. **`FusionHub`** manages the RPC connection and creates typed client proxies
2. Client proxies route calls through **`ComputeFunction`** for local caching + dependency tracking
3. When the server invalidates a `Computed<T>`, it sends `$sys-c.Invalidate` to the client
4. The client invalidates its local replica, which cascades to any dependent `ComputedState`
5. React re-renders via `useComputedState`


## Quick Start

```ts
import { FusionHub } from "@actuallab/fusion-rpc";
import { RpcClientPeer, RpcPeerStateMonitor } from "@actuallab/rpc";
import { defineComputeService } from "@actuallab/fusion-rpc";

// 1. Define your service (must match the .NET interface)
const TodoApiDef = defineComputeService("ITodoApi", {
  Get:        { args: ["", ""] },          // (session, id) → TodoItem
  ListIds:    { args: ["", 0] },           // (session, count) → string[]
  GetSummary: { args: [""] },              // (session) → TodoSummary
  AddOrUpdate: { args: [{}], callTypeId: 0 },  // command (non-compute)
  Remove:      { args: [{}], callTypeId: 0 },  // command (non-compute)
});

// 2. Create hub + peer
const hub = new FusionHub();
const peer = new RpcClientPeer(hub, "ws://localhost:5005/rpc/ws");
hub.addPeer(peer);

// 3. Create typed client proxy
const api = hub.addClient<ITodoApi>(peer, TodoApiDef);

// 4. Connection + reconnect loop starts automatically from the RpcClientPeer ctor
//    (pass `false` as the 3rd arg if you need to tweak options before starting).

// 5. Use the client — compute method results are cached + invalidated automatically
const items = await api.ListIds("~", 10);
```


## Key Differences from .NET

| Aspect | .NET | TypeScript |
|--------|------|------------|
| **Dependency Injection** | `services.AddFusion()` + DI container | Explicit construction: `new FusionHub()`, `hub.addClient(...)` |
| **Compute method marker** | `[ComputeMethod]` attribute + `virtual` method | `@computeMethod` decorator |
| **Invalidation** | `Invalidation.Begin()` block | `boundMethod.invalidate(...args)` |
| **Service interface** | C# interface + proxy generation | `defineComputeService()` or `@rpcService` / `@rpcMethod` decorators |
| **Cancellation** | `CancellationToken` | `AbortSignal` (via `AsyncContext`) |
| **Async context** | `ExecutionContext` / `AsyncLocal<T>` | `AsyncContext` (explicit, thread-local-like) |
| **Serialization** | MemoryPack / MessagePack / System.Text.Json | JSON (`json5np` format, no polymorphism) |
| **UI integration** | `ComputedStateComponent<T>` (Blazor) | `useComputedState` hook (React) |
| **State factory** | `IServiceProvider.StateFactory()` | `new ComputedState(computer, options)` / `new MutableState(initial)` |
| **Streaming** | `RpcStream<T>` + `IAsyncEnumerable<T>` | `RpcStream<T>` + `AsyncIterable<T>` (`for await...of`) |
| **Fire-and-forget** | `Task<RpcNoWait>` return type | `{ returns: RpcType.noWait }` in service definition |


## AsyncContext: Why It Matters

JavaScript is single-threaded but runs asynchronous operations via the event loop.
Unlike .NET's `ExecutionContext` that automatically flows through `await` boundaries,
JavaScript has no built-in async context propagation (the TC39 `AsyncContext` proposal is still Stage 2).

Fusion's `@computeMethod` decorator needs to track which `Computed<T>` is currently being computed,
so it uses `AsyncContext.current` &mdash; a thread-local-like static field.
This works perfectly for synchronous code, but across `await` boundaries
the context can be lost if another microtask runs in between.

**In practice**, you may need to pass `AsyncContext` explicitly as the last argument
when calling compute methods from within other compute methods that cross `await` points:

```ts
class Todos {
  @computeMethod
  async list(count: number, ctx?: AsyncContext): Promise<TodoItem[]> {
    ctx ??= AsyncContext.current;
    const ids = await this.api.ListIds("~", count, ctx);
    // ctx ensures dependency tracking survives the await above
    const items: TodoItem[] = [];
    for (const id of ids) {
      const item = await this.api.Get("~", id, ctx);
      if (item) items.push(item);
    }
    return { items };
  }
}
```

::: tip
`AsyncContext` is only needed when you call compute methods across `await` boundaries
inside other compute methods. If you only call compute methods from React hooks
or non-compute code, you don't need to worry about it.
:::


## Sample App

The [TodoApp TypeScript UI](https://github.com/ActualLab/Fusion.Samples/tree/master/src/TodoApp)
demonstrates a complete React + Fusion setup including:

- Compute service client definition with `defineComputeService`
- Client-side `@computeMethod` that composes server calls
- `useComputedState` for real-time React rendering
- `UIActionTracker` for optimistic UI updates
- `RpcPeerStateMonitor` for connection status UI
- Automatic reconnection with exponential backoff
