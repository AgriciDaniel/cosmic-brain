// start-workflow.cs
// Example: Starting a workflow instance using elsa-api-client
//
// This example demonstrates starting a workflow with:
// - CorrelationId for multi-event correlation
// - Input dictionary for passing data to the workflow
// - Capturing the instance ID for tracking
//
// Code Reference: src/clients/Elsa.Api.Client/Resources/WorkflowInstances/

using Elsa.Api.Client.Resources.WorkflowInstances.Contracts;
using Elsa.Api.Client.Resources.WorkflowInstances.Requests;

namespace Elsa.Examples.ApiClient;

/// <summary>
/// Service for starting and managing workflow instances via the Elsa API client.
/// </summary>
public class WorkflowStarterService
{
    private readonly IWorkflowInstancesApi _workflowInstancesApi;

    public WorkflowStarterService(IWorkflowInstancesApi workflowInstancesApi)
    {
        _workflowInstancesApi = workflowInstancesApi;
    }

    /// <summary>
    /// Starts a new workflow instance with correlation ID and input data.
    /// </summary>
    /// <param name="definitionId">The workflow definition ID to execute.</param>
    /// <param name="correlationId">External identifier for correlation (e.g., order ID).</param>
    /// <param name="input">Input data dictionary to pass to the workflow.</param>
    /// <returns>The created workflow instance ID.</returns>
    public async Task<StartWorkflowResult> StartWorkflowAsync(
        string definitionId,
        string? correlationId = null,
        Dictionary<string, object>? input = null)
    {
        // Build the start request
        // Note: TriggerWorkflowsOptions is obsolete; use StartWorkflowRequest instead
        var request = new StartWorkflowRequest
        {
            // Required: The definition to execute
            DefinitionId = definitionId,
            
            // Optional: Correlation ID for tracking related events
            // Useful for multi-step workflows like order processing
            CorrelationId = correlationId,
            
            // Optional: Input data accessible in the workflow via Input expressions
            Input = input
        };

        // Start the workflow and get the instance
        var response = await _workflowInstancesApi.StartAsync(request);
        
        return new StartWorkflowResult
        {
            WorkflowInstanceId = response.WorkflowInstanceId,
            Status = response.Status.ToString()
        };
    }

    /// <summary>
    /// Starts an order processing workflow with order-specific data.
    /// </summary>
    /// <param name="orderId">The order identifier.</param>
    /// <param name="customerEmail">Customer email address.</param>
    /// <param name="orderTotal">Order total amount.</param>
    /// <returns>The workflow instance ID.</returns>
    public async Task<string> StartOrderWorkflowAsync(
        string orderId,
        string customerEmail,
        decimal orderTotal)
    {
        // Use the order ID as the correlation ID
        // This allows querying all workflow instances for a specific order
        var correlationId = $"order-{orderId}";
        
        // Build input data that the workflow can access
        var input = new Dictionary<string, object>
        {
            ["orderId"] = orderId,
            ["customerEmail"] = customerEmail,
            ["orderTotal"] = orderTotal,
            ["createdAt"] = DateTime.UtcNow
        };

        var result = await StartWorkflowAsync(
            definitionId: "order-processing",
            correlationId: correlationId,
            input: input);

        Console.WriteLine($"Started workflow instance: {result.WorkflowInstanceId}");
        Console.WriteLine($"Status: {result.Status}");
        
        return result.WorkflowInstanceId;
    }

    /// <summary>
    /// Starts a workflow with a specific version.
    /// </summary>
    /// <param name="definitionId">The workflow definition ID.</param>
    /// <param name="version">The specific version to run.</param>
    /// <returns>The workflow instance ID.</returns>
    public async Task<string> StartSpecificVersionAsync(
        string definitionId,
        int version)
    {
        var request = new StartWorkflowRequest
        {
            DefinitionId = definitionId,
            VersionOptions = new VersionOptions
            {
                Version = version
            }
        };

        var response = await _workflowInstancesApi.StartAsync(request);
        return response.WorkflowInstanceId;
    }
}

/// <summary>
/// Result of starting a workflow instance.
/// </summary>
public class StartWorkflowResult
{
    /// <summary>
    /// The ID of the created workflow instance.
    /// </summary>
    public required string WorkflowInstanceId { get; set; }
    
    /// <summary>
    /// The status of the workflow after starting (e.g., "Running", "Suspended").
    /// </summary>
    public required string Status { get; set; }
}

// Usage Example:
//
// var services = new ServiceCollection();
// services.AddElsaClient(client =>
// {
//     client.BaseUrl = new Uri("https://your-elsa-server.com");
//     client.ApiKey = "YOUR_API_KEY";
// });
// services.AddTransient<WorkflowStarterService>();
//
// var serviceProvider = services.BuildServiceProvider();
// var starter = serviceProvider.GetRequiredService<WorkflowStarterService>();
//
// // Start a simple workflow
// var result = await starter.StartWorkflowAsync(
//     definitionId: "hello-world",
//     correlationId: "session-12345");
//
// Console.WriteLine($"Instance ID: {result.WorkflowInstanceId}");
//
// // Start an order processing workflow with input data
// var instanceId = await starter.StartOrderWorkflowAsync(
//     orderId: "ORD-2025-001",
//     customerEmail: "customer@example.com",
//     orderTotal: 99.95m);
