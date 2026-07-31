---
type: source
title: "7 SQL Query Performance Tuning Tips - Optimize Database Queries"
created: 2026-07-02
address: c-000279
status: ingested
source: "https://www.klipfolio.com/blog/7-sql-query-performance-tuning-tips"
author: "Jonathan Milne"
published: 2026-04-11
pages_created:
  - "wiki/sources/sql-query-performance-tuning-tips.md"
pages_updated:
  - "wiki/concepts/SQL Query Optimization.md"
  - "wiki/concepts/Database Schema and Performance.md"
  - "wiki/concepts/_index.md"
  - "wiki/sources/_index.md"
related:
  - "[[SQL Query Optimization]]"
  - "[[Database Indexing]]"
  - "[[Database Schema and Performance]]"
  - "[[Database Index Advanced Techniques]]"
tags:
  - source
  - database
  - sql
  - performance
---

# 7 SQL Query Performance Tuning Tips - Optimize Database Queries

**Source:** Klipfolio blog, published 2026-04-11, author Jonathan Milne
**Scope:** Short listicle aimed at analysts/developers who query production databases for reporting; light on internals, focused on habits and query-writing anti-patterns to avoid.

## Summary

A practitioner-level checklist for tuning SQL queries, framed around protecting production database resources rather than deep engine internals. Two threads run through the piece: (1) query-writing anti-patterns to avoid, and (2) process/governance habits around when and how queries get run against live production data.

### Process: requirements before writing the query

Before writing a query against a production database, the article recommends:
- Identify relevant stakeholders, including the DBA team for production queries.
- Answer the 5 W's (Who/Why/What/When/Where) to scope requirements.
- Make requirements specific — ambiguous requirements against production data are "too risky."

### Indexing: balance, not extremes

"Index everything" and "index nothing" are both framed as failure modes. No indexes → slow reads and load on the database. Too many indexes → insert/update triggers degrade. The article doesn't give a rule for finding the balance point (see [[Database Indexing]] for the actual mechanics: four golden rules, write overhead per index, cost model).

### Anti-pattern: `SELECT *`

Fetching all columns burdens the database unnecessarily once a table has many fields/rows, even though it "works" on small tables. Fix: name only the needed columns in the SELECT list.

```sql
-- Inefficient
SELECT * FROM Users
-- Efficient
SELECT LastName, Address, Contact FROM Users
```

### Temp tables: use only when necessary

Temp tables add complexity to a query. Recommendation: avoid them if the logic can be expressed as a single query; reserve them as intermediaries for stored procedures that genuinely can't be handled in one query.

### Anti-pattern: `COUNT()` for existence checks

Using `COUNT()` to check "does a record exist" forces a full scan/count of all matching rows. `EXISTS()` short-circuits on the first match, which the article frames as strictly better for existence checks.

### Anti-pattern: leading wildcard in `LIKE`

```sql
-- Can't use an index — leading % forces a full table scan
SELECT* FROM Customers WHERE address LIKE '%bar%';
-- Can use an index — anchored prefix
SELECT* FROM Customers WHERE address LIKE 'bar%';
```

This matches the mechanical explanation already in [[Database Indexing]] (`LIKE 'x%'` converts to a range scan; `LIKE '%x%'` cannot use a B-Tree index at all).

### Anti-pattern: `SELECT DISTINCT`

The article's specific claim: `SELECT DISTINCT` is expensive because it groups all selected fields to compute distinctness, and (per the article) this "makes it highly inaccurate." Its recommended fix is to add more fields to the SELECT list so no grouping/dedup step is needed at all — treating DISTINCT as something to design around rather than use.

> [!contradiction] Nuance on `SELECT DISTINCT`
> This blanket "avoid DISTINCT, just add more columns" advice is weaker than the pattern already documented in [[Database Schema and Performance]], which uses `SELECT DISTINCT ON (col)` (PostgreSQL) and `ROW_NUMBER() OVER (PARTITION BY ...)` as precise, intentional dedup tools — not something to avoid but something to use correctly. The Klipfolio article's "inaccurate" claim about DISTINCT is also imprecise: DISTINCT is exact, not approximate; the real cost is the sort/hash step needed to find duplicates across all selected columns. Widening the SELECT list to dodge DISTINCT can silently change result semantics (more granular rows survive) rather than truly "fixing" anything — it should be treated as a query-shape change, not a pure performance fix.

### Bonus: schedule expensive queries for off-peak hours

Recommends running the following during off-peak (article suggests 3-5am): looping statements, `SELECT *` on tables >1M rows, nested subqueries, wildcard searches, CROSS JOINs, `SELECT DISTINCT` statements. General framing: protect the production DB from concurrent-user contention by time-shifting the heaviest query shapes.

## Key facts

- Author: Jonathan Milne, published on Klipfolio's blog (a BI/dashboard vendor) 2026-04-11.
- Core thesis: query tuning is as much a governance/habits discipline (know your requirements, schedule around peak load) as an engine-mechanics discipline.
- Six concrete anti-patterns named: unindexed/over-indexed schemas, `SELECT *`, unnecessary temp tables, `COUNT()` instead of `EXISTS()`, leading-wildcard `LIKE`, `SELECT DISTINCT`.
- Article is promotional in part (links to Klipfolio PowerMetrics dashboard and a "create a SQL dashboard" post) — treat performance claims as directional, not benchmarked.

## Cross-references

These six patterns recur (with more technical depth) across the other SQL-tuning sources ingested alongside this one from `.raw/notes/2026-07-02/`: `SELECT *`/temp tables/`COUNT()` vs `EXISTS()`/`DISTINCT` on [[SQL Query Optimization]] § Cross-Cutting Techniques, leading-wildcard `LIKE` on [[SQL Server Wildcard Search Optimization]], and indexing balance on [[Database Indexing]].
