---
description: >-
  Quick start guide for deploying Elsa Workflows to Kubernetes with PostgreSQL persistence, including configuration, troubleshooting, and production best practices.
---

# Kubernetes Deployment Basics

This guide provides a practical introduction to deploying Elsa Workflows on Kubernetes with PostgreSQL persistence. It focuses on common deployment patterns and configuration challenges, helping you move from SQLite (development) to PostgreSQL (production).

{% hint style="info" %}
**Note:** For comprehensive Kubernetes deployment documentation including Helm charts, autoscaling, monitoring, and service mesh integration, see the [Full Kubernetes Deployment Guide](../kubernetes-deployment.md).
{% endhint %}

## Overview

This guide covers:

- Using Kubernetes manifests from the elsa-core repository
- Switching from SQLite to PostgreSQL for production
- Common configuration pitfalls and how to avoid them
- Troubleshooting database connectivity and persistence

## Prerequisites

- Kubernetes cluster (v1.24+) - Minikube, k3s, or cloud provider (EKS, AKS, GKE)
- `kubectl` CLI configured to access your cluster
- Basic understanding of Kubernetes concepts (Pods, Services, ConfigMaps, Secrets)
- PostgreSQL database (managed or self-hosted)

## Understanding the elsa-core Kubernetes Manifests

The elsa-core repository includes sample Kubernetes manifests in the `scripts/` directory (if available). These manifests provide a starting point for deploying Elsa Server and Studio to Kubernetes.

### Typical Manifest Structure

```
elsa-core/
├── scripts/
│   ├── kubernetes/
│   │   ├── elsa-server-deployment.yaml
│   │   ├── elsa-server-service.yaml
│   │   ├── elsa-studio-deployment.yaml
│   │   ├── configmap.yaml
│   │   └── secrets.yaml (template)
```

{% hint style="warning" %}
**Note:** The exact structure may vary by version. Always refer to the latest elsa-core repository for current manifest examples. If manifests are not present, use the examples in this guide as a starting point.
{% endhint %}

### What the Manifests Provide

- **elsa-server-deployment.yaml**: Deployment for Elsa Server (workflow runtime and API)
- **elsa-studio-deployment.yaml**: Deployment for Elsa Studio (designer UI)
- **services.yaml**: ClusterIP or LoadBalancer services for external access
- **configmap.yaml**: Application configuration (connection strings, feature flags)
- **secrets.yaml**: Sensitive data (database passwords, API keys)

## Default Configuration: SQLite

By default, Elsa Server deployments often use SQLite for simplicity:

**Default ConfigMap:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-config
data:
  ConnectionStrings__DefaultConnection: "Data Source=/app/data/elsa.db"
  Elsa__Persistence__Provider: "Sqlite"
```

**Why SQLite is Used:**
- Zero configuration required
- Works out of the box
- Suitable for demos and development

**Why SQLite is NOT Suitable for Production:**
- **Single-file database**: Does not support multiple pods (no horizontal scaling)
- **No concurrent writes**: Workflow execution errors under load
- **Data loss risk**: Data is lost if the pod restarts (unless using PersistentVolume)
- **Limited performance**: Not optimized for high-throughput scenarios

{% hint style="danger" %}
**Never use SQLite in production Kubernetes deployments.** Always use PostgreSQL, SQL Server, or MySQL for production workloads.
{% endhint %}

## Switching to PostgreSQL

To use PostgreSQL in Kubernetes, you need to:

1. Deploy or connect to a PostgreSQL database
2. Update connection strings and environment variables
3. Configure Elsa modules to use the PostgreSQL provider
4. Apply database migrations

### Step 1: Deploy PostgreSQL (Optional)

If you don't have an external PostgreSQL instance, deploy one in Kubernetes:

**postgres-deployment.yaml:**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:16
        env:
        - name: POSTGRES_DB
          value: elsa_workflows
        - name: POSTGRES_USER
          value: elsa_user
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
  type: ClusterIP
```

**postgres-secret.yaml:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
type: Opaque
stringData:
  password: "your-secure-password-here"  # Change this!
