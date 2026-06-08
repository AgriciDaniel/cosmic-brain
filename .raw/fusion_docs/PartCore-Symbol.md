# Symbol

`Symbol` is an interned string type optimized for fast equality comparison and memory efficiency
when the same string values are used repeatedly.

## Key Types

| Type | Description | Source |
|------|-------------|--------|
| `Symbol` | Interned string wrapper | [Symbol.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Text/Symbol.cs) |


## Overview

`Symbol` wraps a string and interns it, ensuring that equal strings share the same memory
and can be compared by reference.

**Key features:**
- **Fast equality**: Reference comparison instead of character-by-character
- **Memory efficient**: Identical strings share one allocation
- **Serializable**: Full serialization support
- **Implicit conversion**: Works seamlessly with strings


## Why Use Symbol?

### String Equality is Slow

```cs
// String comparison: O(n) - compares each character
string a = "some_long_identifier";
string b = "some_long_identifier";
bool equal = a == b;  // Compares 20+ characters
```

### Symbol Equality is Fast

```cs
// Symbol comparison: O(1) - compares references
Symbol a = "some_long_identifier";
Symbol b = "some_long_identifier";
bool equal = a == b;  // Single reference comparison
```


## Basic Usage

### Creating Symbols

```cs
// From string (implicit conversion)
Symbol sym1 = "my-identifier";

// Explicit creation
Symbol sym2 = new Symbol("my-identifier");

// Empty symbol
Symbol empty = Symbol.Empty;
```

### Converting Back to String

```cs
Symbol sym = "hello";

// Implicit conversion
string s1 = sym;

// Explicit property
string s2 = sym.Value;
```

### Equality Comparison

```cs
Symbol a = "test";
Symbol b = "test";
Symbol c = "other";

bool same = a == b;      // true (fast reference comparison)
bool different = a == c; // false

// Works with strings too
bool withString = a == "test";  // true
```


## Interning Behavior

Symbols are automatically interned:

```cs
Symbol a = "identifier";
Symbol b = "identifier";

// Same underlying string reference
object.ReferenceEquals(a.Value, b.Value);  // true

// GetHashCode is cached
int hash1 = a.GetHashCode();
int hash2 = b.GetHashCode();  // Same value, computed once
```


## Serialization

Symbol supports all serialization formats:

```cs
[DataContract, MemoryPackable, MessagePackObject]
public partial class MyEntity
{
    [DataMember, MemoryPackOrder(0), Key(0)]
    public Symbol Id { get; init; }

    [DataMember, MemoryPackOrder(1), Key(1)]
    public Symbol Category { get; init; }
}
```

Serialized as plain strings, but interned on deserialization.


## Common Patterns

### Dictionary Keys

```cs
// Symbol keys are faster than string keys
private readonly Dictionary<Symbol, Handler> _handlers = new();

public void Register(Symbol eventType, Handler handler)
{
    _handlers[eventType] = handler;
}

public void Handle(Symbol eventType, Event e)
{
    if (_handlers.TryGetValue(eventType, out var handler))
        handler.Invoke(e);
}
```

### Type Identifiers

```cs
public class TypeRegistry
{
    private readonly Dictionary<Symbol, Type> _types = new();

    public void Register<T>(Symbol alias)
    {
        _types[alias] = typeof(T);
    }

    public Type? Resolve(Symbol alias)
    {
        return _types.GetValueOrDefault(alias);
    }
}

// Usage
var registry = new TypeRegistry();
registry.Register<User>("user");
registry.Register<Order>("order");

Type? type = registry.Resolve("user");
```

### Enumeration-like Constants

```cs
public static class EventTypes
{
    public static readonly Symbol Created = "created";
    public static readonly Symbol Updated = "updated";
    public static readonly Symbol Deleted = "deleted";
}

// Fast comparison
if (eventType == EventTypes.Created) {
    // Handle creation
}
```


## Usage in Fusion

Symbol is used throughout Fusion for:

- **RPC method names**: Fast routing lookup
- **Command types**: Type identification
- **Cache keys**: Dictionary key efficiency
- **Error codes**: Fast error classification


## Best Practices

### Use for Repeated Comparisons

```cs
// Good: Same strings compared many times
private readonly Symbol _expectedType = "expected";

public bool IsExpected(Symbol type)
{
    return type == _expectedType;  // Fast
}

// Less beneficial: One-time comparison
public bool Check(string input)
{
    Symbol sym = input;  // Interning cost
    return sym == "expected";  // One comparison doesn't amortize cost
}
```

### Define Constants

```cs
// Good: Define once, reuse
public static class Roles
{
    public static readonly Symbol Admin = "admin";
    public static readonly Symbol User = "user";
    public static readonly Symbol Guest = "guest";
}

// Use throughout application
if (user.Role == Roles.Admin) { }
```

### Use for Dictionary Keys

```cs
// Good: Fast lookups
Dictionary<Symbol, object> cache = new();

// Less optimal for strings that vary
// (each unique string is interned and stored)
```


## Comparison with String Interning

| Feature | `Symbol` | `string.Intern()` |
|---------|----------|-------------------|
| Automatic interning | Yes | Manual call required |
| Serialization | Built-in | Standard string |
| Fast equality | Yes | Only if both interned |
| Hash code caching | Yes | No |
| Type safety | Distinct type | Same as string |
| Memory cleanup | Never* | Never |

*Interned strings are never garbage collected in both cases.


## Performance Considerations

### When Symbol Helps

- Same strings compared repeatedly
- Dictionary keys with repeated lookups
- Message routing by type/name
- Configuration keys

### When to Use Plain Strings

- Unique/random strings (user input, UUIDs)
- Short-lived comparisons
- Large number of distinct values (memory concern)
