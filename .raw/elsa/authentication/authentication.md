# Authentication

## Configuring Authentication for Elsa HTTP API

### Overview

This section outlines the steps for configuring different authentication modes for the Elsa HTTP API.

## Authentication Modes

### No Authentication

Authentication can be disabled if necessary.

In the application hosting the API, security requirements must be disabled in `Program.cs` using

```
Elsa.EndpointSecurityOptions.DisableSecurity();
```

to permit anonymous requests.

Additionally, when using Elsa.Studio, add the following to `Program.cs`

```
builder.Services.AddShell(x => x.DisableAuthorization = true);
```

### Using Elsa.Identity

Use Elsa's built-in identity system for authentication.

### Using OIDC (OpenID Connect)

* **Description**: Integrate with an OIDC provider for authentication.
*   **Configuration Steps**:

    * Register your application with the OIDC provider.
    * Obtain client ID and secret.
    * Update API configuration with OIDC provider details.
    * Ensure redirect URIs are correctly set up.

    #### Conclusion

    Choose the appropriate authentication mode based on your security requirements and follow the above steps to configure it.
* Install and configure `Elsa.Identity` package.
* Update API configuration to enable `Elsa.Identity` mode.
* Set up user roles and permissions.
* Set authentication mode to `None` in the configuration file.
