---
type: concept
title: "DevExpress Blazor AI Extensions"
created: 2026-05-25
updated: 2026-05-25
address: c-000037
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - microsoft-extensions-ai
  - icchatclient
  - byok
related:
  - "[[DevExpress Blazor]]"
  - "[[devexpress-blazor-ai-extensions]]"
---

# DevExpress Blazor AI Extensions

DevExpress v25.2 adds AI-powered functionality to Blazor components using `Microsoft.Extensions.AI` as the integration layer. The architecture is provider-agnostic: register an `IChatClient` at startup and all AI features work with your chosen model.

## Architecture

```
Application Code → IChatClient (Microsoft.Extensions.AI)
                         ↓
              Provider-specific SDK
        (OpenAI / Azure / Ollama / ONNX / Semantic Kernel)
                         ↓
                   AI Language Model
```

The `IChatClient` interface serves as the central abstraction. Application code never references provider-specific types. Switching from a local Ollama model to Azure OpenAI requires only Startup/DI changes and NuGet package swaps — zero component code changes.

## BYOK Model

DevExpress operates on "bring your own key." No proprietary REST API, no bundled language models. You provide the model (cloud or self-hosted) and configure connection parameters (endpoint, API key, model ID) at startup.

**Security**: never hardcode keys in source code. Use environment variables or secret management.

## AI-Powered Components

| Component | AI Capability |
|---|---|
| `DxAIChat` | Full-featured AI chat UI component |
| `DxHtmlEditor` | AI-powered document editing |
| `DxRichEdit` | AI-powered document editing |
| `DxMemo` | AI-powered smart autocomplete |
| Report Viewer / Designer | AI-powered report generation |

## Supported AI Providers

### Tier 1: First-Party Microsoft Extensions

**OpenAI**
- Packages: `Microsoft.Extensions.AI`, `Microsoft.Extensions.AI.OpenAI`
- Registration: `OpenAIClient` → `GetChatClient(model).AsIChatClient()`

**Azure OpenAI**
- Additional package: `Azure.AI.OpenAI` (v2.2.0-beta.5+)
- Registration: `AzureOpenAIClient` → `GetChatClient(model).AsIChatClient()`

### Tier 2: Self-Hosted

**Ollama**
- Package: `OllamaSharp`
- Registration: `new OllamaApiClient("http://localhost:11434", modelName)`
- Use case: local prototyping, offline, data privacy

**Foundry Local** (public preview)
- Package: `Microsoft.AI.Foundry.Local` (cross-platform) or `.WinML` (Windows-optimized)
- Auto-detects hardware, downloads model on first run (2-4 GB for Phi-4-mini)
- Caches model locally; subsequent runs load from cache
- Requires cleanup service to unload model on shutdown
- Windows target requires OS version `10.0.26100.0+`

**ONNX Runtime**
- Package: `Microsoft.ML.OnnxRuntimeGenAI` + optional hardware-optimized variants
- Hardware targets: DirectML (AMD/NVIDIA/Intel GPU), CUDA (NVIDIA), WinML, QNN (Qualcomm NPU), Foundry
- Registration: `new OnnxRuntimeGenAIChatClient(new Model(config))` with configurable `MaxOutputTokens`
- Requires model files on disk (Hugging Face, ONNX Model Zoo, or converted PyTorch/TensorFlow)

### Tier 3: Semantic Kernel Bridge

**Semantic Kernel** provides AI Connectors for: Google Gemini, Anthropic Claude, DeepSeek, Mistral AI, Hugging Face, and custom/in-house models.

Example (Gemini):
```csharp
var kernelBuilder = Kernel.CreateBuilder()
    .AddGoogleAIGeminiChatCompletion(model, apiKey);
Kernel kernel = kernelBuilder.Build();
IChatClient geminiChatClient = kernel.GetRequiredService<IChatCompletionService>().AsChatClient();
```

## Integration Steps (All Providers)

1. Install NuGet packages (`DevExpress.Blazor`, `DevExpress.AIIntegration.Blazor`, `Microsoft.Extensions.AI` + provider-specific)
2. Register `IChatClient` in `Program.cs` with provider-specific setup
3. Register DevExpress services: `builder.Services.AddDevExpressBlazor()` + `builder.Services.AddDevExpressAI()`
4. Configure secrets via environment variables, never hardcode

## AI Project Templates

The DevExpress Template Kit provides the fastest setup path:
1. Create ASP.NET Core Blazor app via Template Kit
2. Select AI provider (Azure OpenAI, OpenAI, or Ollama) from **Add AI Resources**
3. Template Kit auto-installs NuGet packages and adds AI resources
4. Set API key/endpoint/model in `appsettings.json`
5. Optionally add a sample AI Chat page

## Inference Parameters

Configure globally via `ChatClientBuilder.ConfigureOptions()`:

```csharp
IChatClient chatClient = new ChatClientBuilder(baseClient)
    .ConfigureOptions(options => {
        options.Temperature = 0.7f;
        options.MaxOutputTokens = 1200;
        options.PresencePenalty = 0.5f;
    })
    .Build();
builder.Services.AddChatClient(chatClient);
```

Parameters apply to ALL DevExpress AI-powered features for consistent tone across the app. Provider-specific implementations may use a subset or ignore some options.

## Verification

Add `<DxAIChat />` to a page, send a test prompt, confirm response. Simplest end-to-end connectivity check.

## Example Repos (GitHub)

| Example | Description |
|---|---|
| [devexpress-ai-chat-samples](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples) | AI Chat across Blazor, MAUI, WPF, WinForms |
| [blazor-ai-chat-with-multiple-llm-services](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services) | Multi-model chat with conversation history |
| [blazor-ai-chat-function-calling](https://github.com/DevExpress-Examples/blazor-ai-chat-function-calling) | Function/tool calling |
| [blazor-ai-chat-confirm-tool-calls](https://github.com/DevExpress-Examples/blazor-ai-chat-confirm-tool-calls) | User confirmation for tool calls |
| [blazor-ai-chat-a2a-mode](https://github.com/DevExpress-Examples/blazor-ai-chat-a2a-mode) | Agent-to-Agent (A2A) protocol |
| [blazor-ai-integration-to-text-editors](https://github.com/DevExpress-Examples/blazor-ai-integration-to-text-editors) | AI in Rich Text / HTML Editor |
| [blazor-grid-and-report-viewer-integrate-ai-assistant](https://github.com/DevExpress-Examples/blazor-grid-and-report-viewer-integrate-ai-assistant) | AI Assistant in Grid + Report Viewer |
| [blazor-ai-chat-spell-checker](https://github.com/DevExpress-Examples/blazor-ai-chat-spell-checker) | Grammar & Style Assistant |
| [blazor-ai-chat-mcp-resources](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources) | MCP integration with AI Chat |

## Troubleshooting

| Symptom | Likely Cause |
|---|---|
| "Internal Server Error" | Wrong model name, API key, or endpoint; firewall blocking; self-hosted service not running |
| "Environment variable not set" | Env var not created or IDE hasn't reloaded; restart IDE/terminal |

## Design Implications

The `Microsoft.Extensions.AI` / `IChatClient` pattern is emerging as the .NET standard for AI abstraction (analogous to `ILogger` for logging). DevExpress adopting it means:
- Blazor apps can use any AI provider without vendor lock-in
- Prototype locally (Ollama), deploy to cloud (Azure OpenAI) — no code changes
- Custom `IChatClient` implementations enable private/air-gapped models
- Semantic Kernel bridge extends reach to 10+ providers
