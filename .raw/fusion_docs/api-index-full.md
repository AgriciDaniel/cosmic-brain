# API Index (Full)

This document lists all public types (~1000 lines) in ActualLab.Fusion NuGet packages,
organized by assembly and namespace.
See also: [Condensed API Index](api-index.md) (~300 lines).

## ActualLab.Core

### ActualLab

- `ICanBeNone<out TSelf>`, `CanBeNoneExt` - Strongly typed version of `ICanBeNone` that exposes a static `None` value.
- `IHasId<out TId>` - An interface that indicates its implementor has an identifier of type `TId`.
- `IHasUuid` - Similar to `IHasId<TId>`, but indicates the `Id` is universally unique.
- `IMutableResult<T>` - Describes strongly typed `Result` of a computation that can be changed.
- `INotLogged` - A tagging interface for commands and other objects that shouldn't be logged on use / execution.
- `IRequirementTarget` - A tagging interface that tags types supported by `RequireExt` type.
- `AssumeValid` (struct) - A unit-type constructor parameter indicating that no validation is required.
- `ClosedDisposable<TState>` (struct) - A lightweight disposable struct that captures state and invokes a dispose action over it.
- `Disposable<T>` (struct) - A lightweight disposable struct wrapping a resource and its dispose action.
- `Generate` (struct) - A unit-type constructor parameter indicating that a new identifier should be generated.
- `HostId` (record) - Represents a unique identifier for a host, auto-generated with a machine-prefixed value.
- `LazySlim<TValue>` - A lightweight alternative to `Lazy<T>` with double-check locking.
- `ParseOrNone` (struct) - A unit-type constructor parameter indicating a parse-or-return-none semantic.
- `Requirement` (record) - Base class for `Requirement<T>` that validate values and produce errors on failure.
- `Result` (struct), `ResultExt` - Untyped result of a computation and some helper methods related to `Result<T>` type.
- `ServiceException` - A base exception type for service-level errors.
- `Option` - Helper methods related to `Option<T>` type.
- `StaticLog` - Provides globally accessible `ILogger` instances via a shared `ILoggerFactory`.
- `ExceptionExt` - Extension methods for `Exception` type and its descendants.
- `KeyValuePairExt` - Extension methods and helpers for `KeyValuePair<TKey, TValue>`.
- `RequireExt` - Extension methods for applying `Requirement<T>` checks to values and tasks.
- `StringExt` - Extension methods for string.

### ActualLab.Api

- `ApiList<T>` - A serializable list intended for use in API contracts.
- `ApiMap<TKey, TValue>` - A serializable dictionary with sorted enumeration, intended for use in API contracts.
- `ApiSet<T>` - A serializable hash set with sorted enumeration, intended for use in API contracts.
- `ApiArray` - Factory methods for creating `ApiArray<T>` instances.
- `ApiNullable`, `ApiNullable8`, `ApiNullableExt` - Factory methods for creating `ApiNullable<T>` instances.
- `ApiOption` - Factory methods for creating `ApiOption<T>` instances.
- `ApiCollectionExt` - Extension methods for converting collections to `Api` collection types.

### ActualLab.Async

- `IWorker`, `WorkerBase`, `WorkerExt` - Defines the contract for a long-running background worker that can be started and stopped.
- `TaskResultKind` (enum) - Defines the possible result states of a task.
- `AsyncDisposableBase`, `AsyncDisposable<TState>` (struct) - A template from https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-disposeasync
- `ProcessorBase` - Base class for async processors with built-in disposal and stop token support.
- `SafeAsyncDisposableBase` - A safer version of https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-disposeasync that ensures `DisposeAsync(bool)` is called just once.
- `TaskCompletionHandler` - A pooled helper for attaching completion callbacks to tasks. Each instance caches its delegate, and instances are pooled to minimize allocations.
- `AsyncChain` (record struct), `AsyncChainExt` - A named async operation that can be composed, retried, logged, and run with cancellation.
- `AsyncState<T>` - A linked-list node representing an async state that transitions to the next value.
- `BatchProcessor<T, TResult>` - Processes items in batches using a dynamically-scaled pool of worker tasks.
- `BatchProcessorWorkerPolicy` (record) - Default implementation of `IBatchProcessorWorkerPolicy` with configurable scaling thresholds.
- `Temporary<T>` (record struct) - Wraps a value together with a `CancellationToken` indicating when the value is gone.
- `AsyncEnumerableExt` - Extension methods for `IAsyncEnumerable<T>`.
- `AsyncTaskMethodBuilderExt` - Extension methods for `AsyncTaskMethodBuilder<TResult>` and `AsyncTaskMethodBuilder`.
- `CancellationTokenExt` - Extension methods for `CancellationToken`.
- `CancellationTokenSourceExt` - Extension methods for `CancellationTokenSource`.
- `ExecutionContextExt` - Extension methods and helpers for `ExecutionContext`.
- `SemaphoreSlimExt` - Extension methods for `SemaphoreSlim`.
- `TaskExt` - Extension methods and helpers for `Task` and `Task<TResult>`.
- `TaskCompletionSourceExt` - Extension methods for `TaskCompletionSource<TResult>`.
- `ValueTaskExt` - Extension methods and helpers for `ValueTask` and `ValueTask<TResult>`.

### ActualLab.Caching

- `IAsyncCache<in TKey, TValue>`, `AsyncCacheBase<TKey, TValue>` - Defines the contract for an async key-value cache that supports set and remove operations.
- `IAsyncKeyResolver<in TKey, TValue>` - Defines the contract for asynchronously resolving values by key.
- `AsyncKeyResolverBase<TKey, TValue>`, `AsyncKeyResolverExt` - Base class for async key resolvers implementing `IAsyncKeyResolver<TKey, TValue>`.
- `FileSystemCacheBase<TKey, TValue>`, `FileSystemCache<TKey, TValue>` - Base class for file system-backed caches with atomic read/write operations.
- `GenericInstanceFactory` - Base class for factories that produce instances cached by `GenericInstanceCache`.
- `EmptyCache<TKey, TValue>` - A no-op cache implementation that never stores or returns values.
- `MemoizingCache<TKey, TValue>` - An in-memory cache backed by a `ConcurrentDictionary<TKey, TValue>`.
- `RefHolder` - Holds strong references to objects to prevent garbage collection, with concurrent access support.
- `VoidSurrogate` (record struct) - This type is used by `GenericInstanceCache` class to substitute void types.
- `GenericInstanceCache` - Thread-safe cache for instances produced by `GenericInstanceFactory` subclasses.
- `CacheExt` - Extension methods for `IAsyncKeyResolver<TKey, TValue>`.

### ActualLab.Channels

- `ChannelCopyMode` (enum) - Defines which channel state transitions to propagate when copying between channels.
- `ChannelPair<T>` - Holds a pair of related channels, optionally with twisted (cross-wired) reader/writer connections.
- `CustomChannel<TWrite, TRead>` - A channel composed from an explicit reader and writer pair.
- `CustomChannelWithId<TId, TWrite, TRead>` - A `CustomChannel<TWrite, TRead>` with an associated identifier.
- `EmptyChannel<T>` - A channel that is immediately completed and produces no items.
- `NullChannel<T>` - A channel that discards all writes and never produces items on reads.
- `UnbufferedPushSequence<T>` - An unbuffered push-based async sequence that allows a single enumerator and synchronous push.
- `ChannelExt` - Extension methods for `Channel<T>` and related types.

### ActualLab.Collections

- `IReadOnlyMutableDictionary<TKey, TValue>` - A read-only view of a thread-safe mutable dictionary backed by an `ImmutableDictionary<TKey, TValue>`.
- `IReadOnlyMutableList<T>` - A read-only view of a thread-safe mutable list backed by an `ImmutableList<T>`.
- `ArrayBuffer<T>` (struct) - A list-like struct backed by `ArrayPool<T>` that typically requires zero allocations. Designed for use as a temporary buffer in enumeration scenarios.
- `ArrayOwner<T>` - Wraps a pooled array as an `IMemoryOwner<T>`, returning the array to the pool on disposal.
- `ArrayPoolBuffer<T>` - A resizable buffer backed by `ArrayPool<T>` that implements `IBufferWriter<T>` and provides list-like operations.
- `BinaryHeap<TPriority, TValue>` - A min-heap data structure that stores priority-value pairs and supports efficient extraction of the minimum element.
- `FenwickTree<T>` - A Fenwick tree (binary indexed tree) for efficient prefix sum queries and point updates over an array of elements.
- `ImmutableBimap<TFrom, TTo>` (record) - An immutable bidirectional map (bimap) that maintains both forward and backward lookup dictionaries between two key types.
- `MutableDictionary<TKey, TValue>` - Default implementation of `IMutableDictionary<TKey, TValue>` that wraps an `ImmutableDictionary<TKey, TValue>` with lock-based thread safety.
- `MutableList<T>` - Default implementation of `IMutableList<T>` that wraps an `ImmutableList<T>` with lock-based thread safety.
- `MutablePropertyBag` - A thread-safe mutable property bag backed by an immutable `PropertyBag` with atomic update operations and change notifications.
- `OptionSet` - A thread-safe mutable set of named options. Consider using `MutablePropertyBag` instead.
- `RadixHeapSet<T>` - A radix heap with set semantics, providing efficient monotone priority queue operations using integer priorities. Each value can appear at most once.
- `RecentlySeenMap<TKey, TValue>` - A capacity- and time-bounded map that evicts the oldest entries when the capacity is exceeded or entries have expired.
- `RefArrayPoolBuffer<T>` (struct) - A ref struct version of `ArrayPoolBuffer<T>` that avoids heap allocations. Use `Release()` instead of `Dispose()`.
- `RingBuffer<T>` (struct) - A fixed-capacity circular buffer that supports efficient push/pull operations at both head and tail. Capacity must be a power of two minus one.
- `VersionSet` (record) - An immutable, serializable set of scoped `Version` values, stored as a comma-separated string of scope=version pairs.
- `ArrayPools` - Provides static references to commonly used `ArrayPool<T>` instances.
- `ArrayExt` - Extension methods for arrays.
- `BufferWriterExt` - Extension methods for `IBufferWriter<T>`.
- `CollectionExt` - Extension methods for `ICollection<T>`.
- `ConcurrentDictionaryExt` - Extension methods for `ConcurrentDictionary<TKey, TValue>`, including lazy value initialization and atomic increment/decrement operations.
- `EnumerableExt` - Extension methods for `IEnumerable<T>`.
- `ImmutableDictionaryExt` - Extension methods for `ImmutableDictionary<TKey, TValue>`.
- `MemoryExt` - Extension methods for `ReadOnlyMemory<T>` and `Memory<T>`.
- `PropertyBagExt` - Extension methods for `PropertyBag` and `MutablePropertyBag`.
- `ReadOnlyListExt` - Extension methods for `IReadOnlyList<T>`.
- `SpanExt` - Extension methods for `Span<T>` and `ReadOnlySpan<T>`, providing unchecked read/write and variable-length integer encoding operations.
- `SpanLikeExt` - Extension methods for span-like types (arrays, spans, immutable arrays, and read-only lists) providing safe element access.

### ActualLab.Collections.Fixed

- `FixedArray0<T> .. FixedArray16<T>` (struct) - A fixed-size inline array of N elements, stored on the stack via sequential layout.

### ActualLab.Collections.Slim

