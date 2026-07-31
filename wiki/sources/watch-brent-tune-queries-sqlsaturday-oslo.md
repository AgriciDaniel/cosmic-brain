---
type: source
title: "Watch Brent Tune Queries - SQLSaturday Oslo"
source_url: "https://www.youtube.com/watch?v=IVqvwNlwXuI"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-08-29
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - query-tuning
  - methodology
status: processed
related:
  - "[[SQL Server Query Tuning Methodology]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
---

# Watch Brent Tune Queries - SQLSaturday Oslo

Brent Ozar live-demos his query tuning process on a Stack Overflow database using SQL Server 2019. A user-supplied stored procedure (`ReportTopUsersByLocation`) takes ~50 seconds. The session walks through three attempted fixes (indexing, temp table decomposition, parallelism hints) with mixed results, demonstrating the non-linear reality of production tuning.

## Key Scenarios and Results

### The John Skeet Problem
- Query: find top users in a given location (Reading, UK) within a date range.
- SQL Server estimated 120 users; the actual count was 449 (within 10x, acceptable).
- But one user — **John Skeet** (Stack Overflow's most prolific contributor) — skewed the join to Comments: estimates predicted 229 rows, actual was ~895,000.
- SQL Server cannot know about outlier data distributions; it assumes "average" behavior.
- Removing John Skeet from the query (as a live demo joke) cut runtime from ~50s to under 5s — illustrating that **outliers are often the root cause** of catastrophic estimate failures.

### Attempt 1: Missing Index Suggestion (Clippy)
- SSMS's missing index suggestion ("98% improvement") was pursued first — a deliberate mistake to show why the B.E. C.R.E.E.P.I. process recommends against jumping to indexing.
- After creating the suggested index and clearing the plan cache, the query actually got **slower** (48s → 49s).
- The missing index feature only shows that an index *could* be used, not that it will meaningfully improve performance.

### Attempt 2: Temp Table Decomposition
- Following the "exacto knife" principle: break the query into two phases.
- First phase: dump users matching the location into a temp table with `PRIMARY KEY`.
- Second phase: join the temp table to posts and comments.
- **Result: query went from 50s to 4 minutes** — a regression. The temp table lost parallelism, and the estimates for the Comments join were still wrong (SQL Server still didn't know about John Skeet's activity).

### Attempt 3: Selective Index Additions
- Added `Score` and `CreationDate` to covering indexes on `OwnerUserId` (Posts) and `UserId` (Comments) to eliminate key lookups.
- Using `sp_BlitzIndex` (by Kendra Little) to examine existing indexes and data types before deciding what columns to add.
- **Result: query dropped from ~50s to ~30s** — a meaningful improvement but not the 100x users expect.

### Attempt 4: Forced Parallelism
- Used the `USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE')` query hint to force a parallel plan.
- **Result: query went from 30s to over 2 minutes** — parallelism hurt because the work was not evenly distributed (the thread that got John Skeet's data did all the work while other threads idled).

## Methodology Insights

### The 30-Minute Hourglass
Brent keeps a physical half-hour hourglass on his desk. Every 30 minutes he checks: "Am I on the right track? Am I making the kind of progress I expected? Should I pivot to a different approach?"

### Logical Reads > Time as Metric
- "Time is so unpredictable" — depends on server load, caching, parallel queries.
- Logical reads (8KB pages read from cache) are more reproducible and diagnostic.
- Used `SET STATISTICS IO ON` and pasted results into `statisticsparser.com` (by Richie Rump) for clean visualization.

### Estimates vs. Actuals — The 10x Rule
- Read execution plans from **right to left, top to bottom**.
- The single most important check: compare estimated rows vs actual rows at each operator.
- If within 10x: SQL Server understands the work (though the plan may not be fast).
- If more than 10x off: SQL Server built a plan based on wrong assumptions.

### Anti-Patterns Demonstrated
1. **Trusting missing-index suggestions** (Clippy) — the "98% improvement" claim was made up.
2. **Jumping directly to parallelism** — can make queries dramatically slower if work distribution is uneven.
3. **Using temp tables without checking selectivity** — a 4x regression instead of improvement.
4. **Relying on estimated execution plans** — always use actual plans to see real row counts.

## Tools Referenced

- `sp_BlitzWho` (First Responder Kit) — live query plans for running queries
- `sp_BlitzCache` — top 10 most resource-intensive queries from plan cache
- `sp_BlitzIndex` (by Kendra Little) — inventory of indexes per table with data types
- SQL Server 2019 `LAST_QUERY_PLAN` — `ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN = ON` captures the last actual execution plan for each query
- `activity monitor` — "Show Live Execution Plan" (~20% success rate)
- `statisticsparser.com` (Richie Rump) — clean grid visualization of STATISTICS IO output
- `brentozar.com/go/progress` (Solomon Rutzky's DMV query) — track index creation progress

## Concept Pages Filed From This Source

- [[SQL Server Query Tuning Methodology]] — new concept page consolidating the B.E. C.R.E.E.P.I. process and all methodology insights from both transcripts.

## Related

- [[Brent Ozar Unlimited]]
- [[Query Execution Plan]] — estimates vs. actuals, right-to-left reading convention
- [[SQL Server Statistics and Cardinality Estimation]] — why SQL Server can't know about outlier data like John Skeet
- [[SQL Server Performance Monitoring Tools]] — sp_BlitzWho, sp_BlitzCache, SET STATISTICS IO/TIME
- [[SQL Server Query Hints]] — USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE')
