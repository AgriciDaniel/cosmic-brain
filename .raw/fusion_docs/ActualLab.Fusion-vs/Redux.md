# ActualLab.Fusion vs Redux / Zustand

Redux and Zustand are popular state management libraries in the JavaScript ecosystem. While Fusion and these libraries both manage application state, they operate at different levels and solve different problems.

## The Core Difference

**Redux/Zustand** manage client-side state with explicit actions and state updates. State lives in the browser; server communication is handled separately through middleware or async actions — you build the API layer and data fetching yourself.

**Fusion** manages server-side state that automatically synchronizes to clients. Shared C# interfaces serve as the API contract — no separate API layer, no manual fetching, no actions/reducers boilerplate.

## Redux Approach

```javascript
// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: { profile: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => { state.loading = true; })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            });
    }
});

// Async thunk - YOU build the API call
const fetchProfile = createAsyncThunk('user/fetchProfile',
    async (userId) => await api.getProfile(userId)  // Your API layer
);

// Component
function Profile({ userId }) {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchProfile(userId));
    }, [userId]);

    // No automatic updates when server data changes
}
```

## Fusion Approach

```csharp
// Shared interface - works on both client and server
public interface IUserService : IComputeService
{
    [ComputeMethod]
    Task<UserProfile> GetProfile(string userId, CancellationToken ct);
}

// Server implementation
public class UserService : IUserService
{
    [ComputeMethod]
    public virtual async Task<UserProfile> GetProfile(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);

    [CommandHandler]
    public async Task UpdateProfile(UpdateProfileCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(...);
        if (Invalidation.IsActive)
            _ = GetProfile(cmd.UserId, default);
    }
}

// Component - automatically updates when server data changes
@inherits ComputedStateComponent<UserProfile>
@code {
    [Parameter] public string UserId { get; set; }
    protected override Task<UserProfile> ComputeState(CancellationToken ct)
        => UserService.GetProfile(UserId, ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- **No API plumbing** — shared C# interfaces work like Protobuf definitions
- Server-authoritative state without manual sync
- Automatic real-time updates (no refetching, no polling)
- Built-in caching with dependency tracking
- Keeping all clients consistent automatically
- Eliminating client-server synchronization code

### Redux / Zustand are better at

- Mature ecosystem with excellent DevTools
- Predictable, explicit state updates via actions
- Time-travel debugging for complex state
- Working with any backend technology
- Large community and extensive resources
- JavaScript/TypeScript ecosystems

## The Plumbing Problem

With Redux/Zustand, you must build the connection between client state and server:

```javascript
// 1. Build your API layer (server)
app.get('/api/users/:id', async (req, res) => { ... });
app.put('/api/users/:id', async (req, res) => { ... });

// 2. Build fetch functions (client)
const api = {
    getProfile: (id) => fetch(`/api/users/${id}`).then(r => r.json()),
    updateProfile: (id, data) => fetch(`/api/users/${id}`, { method: 'PUT', body: data })
};

// 3. Build async thunks
const fetchProfile = createAsyncThunk('user/fetchProfile', api.getProfile);

// 4. Handle cache invalidation - when does client refresh?
// Polling? WebSockets? Manual button? You decide.
```

With Fusion, the interface IS the API:

```csharp
// Shared interface = API contract
public interface IUserService : IComputeService
{
    [ComputeMethod]
    Task<UserProfile> GetProfile(string userId, CancellationToken ct);
}

// Client calls interface method → gets cached data → receives updates automatically
// No fetch code. No API endpoints. No thunks. No polling.
```

## State Management Comparison

| Aspect | Redux/Zustand | Fusion |
|--------|---------------|--------|
| State location | Client | Server (cached on client) |
| Update mechanism | Dispatch actions | Invalidation |
| Server sync | You build it (thunks, API) | Automatic |
| Real-time updates | You build it | Built-in |
| API layer | You build it | Shared interfaces |
| Caching | Manual or RTK Query | Automatic |
| Multi-tab sync | Manual | Automatic |

## When to Use Each

### Choose Redux/Zustand when:
- Building a JavaScript/React application
- State is primarily client-side (forms, UI state)
- You need time-travel debugging
- Working with non-.NET backends
- Team prefers explicit state management

### Choose Fusion when:
- Building a .NET application
- You want to eliminate API plumbing
- Server data is the primary state
- Real-time updates are needed
- Multiple clients must stay in sync

## The Real-Time Gap

The biggest difference is how they handle data freshness:

**Redux/Zustand**: You fetch data once. To get updates, you must:
- Poll periodically
- Set up WebSocket listeners
- Implement optimistic updates
- Handle stale data manually

**Fusion**: Data stays fresh automatically. When the server data changes, all observing clients receive updates without any additional code.

## Data Flow Comparison

```
Redux/Zustand:
┌─────────┐ dispatch ┌─────────┐ render ┌─────────┐
│ Action  │─────────▶│ Store   │───────▶│   UI    │
└─────────┘          └────┬────┘        └─────────┘
                          │
                     async thunk + YOUR API layer
                          │
                          ▼
                    ┌───────────┐
                    │  Server   │ (no automatic sync back)
                    └───────────┘

Fusion:
┌─────────┐         ┌─────────┐ invalidate ┌─────────┐
│ Command │────────▶│ Server  │───────────▶│ Clients │
└─────────┘         └────┬────┘            └────┬────┘
                         │  Shared interface    │
                         │    = automatic sync  │
                         └──────────────────────┘
```

## The Key Insight

Redux/Zustand excel at **predictable client-side state management** with powerful debugging tools, but you must build all the API plumbing yourself.

Fusion excels at **eliminating the API layer entirely** — shared C# interfaces mean the same code defines both the client's view of the API and the server's implementation. State automatically propagates without actions, reducers, thunks, or manual API calls.

If most of your "state" is really server data, Fusion removes the need for complex state management patterns — the server state *is* your client state, automatically cached and kept current.
