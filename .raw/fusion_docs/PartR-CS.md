# RPC: Cheat Sheet

Quick reference for ActualLab.Rpc setup and usage.


## Server Configuration

```cs
var fusion = builder.Services.AddFusion();
fusion.AddWebServer();
fusion.AddServer<ICartService, CartService>();

// In Program.cs
app.UseWebSockets();
app.MapRpcWebSocketServer();
```

Expose backend services (internal use only):

```cs
fusion.AddServer<IInternalService, InternalService>(isBackend: true);

builder.Services.Configure<RpcWebSocketServerOptions>(o => {
    o.ExposeBackend = true; // Be careful with security!
});
```

Custom endpoint paths:

```cs
builder.Services.Configure<RpcWebSocketServerOptions>(o => {
    o.RequestPath = "/api/rpc";
    o.BackendRequestPath = "/internal/rpc"; // Must NOT be publicly exposed!
});
```


## Client Configuration

```cs
var fusion = services.AddFusion();
var rpc = fusion.Rpc;

rpc.AddWebSocketClient(new Uri("https://api.example.com"));
fusion.AddClient<ICartService>();
```

Custom host URL resolution:

```cs
services.Configure<RpcWebSocketClientOptions>(o => {
    o.HostUrlResolver = peer => configuration["ApiUrl"];
});
```

Rerouting delays (for topology changes):

```cs
services.Configure<RpcOutboundCallOptions>(o => {
    o.ReroutingDelays = RetryDelaySeq.Exp(0.5, 10); // 0.5s to 10s
});
```


## RPC Service Interface

```cs
public interface ICartService : IRpcService
{
    Task<Cart> GetCart(long id, CancellationToken cancellationToken = default);
    Task UpdateCart(long id, Cart cart, CancellationToken cancellationToken = default);
}
```


## Compute Service Client

```cs
public interface ICartService : IComputeService
{
    [ComputeMethod]
    Task<Cart> GetCart(long id, CancellationToken cancellationToken = default);
}

// Registration
fusion.AddClient<ICartService>();

// Usage - cached results, invalidations propagate from server
var cart = await cartService.GetCart(id, cancellationToken);
```


## Fire-and-Forget (RpcNoWait)

```cs
public interface IAnalyticsService : IRpcService
{
    Task<RpcNoWait> TrackEvent(string eventName);
}

// Implementation
public Task<RpcNoWait> TrackEvent(string eventName)
{
    // Process event...
    return RpcNoWait.Tasks.Completed;
}

// Usage
await analyticsService.TrackEvent("page_view");
```


## Streaming (RpcStream)

Server-to-client streaming:

```cs
public interface IDataService : IRpcService
{
    Task<RpcStream<Item>> GetItems(CancellationToken cancellationToken = default);
}

// Implementation
public Task<RpcStream<Item>> GetItems(CancellationToken cancellationToken)
    => Task.FromResult(RpcStream.New(GetItemsAsync(cancellationToken)));

private async IAsyncEnumerable<Item> GetItemsAsync(
    [EnumeratorCancellation] CancellationToken cancellationToken)
{
    for (var i = 0; i < 100; i++) {
        yield return new Item(i);
        await Task.Delay(100, cancellationToken);
    }
}

// Client consumption
var stream = await dataService.GetItems(cancellationToken);
await foreach (var item in stream.WithCancellation(cancellationToken)) {
    Console.WriteLine(item);
}
```

Client-to-server streaming:

```cs
Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default);

// Client usage
var numbers = new[] { 1, 2, 3, 4, 5 };
var sum = await service.Sum(RpcStream.New(numbers), cancellationToken);
```


## Server-to-Client Calls (Reverse RPC)

Define client-side service:

```cs
public interface IClientNotifier : IRpcService
{
    Task<RpcNoWait> Notify(string message);
}
```

Call client from server:

```cs
public async Task<RpcNoWait> SendMessage(string message)
{
    var peer = RpcInboundContext.GetCurrent().Peer;

    Task<RpcNoWait> task;
    using (new RpcOutboundCallSetup(peer).Activate())
        task = clientNotifier.Notify(message);
    await task;

    return default;
}
```


## Call Routing

Custom routing (e.g., sharding):

```cs
services.AddSingleton(_ => RpcOutboundCallOptions.Default with {
    RouterFactory = methodDef => args => {
        if (methodDef.Service.Type == typeof(IMyService)) {
            var key = args.Get<string>(0);
            var hash = key.GetXxHash3();
            return peerRefs[hash.PositiveModulo(serverCount)];
        }
        return RpcPeerRef.Default;
    }
});
```

Custom PeerRef with dynamic rerouting:

```cs
public class MyShardPeerRef : RpcPeerRef
{
    public MyShardPeerRef(string shardId)
    {
        HostInfo = shardId;
        RouteState = new RpcRouteState();
        // Monitor topology, call RouteState.MarkChanged() when target changes
    }
}
```


## RpcHub

```cs
var rpcHub = services.RpcHub();
// or: services.GetRequiredService<RpcHub>();

var client = rpcHub.GetClient<IUserService>();   // Get client proxy
var peer = rpcHub.GetClientPeer(RpcPeerRef.Default);  // Get default peer
```


## RpcPeer

```cs
// Wait for connection
await peer.WhenConnected(cancellationToken);

// Check connection status
if (peer.IsConnected()) { /* ... */ }

// Disconnect
await peer.Disconnect();
```


## RpcPeerRef

```cs
RpcPeerRef.Default   // Default remote peer
RpcPeerRef.Loopback  // In-process loopback (for tests)
RpcPeerRef.Local     // Local (same-process) calls

// Custom peer ref
var peerRef = RpcPeerRef.NewClient(hostInfo: "https://api.example.com");
```


## RpcInboundContext

```cs
// Inside an RPC method
var context = RpcInboundContext.GetCurrent();
var peer = context.Peer;        // The peer that made this call
var message = context.Message;  // The RPC message
```
