# Operations Framework Serialization

The Operations Framework stores operation data in the database using JSON serialization. This document
covers how `DbOperation` and `Operation.Items` are serialized, and how to customize the serialization.


## DbOperation Storage

When an operation is committed, it's stored as a `DbOperation` entity with the following serialized fields:

| Column | Content | Serializer |
|--------|---------|------------|
| `ItemsJson` | `Operation.Items` property bag | `NewtonsoftJsonSerializer.Default` |
| `CommandJson` | The command that triggered the operation | `NewtonsoftJsonSerializer.Default` |

### Default Serializer

`DbOperation` uses Newtonsoft.Json by default:

<!-- snippet: PartOSerialization_DefaultSerializer -->
```cs
// DbOperation.Serializer is a static, mutable property.
// Its default value is NewtonsoftJsonSerializer.Default.
ITextSerializer serializer = DbOperation.Serializer;
```
<!-- endSnippet -->

Newtonsoft.Json is chosen because:
- It handles polymorphic types well with `TypeNameHandling.Auto`
- It's more forgiving with missing/extra properties during schema evolution
- It has mature support for complex object graphs


## Operation.Items Serialization

`Operation.Items` is a `MutablePropertyBag` that stores arbitrary key-value pairs. It's serialized
to the `ItemsJson` column:

<!-- snippet: PartOSerialization_ItemsSerialization -->
```cs
// How Items are serialized to DbOperation
var ItemsJson = operation.Items.Items.Count == 0
    ? null
    : Serializer.Write(operation.Items.Snapshot, typeof(PropertyBag));
```
<!-- endSnippet -->

### PropertyBag Internals

Each item in the bag uses `TypeDecoratingUniSerialized<object>` to preserve type information:

<!-- snippet: PartOSerialization_PropertyBagItem -->
```cs
[DataContract, MemoryPackable, MessagePackObject]
public partial record struct PropertyBagItem(
    [property: DataMember] string Key,
    [property: DataMember] TypeDecoratingUniSerialized<object> Serialized);
```
<!-- endSnippet -->

This allows heterogeneous values with full type preservation:

<!-- snippet: PartOSerialization_PropertyBagUsage -->
```cs
// Store different types in the same operation
operation.Items.Set("userId", 123L);           // long
operation.Items.Set("metadata", myDto);        // custom type
operation.Items.Set("tags", new[] { "a", "b" }); // array

// Types are preserved after serialization round-trip
var userId = operation.Items.Get<long>("userId");     // Works correctly
var metadata = operation.Items.Get<MyDto>("metadata"); // Type preserved
```
<!-- endSnippet -->


## Customizing Serialization

### Changing the Default Serializer

To use different serializer settings:

<!-- snippet: PartOSerialization_ChangeSerializer -->
```cs
// At application startup, before any operations are processed
DbOperation.Serializer = new NewtonsoftJsonSerializer(new JsonSerializerSettings {
    TypeNameHandling = TypeNameHandling.Auto,
    NullValueHandling = NullValueHandling.Ignore,
    DateParseHandling = DateParseHandling.None,
    // Add custom converters if needed
    Converters = { new MyCustomConverter() },
});
```
<!-- endSnippet -->

### Using Type-Decorated Serializer

For explicit type information in the JSON:

<!-- snippet: PartOSerialization_TypeDecoratedSerializer -->
```cs
DbOperation.Serializer = new TypeDecoratingTextSerializer(
    new NewtonsoftJsonSerializer(customSettings));
```
<!-- endSnippet -->

This produces JSON like:
```json
/* @type MyNamespace.MyCommand, MyAssembly */ {"property": "value"}
```


## Command Serialization

Commands stored in `CommandJson` are serialized with type information to enable proper deserialization
during reprocessing:

<!-- snippet: PartOSerialization_CommandRecord -->
```cs
// Command types must be serializable
[DataContract, MemoryPackable, MessagePackObject]
public sealed partial record CreateTodoCommand(
    [property: DataMember, MemoryPackOrder(0), Key(0)] string Title,
    [property: DataMember, MemoryPackOrder(1), Key(1)] string? Description
) : ICommand<Todo>;
```
<!-- endSnippet -->

### Annotating Command Types

For reliable serialization across Operations Framework, RPC, and other subsystems, annotate commands
with all serialization attributes:

<!-- snippet: PartOSerialization_FullyAnnotatedCommand -->
```cs
[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject(true)]
public sealed partial record MyCommand(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Id,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] string Data
) : ICommand<string>
{
    [System.Text.Json.Serialization.JsonConstructor, MemoryPackConstructor, SerializationConstructor]
    public MyCommand() : this("", "") { }
}
```
<!-- endSnippet -->


## Schema Evolution

When evolving command schemas:

1. **Add new properties as optional** with default values
2. **Don't remove properties** from persisted commands (old operations may need reprocessing)
3. **Don't change property types** without a migration strategy

<!-- snippet: PartOSerialization_SchemaV1 -->
```cs
public record CreateUserCommandV1(string Name) : ICommand<User>;
```
<!-- endSnippet -->

<!-- snippet: PartOSerialization_SchemaV2 -->
```cs
public record CreateUserCommandV2(
    string Name,
    string? Email = null  // New optional property
) : ICommand<User>;
```
<!-- endSnippet -->


## Troubleshooting

### Missing Type Information

If deserialization fails with "Could not determine type", ensure:
- The type is in a loaded assembly
- Type names haven't changed (namespace, class name)
- `TypeNameHandling.Auto` is enabled in Newtonsoft.Json settings

### PropertyBag Values Not Deserializing

Check that stored types:
- Have parameterless constructors (or appropriate constructor attributes)
- Are public and not internal/private
- Have `[DataContract]` or are otherwise serializable


## Related Topics

- [Core Serialization](./PartS.md) - General serialization infrastructure
- [Operations Framework](./PartO.md) - Operations Framework overview
- [Reprocessing](./PartO-RP.md) - How operations are replayed
