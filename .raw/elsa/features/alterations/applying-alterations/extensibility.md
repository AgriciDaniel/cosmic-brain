# Extensibility

Elsa Workflows supports custom alteration types, allowing developers to define their own types and utilize them as alterations.

To define a custom alteration type, implement the `IAlteration` interface.

```csharp
public interface IAlteration
{
}
```

Next, implement an **alteration handler** that handles the alteration type.

```csharp
public interface IAlterationHandler
{
    bool CanHandle(IAlteration alteration);
    ValueTask HandleAsync(AlterationContext context);
}
```

Or, derive from the `AlterationHandlerBase<T>` base class to simplify the implementation.

Finally, register the alteration handler with the service collection.

```csharp
services.AddElsa(elsa => 
{
    elsa.UseAlterations(alterations => 
    {
        alterations.AddAlteration<MyAlteration, MyAlterationHandler>();
    })
});
```

## Example <a href="#example" id="example"></a>

The following example demonstrates how to define a custom alteration type and handler.

```csharp
public class MyAlteration : IAlteration
{
    public string Message { get; set; }
}

public class MyAlterationHandler : AlterationHandlerBase<MyAlteration>
{
    public override async ValueTask HandleAsync(AlterationContext context, MyAlteration alteration)
    {
        context.WorkflowExecutionContext.Output.Add("Message", context.Alteration.Message);
    }
}
```
