# Parallel Execution

Elsa Workflows provides several mechanisms for executing multiple activities or branches concurrently. This guide covers the patterns and considerations for parallel execution in Elsa v3.

## Overview

Parallel execution allows workflows to perform multiple tasks simultaneously, improving efficiency and reducing overall execution time. Common use cases include:

- Processing multiple items in a collection
- Performing parallel HTTP requests to different services
- Running independent validation checks concurrently
- Fan-out/fan-in patterns for distributed processing

## Parallel Execution Patterns

### 1. Parallel Activity

The `Parallel` activity executes multiple branches simultaneously. Each branch runs independently, and the activity waits for all branches to complete before continuing.

#### Code Example

````csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

namespace MyApp.Workflows;

public class ParallelProcessingWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Name = "Parallel Processing Example";
        
        var results = builder.WithVariable<List<string>>();
        
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine("Starting parallel execution..."),
                
                new Parallel
                {
                    Activities =
                    {
                        // Branch 1: Process order validation
                        new Sequence
                        {
                            Activities =
                            {
                                new WriteLine("Branch 1: Validating order..."),
                                new Delay(TimeSpan.FromSeconds(2)),
                                new WriteLine("Branch 1: Order validated"),
                                new SetVariable
                                {
                                    Variable = results,
                                    Value = new(context => 
                                    {
                                        var list = results.Get(context) ?? new List<string>();
                                        list.Add("Order validated");
                                        return list;
                                    })
                                }
                            }
                        },
                        
                        // Branch 2: Check inventory
                        new Sequence
                        {
                            Activities =
                            {
                                new WriteLine("Branch 2: Checking inventory..."),
                                new Delay(TimeSpan.FromSeconds(1)),
                                new WriteLine("Branch 2: Inventory checked"),
                                new SetVariable
                                {
                                    Variable = results,
                                    Value = new(context => 
                                    {
                                        var list = results.Get(context) ?? new List<string>();
                                        list.Add("Inventory available");
                                        return list;
                                    })
                                }
                            }
                        },
                        
                        // Branch 3: Calculate shipping
                        new Sequence
                        {
                            Activities =
                            {
                                new WriteLine("Branch 3: Calculating shipping..."),
                                new Delay(TimeSpan.FromSeconds(1.5)),
                                new WriteLine("Branch 3: Shipping calculated"),
                                new SetVariable
                                {
                                    Variable = results,
                                    Value = new(context => 
                                    {
                                        var list = results.Get(context) ?? new List<string>();
                                        list.Add("Shipping calculated");
                                        return list;
                                    })
                                }
                            }
                        }
                    }
                },
                
                new WriteLine(context => $"All parallel tasks completed. Results: {string.Join(", ", results.Get(context) ?? new List<string>())}")
            }
        };
    }
}
````

### 2. ForEach with Parallel Execution

The `ForEach` activity can execute iterations in parallel by setting its `Mode` property to `Parallel`. This is useful for processing collections where each item can be handled independently.

#### Code Example

````csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

namespace MyApp.Workflows;

public class ParallelForEachWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Name = "Parallel ForEach Example";
        
        var orderIds = builder.WithVariable<List<string>>()
            .WithValue(new List<string> { "ORD-001", "ORD-002", "ORD-003", "ORD-004" });
        
        var currentOrder = builder.WithVariable<string>();
        
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine("Processing orders in parallel..."),
                
                new ForEach<string>
                {
                    Items = new(orderIds),
                    CurrentValue = new(currentOrder),
                    Mode = ForEachMode.Parallel,
                    Body = new Sequence
                    {
                        Activities =
                        {
                            new WriteLine(context => $"Processing order: {currentOrder.Get(context)}"),
                            new Delay(TimeSpan.FromSeconds(1)),
                            new WriteLine(context => $"Completed order: {currentOrder.Get(context)}")
                        }
                    }
                },
                
                new WriteLine("All orders processed")
            }
        };
    }
}
````

### 3. Flowchart with Parallel Branches

In Elsa Studio's visual designer, you can create parallel execution paths using a `Flowchart` activity. When multiple connections originate from the same activity, those branches execute in parallel.

#### Designer Workflow

In the Elsa Studio designer:

1. Add a `Flowchart` activity to your workflow
2. Add a starting activity (e.g., `Start` or `WriteLine`)
3. Add multiple activities that should run in parallel
4. Connect the starting activity to multiple target activities - each connection creates a parallel branch
5. Optionally, add a `Join` activity to synchronize the branches when they complete

**Visual representation:**
```
[Start]
   |
   +--------+--------+
   |        |        |
   v        v        v
[Branch1] [Branch2] [Branch3]
   |        |        |
   +--------+--------+
            |
            v
         [Join]
            |
            v
          [End]
```

**Note:** In the Studio designer, parallel branches appear as multiple arrows diverging from a single activity. A `Join` activity with `WaitAll` mode ensures all branches complete before the workflow continues.

## Considerations and Best Practices

### Shared Variables and Race Conditions

