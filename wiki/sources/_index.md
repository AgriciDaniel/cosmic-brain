---
type: meta
title: "Sources Index"
updated: 2026-07-03
tags:
  - meta
  - index
  - source
status: evergreen
related:
  - "[[index]]"
  - "[[log]]"
  - "[[entities/_index]]"
  - "[[Andrej Karpathy]]"
---

# Sources Index

Navigation: [[index]] | [[concepts/_index|Concepts]] | [[entities/_index|Entities]]

All source pages — summaries of ingested documents, transcripts, articles, and data.

---

## Transcripts

- [[fusion-video-distributed-state-sync]] — 2026-05-25 | 2h video transcript | Fusion architecture, perf vs Redis, Voxt demo, dependency graphs
- [[fusion-video-fastest-rpc]] — 2026-05-25 | 1h video transcript | RPC design, benchmarks vs gRPC/SignalR, mesh demo
- [[blocking-and-locking-how-to-find-and-fight-concurrency-problems]] — 2026-07-02 | Brent Ozar Unlimited, 2019-01-24 | blocking vs deadlocks, lock escalation, RCSI/Snapshot Isolation
- [[how-to-think-like-the-engine-part-1]] — 2026-07-02 | Brent Ozar Unlimited, 2021-10-12 | 8KB pages, clustered/non-clustered model, seek vs scan myth
- [[how-to-think-like-the-engine-part-2]] — 2026-07-02 | Brent Ozar Unlimited, 2021-10-12 | key lookups, covering indexes, tipping point, INCLUDE vs KEY
- [[how-to-think-like-the-engine-part-3]] — 2026-07-02 | Brent Ozar Unlimited, 2021-10-12 | statistics, histograms, sargability, multi-tenant blind spot
- [[how-to-think-like-the-engine-part-4]] — 2026-07-02 | Brent Ozar Unlimited, 2021-10-12 | query bucks, optimization levels, parallelism, memory grants
- [[how-to-think-like-the-sql-server-all-demo-edition]] — 2026-07-02 | Brent Ozar Unlimited, 2020-05-16 | demo-focused cut covering same territory as the 2021 4-part series
- [[how-to-think-like-the-sql-server-engine-part-2]] — 2026-07-02 | Brent Ozar Unlimited, 2020-05-09 | earlier delivery of Engine Part 1/2 material
- [[how-to-think-like-the-sql-server-engine-part-3]] — 2026-07-02 | Brent Ozar Unlimited, 2020-05-09 | earlier delivery of Engine Part 3 statistics material
- [[watch-brent-tune-queries-sqlsaturday-oslo]] — 2026-07-02 | Brent Ozar Unlimited, 2020-08-29 | live query tuning demo; outlier data (John Skeet), clippy index failure, temp table regression, forced parallelism regression, sp_BlitzWho/sp_BlitzCache
- [[watch-brent-tune-queries-2020]] — 2026-07-02 | Brent Ozar Unlimited, 2020-01-31 | B.E. C.R.E.E.P.I. process definition, computed column auto-statistics, scalar function anti-pattern manual inlining, Plan Explorer (SentryOne)

---

## Articles

## EF Core Tooling

- [[EFCorePowerTools]] — 2026-07-03 | ErikEJ/Erik Ejlskov Jensen | GUI reverse engineering + DGML model visualization; VS 2022 extension + cross-platform CLI (`efcpt`); 2.5k stars, MIT

## EF Core Performance Series — Chris "Woody" Woodruff (2026-07-03 batch ingest)

24 articles from woodruff.dev covering EF Core performance, query optimization, bulk operations, and data modeling. All authored by [[Chris Woodruff]].

### Core Performance
- [[30-ef-core-interview-questions]] — EF Core interview questions that actually get asked in 2026
- [[5-ef-core-performance-anti-patterns-efe-eliminates]] — Five anti-patterns Entity Framework Extensions eliminates
- [[compiled-models-ef-core-performance]] — Compiled models for faster EF Core cold start
- [[ef-core-event-counters-woodruff]] — Tracking queries with EventCounters for performance diagnostics
- [[debugging-efcore-8-query-anti-patterns]] — 8 real-world EF Core query anti-patterns with V1/V2 fixes

