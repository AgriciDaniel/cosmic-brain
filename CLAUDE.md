# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# claude-obsidian — Claude + Obsidian Wiki Vault

This folder is simultaneously a Claude Code plugin, an Obsidian vault, and a cross-platform Agent Skills package (Codex CLI, OpenCode, Cursor, Windsurf, Gemini also read it — see "Multi-agent instruction files" below). It is markdown/shell/python only: no compiled code, no package.json, no build step.

**Plugin name:** `claude-obsidian` (v1.7+ "Compound Vault" — see [docs/compound-vault-guide.md](docs/compound-vault-guide.md); v1.8+ adds methodology modes — see [docs/methodology-modes-guide.md](docs/methodology-modes-guide.md); optional DragonScale Memory extension — see [docs/dragonscale-guide.md](docs/dragonscale-guide.md))
**Vault path:** This directory (open in Obsidian directly)

## What This Vault Is For

This vault demonstrates the LLM Wiki pattern — a persistent, compounding knowledge base for Claude + Obsidian. Drop any source, ask any question, and the wiki grows richer with every session.

## Vault Structure

```
.raw/           source documents — immutable, Claude reads but never modifies
wiki/           Claude-generated knowledge base
_templates/     Obsidian Templater templates
_attachments/   images and PDFs referenced by wiki pages
```

## Commands

There's no build. `make` drives the test suite for `scripts/` (bash + python3, all hermetic except `test-tiling`/`test-retrieve`, which soft-skip without `ollama`/`nomic-embed-text`):

```bash
make test              # everything: address, tiling, boundary, bm25, retrieve, lock, concurrent, mode, contextual
make test-address      # scripts/allocate-address.sh only
make test-lock         # scripts/wiki-lock.sh only
make clean-test-state  # remove runtime lockfiles + tiling/embed/bm25 caches under .vault-meta/
```

Run a single test file directly instead of through `make` (each is skip-friendly on missing optional deps):

```bash
bash tests/test_wiki_lock.sh
python3 tests/test_bm25_index.py
```

Setup/provisioning scripts (idempotent, safe to re-run):

```bash
bash bin/setup-vault.sh          # base vault (CSS snippets, plugin config)
bash bin/setup-dragonscale.sh    # opt-in: folds, addresses, tiling, boundary scoring
bash bin/setup-retrieve.sh       # opt-in: hybrid retrieval (BM25 index + egress consent prompt + ollama check)
bash bin/setup-mode.sh           # pick LYT / PARA / Zettelkasten / Generic
bash bin/setup-multi-agent.sh    # symlink skills/ into ~/.codex, ~/.opencode, .cursor/skills, etc.
```

## How to Use

Drop a source file into `.raw/`, then tell Claude: "ingest [filename]".

Ask any question. Claude reads the index first, then drills into relevant pages.

Run `/wiki` to scaffold a new vault or check setup status.

Run "lint the wiki" every 10-15 ingests to catch orphans and gaps.

## Cross-Project Access

To reference this wiki from another Claude Code project, add to that project's CLAUDE.md:

```markdown
## Wiki Knowledge Base
Path: /path/to/this/vault

When you need context not already in this project:
1. Read wiki/hot.md first (recent context, ~500 words)
2. If not enough, read wiki/index.md
3. If you need domain specifics, read wiki/<domain>/_index.md
4. Only then read individual wiki pages

Do NOT read the wiki for general coding questions or things already in this project.
```

## Plugin Skills

