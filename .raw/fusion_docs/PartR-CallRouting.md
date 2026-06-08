# Call Routing

ActualLab.Rpc supports flexible call routing, enabling scenarios like:
- **Sharding** &ndash; Route calls to specific servers based on a shard key
- **Load balancing** &ndash; Distribute calls across multiple backend servers
- **Affinity routing** &ndash; Route calls based on user ID, entity ID, or other attributes
- **Dynamic topology** &ndash; Handle server additions/removals without client restarts


## Core Concepts

### RouterFactory

The `RouterFactory` is the entry point for custom routing. It's configured via `RpcOutboundCallOptions`:

```cs
services.AddSingleton(_ => RpcOutboundCallOptions.Default with {
    RouterFactory = methodDef => args => {
        // Return RpcPeerRef based on method and arguments
        return RpcPeerRef.Default;
    }
});
```

The factory receives an `RpcMethodDef` and returns a function that maps `ArgumentList` to `RpcPeerRef`. This two-level design allows you to:
1. Inspect the method definition once (outer function)
2. Make per-call routing decisions based on arguments (inner function)


### RpcPeerRef

`RpcPeerRef` identifies the target peer for a call:

| Type | Description |
|------|-------------|
| `RpcPeerRef.Default` | The default remote peer (for single-server scenarios) |
| `RpcPeerRef.Local` | Execute locally (bypass RPC) |
| `RpcPeerRef.Loopback` | In-process loopback (for testing) |
| Custom `RpcPeerRef` | Your own peer reference with routing state |


### RpcRouteState

`RpcRouteState` enables dynamic rerouting when the target peer changes:

```cs
public class MyPeerRef : RpcPeerRef
{
    public MyPeerRef(string targetId)
    {
        HostInfo = targetId;
        RouteState = new RpcRouteState();

        // Start monitoring for topology changes
        _ = Task.Run(async () => {
            await WaitForTopologyChange();
            RouteState.MarkChanged(); // Triggers rerouting
        });
    }
}
```

When `RouteState.MarkChanged()` is called:
1. Active calls on this peer receive `RpcRerouteException`
2. The RPC interceptor catches the exception
3. After a delay (`ReroutingDelays`), the call is rerouted via `RouterFactory`


### RpcRerouteException

`RpcRerouteException` signals that a call must be rerouted to a different peer. It's thrown automatically when:
- `RouteState.MarkChanged()` is called on the peer's `RpcPeerRef`
- An inbound call arrives at a server that's no longer responsible for the shard/entity

```cs
// Throwing manually (e.g., in a service method)
throw RpcRerouteException.MustReroute("Target server changed");
```


## Simple Example: Hash-Based Routing

This example from the `MultiServerRpc` sample routes chat calls based on chat ID hash:

```cs
const int serverCount = 2;
var serverUrls = Enumerable.Range(0, serverCount)
    .Select(i => $"http://localhost:{22222 + i}/")
    .ToArray();
var clientPeerRefs = serverUrls
    .Select(url => RpcPeerRef.NewClient(url))
    .ToArray();

services.AddSingleton(_ => RpcOutboundCallOptions.Default with {
    RouterFactory = methodDef => args => {
        if (methodDef.Service.Type == typeof(IChat)) {
            var arg0Type = args.GetType(0);
            int hash;
            if (arg0Type == typeof(string))
                hash = args.Get<string>(0).GetXxHash3();
            else if (arg0Type == typeof(Chat_Post))
                hash = args.Get<Chat_Post>(0).ChatId.GetXxHash3();
            else
                throw new NotSupportedException("Can't route this call.");

            return clientPeerRefs[hash.PositiveModulo(serverCount)];
        }
        return RpcPeerRef.Default;
    }
});
```

