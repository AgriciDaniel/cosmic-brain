// publish-workflow.cs
// Example: Create and publish a workflow definition using elsa-api-client
// 
// This example demonstrates publishing a workflow definition with options including
// CommitStrategyName, ActivationStrategyType, and AutoUpdateConsumingWorkflows.
//
// Code Reference: src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/

using Elsa.Api.Client.Resources.WorkflowDefinitions.Contracts;
using Elsa.Api.Client.Resources.WorkflowDefinitions.Models;
using Elsa.Api.Client.Resources.WorkflowDefinitions.Requests;

namespace Elsa.Examples.ApiClient;

/// <summary>
/// Service for publishing workflow definitions via the Elsa API client.
/// </summary>
public class WorkflowPublishingService
{
    private readonly IWorkflowDefinitionsApi _workflowDefinitionsApi;

    public WorkflowPublishingService(IWorkflowDefinitionsApi workflowDefinitionsApi)
    {
        _workflowDefinitionsApi = workflowDefinitionsApi;
    }

    /// <summary>
    /// Creates and publishes a workflow definition with the specified options.
    /// </summary>
    /// <param name="definitionId">Unique identifier for the workflow definition.</param>
    /// <param name="name">Display name for the workflow.</param>
    /// <returns>The created workflow definition.</returns>
    public async Task<WorkflowDefinition> PublishWorkflowAsync(
        string definitionId,
        string name)
    {
        // Build the workflow definition model
        var model = new WorkflowDefinitionModel
        {
            // Unique definition identifier
            DefinitionId = definitionId,
            
            // Display name and description
            Name = name,
            Description = $"Workflow created via API at {DateTime.UtcNow:O}",
            
            // Version control
            Version = 1,
            IsPublished = true,
            
            // Root activity - the entry point of the workflow
            Root = BuildRootActivity(),
            
            // Workflow options for behavior control
            Options = new WorkflowOptions
            {
                // Commit strategy: controls when state is persisted
                // Options: "WorkflowExecuted", "ActivityExecuted", "Periodic"
                // See DOC-021 (Performance Guide) for details
                CommitStrategyName = "WorkflowExecuted",
                
                // Activation strategy: controls instance creation
                // "Default" - each trigger creates new instance
                // "Singleton" - only one running instance per definition
                ActivationStrategyType = "Default",
                
                // When true, consuming workflows update automatically
                // when this definition is republished
                AutoUpdateConsumingWorkflows = true
            }
        };

        // Create the save request with publish flag
        var request = new SaveWorkflowDefinitionRequest
        {
            Model = model,
            Publish = true  // Immediately publish this version
        };

        // Save and publish the workflow definition
        var response = await _workflowDefinitionsApi.SaveAsync(request);
        
        return response;
    }

    /// <summary>
    /// Publishes an existing draft workflow definition.
    /// </summary>
    /// <param name="definitionId">The definition ID to publish.</param>
    /// <returns>The published workflow definition.</returns>
    public async Task<WorkflowDefinition> PublishExistingDraftAsync(string definitionId)
    {
        var request = new PublishWorkflowDefinitionRequest
        {
            DefinitionId = definitionId
        };

        var response = await _workflowDefinitionsApi.PublishAsync(request);
        return response;
    }

    /// <summary>
    /// Builds the root activity for the workflow.
    /// This example creates a simple sequence with logging activities.
    /// </summary>
    private static Activity BuildRootActivity()
    {
        // Create a sequence activity as the root
        // Using type constants prevents typos and improves maintainability
        return new Activity
        {
            Type = ActivityTypes.Sequence,
            Id = "root-sequence",
            // Activities within the sequence would be configured here
            // based on your workflow requirements
        };
    }
}

/// <summary>
/// Constants for common activity type names.
/// Note: Each example file includes its own constants for self-contained usage.
/// In a real project, define these once in a shared location.
/// </summary>
public static class ActivityTypes
{
    public const string Sequence = "Elsa.Sequence";
    public const string WriteLine = "Elsa.WriteLine";
}

// Usage Example:
// 
// var services = new ServiceCollection();
// services.AddElsaClient(client =>
// {
//     client.BaseUrl = new Uri("https://your-elsa-server.com");
//     client.ApiKey = "YOUR_API_KEY";
// });
// 
// var serviceProvider = services.BuildServiceProvider();
// var publishingService = serviceProvider.GetRequiredService<WorkflowPublishingService>();
// 
// var definition = await publishingService.PublishWorkflowAsync(
//     definitionId: "order-processing-workflow",
//     name: "Order Processing Workflow");
// 
// Console.WriteLine($"Published workflow: {definition.DefinitionId} v{definition.Version}");
