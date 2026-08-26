---
description: >-
  Source file references for the Persistence Guide, grounding documentation in elsa-core and elsa-extensions code.
---

# Source File References

This document provides exact source file references in the elsa-core and elsa-extensions repositories that underpin the Persistence Guide documentation. These references are grounded in the elsa-core `develop/3.6.0` branch.

## Core Services Wire-up

### WorkflowsFeature

**Path:** `src/modules/Elsa.Workflows.Core/Features/WorkflowsFeature.cs`

**Purpose:** Core services registration for workflow execution. This is where the workflow engine, activity registry, and execution pipeline are configured.

**Key Elements:**
- `AddElsa()` extension method entry point
- Activity registry configuration
- Workflow execution pipeline setup
- Commit strategy registration

### WorkflowManagementFeature

**Path:** `src/modules/Elsa.Workflows.Management/Features/WorkflowManagementFeature.cs`

**Purpose:** Registers stores and services for workflow definition and instance management.

**Key Elements:**
- `IWorkflowDefinitionStore` registration
- `IWorkflowInstanceStore` registration
- `UseEntityFrameworkCore()` / `UseMongoDb()` / `UseDapper()` methods
- Management-level options configuration

**Usage in Guide:**
- Configuration patterns section
- EF Core / MongoDB / Dapper setup examples

### WorkflowRuntimeFeature

**Path:** `src/modules/Elsa.Workflows.Runtime/Features/WorkflowRuntimeFeature.cs`

**Purpose:** Registers runtime stores and services including bookmarks, inbox, and execution logs.

**Key Elements:**
- `IBookmarkStore` registration
- `IWorkflowInboxStore` registration
- `IActivityExecutionStore` registration
- Inbox cleanup options (`WorkflowInboxCleanupOptions`)
- Distributed runtime configuration

**Usage in Guide:**
- Persistence stores overview
- Inbox cleanup section
- Runtime configuration examples

## Bookmarks and Storage

### Bookmark Models and Hashing

**Path:** `src/modules/Elsa.Workflows.Core/Bookmarks/`

**Purpose:** Contains bookmark-related types, hashing logic, and storage hints.

**Key Files:**
- `Bookmark.cs` — Core bookmark model
- `BookmarkPayloadSerializer.cs` — Serialization for bookmark payload
- `BookmarkHasher.cs` — Deterministic hash generation for bookmark matching

**Key Concepts:**
- Bookmarks are matched using a deterministic hash based on activity type and stimulus data
- Hash collisions are used to prevent duplicate bookmark creation in clusters
- Storage hints can influence persistence behavior

**Usage in Guide:**
- Indexing recommendations (activity_type_name + hash)
- High-cardinality bookmark pitfall
- Bookmark cleanup section

### ActivityExecutionContext.CreateBookmark

**Path:** `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs`

**Purpose:** Activity execution context contains the `CreateBookmark()` method that generates bookmarks during workflow execution.

**Key Elements:**
- `CreateBookmark()` method
- Bookmark payload serialization
- Automatic workflow suspension when bookmark is created

**Usage in Guide:**
- Understanding bookmark storage patterns
- Resume behavior documentation

## Workflow Options and Retention

### WorkflowOptions

**Path:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs`

**Purpose:** Contains workflow-level options including commit strategy selection and retention-related settings.

**Key Elements:**
- `CommitStrategyName` property
- Workflow-level configuration options
- Persistence behavior hints

**Usage in Guide:**
- Commit strategy selection
- Cross-reference to Performance Guide

## Entity Framework Core

### EF Core Module

**Path:** `src/modules/Elsa.Persistence.EFCore/`

**Key Files:**
- `ElsaDbContext.cs` — Base DbContext
- `ManagementElsaDbContext.cs` — Management stores context
- `RuntimeElsaDbContext.cs` — Runtime stores context
- `Migrations/` — EF Core migrations

**Purpose:** EF Core persistence implementation for relational databases.

**Usage in Guide:**
- EF Core setup example
- Migration commands
- Connection string configuration

### Database Provider Modules

- `src/modules/Elsa.Persistence.EFCore.PostgreSql/`
- `src/modules/Elsa.Persistence.EFCore.SqlServer/`
- `src/modules/Elsa.Persistence.EFCore.Sqlite/`

## MongoDB

### MongoDB Module

**Path:** `src/modules/Elsa.MongoDb/`

**Key Files:**
- `MongoDbStore.cs` — Generic MongoDB store implementation
- `MongoDbWorkflowDefinitionStore.cs`
- `MongoDbWorkflowInstanceStore.cs`
- `MongoDbBookmarkStore.cs`

**Purpose:** MongoDB persistence implementation.

**Usage in Guide:**
- MongoDB setup example
- Index creation guidance
- Collection naming

## Dapper

### Dapper Module

**Path:** `src/modules/Elsa.Dapper/`

**Key Files:**
- `DapperStore.cs` — Generic Dapper store implementation
- `DapperWorkflowDefinitionStore.cs`
- `DapperWorkflowInstanceStore.cs`
- `DapperBookmarkStore.cs`
- `TypeHandlers/` — Custom type handlers for complex types

**Purpose:** Dapper persistence implementation for performance-critical scenarios.

**Usage in Guide:**
- Dapper setup example
- Schema creation scripts
- Connection factory configuration

## OpenTelemetry Tracing

### Elsa.OpenTelemetry (elsa-extensions)

**Repository:** [elsa-workflows/elsa-extensions](https://github.com/elsa-workflows/elsa-extensions)

**Path:** `src/modules/diagnostics/Elsa.OpenTelemetry/`

**Key Files:**
- `OpenTelemetryMiddleware.cs` — Tracing middleware for workflow execution
- `ActivitySource.cs` — Elsa's ActivitySource for OpenTelemetry
- `Extensions/` — Registration extensions

**Purpose:** OpenTelemetry integration for distributed tracing and observability.

**Usage in Guide:**
- Observability & Performance section
- Cross-reference to DOC-016 (Monitoring)

## Retention

### Retention Module

**Path:** `src/modules/Elsa.Retention/`

**Key Files:**
- `RetentionFeature.cs` — Feature registration
- `RetentionService.cs` — Background cleanup service
- `Filters/` — Retention filter implementations

**Purpose:** Automatic cleanup of old workflow instances and related data.

**Usage in Guide:**
- Retention & cleanup section
- Delete policy configuration

## Related Core Services

### WorkflowResumer

**Path:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`

**Purpose:** Resumes suspended workflows by bookmark. Uses distributed locking for cluster safety.

**Usage in Guide:**
- Cross-reference to Clustering Guide
- Understanding resume behavior

### DefaultBookmarkScheduler

**Path:** `src/modules/Elsa.Scheduling/Services/DefaultBookmarkScheduler.cs`

**Purpose:** Schedules bookmark resume operations via Quartz or other schedulers.

**Usage in Guide:**
- Cross-reference to Clustering Guide
- Timer/delay bookmark handling

## Version Information

These references are based on:
- **elsa-core:** `develop/3.6.0` branch
- **elsa-extensions:** Main branch (compatible with elsa-core 3.6.x)

> **Note:** Source paths may change between versions. Verify paths against the specific Elsa version you're using.

## External Resources

- [elsa-core GitHub Repository](https://github.com/elsa-workflows/elsa-core)
- [elsa-extensions GitHub Repository](https://github.com/elsa-workflows/elsa-extensions)
- [elsa-samples GitHub Repository](https://github.com/elsa-workflows/elsa-samples)
- [Elsa Documentation](https://v3.elsaworkflows.io/)

---

**Last Updated:** 2025-11-28
