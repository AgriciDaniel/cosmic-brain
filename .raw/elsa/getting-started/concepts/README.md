---
description: >-
  This section provides a comprehensive overview of fundamental principles and
  key elements that form the foundation of Elsa.
---

# Concepts

## Workflow

A workflow is a sequence of steps called **activities** that represents a process. Workflows can be created visually or programmatically. In Elsa, a workflow is represented by an instance of the `Workflow` class. The Workflow class has a `Root` property of type `IActivity`, which is scheduled for execution when the workflow starts.

## Workflow Instance

A workflow instance represents a database-persisted instance of a workflow in execution, encapsulated by the `WorkflowInstance` class.

## Activity

An activity is a unit of work executed by the workflow engine. In Elsa, these are classes implementing the `IActivity` interface and can be linked or composed together to form a workflow.

## Bookmark

A bookmark signifies a pause point in a workflow, enabling the workflow to be resumed later. It is typically created by blocking activities such as the `Event` or `Delay` activity.

## Trigger

A trigger is an activity with its `Kind` metadata set to `Trigger`  and is able to start new workflow instances of the containing workflow. For example, the `HttpEndpoint` activity is a trigger that enables the containing workflow to be executed when a given URL is requested.

## Blocking Activity

Blocking activities are those which do not complete execution immediately upon initiation. They often create bookmarks, halting the workflow's progress until resumed. This halting nature coins the term "blocking."

## Burst of Execution

This term describes the period during which the workflow runner actively executes activities. A workflow executing continuously from start to finish occurs in a single burst, whereas a workflow interrupted by a blocking activity results in multiple bursts, resuming on subsequent triggers.

## Correlation ID

A Correlation ID is a flexible identifier linking related workflows and external entities. It aids in tracing workflows in distributed, asynchronous, or hierarchical systems. Assigning a Correlation ID allows tracking of related workflows and ties them to specific business objects like documents, customers, or orders.

[Read more](correlation-id.md)

## Outcome

Activities in a flowchart are connected that defines the logic of the workflow. Each activity can have one ore more _potential_ results, which are referred to as _outcomes_. These outcomes are visually displayed as "ports" on the activity. For example, the `Decision` activity has two potential outcomes: `True` and `False`. When using the designer, the user can connect a subsequent activity to these outcomes. This powerful mechanism simplifies workflows by eliminating the need for separate decision activities to evaluate an activity's result.

[Read more](outcomes.md)

## Input

In Elsa, input can refer to two things:

* Input to an activity.
* Input to a workflow.

### Activity Input

Most activities have at least one input, represented as public properties. For instance, the `WriteLine` activity has a `Text` property used to display a string in the console window.

### Workflow Input

Workflows can receive input from the application. For example, a workflow processing an order can get the Order ID through an input like `OrderId`.

## Output

In workflows, activities can produce _output_ data for later steps. Outputs pass info like numbers or text to the next activity. Activities can create results and outputs. You can generate outputs, like booleans, for decision-making, but it's easier to use outcomes. Use outputs for data, like database results, when no decisions are needed.

## Variable

Variables can be set at the workflow level to store data. Use dynamic expressions to set or retrieve these variables. Activity outputs can update a variable automatically, allowing them to be used by the next activities. This makes it easy to transfer and store data for activities.

{% hint style="info" %}
**In Elsa Studio**: Learn how to reference variables in expressions using JavaScript and C# in the [Expressions guide](../../guides/studio/expressions.md).
{% endhint %}

## Incident

An incident is an error event that occurred in the workflow. For example, if an activity faults, an incident is recorded as part of the workflow execution.

## Alteration

An alteration represents a change that can be applied to a given [workflow instance](./#workflow-instance).

Using alterations, you can modify a workflow instance's state, schedule activities, and more.
