# Setup

Here are the general steps to enable a multi-tenant setup:

1. Add a reference to the `Elsa.Tenants` package.
2. Install and configure the `TenantsFeature`.
   1. Configure the tenant resolution pipeline
   2. Configure the tenant provider

## Configuration

The following is an example of setting up multitenancy using configuration as the tenants provider and a claims tenant resolver that determines the current tenant from the user's tenant ID claim:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
    elsa.UseTenants(tenants =>
    {
        tenants.ConfigureMultitenancy(options =>
        {
            // Configure the tenant resolution pipeline.
            options.TenantResolverPipelineBuilder.Append<ClaimsTenantResolver>();
        });

        // Install the configuration-based tenant provider.
        tenants.UseConfigurationBasedTenantsProvider(options => configuration.GetSection("Multitenancy").Bind(options));
});
```
{% endcode %}

The _appsettings.json_ file would look like this:

{% code title="appsettings.json" %}
```json
{
  "Multitenancy": {
      "Tenants": [
        {
          "Id": "tenant-1",
          "Name": "Tenant 1"
        },
        {
          "Id": "tenant-2",
          "Name": "Tenant 2"
        }
      ]
    }
}
```
{% endcode %}

When using the default Identity module (`Elsa.Identity`), and the signed in user is linked to a tenant, the ID of that tenant is added as a claim.

The **ClaimsTenantResolver** uses that claim to resolve the current tenant.

The following _appsettings.json_ section demonstrates an example of defining users, applications and roles that are linked to a given tenant:

{% code title="appsettings.json" %}
```json
{
  "Identity": {
    "Tokens": {
      "SigningKey": "sufficiently-large-secret-signing-key",
      "AccessTokenLifetime": "1:00:00:00",
      "RefreshTokenLifetime": "7:00:00:00"
    },
    "Roles": [
      {
        "Id": "admin-1",
        "Name": "Administrator",
        "Permissions": [
          "*"
        ],
        "TenantId": "tenant-1"
      },
      {
        "Id": "admin-2",
        "Name": "Administrator",
        "Permissions": [
          "*"
        ],
        "TenantId": "tenant-2"
      }
    ],
    "Users": [
      {
        "Id": "a2323f46-42db-4e15-af8b-94238717d817",
        "Name": "admin",
        "HashedPassword": "TfKzh9RLix6FPcCNeHLkGrysFu3bYxqzGqduNdi8v1U=",
        "HashedPasswordSalt": "JEy9kBlhHCNsencitRHlGxmErmSgY+FVyMJulCH27Ds=",
        "Roles": [
          "admin-1"
        ],
        "TenantId": "tenant-1"
      },
      {
        "Id": "b0cd0e506e713a9d",
        "Name": "alice",
        "Roles": [
          "admin-2"
        ],
        "HashedPassword": "8B0fFK/f/kk9GkVtzXfRJ2Y6cNyYVvLTfKouWcAcuPg=",
        "HashedPasswordSalt": "xlNWvEng8fRvo0McyJopbRJ2MJ9NIYV/4IY5dOZeiiw=",
        "TenantId": "tenant-2"
      }
    ],
    "Applications": [
      {
        "Id": "d57030226341448daff5a2935aba2d3f",
        "Name": "Postman",
        "Roles": [
          "admin"
        ],
        "ClientId": "HXr0Vzdm9KCZbwsJ",
        "HashedApiKey": "Z5ClHs3mbzx8Pnw3+PxbMq8A/Y+VKMCCDTGYtax8JFM=",
        "HashedApiKeySalt": "kBisa1X8FwBfN2zmyGMFRgIVVBleghhQAJ4WGyTkaD0=",
        "HashedClientSecret": "jEv58d0SVbGQ3nBZM0lkzHghG4Y+lMKW80wipz+9vHk=",
        "HashedClientSecretSalt": "xRKy14Ok1/tU3kLf/8V1fcbLIegy9vcM90Peu2tzohU=",
        "TenantId": "tenant-1"
      }
    ]
  }
}
```
{% endcode %}

{% hint style="warning" %}
Primary keys (Id) must be unique across tenants since there's no constraint with tenant IDs. This might change in a future version.
{% endhint %}

