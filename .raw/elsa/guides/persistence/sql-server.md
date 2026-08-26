---
description: >-
  Complete guide to configuring SQL Server as the persistence provider for Elsa Workflows v3, including setup, configuration, and migration guidance.
---

# SQL Server Persistence

This guide explains how to configure Elsa Workflows to use SQL Server as the persistence provider instead of SQLite. SQL Server is recommended for production deployments, especially on Windows environments, and provides robust transactional consistency and enterprise-grade reliability.

## Overview

Elsa uses two main persistence modules that must be configured consistently:

- **Workflow Management** - Stores workflow definitions and workflow instances
- **Workflow Runtime** - Stores bookmarks, workflow inbox messages, and execution logs

Both modules support SQL Server through Entity Framework Core.

## Prerequisites

- .NET 8.0 or later
- SQL Server 2016 or later (Express, Standard, or Enterprise)
- Elsa v3.x packages
- SQL Server instance accessible from your application

## NuGet Packages

Install the required packages:

```bash
dotnet add package Elsa
dotnet add package Elsa.Persistence.EFCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

**Package Descriptions:**
- `Elsa` - Core Elsa Workflows library
- `Elsa.Persistence.EFCore.SqlServer` - SQL Server persistence provider for Elsa
- `Microsoft.EntityFrameworkCore.SqlServer` - Entity Framework Core SQL Server driver

## Configuration

### Basic Setup

Configure SQL Server persistence in your `Program.cs`:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Get connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("Elsa")
    ?? throw new InvalidOperationException("Connection string 'Elsa' not found.");

builder.Services.AddElsa(elsa =>
{
    // Configure workflow management persistence (definitions, instances)
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer(connectionString);
            
            // Optional: Run migrations automatically on startup (development only)
            // ef.RunMigrations = true;
        });
    });
    
    // Configure workflow runtime persistence (bookmarks, inbox, execution logs)
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer(connectionString);
            
            // Optional: Run migrations automatically on startup (development only)
            // ef.RunMigrations = true;
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

### Connection String Configuration

Add your SQL Server connection string to `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Elsa": "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;Encrypt=true;MultipleActiveResultSets=true"
  }
}
```

**Connection String Parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `Server` | SQL Server hostname or IP | `localhost`, `sql.example.com`, `192.168.1.10` |
| `Database` | Database name | `Elsa`, `ElsaWorkflows` |
| `User Id` | SQL Server authentication username | `sa`, `elsa_user` |
| `Password` | User password | `YourPassword123` |
| `TrustServerCertificate` | Accept self-signed certificates | `true` (development), `false` (production with valid cert) |
| `MultipleActiveResultSets` | Enable MARS for complex queries | `true` |
| `Integrated Security` | Use Windows authentication | `true` (alternative to User Id/Password) |

**Windows Authentication Example:**
```json
{
  "ConnectionStrings": {
    "Elsa": "Server=localhost;Database=Elsa;Integrated Security=true;TrustServerCertificate=true;MultipleActiveResultSets=true"
  }
}
```

**Connection Pooling (High Concurrency):**
```json
{
  "ConnectionStrings": {
    "Elsa": "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;TrustServerCertificate=true;MultipleActiveResultSets=true;Max Pool Size=100;Min Pool Size=10"
  }
}
```

### Environment Variables

For containerized deployments, use environment variables:

```bash
# Linux/Docker
export ConnectionStrings__Elsa="Server=sql-server;Database=Elsa;User Id=sa;Password=YourPassword123;Encrypt=true"

# Windows PowerShell
$env:ConnectionStrings__Elsa="Server=localhost;Database=Elsa;Integrated Security=true;Encrypt=true"

# Docker Compose
environment:
  - ConnectionStrings__Elsa=Server=sql-server;Database=Elsa;User Id=sa;Password=YourPassword123;Encrypt=true
