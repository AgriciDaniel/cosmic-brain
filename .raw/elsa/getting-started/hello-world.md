---
description: >-
  In this topic, we'll setup a simple Console and an ASP.NET Core application
  that can host and execute workflows.
---

# Hello World

## Console <a href="#setup" id="setup"></a>

{% stepper %}
{% step %}
#### Create Console App

Start by creating a new console application:

```bash
dotnet new console -n "ElsaConsole"
```
{% endstep %}

{% step %}
#### Add Packages

Navigate to your newly created project's root directory and add the following packages:

```bash
cd ElsaConsole
dotnet add package Elsa
```
{% endstep %}

{% step %}
**Modify Program.cs**

Open `Program.cs` and replace its contents with the following:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Microsoft.Extensions.DependencyInjection;

// Setup service container.
var services = new ServiceCollection();

// Add Elsa services to the container.
services.AddElsa();

// Build the service container.
var serviceProvider = services.BuildServiceProvider();

// Define a simple workflow with multiple activities.
var workflow = new Sequence
{
    Activities =
    {
        new WriteLine("Hello World!"),
        new WriteLine("We can do more than a one-liner!")
    }
};

// Resolve a workflow runner to execute the workflow.
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();

// Run the workflow.
await workflowRunner.RunAsync(workflow);
```

This code sets up a service container and adds Elsa services to it. The `serviceProvider` can be used to resolve Elsa services and run workflows.
{% endstep %}
{% endstepper %}

## ASP.NET Core

> **Note:** The ASP.NET Core sample below may require updates to work with the latest Elsa 3.2+/3.3 versions. For a fully working sample compatible with the current version of Elsa, please refer to the [Elsa Samples repository](https://github.com/elsa-workflows/elsa-samples).

{% stepper %}
{% step %}
**Create the Project**

Create a new empty ASP.NET app using the following command:

```bash
dotnet new web -n "ElsaWeb"
```
{% endstep %}

{% step %}
**Add Packages**

Navigate to your project's root directory and install the Elsa package:

```bash
cd ElsaWeb
dotnet add package Elsa
dotnet add package Elsa.Http
```
{% endstep %}

{% step %}
**Modify Program.cs**

Open `Program.cs` in your project and replace its contents with the code provided below.

**Program.cs**

```csharp
using Elsa.Extensions;
using ElsaWeb.Workflows;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddElsa(elsa =>
{
    elsa.AddWorkflow<HttpHelloWorld>();
    elsa.UseHttp(http => http.ConfigureHttpOptions = options =>
    {
        options.BaseUrl = new Uri("https://localhost:5001");
        options.BasePath = "/workflows";
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseWorkflows();
app.Run();
```
{% endstep %}

{% step %}
**Add HttpHelloWorld Workflow**

Create a new directory called `Workflows` and add a new file to it called `HttpHelloWorld.cs` with the following.

**Workflows/HttpHelloWorld.cs**

```csharp
using Elsa.Http;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

namespace ElsaWeb.Workflows;

public class HttpHelloWorld : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var queryStringsVariable = builder.WithVariable<IDictionary<string, object>>();
        var messageVariable = builder.WithVariable<string>();

        builder.Root = new Sequence
        {
            Activities =
            {
                new HttpEndpoint
                {
                    Path = new("/hello-world"),
                    CanStartWorkflow = true,
                    QueryStringData = new(queryStringsVariable)
                },
                new SetVariable
                {
                    Variable = messageVariable,
                    Value = new(context =>
                    {
                        var queryStrings = queryStringsVariable.Get(context)!;
                        var message = queryStrings.TryGetValue("message", out var messageValue) ? messageValue.ToString() : "Hello world of HTTP workflows!";
                        return message;
                    })
                },
                new WriteHttpResponse
                {
                    Content = new(messageVariable)
                }
            }
        };
    }
}
```
{% endstep %}
{% endstepper %}

## Summary <a href="#summary" id="summary"></a>

This document explains setting up Console and ASP.NET Core apps using Elsa workflows. For the Console app, we configured a service container, added Elsa, and ran a "Hello World" workflow. The ASP.NET Core app integrates Elsa with HTTP endpoints to process workflows. Follow the code samples for package additions and `Program.cs` configurations. Refer to source code links for further details.

## Source Code

* [Console app](https://github.com/elsa-workflows/elsa-guides/tree/main/src/installation/elsa-console)
* [ASP.NET Core app](https://github.com/elsa-workflows/elsa-guides/tree/main/src/installation/elsa-web)