Every skill is a `skills/<name>/SKILL.md` (frontmatter: `name` + `description` only — no `allowed-tools`, no `triggers`, no `globs`; that's the cross-platform Agent Skills spec, not a Claude Code extension).

| Skill | Trigger |
|-------|---------|
| `/wiki` | Setup, scaffold, route to sub-skills |
| `wiki-ingest` | Single or batch source ingestion |
| `wiki-query` | Answer from wiki content (Quick / Standard / Deep modes) |
| `wiki-lint` | Health check: orphans, dead links, gaps, duplicate-page detection |
| `/save` | File the current conversation as a structured wiki note |
| `/autoresearch [topic]` | Autonomous research loop: search, fetch, synthesize, file |
| `/canvas` | Visual layer: add images, PDFs, notes to Obsidian canvas |
| `defuddle` | Clean a web page/URL before ingest |
| `obsidian-markdown` | Wikilink/callout/frontmatter syntax reference |
| `obsidian-bases` | Obsidian Bases (`.base` dynamic table files) |
| `/wiki-cli` (v1.7) | Obsidian CLI transport wrapper; default mutation path on desktop |
| `/wiki-retrieve` (v1.7, opt-in) | Hybrid contextual + BM25 + cosine-rerank retrieval |
| `/wiki-mode` (v1.8) | Methodology modes (LYT / PARA / Zettelkasten / Generic) |
| `wiki-fold` (DragonScale, opt-in) | Log rollup — folds `wiki/log.md` entries into summaries |
| `/think` (v1.9) | 10-principle thinking loop (OBSERVE-OBSERVE-LISTEN-THINK-CONNECT-CONNECT-FEEL-ACCEPT-CREATE-GROW). Apply to architectural decisions, audits, post-mortems, ambiguous user requests. Every other skill has a "How to think" appendix mapping this framework to its specific work |

## Session Lifecycle (hooks/hooks.json)

`SessionStart` (startup/resume) silently cats `wiki/hot.md` into context, clears stale advisory locks (>1h), and instructs Claude not to announce this. `PostCompact` re-injects `hot.md` since hook-injected context doesn't survive compaction. `Stop` diffs `wiki/` against HEAD and, if changed, tells Claude to overwrite `hot.md` (not append) with a fresh summary before ending the session. `PostToolUse` (Write|Edit) auto-commits `wiki/ .raw/ .vault-meta/` — but first checks `wiki-lock.sh list`; if any lock is held or the check fails, the commit is deferred rather than racing an in-flight writer. Auto-commit can be disabled by creating `.vault-meta/auto-commit.disabled`.

## Concurrency (v1.7+)

`scripts/wiki-lock.sh` provides per-file advisory locks for safe multi-writer ingest (parallel `wiki-ingest` sub-agents can target the same page when a user batches multiple sources). Every wiki page write should be guarded by `wiki-lock acquire`/`release`. Stale-after default is 60s; cross-process release allowed by design.

## Transport (v1.7+)

`scripts/detect-transport.sh` writes `.vault-meta/transport.json` on first run and refreshes weekly. Skills consult it before mutating the vault. Fallback chain: Obsidian CLI → mcp-obsidian → mcpvault → filesystem (always-available floor). Decision tree: [wiki/references/transport-fallback.md](wiki/references/transport-fallback.md).

## Hybrid Retrieval (v1.7+, opt-in)

`/wiki-retrieve` is a three-tier pipeline (`scripts/bm25-index.py`, `scripts/contextual-prefix.py`, `scripts/rerank.py`, `scripts/retrieve.py`): BM25 sparse search is always-on; the contextual-prefix tier is consent-gated behind `--allow-egress` (sends page bodies to the Anthropic API for prefix generation); cosine rerank uses a local ollama model by default. Any tier can be unavailable and the rest still return results. Provision with `bash bin/setup-retrieve.sh`.

## DragonScale Memory (opt-in extension)

Four independent, individually-optional mechanisms, provisioned by `bash bin/setup-dragonscale.sh`. If that script has never been run, `wiki-ingest`/`wiki-lint` keep their non-DragonScale behavior — feature detection, not a hard dependency. Full spec: [docs/dragonscale-guide.md](docs/dragonscale-guide.md) and [wiki/concepts/DragonScale Memory.md](wiki/concepts/DragonScale%20Memory.md).

1. **Fold Operator** (`skills/wiki-fold/`) — rolls up `wiki/log.md` entries into summaries.
2. **Deterministic Page Addresses** (`scripts/allocate-address.sh`) — stable page IDs; the counter lives at `.vault-meta/address-counter.txt` and is guarded by `flock` against `.vault-meta/.address.lock`. `flock` is a universal DragonScale prerequisite (mechanisms 2 and 3 both need it).
3. **Semantic Tiling Lint** (`scripts/tiling-check.py`) — duplicate/near-duplicate page detection via local embeddings. Needs `python3` + `ollama` + the `nomic-embed-text` model; exits `10` if ollama is unreachable, `11` if the model isn't pulled — `wiki-lint` treats both as skip conditions, not failures.
4. **Boundary-First Autoresearch** (`scripts/boundary-score.py`) — feeds `/autoresearch` topic selection. Needs `python3` only (no ollama). Falls back to the normal ask-the-user topic path on failure.

## Methodology Modes (v1.8+)

Pick an organizational style for the vault via `bash bin/setup-mode.sh`. Four modes available: **generic** (v1.7 default — no opinion), **LYT** (Linking Your Thinking — MOCs + atomic notes), **PARA** (Projects/Areas/Resources/Archives), **Zettelkasten** (timestamped IDs, flat, dense linking). The mode is written to `.vault-meta/mode.json` (gitignored by default; `git add -f` to commit). `wiki-ingest`, `save`, and `autoresearch` consult `python3 scripts/wiki-mode.py route <type> "<name>"` before filing new pages — no special-casing needed in the consumer skills. Full guide: [docs/methodology-modes-guide.md](docs/methodology-modes-guide.md).

## Pre-commit verifier (v1.7.1+)

After staging changes for a non-trivial workstream but BEFORE running `git commit`, dispatch the `verifier` agent (`agents/verifier.md`). It reads `git diff --cached`, applies the /best-practices six-cut + agent kernel, and returns findings in four tiers (BLOCKER / HIGH / MEDIUM / LOW) with file:line citations. The agent has read-only tools (Read, Grep, Glob, Bash) — it can inspect but never modify, so its output is purely advisory.

## Multi-agent instruction files

`CLAUDE.md` (this file), `AGENTS.md`, `GEMINI.md`, `.cursor/rules/claude-obsidian.mdc`, and `.github/copilot-instructions.md` all describe the same skill set and conventions for different agents/IDEs. When adding, renaming, or removing a skill, update all of them — nothing keeps them in sync automatically.

## MCP (Optional)

If you configured the MCP server, Claude can read and write vault notes directly.
See `skills/wiki/references/mcp-setup.md` for setup instructions.

## Release Blog Post

After cutting a new release (git tag + `gh release create`), run:

```
/release-blog
```

This generates a blog post on https://agricidaniel.com/blog/, handles cover image generation, SEO metadata, FAQ schema, internal linking, sitemap/llms.txt updates, Vercel deployment, and Google indexing.
