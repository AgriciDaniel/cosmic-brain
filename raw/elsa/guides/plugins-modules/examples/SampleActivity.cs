using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

namespace MyWorkflows.Activities;

/// <summary>
/// A sample custom activity demonstrating inputs, outputs, and basic execution.
/// </summary>
[Activity("MyWorkflows", "Sample", "A sample activity that demonstrates custom activity creation.")]
public class SampleActivity : CodeActivity<string>
{
    /// <summary>
    /// Input property that accepts a message to process.
    /// </summary>
    [Input(Description = "The message to process.")]
    public Input<string> Message { get; set; } = default!;

    /// <summary>
    /// Input property that accepts a prefix to add to the message.
    /// </summary>
    [Input(Description = "An optional prefix to prepend to the message.")]
    public Input<string?> Prefix { get; set; } = default!;

    /// <summary>
    /// Executes the activity logic.
    /// </summary>
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Get input values from the context
        var message = context.Get(Message);
        var prefix = context.Get(Prefix);

        // Process the message
        var result = string.IsNullOrEmpty(prefix) 
            ? message 
            : $"{prefix}: {message}";

        // Set the output (CodeActivity<T> automatically creates an output property)
        context.Set(Result, result);

        // Log the result (optional)
        context.JournalData.Add("ProcessedMessage", result);

        // Complete the activity
        await context.CompleteActivityAsync();
    }
}
