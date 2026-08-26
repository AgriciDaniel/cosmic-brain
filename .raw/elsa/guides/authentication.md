---
description: >-
  Comprehensive guide to configuring authentication and authorization for Elsa Workflows, covering OIDC providers, API keys, custom authentication, and security best practices.
---

# Authentication & Authorization Guide

This guide provides comprehensive instructions for securing your Elsa Workflows deployment with various authentication and authorization strategies. Whether you're integrating with existing identity providers, implementing API key authentication, or building custom authentication solutions, this guide covers everything you need to get started.

## Overview

Elsa Workflows supports multiple authentication mechanisms to secure both the Elsa HTTP API and Elsa Studio:

- **No Authentication** - For development and testing environments
- **Elsa.Identity** - Built-in identity system with user management
- **OpenID Connect (OIDC)** - Integration with external identity providers (Azure AD, Auth0, Keycloak, etc.)
- **API Keys** - Token-based authentication for machine-to-machine communication
- **Custom Authentication** - Implement your own authentication provider

## Table of Contents

- [Prerequisites](#prerequisites)
- [No Authentication (Development Only)](#no-authentication-development-only)
- [Using Elsa.Identity](#using-elsaidentity)
- [OIDC Configuration](#oidc-configuration)
  - [Azure AD Integration](#azure-ad-integration)
  - [Auth0 Integration](#auth0-integration)
  - [Generic OIDC Provider](#generic-oidc-provider)
- [API Key Authentication](#api-key-authentication)
- [Custom Authentication Provider](#custom-authentication-provider)
- [Studio Authentication Configuration](#studio-authentication-configuration)
- [Troubleshooting](#troubleshooting)
- [Security Best Practices](#security-best-practices)
- [Production Considerations](#production-considerations)

## Prerequisites

Before configuring authentication, ensure you have:

- Elsa Server project set up (see [Elsa Server Setup](../application-types/elsa-server.md))
- .NET 8.0 or later SDK installed
- Basic understanding of ASP.NET Core authentication
- Access to your identity provider (if using OIDC)

## No Authentication (Development Only)

⚠️ **Warning**: This configuration should only be used in development environments. Never deploy to production without proper authentication.

### Disabling API Security

In your Elsa Server `Program.cs`, disable security requirements:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Disable endpoint security
Elsa.EndpointSecurityOptions.DisableSecurity();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();
app.UseWorkflowsApi();
app.Run();
```

### Disabling Studio Authorization

If using Elsa Studio (WASM or standalone), also disable authorization:

```csharp
builder.Services.AddShell(x => x.DisableAuthorization = true);
```

This allows all HTTP requests to proceed without authentication checks.

## Using Elsa.Identity

Elsa.Identity is the built-in identity system that provides user management, roles, and permissions out of the box.

### 1. Install NuGet Packages

```bash
dotnet add package Elsa.Identity
```

### 2. Configure Services

Add Elsa.Identity to your `Program.cs`:

```csharp
using Elsa.Identity.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.UseIdentity(identity =>
    {
        identity.UseAdminUserProvider();
        identity.TokenOptions = options =>
        {
            options.SigningKey = "your-secret-signing-key-at-least-256-bits";
            options.AccessTokenLifetime = TimeSpan.FromDays(1);
            options.RefreshTokenLifetime = TimeSpan.FromDays(7);
        };
    });
    
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

### 3. Configure Default Admin User

Add admin user configuration to `appsettings.json`:

```json
{
  "Identity": {
    "AdminUser": {
      "Email": "admin@localhost",
      "Password": "Admin123!",
      "Roles": ["Admin", "WorkflowDesigner"]
    }
  }
}
```

### 4. Create Additional Users

Use the Identity API endpoints to create additional users:

```bash
POST /identity/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "roles": ["WorkflowDesigner"]
}
```

### 5. Obtain Authentication Token

Authenticate and get a JWT token:

```bash
POST /identity/login
Content-Type: application/json

{
  "email": "admin@localhost",
  "password": "Admin123!"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 86400
}
```

Use the `accessToken` in subsequent requests:

```bash
GET /elsa/api/workflow-definitions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## OIDC Configuration

OpenID Connect (OIDC) allows you to integrate with external identity providers like Azure AD, Auth0, Keycloak, and others.

### General OIDC Setup

1. Register your application with the OIDC provider
2. Obtain client ID and client secret
3. Configure redirect URIs
4. Install required NuGet packages
5. Configure authentication middleware

### Azure AD Integration

Azure Active Directory (Azure AD / Microsoft Entra ID) is a popular choice for enterprise applications.

#### Step 1: Register Application in Azure Portal

1. Navigate to [Azure Portal](https://portal.azure.com)
2. Go to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: Elsa Workflows Server
   - **Supported account types**: Choose based on your requirements
   - **Redirect URI**: 
     - Type: Web
     - URI: `https://your-elsa-server.com/signin-oidc`
5. Click **Register**
6. Note the **Application (client) ID** and **Directory (tenant) ID**

#### Step 2: Create Client Secret

1. In your app registration, go to **Certificates & secrets**
2. Click **New client secret**
3. Add description and expiration
4. Click **Add**
5. **Copy the secret value immediately** (it won't be shown again)

#### Step 3: Configure API Permissions

1. Go to **API permissions**
2. Add permissions:
   - Microsoft Graph > Delegated > `User.Read`
   - Microsoft Graph > Delegated > `openid`
   - Microsoft Graph > Delegated > `profile`
   - Microsoft Graph > Delegated > `email`
3. Click **Grant admin consent** (if you have admin privileges)

#### Step 4: Install NuGet Packages

```bash
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect
dotnet add package Microsoft.Identity.Web
```

#### Step 5: Configure Services in Program.cs

```csharp
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add authentication
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAuthenticatedUser", policy =>
    {
        policy.RequireAuthenticatedUser();
    });
});

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

#### Step 6: Add Configuration to appsettings.json

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "yourdomain.onmicrosoft.com",
    "TenantId": "your-tenant-id",
    "ClientId": "your-client-id",
    "ClientSecret": "your-client-secret",
    "CallbackPath": "/signin-oidc",
    "SignedOutCallbackPath": "/signout-callback-oidc"
  }
}
```

#### Step 7: Configure Studio for Azure AD

In your Elsa Studio `Program.cs`:

```csharp
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureBackend(backend =>
    {
        backend.Url = new Uri("https://your-elsa-server.com");
        backend.UseAuthentication(() => new OpenIdConnectAuthenticationOptions
        {
            Authority = "https://login.microsoftonline.com/your-tenant-id",
            ClientId = "your-studio-client-id",
            RedirectUri = "https://your-studio.com/authentication/login-callback",
            PostLogoutRedirectUri = "https://your-studio.com/",
            ResponseType = "code",
            Scope = ["openid", "profile", "email"]
        });
    });
});
```

### Auth0 Integration

Auth0 is a flexible identity platform with extensive features for authentication and authorization.

#### Step 1: Create Auth0 Application

1. Log in to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** > **Applications**
3. Click **Create Application**
4. Configure:
   - **Name**: Elsa Workflows Server
   - **Type**: Regular Web Application
5. Click **Create**

#### Step 2: Configure Application Settings

1. Go to **Settings** tab
2. Note the **Domain**, **Client ID**, and **Client Secret**
3. Configure **Allowed Callback URLs**:
   ```
   https://your-elsa-server.com/signin-oidc,
   https://your-studio.com/authentication/login-callback
   ```
4. Configure **Allowed Logout URLs**:
   ```
   https://your-elsa-server.com/signout-callback-oidc,
   https://your-studio.com/
   ```
5. Configure **Allowed Web Origins** (for CORS):
   ```
   https://your-studio.com
   ```
6. Click **Save Changes**

#### Step 3: Create API in Auth0 (Optional)

For API-based authentication:

1. Navigate to **Applications** > **APIs**
2. Click **Create API**
3. Configure:
   - **Name**: Elsa Workflows API
   - **Identifier**: `https://your-elsa-api.com`
   - **Signing Algorithm**: RS256
4. Click **Create**

#### Step 4: Install NuGet Packages

```bash
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

#### Step 5: Configure Services in Program.cs

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = $"https://{builder.Configuration["Auth0:Domain"]}/",
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Auth0:Audience"],
        ValidateLifetime = true
    };
});

builder.Services.AddAuthorization();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

#### Step 6: Add Configuration to appsettings.json

```json
{
  "Auth0": {
    "Domain": "your-tenant.auth0.com",
    "ClientId": "your-client-id",
    "ClientSecret": "your-client-secret",
    "Audience": "https://your-elsa-api.com"
  }
}
```

#### Step 7: Obtaining and Using Tokens

To authenticate API calls with Auth0:

1. Obtain an access token using OAuth 2.0 Client Credentials flow:

```bash
curl --request POST \
  --url https://your-tenant.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{
    "client_id":"your-client-id",
    "client_secret":"your-client-secret",
    "audience":"https://your-elsa-api.com",
    "grant_type":"client_credentials"
  }'
```

2. Use the access token in API requests:

```bash
curl --request GET \
  --url https://your-elsa-server.com/elsa/api/workflow-definitions \
  --header 'authorization: Bearer your-access-token'
```

### Generic OIDC Provider

You can integrate with any OIDC-compliant provider (Keycloak, IdentityServer, Okta, etc.).

#### Step 1: Install NuGet Packages

```bash
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect
```

#### Step 2: Configure Services in Program.cs

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    options.Authority = builder.Configuration["Oidc:Authority"];
    options.ClientId = builder.Configuration["Oidc:ClientId"];
    options.ClientSecret = builder.Configuration["Oidc:ClientSecret"];
    options.ResponseType = "code";
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    
    // Scopes
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    
    // Map claims
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

builder.Services.AddAuthorization();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

#### Step 3: Add Configuration to appsettings.json

```json
{
  "Oidc": {
    "Authority": "https://your-identity-server.com",
    "ClientId": "elsa-workflows",
    "ClientSecret": "your-client-secret",
    "CallbackPath": "/signin-oidc"
  }
}
```

#### Example: Keycloak Configuration

For Keycloak specifically:

```json
{
  "Oidc": {
    "Authority": "https://keycloak.example.com/realms/your-realm",
    "ClientId": "elsa-workflows-client",
    "ClientSecret": "your-client-secret",
    "CallbackPath": "/signin-oidc",
    "MetadataAddress": "https://keycloak.example.com/realms/your-realm/.well-known/openid-configuration"
  }
}
```

## API Key Authentication

API key authentication is useful for machine-to-machine communication and automated workflows.

### Implementation Approach

Elsa doesn't provide built-in API key authentication, but you can implement it using ASP.NET Core authentication handlers.

#### Step 1: Create API Key Model

Create a model to represent API keys:

```csharp
public class ApiKey
{
    public string Key { get; set; }
    public string Owner { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Expires { get; set; }
    public List<string> Roles { get; set; } = new();
    public bool IsActive { get; set; } = true;
}
```

#### Step 2: Create API Key Store

Implement a store to manage API keys:

```csharp
public interface IApiKeyStore
{
    Task<ApiKey?> GetApiKeyAsync(string key);
    Task<ApiKey> CreateApiKeyAsync(string owner, List<string> roles, DateTime? expires = null);
    Task RevokeApiKeyAsync(string key);
}

public class InMemoryApiKeyStore : IApiKeyStore
{
    private readonly Dictionary<string, ApiKey> _apiKeys = new();
    
    public Task<ApiKey?> GetApiKeyAsync(string key)
    {
        _apiKeys.TryGetValue(key, out var apiKey);
        return Task.FromResult(apiKey);
    }
    
    public Task<ApiKey> CreateApiKeyAsync(string owner, List<string> roles, DateTime? expires = null)
    {
        var apiKey = new ApiKey
        {
            Key = GenerateApiKey(),
            Owner = owner,
            Created = DateTime.UtcNow,
            Expires = expires,
            Roles = roles,
            IsActive = true
        };
        
        _apiKeys[apiKey.Key] = apiKey;
        return Task.FromResult(apiKey);
    }
    
    public Task RevokeApiKeyAsync(string key)
    {
        if (_apiKeys.TryGetValue(key, out var apiKey))
        {
            apiKey.IsActive = false;
        }
        return Task.CompletedTask;
    }
    
    private static string GenerateApiKey()
    {
        var bytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }
}
```

#### Step 3: Create Authentication Handler

Implement a custom authentication handler:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

public class ApiKeyAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private const string ApiKeyHeaderName = "X-API-Key";
    private readonly IApiKeyStore _apiKeyStore;
    
    public ApiKeyAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        IApiKeyStore apiKeyStore)
        : base(options, logger, encoder)
    {
        _apiKeyStore = apiKeyStore;
    }
    
    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue(ApiKeyHeaderName, out var apiKeyHeaderValues))
        {
            return AuthenticateResult.NoResult();
        }
        
        var providedApiKey = apiKeyHeaderValues.FirstOrDefault();
        if (string.IsNullOrWhiteSpace(providedApiKey))
        {
            return AuthenticateResult.NoResult();
        }
        
        var apiKey = await _apiKeyStore.GetApiKeyAsync(providedApiKey);
        
        if (apiKey == null)
        {
            return AuthenticateResult.Fail("Invalid API Key");
        }
        
        if (!apiKey.IsActive)
        {
            return AuthenticateResult.Fail("API Key is not active");
        }
        
        if (apiKey.Expires.HasValue && apiKey.Expires.Value < DateTime.UtcNow)
        {
            return AuthenticateResult.Fail("API Key has expired");
        }
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, apiKey.Owner),
            new Claim("ApiKey", providedApiKey)
        };
        
        claims.AddRange(apiKey.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
        
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);
        
        return AuthenticateResult.Success(ticket);
    }
}
```

#### Step 4: Register Services

In `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register API Key Store
builder.Services.AddSingleton<IApiKeyStore, InMemoryApiKeyStore>();

// Configure authentication
builder.Services.AddAuthentication("ApiKey")
    .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", null);

builder.Services.AddAuthorization();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

#### Step 5: Create API Management Endpoints

Create endpoints to manage API keys:

```csharp
app.MapPost("/api/api-keys", async (IApiKeyStore store, CreateApiKeyRequest request) =>
{
    var apiKey = await store.CreateApiKeyAsync(
        request.Owner,
        request.Roles,
        request.ExpiresInDays.HasValue 
            ? DateTime.UtcNow.AddDays(request.ExpiresInDays.Value) 
            : null);
    
    return Results.Ok(new { apiKey = apiKey.Key, created = apiKey.Created, expires = apiKey.Expires });
})
.RequireAuthorization();

app.MapDelete("/api/api-keys/{key}", async (IApiKeyStore store, string key) =>
{
    await store.RevokeApiKeyAsync(key);
    return Results.Ok();
})
.RequireAuthorization();

record CreateApiKeyRequest(string Owner, List<string> Roles, int? ExpiresInDays);
```

#### Step 6: Using API Keys

Once you have an API key, include it in the request header:

```bash
curl -X GET https://your-elsa-server.com/elsa/api/workflow-definitions \
  -H "X-API-Key: your-api-key-here"
```

Or in C#:

```csharp
using var client = new HttpClient();
client.DefaultRequestHeaders.Add("X-API-Key", "your-api-key-here");

var response = await client.GetAsync("https://your-elsa-server.com/elsa/api/workflow-definitions");
```

### Persistent API Key Storage

For production use, store API keys in a database:

```csharp
public class DbApiKeyStore : IApiKeyStore
{
    private readonly IDbContextFactory<ElsaDbContext> _dbContextFactory;
    
    public DbApiKeyStore(IDbContextFactory<ElsaDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }
    
    public async Task<ApiKey?> GetApiKeyAsync(string key)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        return await dbContext.ApiKeys
            .FirstOrDefaultAsync(x => x.Key == key);
    }
    
    public async Task<ApiKey> CreateApiKeyAsync(string owner, List<string> roles, DateTime? expires = null)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        
        var apiKey = new ApiKey
        {
            Key = GenerateApiKey(),
            Owner = owner,
            Created = DateTime.UtcNow,
            Expires = expires,
            Roles = roles,
            IsActive = true
        };
        
        dbContext.ApiKeys.Add(apiKey);
        await dbContext.SaveChangesAsync();
        
        return apiKey;
    }
    
    public async Task RevokeApiKeyAsync(string key)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        
        var apiKey = await dbContext.ApiKeys.FirstOrDefaultAsync(x => x.Key == key);
        if (apiKey != null)
        {
            apiKey.IsActive = false;
            await dbContext.SaveChangesAsync();
        }
    }
    
    private static string GenerateApiKey()
    {
        var bytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }
}
```

## Custom Authentication Provider

You can implement completely custom authentication logic by creating a custom authentication handler.

### Example: Header-Based Authentication

This example shows a custom authentication provider that validates users based on a custom header.

#### Step 1: Create Custom Authentication Handler

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

public class CustomHeaderAuthenticationOptions : AuthenticationSchemeOptions
{
    public string HeaderName { get; set; } = "X-Custom-Auth";
    public string Realm { get; set; } = "Elsa";
}

public class CustomHeaderAuthenticationHandler : AuthenticationHandler<CustomHeaderAuthenticationOptions>
{
    private readonly IUserService _userService;
    
    public CustomHeaderAuthenticationHandler(
        IOptionsMonitor<CustomHeaderAuthenticationOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        IUserService userService)
        : base(options, logger, encoder)
    {
        _userService = userService;
    }
    
    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey(Options.HeaderName))
        {
            return AuthenticateResult.NoResult();
        }
        
        var headerValue = Request.Headers[Options.HeaderName].ToString();
        
        // Validate the header value and get user information
        var user = await _userService.ValidateAndGetUserAsync(headerValue);
        
        if (user == null)
        {
            return AuthenticateResult.Fail("Invalid authentication header");
        }
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email)
        };
        
        claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
        
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);
        
        return AuthenticateResult.Success(ticket);
    }
    
    protected override Task HandleChallengeAsync(AuthenticationProperties properties)
    {
        Response.Headers["WWW-Authenticate"] = $"{Options.HeaderName} realm=\"{Options.Realm}\"";
        Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    }
}
```

#### Step 2: Create User Service Interface

```csharp
public interface IUserService
{
    Task<User?> ValidateAndGetUserAsync(string authHeader);
}

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public List<string> Roles { get; set; } = new();
}

// Example implementation
public class CustomUserService : IUserService
{
    private readonly ILogger<CustomUserService> _logger;
    private readonly HttpClient _httpClient;
    
    public CustomUserService(ILogger<CustomUserService> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }
    
    public async Task<User?> ValidateAndGetUserAsync(string authHeader)
    {
        try
        {
            // Example: Call external authentication service
            var response = await _httpClient.GetAsync($"https://auth-service.com/validate?token={authHeader}");
            
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            
            var user = await response.Content.ReadFromJsonAsync<User>();
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating user");
            return null;
        }
    }
}
```

#### Step 3: Register Custom Authentication

In `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register user service
builder.Services.AddHttpClient<IUserService, CustomUserService>();

// Register custom authentication
builder.Services.AddAuthentication("CustomHeader")
    .AddScheme<CustomHeaderAuthenticationOptions, CustomHeaderAuthenticationHandler>(
        "CustomHeader",
        options =>
        {
            options.HeaderName = "X-Custom-Auth";
            options.Realm = "Elsa Workflows";
        });

builder.Services.AddAuthorization();

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
app.Run();
```

#### Step 4: Using Custom Authentication

```bash
curl -X GET https://your-elsa-server.com/elsa/api/workflow-definitions \
  -H "X-Custom-Auth: your-custom-token"
```

### Multiple Authentication Schemes

You can support multiple authentication schemes simultaneously:

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://your-identity-provider.com";
        options.Audience = "elsa-api";
    })
    .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", null);

builder.Services.AddAuthorization(options =>
{
    var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
        JwtBearerDefaults.AuthenticationScheme,
        "ApiKey");
    defaultAuthorizationPolicyBuilder = defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
    options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
});
```

This configuration accepts either JWT Bearer tokens or API keys.

## Studio Authentication Configuration

Elsa Studio needs to be configured to authenticate with the Elsa Server API.

### Studio with JWT Bearer Tokens

When using JWT-based authentication (OIDC, Elsa.Identity):

```csharp
using Elsa.Studio.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureBackend(backend =>
    {
        backend.Url = new Uri(builder.Configuration["Backend:Url"]!);
        
        // Configure JWT authentication
        backend.UseAuthentication(() => new JwtBearerAuthenticationOptions
        {
            TokenEndpoint = new Uri("https://your-elsa-server.com/identity/login"),
            Username = "admin@localhost",
            Password = "Admin123!"
        });
    });
});

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```

### Studio with OIDC

When using OpenID Connect:

```csharp
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureBackend(backend =>
    {
        backend.Url = new Uri(builder.Configuration["Backend:Url"]!);
        
        backend.UseAuthentication(() => new OpenIdConnectAuthenticationOptions
        {
            Authority = "https://your-identity-provider.com",
            ClientId = "elsa-studio-client",
            RedirectUri = "https://your-studio.com/authentication/login-callback",
            PostLogoutRedirectUri = "https://your-studio.com/",
            ResponseType = "code",
            Scope = ["openid", "profile", "email"]
        });
    });
});
```

### Studio with API Keys

When using API key authentication:

```csharp
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureBackend(backend =>
    {
        backend.Url = new Uri(builder.Configuration["Backend:Url"]!);
        
        // Configure API key
        backend.UseAuthentication(() => new ApiKeyAuthenticationOptions
        {
            HeaderName = "X-API-Key",
            ApiKey = builder.Configuration["ApiKey"]
        });
    });
});
```

Add to `appsettings.json`:

```json
{
  "Backend": {
    "Url": "https://your-elsa-server.com"
  },
  "ApiKey": "your-api-key-here"
}
```

### Studio WASM Configuration

For Elsa Studio WASM (WebAssembly), configure in the `Program.cs` of the WASM project:

```csharp
using Elsa.Studio.Extensions;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureBackend(backend =>
    {
        backend.Url = new Uri(builder.Configuration["Backend:Url"]!);
        
        backend.UseAuthentication(() => new OpenIdConnectAuthenticationOptions
        {
            Authority = builder.Configuration["Oidc:Authority"],
            ClientId = builder.Configuration["Oidc:ClientId"],
            RedirectUri = builder.Configuration["Oidc:RedirectUri"],
            PostLogoutRedirectUri = builder.Configuration["Oidc:PostLogoutRedirectUri"],
            ResponseType = "code",
            Scope = ["openid", "profile", "email"]
        });
    });
});

