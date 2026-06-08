using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

// NOTE: Adjust namespace to match your project
namespace CustomActivities;

/// <summary>
/// A trigger activity that waits for multiple signals with the same aggregation key.
/// This demonstrates the fan-in pattern where multiple parallel operations must complete
/// before the workflow continues.
/// 
/// Key Concepts:
/// - Inherits from Trigger base class (Elsa.Workflows.Trigger)
/// - Implements GetTriggerPayloads for trigger indexing
/// - Uses IsTriggerOfWorkflow to handle two modes:
///   * When starting a workflow: completes immediately with the triggering signal
///   * When used mid-workflow: creates bookmarks to wait for signals
/// - Aggregates signals using an aggregation key
/// - Completes when the required number of signals is received
/// 
/// Use Cases:
/// - Wait for multiple service callbacks
/// - Coordinate parallel approval workflows
/// - Aggregate data from multiple sources
/// - Implement fan-in synchronization patterns
/// 
/// Example:
/// // In a workflow
/// var fanIn = new SignalFanInTrigger
/// {
///     SignalName = new("OrderProcessed"),
///     AggregationKey = new("Order-12345"),
///     RequiredCount = new(3) // Wait for 3 signals
/// };
/// 
/// // Send signals from external code
/// await workflowResumer.ResumeAsync(
///     new BookmarkStimulus
///     {
///         BookmarkName = "SignalFanIn",
///         Payload = new SignalPayload
///         {
///             SignalName = "OrderProcessed",
///             AggregationKey = "Order-12345"
///         }
///     },
///     new Dictionary<string, object>
///     {
///         ["SignalData"] = new SignalData
///         {
///             SignalName = "OrderProcessed",
///             Source = "PaymentService",
///             Data = new Dictionary<string, object> { ["Amount"] = 100.00 }
///         }
///     });
/// </summary>
[Activity("Custom", "Triggers", "Waits for multiple signals to arrive")]
public class SignalFanInTrigger : Trigger
{
    /// <summary>
    /// Input: The name of the signal to wait for.
    /// All signals with this name and matching aggregation key will be collected.
    /// </summary>
    public Input<string> SignalName { get; set; } = default!;

    /// <summary>
    /// Input: The aggregation key used to group signals together.
    /// Only signals with the exact same aggregation key are counted toward the required count.
    /// Example: "Order-12345", "User-67890", "Batch-2024-01-15"
    /// </summary>
    public Input<string> AggregationKey { get; set; } = default!;

    /// <summary>
    /// Input: The number of signals required before the workflow continues.
    /// Default is 2 (minimum fan-in).
    /// </summary>
    public Input<int> RequiredCount { get; set; } = new(2);

    /// <summary>
    /// Output: The list of received signals with their data.
    /// Available after all required signals have been received.
    /// </summary>
    public Output<List<SignalData>?> ReceivedSignals { get; set; } = default!;

    /// <summary>
    /// GetTriggerPayloads is called by Elsa during trigger indexing.
    /// 
    /// Trigger indexing is the process by which Elsa builds an index of all triggers
    /// and their payloads. When an external event occurs, Elsa computes the hash of
    /// the event payload and uses the index to quickly find matching triggers.
    /// 
    /// This method should return all possible payload combinations that should
    /// activate this trigger. For dynamic triggers, you might query a database
    /// or external system here.
    /// 
    /// NOTE: This method is called during workflow definition loading, not during
    /// workflow execution. Keep it lightweight and avoid expensive operations.
    /// </summary>
    /// <param name="context">The trigger indexing context</param>
    /// <returns>Enumerable of payload objects that should activate this trigger</returns>
    protected override IEnumerable<object> GetTriggerPayloads(TriggerIndexingContext context)
    {
        // Get the configured values from the activity inputs
        // These values are typically set when the workflow is designed
        var signalName = context.Get(SignalName);
        var aggregationKey = context.Get(AggregationKey);

        // Return a payload that will be used to match incoming signals.
        // When an external event occurs with a matching SignalPayload,
        // this trigger will be activated.
        yield return new SignalPayload
        {
            SignalName = signalName ?? string.Empty,
            AggregationKey = aggregationKey ?? string.Empty
        };

        // NOTE: For dynamic triggers that respond to multiple payloads,
        // you could yield multiple payloads here:
        // 
        // foreach (var key in GetAllPossibleKeys())
        // {
        //     yield return new SignalPayload
        //     {
        //         SignalName = signalName,
        //         AggregationKey = key
        //     };
        // }
    }

