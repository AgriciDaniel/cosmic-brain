---
description: >-
  Comprehensive guide to running Elsa Workflows in clustered and distributed production environments, covering architecture patterns, distributed locking, scheduling, and operational best practices.
---

# Clustering Guide

## Executive Summary

Running Elsa Workflows in a clustered environment is essential for achieving high availability, scalability, and fault tolerance in production deployments. A clustered setup allows multiple Elsa instances to work together, distributing workload across nodes while maintaining consistency and preventing data corruption.

### Why Clustering Matters

**Production Requirements Clustering Solves:**

1. **High Availability**: If one node fails, others continue processing workflows without interruption
2. **Horizontal Scalability**: Handle increased load by adding more nodes rather than scaling vertically
3. **Zero-Downtime Deployments**: Rolling updates with no service interruption
4. **Geographic Distribution**: Deploy nodes across regions for disaster recovery and reduced latency
5. **Load Balancing**: Distribute HTTP requests and background jobs across multiple instances

**Key Challenges Clustering Addresses:**

- **Concurrent Modification**: Preventing multiple nodes from modifying the same workflow instance simultaneously
- **Duplicate Scheduling**: Ensuring timers and scheduled tasks execute only once
- **Cache Consistency**: Keeping in-memory caches synchronized across nodes
- **Race Conditions**: Managing concurrent bookmark resume attempts

Without proper clustering configuration, you may encounter:
- Workflow state corruption from simultaneous updates
- Duplicate timer executions causing repeated notifications or side effects
- Cache inconsistencies leading to stale workflow definitions
- Race conditions when external events trigger workflow resumption

## Conceptual Overview

### Understanding Corruption and Duplication Risks

#### Problem 1: Duplicate Timer Execution

**Scenario:** A workflow with a timer activity (e.g., "Send reminder email in 24 hours") is deployed across 3 nodes.

**Without Clustering:**
```
Time T+24h:
- Node 1 checks: "Timer expired? Yes" → Sends email
- Node 2 checks: "Timer expired? Yes" → Sends email  ❌ Duplicate!
- Node 3 checks: "Timer expired? Yes" → Sends email  ❌ Duplicate!
```

**Result:** Customer receives 3 identical reminder emails instead of 1.

**With Clustering (Quartz.NET Clustering):**
```
Time T+24h:
- Quartz Cluster: Node 1 acquires job lock → Executes task
- Node 2 attempts lock → Already held by Node 1 → Skips
- Node 3 attempts lock → Already held by Node 1 → Skips
```

**Result:** Customer receives exactly 1 email as intended.

#### Problem 2: Concurrent Workflow Modification

**Scenario:** An HTTP workflow receives two simultaneous requests that both attempt to resume the same workflow instance.

**Without Distributed Locking:**
```
Request A arrives at Node 1:
1. Load workflow instance (State: Step 2)
2. Execute Step 3
3. Save workflow instance (State: Step 3)

Request B arrives at Node 2 (simultaneously):
1. Load workflow instance (State: Step 2)  ← Loads stale state!
2. Execute Step 3
3. Save workflow instance (State: Step 3)  ← Overwrites Node 1's changes!
```

**Result:** Workflow execution is corrupted; steps may be skipped or repeated.

**With Distributed Locking:**
```
Request A arrives at Node 1:
1. Acquire lock on workflow instance
2. Load, execute, save
3. Release lock

Request B arrives at Node 2 (simultaneously):
1. Attempt to acquire lock → Blocked (Node 1 holds it)
2. Wait for lock release
3. Lock released → Detect workflow already resumed → Skip or continue appropriately
```

**Result:** Workflow executes correctly without corruption.

#### Problem 3: Cache Invalidation

**Scenario:** An administrator updates a workflow definition in Elsa Studio.

**Without Distributed Cache Invalidation:**
```
Admin updates workflow via Node 1:
- Node 1: Clears local cache, reloads definition ✓
- Node 2: Keeps stale cache ❌ (uses old version)
- Node 3: Keeps stale cache ❌ (uses old version)
```

**Result:** New workflow instances on Node 2 and 3 use outdated definitions.

**With Distributed Cache Invalidation (MassTransit):**
```
Admin updates workflow via Node 1:
- Node 1: Publishes "WorkflowDefinitionChanged" event to message bus
- Node 2: Receives event → Clears local cache ✓
- Node 3: Receives event → Clears local cache ✓
```

**Result:** All nodes use the updated workflow definition immediately.

### How Elsa Mitigates These Risks

Elsa provides four key mechanisms for safe clustering:

#### 1. Bookmark Hashing

Bookmarks (suspension points in workflows) are assigned deterministic hashes based on their properties. When multiple nodes attempt to create the same bookmark, the hash collision is detected, and only one bookmark is persisted.

**Code Reference:** `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs` - `CreateBookmark` method

```csharp
// Simplified illustration of bookmark hashing
var bookmarkHash = GenerateHash(activityId, payload, correlationId);
var existingBookmark = await FindBookmarkByHash(bookmarkHash);

if (existingBookmark != null)
{
    // Bookmark already exists; don't create duplicate
    return existingBookmark;
}

// Create new bookmark with unique hash
var bookmark = new Bookmark { Hash = bookmarkHash, ... };
await SaveBookmark(bookmark);
```

#### 2. Distributed Locking

The `WorkflowResumer` service acquires a distributed lock before resuming a workflow instance. This ensures only one node processes a resume request at a time.