await builder.Build().RunAsync();
```

With `wwwroot/appsettings.json`:

```json
{
  "Backend": {
    "Url": "https://your-elsa-server.com"
  },
  "Oidc": {
    "Authority": "https://your-identity-provider.com",
    "ClientId": "elsa-studio-wasm",
    "RedirectUri": "https://your-studio.com/authentication/login-callback",
    "PostLogoutRedirectUri": "https://your-studio.com/"
  }
}
```

## Troubleshooting

### 401 Unauthorized Errors

**Symptom**: Requests to the API return `401 Unauthorized`.

**Common Causes**:

1. **Missing or invalid authentication token**
   - Verify the token is included in the `Authorization` header
   - Check token format: `Authorization: Bearer <token>`
   - Ensure the token hasn't expired

2. **Token validation issues**
   - Verify the `Authority` configuration matches your identity provider
   - Check the `Audience` claim in the token matches your API audience
   - Ensure clock skew between servers isn't causing validation failures

3. **Authentication middleware not configured**
   ```csharp
   // Make sure these are present in Program.cs
   app.UseAuthentication();
   app.UseAuthorization();
   ```

4. **Authentication scheme mismatch**
   - Verify the authentication scheme name matches between configuration and handler

**Solutions**:

```csharp
// Enable detailed token validation logging
builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();
                logger.LogError(context.Exception, "Authentication failed");
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();
                logger.LogInformation("Token validated successfully");
                return Task.CompletedTask;
            }
        };
    });
