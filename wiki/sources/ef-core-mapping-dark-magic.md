---
address: c-305
type: source
title: "EF Core Mapping: Dark Magic (Here Is Why)"
source_url: "https://www.youtube.com/watch?v=_ueDwoD-mMg"
author:
  - "[[Zoran Horvat]]"
published: 2026-06-16
created: 2026-07-03
tags:
  - source
  - video-transcript
  - dotnet
  - ef-core
  - ddd
status: current
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Complex Types and Value Objects]]"
  - "[[Domain-Driven Design Value Objects]]"
  - "[[Zoran Horvat]]"
---

# EF Core Mapping: Dark Magic (Here Is Why)

Navigation: [[index]] | [[sources/_index|Sources]] | [[Entity Framework Core]] | [[EF Core Complex Types and Value Objects]]

YouTube video transcript, published 2026-06-16 by [[Zoran Horvat]] on the "Zoran on C#" YouTube channel. Runtime ~15:26. Ingested from `.raw/notes/2026-07-03/EF Core Mapping Dark Magic (Here Is Why).md`.

## Summary

A live-coding walkthrough demonstrating how EF Core 10's complex types and value converters let a fully domain-driven-design (DDD) style object model — nested value objects, strongly-typed IDs, custom comparison operators — persist into a single flat SQL table AND translate arbitrarily nested in-memory LINQ queries into correct SQL, with no custom query logic written by the developer.

The demo builds up a `Transfer` domain model (a money-transfer record) from the bottom:

1. **`Currency` record** — currency code + decimal places, with a validation rule baked into the constructor. Directly persistable by EF Core with zero extra mapping code because its constructor parameter names match intended column names.
2. **`Money` record** — wraps an `amount` and a `Currency`. Its constructor doesn't match table columns, so it needs a **private parameterless constructor** (with dummy defaults) so EF Core can create an empty shell via reflection and then populate it through property setters. Record types with primary constructors must accept all-default (null-for-reference-types) values or EF Core cannot reconstruct them.
3. **`Timestamp` record** — wraps a single UTC-only `DateTime`, with a custom `Add(TimeSpan)` method and custom comparison operators (`<`, `>=`, etc.) so callers get a rich domain API instead of raw `DateTime` handling.
4. **Strongly-typed `TransferId`** — wraps a `Guid`, preventing accidental cross-assignment between different ID types and guaranteeing the ID is never empty; has a factory method for generating fresh IDs.
5. **`Transfer` class** — the aggregate root: `Amount` (`Money`), `Id` (`TransferId`), `Timestamp`. Gets a public parameterized constructor for clean callers plus a private parameterless constructor (chaining to the primary one with dummy defaults) for EF Core reconstruction.

### EF Core 10 configuration (`OnModelCreating`)

- The primary key is mapped as a **shadow property** (`Id` column) — deliberately separate from the domain-visible public `Id` property (a `TransferId`), which may be shared with other systems.
- The public `TransferId` is unpacked into a plain GUID column via a custom **`ValueConverter`**: a class whose constructor passes two lambdas to the base constructor — one unwrapping the record to the raw `Guid`, one converting the raw value back into a `TransferId`.
- The `Timestamp` value converter explicitly sets `DateTimeKind.Utc` on the raw value before reconstructing the `Timestamp`, because "the time kind is lost when saving to the database."
- The `Amount` property (of type `Money`) has no one-to-one column mapping, so it's configured via **`ComplexProperty`**. Inside that call: the `Amount` scalar is mapped to a decimal column with specified precision, and — the "astonishing" part — **`Currency` is configured as a nested `ComplexProperty` inside the `Amount` complex property**, so both of `Currency`'s scalar fields end up as flat columns in the same table alongside `Amount`.
- Total configuration: "mere dozens of lines of code setting up value conversions and complex properties" to persist five distinct C# classes into a single table.

### Query translation ("the dark magic")

Once mapped, EF Core translates in-memory-style LINQ queries directly to SQL with no helper methods:

- Querying by the entire `Money` complex property translates to a multi-column equality comparison (reads "just like plain object comparison in C#").
- Querying by a nested property (`Currency.Code.StartsWith(...)`) translates into a SQL `LIKE`.
- Arithmetic comparisons against a nested property (`Amount.Amount`) translate directly.
- The standout example: filtering `Transfer`s by `Timestamp` using the **custom `>=` operator overload defined on the `Timestamp` record** (not a native EF-translatable operator) — EF Core still correctly infers the intended comparison and translates it into a SQL comparison on the underlying numeric/DateTime column. No custom logic or helper methods required on the query side.

### Demo data

Six transfers inserted (four USD, two JPY); queries correctly isolate USD-only transfers (equality), currency-code-prefix matches (`LIKE`), and time-range filters (via the custom timestamp operator), all validated end-to-end.

## Key Facts

- EF Core needs an empty-shell constructor path (private parameterless constructor, defaults chained into the primary constructor) plus settable properties to reconstruct any type via reflection — this applies to every non-trivial value object in the model.
- `ComplexProperty` configurations can nest arbitrarily (`Currency` nested inside `Amount`'s `ComplexProperty` call), letting deeply nested object graphs flatten into one table.
- `ValueConverter` is the tool for one-to-one wrapper-type-to-column mapping (e.g., strongly-typed ID -> `Guid` column); `ComplexProperty` is the tool for one-object-to-many-columns mapping.
- Shadow properties let the database primary key stay decoupled from a domain-visible public identifier type.
- EF Core's query translator can trace custom C# operator overloads on value objects back to the equivalent SQL comparison on the underlying converted/mapped columns — described in the video as feeling like "dark magic" but is a deliberate, documented EF Core 10 capability.
- Domain-model validation stays entirely inside the domain types (constructors, static factories); EF Core's job is strictly persistence and translation, kept as "two separate activities."

## Related

- [[Zoran Horvat]] — the presenter/author
- [[Entity Framework Core]] — the ORM being demonstrated (EF Core 10)
- [[EF Core Complex Types and Value Objects]] — concept page distilling the mapping mechanics shown here
- [[Domain-Driven Design Value Objects]] — concept page on the DDD modeling patterns (strongly-typed IDs, value objects, validation-in-constructor) used throughout this demo