**Code Reference:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`

```csharp
// Simplified illustration from WorkflowResumer
public async Task<ResumeWorkflowResult> ResumeWorkflowAsync(
    string workflowInstanceId,
    string bookmarkId,
    CancellationToken cancellationToken)
{
    // Generate deterministic lock key
    var lockKey = $"workflow:{workflowInstanceId}:bookmark:{bookmarkId}";
    
    // Acquire distributed lock (Redis, PostgreSQL, etc.)
    await using var lockHandle = await _distributedLockProvider
        .AcquireLockAsync(lockKey, timeout: TimeSpan.FromSeconds(30), cancellationToken);
    
    if (lockHandle == null)
    {
        // Another node is already processing this resume
        _logger.LogInformation("Lock acquisition failed; resume already in progress");
        return ResumeWorkflowResult.AlreadyInProgress();
    }
    
    try
    {
        // Safe to resume - we hold the lock
        var result = await ResumeWorkflowCoreAsync(...);
        return result;
    }
    finally
    {
        // Lock automatically released when lockHandle is disposed
    }
}
```

**Lock Providers Supported:**
- **Redis**: Fast, in-memory locking via Medallion.Threading.Redis
- **PostgreSQL**: Database-backed locking via Medallion.Threading.Postgres
- **SQL Server**: Database-backed locking via Medallion.Threading.SqlServer
- **Azure Blob Storage**: Cloud-native locking via Medallion.Threading.Azure

#### 3. Centralized Scheduler (Quartz.NET Clustering)

Quartz.NET clustering ensures scheduled jobs (timers, delays, cron triggers) execute only once across the cluster.

**Code References:**
- `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs` - Enqueues bookmark resume tasks
- `src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs` - Quartz job that resumes workflows

**How It Works:**
1. `DefaultBookmarkScheduler` creates a Quartz job for each scheduled bookmark
2. Quartz stores job metadata in a shared database
3. At execution time, nodes compete for a database lock
4. The node that acquires the lock executes the job; others skip it
5. Failed nodes' jobs are recovered by surviving nodes (failover)

#### 4. Distributed Cache Invalidation

When workflow definitions or other cached data changes, MassTransit publishes cache invalidation events to all nodes via a message broker (RabbitMQ, Azure Service Bus, etc.).

**Message Flow:**
```
Node 1 (Admin updates workflow) → Publish event to RabbitMQ
                                    ↓
                    ┌───────────────┼───────────────┐
                    ↓               ↓               ↓
                  Node 1          Node 2          Node 3
            (clear cache)   (clear cache)   (clear cache)
```

## Architecture Patterns and Deployment Models

### Pattern 1: Shared Database + Distributed Locks

**Best for:** Most production scenarios with moderate to high traffic

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Elsa Node  │  │  Elsa Node  │  │  Elsa Node  │
│   (Pod 1)   │  │   (Pod 2)   │  │   (Pod 3)   │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        ↓
            ┌───────────────────────┐
            │  PostgreSQL Database  │
            │  - Workflow instances │
            │  - Bookmarks          │
            │  - Distributed locks  │
            │  - Quartz tables      │
            └───────────────────────┘
                        ↑
                        │
            ┌───────────────────────┐
            │  Redis (optional)     │
            │  - Distributed locks  │
            │  - Session cache      │
            └───────────────────────┘
                        ↑
                        │
            ┌───────────────────────┐
            │  RabbitMQ             │
            │  - Cache invalidation │
            │  - Event pub/sub      │
            └───────────────────────┘
```

**Configuration:**
- All nodes connect to the same database
- Distributed runtime enabled: `runtime.UseDistributedRuntime()`
- Distributed locks via Redis or PostgreSQL
- Quartz clustering enabled for scheduled tasks
- MassTransit for cache invalidation

**Pros:**
- Simple architecture
- Easy to scale horizontally
- No single point of failure (stateless nodes)

**Cons:**
- Database becomes a bottleneck at extreme scale
- Requires careful database tuning

### Pattern 2: Leader-Election Scheduler

**Best for:** Environments where you want precise control over scheduling overhead

```
┌─────────────────────┐
│  Scheduler Node     │ ← Leader (elected or manually designated)
│  - Quartz scheduler │
│  - No HTTP endpoint │
└─────────┬───────────┘
          │ Schedules bookmark resume tasks
          ↓
┌──────────────────────────────────────┐
│  Worker Nodes (HTTP-only)            │
│  - Handle HTTP requests              │
│  - Execute workflows                 │
│  - No Quartz scheduler               │
└──────────────────────────────────────┘
```

**Configuration:**

**Scheduler Node:**
```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime => runtime.UseDistributedRuntime());
    elsa.UseScheduling(scheduling => scheduling.UseQuartzScheduler());
    elsa.UseQuartz(quartz => quartz.UsePostgreSql(connectionString));
    // Don't expose HTTP endpoints (or expose for admin only)
});
```

**Worker Nodes:**
```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime => runtime.UseDistributedRuntime());
    elsa.UseWorkflowsApi();  // Handle HTTP requests
    // Don't call UseScheduling() - no scheduler on workers
});
```

**Pros:**
- Centralized scheduling (easier to monitor)
- Workers focused on request handling
- Lower resource usage on workers

**Cons:**
- Scheduler is a single point of failure (mitigate with active-standby setup)
- More complex deployment configuration