```

### 404 Not Found Errors

**Symptom**: Authentication endpoints return `404 Not Found`.

**Common Causes**:

1. **Incorrect callback URLs**
   - Verify redirect URIs match exactly in both your code and identity provider configuration
   - Check for trailing slashes or protocol mismatches (http vs https)

2. **Missing authentication endpoints**
   - Ensure you've called `app.UseAuthentication()` before `app.UseWorkflowsApi()`

3. **Route configuration issues**
   - Verify the callback path matches your configuration:
   ```csharp
   options.CallbackPath = "/signin-oidc"; // Must match registered redirect URI
   ```

**Solutions**:

```csharp
// Log all incoming requests to debug routing
app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Request: {Method} {Path}", context.Request.Method, context.Request.Path);
    await next();
});
```

### CORS Issues with Studio

**Symptom**: Studio cannot connect to the API due to CORS errors.

**Solution**:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://your-studio.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseWorkflowsApi();
```

### Token Expiration Issues

**Symptom**: Users are logged out frequently or get 401 errors intermittently.

**Solutions**:

1. **Increase token lifetime**:
   ```csharp
   options.TokenOptions = options =>
   {
       options.AccessTokenLifetime = TimeSpan.FromHours(8);
       options.RefreshTokenLifetime = TimeSpan.FromDays(30);
   };
   ```

