---
type: concept
title: "DevExpress Blazor AI v26.1 Roadmap"
created: 2026-05-25
updated: 2026-05-25
address: c-000040
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - roadmap
  - v26.1
source_url: https://community.devexpress.com/Blogs/aspnet/archive/2026/05/22/devexpress-blazor-ai-chat-multi-model-support-mcp-server-integration-and-a-look-at-what-39-s-coming-next.aspx
source_file: .raw/DevExpress Blazor AI Chat — Multi-Model Support, MCP Server Integration, and a Look at What's Coming Next.md
related:
  - "[[DevExpress Blazor DxAIChat]]"
  - "[[DevExpress Blazor AI Extensions]]"
  - "[[DevExpress Blazor]]"
---

# DevExpress Blazor AI v26.1 Roadmap

Scheduled for mid-June 2026. Source: DevExpress community blog, 2026-05-22.

## Microsoft Agent Framework and OpenAI Responses API

New `IChatResponseProvider` abstraction layer decouples chat UI from AI service:

- **Microsoft Agent Framework**: agents, executors, multi-step workflows
- **OpenAI Responses API**: native OpenAI endpoint support
- **Azure AI Projects**: Azure-native AI integration
- **Custom providers**: implement `IChatResponseProvider` for proprietary backends

Planned demos: individual agents, composite workflows, AG-UI backends, tool approval in agentic pipelines.

This sits alongside `IChatClient` — apps can use either or both.

## API Enhancements

### MessageSent → MessageSending

| v25.2 | v26.1 |
|---|---|
| `MessageSent` fires after message is added | `MessageSending` fires BEFORE the message is sent to AI |
| No cancellation | `e.Cancel` — block send entirely |
| Observation only | Preprocess, validate, filter, augment |

**Use cases:**
- Content filtering before AI processing
- Append system messages via `AppendMessageAsync`
- Call external services before delivery
- Handle messaging pipeline manually

```csharp
async void Chat_MessageSending(object sender, AIChatControlMessageSendingEventArgs e) {
    await e.Chat.AppendMessageAsync("Translate text to Spanish", ChatRole.System);
}
```

### New Methods

- `AppendMessageAsync(content, role)` — add context before message delivery

## Empty Chat Customization

```razor
<DxAIChat EmptyMessageAreaText="How can I help you today?"
          InputBoxNullText="Ask a question or describe a task..." />
```

Aligns initial chat experience with application context and tone.

## Multi-Model Chat with Conversation History

Highlighted in the blog post as a new example (available now):

- Two-pane layout with `DxSplitter`: sidebar (model selector + thread list) + chat pane
- `DxComboBox` for model selection, `DxListBox` for conversation threads
- `InMemoryChatThreadStore` — thread-safe dictionary-backed store (replaceable with EF Core)
- `CompositeChatClient` implements `IChatClient` and intercepts messages for auto title generation
- Auto title: on first message in new thread, fires background request with dedicated system prompt → 3-6 word title
- `IChatThreadStore` interface for persistent history backends

## MCP Server Integration

Highlighted example (available now):

- Two-project solution: `AIChatMcpServer` + `AIChatMcpClient`
- `McpRepository` as hosted service loads MCP capabilities at startup
- Three MCP primitives mapped to DxAIChat:
  - **Tools** → `IChatClient` function invocation via `UseFunctionInvocation`
  - **Resources** → `AIChatResource` objects, on-demand loading via `LoadResourceData`
  - **Prompts** → `DxAIChatPromptSuggestion` entries
- MCP-compliant: changing endpoint switches backend with zero client code changes

## Other v26.1 Changes

- End of Bootstrap v4 support for Blazor components

## Related Examples

- [Multi-Model Chat with Conversation History](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services)
- [MCP Server Integration](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources)
