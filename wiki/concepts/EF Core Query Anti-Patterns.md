---
address: c-325
type: concept
title: "EF Core Query Anti-Patterns"
domain: .NET / EF Core
status: evergreen
related:
  - "[[Entity Framework Core]]"
  - "[[SQL Query Optimization]]"
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[N+1 Query Problem]]"
tags:
  - ef-core
  - query-optimization
  - anti-patterns
  - linq
  - sql-server
---

# EF Core Query Anti-Patterns

**Common EF Core query patterns that degrade at scale, with quick DB-side mitigations and proper schema/model fixes.**

## Core Principle

EF Core performance is a partnership between LINQ shape and storage design. You can rarely optimize your way out of schema problems from the query layer alone. The fix hierarchy is: proper types and keys first, then indexes, then query rewrites.

## Anti-Pattern Catalog

### 1. String-Typed Temporal Data
Dates/times stored as `nvarchar` break sargability on range queries. `string.Compare` in LINQ → index scans.
- **V1**: Persisted computed `datetime2` column + index
- **V2**: Store as `datetime2`; map as `DateTime` in EF

### 2. Wide-Text Join Keys
Joining on `nvarchar(500)` columns → hash joins with large memory grants.
- **V1**: Index on the join column (band-aid)
- **V2**: Use stable, narrow keys (FKs to surrogate PKs); navigation-based joins

### 3. Missing FK Indexes
Unindexed foreign keys → nested-loop scans on every parent-child join.
- **V1**: Create covering nonclustered index on FK column
- **V2**: Always index FKs in migrations; prefer `.SelectMany()` navigation queries

### 4. Wide String Composite Clustered Keys
Clustering on `(nvarchar, nvarchar)` → filtering on the second key alone yields clustered scans.
- **V1**: Nonclustered index on the second key
- **V2**: Narrow surrogate clustered key (`INT IDENTITY`); targeted NC indexes per access pattern

### 5. CSV-in-a-Column
Denormalized comma-separated values in a single column → `%LIKE%` scans. No index can fix the membership test.
- **V1**: None (intentionally unfixable without schema change)
- **V2**: Normalize to bridge table with proper FK indexes; many-to-many navigation in EF

### 6. Text-Sorted Columns
`ORDER BY` on `nvarchar` date/time → full sort operations; large sets spill to tempdb.
- **V1**: Persisted computed `datetime2` + descending index
- **V2**: Store as proper `datetime2` type

### 7. FLOAT for Monetary Values
`FLOAT` / `REAL` for money → binary floating-point imprecision; totals vary, rounding errors accumulate.
- **V1**: None (arithmetic correctness issue, not performance)
- **V2**: Use `DECIMAL(19,4)` with `.HasPrecision(19, 4)`

### 8. JSON-in-NVARCHAR LIKE Probes
`Contains("\"key\":\"value\"")` on `nvarchar(max)` → leading `%LIKE%` full scans.
- **V1**: Persisted computed column via `JSON_VALUE()` + index; filter with equality
- **V2**: Model important attributes as real columns or EF computed columns

## Design Rules

| Rule | Rationale |
|------|-----------|
| Narrow surrogate clustered keys | Avoid `nvarchar` composites; keeps NC indexes small |
| Index all FKs | Every parent-child join path benefits |
| Composite indexes match filter prefix | Left-to-right funnel rule |
| `INCLUDE` for covering | Eliminates key lookups on SELECT columns |
| `DECIMAL` for money | `.HasPrecision(19, 4)` in EF model builder |
| `datetime2` for dates | Seekable range scans, no sort spill |
| Normalize sets | Bridge table beats CSV every time |
| Computed columns for JSON paths | `JSON_VALUE()` persisted + indexed = seekable |

## Diagnostic Approach

1. Capture the generated SQL (`.ToQueryString()` or `Log` delegate)
2. Paste into SSMS / Azure Data Studio with `SET STATISTICS IO ON`
3. Check: scans vs. seeks, logical reads, memory grants
4. Apply V1 fix for immediate relief; plan V2 for next schema migration
