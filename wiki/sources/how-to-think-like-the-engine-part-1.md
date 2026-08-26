---
type: source
title: "How to Think Like the Engine, Part 1"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheEngine-Part1"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
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

# How to Think Like the Engine, Part 1

First of a 4-part live-session recording (2021-10-12) building a first-principles mental model of the SQL Server storage/execution engine. Part 1 establishes the foundational mental models used throughout the rest of the series.

## Key Points

- **8KB pages** as the fundamental unit of storage, I/O, and cache — the "office supply closet" / "pieces of paper" mental model used throughout the series.
- **Clustered index = the table itself**, sorted by the clustering key, containing all columns (except off-row LOB data for large `NVARCHAR(MAX)`-type columns).
- **Non-clustered index = a narrower "copy"/replica** of the table sorted by different column(s); always implicitly includes the clustering key so a match can be traced back to the full row.
- Nearly every SQL Server table gets a clustered primary key (contrast with the Heap-table default in other engines, see [[Database Indexing]]).
- **Index seek vs. scan — the core myth this series repeatedly corrects**: a *seek* is not inherently lightweight/fast — it only means "jump to a starting point and read from there." A *scan* is not inherently slow — it means "start at one end," which can be efficient (e.g., `SELECT TOP 10`). Demonstrated live: seeking to the year 1800 in a date-ordered index still reads the whole table if most rows are much later than 1800.

## Concept Pages Filed From This Source

- [[Query Execution Plan]] — seek/scan semantics section.
- [[Database Indexing]] — SQL Server clustered/non-clustered model section.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-engine-part-2|How to Think Like the Engine, Part 2]]
