---
type: entity
title: "Elsa Workflows"
created: 2026-05-25
updated: 2026-05-25
tags:
  - entity
  - dotnet
  - workflow-engine
  - open-source
status: developing
address: c-000052
related:
  - "[[entities/_index]]"
  - "[[Elsa Workflows Source Overview]]"
---

# Elsa Workflows

**Elsa Workflows** is an open-source .NET library set for adding workflow capabilities to .NET applications. Think of it as Lego blocks for building workflow engines.

- **Repository**: [github.com/elsa-workflows/elsa-core](https://github.com/elsa-workflows/elsa-core)
- **Version**: 3.x (current)
- **License**: MIT
- **Platform**: .NET 8+

## Core Capabilities

1. **Programmatic workflows** — define workflows in C# code using a fluent builder API
2. **Visual designer** — drag-and-drop workflow design via Elsa Studio (Blazor WASM)
3. **Declarative JSON** — define workflows as JSON for portability

## Key Features

- **Long & short running workflows** — from milliseconds to years
- **Rich activity library** — out-of-the-box building blocks for common patterns
- **Triggers** — HTTP, Timer, Cron, and custom event-driven workflow activation
- **Dynamic expressions** — C#, JavaScript, Python, and Liquid for runtime evaluation
- **Extensibility** — custom activities, triggers, middleware, persistence providers
- **Scalable** — horizontal scaling with distributed runtime, locking, and caching
- **Multi-tenancy** — tenant isolation at database, schema, or row level
- **Alterations** — modify running workflow instances without restarting

## Architecture Layers

```
Presentation  →  Elsa Studio (Blazor WASM), REST APIs, SignalR
Application   →  Workflow Management, Activity Registry, Trigger System
Runtime       →  Workflow Execution Engine, Bookmark Manager, Dispatcher
Persistence   →  EF Core (SQL Server/PostgreSQL/SQLite/MySQL) or MongoDB
```

## Package Ecosystem

| Package | Purpose |
|---------|---------|
| `Elsa` | Main bundle (Core + Management + Runtime) |
| `Elsa.Workflows.Core` | Core workflow engine |
| `Elsa.Workflows.Management` | Definition and instance management |
| `Elsa.Workflows.Runtime` | Execution runtime and dispatch |
| `Elsa.Workflows.Api` | REST API endpoints |
| `Elsa.Studio` | Visual designer infrastructure |

## Comparison

Elsa occupies the .NET workflow space alongside Windows Workflow Foundation (legacy), Workflow Core (community), and Azure Durable Functions (cloud). Elsa differentiates with its visual designer, multi-tenancy, and on-premises + cloud flexibility.

## Known Limitations (v3)

- Documentation is still evolving
- Designer supports Flowchart activities only (Sequence/StateMachine planned)
- Starting workflows from designer requires no input and no trigger
- UI input validation not yet implemented
