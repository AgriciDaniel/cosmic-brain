# Elsa Core Concepts

This document identifies major concepts and types in the elsa-core repository.

## Overview

Elsa Core is built around several key abstractions that enable workflow execution, activity management, and extensibility.


## Core Workflow Concepts

### Workflow Definition
A workflow definition is a blueprint that describes the structure and logic of a workflow. It contains:
- Activities and their configuration
- Connections between activities
- Variables and input/output definitions
- Triggers that can start the workflow

### Workflow Instance
A workflow instance represents a specific execution of a workflow definition. It maintains:
- Current execution state
- Variable values
- Execution history
- Bookmarks (suspension points)

### Activity
Activities are the building blocks of workflows. Each activity represents a unit of work that can:
- Execute logic (synchronous or asynchronous)
- Produce outcomes that determine execution flow
- Suspend execution (create bookmarks)
- Access and modify workflow variables

### Bookmark
Bookmarks represent suspension points in workflow execution. They enable:
- Long-running workflows that can pause and resume
- Event-driven workflows that wait for external triggers
- Correlation with external systems

### Trigger
Triggers define conditions or events that can start a workflow automatically:
- HTTP endpoints
- Timer/cron schedules  
- Message queue events
- Custom event triggers


## Key Interfaces and Services

### Core Interfaces

