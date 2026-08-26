---
address: c-304
type: source
title: "Batching Like a Boss: Using IDbContextFactory for High-Performance EF Core Updates"
source_url: "https://woodruff.dev/batching-like-a-boss-using-idbcontextfactory-for-high-performance-ef-core-updates/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-04
ingested: 2026-07-03
tags:
  - source
  - blog
  - dotnet
  - ef-core
  - performance
related:
  - "[[EF Core Batch Updates]]"
  - "[[EF Core IDbContextFactory]]"
  - "[[DbContext Pooling]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
---

# Batching Like a Boss: Using IDbContextFactory for High-Performance EF Core Updates

Source URL: https://woodruff.dev/batching-like-a-boss-using-idbcontextfactory-for-high-performance-ef-core-updates/
Author: [[Chris Woodruff]]
Published: 2025-02-04

## Summary

Follow-up to Woodruff's earlier batching post, incorporating reader feedback from MaxiTB on Mastodon. Covers three layers of EF Core batch-performance optimization:

1. **Batch-and-save-once** — modify all entities in the change tracker before calling `SaveChanges()` once, instead of calling `SaveChanges()` inside the loop (which sends one `UPDATE` per record).
2. **IDbContextFactory\<TContext>** — creates fresh `DbContext` instances on demand via `AddDbContextFactory<T>()`, avoiding long-lived-context memory leaks, ensuring thread safety, and working with built-in pooling.
3. **Chunking for large batches** — iterate with `Skip/Take`, create one context per chunk of ~100, call `UpdateRange()` per chunk.

## Key Content

- Registration: `services.AddDbContextFactory<MyDbContext>(options => options.UseSqlServer("..."))` in `Program.cs`.
- Usage pattern: inject `IDbContextFactory<MyDbContext>`, call `_contextFactory.CreateDbContext()` per batch, wrap in `using` for disposal and pool return.
- Chunking strategy for large batches: `batchSize = 100`, iterate with `Skip/Take`, create one context per chunk, call `UpdateRange()` per chunk.
- Non-SQL Server fallbacks: raw SQL (`ExecuteSqlRawAsync`), chunked processing, or bulk extensions (`EFCore.BulkExtensions`) for MySQL/SQLite/PostgreSQL.

## Database Batch Support Table

| Database   | Batch Inserts | Batch Updates | Notes |
|------------|:---:|:---:|-------|
| SQL Server | Yes | Yes | Best batching support |
| PostgreSQL | Yes | Limited | Row-by-row unless optimized |
| MySQL      | Limited | No | Bulk updates need custom logic |
| SQLite     | No | No | One statement at a time |

## Takeaways

- Never `SaveChanges()` in a loop — batch modifications and save once.
- `IDbContextFactory` prevents long-lived DbContext issues (memory leaks, concurrency bugs).
- Chunk large operations to avoid memory pressure.
- Know your database's batch capabilities: what works on SQL Server may not translate to MySQL or SQLite.

## Related Pages

- [[EF Core Batch Updates]] — concept synthesis of the batch-update pattern
- [[EF Core IDbContextFactory]] — concept synthesis of the factory + pooling pattern
- [[DbContext Pooling]] — `AddDbContextPool<T>()` for scoped-lifetime pooling
- [[Chris Woodruff]] — author entity
- [[Entity Framework Core]] — product entity
