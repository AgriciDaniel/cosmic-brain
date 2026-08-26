---
title: MCP Tools
order: 0005.06
category: 10|Get Started
route: /Mcp/Tools
icon: Wrench
---

# MCP Tools

MCP Tools are **model-controlled** functions that the AI assistant can call automatically to answer your questions. When you ask about Fluent UI Blazor components, the AI decides which tools to invoke.

## Available Tools

The Fluent UI Blazor MCP Server provides the following tools:

{{ MCP Type=tools }}

## How Tools Work

1. **You ask a question** about Fluent UI Blazor
2. **The AI analyzes** your question and determines which tool(s) to call
3. **The MCP Server executes** the tool and returns results
4. **The AI formats** the response in a helpful way

### Tool Call Transparency

In both VS Code and Visual Studio, you can see which tools the AI is calling:

- **VS Code:** Tool calls appear in the chat with an expandable section
- **Visual Studio:** Tool invocations are shown in the response

## Tool Usage Examples

### ListComponents

```
User: "What components are available for forms?"
AI: [Calls ListComponents(category: "Input")]
```

### SearchComponents

```
User: "Find me a component for date selection"
AI: [Calls SearchComponents(searchTerm: "date")]
```

### GetComponentDetails

```
User: "What parameters does FluentDataGrid accept?"
AI: [Calls GetComponentDetails(componentName: "DataGrid")]
```

### GetEnumValues

```
User: "What are the possible button appearances?"
AI: [Calls GetEnumValues(enumName: "ButtonAppearance")]
```

### GetComponentEnums

```
User: "What enums can I use with FluentButton?"
AI: [Calls GetComponentEnums(componentName: "Button")]
```

### GetVersionInfo

```
User: "What version of Fluent UI Blazor does this MCP server provide docs for?"
AI: [Calls GetVersionInfo()]
```

### CheckProjectVersion

```
User: "Is my project using the right version of Fluent UI Blazor?"
AI: [Reads .csproj → Calls CheckProjectVersion(projectVersion: "4.9.0")]
```

See [Version Compatibility](/Mcp/VersionCompatibility) for details on how these tools help ensure documentation accuracy.

## Best Practices

### 1. Be Specific

Specific questions lead to more targeted tool calls:

```
❌ "Tell me about components"
✅ "What parameters does FluentTextInput accept?"
```

### 2. Use Component Names

Mentioning specific component names helps the AI call the right tools:

```
❌ "How do I make a dropdown?"
✅ "How do I use FluentSelect with custom option templates?"
```

### 3. Ask About Enums

When you need to know valid values, ask explicitly:

```
✅ "What are the possible values for DataGridResizeType?"
✅ "What size options are available for FluentIcon?"
```

## Tool vs Resource

| Aspect | Tools | Resources |
|--------|-------|-----------|
| Controlled by | AI model | User |
| When used | Automatically based on question | Explicitly attached |
| Best for | Dynamic queries | Static context |
| Example | "What parameters does X have?" | Attaching component docs |

## Next Steps

- Learn about [MCP Resources](/Mcp/Resources)
- Check [Version Compatibility](/Mcp/VersionCompatibility) to ensure accurate documentation
- See [Usage Examples](/Mcp/Examples)
- Return to [MCP Overview](/Mcp)
