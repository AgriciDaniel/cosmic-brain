---
type: concept
title: "SQL Server Statistics and Cardinality Estimation"
tags:
  - concept
  - sql-server
  - statistics
  - cardinality-estimation
  - performance-tuning
created: 2026-07-02
updated: 2026-07-02
status: developing
domain: database
complexity: intermediate
related:
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[SQL Query Optimization]]"
  - "[[Brent Ozar Unlimited]]"
sources:
  - "[[how-to-think-like-the-engine-part-3]]"
  - "[[how-to-think-like-the-sql-server-all-demo-edition]]"
  - "[[how-to-think-like-the-sql-server-engine-part-3]]"
  - "[[how-to-think-like-the-sql-server-engine-part-3-statistics-memory-grants]]"
aliases:
  - "cardinality estimation"
  - "SQL Server statistics"
  - "DBCC SHOW_STATISTICS"
  - "sargability"
---

# SQL Server Statistics and Cardinality Estimation

The optimizer's pre-execution estimate of how many rows a query will touch at each step, and the statistics infrastructure that produces those estimates. Cardinality estimation drives every major cost-based decision described in [[Query Execution Plan]] — including the **Tipping Point** and **Estimated Subtree Cost**.

## Statistics and Histograms

- `DBCC SHOW_STATISTICS` displays the histogram behind an index or column statistic: up to **201 buckets**, stored in roughly one 8KB page of metadata.
- Statistics objects are **auto-created with the same name as the index** they back (auto-generated column-level statistics get a system-generated name).
- Statistics are consulted by the optimizer **before** execution to estimate row counts for every operator in the plan; SQL Server does **not** re-plan a running query mid-execution when its estimates turn out wrong.

## Sampling

For large tables, SQL Server does not scan every row to build a statistic — it samples, similarly to political polling: a subset of rows is read and the histogram is extrapolated from that subset. This means the histogram can be meaningfully wrong for skewed distributions unless a full scan (`WITH FULLSCAN`) is used to rebuild the statistic.

## Sargability

A predicate is **sargable** ("Search ARGument ABLE") when the optimizer can use an index seek and accurate statistics against it directly. Applying a function to the column breaks this even when the predicate is logically equivalent to a plain range condition:

- `WHERE YEAR(order_date) = 2020` — **not sargable**. The optimizer cannot use the `order_date` histogram directly; it must evaluate `YEAR()` per row.
  - Rewrite: `WHERE order_date >= '2020-01-01' AND order_date < '2021-01-01'` — sargable, same logical result, dramatically different plan and cost.
- `WHERE CAST(order_date AS DATE) = '2020-06-01'` — same problem; casting the column defeats the histogram lookup even though the value comparison is logically identical to a direct date-range predicate.
- `WHERE MONTH(order_date) = 6` — same problem, and additionally loses year-level selectivity.

This is demonstrated across the source material with dramatically different execution plans and costs for logically-equivalent queries that differ only in whether the predicate is sargable.

## WA_* Auto-Created Statistics and the Update Threshold

Beyond the index-backed statistics described above, SQL Server auto-creates system-named `WA_*` statistics on frequently-filtered columns that have no index at all, so the optimizer still has *some* histogram to work with even without a matching index.

Statistics auto-update once roughly **20% of a table's rows have been modified since the last update** — but the counter tracks *modifications*, not *distinct rows changed*. Updating the same row a million times counts as a million modifications toward that threshold, not one.

### Ascending Stats Problem

On a table with a constantly-increasing key (an identity column, or a date column that only ever grows), newly inserted rows are invisible to the histogram until the next stats refresh — and on a large, slow-growing table that 20%-modification threshold may not be crossed for a long time, leaving recent rows systematically under-estimated. Improved (not eliminated) starting SQL Server 2014. Data warehouses with daily loads, or Stack Overflow-scale write-heavy tables, may need proactive/scheduled stats updates rather than relying on the auto-update threshold.

### Selective-Field-First Rule

For composite indexes/statistics, put the most selective column first so the histogram captures the most useful distribution — but only among columns that are actually present in the query's `WHERE` clause. Selectivity never overrides the requirement that the column order match the query shape (same left-to-right funnel constraint as [[Database Indexing]]'s Rule 3).

## Memory Grants (Statistics-Driven View)

Memory grants are fixed at plan-compile time from the estimated row counts described above and do **not** grow during execution, regardless of what actually happens at runtime. SQL Server needs RAM for three distinct purposes: caching raw data pages, caching execution plans, and query workspace (joins, sorts) — see [[Query Execution Plan]]'s Memory Grants section for the spill-to-tempdb consequence when the estimate is wrong. View actual (not estimated) memory grant usage via the SELECT operator's properties in the actual execution plan.

## Multi-Tenant / client_id Blind Spot

SQL Server statistics do not correlate two dimensions of the same table by default. For a multi-tenant table with a `client_id` filter and a time-range filter, the optimizer assumes the time distribution is uniform **across every client_id**, even if in reality one tenant has 100x the row volume and a very different date spread than the others. This produces badly wrong cardinality estimates for the largest tenants — a common real-world cause of plans that work fine in testing (small/typical tenant) but perform poorly for the largest customer.

## Relationship to Tipping Point and Query Cost

The **Tipping Point** (see [[Query Execution Plan]]) — the row-count threshold at which SQL Server abandons a seek-plus-key-lookup plan for a full scan — is entirely statistics-driven: it is calculated from the *estimated* row count at plan time, not the actual row count observed at runtime. Stale or sample-skewed statistics can therefore cause the optimizer to tip toward the wrong plan shape in either direction.

## Related

- [[Query Execution Plan]] — Tipping Point, Estimated Subtree Cost, Memory Grants all consume the estimates described here
- [[Database Indexing]] — SQL Server clustered/non-clustered model; stale-statistics cross-reference in the general "Why Database Ignores Your Index" section
- [[SQL Query Optimization]] — broader query-tuning taxonomy
- [[Brent Ozar Unlimited]] — source organization
- [[how-to-think-like-the-engine-part-3]] — primary source
- [[how-to-think-like-the-sql-server-all-demo-edition]], [[how-to-think-like-the-sql-server-engine-part-3]] — corroborating 2020 sources
