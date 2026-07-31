---
address: c-296
type: source
title: "5 EF Core Performance Anti-Patterns That Entity Framework Extensions Eliminates"
created: 2026-07-03
updated: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - performance
  - article
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[Entity Framework Extensions]]"
  - "[[Chris Woodruff]]"
  - "[[EF Core Performance Anti-Patterns]]"
  - "[[N+1 Query Problem]]"
source_url: "https://woodruff.dev/5-ef-core-performance-anti-patterns-that-entity-framework-extensions-eliminates/"
raw_path: ".raw/notes/2026-07-03/5 EF Core Performance Anti-Patterns That Entity Framework Extensions Eliminates - Chris Woody Woodruff.md"
source_type: blog
author: "[[Chris Woodruff]]"
date_published: 2026-07-01
confidence: medium
key_claims:
  - "EF Core 10 handles two of the five common anti-patterns well natively (looping inserts via AddRange, predicate-based deletes via ExecuteDelete)"
  - "Three of the five anti-patterns (hand-rolled upsert, 2,100-parameter Contains wall, multi-pass sync) have no native EF Core 10 answer"
  - "Entity Framework Extensions (EFE) is a commercial library that wraps provider-native bulk operations (SqlBulkCopy, PostgreSQL COPY) behind an EF Core-model-aware API"
  - "Benchmarks show 10-100x+ speedups and near-constant memory for EFE bulk methods versus naive tracked-entity approaches at scale"
  - "Sponsored content in partnership with ZZZ Projects (maker of EFE); article is explicit about EFE being commercial with a free trial"
---

# 5 EF Core Performance Anti-Patterns That Entity Framework Extensions Eliminates

Sponsored blog post by [[Chris Woodruff]] (published 2026-07-01 on woodruff.dev, in partnership with ZZZ Projects) walking through five common EF Core code smells, what EF Core 10 does about each natively, and where the commercial [[Entity Framework Extensions]] (EFE) library still fills a gap. One of a large batch of Chris Woodruff EF Core articles ingested together from `.raw/notes/2026-07-03/`.

## Structure

Each of the five anti-patterns is covered in the same four-part structure: the bad code, why it hurts, what EF Core 10 does about it natively, and where EFE earns its place — each closing with a benchmark table.

## The Five Anti-Patterns

### 1. The Loop That Saves Every Row
Calling `SaveChangesAsync()` inside (or even just after) a `foreach` insert loop. One-row-per-round-trip is the worst case; batching `SaveChanges` outside the loop is better but `DetectChanges` cost still grows quadratically with tracked entity count.
- **Native fix**: `AddRangeAsync` + one `SaveChangesAsync()` — EF Core 10 batches multi-row INSERTs (default `MaxBatchSize` 1,000 on SQL Server), single `DetectChanges` pass, identity values flow back. "No third-party library required. Stop here" for <10K flat entities.
- **EFE fix**: `BulkInsertAsync` / `BulkInsertOptimized` wrap `SqlBulkCopy` (SQL Server) / `COPY` (PostgreSQL). `BulkInsertOptimized` skips the temp-table identity round-trip. `BulkInsert` + `IncludeGraph` handles parent-child graphs in one call.
- **Benchmark** (10-property Customer entity, SQL Server): 100,000 rows — foreach+SaveChanges "could not execute," AddRange+SaveChanges 6,661.80 ms, BulkInsertOptimized 578.86 ms.

### 2. The Hand-Rolled Upsert
Looping over incoming items, `FirstOrDefaultAsync` per item to check existence, then insert-or-update by hand. Pure N+1: N SELECTs before any write.
- **Native fix**: none. EF Core 10 has no upsert primitive — `ExecuteUpdate` can't make per-row insert-or-update decisions. Workarounds (chunked pre-fetch + partition, raw `MERGE`, temp-table staging) all "work" but none "feel like EF Core."
- **EFE fix**: `BulkMergeAsync` with `ColumnPrimaryKeyExpression` for custom key matching (SKU, email, etc.), `OnMergeInsertInputExpression`/`OnMergeUpdateInputExpression` for per-column insert-vs-update control, `IncludeGraph` for hierarchical data. "The single clearest case in the post where EFE has no native competitor."
- **Benchmark** (10K incoming products, 50/50 existing/new): hand-crafted 6,344.3 ms / 10,000+ round trips vs BulkMerge 336.5 ms / 1 round trip.

### 3. Load a Million Rows Just to Delete Them
`ToListAsync()` to materialize every matching row, `RemoveRange`, then `SaveChanges`. Loads gigabytes into managed memory before a single DELETE is issued; change tracker does full relationship fix-up and cascade computation in memory for rows about to be discarded.
- **Native fix**: `ExecuteDeleteAsync()` (since EF Core 7, refined in 10) — this is the one anti-pattern "where EF Core 10 wins outright" for the predicate-based case. Zero entities loaded, one DELETE, one round trip.
- **EFE fix**: `BulkDeleteAsync` — only useful for the **list-based** case (specific rows a user selected in a UI grid) that doesn't reduce to a clean predicate; `ExecuteDelete` can't express that without hand-translating back to a predicate. `DeleteFromQuery` exists for EF Core ≤6 or API-consistency reasons.
- **Benchmark** (100K expired sessions): ToList+RemoveRange 3,316.8 ms / 687 MB peak memory; ExecuteDelete 1,230.5 ms / 144 KB; BulkDelete (100K-item list) 1,273.8 ms / 22 MB.

