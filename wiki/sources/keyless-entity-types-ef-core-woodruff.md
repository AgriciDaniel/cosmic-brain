---
address: c-310
type: source
title: "Keyless Entity Types in EF Core: Query Data Without Primary Keys"
source_url: "https://woodruff.dev/keyless-entity-types-in-ef-core-query-data-without-primary-keys/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-13
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - database
status: current
related:
  - "[[EF Core Keyless Entity Types]]"
  - "[[Chris Woodruff]]"
---

# Keyless Entity Types in EF Core: Query Data Without Primary Keys

Blog post by [[Chris Woodruff]] on [woodruff.dev](https://woodruff.dev/), published 2025-02-13. Short, practical walkthrough of EF Core's Keyless Entity Types feature — how to map database views, stored procedure results, and raw SQL queries into read-only C# classes that don't require a primary key.

## Summary

Not every dataset an application queries maps cleanly to a table with a primary key. EF Core's **Keyless Entity Types** (configured via `.HasNoKey()`) let you query database views, stored procedure output, or raw SQL results as strongly-typed, read-only C# objects — without forcing an artificial unique identifier on rows that don't have one.

The post covers, in order:

1. **What keyless entity types are** — entities with no PK requirement, read-only, no change tracking.
2. **When to use them** — database views, stored procedure results, raw SQL queries, read-only reports.
3. **How to define one** — plain POCO class + `modelBuilder.Entity<T>().HasNoKey().ToView(...)` in `OnModelCreating`.
4. **Querying** — standard LINQ (`ToListAsync()`), read-only (no `Add`/`Update`/`Remove`).
5. **Raw SQL usage** — same POCO pattern but backed by `FromSqlRaw()` instead of `.ToView()`, for ad hoc aggregation queries that don't correspond to a persisted view.
6. **Caveats** — read-only, no change tracking, must be explicitly configured in `OnModelCreating` (unlike keyed entities, which EF Core can often infer by convention).

## Code Examples in Source

- `OrderSummary` keyless entity mapped to `View_OrderSummary` via `.HasNoKey().ToView(...)`.
- `ProductSales` keyless entity backed by `FromSqlRaw("SELECT ProductName, SUM(Quantity) AS UnitsSold FROM Sales GROUP BY ProductName")`.

## Notes on the Source

The published article contains some markdown/HTML rendering artifacts from the site export (each code block appears three times in slightly different forms: a de-indented listing, a single-line collapsed version, then a properly fenced ```js block — despite the language actually being C#). The wiki extraction here uses the clean, fenced version as the canonical code reference. No factual content is affected by the formatting duplication.

## See Also

- [[EF Core Keyless Entity Types]] — concept page synthesizing this feature
- [[Chris Woodruff]] — author entity
- [[N+1 Query Problem]] — related database/ORM performance concept already in the vault
