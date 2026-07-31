---
type: concept
title: "SQL Server Performance Monitoring Tools"
tags:
  - concept
  - sql-server
  - performance-tuning
  - monitoring
created: 2026-07-02
updated: 2026-07-02
address: c-000287
status: developing
related:
  - "[[Query Execution Plan]]"
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Dependency Tracking]]"
  - "[[Database Indexing]]"
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
sources:
  - "[[sql-performance-tuning-tips-for-newbies]]"
---

# SQL Server Performance Monitoring Tools

The diagnostic toolkit for identifying *why* a SQL Server query is slow, as distinct from the indexing/query-rewriting techniques used to fix it. Five tools, roughly in order of granularity (single query → session → server-wide history).

## SET STATISTICS TIME / IO — Per-Query Measurement

Session-level toggles that report cost metrics in the SSMS Messages tab after each query execution.

```sql
SET STATISTICS TIME ON;
SET STATISTICS IO ON;
-- query here
SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;
```

**TIME output:**
- CPU time — total time spent by the CPU
- Elapsed time — total wall-clock time
- Parse and compile time — time to parse/compile the query; **zero indicates a cached plan was reused**

**IO output:**
- Scan count — number of index/table scans performed
- Logical reads — pages read from data cache (memory)
- Physical reads — pages read from disk
- Read-ahead reads — pages prefetched into cache for the query

> [!warning] Both statistics add overhead to every query executed in the session while enabled. Turn off when not actively tuning.

## Execution Plans — Estimated vs. Actual

Two plan types, both viewable in SSMS via the Query menu toolbar ("Include Actual Execution Plan"):

- **Estimated Execution Plan** — generated without executing the query; shows the optimizer's projected steps, no runtime statistics.
- **Actual Execution Plan** — generated after execution; includes runtime statistics, warnings, and the steps actually taken.

**Reading convention**: graphical plans read **top to bottom, right to left**. See [[Query Execution Plan]] for deeper treatment.

## sp_whoisactive — Live Activity Snapshot

Third-party stored procedure ([amachanic/sp_whoisactive](https://github.com/amachanic/sp_whoisactive)) that surfaces currently-running queries, blocked processes, and resource consumption. Filterable by database, username, and program name. Install once, then query ad hoc during live incidents — complements Extended Events (which requires session setup in advance) for "what's happening right now" triage. The `@get_locks=1` parameter surfaces live lock XML, the primary tool for triaging an active blocking incident — see [[SQL Server Locking, Blocking, and Concurrency Control]].

## Extended Events — Lightweight Session Tracing

The modern replacement for SQL Trace/Profiler. Setup path in SSMS (Management → Extended Events → Sessions → New Session Wizard):

1. Name the session.
2. Select events to capture (e.g., `sql_statement_completed`).
3. Add global fields to capture (e.g., `client_app_name`).
4. Filter events (e.g., restrict to one application via `client_app_name`).
5. Start immediately + watch live data.

Also referenced from [[SQL Server DMV Usage Tracking]] as an alternative to DMV-based usage detection: `sqlserver.module_end` and `rpc_starting` events give granular per-execution tracking including parameters, filtered by object name to limit overhead. That page's warning applies here too — never run an unfiltered session in production during business hours.

## Query Store — Historical Query Performance Repository

Built into SQL Server 2016+. Once enabled on a database, it automatically captures query text, execution plans, runtime statistics, and wait statistics over time into a repository. Unlike the DMVs in [[SQL Server DMV Usage Tracking]] (which reset on restart / plan eviction), Query Store data persists.

Built-in reports:
- Regressed Queries
- Overall Resource Consumption
- Top Resource Consuming Queries
- Queries With Forced Plans
- Queries With High Variation
- Query Wait Statistics
- Tracked Queries

Practical use: open Query Store → Top Resource Consuming Queries to get a sorted list of the worst offenders with direct access to their execution plan and query text — a faster starting point than manually correlating DMV snapshots.

## Keeping Up With New Query-Tuning Features

Article emphasizes that new SQL Server releases regularly ship optimizer features that can produce large wins with zero query rewriting:

- **Adaptive Joins** (SQL Server 2017) — the join operator (e.g., nested loops vs. hash) is chosen dynamically at runtime based on actual row counts observed, rather than fixed at compile time.
- **Parameter Sensitivity Plan (PSP) Optimization** (SQL Server 2022) — allows multiple cached execution plans per parameterized query, one per parameter-value "bucket," to resolve parameter sniffing without manual `OPTION (RECOMPILE)` or plan-guide workarounds.
- **Batch Mode on Rowstore** (SQL Server 2019) — enables batch-mode (vectorized) execution on rowstore tables without requiring a columnstore index, previously a hard prerequisite.

## Tool Selection Guide

| Question | Tool |
|---|---|
| Why is *this one query* slow, right now? | `SET STATISTICS TIME/IO` + execution plan |
| What's running on the server *right now*? | `sp_whoisactive` |
| What did application X run over the last hour, with what parameters? | Extended Events session filtered on `client_app_name` |
| How has this query's performance trended over weeks, and did a plan regress? | Query Store |
| Is this stored procedure/table used at all? | [[SQL Server DMV Usage Tracking]] (`sys.dm_exec_procedure_stats`, `sys.dm_db_index_usage_stats`) |

## Related

- [[Query Execution Plan]] — deeper treatment of plan reading
- [[SQL Server DMV Usage Tracking]] — object-level usage auditing (complementary, not overlapping — DMVs answer "is it used," this toolkit answers "why is it slow")
- [[SQL Server Object Dependency Tracking]] — dependency-chain analysis
- [[Database Indexing]] — the fix, once this toolkit identifies the bottleneck
- [[sql-performance-tuning-tips-for-newbies]] — source article
