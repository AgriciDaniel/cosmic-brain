---
description: >-
  Guide to integrating Elsa Studio with Blazor Server applications, covering hosting patterns, authentication configuration, and troubleshooting common issues.
---

# Blazor Dashboard Integration

This guide covers integrating Elsa Studio (the workflow designer UI) with Blazor Server applications. You'll learn different hosting patterns, how to configure authentication, and how to troubleshoot common integration issues.

## Overview

Elsa Studio can be integrated with Blazor Server apps in several ways:

- **Same Process**: Host Elsa Server endpoints and Elsa Studio in the same ASP.NET Core application
- **Separate Services**: Host Elsa Server as a separate service and connect Elsa Studio via HTTP
- **Hybrid**: Mix of both approaches for different environments

This guide focuses primarily on Blazor Server integration, which provides a simpler hosting model compared to Blazor WebAssembly.

## Prerequisites

- ASP.NET Core 8.0+ application
- Blazor Server app (or willingness to add Blazor Server to an existing app)
- Basic understanding of Blazor authentication and authorization
- Elsa Server already set up (see [Hosting Elsa in an Existing App](../onboarding/hosting-elsa-in-existing-app.md))

## Hosting Patterns

### Pattern 1: Single Process (Recommended for Small Teams)

In this pattern, both Elsa Server (workflow runtime + API) and Elsa Studio (UI) run in the same ASP.NET Core process.

**Advantages:**
- Simpler deployment (single service)
- Easier authentication setup (shared auth context)
- Lower latency (no network hop between UI and API)
- Suitable for small to medium workloads

**Disadvantages:**
- UI and runtime share resources (memory, CPU)
- Scaling requires scaling both components together
- UI restarts affect runtime and vice versa

**Architecture:**
```
┌─────────────────────────────────────────────┐
│         Blazor Server Application           │
│                                             │
│  ┌─────────────┐      ┌──────────────┐     │
│  │ Elsa Studio │─────>│ Elsa Server  │     │
│  │  (Blazor)   │ API  │   (Runtime)  │     │
│  └─────────────┘      └──────────────┘     │
│                             │               │
│                             v               │
│                       ┌──────────┐          │
│                       │ Database │          │
│                       └──────────┘          │
└─────────────────────────────────────────────┘
```

### Pattern 2: Separate Services (Recommended for Production)

Elsa Server runs as a standalone service, and Elsa Studio connects to it via HTTP.

