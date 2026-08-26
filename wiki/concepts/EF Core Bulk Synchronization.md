---
address: c-322
type: concept
title: "EF Core Bulk Synchronization"
domain: .NET / EF Core
status: evergreen
related:
  - "[[Entity Framework Core]]"
  - "[[Entity Framework Extensions]]"
  - "[[EF Core Batch Updates]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
tags:
  - ef-core
  - bulk-operations
  - data-synchronization
  - performance
---

# EF Core Bulk Synchronization

**Reconciling an in-memory source list against a database table — insert new, update changed, delete absent — in a single server-side operation.**

## The Problem

EF Core has no native "synchronize a list to a table" method. `ExecuteUpdateAsync` and `ExecuteDeleteAsync` (EF Core 7+) work from predicates, not from comparisons between an in-memory list and the database. The hand-rolled alternative (load existing → diff in memory → classify each row → SaveChanges) degrades on three axes at scale: memory (all rows materialized in change tracker), CPU (change detection cost), and correctness (every edge case is manual).

## BulkSynchronize (Entity Framework Extensions)

`context.BulkSynchronizeAsync(sourceList)` collapses insert/update/delete into one call:

1. Source list is bulk-copied into a temporary staging table
2. A server-side `MERGE` statement reconciles staging against the target
3. All three operations run inside a single transaction

**Key insight**: the diff happens inside the database. Zero source rows are materialized in .NET memory.

## Delete Scoping

`ColumnSynchronizeDeleteKeySubsetExpression` is the most important configuration option. Without it, the entire table is in scope and any row absent from the source list is deleted. With it (e.g., `p => new { p.SupplierId }`), only rows matching the subset expression are candidates for removal — other slices of the same table are untouched.

Generated SQL pattern:
```sql
WHEN NOT MATCHED BY SOURCE
    AND target.[SupplierId] IN
        (SELECT DISTINCT [SupplierId] FROM #StagingProducts)
    THEN DELETE;
```

## Performance Profile

Approximately 2× faster than hand-rolled diff-and-apply at 10K rows, with the gap widening at higher volumes. At 500K rows, ~35s vs. ~19s. Steady-state syncs (90% no-op, 10% update) show even larger relative gains (~4.5× at 100K rows).

## When NOT to Use

- Row counts under a few hundred with simple logic
- Tables needing complex per-row business logic during sync
- Environments where a paid dependency (Entity Framework Extensions) cannot be added

## Related Patterns

- **TRUNCATE + BulkInsertOptimized**: faster for full table replacement when no FK constraints exist
- **BulkMerge**: upsert-only (no delete branch) — use when absent rows should NOT be removed
- [[EF Core Batch Updates]]: predicate-based bulk operations (ExecuteUpdateAsync, ExecuteDeleteAsync)
