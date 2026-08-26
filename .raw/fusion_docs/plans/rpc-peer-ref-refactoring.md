# RpcPeerRef Refactoring Plan

## Goal

Replace `RpcPeerRef` (a complex class with 6+ responsibilities) with a `Symbol`-based peer identity
plus dedicated services for lifecycle management and configuration.

## Current Responsibilities of RpcPeerRef (too many for one type)

| # | Role | Properties/Behavior |
|---|------|---------------------|
| 1 | **Identity** | `Address` string, used as `RpcHub.Peers` dictionary key |
| 2 | **Config bag** | `IsServer`, `IsBackend`, `ConnectionKind`, `SerializationFormat`, `HostInfo`, `Versions` |
| 3 | **Lifecycle signal** | `RouteState` — triggers peer disposal on reroute |
| 4 | **Caching point** | Subclasses (`RpcShardPeerRef`, `RpcHostPeerRef`) cache instances in static dictionaries |
| 5 | **Address codec** | `Initialize()` formats address from properties; `FromAddress()` parses back |
| 6 | **Dual equality** | `UseReferentialEquality` flag switches between address-based and referential equality |

## Problems with Current Design

1. **Initialization ceremony** — `Initialize()` must be called before `Address`/`Versions` are usable,
   guarded by `ThrowIfUninitialized()`. The object is invalid after construction.

