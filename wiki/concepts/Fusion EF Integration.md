---
type: concept
title: "Fusion Entity Framework Integration"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - ef-core
  - database
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Operations Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Entity Framework Integration

`ActualLab.Fusion.EntityFramework` provides extensions for EF Core in Fusion applications: DbContext management, sharding, and efficient entity loading. Used internally by the [[Fusion Operations Framework]] and useful standalone.

## Required Package

| Package | Purpose |
|---------|---------|
| `ActualLab.Fusion.EntityFramework` | DbHub, sharding, entity resolvers |

## DbHub\<TDbContext\>

The central hub for database operations. Provides DbContext creation, sharding, and version generation.

```csharp
services.AddDbContextServices<AppDbContext>(db => {
    db.AddDbContextFactory(dbContext => {
        dbContext.UseNpgsql(connectionString);
    });
});
```

### Creating DbContexts

```csharp
public class TodoService(DbHub<AppDbContext> dbHub) : IComputeService
{
    [ComputeMethod]
    public virtual async Task<Todo[]> GetAll(CancellationToken ct = default)
    {
        // Read-only DbContext (no change tracking)
        await using var dbContext = await dbHub.CreateDbContext(ct);
        return await dbContext.Todos.ToArrayAsync(ct);
    }

    [CommandHandler]
    public virtual async Task Create(CreateTodoCommand cmd, CancellationToken ct = default)
    {
        if (Invalidation.IsActive) {
            _ = GetAll(default);
            return;
        }
        // Operation-scoped DbContext (participates in outbox transaction)
        await using var dbContext = await dbHub.CreateOperationDbContext(ct);
        dbContext.Todos.Add(new DbTodo { Id = cmd.Id, Title = cmd.Title });
        await dbContext.SaveChangesAsync(ct);
    }
}
```

### DbContext Methods

| Method | Use Case |
|--------|----------|
| `CreateDbContext()` | Read-only queries in compute methods |
| `CreateDbContext(readWrite: true)` | Direct writes (rare) |
| `CreateOperationDbContext()` | Command handlers with Operations Framework |

```csharp
// Convert read-only to read-write
dbContext.ReadWrite();

// Or pass parameter
await using var dbContext = await dbHub.CreateDbContext(readWrite: true, ct);

// Enable change tracking on a read-only context
dbContext.EnableChangeTracking(mustEnable: true);
```

By default, `CreateDbContext()` returns a read-only context with change tracking and `SaveChanges` disabled for safety.

## Sharding

Fusion supports database sharding via `DbShard` and `DbShardRegistry`:

```csharp
services.AddDbContextServices<AppDbContext>(db => {
    db.AddShard<DbShard>("shard-1", "Host=server1;Database=db1");
    db.AddShard<DbShard>("shard-2", "Host=server2;Database=db2");
});
```

`IDbShardResolver` maps entities to shards. The `DbShardRegistry` tracks all available shards and their connection strings.

## DbEntityResolver

Efficiently resolves entity references without full queries. Core types:

- `DbEntityResolver<TDbContext, TKey, TEntity>` — resolves entities by key with batching
- `DbEntityConverter<TDbContext, TKey, TEntity>` — converts keys to entities

## Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `ShardResolver` | `IDbShardResolver` | Resolves shard for a source |
| `ShardRegistry` | `IDbShardRegistry` | All available shards |
| `ContextFactory` | `IShardDbContextFactory` | DbContext factory |
| `VersionGenerator` | `VersionGenerator<long>` | Monotonic version numbers |
