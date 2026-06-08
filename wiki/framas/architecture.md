# Monorepo Architecture: Git Bare + Worktree for .NET 10 Blazor

**Stack**: .NET 10 Blazor InteractiveServer  
**Pattern**: Monorepo with Git Bare Repository + Git Worktree  
**Team Size**: 10 developers  
**Structure**: Each dev handles 1+ feature independently

## Architecture Overview

```
Branch Organization:
  apphost         → shared AppHost + Shared projects
  feature/*       → isolated feature branches (Orders, Reports, Auth, etc.)
  dev_*           → per-developer solution files
  main/develop    → final merge targets for build & deploy
```

### Core Principles

1. **Each dev has a private `.sln`** — sees only AppHost + their feature(s)
2. **AppHost is shared** — not modified by individual devs
3. **Feature branches contain only `.csproj` and feature code**
4. **All in one parent folder** — VS Code + Roslyn work correctly

## Why This Architecture?

### Monorepo vs Plugin Architecture
**Rejected Plugin Architecture** (loading DLLs from SQL Server):
- SQL isn't an artifact store; performance risk
- Single point of failure (SQL down → app won't start)
- Overhead: plugin loader infrastructure
- Overkill for 10-person team

**Chose Monorepo** because:
- Better performance (static linking, AOT-friendly)
- Simpler (single artifact, easy to control)
- Standard CI/CD pipeline
- Blazor isn't designed for dynamic assembly loading

### Git Bare + Worktree vs Branch Switching
**Problem with traditional branch switching**:
- Dev handles 2+ features = constant `git stash`
- Can't run features in parallel for testing
- Easy to confuse which branch you're on

**Worktree solution**:
- Each branch = separate folder
- Multiple VS Code instances, one per feature
- No stash needed; run parallel on different ports
- Bare repo = cleaner structure

## Folder Structure

```
~/your-app.git/              ← Bare repo (git data only)
  ├── HEAD
  ├── objects/
  ├── refs/
  └── worktrees/             ← Git auto-manages worktree metadata

~/your-app/                  ← Parent (opened in VS Code)
  ├── apphost/               ← worktree: apphost branch
  │   ├── MyApp.Host/
  │   └── MyApp.Shared/
  │
  ├── dev-A/                 ← worktree: dev_A branch
  │   └── MyApp.sln          ← ref AppHost + Orders
  │
  ├── dev-B/                 ← worktree: dev_B branch
  │   └── MyApp.sln          ← ref AppHost + Reports
  │
  ├── orders/                ← worktree: feature/orders
  │   └── MyApp.Feature.Orders/
  │
  ├── reports/               ← worktree: feature/reports
  │   └── MyApp.Feature.Reports/
  │
  └── your-app.code-workspace
```

## Setup Steps

### 1. Clone as Bare Repo
```bash
git clone --bare https://github.com/org/your-app.git your-app.git
cd your-app.git
mkdir -p ../your-app
```

### 2. Create Worktrees
```bash
# AppHost (shared)
git worktree add ../your-app/apphost -b apphost origin/apphost

# Feature branches
git worktree add ../your-app/orders  -b feature/orders  origin/feature/orders
git worktree add ../your-app/reports -b feature/reports origin/feature/reports

# Dev branches
git worktree add ../your-app/dev-A   -b dev_A   origin/dev_A
```

### 3. Create VS Code Workspace
File: `your-app/your-app.code-workspace`
```json
{
  "folders": [
    { "name": "AppHost",        "path": "./apphost" },
    { "name": "Feature.Orders", "path": "./orders" },
    { "name": "dev-A",          "path": "./dev-A" }
  ],
  "settings": {
    "dotnet.defaultSolution": "dev-A/MyApp.sln"
  }
}
```

### 4. Open Workspace
```bash
code your-app/your-app.code-workspace
```

## Daily Workflow

### Start of Day
```bash
# Sync shared apphost
cd ~/your-app/apphost
git fetch origin && git rebase origin/apphost

# Sync your feature
cd ~/your-app/orders
git fetch origin && git rebase origin/feature/orders
```

### New Feature Assignment
```bash
cd ~/your-app.git
git worktree add ../your-app/auth -b feature/auth origin/feature/auth

# Add to your .sln
cd ~/your-app/dev-A
dotnet sln MyApp.sln add ../auth/MyApp.Feature.Auth/MyApp.Feature.Auth.csproj
```

### Feature Complete
```bash
# Push and create PR
cd ~/your-app/orders
git push origin feature/orders
```

### After Merge
```bash
# Remove worktree
git worktree remove ~/your-app/orders

# Clean up local branch
cd ~/your-app.git
git branch -d feature/orders

# Remove from .sln
cd ~/your-app/dev-A
dotnet sln MyApp.sln remove ../orders/MyApp.Feature.Orders/MyApp.Feature.Orders.csproj
```

## Key Guidelines

### AppHost Branch Rules
✅ Allowed:
- Read, fetch, rebase
- Create PR for shared services/models
- Review before merge

❌ Not allowed:
- Direct push to apphost
- Unilateral changes to other feature DI registration

**Only lead/designated person merges to apphost.**

### Critical Gotchas

**Detached HEAD**: Always use `-b flag` when creating worktree from remote:
```bash
# ❌ Wrong → detached HEAD
git worktree add ../your-app/orders origin/feature/orders

# ✅ Right
git worktree add ../your-app/orders -b feature/orders origin/feature/orders
```

**One branch per worktree**: A branch can only be checked out once:
```bash
# ❌ Error
git worktree add ../orders-backup feature/orders
# fatal: 'feature/orders' is already checked out at '../orders'
```

**Don't commit `.code-workspace`**: It's per-dev configuration.
```gitignore
*.code-workspace
```

### Port Convention
Avoid port conflicts when running multiple features:
```
AppHost: 5000-5001
feature/auth: 7001
feature/orders: 7002
feature/reports: 7003
...
```

Set in `launchSettings.json` per feature.

### Frequent AppHost Sync
Don't let apphost drift. Check regularly:
```bash
cd ~/your-app/apphost
git fetch origin
git log HEAD..origin/apphost --oneline

# If changes exist, rebase immediately
git rebase origin/apphost
```

---

**Source**: .raw/framas/architects/architecture-guide.md (Vietnamese original)  
**Language**: Original in Vietnamese; translated for broader team access
