---
address: c-313
type: source
title: "No-Tracking Queries: Speed Up Your EF Core Like a Pro"
source: "https://woodruff.dev/no-tracking-queries-speed-up-your-ef-core-like-a-pro/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-31
created: 2026-07-03
updated: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - database
  - performance
  - article
status: developing
related:
  - "[[EF Core No-Tracking Queries]]"
  - "[[Chris Woodruff]]"
  - "[[N+1 Query Problem]]"
  - "[[SQL Query Optimization]]"
domain: dotnet
---

# No-Tracking Queries: Speed Up Your EF Core Like a Pro

Blog post by [[Chris Woodruff]] (woodruff.dev, published 2025-01-31) explaining Entity Framework Core's `AsNoTracking()` and `AsNoTrackingWithIdentityResolution()` query options as a read-performance lever.

## Summary

By default, EF Core's change tracker follows every entity it materializes so it can detect and persist later modifications (`SaveChanges()`). For read-only workloads — API responses, reports, dashboards — that tracking overhead is pure waste. The post walks through:

1. **The default (tracked) query** — `context.Albums.ToListAsync()` — EF Core snapshots and tracks every `Album`.
2. **`AsNoTracking()`** — skips change tracking entirely; faster and lighter, but the returned entities can't be updated and are not deduplicated across a graph.
3. **The identity resolution gap** — a no-tracking query with `.Include(a => a.Tracks)` can return duplicate `Album` instances when albums share tracks, because without tracking there's no mechanism ensuring one CLR instance per row.
4. **`AsNoTrackingWithIdentityResolution()`** — combines no-tracking's speed with a guarantee that each entity is materialized as a single instance, at a small extra cost versus plain `AsNoTracking()`.
5. **Setting no-tracking as the context default** via `OnConfiguring` + `UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)`, overridable per-query with `.AsTracking()`.
6. **Illustrative (unattributed/approximate) performance numbers**: 300ms / high memory (tracked, 10k rows) vs. 120ms / low memory (`AsNoTracking`) vs. 150ms / low-but-slightly-higher memory (`AsNoTrackingWithIdentityResolution`).
7. **Gotchas**: no-tracking results are read-only (no `SaveChanges()` support), identity resolution isn't free, and lazy loading does not work on no-tracking results — related data must be explicitly `.Include()`d.

## Code Examples (from source)

```csharp
// Tracked (default)
var albums = await context.Albums.ToListAsync();

// No-tracking
var albums = await context.Albums.AsNoTracking().ToListAsync();

// No-tracking + related data, WITHOUT identity resolution (duplicates possible)
var albums = await context.Albums.Include(a => a.Tracks).AsNoTracking().ToListAsync();

// No-tracking + identity resolution (each Album instance unique)
var albums = await context.Albums.AsNoTrackingWithIdentityResolution().ToListAsync();

// Setting no-tracking as the context-wide default
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseSqlServer("<YourConnectionString>")
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
}
```

## Notable Claims / Data Points

- No-tracking queries reduce EF Core's per-row bookkeeping (no snapshot, no `ChangeTracker` entry), which the post frames as both a speed and memory win.
- Identity resolution is presented as "not free" — it prevents duplicate object graphs but adds overhead versus plain no-tracking, so the post recommends reserving it for queries with `.Include()`d relationships, not blanket use.
- No-tracking results are strictly read-only; you cannot `SaveChanges()` against entities fetched this way, and lazy loading is unavailable, so `.Include()` must be explicit.

## Notes on Source Quality

This is a short, informal blog post (library-metaphor framing, no benchmark methodology disclosed for the "Performance Example" numbers — treat query-time/memory figures as illustrative rather than measured/reproducible benchmarks). It correctly reflects EF Core's documented behavior for `AsNoTracking()` / `AsNoTrackingWithIdentityResolution()` / `QueryTrackingBehavior`.

## Related

- [[EF Core No-Tracking Queries]] — concept page synthesizing the technique
- [[Chris Woodruff]] — author entity
- [[N+1 Query Problem]] — related EF Core/ORM performance anti-pattern (explicit `.Include()` avoids both N+1 and the lazy-loading gap this post flags)
- [[SQL Query Optimization]] — broader vault taxonomy this technique fits under
