# ComputedOptions: Fine-Tuning Compute Methods

This document covers the advanced configuration options available for compute methods via the `[ComputeMethod]` attribute and `ComputedOptions`.

## Overview

Every compute method uses `ComputedOptions` to control:
- How long computed values stay in memory
- When and how they auto-invalidate
- How invalidation timing works
- How multiple concurrent updates are consolidated

You configure these options via the `[ComputeMethod]` attribute:

<!-- snippet: PartFCO_BasicAttribute -->
```cs
[ComputeMethod(MinCacheDuration = 10, AutoInvalidationDelay = 60)]
Task<UserProfile> GetProfile(string userId);
```
<!-- endSnippet -->

## How Values Are Interpreted

All `[ComputeMethod]` properties are `double` values representing seconds. They use special values to express "use default" and "infinite/disabled":

| `double` value | Meaning |
|----------------|---------|
| `double.NaN` | "Use default" — inherits from `ComputedOptions.Default` |
| `double.PositiveInfinity` | "Infinite" / disabled — translates to `TimeSpan.MaxValue` |
| `>= 0` | Actual duration in seconds |
| `< 0` | Invalid — throws `ArgumentOutOfRangeException` |

All attribute properties default to `double.NaN`, so omitting an option means "use the global default":

<!-- snippet: PartFCO_DefaultAndInfinite -->
```cs
// These are equivalent:
[ComputeMethod(MinCacheDuration = double.NaN)]
Task<Data> GetData1();
[ComputeMethod] // MinCacheDuration not specified = use default
Task<Data> GetData2();

// Explicitly disable auto-invalidation:
[ComputeMethod(AutoInvalidationDelay = double.PositiveInfinity)]
Task<Data> GetData3();
```
<!-- endSnippet -->

## Option Reference

### MinCacheDuration

**Type:** `double` (seconds)
**Default:** `0` (no minimum)

Minimum time a `Computed<T>` instance stays in RAM via a strong reference.

<!-- snippet: PartFCO_MinCacheDuration -->
```cs
[ComputeMethod(MinCacheDuration = 60)] // Keep in memory for at least 60 seconds
Task<User> Get(string id);
```
<!-- endSnippet -->

**How it works:**
- When a computed value is created, Fusion holds a strong reference to it for this duration
- Without this, computed values may be garbage-collected as soon as no code references them
- Invalidation trims this time — there's no reason to cache an outdated value

**When to use:**
- For frequently accessed data that's expensive to compute
- For data that's shared across many UI components
- Authentication/session data that shouldn't be recomputed on every access

### TransientErrorInvalidationDelay

**Type:** `double` (seconds)
**Default:** `1`

Auto-invalidation delay for computed values that store a transient error (e.g., network failures).

<!-- snippet: PartFCO_TransientErrorDelay -->
```cs
[ComputeMethod(TransientErrorInvalidationDelay = 5)] // Retry after 5 seconds
Task<Data> FetchFromExternalApi();
```
<!-- endSnippet -->

**How it works:**
- If a compute method throws a transient exception, the error is cached
- After this delay, the computed value auto-invalidates, triggering a retry
- Helps recover from temporary failures without manual intervention

**When to use:**
- External API calls that may fail temporarily
- Database operations that might hit connection limits
- Any operation where retry after a delay makes sense

### AutoInvalidationDelay

**Type:** `double` (seconds)
**Default:** `TimeSpan.MaxValue` (no auto-invalidation)

Time after which a computed value automatically invalidates itself.

<!-- snippet: PartFCO_AutoInvalidationDelay -->
```cs
[ComputeMethod(AutoInvalidationDelay = 30)] // Auto-refresh every 30 seconds
Task<DateTime> GetServerTime();
```
<!-- endSnippet -->

**How it works:**
- The computed value schedules its own invalidation after this delay
- Useful for data that naturally becomes stale over time
- Works even if no external invalidation occurs

**When to use:**
- Clock/time-based data
- Polling external systems where push notifications aren't available
- Data with known expiration (e.g., cached tokens)
- Rate-limited refresh of volatile data

### InvalidationDelay

**Type:** `double` (seconds)
**Default:** `0` (immediate)

Delay before invalidation actually takes effect.

<!-- snippet: PartFCO_InvalidationDelay -->
```cs
[ComputeMethod(InvalidationDelay = 0.5)] // Debounce invalidations by 500ms
Task<Summary> GetSummary();
```
<!-- endSnippet -->

**How it works:**
- When `Invalidate()` is called, the actual invalidation is postponed
- Multiple rapid invalidations during this period are coalesced into one
- Reduces recomputation storms during batch updates

**When to use:**
- Aggregate computations that depend on many rapidly-changing values
- Debouncing UI updates during batch operations
- Reducing server load during bulk data imports

