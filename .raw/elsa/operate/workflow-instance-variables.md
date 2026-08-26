---
description: >-
  This topic covers various services and API endpoints available for listing and
  managing the variables of a workflow instance.
---

# Workflow Instance Variables

Manipulating workflow instance variables is crucial for correcting defects in workflows or variable values. This ability allows quick fixes without restarting processes, minimizing downtime, and ensuring consistent operations. It enables dynamic adjustments for unexpected changes, enhancing system robustness and efficiency.

{% hint style="info" %}
**Using Variables in Elsa Studio**: If you're working with variables in the Elsa Studio designer, see the [Expressions guide](../guides/studio/expressions.md) to learn how to reference and manipulate variables using JavaScript and C# expressions in activities like SetVariable.
{% endhint %}

## Programmatic Access﻿ <a href="#programmatic-access" id="programmatic-access"></a>

### Listing﻿ <a href="#list-variables" id="list-variables"></a>

You can use the `IWorkflowInstanceVariableManager` service to retrieve all variables of a workflow instance. The following example demonstrates how to read the variables:

```csharp
var workflowInstanceId = "some-workflow-instance-id";
var variables = await _workflowInstanceVariableManager.GetVariablesAsync(workflowInstanceId, null, cancellationToken);

// Print each variable.
foreach (var variable in variables)
{
    Console.WriteLine($"Id: {variable.Variable.Id}, Name: {variable.Variable.Name}, Value: {variable.Value}");
}
```

{% hint style="info" %}
The `GetVariablesAsync` method retrieves all the variables associated with a specified workflow instance. Ensure that the `workflowInstanceId` is valid and that the workflow instance exists.
{% endhint %}

Each variable retrieved is represented by a unique ID, a name, and a value.

### Updating﻿ <a href="#update-variables" id="update-variables"></a>

You can also use the `IWorkflowInstanceVariableManager` service to update one or more variables of a workflow instance. Below is an example of how to perform the update:

```csharp
var variablesToUpdate = [
{
    new VariableUpdateValue("some-variable-id", "Some variable value"),
    new VariableUpdateValue("another-variable-id", 42)
}];

// Update the variables. This returns a complete list of variables, including both unchanged and changed variables.
var variables = await _workflowInstanceVariableManager.SetVariablesAsync(workflowInstanceId, variablesToUpdate, cancellationToken);

// Print each variable.
foreach (var variable in variables)
{
    Console.WriteLine($"Id: {variable.Variable.Id}, Name: {variable.Variable.Name}, Value: {variable.Value}");
}
```

{% hint style="info" %}
The `SetVariablesAsync` method replaces the specified variables' values. Any variable not included in the update request will retain its original value. Ensure that the variable IDs provided are correct to avoid unintended updates.
{% endhint %}

Updating variables in a workflow instance can be particularly useful for dynamically adjusting the workflow's behaviour based on changing data inputs or conditions during execution.

## API Access﻿ <a href="#api-access" id="api-access"></a>

### Listing﻿ <a href="#api-list-variables" id="api-list-variables"></a>

The workflow instance API also provides an endpoint for retrieving a list of all variables for a specified workflow instance. You can make a `GET` request to the following endpoint:

```bash
curl --location
'https://localhost:5001/elsa/api/workflow-instances/{your-workflow-instance-id}/variables' \
--header 'Authorization: ApiKey {your-api-key}'
```

The API returns a JSON object containing the variables associated with the workflow instance. Below is an example response:

```json
{
    "items": [
        {
            "id": "ff1c0b14864811ea",
            "name": "Message",
            "value": "Hello, World!"
        },
        {
            "id": "ea1bbdf90ea22ca7",
            "name": "Sender",
            "value": "Elsa"
        }
    ],
    "count": 2
}
```

Each item in the response includes the variable's unique `id`, `name`, and `value`, allowing you to inspect the current state of the workflow instance's variables.

### Updating﻿ <a href="#api-update-variables" id="api-update-variables"></a>

To update one or more variables in a workflow instance via the API, send a `POST` request to the following endpoint:

```bash
curl --location
'https://localhost:5001/elsa/api/workflow-instances/{your-workflow-instance-id}/variables' \
--header 'Content-Type: application/json' \
--header 'Authorization: ApiKey {your-api-key}' \
--data '{
"variables": [
    {
        "id": "ff1c0b14864811ea",
        "value": "Hello, Elsa!"
    },
    {
        "id": "ea1bbdf90ea22ca7",
        "value": "World"
    }
]
}'
```

The request payload specifies the `id` of each variable to update, along with the new `value`. Ensure the variable IDs match those in the workflow instance to prevent accidental data mismatches.
