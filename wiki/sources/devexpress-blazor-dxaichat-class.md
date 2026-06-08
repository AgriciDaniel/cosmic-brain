---
type: source
title: "DxAIChat Class API Reference"
created: 2026-05-25
updated: 2026-05-25
address: c-000041
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - chat
  - api-reference
source_url: https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat
source_file: raw/DxAIChat Class  Blazor.md
related:
  - "[[DevExpress Blazor DxAIChat]]"
---

# DxAIChat Class API Reference

Source: <https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat>

Class: `DxAIChat : DxComponentBase, IAsyncDisposable, IAIChat, INestedSettingsOwner`
Assembly: `DevExpress.AIIntegration.Blazor.Chat.v25.2.dll`
NuGet: `DevExpress.AIIntegration.Blazor.Chat`

## Key Features Documented

- AI model settings (FrequencyPenalty, MaxTokens, Temperature)
- Streaming response (UseStreaming)
- Rich formatted response via Markdown + HtmlSanitizer (XSS prevention)
- File attachments with validation (size, extension, type, count)
- Customizable templates (MessageTemplate, MessageContentTemplate, EmptyMessageAreaTemplate)
- Manual message processing via MessageSent event
- Stop message generation with CancellationToken
- Save/LoadMessages for chat history persistence
- System prompts via LoadMessages in Initialized event
- Prompt suggestions (hint bubbles with SendOnClick)
- OpenAI Assistants integration (SetupAssistantAsync)
- AI tool calling with target-aware tools and flexible contexts
- Blazor Hybrid support (WinForms, WPF, MAUI)
- Dynamic model switching via ChatClientServiceKey and .NET keyed services
- BYOK model — no proprietary API or bundled models
