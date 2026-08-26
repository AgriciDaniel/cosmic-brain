---
address: c-300
type: source
title: "DbContext Pooling: The Secret Sauce to Faster EF Core Apps"
author: "[[Chris Woodruff]]"
url: "https://woodruff.dev/dbcontext-pooling-the-secret-sauce-to-faster-ef-core-apps/"
published: 2025-01-25
ingested: 2026-07-03
source_file: ".raw/notes/2026-07-03/DbContext Pooling The Secret Sauce to Faster EF Core Apps - Chris Woody Woodruff.md"
tags:
  - source
  - dotnet
  - ef-core
  - performance
  - dbcontext
status: developing
related:
  - "[[DbContext Pooling]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
---

# DbContext Pooling: The Secret Sauce to Faster EF Core Apps

**Author:** [[Chris Woodruff]] (woodruff.dev)
**Published:** 2025-01-25

## Summary

A practical guide to EF Core's `AddDbContextPool<T>()` feature. The metaphor: creating a new DbContext per request is like buying a new frying pan for every restaurant order. Pooling pre-creates DbContext instances and reuses them across requests, delivering more than double the throughput with minimal code changes.

## Key Content

### Performance Comparison

| Metric | Without Pooling | With Pooling |
|---|---|---|
| Total contexts created | 64,637 | 32 |
| Requests per second | 6,395 | 15,714 |

Result: **more than double the throughput** with significantly fewer allocations.

### Configuration

```csharp
services.AddDbContextPool<YourDbContext>(options =>
    options.UseSqlServer("YourConnectionString"));
```

Replaces `AddDbContext<T>()` with `AddDbContextPool<T>()` — a one-line change.

### Caveats

1. **No scoped dependencies** — DbContext must be stateless; no references to scoped-lifetime services.
2. **Reset state** — EF Core auto-resets pooled DbContext state, but custom tracking or fancy patterns may leave residues.
3. **Not universal** — test your app; pooling benefits most but not all workloads.

## Pages Created

- [[DbContext Pooling]] (concept)
