# Streaming with RpcStream

`RpcStream<T>` enables efficient streaming of data over RPC connections.
Unlike traditional RPC where you return a complete list, streaming allows you to:

- Send data incrementally as it becomes available
- Handle large datasets without loading everything into memory
- Build real-time data feeds
- Nest streams within other data structures


## Why RpcStream Instead of IAsyncEnumerable?

You might wonder why ActualLab.Rpc uses a dedicated `RpcStream<T>` type instead of the standard `IAsyncEnumerable<T>`. The key reasons are:

1. **Serialization control**: ActualLab.Rpc supports multiple serialization formats &ndash; System.Text.Json, Newtonsoft.Json, MemoryPack, and MessagePack. Each has different serialization behavior, and `RpcStream<T>` provides custom converters for each format to ensure streams are serialized correctly as lightweight references rather than materialized collections.

2. **Bidirectional streaming**: Unlike `IAsyncEnumerable<T>` which is read-only, `RpcStream<T>` supports both server-to-client and client-to-server streaming. The same type works in both directions.

3. **Embedding in data structures**: `RpcStream<T>` can be embedded as a property in records and classes. When these objects are serialized, the stream is serialized as a reference ID &ndash; the actual stream data flows through a separate channel. This enables nested streams (streams containing objects that contain their own streams).

4. **Flow control**: `RpcStream<T>` has built-in acknowledgment-based backpressure (`AckPeriod`, `AckAdvance`, and `BufferSize` properties) to prevent producers from overwhelming consumers.

5. **Reconnection handling**: `RpcStream<T>` integrates with ActualLab.Rpc's reconnection mechanism, allowing streams to resume after network interruptions.


## RpcStream API Overview

`RpcStream<T>` has a simple API:

| Member | Description |
|--------|-------------|
| `RpcStream.New<T>(IAsyncEnumerable<T>)` | Creates a stream from an async enumerable (server side) |
| `RpcStream.New<T>(IEnumerable<T>)` | Creates a stream from a synchronous enumerable |
| `GetAsyncEnumerator()` | Implements `IAsyncEnumerable<T>` for consumption |
| `AckPeriod` | How often the consumer sends acknowledgments (default: 30 items) |
| `AckAdvance` | Wire-level flow-control window: max items the producer may advance past the last ACK (default: 61 items) |
| `BufferSize` | Local-only sender ring buffer capacity hint (default: 0 = inherit `AckAdvance`). Set larger than `AckAdvance` to pre-buffer past the in-flight window |
| `BatchSize` | How many items are batched together for transmission (default: 64, max: 1024) |
| `AllowReconnect` | Whether the stream can resume after disconnection (default: true) |
| `IsRealTime` | Enables real-time mode with adaptive item skipping (default: false) |
| `CanSkipTo` | Predicate that determines which items can be skipped to during real-time mode (default: all items) |

::: warning Single Enumeration
Remote streams can only be enumerated once. Attempting to enumerate a remote `RpcStream<T>` multiple times will throw an exception.
:::


## Creating an RpcStream (Server Side)

Use `RpcStream.New()` to create a stream from an `IAsyncEnumerable<T>` or `IEnumerable<T>`:

```cs
public interface ISimpleService : IRpcService
{
    // Returns a table with streaming rows
    Task<Table<int>> GetTable(string title, CancellationToken cancellationToken = default);
}

// A record containing an RpcStream
[DataContract, MemoryPackable(GenerateType.VersionTolerant)]
public sealed partial record Table<T>(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Title,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] RpcStream<Row<T>> Rows);

[DataContract, MemoryPackable(GenerateType.VersionTolerant)]
public sealed partial record Row<T>(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] int Index,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] RpcStream<T> Items);
```

The implementation creates streams from async enumerables:

```cs
public class SimpleService : ISimpleService
{
    public Task<Table<int>> GetTable(string title, CancellationToken cancellationToken = default)
    {
        // Create the table with a stream of rows
        var table = new Table<int>(title, RpcStream.New(GetRows(CancellationToken.None)));
        return Task.FromResult(table);
    }

    private async IAsyncEnumerable<Row<int>> GetRows(
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        for (var i = 0; ; i++) {
            await Task.Delay(100, cancellationToken); // Simulate work
            // Each row contains its own stream of items
            yield return new Row<int>(i, RpcStream.New(GetItems(i, CancellationToken.None)));
        }
    }

    private async IAsyncEnumerable<int> GetItems(
        int index, [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        for (var i = 0; ; i++) {
            await Task.Delay(50, cancellationToken); // Simulate work
            yield return index * i;
        }
    }
}
```


## Consuming an RpcStream (Client Side)

`RpcStream<T>` implements `IAsyncEnumerable<T>`, so you can use `await foreach`:

```cs
var table = await simpleService.GetTable("My Table", cancellationToken);
Console.WriteLine($"Table: {table.Title}");

await foreach (var row in table.Rows.WithCancellation(cancellationToken)) {
    Console.WriteLine($"Row {row.Index}:");

    await foreach (var item in row.Items.WithCancellation(cancellationToken)) {
        Console.WriteLine($"  Item: {item}");

        // Break early if you've seen enough
        if (item > 100)
            break;
    }
}
```


## Sending Streams to the Server

You can also send streams **from the client to the server**:

```cs
public interface ISimpleService : IRpcService
{
    // Server receives a stream from the client and computes the sum
    Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default);
}
```

Server implementation:

```cs
public Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default)
    => stream.SumAsync(cancellationToken).AsTask();
```

Client usage:

```cs
// Create a stream from local data
var numbers = new[] { 1, 2, 3, 4, 5 };
var stream = RpcStream.New(numbers);

// Send to server for processing
var sum = await simpleService.Sum(stream, cancellationToken);
Console.WriteLine($"Sum: {sum}"); // Output: Sum: 15
```


## RpcStream Serialization

`RpcStream<T>` can be embedded in any serializable record or class.
Use the standard serialization attributes:

```cs
[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject(true)]
public sealed partial record Table<T>(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Title,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] RpcStream<Row<T>> Rows);
```

::: tip Nested Streams
RpcStream supports nesting &ndash; you can have streams of records that contain their own streams.
This is useful for hierarchical data like tables with rows, where each row has its own item stream.
:::


## Key Characteristics

| Feature | Behavior |
|---------|----------|
| **Direction** | Bidirectional &ndash; server-to-client and client-to-server |
| **Enumeration** | Remote streams can only be enumerated once |
| **Backpressure** | Built-in acknowledgment mechanism (configurable via `AckPeriod`, `AckAdvance`, and `BufferSize`) |
| **Cancellation** | Streams can be cancelled from either end |
| **Nesting** | Streams can be nested within other data structures |
| **Reconnection** | Streams handle reconnection gracefully (configurable via `AllowReconnect`) |


## Configuration Options

`RpcStream<T>` has configurable properties for flow control and reconnection behavior:

| Property | Default | Description |
|----------|---------|-------------|
| `AckPeriod` | 30 | How often the client sends acknowledgments (every N items) |
| `AckAdvance` | 61 | Wire-level flow-control window &ndash; max items the producer may advance past the last ACK |
| `BufferSize` | 0 | Local sender ring buffer capacity hint. `0` means "inherit `AckAdvance`" |
| `BatchSize` | 64 | How many items are batched together for transmission (max: 1024) |
| `AllowReconnect` | true | Whether the stream can resume after a connection disruption |
| `IsRealTime` | false | Enables real-time mode: drops items instead of applying backpressure |
| `CanSkipTo` | `_ => true` | Predicate controlling which items are valid skip targets in real-time mode |

These defaults work well for most scenarios. Adjust them if you need different throughput/latency tradeoffs.

::: tip AckAdvance vs BufferSize
`AckAdvance` is the **wire-level flow-control window**: the producer can have at most `AckAdvance` items in flight (sent but not yet acknowledged). `BufferSize` is a **local-only** hint controlling the sender's in-memory ring buffer. When `BufferSize > AckAdvance`, real-time streams pre-buffer items past the in-flight window so a freshly arrived ACK can be served from RAM instead of waiting on the source. `BufferSize` smaller than `AckAdvance` (and non-zero) is clamped up to `AckAdvance` and logs a warning.
:::

::: tip BatchSize
`BatchSize` controls how many items are grouped together in a single network message. Larger batches reduce network overhead but increase latency for the first items. Unlike `AckPeriod` and `AckAdvance`, neither `BatchSize` nor `BufferSize` is serialized &ndash; both are local configuration that only affect the sending side.
:::


## Reconnection Behavior

By default, `RpcStream<T>` handles network disconnections gracefully. When a connection is temporarily lost, the stream automatically resumes from where it left off once the connection is re-established.

### AllowReconnect Property

The `AllowReconnect` property controls whether a stream can resume after a disconnection:

```cs
// Default: stream can reconnect after network disruption
var reconnectableStream = RpcStream.New(GetItems());

// Disable reconnection: stream will fail if connection is lost
var nonReconnectableStream = RpcStream.New(GetItems(), allowReconnect: false);
```

When `AllowReconnect` is `false`:
- The client stream will throw `RpcStreamNotFoundException` immediately when the peer disconnects
- The server-side shared stream is disposed instantly on disconnection
- Use this for streams where resuming from an intermediate position doesn't make sense
- Examples: real-time event streams, live data feeds where missed items are unrecoverable

### RpcStreamNotFoundException

`RpcStreamNotFoundException` is thrown when a stream cannot be found or has been disconnected:

| Scenario | Description |
|----------|-------------|
| **Non-reconnectable stream** | A stream with `AllowReconnect = false` throws this exception immediately when the peer disconnects |
| **Stream not found** | The server no longer has the stream registered (e.g., it was disposed or timed out) |
| **Host mismatch** | After reconnection, the client connects to a different server instance that doesn't have this stream |

