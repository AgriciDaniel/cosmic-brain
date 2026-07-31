---
type: concept
title: "sp_BlitzIndex"
concept_type: tool
status: seed
related:
  - "[[First Responder Kit]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[Database Indexing]]"
  - "[[sp_BlitzCache]]"
  - "[[SQL Server Performance Monitoring Tools]]"
tags:
  - concept
  - sql-server
  - indexing
  - first-responder-kit
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[How-to-Use-sp_BlitzIndex]]"
---

# sp_BlitzIndex

Member of the [[First Responder Kit]] — the free open-source SQL Server diagnostic toolkit by [[Brent Ozar Unlimited]].

## Purpose

`sp_BlitzIndex` analyzes the health of indexes across all user databases in a SQL Server instance. It surfaces the same data available in SQL Server's built-in index DMVs (`sys.dm_db_missing_index_details`, `sys.dm_db_index_usage_stats`) in a prioritized, readable format with actionable output.

## Key Parameters

| Parameter | Effect |
|-----------|--------|
| `@GetAllDatabases = 1` | Analyze all user databases on the instance (stops at 50; use `@BringThePain = 1` for more) |
| `@Mode = 4` | Deep analysis including smaller tables; reveals borderline duplicate indexes and indexed-view warnings |
| `@TableName = 'Posts'` | Single-table drilldown; passes to `[[sp_BlitzCache]]` for detailed index layout, missing indexes, full column definitions |

## Output Types

1. **Missing indexes** — sourced from `sys.dm_db_missing_index_details`. Limited: the DMV does not specify field order within the index; the DBA must determine correct column ordering.
2. **Unused indexes** — indexes that only slow down INSERT/UPDATE/DELETE operations with no query benefit.
3. **Index psychological diagnoses** — named patterns: "Multiple Personalities" (borderline duplicate indexes), "Hoarder" (too many indexes on one table), "Workaholic" (overused index), "Kleptomaniac" (index stealing from another).
4. **CREATE TSQL column** — provides the `CREATE INDEX` command with intentional placeholders (`<Online, ..., >`, `<SortInTempdb, ..., >`) that force the DBA to consciously choose settings before executing.

## Surface Level

By default, only surfaces warnings on the largest objects. Use `@Mode = 4` or single-table drilldown to see warnings on smaller tables.

## Usage Pattern

```sql
-- Full instance scan
EXEC sp_BlitzIndex @GetAllDatabases = 1;

-- Deep scan with mode 4
EXEC sp_BlitzIndex @GetAllDatabases = 1, @Mode = 4;

-- Single table drilldown to sp_BlitzCache
EXEC sp_BlitzCache @TableName = 'Users';
```

## Related Tools

- **[[sp_BlitzCache]]** — query plan cache analysis; complementary to sp_BlitzIndex (find the queries that need those missing indexes).
- **[[sp_BlitzFirst]]** — wait-statistics-based performance analysis.
- **[[Database Indexing]]** — foundational principles for understanding sp_BlitzIndex output.
