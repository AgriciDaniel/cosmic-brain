# ActualLab.Rpc Key Concepts

This document describes the key abstractions in ActualLab.Rpc that power distributed compute services.

## Overview

ActualLab.Rpc is built around a few core abstractions:

<img src="/img/diagrams/PartR-CC-1.svg" alt="RPC Core Abstractions Overview" />

## `RpcHub`

`RpcHub` is the central orchestrator for the entire RPC system. It's registered as a singleton in DI and manages:

- Peer connections and their lifecycle
- RPC service client and server proxies
- Configuration, serialization formats, and middleware

### Key Properties

| Property               | Description                                                           |
|------------------------|-----------------------------------------------------------------------|
| `Configuration`        | RPC configuration settings                                            |
| `ServiceRegistry`      | Registry of RPC service definitions                                   |
| `SerializationFormats` | Available serialization format resolvers                              |
| `Peers`                | Collection of active peer instances                                   |
| `DefaultPeer`          | The default peer for outbound calls                                   |
| `LoopbackPeer`         | Peer for in-process loopback connections - **for use in tests only**  |
| `LocalPeer`            | Peer for local (same-process) calls                                   |

### Key Methods

```csharp
// Get or create a peer by reference
RpcPeer GetPeer(RpcPeerRef peerRef);

// Get specifically typed peers
RpcClientPeer GetClientPeer(RpcPeerRef peerRef);
RpcServerPeer GetServerPeer(RpcPeerRef peerRef);

// Get RPC service proxies
TService GetClient<TService>() where TService : class, IRpcService;
TService GetServer<TService>() where TService : class, IRpcService;
```

### Usage Example

```csharp
// Get RpcHub from DI
var rpcHub = services.GetRequiredService<RpcHub>();

// Get a client proxy for a service
var userService = rpcHub.GetClient<IUserService>();

// Get default peer
var defaultPeer = rpcHub.DefaultPeer;
```

## `RpcPeerRef`

`RpcPeerRef` is an immutable reference that identifies a remote or local peer. Think of it as an "address" for an RPC endpoint.

### Key Properties

| Property | Description |
|----------|-------------|
| `Address` | Unique address string identifying the peer |
| `IsServer` | Whether this refers to a server-side peer |
| `IsBackend` | Whether this is a backend (internal) peer |
| `ConnectionKind` | Type of connection (Remote, Loopback, Local, None) |
| `SerializationFormat` | Name of serialization format to use |
| `HostInfo` | Host identifier (URL or other identifier) |
| `Versions` | Supported API versions |

### Well-Known Peer Refs

```csharp
RpcPeerRef.Default   // Default remote peer
RpcPeerRef.Loopback  // In-process loopback
RpcPeerRef.Local     // Local (same-process) calls
RpcPeerRef.None      // No peer (null object)
```

### Creating Peer Refs

```csharp
// Create a client peer ref (for outbound connections)
var clientRef = RpcPeerRef.NewClient(hostInfo: "https://api.example.com");

// Create a server peer ref (for inbound connections)
var serverRef = RpcPeerRef.NewServer(hostInfo: "client-123");

// Peer refs must be initialized before use
clientRef = clientRef.Initialize();
```

## `RpcPeer`

`RpcPeer` is the abstract base class that manages an actual connection to a peer. It handles:

- Connection lifecycle (connect, disconnect, reconnect)
- Handshake exchange
- Message processing
- Call tracking

### Key Properties

| Property | Description |
|----------|-------------|
| `Hub` | Reference to the parent RpcHub |
| `Ref` | The RpcPeerRef this peer represents |
| `Id` | Unique Guid for this peer instance |
| `ConnectionState` | Current connection state (AsyncState) |
| `ConnectionKind` | Type of connection |
| `Versions` | Supported API versions |
| `SerializationFormat` | Current serialization format |
| `InboundCalls` | Tracker for incoming RPC calls |
| `OutboundCalls` | Tracker for outgoing RPC calls |

### Key Methods

```csharp
// Send a message to the peer
void Send(RpcMessage message, ChannelWriter<RpcMessage>? sender = null);

// Check connection status
bool IsConnected();

// Wait for connection to be established
Task<(RpcHandshake Handshake, RpcTransport Transport)> WhenConnected(CancellationToken cancellationToken = default);

// Disconnect the peer
Task Disconnect(Exception? error = null, CancellationToken cancellationToken = default);
```

