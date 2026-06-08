# CommandR: Diagrams

Diagrams for the CommandR concepts introduced in [Part 4](PartC.md).


## Command Handler Pipeline

<img src="/img/diagrams/PartC-D-1.svg" alt="Command Handler Pipeline" style="width: 100%; max-width: 800px;" />

| Handler | Priority | Type | Purpose |
|---------|----------|------|---------|
| `PreparedCommandHandler` | 1,000,000,000 | Filter | Calls `IPreparedCommand.Prepare()` if implemented |
| `CommandTracer` | 998,000,000 | Filter | Creates Activity for tracing, logs errors |
| `LocalCommandRunner` | 900,000,000 | Filter | Runs `ILocalCommand.Run()` if implemented |
| `RpcCommandHandler` | 800,000,000 | Filter | Routes to RPC if command should be handled remotely |
| `OperationReprocessor` | 100,000 | Filter | Operations Framework |
| `NestedOperationLogger` | 11,000 | Filter | Operations Framework |
| `OperationScopeProvider` | 10,000 | Filter | Operations Framework |
| `DbOperationScopeProvider` | 1,000 | Filter | Operations Framework |
| Your Handler | 0 | Final | Your business logic |


## CommandContext Hierarchy for Nested Commands

<img src="/img/diagrams/PartC-D-2.svg" alt="CommandContext Hierarchy for Nested Commands" style="width: 100%; max-width: 800px;" />

| Property | Behavior |
|----------|----------|
| `ServiceScope` | Shared across all nested contexts (same `ICommander`) |
| `Items` | Each context has its own dictionary |
| `OutermostContext` | Always points to the root context |
| Data sharing | Use `context.OutermostContext.Items` to share across contexts |


## IOutermostCommand Behavior

<img src="/img/diagrams/PartC-D-3.svg" alt="IOutermostCommand Behavior" style="width: 100%; max-width: 800px;" />

### IDelegatingCommand Behavior

<img src="/img/diagrams/PartC-D-4.svg" alt="IDelegatingCommand Behavior" style="width: 100%; max-width: 800px;" />

**Code in `CommandContext.New()`:**
```csharp
if (!isOutermost && (command is IOutermostCommand ||
                     Current?.UntypedCommand is IDelegatingCommand))
    isOutermost = true;
```


## IEventCommand Parallel Execution

<img src="/img/diagrams/PartC-D-5.svg" alt="IEventCommand Parallel Execution" style="width: 100%; max-width: 800px;" />

| Scenario | Behavior |
|----------|----------|
| `ChainId` is empty | `RunEvent()` builds chains, clones command for each, runs in parallel |
| `ChainId` is set | Goes through `RunCommand()`, executes only that specific handler chain |

**ChainId format:** `{ServiceType.GetName()}.{Method.Name}`


## ISessionCommand Processing (RpcDefaultSessionReplacer)

<img src="/img/diagrams/PartC-D-6.svg" alt="ISessionCommand Processing (RpcDefaultSessionReplacer)" style="width: 100%; max-width: 800px;" />

### RpcDefaultSessionReplacer Logic

| Step | Action |
|------|--------|
| 1 | Check if first param is `ISessionCommand` |
| 2 | Get `SessionBoundRpcConnection` from peer |
| 3 | If `session.IsDefault()`: `command.SetSession(connection.Session)` |
| 4 | Else: `session.RequireValid()` |

### Session Resolution Flow

<img src="/img/diagrams/PartC-D-7.svg" alt="Session Resolution Flow" style="width: 100%; max-width: 800px;" />


## Handler Registration and Resolution

### Registration (at startup)

<img src="/img/diagrams/PartC-D-8.svg" alt="Registration (at startup)" style="width: 100%; max-width: 800px;" />

### Resolution (at runtime)

<img src="/img/diagrams/PartC-D-9.svg" alt="Resolution (at runtime)" style="width: 100%; max-width: 800px;" />

| Index | Handler | Priority | Type |
|-------|---------|----------|------|
| [0] | `PreparedCommandHandler` | 1,000,000,000 | Filter |
| [1] | `CommandTracer` | 998,000,000 | Filter |
| [2] | `LocalCommandRunner` | 900,000,000 | Filter |
| [3] | `RpcCommandHandler` | 800,000,000 | Filter |
| [4] | `OperationReprocessor` | 100,000 | Filter |
| [5] | `NestedOperationLogger` | 11,000 | Filter |
| [6] | `InMemoryOperationScope` | 10,000 | Filter |
| [7] | `DbOperationScopeProvider` | 1,000 | Filter |
| [8] | `YourHandler` | 0 | Final |


## Command Service Proxy (AOP)

<img src="/img/diagrams/PartC-D-10.svg" alt="Command Service Proxy (AOP)" style="width: 100%; max-width: 800px;" />

| Call Style | Result |
|------------|--------|
| `commander.Call(new CreateOrderCommand(...), ct)` | Full pipeline |
| `orderService.CreateOrder(new CreateOrderCommand(...), ct)` | Full pipeline (via proxy) |

Both paths go through: `PreparedCommandHandler` → `CommandTracer` → ... → `Handler`
