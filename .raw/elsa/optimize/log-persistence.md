# Log Persistence

Whenever an activity executes, it generates an **activity execution record** that stores both its input and output.

However, this can lead to rapid database growth and might inadvertently store sensitive information that shouldn't be part of the workflow's persistent data. To address these concerns, the Log Persistence feature provides granular control over what activity inputs and outputs are persisted in the execution records.

In the following image, the selected Activity Execution stores both input ("State") and output ("Output"). For instance, the `ParsedContent` field contains a JSON payload that was posted to the HTTP Endpoint activity.

<div data-full-width="false"><figure><img src="../.gitbook/assets/activity-input-output-with-state.png" alt=""><figcaption></figcaption></figure></div>

Typically, inputs like this are bound to workflow variables, which have their own storage mechanisms. To reduce database size and prevent redundant storage, it may be beneficial to exclude such fields from the activity execution record.

<figure><img src="../.gitbook/assets/activity-input-output-without-state.png" alt=""><figcaption></figcaption></figure>

Let’s explore how we can control which fields are persisted and which ones are excluded with activity execution records.

## Log Persistence Scope﻿ <a href="#log-persistence-scope" id="log-persistence-scope"></a>

Log Persistence can be configured at various scopes, allowing for fine-grained control:

* Application-wide
* Workflow-wide
* Activity-wide
* Per input/output

For each of these scopes, you can specify a `LogPersistenceMode` value, which can be set to one of the following options:

* **Include**: The activity’s input and output will be included in the execution record.
* **Exclude**: The activity’s input and output will **not** be included in the execution record.
* **Inherit**: The system will defer to the parent scope to determine whether to include or exclude input and output.

Let’s break down how each scope functions.

### Application-wide﻿ <a href="#application-wide" id="application-wide"></a>

To globally control whether activity input and output are persisted, configure the application-wide default in your `Program.cs` file:

```csharp
services.AddElsa(elsa =>
{
    elsa.UseManagement(management =>
    {
        management.SetDefaultLogPersistenceMode(LogPersistenceMode.Exclude);
    });
});
```

With this configuration, by default, no activity input or output will be included in execution records across all workflows and activities.

### Workflow-wide﻿ <a href="#workflow-wide" id="workflow-wide"></a>

You can override the global log persistence setting on a per-workflow basis through the **Log Persistence Mode** setting in the workflow definition:

<figure><img src="../.gitbook/assets/workflow-definition-log-persistence-mode-property.png" alt=""><figcaption></figcaption></figure>

* **Inherit**: The workflow inherits the application-wide setting.
* **Include**: All activity input and output will be persisted by default for this workflow.
* **Exclude**: No activity input or output will be persisted by default for this workflow.

### Activity-wide﻿ <a href="#activity-wide" id="activity-wide"></a>

To gain even finer control, you can override the workflow-wide setting on a per-activity basis through the **Persistence** tab:

<figure><img src="../.gitbook/assets/activity-log-persistence-mode-property.png" alt=""><figcaption></figcaption></figure>

* **Inherit**: The activity inherits the workflow-wide setting.
* **Include**: All input and output for this activity will be persisted.
* **Exclude**: No input or output for this activity will be persisted.

### Per Input/Output﻿ <a href="#per-input-output" id="per-input-output"></a>

Lastly, you can override the activity-wide setting at the level of individual inputs or outputs. This is done from the same Persistence tab, allowing you to selectively include or exclude specific properties, such as `ParsedPayload`:

<figure><img src="../.gitbook/assets/input-output-log-persistence-mode-property.png" alt=""><figcaption></figcaption></figure>

* **Inherit**: The input/output inherits the activity-wide setting.
* **Include**: The specific input/output will be included in the execution record.
* **Exclude**: The specific input/output will not be included in the execution record.

## Summary <a href="#conclusion" id="conclusion"></a>

The Log Persistence feature helps manage the storage of activity inputs and outputs. You can set log options for the whole app, the entire workflow, specific activities, or individual inputs/outputs. This way, you keep important data while saving space and protecting sensitive information, making your app more efficient and secure.
