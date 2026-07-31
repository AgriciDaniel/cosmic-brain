---
address: c-298
type: source
title: "Compiled Models: The Fast Lane for EF Core Performance"
source_url: "https://woodruff.dev/compiled-models-the-fast-lane-for-ef-core-performance/"
author: "[[Chris Woodruff]]"
published: 2025-01-26
ingested: 2026-07-03
tags:
  - source
  - dotnet
  - efcore
  - performance
status: current
related:
  - "[[EF Core Compiled Models]]"
  - "[[Entity Framework Core]]"
  - "[[Chris Woodruff]]"
---

# Compiled Models: The Fast Lane for EF Core Performance

Navigation: [[index]] | [[sources/_index|Sources]]

Short blog post by [[Chris Woodruff]] (woodruff.dev, published 2025-01-26) introducing EF Core **Compiled Models** as a startup-time optimization. Casual/conversational tone, no benchmarks included, positioned as a practical how-to rather than a deep dive.

## Summary

EF Core normally builds its model (entities, relationships, configurations) at runtime, on every app startup. For large/complex schemas this warm-up costs real milliseconds-to-seconds. Compiled Models shift that model-building work from runtime to **build time**: `dotnet ef` generates a pre-built C# representation of the model that the app loads directly, skipping the runtime discovery/convention pipeline entirely.

See [[EF Core Compiled Models]] for the extracted concept (mechanism, setup steps, tradeoffs).

## Key Points

- **Problem framed:** app startup time, especially for large/complex EF Core models and high-scale/multi-instance (microservices/cloud) deployments where the warm-up cost is paid on every instance boot.
- **Mechanism:** move model-building from runtime to build/publish time via `dotnet ef dbcontext optimize`.
- **Setup is a 3-step flow:** install `dotnet-ef` CLI tool → run `dotnet ef dbcontext optimize --output-dir Models --namespace MyApp.Models` → wire the generated model into `DbContext.OnConfiguring` via `optionsBuilder.UseModel(MyApp.Models.MyCompiledModel.Instance)`.
- **Constraints called out:** must regenerate after any entity/configuration change; incompatible with lazy-loading and change-tracking proxies; incompatible with global query filters.
- **Claimed benefits:** faster startup (especially complex schemas / high-scale deployments), consistency across instances in cloud/microservice deployments, and easier performance tuning because the model is fixed and known ahead of time.

## Gaps / Limitations of This Source

- No quantitative benchmark numbers — "milliseconds or even seconds" is qualitative, not measured.
- Only covers `UseSqlServer` in the example; doesn't address provider-specific caveats.
- Doesn't mention EF Core version requirements (Compiled Models were introduced in EF Core 8).
- Doesn't discuss CI/CD integration (regenerating the compiled model as a build step) or how staleness is detected/enforced (EF Core does runtime-check the model hash and throws if the compiled model is out of sync, but this is not mentioned in the source).

## Source

- [[Chris Woodruff]] — [woodruff.dev](https://woodruff.dev/compiled-models-the-fast-lane-for-ef-core-performance/), published 2025-01-26
