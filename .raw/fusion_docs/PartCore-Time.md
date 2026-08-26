# Time (Moment)

`ActualLab.Time` provides Unix-style time primitives optimized for high-performance scenarios.
These types are used throughout Fusion for timestamps, scheduling, and time-based operations.

## Required Package

| Package | Purpose |
|---------|---------|
| [ActualLab.Core](https://www.nuget.org/packages/ActualLab.Core/) | Core time infrastructure |


## Why Not DateTime?

.NET's `DateTime` and `DateTimeOffset` suffer from **kind ambiguity** — a common source of bugs:

```cs
DateTime dt = DateTime.Now;           // Kind = Local
DateTime utc = DateTime.UtcNow;       // Kind = Utc
DateTime parsed = DateTime.Parse(s);  // Kind = Unspecified (!)

// Which timezone? Often mishandled:
if (dt > utc) { /* Bug: comparing different kinds */ }
```

`DateTimeOffset` helps but adds complexity and still allows ambiguous comparisons.

**Moment closes this gap:**
- Always represents UTC — no kind ambiguity
- Internally a single `long` (ticks since Unix epoch) — essentially a timestamp
- Extremely fast: no timezone conversions, simple arithmetic
- Compact serialization: just 8 bytes

| Issue | DateTime/DateTimeOffset | Moment |
|-------|------------------------|--------|
| Kind ambiguity | `DateTimeKind` often mishandled | Always UTC |
| Internal representation | Complex struct | Single `long` (ticks) |
| Epoch | Arbitrary (Jan 1, 0001) | Unix epoch (Jan 1, 1970) |
| Range | Year 0001–9999 | ±292 billion years |
| Serialization | Large, format-dependent | 8 bytes |


## Moment

`Moment` is a Unix-epoch based timestamp stored as ticks (100-nanosecond intervals) since January 1, 1970 UTC.

### Basic Usage

```cs
// Current time
Moment now = Moment.Now;        // From DateTime.UtcNow
Moment cpuNow = Moment.CpuNow;  // From high-resolution CPU clock

// From .NET types (implicit conversion)
Moment m1 = DateTime.UtcNow;
Moment m2 = DateTimeOffset.UtcNow;

// Back to .NET types (implicit conversion)
DateTime dt = now;
DateTimeOffset dto = now;

// Unix epoch
double unixSeconds = now.ToUnixEpoch();      // Fractional seconds
long unixSecondsInt = now.ToIntegerUnixEpoch(); // Whole seconds
```

### Arithmetic

```cs
Moment start = Moment.Now;
Moment future = start + TimeSpan.FromHours(1);
Moment past = start - TimeSpan.FromMinutes(30);
TimeSpan elapsed = future - start;

// Comparisons
if (future > start) { /* ... */ }
```

### Rounding

```cs
Moment now = Moment.Now;
TimeSpan hour = TimeSpan.FromHours(1);

Moment floored = now.Floor(hour);   // Round down to hour
Moment ceiled = now.Ceiling(hour);  // Round up to hour
Moment rounded = now.Round(hour);   // Round to nearest hour
```

### Clamping

```cs
Moment value = Moment.Now;
Moment min = Moment.Now - TimeSpan.FromDays(30);
Moment max = Moment.Now + TimeSpan.FromDays(30);

Moment clamped = value.Clamp(min, max);

// For DateTime conversion (handles range limits)
DateTime dt = value.ToDateTimeClamped();
```

### Parsing and Formatting

```cs
// Parse (ISO 8601 format)
Moment parsed = Moment.Parse("2024-01-15T10:30:00Z");
if (Moment.TryParse("2024-01-15", out var result)) { /* ... */ }

// Format (uses DateTime formatting)
string iso = moment.ToString();           // "2024-01-15T10:30:00.0000000Z"
string custom = moment.ToString("yyyy-MM-dd");
```

### Key Properties

| Property/Method | Description |
|-----------------|-------------|
| `EpochOffsetTicks` | Raw tick count since Unix epoch |
| `EpochOffset` | `TimeSpan` since Unix epoch |
| `Now` | Current time from `DateTime.UtcNow` |
| `CpuNow` | Current time from high-resolution CPU clock |
| `MinValue` / `MaxValue` | Extreme values (`long.MinValue` / `long.MaxValue` ticks) |
| `EpochStart` | Unix epoch (January 1, 1970 UTC) |


## CpuTimestamp

`CpuTimestamp` wraps `Stopwatch.GetTimestamp()` for high-resolution elapsed time measurement.
Unlike `Moment`, it's not tied to wall-clock time and is ideal for measuring durations.

### Basic Usage

```cs
CpuTimestamp start = CpuTimestamp.Now;

// Do work...

TimeSpan elapsed = start.Elapsed;  // Time since start
// Or equivalently:
TimeSpan elapsed2 = CpuTimestamp.Now - start;
```

### Arithmetic

```cs
CpuTimestamp t1 = CpuTimestamp.Now;
CpuTimestamp t2 = t1 + TimeSpan.FromSeconds(5);
TimeSpan diff = t2 - t1;

if (t2 > t1) { /* ... */ }
```

### Key Properties

| Property | Description |
|----------|-------------|
| `Value` | Raw timestamp value from `Stopwatch` |
| `Now` | Current high-resolution timestamp |
| `Elapsed` | `TimeSpan` since this timestamp |
| `TickFrequency` | Ticks per second (platform-dependent) |
| `TickDuration` | Duration of one tick in seconds |
| `PositiveInfinity` / `NegativeInfinity` | Sentinel values |


## Clocks

Clocks provide abstracted time sources, enabling testing with controlled time and supporting different precision levels.

### MomentClock

Base class for all clocks:

```cs
public abstract class MomentClock
{
    public abstract Moment Now { get; }
    public virtual Task Delay(TimeSpan dueIn, CancellationToken ct = default);

    // Time transformation (for testing with scaled time)
    public virtual Moment ToRealTime(Moment localTime);
    public virtual Moment ToLocalTime(Moment realTime);
}
```

### Built-in Clocks

| Clock | Description |
|-------|-------------|
| `SystemClock` | Uses `DateTime.UtcNow` — standard wall-clock time |
| `CpuClock` | Uses `Stopwatch` — high-resolution, monotonic |
| `CoarseSystemClock` | Cached `SystemClock` — lower precision, higher performance |
| `CoarseCpuClock` | Cached `CpuClock` — lower precision, higher performance |
| `ServerClock` | Tracks server time offset from local time |

### MomentClockSet

Groups related clocks for dependency injection:

```cs
public class MomentClockSet
{
    public MomentClock SystemClock { get; }
    public MomentClock CpuClock { get; }
    public ServerClock ServerClock { get; }
    public MomentClock CoarseSystemClock { get; }
    public MomentClock CoarseCpuClock { get; }
}

// Access via DI
public class MyService(MomentClockSet clocks)
{
    public void DoWork()
    {
        var now = clocks.SystemClock.Now;
        var cpuNow = clocks.CpuClock.Now;
    }
}

// Or via extension method
var clocks = services.Clocks();
```

### Coarse Clocks

Coarse clocks cache time values and update periodically (typically every 1-20ms).
Use them when:
- Reading time in tight loops
- Precision below ~20ms isn't needed
- Performance is critical

```cs
// High-frequency time reads
for (int i = 0; i < 1_000_000; i++) {
    var now = CoarseCpuClock.Instance.Now;  // Cached, very fast
    // vs
    var precise = CpuClock.Instance.Now;     // Calls Stopwatch each time
}
```


## Timers and Scheduling

### ConcurrentTimerSet

Manages multiple timers with a single background task:

```cs
var timers = new ConcurrentTimerSet<string>();

// Schedule a timer
timers.AddOrUpdate("task1", CpuClock.Instance.Now + TimeSpan.FromSeconds(5));

// Check for fired timers
while (timers.TryDequeue(out var key)) {
    Console.WriteLine($"Timer fired: {key}");
}
```

### RetryDelaySeq

Generates delay sequences for retry logic:

```cs
// Exponential backoff: 100ms, 200ms, 400ms, ... up to 30s
var delays = RetryDelaySeq.Exp(TimeSpan.FromMilliseconds(100), TimeSpan.FromSeconds(30));

for (int attempt = 0; attempt < 10; attempt++) {
    TimeSpan delay = delays[attempt];
    Console.WriteLine($"Attempt {attempt}: wait {delay}");
}
```

### Timeouts

Thread-safe timeout slot for tracking operation deadlines:

```cs
// Used internally by Fusion for RPC timeouts
var timeout = new GenericTimeoutSlot<MyContext>();
timeout.Start(TimeSpan.FromSeconds(30), context, handler);

// Later...
timeout.Cancel();
```


## Testing Support

The `ActualLab.Time.Testing` namespace provides test doubles:

| Type | Description |
|------|-------------|
| `TestClock` | Manually controlled clock for unit tests |

```cs
var clock = new TestClock();
clock.Now = Moment.Now;

// Advance time manually
clock.Now += TimeSpan.FromHours(1);

// Use in tests
var service = new MyService(new MomentClockSet(clock));
```


## Serialization

All time types support multiple serialization formats:

| Type | Serialized As |
|------|---------------|
| `Moment` | `long` (EpochOffsetTicks) |
| `CpuTimestamp` | `long` (Value) |

Attributes applied: `[DataContract]`, `[MemoryPackable]`, `[MessagePackObject]`, plus JSON converters.
