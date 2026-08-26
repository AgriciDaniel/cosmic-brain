---
type: concept
title: "FluentUI Blazor MCP Server"
address: c-000129
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - mcp
  - ai
  - copilot
  - developer-tools
  - ide
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Installation]]"
---

# FluentUI Blazor MCP Server

The **Fluent UI Blazor MCP Server** provides AI-powered assistance for building applications with Fluent UI Blazor components. Using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), this server integrates with AI coding assistants in Visual Studio and Visual Studio Code to provide real-time documentation, component details, and code suggestions.

## Overview

### What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI assistants to interact with external tools and data sources. By connecting your IDE to the Fluent UI Blazor MCP Server, you gain:

- **Component Discovery** -- Browse and search all 142+ available Fluent UI Blazor components
- **Live Documentation** -- Get detailed parameter, event, and method documentation
- **Enum Reference** -- Access all enum types and their values used by components
- **Code Assistance** -- Generate component code with AI-powered suggestions

### Architecture

The MCP server uses **pre-generated JSON documentation** to provide fast, dependency-free access to component information. No XML parsing at runtime; documentation is generated once at build time and served from static files.

The MCP Server exposes three types of capabilities:

1. **Tools** -- Functions that the AI model can call to query component information dynamically
2. **Resources** -- Static documentation content that provides context to the AI
3. **Prompts** -- Pre-defined prompt templates for common development tasks

## Installation

### Option 1: .NET Tool (Recommended)

Install the MCP server as a global .NET tool from NuGet.org:

```bash
dotnet tool install -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

Update to the latest version:

```bash
dotnet tool update -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

Uninstall:

```bash
dotnet tool uninstall -g Microsoft.FluentUI.AspNetCore.McpServer
```

### Option 2: Using dnx Script Tool

Use [dnx](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/sdk#the-new-dnx-tool-execution-script) to run the MCP server directly from NuGet.org without installing it globally:

```bash
dnx Microsoft.FluentUI.AspNetCore.McpServer
```

You can specify a specific version:

```bash
dnx Microsoft.FluentUI.AspNetCore.McpServer@5.0.0-rc.1-26049.2
```

### Requirements

| Requirement | Minimum Version |
|-------------|-----------------|
| .NET SDK | 9.0 |
| Visual Studio | 2026 18.1+ |
| VS Code | 1.85+ |
| GitHub Copilot | Latest |

## Configuration

### Visual Studio Code

Create `.vscode/mcp.json` in your workspace root:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp"
        }
    }
}
```

### Visual Studio 2026

Create `.mcp.json` in your solution root directory:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp"
        }
    }
}
```

### Using dnx (Alternative Configuration)

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "dnx",
            "args": [
                "Microsoft.FluentUI.AspNetCore.McpServer"
            ]
        }
    }
}
```

### Enabling Sandboxing (VS Code, macOS/Linux)

VS Code supports native sandboxing for stdio MCP servers. Because the Fluent UI Blazor MCP Server requires no file writes and no network access, you can use the most restrictive sandbox:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp",
            "sandboxEnabled": true
        }
    }
}
```

## Getting Started

### Step 1: Install the MCP Server

