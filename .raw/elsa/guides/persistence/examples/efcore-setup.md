---
description: >-
  Minimal example to enable Entity Framework Core persistence for Elsa Workflows, including database provider setup and migrations.
---

# EF Core Setup Example

This document provides a minimal, copy-pasteable example for configuring Elsa Workflows with Entity Framework Core persistence.

## Prerequisites

- .NET 8.0 or later
- Database server (PostgreSQL, SQL Server, SQLite, or MySQL)
- Elsa v3.x packages

## NuGet Packages

**For PostgreSQL:**
```bash
dotnet add package Elsa
dotnet add package Elsa.Persistence.EFCore.PostgreSql
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

**For SQL Server:**
```bash
dotnet add package Elsa
dotnet add package Elsa.Persistence.EFCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

**For SQLite:**
```bash
dotnet add package Elsa
dotnet add package Elsa.Persistence.EFCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

## Minimal Configuration

### Program.cs

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Get connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("PostgreSql")
    ?? throw new InvalidOperationException("Connection string 'PostgreSql' not found.");

builder.Services.AddElsa(elsa =>
{
    // Configure workflow management (definitions, instances)
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            // Use PostgreSQL (replace with UseSqlServer(), UseSqlite(), etc. as needed)
            ef.UsePostgreSql(connectionString);
            
            // Apply migrations on startup (development only)
            ef.RunMigrations = true;
        });
    });
    
    // Configure workflow runtime (bookmarks, inbox, execution logs)
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(connectionString);
            ef.RunMigrations = true;
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

**SQLite:**
```json
{
  "ConnectionStrings": {
    "Sqlite": "Data Source=elsa.db"
  }
}
```

## Applying Migrations

### Option 1: Automatic Migrations (Development)

Set `ef.RunMigrations = true` in the configuration above. Migrations will be applied automatically when the application starts.

> **Warning:** Automatic migrations are convenient for development but not recommended for production. Use manual migrations in production environments.

### Option 2: CLI Migrations (Production)

**1. Install EF Core Tools:**
```bash
dotnet tool install --global dotnet-ef
```

**2. Generate Migration Script (for review):**
```bash
dotnet ef migrations script --context ManagementElsaDbContext --idempotent -o migrations.sql
```

**3. Apply Migrations:**
```bash
# Direct application
dotnet ef database update --context ManagementElsaDbContext

# Or apply the generated script via database tools
psql -h localhost -U elsa -d elsa -f migrations.sql
```

### Multiple Contexts

Elsa uses separate DbContexts for different concerns:

- `ManagementElsaDbContext` — Workflow definitions and instances
- `RuntimeElsaDbContext` — Bookmarks, inbox, execution logs

Apply migrations for both contexts:
```bash
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext
```

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
            ef.UsePostgreSql(managementConnectionString);
        });
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(runtimeConnectionString);
        });
    });
});
```

### Connection Pooling

Configure connection pool settings for high-concurrency scenarios:

```csharp
var connectionString = new NpgsqlConnectionStringBuilder
{
    Host = "localhost",
    Database = "elsa",
    Username = "elsa",
    Password = "YOUR_PASSWORD",
    MaxPoolSize = 100,        // Increase for high concurrency
    MinPoolSize = 10,         // Keep connections warm
    ConnectionIdleLifetime = 300,  // 5 minutes
    CommandTimeout = 60       // 1 minute
}.ToString();
```

### Retry on Transient Failures

Configure retry logic for transient database errors:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UsePostgreSql(connectionString, options =>
        {
            options.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
        });
    });
});
```

## Troubleshooting

### Migration Errors

**Error:** `The term 'dotnet-ef' is not recognized`

**Solution:** Install EF Core tools:
```bash
dotnet tool install --global dotnet-ef
```

**Error:** `No migrations were applied. The database is already up to date.`

**Solution:** This is informational. The database schema is current.

**Error:** `Login failed for user` or `password authentication failed`

**Solution:** Verify connection string credentials and database permissions.

### Logging

Enable EF Core logging to diagnose issues:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Warning"
    }
  }
}
```

## Related Documentation

- [Persistence Guide](../README.md) — Overview and provider comparison
- [Indexing Notes](indexing-notes.md) — Recommended indexes for EF Core
- [Database Configuration](../../../getting-started/database-configuration.md) — Basic setup

---

**Last Updated:** 2025-11-28
