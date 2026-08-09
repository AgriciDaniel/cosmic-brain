---
date: 2026-08-09
project: hermes
agent: codex
status: completed
---
## What I did

- Reproduced the Telegram provider failure and traced it to a dead llama.cpp endpoint at `127.0.0.1:8088`; Telegram polling itself remained healthy.
- Identified the former active model as Gemma 3 12B Heretic v2 Q3_K_M through the `gemma3-heretic-local` profile.
- Benchmarked installed Ollama models for native tool calling and generation throughput.
- Built `qwen3-hermes:latest` from the existing local Qwen 3 Heretic Q5 weights with the standard Qwen tool template and a 64K runtime context; no model weights were downloaded.
- Switched the existing Telegram profile from the dead llama.cpp endpoint to local Ollama and verified one-shot inference, end-to-end file tool execution, and Telegram gateway reconnection.
- Captured live resource usage and produced a no-change optimization plan; no environment-variable changes or new model pulls were made.

## Files changed

- `C:\Users\manaz\AppData\Local\hermes\profiles\gemma3-heretic-local\config.yaml`
- `C:\Users\manaz\AppData\Local\hermes\profiles\gemma3-heretic-local\profile.yaml`
- `C:\Users\manaz\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\Hermes_Gateway_gemma3-heretic-local.cmd`
- `C:\Users\manaz\Desktop\gemma3-heretic-local\config\Modelfile.qwen3-hermes`
- `wiki/sessions/2026-08-09-hermes-codex.md`

## Decisions made

- Selected `qwen3-hermes:latest` because it passed native tool calling, advertises thinking support, and uses genuine 262K-trained weights with a conservative 64K Hermes runtime.
- Rejected `qwen3-heretic:latest` and `phi4-mini:latest` as direct Hermes choices because they emitted tool-shaped text rather than structured tool calls in the compatibility test.
- Kept Ollama tuning unchanged pending explicit user approval.

## Next steps

- If approved, set `OLLAMA_NUM_PARALLEL=1` and `OLLAMA_MAX_LOADED_MODELS=1` for predictable single-user throughput.
- Decide whether Hermes' required 64K context is worth the measured throughput drop from 64.15 tok/s at 4K to 11.9 tok/s at 64K.
- Do not run WhisperX persistently; load it only for Omniscribe transcription jobs.
