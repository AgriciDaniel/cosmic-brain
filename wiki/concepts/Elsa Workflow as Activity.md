---
type: concept
title: Elsa Workflow as Activity
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - composition
  - reusability
status: developing
address: c-000095
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa Workflow as Activity

Elsa Workflows allows workflow definitions to be used as reusable activities within other workflow definitions. This enables composable workflow design -- building complex processes from smaller, well-defined sub-workflows.

## Enabling a Workflow as an Activity

In Elsa Studio, when creating or editing a workflow definition, check the **"Usable as activity"** property in the workflow definition's properties tab. Once published, this workflow definition becomes available as an activity in the `Workflows` activity group of the activity picker.

## Inputs and Outputs

Workflows used as activities can define custom inputs and outputs, making them reusable with varying parameters.

### Defining Inputs

Inputs have the following properties:

| Property | Required | Description |
|----------|----------|-------------|
| Name | Yes | Identifier for the input. Must be alphanumeric, start with uppercase, and not equal "Metadata" or "CustomProperties" |
| Display Name | Yes | Friendly name shown in the UI when configuring the activity. Recommended to always set |
| Description | No | Help text shown under the input field |
| Category | No | Groups related inputs. Inputs in the same category are rendered together with the category as a header |
| UI Hint | Yes | Controls how the input field is rendered (dropdown, checkbox, JSON editor, etc.) |
| Storage | Yes | Controls where input data is stored at runtime |

### Using Inputs in the Workflow

Inputs are accessed through auto-generated JavaScript functions in the format `get{InputName}`:

```javascript
var input = getCustomInput();
```

### Defining Outputs

Outputs can be set using the built-in `SetOutput` activity within the sub-workflow. The output value is then accessible to the parent workflow that uses this as an activity.

### Usage: Outputs in Parent Workflows

The parent workflow accesses the output through the normal activity output mechanisms (variable capture or direct access).

### Defining Outcomes

Custom outcomes can be defined for the workflow activity. Use the `Complete` activity within the sub-workflow to specify which outcome to trigger.

## Using the Workflow Activity

Once a workflow definition is configured as usable as activity and published, it appears under the `Workflows` group in the activity picker of Elsa Studio. Workflow designers can drag it into any workflow definition and configure its inputs.

## Benefits

- **Modularity**: Break large workflows into smaller, focused sub-workflows
- **Reusability**: Share common business logic across multiple workflows
- **Maintainability**: Update the sub-workflow once and all consumers automatically use the new version
- **Encapsulation**: Hide complexity behind a clean input/output/outcome interface
