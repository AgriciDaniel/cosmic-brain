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
- Audited Windows power policy, CPU turbo behavior, ThrottleStop configuration and historical limit logs, GPU power/thermal behavior under a fixed Ollama load, storage capacity/performance, RAM topology, WSL/VBS/Defender state, drivers, firmware, startup programs, and live process contention.
- Confirmed the i7-10750H remains at its 2.6 GHz base clock under CPU load despite an aggressive High Performance plan; the last ThrottleStop log recorded sustained PL1 limiting near 31-32 W.
- Confirmed Qwen 3 4B inference is GPU power-bound at the GTX 1660 Ti's fixed 80 W ceiling (about 94-95% utilization and 61 C in the short test), not thermally throttled.
- Identified capacity bottlenecks: only 62.1 GB/6.7% SSD free, 32 GB + 8 GB asymmetric RAM, and large daily-driver background loads. No performance settings were changed during the audit.

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
- Treated the CPU cap as a measurement-backed finding but not yet a safe tuning target: BIOS/ME updates and a controlled stock-vs-ThrottleStop test should precede any power-limit changes.
- Prioritized reclaiming SSD space and reducing background/display contention over speculative Windows security changes.

## Next steps

- If approved, set `OLLAMA_NUM_PARALLEL=1` and `OLLAMA_MAX_LOADED_MODELS=1` for predictable single-user throughput.
- Decide whether Hermes' required 64K context is worth the measured throughput drop from 64.15 tok/s at 4K to 11.9 tok/s at 64K.
- Do not run WhisperX persistently; load it only for Omniscribe transcription jobs.
- Free or move at least 150-250 GB before creating a Linux AI partition; Downloads is about 122 GB and Docker data about 17 GB.
- Update the RZ09-0328x BIOS from 1.02 to Razer's 1.06 and update Intel ME using Razer's official packages, with backup and AC power.
- Benchmark CPU stock behavior after a full ThrottleStop reset/test before deciding on turbo, undervolt, or PL1/PL2 tuning.
- Consider replacing the 8 GB DIMM with a matching 32 GB module for 64 GB dual-channel memory; Razer officially supports this configuration.

## CPU/GPU tuning research plan

- ThrottleStop 9.7.3 is running with a legacy edited INI. The active profile caps all turbo ratios at approximately 41x, stores likely 60 W/80 W turbo power requests, enables MSR lock state and Sync MMIO, and has monitoring disabled. Historical telemetry nevertheless showed PL1 near 31-32 W, indicating a lower firmware, EC, MMIO, or Intel Dynamic Tuning limit is likely winning.
- VBS is active. ThrottleStop's bundled readme and its author state that VBS blocks direct FIVR voltage-register access, although Speed Shift and turbo power controls can still work. Saved undervolt values therefore must not be assumed active.
- BIOS 1.06 should not precede the reversible stock-vs-ThrottleStop test: Intel's Plundervolt mitigation can permanently lock software voltage control, so current FIVR status and stock behavior need to be captured first.
- Planned CPU sequence: capture GUI panels and sensor baseline; back up the INI; exit ThrottleStop, remove it from the test boot and fully power down; measure stock clocks/limits; update BIOS/ME only after the comparison; then build a clean profile without lock bits or undervolting. Consider a separate VBS-off AI boot entry and a small incremental undervolt only if FIVR remains unlocked.
- Planned GPU sequence: install official HWiNFO/OCCT/MSI Afterburner only after approval; establish three-run Ollama and 10-minute thermal baselines; tune one voltage/frequency bin at a time at the fixed 80 W ceiling, then test small memory offsets. Keep only gains above run-to-run noise with zero errors, WHEA events, driver resets, or model-output corruption.
- Conservative expectations: restoring CPU turbo can improve CPU-bound work by roughly 15-35% but fully GPU-offloaded 4B decode by only 0-3%; GTX 1660 Ti efficiency plus memory tuning is expected to improve 8K Qwen generation by roughly 3-8%, from 64-65 tok/s to about 66-70 tok/s. Hermes context reduction remains the only measured multi-fold improvement.

## Second audit reconciliation

- Accepted as free experiments: move non-AI GUI apps to the Intel GPU, lower the AC minimum processor state to 5%, reclaim substantial SSD space, trim nonessential startup entries, use narrow Ollama/Search exclusions if measured, reset ThrottleStop before rebuilding a clean profile, update drivers/firmware in isolated stages, and tune GPU efficiency at the fixed 80 W ceiling.
- Corrected the startup recommendation: `Hermes_Gateway_gemma3-heretic-local.cmd` is the one active repaired Ollama gateway and must remain. The root and maz-lite Hermes files already have disabled extensions and do not launch.
- Rejected guaranteed VRAM/performance claims until measured. The external MSI display is physically driven by the NVIDIA GPU, so Windows per-app GPU preferences may reduce application allocations but cannot guarantee a 600-700 MiB reduction or eliminate the dGPU display floor.
- Rejected a blind 24K Hermes context change: current Hermes validation previously rejected contexts below 64K. A 16K/24K/32K sweep requires an integration fix or compatible Hermes version and must be benchmarked.
- Rejected shrinking the pagefile as an optimization while 122 GB in Downloads and 17 GB in Docker data are better cleanup targets. The system-managed pagefile protects large AI jobs and crash diagnostics.
- Rejected deleting Gemma/custom models based only on architecture similarity. Consumers and Modelfiles must be audited before any destructive removal.
