---
description: >-
  Learn how to configure Elsa Workflows to use different database providers for
  persistence, including SQL Server, PostgreSQL, and MongoDB.
---

# Database Configuration

This guide explains how to configure Elsa Workflows to use different database providers for storing workflow definitions, instances, and execution data. Elsa supports multiple database backends through Entity Framework Core (EF Core) and MongoDB.

## Supported Database Providers

Elsa supports the following database providers:

* **SQL Server** (recommended for production on Windows environments)
* **PostgreSQL** (recommended for production on Linux/Unix environments)
* **SQLite** (default, suitable for development and single-instance deployments)
* **MySQL/MariaDB** (supported but less commonly used)
* **MongoDB** (document database for specific use cases)

## Prerequisites

* Elsa Server project (see [Server Setup Guide](../application-types/elsa-server.md))
* Database server (local or remote)
* Appropriate NuGet packages installed

## Using SQL Server instead of SQLite

By default, Elsa uses SQLite for development scenarios. For production deployments, especially on Windows environments, SQL Server is recommended. The migration is straightforward:

1. **Install SQL Server packages:**

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Elsa.Persistence.EFCore.SqlServer
```

2. **Replace `UseSqlite()` with `UseSqlServer()`** in your `Program.cs`:

```csharp
builder.Services.AddElsa(elsa =>
{
    // Before: ef.UseSqlite()
    // After: ef.UseSqlServer() with connection string
    elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef => 
        ef.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")!)));
    elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef => 
        ef.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")!)));
    elsa.UseWorkflowsApi();
});
```

3. **Update connection string** in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;TrustServerCertificate=true"
  }
}
```

For more detailed information about persistence strategies, connection pooling, and advanced database configurations, see the [Persistence Guide](../guides/persistence/README.md). For a comprehensive SQL Server configuration guide including production considerations, troubleshooting, and migration strategies, see the [SQL Server Guide](../guides/persistence/sql-server.md).

## Configuring SQL Server

### 1. Install NuGet Packages

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Elsa.Persistence.EFCore.SqlServer
```

### 2. Configure Services

In `Program.cs`, add the following:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef => 
        ef.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")!)));
    elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef => 
        ef.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")!)));
    elsa.UseWorkflowsApi();
});
```

### 3. Connection String

Add to `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;TrustServerCertificate=true"
  }
}
```

## Configuring PostgreSQL

### 1. Install NuGet Packages

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Elsa.Persistence.EFCore.PostgreSql
```

### 2. Configure Services

In `Program.cs`:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef => 
        ef.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql")!)));
    elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef => 
        ef.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql")!)));
    elsa.UseWorkflowsApi();
});
```

### 3. Connection String

```json
{
  "ConnectionStrings": {
    "PostgreSql": "Host=localhost;Database=elsa;Username=elsa;Password=elsa;Port=5432"
  }
}
```

## Configuring MongoDB

### 1. Install NuGet Packages

```bash
dotnet add package MongoDB.Driver
dotnet add package Elsa.MongoDb
```

### 2. Configure Services

In `Program.cs`:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management => management.UseMongoDb());
    elsa.UseWorkflowRuntime(runtime => runtime.UseMongoDb());
    elsa.UseWorkflowsApi();
});
```

### 3. Connection String

```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://localhost:27017/elsa"
  }
}
```

## Environment Variables

You can also configure database connections using environment variables:

```bash
# Database provider
DATABASEPROVIDER=PostgreSql

# Connection strings
CONNECTIONSTRINGS__SQLSERVER=Server=...;Database=...;...
CONNECTIONSTRINGS__POSTGRESQL=Host=...;Database=...;...
CONNECTIONSTRINGS__MONGODB=mongodb://.../...
```

## Running Migrations

For EF Core-based providers (SQL Server, PostgreSQL, SQLite), you need to run migrations. For detailed information about working with EF Core migrations, including custom entities and migration strategies, see the [EF Core Migrations Guide](../guides/persistence/ef-migrations.md).

### 1. Install EF Core Tools

```bash
dotnet tool install --global dotnet-ef
```

### 2. Apply Migrations

```bash
# For Management database
dotnet ef database update --context Elsa.Workflows.Management.Entities.ManagementDbContext

# For Runtime database
dotnet ef database update --context Elsa.Workflows.Runtime.Entities.RuntimeDbContext
```

### 3. Custom Migration Paths

If using separate databases, specify the connection string:

```bash
dotnet ef database update --context Elsa.Workflows.Management.Entities.ManagementDbContext --connection "YourManagementConnectionString"
```

## Multi-Database Scenarios

Elsa supports using separate databases for management (workflow definitions) and runtime (executions):

### Separate Databases Configuration

```csharp
builder.Services.AddElsa(elsa =>
{
    // Management database (definitions)
    elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef => ef.UseSqlServer("ManagementConnectionString")));
    
    // Runtime database (executions)
    elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef => ef.UsePostgreSQL("RuntimeConnectionString")));
});
```

### Benefits

* Scale management and runtime independently
* Use different database technologies for each
* Isolate sensitive runtime data

## Troubleshooting

### Common Issues

#### 1. Migration Errors

**Error:** "The term 'dotnet-ef' is not recognized"

**Solution:** Ensure EF Core tools are installed globally:

```bash
dotnet tool install --global dotnet-ef
```

#### 2. Connection Timeout

**Error:** "Timeout expired"

**Solutions:**

* Increase connection timeout in connection string: `;Timeout=60`
* Check database server availability
* Verify firewall settings

#### 3. Permission Denied

**Error:** "Login failed for user"

**Solutions:**

* Verify username/password
* Check user permissions on database
* Ensure database exists

#### 4. MongoDB Connection Issues

**Error:** "Unable to connect to server"

**Solutions:**

* Ensure MongoDB is running
* Check connection string format
* Verify authentication if enabled

### Logging

Enable detailed database logging:

```csharp
builder.Services.AddDbContext<ManagementDbContext>(options =>
    options.UseSqlServer(connectionString)
           .LogTo(Console.WriteLine, LogLevel.Information)
           .EnableSensitiveDataLogging());
```

## Production Considerations

### Performance Tuning

* Use connection pooling
* Configure appropriate connection limits
* Monitor query performance
* Consider database indexing

### Security

* Use strong passwords
* Enable SSL/TLS encryption
* Restrict database access to application servers
* Rotate credentials regularly

### Backup and Recovery

* Implement regular database backups
* Test restore procedures
* Plan for database failover scenarios

### Monitoring

* Monitor database performance metrics
* Set up alerts for connection issues
* Log database operations for auditing

## Next Steps

* [Docker Deployment](containers/docker-compose/persistent-database.md)
* [Authentication Setup](../guides/authentication.md)
* [Workflow Persistence](../guides/workflow-persistence.md)