```

Apply the manifests:
```bash
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-deployment.yaml
```

{% hint style="info" %}
**Production Recommendation:** Use managed PostgreSQL services (Amazon RDS, Azure Database for PostgreSQL, Google Cloud SQL) instead of self-hosting in Kubernetes for better reliability, automated backups, and reduced operational overhead.
{% endhint %}

### Step 2: Update Elsa Server Configuration

Changing the connection string alone is **not enough**. You must also configure the persistence provider in the Elsa modules.

#### Option A: Environment Variables

Update the Elsa Server deployment to use PostgreSQL:

**elsa-server-deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
spec:
  replicas: 1  # Start with 1 for testing. Production: 3+ for HA and rolling updates
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
        env:
        # Connection string
        - name: ConnectionStrings__PostgreSql
          value: "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(POSTGRES_PASSWORD)"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        
        # Persistence configuration
        - name: Elsa__Persistence__Provider
          value: "PostgreSql"
        - name: Elsa__Persistence__ConnectionStringName
          value: "PostgreSql"
        
        # Module configuration
        - name: Elsa__Modules__Management__Persistence__Provider
          value: "EntityFrameworkCore.PostgreSql"
        - name: Elsa__Modules__Runtime__Persistence__Provider
          value: "EntityFrameworkCore.PostgreSql"
        
        ports:
        - containerPort: 8080
        - containerPort: 8081
```

#### Option B: ConfigMap and appsettings.json

Mount a ConfigMap as `appsettings.Production.json`:

**elsa-configmap.yaml:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-config
data:
  appsettings.Production.json: |
    {
      "ConnectionStrings": {
        "PostgreSql": "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(POSTGRES_PASSWORD)"
      },
      "Elsa": {
        "Modules": {
          "Management": {
            "Persistence": {
              "Provider": "EntityFrameworkCore.PostgreSql",
              "ConnectionStringName": "PostgreSql"
            }
          },
          "Runtime": {
            "Persistence": {
              "Provider": "EntityFrameworkCore.PostgreSql",
              "ConnectionStringName": "PostgreSql"
            }
          }
        }
      }
    }
```

**Deployment with ConfigMap:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
spec:
  template:
    spec:
      containers:
      - name: elsa-server
        image: elsaworkflows/elsa-server:latest
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        volumeMounts:
        - name: config
          mountPath: /app/appsettings.Production.json
          subPath: appsettings.Production.json
      volumes:
      - name: config
        configMap:
          name: elsa-config
```

### Step 3: Configure Persistence in Program.cs

If you're building a custom Elsa Server image, configure PostgreSQL persistence in `Program.cs`:

```csharp
using Elsa.Persistence.EFCore.Extensions;
using Elsa.Persistence.EFCore.Modules.Management;
using Elsa.Persistence.EFCore.Modules.Runtime;
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    // Configure Management module with PostgreSQL
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(
                builder.Configuration.GetConnectionString("PostgreSql"),
                options =>
                {
                    options.MigrationsHistoryTable("__EFMigrationsHistory_Management");
                }
            );
        });
    });
    
    // Configure Runtime module with PostgreSQL
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef =>
        {
            ef.UsePostgreSql(
                builder.Configuration.GetConnectionString("PostgreSql"),
                options =>
                {
                    options.MigrationsHistoryTable("__EFMigrationsHistory_Runtime");
                }
            );
        });
    });
    
    elsa.UseWorkflowsApi();
    elsa.UseHttp();
});

var app = builder.Build();

// Auto-migrate on startup (optional, can also use init containers)
if (builder.Configuration.GetValue<bool>("Elsa:AutoMigrate", false))
{
    await app.Services.MigrateElsaDatabaseAsync();
}

app.UseWorkflowsApi();
app.Run();
```

## Why Changing Only the Connection String Isn't Enough

A common mistake is to update the connection string but forget to configure the persistence provider. This leads to:

**Symptoms:**
- Elsa still creates `elsa.db` file (SQLite)
- Connection string is ignored
- Data not persisted to PostgreSQL

**Root Cause:**

Elsa modules have **default persistence providers** built into the code. Simply changing the connection string doesn't change the provider. You must explicitly configure each module:

```csharp
// ❌ Wrong: Only changing connection string
services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();  // Uses default provider (SQLite)
    elsa.UseWorkflowRuntime();     // Uses default provider (SQLite)
});

// ✅ Correct: Configure provider for each module
services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef => 
            ef.UsePostgreSql(connectionString));
    });
    
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseEntityFrameworkCore(ef => 
            ef.UsePostgreSql(connectionString));
    });
});
```

**Configuration Points:**
1. **Connection String**: Specifies where to connect
2. **Provider**: Specifies how to connect (SQLite, PostgreSQL, SQL Server, etc.)
3. **Module Configuration**: Each module (Management, Runtime) needs its own provider configuration

All three must be aligned for PostgreSQL to work.

## Running Database Migrations

Before Elsa Server can use PostgreSQL, the database schema must be created.

### Option 1: Init Container

