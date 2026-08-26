# Designer

## Before you start <a href="#before-you-start" id="before-you-start"></a>

For this guide, we will need the following:

* An [Elsa Server](https://elsa-workflows.github.io/elsa-documentation/elsa-server.html?section=Designer) project
*   An [Elsa Studio](https://elsa-workflows.github.io/elsa-documentation/docker.html?section=Designer#elsa-studio) instance

    ```bash
    docker pull elsaworkflows/elsa-studio-v3:latest
    docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 -e ELSASERVER__URL=https://localhost:5001/elsa/api -p 14000:8080 elsaworkflows/elsa-studio-v3:latest
    ```

{% hint style="info" %}
**Port Numbers**

When starting Elsa Studio, make sure you provide it with the correct URL to the Elsa Server application.

For example, if Elsa Server runs on https://localhost:5001, the Docker command should look like this:

`docker run -t -i -e ASPNETCORE_ENVIRONMENT='Development' -e HTTP_PORTS=8080 -e ELSASERVER__URL=https://localhost:5001/elsa/api -p 14000:8080 elsaworkflows/elsa-studio-v3:latest`
{% endhint %}

Please return here when you are ready.

## Workflow Overview <a href="#workflow-overview" id="workflow-overview"></a>

We will define a new workflow called `GetUser`. The purpose of the workflow is to handle inbound HTTP requests by fetching a user by a given user ID from a backend API and writing them back to the client in JSON format.

For the backend API, we will use [JSONPlaceholder](https://jsonplaceholder.typicode.com/), which returns fake data using real HTTP responses.

Our workflow will parse the inbound HTTP request by getting the desired user ID from a route parameter and use that value to make an API call to JSONPlaceholder.

The following is an example of such an HTTP request that you can try right now from your browser: [https://jsonplaceholder.typicode.com/users/2](https://jsonplaceholder.typicode.com/users/2)

The response should look similar to this:

```json
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
```

Our workflow will essentially be a proxy sitting in front of the JSONPlaceholder API and return the response.

## Designing the Workflow <a href="#create-workflow-using-designer" id="create-workflow-using-designer"></a>

Follow these steps to create the workflow using Elsa Studio.

{% stepper %}
{% step %}
#### Create Get User Workflow

Create a new workflow called Get User
{% endstep %}

{% step %}
#### Add Activities

Add and connect the following activities to the design surface:

* HTTP Endpoint
* Set Variable
* HTTP Request (flow)
* HTTP Response (for 200 OK)
* HTTP Response (for 404 Not Found)
{% endstep %}

{% step %}
#### Create Variables

Create the following variables:

| Name      | Type             | Storage           |
| --------- | ---------------- | ----------------- |
| RouteData | ObjectDictionary | Workflow Instance |
| UserId    | string           | Workflow Instance |
| User      | Object           | Workflow Instance |
{% endstep %}

{% step %}
#### Configure Activities

Configure the activities as follows:

**HTTP Endpoint**

{% tabs %}
{% tab title="Input" %}
| Property          | Value            | Syntax  |
| ----------------- | ---------------- | ------- |
| Path              | `users/{userid}` | Default |
| Supported Methods | `Get`            | Default |
{% endtab %}

{% tab title="Output" %}
| Property   | Value     |
| ---------- | --------- |
| Route Data | RouteData |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}

**Set Variable**

{% tabs %}
{% tab title="Input" %}
<table><thead><tr><th width="132">Property</th><th width="423">Value</th><th>Syntax</th></tr></thead><tbody><tr><td>Variable</td><td><code>UserId</code></td><td>Default</td></tr><tr><td>Value</td><td><code>{{ Variables.RouteData.userid }}</code></td><td>Liquid</td></tr></tbody></table>
{% endtab %}
{% endtabs %}

**HTTP Request (flow)**

{% tabs %}
{% tab title="Input" %}
<table><thead><tr><th width="100">Property</th><th width="458">Value</th><th width="100">Syntax</th></tr></thead><tbody><tr><td>Expected Status Codes</td><td><code>200, 404</code></td><td>Default</td></tr><tr><td>Url</td><td><code>return $"https://jsonplaceholder.typicode.com/users/{Variables.UserId}";</code></td><td>C#</td></tr><tr><td>Method</td><td><code>GET</code></td><td>Default</td></tr></tbody></table>
{% endtab %}

{% tab title="Output" %}
| Property       | Value  |
| -------------- | ------ |
| Parsed Content | `User` |
{% endtab %}
{% endtabs %}

**HTTP Response (200)**

{% tabs %}
{% tab title="Input" %}
| Property    | Value            | Syntax     |
| ----------- | ---------------- | ---------- |
| Status Code | `OK`             | Default    |
| Content     | `variables.User` | JavaScript |
{% endtab %}
{% endtabs %}

**HTTP Response (404)**

{% tabs %}
{% tab title="Input" %}
| Property    | Value            | Syntax  |
| ----------- | ---------------- | ------- |
| Status Code | `NotFound`       | Default |
| Content     | `User not found` | Default |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Connect Activities

Connect each activity to the next. Ensure that you connect the `200` and `404` outcomes of the HTTP Request (flow) activity to the appropriate HTTP Response activity.
{% endstep %}

{% step %}
#### Publish

Publish the workflow.
{% endstep %}
{% endstepper %}

The final result should look like this:

<figure><img src="../../.gitbook/assets/workflow.png" alt=""><figcaption></figcaption></figure>

## Running the Workflow

Since the workflow uses the HTTP Endpoint activity, it will trigger when we send an HTTP request to the /workflows/users/{userId} path.

Try it out by navigating to [https://localhost:5001/workflows/users/2](https://localhost:5001/workflows/users/2).

The response should look similar to this:

```json
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
```

## Summary﻿

In this guide, we learned how to design a workflow using Elsa Studio.

We leveraged the `HttpEndpoint` activity and used is as a trigger to start the workflow.

The workflow is able to read route parameters and store it in a variable, which we then used as an input to send an API call to the JSONPlaceholder API that in turn returns the requested user.

We have also seen how to handle various responses from JSONPlaceholder: 200 OK and 404 Not Found

The workflow created in this guide can be found [here](https://raw.githubusercontent.com/elsa-workflows/elsa-guides/main/src/guides/http-workflows/Workflows/get-user.json).