- `IHashSetSlim<T>`, `HashSetSlim1<T> .. HashSetSlim4<T>` (struct) - A compact hash set interface optimized for small item counts, storing items inline before falling back to a full `HashSet<T>`.
- `IRefHashSetSlim<T>`, `RefHashSetSlim1<T> .. RefHashSetSlim4<T>` (struct) - A compact hash set interface for reference types, optimized for small item counts using reference equality before falling back to a full `HashSet<T>`.
- `ReferenceEqualityComparer<T>` - An `IEqualityComparer<T>` that compares reference type instances by reference identity rather than value equality.
- `SafeHashSetSlim1<T> .. SafeHashSetSlim4<T>` (struct) - A thread-safe compact `IHashSetSlim<T>` that stores up to N items inline before falling back to an `ImmutableHashSet<T>`.
- `Aggregator<TState, in TArg>` (delegate) - A delegate that aggregates a single argument into a mutable state by reference.

### ActualLab.Comparison

- `ByRef<T>` (struct) - A wrapper that uses reference equality for comparisons instead of value equality.
- `HasIdEqualityComparer<T>` - An equality comparer for `IHasId<TId>` that compares by `Id`.
- `VersionExt` - Extension methods and helpers for `Version`.

### ActualLab.Concurrency

- `IHasTaskFactory` - Indicates the implementing type exposes a `TaskFactory` for scheduling work.
- `ConcurrentPool<T>` - A thread-safe object pool backed by a `ConcurrentQueue<T>` and a `StochasticCounter` for approximate size tracking.
- `DedicatedThreadScheduler` - A `TaskScheduler` that executes tasks sequentially on a single dedicated thread.
- `StochasticCounter` (struct) - A probabilistic counter that increments or decrements atomically with a configurable sampling precision, reducing contention on hot paths.
- `InterlockedExt` - Extension methods for `Interlocked` providing atomic compare-and-swap patterns.

### ActualLab.Conversion

- `IConvertibleTo<out TTarget>` - An interface that indicates its implementor can be converted to type `TTarget`.
- `Converter<TSource>`, `ConverterProvider`, `ConverterExt` - A `Converter` that knows its source type at compile time.
- `SourceConverterProvider<TSource>` - Abstract base implementation of `ISourceConverterProvider<TSource>`.
- `BiConverter<TFrom, TTo>` (record struct) - A bidirectional converter that provides both forward and backward conversion functions.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register converters.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to access converters.

### ActualLab.DependencyInjection