    /// <summary>
    /// ExecuteAsync is called when the trigger is activated.
    /// This can happen when:
    /// 1. The workflow is started by this trigger (IsTriggerOfWorkflow returns true)
    /// 2. The trigger is used mid-workflow and a matching signal is received
    /// </summary>
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Check if this trigger started the workflow
        if (context.IsTriggerOfWorkflow())
        {
            // The workflow was started by an external signal matching this trigger.
            // Extract the signal data from workflow input and complete immediately.
            var signalData = context.WorkflowInput.TryGetValue("SignalData", out var data)
                ? data as SignalData
                : null;

            if (signalData != null)
            {
                // Initialize the received signals list with the first signal
                var receivedSignals = new List<SignalData> { signalData };
                context.SetVariable("ReceivedSignals", receivedSignals);
                context.Set(ReceivedSignals, receivedSignals);
                
                context.AddExecutionLogEntry(
                    "Info",
                    $"Workflow started by signal from {signalData.Source}. " +
                    $"Total: {receivedSignals.Count}/{context.Get(RequiredCount)}");
            }

            // Complete immediately when starting workflow
            await context.CompleteActivityAsync();
            return;
        }

        // If we reach here, this trigger is being used mid-workflow (not as a workflow starter).
        // We need to create a bookmark to wait for signals.

        // Get the configured values
        var signalName = context.Get(SignalName);
        var aggregationKey = context.Get(AggregationKey);
        var requiredCount = context.Get(RequiredCount);

        // Retrieve or initialize the list of received signals from workflow variables
        // Using workflow variables ensures the data persists across bookmark resumes
        var receivedSignals = context.GetVariable<List<SignalData>>("ReceivedSignals") 
            ?? new List<SignalData>();

        // Check if we've already received enough signals
        if (receivedSignals.Count >= requiredCount)
        {
            // All required signals received, complete the trigger
            context.Set(ReceivedSignals, receivedSignals);
            
            context.AddExecutionLogEntry(
                "Info",
                $"All signals received ({receivedSignals.Count}/{requiredCount}). " +
                $"Signal: {signalName}, Key: {aggregationKey}");

            await context.CompleteActivityAsync();
        }
        else
        {
            // Create a bookmark to wait for more signals
            // The bookmark payload must match the trigger payload for correlation
            var bookmark = context.CreateBookmark(new CreateBookmarkArgs
            {
                BookmarkName = "SignalFanIn",
                
                // Payload for correlation - must match the trigger payload structure
                Payload = new SignalPayload
                {
                    SignalName = signalName ?? string.Empty,
                    AggregationKey = aggregationKey ?? string.Empty
                },
                
                // Callback invoked when a matching signal is received
                Callback = OnSignalReceivedAsync,
                
                // Auto-burn the bookmark - it will be consumed when resumed.
                // The callback (OnSignalReceivedAsync) will recreate it if more signals are needed.
                AutoBurn = true
            });

            context.AddExecutionLogEntry(
                "Info",
                $"Waiting for signals. Received: {receivedSignals.Count}/{requiredCount}. " +
                $"Signal: {signalName}, Key: {aggregationKey}, Bookmark: {bookmark.Id}");
        }
    }

    /// <summary>
    /// Callback invoked when a matching signal is received.
    /// This method is called by Elsa when IWorkflowResumer.ResumeAsync is called
    /// with a matching BookmarkStimulus.
    /// </summary>
    private async ValueTask OnSignalReceivedAsync(ActivityExecutionContext context)
    {
        // Get the signal data from the resume input
        var signalData = context.WorkflowInput.TryGetValue("SignalData", out var data)
            ? data as SignalData
            : null;

        if (signalData == null)
        {
            // No signal data provided, log a warning
            context.AddExecutionLogEntry(
                "Warning",
                "Signal received but no SignalData was provided in the input. Ignoring.");
            return;
        }

        // Add to received signals
        var receivedSignals = context.GetVariable<List<SignalData>>("ReceivedSignals")
            ?? new List<SignalData>();
        receivedSignals.Add(signalData);
        context.SetVariable("ReceivedSignals", receivedSignals);

        context.AddExecutionLogEntry(
            "Info",
            $"Signal received from {signalData.Source}. " +
            $"Total: {receivedSignals.Count}/{context.Get(RequiredCount)}");

        // Check if we have enough signals now
        var requiredCount = context.Get(RequiredCount);
        if (receivedSignals.Count >= requiredCount)
        {
            // All signals received, set output and complete
            context.Set(ReceivedSignals, receivedSignals);
            await context.CompleteActivityAsync();
        }
        else
        {
            // Re-create the bookmark for the next signal by calling ExecuteAsync.
            // Since AutoBurn = true, the bookmark was consumed when this callback was invoked,
            // so we need to explicitly create a new one to wait for the next signal.
            await ExecuteAsync(context);
        }
    }
}

