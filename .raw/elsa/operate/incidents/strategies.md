# Strategies

An incident strategy is represented by the `IIncidentStrategy` interface:

```csharp
/// <summary>
/// A strategy for handling workflow incidents
/// </summary>
public interface IIncidentStrategy
{
    /// <summary>
    /// Handles an incident.
    /// </summary>
    /// <param name="context">The activity execution context where the incident occurred.</param>
    void HandleIncident(ActivityExecutionContext context);
}
```

Out of the box, there are two strategies available:

1. `FaultStrategy`: The workflow engine will stop the workflow and mark it as faulted.
2. `ContinueWithIncidentsStrategy`: The workflow engine will continue executing the workflow and create an incident record for each error that occurs.
