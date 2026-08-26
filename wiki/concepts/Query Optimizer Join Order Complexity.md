---
type: concept
title: "Query Optimizer Join Order Complexity"
created: 2026-07-02
updated: 2026-07-02
address: c-000283
tags:
  - sql-server
  - concept
  - query-optimization
  - joins
status: developing
domain: database
complexity: advanced
related:
  - "[[SQL OR Predicate Anti-Pattern]]"
  - "[[Database Indexing]]"
sources:
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
aliases:
  - "high table count"
  - "left-deep tree query"
  - "bushy tree query"
  - "join order combinatorics"
---

# Query Optimizer Join Order Complexity

Every table added to a query multiplies the number of candidate execution plans the optimizer must consider — join order, join type (nested loop/merge/hash), and when to apply filters/aggregation all interact. The optimizer has to find a "good enough" plan within a strict time budget, so more tables means more work and a higher risk of a suboptimal plan slipping through, even though the optimizer is generally good at pruning bad branches early.

## Two Shapes of Join Tree

- **Left-Deep Tree**: `A join B, (A join B) join C, ... join E` — tables joined sequentially, one after another. The more naturally ordered shape; fewer candidate plans.
- **Bushy Tree**: `A join B, A join C, B join D, C join E` — joins branch into multiple logical sub-units that combine later. More candidate plans for the same table count.

## The Combinatorics

For *n* tables:
- Left-deep tree: up to `n!` candidate plans
- Bushy tree: up to `(2n-2)! / (n-1)!` candidate plans

**Worked example (12 tables, from the source article's AdventureWorks query joining Product, ProductSubCategory, ProductCategory, two UnitMeasure aliases, ProductModel, ProductModelIllustration, ProductModelProductDescriptionCulture, ProductDescription, ProductReview, ProductVendor):**

- Left-deep: `12! = 479,001,600` possible plans
- Bushy: `(2·12-1)!/(12-1)! = 28,158,588,057,600` possible plans

The optimizer eliminates most of this space quickly by discarding entire sub-optimal branches, but the odds of finding a great plan (versus merely an adequate one) decline as table count grows. This is not an argument against many-table queries in general — it's a signal to watch when triaging a specific poorly-performing query.

## Mitigation Strategies

- **Stage lookup/metadata tables into a temp table first**, then join against the smaller staged result instead of the original table.
- **Convert single-constant joins to a parameter/variable** — if a join only exists to pull back one constant value, it doesn't need to be a join at all.
- **Split a large query into smaller queries**, joining intermediate results via `#temp` tables. Requires that no data changes between the split queries would invalidate the combined result — if atomicity matters, wrap in appropriate isolation levels/transactions/locking.
- **Indexed views** for heavily-reused, mostly-constant data accessed by many queries.
- **Remove unneeded tables, subqueries, and joins** outright — the simplest and often most effective fix.

### Worked Split Example

The 12-table AdventureWorks query above can be reduced by first staging `Product` + `ProductSubCategory` + `ProductCategory` into a `#Product` temp table (ordered/filtered as needed), then joining the remaining tables (`ProductModel`, `ProductReview`, `ProductVendor`, `UnitMeasure`) against `#Product` in a second, simpler query. This trades one 12-table query for two smaller ones (fewer combinatorial candidates each) plus the incidental benefit of an opportunity to prune unused columns/tables during the split.

## Relationship to Other Concepts

- An `OR`-spanning-tables predicate ([[SQL OR Predicate Anti-Pattern]]) effectively forces the optimizer to reconcile multiple logical join paths per row, compounding this complexity on top of the plain table-count combinatorics.
- [[Database Indexing]]'s JOIN section (index both join directions so the optimizer can pick the best driving table) becomes more important, not less, as table count rises — the optimizer has fewer good options to work with if any join direction lacks a supporting index.
