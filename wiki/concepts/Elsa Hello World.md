---
type: concept
title: "Elsa Hello World"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - tutorial
  - dotnet
status: developing
address: c-000072
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Packages]]"
---

# Elsa Hello World

Two quickstart tutorials for [[entities/Elsa Workflows]]: a Console app and an ASP.NET Core web app. These walk through the minimal setup required to define and execute a workflow.

---

## Console App

### Step 1: Create Project
```bash
dotnet new console -n "ElsaConsole"
cd ElsaConsole
```

### Step 2: Add Package
```bash
dotnet add package Elsa
```

### Step 3: Write Program.cs
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddElsa();
var serviceProvider = services.BuildServiceProvider();

var workflow = new Sequence
{
    Activities =
    {
        new WriteLine("Hello World!"),
        new WriteLine("We can do more than a one-liner!")
    }
};

var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();
await workflowRunner.RunAsync(workflow);
```

### Step 4: Run
```bash
dotnet run
```

This sets up a DI container, registers Elsa services, defines a simple `Sequence` workflow with two `WriteLine` activities, and executes it via `IWorkflowRunner`.

---

## ASP.NET Core App

### Step 1: Create Project
```bash
dotnet new web -n "ElsaWeb"
cd ElsaWeb
```

### Step 2: Add Packages
```bash
dotnet add package Elsa
dotnet add package Elsa.Http
```

### Step 3: Write Program.cs
```csharp
using Elsa.Extensions;
using ElsaWeb.Workflows;

var builder = WebApplication.CreateBuilder(args);
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
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseWorkflows();
app.Run();
```

### Step 4: Create Workflow Class
Create `Workflows/HttpHelloWorld.cs`:
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
                        var message = queryStrings.TryGetValue("message", out var messageValue)
                            ? messageValue.ToString()
                            : "Hello world of HTTP workflows!";
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

### Step 5: Run
```bash
dotnet run --urls "https://localhost:5001"
```

Then visit `https://localhost:5001/workflows/hello-world?message=Hi` to trigger the workflow via HTTP.

---

## Key Takeaways

- The `Elsa` metapackage bundles the essential packages (Core, Management, Runtime, Mediator, Api.Common).
- `services.AddElsa()` registers all workflow engine services in the DI container.
- `IWorkflowRunner.RunAsync()` executes a workflow definition synchronously (single burst).
- For HTTP-triggered workflows, `app.UseWorkflows()` middleware intercepts matching requests.
- Activities are wired together in a `Sequence` (sequential) or `Flowchart` (arbitrary connections) container.
