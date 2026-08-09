---
date: 2026-08-10
project: hermes
agent: codex
status: in-progress
---

## What I did

- Audited every live Node process by command, parent agent, process tree, RAM, listening port, and short CPU activity sample.
- Identified the large Node footprint as per-session MCP duplication rather than unidentified compute workloads.

## Files changed

- `wiki/sessions/2026-08-09-hermes-codex.md`
- GitHub tracker issue `manazoid4/local-ai-performance#4`

## Decisions made

- Preserve the current Codex desktop helpers, the delegated Claude SSH agent, and 9router.
- Reclaim memory only by closing an unused parent Codex/Claude session or stopping the Khutba dev stack; do not kill MCP child processes individually.

## Next steps

- Ask the user which of the two Windows Terminal Codex sessions and whether the Khutba dev server are still needed.
- After clean parent shutdown, re-measure RAM and verify no agent tools were lost.
