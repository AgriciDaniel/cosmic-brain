---
type: concept
title: "SQL Server Object Dependency Tracking"
created: 2026-06-05
updated: 2026-06-05
tags:
  - mssql
  - sql-server
  - dependency-tracking
  - database-maintenance
status: developing
related:
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Deprecation Workflow]]"
  - "[[DOGE WH Database Schema]]"
sources:
  - "[[mssql-obsolete-objects-detection]]"
---

# SQL Server Object Dependency Tracking

SQL Server provides several catalog views for tracking which objects reference which other objects. These are necessary but insufficient for proving an object is safe to drop.

## Primary View: sys.sql_expression_dependencies

Contains one row per by-name dependency between persisted entities. A dependency is recorded when one entity appears by name in the SQL definition of another.

```sql
-- Find objects with NO inbound dependencies (nothing references them)
SELECT o.name, o.type_desc, o.create_date, o.modify_date
FROM sys.objects o
WHERE o.type IN ('P', 'V', 'U') AND o.is_ms_shipped = 0
  AND o.object_id NOT IN (
      SELECT DISTINCT referenced_id
      FROM sys.sql_expression_dependencies
      WHERE referenced_id IS NOT NULL
  );
```

Requires: `VIEW DEFINITION` + `SELECT` on `sys.sql_expression_dependencies`. Members of `db_owner` have this by default.

## What It Tracks

Tracks referencing ↔ referenced relationships for: tables, views, filtered indexes, T-SQL stored procs, T-SQL UDFs, T-SQL DML/DDL triggers.

Also captures: cross-database and cross-server references (entity names only, IDs not resolved).

## Critical Limitations

### 1. Dynamic SQL — Not Tracked

References inside `EXEC()` or `sp_executesql` strings are invisible to this view. A procedure that calls `EXEC('SELECT * FROM ' + @table)` shows no dependency on that table.

**Workaround**: search `sys.sql_modules` for the object name string:

```sql
SELECT OBJECT_NAME(object_id), definition
FROM sys.sql_modules
WHERE definition LIKE '%TargetObjectName%';
```

For large databases, build a full-text index on `sys.sql_modules` for fast searches.

### 2. Caller-Dependent References

When `referenced_id` is NULL and `is_caller_dependent = 1`, the dependency exists but can't be resolved at parse time (depends on the schema of whoever executes the proc). This is common with unqualified `EXEC ProcName` calls.

### 3. Not Tracked At All

- Rules and defaults
- Temporary tables and temporary stored procedures
- System objects
- CLR triggers (neither as referencing nor referenced)
- Numbered stored procedures with integer suffix > 1

### 4. `referenced_database_name` Contains Non-Databases

This column can hold CTE aliases and query aliases — not just actual database names. Do not assume every non-NULL value here is a real cross-database reference.

### 5. Schema-Bound vs Non-Schema-Bound

For non-schema-bound references, `referenced_id` can be NULL if the entity doesn't exist in the database. An object "not referenced" might just have unresolvable references pointing at it.

## sys.dm_sql_referenced_entities

For column-level dependencies on non-schema-bound objects, use `sys.dm_sql_referenced_entities` (DMV, not catalog view). More expensive but more complete.

## Deprecated: sys.sql_dependencies

The old `sys.sql_dependencies` catalog view is deprecated and should not be used. Use `sys.sql_expression_dependencies` instead.

## The Four-Layer Dependency Scan

To reliably determine if an object is referenced, check all four layers:

| Layer | Method |
|---|---|
| SQL-SQL dependencies | `sys.sql_expression_dependencies` |
| Dynamic SQL bodies | `sys.sql_modules LIKE` search |
| SQL Agent jobs | `msdb.dbo.sysjobsteps.command LIKE` |
| External references | Source code search, SSIS, linked servers, application config |

An object passing all four layers with no hits is a strong candidate for deprecation. (Source: [[mssql-obsolete-objects-detection]])
