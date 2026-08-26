---
type: concept
address: c-000210
title: "Framas Monorepo Architecture"
created: 2026-06-05
updated: 2026-06-05
tags:
  - concept
  - architecture
  - dotnet
  - blazor
  - git
  - framas
status: developing
complexity: intermediate
domain: software-architecture
aliases:
  - "Framas Git Bare Worktree"
  - "Framas Team Workflow"
related:
  - "[[Git Bare Worktree Pattern]]"
  - "[[Framas]]"
  - "[[framas-monorepo-architecture-guide]]"
sources:
  - "[[framas-monorepo-architecture-guide]]"
---

# Framas Monorepo Architecture

Architecture for Framas's .NET 10 Blazor InteractiveServer application. Adopted for 10-person team. Uses [[Git Bare Worktree Pattern]] as the core mechanism.

## Branch Model

```
apphost         → MyApp.Host + MyApp.Shared (shared, write-protected)
feature/orders  → MyApp.Feature.Orders.csproj
feature/reports → MyApp.Feature.Reports.csproj
feature/auth    → MyApp.Feature.Auth.csproj
dev_A           → MyApp.sln (refs apphost + orders)
dev_B           → MyApp.sln (refs apphost + reports)
main / develop  → merge target, build, deploy
```

**Rule**: Each branch type has one responsibility. Feature branches hold only that feature's `.csproj` and code. Dev branches hold only the dev's `.sln`.

## Directory Layout

```
~/your-app.git/          ← Bare repo (git data only)
~/your-app/              ← Parent folder (open in VS Code)
  ├── apphost/           ← worktree: branch apphost
  │   ├── MyApp.Host/
  │   └── MyApp.Shared/
  ├── dev-A/             ← worktree: branch dev_A
  │   └── MyApp.sln
  ├── orders/            ← worktree: branch feature/orders
  │   └── MyApp.Feature.Orders/
  ├── reports/           ← worktree: branch feature/reports
  └── your-app.code-workspace
```

All worktrees share the same bare repo object store. VS Code multi-root workspace opens the parent folder, pointing `dotnet.defaultSolution` at the dev's own `.sln`.

## Design Decisions

### Monorepo over Plugin Architecture

Plugin Architecture (load feature DLLs from SQL Server at startup) was rejected because:
- SQL Server is not an artifact store; adds startup dependency
- Blazor InteractiveServer is not designed for dynamic assembly loading
- Extra infrastructure (plugin loader) with no benefit at 10-person scale

Monorepo gives: static linking, AOT compatibility, single deployment artifact, standard CI/CD.

### Git Worktree over Branch-Switching

Branch-switching pain: `git stash` on context change, cannot run two features simultaneously, easy to lose track of current branch.

Worktree benefit: each feature is a folder, multiple VS Code instances and `dotnet run` processes on separate ports run concurrently without interference.

### Per-Dev `.sln`

Each dev's solution references only `apphost` + their assigned feature(s). Benefits:
- IDE loads fewer projects (faster, less noise)
- No `.sln` conflict when two devs work simultaneously
- Dev controls their own solution composition

## Port Convention

```
AppHost dev server : 5000 / 5001
feature/auth       : 7001
feature/orders     : 7002
feature/reports    : 7003
feature/dashboard  : 7004
(each additional feature +1)
```

## Key Gotchas

> [!warning] Detached HEAD on worktree add
> Always pass `-b <local-branch> origin/<remote>` when the local branch does not yet exist. Without `-b`, Git checks out a detached HEAD. Verify with `git worktree list` — output must show `[branch-name]` in brackets, not `(HEAD)`.

> [!warning] Single-checkout constraint
> One branch can only be checked out in one worktree at a time. Attempting a second checkout of the same branch produces `fatal: 'branch' is already checked out at '...'`. Create a new branch from the target if parallel access is needed.

> [!warning] `.code-workspace` must stay local
> Each dev's `.code-workspace` has a different folder set. Add `*.code-workspace` to `.gitignore` on `apphost` or `develop` to prevent conflicts.

## Daily Workflow

**Start of day** — sync shared + own branch:
```bash
cd ~/your-app/apphost && git fetch origin && git rebase origin/apphost
cd ~/your-app/orders  && git fetch origin && git rebase origin/feature/orders
```

**New feature assigned**:
```bash
cd ~/your-app.git
git worktree add ../your-app/auth -b feature/auth origin/feature/auth
cd ~/your-app/dev-A
dotnet sln MyApp.sln add ../auth/MyApp.Feature.Auth/MyApp.Feature.Auth.csproj
```

**After PR merged** — cleanup:
```bash
git worktree remove ~/your-app/orders
cd ~/your-app.git && git branch -d feature/orders
cd ~/your-app/dev-A && dotnet sln MyApp.sln remove ../orders/MyApp.Feature.Orders/MyApp.Feature.Orders.csproj
```

## `apphost` Branch Rules

```
✅ Dev can: fetch, rebase, read
✅ Dev can: open PR into apphost (add shared service/model)
❌ Dev cannot: push directly to apphost
❌ Dev cannot: modify DI registration of another feature
```

Only lead or designated person merges PRs into `apphost`.

## See Also

- [[Git Bare Worktree Pattern]] — reusable version of this pattern
- [[Framas]] — entity page with full tech stack
- [[framas-monorepo-architecture-guide]] — source doc
