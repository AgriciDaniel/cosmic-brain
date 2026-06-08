/*
 * Fan-In Trigger Example
 * 
 * This file demonstrates a trigger that waits for multiple signals with a shared
 * aggregation key to arrive before completing. This is useful for fan-in scenarios
 * where multiple parallel operations (potentially from different systems or workflow
 * instances) must complete before a workflow can continue.
 * 
 * For the complete implementation, see:
 * - activities/blocking-and-triggers/SignalFanInTrigger.cs
 * 
 * References:
 * - elsa-core: src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs
 * - elsa-core: src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs
 */

using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;
using Elsa.Workflows.Runtime;

namespace CustomActivities.Examples;

// ============================================================================
// PAYLOAD SHAPE
// ============================================================================

/// <summary>
/// The payload structure used for signal correlation.
/// Both the trigger and the code resuming the workflow must use the same structure.
/// </summary>
public record SignalPayload
{
    /// <summary>
    /// Logical signal name (e.g., "TaskCompleted", "ApprovalReceived")
    /// </summary>
    public string SignalName { get; init; } = string.Empty;

    /// <summary>
    /// Aggregation key used to group signals together.
    /// Typically the correlation ID or a composite key.
    /// Example: "Order-12345" or "Batch-2024-001"
    /// </summary>
    public string AggregationKey { get; init; } = string.Empty;
}

/// <summary>
/// Data carried with each signal for processing in the workflow.
/// </summary>
public record SignalData
{
    public string SignalName { get; init; } = string.Empty;
    public string Source { get; init; } = string.Empty;
    public DateTime ReceivedAt { get; init; } = DateTime.UtcNow;
    public Dictionary<string, object> Data { get; init; } = new();
}

// ============================================================================
// RESUMING VIA IWorkflowResumer
// ============================================================================

/// <summary>
/// Example controller showing how to resume a workflow waiting for fan-in signals.
/// </summary>
public class SignalController
{
    private readonly IWorkflowResumer _workflowResumer;

    public SignalController(IWorkflowResumer workflowResumer)
    {
        _workflowResumer = workflowResumer;
    }

    /// <summary>
    /// Send a signal to resume workflows waiting for fan-in completion.
    /// </summary>
    /// <param name="signalName">The signal name (must match what the trigger is waiting for)</param>
    /// <param name="aggregationKey">The aggregation key (must match the workflow's key)</param>
    /// <param name="source">Source identifier (e.g., "Worker-1", "ServiceA")</param>
    /// <param name="data">Optional additional data to pass to the workflow</param>
    public async Task<int> SendSignalAsync(
        string signalName,
        string aggregationKey,
        string source,
        Dictionary<string, object>? data = null)
    {
        // Create stimulus matching the trigger's payload structure
        // IMPORTANT: The payload shape must exactly match what was used in CreateBookmark
        var stimulus = new BookmarkStimulus
        {
            // This must match the BookmarkName used in the trigger
            BookmarkName = "SignalFanIn",
            
            // This payload is hashed to find matching bookmarks
            Payload = new SignalPayload
            {
                SignalName = signalName,
                AggregationKey = aggregationKey
            }
        };

        // Input data passed to the workflow's resume callback
        var input = new Dictionary<string, object>
        {
            ["SignalData"] = new SignalData
            {
                SignalName = signalName,
                Source = source,
                ReceivedAt = DateTime.UtcNow,
                Data = data ?? new Dictionary<string, object>()
            }
        };

        // Resume all matching workflows
        // Note: Multiple workflows could be waiting for the same signal
        var results = await _workflowResumer.ResumeAsync(stimulus, input);

        return results.Count;
    }

    /// <summary>
    /// Example: Complete a batch processing fan-in.
    /// </summary>
    public async Task CompleteBatchTaskAsync(
        string batchId,
        string workerId,
        object taskResult)
    {
        await SendSignalAsync(
            signalName: "BatchTaskCompleted",
            aggregationKey: $"Batch-{batchId}",
            source: workerId,
            data: new Dictionary<string, object>
            {
                ["Result"] = taskResult,
                ["CompletedAt"] = DateTime.UtcNow
            }
        );
    }
}

// ============================================================================
// USAGE EXAMPLE: Creating a fan-in workflow
// ============================================================================

/*
Example workflow that waits for 3 signals before continuing:

1. Workflow starts and creates 3 parallel tasks (dispatched to workers)
2. Workflow creates a SignalFanInTrigger with:
   - SignalName = "TaskCompleted"
   - AggregationKey = correlationId
   - RequiredCount = 3
3. Workflow suspends waiting for signals
4. As each worker completes, it calls SendSignalAsync
5. After 3 signals received, workflow continues

Workflow JSON snippet:
{
  "activities": [
    {
      "id": "dispatch-tasks",
      "type": "Custom.DispatchParallelTasks",
      "taskCount": 3
    },
    {
      "id": "wait-for-all",
      "type": "Custom.SignalFanInTrigger",
      "signalName": "TaskCompleted",
      "aggregationKey": {
        "expression": {
          "type": "JavaScript",
          "value": "getCorrelationId()"
        }
      },
      "requiredCount": 3
    },
    {
      "id": "process-results",
      "type": "Custom.ProcessAllResults"
    }
  ]
}
*/

// ============================================================================
// ALTERNATIVE: Using existing Signal activity
// ============================================================================

/*
If you don't need custom fan-in logic with counting, you can use Elsa's 
built-in Signal activity in a Fork/Join pattern:

{
  "type": "Elsa.Fork",
  "branches": [
    {
      "activities": [
        { "type": "Elsa.Signal", "signalName": "Task1Completed" }
      ]
    },
    {
      "activities": [
        { "type": "Elsa.Signal", "signalName": "Task2Completed" }
      ]
    },
    {
      "activities": [
        { "type": "Elsa.Signal", "signalName": "Task3Completed" }
      ]
    }
  ],
  "joinMode": "WaitAll"
}

Then resume each with:

await _signalSender.SendSignalAsync("Task1Completed", workflowInstanceId);
await _signalSender.SendSignalAsync("Task2Completed", workflowInstanceId);
await _signalSender.SendSignalAsync("Task3Completed", workflowInstanceId);
*/
