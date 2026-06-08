# ActualLab.Fusion vs GraphQL

GraphQL is a query language and runtime for APIs that lets clients request exactly the data they need. Both Fusion and GraphQL improve on traditional REST patterns, but they solve different problems.

## The Core Difference

**GraphQL** is an API layer that gives clients flexible querying capabilities. Clients specify what data they want; the server resolves it. Real-time updates require separate subscription infrastructure.

**Fusion** is a caching and synchronization layer where clients call methods and automatically receive updates when results change. The API is defined by C# interfaces, not a query language.

## GraphQL Approach

```graphql
# Schema
type User {
    id: ID!
    name: String!
    posts: [Post!]!
}

type Query {
    user(id: ID!): User
}

type Subscription {
    userUpdated(id: ID!): User
}
```

```csharp
// Server resolver
public class Query
{
    public async Task<User> GetUser(string id, [Service] IUserRepository repo)
        => await repo.GetById(id);
}

// Client query
var result = await client.User.ExecuteAsync(userId);
var userName = result.Data.User.Name;

// Subscriptions require separate setup
await foreach (var update in client.UserUpdated.Watch(userId))
    Console.WriteLine(update.Data.UserUpdated.Name);
```

## Fusion Approach

```csharp
// Server service
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string id, CancellationToken ct)
        => await _db.Users.FindAsync(id, ct);

    [ComputeMethod]
    public virtual async Task<Post[]> GetUserPosts(string userId, CancellationToken ct)
        => await _db.Posts.Where(p => p.UserId == userId).ToArrayAsync(ct);
}

// Client - automatic updates, no subscription setup needed
var computed = await Computed.Capture(() => userService.GetUser(userId));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine(c.Value.Name);
```

## Where Each Excels

### ActualLab.Fusion is better at

- **Fetching exactly what's needed** — UI components declare dependencies, Fusion fetches only that
- Real-time updates without subscription infrastructure
- Automatic caching with dependency-based invalidation
- Simple dependency tracking (no DataLoader needed)
- No manual query construction or state spreading
- Can also expose services via REST or GraphQL (mix and match)

### GraphQL is better at

- Flexible queries where clients specify exact fields needed
- Language-agnostic API contracts via schema
- Serving diverse clients with different data needs
- Excellent tooling (GraphiQL, Apollo DevTools)
- Public APIs consumed by external teams

## Feature Comparison

| Feature | GraphQL | Fusion |
|---------|---------|--------|
| Query flexibility | Client specifies fields | Fixed method signatures |
| Real-time | Subscriptions (extra setup) | Automatic |
| Caching | Client-side (Apollo, Relay) | Server + client |
| Type system | GraphQL SDL | C# interfaces |
| Batching | DataLoader pattern | Automatic |
| Tooling | Extensive | IDE support |

## When to Use Each

### Choose GraphQL when:
- Clients need flexible, ad-hoc queries
- Multiple client platforms (mobile, web, third-party)
- API is public or consumed by external teams
- You want language-agnostic API contracts
- Team is familiar with GraphQL ecosystem

### Choose Fusion when:
- Building a .NET application (especially Blazor)
- Real-time updates are a primary requirement
- API consumers are your own applications
- You want simpler caching (no normalized cache management)
- Method-based API is sufficient

## The Fetching Problem

**GraphQL**: You manually construct queries that fetch data in bulk, then spread it into client state:

```javascript
// Manual query construction - what if you fetch more than needed?
const GET_USER_DATA = gql`
  query GetUserData($id: ID!) {
    user(id: $id) {
      name
      email
      avatar
      posts { title, createdAt }
      friends { name, avatar }
      settings { theme, notifications }
    }
  }
`;

// Then manually spread into state
const { data } = useQuery(GET_USER_DATA, { variables: { id } });
setUser(data.user);
setPosts(data.user.posts);
// ...tedious state spreading
```

**Fusion**: Each UI component declares what it needs; Fusion fetches exactly that:

```csharp
// UserProfile component
protected override Task<User> ComputeState(CancellationToken ct)
    => UserService.GetUser(UserId, ct);  // Fetches only user

// PostList component (different part of UI)
protected override Task<Post[]> ComputeState(CancellationToken ct)
    => PostService.GetUserPosts(UserId, ct);  // Fetches only posts

// Each fetches only what it needs, cached independently, updated independently
```

No manual query construction. No state spreading. No over-fetching.

## The N+1 Problem

**GraphQL** requires DataLoader to batch nested queries:

```csharp
// Without DataLoader: N+1 queries
public async Task<IEnumerable<Post>> GetPosts([Parent] User user)
    => await _db.Posts.Where(p => p.UserId == user.Id).ToListAsync();

// With DataLoader: Batched
public async Task<IEnumerable<Post>> GetPosts([Parent] User user, PostsByUserDataLoader loader)
    => await loader.LoadAsync(user.Id);
```

**Fusion** dependency tracking naturally handles this:

```csharp
[ComputeMethod]
public virtual async Task<UserWithPosts> GetUserWithPosts(string id, CancellationToken ct)
{
    var user = await GetUser(id, ct);        // Cached
    var posts = await GetUserPosts(id, ct);  // Cached
    return new UserWithPosts(user, posts);   // Dependencies tracked
}
```

## Real-Time Comparison

**GraphQL Subscriptions:**
```graphql
subscription {
    userUpdated(id: "123") {
        name
        email
    }
}
```
Requires: WebSocket infrastructure, subscription resolver, pub/sub system

**Fusion:**
```csharp
await foreach (var c in computed.Changes(ct))
    UpdateUI(c.Value);
```
Requires: Nothing extra — invalidation automatically notifies observers

## Combining Both

You can use GraphQL as your public API while using Fusion internally:

```csharp
// GraphQL resolver using Fusion for caching and real-time
public class Query
{
    public async Task<User> GetUser(string id, [Service] UserService userService)
        => await userService.GetUser(id, default);  // Cached by Fusion
}

// Subscriptions backed by Fusion invalidation
public class Subscription
{
    public async IAsyncEnumerable<User> UserUpdated(string id,
        [Service] UserService userService,
        [EnumeratorCancellation] CancellationToken ct)
    {
        var computed = await Computed.Capture(() => userService.GetUser(id, default));
        await foreach (var c in computed.Changes(ct))
            yield return c.Value;
    }
}
```

## The Key Insight

GraphQL excels at **API flexibility** — letting diverse clients query exactly what they need from a single endpoint.

Fusion excels at **real-time synchronization** — keeping clients automatically updated when server data changes.

If your main challenge is serving diverse clients with different data needs, GraphQL's flexible queries are valuable. If your main challenge is keeping all clients in sync with changing data, Fusion's automatic invalidation is more powerful than GraphQL subscriptions.

For .NET applications where you control both client and server, Fusion often provides a simpler path to real-time features without the complexity of GraphQL subscriptions and normalized caching.
