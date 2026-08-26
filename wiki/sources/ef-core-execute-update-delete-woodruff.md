---
address: c-303
type: source
title: "How to Delete and Update Millions of Rows in EF Core Without Loading a Single Entity"
created: 2026-07-03
updated: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - performance
  - article
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core ExecuteUpdate and ExecuteDelete]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Extensions]]"
source_url: "https://woodruff.dev/how-to-delete-and-update-millions-of-rows-in-ef-core-without-loading-a-single-entity/"
raw_path: ".raw/notes/2026-07-03/How to Delete and Update Millions of Rows in EF Core Without Loading a Single Entity - Chris Woody Woodruff.md"
source_type: blog
author: "[[Chris Woodruff]]"
date_published: 2026-04-08
confidence: high
key_claims:
  - "ExecuteDeleteAsync translates LINQ predicates into a single server-side DELETE statement, loading zero entities into memory"
  - "ExecuteUpdateAsync with SetProperty chains compiles multiple property updates into a single server-side UPDATE statement"
  - "Both methods are change-tracker-unaware, execute immediately (not deferred to SaveChanges), and do not fire EF interceptors"
  - "EF Core 10 has no native ExecuteInsert — EFE's InsertFromQuery fills this gap with server-side INSERT…SELECT"
  - "Benchmarks show the naive load-then-save pattern scales linearly with row count; server-side operations scale sub-linearly with near-constant memory"
  - "Sponsored content in partnership with ZZZ Projects (maker of EFE); article is explicit about EFE being commercial with a free trial"
---

# How to Delete and Update Millions of Rows in EF Core Without Loading a Single Entity

Navigation: [[sources/_index|Sources]] | [[index]]

## Summary

Chris Woodruff's 2026-04-08 post on using EF Core's `ExecuteUpdateAsync` and `ExecuteDeleteAsync` (introduced in EF Core 7, stable in EF Core 10) for bulk server-side operations. The post contrasts the naive pattern (load entities into memory, foreach-modify, SaveChanges) with the native methods and with Entity Framework Extensions (EFE) from ZZZ Projects. Includes benchmark data across 10K, 100K, 500K, and 1M rows.

## Key Points

- **Naive pattern failure**: Loading 500K rows into memory, tracking each entity, and issuing one DELETE per row produces gigabytes of RAM pressure and 500K round-trips.
- **ExecuteDeleteAsync**: One SQL statement, zero entities loaded, immediate execution. `context.Sessions.Where(...).ExecuteDeleteAsync()` generates `DELETE FROM [Sessions] WHERE [ExpiresAt] < @cutoff`.
- **ExecuteUpdateAsync**: Multiple `SetProperty` calls chain into a single UPDATE. `context.Customers.Where(...).ExecuteUpdateAsync(s => s.SetProperty(...).SetProperty(...))`.
- **Caveats**: Execution is immediate (not deferred to SaveChanges); change-tracker-unaware (loaded entities become stale); EF interceptors do not fire; single-table only; no native ExecuteInsert; transaction hygiene is the developer's responsibility.
- **EFE InsertFromQuery**: Fills the gap EF Core 10 leaves — server-side INSERT…SELECT without loading source rows into .NET memory. O(1) memory regardless of row count.
- **Benchmarks**: At 1M rows, native ExecuteDelete is ~8.8s vs. naive ~32.6s. EFE InsertFromQuery is ~1.2s vs. naive ~26.7s. Native and EFE are practically equivalent for UPDATE/DELETE; the choice is about version compatibility and team conventions.

## Pages Created

- [[EF Core ExecuteUpdate and ExecuteDelete]] — concept page
