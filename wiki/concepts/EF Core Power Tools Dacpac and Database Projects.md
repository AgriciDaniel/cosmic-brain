---
type: concept
title: "EF Core Power Tools Dacpac and Database Projects"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000336
tags:
  - concept
  - ef-core
  - dacpac
  - sqlproj
  - reverse-engineering
  - tooling
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[EF Core Power Tools CLI (efcpt)]]"
  - "[[Entity Framework Core]]"
---

# EF Core Power Tools Dacpac and Database Projects

Reverse-engineering EF Core models from `.dacpac` files and SQL Database Projects (`.sqlproj`) — no live database connection needed.

## Why Dacpac?

- **Offline workflow:** generate code without network access to a database
- **Version-controlled schema:** `.dacpac` in source control = reproducible scaffolding
- **CI/CD:** scaffold from build artifact, not production database
- **Pre-production:** generate models from schema before database exists

---

## Data Sources Supporting Dacpac

| Source | How to Connect |
|--------|---------------|
| `.dacpac` files in solution | Auto-listed in the data source dropdown |
| External `.dacpac` (disk) | Browse button in data source dialog |
| `.sqlproj` (Database Project) | Right-click project → "Create EF Core DbContext..." |

---

## CLI Usage with Dacpac

```bash
# From .dacpac file
efcpt "../AdventureWorks/bin/Debug/AdventureWorks.dacpac" mssql

# From .sqlproj — point at the built .dacpac in bin/
efcpt "./bin/Debug/MyDatabase.dacpac" mssql
```

---

## What Works Well

| Object Type | Status | Notes |
|-------------|--------|-------|
| Tables | ✅ Full support | Columns, keys, indexes, constraints all scaffold correctly |
| Primary keys / FKs | ✅ Full support | Relationships generated from dacpac metadata |
| Indexes | ✅ Full support | Via `ExcludedIndexes` to skip problematic ones |
| Basic views | ⚠️ Partial | Simple views work; nested views lose computed columns |
| Stored procedures | ⚠️ Partial | May miss computed columns in result sets |
| Functions | ⚠️ Partial | Similar limitations to sprocs |

---

## Known Limitations & Workarounds

### Computed Columns Missing in Views

**Problem:** Nested views and views with computed columns lose property definitions in generated entities — the dacpac doesn't preserve all derived column metadata.

**Workaround 1 — Publish to live DB:**
```
1. Publish .dacpac to a local SQL Server / LocalDB instance
2. Reverse-engineer from the live database instead
3. Most reliable approach
```

**Workaround 2 — TABLE type injection:**
Add a `TABLE TYPE` to the `.dacpac` model that matches the view's output shape:
```sql
CREATE TYPE dbo.MyViewShape AS TABLE (
    Id INT,
    Name NVARCHAR(100),
    ComputedTotal DECIMAL(19,4)
);
```
The tool uses this to derive column types for the view.

**Workaround 3 — Partial class:**
After scaffolding, add missing properties manually:
```csharp
public partial class MyView
{
    public decimal ComputedColumn { get; set; }
    public string MissingProperty { get; set; }
}
```

---

## Merging Multiple Dacpacs

When database references other dacpacs (e.g., a main database referencing a shared schema database):

```json
"code-generation": {
    "merge-dacpacs": true
}
```

This merges dependent `.dacpac` files into one combined model before scaffolding.

---

## Reverse Direction: DbContext → DDL SQL → .sqlproj

Create a SQL Database Project from an existing EF Core model:

```
1. Right-click DbContext project → "View DbContext DDL SQL"
   → Generates a .sql CREATE script from the EF Core model

2. In Solution Explorer: Add → New Project → SQL Database Project (.sqlproj)

3. Right-click .sqlproj → Import → Script (*.sql)
   → Point at the generated .sql script

Result: A version-controlled database project mirroring your EF Core model
```

This enables:
- Schema drift detection (compare `.sqlproj` against deployed database)
- Database CI/CD (build `.dacpac` from `.sqlproj`, deploy via SqlPackage)
- Round-trip: Code-first → DDL → Database Project → dacpac → reverse-engineer back

---

## Launching from a Database Project

From an empty C# project, right-click the `.sqlproj`:

```
.sqlproj → Create EF Core DbContext... → launches Reverse Engineering wizard
```

This generates the full DbContext + entities directly from the database project's schema, bypassing the need for a live database entirely.

---

## Dacpac in CI/CD Pipeline

```yaml
# Example: scaffold from dacpac in CI
- name: Build database project
  run: dotnet build ./MyDatabase.sqlproj

- name: Scaffold EF Core model
  run: |
    dotnet tool install ErikEJ.EFCorePowerTools.Cli -g --version 10.*
    efcpt "./MyDatabase/bin/Debug/MyDatabase.dacpac" mssql
  working-directory: ./src/MyApp
```

---

## Tips

1. **Tables are the most reliable** dacpac objects — if views/sprocs cause issues, scaffold tables from dacpac and add views/sprocs later via partial classes or separate files.
2. **Publish-to-local-DB is the most robust fallback** for complex schemas with many views/nested dependencies.
3. **`merge-dacpacs` is essential** when your database references another database project (e.g., shared schema, audit schema).
4. **dacpac version must match** the target EF Core version's SQL Server compatibility level.
5. **The round-trip works:** Code-first model → DDL SQL → SQL Database Project → dacpac → reverse-engineer → verify output matches original model.

## Source

Ingested from <https://github.com/ErikEJ/EFCorePowerTools/wiki/Reverse-Engineering> on 2026-07-03.
