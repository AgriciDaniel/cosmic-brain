---
type: source
title: "How to Think Like the SQL Server: All-Demo Edition"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheSQLServer-AllDemo"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-16
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - execution-plans
  - indexing
  - statistics
status: processed
related:
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the SQL Server: All-Demo Edition

Demo-focused cut of a 2020-05-16 live session, covering the same core material as the 2021 4-part "How to Think Like the Engine" series (8KB pages, clustered/non-clustered indexes, seek vs. scan, key lookups, tipping point, statistics, query cost, parallelism, memory grants), but recorded roughly 18 months earlier and structured as a single long session rather than 4 parts. Treated as a duplicate coverage source for the purposes of concept-page consolidation — no distinct new concept pages were created from it; instead it was used to validate/reinforce the same points already captured from the 2021 series (see [[Query Execution Plan]], [[Database Indexing]], [[SQL Server Statistics and Cardinality Estimation]]).

## Key Points (matching / reinforcing the 2021 series)

- 8KB pages as the fundamental storage/cache unit.
- Clustered index = the table; non-clustered index = narrower sorted replica including the clustering key.
- Seek ≠ fast, scan ≠ slow — same year-1800 seek demo used to illustrate this.
- Key lookup executes once per matching row.
- Tipping point driven by estimated row count from statistics, demonstrated at a similarly low threshold.
- `DBCC SHOW_STATISTICS`, sampling, sargability-breaking functions.
- Estimated Subtree Cost, Cost Threshold for Parallelism, memory grants and tempdb spills.
- SQL Server never caches query results, only data pages.

## Notable Cross-Link / Overlap Finding

This source and "How to Think Like the SQL Server Engine Part 2/3" (also 2020, different date: 2020-05-09) are **not** the same recording as the 2021 4-part "How to Think Like the Engine" series, despite near-identical titles and near-total content overlap. All three appear to be separate deliveries of the same evolving talk. No contradictions were found between them — treated as reinforcing, not conflicting, sources.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-sql-server-engine-part-2|How to Think Like the SQL Server Engine, Part 2]]
- [[how-to-think-like-the-sql-server-engine-part-3|How to Think Like the SQL Server Engine, Part 3]]
- [[how-to-think-like-the-engine-part-1|How to Think Like the Engine, Part 1]] through [[how-to-think-like-the-engine-part-4|Part 4]]
