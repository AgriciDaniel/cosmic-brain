---
type: source
title: "How to Use sp_BlitzIndex"
source: "https://www.youtube.com/watch?v=8Wo5M7kYO20"
author:
  - "[[Brent Ozar Unlimited]]"
presenter: "[[Brent Ozar]]"
published: 2016-09-11
created: 2026-07-02
tags:
  - source
  - sql-server
  - indexing
  - first-responder-kit
status: seed
related:
  - "[[sp_BlitzIndex]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[Database Indexing]]"
sibling_sources:
  - "[[how-to-use-sp-blitzcache]]"
  - "[[how-to-use-sp-blitzfirst]]"
---

# How to Use sp_BlitzIndex

**Source:** YouTube video (7 min) by Brent Ozar Unlimited, 2016-09-11

**Links:** https://www.brentozar.com/blitzindex/

## Summary

Demonstrates how to run and interpret [[sp_BlitzIndex]], the free open-source index health-check script from the First Responder Kit. Covers the full output: missing index recommendations (sourced from SQL Server's built-in DMVs), unused indexes that slow down writes, index psychological "diagnoses" (Hoarder, Workaholic, Kleptomaniac), and the `CREATE INDEX` T-SQL column with intentional placeholders requiring user decisions (ONLINE, SORT_IN_TEMPDB).

## Key Parameters

- `@GetAllDatabases = 1` — analyze every user database (stops at 50; use `@BringThePain = 1` for more).
- `@Mode = 4` — deeper analysis on all tables including smaller ones, revealing borderline duplicate indexes and indexed-view warnings.
- `@TableName = 'Posts'` — single-table drilldown via `sp_BlitzCache` for detailed index layout, missing indexes, and complete column definitions.

## Content Structure

1. **Intro** — sp_BlitzIndex as a free index health-check script; install in master or any database.
2. **Run sp_BlitzIndex** — `@GetAllDatabases = 1` output: prioritized index issues, missing indexes (sourced from DMVs), unused indexes.
3. **Index Types** — missing-index DMVs are limited (don't specify field order); use sp_BlitzCache for query-level analysis.
4. **More Info** — single-table drilldown via `EXEC sp_BlitzCache @TableName = '...'`: clustered index details, fill factor, seeks/scans, size, partitioning, compression.
5. **Create Indexes** — `CREATE TSQL` column includes placeholders (`<Online, ..., >`, `<SortInTempdb, ..., >`) forcing user review before execution.
6. **Index Output** — surface only crucial warnings on largest objects by default; `@Mode = 4` reveals detail on smaller tables.
7. **More Details** — psychological diagnosis names (Multiple Personalities, Hoarder, Workaholic, Kleptomaniac) with URL column for detailed explanations.

## Key Insight

sp_BlitzIndex surfaces SQL Server's built-in index DMV data in a prioritized, readable format — but the field order in missing-index recommendations is not guaranteed by the DMVs, so indexes should not be created blindly from the output. Always review the `CREATE TSQL` column, choose ONLINE/OFFLINE and SORT_IN_TEMPDB settings consciously, and validate with [[Database Indexing]] principles before applying.
