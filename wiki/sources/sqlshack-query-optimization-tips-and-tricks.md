---
type: source
title: "Query optimization techniques in SQL Server: tips and tricks"
created: 2026-07-02
updated: 2026-07-02
address: c-000280
source_type: article
sources:
  - https://www.sqlshack.com/query-optimization-techniques-in-sql-server-tips-and-tricks/
raw_path: ".raw/notes/2026-07-02/Query optimization techniques in SQL Server tips and tricks.md"
author:
  - "[[Ed Pollack]]"
published: 2018-06-19
confidence: high
tags:
  - sql-server
  - query-optimization
  - performance-tuning
  - clippings
related:
  - "[[SQL OR Predicate Anti-Pattern]]"
  - "[[SQL Server Wildcard Search Optimization]]"
  - "[[SQL Server Large Write Operation Contention]]"
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[SQL Server Query Hints]]"
  - "[[Database Indexing]]"
  - "[[Ed Pollack]]"
---

# Source: Query optimization techniques in SQL Server: tips and tricks

Second article in Ed Pollack's SQLShack series on SQL Server query optimization (2018-06-19). Presents six easy-to-spot query design patterns that reliably cause poor performance, each demonstrated with reads/execution-time measurements against the AdventureWorks sample database. The premise: pattern recognition on common mistakes can short-circuit hours of trace/DMV/execution-plan investigation.

## What This Source Covers

1. **`OR` across multiple columns/tables** — SQL Server cannot use a single index seek for an inclusive `OR`; each branch is evaluated independently. Demonstrated example: a 2-table join on `ProductID OR rowguid` did 1.2M reads (more than the full content of both tables) and took ~2 seconds; rewriting as two single-predicate `SELECT`s combined with `UNION` cut reads to 750 and runtime to well under a second. See [[SQL OR Predicate Anti-Pattern]].
2. **Wildcard string searches** — a leading `%` (`LIKE '%For%'`) defeats B-Tree index usage in both directions, forcing a full scan. Mitigations ranked by cost: reconsider the requirement, pre-filter with other predicates, convert to a trailing-only wildcard (`'For%'`), Full-Text Indexing, or a hand-rolled n-gram table. See [[SQL Server Wildcard Search Optimization]].
3. **Large write operations** — bulk INSERT/UPDATE/DELETE lock large amounts of data for the duration (blocking constraint checks, index maintenance, triggers) and grow the transaction log. "Large" is context-dependent (50K-1M rows on an unconstrained table; ~2K rows on a heavily triggered/constrained one) — must be tested, not assumed. Reduce batch size when writing to busy production tables outside a maintenance window. See [[SQL Server Large Write Operation Contention]].
4. **Missing indexes** — SQL Server's missing-index DMVs/execution-plan hints are a starting point, not a mandate. Before adding a suggested index: check for a similar existing index that could be modified, question whether every INCLUDE column is needed, weigh the reported percent-improvement against query frequency, and confirm the optimizer isn't simply declining to use an index that already exists. Two contrasting real examples from the article: a 19%-improvement index recommendation judged not worth the write overhead vs. a 93%-improvement recommendation on an unindexed column judged clearly worth adding. Companion anti-patterns: over-indexing (every extra index taxes every write), under-indexing (few/no non-clustered indexes on a table that's read-heavy), and missing clustered index/primary key (top-priority fix — clustered indexes beat heaps and PKs feed the optimizer's decision-making).
5. **High table count** — each joined table multiplies the optimizer's search space combinatorially: a left-deep-tree query of *n* tables has up to `n!` candidate plans, a bushy-tree query up to `(2n-2)!/(n-1)!`. Worked example: 12 tables → ~479M plans (left-deep) or ~28.2 trillion plans (bushy). Mitigations: stage lookup/metadata tables into temp tables, convert single-row joins to parameters, split one large query into smaller ones joined via `#temp` tables, use indexed views for heavily-reused constant data, and prune unused joins. See [[Query Optimizer Join Order Complexity]].
6. **Query hints** — a hint is a directive, not a suggestion; it bypasses optimizer heuristics and can rot as data/schema evolve. Covers `NOLOCK` (dirty reads), `RECOMPILE` (new plan every execution — good for rare/ad hoc queries, bad for hot-path ones; often a bandage for stale stats or parameter sniffing), join hints `MERGE`/`HASH`/`LOOP` (forcing a join type also locks the join order, removing optimizer flexibility — demonstrated as *worse* than the optimizer's chosen `NESTED LOOP` on a simple 2-table query), and `OPTIMIZE FOR` (pins the plan to one parameter value; fragile to business-logic change). Rule of thumb: hints are a scalpel for documented last resorts, not a first response. See [[SQL Server Query Hints]].

## Key Data Points

| Scenario | Before | After |
|---|---|---|
| `OR` across ProductID/rowguid join | 1.2M reads, ~2s | 750 reads, <1s (UNION rewrite) |
| Missing-index rec. #1 (`Status, SalesPersonID` + INCLUDE) | — | 19% improvement (judged marginal) |
| Missing-index rec. #2 (`FirstName` + INCLUDE) | — | 93% improvement (judged worth adding) |
| 12-table query, left-deep join | — | 12! = 479,001,600 candidate plans |
| 12-table query, bushy join | — | (2·12-1)!/(12-1)! = 28,158,588,057,600 candidate plans |

## Notable Quotes / Rules of Thumb

- "SQL Server cannot easily process an OR condition across multiple columns."
- "Without use of additional features or design considerations, SQL Server is not good at fuzzy string searching."
- "All tables should have a clustered index and a primary key."
- "Each table added to a query increases its complexity by a factorial amount."
- "The general rule of thumb is to apply query hints as infrequently as possible, only after sufficient research has been conducted."

## Series Context

Part 2 of 4 in Ed Pollack's SQLShack series: "the basics" -> **"tips and tricks" (this article)** -> "Database Design and Architecture" -> "Parameter Sniffing". Only this installment has been ingested into the vault as of 2026-07-02; the other three are referenced only by title/URL in the table of contents and are not yet sourced.

## Cross-References

Ingested alongside three other general SQL query-tuning articles from the same `.raw/notes/2026-07-02/` batch (7 SQL Query Performance Tuning Tips, SQL Performance Tuning tips for newbies, SQL Query Optimization: 18 Proven Techniques and Tips) — see those sources for overlapping coverage of indexing basics, `SELECT *` avoidance, and execution-plan reading. This article is the most SQL-Server-specific and technically deep of the four (concrete reads/plan-count numbers, DMV usage, hint mechanics).

This vault already has [[Database Indexing]], [[Database Index Advanced Techniques]], and [[Database Schema and Performance]] from a separate, engine-agnostic (MySQL/PostgreSQL) indexing source (Nguyễn Thế Huy's ebook). This article's missing-index section overlaps in spirit but is SQL-Server-DMV-specific; cross-linked rather than merged.
