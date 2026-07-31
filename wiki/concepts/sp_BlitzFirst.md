---
type: concept
title: "sp_BlitzFirst"
concept_type: tool
status: seed
related:
  - "[[First Responder Kit]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[SQL Server Wait Statistics]]"
  - "[[sp_BlitzCache]]"
  - "[[sp_BlitzIndex]]"
  - "[[SQL Server Performance Monitoring Tools]]"
tags:
  - concept
  - sql-server
  - wait-statistics
  - first-responder-kit
  - performance-tuning
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[how-to-use-sp-blitzfirst]]"
---

# sp_BlitzFirst

Member of the [[First Responder Kit]] — the free open-source SQL Server diagnostic toolkit by [[Brent Ozar Unlimited]].

## Purpose

`sp_BlitzFirst` captures and analyzes real-time [[SQL Server Wait Statistics]] to diagnose what the SQL Server instance is waiting on right now. It queries the `sys.dm_os_waiting_tasks` DMV and aggregates wait types into prioritized findings, telling you whether the bottleneck is CPU, IO, locking, or something else.

## What It Does

- Captures a snapshot of current wait statistics across all active sessions.
- Groups waits by type and priority to identify the dominant bottleneck.
- Returns a prioritized list of findings with severity levels and recommended actions.
- Can also be used historically: after running `sp_BlitzFirst @OutputDatabaseName = 'DBName'`, it stores snapshots over time for trend analysis.

## Typical Findings

| Finding | Meaning |
|---------|---------|
| High PAGEIOLATCH_* waits | Storage subsystem is the bottleneck — slow disk IO |
| High LCK_* waits | Locking/blocking contention |
| High CXPACKET waits | Query parallelism issues (skewed parallel distribution) |
| High SOS_SCHEDULER_YIELD | CPU pressure — queries yielding because others need CPU time |
| High WRITELOG waits | Transaction log write bottleneck |

## Relationship to Other Blitz Tools

- **[[sp_BlitzCache]]** — finds the specific bad queries; sp_BlitzFirst finds the system-level bottleneck.
- **[[sp_BlitzIndex]]** — finds index problems causing IO waits that sp_BlitzFirst identifies.
- Together they form the "ABC" of First Responder Kit triage: **Index → Cache → First**.
