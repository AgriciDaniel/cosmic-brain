---
title: MCP Resources
order: 0005.04
category: 10|Get Started
route: /Mcp/Resources
icon: Document
---

# MCP Resources

MCP Resources are **user-controlled** content sources that provide context to the AI assistant. Unlike tools (which are called by the AI model), resources are explicitly selected by the user to enrich the conversation context.

## Available Resources

The Fluent UI Blazor MCP Server exposes the following resources:

{{ MCP Type=resources }}

## Using Resources in Visual Studio Code

In VS Code with GitHub Copilot, you can reference resources in your chat:

1. Open the Copilot Chat panel (`Ctrl+Shift+I`)
2. Click the **+** button to attach context
3. Select **MCP Resource**
4. Choose a resource like `fluentui://components`

The resource content will be added to the chat context, helping Copilot provide more accurate answers.

### Example

```
I need help creating a data table.
[Attached: fluentui://component/FluentDataGrid]
```

## Using Resources in Visual Studio 2026

In Visual Studio:

1. Open the Copilot Chat window
2. Use the context menu to attach MCP resources
3. Select the desired resource

## Resource Content Format

All resources return **Markdown-formatted** content (`text/markdown` MIME type). This includes:

- Headers and descriptions
- Parameter tables
- Event documentation
- Code examples

### Example: Component Resource

When accessing `fluentui://component/FluentButton`, you receive:

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

### Example: Enum Resource

When accessing `fluentui://enum/ButtonAppearance`, you receive:

```markdown
# ButtonAppearance

Defines the visual appearance of a button.

## Values

| Name | Value | Description |
|------|-------|-------------|
| Primary | 0 | Emphasized button for primary actions |
| Secondary | 1 | Standard button for secondary actions |
| Outline | 2 | Button with visible border, no fill |
| Subtle | 3 | Low-emphasis button |
| Transparent | 4 | Button with no background |
```

## Best Practices

### 1. Attach Relevant Resources
> [!TIP]
> Only attach resources that are relevant to your question. Too many resources can dilute the AI's focus.

**Good:**
```
How do I paginate a FluentDataGrid?
[Attached: fluentui://component/FluentDataGrid]
```

**Less effective:**
```
How do I paginate a FluentDataGrid?
[Attached: fluentui://components] (too broad)
```

### 2. Combine Resources

For complex questions, combine multiple resources:

```
Create a form with validation using Fluent UI components
[Attached: fluentui://component/FluentTextInput]
[Attached: fluentui://component/FluentButton]
[Attached: fluentui://component/FluentField]
```

### 3. Use Category Resources for Discovery

When exploring, use category resources:

```
What input components are available?
[Attached: fluentui://category/Input]
```

### 4. Use Enum Resources for Valid Values

When you need to know all possible values:

```
What appearances can I use for buttons?
[Attached: fluentui://enum/ButtonAppearance]
```

## Resource vs Tool

| Aspect | Resources | Tools |
|--------|-----------|-------|
| Controlled by | User | AI model |
| When used | Explicitly attached | Automatically based on question |
| Best for | Providing context | Dynamic queries |
| Example | Attaching component docs | "What parameters does X have?" |

## Resource Refresh

Resources are generated from the library's documentation at build time. They automatically reflect the version of Fluent UI Blazor included in the MCP Server package.

## Next Steps

- Learn about [MCP Tools](/Mcp/Tools)
- Explore [MCP Prompts](/Mcp/Prompts)
- See [Usage Examples](/Mcp/Examples)
- Return to [MCP Overview](/Mcp)
