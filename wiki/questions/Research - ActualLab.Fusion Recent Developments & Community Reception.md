---
type: synthesis
title: "Research: ActualLab.Fusion Recent Developments & Community Reception"
created: 2026-07-14
updated: 2026-07-14
tags:
  - research
  - dotnet
  - fusion
status: developing
related:
  - "[[Voxt.ai]]"
  - "[[yakunin-fusion-vs-signalr]]"
  - "[[ActualLab.Fusion Overview]]"
  - "[[Fusion Performance & Benchmarks]]"
  - "[[Fusion NuGet Packages]]"
sources:
  - "[[yakunin-fusion-vs-signalr]]"
---

# Research: ActualLab.Fusion Recent Developments & Community Reception

## Overview

Gap-fill pass following full re-ingest check: `.raw/fusion_docs/README.md` was already batch-ingested 2026-05-25 (125 files → 20+ concept pages, source [[fusion-docs-overview]]). This session skipped re-deriving that content and instead searched for what the README doesn't cover: recent project activity, the flagship production app, and independent (non-creator) reception.

## Key Findings

- Fusion is actively maintained: commits to `ActualLab/Fusion` as recent as 2026-05, targeting **net10.0** in `Directory.Build.props` (Source: WebSearch, GitHub repo metadata; medium confidence — not independently fetched, see Open Questions).
- **[[Voxt.ai]]** — the production app behind the benchmark numbers in [[Fusion Performance & Benchmarks]] — is a rebrand of "Actual Chat" (`chat.actual.app` package ID). It's a real-time voice chat app with live transcription, translation, and AI summaries, built end-to-end on Fusion/Blazor.
- Fusion's own "Fusion Place" community/support channel is hosted inside Voxt.ai itself — the dogfood app doubles as the community hub.
- Performance claims have escalated across the project's history: the older ServiceTitan-era Stl.Fusion README claimed ~1.5x SignalR / ~3x gRPC; current ActualLab.Fusion marketing claims 5-8x. Same project, same author, growing claims over the rebrand — worth treating benchmark multipliers as a moving target tied to hardware generation (now AMD Ryzen 9 9950X3D) rather than a fixed number (Source: WebSearch cross-reference of old vs. current GitHub READMEs).
- The only substantive SignalR-comparison content found (`How Similar Is Stl.Fusion to SignalR?`, Alex Yakunin, ~2019) is author-written, not independent. See [[yakunin-fusion-vs-signalr]] for the full summary.

## Key Entities

- [[Voxt.ai]]: Fusion's flagship dogfood product and community hub

## Key Concepts

No new standalone concepts — findings folded into existing [[Fusion Performance & Benchmarks]] and [[Fusion NuGet Packages]] pages rather than duplicated.

## Contradictions

- None found between sources on core technical claims. The escalating-benchmark-multiplier observation (above) is a framing concern, not a factual contradiction.

## Open Questions

> [!gap] No independent (non-ActualLab-authored) reviews, critiques, or comparisons were found — Reddit/Hacker News/Stack Overflow discussion specifically about Fusion was not surfaced by this pass's searches. Worth a dedicated follow-up search pass if third-party sentiment matters.

> [!gap] WebFetch to `github.com` and `medium.com` was blocked by network policy in this session — findings above rely on WebSearch snippets, not full-page fetches. Re-verify directly if precision matters (exact current version number, full changelog).

> [!gap] Whether the "multi-language client" gap Yakunin flagged in 2019 (SignalR having clients in several languages, Fusion not) still holds for current `ActualLab.Rpc` was not re-verified.

## Sources

- GitHub `ActualLab/Fusion` repo + commit history (WebSearch snippets, not fetched directly)
- [[yakunin-fusion-vs-signalr]]: Alex Yakunin, ~2019
- Voxt.ai / Actual Chat public-facing product pages (WebSearch snippets)
