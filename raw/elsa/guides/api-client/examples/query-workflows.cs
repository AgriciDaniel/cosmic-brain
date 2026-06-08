// query-workflows.cs
// Example: Querying workflow instances using elsa-api-client
//
// This example demonstrates filtering instances by:
// - CorrelationId
// - Status (Running, Suspended, Finished, Faulted)
// - DefinitionId and version
// - Pagination parameters
//
// Code Reference: src/clients/Elsa.Api.Client/Resources/WorkflowInstances/

using Elsa.Api.Client.Resources.WorkflowInstances.Contracts;
using Elsa.Api.Client.Resources.WorkflowInstances.Requests;
using Elsa.Api.Client.Resources.WorkflowInstances.Enums;
using Elsa.Api.Client.Resources.WorkflowInstances.Models;
using Elsa.Api.Client.Shared.Models;

namespace Elsa.Examples.ApiClient;

/// <summary>
/// Service for querying workflow instances via the Elsa API client.
/// </summary>
public class WorkflowQueryService
{
    private const int MaxPageSize = 100;
    private readonly IWorkflowInstancesApi _workflowInstancesApi;

    public WorkflowQueryService(IWorkflowInstancesApi workflowInstancesApi)
    {
        _workflowInstancesApi = workflowInstancesApi;
    }

    /// <summary>
    /// Queries workflow instances by correlation ID with pagination.
    /// </summary>
    /// <param name="correlationId">The correlation ID to filter by.</param>
    /// <param name="status">Optional status filter.</param>
    /// <param name="page">Page number (0-indexed).</param>
    /// <param name="pageSize">Results per page (default: 25, max: 100).</param>
    /// <returns>Paginated list of workflow instance summaries.</returns>
    public async Task<PagedListResponse<WorkflowInstanceSummary>> QueryByCorrelationIdAsync(
        string correlationId,
        WorkflowStatus? status = null,
        int page = 0,
        int pageSize = 25)
    {
        var request = new ListWorkflowInstancesRequest
        {
            // Filter by correlation ID
            CorrelationId = correlationId,
            
            // Optional status filter
            Status = status,
            
            // Pagination - API supports max 100 results per page
            Page = page,
            PageSize = Math.Min(pageSize, MaxPageSize)
        };

        return await _workflowInstancesApi.ListAsync(request);
    }

    /// <summary>
    /// Queries running workflows for a specific definition.
    /// </summary>
    /// <param name="definitionId">The workflow definition ID.</param>
    /// <param name="page">Page number (0-indexed).</param>
    /// <param name="pageSize">Results per page.</param>
    /// <returns>Paginated list of running instances.</returns>
    public async Task<PagedListResponse<WorkflowInstanceSummary>> QueryRunningInstancesAsync(
        string definitionId,
        int page = 0,
        int pageSize = 25)
    {
        var request = new ListWorkflowInstancesRequest
        {
            DefinitionId = definitionId,
            Status = WorkflowStatus.Running,
            Page = page,
            PageSize = pageSize
        };

        return await _workflowInstancesApi.ListAsync(request);
    }

    /// <summary>
    /// Queries faulted workflow instances for monitoring/alerting.
    /// </summary>
    /// <param name="page">Page number.</param>
    /// <param name="pageSize">Results per page.</param>
    /// <returns>Paginated list of faulted instances.</returns>
    public async Task<PagedListResponse<WorkflowInstanceSummary>> QueryFaultedInstancesAsync(
        int page = 0,
        int pageSize = 25)
    {
        var request = new ListWorkflowInstancesRequest
        {
            Status = WorkflowStatus.Faulted,
            Page = page,
            PageSize = pageSize
        };

        return await _workflowInstancesApi.ListAsync(request);
    }

    /// <summary>
    /// Gets all pages of results for a query.
    /// Use with caution for large result sets.
    /// </summary>
    /// <param name="correlationId">The correlation ID to filter by.</param>
    /// <returns>All matching workflow instances.</returns>
    public async Task<List<WorkflowInstanceSummary>> GetAllByCorrelationIdAsync(
        string correlationId)
    {
        var allInstances = new List<WorkflowInstanceSummary>();
        var page = 0;
        const int pageSize = 100;
        
        while (true)
        {
            var response = await QueryByCorrelationIdAsync(
                correlationId,
                status: null,
                page: page,
                pageSize: pageSize);
            
            allInstances.AddRange(response.Items);
            
            // Check if there are more pages
            if (response.Items.Count < pageSize)
                break;
            
            page++;
        }
        
        return allInstances;
    }

    /// <summary>
    /// Prints a summary of query results.
    /// </summary>
    public void PrintQueryResults(PagedListResponse<WorkflowInstanceSummary> response)
    {
        Console.WriteLine($"Total: {response.TotalCount}");
        Console.WriteLine($"Page: {response.Page + 1}");
        Console.WriteLine($"Page Size: {response.PageSize}");
        Console.WriteLine();
        
        foreach (var instance in response.Items)
        {
            Console.WriteLine($"ID: {instance.Id}");
            Console.WriteLine($"  Definition: {instance.DefinitionId} v{instance.Version}");
            Console.WriteLine($"  Status: {instance.Status}");
            Console.WriteLine($"  Correlation: {instance.CorrelationId ?? "(none)"}");
            Console.WriteLine($"  Created: {instance.CreatedAt:O}");
            Console.WriteLine();
        }
    }
}

// Usage Example:
//
// var services = new ServiceCollection();
// services.AddElsaClient(client =>
// {
//     client.BaseUrl = new Uri("https://your-elsa-server.com");
//     client.ApiKey = "YOUR_API_KEY";
// });
// services.AddTransient<WorkflowQueryService>();
//
// var serviceProvider = services.BuildServiceProvider();
// var queryService = serviceProvider.GetRequiredService<WorkflowQueryService>();
//
// // Query by correlation ID
// var orderInstances = await queryService.QueryByCorrelationIdAsync(
//     correlationId: "order-12345",
//     status: null,
//     page: 0,
//     pageSize: 25);
//
// queryService.PrintQueryResults(orderInstances);
//
// // Query running instances for a definition
// var running = await queryService.QueryRunningInstancesAsync(
//     definitionId: "order-processing");
//
// Console.WriteLine($"Running instances: {running.TotalCount}");
//
// // Monitor faulted instances
// var faulted = await queryService.QueryFaultedInstancesAsync();
// if (faulted.TotalCount > 0)
// {
//     Console.WriteLine($"Warning: {faulted.TotalCount} faulted instances!");
// }
