---
address: c-302
type: source
title: "Unlocking EF Core Performance: How to Track Queries with Event Counters"
source_url: "https://woodruff.dev/unlocking-ef-core-performance-how-to-track-queries-with-event-counters/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-08
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - performance
  - diagnostics
status: current
related:
  - "[[Chris Woodruff]]"
  - "[[EF Core Event Counters]]"
  - "[[EF Core No-Tracking Queries]]"
---

# Unlocking EF Core Performance: How to Track Queries with Event Counters

Navigation: [[index]] | [[sources/_index|Sources]]

## Metadata

- **Author:** [[Chris Woodruff]] ("Woody")
- **Published:** 2025-02-08
- **Source:** [woodruff.dev](https://woodruff.dev/unlocking-ef-core-performance-how-to-track-queries-with-event-counters/)
- **Type:** blog tutorial (part of a January-February 2025 EF Core series)

## Summary

Short tutorial introducing .NET's built-in **EventCounters** diagnostic mechanism as a zero-third-party-tool way to monitor EF Core performance in real time. Covers enabling counters via the `dotnet-counters` CLI tool, reading the counter output (active DbContexts, queries executed, execution time, connection pool usage, cache hits), and capturing the same data programmatically in-process via a custom `EventListener`. Closes with a short action list mapping each counter to a concrete optimization response.

## Key Points

- **What Event Counters track:** query execution time, command execution count, connection pooling metrics, cache hits/misses — all exposed by the `Microsoft.EntityFrameworkCore` `EventSource` without adding any third-party APM tooling.
- **CLI workflow:** run the app (`dotnet run`), then in a second terminal attach with `dotnet-counters monitor --providers Microsoft.EntityFrameworkCore` to get a live-refreshing table of `active-dbcontexts`, `queries-executed`, `execution-time (ms)`, `connection-pool-in-use`, and `cache-hits`.
- **In-process capture:** subclass `System.Diagnostics.Tracing.EventListener`, override `OnEventSourceCreated` to call `EnableEvents(eventSource, EventLevel.Informational, EventKeywords.All)` when `eventSource.Name == "Microsoft.EntityFrameworkCore"`, and override `OnEventWritten` to log `eventData.EventName` + `eventData.Payload`. Instantiate the listener once (e.g., in `Program.cs`) to start logging automatically.
- **Turning counters into action:**
  - High execution time → review LINQ queries/indexes; use `.AsNoTracking()` for read-only queries.
  - High queries-executed rate → look for redundant calls; consider compiled queries for hot-path queries.
  - Rising active-DbContexts → possible memory leak; use `IDbContextFactory<TContext>` for thread-safe DbContext management.
  - Connection pool consistently maxed → increase pool size in `DbContextOptions`.

## Code Samples

**CLI monitor command:**
```
dotnet-counters monitor --providers Microsoft.EntityFrameworkCore
```

**Custom EventListener:**
```csharp
using System;
using System.Diagnostics.Tracing;

public class EfCoreEventListener : EventListener
{
    protected override void OnEventSourceCreated(EventSource eventSource)
    {
        if (eventSource.Name == "Microsoft.EntityFrameworkCore")
        {
            EnableEvents(eventSource, EventLevel.Informational, EventKeywords.All);
        }
    }

    protected override void OnEventWritten(EventWrittenEventArgs eventData)
    {
        Console.WriteLine($"[EF Core Event] {eventData.EventName}: {string.Join(", ", eventData.Payload ?? new object[0])}");
    }
}
```

## Relevance

Practical companion to the vault's existing SQL Server performance-tuning material ([[SQL Server Performance Monitoring Tools]], [[SQL Server Wait Statistics]]) but at the application/ORM layer rather than the database engine layer — EventCounters is the .NET-native analog to server-side wait-stat and DMV monitoring for an EF Core-backed app. Also reinforces `.AsNoTracking()` guidance already captured in [[EF Core No-Tracking Queries]] (from the same author's series) as a fix for high query-execution-time counters.

## See Also

- [[EF Core Event Counters]] — concept page
- [[Chris Woodruff]] — author entity
- [[EF Core No-Tracking Queries]]
- [[SQL Server Performance Monitoring Tools]]