Key points:
- Routes `IChat` calls based on the first argument (chat ID or command)
- Uses `GetXxHash3()` for consistent hashing (doesn't change between runs)
- Falls back to `RpcPeerRef.Default` for other services


## Advanced Example: Dynamic Mesh Routing

The `MeshRpc` sample demonstrates dynamic routing with automatic rerouting when topology changes.

### Custom PeerRef with RouteState

```cs
public sealed class RpcShardPeerRef : RpcPeerRef
{
    private static readonly ConcurrentDictionary<ShardRef, LazySlim<ShardRef, RpcShardPeerRef>> Cache = new();

    public ShardRef ShardRef { get; }
    public string HostId { get; }

    public static RpcShardPeerRef Get(ShardRef shardRef)
        => Cache.GetOrAdd(shardRef, static (shardRef, lazy) => new RpcShardPeerRef(shardRef, lazy));

    private RpcShardPeerRef(ShardRef shardRef, LazySlim<ShardRef, RpcShardPeerRef> lazy)
    {
        var meshState = MeshState.State.Value;
        ShardRef = shardRef;
        HostId = meshState.GetShardHost(shardRef)?.Id ?? "null";
        HostInfo = $"{shardRef}-v{meshState.Version}->{HostId}";

        // Enable rerouting
        RouteState = new RpcRouteState();

        // Monitor for topology changes
        _ = Task.Run(async () => {
            var computed = MeshState.State.Computed;
            // Wait until this host is removed from the mesh
            await computed.When(x => !x.HostById.ContainsKey(HostId), CancellationToken.None);

            // Remove from cache and trigger rerouting
            Cache.TryRemove(ShardRef, lazy);
            RouteState.MarkChanged();
        });
    }
}
```

### RouterFactory with Type-Based Routing

```cs
public Func<ArgumentList, RpcPeerRef> RouterFactory(RpcMethodDef methodDef)
    => args => {
        if (args.Length == 0)
            return RpcPeerRef.Local;

        var arg0Type = args.GetType(0);

        // Route by HostRef
        if (arg0Type == typeof(HostRef))
            return RpcHostPeerRef.Get(args.Get<HostRef>(0));
        if (typeof(IHasHostRef).IsAssignableFrom(arg0Type))
            return RpcHostPeerRef.Get(args.Get<IHasHostRef>(0).HostRef);

        // Route by ShardRef
        if (arg0Type == typeof(ShardRef))
            return RpcShardPeerRef.Get(args.Get<ShardRef>(0));
        if (typeof(IHasShardRef).IsAssignableFrom(arg0Type))
            return RpcShardPeerRef.Get(args.Get<IHasShardRef>(0).ShardRef);

        // Route by hash of first argument
        if (arg0Type == typeof(int))
            return RpcShardPeerRef.Get(ShardRef.New(args.Get<int>(0)));

        return RpcShardPeerRef.Get(ShardRef.New(args.GetUntyped(0)));
    };
```


## Rerouting Flow

When a peer's route state changes, the following sequence occurs:

<img src="/img/diagrams/PartR-CallRouting-1.svg" alt="Rerouting Flow" style="width: 100%; max-width: 800px;" />


## Local Execution Mode

When a call routes to the local server (via `RpcPeerRef.Local` or a custom peer ref pointing to the current host), `RpcLocalExecutionMode` controls how local execution coordinates with rerouting signals.

This is only relevant for **distributed services** (`RpcServiceMode.Distributed`). Non-distributed services ignore this setting.

### RpcLocalExecutionMode Values

| Mode | LocalExecutionAwaiter | Rerouting Check | Cancellation Token | Use Case |
|------|----------------------|-----------------|-------------------|----------|
| `Unconstrained` | Not awaited | None | Original token | Non-distributed services, simple calls |
| `ConstrainedEntry` | Awaited once | At entry point only | Original token | Compute services, where late reroutes are acceptable |
| `Constrained` | Awaited | At entry + during execution | Linked to `RpcRouteState.ChangedToken` | Long-running calls that must abort on reroute |

### How It Works

When a call executes locally with `RpcRouteState`:

1. **Unconstrained**: Executes immediately without coordination. Use for calls where rerouting mid-execution is acceptable.

2. **ConstrainedEntry**: Waits for `LocalExecutionAwaiter` before starting. If the route changed while waiting, throws `RpcRerouteException`. Once execution starts, it won't be interrupted.

3. **Constrained**: Same as `ConstrainedEntry`, plus the cancellation token is linked to `RpcRouteState.ChangedToken`. If the route changes during execution, the call is cancelled and rerouted. This is the most defensive mode.

### Default Modes

The default mode depends on both the **service mode** and **method type**:

| Service Mode | Method Type | Default Mode | Rationale |
|--------------|-------------|--------------|-----------|
| `Distributed` | Regular methods | `Constrained` | Commands may have side effects; must abort if route changes |
| `Distributed` | Compute methods | `ConstrainedEntry` | Read-only; safe to complete locally even if route changes |
| Non-distributed | Any | `Unconstrained` | No rerouting concerns |

**Why compute methods use `ConstrainedEntry`:**

Compute methods (methods returning `Task<T>` on `IComputeService`) are read-only operations that produce cached computed values. If a compute method starts executing locally and the route changes mid-execution:
- The client (i.e., another server that requests the value) will notice the change in topology and terminate the peer responsible for the call, which triggers rerouting of all its open calls and invalidation of compute method calls awaiting invalidation.
- So at worst, a redundant computation occurs on the "wrong" (old) server.

Using `Constrained` would unnecessarily cancel the computation, which isn't much better than a subsequent rerouting.

**Why regular distributed methods use `Constrained`:**

Regular methods on distributed services often perform commands with side effects (database writes, state mutations). If a route changes mid-execution:
- The operation might complete on a server no longer responsible for the data
- This could cause inconsistencies in a sharded system
- Aborting and rerouting ensures the correct server handles the operation

**Resolution order:**

1. Method-level `[RpcMethod(LocalExecutionMode = ...)]` attribute
2. Service-level configuration via `HasLocalExecutionMode()`
3. Auto-default based on service mode and method type

### Configuration

Configure at the **service level**:

```cs
services.AddRpc()
    .AddDistributed<IMyService, MyServiceImpl>()
    .HasLocalExecutionMode(RpcLocalExecutionMode.ConstrainedEntry);
```

Override at the **method level** using `RpcMethodAttribute`:

```cs
public interface IMyService : IRpcService
{
    // Use Unconstrained for this specific fast method
    [RpcMethod(LocalExecutionMode = RpcLocalExecutionMode.Unconstrained)]
    Task<int> GetCount(string key, CancellationToken ct);

    // Use full Constrained for this long-running method
    [RpcMethod(LocalExecutionMode = RpcLocalExecutionMode.Constrained)]
    Task<Report> GenerateReport(ReportRequest request, CancellationToken ct);
}
```

### When to Use Each Mode

- **Unconstrained**: For fast, idempotent operations where executing on the "wrong" server temporarily is acceptable. Also used internally for NoWait calls and system calls.

- **ConstrainedEntry**: For compute methods or operations that are safe to complete locally even if the route changes mid-execution. The result may be discarded, but no side effects occur.

- **Constrained**: For operations with side effects (database writes, external API calls) that must not complete on a server that's no longer responsible for the data. This ensures consistency during topology changes.


## Remote Execution Mode

While `RpcLocalExecutionMode` (above) governs how *local* execution coordinates with rerouting, `RpcRemoteExecutionMode` governs how *remote* outbound calls behave with respect to the underlying connection: whether they wait for the peer to be connected, whether they resume after a reconnect, and whether they survive a change in peer identity.

It's a `[Flags]` enum, so values can be combined with `|`.

### RpcRemoteExecutionMode Values

| Flag | Value | When set | When unset |
|------|-------|----------|------------|
| `AwaitForConnection` | `1` | Wait for the peer to connect if it's disconnected when the call is made | The call fails immediately if the peer isn't connected |
| `AllowReconnect` | `2` | Resend the call after reconnecting to the same peer | The call is aborted on disconnect |
| `AllowResend` | `6` (`4 \| AllowReconnect`) | Resend the call even after reconnecting to a *different* peer (implies `AllowReconnect`) | The call is aborted when peer identity changes |
| `Default` | `7` (`AwaitForConnection \| AllowResend`) | Wait, reconnect, and resend &mdash; the default for regular outbound calls | |

Special cases:

- **`NoWait` methods** always use `0` regardless of this setting &mdash; they're fire-and-forget by design.
- **Compute methods** must use `Default`. Any other value is rejected at registration time, because compute-call semantics rely on the call eventually reaching *some* responsible peer.

**Resolution order** (same as for `RpcLocalExecutionMode`):

1. Method-level `[RpcMethod(RemoteExecutionMode = ...)]` attribute
2. Service-level configuration via `HasRemoteExecutionMode()`
3. `RpcRemoteExecutionMode.Default`

### Configuration

Configure at the **service level**:

```cs
services.AddRpc()
    .AddClient<IMyService>()
    .HasRemoteExecutionMode(RpcRemoteExecutionMode.AwaitForConnection);
```

Override at the **method level** using `RpcMethodAttribute`:

```cs
public interface IMyService : IRpcService
{
    // Fail fast if disconnected; don't resend on reconnect
    [RpcMethod(RemoteExecutionMode = RpcRemoteExecutionMode.AwaitForConnection)]
    Task<Quote> GetLiveQuote(string symbol, CancellationToken ct);

    // Fire-and-forget: mode is forced to 0 regardless of the attribute
    Task<RpcNoWait> Ping();

    // Full default: wait, reconnect, and resend even across peer changes
    [RpcMethod(RemoteExecutionMode = RpcRemoteExecutionMode.Default)]
    Task<Report> GenerateReport(ReportRequest request, CancellationToken ct);
}
```

### TypeScript

The same enum &mdash; with identical numeric values &mdash; is available in the TypeScript client (`@actuallab/rpc`). It can be applied either through `defineRpcService(...)` or through the `@rpcMethod(...)` decorator:

```ts
import {
    defineRpcService, RpcRemoteExecutionMode, RpcType, rpcMethod, rpcService,
} from '@actuallab/rpc';

// Via defineRpcService
const MyServiceDef = defineRpcService('MyService', {
    getLiveQuote: {
        args: ['symbol'],
        remoteExecutionMode: RpcRemoteExecutionMode.AwaitForConnection,
    },
    generateReport: {
        args: ['request'],
        // remoteExecutionMode: RpcRemoteExecutionMode.Default is the default
    },
    ping: { args: [], returns: RpcType.noWait }, // always uses 0
});

// Or via decorators
@rpcService('MyService')
class MyServiceClient {
    @rpcMethod({ remoteExecutionMode: RpcRemoteExecutionMode.AwaitForConnection })
    getLiveQuote(symbol: string): Promise<Quote> { /* ... */ }
}
```

Flag values on the TS side match .NET exactly: `AwaitForConnection = 1`, `AllowReconnect = 2`, `AllowResend = 6`, `Default = 7`. `NoWait` methods are likewise forced to `0`.


## Configuration

### Rerouting Delays

Configure delays between rerouting attempts via `RpcOutboundCallOptions`:

```cs
services.AddSingleton(_ => RpcOutboundCallOptions.Default with {
    ReroutingDelays = RetryDelaySeq.Exp(0.1, 5), // 0.1s to 5s exponential backoff
});
```

The delay sequence uses exponential backoff to avoid overwhelming the system during topology changes.

### Host URL Resolution

When using custom `RpcPeerRef` types, configure how to resolve the actual host URL:

```cs
services.Configure<RpcWebSocketClientOptions>(o => {
    o.HostUrlResolver = peer => {
        if (peer.Ref is IMyMeshPeerRef meshPeerRef) {
            var host = GetHostById(meshPeerRef.HostId);
            return host?.Url ?? "";
        }
        return peer.Ref.HostInfo;
    };
});
```

### Connection Kind Detection

Detect whether a peer reference points to a local or remote peer:

```cs
services.Configure<RpcPeerOptions>(o => {
    o.ConnectionKindDetector = peerRef => {
        if (peerRef is MyShardPeerRef shardPeerRef)
            return shardPeerRef.HostId == currentHostId
                ? RpcPeerConnectionKind.Local
                : RpcPeerConnectionKind.Remote;

        return peerRef.ConnectionKind;
    };
});
```


## Best Practices

1. **Cache PeerRefs** &ndash; Create and reuse `RpcPeerRef` instances for the same routing key. The `MeshRpc` sample uses `ConcurrentDictionary` with `LazySlim` for thread-safe caching.

2. **Use consistent hashing** &ndash; Use `GetXxHash3()` or similar stable hash functions. `string.GetHashCode()` varies between runs.

3. **Handle topology changes gracefully** &ndash; Use `RpcRouteState` to automatically reroute when servers come and go.

4. **Monitor rerouting** &ndash; Rerouting is logged at Warning level. High rerouting rates may indicate topology instability.

5. **Consider local execution** &ndash; Return `RpcPeerRef.Local` when the call can be handled by the current server to avoid network overhead.
