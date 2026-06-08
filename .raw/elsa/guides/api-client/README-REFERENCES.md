---
description: >-
  Source file references for the API & Client Guide, grounding documentation in elsa-core code.
---

# Source File References

This document provides exact source file references in the elsa-core repository that underpin the API & Client Guide documentation. These references are grounded in the elsa-core `main` branch.

## API Client Library

### WorkflowOptions (API Client)

**Path:** `src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/WorkflowOptions.cs`

**Purpose:** Client-side model for workflow options used when creating or updating workflow definitions via the API.

**Key Properties:**
- `CommitStrategyName` — Select a commit strategy for state persistence
- `ActivationStrategyType` — Control instance creation behavior (Default, Singleton)
- `AutoUpdateConsumingWorkflows` — Auto-update workflows that reference this definition

**Usage in Guide:**
- Publishing Workflow Definitions section
- Versioning & Publishing Semantics section
- Commit Strategies section

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/WorkflowOptions.cs

---

### Workflow Definitions API Client

**Path:** `src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/`

**Key Files:**
- `Contracts/IWorkflowDefinitionsApi.cs` — API contract for workflow definitions
- `Models/WorkflowDefinitionModel.cs` — Model for workflow definition data
- `Models/Activity.cs` — Activity model for building workflows
- `Requests/SaveWorkflowDefinitionRequest.cs` — Request model for saving definitions
- `Requests/PublishWorkflowDefinitionRequest.cs` — Request model for publishing

**Usage in Guide:**
- Publishing Workflow Definitions section
- Example: publish-workflow.cs

**Permalink (Directory):** https://github.com/elsa-workflows/elsa-core/tree/main/src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions

---

### Workflow Instances API Client

**Path:** `src/clients/Elsa.Api.Client/Resources/WorkflowInstances/`

**Key Files:**
- `Contracts/IWorkflowInstancesApi.cs` — API contract for workflow instances
- `Models/WorkflowInstanceSummary.cs` — Summary model for instance listing
- `Requests/StartWorkflowRequest.cs` — Request model for starting workflows
- `Requests/ListWorkflowInstancesRequest.cs` — Request model for querying instances

**Usage in Guide:**
- Starting / Instantiating Workflows section
- Querying Workflow Definitions & Instances section
- Examples: start-workflow.cs, query-workflows.cs

**Permalink (Directory):** https://github.com/elsa-workflows/elsa-core/tree/main/src/clients/Elsa.Api.Client/Resources/WorkflowInstances

---

### Activity Extensions (API Client)

**Path:** `src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/ActivityExtensions.cs`

**Purpose:** Extension methods for configuring activity properties, including resilience strategies.

**Key Methods (if present):**
- `SetResilienceStrategy` — Configure retry/resilience behavior for an activity
- `GetResilienceStrategy` — Retrieve current resilience configuration

**Usage in Guide:**
- Incidents & Retry / Resilience section
- Example: resilience-strategy.cs

**Note:** Verify this file exists in your version. The exact API may vary.

---

## Core Workflow Models

### WorkflowOptions (Core)

**Path:** `src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs`

**Purpose:** Core model for workflow-level options that control execution behavior.

**Key Properties:**
- `CommitStrategyName` — Name of the commit strategy to use
- `ActivationStrategyName` — Name of the activation strategy

**Usage in Guide:**
- Versioning & Publishing Semantics section
- Commit Strategies section

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs

---

## Bookmarks & Resume

### ActivityExecutionContext (Bookmark Creation)

**Path:** `src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs`

**Purpose:** Execution context for activities, containing the `CreateBookmark()` method for suspending workflows.

**Key Methods:**
- `CreateBookmark()` — Creates a bookmark at the current activity, suspending the workflow
- Bookmark payload serialization
- Automatic workflow suspension when bookmark is created

**Usage in Guide:**
- Bookmarks & Resuming section
- How Bookmarks Work subsection

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Core/Contexts/ActivityExecutionContext.cs

---

### BookmarkExecutionContextExtensions

**Path:** `src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs`

**Purpose:** Extension methods for generating bookmark trigger URLs for HTTP workflows.

