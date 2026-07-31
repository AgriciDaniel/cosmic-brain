---
title: "Split Queries: Stop the Data Traffic Jam in EF Core - Chris Woody Woodruff"
source: "https://woodruff.dev/split-queries-stop-the-data-traffic-jam-in-ef-core/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-29
created: 2026-07-03
description: "Picture this: You’re hosting a dinner party, and instead of serving everyone a delicious buffet, you deliver each dish one at a time to every guest. When dessert arrives, everyone’s too tired (or annoyed) to enjoy it. My friends, this is the problem with single queries in EF Core when they fetch complex relationships. Enter Split Queries, the life of your EF Core dinner party."
tags:
  - "clippings"
---
![Split Queries: Stop the Data Traffic Jam in EF Core](https://woodruff.dev/wp-content/uploads/2025/01/Split-Queries-Stop-the-Data-Traffic-Jam-in-EF-Core-150x150.png)

Picture this: You’re hosting a dinner party, and instead of serving everyone a delicious buffet, you deliver each dish one at a time to every guest. When dessert arrives, everyone’s too tired (or annoyed) to enjoy it. My friends, this is the problem with **single queries** in EF Core when they fetch complex relationships. Enter **Split Queries**, the life of your EF Core dinner party.

Split Queries break down extensive, complex database queries into smaller, more manageable bites, ensuring smoother performance and happier apps. Let’s dive into what they are, why they matter, and when to put them on your EF Core menu.

---

## What Are Split Queries?

EF Core often generates a single query with multiple joins when it fetches related data. This works fine for smaller datasets but quickly becomes a problem when:

- You have deeply nested relationships.
- The query results in massive Cartesian products.
- Your database server starts crying for help.

With Split Queries, EF Core splits the related data retrieval into multiple more minor queries instead of a mega-query, reducing memory overhead and improving performance.

---

## A Quick Example

Here’s a classic scenario: Fetching blogs with their related posts.

#### Without Split Queries (Single Query)

var blogs = await context.Blogs

.Include(b =&gt; b.Posts)

.ToListAsync();

var blogs = await context.Blogs.Include(b =&gt; b.Posts).ToListAsync();

```js
var blogs = await context.Blogs
    .Include(b =&gt; b.Posts)
    .ToListAsync();
```

EF Core will generate one giant query with a `JOIN`, which can lead to redundant data and bloated results.

#### With Split Queries

var blogs = await context.Blogs

.Include(b =&gt; b.Posts)

.AsSplitQuery()

.ToListAsync();

var blogs = await context.Blogs.Include(b =&gt; b.Posts).AsSplitQuery().ToListAsync();

```js
var blogs = await context.Blogs
    .Include(b =&gt; b.Posts)
    .AsSplitQuery()
    .ToListAsync();
```

Boom! Now, EF Core generates two separate queries—one for the blogs and one for their posts—making it faster and less memory-hungry.

---

## Why Use Split Queries?

Here’s why Split Queries are the unsung heroes of EF Core:

1. **Reduce Redundant Data**  
	Joins in single queries often duplicate rows when fetching related data. Split Queries eliminate this duplication.
2. **Avoid Memory Overload**  
	For large datasets, single queries can result in massive in-memory objects. Split Queries keep things lean and efficient.
3. **Simplify Query Execution**  
	By breaking the query into smaller chunks, you lighten the load on your database server, leading to faster execution.
4. **Prevent Cartesian Explosion**  
	If you’ve ever seen a query return thousands of rows when you expected ten, you know the pain. Split Queries minimize this risk.

---

## When to Use Split Queries

Split Queries are fantastic, but they’re not a silver bullet. Here’s when to consider using them:

- **Complex Relationships:** If you’re working with deeply nested data (`Include` on `Include` on `Include`), Split Queries can save the day.
- **Large Datasets:** Fetching related data for thousands of records? Split it up to avoid overwhelming your app.
- **Performance Troubleshooting:** If a single query is causing bottlenecks, switching to Split Queries might resolve the issue.

---

## How to Enable Split Queries

It’s as easy as flipping a switch. Just add `.AsSplitQuery()` to your LINQ statement:

var blogs = await context.Blogs

.Include(b =&gt; b.Posts)

.AsSplitQuery()

.ToListAsync();

var blogs = await context.Blogs.Include(b =&gt; b.Posts).AsSplitQuery().ToListAsync();

```js
var blogs = await context.Blogs
    .Include(b =&gt; b.Posts)
    .AsSplitQuery()
    .ToListAsync();
```

Want to make it the default behavior for your app? Add this to your `DbContext` configuration:

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{

optionsBuilder

.UseSqlServer("&lt;YourConnectionString&gt;")

.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);

}

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseSqlServer("&lt;YourConnectionString&gt;").UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery); }

```js
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseSqlServer("&lt;YourConnectionString&gt;")
        .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
}
```

That’s it! EF Core will now default to Split Queries unless you specify otherwise.

---

## Gotchas to Watch Out For

Before you go splitting all your queries, keep these in mind:

- **Multiple Database Calls:** Split Queries make multiple trips to the database. While this is usually faster than processing a giant query, it might not always be true for small datasets.
- **Not for Lazy Loaders:** Split Queries won’t magically optimize that behavior if you rely heavily on lazy loading.
- **Explicit Configuration Needed:** EF Core will still use single queries if you don’t enable `.AsSplitQuery()` or set it as the default.

---

## Single vs Split Queries: A Performance Tale

Let’s look at a quick comparison:

#### Single Query:

- **Pros:** Fewer trips to the database.
- **Cons:** Can create massive results with duplicated data, leading to high memory usage.

#### Split Queries:

- **Pros:** Smaller, more efficient database calls; avoids duplication.
- **Cons:** Multiple trips to the database could add latency for small datasets.

---

## Wrap-Up: Split It, Don’t Quit It

Split Queries are like a well-organized road trip: smaller, planned stops make the journey smoother and more enjoyable for everyone involved. By breaking down complex data retrieval into manageable chunks, you’ll avoid memory overload, reduce redundant data, and keep your app running at peak performance.

So, next time your EF Core queries feel like they’re taking the scenic (and slow) route, remember: sometimes, splitting up is the best way to stay together.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)