---
type: concept
title: "DevExpress Blazor AI Examples"
created: 2026-05-25
updated: 2026-05-25
address: c-000039
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - examples
  - github
related:
  - "[[DevExpress Blazor AI Extensions]]"
  - "[[DevExpress Blazor DxAIChat]]"
  - "[[DevExpress Blazor]]"
---

# DevExpress Blazor AI Examples

Official DevExpress GitHub example repositories demonstrating AI-powered Blazor features. All repos under [github.com/DevExpress-Examples](https://github.com/DevExpress-Examples).

## Example Repositories

### Core AI Chat

| Repository | Description |
|---|---|
| [devexpress-ai-chat-samples](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples) | AI Chat across Blazor, MAUI, WPF, WinForms |
| [blazor-ai-chat-with-multiple-llm-services](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services) | Multi-model chat with conversation history |

### Advanced Chat Features

| Repository | Description |
|---|---|
| [blazor-ai-chat-function-calling](https://github.com/DevExpress-Examples/blazor-ai-chat-function-calling) | Function/tool calling implementation |
| [blazor-ai-chat-confirm-tool-calls](https://github.com/DevExpress-Examples/blazor-ai-chat-confirm-tool-calls) | User confirmation before tool execution |
| [blazor-ai-chat-a2a-mode](https://github.com/DevExpress-Examples/blazor-ai-chat-a2a-mode) | Agent-to-Agent (A2A) protocol communication |
| [blazor-ai-chat-mcp-resources](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources) | Model Context Protocol integration |

### Editor & Document AI

| Repository | Description |
|---|---|
| [blazor-ai-integration-to-text-editors](https://github.com/DevExpress-Examples/blazor-ai-integration-to-text-editors) | AI-powered editing in Rich Text Editor and HTML Editor |
| [blazor-ai-chat-spell-checker](https://github.com/DevExpress-Examples/blazor-ai-chat-spell-checker) | Grammar & Style Assistant powered by OpenAI |

### Business Scenarios

| Repository | Description |
|---|---|
| [blazor-grid-and-report-viewer-integrate-ai-assistant](https://github.com/DevExpress-Examples/blazor-grid-and-report-viewer-integrate-ai-assistant) | AI Assistant embedded in Data Grid and Report Viewer |

## Patterns Demonstrated

1. **Tool/Function Calling**: AI chat invokes C# methods based on user intent
2. **Multi-Model Switching**: Runtime switching between OpenAI, Azure OpenAI, Ollama, Gemini via `ChatClientServiceKey`
3. **A2A Protocol**: Agent-to-Agent communication standard for multi-agent systems
4. **MCP Integration**: Model Context Protocol for connecting external tools/resources
5. **Tool Call Confirmation**: Human-in-the-loop approval before executing AI-requested actions
6. **Document AI**: AI-powered text editing, grammar checking, content generation within editors
7. **Cross-Platform AI Chat**: Same DxAIChat component across Blazor, MAUI, WPF, WinForms
8. **Conversation History**: Multi-turn conversation with persistence
