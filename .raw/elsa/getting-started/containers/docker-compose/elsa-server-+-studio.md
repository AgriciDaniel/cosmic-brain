---
description: >-
  Using Docker Compose, you can quickly set up and run both Elsa Server and Elsa
  Studio. This guide walks you through creating a docker-compose.yml file to
  deploy these services.
---

# Elsa Server + Studio

### Docker Compose File Structure﻿ <a href="#compose-file-structure" id="compose-file-structure"></a>

Below is the full content of a `docker-compose.yml` file for deploying Elsa Server and Elsa Studio with minimal configuration:

```yaml
services:

    # Elsa Server.
    elsa-server:
        image: elsaworkflows/elsa-server-v3-5:latest
        pull_policy: always
        environment:
            ASPNETCORE_ENVIRONMENT: Development
            HTTP_PORTS: 8080
            HTTP__BASEURL: http://localhost:12000
        ports:
            - "12000:8080"

    # Elsa Studio connected to Elsa Server.
    elsa-studio:
        image: elsaworkflows/elsa-studio-v3-5:latest
        pull_policy: always
        environment:
            ASPNETCORE_ENVIRONMENT: Development
            HTTP_PORTS: 8080
            HTTP__BASEURL: http://localhost:13000
            ELSASERVER__URL: http://localhost:12000/elsa/api
        ports:
            - "13000:8080"
        depends_on:
            - elsa-server
```

Save this file as `docker-compose.yml` in your working directory.

### Running the Docker Compose File﻿ <a href="#running-compose" id="running-compose"></a>

To start the services defined in the `docker-compose.yml` file, use the following command in your terminal:

```
docker-compose up
```

This command will:

* Pull the necessary Docker images (elsaworkflows/elsa-server-v3-5 and elsaworkflows/elsa-studio-v3-5).
* Start both services (Elsa Server and Elsa Studio).

Once the services are running, you can access them at the following URLs:

* Elsa Server: [http://localhost:12000](http://localhost:12000/)
* Elsa Studio: [http://localhost:13000](http://localhost:13000/)

### Service Configuration Details﻿ <a href="#service-configuration" id="service-configuration"></a>

Here is a quick overview of the services defined in the Docker Compose file:

#### Elsa Server﻿ <a href="#elsa-server-details" id="elsa-server-details"></a>

Elsa Server is configured to run on `http://localhost:12000`. Key environment variables include:

* `ASPNETCORE_ENVIRONMENT`: Specifies the environment (e.g., `Development`).
* `HTTP_PORTS`: Specifies the HTTP port within the container.
* `HTTP__BASEURL`: Sets the base URL for the server.

#### Elsa Studio﻿ <a href="#elsa-studio-details" id="elsa-studio-details"></a>

Elsa Studio is configured to run on `http://localhost:13000`. It connects to Elsa Server at `http://localhost:12000/elsa/api`. Key environment variables include:

* `ASPNETCORE_ENVIRONMENT`: Specifies the environment (e.g., `Development`).
* `HTTP_PORTS`: Specifies the HTTP port within the container.
* `HTTP__BASEURL`: Sets the base URL for the Studio.
* `ELSASERVER__URL`: Configures the URL of the connected Elsa Server.

{% hint style="info" %}
**Network Configuration**

Ensure the ports specified in the docker-compose.yml file (e.g., `12000:8080` and `13000:8080`) are not already in use on your system. If they are, adjust the port mappings to avoid conflicts.
{% endhint %}