Use a Kubernetes init container to run migrations before the main app starts:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
spec:
  template:
    spec:
      initContainers:
      - name: migrations
        image: elsaworkflows/elsa-server:latest
        command: ["/bin/sh"]
        args:
        - -c
        - |
          dotnet ef database update --context ManagementElsaDbContext
          dotnet ef database update --context RuntimeElsaDbContext
        env:
        - name: ConnectionStrings__PostgreSql
          value: "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(POSTGRES_PASSWORD)"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
      containers:
      - name: elsa-server
        # ... main container config ...
```

{% hint style="warning" %}
**Important:** The above init container example assumes the Elsa Server image includes the EF Core tooling (`dotnet-ef`). Most production images do **not** include this tool for security and size reasons.  
- To run migrations reliably, use a dedicated migration image that includes `dotnet-ef`, or build a custom image for this purpose.  
- Alternatively, ensure your main image has the necessary tooling, but this is **not recommended** for production.
{% endhint %}
### Option 2: Auto-Migration on Startup

Enable auto-migration in the application (simpler but not ideal for production):

```csharp
// In Program.cs
if (builder.Configuration.GetValue<bool>("Elsa:AutoMigrate", false))
{
    await app.Services.MigrateElsaDatabaseAsync();
}
```

Set the environment variable in the deployment:
```yaml
env:
- name: Elsa__AutoMigrate
  value: "true"
```

{% hint style="warning" %}
**Production Best Practice:** Run migrations as a separate Job or init container, not on every pod startup. This prevents race conditions when multiple pods start simultaneously.
{% endhint %}

### Option 3: Kubernetes Job

Create a one-time migration Job:

**elsa-migration-job.yaml:**
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: elsa-migrations
spec:
  template:
    spec:
      containers:
      - name: migrations
        image: elsaworkflows/elsa-server:latest
        command: ["/bin/sh", "-c"]
        args:
        - |
          dotnet ef database update --context ManagementElsaDbContext
          dotnet ef database update --context RuntimeElsaDbContext
        env:
        - name: ConnectionStrings__PostgreSql
          value: "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(POSTGRES_PASSWORD)"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
      restartPolicy: OnFailure
```

{% hint style="warning" %}
**Important:** Similar to the init container example, this Job assumes the Elsa Server image includes the EF Core tooling (`dotnet-ef`). Most production images do **not** include this tool for security and size reasons.
- To run migrations reliably, use a dedicated migration image that includes `dotnet-ef`, or build a custom image for this purpose.
- Alternatively, ensure your main image has the necessary tooling, but this is **not recommended** for production.
{% endhint %}

Run the job before deploying Elsa Server:
```bash
kubectl apply -f elsa-migration-job.yaml
kubectl wait --for=condition=complete job/elsa-migrations --timeout=300s
kubectl apply -f elsa-server-deployment.yaml
```

## Troubleshooting

### Problem: Elsa Still Uses SQLite

**Symptoms:**
- `elsa.db` file created in pod
- PostgreSQL connection string appears in logs but isn't used
- No tables created in PostgreSQL

**Diagnosis:**
```bash
# Check pod logs
kubectl logs -l app=elsa-server --tail=100

# Look for:
# - "Using Sqlite provider" (wrong)
# - "Using PostgreSql provider" (correct)
```

**Fix:**

1. Verify provider configuration in environment variables:
   ```yaml
   env:
   - name: Elsa__Modules__Management__Persistence__Provider
     value: "EntityFrameworkCore.PostgreSql"
   ```

2. Or ensure `appsettings.Production.json` is mounted correctly:
   ```bash
   kubectl exec -it deployment/elsa-server -- cat /app/appsettings.Production.json
   ```

3. Check that the PostgreSQL package is included in your Docker image:
   ```dockerfile
   # In Dockerfile
   RUN dotnet add package Elsa.Persistence.EFCore.PostgreSql
   ```

### Problem: Connection Refused or Timeout

**Symptoms:**
```
Npgsql.NpgsqlException: Connection refused
or
A connection attempt failed because the connected party did not properly respond
```

**Diagnosis:**
```bash
# Check if PostgreSQL pod is running
kubectl get pods -l app=postgres

# Check PostgreSQL service
kubectl get svc postgres

# Test connection from Elsa Server pod
kubectl exec -it deployment/elsa-server -- /bin/sh
apk add postgresql-client
psql -h postgres -U elsa_user -d elsa_workflows
```

**Fix:**

1. Verify PostgreSQL service name matches connection string:
   ```yaml
   # Connection string must use service name
   Host=postgres  # ← Must match service metadata.name
   ```

