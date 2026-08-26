# Server-Side Performance

Even without using Fusion's RPC capabilities, you can benefit from Fusion on the server side to cache recurring computations.

## Benchmark Results

Below are results from [Run-Benchmark.cmd from Fusion Samples](https://github.com/ActualLab/Fusion.Samples/tree/master/src/Benchmark):

**Local Services:**

| Test | Result | Speedup |
|------|--------|---------|
| Regular Service | 118.15K calls/s | |
| Fusion Service | 261.32M calls/s | **~2,212x** |

**Remote Services:**

| Test | Result | Speedup |
|------|--------|---------|
| HTTP Client → Regular Service | 80.43K calls/s | |
| HTTP Client → Fusion Service | 393.65K calls/s | **~4.9x** |
| ActualLab.Rpc Client → Fusion Service | 7.92M calls/s | **~98x** |
| Fusion Client → Fusion Service | 215.45M calls/s | **~2,679x** |

## Key Takeaways

- A tiny EF Core-based service exposed via ASP.NET Core serves about **80K** requests per second — mostly because its data set fully fits in RAM.
- The same service with Fusion (`[ComputeMethod]` and `Invalidation.Begin` calls) boosts this to **~390K** requests per second when accessed via HTTP — a **~5x performance boost** with minimal code changes.
- [Similarly to incremental builds](https://alexyakunin.medium.com/the-ungreen-web-why-our-web-apps-are-terribly-inefficient-28791ed48035?source=friends_link&sk=74fb46086ca13ff4fea387d6245cb52b), the more complex your logic is, the more you are expected to gain.

## Learn More

- [Memory Management](./PartF-MM.md) — How Fusion manages computed value lifetimes and memory
- [ComputedOptions](./PartF-CO.md) — Configure caching behavior with `MinCacheDuration` and other options
