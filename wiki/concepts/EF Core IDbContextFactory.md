---
address: c-323
type: concept
title: "EF Core IDbContextFactory"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - performance
  - dependency-injection
  - factory-pattern
status: developing
aliases:
  - "IDbContextFactory"
related:
  - "[[DbContext Pooling]]"
  - "[[EF Core Batch Updates]]"
  - "[[EF Core DbContext Lifetime and Configuration]]"
  - "[[Entity Framework Core]]"
  - "[[Chris Woodruff]]"
sources:
  - "[[ef-core-idbcontextfactory-batching]]"
---

# EF Core IDbContextFactory

Navigation: [[index]] | [[concepts/_index|Concepts]]

## What It Is

`IDbContextFactory<TContext>` is an EF Core factory interface that creates fresh `DbContext` instances on demand, registered via `AddDbContextFactory<T>()`. Unlike the default scoped `DbContext` (one per HTTP request), the factory gives the caller explicit control over when contexts are created and disposed.

## How It Differs from Scoped DbContext and AddDbContextPool

| Approach | Registration | Lifetime control | Pooling |
|----------|-------------|-----------------|---------|
| Scoped `DbContext` | `AddDbContext<T>()` | DI container (per request) | No |
| Pooled scoped | `AddDbContextPool<T>()` | DI container (per request) | Yes |
| Factory | `AddDbContextFactory<T>()` | Caller (manual create/dispose) | Yes (built-in) |

`AddDbContextFactory<T>()` **includes pooling by default** — it maintains a pool of pre-warmed instances. `CreateDbContext()` pulls from the pool; `Dispose()` (via `using`) returns the instance to the pool.

## Registration

```csharp
services.AddDbContextFactory<MyDbContext>(options =>
    options.UseSqlServer("Your_Connection_String")
);
```

## Usage Pattern

```csharp
public class BatchUpdateService
{
    private readonly IDbContextFactory<MyDbContext> _contextFactory;

    public BatchUpdateService(IDbContextFactory<MyDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task ProcessBatchAsync(List<int> orderIds)
    {
        using var context = _contextFactory.CreateDbContext();
        // Fresh, clean change tracker for this batch
        var orders = await context.Orders
            .Where(o => orderIds.Contains(o.Id))
            .ToListAsync();
        foreach (var order in orders) { order.Status = "Processed"; }
        await context.SaveChangesAsync();
    }
}
```

## Why Use It

- **Batch operations** — one short-lived context per chunk, avoiding change-tracker bloat.
- **Background services** (`IHostedService`) — no request scope exists; the factory provides on-demand contexts.
- **Multi-threaded processing** — `DbContext` is not thread-safe; each thread creates its own instance from the pool.
- **No long-lived context issues** — each `using` block gets a fresh, clean instance and returns it to the pool.

## When NOT to Use

In standard ASP.NET Core request/response flows, the default scoped `AddDbContext<T>()` or `AddDbContextPool<T>()` is simpler and sufficient. The factory adds ceremony without benefit when request-scoped lifetime already provides correct disposal.

## See Also

- [[DbContext Pooling]] — the `AddDbContextPool<T>()` pattern for scoped-lifetime pooling (>2x throughput)
- [[EF Core Batch Updates]] — the chunked-batch pattern that pairs with the factory
- [[EF Core DbContext Lifetime and Configuration]] — default scoped model and trade-offs
- [[Entity Framework Core]] — product entity
- [[ef-core-idbcontextfactory-batching]] — source article by Chris Woodruff (2025-02-04)
