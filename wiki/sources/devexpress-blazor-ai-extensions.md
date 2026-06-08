---
type: source
title: "DevExpress AI-powered Extensions for Blazor"
created: 2026-05-25
updated: 2026-05-25
address: c-000036
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - microsoft-extensions-ai
  - icchatclient
source_url: https://docs.devexpress.com/Blazor/405228/ai-powered-extensions
source_file: .raw/DevExpress AI-powered Extensions for Blazor  Blazor.md
related:
  - "[[DevExpress Blazor AI Extensions]]"
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxToolbar]]"
---

# DevExpress AI-powered Extensions for Blazor

Source URL: <https://docs.devexpress.com/Blazor/405228/ai-powered-extensions>
Fetched: 2026-05-25 (clippings, v25.2)

## Summary

DevExpress v25.2 introduces AI-powered extensions for Blazor components built on the `Microsoft.Extensions.AI` library. The architecture uses `IChatClient` as the central abstraction, enabling a unified C# layer that decouples application code from specific AI SDKs. Operates on a "bring your own key" (BYOK) model — no proprietary REST API or bundled models.

## AI-Powered Components

| Component | AI Feature |
|---|---|
| DxAIChat | Full AI chat component |
| HTML Editor | AI-powered document editing |
| Rich Text Editor | AI-powered document editing |
| DxMemo | AI-powered smart autocomplete |
| Report Viewer/Designer | AI-powered reporting |

## Supported AI Providers

| Provider | Integration |
|---|---|
| OpenAI | `Microsoft.Extensions.AI.OpenAI` |
| Azure OpenAI | `Azure.AI.OpenAI` + `Microsoft.Extensions.AI.OpenAI` |
| Ollama | `OllamaSharp` |
| Foundry Local | `Microsoft.AI.Foundry.Local` (preview, Windows/cross-platform) |
| ONNX Runtime | `Microsoft.ML.OnnxRuntimeGenAI` (DirectML, CUDA, WinML, QNN, Foundry) |
| Semantic Kernel | Google Gemini, Anthropic Claude, DeepSeek, Mistral, Hugging Face + custom connectors |

## Architecture

1. Application code depends only on `IChatClient` (from `Microsoft.Extensions.AI`)
2. Provider-specific NuGet packages handle the actual AI service communication
3. Switching providers requires only startup logic changes and package swaps
4. All AI features share one registered `IChatClient` with global inference parameters

## Prerequisites

- .NET 8 SDK or above
- AI language model (cloud or self-hosted)
- Appropriate NuGet packages per provider
- Register: `builder.Services.AddDevExpressBlazor()` + `builder.Services.AddDevExpressAI()`

## Pages Created

- [[DevExpress Blazor AI Extensions]] — concept page: architecture, providers, integration patterns, inference config, troubleshooting
- Updated [[DevExpress Blazor]] entity page with AI extensions info

## Key Insight

DevExpress chose `Microsoft.Extensions.AI` (the emerging .NET standard for AI abstraction) over building a proprietary API. This means Blazor apps can prototype with Ollama locally, then switch to Azure OpenAI in production by changing only DI registration — no component code changes. The BYOK model keeps DevExpress out of the API-key business entirely.