2. **Implement token refresh**:
   ```csharp
   builder.Services.AddElsaStudio(studio =>
   {
       studio.ConfigureBackend(backend =>
       {
           backend.UseAuthentication(() => new JwtBearerAuthenticationOptions
           {
               TokenEndpoint = new Uri("https://your-server.com/identity/login"),
               RefreshTokenEndpoint = new Uri("https://your-server.com/identity/refresh"),
               Username = "admin@localhost",
               Password = "Admin123!",
               AutoRefreshToken = true
           });
       });
   });
   ```

### HTTPS/SSL Certificate Issues

**Symptom**: Authentication fails with SSL/TLS errors in development.

**Solution** (Development only):

```csharp
// ONLY FOR DEVELOPMENT - DO NOT USE IN PRODUCTION
builder.Services.AddHttpClient()
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = 
            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
    });
```

For production, ensure proper SSL certificates are configured.

### Debugging Authentication Flow

Enable detailed authentication logging:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore.Authentication": "Debug",
      "Microsoft.AspNetCore.Authorization": "Debug"
    }
  }
}
```

## Security Best Practices

### 1. Use HTTPS Everywhere

Always use HTTPS in production to protect authentication tokens in transit:

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.UseHsts();
}
```

### 2. Secure Signing Keys

Store signing keys securely, never in source code:

```csharp
// Bad - Don't do this
options.SigningKey = "hardcoded-secret-key";

// Good - Use configuration or key vault
options.SigningKey = builder.Configuration["Authentication:SigningKey"];
```

Use Azure Key Vault, AWS Secrets Manager, or HashiCorp Vault in production:

```csharp
builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KeyVault:Url"]),
    new DefaultAzureCredential());
```

### 3. Implement Token Expiration

Set appropriate token lifetimes:

```csharp
options.TokenOptions = options =>
{
    options.AccessTokenLifetime = TimeSpan.FromMinutes(15); // Short-lived
    options.RefreshTokenLifetime = TimeSpan.FromDays(7);    // Longer-lived
};
```

### 4. Use Role-Based Access Control

Implement role-based authorization:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    
    options.AddPolicy("WorkflowDesigner", policy => 
        policy.RequireRole("WorkflowDesigner", "Admin"));
    
    options.AddPolicy("WorkflowExecutor", policy => 
        policy.RequireRole("WorkflowExecutor", "Admin"));
});
```

Apply to endpoints:

```csharp
app.MapGet("/admin/users", () => { /* ... */ })
   .RequireAuthorization("AdminOnly");
```

### 5. Implement Rate Limiting

Protect against brute force attacks:

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("auth", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 10;
    });
});

app.UseRateLimiter();

app.MapPost("/identity/login", async (LoginRequest request) => { /* ... */ })
   .RequireRateLimiting("auth");
```