Handle this exception when consuming streams that might be non-reconnectable or long-lived:

```cs
try {
    await foreach (var item in stream.WithCancellation(cancellationToken)) {
        Process(item);
    }
}
catch (RpcStreamNotFoundException) {
    // Stream was disconnected and cannot be resumed
    // Consider re-fetching the stream from the server
}
```


## Real-Time Streaming

For latency-sensitive streams like live video, audio, or sensor data, you can enable **real-time mode**. In this mode, when the consumer falls behind (backpressure ceiling is hit), the producer **drops items** instead of waiting &ndash; ensuring the consumer always gets the freshest data.

### IsRealTime and CanSkipTo

```cs
// Real-time stream that skips to keyframes when the consumer is slow
var stream = new RpcStream<VideoFrame>(source) {
    IsRealTime = true,
    CanSkipTo = frame => frame.IsKeyFrame,  // Only skip to keyframes
};

// Real-time stream that can skip to any item (default)
var stream = new RpcStream<SensorReading>(source) {
    IsRealTime = true,
    // CanSkipTo defaults to _ => true
};
```

When `IsRealTime` is `true`:
- If the producer reaches the `AckAdvance` window ahead of the consumer's last acknowledgment, it waits for an ACK
- When the consumer acknowledges progress, the sender may compact the already-buffered unsent suffix
- Compaction can skip only to an item where `CanSkipTo` returns `true`; it does not pull ahead just to discover a future skip target
- Once compaction is done, normal sending resumes from that buffered skip target
- Setting `BufferSize > AckAdvance` lets the sender pre-buffer items past the in-flight window, so a freshly arrived ACK is served from RAM rather than waiting on the source

`CanSkipTo` is a local predicate — it is **not serialized** across RPC and is only applied on the side that constructs the stream. The remote side has no knowledge of it. Common patterns:
- `_ => true` (default) &ndash; any item is a valid skip target
- `frame => frame.IsKeyFrame` &ndash; only skip to video keyframes
- `x => x % 10 == 0` &ndash; skip to every 10th item

::: tip CanSkipTo and Video Streaming
For video streams, set `CanSkipTo` to match your keyframe interval. This ensures that when frames are dropped due to a slow consumer, playback resumes from a keyframe rather than a delta frame that would produce visual artifacts.
:::

### Real-Time Reconnection

When `IsRealTime` and `AllowReconnect` are both `true`, reconnection behavior is optimized for freshness:

1. On reconnect, the server-side buffer of pre-disconnect items is **cleared** (they are stale)
2. The source is drained until the next item where `CanSkipTo` returns `true`
3. Streaming resumes from that fresh skip target

This means after a network disruption, the consumer receives the freshest available data rather than stale buffered items from before the disconnect.

```cs
// A reconnectable real-time stream with keyframe skipping
var stream = new RpcStream<VideoFrame>(source) {
    IsRealTime = true,
    AllowReconnect = true,
    CanSkipTo = frame => frame.IsKeyFrame,
};
```

### TypeScript

In TypeScript, `RpcStream` is dual-mode &ndash; the same class works on both the origin (server) and target (client) side, matching the .NET design:

```ts
// Server-side: create a local RpcStream with configuration
const stream = new RpcStream(source, {
    isRealTime: true,
    canSkipTo: (frame) => frame.isKeyFrame,
    ackPeriod: 30,
    ackAdvance: 61,
    // bufferSize is optional and defaults to ackAdvance; set larger to
    // pre-buffer past the in-flight window in real-time mode.
    // bufferSize: 200,
});

// Return from a service method — the framework calls toRef() automatically
async getVideoStream() {
    return new RpcStream(this.captureFrames(), { isRealTime: true });
}

// Client-side: RpcStream is created automatically from stream references
const stream = await client.getVideoStream();
console.log(stream.isRealTime); // true (propagated from server)
for await (const frame of stream) { /* ... */ }
```

**`toRef(peer)`** &ndash; binds a local stream to a peer, creates an `RpcStreamSender`, registers it, starts pumping items in the background, and returns the serialized stream reference. Called automatically by the framework when a service method returns an `RpcStream`, but can also be called manually.

**`whenSent`** &ndash; a `Promise` that resolves when the sender finishes pumping all items (after `toRef()` was called). Useful for tracking completion or catching source errors on the server side.

When a service method returns a local `RpcStream`, the RPC framework wraps raw `AsyncIterable` results in an `RpcStream` with defaults, then calls `toRef(peer)`. If you need custom sending behavior, you can create an `RpcStreamSender` directly &ndash; it remains a public API.


## Complete Example

See the [TodoApp RpcExamplePage](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/Pages/RpcExamplePage.razor) for a complete working example demonstrating:
- Server-to-client streaming with nested streams
- Client-to-server streaming for computation
- Real-time UI updates as stream data arrives

The example streams a table where:
- Each row arrives incrementally
- Each row contains its own stream of items
- The client can compute sums by streaming data back to the server
