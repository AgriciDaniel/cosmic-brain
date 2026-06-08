# @actuallab/rpc

The RPC package provides WebSocket-based communication with .NET `ActualLab.Rpc` servers.
It handles connection management, serialization, streaming, reconnection,
and the system call protocol.

See [ActualLab.Rpc in .NET](./PartR.md) for the full conceptual overview.


## Key Differences from .NET

| Aspect | .NET | TypeScript |
|--------|------|------------|
| **Service definition** | Reflection on C# interfaces | Explicit `defineRpcService()` or `@rpcService`/`@rpcMethod` decorators |
| **Client creation** | DI: `fusion.AddClient<T>()` | `hub.addClient<T>(peer, def)` |
| **Transport** | Pluggable (WebSocket, WebTransport) | WebSocket only (browser + Node.js) |
| **Serialization** | MemoryPack, MessagePack, System.Text.Json | JSON only (`json5np` &mdash; no polymorphism) |
| **Reconnection** | `RpcClientPeerReconnectDelayer` profiles | Exponential backoff: 1s &rarr; 60s max |
| **Middleware** | `IRpcMiddleware[]` pipeline | Direct dispatch (no middleware) |
| **Versioning** | API version sets in handshake | No versioning |


## Defining Services

There are two ways to define RPC services:

### Option 1: defineRpcService (Recommended for Clients)

```ts
import { defineRpcService, RpcType } from "@actuallab/rpc";

const SimpleServiceDef = defineRpcService("ISimpleService", {
  // Regular method: (message: string) → string
  Greet:   { args: [""] },

  // Streaming method: () → RpcStream<number>
  Counter: { args: [], returns: RpcType.stream },

  // Fire-and-forget: (message: string) → void
  Ping:    { args: [""], returns: RpcType.noWait },
});
```

Each method entry specifies:

| Field | Description |
|-------|-------------|
| `args` | Array of example values (used only for `args.length` to determine argument count) |
| `returns` | Optional: `RpcType.stream`, `RpcType.noWait`, or omit for regular |
| `callTypeId` | Optional: custom call type (used by `@actuallab/fusion-rpc` for compute calls) |
| `wireArgCount` | Optional: override wire argument count (default: `args.length + 1` to account for `CancellationToken`) |

### Option 2: Decorators (for Server Implementations)

```ts
import { rpcService, rpcMethod, RpcType } from "@actuallab/rpc";

@rpcService("ISimpleService")
abstract class ISimpleService {
  @rpcMethod()
  greet(message: string): Promise<string> { throw ""; }

  @rpcMethod({ returns: RpcType.stream })
  counter(): Promise<AsyncIterable<number>> { throw ""; }

  @rpcMethod({ returns: RpcType.noWait })
  ping(message: string): void { throw ""; }
}
```

::: tip
Decorator-based definitions work with both `RpcHub.addClient()` and `RpcHub.addService()` &mdash;
the hub extracts the service definition from decorator metadata automatically.
:::


## RpcHub

Central coordinator that manages peers, services, and configuration.

```ts
import { RpcHub } from "@actuallab/rpc";

const hub = new RpcHub();

// Register a server-side service implementation
hub.addService(SimpleServiceDef, {
  Greet: (message: string) => `Hello, ${message}!`,
  Counter: async function*() {
    for (let i = 0; ; i++) {
      yield i;
      await new Promise(r => setTimeout(r, 100));
    }
  },
  Ping: (message: string) => { console.log(`Ping: ${message}`); },
});

// Create a client proxy
const peer = hub.getClientPeer("ws://localhost:5005/rpc/ws");
const client = hub.addClient<ISimpleService>(peer, SimpleServiceDef);

hub.close();  // Close all peers
```

| Member | Description |
|--------|-------------|
| `.hubId` | Auto-generated UUID |
| `.peers` | `Map<string, RpcPeer>` of all managed peers |
| `.reconnectDelayer` | Shared `RpcClientPeerReconnectDelayer` &mdash; exponential backoff for all client peers |
| `.serviceHost` | Dispatches inbound calls to registered service implementations |
| `.addPeer(peer)` | Register a peer |
| `.getPeer(ref)` | Get or create a peer (client or server based on `ref` prefix) |
| `.getClientPeer(ref)` | Get or create a client peer |
| `.getServerPeer(ref)` | Get or create a server peer |
| `.addService(def, impl)` | Register a service implementation |
| `.addClient<T>(peer, def)` | Create a typed client proxy on a peer |
| `.close()` | Close all peers |


## RpcClientPeer

Client-side peer that manages a WebSocket connection with automatic reconnection.

```ts
import {
  RpcClientPeer,
  RpcConnectionState,
  RpcPeerRefBuilder,
  type WebSocketLike,
} from "@actuallab/rpc";

// Browser: constructor auto-starts the reconnect loop (mustStart defaults to true)
const peer = new RpcClientPeer(hub, "ws://localhost:5005/rpc/ws");

// Node.js / tests: pass mustStart=false so you can set webSocketFactory first.
// RpcPeerRefBuilder.forClient bakes the serialization format into the URL as ?f=...
import WebSocket from "ws";
const peer2 = new RpcClientPeer(
  hub,
  RpcPeerRefBuilder.forClient("ws://localhost:5005/rpc/ws", "msgpack6"),
  false);
peer2.webSocketFactory = url => new WebSocket(url) as unknown as WebSocketLike;
peer2.start();

// Wait for the first successful connection + handshake
await peer2.whenConnected();

// React to state transitions
peer.connectionStateChanged.add(state => {
  if (state === RpcConnectionState.Connected) console.log("Connected");
  else if (state === RpcConnectionState.Disconnected) console.log("Disconnected");
});
peer.peerChanged.add(() => console.log("Server restarted"));

// Connection state snapshot
peer.isConnected;          // boolean — underlying WS is open
peer.connectionState;      // RpcConnectionState: Disconnected | Connecting | Connected
peer.whenRunning;          // Promise<void> — resolves when the reconnect loop exits (after close())
```

