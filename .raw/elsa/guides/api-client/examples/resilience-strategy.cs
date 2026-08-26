// resilience-strategy.cs
// Example: Configuring resilience strategies for activities
//
// This example demonstrates conceptual patterns for setting resilience strategies
// for activities to handle transient failures with retry and backoff.
//
// IMPORTANT: The exact API depends on your elsa-api-client version.
// Check the Elsa documentation and API client source for current methods.
// Reference: src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/

using Elsa.Api.Client.Resources.WorkflowDefinitions.Models;

namespace Elsa.Examples.ApiClient;

/// <summary>
/// Demonstrates conceptual patterns for configuring resilience strategies.
/// The exact API may vary by version - consult current elsa-api-client documentation.
/// </summary>
public static class ResilienceStrategyExamples
{
    // Property key for resilience configuration in CustomProperties
    private const string ResiliencePropertyKey = "resilience";
    
    /// <summary>
    /// Creates an HTTP activity with a resilience strategy configured.
    /// </summary>
    /// <returns>An activity with retry configuration.</returns>
    public static Activity CreateResilientHttpActivity()
    {
        var activity = new Activity
        {
            Type = ActivityTypes.SendHttpRequest,
            Id = "http-call-with-retry"
        };

        // Configure resilience strategy for transient failure handling
        // Note: The exact API depends on your elsa-api-client version.
        // WARNING: The following code is a conceptual/proposed pattern and may not reflect the actual Elsa API.
        // You MUST consult the Elsa documentation and source code for the correct way to configure resilience strategies.
        
        activity.CustomProperties[ResiliencePropertyKey] = new ResilienceConfiguration
        {
            // Number of retry attempts
            RetryCount = 3,
            
            // Initial delay between retries
            InitialDelay = TimeSpan.FromSeconds(2),
            
            // Backoff multiplier (exponential backoff)
            BackoffMultiplier = 2.0,
            
            // Maximum delay between retries
            MaxDelay = TimeSpan.FromSeconds(30),
            
            // Jitter to prevent thundering herd
            JitterEnabled = true
        };

        return activity;
    }

    /// <summary>
    /// Creates a workflow with multiple activities having different resilience strategies.
    /// </summary>
    /// <returns>Root activity with resilience-configured children.</returns>
    public static Activity CreateWorkflowWithResilienceStrategies()
    {
        // Sequence with multiple HTTP calls, each with different resilience needs
        return new Activity
        {
            Type = ActivityTypes.Sequence,
            Id = "root-sequence",
            // Child activities would be configured here based on your workflow
        };
    }

    /// <summary>
    /// Example of checking and handling activity failures after workflow execution.
    /// </summary>
    public static void HandleActivityIncidents(WorkflowInstance instance)
    {
        // Check if the workflow has faulted
        if (instance.Status == WorkflowStatus.Faulted)
        {
            Console.WriteLine($"Workflow {instance.Id} has faulted.");
            
            // Check for fault information
            if (instance.Faults != null)
            {
                foreach (var fault in instance.Faults)
                {
                    Console.WriteLine($"  Activity: {fault.ActivityId}");
                    Console.WriteLine($"  Message: {fault.Message}");
                    Console.WriteLine($"  Exception: {fault.ExceptionType}");
                    Console.WriteLine();
                }
            }
            
            // Consider retry strategies:
            // 1. Fix the issue and resume from the faulted activity
            // 2. Cancel and restart the workflow
            // 3. Alert operators for manual intervention
        }
    }
}

/// <summary>
/// Configuration model for resilience strategy.
/// Note: Check the actual elsa-api-client models for the correct structure.
/// </summary>
public class ResilienceConfiguration
{
    /// <summary>
    /// Number of retry attempts before giving up.
    /// </summary>
    public int RetryCount { get; set; } = 3;

    /// <summary>
    /// Initial delay between retry attempts.
    /// </summary>
    public TimeSpan InitialDelay { get; set; } = TimeSpan.FromSeconds(1);

    /// <summary>
    /// Multiplier for exponential backoff.
    /// </summary>
    public double BackoffMultiplier { get; set; } = 2.0;

    /// <summary>
    /// Maximum delay between retry attempts.
    /// </summary>
    public TimeSpan MaxDelay { get; set; } = TimeSpan.FromMinutes(1);

    /// <summary>
    /// Whether to add random jitter to delays.
    /// </summary>
    public bool JitterEnabled { get; set; } = true;
}

/// <summary>
/// Constants for common activity type names.
/// Note: Each example file includes its own constants for self-contained usage.
/// In a real project, define these once in a shared location.
/// </summary>
public static class ActivityTypes
{
    public const string Sequence = "Elsa.Sequence";
    public const string SendHttpRequest = "Elsa.SendHttpRequest";
    public const string WriteLine = "Elsa.WriteLine";
    public const string HttpEndpoint = "Elsa.HttpEndpoint";
}

// Placeholder types for compilation reference
// In actual usage, these come from Elsa.Api.Client
public class WorkflowInstance
{
    public required string Id { get; set; }
    public WorkflowStatus Status { get; set; }
    public List<Fault>? Faults { get; set; }
}

public class Fault
{
    public required string ActivityId { get; set; }
    public required string Message { get; set; }
    public string? ExceptionType { get; set; }
}

public enum WorkflowStatus
{
    Running,
    Suspended,
    Finished,
    Faulted
}

// Usage Example:
//
// // Create an activity with resilience configuration
// var httpActivity = ResilienceStrategyExamples.CreateResilientHttpActivity();
//
// // Add to workflow definition
// var workflowModel = new WorkflowDefinitionModel
// {
//     DefinitionId = "resilient-workflow",
//     Name = "Resilient API Integration",
//     Root = httpActivity,
//     Options = new WorkflowOptions
//     {
//         CommitStrategyName = "ActivityExecuted" // Persist after each activity
//     }
// };
//
// // After workflow execution, handle any incidents
// var instance = await instancesApi.GetAsync(instanceId);
// ResilienceStrategyExamples.HandleActivityIncidents(instance);
//
// See also:
// - Elsa documentation: https://elsa-workflows.github.io/elsa-core/docs/next/guides/incidents/
// - Incident strategies: See Elsa documentation for handling workflow incidents and strategies.
