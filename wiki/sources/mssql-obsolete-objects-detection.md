---
type: source
title: "MSSQL Obsolete Object Detection"
created: 2026-06-05
updated: 2026-06-05
hash: facfedb0b1d677946ea1ff9b6b1f2e1c
source_type: composite
sources:
  - "https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-procedure-stats-transact-sql"
  - "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-sql-expression-dependencies-transact-sql"
  - "https://www.sqlshack.com/cleaning-up-old-code-and-unused-objects-in-sql-server/"
  - "https://www.sqlservercentral.com/blogs/tracking-table-usage-and-identifying-unused-objects"
  - "raw/mssql/mssql-obsolete-objects.md"
confidence: high
tags:
  - mssql
  - sql-server
  - database-maintenance
  - dmv
related:
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Dependency Tracking]]"
  - "[[SQL Server Object Deprecation Workflow]]"
  - "[[DOGE WH Database Schema]]"
---

# Source: MSSQL Obsolete Object Detection

Composite source from raw file + web research on 2026-06-05. Covers all five detection methods and the safe removal workflow for SQL Server stored procedures, views, and tables.

## What This Source Covers

- `sys.dm_exec_procedure_stats`: column reference, caveats, reset behavior
- `sys.sql_expression_dependencies`: what it tracks, critical limitations
- Persistent DMV storage pattern (survive restarts)
- Extended Events for granular usage tracking
- SQL Server Audit for persistent per-object access logging
- Extended Properties for marking objects deprecated
- Safe removal workflow: rename → quarantine → audit → drop
- **ActiveCallers CTE**: force score to 0 if any referencing object has confirmed execution history
- **TableReads CTE**: suppress zero-row bonus if table has active DMV reads (staging table guard)
- **ObsoleteVerdict / ScoreReason** output columns: human-readable verdict + signal breakdown
- Known blind spots table: 5 categories SQL alone cannot detect

## Key Claims

- DMV stats reset on every SQL Server restart (confirmed: Microsoft Learn docs)
- `sys.dm_exec_procedure_stats` only reflects **cached** plans — plan eviction also removes the row (high confidence)
- `sys.sql_expression_dependencies` does not track dynamic SQL references (high confidence)
- Persistent storage pattern uses tempdb creation_date to detect restarts (medium confidence)
- Extended Events `module_end` / `rpc_starting` are the recommended events for SP tracking (high confidence)
- SQL Server Audit persists across restarts; DMVs do not (high confidence)
- **ActiveCallers rule**: if B references A and B has execution history, A's score is forced to 0 regardless of A's own stats — "called by something running" = not obsolete (high confidence, from raw file v2)
- **TableReads guard**: a table with zero rows but active DMV reads (seeks/scans/lookups > 0) is likely a staging/truncate-and-load target; zero-row +2 suppressed (high confidence, from raw file v2)
- Max ObsoleteScore = 10 (not 8 as in prior version); verdict thresholds: ≥7 🔴, 5–6 🟠, 3–4 🟡, 0–2 🟢

## Source Quality

Microsoft Learn docs: authoritative, dated 2024-04-18 (procedure_stats) and 2025-02-28 (expression_dependencies). SQLShack and SQLServerCentral: practitioner blogs, medium confidence. Raw vault file: practitioner-authored SQL reference.
