---
title: Nexus MCP for Obsidian
url: https://github.com/ProfSynapse/claudesidian-mcp
original_name: claudesidian-mcp
category: Native Obsidian Plugin + MCP Server
tags:
  - native-plugin
  - MCP-bridge
  - workspace-memory
  - semantic-search
related:
  - "[[Ecosystem-Patterns]]"
  - "[[obsidian-memory-mcp]]"
---

# Nexus MCP for Obsidian

**Author**: ProfSynapse  
**URL**: https://github.com/ProfSynapse/claudesidian-mcp  
**Original Name**: claudesidian-mcp  
**Current Name**: Nexus MCP for Obsidian  
**Status**: Active  
**Focus**: Full Obsidian plugin with native chat AND MCP bridge for multi-provider access

---

## Overview

A unique plugin that combines two approaches:
1. **Native Obsidian Plugin** — chat interface inside Obsidian (supports any AI provider)
2. **MCP Bridge** — connect Obsidian to Claude Desktop, Claude Code, Codex CLI, Gemini CLI, Cursor, Cline

Enables you to use Obsidian as both a chat UI AND as a knowledge backend for other tools.

---

## Key Features

### Native Chat
- Chat directly inside Obsidian sidebar
- Configurable provider (Claude, OpenAI, Gemini, etc.)
- Works on mobile via Obsidian Sync

### MCP Bridge
- Obsidian vault accessible from:
  - Claude Desktop
  - Claude Code
  - Codex CLI
  - Gemini CLI
  - Cursor
  - Cline
- Two-tool architecture (see docs for details)

### Workspace Memory
- Persistent context across sessions (JSONL format)
- Stored in `.obsidian/plugins/nexus/data/`
- Synced via Obsidian Sync (mobile + multi-device safe)
- Queryable conversation history

### Task Management
- Projects, tasks, blockers, dependencies
- Integrated with vault notes

### Semantic Search
- Search notes + past conversations by meaning
- Index-based, not keyword-only

### Content Processing
- Inline editing — select text + edit in Obsidian
- PDF → Markdown/PNG/PDF capture
- Web page → Markdown/PNG/PDF capture
- Audio → Markdown conversion
- Merge PDFs, concat markdown, mix audio tracks

### Storage
- JSONL files in `.obsidian/plugins/nexus/data/`
- Included in Obsidian Sync (safe across devices)

---

## Relevance to claude-obsidian

**Key Pattern**: [[Ecosystem-Patterns#Pattern 11: Vault Memory / Context Carryover|Vault Memory / Context Carryover]]

**Advantages over current claude-obsidian**:
- Cross-session memory without manual saving
- Works as both chat UI and backend
- Mobile-first (Obsidian Sync compatible)
- Multi-provider agnostic

**Disadvantages**:
- More plugin overhead (native Obsidian code required)
- Not a Claude Code skill (different development model)

**Potential Integration**:
- Could adopt the JSONL-based memory format
- Could implement semantic search similar to Nexus

---

## Source
From: claude-obsidian-ecosystem-research.md (2026-04-08)
