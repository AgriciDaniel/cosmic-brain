# ActualLab.Fusion vs Firebase / Firestore

Firebase (including Firestore) is Google's Backend-as-a-Service platform with real-time database capabilities. Both Firebase and Fusion enable real-time data synchronization, but they represent fundamentally different approaches.

## The Core Difference

**Firebase/Firestore** is a managed backend service. Your data lives in Google's cloud; you subscribe to collections/documents; Firebase handles synchronization. You don't write backend code — Firebase is your backend.

**Fusion** is a framework for building your own backend with real-time capabilities. Your data lives in your database; Fusion handles caching and client synchronization. You write the backend logic.

## Firebase Approach

```javascript
// Client-side only — Firebase IS the backend
import { doc, onSnapshot } from 'firebase/firestore';

// Subscribe to a document
const unsubscribe = onSnapshot(doc(db, 'users', userId), (doc) => {
    console.log('User data:', doc.data());
});

// Write data — Firebase syncs to all subscribers
await updateDoc(doc(db, 'users', userId), { name: 'New Name' });
```

## Fusion Approach

```csharp
// Server-side — you control the backend
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);

    [CommandHandler]
    public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.UserId, cmd.Data, ct);
        if (Invalidation.IsActive)
            _ = GetUser(cmd.UserId, default);
    }
}

// Client-side — observes server-computed values
var computed = await Computed.Capture(() => userService.GetUser(userId));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine($"User: {c.Value.Name}");
```

## Where Each Excels

### ActualLab.Fusion is better at

- Complex business logic on the server
- Custom data access patterns and queries
- Integration with existing databases (SQL, etc.)
- Full control over data model and storage
- Computed/derived values with dependency tracking

### Firebase/Firestore is better at

- Rapid prototyping without backend code
- Mobile-first applications with offline sync
- Serverless architecture (no servers to manage)
- Built-in authentication and security rules
- Global scale without infrastructure management

## Platform Comparison

| Aspect | Firebase/Firestore | Fusion |
|--------|-------------------|--------|
| Backend | Managed by Google | You build and host |
| Database | Firestore (NoSQL) | Your choice (SQL, etc.) |
| Business logic | Cloud Functions or client | Your server code |
| Data location | Google Cloud | Your infrastructure |
| Offline support | Built-in | Client-side cache |
| Pricing | Pay per operation | Your hosting costs |
| Vendor lock-in | High | None |

## When to Use Each

### Choose Firebase when:
- Rapid prototyping or MVP development
- Mobile apps needing offline-first sync
- You don't want to build/manage a backend
- Simple data model fits NoSQL well
- Google Cloud ecosystem is acceptable

### Choose Fusion when:
- Complex business logic belongs on the server
- You need a relational database (PostgreSQL, SQL Server)
- Data privacy requires your own infrastructure
- You want full control over your backend
- Building with .NET (especially Blazor)

## Architectural Comparison

**Firebase Architecture:**
```
┌─────────────┐         ┌─────────────────────────┐
│ Mobile/Web  │◀──────▶│     Firebase/Firestore   │
│   Client    │  sync   │    (Google-managed)     │
└─────────────┘         └─────────────────────────┘
                        No custom backend needed
```

**Fusion Architecture:**
```
┌─────────────┐         ┌─────────────────────────┐         ┌──────────┐
│ Blazor/     │◀──────▶│    Your .NET Backend    │◀───────▶│  Your    │
│ .NET Client │  Fusion │  (Fusion Compute Svcs)  │         │ Database │
└─────────────┘         └─────────────────────────┘         └──────────┘
                        Full control over logic
```

## Real-Time Model Comparison

**Firebase:**
```javascript
// Client subscribes directly to data
onSnapshot(collection(db, 'orders'), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') handleNewOrder(change.doc.data());
    });
});
```

**Fusion:**
```csharp
// Client observes server-computed values
[ComputeMethod]
public virtual async Task<Order[]> GetPendingOrders(CancellationToken ct)
{
    // Server-side filtering, joining, computing
    return await _db.Orders
        .Where(o => o.Status == OrderStatus.Pending)
        .Include(o => o.Customer)
        .OrderBy(o => o.Priority)
        .ToArrayAsync(ct);
}
```

## Computed Values

Firebase gives you raw data; derived values must be computed client-side or via Cloud Functions.

Fusion excels at computed/derived values:

```csharp
[ComputeMethod]
public virtual async Task<DashboardData> GetDashboard(string userId, CancellationToken ct)
{
    var user = await GetUser(userId, ct);
    var orders = await GetUserOrders(userId, ct);
    var stats = await ComputeUserStats(userId, ct);

    return new DashboardData {
        User = user,
        RecentOrders = orders.Take(5),
        TotalSpent = stats.TotalSpent,
        LoyaltyTier = CalculateTier(stats)  // Complex server-side logic
    };
}
// Client observes DashboardData; auto-updates when any dependency changes
```

## The Key Insight

Firebase is a **managed backend service** — you trade control for convenience. Great for rapid development, mobile-first apps, and teams that don't want to manage infrastructure.

Fusion is a **framework for building your backend** — you maintain control over your data, logic, and infrastructure. Great for complex applications, .NET teams, and scenarios requiring custom data handling.

If you want to move fast without backend code and accept Google's ecosystem, Firebase is excellent. If you want a .NET backend with real-time capabilities and full control, Fusion is the answer.