- `IHasDisposeStatus` - Indicates a type that exposes its disposal status.
- `IHasInitialize` - Indicates a type that supports post-construction initialization with optional settings.
- `IHasServices` - Indicates a type that exposes an `IServiceProvider` instance.
- `IHasWhenDisposed`, `HasWhenDisposedExt` - Extends `IHasDisposeStatus` with a task that completes upon disposal.
- `HostedServiceSet` - Manages a group of `IHostedService`-s as a whole allowing to start or stop all of them.
- `ServiceResolver` - Encapsulates a service type and an optional custom resolver function for resolving services from an `IServiceProvider`.
- `ServiceConstructorAttribute` - Marks a constructor as the preferred constructor for DI service activation.
- `TestServiceProviderTag` - A marker class registered in DI containers to indicate that the service provider is used in a test environment.
- `ConfigurationExt` - Extension methods for `IConfiguration` to bind and validate settings.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection`.
- `ServiceDescriptorExt` - Extension methods for `ServiceDescriptor`.
- `ServiceProviderExt` - Extension methods for `IServiceProvider`.
- `ServiceResolverExt` - Extension methods for `ServiceResolver`.

### ActualLab.Diagnostics

- `INotAnError` - A marker interface for exceptions that should not be treated as errors in diagnostics and activity tracking.
- `Sampler` (record) - A probabilistic sampler that decides whether to include or skip events based on configurable strategies (random, every-Nth, etc.).
- `CodeLocation` - Provides methods for formatting source code locations (file, member, line) into human-readable strings for diagnostics.
- `ActivityExt` - Extension methods for `Activity` to finalize activities with error status and handle disposal safely.
- `ActivityContextExt` - Extension methods for `ActivityContext` to format W3C trace context headers.
- `ActivitySourceExt` - Extension methods for `ActivitySource`.
- `AssemblyExt` - Extension methods for `Assembly` to retrieve informational version.
- `DiagnosticsExt` - Utility methods for sanitizing metric and diagnostics names.
- `LoggerExt` - Extension methods for `ILogger` to check enabled log levels.
- `TypeExt` - Extension methods for `Type` to construct diagnostics operation names.

### ActualLab.Generators

- `ConcurrentGenerator<T>` - A thread-safe `Generator<T>` that uses striped generation to reduce contention in concurrent scenarios.
- `Generator<T>` - Abstract base class for value generators that produce a sequence of values.
- `UuidGenerator` - Abstract base for generators that produce UUID strings.
- `GuidUuidGenerator` - A `UuidGenerator` that produces `Guid`-based UUID strings.
- `ProxyGenerator` - An incremental source generator that creates proxy classes for types implementing `IRequiresAsyncProxy` or `IRequiresFullProxy` interfaces.
- `ProxyTypeGenerator` - Generates a proxy class for a single type declaration, producing interceptor-based method overrides and module initializer registration code.
- `RandomInt32Generator` - A thread-safe generator that produces cryptographically random int values.
- `RandomInt64Generator` - A thread-safe generator that produces cryptographically random long values.
- `RandomStringGenerator` - A thread-safe generator that produces random strings from a configurable alphabet using cryptographic randomness.
- `SequentialInt32Generator` - A thread-safe generator that produces sequentially incrementing int values.
- `SequentialInt64Generator` - A thread-safe generator that produces sequentially incrementing long values.
- `TransformingGenerator<TIn, TOut>` - A `Generator<T>` that transforms the output of another generator using a provided function.
- `UlidUuidGenerator` - A `UuidGenerator` that produces ULID-based UUID strings.
- `ConcurrentInt32Generator` - Factory for creating striped concurrent int generators that reduce contention via multiple independent sequences.
- `ConcurrentInt64Generator` - Factory for creating striped concurrent long generators that reduce contention via multiple independent sequences.
- `RandomShared` - Provides thread-safe access to shared random number generation, wrapping `Random.Shared` on .NET 6+ or a thread-local `Random` fallback.

### ActualLab.IO

- `ConsoleExt` - Extension methods for `Console` providing asynchronous console I/O.
- `FileExt` - Helper methods for reading and writing text files with configurable encoding.
- `FilePathExt` - Extension methods for `FilePath` providing file/directory enumeration and text I/O.
- `FileSystemWatcherExt` - Extension methods for `FileSystemWatcher` providing reactive and async event access.

### ActualLab.Locking

- `IAsyncLockReleaser` - Defines the contract for releasing an acquired async lock.
- `LockReentryMode` (enum) - Defines lock reentry behavior modes for async locks.
- `AsyncLock` - A semaphore-based async lock with optional reentry detection.
- `AsyncLockSet<TKey>` - A keyed async lock set that allows locking on individual keys with optional reentry detection.
- `FileLock` - An `IAsyncLock<TReleaser>` implementation that uses a file system lock.
- `SimpleAsyncLock` - A lightweight async lock without reentry detection support.
- `SemaphoreSlimExt` - Extension methods for `SemaphoreSlim`.

### ActualLab.Mathematics

- `Arithmetics<T>`, `ArithmeticsProvider` - Provides basic arithmetic operations for type `T`.
- `PrimeSieve` - A sieve of Eratosthenes implementation for computing and querying prime numbers.
- `TileLayer<T>` - A single layer of uniformly-sized tiles within a `TileStack<T>`.
- `TileStack<T>` - A hierarchical stack of `TileLayer<T>` instances with increasing tile sizes.
- `Bits` - Provides bit manipulation utilities such as population count, leading/trailing zero count, and power-of-2 operations.
- `Combinatorics` - Provides combinatorial utilities including subset enumeration and combinations.
- `GuidExt` - Extension methods for `Guid` providing formatting and conversion utilities.
- `MathExt` - Extended math utilities including clamping, GCD/LCM, factorial, and arbitrary-radix number formatting/parsing.
- `RangeExt` - Extension methods for `Range<T>` providing size, containment, intersection, and other range operations.

### ActualLab.Net

- `Connector<TConnection>` - Manages a persistent connection of type `TConnection` with automatic reconnection and retry delay support.
- `RetryDelay` (record struct) - Represents a computed retry delay including the delay task and when it ends.
- `RetryDelayLogger` (record struct) - Logs retry delay events such as errors, delays, and limit exceeded conditions.
- `RetryDelayer`, `RetryDelayerExt` - Default `IRetryDelayer` implementation with configurable delay sequences and retry limits.

### ActualLab.OS

- `OSKind` (enum) - Defines operating system kind values.
- `HardwareInfo` - Provides cached information about the hardware, such as processor count.
- `OSInfo` - Provides static information about the current operating system.
- `RuntimeInfo` - Provides runtime environment information such as server/client mode and process identity.

### ActualLab.Pooling

- `IPool<T>` - Defines the contract for a pool that rents and releases resources of type `T`.
- `IResourceReleaser<in T>` - Defines the contract for returning a resource of type `T` back to its pool.
- `Owned<TItem, TOwner>` (struct) - Pairs an item with its disposable owner, disposing the owner on release.
- `ResourceLease<T>` (struct) - A struct-based `IResourceLease<T>` that releases the resource back to the releaser on disposal.

### ActualLab.Reflection

- `RuntimeCodegenMode` (enum) - Defines runtime code generation strategy values.
- `MemberwiseCopier` (record) - Copies property and field values from one instance to another using reflection.
- `MemberwiseCloner` - Provides a fast delegate-based invocation of `MemberwiseClone`.
- `RuntimeCodegen` - Detects and controls the runtime code generation mode (dynamic methods vs. expression trees).
- `TypeNameHelpers` - Helpers for parsing and formatting assembly-qualified type names.
- `ActivatorExt` - Extension methods for creating instances via cached constructor delegates, supporting both dynamic methods and expression tree codegen.
- `ExpressionExt` - Extension methods for `Expression` providing conversion and member access helpers.
- `FuncExt` - Provides helpers for constructing generic `Action` and `Func<TResult>` delegate types at runtime.
- `ILGeneratorExt` - Extension methods for `ILGenerator` providing casting helpers.
- `MemberInfoExt` - Extension methods for `MemberInfo` providing cached getter/setter delegate creation for properties and fields.
- `MethodInfoExt` - Extension methods for `MethodInfo` providing attribute lookup with interface and base type inheritance.
- `TypeExt` - Extension methods for `Type` providing name formatting, base type enumeration, proxy resolution, and task type detection.

### ActualLab.Requirements

- `CustomizableRequirement` (record), `CustomizableRequirementBase` (record) - A `Requirement<T>` wrapper that delegates satisfaction checks to a base requirement and uses a customizable `ExceptionBuilder` for errors.
- `FuncRequirement` (record) - A requirement that uses a delegate function for its satisfaction check.
- `JointRequirement` (record) - A composite requirement that is satisfied only when both its primary and secondary requirements are satisfied.
- `MustExistRequirement` (record) - A requirement that checks a value is not null or default.
- `ExceptionBuilder` (record struct) - Builds exceptions for requirement validation failures using configurable message templates and exception factories.

### ActualLab.Resilience

- `IHasTimeout` - Defines the contract for objects that have an optional timeout.
- `ISuperTransientException` - A tagging interface for any exception that has to be "cured" by retrying the operation.
- `Transiency` (enum), `TransiencyResolver<TContext>` (delegate), `TransiencyExt` - Defines error transiency classification values.
- `ChaosMaker` (record) - Abstract base for chaos engineering makers that inject faults (delays, errors) into operations for resilience testing.
- `RetryLimitExceededException` - Thrown when the maximum number of retry attempts has been exceeded.
- `RetryLogger` (record) - Logs retry-related events such as failed attempts and retry delays.
- `RetryPolicy` (record), `RetryPolicyExt` - Default `IRetryPolicy` implementation with configurable try count, per-try timeout, delay sequence, and transiency-based filtering.
- `RetryPolicyTimeoutException` - Thrown when a single retry attempt exceeds its configured timeout.
- `RetryRequiredException` - A super-transient exception indicating that a retry is required unconditionally.
- `TerminalException` - Base exception class for terminal errors that indicate unrecoverable failure.
- `TransientException` - Base exception class for transient errors that may succeed on retry.
- `ExceptionFilter` (delegate), `ExceptionFilterExt` - A delegate that determines whether an exception matches a given transiency filter.
- `ExceptionFilters` - Provides common `ExceptionFilter` instances for transient, non-transient, terminal, and unconditional matching.
- `TransiencyResolvers` - Abstract base class for `TransiencyResolver`-s.
- `ExceptionExt` - Extension methods for `Exception` related to resilience and service provider disposal detection.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register `TransiencyResolver<TContext>` instances.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve `TransiencyResolver` instances.
- `TransiencyResolverExt` - Extension methods for `TransiencyResolver`.

### ActualLab.Scalability

- `HashRing<T>` - A consistent hash ring that maps hash values to a sorted ring of nodes.
- `ShardMap<TNode>` - Maps a fixed number of shards to a set of nodes using consistent hashing.

### ActualLab.Serialization

- `IHasToStringProducingJson` - Indicates that type's `ToString()` can be deserialized with `System.Text.Json` / JSON.NET deserializers.
- `IProjectingByteSerializer<T>` - A serializer that allows projection of parts from source on reads.
- `DataFormat` (enum) - Defines whether data is stored as raw bytes or as text.
- `SerializerKind` (enum), `SerializerKindExt` - Defines the available serializer implementations.
- `Box<T>` (record) - A serializable immutable box that wraps a single value of type `T`.
- `ByteSerialized<T>` - A wrapper that auto-serializes its `Value` to a byte array on access via `IByteSerializer`.
- `JsonString` - A string wrapper representing a raw JSON value with proper serialization support.
- `LegacyTypeDecoratingTextSerializer` - A legacy variant of `TypeDecoratingTextSerializer` that uses list-format type decoration.
- `MemoryPackByteSerializer<T>` - A typed `MemoryPackByteSerializer` that serializes values of type `T`.
- `MemoryPackSerialized<T>` - A `ByteSerialized<T>` variant that uses `MemoryPackByteSerializer` for serialization.
- `MessagePackByteSerializer<T>` - A typed `MessagePackByteSerializer` that serializes values of type `T`.
- `MessagePackSerialized<T>` - A `ByteSerialized<T>` variant that uses `MessagePackByteSerializer` for serialization.
- `MutableBox<T>` - A serializable mutable box that wraps a single value of type `T`.
- `NewtonsoftJsonSerialized<T>` - A `TextSerialized<T>` variant that uses `NewtonsoftJsonSerializer` for serialization.
- `NewtonsoftJsonSerializer` - An `ITextSerializer` implementation backed by Newtonsoft.Json (JSON.NET).
- `RemoteException` - Represents an exception that was serialized from a remote service and reconstructed from `ExceptionInfo`.
- `SystemJsonSerialized<T>` - A `TextSerialized<T>` variant that uses `SystemJsonSerializer` for serialization.
- `SystemJsonSerializer` - An `ITextSerializer` implementation backed by `System.Text.Json`.
- `TextSerialized<T>` - A wrapper that auto-serializes its `Value` to a string on access via `ITextSerializer`.
- `TypeDecoratingByteSerializer` - An `IByteSerializer` decorator that prefixes serialized data with type information.
- `TypeDecoratingMemoryPackSerialized<T>` - A `ByteSerialized<T>` variant that uses type-decorating MemoryPack serialization.
- `TypeDecoratingMessagePackSerialized<T>` - A `ByteSerialized<T>` variant that uses type-decorating MessagePack serialization.
- `TypeDecoratingNewtonsoftJsonSerialized<T>` - A `TextSerialized<T>` variant that uses type-decorating Newtonsoft.Json serialization.
- `TypeDecoratingSystemJsonSerialized<T>` - A `TextSerialized<T>` variant that uses type-decorating `System.Text.Json` serialization.
- `TypeDecoratingTextSerializer` - An `ITextSerializer` decorator that prefixes serialized data with type information.
- `ByteSerializer<T>`, `ByteSerializerExt` - Provides static access to the default typed `IByteSerializer<T>` and factory methods.
- `TextSerializer<T>`, `TextSerializerExt` - Provides static access to the default typed `ITextSerializer<T>` and factory methods.
- `TypeDecoratingUniSerialized` - Factory methods for `TypeDecoratingUniSerialized<T>`.
- `UniSerialized` - Factory methods for `UniSerialized<T>`.
- `ExceptionInfoExt` - Extension methods for converting `Exception` to `ExceptionInfo`.

### ActualLab.Text

- `ListFormat` (struct) - Defines a list format with a delimiter and escape character for serializing and parsing lists of strings.
- `ListFormatter` (struct) - A ref struct that formats a sequence of strings into a delimited list using `ListFormat`.
- `ListParser` (struct) - A ref struct that parses a delimited string into individual items using `ListFormat`.
- `ReflectionFormatProvider` - An `IFormatProvider` that resolves format placeholders by reflecting on the argument's properties.
- `StringAsSymbolMemoryPackFormatterAttribute` - Attribute that applies `StringAsSymbolMemoryPackFormatter` to a string field or property for MemoryPack serialization.
- `Base64UrlEncoder` - Encodes and decodes byte data using the URL-safe Base64 variant (RFC 4648).
- `JsonFormatter` - Provides a simple helper for formatting objects as pretty-printed JSON strings.
- `ByteSpanExt` - Extension methods for byte spans providing hex string conversion and XxHash3 hashing.
- `ByteStringExt` - Extension methods for converting byte arrays and memory to `ByteString`.
- `CharSpanExt` - Extension methods for computing XxHash3 hashes over character spans.
- `DecoderExt` - Extension methods for `Decoder`.
- `EncoderExt` - Extension methods for `Encoder`.
- `EncodingExt` - Provides commonly used `Encoding` instances.
- `StringExt` - Extension methods for string providing hashing and suffix trimming.
- `StringBuilderExt` - Provides thread-local pooling for `StringBuilder` instances via Acquire/Release pattern.

### ActualLab.Time

- `IGenericTimeoutHandler` - Defines a handler that is invoked when a timeout fires.
- `MomentClock` - Abstract base class for clocks that produce `Moment` timestamps and support time conversion and delay operations.
- `CoarseSystemClock` - A `MomentClock` that returns a periodically updated time value via `CoarseClockHelper`, trading precision for lower read overhead.
- `ConcurrentFixedTimerSet<TItem>`, `ConcurrentFixedTimerSetOptions` (record) - A concurrent, sharded version of `FixedTimerSet<TItem>` that reduces lock contention by distributing items across multiple internal timer sets.
- `ConcurrentTimerSet<TTimer>`, `ConcurrentTimerSetOptions` (record) - A concurrent, sharded version of `TimerSet<TTimer>` that reduces lock contention by distributing timers across multiple internal timer sets.
- `CpuClock` - A `MomentClock` based on a high-resolution `Stopwatch`, providing monotonically increasing timestamps that do not drift with system clock adjustments.
- `FixedTimerSet<TItem>`, `FixedTimerSetOptions` (record) - Similar to `TimerSet<TTimer>`, but the fire interval is the same for every added item. Internally uses a FIFO queue of (dueAt, item) pairs.
- `GenericTimeoutSlot` (record struct) - Pairs an `IGenericTimeoutHandler` with an argument for use in timer sets.
- `MomentClockSet` - A set of related `MomentClock` instances (system, CPU, server, coarse) used as a single dependency for services that need multiple clock types.
- `RetryDelaySeq` (record) - Defines a retry delay sequence with support for fixed and exponential backoff strategies, including configurable jitter spread.
- `ServerClock` - A `MomentClock` that applies a configurable offset to a base clock, typically used to approximate server time from the client.
- `SystemClock` - A `MomentClock` that returns the current UTC time via `UtcNow`.
- `TickSource` - Provides a shared, coalesced timer tick that multiple consumers can await, reducing the number of individual timers.
- `TimerSet<TTimer>`, `TimerSetOptions` (record) - A priority-based timer set backed by a radix heap, supporting add, update, and remove operations with quantized time resolution.
- `Intervals` - Factory methods for creating fixed and exponential delay sequences.
- `Timeouts` - Provides shared, application-wide `ConcurrentTimerSet<TTimer>` instances for keep-alive and generic timeout management.
- `ClockExt` - Extension methods for `MomentClock` providing delay, timer, and interval operations.
- `DateTimeExt` - Extension methods for `DateTime` providing `Moment` conversion and default kind assignment.
- `DateTimeOffsetExt` - Extension methods for `DateTimeOffset` providing `Moment` conversion.
- `MomentExt` - Extension methods for `Moment` providing null/default conversions and clock-based time conversion.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve `MomentClockSet`.
- `TimeSpanExt` - Extension methods for `TimeSpan` providing clamping, random jitter, and human-readable short string formatting.

### ActualLab.Time.Testing

- `TestClock`, `TestClockSettings` - A `MomentClock` for testing that supports time offsetting, scaling, and on-the-fly settings changes with proper delay recalculation.
- `UnusableClock` - A `MomentClock` that throws on every operation, used as a placeholder when no real clock should be used.

### ActualLab.Versioning

- `IHasVersion<out TVersion>` - Indicates that the implementing type exposes a version property.
- `KeyConflictStrategy` (enum) - Defines strategies for handling key conflicts during entity insertion.
- `VersionGenerator<TVersion>` - Abstract base class for generating new versions from the current `Version`.
- `VersionMismatchException` - Exception thrown when a version does not match the expected version.
- `KeyConflictResolver<TEntity>` (delegate) - A delegate that resolves a key conflict between a new entity and an existing one.
- `VersionChecker` - Provides helpers to check whether a version matches an expected version.
- `LongExt` - Extension methods for formatting `long` and `ulong` values as compact base-32 version strings.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve versioning services.

### ActualLab.Versioning.Providers

- `ClockBasedVersionGenerator` - A `VersionGenerator<TVersion>` that generates monotonically increasing `long` versions based on `MomentClock` ticks.

## ActualLab.Interception

### ActualLab.Interception

- `INotifyInitialized` - Defines a callback invoked when a proxy is fully initialized.
- `IProxy`, `ProxyExt` - Represents a proxy object that can have an `Interceptor` assigned to it.
- `IRequiresAsyncProxy`, `RequiresAsyncProxyExt` - A tagging interface indicating that the implementing type requires an async proxy.
- `IRequiresFullProxy` - A tagging interface indicating that the implementing type requires a full proxy supporting both sync and async method interception.
- `ArgumentListReader` - Abstract visitor for reading items from an `ArgumentList`.
- `ArgumentListWriter` - Abstract visitor for writing items into an `ArgumentList`.
- `Interceptor`, `InterceptorExt` - Base class for method interceptors that handle proxy method calls and dispatch them to typed or untyped handlers.
- `ArgumentList` (record), `ArgumentList0 .. ArgumentList10` (record) - An immutable list of arguments for an intercepted method call, supporting typed access, serialization, and dynamic invoker generation.
- `ArgumentListG1<T0> .. ArgumentListG10<T0, T1, T2, T3>` (record) - A generic `ArgumentList` with N arguments.
- `ArgumentListS1 .. ArgumentListS10` (record) - A non-generic (simple) `ArgumentList` with N arguments stored as objects.
- `ArgumentListType` - Describes the type structure of an `ArgumentList`, including item types, generic/simple partitioning, and a factory for creating instances.
- `Invocation` (struct), `InvocationExt` - Describes a single intercepted method invocation, including the proxy, method, arguments, and the delegate to the original implementation.
- `MethodDef` - Describes an intercepted method, including its return type, parameters, async method detection, and invoker delegates.
- `ProxyIgnoreAttribute` - Marks a method to be ignored by the proxy interceptor.
- `Proxies` - Provides methods for creating proxy instances and resolving generated proxy types for `IRequiresAsyncProxy` base types.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register typed factories.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` related to proxy activation.

