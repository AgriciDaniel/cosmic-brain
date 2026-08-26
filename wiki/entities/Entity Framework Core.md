---
type: entity
title: "Entity Framework Core"
entity_type: product
role: ".NET Object-Relational Mapper (ORM)"
first_mentioned: "[[30-ef-core-interview-questions]]"
created: 2026-07-03
updated: 2026-07-03
tags:
  - entity
  - product
  - dotnet
  - orm
  - microsoft
status: developing
related:
  - "[[Mukesh Murugan]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[EF Core Loading Strategies]]"
  - "[[EF Core Performance and N+1]]"
  - "[[EF Core Migrations]]"
  - "[[EF Core Change Tracking and Saving]]"
  - "[[EF Core Advanced Features]]"
  - "[[EF Core Transactional Savepoints]]"
  - "[[EF Core SaveChanges Interception]]"
  - "[[EF Core Audit Log]]"
  - "[[DbContext Pooling]]"
  - "[[N+1 Query Problem]]"
  - "[[Fusion EF Integration]]"
  - "[[BulkSynchronize]]"
  - "[[EFCorePowerTools]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[DGML Model Visualization]]"
sources:
  - "[[30-ef-core-interview-questions]]"
  - "[[dbcontext-pooling-chris-woodruff]]"
  - "[[transactional-savepoints-in-ef-core-rollback-just-what-you-need]]"
  - "[[ef-core-savechanges-interception-auditing-woodruff]]"
  - "[[bulksynchronize-in-ef-core]]"
aliases:
  - "EF Core"
  - "EFCore"
---

# Entity Framework Core

Microsoft's cross-platform, open-source Object-Relational Mapper (ORM) for .NET. Current version at time of vault ingest: **EF Core 10**, targeting **.NET 10**. Successor to legacy "Entity Framework 6" (EF6), with materially different defaults — no EDMX / visual Model-First designer, lazy loading off by default (vs. on by default in EF6), code-first as the standard workflow.

## Core Model

- **`DbContext`** — the unit-of-work + change-tracking boundary, registered scoped by default (one instance per HTTP request); not thread-safe, not designed to be long-lived. Can also be pooled via `AddDbContextPool<T>()` for >2x throughput in high-load scenarios. See [[EF Core DbContext Lifetime and Configuration]] and [[DbContext Pooling]].
- **Change tracker** — snapshot-based by default: stores original property values on load, diffs against current values at `SaveChanges` to generate targeted `UPDATE` statements. See [[EF Core Change Tracking and Saving]].
- **LINQ-to-SQL translation** — `IQueryable<T>` expression trees translate to SQL and execute server-side; anything that can't translate throws rather than silently falling back to client evaluation (since EF Core 3.0). See [[EF Core Querying and LINQ Translation]].
- **Loading strategies** — eager (`Include`), explicit (`Entry().Load()`), lazy (off by default, requires `Microsoft.EntityFrameworkCore.Proxies` + `UseLazyLoadingProxies()` + `virtual` navigations). See [[EF Core Loading Strategies]].
- **Migrations** — code-first schema evolution via `dotnet ef migrations add`, applied through idempotent scripts or migration bundles rather than `Database.Migrate()` at startup in production. See [[EF Core Migrations]].

## Version-Gated Features Referenced

- **EF Core 3.0** — client-evaluation fallback removed; untranslatable LINQ throws instead of silently pulling data into memory.
- **EF Core 7** — `ExecuteUpdateAsync` / `ExecuteDeleteAsync` added: single server-side `UPDATE`/`DELETE` statements bypassing the change tracker entirely, for bulk operations.
- **EF Core 10** — named query filters: multiple `HasQueryFilter` predicates per entity type (previously exactly one, forcing soft-delete + multi-tenancy into a single combined `&&` expression); selectively bypassable via `IgnoreQueryFilters(["FilterName"])`.

## Native Feature Gaps

EF Core has never shipped a built-in method for mirroring a source list to a database table in a single operation. There is no `ExecuteSynchronize`, no `AddRangeOrUpdateOrDelete`. Teams write hand-rolled diff-and-apply methods that load existing rows, diff in memory, and call `SaveChanges` -- correct but slow at scale.

**Entity Framework Extensions** (paid library by ZZZ Projects) fills this gap with [[BulkSynchronize]], which uses a server-side staging table + MERGE to reconcile insert/update/delete in a single transaction without materializing rows in .NET memory. At 500K rows, it is ~1.9x faster than the hand-rolled pattern and much lower memory. See [[bulksynchronize-in-ef-core]] for the source article.

## Relationship to Other Vault Content

Distinct from [[Fusion EF Integration]], which documents ActualLab.Fusion's own `DbHub<TDbContext>` wrapper around EF Core (sharding, operation-scoped DbContext) rather than EF Core itself. The N+1 query anti-pattern discussed throughout the EF Core interview material is the same underlying anti-pattern as the general [[N+1 Query Problem]] concept page (originally documented from a non-ORM-specific SQL optimization source); EF Core's fix vocabulary (`Include`, projection, `AsSplitQuery`) is the ORM-specific instance of the general batch/JOIN fixes documented there.

## Ecosystem Tooling

- **[[EFCorePowerTools]]** by [[ErikEJ]] — GUI reverse engineering + DGML model visualization. VS 2022 extension + cross-platform CLI (`efcpt`). 2.5k stars, MIT. Companion packages: `ErikEJ.EntityFrameworkCore.DgmlBuilder` ([[DGML Model Visualization]]), `ErikEJ.EntityFrameworkCore.SqlServer.Dacpac` (dacpac reverse engineering). AWS-sponsored.
- **Entity Framework Extensions** (ZZZ Projects, paid) — bulk operations including [[BulkSynchronize]] (server-side MERGE via staging table).

## Source

Ingested via [[30-ef-core-interview-questions]] — a 30-question interview-prep article by [[Mukesh Murugan]], accurate for EF Core 10 / .NET 10 as of 2026-06-24.
