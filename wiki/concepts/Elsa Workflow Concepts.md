---
type: concept
title: "Elsa Workflow Concepts"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workflow-engine
  - dotnet
status: developing
address: c-000096
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Hello World]]"
  - "[[Elsa Application Types]]"
---

# Elsa Workflow Concepts

Core conceptual building blocks in the [[entities/Elsa Workflows]] workflow engine. These terms appear throughout Elsa documentation and are essential for understanding how workflows are defined, executed, and managed.

---

## Workflow

A workflow is a sequence of steps called **activities** that represents a process. Workflows can be created visually (via Elsa Studio) or programmatically (in C#). In Elsa, a workflow is represented by an instance of the `Workflow` class, which has a `Root` property of type `IActivity`. This root activity is scheduled for execution when the workflow starts.

## Workflow Instance

A workflow instance represents a database-persisted execution of a workflow definition (the blueprint). Encapsulated by the `WorkflowInstance` class, each instance tracks its own execution state, variable values, bookmarks, and correlation IDs.

**Instance States:**
- `Running` — Currently executing
- `Suspended` — Paused, waiting for an external event or condition
- `Finished` — Completed successfully
- `Faulted` — Terminated due to an error
- `Canceled` — Manually or programmatically canceled

## Activity

An activity is a single unit of work executed by the workflow engine. Activities are classes implementing the `IActivity` interface and can be linked or composed together to form a workflow.

**Types of activities:**
- **Control Flow**: Sequence, Flowchart, If, Switch, For, While, Fork
- **Data**: SetVariable, WriteLine, ReadLine
- **HTTP**: HttpEndpoint, WriteHttpResponse, SendHttpRequest
- **Blocking**: Event, Delay, Timer (create bookmarks to pause execution)
- **Trigger**: HttpEndpoint, Timer, Cron (can start new workflow instances)
- **Custom**: User-defined activities extending base classes

**Activity Lifecycle:**
```
Scheduled → Executing → Suspending → Suspended (if blocking)
                                    → Completed
```

## Bookmark

A bookmark signifies a pause point in a workflow, enabling the workflow to be resumed later. It is typically created by blocking activities such as `Event` or `Delay`. The bookmark stores a unique payload that later gets matched against an incoming stimulus to decide which suspended instance to resume.

## Trigger

A trigger is an activity with its `Kind` metadata set to `Trigger`. Triggers can start **new** workflow instances of the containing workflow. For example, the `HttpEndpoint` activity is a trigger that enables a workflow to execute when a specific URL is requested.

**Common triggers:** HttpEndpoint, Timer, Cron, Event (custom application events)

## Blocking Activity

Blocking activities do not complete execution immediately upon initiation. They often create bookmarks, halting the workflow's progress until resumed. This halting nature coins the term "blocking." A workflow may pass through multiple bursts of execution, each interrupted by one or more blocking activities.

## Burst of Execution

A burst of execution is the period during which the workflow runner actively executes activities. A workflow executing continuously from start to finish runs in a single burst. A workflow interrupted by a blocking activity results in multiple bursts, resuming on subsequent triggers or stimuli.

## Correlation ID

A Correlation ID is a flexible string identifier that links related workflow instances and ties them to external domain entities (documents, customers, orders). It is essential for tracing workflows in distributed, asynchronous, or hierarchical systems.

**Assignment methods:**
1. **Manual** — set via API calls when dispatching a workflow
2. **Correlate Activity** — assign dynamically during execution using expressions (e.g., JavaScript)

**Use cases:**
- Parent-child workflow tracing
- Multi-step processes (order -> shipping -> billing)
- Distributed systems where workflows cross service boundaries
- Domain entity correlation (Document ID, Customer ID, Order ID)

> [!info] Observability
> Correlation IDs integrate with telemetry tools like OpenTelemetry, enabling execution path tracing, bottleneck identification, and cross-workflow debugging.

## Outcome

An outcome is a named potential result of an activity's execution. Outcomes are displayed visually as "ports" on activities in the workflow designer, and determine which activity executes next.

**Key points:**
- Outcomes define **control flow** (which path to follow)
- Activities can have multiple outcomes (e.g., `True` / `False` for a Decision activity)
- Nested workflows can define their own outcomes for parent workflows to react to

> [!tip] Outcome vs Output
> **Outcomes** shape control flow (what runs next). **Outputs** pass data values to downstream activities. An activity can produce both: e.g., a Form Submission activity outputs form data and determines via outcome whether to send a confirmation email or display an error.

**Benefits:**
- Simplifies flow logic by eliminating intermediate decision nodes
- Provides visual clarity in the flowchart designer
- Enables modular, reusable workflow components

## Input

Input in Elsa refers to two things:

1. **Activity Input** — configurable properties on activities (e.g., `WriteLine` has a `Text` property). Represented as public properties accepting values or expressions.
2. **Workflow Input** — data passed into the workflow from the application (e.g., an `OrderId` for an order-processing workflow).

## Output

Outputs are data or results produced by an activity for consumption by downstream activities. Unlike outcomes (which control flow), outputs pass values like numbers, strings, or objects for processing or storage.

## Variable

Variables store data at the workflow level. They can be set and retrieved using dynamic expressions (JavaScript, C#). Activity outputs can automatically update a variable, making it available to subsequent activities.

## Incident

An incident is an error event recorded during workflow execution. When an activity faults, an incident is logged as part of the workflow instance's execution record.

## Alteration

An alteration represents a change applied to a running [[#Workflow Instance]]. Using alterations, you can modify a workflow instance's state, schedule activities, and apply fixes — all without restarting the workflow.
