---
title: "Global Query Filters: Setting the Rules Once, Querying Like a Pro - Chris Woody Woodruff"
source: "https://woodruff.dev/global-query-filters-setting-the-rules-once-querying-like-a-pro/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-02
created: 2026-07-03
description: "Imagine you’re running a café. Every customer who walks in gets a free cookie—no need to ask for it, no need for your staff to remember. It just happens, automatically. That’s the magic of Global Query Filters in EF Core. Once you set them up, every query automatically follows the rules, making your code simpler and your life easier. Global Query Filters are all about efficiency and consistency. Let’s dive into how they work, why they’re awesome, and how to sprinkle them into your EF Core projects like those cookies at your café."
tags:
  - "clippings"
---
![Global Query Filters](https://woodruff.dev/wp-content/uploads/2025/01/Global-Query-Filters-150x150.webp)

Imagine you’re running a café. Every customer who walks in gets a free cookie—no need to ask for it, no need for your staff to remember. It just happens automatically. That’s the magic of **Global Query Filters** in EF Core. Once you set them up, every query automatically follows the rules, making your code simpler and your life easier.

Global Query Filters are all about efficiency and consistency. Let’s dive into how they work, why they’re awesome, and how to sprinkle them into your EF Core projects like those cookies at your café.

---

## What Are Global Query Filters?

Global Query Filters are rules that EF Core applies to every query involving a specific entity type. These rules filter out data you don’t want by default—like inactive users, deleted records, or inventory that’s out of stock.

Here’s an example. Say you have an `Album` entity, and you only want to fetch albums that are in stock. Instead of adding a `.Where()` clause to every query, you define a global filter once and let EF Core handle it for you:

modelBuilder.Entity\<Album>()

.HasQueryFilter(a =>!a.IsOutOfStock);

modelBuilder.Entity\<Album>().HasQueryFilter(a =>!a.IsOutOfStock);

```js
modelBuilder.Entity<Album>()
    .HasQueryFilter(a => !a.IsOutOfStock);
```

Now, every time you query `Album`, EF Core automatically applies this filter. No extra work, no forgotten conditions, no surprises.

---

## Why Use Global Query Filters?

Here’s why Global Query Filters are a game-changer:

1. **Simplify Your Code**  
	Forget repetitive `.Where()` clauses. With global filters, you set the rule once and let EF Core handle the rest.
2. **Ensure Consistency**  
	Global filters ensure that all queries follow the same rules, reducing the risk of errors and missed conditions.
3. **Boost Performance**  
	By filtering at the database level, you reduce the amount of data EF Core needs to process, saving time and resources.
4. **Make Soft Deletes a Breeze**  
	Global filters are perfect for soft deletes, where you mark records as deleted without actually removing them from the database.

---

## How to Add Global Query Filters

Adding a global query filter is as easy as pie (or cookies ). Here’s how you can do it:

### Step 1: Define Your Entity

Make sure your entity has the necessary property to filter on. For example:

public class Album

{

public int Id { get; set; }

public string Title { get; set; }

public bool IsOutOfStock { get; set; }

}

public class Album { public int Id { get; set; } public string Title { get; set; } public bool IsOutOfStock { get; set; } }

```js
public class Album
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsOutOfStock { get; set; }
}
```

### Step 2: Configure the Filter

In your `DbContext`, use `HasQueryFilter` to define the global rule:

protected override void OnModelCreating(ModelBuilder modelBuilder)

{

modelBuilder.Entity\<Album>()

.HasQueryFilter(a =>!a.IsOutOfStock);

}

protected override void OnModelCreating(ModelBuilder modelBuilder) { modelBuilder.Entity\<Album>().HasQueryFilter(a =>!a.IsOutOfStock); }

```js
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Album>()
        .HasQueryFilter(a => !a.IsOutOfStock);
}
```

That’s it! Now every query involving `Album` will automatically exclude out-of-stock records.

---

## When to Use Global Query Filters

Global Query Filters are perfect for:

**Soft Deletes**  
Automatically exclude records marked as deleted:

modelBuilder.Entity\<User>()

.HasQueryFilter(u =>!u.IsDeleted);

modelBuilder.Entity\<User>().HasQueryFilter(u =>!u.IsDeleted);

```js
modelBuilder.Entity<User>()
    .HasQueryFilter(u => !u.IsDeleted);
```

**Multi-Tenant Applications**  
Filter data by tenant ID for multi-tenant systems:

modelBuilder.Entity\<Order>()

.HasQueryFilter(o => o.TenantId == \_currentTenantId);

modelBuilder.Entity\<Order>().HasQueryFilter(o => o.TenantId == \_currentTenantId);

```js
modelBuilder.Entity<Order>()
    .HasQueryFilter(o => o.TenantId == _currentTenantId);
```

**Default Visibility Rules**  
Exclude inactive users, unpublished content, or anything else that shouldn’t appear by default.

---

## When NOT to Use Global Query Filters

While global filters are fantastic, they’re not a one-size-fits-all solution. Avoid using them when:

- **You Need Flexibility**  
	If you often need to bypass the filter, it might be better to use explicit query conditions.
- **The Filter is Complex**  
	Global filters work best for simple conditions. Complex filters can lead to messy queries and performance issues.
- **You Need Full Control**  
	For queries requiring precision and custom behavior, skip the global filter.

---

## Bypassing Global Query Filters

Need to ignore the global filter for a specific query? EF Core’s got your back:

var allAlbums = await context.Albums

.IgnoreQueryFilters()

.ToListAsync();

var allAlbums = await context.Albums.IgnoreQueryFilters().ToListAsync();

```js
var allAlbums = await context.Albums
    .IgnoreQueryFilters()
    .ToListAsync();
```

This bypasses the filter and fetches all the data. Use it sparingly to keep your app consistent.

---

## A Real-World Example

Imagine you’re building an e-commerce app. Your `Product` entity has a `IsDiscontinued` flag, and you want to hide discontinued products from most queries. Here’s how you’d set it up:

public class Product

{

public int Id { get; set; }

public string Name { get; set; }

public bool IsDiscontinued { get; set; }

}

protected override void OnModelCreating(ModelBuilder modelBuilder)

{

modelBuilder.Entity\<Product>()

.HasQueryFilter(p =>!p.IsDiscontinued);

}

public class Product { public int Id { get; set; } public string Name { get; set; } public bool IsDiscontinued { get; set; } } protected override void OnModelCreating(ModelBuilder modelBuilder) { modelBuilder.Entity\<Product>().HasQueryFilter(p =>!p.IsDiscontinued); }

```js
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDiscontinued { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .HasQueryFilter(p => !p.IsDiscontinued);
}
```

Now, every query on `Product` automatically excludes discontinued items—no extra code is needed.

---

## Wrap-Up: Set It and Forget It

Global Query Filters are like setting your app on autopilot for filtering. Once you configure them, EF Core handles the heavy lifting, making your queries cleaner, faster, and more consistent. Whether you’re managing soft deletes, multi-tenant data, or visibility rules, global filters make your life easier.

So, what are you waiting for? Set the rules once and let EF Core do the rest. Your app will thank you, your database will thank you, and you’ll have more time for what matters—like enjoying those free cookies.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)