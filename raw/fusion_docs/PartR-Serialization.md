# RPC Serialization Formats

ActualLab.Rpc supports multiple serialization formats with automatic version negotiation between clients and servers.
This enables gradual upgrades and interoperability between different Fusion versions.

## Overview

RPC serialization has two layers:

1. **Argument serialization**: How method arguments are encoded
2. **Message serialization**: How RPC messages (containing arguments) are framed

Each combination of these is packaged as an `RpcSerializationFormat`.


## Available Formats

### Text Formats (JSON)

| Format | Key | Description |
|--------|-----|-------------|
| `SystemJsonV5` | `json5` | System.Text.Json with V4 arguments, V3 messages |
| `SystemJsonV5NP` | `json5np` | System.Text.Json, no-polymorphism variant (plain JSON, no `TypeRef` wrapper) |
| `NewtonsoftJsonV5` | `njson5` | Newtonsoft.Json with V4 arguments, V3 messages |
| `NewtonsoftJsonV5NP` | `njson5np` | Newtonsoft.Json, no-polymorphism variant (plain JSON, no `TypeRef` wrapper) |

The "NP" (no-polymorphism) variants skip the type-decorating `TypeRef` wrapper entirely, producing plain JSON without type metadata. Use them when all argument and result types are concrete (non-abstract) and no polymorphic dispatch is needed.

### Binary Formats (MemoryPack)

| Format          | Key | Description           |
|-----------------|-----|-----------------------|
| `MemoryPackV5`  | `mempack5` | V4 args, V4 messages  |
| `MemoryPackV5C` | `mempack5c` | Compact variant of V5 |
| `MemoryPackV6`  | `mempack5` | V4 args, V5 messages  |
| `MemoryPackV6C` | `mempack5c` | Compact variant of V5 |

### Binary Formats (MessagePack)

| Format           | Key | Description           |
|------------------|-----|-----------------------|
| `MessagePackV5`  | `msgpack5` | V4 args, V4 messages  |
| `MessagePackV5C` | `msgpack5c` | Compact variant of V5 |
| `MessagePackV6`  | `msgpack5` | V4 args, V5 messages  |
| `MessagePackV6C` | `msgpack5c` | Compact variant of V5 |

### Binary Formats (Nerdbank.MessagePack)

These formats require the `ActualLab.Serialization.NerdbankMessagePack` package.
They are not registered by default &mdash; call `RpcNerdbankSerializationFormat.Register()` at startup to enable them.

| Format                  | Key          | Description                       |
|-------------------------|--------------|-----------------------------------|
| `NerdbankMessagePackV6` | `nmsgpack6`  | Nerdbank.MessagePack, V4 args, V5 messages |
| `NerdbankMessagePackV6C`| `nmsgpack6c` | Compact variant of V6             |

## Format Selection

### Default Format

The default format is typically `MemoryPackV5C` (or latest version) for .NET 6+ and `MessagePackV5C` for .NET Standard.

### Client-Server Negotiation

When a client connects, it requests its preferred serialization format via a URL parameter (e.g., `<endpoint>?f=msgpack6&clientId=...`). The server accepts the connection if it supports that format. Once connected, both parties simultaneously exchange `RpcHandshake` messages:

<img src="/img/diagrams/PartR-Serialization-1.svg" alt="Client-Server Negotiation" style="width: 100%; max-width: 800px;" />

### Accessing All Formats

<!-- snippet: PartRSerialization_AccessingFormats -->
```cs
// All registered formats
ImmutableList<RpcSerializationFormat> all = RpcSerializationFormat.All;

// Find by key
var format = RpcSerializationFormat.All.First(f => f.Key == "mempack6c");
```
<!-- endSnippet -->


## Format Structure

Each `RpcSerializationFormat` consists of:

<!-- snippet: PartRSerialization_FormatStructure -->
```cs
public sealed class RpcSerializationFormatExample(
    string key,
    Func<RpcArgumentSerializer> argumentSerializerFactory,
    Func<RpcPeer, RpcMessageSerializer> messageSerializerFactory)
{
    public string Key { get; } = key;
    public RpcArgumentSerializer ArgumentSerializer { get; } = argumentSerializerFactory();
    public Func<RpcPeer, RpcMessageSerializer> MessageSerializerFactory { get; } = messageSerializerFactory;
}
```
<!-- endSnippet -->

| Property | Description |
|----------|-------------|
| `Key` | Unique string identifier for negotiation |
| `ArgumentSerializer` | Serializes method arguments |
| `MessageSerializerFactory` | Creates message serializers per peer |


## Version Differences

### Argument Serializer Versions

| Version | Description |
|---------|-------------|
| V4      | Latest, best performance |

### Message Serializer Versions

| Version | Variants | Description                      |
|---------|----------|----------------------------------|
| V4      | Normal, Compact | Was optimal up to Fusion v11.5.X |
| V5      | Normal, Compact | Saves 1 byte per message over V4 |

### Compact vs Normal

