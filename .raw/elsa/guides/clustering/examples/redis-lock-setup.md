# Redis Distributed Locking Setup

This guide explains how to configure Redis-based distributed locking for Elsa Workflows in a clustered environment.

## Overview

Distributed locking prevents multiple nodes from executing the same workflow instance simultaneously. When using Redis, Elsa leverages the Medallion.Threading library to acquire and release locks across the cluster.

## Why Redis for Distributed Locking?

**Advantages:**
- Fast lock acquisition and release (in-memory operations)
- Low latency compared to database-based locking
- Suitable for high-throughput scenarios
- Built-in TTL (time-to-live) for automatic lock expiration

**Considerations:**
- Requires additional infrastructure (Redis instance)
- Potential data loss if Redis crashes (use persistence or Redis Cluster)
- Network dependency (ensure low latency between Elsa nodes and Redis)

## Prerequisites

- Redis 6.0 or later (7.0+ recommended)
- NuGet package: `Medallion.Threading.Redis` (installed with Elsa)
- StackExchange.Redis (dependency)

## Installation

### 1. Deploy Redis

**Docker:**
```bash
docker run -d \
  --name elsa-redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:7-alpine redis-server --appendonly yes
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --maxmemory 1gb --maxmemory-policy allkeys-lru
    restart: unless-stopped

volumes:
  redis-data:
```

**Kubernetes:**
See `helm-values.yaml` in this directory for Redis StatefulSet configuration.

### 2. Configure Connection String

Store the Redis connection string securely:

```bash
# Example connection string
redis-host:6379,password=YOUR_PASSWORD,ssl=False,abortConnect=False,connectTimeout=5000
```

**Key parameters:**
- `abortConnect=False` - Don't fail immediately if Redis is unavailable
- `connectTimeout=5000` - Connection timeout in milliseconds
- `ssl=True` - Enable SSL/TLS for production environments
- `password=YOUR_PASSWORD` - Redis authentication password

## Configuration in Elsa

### Option 1: Using IDistributedLockProvider (Recommended)

```csharp
using Elsa.Extensions;
using Medallion.Threading.Redis;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Configure Elsa with Redis distributed locking
builder.Services.AddElsa(elsa =>
{
    // Configure workflow runtime with distributed locking
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        
        // Configure Redis distributed lock provider
        runtime.DistributedLockProvider = serviceProvider =>
        {
            var redisConnectionString = builder.Configuration.GetConnectionString("Redis");
            var connection = ConnectionMultiplexer.Connect(redisConnectionString);
            
            return new RedisDistributedSynchronizationProvider(
                connection.GetDatabase(),
                options =>
                {
                    // Lock expiration time (default: 30 seconds)
                    options.Expiry(TimeSpan.FromSeconds(30));
                    
                    // Extension window for lock renewal (default: 10 seconds)
                    options.MinimumDatabaseExpiry(TimeSpan.FromSeconds(10));
                    
                    // Busy wait timeout for lock acquisition
                    options.BusyWaitSleepTime(TimeSpan.FromMilliseconds(100), TimeSpan.FromMilliseconds(500));
                });
        };
    });
    
    // Configure distributed caching (optional, but recommended)
    elsa.UseDistributedCache(distributedCaching =>
    {
        distributedCaching.UseMassTransit();
    });
});

var app = builder.Build();
app.Run();
```

### Option 2: Manual DI Registration

For more control, register the lock provider directly:

```csharp
using Elsa.DistributedLocking;
using Medallion.Threading;
using Medallion.Threading.Redis;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Register Redis connection
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(connectionString);
});

// Register distributed lock provider
builder.Services.AddSingleton<IDistributedLockProvider>(sp =>
{
    var redis = sp.GetRequiredService<IConnectionMultiplexer>();
    var database = redis.GetDatabase();
    
    return new RedisDistributedSynchronizationProvider(
        database,
        options =>
        {
            options.Expiry(TimeSpan.FromSeconds(30));
            options.MinimumDatabaseExpiry(TimeSpan.FromSeconds(10));
        });
});

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        // The IDistributedLockProvider will be resolved from DI
    });
});

var app = builder.Build();
app.Run();
```

## Configuration Options

### Lock Expiration

Set an appropriate expiration time to prevent indefinite locks if a node crashes:

```csharp
options.Expiry(TimeSpan.FromSeconds(30));
```

**Recommendations:**
- Short workflows: 10-30 seconds
- Long-running workflows: 60-120 seconds
- If using long-running activities, consider longer expiration times

### Minimum Database Expiry

Prevents locks from expiring too quickly before renewal:

```csharp
options.MinimumDatabaseExpiry(TimeSpan.FromSeconds(10));
```

### Busy Wait Configuration

Controls how aggressively to retry lock acquisition:

```csharp
options.BusyWaitSleepTime(
    min: TimeSpan.FromMilliseconds(100),  // Initial wait
    max: TimeSpan.FromMilliseconds(500)   // Maximum wait between retries
);
```

## How It Works in Elsa

### WorkflowResumer and Distributed Locking

The `WorkflowResumer` service uses distributed locking to prevent duplicate resume attempts:

