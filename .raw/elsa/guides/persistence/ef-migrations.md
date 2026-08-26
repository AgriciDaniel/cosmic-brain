---
description: >-
  Complete guide to working with Entity Framework Core migrations in Elsa Workflows v3, including custom migrations, DbContext management, and versioning strategies.
---

# EF Core Migrations

This guide explains how Elsa Workflows uses Entity Framework Core migrations and how to customize them for your needs. Whether you want to add your own entities to the Elsa database or maintain separate migration strategies, this guide covers the essential patterns.

## Overview

Elsa Workflows uses Entity Framework Core (EF Core) for relational database persistence and includes built-in migrations that manage the database schema. Understanding how these migrations work is essential when:

- Adding custom entities to the Elsa database
- Generating combined migrations for Elsa + your application
- Managing schema changes during upgrades
- Working with multiple databases or contexts

## Elsa's DbContext Architecture

Elsa uses two separate `DbContext` classes to organize persistence concerns:

### ManagementElsaDbContext

**Purpose:** Stores workflow definitions and instances

**Key Tables:**
- `WorkflowDefinitions` - Published and draft workflow definitions with version history
- `WorkflowInstances` - Active and historical workflow execution state

**Typical Usage:**
- Workflow Designer (Studio) reads/writes definitions
- Workflow Runtime creates and updates instances during execution

### RuntimeElsaDbContext

**Purpose:** Stores runtime operational data

**Key Tables:**
- `Bookmarks` - Workflow suspension points for event-driven resumption
- `WorkflowInboxMessages` - Incoming messages for workflow correlation
- `ActivityExecutionRecords` - Detailed activity execution history
- `WorkflowExecutionLogRecords` - Execution logs for debugging and auditing

**Typical Usage:**
- Bookmark resolution when external events trigger workflows
- Workflow inbox for asynchronous message handling
- Execution log queries for monitoring and troubleshooting

> **Note:** Both contexts can use the same physical database but maintain separate migration histories, or they can use separate databases for scaling and isolation.

## How Elsa Migrations Work

### Built-in Migrations

Elsa ships with complete migrations that create and manage the database schema across versions. These migrations are embedded in the Elsa NuGet packages (`Elsa.Persistence.EFCore.SqlServer`, `Elsa.Persistence.EFCore.PostgreSql`, etc.).

**Migration Naming Convention:**
- Migrations follow a timestamped pattern: `YYYYMMDDHHMMSS_DescriptionOfChange`
- Example: `20240315120000_InitialCreate`, `20240520093000_AddWorkflowInbox`

**Automatic Application:**

Elsa can apply migrations automatically on startup:

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(connectionString);
        ef.RunMigrations = true;  // Apply migrations on startup
    });
});
```

> **⚠️ Warning:** Automatic migrations (`RunMigrations = true`) are convenient for development but **not recommended for production**. Use controlled migration deployment in production environments.

### Manual Migration Application

For production deployments, apply migrations manually:

```bash
# Install EF Core CLI tools
dotnet tool install --global dotnet-ef

# Apply Management context migrations
dotnet ef database update --context ManagementElsaDbContext

# Apply Runtime context migrations
dotnet ef database update --context RuntimeElsaDbContext
```

### Migration History

EF Core tracks applied migrations in the `__EFMigrationsHistory` table:

```sql
SELECT MigrationId, ProductVersion 
FROM __EFMigrationsHistory 
ORDER BY MigrationId DESC;
```

This table ensures migrations are only applied once and enables EF Core to understand the current schema version.

## Adding Custom Entities to Elsa's Database

A common scenario is adding your own entities to the same database used by Elsa. This approach offers several benefits:

**Benefits:**
- Single database simplifies deployment and management
- Share transaction scope between Elsa and your entities
- Unified backup and recovery
- Simplified connection string management

**Trade-offs:**
- Couples your schema to Elsa's schema
- Requires careful migration management
- Elsa version upgrades may require migration coordination

### Strategy: Separate DbContext with Shared Database

The recommended approach is to create your own `DbContext` that references the same database but maintains independent migrations:

**1. Create Your DbContext:**

```csharp
using Microsoft.EntityFrameworkCore;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Your entities
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure your entities
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.OrderNumber).IsRequired();
                entity.HasOne(e => e.Customer)
                    .WithMany(c => c.Orders)
                    .HasForeignKey(e => e.CustomerId);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });
        }
    }

    public class Order
    {
        public string Id { get; set; } = default!;
        public string OrderNumber { get; set; } = default!;
        public string CustomerId { get; set; } = default!;
        public Customer Customer { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }

    public class Customer
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public List<Order> Orders { get; set; } = new();
    }
}
```

**2. Register Your DbContext in `Program.cs`:**

```csharp
using Elsa.Extensions;
using MyApp.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Database");