### 6. Validate Redirect URIs

Always validate redirect URIs to prevent open redirect vulnerabilities:

```csharp
options.Events = new OpenIdConnectEvents
{
    OnRedirectToIdentityProvider = context =>
    {
        var allowedRedirects = new[] 
        { 
            "https://your-app.com/callback",
            "https://your-studio.com/callback"
        };
        
        if (!allowedRedirects.Contains(context.ProtocolMessage.RedirectUri))
        {
            context.Response.StatusCode = 400;
            context.HandleResponse();
        }
        
        return Task.CompletedTask;
    }
};
```

### 7. Implement Logging and Monitoring

Log authentication events for security auditing:

```csharp
builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();
                logger.LogWarning(
                    "Authentication failed for {User} from {IP}: {Error}",
                    context.Request.Headers["User"],
                    context.Request.HttpContext.Connection.RemoteIpAddress,
                    context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILogger<Program>>();
                logger.LogInformation(
                    "User {User} authenticated successfully",
                    context.Principal?.Identity?.Name);
                return Task.CompletedTask;
            }
        };
    });
```

### 8. Rotate API Keys Regularly

Implement API key rotation:

```csharp
public async Task<ApiKey> RotateApiKeyAsync(string oldKey)
{
    var oldApiKey = await GetApiKeyAsync(oldKey);
    if (oldApiKey == null)
        throw new InvalidOperationException("API key not found");
    
    // Create new key with same permissions
    var newApiKey = await CreateApiKeyAsync(
        oldApiKey.Owner,
        oldApiKey.Roles,
        DateTime.UtcNow.AddDays(90));
    
    // Mark old key for deactivation after grace period
    oldApiKey.Expires = DateTime.UtcNow.AddDays(7);
    await UpdateApiKeyAsync(oldApiKey);
    
    return newApiKey;
}
```

