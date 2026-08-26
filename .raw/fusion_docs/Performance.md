# Performance

**Updated:** 2026-04-25<br/>
**ActualLab.Fusion Version:** 12.3.76

This page summarizes results of Fusion performance benchmarks.

## Test Environment

| Component | Specification |
|-----------|---------------|
| **CPU** | AMD Ryzen 9 9950X3D 16-Core Processor |
| **RAM** | 96 GB DDR5 |
| **OS** | Windows 11 |
| **.NET** | 10.0.7 |

Note that Ryzen 9 9950X3D has 32 logical cores due to SMT.

## Run-PerformanceTest.cmd from Fusion Test suite

The benchmark measures throughput of a simple repository-style user lookup service (`UserService.Get(userId)`) that retrieves user records from a database. The test compares two scenarios:

1. **With Fusion**: `UserService.Get` is a `[ComputeMethod]`, so its results are
   cached, and thus a majority of database calls are avoided (unless they happen right after a mutation).

2. **Without Fusion**: `UserService.Get` is a regular method, so every call to it executes a simple SQL query.

### Test Scenarios

- **Multiple readers, 1 mutator**: Simulates a realistic high-intensity workload with ~640 concurrent reader tasks (20 per CPU core) performing lookups, while a single mutator task periodically updates random user records. This tests how well Fusion handles cache invalidation under concurrent load.

- **Single reader, no mutators**: A single task performs sequential lookups with
  no concurrent mutations. This measures the peak lookup throughput per CPU core.

The test uses a pool of 1,000 pre-populated user records. Each run performs
multiple iterations, and the best result from 3 runs is reported.

## Results

### Multiple Readers + 1 Mutator (all cores)

| Test | SQLite | PostgreSQL |
|------|--------|------------|
| Without Fusion | 155.68K calls/s | 38.61K calls/s |
| With Fusion | 316.34M calls/s | 313.75M calls/s |
| **Speedup** | <span style="color: #22c55e; font-weight: bold;">2,032x</span> | <span style="color: #22c55e; font-weight: bold;">8,126x</span> |

### Single Reader, No Mutators

| Test | SQLite | PostgreSQL |
|------|--------|------------|
| Without Fusion | 55.70K calls/s | 1.78K calls/s |
| With Fusion | 19.54M calls/s | 19.66M calls/s |
| **Speedup** | <span style="color: #22c55e; font-weight: bold;">351x</span> | <span style="color: #22c55e; font-weight: bold;">11,045x</span> |

### Key Observations

- **With Fusion + concurrent readers**: ~315M calls/s regardless of the database,
  because most calls are served from Fusion's in-memory cache.
  This is approximately <span style="color: #22c55e; font-weight: bold;">2,000x faster</span> than direct PostgreSQL access
  and <span style="color: #22c55e; font-weight: bold;">8,000x faster</span> than the single-reader baseline without Fusion.

- **Without Fusion**: Performance is entirely database-bound.
  SQLite (in-process) outperforms PostgreSQL (network round-trip) significantly,
  especially for single-threaded access.

- **Concurrent access amplifies the difference**: With many readers, Fusion's
  lock-free cache scales linearly with CPU cores, while database access becomes
  the bottleneck.

## Benchmark.cmd from ActualLab.Fusion.Samples

The benchmark measures throughput of a simple repository-style user lookup service that retrieves and updates user records from a database: `UserService.Get(userId)` and `Update(userId, ...)`.

### Local Services

| Test | Result | Speedup |
|------|--------|---------|
| Regular Service | 118.15K calls/s | |
| Fusion Service | 261.32M calls/s | <span style="color: #22c55e; font-weight: bold;">~2,212x</span> |

### Remote Services

| Test | Result | Speedup |
|------|--------|---------|
| HTTP Client → Regular Service | 80.43K calls/s | |
| HTTP Client → Fusion Service | 393.65K calls/s | <span style="color: #22c55e; font-weight: bold;">~4.9x</span> |
| ActualLab.Rpc Client → Fusion Service | 7.92M calls/s | <span style="color: #22c55e; font-weight: bold;">~98x</span> |
| Fusion Client → Fusion Service | 215.45M calls/s | <span style="color: #22c55e; font-weight: bold;">~2,679x</span> |

## RpcBenchmark.cmd from ActualLab.Fusion.Samples

This benchmark compares **ActualLab.Rpc** with **gRPC**, **SignalR**, and other RPC frameworks.
The tables below include only **ActualLab.Rpc**, **gRPC**, and **SignalR**.
Other options, such as **StreamJsonRpc** and **RESTful API**, are way slower, so we omit them.

