---
address: c-316
type: source
title: "Split Queries: Stop the Data Traffic Jam in EF Core"
source: "https://woodruff.dev/split-queries-stop-the-data-traffic-jam-in-ef-core/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-29
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - performance
status: current
related:
  - "[[EF Core Split Queries]]"
  - "[[Chris Woodruff]]"
  - "[[N+1 Query Problem]]"
---

# Split Queries: Stop the Data Traffic Jam in EF Core

Navigation: [[index]] | [[sources/_index|Sources]]

## Summary

A practical, code-first tutorial blog post by [[Chris Woodruff]] on woodruff.dev explaining EF Core's **Split Queries** feature (`.AsSplitQuery()`): what problem it solves (single-query JOIN bloat and Cartesian-product duplication when loading related data via `.Include()`), how to enable it per-query or as a `DbContext`-wide default, and when it helps versus when it doesn't.

## Key Points

1. **The problem with default `.Include()` behavior**: EF Core generates one query with SQL `JOIN`s for related-data loading. For deeply nested relationships or one-to-many fan-out, this produces a Cartesian product — parent-row data gets duplicated once per related child row, bloating the result set and memory usage.
2. **What Split Queries do**: `.AsSplitQuery()` tells EF Core to issue multiple smaller queries instead of one mega-query — e.g., one query for `Blogs`, a separate query for `Posts` — and stitches the results together client-side. Eliminates the duplicated-row problem and reduces memory overhead.
3. **Enabling per-query**: append `.AsSplitQuery()` to the LINQ chain after `.Include(...)`.
4. **Enabling as the DbContext default**: `optionsBuilder.UseSqlServer(...).UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)` in `OnConfiguring`. Individual queries can still opt back into single-query behavior explicitly.
5. **Why use them**: (a) eliminates redundant/duplicated rows from JOIN fan-out, (b) avoids memory overload on large in-memory result sets, (c) lightens per-query load on the database server, (d) prevents Cartesian-product "explosion" (query returning thousands of rows when tens were expected).
6. **When to use them**: deeply nested `Include`-on-`Include`-on-`Include` relationships; large datasets across thousands of parent records; as a troubleshooting step when a single JOIN-heavy query is a known bottleneck.
7. **Gotchas**: Split Queries make multiple round-trips to the database — for small datasets, one JOIN query can still be faster than several smaller ones. Split Queries don't help lazy-loading scenarios. EF Core defaults to single queries unless `.AsSplitQuery()` is set explicitly or configured as the default.
8. **Trade-off framing**: single query = fewer round-trips but risk of massive duplicated results / high memory; split queries = smaller, cleaner per-query results but more round-trips (added latency risk on small datasets).

## Code Patterns Extracted

- Single query (default): `context.Blogs.Include(b => b.Posts).ToListAsync();` — one query, `JOIN`-based, can duplicate rows.
- Split query (per-call): `context.Blogs.Include(b => b.Posts).AsSplitQuery().ToListAsync();` — two queries (Blogs, then Posts), no duplication.
- Global default configuration:
  ```csharp
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
      optionsBuilder
          .UseSqlServer("<YourConnectionString>")
          .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
  }
  ```

## My Take

This is an introductory post scoped to the "what/why/how" of a single EF Core feature flag — it doesn't cover EF Core's own split-query gotchas beyond the basics (e.g., ordering/paging correctness across split queries, or transaction/isolation-level implications of multiple round-trips within one logical read). Worth treating as a starting point, not exhaustive guidance. Split Queries are architecturally distinct from the classic [[N+1 Query Problem]]: the query count scales with the number of `Include`d relationships (bounded, small), not with the number of parent rows (N) — so this is not a reintroduction of N+1, though it does trade "fewer round trips" for "less duplication/memory," the opposite lever from N+1's fix (which collapses N round-trips into fewer).

## Related

- [[EF Core Split Queries]] — concept page synthesizing the split-query pattern from this source
- [[Chris Woodruff]] — author entity
- [[N+1 Query Problem]] — related but architecturally distinct query-count anti-pattern

## Source

- [[.raw/notes/2026-07-03/Split Queries Stop the Data Traffic Jam in EF Core - Chris Woody Woodruff.md]]
- https://woodruff.dev/split-queries-stop-the-data-traffic-jam-in-ef-core/
