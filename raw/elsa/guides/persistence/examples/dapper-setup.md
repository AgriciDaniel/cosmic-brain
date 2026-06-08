---
description: >-
  Minimal example to enable Dapper persistence for Elsa Workflows, including connection factory setup and schema responsibility notes.
---

# Dapper Setup Example

This document provides a minimal, copy-pasteable example for configuring Elsa Workflows with Dapper persistence.

## Prerequisites

- .NET 8.0 or later
- Database server (PostgreSQL or SQL Server)
- Elsa v3.x packages
- Schema created manually (Dapper does not manage migrations)

## NuGet Packages

**For PostgreSQL:**
```bash
dotnet add package Elsa
dotnet add package Elsa.Dapper
dotnet add package Npgsql
```

**For SQL Server:**
```bash
dotnet add package Elsa
dotnet add package Elsa.Dapper
dotnet add package Microsoft.Data.SqlClient
```

## When to Use Dapper

Dapper is ideal for:
- **Performance-critical scenarios** requiring minimal ORM overhead
- **Fine-grained SQL control** for custom query optimization
- **Existing database schemas** where you want to integrate Elsa
- **Teams with strong SQL expertise** who prefer direct control

Consider EF Core instead if you need:
- Automatic migration management
- Higher-level abstractions
- Simpler configuration

## Minimal Configuration

### Program.cs

```csharp
using Elsa.Extensions;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PostgreSql")
    ?? throw new InvalidOperationException("Connection string 'PostgreSql' not found.");

builder.Services.AddElsa(elsa =>
{
    // Configure workflow management with Dapper
    elsa.UseWorkflowManagement(management =>
    {
        management.UseDapper(dapper =>
        {
            // Connection factory creates new connections
            dapper.ConnectionFactory = () => new NpgsqlConnection(connectionString);
            
            // Optional: Specify schema (defaults to public/dbo)
            dapper.Schema = "elsa";
        });
    });
    
    // Configure workflow runtime with Dapper
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDapper(dapper =>
        {
            dapper.ConnectionFactory = () => new NpgsqlConnection(connectionString);
            dapper.Schema = "elsa";
        });
    });
    
    // Enable HTTP activities (optional)
    elsa.UseHttp();
    
    // Enable scheduling activities (optional)
    elsa.UseScheduling();
    
    // Enable API endpoints
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

// Map Elsa API endpoints
app.UseWorkflows();

app.Run();
```

### SQL Server Example

```csharp
using Microsoft.Data.SqlClient;

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseDapper(dapper =>
        {
            dapper.ConnectionFactory = () => new SqlConnection(connectionString);
            dapper.Schema = "elsa";
        });
    });
});
```

### appsettings.json

**PostgreSQL:**
```json
{
  "ConnectionStrings": {
    "PostgreSql": "Host=localhost;Database=elsa;Username=elsa;Password=YOUR_PASSWORD;Port=5432"
  }
}
```

**SQL Server:**
```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost;Database=Elsa;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=true"
  }
}
```

## Schema Creation

With Dapper, you are responsible for creating and maintaining the database schema.

### PostgreSQL Schema

