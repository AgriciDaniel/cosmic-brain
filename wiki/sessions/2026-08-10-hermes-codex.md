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
- Closed both user-approved Windows Terminal Codex process trees, including their owned MCP children. Node fell from 46 processes / 5.29 GB to 28 processes / 3.23 GB.
- Corrected the stale Hermes profile name from `gemma3-heretic-local` to `qwen3-hermes-local`, reinstalled its login launcher, and verified Telegram reconnected with `qwen3-hermes:latest` through Ollama.
- Switched Hermes Telegram to the installed `llama3.1:8b` model at 4096 context and renamed its profile/startup entry to `llama3-1-8b-local`. Verified Telegram reconnected and Ollama loaded 5.2 GB at 80% GPU / 20% CPU; a four-token smoke test produced 28.04 tok/s.
- Diagnosed the Telegram "unexpected error" as Hermes' enforced 64K agent-context preflight. Set the profile's declared and Ollama context values to 65536, restarted, and verified a real Hermes CLI request succeeded in 26.4 seconds. Ollama continued to report the efficient 4096 physical allocation.
- Ran a controlled Llama 3.1 8B versus Qwen3 Hermes A/B. Qwen scored 10/14 versus 7/14, generated at 65.00 versus 18.59 tok/s, and completed a real two-turn Hermes terminal workflow.
- Created `qwen3-hermes-8k:latest` from the existing Qwen weights with only `num_ctx 8192` overridden, restored Telegram to it, and verified 3.3 GB / 100% GPU placement plus Telegram polling health.
- Researched current tool-and-thinking models from primary sources. Identified `qwen3.5:4b-q4_K_M` as the strongest fitting challenger; no model was downloaded.
- Ran a sustained 1,400-token Hermes load: 61.45 tok/s, 59.6 C average / 64 C peak, 79.5 W average, power-capped throughout, and zero thermal-throttle samples.
- Benchmarked installed Phi-4 Mini as a no-download control: 64.87 tok/s at 8K and full 2.86 GB VRAM offload, but it is not a useful upgrade because it lacks the required native thinking mode.

## Files changed

- `wiki/sessions/2026-08-09-hermes-codex.md`
- `wiki/sessions/2026-08-10-hermes-codex.md`
- `local-ai-performance/docs/MCP-CONSOLIDATION-RESEARCH.md`
- `local-ai-performance/scripts/start-codex-lean.ps1`
- `local-ai-performance/docs/MODEL-AND-THROTTLESTOP-RESEARCH-2026-08-10.md`
- GitHub tracker issue `manazoid4/local-ai-performance#4`
- GitHub pull request `manazoid4/local-ai-performance#5`

## Decisions made

- Preserve the current Codex desktop helpers, the delegated Claude SSH agent, and 9router.
- Reclaim memory only by closing an unused parent Codex/Claude session or stopping the Khutba dev stack; do not kill MCP child processes individually.
- Keep one knowledge-enabled agent session and use lean extra sessions without OpenWiki/SwarmVault, avoiding roughly 400 MB per lean session.
- Preserve the current Codex desktop session, Claude, 9router, and MAZos while removing only the two explicitly approved terminal sessions.
- Use `qwen3-hermes-8k:latest` as the measured Hermes winner; keep Llama installed but off the Telegram hot path.
- Do not add a shared MCP proxy yet: both installed servers are stdio-only and have not been validated for shared concurrent access.
- Do not tune ThrottleStop for Ollama yet: the measured Qwen workload is GPU power-capped rather than thermally throttled, so expected benefit is only 0-5% with added stability risk.

## Next steps

- Close stale parent Codex/Claude sessions normally when they are no longer needed, then re-measure RAM.
- Repair the MAZos dashboard dependencies separately after SSD space is reclaimed.
- Merge local-ai-performance pull request 5 after review.
- With approval, pull and A/B `qwen3.5:4b-q4_K_M` against the current Hermes model using identical speed, quality, and real tool-call tests.
