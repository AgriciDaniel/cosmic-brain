---
description: >-
  Guide for disabling authentication in Elsa Server and Studio during development to simplify local testing and experimentation.
---

# Disable Authentication in Development

This guide explains how to disable authentication and authorization in Elsa Server and Studio for **development and testing purposes only**. Disabling authentication simplifies local development, prototyping, and learning Elsa without the complexity of setting up identity providers.

{% hint style="danger" %}
**WARNING: NOT FOR PRODUCTION USE**

Never deploy Elsa to production with authentication disabled. This would expose your workflow management APIs and allow anyone to:
- View, create, modify, and delete workflows
- Execute workflows with arbitrary payloads
- Access sensitive workflow data and variables
- Disrupt or manipulate running workflow instances

Always enable proper authentication and authorization before deploying to production environments.
{% endhint %}

## When to Disable Authentication

Disabling authentication is appropriate for:

- **Local development**: Testing workflows on your development machine
- **Learning Elsa**: Exploring features without authentication complexity
- **Proof of concepts**: Quick prototypes and demos
- **Integration tests**: Automated testing without auth overhead
- **Docker Compose local stacks**: Development containers on localhost

## When NOT to Disable Authentication

Never disable authentication for:

- **Production deployments**: Any environment accessible outside your local machine
- **Staging environments**: Pre-production testing should mirror production security
- **Shared development environments**: Multiple developers or accessible from network
- **Cloud deployments**: Any deployment to AWS, Azure, GCP, or other cloud platforms
- **Kubernetes clusters**: Even development clusters should have basic auth

## Methods for Disabling Authentication

There are several approaches to disable authentication in Elsa, depending on your setup and requirements.

### Method 1: Disable Endpoint Security (Simplest)

This is the easiest method and disables authentication for all Elsa API endpoints.

**Program.cs:**
```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ⚠️ DEVELOPMENT ONLY: Disable all endpoint security
if (builder.Environment.IsDevelopment())
{
    Elsa.Api.Common.Options.EndpointSecurityOptions.DisableSecurity();
}

builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi()
        .UseHttp();
});

var app = builder.Build();

app.UseWorkflowsApi();
app.Run();
```

**Key Points:**
- `DisableSecurity()` removes all authorization requirements from Elsa API endpoints
- Wrap in `if (builder.Environment.IsDevelopment())` to prevent accidental production use
- No authentication middleware needed

### Method 2: Bypass Authorization with AllowAnonymous

Configure authorization policies to allow all requests:

**Program.cs:**
```csharp
using Elsa.Extensions;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    // Allow all requests without authentication
    builder.Services.AddAuthorization(options =>
    {
        options.FallbackPolicy = new AuthorizationPolicyBuilder()
            .RequireAssertion(_ => true)  // Always allow
            .Build();
    });
}

builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

var app = builder.Build();

// Still add middleware, but policy allows everything
app.UseAuthentication();
app.UseAuthorization();

app.UseWorkflowsApi();
app.Run();
```

### Method 3: Disable Elsa Identity Module

If you've configured Elsa.Identity, you can disable it for development:

**Program.cs:**
```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    // Don't call UseIdentity() or UseDefaultAuthentication() in development
    
    if (builder.Environment.IsProduction())
    {
        // Only enable identity in production
        elsa.UseIdentity(identity =>
        {
            identity.UseConfigurationBasedIdentityProvider();
        });
        elsa.UseDefaultAuthentication();
    }
    
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

var app = builder.Build();

// Only use auth middleware in production
if (builder.Environment.IsProduction())
{
    app.UseAuthentication();
    app.UseAuthorization();
}

app.UseWorkflowsApi();
app.Run();
```

### Method 4: Configuration-Based Toggle

Use configuration files to toggle authentication:

**appsettings.Development.json:**
```json
{
  "Elsa": {
    "Security": {
      "Enabled": false
    }
  }
}
```

**appsettings.Production.json:**
```json
{
  "Elsa": {
    "Security": {
      "Enabled": true
    }
  }
}
```

**Program.cs:**
```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

var securityEnabled = builder.Configuration.GetValue<bool>("Elsa:Security:Enabled", true);

if (!securityEnabled)
{
    Elsa.Api.Common.Options.EndpointSecurityOptions.DisableSecurity();
}

builder.Services.AddElsa(elsa =>
{
    if (securityEnabled)
    {
        elsa
            .UseIdentity(identity =>
            {
                identity.UseConfigurationBasedIdentityProvider();
            })
            .UseDefaultAuthentication();
    }
    
    elsa
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

var app = builder.Build();

if (securityEnabled)
{
    app.UseAuthentication();
    app.UseAuthorization();
}

app.UseWorkflowsApi();
app.Run();
```

## Disabling Authentication in Elsa Studio

When disabling authentication in Elsa Server, you also need to configure Elsa Studio to not send authentication credentials.

### Studio Configuration

