---
type: concept
title: "EF Core Power Tools Configuration"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000332
tags:
  - concept
  - ef-core
  - configuration
  - tooling
  - reverse-engineering
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[EF Core Power Tools T4 Templates]]"
  - "[[Entity Framework Core]]"
---

# EF Core Power Tools Configuration

Complete reference for `efcpt-config.json` (CLI) and `efpt.config.json` (VS extension). Both formats are identical; the VS extension uses `efpt.config.json`, the CLI uses `efcpt-config.json`.

## Schema Validation

Add to top of config for IDE autocomplete:
```json
"$schema": "https://raw.githubusercontent.com/ErikEJ/EFCorePowerTools/master/samples/efcpt-config.schema.json"
```

## Full Configuration Reference

### `tables` / `views` / `stored-procedures` / `functions`

Object selection arrays. Each entry:
```json
{ "name": "[dbo].[Categories]" },
{ "name": "[dbo].[OldTable]", "exclude": true }
```

**Exclusion wildcards** (per object type, case-sensitive):

| Pattern | Effect |
|---------|--------|
| `*` | Exclude everything in section |
| `abc*` | Exclude names starting with `abc` |
| `*xyz` | Exclude names ending with `xyz` |
| `*mno*` | Exclude names containing `mno` |

Explicit `"exclude": false` on an object overrides any matching wildcard.

Table-specific: `"ExcludedIndexes": ["IX_Table_Column"]` to skip scaffolding specific indexes.

Stored procedure-specific:
```json
{
  "name": "[dbo].[CustOrderHist]",
  "use-legacy-resultset-discovery": true,
  "mapped-type": "ExistingClassName"
}
```
- `use-legacy-resultset-discovery`: use `sp_describe_first_result_set` instead of `SET FMTONLY`
- `mapped-type`: map sproc result to an existing class instead of generating a new one

### `code-generation`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `type` | string | `"all"` | `"all"` (DbContext + entities), `"dbcontext"` (DbContext only), `"entity"` (entities only) |
| `use-database-names` | bool | `false` | Use raw database names; **ignores renaming file** when `true` |
| `use-data-annotations` | bool | `false` | DataAnnotations (`[Table]`, `[Column]`) over fluent API |
| `use-nullable-reference-types` | bool | `true` | Enable NRT annotations |
| `use-inflector` | bool | `false` | Singularize/pluralize entity names (Humanizer) |
| `use-legacy-inflector` | bool | `false` | EF6-style pluralizer instead of Humanizer |
| `use-many-to-many-entity` | bool | `false` | Preserve join entity for many-to-many |
| `use-t4` | bool | `false` | Enable T4 template customization (**EF Core 8+ only**) |
| `t4-template-path` | string\|null | `null` | Custom path to `CodeTemplates/EFCore/` parent folder |
| `remove-defaultsql-from-bool-properties` | bool | `false` | Strip `DEFAULT (0)` SQL from bool columns |
| `soft-delete-obsolete-files` | bool | `false` | Auto-remove files for excluded objects |
| `refresh-object-lists` | bool | `false` | Refresh DB object lists each scaffold; set `false` to freeze |
| `enable-on-configuring` | bool | `false` | Exclude connection string from generated code |
| `discover-multiple-stored-procedure-resultsets-preview` | bool | `false` | Multi-resultset sproc discovery (requires Dapper) |
| `use-alternate-stored-procedure-resultset-discovery` | bool | `false` | Alternative sproc result discovery method |
| `use-stored-procedure-resultset-fallback` | bool | `true` | Fallback when result discovery fails |
| `use-no-navigations-preview` | bool | `false` | Remove all navigation properties (experimental) |
| `merge-dacpacs` | bool | `false` | Merge dependent `.dacpac` files |
| `use-prefix-navigation-naming` | bool | `false` | Prefix navigation naming (EF Core 8) |
| `use-decimal-data-annotation-for-sproc-results` | bool | `false` | Add `[Decimal]` annotation to sproc results |
| `use-database-names-for-routines` | bool | `false` | Use database names for functions/sprocs |

### `names`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `root-namespace` | string | (project) | Root namespace for all generated code |
| `dbcontext-name` | string | (derived) | DbContext class name |
| `dbcontext-namespace` | string\|null | `null` | Custom namespace for DbContext |
| `model-namespace` | string\|null | `null` | Custom sub-namespace for entity models (preview) |

### `file-layout`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `output-path` | string | `"Models"` | Entity output subfolder |
| `output-dbcontext-path` | string\|null | `null` | DbContext output subfolder or full path |
| `split-dbcontext-preview` | bool | `false` | OBSOLETE. Use T4 `EntityTypeConfiguration.t4` instead |
| `use-schema-folders-preview` | bool | `false` | Schema-based subfolders (experimental) |
| `use-schema-namespaces-preview` | bool | `false` | Schema-based namespaces (experimental) |

