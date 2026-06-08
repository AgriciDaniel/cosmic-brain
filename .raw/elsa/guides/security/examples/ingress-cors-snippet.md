# Ingress and CORS Configuration Examples

This document provides concise configuration snippets for common ingress controllers and CORS policies. These examples are generic starting points; consult vendor documentation for full hardening and production-ready configurations.

---

## Important Notes

### Sticky Sessions Not Required for Workflow Runtime

**Key Point:** Elsa workflow runtime operations (workflow execution, bookmark resume, activity execution) **do not require sticky sessions** (session affinity). Workflows use distributed locking and database persistence, making them resilient to node switching mid-execution.

**When Sticky Sessions May Help (Optional):**
- Studio UI interactions only (for caching workflow definitions client-side)
- Not needed for `/elsa/api/` endpoints or runtime operations

See [Clustering Guide](../../clustering/README.md) (DOC-015) for more on distributed runtime architecture.

---

## CORS Configuration

### ASP.NET Core CORS Policy

**Recommended for Production:**

```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("ElsaCorsPolicy", policy =>
    {
        policy
            .WithOrigins(
                "https://your-studio.com",
                "https://your-app.com",
                "https://approved-partner.com"
            )
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization", "X-Requested-With")
            .WithExposedHeaders("X-Workflow-Instance-Id", "X-Correlation-Id")
            .SetIsOriginAllowedToAllowWildcardSubdomains()  // If using *.your-domain.com
            .AllowCredentials();  // Only if using cookies; prefer token-based auth
    });
});

var app = builder.Build();
app.UseCors("ElsaCorsPolicy");
```

**Security Best Practices:**
- ❌ **Never use `AllowAnyOrigin()` in production** - exposes endpoints to all domains
- ❌ **Never use `AllowAnyMethod()` or `AllowAnyHeader()`** - reduces security posture
- ✅ **Whitelist specific origins only** - prevents unauthorized cross-origin access
- ✅ **Use HTTPS origins only** - HTTP origins leak tokens
- ✅ **Prefer token-based auth over cookies** - simpler CORS policy (no `AllowCredentials`)

### Public Webhook Endpoints (No CORS)

For server-to-server webhooks (e.g., resume endpoints called by external services):

```csharp
// No CORS needed - server-to-server calls bypass browser CORS checks
// Optionally disable CORS for specific endpoints:
app.MapPost("/elsa/api/bookmarks/resume", async (HttpContext context) =>
{
    // Handle resume without CORS
}).DisableCors();
```

**Rationale:** CORS is a browser security feature. Server-to-server HTTP calls (e.g., from payment gateways, notification services) don't trigger CORS checks.

---

## Nginx Ingress

### Basic Configuration with TLS and Rate Limiting

```nginx
# /etc/nginx/conf.d/elsa.conf

# Rate limiting zone
limit_req_zone $binary_remote_addr zone=resume_limit:10m rate=100r/m;
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=1000r/m;

server {
    listen 80;
    server_name elsa.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name elsa.your-domain.com;

    # TLS Configuration
    ssl_certificate /etc/nginx/ssl/elsa.crt;
    ssl_certificate_key /etc/nginx/ssl/elsa.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Rate limiting for resume endpoints
    location /elsa/api/bookmarks/resume {
        limit_req zone=resume_limit burst=5 nodelay;
        limit_req_status 429;
        
        proxy_pass http://elsa-backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # General API rate limiting
    location /elsa/api/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;
        
        proxy_pass http://elsa-backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Studio (no rate limiting, but requires auth)
    location /studio/ {
        proxy_pass http://elsa-studio;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

upstream elsa-backend {
    # No sticky sessions needed for workflow runtime
    server elsa-node-1:5000;
    server elsa-node-2:5000;
    server elsa-node-3:5000;
}

upstream elsa-studio {
    # Optional: enable sticky sessions for Studio UI only
    ip_hash;  # Simple sticky session based on client IP
    server elsa-studio-1:80;
    server elsa-studio-2:80;
}
```

### IP Allowlisting for Internal Webhooks

```nginx
location /elsa/api/bookmarks/resume {
    # Allow only internal network and trusted services
    allow 10.0.0.0/8;        # Internal network
    allow 192.168.1.100/32;  # Trusted service IP
    allow 203.0.113.50/32;   # External partner IP
    deny all;
    
    limit_req zone=resume_limit burst=5 nodelay;
    proxy_pass http://elsa-backend;
}
```