### Calls

| Test | ActualLab.Rpc | gRPC | SignalR | Speedup |
|------|---------------|------|---------|---------|
| Sum | **10.16M calls/s** | 1.29M calls/s | 5.31M calls/s | <span style="color: #22c55e; font-weight: bold;">1.9..7.9x</span> |
| GetUser | **9.03M calls/s** | 1.26M calls/s | 4.43M calls/s | <span style="color: #22c55e; font-weight: bold;">2.0..7.2x</span> |
| SayHello | **6.16M calls/s** | 1.18M calls/s | 2.24M calls/s | <span style="color: #22c55e; font-weight: bold;">2.7..5.2x</span> |

<ClientOnly>
  <BarChart
    title="RPC Calls (Million/s)"
    :labels="['Sum', 'GetUser', 'SayHello']"
    :datasets="[
      { label: 'ActualLab.Rpc', data: [10.16, 9.03, 6.16], backgroundColor: '#22c55e' },
      { label: 'SignalR', data: [5.31, 4.43, 2.24], backgroundColor: '#3b82f6' },
      { label: 'gRPC', data: [1.29, 1.26, 1.18], backgroundColor: '#f59e0b' }
    ]"
    :yMax="11"
    yLabel="M calls/s"
  />
</ClientOnly>

### Call Latency Under Peak Throughput

| Framework | Sum (p50 / p95 / p99) | GetUser (p50 / p95 / p99) | SayHello (p50 / p95 / p99) |
|-----------|-----------------------|---------------------------|----------------------------|
| ActualLab.Rpc | **2.0ms** / **2.7ms** / **6.4ms** | **2.2ms** / **3.1ms** / **8.7ms** | **3.2ms** / **4.3ms** / **10.4ms** |
| gRPC | 3.3ms / 5.1ms / 13.7ms | 3.3ms / 5.9ms / 16.7ms | 3.5ms / 4.7ms / 14.2ms |
| SignalR | 3.9ms / 8.1ms / 11.1ms | 4.6ms / 5.8ms / 11.1ms | 9.0ms / 12.8ms / 15.0ms |

### Streams

| Test | ActualLab.Rpc | gRPC | SignalR | Speedup |
|------|---------------|------|---------|---------|
| Stream1 | **96.96M items/s** | 43.78M items/s | 18.30M items/s | <span style="color: #22c55e; font-weight: bold;">2.2..5.3x</span> |
| Stream100 | **43.01M items/s** | 25.87M items/s | 14.25M items/s | <span style="color: #22c55e; font-weight: bold;">1.7..3.0x</span> |
| Stream10K | **820.08K items/s** | 572.76K items/s | 414.72K items/s | <span style="color: #22c55e; font-weight: bold;">1.4..2.0x</span> |

Test names indicate item size: Stream1 = 1-byte items, Stream100 = 100-byte items, Stream10K = 10KB items.

### Throughput (items/s × item size)

| Test | ActualLab.Rpc | gRPC | SignalR |
|------|---------------|------|---------|
| Stream1 | **96.96 MB/s** | 43.78 MB/s | 18.30 MB/s |
| Stream100 | **4.30 GB/s** | 2.59 GB/s | 1.43 GB/s |
| Stream10K | **8.40 GB/s** | 5.86 GB/s | 4.25 GB/s |

<ClientOnly>
  <BarChart
    title="RPC Streams Throughput (GB/s)"
    :labels="['Stream100', 'Stream10K']"
    :datasets="[
      { label: 'ActualLab.Rpc', data: [4.30, 8.40], backgroundColor: '#22c55e' },
      { label: 'gRPC', data: [2.59, 5.86], backgroundColor: '#f59e0b' },
      { label: 'SignalR', data: [1.43, 4.25], backgroundColor: '#3b82f6' }
    ]"
    :yMax="10"
    yLabel="GB/s"
  />
</ClientOnly>

## Docker-Based RPC Benchmarks

