---
type: concept
title: "Fusion Operations Framework"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - distributed
  - cqrs
  - outbox-pattern
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion CommandR]]"
  - "[[Fusion EF Integration]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Operations Framework

The Operations Framework (OF) provides distributed coordination for multi-server Fusion deployments. It solves multi-host cache invalidation, reliable command processing, and guaranteed event delivery.

## The Problem

When a user on Server A updates their profile:
1. Server A writes to the database and invalidates its local cache
2. Servers B and C still have stale cached data
3. Users on B and C see outdated information

Without OF, you'd need: a message queue, retry logic, deduplication, and transaction handling — all built yourself.

## Required Packages

| Package | Purpose |
|---------|---------|
| `ActualLab.Fusion` | Core OF abstractions |
| `ActualLab.Fusion.EntityFramework` | EF Core: `DbOperationScope`, operation logging |
| `ActualLab.Fusion.EntityFramework.Npgsql` | PostgreSQL LISTEN/NOTIFY |
| `ActualLab.Fusion.EntityFramework.Redis` | Redis pub/sub |

## Core Concepts

### Transactional Outbox Pattern

Instead of publishing events directly, write them to an outbox table in the **same database transaction** as your business data. This guarantees at-least-once delivery.

1. **DbOperationScope** wraps your command in a database transaction
2. **DbOperation** entity stores the operation in the same transaction
3. **DbOperationLogReader** (background service) watches for new operations
4. **Operation Log Watchers** provide instant notifications (PostgreSQL NOTIFY, Redis pub/sub, filesystem)
5. **OperationCompletionNotifier** triggers invalidation on all hosts

### Operation

An `Operation` represents a logged, replayable action:
- `Uuid` — unique identifier
- `HostId` — the server that executed it
- `Command` — the command executed
- `Items` — data passed between execution and invalidation phases
- `NestedOperations` — child operations
- `Events` — events produced

### Invalidation Mode

When an operation is "replayed" on other hosts, it runs in **invalidation mode**: the command handler's main logic is skipped, but all invalidation calls (`using (Invalidation.Begin()) { ... }`) execute, marking the correct computed values as outdated on the remote host.

### Transient Operations

Some operations don't need persistence. `InMemoryOperationScope` handles non-persisted operations — useful for in-memory-only commands or testing.

## Operation Scope Types

| Scope | Storage | Use Case |
|-------|---------|----------|
| `DbOperationScope` | Database (outbox) | Production commands with persistence |
| `InMemoryOperationScope` | Memory only | Transient commands, testing |

## Events

Operations can produce events processed asynchronously with guaranteed delivery. Events go through the same outbox → log watcher → processing pipeline as operations themselves.

## Log Watchers

| Watcher | Transport | Best For |
|---------|-----------|----------|
| `NpgsqlOperationLogWatcher` | PostgreSQL NOTIFY | PostgreSQL deployments |
| `RedisOperationLogWatcher` | Redis pub/sub | Multi-DB, cross-platform |
| `FileSystemOperationLogWatcher` | Shared filesystem | Simple setups, dev |

## Reprocessing

Failed operations with transient errors can be automatically retried. `OperationReprocessor` re-queues operations that failed due to temporary issues (network blips, deadlocks, timeouts).

## Registration

```csharp
services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        operations.ConfigureOperationLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.05),
        });
        operations.AddNpgsqlOperationLogWatcher(); // or Redis, FileSystem
    });
});
```
