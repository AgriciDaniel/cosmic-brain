---
type: concept
title: "Elsa Database Configuration"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - dotnet
  - database
  - persistence
status: developing
address: c-000066
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Containers]]"
  - "[[Elsa Application Types]]"
---

# Elsa Database Configuration

[[entities/Elsa Workflows]] supports multiple database backends for persisting workflow definitions, instances, execution records, triggers, and logs. Configuration is done through the Elsa registration API in `Program.cs`, using environment variables, or a combination of both.

---

## Supported Providers

| Provider | Package | Recommended For |
|----------|---------|-----------------|
| **SQLite** | `Elsa.Persistence.EFCore.Sqlite` | Development, single-instance (default) |
| **SQL Server** | `Elsa.Persistence.EFCore.SqlServer` | Production on Windows |
| **PostgreSQL** | `Elsa.Persistence.EFCore.PostgreSql` | Production on Linux/Unix |
| **MySQL/MariaDB** | `Elsa.Persistence.EFCore` | Supported, less common |
| **MongoDB** | `Elsa.MongoDb` | Document-database use cases |

---

## Configuration Examples

Elsa has two persistence contexts: **Management** (workflow definitions) and **Runtime** (executions). Each can use the same or a different provider.

### SQL Server
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Elsa.Persistence.EFCore.SqlServer
```

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

### PostgreSQL
```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Elsa.Persistence.EFCore.PostgreSql
```

```csharp
elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef =>
    ef.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql")!)));
elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef =>
    ef.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql")!)));
```

### MongoDB
```bash
dotnet add package MongoDB.Driver
dotnet add package Elsa.MongoDb
```

```csharp
elsa.UseWorkflowManagement(management => management.UseMongoDb());
elsa.UseWorkflowRuntime(runtime => runtime.UseMongoDb());
```

---

## Environment Variables

Database configuration can be set entirely via environment variables — useful for containerized deployments:

```bash
DATABASEPROVIDER=PostgreSql
CONNECTIONSTRINGS__POSTGRESQL=Host=myhost;Database=elsa;Username=elsa;Password=...
```

Options: `Sqlite`, `PostgreSql`, `SqlServer`, `MySql`

---

## Running EF Core Migrations

For EF Core providers, migrations must be applied before Elsa can operate:

```bash
dotnet tool install --global dotnet-ef

# Management database
dotnet ef database update --context Elsa.Workflows.Management.Entities.ManagementDbContext

# Runtime database
dotnet ef database update --context Elsa.Workflows.Runtime.Entities.RuntimeDbContext
```

---

## Multi-Database Scenarios

Elsa supports using separate databases (or even different providers) for management vs runtime:

```csharp
// Management on SQL Server
elsa.UseWorkflowManagement(management => management.UseEntityFrameworkCore(ef =>
    ef.UseSqlServer("ManagementConnString")));

// Runtime on PostgreSQL
elsa.UseWorkflowRuntime(runtime => runtime.UseEntityFrameworkCore(ef =>
    ef.UsePostgreSQL("RuntimeConnString")));
```

**Benefits:** Independent scaling, different database technologies, isolation of sensitive runtime data.

---

## Production Considerations

- **Performance** — connection pooling, appropriate limits, query monitoring, indexing
- **Security** — strong passwords, SSL/TLS, restricted access, credential rotation
- **Backup** — regular backups, tested restore procedures, failover planning
- **Monitoring** — performance metrics, connection alerts, operation auditing
