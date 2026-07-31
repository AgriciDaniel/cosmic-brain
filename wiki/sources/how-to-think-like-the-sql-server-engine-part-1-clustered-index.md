---
type: source
title: "How to Think Like the SQL Server Engine, Part 1: The Clustered Index"
source_url: "https://www.youtube.com/watch?v=ACzguQ-AT-c"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2017-11-18
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - clustered-index
  - execution-plans
status: processed
related:
  - "[[SQL Server Clustered Index Internals]]"
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the SQL Server Engine, Part 1: The Clustered Index

Standalone 2017-11-18 recording (distinct from the 2020 two-part and 2021 four-part re-recordings of similar material already in the wiki — see [[Brent Ozar Unlimited]] for the full recording inventory). Builds the first-principles mental model of pages, clustered indexes, and how the optimizer chooses between key-lookup and full-scan plans.

## Key Points

- **8KB pages** are the fundamental storage/I/O unit; clustered index leaf pages store full rows sorted by clustering key; large `varchar(max)`/`nvarchar(max)` values overflow off-row into separate LOB pages.
- **Key Lookup pattern**: a non-clustered index seek finds matching rows, then jumps into the clustered index once per row to fetch columns not covered by the non-clustered index. Cheap when few rows match.
- **Tipping point**: once a query's key-lookup count reaches roughly 5% of the table's total pages, SQL Server abandons the seek+lookup plan and does a full clustered-index scan instead — it's cheaper to touch every page once than to bounce between indexes touching some pages dozens of times ("SQL Server doesn't like inappropriate touching").
- **Sort cost economics**: `ORDER BY` can be 10x-100x more expensive than the scan/filter that precedes it. Sorting is real work (in-memory or spilled to tempdb); pushing sort to the application tier is a legitimate cost-avoidance move, reinforced by the economic argument that SQL Server Enterprise licensing runs ~$7,000/core — CPU spent sorting is expensive CPU.
- Demonstrated with a live example: seeking to a very old/rare date value still triggers a scan-based plan if SQL Server's statistics indicate most matching rows are scattered across most of the table.

## Concept Pages Filed From This Source

- [[SQL Server Clustered Index Internals]] — new concept page: pages, LOB storage, Key Lookup pattern, tipping point, sort-cost economics.
- [[Query Execution Plan]] — cross-linked for plan-reading conventions already documented there.

## Related

- [[Brent Ozar Unlimited]]
- [[How to Think Like the SQL Server Engine, Part 3: Statistics and Memory Grants]]
- [[SQL Server Clustered Index Internals]]
