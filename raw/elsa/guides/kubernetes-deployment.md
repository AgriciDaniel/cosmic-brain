---
description: >-
  Complete Kubernetes deployment guide for Elsa Workflows including Helm charts,
  deployment configurations, ingress setup, autoscaling, monitoring, service
  mesh integration, and production best practice
---

# Kubernetes Deployment

This comprehensive guide covers deploying Elsa Workflows to Kubernetes in production environments. Whether you're using managed Kubernetes services (EKS, AKS, GKE) or self-hosted clusters, this guide provides everything you need for a reliable, scalable deployment.

## Overview

Elsa Workflows can be deployed to Kubernetes using either:

* **Helm Charts** (Recommended) - Simplified deployment and management
* **Raw Kubernetes Manifests** - Full control over configuration

This guide covers both approaches and includes:

* Elsa Server and Studio deployments
* Database integration and persistence
* Ingress configuration for external access
* Horizontal Pod Autoscaling (HPA)
* Monitoring with Prometheus and Grafana
* Service mesh integration (Istio/Linkerd)
* Production best practices and troubleshooting

## Table of Contents

* [Prerequisites](kubernetes-deployment.md#prerequisites)
* [Architecture Overview](kubernetes-deployment.md#architecture-overview)
* [Helm Chart Deployment](kubernetes-deployment.md#helm-chart-deployment)
* [Kubernetes Manifest Deployment](kubernetes-deployment.md#kubernetes-manifest-deployment)
* [Database Configuration](kubernetes-deployment.md#database-configuration)
* [Ingress Setup](kubernetes-deployment.md#ingress-setup)
* [Horizontal Pod Autoscaling](kubernetes-deployment.md#horizontal-pod-autoscaling)
* [Persistent Storage](kubernetes-deployment.md#persistent-storage)
* [Monitoring with Prometheus & Grafana](kubernetes-deployment.md#monitoring-with-prometheus--grafana)
* [Service Mesh Integration](kubernetes-deployment.md#service-mesh-integration)
* [Distributed Configuration](kubernetes-deployment.md#distributed-configuration)
* [Troubleshooting](kubernetes-deployment.md#troubleshooting)
* [Production Best Practices](kubernetes-deployment.md#production-best-practices)

## Prerequisites

Before deploying to Kubernetes, ensure you have:

### Required Tools

* **kubectl** v1.28+ - Kubernetes command-line tool
* **Helm** v3.12+ - Kubernetes package manager (if using Helm charts)
* **Docker** - For building custom images (optional)
* Access to a Kubernetes cluster (v1.28+)

### Cluster Requirements

* **Minimum**: 2 nodes with 4GB RAM and 2 CPU cores each
* **Recommended**: 3+ nodes with 8GB RAM and 4 CPU cores each
* **Storage**: Dynamic volume provisioning support (for databases)
* **Ingress Controller**: NGINX, Traefik, or cloud provider load balancer

### Knowledge Requirements

* Basic Kubernetes concepts (Pods, Services, Deployments)
* Understanding of Elsa architecture (see [Architecture Overview](../getting-started/architecture-overview.md))
* Familiarity with database configuration
* Basic YAML syntax

{% hint style="info" %}
**New to Kubernetes?**

For local development and testing, consider using [Minikube](https://minikube.sigs.k8s.io/), [k3d](https://k3d.io/), or [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/) before deploying to production clusters.
{% endhint %}

## Architecture Overview

A typical Elsa Workflows Kubernetes deployment consists of:

```
┌─────────────────────────────────────────────────────────────┐
│                       Ingress Controller                     │
│                   (NGINX / Traefik / ALB)                    │
└─────────────────┬───────────────────────┬───────────────────┘
                  │                       │
         ┌────────▼──────────┐   ┌───────▼────────┐
         │   Elsa Studio     │   │  Elsa Server   │
         │  (Deployment)     │   │  (Deployment)  │
         │   Replicas: 2+    │   │  Replicas: 3+  │
         └───────────────────┘   └────────┬───────┘
                                          │
                      ┌───────────────────┼───────────────────┐
                      │                   │                   │
             ┌────────▼────────┐ ┌───────▼────────┐ ┌───────▼────────┐
             │   PostgreSQL    │ │     Redis      │ │   RabbitMQ     │
             │  (StatefulSet)  │ │ (StatefulSet)  │ │ (StatefulSet)  │
             │   + PVC         │ │    + PVC       │ │    + PVC       │
             └─────────────────┘ └────────────────┘ └────────────────┘
```

### Components

1. **Elsa Server**: Hosts the workflow engine and REST API
2. **Elsa Studio**: Visual workflow designer (optional, can be separate)
3. **Database**: PostgreSQL, SQL Server, or MySQL (with persistent storage)
4. **Redis**: Distributed caching and locking
5. **RabbitMQ**: Message broker for distributed cache invalidation (via MassTransit)
6. **Ingress**: External access routing
7. **Monitoring**: Prometheus metrics and Grafana dashboards

## Helm Chart Deployment

Helm is the recommended approach for deploying Elsa Workflows to Kubernetes. While official Helm charts are under development, this section provides a production-ready chart configuration.

### Step 1: Create Helm Chart Structure

Create a new Helm chart for Elsa:

```bash
helm create elsa-workflows
cd elsa-workflows
```

### Step 2: Configure Values

Create a `values.yaml` file with the following configuration:

```yaml
# values.yaml - Elsa Workflows Helm Chart Configuration

# Global settings
global:
  imageRegistry: docker.io
  imagePullPolicy: IfNotPresent
  storageClass: ""  # Use default storage class

# Elsa Server configuration
elsaServer:
  enabled: true
  name: elsa-server
  
  image:
    repository: elsaworkflows/elsa-server-v3-5
    tag: latest
    pullPolicy: IfNotPresent
  
  replicaCount: 3
  
  resources:
    requests:
      memory: "512Mi"
      cpu: "500m"
    limits:
      memory: "2Gi"
      cpu: "2000m"
  
  env:
    - name: ASPNETCORE_ENVIRONMENT
      value: "Production"
    - name: HTTP_PORTS
      value: "8080"
    - name: DATABASEPROVIDER
      value: "PostgreSql"
    - name: CONNECTIONSTRINGS__POSTGRESQL
      valueFrom:
        secretKeyRef:
          name: elsa-secrets
          key: postgresql-connection-string
    - name: REDIS__CONNECTIONSTRING
      valueFrom:
        secretKeyRef:
          name: elsa-secrets
          key: redis-connection-string
    - name: RABBITMQ__CONNECTIONSTRING
      valueFrom:
        secretKeyRef:
          name: elsa-secrets
          key: rabbitmq-connection-string
  
  service:
    type: ClusterIP
    port: 80
    targetPort: 8080
  
  autoscaling:
    enabled: true
    minReplicas: 3
    maxReplicas: 10
    targetCPUUtilizationPercentage: 70
    targetMemoryUtilizationPercentage: 80
  
  livenessProbe:
    httpGet:
      path: /health/live
      port: 8080
    initialDelaySeconds: 30
    periodSeconds: 10
    timeoutSeconds: 5
    failureThreshold: 3
  
  readinessProbe:
    httpGet:
      path: /health/ready
      port: 8080
    initialDelaySeconds: 20
    periodSeconds: 5
    timeoutSeconds: 3
    failureThreshold: 3

# Elsa Studio configuration
elsaStudio:
  enabled: true
  name: elsa-studio
  
  image:
    repository: elsaworkflows/elsa-studio-v3-5
    tag: latest
    pullPolicy: IfNotPresent
  
  replicaCount: 2
  
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "1Gi"
      cpu: "1000m"
  
  env:
    - name: ASPNETCORE_ENVIRONMENT
      value: "Production"
    - name: HTTP_PORTS
      value: "8080"
    - name: ELSASERVER__URL
      value: "http://elsa-server/elsa/api"
  
  service:
    type: ClusterIP
    port: 80
    targetPort: 8080
  
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 5
    targetCPUUtilizationPercentage: 75

# PostgreSQL configuration
postgresql:
  enabled: true
  auth:
    username: elsa
    password: ""  # Set via secret
    database: elsa
  
  primary:
    persistence:
      enabled: true
      size: 50Gi
      storageClass: ""  # Use default
    
    resources:
      requests:
        memory: "1Gi"
        cpu: "500m"
      limits:
        memory: "4Gi"
        cpu: "2000m"
    
    initdb:
      scripts:
        init.sql: |
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          CREATE EXTENSION IF NOT EXISTS "pg_trgm";

# Redis configuration (for distributed locking and caching)
redis:
  enabled: true
  architecture: standalone
  auth:
    enabled: true
    password: ""  # Set via secret
  
  master:
    persistence:
      enabled: true
      size: 10Gi
    
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "1Gi"
        cpu: "1000m"

# RabbitMQ configuration (for MassTransit)
rabbitmq:
  enabled: true
  auth:
    username: elsa
    password: ""  # Set via secret
  
  persistence:
    enabled: true
    size: 20Gi
  
  resources:
    requests:
      memory: "512Mi"
      cpu: "500m"
    limits:
      memory: "2Gi"
      cpu: "1000m"
  
  replicaCount: 3
  clustering:
    enabled: true

# Ingress configuration
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
  
  hosts:
    - host: studio.example.com
      paths:
        - path: /
          pathType: Prefix
          service: elsa-studio
    - host: api.example.com
      paths:
        - path: /
          pathType: Prefix
          service: elsa-server
  
  tls:
    - secretName: elsa-tls
      hosts:
        - studio.example.com
        - api.example.com

# Monitoring configuration
monitoring:
  enabled: true
  serviceMonitor:
    enabled: true
    interval: 30s
  
  grafana:
    enabled: true
    dashboards:
      enabled: true

# Security settings
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  capabilities:
    drop:
      - ALL

# Pod disruption budget
podDisruptionBudget:
  enabled: true
  minAvailable: 1

# Network policies
networkPolicy:
  enabled: true
  policyTypes:
    - Ingress
    - Egress
```

### Step 3: Create Secrets

Create a Kubernetes secret for sensitive configuration:

```bash
export DB_PASSWORD='<your_postgres_password>'
export REDIS_PASSWORD='<your_redis_password>'
export RABBITMQ_PASSWORD='<your_rabbitmq_password>'
kubectl create secret generic elsa-secrets \
  --from-literal=postgresql-connection-string="Server=elsa-postgresql;Username=elsa;Database=elsa;Port=5432;Password=${DB_PASSWORD};SSLMode=Require;MaxPoolSize=100" \
  --from-literal=redis-connection-string="elsa-redis-master:6379,password=${REDIS_PASSWORD},ssl=False,abortConnect=False" \
  --from-literal=rabbitmq-connection-string="amqp://elsa:${RABBITMQ_PASSWORD}@elsa-rabbitmq:5672/" \
  --namespace elsa-workflows
```

{% hint style="warning" %}
**Security Best Practice**

Never commit secrets to version control. Use external secret management tools like:

* Sealed Secrets
* External Secrets Operator
* HashiCorp Vault
* Cloud provider secret managers (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager)
{% endhint %}

### Step 4: Install with Helm

```bash
# Add required Helm repositories
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Create namespace
kubectl create namespace elsa-workflows

# Install Elsa Workflows
# Store passwords in a secure values file (e.g., secrets.yaml) and never commit it to source control.
helm install elsa-workflows ./elsa-workflows \
  --namespace elsa-workflows \
  --values values.yaml \
  --values secrets.yaml  # Contains sensitive values, never committed
```

### Step 5: Verify Deployment

```bash
# Check deployment status
kubectl get pods -n elsa-workflows

# View logs
kubectl logs -n elsa-workflows -l app=elsa-server --tail=50

# Check services
kubectl get svc -n elsa-workflows

# Verify ingress
kubectl get ingress -n elsa-workflows
```

### Upgrading

To upgrade your deployment:

```bash
# Update values in values.yaml, then:
helm upgrade elsa-workflows ./elsa-workflows \
  --namespace elsa-workflows \
  --values values.yaml

# Check rollout status
kubectl rollout status deployment/elsa-server -n elsa-workflows
```

### Uninstalling

```bash
helm uninstall elsa-workflows --namespace elsa-workflows
```

## Kubernetes Manifest Deployment

For full control over your deployment, you can use raw Kubernetes manifests. This section provides production-ready YAML configurations.

### Directory Structure

```
k8s/
├── namespace.yaml
├── secrets.yaml
├── configmaps.yaml
├── postgresql/
│   ├── statefulset.yaml
│   ├── service.yaml
│   └── pvc.yaml
├── redis/
│   ├── statefulset.yaml
│   └── service.yaml
├── rabbitmq/
│   ├── statefulset.yaml
│   └── service.yaml
├── elsa-server/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── pdb.yaml
├── elsa-studio/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── hpa.yaml
└── ingress.yaml
```

### Namespace

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: elsa-workflows
  labels:
    name: elsa-workflows
    environment: production
```

### ConfigMap

```yaml
# configmaps.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-config
  namespace: elsa-workflows
data:
  ASPNETCORE_ENVIRONMENT: "Production"
  HTTP_PORTS: "8080"
  DATABASEPROVIDER: "PostgreSql"
  # Add non-sensitive configuration here
```

### Secrets

```yaml
# secrets.yaml
# DO NOT commit this file with actual values!
# Use kubectl create secret or external secret management
apiVersion: v1
kind: Secret
metadata:
  name: elsa-secrets
  namespace: elsa-workflows
type: Opaque
stringData:
  postgresql-connection-string: "Server=elsa-postgresql;Username=elsa;Database=elsa;Port=5432;Password=CHANGE_ME;SSLMode=Prefer;MaxPoolSize=100"
  redis-connection-string: "elsa-redis:6379,password=CHANGE_ME,ssl=False,abortConnect=False"
  rabbitmq-connection-string: "amqp://elsa:CHANGE_ME@elsa-rabbitmq:5672/"
```

### Elsa Server Deployment

```yaml
# elsa-server/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-server
  namespace: elsa-workflows
  labels:
    app: elsa-server
    component: api
    version: v3.5
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: elsa-server
  template:
    metadata:
      labels:
        app: elsa-server
        component: api
        version: v3.5
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - elsa-server
                topologyKey: kubernetes.io/hostname
      
      containers:
        - name: elsa-server
          image: elsaworkflows/elsa-server-v3-5:latest
          imagePullPolicy: IfNotPresent
          
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
          
          env:
            - name: ASPNETCORE_ENVIRONMENT
              value: "Production"
            - name: HTTP_PORTS
              value: "8080"
            - name: DATABASEPROVIDER
              value: "PostgreSql"
            - name: CONNECTIONSTRINGS__POSTGRESQL
              valueFrom:
                secretKeyRef:
                  name: elsa-secrets
                  key: postgresql-connection-string
            - name: REDIS__CONNECTIONSTRING
              valueFrom:
                secretKeyRef:
                  name: elsa-secrets
                  key: redis-connection-string
            - name: RABBITMQ__CONNECTIONSTRING
              valueFrom:
                secretKeyRef:
                  name: elsa-secrets
                  key: rabbitmq-connection-string
            # Distributed runtime configuration
            - name: ELSA__RUNTIME__TYPE
              value: "Distributed"
            - name: ELSA__CACHING__TYPE
              value: "Distributed"
          
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "2000m"
          
          livenessProbe:
            httpGet:
              path: /health/live
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          
          readinessProbe:
            httpGet:
              path: /health/ready
              port: http
            initialDelaySeconds: 20
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 15"]
          
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
            readOnlyRootFilesystem: false  # Set to true if application supports it
            # If readOnlyRootFilesystem: true, mount volumes for writable paths:
            # volumeMounts:
            #   - name: tmp
            #     mountPath: /tmp
```

### Elsa Server Service

```yaml
# elsa-server/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: elsa-server
  namespace: elsa-workflows
  labels:
    app: elsa-server
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: elsa-server
```

### Elsa Studio Deployment

```yaml
# elsa-studio/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elsa-studio
  namespace: elsa-workflows
  labels:
    app: elsa-studio
    component: ui
    version: v3.5
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: elsa-studio
  template:
    metadata:
      labels:
        app: elsa-studio
        component: ui
        version: v3.5
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      
      containers:
        - name: elsa-studio
          image: elsaworkflows/elsa-studio-v3-5:latest
          imagePullPolicy: IfNotPresent
          
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
          
          env:
            - name: ASPNETCORE_ENVIRONMENT
              value: "Production"
            - name: HTTP_PORTS
              value: "8080"
            - name: ELSASERVER__URL
              value: "http://elsa-server/elsa/api"
          
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 20
            periodSeconds: 10
          
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 10
            periodSeconds: 5
          
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
```

### Elsa Studio Service

```yaml
# elsa-studio/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: elsa-studio
  namespace: elsa-workflows
  labels:
    app: elsa-studio
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app: elsa-studio
```

### Deploy All Manifests

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Create secrets (use environment-specific values)
kubectl apply -f k8s/secrets.yaml

# Deploy infrastructure (database, cache, message broker)
kubectl apply -f k8s/postgresql/
kubectl apply -f k8s/redis/
kubectl apply -f k8s/rabbitmq/

# Wait for infrastructure to be ready
kubectl wait --for=condition=ready pod -l app=postgresql -n elsa-workflows --timeout=300s

# Deploy Elsa components
kubectl apply -f k8s/elsa-server/
kubectl apply -f k8s/elsa-studio/

# Configure ingress
kubectl apply -f k8s/ingress.yaml
```

## Database Configuration

Proper database configuration is crucial for production Kubernetes deployments. This section covers PostgreSQL, SQL Server, and MySQL configurations.

### PostgreSQL StatefulSet

```yaml
# postgresql/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elsa-postgresql
  namespace: elsa-workflows
spec:
  serviceName: elsa-postgresql
  replicas: 1  # Use 3+ for HA with replication
  selector:
    matchLabels:
      app: postgresql
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
        - name: postgresql
          image: postgres:16-alpine
          
          ports:
            - containerPort: 5432
              name: postgres
          
          env:
            - name: POSTGRES_DB
              value: "elsa"
            - name: POSTGRES_USER
              value: "elsa"
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: elsa-secrets
                  key: postgres-password
            - name: PGDATA
              value: /var/lib/postgresql/data/pgdata
            - name: POSTGRES_INITDB_ARGS
              value: "--encoding=UTF8 --lc-collate=en_US.utf8 --lc-ctype=en_US.utf8"
          
          args:
            - "-c"
            - "max_connections=200"
            - "-c"
            - "shared_buffers=256MB"
            - "-c"
            - "effective_cache_size=1GB"
            - "-c"
            - "maintenance_work_mem=64MB"
            - "-c"
            - "checkpoint_completion_target=0.9"
            - "-c"
            - "wal_buffers=16MB"
            - "-c"
            - "default_statistics_target=100"
          
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
          
          resources:
            requests:
              memory: "1Gi"
              cpu: "500m"
            limits:
              memory: "4Gi"
              cpu: "2000m"
          
          livenessProbe:
            exec:
              command:
                - /bin/sh
                - -c
                - pg_isready -U elsa
            initialDelaySeconds: 30
            periodSeconds: 10
          
          readinessProbe:
            exec:
              command:
                - /bin/sh
                - -c
                - pg_isready -U elsa
            initialDelaySeconds: 5
            periodSeconds: 5
  
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: "standard"  # Use your storage class
        resources:
          requests:
            storage: 50Gi
```

### PostgreSQL Service

```yaml
# postgresql/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: elsa-postgresql
  namespace: elsa-workflows
spec:
  type: ClusterIP
  clusterIP: None  # Headless service for StatefulSet
  ports:
    - port: 5432
      targetPort: postgres
      protocol: TCP
      name: postgres
  selector:
    app: postgresql
```

### Database Backup Configuration

Create a CronJob for regular backups:

```yaml
# postgresql/backup-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgresql-backup
  namespace: elsa-workflows
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: postgres:16-alpine
              command:
                - /bin/sh
                - -c
                - |
                  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
                  pg_dump -h elsa-postgresql -U elsa -d elsa > /backup/elsa_backup_${TIMESTAMP}.sql
                  # Upload to S3 or other storage
                  # aws s3 cp /backup/elsa_backup_${TIMESTAMP}.sql s3://your-bucket/backups/
              env:
                - name: PGPASSWORD
                  valueFrom:
                    secretKeyRef:
                      name: elsa-secrets
                      key: postgres-password
              volumeMounts:
                - name: backup
                  mountPath: /backup
          restartPolicy: OnFailure
          volumes:
            - name: backup
              persistentVolumeClaim:
                claimName: backup-pvc
```

### Connection Pooling

For high-load scenarios, consider using PgBouncer:

```yaml
# postgresql/pgbouncer-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pgbouncer
  namespace: elsa-workflows
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pgbouncer
  template:
    metadata:
      labels:
        app: pgbouncer
    spec:
      containers:
        - name: pgbouncer
          image: edoburu/pgbouncer:latest
          ports:
            - containerPort: 5432
          env:
            - name: DATABASE_URL
              value: "postgres://elsa:PASSWORD@elsa-postgresql:5432/elsa"
            - name: POOL_MODE
              value: "transaction"
            - name: MAX_CLIENT_CONN
              value: "1000"
            - name: DEFAULT_POOL_SIZE
              value: "25"
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "500m"
```

## Persistent Storage

Proper storage configuration ensures data persistence across pod restarts and upgrades.

### Storage Classes

Define storage classes for different performance tiers:

```yaml
# storage-classes.yaml
---
# Standard storage for general use
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard-retain
provisioner: kubernetes.io/aws-ebs  # or azure-disk, gce-pd
parameters:
  type: gp3
  fsType: ext4
reclaimPolicy: Retain  # Prevent accidental data loss
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer

---
# High-performance storage for databases
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: io2
  iopsPerGB: "50"
  fsType: ext4
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

### Persistent Volume Claims

```yaml
# pvc.yaml
---
# Database PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgresql-data-pvc
  namespace: elsa-workflows
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 100Gi

---
# Backup PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: backup-pvc
  namespace: elsa-workflows
spec:
  accessModes:
    - ReadWriteMany  # For multiple backup pods
  storageClassName: standard-retain
  resources:
    requests:
      storage: 500Gi

---
# Redis PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redis-data-pvc
  namespace: elsa-workflows
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
```

### Volume Snapshots

Configure VolumeSnapshotClass for backup and disaster recovery:

```yaml
# volume-snapshot-class.yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: elsa-snapshot-class
driver: ebs.csi.aws.com  # or disk.csi.azure.com, pd.csi.storage.gke.io
deletionPolicy: Retain
parameters:
  tagSpecification_1: "Name=elsa-workflow-snapshot"
```

Create snapshots:

```yaml
# create-snapshot.yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: postgresql-snapshot
  namespace: elsa-workflows
spec:
  volumeSnapshotClassName: elsa-snapshot-class
  source:
    persistentVolumeClaimName: postgresql-data-pvc
```

## Ingress Setup

Ingress controllers provide external access to your Elsa Workflows deployment with SSL/TLS termination, routing, and load balancing.

### NGINX Ingress Controller

#### Installation

```bash
# Install NGINX Ingress Controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=LoadBalancer
```

#### Ingress Configuration

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: elsa-ingress
  namespace: elsa-workflows
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "300"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/limit-rps: "10"
    # CORS configuration
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://studio.example.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    nginx.ingress.kubernetes.io/cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - studio.example.com
        - api.example.com
      secretName: elsa-tls
  rules:
    - host: studio.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: elsa-studio
                port:
                  number: 80
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: elsa-server
                port:
                  number: 80
```

### Traefik Ingress Controller

#### Installation

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install traefik traefik/traefik \
  --namespace traefik \
  --create-namespace \
  --set ports.web.redirectTo.port=websecure
```

#### IngressRoute Configuration

```yaml
# traefik-ingressroute.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: elsa-studio
  namespace: elsa-workflows
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`studio.example.com`)
      kind: Rule
      services:
        - name: elsa-studio
          port: 80
      middlewares:
        - name: security-headers
  tls:
    secretName: elsa-tls

---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: elsa-server
  namespace: elsa-workflows
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`api.example.com`)
      kind: Rule
      services:
        - name: elsa-server
          port: 80
      middlewares:
        - name: rate-limit
        - name: security-headers
  tls:
    secretName: elsa-tls

---
# Security headers middleware
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: security-headers
  namespace: elsa-workflows
spec:
  headers:
    stsSeconds: 31536000
    stsIncludeSubdomains: true
    stsPreload: true
    forceSTSHeader: true
    contentSecurityPolicy: "default-src 'self'"
    customResponseHeaders:
      X-Frame-Options: "SAMEORIGIN"
      X-Content-Type-Options: "nosniff"

---
# Rate limiting middleware
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: rate-limit
  namespace: elsa-workflows
spec:
  rateLimit:
    average: 100
    burst: 50
```

### SSL/TLS with cert-manager

#### Install cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
```

#### ClusterIssuer Configuration

```yaml
# cert-manager-issuer.yaml
---
# Let's Encrypt Staging (for testing)
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
      - http01:
          ingress:
            class: nginx

---
# Let's Encrypt Production
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

## Horizontal Pod Autoscaling

HPA automatically scales pods based on CPU, memory, or custom metrics.

### Metrics Server Installation

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### HPA for Elsa Server

```yaml
# elsa-server/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: elsa-server-hpa
  namespace: elsa-workflows
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: elsa-server
  minReplicas: 3
  maxReplicas: 10
  metrics:
    # CPU-based scaling
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    
    # Memory-based scaling
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    
    # Custom metric: requests per second
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: "1000"
  
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
        - type: Pods
          value: 2
          periodSeconds: 60
      selectPolicy: Min
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 30
        - type: Pods
          value: 4
          periodSeconds: 30
      selectPolicy: Max
```

### HPA for Elsa Studio

```yaml
# elsa-studio/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: elsa-studio-hpa
  namespace: elsa-workflows
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: elsa-studio
  minReplicas: 2
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 75
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### Vertical Pod Autoscaling (Optional)

For automatic resource request adjustments:

```yaml
# elsa-server/vpa.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: elsa-server-vpa
  namespace: elsa-workflows
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: elsa-server
  updatePolicy:
    updateMode: "Auto"  # or "Initial", "Recreate", "Off"
  resourcePolicy:
    containerPolicies:
      - containerName: elsa-server
        minAllowed:
          cpu: 500m
          memory: 512Mi
        maxAllowed:
          cpu: 4000m
          memory: 8Gi
```

### Pod Disruption Budget

Ensure availability during voluntary disruptions:

```yaml
# elsa-server/pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: elsa-server-pdb
  namespace: elsa-workflows
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: elsa-server
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: elsa-studio-pdb
  namespace: elsa-workflows
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: elsa-studio
```

### Testing Autoscaling

```bash
# Watch HPA status
kubectl get hpa -n elsa-workflows --watch

# Generate load to test scaling
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh
# Inside the pod:
while true; do wget -q -O- http://elsa-server.elsa-workflows.svc.cluster.local; done

# Monitor pod scaling
kubectl get pods -n elsa-workflows --watch
```

## Monitoring with Prometheus & Grafana

Comprehensive monitoring is essential for production Kubernetes deployments. This section covers Prometheus metrics collection and Grafana dashboards.

### Install Prometheus Stack

```bash
# Add Prometheus Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack (includes Prometheus, Grafana, and Alertmanager)
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set grafana.adminPassword=admin
```

### ServiceMonitor for Elsa Server

```yaml
# monitoring/elsa-server-servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: elsa-server
  namespace: elsa-workflows
  labels:
    app: elsa-server
    release: prometheus
spec:
  selector:
    matchLabels:
      app: elsa-server
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
      scrapeTimeout: 10s
```

### PrometheusRule for Alerts

```yaml
# monitoring/elsa-alerts.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: elsa-alerts
  namespace: elsa-workflows
  labels:
    release: prometheus
spec:
  groups:
    - name: elsa-workflows
      interval: 30s
      rules:
        # High CPU usage alert
        - alert: ElsaServerHighCPU
          expr: |
            rate(container_cpu_usage_seconds_total{namespace="elsa-workflows",pod=~"elsa-server-.*"}[5m]) > 0.8
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Elsa Server high CPU usage"
            description: "Pod {{ $labels.pod }} CPU usage is above 80% for 5 minutes"
        
        # High memory usage alert
        - alert: ElsaServerHighMemory
          expr: |
            container_memory_working_set_bytes{namespace="elsa-workflows",pod=~"elsa-server-.*"} / 
            container_spec_memory_limit_bytes{namespace="elsa-workflows",pod=~"elsa-server-.*"} > 0.9
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Elsa Server high memory usage"
            description: "Pod {{ $labels.pod }} memory usage is above 90%"
        
        # Pod restart alert
        - alert: ElsaServerPodRestarting
          expr: |
            rate(kube_pod_container_status_restarts_total{namespace="elsa-workflows",pod=~"elsa-server-.*"}[15m]) > 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Elsa Server pod restarting"
            description: "Pod {{ $labels.pod }} has restarted {{ $value }} times in the last 15 minutes"
        
        # Low replica count
        - alert: ElsaServerLowReplicas
          expr: |
            kube_deployment_status_replicas_available{namespace="elsa-workflows",deployment="elsa-server"} < 2
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Elsa Server low replica count"
            description: "Only {{ $value }} replicas available for elsa-server deployment"
        
        # Database connection errors
        - alert: ElsaDatabaseConnectionErrors
          expr: |
            rate(elsa_database_connection_errors_total[5m]) > 0.1
          for: 2m
          labels:
            severity: critical
          annotations:
            summary: "Elsa database connection errors"
            description: "Database connection error rate is {{ $value }} per second"
        
        # Workflow execution failures
        - alert: ElsaWorkflowExecutionFailures
          expr: |
            rate(elsa_workflow_execution_failed_total[5m]) > 0.5
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "High workflow execution failure rate"
            description: "Workflow execution failure rate is {{ $value }} per second"
        
        # High response time
        - alert: ElsaServerHighResponseTime
          expr: |
            histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{namespace="elsa-workflows"}[5m])) > 2
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Elsa Server high response time"
            description: "95th percentile response time is {{ $value }} seconds"
```

### Grafana Dashboard

Create a comprehensive Grafana dashboard for Elsa Workflows:

```yaml
# monitoring/elsa-dashboard-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-grafana-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  elsa-workflows.json: |
    {
      "dashboard": {
        "title": "Elsa Workflows",
        "timezone": "browser",
        "schemaVersion": 16,
        "refresh": "30s",
        "panels": [
          {
            "title": "Request Rate",
            "targets": [
              {
                "expr": "rate(http_requests_total{namespace=\"elsa-workflows\"}[5m])",
                "legendFormat": "{{pod}}"
              }
            ],
            "type": "graph"
          },
          {
            "title": "Response Time (95th Percentile)",
            "targets": [
              {
                "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{namespace=\"elsa-workflows\"}[5m]))",
                "legendFormat": "{{pod}}"
              }
            ],
            "type": "graph"
          },
          {
            "title": "CPU Usage",
            "targets": [
              {
                "expr": "rate(container_cpu_usage_seconds_total{namespace=\"elsa-workflows\"}[5m])",
                "legendFormat": "{{pod}}"
              }
            ],
            "type": "graph"
          },
          {
            "title": "Memory Usage",
            "targets": [
              {
                "expr": "container_memory_working_set_bytes{namespace=\"elsa-workflows\"} / 1024 / 1024",
                "legendFormat": "{{pod}}"
              }
            ],
            "type": "graph"
          },
          {
            "title": "Active Workflows",
            "targets": [
              {
                "expr": "elsa_active_workflows_total{namespace=\"elsa-workflows\"}",
                "legendFormat": "{{pod}}"
              }
            ],
            "type": "stat"
          },
          {
            "title": "Workflow Execution Rate",
            "targets": [
              {
                "expr": "rate(elsa_workflow_executions_total{namespace=\"elsa-workflows\"}[5m])",
                "legendFormat": "{{status}}"
              }
            ],
            "type": "graph"
          },
          {
            "title": "Database Connection Pool",
            "targets": [
              {
                "expr": "elsa_database_connections_active{namespace=\"elsa-workflows\"}",
                "legendFormat": "Active"
              },
              {
                "expr": "elsa_database_connections_idle{namespace=\"elsa-workflows\"}",
                "legendFormat": "Idle"
              }
            ],
            "type": "graph"
          },
          {
            "title": "Pod Status",
            "targets": [
              {
                "expr": "kube_pod_status_phase{namespace=\"elsa-workflows\"}",
                "legendFormat": "{{pod}} - {{phase}}"
              }
            ],
            "type": "table"
          }
        ]
      }
    }
```

### Custom Metrics in Elsa

To expose custom metrics from your Elsa Server, configure Prometheus metrics in `Program.cs`:

```csharp
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

// Configure Elsa
builder.Services.AddElsa(elsa =>
{
    elsa.UseWorkflowManagement();
    elsa.UseWorkflowRuntime();
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

// Enable Prometheus metrics endpoint
app.UseMetricServer();  // Exposes /metrics endpoint
app.UseHttpMetrics();   // Collect HTTP metrics

app.UseWorkflowsApi();
app.Run();
```

### Accessing Grafana

```bash
# Port-forward Grafana service
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# Access Grafana at http://localhost:3000
# Default credentials: admin / admin (or password set during installation)
```

### Key Metrics to Monitor

| Metric                                     | Description                | Alert Threshold |
| ------------------------------------------ | -------------------------- | --------------- |
| `http_requests_total`                      | Total HTTP requests        | -               |
| `http_request_duration_seconds`            | Request latency            | P95 > 2s        |
| `elsa_workflow_executions_total`           | Workflow executions        | -               |
| `elsa_workflow_execution_failed_total`     | Failed workflows           | Rate > 0.5/s    |
| `elsa_active_workflows_total`              | Currently active workflows | -               |
| `elsa_database_connections_active`         | Active DB connections      | > 90% of pool   |
| `container_cpu_usage_seconds_total`        | CPU usage                  | > 80%           |
| `container_memory_working_set_bytes`       | Memory usage               | > 90% of limit  |
| `kube_pod_container_status_restarts_total` | Pod restarts               | > 0 in 15min    |

## Service Mesh Integration

Service meshes provide advanced traffic management, security, and observability features. This section covers integration with Istio and Linkerd.

### Istio Integration

#### Prerequisites

```bash
# Download and install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install Istio with demo profile
istioctl install --set profile=demo -y

# Enable sidecar injection for elsa-workflows namespace
kubectl label namespace elsa-workflows istio-injection=enabled
```

#### Gateway Configuration

```yaml
# istio/gateway.yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: elsa-gateway
  namespace: elsa-workflows
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 443
        name: https
        protocol: HTTPS
      tls:
        mode: SIMPLE
        credentialName: elsa-tls
      hosts:
        - studio.example.com
        - api.example.com
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts:
        - studio.example.com
        - api.example.com
      tls:
        httpsRedirect: true
```

#### VirtualService Configuration

```yaml
# istio/virtualservice.yaml
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: elsa-studio
  namespace: elsa-workflows
spec:
  hosts:
    - studio.example.com
  gateways:
    - elsa-gateway
  http:
    - match:
        - uri:
            prefix: /
      route:
        - destination:
            host: elsa-studio
            port:
              number: 80
          weight: 100
      timeout: 30s
      retries:
        attempts: 3
        perTryTimeout: 10s
        retryOn: 5xx,reset,connect-failure,refused-stream

---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: elsa-server
  namespace: elsa-workflows
spec:
  hosts:
    - api.example.com
  gateways:
    - elsa-gateway
  http:
    - match:
        - uri:
            prefix: /
      route:
        - destination:
            host: elsa-server
            port:
              number: 80
          weight: 100
      timeout: 60s
      retries:
        attempts: 3
        perTryTimeout: 20s
        retryOn: 5xx,reset,connect-failure,refused-stream
```

#### DestinationRule for Circuit Breaking

```yaml
# istio/destinationrule.yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: elsa-server
  namespace: elsa-workflows
spec:
  host: elsa-server
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 1000
      http:
        http1MaxPendingRequests: 1000
        http2MaxRequests: 1000
        maxRequestsPerConnection: 2
    loadBalancer:
      simple: LEAST_REQUEST
    outlierDetection:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
      minHealthPercent: 40
```

#### PeerAuthentication for mTLS

```yaml
# istio/peerauthentication.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: elsa-workflows
spec:
  mtls:
    mode: STRICT
```

#### AuthorizationPolicy

```yaml
# istio/authorizationpolicy.yaml
---
# Allow traffic from ingress to services
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-ingress
  namespace: elsa-workflows
spec:
  selector:
    matchLabels:
      app: elsa-server
  action: ALLOW
  rules:
    - from:
        - source:
            namespaces: ["istio-system"]

---
# Deny all by default, then allow specific paths
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: elsa-server-authz
  namespace: elsa-workflows
spec:
  selector:
    matchLabels:
      app: elsa-server
  action: ALLOW
  rules:
    - to:
        - operation:
            methods: ["GET", "POST", "PUT", "DELETE"]
            paths: ["/elsa/api/*", "/health/*", "/metrics"]
```

### Linkerd Integration

#### Installation

```bash
# Install Linkerd CLI
curl -sL https://run.linkerd.io/install | sh
export PATH=$PATH:$HOME/.linkerd2/bin

# Verify cluster compatibility
linkerd check --pre

# Install Linkerd control plane
linkerd install | kubectl apply -f -

# Verify installation
linkerd check

# Install Linkerd Viz for observability
linkerd viz install | kubectl apply -f -
```

#### Mesh Elsa Workflows Namespace

```bash
# Inject Linkerd sidecar into existing deployments
kubectl get deploy -n elsa-workflows -o yaml | \
  linkerd inject - | \
  kubectl apply -f -

# Or annotate namespace for automatic injection
kubectl annotate namespace elsa-workflows linkerd.io/inject=enabled
```

#### Traffic Split for Canary Deployments

```yaml
# linkerd/trafficsplit.yaml
apiVersion: split.smi-spec.io/v1alpha1
kind: TrafficSplit
metadata:
  name: elsa-server-split
  namespace: elsa-workflows
spec:
  service: elsa-server
  backends:
    - service: elsa-server-stable
      weight: 90
    - service: elsa-server-canary
      weight: 10
```

#### ServiceProfile for Advanced Metrics

```yaml
# linkerd/serviceprofile.yaml
apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: elsa-server.elsa-workflows.svc.cluster.local
  namespace: elsa-workflows
spec:
  routes:
    - name: POST /elsa/api/workflows
      condition:
        method: POST
        pathRegex: /elsa/api/workflows
      timeout: 30s
      retries:
        limit: 3
        timeout: 10s
    
    - name: GET /elsa/api/workflows
      condition:
        method: GET
        pathRegex: /elsa/api/workflows.*
      timeout: 10s
    
    - name: Health Check
      condition:
        pathRegex: /health.*
      isRetryable: true
```

#### Rate Limiting with Linkerd

```yaml
# linkerd/ratelimit.yaml
apiVersion: policy.linkerd.io/v1alpha1
kind: HTTPRoute
metadata:
  name: elsa-server-ratelimit
  namespace: elsa-workflows
spec:
  parentRefs:
    - name: elsa-server
      kind: Service
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /elsa/api
      filters:
        - type: RequestHeaderModifier
          requestHeaderModifier:
            add:
              - name: X-RateLimit-Limit
                value: "100"
```

### Observability with Service Mesh

#### Istio Dashboard

```bash
# Access Kiali dashboard
istioctl dashboard kiali

# Access Jaeger for distributed tracing
istioctl dashboard jaeger

# Access Prometheus
istioctl dashboard prometheus

# Access Grafana
istioctl dashboard grafana
```

#### Linkerd Dashboard

```bash
# Access Linkerd dashboard
linkerd viz dashboard

# View traffic metrics
linkerd viz stat deploy -n elsa-workflows

# View route metrics
linkerd viz routes deploy/elsa-server -n elsa-workflows

# Tap live traffic (for debugging)
linkerd viz tap deploy/elsa-server -n elsa-workflows
```

### Comparison: Istio vs Linkerd

| Feature                | Istio                     | Linkerd                  |
| ---------------------- | ------------------------- | ------------------------ |
| **Learning Curve**     | Steep                     | Gentle                   |
| **Resource Usage**     | Higher (Envoy proxy)      | Lower (Linkerd2-proxy)   |
| **Features**           | Comprehensive             | Focused                  |
| **Traffic Management** | Advanced                  | Basic                    |
| **Security**           | mTLS, AuthZ policies      | mTLS, policy             |
| **Observability**      | Prometheus, Jaeger, Kiali | Prometheus, built-in viz |
| **Performance**        | Good                      | Excellent                |
| **Best For**           | Complex environments      | Simplicity, performance  |

### Service Mesh Best Practices

1. **Start Simple**: Begin without a service mesh and add it when needed
2. **Resource Planning**: Allocate extra resources for sidecar proxies (\~50-100Mi RAM, 0.1 CPU per pod)
3. **Gradual Rollout**: Enable mesh incrementally, namespace by namespace
4. **Monitor Performance**: Watch for latency increases due to proxy overhead
5. **Use mTLS**: Enable mutual TLS for secure pod-to-pod communication
6. **Circuit Breaking**: Configure circuit breakers to prevent cascade failures
7. **Observability**: Leverage built-in tracing and metrics
8. **Test Thoroughly**: Test failure scenarios with chaos engineering

## Distributed Configuration

For Kubernetes deployments with multiple replicas, proper distributed configuration is essential. Reference the [Distributed Hosting](../hosting/distributed-hosting.md) guide for detailed configuration.

### Distributed Runtime Configuration

Configure distributed workflow runtime in your Elsa Server:

```csharp
// Program.cs or Startup.cs
using Elsa.Extensions;
using Elsa.DistributedLocking.Extensions;
using Medallion.Threading.Postgres;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    // Configure distributed workflow runtime
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseDistributedRuntime();
        
        // Configure distributed locking with PostgreSQL
        runtime.DistributedLockProvider = serviceProvider => 
            new PostgresDistributedSynchronizationProvider(
                builder.Configuration.GetConnectionString("PostgreSql"),
                options =>
                {
                    options.KeepaliveCadence(TimeSpan.FromMinutes(5));
                    options.UseMultiplexing();
                });
    });
    
    // Configure distributed caching with MassTransit
    elsa.UseDistributedCache(distributedCaching =>
    {
        distributedCaching.UseMassTransit();
    });
    
    // Configure MassTransit with RabbitMQ
    elsa.UseMassTransit(massTransit =>
    {
        massTransit.UseRabbitMq(
            builder.Configuration.GetConnectionString("RabbitMq"),
            rabbit =>
            {
                rabbit.ConfigureTransportBus = (context, bus) =>
                {
                    bus.PrefetchCount = 50;
                    bus.Durable = true;
                    bus.AutoDelete = false;
                    bus.ConcurrentMessageLimit = 32;
                };
            });
    });
    
    // Configure Quartz.NET with PostgreSQL for distributed scheduling
    elsa.UseScheduling(scheduling =>
    {
        scheduling.UseQuartzScheduler();
    });
});

// Configure Quartz with persistent store
builder.Services.AddQuartz(quartz =>
{
    quartz.UsePostgreSql(builder.Configuration.GetConnectionString("PostgreSql"));
});

var app = builder.Build();
app.Run();
```

### Environment-Based Configuration

Use Kubernetes ConfigMaps and Secrets for environment-specific settings:

```yaml
# distributed-config-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: elsa-distributed-config
  namespace: elsa-workflows
data:
  # Elsa Configuration
  ELSA__RUNTIME__TYPE: "Distributed"
  ELSA__CACHING__TYPE: "Distributed"
  ELSA__LOCKING__PROVIDER: "PostgreSQL"
  
  # MassTransit Configuration
  MASSTRANSIT__TRANSPORT: "RabbitMq"
  MASSTRANSIT__PREFETCHCOUNT: "50"
  
  # Quartz Configuration
  QUARTZ__CLUSTERED: "true"
  QUARTZ__INSTANCENAME: "ElsaQuartzCluster"
  
  # Performance Tuning
  ASPNETCORE__KESTREL__LIMITS__MAXCONCURRENTCONNECTIONS: "1000"
  ASPNETCORE__KESTREL__LIMITS__MAXREQUESTBODYSIZE: "10485760"
```

Apply to deployment:

```yaml
# Add to elsa-server deployment
spec:
  template:
    spec:
      containers:
        - name: elsa-server
          envFrom:
            - configMapRef:
                name: elsa-distributed-config
            - secretRef:
                name: elsa-secrets
```

### Redis Configuration for Caching

Deploy Redis for distributed caching:

```yaml
# redis/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elsa-redis
  namespace: elsa-workflows
spec:
  serviceName: elsa-redis
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          command:
            - redis-server
            - --appendonly
            - "yes"
            - --maxmemory
            - "1gb"
            - --maxmemory-policy
            - "allkeys-lru"
          ports:
            - containerPort: 6379
              name: redis
          volumeMounts:
            - name: data
              mountPath: /data
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

## Troubleshooting

Common issues and their solutions when deploying Elsa to Kubernetes.

### Pod Issues

#### Pods Not Starting

**Symptom**: Pods stuck in `Pending` or `ImagePullBackOff` state

```bash
# Check pod status
kubectl describe pod <pod-name> -n elsa-workflows

# Common issues and solutions:
```

**Solution 1: Insufficient Resources**

```bash
# Check node resources
kubectl top nodes

# Check resource requests
kubectl describe node <node-name>

# Solution: Scale cluster or reduce resource requests
```

**Solution 2: Image Pull Issues**

```bash
# Check image pull secrets
kubectl get secrets -n elsa-workflows

# Create image pull secret if needed
kubectl create secret docker-registry regcred \
  --docker-server=<registry-server> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email> \
  -n elsa-workflows

# Add to deployment
spec:
  template:
    spec:
      imagePullSecrets:
        - name: regcred
```

#### Pods Crashing (CrashLoopBackOff)

**Symptom**: Pods repeatedly restarting

```bash
# View logs
kubectl logs <pod-name> -n elsa-workflows --previous

# Check events
kubectl get events -n elsa-workflows --sort-by='.lastTimestamp'
```

**Common Causes:**

1. **Database Connection Issues**

```bash
# Test database connectivity
kubectl run -it --rm debug --image=postgres:16-alpine --restart=Never -- \
  psql -h elsa-postgresql -U elsa -d elsa

# Check connection string in secrets
kubectl get secret elsa-secrets -n elsa-workflows -o jsonpath='{.data.postgresql-connection-string}' | base64 -d
```

2. **Missing Dependencies**

```bash
# Check if Redis/RabbitMQ are running
kubectl get pods -n elsa-workflows

# Check service endpoints
kubectl get endpoints -n elsa-workflows
```

3. **Configuration Errors**

```bash
# Validate ConfigMaps and Secrets
kubectl get configmap elsa-config -n elsa-workflows -o yaml
kubectl get secret elsa-secrets -n elsa-workflows -o yaml
```

### Database Issues

#### Migration Failures

**Symptom**: Elsa Server fails to start due to database migration errors

```bash
# Run migrations manually using a Job
kubectl apply -f - <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: elsa-db-migration
  namespace: elsa-workflows
spec:
  template:
    spec:
      containers:
        - name: migration
          image: elsaworkflows/elsa-server-v3-5:latest
          command: ["/bin/sh", "-c"]
          args:
            - |
              dotnet ef database update
          env:
            - name: CONNECTIONSTRINGS__POSTGRESQL
              valueFrom:
                secretKeyRef:
                  name: elsa-secrets
                  key: postgresql-connection-string
      restartPolicy: Never
  backoffLimit: 3
EOF

# Check job logs
kubectl logs job/elsa-db-migration -n elsa-workflows
```

#### Connection Pool Exhaustion

**Symptom**: "Timeout expired" or "Too many connections" errors

```bash
# Check current connections
kubectl exec -it elsa-postgresql-0 -n elsa-workflows -- \
  psql -U elsa -d elsa -c "SELECT count(*) FROM pg_stat_activity;"

# Solution: Increase max_connections or connection pool size
# Update PostgreSQL configuration
kubectl edit statefulset elsa-postgresql -n elsa-workflows

# Or use PgBouncer (see Database Configuration section)
```

### Network Issues

#### Service Not Accessible

**Symptom**: Cannot reach Elsa services from outside cluster

```bash
# Check service
kubectl get svc -n elsa-workflows

# Check endpoints
kubectl get endpoints elsa-server -n elsa-workflows

# Check ingress
kubectl get ingress -n elsa-workflows
kubectl describe ingress elsa-ingress -n elsa-workflows

# Test internal connectivity
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://elsa-server.elsa-workflows.svc.cluster.local/health
```

**Solution: DNS Issues**

```bash
# Test DNS resolution
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  nslookup elsa-server.elsa-workflows.svc.cluster.local

# Check CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns
```

#### Ingress Not Working

```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress class
kubectl get ingressclass

# Verify TLS certificate
kubectl get certificate -n elsa-workflows
kubectl describe certificate elsa-tls -n elsa-workflows

# Check cert-manager logs if using Let's Encrypt
kubectl logs -n cert-manager deployment/cert-manager
```

### Performance Issues

#### High Latency

```bash
# Check pod metrics
kubectl top pods -n elsa-workflows

# Check HPA status
kubectl get hpa -n elsa-workflows

# View detailed metrics
kubectl describe hpa elsa-server-hpa -n elsa-workflows
```

**Solutions:**

* Increase replica count
* Optimize database queries
* Add caching layer
* Review resource limits

#### Memory Leaks

```bash
# Monitor memory usage over time
kubectl top pod <pod-name> -n elsa-workflows --containers

# Get heap dump (if .NET diagnostics enabled)
kubectl exec -it <pod-name> -n elsa-workflows -- \
  dotnet-dump collect --process-id 1
```

### Distributed Configuration Issues

#### Lock Acquisition Failures

**Symptom**: "Failed to acquire lock" errors in logs

```bash
# Check distributed lock table in database
kubectl exec -it elsa-postgresql-0 -n elsa-workflows -- \
  psql -U elsa -d elsa -c "SELECT * FROM distributed_locks;"

# Clear stale locks (use with caution)
kubectl exec -it elsa-postgresql-0 -n elsa-workflows -- \
  psql -U elsa -d elsa -c "DELETE FROM distributed_locks WHERE acquired_at < NOW() - INTERVAL '1 hour';"
```

#### Cache Invalidation Issues

**Symptom**: Stale data across pods

```bash
# Check RabbitMQ queues
kubectl exec -it elsa-rabbitmq-0 -n elsa-workflows -- rabbitmqctl list_queues

# Verify MassTransit configuration
kubectl logs <elsa-server-pod> -n elsa-workflows | grep -i masstransit

# Restart all pods to force cache refresh
kubectl rollout restart deployment/elsa-server -n elsa-workflows
```

### Debugging Commands

```bash
# Get all resources in namespace
kubectl get all -n elsa-workflows

# Describe all pods
kubectl describe pods -n elsa-workflows

# View logs from all pods
kubectl logs -n elsa-workflows -l app=elsa-server --tail=100

# Follow logs in real-time
kubectl logs -f <pod-name> -n elsa-workflows

# Execute commands in pod
kubectl exec -it <pod-name> -n elsa-workflows -- /bin/sh

# Port-forward for local access
kubectl port-forward svc/elsa-server 8080:80 -n elsa-workflows

# Get resource usage
kubectl top pods -n elsa-workflows
kubectl top nodes

# Check cluster events
kubectl get events -n elsa-workflows --sort-by='.lastTimestamp'

# Validate YAML before applying
kubectl apply --dry-run=client -f deployment.yaml

# Explain resource fields
kubectl explain deployment.spec.template.spec.containers
```

## Production Best Practices

Follow these best practices for reliable, secure, and performant Kubernetes deployments.

### Security

#### 1. Use Non-Root Containers

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  capabilities:
    drop:
      - ALL
  readOnlyRootFilesystem: false  # Set to true if possible
```

#### 2. Network Policies

Restrict pod-to-pod communication:

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: elsa-server-netpol
  namespace: elsa-workflows
spec:
  podSelector:
    matchLabels:
      app: elsa-server
  policyTypes:
    - Ingress
    - Egress
  ingress:
    # Allow from ingress controller
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 8080
    # Allow from Studio
    - from:
        - podSelector:
            matchLabels:
              app: elsa-studio
      ports:
        - protocol: TCP
          port: 8080
  egress:
    # Allow to database
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - protocol: TCP
          port: 5432
    # Allow to Redis
    - to:
        - podSelector:
            matchLabels:
              app: redis
      ports:
        - protocol: TCP
          port: 6379
    # Allow to RabbitMQ
    - to:
        - podSelector:
            matchLabels:
              app: rabbitmq
      ports:
        - protocol: TCP
          port: 5672
    # Allow DNS
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53
```

#### 3. Secrets Management

Use external secret management:

```yaml
# external-secrets-operator example
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
  namespace: elsa-workflows
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: elsa-server

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: elsa-secrets
  namespace: elsa-workflows
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: elsa-secrets
    creationPolicy: Owner
  data:
    - secretKey: postgresql-connection-string
      remoteRef:
        key: elsa/production/database
        property: connection-string
```

#### 4. RBAC Configuration

```yaml
# rbac.yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: elsa-server
  namespace: elsa-workflows

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: elsa-server-role
  namespace: elsa-workflows
rules:
  - apiGroups: [""]
    resources: ["configmaps", "secrets"]
    verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: elsa-server-rolebinding
  namespace: elsa-workflows
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: elsa-server-role
subjects:
  - kind: ServiceAccount
    name: elsa-server
    namespace: elsa-workflows
```

### High Availability

#### 1. Multi-Zone Deployment

```yaml
spec:
  template:
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - elsa-server
              topologyKey: topology.kubernetes.io/zone
```

#### 2. Pod Disruption Budgets

Ensure minimum availability during disruptions:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: elsa-server-pdb
  namespace: elsa-workflows
spec:
  minAvailable: 2  # or maxUnavailable: 1
  selector:
    matchLabels:
      app: elsa-server
```

#### 3. Health Checks

Configure appropriate health checks:

```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 20
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3

startupProbe:
  httpGet:
    path: /health/startup
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 5
  failureThreshold: 30  # Allow up to 150s for startup
```

### Resource Management

#### 1. Set Resource Requests and Limits

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "2000m"
```

#### 2. Quality of Service Classes

* **Guaranteed**: requests == limits (highest priority)
* **Burstable**: requests < limits (medium priority)
* **BestEffort**: no requests/limits (lowest priority)

#### 3. Limit Ranges

```yaml
# limitrange.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: elsa-limits
  namespace: elsa-workflows
spec:
  limits:
    - max:
        memory: "4Gi"
        cpu: "4000m"
      min:
        memory: "256Mi"
        cpu: "250m"
      default:
        memory: "1Gi"
        cpu: "1000m"
      defaultRequest:
        memory: "512Mi"
        cpu: "500m"
      type: Container
```

### Backup and Disaster Recovery

#### 1. Regular Backups

```bash
# Backup script example
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Database backup
kubectl exec -n elsa-workflows elsa-postgresql-0 -- \
  pg_dump -U elsa elsa | gzip > backup_${TIMESTAMP}.sql.gz

# Upload to S3
aws s3 cp backup_${TIMESTAMP}.sql.gz s3://your-bucket/backups/

# Kubernetes resource backup
kubectl get all,configmap,secret,pvc,ingress -n elsa-workflows -o yaml > \
  k8s_backup_${TIMESTAMP}.yaml
```

#### 2. Velero for Cluster Backups

```bash
# Install Velero
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.8.0 \
  --bucket velero-backups \
  --backup-location-config region=us-east-1 \
  --snapshot-location-config region=us-east-1

# Create backup schedule
velero schedule create elsa-daily \
  --schedule="0 2 * * *" \
  --include-namespaces elsa-workflows

# List available backups
velero backup get

# Restore from a specific backup
velero restore create --from-backup <backup-name>
```

### Monitoring and Alerting

#### 1. Define SLIs/SLOs

| Service     | SLI                  | SLO      |
| ----------- | -------------------- | -------- |
| Elsa Server | Request Success Rate | > 99.9%  |
| Elsa Server | P95 Latency          | < 500ms  |
| Elsa Server | Availability         | > 99.95% |
| Database    | Connection Success   | > 99.99% |

#### 2. Alert on SLO Violations

```yaml
# prometheus-rules.yaml
- alert: SLOViolation-SuccessRate
  expr: |
    (
      sum(rate(http_requests_total{namespace="elsa-workflows",code=~"2.."}[5m]))
      /
      sum(rate(http_requests_total{namespace="elsa-workflows"}[5m]))
    ) < 0.999
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Success rate below SLO (99.9%)"
```

### Cost Optimization

#### 1. Right-Size Resources

```bash
# Use VPA recommendations
kubectl describe vpa elsa-server-vpa -n elsa-workflows

# Monitor actual usage
kubectl top pods -n elsa-workflows --containers
```

#### 2. Use Spot/Preemptible Instances

```yaml
# Node affinity for spot instances
spec:
  template:
    spec:
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              preference:
                matchExpressions:
                  - key: node.kubernetes.io/lifecycle
                    operator: In
                    values:
                      - spot
```

#### 3. Enable Cluster Autoscaler

```bash
# AWS example
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

### CI/CD Integration

#### 1. GitOps with ArgoCD

```yaml
# argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: elsa-workflows
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/elsa-k8s
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: elsa-workflows
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

#### 2. CI Pipeline Example

```yaml
# .github/workflows/deploy.yaml
name: Deploy to Kubernetes
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
      
      - name: Deploy
        run: |
          kubectl apply -f k8s/
          kubectl rollout status deployment/elsa-server -n elsa-workflows
```

## Next Steps

After deploying Elsa Workflows to Kubernetes:

1. **Configure Monitoring**: Set up Grafana dashboards and alerts
2. **Test Failure Scenarios**: Use chaos engineering tools like Chaos Mesh
3. **Optimize Performance**: Profile and tune based on your workload
4. **Implement Backups**: Set up automated backup and restore procedures
5. **Security Hardening**: Implement network policies, RBAC, and secret rotation
6. **Documentation**: Document your specific configuration and runbooks

## Related Resources

* [Distributed Hosting Guide](../hosting/distributed-hosting.md) - Configure distributed runtime
* [Database Configuration](../getting-started/database-configuration.md) - Database setup details
* [Authentication Guide](authentication.md) - Secure your deployment
* [Docker Compose Guide](../getting-started/containers/docker-compose/docker-quickstart.md) - Local testing
* [Elsa Server Application Type](../application-types/elsa-server.md) - Server configuration
* [Elsa Studio Application Type](../application-types/elsa-studio.md) - Studio configuration

## Community and Support

* [Elsa Workflows GitHub](https://github.com/elsa-workflows/elsa-core)
* [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
* [GitHub Issues](https://github.com/elsa-workflows/elsa-core/issues)
* Join the community on Discord or Slack

## Version Information

This guide is written for:

* **Elsa Workflows**: v3.5+
* **Kubernetes**: v1.28+
* **Helm**: v3.12+
* **PostgreSQL**: 16+
* **Redis**: 7+
* **RabbitMQ**: 3.12+

Always refer to the [official releases](https://github.com/elsa-workflows/elsa-core/releases) for the latest version compatibility information.

***

**Last Updated**: 2025-11-20
