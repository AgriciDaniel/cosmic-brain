---
title: "Compiled Models: The Fast Lane for EF Core Performance - Chris Woody Woodruff"
source: "https://woodruff.dev/compiled-models-the-fast-lane-for-ef-core-performance/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-26
created: 2026-07-03
description: "Let’s talk about startup time. Not the Silicon Valley kind, but the time it takes for your EF Core app to boot up, stretch its legs, and actually start handling requests. If your app is dragging its feet like a teenager on a Monday morning, you need a secret weapon: Compiled Models."
tags:
  - "clippings"
---
![Compiled Models: The Fast Lane for EF Core Performance](https://woodruff.dev/wp-content/uploads/2025/01/Compiled-Models-The-Fast-Lane-for-EF-Core-Performance-150x150.png)

Let’s talk about *startup time*. Not the Silicon Valley kind, but the time it takes for your EF Core app to boot up, stretch its legs, and actually start handling requests. If your app is dragging its feet like a teenager on a Monday morning, you need a secret weapon: **Compiled Models**.

Think of compiled models as pre-built blueprints for your database schema that EF Core can load instantly, skipping all the tedious setup. It’s like meal-prepping your database models so your app can hit the ground running.

---

### What Are Compiled Models, Anyway?

Typically, EF Core builds your model on the fly every time your app starts up. It figures out your entities, relationships, and configurations—basically, everything you’ve already told it in code. While it works, it’s not exactly speedy, especially for large or complex models.

Compiled Models take that runtime work and shift it to **build time**. The result? EF Core already knows everything it needs, so it can skip the warm-up routine and start doing what it does best: handling your data like a champ.

---

### How Much Faster Are We Talking?

Here’s a quick comparison:

- **Without Compiled Models:** Your app spends precious milliseconds (or even seconds) building the model from scratch.
- **With Compiled Models:** It’s like skipping the line at the amusement park. Your app starts faster, especially in scenarios with complex schemas or high-scale deployments.

And when your app is deployed across multiple instances (hello, microservices!), those time savings really add up.

---

### Setting Up Compiled Models

Ready to give compiled models a spin? Here’s how to set it up in your EF Core project:

### Install the Necessary Tools

You’ll need the EF Core CLI tools. If you don’t have them yet, install them with:

dotnet tool install --global dotnet-ef

dotnet tool install --global dotnet-ef

```js
dotnet tool install --global dotnet-ef
```

### Generate the Compiled Model

Run the following command in your project directory:

dotnet ef dbcontext optimize --output-dir Models --namespace MyApp.Models

dotnet ef dbcontext optimize --output-dir Models --namespace MyApp.Models

```js
dotnet ef dbcontext optimize --output-dir Models --namespace MyApp.Models
```

This creates a compiled model in the `Models` folder with all the database schema goodness baked in.

### Use the Compiled Model in Your DbContext

Update your `DbContext` to load the compiled model:

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{

optionsBuilder

.UseModel(MyApp.Models.MyCompiledModel.Instance)

.UseSqlServer("\<YourConnectionString>");

}

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseModel(MyApp.Models.MyCompiledModel.Instance).UseSqlServer("\<YourConnectionString>"); }

```js
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseModel(MyApp.Models.MyCompiledModel.Instance)
        .UseSqlServer("<YourConnectionString>");
}
```

That’s it! Your app is now cruising in the fast lane.

---

### The Fine Print

Compiled models are amazing, but they come with a few “house rules”:

- **Code Changes Require Regeneration**  
	You’ll need to regenerate the compiled model if you update your entity configurations or add new ones. It’s a small price to pay for all that speed.
- **No Lazy-Loading or Change-Tracking Proxies**  
	Compiled models don’t support lazy-loading or change-tracking proxies, so make sure your app can live without them.
- **Global Query Filters Are Out**  
	You’ll need to revisit your strategy if you rely on global query filters because compiled models don’t play nice with them.

---

### Why Use Compiled Models?

Here’s why compiled models are a game-changer:

- **Blazing-Fast Startup:** Great for apps with complex schemas or high traffic.
- **Consistency Across Instances:** Perfect for cloud deployments where every millisecond counts.
- **Easier Performance Tuning:** Your model is pre-built, so you know precisely what EF Core works with.

---

### Wrap-Up: Build It Once, Use It Always

Compiled Models are like meal-prepping for your EF Core app—put in a little effort up front, and you’ll save time every time your app starts up. Whether optimizing for the cloud or just looking to shave some seconds off your app’s startup, this tool is worth adding to your kit.

So, grab your EF Core CLI and start compiling. Your app (and your users) will feel the difference.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)