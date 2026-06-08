---
description: >-
  Guide to integrating Elsa Server with external identity providers including Microsoft Entra ID, Auth0, Keycloak, and other OpenID Connect / OAuth2 providers.
---

# External Identity Providers

This guide covers integrating Elsa Server with external identity providers (IdP) for authentication and authorization. By integrating with an external IdP, you can leverage existing user directories, enable Single Sign-On (SSO), and centralize identity management across your organization.

## Overview

Elsa Server supports integration with any identity provider that implements standard authentication protocols:

- **OpenID Connect (OIDC)**: Industry-standard authentication layer on top of OAuth 2.0
- **OAuth 2.0**: Authorization framework for delegated access
- **SAML 2.0**: Enterprise SSO protocol (via OIDC bridge or direct integration)

### Supported Identity Providers

- **Microsoft Entra ID (Azure AD)**: Microsoft's cloud identity service
- **Auth0**: Cloud-based authentication and authorization platform
- **Keycloak**: Open-source identity and access management
- **Okta**: Cloud-based identity management
- **Google Identity**: Google Workspace and consumer accounts
- **OpenIddict**: Self-hosted OIDC server for .NET
- **IdentityServer**: .NET identity and access control framework
- **Any OIDC-compliant provider**: Generic integration pattern

## Why Use External Identity Providers?

**Benefits:**
- **Centralized user management**: Single source of truth for user identities
- **Single Sign-On (SSO)**: Users authenticate once across all applications
- **Multi-Factor Authentication (MFA)**: Enhanced security with 2FA/MFA
- **Audit and compliance**: Centralized authentication logs and policies
- **Reduced development**: Leverage existing identity infrastructure
- **Enterprise features**: Conditional access, risk-based authentication, identity governance

**Use Cases:**
- **Enterprise deployments**: Integrate with corporate identity systems (Microsoft Entra ID, Okta)
- **Multi-tenant SaaS**: Per-tenant identity provider configuration
- **B2B integrations**: Allow partner organizations to use their own identity providers
- **Compliance requirements**: Meet security standards requiring MFA and audit trails

## General Integration Pattern

Regardless of the specific provider, the general pattern for integrating Elsa with an external IdP is:

### 1. Register Elsa in the Identity Provider

- Create an application registration in your IdP
- Configure redirect URIs for authentication callbacks
- Obtain client credentials (client ID, client secret)
- Configure token lifetimes and allowed scopes

### 2. Configure ASP.NET Core Authentication

- Install necessary NuGet packages
- Configure authentication middleware in `Program.cs`
- Map external claims to Elsa's authorization model
- Configure token validation parameters

### 3. Configure Elsa to Use ASP.NET Core Authentication

- Enable Elsa's default authentication
- Configure authorization policies
- Map roles and claims to Elsa permissions

### 4. Configure Elsa Studio (if used)

- Configure Studio to use the same IdP
- Set up authentication token forwarding from Studio to Elsa Server
- Configure OIDC client in Studio

## High-Level Architecture

```
┌─────────────────┐
│   End User      │
└────────┬────────┘
         │
         │ 1. Access Studio
         v
┌─────────────────────────────────────────┐
│         Elsa Studio (Blazor)            │
│                                         │
│  2. Redirect to IdP for authentication  │
└────────────┬────────────────────────────┘
             │
             │ 3. Authentication
             v
┌─────────────────────────────────────────┐
│   Identity Provider (Azure AD/Auth0)    │
│                                         │
│  4. Return token (access + ID token)    │
└────────────┬────────────────────────────┘
             │
             │ 5. Authenticated requests
             v
┌─────────────────────────────────────────┐
│         Elsa Server (API)               │
│                                         │
│  6. Validate token, authorize request   │
└─────────────┬───────────────────────────┘
              │
              │ 7. Execute workflow
              v
┌─────────────────────────────────────────┐
│           Database                      │
└─────────────────────────────────────────┘
```

## Provider-Specific Integration Guides

### Microsoft Entra ID (Azure AD)

Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service.

{% hint style="info" %}
**Note:** Azure Active Directory was rebranded as Microsoft Entra ID in 2023. Both names refer to the same service. This guide uses "Microsoft Entra ID" but you may see "Azure AD" in older documentation and code examples.
{% endhint %}

