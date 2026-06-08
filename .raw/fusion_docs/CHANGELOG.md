# Changelog

All notable changes to **ActualLab.Fusion** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`+HexNumber` after version number is the commit hash of this version.
It isn't included into the NuGet package version.

To track updates in real time, see ["Fusion/🎉Releases" on Voxt.ai](https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo).


## 13.0.3+26a8a3bd | npm: 13.0.4

Release date: 2026-05-23

This is a **major release** introducing new HTTP/2 transport for ActualLab.Rpc,
`Stream`-based and `PipeReader + PipeWriter`-based transports, and
`RpcAlternatingClient` capable of switching between transports on failures. 

### Breaking Changes
- RPC: `RpcPeer.IsConnected()`, `IsConnected(out handshake, out  transport)`, 
  and `IsConnectedOrHandshaking()` are gone from `RpcPeer`. 
  Equivalent checks now live on `RpcPeer.ConnectionState`:
  - `peer.IsConnected()` &rarr; `peer.ConnectionState.Value.IsConnected()`
  - `peer.IsConnected(out h, out t)` &rarr; `peer.ConnectionState.Value.IsConnected(out h, out t)`
  - `peer.IsConnectedOrHandshaking()` &rarr; `peer.ConnectionState.Value.IsConnectingOrConnected()`
- RPC: `RpcPeerConnectionState.IsHandshaking()` renamed to
  `IsConnecting()`; `IsConnectedOrHandshaking()` renamed to
  `IsConnectingOrConnected()`. Two new helpers: `IsDisconnected()`
  and `IsTerminal()`. State is now also exposed via the new
  `Kind` property (`RpcPeerConnectionStateKind`: `Disconnected`,
  `Connecting`, `Connected`, `Terminal`).

### Added
- RPC: full-duplex **HTTP/2 transport** similar to gRPC's &mdash;
  `RpcHttpClient` / `RpcHttpClientOptions` on the client and
  `RpcHttpServer` / `RpcHttpServerBuilder` / `RpcHttpServerOptions`
  on the server. The client streams requests via `DuplexHttpContent`;
  the server is wired through `EndpointRouteBuilderExt` with default
  delegates in `RpcHttpServerDefaultDelegates`. Protocol negotiation
  in `RpcWebHost` defaults to HTTP/2 when `UseHttpClient` is used.
- RPC: **`RpcAlternatingClient`** &mdash; a composite client that
  alternates connection attempts across multiple inner `RpcClient`s,
  tracking failed endpoints and rotating through them on reconnect.
  Useful for primary/secondary deployments and multi-region failover.
- RPC: **`RpcFrameBasedTransport`** &mdash; new base class for
  batched, frame-oriented transports. `RpcPipeTransport` (PipeReader/
  PipeWriter), `RpcStreamTransport` (Stream-based framing), and the
  existing `RpcWebSocketTransport` all derive from it, sharing frame
  composition, metrics, and buffer renewal logic.
- RPC: `RpcPeer.Extensions` (`MutablePropertyBag`) &mdash; an
  extension-point property bag for attaching ad-hoc state to a peer.

### Changed
- RPC: WebSocket transport updated to share frame composition with
  the new HTTP/2 / pipe / stream transports via
  new `RpcFrameBasedTransport` and `RpcFrameCodec`. 
  The public `RpcWebSocketTransport` surface is preserved, 
  but the internals are now shared.
- RPC: connection-state machine reshaped around a single `Kind`
  discriminator (`Disconnected` / `Connecting` / `Connected` / `Terminal`) 
  instead of inferring state from `Handshake` / `Connection` fields. 
  The `RpcClientPeer` path now fires `RpcClient.OnConnectionStateChange` 
  on every transition to enable error history-based transport changes.

### Documentation
- Homepage / SEO refresh: per-page meta descriptions, OG/Twitter
  cards, JSON-LD, self-referencing canonical URLs, refreshed copy,
  social card, and a sun hero background image.