### ActualLab.Interception.Interceptors

- `SchedulingInterceptor` - An interceptor that schedules async method invocations via a `TaskFactory` resolved from the proxy instance.
- `ScopedServiceInterceptor` - An interceptor that resolves a scoped service for each method call and invokes the method on that scoped instance.
- `TypedFactoryInterceptor` - An interceptor that resolves service instances via dependency injection, enabling typed factory interfaces to create objects through `ActivatorUtilities`.

## ActualLab.Rpc

### ActualLab.Rpc

- `IBackendService` - This interface indicates that a certain service is available only on backend.
- `IRpcMiddleware` - Defines a middleware that can intercept and transform inbound RPC call processing.
- `IRpcService`, `RpcServiceBuilder` - Marker interface for services that can be invoked via RPC.
- `RpcLocalExecutionMode` (enum), `RpcLocalExecutionModeExt` - Local execution mode for Distributed RPC service methods. Non-distributed RPC servers (services exposed via RPC) don't use call routing and ignore the value of this enum.
- `RpcMethodKind` (enum) - Defines the kind of an RPC method (system, query, command, or other).
- `RpcPeerConnectionKind` (enum), `RpcPeerConnectionKindExt` - Defines the kind of connection used by an RPC peer (remote, loopback, local, or none).
- `RpcPeerStopMode` (enum), `RpcPeerStopModeExt` - Defines how inbound calls are handled when an RPC peer is stopping.
- `RpcServiceMode` (enum), `RpcServiceModeExt` - Defines how an RPC service is registered and accessed (local, server, client, or distributed).
- `RpcSystemMethodKind` (enum), `RpcSystemMethodKindExt` - Defines the kind of a system RPC method (Ok, Error, Cancel, streaming, etc.).
- `RpcClient` - Abstract base class responsible for establishing RPC connections to remote peers.
- `RpcPeer`, `RpcPeerOptions` (record) - Abstract base class representing one side of an RPC communication channel, managing connection state, message serialization, and call tracking.
- `LegacyName` (record), `LegacyNameAttribute` - Represents a legacy name mapping with a maximum version, used for backward-compatible RPC resolution.
- `LegacyNames` - An ordered collection of `LegacyName` entries, indexed by version for backward compatibility.
- `RpcCallTimeouts` (record) - Defines connect, run, and log timeouts for outbound RPC calls.
- `RpcCallType` (record) - Identifies an RPC call type and its corresponding inbound/outbound call implementation types.
- `RpcClientPeer` - Represents the client side of an RPC peer connection, handling reconnection logic.
- `RpcClientPeerReconnectDelayer` - Controls reconnection delay strategy for `RpcClientPeer` instances.
- `RpcConfiguration` - Holds the set of registered RPC service builders and default service mode. Frozen after `RpcHub` construction to prevent further modification.
- `RpcConnection` - Wraps an `RpcTransport` and associated properties for a single RPC connection.
- `RpcException` - Base exception type for RPC-related errors.
- `RpcHub` - Central hub that manages RPC peers, services, and configuration for the RPC infrastructure.
- `RpcLimits` (record) - Defines timeout and periodic limits for RPC connections, keep-alive, and object lifecycle.
- `RpcMethodAttribute`, `RpcMethodResolver` - Configures RPC method properties such as name, timeouts, and local execution mode.
- `RpcMethodDef` - Describes a single RPC method, including its name, kind, serialization, timeouts, and call pipeline.
- `RpcOptionDefaults` - The only purpose of this class struct is to offer extension point for extensions in other parts of Fusion applying overrides to different `RpcXxxOptions.Default`.
- `RpcPeerRef`, `RpcPeerRefExt` - Reference to an RPC peer, encapsulating its address, connection kind, and versioning info.
- `RpcReconnectFailedException` - Thrown when an RPC peer permanently fails to reconnect to the remote host.
- `RpcRerouteException` - Exception indicating that an RPC call must be re-routed to a different peer.
- `RpcRouteState`, `RpcRouteStateExt` - Tracks the routing state of an RPC peer, signaling when a route change (reroute) occurs.
- `RpcSerializationFormat`, `RpcSerializationFormatResolver` (record) - Defines a named RPC serialization format with its argument and message serializer factories.
- `RpcServerPeer` - Represents the server side of an RPC peer connection, waiting for incoming connections.
- `RpcServiceDef` - Describes a registered RPC service, including its type, mode, methods, and server/client instances.
- `RpcServiceRegistry` - Registry of all RPC service definitions, supporting lookup by type, name, and method resolution.
- `RpcStream<T>` - Typed RPC stream that supports serialization, remote enumeration, and batched delivery of items.
- `RpcStreamNotFoundException` - Thrown when an RPC stream cannot be found or has been disconnected.
- `RpcDiagnosticsOptions` (record) - Configuration options for RPC diagnostics, including call tracing and logging factories.
- `RpcInboundCallOptions` (record) - Configuration options for processing inbound RPC calls on a peer.
- `RpcOutboundCallOptions` (record) - Configuration options for outbound RPC calls, including timeouts, routing, and hashing.
- `RpcRegistryOptions` (record) - Configuration options for the `RpcServiceRegistry`, including service and method factories.
- `RpcServiceBuilderSettings` (record) - Base settings class for customizing `RpcServiceBuilder` behavior.
- `RpcBuilder` (struct) - Fluent builder for registering and configuring RPC services in a DI container.
- `RpcFrameDelayer` (delegate) - Delegate that introduces a delay between RPC frames to allow batching of small messages.
- `RpcCallTypes` - Registry of `RpcCallType` instances, mapping call type IDs to their definitions.
- `RpcDefaults` - Provides default API and backend scope names, versions, and peer version sets used by the RPC framework.
- `RpcFrameDelayerFactories` - Provides factory functions that create `RpcFrameDelayer` instances for various delay strategies.
- `RpcFrameDelayers` - Provides static methods for creating `RpcFrameDelayer` implementations (yield, tick, delay).
- `RpcInboundMiddlewarePriority` - Well-known priority constants for ordering `IRpcMiddleware` instances in the pipeline.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register RPC services.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve RPC services.

### ActualLab.Rpc.Caching

- `RpcCacheInfoCaptureMode` (enum) - Defines what cache-related information to capture during an RPC call.
- `RpcCacheEntry` - Represents a cached RPC call result, pairing a `RpcCacheKey` with its `RpcCacheValue`.
- `RpcCacheInfoCapture` - Captures cache key and value information during outbound RPC calls for cache invalidation and reuse.
- `RpcCacheKey` - A composite key for RPC cache lookups, consisting of a method name and serialized argument data.
- `RpcCacheValue` (record) - Represents a cached RPC response value containing serialized data and an optional content hash.

### ActualLab.Rpc.Clients

- `RpcWebSocketClient`, `RpcWebSocketClientOptions` (record) - An `RpcClient` implementation that establishes connections via WebSockets.

### ActualLab.Rpc.Diagnostics

- `RpcCallTracer` - Abstract base class for creating inbound and outbound call traces for an RPC method.
- `RpcInboundCallTrace` - Abstract base class representing a trace for an inbound RPC call with an associated activity.
- `RpcOutboundCallTrace` - Abstract base class representing a trace for an outbound RPC call with an associated activity.
- `RpcCallLogger` - Logs inbound and outbound RPC calls at a configurable log level with optional filtering.
- `RpcCallSummary` (record struct) - Captures the result kind and duration of a completed RPC call for metrics recording.
- `RpcDefaultCallTracer` - Default `RpcCallTracer` that produces OpenTelemetry activities and records call metrics.
- `RpcDefaultInboundCallTrace` - Default inbound call trace that finalizes the activity and records call metrics on completion.
- `RpcDefaultOutboundCallTrace` - Default outbound call trace that finalizes the activity on completion.
- `RpcActivityInjector` - Injects and extracts W3C trace context into/from RPC message headers for distributed tracing.
- `RpcInstruments` - Provides shared OpenTelemetry activity sources, meters, and counters for the RPC framework.

### ActualLab.Rpc.Infrastructure

- `IRpcObject`, `RpcObjectExt` - Represents an RPC object that can be reconnected or disconnected across peers.
- `IRpcPolymorphicArgumentHandler` - Validates inbound RPC calls that have polymorphic arguments.
- `IRpcSharedObject` - An `IRpcObject` that is shared with a remote peer and supports keep-alive tracking.
- `IRpcSystemService` - Marker interface for system-level RPC services used internally by the RPC framework.
- `RpcObjectKind` (enum) - Defines whether an RPC object is local or remote.
- `RpcPeerChangeKind` (enum) - Defines the kind of change detected in a remote peer during handshake comparison.
- `RpcRoutingMode` (enum) - Defines how an RPC call is routed to a peer (outbound, inbound, or pre-routed).
- `RpcCall`, `RpcCallHandler` - Base class for all RPC call instances, holding the method definition and call identifier.
- `RpcCallTracker<TRpcCall>` - Base class for tracking active RPC calls (inbound or outbound) on a peer.
- `RpcObjectTracker` - Base class for tracking RPC objects (shared or remote) associated with a peer.
- `RpcServiceBase` - Base class for RPC services that provides access to the DI container and `RpcHub`.
- `RpcTransport` - Base class for RPC transports that handle message serialization and sending.
- `RpcHandshake` (record) - Serializable handshake data exchanged between RPC peers during connection establishment.
- `RpcInboundCall<TResult>` - Typed `RpcInboundCall` that sends the result as `TResult`.
- `RpcInboundCallTracker` - Tracks active inbound RPC calls on a peer.
- `RpcInboundContext` - Encapsulates the context for processing an inbound RPC message on a peer.
- `RpcInboundInvalidCallTypeCall<TResult>` - Represents an inbound RPC call that failed because its call type ID does not match the expected type.
- `RpcInboundMessage` - A deserialized inbound RPC message containing call type, method reference, arguments, and headers.
- `RpcInboundNotFoundCall<TResult>` - Represents an inbound RPC call whose target service or method could not be found.
- `RpcInterceptor` - Interceptor that routes method invocations to remote RPC peers or local targets based on routing mode.
- `RpcOutboundCall<TResult>` - Typed `RpcOutboundCall` that creates a result source for `TResult`.
- `RpcOutboundCallSetup` - Thread-local setup for the next outbound RPC call, controlling peer, routing, and cache capture.
- `RpcOutboundCallTracker` - Tracks active outbound RPC calls on a peer, handling timeouts, reconnection, and abort.
- `RpcOutboundContext` - Encapsulates the context for sending an outbound RPC call, including headers, routing, and caching.
- `RpcOutboundMessage` - An outbound RPC message ready for serialization, containing method, arguments, and headers.
- `RpcPeerConnectionState` (record), `RpcPeerConnectionStateExt` - Immutable snapshot of an RPC peer's connection state, including handshake, transport, and error info.
- `RpcRemoteObjectTracker` - Tracks remote `IRpcObject` instances using weak references, with periodic keep-alive signaling.
- `RpcSharedObjectTracker` - Tracks locally shared `IRpcSharedObject` instances with keep-alive timeout and automatic disposal.
- `RpcSharedStream<T>` - Typed server-side shared stream that reads from a local source and delivers items to the remote consumer.
- `RpcSimpleChannelTransport` - An `RpcTransport` backed by simple in-memory channels, used for loopback connections.
- `RpcSystemCallSender` - Sends system-level RPC calls (handshake, ok, error, stream control) to a peer's transport.
- `RpcSystemCalls` - Implements `IRpcSystemCalls` to handle system-level RPC messages on the receiving side.
- `RpcPolymorphicArgumentHandlerIsValidCallFunc` (delegate) - Delegate for validating inbound calls with polymorphic arguments.
- `RpcTransportSendHandler` (delegate) - Delegate invoked by `RpcTransport` after message serialization to handle send completion or failure.
- `RpcCallStage` - Defines well-known RPC call completion stage constants and a registry for custom stages.
- `RpcSendHandlers` - Provides built-in `RpcTransportSendHandler` implementations for common send completion scenarios.
- `WellKnownRpcHeaders` - Defines well-known `RpcHeaderKey` constants for hash, version, and tracing headers.
- `RpcHeadersExt` - Extension methods for working with arrays of `RpcHeader`.

