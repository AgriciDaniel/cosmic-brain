# Introduction

## Multitenancy Levels

Elsa supports multitenancy both within a shared database and through separate databases for each tenant.

### Shared Database

Each entity has a `TenantId` property that links them to a specific tenant. This setup allows for a database with multiple tenants and their related information, such as workflows and any other entity derived from the `Entity` base class.

### Separate Database

To ensure strong tenant separation, each database-connected module can be set up to determine the correct connection string at runtime. This is done using a factory delegate that uses the `IServiceProvider` to identify the current tenant via the `ITenantAccessor` service.

## Tenant

A _tenant_ is represented by the `Tenant` class:

```csharp
public class Tenant : Entity
{
   public string Name { get; set; }
   public IConfiguration Configuration { get; set; }
}
```

A tenant has a name and a configuration object. This configuration allows for tenant-specific settings like connection strings and host names.

## Tenant Resolution Pipeline

The _Tenant Resolution Pipeline_ is a group of components that identify the current tenant from the application context. In an ASP.NET Core app, these components usually look at the current HTTP request. For instance, the `HostTenantResolver` checks the request's host, and if it finds a tenant linked to that host, it selects that tenant as the current one.

The following packages provide the following resolvers:

* Elsa.Identity
  * `ClaimsTenantResolver`
  * `CurrentUserTenantResolver`
* Elsa.Tenants.AspNetCore
  * `HeaderTenantResolver`
  * `HostTenantResolver`
  * `RoutePrefixTenantResolver`

## Tenants Provider

The _Tenants Provider_ is a service that lists all the tenants registered in your application. Elsa provides the following built-in implementations:

* `DefaultTenantsProvider`
  * Produces a single tenant that represents the one and only tenant in a single-tenant setup. This is the default provider.
* `ConfigurationTenantsProvider`
  * Produces tenants from the `TenantsOptions` options class, which can be configured from e.g. _appsettings.json_.
* `StoreTenantsProvider`
  * The `ITenantStore` service manages tenants with EF Core and MongoDB options. This allows tenants to be stored, added, updated, and removed from the database



