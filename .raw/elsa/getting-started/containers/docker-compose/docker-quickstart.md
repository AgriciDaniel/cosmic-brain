---
description: >-
  Get started quickly with Elsa Workflows using Docker Compose. This guide provides
  a fast path to evaluation with a complete setup including Elsa Server, Studio, and
  database persistence.
---

# Docker Quickstart

This quickstart guide helps you get Elsa Workflows up and running in minutes using Docker Compose. It's designed for evaluation, development, and learning purposes.

## Prerequisites

Before you begin, ensure you have:

* Docker Desktop (Windows/Mac) or Docker Engine (Linux) installed
* Docker Compose V2 or later
* At least 4GB of available RAM
* Ports 14000 and 5432 (if using PostgreSQL) available on your host machine

{% hint style="info" %}
**New to Docker?**

Visit the [Docker Prerequisites](../../prerequisites.md) page for installation instructions.
{% endhint %}

## Quick Start

### Option 1: SQLite (Simplest)

For the fastest start with minimal dependencies, use SQLite. This is perfect for evaluation and development.

Create a file named `docker-compose.yml` with the following content:

```yaml
services:
  elsa-server-and-studio:
    image: elsaworkflows/elsa-server-and-studio-v3-5:latest
    pull_policy: always
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      HTTP_PORTS: 8080
      HTTP__BASEURL: http://localhost:14000
      DATABASEPROVIDER: Sqlite
      CONNECTIONSTRINGS__SQLITE: Data Source=/data/elsa.db;Cache=Shared
    ports:
      - "14000:8080"
    volumes:
      - elsa-data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  elsa-data:
    driver: local
```

Start the services:

```bash
docker compose up -d
```

