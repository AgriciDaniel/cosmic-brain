---
title: "Keyless Entity Types in EF Core: Query Data Without Primary Keys - Chris Woody Woodruff"
source: "https://woodruff.dev/keyless-entity-types-in-ef-core-query-data-without-primary-keys/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-13
created: 2026-07-03
description: "Not everything in your database needs a primary key. Sometimes, you just want to query views, stored procedures, or raw SQL results without forcing a unique identifier on them. That’s where Keyless Entity Types in EF Core come in! If you’ve ever struggled with querying database views, reports, or read-only datasets, this feature is exactly what you need. Let’s dive into what Keyless Entity Types are, when to use them, and how to make them work in EF Core."
tags:
  - "clippings"
---
![Keyless Entity Types in EF Core: Query Data Without Primary Keys](https://woodruff.dev/wp-content/uploads/2025/02/Keyless-Entity-Types-in-EF-Core-Query-Data-Without-Primary-Keys-1-150x150.webp)

Not everything in your database needs a **primary key**. Sometimes, you just want to query **views, stored procedures, or raw SQL results** without forcing a unique identifier on them. That’s where **Keyless Entity Types** in Entity Framework Core come in!

If you’ve ever struggled with querying **database views, reports, or read-only datasets**, this feature is **exactly what you need**. Let’s dive into what **Keyless Entity Types** are, when to use them, and how to make them work in EF Core.

---

## What Are Keyless Entity Types?

In EF Core, a **Keyless Entity Type** is an entity that **does not require a primary key**. Unlike standard EF Core entities that map to tables with primary keys, keyless entities are ideal for **queries that don’t need identity tracking** —such as reports, read-only views, or raw SQL queries.

### Key Features of Keyless Entity Types:

**No primary key required** – Useful for queries that don’t need a unique identifier.  
**Maps to database views, stored procedures, or raw SQL** – Ideal for reporting and read-only datasets.  
**Cannot be updated** – These entities are **read-only** in EF Core, preventing accidental modifications.

---

## When Should You Use Keyless Entity Types?

**Database Views** – If you have a **SQL view** that aggregates data across multiple tables, EF Core can query it **without requiring a primary key**.

**Stored Procedure Results** – If your app **executes a stored procedure** and expects complex results, Keyless Entity Types help map the output.

**Raw SQL Queries** – When you need **custom SQL results** that don’t neatly fit into a single table structure.

**Read-Only Reports** – If you’re generating reports that don’t modify data, Keyless Entity Types are **perfect for performance-friendly queries**.

---

## How to Define a Keyless Entity Type in EF Core

Let’s say you have a **database view** that provides a summary of order details, but it doesn’t have a primary key. Here’s how you’d map it in EF Core.

### 1\. Define the Keyless Entity

public class OrderSummary

{

public int OrderId { get; set; }

public string CustomerName { get; set; }

public DateTime OrderDate { get; set; }

public decimal TotalAmount { get; set; }

}

public class OrderSummary { public int OrderId { get; set; } public string CustomerName { get; set; } public DateTime OrderDate { get; set; } public decimal TotalAmount { get; set; } }

```js
public class OrderSummary
{
    public int OrderId { get; set; }
    public string CustomerName { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
}
```

### 2\. Configure it in DbContext

public class AppDbContext: DbContext

{

public DbSet\<OrderSummary> OrderSummaries { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)

{

modelBuilder.Entity\<OrderSummary>()

.HasNoKey() // This makes it a Keyless Entity Type

.ToView("View\_OrderSummary"); // Maps it to the SQL view

}

}

public class AppDbContext: DbContext { public DbSet\<OrderSummary> OrderSummaries { get; set; } protected override void OnModelCreating(ModelBuilder modelBuilder) { modelBuilder.Entity\<OrderSummary>().HasNoKey() // This makes it a Keyless Entity Type.ToView("View\_OrderSummary"); // Maps it to the SQL view } }

```js
public class AppDbContext : DbContext
{
    public DbSet<OrderSummary> OrderSummaries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderSummary>()
            .HasNoKey() // This makes it a Keyless Entity Type
            .ToView("View_OrderSummary"); // Maps it to the SQL view
    }
}
```

### 3\. Querying the Keyless Entity

Since **Keyless Entity Types are read-only**, you can only **query them**, not insert, update, or delete.

var summaries = await context.OrderSummaries.ToListAsync();

foreach (var summary in summaries)

{

Console.WriteLine($"Order {summary.OrderId} - {summary.CustomerName} - ${summary.TotalAmount}");

}

var summaries = await context.OrderSummaries.ToListAsync(); foreach (var summary in summaries) { Console.WriteLine($"Order {summary.OrderId} - {summary.CustomerName} - ${summary.TotalAmount}"); }

```js
var summaries = await context.OrderSummaries.ToListAsync();

foreach (var summary in summaries)
{
    Console.WriteLine($"Order {summary.OrderId} - {summary.CustomerName} - ${summary.TotalAmount}");
}
```

---

## Using Keyless Entities with Raw SQL Queries

Sometimes, you might need **custom SQL queries** instead of mapping to a database view. EF Core allows keyless entities to work with **raw SQL queries** using `FromSqlRaw()`.

### 1\. Define the Keyless Entity

public class ProductSales

{

public string ProductName { get; set; }

public int UnitsSold { get; set; }

}

public class ProductSales { public string ProductName { get; set; } public int UnitsSold { get; set; } }

```js
public class ProductSales
{
    public string ProductName { get; set; }
    public int UnitsSold { get; set; }
}
```

### 2\. Configure It in DbContext

public class AppDbContext: DbContext

{

public DbSet\<ProductSales> ProductSalesReports { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)

{

modelBuilder.Entity\<ProductSales>().HasNoKey();

}

}

public class AppDbContext: DbContext { public DbSet\<ProductSales> ProductSalesReports { get; set; } protected override void OnModelCreating(ModelBuilder modelBuilder) { modelBuilder.Entity\<ProductSales>().HasNoKey(); } }

```js
public class AppDbContext : DbContext
{
    public DbSet<ProductSales> ProductSalesReports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductSales>().HasNoKey();
    }
}
```

### 3\. Execute a Raw SQL Query

var salesReport = await context.ProductSalesReports

.FromSqlRaw("SELECT ProductName, SUM(Quantity) AS UnitsSold FROM Sales GROUP BY ProductName")

.ToListAsync();

foreach (var sales in salesReport)

{

Console.WriteLine($"{sales.ProductName}: {sales.UnitsSold} units sold");

}

var salesReport = await context.ProductSalesReports.FromSqlRaw("SELECT ProductName, SUM(Quantity) AS UnitsSold FROM Sales GROUP BY ProductName").ToListAsync(); foreach (var sales in salesReport) { Console.WriteLine($"{sales.ProductName}: {sales.UnitsSold} units sold"); }

```js
var salesReport = await context.ProductSalesReports
    .FromSqlRaw("SELECT ProductName, SUM(Quantity) AS UnitsSold FROM Sales GROUP BY ProductName")
    .ToListAsync();

foreach (var sales in salesReport)
{
    Console.WriteLine($"{sales.ProductName}: {sales.UnitsSold} units sold");
}
```

**This lets you run custom SQL queries directly in EF Core while maintaining type safety!**

---

## Things to Keep in Mind

**Keyless Entity Types are Read-Only** – You **cannot** use them with `Add()`, `Update()`, or `Remove()`.

**No Change Tracking** – EF Core **doesn’t track keyless entities**, so you can’t modify them in-memory and expect EF Core to persist changes.

**Must Be Configured in `OnModelCreating()`** – Unlike regular entities, keyless types **must** be explicitly mapped in `OnModelCreating()`.

---

## Wrap-Up: When You Need Data Without the Keys

Keyless Entity Types are a **powerful feature** in EF Core that lets you **query data from views, stored procedures, and raw SQL queries** without worrying about primary keys. They’re **perfect for reporting, analytics, and read-only scenarios** where identity tracking isn’t needed.

So, next time you need to **query data that doesn’t fit neatly into an EF Core entity**, remember: **You don’t always need a key!**

Are you using **Keyless Entity Types** in your EF Core projects? Let’s discuss in the comments!

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)