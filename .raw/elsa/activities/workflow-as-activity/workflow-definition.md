# Workflow definition

When creating a **Workflow definition**, you can check the box 'Usable as activity' in the properties tab of the workflow definition.
When published, this workflow definition can then be found as an activity and be used in other workflow definitions.

## Inputs/Outputs
Custom inputs and outputs can be specified in the input/output tab of the workflow definition. They have the following properies:
| Name  | Required |  Description                                      |
| ----- | -------- | ------------------------------------------------- |
| Name  |  `true`  | Identifier of the input.   |
| Display name  |  `true`  | Friendly name for the input. It is recommended to always update this field, because the display name is shown in the UI when providing inputs to this activity in other workflow definitions  |
| Description |  `false`  | Optional additional information to describe the input. The description is shown as helper text under the input field in the activity |
| Category |  `false`  | Optional grouping/categorization of the input field. All input fields under the same category are grouped together, and the category value is rendered as header for the grouped inputs |
| UI Hint |  `true`  | How the input field is rendered - e.g. dropdown, checkbox, JSON editor, etc. |
| Storage |  `true`  | Option to control storage of the input data at runtime |

### Input naming violations
The 'Name' property of a custom input must comply with the following rules:
- Should only contain alphanumeric characters: no whitespaces or special characters
- Should start with uppercase character
- Cannot equal reserved keywords "Metadata" nor "CustomProperties" - or any equivalent variant such as "MetaData" or "Customproperties"

### Usage: Inputs
Inputs can be accessed through javascript with an auto-generated function in the format "get{InputName}". Example:

```javascript
var input = getCustomInput();
```

### Usage: Outputs
The output can be set using the `SetOutput` activity. The output will then be accessible by workflows that use this activity.

<div data-full-width="false"><figure><img src=".gitbook/assets/sample-set-workflowdefinition-output.png" alt=""><figcaption><p><kbd>Set output</kbd></p></figcaption></figure></div>

## Outcomes
Custom outcomes can be defined. Use the `Complete` activity to set the outcome of the workflow.
<div data-full-width="false"><figure><img src=".gitbook/assets/sample-set-workflowdefinition-outcome.png" alt=""><figcaption><p><kbd>Set outcome</kbd></p></figcaption></figure></div>

## Use as activity

When a **Workflow definition** is configured to be used as activity and then published, it can be found in other workflow definitions as an activity, under the `Workflows` activity group.

<div data-full-width="false"><figure><img src=".gitbook/assets/sample-using-worflow-as-activity.png" alt=""><figcaption><p><kbd>Find and use workflow as activity</kbd></p></figcaption></figure></div>