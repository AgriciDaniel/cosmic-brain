---
address: c-321
type: concept
title: "EF Core Batch Updates"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - performance
  - batching
status: developing
related:
  - "[[EF Core DbContext Pooling]]"
  - "[[EF Core Change Tracking and Saving]]"
  - "[[Entity Framework Core]]"
  - "[[SQL Server Large Write Operation Contention]]"
sources:
  - "[[ef-core-idbcontextfactory-batching]]"
---

# EF Core Batch Updates

Efficiently updating multiple records in Entity Framework Core by grouping changes into the minimum number of database round-trips.

## The Anti-Pattern: SaveChanges() in a Loop

```csharp
foreach (var order in orders)
{
    order.Status = "Processed";
    await context.SaveChangesAsync(); // One UPDATE per record
}
```

This sends **N round-trips** for N records. Each `SaveChanges()` generates its own transaction, and the change tracker grows without benefit.

## The Pattern: Modify First, Save Once

```csharp
foreach (var order in orders)
{
    order.Status = "Processed";
}
await context.SaveChangesAsync(); // Single batch UPDATE
```

EF Core combines all tracked changes into one DML batch (on SQL Server). On EF Core 7+, even server-side bulk operations are available:

```csharp
await context.Orders
    .Where(o => orderIds.Contains(o.Id))
    .ExecuteUpdateAsync(s => s.SetProperty(o => o.Status, "Processed"));
```

`ExecuteUpdateAsync` bypasses the change tracker entirely and sends one targeted `UPDATE` statement.

## Chunking for Large Batches

Loading thousands of entities into the change tracker causes memory pressure and slow `SaveChanges`. Chunk:

```csharp
const int batchSize = 100;
for (int i = 0; i < orders.Count; i += batchSize)
{
    var batch = orders.Skip(i).Take(batchSize).ToList();
    using var context = _contextFactory.CreateDbContext();
    context.Orders.UpdateRange(batch);
    await context.SaveChangesAsync();
}
```

## Cross-Database Considerations

EF Core's batch behavior is provider-dependent. SQL Server natively supports multi-statement batches. PostgreSQL/MySQL/SQLite have limited or no batch UPDATE support from the provider — chunking with raw SQL (`ExecuteSqlRawAsync`) or bulk-extension libraries (`EFCore.BulkExtensions`) fills the gap.

## Related

- [[EF Core DbContext Pooling]] — factory pattern that makes chunked batch contexts efficient
- [[EF Core Change Tracking and Saving]] — how the snapshot change tracker works under the hood
- [[SQL Server Large Write Operation Contention]] — what happens on the DB side with unbatched bulk writes
- [[N+1 Query Problem]] — the query-side analog: 1+N round-trips instead of one set-based fetch
