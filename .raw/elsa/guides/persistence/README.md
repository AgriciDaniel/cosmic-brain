---
description: >-
  Comprehensive guide to choosing, configuring, and tuning persistence providers
  for Elsa Workflows v3, covering EF Core, MongoDB, and Dapper, along with
  retention, migrations, and operational best prac
---

# Persistence

## Executive Summary

Elsa Workflows uses persistence providers to store workflow definitions, workflow instances, bookmarks, and execution logs. Choosing the right persistence strategy is critical for performance, scalability, and operational requirements. This guide covers:

* **Provider selection** — When to choose EF Core, MongoDB, or Dapper
* **Configuration patterns** — Connection strings, migrations, and store registration
* **Indexing recommendations** — Essential indexes for common queries
* **Retention & cleanup** — Managing completed workflows and bookmark cleanup
* **Migrations & versioning** — Handling schema changes and rolling upgrades
* **Observability** — Measuring persistence latency and tracing

## Persistence Stores Overview

Elsa organizes persistence into logical stores, each responsible for a specific data type:

| Store                            | Purpose                                         | Typical Table/Collection      |
| -------------------------------- | ----------------------------------------------- | ----------------------------- |
| **Workflow Definition Store**    | Stores published and draft workflow definitions | `WorkflowDefinitions`         |
| **Workflow Instance Store**      | Stores workflow execution state and history     | `WorkflowInstances`           |
| **Bookmark Store**               | Stores suspension points for workflow resume    | `Bookmarks`                   |
| **Activity Execution Store**     | Stores activity execution records               | `ActivityExecutionRecords`    |
| **Workflow Execution Log Store** | Stores detailed execution logs                  | `WorkflowExecutionLogRecords` |
| **Workflow Inbox Store**         | Stores incoming messages for correlation        | `WorkflowInboxMessages`       |

**Code Reference:** `src/modules/Elsa.Workflows.Management/Features/WorkflowManagementFeature.cs` — Registers workflow definition and instance stores.

**Code Reference:** `src/modules/Elsa.Workflows.Runtime/Features/WorkflowRuntimeFeature.cs` — Registers runtime stores (bookmarks, inbox, execution logs).

## Persistence Providers

Elsa supports three primary persistence providers:

### Entity Framework Core (EF Core)

**Best for:** General-purpose relational database persistence with migration support.

**Supported Databases:**

* SQL Server
* PostgreSQL
* SQLite
* MySQL/MariaDB

**Pros:**

* ✅ Built-in migration support for schema versioning
* ✅ Mature ecosystem with robust tooling
* ✅ Transactional consistency across stores
* ✅ Wide database support

**Cons:**

* ❌ May have higher overhead for extremely high-throughput scenarios
* ❌ Requires migration management for schema changes

**When to Choose:**

* Production deployments requiring schema versioning
* Teams familiar with EF Core and relational databases
* Scenarios requiring transactional consistency

**Documentation:**

* [SQL Server Guide](sql-server.md) - Comprehensive SQL Server setup and configuration
* [EF Core Migrations Guide](ef-migrations.md) - Working with migrations and custom entities
* [EF Core Setup Example](examples/efcore-setup.md) - Basic configuration patterns

### MongoDB

**Best for:** Document-oriented persistence with flexible schemas.

**Pros:**

* ✅ Flexible schema evolution without migrations
* ✅ Native document storage suits workflow state
* ✅ Horizontal scaling via sharding
* ✅ Built-in replication for high availability

**Cons:**

* ❌ No built-in migration tooling (schema changes require application logic)
* ❌ Index creation must be managed manually
* ❌ Different consistency model than relational databases

**When to Choose:**

* Teams already using MongoDB
* Scenarios requiring flexible schema evolution
* High-volume workloads with horizontal scaling needs

See [MongoDB Setup Example](examples/mongodb-setup.md) for configuration details.

### Dapper

**Best for:** Performance-critical scenarios requiring fine-grained SQL control.

**Pros:**

* ✅ Minimal ORM overhead
* ✅ Direct SQL control for optimization
* ✅ Lower memory footprint