```sql
-- Create schema
CREATE SCHEMA IF NOT EXISTS elsa;

-- Workflow Definitions
CREATE TABLE elsa.workflow_definitions (
    id VARCHAR(255) PRIMARY KEY,
    definition_id VARCHAR(255) NOT NULL,
    name VARCHAR(500),
    description TEXT,
    version INT NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_latest BOOLEAN NOT NULL DEFAULT FALSE,
    is_readonly BOOLEAN NOT NULL DEFAULT FALSE,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    materialized_name VARCHAR(500),
    provider_name VARCHAR(255),
    custom_properties JSONB,
    variables JSONB,
    inputs JSONB,
    outputs JSONB,
    outcomes JSONB,
    root JSONB,
    options JSONB,
    use_activity_id_as_node_id BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE (definition_id, version)
);

-- Workflow Instances
CREATE TABLE elsa.workflow_instances (
    id VARCHAR(255) PRIMARY KEY,
    definition_id VARCHAR(255) NOT NULL,
    definition_version_id VARCHAR(255) NOT NULL,
    version INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL,
    sub_status VARCHAR(50) NOT NULL,
    correlation_id VARCHAR(255),
    name VARCHAR(500),
    incident_count INT NOT NULL DEFAULT 0,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE,
    workflow_state JSONB
);

-- Bookmarks
CREATE TABLE elsa.bookmarks (
    id VARCHAR(255) PRIMARY KEY,
    activity_type_name VARCHAR(500) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    workflow_instance_id VARCHAR(255) NOT NULL,
    correlation_id VARCHAR(255),
    activity_id VARCHAR(255) NOT NULL,
    activity_node_id VARCHAR(255),
    activity_instance_id VARCHAR(255),
    payload JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Activity Execution Records
CREATE TABLE elsa.activity_execution_records (
    id VARCHAR(255) PRIMARY KEY,
    workflow_instance_id VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255) NOT NULL,
    activity_node_id VARCHAR(255),
    activity_type VARCHAR(500) NOT NULL,
    activity_type_version INT NOT NULL DEFAULT 1,
    activity_name VARCHAR(500),
    status VARCHAR(50) NOT NULL,
    has_bookmarks BOOLEAN NOT NULL DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    activity_state JSONB,
    outputs JSONB,
    exception JSONB
);

-- Workflow Execution Log Records
CREATE TABLE elsa.workflow_execution_log_records (
    id VARCHAR(255) PRIMARY KEY,
    workflow_instance_id VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255),
    activity_node_id VARCHAR(255),
    activity_type VARCHAR(500),
    activity_type_version INT,
    activity_name VARCHAR(500),
    message TEXT,
    event_name VARCHAR(255),
    source VARCHAR(255),
    payload JSONB,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sequence BIGINT NOT NULL
);

-- Workflow Inbox Messages
CREATE TABLE elsa.workflow_inbox_messages (
    id VARCHAR(255) PRIMARY KEY,
    activity_type_name VARCHAR(500) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    workflow_instance_id VARCHAR(255),
    correlation_id VARCHAR(255),
    activity_instance_id VARCHAR(255),
    input JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes (see indexing-notes.md for details)
CREATE INDEX idx_workflow_definitions_definition_id ON elsa.workflow_definitions(definition_id);
CREATE INDEX idx_workflow_definitions_is_published ON elsa.workflow_definitions(is_published);

CREATE INDEX idx_workflow_instances_correlation_id ON elsa.workflow_instances(correlation_id);
CREATE INDEX idx_workflow_instances_status ON elsa.workflow_instances(status);
CREATE INDEX idx_workflow_instances_definition_id ON elsa.workflow_instances(definition_id);
CREATE INDEX idx_workflow_instances_updated_at ON elsa.workflow_instances(updated_at);

CREATE INDEX idx_bookmarks_hash ON elsa.bookmarks(hash);
CREATE INDEX idx_bookmarks_activity_type_hash ON elsa.bookmarks(activity_type_name, hash);
CREATE INDEX idx_bookmarks_workflow_instance_id ON elsa.bookmarks(workflow_instance_id);

CREATE INDEX idx_activity_records_workflow_instance ON elsa.activity_execution_records(workflow_instance_id);
CREATE INDEX idx_execution_logs_workflow_instance ON elsa.workflow_execution_log_records(workflow_instance_id);
CREATE INDEX idx_inbox_hash ON elsa.workflow_inbox_messages(hash);
```

### SQL Server and Other Databases

For SQL Server and other databases, use the official Elsa Dapper migrations package which provides complete schema management:

**Repository:** [elsa-extensions/Elsa.Persistence.Dapper.Migrations](https://github.com/elsa-workflows/elsa-extensions/tree/main/src/modules/persistence/Elsa.Persistence.Dapper.Migrations)

**Installation:**
```bash
dotnet add package Elsa.Persistence.Dapper.Migrations
```

**Usage:**
```csharp
using Elsa.Persistence.Dapper.Migrations;

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseDapper(dapper =>
        {
            dapper.ConnectionFactory = () => new SqlConnection(connectionString);
            dapper.UseMigrations();  // Enable automatic migrations
        });
    });
});
```

The migrations package handles schema creation and versioning for supported databases including SQL Server, PostgreSQL, and MySQL.

> **Note:** For custom schema requirements or unsupported databases, you can use the PostgreSQL schema above as a reference and adapt it to your database's SQL dialect.

## Transactions

Dapper operations participate in ambient transactions. For explicit control:

```csharp
using System.Transactions;

public class MyWorkflowService
{
    private readonly IWorkflowInstanceStore _store;
    
    public async Task PerformTransactionalOperation()
    {
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        
        // Multiple operations in a single transaction
        await _store.SaveAsync(instance1);
        await _store.SaveAsync(instance2);
        
        scope.Complete();  // Commit
    }
}
```

## Performance Tuning

### Connection Pool Configuration

```csharp
// PostgreSQL with connection pool settings
var connectionString = new NpgsqlConnectionStringBuilder
{
    Host = "localhost",
    Database = "elsa",
    Username = "elsa",
    Password = "YOUR_PASSWORD",
    MaxPoolSize = 100,
    MinPoolSize = 10,
    ConnectionIdleLifetime = 300,
    CommandTimeout = 60
}.ToString();

dapper.ConnectionFactory = () => new NpgsqlConnection(connectionString);
```

### Batch Operations

Dapper excels at batch operations with low overhead:

```csharp
// Example: Batch delete with Dapper
using var connection = new NpgsqlConnection(connectionString);
await connection.ExecuteAsync(
    @"DELETE FROM elsa.workflow_instances 
      WHERE status = @Status 
      AND finished_at < @Threshold",
    new { Status = "Finished", Threshold = DateTime.UtcNow.AddDays(-30) }
);
```

## Migration Strategy

Since Dapper doesn't manage migrations, use one of these approaches:

### Option 1: FluentMigrator

```bash
dotnet add package FluentMigrator
dotnet add package FluentMigrator.Runner
dotnet add package FluentMigrator.Runner.Postgres
```

```csharp
[Migration(1)]
public class CreateElsaTables : Migration
{
    public override void Up()
    {
        Execute.Sql(@"CREATE TABLE elsa.workflow_instances (...)");
    }
    
    public override void Down()
    {
        Execute.Sql("DROP TABLE elsa.workflow_instances");
    }
}
```

### Option 2: DbUp

```bash
dotnet add package DbUp
```

```csharp
var upgrader = DeployChanges.To
    .PostgresqlDatabase(connectionString)
    .WithScriptsFromFileSystem("./Migrations")
    .Build();

var result = upgrader.PerformUpgrade();
```

### Option 3: Plain SQL Scripts

Maintain versioned SQL scripts and apply via CI/CD:
```
/migrations
  /001_initial_schema.sql
  /002_add_indexes.sql
  /003_add_inbox_table.sql
```

## Troubleshooting

### Connection Issues

**Error:** `Connection refused` or `timeout`

**Solutions:**
- Verify database server is running
- Check connection string format
- Ensure network connectivity

### Schema Mismatch

**Error:** `relation "elsa.workflow_instances" does not exist`

**Solution:** Schema must be created before running the application. Run schema creation scripts.

### Performance Issues

**Slow queries:**
1. Verify indexes exist
2. Use database query analyzer (EXPLAIN ANALYZE in PostgreSQL)
3. Check connection pool metrics

## Related Documentation

- [Persistence Guide](../README.md) — Overview and provider comparison
- [Indexing Notes](indexing-notes.md) — Detailed indexing guidance
- [EF Core Setup](efcore-setup.md) — Alternative with migration support

---

**Last Updated:** 2025-11-28