### ActualLab.Rpc.Middlewares

- `RpcArgumentNullabilityValidator` (record) - An `IRpcMiddleware` that validates non-nullable reference-type arguments on inbound RPC calls.
- `RpcInboundCallDelayer` (record) - An `IRpcMiddleware` that introduces a configurable random delay before processing inbound RPC calls.
- `RpcMiddlewareContext<T>` - Carries the `IRpcMiddleware` pipeline state for a specific `RpcMethodDef`.
- `RpcMiddlewareOutput<T>` (record struct) - Pairs an `IRpcMiddleware` with its resulting invoker delegate in the middleware pipeline.
- `RpcRouteValidator` (record) - An `IRpcMiddleware` that validates inbound call routing for distributed and client-only services.

### ActualLab.Rpc.Serialization

- `IRequiresItemSize` - Marker interface for message serializers that require item size to be included in the serialized output.
- `RpcArgumentSerializer` - Base class for serializers that encode and decode RPC method argument lists.
- `RpcByteMessageSerializer` - Base class for binary `RpcMessageSerializer` implementations with shared size limits.
- `RpcMessageSerializer` - Base class for serializers that read and write complete RPC messages including headers and arguments.
- `RpcTextMessageSerializer` - Base class for text-based `RpcMessageSerializer` implementations with shared size limits.
- `NullValue` - This type is used to serialize null values for polymorphic arguments. You shouldn't use it anywhere directly.
- `RpcByteArgumentSerializerV4` - V4 binary `RpcArgumentSerializer` that supports polymorphic argument serialization.
- `RpcByteMessageSerializerV4`, `RpcByteMessageSerializerV5` - V4 binary message serializer using LVar-encoded argument data length prefix.
- `RpcByteMessageSerializerV4Compact` - Compact variant of `RpcByteMessageSerializerV4` that transmits method references as hash codes only.
- `RpcByteMessageSerializerV5Compact` - Compact variant of `RpcByteMessageSerializerV5` that transmits method references as hash codes only.
- `RpcTextArgumentSerializerV4` - V4 text-based `RpcArgumentSerializer` that uses a unit-separator delimiter between arguments.
- `RpcTextMessageSerializerV3` - V3 JSON-based text message serializer that uses `JsonRpcMessage` for the message envelope.
- `RpcMessageSerializerReadFunc` (delegate) - Delegate that reads an `RpcInboundMessage` from serialized byte data.
- `RpcMessageSerializerWriteFunc` (delegate) - Delegate that writes an `RpcOutboundMessage` into a byte buffer.

### ActualLab.Rpc.Testing

- `RpcTestClient`, `RpcTestClientOptions` (record) - An `RpcClient` implementation that creates in-memory channel-based connections for testing.
- `RpcTestConnection` - Manages a paired client-server in-memory connection for RPC testing with connect/disconnect/reconnect support.
- `RpcBuilderExt` - Extension methods for `RpcBuilder` that register `RpcTestClient` for in-memory testing.

### ActualLab.Rpc.WebSockets

- `RpcWebSocketTransport` - An `RpcTransport` implementation that sends and receives RPC messages over a `WebSocket` connection.
- `WebSocketOwner` - Owns a `WebSocket` and its associated `HttpMessageHandler`, disposing both on cleanup.
- `WebSocketExt` - Extension methods for `WebSocket` providing cross-platform send and receive overloads.

## ActualLab.Rpc.Server

### ActualLab.Rpc.Server

- `RpcWebSocketServer`, `RpcWebSocketServerOptions` (record), `RpcWebSocketServerBuilder` (struct) - Server-side handler that accepts incoming `WebSocket` connections and establishes RPC peer connections for ASP.NET Core hosts.
- `RpcWebSocketServerPeerRefFactory` (delegate) - Delegate that creates an `RpcPeerRef` for a `WebSocket` server connection based on the `HttpContext` and backend flag.
- `RpcWebSocketServerDefaultDelegates` - Provides default delegate implementations for `RpcWebSocketServer`, including the peer reference factory.
- `AssemblyExt` - Extension methods for `Assembly` to discover Web API controller types.
- `EndpointRouteBuilderExt` - Extension methods for `IEndpointRouteBuilder` to map RPC `WebSocket` server endpoints.
- `HttpConfigurationExt` - Extension methods for `HttpConfiguration` to configure dependency resolution using `IServiceCollection`.
- `RpcBuilderExt` - Extension methods for `RpcBuilder` to add RPC `WebSocket` server support.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register Web API controllers as transient services.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to create `IDependencyResolver` instances for Web API.

## ActualLab.CommandR

### ActualLab.CommandR

- `ICommand<TResult>`, `ICommandHandler<in TCommand>`, `CommandExt` - A command that produces a result of type `TResult`.
- `ICommandService`, `CommandServiceExt` - A tagging interface for command service proxy types.
- `ICommander`, `CommanderBuilder` (struct), `CommanderExt` - The main entry point for executing commands through the handler pipeline.
- `IEventCommand` - Represents an event command that can be dispatched to multiple handler chains identified by `ChainId`.
- `CommandContext<TResult>`, `CommandContextExt` - A strongly-typed `CommandContext` for commands producing `TResult`.
- `CommandExecutionState` (record struct) - Tracks the current position within a `CommandHandlerChain` during command execution.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register the commander.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve commander services.

### ActualLab.CommandR.Commands

- `IBackendCommand<TResult>` - A generic variant of `IBackendCommand` that produces a typed result.
- `IDelegatingCommand<TResult>` - A generic variant of `IDelegatingCommand` that produces a typed result.
- `IOutermostCommand` - A tagging interface that ensures the command always run as the outermost one.
- `IPreparedCommand` - A command that must be prepared before execution.
- `ISystemCommand` - A tagging interface for any command that is triggered as a consequence of another command, i.e., for "second-order" commands.
- `LocalCommand` (record) - Base record for local commands that execute inline via a delegate.

### ActualLab.CommandR.Configuration

- `CommandHandlerFilter` - Defines the contract for filtering which command handlers are used for a given command type.
- `CommandHandler` (record) - Base record for command handler descriptors that participate in the execution pipeline.
- `CommandFilterAttribute` - Marks a method as a command filter handler (a handler with `IsFilter` set to `true`).
- `CommandHandlerAttribute`, `CommandHandlerResolver` - Marks a method as a command handler, optionally specifying priority and filter mode.
- `CommandHandlerChain` - An ordered chain of `CommandHandler` instances (filters and a final handler) that form the execution pipeline for a command.
- `CommandHandlerRegistry` - A registry of all registered `CommandHandler` instances, resolved from the DI container at construction time.
- `CommandHandlerSet` - Holds all resolved `CommandHandlerChain` instances for a specific command type, supporting both regular commands and event commands with multiple chains.
- `FuncCommandHandlerFilter` - A `CommandHandlerFilter` backed by a delegate function.
- `InterfaceCommandHandler` (record) - A `CommandHandler` that invokes a command via the `ICommandHandler<TCommand>` interface on a resolved service.
- `MethodCommandHandler` (record) - A `CommandHandler` that invokes a command by calling a specific method on a resolved service instance.
- `CommandHandlerResolverExt` - Extension methods for `CommandHandlerResolver`.

### ActualLab.CommandR.Diagnostics

- `CommandTracer` - A command filter that creates OpenTelemetry `Activity` instances for command execution and logs errors.
- `CommanderInstruments` - Provides OpenTelemetry instrumentation primitives for the commander pipeline.

### ActualLab.CommandR.Interception

- `CommandHandlerMethodDef` - A `MethodDef` specialized for intercepted command handler methods, validating that the method signature conforms to expected patterns.
- `CommandServiceInterceptor` - An `Interceptor` that guards command service proxy calls, ensuring they are invoked only within an active `CommandContext`.

### ActualLab.CommandR.Operations

- `IOperationEventSource` - Defines the contract for objects that can produce an `OperationEvent`.
- `IOperationScope`, `OperationScopeExt` - Defines the contract for an operation scope that manages the lifecycle of an `Operation` within a command pipeline.
- `NestedOperation` (record) - Represents a nested command operation recorded during execution of a parent operation.
- `Operation` - Represents a recorded operation (a completed command execution) with its nested operations, events, and metadata.
- `OperationEvent` - Represents an event recorded during an `Operation`, typically used for eventual consistency and event replay.

### ActualLab.CommandR.Rpc

- `RpcCommandHandler` - A command filter that routes commands to remote `RpcPeer` instances or executes them locally, with automatic rerouting on topology changes.
- `RpcInboundCommandHandler` (record) - An RPC middleware that routes inbound RPC calls for commands through the `ICommander` pipeline instead of direct method invocation.

## ActualLab.Fusion

### ActualLab.Fusion

