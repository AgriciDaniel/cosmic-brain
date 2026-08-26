---
type: source
address: c-000209
title: "Framas Monorepo Architecture Guide"
created: 2026-06-05
updated: 2026-06-05
tags:
  - source
  - architecture
  - dotnet
  - blazor
  - git
  - framas
status: developing
source_type: article
author: ""
date_published: 2026-06-05
url: ""
confidence: high
key_claims:
  - "Monorepo + Git Bare + Worktree solves multi-feature parallel development without branch-switching"
  - "Each dev has a private .sln referencing only AppHost + their own feature(s)"
  - "Plugin Architecture (DLL-from-SQL) was rejected due to SQL single point of failure and runtime reflection overhead"
  - "Bare repo is recommended over normal clone when using git worktree extensively"
  - "One branch cannot be checked out in two worktrees simultaneously"
related:
  - "[[Framas Monorepo Architecture]]"
  - "[[Git Bare Worktree Pattern]]"
  - "[[Framas]]"
sources:
  - "[[.raw/framas/architects/architecture-guide.md]]"
---

# Framas Monorepo Architecture Guide

Source: `.raw/framas/architects/architecture-guide.md`

Internal architecture guide (Vietnamese) for Framas's .NET 10 Blazor InteractiveServer application. Documents the Monorepo + Git Bare + Worktree approach adopted for a 10-person team where each developer owns one or more features.

## Key Claims

1. Monorepo outperforms Plugin Architecture (DLL-from-SQL) for this team size: simpler CI/CD, AOT-friendly, no reflection overhead, no SQL dependency at startup.
2. Git Worktree gives each feature its own folder so devs can run multiple features in parallel on different ports without `git stash` or branch switching.
3. Bare repo (`git clone --bare`) is cleaner than a normal clone when worktrees are the primary working surface.
4. Per-dev `.sln` files prevent solution-file conflicts and reduce IDE noise (dev only sees AppHost + their feature).
5. `apphost` branch is write-protected (only lead/assigned person merges PRs into it).

## Coverage

- Architecture rationale: Monorepo vs Plugin, Worktree vs branch-switch, per-dev .sln
- Full directory structure with annotated tree
- Solution file and `.code-workspace` examples
- Step-by-step setup (bare clone → worktree add → code-workspace → run)
- Daily workflow: sync, new feature, PR, cleanup
- Gotchas: detached HEAD, single-branch lock, `.code-workspace` in `.gitignore`, port conventions

## See Also

- [[Framas Monorepo Architecture]] — synthesized concept page
- [[Git Bare Worktree Pattern]] — reusable Git pattern extracted from this source
- [[Framas]] — entity page; now updated with architecture stack