```bash
dotnet tool install -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

### Step 2: Create the Configuration File

Create the appropriate MCP configuration file for your IDE (see configuration examples above).

### Step 3: Enable Agent Mode

1. Open the **GitHub Copilot Chat** panel (`Ctrl+Shift+I`)
2. Switch to **Agent Mode** by clicking on the mode selector
3. The MCP Server tools will now be available to Copilot

### Step 4: Verify the Connection

Ask Copilot a question about Fluent UI Blazor:

```
List all available Fluent UI Blazor components
```

If configured correctly, Copilot will use the MCP tools to provide accurate component information.

## MCP Tools

MCP Tools are **model-controlled** functions that the AI assistant can call automatically to answer your questions.

### Available Tools

| Tool | Description |
|------|-------------|
| `ListComponents(category)` | Lists all components, optionally filtered by category |
| `SearchComponents(searchTerm)` | Searches components by name or description |
| `GetComponentDetails(componentName)` | Returns full parameter, event, and method documentation |
| `GetEnumValues(enumName)` | Returns all values for a specific enum |
| `GetComponentEnums(componentName)` | Lists all enums used by a specific component |
| `GetVersionInfo()` | Returns the MCP server version and expected PackageReference |
| `CheckProjectVersion(projectVersion)` | Validates compatibility between the MCP server docs and your project version |

### How Tools Work

1. **You ask a question** about Fluent UI Blazor
2. **The AI analyzes** your question and determines which tool(s) to call
3. **The MCP Server executes** the tool and returns results
4. **The AI formats** the response in a helpful way

### Tool Call Transparency

In both VS Code and Visual Studio, you can see which tools the AI is calling. Tool calls appear in the chat with expandable sections.

### Examples

```
User: "What components are available for forms?"
AI: [Calls ListComponents(category: "Input")]

User: "What parameters does FluentDataGrid accept?"
AI: [Calls GetComponentDetails(componentName: "DataGrid")]

User: "What are the possible button appearances?"
AI: [Calls GetEnumValues(enumName: "ButtonAppearance")]
```

## MCP Resources

MCP Resources are **user-controlled** content sources that provide context to the AI assistant. Unlike tools (which are called by the AI model), resources are explicitly selected by the user.

### Available Resources

The MCP server exposes resources via URIs like:

- `fluentui://components` -- Full component catalog
- `fluentui://component/{ComponentName}` -- Specific component documentation
- `fluentui://category/{CategoryName}` -- All components in a category
- `fluentui://enum/{EnumName}` -- Specific enum values

### Using Resources in VS Code

1. Open the Copilot Chat panel (`Ctrl+Shift+I`)
2. Click the **+** button to attach context
3. Select **MCP Resource**
4. Choose a resource like `fluentui://components`

### Resource Content Format

All resources return Markdown-formatted content (`text/markdown` MIME type). Example output for `fluentui://component/FluentButton`:

```markdown
# FluentButton

Represents a button component with various styles and behaviors.

**Category:** Buttons
**Base Class:** FluentComponentBase

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Appearance | ButtonAppearance | Primary | The visual appearance |
| Size | ButtonSize | Medium | The button size |
| Disabled | bool | false | Whether the button is disabled |

## Events

| Name | Type | Description |
|------|------|-------------|
| OnClick | EventCallback<MouseEventArgs> | Triggered when clicked |
```

### Resource vs Tool

| Aspect | Resources | Tools |
|--------|-----------|-------|
| Controlled by | User | AI model |
| When used | Explicitly attached | Automatically based on question |
| Best for | Providing context | Dynamic queries |

## MCP Prompts

The MCP server includes pre-defined prompt templates for common tasks. Suggested patterns include:

### Component Discovery
```
List all Fluent UI Blazor components in the [category] category
with their main purpose and key parameters.
```

### Component Implementation
```
Create a [component] with the following requirements:
- [requirement 1]
- [requirement 2]
Show me the complete Razor code with explanations.
```

### Custom Prompt Files

You can create your own prompt templates in a `.prompts/` directory:

```
your-project/
├── .prompts/
│   ├── fluent-datagrid.md
│   ├── fluent-form.md
│   └── fluent-dialog.md
```

## Version Compatibility

The MCP server and the component library NuGet package are **published together with the same version number**. Your project must reference the matching version to ensure accurate documentation.

### Version Checking Tools

| Tool | Description |
|------|-------------|
| `GetVersionInfo` | Returns the MCP server version and the exact PackageReference your project should use |
| `CheckProjectVersion` | Accepts your project's component library version and reports COMPATIBLE or INCOMPATIBLE |

