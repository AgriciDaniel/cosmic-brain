---
description: >-
  Guide to configuring Elsa Workflows for distributed environments, covering
  runtime, locking, caching, and Quartz.NET clustering.
---

# Distributed Hosting

When deploying Elsa Workflows in a distributed environment, proper configuration is essential to ensure reliability and consistency across multiple nodes. There are four key components to configure:

1. **Distributed Runtime**
2. **Distributed Locking**
3. **Distributed Caching**
4. **Quartz.NET Clustered Mode**

### 1. Distributed Runtime

By default, Elsa uses the `LocalWorkflowRuntime`, which is not suitable for distributed environments like Kubernetes or Azure App Services when running multiple instances. Instead, use either:

* `DistributedWorkflowRuntime`
* `ProtoActorWorkflowRuntime`

Both options ensure that workflow instances are executed in a synchronized manner, preventing multiple processes from acting on the same instance concurrently.

To enable the **Distributed Workflow Runtime**, configure Elsa as follows:

```csharp
elsa.UseWorkflowRuntime(runtime =>
{
   runtime.UseDistributedRuntime();
});
```

When enabling the **Distributed Runtime**, a distributed locking provider must also be configured.

### 2. Distributed Locking

To prevent multiple nodes from executing and updating the same workflow instance simultaneously, Elsa employs **distributed locking**. This mechanism ensures that access to a workflow instance is synchronized across nodes.

Distributed locking is achieved by acquiring a lease (lock) on a shared resource such as a **database**, **Redis**, or **blob storage**.

For example, to configure distributed locking using **PostgreSQL**, use:

```csharp
elsa.UseWorkflowRuntime(runtime =>
{
   runtime.UseDistributedRuntime();
   runtime.DistributedLockProvider = serviceProvider => 
      new PostgresDistributedSynchronizationProvider(postgresConnectionString, options =>
      {
         options.KeepaliveCadence(TimeSpan.FromMinutes(5));
         options.UseMultiplexing();
      });
});
```

{% hint style="warning" %}
**Important: Choose a reliable distributed lock provider**\
By default, Elsa’s distributed lock provider uses the local filesystem. This configuration is intended for development and single-node scenarios only. Filesystem-based locks (including locks on a shared network folder) are not reliable for distributed hosting and can lead to multiple nodes executing the same workflow instance concurrently.

For production deployments with multiple nodes, configure a shared, robust lock provider such as a relational database (e.g. PostgreSQL), Redis, or a cloud blob storage service that supports leases.
{% endhint %}

### 3. Distributed Caching

Each node in the cluster maintains a local in-memory cache for workflow definitions and other critical data. To ensure consistency, cache invalidation must be propagated across all nodes when changes occur.

This is achieved using **event-driven pub/sub messaging**, enabled through the `DistributedCacheFeature`.

Example configuration:

```csharp
elsa.UseDistributedCache(distributedCaching =>
{
   distributedCaching.UseMassTransit();
});
```

#### Setting Up MassTransit

When using **MassTransit** for distributed caching, configure it with a message broker like **RabbitMQ**:

```csharp
elsa.UseMassTransit(massTransit =>
{
   massTransit.UseRabbitMq(rabbitMqConnectionString, rabbit => rabbit.ConfigureTransportBus = (context, bus) =>
   {
      bus.PrefetchCount = 50;
      bus.Durable = true;
      bus.AutoDelete = false;
      bus.ConcurrentMessageLimit = 32;
   });
});
```

### 4. Quartz.NET Clustered Mode

When deploying multiple Elsa instances in a distributed environment, scheduled jobs (timers, delays, cron triggers) must execute only once across the cluster to prevent duplicate executions. Quartz.NET clustering ensures this by using a shared database to coordinate job execution across nodes.

#### When is Quartz.NET Clustering Required?

Quartz.NET clustering is **required** when all of the following are true:

1. **Multiple Instances**: You're running 2 or more Elsa instances (e.g., in Kubernetes, Azure App Services, or behind a load balancer)
2. **Using Quartz Scheduler**: You've configured Elsa to use Quartz.NET as the scheduling provider via `UseScheduling(scheduling => scheduling.UseQuartzScheduler())`
3. **Workflows with Scheduled Activities**: Your workflows use time-based activities like:
   - **Timer** activities (delay for a specific duration)
   - **Cron** activities (scheduled execution based on cron expressions)
   - **Delay** activities (pause workflow execution)

If you're running a single Elsa instance, or if your workflows don't use scheduled activities, Quartz.NET clustering is not necessary.

#### Automatic Clustering with Convenience API

Elsa provides a convenient configuration API that **automatically enables clustering** when you configure Quartz.NET with a persistent database provider. This was introduced in [elsa-extensions PR #110](https://github.com/elsa-workflows/elsa-extensions/pull/110) to simplify distributed deployments.

#### Configuration Example:

```csharp
// Step 1: Set Quartz as the scheduling provider
elsa.UseScheduling(scheduling =>
{
   scheduling.UseQuartzScheduler();
});

// Step 2: Configure Quartz with a persistent store
// Clustering is automatically enabled when using a database provider
elsa.UseQuartz(quartz =>
{
   quartz.UsePostgreSql(postgresConnectionString);
   // Clustering is enabled automatically - no additional configuration needed!
});
```

**Supported Database Providers:**

All database-backed Quartz extensions automatically enable clustering:

```csharp
// PostgreSQL
elsa.UseQuartz(quartz => quartz.UsePostgreSql(connectionString));

// SQL Server
elsa.UseQuartz(quartz => quartz.UseSqlServer(connectionString));

// MySQL
elsa.UseQuartz(quartz => quartz.UseMySql(connectionString));
```

{% hint style="info" %}
**How Clustering Works**

When you call `UseQuartz` with a database provider:
1. Quartz.NET creates required tables in the database (prefixed with `qrtz_`)
2. Clustering is automatically enabled with sensible defaults
3. Each node registers itself in the `qrtz_scheduler_state` table
4. Nodes coordinate via database locks to ensure only one node executes each scheduled job
5. If a node fails, other nodes automatically pick up its scheduled jobs (failover)

See the [Clustering Guide](../guides/clustering/README.md) for detailed information on cluster coordination and failover behavior.
{% endhint %}

#### Advanced Configuration (Optional)

If you need to customize Quartz clustering behavior, you can access the underlying Quartz configuration:

```csharp
elsa.UseQuartz(quartz =>
{
    quartz.UsePersistentStore(store =>
    {
        store.UsePostgres(postgres =>
        {
            postgres.ConnectionString = postgresConnectionString;
        });

        store.UseClustering(clustering =>
        {
            // Customize clustering behavior
            clustering.CheckinInterval = TimeSpan.FromSeconds(20); // Default: 20s
            clustering.CheckinMisfireThreshold = TimeSpan.FromSeconds(60); // Default: 60s
        });
    });
});
```

Most deployments work well with the default settings and don't require this customization.

### Conclusion

By properly configuring these four components, Elsa Workflows can operate reliably in distributed environments, ensuring that workflow execution remains synchronized, cache updates propagate correctly, and scheduled jobs run efficiently without conflicts.
