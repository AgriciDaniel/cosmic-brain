# Authentication: Diagrams

Diagrams illustrating Fusion's authentication architecture and flows.


## Authentication Service Architecture

<img src="/img/diagrams/PartAA-D-1.svg" alt="Authentication Service Architecture" style="width: 100%; max-width: 800px;" />


## IAuth vs IAuthBackend

| Aspect | `IAuth` (Client-Facing) | `IAuthBackend` (Server-Only) |
|--------|-------------------------|------------------------------|
| **Exposed via RPC** | Yes | No (`IBackendService`) |
| **Session required** | Yes (all queries) | No |

### IAuth Commands

| Command | Description |
|---------|-------------|
| `SignOut(session)` | Sign out current session |
| `EditUser(session, name)` | Edit current user |
| `UpdatePresence(session)` | Update last-seen |

### IAuth Queries

| Query | Description |
|-------|-------------|
| `GetUser(session)` | Get current user |
| `GetSessionInfo(session)` | Get session details |
| `GetAuthInfo(session)` | Get auth info |
| `IsSignOutForced(session)` | Check forced sign-out |
| `GetUserSessions(session)` | Get all user's sessions |

### IAuthBackend Commands

| Command | Description |
|---------|-------------|
| `SignIn(session, user, identity)` | Authenticate session |
| `SetupSession(session, ip, ua)` | Create/update session |
| `SetOptions(session, options)` | Set session options |

### IAuthBackend Queries

| Query | Description |
|-------|-------------|
| `GetUser(shard, userId)` | Get any user by ID (no session required) |


## Sign-In Flow

<img src="/img/diagrams/PartAA-D-2.svg" alt="Sign-In Flow" style="width: 100%; max-width: 800px;" />


## Session Resolution Flow

<img src="/img/diagrams/PartAA-D-3.svg" alt="Session Resolution Flow" style="width: 100%; max-width: 800px;" />


## Default Session Replacement

<img src="/img/diagrams/PartAA-D-4.svg" alt="Default Session Replacement" style="width: 100%; max-width: 800px;" />


## Session Lifecycle

<img src="/img/diagrams/PartAA-D-5.svg" alt="Session Lifecycle" style="width: 100%; max-width: 800px;" />


## Database Entity Relationships

<img src="/img/diagrams/PartAA-D-6.svg" alt="Database Entity Relationships" style="width: 100%; max-width: 800px;" />

**Indexes on `_Sessions`:**
- `(CreatedAt, IsSignOutForced)`
- `(LastSeenAt, IsSignOutForced)` - Used by `DbSessionInfoTrimmer`
- `(UserId, IsSignOutForced)`
- `(IPAddress, IsSignOutForced)`


## Authentication State Sync

<img src="/img/diagrams/PartAA-D-7.svg" alt="Authentication State Sync" style="width: 100%; max-width: 800px;" />


## Presence Reporting

<img src="/img/diagrams/PartAA-D-8.svg" alt="Presence Reporting" style="width: 100%; max-width: 800px;" />

**Server-side effect:**
- `DbSessionInfo.LastSeenAt` updated
- Prevents session from being trimmed


## Multi-Session Management

<img src="/img/diagrams/PartAA-D-9.svg" alt="Multi-Session Management" style="width: 100%; max-width: 800px;" />

| Sign Out Option | Code | Effect |
|-----------------|------|--------|
| Current session only | `Auth_SignOut(session: A)` | Only Session A signed out |
| Specific session | `Auth_SignOut(session: A, kickSessionHash: B.Hash)` | Session B signed out |
| All sessions | `Auth_SignOut(session: A, kickAllUserSessions: true)` | Sessions A, B, C all signed out |
| Force sign out | `Auth_SignOut(session: A, force: true)` | Session A permanently invalidated (new session created) |
