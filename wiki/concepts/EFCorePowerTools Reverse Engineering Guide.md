---
type: concept
title: "EFCorePowerTools Reverse Engineering Guide"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000337
tags:
  - concept
  - ef-core
  - reverse-engineering
  - best-practices
  - guide
  - synthesis
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[EF Core Power Tools T4 Templates]]"
  - "[[EF Core Power Tools CLI (efcpt)]]"
  - "[[EF Core Power Tools Stored Procedure Mapping]]"
  - "[[EF Core Power Tools Dacpac and Database Projects]]"
  - "[[Entity Framework Core]]"
aliases:
  - "EFCorePowerTools How-To"
  - "EF Core Reverse Engineering Guide"
---

# EFCorePowerTools Reverse Engineering Guide

Synthesis of key takeaways, best practices, and how-to workflows from the full EFCorePowerTools deep-dive (2026-07-03).

---

## Key Takeaways

1. **EFCorePowerTools fills the gap `dotnet ef` leaves.** `dotnet ef dbcontext scaffold` has no GUI, no config persistence, no model visualization, and no T4 customization. Power Tools adds all four.

2. **Config persistence is the killer feature.** `efcpt-config.json` captures every decision — object exclusions, naming, type mappings, code generation options. Commit it. Re-run `efcpt` to regenerate identically. `dotnet ef` requires re-specifying all flags every time.

3. **T4 templates = full control.** Not just cosmetic — T4 enables enum generation, `INotifyPropertyChanged`, `[Obsolete]` injection, collection type selection, and namespace control. Templates execute on every scaffold; edits take effect immediately.

