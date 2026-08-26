---
type: concept
title: "SQL Server Object Deprecation Workflow"
created: 2026-06-05
updated: 2026-06-05
tags:
  - mssql
  - sql-server
  - database-maintenance
  - schema-management
status: developing
related:
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Dependency Tracking]]"
  - "[[DOGE WH Database Schema]]"
  - "[[Database Schema and Performance]]"
sources:
  - "[[mssql-obsolete-objects-detection]]"
---

# SQL Server Object Deprecation Workflow

The safe pattern for removing suspected obsolete objects from SQL Server. Never drop immediately — the cost of a false positive (dropped object still in use) is an outage.

## The Core Rule

> Rename → quarantine → monitor → verify → drop.

Never drop immediately. Dropping is irreversible. Renaming or schema-moving is reversible in seconds.

## Step 1: Identify Candidates

Run the multi-signal scoring query (see [[SQL Server DMV Usage Tracking]] and [[SQL Server Object Dependency Tracking]]). Focus on `ObsoleteScore ≥ 5`.

High-confidence candidates have ALL of:
- Not in execution cache (or zero executions)
- No inbound dependencies in `sys.sql_expression_dependencies`
- Not modified in 1+ years
- Zero rows (for tables)
- Not found in `sys.sql_modules` LIKE search
- Not found in SQL Agent job steps

## Step 2: Cross-Reference External References

`sys.sql_expression_dependencies` misses dynamic SQL and external callers. Before marking as deprecated, also check:

- Application source code (PowerShell grep or source control search)
- SSIS packages (search `.dtsx` files)
- Linked server queries
- ETL configuration tables
- Reporting tool connection strings

## Step 3: Mark as Deprecated (Optional)

Use Extended Properties to create a self-documenting deprecation marker:

```sql
EXEC sp_addextendedproperty
    @name = N'Deprecated',
    @value = N'2026-06-05 — no callers found, score 7, marked for drop 2026-09-05',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'PROCEDURE', @level1name = N'usp_OldReport';
```

A DDL trigger can read this property and fire a warning if anyone calls a deprecated object, creating a visible signal during the quarantine window.

## Step 4: Quarantine (Rename or Schema Move)

**Option A — Prefix rename:**
```sql
EXEC sp_rename 'dbo.usp_OldReport', '_DEPRECATED_20260605_usp_OldReport';
```

**Option B — Schema move:**
```sql
-- Create quarantine schema if not exists
CREATE SCHEMA deprecated;
ALTER SCHEMA deprecated TRANSFER dbo.usp_OldReport;
```

Schema move is cleaner for large batches (all deprecated objects in one place). Rename prefix is simpler for one-offs.

> [!warning] Renaming or moving an object breaks non-schema-bound references silently. Any caller will get "invalid object name" at runtime, not at parse time. This is the signal you want to catch during quarantine.

## Step 5: Monitor During Quarantine

Set a quarantine window: **2–4 weeks minimum** for objects used at least weekly. For monthly or quarterly jobs, wait at least one full business cycle (30–90 days).

During quarantine:
- Watch application error logs for "Invalid object name" errors
- Set up SQL Server Audit on the renamed/moved object to capture any access attempts
- Check SQL Agent job failure logs

## Step 6: Drop

After the quarantine window with no errors:

1. Script the object to a `.sql` file and commit to source control
2. Drop:
```sql
DROP PROCEDURE deprecated._DEPRECATED_20260605_usp_OldReport;
-- or
DROP TABLE deprecated._DEPRECATED_20260605_OldTable;
```

Script first. Even after dropping, you want recovery capability.

## Security Note

Unused stored procedures are a security risk — they provide data access paths that may be unmonitored. Removing confirmed dead code reduces attack surface. (Source: [[mssql-obsolete-objects-detection]])

## Tooling

- **Redgate SQL Search** (free SSMS add-in): cross-database text search across all object definitions
- **ApexSQL Search** (paid): search + safe rename with dependency preview
- **SSDT Refactor menu**: rename with automatic reference updating in the DACPAC project
