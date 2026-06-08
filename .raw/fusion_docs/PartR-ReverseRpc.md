# Server-to-Client Calls (Reverse RPC)

ActualLab.Rpc supports bidirectional communication, allowing the server to call methods on clients.
This is useful for push notifications, real-time updates, or any bidirectional communication pattern.


## How It Works

In a typical RPC setup, clients call server methods. Reverse RPC flips this: the server can invoke methods on a connected client. The flow is:

1. Client connects to server and registers a client-side service
2. Server receives a call from the client
3. Server uses `RpcInboundContext` to get the calling peer (client)
4. Server uses `RpcOutboundCallSetup` to route a call back to that specific client


## Defining Client-Side Services

Define an interface for the service that will run on the client:

```cs
public interface ISimpleClientSideService : IRpcService
{
    // Server calls this on the client
    Task<RpcNoWait> Pong(string message);
}
```

::: tip
Using `Task<RpcNoWait>` is recommended for server-to-client calls since the server typically doesn't need to wait for the client's response.
:::


## Implementing the Client-Side Service

The client implements the service and registers it with DI:

```cs
public class SimpleClientSideService : ISimpleClientSideService
{
    public Channel<string> PongChannel { get; } = Channel.CreateUnbounded<string>();

    public Task<RpcNoWait> Pong(string message)
    {
        // Process the incoming message from the server
        _ = PongChannel.Writer.WriteAsync(message);
        return RpcNoWait.Tasks.Completed;
    }
}
```

Register it in the client's DI container:

```cs
services.AddSingleton<SimpleClientSideService>();
services.AddSingleton<ISimpleClientSideService>(c => c.GetRequiredService<SimpleClientSideService>());
```


## Calling the Client from the Server

The server uses `RpcInboundContext` to identify the calling client and `RpcOutboundCallSetup` to route the response:

```cs
public class SimpleService(ISimpleClientSideService clientSideService) : ISimpleService
{
    public async Task<RpcNoWait> Ping(string message)
    {
        // Get the peer (client) that made this call
        var peer = RpcInboundContext.GetCurrent().Peer;

        // Route the call to that specific peer
        Task<RpcNoWait> pongTask;
        using (new RpcOutboundCallSetup(peer).Activate()) // No "await" inside this block!
            pongTask = clientSideService.Pong($"Pong to '{message}'");
        await pongTask.ConfigureAwait(false);

        return default;
    }
}
```


## RpcOutboundCallSetup

`RpcOutboundCallSetup` controls how outbound RPC calls are routed. It's essential for reverse RPC because it lets you specify exactly which peer should receive the call.

### Basic Usage

```cs
// Route call to a specific peer
using (new RpcOutboundCallSetup(peer).Activate())
    task = service.Method();
await task;
```

::: danger Critical
**Never use `await` inside the `using (....Activate())` block.** Capture the task and await it after the block ends. The setup is consumed when the call starts, so awaiting inside would cause issues with subsequent calls.
:::

### Constructors

| Constructor | Description |
|-------------|-------------|
| `RpcOutboundCallSetup()` | Creates setup with `RpcRoutingMode.Outbound` (default routing) |
| `RpcOutboundCallSetup(RpcPeer peer)` | Routes to specific peer with `RpcRoutingMode.Prerouted` |
| `RpcOutboundCallSetup(RpcPeer peer, RpcRoutingMode mode)` | Routes to specific peer with custom routing mode |

### Routing Modes

`RpcRoutingMode` controls how the call is routed:

| Mode | Description |
|------|-------------|
| `Outbound` | Default routing via `RpcMethodDef.RouteOutboundCall` |
| `Inbound` | Routes via `RpcMethodDef.RouteInboundCall` |
| `Prerouted` | Call is pre-routed to the specified peer (used with reverse RPC) |

### Optional Properties

```cs
var setup = new RpcOutboundCallSetup(peer) {
    Headers = [...],           // Custom RPC headers (rarely needed)
    CacheInfoCapture = ...,    // For cache info capture scenarios
};
```

### Accessing the Produced Context

After the call starts, you can access the `RpcOutboundContext` that was created:

```cs
var setup = new RpcOutboundCallSetup(peer);
Task task;
using (setup.Activate())
    task = service.Method();

var context = setup.ProducedContext; // Available after call starts
await task;
```


## Complete Example

See the [TodoApp RpcExamplePage](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/Pages/RpcExamplePage.razor) for a complete working example demonstrating bidirectional ping-pong communication.

The example shows:
- Client sending ping messages to the server
- Server responding with pong messages back to the client
- Real-time UI updates as messages are exchanged
