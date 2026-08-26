---
type: concept
title: "sp_BlitzCache"
concept_type: tool
status: seed
related:
  - "[[First Responder Kit]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[Parameter Sniffing]]"
  - "[[sp_BlitzIndex]]"
  - "[[sp_BlitzFirst]]"
  - "[[SQL Server Performance Monitoring Tools]]"
tags:
  - concept
  - sql-server
  - plan-cache
  - first-responder-kit
  - performance-tuning
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[how-to-use-sp-blitzcache]]"
  - "[[Identifying-and-Fixing-Parameter-Sniffing-Issues]]"
---

# sp_BlitzCache

Member of the [[First Responder Kit]] — the free open-source SQL Server diagnostic toolkit by [[Brent Ozar Unlimited]].

## Purpose

`sp_BlitzCache` examines the most resource-intensive queries in SQL Server's plan cache and returns a prioritized "sucker board" — the worst-performing queries in the environment. It provides analysis and warnings on each query, including detection of [[Parameter Sniffing]].

## Key Features

- **Sucker board leaderboard** — lists the most resource-intensive queries in descending order of impact.
- **Warning analysis** — automatically flags queries that show classic diagnostic signs: "Victim of Parameter Sniffing," implicit conversions, index scans on large tables, etc.
- **Surgical plan removal** — output includes a `Remove Query from Plan Cache` command, enabling a targeted "strike" that frees a single cached plan without affecting other queries or requiring a full plan-cache flush.
- **Plan saving** — can save the current (bad) plan before removing it for later forensic analysis.

## Parameter Sniffing Emergency Response

When a sudden performance degradation occurs and parameter sniffing is suspected (a query that "sometimes runs fast, sometimes runs slow" for the same input), the recommended workflow is:

1. Run `sp_BlitzCache` on the stressed server to find the victim query.
2. Look for the "Probably a Victim of Parameter Sniffing" warning.
3. Save the current execution plan (which may be the bad one).
4. Run the `Remove Query from Plan Cache` command to free that one plan.
5. Allow the next execution to compile a fresh plan based on the current parameter values.

This is explicitly "not fixing anything, just trying to get the users to put down the guns so you can do better troubleshooting later."

## Related Tools

- **[[sp_BlitzIndex]]** — index health analysis; when sp_BlitzCache finds a slow query, sp_BlitzIndex shows the index landscape for its tables.
- **[[sp_BlitzFirst]]** — wait-statistics analysis to find what the server is waiting on.
- **[[Parameter Sniffing]]** — the primary bug sp_BlitzCache is designed to identify.
