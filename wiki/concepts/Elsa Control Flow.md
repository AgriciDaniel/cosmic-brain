---
type: concept
title: Elsa Control Flow
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - control-flow
  - parallel
  - patterns
status: developing
address: c-000064
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa Control Flow

Elsa Workflows provides a set of built-in control flow activities that govern how and when activities execute within a workflow. These activities implement common programming constructs as workflow nodes.

## Sequence

The `Sequence` activity executes its child activities one after another in order. This is the most basic and most commonly used control flow activity:

```csharp
builder.Root = new Sequence
{
    Activities =
    {
        new WriteLine("Step 1"),
        new WriteLine("Step 2"),
        new WriteLine("Step 3")
    }
};
```

Each child activity must complete before the next one begins. A `Sequence` completes when all its children have completed.

## Flowchart

The `Flowchart` activity provides a free-form visual canvas for connecting activities with explicit connections. Multiple connections from a single activity create parallel branches:

```csharp
builder.Root = new Flowchart
{
    Activities = { promptWriteLine, readLine, isAdult, adult, minor, finish },
    Connections =
    {
        new(promptWriteLine, readLine),
        new(readLine, isAdult),
        new(new Endpoint(isAdult, "True"), new Endpoint(adult)),
        new(new Endpoint(isAdult, "False"), new Endpoint(minor)),
        new(new Endpoint(adult), new Endpoint(finish)),
        new(new Endpoint(minor), new Endpoint(finish))
    }
};
```

Flowcharts use **endpoints** (source/target ports) to connect specific outcomes to subsequent activities. Activities can have multiple named endpoints matching their outcomes.

## Decision

The `Decision` activity models a conditional branch analogous to C#'s `if` statement:

- **Input**: `Condition` (an expression that evaluates to `Input<bool>`)
- **Outcomes**: `True` when the condition is true, `False` when false

```csharp
var isAdult = new FlowDecision(context => age.Get(context) >= 18);
```

In code-based workflows, use `FlowDecision`. In Elsa Studio, use the `If` or `Switch` activity.

## If (Composite)

The `If` activity is a composite activity that evaluates a condition and schedules one of two child activities:

```csharp
builder.Root = new If
{
    Condition = new(context => DateTime.Now.IsDaylightSavingTime()),
    Then = new WriteLine("Welcome to the light side!"),
    Else = new WriteLine("Welcome to the dark side!")
};
```

Unlike `FlowDecision`, `If` directly contains its branches rather than routing through connections.

## Switch

The `Switch` activity routes execution based on multiple conditions. Each case has a label and a condition expression:

```csharp
new Switch
{
    Cases = new[]
    {
        new SwitchCase("Approved", new JavaScriptExpression("getLastResult() === 'Approved'")),
        new SwitchCase("Rejected", new JavaScriptExpression("getLastResult() === 'Rejected'")),
        new SwitchCase("TimedOut", new JavaScriptExpression("getLastResult() === 'Done'"))
    }
};
```

The first matching case determines which outcome is triggered.

## Parallel Execution

### Parallel Activity

The `Parallel` activity executes multiple branches simultaneously and waits for all to complete:

```csharp
new Parallel
{
    Activities =
    {
        new Sequence { Activities = { new WriteLine("Branch 1") } },
        new Sequence { Activities = { new WriteLine("Branch 2") } }
    }
}
```

Each branch runs independently. The `Parallel` activity waits for all branches before continuing.

### Race Conditions

When multiple branches access shared variables concurrently, race conditions can occur. Mitigations include:

1. Using separate variables per branch and combining after the parallel activity completes
2. Using collections with careful mutation patterns

### Error Handling in Parallel Branches

If one branch faults, the fault propagates to the workflow. Other branches may continue running until they complete or fault. Wrap risky operations in try-catch or use Elsa's incident handling for fault tolerance.

## Fork and Join

The `Fork` activity creates multiple execution branches from a single point, and the `Join` activity synchronizes them. The `Join` mode determines synchronization behavior:

- **WaitAll**: Wait for all branches to complete (default)
- **WaitAny**: Continue when the first branch completes (useful for race patterns like approval vs. timeout)

```csharp
var fork = new Fork { JoinMode = ForkJoinMode.WaitAny };
fork.Branches = new[] { waitForApproval, timer };
```

This pattern is commonly used to implement timeout handling for blocking activities.

## ForEach

The `ForEach` activity iterates over a collection of items. It supports two execution modes:

- **Sequential** (default): Process items one at a time
- **Parallel**: Process all items concurrently

```csharp
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
}
```

## Delay

The `Delay` activity pauses workflow execution for a specified duration:

```csharp
new Delay { Duration = TimeSpan.FromDays(7) }
```

Commonly used for timeouts, scheduled operations, and rate-limiting.

## Considerations

- **Thread pool exhaustion**: Running hundreds of parallel branches may exhaust .NET thread pool threads
- **Resource contention**: External systems (databases, APIs) must handle concurrent requests
- **Memory usage**: Each parallel branch maintains its own execution context
- **Optimal parallelism**: Test to find the right concurrency level for your scenario