### 9. Protect Against CSRF

Enable anti-forgery tokens for cookie-based authentication:

```csharp
builder.Services.AddAntiforgery();

app.UseAntiforgery();
```

### 10. Security Headers

Add security headers to responses:

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Add(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
    
    await next();
});
```

## Production Considerations

### 1. Distributed Caching for Tokens

When running multiple instances, use distributed caching:

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:ConnectionString"];
    options.InstanceName = "ElsaAuth_";
});

builder.Services.AddAuthentication()
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.CacheSignatureProviders = false;
    });
```

### 2. Database-Backed User Store

Use a database for user management:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseIdentity(identity =>
    {
        identity.UseEntityFrameworkCore(ef => 
            ef.UseSqlServer(builder.Configuration.GetConnectionString("Identity")));
    });
});
```

### 3. Load Balancer Configuration

Configure sticky sessions or use token-based authentication:

```nginx
upstream elsa_servers {
    ip_hash; # Sticky sessions
    server elsa-server-1:5000;
    server elsa-server-2:5000;
    server elsa-server-3:5000;
}

server {
    listen 443 ssl;
    server_name elsa.example.com;
    
    location / {
        proxy_pass http://elsa_servers;
        proxy_set_header Authorization $http_authorization;
        proxy_pass_header Authorization;
    }
}
```

### 4. Health Checks with Authentication

Exclude health check endpoints from authentication:

```csharp
builder.Services.AddHealthChecks();