- **IActivity** (`Elsa.Workflows`) - Represents an activity, which is an atomic unit of operation within a workflow.
- **IActivityCommitStrategy** (`Elsa.Workflows.CommitStates`)
- **IActivityDescriber** (`Elsa.Workflows`) - Creates instances of <see cref="ActivityDescriptor" /> for a given activity type.
- **IActivityDescriptorModifier** (`Elsa.Workflows`) - Provides a way to modify activity descriptors as they are registered.
- **IActivityDescriptorOptionsApi** (`Elsa.Api.Client.Resources.ActivityDescriptorOptions.Contracts`) - Represents a client for the workflow definitions API.
- **IActivityDescriptorsApi** (`Elsa.Api.Client.Resources.ActivityDescriptors.Contracts`) - Represents a client for the workflow definitions API.
- **IActivityExecutionContextSchedulerStrategy** (`Elsa.Workflows`) - Defines a strategy for scheduling activities in a workflow execution context.
- **IActivityExecutionManager** (`Elsa.Workflows.Runtime`) - Manages activity execution records.
- **IActivityExecutionMapper** (`Elsa.Workflows.Runtime`) - Maps activity execution contexts to activity execution records.
- **IActivityExecutionMiddleware** (`Elsa.Workflows`) - The interface for activity execution middleware components.
- **IActivityExecutionPipeline** (`Elsa.Workflows`) - Represents a pipeline that can be used to execute an activity.
- **IActivityExecutionPipelineBuilder** (`Elsa.Workflows`) - Builds an activity execution pipeline.
- **IActivityExecutionStatsService** (`Elsa.Workflows.Runtime`) - A service for reading activity execution logs.
- **IActivityExecutionStore** (`Elsa.Workflows.Runtime`) - Stores activity execution records.
- **IActivityExecutionsApi** (`Elsa.Api.Client.Resources.ActivityExecutions.Contracts`) - Represents a client for the activity executions API.
- **IActivityFactory** (`Elsa.Workflows`)
- **IActivityInputEvaluator** (`Elsa.Workflows`)
- **IActivityInvoker** (`Elsa.Workflows`) - Invokes activities.
- **IActivityPropertyDefaultValueProvider** (`Elsa.Workflows`)
- **IActivityPropertyLogPersistenceEvaluator** (`Elsa.Workflows.Runtime`) - Provides functionality for evaluating log persistence settings for activity properties /// during the execution of a workflow.
- **IActivityPropertyOptionsProvider** (`Elsa.Workflows.Core.Contracts`)
- **IActivityProvider** (`Elsa.Workflows`) - Represents a provider of activity descriptors, which can be used from activity pickers.
- **IActivityRegistry** (`Elsa.Workflows`) - Stores all activity descriptors available to the system.
- **IActivityRegistryLookupService** (`Elsa.Workflows`) - Represents a service for looking up activity descriptors.
- **IActivityRegistryPopulator** (`Elsa.Workflows.Management`) - Populates the <see cref="IActivityRegistry"/> with activities.
- **IActivityResolver** (`Elsa.Workflows`) - An activity resolver inspects a given activity and returns its contained activities. /// They are used to inspect a workflow structure and build a graph of nodes from it for easy node traversal.
- **IActivityScheduler** (`Elsa.Workflows`) - The scheduler contains work items to execute. /// It continuously takes the next work item from the list until there are no more items left.
- **IActivitySchedulerFactory** (`Elsa.Workflows`)
- **IActivitySerializer** (`Elsa.Workflows`) - Serializes and deserializes activities.
- **IActivityStateFilter** (`Elsa.Workflows`)
- **IActivityStateFilterManager** (`Elsa.Workflows`)
- **IActivityTestRunner** (`Elsa.Workflows`)
- **IActivityVisitor** (`Elsa.Workflows`) - Walks an activity tree starting at the root.
- **IActivityWithResult** (`Elsa.Workflows`) - Contract for custom activities that return a result.
- **IActivityWithResult** (`Elsa.Workflows`) - The result of the activity.
- **IBookmarkManager** (`Elsa.Workflows.Runtime`) - Manages bookmarks.
- **ITrigger** (`Elsa.Workflows`) - Implement this method if your activity needs to provide bookmark data that will be used when it is marked as a trigger.
- **ITriggerBoundWorkflowService** (`Elsa.Workflows.Runtime`) - Represents a service that looks up trigger-bound workflows.
- **ITriggerIndexer** (`Elsa.Workflows.Runtime`) - Extracts triggers from workflow definitions.
- **ITriggerInvoker** (`Elsa.Workflows.Runtime`)
- **ITriggerPayloadValidator** (`Elsa.Workflows.Runtime.Contracts`) - Validator that validate a given trigger payload.
- **ITriggerScheduler** (`Elsa.Scheduling`) - Schedules tasks for the specified list of triggers.
- **ITriggerStore** (`Elsa.Workflows.Runtime`) - Provides access to the underlying store of stored triggers.
- **IWorkflow** (`Elsa.Workflows`) - Implement this interface or <see cref="WorkflowBase"/> when implementing workflows using code so that they become available to the system.
- **IWorkflowActivationStrategiesApi** (`Elsa.Api.Client.Resources.WorkflowActivationStrategies.Contracts`) - Represents a client for the variable types API.
- **IWorkflowActivationStrategy** (`Elsa.Workflows`) - A workflow activation validator controls whether new instances are allowed to be created given certain conditions.
- **IWorkflowActivationStrategyEvaluator** (`Elsa.Workflows.Runtime`)
- **IWorkflowBuilder** (`Elsa.Workflows`) - A workflow builder collects information about a workflow to be built programmatically.
- **IWorkflowBuilderFactory** (`Elsa.Workflows`) - A factory of workflow builders.
- **IWorkflowCanceler** (`Elsa.Workflows.Runtime`) - Represents a workflow canceler.
- **IWorkflowCancellationDispatcher** (`Elsa.Workflows.Runtime`) - Posts a message to a topic to cancel a specified set of workflows.
- **IWorkflowCancellationService** (`Elsa.Workflows.Runtime`) - Service wrapper for cancelling multiple workflow instances.
- **IWorkflowClient** (`Elsa.Workflows.Runtime`) - Represents a client that can interact with a workflow instance.
- **IWorkflowCommitStrategy** (`Elsa.Workflows.CommitStates`)
- **IWorkflowContextProviderDescriptorsApi** (`Elsa.Api.Client.Resources.WorkflowExecutionContexts.Contracts`) - Provides workflow context provider descriptors.
- **IWorkflowDefinitionActivityRegistryUpdater** (`Elsa.Workflows.Management.Contracts`) - Represents a service for updating the activity registry.
- **IWorkflowDefinitionCacheManager** (`Elsa.Workflows.Management`) - Specifies the contract for managing the cache of workflow definitions.
- **IWorkflowDefinitionImporter** (`Elsa.Workflows.Management`) - Imports a workflow definition.
- **IWorkflowDefinitionLabelStore** (`Elsa.Labels.Contracts`)
- **IWorkflowDefinitionLinker** (`Elsa.Workflows.Api`) - Maps workflow definition models to liked models
- **IWorkflowDefinitionManager** (`Elsa.Workflows.Management`) - Provides operations for managing workflow definitions.
- **IWorkflowDefinitionPublisher** (`Elsa.Workflows.Management`) - Publishes workflow definitions.
- **IWorkflowDefinitionService** (`Elsa.Workflows.Management`) - Manages materialization of <see cref="WorkflowDefinition"/> to <see cref="Workflow"/> objects.
- **IWorkflowDefinitionStore** (`Elsa.Workflows.Management`) - Represents a store of <see cref="WorkflowDefinition"/>s.
- **IWorkflowDefinitionStorePopulator** (`Elsa.Workflows.Runtime`) - Populates the <see cref="IWorkflowDefinitionStore"/> with workflow definitions provided from <see cref="IWorkflowsProvider"/> implementations.
- **IWorkflowDefinitionsApi** (`Elsa.Api.Client.Resources.WorkflowDefinitions.Contracts`) - Represents a client for the workflow definitions API.
- **IWorkflowDefinitionsRefresher** (`Elsa.Workflows.Runtime`) - Refreshes all workflows by re-indexing their triggers.
- **IWorkflowDefinitionsReloader** (`Elsa.Workflows.Runtime`) - Reloads all workflows by invoking the populator.
- **IWorkflowDispatcher** (`Elsa.Workflows.Runtime`) - Posts a message to a queue to invoke a specified workflow or trigger a set of workflows.
- **IWorkflowExecutionContextSchedulerStrategy** (`Elsa.Workflows`) - Defines a strategy interface for scheduling activities within the context of a workflow execution.
- **IWorkflowExecutionLogStore** (`Elsa.Workflows.Runtime`) - Represents a store of <see cref="WorkflowExecutionLogRecord"/>.
- **IWorkflowExecutionMiddleware** (`Elsa.Workflows`)
- **IWorkflowExecutionPipeline** (`Elsa.Workflows`) - Represents a workflow execution pipeline.
- **IWorkflowExecutionPipelineBuilder** (`Elsa.Workflows`) - Builds a workflow execution pipeline.
- **IWorkflowGraphBuilder** (`Elsa.Workflows`) - Builds a workflow graph from a workflow.
- **IWorkflowHost** (`Elsa.Workflows.Runtime`) - Represents a single workflow instance that can be executed and takes care of publishing various lifecycle events.
- **IWorkflowHostFactory** (`Elsa.Workflows.Runtime`) - Creates <see cref="IWorkflowHost"/> objects.
- **IWorkflowInbox** (`Elsa.Workflows.Runtime`) - An inbox for delivering messages to workflow instances.
- **IWorkflowInstanceClient** (`Elsa.Workflows.Api.RealTime.Contracts`) - Represents a client for receiving workflow events on the client.
- **IWorkflowInstanceFactory** (`Elsa.Workflows.Management.Contracts`) - Creates new <see cref="WorkflowInstance"/> objects.
- **IWorkflowInstanceFinder** (`Elsa.Alterations.Core.Contracts`) - Represents a service that can find workflow instances based on specified filters.
- **IWorkflowInstanceManager** (`Elsa.Workflows.Management`) - A service that manages workflow instances.
- **IWorkflowInstanceStore** (`Elsa.Workflows.Management`) - Represents a store of workflow instances.
- **IWorkflowInstanceVariableManager** (`Elsa.Workflows.Management`) - Defines the operations for managing variables associated with a workflow instance.
- **IWorkflowInstanceVariableReader** (`Elsa.Workflows`) - Enumerates variables for a workflow instance.
- **IWorkflowInstanceVariableWriter** (`Elsa.Workflows`)
- **IWorkflowInstancesApi** (`Elsa.Api.Client.Resources.WorkflowInstances.Contracts`) - Represents a client for the workflow instances API.
- **IWorkflowInvoker** (`Elsa.Workflows.Runtime`) - Invokes a workflow in a transactional manner (i.e., runs the workflow in the current context and not via the <see cref="IWorkflowRuntime"/>).
- **IWorkflowMatcher** (`Elsa.Workflows.Runtime`) - Represents a contract for finding triggers and bookmarks associated with workflow activities.
- **IWorkflowMaterializer** (`Elsa.Workflows.Management`) - A service that can materialize a workflow from a workflow definition.
- **IWorkflowReferenceQuery** (`Elsa.Workflows.Management`) - Finds all latest versions of workflow definitions that reference a specific workflow definition.
- **IWorkflowReferenceUpdater** (`Elsa.Workflows.Management`) - Updates references to the specified workflow of all workflows that reference it.
- **IWorkflowRegistry** (`Elsa.Workflows.Runtime`) - Registers workflows.
- **IWorkflowRestarter** (`Elsa.Workflows.Runtime`) - Defines the contract for restarting workflows in the runtime environment.
- **IWorkflowResumer** (`Elsa.Workflows.Runtime`) - Resumes workflows using a given stimulus or bookmark filter.
- **IWorkflowRunner** (`Elsa.Workflows`) - Runs a given workflow by scheduling its root activity.
- **IWorkflowRuntime** (`Elsa.Workflows.Runtime`) - Represents a workflow runtime that can create <see cref="IWorkflowClient"/> instances connected to a workflow instance.
- **IWorkflowScheduler** (`Elsa.Scheduling`) - A contract for scheduling workflows to execute at a specific future instant. Can be used to implement a custom scheduler, e.g. using Quartz.NET and Hangfire.
- **IWorkflowSerializer** (`Elsa.Workflows.Management`) - Serializes and deserializes workflows.
- **IWorkflowStarter** (`Elsa.Workflows.Runtime`) - Represents an interface responsible for starting workflows. /// Provides a method to start a workflow based on the provided request.
- **IWorkflowStateExtractor** (`Elsa.Workflows`) - Extracts workflow state from a workflow execution context and vice versa.
- **IWorkflowStateSerializer** (`Elsa.Workflows`) - Serializes and deserializes workflow states.
- **IWorkflowValidator** (`Elsa.Workflows.Management`) - Validates a workflow definition.
- **IWorkflowsProvider** (`Elsa.Workflows.Runtime`) - Represents a source of workflow definitions.

