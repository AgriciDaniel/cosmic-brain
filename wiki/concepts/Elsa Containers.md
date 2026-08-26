---
type: concept
title: "Elsa Containers"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - docker
  - deployment
status: developing
address: c-000063
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Application Types]]"
  - "[[Elsa Database Configuration]]"
---

# Elsa Containers

[[entities/Elsa Workflows]] provides prebuilt Docker images for quick deployment, available at [hub.docker.com](https://hub.docker.com/u/elsaworkflows). This avoids the need to create an ASP.NET application first.

---

## Available Docker Images

| Image | Purpose |
|-------|---------|
| `elsaworkflows/elsa-server-v3-5` | Standalone Elsa Server (REST API + engine) |
| `elsaworkflows/elsa-studio-v3-5` | Standalone Elsa Studio (Blazor WASM designer) |
| `elsaworkflows/elsa-server-and-studio-v3-5` | Combined server + studio in one image |

### Quick Start — Combined Image
```bash
docker pull elsaworkflows/elsa-server-and-studio-v3-5:latest
docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 \
  -e HOSTING__BASEURL=http://localhost:13000 -p 13000:8080 \
  elsaworkflows/elsa-server-and-studio-v3-5:latest
```
Access at `http://localhost:13000`. Login: `admin` / `password`.

### Studio Only
```bash
docker pull elsaworkflows/elsa-studio-v3-5:latest
docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 \
  -e ELSASERVER__URL=http://localhost:13000/elsa/api -p 14000:8080 \
  elsaworkflows/elsa-studio-v3-5:latest
```
Studio requires a running Elsa Server instance configured via `ELSASERVER__URL`.

---

## Docker Compose Deployments

### Option 1: SQLite (Simplest)
Single combined image with SQLite file storage — best for evaluation:
```yaml
services:
  elsa-server-and-studio:
    image: elsaworkflows/elsa-server-and-studio-v3-5:latest
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
```

### Option 2: PostgreSQL (Production-Ready)
Combined image backed by PostgreSQL:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: elsa
      POSTGRES_PASSWORD: elsa_password_change_me
      POSTGRES_DB: elsa
    volumes:
      - postgres-data:/var/lib/postgresql/data

  elsa-server-and-studio:
    image: elsaworkflows/elsa-server-and-studio-v3-5:latest
    environment:
      DATABASEPROVIDER: PostgreSql
      CONNECTIONSTRINGS__POSTGRESQL: "Server=postgres;Database=elsa;Username=elsa;Password=elsa_password_change_me"
    ports:
      - "14000:8080"
    depends_on:
      postgres:
        condition: service_healthy
```

### Option 3: Separate Server + Studio
Two containers communicating via REST API:
```yaml
services:
  elsa-server:
    image: elsaworkflows/elsa-server-v3-5:latest
    ports:
      - "12000:8080"

  elsa-studio:
    image: elsaworkflows/elsa-studio-v3-5:latest
    environment:
      ELSASERVER__URL: http://localhost:12000/elsa/api
    ports:
      - "13000:8080"
    depends_on:
      - elsa-server
```

### Option 4: Traefik Reverse Proxy
Adds Traefik as a reverse proxy with host-based routing (`elsa.localhost`):
- Traefik routes to Elsa at port 1280
- Traefik dashboard at `http://localhost:8080`
- Elsa Studio accessible at `http://elsa.localhost:1280`
- Requires `/etc/hosts` entry mapping `elsa.localhost` to `127.0.0.1`

---

## Key Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ASPNETCORE_ENVIRONMENT` | .NET environment | `Development` |
| `HTTP_PORTS` | Internal container port | `8080` |
| `HTTP__BASEURL` | External base URL | `http://localhost:14000` |
| `DATABASEPROVIDER` | Database engine | `Sqlite`, `PostgreSql`, `SqlServer`, `MySql` |
| `CONNECTIONSTRINGS__*` | Connection string for provider | `Server=...;Database=...` |
| `ELSASERVER__URL` | Server URL (Studio only) | `http://localhost:12000/elsa/api` |

---

## Production Considerations

- Change default credentials (`admin`/`password`) before production use
- Use Docker secrets for sensitive values
- Configure resource limits (CPU/memory) on containers
- Enable health checks (Elsa exposes `/health` endpoint)
- Use external database for better reliability
- Implement regular volume backups
- Configure logging with centralized tools (ELK, Loki)

## Version Notes

These docs target Elsa Workflows v3.5 with Docker Compose V2 and PostgreSQL 16.