- Added [Fusion intro slide deck](https://fusion.actuallab.net/slides/fusion-intro) 
- Linked "Videos and Slides" to the local slide decks.
- Clarified the comment and documentation style guidelines in `CODING_STYLE.md`.

### Tests
- `RpcAlternatingClientTest` covering the alternating logic and
  reconnection behaviour.
- `RpcHttpBasicTest` and `RpcHttpPerformanceTest` for the new
  HTTP/2 transport; obsolete HTTP/2 window-size configuration was
  removed from the test harness.


## 12.5.2+080e9963 | npm: 12.5.2

Release date: 2026-05-09

### Breaking Changes
- RPC: `RpcStream.BufferSize` is split into `RpcStream.AckAdvance` (the
  wire-level flow-control window, formerly named `BufferSize`) and a
  new local-only `RpcStream.BufferSize` (sender ring buffer capacity
  hint, default `0` = inherit `AckAdvance`). The MessagePack wire key
  changes from `BufferSize` to `AckAdvance`; the comma-separated text
  format keeps the same field position. Update any code that sets
  `RpcStream.BufferSize` &mdash; rename to `AckAdvance` if you meant
  the in-flight window, or leave it for the new local-buffering hint
  (and add `AckAdvance = ...` if you want a non-default window).
- TypeScript RPC: `RpcStreamRef.bufferSize`, `RpcStream.bufferSize`,
  and the `bufferSize` option in `RpcStreamOptions<T>` &rarr;
  `ackAdvance`. New optional `bufferSize` controls the local sender
  ring buffer (resolved at `RpcStreamSender` construction time and
  exposed as `sender.bufferSize`).

### Added
- RPC: `RpcStream.BufferSize` (local-only, .NET) /
  `RpcStream.bufferSize` (TypeScript, optional) lets real-time senders
  pre-buffer items past the in-flight ACK window so a freshly arrived
  ACK is served from RAM rather than waiting on the source. Values
  smaller than `AckAdvance` are clamped up to `AckAdvance` and log a
  warning.
- TypeScript RPC: `RpcStreamSender.onBuffered(count)` callback fires
  after every push onto the local ring buffer. Combined with the
  existing `onAckProcessed` (drain side), this gives controllers a
  complete picture of buffer utilisation &mdash; the source pull is
  paused when `bufferedCount === sender.bufferSize`.
- TypeScript RPC: new `RpcConnectionState.Handshaking` state between
  `Connecting` and `Connected`, mirroring .NET's
  `RpcPeerConnectionState` phases. The run loop transitions to it on
  WS open; `RpcServerPeer.accept()` transitions to it immediately.

### Changed
- TypeScript RPC: outbound calls now self-manage their connection
  wait, mirroring .NET `RpcOutboundCall.SendAsync`. Each call
  registers up front and either sends immediately (if `_isConnected`)
  or attaches a one-shot `connectionStateChanged` listener that fires
  on the next `Connected` transition. Removes the peer-level
  `_pendingSends` queue, the `_flushPendingSends` pump, and the
  `_reconnectFlushInProgress` flag. As a side effect, the
  `$sys.Reconnect` mid-reconcile deadlock is gone &mdash; the inner
  reconcile call no longer competes with a peer-level flush gate.

### Documentation
- Updated `PartR-RpcStream.md`, `PartR-D.md`, and `PartTS-Rpc.md` to
  describe `AckAdvance` vs `BufferSize` (and when each applies).

### Tests
- `.NET`: 3 new end-to-end cases in `RpcStreamRealTimeTest`
  (`BufferSizeAboveAckAdvance_PreBuffersBeyondAckWindow`,
  `BufferSizeUnset_FallsBackToAckAdvance`,
  `BufferSizeBelowAckAdvance_ClampsUpToAckAdvance`) backed by a
  burst-tracked source.
- `RpcStreamBasicTest`: defaults, independent property setters,
  `BufferSize` not in wire format.
- TypeScript: 3 new `onBuffered` cases plus refreshed wire-format
  tests asserting `AckAdvance` is now the binary key.


## 12.4.8+77552387 | npm: 12.4.10

Release date: 2026-05-04

### Added
- TypeScript RPC: `RpcStreamSender` observability surface &mdash;
  `nextIndex`, `lastAckIndex`, and `skipCount` getters plus an
  `onAckProcessed` callback that fires once per ACK drain (coalesced
  when multiple ACKs are processed together; listener errors are
  swallowed so they can't break the pump). `RpcStream.sender` accessor
  exposes the local `RpcStreamSender` for callers that need to read
  these metrics &mdash; intended for quality controllers that watch a
  real-time stream's backpressure / skip behaviour without reaching
  into private state.

### Tests
- `rpc-stream-realtime.test.ts`: 7 new cases covering the new metrics
  &mdash; `nextIndex` / `lastAckIndex` accounting, drain coalescing,
  throwing-listener resilience, and a deterministic `skipCount` during
  real-time compaction.


## 12.3.79+2fc189f6 | npm: 12.4.6

Release date: 2026-05-01

### Breaking Changes
- RPC: `RpcStream.AckAdvance` is renamed to `RpcStream.BufferSize` (both
  .NET and TypeScript). Wire format is unchanged &mdash; only the property
  name and the corresponding TypeScript option (`ackAdvance` &rarr;
  `bufferSize`) differ. Update any code that explicitly sets the
  buffer-ahead limit on `RpcStream<T>`.

### Changed
- RPC: `RpcStream.IsRealTime` skipping is now reactive instead of
  speculative. Previously, on hitting the buffer-ahead ceiling the
  sender drained the source itself looking for the next `CanSkipTo`
  item; now the sender waits for an ACK and, when one arrives,
  compacts the already-buffered unsent suffix down to the latest
  skippable item. The sender no longer pulls ahead from the source
  just to hunt for a skip target. Reconnect-time skip-ahead also runs
  only when `IsRealTime` is set; non-realtime streams keep
  back-pressure semantics unchanged. `RpcSharedStream` is consolidated
  to a single `OnRun` path covering both modes.

### Documentation
- Expanded `CODING_STYLE.md` with rules for flow-control spacing,
  class member ordering, primary constructors, sealed classes,
  preferred types like `FilePath`, and TypeScript-side conventions
  mirroring the .NET ones.

### Infrastructure
- Updated Fusion / OAuth / CliWrap package pins in
  `Directory.Packages.props`. `CommunityToolkit.HighPerformance`
  briefly moved to 8.4.2 and was reverted to 8.4.0 (a regression in
  8.4.x is in flight upstream).

### Tests
- `NerdbankCrossCompatTest` is now guarded by `NET8_0_OR_GREATER`,
  and `ShardMapTest` constructs its `HashSet` in a way that compiles
  on .NET Framework targets.


## 12.3.79+d2bf83a0 | npm: 12.3.85

Release date: 2026-04-30

### Added
- TypeScript RPC: `RpcConnectionUrlResolver` may now return `string |
  Promise<string>`, and the connect path `await`s it. This unblocks
  resolvers that need to fetch a per-connection token (e.g. a session
  token) before forming the WebSocket URL.
- TypeScript RPC: `sanitizeUrl(url)` utility exported from
  `@actuallab/rpc` &mdash; redacts `?session=...` (URL-parsed when
  possible, regex fallback otherwise) so the connect-attempt log line no
  longer leaks bearer-style query parameters. Declared as `export let`
  so library users can swap in a different sanitizer (e.g. one that
  redacts additional query keys).


## 12.3.79+a7608a16 | npm: 12.3.83

Release date: 2026-04-30

### Fixed
- TypeScript RPC: proper backpressure in `RpcStream` &mdash; acknowledgements
  are now consumer-driven instead of producer-driven. Previously the
  receiver sent an ACK as soon as an item landed in the buffer, which
  signalled false capacity to the producer and effectively disabled flow
  control. The stream now tracks `_nextConsumedIndex` and only acks up to
  what the iterator has actually yielded; duplicate-frame fast paths cap
  their ack at the consumed index as well, and the iterator loop emits a
  fresh `_maybeSendAck` after each batch is drained. Adds
  `rpc-stream.test.ts` cases covering the consumer-driven ACK behavior.


## 12.3.79+ef249695 | npm: 12.3.81

Release date: 2026-04-29

### Added
- TypeScript RPC: `RpcError` class &mdash; failed remote calls now reject with
  an `RpcError` (instead of a plain `Error`) that carries the remote
  exception's `typeName` when available. The handler parses `.NET`'s
  assembly-qualified `TypeRef` string (e.g. `"System.InvalidOperationException,
  System.Private.CoreLib"`) and exposes the type name only, so TypeScript
  callers can branch on remote exception types. The internal
  `RpcRerouteException` log path now matches against the fully-qualified
  `ActualLab.Rpc.RpcRerouteException`. Exported from
  `@actuallab/rpc`.
- `error-propagation` E2E scenario in `TypeScriptRpcE2ETest` /
  `ts-dotnet-e2e.ts` validating .NET → TS exception propagation.


## 12.3.79+a4fdbdd9 | npm: 12.3.79

Release date: 2026-04-28

### Fixed
- RPC: prevent connection stacking during a mid-handshake state. Connection
  state checks now use `IsConnectedOrHandshaking` instead of `IsConnected`,
  so new connections no longer pile up against peers stuck in transient
  handshake states. Adds teardown safeguards and tightens disconnect
  resolution in edge cases. Affects `RpcPeer`, `RpcServerPeer`,
  `RpcPeerConnectionState`, `RpcWebSocketServer`, and the TypeScript
  `RpcPeer`.


## 12.3.76+d67c674e | npm: 12.3.76

Release date: 2026-04-25

### Added
- RPC: compute methods can now serve a Regular call type (compute-to-regular
  downgrade). When an inbound message targets a `[ComputeMethod]` but its
  `CallTypeId` is `Regular`, the server returns the result immediately and
  skips invalidation tracking &mdash; no entry is retained in the inbound call
  registry past completion. Useful for callers that want a one-shot value
  from a compute method without subscribing to invalidations. Implemented in
  `RpcInboundContext` (accepts the alternate call type) and
  `RpcInboundComputeCall` (new `IsRegularCall` path that unregisters after
  `SendResult`).


## 12.3.74+279ac90c | npm: 12.3.70

Release date: 2026-04-23

### Added
- Nerdbank MessagePack converters for a core set of RPC and serialization
  types: `Result<T>`, `ExceptionInfo`, `VersionSet`, `RpcCacheKey`,
  `RpcCacheValue`, `RpcHandshake`, `RpcHeader`, `RpcHeaderKey`,
  `RpcMethodRef`, and `RpcObjectId`. All converters emit the same
  array-based wire shape used by MessagePack-CSharp, so `msgpackX`
  and `nmsgpackX` RPC formats are now fully byte-compatible across
  runtimes &mdash; clients and servers can mix Nerdbank.MessagePack
  and MessagePack-CSharp without re-serialization. Registered in the
  default `NerdbankMessagePackByteSerializer` configuration.
- `NerdbankCrossCompatTest` cases covering the new RPC converters.


## 12.3.72+94144fd7 | npm: 12.3.70

Release date: 2026-04-23

### Fixed
- Nerdbank `ApiMapNerdbankConverter<TKey, TValue>` and
  `ImmutableOptionSetNerdbankConverter` now also accept the legacy
  array-of-kv-pairs wire shape (`[[k, v], [k, v], ...]`) in addition to
  the standard map shape (`{k: v, k: v, ...}`). Keeps DB blobs written
  by the MessagePack-CSharp source-generated collection formatter
  readable after the v12.3.70 migration to Nerdbank, so no migration
  step is required for existing stored payloads.


## 12.3.70+04d6f22d | npm: 12.3.70

Release date: 2026-04-22

### Added
- Nerdbank MessagePack converters for `PropertyBag`, `ImmutableOptionSet`,
  `ApiMap<TKey, TValue>`, and `TypeDecoratingUniSerialized<T>` &mdash;
  closes the wire-compat gap where Nerdbank's default reflection shape
  couldn't express the legacy `[Key(N)]` index-based layouts used by
  MessagePack-CSharp. Stored blobs written by the legacy serializer
  remain readable. Registered in the default
  `NerdbankMessagePackByteSerializer` configuration.
- `TextSerializedNerdbankConverter<T, TSerialized>` (and closed-over
  `NewtonsoftJsonSerializedNerdbankConverter<T>`) &mdash; fixes a cross-
  serializer wire gap where MessagePack-CSharp wrote
  `NewtonsoftJsonSerialized<T>` as `[Data]` while Nerdbank emitted
  `{Data: ...}`, breaking every composite embedding such a value
  (notably a populated `ImmutableOptionSet`).
- `NerdbankCrossCompatTest` suite &mdash; drives bytes directly between
  MessagePack-CSharp and Nerdbank readers/writers to catch wire-format
  divergence that self-round-trip tests miss.
- TypeScript: `useBigInt64: true` in the default `msgpack` encoder &mdash;
  `bigint` values now serialize as msgpack int64/uint64, required for
  .NET `long` field compatibility when the value exceeds
  `Number.MAX_SAFE_INTEGER`.

### Changed
- `TypeDecoratingUniSerialized<T>` wire format aligned with
  MessagePack-CSharp's `[Key(0)] MessagePackData` layout &mdash; a
  1-element array with type-decorated inner bytes &mdash; so the same
  payload now cross-reads between Nerdbank and MessagePack-CSharp.
- TypeScript: upgraded `@msgpack/msgpack` to v3.1.3; `Encoder`
  initialization refactored to the new object-based configuration API.

### Fixed
- TypeScript RPC: `Dictionary<int, byte[]>` arguments now serialize
  correctly over msgpack (unblocking the `$sys.Reconnect` method
  argument) via a new `msgpack-map-patch.ts` alongside the v3.1.3
  upgrade.


## 12.3.63+373bb905 | npm: 12.3.64

Release date: 2026-04-21

### Added
- TypeScript: `RpcPeer.disconnect()` &mdash; closes the current
  WebSocket connection without disposing the peer. For `RpcClientPeer`,
  the run loop detects the disconnect and reopens the connection; the
  peer stays in the hub and all client proxies bound to it remain valid.

### Changed
- `RpcStream.Disconnect()` is now public (previously an explicit
  `IRpcObject.Disconnect()` implementation forwarding to a protected
  abstract). Callers holding an `RpcStream` reference can now end it
  directly without casting to `IRpcObject`.

### Fixed
- `RpcStream`: reordered the disconnect path so the `$sys.AckEnd`
  close message is always sent before `_isDisconnected` flips. This
  closes a race where a stream disconnecting during the "cannot
  reconnect" branch of `Reconnect` would skip its close notification,
  leaving the remote side waiting.


## 12.3.60+21bf6f76 | npm: 12.3.60

Release date: 2026-04-20

### Added
- Custom MessagePack formatters for core serialization types &mdash;
  `ImmutableBimapMessagePackFormatter`, `ResultMessagePackFormatter`,
  `BoxMessagePackFormatter`, and `MutableBoxMessagePackFormatter`,
  registered in `DefaultMessagePackResolver` and wired up via
  `[MessagePackFormatter]` attributes on `ImmutableBimap`, `Result`,
  `Box`, `MutableBox`, and `ApiArray`. Works around a MessagePack
  source-generator bug that emits incorrect code for struct fields
  relying on default formatters.

### Fixed
- TypeScript: `RpcPeer` could enter a zombie state on reconnect when a
  disconnect happened mid-handshake. Connection tracking now uses a
  dedicated `_isConnected` flag (independent of WebSocket state), which
  tightens state transitions, outbound call gating, and `close()`
  behavior so silent no-ops and lingering zombie peers no longer occur.


## 12.3.56+9d28308c | npm: 12.3.50

Release date: 2026-04-19

### Added
- Fusion: `RemoteComputeMethodFunction` races `SendRpcCall` against peer
  disconnect events &mdash; remote compute calls no longer hang
  indefinitely when the peer drops mid-call; a stale cached value is
  served instead when one is available.
- `RpcPeer.WhenDisconnected` and `MarkDisconnected` &mdash;
  disconnection is now a first-class, awaitable state.
- `RpcPeer.WhenConnectedOrReroute` &mdash; waits for a live connection
  and surfaces reroute exceptions so callers can re-resolve the peer
  instead of blocking on a dead one.
- `RpcRouteState` gained a reroute-aware hook used by the above.

### Changed
- `RpcPeerConnectionStateExt` removed; the `WhenConnected` extension
  methods are gone - use the identical regular method directly, or
  the new `RpcPeer.WhenConnectedOrReroute` helper. State transitions
  (`MarkConnected` / `MarkDisconnected` / `MarkTerminated`) now live on
  `RpcPeerConnectionState` itself.
- RPC peer connection-state handling simplified: state transitions
  consolidated into `RpcPeerConnectionState`, and the disconnection /
  connection-timeout flow in `RpcPeer` tightened. `RpcTestConnection`
  updated to match.

### Fixed
- Additional safeguards around serving stale cache on disconnect so
  reroute exceptions and terminal errors propagate correctly, closing
  race windows that could produce spurious failures right after a peer
  dropped.


## 12.3.50+c3a95b95 | npm: 12.3.50

Release date: 2026-04-18

### Breaking Changes
- TypeScript: `RpcClientPeer` API reshaped &mdash; `peer.run(factory)` is
  replaced by the `webSocketFactory` field plus `peer.start()` (ctor also
  gained a `mustStart = true` parameter); `peer.connected` /
  `peer.disconnected` events are gone &mdash; subscribe to
  `peer.connectionStateChanged` (emits `RpcConnectionState`) or await
  `peer.whenConnected()`; `peer.connectionKind` renamed to
  `peer.connectionState`; and `peer.reconnectDelayer` moved up to
  `RpcHub.reconnectDelayer` so every client peer on a hub shares the
  delayer. Migration: drop `void peer.run()` (auto-starts by default) or
  set `webSocketFactory` + call `peer.start()` when you need
  `mustStart = false`; replace event-based checks with
  `connectionStateChanged` or `whenConnected()`; route
  `cancelDelays()` / `delays = ...` through `hub.reconnectDelayer`.

### Added
- Fusion: remote compute methods now serve the last cached value when
  the peer is disconnected (instead of failing), and auto-invalidate via
  the new `InvalidateWhenReconnected` path once the peer reconnects
  &mdash; improves UI resiliency across brief disconnects.
- TypeScript: `RpcPeerRefBuilder` helper for composing peer refs.
  `RpcPeerRefBuilder.forClient(url, format)` bakes the serialization
  format into the URL via `?f=...`; `RpcPeerRefBuilder.forServer(id)`
  returns `server://{id}`.
- TypeScript: `RpcClientPeer.webSocketFactory` field for injecting a
  custom WebSocket constructor (Node.js / tests).

### Changed
- TypeScript: `RpcClientPeerReconnectDelayer` is now a single instance
  shared via `RpcHub.reconnectDelayer` and centralized there &mdash;
  swap in an app-level subclass (e.g. signal-gated) on the hub before
  peers start.

### Fixed
- TypeScript: reconnection edge cases in `RpcClientPeer` &mdash;
  handshake timeouts now close the connection and retry after the
  configured delay; resolved deadlock scenarios during `$sys.Reconnect`
  calls; addressed lost-close race conditions during `run()` iterations.

### Documentation
- Rewrote `PartTS-Rpc.md`, `PartTS.md`, `PartTS-FusionRpc.md`, and
  `PartTS-React.md` examples against the new `RpcClientPeer` API
  (`start()` / `whenConnected()` / `connectionStateChanged` /
  `hub.reconnectDelayer`).

### Tests
- Added regression coverage for the reconnect edge cases above
  (`rpc-reconnect-edge-cases.test.ts`) and migrated
  `fusion-rpc-run-reconnection.test.ts` to the new API.
- Added `ComputeMethodResultStashTest` (11 cases covering roundtrip,
  disposal cleanup, stash-twice / after-dispose errors, per-key
  serialization, and shared-lock-set ctor) plus a `StashComputeService`
  integration test.


## 12.3.42+3661472f | npm: 12.3.33

Release date: 2026-04-18

### Performance
- Replaced unnecessary `Interlocked.Exchange` calls with `Volatile.Write` /
  `Volatile.Read` across Core, Fusion, and RPC hot paths (`BatchProcessor`,
  `SafeAsyncDisposableBase`, `ArrayPoolBuffer`, `Connector`, `Computed`,
  `ComputedRegistry`, `ComputedSynchronizer`, `ComputedGraphPruner`,
  `RpcObjectTrackers`, `RpcSharedStream`, `RpcWebSocketTransport`).
  Added `InterlockedExt.VolatileRead` / `InterlockedExt.VolatileWrite`
  helpers for cases where a full interlocked operation isn't needed.


## 12.3.39+4e55ed7e | npm: 12.3.33

Release date: 2026-04-17

### Breaking Changes
- `RpcRouteState.LocalExecutionAwaiter` signature changed from
  `Func<CancellationToken, ValueTask>` to
  `Func<bool, CancellationToken, ValueTask>`, and
  `RpcRouteStateExt.PrepareLocalExecution` gained a required `addDependency`
  parameter before `cancellationToken`. Custom awaiters and any direct
  `PrepareLocalExecution` callers must accept and forward the new
  `bool addDependency` argument. `addDependency` is `true` for compute
  method calls - you can use it to actually add a dependency for such
  call on, e.g., the current routing state.

### Documentation
- Reworked all code snippets so every block in the docs is consumed directly
  from a compiled snippet source (no drifted hand-written duplicates).
- Fixed placement of `MustStore(false)` in the operation-context setup
  example and clarified its usage.
- Miscellaneous prose and formatting cleanup across the docs set.


## npm: 12.3.33+59552c71

Release date: 2026-04-16

### Added
- TypeScript: scoped logging API in `@actuallab/core` — `Log`, `LogLevel`,
  and `createLogProvider(prefix, defaults)` factory for per-package, typed
  `getLogs(scope)` helpers. Each `Log.get(scope)` returns a bag of optional
  loggers (`debugLog`, `infoLog`, `warnLog`, `errorLog`) that are `null`
  when below the scope's minimum level — call sites use
  `debugLog?.log(...)` so disabled logs cost a single nullish check.
- TypeScript: `initLogging()` persists user-set minimum levels to
  `sessionStorage` (3-day TTL) and installs a `globalThis.logLevels`
  controller exposing `override(scope, level)`, `overrideAll(prefix, level)`,
  `dump()` (prints every known scope as a `console.table`), `reset()`, and
  `clear()` for runtime tweaking from the browser dev console.
- TypeScript: per-package `getLogs` helpers in `@actuallab/rpc` and
  `@actuallab/fusion` with package-prefixed scopes (e.g. `'rpc.RpcPeer'`,
  `'fusion.ComputedState'`) and explicit per-scope `LogLevel` defaults.
  Global baseline is `Warn`; `rpc.RpcPeer` is `Info` so connection-lifecycle
  events surface out of the box. All other scopes are `Warn` — quiet by
  default; users opt in via `logLevels.override(...)`.

### Changed
- TypeScript: replaced ad-hoc `console.warn` calls across `rpc-peer`,
  `rpc-stream`, `rpc-stream-sender`, `rpc-system-call-handler`,
  `rpc-system-call-sender`, `rpc-hub`, `rpc-service-host`, `rpc-connection`,
  `rpc-peer-state-monitor`, `computed-state`, and `ui-action-tracker` with
  the new scoped logger, mirroring the corresponding .NET log calls.


## 12.3.25+0a851ea7 | npm: 12.3.29

Release date: 2026-04-16

### Breaking Changes
- Removed the `RpcWebSocketServerOptions.ChangeConnectionDelay` option (both
  ASP.NET Core and OWIN/NetFx variants). Stale-connection teardown now
  happens synchronously *before* the WebSocket upgrade, so the dedicated
  delay is no longer meaningful. Drop any code that sets this option.

### Added
- TypeScript: `RpcStream` source factories of the form
  `(abortSignal: AbortSignal) => AsyncIterable<T>` now get a grace
  period (`RpcStream.disconnectGracePeriodMs`, default 100ms) on
  `disconnect()` to honor the AbortSignal and exit cooperatively
  before the sender force-closes via `iterator.return()`. Plain
  `AsyncIterable<T>` sources (which can't observe the signal) are
  force-closed immediately as before.
- TypeScript: `RpcCallStage` constants (`ResultReady`, `Invalidated`,
  `Unregistered`) and `completedStage` tracking on `RpcOutboundCall`,
  both ported from .NET.
- TypeScript: `IncreasingSeqCompressor` in `@actuallab/rpc` — LEB128-based
  sorted-integer-sequence compression, wire-compatible with .NET. Shared
  fixtures between the TS test suite and a new .NET `Theory` confirm
  byte-for-byte wire compatibility for the `$sys.Reconnect` protocol.
- TypeScript: `RingBuffer<T>` in `@actuallab/core` — fixed-capacity
  circular buffer matching .NET `ActualLab.Collections.RingBuffer<T>`.
- TypeScript: `RpcPeer.format` is now a mutable property
  (getter/setter); `RpcServerPeer` accepts an explicit format override,
  letting the test harness align both peers on any supported wire
  format.

### Fixed
- RPC server: stale connections are now disconnected *before* the new
  WebSocket upgrade rather than after. Previously the old-connection
  teardown could consume the client's `HandshakeTimeout` budget on a
  dead socket; performing it before the upgrade consumes `ConnectTimeout`
  instead, which is the correct budget for "waiting for server to be
  ready to talk".
- RPC WebSockets: reduced the default `RpcWebSocketTransport.CloseTimeout`
  from its previous value to **1 second** to limit effective
  `ConnectTimeout` shrinkage and lower the abrupt/graceful-close ratio
  impact on connection handling.
- TypeScript: `RpcClientPeer._reconnect` now runs the `$sys.Reconnect:3`
  protocol on same-peer reconnects to ask the server which call IDs it
  no longer recognizes, and only resends those. Previously the client
  blindly re-sent every in-flight outbound call on every reconnect,
  causing the server to spawn a second handler for streaming calls
  (e.g. ActualChat's `PushAudio`) and double-process the stream. Matches
  .NET `RpcOutboundCallTracker.Reconnect`. TS also now handles incoming
  `$sys.Reconnect` calls: when a peer acts as server, the inbound-call
  tracker is consulted to produce the set of unknown call IDs, wrapped
  in `$sys.Ok` exactly as .NET does.
- TypeScript: `RpcClientPeer._reconnect` now disposes client-owned shared
  objects (e.g. `RpcStreamSender` instances) on peer change, matching
  .NET `RpcPeer.Reset()`. Previously these senders lingered indefinitely
  after a reconnect to a server with a different `hubId`, causing an
  unbounded leak of stream-sender state and source iterators.
- TypeScript: `RpcStreamSender.writeFrom` is now ACK-driven (mirroring
  .NET `RpcSharedStream<T>`): the main loop blocks waiting for a client
  ACK, so while the peer is disconnected no source items are pulled.
  Previously `sendItem` was a no-op when disconnected but the pump kept
  pulling from the source, silently discarding up to thousands of items
  per disconnect window. A bounded replay buffer holds unacknowledged
  items so they can be resent on reconnect.

### Documentation
- Documented `RpcRemoteExecutionMode` in the Call Routing reference page.

### Tests
- New `.NET` `TypeScriptRpcE2ETest.ReconnectNoDuplicate` cross-language
  E2E theory exercises `$sys.Reconnect:3` end-to-end (Node-hosted TS
  client ↔ ASP.NET Core .NET server) for `json5`, `msgpack6`, and
  `msgpack6c`. Verifies the server invokes a long-running `SlowEcho`
  handler exactly once across a same-peer reconnect — the regression
  guard for the audio-double-processing bug.
- New `rpc-reconnect-wire-format.test.ts` locks in byte-level wire
  fixtures for both the JSON and MessagePack shapes of the
  `completedStages` argument.
- New `.NET` `IncreasingSeqCompressorTest.CrossPlatformWireFormatFixtures`
  theory locks in the exact byte output of 10 representative inputs. The
  same fixtures are asserted by the TypeScript
  `increasing-seq-compressor.test.ts` suite, giving us a bidirectional
  wire-compatibility contract for `$sys.Reconnect`.

### Infrastructure
- TypeScript: `Run-Tests.cmd` now sets `CI=1` and `NO_COLOR=1` and uses
  Vitest's `basic` reporter for consistent, silent CI output.


## 12.3.16+47f5b5a0 | npm: 12.3.14

Release date: 2026-04-16

### Added
- New `RpcRemoteExecutionMode` `[Flags]` enum (`AwaitForConnection`, `AllowReconnect`, `AllowResend`)
  giving per-method control over outbound RPC connection waiting, reconnection, and resending behavior
- `RpcMethodAttribute.RemoteExecutionMode` property for overriding the default (`AwaitForConnection | AllowResend`)
  on a per-interface or per-method basis; `NoWait` methods use `0`, compute methods must use `Default`
- TypeScript: matching `RpcRemoteExecutionMode` support in `rpc-service-def`, `rpc-client`, and decorators
- `ShardMapBuilder.Maglev` — Google's 
  [Maglev consistent hashing](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44824.pdf)
  algorithm as a new shard map builder with perfect balance (max-min ≤ 1) and lower disruption than
  Rendezvous at higher node counts
- TypeScript: `AbortSignal`-based cancellation for local `RpcStream` sources — `RpcStreamSource<T>`
  now also accepts a factory `(abortSignal: AbortSignal) => AsyncIterable<T>`, letting sources
  release resources (camera, microphone, etc.) promptly on disconnect
- TypeScript: `RpcServerPeer.accept()` now disconnects shared objects on connection close,
  and `onAckEnd()` delegates to `disconnect()` for proper iterator cleanup

### Tests
- Expanded `ShardMapTest.BuilderComparisonTest` with additional `InlineData` scenarios,
  winner/tie tracking, and detailed comparison metrics across builder strategies
- New `RpcRemoteExecutionModeTest` (.NET) and `rpc-remote-execution-mode.test.ts` covering
  connection waiting, reconnection, in-flight calls, and method-definition validation
- New `rpc-stream-cancellation.test.ts` and `NoReconnectStreamSourceCancellationTest` verifying
  source enumerator finalization on client disconnect with `AllowReconnect=false`

### Infrastructure
- TypeScript: ESLint warning cleanup across all packages


## npm: 12.3.6+872c4869

Release date: 2026-04-15

### Changed
- TypeScript: tightened ESLint rules — removed overly permissive overrides for `@typescript-eslint/no-unsafe-*` rules
- TypeScript: cleaned up code, fix ESLint warnings, and removed redundant ESLint disable directives across all packages
- TypeScript: removed `noUncheckedIndexedAccess` from tsconfig and cleaned up all non-null assertion operators (`!`) that were only needed for it


## 12.3.2+f23f4ac2 | npm: 12.3.2

Release date: 2026-04-15

### Added
- .NET and TypeScript: Real-time stream mode with skip-to-keyframe support in `RpcStream`: 
  - New `IsRealTime` / `isRealTime` property
  - New `CanSendTo` / `canSkipTo` property
  - When `IsRealTime` and `AllowReconnect` are both true, reconnection clears the stale buffer and skips to the next `CanSkipTo` item
- TypeScript: `RpcStream` is now dual-mode (local + remote), matching the .NET design — service methods can return 
  `new RpcStream(source, { isRealTime: true, ... })` with full configuration
- TypeScript: `RpcStream.toRef(peer)` method creates and registers an `RpcStreamSender`, starts pumping items, and returns 
  the serialized stream reference (text or binary format)
- TypeScript: `RpcStream.whenSent` property — a `Promise` that resolves when the sender finishes pumping all items
- TypeScript: `RpcStreamOptions<T>` interface for configuring local streams
- TypeScript: `RpcSerializationFormat` and `RpcSerializationFormatResolver` types similar to the .NET ones
- TypeScript: MessagePack format support (`msgpack6` and `msgpack6c`)
- TypeScript: "Compact" call format support (name hash-based method resolution)
- TypeScript: bundled XXH3-64 hash implementation for method name hashing

### Changed
- TypeScript: `rpc-peer.ts` stream dispatch now wraps raw `AsyncIterable` results in `RpcStream` and delegates to `toRef()` instead of creating `RpcStreamSender` directly
- TypeScript: adopted Voxt.ai TypeScript coding style (4-space indent, single quotes, prettier)
- Consolidated C# E2E tests into single class with `[Theory]`

### Documentation
- Documented `IsRealTime`, `CanSkipTo`, and real-time reconnection behavior in `PartR-RpcStream.md`
- Added TypeScript dual-mode `RpcStream` API documentation with `toRef()` and `whenSent` examples

### Tests
- .NET: Comprehensive tests for `RpcStream.IsRealTime` feature 
- .NET: New tests verifying that after disconnect/reconnect, the first item is a keyframe (multiple of `keyFrameInterval`)
- TypeScript: E2E tests for all 3 serialization formats and `isRealTime` stream feature
- TypeScript: Added local-mode `RpcStream` tests (construction, config, iteration, `toRef`, `whenSent`, E2E config propagation)
- TypeScript: Added real-time, reconnect tests, and tests verifying `canSkipTo` filtering on reset ACK
- TypeScript: XXH3-64 implementation tests

### Infrastructure
- TypeScript: added `Run-Lint.cmd` build script, renamed `Install-Packages.cmd` to `Npm-Install.cmd`


## 12.2.4+09f1dc55 | npm: 12.1.115

Release date: 2026-04-04

### Fixed
- Fixed NativeAOT downcast bug in additional places (`MethodDef`, `RpcMiddlewareContext`) 
  with conditional `Unsafe.As` workaround


## 12.2.1+41e24193 | npm: 12.1.115

Release date: 2026-04-03

### Breaking Changes
- `CodeKeeper` API overhauled:
  - New and simpler `XxxCodeKeeper.IExtension` extension points.
  - Removed instance-based `Get<T>()`/`Set<T, TImpl>()`, `AddAction()`, `RunActions()`, `KeepUnconstructable()`, 
    `CallSilently()`, and `FakeCallSilently()` methods 
  - `CodeKeeper` is now a static utility with simplified `Keep<T>()`, `Keep(Type)`, `KeepSerializable<T>()` methods
  - Removed `TypeCodeKeeper`, `SerializableTypeCodeKeeper`, `RpcMethodDefCodeKeeper`
  - `RpcProxyCodeKeeper`, `CommanderProxyCodeKeeper`, `FusionProxyCodeKeeper` are replaced by 
    `ProxyCodeKeeper.IExtension` implementations (`RpcProxyCodeKeeperExtension`, `CommanderProxyCodeKeeperExtension`, 
    `FusionProxyCodeKeeperExtension`)
- `RpcCallTimeouts.LogTimeout` renamed to `DelayTimeout`; `RpcCallTimeouts.DefaultLogTimeout`
  renamed to `DefaultDelayTimeout` — update any code referencing these properties
- `RpcMethodAttribute.LogTimeout` renamed to `DelayTimeout` — update attribute usages in service interfaces
- `RpcOutboundCallOptions.ReroutingDelayer` signature changed — now takes `(RpcMethodDef, int, CancellationToken)`
  instead of `(int, CancellationToken)`

### Added
- `CodeKeeper.IExtension` interface for pluggable trimming/NativeAOT code retention
- `RpcDelayedCallAction` flags enum for configurable delayed call handling: 
   `None`, `Abort`, `Resend`, `Log`, `LogAndAbort`, `LogAndResend`
- `RpcMethodAttribute.DelayAction` property to control per-method delayed call behavior
- `RpcOutboundCallOptions.DelayHandler` for custom delayed call handling logic
- Delayed compute calls are now automatically re-sent by default (`LogAndResend`), improving reliability

### Changed
- NativeAOT sample restructured: all `CodeKeeper.Set`/`RunActions` calls are removed (they're unnecessary now)

### Fixed
- Fixed `RpcSharedStream` using `IsCompleted` instead of `IsCompletedSuccessfully` for task state checks, 
  preventing incorrect behavior when tasks are faulted or cancelled

### Documentation
- Updated benchmark data to v12.1.130 (.NET 10.0.5) with new latency tables


## 12.1.130+4189e1bf | npm: 12.1.115

Release date: 2026-04-01

### Added
- Added `AllowExecuteDeleteAsync` option to `DbLogTrimmerOptions` and `DbSessionInfoTrimmer.Options`, allowing control over whether `ExecuteDeleteAsync` (bulk SQL DELETE) is used in trimmer operations. Defaults to `true` on .NET 7+ and `false` on older targets
- When `AllowExecuteDeleteAsync` is `false` (or on pre-.NET 7), trimmers now fall through to the row-by-row deletion path even on .NET 7+, enabling compatibility with EF providers that don't support `ExecuteDeleteAsync`

### Changed
- `DbAuthServiceBuilder` now registers `DbSessionInfoTrimmer.Options.Default` via factory instead of direct `TryAddSingleton<Options>()`, allowing easier default customization


## 12.1.128+31a47345 | npm: 12.1.115

Release date: 2026-03-30

### Fixed
- Fixed `NullReferenceException` in `AsyncLockSet.Releaser.Dispose()` when the releaser is default-valued (uninitialized)


## 12.1.125+ba936b35 | npm: 12.1.115

Release date: 2026-03-26

### Fixed
- Fixed potential socket errors (SocketError 125 / ECANCELED) during WebSocket connection
  in `RpcWebSocketClient` — the connect timeout `CancellationTokenSource` could fire after
  a successful connect, aborting the already-established socket. Now disposed immediately
  after successful connection to prevent late cancellation from affecting the live socket


## 12.1.123+9dc3aaeb | npm: 12.1.115

Release date: 2026-03-24

### Fixed
- Prevented race condition in `RpcCallTrackers` on mobile app resume that caused
  misleading "delayed call" reports — added keep-alive timeout check to avoid
  premature call timeouts during app resume scenarios

### Changed
- `RpcCallStage` now outputs "None" for stage value 0 instead of a numeric representation


## 12.1.119+8e01cd91 | npm: 12.1.115

Release date: 2026-03-20

### Breaking Changes
- Removed `Arithmetics`, `ArithmeticsProvider`, `Range`, `Tile`, `TileLayer`, `TileStack`
  and all associated types/extensions from `ActualLab.Core` Mathematics namespace.
  These abstractions are no longer part of the library
- Removed `RangeModelBinder` and `RangeModelBinderProvider` from `ActualLab.Fusion.Server`

### Fixed
- `RpcSystemCallSender` and `RpcSharedStream.Batcher._isPolymorphic` now use
  `RpcArgumentSerializer.IsPolymorphic` for polymorphic type checks


## 12.1.114+a74e74b2 | npm: 12.1.115

Release date: 2026-03-18

### Added
- `RpcSerializableAttribute` (`[RpcSerializable]`) — marks abstract types as non-polymorphic 
  for RPC serialization, allowing the underlying serializer's union support 
  (`[JsonDerivedType]`, `[MemoryPackUnion]`, `[Union]`) to handle type discrimination 
  instead of RPC's `TypeRef` wrapping
- `RpcSerializationFormatException` and `RpcWebSocketCloseCode.UnsupportedFormat` — better 
  error handling when client requests a serialization format unknown to the server

### Documentation
- Added "Polymorphic Serialization" section to RPC Serialization docs covering `[RpcSerializable]` usage

### Tests
- Added tests for `[RpcSerializable]` with `NonPolymorphicBase` hierarchy, 
  including `RpcStream` scenarios
- Added tests for unsupported serialization format handling in `RpcWebSocketTest`


## 12.1.107+fe771590 | npm: 12.1.100

Release date: 2026-03-17

### Added
- `SharedFloatPool` and `SharedDoublePool` in `ArrayPools` (`ActualLab.Core`) — 
  shared array pools for `float` and `double` types

### Changed
- Removed `unmanaged` constraint from `NonPoolingArrayPool<T>`, allowing it to work with any type

### Tests
- Added unit tests for `NonPoolingArrayPool<T>` in `ActualLab.Tests`


## 12.1.102+00807c35 | npm: 12.1.100

Release date: 2026-03-17

### Fixed
- `AsyncTaskMethodBuilderExt.FromTask` didn't work — introduced `GenericAccessors<T>` to workaround
  unsafe accessors for generics due to runtime limitations; refactored both generic and untyped
  `FromTask` variant 

### Tests
- Added unit tests for `FromTask` and `GenericFromTask` to validate functionality and correctness


## 12.1.100+b7edfdd5 | npm: 12.1.100

Release date: 2026-03-16

### Breaking Changes (.NET)
- Removed `IsReconnectable` property from `IRpcSharedObject` — replaced by `AllowReconnect` on `IRpcObject`
- `RpcStream.New<T>()` factory method parameter renamed from `isReconnectable` to `allowReconnect`

### Added (.NET)
- `AllowReconnect` property on `IRpcObject` interface — controls whether an RPC object (stream)
  should reconnect or immediately disconnect when a peer connection drops
- `RpcStream<T>` now serializes `AllowReconnect` as a 5th field in the wire format
  (backward-compatible: old 4-field format defaults to `AllowReconnect = true`)
- Server-side `RpcSharedStream` rejects reconnect attempts for `AllowReconnect = false` streams
  and auto-disposes them on disconnect
- `RpcRemoteObjectTracker` disconnects non-reconnectable remote objects on peer disconnect

### Added (TypeScript)
- TypeScript RPC: `allowReconnect` support in `RpcStream`, `RpcStreamSender`, `parseStreamRef()`,
  and `RpcRemoteObjectTracker`

### Documentation
- Updated [RpcStream](PartR-RpcStream.md) docs to reflect `AllowReconnect` replacing `IsReconnectable`

### Tests
- Added `NoReconnectStreamTest` and `NoReconnectStreamDisconnectTest` (.NET)
- Added TypeScript unit tests for `allowReconnect` in `RpcStream`, `RpcStreamSender`, and `parseStreamRef`
- Added TypeScript end-to-end tests for `allowReconnect = false` disconnect behavior
- Cross-language E2E test (`StreamNoReconnect`) verifying `AllowReconnect = false` behavior
  between TypeScript client and .NET server


## 12.1.98+62afac4f | npm: 12.1.69

Release date: 2026-03-10

### Added
- `CpuTimestampBasedVersionGenerator` — a new `VersionGenerator<long>` based on `CpuTimestamp` ticks,
  useful for in-process only high-resolution monotonic versioning
- `IState.GetExistingComputed()` method (it was available via `ComputedInput`, but wasn't a part of `IState`)

### Changed
- Renamed `Versioning/Providers/` folder to `Versioning/Generators/` and moved
  `ClockBasedVersionGenerator` to `ActualLab.Versioning` namespace

### Fixed
- Stale state bug in `ComputedState` during `Recompute`: concurrent invalidation could target
  an already-replaced computed instance, causing the state to miss updates.
  `StateExt.Invalidate` and `Recompute` now use `GetExistingComputed()` instead of `Snapshot.Computed`
  to address that

### Documentation
- Added [Standalone Authentication](PartAA-X.md) guide — explains how to extract Fusion's auth
  system into your own project for full control and simpler code
  

## 12.1.89+ee8734c3 | npm: 12.1.69

Release date: 2026-03-04

### Breaking Changes
- `ShardMap<TNode>` constructor no longer accepts `Func<TNode, IEnumerable<int>>` 
  for custom hashing — use `ShardMapBuilder` parameter instead
- Default shard mapping algorithm changed from greedy to rendezvous hashing — 
  existing shard assignments will differ after upgrade
- `DbLogReader.ProcessBatch` return type changed from `Task<int>` to `Task<Moment>` — 
  subclasses must update their override signatures

### Added
- `ShardMapBuilder` abstraction with two built-in strategies: 
  `GreedyShardMapBuilder` (old behavior) and `RendezvousShardMapBuilder` (new default) 
   for optimal minimal reallocation when nodes change
- `DbEventLogReader.GetMinDelayUntil` for precise delayed event scheduling — 
  log reader now sleeps until the next delayed entry instead of polling on a fixed interval

### Changed
- Improved log processing queries in `DbEventLogReader`: it uses `== LogEntryState.New` filter 
  and `OrderBy(DelayUntil)` for more reliable index utilization

### Fixed
- Operation event processing now schedules precisely based on the earliest
  pending entry's `DelayUntil`, avoiding unnecessary polling
- `DbLogReader.ProcessNewEntries` reworked to support precise sleep-until
  scheduling based on `ProcessBatch` return value

### Documentation
- Replaced Mermaid diagrams with SVG images in architecture docs
- Added animated SVG diagrams for distributed scaling, dependency graphs, caching, and recomputation
- Added TypeScript port documentation section

### Tests
- Added `ShardMapBuilder` comparison tests (greedy vs rendezvous)
- Added delayed event processing test with precise scheduling verification


## 12.1.69+10006328 | npm: 12.1.69

Release date: 2026-02-22

### Added (TypeScript)
- `RpcStream` support in TypeScript RPC client — full streaming with batching,
  reconnection, and end-of-stream handling
- Stream performance test (`StreamInt32`) for benchmarking TypeScript RPC stream throughput
- `RpcType.stream` return type in TypeScript service definitions

### Changed (TypeScript)
- TypeScript RPC method definitions now use `returns: RpcType.noWait` instead of
  a `noWait` boolean flag, improving API consistency
- Simplified wire argument count calculations in TypeScript by assuming
  `CancellationToken` slot as default (removed `ctOffset` option)

### Tests (TypeScript)
- Added comprehensive `RpcStream` unit tests in TypeScript covering batching,
  reconnection, multiple enumeration, and disposal
- New stream performance benchmarks


## 12.1.61+045f13f0

Release date: 2026-02-18

### Added
- "No polymorphism" JSON serialization formats (`json5np`, `njson5np`) for strict
  non-polymorphic RPC serialization
- `RpcLimits.PrematureDisconnectTimeout` for improved connection backoff logic

### Changed
- Connection retry logic now uses `ConnectionAttemptIndex` instead of `TryIndex`
  with handling for premature connection closures
- Default serialization format for `RpcClientPeer` (TypeScript) changed to `json5np`

### Documentation
- `RpcLimits` class documentation

### Tests
- Added TypeScript RPC performance harness


## 12.1.51+8e1051d0

Release date: 2026-02-17

### Added
- `IsSynchronized` and `WhenSynchronized` methods on `State`, `ComputedState`,
  and `MutableState` for streamlined synchronization checks
- `IState.IsSynchronized()`, `IState.WhenSynchronized()`, and `IState.Synchronize()`
  extension methods in `StateExt`
- `KeepProcessedItems` and `KeepDiscardedItems` retention settings in `DbLogReaderOptions`
  for fine-grained control over log item lifecycle

### Tests
- Added TypeScript RPC reconnection scenario tests (both unit and E2E against .NET server)

## 12.1.41+718a0325

Release date: 2026-02-14

### Added
- **Work in progress: TypeScript Fusion client.** Core abstractions, compute methods, 
  `ComputedState`, `MutableState`, invalidation, and `fusion-react` package 
  with React bindings.
- React-based "Todo v3" page in the TodoApp sample showing how to use the client.

### Fixed
- Missing `HasName(...)` calls in `FusionBuilder` for `AddClient`, `AddServer`,
  and `AddDistributedService` methods
- Proper `ArgumentData` formatting in `RpcInboundCall` for improved readability

### Infrastructure
- Added TypeScript monorepo under `ts/` with `@actuallab/core`, `@actuallab/rpc`,
  `@actuallab/fusion`, and `@actuallab/fusion-rpc` packages
- Integrated TypeScript build pipeline into the Todo sample Host project via MSBuild targets


## 12.1.14+28a7e73e

Release date: 2026-02-11

### Fixed
- RPC WebSocket disconnect detection was delayed by ~50 seconds instead of being instant.
  When the server shut down, `RpcPeer.OnRun` awaited `maintainTasks` in a `finally` block
  before cancelling `readerTokenSource`, so `SharedObjects.Maintain()` kept running its
  keep-alive check loop for up to 55s (`KeepAliveTimeout`) before detecting the timeout.
  The fix moves the `readerTokenSource` cancellation before the `maintainTasks` await.


## 12.1.12+0475b1ca

Release date: 2026-02-11

### Breaking Changes
- `mempack6(c)` / `msgpack6(c)` binary protocols no longer persist message size, 
  fixing the compatibility issue with pre-v12 protocols. This seems to be the very
  first release issue attributed to Claude Code: it somehow concluded the size has 
  to be persisted while migrating `WebSocketChannel` to `RpcWebSocketTransport` API, 
  but in reality is wasn't (the code branch persisting the size was disabled via other logic).
  Sorry we caught this just now: the issue is there for two weeks already (from v12.0.9).

### Fixed
- `Option<T>` now always uses explicit `MessagePackFormatter` instead of conditional
  `MessagePackObject(true)` with `SuppressSourceGeneration` on .NET 8+, fixing serialization
  consistency across target frameworks

### Tests
- Added conditional flags (`UseSystemJsonSerializer`, `UseNewtonsoftJsonSerializer`,
  `UseMessagePackSerializer`, `UseMemoryPackSerializer`) in `SerializationTestExt`
  for selectively enabling/disabling specific serializers in tests
- Added serialization round-trip tests for `DbUser`, `DbChat`, `DbMessage`


## 12.1.4+7b59e831

Release date: 2026-02-07

### Added
- New `ActualLab.Serialization.NerdbankMessagePack` package &ndash; optional Nerdbank.MessagePack
  serialization support. You can also register new `nmsgpack6`/`nmsgpack6c`
  RPC formats by calling `RpcNerdbankSerializationFormat.Register()` at startup

### Fixed
- `ApiNullable<T>`, `ApiNullable8<T>`, `ApiOption<T>` now always use explicit
  `MessagePackFormatter` instead of conditionally using `MessagePackObject(true)` on .NET 8+

### Documentation
- Added [api-index.md](api-index.md) &ndash; condensed type reference (~300 lines) alongside [api-index-full.md](api-index-full.md) (full API index)


## 12.0.85+53469221

Release date: 2026-02-06

### Breaking Changes
- `CpuTimestamp.PositiveInfinity` and `CpuTimestamp.NegativeInfinity` renamed to `MaxValue` and `MinValue`
- `CoarseCpuClock` removed as mostly useless, use `CpuClock` instead; 
- `MomentClockSet` no longer has a `CoarseCpuClock` property and its constructor no longer accepts a `coarseCpuClock` parameter

### Changed
- RPC keep-alive tracking now uses `Moment` (wall-clock time) instead of `CpuTimestamp`,
  fixing reliability issues on Unix systems where CPU sleep could stall timestamps

### Fixed
- `IRpcSharedObject.LastKeepAliveAt` changed from `CpuTimestamp` to `Moment` &ndash;
  `CpuTimestamp` could freeze during CPU sleep on Unix, causing incorrect keep-alive tracking
- `RpcHub.Clock` renamed to `RpcHub.SystemClock` (now uses `SystemClock` instead of `CpuClock`)
  by the same reason

### Documentation
- XML summary descriptions added (auto-generated with Claude Code) to all public types and members
- Added `Api-Index.md` &ndash; a comprehensive type catalog listing all public types
  across `ActualLab.Fusion` NuGet packages


## 12.0.76+7e668fb2

Release date: 2026-02-04

### Fixed
- `RpcRerouteException` handling code no longer attempts to reroute during disposal of `IServiceProvider`,
  preventing potential rerouting cycles during shutdown


## 12.0.70+1775d374

Release date: 2026-02-03

### Fixed
- `RpcStream` with `IsReconnectable == false` fails right on the first enumeration 
  rather than after the reconnection attempt


## 12.0.65+68251969

Release date: 2026-02-03

### Added
- `RpcStream.IsReconnectable` property &ndash; controls whether a stream can be reconnected after disconnection;
  `true` by default, set to `false` to make reconnection attempts fail with `RpcStreamNotFoundException`
- `RpcStreamNotFoundException` &ndash; new exception thrown when attempting to reconnect a non-reconnectable
  or expired stream

### Tests
- Added `FlakyTest.XUnit` dependency for marking time-dependent tests as flaky
- Marked timing-sensitive tests (`ConcurrentTimerSetTest`, `ConcurrentFixedTimerSetTest`) with `[FlakyFact]`
  attribute for improved test reliability


## 12.0.60+9bb19676

Release date: 2026-02-01

### Breaking Changes
- `IOperationEventSource.ToOperationEvent()` signature changed: now accepts `IServiceProvider` parameter
  instead of no parameters (intermediate version accepted `IOperationScope`)
- `MemoryBuffer<T>` replaced with `RefArrayPoolBuffer<T>` &ndash; migrate by updating type references
  and using `ArrayPool<T>` constructor parameter
- `ArrayPoolBuffer<T>`, `ArrayOwner<T>`, and `BufferWriterExt` moved from `ActualLab.IO` to
  `ActualLab.Collections` namespace

### Added
- `RefArrayPoolBuffer<T>` &ndash; a ref struct buffer backed by `ArrayPool<T>` with configurable pool
  and clearing behavior
- `TimeSpan?.ToShortString()` extension method with customizable null fallback value
- `ArrayPools` static class providing common array pool instances

### Changed
- `ArrayPoolBuffer<T>` enhanced with additional constructor overloads and `ToArrayOwner()` method

### Fixed
- `AsyncTaskMethodBuilder` extension methods now check task completion state before accessing
  `Task.Exception`, preventing potential inner exceptions

### Tests
- Improved ActualLab.Rpc test stability with positive `maxWaitTime` validation
- Better test database isolation in `FusionTestBase`

### Documentation
- Added `BatchSize` property documentation to RpcStream flow control section
- Added Docker benchmark results to performance documentation

### Infrastructure
- Added `Clean.cmd` script for cleaning build artifacts on Windows and Unix platforms


## 12.0.45+0ee956d2

Release date: 2026-01-29

### Performance
- Simplified `RpcOutboundMessage` by replacing `WhenSerialized` Task with synchronous `SendHandler` callback;
  dependencies like `RpcOutboundCall.SendXxx`, `RpcStream.OnItem`, `OnBatch`, and `OnEnd` transitioned from `Task` 
  to `void` return type reducing task allocations in the RPC send path, bringing ~20% performance improvement.

### Tests
- Added comprehensive unit tests for `TaskCompletionHandler` covering various task states
  (completed, faulted, cancelled) and all handler variants (1, 2, 3 state objects)

### Infrastructure
- Removed obsolete `docs.sln` file
- Removed JetBrains.Annotations package reference
- Updated package versions: Blazorise 1.8.9 (used only in samples), Bullseye 6.1.0, and CliWrap 3.10.0 (used in Build.csproj)
- Updated analyzer packages: Moq.Analyzers, xunit.analyzers, Roslynator.Analyzers, Meziantou.Analyzer.


## 12.0.34+842f172c

Release date: 2026-01-28

### Added
- Native little-endian serialization support in RPC serializers with optimized memory handling
- `TestServiceProviderTag` to tag test `ServiceProvider`s and allow services to detect whether
  they're running in test containers
- New `MemoryReader` and `SpanWriter` helpers in `ActualLab.Core.IO.Internal`

### Performance
- Improved RPC performance dedicated path for little endian serialization and delegate caching
- Eliminated `RpcPeer.Send` indirection layer - `RpcTransport.Send` now handles error handling directly,
  reducing call stack depth and improving RPC throughput
- Introduced `TaskCompletionHandler` - a pooled helper for attaching completion callbacks to tasks.
  Each instance caches its delegate, and instances are pooled using thread-static pools to minimize allocations
  in hot paths like RPC transport error handling
- Enabled `UseUnsafeAccessors` build configuration for .NET 8+ targets, improving internal reflection-based
  operations performance

### Fixed
- Big endian system support: serialization, RPC, and all dependent code now correctly use
  `BinaryPrimitives.WriteInt32LittleEndian` and similar methods to ensure consistent byte ordering
  across different CPU architectures

### Tests
- Added `ResetClientServices()` calls to all relevant Fusion and RPC tests
- Refactored RPC test organization for better separation of concerns.

### Documentation
- Added interactive BarChart component for performance benchmarks visualization
- Improved Mermaid flowchart styles and edge label rendering
- Updated Performance page with new benchmark visualizations
- Integrated CHANGELOG into the documentation website
- Updated coding style guide to clarify async method naming conventions


## 12.0.9+3e71b6ef

Release date: 2026-01-27

### Breaking Changes
- New `v6` serialization format: `mempack6`, `msgpack6` and their variants with `c` suffix
- All serialization formats below `v5` are gone, use `v11.5.1` if you still need them
- `WebSocketChannel` is replaced by `RpcWebSocketTransport`
- All authentication-related types from `ActualLab.Fusion.Server` are moved to `ActualLab.Fusion.Ext.*` 
  assemblies and changed namespace from `ActualLab.Fusion.Server.Authentication` to `ActualLab.Fusion.Authentication`,
  so referencing `ActualLab.Fusion.Server` assembly now doesn't "drag" the authentication-related types into your project
  (and that was the reason for this change).

### Added
- `mempack6` and `msgpack6` serialization format versions; they offer a tiny improvement (2 bytes per call) 
  over v5, and that's only because the zero-copy serialization in RPC transport layer made v5 a bit less efficient
  (it has to reserve 5 bytes for the message length, because it uses WriteVarUInt32 for length, so v6 changes
  length encoding to regular UInt32).
- `RpcStream.BatchSize` property for controlling stream batching behavior (default: 64, range: 1..1024)
- Real-time stock ticker demo added to `TodoApp` sample.

### Changed
- Consolidated buffer size properties in `RpcWebSocketTransport` (renamed `WriteFrameSize` to `FrameSize`)
- Very significant changes in `ActualLab.Rpc` internals. In particular, old `RpcMessage` is now represented
  by `RpcOutboundMessage` and `RpcInboundMessage` types, all serialization-related methods now accept 
  different arguments, etc.

### Performance
- Zero-copy serialization in RPC transport layer. Earlier an intermediate buffer (`ArgumentData`) was used 
  to serialize RPC call arguments and results. Later `RpcMessage` (envelope) serializer was combining 
  that data with other required pieces (method reference, call ID, etc.) in the final buffer.
  Now the intermediate buffer is eliminated, which significantly boosts RPC performance on large messages.
  `Stream10K` test shows almost 3x speed improvement on 10KB items.
- Switched `WriteChannelOptions` to `UnboundedChannelOptions`
- Buffer renewal and reuse logic was significantly improved as well.

### Documentation
- New documentation website: https://fusion.actuallab.net/


## 11.4.7+3045fd2c

Release date: 2025-01-05

### Added
- Updated EntityFrameworkCore and Npgsql versions to 10.0. 
  There is currently no MySql EF Core provider for EF10, so if you want to use Fusion with MySql,
  the latest version that targets EF9 is 11.4.3; you can also add binding redirects for EF9 manually
  in your project.
- `RpcMethodAttribute` for method-level RPC configuration
- `v5` serialization formats with proper polymorphic `null` value support, 
  including  `json5`, `njson5`, `msgpack5`, `msgpack5c`, `mempackc`, and `mempack5c`.
- New `IRpcMiddleware` stack replacing `IRpcInboundCallPreprocessor`
- `RpcLocalExecutionMode` enum and new `RpcLocalExecutionMode.Constrained`, `RpcLocalExecutionMode.ConstrainedEntry` modes
- `IOperationEventSource` interface with `Operation.AddEvent(...)` overload for event sourcing
- `IWorker.Run` overload with `CancellationToken`.
- Much more robust RPC (re)routing logic in `RpcInterceptor`, `RpcRoutingCommandHandler`, 
  and `RemoteComputeMethodFunction`.

### Changed
- Moved all `RpcXxx` delegates to `RpcXxxOptions` members for clarity.
  E.g., `RpcOutboundCallOptions.RouterFactory` replaces `RpcCallRouter` delegate.
- Renamed `RpcShardRoutingMode` to `RpcLocalExecutionMode`
- Renamed `RpcDefaultSessionInboundCallPreprocessor` to `RpcDefaultSessionReplacer`
- Simplified `RpcSerializationFormatResolver` (the legacy resolver for the "unspecified" format is gone)
- Improved `RpcServiceDef` and `RpcMethodDef` constructors
- Improved `ComputedOptions` caching
- Updated .NET SDK to version 10.0.101.

### Performance
- Multiple improvements in inbound call processing performance, such as
  handcrafted server invokers for most frequent RPC system calls like `$sys.Ok`
- `WebSocketChannel.Options` got `ReadMode`, which can be `Buffered` or `Unbuffered`.
  The new `Unbuffered` mode allows reading directly from `WebSocket` bypassing `ChannelReader`,
  it's used by default now.
- `GetUnsafe` in `GenericInstanceCache` to eliminate some unnecessary type casts
- Overall, v11.4.X is ~5-10% faster on RPC benchmarks.

### Documentation
- Migrated Parts 01-13 from the old tutorial, though only parts 01-03 are truly edited at this point
- Added TOCs to videos on Fusion and ActualLab.Rpc
- Added GitHub workflow for deploying documentation to GitHub Pages: https://fusion.actuallab.net/
- Documentation is a work in progress, and you're welcome to contribute!

### Fixed
- Multiple issues related to RPC rerouting
- `RpcCommandHandler` repeatedly sending commands to the server
- A new bug in `FrameDelayers.MustDelay` method (introduced in late v11.3.X), 
  which effectively disabled RPC frame delaying
- Use of incorrect Handshake index on some reconnection attempts – the issue was rare, but once it happened,
  it was blocking RPC reconnects for ~5 min.
- `Task.Result` usage is replaced with `.GetAwaiter().GetResult()` everywhere (it's faster and safer)
- `$csys.Invalidate` calls (remote invalidation notifications) now trigger 
  `Computed.Invalidate(immediately: true)` call rather than just `Computed.Invalidate()`,
  which eliminates double delay for RPC compute methods that use invalidation delay
- Various minor fixes.

### Tests
- `WebTestHelpers.GetUnusedLocalUri` helper method in `ActualLab.Testing`
- `CapturingLogger` and `CapturingLoggerProvider` in `ActualLab.Testing`
- Improved cancellation and timeout handling in RPC tests
- Added benchmark tests for `Task.Result` vs `Task.GetAwaiter().GetResult()`
- Added `CapturingLogger` unit test


## 11.0.15+ec823882

Release date: 2025-11-05

### Changed
- Returned back `IMutableState.Value` setters (they were removed in v11.0.8)
- Added "Must" prefix to `RpcDefaultCallTracer.TraceInbound` and `TraceOutbound` flags for consistency with bool field naming rules.

### Fixed
- Adjusted `RpcDefaultDelegates.CallTracerFactory` to enable full tracing for server (`RuntimeInfo.IsServer`), and no tracing for the client.

### Changed in Samples
- TodoApp: Updated Aspire SDK to version 9.5.2 and centralized its version configuration
- TodoApp: Temporarily disabled Microsoft Account authentication (the current credentials are expired).


## 11.0.8+1fd1d61afb

Release date: 2025-11-02

### Breaking Changes
- Revamped `RpcServiceBuilder` API. Its new `Inject` method "injects" a service described by `RpcServiceBuilder` into `IServiceCollection` 
- `RpcBuilder` and `FusionBuilder`'s `AddXxx` methods now rely on `RpcServiceBuilder.Inject`
- `IMutableState` and `MutableState` lost `Value` setter; use `Set(...)` methods to set it. Invalidation path tracking is the reason of this change: new `.Set(...)` overloads use `[CallerFilePath]`, `[CallerMemberName]`, and `[CallerLineNumber]` to propagate the origin of change to the invalidation logic, and there is no way to achieve the same with `.Value` property. I may end up returning it with `[Obsolete]` attribute though.
- Renamed `IHasIsDisposed` to `IHasDisposeStatus`
- Removed `RpcServiceMode.DistributedPair` mode and related logic (`Distributed` mode offers more anyway)
- Removed `RpcSwitchInterceptor`;

### Added
- Quite useful `ComputedOptions.ConsolidationDelay` and related APIs (see Releases chat on https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo for details) 
- Invalidation path tracking: `InvalidationSource`, `Invalidation.TrackingMode`, and other changes
- `Computed.ToString(InvalidationSourceFormat)` is `Computed.ToString()`, but with invalidation path info
- `FusionMonitor` is now capable of gathering invalidation path statistics. 

### Changed
- More readable output of `MethodInfo.ToShortString()` is now used to dump compute service methods

### Fixed
- Another issue in `RpcCallTracker.TryReconnect` that may block stateful reconnect
- A couple places in Fusion RPC stack where `Computed.Invalidate(immediately: false)` was used instead of `Computed.Invalidate(immediately: true)`  
- Incorrect use of `Sampler`-s in `FusionMonitor`: missing "not" was making it to sample where it had to skip, and vice versa :( That's why statistics was typically 7x exaggerated there (the probability of logging `EveryNth(8)` is 7/8, i.e. close to 1, but it was reporting it as 1/8).


## 10.6.38+254f4ef775

Release date: 2025-10-28

### Changed
- **Breaking**: Replaced `RpcCallRouteOverride` with `RpcCallOptions`, 
  expect more changes in this area
- Removed `RpcNonRoutingInterceptor` and related infrastructure;
  `RpcRoutingInterceptor` does a bit more and equally fast
- Updated CODING_STYLE.md

### Fixed
- `RpcCallTracker.TryReconnect` - `IncreasingSeqCompressor.Serialize` was getting 
  a potentially misordered sequence making fast (stateful) reconnect impossible,
  though stateless reconnect still worked in these cases  
- Renamed `CompleteAsync` class to `Completion` to correct a previous wrong rename
- `RpcRoutingInterceptor` now properly reroutes local calls as well

### Tests
- Added new MeshRpc tests; will be extending them in the near future
- Refactored `FusionTestBase` descendants to move DI of test-specific services to specific tests
- Reorganized DB model classes under `DbModel` namespace in tests


## 10.6.18+af2a52320f

### Fixed
- ActualLab.Generators now add #if-s suppressing [UnconditionalSuppressMessage] and [ModuleInitializer] for .NET Framework 4.7.2 and .NET Standard 2.0.

## 10.6.16+d0431715b7

Release date: 2025-10-27

### Changed
- Renamed `ChannelReadMode` to `WebSocketChannelReadMode`
- Removed `IChannelWithReadMode`, updated `WebSocketChannel` to implement `IAsyncEnumerable` directly.

### Performance
- Adjusted `BoundedChannelOptions` for `ReadChannel` (120→100) and `WriteChannel` (120→500)
  in `WebSocketChannel` to optimize buffering behavior

### Infrastructure
- Added `UnbufferedPushSequence<T>` for unbuffered async data streaming
- Added `[UnsafeAccessor]`-based helpers for `AsyncTaskMethodBuilder<T>` in `AsyncTaskMethodBuilderExt`.

### Documentation
- Replaced `.instructions.md` with updated `AGENTS.md` and `CODING_STYLE.md`


## 10.6.4

Release date: 2025-10-25

### Breaking Changes
- **Breaking**: Removed `FusionDefaults` and `FusionMode` types.
  Use `RuntimeInfo.IsServer`, `ComputedRegistry.Settings`, and `Timeouts.Settings` instead.
- **Breaking**: Removed `RpcMode` type. Use `RuntimeInfo.IsServer` instead.
- **Breaking**: `ComputedRegistry.Instance` is gone, the whole class is now static
- **Breaking**: `Timeouts` and `IGenericTimeoutHandler` are moved to
  `ActualLab.Time` namespace.
- **Breaking**: reworked `OperationEvent` API enabling events with quantized delay.
  Such events have Uuid, which includes its DelayUntil value, and have quantized DelayUntil.
  So you can use them to implement reliable throttling for such activities as post-change
  indexing or AI processing
- **Breaking**: `IHasDelayUntil` interface is removed, and thus its support in
  `OperationEvent` handling logic.
- **Breaking**: .NET Framework 4.7.1 target is replaced with .NET Framework 4.7.2

### Added
- .NET 10 RC2 support
- `allowInconsistent` flag in `Computed/AnyState/ComputedSource.Use()` and
  `.UseUntyped()` methods. Get the value even if it's inconsistent; when called
  inside a compute method, instantly invalidates the newly created computed
  if an inconsistent dependency gets captured.
- `bool Operation.MustStore` property allowing to disable the operation log entry creation;
  this is useful when you're sure you don't need distributed invalidation for the current
  operation - e.g., you know that only the local machine is responsible for exposing modified data.
  When `MustStore` is `false`, a `DbEvent` (in `Processed` state) is created instead of 
  an `DbOperation` entry to verify commit in case of commit failure.
- `OperationScope.CompletionHandlers` allowing to register operation completion handler
  right inside the command handler
- `RpcCallRouteOverride` type allowing to override outgoing RPC call routing 
  (e.g., set destination peer)
- `Moment.Floor`, `Moment.Ceiling`, `Moment.Round`, and `Moment.Convert` methods;
  `Moment.Ceiling` is used to quantize delayed events.  

### Changed
- Moved command routing logic to `RpcRoutingCommandHandler`
- Renamed `ComputeServiceCommandCompletionInvalidator` to `InvalidatingCommandCompletionHandler`
- Improvements in `RetryPolicy` / `IRetryPolicy`, including exception filters
- `ArgumentListG*<...>` is now IL/AOT-trimmable via `ArgumentList.AllowGenerics` feature switch

### Fixed
- Native AOT support in .NET 10
- A bug in `ComputeRegistry` that could cause `ComputedRegistry` 
  to expose a wrong `Computed` due to a race between `ComputedRegistry.Get` 
  and `ComputedRegistry.Register`. If `Get` gets paused between a moment it
  read a handle and resolved its `Target`, the handle with the same `IntPtr` value 
  might get re-allocated.
  This is extremely rare, but nevertheless, we saw this happening in production.
- The identical bug in `RpcObjectTracker` (it's used to track `RpcStream`-s).
- `IDelegatingCommand` now "implements" `IOutermostCommand` (it was supposed to, but didn't)
- `StatefulComponent.StateChanged` handler now suppresses `ExecutionContext` flow
- Bug in `RpcSystemCallSender.Ok` breaking `RpcStream` serialization in call results
- Bug in `RpcStream` enumerator
- Proper framework version check in `CpuTimestamp` for .NET 10 WASM
- Removed `Microsoft.Extensions.Http` reference from `ActualLab.Rpc`

### Performance
- `WebSocketChannel.ReadMode` and corresponding option enabling unbuffered reads
  without use of `Reader` (which is backed by its own `Channel`).
  This option alone improves RPC performance by 5%.
- Use `CancellationToken.None` in `WebSocket` operations in `WebSocketChannel`
  without sacrificing cancellation support 
  (`WebSocket` is properly disconnected on cancellation now)
- `RpcStream` now uses `Memory<byte>` instead of `byte[]` for its buffer.
- Use of `Unsafe.As<T>(x)` instead of `(T)x` in a few key places.
- Improvements in key Fusion components, including 
  `ComputedRegistry`, `Computed`, and `ComputedState`, 
- Improvements in Blazor components, including 
  `StatefulComponentBase` and `ComputedStateComponentBase` 
- Improvements in infrastructure components, including 
  `ArgumentList`, `FixedArray`, `AsyncLock`, and `AsyncLockSet`.

### Infrastructure
- Added `WeakReferenceSlim` (currently unused)
- Added `TaskExt.NeverEnding(CancellationToken)` helper
- Added `FixedTimerSet` and `ConcurrentFixedTimerSet`
- Improved `CancellationTokenSource`-based timeout handling code across the board
- Improved tests.

### Documentation
- Added `.instructions.md` (like AGENTS.md) for agent rules
- Finalized Part01, added examples for `Computed<T>.When()` and `Changes()` methods.


## Key Changes in 2025

- **Documentation website launch** &ndash; https://fusion.actuallab.net/ with VitePress,
  migrated Parts 01–13 from the old tutorial, video TOCs, GitHub Pages deployment workflow.
- **RPC routing and distributed services overhaul** &ndash; new `RpcLocalExecutionMode`,
  `IRpcMiddleware` stack (replacing `IRpcInboundCallPreprocessor`), `RpcRoutingCommandHandler`,
  `RpcCallOptions`, `RpcServiceBuilder.Inject`, and much more robust rerouting logic
  for shard-aware distributed services.
- **Invalidation path tracking and consolidation** &ndash; `InvalidationSource`,
  `Invalidation.TrackingMode`, `ComputedOptions.ConsolidationDelay` for grouping rapid
  invalidations, and `FusionMonitor` invalidation path statistics.
- **.NET 10 support**.


## Key Changes in 2024

- **RPC serialization formats revamp** &ndash; introduced `mempack2`/`msgpack2` binary formats with
  compact method name hashes (`mempack2c`/`msgpack2c`), serialization format negotiation,
  and zero-copy serialization in the transport layer. `RpcByteMessageSerializer` and
  `FastRpcMessageByteSerializer` brought significant throughput gains.
- **`OperationEvent` introduction** &ndash; event handling with `DbEventTestBase`,
- **.NET 9 support and Native AOT** &ndash; full .NET 9 support (RC1 → release), proxy generators
  updated with AOT-compatible code generation (`ProxyCodeKeeper`, `KeepCode`), and
  `[UnsafeAccessor]`-based helpers for internal reflection.
- **.NET 9 support**.


## Key Changes in 2023

- **`ActualLab.Rpc` &ndash; new RPC framework** &ndash; built from scratch starting April 2023,
  replacing the old `Replica`/`Publisher`/`Replicator` bridge with a modern WebSocket-based
  RPC system. Includes `RpcPeer`, `RpcStream`, `RpcHub`, call routing, reconnection,
  shared object tracking, and binary serialization.
- **Compute caching (client-side)** &ndash; `ClientComputeMethodFunction` improvements and
  `RpcCacheKey` for caching RPC compute method results on the client side.
- **Blazor improvements** &ndash; `ComputedState.Options.TryComputeSynchronously` for faster
  initial rendering, improved `ComputedStateComponent`, `BlazorCircuitContext` enhancements,
  and `RpcPeerStateMonitor` for connection state UI.
- **Rename from `Stl.*` to `ActualLab.*`** &ndash; all NuGet packages, namespaces, and project files
  renamed in December 2023 (e.g., `Stl.Fusion` → `ActualLab.Fusion`, `Stl.CommandR` →
  `ActualLab.CommandR`).
- **.NET 8 support** &ndash; full .NET 8 support including `[UnsafeAccessor]` usage,
  IL trimming markup, `[DynamicDependency]` annotations, and AOT-related preparations.


## Key Changes in 2022

- **Roslyn proxy generators** &ndash; `Stl.Generators` package with `ProxyGenerator` for
  compile-time proxy generation via Roslyn source generators, replacing runtime Castle
  DynamicProxy for `[ComputeMethod]` and command service interception.
- **.NET 7 support** &ndash; added .NET 7 targeting (RC2 → release), updated framework
  dependencies, and CI workflows.


## Key Changes in 2021

- **Binary serialization** &ndash; initial `MessagePack` serialization support,
  `IByteSerializer`/`ITextSerializer` abstractions, and `TypeDecoratingSerializer`
  for polymorphic serialization. Refactored text serializers from `ITextWriter`/`ITextReader`
  to simpler Read/Write overloads.
- **OpenTelemetry support** &ndash; initial `System.Diagnostics.DiagnosticSource` integration
  with `ActivitySource`-based tracing for compute methods and command handlers.
- **.NET 6 support**.


## Key Changes in 2020

Year of project inception.

- **Fusion core** &ndash; established the foundational `Computed<T>`, `ComputeMethod`,
  `State`/`MutableState`/`LiveState` abstractions, `ComputedRegistry`, automatic
  dependency tracking, and invalidation pipeline.
- **CQRS / CommandR** &ndash; `Stl.CommandR` command processing pipeline with
  `ICommand<T>`, `CommandContext`, `CommandHandler`, and middleware pipeline
  for orchestrating side-effect-producing operations alongside Fusion's read model.
- **Replica services and WebSocket bridge** &ndash; `ReplicaService`, `Publisher`/`Replicator`
  bridge over WebSockets, `SubscriptionProcessor` for managing live subscriptions.
- **Entity Framework integration** &ndash; `Stl.Fusion.EntityFramework` with `DbOperationScope`,
  `DbAuthService`, `DbSessionInfo`, early multi-tenancy support, and PostgreSQL/MySQL/SQL Server
  provider compatibility.
- **.NET 5 and multi-targeting** &ndash; migrated from .NET Core 3.1 to .NET 5 with
  multi-targeting.