/// <summary>
/// Payload structure for signal triggers.
/// This is used for both trigger indexing (GetTriggerPayloads) and
/// bookmark correlation (CreateBookmark payload).
/// 
/// The payload structure must be serializable and have consistent
/// hash values for proper correlation.
/// </summary>
public record SignalPayload
{
    /// <summary>
    /// The name of the signal (e.g., "OrderProcessed", "PaymentReceived")
    /// </summary>
    public string SignalName { get; init; } = string.Empty;

    /// <summary>
    /// The aggregation key used to group signals together (e.g., "Order-12345")
    /// </summary>
    public string AggregationKey { get; init; } = string.Empty;
}

/// <summary>
/// Data structure for received signals.
/// This contains the actual signal data and metadata.
/// </summary>
public record SignalData
{
    /// <summary>
    /// The name of the signal
    /// </summary>
    public string SignalName { get; init; } = string.Empty;

    /// <summary>
    /// The source system or service that sent the signal
    /// </summary>
    public string Source { get; init; } = string.Empty;

    /// <summary>
    /// When the signal was received
    /// </summary>
    public DateTime ReceivedAt { get; init; } = DateTime.UtcNow;

    /// <summary>
    /// Additional data associated with the signal
    /// </summary>
    public Dictionary<string, object> Data { get; init; } = new();
}