### ConsolidationDelay

**Type:** `double` (seconds)
**Default:** `-1` (no consolidation)

Eliminates "false" invalidations by only invalidating when the computed value actually changes.

<!-- snippet: PartFCO_ConsolidationDelay -->
```cs
[ComputeMethod(ConsolidationDelay = 0)] // Invalidate only when value changes
Task<int> GetUnreadCount(string placeId);

[ComputeMethod(ConsolidationDelay = 0.5)] // Wait 500ms before checking for value changes
Task<Summary> GetSummary();
```
<!-- endSnippet -->

**How it works:**
When ConsolidationDelay is zero or positive, Fusion backs the method with two computed instances:
- **Consolidation target** — the instance everyone sees from the outside
- **Consolidation source** — the internal instance used to detect actual value changes

The consolidation target doesn't have any dependencies itself, but listens to consolidation source invalidations. When an invalidation occurs on the consolidation source:
1. The target waits for the consolidation delay (can be zero)
2. Then recomputes the consolidation source
3. If the new value differs from the target's current value, the target invalidates itself
4. If the value is the same, the invalidation is "swallowed" and the target continues listening to the new source

**Why this matters:**
Without this option, every ground truth invalidation in Fusion spreads through the entire dependency graph, hitting every dependent computed. It doesn't matter if some invalidated values recompute to exactly the same result — if your dependency is invalidated, you get invalidated too.

**Example — Unread counters:**
A single unread counter may depend on hundreds of API calls (e.g., a place counter depends on every chat counter, which depend on read/write positions). Without consolidation, a single post in any chat would invalidate the chat counter (even though it likely produces the same value), then the place counter, then the total — forcing every UI element showing these counters to refresh.

With ConsolidationDelay, the counter only invalidates when its value actually changes.

**When to use:**
- Counter-like aggregations (unread counts, totals, statistics)
- Any computed that frequently recomputes to the same value
- Reducing invalidation cascades in deep dependency graphs
- Preventing unnecessary UI refreshes

## Combining Options

Options can be combined for sophisticated caching strategies:

<!-- snippet: PartFCO_CombiningOptions -->
```cs
// Long-lived cache with automatic refresh
[ComputeMethod(
    MinCacheDuration = 300,        // Keep in memory 5 minutes
    AutoInvalidationDelay = 60)]   // But refresh every minute
Task<Stats> GetDashboardStats();

// Resilient external call with debouncing
[ComputeMethod(
    TransientErrorInvalidationDelay = 10,  // Retry errors after 10s
    InvalidationDelay = 1)]                 // Debounce updates by 1s
Task<Price> GetExternalPrice(string symbol);

// Aggregation that should only invalidate when value changes
[ComputeMethod(
    MinCacheDuration = 60,
    ConsolidationDelay = 0)]      // Invalidate only on actual value change
Task<int> GetTotalUnreadCount();
```
<!-- endSnippet -->

## Default Values

Fusion provides different defaults for server-side and client-side (remote) compute services:

| Option | Server Default | Client Default |
|--------|---------------|----------------|
| MinCacheDuration | 0 | 60 seconds |
| TransientErrorInvalidationDelay | 1 second | 1 second |
| AutoInvalidationDelay | ∞ (none) | ∞ (none) |
| InvalidationDelay | 0 | 0 |
| ConsolidationDelay | -1 (none) | -1 (none) |

You can change global defaults by modifying `ComputedOptions.Default` and `ComputedOptions.ClientDefault` at startup:

<!-- snippet: PartFCO_ChangingDefaults -->
```cs
ComputedOptions.Default = ComputedOptions.Default with {
    MinCacheDuration = TimeSpan.FromSeconds(30),
};
```
<!-- endSnippet -->

## Remote Compute Methods

For distributed scenarios, use `[RemoteComputeMethod]` which extends `[ComputeMethod]` with caching options:

<!-- snippet: PartFCO_RemoteComputeMethod -->
```cs
[RemoteComputeMethod(CacheMode = RemoteComputedCacheMode.Cache)]
Task<Product> Get(string id);
```
<!-- endSnippet -->

**RemoteComputedCacheMode values:**
- `Default` — inherit from `ComputedOptions.ClientDefault`
- `Cache` — enable client-side caching of remote results
- `NoCache` — disable caching, always fetch from server

## Tips

1. **Assume defaults are fine** — make changes once you know what's going on; you can also change `ComputedOptions.Default` globally
2. **Consider memory** — `MinCacheDuration` trades memory for CPU; balance accordingly
3. **Mind the invalidation chain** — delayed invalidation affects all dependent computed values
4. **Test consolidation carefully** — too long a delay can show stale data; too short defeats the purpose
