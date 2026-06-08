---
title: How to Install
order: 0005.03
category: 10|Get Started
route: /Mcp/Installation
icon: ArrowDownload
---

# How to Install the MCP Server

The Fluent UI Blazor MCP Server can be installed in several ways depending on your workflow.

## Option 1: Install as .NET Tool (Recommended)

Install the MCP server as a global .NET tool from NuGet.org:

```bash
dotnet tool install -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

After installation, configure your MCP client:

**For Visual Studio Code** (`.vscode/mcp.json`):

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp"
        }
    }
}
```

**For Visual Studio 2026** (`.mcp.json` at solution root):

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp"
        }
    }
}
```

### Updating the Tool

To update to the latest version:

```bash
dotnet tool update -g Microsoft.FluentUI.AspNetCore.McpServer --prerelease
```

### Uninstalling the Tool

```bash
dotnet tool uninstall -g Microsoft.FluentUI.AspNetCore.McpServer
```

## Option 2: Using dnx Script Tool

Use [dnx](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/sdk#the-new-dnx-tool-execution-script) to run the MCP server directly from NuGet.org without installing it globally:

```bash
dnx Microsoft.FluentUI.AspNetCore.McpServer
```

Configure your MCP client:

**For Visual Studio Code** (`.vscode/mcp.json`):

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

**For Visual Studio 2026** (`.mcp.json`):

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

### Specifying a Version

You can specify a specific version (the example uses the first RC version 5.0.0-rc.1-26049.2):

```bash
dnx Microsoft.FluentUI.AspNetCore.McpServer@5.0.0-rc.1-26049.2
```

Or in the configuration:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "dnx",
            "args": [
                "Microsoft.FluentUI.AspNetCore.McpServer@5.0.0-rc.1-26049.2"
            ]
        }
    }
}
```

## Enable Sandboxing in VS Code (Optional)

VS Code supports native **sandboxing** for stdio MCP servers on **macOS and Linux**. Sandboxed servers can only access the file system paths and network domains that you explicitly permit.

Because the Fluent UI Blazor MCP Server requires no file writes and no network access, you can enable the most restrictive sandbox with a single property:

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

This applies equally to the `dnx`-based configuration — just add `"sandboxEnabled": true` to the server entry.

> [!NOTE]
> When sandboxing is enabled, VS Code may handle tool confirmations differently because the server runs in a controlled environment. Check the current VS Code documentation for the exact behavior in your version. This setting has no effect on Windows.

For advanced sandbox rules (restricting specific paths or domains), see the [VS Code MCP Sandbox Configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#_sandbox-configuration) reference.

## NuGet Package

For all available versions and additional installation methods, visit the official NuGet page:
[Microsoft.FluentUI.AspNetCore.McpServer on NuGet.org](https://www.nuget.org/packages/Microsoft.FluentUI.AspNetCore.McpServer/)

## Requirements

### System Requirements

| Requirement | Minimum Version |
|-------------|-----------------|
| .NET SDK | 9.0 |
| Visual Studio | 2026 18.1+ |
| VS Code | 1.85+ |
| GitHub Copilot | Latest |

## Verification

After installation, verify the server is working:

### IDE Test

1. Open your project in VS Code or Visual Studio
2. Open GitHub Copilot Chat
3. Ask: *"What Fluent UI components are available?"*
4. The response should include component information from the MCP Server

## Troubleshooting

### Tool Not Found

If the `fluentui-mcp` command is not found after installation:

1. Ensure the .NET tools directory is in your PATH
2. Try restarting your terminal
3. Run `dotnet tool list -g` to verify installation

### Documentation Not Loading

If component descriptions are missing:

1. Force regeneration with `dotnet build -p:ForceGenerateMcpDocs=true` (source build only)
2. Ensure the Fluent UI Components project builds successfully

### Server Not Responding

Check that:
1. .NET 9.0 SDK is installed: `dotnet --version`
2. The path in your MCP configuration is correct
3. No firewall is blocking the process

## Next Steps

- [Get Started](/Mcp/GetStarted) - Configure your IDE
- [MCP Tools](/Mcp/Tools) - Explore available tools
- [Version Compatibility](/Mcp/VersionCompatibility) - Ensure your project uses the correct component version
- [Usage Examples](/Mcp/Examples) - See real-world examples
- [Security & Compliance](/Mcp/Security) - Security information for SecOps teams
