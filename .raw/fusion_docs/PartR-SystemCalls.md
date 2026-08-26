# System Calls

::: warning For Information Only
This section documents the internal system call interfaces used by ActualLab.Rpc and Fusion. You should **never send these calls manually** &ndash; they are automatically invoked by the framework to manage RPC communication, call lifecycle, streaming, and computed value invalidation.

Understanding these calls may be helpful for debugging, extending the framework, or understanding the wire protocol.
:::


## IRpcSystemCalls

`IRpcSystemCalls` is the core system service interface (service name: `$sys`) that handles RPC infrastructure operations. All methods use fire-and-forget semantics via `RpcNoWait` where appropriate.

### Handshake & Reconnection

| Method | Return Type | Arguments | Description |
|--------|-------------|-----------|-------------|
| `Handshake` | `Task<RpcNoWait>` | `RpcHandshake handshake` | Initiates connection handshake between peers |
| `Reconnect` | `Task<byte[]>` | `int handshakeIndex, Dictionary<int, byte[]> completedStagesData, CancellationToken` | Handles reconnection after network interruption |

### Call Lifecycle

| Method | Arguments | Description |
|--------|-----------|-------------|
| `Ok` | `object? result` | Returns successful call result to the caller |
| `Error` | `ExceptionInfo error` | Returns error information to the caller |
| `Cancel` | *(none)* | Cancels an in-progress call |
| `M` | *(none)* | Signals a "match" (cache hit) for Compute Service calls |
| `NotFound` | `string serviceName, string methodName` | Indicates the requested service/method doesn't exist |

### Object Lifecycle

| Method | Arguments | Description |
|--------|-----------|-------------|
| `KeepAlive` | `long[] localIds` | Keeps remote objects alive (prevents garbage collection) |
| `Disconnect` | `long[] localIds` | Disconnects/releases remote objects |

### Stream Control

| Method | Arguments | Description |
|--------|-----------|-------------|
| `Ack` | `long nextIndex, Guid hostId` | Acknowledges received stream items (flow control) |
| `AckEnd` | `Guid hostId` | Acknowledges stream completion |
| `I` | `long index, object? item` | Sends a single stream item |
| `B` | `long index, object? items` | Sends a batch of stream items |
| `End` | `long index, ExceptionInfo error` | Signals stream completion (with optional error) |


## IRpcComputeSystemCalls

`IRpcComputeSystemCalls` is a Fusion-specific system service interface (service name: `$sys-c`) that handles computed value invalidation propagation.

| Method | Arguments | Description |
|--------|-----------|-------------|
| `Invalidate` | *(none)* | Notifies the client that a computed value has been invalidated on the server |

This single call is the mechanism that enables real-time UI updates in Fusion. When a server-side `Computed<T>` is invalidated, the server sends an `Invalidate` call to all connected clients that have replicas of that computed value. This triggers re-computation on the client side, which in turn updates any dependent UI components.
