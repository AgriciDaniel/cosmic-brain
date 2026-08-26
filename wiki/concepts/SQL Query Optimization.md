---
type: concept
title: "SQL Query Optimization"
created: 2026-07-02
updated: 2026-07-02
address: c-000285
tags:
  - database
  - concept
  - sql
  - performance
status: developing
related:
  - "[[Database Indexing]]"
  - "[[Database Index Advanced Techniques]]"
  - "[[Database Schema and Performance]]"
  - "[[N+1 Query Problem]]"
sources:
  - "[[sql-query-optimization-18-techniques]]"
  - "[[sql-query-performance-tuning-tips]]"
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
complexity: intermediate
domain: database
aliases:
  - "query optimization"
  - "SQL performance tuning"
  - "query performance tuning"
---

# SQL Query Optimization

Umbrella concept for the practice of writing and executing SQL queries so they use the least compute, memory, and I/O while returning correct results. This page is a taxonomy/index over the vault's SQL performance material — the deep technical content lives on the more specific pages linked below; this page organizes them and captures cross-cutting techniques that don't have their own dedicated page yet.

> Filed 2026-07-02 as part of a 4-article batch ingest of general SQL performance/optimization listicles (`.raw/notes/2026-07-02/`). Expect this page to accumulate cross-links as sibling ingests land — check for duplicate/near-duplicate technique sections before adding new ones.

## Where the Deep Content Lives

- [[Database Indexing]] — B+Tree mental model, Heap Table vs Clustered Index, the four golden rules (Fast Lookup / One-Direction Scan / Left-to-Right Funnel / Range Breaks Funnel), how indexes interact with `=`, `!=`, `NULL`, `LIKE`, `ORDER BY`, `GROUP BY`, `JOIN`; why the optimizer ignores your index (cost model, stale statistics, column transformation, type mismatch); `EXPLAIN` debugging.
- [[Database Index Advanced Techniques]] — expression/functional indexes, partial indexes, covering/index-only queries, JSON indexing, spatial/trigram/hash indexes, ghost conditions, range-to-equality transformation.
- [[Database Schema and Performance]] — denormalization trade-offs, UUID vs auto-increment PK, constraints (including exclusion constraints), partitioning, pre-aggregation, keyset pagination, CTEs, and assorted query-pattern shortcuts (`RETURNING`, `NULLIF` division safety, `DISTINCT ON`, gap-filling).
- [[N+1 Query Problem]] — the query-in-a-loop anti-pattern; batch/JOIN/eager-load fixes.
- [[SQL OR Predicate Anti-Pattern]] — why `OR` across multiple columns/tables defeats index seeks (1.2M reads → 750 reads via `UNION` rewrite, worked example).
- [[SQL Server Wildcard Search Optimization]] — leading-`%` search defeats B-Tree indexes; mitigation ladder from requirement re-scoping to Full-Text Indexing to hand-rolled n-grams.
- [[Query Optimizer Join Order Complexity]] — join-order combinatorics (`n!` left-deep vs `(2n-2)!/(n-1)!` bushy), splitting high-table-count queries.
- [[SQL Server Query Hints]] — `NOLOCK`/`RECOMPILE`/join hints/`OPTIMIZE FOR`: what each does, why forcing a join type also forces join order, and the "document or don't use it" rule of thumb.
- [[SQL Server Large Write Operation Contention]] — batching bulk INSERT/UPDATE/DELETE against busy production tables to bound lock duration and transaction log growth.

## Cross-Cutting Techniques Not Yet on a Dedicated Page

These come from [[sql-query-optimization-18-techniques]] and [[sql-query-performance-tuning-tips]] and don't cleanly belong to indexing or schema design specifically:

### Column Projection (Avoid `SELECT *`)
Explicitly list required columns instead of `SELECT *`. Reduces scan size, memory footprint, and network transfer — especially important when tables have wide text/JSON/nested columns that aren't needed for a given query.

### Early Filtering
Push `WHERE` predicates as early in the query/pipeline as possible so joins and aggregations operate on the smallest possible row set. Prefer predicates the engine can push down to storage (simple equality/range on indexed columns) over predicates that require materializing rows first.

### Row Limiting
Use `LIMIT` for exploratory/preview queries. Combine with `ORDER BY` only when ordering is actually required — an unnecessary sort on a large result set is wasted CPU/memory even if the row count is capped afterward.

### `EXISTS` vs Materialized Subqueries
`EXISTS` short-circuits at the first matching row; a subquery that returns and materializes a full result set (e.g., for use with `IN`) does not. Prefer `EXISTS` when only presence/absence matters, not the subquery's actual rows.