**Cons:**

* ❌ Manual schema management (no built-in migrations)
* ❌ Requires SQL expertise for customization
* ❌ Less abstraction than EF Core

**When to Choose:**

* Extreme performance requirements
* Teams with strong SQL expertise
* Scenarios requiring custom query optimization

See [Dapper Setup Example](examples/dapper-setup.md) for configuration details.

## Configuration Patterns

### Basic Configuration

All persistence providers are configured through the `services.AddElsa(...)` method:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    // Configure workflow management (definitions, instances)
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
        });
    });
    
    // Configure workflow runtime (bookmarks, inbox, execution logs)
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
        });
    });
    
    // Enable API endpoints
    elsa.UseWorkflowsApi();
});

var app = builder.Build();
app.Run();
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs` — Core services wire-up.

### Connection Strings

**appsettings.json:**

```json
{
  "ConnectionStrings": {
    "PostgreSql": "Host=localhost;Database=elsa;Username=elsa;Password=YOUR_PASSWORD;Port=5432",
    "SqlServer": "Server=localhost;Database=Elsa;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=true",
    "MongoDb": "mongodb://localhost:27017/elsa"
  }
}
```

**Environment Variables:**

```bash
CONNECTIONSTRINGS__POSTGRESQL="Host=localhost;Database=elsa;..."
CONNECTIONSTRINGS__MONGODB="mongodb://localhost:27017/elsa"
```

### EF Core Migrations

For EF Core providers, migrations manage schema changes:

**1. Install EF Core Tools:**

```bash
dotnet tool install --global dotnet-ef
```

**2. Apply Migrations at Startup (Recommended for Development):**

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UsePostgreSql(connectionString);
        ef.RunMigrations = true;  // Apply migrations on startup
    });
});
```

**3. Apply Migrations via CLI (Recommended for Production):**

```bash
# Generate migrations
dotnet ef migrations add InitialCreate --context ManagementElsaDbContext

# Apply migrations
dotnet ef database update --context ManagementElsaDbContext
```

**Schema Versioning Notes:**

* Always test migrations in a non-production environment first
* Use a staging database identical to production for migration testing
* Consider blue-green deployments for zero-downtime migrations
* Keep migration scripts in source control

For detailed information on working with EF Core migrations, adding custom entities, and migration strategies, see the [EF Core Migrations Guide](ef-migrations.md).

### MongoDB Configuration

MongoDB does not use migrations. Configure the database and collection names:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseMongoDb(mongo =>
    {
        mongo.ConnectionString = builder.Configuration.GetConnectionString("MongoDb");
        mongo.DatabaseName = "elsa";  // Optional: defaults to 'elsa'
    });
});
```

**Index Creation:** MongoDB requires manual index creation. See [Indexing Notes](examples/indexing-notes.md) for recommended indexes. Refer to [MongoDB Index Documentation](https://www.mongodb.com/docs/manual/indexes/) for detailed guidance.

**Mapping Considerations:**

* Elsa uses MongoDB driver's conventions for BSON serialization
* Custom activity data must be serializable to BSON
* Consider using `BsonIgnore` attribute for non-persisted properties

### Dapper Configuration

Dapper requires a connection factory and manual schema setup:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseDapper(dapper =>
    {
        dapper.ConnectionFactory = () => new NpgsqlConnection(connectionString);
        dapper.Schema = "elsa";  // Optional: database schema
    });
});
```

**Schema Responsibility:**

* You are responsible for creating and maintaining the database schema
* Use SQL scripts or a migration tool like FluentMigrator
* See [Dapper Setup Example](examples/dapper-setup.md) for schema scripts

## Indexes & Queries

Proper indexing is essential for production performance. Create indexes for frequently queried columns:

### Recommended Indexes

**Workflow Instances:**