---

## Traefik Ingress (Kubernetes)

### IngressRoute with Middleware

```yaml
# traefik-ingressroute.yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: elsa-server
  namespace: elsa-system
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`elsa.your-domain.com`) && PathPrefix(`/elsa/api/bookmarks/resume`)
      kind: Rule
      services:
        - name: elsa-server
          port: 5000
      middlewares:
        - name: resume-rate-limit
        - name: resume-ip-whitelist
        
    - match: Host(`elsa.your-domain.com`) && PathPrefix(`/elsa/api`)
      kind: Rule
      services:
        - name: elsa-server
          port: 5000
      middlewares:
        - name: api-rate-limit
        - name: security-headers
        
    - match: Host(`studio.your-domain.com`)
      kind: Rule
      services:
        - name: elsa-studio
          port: 80
          sticky:
            cookie:
              name: elsa_studio_affinity
              secure: true
              httpOnly: true
      middlewares:
        - name: security-headers
  tls:
    secretName: elsa-tls-cert
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: resume-rate-limit
  namespace: elsa-system
spec:
  rateLimit:
    average: 100  # 100 requests per minute
    burst: 5
    period: 1m
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: api-rate-limit
  namespace: elsa-system
spec:
  rateLimit:
    average: 1000
    burst: 20
    period: 1m
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: resume-ip-whitelist
  namespace: elsa-system
spec:
  ipWhiteList:
    sourceRange:
      - 10.0.0.0/8
      - 192.168.1.100/32
      - 203.0.113.50/32
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: security-headers
  namespace: elsa-system
spec:
  headers:
    sslRedirect: true
    stsSeconds: 31536000
    stsIncludeSubdomains: true
    stsPreload: true
    forceSTSHeader: true
    frameDeny: true
    contentTypeNosniff: true
    browserXssFilter: true
    referrerPolicy: "strict-origin-when-cross-origin"
    customResponseHeaders:
      X-Robots-Tag: "noindex, nofollow"
```

### Sticky Session Note (Studio Only)

```yaml
# Enable sticky sessions for Studio UI (optional, not for API)
services:
  - name: elsa-studio
    port: 80
    sticky:
      cookie:
        name: elsa_studio_affinity
        secure: true
        httpOnly: true
        sameSite: lax
```

**Important:** Do **not** enable sticky sessions for `/elsa/api/` endpoints. Workflow runtime is stateless and uses distributed locking.

---

## Kubernetes Ingress (nginx-ingress-controller)

```yaml
# kubernetes-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-server
  namespace: elsa-system
  annotations:
    # TLS
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-protocols: "TLSv1.2 TLSv1.3"
    
    # Security Headers
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains";
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
    
    # Rate Limiting (requires nginx-ingress >= 1.0.0)
    nginx.ingress.kubernetes.io/limit-rps: "1000"
    nginx.ingress.kubernetes.io/limit-burst-multiplier: "2"
    
    # CORS (if needed for browser-based clients)
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://your-app.com,https://your-studio.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE"
    nginx.ingress.kubernetes.io/cors-allow-headers: "Content-Type,Authorization"
    nginx.ingress.kubernetes.io/cors-allow-credentials: "false"
    
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - elsa.your-domain.com
    secretName: elsa-tls-cert
  rules:
  - host: elsa.your-domain.com
    http:
      paths:
      - path: /elsa/api
        pathType: Prefix
        backend:
          service:
            name: elsa-server
            port:
              number: 5000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-studio
  namespace: elsa-system
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-protocols: "TLSv1.2 TLSv1.3"
    
    # Optional sticky session for Studio UI
    nginx.ingress.kubernetes.io/affinity: "cookie"
    nginx.ingress.kubernetes.io/session-cookie-name: "elsa-studio-affinity"
    nginx.ingress.kubernetes.io/session-cookie-expires: "3600"
    nginx.ingress.kubernetes.io/session-cookie-max-age: "3600"
    nginx.ingress.kubernetes.io/session-cookie-secure: "true"
    nginx.ingress.kubernetes.io/session-cookie-httponly: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - studio.your-domain.com
    secretName: elsa-studio-tls-cert
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

---

## AWS Application Load Balancer (ALB)

### ALB Ingress with Rate Limiting via WAF

```yaml
# alb-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-server
  namespace: elsa-system
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:region:account:certificate/xxx
    alb.ingress.kubernetes.io/ssl-policy: ELBSecurityPolicy-TLS-1-2-2017-01
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
    alb.ingress.kubernetes.io/actions.ssl-redirect: '{"Type": "redirect", "RedirectConfig": {"Protocol": "HTTPS", "Port": "443", "StatusCode": "HTTP_301"}}'
    
    # WAF for rate limiting and security rules
    alb.ingress.kubernetes.io/wafv2-acl-arn: arn:aws:wafv2:region:account:regional/webacl/elsa-waf/xxx
    
    # Health check
    alb.ingress.kubernetes.io/healthcheck-path: /health/ready
    alb.ingress.kubernetes.io/healthcheck-interval-seconds: '15'
    alb.ingress.kubernetes.io/healthcheck-timeout-seconds: '5'
    alb.ingress.kubernetes.io/success-codes: '200'
    
