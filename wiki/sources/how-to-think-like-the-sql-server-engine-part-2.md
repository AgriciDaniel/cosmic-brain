---
type: source
title: "How to Think Like the SQL Server Engine, Part 2"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheSQLServerEngine-Part2"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-09
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - execution-plans
  - indexing
status: processed
related:
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the SQL Server Engine, Part 2

Part 2 of a 2020-05-09 live session (companion to a Part 1 not included in this ingestion batch, and to "...Part 3" below). Covers the same territory as [[How to Think Like the Engine, Part 1]] and [[How to Think Like the Engine, Part 2]] from the later 2021 series: 8KB pages, clustered/non-clustered index model, seek vs. scan, key lookups, covering indexes, tipping point.

Content is materially duplicate of the 2021 series — no new concept pages created from this source specifically; it reinforces and cross-validates [[Query Execution Plan]] and [[Database Indexing]].

## Key Points

- Same seek-vs-scan myth-busting (seek is not "fast," scan is not "slow") demonstrated with a comparable date-range seek example.
- Key lookup cost model: once per matching row, not once total.
- Tipping point behavior and its dependence on statistics-driven row-count estimates rather than actual data.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-sql-server-engine-part-3|How to Think Like the SQL Server Engine, Part 3]]
- [[how-to-think-like-the-sql-server-all-demo-edition|How to Think Like the SQL Server All-Demo Edition]]