// Register Elsa with its contexts
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef => ef.UseSqlServer(connectionString));
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef => ef.UseSqlServer(connectionString));
    });
    
    elsa.UseWorkflowsApi();
});

// Register your own DbContext using the SAME connection string
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();
app.Run();
```

**3. Configure Design-Time DbContext Factory (Required for Migrations):**

Create a file `ApplicationDbContextFactory.cs` in your project root:

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using MyApp.Data;

namespace MyApp
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            
            // Use a connection string for design-time operations
            // This is ONLY used by 'dotnet ef' commands, not runtime
            var connectionString = "Server=localhost;Database=Elsa;User Id=sa;Password=YourPassword123;Encrypt=true";
            optionsBuilder.UseSqlServer(connectionString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
```

> **💡 Tip:** Alternatively, you can specify the connection string via the `--connection` parameter when running `dotnet ef` commands instead of hardcoding it in the factory.

**4. Generate Your Migrations:**

```bash
# Create initial migration for your entities
dotnet ef migrations add InitialCreate --context ApplicationDbContext

# Review the generated migration in Migrations/ folder

# Apply the migration
dotnet ef database update --context ApplicationDbContext
```

**5. Managing Updates:**

When you add or modify entities:

```bash
# Add new migration
dotnet ef migrations add AddOrderStatusColumn --context ApplicationDbContext

# Review the generated migration

# Apply to database
dotnet ef database update --context ApplicationDbContext
```

### Project Structure

A typical project structure with custom migrations:

```
MyElsaApp/
├── Program.cs
├── ApplicationDbContextFactory.cs
├── Data/
│   ├── ApplicationDbContext.cs
│   ├── Order.cs
│   └── Customer.cs
├── Migrations/                    # Your custom migrations
│   ├── 20250101120000_InitialCreate.cs
│   └── 20250115140000_AddOrderStatusColumn.cs
└── appsettings.json
```

Elsa's migrations remain in the Elsa NuGet packages and are applied separately.

## Migration Commands Reference

### Common EF Core CLI Commands

**Install/Update EF Tools:**
```bash
dotnet tool install --global dotnet-ef
dotnet tool update --global dotnet-ef
```

**Add a New Migration:**
```bash
dotnet ef migrations add <MigrationName> --context <ContextName>

# Examples:
dotnet ef migrations add AddCustomerTable --context ApplicationDbContext
dotnet ef migrations add InitialElsaSetup --context ManagementElsaDbContext
```

**Apply Migrations:**
```bash
# Update to latest migration
dotnet ef database update --context <ContextName>

# Update to specific migration
dotnet ef database update <MigrationName> --context <ContextName>

# Rollback to specific migration
dotnet ef database update <PreviousMigrationName> --context <ContextName>
```

**Generate SQL Scripts:**
```bash
# Generate idempotent script (safe to run multiple times)
dotnet ef migrations script --context <ContextName> --idempotent -o migrations.sql

# Generate script for specific migration range
dotnet ef migrations script <FromMigration> <ToMigration> --context <ContextName> -o update.sql
```

**List Migrations:**
```bash
dotnet ef migrations list --context <ContextName>
```

**Remove Last Migration (if not applied):**
```bash
dotnet ef migrations remove --context <ContextName>
```

**Drop Database (Caution!):**
```bash
dotnet ef database drop --context <ContextName>
```

### Specifying Connection Strings

**Via Command Line:**
```bash
dotnet ef database update --context ApplicationDbContext \
  --connection "Server=localhost;Database=Elsa;User Id=sa;Password=Pass123"
```

**Via Environment Variable:**
```bash
export ConnectionStrings__Database="Server=localhost;Database=Elsa;..."
dotnet ef database update --context ApplicationDbContext
```

### Working with Multiple Contexts

When managing both Elsa contexts and your own:

