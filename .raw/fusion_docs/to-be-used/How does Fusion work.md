# How does Fusion work?

We said Fusion has two core capabilities:
1. Keeping Data Fresh
2. Making Apps Fast

How does it achieve this?
Fusion works by combining two key concepts:
- Smart caching: It remembers the results of computations
- Dependency tracking: It knows which data depends on other data

Think of it like MSBuild or Make:
- When a source file changes, dependent build targets are marked as outdated
- But they don't rebuild until you actually run the build
- Only outdated targets rebuild; everything else stays cached

Similarly, with Fusion:
- When data changes, dependent computed values are immediately marked as inconsistent
- But they don't recompute until someone requests them (lazy computation)
- Old values remain accessible—UI can keep displaying them while updates are in progress
- You trigger invalidation in your code by calling methods inside `Invalidation.Begin()` block
- Fusion automatically tracks which methods called which, building a dependency graph
- When something is invalidated, Fusion knows exactly what else becomes inconsistent

There's a saying that there are only two hard problems in computer science: cache invalidation and naming things. And because we are trying to solve the easier one of the two, but we need to do that perfectly (as there's nothing worse than a half-working caching system), the devil is in the details. That's why it is good to make a distinction between different degrees of complexity:

1. Server-side only: Simplest scenario, just caching on one server
2. Client & server: Adding real-time updates to browsers
3. Distributed: Working across multiple servers

Fusion supports all of these scenarios, but the simpler the scenario, the less components you need to understand.

# Components

## Basic Components for just caching on one server

These components form the core of Fusion. They are essential for every scenario, whether you're building a simple single-server application or a complex distributed solution. If you want to understand Fusion, start here:

- **Compute Services** - The core concept where you define what needs to be cached:
  - Define computed values using C# methods
  - Results are automatically cached
  - Support for async computations
  - Built-in error handling and retry logic
- **Invalidation System** - Control cache invalidation using `using (Invalidation.Begin()) { ... }` blocks:
  - Explicit invalidation control
  - Transactional invalidation support
  - Batching of multiple invalidations
- **Dependency Tracking** - Fusion's system for tracking what depends on what:
  - Automatic dependency detection
  - Fine-grained invalidation
  - Minimal recomputation on changes

## Client-side components, adding real-time updates to browsers 
(Blazor only atm. Typescript implementation should be feasible)

To enable real-time updates, Fusion extends its core functionality with:
- **ActualLab.Rpc** - Fusion's optimized client-server communication:
  - WebSocket-based RPC protocol
  - 1.5x faster than SignalR
  - Uses MemoryPack or MessagePack for efficient serialization
  - Eliminates chattiness through smart batching
- **Blazor Integration** - Uses `ComputedStateComponent<T>` for reactive UI updates:
  - Client-side caching of server responses
  - Automatic updates when server state changes
  - Smart bundling of multiple server calls
- **Session Management** - Handles user sessions across the application:
  - User session tracking across the application
  - Consistent session state between client and server
  - Integration with authentication system
- **Authentication (IAuth)** - Optional authentication integration:
  - Real-time auth state synchronization
  - Works in both Server and WebAssembly modes

## Components for distributed scenarios, working across multiple servers

For multi-server deployments, Fusion adds:
- **Operation Framework (OF)** - Fusion's way of handling data modifications:
  - Transactional operations across servers
  - Command execution and routing via Commander
  - Operation logging and replay
  - Automatic conflict resolution
  - Cluster-wide operation coordination
- **RpcCallRouter** - Manages server-to-server communication:
  - Smart routing of RPC calls
  - Distributed computation coordination
  - Load balancing and failover
  - Cluster-wide state consistency