### `UNION ALL` vs `UNION`
`UNION` deduplicates the combined result set (extra sort/hash work); `UNION ALL` does not. Use `UNION ALL` whenever the source result sets are known not to overlap or duplicates are acceptable.

### `COUNT()` vs `EXISTS()` for Existence Checks
`COUNT(*) > 0` forces the engine to scan and tally every matching row before you can even inspect the result. `EXISTS()` short-circuits at the first match — the same short-circuit principle as `EXISTS` vs materialized subqueries above, applied specifically to "does at least one row match" checks. Reserve `COUNT()` for when you actually need the number of rows, not just presence/absence. Source: [[sql-query-performance-tuning-tips]].

### `SELECT DISTINCT` — Precision Over Avoidance
A common but imprecise piece of advice ([[sql-query-performance-tuning-tips]]) treats `DISTINCT` as inherently slow/inaccurate and recommends widening the SELECT column list to sidestep it. `DISTINCT` is exact, not approximate — its cost is the sort/hash step over the selected columns. Widening the column list to avoid it changes result granularity (previously-collapsed duplicate rows can reappear), which is a semantic change, not a performance fix. The precise tools for "one row per group" are `DISTINCT ON (col)` (PostgreSQL) or `ROW_NUMBER() OVER (PARTITION BY ...) ... WHERE rownum = 1` (portable) — see [[Database Schema and Performance]] § Useful Shortcuts and its `> [!contradiction]` callout for the full argument.

### Temp Tables as a Complexity Trade-off
Temp tables solve problems a single query can't (typically inside stored procedures too complex for one statement), but add intermediate state to reason about and maintain. Default to a single query or CTE (see [[Database Schema and Performance]] § CTE); reach for a temp table only when the logic genuinely requires persisted intermediate state.

### Time-Shift Heavy Query Shapes to Off-Peak Hours
Independent of how well a query is written, some shapes stay inherently heavy: looping statements, `SELECT *` on 1M+ row tables, nested subqueries, unanchored wildcard searches, `CROSS JOIN`s, `SELECT DISTINCT` over large sets. When these can't be eliminated, scheduling them during low-concurrency windows (e.g. overnight) protects a shared production database from user contention — a governance/scheduling lever distinct from rewriting the query. Source: [[sql-query-performance-tuning-tips]].

### Requirements Discipline as a Performance Lever
Vague requirements against a production database tend to get answered with an overly broad query (often an unfiltered `SELECT *`) "just in case." Scoping the actual need first — stakeholders, the 5 W's, specific fields/time windows — is a cheap way to avoid writing an expensive query in the first place, especially when a DBA team is involved for production access. Source: [[sql-query-performance-tuning-tips]].

### Execution Plan Review
Treat plan review as a recurring practice, not a one-time debug step — inspect for full scans, large shuffles, and expensive join strategies, and re-check as data volume and access patterns evolve. Complements the `EXPLAIN`/`EXPLAIN ANALYZE` mechanics documented in [[Database Indexing]] § Debugging with EXPLAIN.

### Redundant Sorting and Casting
Casts and default sort clauses that provide no business value (often introduced via copy-paste) still cost CPU. Cast once at ingestion where possible; drop sorts the query doesn't actually need.

### Platform-Native Acceleration
Modern engines/platforms (e.g., [[Dremio]]'s reflections/caching, or vendor-specific query stores/hints) offer built-in acceleration that reduces how much of this tuning has to be done manually. Vendor-specific — evaluate case by case rather than as a universal technique.

## Why It Matters at Scale (Business Framing)

From [[sql-query-optimization-18-techniques]]: inefficient queries compound into four categories of enterprise cost — cloud compute spend (unnecessary scans/shuffles billed directly under usage-based pricing), analytics responsiveness (slow dashboards erode trust), concurrency headroom (a few heavy queries degrade shared platforms for everyone), and operational reliability (unpredictable queries cause timeouts and complicate incident response).

## Open Questions / Gaps

- 2026-07-02 update: merged in [[sql-query-performance-tuning-tips]] (the Klipfolio "7 tips" listicle) — `COUNT()` vs `EXISTS()`, `SELECT DISTINCT` precision, temp table trade-offs, off-peak scheduling, and requirements discipline sections above are sourced from it, along with a contradiction callout on `SELECT DISTINCT` filed on [[Database Schema and Performance]].
- Still to reconcile: sibling batch sources on SQL Server-specific tuning and general performance tips for newbies (same `.raw/notes/2026-07-02/` batch, ingested in parallel) — check this page again once those land in case they duplicate sections above.
- No coverage yet of vendor-specific execution plan tooling (SQL Server Query Store, PostgreSQL `pg_stat_statements`, etc.) — likely to be added by the SQL Server-focused sibling source.