When multiple branches access the same workflow variable concurrently, race conditions can occur. Consider the following:

#### Problem: Concurrent Writes

````csharp
var counter = builder.WithVariable<int>(0);

new Parallel
{
    Activities =
    {
        // Both branches try to increment the same counter
        new SetVariable { Variable = counter, Value = new(context => counter.Get(context) + 1) },
        new SetVariable { Variable = counter, Value = new(context => counter.Get(context) + 1) }
    }
}
// Result may be 1 instead of 2 due to race condition
````

#### Solution: Use Separate Variables or Synchronization

````csharp
// Approach 1: Use separate variables and combine after
var result1 = builder.WithVariable<int>();
var result2 = builder.WithVariable<int>();

new Sequence
{
    Activities =
    {
        new Parallel
        {
            Activities =
            {
                new SetVariable { Variable = result1, Value = new(5) },
                new SetVariable { Variable = result2, Value = new(10) }
            }
        },
        // Combine after parallel execution completes
        new SetVariable 
        { 
            Variable = counter, 
            Value = new(context => result1.Get(context) + result2.Get(context)) 
        }
    }
};

// Approach 2: Use collections and aggregate after
var results = builder.WithVariable<List<int>>();

new Sequence
{
    Activities =
    {
        new Parallel
        {
            Activities =
            {
                // Each branch adds to collection
                // Note: Still requires care with collection mutations
            }
        }
    }
};
````

### Error Handling in Parallel Branches

When one branch faults, the behavior depends on your workflow design:

#### Default Behavior

By default, if one branch faults, the fault propagates and the workflow enters a faulted state. Other branches may continue running until they complete or fault.

#### Handling Faults

````csharp
new Parallel
{
    Activities =
    {
        // Branch 1: May fault
        new Sequence
        {
            Activities =
            {
                new WriteLine("Branch 1: Starting..."),
                // Activity that might throw an exception
                new WriteLine("Branch 1: Completed")
            }
        },
        
        // Branch 2: Independent branch
        new Sequence
        {
            Activities =
            {
                new WriteLine("Branch 2: Starting..."),
                new Delay(TimeSpan.FromSeconds(2)),
                new WriteLine("Branch 2: Completed")
            }
        }
    }
}
````

To handle errors gracefully, consider:

1. **Wrap risky operations**: Use try-catch patterns in custom activities
2. **Design for fault tolerance**: Check for errors after the `Parallel` activity completes
3. **Use incident strategies**: Configure Elsa's [incident handling](../../operate/incidents/README.md) to automatically retry or continue on fault

### Performance Considerations

- **Thread pool exhaustion**: Parallel branches use the .NET thread pool. Running hundreds of parallel branches may exhaust available threads
- **Resource contention**: Ensure external resources (databases, APIs) can handle concurrent requests
- **Memory usage**: Each parallel branch maintains its own execution context, which consumes memory
- **Optimal parallelism**: More branches don't always mean better performance. Test to find the optimal level of concurrency for your scenario

### When to Use Parallel Execution

**Good use cases:**
- Independent operations (validation, lookups, notifications)
- I/O-bound operations (HTTP requests, database queries)
- Processing collections where order doesn't matter
- Fan-out/fan-in patterns

**When to avoid:**
- Operations that must execute in order
- Heavy CPU-bound operations that exceed available cores
- Operations that share mutable state without synchronization
- External systems with rate limits or concurrency restrictions

## Parallel Execution in Designer vs Code

### Designer (Elsa Studio)

In Elsa Studio, parallel execution is achieved through:

1. **Flowchart with multiple connections**: Create diverging paths from a single activity
2. **Parallel activity**: Add a `Parallel` activity from the activity picker and configure branches
3. **ForEach with parallel mode**: Configure the `ForEach` activity's mode to `Parallel` in the properties panel

**Note:** Screenshots of the designer interface would be inserted here to show visual workflow design.

### Programmatic (Code)

When building workflows in code:

- Use the `Parallel` activity class for explicit parallel execution
- Configure `ForEach` with `Mode = ForEachMode.Parallel`
- In Flowchart definitions, multiple connections from a single source activity create parallel branches

## Related Documentation

- [Control Flow Activities](./control-flow/README.md) - Other control flow patterns
- [Workflow Patterns Guide](../guides/patterns/README.md) - Fan-out/fan-in patterns
- [Troubleshooting Guide](../guides/troubleshooting/README.md) - Debugging parallel execution issues

## Summary

Parallel execution in Elsa Workflows enables concurrent processing of independent tasks, improving workflow efficiency. Key takeaways:

- Use `Parallel` activity for explicit parallel branches
- Use `ForEach` with parallel mode for collection processing
- Use Flowchart with multiple connections for visual parallel design
- Protect shared variables from race conditions
- Handle errors appropriately in parallel branches
- Consider resource constraints and optimal concurrency levels

For more advanced patterns involving parallel execution with external events or bookmarks, see the [Workflow Patterns Guide](../guides/patterns/README.md).
