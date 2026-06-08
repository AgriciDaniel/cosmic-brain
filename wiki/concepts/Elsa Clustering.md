---
type: concept
title: "Elsa Clustering"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - clustering
  - distributed-systems
  - dotnet
status: developing
address: c-000062
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Deployment]]"
  - "[[Elsa Workflow Dispatcher]]"
  - "[[Elsa Security]]"
---

# Elsa Clustering

Running [[entities/Elsa Workflows]] across multiple nodes introduces challenges around distributed locking, cache invalidation, scheduled task coordination, and state consistency. Elsa's clustering support addresses these with pluggable infrastructure backed by proven distributed coordination primitives.

---

## Challenges in a Multi-Node Environment

When multiple Elsa nodes share a workload, three core problems emerge:

| Problem | Cause | Consequence |
|---------|-------|-------------|
| Duplicate timer execution | Each node fires the same cron/timer trigger | Workflow runs N times instead of once |
| Concurrent modification | Two nodes resume the same bookmark simultaneously | Data corruption or duplicate processing |
| Stale cache | Node A updates data, Node B serves stale cache | Inconsistent workflow state |

---

## Architecture Patterns

Elsa supports four clustering patterns, each offering different trade-offs:

### Pattern 1: Database as the Source of Truth (Simplest)

All nodes share a single database. No locking required for read-mostly operations. Suitable for low-contention scenarios with fewer than 5 nodes.

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Node A   │   │ Node B   │   │ Node C   │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     └──────────────┼──────────────┘
                    │
            ┌───────┴───────┐
            │   Database    │
            └───────────────┘
```

### Pattern 2: Database + Distributed Locking

Adds distributed locking for critical sections (bookmark resumption, timer execution). Prevents duplicates and concurrent modification. Recommended pattern for most production deployments.

### Pattern 3: Database + Distributed Locking + Distributed Cache

Adds a distributed cache (Redis) to reduce database load. Cache invalidation uses a pub/sub channel. Best for read-heavy workloads.

### Pattern 4: Full Mesh with Messaging

All nodes communicate via a message bus (MassTransit + RabbitMQ). State changes broadcast invalidation messages. Highest complexity but maximum performance.

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Node A   │◄──┤ Node B   │──►│ Node C   │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │
     └──────────────┼──────────────┘
                    │
            ┌───────┴───────┐
            │   Message Bus │
            │  (RabbitMQ)   │
            └───────────────┘
```

---

## Distributed Locking

Elsa uses [Medallion.Threading](https://github.com/madelson/Medallion.Threading) for distributed coordination. Supported lock providers:

| Provider | Implementation | Use Case |
|----------|---------------|----------|
| Redis | `RedisDistributedSynchronizationProvider` | Fast, low-latency locking; requires Redis |
| PostgreSQL | `PostgreSqlDistributedSynchronizationProvider` | No extra infrastructure; uses existing DB |
| SQL Server | `SqlDistributedSynchronizationProvider` | For SQL Server backends |
| Azure Blob | `AzureBlobLeaseDistributedSynchronizationProvider` | For Azure-deployed instances |

### Redis Lock Setup

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

// Distributed locking with Redis
builder.Services.AddSingleton<IDistributedLockProvider>(sp =>
{
    var connection = ConnectionMultiplexer.Connect("localhost:6379");
    return new RedisDistributedSynchronizationProvider(connection.GetDatabase());
});
```

### PostgreSQL Lock Setup

```csharp
builder.Services.AddSingleton<IDistributedLockProvider>(sp =>
{
    var connectionString = sp.GetRequiredService<IConfiguration>()
        .GetConnectionString("Elsa");
    return new NpgsqlDistributedSynchronizationProvider(connectionString);
});
```

> [!info] Lock Scope
> Distributed locks protect specific operations: bookmark resumption, timer firing, and workflow instance creation. Read operations (listing definitions, viewing instances) do not require locking.

---

## Cache Invalidation

Elsa's caching layer requires explicit invalidation when data changes. In a cluster, Node A may update a workflow definition, but Node B still serves the stale cached version.

### Redis Cache with Pub/Sub Invalidation

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
});

// Invalidation via Redis pub/sub
builder.Services.AddSingleton<ICacheInvalidator>(sp =>
{
    var connection = sp.GetRequiredService<IConnectionMultiplexer>();
    return new RedisCacheInvalidator(connection);
});
```

### MassTransit + RabbitMQ Invalidation

For larger clusters, use a message bus for invalidation:

```csharp
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq://localhost");
        cfg.ReceiveEndpoint("elsa-cache", e =>
        {
            e.Consumer<CacheInvalidationConsumer>(context);
        });
    });
});
```

---

## Quartz.NET Clustering

Elsa uses Quartz.NET for scheduled workflow execution (timers, cron triggers). Quartz supports database-backed clustering out of the box.

### Quartz Cluster Configuration

```csharp
builder.Services.AddQuartz(quartz =>
{
    quartz.UsePersistentStore(store =>
    {
        store.UsePostgreSql(postgres =>
        {
            postgres.ConnectionString = connectionString;
        });
        store.UseClustering(cluster =>
        {
            cluster.CheckinInterval = TimeSpan.FromSeconds(20);
            cluster.MisfireThreshold = TimeSpan.FromSeconds(60);
        });
    });
});
```

**How it works:**
1. Each node shares the same Quartz database table
2. Nodes compete for scheduler locks (database row-level locks)
3. The winning node fires the trigger, other nodes skip
4. If a node fails, another picks up its misfired triggers

### Kubernetes Deployment for Clustered Quartz

```yaml
replicas: 3
env:
- name: Quartz__Clustering__Enabled
  value: "true"
- name: ConnectionStrings__Quartz
  valueFrom:
    secretKeyRef:
      name: quartz-db
      key: connection-string
```

> [!warning] Shared Database Required
> Quartz clustering requires all nodes to point to the same Quartz schema in a shared database. Each node must have the same clock (NTP synchronized) for misfire detection to work correctly.

---

## Validation Checklist

Before deploying a cluster:

- [ ] Distributed locking provider configured (Redis or PostgreSQL)
- [ ] Shared database accessible from all nodes
- [ ] Quartz clustering enabled with shared store
- [ ] Cache invalidation configured (Redis pub/sub or message bus)
- [ ] All nodes synchronized via NTP
- [ ] Health check endpoints responding on all nodes
- [ ] Pod Disruption Budget configured (minAvailable >= 1)
- [ ] Network policy allows inter-node communication
- [ ] Sticky sessions disabled for API endpoints
- [ ] Distributed tracing (OpenTelemetry) configured for debugging

---

## Related

- [[Elsa Deployment]] -- Kubernetes deployment and scaling
- [[Elsa Workflow Dispatcher]] -- Queue-based dispatch architecture
- [[Elsa Security]] -- Network security in clustered environments
- [[entities/Elsa Workflows]] -- Platform overview
