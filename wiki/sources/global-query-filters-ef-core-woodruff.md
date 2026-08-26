---
address: c-308
type: source
title: "Global Query Filters: Setting the Rules Once, Querying Like a Pro"
source_url: "https://woodruff.dev/global-query-filters-setting-the-rules-once-querying-like-a-pro/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-02
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - database
status: current
related:
  - "[[EF Core Global Query Filters]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
---

# Global Query Filters: Setting the Rules Once, Querying Like a Pro

Blog post by [[Chris Woodruff]] on [woodruff.dev](https://woodruff.dev/), published 2025-02-02. Short, practical (café/cookie-metaphor) walkthrough of EF Core's Global Query Filters feature — configure a filter predicate once per entity type, and EF Core silently applies it to every query against that entity.

## Summary

Global Query Filters are LINQ predicates registered once, in `OnModelCreating`, via `HasQueryFilter()`. Every subsequent query against that entity type automatically has the predicate applied — no repeated `.Where()` clauses scattered across the codebase.

The post covers, in order:

1. **What they are** — rules EF Core applies to every query on a given entity type, filtering out data that shouldn't surface by default (soft-deleted rows, out-of-stock items, inactive users).
2. **Why use them** — simplifies code (no repetitive `.Where()`), ensures consistency across all call sites, improves performance (filtering happens at the database, not in application code), and makes soft deletes trivial.
3. **How to add one** — define the entity property to filter on, then call `modelBuilder.Entity<T>().HasQueryFilter(predicate)` in `OnModelCreating`.
4. **When to use them** — soft deletes (`!u.IsDeleted`), multi-tenant data isolation (`o.TenantId == _currentTenantId`), default visibility rules (hide unpublished/inactive records).
5. **When NOT to use them** — when call sites frequently need to bypass the filter, when the condition is complex (global filters are for simple predicates), or when a query needs full custom control.
6. **Bypassing the filter** — `context.Albums.IgnoreQueryFilters().ToListAsync()` fetches all rows, filter included; recommended sparingly to preserve consistency.
7. **Worked example** — a `Product` entity with `IsDiscontinued`, filtered globally so every `Product` query excludes discontinued items without extra code.

## Code Examples in Source

- `Album` entity with `IsOutOfStock`, filtered via `modelBuilder.Entity<Album>().HasQueryFilter(a => !a.IsOutOfStock)`.
- Soft-delete filter: `modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted)`.
- Multi-tenant filter: `modelBuilder.Entity<Order>().HasQueryFilter(o => o.TenantId == _currentTenantId)`.
- Bypass: `var allAlbums = await context.Albums.IgnoreQueryFilters().ToListAsync();`
- `Product` entity with `IsDiscontinued`, filtered via `HasQueryFilter(p => !p.IsDiscontinued)`.

## Notes on the Source

Same rendering pattern as other woodruff.dev clippings in this batch: each code block appears three times (de-indented listing, collapsed single-line version, then a properly fenced ` ```js ` block, despite the language actually being C#). The wiki extraction here uses the clean fenced version as the canonical code reference; no factual content is affected.

This post predates (2025-02-02) the EF Core 10 **named query filters** feature documented in the vault's [[Entity Framework Core]] entity page (multiple `HasQueryFilter` predicates per entity type, added in EF Core 10, selectively bypassable via `IgnoreQueryFilters(["FilterName"])`). At time of this post, EF Core supported exactly one combined filter predicate per entity type — see [[EF Core Global Query Filters]] for the resulting contradiction/limitation note.

## See Also

- [[EF Core Global Query Filters]] — concept page synthesizing this feature
- [[Chris Woodruff]] — author entity
- [[Entity Framework Core]] — product entity
- [[EF Core Keyless Entity Types]], [[EF Core Spatial Data]] — sibling Woodruff/EF Core concept pages ingested in the same batch