**Program.cs (Studio app):**
```csharp
using Elsa.Studio.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

if (builder.Environment.IsDevelopment())
{
    // Disable Studio authorization checks
    builder.Services.AddElsaStudio(studio =>
    {
        studio.ConfigureHttpClient(options =>
        {
            options.BaseAddress = new Uri("https://localhost:5001");
            // No authentication configuration needed
        });
    });
    
    // Optional: Disable authorization on Studio pages
    builder.Services.Configure<Microsoft.AspNetCore.Components.Server.CircuitOptions>(options =>
    {
        options.DetailedErrors = true;
    });
}
else
{
    // Production: Enable authentication
    builder.Services.AddAuthentication(/* ... */);
    builder.Services.AddElsaStudio(studio =>
    {
        studio.ConfigureHttpClient(options =>
        {
            options.BaseAddress = new Uri("https://elsa-server.example.com");
        });
        // Configure authentication forwarding
    });
}

var app = builder.Build();

if (!builder.Environment.IsDevelopment())
{
    app.UseAuthentication();
    app.UseAuthorization();
}

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");
app.Run();
```

## Docker Compose Example

For local development with Docker Compose, disable authentication in both Server and Studio:

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  elsa-server:
    image: elsaworkflows/elsa-server:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - Elsa__Security__Enabled=false
      - ConnectionStrings__PostgreSql=Host=postgres;Database=elsa;Username=elsa;Password=elsa123
    ports:
      - "5001:8080"
    depends_on:
      - postgres

  elsa-studio:
    image: elsaworkflows/elsa-studio-wasm:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ElsaServer__Url=http://elsa-server:8080
    ports:
      - "5002:8080"
    depends_on:
      - elsa-server

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_DB=elsa
      - POSTGRES_USER=elsa
      - POSTGRES_PASSWORD=elsa123
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Testing with Disabled Authentication

Once authentication is disabled, you can access Elsa APIs directly:

### Test API Access

```bash
# List workflow definitions (no auth header needed)
curl http://localhost:5001/elsa/api/workflow-definitions

# Create a workflow
curl -X POST http://localhost:5001/elsa/api/workflow-definitions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Workflow",
    "publish": true
  }'

# Execute a workflow
curl -X POST http://localhost:5001/elsa/api/workflow-definitions/{id}/execute
```

### Test Studio Access

Navigate to Studio in your browser:
```
http://localhost:5002/workflows
```

You should be able to:
- View all workflows
- Create and edit workflows
- Execute workflows
- View workflow instances

All without logging in.

## Security Considerations for Development

Even with authentication disabled in development, follow these practices:

### 1. Restrict Network Access

**Bind to localhost only:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Only listen on localhost in development
if (builder.Environment.IsDevelopment())
{
    builder.WebHost.UseUrls("http://localhost:5001", "https://localhost:5002");
}
```

**Docker Compose (localhost only):**
```yaml
services:
  elsa-server:
    ports:
      - "127.0.0.1:5001:8080"  # Bind to localhost only
```

### 2. Use Separate Development Database

Never point development environments to production databases:

```json
{
  "ConnectionStrings": {
    "ElsaDatabase": "Host=localhost;Database=elsa_dev;Username=dev_user;Password=dev_password"
  }
}
```

### 3. Firewall Rules

Ensure development machines have firewall rules blocking external access to Elsa ports.

### 4. Environment Checks

Always wrap disabled auth in environment checks:

```csharp
if (builder.Environment.IsDevelopment())
{
    // Disable auth only in development
}

if (builder.Environment.IsProduction())
{
    // Always enable auth in production
    throw new InvalidOperationException("Authentication cannot be disabled in production");
}
```

## Re-Enabling Authentication for Production

Before deploying to production, remove all authentication disabling code and enable proper security:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ✅ Always enable authentication for production
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

var app = builder.Build();

// ✅ Always use authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.UseWorkflowsApi();
app.Run();
```

For production authentication options, see:
- [Security & Authentication Guide](README.md)
- [External Identity Providers](external-identity-providers.md)

## Troubleshooting

### Studio Still Prompts for Login

**Cause:** Studio authorization is still enabled.

**Fix:** Ensure Studio is configured without authentication requirements:
```csharp
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://localhost:5001");
        // No authentication configuration - allows anonymous access
    });
});
```

Also verify that Elsa Server has disabled security (see Method 1 above).

### API Returns 401 Unauthorized

**Cause:** `UseAuthentication()` or `UseAuthorization()` middleware is still active, or `DisableSecurity()` wasn't called.

**Fix:** Ensure you've disabled security before building the app:
```csharp
Elsa.Api.Common.Options.EndpointSecurityOptions.DisableSecurity();
var app = builder.Build();
```

### Cannot Access from Another Machine on Network

**Cause:** Application is bound to localhost only.

**Fix (Development Only):** Bind to all interfaces:
```csharp
builder.WebHost.UseUrls("http://*:5001");
```

{% hint style="warning" %}
Only do this in isolated development networks. Never expose unauthenticated Elsa to the internet.
{% endhint %}

## Next Steps

- **Learn Elsa**: Explore [Getting Started](../../getting-started/hello-world.md) tutorials
- **Create Workflows**: Build your first workflow with [Elsa Studio](../../application-types/elsa-studio.md)
- **Enable Auth for Production**: Follow [Security & Authentication Guide](README.md)
- **Integrate Identity**: Set up [External Identity Providers](external-identity-providers.md)

## Related Documentation

- [Security & Authentication Guide](README.md) - Comprehensive security configuration
- [External Identity Providers](external-identity-providers.md) - Integrating with Azure AD, Auth0, etc.
- [Hosting Elsa in an Existing App](../onboarding/hosting-elsa-in-existing-app.md) - Integration guide
- [Blazor Dashboard Integration](../integration/blazor-dashboard.md) - Studio setup

---

**Last Updated:** 2025-12-02  
**Addresses Issues:** #15
