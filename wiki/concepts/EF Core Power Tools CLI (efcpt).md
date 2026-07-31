---
type: concept
title: "EF Core Power Tools CLI (efcpt)"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000334
tags:
  - concept
  - ef-core
  - cli
  - tooling
  - reverse-engineering
  - cross-platform
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[EF Core Power Tools T4 Templates]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[Entity Framework Core]]"
aliases:
  - "efcpt"
  - "EFCorePowerTools.Cli"
---

# EF Core Power Tools CLI (`efcpt`)

Cross-platform .NET global tool for EF Core reverse engineering. Runs on any OS with .NET runtime — no Visual Studio required. NuGet package: `ErikEJ.EFCorePowerTools.Cli`.

## Installation

```bash
# EF Core 10
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*

# EF Core 9
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 9.*

# EF Core 8
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 8.*

# Update
dotnet tool update ErikEJ.EFCorePowerTools.Cli -g --version 10.*

# Daily/nightly build
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*-*
```

NuGet: <https://www.nuget.org/packages/ErikEJ.EFCorePowerTools.Cli>

## Command Syntax

```bash
efcpt "<connection-string-or-.dacpac-path>" [provider]
```

### Positional Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `connection_string` | Yes | Database connection string, or path to `.dacpac` file |
| `provider` | No | EF Core provider name or abbreviation |

### Options

```bash
efcpt --help           # Show all options
efcpt --version        # Show installed version
efcpt --input <path>   # Use custom efcpt-config.json path
efcpt --verbose        # Verbose output
```

### Provider Names & Abbreviations

Provider auto-resolved from connection string if omitted. Explicit providers:

| Full Name | Abbreviation |
|-----------|-------------|
| `Microsoft.EntityFrameworkCore.SqlServer` | `mssql` |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | `postgres`, `npgsql` |
| `Pomelo.EntityFrameworkCore.MySql` | `mysql` |
| `Microsoft.EntityFrameworkCore.Sqlite` | `sqlite` |
| `Oracle.EntityFrameworkCore` | `oracle` |
| `FirebirdSql.EntityFrameworkCore.Firebird` | `firebird` |

## Usage Examples

```bash
# SQL Server (SQL auth)
efcpt "Server=(local);Initial Catalog=Northwind;User id=user;Pwd=secret123;Encrypt=false" mssql

# SQL Server (Windows auth)
efcpt "Server=SomeSqlServer;Database=SomeDb;Trusted_Connection=True;TrustServerCertificate=True" mssql

# Minimal (auto-resolve provider)
efcpt "server=.;database=Chinook" mssql

# From .dacpac (offline — no live DB needed)
efcpt "../AdventureWorks/bin/Debug/AdventureWorks.dacpac" mssql

# With custom config path
efcpt "server=.;database=Chinook" mssql --input ./Configs/efcpt-config.chinook.json

# PostgreSQL
efcpt "Host=localhost;Database=mydb;Username=postgres;Password=secret" npgsql

# MySQL
efcpt "Server=localhost;Database=mydb;User=root;Password=secret" mysql

# SQLite
efcpt "Data Source=./mydb.db" sqlite
```

## Configuration Discovery

On first run, `efcpt` auto-generates `efcpt-config.json` in the **current working directory**. Subsequent runs read this file.

Discovery order:
1. `--input <path>` flag (explicit override)
2. `./efcpt-config.json` in current directory
3. Default: generate fresh config from database metadata

**After initial generation:** edit `efcpt-config.json`, then re-run `efcpt` (no arguments needed if config contains connection info).

Full config reference: [[EF Core Power Tools Configuration]].

## Typical Workflow

```
1. cd MyProject/
2. efcpt "Server=.;Database=Northwind;Encrypt=false" mssql
   → generates efcpt-config.json + DbContext + entity classes
3. Edit efcpt-config.json (set use-t4: true, exclude tables, etc.)
4. efcpt   ← re-run; reads config, regenerates code
5. Repeat 3-4 until satisfied
```

## CLI vs. VS Extension — Differences

