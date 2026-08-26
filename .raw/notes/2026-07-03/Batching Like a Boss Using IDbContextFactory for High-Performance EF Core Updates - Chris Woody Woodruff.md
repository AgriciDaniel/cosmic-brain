---
title: "Batching Like a Boss: Using IDbContextFactory for High-Performance EF Core Updates - Chris Woody Woodruff"
source: "https://woodruff.dev/batching-like-a-boss-using-idbcontextfactory-for-high-performance-ef-core-updates/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-04
created: 2026-07-03
description: "I love receiving feedback on my blog posts! After sharing \"Batching Updates and Inserts: Making EF Core Work Smarter, Not Harder,\" I received some great comments, especially from MaxiTB on Mastodon, which I wanted to share. Batch operations—whether inserting or updating multiple records—can quickly lead to performance issues, particularly when DbContext is misused. However, with"
tags:
  - "clippings"
---
![Batching Like a Boss: Using IDbContextFactory for High-Performance EF Core Update](https://woodruff.dev/wp-content/uploads/2025/02/IDbContextFactory-EF-Core-Updates-150x150.webp)

I love receiving feedback on my blog posts! After sharing “ [Batching Updates and Inserts: Making EF Core Work Smarter, Not Harder](https://woodruff.dev/batching-updates-and-inserts-making-ef-core-work-smarter-not-harder/),” I received some great comments, especially from [MaxiTB](https://mastodon.social/@maxitb) on Mastodon, which I wanted to share.

Batch operations—whether inserting or updating multiple records—can quickly lead to performance issues, particularly when **DbContext** is misused. However, with the helpful support of **IDbContextFactory** and **DbContext Pooling**, you can optimize batch processing, ensuring your application remains **fast, scalable, and thread-safe**.

Let’s break it down and see how **you can batch like a boss in EF Core!**

---

## The Problem: DbContext and Batch Operations

By default, EF Core allows **batching of inserts and updates** when possible. But if you’re calling `SaveChanges()` in a loop, you’re in for a **bad time**.

### The Wrong Way: Multiple DbContext Saves

foreach (var order in orders)

{

order.Status = "Processed";

await context.SaveChangesAsync(); // Too many database calls!

}

foreach (var order in orders) { order.Status = "Processed"; await context.SaveChangesAsync(); // Too many database calls! }

```js
foreach (var order in orders)
{
    order.Status = "Processed";
    await context.SaveChangesAsync(); // Too many database calls!
}
```

This sends **one update statement per record**, causing **tons of unnecessary database trips**. Not great for performance.

### The Better Way: Batch and Save Once

foreach (var order in orders)

{

order.Status = "Processed";

}

await context.SaveChangesAsync(); // One batch update!

foreach (var order in orders) { order.Status = "Processed"; } await context.SaveChangesAsync(); // One batch update!

```js
foreach (var order in orders)
{
    order.Status = "Processed";
}
await context.SaveChangesAsync(); // One batch update!
```

This **combines updates into a single database transaction** —MUCH faster!

But wait—there’s more! **DbContext Pooling + `IDbContextFactory`** can take this a step further.

---

## Why IDbContextFactory\<TContext>?

`IDbContextFactory<TContext>` **creates new DbContext instances on demand** rather than relying on **scoped dependencies**. This is **super useful** in batch operations because:

- **Prevents long-lived DbContext issues** (no memory leaks!)
- **Thread-safe batch processing** (no concurrency nightmares)
- **Works great with DbContext Pooling** (better resource management)

### How to Register IDbContextFactory in EF Core

To use `IDbContextFactory`, update your **DI configuration** in `Program.cs`:

services.AddDbContextFactory\<MyDbContext>(options =>

options.UseSqlServer("Your\_Connection\_String")

);

services.AddDbContextFactory\<MyDbContext>(options => options.UseSqlServer("Your\_Connection\_String") );

```js
services.AddDbContextFactory<MyDbContext>(options =>
    options.UseSqlServer("Your_Connection_String")
);
```

Boom! Now, we have **a factory to create fresh DbContext instances** whenever needed.

---

## Using IDbContextFactory for Batch Updates

Instead of keeping a **single DbContext instance for all batch operations**, let’s **create a new one per batch** using `IDbContextFactory`.

### The Right Way: Use IDbContextFactory for Batch Updates

public class BatchUpdateService

{

private readonly IDbContextFactory\<MyDbContext> \_contextFactory;

public BatchUpdateService(IDbContextFactory\<MyDbContext> contextFactory)

{

\_contextFactory = contextFactory;

}

public async Task ProcessBatchUpdatesAsync(List\<int> orderIds)

{

using var context = \_contextFactory.CreateDbContext(); // Fresh context for this batch

var orders = await context.Orders

.Where(o => orderIds.Contains(o.Id))

.ToListAsync();

foreach (var order in orders)

{

order.Status = "Processed";

}

await context.SaveChangesAsync(); // Batch update, single trip to DB!

}

}

public class BatchUpdateService { private readonly IDbContextFactory\<MyDbContext> \_contextFactory; public BatchUpdateService(IDbContextFactory\<MyDbContext> contextFactory) { \_contextFactory = contextFactory; } public async Task ProcessBatchUpdatesAsync(List\<int> orderIds) { using var context = \_contextFactory.CreateDbContext(); // Fresh context for this batch var orders = await context.Orders.Where(o => orderIds.Contains(o.Id)).ToListAsync(); foreach (var order in orders) { order.Status = "Processed"; } await context.SaveChangesAsync(); // Batch update, single trip to DB! } }

```js
public class BatchUpdateService
{
    private readonly IDbContextFactory<MyDbContext> _contextFactory;

    public BatchUpdateService(IDbContextFactory<MyDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task ProcessBatchUpdatesAsync(List<int> orderIds)
    {
        using var context = _contextFactory.CreateDbContext(); // Fresh context for this batch

        var orders = await context.Orders
            .Where(o => orderIds.Contains(o.Id))
            .ToListAsync();

        foreach (var order in orders)
        {
            order.Status = "Processed";
        }

        await context.SaveChangesAsync(); // Batch update, single trip to DB!
    }
}
```

### Why This is Awesome:

- **Each batch gets a fresh DbContext** (avoiding conflicts).
- **Ensures DbContext is disposed properly** after the batch completes.
- **Plays nice with DbContext Pooling**, improving efficiency.

---

## How Different Databases Handle Batch Updates

Not all databases handle batch operations the same way. **SQL Server** does it well, but other databases? Not so much.

| **Database** | **Batch Inserts** | **Batch Updates** | **Notes** |
| --- | --- | --- | --- |
| **SQL Server** | Yes | Yes | Best support for batching |
| **PostgreSQL** | Yes | **Limited** | Updates row-by-row unless optimized |
| **MySQL** | **Limited** | **No** | Bulk updates require custom logic |
| **SQLite** | **No** | **No** | One statement at a time |

### Optimizing Batching for Non-SQL Server Databases

If you’re **not using SQL Server**, here are some ways to speed things up:

**1\. Use Raw SQL for Updates**

await context.Database.ExecuteSqlRawAsync(

"UPDATE Orders SET Status = 'Processed' WHERE Id IN ({0})", orderIds);

await context.Database.ExecuteSqlRawAsync( "UPDATE Orders SET Status = 'Processed' WHERE Id IN ({0})", orderIds);

```js
await context.Database.ExecuteSqlRawAsync(
    "UPDATE Orders SET Status = 'Processed' WHERE Id IN ({0})", orderIds);
```

**2\. Process Large Batches in Chunks**

const int batchSize = 100;

for (int i = 0; i < orders.Count; i += batchSize)

{

var batch = orders.Skip(i).Take(batchSize).ToList();

using var context = \_contextFactory.CreateDbContext();

context.Orders.UpdateRange(batch);

await context.SaveChangesAsync();

}

const int batchSize = 100; for (int i = 0; i < orders.Count; i += batchSize) { var batch = orders.Skip(i).Take(batchSize).ToList(); using var context = \_contextFactory.CreateDbContext(); context.Orders.UpdateRange(batch); await context.SaveChangesAsync(); }

```js
const int batchSize = 100;
for (int i = 0; i < orders.Count; i += batchSize)
{
    var batch = orders.Skip(i).Take(batchSize).ToList();
    using var context = _contextFactory.CreateDbContext();
    context.Orders.UpdateRange(batch);
    await context.SaveChangesAsync();
}
```

**This prevents loading too much data into memory at once!**

**3\. Use Bulk Extensions for Faster Writes**  
For databases like MySQL or SQLite, **EFCore.BulkExtensions** is a lifesaver:

await context.BulkUpdateAsync(orders);

await context.BulkUpdateAsync(orders);

```js
await context.BulkUpdateAsync(orders);
```

---

## Final Takeaways: Batch Like a Pro!

Batch processing in EF Core **doesn’t have to be slow**. By combining:

- **Efficient Batching** (saving once per batch)
- **IDbContextFactory for Fresh DbContext Instances**
- **DbContext Pooling for Performance**
- **Optimized Queries for Non-SQL Server Databases**

You can **level up your batch updates** and **keep your app blazing fast**!

So, what’s your **go-to strategy** for batching updates? Have you tried **`IDbContextFactory`** in your EF Core projects? Let’s chat in the comments!

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)