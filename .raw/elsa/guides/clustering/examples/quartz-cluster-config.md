# Quartz.NET Clustering Configuration

This guide explains how to configure Quartz.NET in clustered mode for distributed scheduling in Elsa Workflows.

## Overview

When running multiple Elsa instances, Quartz.NET clustering ensures that scheduled bookmarks (timers, delays, cron triggers) execute only once across all nodes. Each node participates in the cluster and coordinates via a shared database.

## Quartz Configuration Properties

Here's an example `quartz.properties` file for clustering:

```properties
# Instance configuration
quartz.scheduler.instanceName = ElsaQuartzCluster
quartz.scheduler.instanceId = AUTO

# Thread pool configuration
quartz.threadPool.type = Quartz.Simpl.SimpleThreadPool, Quartz
quartz.threadPool.threadCount = 10
quartz.threadPool.threadPriority = Normal

# Job store configuration (PostgreSQL)
quartz.jobStore.type = Quartz.Impl.AdoJobStore.JobStoreTX, Quartz
quartz.jobStore.useProperties = true
quartz.jobStore.dataSource = default
quartz.jobStore.tablePrefix = qrtz_
quartz.jobStore.driverDelegateType = Quartz.Impl.AdoJobStore.PostgreSQLDelegate, Quartz

# Clustering configuration
quartz.jobStore.clustered = true
quartz.jobStore.clusterCheckinInterval = 20000
quartz.jobStore.clusterCheckinMisfireThreshold = 60000

# Data source configuration
quartz.dataSource.default.provider = Npgsql
quartz.dataSource.default.connectionString = Server=localhost;Port=5432;Database=elsa;User Id=elsa;Password=YOUR_PASSWORD;

# Serialization
quartz.serializer.type = json
```

## Configuration in Elsa (Program.cs)

### Option 1: Using Extension Methods (Recommended)

```csharp
using Elsa.Extensions;
using Quartz;

var builder = WebApplication.CreateBuilder(args);

// Configure Elsa with Quartz scheduling
builder.Services.AddElsa(elsa =>
{
    // Enable workflow runtime with distributed configuration
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        // ... distributed locking configuration
    });
    
    // Enable Quartz scheduling
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
    
    // Configure Quartz with persistent store and clustering
    elsa.UseQuartz(quartz =>
    {
        // This extension configures clustering automatically
        quartz.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
    });
});

var app = builder.Build();
app.Run();
```

### Option 2: Manual Quartz Configuration

If you need more control over Quartz settings:

```csharp
using Elsa.Extensions;
using Quartz;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
    });
    
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
});

// Manual Quartz configuration
builder.Services.AddQuartz(quartz =>
{
    // Set unique instance name for the cluster
    quartz.SchedulerName = "ElsaQuartzCluster";
    quartz.SchedulerId = "AUTO";
    
    // Use persistent PostgreSQL job store
    quartz.UsePersistentStore(store =>
    {
        store.UseProperties = true;
        store.UsePostgres(postgres =>
        {
            postgres.ConnectionString = builder.Configuration.GetConnectionString("PostgreSql");
            postgres.TablePrefix = "qrtz_";
        });
        
        // Enable clustering
        store.UseClustering(clustering =>
        {
            clustering.CheckinInterval = TimeSpan.FromSeconds(20);
            clustering.CheckinMisfireThreshold = TimeSpan.FromSeconds(60);
        });
        
        // Use JSON serialization
        store.UseJsonSerializer();
    });
    
    // Thread pool configuration
    quartz.UseDefaultThreadPool(tp =>
    {
        tp.MaxConcurrency = 10;
    });
});

// Add Quartz hosted service
builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

var app = builder.Build();
app.Run();
```

## Database Tables

Quartz automatically creates these tables with the `qrtz_` prefix:

