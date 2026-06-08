# Incidents

An [incident](../../getting-started/concepts/#incident) is an error event that occurred in the workflow. For example, if an activity faults, an incident is recorded as part of the workflow execution.

Errors occur when an unhandled exception is thrown when an activity executes. The workflow runtime catches the exception and creates an incident record. The incident record is stored in the `Incidents` collection of the `WorkflowExecutionContext`, which is ultimately persisted as a `WorkflowInstance` record in the database.
