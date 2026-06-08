---
title: Installation
order: 0005
category: 10|Get Started
route: /installation
icon: SettingsCogMultiple
---

# Installation
Getting started with **Fluent UI Blazor** for faster and easier .NET web development.

## Online Playground

TODO

## Using Templates

TODO

## Manual Installation

If you already have a Blazor project (either from a default template or an existing application),
follow these steps to integrate **Fluent UI Blazor**.

### 1. Install the NuGet Package

Use the NuGet Package Manager or run the following command in your terminal:

```bash
dotnet add package Microsoft.FluentUI.AspNetCore.Components --prerelease
```

```bash
dotnet add package Microsoft.FluentUI.AspNetCore.Components.Icons
```

**Note** With the pre-release version, make sure you don't have the configuration `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` in your csproj file.

> [!NOTE] If you'd like to take advantage of the daily updates, please follow [these steps](https://github.com/microsoft/fluentui-blazor/blob/dev-v5/docs/using-latest-daily.md).
> Be aware, however, that this is at your own risk: daily builds may introduce new bugs or breaking changes while you are working.

### 2. Add Imports

In your `_Imports.razor` file, include:

```razor
@using Microsoft.FluentUI.AspNetCore.Components
@using Icons = Microsoft.FluentUI.AspNetCore.Components.Icons
```

### 3. Add References to Styles

In your main HTML file (e.g., `index.html`, `_Layout.cshtml`, `_Host.cshtml`, or `App.razor`, depending on your Blazor hosting model), add the following:

Either uncomment the link to your default stylesheet `styles.css` (or `site.css`).
Or add this link the **Fluent UI Blazor** stylesheet.

```html
<link href="_content/Microsoft.FluentUI.AspNetCore.Components/Microsoft.FluentUI.AspNetCore.Components.bundle.scp.css" rel="stylesheet" />
```

### 4. Remove Unused References (Optional)

If you're replacing **Bootstrap** or other UI frameworks:

In the same file as above, remove **Bootstrap** references from your main HTML file.
Delete the `wwwroot/css/bootstrap` and `open-iconic` folders if not needed.
Optionally clean up `styles.css`.

### 5. Register Fluent UI Services

In your `Program.cs`, register the **Fluent UI** services:

```csharp
// Register Fluent UI services
builder.Services.AddFluentUIComponents();
```

### 6. Add Required Components to Layout

In `MainLayout.razor` or your main layout component, add this component **at the end of your page**:

```razor
@* Add all FluentUI Blazor Providers *@
<FluentProviders />
```

The `FluentProviders` enable all providers: dialogs, tooltips, message bars, ...

### 7. Verify Render Mode

**Fluent UI Blazor** requires interactive rendering.
Ensure your app is not using static rendering, especially if components like menus or dialogs are not appearing.

[Learn about render modes](https://learn.microsoft.com/aspnet/core/blazor/components/render-modes).

### 8. Test the installation

Add this code to a Razor page to verify that the installation is correct.

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

> You can apply a rendering mode globally to all routes by adding a similar command in the `Routes.razor` file:
> `@rendermode @(new InteractiveServerRenderMode(prerender: false))`
> (here is an example: update this line according to your project type).

### 9. Learn More

Before diving into components, it's recommended to explore
the [FluentLayout](/layout) documentation to understand project structure and layout strategies.

On [this FluentLayout section](/layout#standard-layout-header-navigation-and-footer), you will find an example of a ready-to-use layout.
