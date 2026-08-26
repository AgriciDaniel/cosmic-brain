# Elsa Core Source File References

This document lists all elsa-core source files referenced in the Clustering Guide for easy maintainer review and verification.

## Core Runtime Components

### WorkflowResumer
- **Path:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`
- **Description:** Service responsible for resuming workflows based on bookmarks. Uses `IDistributedLockProvider` to acquire locks before resuming workflows, preventing duplicate resume attempts across cluster nodes.
- **Key Methods:** `ResumeWorkflowAsync`, lock acquisition logic for bookmark-based resume
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs

### DefaultBookmarkScheduler
- **Path:** `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs`
- **Description:** Service that schedules bookmarks (timers, delays, cron triggers) for future execution. Enqueues bookmark resume tasks into Quartz.NET or the configured scheduling backend.
- **Key Methods:** `ScheduleAsync`, `UnscheduleAsync`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs

### ResumeWorkflowTask
- **Path:** `src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs`
- **Description:** Quartz job implementation that handles scheduled bookmark resumption. This task is triggered by Quartz.NET at the scheduled time and invokes the workflow runtime client to resume the workflow.
- **Key Methods:** `ExecuteAsync`, integration with `IWorkflowRuntimeClient`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Scheduling/Tasks/ResumeWorkflowTask.cs

### ActivityExecutionContext.CreateBookmark
- **Path:** `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs`
- **Description:** Method on the activity execution context that creates bookmarks for workflow suspension. Generates a bookmark hash to ensure idempotent bookmark creation and prevent duplicate bookmarks.
- **Key Methods:** `CreateBookmark`, bookmark hash generation logic
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs

### BookmarkExecutionContextExtensions.GenerateBookmarkTriggerUrl
- **Path:** `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs`
- **Description:** Extension method that generates tokenized resume URLs for HTTP-triggered workflows. Creates secure URLs with tokens that can be used to resume workflows externally without exposing internal IDs.
- **Key Methods:** `GenerateBookmarkTriggerUrl`
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs

## Distributed Locking

### IDistributedLockProvider Interface
- **Path:** `src/modules/Elsa.DistributedLocking/Contracts/IDistributedLockProvider.cs`
- **Description:** Interface for distributed lock providers. Implemented by Redis, PostgreSQL, and other lock providers via Medallion.Threading.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.DistributedLocking/Contracts/IDistributedLockProvider.cs

## Distributed Runtime

### DistributedWorkflowRuntime
- **Path:** `src/modules/Elsa.Workflows.Runtime/Runtime/DistributedWorkflowRuntime.cs`
- **Description:** Distributed implementation of the workflow runtime that uses distributed locking to coordinate workflow execution across cluster nodes.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Runtime/Runtime/DistributedWorkflowRuntime.cs

## Distributed Caching

### DistributedCacheFeature
- **Path:** `src/modules/Elsa.DistributedCaching/Features/DistributedCacheFeature.cs`
- **Description:** Feature configuration for distributed caching. Enables cache invalidation across cluster nodes using MassTransit pub/sub messaging.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.DistributedCaching/Features/DistributedCacheFeature.cs

## Scheduling

### QuartzSchedulingFeature
- **Path:** `src/modules/Elsa.Scheduling/Features/QuartzSchedulingFeature.cs`
- **Description:** Feature configuration for Quartz.NET integration. Configures Quartz scheduler with clustering support when enabled.
- **Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Scheduling/Features/QuartzSchedulingFeature.cs

## Notes for Maintainers

- All permalinks point to the `main` branch and may need updating for specific releases
- Source file paths are relative to the elsa-core repository root
- The clustering guide references specific methods and patterns from these files
- When elsa-core is updated, verify that the clustering guide remains accurate
- Consider adding integration tests that validate clustering behavior across multiple nodes
