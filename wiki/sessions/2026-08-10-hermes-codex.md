---
date: 2026-08-10
project: hermes
agent: codex
status: completed
---

## What I did

- Audited every live Node process by command, parent agent, process tree, RAM, listening port, and short CPU activity sample.
- Identified the large Node footprint as per-session MCP duplication rather than unidentified compute workloads.
- Stopped the confirmed Khutba Vite frontend and API process trees; ports 5173 and 3001 are closed.
- Preserved 9router on port 20128.
- Diagnosed the MAZos dashboard startup: it was not running and its local `hermes-agent/web` install cannot currently resolve Vite. No MAZos files or startup entries were changed.
- Researched MCP consolidation and added a safe lean-Codex launcher to the local AI performance repository.
- Re-measured 39.86 GB total RAM: 19.68 GB used and 20.18 GB free; no Ollama model loaded.

## Files changed

- `wiki/sessions/2026-08-09-hermes-codex.md`
- `wiki/sessions/2026-08-10-hermes-codex.md`
- `local-ai-performance/docs/MCP-CONSOLIDATION-RESEARCH.md`
- `local-ai-performance/scripts/start-codex-lean.ps1`
- GitHub tracker issue `manazoid4/local-ai-performance#4`
- GitHub pull request `manazoid4/local-ai-performance#5`

## Decisions made

- Preserve the current Codex desktop helpers, the delegated Claude SSH agent, and 9router.
- Reclaim memory only by closing an unused parent Codex/Claude session or stopping the Khutba dev stack; do not kill MCP child processes individually.
- Keep one knowledge-enabled agent session and use lean extra sessions without OpenWiki/SwarmVault, avoiding roughly 400 MB per lean session.
- Do not add a shared MCP proxy yet: both installed servers are stdio-only and have not been validated for shared concurrent access.

## Next steps

- Close stale parent Codex/Claude sessions normally when they are no longer needed, then re-measure RAM.
- Repair the MAZos dashboard dependencies separately after SSD space is reclaimed.
- Merge local-ai-performance pull request 5 after review.
