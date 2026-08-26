# Fire-and-Forget Calls with RpcNoWait

Sometimes you need to send a message to the server without waiting for a response.
Common use cases include:
- Sending analytics events
- Ping/heartbeat messages
- Push notifications from server to client (reverse RPC)
- Any scenario where you don't need confirmation

`RpcNoWait` is a special return type that tells ActualLab.Rpc to fire the call without waiting for the response.


## Defining RpcNoWait Methods

Use `Task<RpcNoWait>` as the return type for fire-and-forget methods:

```cs
public interface ISimpleService : IRpcService
{
    // Fire-and-forget method - caller won't wait for completion
    Task<RpcNoWait> Ping(string message);
}
```


## Implementing RpcNoWait Methods

The server-side implementation should return `default` (or `RpcNoWait.Tasks.Completed` for synchronous completion):

```cs
public class SimpleService : ISimpleService
{
    public async Task<RpcNoWait> Ping(string message)
    {
        // Process the message (e.g., log it, update state, etc.)
        Console.WriteLine($"Received ping: {message}");

        // Return default - the caller won't wait for this anyway
        return default;
    }
}
```


## Calling RpcNoWait Methods

From the client side, you can await the call or ignore the result:

```cs
// You can await it - completes immediately after sending
await simpleService.Ping("Hello!");

// Or fire-and-forget (but be aware of potential connection issues)
_ = simpleService.Ping("Hello!");
```

::: warning Important
RpcNoWait calls are **dropped if there is no active connection**. They are not queued or retried.
To maximize delivery likelihood, wait for the connection to be established first:

```cs
var peer = services.RpcHub().GetClientPeer(RpcPeerRef.Default);
await peer.WhenConnected(cancellationToken);
await simpleService.Ping("Now it's very likely to be sent!");
```
:::


## Server-to-Client Calls

`RpcNoWait` is commonly used for server-to-client (reverse RPC) calls. See [Server-to-Client Calls](./PartR-ReverseRpc.md) for details.
