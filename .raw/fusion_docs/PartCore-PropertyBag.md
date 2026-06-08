# (Mutable)PropertyBag

`PropertyBag` and `MutablePropertyBag` provide type-safe key-value storage with full serialization support,
preserving type information across serialization boundaries.

## Key Types

| Type | Description | Source |
|------|-------------|--------|
| `PropertyBag` | Immutable key-value store | [PropertyBag.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/PropertyBag.cs) |
| `MutablePropertyBag` | Mutable key-value store | [MutablePropertyBag.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/MutablePropertyBag.cs) |
| `PropertyBagItem` | Single key-value entry | [PropertyBag.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Collections/PropertyBag.cs) |


## Overview

PropertyBag solves a common problem: storing heterogeneous values that must survive serialization
while preserving their exact types.

**Key features:**
- **Type preservation**: Values retain their type through serialization/deserialization
- **Multi-format support**: Works with JSON, MemoryPack, and MessagePack
- **Immutable by default**: `PropertyBag` is a readonly struct
- **String or Type keys**: Index by string name or by Type

**Used in Fusion for:**
- Operation properties in the Operations Framework
- Command metadata
- Session tags
- Extensible data structures


## PropertyBag (Immutable)

### Creating

```cs
// Start with empty
var bag = PropertyBag.Empty;

// Add items (returns new instance)
bag = bag.Set("name", "Alice");
bag = bag.Set("age", 30);
bag = bag.Set("config", new AppConfig { Theme = "dark" });

// Fluent chaining
var bag2 = PropertyBag.Empty
    .Set("key1", "value1")
    .Set("key2", 42)
    .Set(typeof(MyService), serviceInstance);
```

### Accessing Values

```cs
// By string key
string? name = bag.Get<string>("name");
int age = bag.GetOrDefault<int>("age");  // Returns 0 if missing
int? maybeAge = bag.Get<int?>("age");    // Returns null if missing

// By Type key
MyService? service = bag.Get<MyService>();
var config = bag.Get<AppConfig>(typeof(AppConfig));

// Check existence
bool hasName = bag.Contains("name");

// Indexer returns object?
object? value = bag["name"];
```

### Modifying (Creates New Instance)

```cs
// Set or update
var updated = bag.Set("name", "Bob");

// Remove
var removed = bag.Remove("name");

// Combine bags (second overwrites first on conflicts)
var combined = bag1.With(bag2);

// Set from another bag
var merged = bag1.SetMany(bag2);
```

### Iteration

```cs
// Access all items
foreach (var item in bag.Items) {
    Console.WriteLine($"{item.Key}: {item.Value}");
}

// Count
int count = bag.Count;
```


## MutablePropertyBag

Thread-safe mutable variant for scenarios requiring in-place modification.

### Creating

```cs
// From scratch
var mutable = new MutablePropertyBag();

// From existing PropertyBag
var mutable2 = bag.ToMutable();
```

### Modifying

```cs
// Set values
mutable.Set("name", "Alice");
mutable.Set(typeof(Config), config);

// Remove
mutable.Remove("name");

// Clear all
mutable.Clear();
```

### Converting

```cs
// To immutable (snapshot)
PropertyBag snapshot = mutable.ToPropertyBag();

// Items property returns current snapshot
IReadOnlyList<PropertyBagItem> items = mutable.Items;
```

### Thread Safety

`MutablePropertyBag` uses locking internally:

```cs
// Safe for concurrent access
Parallel.For(0, 100, i => {
    mutable.Set($"key{i}", i);
});
```


## Type-Decorated Serialization

PropertyBag uses `TypeDecoratingUniSerialized<object>` internally, which preserves type information:

```cs
// Internal structure
[DataContract, MemoryPackable, MessagePackObject]
public partial record struct PropertyBagItem(
    [property: DataMember] string Key,
    [property: DataMember] TypeDecoratingUniSerialized<object> Serialized);
```

This means:
- Store an `int`, get back an `int` (not `long` or `object`)
- Store a custom class, get back that exact type
- Works across JSON, MemoryPack, and MessagePack boundaries


## Usage Examples

### Command Metadata

```cs
public record MyCommand : ICommand<Unit>
{
    public string Data { get; init; }
    public PropertyBag Properties { get; init; } = PropertyBag.Empty;
}

// Add metadata
var command = new MyCommand { Data = "test" }
    .WithProperty("source", "api")
    .WithProperty("correlationId", Guid.NewGuid());
```

### Operation Properties

```cs
// In Operations Framework
public async Task HandleCommand(MyCommand command, CancellationToken ct)
{
    var context = CommandContext.GetCurrent();
    var operation = context.Operation;

    // Read properties set by middleware
    var userId = operation.Properties.Get<string>("userId");

    // Set properties for downstream handlers
    operation.Properties = operation.Properties.Set("processedAt", Moment.Now);
}
```

### Extensible Data Structures

```cs
public class Session
{
    public string Id { get; }
    public PropertyBag Tags { get; init; } = PropertyBag.Empty;
}

// Add custom tags
var session = new Session { Id = "abc" }
    .WithTag("tenant", "acme")
    .WithTag("role", "admin");

// Read tags
string? tenant = session.Tags.Get<string>("tenant");
```


## Serialization Format

When serialized to JSON:

```json
{
  "RawItems": [
    {
      "Key": "name",
      "Serialized": {
        "Json": "/* @type System.String */ \"Alice\""
      }
    },
    {
      "Key": "age",
      "Serialized": {
        "Json": "/* @type System.Int32 */ 30"
      }
    }
  ]
}
```

The `/* @type ... */` prefix preserves type information for polymorphic deserialization.


## Best Practices

### Prefer Immutable PropertyBag

```cs
// Good: Immutable, explicit about changes
var updated = bag.Set("key", value);

// Use MutablePropertyBag only when needed
var mutable = new MutablePropertyBag();
// ... multiple modifications ...
var final = mutable.ToPropertyBag();
```

### Use Type Keys for Singletons

```cs
// Good: Type-safe, no string typos
bag.Set(typeof(UserContext), userContext);
var ctx = bag.Get<UserContext>();

// Also good for unique items
bag.Set<CancellationToken>(ct);
var token = bag.Get<CancellationToken>();
```

### Use String Keys for Named Properties

```cs
// Good: Multiple values of same type
bag.Set("sourceId", "abc");
bag.Set("targetId", "xyz");
```
