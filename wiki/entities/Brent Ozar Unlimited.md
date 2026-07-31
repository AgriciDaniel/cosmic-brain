---
type: entity
title: "Brent Ozar Unlimited"
entity_type: organization
created: 2026-07-02
updated: 2026-07-02
tags:
  - entity
  - organization
  - sql-server
  - training
status: developing
related:
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[SQL Server Query Tuning Methodology]]"
sources:
  - "[[blocking-and-locking-how-to-find-and-fight-concurrency-problems]]"
  - "[[how-to-think-like-the-engine-part-1]]"
  - "[[how-to-think-like-the-engine-part-2]]"
  - "[[how-to-think-like-the-engine-part-3]]"
  - "[[how-to-think-like-the-engine-part-4]]"
  - "[[how-to-think-like-the-sql-server-all-demo-edition]]"
  - "[[how-to-think-like-the-sql-server-engine-part-2]]"
  - "[[how-to-think-like-the-sql-server-engine-part-3]]"
  - "[[watch-brent-tune-queries-sqlsaturday-oslo]]"
  - "[[watch-brent-tune-queries-2020]]"
  - "[[How-to-Use-sp_BlitzIndex]]"
  - "[[Identifying-and-Fixing-Parameter-Sniffing-Issues]]"
  - "[[how-to-use-sp-blitzcache]]"
  - "[[how-to-use-sp-blitzfirst]]"
  - "[[sql-query-optimization-why-is-it-so-hard-to-get-right]]"
  - "[[brent-ozar-mssql-performance-tuning-live]]"
aliases:
  - "Brent Ozar"
  - "BrentOzar.com"
---

# Brent Ozar Unlimited

SQL Server performance-tuning training and consulting company founded by **Brent Ozar** (Microsoft Certified Master, SQL Server MVP). Publishes free YouTube training sessions ("How to Think Like the [SQL Server] Engine" series, "Blocking and Locking" talks) that build a first-principles mental model of the SQL Server query optimizer, storage engine, and concurrency control system, then sells a progression of paid classes for deeper practice.

## Recurring Instructors / Contributors Referenced

- **Brent Ozar** — primary presenter across all 8 ingested sources; MCM, SQL Server MVP.
- **Erik Darling** — coined "racing stripes" for parallelism icons in execution plans; referenced across the Engine series.
- **Kendra Little** — MCM, Redgate; coined "query bucks"/"query cents" for Estimated Subtree Cost.
- **Adam Machanic** — author of `sp_whoisactive`, referenced as the standard live-activity diagnostic tool.
- **Michael J. Swart** — referenced for blog research on optimal batch sizing for large ETL/bulk operations.
- **Richie Rump** — author of `statisticsparser.com`, a free web tool for clean grid visualization of SET STATISTICS IO output.
- **Solomon Rutzky** — author of the DMV query (hosted at brentozar.com/go/progress) for tracking index creation progress with percent complete and estimated time remaining.
- **David DeWitt** — Microsoft Certified Master, former SQL Server team member, pioneer of cost-based query optimization; contributed the "SQL Query Optimization: Why Is It So Hard to Get Right?" benefit webcast for the Robert Davis Memorial Fund (2018).

## Training Catalog (referenced as "next steps" across sources)

A tiered Fundamentals → Mastering structure:
- Fundamentals of Index Tuning / Mastering Index Tuning
- Fundamentals of Query Tuning / Mastering Query Tuning
- Fundamentals of Server Tuning

## Open-Source Tooling: First Responder Kit

MIT-licensed, on GitHub at [BrentOzarULTD/SQL-Server-First-Responder-Kit](https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit). Referenced tools (see [[First Responder Kit]] for full catalog):

- **sp_BlitzIndex** — inventories indexes, sizes, and row counts per table; used repeatedly across the Engine series demos to show current index shape before/after tuning.
- **sp_BlitzCache** — returns the top 10 most resource-intensive queries from the plan cache, filterable by stored procedure name, plan hash, or query hash; detects parameter sniffing victims.
- **sp_BlitzFirst** — real-time wait-statistics analysis via `sys.dm_os_waiting_tasks`; identifies IO/CPU/lock bottlenecks.
- **sp_BlitzWho** — live execution plans for currently running queries (uses sys.dm_exec_query_statistics_xml).
- **sp_Blitz** — server-wide health check; basic sanity checks (CPU cores enabled, tempdb configuration, etc.).
- **sp_BlitzQueryStore** — Query Store analysis.
- **sp_BlitzLock** — deadlock analysis.
- **sp_BlitzBackups** — backup health check.

