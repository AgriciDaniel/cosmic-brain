---
type: concept
title: "Elsa Blazor Dashboard"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - blazor
  - dashboard
  - integration
  - dotnet
status: developing
address: c-000060
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Onboarding]]"
  - "[[Elsa Security]]"
  - "[[Elsa Workflow Concepts]]"
---

# Elsa Blazor Dashboard

The Elsa Studio dashboard is a Blazor-based visual workflow designer that communicates with the Elsa Server API. It can be hosted as a standalone application or embedded into an existing ASP.NET Core application. Two hosting patterns exist: Blazor Server and Blazor WASM.

---

## Hosting Patterns

### Pattern 1: Single Process (Simplest)

Both Elsa Server and Elsa Studio run in the same ASP.NET Core process. Authentication is shared -- the user authenticates once and the dashboard directly calls the in-process API.

```
┌──────────────────────────────┐
│   Single ASP.NET Core Host   │
│                              │
│  ┌──────────┐  ┌──────────┐ │
│  │  Studio  │  │  Server  │ │
│  │ (Blazor) │──│  (API)   │ │
│  └──────────┘  └──────────┘ │
└──────────────────────────────┘
```

**Pros:** Simple deployment, no CORS needed, shared auth cookie.  
**Cons:** Cannot scale Studio and Server independently.

### Pattern 2: Separate Services (Production)

Elsa Studio and Elsa Server run as independent processes, communicating over HTTP. This is the recommended pattern for production deployments.

```
┌──────────────┐     HTTP    ┌──────────────┐
│  Studio Host │────────────▶│  Server Host │
│  (Blazor)    │             │  (API)       │
└──────────────┘             └──────────────┘
```

**Pros:** Independent scaling, can use different infrastructure, clean separation of concerns.  
**Cons:** Requires CORS configuration, token forwarding, network setup.

---

## Blazor Server Dashboard Setup

The Blazor Server dashboard runs on the server and uses SignalR for UI updates. Best for intranet applications where latency to the server is low.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://elsa-server.example.com");
    });
});

var app = builder.Build();

app.UseStaticFiles();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
```

### Authentication for Blazor Server

Blazor Server can use cookie-based authentication (since the browser communicates with the Studio server via SignalR, and the Studio server communicates with the Elsa Server API using a service credential):

```csharp
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });

// Forward token from Studio to Elsa Server
studio.ConfigureHttpClient((sp, client) =>
{
    var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
    var accessToken = httpContextAccessor.HttpContext?
        .GetTokenAsync("access_token").GetAwaiter().GetResult();

    if (!string.IsNullOrEmpty(accessToken))
    {
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);
    }
});
```

---

## Blazor WASM Dashboard

Blazor WASM runs entirely in the browser. The dashboard is a static SPA that communicates with the Elsa Server API directly from the client.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configure as static WASM host
builder.Services.AddElsaStudio(studio =>
{
    studio.ConfigureHttpClient(options =>
    {
        options.BaseAddress = new Uri("https://elsa-server.example.com");
    });
});

var app = builder.Build();

app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();
```

### WASM Authentication

Since the browser calls the Elsa Server API directly, use token-based auth (typically OIDC):

```csharp
builder.Services.AddOidcAuthentication(options =>
{
    options.ProviderOptions.Authority = "https://login.microsoftonline.com/{tenant}";
    options.ProviderOptions.ClientId = "{studio-client-id}";
    options.ProviderOptions.ResponseType = "code";
});
```

> [!info] CORS Required for WASM
> When Studio runs as Blazor WASM in the browser, all API calls originate from the browser's origin. The Elsa Server must be configured with a CORS policy that allows the Studio's origin.

---

## CORS Configuration for Separate Services

When Studio and Server are separate, configure CORS on the Server:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("ElsaStudioCors", policy =>
    {
        policy
            .WithOrigins("https://studio.example.com")
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization", "X-Requested-With")
            .AllowCredentials();  // Only if using cookies
    });
});

var app = builder.Build();
app.UseCors("ElsaStudioCors");
```

> [!warning] CORS Security
> Never use `AllowAnyOrigin()` in production. Whitelist only the specific Studio origins. Prefer token-based auth over cookies to simplify CORS (no `AllowCredentials()` needed).

---

## Cookie vs Token Authentication

| Aspect | Cookie Auth | Token Auth (Bearer) |
|--------|-------------|---------------------|
| Storage | Browser cookie | Local storage or memory |
| CORS | Requires `AllowCredentials()` | No special CORS needed |
| CSRF | Must protect against CSRF | No CSRF concern |
| Mobile/CLI | Not suitable | Works everywhere |
| Expiry | Session-based | Configurable TTL |

For Blazor Server (same origin), cookies are natural. For Blazor WASM (cross-origin), tokens are preferred.

---

## Client-Side Activity Registration

By default, the Studio dashboard loads custom activities from the Elsa Server's activity registry. To register custom activities with the client-side designer:

1. Define the activity on the server with `[Activity]` attribute
2. The server exposes activity descriptors via the API
3. The Studio automatically discovers and renders them

No explicit client-side registration is required for server-defined activities.

---

## Related

- [[Elsa Onboarding]] -- Adding Elsa to an existing application
- [[Elsa Security]] -- Auth and CORS configuration
- [[Elsa Workflow Concepts]] -- Understanding workflow definitions
- [[entities/Elsa Workflows]] -- Platform overview
