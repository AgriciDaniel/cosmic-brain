---
type: concept
title: "EF Core Power Tools Stored Procedure Mapping"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000335
tags:
  - concept
  - ef-core
  - stored-procedures
  - reverse-engineering
  - tooling
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[Entity Framework Core]]"
---

# EF Core Power Tools Stored Procedure Mapping

Complete reference for reverse-engineering SQL Server stored procedures, scalar functions, and table-valued functions into EF Core code.

## Object Types Supported

| Object Type | Generated Output |
|-------------|-----------------|
| Stored procedures | Method on DbContext + result class |
| Scalar functions | Method on DbContext returning scalar |
| Table-valued functions (TVF) | Method on DbContext returning `IQueryable<T>` |

## Result Set Discovery Methods

### Method 1: `SET FMTONLY` (Default)

Default discovery mechanism. EF Core Power Tools wraps the procedure call with `SET FMTONLY ON` to capture result set metadata without executing the procedure.

**Limitations:**
- Fails on procedures using `#temp` tables (temp table metadata unavailable at parse time)
- Cannot detect multiple result sets
- Computed columns may be missed
- Dynamic SQL result shapes invisible

### Method 2: `sp_describe_first_result_set` (Alternate)

Enable globally or per-procedure. More reliable but still single-resultset only.

**Global enable:** Advanced Options → "Use alternate result set discovery", or config:
```json
"code-generation": {
    "use-alternate-stored-procedure-resultset-discovery": true
}
```

**Per-procedure enable:**
```json
"stored-procedures": [
    {
        "name": "[dbo].[CustOrderHist]",
        "use-legacy-resultset-discovery": true
    }
]
```

### Method 3: Multiple Result Sets (Preview)

Enable via Visual Studio Options → "Discover multiple result sets from SQL stored procedures." Requires **Dapper** NuGet package.

Config key:
```json
"code-generation": {
    "discover-multiple-stored-procedure-resultsets-preview": true
}
```

---

## Workarounds for Discovery Failures

### Empty Result Set — Preventing Ghost Classes

Procedure returns no result set but generates an empty C# class. Fix: add guard at top of procedure:
```sql
IF NOT EXISTS(SELECT SESSIONPROPERTY('fmtonly'))
BEGIN
    SET FMTONLY OFF;
    RETURN;
END
```

### Temp Table Procedures

When `#temp` tables break `SET FMTONLY` discovery: expose the result shape using a table variable or CTE that mirrors the temp table structure, or use `sp_describe_first_result_set` with a dummy `SELECT`:
```sql
-- Workaround: expose shape for discovery
IF (1 = 0)
    SELECT CAST(NULL AS INT) AS Id, CAST(NULL AS NVARCHAR(100)) AS Name
    FROM (SELECT 1) AS Dummy;
```

### Missing Properties in Result Classes

Add missing properties via partial class:
```csharp
public partial class CustOrderHistResult
{
    public string MissingColumn { get; set; }
    public decimal ComputedTotal { get; set; }
}
```

### Mapping to Existing Class

EF Core 8+ supports mapping sproc results to any class, not just auto-generated ones:
```json
"stored-procedures": [
    {
        "name": "[dbo].[GetCustomerOrders]",
        "mapped-type": "CustomerOrderDto"
    }
]
```

---

## Generated Code Patterns

### Synchronous vs. Asynchronous

By default generates async signatures:
```csharp
public async Task<List<CustOrderHistResult>> CustOrderHistAsync(string customerId) { ... }
```

Force synchronous signatures:
```json
"UseAsyncStoredProcedureCalls": false
```
*(VS extension setting; not available in CLI)*

### Decimal Precision

By default adds `[Column(TypeName = "decimal(19,4)")]` on decimal sproc result properties. Disable:
```json
"code-generation": {
    "use-decimal-data-annotation-for-sproc-results": false
}
```

### Routine Naming

By default generates "friendly" names (stripping prefixes, applying PascalCase). Use raw database names instead:
```json
"code-generation": {
    "use-database-names-for-routines": true
}
```

---

## Config Reference (Stored Procedure Section)

```json
{
  "stored-procedures": [
    {
      "name": "[dbo].[CustOrderHist]",
      "exclude": false,
      "use-legacy-resultset-discovery": true,
      "mapped-type": "CustomerOrderDto"
    },
    {
      "name": "[dbo].[SalesByYear]",
      "exclude": false
    },
    {
      "name": "[dbo].[LegacyReport]",
      "exclude": true
    }
  ],
  "functions": [
    {
      "name": "[dbo].[GetTotalSales]",
      "exclude": false
    }
  ],
  "code-generation": {
    "use-alternate-stored-procedure-resultset-discovery": false,
    "discover-multiple-stored-procedure-resultsets-preview": false,
    "use-stored-procedure-resultset-fallback": true,
    "use-decimal-data-annotation-for-sproc-results": false,
    "use-database-names-for-routines": false
  }
}
```

### Per-Object Keys

| Key | Type | Purpose |
|-----|------|---------|
| `name` | string | Schema-qualified name: `[dbo].[ProcName]` |
| `exclude` | bool | Exclude from scaffolding |
| `use-legacy-resultset-discovery` | bool | Use `sp_describe_first_result_set` per-object |
| `mapped-type` | string | Map to existing C# class (EF Core 8+) |

---

## Full Discovery Fallback Chain

```
1. FMTONLY (default, per-procedure if not overridden)
   ↓ failure
2. sp_describe_first_result_set (if per-proc or globally enabled)
   ↓ failure
3. use-stored-procedure-resultset-fallback (if true) — best-effort
   ↓ failure
4. Empty result class generated → add properties via partial class
```

---

## Tips

1. **Report discovery failures** to the repo maintainer — edge cases help improve the tool.
2. **Test sproc scaffolding on a copy** of the database first — not all procedures scaffold cleanly.
3. **Square brackets required** in `name` field for CLI: `[dbo].[ProcName]` not `dbo.ProcName` (issue #3214).
4. **Functions use same config section** as stored procedures; TVFs get `IQueryable<T>` return types, scalar functions get scalar returns.
5. **Sproc result classes are `partial`** — always add custom properties in separate files, never hand-edit generated code.

## Source

Ingested from <https://github.com/ErikEJ/EFCorePowerTools/wiki/Reverse-Engineering> on 2026-07-03.
