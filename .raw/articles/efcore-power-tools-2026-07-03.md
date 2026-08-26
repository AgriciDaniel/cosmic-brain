---
source_url: https://github.com/ErikEJ/EFCorePowerTools
fetched: 2026-07-03
---
# EF Core Power Tools

GUI-based reverse engineering of existing databases into EF Core DbContext models, plus model visualization. Operates as a Visual Studio 2022 extension and as a cross-platform CLI tool (`efcpt`). 2.5k stars, MIT license, C# (98.9%).

Author: Erik Ejlskov Jensen (@ErikEJ). AWS-sponsored starting January 2024 through the ".NET on AWS Open Source Software Fund."

## Key Features

1. **Reverse Engineering:** GUI-driven scaffolding of EF Core models from existing databases within Visual Studio. Handles SQL Server, with broader provider support via the CLI.
2. **Model Visualization:** Uses DGML graphs to visualize DbContext models. Companion NuGet package `ErikEJ.EntityFrameworkCore.DgmlBuilder` adds the `AsDgml()` extension method to any derived DbContext for generating visual graphs.
3. **CLI Tool (efcpt):** Cross-platform dotnet tool enabling reverse engineering without Visual Studio — usable from VS Code or command line. Install: `dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*` (or 9.*, 8.*). Run: `efcpt "<connection_string>" <provider>`. Generates `efcpt-config.json` for customization.
4. **Dacpac Support:** `ErikEJ.EntityFrameworkCore.SqlServer.Dacpac` package enables reverse engineering from SQL Server `.dacpac` files via `dotnet ef`.
5. **Migrations Support:** GUI for managing EF Core migrations within Visual Studio.
6. **Mermaid ER Diagrams:** Set `"generate-mermaid-diagram": true` in `efcpt-config.json` to produce `dbdiagram.md`.

## Configuration (efcpt-config.json)

Auto-generated on first CLI run. Key options:
- `"refresh-object-lists"`: control whether object lists refresh on each scaffold
- `"soft-delete-obsolete-files"`: auto-remove files for excluded objects
- `"exclusionWildcard"`: per-object-type wildcard filters (`*`, `abc*`, `*xyz`, `*mno*`) — case-sensitive
- `"exclude": true/false` on individual objects overrides wildcards
- `"generate-mermaid-diagram": true` for Mermaid ER output

## EF Core Version Support

Three CLI versions aligned with EF Core versions: EF Core 10, EF Core 9, EF Core 8. The VS extension requires .NET 8.0 or .NET 10.0 runtime. An EF Core 6 final release is tagged as `efcore6-eol`.

## Architecture

- `src/` — Main source: CLI tool (`src/Core/efcpt.8/`), NuGet packages (`src/Nupkg/`), VS extension
- `test/` — Test projects with `ScaffoldingTester` solution (Northwind, Chinook scripts)
- `samples/` — Sample projects including reference `efcpt-config.json`
- `docs/` — Documentation
- `.github/` — CI/CD workflows

## Companion Tools

- **EF Core Power Pack** on VS Marketplace: DDEX providers and additional utilities
- **Daily Builds** via Open VSIX Gallery

## Resources

- Wiki: https://github.com/ErikEJ/EFCorePowerTools/wiki
- Quick Start: https://github.com/ErikEJ/EFCorePowerTools/wiki/Reverse-Engineering-Quick-Start
- Release Notes: https://github.com/ErikEJ/EFCorePowerTools/wiki/Release-notes
- Presentation: https://erikej.github.io/EFCorePowerTools/index.html
