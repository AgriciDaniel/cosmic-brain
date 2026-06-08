---
type: concept
title: "ActualLab.Fusion Overview"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - realtime
  - reactivity
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion Story & Philosophy]]"
source: "[[fusion-docs-overview]]"
---

# ActualLab.Fusion Overview

Fusion is a .NET library for building real-time, reactive applications. It has two core capabilities:

1. **Keeping data fresh** — data automatically updates when something changes; all users see the same current information; no manual refresh needed
2. **Making apps fast** — data is cached intelligently, only changed data is transferred, apps stay responsive even with complex data

## The MSBuild/Make Analogy

Think of Fusion as **MSBuild for data** processed by your backend, API, and client-side UI:

- **Targets** = method calls like `GetUser(userId)`
- **Artifacts** = method call results (cached values)
- **Dependencies** = other method call results acquired during method execution
- **Incremental builds** = when you request a result, only outdated parts recompute

When data changes, dependent computed values are **immediately marked as inconsistent** (like dirty build targets). But they don't recompute until someone actually requests them (**lazy computation**). Old values remain accessible — the UI can keep displaying them while updates are in progress.

## Three Core Abstractions

1. **[[Fusion Compute Services]]** — services with `[ComputeMethod]` attributes. Methods look like regular C# methods but produce cached, tracked `Computed<T>` values behind the scenes. Think of them as "parameterized recipes" for computed values.

2. **[[Fusion Compute Services & Computed T]]** — immutable results of computations that signal when they become outdated. Each `Computed<T>` is bound to a specific `(service, method, arguments)` triplet. When invalidated, calling the method again produces a new `Computed<T>`.

3. **[[Fusion States]]** — objects encapsulating a computed value and its auto-update loop (`ComputedState<T>`, `MutableState<T>`). They combine a computed value with an update policy (`IUpdateDelayer`), solving the problem of when to refresh.

## The Dependency Graph

Computed values form a **Directed Acyclic Graph (DAG)** of dependencies:
- When a compute method runs, new edges are added pointing to every other `Computed<T>` it used
- When a value is invalidated, all its dependents are invalidated too (**cascading invalidation**)
- The graph extends across network boundaries — invalidation cascades from backend to client

This is exactly how incremental builds work: mark targets as dirty by removing them, but they only rebuild when you run the build. Every artifact that's still consistent is reused.

## Installation

```bash
dotnet add package ActualLab.Fusion
```

```csharp
services.AddFusion().AddService<UserService>();
```

```csharp
[ComputeMethod]
public virtual async Task<User> GetUser(long id) { ... }
```

That's the entire setup. Your service now has automatic caching, dependency tracking, and real-time invalidation.

## Complexity Levels

Fusion supports three tiers of complexity:

1. **Server-side only** — caching on one server (simplest; just `ActualLab.Fusion`)
2. **Client + server** — real-time updates to browsers via `ActualLab.Rpc` + Blazor integration
3. **Distributed** — multiple servers with [[Fusion Operations Framework]] for multi-host invalidation

Start with server-side only and add layers as you need them.

## When NOT to Use Fusion

- Very simple CRUD applications without real-time requirements
- Applications where caching is not important
- Systems requiring complete control over caching logic
- Projects where you cannot use .NET (Core)