- `IComputeService`, `ComputeServiceExt` - A tagging interface for Fusion compute service proxy types.
- `IComputedStateOptions`, `ComputedState<T>` - Configuration options for `IComputedState`.
- `IMutableStateOptions`, `MutableState<T>` - Configuration options for `IMutableState`.
- `ISessionCommand<TResult>`, `SessionCommandExt` - A strongly-typed `ISessionCommand` that returns a result of type `TResult`.
- `IStateOptions<T>`, `State`, `StateFactory`, `StateOptions<T>` (record), `StateExt` - Strongly-typed `IStateOptions` with initial output of type `T`.
- `CallOptions` (enum) - Defines flags controlling how a compute method call is performed.
- `ConsistencyState` (enum), `ConsistencyStateExt` - Defines the consistency state of a `Computed` instance.
- `InvalidationSourceFormat` (enum) - Defines formatting options for displaying `InvalidationSource` values.
- `InvalidationTrackingMode` (enum) - Defines how much detail is retained when tracking invalidation sources.
- `RemoteComputedCacheMode` (enum) - Defines caching behavior for remote computed values.
- `StateEventKind` (enum) - Defines the kinds of lifecycle events raised by a `State`.
- `ComputeFunction`, `ComputeFunctionExt` - Base class for functions that produce `Computed` instances with lock-based concurrency control.
- `Computed<T>`, `ComputedOptions` (record), `ComputedExt` - A strongly-typed `Computed` that holds a `Result<T>` output value.
- `ComputedInput` - Represents the input (arguments) of a compute function, serving as the key for looking up `Computed` instances in the `ComputedRegistry`.
- `ComputedSynchronizer` - Provides synchronization logic for `Computed` instances, ensuring remote computed values are synchronized before use.
- `ComputeContext` - Tracks the current compute call context, including call options and captured computed instances.
- `ComputeMethodAttribute` - Marks a method as a Fusion compute method, enabling automatic caching and invalidation of its `Computed` output.
- `ComputedRegistry` - A global registry that stores and manages all `Computed` instances using weak references, with automatic pruning of collected entries.
- `ComputedSource<T>`, `ComputedSourceExt` - A strongly-typed `ComputedSource` that produces `Computed<T>` values.
- `ConsolidatingComputed<T>` - A `Computed` that implements `IsConsolidating` behavior.
- `DefaultSessionFactory` - Provides factory methods that create `SessionFactory` delegates producing `Session` instances with random string identifiers.
- `FixedDelayer` (record) - An `IUpdateDelayer` with a fixed update delay and configurable retry delays.
- `InvalidationSource` (struct) - Describes the source (origin) of a `Computed` invalidation, which can be a code location, a string label, or a reference to another `Computed`.
- `RemoteComputeMethodAttribute` - Marks a method as a remote compute method, extending `ComputeMethodAttribute` with remote computed caching configuration.
- `RpcDisabledException` - Exception thrown when an RPC call is attempted inside an invalidation block.
- `Session`, `SessionResolver`, `SessionFactory` (delegate), `SessionExt` - Represents an authenticated user session identified by a unique string Id.
- `StateBoundComputed<T>` - A `Computed<T>` produced by and bound to a `State`, notifying the state on invalidation.
- `StateSnapshot` - An immutable snapshot of a `State`'s lifecycle, capturing the current `Computed`, update count, error count, and retry count.
- `UpdateDelayer` (record) - An `IUpdateDelayer` that integrates with `UIActionTracker` to provide instant updates during user interactions.
- `ComputedCancellationReprocessingOptions` (record) - Configuration for reprocessing compute method calls that fail due to cancellation.
- `FusionBuilder` (struct) - A builder for registering Fusion services, compute services, and related infrastructure in an `IServiceCollection`.
- `FusionRpcServiceBuilder` - A Fusion-specific `RpcServiceBuilder` that adds compute service proxy creation and command handler registration support.
- `SessionValidator` (delegate) - A delegate that determines whether a `Session` is valid.
- `ComputedVersion` - Generates globally unique, monotonically increasing version numbers for `Computed` instances using thread-local counters.
- `FusionDefaultDelegates` - Provides default delegate instances used by Fusion infrastructure.
- `Invalidation` - Provides static helpers to check whether invalidation is active and to begin invalidation scopes.
- `StateCategories` - A cache-backed helper for building state category strings from type names and suffixes.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register Fusion services.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to access Fusion services.
- `StateFactoryExt` - Extension methods for `StateFactory`.

### ActualLab.Fusion.Blazor

- `IHasCircuitHub` - Indicates that the implementing type has access to a `CircuitHub` instance.
- `IStatefulComponent<T>`, `StatefulComponentBase<T>` - Defines a Blazor component that owns a typed `IState<T>` instance.
- `ComputedStateComponentOptions` (enum), `ComputedStateComponent<T>` - Defines option flags for `ComputedStateComponent` controlling recomputation, rendering, and dispatch behavior.
- `ParameterComparisonMode` (enum), `ParameterComparisonModeExt` - Defines the parameter comparison strategy for Blazor Fusion components.
- `CircuitHubComponentBase` - Base class for Blazor components that access `CircuitHub` and its commonly used services (session, state factory, `UICommander`, etc.).
- `ComputedRenderStateComponent<TState>` - A computed state component that tracks render state snapshots to avoid redundant re-renders when the state has not changed.
- `FusionComponentBase`, `FusionComponentAttribute` - Base Blazor component with custom parameter comparison and event handling to reduce unnecessary re-renders.
- `MixedStateComponent<T, TMutableState>` - A computed state component that also manages a `MutableState<T>`, automatically recomputing when the mutable state changes.
- `ParameterComparer`, `ParameterComparerAttribute`, `ParameterComparerProvider` - Base class for custom Blazor component parameter comparers used to determine whether a component should re-render.
- `ByIdAndVersionParameterComparer<TId, TVersion>` - A `ParameterComparer` that compares parameters by both Id and Version.
- `ByIdParameterComparer<TId>` - A `ParameterComparer` that compares parameters by their Id.
- `ByNoneParameterComparer` - A `ParameterComparer` that always considers parameters equal (never triggers re-render).
- `ByRefParameterComparer` - A `ParameterComparer` that compares parameters by reference equality.
- `ByUuidAndVersionParameterComparer<TVersion>` - A `ParameterComparer` that compares parameters by both Uuid and Version.
- `ByUuidParameterComparer` - A `ParameterComparer` that compares parameters by their Uuid.
- `ByValueParameterComparer` - A `ParameterComparer` that compares parameters using `Equals(object, object)`.
- `ByVersionParameterComparer<TVersion>` - A `ParameterComparer` that compares parameters by their Version.
- `CircuitHub` - `CircuitHub` is a scoped service caching a set of most frequently used Blazor & Fusion services. In addition to that, it enables access to Blazor `Dispatcher` and provides information about the current `RenderMode`.
- `ComponentFor` - Renders a "dynamically bound" component.
- `ComponentInfo` - Cached metadata about a Blazor component type, including its parameters and their associated comparers for custom change detection.
- `ComponentParameterInfo` - Stores metadata about a single Blazor component parameter, including its property info, comparer, and cascading parameter details.
- `DefaultParameterComparer` - Default parameter comparer that uses known immutable type detection and value equality, mirroring Blazor's built-in change detection logic.
- `JSRuntimeInfo` - Provides information about the current JS runtime, including whether it is remote (Blazor Server) and whether prerendering is in progress.
- `RenderModeHelper` - Provides helpers for querying and switching the current Blazor render mode.
- `RenderModeDef` (record) - Defines a Blazor render mode (e.g., Server, WASM, Auto) with its key and display title.
- `FusionBlazorBuilder` (struct) - Builder for configuring Fusion Blazor integration services such as `CircuitHub`, `UICommander`, and JS runtime info.
- `ComponentExt` - Low-level extension methods for `ComponentBase` providing access to internal Blazor fields (render handle, initialization state) and dispatcher operations.
- `ComputedStateComponentOptionsExt` - Extension methods for `ComputedStateComponentOptions`.
- `FusionBuilderExt` - Extension methods for `FusionBuilder` to add Blazor integration.

### ActualLab.Fusion.Client

- `RemoteComputed<T>`, `RemoteComputedExt` - A `Computed<T>` that is populated from a remote RPC compute call and tracks synchronization state with the server.

### ActualLab.Fusion.Client.Caching

- `FlushingRemoteComputedCache` - A `RemoteComputedCache` that batches write operations and flushes them periodically for better performance.
- `RemoteComputedCache` - Abstract base class for remote computed caches that handle serialization and version-based cache invalidation.
- `InMemoryRemoteComputedCache` - An in-memory implementation of `FlushingRemoteComputedCache`.
- `SharedRemoteComputedCache` - An `IRemoteComputedCache` wrapper that delegates to a shared singleton `RemoteComputedCache` instance.

### ActualLab.Fusion.Client.Interception

- `RemoteComputeMethodFunction<T>` - A strongly-typed `RemoteComputeMethodFunction` that creates `RemoteComputed<T>` instances for remote compute method calls.
- `RemoteComputeServiceInterceptor` - An interceptor for remote compute services that delegates calls to either the local compute method handler or the RPC interceptor.

### ActualLab.Fusion.Diagnostics

- `FusionMonitor` - A background worker that monitors `ComputedRegistry` access and registration statistics, periodically logging them for diagnostics.
- `FusionInstruments` - Provides shared `ActivitySource` and `Meter` instances for Fusion diagnostics.

### ActualLab.Fusion.Extensions

- `IFusionTime` - A compute service that provides auto-invalidating time-related computed values.
- `IKeyValueStore`, `KeyValueStoreExt` - A shard-aware key-value store service with compute method support for invalidation.
- `ISandboxedKeyValueStore`, `SandboxedKeyValueStoreExt` - A session-scoped key-value store that enforces key prefix constraints based on the current session and user.
- `RpcPeerStateKind` (enum) - Defines the high-level connection state kinds for an RPC peer.
- `SortDirection` (enum) - Defines sort direction values for ordered queries.
- `KeyValueStore_Remove` (record) - Backend command to remove one or more keys from the `IKeyValueStore`.
- `KeyValueStore_Set` (record) - Backend command to set one or more key-value entries in the `IKeyValueStore`.
- `PageRef<TKey>` (record) - A typed cursor-based pagination reference with a count and an optional "after" key.
- `RpcPeerRawConnectedState` (record) - Represents the connected state of an RPC peer.
- `RpcPeerRawDisconnectedState` (record) - Represents the disconnected state of an RPC peer, including reconnection timing.
- `RpcPeerRawState` (record) - Represents the raw connection state of an RPC peer.
- `RpcPeerState` (record) - A user-friendly representation of an RPC peer's connection state.
- `RpcPeerStateMonitor` - A background worker that monitors RPC peer connection state changes and exposes the current state via computed properties.
- `SandboxedKeyValueStore_Remove` (record) - Command to remove one or more keys from the `ISandboxedKeyValueStore`.
- `SandboxedKeyValueStore_Set` (record) - Command to set one or more key-value entries in the `ISandboxedKeyValueStore`.
- `EnumerableExt` - Extension methods for `IEnumerable<T>` supporting ordering and pagination.
- `FusionBuilderExt` - Extension methods for `FusionBuilder`.
- `QueryableExt` - Extension methods for `IQueryable<T>` supporting ordering and pagination.

### ActualLab.Fusion.Interception

- `IComputedMethodComputed` - A tagging interface for `Computed` instances produced by compute methods.
- `ComputeMethodComputed<T>` - A `Computed<T>` produced by a compute method interception, which auto-registers and unregisters itself in `ComputedRegistry`.
- `ComputeMethodDef` - Describes a compute method, including its `ComputedOptions` and optional consolidation configuration.
- `ComputeMethodFunction<T>` - A strongly-typed `ComputeMethodFunction` that creates `ComputeMethodComputed<T>` instances.
- `ComputeMethodInput` - A `ComputedInput` representing the arguments of an intercepted compute method call.
- `ComputeServiceInterceptor` - An interceptor that routes compute method calls through `ComputeMethodFunction` to produce cached `Computed` values.
- `ComputedOptionsProvider` - Resolves `ComputedOptions` for compute methods, adjusting cache settings based on the availability of `IRemoteComputedCache`.
- `ConsolidatingComputeMethodFunction<T>` - A strongly-typed `ConsolidatingComputeMethodFunction` that creates `ConsolidatingComputed<T>` instances.

### ActualLab.Fusion.Operations

- `IOperationCompletionListener` - A listener that is notified when an operation completes, enabling side-effect processing such as invalidation.
- `Completion<TCommand>` (record) - Default implementation of `ICompletion<TCommand>` carrying the completed operation.
- `OperationCompletionNotifier` - Default `IOperationCompletionNotifier` that deduplicates operations by UUID and dispatches to all `IOperationCompletionListener` instances.

### ActualLab.Fusion.Operations.Reprocessing