```sql
-- Query by instance ID (primary key in most providers)
-- Query by correlation ID
CREATE INDEX idx_workflow_instances_correlation_id ON workflow_instances(correlation_id);

-- Query by status (running, suspended, completed, faulted)
CREATE INDEX idx_workflow_instances_status ON workflow_instances(status);

-- Query by definition ID
CREATE INDEX idx_workflow_instances_definition_id ON workflow_instances(definition_id);

-- Query by updated timestamp (for retention/cleanup)
CREATE INDEX idx_workflow_instances_updated_at ON workflow_instances(updated_at);

-- Composite index for common queries
CREATE INDEX idx_workflow_instances_status_definition ON workflow_instances(status, definition_id);
```

**Bookmarks:**

```sql
-- Query by activity type + stimulus hash (primary lookup path)
CREATE INDEX idx_bookmarks_activity_type_hash ON bookmarks(activity_type_name, hash);

-- Query by workflow instance ID (for cleanup)
CREATE INDEX idx_bookmarks_workflow_instance_id ON bookmarks(workflow_instance_id);

-- Query by correlation ID
CREATE INDEX idx_bookmarks_correlation_id ON bookmarks(correlation_id);
```

**Incidents:**

```sql
-- Query by workflow instance ID
CREATE INDEX idx_incidents_workflow_instance_id ON incidents(workflow_instance_id);

-- Query by timestamp (for monitoring dashboards)
CREATE INDEX idx_incidents_timestamp ON incidents(timestamp);
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/Bookmarks/*` — Bookmark hashing and storage logic.

See [Indexing Notes](examples/indexing-notes.md) for provider-specific guidance.

> **Note:** Defer detailed vendor-specific index tuning (covering indexes, partial indexes, index-only scans) to official database documentation.

## Retention & Cleanup

Over time, completed workflow instances and bookmarks accumulate. Configure retention policies to manage storage:

### Workflow Instance Retention

Use the built-in retention feature to automatically clean up old workflow instances:

```csharp
elsa.UseRetention(retention =>
{
    retention.SweepInterval = TimeSpan.FromHours(1);  // Check every hour
    
    // Delete completed workflows older than 30 days
    retention.AddDeletePolicy("Delete old completed workflows", sp =>
    {
        var clock = sp.GetRequiredService<ISystemClock>();
        var threshold = clock.UtcNow.AddDays(-30);
        
        return new RetentionWorkflowInstanceFilter
        {
            WorkflowStatus = WorkflowStatus.Finished,
            TimestampFilters = new[]
            {
                new TimestampFilter
                {
                    Column = nameof(WorkflowInstance.FinishedAt),
                    Operator = TimestampFilterOperator.LessThanOrEqual,
                    Timestamp = threshold
                }
            }
        };
    });
    
    // Delete faulted workflows older than 90 days
    retention.AddDeletePolicy("Delete old faulted workflows", sp =>
    {
        var clock = sp.GetRequiredService<ISystemClock>();
        var threshold = clock.UtcNow.AddDays(-90);
        
        return new RetentionWorkflowInstanceFilter
        {
            WorkflowStatus = WorkflowStatus.Faulted,
            TimestampFilters = new[]
            {
                new TimestampFilter
                {
                    Column = nameof(WorkflowInstance.FinishedAt),
                    Operator = TimestampFilterOperator.LessThanOrEqual,
                    Timestamp = threshold
                }
            }
        };
    });
});
```

**Code Reference:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs` — Retention context and options.

### Bookmark Cleanup

Orphaned bookmarks (where the associated workflow instance no longer exists) should be cleaned up:

```sql
-- Find orphaned bookmarks
SELECT b.* FROM bookmarks b
LEFT JOIN workflow_instances wi ON b.workflow_instance_id = wi.id
WHERE wi.id IS NULL;

-- Delete orphaned bookmarks
DELETE FROM bookmarks
WHERE workflow_instance_id NOT IN (SELECT id FROM workflow_instances);
```

### Workflow Inbox Cleanup

The `WorkflowInboxCleanup` job removes stale inbox messages:

```csharp
elsa.UseWorkflowRuntime(runtime =>
{
    runtime.WorkflowInboxCleanupOptions = options =>
    {
        options.SweepInterval = TimeSpan.FromHours(1);
        options.Ttl = TimeSpan.FromDays(7);  // Remove messages older than 7 days
    };
});
```

**Code Reference:** `src/modules/Elsa.Workflows.Runtime/Features/WorkflowRuntimeFeature.cs` — Inbox cleanup options.

### Manual Cleanup (SQL)

For immediate cleanup needs:

```sql
-- Delete completed workflows older than 30 days
DELETE FROM workflow_instances
WHERE status = 'Finished'
  AND finished_at < NOW() - INTERVAL '30 days';