**Advantages:**
- Independent scaling (scale runtime without scaling UI)
- Better isolation (UI issues don't affect workflow execution)
- Multiple Studio instances can connect to one Server
- Easier to secure and monitor separately

**Disadvantages:**
- More complex deployment (two services)
- Network latency between UI and API
- Requires proper authentication/authorization setup
- CORS configuration needed

**Architecture:**
```
┌───────────────────┐          ┌───────────────────┐
│  Elsa Studio      │          │   Elsa Server     │
│  (Blazor Server)  │─────────>│   (API Service)   │
│                   │   HTTP   │                   │
└───────────────────┘          └─────────┬─────────┘
                                         │
                                         v
                                   ┌──────────┐
                                   │ Database │
                                   └──────────┘
```

## Implementation: Single Process Pattern

### Step 1: Install Required Packages

```bash
# Add Blazor Server support (if not already present)
dotnet add package Microsoft.AspNetCore.Components.Web

# Add Elsa Server packages
dotnet add package Elsa
dotnet add package Elsa.Workflows.Runtime
dotnet add package Elsa.Workflows.Api
dotnet add package Elsa.Persistence.EFCore.PostgreSql  # or your chosen provider

# Add Elsa Studio packages
dotnet add package Elsa.Studio
dotnet add package Elsa.Studio.Core.BlazorWasm
```

### Step 2: Configure Services in Program.cs

```csharp
using Elsa.Extensions;
using Elsa.Studio.Extensions;
using Microsoft.AspNetCore.Components;

var builder = WebApplication.CreateBuilder(args);

// Add Blazor Server
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Add your existing services
builder.Services.AddControllersWithViews();

// Add Elsa Server (workflow runtime and API)
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseWorkflowManagement(management =>
        {
            management.UseEntityFrameworkCore(ef =>
                ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase")));
        })
        .UseWorkflowRuntime(runtime =>
        {
            runtime.UseEntityFrameworkCore(ef =>
                ef.UsePostgreSql(builder.Configuration.GetConnectionString("ElsaDatabase")));
        })
        .UseWorkflowsApi()
        .UseHttp();
});

// Add Elsa Studio
builder.Services.AddElsaStudio(studio =>
{
    // Configure Studio to connect to local Elsa Server
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://localhost:5001");  // Same app
    });
});

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Elsa API endpoints under /elsa
app.UseWorkflowsApi();

// Map Blazor hub and Studio UI
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");  // Or your Blazor root page

app.Run();
```

### Step 3: Create Blazor Host Page

Create or update `Pages/_Host.cshtml`:

```html
@page "/"
@namespace YourApp.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Workflow Designer</title>
    <base href="~/" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
    <link href="css/site.css" rel="stylesheet" />
    
    <!-- Elsa Studio styles -->
    <link href="_content/Elsa.Studio.Core.BlazorWasm/css/elsa-studio.css" rel="stylesheet" />
</head>
<body>
    <component type="typeof(App)" render-mode="ServerPrerendered" />

    <div id="blazor-error-ui">
        <environment include="Staging,Production">
            An error has occurred. This application may no longer respond until reloaded.
        </environment>
        <environment include="Development">
            An unhandled exception has occurred. See browser dev tools for details.
        </environment>
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>

    <script src="_framework/blazor.server.js"></script>
    
    <!-- Elsa Studio scripts -->
    <script src="_content/Elsa.Studio.Core.BlazorWasm/js/elsa-studio.js"></script>
</body>
</html>
```

### Step 4: Configure App.razor

Update `App.razor` to include Elsa Studio routes:

```razor
@using Elsa.Studio.Core.BlazorWasm

<Router AppAssembly="@typeof(App).Assembly" 
        AdditionalAssemblies="@(new[] { typeof(Studio).Assembly })">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```

### Step 5: Test the Integration

1. Run your application
2. Navigate to `/workflows` (or the Studio route configured)
3. You should see the Elsa Studio workflow designer

## Authentication Configuration

When hosting Elsa Server and Studio together, authentication must be configured so that:
1. Users can log into the Blazor app
2. Studio API calls to Elsa Server are authorized

### Cookie-Based Authentication (Recommended for Single Process)

This is the simplest approach when both components are in the same process:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Configure cookie authentication
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorization(options =>
{
    // Define policies for workflow management
    options.AddPolicy("WorkflowDesigner", policy =>
        policy.RequireRole("WorkflowAdmin", "WorkflowDesigner"));
    
    options.AddPolicy("WorkflowViewer", policy =>
        policy.RequireRole("WorkflowAdmin", "WorkflowDesigner", "WorkflowViewer"));
});

// Add Blazor and Elsa
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddElsa(elsa =>
{
    // Elsa Server configuration
    elsa
        .UseIdentity(identity =>
        {
            // Use ASP.NET Core authentication
            identity.UseAspNetIdentity();
        })
        .UseDefaultAuthentication()
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

builder.Services.AddElsaStudio();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```

With this configuration:
- Users log in via your app's login page
- Authentication cookie is automatically sent with Studio → Elsa Server API calls
- Elsa Server validates the cookie and authorizes requests

### Common Authentication Issues

#### Issue 1: 401 Unauthorized on API Calls

**Symptom:** Elsa Studio loads, but API calls to fetch workflow definitions fail with 401 Unauthorized.

**Cause:** Authentication scheme mismatch or missing authentication middleware.

**Solution:**

1. Ensure authentication middleware is added **before** authorization:
   ```csharp
   app.UseAuthentication();  // Must come first
   app.UseAuthorization();
   ```

2. Verify the same authentication scheme is used:
   ```csharp
   // Both must use the same scheme (e.g., Cookies)
   builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
   
   builder.Services.AddElsa(elsa =>
   {
       elsa.UseDefaultAuthentication();  // Uses default ASP.NET Core auth
   });
   ```

3. Check that cookies are being sent in Studio API calls (browser DevTools → Network tab)

#### Issue 2: Infinite Login Redirect Loop

**Symptom:** Navigating to Studio redirects to login, which redirects back to Studio, which redirects to login again.

**Cause:** Login path is not excluded from authorization requirements.

**Solution:**

Allow anonymous access to login/logout pages:

```csharp
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages()
    .RequireAuthorization();  // Require auth for all pages

// Except login/logout
app.MapRazorPages()
    .AllowAnonymous()
    .WithName("Account");  // Pages under /Account allow anonymous
```

Or use `[AllowAnonymous]` attribute on login page:

```csharp
[AllowAnonymous]
public class LoginModel : PageModel
{
    // ...
}
```

#### Issue 3: Missing Bearer Token in API Calls

**Symptom:** In a separate services setup, Studio doesn't send authentication token to Elsa Server.

**Cause:** Token forwarding not configured.

**Solution:**

Configure Studio to forward authentication:

```csharp
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://elsa-server.example.com");
    });
    
    // Forward authentication token
    studio.ConfigureHttpClient((sp, client) =>
    {
        var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
        var token = httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
        
        if (!string.IsNullOrEmpty(token))
        {
            client.DefaultRequestHeaders.Add("Authorization", token);
        }
    });
});
```

## Implementation: Separate Services Pattern

When running Elsa Server and Studio as separate services, additional configuration is required.

### Elsa Server Configuration

```csharp
// Elsa Server (standalone API service)
var builder = WebApplication.CreateBuilder(args);

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

