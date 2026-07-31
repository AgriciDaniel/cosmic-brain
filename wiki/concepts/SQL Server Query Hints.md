---
type: concept
title: "SQL Server Query Hints"
created: 2026-07-02
updated: 2026-07-02
address: c-000288
tags:
  - sql-server
  - concept
  - query-optimization
  - query-hints
status: developing
domain: database
complexity: intermediate
related:
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[Database Indexing]]"
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
sources:
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
aliases:
  - "NOLOCK"
  - "query hints SQL Server"
  - "join hints"
  - "OPTIMIZE FOR"
---

# SQL Server Query Hints

A query hint is an explicit directive from the developer to the query optimizer that bypasses its normal decision-making rules. Despite the name, it functions as a *directive*, not a suggestion — the optimizer must comply. Hints can fix an immediate performance problem, but they carry real long-term risk:

- Schema/data changes can make a hint obsolete or actively harmful, and it silently stays in place until someone notices and removes it.
- Hints can mask the actual root cause (a missing index, an oversized data request, broken business logic) — treating the symptom instead of the disease.
- Hints can introduce unexpected/incorrect behavior (e.g. `NOLOCK` dirty reads).
- A hint tuned for one edge case can degrade performance for every other scenario that hits the same query.

**Rule of thumb**: apply hints as infrequently as possible, only after sufficient research, only when you're confident there's no downside — and document the reasoning thoroughly, because nobody will remember why the hint is there in three years.

## Common Hints

### NOLOCK

Tells SQL Server to read the last known value even if the row is currently locked — a "dirty read." Because some values in the result set may be old and some may be new, the data can be internally inconsistent. Never use where data quality/correctness matters. See [[SQL Server Locking, Blocking, and Concurrency Control]] for the underlying locking model this hint bypasses, and for the safer optimistic alternatives (RCSI, Snapshot Isolation).

### RECOMPILE

Forces a new execution plan to be generated on every execution of the query, discarding plan cache reuse. Appropriate for infrequent reports/ad hoc processes where avoiding a stale/bad cached plan matters more than the (non-trivial) cost of re-optimizing. Inappropriate for hot-path queries executed often — the optimization cost repeats every time. Commonly used as a bandage for stale statistics or parameter sniffing rather than fixing the underlying cause.

### Join Hints: MERGE / HASH / LOOP

Forces the optimizer to use a specific physical join algorithm. High risk: the truly optimal join type shifts as data volume, schema, and parameter values change over time, so a forced join type becomes technical debt that persists as long as the hint does. **Critically, forcing a join type also forces the join order** — the optimizer loses the ability to reorder tables, which removes one of its main levers for finding a good plan.

**Demonstrated in the source article**: on a simple 2-table query (`HumanResources.Employee` joined to `Person.Person`, filtered on `FirstName LIKE 'E%'`), forcing `INNER MERGE JOIN` and separately `INNER HASH JOIN` both produced *worse*, uglier execution plans (extra sort operators for the merge join; an enforced join order warning for the hash join) than simply letting the optimizer choose its default `NESTED LOOP JOIN`.

### OPTIMIZE FOR

Pins the query's plan to behave as if a specified parameter value were passed, regardless of the actual runtime value. Useful when you want a common-case parameter value to control plan shape so that rare outlier values don't pollute the plan cache with a bad "one-size-fits-all" plan (see also parameter sniffing). Fragile in the same way as join hints — it silently becomes wrong/obsolete when business logic or typical parameter distributions change.

## Diagnostic Use

When triaging a query, treat the presence of any hint as a flag to investigate: is it still valid given current data/schema, or is it masking a deeper problem that should be fixed at the root (index, query shape, statistics)?

## Relationship to Other Concepts

- Join hints directly interact with [[Query Optimizer Join Order Complexity]] — forcing a join type removes join-order freedom, which matters more (not less) as table count and plan-space size grow.
- `RECOMPILE`-as-bandage and `OPTIMIZE FOR` both point at the same underlying issue that [[Database Indexing]]'s "stale statistics" section addresses from the indexing side — run `ANALYZE`/`UPDATE STATISTICS` and fix selectivity before reaching for a hint.