### Activity Types

- **Break** - Break out of a loop.
- **Complete** - Signals the current composite activity to complete itself as a whole.
- **Container** - A base class for activities that control a collection of activities.
- **Correlate** - Set the CorrelationId of the workflow to a given value.
- **DynamicActivity** - A dynamically provided activity with custom properties. This is experimental and may be removed.
- **End** - Marks the end of a flowchart, causing the flowchart to complete.
- **Fault** - Faults the workflow.
- **Finish** - Mark the workflow as finished.
- **For** - Iterate over a sequence of steps between a start and an end number.
- **Fork** - Branch execution into multiple branches.
- **If** - Evaluate a Boolean condition to determine which activity to execute next.
- **Inline** - Represents an inline code activity that can be used to execute arbitrary .NET code from a workflow.
- **NotFoundActivity** - This activity is instantiated in case a workflow references an activity type that could not be found.
- **ReadLine** - Read a line of text from the console.
- **SetName** - Sets a property on the workflow execution context with the specified name value.
- **SetVariable** - Assign a workflow variable a value.
- **Start** - Marks the start of a flowchart.
- **Switch** - The Switch activity is an approximation of the `switch` construct in C#. /// When a case evaluates to true, the associated activity is then scheduled for execution.
- **While** - Execute an activity while a given condition evaluates to true.
- **WriteLine** - Write a line of text to the console.