### Pattern 3: Quartz Clustering (All-Nodes-Participate)

**Best for:** Simplicity and automatic failover

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Node 1     │  │  Node 2     │  │  Node 3     │
│  - Quartz   │  │  - Quartz   │  │  - Quartz   │
│  - HTTP     │  │  - HTTP     │  │  - HTTP     │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       └────────────────┼────────────────┘
                        ↓
            ┌───────────────────────┐
            │  PostgreSQL           │
            │  - Quartz tables      │
            │  - Cluster locks      │
            └───────────────────────┘
```

**Configuration:**
```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime => runtime.UseDistributedRuntime());
    elsa.UseScheduling(scheduling => scheduling.UseQuartzScheduler());
    elsa.UseQuartz(quartz => 
    {
        quartz.UsePostgreSql(connectionString);
        // Clustering enabled automatically
    });
});
```

**Pros:**
- Simple configuration (same for all nodes)
- Automatic failover (if Node 1 crashes, Node 2 picks up its jobs)
- No single point of failure

**Cons:**
- Every node runs Quartz scheduler (slightly higher resource usage)
- More database queries for cluster coordination

**Recommendation:** Use this pattern unless you have specific reasons to use leader-election.

### Pattern 4: External Scheduler

**Best for:** Multi-tenant environments or complex orchestration needs

```
┌───────────────────────┐
│  External Scheduler   │ ← Kubernetes CronJob, Azure Functions, AWS Lambda
│  - Triggers workflows │
│  - No Elsa runtime    │
└───────────┬───────────┘
            │ HTTP API calls
            ↓
┌──────────────────────────────────────┐
│  Elsa Worker Nodes                   │
│  - REST API endpoints                │
│  - Execute workflows                 │
│  - No internal scheduler             │
└──────────────────────────────────────┘
```

**Example: Kubernetes CronJob**
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-report-trigger
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: trigger
              image: curlimages/curl:latest
              command:
                - /bin/sh
                - -c
                - |
                  curl -X POST https://elsa.example.com/elsa/api/workflow-instances \
                    -H "Content-Type: application/json" \
                    -d '{"definitionId": "DailyReport", "input": {}}'
          restartPolicy: OnFailure
```

**Pros:**
- No Quartz dependency
- Leverage platform-native scheduling (Kubernetes, cloud functions)
- Easier multi-cloud deployments

**Cons:**
- External system must remain operational
- More complex integration (API authentication, error handling)
- No built-in bookmark scheduling (must implement externally)

## Practical Configuration

### Configuring Distributed Locks

#### Option 1: Redis-Based Locking (Recommended for Performance)

**Prerequisites:**
- Redis 6.0+ deployed and accessible
- NuGet package: `Medallion.Threading.Redis`

**Configuration Example:**
```csharp
using Elsa.Extensions;
using Medallion.Threading.Redis;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        
        runtime.DistributedLockProvider = serviceProvider =>
        {
            var redisConnectionString = builder.Configuration.GetConnectionString("Redis");
            var connection = ConnectionMultiplexer.Connect(redisConnectionString);
            
            return new RedisDistributedSynchronizationProvider(
                connection.GetDatabase(),
                options =>
                {
                    // Lock expires after 30 seconds if not released
                    options.Expiry(TimeSpan.FromSeconds(30));
                    
                    // Minimum time before lock can expire (prevents premature expiration)
                    options.MinimumDatabaseExpiry(TimeSpan.FromSeconds(10));
                });
        };
    });
});

var app = builder.Build();
app.Run();
```

**Connection String Example:**
```
redis-host:6379,password=YOUR_PASSWORD,ssl=False,abortConnect=False,connectTimeout=5000
```

**See:** `examples/redis-lock-setup.md` for detailed configuration and troubleshooting.

#### Option 2: PostgreSQL-Based Locking (No Additional Infrastructure)

**Prerequisites:**
- PostgreSQL 12+ (same database as Elsa workflow storage)
- NuGet package: `Medallion.Threading.Postgres`

**Configuration Example:**
```csharp
using Elsa.Extensions;
using Medallion.Threading.Postgres;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        
        runtime.DistributedLockProvider = serviceProvider =>
            new PostgresDistributedSynchronizationProvider(
                builder.Configuration.GetConnectionString("PostgreSql"),
                options =>
                {
                    // Keep connection alive with periodic keepalive
                    options.KeepaliveCadence(TimeSpan.FromMinutes(5));
                    
                    // Use connection multiplexing for efficiency
                    options.UseMultiplexing();
                });
    });
});

var app = builder.Build();
app.Run();
```

**Connection String Example:**
```
Server=postgres-host;Port=5432;Database=elsa;User Id=elsa;Password=YOUR_PASSWORD;MaxPoolSize=100
```

**Pros vs Redis:**
- ✅ No additional infrastructure required
- ✅ Uses existing database connection
- ❌ Slower lock acquisition (disk I/O vs in-memory)
- ❌ Adds load to database

**Medallion.Threading Usage in Elsa Core:**

Elsa uses Medallion.Threading abstractions to remain agnostic to the lock provider. The `IDistributedLockProvider` interface is implemented by all Medallion providers:
- `RedisDistributedSynchronizationProvider`
- `PostgresDistributedSynchronizationProvider`
- `SqlDistributedSynchronizationProvider`
- `AzureDistributedSynchronizationProvider`

