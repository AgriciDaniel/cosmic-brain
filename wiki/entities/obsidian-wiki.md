---
title: obsidian-wiki (Ar9av)
url: https://github.com/Ar9av/obsidian-wiki
category: LLM Wiki Pattern
tags: 
  - multi-agent
  - delta-tracking
  - emerging-schema
  - vision-ingestion
related:
  - "[[LLM Wiki Pattern]]"
  - "[[Ecosystem-Patterns]]"
---

# obsidian-wiki

**Author**: Ar9av  
**URL**: https://github.com/Ar9av/obsidian-wiki  
**Status**: Active  
**Focus**: Multi-agent wiki with emerging schema, delta tracking, and vision support

---

## Overview

A Claude Code plugin that implements the LLM Wiki pattern with a focus on:
- Multi-agent compatibility (Claude Code, Cursor, Windsurf, Codex, Gemini CLI, OpenClaw, GitHub Copilot)
- Delta tracking via manifest file (only ingest new/changed files)
- Emerging schema (ingest first, schema second)
- Vision ingestion (images, screenshots, PDFs)

---

## Key Features

### Multi-Agent Deployment
- `setup.sh` auto-configures all agents simultaneously via symlinks
- One skill set, every agent can use it
- Zero agent lock-in

### Delta Tracking
- `.manifest.json` tracks ingested sources (hash, timestamp, output pages)
- Re-run ingest without reprocessing entire library
- Token-efficient iteration

### 4-Stage Pipeline
1. **Ingest** — accept raw sources (Markdown, PDFs, images, JSONL, transcripts)
2. **Extract** — pull structured data (vision-capable)
3. **Resolve** — link entities and relationships
4. **Schema** — organize into structure (emerges from content, not predefined)

### Content Types
- Markdown
- PDFs (with page ranges)
- Images/Screenshots/Whiteboard photos (requires vision model)
- JSONL
- Conversation exports
- Transcripts

### Metadata
- Each page gets `summary:` frontmatter for quick preview (no need to open page)

### Notable Design Choice
**Schema Emerges from Sources**: Unlike fixed structures, this ingest pipeline discovers categories and relationships as it processes content. Results in higher information density and fewer miscategorized pages.

---

## Relevance to claude-obsidian

**Patterns to adopt**:
1. [[Ecosystem-Patterns#Pattern 1: Delta Tracking|Delta Tracking]] — avoid re-processing large source libraries
2. [[Ecosystem-Patterns#Pattern 7: Emerging Schema|Emerging Schema]] — let structure evolve with content
3. [[Ecosystem-Patterns#Pattern 8: Vision Ingestion|Vision Ingestion]] — support images and PDFs
4. [[Ecosystem-Patterns#Pattern 5: Multi-Agent Compatibility|Multi-Agent Compatibility]] — extend beyond Claude Code

**Would require**:
- Vision model support (e.g., Claude 4V)
- Rethinking of wiki structure (from predefined to emergent)
- Additional ingest pipeline stages

---

## Source
From: claude-obsidian-ecosystem-research.md (2026-04-08)
