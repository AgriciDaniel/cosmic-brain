---
title: "FromSql: Writing SQL Like a Boss in EF Core - Chris Woody Woodruff"
source: "https://woodruff.dev/fromsql-writing-sql-like-a-boss-in-ef-core/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-27
created: 2026-07-03
description: "So, you’ve embraced Entity Framework Core, and life’s been good. No more handcrafting SQL for every little query. But what happens when EF Core’s LINQ magic isn’t entirely cutting it? Maybe you need something specific, like a stored procedure or a complex SQL query that LINQ doesn’t handle elegantly. That’s where FromSql swoops in to save the day."
tags:
  - "clippings"
---
![](https://woodruff.dev/wp-content/uploads/2025/01/FromSql-Writing-SQL-Like-a-Boss-in-EF-Core-150x150.png)

So, you’ve embraced Entity Framework Core, and life’s been good. No more handcrafting SQL for every little query. But what happens when EF Core’s LINQ magic isn’t entirely cutting it? Maybe you need something specific, like a stored procedure or a complex SQL query that LINQ doesn’t handle elegantly. That’s where **FromSql** swoops in to save the day.

FromSql lets you drop raw SQL into your EF Core queries and still reap the benefits of a strong ORM. It’s like having your cake (SQL) and eating it too (EF Core). Let’s dive into how this works and why it’s incredible.

---

## What is FromSql?

In a nutshell, `FromSql` allows you to run raw SQL queries directly within your EF Core context. It’s perfect for those moments when:

- You need a highly optimized query that EF Core can’t generate efficiently.
- You’re working with legacy databases where specific SQL is a must.
- You miss writing good ol’ SQL because it makes you feel like a database wizard.

Here’s a quick example:

var city = "Redmond";

var customers = context.Customers

.FromSql($"SELECT \* FROM Customers WHERE City = {city}")

.ToList();

var city = "Redmond"; var customers = context.Customers.FromSql($"SELECT \* FROM Customers WHERE City = {city}").ToList();

```js
var city = "Redmond";
var customers = context.Customers
    .FromSql($"SELECT * FROM Customers WHERE City = {city}")
    .ToList();
```

Boom. Straight SQL, fully supported in EF Core.

---

## Why Use FromSql?

EF Core’s LINQ-to-SQL translation sometimes feels like taking the scenic route when you only want a shortcut. With `FromSql`, you control the exact SQL that’s executed, meaning you can:

- Optimize for performance by crafting precise SQL.
- Leverage SQL features that EF Core doesn’t fully support.
- Impress your team with your epic SQL skills.

---

### The Basics of FromSql

Using `FromSql` is as easy as pie. Here’s how you can get started:

### Basic Query

Run a raw SQL query directly:

var customers = context.Customers

.FromSql("SELECT \* FROM Customers").ToList();

var customers = context.Customers.FromSql("SELECT \* FROM Customers").ToList();

```js
var customers = context.Customers
    .FromSql("SELECT * FROM Customers") .ToList();
```

### Parameterized Queries

Always use parameters to avoid SQL injection. EF Core makes this simple:

var city = "Seattle";

var customers = context.Customers

.FromSql($"SELECT \* FROM Customers WHERE City = {city}")

.ToList();

var city = "Seattle"; var customers = context.Customers.FromSql($"SELECT \* FROM Customers WHERE City = {city}").ToList();

```js
var city = "Seattle";
var customers = context.Customers
    .FromSql($"SELECT * FROM Customers WHERE City = {city}")
    .ToList();
```

EF Core will automatically handle parameterization, so you can write safe and secure queries without breaking a sweat.

---

## Tips for Writing Optimized SQL

When using `FromSql`, you’re back in the driver’s seat for SQL optimization. Here are some tips to get the most out of it:

### Select Only What You Need

Don’t select `*`. Be specific about the columns you need. This reduces data transfer and improves performance:

SELECT Id, Name, City FROM Customers WHERE City = @city

SELECT Id, Name, City FROM Customers WHERE City = @city

```js
SELECT Id, Name, City FROM Customers WHERE City = @city
```

Reminder – You may break your app if you do not match the shape of your EF Core Entity Models when you query data using query projection.

**Index Your Queries**  
Ensure your database has indexes that align with the fields you’re querying. This can drastically improve performance.

**Batch Your Queries**  
When retrieving related data, try batching or joining in SQL rather than fetching row by row.

---

## Advanced Scenarios with FromSql

Here’s where `FromSql` really shines:

### Stored Procedures

Have some stored procedures lying around? No problem. You can call them with `FromSql`:

var artist = context.Artists

.FromSql($"EXEC dbo.GetArtistDetails {artistId}")

.FirstOrDefault();

var artist = context.Artists.FromSql($"EXEC dbo.GetArtistDetails {artistId}").FirstOrDefault();

```js
var artist = context.Artists
    .FromSql($"EXEC dbo.GetArtistDetails {artistId}")
    .FirstOrDefault();
```

### Complex Joins and Filters

When LINQ starts looking like a maze of joins, switch to SQL for clarity and control:

var results = context.Orders

.FromSql("SELECT o.Id, o.Total, c.Name FROM Orders o JOIN Customers c ON o.CustomerId = c.Id")

.ToList();

var results = context.Orders.FromSql("SELECT o.Id, o.Total, c.Name FROM Orders o JOIN Customers c ON o.CustomerId = c.Id").ToList();

```js
var results = context.Orders
    .FromSql("SELECT o.Id, o.Total, c.Name FROM Orders o JOIN Customers c ON o.CustomerId = c.Id")
    .ToList();
```

---

## Gotchas to Watch Out For

While `FromSql` is powerful, it does have a few quirks:

- **Tracking Behavior**  
	By default, results are tracked. If you’re using a read-only query, append `.AsNoTracking()` to save resources.
- **Mapped Entities Only**  
	`FromSql` works with entities that are already mapped to your DbContext. If you’re querying custom projections, you must map them or use raw ADO.NET.
- **SQL Injection**  
	Always use parameters (like `$` interpolation) to avoid SQL injection vulnerabilities.

---

## Wrap-Up: Unleash the SQL Beast

`FromSql` bridges the gap between SQL’s raw power and EF Core’s convenience. It’s the perfect tool for those times when you need the precision of handcrafted SQL without ditching the ORM entirely. Whether you’re calling stored procedures, crafting efficient joins, or just reliving your SQL glory days, `FromSql` has got your back.

So go ahead—start writing SQL like a boss and take your EF Core game to the next level. Your app (and your DBA) will love you for it.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)