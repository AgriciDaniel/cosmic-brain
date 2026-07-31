---
type: concept
title: "SQL Server DMV Usage Tracking"
created: 2026-06-05
updated: 2026-06-05
tags:
  - mssql
  - sql-server
  - dmv
  - database-maintenance
status: developing
related:
  - "[[SQL Server Object Dependency Tracking]]"
  - "[[SQL Server Object Deprecation Workflow]]"
  - "[[DOGE WH Database Schema]]"
  - "[[Database Schema and Performance]]"
  - "[[SQL Server Performance Monitoring Tools]]"
sources:
  - "[[mssql-obsolete-objects-detection]]"
---

# SQL Server DMV Usage Tracking

Dynamic Management Views (DMVs) expose runtime execution statistics for SQL Server objects. They are the first-line tool for identifying unused stored procedures and tables — but carry a fundamental persistence limitation.

## Key DMVs

### sys.dm_exec_procedure_stats
Returns aggregate performance statistics for **cached** stored procedures. One row per cached plan.

Useful columns: `object_id`, `execution_count`, `last_execution_time`, `cached_time`, `total_elapsed_time`, `total_worker_time`

Covers: `SQL_STORED_PROCEDURE`, `CLR_STORED_PROCEDURE`, `EXTENDED_STORED_PROCEDURE`

Requires: `VIEW SERVER STATE` (SQL Server) or `VIEW DATABASE STATE` (Azure SQL DB). SQL Server 2022+: `VIEW SERVER PERFORMANCE STATE`.

### sys.dm_db_index_usage_stats
Tracks read/write activity at the table/index level. Useful for identifying tables with zero activity.

## Critical Limitation: Stats Reset on Restart

**All DMVs reset when SQL Server restarts.** There is no native persistence.

Additional caveat: `sys.dm_exec_procedure_stats` only tracks procedures whose plan is currently in cache. A plan evicted from cache removes the row entirely, even if the procedure was recently executed.

> [!warning] An object absent from `sys.dm_exec_procedure_stats` may have been recently used but had its plan evicted. Never treat absence from cache as proof of non-use.

## Persistent Storage Pattern

To survive restarts, schedule a job that captures DMV data to a table in an admin database.

```sql
-- Detect restart via tempdb recreation date
SELECT create_date AS LastRestartTime FROM sys.databases WHERE name = 'tempdb';
```

Merge logic:
- If restart detected since last capture: reset baseline to current DMV values
- If no restart: accumulate delta (current DMV value − last captured value)

Store per-object: `object_id`, `database_id`, `cumulative_execution_count`, `last_captured`, `last_execution_time`

Capture frequency: every 15–60 minutes via SQL Agent job. Run for at least one full business cycle (monthly-run procs need 30+ days of uptime).

## sys.dm_db_index_usage_stats for Table Activity

```sql
-- Tables with zero activity since last restart
SELECT t.name AS TableName
FROM sys.tables t
LEFT JOIN sys.dm_db_index_usage_stats s
       ON t.object_id = s.object_id AND s.database_id = DB_ID()
WHERE s.object_id IS NULL;
```

Same reset caveat applies. Apply the same persistent storage pattern for tables.

## ActiveCallers: Transitive Active-Use Detection

A single object's own DMV absence is weak evidence. A stronger signal: check whether any object that references it has confirmed execution history. If proc/view B calls table/proc A, and B appears in `sys.dm_exec_procedure_stats`, then A is in active use regardless of A's own cache status.

```sql
ActiveCallers AS (
    SELECT DISTINCT d.referenced_id AS object_id,
                    OBJECT_NAME(d.referencing_id) AS CalledByObject
    FROM      sys.sql_expression_dependencies d
    JOIN      sys.dm_exec_procedure_stats es ON d.referencing_id = es.object_id
    WHERE     d.referenced_id IS NOT NULL
)
```

**Rule: if `ActiveCallers.object_id IS NOT NULL`, force `ObsoleteScore = 0`.** The object is not obsolete, regardless of its own stats. This prevents false positives on helper procs/tables that have no direct execution history because they're only called indirectly.

## TableReads: Staging Table Guard

A table with zero rows is not necessarily unused. Staging tables are truncated and reloaded on each ETL run — they will always show zero rows between loads and still show active DMV reads.

```sql
TableReads AS (
    SELECT object_id
    FROM sys.dm_db_index_usage_stats
    WHERE database_id = DB_ID()
      AND (user_seeks > 0 OR user_scans > 0 OR user_lookups > 0)
)
```

**Rule: suppress the zero-row +2 bonus if `TableReads.object_id IS NOT NULL`.** The `ScoreReason` column surfaces a warning instead: `[⚠️ Zero rows but DMV shows active reads — may be staging/truncate target, verify]`.

## What DMVs Cannot Tell You

- Whether a procedure is referenced in **application code** (not just called through SQL)
- Whether a procedure is called from **SSIS packages** or **linked servers**
- Whether a procedure exists in **configuration tables** (e.g., `job_steps.command LIKE '%ProcName%'`)
- Usage hidden in **dynamic SQL strings** (see [[SQL Server Object Dependency Tracking]])

## Extended Events Alternative

For granular per-execution tracking (including parameters), use Extended Events:

- Event: `sqlserver.module_end` (any module completion)
- Event: `rpc_starting` (stored procs via RPC, captures parameters)
- Filter on `object_name` to limit overhead

See [[SQL Server Performance Monitoring Tools]] for the broader diagnostic toolkit this sits alongside — `SET STATISTICS TIME/IO`, execution plans, `sp_whoisactive`, and Query Store. That page covers "why is this query slow"; this page covers "is this object used at all."

> [!warning] Do not run unfiltered Extended Events sessions on production during business hours. Always filter by object name or database.

## SQL Server Audit Alternative

For persistent access logging that survives restarts, use SQL Server Audit. Target specific suspect objects during the quarantine period of the [[SQL Server Object Deprecation Workflow]].

Downside: verbose — generates one audit entry per table access. Limit to a small set of specific objects under investigation.
