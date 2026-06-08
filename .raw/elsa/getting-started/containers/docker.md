# Docker

The Elsa project currently offers three different Docker images:

* [Elsa Server + Studio](https://hub.docker.com/repository/docker/elsaworkflows/elsa-server-and-studio-v3/general)
* [Elsa Server](https://hub.docker.com/repository/docker/elsaworkflows/elsa-server-v3/general)
* [Elsa Studio](https://hub.docker.com/repository/docker/elsaworkflows/elsa-studio-v3/general)

These images make it easy to give Elsa a quick spin without first creating an ASP.NET application and setting up Elsa. Before trying to run an image, [make sure you have Docker installed](https://elsa-workflows.github.io/elsa-documentation/prerequisites.html#docker) on your machine.

### Elsa Server + Studio <a href="#elsa-server-and-studio" id="elsa-server-and-studio"></a>

This image hosts an ASP.NET Core application that runs both as an Elsa Server as well as an Elsa Studio application. To run the container, simply run the following commands from your terminal:

```bash
docker pull elsaworkflows/elsa-server-and-studio-v3-5:latest
docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 -e HOSTING__BASEURL=http://localhost:13000 -p 13000:8080 elsaworkflows/elsa-server-and-studio-v3-5:latest
```

When the container has started, open a web browser and navigate to [http://localhost:13000](http://localhost:13000/). On the login screen, enter the following credentials:

```shell-session
username: admin
password: password
```

### Elsa Server <a href="#elsa-server" id="elsa-server"></a>

This image hosts an ASP.NET Core application that runs as an Elsa Server. To run the container, simply run the following commands from your terminal:

```bash
docker pull elsaworkflows/elsa-server-v3-5:latest
docker run -t -i -e ASPNETCORE_ENVIRONMENT=Development -e HTTP_PORTS=8080 -e HTTP__BASEURL=http://localhost:13000 -p 13000:8080 elsaworkflows/elsa-server-v3-5:latest
```

When the container has started, open a web browser and navigate to [http://localhost:13000](http://localhost:13000/).

To view the API endpoints, navigate to [http://localhost:13000/swagger](http://localhost:13000/swagger).

### Elsa Studio <a href="#elsa-studio" id="elsa-studio"></a>

This image hosts an ASP.NET Core application that runs Elsa Studio. To run the container, simply run the following commands from your terminal:

```bash
docker pull elsaworkflows/elsa-studio-v3-5:latest
docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 -e ELSASERVER__URL=http://localhost:13000/elsa/api -p 14000:8080 elsaworkflows/elsa-studio-v3-5:latest
```

{% hint style="warning" %}
**Requires Elsa Server**

Note that Elsa Studio needs to connect to an existing Elsa Server instance, which URL is configured via the `ELSASERVER__URL` environment variable passed to the container (on port `13000` in this example). To quickly start an Elsa Server instance, you can run the Elsa Server Docker image as outlined in the previous chapter.
{% endhint %}

When the container has started, open a web browser and navigate to [http://localhost:14000](http://localhost:14000/). On the login screen, enter the following credentials:

```shell-session
username: admin
password: password
```
