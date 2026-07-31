---
type: source
title: "How to Tune Queries Fast"
source_url: "https://www.youtube.com/watch?v=YbamaLlbh7I"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-05-26
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - query-tuning
  - sp_blitzcache
status: processed
related:
  - "[[sp_BlitzCache]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Wait Statistics]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Tune Queries Fast

Live-demo session showing the end-to-end fast-triage workflow for finding and fixing the server's worst queries, built around [[sp_BlitzCache]].

## Key Points

- **Workflow**: start with server-wide wait stats (see [[SQL Server Wait Statistics]]) to find the *category* of bottleneck (CPU, I/O, locking), then use [[sp_BlitzCache]] to find the specific top resource-intensive queries, then read the execution plan for the worst offender.
- **The 10x rule**: reading a plan right-to-left/top-to-bottom, the fix point is the first operator where actual rows diverge from estimated rows by roughly 10x or more — that operator is where the optimizer's assumptions broke down, and typically where the real fix (statistics, index, or query rewrite) belongs.
- **Avoid hints as a first move**: forcing a hint locks in a plan shape that becomes brittle as data changes; prefer fixing the underlying estimate accuracy (matches the existing [[SQL Server Query Hints]] guidance already in the wiki).
- **`SET STATISTICS IO ON`**: tune for **logical reads** (pages read from cache — deterministic, comparable run-to-run), not physical reads (disk reads — depends on unpredictable cache state).
- **`ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS ON`** (SQL Server 2019+): captures last-actual-execution runtime stats into cached plans without having to re-run a slow query just to get its actual plan.
- **`sp_BlitzCache @SortOrder`**: cpu / reads / duration / executions / xpm (executions per minute) / memory grant / recent compilations — each sort order surfaces a different bottleneck shape.
- **`@ExpertMode = 1`**: pre-populates `DBCC FREEPROCCACHE(plan_handle)` for each returned query, enabling surgical single-plan eviction — critical for live parameter-sniffing incidents (see [[Parameter Sniffing]]) where you want to evict exactly one bad cached plan, not the whole server's plan cache.
- **`@AI = 2`**: returns a copy-pasteable prompt for external LLM-assisted tuning, works on any SQL Server version (vs. `@AI = 1`, direct LLM call, SQL Server 2025+/Azure SQL DB only).

## Concept Pages Filed From This Source

- [[SQL Server Wait Statistics]] — new concept page for the wait-type taxonomy used as the first triage step.
- [[sp_BlitzCache]] — new entity page for the tool.
- Extended [[Query Execution Plan]] with the 10x actual-vs-estimated fix-point rule.

## Related

- [[Brent Ozar Unlimited]]
- [[sp_BlitzCache]]
- [[SQL Server Wait Statistics]]
- [[Parameter Sniffing]]
- [[Query Execution Plan]]
