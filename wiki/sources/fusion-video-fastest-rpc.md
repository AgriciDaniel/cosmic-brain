---
type: source
title: "Video: ActualLab.Rpc — the fastest RPC protocol on .NET"
source_file: "raw/fusion_docs/video/actuallab-rpc-fastest-rpc-protocol-on-net.md"
source_type: video
fetched: 2026-05-25
tags:
  - fusion
  - rpc
  - video
  - transcript
  - performance
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion RPC Framework]]"
  - "[[Fusion Performance & Benchmarks]]"
---

# Video: ActualLab.Rpc — the fastest RPC protocol on .NET

1-hour technical talk covering the design, performance, and architecture of ActualLab.Rpc.

**YouTube:** [Watch on YouTube](https://www.youtube.com/watch?v=vwm1l8eevak)

## Table of Contents

| Timestamp | Topic |
|-----------|-------|
| [0:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=0s) | Introduction and Background |
| [1:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=66s) | What is Fusion |
| [1:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=117s) | History with HTTP |
| [2:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=124s) | Problems with HTTP |
| [4:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=252s) | Building Own Protocol |
| [5:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=354s) | ActualLab RPC Features |
| [10:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=601s) | Performance Highlights |
| [18:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=1091s) | Benchmarks |
| [22:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1328s) | Comparison with Other Protocols |
| [39:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=2343s) | Demo |
| [42:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2568s) | Code Explanation |
| [55:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=3359s) | Mesh Demo |
| [1:02:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=3753s) | Conclusion |

## Key Takeaways

- HTTP is insufficient for modern real-time apps — built custom protocol over WebSockets
- **7.9x faster** than gRPC for RPC calls; **5.3x faster** than SignalR for streaming
- Protocol designed for low overhead: 10.16M calls/s on a single connection
- Supports streaming (`RpcStream<T>`), fire-and-forget (`RpcNoWait`), reverse RPC
- Mesh demo shows multi-server routing with automatic failover
- Full transcript available in source file