**Key Features:**
- Integration with Microsoft 365 and Azure services
- Conditional Access for advanced security policies
- Support for thousands of pre-integrated SaaS applications
- B2B and B2C capabilities

**Integration Steps:**

1. **Register application in Azure Portal**
   - Navigate to Azure Active Directory → App registrations
   - Create new registration for Elsa Server
   - Configure redirect URIs (e.g., `https://elsa.example.com/signin-oidc`)
   - Generate client secret
   - Note Application (client) ID and Directory (tenant) ID

2. **Configure API permissions**
   - Add required Microsoft Graph permissions (if needed)
   - Common: `User.Read`, `openid`, `profile`, `email`

3. **Configure authentication in Elsa Server**
   - Install package: `Microsoft.AspNetCore.Authentication.OpenIdConnect`
   - Configure OIDC authentication middleware
   - Map Azure AD roles/groups to Elsa authorization policies

4. **Configure Elsa Studio**
   - Configure Studio OIDC client
   - Ensure same tenant and client ID
   - Configure token forwarding to Elsa Server API

**Configuration Example:**

{% hint style="info" %}
**Note:** The following example shows the essential configuration structure. Replace placeholders (`{tenant-id}`, `{client-id}`, `{client-secret}`) with your actual Azure AD values. For production deployments, store secrets in environment variables or a secure key vault.
{% endhint %}

```csharp
// Program.cs
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options =>
    {
        options.Authority = "https://login.microsoftonline.com/{tenant-id}";
        options.ClientId = "{client-id}";
        options.ClientSecret = "{client-secret}";
        options.ResponseType = "code";
        options.SaveTokens = true;
        
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("email");
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://login.microsoftonline.com/{tenant-id}/v2.0",
            ValidateAudience = true,
            ValidAudience = "{client-id}"
        };
    });

builder.Services.AddElsa(elsa =>
{
    elsa
        .UseDefaultAuthentication()
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});
```

