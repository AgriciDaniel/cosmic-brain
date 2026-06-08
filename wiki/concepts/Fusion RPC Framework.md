---
type: concept
title: "Fusion RPC Framework"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - rpc
  - networking
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion TypeScript Port]]"
  - "[[Fusion Performance & Benchmarks]]"
source: "[[fusion-docs-overview]]"
---

# ActualLab.RPC Framework

ActualLab.Rpc is a high-performance RPC framework built on WebSockets, designed to support Fusion's Remote Compute Service scenario. It's the fastest RPC on .NET — **2-7x faster than gRPC and SignalR** — and will support WebTransport in the near future.

## Compute Service Clients

Compute Service Clients are remote proxies for Compute Services that replicate `Computed<T>` behavior on the client side:

1. **Consistent behavior**: client-side `Computed<T>` mirrors the server-side one; invalidation cascades across the network
2. **Efficient caching**: no remote call when a consistent replica is available
3. **Automatic invalidation**: client replicas invalidate when server counterparts change
4. **Resilience**: transparent reconnection, persistent client-side caching, ETag-style checks on reconnect

## Required Packages

| Package | Purpose |
|---------|---------|
| `ActualLab.Rpc` | RPC client: WebSocket transport, service clients |
| `ActualLab.Rpc.Server` | RPC server: ASP.NET Core hosting |
| `ActualLab.Fusion` | *(Optional)* Adds Compute Service Clients on top of RPC |

## Usage Pattern

### 1. Shared Interface

```csharp
public interface IChatService : IComputeService
{
    [ComputeMethod]
    Task<List<string>> GetRecentMessages(CancellationToken ct = default);

    [ComputeMethod]
    Task<int> GetWordCount(CancellationToken ct = default);

    Task Post(string message, CancellationToken ct = default);
}
```

### 2. Server Implementation

```csharp
public class ChatService : IChatService
{
    private List<string> _posts = new();

    public virtual Task<List<string>> GetRecentMessages(CancellationToken ct = default)
        => Task.FromResult(_posts);

    public virtual async Task<int> GetWordCount(CancellationToken ct = default)
    {
        var messages = await GetRecentMessages(ct);
        return messages.Sum(m => m.Split(' ').Length);
    }

    public Task Post(string message, CancellationToken ct = default)
    {
        lock (_lock) { _posts.Add(message); }
        using (Invalidation.Begin()) {
            _ = GetRecentMessages(default); // Invalidate
        }
        return Task.CompletedTask;
    }
}
```

### 3. Server Registration

```csharp
var fusion = services.AddFusion();
fusion.Rpc.AddWebSocketServer();
fusion.AddService<ChatService>();
```

### 4. Client Registration

```csharp
var fusion = services.AddFusion();
fusion.Rpc.AddWebSocketClient("wss://myserver/rpc/ws");
fusion.AddClient<IChatService>();
```

### 5. Client Usage

```csharp
var chat = services.GetRequiredService<IChatService>();
// Same interface, same behavior, but runs over WebSocket
var messages = await chat.GetRecentMessages();
```

## Key RPC Features

### RpcStream\<T\>

Typed streaming over RPC connections — full-duplex typed channels for streaming data between client and server.

### RpcNoWait

Fire-and-forget RPC calls that don't wait for a response:

```csharp
await chat.Post("hello").RpcNoWait();
```

### Reverse RPC

Server-to-client calls. The server can invoke methods on the client, enabling push notifications without polling.

### Call Routing

`RpcCallRouter` directs calls to specific peers based on routing rules. Supports sharding, load balancing, and failover across server clusters.

### Serialization

RPC uses MemoryPack or MessagePack for efficient binary serialization. Custom serializers can be plugged in via `IByteSerializer`.

## Distributed Dependency Graph

When a compute method on the server is invalidated:

1. The invalidation propagates through the server's dependency graph
2. It crosses the network boundary to any client observing that computed value
3. The client's replica becomes inconsistent
4. Any client-side `ComputedState<T>` depending on it auto-revalidates after its update delay
5. The Blazor component re-renders with fresh data

All of this happens automatically — no SignalR hubs, no event handlers, no manual pub/sub.
