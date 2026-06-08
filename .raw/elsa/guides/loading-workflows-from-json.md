# Loading Workflows from JSON

Loading workflows from JSON is a great way to store workflows in a database or file system. This guide will show you how to load workflows from JSON files.

## Console application <a href="#console-application" id="console-application"></a>

The most straightforward way to load workflows from JSON files is to simply load the contents of a JSON file, deserialise it and then execute the deserialised workflow.

{% stepper %}
{% step %}
#### Create Console Project

```bash
dotnet new console -n "ElsaConsole" -f net8.0
cd ElsaConsole
dotnet add package Elsa
dotnet add package Elsa.Testing.Shared.Integration
```
{% endstep %}

{% step %}
#### Update Program.cs

Here's a complete Program.cs file that demonstrates how to load a workflow from a JSON file and execute it:

{% code title="Program.cs" %}
```csharp
using Elsa.Extensions;
using Elsa.Testing.Shared;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Management.Mappers;
using Elsa.Workflows.Management.Models;
using Microsoft.Extensions.DependencyInjection;

// Setup service container.
var services = new ServiceCollection();

// Add Elsa services.
services.AddElsa();

// Build service container.
var serviceProvider = services.BuildServiceProvider();

// Populate registries. This is only necessary for applications  that are not using hosted services.
await serviceProvider.PopulateRegistriesAsync();

// Import a workflow from a JSON file.
var workflowJson = await File.ReadAllTextAsync("HelloWorld.json");

// Get a serializer to deserialize the workflow.
var serializer = serviceProvider.GetRequiredService<IActivitySerializer>();

// Deserialize the workflow model.
var workflowDefinitionModel = serializer.Deserialize<WorkflowDefinitionModel>(workflowJson);

// Map the model to a Workflow object.
var workflowDefinitionMapper = serviceProvider.GetRequiredService<WorkflowDefinitionMapper>();
var workflow = workflowDefinitionMapper.Map(workflowDefinitionModel);

// Get a workflow runner to run the workflow.
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();

// Run the workflow.
await workflowRunner.RunAsync(workflow);
```
{% endcode %}
{% endstep %}

{% step %}
#### Create Workflow JSON file

Create a new file called HelloWorld.json in the root of the project and make sure it is configured to be copied to the output directory.

{% code title="HelloWorld.json" %}
```json
{
  "id": "HelloWorld-v1",
  "definitionId": "HelloWorld",
  "name": "Hello World",
  "isLatest": true,
  "isPublished": true,
  "root": {
    "id": "Flowchart1",
    "type": "Elsa.Flowchart",
    "activities": [
      {
        "id": "WriteLine1",
        "type": "Elsa.WriteLine",
        "text": {
          "typeName": "String",
          "expression": {
            "type": "Literal",
            "value": "Hello World!"
          }
        }
      }
    ]
  }
}
```
{% endcode %}
{% endstep %}

{% step %}
#### Run the Program

Run the program:

```bash
dotnet run
```
{% endstep %}
{% endstepper %}

The console should output the following:

```
Hello World!
```

## Elsa Server

When you're hosting an [Elsa Server](../application-types/elsa-server.md), providing workflows from JSON files is even easier.

All you need to do is create a folder called _Workflows_ and add any number of workflow JSON files to it.

Let's try it out:

{% stepper %}
{% step %}
#### Setup Elsa Server

Setup an [Elsa Server](../application-types/elsa-server.md) project.
{% endstep %}

{% step %}
#### Create Workflows Folder

Create a new folder called _Workflows_.
{% endstep %}

{% step %}
#### Create Workflow JSON File

Create a new file called _HelloWorld.json_ in the root of the project and make sure it is configured to be copied to the output directory.

{% code title="HelloWorld.json" %}
```json
{
  "id": "HelloWorld-v1",
  "definitionId": "HelloWorld",
  "name": "Hello World",
  "isLatest": true,
  "isPublished": true,
  "root": {
    "id": "Flowchart1",
    "type": "Elsa.Flowchart",
    "activities": [
      {
        "id": "WriteLine1",
        "type": "Elsa.WriteLine",
        "text": {
          "typeName": "String",
          "expression": {
            "type": "Literal",
            "value": "Hello World!"
          }
        }
      }
    ]
  }
}
```
{% endcode %}
{% endstep %}

{% step %}
#### Run the Program

Run the program:

```bash
dotnet run --urls "https://localhost:5001"
```
{% endstep %}

{% step %}
#### Run the Workflow

Run the workflow using the following curl:

```bash
curl --location --request POST 'https://localhost:5001/elsa/api/workflow-definitions/HelloWorld/execute' \
--header 'Authorization: ApiKey {your-api-key}'
```

Alternatively, [start an Elsa Studio container](../getting-started/containers/docker.md#elsa-studio) and run the workflow from there.
{% endstep %}
{% endstepper %}

## Loading Workflows from Blob Storage

If you need to load workflows from cloud blob storage (Azure Blob Storage, AWS S3, etc.), Elsa provides a dedicated workflow provider package:

```bash
dotnet add package Elsa.WorkflowProviders.BlobStorage
```

> **Note:** Earlier documentation may have incorrectly referenced `Elsa.WorkflowProviders.FluentStorage`. The correct package name is `Elsa.WorkflowProviders.BlobStorage`.

For detailed configuration and usage of blob storage providers, please refer to the Elsa Core repository documentation.

## Summary <a href="#summary" id="summary"></a>

In this guide, we've demonstrated configuring an Elsa Server to host workflows from JSON files. We covered loading a JSON file, deserialising it into the `Workflow` class, and executing the workflow.
