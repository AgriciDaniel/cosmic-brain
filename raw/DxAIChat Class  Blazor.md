---
title: "DxAIChat Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxAIChat Class

In This Article

An AI-powered chat component.

**Assembly**: DevExpress.AIIntegration.Blazor.Chat.v25.2.dll

**NuGet Package**: [DevExpress.AIIntegration.Blazor.Chat](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor.Chat/25.2.7)

## Declaration

```csharp
public class DxAIChat :
    DxComponentBase,
    IAsyncDisposable,
    IAIChat,
    INestedSettingsOwner
```

## Remarks

DevExpress Blazor AI Chat (`<DxAIChat>`) is an AI-powered chat component that allows users to interact with AI services.

![AI Chat](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-overview.png)

[Run Demo: AI Chat](https://demos.devexpress.com/blazor/AI/Chat)  
[View Example: Add a DxAIChat component in Blazor, MAUI, WPF, and WinForms applications](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples)  
[View Example: Build a Multi-LLM Chat Application](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services)  
[View Example: Implement Function/Tool Calling](https://github.com/DevExpress-Examples/blazor-ai-chat-function-calling)

The DevExpress Blazor AI Chat component is compatible with major cloud AI providers and self-hosted language models. Its architecture also allows you to integrate custom AI providers or implement support for proprietary, in-house LLMs.

For a complete list of supported AI providers and detailed integration instructions, see the following help topic: [DevExpress AI-powered Extensions for Blazor](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions).

> [!note] Note
> DevExpress AI-powered extensions operate on a “bring your own key” (BYOK) model. We do not provide a proprietary REST API or bundled language models (LLMs/SLMs).
> 
> You can either deploy a self-hosted model or connect to a cloud AI provider and obtain necessary connection parameters (endpoint, API key, language model identifier, and so on). These parameters must be [configured](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions#manual-ai-services-integration) at application startup to register an AI client and enable extension functionality.

### Add an AI Chat to a Project

Follow the steps below to add an AI Chat component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Install NuGet packages and [register](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions#manual-ai-services-integration) the AI model in the project’s entry point class.
	In a typical setup, DevExpress Blazor AI Chat works with a single [IChatClient](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient). To offer a choice of AI services in your application, register multiple AI models using the [.NET keyed services](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection#keyed-services) mechanism. Each `IChatClient` is associated with a unique string key by calling the [AddKeyedChatClient](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.chatclientbuilderservicecollectionextensions.addkeyedchatclient) method.
	```csharp
	public class Program
	{
	    public static void Main(string[] args)
	    {
	        var builder = WebApplication.CreateBuilder(args);
	        /* define chat clients */
	        builder.Services.AddChatClient(azureOpenAIChatClient);
	        builder.Services.AddKeyedChatClient("Gemini", geminiChatClient);
	        builder.Services.AddKeyedChatClient("Ollama", ollamaChatClient);
	        /* ... */
	    }
	}
	```
3. Add the following markup to a `.razor` file:
	```
	@using DevExpress.AIIntegration.Blazor.Chat
	<DxAIChat />
	```
	Use the [ChatClientServiceKey](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.ChatClientServiceKey) property to dynamically bind the AI Chat component to a specific AI service at runtime. You can offer users a choice of AI models or programmatically select the most appropriate model for the task.
4. *Optional* Configure other model options (see sections below).

> [!important] Important
> Never hardcode AI provider access keys, credentials, or API endpoints directly in your source code. Refer to the following help topic for additional information: [Secret Management for Blazor AI Components](https://docs.devexpress.com/Blazor/405749/security-considerations/ai-secret-management).

### API Reference

Refer to the following list for the component API reference: [DxAIChat Members](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat._members).

### Integration into WinForms, WPF, and.NET MAUI Apps

Use [Blazor Hybrid](https://docs.devexpress.com/Blazor/404118/get-started/visual-studio/create-project-hybrid) technology to integrate DevExpress AI Chat into WinForms, WPF, or.NET MAUI applications. The following GitHub repository includes an implementation example: [Blazor AI Chat - How to add the DevExpress Blazor AI Chat component to your next Blazor, MAUI, WPF, and WinForms application](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples).

### AI Model Settings

The `DxAIChat` component allows you to specify the following AI model settings:

[FrequencyPenalty](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.FrequencyPenalty)

Specifies how the model penalizes new tokens based on their frequency in the text.

[MaxTokens](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.MaxTokens)

Limits the maximum number of [tokens](https://platform.openai.com/tokenizer) to generate in a single call to a GPT model.

[Temperature](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.Temperature)

Specifies the response text randomness.

### Streaming Response

Enable the [UseStreaming](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.UseStreaming) property for a more responsive chat experience. This setting allows the AI client to send parts of the response once they become available, and the chat component will update the display message accordingly.

```
<DxAIChat UseStreaming="true" />
```

[Run Demo: AI Chat - Overview](https://demos.devexpress.com/blazor/AI/Chat#Overview)

### Rich Formatted Response

The AI service uses plain text as the default response format. To display rich formatted responses, set the [ResponseContentFormat](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.ResponseContentFormat) property to `Markdown` and use a markdown processor to convert response content to HTML code.

> [!important] Important
> Always sanitize HTML generated from Markdown to prevent cross-site scripting (XSS). Use a trusted sanitizer (for example, the [HtmlSanitizer](https://www.nuget.org/packages/HtmlSanitizer/) package) to allow only safe tags and attributes before the browser renders content.

```
@using Markdig
@using Ganss.Xss

<DxAIChat ResponseContentFormat="ResponseContentFormat.Markdown">
    <MessageContentTemplate>
        @ToHtml(context.Content)
    </MessageContentTemplate>
</DxAIChat>

@code {
    private readonly HtmlSanitizer sanitizer = new HtmlSanitizer();

    MarkupString ToHtml(string markdown) {
        string html = Markdown.ToHtml(markdown);
        // Sanitize the HTML to prevent XSS attacks
        html = sanitizer.Sanitize(html);
        return new MarkupString(html);
    }
}
```

![Rich formatter content in AI Chat](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-Markdown.png)

### File Attachments

`<DxAIChat>` allows users to attach files when sending messages to the chat. Set the [DxAIChat.FileUploadEnabled](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.FileUploadEnabled) property to `true` to enable file upload operations.

![AI Chat - File Attachments](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-file-attachments.png)

Once a user attaches files to a message, the AI Chat component validates attached files. To configure validation rules, declare a [DxAIChatFileUploadSettings](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatFileUploadSettings) object in [AIChatSettings](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.AIChatSettings) component markup. You can validate file [size](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatFileUploadSettings.MaxFileSize), [extension](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatFileUploadSettings.AllowedFileExtensions), and [type](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatFileUploadSettings.FileTypeFilter) as well as limit the [number of files](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatFileUploadSettings.MaxFileCount).

The following code snippet activates the file upload functionality in Blazor AI Chat and configures validation rules for uploaded files:

```
@using DevExpress.AIIntegration.Blazor.Chat

<DxAIChat CssClass="demo-chat"
          FileUploadEnabled="true">
    <AIChatSettings>
        <DxAIChatFileUploadSettings MaxFileCount="2"
                                    MaxFileSize="20000"
                                    AllowedFileExtensions="@(new List<string> { ".jpg", ".pdf" })"
                                    FileTypeFilter="@(new List<string> { "image/*", "application/pdf"})" />
    </AIChatSettings>
</DxAIChat>
```

You can also use the [AIChatUploadFileInfo](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.AIChatUploadFileInfo) class to send messages with file attachments in code (via the `SendMessage` method) or access and process uploaded files in a `MessageSent` event handler.

[Run Demo: AI Chat - File Attachments](https://demos.devexpress.com/blazor/AI/Chat#FileAttachments)

> [!note] Note
> The DevExpress Blazor AI Chat component only facilitates the file upload. It does not process or analyze the file’s content. The ability to interpret a specific file format depends entirely on the capabilities of the [connected AI model](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions).
> 
> See the [AIChatUploadFileInfo](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.AIChatUploadFileInfo#supported-file-types) class description for details.

### Customizable Message Appearance and Empty Message Area

The `DxAIChat` component includes the following message customization properties:

[MessageTemplate](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.MessageTemplate)

Changes the message bubble rendering, including paddings and inner content alignment.

[MessageContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.MessageContentTemplate)

Alters message bubble content without affecting layout.

[EmptyMessageAreaTemplate](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.EmptyMessageAreaTemplate)

Specifies the template used to display the message area if there are no message bubbles.

> [!important] Important
> Always sanitize HTML generated from Markdown to prevent cross-site scripting (XSS). Use a trusted sanitizer (for example, the [HtmlSanitizer](https://www.nuget.org/packages/HtmlSanitizer/) package) to allow only safe tags and attributes before the browser renders content.

- [Razor](#tabpanel_2VPt1B9Auc_tabid-razor)
- [CSS](#tabpanel_2VPt1B9Auc_tabid-css)

```
@using Markdig
@using Ganss.Xss

<DxAIChat CssClass="demo-chat"
          Initialized="ChatInitialized"
          ResponseContentFormat="ResponseContentFormat.Markdown">
        <MessageContentTemplate>
            <div class="demo-chat-content">
                @ToHtml(context.Content)
            </div>
        </MessageContentTemplate>
    </DxAIChat>
</div>

@code {
    private readonly HtmlSanitizer sanitizer = new HtmlSanitizer();

    MarkupString ToHtml(string markdown) {
        string html = Markdown.ToHtml(markdown);
        // Sanitize the HTML to prevent XSS attacks
        html = sanitizer.Sanitize(html);
        return new MarkupString(html);
    }

    void ChatInitialized(IAIChat chat) {
        chat.LoadMessages(new[] {
            new BlazorChatMessage(Microsoft.Extensions.AI.ChatRole.User, "Hello, AI!"),
            new BlazorChatMessage(Microsoft.Extensions.AI.ChatRole.Assistant, "Hey there, human! What's on your mind? 😊")
        });
    }
}
```

![AI chat with customized messages](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-MessageContentTemplate.png)

[Run Demo: AI Chat - Rich Formatted Response](https://demos.devexpress.com/blazor/AI/Chat#ContentTemplate)

### Manual Message Processing

When a user sends a message to the chat, the [MessageSent](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.MessageSent) event fires. Handle the event to manually process this action. You can use the [Content](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.MessageSentEventArgs.Content) event argument to access user input and call the [SendMessage(String, ChatRole, List<AIChatUploadFileInfo>)](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.SendMessage\(String--ChatRole--List-AIChatUploadFileInfo-\)) method to send another message to the chat.

```
<DxAIChat MessageSent="MessageSent" />

@code {
    async Task MessageSent(MessageSentEventArgs args) {
        await args.Chat.SendMessage($"Processed: {args.Content}", ChatRole.Assistant);
    }
}
```

[Run Demo: AI Chat - Manual Message Processing](https://demos.devexpress.com/blazor/AI/Chat#MessageHandling)

### Stop Message Generation

Our Blazor AI Chat component allows users to stop chat message generation before it is complete. You can also use the [CancellationToken](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.MessageSentEventArgs.CancellationToken) argument property in a [MessageSent](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.MessageSent) event handler to process cancellations in code.

[Run Demo: AI Chat - Overview](https://demos.devexpress.com/blazor/AI/Chat#Overview)

### Save and Load Messages

Use [SaveMessages](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.SaveMessages) and [LoadMessages](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.LoadMessages\(System.Collections.Generic.IEnumerable-DevExpress.AIIntegration.Blazor.Chat.BlazorChatMessage-\)) methods to manage chat history.

```
<DxAIChat Initialized="ChatInitialized" />

@code {
    void ChatInitialized(IAIChat chat) {
        chat.LoadMessages(new[] {
            new BlazorChatMessage(Microsoft.Extensions.AI.ChatRole.Assistant, "Hello, how can I help you?")
        });
    }
}
```

![Chat with a loaded message](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-loadMessages.png)

#### Add a System Prompt

DevExpress Blazor AI Chat allows you to create a system prompt that provides the AI model with initial role context and specific instructions. The following code snippet adds a system prompt to the chat using the [LoadMessages](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.LoadMessages\(System.Collections.Generic.IEnumerable-DevExpress.AIIntegration.Blazor.Chat.BlazorChatMessage-\)) method in the [DxAIChat.Initialized](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.Initialized) event handler:

```
<DxAIChat Initialized="ChatInitialized" />

@code {
    async Task ChatInitialized(IAIChat chat) {
        var prompt = @"
            You are a friendly hiking enthusiast who helps people discover fun hikes in their area.
            You introduce yourself when first saying hello.
            When helping people out, you always ask them for this information
            to inform the hiking recommendation you provide:

            1. The location where they would like to hike
            2. What hiking intensity they are looking for

            You will then provide three suggestions for nearby hikes that vary in length
            after you get that information. You will also share an interesting fact about
            local nature on the hikes when making a recommendation. At the end of your
            response, ask if there is anything else you can help with.
        ";
        chat.LoadMessages(new[] {
            new BlazorChatMessage(Microsoft.Extensions.AI.ChatRole.System, prompt),
        });
    }
}
```

### Prompt Suggestions

DevExpress Blazor AI Chat supports prompt suggestions – hints that guide users to possible actions. The component displays prompt suggestions (hint bubbles) when the chat area is empty.

![AI Chat - Prompt Suggestions](https://docs.devexpress.com/Blazor/images/aichat/blazor-aichat-prompt-suggestions.png)

Follow the steps below to enable and configure prompt suggestions:

1. Populate the component’s [PromptSuggestions](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.PromptSuggestions) property with [DxAIChatPromptSuggestion](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatPromptSuggestion) objects (hint bubbles).
2. Specify bubble content using [Title](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatPromptSuggestion.Title) and [Text](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatPromptSuggestion.Text) properties.
3. Use the [PromptMessage](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChatPromptSuggestion.PromptMessage) property to specify the text to be displayed in the input field after a user clicks the corresponding suggestion.

[Run Demo: AI Chat – Prompt Suggestions](https://demos.devexpress.com/blazor/AI/Chat#PromptSuggestions)

- [Data](#tabpanel_NCX+xvtRVI_tabid-csharp1)
- [Razor](#tabpanel_NCX+xvtRVI_tabid-razor1)

```csharp
public List<PromptSuggestion> GetData() {
    return new List<PromptSuggestion>() {
        new PromptSuggestion("Tell me a joke", "Take a break and enjoy a quick laugh", "Tell me a joke."),
        new PromptSuggestion("Summarize text", "Extract a quick summary (main ideas)", "Summarize the following text:"),
        new PromptSuggestion("Write an email", "Make your text look and sound professional", "Format text as a formal email to a client:"),
        new PromptSuggestion("Brainstorm ideas", "Get creative input for your tasks", "Help me brainstorm ideas for:"),
        new PromptSuggestion("Fix my writing", "Avoid spelling, grammar, and style errors", "Proofread the following text:"),
    };
}
public class PromptSuggestion {
    public string Title { get; set; }
    public string Text { get; set; }
    public string PromptMessage { get; set; }
    public PromptSuggestion (string title, string text, string promptMessage) {
        Title = title;
        Text = text;
        PromptMessage = promptMessage;
    }
}
```

Additionally, you can use the [PromptSuggestionContentTemplate](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.PromptSuggestionContentTemplate) property to specify a template for prompt suggestions.

### AI Service Assistants

The DevExpress AI Chat component supports [OpenAI Assistants](https://platform.openai.com/docs/assistants/overview). You can use a single OpenAI Assistant instance to initiate multiple tasks within a single application. To connect the chat to an existing assistant, pass the asisstant and thread IDs to the [SetupAssistantAsync(String, String)](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.IAIChat.SetupAssistantAsync\(System.String-System.String\)) method as parameters.

> [!note] Note
> Availability of Azure Open AI Assistants depends on the region. Refer to the following article for more details: [Assistants (Preview)](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#assistants-preview).

The following code snippet creates an OpenAI Assistant, obtains the assistant and thread IDs, and connects the Blazor AI Chat to the assistant in a [DxAIChat.Initialized](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat.Initialized) event handler:

- [Program.cs](#tabpanel_cOnnPJAksX_tabid-programcs)
- [AIAssistantCreator.cs](#tabpanel_cOnnPJAksX_tabid-creator)
- [Chat-Assistant.razor](#tabpanel_cOnnPJAksX_tabid-assistant)

```
@using DevExpress.AIIntegration.OpenAI.Services
@using DevExpress.AIIntegration.Blazor.Chat
@using AIIntegration.Services.Chat
@using Markdig
@using Ganss.Xss

@inject ReportingApp.AIAssistantCreator assistantCreator

<DxAIChat CssClass="my-chat" 
        Initialized="Initialized" 
        ResponseContentFormat="ResponseContentFormat.Markdown">
    <MessageContentTemplate>
        <div class="my-chat-content">
            @ToHtml(context.Content)
        </div>
    </MessageContentTemplate>
</DxAIChat>

@code {
    private readonly HtmlSanitizer sanitizer = new HtmlSanitizer();

    const string DocumentResourceName = "DevExpress.AI.Samples.Blazor.Data.Restaurant Menu.pdf";
    const string prompt = "You are an analytics assistant specialized in analyzing PDF files. Your role is to assist users by providing accurate answers to their questions about data contained within these files.\n \n### Tasks:\n- Perform various types of data analyses, including summaries, calculations, data filtering, and trend identification.\n- Clearly explain your analysis process to ensure users understand how you arrived at your answers.\n- Always provide precise and accurate information based on the Excel data.\n- If you cannot find an answer based on the provided data, explicitly state: \"The requested information cannot be found in the data provided.\"\n \n### Examples:\n1. **Summarization:**\n   - **User Question:** \"What is the average sales revenue for Q1?\"\n   - **Response:** \"The average sales revenue for Q1 is calculated as $45,000, based on the data in Sheet1, Column C.\"\n \n2. **Data Filtering:**\n   - **User Question:** \"Which products had sales over $10,000 in June?\"\n   - **Response:** \"The products with sales over $10,000 in June are listed in Sheet2, Column D, and they include Product A, Product B, and Product C.\"\n \n3. **Insufficient Data:**\n   - **User Question:** \"What is the market trend for Product Z over the past 5 years?\"\n   - **Response:** \"The requested information cannot be found in the data provided, as the dataset only includes data for the current year.\"\n \n### Additional Instructions:\n- Format your responses to clearly indicate which sheet and column the data was extracted from when necessary.\n- Avoid providing any answers if the data in the file is insufficient for a reliable response.\n- Ask clarifying questions if the user's query is ambiguous or lacks detail.\n \nRemember, your primary goal is to provide helpful, data-driven insights that directly answer the user's questions. Do not assume or infer information not present in the dataset.";

    async Task Initialized(IAIChat chat) {
        (string assistantId, string threadId) = await assistantCreator.CreateAssistantAsync(
            Assembly.GetExecutingAssembly().GetManifestResourceStream(DocumentResourceName)!,
            $"{Guid.NewGuid().ToString("N")}.pdf",
            prompt);

        await chat.SetupAssistantAsync(assistantId, threadId);
    }

    MarkupString ToHtml(string markdown) {
        string html = Markdown.ToHtml(markdown);
        // Sanitize the HTML to prevent XSS attacks
        html = sanitizer.Sanitize(html);
        return new MarkupString(html);
    }
}
```

[View Example: AI Chat for Blazor - How to add DxAIChat component in Blazor, MAUI, WPF, and WinForms applications](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples)

### AI Tool Calling

The DevExpress AI Chat component enables the integration of Blazor application logic with natural language input. It can invoke methods annotated with metadata (called *AI tools*) to execute any action in the UI or business logic. Each tool describes its purpose, input parameters, and (optionally) the target object on which it operates.

The AI service automatically resolves a relevant function at runtime based on chat context. The selection depends on the capabilities of the configured `IChatClient` and the model. If the model does not support tool calling or if no function is considered relevant, a normal text response is generated.

We have added an AI tool calling layer that extends capabilities found in Microsoft.Extensions.AI:

**Target-aware tools**

Tools can operate on specific object instances (UI controls, pages, data services, business objects). The API automatically resolves target objects at runtime based on context and descriptions.

**Flexible tool contexts**

Tools can be grouped into contexts that can be enabled, disabled, or removed dynamically based on application state or user workflow.

**Seamless integration with the AI Chat Control**

The DevExpress Blazor AI Chat Control discovers and merges tools from all registered contexts and manages tool selection, target resolution, parameter binding, and invocation.

The following code snippet registers DevExpress AI services, defines a contextual AI tool, and integrates an AI tool calling pipeline into an application:

- [AI Tools](#tabpanel_2VPt1B9Auc-1_tabid-tool-functions)
- [Program.cs](#tabpanel_2VPt1B9Auc-1_tabid-tool-integration)
- [Razor](#tabpanel_2VPt1B9Auc-1_tabid-tool-razor)

```
@using DevExpress.AIIntegration.Blazor.Chat
@using DevExpress.AIIntegration.Tools
@inject AIToolsContextContainer container

<DxAIChat />
<DxGrid @ref="grid">
    <!-- ... -->
</DxGrid>

@code {
    DxGrid grid;
    AIToolsContext context;

    protected override void OnAfterRender(bool firstRender) {
        if (firstRender) {
            context = new AIToolsContextBuilder()
                .WithToolMethods(ExpandGroups)
                .Build();
            container.Add(context);
        }
    }
}
```