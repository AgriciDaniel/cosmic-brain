# Running Workflows

There are multiple ways to run a workflow:

* Using Elsa Studio.
* Using a trigger, such as HTTP Endpoint.
* Using Dispatch Workflow Activity
* Using the Elsa REST API.
* Using the Elsa library.

In this guide, we will see an example of each of these methods.

## Before you start﻿ <a href="#before-you-start" id="before-you-start"></a>

For this guide, you will need the following:

* An [Elsa Server](../../application-types/elsa-server.md) project
* An [Elsa Studio](../../getting-started/containers/docker.md#elsa-studio) instance

## Running Workflows via REST API

The Elsa Server exposes REST API endpoints that allow you to execute workflows programmatically. This is useful for integrating workflows into external applications or services.

### Execute a Workflow by Definition ID

To execute a workflow by its definition ID, send a POST request to the following endpoint:

```
POST /elsa/api/workflow-definitions/{definitionId}/execute
```

#### Example using cURL

```bash
curl --location --request POST 'https://localhost:5001/elsa/api/workflow-definitions/my-workflow/execute' \
--header 'Authorization: ApiKey YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
  "input": {
    "message": "Hello from API",
    "userId": 123
  },
  "correlationId": "optional-correlation-id"
}'
```

#### Example using HTTPie

```bash
http POST https://localhost:5001/elsa/api/workflow-definitions/my-workflow/execute \
  Authorization:"ApiKey YOUR_API_KEY" \
  input:='{"message":"Hello from API","userId":123}' \
  correlationId="optional-correlation-id"
```

#### Request Body Parameters

* `input` (optional): A dictionary of input values to pass to the workflow
* `correlationId` (optional): A correlation ID to associate with the workflow instance
* `name` (optional): A custom name for the workflow instance
* `triggerActivityId` (optional): The ID of a specific trigger activity to start from
* `versionOptions` (optional): Options for selecting the workflow version

#### Sample Response

```json
{
  "workflowState": {
    "id": "workflow-instance-id",
    "definitionId": "my-workflow",
    "definitionVersionId": "version-id",
    "status": "Finished",
    "subStatus": "Finished",
    "output": {
      "result": "Workflow completed successfully"
    }
  }
}
```

### Synchronous vs Asynchronous Execution

The Elsa Server REST API supports two execution modes:

**Synchronous Execution** (`/execute` endpoint):
- The HTTP request waits for the workflow to complete before returning a response
- Use this when the workflow is designed to return a result immediately (e.g., HTTP workflows with response activities)
- The response includes the final workflow state and any output values
- Timeout considerations: Long-running workflows may exceed HTTP timeout limits

**Asynchronous Execution** (`/dispatch` endpoint):
- The HTTP request returns immediately after queuing the workflow for execution
- Use this for long-running workflows or fire-and-forget scenarios
- The response includes the workflow instance ID for later status queries
- Recommended for workflows that don't need to respond synchronously

#### Example: Synchronous Execution

```bash
curl --location --request POST 'https://localhost:5001/elsa/api/workflow-definitions/my-workflow/execute' \
  --header 'Authorization: ApiKey YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{"input": {"orderId": "12345"}}'
```

#### Example: Asynchronous Execution (Fire-and-Forget)

```bash
curl --location --request POST 'https://localhost:5001/elsa/api/workflow-definitions/my-workflow/dispatch' \
  --header 'Authorization: ApiKey YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{"input": {"orderId": "12345"}}'
```

### Authentication

The REST API requires authentication. The `Authorization` header value depends on your authentication configuration:

**Common Authentication Schemes:**

1. **API Key Authentication** (most common in Elsa Server):
   ```
   Authorization: ApiKey YOUR_API_KEY
   ```

2. **Bearer Token Authentication** (JWT):
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

3. **Basic Authentication**:
   ```
   Authorization: Basic BASE64_ENCODED_CREDENTIALS
   ```

#### Obtaining API Keys

The method for obtaining API keys depends on your Elsa Server setup:

- **Elsa Server with Identity**: Use the identity endpoints to register users and generate API keys
- **Custom Authentication**: Refer to your organization's authentication provider
- **Development/Testing**: API keys may be pre-configured in `appsettings.json` or generated via Elsa Studio

For detailed information about configuring authentication, setting up API keys, and implementing custom authentication schemes, see the [Security and Authentication Guide](../security/README.md).

> **Important**: The `Authorization` header examples in this guide use `ApiKey YOUR_API_KEY` as a placeholder. Replace this with your actual authentication scheme and credentials based on your Elsa Server configuration. The authorization format and credentials depend on how authentication is configured in your Elsa Server instance.

### Troubleshooting REST API Execution

This section covers common issues when executing workflows via the REST API.

#### Issue: Workflow Starts but HTTP Response Activity Not Reached

**Symptoms:**
- You call the `/execute` endpoint to start an HTTP workflow
- The API returns immediately with a workflow instance ID
- The workflow starts executing but never reaches the HTTP Response activity
- The HTTP client receives an incomplete or unexpected response

**Possible Causes:**

1. **Wrong Endpoint**: Using `/dispatch` instead of `/execute`
   - **Solution**: Use the `/execute` endpoint for synchronous HTTP workflows that need to return a response. The `/dispatch` endpoint is fire-and-forget and returns immediately without waiting for workflow completion.

2. **Workflow Not Designed for Synchronous Execution**:
   - The workflow may contain blocking activities (delays, waiting for external events) that suspend execution
   - **Solution**: Ensure the workflow completes synchronously without suspension. Remove or reconfigure blocking activities for synchronous HTTP workflows.

3. **HTTP Response Activity Misconfigured**:
   - The HTTP Response activity may not be connected properly in the workflow graph
   - Output expressions may be incorrect or throw exceptions
   - **Solution**: Verify the workflow design in Elsa Studio. Check that the HTTP Response activity is on the execution path and its properties are correctly configured.

4. **Workflow Faults Before Reaching Response Activity**:
   - An activity before the HTTP Response activity throws an exception
   - **Solution**: Check the workflow execution logs and incidents for errors. Use the [Troubleshooting Guide](../troubleshooting/README.md) to diagnose faulted activities.

5. **Timeout Issues**:
   - The workflow takes too long and the HTTP client times out
   - **Solution**: Increase the HTTP client timeout, or redesign the workflow to complete faster. For long-running workflows, use the `/dispatch` endpoint and implement a callback or polling mechanism.

6. **Missing HTTP Workflow Configuration**:
   - Elsa Server may not be configured to handle HTTP workflows properly
   - **Solution**: Ensure `UseHttp()` is called in the Elsa configuration and that the HTTP middleware is registered:
   
   ```csharp
   builder.Services.AddElsa(elsa =>
   {
       elsa.UseHttp(); // Required for HTTP workflows
   });
   
   // In the app builder
   app.UseWorkflowsApi();
   app.UseWorkflows(); // Registers HTTP endpoints for workflow triggers
   ```

#### Debugging Steps

1. **Check Workflow Execution Status**:
   ```bash
   curl --location 'https://localhost:5001/elsa/api/workflow-instances/{instanceId}' \
     --header 'Authorization: ApiKey YOUR_API_KEY'
   ```

2. **Review Execution Logs**:
   - Check the `WorkflowExecutionLog` table or use Elsa Studio to view the workflow execution history
   - Look for activities that faulted or didn't execute

3. **Verify Workflow Design**:
   - Open the workflow in Elsa Studio
   - Ensure the HTTP Response activity is reachable from the HTTP Endpoint trigger
   - Test the workflow in the Studio designer

4. **Enable Detailed Logging**:
   ```json
   {
     "Logging": {
       "LogLevel": {
         "Elsa": "Debug",
         "Elsa.Http": "Debug"
       }
     }
   }
   ```

5. **Test with a Simple Workflow**:
   - Create a minimal workflow: HTTP Endpoint → HTTP Response
   - If this works, incrementally add activities to identify the problematic step

For more troubleshooting guidance, see the [Troubleshooting Guide](../troubleshooting/README.md).

## Running Workflows via the Library

You can also run workflows programmatically from your .NET application using Elsa's API client or by directly using the workflow runtime services.

### Using IWorkflowRunner

The `IWorkflowRunner` service executes workflows directly in-process. This is useful for short-lived workflows that don't require background execution.

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Microsoft.Extensions.DependencyInjection;

// Setup service container
var services = new ServiceCollection();
services.AddElsa();
var serviceProvider = services.BuildServiceProvider();

// Define a workflow
var workflow = new Sequence
{
    Activities =
    {
        new WriteLine("Starting workflow..."),
        new WriteLine("Processing data..."),
        new WriteLine("Workflow completed!")
    }
};

// Get the workflow runner (IWorkflowRunner is in Elsa.Workflows namespace)
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();

// Execute the workflow
var result = await workflowRunner.RunAsync(workflow);

Console.WriteLine($"Workflow status: {result.WorkflowState.Status}");
```

### Using IWorkflowRuntime (New Client API)

For running workflows by definition ID with input parameters, use the new `IWorkflowRuntime` client API:

```csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Messages;
using Elsa.Workflows.Models;
using Microsoft.Extensions.DependencyInjection;

// Assume you have a configured service provider with Elsa services
var workflowRuntime = serviceProvider.GetRequiredService<IWorkflowRuntime>();

// Create a workflow client
var client = await workflowRuntime.CreateClientAsync();

// Create and run a workflow instance with input
var result = await client.CreateAndRunInstanceAsync(new CreateAndRunWorkflowInstanceRequest
{
    WorkflowDefinitionHandle = WorkflowDefinitionHandle.ByDefinitionId("my-workflow"),
    Input = new Dictionary<string, object>
    {
        ["message"] = "Hello from the library!",
        ["userId"] = 123
    },
    CorrelationId = "optional-correlation-id",
    IncludeWorkflowOutput = true
});

// Access the workflow state
var workflowState = result.WorkflowState;
Console.WriteLine($"Workflow status: {workflowState.Status}");

// Access output if available
if (workflowState.Output != null)
{
    foreach (var output in workflowState.Output)
    {
        Console.WriteLine($"Output {output.Key}: {output.Value}");
    }
}
```

### Using IWorkflowRuntime (Legacy API - Obsolete)

> **Note:** The following API is marked as obsolete in Elsa 3.2+. Use the new client API shown above instead.

```csharp
using Elsa.Workflows.Runtime;
using Elsa.Workflows.Runtime.Parameters;
using Microsoft.Extensions.DependencyInjection;

var workflowRuntime = serviceProvider.GetRequiredService<IWorkflowRuntime>();

// Start a workflow with input parameters (obsolete API)
var result = await workflowRuntime.StartWorkflowAsync(
    "my-workflow",
    new StartWorkflowRuntimeParams
    {
        Input = new Dictionary<string, object>
        {
            ["message"] = "Hello!",
            ["userId"] = 123
        },
        CorrelationId = "my-correlation-id"
    });

Console.WriteLine($"Workflow status: {result.WorkflowState.Status}");
```

### Comparison: IWorkflowRunner vs IWorkflowRuntime vs IWorkflowDispatcher

Understanding when to use each workflow execution service is important for designing your application architecture:

| Feature | IWorkflowRunner | IWorkflowRuntime | IWorkflowDispatcher |
|---------|----------------|------------------|---------------------|
| **Execution Model** | Synchronous, in-process | Asynchronous with persistence | Queue-based dispatching |
| **Use Case** | Unit tests, simple workflows | Most application scenarios | Background processing, distributed systems |
| **Persistence** | No (in-memory only) | Yes | Yes (via runtime) |
| **State Management** | Transient | Full state tracking | Managed by runtime |
| **Resumption Support** | No | Yes | Yes |
| **Bookmark Support** | Limited | Full | Full |
| **Distributed Execution** | No | Limited | Yes |
| **API Complexity** | Simple | Moderate | Advanced |
| **Typical Namespace** | `Elsa.Workflows` | `Elsa.Workflows.Runtime` | `Elsa.Workflows.Runtime` |

#### When to Use Each

**Use IWorkflowRunner when:**
- Writing unit tests for workflow logic
- Executing simple, short-lived workflows that don't need persistence
- Running workflows entirely in-process without external dependencies
- You need immediate, synchronous execution

**Use IWorkflowRuntime when:**
- Building applications that need workflow persistence and state management
- You need to resume workflows after suspension (bookmarks, delays)
- You want the high-level client API for workflow operations
- Most production scenarios with standard execution requirements

**Use IWorkflowDispatcher when:**
- Implementing custom workflow execution strategies
- Building queue-based or message-driven workflow systems
- Creating distributed workflow architectures across multiple nodes
- You need fine-grained control over workflow dispatching and execution

For more details on the dispatcher architecture, see the [Workflow Dispatcher Guide](../architecture/workflow-dispatcher.md).
