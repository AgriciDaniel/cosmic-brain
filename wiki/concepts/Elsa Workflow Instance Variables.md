---
type: concept
title: "Elsa Workflow Instance Variables"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - variables
  - workflow-instance
  - operate
status: developing
address: c-000098
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Studio Design]]"
  - "[[Elsa Alterations]]"
---

# Elsa Workflow Instance Variables

Workflow instance variables store runtime data during workflow execution. Manipulating these variables is essential for correcting defects, adjusting behavior dynamically, and minimizing downtime without restarting processes.

---

## Programmatic Access

Use the `IWorkflowInstanceVariableManager` service to list and update variables.

### Listing Variables

```csharp
var workflowInstanceId = "some-workflow-instance-id";
var variables = await _workflowInstanceVariableManager.GetVariablesAsync(
    workflowInstanceId, null, cancellationToken);

foreach (var variable in variables)
{
    Console.WriteLine($"Id: {variable.Variable.Id}, Name: {variable.Variable.Name}, Value: {variable.Value}");
}
```

### Updating Variables

```csharp
var variablesToUpdate = new[]
{
    new VariableUpdateValue("some-variable-id", "Some variable value"),
    new VariableUpdateValue("another-variable-id", 42)
};

var variables = await _workflowInstanceVariableManager.SetVariablesAsync(
    workflowInstanceId, variablesToUpdate, cancellationToken);
```

> [!info]
> `SetVariablesAsync` replaces only the specified variables. Unlisted variables retain their original values.

---

## API Access

### List Variables (GET)

```bash
curl --location 'https://localhost:5001/elsa/api/workflow-instances/{id}/variables' \
  --header 'Authorization: ApiKey {your-api-key}'
```

Response:

```json
{
  "items": [
    { "id": "ff1c0b14864811ea", "name": "Message", "value": "Hello, World!" },
    { "id": "ea1bbdf90ea22ca7", "name": "Sender", "value": "Elsa" }
  ],
  "count": 2
}
```

### Update Variables (POST)

```bash
curl --location 'https://localhost:5001/elsa/api/workflow-instances/{id}/variables' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: ApiKey {your-api-key}' \
  --data '{
    "variables": [
      { "id": "ff1c0b14864811ea", "value": "Hello, Elsa!" },
      { "id": "ea1bbdf90ea22ca7", "value": "World" }
    ]
  }'
```

---

## Usage in Studio

In [[Elsa Studio Design]], variables are managed through the **Variables Panel**:

- **Create variables** with name, type, and storage location
- **Storage options**: Workflow Instance (persisted), Memory (transient), Input (passed to workflow)
- **Access syntax**: `variables.VariableName` (JavaScript), `Variables.VariableName` (C#), `{{ Variables.VariableName }}` (Liquid)

See also [[Elsa Alterations]] for the `ModifyVariable` alteration type that can change variables on running workflow instances.
