# ActualLab.Rpc Configuration Options

This document describes the configuration options available in ActualLab.Rpc.

## Overview

ActualLab.Rpc provides several options classes for fine-tuning RPC behavior:

| Options Class | Purpose |
|---------------|---------|
| `RpcLimits` | Connection timeouts, keep-alive, object lifecycle |
| `RpcPeerOptions` | Peer creation and connection lifecycle |
| `RpcOutboundCallOptions` | Outbound call routing, timeouts, rerouting |
| `RpcInboundCallOptions` | Inbound call processing |
| `RpcDiagnosticsOptions` | Call tracing and logging |
| `RpcRegistryOptions` | Service and method registration |
| `RpcWebSocketClientOptions` | WebSocket client connections |
| `RpcWebSocketServerOptions` | WebSocket server endpoints |
| `RpcTestClientOptions` | Testing with in-memory channels |

## `RpcLimits`

Defines timeout and periodic limits for RPC connections, keep-alive, and object lifecycle. Registered as a singleton in DI and accessible via `RpcHub.Limits`.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ConnectTimeout` | `TimeSpan` | `10s` | Timeout for establishing a connection; reconnect starts if exceeded |
| `HandshakeTimeout` | `TimeSpan` | `10s` | Timeout for completing handshake; reconnect starts if exceeded |
| `PrematureDisconnectTimeout` | `TimeSpan` | `15s` | If a connection was alive for less than this duration, a graceful close is still treated as an error — bumping `ConnectionAttemptIndex` and applying reconnect backoff delay. This prevents rapid connect-disconnect cycles from resetting the backoff. |
| `KeepAlivePeriod` | `TimeSpan` | `15s` | Interval at which a peer sends keep-alive messages (which also report which remote objects are still alive) |
| `KeepAliveTimeout` | `TimeSpan` | `55s` | If no keep-alive is received within this period, the connection is dropped and reconnect starts |
| `ObjectReleasePeriod` | `TimeSpan` | `10s` | Cycle time for checking `KeepAliveTimeout` and `ObjectReleaseTimeout` |
| `ObjectReleaseTimeout` | `TimeSpan` | `125s` | If an object doesn't receive a keep-alive for this long, it gets released |
| `ObjectAbortCycleCount` | `int` | `3` | Number of cycles to complete object abort (proceeds to next cycle if at least one object was disposed) |
| `ObjectAbortCyclePeriod` | `TimeSpan` | `1s` | Duration of a single object abort cycle |
| `CallAbortCyclePeriod` | `TimeSpan` | `1s` | Duration of a single call abort cycle |
| `CallTimeoutCheckPeriod` | `RandomTimeSpan` | `5s ±20%` | How often call timeouts are checked |

When a debugger is attached, the defaults for `HandshakeTimeout` (60s), `KeepAlivePeriod` (300s), and `KeepAliveTimeout` (1000s) are relaxed to avoid false timeouts during debugging.

### Example

```csharp
services.AddSingleton(new RpcLimits(Debugger.IsAttached) {
    PrematureDisconnectTimeout = TimeSpan.FromSeconds(30),
    KeepAlivePeriod = TimeSpan.FromSeconds(10),
    KeepAliveTimeout = TimeSpan.FromSeconds(40),
});
```

## `RpcPeerOptions`

Configures RPC peer creation, connection handling, and lifecycle management.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `UseRandomHandshakeIndex` | `bool` | `false` | Use random handshake index values. Set to `true` for testing handshake issues. |
| `PeerFactory` | `Func<...>` | Auto | Factory to create RpcPeer instances (RpcServerPeer or RpcClientPeer based on ref type) |
| `ConnectionKindDetector` | `Func<...>` | Uses `RpcPeerRef.ConnectionKind` | Determines connection kind for a peer reference |
| `TerminalErrorDetector` | `Func<...>` | `RpcReconnectFailedException` | Determines if an exception requires disconnection |
| `ServerConnectionFactory` | `Func<...>` | Auto | Creates RpcConnection for server peers |
| `ServerPeerShutdownTimeoutProvider` | `Func<...>` | 33% of peer lifetime (3-15 min) | Shutdown timeout for server peers |
| `PeerRemoveDelayProvider` | `Func<...>` | 0ms (server), 5min (client) | Delay before removing peer from registry |

### Example

```csharp
services.AddRpc().Configure<RpcPeerOptions>(options => {
    // Enable random handshake index for testing
    options.UseRandomHandshakeIndex = true;

    // Custom terminal error detection
    options.TerminalErrorDetector = (peer, error) =>
        error is RpcReconnectFailedException or ConnectionRefusedException;
});
```

## `RpcOutboundCallOptions`

Configures outbound RPC call behavior including routing, timeouts, and rerouting.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ReroutingDelays` | `RetryDelaySeq` | `Exp(0.1, 5)` | Exponential backoff for rerouting delays (0.1s to 5s). See [Call Routing](./PartR-CallRouting.md). |
| `TimeoutsProvider` | `Func<...>` | Based on method kind | Provides `RpcCallTimeouts` for specific methods |
| `RouterFactory` | `Func<...>` | Routes to `RpcPeerRef.Default` | Creates routers to select target peer. See [Call Routing](./PartR-CallRouting.md). |
| `ReroutingDelayer` | `Func<...>` | `Task.Delay()` | Async function to apply rerouting delays |
| `Hasher` | `Func<...>` | SHA256, 24-char Base64 | Hashes byte data for consistency checking |

