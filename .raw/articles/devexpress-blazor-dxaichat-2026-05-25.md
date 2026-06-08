---
source_url: https://docs.devexpress.com/Blazor/405290/components/ai-chat
fetched: 2026-05-25
fetch_method: web_search
fetch_note: Direct fetch blocked by Cloudflare. Content from web search results.
---

# DevExpress Blazor DxAIChat Component

## Overview

Namespace: `DevExpress.AIIntegration.Blazor.Chat`
Assembly: `DevExpress.AIIntegration.Blazor.Chat.v25.2.dll`

The DxAIChat provides a complete AI chat UI. Requires registered IChatClient via builder.Services.AddDevExpressAI().

## Properties

- ChatClientServiceKey (string) — keyed service for runtime provider switching
- FileUploadEnabled (bool) — enable file attachments
- MaxTokens (int?) — max tokens per response
- Temperature (float?) — randomness control
- PromptSuggestions (RenderFragment) — hint bubbles when empty
- CssClass (string) — custom CSS
- IncludeFunctionCallInfo (bool) — show tool call details

## File Upload Settings (DxAIChatFileUploadSettings)

- AllowedFileExtensions (List<string>)
- MaxFileCount (int)
- MaxFileSize (long)

## Prompt Suggestion (DxAIChatPromptSuggestion)

- Title, Text, PromptMessage, SendOnClick

## Events

- ResponseReceived — fires after AI response, before display
- MessageSent — fires on user message send
- Initialized — fires on component init

## IAIChat Methods

- SendMessage(content, role)
- SaveMessages()