### `type-mappings`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `use-DateOnly-TimeOnly` | bool | `false` | Map `date`/`time` to `DateOnly`/`TimeOnly` (SQL Server) |
| `use-HierarchyId` | bool | `false` | Map to `HierarchyId` (SQL Server) |
| `use-spatial` | bool | `false` | Spatial types (SQL Server, PostgreSQL, MySQL) |
| `use-NodaTime` | bool | `false` | NodaTime types (PostgreSQL, SQL Server, SQLite) |

### `replacements`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `preserve-casing-with-regex` | bool | `false` | Maintain casing during regex renaming |
| `uncountable-words` | string[] | `["Status","Data"]` | Words excluded from pluralization |

---

## `efcpt.renaming.json` / `efpt.renaming.json`

Custom table and column renaming. One per DbContext. Place alongside the config file or at project root.

### Full Structure

```json
[
    {
        "SchemaName": "dbo",
        "TableRegexPattern": "^(tbl)",
        "TablePatternReplaceWith": "",
        "ColumnRegexPattern": "^(col_|fld_)",
        "ColumnPatternReplaceWith": "",
        "Tables": [
            {
                "Name": "tblSIMCard",
                "NewName": "SIMCard",
                "Columns": [
                    { "Name": "usr_id", "NewName": "Id" },
                    { "Name": "usr_email", "NewName": "Email" }
                ]
            }
        ],
        "UseSchemaName": false
    }
]
```

### Layers of Renaming (applied in order)

1. **Regex table rename** — `TableRegexPattern` → `TablePatternReplaceWith` at schema level
2. **Regex column rename** — `ColumnRegexPattern` → `ColumnPatternReplaceWith` at schema level
3. **Exact table rename** — `Tables[].Name` → `Tables[].NewName`
4. **Exact column rename** — `Columns[].Name` → `Columns[].NewName`

### Multi-Context Renaming (CLI Limitation)

**Bug #2579 (fixed via #2581):** CLI hard-coded to look for `efpt.renaming.json` only — does not follow config naming convention.

**Workaround:** Place each config + renaming pair in **separate folders** and run `efcpt` from each folder:
```
MyProject/
├── DbContexts/
│   ├── Primary/
│   │   ├── efcpt-config.json
│   │   └── efpt.renaming.json
│   └── Secondary/
│       ├── efcpt-config.json
│       └── efpt.renaming.json
```

### Important Rules

- When `"use-database-names": true`, the renaming file is **completely ignored**
- Renaming file is auto-created when using the VS UI rename feature (F2 in object dialog)
- VS extension uses `efpt.renaming.json`; CLI uses `efpt.renaming.json`

---

## Post-Processing Hook

Place `efpt.postrun.cmd` alongside the config file. Executes automatically after each code generation. Must use ANSI encoding.

Example use cases:
- Run `dotnet format` on generated code
- Apply custom sed/awk transformations
- Copy generated files to additional locations

---

## Extending Generated Code (Without Templates)

All generated classes are `partial`. Standard extension points:

```csharp
// OnModelCreating additions
partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Customer>().HasIndex(c => c.Email).IsUnique();
}

// Non-mapped properties
public partial class Customer
{
    [NotMapped]
    public string DisplayName => $"{FirstName} {LastName}";
}

// Buddy metadata classes for DataAnnotations
[MetadataType(typeof(CustomerMetadata))]
public partial class Customer { }
public class CustomerMetadata
{
    [Required]
    public string Email { get; set; }
}
```

---

## VS Extension Format: `efpt.config.json`

> [!key-insight] Two config formats exist. CLI uses nested kebab-case; VS uses flat PascalCase. **They are not interchangeable.**

The Visual Studio extension generates `efpt.config.json` with a **flat structure** and **PascalCase keys**. This is the format you get when clicking OK in the Reverse Engineering dialog. Right-click this file in Solution Explorer to re-run or edit.

### Key Mapping: VS (PascalCase) ↔ CLI (nested kebab)

