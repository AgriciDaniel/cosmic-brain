---
type: concept
title: "Fusion HelloCart Tutorial"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - tutorial
  - sample
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion CommandR]]"
  - "[[Fusion Operations Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion HelloCart Tutorial

A step-by-step walkthrough that builds a simple product/cart API from a toy version to a production-ready distributed system using Fusion, EF Core, and multi-host invalidation.

## Get Started

Clone the repo and open the sample:

```bash
git clone https://github.com/ActualLab/Fusion
cd samples/HelloCart
```

## The Model

Two immutable records:

```csharp
public partial record Product(string Id, decimal Price) : IHasId<string>;
public partial record Cart(string Id) : IHasId<string>
{
    public ImmutableDictionary<string, decimal> Items { get; init; }
        = ImmutableDictionary<string, decimal>.Empty;
}
```

Records and `IHasId<string>` are optional — Fusion doesn't require either.

## The Services

```csharp
public interface IProductService : IComputeService
{
    [ComputeMethod] Task<Product?> Get(string id, CancellationToken ct = default);
    [CommandHandler] Task Edit(EditCommand<Product> command, CancellationToken ct = default);
}

public interface ICartService : IComputeService
{
    [ComputeMethod] Task<Cart?> Get(string id, CancellationToken ct = default);
    [CommandHandler] Task Edit(EditCommand<Cart> command, CancellationToken ct = default);
    [ComputeMethod] Task<decimal> GetTotal(string id, CancellationToken ct = default);
}
```

## Progression

The sample progresses through these stages:

1. **In-memory, no Fusion** — basic implementation
2. **Add Fusion** — `[ComputeMethod]`, `[CommandHandler]`, `Invalidation.Begin()`
3. **Add EF Core** — `DbHub<TDbContext>`, `CreateDbContext()`, `CreateOperationDbContext()`
4. **Add RPC** — expose services over WebSocket, consume via Compute Service Clients
5. **Add Operations Framework** — multi-host invalidation across server instances

Each stage builds on the previous, showing the incremental value of each Fusion layer.

## Key Patterns Demonstrated

- Compute method with dependency tracking (`GetTotal` depends on `Get`)
- Command handler with invalidation pass (`Invalidation.IsActive`)
- DbContext management (`DbHub`, read-only vs operation-scoped)
- Remote compute service clients
- Multi-host invalidation via Operations Framework
