---
title: "DevExpress AI-powered Extensions for Blazor | Blazor"
source: "https://docs.devexpress.com/Blazor/405228/ai-powered-extensions"
author:
published: 2001-03-18
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DevExpress AI-powered Extensions for Blazor

In This Article

Use the following links for details on how to add AI-powered functionality to DevExpress Blazor components:

- [AI Chat Component](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat)
- [AI-powered Document Editing for HTML Editor](https://docs.devexpress.com/Blazor/405187/components/html-editor/ai-integration)
- [AI-powered Document Editing for Rich Text Editor](https://docs.devexpress.com/Blazor/405193/components/rich-edit/ai-integration)
- [AI-powered Smart Autocomplete for Memo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo#ai-powered-smart-autocomplete)
- [AI-powered Report Viewer and Report Designer](https://docs.devexpress.com/XtraReports/405211/ai-powered-functionality/ai-for-devexpress-reporting#reporting-for-web)

## How it Works

DevExpress AI APIs leverage the [Microsoft.Extensions.AI](https://learn.microsoft.com/en-us/dotnet/ai/microsoft-extensions-ai) libraries for integration and interoperability with a wide range of AI services. These libraries establish a unified C# abstraction layer for standardized interaction with language models.

This architecture decouples your application code from specific AI SDKs. You can seamlessly switch the underlying AI model or provider with minimal code modifications. For example, you can build a prototype with a locally deployed AI model and then quickly transition to an enterprise-grade online LLM provider. These changes only involve adjustments to the app’s startup logic and the installation of necessary NuGet packages.

The [IChatClient](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient) interface serves as the central mechanism for language models interaction. Currently, supported AI providers include:

- [OpenAI](https://openai.com/) (through Microsoft’s reference implementation)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) (through Microsoft’s reference implementation)
- Self-hosted [Ollama](https://ollama.com/) (through the [OllamaSharp](https://www.nuget.org/packages/OllamaSharp/) library)
- [Google Gemini](https://gemini.google.com/), [DeepSeek](https://www.deepseek.com/), [Claude](https://www.anthropic.com/), and other major AI services through [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/) AI Connectors
- Custom `IChatClient` [implementation](https://learn.microsoft.com/en-us/dotnet/ai/ichatclient#custom-ichatclient-middleware) for unsupported providers or private language models.

The Microsoft.Extensions.AI framework allows developers to integrate support for AI language models and services without modifying the core library. This means you can leverage third-party libraries for new AI providers or create your own custom implementation for in-house language models.

> [!note] Note
> DevExpress AI-powered extensions operate on a “bring your own key” (BYOK) model. We do not provide a proprietary REST API or bundled language models (LLMs/SLMs).
> 
> You can either deploy a self-hosted model or connect to a cloud AI provider and obtain necessary connection parameters (endpoint, API key, language model identifier, and so on). These parameters must be **configured** at application startup to register an AI client and enable extension functionality.

## Prerequisites

- .NET 8 SDK or above
- AI language model (choose one of the following):
	- **OpenAI Service**
		- Create an [OpenAI account](https://platform.openai.com/signup)
				- Create a [secret key](https://platform.openai.com/api-keys) to access the OpenAI API
				- Subscribe for OpenAI API
		- **Azure OpenAI Service**
		- Create an [Azure account](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=ai-services)
				- [Create and deploy](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource) an Azure OpenAI resource
				- Get Azure OpenAI key and endpoint
		- **Ollama** (self-hosted models)
		- [Download](https://ollama.com/download) and install Ollama
				- Pull a model from the [Ollama library](https://ollama.com/search)
				- Run the downloaded model with `ollama run <model_name>` command
		- **Foundry Local** (self-hosted models)
		- Explore the [Foundry Local model catalog](https://www.foundrylocal.ai/models) and select a model alias (ID) that meets your requirements.  
			The Foundry Local SDK is self-contained and handles model download and execution independently. No separate downloads or installation is required.
		- **ONNX Runtime** (self-hosted models)
		- Get an ONNX model:
			- Download ONNX model files from [Hugging Face](https://huggingface.co/models?library=onnx) or [ONNX Model Zoo](https://github.com/onnx/models).  
				Use the [Hugging Face CLI](https://huggingface.co/docs/huggingface_hub/en/guides/cli) to download models.
						- Convert existing TensorFlow or PyTorch models to ONNX with [tf2onnx](https://github.com/onnx/tensorflow-onnx) or the [PyTorch ONNX export](https://docs.pytorch.org/docs/stable/onnx.html). For Transformer models, see [Hugging Face Optimum — ONNX Runtime](https://huggingface.co/docs/optimum-onnx/onnx/usage_guides/export_a_model).
		- **Semantic Kernel**
		- Search for the available [AI connector](https://www.nuget.org/packages?q=Microsoft.SemanticKernel.Connectors) or implement your [custom connector](https://devblogs.microsoft.com/agent-framework/understanding-semantic-kernel-ai-connectors/)
				- Subscribe to the desired AI service if needed

## AI Project Templates

The [DevExpress Template Kit](https://docs.devexpress.com/Blazor/405308/get-started/template-kit) is the fastest way to register AI services in a DevExpress Blazor project:

1. Create an [ASP.NET Core Blazor Application](https://docs.devexpress.com/Blazor/405308/get-started/template-kit#common).
2. Select an AI provider (Azure OpenAI, OpenAI, or Ollama) from the **Add AI Resources** list. The Template Kit automatically installs the necessary NuGet packages and adds the corresponding AI resources to your project.
3. Specify your API key, endpoint, and model/deployment in the project’s *appsettings.json* file.
4. *Optional.* Select the **AI Chat** view to add a sample page featuring the [AI chat](https://docs.devexpress.com/Blazor/405290/components/ai-chat) component powered by your selected AI service.

## Manual AI Services Integration

Follow the instructions below to register an AI model and enable DevExpress AI-powered Extensions in your application.

> [!important] Important
> Never hardcode AI provider access keys, credentials, or API endpoints directly in your source code. Refer to the following help topic for additional information: [Secret Management for Blazor AI Components](https://docs.devexpress.com/Blazor/405749/security-considerations/ai-secret-management).

### OpenAI

1. Install the following NuGet packages to your project:
	- [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor)
		- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [Microsoft.Extensions.AI.OpenAI](https://www.nuget.org/packages/Microsoft.Extensions.AI.OpenAI/) (version **9.7.1-preview.1.25365.4** or later)
2. Register the OpenAI model in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO_tabid-cs)
	```csharp
	using Azure.AI.OpenAI;
	using Microsoft.Extensions.AI;
	using OpenAI;
	/* ... */
	string openAiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
	    ?? throw new InvalidOperationException("OPENAI_API_KEY environment variable is not set.");
	string openAiModel = "OPENAI_MODEL";
	OpenAIClient openAIClient = new OpenAIClient(openAiApiKey);
	IChatClient openAiChatClient = openAIClient.GetChatClient(openAiModel).AsIChatClient();
	builder.Services.AddChatClient(openAiChatClient);
	```
	- Create an environment variable named `OPENAI_API_KEY` and set its value to your OpenAI API key. If your application throws an exception that the variable is not found, restart your IDE or terminal to ensure they load the new variable.
		- Set the `openAiModel` variable to the OpenAI [model](https://platform.openai.com/docs/models) ID.
3. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-1_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

### Azure OpenAI

1. Install the following NuGet packages to your project:
	- [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor)
		- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [Microsoft.Extensions.AI.OpenAI](https://www.nuget.org/packages/Microsoft.Extensions.AI.OpenAI/) (version **9.7.1-preview.1.25365.4** or later)
		- [Azure.AI.OpenAI](https://www.nuget.org/packages/Azure.AI.OpenAI) (version **2.2.0-beta.5** or later)
2. Register the Azure OpenAI model in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-2_tabid-cs)
	```csharp
	using Azure.AI.OpenAI;
	using Microsoft.Extensions.AI;
	using System.ClientModel;
	/* ... */
	string azureOpenAiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY")
	    ?? throw new InvalidOperationException("AZURE_OPENAI_KEY environment variable is not set.");
	string azureOpenAiEndpoint = "AZURE_OPENAI_ENDPOINT";
	string azureOpenAiModel = "AZURE_OPENAI_MODEL";
	AzureOpenAIClient azureOpenAIClient = new AzureOpenAIClient(
	     new Uri(azureOpenAiEndpoint),
	     new ApiKeyCredential(azureOpenAiKey)
	);
	IChatClient azureOpenAiChatClient = azureOpenAIClient.GetChatClient(azureOpenAiModel).AsIChatClient();
	builder.Services.AddChatClient(azureOpenAiChatClient);
	```
	- Create an environment variable named `AZURE_OPENAI_KEY` and set its value to your Azure OpenAI key. If your application throws an exception that the variable is not found, restart your IDE or terminal to ensure they load the new variable.
		- Set the `azureOpenAiEndpoint` variable to your Azure OpenAI endpoint.
		- Set the `azureOpenAiModel` variable to the Azure OpenAI [model](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models) ID.
3. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-3_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

### Ollama

1. Install the following NuGet packages to your project:
	- [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor)
		- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [OllamaSharp](https://www.nuget.org/packages/OllamaSharp)
2. Register the self-hosted AI model in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-4_tabid-cs)
	```csharp
	using Microsoft.Extensions.AI;
	using OllamaSharp;
	/* ... */
	string aiModel = "MODEL_NAME";
	IChatClient chatClient = new OllamaApiClient("http://localhost:11434", aiModel);
	builder.Services.AddChatClient(chatClient);
	```
	Set the `aiModel` variable to the name of your Ollama model.
3. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-5_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

### Foundry Local

> [!note] Note
> Foundry Local is available as a public preview. Features, approaches, and processes can change or have limited capabilities before General Availability (GA).

1. Select a target platform for your app. There are two NuGet packages for the Foundry Local SDK - a [Windows-specific](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview) and a cross-platform package. These packages have the same API surface but are optimized for different platforms.
	- Windows 10 (x64), Windows 11, and Windows Server 2025
		1. Change your project configuration (IDE settings or `.csproj` file):
			- Set the target OS to *Windows*.
						- Set the target OS version to *10.0.26100.0* or later.
				2. Install [Microsoft.AI.Foundry.Local.WinML](https://www.nuget.org/packages/Microsoft.AI.Foundry.Local) NuGet package (version **0.8.2.1** or later).
		- Cross-platform (Windows, Linux, macOS)
		1. Install [Microsoft.AI.Foundry.Local](https://www.nuget.org/packages/Microsoft.AI.Foundry.Local.WinML) NuGet package (version **0.8.2.1** or later).
2. Install the following NuGet packages to your project:
	- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [Microsoft.Extensions.AI.OpenAI](https://www.nuget.org/packages/Microsoft.Extensions.AI.OpenAI/) (version **9.7.1-preview.1.25365.4** or later)
		- [OpenAI](https://www.nuget.org/packages/OpenAI/) (version **2.2.0** or later)
3. Add a method that registers a Foundry Local client in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-6_tabid-cs)
	```csharp
	using Microsoft.AI.Foundry.Local;
	using Microsoft.Extensions.AI;
	using OpenAI;
	using System.ClientModel;
	/* ... */
	static async Task<IChatClient> RegisterFoundryLocalClient(string modelAlias, ILoggerFactory loggerFactory) {
	    // Create a named logger
	    var logger = loggerFactory.CreateLogger("FoundryLocal");
	    // Configure Foundry Local service
	    var foundryLocalConfiguration = new Configuration {
	        AppName = "BlazorAIApp",
	        LogLevel = Microsoft.AI.Foundry.Local.LogLevel.Information,
	        Web = new Configuration.WebService() {
	            Urls = "http://127.0.0.1:52495"
	        }
	    };
	    // Initialize Foundry Local Manager
	    await FoundryLocalManager.CreateAsync(foundryLocalConfiguration, logger, null);
	    var manager = FoundryLocalManager.Instance;
	    // Get the model catalog
	    var catalog = await manager.GetCatalogAsync();
	    // Get the specified model
	    var model = await catalog.GetModelAsync(modelAlias) ?? throw new Exception($"Model {modelAlias} not found");
	    // Download the model if not cached
	    if(!await model.IsCachedAsync()) {
	        await model.DownloadAsync();
	    }
	    // Load the model
	    await model.LoadAsync();
	    // Start the Foundry Local web service
	    await manager.StartWebServiceAsync();
	    // Create an OpenAI client pointing to the Foundry Local web service
	    OpenAIClient client = new OpenAIClient(new ApiKeyCredential("none"), new OpenAIClientOptions {
	        Endpoint = new Uri(foundryLocalConfiguration.Web.Urls + "/v1"),
	    });
	    return client.GetChatClient(model.Id).AsIChatClient();
	}
	```
4. Add a cleanup service that unloads the model and releases resources during application shutdown. Without a cleanup service, the Foundry model can remain loaded and the local web service can continue running.
	- [Program.cs](#tabpanel_87RxQMxtOO-7_tabid-cs)
	```csharp
	public class FoundryLocalCleanupService : IHostedService
	{
	    public Task StartAsync(CancellationToken cancellationToken) => Task.CompletedTask;
	    public async Task StopAsync(CancellationToken cancellationToken) {
	        var manager = FoundryLocalManager.Instance;
	        var catalog = await manager.GetCatalogAsync();
	        var model = await catalog.GetModelAsync("phi-4-mini");
	        if(model != null) await model.UnloadAsync();
	    }
	}
	```
5. Register the Foundry Local AI model and a cleanup service in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-8_tabid-cs)
	```csharp
	// Create a LoggerFactory and configure console logging
	using var loggerFactory = LoggerFactory.Create(builder => {
	    builder
	        .SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Information)
	        .AddSimpleConsole(options => {
	            options.SingleLine = true;
	            options.TimestampFormat = "HH:mm:ss ";
	        });
	});
	// Register a Foundry Local client with Microsoft Phi-4 model
	string modelName = "phi-4-mini";
	IChatClient chatClient = await RegisterFoundryLocalClient(modelName, loggerFactory);
	builder.Services.AddSingleton(chatClient);
	// Register the cleanup service
	builder.Services.AddHostedService<FoundryLocalCleanupService>();
	```
6. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-9_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

#### First Run

On the first run, Foundry Local SDK detects your machine’s capabilities and selects the model optimized for your hardware. If the selected model is not available locally, the SDK contacts the Microsoft AI Foundry registry and downloads the model weights (for Phi-4-mini, typically 2–4 GB). The SDK stores the downloaded model in a local cache. Subsequent runs load the model from cache without re-downloading.

Because the first run requires downloading several gigabytes, your Blazor app can take longer to start. To reduce startup delays, use the [Foundry Local command-line interface (CLI)](https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-local/reference/reference-cli?view=foundry-classic) to download the selected model in advance.

### ONNX Runtime

1. Install the following NuGet packages to your project:
	- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [Microsoft.ML.OnnxRuntimeGenAI](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI)  
		You can use one of the following optimized libraries depending on your hardware:
		- [Microsoft.ML.OnnxRuntimeGenAI.DirectML](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI.DirectML): Windows GPU acceleration via [DirectML](https://learn.microsoft.com/en-us/windows/ai/directml/dml) (AMD, NVIDIA, Intel)
				- [Microsoft.ML.OnnxRuntimeGenAI.Cuda](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI.Cuda): NVIDIA GPU acceleration via [CUDA](https://developer.nvidia.com/cuda)
				- [Microsoft.ML.OnnxRuntimeGenAI.WinML](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI.WinML): [Windows ML](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview) execution provider
				- [Microsoft.ML.OnnxRuntimeGenAI.QNN](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI.QNN): [Qualcomm NPU](https://www.qualcomm.com/processors/ai-engine) acceleration (Snapdragon)
				- [Microsoft.ML.OnnxRuntimeGenAI.Foundry](https://www.nuget.org/packages/Microsoft.ML.OnnxRuntimeGenAI.Foundry): On-device acceleration with [Microsoft Foundry Local](https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-local/get-started?view=foundry-classic)
2. Register the self-hosted AI model in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-10_tabid-cs)
	```csharp
	using Microsoft.Extensions.AI;
	using Microsoft.ML.OnnxRuntimeGenAI;
	/* ... */
	string modelPath = @"C:\Models\phi-4-mini";
	var config = new Config(modelPath);
	var onnxChatClient = new OnnxRuntimeGenAIChatClient(new Model(config));
	IChatClient chatClient = onnxChatClient.AsBuilder().ConfigureOptions(
	    x => x.MaxOutputTokens = 4096
	).Build();
	builder.Services.AddSingleton(chatClient);
	```
3. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-11_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

### Semantic Kernel

The Semantic Kernel SDK provides a common interface to interact with different [AI services](https://learn.microsoft.com/en-us/semantic-kernel/concepts/ai-services/). The Kernel communicates with AI services through [AI Connectors](https://devblogs.microsoft.com/agent-framework/understanding-semantic-kernel-ai-connectors/), which expose multiple AI service types from different providers.

Semantic Kernel works with an ecosystem of [ready-to-use connectors](https://www.nuget.org/packages?q=Microsoft.SemanticKernel.Connectors) which support leading AI models from OpenAI, Google, Anthropic, DeepSeek, Mistral AI, Hugging Face, and more. You can also build custom connectors for any other service, such as your in-house language models.

The following example connects DevExpress AI-powered Extensions for Blazor to [Google Gemini](https://gemini.google.com/) through the Semantic Kernel SDK:

> [!note] Note
> The Google chat completion connector is currently experimental. To acknowledge this and use the feature, you must explicitly suppress the compiler warnings with the `#pragma warning disable` directive.

1. Sign in to [Google AI Studio](https://aistudio.google.com/welcome).
2. Create an [API key](https://aistudio.google.com/welcomeapikey).
3. Install the following NuGet packages to your project:
	- [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor)
		- [DevExpress.AIIntegration.Blazor](https://nuget.devexpress.com/packages/DevExpress.AIIntegration.Blazor)
		- [Microsoft.Extensions.AI](https://www.nuget.org/packages/Microsoft.Extensions.AI) (version **9.7.1** or later)
		- [Microsoft.SemanticKernel](https://www.nuget.org/packages/Microsoft.SemanticKernel)
		- [Microsoft.SemanticKernel.Connectors.Google](https://www.nuget.org/packages/Microsoft.SemanticKernel.Connectors.Google/)
4. Register the Gemini model in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-12_tabid-cs)
	```csharp
	using Microsoft.Extensions.AI;
	using Microsoft.SemanticKernel;
	using Microsoft.SemanticKernel.ChatCompletion;
	/* ... */
	string geminiApiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
	    ?? throw new InvalidOperationException("GEMINI_API_KEY environment variable is not set.");
	string geminiAiModel = "GEMINI_MODEL";
	#pragma warning disable SKEXP0070
	var kernelBuilder = Kernel
	    .CreateBuilder()
	    .AddGoogleAIGeminiChatCompletion(geminiAiModel, geminiApiKey);
	Kernel kernel = kernelBuilder.Build();
	#pragma warning disable SKEXP0001
	IChatClient geminiChatClient = kernel.GetRequiredService<IChatCompletionService>().AsChatClient();
	builder.Services.AddChatClient(geminiChatClient);
	```
	- Create an environment variable named `GEMINI_API_KEY` and set its value to your Gemini API key. If your application throws an exception that the variable is not found, restart your IDE or terminal to ensure they load the new variable.
		- Set the `geminiAiModel` variable to the Gemini [model](https://ai.google.dev/gemini-api/docs/models) ID.
5. Register DevExpress Blazor services and DevExpress AI-powered extensions in the project’s entry point class:
	- [Program.cs](#tabpanel_87RxQMxtOO-13_tabid-cs)
	```csharp
	builder.Services.AddDevExpressBlazor();
	builder.Services.AddDevExpressAI();
	```

## Configure Inference Parameters

To control the AI model’s behavior and creativity, set inference parameters using `IChatClient` [options](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.chatoptions). These parameters are configured once when you register the `IChatClient` service in the project’s entry point class. The settings then apply to all DevExpress AI-powered features, ensuring a consistent tone and style across your app.

The following code snippet configures an Azure OpenAI client that is moderately creative, avoids repeating itself, and produces reasonably detailed but not excessively long responses:

- [Program.cs](#tabpanel_87RxQMxtOO-14_tabid-cs)

```csharp
AzureOpenAIClient azureOpenAIClient = new AzureOpenAIClient(
        new Uri(azureOpenAiEndpoint),
        new ApiKeyCredential(azureOpenAiKey)
);
IChatClient azureOpenAIChatClient = azureOpenAIClient.GetChatClient(azureOpenAiModel).AsIChatClient();
IChatClient chatClient = new ChatClientBuilder(azureOpenAIChatClient)
    .ConfigureOptions(options => {
        options.Temperature = 0.7f;
        options.MaxOutputTokens = 1200;
        options.PresencePenalty = 0.5f;
    })
    .Build();
builder.Services.AddChatClient(chatClient);
```

> [!note] Note
> A specific `IChatClient` implementation might have its own internal representation of options. It may use a subset of options or ignore the provided options entirely.

## Verify AI Service Connectivity

To verify connectivity with the configured AI service, add the [DxAIChat](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Chat.DxAIChat) component into your application.

```
@using DevExpress.AIIntegration.Blazor.Chat
@page "/"
@rendermode InteractiveServer

<PageTitle>DevExpress Blazor AI Chat</PageTitle>

<DxAIChat />
```

Send a test prompt and confirm a response is received.

![AI Chat Demo](https://docs.devexpress.com/Blazor/images/blazor-ai-extensions-demo.png)

## Examples

See the following examples for different ways to use AI features in Blazor apps:

- [Blazor AI Chat — Add the DevExpress Blazor AI Chat component to your next Blazor, MAUI, WPF, and WinForms application](https://github.com/DevExpress-Examples/devexpress-ai-chat-samples)
- [Blazor AI Chat — Multi-Model Chat with Conversation History](https://github.com/DevExpress-Examples/blazor-ai-chat-with-multiple-llm-services)
- [Blazor AI Chat — Implement function/tool calling](https://github.com/DevExpress-Examples/blazor-ai-chat-function-calling)
- [Blazor AI Chat — Request tool call confirmation from a user](https://github.com/DevExpress-Examples/blazor-ai-chat-confirm-tool-calls)
- [Blazor AI Chat — Communicate with Agents Using the Agent2Agent (A2A) Protocol](https://github.com/DevExpress-Examples/blazor-ai-chat-a2a-mode)
- [Blazor Rich Text Editor and HTML Editor - Integrate AI-powered extensions](https://github.com/DevExpress-Examples/blazor-ai-integration-to-text-editors)
- [Blazor Grid and Report Viewer — Incorporate an AI Assistant (Azure OpenAI) in your next DevExpress-powered Blazor app](https://github.com/DevExpress-Examples/blazor-grid-and-report-viewer-integrate-ai-assistant)
- [Blazor AI Chat — Grammar & Style Assistant powered by OpenAI services](https://github.com/DevExpress-Examples/blazor-ai-chat-spell-checker)
- [Integrate Blazor AI Chat with Model Context Protocol](https://github.com/DevExpress-Examples/blazor-ai-chat-mcp-resources)

## Troubleshooting

This section describes common AI integration issues and steps you can follow to diagnose and resolve these issues. If the solutions listed here do not help, [create a ticket](https://supportcenter.devexpress.com/ticket/create) in our Support Center and attach a [reproducible sample project](https://docs.devexpress.com/GeneralInformation/405286/support-services/create-reproducible-sample).

**The AI chat responds with an “ *Internal Server Error* “ message.**

- Verify that the model name, API key, endpoint, and other parameters are correct.
- For cloud AI providers, make sure you are online and that your firewall allows access to the provider’s endpoint.
- Confirm that the self-hosted language model service (for example, Ollama) is active and responsive.

**“ *Environment variable is not set* “ exception in Visual Studio.**

- If you store parameters in environment variables, confirm that all necessary environment variables are set.
- Restart Visual Studio to detect the newly created environment variable.

See Also