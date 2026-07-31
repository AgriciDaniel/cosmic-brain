---
type: concept
title: "EF Core Keyless Entity Types"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - database
  - orm
status: developing
related:
  - "[[keyless-entity-types-ef-core-woodruff]]"
  - "[[Chris Woodruff]]"
  - "[[EF Core Spatial Data]]"
sources:
  - "[[keyless-entity-types-ef-core-woodruff]]"
---

# EF Core Keyless Entity Types

Navigation: [[index]] | [[concepts/_index|Concepts]]

## Definition

A **Keyless Entity Type** is an Entity Framework Core entity that does not require a primary key. It is configured explicitly with `.HasNoKey()` in `OnModelCreating`, and is used to map results that have no natural unique identifier — database views, stored procedure output, and raw SQL query results — into strongly-typed, read-only C# objects.

## Core Characteristics

- **No primary key required** — unlike standard EF Core entities, which map to tables and (usually) have an inferred or declared PK.
- **Read-only** — cannot be used with `Add()`, `Update()`, or `Remove()`; EF Core will not persist changes back to the database.
- **No change tracking** — EF Core does not track keyless entity instances, so in-memory mutation has no effect on the database.
- **Must be explicitly configured** — keyless types cannot be inferred by convention; they must be registered in `OnModelCreating` via `modelBuilder.Entity<T>().HasNoKey()`.

## Two Mapping Patterns

1. **Database view mapping**: define a POCO matching the view's output shape, then `.HasNoKey().ToView("View_Name")`. Query via a `DbSet<T>` like any other set.
2. **Raw SQL mapping**: define a POCO matching a query's output shape, then `.HasNoKey()` only (no `.ToView()`). Execute with `.FromSqlRaw("...")` instead of `.ToView()` — this pattern is not backed by a persisted view, so the SQL is supplied at query time.

```csharp
// View-backed
modelBuilder.Entity<OrderSummary>()
    .HasNoKey()
    .ToView("View_OrderSummary");

// Raw-SQL-backed (no .ToView())
modelBuilder.Entity<ProductSales>().HasNoKey();
// ...
var salesReport = await context.ProductSalesReports
    .FromSqlRaw("SELECT ProductName, SUM(Quantity) AS UnitsSold FROM Sales GROUP BY ProductName")
    .ToListAsync();
```

## When to Use

- Querying **database views** that aggregate data across multiple tables.
- Mapping **stored procedure results** with complex, non-tabular shapes.
- Running **raw SQL queries** that don't map cleanly to a single entity/table.
- **Read-only reporting/analytics** where identity tracking and change tracking add unnecessary overhead.

## Relation to Other Concepts

- Distinct from [[N+1 Query Problem]] mitigation techniques (`.Include()`/eager loading) — keyless entities solve a *shape* problem (data without a natural key), not a *round-trip count* problem. They can be combined: a keyless entity backed by a well-designed view can itself be the fix for what would otherwise require multiple round-trips.
- Complements `AsNoTracking()` conceptually — both exist to avoid EF Core's change-tracking overhead for read-only scenarios, though keyless entity types go further: they are read-only *by construction* rather than by an opt-in query flag.

## Gaps / Not Covered by the Source

The source article does not cover: performance characteristics of keyless entities vs. tracked entities at scale, composite/complex-type mapping within a keyless entity, migrations behavior (keyless entities have no PK to migrate), or how keyless entities interact with EF Core's `DbContext` pooling.

## Source

[[keyless-entity-types-ef-core-woodruff]] — blog post by [[Chris Woodruff]], published 2025-02-13.
