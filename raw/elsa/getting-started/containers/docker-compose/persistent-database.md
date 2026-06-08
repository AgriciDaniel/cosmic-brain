# Persistent Database

This topic provides steps to set up Elsa Server and Studio with a PostgreSQL database using Docker Compose. PostgreSQL is used as an example - other database engines are supported as well, including MySql and SQL Server.

### Docker Compose Configuration﻿ <a href="#docker-compose-setup" id="docker-compose-setup"></a>

Below is the Docker Compose file used to set up Elsa with PostgreSQL:

```yaml
services:

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

    elsa-server-and-studio:
        image: elsaworkflows/elsa-server-and-studio-v3-5:latest
        pull_policy: always
        environment:
            ASPNETCORE_ENVIRONMENT: Development
            HTTP_PORTS: 8080
            HTTP__BASEURL: http://localhost:14000
            DATABASEPROVIDER: PostgreSql
            CONNECTIONSTRINGS__POSTGRESQL: Server=postgres;Username=elsa;Database=elsa;Port=5432;Password=elsa;SSLMode=Prefer;MaxPoolSize=2000;Timeout=60
        ports:
            - "14000:8080"
        depends_on:
            - postgres

volumes:
    postgres-data:
```

### Configuration Details﻿ <a href="#configuration-details" id="configuration-details"></a>

The Docker Compose file defines two services:

* PostgreSQL Service: A PostgreSQL database container configured with the following settings:
  * User: `elsa`
  * Password: `elsa`
  * Database: `elsa`
  * Max Connections: `2000`
* Elsa Server + Studio: A container running Elsa Server and Studio, configured to use PostgreSQL as the database provider.
  * Environment Variables: Defines `DATABASEPROVIDER` as `PostgreSql` and the PostgreSQL connection string in `CONNECTIONSTRINGS__POSTGRESQL`.
  * Ports: Maps port `14000` on the host to `8080` in the container.

### Supported Database Providers﻿ <a href="#supported-db-providers" id="supported-db-providers"></a>

Elsa supports multiple database providers, which can be configured using the `DATABASEPROVIDER` environment variable:

* `SqlServer`
* `Sqlite` (default)
* `MySql`
* `PostgreSql`

In this setup, `PostgreSql` is used as the database provider.

### Running the Services﻿ <a href="#running-services" id="running-services"></a>

To run the services defined in the Docker Compose file, use the following command:

```bash
docker-compose up
```

Once the services are running, you can access Elsa Studio by navigating to [http://localhost:14000](http://localhost:14000/).

## See Also

For more detailed information about database configuration and persistence providers:

- [Database Configuration](../../database-configuration.md) - Complete database setup guide
- [Persistence Guide](../../../guides/persistence/README.md) - Comprehensive persistence provider overview
- [SQL Server Guide](../../../guides/persistence/sql-server.md) - SQL Server-specific configuration (if using SQL Server instead of PostgreSQL)