### `RpcCallTimeouts`

Timeouts used by `TimeoutsProvider`:

| Property | Default | Description |
|----------|---------|-------------|
| `ConnectTimeout` | `TimeSpan.MaxValue` | Timeout for establishing connection |
| `RunTimeout` | `TimeSpan.MaxValue` | Timeout for call execution |
| `LogTimeout` | `30 seconds` | Timeout for logging results |

### Default Timeouts by Method Type

| Method Type | Connect Timeout | Run Timeout |
|-------------|-----------------|-------------|
| Debug (debugger attached) | Infinite | 300s |
| Query (API) | Infinite | Infinite |
| Command (API) | 1.5s | 10s |
| Query (Backend) | Infinite | Infinite |
| Command (Backend) | 300s | 300s |

### Example

```csharp
services.AddRpc().Configure<RpcOutboundCallOptions>(options => {
    // Custom rerouting delays
    options.ReroutingDelays = RetryDelaySeq.Exp(0.5, 10); // 0.5s to 10s

    // Custom timeout provider
    options.TimeoutsProvider = (hub, methodDef) => new RpcCallTimeouts {
        ConnectTimeout = TimeSpan.FromSeconds(5),
        RunTimeout = TimeSpan.FromSeconds(30),
    };

    // Custom router (e.g., for sharding or load balancing)
    // See PartR-CallRouting.md for detailed examples
    options.RouterFactory = methodDef => args => RpcPeerRef.Default;
});
```

## `RpcInboundCallOptions`

Configures how inbound RPC calls are processed on the receiving end.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ContextFactory` | `Func<...>` | Creates `RpcInboundContext` | Factory to create context for handling incoming calls |

### Example

```csharp
services.AddRpc().Configure<RpcInboundCallOptions>(options => {
    // Custom context factory with additional setup
    options.ContextFactory = (peer, message, peerChangedToken) => {
        var context = new RpcInboundContext(peer, message, peerChangedToken);
        // Additional context setup...
        return context;
    };
});
```

## `RpcDiagnosticsOptions`

Configures diagnostics, call tracing, and logging behavior.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `CallTracerFactory` | `Func<...>` | `RpcDefaultCallTracer` (server), `null` (client) | Factory to create call tracers |
| `CallLoggerFactory` | `Func<...>` | Filters system KeepAlive calls | Factory to create call loggers |

### Example

```csharp
services.AddRpc().Configure<RpcDiagnosticsOptions>(options => {
    // Custom call tracer
    options.CallTracerFactory = (hub, methodDef) =>
        new MyCustomCallTracer(methodDef);

    // Custom call logger that logs everything
    options.CallLoggerFactory = (hub, methodDef) =>
        new RpcCallLogger(hub, methodDef);
});
```

## `RpcRegistryOptions`

Configures RPC service and method definition creation.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ServiceDefFactory` | `Func<...>` | Creates `RpcServiceDef` | Factory to create service definitions |
| `MethodDefFactory` | `Func<...>` | Creates `RpcMethodDef` | Factory to create method definitions |
| `ServiceScopeResolver` | `Func<...>` | "Backend" or "Api" | Determines service scope |

### Example

```csharp
services.AddRpc().Configure<RpcRegistryOptions>(options => {
    // Custom service scope resolution
    options.ServiceScopeResolver = (hub, serviceType) =>
        serviceType.Name.StartsWith("IInternal") ? "Backend" : "Api";
});
```

## `RpcWebSocketClientOptions`

