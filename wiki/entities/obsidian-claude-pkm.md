---
title: obsidian-claude-pkm (ballred)
url: https://github.com/ballred/obsidian-claude-pkm
version: 3.1
category: LLM Wiki Pattern
tags:
  - goal-cascade
  - productivity
  - auto-commit
  - vault-adoption
  - specialized-agents
related:
  - "[[LLM Wiki Pattern]]"
  - "[[Ecosystem-Patterns]]"
---

# obsidian-claude-pkm

**Author**: ballred  
**URL**: https://github.com/ballred/obsidian-claude-pkm  
**Version**: 3.1  
**Status**: Active  
**Focus**: Goal cascade integration (productivity PKM + knowledge base)

---

## Overview

A comprehensive PKM system that connects personal productivity workflows with the knowledge base. Unique in bridging task management and knowledge management into a coherent system.

**Philosophy**: Your PKM should *drive* action, not just organize information. Cascade goals down to daily tasks; review daily tasks up to goals.

---

## Key Features

### Goal Cascade
The core idea: 3-Year Vision → Yearly Goals → Projects → Monthly Goals → Weekly Review → Daily Tasks

Implemented via specialized agents:
- **Goal-Aligner** — align work to long-term vision
- **Weekly-Reviewer** — review week against goals, extract learnings
- **Note-Organizer** — organize raw notes into goal-relevant buckets
- **Inbox-Processor** — triage daily capture into the cascade

### Review Skills
- `/daily` — what did I do today? What did I learn?
- `/weekly` — did I hit weekly goals? What's blockers?
- `/monthly` — trends and course correction?

### Project Management
- `/project new` — create project linked to a goal
- Projects auto-cascade into monthly goals, weekly tasks

### Vault Adoption
- `/adopt` command — import existing vault structure
- Auto-detects PARA, Zettelkasten, LYT folder methods
- Maps existing folders to cascade structure

### Personalization
- `/onboard` — setup wizard (name, review day, goal areas)
- Path-specific rules loaded contextually
- `memory: project` for cross-session agent learning

### Technical Features
- **Zero dependencies** — bash + Markdown only (no Node, no pip)
- **Auto-commit** via PostToolUse hook on every file write/edit
- **Output style**: Productivity Coach voice
- Contextual rule loading per path

---

## Design Philosophy

> "The PKM owns you as much as you own it. If review is friction, it dies."

Focus on eliminating friction:
- One command (`/daily`, `/weekly`) — no thinking about structure
- Agents handle capture → organize → align
- Reviews are short, actionable, not busywork
- Vault adoption path (no starting from scratch)

---

## Relevance to claude-obsidian

**Patterns to adopt**:
1. [[Ecosystem-Patterns#Pattern 3: Goal Cascade Integration|Goal Cascade Integration]] — connect knowledge to productivity
2. [[Ecosystem-Patterns#Pattern 4: Auto-Commit Hooks|Auto-Commit Hooks]] — automatic version control
3. [[Ecosystem-Patterns#Pattern 10: Vault Adoption|Vault Adoption]] — support existing vaults

**Would require**:
- Productivity-focused agents (review, goal-alignment)
- Adoption path for existing vaults
- Auto-commit infrastructure
- Contextual rule loading

**Philosophical difference**:
- ballred focuses on productivity (task + goal management)
- claude-obsidian focuses on knowledge (research + learning)
- These could be complementary (a `ballred`-style review could feed observations back to the knowledge base)

---

## Source
From: claude-obsidian-ecosystem-research.md (2026-04-08)
