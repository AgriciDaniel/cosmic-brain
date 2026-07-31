---
type: concept
title: "N+1 Query Problem"
created: 2026-07-02
updated: 2026-07-02
address: c-000281
tags:
  - database
  - concept
  - sql
  - performance
  - anti-pattern
status: developing
related:
  - "[[SQL Query Optimization]]"
  - "[[Database Indexing]]"
  - "[[Database Schema and Performance]]"
sources:
  - "[[sql-query-optimization-18-techniques]]"
complexity: beginner
domain: database
aliases:
  - "N+1 problem"
  - "N plus 1 query problem"
  - "query-in-a-loop"
---

# N+1 Query Problem

An anti-pattern where an application issues 1 query to fetch a list of N parent rows, then issues N additional queries (typically inside a loop) to fetch related data for each row individually — instead of fetching everything in a bounded number of set-based queries.

## Why It Happens

Common in ORM-driven code and naive application loops:

```text
# N+1 pattern (pseudocode)
orders = SELECT * FROM orders WHERE customer_id = 42      -- 1 query
for order in orders:
    items = SELECT * FROM order_items WHERE order_id = order.id   -- N queries
```

If `orders` returns 500 rows, this executes 501 round-trips to the database instead of 2 (or 1).

## Why It's Expensive

- Each query is a network round-trip; latency compounds linearly with N.
- Under concurrency, N+1 patterns multiply database load — many users each generating N extra queries saturates connection pools and CPU.
- The per-query overhead (parsing, planning, connection handshake) dominates when each query does very little actual work.

## Fixes

1. **Batch fetch with `IN`**: `SELECT * FROM order_items WHERE order_id IN (1, 2, 3, ...)` — one query instead of N.
2. **JOIN instead of separate fetches**: pull parent + child rows in a single query and reassemble in application code.
3. **ORM eager loading**: most ORMs provide an explicit "include related" / eager-load mechanism (e.g., `.Include()` in EF Core, `select_related`/`prefetch_related` in Django) specifically to avoid N+1 by fetching related data in 1-2 queries instead of N.
4. **Avoid selecting data inside application loops generally** — the same root cause (per-row database calls) also shows up outside classic N+1 shape, e.g. re-querying inside a `for` loop for unrelated reasons. Move the logic into a single set-based query and let the engine process data in bulk.

## Detection

- Application-level: ORM query-count assertions in tests, APM tracing showing repeated near-identical queries per request.
- Database-level: [[SQL Server DMV Usage Tracking]]-style monitoring can surface unusually high call counts for a simple parameterized query relative to request volume.

## Relation to Other Concepts

N+1 is a distinct failure mode from missing indexes ([[Database Indexing]]) — even a perfectly indexed per-row query is still slow in aggregate if it's called N times instead of once. Indexing makes each of the N queries fast; batching/JOINs eliminate the N.

## Source

Introduced to the vault via [[sql-query-optimization-18-techniques]] (technique #10 "Prevent N+1 query problems" and #17 "Avoid selecting data inside application loops," which the source treats as related but separate techniques — this page treats them as one underlying anti-pattern with the same fix).