Configures WebSocket-based RPC client connections.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `RequestPath` | `string` | `"/rpc/ws"` | WebSocket endpoint path for API calls |
| `BackendRequestPath` | `string` | `"/backend/rpc/ws"` | WebSocket endpoint path for backend calls. **Must NOT be publicly exposed!** |
| `SerializationFormatParameterName` | `string` | `"f"` | Query parameter for serialization format |
| `ClientIdParameterName` | `string` | `"clientId"` | Query parameter for client ID |
| `UseAutoFrameDelayerFactory` | `bool` | `false` | Enable automatic frame delaying |
| `HostUrlResolver` | `Func<...>` | Uses `peer.Ref.HostInfo` | Resolves host URL from peer reference |
| `ConnectionUriResolver` | `Func<...>` | HTTP→WS conversion | Creates WebSocket connection URI |
| `WebSocketTransportOptionsFactory` | `Func<...>` | Auto | Creates RpcWebSocketTransport options |
| `WebSocketOwnerFactory` | `Func<...>` | `ClientWebSocket` | Creates WebSocket instances |
| `FrameDelayerFactory` | `Func<...>` | `None` | Frame delaying mechanism |

### Example

```csharp
services.AddRpc().Configure<RpcWebSocketClientOptions>(options => {
    // Custom endpoint paths
    options.RequestPath = "/api/rpc";
    options.BackendRequestPath = "/internal/rpc"; // Must NOT be publicly exposed!

    // Custom host URL resolution
    options.HostUrlResolver = peer => {
        // Load balancer logic, etc.
        return "https://api.example.com";
    };

    // Enable frame delaying for high-latency connections
    options.UseAutoFrameDelayerFactory = true;
});
```

> **Warning:** `BackendRequestPath` must never be publicly exposed. It should only be accessible between backend services within your infrastructure.

## `RpcWebSocketServerOptions`

Configures WebSocket-based RPC server endpoints.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ExposeBackend` | `bool` | `false` | Whether to expose backend services via WebSocket. **Use with caution!** |
| `RequestPath` | `string` | `"/rpc/ws"` | WebSocket endpoint path for API calls |
| `BackendRequestPath` | `string` | `"/backend/rpc/ws"` | WebSocket endpoint path for backend calls. **Must NOT be publicly exposed!** |
| `SerializationFormatParameterName` | `string` | `"f"` | Query parameter for serialization format |
| `ClientIdParameterName` | `string` | `"clientId"` | Query parameter for client ID |
| `ConfigureWebSocket` | `Func<...>` | Empty context | Configure WebSocketAcceptContext (.NET 6+) |

### Example

```csharp
services.AddRpc().Configure<RpcWebSocketServerOptions>(options => {
    // Expose backend services (be careful with security!)
    options.ExposeBackend = true;

    // Custom endpoint paths (must match client)
    options.RequestPath = "/api/rpc";
    options.BackendRequestPath = "/internal/rpc"; // Must NOT be publicly exposed!
});
```

> **Warning:** `BackendRequestPath` must never be publicly exposed. Ensure this endpoint is only accessible within your internal network or via service mesh. If `ExposeBackend` is `true`, take extra care to secure this endpoint.

## `RpcTestClientOptions`

Configures test client for RPC testing with in-memory channels.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `SerializationFormatKey` | `string` | `""` | Serialization format identifier |
| `ChannelOptions` | `ChannelOptions` | BoundedChannelOptions(500) | Configuration for test message channels |
| `ConnectionFactory` | `Func<...>` | Twisted channel pair | Factory to create test channel pairs |

### Example

```csharp
// In tests
services.AddRpc().Configure<RpcTestClientOptions>(options => {
    // Use specific serialization format for testing
    options.SerializationFormatKey = "json";
});
```

## Configuration Patterns

### Basic Configuration

```csharp
var services = new ServiceCollection();
services.AddRpc()
    .Configure<RpcPeerOptions>(o => { /* ... */ })
    .Configure<RpcOutboundCallOptions>(o => { /* ... */ })
    .Configure<RpcWebSocketClientOptions>(o => { /* ... */ });
```

### Server-Side Configuration

```csharp
builder.Services.AddRpc()
    .Configure<RpcWebSocketServerOptions>(options => {
        options.ExposeBackend = false; // Security: don't expose internal services
        options.RequestPath = "/rpc/ws";
    });

// In middleware pipeline
app.MapRpcWebSocketServer();
```

### Client-Side Configuration

```csharp
services.AddRpc()
    .Configure<RpcWebSocketClientOptions>(options => {
        options.HostUrlResolver = peer => configuration["ApiUrl"];
    })
    .Configure<RpcOutboundCallOptions>(options => {
        options.ReroutingDelays = RetryDelaySeq.Exp(1, 30); // Longer rerouting delays
    });
```
