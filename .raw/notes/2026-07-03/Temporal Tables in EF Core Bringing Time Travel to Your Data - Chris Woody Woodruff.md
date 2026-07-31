---
title: "Temporal Tables in EF Core: Bringing Time Travel to Your Data - Chris Woody Woodruff"
source: "https://woodruff.dev/temporal-tables-in-ef-core-bringing-time-travel-to-your-data/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-15
created: 2026-07-03
description: "What if you could go back in time and see exactly what your database looked like yesterday, last week, or even last year? Sounds like something out of a sci-fi movie, right? Well, Temporal Tables in SQL Server let you do exactly that!"
tags:
  - "clippings"
---
![Temporal Tables in EF Core: Bringing Time Travel to Your Data](https://woodruff.dev/wp-content/uploads/2025/02/Temporal-Tables-in-EF-Core-Bringing-Time-Travel-to-Your-Data-150x150.webp)

What if you could go **back in time** and see exactly what your database looked like **yesterday, last week, or even last year**? Sounds like something out of a sci-fi movie, right?

Well, **Temporal Tables** in SQL Server let you **do exactly that**! They enable **automatic historical tracking** of data changes, so you can:

**Recover lost data** – Bring back deleted or modified records.  
**Audit changes** – Know who changed what and when.  
**Analyze trends over time** – Understand how your data evolved.

And the best part? **Entity Framework Core (EF Core) fully supports Temporal Tables**, making it easy to integrate **time-traveling queries** into your application!

Let’s explore how **Temporal Tables work, how to set them up in EF Core, and how you can query past data with ease.**

---

## What Are Temporal Tables?

A **Temporal Table** is a **special table in SQL Server** that automatically keeps track of **all changes** to your data. Instead of just storing the **current state** of your records, it also maintains a **history of changes**, allowing you to query previous versions of your data.

When a record is **inserted, updated, or deleted**, SQL Server:

- **Keeps the current data in the main table.**
- **Moves older versions into a history table.**

This means you can **query data from any point in time**, making **auditing, debugging, and recovery much easier**.

---

## Step 1: Creating a Temporal Table in EF Core

First, let’s create an entity that **uses a Temporal Table** in EF Core.

### 1\. Define the Entity Model

public class Employee

{

public int Id { get; set; }

public string Name { get; set; }

public string Position { get; set; }

public decimal Salary { get; set; }

}

public class Employee { public int Id { get; set; } public string Name { get; set; } public string Position { get; set; } public decimal Salary { get; set; } }

```js
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public decimal Salary { get; set; }
}
```

### 2\. Configure Temporal Table in OnModelCreating

Now, we tell EF Core **to enable temporal table support**:

protected override void OnModelCreating(ModelBuilder modelBuilder)

{

modelBuilder.Entity\<Employee>()

.ToTable("Employees", tb => tb.IsTemporal());

}

protected override void OnModelCreating(ModelBuilder modelBuilder) { modelBuilder.Entity\<Employee>().ToTable("Employees", tb => tb.IsTemporal()); }

```js
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Employee>()
        .ToTable("Employees", tb => tb.IsTemporal());
}
```

**That’s it!** EF Core will now create a **temporal table** for `Employees` when you run migrations.

---

## Step 2: Applying Temporal Tables to the Database

After adding the configuration, run:

dotnet ef migrations add AddTemporalTables

dotnet ef database update

dotnet ef migrations add AddTemporalTables dotnet ef database update

```js
dotnet ef migrations add AddTemporalTables
dotnet ef database update
```

**EF Core will generate the following SQL:**

CREATE TABLE Employees (

Id INT PRIMARY KEY IDENTITY,

Name NVARCHAR(100),

Position NVARCHAR(100),

Salary DECIMAL(18,2),

SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,

SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,

PERIOD FOR SYSTEM\_TIME (SysStartTime, SysEndTime)

)

WITH (SYSTEM\_VERSIONING = ON (HISTORY\_TABLE = dbo.EmployeesHistory));

CREATE TABLE Employees ( Id INT PRIMARY KEY IDENTITY, Name NVARCHAR(100), Position NVARCHAR(100), Salary DECIMAL(18,2), SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL, SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL, PERIOD FOR SYSTEM\_TIME (SysStartTime, SysEndTime) ) WITH (SYSTEM\_VERSIONING = ON (HISTORY\_TABLE = dbo.EmployeesHistory));

```js
CREATE TABLE Employees (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Position NVARCHAR(100),
    Salary DECIMAL(18,2),
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
    SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.EmployeesHistory));
```

**SQL Server automatically:**

- Adds **`SysStartTime` and `SysEndTime`** columns to track changes.
- Creates an **EmployeesHistory** table to store old versions of records.
- Enables **SYSTEM\_VERSIONING** to **automatically track changes**.

No need to manually update history records— **SQL Server handles it for you!**

---

## Step 3: Querying Past Data in EF Core

Now for the fun part— **retrieving historical data!**

### 1\. Getting the Current Data

var employees = await context.Employees.ToListAsync();

var employees = await context.Employees.ToListAsync();

```js
var employees = await context.Employees.ToListAsync();
```

This **only returns the latest records** (normal behavior).

---

### 2\. Querying Historical Data

Want to see **all past versions** of a record? Use `.TemporalAll()`:

var allVersions = await context.Employees.TemporalAll()

.Where(e => e.Id == 1)

.ToListAsync();

var allVersions = await context.Employees.TemporalAll().Where(e => e.Id == 1).ToListAsync();

```js
var allVersions = await context.Employees.TemporalAll()
    .Where(e => e.Id == 1)
    .ToListAsync();
```

**This pulls data from both the main table AND the history table!**

---

### 3\. Querying Data from a Specific Time

Want to see what your database looked like **last week**? Use `.TemporalAsOf(DateTime)`:

var lastWeekData = await context.Employees

.TemporalAsOf(DateTime.UtcNow.AddDays(-7))

.ToListAsync();

var lastWeekData = await context.Employees.TemporalAsOf(DateTime.UtcNow.AddDays(-7)).ToListAsync();

```js
var lastWeekData = await context.Employees
    .TemporalAsOf(DateTime.UtcNow.AddDays(-7))
    .ToListAsync();
```

**Time-traveling to last week’s database state!**

---

### 4\. Seeing Changes Over a Time Range

Need to **track how an employee’s salary changed over time**? Use `.TemporalBetween(start, end)`:

var salaryChanges = await context.Employees

.TemporalBetween(DateTime.UtcNow.AddMonths(-3), DateTime.UtcNow)

.Where(e => e.Name == "Alice")

.ToListAsync();

var salaryChanges = await context.Employees.TemporalBetween(DateTime.UtcNow.AddMonths(-3), DateTime.UtcNow).Where(e => e.Name == "Alice").ToListAsync();

```js
var salaryChanges = await context.Employees
    .TemporalBetween(DateTime.UtcNow.AddMonths(-3), DateTime.UtcNow)
    .Where(e => e.Name == "Alice")
    .ToListAsync();
```

**Perfect for analyzing trends, auditing, and debugging!**

---

## When Should You Use Temporal Tables?

**Auditing & Compliance** – Track **who changed what** and **when**.  
**Data Recovery** – Accidentally deleted data? **Retrieve it from history!**  
**Debugging & Troubleshooting** – Investigate **unexpected changes** in your data.  
**Business Intelligence & Trend Analysis** – See **how values changed over time**.

---

## Things to Keep in Mind

**Storage Impact** – Since history tables store every change, large tables **can grow quickly**.  
**Read-Only History** – You **cannot modify or delete** history records directly.  
**Only in SQL Server** – Temporal Tables are **not available** in PostgreSQL, MySQL, or SQLite.

---

## Wrap-Up: Let Your Database Remember Everything!

Temporal Tables in EF Core **bring time-traveling capabilities to your data**, letting you **see the past, analyze trends, and recover lost records effortlessly**.

**With Temporal Tables, you can:**

- Query past versions of records.
- Retrieve deleted or modified data.
- Easily audit database changes.

Next time you need **historical tracking** in your EF Core app, **consider using Temporal Tables**!

**Are you using Temporal Tables in your projects? Let’s discuss in the comments!**

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)