---
description: >-
  In this topic, we will create a separate ASP.NET Blazor Webassembly app and
  turn it into an Elsa Studio that connects to an Elsa Server.
---

# Elsa Studio

Elsa Studio is a Blazor application that let's you manage workflows through a UI. The application is essentially a SPA that connects to an Elsa Server as its back-end.

## Setup <a href="#setup" id="setup"></a>

To setup Elsa Studio, we'll go through the following steps:

{% hint style="warning" %}
**Deprecation warning**

The `blazorwasm-empty` template is [dicontinued since .NET 8.0](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates).\
If you are using .NET 8.0+, you can just use `blazorwasm` instead of `blazorwasm-empty`.&#x20;
{% endhint %}

1.  **Create a New Blazor Webassembly App**

    Execute the following command in the terminal:

    ```bash
    dotnet new blazorwasm -n "ElsaStudioBlazorWasm"
    ```

    \

2.  **Add Elsa Studio Packages**

    Navigate to the root directory of your project and integrate the following Elsa Studio packages:

    ```
    cd ElsaStudioBlazorWasm
    dotnet add package Elsa.Studio
    dotnet add package Elsa.Studio.Core.BlazorWasm
    dotnet add package Elsa.Studio.Login.BlazorWasm
    dotnet add package Elsa.Api.Client
    ```
3.  **Modify Program.cs**

    Open the `Program.cs` file and replace its existing content with the code provided below:

    **Program.cs**

    ```csharp
    using Elsa.Studio.Dashboard.Extensions;
    using Elsa.Studio.Shell;
    using Elsa.Studio.Shell.Extensions;
    using Elsa.Studio.Workflows.Extensions;
    using Elsa.Studio.Contracts;
    using Elsa.Studio.Models;
    using Elsa.Studio.Core.BlazorWasm.Extensions;
    using Elsa.Studio.Extensions;
    using Elsa.Studio.Login.BlazorWasm.Extensions;
    using Elsa.Studio.Login.HttpMessageHandlers;
    using Elsa.Studio.Workflows.Designer.Extensions;
    using Microsoft.AspNetCore.Components.Web;
    using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

    // Build the host.
    var builder = WebAssemblyHostBuilder.CreateDefault(args);
    var configuration = builder.Configuration;

    // Register root components.
    builder.RootComponents.Add<App>("#app");
    builder.RootComponents.Add<HeadOutlet>("head::after");
    builder.RootComponents.RegisterCustomElsaStudioElements();

    // Register shell services and modules.
    var backendApiConfig = new BackendApiConfig
    {
        ConfigureBackendOptions = options => builder.Configuration.GetSection("Backend").Bind(options),
        ConfigureHttpClientBuilder = options => options.AuthenticationHandler = typeof(AuthenticatingApiHttpMessageHandler)
    };

    builder.Services.AddCore();
    builder.Services.AddShell();
    builder.Services.AddRemoteBackend(backendApiConfig);
    builder.Services.AddLoginModule();
    builder.Services.UseElsaIdentity();
    builder.Services.AddDashboardModule();
    builder.Services.AddWorkflowsModule();


    // Build the application.
    var app = builder.Build();

    // Run each startup task.
    var startupTaskRunner = app.Services.GetRequiredService<IStartupTaskRunner>();
    await startupTaskRunner.RunStartupTasksAsync();

    // Run the application.
    await app.RunAsync();
    ```
4.  **Remove Unnecessary Files**

    For a cleaner project structure, delete the following directories and files:

    * wwwroot/css
    * Pages
    * App.razor
    * MainLayout.razor
    * MainLayout.razor.css
    * \_Imports.razor
5.  **Generate appsettings.json**

    Within the `wwwroot` directory, create a new `appsettings.json` file and populate it with the following content:

    wwwroot/appsettings.json

    ```json
    {
        "Backend": {
            "Url": "https://localhost:5001/elsa/api"
        }
    }
    ```
6.  **Update index.html**

    To conclude the setup, open the `index.html` file and replace its content with the code showcased below:

    **wwwroot/index.html**

    ```html
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <title>Elsa Studio</title>
        <base href="/"/>
        <link rel="apple-touch-icon" sizes="180x180" href="_content/Elsa.Studio.Shell/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="_content/Elsa.Studio.Shell/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="_content/Elsa.Studio.Shell/favicon-16x16.png">
        <link rel="manifest" href="_content/Elsa.Studio.Shell/site.webmanifest">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Grandstander:wght@100&display=swap" rel="stylesheet">
        <link href="_content/MudBlazor/MudBlazor.min.css" rel="stylesheet" />
        <link href="_content/CodeBeam.MudBlazor.Extensions/MudExtensions.min.css" rel="stylesheet" />
        <link href="_content/Radzen.Blazor/css/material-base.css" rel="stylesheet" >
        <link href="_content/Elsa.Studio.Shell/css/shell.css" rel="stylesheet">
        <link href="ElsaStudioBlazorWasm.styles.css" rel="stylesheet">
    </head>

    <body>
    <div id="app">
        <div class="loading-splash mud-container mud-container-maxwidth-false">
            <h5 class="mud-typography mud-typography-h5 mud-primary-text my-6">Loading...</h5>
        </div>
    </div>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>
    <script src="_content/BlazorMonaco/jsInterop.js"></script>
    <script src="_content/BlazorMonaco/lib/monaco-editor/min/vs/loader.js"></script>
    <script src="_content/BlazorMonaco/lib/monaco-editor/min/vs/editor/editor.main.js"></script>
    <script src="_content/MudBlazor/MudBlazor.min.js"></script>
    <script src="_content/CodeBeam.MudBlazor.Extensions/MudExtensions.min.js"></script>
    <script src="_content/Radzen.Blazor/Radzen.Blazor.js"></script>
    <script src="_framework/blazor.webassembly.js"></script>
    </body>

    </html>
    ```

## Launch the Application <a href="#run-application" id="run-application"></a>

To see your application in action, execute the following command:

```bash
dotnet run --urls https://localhost:6001
```

Your application is now accessible at [https://localhost:6001](https://localhost:6001/).

By default, you can log in using:

```
username: admin
password: password
```

## Source Code <a href="#source-code" id="source-code"></a>

The source code for this chapter can be found [here](https://github.com/elsa-workflows/elsa-guides/tree/main/src/installation/elsa-studio/ElsaStudioBlazorWasm)