4. **CLI is cross-platform but has gaps.** `efcpt` works on macOS/Linux but lacks DGML visualization, GUI object selector, and has a renaming file lookup quirk (#2579). Use separate folders for multi-DbContext to work around it.

5. **Dacpac enables offline + CI/CD workflows.** Reverse-engineer from build artifacts without a live database. Round-trip: Code-first → DDL SQL → `.sqlproj` → dacpac → reverse-engineer back.

6. **Sproc mapping is nuanced.** Three-tier result discovery (FMTONLY → `sp_describe_first_result_set` → multi-resultset/Dapper). Temp tables are the #1 failure cause. Always test sproc scaffolding on a copy first.

---

## How to Reverse Engineer — Step by Step

### Quick Start (GUI — Visual Studio)

```
1. Install: Extensions → Manage Extensions → EF Core Power Tools
2. Launch: Right-click project → EF Core Power Tools → Reverse Engineer
   (or Ctrl+Shift+A → Data → EF Core Database First Wizard)
3. Connect: Add → choose SQL Server (or PostgreSQL/SQLite with Power Pack)
4. Select objects: Check tables, views, sprocs, functions
   - Top checkbox = select all
   - F2 on any object = rename
   - Uncheck columns to exclude
5. Configure: Accept defaults for first run, or customize:
   - DbContext name + namespace
   - Pluralize/singularize (use-inflector)
   - DataAnnotations vs fluent API
   - T4 templates checkbox
6. Click OK → code generated into current project
7. Query immediately:
   using var db = new ChinookContext();
   var albums = db.Albums.Where(a => a.Title == "Hair").FirstOrDefault();
```

### CLI Workflow (Cross-Platform)

```bash
# 1. Install
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*

# 2. Scaffold
cd MyProject/
efcpt "Server=.;Database=Northwind;Encrypt=false" mssql

# 3. Edit efcpt-config.json (customize options)

# 4. Regenerate
efcpt   # reads config, regenerates code

# 5. Iterate: edit config → re-run until satisfied
```

### Dacpac Workflow (Offline / CI)

```bash
# Build database project
dotnet build ./MyDatabase.sqlproj

# Scaffold from dacpac (no live DB needed)
efcpt "./bin/Debug/MyDatabase.dacpac" mssql
```

---

## Essential Config Settings

> [!key-insight] Two formats: CLI (`efcpt-config.json`) uses nested kebab-case. VS (`efpt.config.json`) uses flat PascalCase. Never mix. Full mapping: [[EF Core Power Tools Configuration#VS Extension Format efpt.config.json|EF Core Power Tools Config]].

### CLI Minimal Config (`efcpt-config.json`):

```json
{
  "code-generation": {
    "use-nullable-reference-types": true,
    "use-inflector": true,
    "use-t4": true,
    "enable-on-configuring": false,
    "soft-delete-obsolete-files": true
  },
  "names": {
    "root-namespace": "MyProject",
    "dbcontext-name": "MyDbContext"
  },
  "file-layout": {
    "output-path": "Entities"
  },
  "replacements": {
    "uncountable-words": ["Status", "Data", "Equipment"]
  }
}
```

### Settings Decision Guide

CLI kebab-case keys shown. For VS PascalCase equivalent, see the mapping in [[EF Core Power Tools Configuration]].

| If you want... | CLI Key | VS Key |
|----------------|---------|--------|
| Connection string in config, not code | `enable-on-configuring: false` | `IncludeConnectionString: false` |
| `[Table]`/`[Column]` instead of fluent | `use-data-annotations: true` | `UseFluentApiOnly: false` |
| Database names as-is (no pluralization) | `use-database-names: true` | `UseDatabaseNames: true` |
| Custom code generation | `use-t4: true` | `UseT4: true` |
| Auto-delete files for dropped tables | `soft-delete-obsolete-files: true` | (sidebar option in VS) |
| Freeze object list | `refresh-object-lists: false` | `UseNoObjectFilter: false` |
| `DateOnly`/`TimeOnly` | `use-DateOnly-TimeOnly: true` | `UseDateOnlyTimeOnly: true` |
| Spatial types | `use-spatial: true` | `UseSpatial: true` |
| EF6 pluralization (not Humanizer) | `use-legacy-inflector: true` | `UseLegacyPluralizer: true` |
| No navigation properties | `use-no-navigations-preview: true` | `UseNoNavigations: true` |

---

## T4 Template Customization — Practical Patterns

### Setup

```json
{ "code-generation": { "use-t4": true } }
```

Templates land in `CodeTemplates/EFCore/`:
- `EntityType.t4` — entity class generation
- `DbContext.t4` — context class generation
- `EntityTypeConfiguration.t4` — split config (Dbcontext split variant)

### Most Common Customizations

**1. Use `List<T>` instead of `HashSet<T>`:**
```csharp
// In EntityType.t4, navigation initializer:
public virtual List<Order> Orders { get; set; } = new List<Order>();
```

**2. Add `[Obsolete]` for deprecated columns:**
```csharp
if (property.Name.Contains("Legacy"))
    WriteLine("    [Obsolete(\"Migrated to NewColumn\")]");
```

**3. Enum generation from string columns:**
```csharp
if (property.Name.EndsWith("Status") && property.ClrTypeName == "string")
    WriteLine($"    public {property.Name}Enum {property.Name} {{ get; set; }}");
```

**4. Inject `INotifyPropertyChanged`:**
Add `INotifyPropertyChanged` interface + `OnPropertyChanged()` calls in setters.

**5. Version comment (required):**
```
// Template version: 1000   (.NET 10)
// Template version: 800    (.NET 8)
```

---

## Multi-DbContext Strategies

### Strategy 1: Multiple Config Files (Simple)
```
MyProject/
├── efcpt-config.json              → Primary DB
├── efpt.renaming.json
├── efcpt-config.secondary.json    → Secondary DB
└── efpt.secondary.renaming.json
```

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
Run `efcpt` from within each folder.

### Strategy 3: `--input` Flag (CLI)
```bash
efcpt "Server=.;Database=DB1;Encrypt=false" mssql --input ./efcpt-config.primary.json
efcpt "Server=.;Database=DB2;Encrypt=false" mssql --input ./efcpt-config.secondary.json
```

---

## Stored Procedure Mapping Workflow

```
1. Select sprocs/functions in object tree
2. Generate → result classes auto-created
3. If generation fails:
   a. Try: "use-alternate-stored-procedure-resultset-discovery": true
   b. Temp tables? → expose shape via IF (1=0) SELECT ...
   c. Empty result? → add SET FMTONLY OFF; RETURN; guard
   d. Missing properties? → add via partial class
4. For existing classes: set "mapped-type": "MyDto"
5. For multiple resultsets (preview):
   { "discover-multiple-stored-procedure-resultsets-preview": true }
   Requires Dapper NuGet package
```

---

## Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | **Commit `efcpt-config.json`** to source control | Reproducible scaffolding for entire team |
| 2 | **Commit `CodeTemplates/`** to source control | Consistent code generation across team |
| 3 | **Use `"enable-on-configuring": false`** in production code | Connection strings from config, not compiled code |
| 4 | **Never hand-edit generated files** | Use partial classes, `OnModelCreatingPartial`, T4 templates |
| 5 | **Protect files from cleanup** by removing `// <auto-generated>` line 1 | `soft-delete-obsolete-files` only removes marked files |
| 6 | **Use separate folders** for multi-DbContext setups | Avoids renaming file collision + keeps configs isolated |
| 7 | **Test sproc scaffolding on a copy first** | FMTONLY/temp table issues vary per procedure |
| 8 | **Use Mermaid diagrams for CLI** (`"generate-mermaid-diagram": true`) | DGML is VS-only; Mermaid works everywhere |
| 9 | **Add `"uncountable-words"`** for domain terms | Prevents "Statuses", "Datas", "Equipments" |
| 10 | **Keep tools updated** | New EF Core versions bring fixes + feature previews |
| 11 | **Use `efpt.postrun.cmd`** for post-processing | Auto-format, copy, or transform generated code |
| 12 | **Publish dacpac to local DB** when views fail | Most reliable fallback for complex schemas |

---

## Pitfalls to Avoid

| Pitfall | Fix |
|---------|-----|
| CLI ignores `efpt.widget.renaming.json` (#2579) | Use separate folders per DbContext |
| Sproc names without square brackets in CLI config | Always use `[dbo].[ProcName]` format (#3214) |
| `"use-database-names": true` silently ignores renaming file | Set to `false` if using renaming |
| Generated files overwritten on re-scaffold | Put custom code in partial classes, not generated files |
| Dacpac views missing computed columns | Publish to live DB or add TABLE TYPE to dacpac |
| `split-dbcontext-preview` still in use | OBSOLETE — use T4 `EntityTypeConfiguration.t4` instead |
| T4 templates used with EF Core 6 | T4 requires EF Core 8+ |
| `refresh-object-lists: true` adds unwanted new objects | Set to `false` after initial scaffold |

---

## Version Compatibility

| EF Core | .NET | VS Extension | CLI | T4 | Handlebars |
|---------|------|-------------|-----|-----|------------|
| 6 | .NET 6 | ❌ EOL | ❌ EOL | ❌ | ❌ |
| 8 | .NET 8 | ✅ | `--version 8.*` | ✅ | ✅ |
| 9 | .NET 8 | ✅ | `--version 9.*` | ✅ | ✅ |
| 10 | .NET 10 | ✅ | `--version 10.*` | ✅ | ✅ |

---

## Quick Reference — Commands

```bash
# Install
dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*

# Scaffold (SQL Server)
efcpt "Server=.;Database=MyDb;Encrypt=false" mssql

# Scaffold (PostgreSQL)
efcpt "Host=localhost;Database=mydb;Username=postgres;Password=secret" npgsql

# Scaffold from dacpac
efcpt "./bin/Debug/MyDb.dacpac" mssql

# Custom config path
efcpt "..." mssql --input ./Configs/efcpt-config.custom.json

# Help
efcpt --help
```

## Source

Synthesized from the 2026-07-03 EFCorePowerTools deep-dive session. Sources: GitHub wiki, issues (#1499, #1751, #2579, #3214), sample configs, NuGet package page, ErikEJ blog post (2023-08-31).
