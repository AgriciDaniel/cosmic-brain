---
type: concept
title: "Elsa Deployment"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - kubernetes
  - deployment
  - devops
status: developing
address: c-000067
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Clustering]]"
  - "[[Elsa Security]]"
  - "[[Elsa Onboarding]]"
---

# Elsa Deployment

Deploying [[entities/Elsa Workflows]] to production environments, with a focus on Kubernetes. Elsa's architecture supports containerized deployment, horizontal scaling, and cloud-agnostic persistence.

---

## Kubernetes Quick Start

### Prerequisites

- Kubernetes cluster 1.24+
- PostgreSQL database (recommended over SQLite for production)
- Container registry access to `elsaworkflows/elssa-server` images

### Minimal Deployment

A production-ready deployment requires: the Elsa Server container, a PostgreSQL database, and optional Elsa Studio for visual design.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: elsa-server
  template:
    metadata:
      labels:
        app: elsa-server
    spec:
      containers:
      - name: elsa-server
        image: elsaworkflows/elsa-server:latest
        ports:
        - containerPort: 8080
        env:
        - name: ConnectionStrings__PostgreSql
          valueFrom:
            secretKeyRef:
              name: elsa-db-secret
              key: connection-string
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
```

### Database Migration Strategy

SQLite (the default) is unsuitable for production. Always migrate to PostgreSQL or SQL Server:

1. **Init container** -- run migrations before the main container starts
2. **Kubernetes Job** -- run migrations as a one-shot Job before deploying
3. **Application startup** -- auto-migrate on boot (development only)

```yaml
# Init container for migrations
initContainers:
- name: elsa-migrate
  image: elsaworkflows/elsa-server:latest
  command: ["dotnet", "run", "--no-launch-profile", "--", "migrate"]
  env:
  - name: ConnectionStrings__PostgreSql
    valueFrom:
      secretKeyRef:
        name: elsa-db-secret
        key: connection-string
```

> [!warning] SQLite in Production
> SQLite can cause database corruption under concurrent access from multiple pods. Always use PostgreSQL or SQL Server for clustered deployments.

---

## Configuration Management

### ConfigMap (Non-Sensitive)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-config
data:
  appsettings.Production.json: |
    {
      "Elsa": {
        "Http": {
          "BaseUrl": "https://elsa.example.com",
          "BasePath": "/elsa"
        }
      }
    }
```

### Secrets (Sensitive)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: elsa-db-secret
type: Opaque
stringData:
  connection-string: "Host=postgres;Database=elsa;Username=elsa;Password=..."
```

---

## Scaling and High Availability

### Horizontal Pod Autoscaler (HPA)

Scale based on CPU and memory utilization:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: elsa-server-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: elsa-server
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Pod Disruption Budget (PDB)

Ensure minimum availability during voluntary disruptions:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: elsa-server-pdb
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: elsa-server
```

---

## Ingress Configuration

### Nginx Ingress Controller

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-server
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-protocols: "TLSv1.2 TLSv1.3"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - elsa.example.com
    secretName: elsa-tls
  rules:
  - host: elsa.example.com
    http:
      paths:
      - path: /elsa/api
        pathType: Prefix
        backend:
          service:
            name: elsa-server
            port:
              number: 8080
```

### Security Headers

Add via ingress annotations:

```yaml
nginx.ingress.kubernetes.io/configuration-snippet: |
  more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains";
  more_set_headers "X-Frame-Options: DENY";
  more_set_headers "X-Content-Type-Options: nosniff";
```

---

## Service Mesh Integration

When using Istio or Linkerd, Elsa does not require special configuration. However, consider:

- **mTLS**: Enable strict mTLS between Elsa pods for inter-service communication (especially with MassTransit/RabbitMQ)
- **Traffic splitting**: Route percentage of dispatch messages to canary deployments
- **Circuit breaking**: Protect Elsa from downstream service failures
- **Observability**: Envoy/Linkerd-proxy sidecars provide telemetry without code changes

---

## Monitoring

| Component | Tool | What to Monitor |
|-----------|------|-----------------|
| Workflow engine | Prometheus metrics | Execution duration, failure rate, queue depth |
| Pod health | Liveness/Readiness probes | `/health/ready` endpoint |
| Database | PostgreSQL exporter | Connection pool, query latency, lock contention |
| Queue (if configured) | RabbitMQ/Azure SB metrics | Queue depth, dispatch latency |
| Cluster | K8s dashboard | Pod restarts, resource usage, eviction events |

---

## Cloud-Specific Considerations

- **AWS**: Use ALB with WAF for rate limiting, RDS Aurora for PostgreSQL, ElastiCache for Redis locking
- **Azure**: Use Application Gateway with WAF, Azure Database for PostgreSQL, Cache for Redis
- **GCP**: Use Cloud Load Balancing with Cloud Armor, Cloud SQL for PostgreSQL, Memorystore for Redis

---

## Related

- [[Elsa Clustering]] -- Multi-node architecture and distributed runtime
- [[Elsa Security]] -- Network security, TLS, and ingress protection
- [[Elsa Onboarding]] -- Initial application setup
- [[entities/Elsa Workflows]] -- Platform overview
