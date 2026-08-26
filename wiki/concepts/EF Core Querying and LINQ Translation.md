---
type: concept
title: "EF Core Querying and LINQ Translation"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - linq
  - querying
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Loading Strategies]]"
  - "[[EF Core Performance and N+1]]"
sources:
  - "[[30-ef-core-interview-questions]]"
complexity: intermediate
domain: dotnet
aliases:
  - "IQueryable vs IEnumerable"
  - "LINQ translation"
---

# EF Core Querying and LINQ Translation

How C# LINQ becomes SQL in EF Core, and what happens when it can't. Tests whether a candidate understands query composition versus in-memory iteration.

## IQueryable vs. IEnumerable

- **`IQueryable<T>`** builds an expression tree that EF Core translates to SQL and executes **in the database**.
- **`IEnumerable<T>`** runs LINQ **in memory** on objects already pulled from the database.

```csharp
// Runs in SQL: WHERE IsActive = 1, returns matching rows only
var active = await db.Products.Where(p => p.IsActive).ToListAsync();

// DANGER: AsEnumerable() pulls EVERY row into memory, THEN filters in C#
var bad = db.Products.AsEnumerable().Where(p => p.IsActive).ToList();
```

The moment `AsEnumerable()`, `ToList()`, or an early `foreach` executes, composition stops and everything after runs client-side. Default discipline: keep queries as `IQueryable` until the last possible moment.

> **Red flag:** "They're basically the same, both are just collections" — this misunderstanding ships full-table loads to production.

## "Could Not Be Translated" Errors

EF Core tries to translate a C# expression into SQL and fails — typically because a custom method or a .NET API with no SQL equivalent was called inside the query:

```csharp
// Throws: FormatTaxId is a C# method, no SQL translation exists
var rows = await db.Customers
    .Where(c => FormatTaxId(c.TaxId) == input)
    .ToListAsync();
```

**Since EF Core 3.0**, the framework refuses to silently evaluate this client-side (the pre-3.0 behavior caused invisible N+1 patterns and full table scans). Fix order, in preference:

1. Rewrite the predicate to be translatable (compare raw columns).
2. Move the untranslatable portion after an explicit `AsEnumerable()`, but only if the filtered set is already small.
3. Push the logic into a computed column, or use `FromSql`.

> **Red flag:** "I'd just add `.AsEnumerable()` before the `.Where()` to make the error go away" — fixes the exception by loading the whole table into memory.

## First vs. Single vs. Find

- **`First` / `FirstOrDefault`** — returns the first match; fine when multiple matches are acceptable.
- **`Single` / `SingleOrDefault`** — asserts exactly one match, throws on duplicates; use when a duplicate indicates a bug.
- **`Find`** — checks the **change tracker first**, only hits the database if the entity isn't already loaded; can save a round trip on primary-key lookups.

> **Red flag:** "They all do the same thing, I just use `First`" — discards `Single`'s correctness guarantee and `Find`'s caching behavior.

## Left Joins in LINQ

EF Core has no `LeftJoin` keyword in the classic LINQ query syntax; the pattern is `GroupJoin` + `SelectMany` + `DefaultIfEmpty`:

```csharp
var query =
    from o in db.Orders
    join c in db.Customers on o.CustomerId equals c.Id into grp
    from c in grp.DefaultIfEmpty()
    select new { o.Id, CustomerName = c != null ? c.Name : "(none)" };
```

`DefaultIfEmpty()` is what turns the join into a left join instead of an inner join. When a navigation property exists, projecting through it directly and letting EF Core infer the join is usually simpler.

> **Red flag:** "EF Core can't do left joins" — it can, with the right LINQ shape.

## Relation to Other Concepts

Feeds directly into [[EF Core Loading Strategies]] (`Include` vs. projection is a specific instance of the IQueryable composition discipline here) and [[EF Core Performance and N+1]] (`AsNoTracking`, `ToQueryString()`-driven diagnosis both assume the reader understands where composition stops).

## Source

[[30-ef-core-interview-questions]] — Q5-Q8 ("Querying and LINQ Translation" category), by [[Mukesh Murugan]].
