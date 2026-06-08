---
type: concept
title: "Elsa Log Persistence"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - logging
  - persistence
  - optimization
  - performance
status: developing
address: c-000076
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Persistence]]"
  - "[[Elsa Logging Framework]]"
  - "[[Elsa Retention]]"
---

# Elsa Log Persistence

Whenever an activity executes, it generates an **activity execution record** storing both its input and output. The Log Persistence feature provides granular control over what gets persisted, preventing database bloat and protecting sensitive information.

---

## Persistence Modes

Each scope supports one of three modes:

| Mode | Behavior |
|------|----------|
| **Include** | Input and output are persisted |
| **Exclude** | Input and output are NOT persisted |
| **Inherit** | Defers to the parent scope |

---

## Scope Hierarchy

Control is available at four nested levels:

### 1. Application-Wide

Set the default for all workflows and activities:

```csharp
services.AddElsa(elsa =>
{
    elsa.UseManagement(management =>
    {
        management.SetDefaultLogPersistenceMode(LogPersistenceMode.Exclude);
    });
});
```

### 2. Workflow-Wide

Override the global default per workflow definition. In Elsa Studio, set **Log Persistence Mode** on the workflow definition settings:
- **Inherit** — uses the application-wide setting
- **Include** — all activity input/output persisted by default
- **Exclude** — no activity input/output persisted by default

### 3. Activity-Wide

Override per activity via the **Persistence** tab in the activity's property panel:
- **Inherit** — uses the workflow-wide setting
- **Include** — persist all input/output for this activity
- **Exclude** — persist no input/output for this activity

### 4. Per Input/Output

Fine-tune individual properties from the same Persistence tab. For example, exclude `ParsedPayload` while keeping other inputs:
- **Inherit** — uses the activity-wide setting
- **Include** — persist this specific field
- **Exclude** — skip this specific field

---

## Summary

The Log Persistence feature reduces database storage requirements and protects sensitive data by controlling which activity inputs and outputs are written to execution records. The hierarchical scope system (application -> workflow -> activity -> per-field) allows precise control without repetitive configuration.

See also [[Elsa Retention]] for automatic cleanup of completed workflow instances and [[Elsa Logging Framework]] for structured log emission from workflows.