### Typical Conversation

```
User: "I want to use FluentDataGrid in my project."
AI: [Calls GetVersionInfo → reads .csproj → Calls CheckProjectVersion("4.9.0")]

AI: "Your project references version 4.9.0 of the component library,
     but this MCP server provides documentation for version 5.0.0-rc.1-26049.2.
     Parameters and APIs may differ.
     I recommend upgrading:
     dotnet add package Microsoft.FluentUI.AspNetCore.Components --version 5.0.0-rc.1-26049.2"
```

### Best Practices

1. **Keep versions in sync** -- Always use the same version for the MCP server tool and the component library NuGet package.
2. **Update both together** -- When upgrading the component library, also update the MCP server.
3. **Pin a specific version with dnx** when needed.

## Security & Compliance

### Executive Summary

The Fluent UI Blazor MCP Server is a **read-only documentation provider** that runs locally on developer workstations:

- Does not execute arbitrary code
- Does not make external network requests
- Does not access sensitive data
- Does not modify files or system state
- Operates entirely within the IDE sandbox
- Only serves pre-generated documentation

### Architecture & Isolation

```
┌─────────────────────────────────────────────────┐
│           Developer Workstation                 │
│  ┌─────────────────┐        ┌─────────────────┐ │
│  │   Visual Studio │◄──────►│   MCP Server    │ │
│  │   or VS Code    │  stdio │   (Local)       │ │
│  └─────────────────┘        └─────────────────┘ │
│         │                           │           │
│         ▼                           ▼           │
│  ┌────────────────┐        ┌─────────────────┐  │
│  │  GitHub Copilot│        │  Documentation  │  │
│  │   (Extension)  │        │  JSON Files     │  │
│  └────────────────┘        └─────────────────┘  │
└─────────────────────────────────────────────────┘
```

- **Transport**: stdio (standard input/output) via JSON-RPC 2.0
- **Scope**: Local process only, no network access
- **Process Isolation**: Runs as child process of IDE with limited permissions

### Permission Model

**Can do**:
- Read documentation files (local JSON files only)
- Serve component metadata (pre-generated data)
- List available resources (static catalog)
- Return documentation text (Markdown content)

**Cannot do**:
- Execute arbitrary code
- Access file system outside documentation directory
- Make network requests
- Modify files
- Access environment variables or credentials

### Data Flow

```
IDE Request ──► MCP Server ──► Read JSON ──► Return Markdown
                      │
                      └──► No external calls
                      └──► No data persistence
                      └──► No logging of queries
```

### Privacy Guarantees

- No telemetry or analytics
- No data sent to external services
- No logging of user queries
- No storage of conversation history
- No access to workspace files or source code
- No internet access required

### Compliance

Suitable for organizations subject to: GDPR, SOC 2, ISO 27001, HIPAA, PCI DSS.

All content served is **public** (publicly available documentation).

## AI Skills (Agent Skills)

The Fluent UI Blazor project also provides **AI Skills** (also known as Agent Skills) -- structured documentation files that you include in your own project to help AI coding assistants generate accurate, idiomatic code.

### What are AI Skills?