### Concrete Implementations

#### `RpcClientPeer`

Represents a client-side outbound connection. It:
- Initiates connections to remote servers
- Handles reconnection with exponential backoff
- Has a unique `ClientId` for identification

```csharp
public sealed class RpcClientPeer : RpcPeer
{
    public string ClientId { get; }           // Unique client identifier
    public AsyncState<Moment> ReconnectsAt;   // Next reconnection time
}
```

#### `RpcServerPeer`

Represents a server-side inbound connection. It:
- Waits for connections to be provided by the server framework
- Receives connections via `SetNextConnection()`

```csharp
public sealed class RpcServerPeer : RpcPeer
{
    // Called by server framework when a client connects
    public Task SetNextConnection(RpcConnection connection, CancellationToken cancellationToken);
}
```

## `RpcConnection`

`RpcConnection` wraps a message channel for transport. It encapsulates:

- A `Channel<RpcMessage>` for bidirectional communication
- Connection metadata via `Properties`
- Connection type indicator (`IsLocal`)

```csharp
public sealed class RpcConnection
{
    public Channel<RpcMessage> Channel { get; }
    public PropertyBag Properties { get; }
    public bool IsLocal { get; }
}
```

## `RpcPeerConnectionState`

An immutable snapshot of a peer's connection state at a point in time.

### Key Properties

| Property | Description |
|----------|-------------|
| `Connection` | Current RpcConnection |
| `Handshake` | Remote peer's handshake info |
| `OwnHandshake` | Local peer's handshake info |
| `Error` | Error if disconnected |
| `ConnectionAttemptIndex` | Reconnection attempt number |

### State Transitions

```csharp
// Check if connected
bool IsConnected();

// Transition to connected state
RpcPeerConnectionState NextConnected(RpcConnection connection, RpcHandshake handshake);

// Transition to disconnected state
RpcPeerConnectionState NextDisconnected(Exception? error);
```

## `RpcHandshake`

Immutable handshake message exchanged when a connection is established. It enables peer identification and compatibility checking.

### Key Properties

| Property | Description |
|----------|-------------|
| `RemotePeerId` | Guid of the remote peer |
| `RemoteApiVersionSet` | Supported API versions |
| `RemoteHubId` | Guid of the remote RpcHub |
| `ProtocolVersion` | RPC protocol version |
| `Index` | Handshake sequence number |

## `RpcMessage`

Immutable serializable message that carries RPC calls and responses.

### Key Properties

| Property | Description |
|----------|-------------|
| `CallTypeId` | Type of call (request, response, system) |
| `RelatedId` | Links requests to responses |
| `MethodRef` | RPC method being called |
| `ArgumentData` | Serialized argument bytes |
| `Headers` | Optional RPC headers |

## `RpcClient`

Abstract service for establishing client-side connections.

### Key Methods

```csharp
// Establish a remote connection (e.g., WebSocket)
protected abstract Task<RpcConnection> ConnectRemote(
    RpcClientPeer peer,
    CancellationToken cancellationToken);

// Create an in-process loopback connection pair
protected virtual Task<RpcConnection> ConnectLoopback(
    RpcClientPeer peer,
    CancellationToken cancellationToken);
```

The primary implementation is `RpcWebSocketClient`, which establishes WebSocket connections.

## `IRpcService`

Marker interface for RPC services. Any service that should be callable via RPC must implement this interface:

```csharp
public interface IUserService : IRpcService
{
    Task<User?> GetUser(long id, CancellationToken cancellationToken = default);
    Task UpdateUser(long id, User user, CancellationToken cancellationToken = default);
}
```

## Connection Lifecycle

```
1. RpcHub.GetPeer(peerRef) creates or retrieves RpcPeer
                │
2. RpcClientPeer.GetConnection() establishes connection
   └── RpcClient.ConnectRemote() or ConnectLoopback()
                │
3. Handshake exchange (RpcHandshake)
   └── Both peers send their handshake info
                │
4. Message processing loop
   └── RpcMessage sent/received via Channel
                │
5. On disconnect: reconnection with exponential backoff
   └── RpcClientPeer tracks ReconnectsAt
```

## Relationship Diagram

<img src="/img/diagrams/PartR-CC-2.svg" alt="RPC Architecture Relationship Diagram" />
