---
title: "DevExpress Blazor AI Chat — Multi-Model Support, MCP Server Integration, and a Look at What's Coming Next"
source: "https://community.devexpress.com/Blogs/aspnet/archive/2026/05/22/devexpress-blazor-ai-chat-multi-model-support-mcp-server-integration-and-a-look-at-what-39-s-coming-next.aspx"
author:
published: 2026-05-22
created: 2026-05-25
description:
tags:
  - "clippings"
---
We continue to extend the capabilities of the [DevExpress Blazor AI Chat](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat "DevExpress Blazor AI Chat") component and publish GitHub examples designed to address real-world usage scenarios. This post highlights two new examples: a multi-model chat with persistent conversation history, and MCP server integration that extends AI context with external data sources. I'll also share planned features for v26.1 (scheduled for mid-June 2026).

## Multi-Model Chat with Conversation History

Our [earlier multi-LLM chat application example](https://community.devexpress.com/Blogs/aspnet/archive/2025/05/06/devexpress-blazor-ai-chat-build-a-multi-llm-chat-application.aspx "DevExpress Blazor AI Chat — Build a Multi-LLM Chat Application") demonstrated how to switch between AI providers within a single chat session. The new [DevExpress Blazor AI Chat — Multi-Model Chat with Conversation History](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services "DevExpress Blazor AI Chat — Multi-Model Chat with Conversation History") example adds persistent conversation threads and automated chat session title generation.

![The multi-model chat UI showing the left sidebar with a list of conversation threads (each with an auto-generated title), a model selector dropdown at the top, and the active chat pane on the right.](https://community.devexpress.com/blogs/aspnet/26.1/mcp-multi-llm/devexpress-ai-blazor-chat-multi-llm-with-title-generation.png)

The application uses a two-pane layout with `DxSplitter`. The left pane is a sidebar that hosts a `DxComboBox` for model selection and a `DxListBox` for conversation threads. `InMemoryChatThreadStore` manages thread data. This thread-safe dictionary-backed store tracks message history and timestamps. The right pane hosts the `DxAIChat` component. The following Razor markup defines the layout:

```html
<DxSplitter CssClass="chat-splitter" Height="100%">
    <Panes>
        <DxSplitterPane Size="320px" MinSize="220px" MaxSize="500px">
            <DxButton RenderStyle="ButtonRenderStyle.Primary"
                      RenderStyleMode="ButtonRenderStyleMode.Contained"
                      Text="New Chat"
                      Click="CreateNewThreadAsync" />
            <DxComboBox Data="@ModelsList"
                        Value="@SelectedModel"
                        TextFieldName="@nameof(ChatClientSession.Name)"
                        ValueChanged="@((ChatClientSession session) => OnSelectedThreadModelChangedAsync(session))" />
            <DxListBox Data="@Threads"
                       Value="@SelectedThread"
                       ValueChanged="@((ChatThread thread) => OnThreadSelectedAsync(thread))"
                       TextFieldName="@nameof(ChatThread.Title)">
                <ItemDisplayTemplate>
                    <div class="thread-list-item">
                        <div class="thread-title">@context.DataItem.Title</div>
                        <div class="thread-model">@GetModelName(context.DataItem.ModelSessionId)</div>
                    </div>
                </ItemDisplayTemplate>
            </DxListBox>
        </DxSplitterPane>
        <DxSplitterPane>
            <DxAIChat @ref="DxAiChat"
                      Initialized="OnChatInitialized" />
        </DxSplitterPane>
    </Panes>
</DxSplitter>
```

Automatic thread title generation is a key implementation detail. The `CompositeChatClient` class implements `IChatClient` and intercepts outgoing user messages via `GetResponseAsync` and `GetStreamingResponseAsync` methods. On the first message in a new thread, the class sends a background request to the selected AI model using a dedicated system prompt and requests a concise 3–6 word title. `IChatThreadStore` stores the result. The `ThreadTitleUpdated` event updates the UI and refreshes the sidebar without blocking the main chat response:

```csharp
// CompositeChatClient.cs
public IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(IEnumerable<ChatMessagegt; messages,
ChatOptions? options = null, CancellationToken cancellationToken = new CancellationToken())
    {
        var selectedSession = GetRequiredSelectedSession();
        var messageList = messages.ToList();
        TryQueueTitleGeneration(messageList, selectedSession);
        ...
        await foreach (var update in selectedSession.Client.GetStreamingResponseAsync(
            messageList, options, cancellationToken))
            yield return update;
        ...
    }

private void TryQueueTitleGeneration(IEnumerable<ChatMessage> messages, ChatClientSession selectedSession) {
    var threadId = _activeThreadId.Value;
    var firstUserMessage = GetFirstUserMessage(messages);
    ...
    _ = GenerateTitleForThreadAsync(threadId, selectedSession, firstUserMessage);
}

private async Task GenerateTitleForThreadAsync(Guid threadId,
    ChatClientSession selectedSession, string firstUserMessage) {
    try {
        var thread = await _threadStore.GetThreadAsync(threadId, CancellationToken.None);
        if (thread is null || thread.HasGeneratedTitle)
            return;

        var modelSession = AvailableChatClients
            .FirstOrDefault(x => x.Id == thread.ModelSessionId) ?? selectedSession;

        string generatedTitle;
            try {
                generatedTitle = await _titleGenerator.GenerateTitleAsync(modelSession, firstUserMessage, CancellationToken.None);
            }
            catch {
                generatedTitle = _titleGenerator.BuildFallbackTitle(firstUserMessage);
            }

            if (string.IsNullOrWhiteSpace(generatedTitle)) {
                generatedTitle = _titleGenerator.BuildFallbackTitle(firstUserMessage);
            }

            await _threadStore.UpdateTitleAsync(threadId, generatedTitle, true, CancellationToken.None);
            lock (_syncRoot) {
                _titledThreadIds.Add(threadId);
            }
            ThreadTitleUpdated?.Invoke(threadId, generatedTitle);
        }
        catch (OperationCanceledException) { }
        finally {
            lock (_syncRoot)
                _titleGenerationInProgress.Remove(threadId);
        }
}
```

The example includes an in-memory store. The `IChatThreadStore` interface allows for replacement with an EF Core-backed implementation for applications that require persistent history.

To download and explore our implementation, navigate to the following DevExpress GitHub repository: [Blazor AI Chat — Multi-Model Chat with Conversation History](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services "Blazor AI Chat — Multi-Model Chat with Conversation History").

## MCP Server Integration

The [DevExpress Blazor AI Chat — Integration with Model Context Protocol](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources "DevExpress Blazor AI Chat — Integration with Model Context Protocol") example connects our Blazor AI Chat component to external data through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro "Model Context Protocol — Introduction").

![The Blazor AI Chat UI with an MCP-powered chat session open, showing the chat querying a server access log and receiving an AI-generated analysis in response.](https://community.devexpress.com/blogs/aspnet/26.1/mcp-multi-llm/devexpress-ai-blazor-chat-mcp-resources-window.png)

The solution includes two projects.

- `AIChatMcpServer` is a custom MCP server that exposes sample tools, resources, and prompt templates to the client application.
- `AIChatMcpClient` is a Blazor Server application that hosts `DxAIChat` and loads MCP capabilities at startup through a hosted `McpRepository` service.

The sample MCP server exposes three primitives: **tools** (executable functions the AI model can call automatically), **resources** (static content such as logs, text files, and binary images), and **prompts** (reusable parameterized templates). `McpRepository` loads these primitives at startup and passes them to `DxAIChat`.

Each primitive maps directly to a `DxAIChat` feature. Resources map to `AIChatResource` objects and populate the `Resources` collection. Prompts map to `DxAIChatPromptSuggestion` entries displayed when the chat opens. Tools attach to `IChatClient` through `UseFunctionInvocation` at startup.

**Index.razor**:

```html
<DxAIChat FileUploadEnabled="true"
          Resources="Resources"
          IncludeFunctionCallInfo="true">
        <PromptSuggestions>
            @foreach (var suggestion in PromptSuggestions){
                <DxAIChatPromptSuggestion PromptMessage="@suggestion.PromptMessage" Title="@suggestion.Title" Text="@suggestion.PromptMessage"/>
            }
        </PromptSuggestions>
        <AIChatSettings>
            <DxAIChatFileUploadSettings MaxFileSize="10000000" MaxFileCount="3"/>
        </AIChatSettings>
    </DxAIChat>

@code {
    IEnumerable<AIChatResource> Resources { get; set; } = [];
    IEnumerable<PromptSuggestion> PromptSuggestions { get; set; } = [];

    protected override async Task OnInitializedAsync() {
        // Map MCP resources to AIChatResource — DxAIChat fetches content on demand via LoadResourceData
        Resources = McpRepository.Resources.Select(x =>
            new AIChatResource(x.Uri, x.Name, LoadResourceData, x.MimeType, x.Description));
        // Map MCP prompt templates to prompt suggestions shown in the chat UI
        PromptSuggestions = McpRepository.PromptSuggestions;
    }

    async Task<IList<AIContent>> LoadResourceData(AIChatResource resource, CancellationToken ct) {
        var result = await McpRepository.Client.ReadResourceAsync(resource.Uri, cancellationToken: ct);
        return result.Contents.ToAIContents();
    }
}
```

**Program.cs**:

```csharp
using Azure;
using Azure.AI.OpenAI;
using AIChatMcpClient;
using AIChatMcpClient.Components;
using AIChatMcpClient.Services;
using Microsoft.Extensions.AI;
...

builder.Services.AddSingleton<McpRepository>();
builder.Services.AddHostedService(sp => sp.GetRequiredService<McpRepository>());

builder.Services.AddSingleton<IChatClient>(sp => {
    var mcpRepository = sp.GetService<McpRepository>();
    var azureOpenAIClient = new AzureOpenAIClient(
        new Uri(azureOpenAISettings.Endpoint),
        new AzureKeyCredential(azureOpenAISettings.ApiKey));
    var chatClient = azureOpenAIClient.GetChatClient(azureOpenAISettings.DeploymentName).AsIChatClient();
    return new ChatClientBuilder(chatClient)
        .ConfigureOptions(co => {
            co.Tools = mcpRepository.Tools.ToArray<AITool>();
        })
        .UseFunctionInvocation()
        .Build();
});
...
```

The implementation follows MCP standards. Client code requires no changes when you switch to another MCP-compliant backend. To connect the Blazor application to a different MCP server, modify the `McpRepository` endpoint:

```csharp
using AIChatMcpClient.Models;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol;
...
public class McpRepository : IHostedService, IAsyncDisposable {
    private readonly string _mcpEndpoint;

    public McpClient Client { get; private set; } = null!;
    public List<McpClientTool> Tools { get; } = [];
    public List<McpClientResource> Resources { get; } = [];
    public List<McpClientPrompt> Prompts { get; } = [];
    public List<PromptSuggestion> PromptSuggestions { get; } = [];

    public McpRepository(IConfiguration configuration) {
        _mcpEndpoint = configuration.GetSection("McpServer:Endpoint").Value
                       ?? throw new InvalidOperationException("McpServer:Endpoint is not configured in appsettings.json");
    }

    public async Task StartAsync(CancellationToken cancellationToken) {
        var transport = new HttpClientTransport(new() { Endpoint = new(_mcpEndpoint) });
        Client = await McpClient.CreateAsync(transport);

        var tools = await Client.ListToolsAsync(cancellationToken: cancellationToken);
        var resources = await Client.ListResourcesAsync(cancellationToken: cancellationToken);
        var prompts = await Client.ListPromptsAsync(cancellationToken: cancellationToken);

        Tools.AddRange(tools);
        Resources.AddRange(resources);
        Prompts.AddRange(prompts);

        // Preload prompt suggestions at startup
        foreach (var prompt in Prompts) {
            var result = await prompt.GetAsync();
            var content = result.Messages[0].Content;
            PromptSuggestions.Add(new PromptSuggestion {
                PromptMessage = ((TextContentBlock)content).Text,
                Title = prompt.Title ?? "Untitled"
            });
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    public async ValueTask DisposeAsync() {
        await Client.DisposeAsync();
    }
}
```

To download and explore our implementation, navigate to the following DevExpress GitHub repository: [DevExpress Blazor AI Chat — Integration with Model Context Protocol](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources "DevExpress Blazor AI Chat — Integration with Model Context Protocol").

## What's Coming in v26.1

Our v26.1 release is scheduled for mid-June 2026 and includes the following enhancements to DevExpress AI Chat components for Blazor, WinForms, and WPF.

### Microsoft Agent Framework and OpenAI Responses API Support

The most substantial addition is a new `IChatResponseProvider` abstraction layer that decouples the chat UI from the underlying AI service. This layer allows you to bind `DxAIChat` to a wider set of AI backends beyond the standard `IChatClient` interface, including the Microsoft Agent Framework (with support for agents, executors, and multi-step workflows), the OpenAI Responses API, and Azure AI Projects. The API also supports custom `IChatResponseProvider` implementations for usage scenarios that don't fit standard providers.

Planned demos will illustrate how to connect our AI Chat Control to individual agents, composite workflows, AG-UI backends, and tool approval workflows in agentic pipelines.

### API Enhancements

v26.1 replaces the `MessageSent` event with `MessageSending`. This event fires before the message is added to chat history and sent to the AI service. Additionally, this event exposes an `e.Cancel` parameter that allows you to block send operations entirely. Use it to preprocess and validate input, filter content, call external services and handle the messaging pipeline manually. Alternatively, if `e.Cancel` is set to `false`, the AI Chat Control will continue sending and displaying messages and allow you to log and audit user messages without disruption to the normal message pipeline.

The new event also supports augmentation before delivery — for example, appending a system message or supplemental context to the chat history via the new `AppendMessageAsync` method:

```csharp
async void AiChatControl1_MessageSending(object sender, AIChatControlMessageSendingEventArgs e) {
    // Append a system message before sending the user's prompt to the AI service.
    await e.Chat.AppendMessageAsync("Translate text to Spanish", ChatRole.System);
}
```

### Empty Chat Customization

v26.1 introduces two new properties designed to customize initial chat state. `EmptyMessageAreaText` specifies text dispalyed in the empty chat area, and `InputBoxNullText` specifies placeholder text in the input box. These properties allow you to align the initial chat experience with application context and tone:

```html
<DxAIChat EmptyMessageAreaText="How can I help you today?"
          InputBoxNullText="Ask a question or describe a task..." />
```
![Blazor AI Chat — Customized Empty Text Area and Input Null Text](https://community.devexpress.com/blogs/aspnet/26.1/mcp-multi-llm/26-1-blazor-aichat-empty-chat-ui@2x.png)

## Share Your Feedback

Looking for a particular code example? [Contact us via the DevExpress Support Center](https://supportcenter.devexpress.com/ "DevExpress Support Center") to share your usage scenario and we'll be happy to recommend an implementation.

## Free DevExpress Products - Get Your Copy Today

The following free DevExpress product offers remain available. Should you have any questions about the free offers below, please submit a ticket via the [DevExpress Support Center](https://supportcenter.devexpress.com/) at your convenience. We'll be happy to follow-up.

- [.NET App Security & Web API Service](https://www.devexpress.com/security-api-free?utm_source=DevExpress&utm_medium=Blog&utm_campaign=XAF&utm_content=footer)
- [CodeRush for Visual Studio](https://www.devexpress.com/products/coderush?utm_source=DevExpress&utm_medium=Blog&utm_campaign=CodeRush&utm_content=footer)
- [.NET ORM Library (XPO)](https://www.devexpress.com/products/net/orm?utm_source=DevExpress&utm_medium=Blog&utm_campaign=XPO&utm_content=footer)

## Recent Posts

[DevExpress Blazor AI Chat — Multi-Model Support, MCP Server Integration, and a Look at What's Coming Next](https://community.devexpress.com/Blogs/aspnet/archive/2026/05/22/devexpress-blazor-ai-chat-multi-model-support-mcp-server-integration-and-a-look-at-what-39-s-coming-next.aspx)

[Blazor — End of Support for Bootstrap v4 (v26.1)](https://community.devexpress.com/Blogs/aspnet/archive/2026/03/24/blazor-end-of-support-for-bootstrap-v4-v26.1.aspx)

[Blazor — June 2026 Roadmap (v26.1)](https://community.devexpress.com/Blogs/aspnet/archive/2026/02/24/blazor-june-2026-roadmap-v26-1.aspx)