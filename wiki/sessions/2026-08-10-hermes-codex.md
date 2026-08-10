---
date: 2026-08-10
project: hermes
agent: codex
status: completed
---
## What I did
- Searched recent Reddit discussions for local inference performance tools.
- Cloned six candidate repositories into `C:\Users\manaz\reddit-inference-repos`.
- Smoke-tested llama.cpp, ik_llama.cpp, llama-swap, KoboldCpp, vLLM, and SGLang.
- Ran a direct CUDA llama.cpp benchmark against the current Hermes GGUF: 66.2 t/s generation, all layers on CUDA, about 4.14 GB peak VRAM.
- Wrote the comparison to `local-ai-performance/docs/REDDIT-INFERENCE-REPOS-2026-08-10.md` and pushed commit `d560872`.
## Files changed
- `local-ai-performance/docs/REDDIT-INFERENCE-REPOS-2026-08-10.md`
## Decisions made
- Keep Ollama/Hermes unchanged until a controlled gateway A/B test.
- Prioritize llama.cpp; defer vLLM/SGLang and treat llama-swap as orchestration only.
## Next steps
- Run a multi-run, identical-settings llama.cpp-vs-Ollama benchmark and test gateway compatibility.
- Researched five additional candidates: ExLlamaV3, LlamaStation, LocalAI, Atomic Chat, and TextGen. Added `local-ai-performance/docs/ADDITIONAL-REDDIT-TOOLS-2026-08-10.md` and pushed commit `67e984f`.
- Switched the active Telegram Hermes profile to the locally derived `lfm2.5-8b-a1b-gpu` model with embedded `num_gpu 99` and 65,536 context; restarted and verified Telegram connected. Pushed commit `9699884`.
