# Elsa Core Source File References

This document lists all elsa-core source files referenced in the Performance & Scaling Guide for easy maintainer review and verification against the `develop/3.6.0` branch.

## Commit Strategies

### ModuleExtensions
- **Path:** `src/modules/Elsa.Workflows.Core/CommitStates/Extensions/ModuleExtensions.cs`
- **Description:** Extension methods for registering commit strategies with the workflow module. Provides the `UseCommitStrategies` extension on `WorkflowsFeature`.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/CommitStates/Extensions/ModuleExtensions.cs

### CommitStrategiesFeature
- **Path:** `src/modules/Elsa.Workflows.Core/CommitStates/CommitStrategiesFeature.cs`
- **Description:** Feature configuration class for commit strategies. Used to register and configure commit strategies within the Elsa DI container.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/CommitStates/CommitStrategiesFeature.cs

### Built-in Workflow Strategies
- **Directory:** `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/`
- **Description:** Contains built-in workflow-level commit strategies that determine when workflow state is persisted.

| Strategy | Path |
|----------|------|
| WorkflowExecutingWorkflowStrategy | `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/WorkflowExecutingWorkflowStrategy.cs` |
| WorkflowExecutedWorkflowStrategy | `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/WorkflowExecutedWorkflowStrategy.cs` |
| ActivityExecutingWorkflowStrategy | `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/ActivityExecutingWorkflowStrategy.cs` |
| ActivityExecutedWorkflowStrategy | `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/ActivityExecutedWorkflowStrategy.cs` |
| PeriodicWorkflowStrategy | `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/PeriodicWorkflowStrategy.cs` |

**Permalink (Directory):** https://github.com/elsa-workflows/elsa-core/tree/develop/3.6.0/src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows

## Workflow Options

### WorkflowOptions (Core)
- **Path:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs`
- **Description:** Model class containing workflow-level options, including `CommitStrategyName` for selecting a commit strategy per workflow.
- **Key Properties:** `CommitStrategyName`, `ActivationStrategyName`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs

### WorkflowOptions (API Client)
- **Path:** `src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/WorkflowOptions.cs`
- **Description:** Client-side model for workflow options used by the Elsa API client. Mirrors the core WorkflowOptions for API interactions.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/WorkflowOptions.cs

## Feature Configuration

### WorkflowsFeature
- **Path:** `src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs`
- **Description:** Main feature class for configuring the workflows module. Exposes the `UseCommitStrategies` method for registering commit strategies.
- **Key Methods:** `UseCommitStrategies(Action<CommitStrategiesFeature>)`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs

### ElsaFeature
- **Path:** `src/modules/Elsa/Features/ElsaFeature.cs`
- **Description:** Root feature class for configuring Elsa. Provides access to all module features including workflows, runtime, and scheduling.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa/Features/ElsaFeature.cs

## Commit Strategy Contracts

### IWorkflowCommitStrategy
- **Path:** `src/modules/Elsa.Workflows.Core/CommitStates/Contracts/IWorkflowCommitStrategy.cs`
- **Description:** Interface for implementing custom workflow commit strategies. Defines the `ShouldCommitAsync` method.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/CommitStates/Contracts/IWorkflowCommitStrategy.cs

### WorkflowCommitStateContext
- **Path:** `src/modules/Elsa.Workflows.Core/CommitStates/Models/WorkflowCommitStateContext.cs`
- **Description:** Context object passed to commit strategies containing the workflow execution context and commit event information.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/CommitStates/Models/WorkflowCommitStateContext.cs

## Workflow Execution Context

### WorkflowExecutionContext
- **Path:** `src/modules/Elsa.Workflows.Core/Contexts/WorkflowExecutionContext.cs`
- **Description:** The execution context for a running workflow. Provides access to `TransientProperties` which can be used by custom commit strategies to track state.
- **Key Properties:** `TransientProperties`, `WorkflowInstance`, `Scheduler`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Core/Contexts/WorkflowExecutionContext.cs

## Scheduling

### QuartzSchedulingFeature
- **Path:** `src/modules/Elsa.Scheduling/Features/QuartzSchedulingFeature.cs`
- **Description:** Feature configuration for Quartz.NET scheduler integration.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Scheduling/Features/QuartzSchedulingFeature.cs

## Distributed Runtime

### DistributedWorkflowRuntimeFeature
- **Path:** `src/modules/Elsa.Workflows.Runtime/Features/DistributedWorkflowRuntimeFeature.cs`
- **Description:** Feature configuration for distributed workflow runtime, enabling clustering support.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/develop/3.6.0/src/modules/Elsa.Workflows.Runtime/Features/DistributedWorkflowRuntimeFeature.cs

## Notes for Maintainers

- All permalinks point to the `develop/3.6.0` branch as specified in the issue requirements
- Source file paths are relative to the elsa-core repository root
- When elsa-core is updated, verify that the performance guide remains accurate
- The following properties do **NOT** exist and should never be referenced:
  - `workflows.CommitStateInterval` - Invalid property
  - `workflows.CommitStateActivityCount` - Invalid property
- Use `WorkflowsFeature.UseCommitStrategies()` for all commit strategy configuration
- Built-in strategies do not include "commit every N activities" - this requires a custom implementation

## Verification Steps

To verify these references are still valid:

1. Clone elsa-core repository
2. Checkout the `develop/3.6.0` branch
3. Verify each file path exists
4. Check that the documented APIs match the actual implementation

```bash
git clone https://github.com/elsa-workflows/elsa-core.git
cd elsa-core
git checkout develop/3.6.0

# Verify commit strategies directory
ls -la src/modules/Elsa.Workflows.Core/CommitStates/

# Verify WorkflowOptions
cat src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs
```

---

**Last Updated:** 2025-11-28

**Branch Reference:** `develop/3.6.0`
