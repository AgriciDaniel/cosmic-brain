---
type: concept
title: "Elsa Authentication"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - authentication
  - security
  - oidc
  - identity
status: developing
address: c-000059
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Multitenancy]]"
  - "[[Elsa Architecture]]"
---

# Elsa Authentication

[[entities/Elsa Workflows]] provides multiple authentication modes for securing the HTTP API and the Studio interface. Choose the appropriate mode based on deployment requirements.

---

## Authentication Modes

### No Authentication

Disable all security for development or fully internal deployments:

```csharp
// On the API host
Elsa.EndpointSecurityOptions.DisableSecurity();

// On Studio
builder.Services.AddShell(x => x.DisableAuthorization = true);
```

> [!warning]
> This allows anonymous access to all endpoints. Use only in trusted environments.

### Elsa.Identity

Use Elsa's built-in identity system with user, role, and permission management. Users are stored in the configured database with hashed passwords and API key authentication.

Key features:
- User registration and role assignment
- API key authentication for programmatic access
- JWT bearer token support
- Role-based permission control

Configure in `appsettings.json`:

```json
{
  "Identity": {
    "Tokens": {
      "SigningKey": "sufficiently-large-secret-signing-key",
      "AccessTokenLifetime": "1:00:00:00",
      "RefreshTokenLifetime": "7:00:00:00"
    },
    "Roles": [
      { "Id": "admin", "Name": "Administrator", "Permissions": ["*"] }
    ],
    "Users": [
      { "Id": "...", "Name": "admin", "HashedPassword": "...", "Roles": ["admin"] }
    ],
    "Applications": [
      { "Id": "...", "Name": "Postman", "ClientId": "...", "Roles": ["admin"] }
    ]
  }
}
```

### OpenID Connect (OIDC)

Integrate with external identity providers (Azure AD, Auth0, IdentityServer).

Steps:
1. Register the application with the OIDC provider
2. Obtain client ID and client secret
3. Configure the API with OIDC provider details (authority, scopes, redirect URIs)
4. Ensure redirect URIs are correctly set up

---

## Per-Tenant Authentication

When [[Elsa Multitenancy]] is enabled, identity entities (users, roles, applications) can be scoped to a specific tenant via the `TenantId` property. This provides per-tenant authentication and authorization isolation.

---

## Related

- [[Elsa Multitenancy]] — tenant-scoped identity and authorization
- [[Elsa Architecture]] — security layer overview
