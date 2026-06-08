---
type: concept
title: "Elsa Multitenancy"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - multitenancy
  - tenant-isolation
  - architecture
status: developing
address: c-000079
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Authentication]]"
  - "[[Elsa Distributed Hosting]]"
---

# Elsa Multitenancy

[[entities/Elsa Workflows]] supports multitenancy through configurable tenant isolation strategies, a flexible resolution pipeline, and pluggable tenant providers.

---

## Tenant Isolation Strategies

Elsa provides two levels of tenant isolation:

### Shared Database (Row-Level)

All tenant data resides in the same database. Each entity has a `TenantId` property that links it to a specific tenant. This applies to workflows and any entity derived from the `Entity` base class.

- **Pros**: Simple infrastructure, lowest cost
- **Cons**: Soft isolation only; requires careful query filtering

### Separate Databases (Schema-Level)

Each database-connected module can resolve the correct connection string at runtime. A factory delegate uses `IServiceProvider` to identify the current tenant via `ITenantAccessor`, returning a tenant-specific connection string.

- **Pros**: Strong isolation, independent scaling per tenant
- **Cons**: Higher operational complexity, more database connections

---

## Tenant Model

A tenant is represented by the `Tenant` class:

```csharp
public class Tenant : Entity
{
   public string Name { get; set; }
   public IConfiguration Configuration { get; set; }
}
```

Each tenant has a name and a configuration object (connection strings, host names, feature toggles, etc.).

---

## Tenant Resolution Pipeline

The **Tenant Resolution Pipeline** identifies the current tenant from the application context. In ASP.NET Core, these components inspect the current HTTP request.

### Built-in Resolvers

| Package | Resolver | Mechanism |
|---------|----------|-----------|
| `Elsa.Identity` | `ClaimsTenantResolver` | JWT claims |
| `Elsa.Identity` | `CurrentUserTenantResolver` | Current authenticated user |
| `Elsa.Tenants.AspNetCore` | `HeaderTenantResolver` | HTTP header |
| `Elsa.Tenants.AspNetCore` | `HostTenantResolver` | Request hostname |
| `Elsa.Tenants.AspNetCore` | `RoutePrefixTenantResolver` | URL path prefix |

The pipeline is configurable — resolvers run in order, and the first match wins.

---

## Tenants Provider

The **Tenants Provider** enumerates all tenants registered in the application.

| Provider | Description |
|----------|-------------|
| `DefaultTenantsProvider` | Single tenant for single-tenant setups (default) |
| `ConfigurationTenantsProvider` | Reads tenants from `TenantsOptions` (e.g. `appsettings.json`) |
| `StoreTenantsProvider` | Manages tenants via `ITenantStore` with EF Core or MongoDB persistence |

---

## Setup

Enable multitenancy by adding the `Elsa.Tenants` package and configuring the `TenantsFeature`:

```csharp
services.AddElsa(elsa =>
{
    elsa.UseTenants(tenants =>
    {
        tenants.ConfigureMultitenancy(options =>
        {
            options.TenantResolverPipelineBuilder.Append<ClaimsTenantResolver>();
        });

        tenants.UseConfigurationBasedTenantsProvider(options =>
            configuration.GetSection("Multitenancy").Bind(options));
    });
});
```

With the Identity module, a signed-in user's tenant ID is added as a claim. The `ClaimsTenantResolver` uses that claim to resolve the current tenant.

### Configuration Example

```json
{
  "Multitenancy": {
    "Tenants": [
      { "Id": "tenant-1", "Name": "Tenant 1" },
      { "Id": "tenant-2", "Name": "Tenant 2" }
    ]
  }
}
```

> [!warning] Unique Primary Keys
> Primary key IDs must be unique across tenants since there is no composite constraint with tenant IDs. This may change in a future version.

---

## Identity and Tenants

When using `Elsa.Identity`, roles, users, and applications can be scoped to a tenant via the `TenantId` property. Each identity entity links to a specific tenant, enabling per-tenant authentication and authorization policies.

See [[Elsa Authentication]] for more on identity configuration.
