---
type: concept
title: "Fusion NuGet Packages"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - nuget
  - reference
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
source: "[[fusion-docs-overview]]"
---

# Fusion NuGet Packages

All packages available on [NuGet](https://www.nuget.org/packages?q=tags%3A%22actual_lab_fusion%22+Owner%3A%22Actual.chat%22). Choose based on your project type.

## Selection Guide

| Project Type | Primary Package |
|--------------|----------------|
| Server-side | `ActualLab.Fusion.Server` |
| Blazor app | `ActualLab.Fusion.Blazor` |
| Shared assembly (client + server) | `ActualLab.Fusion` |
| EF Core server | `ActualLab.Fusion.EntityFramework` |

## Package Catalog

### Shared (Foundation)
- **ActualLab.Core** — base abstractions (`Result<T>`, `Option<T>`, time, async primitives)
- **ActualLab.Generators** — Roslyn source generator for proxy types (compile-time)
- **ActualLab.Interception** — call interception API used by generators

### ActualLab.Rpc
- **ActualLab.Rpc** — RPC client with WebSocket transport
- **ActualLab.Rpc.Server** — RPC server for ASP.NET Core
- **ActualLab.Rpc.Server.NetFx** — RPC server for .NET Framework 4.X

### CommandR
- **ActualLab.CommandR** — CQRS command handling (MediatR-like)

### Fusion
- **ActualLab.Fusion** — core Fusion abstractions
- **ActualLab.Fusion.Server** — server-side Fusion + RPC integration

### Database
- **ActualLab.Fusion.EntityFramework** — Operations Framework / EF Core integration
- **ActualLab.Fusion.EntityFramework.Npgsql** — PostgreSQL extensions (LISTEN/NOTIFY)
- **ActualLab.Fusion.EntityFramework.Redis** — Redis extensions (pub/sub)

### Blazor
- **ActualLab.Fusion.Blazor** — Blazor components (`ComputedStateComponent<T>`, etc.)
- **ActualLab.Fusion.Blazor.Authentication** — Blazor auth (`IAuth`, `AuthenticationStateProvider`)

### Auth Extensions
- **ActualLab.Fusion.Ext.Contracts** — auth contracts (client-safe)
- **ActualLab.Fusion.Ext.Services** — auth implementations (server-side)

### Optional
- **ActualLab.Serialization.NerdbankMessagePack** — Nerdbank.MessagePack serialization support
