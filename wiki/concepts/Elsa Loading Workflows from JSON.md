---
type: concept
title: "Elsa Loading Workflows from JSON"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - json
  - serialization
  - guides
status: developing
address: c-000075
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Running Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Architecture]]"
---

# Elsa Loading Workflows from JSON

[[entities/Elsa Workflows]] supports loading workflow definitions from JSON files — useful for storing workflows in a database, version control, or file system.

---

## Console Application Approach

The most direct method: load JSON, deserialize, and execute.

### Setup
```bash
dotnet new console -n "ElsaConsole" -f net8.0
dotnet add package Elsa
dotnet add package Elsa.Testing.Shared.Integration
```

### Program.cs
```csharp
using Elsa.Extensions;
using Elsa.Testing.Shared;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Management.Mappers;
using Elsa.Workflows.Management.Models;

var services = new ServiceCollection();
services.AddElsa();
var serviceProvider = services.BuildServiceProvider();

// Populate registries (required for non-hosted scenarios)
await serviceProvider.PopulateRegistriesAsync();

// Load and deserialize the workflow JSON
var workflowJson = await File.ReadAllTextAsync("HelloWorld.json");
var serializer = serviceProvider.GetRequiredService<IActivitySerializer>();
var workflowDefinitionModel = serializer.Deserialize<WorkflowDefinitionModel>(workflowJson);

// Map to a Workflow object
var workflowDefinitionMapper = serviceProvider.GetRequiredService<WorkflowDefinitionMapper>();
var workflow = workflowDefinitionMapper.Map(workflowDefinitionModel);

// Execute
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();
await workflowRunner.RunAsync(workflow);
```

### Example JSON Workflow
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

### Key Steps

1. **Serialize** — uses `IActivitySerializer` to deserialize JSON into a `WorkflowDefinitionModel`
2. **Map** — `WorkflowDefinitionMapper` converts the model into a runnable `Workflow` object
3. **Run** — `IWorkflowRunner` executes the workflow

> [!warning] Registries
> In non-hosted applications (console apps, unit tests), you must call `await serviceProvider.PopulateRegistriesAsync()` before running workflows. This registers activity types and triggers. Hosted applications (ASP.NET Core) do this automatically.

---

## Elsa Server Auto-Discovery

For Elsa Server deployments, loading workflows from JSON is even simpler — just drop JSON files into a `Workflows/` folder.

### Steps

1. Create a `Workflows/` folder in the Elsa Server project
2. Add JSON workflow files with `isPublished: true`
3. Run the server — workflows are auto-discovered and registered

```bash
# Example: trigger the workflow via API
curl -X POST 'https://localhost:5001/elsa/api/workflow-definitions/HelloWorld/execute' \
  --header 'Authorization: ApiKey {your-api-key}'
```

The server automatically scans the `Workflows/` folder, deserializes JSON definitions, and registers them with the workflow runtime — no manual loading code required.

---

## Loading from Blob Storage

For cloud deployments, Elsa provides a blob storage workflow provider:

```bash
dotnet add package Elsa.WorkflowProviders.BlobStorage
```

This enables loading workflows from Azure Blob Storage, AWS S3, or compatible providers. The package name is `Elsa.WorkflowProviders.BlobStorage` (not `FluentStorage` as some earlier docs referenced).

---

## Summary

| Approach | Use Case | Code Required |
|----------|----------|---------------|
| **Console app** | Ad-hoc execution, testing | Full deserialization + mapping |
| **Server auto-discovery** | Production deployment | Just add JSON files to `Workflows/` |
| **Blob storage** | Cloud-native, dynamic workflows | Add package, configure provider |

The JSON format mirrors the workflow structure: a `root` activity (typically a `Flowchart` or `Sequence`) containing nested activities with their property configurations, including expression types and values.