```bash
# Update all contexts in sequence
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext
dotnet ef database update --context ApplicationDbContext

# Or use a script to automate
#!/bin/bash
for context in ManagementElsaDbContext RuntimeElsaDbContext ApplicationDbContext; do
  echo "Updating $context..."
  dotnet ef database update --context $context
done
```

## Migration Strategies

### Strategy 1: Single Shared Database

**Description:** Elsa and your application share a single database with separate contexts and independent migrations.

**Configuration:**
```csharp
var connectionString = builder.Configuration.GetConnectionString("Database");

// All contexts use the same connection string
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(m => m.UseEntityFrameworkCore(ef => ef.UseSqlServer(connectionString)));
    elsa.UseWorkflowRuntime(r => r.UseEntityFrameworkCore(ef => ef.UseSqlServer(connectionString)));
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```

**Pros:**
- ✅ Simple deployment and connection management
- ✅ Share transaction scope between Elsa and app data
- ✅ Single backup/restore process

**Cons:**
- ❌ All schemas coupled in one database
- ❌ Difficult to scale components independently
- ❌ Schema changes impact all consumers

**Best For:** Small to medium applications, single-server deployments, development environments

### Strategy 2: Separate Databases

**Description:** Elsa uses one database, your application uses another.

**Configuration:**
```csharp
var elsaConnectionString = builder.Configuration.GetConnectionString("Elsa");
var appConnectionString = builder.Configuration.GetConnectionString("Application");

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(m => m.UseEntityFrameworkCore(ef => ef.UseSqlServer(elsaConnectionString)));
    elsa.UseWorkflowRuntime(r => r.UseEntityFrameworkCore(ef => ef.UseSqlServer(elsaConnectionString)));
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(appConnectionString));
```

**Pros:**
- ✅ Clear separation of concerns
- ✅ Independent scaling of Elsa and app databases
- ✅ Different backup/retention policies
- ✅ Easier to upgrade Elsa without impacting app schema

**Cons:**
- ❌ No shared transactions across databases
- ❌ More complex connection management
- ❌ Two backup/restore processes

**Best For:** Large applications, microservices architectures, scenarios requiring independent scaling

### Strategy 3: Split Elsa Management and Runtime

**Description:** Separate databases for Elsa's management and runtime contexts.

**Configuration:**
```csharp
var managementConnectionString = builder.Configuration.GetConnectionString("ElsaManagement");
var runtimeConnectionString = builder.Configuration.GetConnectionString("ElsaRuntime");

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(m => 
        m.UseEntityFrameworkCore(ef => ef.UseSqlServer(managementConnectionString)));
    
    elsa.UseWorkflowRuntime(r => 
        r.UseEntityFrameworkCore(ef => ef.UseSqlServer(runtimeConnectionString)));
});
```

**Pros:**
- ✅ Scale management (definitions) separately from runtime (executions)
- ✅ Different retention policies (keep definitions longer, purge old executions)
- ✅ Isolate high-volume runtime data from stable definition data

**Cons:**
- ❌ More infrastructure to manage
- ❌ Additional connection configuration

**Best For:** High-throughput scenarios, compliance requirements, environments with different SLAs for definitions vs. execution data

## Handling Elsa Version Upgrades

### Review Release Notes

When upgrading Elsa to a new version:

