---
type: source
title: "How to Think Like the Engine, Part 4"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheEngine-Part4"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - query-cost
  - parallelism
  - memory-grants
status: processed
related:
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the Engine, Part 4

Fourth and final part of the 2021-10-12 live-session series. Covers query cost estimation, optimization levels, parallelism, and memory grants.

## Key Points

- **Estimated Subtree Cost ("query bucks" / "query cents")** — term coined by Kendra Little (MCM, Redgate). Historically tied to CPU/IO benchmarks on a specific old Dell desktop; now a unitless heuristic, not meaningful for comparing actual real-world performance — only useful *pre-execution* for the optimizer's own plan selection.
- **Trivial vs. Full optimization**: SQL Server skips full cost-based optimization for trivially simple plans (single table, no choices to make).
- **Cost Threshold for Parallelism** — default 5 query bucks; plans estimated above this threshold become eligible for a parallel plan. Parallelism icons in the graphical plan are nicknamed "racing stripes" (Erik Darling).
- **Memory Grants**: SQL Server pre-allocates memory (in KB) for sort/hash operations *before* query execution, based on estimates. Wrong estimates cause spills to tempdb — the "public toilet" analogy (reused later for row-versioning/RCSI's tempdb usage too).
- **SQL Server never caches query results**, only data pages — demonstrated via `GO 10` / `GO 50` / `GO 100` batch re-execution showing full CPU rework every single time, even for read-only, unchanged data. Framed against licensing cost: SQL Server Enterprise Edition (~$7,000/core) vs. Oracle Enterprise (~$47,000/core, which does cache result sets) — SQL Server's cheaper licensing trades away result caching, so sorting/expensive operators should be pushed to the app tier where possible.
- `DBCC FREEPROCCACHE` — clears cached execution plans (demo-only tool, not for production use).

## Concept Pages Filed From This Source

- [[Query Execution Plan]] — cost/query-bucks, optimization levels, parallelism, memory grants sections.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-engine-part-3|How to Think Like the Engine, Part 3]]