These benchmarks run in Docker containers with CPU limits to measure **4-core server performance**.
The server container is limited to 4 CPUs while client containers have 24 CPUs available,
ensuring the server is the bottleneck. This setup matches [grpc_bench](https://github.com/LesnyRumcajs/grpc_bench), `SayHello` w/ `gRPC` is identical to what `grpc_bench` measures.

### Docker Calls

| Framework | Sum | GetUser | SayHello |
|-----------|-----|---------|----------|
| ActualLab.Rpc | **4.75M calls/s** | **4.38M calls/s** | **2.52M calls/s** |
| SignalR | 2.23M calls/s | 1.82M calls/s | 842.45K calls/s |
| gRPC | 437.85K calls/s | 441.44K calls/s | 399.32K calls/s |
| MagicOnion | 392.59K calls/s | 402.85K calls/s | 362.84K calls/s |
| StreamJsonRpc | 265.72K calls/s | 226.77K calls/s | 99.09K calls/s |
| HTTP | 105.25K calls/s | 103.12K calls/s | 88.18K calls/s |

<ClientOnly>
  <BarChart
    title="Docker RPC Calls - 4 CPU Server (Million/s)"
    :labels="['Sum', 'GetUser', 'SayHello']"
    :datasets="[
      { label: 'ActualLab.Rpc', data: [4.75, 4.38, 2.52], backgroundColor: '#22c55e' },
      { label: 'SignalR', data: [2.23, 1.82, 0.84], backgroundColor: '#3b82f6' },
      { label: 'gRPC', data: [0.44, 0.44, 0.40], backgroundColor: '#f59e0b' },
      { label: 'MagicOnion', data: [0.39, 0.40, 0.36], backgroundColor: '#a855f7' },
      { label: 'StreamJsonRpc', data: [0.27, 0.23, 0.10], backgroundColor: '#ec4899' },
      { label: 'HTTP', data: [0.11, 0.10, 0.09], backgroundColor: '#6b7280' }
    ]"
    :yMax="5"
    yLabel="M calls/s"
  />
</ClientOnly>

### Docker Call Latency Under Peak Throughput

| Framework | Sum (p50 / p95 / p99) | GetUser (p50 / p95 / p99) | SayHello (p50 / p95 / p99) |
|-----------|-----------------------|---------------------------|----------------------------|
| ActualLab.Rpc | 3.8ms / **8.1ms** / **23.7ms** | 4.3ms / 7.6ms / **16.2ms** | 6.5ms / 35.5ms / 39.9ms |
| SignalR | 5.2ms / 12.2ms / 50.7ms | 7.0ms / 12.0ms / 37.3ms | 19.9ms / 51.0ms / 58.1ms |
| gRPC | **3.3ms** / 32.3ms / 45.4ms | **3.5ms** / **6.8ms** / 32.1ms | **4.2ms** / 9.6ms / 36.2ms |
| MagicOnion | 4.5ms / 8.3ms / 24.1ms | 5.0ms / 10.8ms / 23.1ms | 5.5ms / **8.8ms** / **12.3ms** |
| StreamJsonRpc | 43.4ms / 56.4ms / 59.6ms | 58.9ms / 70.1ms / 72.5ms | 107.3ms / 212.3ms / 222.0ms |
| HTTP | 33.9ms / 51.4ms / 54.9ms | 34.2ms / 44.3ms / 45.9ms | 30.4ms / 44.0ms / 45.5ms |

### Docker Streams

Test names indicate item size: Stream1 = 1-byte items, Stream100 = 100-byte items, Stream10K = 10KB items.

| Framework | Stream1 | Stream100 | Stream10K |
|-----------|---------|-----------|-----------|
| ActualLab.Rpc | **31.80M items/s** | **12.66M items/s** | **279.72K items/s** |
| gRPC | 11.27M items/s | 6.04M items/s | 125.64K items/s |
| SignalR | 5.42M items/s | 3.62M items/s | 106.20K items/s |
| StreamJsonRpc | 115.20K items/s | 115.20K items/s | 0 items/s |

<ClientOnly>
  <BarChart
    title="Docker RPC Streams - 4 CPU Server (Million items/s)"
    :labels="['Stream1', 'Stream100']"
    :datasets="[
      { label: 'ActualLab.Rpc', data: [31.80, 12.66], backgroundColor: '#22c55e' },
      { label: 'gRPC', data: [11.27, 6.04], backgroundColor: '#f59e0b' },
      { label: 'SignalR', data: [5.42, 3.62], backgroundColor: '#3b82f6' },
      { label: 'StreamJsonRpc', data: [0.12, 0.12], backgroundColor: '#ec4899' }
    ]"
    :yMax="34"
    yLabel="M items/s"
  />
</ClientOnly>

## Reference: Redis Benchmark

Reference benchmark using `redis-benchmark` tool on the same machine (500K requests, best of 5 runs). Optimal client count (12) was determined via binary search over 1-1000 range.

| Operation | Result |
|-----------|--------|
| PING_INLINE | 231.59K req/s |
| GET | 229.25K req/s |
| SET | 229.67K req/s |