To use a different provider, simply register it as shown above. Elsa's `WorkflowResumer` will automatically use the registered provider.

### Configuring Quartz Clustering

**Example quartz.properties:**
```properties
# Cluster instance configuration
quartz.scheduler.instanceName = ElsaQuartzCluster
quartz.scheduler.instanceId = AUTO

# Thread pool
quartz.threadPool.type = Quartz.Simpl.SimpleThreadPool, Quartz
quartz.threadPool.threadCount = 10

# Persistent job store with clustering
quartz.jobStore.type = Quartz.Impl.AdoJobStore.JobStoreTX, Quartz
quartz.jobStore.dataSource = default
quartz.jobStore.tablePrefix = qrtz_
quartz.jobStore.driverDelegateType = Quartz.Impl.AdoJobStore.PostgreSQLDelegate, Quartz

# Enable clustering
quartz.jobStore.clustered = true
quartz.jobStore.clusterCheckinInterval = 20000
quartz.jobStore.clusterCheckinMisfireThreshold = 60000

# PostgreSQL data source
quartz.dataSource.default.provider = Npgsql
quartz.dataSource.default.connectionString = Server=localhost;Database=elsa;User Id=elsa;Password=YOUR_PASSWORD

# Serialization
quartz.serializer.type = json
```

**Configuration in Program.cs:**
```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    // Enable distributed runtime
    elsa.UseWorkflowRuntime(runtime => runtime.UseDistributedRuntime());
    
    // Enable Quartz scheduling
    elsa.UseScheduling(scheduling => scheduling.UseQuartzScheduler());
    
    // Configure Quartz with PostgreSQL and clustering
    elsa.UseQuartz(quartz =>
    {
        // This automatically enables clustering
        quartz.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
    });
});

// Configure Quartz service
builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

var app = builder.Build();
app.Run();
```

**Environment Variables:**
```bash
QUARTZ__CLUSTERED=true
QUARTZ__INSTANCENAME=ElsaQuartzCluster
QUARTZ__SCHEDULER_INSTANCEID=AUTO
CONNECTIONSTRINGS__POSTGRESQL="Server=postgres-host;Database=elsa;User Id=elsa;Password=YOUR_PASSWORD"
```

**See:** `examples/quartz-cluster-config.md` for detailed configuration options.

### Kubernetes Configuration

**Minimal Deployment Snippet:**

See `examples/k8s-deployment.yaml` for a complete example with:
- Deployment with 3 replicas
- Service (ClusterIP, no session affinity)
- HorizontalPodAutoscaler
- Pod Disruption Budget
- Health probes (liveness, readiness, startup)

**Key Points:**
- **No Sticky Sessions Required**: Elsa's distributed runtime manages state externally, so requests can be routed to any node
- **Readiness Probes**: Use `/health/ready` endpoint to ensure pods are ready before receiving traffic
- **Liveness Probes**: Use `/health/live` endpoint to restart unhealthy pods
- **Anti-Affinity**: Spread pods across nodes for high availability
- **Resource Limits**: Set appropriate CPU/memory limits to prevent resource contention

**Ingress Configuration:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-ingress
  namespace: elsa-workflows
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    # No session affinity required
    nginx.ingress.kubernetes.io/affinity: "none"
spec:
  ingressClassName: nginx
  rules:
    - host: elsa.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: elsa-server
                port:
                  number: 80
```

**Helm Values:**

See `examples/helm-values.yaml` for an annotated Helm values file with:
- Multiple replicas configuration
- Database, Redis, and RabbitMQ settings
- Distributed runtime and locking configuration
- Quartz clustering settings
- HPA and resource limits
- Health probe configurations

### Docker Compose Development Example

For local development and testing clustering behavior:

```yaml
version: '3.8'

services:
  elsa-node1:
    image: elsaworkflows/elsa-server-v3:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - CONNECTIONSTRINGS__POSTGRESQL=Server=postgres;Database=elsa;User Id=elsa;Password=elsa
      - REDIS__CONNECTIONSTRING=redis:6379
      - RABBITMQ__CONNECTIONSTRING=amqp://guest:guest@rabbitmq:5672/
      - ELSA__RUNTIME__TYPE=Distributed
      - QUARTZ__CLUSTERED=true
    ports:
      - "5001:8080"
    depends_on:
      - postgres
      - redis
      - rabbitmq

  elsa-node2:
    image: elsaworkflows/elsa-server-v3:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - CONNECTIONSTRINGS__POSTGRESQL=Server=postgres;Database=elsa;User Id=elsa;Password=elsa
      - REDIS__CONNECTIONSTRING=redis:6379
      - RABBITMQ__CONNECTIONSTRING=amqp://guest:guest@rabbitmq:5672/
      - ELSA__RUNTIME__TYPE=Distributed
      - QUARTZ__CLUSTERED=true
    ports:
      - "5002:8080"
    depends_on:
      - postgres
      - redis
      - rabbitmq

  elsa-node3:
    image: elsaworkflows/elsa-server-v3:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - CONNECTIONSTRINGS__POSTGRESQL=Server=postgres;Database=elsa;User Id=elsa;Password=elsa
      - REDIS__CONNECTIONSTRING=redis:6379
      - RABBITMQ__CONNECTIONSTRING=amqp://guest:guest@rabbitmq:5672/
      - ELSA__RUNTIME__TYPE=Distributed
      - QUARTZ__CLUSTERED=true
    ports:
      - "5003:8080"
    depends_on:
      - postgres
      - redis
      - rabbitmq

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=elsa
      - POSTGRES_USER=elsa
      - POSTGRES_PASSWORD=elsa
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"  # Management UI

