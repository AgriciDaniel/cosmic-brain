---
type: source
title: "How to Think Like the SQL Server Engine, Part 3: Statistics and Memory Grants"
source_url: "https://www.youtube.com/watch?v=9GPwJ0eVBGk"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2017-11-18
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - statistics
  - memory-grants
status: processed
related:
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the SQL Server Engine, Part 3: Statistics and Memory Grants

Standalone 2017-11-18 recording, continuing from Part 1 (same series, distinct from the 2020/2021 re-recordings covering similar statistics/sargability territory — see [[Brent Ozar Unlimited]]). This session is the only one in the wiki that covers **memory grants** in depth alongside statistics.

## Key Points

- **Statistics**: auto-created per index (same name as the index), plus system-created `WA_*` statistics on frequently-filtered non-indexed columns. `DBCC SHOW_STATISTICS` returns three result sets: header (rows, last-updated, step count), density (which fields the stat covers), and histogram (up to 200 buckets).
- **Update threshold**: statistics auto-update at roughly 20% row-modification, but SQL Server counts *modifications*, not *distinct rows changed* — updating the same row a million times counts as a million modifications.
- **Ascending Stats Problem**: on a table with a constantly-increasing date/ID column, newly inserted rows are invisible to the histogram until stats refresh (which may not happen for a long time on a large, slow-growing table). Improved in SQL Server 2014+ but not eliminated. Data warehouses loading daily need proactive stats maintenance; Stack Overflow-scale write-heavy tables may need daily stats updates.
- **Selective-field-first rule**: for composite indexes/statistics, put the most selective column first so the histogram captures the most useful distribution — but only among columns actually present in the query's WHERE clause; selectivity never overrides the requirement to match the query shape.
- **Memory grants**: fixed at plan-compile time based on estimated row counts; does not grow during execution. SQL Server needs RAM for three things: caching raw data pages (not query results, unlike some other engines), caching execution plans, and query workspace (joins, sorts).
- **Spills to tempdb**: if the actual row count vastly exceeds the estimate, the query's granted memory is insufficient and the excess working set spills to tempdb ("the public toilet of SQL Server" — also used for RCSI, index sorts, temp tables/variables, and Availability Group statistics capture). Visible as a yellow warning bang on execution plan operators (SSMS 2012+). Mitigation: fix the underlying statistics/estimate problem, or put tempdb on local SSD as a stopgap.
- View memory grant info via the actual (not estimated) execution plan's SELECT operator properties.

## Concept Pages Filed From This Source

- [[SQL Server Statistics and Cardinality Estimation]] — new concept page covering histogram mechanics, `WA_*` stats, Ascending Stats Problem, selective-field-first rule, and memory grants/spills.

## Related

- [[Brent Ozar Unlimited]]
- [[How to Think Like the SQL Server Engine, Part 1: The Clustered Index]]
- [[Query Execution Plan]]
