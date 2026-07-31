---
type: entity
entity_type: person
title: "Chris Woodruff"
aliases:
  - "Woody"
  - "Chris \"Woody\" Woodruff"
tags:
  - entity
  - person
  - dotnet
status: developing
related:
  - "[[mapping-the-world-with-ef-core-spatial-data]]"
  - "[[EF Core Spatial Data]]"
  - "[[keyless-entity-types-ef-core-woodruff]]"
  - "[[EF Core Keyless Entity Types]]"
  - "[[no-tracking-queries-ef-core-woodruff]]"
  - "[[EF Core No-Tracking Queries]]"
  - "[[dbcontext-pooling-chris-woodruff]]"
  - "[[DbContext Pooling]]"
  - "[[transactional-savepoints-in-ef-core-rollback-just-what-you-need]]"
  - "[[EF Core Transactional Savepoints]]"
  - "[[ef-core-savechanges-interception-auditing-woodruff]]"
  - "[[EF Core SaveChanges Interception]]"
  - "[[EF Core Audit Log]]"
  - "[[bulksynchronize-in-ef-core]]"
  - "[[BulkSynchronize]]"
updated: 2026-07-03
---

# Chris Woodruff

Navigation: [[index]] | [[entities/_index|Entities]]

## Summary

Chris "Woody" Woodruff is a .NET developer and blogger writing at [woodruff.dev](https://woodruff.dev/), producing practical, code-first tutorial content for the .NET ecosystem. Posts are short and example-driven: define the type, configure it, query it, note the constraints — oriented toward developers who need a working pattern quickly rather than exhaustive API reference.

## Known Work

- [[mapping-the-world-with-ef-core-spatial-data|Mapping the World with EF Core: Working with Spatial Data]] (2025-02-09) — tutorial on storing/querying geographic data in EF Core with NetTopologySuite, covering `Point`/`Polygon` types, SRID 4326, `IsWithinDistance()`, and `Contains()` for geofencing.
- [[keyless-entity-types-ef-core-woodruff|Keyless Entity Types in EF Core: Query Data Without Primary Keys]] (2025-02-13) — guide to EF Core's `.HasNoKey()` feature for mapping database views, stored procedures, and raw SQL results to read-only C# entities.
- [[no-tracking-queries-ef-core-woodruff|No-Tracking Queries: Speed Up Your EF Core Like a Pro]] (2025-01-31) — guide to `AsNoTracking()` / `AsNoTrackingWithIdentityResolution()` for read-only query performance; see [[EF Core No-Tracking Queries]].
- [[dbcontext-pooling-chris-woodruff|DbContext Pooling: The Secret Sauce to Faster EF Core Apps]] (2025-01-25) — guide to `AddDbContextPool<T>()`; 2x+ throughput improvement by reusing DbContext instances instead of creating per-request; see [[DbContext Pooling]].
- [[transactional-savepoints-in-ef-core-rollback-just-what-you-need|Transactional Savepoints in EF Core: Rollback Just What You Need!]] (2025-02-11) — guide to partial rollbacks within EF Core transactions using savepoints; two API approaches (raw SQL + `CreateSavepointAsync`/`RollbackToSavepointAsync`); see [[EF Core Transactional Savepoints]].
- [[ef-core-savechanges-interception-auditing-woodruff|Tracking Every Change: Using SaveChanges Interception for EF Core Auditing]] (2025-02-06) — tutorial on `ISaveChangesInterceptor` for automatic audit logging; covers interceptor registration via DI and database-backed `AuditLog` entity; see [[EF Core SaveChanges Interception]] and [[EF Core Audit Log]].
- [[bulksynchronize-in-ef-core|BulkSynchronize in EF Core: Mirror Your Data in One Operation]] (2026-06-25) -- guide to Entity Framework Extensions' `BulkSynchronize` for server-side insert/update/delete reconciliation; covers scoping with `ColumnSynchronizeDeleteKeySubsetExpression`, benchmarks vs. hand-rolled diff-and-apply, and four production scenarios; see [[BulkSynchronize]].

## Notes

Entity page expanded across multiple ingested sources, all EF Core-focused; known posts span a January-February 2025 EF Core series on woodruff.dev.

## Related

- [[EF Core Spatial Data]]
- [[EF Core Keyless Entity Types]]
- [[EF Core No-Tracking Queries]]
- [[DbContext Pooling]]
- [[EF Core SaveChanges Interception]]
- [[EF Core Audit Log]]
- [[EF Core Transactional Savepoints]]
- [[BulkSynchronize]]