volumes:
  postgres-data:
```

**Testing Commands:**
```bash
# Start cluster
docker-compose up -d

# Check all nodes are healthy
curl http://localhost:5001/health/ready
curl http://localhost:5002/health/ready
curl http://localhost:5003/health/ready

# Create a workflow with a timer
curl -X POST http://localhost:5001/elsa/api/workflow-instances \
  -H "Content-Type: application/json" \
  -d '{"definitionId": "TimerTest"}'

# Check Quartz cluster state
docker-compose exec postgres psql -U elsa -c "SELECT * FROM qrtz_scheduler_state;"

# Check logs for distributed lock activity
docker-compose logs -f elsa-node1 | grep -i "lock"
```

## Operational Topics

### Metrics to Monitor

**Workflow Execution Metrics:**
- Active workflow instances
- Workflows completed per minute
- Workflow execution failures
- Average workflow execution time

**Distributed Locking Metrics:**
- Lock acquisition time (P50, P95, P99)
- Lock acquisition failures
- Lock hold duration
- Lock contention rate

**Quartz Scheduling Metrics:**
- Scheduled jobs count
- Job execution rate
- Job misfires
- Scheduler heartbeat intervals

**System Metrics:**
- CPU usage per pod
- Memory usage per pod
- Database connection pool utilization
- Redis connection pool utilization

**Database Metrics:**
- Query execution time
- Connection pool exhaustion
- Deadlocks
- Lock wait time

### Log Levels and Structured Logging

**Recommended Log Levels:**

**Production:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Elsa": "Information",
      "Elsa.Workflows.Runtime": "Information",
      "Quartz": "Warning"
    }
  }
}
```

**Debugging Clustering Issues:**
```json
{
  "Logging": {
    "LogLevel": {
      "Elsa.Workflows.Runtime.Services.WorkflowResumer": "Debug",
      "Elsa.Scheduling": "Debug",
      "Quartz": "Debug"
    }
  }
}
```

**Key Log Messages to Watch:**

**Successful Lock Acquisition:**
```
[INF] Acquired distributed lock for workflow instance {WorkflowInstanceId}
```

**Lock Acquisition Failure (expected in clusters):**
```
[INF] Lock acquisition failed; resume already in progress for workflow {WorkflowInstanceId}
```

**Quartz Job Execution:**
```
[INF] Quartz job executed: ResumeWorkflowTask for bookmark {BookmarkId}
```

**Cache Invalidation:**
```
[INF] Received cache invalidation event for workflow definition {DefinitionId}
```

### Troubleshooting Common Issues

#### Issue: Duplicate Workflow Executions

**Symptoms:**
- Timers firing multiple times
- Duplicate notifications or side effects
- Multiple log entries for the same workflow execution

**Diagnosis:**
```bash
# Check if distributed runtime is enabled
kubectl logs <pod-name> | grep "UseDistributedRuntime"

# Check Quartz cluster state
kubectl exec -it postgres-pod -- psql -U elsa -c "SELECT * FROM qrtz_scheduler_state;"

# Check distributed lock acquisitions
kubectl logs <pod-name> | grep -i "lock acquisition"
```

**Solutions:**
1. Verify `runtime.UseDistributedRuntime()` is called in configuration
2. Ensure Quartz clustering is enabled (`quartz.jobStore.clustered = true`)
3. Check distributed lock provider is registered and accessible
4. Verify all nodes use the same database and Redis instance

#### Issue: Bookmark Not Found

**Symptoms:**
- Scheduled tasks fail with "Bookmark not found" error
- Workflows not resuming at expected time

**Diagnosis:**
```sql
-- Check bookmarks table
SELECT * FROM elsa.bookmarks WHERE workflow_instance_id = '<instance-id>';

-- Check Quartz scheduled jobs
SELECT * FROM qrtz_triggers WHERE trigger_group = 'Elsa.Scheduling';
```

**Solutions:**
1. Check database connectivity from all nodes
2. Verify clock synchronization across nodes (NTP)
3. Ensure time zones are configured consistently
4. Check for database replication lag (if using replicas)

#### Issue: Lock Acquisition Timeouts

**Symptoms:**
- Workflows stuck in "Suspended" state
- Logs show "Failed to acquire lock after timeout"

**Diagnosis:**
```bash
# Check Redis connectivity
redis-cli -h redis-host PING

# Check for stuck locks in Redis
redis-cli --scan --pattern "workflow:*" | wc -l

# Check PostgreSQL locks
SELECT * FROM pg_locks WHERE locktype = 'advisory';
```

**Solutions:**
1. Increase lock acquisition timeout
2. Check Redis/database connectivity and latency
3. Verify lock expiration is configured to prevent stuck locks
4. Clear stale locks (use with caution):
   ```bash
   # Redis
   redis-cli --scan --pattern "workflow:*" | xargs redis-cli DEL
   
   # PostgreSQL (Medallion.Threading creates advisory locks, they auto-release)
   ```

#### Issue: Cache Inconsistencies

**Symptoms:**
- Nodes using different workflow definitions
- Changes not reflecting immediately on all nodes

