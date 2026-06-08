---
type: concept
title: "Fusion CommandR (CQRS Pipeline)"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - cqrs
  - commands
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Operations Framework]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion CommandR (CQRS Pipeline)

ActualLab.CommandR is a CQRS-style command handling library that powers Fusion's distributed command execution and multi-host invalidation. The Operations Framework is built on top of it.

## Key Features

- **Unified handler pipeline**: any handler can be a filter (middleware) or final handler
- **CommandContext**: like `HttpContext` for command execution — access state during processing
- **Convention-based handlers**: `[CommandHandler]` attribute instead of implementing interfaces
- **Command services with interceptors**: `[CommandHandler]` methods can only be invoked through `ICommander`
- **RPC integration**: seamless distributed command execution

## Required Package

| Package | Purpose |
|---------|---------|
| `ActualLab.CommandR` | Core: commands, handlers, pipeline, `ICommander` |

Fusion already includes CommandR — you only need the package directly for standalone use.

## Basic Usage

```csharp
// Define a command
public class PrintCommand : ICommand<Unit>
{
    public string Message { get; set; } = "";
}

// Implement handler (interface-based)
public class PrintCommandHandler : ICommandHandler<PrintCommand>
{
    public async Task OnCommand(
        PrintCommand command, CommandContext context, CancellationToken ct)
    {
        Console.WriteLine(command.Message);
    }
}

// Register and execute
var services = new ServiceCollection()
    .AddScoped<PrintCommandHandler>()
    .AddCommander()
    .AddHandlers<PrintCommandHandler>()
    .BuildServiceProvider();

var commander = services.Commander();
await commander.Call(new PrintCommand { Message = "Hello" });
```

Key behaviors:
- `Call()` creates a new `IServiceScope` per command invocation
- Handlers are resolved from that scope
- Use `AddScoped` (not singleton) unless you know what you're doing

## Convention-Based Handlers

No interface needed — any method with `[CommandHandler]` works:

```csharp
public class TodoHandlers
{
    [CommandHandler]
    public virtual async Task OnCreate(
        CreateTodoCommand command, CommandContext context, CancellationToken ct)
    {
        if (Invalidation.IsActive) {
            // Invalidation pass: mark what should be invalidated
            _ = GetAll(default);
            return;
        }
        // Execution pass: do the actual work
        await SaveTodo(command, ct);
    }
}
```

## CommandContext

`CommandContext` provides:
- `Items` — per-execution key-value store for sharing state between handlers/filters
- `Operation` — reference to the current operation (when using Operations Framework)
- `IsInvalidationMode` — whether the handler is running in invalidation-only mode on other hosts

## Handler Pipeline

Handlers form a chain. Any handler can:
1. Do something before the next handler
2. Call `await context.InvokeRemainingHandlers(ct)` to proceed
3. Do something after

This is exactly the middleware pattern — handlers are both filters and final handlers.

## MediatR Comparison

| Concept | MediatR | CommandR |
|---------|---------|----------|
| Command marker | `IRequest<T>` | `ICommand<T>` |
| Dispatcher | `IMediator` | `ICommander` |
| Handler | `IRequestHandler<TReq, TRes>` | `ICommandHandler<T>` or `[CommandHandler]` |
| Pipeline | `IPipelineBehavior<TReq, TRes>` | Handler chain (any handler can filter) |
| Context | No built-in | `CommandContext` |
| Method-level handlers | No | Yes (`[CommandHandler]` methods) |

CommandR also ships a MediatR shim (`PartC-MC.MediatRShim.cs`) for incremental migration.

## Tips

- Commands are records/classes implementing `ICommand<TResult>`
- `ICommand<Unit>` for commands with no return value (void equivalent)
- Each `Call()` creates a fresh scope — handlers can depend on scoped services
- The invalidation pattern: check `Invalidation.IsActive` early, call compute methods to invalidate, return without side effects