| Feature | CLI (`efcpt`) | VS Extension |
|---------|---------------|--------------|
| Platform | Cross-platform (Windows/Linux/macOS) | Windows + VS 2022 only |
| Interface | Terminal | GUI (right-click, dialogs) |
| Config file | `efcpt-config.json` | `efpt.config.json` |
| Renaming file | `efpt.renaming.json` | `efpt.renaming.json` |
| Object selection | Edit JSON arrays manually | GUI checkbox tree + F2 rename |
| DGML visualization | Not available (VS-only) | Right-click → Add DbContext Diagram |
| Mermaid ER diagram | `"generate-mermaid-diagram": true` | Checkbox in GUI |
| Dacpac support | Yes (path argument) | Yes (file dialog) |
| Multiple configs | `--input` flag or separate folders | Right-click config file |
| T4 templates | Yes, enable in config | Yes, dropdown in dialog |
| Post-run hook | `efpt.postrun.cmd` (ANSI) | Same |

## CLI-Specific Limitations

1. **Renaming file lookup (bug #2579, fixed #2581):** CLI looks for `efpt.renaming.json` only — doesn't follow multi-config naming convention. Workaround: separate folders per DbContext.
2. **No GUI object selector:** must edit JSON arrays to exclude/include tables. Use wildcards (`exclusionWildcard`) to reduce manual editing.
3. **No DGML visualization:** DGML is VS-only. Use Mermaid diagrams (`"generate-mermaid-diagram": true`) as CLI alternative.
4. **Square bracket requirement (#3214):** stored procedure names in config must use square brackets `[dbo].[ProcName]` — unquoted names may skip generation.

## Excluding Database Objects

Edit `efcpt-config.json` after first run:

```json
{
  "tables": [
    { "name": "[dbo].[Categories]", "exclude": false },
    { "name": "[dbo].[AuditLog]", "exclude": true },
    { "name": "[dbo].[__EFMigrationsHistory]", "exclude": true }
  ],
  "exclusionWildcard": "aspnet_*"
}
```

Set `"refresh-object-lists": false` to freeze the object list (prevents new DB objects from appearing). Set `"soft-delete-obsolete-files": true` to auto-remove files for excluded/dropped objects.

Only files with exact first-line comment `// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>` are cleaned up. Remove or change this line to protect a file from deletion.

## Provider Auto-Resolution

When provider argument is omitted, `efcpt` attempts to resolve from the connection string:
- `Server=...` / `Data Source=...` → `Microsoft.EntityFrameworkCore.SqlServer`
- `Host=...` → `Npgsql.EntityFrameworkCore.PostgreSQL`
- `Data Source=*.db` → `Microsoft.EntityFrameworkCore.Sqlite`

If auto-resolution fails, explicitly pass the provider abbreviation.

## Multi-DbContext Workflow

For multiple databases in one project, use separate folders:

```
MyProject/
├── DbContexts/
│   ├── Primary/
│   │   ├── efcpt-config.json
│   │   ├── efpt.renaming.json
│   │   └── CodeTemplates/EFCore/
│   └── Secondary/
│       ├── efcpt-config.json
│       ├── efpt.renaming.json
│       └── CodeTemplates/EFCore/
```

Run `efcpt` from within each folder:
```bash
cd MyProject/DbContexts/Primary/
efcpt "Server=.;Database=PrimaryDb;Encrypt=false" mssql

cd MyProject/DbContexts/Secondary/
efcpt "Server=.;Database=SecondaryDb;Encrypt=false" mssql
```

Alternatively, use `--input` to point at different config files:
```bash
efcpt "Server=.;Database=PrimaryDb;Encrypt=false" mssql --input ./efcpt-config.primary.json
efcpt "Server=.;Database=SecondaryDb;Encrypt=false" mssql --input ./efcpt-config.secondary.json
```

## CI/CD Integration

```yaml
# GitHub Actions example
- name: Install efcpt
  run: dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*

- name: Scaffold DbContext
  run: efcpt "${{ secrets.CONNECTION_STRING }}" mssql
  working-directory: ./src/MyProject
```

For CI, use `"enable-on-configuring": false` to exclude connection strings from generated code; inject connection string via `IConfiguration`/environment at runtime instead.

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03. Sources: NuGet package page, ErikEJ blog post "From Azure SQL DB to EF Core Web API using only cross platform CLI tools" (2023-08-31), GitHub issues #1751, #2579, #3214.
