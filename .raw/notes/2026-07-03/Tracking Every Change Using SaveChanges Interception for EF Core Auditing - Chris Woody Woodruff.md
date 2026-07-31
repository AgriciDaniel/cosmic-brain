---
title: "Tracking Every Change: Using SaveChanges Interception for EF Core Auditing - Chris Woody Woodruff"
source: "https://woodruff.dev/tracking-every-change-using-savechanges-interception-for-ef-core-auditing/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-06
created: 2026-07-03
description: "Ever wonder who changed what and when in your database? Or maybe you’ve had that “uh-oh” moment where data was updated, but no one knows how? Good news: EF Core has a built-in way to track changes—without modifying every query manually! SaveChanges Interception lets you hook into EF Core’s SaveChanges() pipeline and log inserts, updates, and deletes automatically."
tags:
  - "clippings"
---
![Tracking Every Change: Using SaveChanges Interception for EF Core Auditing](https://woodruff.dev/wp-content/uploads/2025/02/Tracking-Every-Change-Using-SaveChanges-Interception-for-EF-Core-Auditing-150x150.webp)

Ever wonder **who changed what and when** in your database? Or maybe you’ve had that “uh-oh” moment where **data was updated, but no one knows how**?

**Good news:** EF Core has a built-in way to track changes—without modifying every query manually! **SaveChanges Interception** lets you hook into EF Core’s `SaveChanges()` pipeline and log **inserts, updates, and deletes** automatically.

Let’s dive into how **SaveChanges Interceptors** work, why they’re perfect for **auditing**, and how you can use them to **keep track of every database change** like a detective.

---

## What is SaveChanges Interception?

Interceptors in EF Core **allow you to execute custom logic before or after** `SaveChanges()` or `SaveChangesAsync()`.

Think of it like **a security camera for your database** —whenever data is added, updated, or deleted, you can **log the change, capture metadata, and store audit records**.

---

## Why Use SaveChanges Interceptors for Auditing?

- **Track Who Made the Change** – Capture `UserId` or `IP Address`.
- **Log Old vs. New Values** – Great for debugging or compliance.
- **Enforce Business Rules** – Prevent unwanted updates before they hit the database.
- **Works Automatically** – No need to modify every DbContext call.

---

## How to Implement SaveChanges Interception in EF Core

### Step 1: Create a Custom Interceptor

EF Core provides an interface called `ISaveChangesInterceptor`. We’ll create a class that **logs every change** before saving it.

using System.Threading;

using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore.Diagnostics;

public class AuditInterceptor: SaveChangesInterceptor

{

public override InterceptionResult\<int> SavingChanges(

DbContextEventData eventData, InterceptionResult\<int> result)

{

var context = eventData.Context;

if (context == null) return result;

LogChanges(context);

return result;

}

public override async ValueTask<InterceptionResult\<int>> SavingChangesAsync(

DbContextEventData eventData, InterceptionResult\<int> result,

CancellationToken cancellationToken = default)

{

var context = eventData.Context;

if (context == null) return result;

LogChanges(context);

return await base.SavingChangesAsync(eventData, result, cancellationToken);

}

private void LogChanges(DbContext context)

{

foreach (var entry in context.ChangeTracker.Entries())

{

if (entry.State == EntityState.Added)

{

Console.WriteLine($"\[Audit\] INSERT: {entry.Entity.GetType().Name}");

}

else if (entry.State == EntityState.Modified)

{

Console.WriteLine($"\[Audit\] UPDATE: {entry.Entity.GetType().Name}");

}

else if (entry.State == EntityState.Deleted)

{

Console.WriteLine($"\[Audit\] DELETE: {entry.Entity.GetType().Name}");

}

}

}

}

using System.Threading; using System.Threading.Tasks; using Microsoft.EntityFrameworkCore; using Microsoft.EntityFrameworkCore.Diagnostics; public class AuditInterceptor: SaveChangesInterceptor { public override InterceptionResult\<int> SavingChanges( DbContextEventData eventData, InterceptionResult\<int> result) { var context = eventData.Context; if (context == null) return result; LogChanges(context); return result; } public override async ValueTask<InterceptionResult\<int>> SavingChangesAsync( DbContextEventData eventData, InterceptionResult\<int> result, CancellationToken cancellationToken = default) { var context = eventData.Context; if (context == null) return result; LogChanges(context); return await base.SavingChangesAsync(eventData, result, cancellationToken); } private void LogChanges(DbContext context) { foreach (var entry in context.ChangeTracker.Entries()) { if (entry.State == EntityState.Added) { Console.WriteLine($"\[Audit\] INSERT: {entry.Entity.GetType().Name}"); } else if (entry.State == EntityState.Modified) { Console.WriteLine($"\[Audit\] UPDATE: {entry.Entity.GetType().Name}"); } else if (entry.State == EntityState.Deleted) { Console.WriteLine($"\[Audit\] DELETE: {entry.Entity.GetType().Name}"); } } } }

```js
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

public class AuditInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData, InterceptionResult<int> result)
    {
        var context = eventData.Context;
        if (context == null) return result;

        LogChanges(context);
        return result;
    }

    public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData, InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;
        if (context == null) return result;

        LogChanges(context);
        return await base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void LogChanges(DbContext context)
    {
        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                Console.WriteLine($"[Audit] INSERT: {entry.Entity.GetType().Name}");
            }
            else if (entry.State == EntityState.Modified)
            {
                Console.WriteLine($"[Audit] UPDATE: {entry.Entity.GetType().Name}");
            }
            else if (entry.State == EntityState.Deleted)
            {
                Console.WriteLine($"[Audit] DELETE: {entry.Entity.GetType().Name}");
            }
        }
    }
}
```

**What’s Happening Here?**

- **Intercept `SaveChanges()` and `SaveChangesAsync()`** before the data is written.
- **Loop through tracked entities** to check if they are **Added, Modified, or Deleted**.
- **Log every change** to the console (or later, to a database table).

---

### Step 2: Register the Interceptor in Your DbContext

Once the interceptor is ready, we **register it in the `DbContext` configuration**:

public class AppDbContext: DbContext

{

private readonly AuditInterceptor \_auditInterceptor;

public AppDbContext(DbContextOptions\<AppDbContext> options, AuditInterceptor auditInterceptor)

: base(options)

{

\_auditInterceptor = auditInterceptor;

}

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{

optionsBuilder.AddInterceptors(\_auditInterceptor);

}

}

public class AppDbContext: DbContext { private readonly AuditInterceptor \_auditInterceptor; public AppDbContext(DbContextOptions\<AppDbContext> options, AuditInterceptor auditInterceptor): base(options) { \_auditInterceptor = auditInterceptor; } protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.AddInterceptors(\_auditInterceptor); } }