Wait a few seconds for the services to start, then access Elsa Studio at [http://localhost:14000](http://localhost:14000/).

{% hint style="success" %}
**Default Credentials**

* Username: `admin`
* Password: `password`

Change these in production environments!
{% endhint %}

### Option 2: PostgreSQL (Production-Ready)

For production-like evaluation with a robust database, use PostgreSQL:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    command: -c 'max_connections=200'
    environment:
      POSTGRES_USER: elsa
      POSTGRES_PASSWORD: elsa_password_change_me
      POSTGRES_DB: elsa
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --lc-collate=en_US.utf8 --lc-ctype=en_US.utf8"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    # ports:
    #   - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U elsa"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  elsa-server-and-studio:
    image: elsaworkflows/elsa-server-and-studio-v3-5:latest
    pull_policy: always
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      HTTP_PORTS: 8080
      HTTP__BASEURL: http://localhost:14000
      DATABASEPROVIDER: PostgreSql
      CONNECTIONSTRINGS__POSTGRESQL: "Server=postgres;Username=elsa;Database=elsa;Port=5432;Password=elsa_password_change_me;SSLMode=Prefer;MaxPoolSize=100;Timeout=60"
    ports:
      - "14000:8080"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

volumes:
  postgres-data:
    driver: local
```

Start the services:

```bash
docker-compose up -d
```

Monitor the startup progress:

```bash
docker-compose logs -f
```

Once both services report healthy status, access Elsa Studio at [http://localhost:14000](http://localhost:14000/).

## Environment Variables Reference

### Core Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ASPNETCORE_ENVIRONMENT` | ASP.NET Core environment (Development, Staging, Production) | - | Yes |
| `HTTP_PORTS` | Internal HTTP port for the container | `8080` | Yes |
| `HTTP__BASEURL` | External base URL for the application | - | Yes |

### Database Configuration

| Variable | Description | Options | Required |
|----------|-------------|---------|----------|
| `DATABASEPROVIDER` | Database provider to use | `Sqlite`, `PostgreSql`, `SqlServer`, `MySql` | Yes |
| `CONNECTIONSTRINGS__SQLITE` | SQLite connection string | `Data Source=/app/elsa.db;Cache=Shared` | If using SQLite |
| `CONNECTIONSTRINGS__POSTGRESQL` | PostgreSQL connection string | See example above | If using PostgreSQL |
| `CONNECTIONSTRINGS__SQLSERVER` | SQL Server connection string | `Server=...` | If using SQL Server |
| `CONNECTIONSTRINGS__MYSQL` | MySQL connection string | `Server=...` | If using MySQL |

### Optional Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `ASPNETCORE_URLS` | URLs the application listens on | `http://+:8080` |
| `Logging__LogLevel__Default` | Default log level | `Information` |
| `Logging__LogLevel__Microsoft` | Microsoft framework log level | `Warning` |
| `CORS__AllowedOrigins__0` | CORS allowed origins | `*` (Development) |

## Health Checks

Both configurations include health checks to ensure services are ready:

**Elsa Server Health Check**:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s      # Check every 30 seconds
  timeout: 10s       # Timeout after 10 seconds
  retries: 3         # Retry 3 times before marking unhealthy
  start_period: 40s  # Grace period during startup
```

**PostgreSQL Health Check**:
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U elsa"]
  interval: 10s
  timeout: 5s
  retries: 5
```

Check health status:

```bash
docker-compose ps
```

## Common Operations

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f elsa-server-and-studio

# Last 100 lines
docker-compose logs --tail=100
```

### Stop Services

```bash
# Stop without removing containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, and delete volumes (⚠️ data loss!)
docker-compose down -v
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart elsa-server-and-studio
```

### Update to Latest Version

```bash
# Pull latest images
docker-compose pull

# Recreate containers with new images
docker-compose up -d
```

## Troubleshooting

### Service Won't Start

**Symptom**: Container exits immediately after starting

**Solutions**:
1. Check logs for specific errors:
   ```bash
   docker-compose logs elsa-server-and-studio
   ```

2. Verify port availability:
   ```bash
   # Windows
   netstat -ano | findstr :14000
   
   # Linux/Mac
   lsof -i :14000
   ```

3. Ensure sufficient resources (RAM, disk space)

### Database Connection Failed

**Symptom**: Elsa can't connect to PostgreSQL

**Solutions**:
1. Verify PostgreSQL is healthy:
   ```bash
   docker-compose ps postgres
   ```

2. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify connection string matches PostgreSQL credentials

4. Wait for PostgreSQL to be fully initialized (can take 10-30 seconds on first start)

### Cannot Access Studio

**Symptom**: Browser can't reach http://localhost:14000

**Solutions**:
1. Verify service is running:
   ```bash
   docker-compose ps
   ```

2. Check if port is correctly mapped:
   ```bash
   docker-compose port elsa-server-and-studio 8080
   ```

3. Try accessing using container IP:
   ```bash
   docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>
   ```

4. Check firewall settings blocking port 14000

### Performance Issues

**Symptom**: Slow response times or high memory usage

**Solutions**:
1. Allocate more resources in Docker Desktop settings (recommended: 4GB+ RAM)

2. Reduce PostgreSQL max_connections if memory constrained:
   ```yaml
   command: -c 'max_connections=100'
   ```

3. Check container resource usage:
   ```bash
   docker stats
   ```

### Data Persistence Issues

**Symptom**: Workflows or data lost after restart

**Solutions**:
1. Verify volumes are correctly configured:
   ```bash
   docker volume ls
   ```

2. Check volume mounts:
   ```bash
   docker inspect <container_name>
   ```

3. Don't use `docker-compose down -v` unless you want to delete data

### Authentication Problems

**Symptom**: Can't log in with default credentials

**Solutions**:
1. Ensure you're using:
   - Username: `admin`
   - Password: `password`

2. Clear browser cache and cookies

3. Try incognito/private browsing mode

4. Check Elsa logs for authentication errors

## Production Considerations

{% hint style="warning" %}
**This configuration is designed for evaluation and development. For production deployments, consider the following:**
{% endhint %}

### Security

1. **Change Default Credentials**: Never use default admin credentials in production
2. **Use Strong Passwords**: For both Elsa and database users
3. **Enable HTTPS**: Configure TLS/SSL certificates
4. **Restrict Database Access**: Don't expose database ports publicly
5. **Use Secrets Management**: Store sensitive data in Docker secrets or environment-specific vaults
6. **Configure CORS Properly**: Restrict allowed origins to known domains

Example with secrets:
```yaml
services:
  postgres:
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password
    secrets:
      - postgres_password

secrets:
  postgres_password:
    file: ./secrets/postgres_password.txt
```

### Scalability

1. **Use External Database**: Host database outside Docker for better performance and reliability
2. **Load Balancing**: Deploy multiple Elsa instances behind a load balancer
3. **Connection Pooling**: Adjust MaxPoolSize based on load
4. **Resource Limits**: Configure CPU and memory limits:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 2G
       reservations:
         cpus: '1'
         memory: 1G
   ```

### Reliability

1. **Regular Backups**: Implement automated database backups
   > **Note:** The following command uses Unix/Linux shell syntax. For Windows users, see the PowerShell alternative below.
   ```bash
   # PostgreSQL backup example (Unix/Linux/macOS)
   docker-compose exec postgres pg_dump -U elsa elsa > backup_$(date +%Y%m%d).sql

2. **Monitoring**: Integrate with monitoring solutions (Prometheus, Grafana, etc.)
3. **Logging**: Configure centralized logging (ELK stack, Loki, etc.)
4. **Health Checks**: Keep health checks enabled and configure orchestrator accordingly
5. **Update Strategy**: Plan for zero-downtime updates

### Database Performance

1. **Optimize PostgreSQL Configuration**:
   ```yaml
   command: >
     -c 'max_connections=200'
     -c 'shared_buffers=256MB'
     -c 'effective_cache_size=1GB'
     -c 'maintenance_work_mem=64MB'
     -c 'checkpoint_completion_target=0.9'
     -c 'wal_buffers=16MB'
     -c 'default_statistics_target=100'
     -c 'random_page_cost=1.1'
   ```

2. **Regular Maintenance**: Schedule VACUUM and ANALYZE operations
3. **Monitor Query Performance**: Use pg_stat_statements extension

### Data Management

1. **Volume Backups**: Regularly backup Docker volumes
   ```bash
   docker run --rm -v postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-data-backup.tar.gz -C /data .

2. **Retention Policies**: Configure workflow and log retention
3. **Archival Strategy**: Move old workflows to cold storage

## Next Steps

Now that you have Elsa running:

1. **Explore the Studio**: Navigate to [http://localhost:14000](http://localhost:14000/) and explore the interface
2. **Create Your First Workflow**: Follow the [Hello World](../../hello-world.md) tutorial
3. **Learn Key Concepts**: Read about [Workflows, Activities, and Triggers](../../concepts/README.md)
4. **Try HTTP Workflows**: Build REST APIs using [HTTP Workflows](../../../guides/http-workflows/README.md)
5. **Extend Elsa**: Create [Custom Activities](../../../extensibility/custom-activities.md)

## Alternative Configurations

For other deployment scenarios, see:

* [Elsa Server + Studio (Separate Images)](elsa-server-+-studio.md) - Run as separate containers
* [Persistent Database](persistent-database.md) - More database configuration examples
* [Database Configuration](../../database-configuration.md) - Complete database setup guide
* [Persistence Guide](../../../guides/persistence/README.md) - Comprehensive persistence provider documentation
* [Traefik Integration](traefik.md) - Reverse proxy setup
* [Distributed Hosting](../../../hosting/distributed-hosting.md) - Multi-instance deployments

## Support

If you encounter issues not covered in this guide:

* Check the [Elsa Workflows GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
* Review [GitHub Issues](https://github.com/elsa-workflows/elsa-core/issues)
* Join the community on Discord or Slack

## Version Information

This guide is written for:
* Elsa Workflows v3.5
* Docker Compose V2
* PostgreSQL 16
* SQLite 3

Always check the [official releases](https://github.com/elsa-workflows/elsa-core/releases) for the latest version information.
