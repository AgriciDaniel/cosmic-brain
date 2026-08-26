---
type: concept
title: Elsa Persistence
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa-workflows
  - persistence
  - ef-core
  - mongodb
  - dapper
  - database
status: developing
address: c-000083
related:
  - "[[Elsa Workflows]]"
  - "[[Elsa API Client]]"
  - "[[Elsa HTTP Workflows]]"
  - "[[Elsa Plugins and Modules]]"
---

# Elsa Persistence

Elsa Workflows uses a pluggable persistence layer to store workflow definitions, workflow instances, bookmarks, and execution logs. Choosing the right persistence provider and strategy is critical for performance, scalability, and operational reliability.

---

## Persistence Stores

Elsa organizes persistence into logical stores, each responsible for a specific data type:

| Store | Purpose | Typical Table/Collection |
|-------|---------|--------------------------|
| **Workflow Definition Store** | Published and draft workflow definitions | `WorkflowDefinitions` |
| **Workflow Instance Store** | Workflow execution state and history | `WorkflowInstances` |
| **Bookmark Store** | Suspension points for workflow resume | `Bookmarks` |
| **Activity Execution Store** | Activity execution records | `ActivityExecutionRecords` |
| **Workflow Execution Log Store** | Detailed execution logs | `WorkflowExecutionLogRecords` |
| **Workflow Inbox Store** | Incoming messages for correlation | `WorkflowInboxMessages` |

> [!info] Source References
> - `WorkflowManagementFeature` in `Elsa.Workflows.Management` registers definition and instance stores.
> - `WorkflowRuntimeFeature` in `Elsa.Workflows.Runtime` registers runtime stores (bookmarks, inbox, execution logs).

---

## Persistence Providers

Elsa supports three primary persistence providers.

### Entity Framework Core (EF Core)

**Best for:** General-purpose relational database persistence with migration support.

**Supported Databases:** SQL Server, PostgreSQL, SQLite, MySQL/MariaDB.

**Pros:**
- Built-in migration support for schema versioning
- Mature ecosystem with robust tooling
- Transactional consistency across stores
- Wide database support

**Cons:**
- Higher overhead for extreme high-throughput scenarios
- Requires migration management for schema changes

**When to Choose:**
- Production deployments requiring schema versioning
- Teams familiar with EF Core and relational databases
- Scenarios requiring transactional consistency

### MongoDB

**Best for:** Document-oriented persistence with flexible schemas.

**Pros:**
- Flexible schema evolution without migrations
- Native document storage suits workflow state
- Horizontal scaling via sharding
- Built-in replication for high availability

**Cons:**
- No built-in migration tooling (schema changes require application logic)
- Index creation must be managed manually
- Different consistency model than relational databases

**When to Choose:**
- Teams already using MongoDB
- Scenarios requiring flexible schema evolution
- High-volume workloads with horizontal scaling needs

### Dapper

**Best for:** Performance-critical scenarios requiring fine-grained SQL control.

**Pros:**
- Minimal ORM overhead
- Direct SQL control for optimization
- Lower memory footprint

**Cons:**
- Manual schema management (no built-in migrations)
- Requires SQL expertise for customization
- Less abstraction than EF Core

**When to Choose:**
- Extreme performance requirements
- Teams with strong SQL expertise
- Scenarios requiring custom query optimization

---

## Configuration Patterns

### Basic Configuration (EF Core Example)

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
        });
    });

    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
        });
    });

    elsa.UseWorkflowsApi();
});

var app = builder.Build();
app.Run();
```

### Connection Strings

```json
{
  "ConnectionStrings": {
    "PostgreSql": "Host=localhost;Database=elsa;Username=elsa;Password=YOUR_PASSWORD;Port=5432",
    "SqlServer": "Server=localhost;Database=Elsa;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=true",
    "MongoDb": "mongodb://localhost:27017/elsa"
  }
}
```

### MongoDB Configuration

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseMongoDb(mongo =>
    {
        mongo.ConnectionString = builder.Configuration.GetConnectionString("MongoDb");
        mongo.DatabaseName = "elsa";
    });
});
```

MongoDB does not use migrations. Indexes must be created manually (see the indexing section below). Custom activity data must be BSON-serializable.

### Dapper Configuration