```

## Database Migrations

Elsa ships with default Entity Framework Core migrations that create the necessary tables and schema. You have two options for applying migrations:

### Option 1: Automatic Migrations (Development)

Set `RunMigrations = true` in your configuration to apply migrations automatically on application startup:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(connectionString);
        ef.RunMigrations = true;  // Apply migrations on startup
    });
});

elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(connectionString);
        ef.RunMigrations = true;  // Apply migrations on startup
    });
});
```

> **⚠️ Warning:** Automatic migrations are convenient for development but **not recommended for production**. Use manual migration deployment in production environments for better control.

### Option 2: Manual Migrations (Production)

For production deployments, apply migrations manually using the EF Core CLI:

**1. Install EF Core Tools:**
```bash
dotnet tool install --global dotnet-ef
```

**2. Apply Migrations:**
```bash
# Apply Management context migrations (workflow definitions, instances)
dotnet ef database update --context ManagementElsaDbContext

# Apply Runtime context migrations (bookmarks, inbox, execution logs)
dotnet ef database update --context RuntimeElsaDbContext
```

**3. Generate SQL Scripts for Review (Recommended):**
```bash
# Generate idempotent SQL script for review before applying
dotnet ef migrations script --context ManagementElsaDbContext --idempotent -o management-migrations.sql
dotnet ef migrations script --context RuntimeElsaDbContext --idempotent -o runtime-migrations.sql

# Review the generated SQL files, then apply using SQL Server tools:
sqlcmd -S localhost -d Elsa -i management-migrations.sql
sqlcmd -S localhost -d Elsa -i runtime-migrations.sql
```

### Database Schema

Elsa creates the following tables in SQL Server:

**Management Tables:**
- `WorkflowDefinitions` - Published and draft workflow definitions
- `WorkflowInstances` - Workflow execution state and history

**Runtime Tables:**
- `Bookmarks` - Workflow suspension points for resumption
- `WorkflowInboxMessages` - Incoming messages for workflow correlation
- `ActivityExecutionRecords` - Activity execution records
- `WorkflowExecutionLogRecords` - Detailed execution logs

**Additional Tables:**
- `__EFMigrationsHistory` - EF Core migration tracking

See [EF Core Migrations Guide](ef-migrations.md) for information on customizing migrations and adding your own entities.

## Advanced Configuration

### Separate Databases

Use separate databases for management and runtime data:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer("Server=localhost;Database=ElsaManagement;...");
        });
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UseSqlServer("Server=localhost;Database=ElsaRuntime;...");
        });
    });
});
```

**Benefits:**
- Scale management and runtime databases independently
- Isolate operational data from definition data
- Apply different backup/retention policies

### Connection Resilience

Configure retry logic for transient failures:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
            
            sqlOptions.CommandTimeout = 60; // 60 seconds
        });
    });
});
```

### Performance Tuning

**Connection Pool Settings:**
```csharp
using Microsoft.Data.SqlClient;

var connectionString = new SqlConnectionStringBuilder
{
    DataSource = "localhost",
    InitialCatalog = "Elsa",
    UserID = "sa",
    Password = "YourPassword123",
    TrustServerCertificate = true,
    MultipleActiveResultSets = true,
    MaxPoolSize = 100,
    MinPoolSize = 10,
    ConnectTimeout = 30,
    ApplicationName = "ElsaWorkflows"
}.ToString();
```

**Indexing:**

For optimal query performance, ensure proper indexes exist. See [Indexing Notes](examples/indexing-notes.md) for recommended indexes.

## Migrating from SQLite

To migrate an existing Elsa installation from SQLite to SQL Server:

**1. Update packages:**
```bash
# Remove SQLite packages
dotnet remove package Elsa.Persistence.EFCore.Sqlite
dotnet remove package Microsoft.EntityFrameworkCore.Sqlite

# Add SQL Server packages
dotnet add package Elsa.Persistence.EFCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

**2. Update configuration in `Program.cs`:**
```csharp
// Before (SQLite):
// ef.UseSqlite(connectionString);

