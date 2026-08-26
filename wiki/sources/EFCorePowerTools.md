---
type: source
title: "EF Core Power Tools"
source_type: github_repo
source_url: https://github.com/ErikEJ/EFCorePowerTools
author: "[[ErikEJ]]"
created: 2026-07-03
updated: 2026-07-03
address: c-000328
tags:
  - source
  - ef-core
  - tooling
  - reverse-engineering
  - visual-studio
  - cli
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[DGML Model Visualization]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[EF Core Power Tools T4 Templates]]"
  - "[[EF Core Power Tools CLI (efcpt)]]"
  - "[[EF Core Power Tools Stored Procedure Mapping]]"
  - "[[EF Core Power Tools Dacpac and Database Projects]]"
aliases:
  - "EFCorePowerTools"
  - "efcpt"
---

# EF Core Power Tools

GUI-based reverse engineering of existing databases into EF Core `DbContext` models, plus model visualization. Operates as a **Visual Studio 2022 extension** and as a **cross-platform CLI tool** (`efcpt`). 2.5k stars, MIT license, C# (98.9%). Author: [[ErikEJ]] (Erik Ejlskov Jensen). AWS-sponsored starting January 2024.

## Key Features

### 1. Reverse Engineering
GUI-driven scaffolding of EF Core models from existing databases within Visual Studio. Handles SQL Server; broader provider support via CLI. The CLI (`efcpt`) generates code from any OS with .NET 8.0/10.0 runtime. See [[EF Core Reverse Engineering]].

### 2. Model Visualization
Generates DGML graphs to visualize `DbContext` models. Companion NuGet package `ErikEJ.EntityFrameworkCore.DgmlBuilder` adds the `AsDgml()` extension method to any derived `DbContext`. See [[DGML Model Visualization]].

### 3. CLI Tool (`efcpt`)
Cross-platform dotnet tool — reverse engineering without Visual Studio.

| EF Core Version | Install Command |
|-----------------|-----------------|
| EF Core 10 | `dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*` |
| EF Core 9 | `dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 9.*` |
| EF Core 8 | `dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 8.*` |

Run: `efcpt "<connection_string>" <provider>` (provider auto-resolved from connection string if omitted).

On first run, generates `efcpt-config.json` in the output folder. Edit this to customize behavior (exclusions, Mermaid diagrams, file refresh). Re-run `efcpt` to regenerate code.

Key config options:
- `"refresh-object-lists"`: control whether object lists refresh each scaffold
- `"soft-delete-obsolete-files"`: auto-remove files for excluded objects
- `"exclusionWildcard"`: per-object-type wildcard filters (`*`, `abc*`, `*xyz`, `*mno*`) — case-sensitive
- `"exclude": true/false` on individual objects overrides wildcards
- `"generate-mermaid-diagram": true` → `dbdiagram.md` Mermaid ER diagram

### 4. Dacpac Support
`ErikEJ.EntityFrameworkCore.SqlServer.Dacpac` package: reverse-engineer from SQL Server `.dacpac` files via `dotnet ef`.

### 5. Migrations Management
GUI for managing EF Core migrations within Visual Studio.

## Architecture

```
src/
  Core/efcpt.8/     — CLI tool implementation
  Nupkg/            — NuGet packages (DgmlBuilder, SqlServer.Dacpac)
  VS extension      — Visual Studio 2022 extension
test/
  ScaffoldingTester — Test solution (Northwind, Chinook databases)
samples/            — Reference configs and examples
docs/               — Documentation
```

## Companion Tools

- **EF Core Power Pack** (VS Marketplace): DDEX providers + additional utilities
- **Daily Builds**: available via Open VSIX Gallery

## Resources

- Wiki: <https://github.com/ErikEJ/EFCorePowerTools/wiki>
- Quick Start: <https://github.com/ErikEJ/EFCorePowerTools/wiki/Reverse-Engineering-Quick-Start>
- Release Notes: <https://github.com/ErikEJ/EFCorePowerTools/wiki/Release-notes>
- Presentation: <https://erikej.github.io/EFCorePowerTools/index.html>
- Sample Config: <https://raw.githubusercontent.com/ErikEJ/EFCorePowerTools/master/samples/efcpt-config.json>

## Deep-Dive Pages

- [[EF Core Power Tools Configuration]] — complete `efcpt-config.json` + `efcpt.renaming.json` reference
- [[EF Core Power Tools T4 Templates]] — T4 template customization (EntityType.t4, DbContext.t4, POCO, Handlebars)
- [[EF Core Reverse Engineering]] — multi-DbContext strategies, exclusion control, dacpac workflows
- [[EF Core Power Tools CLI (efcpt)]] — cross-platform CLI: install, command syntax, providers, dacpac, CI/CD, VS extension differences
- [[EF Core Power Tools Stored Procedure Mapping]] — sproc result discovery (FMTONLY / sp_describe_first_result_set / multi-resultset), temp table workarounds, mapped-type, async vs sync
- [[EF Core Power Tools Dacpac and Database Projects]] — offline reverse engineering from .dacpac/.sqlproj, merge-dacpacs, round-trip DbContext→DDL→.sqlproj, CI/CD integration

## Version Compatibility

| EF Core | .NET Runtime | VS Extension | CLI (`efcpt`) | T4 Templates |
|---------|-------------|--------------|---------------|--------------|
| EF Core 6 | .NET 6 | Unsupported | Unsupported | No |
| EF Core 8 | .NET 8 | Supported | `--version 8.*` | Yes |
| EF Core 9 | .NET 8 | Supported | `--version 9.*` | Yes |
| EF Core 10 | .NET 10 | Supported | `--version 10.*` | Yes |

**Daily builds**: `dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*-*`

## Source

Fetched from <https://github.com/ErikEJ/EFCorePowerTools> on 2026-07-03. Deep-dive update 2026-07-03.
