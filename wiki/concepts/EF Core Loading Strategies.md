---
type: concept
title: "EF Core Loading Strategies"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - loading
  - performance
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[EF Core Performance and N+1]]"
  - "[[N+1 Query Problem]]"
sources:
  - "[[30-ef-core-interview-questions]]"
complexity: intermediate
domain: dotnet
aliases:
  - "Lazy Eager Explicit Loading"
  - "AsSplitQuery"
---

# EF Core Loading Strategies

How EF Core loads related data — the single most common source of EF Core performance problems in production.

## Three Loading Modes

- **Eager** — `Include`, loaded up front as part of the original query.
- **Explicit** — `context.Entry(x).Reference(...).Load()`, loaded on demand by application code.
- **Lazy** — loaded automatically the first time a navigation property is touched.

**Key fact: lazy loading is OFF by default in EF Core** — the opposite of legacy EF6, where it was on by default. Enabling it requires installing `Microsoft.EntityFrameworkCore.Proxies`, calling `UseLazyLoadingProxies()`, and marking navigation properties `virtual`.

> **Red flag:** "Lazy loading is on by default like in Entity Framework" — correct for EF6, wrong for EF Core; signals which version the candidate actually used.

## Why Lazy Loading Is Dangerous in a Web API

Two reasons:

1. **Hides N+1 problems** — a `foreach` over orders that touches `order.Customer` fires one query per iteration, invisibly, until a SQL profiler catches it. See [[N+1 Query Problem]] for the general anti-pattern this instantiates.
2. **Needs a live `DbContext`** — in a web API the context is disposed at end of request; a navigation accessed after that throws `ObjectDisposedException`, a classic bug when an entity escapes into a serializer or background continuation.

Default rule: keep lazy loading off in APIs, load explicitly via `Include` or projection. Lazy loading is more defensible in a desktop app with a long-lived context.

> **Red flag:** "I turn lazy loading on so I never have to think about loading" — exactly how N+1 ships.

## Include vs. Projection

- **`Include`** — pulls back full related entities, tracked; use when the graph will be modified.
- **Projection (`Select` into a DTO)** — pulls back only needed columns, faster, lighter, no tracking overhead; use for read-only responses.

```csharp
// Projection: one query, only the 3 columns, no tracking overhead
var dtos = await db.Orders
    .Select(o => new OrderDto(o.Id, o.Total, o.Customer.Name))
    .ToListAsync();
```

Default for GET endpoints: projection. `Include` reserved for aggregates about to be mutated.

> **Red flag:** "I always use `Include` to be safe" — loads entire entity graphs to return three fields.

## Cartesian Explosion and AsSplitQuery

Including **multiple collections** on the same query causes SQL to multiply rows via joins: 100 orders × 10 items × 5 tags can return 5,000 duplicated rows that EF Core then de-duplicates in memory. Slow and bandwidth-heavy.

**Fix:** `AsSplitQuery()`, issuing one SQL query per collection instead of one giant join:

```csharp
var orders = await db.Orders
    .Include(o => o.Items)
    .Include(o => o.Tags)
    .AsSplitQuery()
    .ToListAsync();
```

**Trade-off:** split queries incur multiple round trips and aren't wrapped in a single consistency snapshot — for collections that must be perfectly consistent, keep a single query or wrap in an explicit transaction.

> **Red flag:** "I'd just add more `Include`s" — makes the explosion bigger.

## Relation to Other Concepts

Loading strategy choices are the primary lever behind [[EF Core Performance and N+1]] — N+1, `AsNoTracking`, and streaming decisions all sit downstream of whether data was eager-loaded, projected, or lazily fetched here. [[EF Core Querying and LINQ Translation]] is the prerequisite (understanding `IQueryable` composition is what makes `Include`-vs-projection reasoning possible).

## Source

[[30-ef-core-interview-questions]] — Q9-Q12 ("Loading Strategies" category), by [[Mukesh Murugan]].
