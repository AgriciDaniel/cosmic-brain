---
description: >-
  Comprehensive guide to securing Elsa Server and workflows end-to-end, covering identity, authentication, tokenized resume URLs, CORS, secrets management, and production hardening.
---

# Security & Authentication Guide

## Executive Summary

This guide provides actionable, Elsa-specific security practices for protecting your workflow runtime, API endpoints, and Studio deployments. It focuses on configurations and patterns unique to Elsa Workflows while deferring deep platform-specific topics (OIDC provider setup, full reverse proxy hardening, WAF configuration) to official vendor documentation.

### Goals and Scope

**What This Guide Covers:**
- Configuring Identity and Authentication in Elsa Server (`UseIdentity`, `UseDefaultAuthentication`)
- Securing tokenized bookmark resume URLs (TTL, revocation, rate limiting)
- CORS, CSRF, and rate limiting for public-facing endpoints
- Secrets management for API keys, database connections, and workflow variables
- Network security and TLS requirements
- Studio deployment security considerations
- Production hardening checklist

**What This Guide Defers to Vendor Documentation:**
- Detailed OIDC provider configuration (Azure AD, Auth0, Keycloak)
- Full reverse proxy hardening (Nginx, Traefik, Envoy)
- Web Application Firewall (WAF) setup
- Infrastructure-as-Code (IaC) security best practices
- Advanced certificate management and PKI

For clustering-specific security (distributed lock credentials, database permissions), see [Clustering Guide](../clustering/README.md) (DOC-015).

---

## Identity & Authentication in Elsa Server

### UseIdentity Configuration

Elsa Server's identity system is configured in `Program.cs` via the `UseIdentity` extension method. This setup supports API keys, JWT tokens, and OIDC integration.

**Reference:** `src/apps/Elsa.Server.Web/Program.cs` in elsa-core

**Basic Identity Setup:**

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Configure Elsa with identity
builder.Services.AddElsa(elsa =>
{
    elsa
        .UseIdentity(identity =>
        {
            // Load identity configuration from appsettings.json
            identity.UseConfigurationBasedIdentityProvider();
            
            // Configure token options
            identity.ConfigureTokenOptions(options =>
            {
                options.AccessTokenLifetime = TimeSpan.FromHours(1);
                options.RefreshTokenLifetime = TimeSpan.FromDays(7);
            });
        })
        .UseDefaultAuthentication() // Enables JWT/API key authentication
        .UseWorkflowManagement()
        .UseWorkflowRuntime()
        .UseWorkflowsApi();
});

var app = builder.Build();

