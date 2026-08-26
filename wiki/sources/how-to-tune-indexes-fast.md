---
type: source
title: "How to Tune Indexes Fast"
source_url: "https://www.youtube.com/watch?v=DRb3b3oDmt0"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-05-19
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - indexing
  - sp_blitzindex
status: processed
related:
  - "[[sp_BlitzIndex]]"
  - "[[Index Tuning DEATH Method]]"
  - "[[Database Indexing]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Tune Indexes Fast

Live-demo session showing how to use [[sp_BlitzIndex]] to rapidly triage index health on an existing production database.

## Key Points

- **The DEATH method** (see [[Index Tuning DEATH Method]]): Dedup/Eliminate redundant indexes, Add desperately-needed missing indexes, Tune existing indexes, Heaps get clustered indexes last — a fixed prioritization order for where to spend limited tuning time first.
- `sp_BlitzIndex @GetAllDatabases = 1` surveys every database on the instance in one pass; `@BringThePain = 1` is required to run it against instances with more than 50 databases (a deliberate friction point, not a bug).
- `@Mode = 4` surfaces deeper warnings on small tables that the default mode skips (small tables are usually ignored because they rarely matter for performance, but occasionally hide a real problem).
- Playful-but-real warning categories: "multiple personalities" (many indexes with overlapping leading columns), "hoarder" (excess non-clustered indexes vs. table size), "kleptomaniac" (indexes stealing more write overhead than their read benefit justifies) — each maps to a specific, actionable dedup/tune decision.
- `@AI = 2` returns a copy-pasteable prompt summarizing the flagged index problem for use with any external LLM tool, working on any SQL Server version; `@AI = 1` calls an LLM directly but is restricted to SQL Server 2025+/Azure SQL DB.

## Concept Pages Filed From This Source

- [[Index Tuning DEATH Method]] — new concept page for the DEDUP/ADD/TUNE/HEAPS prioritization framework.
- [[sp_BlitzIndex]] — new entity page for the tool itself.

## Related

- [[Brent Ozar Unlimited]]
- [[sp_BlitzIndex]]
- [[Index Tuning DEATH Method]]
- [[Database Indexing]]