## Content Produced (ingested in this batch)

Seven distinct session series plus two tool-specific videos covering overlapping material (see [[Query Execution Plan]] for technical consolidation):

0. **First Responder Kit tool videos** — three short (7-10 min) how-to demos:
   - **"How to Use sp_BlitzIndex"** (2016-09-11) — index health check: missing indexes, unused indexes, "psychological diagnoses" (Hoarder, Workaholic, Kleptomaniac). See [[sp_BlitzIndex]].
   - **"How to Use sp_BlitzCache"** (2016-09-11) — plan cache analysis: sucker board, parameter sniffing detection, surgical plan removal. See [[sp_BlitzCache]].
   - **"How to Use sp_BlitzFirst"** (2016-09-11) — wait-statistics real-time triage. See [[sp_BlitzFirst]].
1. **"Identifying and Fixing Parameter Sniffing Issues"** (2019-01-05, SQLDay Poland 2017) — live session by Brent Ozar: teaches the four-layer understanding of parameter sniffing (what it is, emergency response, testing pitfalls, long-term fixes). See [[Parameter Sniffing]].
2. **"SQL Query Optimization: Why is it so hard to get right?"** (2018-06-29) — benefit webcast by **David DeWitt** (Microsoft Research, MIT): deep-dive on query optimizer internals — histograms, dynamic programming, plan space explosion, the fragility problem, and cloud-native feedback loops.
3. **"Microsoft SQL Server Performance Tuning, Live"** (2019-01-05) — live tuning session.
4. **"Blocking and Locking: How to Find and Fight Concurrency Problems"** (2019-01-24) — standalone talk on locking/blocking/isolation levels.
5. **"Watch Brent Tune Queries"** — live-tuning demo series, two sessions ingested:
   - **SQLSaturday Oslo** (2020-08-29) — ~60 min; demonstrates the non-linear reality of tuning (three attempted fixes, mostly failed). Introduces sp_BlitzWho, sp_BlitzCache, statisticsparser.com.
   - **2020 edition** (2020-01-31) — ~50 min; demonstrates the full B.E. C.R.E.E.P.I. process applied in order. Covers computed-column auto-statistics, scalar function manual inlining, and Plan Explorer (SentryOne). See [[SQL Server Query Tuning Methodology]] for the consolidated process.
6. **"How to Think Like the [SQL Server] Engine"** — recorded at least twice:
   - 2020-05-09 session, released as "How to Think Like the SQL Server Engine Part 2" and "...Part 3" (a Part 1 was referenced but not included in this ingestion batch).
   - 2020-05-16 session, released as "How to Think Like the SQL Server All-Demo Edition" (appears to be a demo-focused cut of the same live series).
   - 2021-10-12 session, released as a 4-part series: "How to Think Like the Engine Part 1-4" — the most complete/current version of the material, re-recorded ~18 months after the 2020 sessions with substantially the same demos and teaching points (seek vs. scan, key lookups, tipping point, statistics, query cost, memory grants, parallelism).

> [!note] The 2020 two-part session and the 2020 All-Demo Edition are NOT the same recording as the 2021 four-part series, despite nearly identical titles and content — see [[Query Execution Plan]] for how this was handled during consolidation.

## Related

- [[First Responder Kit]] — catalog page for the full open-source toolkit
- [[sp_BlitzIndex]] — index health analysis tool
- [[sp_BlitzCache]] — plan cache analysis and parameter sniffing detection
- [[sp_BlitzFirst]] — wait-statistics real-time triage
- [[Parameter Sniffing]] — the phenomenon that sp_BlitzCache is designed to detect
- [[SQL Server Query Tuning Methodology]] — the B.E. C.R.E.E.P.I. process distilled from the Watch Brent Tune Queries series
- [[SQL Server Wait Statistics]] — framework sp_BlitzFirst uses for triage
- [[Query Execution Plan]] — primary concept page consolidating the Engine series' execution-plan material
- [[SQL Server Statistics and Cardinality Estimation]] — statistics/histogram/tipping-point material
- [[SQL Server Locking, Blocking, and Concurrency Control]] — from the Blocking and Locking talk
- [[Database Indexing]] — SQL Server clustered/non-clustered index model additions
- [[SQL Server Performance Monitoring Tools]] — sp_whoisactive cross-reference (Adam Machanic)
- [[SQL Server Query Hints]] — NOLOCK cross-reference