-- Delete activity execution records for deleted instances
DELETE FROM activity_execution_records
WHERE workflow_instance_id NOT IN (SELECT id FROM workflow_instances);

-- Delete execution logs for deleted instances
DELETE FROM workflow_execution_log_records
WHERE workflow_instance_id NOT IN (SELECT id FROM workflow_instances);
```

## Backup & Restore

### Environment Consistency

When backing up and restoring Elsa databases:

1. **Version Alignment:** Ensure the Elsa version in your application matches the schema version in the database. Mismatched versions can cause runtime errors.
2. **Consistent Backups:** For clustered deployments, quiesce the cluster or use database-native snapshot capabilities to ensure consistency.
3. **Include All Stores:** If using separate databases for management and runtime stores, back up both.
4. **Test Restores:** Regularly test restore procedures in a non-production environment.

### Backup Commands

**PostgreSQL:**

```bash
# Full backup
pg_dump -h localhost -U elsa -d elsa -F c -f elsa_backup.dump

# Restore
pg_restore -h localhost -U elsa -d elsa elsa_backup.dump
```

**SQL Server:**

```sql
BACKUP DATABASE [Elsa] TO DISK = 'C:\Backups\Elsa.bak';

RESTORE DATABASE [Elsa] FROM DISK = 'C:\Backups\Elsa.bak';
```

**MongoDB:**

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/elsa" --out=/backup/elsa

# Restore
mongorestore --uri="mongodb://localhost:27017/elsa" /backup/elsa
```

## Migrations & Versioning

### Managing Breaking Changes

When Elsa releases a new version with schema changes:

1. **Review Release Notes:** Check for migration steps or breaking changes.
2. **Test in Staging:** Apply migrations to a staging environment first.
3. **Rolling Upgrades:** For clustered deployments:
   * Apply database migrations first (backward-compatible changes)
   * Roll out new application version to nodes one at a time
   * Monitor for errors during transition
4. **Rollback Plan:** Keep database backups and have a rollback strategy.

### EF Core Migration Steps

**1. Update Elsa Packages:**

```bash
dotnet add package Elsa --version 3.x.x
dotnet add package Elsa.Persistence.EFCore.PostgreSql --version 3.x.x
```

**2. Generate Migration:**

```bash
dotnet ef migrations add UpdateToVersion3xx --context ManagementElsaDbContext
```

**3. Review Migration:** Inspect the generated migration file for potentially destructive changes.

**4. Apply Migration:**

```bash
# Development
dotnet ef database update --context ManagementElsaDbContext

# Production (generate SQL script for review)
dotnet ef migrations script --context ManagementElsaDbContext --idempotent
```

### Schema Versioning Best Practices

* Keep migrations in source control alongside application code
* Use semantic versioning to correlate Elsa versions with schema versions
* Document any manual data transformations required between versions
* Consider database branching strategies for team development

## Observability & Performance

### Measuring Persistence Latency

Monitor database operations to identify bottlenecks:

```csharp
using OpenTelemetry.Trace;

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing
            .AddAspNetCoreInstrumentation()
            .AddNpgsql()  // PostgreSQL instrumentation
            .AddSource("Elsa.Workflows")
            .AddOtlpExporter();
    });
```

### Key Metrics to Monitor

| Metric                                 | Description                     | Alert Threshold   |
| -------------------------------------- | ------------------------------- | ----------------- |
| `db.query.duration`                    | Database query execution time   | P95 > 500ms       |
| `elsa.workflow_instance.save.duration` | Workflow state persistence time | P95 > 1000ms      |
| `elsa.bookmark.lookup.duration`        | Bookmark query time             | P95 > 100ms       |
| `db.connection.pool.active`            | Active database connections     | > 80% of max pool |

