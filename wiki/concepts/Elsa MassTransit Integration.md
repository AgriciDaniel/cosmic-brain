---
type: concept
title: Elsa MassTransit Integration
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa
  - workflows
  - masstransit
  - messaging
  - integration
status: developing
address: c-000078
related:
  - "[[Elsa Activities]]"
  - "[[Elsa Workflows]]"
---

# Elsa MassTransit Integration

[MassTransit](https://masstransit.io/) is an open-source distributed application framework for .NET that provides a consistent abstraction over supported message transports (RabbitMQ, Azure Service Bus, Amazon SQS, etc.). The Elsa MassTransit module enables workflows to send and receive messages through workflow activities, providing an alternative to writing traditional C# consumers.

## How It Works

Elsa models .NET message types as workflow activities. When you register a message type with the MassTransit feature, two activities are automatically generated:

1. **Publish {MessageType}** -- Publishes a message of that type to the configured transport
2. **{MessageType}** (receive) -- Acts as a trigger that starts or resumes workflows when a message of that type is received

## Configuration

Install the MassTransit module and configure it:

```csharp
services.AddElsa(elsa =>
{
    elsa.AddMassTransit(massTransit =>
    {
        // Register message types
        massTransit.AddMessageType<OrderCreated>();
    });
});
```

## Defining Message Types

Message types are simple C# types. Records work well:

```csharp
public record OrderCreated(string Id, string ProductId, int Quantity);
```

## Generated Activities

Once registered, two activities become available in Elsa Studio and programmatic workflows:

- **Order Created** (trigger): Appears in the activity picker. When placed in a workflow with `CanStartWorkflow = true`, it starts a new workflow instance whenever an `OrderCreated` message arrives on the transport.
- **Publish Order Created**: Publishes an `OrderCreated` message when the activity executes.

This enables workflow-first messaging patterns without writing dedicated consumer classes.

## Use Cases

- **Event-driven workflows**: Start workflows in response to domain events published by other services
- **Workflow chaining**: One workflow publishes a message that triggers another workflow
- **Microservice orchestration**: Coordinate across service boundaries using message transport

## Example Workflow

A workflow that starts when an order is created, processes it, and publishes a follow-up message:

```
Order Created (trigger) -> Validate Order -> Process Payment -> Publish OrderConfirmed
```

Each step can be implemented as an activity, with message publishing bridging service boundaries.

## Integration Notes

- The MassTransit module auto-generates the necessary consumer infrastructure under the hood
- Message types must be registered with `AddMessageType<T>()` to generate activities
- Activity names are derived from the message type name
- Works with any transport supported by MassTransit (RabbitMQ, Azure Service Bus, SQS, InMemory, etc.)