### 4. The 2,100 Parameter Wall
`Where(c => ids.Contains(c.Id))` against a large in-memory ID list translates to one SQL parameter per value. SQL Server hard-caps single queries at 2,100 parameters → `SqlException`. Below the cap, query-plan compilation cost and poor plan-cache reuse degrade performance as the list grows.
- **Native fix**: none clean. EF Core 8/9 array-pass strategies help on PostgreSQL but SQL Server's 2,100-parameter ceiling is a wire-protocol constraint EF Core 10 hasn't changed. Workarounds: chunk+union (fragile with ORDER/DISTINCT across chunks), raw-SQL temp table + `FromSqlInterpolated`, or table-valued parameters (SQL-Server-specific ADO.NET wiring).
- **EFE fix**: `WhereBulkContains` stages the list as a temp table / table-valued parameter behind the scenes and joins server-side — parameter limit becomes irrelevant, plan shape stabilizes regardless of list size. Variants: composite-key version, `WhereBulkContainsFilterList` (which of these IDs exist/don't exist), `WhereBulkNotContains(FilterList)`.
- **Benchmark** (lookup against 1M-row Customers table): 5,000 IDs — standard `Contains` throws `SqlException`, `WhereBulkContains` 53.91 ms; 50,000 IDs — standard "not possible," `WhereBulkContains` 291.64 ms.

### 5. Three Passes Where One Would Do
Manual full-table sync (delete-rows-not-in-source, update-matched, insert-new) as three separate operations. Two of the three passes embed anti-pattern 4 (`Contains` against a large ID set). No transactional atomicity by default — a mid-sync `SaveChanges` failure leaves the table half-synced.
- **Native fix**: none as a single primitive; the "composed native version" chains `ExecuteDeleteAsync` + `ExecuteUpdate`/tracked updates + `AddRange`, still three round trips, still needs an explicit transaction, still inherits the parameter-limit risk from anti-pattern 4.
- **EFE fix**: `BulkSynchronizeAsync` with `ColumnPrimaryKeyExpression` — one call, one transaction, inserts + updates + deletes all server-side and atomic, no parameter-limit exposure, plus `IgnoreOnSynchronizeMatchedAndConditionExpression` to skip no-op updates.
- **Benchmark** (50K incoming products vs 50K-row table, 60/20/10/10 mix): hand-rolled 8,335.5 ms / 3 round trips; composed native 6,657.3 ms / 3 round trips; BulkSynchronize 221.2 ms / 1 round trip.

## Consolidated Scorecard

| Anti-pattern | Naive | Native EF Core 10 | EFE method |
|---|---|---|---|
| 1. Looping inserts | foreach + SaveChanges | AddRange + SaveChanges (good to ~10K) | BulkInsert / BulkInsertOptimized |
| 2. Hand-rolled upsert | FirstOrDefault + add/update | no native equivalent | BulkMerge |
| 3. Load-then-delete | ToList + RemoveRange | ExecuteDelete (predicate-based) | BulkDelete (list-based) |
| 4. Parameter-limit Contains | .Contains against big list | no clean equivalent | WhereBulkContains |
| 5. Separate sync passes | three ops + manual diff | no native equivalent (compose 3 ops) | BulkSynchronize |

Three of five patterns have no native EF Core 10 answer — the article's stated "honest summary."

## Footguns Called Out (apply across all five patterns)

1. **Change tracker staleness** — entities already loaded into the current `DbContext` don't auto-refresh after a server-side/bulk operation; call `context.ChangeTracker.Clear()` or reload.
2. **Transaction hygiene** — bulk operations execute immediately (not on `SaveChanges`); wrap mixed bulk + tracked-change units of work in an explicit `BeginTransactionAsync`/`CommitAsync`.
3. **Interceptors do not fire** — `ISaveChangesInterceptor` is bypassed by `ExecuteUpdate`, `ExecuteDelete`, and every EFE bulk method. Audit logging / domain events in interceptors need another hook (DB triggers, app-level wrappers).
4. **Lazy loading + IncludeGraph** — with lazy loading on, `BulkInsert` + `IncludeGraph` triggers loading on every navigation property the graph walker touches; disable lazy loading (or use explicit eager loading) before bulk graph operations.

## Commercial Disclosure

[Z.EntityFramework.Extensions.EFCore](https://entityframework-extensions.net/) is explicitly flagged as a commercial library (perpetual license, rolling free trial); the post is labeled "Sponsored content in partnership with ZZZ Projects."

## Notes on Confidence

Benchmark tables are vendor/author-produced (not independently reproduced in this ingest) and the post is sponsored content promoting EFE — treat performance multipliers as directionally credible but not neutral. The native-EF-Core-10 assessment (no upsert primitive, 2,100-parameter SQL Server ceiling, no full-sync primitive) is a factual claim about the platform independent of the sponsorship and matches known EF Core/SQL Server behavior.