AI Skills follow the open [Agent Skills specification](https://agentskills.io). They consist of a `SKILL.md` file with YAML frontmatter and a `references/` folder with detailed documentation.

When placed in your project's `.github/skills/` directory, AI assistants automatically discover and use them.

### Why use them?

AI assistants often mix up v4 and v5 patterns. The AI Skill files contain correct v5 patterns, migration notes, and code examples.

### Skill File Structure

```
your-project/
├── .github/
│   └── skills/
│       └── fluentui-blazor-usage/
│           ├── SKILL.md
│           └── references/
│               ├── SETUP.md
│               ├── DATAGRID.md
│               └── THEMING.md
```

| File | Description |
|------|-------------|
| `SKILL.md` | Main skill file with setup, component patterns, v4-to-v5 migration table, and common pitfalls |
| `SETUP.md` | Detailed setup guide for Blazor Server, WebAssembly, and Auto modes |
| `DATAGRID.md` | Advanced data grid patterns: pagination, virtualization, EF adapter, templates |
| `THEMING.md` | Theming guide with CSS custom properties, design tokens, and C# style constants |

### Supported AI Assistants

- GitHub Copilot (VS Code Agent Mode, Visual Studio, CLI, Copilot Coding Agent)
- Claude Code (via `.github/skills/` or `.claude/skills/`)
- Any AI assistant that supports the Agent Skills specification

## Usage Examples

### Form with Validation

```razor
@using System.ComponentModel.DataAnnotations

<EditForm Model="@model" OnValidSubmit="@HandleSubmit">
    <DataAnnotationsValidator />

    <FluentStack Orientation="Orientation.Vertical" VerticalGap="16">
        <FluentField Label="Username">
            <FluentTextInput @bind-Value="@model.Username"
                             Placeholder="Enter username" />
            <ValidationMessage For="@(() => model.Username)" />
        </FluentField>

        <FluentField Label="Email">
            <FluentTextInput @bind-Value="@model.Email"
                             TextInputType="TextInputType.Email"
                             Placeholder="Enter email" />
            <ValidationMessage For="@(() => model.Email)" />
        </FluentField>

        <FluentButton Type="ButtonType.Submit"
                      Appearance="ButtonAppearance.Primary">
            Register
        </FluentButton>
    </FluentStack>
</EditForm>

@code {
    private RegistrationModel model = new();

    private async Task HandleSubmit()
    {
        // Handle registration logic
    }

    public class RegistrationModel
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters")]
        public string Username { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; } = "";

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; } = "";
    }
}
```

### Data Grid with Pagination

```razor
@inject IProductService ProductService

<FluentDataGrid Items="@products" Pagination="@pagination">
    <PropertyColumn Property="@(p => p.Name)"
                    Title="Product Name"
                    Sortable="true" />

    <PropertyColumn Property="@(p => p.Price)"
                    Title="Price"
                    Sortable="true"
                    Format="C2" />

    <PropertyColumn Property="@(p => p.Category)"
                    Title="Category" />

    <TemplateColumn Title="In Stock">
        <FluentIcon Value="@(context.InStock
            ? new Icons.Regular.Size16.Checkmark()
            : new Icons.Regular.Size16.Dismiss())"
            Color="@(context.InStock ? Color.Success : Color.Error)" />
    </TemplateColumn>
</FluentDataGrid>

<FluentPaginator State="@pagination" />

@code {
    private IQueryable<Product> products = default!;
    private PaginationState pagination = new() { ItemsPerPage = 15 };

    protected override async Task OnInitializedAsync()
    {
        var allProducts = await ProductService.GetProductsAsync();
        products = allProducts.AsQueryable();
    }
}
```

## Troubleshooting

### Server Not Starting
1. Verify the tool is installed: `dotnet tool list -g`
2. Ensure .NET 9+ SDK is installed: `dotnet --version`
3. Check that `fluentui-mcp` is available in your PATH

### Tools Not Available
1. Restart your IDE
2. Check the Output panel for MCP-related errors
3. Verify GitHub Copilot is active and authenticated

### Documentation Not Loading
1. Force regeneration with `dotnet build -p:ForceGenerateMcpDocs=true` (source build only)
2. Ensure the Fluent UI Components project builds successfully

## Next Steps

- [[FluentUI Blazor Installation]] -- Set up the Fluent UI Blazor library
- [[FluentUI Blazor Theming]] -- Configure themes and colors
- [[FluentUI Blazor Styles and Spacing]] -- Styling and layout utilities

## References

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [GitHub Copilot Agent Mode](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview)
- [Visual Studio MCP Support](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [VS Code MCP Sandbox Configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#_sandbox-configuration)
