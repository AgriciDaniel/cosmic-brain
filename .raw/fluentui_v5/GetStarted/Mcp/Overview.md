---
title: MCP Server
order: 0005.01
category: 10|Get Started
route: /Mcp/[Default]
icon: Bot
---

# MCP Server for Fluent UI Blazor

The **Fluent UI Blazor MCP Server** provides AI-powered assistance for building applications with Fluent UI Blazor components. Using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), this server integrates with AI coding assistants in **Visual Studio** and **Visual Studio Code** to provide real-time documentation, component details, and code suggestions.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI assistants to interact with external tools and data sources. By connecting your IDE to the Fluent UI Blazor MCP Server, you gain:

- **Component Discovery**: Browse and search all 142+ available Fluent UI Blazor components
- **Live Documentation**: Get detailed parameter, event, and method documentation
- **Enum Reference**: Access all enum types and their values used by components
- **Code Assistance**: Generate component code with AI-powered suggestions

## Architecture

The MCP server uses **pre-generated JSON documentation** to provide fast, dependency-free access to component information.

This architecture provides:
- **Faster startup** - No XML parsing at runtime
- **Consistent documentation** - Generated once at build time

The MCP Server exposes three types of capabilities:

1. **Tools** - Functions that the AI model can call to query component information dynamically
2. **Resources** - Static documentation content that provides context to the AI
3. **Prompts** - Pre-defined prompt templates for common development tasks

## Learn More

- [Get Started](/Mcp/GetStarted) - Configure your IDE
- [How to Install](/Mcp/Installation) - Install the MCP Server
- [MCP Resources](/Mcp/Resources) - Available resources
- [MCP Prompts](/Mcp/Prompts) - Prompt templates
- [MCP Tools](/Mcp/Tools) - Available tools
- [Usage Examples](/Mcp/Examples) - Real-world examples
- [AI Skills](/Mcp/AISkills) - Downloadable skill files for AI assistants
- [Security & Compliance](/Mcp/Security) - Security information for SecOps teams

## References

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [GitHub Copilot Agent Mode](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview)
- [Visual Studio MCP Support](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