2. Ensure PostgreSQL is ready before Elsa Server starts:
   ```yaml
   # Add readiness probe to postgres deployment
   readinessProbe:
     exec:
       command: ["pg_isready", "-U", "elsa_user"]
     initialDelaySeconds: 5
     periodSeconds: 5
   ```

3. Check namespace - services in different namespaces require FQDN:
   ```yaml
   # If postgres is in namespace "database"
   Host=postgres.database.svc.cluster.local
   ```

### Problem: Tables Not Created

**Symptoms:**
- PostgreSQL connection succeeds
- No error messages in logs
- Queries fail: "relation 'Elsa_WorkflowDefinitions' does not exist"

**Diagnosis:**
```bash
# Connect to PostgreSQL
kubectl exec -it deployment/postgres -- psql -U elsa_user -d elsa_workflows

# List tables
\dt

# Expected tables:
# Elsa_WorkflowDefinitions
# Elsa_WorkflowInstances
# Elsa_ActivityExecutionRecords
# ... and others
```

**Fix:**

1. Ensure migrations ran successfully:
   ```bash
   # Check migration job logs
   kubectl logs job/elsa-migrations
   
   # Look for:
   # "Applying migration '20240101000000_InitialCreate'"
   # "Done."
   ```

2. Manually run migrations if needed:
   ```bash
   kubectl run -it --rm migrations --image=elsaworkflows/elsa-server:latest \
     --restart=Never \
     --env="ConnectionStrings__PostgreSql=Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=..." \
     -- dotnet ef database update
   ```

3. Check migration history:
   ```sql
   SELECT * FROM "__EFMigrationsHistory_Management";
   SELECT * FROM "__EFMigrationsHistory_Runtime";
   ```

### Problem: Missing Environment Variables

**Symptoms:**
- Connection string contains literal `$(POSTGRES_PASSWORD)` instead of actual password
- Authentication failures

**Diagnosis:**
```bash
# Check environment variables in pod
kubectl exec -it deployment/elsa-server -- printenv | grep -i postgres

# Should show:
# POSTGRES_PASSWORD=actual_password_here
# ConnectionStrings__PostgreSql=Host=postgres;...Password=actual_password_here
```

**Fix:**

Environment variable substitution in connection strings doesn't happen automatically. Use one of these approaches:

**Option 1: Reference secret directly in each field:**
```yaml
env:
- name: DB_HOST
  value: "postgres"
- name: DB_NAME
  value: "elsa_workflows"
- name: DB_USER
  value: "elsa_user"
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: postgres-secret
      key: password
- name: ConnectionStrings__PostgreSql
  value: "Host=$(DB_HOST);Database=$(DB_NAME);Username=$(DB_USER);Password=$(DB_PASSWORD)"
```

**Option 2: Build connection string in code:**
```csharp
// In Program.cs
var host = builder.Configuration["DB_HOST"];
var database = builder.Configuration["DB_NAME"];
var user = builder.Configuration["DB_USER"];
var password = builder.Configuration["DB_PASSWORD"];

var connectionString = $"Host={host};Database={database};Username={user};Password={password}";

builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement(management =>
    {
        management.UseEntityFrameworkCore(ef => ef.UsePostgreSql(connectionString));
    });
    // ...
});
```

### Problem: ConfigMap Not Mounted

**Symptoms:**
- Settings in ConfigMap not applied
- App uses default configuration

**Diagnosis:**
```bash
# Check if ConfigMap exists
kubectl get configmap elsa-config -o yaml

# Verify file is mounted in pod
kubectl exec -it deployment/elsa-server -- ls -la /app/appsettings.Production.json

# Check file content
kubectl exec -it deployment/elsa-server -- cat /app/appsettings.Production.json
```

**Fix:**

1. Ensure volume mount path is correct:
   ```yaml
   volumeMounts:
   - name: config
     mountPath: /app/appsettings.Production.json  # Must match app's config path
     subPath: appsettings.Production.json
   ```

2. Set `ASPNETCORE_ENVIRONMENT` to load the file:
   ```yaml
   env:
   - name: ASPNETCORE_ENVIRONMENT
     value: "Production"
   ```

3. Verify ConfigMap is in the same namespace as the deployment.

## Verifying PostgreSQL is Being Used

After deploying, confirm that Elsa is using PostgreSQL:

### 1. Check Logs

```bash
kubectl logs -l app=elsa-server --tail=50 | grep -i postgres

# Look for messages like:
# "Using PostgreSQL provider"
# "Executed DbCommand (123ms) [Parameters=[], CommandType='Text']"
```

### 2. Check Database Tables

