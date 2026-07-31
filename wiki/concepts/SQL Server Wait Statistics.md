---
type: concept
title: "SQL Server Wait Statistics"
concept_type: sql-server-framework
status: seed
related:
  - "[[sp_BlitzFirst]]"
  - "[[First Responder Kit]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[sp_BlitzCache]]"
tags:
  - concept
  - sql-server
  - wait-statistics
  - performance
  - diagnostics
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[how-to-use-sp-blitzfirst]]"
  - "[[how-to-use-sp-blitzcache]]"
---

# SQL Server Wait Statistics

## What Are Wait Statistics?

SQL Server tracks what each thread is waiting on while processing queries. These "waits" are aggregated by type in the DMV `sys.dm_os_wait_stats` and provide the highest-level diagnostic signal for SQL Server performance problems: "SQL Server is slow because it is waiting on X."

The principle: **a query is only as fast as its slowest wait**. If a query spends 95% of its time waiting for disk reads, optimizing its CPU usage by 50% will only improve total time by ~2.5%.

## Common Wait Types

| Wait Type Category | Example Waits | Meaning |
|-------------------|--------------|---------|
| IO | `PAGEIOLATCH_*`, `WRITELOG` | Storage subsystem bottleneck — disk reads/writes are slow |
| Locking/Blocking | `LCK_*` | Contention — one session holds a lock another needs |
| CPU/Scheduling | `SOS_SCHEDULER_YIELD`, `THREADPOOL` | CPU pressure — threads yielding or waiting for worker threads |
| Parallelism | `CXPACKET`, `CXCONSUMER` | Skewed parallel query distribution — one thread finishes far behind the rest |
| Memory | `RESOURCE_SEMAPHORE` | Memory grant waiting — queries waiting for memory to execute |
| Network | `ASYNC_NETWORK_IO` | Client not consuming results fast enough |

## How to Diagnose

1. Run `[[sp_BlitzFirst]]` for real-time wait analysis — it prioritizes waits by type and severity.
2. Check cumulative waits via `sys.dm_os_wait_stats` (resets on service restart).
3. Look for waits that constitute >10-20% of total wait time for the top 3-5 types.
4. Drill from the dominant wait type to the specific queries causing it via `sys.dm_exec_requests` or Query Store.

## Limitations

- **Restart resets** — `sys.dm_os_wait_stats` clears when SQL Server restarts; trend analysis requires periodic capture to a permanent table.
- **Not query-specific** — wait stats are instance-wide, not per-query. A high `PAGEIOLATCH` could be caused by one bad query or by the entire workload.
- **Signal vs. wait** — total wait time includes both "signal wait time" (time waiting for CPU) and "resource wait time" (time waiting for IO/locks/memory). High signal wait = CPU bottleneck.

## Relationship to First Responder Kit

- **[[sp_BlitzFirst]]** — purpose-built tool for wait-statistics-driven triage; uses `sys.dm_os_waiting_tasks` for real-time analysis.
- **[[sp_BlitzCache]]** — complements wait stats by finding the specific queries causing the waits.
- **[[sp_BlitzIndex]]** — index problems manifest as IO waits that sp_BlitzFirst surfaces.
