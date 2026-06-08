---
type: concept
title: "Fusion Serialization"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - serialization
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Core Foundation]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Serialization

Fusion provides a unified serialization layer with both binary and text serializers, plus type-decorated serialization for polymorphic types.

## Core Abstractions

| Interface | Purpose |
|-----------|---------|
| `IByteSerializer` | Binary serialization (MemoryPack, MessagePack) |
| `ITextSerializer` | Text/JSON serialization (System.Text.Json, Newtonsoft.Json) |

Both support the same pattern:
- `Read<T>(stream)` / `Write<T>(stream, value)`
- Built-in support for lazy serialization wrappers

## Lazy Serialization Wrappers

```csharp
ByteSerialized<T>   // Lazy binary — deserializes on first access
TextSerialized<T>   // Lazy text — deserializes on first access
UniSerialized<T>    // Multi-format — works with byte or text
```

These wrappers defer deserialization until the value is actually needed, saving CPU for values that might never be read.

## Type-Decorated Serialization

`TypeDecoratingTextSerializer` preserves type information for polymorphic deserialization. It writes the type name alongside the value, so the correct derived type is reconstructed:

```csharp
// Without: serializing Cat as Animal loses Cat-specific fields
// With: type decorator writes "MyApp.Cat" → deserializes as Cat
```

Used extensively by Fusion internally for operation serialization, RPC arguments, and `PropertyBag`.

## Serialization Backends

| Backend | Type | Package |
|---------|------|---------|
| MemoryPack | Binary (fastest) | Built-in |
| MessagePack | Binary | Built-in |
| System.Text.Json | Text | Built-in |
| Custom | Either | Implement `IByteSerializer`/`ITextSerializer` |

## Registration

```csharp
var fusion = services.AddFusion();
fusion.AddSerializer(serializer);  // Register custom serializer
```

The default serializers are MemoryPack (binary) and System.Text.Json (text). These can be replaced globally.