spec:
  rules:
  - host: elsa.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: elsa-server
            port:
              number: 5000
```

**Note:** ALB does not support native rate limiting. Use AWS WAF for advanced rate limiting and bot protection.

### AWS WAF Rate Limiting Rule

```json
{
  "Name": "ResumeEndpointRateLimit",
  "Priority": 1,
  "Statement": {
    "RateBasedStatement": {
      "Limit": 100,
      "AggregateKeyType": "IP",
      "ScopeDownStatement": {
        "ByteMatchStatement": {
          "SearchString": "/elsa/api/bookmarks/resume",
          "FieldToMatch": {
            "UriPath": {}
          },
          "TextTransformations": [
            {
              "Priority": 0,
              "Type": "LOWERCASE"
            }
          ],
          "PositionalConstraint": "CONTAINS"
        }
      }
    }
  },
  "Action": {
    "Block": {}
  },
  "VisibilityConfig": {
    "SampledRequestsEnabled": true,
    "CloudWatchMetricsEnabled": true,
    "MetricName": "ResumeEndpointRateLimit"
  }
}
```

---

## Testing Your Configuration

### Test HTTPS Redirect

```bash
curl -I http://elsa.your-domain.com/elsa/api/workflow-definitions
# Expected: 301 Moved Permanently, Location: https://...
```

### Test Rate Limiting

```bash
# Send 150 requests in 1 minute (should hit rate limit)
for i in {1..150}; do
  curl -X POST "https://elsa.your-domain.com/elsa/api/bookmarks/resume?t=test" \
    -H "Content-Type: application/json" \
    -d '{}' \
    -w "\n%{http_code}\n" \
    -s -o /dev/null
done
# Expected: First 100 return 200/401, then 429 Too Many Requests
```

### Test CORS

```bash
# Preflight request
curl -X OPTIONS "https://elsa.your-domain.com/elsa/api/workflow-definitions" \
  -H "Origin: https://your-app.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
# Expected: Access-Control-Allow-Origin: https://your-app.com
```

---

## Security Checklist

- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] TLS 1.2+ configured with strong ciphers
- [ ] Valid SSL certificate installed (not self-signed)
- [ ] Security headers configured (HSTS, X-Frame-Options, etc.)
- [ ] Rate limiting enabled for resume endpoints (100/min per IP)
- [ ] CORS policy locked down (no AllowAnyOrigin)
- [ ] IP allowlisting configured for internal webhooks (if applicable)
- [ ] Sticky sessions disabled for `/elsa/api/` endpoints
- [ ] Health checks configured for load balancer
- [ ] WAF enabled (if using cloud provider)

---

## Vendor Documentation Links

For advanced configuration, consult official documentation:

- **Nginx:** https://nginx.org/en/docs/
- **Traefik:** https://doc.traefik.io/traefik/
- **Kubernetes Ingress-Nginx:** https://kubernetes.github.io/ingress-nginx/
- **AWS ALB Ingress:** https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html
- **Azure Application Gateway:** https://learn.microsoft.com/en-us/azure/application-gateway/
- **Google Cloud Load Balancing:** https://cloud.google.com/load-balancing/docs

---

## Related Documentation

- [Security & Authentication Guide](../README.md) - Full security reference
- [Resume Endpoint Security](resume-endpoint-notes.md) - Token security best practices
- [Clustering Guide](../../clustering/README.md) (DOC-015) - Multi-node architecture
- [Troubleshooting Guide](../../troubleshooting/README.md) (DOC-017) - Diagnosing network issues

---

**Last Updated:** 2025-11-25