```js
public class AppDbContext : DbContext
{
    private readonly AuditInterceptor _auditInterceptor;

    public AppDbContext(DbContextOptions<AppDbContext> options, AuditInterceptor auditInterceptor)
        : base(options)
    {
        _auditInterceptor = auditInterceptor;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditInterceptor);
    }
}
```

---

### Step 3: Add the Interceptor to Dependency Injection

Now, register the `AuditInterceptor` in **`Program.cs`** (or `Startup.cs` if using an older.NET version):

services.AddSingleton\<AuditInterceptor>();

services.AddDbContext\<AppDbContext>(options =>

options.UseSqlServer("Your\_Connection\_String"));

services.AddSingleton\<AuditInterceptor>(); services.AddDbContext\<AppDbContext>(options => options.UseSqlServer("Your\_Connection\_String"));

```js
services.AddSingleton<AuditInterceptor>();
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("Your_Connection_String"));
```

**That’s it!** Every call to `SaveChanges()` will now **log all database changes automatically**.

---

## Storing Audit Logs in a Database

Logging changes to the console is great for debugging, but **storing audit logs in the database** is more beneficial for a real-world app.

### 1\. Create an Audit Entity

public class AuditLog

{

public int Id { get; set; }

public string EntityName { get; set; }

public string ChangeType { get; set; }

public string ChangedBy { get; set; }

public DateTime Timestamp { get; set; } = DateTime.UtcNow;

}

public class AuditLog { public int Id { get; set; } public string EntityName { get; set; } public string ChangeType { get; set; } public string ChangedBy { get; set; } public DateTime Timestamp { get; set; } = DateTime.UtcNow; }

```js
public class AuditLog
{
    public int Id { get; set; }
    public string EntityName { get; set; }
    public string ChangeType { get; set; }
    public string ChangedBy { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
```

### 2\. Log Changes to the Audit Table

Modify `LogChanges()` to **save logs to the database**:

private void LogChanges(DbContext context)

{

var auditLogs = new List\<AuditLog>();

foreach (var entry in context.ChangeTracker.Entries())

{

if (entry.State == EntityState.Added || entry.State == EntityState.Modified || entry.State == EntityState.Deleted)

{

auditLogs.Add(new AuditLog

{

EntityName = entry.Entity.GetType().Name,

ChangeType = entry.State.ToString(),

ChangedBy = "SystemUser" // Replace with actual user info

});

}

}

if (auditLogs.Any())

{

context.Set\<AuditLog>().AddRange(auditLogs);

}

}

private void LogChanges(DbContext context) { var auditLogs = new List\<AuditLog>(); foreach (var entry in context.ChangeTracker.Entries()) { if (entry.State == EntityState.Added || entry.State == EntityState.Modified || entry.State == EntityState.Deleted) { auditLogs.Add(new AuditLog { EntityName = entry.Entity.GetType().Name, ChangeType = entry.State.ToString(), ChangedBy = "SystemUser" // Replace with actual user info }); } } if (auditLogs.Any()) { context.Set\<AuditLog>().AddRange(auditLogs); } }

```js
private void LogChanges(DbContext context)
{
    var auditLogs = new List<AuditLog>();

    foreach (var entry in context.ChangeTracker.Entries())
    {
        if (entry.State == EntityState.Added || entry.State == EntityState.Modified || entry.State == EntityState.Deleted)
        {
            auditLogs.Add(new AuditLog
            {
                EntityName = entry.Entity.GetType().Name,
                ChangeType = entry.State.ToString(),
                ChangedBy = "SystemUser" // Replace with actual user info
            });
        }
    }

    if (auditLogs.Any())
    {
        context.Set<AuditLog>().AddRange(auditLogs);
    }
}
```

Now, **every time an entity is added, updated, or deleted**, an audit log is stored in the database.

---

## When to Use SaveChanges Interceptors for Auditing?

- **Security & Compliance** – Track sensitive data changes for **SOX, GDPR, or HIPAA** compliance.
- **Debugging & Troubleshooting** – Know **who changed what** in case of unexpected issues.
- **User Activity Logs** – Monitor app usage by tracking updates to key tables.
- **Soft Deletes** – Instead of hard deleting, **intercept and flag records as inactive**.

---

## Wrap-Up: Keep an Eye on Your Data

SaveChanges Interception is a **powerful, built-in way to track database changes** without modifying every query. Whether you’re logging updates for security, debugging, or compliance, **this technique makes auditing effortless**.

So, next time someone asks, **“Who changed this record?”** —you’ll have the answer.

**How are you handling auditing in your EF Core apps? Let’s discuss in the comments.**

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)