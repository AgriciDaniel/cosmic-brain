---
type: source
title: "Watch Brent Tune Queries 2020"
source_url: "https://www.youtube.com/watch?v=7hv4vD7Cfy0"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-01-31
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
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Query Hints]]"
---

# Watch Brent Tune Queries 2020

Brent Ozar demonstrates the full **B.E. C.R.E.E.P.I. query tuning process** on a Stack Overflow database using SQL Server 2019. The demo walks through two queries in one stored procedure (`ReportInterestingUsers`), starting at ~18s and finishing at near-instant after a computed column trick and a manual scalar function inline.

## The B.E. C.R.E.E.P.I. Process (Defined)

This session is the primary source for the full acronym:

| Letter | Step | Description |
|--------|------|-------------|
| **B** | **Blitz** | Run `sp_Blitz` and `sp_BlitzIndex` first — look for obvious server-level problems before diving into query tuning. Half of CPU cores disabled? No need to read execution plans. |
| **E** | **End user requirements** | Ask: "How long do you want me to spend?" (one hour, one day, one week). Ask: "Can this code be changed, or is it ORM-generated?" Ask: "Can we run it less often, or somewhere else?" |
| **C** | **Capture query metrics** | Turn on `SET STATISTICS IO ON`, `SET STATISTICS TIME ON`, and include the actual execution plan. Never tune off an estimated plan. |
| **R** | **Read the metrics and plan** | Is the query reading too much data (logical reads) or doing too much CPU work? Look at each operator right-to-left, top-to-bottom. |
| **E** | **Experiment with query cost** | Try one change at a time. Recognize common anti-patterns (table variables, sorting large rowsets, user-defined functions). |
| **E** | **Evaluate estimates vs. actuals** | The most important check. Compare estimated rows vs. actual rows at each operator. When more than 10x off, SQL Server built the wrong plan. |
| **P** | **Parallelism opportunities** | Consider forcing parallelism only after other options are exhausted. Parallelism often gives 4x-8x, not 100x — and can even regress. |
| **I** | **Index / database changes** | Last resort: modify covering indexes, add computed columns, etc. Try to change the query to match the database, not the database to match the query. |

## The 2020 Demo Walkthrough

### Phase 1: Computed Column with Auto-Created Statistics
- The first query in the stored procedure had wildly bad estimates: SQL Server thought 739,000 rows would come back, but only 6 matched.
- Creating a regular index on the filter columns did not help — SQL Server couldn't correlate the multi-column filter.
- **Solution**: Added a computed column (`magic_interesting_total` = `DownVotes + UpVotes + Reputation + Views`) and **did not persist it**. This caused SQL Server to auto-create statistics on the computed column, which gave the optimizer enough correlation information.
- **Result**: 17s → 5s. The plan shape changed completely, estimates dropped from 739K to ~600 rows.

### Phase 2: Scalar Function Inlining
- After fixing Query 1 (now at 98ms — "ship it"), focus shifted to Query 2 which still took ~4-5 seconds.
- The execution plan showed a **Compute Scalar** operator at 0% cost but actually taking 4+ seconds — a scalar user-defined function (`fn_GetPostType`).
- SQL Server 2019's automatic scalar function inlining didn't work (functions with GROUP BY in calling queries cannot be inlined).
- **Solution**: Manual inline — replaced the function call with a `LEFT JOIN` to `PostTypes` + `COALESCE(PT.Type, 'Unknown')`.
- **Result**: 5s → instantaneous (< 100ms).

### Why the B.E. C.R.E.E.P.I. Order Matters
Brent explicitly notes he violated his own process in the Oslo demo (jumping to indexing/parallelism first) and got poor results. In this 2020 demo, he follows the process in order and gets dramatic improvements. The "bottom-up" approach (starting with parallelism or indexing) is explicitly an anti-pattern.

## Key Techniques

### The Half-Hour Hourglass
A physical desk hourglass that flips every 30 minutes as a visual check-in. Purpose: avoid diving too deep into one approach. When the sand runs out, ask: "Should I pivot?" No beeps/alarms — the natural stopping point lets you finish a train of thought before switching.

### Estimated Plan Costs Are Meaningless
- Estimated Subtree Cost (query bucks/cents) has nothing to do with actual runtime cost — it's the optimizer's guess before execution.
- Even in an "actual" execution plan, the percentages and costs are still estimated pre-execution numbers (not actuals).
- Use **operator execution times** (wall clock at which each operator finished) to find actual bottlenecks.
- Use `sp_BlitzCache` sorted by duration or CPU to get a real leaderboard of expensive queries.

### .sqlplan XML — How SQL Server Hides Scalar Functions
- Scalar functions in execution plans appear as a Compute Scalar with 0% cost — but the **actual timeline** (operator finish times) reveals they can take 4+ seconds.
- SQL Server has hard-coded cost estimates for scalar functions that are not accurate.
- Right-click the SELECT operator → Properties → "Could not generate a valid parallel plan" — SQL Server gives no detail on why.

### Plan Explorer (SentryOne) — Free Plan Visualization
- Yellow bang warnings for user-defined functions ("Multiple executions of the user-defined functions may impact performance") that SSMS does not show.
- Color-coded costs by CPU vs. I/O.
- Line widths proportional to data volume.
- `fn_GetPostType.CreationDate` and `is_inlinable` in `sys.sql_modules` for checking SQL Server 2019 readiness.

### Index Creation Progress Tracking
Solomon Rutzky's DMV query (brentozar.com/go/progress) shows real-time index creation progress, percent complete, and estimated time remaining.

## Tools Referenced

- `sp_BlitzCache` — sorted by duration/CPU to identify the real expensive queries (not the estimated-cost ones)
- `sp_Blitz` — server-wide health check
- `sp_BlitzIndex` — per-table index analysis
- `sp_WhoIsActive` (Adam Machanic) — live activity monitoring
- `sp_BlitzWho` — live query plans
- Plan Explorer (SentryOne, free) — advanced execution plan visualization
- `statisticsparser.com` (Richie Rump) — STATISTICS IO output grid viewer
- `brentozar.com/go/progress` — index creation progress DMV
- `sys.sql_modules` — check `is_inlinable` for SQL Server 2019 scalar function compatibility
- SQL Server 2019 `ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN = ON`
- `DBCC FREEPROCCACHE` — clear plan cache (for demos)

## Concept Pages Filed From This Source

- [[SQL Server Query Tuning Methodology]] — new concept page consolidating the B.E. C.R.E.E.P.I. process from both transcripts.

## Related

- [[Brent Ozar Unlimited]]
- [[SQL Server Performance Monitoring Tools]] — sp_BlitzCache, sp_BlitzWho, Plan Explorer
- [[Query Execution Plan]] — estimated vs. actual plans, right-to-left reading
- [[SQL Server Statistics and Cardinality Estimation]] — computed column auto-stats technique
- [[SQL Server Query Hints]] — USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE')
