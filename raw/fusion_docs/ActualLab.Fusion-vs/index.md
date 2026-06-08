# ActualLab.Fusion vs...

How does ActualLab.Fusion compare to other technologies you might be using? This section provides detailed comparisons to help you understand where Fusion fits in your architecture.

## State Management

| Comparison | Description |
|------------|-------------|
| [Fluxor / Blazor-State](Fluxor) | Redux-like state management for Blazor |
| [MobX / Knockout](MobX) | Observable-based reactivity patterns |
| [Redux / Zustand](Redux) | Popular React state management libraries |
| [Rx.NET](RxNET) | Reactive Extensions for .NET |

## Caching

| Comparison | Description |
|------------|-------------|
| [Redis](Redis) | Distributed caching and pub/sub |
| [IDistributedCache](IDistributedCache) | ASP.NET Core's caching abstractions |
| [HybridCache](HybridCache) | .NET 9's L1/L2 caching abstraction |

## Real-Time Communication

| Comparison | Description |
|------------|-------------|
| [SignalR](SignalR) | Real-time web functionality — when to use each, and when to use both |
| [WebSockets](WebSockets) | Raw WebSocket connections vs Fusion's RPC layer |
| [gRPC Streaming](gRPC) | Bidirectional streaming and service contracts |
| [Server-Sent Events](SSE) | One-way server push vs Fusion's reactive model |

## API & Data Fetching

| Comparison | Description |
|------------|-------------|
| [GraphQL](GraphQL) | Query languages and data fetching strategies |
| [REST APIs](REST) | Traditional request-response patterns |

## Distributed Systems

| Comparison | Description |
|------------|-------------|
| [Orleans](Orleans) | Microsoft's virtual actor framework |
| [Akka.NET](AkkaNET) | Actor model and message-based concurrency |

## Architecture Patterns

| Comparison | Description |
|------------|-------------|
| [CQRS + Event Sourcing](CQRS) | Command/query separation and event-driven persistence |
| [MediatR](MediatR) | In-process messaging and pipeline behaviors |
| [Clean Architecture](CleanArchitecture) | Layered architecture and dependency inversion |

## Event-Driven Systems

| Comparison | Description |
|------------|-------------|
| [Message Brokers](MessageBrokers) | RabbitMQ, Kafka, Azure Service Bus |

## Data Access

| Comparison | Description |
|------------|-------------|
| [EF Core Change Tracking](EFCore) | Change tracking and database synchronization |
| [Firebase / Firestore](Firebase) | Real-time database synchronization |

## UI Frameworks

| Comparison | Description |
|------------|-------------|
| [React + TanStack Query](TanStackQuery) | Data fetching and caching for React |
| [LiveView / Phoenix](LiveView) | Server-rendered reactive UIs |