**Key Methods:**
- `GenerateBookmarkTriggerUrl()` — Generates tokenized resume URL

**Usage in Guide:**
- Bookmarks & Resuming section
- Token-based resume examples

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Http/Extensions/BookmarkExecutionContextExtensions.cs

---

### WorkflowResumer

**Path:** `src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs`

**Purpose:** Service responsible for resuming suspended workflows at bookmarks.

**Key Behavior:**
- Acquires distributed lock on workflow instance
- Loads workflow state from database
- Finds matching bookmark
- Resumes execution from bookmarked activity
- Burns (deletes) bookmark if `AutoBurn = true`

**Usage in Guide:**
- Bookmarks & Resuming section
- Resume Flow & Locking subsection

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs

---

### Bookmark Hashing (Stimulus)

**Path:** `src/modules/Elsa.Workflows.Core/Bookmarks/`

**Key Files:**
- `Bookmark.cs` — Core bookmark model
- `StimulusHasher.cs` — Deterministic hash generation for bookmark matching
- `BookmarkPayloadSerializer.cs` — Serialization for bookmark payloads

**Purpose:** Stimulus hashing implementation for efficient bookmark matching.

**Usage in Guide:**
- Stimulus Hashing subsection
- Bookmark matching explanation

**Permalink (Directory):** https://github.com/elsa-workflows/elsa-core/tree/main/src/modules/Elsa.Workflows.Core/Bookmarks

---

## Commit Strategies

### CommitStrategiesFeature

**Path:** `src/modules/Elsa.Workflows.Core/CommitStates/CommitStrategiesFeature.cs`

**Purpose:** Feature configuration for registering and managing commit strategies.

**Usage in Guide:**
- Commit Strategies section
- Cross-reference to DOC-021 (Performance Guide)

**Permalink (GitHub):** https://github.com/elsa-workflows/elsa-core/blob/main/src/modules/Elsa.Workflows.Core/CommitStates/CommitStrategiesFeature.cs

---

## Related References

### Troubleshooting & Error Handling

For error codes and troubleshooting:
- See [Troubleshooting Guide](../troubleshooting/README.md) (DOC-017)
- Reference: `src/modules/Elsa.Workflows.Core/Middleware/Activities/DefaultActivityInvokerMiddleware.cs`

### Security & Authentication

For authentication and tokenized URLs:
- See [Security & Authentication Guide](../security/README.md) (DOC-020)
- Reference: `src/apps/Elsa.Server.Web/Program.cs`

### Performance & Commit Strategies

For detailed commit strategy guidance:
- See [Performance & Scaling Guide](../performance/README.md) (DOC-021)
- Reference: `src/modules/Elsa.Workflows.Core/CommitStates/Strategies/Workflows/`

---

## Version Information

These references are based on:
- **elsa-core:** `main` branch

> **Note:** Source paths may change between versions. Verify paths against the specific Elsa version you're using.

## External Resources

- [elsa-core GitHub Repository](https://github.com/elsa-workflows/elsa-core)
- [elsa-extensions GitHub Repository](https://github.com/elsa-workflows/elsa-extensions)
- [Elsa API Client NuGet Package](https://www.nuget.org/packages/Elsa.Api.Client)
- [Elsa Documentation](https://v3.elsaworkflows.io/)

---

## Verification Steps

To verify these references are still valid:

1. Clone elsa-core repository
2. Checkout the `main` branch
3. Verify each file path exists
4. Check that the documented APIs match the actual implementation

```bash
git clone https://github.com/elsa-workflows/elsa-core.git
cd elsa-core
git checkout main

# Verify API client models
ls -la src/clients/Elsa.Api.Client/Resources/WorkflowDefinitions/Models/

# Verify core workflow options
cat src/modules/Elsa.Workflows.Core/Models/WorkflowOptions.cs

# Verify bookmark context
ls -la src/modules/Elsa.Workflows.Core/Contexts/

# Verify workflow resumer
cat src/modules/Elsa.Workflows.Runtime/Services/WorkflowResumer.cs
```

---

**Last Updated:** 2025-11-28

**Branch Reference:** `main`
