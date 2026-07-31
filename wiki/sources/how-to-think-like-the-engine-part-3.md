---
type: source
title: "How to Think Like the Engine, Part 3"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheEngine-Part3"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - statistics
  - cardinality-estimation
  - sargability
status: processed
related:
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the Engine, Part 3

Third of the 4-part 2021-10-12 live-session series. Focuses on statistics, cardinality estimation, and sargability.

## Key Points

- **Statistics & histograms**: `DBCC SHOW_STATISTICS` shows up to 201 buckets per statistic object (one 8KB page of metadata); auto-created with the same name as the index it backs; used by the optimizer to estimate row counts *before* execution (no re-planning once a query starts running).
- **Sampling** on large tables behaves like political polling — a sample, not a full count, drives the histogram.
- **Sargability**: applying a function to a column (`YEAR()`, `MONTH()`, `CAST(date)`) breaks the optimizer's ability to use accurate statistics/seeks even when the predicate is logically equivalent to a plain range condition — dramatically different plans and costs for semantically identical queries.
- **Multi-tenant / client_id statistics blind spot**: SQL Server will not correlate a filtering column (e.g., `client_id`) with a second dimension's (e.g., time) data distribution — it assumes uniform distribution across all tenants, which can produce badly wrong estimates for large tenants.

## Concept Pages Filed From This Source

- [[SQL Server Statistics and Cardinality Estimation]] — new concept page for histogram/sampling/sargability/tipping-point material.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-engine-part-2|How to Think Like the Engine, Part 2]]
- [[how-to-think-like-the-engine-part-4|How to Think Like the Engine, Part 4]]
