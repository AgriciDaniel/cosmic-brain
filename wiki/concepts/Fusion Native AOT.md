---
type: concept
title: "Fusion Native AOT Support"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - aot
  - nativeaot
  - trimming
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Interceptors & Proxies]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Native AOT Support

Fusion supports Native AOT compilation and aggressive trimming through its `CodeKeeper` infrastructure and compile-time proxy generation.

## The Challenge

Native AOT compiles .NET to native code ahead of time — no JIT, no runtime IL emission. This conflicts with traditional reflection-heavy approaches (like Castle DynamicProxy) that Fusion's interception layer would otherwise require.

## The Solution: ActualLab.Generators + CodeKeeper

Fusion avoids runtime code generation entirely:
- **Interceptors** use compile-time source generation via `ActualLab.Generators` (see [[Fusion Interceptors & Proxies]])
- **CodeKeeper** manages code that must be kept at runtime despite trimming

## CodeKeeper

`CodeKeeper` is a registry that prevents the trimmer from removing code that's needed at runtime but not statically referenced. It's designed for library authors who generate code dynamically:

```csharp
// Register types/methods that must survive trimming
CodeKeeper.Keep<MyService>();
CodeKeeper.Keep(typeof(MyService).GetMethod("Compute"));
```

## RuntimeCodegen Modes

Fusion supports multiple code generation backends, configurable per deployment:

| Mode | Description | AOT Compatible |
|------|-------------|----------------|
| `DynamicMethods` | Uses `DynamicMethod` (JIT only) | No |
| `InterpretedExpressions` | Interprets expression trees | Yes (slow) |
| `CompiledExpressions` | Compiles expression trees | No |

For AOT deployments, use `InterpretedExpressions` (functional but slower) or rely entirely on `ActualLab.Generators` (compile-time, best performance).

## Trimming Support

Fusion assemblies are annotated with trimming attributes (`[DynamicallyAccessedMembers]`, `[RequiresUnreferencedCode]`) to guide the trimmer. The `ActualLab.Generators` source generator produces trim-safe code because it emits all proxy types at compile time — the trimmer sees them as regular code.

## Required Package

`ActualLab.Fusion` includes AOT support. No additional packages needed for basic AOT compatibility.