app.MapHealthChecks("/health").AllowAnonymous();
```

### 5. Environment-Specific Configuration

Use different configurations for different environments:

```csharp
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables()
    .AddUserSecrets<Program>(optional: true);
```

### 6. Monitoring and Alerting

Monitor authentication metrics:

```csharp
builder.Services.AddSingleton<IAuthenticationMetrics, AuthenticationMetrics>();

public class AuthenticationMetrics : IAuthenticationMetrics
{
    private readonly Counter<int> _successfulLogins;
    private readonly Counter<int> _failedLogins;
    
    public AuthenticationMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("Elsa.Authentication");
        _successfulLogins = meter.CreateCounter<int>("auth.login.success");
        _failedLogins = meter.CreateCounter<int>("auth.login.failed");
    }
    
    public void RecordSuccessfulLogin() => _successfulLogins.Add(1);
    public void RecordFailedLogin() => _failedLogins.Add(1);
}
```

### 7. Backup Authentication Method

Always have a backup authentication method:

```csharp
// Primary OIDC + fallback API key
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options => { /* OIDC config */ })
    .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", null);
```

### 8. Regular Security Audits

Schedule regular security reviews:
- Review access logs monthly
- Audit active API keys quarterly
- Test authentication flows after each deployment
- Scan for vulnerabilities with tools like OWASP ZAP
- Keep dependencies updated

### 9. Disaster Recovery

Document recovery procedures:
- Key rotation procedures
- User account recovery process
- Emergency access procedures
- Backup identity provider configuration

### 10. Documentation

Maintain documentation for:
- Authentication architecture diagrams
- Configuration management procedures
- Troubleshooting guides
- Security incident response plans
- Runbooks for common operations

## Summary

This guide covered comprehensive authentication and authorization strategies for Elsa Workflows:

- **No Authentication**: Development/testing only
- **Elsa.Identity**: Built-in user management system
- **OIDC Providers**: Azure AD, Auth0, and generic OIDC integration
- **API Keys**: Machine-to-machine authentication
- **Custom Providers**: Implementing custom authentication logic
- **Studio Configuration**: Connecting Studio to authenticated APIs
- **Troubleshooting**: Common issues and solutions
- **Security**: Best practices for production deployments

Choose the authentication strategy that best fits your requirements, considering factors like:
- Organization's existing identity infrastructure
- Compliance and regulatory requirements
- User experience needs
- Operational complexity
- Scalability requirements

For additional help, refer to:
- [Elsa Studio Configuration](../application-types/elsa-studio.md)
- [Elsa Server Configuration](../application-types/elsa-server.md)
- [Database Configuration](../getting-started/database-configuration.md)
- [Distributed Hosting](../hosting/distributed-hosting.md)

If you encounter issues not covered in this guide, please open an issue on the [Elsa Workflows GitHub repository](https://github.com/elsa-workflows/elsa-core).
