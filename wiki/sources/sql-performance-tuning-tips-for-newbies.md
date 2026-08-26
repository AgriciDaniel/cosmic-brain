---
type: source
title: "SQL Performance Tuning tips for newbies"
source_url: "https://www.sqlshack.com/sql-performance-tuning-tips-for-newbies/"
author:
  - "[[Esat Erkec]]"
published: 2024-04-15
created: 2026-07-02
address: c-000293
tags:
  - source
  - sql-server
  - performance-tuning
status: current
related:
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[SQL Server DMV Usage Tracking]]"
  - "[[SQL Server Object Dependency Tracking]]"
---

# SQL Performance Tuning tips for newbies

Source: [sqlshack.com](https://www.sqlshack.com/sql-performance-tuning-tips-for-newbies/) | Author: [[Esat Erkec]] | Published: 2024-04-15

## Summary

A beginner-oriented tour of the SQL Server toolset for performance tuning — not query-rewriting advice, but a guide to the diagnostic and monitoring tools DBAs/devs should learn first. Covers `SET STATISTICS TIME/IO`, execution plan interpretation, staying current on new SQL Server query-tuning features, `sp_whoisactive`, Extended Events, and Query Store.

## Key Points

1. **Measure with STATISTICS TIME and STATISTICS IO.** `SET STATISTICS TIME ON` reports CPU time, elapsed time, and parse/compile time (zero parse/compile time implies a cached plan was found). `SET STATISTICS IO ON` reports scan count, logical reads (data cache), physical reads (disk), and read-ahead reads. Both should be turned off when not actively tuning — they add overhead to every subsequent query in the session.
2. **Learn to read execution plans.** Two flavors: **Estimated Execution Plan** (no execution required, no runtime stats) and **Actual Execution Plan** (post-execution, includes runtime stats and warnings). Graphical plans read top-to-bottom, right-to-left. SSMS toggles this via "Include Actual Execution Plan" in the Query menu toolbar.
3. **Track new SQL Server query-tuning features release over release** — they can produce large wins for free:
   - **Adaptive Joins** (SQL Server 2017) — join type decided at runtime based on actual row counts.
   - **Parameter Sensitivity Plan (PSP) Optimization** (SQL Server 2022) — keeps multiple cached execution plans per parameter value set, mitigating parameter sniffing.
   - **Batch Mode on Rowstore** (SQL Server 2019) — batch-mode processing without requiring a columnstore index.
4. **`sp_whoisactive`** ([amachanic/sp_whoisactive](https://github.com/amachanic/sp_whoisactive)) — third-party stored procedure for viewing currently running queries, blocked processes, and resource usage, filterable by database/user/program name.
5. **Extended Events** — lightweight tracing tool. Article walks through creating a session in SSMS's New Session Wizard: pick `sql_statement_completed`, add `client_app_name` as a captured global field, filter to a specific application, and watch live data.
6. **Query Store** (SQL Server 2016+) — captures historical query text, execution plans, runtime stats, and wait stats. Built-in reports: Regressed Queries, Overall Resource Consumption, Top Resource Consuming Queries, Queries With Forced Plans, Queries With High Variation, Query Wait Statistics, Tracked Queries.

## Notable Quotes / Details

- "The parse and compile time statistics show how much time is spent to parse and compile a query. If we see these times as zero, it indicates that the optimizer has found a cached query plan for the executed query."
- "The graphical query plans should read top to bottom and right to left."

## My Assessment

This article is a tool inventory, not a technique catalog — its unique contribution among the four SQL performance sources ingested alongside it is the SQL Server-specific *diagnostic tooling* (STATISTICS TIME/IO, `sp_whoisactive`, Extended Events, Query Store), distinct from the query-rewriting / indexing / `SELECT *` advice covered elsewhere. It complements the existing [[SQL Server DMV Usage Tracking]] page (DMVs for object usage auditing) by adding session-level and query-level diagnostic tools.

## Related

- [[SQL Server Performance Monitoring Tools]] — concept page synthesizing the toolkit from this article
- [[Query Execution Plan]] — concept page on execution plan interpretation
- [[Esat Erkec]] — author
- [[Database Indexing]], [[SQL Server DMV Usage Tracking]] — related existing database performance pages
