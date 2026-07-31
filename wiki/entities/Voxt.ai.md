---
type: entity
title: "Voxt.ai"
updated: 2026-07-14
tags:
  - dotnet
  - fusion
  - product
  - dogfood
domain: dotnet
status: developing
related:
  - "[[ActualLab.Fusion Overview]]"
  - "[[Fusion Performance & Benchmarks]]"
source: "[[research-fusion-recent-developments]]"
---

# Voxt.ai

Voxt is a real-time voice-chat product built on Fusion by Fusion's own creators — the primary production dogfood app cited in [[Fusion Performance & Benchmarks]] (e.g. the `IChats.GetTile` latency chart).

## Identity

- Rebrand of **Actual Chat** — the Google Play package ID is still `chat.actual.app`. Copyright notices in the Fusion repo read "Copyright (C) 2021-2024 Actual Chat, Inc."
- Built with .NET, Blazor, and ActualLab.Fusion end-to-end
- Available on iOS, Android, and Windows

## Features

Fuses real-time audio, live transcription, and AI assistance:
- Live transcription and live translation
- AI-generated conversation summaries
- Group chats & "Places"
- Voice playback, file/media uploads
- Anonymity option — hides the account, still allows participation via transcription (voice not transmitted)
- Encrypted in transit; invite-only groups, no ads/algorithmic feed

## Relevance to Fusion

Voxt.ai is the reason several Fusion features exist and are validated at production scale — the "1M+ players" MMORPG scaling model in [[ActualLab.Fusion Overview]] describes exactly the observed-state pattern Voxt relies on for chat tiles and presence. The `Fusion Place` community/support channel is hosted inside Voxt.ai itself, making the product both the dogfood app and the project's community hub.

> [!gap] Original 2023-era plans (under the "Actual Chat" name) described an "AI Feature Pack" including speech emotion/tone recognition — not confirmed whether this shipped as-is under the Voxt rebrand.