// Enable authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.UseWorkflowsApi();
app.Run();
```

**Key Configuration Points:**
- **`UseIdentity`**: Registers Elsa's built-in identity system
- **`UseConfigurationBasedIdentityProvider`**: Loads identity providers from `appsettings.json`
- **`UseDefaultAuthentication`**: Enables API key and JWT bearer authentication
- **Token Lifetimes**: Configure appropriate TTLs for access and refresh tokens

### Minimal appsettings.json Structure

See [examples/appsettings-identity.json](examples/appsettings-identity.json) for a complete example with placeholders.

```json
{
  "Elsa": {
    "Identity": {
      "Providers": [
        {
          "Type": "ApiKey",
          "Name": "ApiKeyProvider",
          "Options": {
            "ApiKeys": [
              {
                "Key": "${API_KEY_1}",  // Use environment variable
                "Roles": ["Admin"]
              }
            ]
          }
        },
        {
          "Type": "Jwt",
          "Name": "JwtProvider",
          "Options": {
            "Issuer": "https://your-identity-provider.com",
            "Audience": "elsa-workflows",
            "SigningKey": "${JWT_SIGNING_KEY}"  // Never commit this!
          }
        }
      ]
    }
  }
}
```

**Important:**
- **Never commit secrets** to source control
- Use environment variables or secret managers (Azure Key Vault, AWS Secrets Manager, HashiCorp Vault)
- Rotate API keys regularly (every 90 days or per your security policy)

### API Key vs JWT/OIDC

**API Keys:**
- Best for: Machine-to-machine communication, CI/CD pipelines, internal services
- Pros: Simple to implement, no external dependencies
- Cons: No fine-grained scopes, harder to rotate safely

**JWT/OIDC:**
- Best for: User authentication, web applications, mobile apps
- Pros: Industry standard, fine-grained scopes, short-lived tokens, refresh token support
- Cons: Requires OIDC provider setup and maintenance

**Recommendation:** For production systems, prefer JWT/OIDC for user-facing endpoints and reserve API keys for trusted service-to-service communication.

---

## Tokenized Bookmark Resume URLs

### How Bookmark Tokens Work

Elsa generates tokenized URLs for resuming workflows at bookmarks (e.g., HTTP callbacks, webhooks). These URLs are used in scenarios like:
- Sending approval requests via email
- Webhook callbacks from external systems
- Multi-step form submissions with state preservation

**Reference:** `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs` (elsa-core)

The `GenerateBookmarkTriggerUrl` method creates URLs in this format:
```
POST /elsa/api/bookmarks/resume?t=<encrypted_token>
```

The token contains:
- Bookmark ID
- Workflow instance ID
- Expiration timestamp
- Optional payload data

### Security Best Practices for Resume Tokens

See [examples/resume-endpoint-notes.md](examples/resume-endpoint-notes.md) for detailed guidance.

**Critical Security Controls:**

1. **Time-to-Live (TTL):**
   - Bookmark tokens generated by `GenerateBookmarkTriggerUrl` are encrypted and contain bookmark metadata
   - Token lifetime is not configurable separately; implement expiration at the bookmark level
   - Use short-lived bookmarks for webhooks (minutes) and longer-lived for email approvals (hours/days)
   - Consider implementing custom token expiration logic if needed for your security requirements
   - Tokens become invalid when the bookmark is consumed (AutoBurn) or the workflow is cancelled

2. **Single-Use Semantics:**
   - Bookmarks are "burned" (deleted) after successful resume by default
   - Use `AutoBurn = true` in bookmark creation for one-time-use tokens
   - Check for duplicate resume attempts via distributed locking

3. **Revocation Strategy:**
   - Implement a token revocation list for compromised tokens
   - Workflow cancellation automatically invalidates associated bookmarks
   - Manual revocation: delete bookmark from database or cancel workflow

4. **Audit Logging:**
   ```csharp
   // Log resume attempts
   _logger.LogInformation(
       "Bookmark resume attempted. BookmarkId={BookmarkId}, WorkflowInstanceId={InstanceId}, Success={Success}",
       bookmarkId, instanceId, success);
   ```
   - Log all resume attempts (success and failure)
   - Include source IP, timestamp, and workflow context
   - Integrate with SIEM for anomaly detection

5. **Rate Limiting:**
   - Apply rate limits at ingress (Nginx, Traefik) or application middleware
   - Recommended limits:
     - Per IP: 100 requests/minute for resume endpoints
     - Per token: 3 attempts before soft-block (requires investigation)
   - See [examples/ingress-cors-snippet.md](examples/ingress-cors-snippet.md) for configuration

### Example: Resuming a Workflow via Bookmark

**Request:**
```bash
curl -X POST "https://your-elsa-server.com/elsa/api/bookmarks/resume?t=eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"approvalStatus": "approved", "comments": "LGTM"}'
```

**Expected Responses:**
- **200 OK**: Workflow resumed successfully
- **401 Unauthorized**: Token invalid or expired
- **404 Not Found**: Bookmark not found (already consumed or workflow cancelled)
- **429 Too Many Requests**: Rate limit exceeded

**Security Notes:**
- Always use HTTPS for resume URLs to prevent token interception
- Validate payload schema to prevent injection attacks
- Consider IP allowlisting for internal webhooks

---

## CORS, CSRF, and Rate Limiting

### CORS for Resume Endpoints

When exposing resume endpoints to browser-based applications or external systems, configure CORS carefully to prevent unauthorized access.

**Configuration Example:**

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("ElsaCorsPolicy", policy =>
    {
        policy
            .WithOrigins(
                "https://your-app.com",
                "https://approved-partner.com"
            )
            .WithMethods("POST")
            .WithHeaders("Content-Type", "Authorization")
            .AllowCredentials();  // Only if using cookies
    });
});

app.UseCors("ElsaCorsPolicy");
```

