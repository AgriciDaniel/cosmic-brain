---
type: concept
title: "Elsa Workflow Activation Strategies"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-execution
  - activation
  - concurrency
status: developing
address: c-000094
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Architecture]]"
---

# Elsa Workflow Activation Strategies

Workflows can be configured with an **activation strategy** that controls whether a given workflow definition may execute. This prevents unwanted concurrent executions or enforces correlation-based singletons.

---

## Available Strategies

| Strategy | Description |
|----------|-------------|
| **Always** | Always allow the workflow to execute. No restrictions. |
| **Singleton** | Only allow execution if no existing workflow instance of the same definition is in the `Running` state. |
| **Correlation** | Only allow execution with a given correlation ID if no other workflow instance (of any definition) is running with the same correlation ID. |
| **Correlated Singleton** | Only allow execution with a given correlation ID if no existing instance of the **same workflow definition** is running with that correlation ID. |

---

## When to Use Each Strategy

- **Always**: Stateless or fire-and-forget workflows. No concurrency concerns.
- **Singleton**: Workflows that must never overlap (e.g., a single-file processor).
- **Correlation**: Ensures only one workflow across all definitions handles a given entity (e.g., order ID).
- **Correlated Singleton**: Ensures only one instance of a specific workflow handles a given entity at a time.

---

## Configuration

Activation strategies are set per workflow definition. In Elsa Studio, select the strategy in the workflow settings panel. Programmatically, set the strategy when building the workflow.

> [!info]
> Activation strategies interact with the [[Elsa Architecture | workflow dispatcher]]. When a dispatch request arrives for a workflow whose strategy blocks execution, the request is silently dropped.