2. **Dual equality is confusing** — `UseReferentialEquality` makes the same *type* behave differently
   depending on an internal flag. Server refs use address equality (so reconnecting clients find the
   same peer), mesh refs use referential equality (because they're cached).
   This is a hidden behavioral fork.

3. **Subclassing an identifier** — `RpcShardPeerRef` and `ShardPeerRef` subclass `RpcPeerRef` to add
   domain-specific properties (`ShardRef`, `MeshMap`) and lifecycle logic (monitoring mesh state,
   calling `RouteState.MarkChanged()`). But an *identifier* shouldn't be responsible for monitoring
   external state and managing lifecycle.

4. **RouteState on the ref** — The ref is supposed to *identify* a peer, but it also *controls* when
   that peer should die. `RpcHub.GetPeer()` has to reach into the ref to subscribe to
   `RouteState.WhenChanged()`. This couples identity to lifecycle.

## Proposed Design: `Symbol` + `RpcPeerState` + Lifetime Controller

### 1. Peer Identity → `Symbol`

The current `Address` string already encodes everything: `rpc.backend.server.msgpack://hostinfo`.
It's a perfect `Symbol`. Equality is always value-based — no more dual equality modes.

```csharp
// The peer identity is just a Symbol (interned string with fast equality)
Symbol peerId = "rpc.backend.server://default";

// Or, if type safety is desired:
public readonly record struct RpcPeerId(Symbol Value);
```

### 2. Peer Configuration → `RpcPeerState`

The properties that `RpcPeer` reads at construction (`IsServer`, `IsBackend`, `ConnectionKind`,
`SerializationFormat`, `Versions`) move to a config/state object. This is either:
- **Parsed from the Symbol** (the address format already encodes all config flags)
- **Provided by a factory/resolver** when creating a peer

```csharp
// Immutable config parsed from or associated with a peer Symbol
public sealed class RpcPeerState
{
    public Symbol Id { get; }            // The peer symbol
    public bool IsServer { get; }
    public bool IsBackend { get; }
    public RpcPeerConnectionKind ConnectionKind { get; }
    public string SerializationFormat { get; }
    public string HostInfo { get; }
    public VersionSet Versions { get; }

    // No RouteState here — lifecycle is separate
    // No initialization ceremony — fully valid after construction
    // No equality override — identity is the Symbol
}
```

Since `RpcPeer` already copies most of these properties into its own fields at construction,
`RpcPeerState` could be transient — used only during peer creation, then discarded.

### 3. Lifecycle → `IRpcPeerLifetimeController`

The routing/rerouting logic moves to a service. This replaces what `RouteState` does on
`RpcPeerRef` and what subclasses do in their constructors.

```csharp
public interface IRpcPeerLifetimeController
{
    // Called by RpcHub when a peer is created — returns a token that signals
    // when the peer should be disposed (rerouted). Null = no rerouting.
    RpcRouteState? GetRouteState(Symbol peerId, RpcPeerState state);
}
```

For simple (non-mesh) peers, the default implementation returns `null` (no rerouting).
For mesh RPC, the implementation monitors shard-to-host mappings:

```csharp
// Mesh implementation
class MeshPeerLifetimeController : IRpcPeerLifetimeController
{
    public RpcRouteState? GetRouteState(Symbol peerId, RpcPeerState state)
    {
        var shardRef = ParseShardRef(peerId);
        if (shardRef == null) return null;

        var routeState = new RpcRouteState();
        // Monitor mesh state and call routeState.MarkChanged() when host changes
        _ = Task.Run(() => MonitorShardHost(shardRef, routeState));
        return routeState;
    }
}
```

This replaces the `RpcShardPeerRef` constructor logic — but now it's a service, injected via DI,
testable, replaceable.

### 4. Peer Caching → `IRpcPeerResolver`

Currently `RpcShardPeerRef` caches instances in a `static ConcurrentDictionary<ShardRef, ...>`.
With the new design, caching moves to a peer resolver:

```csharp
public interface IRpcPeerResolver
{
    // Resolves a shard/host/etc. to a peer Symbol
    // Handles caching and cache invalidation internally
    Symbol ResolvePeer(ShardRef shardRef);
}
```

The resolver caches the Symbol-to-host mapping and invalidates when the mesh state changes.
Caching is now a separate concern from identity.

### 5. Updated `RpcHub.GetPeer`

```csharp
// Before:
public RpcPeer GetPeer(RpcPeerRef peerRef) {
    if (Peers.TryGetValue(peerRef, out var peer)) return peer;
    lock (Lock) {
        // ... create peer from peerRef, subscribe to peerRef.RouteState
    }
}

// After:
public RpcPeer GetPeer(Symbol peerId) {
    if (Peers.TryGetValue(peerId, out var peer)) return peer;
    lock (Lock) {
        var state = PeerStateFactory.Create(peerId);        // Parse/resolve config
        peer = PeerFactory.Create(this, state);              // Create peer
        Peers[peerId] = peer;
        var routeState = LifetimeController.GetRouteState(peerId, state);  // Lifecycle
        if (routeState != null)
            _ = routeState.WhenChanged().ContinueWith(_ => peer.Dispose());
        peer.Start(isolate: true);
        return peer;
    }
}
```

### 6. Runtime Property Access Changes

Currently, code accesses `peer.Ref.IsServer`, `peer.Ref.IsBackend`, `peer.Ref.RouteState`
at runtime. With the refactoring:

| Before | After | Notes |
|--------|-------|-------|
| `peer.Ref` | `peer.Id` (Symbol) | For logging, display |
| `peer.Ref.IsServer` | `peer.IsServer` | Already available via `ConnectionKind` |
| `peer.Ref.IsBackend` | `peer.IsBackend` | Add to `RpcPeer` |
| `peer.Ref.RouteState` | `peer.RouteState` | Move to `RpcPeer` — it's the peer's lifetime |
| `peer.Ref.HostInfo` | `peer.HostInfo` | Add to `RpcPeer` |
| `peer.Ref.Address` | `peer.Id.Value` | Symbol is the address |

This is arguably *more correct* — the peer itself should know its own route state,
not delegate to its identifier.

## Impact Assessment

### What gets simpler

- `RpcPeerRef` disappears or becomes a trivial type (record/struct with an address string)
- No more initialization ceremony
- No more dual equality semantics
- No more subclassing an identifier type
- Lifecycle management becomes explicit and DI-friendly
- `RpcHub.Peers` keyed by `Symbol` — straightforward

### What gets more complex

- Need a `PeerStateFactory` or parser to extract config from a Symbol
- Need `IRpcPeerLifetimeController` service (but it's just extracting existing logic)
- Mesh RPC needs a resolver service instead of a cached subclass constructor

### Breaking changes

- Every place that creates/uses `RpcPeerRef` needs updating (~36 files)
- Subclass pattern (`RpcShardPeerRef`, `ShardPeerRef`) replaced by services
- `RpcPeerOptions.PeerFactory` signature changes
- Samples and docs need updating

### Trade-off Summary

| Aspect | Current (`RpcPeerRef` class) | Proposed (`Symbol` + services) |
|--------|------------------------------|--------------------------------|
| Identity | Complex class with dual equality | Simple Symbol/string |
| Config | Properties on ref, lazy init | Parsed from symbol or provided by factory |
| Lifecycle | `RouteState` on ref, subscribed in Hub | Controller service, `RouteState` on Peer |
| Mesh caching | Static dicts in subclass constructors | Resolver service |
| Extensibility | Subclass `RpcPeerRef` | Implement controller/resolver interfaces |
| API surface | 1 complex type | 2-3 simple types + 1-2 interfaces |

## Migration Path

### Step 1: Move `RouteState` from `RpcPeerRef` to `RpcPeer` (least disruptive, biggest clarity win)

- Add `RouteState` property to `RpcPeer`
- `RpcHub.GetPeer` sets it on the peer instead of reading from `peerRef.RouteState`
- All runtime `peer.Ref.RouteState` accesses become `peer.RouteState`
- `RpcPeerRef.RouteState` deprecated or removed

### Step 2: Make `RpcPeerRef` immutable/fully-initialized-at-construction (eliminate `Initialize()`)

- Compute `Address` and `Versions` in constructor/factory
- Remove `ThrowIfUninitialized` guards
- Remove `IsInitialized` flag

### Step 3: Replace `RpcPeerRef` with `Symbol` and extract a lifetime controller

- Introduce `IRpcPeerLifetimeController`
- Change `RpcHub.Peers` key type to `Symbol`
- `RpcPeerRef` becomes `RpcPeerState` (config-only, no identity)
- Update `RpcPeerOptions` delegate signatures

### Step 4: Replace mesh subclasses with resolver/controller services

- Replace `RpcShardPeerRef` with `IRpcPeerResolver` + `MeshPeerLifetimeController`
- Replace `RpcHostPeerRef` with `IRpcPeerResolver`
- Replace `ShardPeerRef` (test) with test resolver/controller
- Update samples and docs

**Note:** Step 1 alone already significantly simplifies things.
Steps 2-4 are progressively more invasive but each adds clarity.

## Files Affected

### Core (src/ActualLab.Rpc)
- `RpcPeerRef.cs`, `RpcPeerRef.Static.cs` — main type, replaced or simplified
- `RpcPeerRefExt.cs` — extensions, adapt to new types
- `RpcPeerRefAddress.cs` — address formatting/parsing, becomes state factory
- `RpcRouteState.cs` — stays, but ownership changes
- `RpcHub.cs` — dictionary key type, `GetPeer` signature
- `RpcPeer.cs` — gains `RouteState`, `IsBackend`, `HostInfo`
- `RpcClientPeer.cs`, `RpcServerPeer.cs` — constructor signature
- `RpcPeerOptions.cs` — delegate signatures
- `RpcClient.cs`, `RpcTestClient.cs` — peer ref creation
- `RpcWebSocketServer.cs` — server peer ref creation
- `RpcInterceptor.cs`, `RpcOutboundCall.cs`, `RpcOutboundContext.cs`, `RpcCallTrackers.cs` — RouteState access
- `RpcFrameDelayerFactories.cs` — IsBackend access
- `Errors.cs` — remote party name

### Samples
- `samples/MeshRpc/Rpc/RpcShardPeerRef.cs` — replaced by services
- `samples/MeshRpc/Rpc/RpcHostPeerRef.cs` — replaced by services
- `samples/MeshRpc/Rpc/IMeshPeerRef.cs` — removed or adapted

### Tests
- `tests/.../MeshRpc/Infrastructure/ShardPeerRef.cs` — replaced by test services
- `tests/.../RpcTestBase.cs` — updated peer ref creation
