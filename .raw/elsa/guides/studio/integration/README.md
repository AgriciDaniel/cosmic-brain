---
description: >-
  Comprehensive guide to integrating Elsa Studio into different host frameworks including React, Angular, Blazor, and MVC/Razor Pages. Covers hosting patterns, configuration, and authentication.
---

# Studio Designer Integration by Host Framework

Elsa Studio is a flexible, framework-agnostic web application that can be integrated into various host frameworks. This guide covers integration patterns for React, Angular, Blazor, and ASP.NET Core MVC/Razor Pages, along with common configuration considerations.

## Overview

Elsa Studio provides a visual workflow designer that connects to Elsa Server (the backend API). Depending on your application architecture and technology stack, you can integrate Studio in several ways:

- **Separate Application**: Studio runs as a standalone app (recommended for most scenarios)
- **Embedded in Host**: Studio is embedded within your application's UI
- **Iframe Integration**: Studio is loaded in an iframe with cross-origin communication
- **Same Process**: Studio and Server run in the same ASP.NET Core process

## Common Integration Approaches

Before diving into framework-specific details, let's understand the common patterns:

### 1. Separate App with Reverse Proxy

Studio and your application run as separate services, with a reverse proxy routing requests:

```
┌──────────────────────────────────────────┐
│          Reverse Proxy (nginx)           │
│                                          │
│  /studio/* ──> Elsa Studio (Port 5001)  │
│  /api/*    ──> Elsa Server (Port 5000)  │
│  /*        ──> Your App (Port 3000)     │
└──────────────────────────────────────────┘
```

**Advantages:**
- Clean separation of concerns
- Independent deployment and scaling
- No framework coupling
- Easy to update Studio independently

**Disadvantages:**
- Requires reverse proxy configuration
- CORS considerations for API calls
- Shared authentication must be configured

### 2. Iframe Embedding

Studio is loaded in an iframe within your application:

