---
tag: concept/design-patterns
related:
  - "[[LLM Wiki Pattern]]"
  - "[[claudesidian]]"
  - "[[obsidian-wiki]]"
---

# LLM + Obsidian Ecosystem Design Patterns

Synthesized from 16+ projects combining Claude/AI with Obsidian. These patterns represent matured solutions to common problems in knowledge management + LLM workflows.

## Pattern 1: Delta Tracking

**What**: Track ingested sources via `.manifest.json` — hash, timestamp, output pages. Re-ingest only processes changed/new files.

**Why**: Avoids re-processing large source libraries on every wiki update; saves tokens and keeps ingestion workflows fast.

**Example**: `obsidian-wiki` (Ar9av) — manifest tracks which sources produced which pages, enables safe re-runs.

**Status in claude-obsidian**: Not implemented.

---

## Pattern 2: Multi-Depth Queries

**What**: Implement 3 query tiers:
- **Quick** — index-only search (instant)
- **Standard** — wiki + web search
- **Deep** — parallel multi-agent research (slow, comprehensive)

**Why**: Users choose precision vs. speed. Deep queries handle "unknown unknowns"; quick queries handle immediate questions.

**Example**: `llm-knowledge-bases` (rvk7895) — `/research` (standard) vs `/research-deep` (parallel agents).

**Status in claude-obsidian**: Single-depth wiki-query; no web search tier.

---

## Pattern 3: Goal Cascade Integration

**What**: Connect personal productivity workflow (daily/weekly reviews) with the knowledge base.

**Why**: PKM and task management are entangled; separating them creates friction. Cascade makes reviews *productive*, not just reflective.

**Example**: `obsidian-claude-pkm` (ballred) — 3-Year Vision → Yearly Goals → Projects → Monthly Goals → Weekly Review → Daily Tasks.

**Status in claude-obsidian**: No productivity integration; wiki is knowledge-only.

---

## Pattern 4: Auto-Commit Hooks

**What**: Use PostToolUse or equivalent hook to auto-git-commit on every file change.

**Why**: Vault stays version-controlled; diffs show what the LLM changed; recovery is cheap; history is complete.

**Example**: `obsidian-claude-pkm` (ballred) — every file edit triggers a commit.

**Status in claude-obsidian**: Manual commit workflow.

---

## Pattern 5: Multi-Agent Compatibility

**What**: Deploy skills to Claude Code + Cursor + Windsurf + Codex + Gemini CLI simultaneously via symlinks.

**Why**: Users work in different editors/CLIs; skills should be portable, not locked to one tool.

**Example**: `obsidian-wiki` (Ar9av) — `setup.sh` auto-configures all agents.

**Status in claude-obsidian**: Claude Code only.

---

## Pattern 6: Hybrid Search (BM25 + Vector)

**What**: Combine keyword search (BM25) + semantic vector search instead of simple index lookup.

**Why**: Catches both exact matches and conceptual neighbors; scales well to large vaults.

**Example**: `llm-wiki` (ekadetov) — uses qmd for hybrid search; auto-installed via hook.

**Status in claude-obsidian**: Simple keyword indexing in wiki/index.md.

---

## Pattern 7: Emerging Schema

**What**: Don't fix folder structure upfront. Let it emerge from content, then impose structure retroactively.

**Why**: Sources don't fit predefined categories; forcing them early wastes ingestion tokens. Emergence is cheaper.

**Example**: `obsidian-wiki` (Ar9av) — 4-stage pipeline (Ingest → Extract → Resolve → Schema) where schema is last, not first.

**Status in claude-obsidian**: Predefined structure (concepts/, entities/, sources/). Inflexible for novel domains.

---

## Pattern 8: Vision Ingestion

**What**: Accept images, screenshots, whiteboard photos as ingestable sources. Requires vision model.

**Why**: Unlocks paper, PDFs, diagrams, code screenshots. Total information density increases.

**Example**: `obsidian-wiki` (Ar9av) — ingest images alongside Markdown, PDFs, transcripts.

**Status in claude-obsidian**: Text-only ingestion.

---

## Pattern 9: Output Formats

**What**: Export wiki beyond Markdown — Marp slides, matplotlib charts, JSON reports, etc.

**Why**: Knowledge is most useful when shaped to audience. Slides for presentations, charts for analysis, JSON for downstream tools.

**Example**: `llm-knowledge-bases` (rvk7895) — outputs Markdown, Marp slides, matplotlib charts to `output/`.

**Status in claude-obsidian**: Markdown only.

---

## Pattern 10: Vault Adoption

**What**: Ability to adopt the plugin into an existing vault without destroying structure (auto-detect PARA/Zettelkasten/LYT, map folders).

**Why**: Users have existing vaults. Forcing them to start fresh is a massive friction point.

**Example**: `obsidian-claude-pkm` (ballred) — `/adopt` command detects vault structure and maps it.

**Status in claude-obsidian**: Start-fresh only. No adoption path.

---

## Pattern 11: Vault Memory / Context Carryover

**What**: Persistent workspace memory across sessions — stored as JSONL, synced via Obsidian Sync.

**Why**: Conversations fragment without memory. JSONL keeps history queryable; Obsidian Sync makes it mobile-safe.

**Example**: Nexus MCP (ProfSynapse) — workspace memory in `.obsidian/plugins/nexus/data/`.

**Status in claude-obsidian**: No cross-session memory.

---

## Pattern 12: Inline Text Editing

**What**: Select text in vault + hotkey → word-level diff preview → apply or reject.

**Why**: Edits stay in Obsidian workflow; users see exactly what changes before committing.

**Example**: Claudian (YishenTu) — select text + hotkey → diff preview → apply.

**Status in claude-obsidian**: No inline edit; full file edits only.

---

## Key Insight (from Ar9av)

> "The wiki schema isn't fixed upfront. It emerges from your sources."

This challenges claude-obsidian's current predefined structure. Consider allowing schema emergence for higher information density.
