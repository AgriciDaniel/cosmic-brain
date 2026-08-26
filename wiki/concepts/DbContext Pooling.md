---
address: c-319
type: concept
title: "DbContext Pooling"
tags:
  - concept
  - dotnet
  - ef-core
  - performance
  - orm
status: developing
aliases:
  - "EF Core DbContext Pooling"
  - "AddDbContextPool"
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
  - "[[Chris Woodruff]]"
sources:
  - "[[dbcontext-pooling-chris-woodruff]]"
created: 2026-07-03
---

# DbContext Pooling

Navigation: [[index]] | [[concepts/_index|Concepts]]

## What It Is

DbContext Pooling is an EF Core feature that pre-creates a pool of DbContext instances and reuses them across requests, instead of creating a new DbContext for every request. Activated via `AddDbContextPool<T>()` instead of `AddDbContext<T>()` in service registration.

## How It Works

Without pooling, EF Core creates and disposes a DbContext per request. Under high load, this means thousands of object allocations and garbage collections. With pooling, EF Core maintains a pool of pre-configured instances: each request borrows one, uses it, and returns it to the pool. EF Core automatically resets the state of returned instances.

## Performance

Observed benchmarks (from Chris Woodruff, 2025):

- **Without pooling:** 64,637 contexts created, 6,395 requests/second
- **With pooling:** 32 contexts created, 15,714 requests/second

Throughput more than doubles while allocations drop by ~2000x.

## Configuration

```csharp
services.AddDbContextPool<YourDbContext>(options =>
    options.UseSqlServer("YourConnectionString"));
```

The pool size defaults to 128 (the maximum number of contexts retained). This is configurable via the optional `poolSize` parameter.

## Restrictions

1. **Stateless DbContext** — the context must not hold references to scoped services, because the same instance outlives any single request scope.
2. **Reset discipline** — EF Core resets tracked entities and navigation properties automatically, but custom state (static fields, manual internal caches) must be reset by the developer.
3. **Not always faster** — workloads with very long-lived contexts or heavy per-request customization may not benefit. Always benchmark.

## Relationship to DbContext Lifetime

Standard `AddDbContext<T>()` registers DbContext as **scoped** (one per request). `AddDbContextPool<T>()` also provides scoped behavior from the caller's perspective — each request gets a unique context from the pool, returned afterward — but the internal lifetime is pooled rather than created/destroyed.

## See Also

- [[Entity Framework Core]] — the ORM this feature belongs to
- [[EF Core DbContext Lifetime and Configuration]] — scoped vs. pooled registration patterns
- [[dbcontext-pooling-chris-woodruff]] — source article by Chris Woodruff (2025-01-25)
