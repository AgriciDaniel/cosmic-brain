---
type: concept
address: c-000211
title: "Git Bare Worktree Pattern"
created: 2026-06-05
updated: 2026-06-05
tags:
  - concept
  - git
  - architecture
  - workflow
status: developing
complexity: intermediate
domain: software-architecture
aliases:
  - "Git Bare + Worktree"
  - "Bare Repo Worktree"
related:
  - "[[Framas Monorepo Architecture]]"
  - "[[framas-monorepo-architecture-guide]]"
sources:
  - "[[framas-monorepo-architecture-guide]]"
---

# Git Bare Worktree Pattern

A Git repository layout pattern: one bare repo as the object store, multiple worktrees as working directories. Each branch gets its own folder; no branch-switching needed.

## Core Idea

Normal `git clone` creates one working directory tied to one checked-out branch. Switching branches changes all files. `git worktree` lets you check out multiple branches simultaneously into separate folders, all sharing the same object store.

A **bare repo** (`git clone --bare`) stores only the Git data (objects, refs, config) without any working directory. Worktrees are then added as siblings. This is cleaner than using a non-bare clone because there is no default working directory to confuse things.

```
myapp.git/           ← bare repo (object store only)
myapp/               ← parent folder
  feature-a/         ← git worktree: branch feature/a
  feature-b/         ← git worktree: branch feature/b
  dev-alice/         ← git worktree: branch dev_alice
```

## Setup

```bash
# 1. Clone as bare
git clone --bare https://github.com/org/repo.git repo.git
cd repo.git

# 2. Create parent folder for worktrees
mkdir -p ../repo

# 3. Add worktrees (local branch tracking remote)
git worktree add ../repo/feature-a -b feature/a origin/feature/a
git worktree add ../repo/feature-b -b feature/b origin/feature/b

# If local branch already exists, omit -b:
git worktree add ../repo/feature-a feature/a

# 4. Verify — must show [branch-name] not (HEAD)
git worktree list
```

## Key Constraints

| Constraint | Detail |
|-----------|--------|
| One-branch-one-worktree | A branch can only be checked out in one worktree. Second attempt: `fatal: 'branch' is already checked out at '...'` |
| Detached HEAD risk | `git worktree add ../path origin/branch` (no `-b`) → detached HEAD. Always use `-b` for new local branches |
| Shared object store | All worktrees share commits, objects, refs. Fetch from any worktree updates all |
| Lock files | Each worktree has a `.git` file pointing back to the bare repo's `worktrees/` metadata |

## Why Bare Over Normal Clone

Normal clone creates a default working directory (usually `main` or `master`). That extra working directory is unused when all work happens in named worktrees. Bare clone is cleaner: pure object store, no wasted default checkout, matches Git's recommended pattern for worktree-centric workflows.

## When to Use

- Team where each developer works on multiple parallel branches simultaneously
- Long-lived feature branches that need to run side-by-side for testing
- Monorepo patterns where branches hold different project subsets
- CI setups that need concurrent checkouts of the same repo

## When NOT to Use

- Small solo projects with simple linear history
- Short-lived branches where switching is fast and stashing is acceptable
- Repos where all devs share a single branch

## Sync Workflow

```bash
# Sync a specific worktree
cd ~/repo/feature-a
git fetch origin
git rebase origin/feature/a

# Check a shared branch for new commits without switching
cd ~/repo/apphost
git fetch origin
git log HEAD..origin/apphost --oneline
git rebase origin/apphost
```

## VS Code Multi-Root

Pair with a `.code-workspace` file at the parent level:

```json
{
  "folders": [
    { "name": "Shared",    "path": "./apphost" },
    { "name": "Feature A", "path": "./feature-a" },
    { "name": "Dev Alice", "path": "./dev-alice" }
  ],
  "settings": {
    "dotnet.defaultSolution": "dev-alice/MyApp.sln"
  }
}
```

Each dev keeps their own `.code-workspace` locally. Add `*.code-workspace` to `.gitignore` on shared branches.

## Real-World Example

See [[Framas Monorepo Architecture]] for a production application of this pattern: 10-person .NET 10 Blazor team with `apphost`, per-feature, and per-dev branches.