- `qrtz_job_details` - Job definitions
- `qrtz_triggers` - Trigger configurations
- `qrtz_simple_triggers` - Simple trigger data
- `qrtz_cron_triggers` - Cron trigger data
- `qrtz_blob_triggers` - Blob trigger data
- `qrtz_calendars` - Calendar data
- `qrtz_fired_triggers` - Currently executing triggers
- `qrtz_paused_trigger_grps` - Paused trigger groups
- `qrtz_scheduler_state` - Scheduler state (cluster node heartbeats)
- `qrtz_locks` - Distributed locks for cluster coordination

## How Clustering Works

1. **Instance Registration**: Each node registers itself in `qrtz_scheduler_state` with a unique instance ID
2. **Heartbeat**: Nodes check in every `clusterCheckinInterval` milliseconds (default: 20 seconds)
3. **Leader Election**: Quartz uses database locks to coordinate which node executes each scheduled job
4. **Failure Recovery**: If a node fails to check in within `clusterCheckinMisfireThreshold`, other nodes recover its jobs
5. **Job Execution**: Only one node executes each scheduled job; others skip it if already claimed

## Key Configuration Options

| Setting | Description | Recommended Value |
|---------|-------------|-------------------|
| `instanceId` | Unique ID per node | `AUTO` (auto-generated) |
| `clustered` | Enable clustering | `true` |
| `clusterCheckinInterval` | Heartbeat frequency (ms) | `20000` (20 seconds) |
| `clusterCheckinMisfireThreshold` | Failure detection timeout (ms) | `60000` (60 seconds) |
| `threadCount` | Worker threads per node | `10` (adjust based on load) |
| `tablePrefix` | Database table prefix | `qrtz_` |

## Enabling/Disabling Scheduling per Node

If you want some nodes to only handle workflow execution (workers) without scheduling:

```csharp
// On scheduler nodes:
builder.Services.AddElsa(elsa =>
{
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
});

// On worker-only nodes (disable scheduling):
// Simply don't call UseScheduling() or UseQuartzScheduler()
// The node will still participate in workflow execution via distributed runtime
```

## Troubleshooting

### Issue: Jobs executing multiple times

**Cause**: Clustering not properly enabled or database connection issues

**Solution**: 
- Verify `quartz.jobStore.clustered = true`
- Check database connectivity from all nodes
- Ensure all nodes use the same `instanceName`
- Verify table prefix matches across all nodes

### Issue: Jobs not executing

**Cause**: All nodes might have stopped or locks are stuck

**Solution**:
```sql
-- Check scheduler state
SELECT * FROM qrtz_scheduler_state;

-- Check for stuck locks
SELECT * FROM qrtz_locks;

-- Check fired triggers
SELECT * FROM qrtz_fired_triggers;

-- Clear stale scheduler instances (use with caution, only if nodes are confirmed down)
DELETE FROM qrtz_scheduler_state WHERE last_checkin_time < (EXTRACT(EPOCH FROM NOW()) * 1000) - 300000;
```

### Issue: Misfire threshold warnings

**Cause**: Nodes are not checking in frequently enough

**Solution**: 
- Reduce `clusterCheckinInterval` (e.g., from 20s to 10s)
- Increase `clusterCheckinMisfireThreshold` to allow more tolerance
- Check for database performance issues

## Environment Variables

Set these in your deployment configuration (Kubernetes, Docker Compose, etc.):

```bash
# Quartz clustering
QUARTZ__CLUSTERED=true
QUARTZ__INSTANCENAME=ElsaQuartzCluster
QUARTZ__SCHEDULER_INSTANCEID=AUTO

# Database connection (shared by all nodes)
CONNECTIONSTRINGS__POSTGRESQL="Server=postgres-host;Port=5432;Database=elsa;User Id=elsa;Password=YOUR_PASSWORD;MaxPoolSize=100"
```

## References

- Quartz.NET Documentation: https://www.quartz-scheduler.net/documentation/
- Elsa Scheduling Configuration: See `src/modules/Elsa.Scheduling/` in elsa-core repository
- DefaultBookmarkScheduler: `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs`
- ResumeWorkflowTask: `src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs`