**Diagnosis:**
```bash
# Check MassTransit/RabbitMQ connectivity
kubectl logs <pod-name> | grep -i "masstransit"

# Check RabbitMQ queues
kubectl exec -it rabbitmq-pod -- rabbitmqctl list_queues
```

**Solutions:**
1. Verify `elsa.UseDistributedCache(dc => dc.UseMassTransit())` is configured
2. Check RabbitMQ connectivity from all nodes
3. Verify message broker is operational
4. Restart all pods to force cache refresh

### Retention and Cleanup

**Workflow Instance Cleanup:**

Old completed or faulted workflow instances should be cleaned up periodically:

```csharp
// Configure retention policy in Elsa
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseWorkflowInstanceRetention(retention =>
        {
            retention.RetentionPeriod = TimeSpan.FromDays(30);
            retention.SweepInterval = TimeSpan.FromHours(1);
        });
    });
});
```

**Manual Cleanup (SQL):**
```sql
-- Delete completed workflows older than 30 days
DELETE FROM elsa.workflow_instances
WHERE status = 'Completed'
  AND finished_at < NOW() - INTERVAL '30 days';

-- Delete faulted workflows older than 90 days
DELETE FROM elsa.workflow_instances
WHERE status = 'Faulted'
  AND finished_at < NOW() - INTERVAL '90 days';
```

**Quartz Cleanup:**

Quartz automatically cleans up completed jobs, but you may want to clean up old execution history:

```sql
-- Delete old fired triggers (already executed)
DELETE FROM qrtz_fired_triggers
WHERE fired_time < EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days') * 1000;
```

**Bookmark Cleanup:**

Orphaned bookmarks (no associated workflow instance) should be cleaned up:

```sql
-- Find orphaned bookmarks
SELECT b.* FROM elsa.bookmarks b
LEFT JOIN elsa.workflow_instances wi ON b.workflow_instance_id = wi.id
WHERE wi.id IS NULL;

-- Delete orphaned bookmarks
DELETE FROM elsa.bookmarks
WHERE workflow_instance_id NOT IN (SELECT id FROM elsa.workflow_instances);
```

## Validation Checklist for Cluster Behavior

Use this checklist to validate your clustering setup in a test environment:

### 1. Distributed Runtime Validation

- [ ] Deploy at least 3 Elsa nodes
- [ ] Create an HTTP workflow with a suspend/resume pattern
- [ ] Send simultaneous requests to resume the same workflow instance via different nodes
- [ ] Verify in logs that only one node acquires the lock and processes the resume
- [ ] Verify the workflow completes successfully without state corruption

**Test Command:**
```bash
# Send simultaneous requests to different nodes
for i in {1..10}; do
  curl -X POST http://node1/elsa/api/workflow-instances/<id>/resume &
  curl -X POST http://node2/elsa/api/workflow-instances/<id>/resume &
  curl -X POST http://node3/elsa/api/workflow-instances/<id>/resume &
done
wait

# Check logs for lock acquisitions
kubectl logs -l app=elsa-server | grep "Acquired distributed lock"
```

### 2. Scheduled Task Validation

- [ ] Create a workflow with a timer (e.g., delay 30 seconds)
- [ ] Start the workflow on Node 1
- [ ] Monitor all nodes' logs
- [ ] Verify that exactly one node executes the timer resume
- [ ] Check Quartz scheduler state in database

**Test Command:**
```bash
# Create workflow with timer
curl -X POST http://node1/elsa/api/workflow-instances \
  -H "Content-Type: application/json" \
  -d '{"definitionId": "TimerWorkflow"}'

# Monitor all nodes
kubectl logs -l app=elsa-server -f | grep "ResumeWorkflowTask"

# Check Quartz state
kubectl exec -it postgres-pod -- psql -U elsa -c "SELECT * FROM qrtz_scheduler_state;"
```

### 3. Cache Invalidation Validation

- [ ] Connect to Node 1's Elsa Studio
- [ ] Update a workflow definition
- [ ] Immediately create a new workflow instance on Node 2
- [ ] Verify Node 2 uses the updated definition (not cached old version)
- [ ] Check logs for cache invalidation events on all nodes

**Test Command:**
```bash
# Update workflow via Node 1
curl -X PUT http://node1/elsa/api/workflow-definitions/<id> \
  -H "Content-Type: application/json" \
  -d '{...updated definition...}'

# Create instance on Node 2
curl -X POST http://node2/elsa/api/workflow-instances \
  -H "Content-Type: application/json" \
  -d '{"definitionId": "<id>"}'

# Check cache invalidation logs
kubectl logs -l app=elsa-server | grep "cache invalidation"
```

### 4. Failover Validation

- [ ] Start a workflow with a timer scheduled 5 minutes in the future
- [ ] Note which node is scheduled to execute it (check Quartz)
- [ ] Kill that node before the timer fires
- [ ] Verify another node picks up and executes the scheduled task
- [ ] Check Quartz for failover recovery in logs

**Test Command:**
```bash
# Start workflow with delayed timer
curl -X POST http://node1/elsa/api/workflow-instances \
  -H "Content-Type: application/json" \
  -d '{"definitionId": "DelayedTimerWorkflow"}'

# Check which node owns the scheduled job
kubectl exec -it postgres-pod -- psql -U elsa -c \
  "SELECT * FROM qrtz_fired_triggers;"

# Kill the owning node
kubectl delete pod elsa-server-<pod-id>

# Wait for timer to fire and verify another node executed it
kubectl logs -l app=elsa-server | grep "ResumeWorkflowTask executed"
```

