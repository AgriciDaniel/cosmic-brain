# Unified Serialization

ActualLab provides a unified serialization infrastructure used throughout Fusion, RPC, and the Operations Framework.
This guide covers the core serialization APIs, type-decorated serialization for polymorphism, lazy serialization
wrappers, and how to configure serialization globally.

## Required Package

| Package | Purpose |
|---------|---------|
| [ActualLab.Core](https://www.nuget.org/packages/ActualLab.Core/) | Core serialization infrastructure |

## Overview

The serialization infrastructure provides:

- **Multiple format support**: System.Text.Json, Newtonsoft.Json, MemoryPack, and MessagePack
- **Type-decorated serialization**: Preserves type information for polymorphic deserialization
- **Lazy serialization wrappers**: Defer serialization/deserialization until needed
- **Multi-format types**: Single type that works with any serializer (for cross-format scenarios)


## Core Abstractions

### IByteSerializer

Binary serializers implement `IByteSerializer`:

<!-- snippet: PartS_IByteSerializer -->
```cs
public interface IByteSerializer
{
    object? Read(ReadOnlyMemory<byte> data, Type type, out int readLength);
    void Write(IBufferWriter<byte> bufferWriter, object? value, Type type);
}
```
<!-- endSnippet -->

### ITextSerializer

Text (JSON) serializers implement `ITextSerializer`:

<!-- snippet: PartS_ITextSerializer -->
```cs
public interface ITextSerializer
{
    object? Read(string data, Type type);
    string Write(object? value, Type type);
}
```
<!-- endSnippet -->

Both interfaces have generic typed versions (`IByteSerializer<T>`, `ITextSerializer<T>`) for improved performance.


## Built-in Serializers

### Default Serializers

Global default serializers are accessible via static properties:

<!-- snippet: PartS_DefaultSerializers -->
```cs
// Binary serializer - MemoryPack on .NET 6+, MessagePack on .NET Standard
IByteSerializer binary = ByteSerializer.Default;

// Text serializer - System.Text.Json
ITextSerializer text = TextSerializer.Default;
```
<!-- endSnippet -->

You can change defaults globally:

<!-- snippet: PartS_ChangeDefaultSerializer -->
```cs
// Use Newtonsoft.Json as default text serializer
TextSerializer.Default = NewtonsoftJsonSerializer.Default;
```
<!-- endSnippet -->

### Serializer Classes

| Class | Format | Type | Notes |
|-------|--------|------|-------|
| `MemoryPackByteSerializer` | MemoryPack | Binary | Default binary on .NET 6+ |
| `MessagePackByteSerializer` | MessagePack | Binary | Default binary on .NET Standard |
| `SystemJsonSerializer` | System.Text.Json | Text | Default text serializer |
| `NewtonsoftJsonSerializer` | Newtonsoft.Json | Text | Flexible JSON with polymorphism support |

Each has a static `Default` property and options for customization:

<!-- snippet: PartS_SerializerInstances -->
```cs
// Access default instances
var memPack = MemoryPackByteSerializer.Default;
var msgPack = MessagePackByteSerializer.Default;
var sysJson = SystemJsonSerializer.Default;
var newtonsoft = NewtonsoftJsonSerializer.Default;

// Create with custom options
var prettyJson = new SystemJsonSerializer(new JsonSerializerOptions { WriteIndented = true });
```
<!-- endSnippet -->


## Type-Decorated Serialization

Type-decorated serializers embed type information in the serialized output, enabling polymorphic deserialization
when the exact type isn't known at compile time.

### TypeDecoratingTextSerializer

Embeds type info as a comment prefix in JSON:

<!-- snippet: PartS_TypeDecoratingTextSerializer -->
```cs
var serializer = TypeDecoratingTextSerializer.Default;

// Serialize
string json = serializer.Write(value, typeof(object));
// Output: /* @type MyNamespace.MyClass, MyAssembly */ {"name":"test"}

// Deserialize - type is recovered from the prefix
object? result = serializer.Read(json, typeof(object));
// result is MyClass
```
<!-- endSnippet -->

Format details:
- Prefix: `/* @type TypeName */ `
- When serialized type equals declared type, uses shorthand: `/* @type . */ `
- Assembly versions are stripped for forward compatibility

### TypeDecoratingByteSerializer

Prepends `TypeRef` to binary data:

<!-- snippet: PartS_TypeDecoratingByteSerializer -->
```cs
var serializer = TypeDecoratingByteSerializer.Default;

// Type info is binary-encoded before the payload
var buffer = serializer.Write(value, typeof(object));
object? result = serializer.Read(buffer.WrittenMemory, typeof(object), out _);
```
<!-- endSnippet -->

### Default Type-Decorated Instances

Each serializer class provides a type-decorated variant:

<!-- snippet: PartS_TypeDecoratedInstances -->
```cs
var sysJsonTD = SystemJsonSerializer.DefaultTypeDecorating;
var newtonsoftTD = NewtonsoftJsonSerializer.DefaultTypeDecorating;
var memPackTD = MemoryPackByteSerializer.DefaultTypeDecorating;
var msgPackTD = MessagePackByteSerializer.DefaultTypeDecorating;
```
<!-- endSnippet -->


## Serialized\<T> Wrappers

Lazy serialization wrappers defer (de)serialization until accessed. This is useful when:
- Data might not be needed (avoids unnecessary deserialization)
- Data needs to pass through multiple serialization boundaries
- Working with heterogeneous storage formats

### ByteSerialized\<T>

Wraps a value that serializes to/from bytes:

<!-- snippet: PartS_ByteSerializedMessage -->
```cs
[DataContract, MemoryPackable, MessagePackObject]
public partial record MyMessage(
    [property: DataMember, MemoryPackOrder(0), Key(0)] ByteSerialized<MyPayload> Payload);
```
<!-- endSnippet -->

<!-- snippet: PartS_ByteSerializedUsage -->
```cs
// Create with a value - serialization is deferred
var wrapper1 = ByteSerialized.New(myPayload);

// Or create from serialized data - deserialization is deferred
var wrapper2 = ByteSerialized.New<MyPayload>(bytes);

// Access triggers (de)serialization
MyPayload value = wrapper1.Value;
ReadOnlyMemory<byte> data = wrapper1.Data;
```
<!-- endSnippet -->

### TextSerialized\<T>

Same pattern for text/JSON:

<!-- snippet: PartS_TextSerializedUsage -->
```cs
var wrapper = TextSerialized.New(myObject);
string json = wrapper.Data;    // Serialize on access
MyObject value = wrapper.Value; // Deserialize on access
```
<!-- endSnippet -->

### Specialized Variants

| Type | Serializer |
|------|------------|
| `MemoryPackSerialized<T>` | MemoryPack binary |
| `MessagePackSerialized<T>` | MessagePack binary |
| `SystemJsonSerialized<T>` | System.Text.Json |
| `NewtonsoftJsonSerialized<T>` | Newtonsoft.Json |


## Multi-Format Types: UniSerialized\<T>

`UniSerialized<T>` works with all four serialization formats. The format is determined by which property
the serializer accesses:

<!-- snippet: PartS_UniSerializedStructure -->
```cs
[DataContract, MemoryPackable, MessagePackObject]
public readonly partial struct UniSerialized<T>
{
    [JsonIgnore, IgnoreDataMember, MemoryPackIgnore, IgnoreMember]
    public T Value { get; init; }

    // System.Text.Json uses this
    [JsonInclude]
    public string Json { get; init; }

    // Newtonsoft.Json uses this (via JsonProperty attribute)
    public string NewtonsoftJson { get; init; }

    // MemoryPack uses this
    [MemoryPackOrder(0)]
    public byte[] MemoryPack { get; init; }

    // MessagePack uses this
    [DataMember, Key(0)]
    public MessagePackData MessagePack { get; init; }
}
```
<!-- endSnippet -->

This design allows the same data structure to work correctly regardless of which serializer is used
on each side of the communication.

### TypeDecoratingUniSerialized\<T>

Adds type decoration for polymorphism:

<!-- snippet: PartS_TypeDecoratingUniSerialized -->
```cs
// Used by PropertyBag for storing heterogeneous values
var item = TypeDecoratingUniSerialized.New<object>(myValue);
```
<!-- endSnippet -->


## PropertyBag Serialization

`PropertyBag` stores key-value pairs where values can be any type. It uses `TypeDecoratingUniSerialized<object>`
to preserve type information:

<!-- snippet: PartS_PropertyBagItem -->
```cs
// Internal structure of PropertyBagItem
[DataContract, MemoryPackable, MessagePackObject]
public partial record struct PropertyBagItem(
    [property: DataMember] string Key,
    [property: DataMember] TypeDecoratingUniSerialized<object> Serialized);
```
<!-- endSnippet -->

This allows:
- Heterogeneous value types in the same bag
- Cross-format serialization (JSON to binary and back)
- Type preservation across serialization boundaries

::: tip Operations Framework
For details on how PropertyBag is used in the Operations Framework, see [Operations Framework Serialization](./PartO-Serialization.md).
:::


## Annotating Types for Serialization

For types to work with all serializers, apply multiple attributes:

<!-- snippet: PartS_AnnotatedRecord -->
```cs
[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject(true)]
public partial record MyRecord(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Name,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] int Value)
{
    [System.Text.Json.Serialization.JsonConstructor, MemoryPackConstructor, SerializationConstructor]
    public MyRecord() : this("", 0) { }
}
```
<!-- endSnippet -->

| Attribute | Purpose |
|-----------|---------|
| `[DataContract]` | MessagePack and Newtonsoft.Json |
| `[MemoryPackable(...)]` | MemoryPack source generator |
| `[MessagePackObject(true)]` | MessagePack with string keys |
| `[DataMember(Order = n)]` | Property order for MessagePack/DataContract |
| `[MemoryPackOrder(n)]` | Property order for MemoryPack |
| `[JsonConstructor]` | System.Text.Json constructor |
| `[MemoryPackConstructor]` | MemoryPack constructor |
| `[SerializationConstructor]` | MessagePack constructor |


## SerializerKind Enum

For code that needs to select serializers dynamically:

<!-- snippet: PartS_SerializerKindUsage -->
```cs
// Get default serializer for a kind
IByteSerializer serializer = SerializerKind.MemoryPack.GetDefaultSerializer();

// Get type-decorated variant
IByteSerializer tdSerializer = SerializerKind.MemoryPack.GetDefaultTypeDecoratingSerializer();
```
<!-- endSnippet -->


## Configuration

### Global Default Changes

<!-- snippet: PartS_GlobalConfiguration -->
```cs
// Change default binary serializer
ByteSerializer.Default = MessagePackByteSerializer.Default;

// Change default text serializer
TextSerializer.Default = NewtonsoftJsonSerializer.Default;

// Change System.Text.Json options
SystemJsonSerializer.DefaultOptions = new JsonSerializerOptions {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
};

// Change Newtonsoft.Json settings
NewtonsoftJsonSerializer.DefaultSettings = new JsonSerializerSettings {
    TypeNameHandling = TypeNameHandling.Auto,
    NullValueHandling = NullValueHandling.Ignore,
};
```
<!-- endSnippet -->


## Best Practices

1. **Use consistent annotations**: Apply all serialization attributes to types that may cross serialization boundaries
2. **Provide parameterless constructors**: Most serializers require them; use the appropriate constructor attributes
3. **Test cross-format scenarios**: If data might be serialized with one format and deserialized with another, test explicitly
4. **Use TypeDecorating for polymorphism**: When storing/sending base types that may contain derived instances
5. **Consider version tolerance**: Use `MemoryPackable(GenerateType.VersionTolerant)` for types that may evolve