1. **Check Release Notes** - Review migration changes in the [Elsa Core Release Notes](https://github.com/elsa-workflows/elsa-core/releases)
2. **Review Migration Files** - Examine new migrations in the updated NuGet packages
3. **Test in Staging** - Apply migrations in a non-production environment first
4. **Backup Before Upgrade** - Always backup databases before applying migrations

### Upgrade Process

**1. Update NuGet Packages:**
```bash
dotnet add package Elsa --version 3.x.x
dotnet add package Elsa.Persistence.EFCore.SqlServer --version 3.x.x
```

**2. Review Pending Migrations:**
```bash
# List migrations that will be applied
dotnet ef migrations list --context ManagementElsaDbContext
dotnet ef migrations list --context RuntimeElsaDbContext
```

**3. Generate SQL Scripts for Review:**
```bash
# Generate scripts to review changes before applying
dotnet ef migrations script --context ManagementElsaDbContext --idempotent -o elsa-management-upgrade.sql
dotnet ef migrations script --context RuntimeElsaDbContext --idempotent -o elsa-runtime-upgrade.sql
```

**4. Apply Migrations:**
```bash
# Apply in test environment first
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext

# Verify application starts and workflows execute correctly

# Then apply to production
```

**5. Rolling Upgrades (Clustered Environments):**

For zero-downtime upgrades:
1. Apply backward-compatible database migrations first
2. Deploy new application version to nodes one at a time
3. Monitor for errors during the transition
4. Keep previous version ready for rollback

### Rollback Strategy

If a migration causes issues:

**1. Rollback Database:**
```bash
# Rollback to specific migration
dotnet ef database update <PreviousMigrationName> --context ManagementElsaDbContext
```

**2. Restore from Backup:**
```bash
# SQL Server example
RESTORE DATABASE [Elsa] FROM DISK = 'C:\Backups\Elsa-PreUpgrade.bak'
```

**3. Revert Application Version:**
```bash
# Redeploy previous version
dotnet publish --configuration Release -o /path/to/previous/version
```

## Troubleshooting

### Common Issues

**Error: "The term 'dotnet-ef' is not recognized"**

**Cause:** EF Core tools not installed.

**Solution:**
```bash
dotnet tool install --global dotnet-ef
# Add ~/.dotnet/tools to PATH if needed
```

**Error: "Unable to create an object of type 'ApplicationDbContext'"**

**Cause:** Missing design-time DbContext factory or configuration.

**Solution:** Create a `IDesignTimeDbContextFactory<T>` implementation as shown above, or specify the connection string via command-line parameter.

**Error: "The migration has already been applied to the database"**

**Cause:** Migration already applied (informational).

**Solution:** No action needed. This is normal if the database is up to date.

**Error: "Cannot find compilation library location for package"**

**Cause:** Project not built before running `dotnet ef` commands.

**Solution:**
```bash
dotnet build
dotnet ef migrations add MigrationName
```

**Error: "Pending model changes detected"**

**Cause:** Entity model changes not captured in a migration.

**Solution:**
```bash
dotnet ef migrations add CaptureModelChanges --context ApplicationDbContext
```

### Diagnostic Commands

**Check Current Migration Status:**
```bash
# List migrations (applied migrations marked with *)
dotnet ef migrations list --context ApplicationDbContext

# Check database status
dotnet ef database update --context ApplicationDbContext --verbose
```

**View Last Migration Details:**
```sql
SELECT TOP 1 MigrationId, ProductVersion 
FROM __EFMigrationsHistory 
ORDER BY MigrationId DESC;
```

**Test Connection:**
```bash
# Attempt to connect and display info
dotnet ef dbcontext info --context ApplicationDbContext
```

## For Maintainers

### Elsa Core Issue Reference

This guidance addresses [elsa-core issue #6355](https://github.com/elsa-workflows/elsa-core/issues/6355), which requests clearer documentation on EF Core migration strategies and custom entity integration.

**Key Requirements from Issue:**
- ✅ Document Elsa's DbContext architecture
- ✅ Show how to add custom entities to Elsa's database
- ✅ Provide migration strategy guidance
- ✅ Explain manual vs. automatic migration approaches
- ✅ Cover version upgrade scenarios

### Schema Versioning Best Practices

For teams maintaining Elsa-based applications:

1. **Keep Migrations in Source Control** - Commit all migration files alongside application code
2. **Use Semantic Versioning** - Tag releases with versions that correspond to schema versions
3. **Document Schema Changes** - Maintain a CHANGELOG for notable schema modifications
4. **Test Migrations** - Include migration testing in CI/CD pipelines
5. **Database Branching** - Consider separate databases per branch for feature development

## Related Documentation

- [Persistence Guide](README.md) - Overview and provider comparison
- [SQL Server Guide](sql-server.md) - SQL Server-specific configuration
- [EF Core Setup Example](examples/efcore-setup.md) - Basic EF Core configuration
- [Database Configuration](../../getting-started/database-configuration.md) - Getting started with databases
- [Performance & Scaling Guide](../performance/README.md) - Optimization strategies

## Next Steps

- Decide on a migration strategy (single vs. separate databases)
- Create your `DbContext` if adding custom entities
- Generate and review migrations before applying
- Implement backup procedures before schema changes
- Automate migration deployment in your CI/CD pipeline

---

**Last Updated:** 2025-12-01

**Addresses Issues:** #74 (generating custom EF Core migrations), #11 (persistence configuration), references elsa-core #6355