// Configure CORS to allow Studio to call API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowStudio", policy =>
    {
        policy
            .WithOrigins("https://studio.example.com")  // Your Studio URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();  // If using cookies
    });
});

var app = builder.Build();

app.UseCors("AllowStudio");
app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();

app.Run();
```

### Elsa Studio Configuration

```csharp
// Elsa Studio (separate Blazor Server app)
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddAuthentication(/* Your auth config */);

builder.Services.AddElsaStudio(studio =>
{
    // Point to remote Elsa Server
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://elsa-server.example.com");
    });
    
    // Configure authentication forwarding
    studio.ConfigureHttpClient((sp, client) =>
    {
        var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
        var context = httpContextAccessor.HttpContext;
        
        if (context?.User?.Identity?.IsAuthenticated == true)
        {
            // Forward authentication cookie or token
            var authHeader = context.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(authHeader))
            {
                client.DefaultRequestHeaders.Add("Authorization", authHeader);
            }
        }
    });
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```

### CORS Configuration

When Studio and Server are on different domains, configure CORS properly:

**Elsa Server (appsettings.json):**
```json
{
  "Elsa": {
    "Cors": {
      "AllowedOrigins": [
        "https://studio.example.com",
        "https://localhost:5002"
      ]
    }
  }
}
```

**Elsa Server (Program.cs):**
```csharp
var allowedOrigins = builder.Configuration.GetSection("Elsa:Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ElsaCors", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
```

## Troubleshooting Common Issues

### Login/401 Issues

**Problem:** Studio loads but shows "Unauthorized" or redirects to login repeatedly.

**Diagnosis:**
1. Check browser DevTools → Network tab
2. Look at API calls from Studio to Elsa Server
3. Check response status codes and headers

**Common Causes:**

1. **Mismatched authentication scheme:**
   - Studio uses cookies, Server expects Bearer tokens
   - Fix: Align both to use the same scheme

2. **Authentication middleware missing or in wrong order:**
   ```csharp
   // Wrong order
   app.UseAuthorization();  // ❌ Before authentication
   app.UseAuthentication();
   
   // Correct order
   app.UseAuthentication();  // ✅ First
   app.UseAuthorization();
   ```

3. **CORS blocking credentials:**
   ```csharp
   // Must include AllowCredentials for cookie forwarding
   policy.AllowCredentials();
   ```

### Token/Cookie Not Forwarded

**Problem:** User is authenticated in Studio, but API calls don't include authentication.

**Solution:** Configure HTTP client to forward authentication:

```csharp
builder.Services.AddHttpContextAccessor();

builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient((sp, client) =>
    {
        var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
        var httpContext = httpContextAccessor.HttpContext;
        
        if (httpContext != null)
        {
            // Forward authorization header (preferred for API calls)
            var authHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader))
            {
                client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", authHeader);
            }
            
            // Forward authentication cookies only to trusted Elsa Server
            // Note: Only forward to the same domain or explicitly trusted domains
            var cookies = httpContext.Request.Headers["Cookie"].FirstOrDefault();
            if (!string.IsNullOrEmpty(cookies) && IsElsaServerTrusted(client.BaseAddress))
            {
                // Filter to only authentication-related cookies if needed
                client.DefaultRequestHeaders.TryAddWithoutValidation("Cookie", cookies);
            }
        }
    });
});