### Connection Lifecycle

1. `peer.start()` (or auto-start via `mustStart = true`) kicks off the reconnect loop
2. Opens a WebSocket to the URL + query params (`clientId`, `f=json5np`)
3. Exchanges handshakes with the server; state flips to `Connected` **after** the handshake
4. Detects server restarts via `RemoteHubId` comparison (`peerChanged` event)
5. On disconnect, waits (via `hub.reconnectDelayer`), then reconnects
6. Outbound calls made while disconnected are buffered and sent on reconnect

### Reconnection

The reconnect delayer lives on the hub and is shared by all client peers &mdash;
set it once to apply everywhere.

```ts
// Default exponential backoff: 1s → 60s
hub.reconnectDelayer;

// Force immediate reconnection for every client peer on the hub
hub.reconnectDelayer.cancelDelays();

// Per-peer reconnect countdown
peer.reconnectsAt;  // timestamp (ms) or 0
peer.reconnectsAtChanged.add(() => { /* update UI */ });
```


## RpcServerPeer

Server-side peer that wraps an accepted connection.

```ts
import { RpcServerPeer, RpcWebSocketConnection } from "@actuallab/rpc";

// Accept incoming WebSocket (e.g., in a Node.js server)
const ref = `server://${crypto.randomUUID()}`;
const peer = hub.getServerPeer(ref);
const conn = new RpcWebSocketConnection(ws);
peer.accept(conn);
```


## RpcStream\<T\>

Client-side stream consumer &mdash; implements `AsyncIterable<T>` for `for await...of`.
See [RpcStream in .NET](./PartR-RpcStream.md) for the full conceptual overview.

```ts
// Assuming Counter() returns RpcStream<number>
const stream = await client.Counter();

for await (const item of stream) {
  console.log(item);  // 0, 1, 2, ...
  if (item > 10) break;
}
```

### Key Characteristics

| Feature | Behavior |
|---------|----------|
| Enumeration | Can only be iterated **once** |
| Flow control | Built-in ack-based backpressure (`ackPeriod`, `ackAdvance`; optional `bufferSize` for local pre-buffering) |
| Reconnection | Automatically resumes from last received index |
| Nested streams | Stream refs inside returned objects are auto-resolved |
| Cancellation | `break` from `for await` sends `AckEnd` to the server |

### Nested Streams

When a method returns an object containing stream fields, the RPC layer
automatically resolves stream reference strings into live `RpcStream` instances:

```ts
// .NET service returns Table<int> with an RpcStream<Row<int>> Rows field
const table = await client.GetTable("My Table");
console.log(table.Title);
for await (const row of table.Rows) {
  for await (const item of row.Items) {
    console.log(item);
  }
}
```


## Fire-and-Forget (NoWait)

Methods marked with `RpcType.noWait` send a message without waiting for a response.
The call is silently dropped if the peer is disconnected.

```ts
// Define
const def = defineRpcService("INotifier", {
  Notify: { args: [""], returns: RpcType.noWait },
});

// Use — returns void (synchronous)
client.Notify("something happened");
```


## RpcPeerStateMonitor

High-level connection state monitor with `JustConnected`/`JustDisconnected` transitions &mdash;
useful for building connection status UI.

```ts
import { RpcPeerStateMonitor, RpcPeerStateKind } from "@actuallab/rpc";

const monitor = new RpcPeerStateMonitor(peer);

monitor.stateChanged.add((state) => {
  switch (state.kind) {
    case RpcPeerStateKind.Connected:
      // Stable connection (after JustConnected grace period)
      break;
    case RpcPeerStateKind.JustConnected:
      // Just connected (within 1.5s of connect)
      break;
    case RpcPeerStateKind.JustDisconnected:
      // Just disconnected (within 3s of disconnect)
      break;
    case RpcPeerStateKind.Disconnected:
      // Fully disconnected
      console.log(`Reconnects in: ${state.reconnectsIn}ms`);
      break;
  }
});

// Clean up
monitor.dispose();
```

| State | Description |
|-------|-------------|
| `JustConnected` | Within 1.5 seconds of connecting |
| `Connected` | Stably connected |
| `JustDisconnected` | Within 3 seconds of disconnecting (hides brief blips) |
| `Disconnected` | Fully disconnected; `state.reconnectsIn` shows countdown |

The `JustConnected` and `JustDisconnected` states provide grace periods
so the UI can avoid flashing connection status changes during brief network blips.


## Wire Protocol

The TypeScript port uses the same wire format as .NET `ActualLab.Rpc`:

- Messages are JSON objects with `Method`, `RelatedId`, `CallType`, and `Headers` fields
- Arguments follow the envelope, separated by `\x02` (ARG_DELIMITER)
- Multiple messages per frame, separated by `\x03` (FRAME_DELIMITER)
- Serialization format: `json5np` (System.Text.Json without polymorphic type wrapping)

System calls use `$sys.*` method names (`$sys.Ok`, `$sys.Error`, `$sys.Cancel`,
`$sys.KeepAlive`, `$sys.I`, `$sys.B`, `$sys.End`, `$sys.Ack`, `$sys.AckEnd`).
