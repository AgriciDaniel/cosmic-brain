---
type: concept
title: "FluentUI Blazor Installation"
address: c-000123
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - installation
  - setup
  - dotnet
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor v5 Migration]]"
  - "[[FluentUI Blazor Theming]]"
  - "[[FluentUI Blazor Styles and Spacing]]"
  - "[[FluentUI Blazor MCP Server]]"
---

# FluentUI Blazor Installation

The **Fluent UI Blazor** library provides a robust and extensive set of [Blazor](https://blazor.net/) components. Some are wrappers around Microsoft's official Fluent UI Web Components; others leverage the [[Fluent 2 Design System]] or make it easier to work with Fluent in general.

This page covers the manual installation process for integrating **Microsoft.FluentUI.AspNetCore.Components** into an existing Blazor project.

> [!NOTE] The official Templates package is the recommended way to get started. See the [FluentUI Blazor Templates](https://www.fluentui-blazor.net/Templates) page for instructions and usage.

## Prerequisites

- An existing Blazor project (Server, WebAssembly, or Auto)
- .NET SDK (any supported version for Blazor)

## Step-by-Step Installation

### 1. Install the NuGet Package

Use the NuGet Package Manager or run the following command in your terminal:

```bash
dotnet add package Microsoft.FluentUI.AspNetCore.Components --prerelease
```

For icons, add the separate Icons package:

```bash
dotnet add package Microsoft.FluentUI.AspNetCore.Components.Icons
```

> [!WARNING] With pre-release versions, ensure you do not have `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` in your `.csproj` file, as pre-release packages may introduce new warnings.

> [!NOTE] If you would like to take advantage of daily updates, follow the [daily builds guide](https://github.com/microsoft/fluentui-blazor/blob/dev-v5/docs/using-latest-daily.md). Be aware this is at your own risk: daily builds may introduce bugs or breaking changes.

### 2. Add Imports

In your `_Imports.razor` file, include:

```razor
@using Microsoft.FluentUI.AspNetCore.Components
@using Icons = Microsoft.FluentUI.AspNetCore.Components.Icons
```

### 3. Add References to Styles

In your main HTML file (`index.html`, `_Layout.cshtml`, `_Host.cshtml`, or `App.razor`, depending on your Blazor hosting model), add the Fluent UI Blazor stylesheet:

```html
<link href="_content/Microsoft.FluentUI.AspNetCore.Components/Microsoft.FluentUI.AspNetCore.Components.bundle.scp.css" rel="stylesheet" />
```

Either uncomment the link to your default `styles.css` (or `site.css`), or replace it with the Fluent UI Blazor stylesheet above.

### 4. Remove Unused References (Optional)

If you are replacing Bootstrap or other UI frameworks, remove their stylesheet references from your main HTML file. Delete the `wwwroot/css/bootstrap` and `open-iconic` folders if not needed. Optionally clean up `styles.css`.

### 5. Register Fluent UI Services

In your `Program.cs`, register the Fluent UI services:

```csharp
// Register Fluent UI services
builder.Services.AddFluentUIComponents();
```

### 6. Add Required Providers to Layout

In `MainLayout.razor` or your main layout component, add this component **at the end of your page**:

```razor
@* Add all FluentUI Blazor Providers *@
<FluentProviders />
```

The `FluentProviders` component enables all providers: dialogs, tooltips, message bars, and other service-backed capabilities.

### 7. Verify Render Mode

**Fluent UI Blazor** requires interactive rendering. Ensure your app is not using static rendering, especially if components like menus or dialogs are not appearing.

Components inherit their render mode from their parent. Unless a render mode is specified on the app, page, or component level, every component (including ours) is statically rendered on the server and will not be interactive. For the Fluent UI Blazor library this means most components will display correctly but will not offer complete functionality.

You can apply a rendering mode globally to all routes by adding this to `Routes.razor`:

```razor
@rendermode @(new InteractiveServerRenderMode(prerender: false))
```

Learn more at the [ASP.NET Core Blazor render modes documentation](https://learn.microsoft.com/aspnet/core/blazor/components/render-modes).

### 8. Test the Installation

Add this code to a Razor page to verify the installation is correct:

```razor
@page "/counter"
@inject IDialogService DialogService

@* Apply an "interactive" render mode, or set the render mode globally for all routes *@
@rendermode InteractiveServer

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<FluentStack Orientation="Orientation.Vertical">
    <FluentButton Appearance="ButtonAppearance.Primary" OnClick="@IncrementCountAsync">
        Click me
    </FluentButton>
    <FluentLabel Margin="@Margin.Vertical4">
        Current count: @currentCount
    </FluentLabel>
</FluentStack>

@code {
    private int currentCount = 0;

    private async Task IncrementCountAsync()
    {
        currentCount++;
        await DialogService.ShowInfoAsync("Counter Incremented");
    }
}
```

### 9. Learn More

Before diving into components, it is recommended to explore the layout documentation to understand project structure and layout strategies. See the [FluentLayout section](https://www.fluentui-blazor.net/layout) for ready-to-use layout examples.

## NuGet Packages

| Package | Description |
|---------|-------------|
| `Microsoft.FluentUI.AspNetCore.Components` | Core component library |
| `Microsoft.FluentUI.AspNetCore.Components.Icons` | Icon library for Fluent UI Blazor |
| `Microsoft.FluentUI.AspNetCore.McpServer` | MCP server for AI-assisted development |

## Next Steps

- [[FluentUI Blazor Theming]] -- Configure light/dark themes and custom colors
- [[FluentUI Blazor Styles and Spacing]] -- Default styles, reboot, spacing utilities
- [[FluentUI Blazor MCP Server]] -- AI-powered component documentation in your IDE
