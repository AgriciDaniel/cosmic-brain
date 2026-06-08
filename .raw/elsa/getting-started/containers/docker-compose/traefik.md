# Traefik

This guide walks you through setting up and running Elsa Server and Studio using a Docker Compose file. The setup includes PostgreSQL as the database, Traefik as a reverse proxy, and Elsa workflows.

### Docker Compose Configuration﻿ <a href="#docker-compose-config" id="docker-compose-config"></a>

The following `docker-compose.yml` file defines services for:

* PostgreSQL database for data persistence.
* Elsa Server and Studio, configured to use PostgreSQL.
* Traefik reverse proxy for routing requests to the appropriate service.

```yaml
services:

    # PostgreSQL database.
    postgres:
        image: postgres:latest
        command: -c 'max_connections=2000'
        environment:
            POSTGRES_USER: elsa
            POSTGRES_PASSWORD: elsa
            POSTGRES_DB: elsa
        volumes:
            - postgres-data:/var/lib/postgresql/data
        ports:
            - "5432:5432"
        networks:
            - elsa-network

    # Elsa Server and Studio behind Traefik and configured with PostgreSQL.
    elsa-server-and-studio:
        image: elsaworkflows/elsa-server-and-studio-v3-5:latest
        pull_policy: always
        environment:
            ASPNETCORE_ENVIRONMENT: Development
            HTTP_PORTS: 8080
            HOSTING__BASEURL: http://elsa.localhost:1280
            DATABASEPROVIDER: PostgreSql
            CONNECTIONSTRINGS__POSTGRESQL: Host=postgres;Port=5432;Database=elsa;Username=elsa;Password=elsa
        labels:
            - "traefik.enable=true"
            - "traefik.http.routers.elsa.rule=Host(`elsa.localhost`)"
            - "traefik.http.services.elsa.loadbalancer.server.port=8080"
        networks:
            - elsa-network

    # Traefik reverse proxy.
    traefik:
        image: traefik:2.7.2
        command:
            - "--api.insecure=true" # Enables the Traefik dashboard
            - "--providers.docker=true" # Enables Docker as the configuration source
            - "--entrypoints.web.address=:80" # Sets up the HTTP entry point on port 80
        ports:
            - "1280:80" # Expose HTTP port. Access Elsa Studio at: http://elsa.localhost:1280/
            - "8080:8080" # Expose Traefik dashboard
        volumes:
            - "/var/run/docker.sock:/var/run/docker.sock" # Allows Traefik to communicate with the Docker daemon
        networks:
            - elsa-network
        depends_on:
            - elsa-server-and-studio

networks:
    elsa-network:
        driver: bridge

volumes:
    postgres-data:
```

### Setup Instructions﻿ <a href="#setup-instructions" id="setup-instructions"></a>

Follow these steps to set up and run the Docker Compose configuration:

* Ensure you have Docker and Docker Compose installed on your machine. Refer to the [prerequisites](https://elsa-workflows.github.io/elsa-documentation/prerequisites.html#docker) if necessary.
* Create a file named `docker-compose.yml` and paste the provided configuration into it.
*   Run the following command in the directory containing the `docker-compose.yml` file to start the services:

    ```
    docker-compose up
    ```
*   Edit your `/etc/hosts` file (on Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (on Windows) to include the following entry for mapping `elsa.localhost` to `127.0.0.1`:

    ```
    127.0.0.1 elsa.localhost
    ```
* Once the services are running:
  * Access Elsa Studio at [http://elsa.localhost:1280](http://elsa.localhost:1280/).
  * Open the Traefik dashboard at [http://localhost:8080](http://localhost:8080/).

### Environment Configuration﻿ <a href="#env-configuration" id="env-configuration"></a>

The environment variables and settings used in this Docker Compose file:

* PostgreSQL: The database user, password, and name are configured as `elsa`.
* Elsa Server and Studio: Configured to use PostgreSQL as the database provider.
* Traefik: Acts as a reverse proxy with routing rules for `elsa.localhost`.

### Troubleshooting﻿ <a href="#troubleshooting" id="troubleshooting"></a>

If you encounter issues, check the following:

* Ensure Docker and Docker Compose are correctly installed and running.
* Verify the `/etc/hosts` file includes an entry for `elsa.localhost` mapping to `127.0.0.1`.
* Inspect logs for each service using `docker-compose logs [service-name]`.
