---
type: concept
title: "DevExpress Blazor DxAIChat"
created: 2026-05-25
updated: 2026-05-25
address: c-000038
status: developing
tags:
  - blazor
  - devexpress
  - ai
  - chat
  - ui-component
source_url: https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat
source_file: raw/DxAIChat Class  Blazor.md
related:
  - "[[DevExpress Blazor AI Extensions]]"
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor AI Examples]]"
  - "[[DevExpress Blazor AI v26.1 Roadmap]]"
---

# DevExpress Blazor DxAIChat

The `DxAIChat` component provides a complete AI chat UI for Blazor apps. Namespace `DevExpress.AIIntegration.Blazor.Chat`, assembly `DevExpress.AIIntegration.Blazor.Chat.v25.2.dll`, NuGet package `DevExpress.AIIntegration.Blazor.Chat`.

Source URL: <https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat>

## Declaration

```csharp
public class DxAIChat :
    DxComponentBase,
    IAsyncDisposable,
    IAIChat,
    INestedSettingsOwner
```

## Component Properties

| Property | Type | Description |
|---|---|---|
| `ChatClientServiceKey` | string | Key for runtime AI provider switching via .NET keyed services |
| `FileUploadEnabled` | bool | Enable file attachments |
| `MaxTokens` | int? | Max tokens per AI response |
| `Temperature` | float? | Response randomness (0 = deterministic, 1 = creative) |
| `FrequencyPenalty` | float? | Penalizes repeated tokens |
| `UseStreaming` | bool | Stream response parts as they become available |
| `ResponseContentFormat` | ResponseContentFormat | `Plain` (default) or `Markdown` for rich formatted responses |
| `PromptSuggestions` | RenderFragment | Hint bubbles shown when chat is empty |
| `IncludeFunctionCallInfo` | bool | Show tool/function call details in response |
| `CssClass` | string | Custom CSS class |
| `EmptyMessageAreaText` | string | (v26.1) Custom text in empty chat area |
| `InputBoxNullText` | string | (v26.1) Placeholder text in input box |

### AI Model Settings

Set per-component or globally via `ChatClientBuilder.ConfigureOptions()`:

- `FrequencyPenalty` — penalize repeated tokens
- `MaxTokens` — cap response length
- `Temperature` — control randomness

## File Upload Settings (`DxAIChatFileUploadSettings`)

Declared inside `<AIChatSettings>`:

| Property | Type | Description |
|---|---|---|
| `AllowedFileExtensions` | List\<string\> | Allowed extensions |
| `MaxFileCount` | int | Max attached files |
| `MaxFileSize` | long | Max file size in bytes |
| `FileTypeFilter` | List\<string\> | MIME type filter (e.g., `image/*`, `application/pdf`) |

DxAIChat facilitates file upload but does not process content. Interpretation depends on the connected AI model.

## Prompts Suggestions (`DxAIChatPromptSuggestion`)

| Property | Description |
|---|---|
| `Title` | Bubble title |
| `Text` | Bubble description |
| `PromptMessage` | Text inserted into input |
| `SendOnClick` | `true` = send immediately; `false` = insert for editing |

Template: `PromptSuggestionContentTemplate` for custom rendering.

## Templates

| Template | Description |
|---|---|
| `MessageTemplate` | Full message bubble rendering (layout, padding, alignment) |
| `MessageContentTemplate` | Inner message content without affecting layout |
| `EmptyMessageAreaTemplate` | Custom area when no messages exist |
| `PromptSuggestionContentTemplate` | Custom template for prompt suggestion bubbles |

## Events

| Event | Args | Description |
|---|---|---|
| `Initialized` | `IAIChat` | Fires on component init; use to load messages, set system prompt, connect OpenAI Assistant |
| `MessageSent` | `MessageSentEventArgs` | Fires when user sends message (v25.2); replaced by `MessageSending` in v26.1 |
| `ResponseReceived` | `ResponseReceivedEventArgs` | Fires after AI response, before display |

### Event Args

**MessageSentEventArgs:**
- `Chat` (`IAIChat`) — programmatic message sending
- `Content` (string) — user's message text
- `Files` — attached files via `AIChatUploadFileInfo`
- `CancellationToken` — handle stop-generation cancellation

**ResponseReceivedEventArgs:**
- `Chat` (`IAIChat`) — access to chat methods
- `Message` — response message including `Message.FunctionCalls`

## IAIChat Interface