**Best Practices:**
- **Never use `AllowAnyOrigin()` in production**
- Whitelist only necessary origins
- Prefer POST over GET for resume operations (prevents token leakage in logs)
- For public webhooks, avoid CORS altogether (server-to-server only)

### CSRF Considerations

**Bookmark Resume Endpoints:**
- Resume endpoints are designed for server-to-server or webhook callbacks
- If resume tokens are embedded in web pages, add CSRF protection:
  ```csharp
  builder.Services.AddAntiforgery(options =>
  {
      options.HeaderName = "X-CSRF-TOKEN";
  });
  ```

**Studio and API:**
- Elsa Studio uses token-based auth (immune to CSRF)
- For cookie-based sessions, enable `SameSite=Strict` or `SameSite=Lax`

### Rate Limiting

**Application-Level:**

```csharp
using AspNetCoreRateLimit;

builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "POST:/elsa/api/bookmarks/resume",
            Period = "1m",
            Limit = 100
        }
    };
});
builder.Services.AddInMemoryRateLimiting();

app.UseIpRateLimiting();
```

**Ingress-Level (Preferred):**

See [examples/ingress-cors-snippet.md](examples/ingress-cors-snippet.md) for Nginx/Traefik examples.

Ingress rate limiting is more scalable and protects against DDoS before traffic reaches the application.

---

## Secrets Management

### Storing Sensitive Configuration

**Do:**
- Store API keys, database connections, and JWT signing keys in:
  - Environment variables
  - Azure Key Vault
  - AWS Secrets Manager
  - HashiCorp Vault
- Encrypt secrets at rest in configuration stores
- Rotate credentials regularly (quarterly minimum)

**Don't:**
- Commit secrets to Git (use `.gitignore` and secret scanning)
- Log sensitive data in plaintext
- Share API keys via email or chat

**Example: Loading Secrets from Environment Variables:**

```csharp
builder.Configuration.AddEnvironmentVariables(prefix: "ELSA_");
```

```bash
# Set environment variables
export ELSA_Identity__Providers__0__Options__ApiKeys__0__Key="your-secure-key-here"
export ELSA_ConnectionStrings__DefaultConnection="Server=db;Database=elsa;..."
```

### Workflow Variable Security

**Sensitive Workflow Data:**
- Mark sensitive workflow variables as "secret" (not logged or displayed)
- Avoid passing PII through workflow variables when possible
- Use encrypted storage for workflow instance data containing secrets

**Logging Best Practices:**
- Scrub PII and secrets from structured logs
- Use safe fields only: WorkflowInstanceId, ActivityType, Status
- Example log configuration:
  ```json
  {
    "Logging": {
      "LogLevel": {
        "Elsa": "Information"
      },
      "SafeFields": ["WorkflowInstanceId", "ActivityType", "Status"],
      "RedactedFields": ["Input", "Output", "Variables"]
    }
  }
  ```

---

## Network & TLS

### TLS Requirements

**Minimum Requirements:**
- **TLS 1.2 or higher** for all HTTP endpoints
- Valid, trusted certificates (not self-signed in production)
- HTTPS redirect enforced:
  ```csharp
  app.UseHttpsRedirection();
  app.UseHsts();
  ```

**Certificate Configuration:**
- Obtain certificates from Let's Encrypt, DigiCert, or your organization's CA
- Configure certificate renewal automation
- Use wildcard certificates for multi-subdomain deployments

### Mutual TLS (mTLS)

For service-to-service communication in zero-trust environments:

```csharp
builder.Services.AddHttpClient<IWorkflowClient>(client =>
{
    client.BaseAddress = new Uri("https://other-service.internal");
})
.ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    ClientCertificates = { LoadClientCertificate() }
});
```

**Use Cases:**
- Internal microservices mesh
- Sensitive data workflows
- Compliance requirements (PCI-DSS, HIPAA)

### Session Affinity (Sticky Sessions)

