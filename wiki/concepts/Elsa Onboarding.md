---
type: concept
title: "Elsa Onboarding"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - dotnet
  - integration
  - getting-started
status: developing
address: c-000080
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Security]]"
  - "[[Elsa Blazor Dashboard]]"
---

# Elsa Onboarding

Integrating [[entities/Elsa Workflows]] into an existing ASP.NET Core application. Onboarding covers NuGet package selection, service configuration, database setup, and common integration pitfalls.

---

## Package Selection

Elsa v3 ships a modular NuGet ecosystem. Choose packages based on the features needed:

| Package | Purpose |
|---------|---------|
| `Elsa` | Meta-package bundling Core + Management + Runtime + HTTP |
| `Elsa.Workflows.Core` | Core engine: workflow definition, execution, bookmarks |
| `Elsa.Workflows.Management` | CRUD for workflow definitions and instances, activity registry |
| `Elsa.Workflows.Runtime` | Workflow runtime execution, dispatch, triggers |
| `Elsa.Workflows.Api` | REST API controllers and endpoints |
| `Elsa.Http` | HTTP activities (HttpEndpoint, SendHttpRequest, etc.) |
| `Elsa.Identity` | API key, JWT, and basic authentication |
| `Elsa.Scheduling` | Timer and Cron scheduling activities |
| `Elsa.Persistence.EntityFramework.*` | EF Core providers: SqlServer, PostgreSql, Sqlite, MySql |
| `Elsa.Persistence.MongoDb` | MongoDB persistence provider |

> [!tip] Start Minimal
> Begin with `Elsa` plus a persistence provider. Add `Elsa.Workflows.Api` only if REST API access is needed. Add `Elsa.Identity` only when securing endpoints.

---

## Basic Program.cs Setup

The minimal setup adds the workflow engine, a persistence store, and HTTP capabilities:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Elsa services
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement()    // CRUD for definitions and instances
        .UseWorkflowRuntime()       // Runtime execution + dispatch
        .UseWorkflowsApi()          // REST API controllers
        .UseHttp();                 // HTTP activities and triggers
});

var app = builder.Build();

// Map Elsa API endpoints
app.UseWorkflowsApi();

// Map HTTP activity endpoints (triggers)
app.UseWorkflows();

app.Run();
```

---

## Database & Migrations

Elsa requires a persistence store for workflow definitions, instances, bookmarks, and other runtime data.

### Adding EF Core Persistence

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi()
        .UseHttp();
});

// Add EF Core persistence
var connectionString = builder.Configuration.GetConnectionString("Elsa");
builder.Services.AddDbContext<ElsaDbContext>(options =>
    options.UseSqlServer(connectionString)); // or UseNpgsql, UseSqlite, UseMySql
```

### Running Migrations

```csharp
var app = builder.Build();

// Auto-apply migrations on startup (development only)
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ElsaDbContext>();
    await db.Database.MigrateAsync();
}
```

For production, use a dedicated migration Job or an init container in Kubernetes.

---

## Common Pitfalls

### DbContextOptions Conflict

If the host application already uses EF Core, the `AddDbContext` call for Elsa may conflict with the app's own `DbContextOptions` configuration. Solve by separating Elsa's DbContext registration:

```csharp
// Avoid: mixing Elsa DbContext with app DbContext in same options pattern
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(appConnectionString));

// Elsa: configure separately
services.AddDbContext<ElsaDbContext>(options => 
    options.UseSqlServer(elsaConnectionString));
```

### Swagger Conflicts

Elsa registers its own API endpoints. If the host app uses Swagger/Swashbuckle, Elsa endpoints may not appear in the generated spec. Use `AddElsaSwagger()` to register them:

```csharp
builder.Services.AddSwaggerGen();
// Register Elsa API endpoints in Swagger
builder.Services.AddElsaSwagger();
```

### Authentication Overlap

Elsa's `UseDefaultAuthentication()` adds its own auth middleware. If the host app already uses ASP.NET Core Identity or JWT auth, either:
- Disable Elsa's auth and let the host handle it
- Use `UseIdentity()` with `UseDefaultAuthentication()` but configure Elsa to share the host's auth scheme

See [[Elsa Security]] for detailed guidance.

> [!warning] Environment Lock-In
> Do not disable security in production. Always wrap `DisableSecurity()` or `AllowAnonymous` policies behind `if (builder.Environment.IsDevelopment())` checks.

---

## Runtime vs Dispatcher vs Runner

Deciding which execution model to configure depends on the application's requirements:

| Configured via | Execution | When to Use |
|----------------|-----------|-------------|
| `UseWorkflowRuntime()` | Async via dispatcher, full persistence | Production apps with long-running workflows |
| Manual `IWorkflowRunner` | Sync in-process, no persistence | Tests, simple short-lived tasks |
| Manual `IWorkflowDispatcher` | Async via queue, with persistence | Custom dispatch and queueing logic |

`UseWorkflowRuntime()` is the recommended default for production applications.

---

## Related

- [[Elsa Workflow Concepts]] -- Core workflow building blocks
- [[Elsa Workflow Dispatcher]] -- Dispatch architecture
- [[Elsa Security]] -- Auth and identity configuration
- [[Elsa Blazor Dashboard]] -- Adding the Studio dashboard
- [[entities/Elsa Workflows]] -- Platform overview
