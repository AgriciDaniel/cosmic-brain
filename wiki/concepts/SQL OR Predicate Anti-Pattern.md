---
type: concept
title: "SQL OR Predicate Anti-Pattern"
created: 2026-07-02
updated: 2026-07-02
address: c-000284
tags:
  - sql-server
  - concept
  - query-optimization
  - anti-pattern
status: developing
domain: database
complexity: intermediate
related:
  - "[[Database Indexing]]"
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[SQL Server Query Hints]]"
sources:
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
aliases:
  - "OR predicate performance"
  - "OR across multiple columns"
---

# SQL OR Predicate Anti-Pattern

`AND` is exclusive: each filter progressively narrows the result set, and SQL Server can chain index seeks. `OR` is inclusive: SQL Server cannot process it as a single index operation, so each branch of the `OR` must be evaluated independently and the partial results concatenated. This gets exponentially worse when the `OR` branches span **different columns or different tables**, because the engine must independently follow each branch through the rest of the query's joins and filters.

## The Failure Mode

```sql
SELECT DISTINCT PRODUCT.ProductID, PRODUCT.Name
FROM Production.Product PRODUCT
INNER JOIN Sales.SalesOrderDetail DETAIL
  ON PRODUCT.ProductID = DETAIL.ProductID
  OR PRODUCT.rowguid = DETAIL.rowguid;
```

Against a 504-row table joined to a 121,317-row table, this produced **1.2 million reads** and ~2 seconds of execution time — more reads than the combined row count of both tables, because the optimizer effectively re-evaluates the join once per `OR` branch and reconciles.

## The Fix: Decompose into UNION

```sql
SELECT PRODUCT.ProductID, PRODUCT.Name
FROM Production.Product PRODUCT
INNER JOIN Sales.SalesOrderDetail DETAIL ON PRODUCT.ProductID = DETAIL.ProductID
UNION
SELECT PRODUCT.ProductID, PRODUCT.Name
FROM Production.Product PRODUCT
INNER JOIN Sales.SalesOrderDetail DETAIL ON PRODUCT.rowguid = DETAIL.rowguid;
```

Each branch becomes its own simple join that can use a normal index seek; `UNION` (not `UNION ALL`) recombines and de-duplicates. Result: reads dropped from 1.2M to **750**, runtime dropped to well under a second — despite querying each table twice instead of once and producing a visually more complex execution plan.

## Diagnostic Signal

If you're investigating a poorly performing query and see an `OR` spanning multiple columns or multiple tables in a `JOIN`/`WHERE` predicate, treat that as a high-probability root cause before digging into DMVs, traces, or extended events. This is one of the fastest pattern-matches available for triage.

## When It's Cheaper Than the Fix

Splitting a query into a `UNION` of simpler queries is not free — it usually means scanning source tables more than once and a larger, uglier execution plan. Always measure (reads + duration), don't assume the rewrite wins; on small tables or with only one `OR` branch, the original form may already be fine.

## Relationship to Other Concepts

- Same underlying cause as inequality (`!=`) breaking index seeks in [[Database Indexing]] — both defeat the funnel/one-direction-scan model because the matching rows aren't contiguous in any single sorted index.
- Multiplies with [[Query Optimizer Join Order Complexity]]: an `OR`-based join is effectively evaluated as multiple logical join paths, which the optimizer must reconcile alongside its normal join-order search.