**Important Note:** Sticky sessions are **not required** for Elsa workflow runtime. Workflows use distributed locking and database persistence, making them resilient to node switching mid-execution.

**When Sticky Sessions May Help:**
- Studio UI interactions only (for caching workflow definitions client-side)
- Not needed for API calls or runtime operations

See [Clustering Guide](../clustering/README.md) (DOC-015) for more on distributed runtime architecture.

---

## Studio Security Notes

### Deploying Studio Behind Ingress

**Ingress Configuration:**

```yaml
# Example Kubernetes Ingress (YAML)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-studio
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - studio.your-domain.com
    secretName: elsa-studio-tls
  rules:
  - host: studio.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: elsa-studio
            port:
              number: 80
```

### SSO/Identity Integration

**Studio Authentication:**
- Configure Studio to use the same OIDC provider as Elsa Server
- Example Studio configuration:
  ```csharp
  builder.Services.AddElsaStudio(studio =>
  {
      studio.UseIdentity(identity =>
      {
          identity.UseOidcProvider(oidc =>
          {
              oidc.Authority = "https://your-idp.com";
              oidc.ClientId = "elsa-studio";
              oidc.ResponseType = "code";
              oidc.Scope = "openid profile elsa_api";
          });
      });
  });
  ```

**Authorization:**
- Implement role-based access control (RBAC) for Studio users
- Restrict workflow editing to authorized roles:
  ```csharp
  [Authorize(Roles = "WorkflowAdmin")]
  public class WorkflowDefinitionsController : ControllerBase { }
  ```

### Session Affinity for Studio

While not required for runtime, Studio benefits from session affinity to:
- Cache workflow definitions in browser memory
- Reduce API round-trips during editing

**Configuration (Optional):**
- Enable sticky sessions at load balancer for Studio endpoints only
- Use cookie-based or IP-hash affinity
- Not needed for `/elsa/api/` endpoints (runtime operations)

---

## Production Hardening Checklist

Use this checklist to verify your Elsa deployment is production-ready from a security perspective.

### Identity & Authentication
- [ ] Identity configured (`UseIdentity` and `UseDefaultAuthentication`)
- [ ] JWT/OIDC preferred over API keys for user-facing endpoints
- [ ] API keys stored in secret manager (Azure Key Vault, AWS Secrets Manager, etc.)
- [ ] Token lifetimes configured appropriately (access: 1h, refresh: 7d)
- [ ] API keys rotated regularly (quarterly or per policy)

### Network Security
- [ ] HTTPS enforced on all endpoints (`UseHttpsRedirection()`)
- [ ] TLS 1.2+ configured with strong ciphers
- [ ] Valid, trusted certificates installed
- [ ] mTLS configured for service-to-service (if applicable)
- [ ] Ingress/reverse proxy properly configured (see vendor docs)

### CORS & CSRF
- [ ] CORS policy locked down (no `AllowAnyOrigin()`)
- [ ] Only whitelisted origins allowed
- [ ] CSRF protection enabled for cookie-based sessions
- [ ] SameSite cookie attribute set to Strict or Lax

### Resume Tokens
- [ ] Bookmark resume token TTL configured (default: 24h)
- [ ] Single-use semantics enforced (`AutoBurn = true`)
- [ ] Audit logging enabled for all resume attempts
- [ ] Rate limiting in place (100 req/min per IP recommended)
- [ ] IP allowlisting configured for internal webhooks (if applicable)

### Secrets Management
- [ ] Database connection strings stored in secret manager
- [ ] No secrets committed to source control (`.gitignore` verified)
- [ ] Environment variables used for runtime secrets
- [ ] Workflow variables marked as secret (not logged)
- [ ] Logs scrubbed of PII and sensitive data

### Observability & Logging
- [ ] Structured logging configured with safe fields only
- [ ] PII redacted from logs (Input, Output, Variables)
- [ ] Trace sampling configured appropriately (see DOC-016)
- [ ] Log retention policy defined (90 days recommended)
- [ ] Security events logged (auth failures, token usage, resume attempts)