### Tracing with Elsa.OpenTelemetry

For distributed tracing of workflow execution including persistence operations:

```csharp
using Elsa.OpenTelemetry.Extensions;

builder.Services.AddElsa(elsa =>
{
    elsa.UseOpenTelemetry();  // Enable workflow tracing
});

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing.AddElsaSource();
        tracing.AddOtlpExporter();
    });
```

See [Performance & Scaling Guide](../performance/) for detailed observability configuration.

> **Note:** Elsa provides built-in tracing. Custom metrics (throughput, latency percentiles) are user-defined. See DOC-016 (Monitoring Guide) for implementation patterns.

## Common Pitfalls

### 1. Long Transactions

**Problem:** Workflows with many activities in a single burst can hold database locks for extended periods.

**Symptoms:**

* Lock wait timeouts
* Blocked queries
* Degraded throughput under load

**Mitigation:**

* Use commit strategies to limit transaction scope (see [Performance Guide](../performance/))
* Configure shorter lock timeouts
* Consider breaking large workflows into smaller sub-workflows

### 2. High-Cardinality Bookmarks

**Problem:** Workflows creating many unique bookmarks (e.g., one per user or order) can overwhelm the bookmark index.

**Symptoms:**

* Slow bookmark lookups
* Index bloat
* Memory pressure

**Mitigation:**

* Limit bookmark cardinality by design
* Use correlation IDs to group related bookmarks
* Implement bookmark cleanup policies

**Code Reference:** `src/modules/Elsa.Workflows.Core/Bookmarks/*` — Understand bookmark hashing to design efficient bookmark strategies.

### 3. Missing Indexes

**Problem:** Production deployments without proper indexes suffer degraded query performance.

**Symptoms:**

* Full table scans in query plans
* Slow workflow list/search operations
* High database CPU

**Mitigation:**

* Apply recommended indexes (see [Indexing Notes](examples/indexing-notes.md))
* Monitor slow query logs
* Use database-native query analysis tools

### 4. Noisy Logging of Large Payloads

**Problem:** Logging workflow inputs/outputs can expose sensitive data and bloat logs.

**Symptoms:**

* Excessive log volume
* Sensitive data in logs
* Log aggregation costs

**Mitigation:**

* Configure log levels appropriately for production
* Use structured logging with field exclusions
* Consider log retention policies

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Elsa": "Warning",
      "Elsa.Workflows.Runtime": "Information"
    }
  }
}
```

### 5. Connection Pool Exhaustion

**Problem:** High-concurrency workflows exhaust database connection pools.

**Symptoms:**

* Timeout waiting for connection
* Intermittent failures under load
* Degraded throughput

**Mitigation:**

* Increase connection pool size appropriately
* Monitor pool utilization metrics
* Configure connection timeout and retry policies

```csharp
// PostgreSQL example with pool settings
var connectionString = "Host=localhost;Database=elsa;Username=elsa;Password=...;MaxPoolSize=100;MinPoolSize=10";
```

## Related Documentation

* [SQL Server Guide](sql-server.md) — Complete SQL Server configuration and troubleshooting
* [EF Core Migrations Guide](ef-migrations.md) — Working with migrations and custom entities
* [Clustering Guide](../clustering/) — Distributed deployment and distributed locking (DOC-015)
* [Troubleshooting Guide](../troubleshooting/) — Diagnosing common issues (DOC-017)
* [Performance & Scaling Guide](../performance/) — Commit strategies and observability (DOC-021)
* [Database Configuration](../../getting-started/database-configuration.md) — Basic database setup
* [Retention](../../optimize/retention.md) — Detailed retention configuration
* [Log Persistence](../../optimize/log-persistence.md) — Activity log optimization

## Example Files

* [EF Core Setup Example](examples/efcore-setup.md)
* [MongoDB Setup Example](examples/mongodb-setup.md)
* [Dapper Setup Example](examples/dapper-setup.md)
* [Indexing Notes](examples/indexing-notes.md)
* [Source File References](README-REFERENCES.md)

***

**Last Updated:** 2025-11-28