```
┌───────────────────────────────────────────┐
│         Your Application                  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │  <iframe src="https://studio">     │  │
│  │      Elsa Studio                    │  │
│  │  </iframe>                          │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

**Advantages:**
- Simple integration
- Studio updates don't affect your app
- Clear security boundary

**Disadvantages:**
- Iframe restrictions (sizing, navigation)
- PostMessage required for communication
- CORS and authentication complexity

### 3. Direct Embedding (Blazor/MVC)

Studio is embedded directly into an ASP.NET Core application:

```
┌────────────────────────────────────────┐
│      ASP.NET Core Application          │
│                                        │
│  ┌──────────────┐  ┌────────────────┐ │
│  │ Your Pages   │  │ Elsa Studio    │ │
│  │ /dashboard   │  │ /workflows/*   │ │
│  └──────────────┘  └────────────────┘ │
│                                        │
│  ┌─────────────────────────────────┐  │
│  │     Elsa Server (API)           │  │
│  │     /api/workflows/*            │  │
│  └─────────────────────────────────┘  │
└────────────────────────────────────────┘
```

**Advantages:**
- Single deployment unit
- Shared authentication/authorization
- No CORS issues
- Simplified configuration

**Disadvantages:**
- Tighter coupling
- Shared resources (memory, CPU)
- Updates require full app deployment

## Configuration Common to All Patterns

Regardless of integration approach, you'll need to configure:

### Base API URL

Studio needs to know where Elsa Server's API is located:

```json
{
  "Elsa": {
    "Server": {
      "BaseUrl": "https://your-api.example.com"
    }
  }
}
```

Or via environment variable:

```bash
ELSA__SERVER__BASEURL=https://your-api.example.com
```

### Authentication

Studio must authenticate with Elsa Server. Common approaches:

#### API Key (Simplest)
```json
{
  "Elsa": {
    "Server": {
      "BaseUrl": "https://your-api.example.com",
      "ApiKey": "your-api-key-here"
    }
  }
}
```

#### Bearer Token (OAuth2/OIDC)
```json
{
  "Elsa": {
    "Server": {
      "BaseUrl": "https://your-api.example.com",
      "AuthenticationScheme": "Bearer"
    }
  }
}
```

Studio will include the token in API requests:
```
Authorization: Bearer <token>
```

#### Cookie-Based (Same Domain)
When Studio and Server share a domain, cookies can be used:
```json
{
  "Elsa": {
    "Server": {
      "BaseUrl": "https://your-app.example.com/api",
      "AuthenticationScheme": "Cookies"
    }
  }
}
```

### CORS Configuration

If Studio and Server are on different origins, configure CORS on the server:

```csharp
// Program.cs (Elsa Server)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowStudio", policy =>
    {
        policy.WithOrigins("https://studio.example.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();
app.UseCors("AllowStudio");
```

## React Integration

React applications typically integrate Studio as a separate service or via iframe.

### Pattern 1: Separate Service

**Studio Setup (Standalone Blazor):**
```bash
# Run Studio on port 5001
docker run -d -p 5001:8080 \
  -e ELSA__SERVER__BASEURL=https://api.example.com \
  elsaworkflows/elsa-studio:latest
```

**React App:**
```tsx
// WorkflowsPage.tsx
import React from 'react';

export const WorkflowsPage: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>Workflow Designer</h1>
      <iframe
        src="https://studio.example.com"
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none'
        }}
        title="Elsa Studio"
      />
    </div>
  );
};
```

**Navigation Integration:**
```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { WorkflowsPage } from './pages/WorkflowsPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/workflows">Workflows</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflows" element={<WorkflowsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Pattern 2: Reverse Proxy

**Vite Config (Development):**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/workflows': {
        target: 'http://localhost:5001',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

**Nginx (Production):**
```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://react-app:3000;
    }

    location /workflows {
        proxy_pass http://elsa-studio:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://elsa-server:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Angular Integration

Angular follows similar patterns to React.

### Pattern 1: Iframe Integration

**Component:**
```typescript
// workflows.component.ts
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-workflows',
  template: `
    <div class="workflows-container">
      <h1>Workflow Designer</h1>
      <iframe
        [src]="studioUrl"
        class="studio-frame"
        title="Elsa Studio">
      </iframe>
    </div>
  `,
  styles: [`
    .workflows-container { height: 100vh; display: flex; flex-direction: column; }
    .studio-frame { flex: 1; border: none; width: 100%; }
  `]
})
export class WorkflowsComponent {
  studioUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.studioUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://studio.example.com'
    );
  }
}
```

**Routing:**
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowsComponent } from './workflows/workflows.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'workflows', component: WorkflowsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Pattern 2: Proxy Configuration

**angular.json (Development):**
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "serve": {
          "options": {
            "proxyConfig": "proxy.conf.json"
          }
        }
      }
    }
  }
}
```

**proxy.conf.json:**
```json
{
  "/workflows": {
    "target": "http://localhost:5001",
    "secure": false,
    "changeOrigin": true
  },
  "/api": {
    "target": "http://localhost:5000",
    "secure": false,
    "changeOrigin": true
  }
}
```

## Blazor Integration

Blazor offers the tightest integration since both Studio and your app use Blazor.

### Pattern 1: Same Process (Recommended)

Studio runs in the same ASP.NET Core application:

**Program.cs:**
```csharp
using Elsa.Studio;
using Elsa.Studio.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add your application services
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Add Elsa Server
builder.Services.AddElsa(elsa => elsa
    .UseWorkflowRuntime()
    .UseHttp()
    .UseEntityFrameworkCore()
);

// Add Elsa Studio
builder.Services.AddElsaStudio(studio => studio
    .UseBackendUrl(builder.Configuration["Elsa:Server:BaseUrl"] ?? "/api")
);

var app = builder.Build();

// Map Elsa API endpoints
app.MapGroup("/api")
   .MapElsaWorkflowsApi()
   .RequireAuthorization();

// Map Studio UI
app.MapElsaStudio("/workflows");

// Map your application
app.MapRazorPages();
app.MapBlazorHub();

app.Run();
```

**Navigation Integration:**
```razor
<!-- Shared/NavMenu.razor -->
<div class="nav-menu">
    <nav>
        <ul>
            <li>
                <NavLink href="/" Match="NavLinkMatch.All">
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink href="/workflows">
                    Workflows
                </NavLink>
            </li>
        </ul>
    </nav>
</div>
```

### Pattern 2: Embedded Component

Embed Studio as a component in your Blazor page:

```razor
<!-- Pages/Workflows.razor -->
@page "/workflows"
@using Elsa.Studio.Components

<PageTitle>Workflows</PageTitle>

<h1>Workflow Designer</h1>

<div style="height: calc(100vh - 100px);">
    <ElsaStudioRoot />
</div>
```

For detailed Blazor integration, see the [Blazor Dashboard Integration](../../integration/blazor-dashboard.md) guide.

## MVC / Razor Pages Integration

ASP.NET Core MVC and Razor Pages can host Studio in the same process.

### Pattern 1: Separate Routes

**Program.cs:**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// Add Elsa Server
builder.Services.AddElsa(elsa => elsa
    .UseWorkflowRuntime()
    .UseHttp()
);

// Add Elsa Studio (Blazor Server)
builder.Services.AddElsaStudio();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// Map MVC routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Map Elsa Studio (uses Blazor Server)
app.MapElsaStudio("/workflows");

// Map Elsa API
app.MapGroup("/api").MapElsaWorkflowsApi();

app.Run();
```

**View Integration:**
```cshtml
<!-- Views/Shared/_Layout.cshtml -->
<!DOCTYPE html>
<html>
<head>
    <title>@ViewData["Title"]</title>
</head>
<body>
    <nav>
        <ul>
            <li><a asp-controller="Home" asp-action="Index">Home</a></li>
            <li><a href="/workflows">Workflows</a></li>
        </ul>
    </nav>
    
    <main>
        @RenderBody()
    </main>
</body>
</html>
```

### Pattern 2: Iframe in View

```cshtml
<!-- Views/Workflows/Index.cshtml -->
@{
    ViewData["Title"] = "Workflows";
}

<h1>Workflow Designer</h1>

<div style="height: calc(100vh - 100px);">
    <iframe
        src="/workflows"
        style="width: 100%; height: 100%; border: none;"
        title="Elsa Studio">
    </iframe>
</div>
```

## Authentication Integration

### Shared Cookie Authentication

When Studio and your app share a domain:

```csharp
// Program.cs
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.Cookie.Name = "YourApp.Auth";
        options.Cookie.SameSite = SameSiteMode.Lax;
    });

// Both Studio and API use the same authentication
app.UseAuthentication();
app.UseAuthorization();

app.MapElsaStudio("/workflows").RequireAuthorization();
app.MapGroup("/api").MapElsaWorkflowsApi().RequireAuthorization();
```

### JWT Token Authentication

When Studio is separate from the server:

**Server Configuration:**
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://your-identity-server.com";
        options.Audience = "elsa-api";
    });
```

**Studio Configuration:**
```json
{
  "Elsa": {
    "Server": {
      "BaseUrl": "https://api.example.com",
      "AuthenticationScheme": "Bearer"
    }
  }
}
```

**Client-Side Token Passing:**
> ⚠️ **Security Warning:**  
> Do **not** store authentication tokens in `localStorage` or `sessionStorage`, as they are accessible to JavaScript and vulnerable to XSS attacks.  
>
> **Recommended approaches:**  
> - Use HttpOnly, Secure cookies for authentication/session tokens.  
> - For OAuth2/OIDC, use the Authorization Code flow with PKCE and keep tokens only in memory.  
> - If using cookies, ensure CSRF protections are in place.  
>
> For more information, see [OWASP SPA Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SPA_Authentication_Cheat_Sheet.html).
## Production Deployment Patterns

### Docker Compose

```yaml
version: '3.8'
services:
  elsa-server:
    image: your-elsa-server:latest
    environment:
      - ConnectionStrings__Default=...
      - ASPNETCORE_URLS=http://+:5000
    ports:
      - "5000:5000"

  elsa-studio:
    image: elsaworkflows/elsa-studio:latest
    environment:
      - ELSA__SERVER__BASEURL=http://elsa-server:5000
    ports:
      - "5001:8080"

  your-app:
    image: your-app:latest
    ports:
      - "3000:3000"
    depends_on:
      - elsa-server

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
    depends_on:
      - elsa-server
      - elsa-studio
      - your-app
```

### Kubernetes

```yaml
# elsa-studio-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-studio
spec:
  replicas: 2
  selector:
    matchLabels:
      app: elsa-studio
  template:
    metadata:
      labels:
        app: elsa-studio
    spec:
      containers:
      - name: studio
        image: elsaworkflows/elsa-studio:latest
        env:
        - name: ELSA__SERVER__BASEURL
          value: "http://elsa-server-service/api"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: elsa-studio-service
spec:
  selector:
    app: elsa-studio
  ports:
  - port: 80
    targetPort: 8080
```

## Troubleshooting

### CORS Issues

**Symptom:** API requests from Studio fail with CORS errors.

**Solution:**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowStudio", policy =>
    {
        policy.WithOrigins("https://studio.example.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
```

### Authentication Not Working

**Symptom:** Studio shows "Unauthorized" when loading workflows.

**Solution:** Check that:
1. Studio is configured with correct API URL
2. Authentication scheme matches server configuration
3. Tokens/cookies are being sent with requests
4. Server authentication middleware is properly configured

### Iframe Not Loading

**Symptom:** Studio doesn't load in iframe.

**Solution:** Check Content Security Policy:
```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add(
        "Content-Security-Policy",
        "frame-ancestors 'self' https://your-app.example.com");
    await next();
});
```

## Summary

Integrating Elsa Studio into your application depends on your framework and requirements:

- **React/Angular**: Use separate service with reverse proxy or iframe
- **Blazor**: Use same-process integration with `MapElsaStudio()`
- **MVC/Razor Pages**: Use same-process or iframe integration
- **All Frameworks**: Configure base API URL, authentication, and CORS appropriately

For more detailed framework-specific guidance:
- **[Blazor Dashboard Integration](../../integration/blazor-dashboard.md)** - Comprehensive Blazor guide
- **[Custom UI Components](../custom-ui-components.md)** - Extending Studio UI
- **[Authentication & Authorization](../../authentication.md)** - Security configuration

Choose the pattern that best fits your architecture, deployment requirements, and team expertise.