### Clustering & Distributed Runtime
- [ ] Distributed locking configured (`UseDistributedRuntime()`)
- [ ] Lock provider credentials secured (Redis/PostgreSQL)
- [ ] Database user permissions follow least-privilege principle
- [ ] Quartz clustering enabled for scheduled tasks (multi-node)
- [ ] All nodes connect to same lock provider and database

### Authorization
- [ ] Role-based access control (RBAC) implemented
- [ ] Studio access restricted to authorized users
- [ ] API endpoints protected with appropriate policies
- [ ] Service accounts use least-privileged roles

### Infrastructure
- [ ] Firewall rules configured (allow only necessary ports)
- [ ] Database network isolated (not publicly accessible)
- [ ] Redis/lock store network isolated
- [ ] Container images scanned for vulnerabilities
- [ ] Dependencies updated regularly (security patches)

---

## Observability & Monitoring

### Security-Relevant Metrics

Monitor these metrics for security anomalies:
- **Authentication Failures:** Spike indicates brute-force attempts
- **Resume Token Errors:** High rate of 401/404 may indicate token enumeration
- **Rate Limit Hits:** Track which IPs/tokens are rate-limited
- **Workflow Cancellations:** Unusual patterns may indicate attacks

### Tracing with Elsa.OpenTelemetry

Enable distributed tracing to track security-relevant events:

**Reference:** `elsa-extensions/src/modules/diagnostics/Elsa.OpenTelemetry/*`

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.UseOpenTelemetry(otel =>
    {
        otel.AddElsaActivitySource();
        otel.AddOtlpExporter(options =>
        {
            options.Endpoint = new Uri("http://jaeger:4317");
        });
    });
});
```

**Security Event Tracing:**
- Authentication attempts (success/failure)
- Resume token validation
- Workflow instance modifications
- Permission checks

For full monitoring setup, see the **Monitoring Guide** (DOC-016 - to be created).

---

## Troubleshooting Security Issues

### Common Issues and Solutions

#### Token Invalid or Expired

**Symptom:** Resume requests return 401 Unauthorized

**Diagnosis:**
1. Check token expiration: decode JWT or bookmark token
2. Verify clock synchronization across nodes (use NTP)
3. Confirm token signing key matches between issue and validation

**Fix:**
- Adjust token TTL if expiring too quickly
- Ensure all nodes use same signing key
- Regenerate token if signing key rotated

#### CORS Blocked

**Symptom:** Browser console shows CORS error, API call fails

**Diagnosis:**
1. Check browser DevTools Network tab for preflight (OPTIONS) request
2. Verify response headers include `Access-Control-Allow-Origin`
3. Confirm origin is in whitelist

**Fix:**
```csharp
// Add origin to CORS policy
policy.WithOrigins("https://new-app.com");
```

#### Rate Limit Exceeded

**Symptom:** Resume requests return 429 Too Many Requests

**Diagnosis:**
1. Check rate limit configuration in ingress or middleware
2. Identify source IP in logs
3. Determine if legitimate spike or attack

**Fix:**
- Whitelist trusted IPs if legitimate traffic
- Adjust rate limits based on actual usage patterns
- Implement token bucket algorithm for burst tolerance

For more troubleshooting guidance, see [Troubleshooting Guide](../troubleshooting/README.md) (DOC-017).

---

## Related Documentation

- [Authentication & Authorization Guide](../authentication.md) - Detailed OIDC and API key setup
- [Clustering Guide](../clustering/README.md) (DOC-015) - Distributed runtime security
- [Troubleshooting Guide](../troubleshooting/README.md) (DOC-017) - Diagnosing security issues
- [Monitoring Guide](#) (DOC-016 - to be created) - Security metrics and alerting
- [Workflow Patterns Guide](../patterns/README.md) (DOC-018) - Secure workflow design

---

## Diagram Placeholders

_Note: Diagrams to be added in future updates. Suggested diagrams:_
- Identity flow: Client → Elsa API → OIDC Provider
- Resume token lifecycle: Generation → Storage → Validation → Expiration
- Network architecture: Ingress → Load Balancer → Elsa Nodes → Database
- Studio SSO flow: Browser → Studio → OIDC Provider → Elsa API

---

**Last Updated:** 2025-11-25  
**Document ID:** DOC-020