| Method | Description |
|---|---|
| `SendMessage(content, role, files)` | Send message programmatically |
| `SaveMessages()` | Get full message history |
| `LoadMessages(IEnumerable<BlazorChatMessage>)` | Load existing messages (history, system prompts) |
| `SetupAssistantAsync(assistantId, threadId)` | Connect to OpenAI Assistant |

## Features

### Streaming Response

```razor
<DxAIChat UseStreaming="true" />
```

Parts of the response are displayed as they become available.

### Rich Formatted Response (Markdown)

```razor
@using Markdig
@using Ganss.Xss

<DxAIChat ResponseContentFormat="ResponseContentFormat.Markdown">
    <MessageContentTemplate>
        @ToHtml(context.Content)
    </MessageContentTemplate>
</DxAIChat>

@code {
    readonly HtmlSanitizer sanitizer = new();
    MarkupString ToHtml(string markdown) {
        string html = Markdown.ToHtml(markdown);
        return new MarkupString(sanitizer.Sanitize(html));
    }
}
```

Always sanitize Markdown-to-HTML output to prevent XSS. Use `HtmlSanitizer` package.

### File Attachments

```razor
<DxAIChat FileUploadEnabled="true">
    <AIChatSettings>
        <DxAIChatFileUploadSettings MaxFileCount="2"
                                    MaxFileSize="20000"
                                    AllowedFileExtensions="@(new List<string> { ".jpg", ".pdf" })"
                                    FileTypeFilter="@(new List<string> { "image/*", "application/pdf" })" />
    </AIChatSettings>
</DxAIChat>
```

### System Prompts

Set via `LoadMessages` in `Initialized` event:

```csharp
async Task ChatInitialized(IAIChat chat) {
    var prompt = "You are a friendly hiking enthusiast who helps people discover fun hikes...";
    chat.LoadMessages(new[] {
        new BlazorChatMessage(ChatRole.System, prompt),
    });
}
```

### Save and Load Messages

```razor
<DxAIChat Initialized="ChatInitialized" />

@code {
    void ChatInitialized(IAIChat chat) {
        chat.LoadMessages(new[] {
            new BlazorChatMessage(ChatRole.Assistant, "Hello, how can I help you?")
        });
    }
}
```

### Manual Message Processing

```csharp
async Task MessageSent(MessageSentEventArgs args) {
    await args.Chat.SendMessage($"Processed: {args.Content}", ChatRole.Assistant);
}
```

Users can stop message generation mid-response. Handle cancellation via `args.CancellationToken`.

### Dynamic Model Switching

```razor
<DxAIChat ChatClientServiceKey="@chatClientServiceKey" />
```

Register multiple keyed `IChatClient` services with `AddKeyedChatClient("KeyName", client)`.

### OpenAI Assistants

```csharp
async Task Initialized(IAIChat chat) {
    (string assistantId, string threadId) = await assistantCreator.CreateAssistantAsync(
        pdfStream, fileName, systemPrompt);
    await chat.SetupAssistantAsync(assistantId, threadId);
}
```

Connect to an existing OpenAI Assistant instance via `SetupAssistantAsync(assistantId, threadId)`.

### AI Tool Calling

DevExpress adds a tool calling layer on top of `Microsoft.Extensions.AI`:

- **Target-aware tools**: operate on specific object instances (UI controls, pages, services); runtime resolution from context descriptions
- **Flexible tool contexts**: group tools into contexts; enable/disable/remove dynamically based on app state
- **Auto-discovery**: DxAIChat discovers and merges tools from all registered contexts; handles selection, target resolution, parameter binding, invocation

```csharp
context = new AIToolsContextBuilder()
    .WithToolMethods(ExpandGroups)
    .Build();
container.Add(context);
```

### Blazor Hybrid (WinForms, WPF, MAUI)

Use Blazor Hybrid technology to embed DxAIChat in WinForms, WPF, or .NET MAUI apps.

## v26.1 Upcoming Changes

See [[DevExpress Blazor AI v26.1 Roadmap]] for details:
- `IChatResponseProvider` abstraction (Microsoft Agent Framework, OpenAI Responses API, Azure AI Projects)
- `MessageSent` → `MessageSending` (pre-send event with `e.Cancel`)
- `AppendMessageAsync` for augmenting context before delivery
- `EmptyMessageAreaText`, `InputBoxNullText` customization
- End of Bootstrap v4 support
