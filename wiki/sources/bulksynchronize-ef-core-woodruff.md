---
address: c-297
type: source
title: "BulkSynchronize in EF Core: Mirror Your Data in One Operation"
source: "https://woodruff.dev/bulksynchronize-in-ef-core-mirror-your-data-in-one-operation/?ref=dailydev"
author:
  - "[[Chris Woodruff]]"
published: 2026-06-25
ingested: 2026-07-03
source_type: article
related:
  - "[[Entity Framework Core]]"
  - "[[Entity Framework Extensions]]"
  - "[[EF Core Bulk Synchronization]]"
  - "[[EF Core Batch Updates]]"
tags:
  - ef-core
  - bulk-operations
  - entity-framework-extensions
  - data-synchronization
---

# BulkSynchronize in EF Core: Mirror Your Data in One Operation

**Author:** [[Chris Woodruff]] (woodruff.dev, 2026-06-25)
**Topic:** Entity Framework Extensions `BulkSynchronize` — insert, update, and delete in a single server-side operation.

## Summary

The hand-rolled "diff-and-apply" pattern for syncing a source list against a database table (load existing rows → build lookup → classify each row → SaveChanges) works at small scale but degrades on three fronts as volume grows:

1. **Memory**: loading existing rows materializes everything into the change tracker
2. **Change-detection cost**: climbs faster than row count
3. **Maintenance burden**: every edge case (upsert, update-or-skip, delete detection) is manual

EF Core has no native `ExecuteSynchronizeAsync`. `ExecuteUpdate`/`ExecuteDelete` work from predicates, not from in-memory vs. database comparisons.

## How BulkSynchronize Works

`context.BulkSynchronizeAsync(sourceList)` replaces the entire hand-rolled pattern with one call:

- Row in source, not in target → **INSERT**
- Row in source AND target → **UPDATE** (if values differ)
- Row in target, not in source → **DELETE**

Under the covers, EFE writes the source list into a temporary staging table via bulk copy (BCP on SQL Server, COPY on PostgreSQL), then executes a server-side `MERGE` statement. The diff happens inside the database — zero source rows materialized in .NET memory.

## Scoping the Delete: The Critical Configuration

`ColumnSynchronizeDeleteKeySubsetExpression` defines the sync scope. Without it, the entire table is the scope (correct for small reference tables). With it, only rows matching the subset expression are candidates for deletion:

```csharp
await context.BulkSynchronizeAsync(supplierProducts, options =>
{
    options.ColumnPrimaryKeyExpression = p => p.Sku;
    options.ColumnSynchronizeDeleteKeySubsetExpression =
        p => new { p.SupplierId };
});
```

Generated SQL adds `AND target.[SupplierId] IN (SELECT DISTINCT [SupplierId] FROM #StagingProducts)` to the DELETE branch, scoping the operation to one supplier's slice.

## Performance (BenchmarkDotNet 0.14, .NET 10, SQL Server)

| Source List | Hand-rolled | BulkSynchronize |
|-------------|-------------|-----------------|
| 1K rows (mixed) | 131.7 ms | 121.6 ms |
| 10K rows (mixed) | 618.7 ms | 286.4 ms |
| 50K rows (mixed) | 2,990.9 ms | 1,382.9 ms |
| 100K rows (mixed) | 5,979.4 ms | 2,733.8 ms |
| 500K rows (mixed) | 35,699.2 ms | 19,156.6 ms |
| 10K rows (90% no-op) | 227.8 ms | 148.3 ms |
| 100K rows (90% no-op) | 2,304.1 ms | 510.6 ms |

## Key Configuration Options

- **ColumnPrimaryKeyExpression**: match key (e.g., business key SKU vs. DB identity)
- **ColumnSynchronizeDeleteKeySubsetExpression**: scope the delete to a slice of the table
- **OnSynchronizeInsertInputExpression / OnSynchronizeUpdateInputExpression**: choose which columns to write
- **IgnoreOnSynchronizeInsertExpression / IgnoreOnSynchronizeUpdateNames**: inverse — columns to skip
- **SynchronizeSoftDeleteFormula**: convert delete to soft delete (SET IsDeleted = 1)
- **UseAudit**: capture before/after history of every affected row
- **BatchSize / BatchTimeout**: chunking control for very large syncs
- **Log**: capture generated SQL for verification during development

## Production Notes

- **Atomic**: one transaction covers insert, update, and delete; commit is immediate
- **FK constraints apply**: rows removed by sync are subject to cascade rules
- **Change tracker goes stale**: call `context.ChangeTracker.Clear()` after BulkSynchronize
- **Interceptors don't fire**: bypasses SaveChanges; use UseAudit for compliance trails
- **Provider variance**: SQLite has no native bulk copy, so gains are smaller than on SQL Server
- **Identity values come back**: EFE writes generated IDs to in-memory entities; set `AutoMapOutputDirection = false` to skip

## When to Use

| Use case | Recommendation |
|----------|---------------|
| Syncing external API data into a local cache | BulkSynchronize + subset expression |
| Refreshing reporting tables | BulkSynchronize (scope by date) |
| Mirroring small reference tables | Unscoped BulkSynchronize |
| Per-tenant data sync in SaaS | BulkSynchronize + TenantId subset |
| Few hundred rows, complex per-row logic | Keep hand-rolled |
| Full table replacement (no FK constraints) | TRUNCATE + BulkInsertOptimized |

## License

Part of [[Entity Framework Extensions]] (ZZZ Projects, maintained since 2014). Paid library; rolling monthly free trial available for evaluation.
