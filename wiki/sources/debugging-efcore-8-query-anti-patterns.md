---
address: c-301
type: source
title: "Debugging Entity Framework Core: 8 Real-World Query Anti‑Patterns (and How to Fix Them)"
source: "https://woodruff.dev/debugging-entity-framework-core-8-real-world-query-anti-patterns-and-how-to-fix-them/"
author:
  - "[[Chris Woodruff]]"
published: 2025-12-04
ingested: 2026-07-03
source_type: article
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Query Anti-Patterns]]"
  - "[[SQL Query Optimization]]"
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
tags:
  - ef-core
  - query-optimization
  - anti-patterns
  - sql-server
  - linq
  - csharp-advent-2025
---

# Debugging Entity Framework Core: 8 Real-World Query Anti‑Patterns

**Author:** [[Chris Woodruff]] — 2025 C# Advent (woodruff.dev, 2025-12-04)
**Demo:** [github.com/cwoodruff/DebuggingEFCoreMSSQL](https://github.com/cwoodruff/DebuggingEFCoreMSSQL) (Bad Book Store)

## Summary

Uses an intentionally "bad" SQL schema to demonstrate 8 common EF Core query anti-patterns. Each scenario shows: the LINQ shape, why it's slow (what SQL Server does), a quick DB-side fix (V1), and the proper model/schema fix (V2).

## The 8 Anti-Patterns

### 1. Date Stored as String → Range Queries Break
**Problem**: `OrderDate` as `nvarchar(30)`. `string.Compare` in LINQ → non-sargable, composite seek path impossible, index scans.
**V1 Fix**: Persisted computed column `OrderDate_dt AS TRY_CONVERT(datetime2(3), OrderDate)` + composite index.
**V2 Fix**: Store as `datetime2` in schema; map as `DateTime` in EF. Use normal range predicates.

### 2. Join on Wide Non-Unique Text → Hash Joins
**Problem**: Joining Reviews to Books on `Title` (`nvarchar(500)`) → hash joins with large memory grants.
**V1 Fix**: Index on `Books(Title)` — band-aid.
**V2 Fix**: Use stable keys (FK `BookIsbn`) and navigation-based joins.

### 3. Missing FK Index → Full Scans on Parent-Child Join
**Problem**: No index on `OrderLines(OrderId)` → nested loops do repeated scans.
**V1 Fix**: `CREATE INDEX IX_OrderLines_OrderId ON OrderLines(OrderId) INCLUDE (...)`.
**V2 Fix**: Always index FKs in migrations. Prefer navigation property queries over manual joins.

### 4. String Composite Clustered Key → Scan When Filtering Second Column
**Problem**: Clustered on `(WarehouseCode, BookISBN)` — filtering only by `BookISBN` yields clustered scans.
**V1 Fix**: Nonclustered index on `BookISBN`.
**V2 Fix**: Narrow surrogate clustered key (`INT IDENTITY`); nonclustered indexes for access patterns.

### 5. CSV-in-a-Column → LIKE Scans
**Problem**: `CategoryCsv` column with `%LIKE%` patterns. No index can fix denormalized CSV.
**V1 Fix**: None — intentionally designed to show limits of indexing.
**V2 Fix**: Normalize to bridge table `BookCategory(Isbn, CategoryName)` with proper joins.

### 6. Sorting by Text Date Column → Full Sort, tempdb Spills
**Problem**: `HappenedAt` as `nvarchar(30)`. `OrderByDescending` forces full sort; large sets spill to tempdb.
**V1 Fix**: Persisted computed `datetime2` column + descending index.
**V2 Fix**: Store as `datetime2`. Typed column → ordered seek, no sort.

### 7. FLOAT for Money → Precision Errors
**Problem**: `UnitPrice` as `FLOAT`. Binary floating-point can't represent decimal fractions; totals vary.
**V1 Fix**: None — wrong arithmetic; no index can fix it.
**V2 Fix**: Use `DECIMAL(19,4)` with `.HasPrecision(19, 4)` in EF model builder.

### 8. JSON-in-NVARCHAR → LIKE Probes, Full Scans
**Problem**: `Meta` as `nvarchar(max)`. `Contains("\"source\":\"mobile\"")` → leading `%LIKE%` full scan.
**V1 Fix**: Persisted computed column `Source AS JSON_VALUE(Meta, '$.source')` + index.
**V2 Fix**: Model important JSON attributes as real columns or EF computed columns with `.HasComputedColumnSql`.

## The "Fix V1" Pack

`Data/FixScripts.cs` applies pragmatic DB-side changes without refactoring app code:
- Computed persisted columns for string dates and JSON projections
- Targeted nonclustered indexes aligned to common predicates/orderings
- Transforms scans/sorts → seeks/ordered reads without touching LINQ

## Quick Checklist

1. Dates/times as `datetime2`, not strings
2. Composite indexes matching filter prefix; `INCLUDE` for covering
3. Index all FKs
4. Join on keys, not wide text
5. Normalize sets (no CSV in columns)
6. `StartsWith` over `%LIKE%`; full-text for advanced search
7. Project JSON attributes to computed/persisted columns + index
8. Money = `DECIMAL` with explicit precision
9. Narrow surrogate clustered keys; avoid `nvarchar` composites
10. Measure, compare, iterate

## Key Insight

> EF Core performance is a partnership between LINQ shape and storage design. You'll rarely "optimize" your way out of schema problems from the query layer alone.
