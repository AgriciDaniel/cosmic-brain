---
type: concept
title: "Elsa Workers"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - workers
  - concurrency
  - optimization
  - performance
status: developing
address: c-000093
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Architecture]]"
  - "[[Elsa Distributed Hosting]]"
  - "[[Elsa Retention]]"
---

# Elsa Workers

The Worker Count configuration controls the degree of concurrency within the Elsa workflow engine. It determines how many parallel operations are used for dispatching commands, processing jobs, and handling notifications.

---

## Configuration

Override the `MediatorOptions` in `Program.cs`:

```csharp
builder.Services.Configure<MediatorOptions>(opt =>
{
    opt.CommandWorkerCount = 16;
    opt.JobWorkerCount = 16;
    opt.NotificationWorkerCount = 16;
});
```

### Worker Types

| Setting | Controls | Default |
|---------|----------|---------|
| `CommandWorkerCount` | Parallel command processing (e.g., workflow dispatch) | 1 |
| `JobWorkerCount` | Parallel background job execution | 1 |
| `NotificationWorkerCount` | Parallel notification handling | 1 |

---

## When to Adjust

- **High throughput scenarios**: Increase worker counts to process more workflows concurrently (e.g., 8-16 per CPU core).
- **I/O-bound workflows**: Higher job worker counts can improve throughput since workers spend time waiting on I/O.
- **Resource-constrained environments**: Lower worker counts to prevent CPU saturation or database connection pool exhaustion.

> [!info]
> Workers interact with the [[Elsa Architecture | workflow dispatcher]] and [[Elsa Distributed Hosting | distributed runtime]]. In a multi-node deployment, workers on each node contribute to the total throughput. Worker counts should be tuned alongside distributed locking configuration to avoid contention.
