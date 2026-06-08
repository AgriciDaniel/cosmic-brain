# Tutorial

The following example highlights creating and registering a fictive message type called `OrderCreated`.

{% code title="OrderCreated.cs" %}
```csharp
public record OrderCreated(string Id, string ProductId, int Quantity);
```
{% endcode %}

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
    // Enable and configure MassTransit
    elsa.AddMassTransit(massTransit =>
    {
        // Register our message type.
        massTransit.AddMessageType<OrderCreated>();
    };
});
```
{% endcode %}

With the above setup, your workflow server will now add two activities that allow you to send and receive messages of type \`OrderCreated\`:

* Order Created
* Publish Order Created

The **Order Created** activity acts as a trigger, which means that it will automatically start the workflow it is a part of when a message is received of this type. The **Publish Order Created** activity will publish a message of this type.
