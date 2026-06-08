---
type: concept
title: Elsa Expressions
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - expressions
  - csharp
  - javascript
  - python
  - liquid
status: developing
address: c-000070
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa Expressions

Elsa Workflows supports multiple expression languages for writing dynamic expressions in activity inputs, conditions, and variable assignments. Each expression engine can be installed and configured independently.

## Expression Providers Overview

| Provider | Package Name | Engine | Best For |
|----------|-------------|--------|---------|
| C# | `Elsa.Expressions.CSharp` | Roslyn | Complex logic, .NET ecosystem access |
| JavaScript | `Elsa.Expressions.JavaScript` | Jint | Web developers, simple expressions |
| Python | `Elsa.Expressions.Python` | Pythonnet | Data science, scripting |
| Liquid | `Elsa.Expressions.Liquid` | Fluid | Templates, non-technical users |

## C# Expressions

### Installation

```bash
dotnet add package Elsa.Expressions.CSharp
```

```csharp
services.AddElsa(elsa => elsa.UseCSharp());
```

### Configuration

```csharp
elsa.UseCSharp(options =>
{
    options.Assemblies.Add(GetType().Assembly);
    options.Namespaces.Add(typeof(MyEntity).Namespace!);
    options.AppendScript("string Greet(string name) => $\"Hello {name}!\";");
});
```

### Available Namespaces (built-in)

- `System`
- `System.Collections.Generic`
- `System.Linq`
- `System.Text.Json`
- `System.Text.Json.Serialization`
- `System.Text.Nodes`

### Global Members

| Member | Type | Description |
|--------|------|-------------|
| `WorkflowInstanceId` | `string` | ID of the currently executing workflow instance |
| `CorrelationId` | `string` | Correlation ID of the currently executing workflow |

### `Variable` Object

Provides access to workflow variables with strongly-typed properties:

```csharp
T? Get<T>(string name);
object? Get(string name);
void Set(string name, object? value);

// Typed access (if OrderId variable is defined):
Guid OrderId { get; set; }
```

### `Output` Object

```csharp
object? From(string activityIdOrName, string? outputName = null);
T? From<T>(string activityIdOrName, string? outputName = null);
object? LastResult { get; }
```

### `Input` Object

```csharp
object? Get(string name);
T? Get<T>(string name);

// Strongly-typed (if OrderNumber input is defined):
string OrderNumber { get; }
```

## JavaScript Expressions

### Installation

```bash
dotnet add package Elsa.Expressions.JavaScript
```

```csharp
services.AddElsa(elsa => elsa.UseJavaScript());
```

### Configuration

```csharp
elsa.UseJavaScript(options =>
{
    options.AllowClrAccess = true;
    options.RegisterType<Order>();
    options.ConfigureEngine(engine =>
    {
        engine.Execute("function greet(name) { return `Hello ${name}!`; }");
    });
});
```

### Global Functions

| Function | Description |
|----------|-------------|
| `getWorkflowInstanceId()` | Returns the current workflow instance ID |
| `getWorkflowDefinitionId()` | Returns the workflow definition ID |
| `getWorkflowDefinitionVersionId()` | Returns the version ID |
| `getWorkflowDefinitionVersion()` | Returns the version number |
| `setCorrelationId(value)` | Sets the correlation ID |
| `getCorrelationId()` | Gets the correlation ID |
| `setVariable(name, value)` | Sets a workflow variable by name |
| `getVariable(name)` | Gets a workflow variable by name |
| `getInput(name)` | Gets a workflow input by name |
| `getOutputFrom(activityIdOrName, outputName?)` | Gets output from an activity |
| `getLastResult()` | Gets the last activity's result |
| `isNullOrWhiteSpace(value)` | Checks if string is null/empty/whitespace |
| `isNullOrEmpty(value)` | Checks if string is null/empty |
| `parseGuid(value)` | Parses a string to Guid |
| `newGuid()` | Creates a new Guid |
| `newGuidString()` | Creates a new Guid string |
| `newShortGuid()` | Creates a short GUID string |
| `bytesToString(buffer)` | Converts byte array to string |
| `bytesFromString(value)` | Converts string to byte array |
| `bytesToBase64(buffer)` | Converts byte array to base64 |
| `bytesFromBase64(base64)` | Converts base64 to byte array |
| `stringToBase64(value)` | Converts string to base64 |
| `stringFromBase64(base64)` | Converts base64 to string |
| `streamToBytes(value)` | Converts stream to byte array |
| `streamToBase64(value)` | Converts stream to base64 |

### `variables` Object

Provides strongly-typed access to workflow variables by name:

```javascript
variables.OrderId = newGuid();
const orderId = variables.OrderId;
```

### `JSON` Object

```javascript
JSON.stringify(object value);
JSON.parse(string json);
```

### Auto-Generated Functions

For each workflow input or variable named e.g. `OrderNumber`, Elsa generates:
- `getOrderNumber()` -- getter function
- `setOrderNumber(value)` -- setter function (variables only)

## Python Expressions

### Prerequisites

Python must be installed on the system and the `PYTHONNET_PYDLL` environment variable must point to the Python shared library (e.g., `python38.dll` on Windows, `libpython3.8.dylib` on macOS). Set `PYTHONNET_RUNTIME` to `coreclr`.

### Installation

```bash
dotnet add package Elsa.Expressions.Python
```

```csharp
services.AddElsa(elsa => elsa.UsePython());
```

### Global Objects

| Object | Description |
|--------|-------------|
| `variables` | Access workflow variables by name (e.g., `variables.OrderId`) or via `variables.get("OrderId")` / `variables.set("OrderId", value)` |
| `output` | Access activity output: `output.get(activityName)` and `output.last_result()` |
| `input` | Access workflow input: `input.get(name)` |
| `execution_context` | Access `workflow_instance_id` and `correlation_id` |

```python
import uuid
variables.OrderId = uuid.uuid4()
orderId = variables.OrderId
```

## Liquid Expressions

### Installation

```bash
dotnet add package Elsa.Expressions.Liquid
```

```csharp
services.AddElsa(elsa => elsa.UseLiquid());
```

### Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `json` | Serializes a value to JSON string | `{{ some_value \| json }}` |
| `base64` | Converts a value to base64 string | `{{ some_value \| base64 }}` |

### Global Objects

| Object | Description | Example |
|--------|-------------|---------|
| `Variables` | Access workflow variables | `{{ Variables.OrderId }}` |
| `Input` | Access workflow inputs | `{{ Input.OrderNumber }}` |
| `WorkflowInstanceId` | Current workflow instance ID | `{{ WorkflowInstanceId }}` |
| `WorkflowDefinitionId` | Current workflow definition ID | `{{ WorkflowDefinitionId }}` |
| `WorkflowDefinitionVersionId` | Current version ID | `{{ WorkflowDefinitionVersionId }}` |
| `WorkflowDefinitionVersion` | Current version number | `{{ WorkflowDefinitionVersion }}` |
| `CorrelationId` | Current correlation ID | `{{ CorrelationId }}` |

## Expression Selection

When configuring activity inputs in Elsa Studio, users select:
- **Literal**: A fixed, hardcoded value
- **C#**: Dynamic C# expression
- **JavaScript**: Dynamic JavaScript expression
- **Python**: Dynamic Python expression
- **Liquid**: Template-based Liquid expression

The appropriate expression type depends on the use case, developer skillset, and performance requirements.
