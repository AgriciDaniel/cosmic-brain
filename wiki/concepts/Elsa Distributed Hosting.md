---
type: concept
title: "Elsa Distributed Hosting"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - distributed
  - hosting
  - scaling
  - clustering
  - kubernetes
status: developing
address: c-000069
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Workers]]"
  - "[[Elsa Multitenancy]]"
---

# Elsa Distributed Hosting

When deploying [[entities/Elsa Workflows]] in a distributed environment, four components must be configured to ensure reliability and consistency across nodes.

---

## 1. Distributed Runtime

The default `LocalWorkflowRuntime` is unsuitable for multi-node deployments. Use one of:

- **`DistributedWorkflowRuntime`** — coordinates execution across nodes
- **`ProtoActorWorkflowRuntime`** — actor-based model for high-scale scenarios

Enable distributed runtime:

```csharp
elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseDistributedRuntime();
});
```

> [!warning]
> A distributed locking provider MUST be configured when using the distributed runtime.

---

## 2. Distributed Locking

Prevents multiple nodes from executing the same workflow instance concurrently. Locks are acquired via a shared resource lease.

| Provider | Description |
|----------|-------------|
| PostgreSQL | `PostgresDistributedSynchronizationProvider` with keepalive cadence and multiplexing |
| Redis | Redis-based distributed lock manager |
| Blob Storage | Cloud blob lease mechanism |

```csharp
elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseDistributedRuntime();
    runtime.DistributedLockProvider = sp =>
        new PostgresDistributedSynchronizationProvider(connectionString, options =>
        {
            options.KeepaliveCadence(TimeSpan.FromMinutes(5));
            options.UseMultiplexing();
        });
});
```

> [!warning]
> The default filesystem-based lock provider is for development only. It is unreliable for production multi-node deployments, even on shared network folders.

---

## 3. Distributed Caching

Each node maintains a local in-memory cache for workflow definitions. Consistency is achieved through event-driven pub/sub cache invalidation, enabled via `DistributedCacheFeature`:

```csharp
elsa.UseDistributedCache(distributedCaching =>
{
    distributedCaching.UseMassTransit();
});
```

With MassTransit, configure a message broker like RabbitMQ:

```csharp
elsa.UseMassTransit(massTransit =>
{
    massTransit.UseRabbitMq(connectionString, rabbit => rabbit.ConfigureTransportBus =
        (context, bus) =>
        {
            bus.PrefetchCount = 50;
            bus.Durable = true;
            bus.AutoDelete = false;
            bus.ConcurrentMessageLimit = 32;
        });
});
```

---

## 4. Quartz.NET Clustering

When workflows use scheduled activities (Timer, Cron, Delay), Quartz.NET clustering ensures each job executes only once across the cluster.

### Requirements

Quartz clustering is required when ALL of the following are true:
1. Two or more Elsa instances are running
2. Quartz scheduler is enabled via `UseScheduling(s => s.UseQuartzScheduler())`
3. Workflows use Timer, Cron, or Delay activities

### Configuration

Elsa automatically enables clustering when a database-backed Quartz provider is configured:

```csharp
elsa.UseScheduling(scheduling =>
{
    scheduling.UseQuartzScheduler();
});

elsa.UseQuartz(quartz =>
{
    quartz.UsePostgreSql(postgresConnectionString);
    // Clustering is auto-enabled!
});
```

Supported database providers: PostgreSQL, SQL Server, MySQL (all auto-enable clustering).

### How It Works

1. Quartz.NET creates tables in the database (prefixed with `qrtz_`)
2. Each node registers in `qrtz_scheduler_state`
3. Nodes coordinate via database locks — only one node executes each scheduled job
4. On node failure, other nodes automatically pick up its jobs (failover)

### Advanced Customization

```csharp
elsa.UseQuartz(quartz =>
{
    quartz.UsePersistentStore(store =>
    {
        store.UsePostgres(postgres => postgres.ConnectionString = connectionString);
        store.UseClustering(clustering =>
        {
            clustering.CheckinInterval = TimeSpan.FromSeconds(20);
            clustering.CheckinMisfireThreshold = TimeSpan.FromSeconds(60);
        });
    });
});
```

---

## Summary

| Component | Purpose | Example |
|-----------|---------|---------|
| **Distributed Runtime** | Synchronized workflow execution | `UseDistributedRuntime()` |
| **Distributed Locking** | Prevent concurrent instance access | PostgreSQL/Redis provider |
| **Distributed Caching** | Propagate cache invalidations | MassTransit + RabbitMQ |
| **Quartz Clustering** | Coordinate scheduled jobs | Auto-enabled with DB provider |

See also [[Elsa Workers]] for configuring per-node concurrency and [[Elsa Multitenancy]] for multi-tenant isolation in distributed setups.
