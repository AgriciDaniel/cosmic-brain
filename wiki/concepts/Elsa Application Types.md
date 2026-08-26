---
type: concept
title: "Elsa Application Types"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - dotnet
  - deployment
  - blazor
status: developing
address: c-000057
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Containers]]"
  - "[[Elsa Workflow Concepts]]"
---

# Elsa Application Types

[[entities/Elsa Workflows]] can be deployed in three application configurations: **Elsa Server**, **Elsa Studio**, or **Server + Studio (WASM)**. Each serves a different role in the architecture.

---

## Elsa Server

An ASP.NET Core web application that hosts the workflow execution engine and exposes REST APIs for workflow management and execution.

**Key responsibilities:**
- Workflow execution via the runtime engine
- REST API endpoints for management
- Trigger processing (HTTP, Timer, Events)
- Background services for scheduling
- Authentication and authorization

**Setup commands:**
```bash
dotnet new web -n "ElsaServer"
cd ElsaServer
dotnet add package Elsa
dotnet add package Elsa.Persistence.EFCore
dotnet add package Elsa.Persistence.EFCore.Sqlite
dotnet add package Elsa.Http
dotnet add package Elsa.Identity
dotnet add package Elsa.Scheduling
dotnet add package Elsa.Workflows.Api
dotnet add package Elsa.Expressions.CSharp
dotnet add package Elsa.Expressions.JavaScript
dotnet add package Elsa.Expressions.Liquid
```

**Key configuration** in `Program.cs`:
- `UseWorkflowManagement()` / `UseWorkflowRuntime()` — persistence setup
- `UseIdentity()` / `UseDefaultAuthentication()` — auth
- `UseWorkflowsApi()` — REST endpoints
- `UseRealTimeWorkflows()` — SignalR hub for real-time updates
- `UseHttp()` — HTTP activity support
- `UseScheduling()` — timer/cron activities
- `UseCSharp()` / `UseJavaScript()` / `UseLiquid()` — expression languages

Default login: `admin` / `password`

---

## Elsa Studio

A standalone Blazor WebAssembly application that provides the visual workflow designer UI. It connects to an Elsa Server instance as its backend.

**Key features:**
- Visual drag-and-drop workflow designer
- Activity configuration UI
- Workflow execution monitoring (real-time via SignalR)
- Instance management and execution history

**Setup commands:**
```bash
dotnet new blazorwasm -n "ElsaStudioBlazorWasm"
cd ElsaStudioBlazorWasm
dotnet add package Elsa.Studio
dotnet add package Elsa.Studio.Core.BlazorWasm
dotnet add package Elsa.Studio.Login.BlazorWasm
dotnet add package Elsa.Api.Client
```

**Backend configuration** (`wwwroot/appsettings.json`) points to the Elsa Server URL:
```json
{
  "Backend": {
    "Url": "https://localhost:5001/elsa/api"
  }
}
```

Studio communicates with the Server via REST APIs and receives real-time updates through SignalR.

---

## Elsa Server + Studio (WASM)

A combined ASP.NET Core application that hosts both the workflow server and the Blazor WASM Studio UI as a single deployable unit. The Blazor WASM static files are served from the same ASP.NET Core host.

**Architecture:** Two projects in one solution:
- **Host project** (`ElsaServer`) — ASP.NET Core web app with full Elsa Server setup, also serves Blazor static assets
- **Client project** (`ElsaStudio`) — Blazor WASM app with Studio packages, no separate server needed

**Setup commands:**
```bash
dotnet new sln -n ElsaServerAndStudio
dotnet new web -n "ElsaServer"
dotnet new blazorwasm -n "ElsaStudio"
dotnet sln add ElsaServer/ElsaServer.csproj
dotnet sln add ElsaStudio/ElsaStudio.csproj
cd ElsaServer
dotnet add reference ../ElsaStudio/ElsaStudio.csproj
```

**Host project packages** (same as Elsa Server plus WASM hosting):
```bash
dotnet add package Microsoft.AspNetCore.Components.WebAssembly.Server
```

**Client project packages** (same as Elsa Studio).

The host serves the Blazor WASM app via `MapFallbackToPage("/_Host")` and the client retrieves its API URL from a JavaScript bridge (`getClientConfig()`).

**Benefit:** Single deployment unit, simpler DevOps, while still maintaining the logical separation between server and UI.

---

## Comparison

| Aspect | Elsa Server | Elsa Studio | Server + Studio (WASM) |
|--------|-------------|-------------|------------------------|
| What it runs | Workflow engine + REST API | Visual designer UI | Both in one deployment |
| Hosting model | ASP.NET Core | Blazor WASM (standalone) | ASP.NET Core serving Blazor WASM |
| Requires separate Studio? | Yes | Yes (Server) | No |
| Deployment units | 1 (plus Studio) | 1 (plus Server) | 1 |
| Best for | Backend API, headless | UI-only | Simple deployments, POCs |

All three configurations use the same default credentials: `admin` / `password`.