### Key Services

- **CachingTriggerStore** (`Elsa.Workflows.Runtime.Stores`) - A decorator for <see cref="ITriggerStore"/> that caches trigger records.
- **DefaultBookmarkManager** (`Elsa.Workflows.Runtime`) - Default implementation of <see cref="IBookmarkManager"/>.
- **EFCoreTriggerStore** (`Elsa.Persistence.EFCore.Modules.Runtime`)
- **MemoryTriggerStore** (`Elsa.Workflows.Runtime.Stores`)

## Architecture Layers

Based on the namespace structure, Elsa Core is organized into several layers:

### Core Layer (`Elsa.Workflows.Core`)
- Workflow runtime and execution engine
- Activity scheduling and coordination
- Bookmark management
- State persistence abstractions

### Activities (`Elsa.Workflows.Activities`)  
- Built-in activity library
- Control flow activities (Sequence, Flowchart, If, While, etc.)
- Variable and data activities
- Composite activities

### Runtime (`Elsa.Workflows.Runtime`)
- Workflow instance management
- Trigger handling and event routing
- Background services and hosted services
- Distributed execution support

### Management (`Elsa.Workflows.Management`)
- Workflow definition CRUD operations
- Workflow instance queries
- Import/export functionality
- API endpoints

### Persistence (`Elsa.Persistence.EFCore`, `Elsa.MongoDb`, etc.)
- Storage abstractions and implementations
- Entity Framework Core providers
- MongoDB providers
- In-memory stores for testing

## Extension Points

Elsa Core provides extensive extensibility through:

1. **Custom Activities** - Implement `IActivity` or derive from base activity classes
2. **Custom Triggers** - Implement `ITrigger` to create new workflow start conditions
3. **Custom Stores** - Implement store interfaces for custom persistence
4. **Middleware** - Workflow and activity execution pipelines support middleware
5. **Expression Evaluators** - Add support for custom expression languages
6. **Type Converters** - Custom type conversion for activity inputs/outputs

## Common Patterns

### Activity Execution Pattern
```csharp
public class MyActivity : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        // Synchronous execution logic
    }
}

public class MyAsyncActivity : CodeActivity  
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Asynchronous execution logic
        await Task.Delay(1000);
    }
}
```

### Bookmark Pattern (Long-Running)
```csharp
public class WaitForEvent : Activity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        // Create a bookmark to suspend execution
        context.CreateBookmark(new Bookmark("EventReceived"));
    }
}
```

### Workflow Definition Pattern
```csharp
public class MyWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder
            .Root<Sequence>()
            .WithActivities(
                new WriteLine("Start"),
                new MyActivity(),
                new WriteLine("End")
            );
    }
}
```

## Next Steps for Documentation

Priority areas for expanding concept documentation:

1. **Activity Lifecycle** - Detailed explanation of activity execution phases
2. **Bookmark Mechanics** - How bookmarks enable long-running workflows
3. **Trigger System** - Comprehensive trigger documentation
4. **State Management** - How workflow state is managed and persisted
5. **Expression System** - Deep dive into expression evaluation
6. **Workflow Execution Flow** - Step-by-step execution process
7. **Distributed Execution** - How Elsa handles multi-node scenarios
