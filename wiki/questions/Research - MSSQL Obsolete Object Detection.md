---
type: synthesis
title: "Research: MSSQL Obsolete Object Detection"
created: 2026-06-05
updated: 2026-06-05
tags:
  - research
  - mssql
  - sql-server
  - database-maintenance
status: developing
related:
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Dependency Tracking]]"
  - "[[SQL Server Object Deprecation Workflow]]"
  - "[[DOGE WH Database Schema]]"
  - "[[Database Schema and Performance]]"
sources:
  - "[[mssql-obsolete-objects-detection]]"
---

# Research: MSSQL Obsolete Object Detection

How to identify and safely remove obsolete stored procedures, views, and tables from a SQL Server database. Research conducted 2026-06-05 from the raw file `.raw/mssql/mssql-obsolete-objects.md` and web sources.

## Overview

Large SQL Server databases accumulate dead code: stored procedures nobody calls, views pointing at migrated tables, tables with zero rows and no schema-level references. Five detection signals exist, each with blind spots. The safe removal workflow is: score → cross-reference → quarantine → monitor → drop. Dropping immediately without a quarantine window is the primary failure mode.

## Key Findings

- DMVs reset on every restart: absence from `sys.dm_exec_procedure_stats` means "not cached since last restart" — not "never used" (Source: [[mssql-obsolete-objects-detection]])
- `sys.sql_expression_dependencies` misses dynamic SQL entirely; a procedure that builds table names at runtime shows zero dependencies even if heavily used (Source: [[mssql-obsolete-objects-detection]])
- The persistent storage pattern (capture DMV data to a table on a schedule, detect restarts via tempdb creation_date) solves the restart problem (Source: [[mssql-obsolete-objects-detection]])
- Extended Properties (`sp_addextendedproperty`) can mark objects as deprecated with a structured reason + planned drop date; DDL triggers can surface these as runtime warnings (Source: [[mssql-obsolete-objects-detection]])
- SQL Server Audit persists across restarts and can log access to specific objects — useful for auditing quarantined objects (Source: [[mssql-obsolete-objects-detection]])
- Extended Events (`module_end`, `rpc_starting`) provide granular per-execution tracking with parameters; must filter by object name on production (Source: [[mssql-obsolete-objects-detection]])
- Security risk: unused stored procedures provide unmonitored data access paths (Source: [[mssql-obsolete-objects-detection]])

## Five Detection Signals

| Signal | Tool | Blind Spot |
|---|---|---|
| Execution history | `sys.dm_exec_procedure_stats` | Resets on restart; plan eviction |
| Modify date | `sys.objects.modify_date` | Object unmodified ≠ object unused |
| Table activity | `sys.dm_db_index_usage_stats` | Resets on restart |
| SQL-SQL dependencies | `sys.sql_expression_dependencies` | Dynamic SQL invisible |
| Job references | `msdb.dbo.sysjobsteps` | Only SQL Agent; misses SSIS, app code |

## All-in-One Scoring Formula (v2)

```
ActiveCallers override: if any referencing object has confirmed execution history → score forced to 0

ObsoleteScore (max 10) =
  +3  if not in execution cache
  +2  if no inbound SQL dependencies
  +2  if unmodified > 365 days
  +1  if unmodified > 730 days (stacked on top of +2)
  +2  if zero rows AND no active DMV reads (TableReads guard)
```

Verdict thresholds:

| Score | Verdict |
|---|---|
| 0 (via ActiveCallers) | 🟢 Active — referenced by a currently running object |
| ≥ 7 | 🔴 Very likely obsolete |
| 5 – 6 | 🟠 Probably obsolete |
| 3 – 4 | 🟡 Possibly obsolete — manual check required |
| 0 – 2 | 🟢 Likely still in use |

## Known Blind Spots

Even score 10 does not mean safe to drop if any of these apply:

| Blind spot | Why SQL misses it | How to verify |
|---|---|---|
| External app reads table directly | App connections invisible to `sys.sql_expression_dependencies` | Check app source, ORM queries, connection logs |
| SSIS / SSRS / Power BI | ETL/reporting connect externally | Search `.dtsx` packages, report data sources |
| Staging / truncate-and-load target | Rows deleted after each load; zero rows is normal state | Check ETL pipelines, SQL Agent job steps |
| Linked server or cross-DB query | Cross-DB deps not tracked | Search for object name in all databases |
| Dynamic SQL | `EXEC('SELECT * FROM ' + @tbl)` invisible | Search `sys.sql_modules` for name as string |

## Key Entities

- [[DOGE WH Database Schema]]: the Framas SQL Server database this research applies to directly

## Key Concepts

- [[SQL Server DMV Usage Tracking]]: DMV details, reset behavior, persistent storage pattern
- [[SQL Server Object Dependency Tracking]]: `sys.sql_expression_dependencies` limitations, dynamic SQL workaround, four-layer scan
- [[SQL Server Object Deprecation Workflow]]: full rename → quarantine → drop procedure with code examples

## Contradictions

- Raw file recommends 2–4 week quarantine window. SQLServerCentral practitioner recommends 6–12 months. Resolution: 2–4 weeks is safe for weekly-used objects; quarterly objects need 90+ days to appear. Use the business cycle as the floor, not a fixed calendar window. (medium confidence)

## Open Questions

- Does `sys.dm_exec_procedure_stats` cover natively compiled stored procedures? Partial: the plan_handle is `0x000` for natively compiled SPs querying memory-optimized tables; execution stats may be inaccurate for sub-millisecond executions.
- What is the behavior of the scoring query against procedures called exclusively via linked server from another instance? They would not appear in local DMVs and would show zero dependencies — false positive risk. Needs verification in DOGE_WH context.
- Does the persistent storage pattern work on Azure SQL Managed Instance? tempdb creation_date is available on MI; needs validation.

## Sources

- [[mssql-obsolete-objects-detection]]: composite source — raw vault file + Microsoft Learn docs + SQLShack + SQLServerCentral (2026-06-05)