// After (SQL Server):
ef.UseSqlServer(connectionString);
```

**3. Update connection string in `appsettings.json`:**
```json
{
  "ConnectionStrings": {
    "Elsa": "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;TrustServerCertificate=true"
  }
}
```

**4. Apply migrations to create the SQL Server schema:**
```bash
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext
```

**5. Optionally migrate data:**

If you need to preserve existing workflow definitions and instances, you'll need to export data from SQLite and import to SQL Server. This typically involves:
- Export SQLite tables to CSV or JSON
- Transform data if needed
- Import into SQL Server using BULK INSERT or SQL Server Import Wizard

> **Note:** Data migration between providers is a custom process not provided by Elsa. Consider starting fresh in SQL Server for new deployments.

## Troubleshooting

### Common Issues

**Error: "Cannot open database"**

**Cause:** Database doesn't exist or user lacks permissions.

**Solution:**
- Verify the database exists: `SELECT name FROM sys.databases;`
- Create the database manually: `CREATE DATABASE Elsa;`
- Grant user permissions: `ALTER SERVER ROLE sysadmin ADD MEMBER [elsa_user];`

**Error: "Login failed for user"**

**Cause:** Incorrect credentials or authentication mode.

**Solution:**
- Verify username and password
- Check SQL Server authentication mode (mixed mode required for SQL authentication)
- For Windows authentication, ensure the application pool identity has access

**Error: "A network-related or instance-specific error occurred"**

**Cause:** Cannot connect to SQL Server.

**Solution:**
- Verify SQL Server is running
- Check firewall rules (default port 1433)
- Enable TCP/IP protocol in SQL Server Configuration Manager
- Verify server name/IP address

**Error: "The migration has already been applied to the database"**

**Cause:** Migrations already applied (informational, not an error).

**Solution:** No action needed. This indicates the database schema is current.

### Diagnostic Logging

Enable detailed EF Core logging to diagnose issues:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Warning"
    }
  }
}
```

## Production Considerations

### Security

- **Use strong passwords** - Minimum 12 characters with complexity
- **Enable SSL/TLS** - Use `Encrypt=true` instead of `TrustServerCertificate=true`
- **Principle of least privilege** - Grant only required permissions to the Elsa database user
- **Secure connection strings** - Use Azure Key Vault or environment variables, not source control
- **Enable auditing** - Configure SQL Server audit logs for compliance

### High Availability

- **SQL Server Always On** - Use availability groups for automatic failover
- **Backup strategy** - Implement regular full and differential backups
- **Point-in-time recovery** - Enable full recovery model for transaction log backups
- **Disaster recovery** - Test restore procedures regularly

### Monitoring

Monitor these key metrics:

- Database connection pool utilization
- Query execution times (P95, P99)
- Lock wait statistics
- Deadlock frequency
- Database size growth
- Transaction log size

### Performance

- **Regularly update statistics** - `UPDATE STATISTICS` for query optimization
- **Rebuild/reorganize indexes** - Maintain index fragmentation below 10%
- **Monitor blocking queries** - Use `sp_who2` or Extended Events
- **Configure memory settings** - Allocate appropriate min/max server memory
- **Enable query store** - For query performance history and analysis

## Related Documentation

- [Persistence Guide](README.md) - Overview and provider comparison
- [EF Core Migrations Guide](ef-migrations.md) - Custom migrations and strategies
- [EF Core Setup Example](examples/efcore-setup.md) - General EF Core configuration
- [Indexing Notes](examples/indexing-notes.md) - Recommended indexes
- [Database Configuration](../../getting-started/database-configuration.md) - Basic database setup
- [Performance & Scaling Guide](../performance/README.md) - Throughput optimization

## Next Steps

- Configure connection strings for your environment
- Apply migrations to create the database schema
- Review [indexing recommendations](examples/indexing-notes.md)
- Implement backup and monitoring procedures
- Consider [custom migrations](ef-migrations.md) if adding your own entities

---

**Last Updated:** 2025-12-01

**Addresses Issues:** #2 (SQL Server instead of SQLite), #11 (configuring persistence providers)