// Helper method to validate Elsa Server is trusted
bool IsElsaServerTrusted(Uri baseAddress)
{
    // Only forward cookies to same origin or explicitly configured trusted domains
    var trustedDomains = builder.Configuration.GetSection("ElsaServer:TrustedDomains").Get<string[]>() 
        ?? Array.Empty<string>();
    
    return trustedDomains.Contains(baseAddress.Host, StringComparer.OrdinalIgnoreCase)
        || baseAddress.Host == "localhost"
        || baseAddress.Host == "127.0.0.1";
}
```

## Minimal Conceptual Example

Here's a complete minimal example of a Blazor Server app with Elsa Studio:

**Program.cs:**
```csharp
using Elsa.Extensions;
using Elsa.Studio.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Blazor
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Authentication
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

builder.Services.AddAuthorization();

// Elsa Server (local)
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseDefaultAuthentication()
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

// Elsa Studio
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://localhost:5001");
    });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```

## Security Considerations

For production deployments, follow security best practices:

1. **Always use HTTPS**: Never transmit authentication tokens over HTTP
2. **Configure CORS restrictively**: Only allow known Studio origins
3. **Use short-lived tokens**: Configure appropriate token lifetimes
4. **Implement RBAC**: Restrict workflow design to authorized users only
5. **Audit access**: Log all workflow modifications

For detailed security configuration, see:
- [Security & Authentication Guide](../security/README.md)
- [External Identity Providers](../security/external-identity-providers.md)
- [Disable Auth in Dev](../security/disable-auth.md) (development only)

## Next Steps

- **Customize Studio**: Configure themes, localization, and plugins
- **Add Custom Activities**: Extend workflow designer with [Custom Activities](../../extensibility/custom-activities.md)
- **Deploy to Production**: Follow [Kubernetes Deployment](../deployment/kubernetes.md) guide
- **Integrate with Identity Provider**: Set up [External Identity Providers](../security/external-identity-providers.md)
- **Run Workflows**: Learn about [Running Workflows](../running-workflows/README.md)

## Related Documentation

- [Hosting Elsa in an Existing App](../onboarding/hosting-elsa-in-existing-app.md)
- [Elsa Studio Application Type](../../application-types/elsa-studio.md)
- [Security & Authentication](../security/README.md)
- [External Identity Providers](../security/external-identity-providers.md)
- [Troubleshooting Guide](../troubleshooting/README.md)

---

**Last Updated:** 2025-12-02  
**Addresses Issues:** #87