Dapper requires a connection factory and manual schema setup:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseDapper(dapper =>
    {
        dapper.ConnectionFactory = () => new NpgsqlConnection(connectionString);
        dapper.Schema = "elsa";
    });
});
```

> [!warning] Schema Responsibility
> With Dapper, you are responsible for creating and maintaining the database schema. Use SQL scripts or tools like FluentMigrator or DbUp.

---

## EF Core Migrations

Elsa uses two separate `DbContext` classes:
- **`ManagementElsaDbContext`** — Workflow definitions and instances.
- **`RuntimeElsaDbContext`** — Bookmarks, inbox messages, activity execution records, execution logs.

### Migration Strategies

| Strategy | Description | Best For |
|----------|-------------|----------|
| **Single Shared Database** | Elsa and your app share one database with separate contexts | Small to medium apps, dev environments |
| **Separate Databases** | Elsa uses one database, your app uses another | Large apps, microservices |
| **Split Elsa Management and Runtime** | Separate databases for management and runtime contexts | High-throughput scenarios, compliance |

### Applying Migrations

```bash
# Apply Management context migrations
dotnet ef database update --context ManagementElsaDbContext

# Apply Runtime context migrations
dotnet ef database update --context RuntimeElsaDbContext
```

### Adding Custom Entities

Create your own `DbContext` sharing the same database:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
}
```

Register it alongside Elsa:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```

Generate your own migrations:

```bash
dotnet ef migrations add InitialCreate --context ApplicationDbContext
dotnet ef database update --context ApplicationDbContext
```

---

## Indexing Recommendations

Proper indexing is essential for production performance.

### Workflow Instances

```sql
CREATE INDEX idx_workflow_instances_correlation_id ON workflow_instances(correlation_id);
CREATE INDEX idx_workflow_instances_status ON workflow_instances(status);
CREATE INDEX idx_workflow_instances_definition_id ON workflow_instances(definition_id);
CREATE INDEX idx_workflow_instances_status_definition ON workflow_instances(status, definition_id);
CREATE INDEX idx_workflow_instances_updated_at ON workflow_instances(updated_at DESC);
```

### Bookmarks

```sql
-- Primary lookup for resume operations
CREATE INDEX idx_bookmarks_activity_type_hash ON bookmarks(activity_type_name, hash);
CREATE INDEX idx_bookmarks_workflow_instance_id ON bookmarks(workflow_instance_id);
CREATE INDEX idx_bookmarks_correlation_id ON bookmarks(correlation_id);
CREATE INDEX idx_bookmarks_hash ON bookmarks(hash);
```

### Activity Execution Records

```sql
CREATE INDEX idx_activity_records_workflow_instance ON activity_execution_records(workflow_instance_id);
CREATE INDEX idx_activity_records_activity_id ON activity_execution_records(activity_id);
CREATE INDEX idx_activity_records_started_at ON activity_execution_records(started_at DESC);
```

### MongoDB Indexes

```javascript
db.WorkflowInstances.createIndex({ "CorrelationId": 1 });
db.WorkflowInstances.createIndex({ "Status": 1 });
db.Bookmarks.createIndex({ "ActivityTypeName": 1, "Hash": 1 });
db.WorkflowInboxMessages.createIndex({ "CreatedAt": 1 }, { expireAfterSeconds: 604800 });
```

---

## Retention and Cleanup

### Workflow Instance Retention

Use the built-in retention feature to automatically clean up old workflow instances:

```csharp
elsa.UseRetention(retention =>
{
    retention.SweepInterval = TimeSpan.FromHours(1);

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
});
```

### Bookmark Cleanup

Orphaned bookmarks should be cleaned up periodically:

```sql
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
        options.Ttl = TimeSpan.FromDays(7);
    };
});
```

---

## Observability and Performance

### Tracing with OpenTelemetry

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseOpenTelemetry();
});

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing.AddElsaSource();
        tracing.AddOtlpExporter();
    });
```

### Key Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `db.query.duration` | Database query execution time | P95 > 500ms |
| `elsa.workflow_instance.save.duration` | Workflow state persistence time | P95 > 1000ms |
| `elsa.bookmark.lookup.duration` | Bookmark query time | P95 > 100ms |
| `db.connection.pool.active` | Active database connections | > 80% of max pool |

---

## Common Pitfalls

1. **Long Transactions** — Workflows with many activities can hold database locks. Mitigate by using commit strategies and breaking large workflows into sub-workflows.
2. **High-Cardinality Bookmarks** — Many unique bookmarks can overwhelm indexes. Limit cardinality by design and use correlation IDs.
3. **Missing Indexes** — Production deployments without proper indexes suffer degraded query performance. Apply recommended indexes before going to production.
4. **Noisy Logging of Large Payloads** — Logging workflow inputs/outputs can expose sensitive data and bloat logs. Configure log levels appropriately.
5. **Connection Pool Exhaustion** — High-concurrency workflows can exhaust database connection pools. Increase pool size and monitor utilization.

---

## Related Documentation

- [[Elsa Workflows]] — Overview of the Elsa Workflows ecosystem
- [[Elsa API Client]] — Programmatically interacting with Elsa Server
- [[Elsa HTTP Workflows]] — Building HTTP endpoint workflows
- [[Elsa Plugins and Modules]] — Extending Elsa with custom modules
