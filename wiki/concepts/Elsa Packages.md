---
type: concept
title: "Elsa Packages"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - dotnet
  - nuget
status: developing
address: c-000081
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Hello World]]"
  - "[[Elsa Architecture]]"
---

# Elsa Packages

[[entities/Elsa Workflows]] is distributed as a collection of NuGet packages. The main `Elsa` bundle provides the core dependencies, while additional packages add HTTP, identity, scheduling, persistence, expression languages, and more.

---

## Prerequisites

- .NET SDK 8 or higher
- A code editor (Visual Studio, VS Code, Rider)
- Basic knowledge of C# and ASP.NET Core
- Optionally, Docker Desktop for running prebuilt Docker images

---

## Main Package: `Elsa`

The primary package is `Elsa` — a metapackage bundling the essential packages:

| Bundled Package | Purpose |
|----------------|---------|
| `Elsa.Api.Common` | Shared API infrastructure |
| `Elsa.Mediator` | In-process message mediator |
| `Elsa.Workflows.Core` | Core workflow engine and activity model |
| `Elsa.Workflows.Management` | Workflow definition and instance management |
| `Elsa.Workflows.Runtime` | Workflow execution runtime and dispatch |

Install with:
```bash
dotnet add package Elsa
```

---

## Additional Packages

Elsa provides many optional packages for specific capabilities:

| Package | Purpose |
|---------|---------|
| `Elsa.Http` | HTTP activities (HttpEndpoint, WriteHttpResponse, SendHttpRequest) |
| `Elsa.Identity` | Authentication/authorization with user providers |
| `Elsa.Scheduling` | Timer and Cron scheduling activities |
| `Elsa.Workflows.Api` | REST API endpoints for workflow management |
| `Elsa.Expressions.CSharp` | C# expression evaluation |
| `Elsa.Expressions.JavaScript` | JavaScript expression evaluation |
| `Elsa.Expressions.Liquid` | Liquid template expressions |
| `Elsa.Persistence.EFCore` | EF Core persistence abstractions |
| `Elsa.Persistence.EFCore.Sqlite` | SQLite provider |
| `Elsa.Persistence.EFCore.SqlServer` | SQL Server provider |
| `Elsa.Persistence.EFCore.PostgreSql` | PostgreSQL provider |
| `Elsa.MongoDb` | MongoDB persistence provider |

---

## Package Feeds

Elsa packages are distributed through two feeds depending on stability:

| Type | Feed | URL |
|------|------|-----|
| **Releases** (stable) | NuGet.org | `https://api.nuget.org/v3/index.json` |
| **Release Candidates** | NuGet.org | `https://api.nuget.org/v3/index.json` |
| **Previews** (cutting-edge) | Feedz | `https://f.feedz.io/elsa-workflows/elsa-3/nuget/index.json` |

- **Releases** — stable, production-ready versions
- **Release Candidates** — feature-complete previews before final release, generally stable
- **Previews** — automatically built from every push to the `v3` branch; latest features but may introduce breaking changes

To use preview packages, add the Feedz source to `NuGet.config`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="NuGet official" value="https://api.nuget.org/v3/index.json" />
    <add key="Elsa 3 preview" value="https://f.feedz.io/elsa-workflows/elsa-3/nuget/index.json" />
  </packageSources>
</configuration>
```

> [!warning] Preview Checkbox
> Ensure the "Preview" checkbox is ticked in your NuGet package explorer to see preview packages.

---

## Versioning Strategy

| Type | Format | Example |
|------|--------|---------|
| **Released** | `Major.Minor.Revision` | `3.0.1` |
| **Release Candidate** | `Major.Minor.Revision-rcX` | `3.0.2-rc1` |
| **Preview** | `Major.Minor.Revision-preview.X` | `3.0.2-preview.128` |

The major version stays consistent barring significant changes. New features bump the minor version; fixes or minor improvements bump the revision number.
