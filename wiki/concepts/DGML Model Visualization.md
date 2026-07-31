---
type: concept
title: "DGML Model Visualization"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000331
tags:
  - concept
  - ef-core
  - visualization
  - dgml
  - tooling
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
---

# DGML Model Visualization

Directed Graph Markup Language (DGML) graph generation for EF Core `DbContext` models. Produces visual entity-relationship diagrams showing entities, properties, navigation properties, and relationships directly from compiled code — no database connection needed.

## How It Works

The NuGet package `ErikEJ.EntityFrameworkCore.DgmlBuilder` adds an extension method:

```csharp
using ErikEJ.EntityFrameworkCore;

// Any DbContext instance
string dgml = context.AsDgml();
File.WriteAllText("model.dgml", dgml);
```

The generated `.dgml` file opens in Visual Studio's built-in DGML viewer, rendering a draggable, zoomable graph of:
- **Entities** → nodes
- **Navigation properties** → directed edges between nodes
- **Keys and indexes** → node annotations
- **Property types** → node detail

## Use Cases

1. **Onboarding**: new team member opens the DGML graph to understand the data model in 30 seconds instead of reading hundreds of entity files
2. **Design review**: generate graph, review relationship topology before migrations
3. **Documentation**: commit `.dgml` files alongside code as living schema docs
4. **Refactoring impact**: visualize before splitting/merging entities to see all affected relationships

## Integration

Part of [[EFCorePowerTools]]. In the Visual Studio extension, right-click a C# project → **EF Core Power Tools → Add DbContext Diagram**. The CLI (`efcpt`) does not directly generate DGML; it's a VS-extension + NuGet-package feature.

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03.
