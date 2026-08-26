---
type: entity
title: "ActualLab.Fusion"
updated: 2026-05-25
tags:
  - entity
  - dotnet
  - framework
  - realtime
  - reactivity
status: developing
related:
  - "[[index]]"
  - "[[entities/_index]]"
  - "[[concepts/_index]]"
  - "[[ActualLab-Fusion Overview]]"
  - "[[Fusion Story & Philosophy]]"
links:
  github: "https://github.com/ActualLab/Fusion"
  docs: "https://fusion.actuallab.net/"
  nuget: "https://www.nuget.org/packages?q=tags%3A%22actual_lab_fusion%22+Owner%3A%22Actual.chat%22"
---

# ActualLab.Fusion

**The end-to-end reactivity framework for .NET.** MIT-licensed, production-proven at [Voxt.ai](https://voxt.ai).

Fusion brings real-time UI updates and distributed caching to any .NET/TypeScript app with minimal code changes. Add `[ComputeMethod]` to your existing services and get automatic caching, dependency tracking, and real-time invalidation — no event buses, no SignalR hubs, no manual pub/sub.

## Key Capabilities

- **End-to-end reactivity**: automatic state sync across server clusters and every connected client
- **~100x faster than Redis**: 20M cache-resolving calls/s per core
- **Fastest .NET RPC**: 2-7x faster than gRPC and SignalR
- **Zero-effort offline**: flip a switch for offline-capable Blazor/MAUI apps
- **Write once, run anywhere**: same code on Blazor Server, WebAssembly, MAUI

## Origin

Originally created as **Stl.Fusion** at [ServiceTitan](https://www.servicetitan.com/), inspired by Quora's LiveNode framework and Steve Sanderson's Knockout.js. Renamed to ActualLab.Fusion after the creators left to build [Voxt.ai](https://voxt.ai).

## Core Abstractions

1. **[[Fusion Compute Services & Computed T]]** — `[ComputeMethod]` + `IComputeService` for automatic caching; `Computed<T>` for immutable results with invalidation
2. **[[Fusion States]]** — `ComputedState<T>` + `MutableState<T>` for auto-updating reactive state

## Architecture Layers

| Layer | NuGet Package | Wiki |
|-------|---------------|------|
| Foundation | `ActualLab.Core` | [[Fusion Core Foundation]] |
| Core Fusion | `ActualLab.Fusion` | [[Fusion Compute Services & Computed T]], [[Fusion States]] |
| RPC | `ActualLab.Rpc` | [[Fusion RPC Framework]] |
| CQRS | `ActualLab.CommandR` | [[Fusion CommandR]] |
| Operations | `ActualLab.Fusion.Operations` | [[Fusion Operations Framework]] |
| EF Core | `ActualLab.Fusion.EntityFramework` | [[Fusion EF Integration]] |
| Blazor | `ActualLab.Fusion.Blazor` | [[Fusion Blazor Integration]] |
| Auth | `ActualLab.Fusion.Authentication` | [[Fusion Authentication]] |
| TypeScript | `@actuallab/fusion` | [[Fusion TypeScript Port]] |

## Key Concepts

- [[Fusion Cache-Aware API Design]]
- [[Fusion Interceptors & Proxies]]
- [[Fusion Native AOT]]
- [[Fusion Serialization]]
- [[Fusion Performance & Benchmarks]]

## Reference

- [[Fusion NuGet Packages]]
- [[Fusion API Reference]]
- [[Fusion FAQ]]
- [[Fusion HelloCart Tutorial]]
- [[Fusion External Resources]]
- [[Fusion Story & Philosophy]]

## Agent Instructions

From the Fusion docs' `AGENTS.md`: the documentation is built with VitePress and uses `mdsnippets` to extract code from `Part*.cs` files into `Part*.md` files. Wiki pages derived from these docs should prefer the `.md` narrative; `.cs` files provide supporting code patterns.
