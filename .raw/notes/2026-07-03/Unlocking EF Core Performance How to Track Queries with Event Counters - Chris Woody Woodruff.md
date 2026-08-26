---
title: "Unlocking EF Core Performance: How to Track Queries with Event Counters - Chris Woody Woodruff"
source: "https://woodruff.dev/unlocking-ef-core-performance-how-to-track-queries-with-event-counters/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-08
created: 2026-07-03
description: "If you've ever wondered why your EF Core queries feel sluggish or why your database is working overtime, you're not alone. Performance issues can creep in quietly, and before you know it, your app is struggling to keep up. Wouldn’t it be great if EF Core had built-in performance tracking so you could monitor database activity in real time? Good news—it does!"
tags:
  - "clippings"
---
![Unlocking EF Core Performance: How to Track Queries with Event Counters](https://woodruff.dev/wp-content/uploads/2025/02/Unlocking-EF-Core-Performance-How-to-Track-Queries-with-Event-Counters-150x150.webp)

If you’ve ever wondered **why your EF Core queries feel sluggish** or why your database is working overtime, you’re not alone. Performance issues can creep in quietly, and before you know it, your app is struggling to keep up.

Wouldn’t it be great if **EF Core had built-in performance tracking** so you could monitor database activity in real time? Good news—it does!

Enter **Event Counters** —a built-in way to measure EF Core performance **without third-party tools**. Let’s dive into **how Event Counters work, what they track, and how you can use them to optimize your database interactions.**

---

## What Are Event Counters in EF Core?

Event Counters are **lightweight, built-in telemetry tools** that help you track EF Core’s behavior, including:

- **Query Execution Time** – See how long queries take to complete.
- **Command Execution Count** – Track the number of database calls.
- **Connection Pooling Metrics** – Check how efficiently connections are being used.
- **Cache Hits & Misses** – Understand how EF Core is optimizing query results.

Instead of guessing why your EF Core performance is slow, **Event Counters give you real data** to analyze.

---

## How to Enable Event Counters for EF Core

Event Counters are part of **.NET’s diagnostic tools**, making them easy to enable with **dotnet-counters**.

### Step 1: Start Your Application

Run your EF Core app as you normally would:

dotnet run

dotnet run

```js
dotnet run
```

### Step 2: Attach dotnet-counters

In another terminal, run:

dotnet-counters monitor --providers Microsoft.EntityFrameworkCore

dotnet-counters monitor --providers Microsoft.EntityFrameworkCore

```js
dotnet-counters monitor --providers Microsoft.EntityFrameworkCore
```

Now you’re **watching real-time EF Core performance metrics**.

### Sample Output

\[Microsoft.EntityFrameworkCore\]

active-dbcontexts 5

queries-executed 120

execution-time (ms) 15

connection-pool-in-use 3

cache-hits 90

\[Microsoft.EntityFrameworkCore\] active-dbcontexts 5 queries-executed 120 execution-time (ms) 15 connection-pool-in-use 3 cache-hits 90

```js
[Microsoft.EntityFrameworkCore]
    active-dbcontexts                        5
    queries-executed                         120
    execution-time (ms)                      15
    connection-pool-in-use                   3
    cache-hits                               90
```

Here’s what this means:

- **Active DbContexts:** How many instances of `DbContext` are currently in use.
- **Queries Executed:** The total number of queries since the app started.
- **Execution Time (ms):** The average time per query.
- **Connection Pool In Use:** How many connections are currently active.
- **Cache Hits:** How often EF Core finds a cached result instead of querying the database.

---

## Using Event Counters in Code

Want to **log these metrics in your app** instead of running them from the terminal? You can capture event counters programmatically using **EventListener**.

### Step 1: Create a Custom Event Listener

Add this class to your project:

using System;

using System.Diagnostics.Tracing;

public class EfCoreEventListener: EventListener

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

Console.WriteLine($"\[EF Core Event\] {eventData.EventName}: {string.Join(", ", eventData.Payload?? new object\[0\])}");

}

}

using System; using System.Diagnostics.Tracing; public class EfCoreEventListener: EventListener { protected override void OnEventSourceCreated(EventSource eventSource) { if (eventSource.Name == "Microsoft.EntityFrameworkCore") { EnableEvents(eventSource, EventLevel.Informational, EventKeywords.All); } } protected override void OnEventWritten(EventWrittenEventArgs eventData) { Console.WriteLine($"\[EF Core Event\] {eventData.EventName}: {string.Join(", ", eventData.Payload?? new object\[0\])}"); } }

```js
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

### Step 2: Enable the Listener in Your App

Modify your `Program.cs` or `Startup.cs` file:

var listener = new EfCoreEventListener();

var listener = new EfCoreEventListener();

```js
var listener = new EfCoreEventListener();
```

Now, EF Core **automatically logs event data** in your application console.

---

## How to Use Event Counters to Improve Performance

Now that you’re collecting data, let’s **turn insights into action**.

### 1\. Identify Slow Queries

- If **execution time is high**, check your LINQ queries and indexes.
- Use `.AsNoTracking()` for read-only queries.

### 2\. Reduce Unnecessary Queries

- If **queries executed per second is high**, check if your app is making redundant calls.
- Consider using **compiled queries** for frequently executed queries.

### 3\. Optimize DbContext Usage

- If **active DbContexts** keep increasing, you might have a **memory leak**.
- Use `IDbContextFactory<TContext>` for thread-safe DbContext management.

### 4\. Improve Connection Pooling

- If **connection pool in use is consistently maxed out**, consider increasing pool size in your `DbContextOptions`.

---

## Wrap-Up: Make EF Core Work Smarter, Not Harder

With **Event Counters**, you don’t have to guess why EF Core is slow—you can **see the numbers** and make data-driven optimizations.

So, fire up `dotnet-counters`, start tracking your queries, and **make EF Core work for you**. Your database (and your users) will thank you!

Have you used **Event Counters** in EF Core yet? Let’s talk in the comments!

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)