/*
 * REGISTRATION
 * ============
 * 
 * In your Program.cs or Startup.cs:
 * 
 * builder.Services.AddElsa(elsa =>
 * {
 *     // Register the custom trigger
 *     elsa.AddActivity<SignalFanInTrigger>();
 *     
 *     // Ensure trigger indexing is enabled (it is by default)
 *     elsa.UseWorkflowManagement();
 * });
 * 
 * 
 * USAGE IN WORKFLOW
 * =================
 * 
 * As a workflow starter (trigger):
 * 
 * public class OrderProcessingWorkflow : WorkflowBase
 * {
 *     protected override void Build(IWorkflowBuilder builder)
 *     {
 *         var fanIn = new SignalFanInTrigger
 *         {
 *             SignalName = new("OrderProcessed"),
 *             AggregationKey = new("Order-12345"),
 *             RequiredCount = new(3), // Wait for payment, inventory, and shipping
 *             CanStartWorkflow = true  // Important: allows this trigger to start workflows
 *         };
 *         
 *         var complete = new WriteLine("All order processing steps completed!");
 *         
 *         builder.Root = new Sequence
 *         {
 *             Activities = { fanIn, complete }
 *         };
 *     }
 * }
 * 
 * As a mid-workflow activity (bookmark):
 * 
 * public class OrderWorkflow : WorkflowBase
 * {
 *     protected override void Build(IWorkflowBuilder builder)
 *     {
 *         builder.Root = new Sequence
 *         {
 *             Activities =
 *             {
 *                 new WriteLine("Starting order processing..."),
 *                 new SignalFanInTrigger
 *                 {
 *                     SignalName = new("OrderProcessed"),
 *                     AggregationKey = new("Order-12345"),
 *                     RequiredCount = new(3)
 *                     // CanStartWorkflow not needed here - used mid-workflow
 *                 },
 *                 new WriteLine("All signals received!")
 *             }
 *         };
 *     }
 * }
 * 
 * 
 * SENDING SIGNALS
 * ===============
 * 
 * From a service or controller:
 * 
 * public class OrderService
 * {
 *     private readonly IWorkflowResumer _workflowResumer;
 *     
 *     public async Task NotifyPaymentProcessed(string orderId, decimal amount)
 *     {
 *         var stimulus = new BookmarkStimulus
 *         {
 *             BookmarkName = "SignalFanIn",
 *             Payload = new SignalPayload
 *             {
 *                 SignalName = "OrderProcessed",
 *                 AggregationKey = $"Order-{orderId}"
 *             }
 *         };
 *         
 *         var input = new Dictionary<string, object>
 *         {
 *             ["SignalData"] = new SignalData
 *             {
 *                 SignalName = "OrderProcessed",
 *                 Source = "PaymentService",
 *                 ReceivedAt = DateTime.UtcNow,
 *                 Data = new Dictionary<string, object>
 *                 {
 *                     ["Amount"] = amount,
 *                     ["OrderId"] = orderId
 *                 }
 *             }
 *         };
 *         
 *         await _workflowResumer.ResumeAsync(stimulus, input);
 *     }
 * }
 * 
 * 
 * FAN-IN PATTERNS
 * ===============
 * 
 * The fan-in pattern is useful for coordinating multiple parallel operations:
 * 
 * 1. Multiple Service Callbacks:
 *    - Payment processing, inventory check, shipping calculation
 *    - All must complete before order confirmation
 * 
 * 2. Parallel Approvals:
 *    - Manager approval, finance approval, legal approval
 *    - All approvals required before proceeding
 * 
 * 3. Data Aggregation:
 *    - Collect data from multiple sources
 *    - Process when all data is available
 * 
 * 4. Batch Processing:
 *    - Wait for multiple batch jobs to complete
 *    - Continue when all jobs finish
 * 
 * 
 * TRIGGER INDEXING
 * ================
 * 
 * Elsa uses trigger indexing to efficiently match incoming events to workflows.
 * 
 * How it works:
 * 1. When a workflow is published, GetTriggerPayloads is called
 * 2. The returned payloads are hashed and stored in the trigger index
 * 3. When a signal is sent, Elsa computes a hash of the stimulus payload
 * 4. Matching workflows are found using the index and started/resumed
 * 
 * This allows Elsa to quickly find relevant workflows without scanning
 * all workflow definitions.
 * 
 * 
 * API REFERENCE
 * =============
 * 
 * Core APIs used (from elsa-core repository):
 * 
 * - Trigger (base class)
 *   Namespace: Elsa.Workflows
 *   Base class for all trigger activities.
 * 
 * - GetTriggerPayloads(TriggerIndexingContext)
 *   Returns payloads for trigger indexing.
 *   Called during workflow definition loading.
 * 
 * - TriggerIndexingContext
 *   Namespace: Elsa.Workflows.Models
 *   Context for accessing activity inputs during indexing.
 * 
 * - ActivityExecutionContext.GetVariable<T>(string)
 *   Gets a workflow variable value.
 * 
 * - ActivityExecutionContext.SetVariable(string, object)
 *   Sets a workflow variable value.
 * 
 * - BookmarkStimulus
 *   Namespace: Elsa.Workflows.Runtime.Stimuli
 *   Used to match and resume bookmarks.
 */
