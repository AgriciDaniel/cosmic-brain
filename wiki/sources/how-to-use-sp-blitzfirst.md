---
type: source
title: "How to Use sp_BlitzFirst"
source_url: "https://www.youtube.com/watch?v=pQcdbbmTqX4"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2016-09-11
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - sp_blitzfirst
  - wait-statistics
status: processed
related:
  - "[[sp_BlitzFirst]]"
  - "[[SQL Server Wait Statistics]]"
  - "[[First Responder Kit]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Use sp_BlitzFirst

Demo/reference session for [[sp_BlitzFirst]], the "what's wrong with my server right now" diagnostic from the [[First Responder Kit]].

## Key Points

- **Two operating modes**:
  - `@SinceStartup = 1` — cumulative wait-stats and file-stats since the SQL Server instance last started. Ideal uptime sample window: roughly 1 week to 2 months (too short and the sample is noisy; too long and old patterns dilute recent problems).
  - `@ExpertMode = 1` — a live 5-second DMV snapshot: currently running queries, wait stats accumulated during that specific 5-second window, file read/write stats, and a full PerfMon counter delta report.
- Results can be logged to a table via a SQL Agent job running `sp_BlitzFirst` on a schedule, giving lightweight historical trending without the overhead of Extended Events or Query Store.
- Complements (does not replace) the existing [[SQL Server Performance Monitoring Tools]] toolkit — `sp_BlitzFirst` is the fastest single command to answer "what category of problem am I dealing with," before reaching for `sp_whoisactive`, Extended Events, or Query Store for deeper investigation.

## Concept Pages Filed From This Source

- [[SQL Server Wait Statistics]] — new concept page; `sp_BlitzFirst` is the primary tool for surfacing this data.
- [[sp_BlitzFirst]] — new entity page.

## Related

- [[Brent Ozar Unlimited]]
- [[First Responder Kit]]
- [[sp_BlitzFirst]]
- [[SQL Server Wait Statistics]]
- [[SQL Server Performance Monitoring Tools]]