### Query Optimization
- [[cracking-the-code-decoding-query-plans-woodruff]] — Decoding SQL query plans like a pro
- [[no-tracking-queries-ef-core-woodruff]] — No-tracking queries for read-only performance
- [[split-queries-stop-the-data-traffic-jam-in-ef-core]] — Split queries to avoid cartesian explosion
- [[global-query-filters-ef-core-woodruff]] — Global query filters for multi-tenancy and soft deletes
- [[query-tags-debugging-ef-core]] — TagWith() for query identification in logs and profiler
- [[fromsql-writing-sql-like-a-boss-in-ef-core]] — FromSqlRaw/FromSqlInterpolated for raw SQL

### Bulk Operations
- [[bulksynchronize-ef-core-woodruff]] — BulkSynchronize: insert/update/delete in one server-side MERGE
- [[ef-core-execute-update-delete-woodruff]] — ExecuteUpdateAsync/ExecuteDeleteAsync for bulk DML without loading entities
- [[ef-core-idbcontextfactory-batching]] — IDbContextFactory for high-performance parallel batch updates

### Data Modeling & Mapping
- [[ef-core-mapping-dark-magic]] — EF Core mapping internals and advanced configuration
- [[keyless-entity-types-ef-core-woodruff]] — Keyless entity types for queries without primary keys
- [[many-to-many-ef-core-woodruff]] — Many-to-many relationships in EF Core
- [[mapping-the-world-with-ef-core-spatial-data]] — Spatial data with NetTopologySuite: Point, Polygon, SRID 4326, geofencing
- [[temporal-tables-ef-core-woodruff]] — SQL Server temporal tables (system-versioned) with EF Core
- [[grouping-smarter-linq-groupby-ef-core]] — LINQ GroupBy enhancements in EF Core

### Infrastructure & Patterns
- [[dbcontext-pooling-chris-woodruff]] — DbContext pooling for >2x throughput improvement
- [[ef-core-savechanges-interception-auditing-woodruff]] — SaveChanges interception for audit logging
- [[transactional-savepoints-in-ef-core-rollback-just-what-you-need]] — Transaction savepoints for partial rollback
- [[pagination-ef-core-htmx-sortable-grids]] — Keyset vs offset pagination with htmx sortable grids

---

## Code / Stored Procedures

- [[framas-scanner-hc-bag-procs]] — 2026-06-08 | Framas Scanner fGE tenant | HANGING_HC_BAG CheckLabel + PostSingle SQL Server stored procs

---

## Product Documentation / ERP

- [[WinLine FIBU]] — 2026-06-08 | Mesonic WinLine ACC1 | financial accounting module
- [[WinLine KORE]] — 2026-06-08 | Mesonic WinLine ACC2 | cost accounting module
- [[WinLine PPS]] — 2026-06-08 | Mesonic WinLine PROD | production planning module
- [[WinLine LIST]] — 2026-06-08 | Mesonic WinLine | list/report generator
- [[WinLine ADMIN]] — 2026-06-08 | Mesonic WinLine ADMN | administration module
- [[WinLine Settings]] — 2026-06-08 | Mesonic WinLine | configuration (Parameter/Einstellungen)
- [[winline-makro12]] — 2026-06-22 | Mesonic WinLine Makros v12 | record/replay macro system, CWLMacro API, 5 launch paths
- [[winline-cwl-object-model-en]] — 2026-06-22 | Corporate WINLine Object Model EN v10.5 (MESONIC 2020) | VBScript CWL API: 8 objects, 11 classes, 9 constant groups
- [[winline-cwl-object-model-de]] — 2026-06-22 | WinLine Objektmodelle DE v12.24 (mesonic 2023) | current reference: adds CWLUser, $IMPORT, 8 new events, Tips & Tricks

---

## Papers

- [[winline-webservices]] — 2026-06-22 | Mesonic WinLine MDP-WebServices White Paper v12 (October 2023) | HTTP API layer: 10 endpoints, 25 data type codes, XML format, session management

---

## Add new sources here after each ingest.
