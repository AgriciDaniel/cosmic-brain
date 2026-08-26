# ActualLab.Fusion vs gRPC Streaming

gRPC is Google's high-performance RPC framework with support for streaming. Both Fusion and gRPC enable efficient client-server communication, but they serve different purposes.

## The Core Difference

**gRPC** is a transport and serialization layer with streaming support. You define services in Protobuf, and gRPC handles efficient binary communication. Streaming is explicit — you decide when to push data.

**Fusion** is a caching and synchronization layer. It offers two models: (1) traditional RPC streaming via `RpcStream<T>` for explicit data streams, and (2) invalidation-based updates where clients observe computed values and automatically receive new data when values change.

## gRPC Streaming Approach

```protobuf
service StockService {
    rpc WatchPrice (PriceRequest) returns (stream PriceUpdate);
}
```

```csharp
// Server
public override async Task WatchPrice(PriceRequest request,
    IServerStreamWriter<PriceUpdate> stream, ServerCallContext context)
{
    while (!context.CancellationToken.IsCancellationRequested)
    {
        var price = await GetCurrentPrice(request.Symbol);
        await stream.WriteAsync(new PriceUpdate { Price = price });
        await Task.Delay(1000); // You decide the update frequency
    }
}

// Client
var stream = client.WatchPrice(new PriceRequest { Symbol = "AAPL" });
await foreach (var update in stream.ResponseStream.ReadAllAsync())
    Console.WriteLine($"Price: {update.Price}");
```

## Fusion Approaches

### Option 1: RpcStream for Explicit Streaming

```csharp
// Server - explicit streaming like gRPC
public class StockService : IStockService
{
    public async Task<RpcStream<StockQuote>> WatchPrices(string[] symbols, CancellationToken ct)
    {
        var channel = Channel.CreateUnbounded<StockQuote>();
        _ = Task.Run(async () => {
            while (!ct.IsCancellationRequested)
            {
                foreach (var symbol in symbols)
                    await channel.Writer.WriteAsync(await GetQuote(symbol), ct);
                await Task.Delay(1000, ct);
            }
        });
        return channel.ToRpcStream();
    }
}

// Client
await foreach (var quote in stockService.WatchPrices(["AAPL", "GOOG"], ct))
    Console.WriteLine($"{quote.Symbol}: {quote.Price}");
```

### Option 2: Invalidation-Based Updates

```csharp
// Server - automatic updates via invalidation
public class StockService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<decimal> GetPrice(string symbol, CancellationToken ct)
        => await _priceProvider.GetPrice(symbol, ct);
}

// Client - notified when value changes
var computed = await Computed.Capture(() => stockService.GetPrice("AAPL"));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"Price: {c.Value}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- Both explicit streaming (`RpcStream`) and change notifications
- Built-in caching with dependency-based invalidation
- Shared C# interfaces between client and server (no Protobuf translation)
- Reconnection that automatically restores state
- UI synchronization in .NET applications

### gRPC is better at

- Language-agnostic services (Protobuf across Go, Java, Python, etc.)
- Precise control over streaming frequency and timing
- Schema evolution with Protobuf contracts
- Building polyglot microservices
- Wide ecosystem and mature tooling

## Streaming Models Compared

| Aspect | gRPC Streaming | Fusion |
|--------|----------------|--------|
| Explicit streaming | `IServerStreamWriter<T>` | `RpcStream<T>` |
| Change notifications | Not built-in | `Computed.Changes()` |
| Push model | Explicit `WriteAsync` | Both explicit and automatic |
| Caching | None (you implement) | Built-in with dependencies |
| Multiple observers | One stream per client | Shared computed, individual notifications |
| Reconnection | Manual resync | Automatic catch-up |

## When to Use Each

### Choose gRPC when:
- Interoperability with non-.NET services (Go, Java, Python)
- You need precise control over streaming frequency
- Protobuf schema evolution is important
- You're building microservices that span languages

### Choose Fusion when:
- Building .NET applications (especially Blazor)
- You want caching with automatic real-time updates
- Data has complex dependencies (A depends on B depends on C)
- You prefer shared C# interfaces over Protobuf definitions

### Hybrid Approach

You can use both:
- **gRPC** for cross-service communication in a polyglot backend
- **Fusion** for client-facing real-time features

```csharp
// Fusion service that calls gRPC internally
public class StockService : IComputeService
{
    private readonly StockGrpcClient _grpcClient;

    [ComputeMethod]
    public virtual async Task<decimal> GetPrice(string symbol, CancellationToken ct)
    {
        // Call gRPC backend, cache and track dependencies with Fusion
        var response = await _grpcClient.GetPriceAsync(new PriceRequest { Symbol = symbol });
        return response.Price;
    }
}
```

## Performance

ActualLab.Rpc (Fusion's RPC layer) outperforms gRPC in benchmarks:

| Benchmark | ActualLab.Rpc | gRPC | Speedup |
|-----------|---------------|------|---------|
| RPC calls (Sum) | 10.16M calls/s | 1.29M calls/s | ~7.9x |
| RPC calls (GetUser) | 9.03M calls/s | 1.26M calls/s | ~7.2x |
| Streaming (1-byte items) | 96.96M items/s | 43.78M items/s | ~2.2x |
| Streaming (100-byte items) | 43.01M items/s | 25.87M items/s | ~1.7x |
| Streaming (10KB items) | 820.08K items/s | 572.76K items/s | ~1.4x |

See [Performance Benchmarks](/Performance) for full details and test environment.

## The Key Insight

gRPC streaming is **push-based** — you explicitly send updates via Protobuf-defined services.

Fusion offers **both models**: explicit `RpcStream<T>` streaming when you need it, plus automatic invalidation-based updates for computed values. The key advantage is that C# interfaces serve as your API contract — no Protobuf translation layer needed between client and server.