### 5. High Availability Validation

- [ ] Deploy cluster with 3 nodes
- [ ] Generate continuous load (workflow executions)
- [ ] Perform rolling restart of all nodes
- [ ] Verify zero failed workflow executions during restart
- [ ] Check that readiness probes prevent traffic to restarting nodes

**Test Command:**
```bash
# Generate load
while true; do
  curl -X POST http://elsa-service/elsa/api/workflow-instances \
    -H "Content-Type: application/json" \
    -d '{"definitionId": "TestWorkflow"}'
  sleep 1
done &

# Perform rolling restart
kubectl rollout restart deployment/elsa-server

# Monitor
kubectl rollout status deployment/elsa-server
kubectl logs -l app=elsa-server --tail=100
```

### 6. Distributed Lock Validation

- [ ] Enable debug logging for `Elsa.Workflows.Runtime.Services.WorkflowResumer`
- [ ] Trigger concurrent workflow resumes
- [ ] Check logs for lock acquisition and release messages
- [ ] Verify lock acquisition times are reasonable (< 100ms for Redis, < 500ms for DB)
- [ ] Confirm no deadlocks or stuck locks

**Test Command:**
```bash
# Enable debug logging (update configmap or environment variable)
kubectl set env deployment/elsa-server \
  LOGGING__LOGLEVEL__ELSA_WORKFLOWS_RUNTIME_SERVICES_WORKFLOWRESUMER=Debug

# Trigger concurrent resumes
for i in {1..50}; do
  curl -X POST http://elsa-service/elsa/api/workflow-instances/<id>/resume &
done
wait

# Analyze logs
kubectl logs -l app=elsa-server | grep -E "(Acquired|Released) distributed lock"
```

## Security and Networking

### Database Access Security

**Recommendations:**
1. **Use TLS/SSL for database connections:**
   ```
   Server=postgres-host;Database=elsa;User Id=elsa;Password=...;SSLMode=Require
   ```

2. **Restrict database access to Elsa nodes only:**
   - Use Kubernetes Network Policies
   - Configure database firewall rules (cloud-managed databases)

3. **Use dedicated database users with minimal permissions:**
   ```sql
   CREATE USER elsa WITH PASSWORD 'secure_password';
   GRANT CONNECT ON DATABASE elsa TO elsa;
   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO elsa;
   ```

4. **Rotate credentials regularly:**
   - Use external secret management (Azure Key Vault, AWS Secrets Manager, HashiCorp Vault)
   - Implement automated rotation policies

### Network Latency Considerations

**Impact on Clustering:**
- Distributed lock acquisition time increases with latency
- Quartz cluster check-ins may timeout with high latency
- Cache invalidation events delayed

**Recommendations:**
1. **Co-locate Elsa nodes and dependencies in the same region/AZ**
2. **Monitor network latency between Elsa nodes and:**
   - Database (< 10ms recommended)
   - Redis (< 5ms recommended)
   - RabbitMQ (< 10ms recommended)

3. **Adjust timeouts if cross-region deployment is unavoidable:**
   ```csharp
   // Increase lock acquisition timeout for high-latency environments
   var lockHandle = await _distributedLockProvider.AcquireLockAsync(
       lockKey,
       timeout: TimeSpan.FromSeconds(60),  // Increased from 30s
       cancellationToken);
   ```

4. **Use database connection pooling:**
   ```
   Server=postgres-host;Database=elsa;MaxPoolSize=100;Connection Idle Lifetime=300
   ```

### Time Zone Considerations for Timers

**Issue:** Scheduled workflows may execute at incorrect times if nodes have different time zones.

**Recommendations:**
1. **Ensure all nodes use UTC:**
   ```dockerfile
   # Dockerfile
   ENV TZ=UTC
   RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
   ```

2. **Configure time zone in Kubernetes:**
   ```yaml
   env:
     - name: TZ
       value: "UTC"
   ```

3. **Store all timestamps in UTC in the database**

4. **Convert to user's local time in the UI/API layer**

### Tokenized Resume URL Security

**Code Reference:** `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs` - `GenerateBookmarkTriggerUrl`

When workflows are suspended waiting for HTTP requests, Elsa can generate tokenized URLs that allow external systems to resume the workflow:

```csharp
// Example: HTTP endpoint activity generates a resume URL
var resumeUrl = context.GenerateBookmarkTriggerUrl();
// Result: https://elsa.example.com/workflows/resume/{token}
```

**Security Considerations:**

1. **Tokens are opaque and unguessable:**
   - Generated using cryptographically secure random number generator
   - Typically 32-64 characters long

2. **Tokens should be single-use:**
   - Elsa automatically invalidates tokens after workflow resumes
   - Replay attacks prevented

3. **Use HTTPS for resume URLs:**
   - Never send tokens over unencrypted HTTP
   - Configure TLS/SSL on ingress controller

4. **Token expiration:**
   - Configure bookmark expiration to automatically clean up old tokens
   - Expired bookmarks cannot be used to resume workflows

5. **Audit logging:**
   - Log all resume attempts (successful and failed)
   - Monitor for unusual patterns (repeated resume attempts, token scanning)