Compact variants (`*C` suffix) use smaller message framing at a slight CPU cost. Choose compact for:
- Lower bandwidth scenarios
- When message overhead is significant relative to payload


## Configuring Formats

### Enabling Nerdbank.MessagePack Formats

Add the `ActualLab.Serialization.NerdbankMessagePack` package and call `Register()` at startup:

```cs
// Register nmsgpack6 / nmsgpack6c formats
RpcNerdbankSerializationFormat.Register();
```

### Registering Additional Formats

<!-- snippet: PartRSerialization_RegisterFormat -->
```cs
RpcSerializationFormat.All = RpcSerializationFormat.All.Add(
    new RpcSerializationFormat(
        "custom",
        () => new MyArgumentSerializer(),
        peer => new MyMessageSerializer(peer)));
```
<!-- endSnippet -->

### Removing Formats

To disable older formats for security:

<!-- snippet: PartRSerialization_RemoveFormats -->
```cs
// To disable older formats for security:
RpcSerializationFormat.All = RpcSerializationFormat.All
    .RemoveAll(f => f.Key.StartsWith("mempack5") || f.Key.StartsWith("msgpack5"));
```
<!-- endSnippet -->


## Format Selection Factors

When choosing formats, consider:

| Factor | Recommendation |
|--------|----------------|
| Performance | Binary formats (MemoryPack > MessagePack > JSON) |
| Debugging | JSON formats (human-readable) |
| Compatibility | MessagePack for .NET Standard clients |
| Bandwidth | Compact variants (`*C`) |
| Security | Latest versions, disable V1 |


## Serialization in RPC Pipeline

<img src="/img/diagrams/PartR-Serialization-2.svg" alt="Serialization in RPC Pipeline" style="width: 100%; max-width: 800px;" />

1. Client serializes method arguments using `ArgumentSerializer`
2. Arguments are wrapped in an `RpcMessage` and serialized by `MessageSerializer`
3. Binary data is sent over WebSocket
4. Server deserializes in reverse order


## Polymorphic Serialization

By default, ActualLab.Rpc treats abstract types and `object` as polymorphic.
When a method argument or result is polymorphic, the serializer wraps it with a `TypeRef`
so the actual runtime type can be restored on the other side.

This is determined by `RpcArgumentSerializer.IsPolymorphic(Type)`:

```cs
// These are considered polymorphic by default:
IsPolymorphic(typeof(ITuple))  // true - it's an interface (abstract)
IsPolymorphic(typeof(object))  // true

// Concrete types are not:
IsPolymorphic(typeof(string))  // false
IsPolymorphic(typeof(int))     // false
```

### Opting Out with `[RpcSerializable]`

When the underlying serializer already handles polymorphism
(e.g., via `[JsonDerivedType]`, `[MemoryPackUnion]`, or `[Union]`),
the RPC layer's `TypeRef` wrapping is redundant overhead.
Apply `[RpcSerializable]` to the base type to tell RPC that
the type can be serialized directly:

<!-- snippet: PartRSerialization_RpcSerializableAttribute -->
```cs
// The underlying serializers handle polymorphism via union attributes,
// so we mark this type as RPC-serializable to opt out of TypeRef wrapping.
[RpcSerializable]
[MemoryPackable]
[MemoryPackUnion(0, typeof(ShapeCircle))]
[MemoryPackUnion(1, typeof(ShapeRect))]
[MessagePackObject]
[Union(0, typeof(ShapeCircle))]
[Union(1, typeof(ShapeRect))]
[JsonDerivedType(typeof(ShapeCircle), "circle")]
[JsonDerivedType(typeof(ShapeRect), "rect")]
public abstract partial class Shape
{
    [DataMember, MemoryPackOrder(0), Key(0)]
    public string? Name { get; set; }
}

[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject]
public partial class ShapeCircle : Shape
{
    [DataMember, MemoryPackOrder(1), Key(1)]
    public double Radius { get; set; }
}

[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject]
public partial class ShapeRect : Shape
{
    [DataMember, MemoryPackOrder(1), Key(1)]
    public double Width { get; set; }

    [DataMember, MemoryPackOrder(2), Key(2)]
    public double Height { get; set; }
}
```
<!-- endSnippet -->

With this attribute, `RpcArgumentSerializer.IsPolymorphic(typeof(Shape))` returns `false`,
so methods like `Task<Shape> GetShape(...)` use regular serialization.
The discriminated union support in each serializer takes care of preserving
the actual runtime type.

The attribute uses `Inherited = true`, so derived types also inherit the opt-out.

### When to Use

Use `[RpcSerializable]` when:

- Your abstract base type or interface has serializer-level union support
  (`[JsonDerivedType]`, `[MemoryPackUnion]`, `[Union]`)
- You want to avoid the overhead of RPC's `TypeRef` wrapping
- All concrete subtypes are declared in the union configuration


## Related Topics

- [Core Serialization](./PartS.md) - General serialization infrastructure
- [RPC Key Concepts](./PartR-CC.md) - RPC architecture overview
- [Configuration Options](./PartR-CO.md) - RPC configuration