| VS Key | CLI Key | Notes |
|--------|---------|-------|
| `CodeGenerationMode` | `code-generation/type` | int: 0=all, 1=dbcontext, 2=entity, 3=spocs, 4=custom |
| `ContextClassName` | `names/dbcontext-name` | |
| `ContextNamespace` | `names/dbcontext-namespace` | |
| `ModelNamespace` | `names/model-namespace` | |
| `OutputPath` | `file-layout/output-path` | |
| `OutputContextPath` | `file-layout/output-dbcontext-path` | |
| `ProjectRootNamespace` | `names/root-namespace` | |
| `IncludeConnectionString` | inverse of `enable-on-configuring` | `false` = connection excluded |
| `UseDatabaseNames` | `code-generation/use-database-names` | |
| `UseInflector` | `code-generation/use-inflector` | |
| `UseLegacyPluralizer` | `code-generation/use-legacy-inflector` | |
| `UseManyToManyEntity` | `code-generation/use-many-to-many-entity` | |
| `UseNullableReferences` | `code-generation/use-nullable-reference-types` | |
| `UseT4` | `code-generation/use-t4` | |
| `UseT4Split` | `file-layout/split-dbcontext-preview` | OBSOLETE |
| `T4TemplatePath` | `code-generation/t4-template-path` | |
| `UseHandleBars` | (Handlebars alternative) | `SelectedHandlebarsLanguage`: 0=off, 1=C#, 2=VB |
| `UseDateOnlyTimeOnly` | `type-mappings/use-DateOnly-TimeOnly` | |
| `UseHierarchyId` | `type-mappings/use-HierarchyId` | |
| `UseSpatial` | `type-mappings/use-spatial` | |
| `UseNodaTime` | `type-mappings/use-NodaTime` | |
| `UseBoolPropertiesWithoutDefaultSql` | `code-generation/remove-defaultsql-from-bool-properties` | |
| `UseSchemaFolders` | `file-layout/use-schema-folders-preview` | |
| `UseSchemaNamespaces` | `file-layout/use-schema-namespaces-preview` | |
| `UseNoNavigations` | `code-generation/use-no-navigations-preview` | |
| `UseNoObjectFilter` | inverse of `refresh-object-lists` | |
| `UseDbContextSplitting` | `file-layout/split-dbcontext-preview` | OBSOLETE |
| `UseFluentApiOnly` | inverse of `use-data-annotations` | |
| `UseAsyncStoredProcedureCalls` | (VS-only) | Generate async sproc signatures |
| `UseDatabaseNamesForRoutines` | `code-generation/use-database-names-for-routines` | |
| `UseDecimalDataAnnotationForSprocResult` | `code-generation/use-decimal-data-annotation-for-sproc-results` | |
| `UsePrefixNavigationNaming` | `code-generation/use-prefix-navigation-naming` | |
| `UseInternalAccessModifiersForSprocsAndFunctions` | (VS-only) | |
| `UseNoDefaultConstructor` | (VS-only, EF Core 7+) | |
| `UseTypedTvpParameters` | (VS-only) | |
| `PreserveCasingWithRegex` | `replacements/preserve-casing-with-regex` | |
| `UncountableWords` | `replacements/uncountable-words` | |
| `IrregularWords` | (VS-only) | |
| `PluralRules` | (VS-only) | |
| `SingularRules` | (VS-only) | |
| `SelectedHandlebarsLanguage` | (VS-only) | 0=off, 1=C#, 2=VB |
| `SelectedToBeGenerated` | `code-generation/type` | 0=all, 1=dbcontext, 2=entity, 3=spocs |
| `MinimumProductVersion` | (VS-only) | e.g., `"2.6.1604"` |

### VS Tables Array

VS uses `ObjectType` integer in a single `Tables` array instead of separate sections:
- `"ObjectType": 0` → table
- `"ObjectType": 1` → stored procedure
- `"ObjectType": 2` → function
- `"ObjectType": 3` → view

VS also supports `"ExcludedColumns": ["C012"]` per table object for column-level exclusion.

### Complete VS Config Example

```json
{
  "CodeGenerationMode": 4,
  "ContextClassName": "MyDbContext",
  "ContextNamespace": "MyProject.Data",
  "IncludeConnectionString": false,
  "ModelNamespace": "MyProject.Data.Models",
  "OutputContextPath": "EF\\MyDb",
  "OutputPath": "EF\\MyDb\\Models",
  "ProjectRootNamespace": "MyProject",
  "SelectedHandlebarsLanguage": 2,
  "SelectedToBeGenerated": 0,
  "T4TemplatePath": "",
  "Tables": [
    { "Name": "[dbo].[Customers]", "ObjectType": 0 },
    { "Name": "[dbo].[v_Orders]", "ObjectType": 3 },
    { "Name": "[dbo].[sp_Process]", "ObjectType": 1 },
    { "Name": "[dbo].[fn_Calculate]", "ObjectType": 2 }
  ],
  "UseBoolPropertiesWithoutDefaultSql": false,
  "UseDatabaseNames": false,
  "UseDatabaseNamesForRoutines": true,
  "UseDateOnlyTimeOnly": true,
  "UseDbContextSplitting": false,
  "UseDecimalDataAnnotationForSprocResult": true,
  "UseFluentApiOnly": false,
  "UseHandleBars": false,
  "UseHierarchyId": false,
  "UseInflector": true,
  "UseLegacyPluralizer": false,
  "UseManyToManyEntity": false,
  "UseNoDefaultConstructor": false,
  "UseNoNavigations": false,
  "UseNoObjectFilter": false,
  "UseNodaTime": false,
  "UseNullableReferences": true,
  "UsePrefixNavigationNaming": false,
  "UseSchemaFolders": false,
  "UseSchemaNamespaces": false,
  "UseSpatial": false,
  "UseT4": true,
  "UseT4Split": false,
  "UseAsyncStoredProcedureCalls": true,
  "UseTypedTvpParameters": true,
  "PreserveCasingWithRegex": false
}
```

---

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03. Deep-dive from wiki, issues, and sample configs. VS format section added 2026-07-03 based on actual generated `efpt.config.json` output from VS extension.
