---
description: >-
  Step-by-step guide to integrating Elsa Workflows into an existing ASP.NET Core application, including persistence setup, common pain points, and troubleshooting.
---

# Hosting Elsa in an Existing ASP.NET Core App

This guide walks you through adding Elsa Workflows to an existing ASP.NET Core application. Whether you're building a new feature or modernizing an existing codebase, this guide will help you integrate Elsa smoothly while avoiding common pitfalls.

## Overview

Integrating Elsa into an existing ASP.NET Core app involves:

1. Installing required NuGet packages
2. Configuring Elsa services in `Program.cs`
3. Setting up persistence (database)
4. Addressing common integration challenges

This guide focuses on practical integration patterns and addresses common issues reported by the community (issue #6).

## Prerequisites

Before you begin, ensure you have:

- An existing ASP.NET Core application (.NET 6.0+, .NET 8.0 recommended)
- Basic understanding of ASP.NET Core dependency injection
- A database server (PostgreSQL, SQL Server, SQLite, or MySQL)
- Visual Studio 2022+, Visual Studio Code, or Rider

## Step 1: Install Elsa Packages

Add the core Elsa packages to your project. The exact packages depend on your needs:

### Basic Workflow Runtime

For workflow execution without a UI:

```bash
dotnet add package Elsa
dotnet add package Elsa.Workflows.Runtime
dotnet add package Elsa.Workflows.Api
```

### With Entity Framework Core Persistence

For PostgreSQL:

```bash
dotnet add package Elsa.Persistence.EFCore.PostgreSql
```

For SQL Server:

```bash
dotnet add package Elsa.Persistence.EFCore.SqlServer
```

For SQLite (development only):

```bash
dotnet add package Elsa.Persistence.EFCore.Sqlite
```

### Optional: HTTP Activities

If your workflows need HTTP endpoints:

```bash
dotnet add package Elsa.Http
```

### Optional: Elsa Studio (Web UI)

To include the workflow designer UI in your app:

```bash
dotnet add package Elsa.Studio
dotnet add package Elsa.Studio.Core.BlazorWasm
```

## Step 2: Configure Elsa in Program.cs

Add Elsa to your existing `Program.cs` configuration. Here's a complete example showing integration with an existing app:

### Basic Configuration

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Your existing services
builder.Services.AddControllers();
builder.Services.AddRazorPages();
// ... other services ...

// Add Elsa services
builder.Services.AddElsa(elsa =>
{
    // Configure workflow management (designer, definitions)
    elsa.UseWorkflowManagement();
    
    // Configure workflow runtime (execution engine)
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.WorkflowInboxCleanupOptions = new()
        {
            // Clean up completed workflow instances after 30 days
            BatchSize = 100,
            SweepInterval = TimeSpan.FromMinutes(60)
        };
    });
    
    // Expose workflows via REST API
    elsa.UseWorkflowsApi();
    
    // Add HTTP activities for workflow endpoints
    elsa.UseHttp();
});

var app = builder.Build();

// Your existing middleware
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Map Elsa workflows API endpoints
app.UseWorkflowsApi();

// Your existing endpoints
app.MapControllers();
app.MapRazorPages();

app.Run();
```

### With Persistence (PostgreSQL Example)

```csharp
using Elsa.Persistence.EFCore.Extensions;
using Elsa.Persistence.EFCore.Modules.Management;
using Elsa.Persistence.EFCore.Modules.Runtime;
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Your existing services
builder.Services.AddControllers();

// Add Elsa with PostgreSQL persistence
builder.Services.AddElsa(elsa =>
{
    // Use PostgreSQL for workflow definitions and instances
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase"));
        });
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase"));
        });
    });
    
    elsa.UseWorkflowsApi();
    elsa.UseHttp();
});

var app = builder.Build();

