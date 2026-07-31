---
title: "No-Tracking Queries: Speed Up Your EF Core Like a Pro - Chris Woody Woodruff"
source: "https://woodruff.dev/no-tracking-queries-speed-up-your-ef-core-like-a-pro/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-31
created: 2026-07-03
description: "Imagine you’re at a library, flipping through books at lightning speed. You don’t need to write notes in the margins or keep tabs on which books you’ve touched—you’re just reading. That’s what no-tracking queries are in EF Core: a way to grab data without keeping track of changes. It’s fast, lightweight, and perfect for read-only operations. But wait, there’s more! Let’s throw identity resolution into the mix, a smart way to avoid duplicate entities when working with no-tracking queries. Together, they make a dynamic duo for blazing-fast data fetching, significantly reducing the time it takes to retrieve data from the database."
tags:
  - "clippings"
---
![No-Tracking Queries: Speed Up Your EF Core Like a Pro](https://woodruff.dev/wp-content/uploads/2025/01/No-Tracking-Queries-Speed-Up-Your-EF-Core-Like-a-Pro-150x150.png)

Imagine you’re at a library, flipping through books at lightning speed. You don’t need to write notes in the margins or keep tabs on which books you’ve touched—you’re just reading. That’s what **no-tracking queries** are in EF Core: a way to grab data without keeping track of changes. It’s fast, lightweight, and perfect for read-only operations.

But wait, there’s more! Let’s throw **identity resolution** into the mix, a smart way to avoid duplicate entities when working with no-tracking queries. Together, they make a dynamic duo for blazing-fast data fetching, significantly reducing the time it takes to retrieve data from the database.

---

## What’s a No-Tracking Query?

By default, EF Core keeps track of every entity it fetches. This is great if you plan to update those entities, but it’s overkill if you’re just reading data. No-tracking queries tell EF Core, “Hey, I’m just looking, no need to follow me around.”

### Without No-Tracking

var albums = await context.Albums.ToListAsync();

var albums = await context.Albums.ToListAsync();

```js
var albums = await context.Albums.ToListAsync();
```

EF Core tracks each `Album` it fetches, just in case you want to make changes later.

### With No-Tracking

var albums = await context.Albums

.AsNoTracking()

.ToListAsync();

var albums = await context.Albums.AsNoTracking().ToListAsync();

```js
var albums = await context.Albums
    .AsNoTracking()
    .ToListAsync();
```

Now EF Core skips the tracking overhead. It fetches the data and calls it a day.

---

## Why Use No-Tracking Queries?

Here’s why no-tracking queries are awesome:

1. **Speed Boost**  
	No tracking = less work for EF Core. Your queries run faster, especially with large datasets.
2. **Lower Memory Usage**  
	Tracking entities means keeping them in memory. No-tracking queries skip that step, making them lightweight.
3. **Read-Only Bliss**  
	For read-only scenarios like APIs or reports, no-tracking queries are perfect.

---

## Enter Identity Resolution

Now, imagine you’re querying related data, like albums and their tracks. Without identity resolution, EF Core might fetch the same entity multiple times and treat them as separate objects. That’s messy. Identity resolution swoops in to save the day, ensuring each entity is represented only once.

### No-Tracking Without Identity Resolution

var albums = await context.Albums

.Include(a => a.Tracks)

.AsNoTracking()

.ToListAsync();

var albums = await context.Albums.Include(a => a.Tracks).AsNoTracking().ToListAsync();

```js
var albums = await context.Albums
    .Include(a => a.Tracks)
    .AsNoTracking()
    .ToListAsync();
```

In this case, EF Core won’t track entities *or* ensure a single instance per `Album`. Duplicate objects could sneak in.

### No-Tracking With Identity Resolution

var albums = await context.Albums

.AsNoTrackingWithIdentityResolution()

.ToListAsync();

var albums = await context.Albums.AsNoTrackingWithIdentityResolution().ToListAsync();

```js
var albums = await context.Albums
    .AsNoTrackingWithIdentityResolution()
    .ToListAsync();
```

Now EF Core ensures every `Album` entity is unique, even in complex queries.

---

## When to Use These Features

### Use No-Tracking When:

- You’re fetching data for display or reporting.
- You’re dealing with large datasets where tracking would eat up memory.
- You don’t need to modify the data.

### Use No-Tracking With Identity Resolution When:

- You’re fetching related entities (e.g., parent-child relationships).
- You need a clean, duplicate-free representation of your data.

---

## Performance Example

Let’s see these in action with a quick performance snapshot:

### Without No-Tracking

- Query Time: 300ms
- Memory Usage: High (tracked entities for 10,000 rows)

### With No-Tracking

- Query Time: 120ms
- Memory Usage: Low (no tracking overhead)

### With No-Tracking + Identity Resolution

- Query Time: 150ms
- Memory Usage: Low (slightly higher due to identity resolution)

---

## How to Set It as Default

Tired of adding `.AsNoTracking()` to every query? Make it the default for your context:

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{

optionsBuilder

.UseSqlServer("\<YourConnectionString>")

.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);

}

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseSqlServer("\<YourConnectionString>").UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking); }

```js
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseSqlServer("<YourConnectionString>")
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
}
```

This way, no-tracking becomes the default, and you can override it only when needed.

---

## Gotchas to Watch Out For

Before you go no-tracking everything, keep these in mind:

1. **No Updates Allowed**  
	You can’t modify entities fetched with no-tracking queries. They’re read-only.
2. **Identity Resolution Isn’t Free**  
	While it prevents duplicates, it adds a bit of overhead. Use it only when necessary.
3. **Be Explicit About Relationships**  
	If you fetch related data with no-tracking, ensure you include what you need. Lazy loading won’t work here.

---

## Wrap-Up: Track Less, Do More

No-tracking queries and identity resolution are like a breath of fresh air for your EF Core app. They make your queries faster, your memory usage lower, and your life easier. Whether you’re building APIs, dashboards, or complex reports, these features can take your EF Core game to the next level.

So, next time you’re fetching data, ask yourself: Do I really need to track this? If not, let no-tracking queries speed things up. Your app—and your database—will thank you.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)