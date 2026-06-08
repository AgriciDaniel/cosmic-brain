# @actuallab/fusion-rpc

This package bridges `@actuallab/fusion` and `@actuallab/rpc` &mdash;
it provides `FusionHub`, a compute-aware RPC hub that automatically propagates
invalidation between a .NET Fusion server and TypeScript client.

This is the TypeScript equivalent of `ActualLab.Fusion`'s client-side RPC infrastructure
(Remote Compute Service Interceptor, `RpcComputeCallType`, etc.).


## FusionHub

`FusionHub` extends `RpcHub` with Fusion-specific behavior:

- **Compute-aware client proxies**: calls to compute methods are routed through
  local `ComputeFunction` instances for caching and dependency tracking
- **Invalidation wiring**: when the server invalidates a `Computed<T>`,
  `FusionHub` handles the `$sys-c.Invalidate` system call and invalidates
  the corresponding local `Computed<T>` replica
- **Server-side compute wrapping**: when hosting services, wraps compute methods
  in `ComputeFunction` and wires invalidation callbacks to send `$sys-c.Invalidate`

```ts
import { FusionHub } from "@actuallab/fusion-rpc";
import { RpcClientPeer } from "@actuallab/rpc";

const hub = new FusionHub();
const peer = new RpcClientPeer(hub, "ws://localhost:5005/rpc/ws");
hub.addPeer(peer);

// Create a compute service client
const api = hub.addClient<ITodoApi>(peer, TodoApiDef);

// Compute method results are:
// 1. Cached locally via ComputeFunction
// 2. Invalidated when the server sends $sys-c.Invalidate
const items = await api.ListIds("~", 10);
// ^ subsequent calls return cached value until server invalidates
```


## defineComputeService

Creates a service definition where all methods default to `FUSION_CALL_TYPE_ID` (1),
marking them as compute methods. Use `callTypeId: 0` to opt out individual methods
(e.g., commands/mutations).

```ts
import { defineComputeService } from "@actuallab/fusion-rpc";

const TodoApiDef = defineComputeService("ITodoApi", {
  // Compute methods (default callTypeId = 1)
  Get:        { args: ["", ""] },          // (session, id) → TodoItem
  ListIds:    { args: ["", 0] },           // (session, count) → string[]
  GetSummary: { args: [""] },              // (session) → TodoSummary

  // Commands — opt out of compute caching with callTypeId: 0
  AddOrUpdate: { args: [{}], callTypeId: 0 },
  Remove:      { args: [{}], callTypeId: 0 },
});
```

| Field | Description |
|-------|-------------|
| `args` | Example values (only `args.length` matters &mdash; determines argument count) |
| `callTypeId` | `0` = regular RPC, `1` = compute (default in `defineComputeService`) |
| `returns` | `RpcType.stream` or `RpcType.noWait` for non-standard return types |

::: tip
The service name (first argument) must match the .NET interface name exactly &mdash;
e.g., `"ITodoApi"` if the .NET interface is `ITodoApi`.
:::


## How Invalidation Works

The invalidation flow between .NET server and TypeScript client:

1. **Client calls a compute method** &rarr; `FusionHub` sends the call with `CallType = 1`
2. **Server executes the compute method** and tracks the resulting `Computed<T>`
3. **Server responds** with `$sys.Ok` &mdash; the client caches the result locally
4. **Server-side invalidation occurs** (e.g., data changes)
5. **Server sends `$sys-c.Invalidate`** for that `callId`
6. **Client invalidates** its local `Computed<T>` replica
7. **Cascading invalidation** propagates to any dependent `ComputedState<T>` or `@computeMethod`
8. **React re-renders** via `useComputedState`

### Reconnection Behavior

On disconnect, compute call replicas are **self-invalidated** rather than re-sent.
This is because:

- The server's invalidation tracking for that call is lost on disconnect
- Re-sending would get a duplicate `$sys.Ok` that is ignored
- Self-invalidation forces a fresh recompute that establishes new invalidation tracking

Regular (non-compute) in-flight calls are re-sent transparently on reconnect.


## Server-Side Usage

`FusionHub` can also host compute services (e.g., in a Node.js server
or for in-process testing):

```ts
const hub = new FusionHub();

// Register a compute service — methods are wrapped in ComputeFunction
// and invalidation callbacks are wired to send $sys-c.Invalidate
hub.addService(CounterServiceDef, {
  async Get(key: string) {
    return counters.get(key) ?? 0;
  },
  async Sum(key1: string, key2: string) {
    const a = await this.Get(key1);
    const b = await this.Get(key2);
    return a + b;
  },
});

// Accept WebSocket connections
hub.acceptConnection(ws);  // creates RpcServerPeer + accepts
```

| Member | Description |
|--------|-------------|
| `hub.acceptConnection(ws)` | Accept a `WebSocketLike` and create a server peer |
| `hub.acceptRpcConnection(conn)` | Accept an `RpcConnection` and create a server peer |


## Complete Setup Example

A full client setup connecting to a .NET Fusion server:

```ts
import { FusionHub, defineComputeService } from "@actuallab/fusion-rpc";
import { RpcClientPeer, RpcPeerStateMonitor } from "@actuallab/rpc";
import { useComputedState } from "@actuallab/fusion-react";

// 1. Define services
const TodoApiDef = defineComputeService("ITodoApi", {
  Get:        { args: ["", ""] },
  ListIds:    { args: ["", 0] },
  GetSummary: { args: [""] },
  AddOrUpdate: { args: [{}], callTypeId: 0 },
  Remove:      { args: [{}], callTypeId: 0 },
});

// 2. Create hub + peer
const hub = new FusionHub();
const wsUrl = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}/rpc/ws`;
const peer = new RpcClientPeer(hub, wsUrl);
hub.addPeer(peer);

// 3. Create clients
const api = hub.addClient<ITodoApi>(peer, TodoApiDef);

// 4. Monitor connection state (for UI)
const monitor = new RpcPeerStateMonitor(peer);

// 5. The RpcClientPeer constructor auto-starts the connection + reconnect loop.
//    Pass `false` as the 3rd arg if you need to tweak options before starting.

// 6. Use in React
function TodoCount() {
  const { value, isInitial } = useComputedState(
    () => api.GetSummary("~"),
    [api],
  );
  if (isInitial) return <span>Loading...</span>;
  return <span>{value?.count ?? 0} todos</span>;
}
```
