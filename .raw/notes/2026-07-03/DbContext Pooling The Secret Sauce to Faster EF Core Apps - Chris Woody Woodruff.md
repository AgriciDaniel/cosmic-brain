---
title: "DbContext Pooling: The Secret Sauce to Faster EF Core Apps - Chris Woody Woodruff"
source: "https://woodruff.dev/dbcontext-pooling-the-secret-sauce-to-faster-ef-core-apps/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-25
created: 2026-07-03
description: "Imagine you’re running a restaurant. Every time a customer orders, you buy a brand-new frying pan, use it once, and toss it out. Sounds absurd, right? But that’s essentially what happens in EF Core when you create a new DbContext for every request. It’s wasteful, slow, and totally unnecessary. Enter DbContext Pooling: the genius way to reuse those frying pans—err, contexts—and turbocharge your app’s performance."
tags:
  - "clippings"
---
![DbContext Pooling: The Secret Sauce to Faster EF Core Apps](https://woodruff.dev/wp-content/uploads/2025/01/DbContext-Pooling-The-Secret-Sauce-to-Faster-EF-Core-Apps-150x150.png)

Imagine you’re running a restaurant. Every time a customer orders, you buy a brand-new frying pan, use it once, and toss it out. Sounds absurd, right? But that’s essentially what happens in EF Core when you create a new DbContext for every request. It’s wasteful, slow, and totally unnecessary. Enter **DbContext Pooling**: the genius way to reuse those frying pans—err, contexts—and turbocharge your app’s performance.

## What Is DbContext Pooling?

Think of DbContext Pooling as a VIP lounge for your DbContext instances. Instead of creating and disposing of a new DbContext for every request, EF Core prepares a pool of pre-configured DbContext objects. When a request comes in, it grabs one from the pool, uses it, and then returns it back like a good citizen.

This prevents your app from wasting precious resources by repeatedly creating and destroying objects. The result? You get significantly faster performance and fewer headaches.

## How Does It Work?

Here’s the magic in action:

1. **Without Pooling**
	- Every request spins up a shiny new DbContext. If your app gets thousands of requests, thousands of DbContext objects will be created and destroyed. Yikes!
		- ***Performance snapshot:***
		- Total contexts created: 64,637
				- Requests per second: 6,395
2. **With Pooling**
	- By pooling, EF Core reuses the same DbContext instances whenever possible. Fewer object creations mean less garbage collection and better throughput.
		- ***Performance snapshot:***
		- Total contexts created: 32
				- Requests per second: 15,714

That’s more than **double the throughput**!

## How to Add DbContext Pooling to Your App

Ready to join the pooling party? Here’s how you can set it up in just a few lines of code:

public void ConfigureServices(IServiceCollection services)

{

services.AddDbContextPool\<YourDbContext>(options =>

options.UseSqlServer("YourConnectionString"));

}

public void ConfigureServices(IServiceCollection services) { services.AddDbContextPool\<YourDbContext>(options => options.UseSqlServer("YourConnectionString")); }

```js
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContextPool<YourDbContext>(options =>
        options.UseSqlServer("YourConnectionString"));
}
```

That’s it! You’ve just unlocked a faster, more efficient app with minimal effort.

## Things to Watch Out For

Before you dive headfirst into pooling, here are a few things to keep in mind:

### No Scoped Dependencies

Your DbContext should be stateless, meaning it shouldn’t hold any references to services or objects with scoped lifetimes. Otherwise, you’ll run into bizarre bugs.

### Reset Your State

EF Core automatically resets the state of a pooled DbContext, but if you’re doing something fancy (like tracking lots of entities), make sure you don’t leave any messes behind.

### Know Your Limits

While pooling works wonders for most apps, it’s not a one-size-fits-all solution. Test your app’s performance and see if pooling delivers your needed boost.

## Why You’ll Love DbContext Pooling

DbContext Pooling is like upgrading your old bike to a sports car. It’s simple, efficient, and gives you more speed with less effort. Whether building blazing-fast APIs or high-throughput web apps, pooling ensures your EF Core app runs like a well-oiled machine.

So, what are you waiting for? Add DbContext Pooling to your app today and feel the performance boost. Trust me—your app (and your users) will thank you.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)