**Code Reference:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`

```csharp
// Pseudo-code illustrating the pattern
public async Task<ResumeWorkflowResult> ResumeWorkflowAsync(...)
{
    // Generate a deterministic lock key based on workflow instance and bookmark
    var lockKey = $"workflow:{workflowInstanceId}:bookmark:{bookmarkId}";
    
    // Acquire distributed lock
    await using var lockHandle = await _distributedLockProvider
        .AcquireLockAsync(lockKey, cancellationToken: cancellationToken);
    
    if (lockHandle == null)
    {
        // Lock acquisition failed (another node is processing this workflow)
        return ResumeWorkflowResult.AlreadyInProgress();
    }
    
    try
    {
        // Safely resume the workflow (only one node will execute this)
        var result = await ResumeWorkflowCoreAsync(...);
        return result;
    }
    finally
    {
        // Lock automatically released when lockHandle is disposed
    }
}
```

### Lock Key Generation

Elsa generates deterministic lock keys based on:
- Workflow instance ID
- Bookmark ID (for scheduled triggers)
- Activity execution context (for activity-level locking)

This ensures that the same workflow instance cannot be processed by multiple nodes simultaneously.

## Environment Variables

Configure via environment variables in your deployment:

```bash
# Redis connection string
CONNECTIONSTRINGS__REDIS="redis-host:6379,password=YOUR_PASSWORD,ssl=False,abortConnect=False"

# Distributed locking provider
ELSA__LOCKING__PROVIDER="Redis"

# Lock expiration (optional, defaults to 30 seconds)
ELSA__LOCKING__EXPIRY_SECONDS=30
```

## Monitoring

### Redis Commands to Monitor Locks

```bash
# Connect to Redis
redis-cli

# List all lock keys
KEYS workflow:*

# Check lock expiration
TTL workflow:{instance-id}:bookmark:{bookmark-id}

# Monitor lock acquisition in real-time
MONITOR
```

### Metrics to Track

- Lock acquisition time (P50, P95, P99)
- Lock acquisition failures
- Lock hold duration
- Redis connection pool status

## Troubleshooting

### Issue: Lock Acquisition Timeouts

**Symptoms:** Workflows not resuming, logs show "Failed to acquire lock"

**Causes:**
- Redis is down or unreachable
- Network latency between Elsa nodes and Redis
- Locks not being released (previous node crashed)

**Solutions:**
1. Check Redis connectivity:
   ```bash
   redis-cli -h redis-host -p 6379 -a YOUR_PASSWORD PING
   ```

2. Verify lock expiration is configured (prevents stuck locks)

3. Check for stale locks:
   ```bash
   redis-cli --scan --pattern "workflow:*" | xargs redis-cli DEL
   ```

### Issue: High Redis Memory Usage

**Cause:** Too many locks being created or not expiring

**Solutions:**
- Enable Redis eviction policy: `maxmemory-policy allkeys-lru`
- Reduce lock expiration time
- Monitor lock creation rate

### Issue: Duplicate Workflow Executions

**Cause:** Distributed locking not enabled or misconfigured

**Solutions:**
- Verify `runtime.UseDistributedRuntime()` is called
- Confirm `IDistributedLockProvider` is registered
- Check logs for lock acquisition errors

## Redis High Availability

For production, use Redis Sentinel or Redis Cluster:

### Redis Sentinel

```csharp
var options = new ConfigurationOptions
{
    ServiceName = "mymaster",
    EndPoints = { "sentinel1:26379", "sentinel2:26379", "sentinel3:26379" },
    TieBreaker = "",
    CommandMap = CommandMap.Sentinel
};

var connection = await ConnectionMultiplexer.ConnectAsync(options);
```

### Redis Cluster

```csharp
var options = new ConfigurationOptions
{
    EndPoints = {
        "cluster-node1:6379",
        "cluster-node2:6379",
        "cluster-node3:6379"
    },
    Password = "YOUR_PASSWORD"
};

var connection = await ConnectionMultiplexer.ConnectAsync(options);
```

## Alternative: SQL-Based Locking

If Redis is not available, use PostgreSQL or SQL Server for distributed locking:

```csharp
using Medallion.Threading.Postgres;

runtime.DistributedLockProvider = serviceProvider =>
    new PostgresDistributedSynchronizationProvider(
        connectionString,
        options =>
        {
            options.KeepaliveCadence(TimeSpan.FromMinutes(5));
            options.UseMultiplexing();
        });
```

**Trade-offs:**
- ✅ No additional infrastructure needed (use existing database)
- ❌ Slower lock acquisition (disk I/O vs in-memory)
- ❌ Higher database load

## References

- Medallion.Threading Documentation: https://github.com/madelson/DistributedLock
- StackExchange.Redis: https://stackexchange.github.io/StackExchange.Redis/
- Elsa WorkflowResumer: `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`
- Redis Best Practices: https://redis.io/docs/manual/patterns/distributed-locks/

## Security Considerations

1. **Always use passwords** in production Redis deployments
2. **Enable SSL/TLS** for Redis connections over untrusted networks
3. **Network isolation**: Place Redis in a private network
4. **Connection string security**: Store in secrets manager (Azure Key Vault, AWS Secrets Manager, etc.)
5. **Firewall rules**: Restrict Redis access to Elsa nodes only