**Further Reading:**
- [Microsoft Identity Platform Documentation](https://learn.microsoft.com/en-us/entra/identity-platform/)
- [ASP.NET Core with Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-web-app-aspnet-core-sign-in)

### Auth0

Auth0 is a cloud-based authentication and authorization platform with extensive features and integrations.

**Key Features:**
- Support for social login (Google, Facebook, GitHub, etc.)
- Custom databases and passwordless authentication
- Extensive customization via rules and hooks
- Global CDN for fast authentication
- Built-in MFA support

**Integration Steps:**

1. **Create Auth0 application**
   - Log into Auth0 Dashboard
   - Create new Regular Web Application
   - Configure Allowed Callback URLs
   - Note Domain, Client ID, and Client Secret

2. **Configure allowed callback URLs**
   - Add `https://elsa.example.com/signin-oidc`
   - Add `https://studio.example.com/signin-oidc`

3. **Define API in Auth0**
   - Create API for Elsa Server
   - Define permissions/scopes (e.g., `workflows:read`, `workflows:write`)
   - Configure token lifetime

4. **Configure authentication in Elsa Server**
   - Install package: `Microsoft.AspNetCore.Authentication.OpenIdConnect`
   - Configure OIDC with Auth0 settings
   - Validate access tokens using Auth0 audience

**Configuration Example:**

{% hint style="info" %}
Replace `{your-domain}` with your Auth0 domain (e.g., `mycompany.auth0.com`) and `{api-identifier}` with your API identifier from the Auth0 dashboard.
{% endhint %}

```csharp
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.Authority = "https://{your-domain}.auth0.com/";
        options.Audience = "{api-identifier}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://{your-domain}.auth0.com/",
            ValidateAudience = true,
            ValidAudience = "{api-identifier}",
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("WorkflowAdmin", policy =>
        policy.RequireClaim("permissions", "workflows:admin"));
});
```

**Further Reading:**
- [Auth0 ASP.NET Core Integration](https://auth0.com/docs/quickstart/webapp/aspnet-core)
- [Auth0 APIs Documentation](https://auth0.com/docs/get-started/apis)

### Keycloak

Keycloak is an open-source identity and access management solution that can be self-hosted.

**Key Features:**
- Self-hosted (full control over deployment)
- Support for LDAP/Active Directory integration
- User federation and identity brokering
- Fine-grained authorization services
- Protocol mappers for custom claims

**Integration Steps:**

1. **Create Keycloak realm and client**
   - Log into Keycloak Admin Console
   - Create new realm for Elsa
   - Create confidential client for Elsa Server
   - Configure redirect URIs

2. **Configure client settings**
   - Enable Standard Flow (authorization code flow)
   - Set Access Type to confidential
   - Note Client ID and Client Secret

3. **Define roles and groups**
   - Create roles: `workflow-admin`, `workflow-designer`, `workflow-viewer`
   - Assign roles to users or groups

4. **Configure authentication in Elsa Server**
   - Install package: `Microsoft.AspNetCore.Authentication.OpenIdConnect`
   - Configure OIDC with Keycloak endpoint
   - Map Keycloak roles to ASP.NET Core claims

**Configuration Example:**

{% hint style="info" %}
Replace `{realm-name}`, `{client-id}`, and `{client-secret}` with values from your Keycloak configuration. The authority URL should point to your Keycloak instance and realm.
{% endhint %}

```csharp
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options =>
    {
        options.Authority = "https://keycloak.example.com/realms/{realm-name}";
        options.ClientId = "{client-id}";
        options.ClientSecret = "{client-secret}";
        options.ResponseType = "code";
        options.SaveTokens = true;
        options.GetClaimsFromUserInfoEndpoint = true;
        
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("roles");
        
        options.ClaimActions.MapJsonKey("role", "roles");
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("WorkflowAdmin", policy =>
        policy.RequireRole("workflow-admin"));
});
```

**Further Reading:**
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Securing ASP.NET Core with Keycloak](https://www.keycloak.org/docs/latest/securing_apps/)

### Generic OIDC Provider

For any other OIDC-compliant provider, follow this generic integration pattern.

**Prerequisites:**
- Provider must support OpenID Connect Discovery
- Provider must issue JWT access tokens
- Provider must support authorization code flow

**Configuration Steps:**

1. **Obtain provider metadata**
   - Authority URL (e.g., `https://idp.example.com`)
   - Client ID and Client Secret
   - Supported scopes

2. **Configure authentication**

```csharp
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options =>
    {
        options.Authority = builder.Configuration["OIDC:Authority"];
        options.ClientId = builder.Configuration["OIDC:ClientId"];
        options.ClientSecret = builder.Configuration["OIDC:ClientSecret"];
        options.ResponseType = "code";
        options.SaveTokens = true;
        options.GetClaimsFromUserInfoEndpoint = true;
        
        // Add custom scopes
        foreach (var scope in builder.Configuration.GetSection("OIDC:Scopes").Get<string[]>() ?? Array.Empty<string>())
        {
            options.Scope.Add(scope);
        }
    });
```

## Authorization and Claims Mapping

After authentication, you need to map external claims to Elsa's authorization model.

### Mapping Roles

```csharp
builder.Services.AddAuthorization(options =>
{
    // Map external roles to Elsa policies
    options.AddPolicy("WorkflowAdmin", policy =>
        policy.RequireRole("WorkflowAdmin", "admin", "workflow_admin"));
    
    options.AddPolicy("WorkflowDesigner", policy =>
        policy.RequireRole("WorkflowDesigner", "designer", "workflow_designer"));
    
    options.AddPolicy("WorkflowViewer", policy =>
        policy.RequireRole("WorkflowViewer", "viewer", "workflow_viewer"));
});
```

### Custom Claims

```csharp
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options =>
    {
        // ... other config ...
        
        options.Events = new OpenIdConnectEvents
        {
            OnTokenValidated = context =>
            {
                var claimsIdentity = (ClaimsIdentity)context.Principal.Identity;
                
                // Add custom claims based on external claims
                var permissions = context.Principal.FindAll("permissions");
                foreach (var permission in permissions)
                {
                    claimsIdentity.AddClaim(new Claim("elsa_permission", permission.Value));
                }
                
                return Task.CompletedTask;
            }
        };
    });
```

## Elsa Studio Configuration

When using an external IdP, configure Elsa Studio to authenticate users and forward tokens to Elsa Server.

**Studio Program.cs (Conceptual):**

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Configure authentication (same IdP as Server)
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(options =>
    {
        options.Authority = builder.Configuration["OIDC:Authority"];
        options.ClientId = builder.Configuration["OIDC:ClientId"];
        options.ClientSecret = builder.Configuration["OIDC:ClientSecret"];
        options.ResponseType = "code";
        options.SaveTokens = true;
    });

// Configure Elsa Studio
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://elsa-server.example.com");
    });
    
    // Forward authentication token to Elsa Server
    studio.ConfigureHttpClient((sp, client) =>
    {
        var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
        var accessToken = httpContextAccessor.HttpContext?
            .GetTokenAsync("access_token")
            .GetAwaiter()
            .GetResult();
        
        if (!string.IsNullOrEmpty(accessToken))
        {
            client.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", accessToken);
        }
    });
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapBlazorHub()
    .RequireAuthorization();  // Require authentication for Studio
app.MapFallbackToPage("/_Host");

app.Run();
```

## REST API Integration

When calling Elsa Server APIs from external applications, use bearer token authentication:

```bash
# Obtain access token from IdP
ACCESS_TOKEN="eyJhbGc..."

# Call Elsa API with token
curl https://elsa-server.example.com/elsa/api/workflow-definitions \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

For detailed REST API usage, see:
- [Running Workflows via REST](../running-workflows/README.md)
- [HTTP Workflows Guide](../http-workflows/README.md)

## Security Best Practices

When integrating with external IdPs:

1. **Always use HTTPS**: Never transmit tokens over HTTP
2. **Validate tokens properly**: Check issuer, audience, expiration, and signature
3. **Use short-lived access tokens**: Configure appropriate token lifetimes (1 hour recommended)
4. **Implement refresh token rotation**: Enhance security with refresh token rotation
5. **Store secrets securely**: Use Azure Key Vault, AWS Secrets Manager, or similar
6. **Enable MFA**: Require multi-factor authentication for administrative access
7. **Audit authentication events**: Log all authentication and authorization decisions
8. **Implement RBAC**: Use role-based access control with least-privilege principle

For comprehensive security guidance, see:
- [Security & Authentication Guide](README.md)

## Troubleshooting

### Common Issues

#### Token Validation Fails

**Symptoms:** 401 Unauthorized, "IDX10205: Issuer validation failed"

**Solutions:**
- Verify Authority URL matches IdP issuer
- Check token expiration
- Ensure clock synchronization (NTP)
- Validate audience matches client ID

#### Claims Not Mapped

**Symptoms:** User authenticated but lacks required permissions

**Solutions:**
- Check claim names in token (decode JWT at jwt.io)
- Verify claims mapping in OIDC options
- Ensure roles/permissions are assigned in IdP
- Review authorization policies

#### CORS Errors

**Symptoms:** Studio can't call Elsa Server API

**Solutions:**
- Configure CORS on Elsa Server to allow Studio origin
- Ensure credentials are allowed (`AllowCredentials()`)
- Check preflight (OPTIONS) requests succeed

For more troubleshooting guidance, see:
- [Troubleshooting Guide](../troubleshooting/README.md)
- [Blazor Dashboard Integration](../integration/blazor-dashboard.md)

## Planned Sections (Future Updates)

The following sections will be expanded in future documentation updates:

- **Detailed Azure AD B2C Integration**: Consumer identity scenarios
- **Multi-Tenant IdP Configuration**: Per-tenant identity provider setup
- **Custom Authorization Handlers**: Implementing fine-grained permissions
- **Token Caching and Refresh**: Performance optimization strategies
- **Federated Identity**: Chain multiple identity providers
- **API Key + OIDC Hybrid**: Machine-to-machine with user authentication
- **Identity Provider Failover**: High availability patterns

## Next Steps

- **Configure your IdP**: Follow provider-specific documentation
- **Test authentication flow**: Verify token issuance and validation
- **Implement authorization**: Map roles and claims to Elsa policies
- **Deploy to production**: Follow [Security Guide](README.md) best practices
- **Monitor authentication**: Set up logging and alerting

## Related Documentation

- [Security & Authentication Guide](README.md) - Comprehensive security configuration
- [Disable Auth in Dev](disable-auth.md) - Development-only auth bypass
- [Blazor Dashboard Integration](../integration/blazor-dashboard.md) - Studio authentication
- [Hosting Elsa in an Existing App](../onboarding/hosting-elsa-in-existing-app.md) - Integration patterns
- [Kubernetes Deployment](../deployment/kubernetes.md) - Production deployment

---

**Last Updated:** 2025-12-02  
**Addresses Issues:** #16 (partial)
**Status:** Foundational guide with provider-specific sections to be expanded based on community feedback and real-world integration patterns.