// Run EF Core migrations on startup (development only)
// For production, run migrations separately
if (app.Environment.IsDevelopment())
{
    await app.Services.MigrateElsaDatabaseAsync();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.MapControllers();

app.Run();
```

**Connection String (appsettings.json):**

```json
{
  "ConnectionStrings": {
    "ElsaDatabase": "Host=localhost;Database=elsa_workflows;Username=elsa;Password=your_secure_password"
  }
}
```

### With SQL Server

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(builder.Configuration.GetConnectionString("ElsaDatabase"));
    });
});

elsa.UseWorkflowRuntime(runtime =>
{
    runtime.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlServer(builder.Configuration.GetConnectionString("ElsaDatabase"));
    });
});
```

**SQL Server Connection String:**

```json
{
  "ConnectionStrings": {
    "ElsaDatabase": "Server=localhost;Database=ElsaWorkflows;User Id=elsa_user;Password=your_secure_password;TrustServerCertificate=true"
  }
}
```

## Step 3: Initialize Database

After configuring persistence, you need to create the database schema.

### Option A: Auto-Migration (Development)

For development environments, you can auto-migrate on startup:

```csharp
if (app.Environment.IsDevelopment())
{
    await app.Services.MigrateElsaDatabaseAsync();
}
```

This creates/updates the database schema automatically when the app starts.

### Option B: Manual Migration (Production)

For production, run migrations separately using the EF Core CLI:

```bash
# Install EF Core tools if not already installed
dotnet tool install --global dotnet-ef

# Add a migration
dotnet ef migrations add InitialElsa --context ManagementElsaDbContext
dotnet ef migrations add InitialElsaRuntime --context RuntimeElsaDbContext

# Apply migrations
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext
```

{% hint style="info" %}
**Note:** Elsa uses separate DbContexts for management (workflow definitions) and runtime (workflow instances). You'll need to manage migrations for both contexts.
{% endhint %}

## Common Pain Points and Solutions

Based on community feedback (issue #6), here are the most common integration challenges and how to solve them:

### 1. DbContextOptions<T> Registration Issue

**Problem:** When you have your own `AppDbContext` that requires `DbContextOptions<AppDbContext>`, you may encounter conflicts with Elsa's internal DbContext registration.

**Symptoms:**
```
System.InvalidOperationException: Unable to resolve service for type 
'Microsoft.EntityFrameworkCore.DbContextOptions`1[YourApp.Data.AppDbContext]' 
while attempting to activate 'YourApp.Data.AppDbContext'.
```

**Solution:**

Explicitly register your `AppDbContext` with its own connection string and options:

```csharp
// Register your own DbContext first
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("AppDatabase"));
    // Your DbContext configuration
});

// Then register Elsa with a different connection string
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            // Use separate connection string for Elsa
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase"));
        });
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase"));
        });
    });
});
```

**Key Points:**
- Use separate databases or schemas for Elsa and your app
- Elsa's DbContexts are registered with specific lifetimes - don't try to share them
- If you must share a database, use different connection strings with schema prefixes

### 2. Version Pinning Conflicts

**Problem:** Elsa depends on specific versions of packages like `Hangfire`, `Microsoft.EntityFrameworkCore.Design`, or `Microsoft.CodeAnalysis.*`, which may conflict with your existing dependencies.

**Symptoms:**
```
NU1605: Detected package downgrade: Microsoft.EntityFrameworkCore from 8.0.0 to 7.0.5
NU1608: Detected package version outside of dependency constraint
```

**Solutions:**

#### Strategy 1: Version Alignment

Align your EF Core versions with Elsa's requirements:

```xml
<ItemGroup>
  <!-- Explicitly specify EF Core version to match Elsa -->
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
  
  <!-- Elsa packages (replace x.y.z with the latest version from NuGet) -->
  <PackageReference Include="Elsa" Version="x.y.z" />
  <PackageReference Include="Elsa.Persistence.EFCore.PostgreSql" Version="x.y.z" />
</ItemGroup>
```

#### Strategy 2: Binding Redirects (Framework Apps)

For .NET Framework apps, use binding redirects in `web.config`:

```xml
<runtime>
  <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
    <dependentAssembly>
      <assemblyIdentity name="Microsoft.EntityFrameworkCore" publicKeyToken="adb9793829ddae60" />
      <bindingRedirect oldVersion="0.0.0.0-8.0.0.0" newVersion="8.0.0.0" />
    </dependentAssembly>
  </assemblyBinding>
</runtime>
```

#### Strategy 3: Update Dependencies

Update your existing packages to match Elsa's requirements:

```bash
# Update all EF Core packages
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0

# Update Hangfire if used
dotnet add package Hangfire.Core --version 1.8.0
dotnet add package Hangfire.AspNetCore --version 1.8.0
```

### 3. Swagger / Swashbuckle Schema Conflicts

**Problem:** When adding Swagger/Swashbuckle to document your API, you may encounter schema ID conflicts with Elsa's API endpoints.

**Symptoms:**
```
Swashbuckle.AspNetCore.SwaggerGen.SwaggerGeneratorException: 
Conflicting schemaIds: Duplicate schemaIds detected for types 
Elsa.Workflows.Core.Models.WorkflowDefinition and YourApp.Models.WorkflowDefinition
```

**Solutions:**

#### Solution 1: Custom Schema ID Generation

Configure Swashbuckle to generate unique schema IDs:

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type =>
    {
        // Include namespace to avoid conflicts
        return type.FullName?.Replace("+", ".");
    });
    
    // Or use a more sophisticated approach
    options.CustomSchemaIds(type =>
    {
        if (type.FullName?.StartsWith("Elsa") == true)
        {
            return "Elsa_" + type.Name;
        }
        return type.Name;
    });
});
```

#### Solution 2: Exclude Elsa Endpoints from Swagger

