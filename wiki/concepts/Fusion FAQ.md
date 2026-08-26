---
type: concept
title: "Fusion FAQ"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - faq
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Overview]]"
source: "[[fusion-docs-overview]]"
---

# Fusion FAQ

## General

**Where to ask questions?** — [Fusion Place @ Voxt](https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo)

**Can I contribute?** — Yes, open a PR or report issues on [GitHub](https://github.com/ActualLab/Fusion).

## Use Cases

**Can I use Fusion with server-side Blazor?** — Yes. The same real-time update logic works on Blazor Server. You don't need API controllers supporting Fusion publication — your models can depend directly on server-side compute services.

**Can I use Fusion without Blazor?** — Yes, Fusion works in all .NET Core apps. For native JavaScript clients, there is no native JS client yet, but you can export state maintained by Fusion to JS after each update.

**Benefits of server-side only Fusion?** — Any Fusion-backed service gets a cache that invalidates right when it should, minimizing the percentage of inconsistent reads. Excellent for caching scenarios requiring near real-time invalidation.

## Comparisons

- [How similar is Fusion to SignalR?](https://medium.com/@alexyakunin/how-similar-is-stl-fusion-to-signalr-e751c14b70c3)
- [How similar is Fusion to Knockout / MobX?](https://medium.com/@alexyakunin/how-similar-is-stl-fusion-to-knockout-mobx-fcebd0bef5d5)
- See also: [Fusion vs MediatR (CommandR comparison)](Fusion CommandR.md)

## Architecture

**What's the relationship between Fusion and ActualLab.Rpc?** — Rpc is the transport layer (WebSocket-based, fastest on .NET). Fusion builds on top of it to add `Computed<T>` replication, automatic caching, and invalidation propagation across the network. You can use Rpc standalone for high-performance RPC without Fusion.

**What's CommandR used for?** — CommandR is the CQRS pipeline that powers the Operations Framework. It provides command dispatch, handler pipelines, and distributed execution. Nearly all state mutations in Fusion go through CommandR commands.
