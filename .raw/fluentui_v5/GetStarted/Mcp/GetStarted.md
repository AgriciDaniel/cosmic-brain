 ---
title: Get Started
order: 0005.02
category: 10|Get Started
route: /Mcp/GetStarted
icon: Rocket
---

# Get Started with MCP Server

This guide will help you configure the Fluent UI Blazor MCP Server in your development environment.

## Prerequisites

Before you begin, ensure you have:

- **.NET 9.0 SDK** or later installed
- **Visual Studio Code** with GitHub Copilot extension, or **Visual Studio 2026** with GitHub Copilot
- A valid **GitHub Copilot subscription**

## Quick Setup

### Step 1: Install the MCP Server



The easiest way to install is via the .NET tool:

```bash
dotnet tool install -g Microsoft.FluentUI.AspNetCore.McpServer
```

```bash
dotnet tool install -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

See [How to Install](/Mcp/Installation) for alternative installation methods.

> [!NOTE] Use this command to update the MCP Server: `dotnet tool update -g Microsoft.FluentUI.AspNetCore.McpServer`.

### Step 2: Create the configuration File

Create the appropriate configuration file for your IDE:
  - **VSCode**: Create this `.vscode/mcp.json` file in your workspace root:
  - **Visual Studio**: Create this `.mcp.json` file in your solution root directory:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp"
        }
    }
}
```

After saving, click on the `Start` link above the server "fluent-ui-blazor" and wait a few seconds for the label `Running` to appear.

Now you are ready to use the Fluent UI Blazor MCP Server.

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

## Troubleshooting

### Server Not Starting

1. Verify the tool is installed: `dotnet tool list -g`
2. Ensure .NET9 or .NET10 SDK is installed: `dotnet --version`
3. Check that the command `fluentui-mcp` is available in your PATH

### Tools Not Available

1. Restart your IDE
2. Check the Output panel for MCP-related errors
3. Verify GitHub Copilot is active and authenticated

## Next Steps

- Learn about [available MCP Tools](/Mcp/Tools)
- Explore [MCP Resources](/Mcp/Resources)
- Verify [Version Compatibility](/Mcp/VersionCompatibility) between the MCP server and your project
- See [Usage Examples](/Mcp/Examples)

## References

- [VS Code MCP Configuration](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
- [Visual Studio MCP Support](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