- `OperationReprocessor`, `OperationReprocessorExt` - Tries to reprocess commands that failed with a reprocessable (transient) error. Must be a transient service.

### ActualLab.Fusion.Rpc

- `RpcComputeMethodDef` - An `RpcMethodDef` for compute methods, carrying `ComputedOptions` and using the Fusion-specific RPC call type.
- `RpcComputeServiceDef` - An `RpcServiceDef` for `IComputeService` types, providing access to `ComputedOptionsProvider`.
- `RpcInboundComputeCallHandler` - An RPC middleware that wraps inbound compute method calls in a `ComputeContext` to capture the resulting `Computed` instance.
- `RpcOptionsExt` - Extension methods for `RpcOptionDefaults`.
- `RpcRegistryOptionsExt` - Extension methods for `RpcRegistryOptions` that apply Fusion-specific overrides.

### ActualLab.Fusion.Testing

- `ComputedTest` - Test helpers that repeatedly evaluate an assertion inside a `ComputedSource<T>` until it passes or a timeout is reached.

### ActualLab.Fusion.UI

- `UIAction<TResult>` - A strongly-typed `UIAction` that produces a `UIActionResult<T>` upon completion.
- `UIActionFailureTracker` - Tracks failed `UIAction` results, deduplicating recent errors of the same type and message.
- `UIActionResult<T>` - A strongly-typed `IUIActionResult` carrying the result of a `UIAction<TResult>`.
- `UIActionTracker` - Tracks running and completed `UIAction` instances, enabling `UpdateDelayer` to provide instant updates during user interactions.
- `UICommander` - A command executor for UI layers that wraps each command in a tracked `UIAction` and registers it with the `UIActionTracker`.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve UI-related Fusion services.

## ActualLab.Fusion.Server

### ActualLab.Fusion.Server

- `DefaultDependencyResolver` - An `IDependencyResolver` implementation that delegates to an `IServiceProvider` for Web API dependency injection.
- `JsonifyErrorsAttribute` - An MVC exception filter that serializes exceptions as JSON error responses.
- `TextMediaTypeFormatter` - A `MediaTypeFormatter` that handles plain text (text/plain) content for Web API endpoints.
- `UseDefaultSessionAttribute` - A Web API action filter that replaces default sessions in `ISessionCommand` arguments with the resolved session.
- `FusionMvcWebServerBuilder` (struct) - Builder for configuring Fusion MVC web server services including custom model binder providers and controller registration.
- `FusionWebServerBuilder` (struct) - Builder for configuring Fusion web server services including RPC, session middleware, and render mode endpoints.
- `ApplicationBuilderExt` - Extension methods for `IApplicationBuilder` to configure Fusion middleware.
- `EndpointRouteBuilderExt` - Extension methods for `IEndpointRouteBuilder` to map Fusion render mode endpoints.
- `FusionBuilderExt` - Extension methods for `FusionBuilder` to add Fusion web server services.
- `HttpActionContextExt` - Extension methods for `HttpActionContext` to access per-request item storage in .NET Framework Web API.
- `HttpContextExt` - Extension methods for `IDependencyScope` and `HttpActionContext` to simplify service resolution in Web API.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register Fusion server services.

### ActualLab.Fusion.Server.Controllers

- `RenderModeController` - MVC controller that handles Blazor render mode selection via cookie.

### ActualLab.Fusion.Server.Endpoints

- `RenderModeEndpoint` - Endpoint handler that manages Blazor render mode persistence via cookies and returns redirect results.

### ActualLab.Fusion.Server.Middlewares

- `SessionMiddleware` - ASP.NET Core middleware that resolves or creates a `Session` from cookies and makes it available via `ISessionResolver`.
- `HttpContextExtractors` - Provides factory methods for creating `HttpContext`-based value extractors used to derive session tags or identifiers from incoming requests.

### ActualLab.Fusion.Server.Rpc

- `RpcDefaultSessionReplacer` (record) - RPC middleware that replaces default sessions in inbound calls with the session bound to the current `SessionBoundRpcConnection`.
- `SessionBoundRpcConnection` - An `RpcConnection` that carries an associated `Session`, enabling server-side session resolution for inbound RPC calls.
- `RpcOptionsExt` - Extension methods for `RpcOptionDefaults` to apply Fusion server overrides.
- `RpcPeerOptionsExt` - Extension methods for `RpcPeerOptions` to apply Fusion server overrides, including session-bound connection factory support.

## ActualLab.Fusion.EntityFramework

### ActualLab.Fusion.EntityFramework

- `IHasShard` - Defines the contract for objects that are associated with a specific database shard.
- `DbContextBase`, `DbContextBuilder<TDbContext>` (struct), `DbContextExt` - This type solves a single problem: currently EF Core 6.0 doesn't properly dispose pooled `DbContext`s rendering them unusable after disposal. Details: https://github.com/dotnet/efcore/issues/26202
- `DbEntityConverter<TDbContext, TDbEntity, TModel>` - Abstract base for `IDbEntityConverter<TDbEntity, TModel>` implementations that provides default `ToEntity` and `ToModel` conversion logic.
- `DbProcessorBase<TDbContext>` - Abstract base for database processors scoped to a specific `TDbContext`, with lazy access to `DbHub<TDbContext>`.
- `DbServiceBase<TDbContext>` - Abstract base for database services scoped to a specific `TDbContext`, with lazy access to `DbHub<TDbContext>` and common infrastructure.
- `DbShardWorkerBase<TDbContext>` - Abstract base for shard-aware database workers that automatically spawn per-shard tasks when new shards become available.
- `DbWorkerBase<TDbContext>` - Abstract base for long-running database workers scoped to a specific `TDbContext`, with access to `DbHub<TDbContext>`.
- `DbCustomHint` (record) - A `DbHint` containing a custom SQL hint string passed directly to the formatter.
- `DbEntityResolver<TDbContext, TKey, TDbEntity>` - This type queues (when needed) & batches calls to `Get` with `BatchProcessor<TIn, TOut>` to reduce the rate of underlying DB queries.
- `DbHint` (record) - Base record for database query hints that influence SQL generation (e.g., locking).
- `DbHub<TDbContext>` - Typed `IDbHub` implementation for a specific `TDbContext`, providing `DbContext` creation with execution strategy suspension and operation scope integration.
- `DbLockingHint` (record) - A `DbHint` representing row-level locking modes (e.g., Share, Update).
- `DbShardResolver<TDbContext>`, `DbShard` - Default `IDbShardResolver<TDbContext>` that resolves shards from `Session`, `IHasShard`, and `ISessionCommand` objects.
- `DbShardRegistry<TContext>` - Default `IDbShardRegistry<TContext>` implementation that maintains shard sets, tracks used shards, and computes event processor shards.
- `DbWaitHint` (record) - A `DbHint` representing lock wait behavior (e.g., NoWait, SkipLocked).
- `ShardDbContextFactory<TDbContext>`, `ShardDbContextBuilder<TDbContext>` (struct) - Default `IShardDbContextFactory<TDbContext>` implementation that caches per-shard `IDbContextFactory<TDbContext>` instances built by a `ShardDbContextFactoryBuilder<TDbContext>`.
- `DbOperationsBuilder<TDbContext>` (struct) - A builder for configuring database operation services such as operation scopes, log readers, log trimmers, and completion listeners for a specific `DbContext`.
- `DbIsolationLevelSelector<TDbContext>` (delegate) - A delegate that selects the `IsolationLevel` for a given `CommandContext` scoped to a specific `DbContext` type.
- `ShardDbContextFactoryBuilder<TDbContext>` (delegate) - A delegate that builds an `IDbContextFactory<TDbContext>` for a given shard.
- `DbHintSet` - Provides commonly used `DbHint` arrays for query locking and wait behavior.
- `DbKey` - Helper for composing composite primary key values for Entity Framework lookups.
- `ActivityExt` - Extension methods for `Activity` to add shard-related tags.
- `DbContextOptionsBuilderExt` - Extension methods for `DbContextOptionsBuilder` to register an `IDbHintFormatter` implementation.
- `DbEntityResolverExt` - Extension methods for `IDbEntityResolver<TKey, TDbEntity>` providing single-shard shortcuts and batch entity retrieval helpers.
- `DbSetExt` - Extension methods for `DbSet<TEntity>` providing query hint application and row-level locking shortcuts.
- `FusionBuilderExt` - Extension methods for `FusionBuilder` to register global `DbIsolationLevelSelector` instances.
- `IsolationLevelExt` - Extension methods for `IsolationLevel` providing combinators such as `Or` and `Max`.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register `DbContextBuilder<TDbContext>` services and transient `DbContext` factories.
- `ServiceProviderExt` - Extension methods for `IServiceProvider` to resolve common Fusion EntityFramework services such as `DbHub<TDbContext>` and entity resolvers.

### ActualLab.Fusion.EntityFramework.LogProcessing

- `IDbEventLogEntry` - Extends `IDbLogEntry` with a `DelayUntil` timestamp for timed event log entries.
- `IDbIndexedLogEntry` - Extends `IDbLogEntry` with a sequential index for ordered log entries such as operation logs.
- `IDbLogEntry` - Defines the contract for a database log entry with UUID, version, state, and timestamp.
- `IDbLogTrimmer`, `DbLogTrimmerOptions` (record) - Defines the contract for a service that trims old database log entries.
- `DbLogKind` (enum), `DbLogKindExt` - Defines the kind of database log: operation log or event log.
- `LogEntryState` (enum) - Defines processing state values for database log entries.
- `DbEventLogReader<TDbContext, TDbEntry, TOptions>`, `DbEventLogReaderOptions` (record) - Abstract base for reading and processing event log entries from the database, using exclusive row locking to ensure each event is processed exactly once.
- `DbEventLogTrimmer<TDbContext, TDbEntry, TOptions>` - Abstract base for periodically trimming old event log entries from the database based on `MaxEntryAge`.
- `DbLogReader<TDbContext, TDbKey, TDbEntry, TOptions>`, `DbLogReaderOptions` (record) - Abstract base for shard-aware database log readers that process entries in batches, handle reprocessing on failures, and coordinate with `IDbLogWatcher<TDbContext, TDbEntry>`.
- `DbLogWatcher<TDbContext, TDbEntry>` - Abstract base for `IDbLogWatcher<TDbContext, TDbEntry>` implementations that manage per-shard watchers to detect log changes.
- `DbOperationLogReader<TDbContext, TDbEntry, TOptions>`, `DbOperationLogReaderOptions` (record) - Abstract base for reading and processing indexed operation log entries from the database, tracking the next expected index per shard.
- `DbOperationLogTrimmer<TDbContext, TDbEntry, TOptions>` - Abstract base for periodically trimming old indexed operation log entries from the database based on `MaxEntryAge`.
- `FakeDbLogWatcher<TDbContext, TDbEntry>` - A no-op `IDbLogWatcher<TDbContext, TDbEntry>` placeholder that logs a warning about missing watcher configuration. Change notifications rely on periodic polling.
- `FileSystemDbLogWatcher<TDbContext, TDbEntry>`, `FileSystemDbLogWatcherOptions<TDbContext>` (record) - An `IDbLogWatcher<TDbContext, TDbEntry>` that uses file system watchers to detect log changes via tracker files on disk.
- `LocalDbLogWatcher<TDbContext, TDbEntry>` - A local (in-process) `IDbLogWatcher<TDbContext, TDbEntry>` that immediately notifies watchers on the same host without inter-process communication.
- `LogEntryNotFoundException` - The exception thrown when a requested log entry is not found in the database.

### ActualLab.Fusion.EntityFramework.Operations