**Example Configuration:**
```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseHttp(http =>
    {
        // Require HTTPS for all HTTP workflows
        http.RequireHttps = true;
        
        // Base URL for generated resume URLs
        http.BaseUrl = new Uri("https://elsa.example.com");
    });
});
```

## Studio-Specific Notes

### Embedding Studio Behind Ingress

When deploying Elsa Studio (the visual workflow designer) in a clustered environment:

**Deployment Pattern:**
```
                    ┌─────────────────┐
                    │  Ingress/LB     │
                    └────┬───────┬────┘
                         │       │
             ┌───────────┘       └───────────┐
             ↓                               ↓
    ┌─────────────────┐           ┌─────────────────┐
    │  Elsa Server    │           │  Elsa Studio    │
    │  (API)          │           │  (UI)           │
    │  Replicas: 3+   │←──────────│  Replicas: 2+   │
    └─────────────────┘           └─────────────────┘
```

**Configuration Example:**
```yaml
# Ingress routing
spec:
  rules:
    - host: elsa.example.com
      http:
        paths:
          # Studio UI
          - path: /
            pathType: Prefix
            backend:
              service:
                name: elsa-studio
                port:
                  number: 80
          # API
          - path: /elsa/api
            pathType: Prefix
            backend:
              service:
                name: elsa-server
                port:
                  number: 80
```

### Session Affinity for Studio UI

**Do you need sticky sessions for Studio?**

**Short answer: No** - If Studio is a stateless SPA (Single Page Application) that only communicates with the API.

**Long answer:**
- Elsa Studio (Blazor WebAssembly) is stateless and doesn't require session affinity
- All state is managed by the Elsa Server API (which uses distributed state)
- Studio can be freely routed to any pod

**Exception:** If using Elsa Studio Blazor Server (not WebAssembly), you **do** need session affinity:

```yaml
annotations:
  nginx.ingress.kubernetes.io/affinity: "cookie"
  nginx.ingress.kubernetes.io/session-cookie-name: "elsa-studio-session"
  nginx.ingress.kubernetes.io/session-cookie-max-age: "3600"
```

**Recommendation:** Use Elsa Studio WebAssembly for clustered deployments to avoid session affinity complexity.

### Ingress Settings

**Recommended Annotations (NGINX Ingress):**
```yaml
metadata:
  annotations:
    # SSL redirect
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    
    # Body size (for uploading large workflow definitions)
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    
    # Timeouts (for long-running workflow executions)
    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "300"
    
    # CORS (if Studio and API on different domains)
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://studio.example.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    
    # No session affinity (not needed for Elsa Server or Studio WebAssembly)
    nginx.ingress.kubernetes.io/affinity: "none"
    
    # Rate limiting (optional, for API protection)
    nginx.ingress.kubernetes.io/limit-rps: "100"
```

### Studio Authentication in Clusters

**Scenario:** Multiple Studio pods behind a load balancer.

**Requirements:**
1. **Shared authentication provider** (don't use in-memory auth)
2. **Distributed session storage** (if using cookie-based auth)
3. **Token-based authentication** (recommended for stateless clusters)

**Example: JWT Bearer Token Authentication:**
```csharp
// In Elsa Server (API)
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowsApi(api =>
    {
        api.AddJwtAuthentication(jwt =>
        {
            jwt.Authority = "https://identity.example.com";
            jwt.Audience = "elsa-api";
        });
    });
});

// In Elsa Studio
builder.Services.AddElsaStudio(studio =>
{
    studio.ServerUrl = "https://api.example.com/elsa/api";
    studio.Authentication = new BearerTokenAuthentication("your-jwt-token");
});
```

**Alternative: OpenID Connect with External Provider:**
- Azure AD
- Auth0
- Keycloak
- IdentityServer

This ensures authentication state is managed externally and works seamlessly across all cluster nodes.

## Placeholders for Screenshots

_[Screenshot: Elsa Studio showing workflow definitions synchronized across nodes]_

_[Screenshot: Kubernetes dashboard displaying 3 healthy Elsa pods with auto-scaling enabled]_

_[Screenshot: Grafana dashboard showing distributed lock acquisition metrics and Quartz job execution rates]_

_[Screenshot: Logs demonstrating only one node executing a scheduled timer across a 3-node cluster]_

_[Screenshot: Redis Commander showing distributed lock keys with TTL]_

_[Screenshot: PostgreSQL query result showing Quartz cluster state with multiple scheduler instances]_

## Related Documentation

- [Distributed Hosting](../../hosting/distributed-hosting.md) - Core distributed runtime concepts
- [Kubernetes Deployment Guide](../kubernetes-deployment.md) - General Kubernetes deployment
- [Database Configuration](../../getting-started/database-configuration.md) - Database setup
- [Authentication Guide](../authentication.md) - Securing your deployment

## Example Code Repository

For complete, deployable examples:
- [elsa-samples](https://github.com/elsa-workflows/elsa-samples) - Official sample projects
- [elsa-guides](https://github.com/elsa-workflows/elsa-guides) - Step-by-step guide implementations

## References

- Elsa Core Source Code: https://github.com/elsa-workflows/elsa-core
- Medallion.Threading: https://github.com/madelson/DistributedLock
- Quartz.NET: https://www.quartz-scheduler.net/
- MassTransit: https://masstransit.io/

## Support

- [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
- [GitHub Issues](https://github.com/elsa-workflows/elsa-core/issues)
- Community: Discord, Slack (see main README for links)

---

**Last Updated:** 2025-11-24
