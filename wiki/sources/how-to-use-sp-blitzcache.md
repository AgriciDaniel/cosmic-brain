---
type: source
title: "How to Use sp_BlitzCache"
source_url: "https://www.youtube.com/watch?v=EkLuXURMwso"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2016-09-11
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - sp_blitzcache
  - plan-cache
status: processed
related:
  - "[[sp_BlitzCache]]"
  - "[[First Responder Kit]]"
  - "[[Parameter Sniffing]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Use sp_BlitzCache

Reference/demo session for [[sp_BlitzCache]], the top-resource-intensive-query finder from the [[First Responder Kit]]. Foundational tool referenced again in "How to Tune Queries Fast" and "Identifying and Fixing Parameter Sniffing Issues."

## Key Points

- Reads SQL Server's plan cache and ranks queries by resource consumption. `@SortOrder` options: cpu, reads, duration, executions, xpm (executions per minute), memory grant, recent compilations.
- `@ExpertMode = 1` adds extra columns per query, including a ready-to-run `DBCC FREEPROCCACHE(plan_handle)` statement for evicting exactly that one cached plan — the key technique for surgical parameter-sniffing triage (see [[Parameter Sniffing]]) without a full plan-cache flush.
- `@ExportToExcel = 1` for offline analysis/reporting.
- `@OutputDatabaseName` / `@OutputSchemaName` / `@OutputTableName` persist results to a table, enabling trend capture over time (complementary to Query Store, which persists automatically once enabled — `sp_BlitzCache` capture is opt-in and point-in-time).
- `@AI = 2` returns a copy-pasteable AI-tuning prompt (any SQL Server version); `@AI = 1` calls an LLM directly (SQL Server 2025+/Azure SQL DB only).

## Concept Pages Filed From This Source

- [[sp_BlitzCache]] — new entity page.

## Related

- [[Brent Ozar Unlimited]]
- [[First Responder Kit]]
- [[sp_BlitzCache]]
- [[Parameter Sniffing]]
- [[how-to-tune-queries-fast|How to Tune Queries Fast]]