If you don't need to document Elsa's API endpoints:

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.DocInclusionPredicate((docName, apiDesc) =>
    {
        // Exclude Elsa API endpoints from Swagger documentation
        var actionDescriptor = apiDesc.ActionDescriptor;
        var controllerName = actionDescriptor.RouteValues["controller"];
        
        if (controllerName?.StartsWith("Elsa") == true)
        {
            return false;
        }
        
        return true;
    });
});
```

#### Solution 3: Multiple Swagger Documents

Create separate Swagger documents for your API and Elsa:

```csharp
builder.Services.AddSwaggerGen(options =>
{
    // Your API documentation
    options.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "My App API", 
        Version = "v1" 
    });
    
    // Elsa API documentation
    options.SwaggerDoc("elsa", new OpenApiInfo 
    { 
        Title = "Elsa Workflows API", 
        Version = "v1" 
    });
    
    options.DocInclusionPredicate((docName, apiDesc) =>
    {
        var controllerName = apiDesc.ActionDescriptor.RouteValues["controller"];
        
        if (docName == "elsa")
        {
            return controllerName?.StartsWith("Elsa") == true;
        }
        
        return controllerName?.StartsWith("Elsa") != true;
    });
});

// In the middleware pipeline
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My App API");
    options.SwaggerEndpoint("/swagger/elsa/swagger.json", "Elsa Workflows API");
});
```

## Authentication and Authorization

For production deployments, you'll need to secure Elsa's API endpoints. This section provides a high-level overview; see the [Security & Authentication Guide](../security/README.md) for detailed configuration.

### Quick Overview

**Development (Disable Auth):**
- See [Disable Authentication in Dev](../security/disable-auth.md)
- Not recommended for production

**Production Options:**
- **Elsa.Identity**: Built-in identity system with user management
- **API Keys**: Simple token-based authentication
- **OIDC/OAuth2**: Integration with Azure AD, Auth0, Keycloak, etc.
- See [External Identity Providers](../security/external-identity-providers.md)

### Basic Identity Setup

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseIdentity(identity =>
        {
            identity.UseConfigurationBasedIdentityProvider();
        })
        .UseDefaultAuthentication()
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

// Enable authentication middleware
app.UseAuthentication();
app.UseAuthorization();
```

## Testing Your Integration

### 1. Verify Elsa Services are Registered

Create a simple controller to check if Elsa is loaded:

```csharp
using Elsa.Workflows.Runtime;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly IWorkflowRuntime _workflowRuntime;

    public HealthController(IWorkflowRuntime workflowRuntime)
    {
        _workflowRuntime = workflowRuntime;
    }

    [HttpGet("elsa")]
    public IActionResult ElsaHealth()
    {
        return Ok(new 
        { 
            elsaLoaded = _workflowRuntime != null,
            message = "Elsa Workflows is integrated successfully"
        });
    }
}
```

### 2. Check API Endpoints

With the app running, navigate to:

- `https://localhost:5001/elsa/api/workflow-definitions` - List workflow definitions
- `https://localhost:5001/swagger` - Swagger UI (if configured)

### 3. Verify Database

Check that Elsa tables were created:

**PostgreSQL:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'Elsa%';
```

**SQL Server:**
```sql
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME LIKE 'Elsa%';
```

You should see tables like:
- `Elsa_WorkflowDefinitions`
- `Elsa_WorkflowInstances`
- `Elsa_Bookmarks`
- And others

## Next Steps

Now that Elsa is integrated into your app:

1. **Create your first workflow**: Use [Elsa Studio](../../application-types/elsa-studio.md) or programmatic workflow definitions
2. **Add workflow activities**: Extend Elsa with [Custom Activities](../../extensibility/custom-activities.md)
3. **Secure your deployment**: Configure [authentication and authorization](../security/README.md)
4. **Deploy to production**: Follow the [Kubernetes Deployment Guide](../deployment/kubernetes.md) or [Clustering Guide](../clustering/README.md)
5. **Monitor workflows**: Set up observability and logging

## Related Documentation

- [Elsa Server Setup](../../application-types/elsa-server.md)
- [Database Configuration](../../getting-started/database-configuration.md)
- [Persistence Guide](../persistence/README.md)
- [Security & Authentication](../security/README.md)
- [Blazor Dashboard Integration](../integration/blazor-dashboard.md)
- [Troubleshooting Guide](../troubleshooting/README.md)

## Troubleshooting

### Services Not Resolving

**Problem:** `IWorkflowRuntime` or other Elsa services not found in DI.

**Solution:** Ensure you called `AddElsa()` before `builder.Build()`:

```csharp
builder.Services.AddElsa(elsa => { /* config */ });
var app = builder.Build();  // After AddElsa
```

### Database Connection Fails

**Problem:** `Npgsql.NpgsqlException: Connection refused`

**Solutions:**
- Verify database server is running
- Check connection string format
- Ensure firewall allows connections
- Test connection with `psql` or `sqlcmd`

### Migrations Not Applied

**Problem:** Tables not created after running migrations.

**Solution:** Ensure migrations were created for both contexts:

```bash
dotnet ef migrations add InitialElsa --context ManagementElsaDbContext
dotnet ef migrations add InitialElsaRuntime --context RuntimeElsaDbContext
```

Then apply both:

```bash
dotnet ef database update --context ManagementElsaDbContext
dotnet ef database update --context RuntimeElsaDbContext
```

---

**Last Updated:** 2025-12-02  
**Addresses Issues:** #6
