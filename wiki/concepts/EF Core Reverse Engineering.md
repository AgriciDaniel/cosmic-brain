---
type: concept
title: "EF Core Reverse Engineering"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000330
tags:
  - concept
  - ef-core
  - reverse-engineering
  - scaffolding
  - database-first
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EFCorePowerTools]]"
  - "[[DGML Model Visualization]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[EF Core Power Tools T4 Templates]]"
---

# EF Core Reverse Engineering

Scaffolding EF Core `DbContext` and entity classes from an existing database schema. The "database-first" counterpart to EF Core's code-first migrations workflow. Reads table/view/procedure metadata from a live database (or `.dacpac` file) and generates C# model code.

## Native `dotnet ef` vs. Power Tools

| Dimension | `dotnet ef dbcontext scaffold` | [[EFCorePowerTools]] |
|-----------|-------------------------------|----------------------|
| Interface | CLI only | GUI (VS 2022) + CLI (`efcpt`) |
| Config persistence | Command-line args only | `efcpt-config.json` (editable, re-runnable) |
| Object exclusion | `--table`/`--schema` filters | Per-object `exclude` + wildcard patterns |
| Model visualization | None | DGML graphs via `AsDgml()` |
| Dacpac support | Limited | Full via `ErikEJ.EntityFrameworkCore.SqlServer.Dacpac` |
| Mermaid ER diagrams | None | `"generate-mermaid-diagram": true` |

## Scaffolding Workflow (Power Tools)

1. **Connect**: point at a SQL Server database (or other provider via CLI)
2. **Select**: choose tables, views, stored procedures to scaffold
3. **Configure**: customize naming, namespace, DbContext path, entity type (POCO vs. record)
4. **Generate**: produces `DbContext` class + one entity file per table/view
5. **Iterate**: edit `efcpt-config.json` and re-run to update

## Exclusion Control

`efcpt-config.json` tracks all current database objects. Wildcard filters per object type:

| Pattern | Effect |
|---------|--------|
| `*` | Exclude everything in that section |
| `abc*` | Exclude names starting with `abc` |
| `*xyz` | Exclude names ending with `xyz` |
| `*mno*` | Exclude names containing `mno` |

All filters case-sensitive. Explicit `"exclude": false` on an object overrides any wildcard.

## Key Concerns

- **Stale configs**: set `"refresh-object-lists": true` to pick up new DB objects; set `"soft-delete-obsolete-files": true` to auto-remove files for dropped objects
- **Customization loss**: regenerating overwrites hand-edited entity files — put custom logic in partial classes
- **Provider support**: SQL Server is first-class; other providers (PostgreSQL, MySQL) work via CLI but need provider-specific connection string + provider argument

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03.

## Multiple DbContexts (Multiple Connections)

EFCorePowerTools supports multiple databases in one project. Three strategies:

### Strategy 1: Multiple Config Files at Project Root

Name convention: `efpt.*.config.json` (VS) or `efcpt-config.*.json` (CLI):
```
MyProject/
├── efcpt-config.json              → Primary DB
├── efcpt-config.secondary.json    → Secondary DB
└── efcpt-config.logging.json      → Logging DB
```

When multiple configs exist, VS extension prompts which to use. Right-click any config file to launch directly from it.

### Strategy 2: Separate Folders (Recommended for CLI)

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

Run `efcpt` from within each folder. Each DbContext scoped to its own connection, renaming rules, and T4 templates.

### Strategy 3: MSBuild Integration

`JD.Efcpt.Build` NuGet package enables per-project MSBuild properties:
```xml
<EfcptConfig>efcpt-config.sql1.json</EfcptConfig>
<EfcptRenaming>efcpt.sql1.renaming.json</EfcptRenaming>
<EfcptEnabled>true</EfcptEnabled>
```

### CLI Limitation (Renaming)

CLI hard-coded to look for `efpt.renaming.json` only (fixed in #2581). Workaround: use separate folders (Strategy 2).

## Full Configuration Reference

See [[EF Core Power Tools Configuration]] for complete `efcpt-config.json` reference. See [[EF Core Power Tools T4 Templates]] for T4 customization.

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03. Updated with deep-dive 2026-07-03.