```bash
kubectl exec -it deployment/postgres -- psql -U elsa_user -d elsa_workflows -c "\dt"

# Expected output:
#                   List of relations
#  Schema |            Name              | Type  |   Owner
# --------+------------------------------+-------+-----------
#  public | Elsa_ActivityExecutionRecords| table | elsa_user
#  public | Elsa_Bookmarks               | table | elsa_user
#  public | Elsa_WorkflowDefinitions     | table | elsa_user
#  public | Elsa_WorkflowInstances       | table | elsa_user
```

### 3. Create a Test Workflow

```bash
# Port-forward Elsa Server
kubectl port-forward svc/elsa-server 8080:80

# Create a workflow via API
curl -X POST http://localhost:8080/elsa/api/workflow-definitions/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflow": {
      "activities": [
        {
          "id": "1",
          "type": "WriteLine",
          "text": "Hello from Kubernetes!"
        }
      ]
    }
  }'

# Verify workflow instance was persisted
kubectl exec -it deployment/postgres -- psql -U elsa_user -d elsa_workflows \
  -c "SELECT id, status FROM \"Elsa_WorkflowInstances\" ORDER BY created_at DESC LIMIT 1;"
```

## Production Best Practices

### 1. Use Managed PostgreSQL

- **Amazon RDS for PostgreSQL**: Automated backups, point-in-time recovery, Multi-AZ
- **Azure Database for PostgreSQL**: High availability, automatic patching, geo-replication
- **Google Cloud SQL**: Automated backups, read replicas, automatic failover

### 2. Separate Database User Permissions

```sql
-- Create read-only user for monitoring
CREATE USER elsa_readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE elsa_workflows TO elsa_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO elsa_readonly;

-- Create migration user with schema modification rights
CREATE USER elsa_migrations WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE elsa_workflows TO elsa_migrations;

-- Application user with limited permissions
CREATE USER elsa_app WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE elsa_workflows TO elsa_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO elsa_app;
```

### 3. Use Connection Pooling

```yaml
env:
- name: ConnectionStrings__PostgreSql
  value: "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(PASSWORD);Pooling=true;MinPoolSize=1;MaxPoolSize=20"
```

### 4. Enable TLS for Database Connections

```yaml
env:
- name: ConnectionStrings__PostgreSql
  value: "Host=postgres;Database=elsa_workflows;Username=elsa_user;Password=$(PASSWORD);SSL Mode=Require;Trust Server Certificate=false"
```

### 5. Implement Health Checks

```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

### 6. Set Resource Limits

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

### 7. Production Scaling Considerations

For production deployments, run at least 3 replicas:

```yaml
spec:
  replicas: 3  # Minimum for production
```

**Why 3+ replicas?**
- **High Availability**: If one pod fails, others continue serving traffic
- **Rolling Updates**: Allows zero-downtime deployments (update one pod at a time)
- **Load Distribution**: Better distribution of workflow execution across pods
- **Pod Disruption Budget**: Can configure PDB to maintain minimum available pods

**Scaling Strategy:**
- **Development/Staging**: 1-2 replicas
- **Production (low traffic)**: 3 replicas
- **Production (high traffic)**: 5-10+ replicas with HPA
- **Enterprise**: 10+ replicas with node affinity and pod anti-affinity rules

For automatic scaling based on CPU/memory usage, see the [Full Kubernetes Deployment Guide](../kubernetes-deployment.md#horizontal-pod-autoscaling).

## Next Steps

- **Scale Your Deployment**: Configure [Horizontal Pod Autoscaling](../kubernetes-deployment.md#horizontal-pod-autoscaling)
- **Add Monitoring**: Set up [Prometheus and Grafana](../kubernetes-deployment.md#monitoring-with-prometheus--grafana)
- **Secure Your Cluster**: Configure [authentication and authorization](../security/README.md)
- **Integrate with Studio**: Set up [Blazor Dashboard](../integration/blazor-dashboard.md)
- **Production Hardening**: Follow the [Production Checklist](../kubernetes-deployment.md#production-best-practices)

## Related Documentation

- [Full Kubernetes Deployment Guide](../kubernetes-deployment.md) - Complete reference with Helm charts, autoscaling, and monitoring
- [Database Configuration](../../getting-started/database-configuration.md) - Detailed persistence setup
- [Clustering Guide](../clustering/README.md) - Multi-node deployment patterns
- [Security & Authentication](../security/README.md) - Securing your Kubernetes deployment
- [Troubleshooting](../troubleshooting/README.md) - Common issues and solutions

---

**Last Updated:** 2025-12-02  
**Addresses Issues:** #75