- `DbShardWatcher` - Watches a single database shard for changes and exposes a `WhenChanged` task that completes when the shard's log is updated.
- `DbEvent` - Entity Framework entity representing a persisted operation event in the "_Events" table, supporting delayed processing and state tracking.
- `DbEventProcessor<TDbContext>` - Processes `OperationEvent` instances stored as `DbEvent` entries, dispatching command events via the `ICommander`.
- `DbOperation` - Entity Framework entity representing a persisted operation in the "_Operations" table, used for cross-host operation log replication and invalidation.
- `DbOperationCompletionListener<TDbContext>` - Listens for locally completed operations and notifies log watchers to trigger remote invalidation and event processing.
- `DbOperationFailedException` - The exception thrown when a database operation fails during commit or processing.
- `DbOperationScope<TDbContext>`, `DbOperationScopeProvider` - A typed `DbOperationScope` bound to a specific `DbContext`, managing the transaction lifecycle, operation/event persistence, and commit verification.

### ActualLab.Fusion.EntityFramework.Operations.LogProcessing

- `DbEventLogReader<TDbContext>` - Reads and processes `DbEvent` log entries, dispatching them through `DbEventProcessor<TDbContext>`.
- `DbEventLogTrimmer<TDbContext>` - Trims processed and discarded `DbEvent` entries that exceed the configured maximum age.
- `DbOperationLogReader<TDbContext>` - Reads and processes `DbOperation` log entries, notifying remote hosts about completed operations for cache invalidation.
- `DbOperationLogTrimmer<TDbContext>` - Trims old `DbOperation` log entries that exceed the configured maximum age.

### Microsoft.EntityFrameworkCore

- `IDbContextFactory<out TContext>` - Defines a factory for creating `DbContext` instances. A service of this type is registered in the dependency injection container by the `AddDbContextPool` methods.
- `IndexAttribute` - Fake `IndexAttribute` is used only to keep models the same for all targets.
- `RelationalDatabaseFacadeExtensions` - Provides methods to set the underlying `DbConnection` on a `DatabaseFacade` via reflection (NETSTANDARD2_0 compatibility shim).

### Microsoft.Extensions.DependencyInjection

- `EntityFrameworkServiceCollectionExtensions` - Extension methods for setting up Entity Framework related services in an `IServiceCollection`.

## ActualLab.Fusion.EntityFramework.Npgsql

### ActualLab.Fusion.EntityFramework.Npgsql

- `NpgsqlDbLogWatcher<TDbContext, TDbEntry>`, `NpgsqlDbLogWatcherOptions<TDbContext>` (record) - An `IDbLogWatcher<TDbContext, TDbEntry>` that uses PostgreSQL LISTEN/NOTIFY to detect database log changes across hosts.
- `DbContextOptionsBuilderExt` - Extension methods for `DbContextOptionsBuilder` to register the PostgreSQL-specific `NpgsqlDbHintFormatter`.
- `DbOperationsBuilderExt` - Extension methods for `DbOperationsBuilder<TDbContext>` to register the PostgreSQL LISTEN/NOTIFY-based operation log watcher.

## ActualLab.Fusion.EntityFramework.Redis

### ActualLab.Fusion.EntityFramework.Redis

- `RedisDbLogWatcher<TDbContext, TDbEntry>`, `RedisDbLogWatcherOptions<TDbContext>` (record) - An `IDbLogWatcher<TDbContext, TDbEntry>` that uses Redis pub/sub to detect database log changes across hosts.
- `DbContextBuilderExt` - Extension methods for `DbContextBuilder<TDbContext>` to register Redis database connections for use with Fusion EntityFramework services.
- `DbOperationsBuilderExt` - Extension methods for `DbOperationsBuilder<TDbContext>` to register the Redis pub/sub-based operation log watcher.

## ActualLab.Fusion.Blazor.Authentication

### ActualLab.Fusion.Blazor.Authentication

- `AuthState`, `AuthStateProvider` - Extends `AuthenticationState` with Fusion's `User` model and forced sign-out status.
- `ChangeAuthStateUICommand` - A UI command representing an authentication state change, used to track auth state transitions via the UI action tracker.
- `ClientAuthHelper` - Client-side helper for performing sign-in, sign-out, and session management operations via JavaScript interop and the `IAuth` service.
- `FusionBlazorBuilderExt` - Extension methods for `FusionBlazorBuilder` to add Blazor authentication and presence reporting services.

## ActualLab.Fusion.Ext.Contracts

### ActualLab.Fusion.Authentication

- `IAuth` - The primary authentication service contract, providing sign-out, user editing, presence updates, and session/user query methods.
- `IAuthBackend` - Backend authentication service contract for sign-in, session setup, and session options management.
- `AuthBackend_SetupSession` (record) - Backend command to set up or update session metadata (IP address, user agent, options).
- `AuthBackend_SignIn` (record) - Backend command to sign in a user with the specified identity.
- `Auth_EditUser` (record) - Command to edit the current user's profile (e.g., name) within a session.
- `Auth_SignOut` (record) - Command to sign out a session, optionally kicking other user sessions.
- `PresenceReporter` - A background worker that periodically reports user presence via `UpdatePresence`.
- `ServerAuthHelper` - Server-side helper that synchronizes ASP.NET Core authentication state with Fusion's `IAuth` service on each HTTP request.
- `SessionAuthInfo` (record) - Stores authentication-related information for a session, including the authenticated identity, user ID, and forced sign-out status.
- `SessionInfo` (record) - Stores detailed information about a user session, including version, timestamps, IP address, user agent, and additional options.
- `User` (record), `UserExt` - Represents an authenticated or guest user with claims, identities, and version tracking.
- `AuthBackend_SetSessionOptions` (record) - Backend command to set session options for the specified session.
- `DbAuthServiceBuilder` (struct) - Builder for configuring database-backed authentication services, including repositories, entity converters, and session trimmer.
- `EndpointRouteBuilderAuthExt` - Extension methods for `IEndpointRouteBuilder` to map Fusion authentication endpoints.
- `FusionBuilderExt` - Extension methods for `FusionBuilder` to register authentication client services.
- `FusionMvcWebServerBuilderExt` - Extension methods for `FusionMvcWebServerBuilder` to register MVC-based authentication controllers.
- `FusionWebServerBuilderExt` - Extension methods for `FusionWebServerBuilder` to register authentication endpoints and server auth helpers.
- `HttpContextExt` - Extension methods for `HttpContext` to retrieve authentication schemes and remote IP addresses.

## ActualLab.Fusion.Ext.Services

### ActualLab.Fusion.Authentication.Controllers

- `AuthController` - MVC controller that handles sign-in and sign-out HTTP requests by delegating to `AuthEndpoints`.

### ActualLab.Fusion.Authentication.Endpoints

- `AuthEndpoints` - Handles sign-in and sign-out HTTP requests using ASP.NET Core authentication.

### ActualLab.Fusion.Authentication.Services

- `DbAuthService<TDbContext>` - Abstract base class for database-backed authentication services, defining the `IAuth` and `IAuthBackend` contract methods.
- `DbSessionInfoTrimmer<TDbContext>` - Abstract base class for a background worker that trims expired session records.
- `DbSessionInfo<TDbUserId>` - Entity Framework entity representing a session record in the database, including authentication state and metadata.
- `DbSessionInfoConverter<TDbContext, TDbSessionInfo, TDbUserId>` - Converts between `DbSessionInfo<TDbUserId>` entities and `SessionInfo` models.
- `DbSessionInfoRepo` - Default database repository for session info entities, supporting CRUD operations and trimming of expired sessions.
- `DbUser<TDbUserId>` - Entity Framework entity representing a user record in the database, with claims and identity associations.
- `DbUserConverter<TDbContext, TDbUser, TDbUserId>` - Converts between `DbUser<TDbUserId>` entities and `User` models.
- `DbUserIdHandler<TDbUserId>` - Default implementation of `IDbUserIdHandler<TDbUserId>` using converters for parsing and formatting user IDs.
- `DbUserIdentity<TDbUserId>` - Entity Framework entity representing a user identity record in the database.
- `DbUserRepo` - Default database repository for user entities, supporting CRUD and lookup by identity.
- `InMemoryAuthService` - In-memory implementation of `IAuth` and `IAuthBackend` for testing and client-side scenarios.
- `DbAuthIsolationLevelSelector` - Selects the database isolation level for authentication-related commands.

### ActualLab.Fusion.Extensions.Services

- `DbKeyValue` - Entity Framework entity representing a key-value pair with optional expiration.
- `DbKeyValueStore` - Database-backed implementation of `IKeyValueStore` using Entity Framework Core.
- `DbKeyValueTrimmer` - A background worker that periodically removes expired key-value entries from the database.
- `InMemoryKeyValueStore` - An in-memory implementation of `IKeyValueStore` suitable for client-side use cases and testing.
- `SandboxedKeyValueStore<TContext>` - Implementation of `ISandboxedKeyValueStore` that delegates to `IKeyValueStore` with session- and user-scoped key constraints.

## ActualLab.Serialization.NerdbankMessagePack

### ActualLab.Serialization

- `NerdbankMessagePackByteSerializer`, `NerdbankMessagePackByteSerializer<T>` - An `IByteSerializer` implementation backed by Nerdbank.MessagePack with custom converters for Fusion types.
- `NerdbankMessagePackSerialized<T>` - A `ByteSerialized<T>` variant that uses `NerdbankMessagePackByteSerializer` for serialization.
- `TypeDecoratingNerdbankMessagePackSerialized<T>` - A `ByteSerialized<T>` variant that uses type-decorating Nerdbank.MessagePack serialization.
- `RpcNerdbankSerializationFormat` - Registers `nmsgpack6`/`nmsgpack6c` RPC serialization formats backed by Nerdbank.MessagePack. Call `Register()` at startup to enable.

## ActualLab.Redis

### ActualLab.Redis

- `RedisSubBase` - Abstract base class for Redis pub/sub subscribers, managing subscription lifecycle, timeout handling, and message dispatch.
- `RedisActionSub<T>` - A Redis subscriber that deserializes messages to `T` and invokes a callback action for each received message.
- `RedisChannelSub<T>` - A Redis subscriber that deserializes messages to `T` and writes them to a `Channel<T>` for asynchronous consumption.
- `RedisComponent<T>` - Lazily resolves and caches a Redis component of type `T` (such as `IDatabase` or `ISubscriber`) from a `RedisConnector`, automatically reconnecting when needed.
- `RedisConnector` - Manages a resilient connection to Redis with automatic reconnection, configurable retry delays, and a watchdog that detects disconnections.
- `RedisDb<TContext>`, `RedisDbExt` - A typed `RedisDb` scoped by `TContext` for multi-context dependency injection.
- `RedisHash` - Provides operations on a Redis hash data structure, including get, set, remove, increment, and clear.
- `RedisPub<T>` - Publishes typed `T` messages to a Redis pub/sub channel using an `IByteSerializer<T>`.
- `RedisQueue<T>` - A Redis-backed FIFO queue for typed `T` items with pub/sub-based enqueue notifications and serialization support.
- `RedisSequenceSet<TScope>` - A typed `RedisSequenceSet` scoped by `TScope` for multi-context dependency injection.
- `RedisStreamer<T>` - Provides streaming read/write operations over a Redis Stream for typed `T` items, with pub/sub-based change notifications.
- `RedisTaskSub<T>` - A Redis subscriber that deserializes messages to `T` and exposes the next received message as an awaitable `Task<T>`.
- `ServiceCollectionExt` - Extension methods for `IServiceCollection` to register `RedisDb` and `RedisConnector` services.
