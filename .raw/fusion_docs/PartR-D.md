# ActualLab.Rpc: Diagrams

Diagrams for the RPC concepts introduced in [Part 2](PartR.md).


## RpcPeer Hierarchy

<img src="/img/diagrams/PartR-D-2.svg" alt="RpcPeer Hierarchy" style="width: 100%; max-width: 800px;" />

| Peer Type | Direction | Description |
|-----------|-----------|-------------|
| `RpcClientPeer` | Outbound | Initiates connections, handles reconnection with backoff |
| `RpcServerPeer` | Inbound | Receives connections from server framework (e.g., ASP.NET) |


## Connection State Machine

<img src="/img/diagrams/PartR-D-3.svg" alt="Connection State Machine" style="width: 100%; max-width: 800px;" />

| State | Description |
|-------|-------------|
| Disconnected | No active connection |
| Connecting | Establishing connection and exchanging handshake |
| Connected | Active connection, can send/receive messages |


## RpcPeerRef Types

<img src="/img/diagrams/PartR-D-4.svg" alt="RpcPeerRef Types" style="width: 100%; max-width: 800px;" />

| PeerRef | ConnectionKind | Use Case |
|---------|----------------|----------|
| `Default` | Remote | Standard client-server communication |
| `Local` | Local | Same-process calls (no serialization) |
| `Loopback` | Loopback | Testing with serialization but no network |
| `NewClient(host)` | Remote | Connect to specific host |


## RPC Call Flow

<img src="/img/diagrams/PartR-D-5.svg" alt="RPC Call Flow" style="width: 100%; max-width: 800px;" />


## Compute Service Client Caching

<img src="/img/diagrams/PartR-D-6.svg" alt="Compute Service Client Caching" style="width: 100%; max-width: 800px;" />

| Scenario | Behavior |
|----------|----------|
| Cache hit (consistent) | Return immediately, no RPC |
| Cache miss | Make RPC, cache result |
| Server invalidation | Client replica invalidated, next call triggers RPC |


## Invalidation Propagation

<img src="/img/diagrams/PartR-D-7.svg" alt="Invalidation Propagation" style="width: 100%; max-width: 800px;" />


## RpcStream Data Flow

<img src="/img/diagrams/PartR-D-8.svg" alt="RpcStream Data Flow" style="width: 100%; max-width: 800px;" />

| Direction | Description |
|-----------|-------------|
| Server → Client | Stream items sent in chunks |
| Client → Server | Acknowledgments for backpressure |


## RpcStream Backpressure

<img src="/img/diagrams/PartR-D-9.svg" alt="RpcStream Backpressure" style="width: 100%; max-width: 800px;" />

| Property | Default | Description |
|----------|---------|-------------|
| `AckPeriod` | 30 | Consumer acks every N items |
| `AckAdvance` | 61 | Wire window: producer may have N items in flight past the last ACK |
| `BufferSize` | 0 | Local-only sender ring buffer hint (`0` = inherit `AckAdvance`); set larger to pre-buffer past the in-flight window |
