---
type: source
title: "How to Think Like the SQL Server Engine, Part 3"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheSQLServerEngine-Part3"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-09
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - statistics
  - sargability
status: processed
related:
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the SQL Server Engine, Part 3

Part 3 of the 2020-05-09 live session (continues from "...Part 2" above). Covers statistics, cardinality estimation, and sargability — matching the territory of [[How to Think Like the Engine, Part 3]] from the later 2021 series.

Ends on a cliffhanger referencing an upcoming comparison of `CAST(date)` vs. plain range-predicate execution plans — this follow-up was not included in the ingested batch (no Part 4 file exists for this 2020 series; the 2021 series' [[How to Think Like the Engine, Part 4]] covers different material — cost/parallelism/memory grants — not the CAST-vs-range comparison, so this specific demo appears to not be represented in the wiki yet).

## Key Points

- `DBCC SHOW_STATISTICS`, histogram buckets, auto-created statistics objects.
- Sampling on large tables.
- Sargability: functions on columns (`YEAR()`, `CAST()`) defeat accurate statistics-based estimation even when logically equivalent to a range predicate.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-sql-server-engine-part-2|How to Think Like the SQL Server Engine, Part 2]]
- [[how-to-think-like-the-sql-server-all-demo-edition|How to Think Like the SQL Server All-Demo Edition]]
